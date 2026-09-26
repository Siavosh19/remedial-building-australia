// ── Bank statement import and matching ───────────────────────────────────────
// The cheap half of "the levies receipt themselves", and the reason every lot
// gets a permanent payment reference in the first place.
//
// The order of preference is deliberate:
//   1. The line quotes a lot's payment reference → matched exactly and
//      receipted on the spot. That is string matching, not a guess, so no
//      person needs to confirm it.
//   2. It looks like something → offered as a suggestion for a person to
//      accept or reject.
//   3. It does not → left visible in the list rather than quietly dropped.
//
// Nothing here uses a model. Deterministic matching is cheaper, faster and
// more trustworthy than inference, and it is what the references are for.

import { prisma } from "@/lib/prisma";
import { round2 } from "@/lib/strata/levies";

export type ParsedLine = { date: Date; description: string; amount: number };

const DATE_PATTERNS: RegExp[] = [
  /^(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{2,4})$/, // 06/09/2026 — day first, the AU default
  /^(\d{4})-(\d{2})-(\d{2})$/, // 2026-09-06
];

function parseDate(raw: string): Date | null {
  const value = raw.trim().replace(/"/g, "");
  if (!value) return null;

  for (const pattern of DATE_PATTERNS) {
    const m = value.match(pattern);
    if (!m) continue;
    if (pattern === DATE_PATTERNS[1]) {
      return new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
    }
    const day = Number(m[1]);
    const month = Number(m[2]);
    let year = Number(m[3]);
    if (year < 100) year += 2000;
    if (month < 1 || month > 12 || day < 1 || day > 31) return null;
    return new Date(Date.UTC(year, month - 1, day));
  }

  const loose = new Date(value);
  return Number.isNaN(loose.getTime()) ? null : loose;
}

function parseAmount(raw: string): number | null {
  const cleaned = raw.replace(/["$,\s]/g, "").replace(/^\((.*)\)$/, "-$1");
  if (!cleaned || cleaned === "-") return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

/** Split one CSV line, honouring quoted fields. */
function splitCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i += 1;
      } else inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      out.push(cur);
      cur = "";
    } else cur += ch;
  }
  out.push(cur);
  return out.map((c) => c.trim());
}

/**
 * Australian bank exports vary: headers or none, one amount column or separate
 * debit and credit columns, dates day-first. Rather than ask a committee to
 * reformat its statement, work out the shape from the data.
 */
export function parseStatement(csv: string): { lines: ParsedLine[]; skipped: number } {
  const rows = csv
    .split(/\r?\n/)
    .map((r) => r.trim())
    .filter(Boolean)
    .map(splitCsvLine);

  const lines: ParsedLine[] = [];
  let skipped = 0;

  for (const cells of rows) {
    if (cells.length < 2) {
      skipped += 1;
      continue;
    }

    // The date is the first cell that parses as one.
    let dateIndex = -1;
    let date: Date | null = null;
    for (let i = 0; i < cells.length; i += 1) {
      const parsed = parseDate(cells[i]);
      if (parsed) {
        date = parsed;
        dateIndex = i;
        break;
      }
    }
    if (!date) {
      skipped += 1; // header row, or a summary line
      continue;
    }

    // Numeric cells other than the date. One of them is the amount; if there
    // are two it is a debit/credit pair; a third is usually the balance.
    const numeric: { index: number; value: number }[] = [];
    for (let i = 0; i < cells.length; i += 1) {
      if (i === dateIndex) continue;
      const value = parseAmount(cells[i]);
      if (value !== null && cells[i] !== "") numeric.push({ index: i, value });
    }
    if (numeric.length === 0) {
      skipped += 1;
      continue;
    }

    let amount: number;
    if (numeric.length === 1) {
      amount = numeric[0].value;
    } else {
      // Debit / credit pair: exactly one is filled on any given row. Where
      // both are present the last is usually a running balance, so prefer the
      // first two and treat a lone debit as money out.
      const [first, second] = numeric;
      if (Math.abs(first.value) > 0 && Math.abs(second.value) === 0) amount = first.value;
      else if (Math.abs(second.value) > 0 && Math.abs(first.value) === 0) amount = second.value;
      else amount = first.value;
    }

    const description = cells
      .filter((_, i) => i !== dateIndex && parseAmount(cells[i]) === null)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    lines.push({ date, description: description || "(no description)", amount: round2(amount) });
  }

  return { lines, skipped };
}

function normalise(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export type MatchResult = {
  lotId: number | null;
  expenseId: number | null;
  matchedBy: "reference" | null;
  suggestion: string | null;
};

/**
 * Place one statement line against the scheme's records.
 *
 * Money in is tested against the payment references first, then against the
 * owner names on the roll. Money out is tested against unpaid invoices by
 * supplier and amount. Only the reference match is certain enough to act on.
 */
export function matchLine(
  line: ParsedLine,
  lots: { id: number; lot_number: string; owner_name: string | null; payment_reference: string | null }[],
  unpaid: { id: number; supplier: string; amount: number }[],
): MatchResult {
  const haystack = normalise(line.description);

  if (line.amount > 0) {
    for (const lot of lots) {
      if (!lot.payment_reference) continue;
      const ref = normalise(lot.payment_reference);
      if (ref.length >= 4 && haystack.includes(ref)) {
        return { lotId: lot.id, expenseId: null, matchedBy: "reference", suggestion: null };
      }
    }

    // No reference quoted — fall back to the owner's surname, which is a
    // suggestion and nothing more.
    for (const lot of lots) {
      if (!lot.owner_name) continue;
      const words = lot.owner_name.split(/\s+/).filter((w) => w.length >= 4);
      for (const word of words) {
        if (haystack.includes(normalise(word))) {
          return {
            lotId: lot.id,
            expenseId: null,
            matchedBy: null,
            suggestion: `Looks like lot ${lot.lot_number} — the description mentions "${word}", but no payment reference was quoted.`,
          };
        }
      }
    }

    return { lotId: null, expenseId: null, matchedBy: null, suggestion: null };
  }

  // Money out: an unpaid invoice of the same amount from a supplier named in
  // the description.
  const outgoing = round2(Math.abs(line.amount));
  for (const invoice of unpaid) {
    if (round2(invoice.amount) !== outgoing) continue;
    const supplier = invoice.supplier.split(/\s+/).filter((w) => w.length >= 4);
    const named = supplier.some((w) => haystack.includes(normalise(w)));
    if (named) {
      return {
        lotId: null,
        expenseId: invoice.id,
        matchedBy: null,
        suggestion: `Matches the unpaid ${invoice.supplier} invoice for the same amount.`,
      };
    }
  }

  const sameAmount = unpaid.filter((i) => round2(i.amount) === outgoing);
  if (sameAmount.length === 1) {
    return {
      lotId: null,
      expenseId: sameAmount[0].id,
      matchedBy: null,
      suggestion: `Same amount as the unpaid ${sameAmount[0].supplier} invoice, though the description does not name them.`,
    };
  }

  return { lotId: null, expenseId: null, matchedBy: null, suggestion: null };
}

/**
 * Apply money received to a lot's oldest unpaid levy first, spilling into the
 * next one if it covers more than one period. Anything left over after every
 * levy is settled is recorded against the most recent one, so the money is
 * never lost — it simply shows as a credit.
 */
export async function allocateToLot(opts: {
  schemeId: number;
  lotId: number;
  amount: number;
  receivedOn: Date;
  reference: string | null;
  note: string | null;
}) {
  const levies = await prisma.strataLevy.findMany({
    where: { scheme_id: opts.schemeId, lot_id: opts.lotId },
    include: { period: { select: { due_date: true } }, payments: { select: { amount: true } } },
    orderBy: { period: { due_date: "asc" } },
  });

  if (levies.length === 0) return { applied: 0, payments: 0 };

  let remaining = round2(opts.amount);
  let payments = 0;

  for (const levy of levies) {
    if (remaining <= 0.005) break;
    const owing = round2(
      levy.fund_1_amount + levy.fund_2_amount - levy.payments.reduce((s, p) => s + p.amount, 0),
    );
    if (owing <= 0.005) continue;

    const part = round2(Math.min(owing, remaining));
    await prisma.strataLevyPayment.create({
      data: {
        scheme_id: opts.schemeId,
        levy_id: levy.id,
        amount: part,
        received_on: opts.receivedOn,
        method: "Bank import",
        reference: opts.reference,
        note: opts.note,
      },
    });
    remaining = round2(remaining - part);
    payments += 1;
  }

  // Paid more than was owed — hold the balance against the latest levy rather
  // than discarding it.
  if (remaining > 0.005) {
    const last = levies[levies.length - 1];
    await prisma.strataLevyPayment.create({
      data: {
        scheme_id: opts.schemeId,
        levy_id: last.id,
        amount: remaining,
        received_on: opts.receivedOn,
        method: "Bank import",
        reference: opts.reference,
        note: "Paid in advance / overpayment",
      },
    });
    payments += 1;
  }

  return { applied: round2(opts.amount), payments };
}
