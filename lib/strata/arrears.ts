// ── What is owed, answered once ──────────────────────────────────────────────
// Three screens used to work this out for themselves and gave three different
// answers for the same quarter: the levies card netted credits off debts, the
// arrears tab did not, and the assistant counted differently again. A committee
// cannot act on a number that changes depending on where it is read.
//
// So it is computed here, once, and everything reads it. Two figures are always
// reported separately, because they are different things:
//   • gross arrears — money owed on periods that have already fallen due
//   • credits       — money received beyond what a lot has been levied
// Netting them hides a lot that is behind while another is ahead.

import { prisma } from "@/lib/prisma";
import { arrearsStage, daysBetween, interestOn, round2, type ArrearsStage } from "@/lib/strata/levies";

export type LotArrears = {
  lotId: number;
  lotNumber: string;
  ownerName: string | null;
  /** Owed on periods already due. Never negative. */
  grossArrears: number;
  /** Paid beyond what has been levied, across every period including future ones. */
  credit: number;
  /** What the lot would still owe after its own credit is applied. */
  netOwing: number;
  interest: number;
  oldestDue: Date | null;
  daysOverdue: number;
  stage: ArrearsStage;
};

export type SchemeArrears = {
  asAt: Date;
  lots: LotArrears[];
  grossArrears: number;
  credits: number;
  netArrears: number;
  interest: number;
  lotsInArrears: number;
  lotsInCredit: number;
};

type LevyRow = {
  lot_id: number;
  fund_1_amount: number;
  fund_2_amount: number;
  period: { due_date: Date };
  payments: { amount: number }[];
};

function summarise(
  lots: { id: number; lot_number: string; owner_name: string | null }[],
  levies: LevyRow[],
  scheme: { arrears_grace_days: number | null; arrears_interest_rate: number | null },
  now: Date,
): SchemeArrears {
  const byLot = new Map<number, { gross: number; credit: number; interest: number; oldest: Date | null }>();

  for (const levy of levies) {
    const levied = round2(levy.fund_1_amount + levy.fund_2_amount);
    const received = round2(levy.payments.reduce((sum, p) => sum + p.amount, 0));
    const entry = byLot.get(levy.lot_id) ?? { gross: 0, credit: 0, interest: 0, oldest: null };

    // Anything received above the levy is a credit, whichever period it sits in.
    if (received > levied + 0.005) {
      entry.credit = round2(entry.credit + (received - levied));
    }

    // Only a period that has fallen due can be in arrears.
    if (levy.period.due_date <= now && levied - received > 0.005) {
      const owing = round2(levied - received);
      entry.gross = round2(entry.gross + owing);
      entry.interest = round2(
        entry.interest +
          interestOn({
            outstanding: owing,
            dueDate: levy.period.due_date,
            graceDays: scheme.arrears_grace_days,
            annualRatePercent: scheme.arrears_interest_rate,
            asOf: now,
          }),
      );
      if (!entry.oldest || levy.period.due_date < entry.oldest) entry.oldest = levy.period.due_date;
    }

    byLot.set(levy.lot_id, entry);
  }

  const rows: LotArrears[] = lots.map((lot) => {
    const entry = byLot.get(lot.id) ?? { gross: 0, credit: 0, interest: 0, oldest: null };
    const daysOverdue = entry.oldest ? Math.max(0, daysBetween(entry.oldest, now)) : 0;
    const netOwing = round2(Math.max(0, entry.gross - entry.credit));

    return {
      lotId: lot.id,
      lotNumber: lot.lot_number,
      ownerName: lot.owner_name,
      grossArrears: entry.gross,
      credit: entry.credit,
      netOwing,
      interest: entry.interest,
      oldestDue: entry.oldest,
      daysOverdue,
      // The stage follows what the lot actually still owes — a lot that has
      // prepaid enough to cover its debt is not in recovery.
      stage: arrearsStage(netOwing, daysOverdue),
    };
  });

  return {
    asAt: now,
    lots: rows,
    grossArrears: round2(rows.reduce((s, r) => s + r.grossArrears, 0)),
    credits: round2(rows.reduce((s, r) => s + r.credit, 0)),
    netArrears: round2(rows.reduce((s, r) => s + r.netOwing, 0)),
    interest: round2(rows.reduce((s, r) => s + r.interest, 0)),
    lotsInArrears: rows.filter((r) => r.netOwing > 0.005).length,
    lotsInCredit: rows.filter((r) => r.credit > 0.005).length,
  };
}

/** The one arrears figure for a scheme. Every screen reads this. */
export async function schemeArrears(schemeId: number, now = new Date()): Promise<SchemeArrears> {
  const [scheme, lots, levies] = await Promise.all([
    prisma.strataScheme.findUnique({
      where: { id: schemeId },
      select: { arrears_grace_days: true, arrears_interest_rate: true },
    }),
    prisma.strataLot.findMany({
      where: { scheme_id: schemeId },
      orderBy: { id: "asc" },
      select: { id: true, lot_number: true, owner_name: true },
    }),
    prisma.strataLevy.findMany({
      where: { scheme_id: schemeId },
      select: {
        lot_id: true,
        fund_1_amount: true,
        fund_2_amount: true,
        period: { select: { due_date: true } },
        payments: { select: { amount: true } },
      },
    }),
  ]);

  if (!scheme) {
    return {
      asAt: now,
      lots: [],
      grossArrears: 0,
      credits: 0,
      netArrears: 0,
      interest: 0,
      lotsInArrears: 0,
      lotsInCredit: 0,
    };
  }

  return summarise(lots, levies, scheme, now);
}

/** A single lot's position — used on its notice, so the notice agrees too. */
export async function lotArrears(schemeId: number, lotId: number, now = new Date()) {
  const all = await schemeArrears(schemeId, now);
  return all.lots.find((l) => l.lotId === lotId) ?? null;
}

/**
 * Sort lots by lot number the way a person would: 2 before 10, and "Lot 3A"
 * after "Lot 3". Used wherever lots are listed.
 */
export function byLotNumber(a: { lotNumber: string }, b: { lotNumber: string }) {
  const na = parseInt(a.lotNumber, 10);
  const nb = parseInt(b.lotNumber, 10);
  if (Number.isFinite(na) && Number.isFinite(nb) && na !== nb) return na - nb;
  return a.lotNumber.localeCompare(b.lotNumber, "en-AU", { numeric: true });
}
