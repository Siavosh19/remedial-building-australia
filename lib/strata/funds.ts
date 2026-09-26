// ── Fund balances and the capital works projection ───────────────────────────
// Receipts are recorded against a levy, and a levy carries an amount for each
// fund. Money received is therefore split between the funds in the same
// proportion as the levy it paid — the only honest way to answer "how much is
// in the capital fund" without a bank feed.

import { round2 } from "@/lib/strata/levies";

export type LevyForSplit = {
  fund_1_amount: number;
  fund_2_amount: number;
  payments: { amount: number }[];
};

export function receiptsByFund(levies: LevyForSplit[]) {
  let fund1 = 0;
  let fund2 = 0;

  for (const levy of levies) {
    const total = levy.fund_1_amount + levy.fund_2_amount;
    const received = levy.payments.reduce((sum, p) => sum + p.amount, 0);
    if (received === 0) continue;
    if (total <= 0) {
      fund1 += received;
      continue;
    }
    fund1 += (received * levy.fund_1_amount) / total;
    fund2 += (received * levy.fund_2_amount) / total;
  }

  return { fund1: round2(fund1), fund2: round2(fund2) };
}

export type ExpenseForSplit = { fund: "fund_1" | "fund_2"; amount: number; status: string };

export function spendByFund(expenses: ExpenseForSplit[], onlyPaid: boolean) {
  let fund1 = 0;
  let fund2 = 0;
  for (const e of expenses) {
    if (onlyPaid && e.status !== "paid") continue;
    if (e.fund === "fund_2") fund2 += e.amount;
    else fund1 += e.amount;
  }
  return { fund1: round2(fund1), fund2: round2(fund2) };
}

export type CapitalItem = {
  id: number;
  item: string;
  cycleYears: number | null;
  nextDueYear: number | null;
  estimatedCost: number;
};

export type ProjectionYear = {
  year: number;
  opening: number;
  contributions: number;
  expenditure: number;
  closing: number;
  items: { id: number; item: string; cost: number }[];
};

/**
 * Ten years of the long-term fund: what falls due, what comes in, and whether
 * the fund survives it. Costs escalate so a repaint eight years out is not
 * priced at today's dollars.
 */
export function project(opts: {
  items: CapitalItem[];
  openingBalance: number;
  annualContribution: number;
  startYear: number;
  years?: number;
  escalationPercent?: number;
  contributionGrowthPercent?: number;
}): ProjectionYear[] {
  const years = opts.years ?? 10;
  const escalation = (opts.escalationPercent ?? 3) / 100;
  const growth = (opts.contributionGrowthPercent ?? 3) / 100;

  const out: ProjectionYear[] = [];
  let opening = opts.openingBalance;

  for (let i = 0; i < years; i += 1) {
    const year = opts.startYear + i;

    const due = opts.items.filter((item) => {
      if (!item.nextDueYear || year < item.nextDueYear) return false;
      if (year === item.nextDueYear) return true;
      // Recurs on its cycle after the first time it falls due.
      if (!item.cycleYears || item.cycleYears <= 0) return false;
      return (year - item.nextDueYear) % item.cycleYears === 0;
    });

    const items = due.map((item) => ({
      id: item.id,
      item: item.item,
      cost: round2(item.estimatedCost * Math.pow(1 + escalation, i)),
    }));

    const expenditure = round2(items.reduce((sum, x) => sum + x.cost, 0));
    const contributions = round2(opts.annualContribution * Math.pow(1 + growth, i));
    const closing = round2(opening + contributions - expenditure);

    out.push({ year, opening: round2(opening), contributions, expenditure, closing, items });
    opening = closing;
  }

  return out;
}

/** Days until a date, negative once it has passed. */
export function daysUntil(due: Date, from = new Date()) {
  const ms = Date.UTC(due.getUTCFullYear(), due.getUTCMonth(), due.getUTCDate()) -
    Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate());
  return Math.round(ms / 86_400_000);
}

export type DueState = { label: "Current" | "Due soon" | "Overdue" | "Not set"; tone: string; days: number | null };

/**
 * How a dated obligation stands. "Due soon" is 60 days — a product habit that
 * gives a committee time to arrange a trade, not a legal period.
 */
export function dueState(next: Date | null, from = new Date()): DueState {
  if (!next) return { label: "Not set", tone: "bg-slate-100 text-slate-500", days: null };
  const days = daysUntil(next, from);
  if (days < 0) return { label: "Overdue", tone: "bg-red-100 text-red-800", days };
  if (days <= 60) return { label: "Due soon", tone: "bg-amber-50 text-amber-800", days };
  return { label: "Current", tone: "bg-emerald-50 text-emerald-700", days };
}
