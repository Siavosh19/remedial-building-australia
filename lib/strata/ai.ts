// ── The strata AI panel ──────────────────────────────────────────────────────
// Manual-first: nothing in this module calls a model unless somebody opened the
// panel and asked a question. There is no background extraction, no silent
// classification, no automatic anything.
//
// Two things keep it safe to offer on a free product:
//   1. A monthly token allowance per scheme with a hard stop. Tokens, not
//      dollars, because token counts are what the API actually reports and they
//      do not drift when prices change.
//   2. A system prompt that confines the model to the scheme's own records and
//      forbids it from saying what the law requires. That second rule is not
//      decoration — interpreting eight states' strata Acts is exactly the kind
//      of advice this product must never give.

import { prisma } from "@/lib/prisma";
import { AI_CLASSIFIER_MODEL, anthropicMessages, hasAnthropicKey } from "@/lib/anthropic";
import { labelsFor } from "@/lib/strata/jurisdictions";
import { arrearsStage, daysBetween, money, round2 } from "@/lib/strata/levies";
import { dueState } from "@/lib/strata/funds";

export const AI_MODEL = AI_CLASSIFIER_MODEL;

/** Tokens per scheme per calendar month. Generous for a normal scheme, finite. */
export function monthlyAllowance() {
  const raw = Number(process.env.STRATA_AI_MONTHLY_TOKENS);
  return Number.isFinite(raw) && raw > 0 ? Math.round(raw) : 200_000;
}

export function currentPeriod(now = new Date()) {
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
}

export type Allowance = { used: number; allowance: number; remaining: number; exhausted: boolean };

export async function readAllowance(schemeId: number): Promise<Allowance> {
  const allowance = monthlyAllowance();
  const row = await prisma.strataAiUsage.findUnique({
    where: { scheme_id_period: { scheme_id: schemeId, period: currentPeriod() } },
  });
  const used = (row?.input_tokens ?? 0) + (row?.output_tokens ?? 0);
  return { used, allowance, remaining: Math.max(0, allowance - used), exhausted: used >= allowance };
}

async function recordUsage(schemeId: number, input: number, output: number) {
  const period = currentPeriod();
  await prisma.strataAiUsage.upsert({
    where: { scheme_id_period: { scheme_id: schemeId, period } },
    create: { scheme_id: schemeId, period, input_tokens: input, output_tokens: output, requests: 1 },
    update: {
      input_tokens: { increment: input },
      output_tokens: { increment: output },
      requests: { increment: 1 },
    },
  });
}

export const TOPICS = [
  "overview",
  "lots",
  "budget",
  "levies",
  "arrears",
  "defects",
  "work-orders",
  "contractors",
  "expenses",
  "compliance",
  "capital-works",
  "financials",
  "meetings",
  "records",
  "members",
] as const;

export type Topic = (typeof TOPICS)[number];

export function isTopic(value: string): value is Topic {
  return (TOPICS as readonly string[]).includes(value);
}

const AU = new Intl.DateTimeFormat("en-AU", { day: "2-digit", month: "short", year: "numeric" });

/**
 * The scheme's own records, as plain text, bounded so a question costs a
 * predictable number of tokens. Only what the current page is about, plus a
 * short header so the model always knows which building it is looking at.
 */
export async function buildContext(schemeId: number, topic: Topic): Promise<string> {
  const found = await prisma.strataScheme.findUnique({ where: { id: schemeId } });
  if (!found) return "";
  // Bound to a non-null const so the nested blocks below keep the narrowing —
  // TypeScript does not carry it into hoisted function declarations.
  const scheme = found;

  const labels = labelsFor(scheme.state);
  const now = new Date();
  const parts: string[] = [];

  parts.push(
    [
      `SCHEME: ${scheme.name}`,
      scheme.plan_number ? `Plan: ${scheme.plan_number}` : null,
      `State: ${scheme.state} (this scheme calls itself a ${labels.body.toLowerCase()}; its committee is the ${labels.committee.toLowerCase()})`,
      `Address: ${[scheme.address, scheme.suburb, scheme.postcode].filter(Boolean).join(" ")}`,
      `Funds: "${scheme.fund_1_name}" and "${scheme.fund_2_name}"`,
      `Contributions raised ${scheme.levy_frequency}; financial year starts month ${scheme.financial_year_start_month}`,
      scheme.arrears_interest_rate
        ? `Committee's interest rate on overdue contributions: ${scheme.arrears_interest_rate}% per year after ${scheme.arrears_grace_days ?? 0} grace days`
        : "The committee has not set an interest rate on overdue contributions",
      scheme.committee_spend_limit ? `Committee spending limit: ${money(scheme.committee_spend_limit)}` : null,
      `State authority to refer the committee to: ${labels.authority}`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  async function lotsBlock() {
    const lots = await prisma.strataLot.findMany({
      where: { scheme_id: schemeId },
      orderBy: { id: "asc" },
      take: 120,
    });
    const totalBasis = lots.reduce((s, l) => s + l.levy_basis, 0);
    parts.push(
      `ROLL (${lots.length} lots, total ${labels.levyBasis.toLowerCase()} ${totalBasis}):\n` +
        lots
          .map(
            (l) =>
              `Lot ${l.lot_number}: ${l.owner_name ?? "owner not recorded"}, ${labels.levyBasis.toLowerCase()} ${l.levy_basis}` +
              (totalBasis > 0 ? ` (${((l.levy_basis / totalBasis) * 100).toFixed(2)}%)` : "") +
              (l.occupancy ? `, ${l.occupancy}` : "") +
              (l.payment_reference ? `, ref ${l.payment_reference}` : ""),
          )
          .join("\n"),
    );
  }

  async function moneyBlock() {
    const [budget, levies] = await Promise.all([
      prisma.strataBudgetItem.findMany({ where: { scheme_id: schemeId }, orderBy: { id: "asc" }, take: 80 }),
      prisma.strataLevy.findMany({
        where: { scheme_id: schemeId },
        include: {
          period: { select: { label: true, year_label: true, due_date: true } },
          lot: { select: { lot_number: true, owner_name: true } },
          payments: { select: { amount: true } },
        },
      }),
    ]);

    if (budget.length > 0) {
      parts.push(
        "BUDGET:\n" +
          budget
            .map(
              (b) =>
                `${b.year_label} · ${b.item}${b.category ? ` (${b.category})` : ""} · ${
                  b.fund === "fund_1" ? scheme.fund_1_name : scheme.fund_2_name
                } · ${money(b.amount)}`,
            )
            .join("\n"),
      );
    }

    if (levies.length > 0) {
      const owing = levies
        .filter((l) => l.period.due_date <= now)
        .map((l) => {
          const total = round2(l.fund_1_amount + l.fund_2_amount);
          const received = round2(l.payments.reduce((s, p) => s + p.amount, 0));
          return { l, outstanding: round2(total - received), total, received };
        })
        .filter((x) => x.outstanding > 0.005);

      parts.push(
        `LEVIES: ${levies.length} levy rows. Raised to date ${money(
          round2(levies.filter((l) => l.period.due_date <= now).reduce((s, l) => s + l.fund_1_amount + l.fund_2_amount, 0)),
        )}, received ${money(round2(levies.reduce((s, l) => s + l.payments.reduce((a, p) => a + p.amount, 0), 0)))}.`,
      );

      if (owing.length > 0) {
        parts.push(
          "ARREARS (only periods already due):\n" +
            owing
              .map((x) => {
                const days = Math.max(0, daysBetween(x.l.period.due_date, now));
                const stage = arrearsStage(x.outstanding, days);
                return `Lot ${x.l.lot.lot_number} (${x.l.lot.owner_name ?? "owner not recorded"}) · ${x.l.period.year_label} ${x.l.period.label} due ${AU.format(
                  x.l.period.due_date,
                )} · levied ${money(x.total)}, received ${money(x.received)}, outstanding ${money(
                  x.outstanding,
                )} · ${days} days overdue · stage: ${stage.label}`;
              })
              .join("\n"),
        );
      } else {
        parts.push("ARREARS: nothing outstanding on any period that has fallen due.");
      }
    }
  }

  async function worksBlock() {
    const [defects, orders, contractors] = await Promise.all([
      prisma.strataDefect.findMany({ where: { scheme_id: schemeId }, orderBy: { id: "desc" }, take: 40 }),
      prisma.strataWorkOrder.findMany({
        where: { scheme_id: schemeId },
        orderBy: { id: "desc" },
        take: 40,
        include: { contractor: { select: { business_name: true } } },
      }),
      prisma.strataContractor.findMany({ where: { scheme_id: schemeId }, orderBy: { id: "asc" }, take: 40 }),
    ]);

    if (defects.length > 0) {
      parts.push(
        "DEFECTS:\n" +
          defects
            .map(
              (d) =>
                `${d.reference} · ${d.status} · ${d.priority} · ${AU.format(d.reported_on)} · ${
                  d.location ?? "location not recorded"
                } · ${d.description}`,
            )
            .join("\n"),
      );
    }
    if (orders.length > 0) {
      parts.push(
        "WORK ORDERS:\n" +
          orders
            .map(
              (o) =>
                `${o.reference} · ${o.title} · ${o.status} · ${
                  o.contractor?.business_name ?? "no business engaged"
                } · ${o.agreed_price !== null ? money(o.agreed_price) : "no price agreed"}`,
            )
            .join("\n"),
      );
    }
    if (contractors.length > 0) {
      parts.push(
        "BUSINESSES:\n" +
          contractors
            .map(
              (c) =>
                `${c.business_name} · ${c.trade} · ${c.engagement === "ongoing" ? `ongoing${c.frequency ? ` (${c.frequency})` : ""}` : "as needed"}` +
                (c.insurance_expiry
                  ? ` · insurance to ${AU.format(c.insurance_expiry)}${c.insurance_expiry < now ? " (EXPIRED)" : ""}`
                  : " · insurance date not recorded") +
                (c.active ? "" : " · no longer used"),
            )
            .join("\n"),
      );
    }
  }

  async function spendBlock() {
    const expenses = await prisma.strataExpense.findMany({
      where: { scheme_id: schemeId },
      orderBy: { invoice_date: "desc" },
      take: 60,
      include: { budget_item: { select: { item: true } } },
    });
    if (expenses.length === 0) return;
    parts.push(
      "INVOICES:\n" +
        expenses
          .map(
            (e) =>
              `${AU.format(e.invoice_date)} · ${e.supplier} · ${money(e.amount)} · ${e.status} · ${
                e.budget_item?.item ?? "not allocated to a budget line"
              } · ${e.fund === "fund_1" ? scheme.fund_1_name : scheme.fund_2_name}`,
          )
          .join("\n"),
    );
  }

  async function datesBlock() {
    const [compliance, capital] = await Promise.all([
      prisma.strataCompliance.findMany({ where: { scheme_id: schemeId }, orderBy: { next_due: "asc" }, take: 40 }),
      prisma.strataCapitalWorksItem.findMany({
        where: { scheme_id: schemeId },
        orderBy: { next_due_year: "asc" },
        take: 30,
      }),
    ]);
    if (compliance.length > 0) {
      parts.push(
        "COMPLIANCE REGISTER (the committee's own entries):\n" +
          compliance
            .map((c) => {
              const state = dueState(c.next_due, now);
              return `${c.item} · ${c.provider ?? "provider not recorded"} · last ${
                c.last_done ? AU.format(c.last_done) : "not recorded"
              } · next ${c.next_due ? AU.format(c.next_due) : "not set"} · ${state.label}`;
            })
            .join("\n"),
      );
    }
    if (capital.length > 0) {
      parts.push(
        "CAPITAL WORKS PLAN:\n" +
          capital
            .map(
              (c) =>
                `${c.item} · next due ${c.next_due_year ?? "not set"} · every ${
                  c.cycle_years ?? "?"
                } years · ${money(c.estimated_cost)} in today's dollars`,
            )
            .join("\n"),
      );
    }
  }

  async function governanceBlock() {
    const [meetings, motions, bylaws] = await Promise.all([
      prisma.strataMeeting.findMany({ where: { scheme_id: schemeId }, orderBy: { held_on: "desc" }, take: 10 }),
      prisma.strataMotion.findMany({ where: { scheme_id: schemeId }, orderBy: { id: "desc" }, take: 40 }),
      prisma.strataByLaw.findMany({ where: { scheme_id: schemeId }, orderBy: { id: "asc" }, take: 40 }),
    ]);
    if (bylaws.length > 0) {
      parts.push(
        "THIS SCHEME'S BY-LAWS (its own rules — not legislation):\n" +
          bylaws
            .map((b) => `${b.number ? `${b.number}. ` : ""}${b.title} — ${b.summary ?? "no summary recorded"} (${b.status})`)
            .join("\n"),
      );
    }
    if (meetings.length > 0) {
      parts.push(
        "MEETINGS:\n" +
          meetings.map((m) => `${m.meeting_type} on ${AU.format(m.held_on)}${m.attendance ? ` · ${m.attendance}` : ""}`).join("\n"),
      );
    }
    if (motions.length > 0) {
      parts.push(
        "MOTIONS & ACTIONS:\n" +
          motions
            .map(
              (m) =>
                `${m.motion} · ${m.outcome ?? "no outcome recorded"}${m.action ? ` · action: ${m.action}` : ""}${
                  m.responsible ? ` (${m.responsible})` : ""
                }${m.due_on ? ` due ${AU.format(m.due_on)}` : ""} · ${m.done ? "done" : "outstanding"}`,
            )
            .join("\n"),
      );
    }
  }

  switch (topic) {
    case "lots":
    case "members":
      await lotsBlock();
      break;
    case "budget":
    case "levies":
    case "arrears":
      await Promise.all([lotsBlock(), moneyBlock()]);
      break;
    case "defects":
    case "work-orders":
    case "contractors":
      await worksBlock();
      break;
    case "expenses":
      await Promise.all([moneyBlock(), spendBlock()]);
      break;
    case "compliance":
    case "capital-works":
      await Promise.all([datesBlock(), spendBlock()]);
      break;
    case "financials":
      await Promise.all([moneyBlock(), spendBlock()]);
      break;
    case "meetings":
    case "records":
      await governanceBlock();
      break;
    default:
      await Promise.all([lotsBlock(), moneyBlock(), worksBlock(), datesBlock()]);
  }

  return parts.join("\n\n");
}

export function systemPrompt(authority: string) {
  return [
    "You help a volunteer strata committee read its own records inside the Remedial Building Australia strata workspace. The committee manages its own building — there is no professional strata manager.",
    "",
    "You answer only from the scheme's records supplied below and from what the user tells you in the conversation.",
    "",
    "Rules you must not break:",
    `1. Never state what strata legislation requires, permits or prohibits, in any state. If asked "are we allowed to…", "do we have to…", "how long do we have…", or anything about the Act, answer with what THIS scheme's own by-laws, settings and records say, then tell them to confirm their obligations with ${authority}. Do not guess at or paraphrase any statute.`,
    "2. Give no legal, financial, tax or insurance advice, and never tell the committee what it must do. Lay out what the records show and what the options look like; the decision is theirs.",
    "3. You cannot act. You do not send notices, issue work orders, engage anyone, move money or change records. If asked to do something, explain where in the workspace they can do it themselves.",
    "4. If the records do not contain the answer, say so plainly. Never invent a figure, date, name, amount or document.",
    "5. Quote money and dates exactly as they appear in the records.",
    "6. When something looks wrong or risky in the records — an expired insurance date, a fund that will not cover planned work, a lot drifting further into arrears — say so.",
    "",
    "Be brief and concrete. Australian English. Plain words, no jargon, no preamble.",
  ].join("\n");
}

export type AskResult = {
  reply: string;
  inputTokens: number;
  outputTokens: number;
};

export async function ask(opts: {
  schemeId: number;
  topic: Topic;
  authority: string;
  history: { role: "user" | "assistant"; content: string }[];
  question: string;
}): Promise<AskResult> {
  if (!hasAnthropicKey()) throw new Error("The assistant is not configured on this site yet.");

  const context = await buildContext(opts.schemeId, opts.topic);

  const res = await anthropicMessages({
    model: AI_MODEL,
    max_tokens: 1200,
    system: [
      { type: "text", text: systemPrompt(opts.authority) },
      // The records change rarely within a conversation, so they cache well.
      { type: "text", text: `THE SCHEME'S RECORDS\n\n${context}`, cache_control: { type: "ephemeral" } },
    ],
    messages: [...opts.history, { role: "user", content: opts.question }],
  });

  const reply = res.content
    .filter((c) => c.type === "text")
    .map((c) => c.text ?? "")
    .join("")
    .trim();

  const inputTokens = Number(res.usage?.input_tokens ?? 0) + Number(res.usage?.cache_read_input_tokens ?? 0);
  const outputTokens = Number(res.usage?.output_tokens ?? 0);

  await recordUsage(opts.schemeId, inputTokens, outputTokens);

  return { reply: reply || "I could not produce an answer for that.", inputTokens, outputTokens };
}
