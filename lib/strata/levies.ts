// ── Levy arithmetic ──────────────────────────────────────────────────────────
// All of the money maths in one place so the pages, the API and the printed
// notices can never disagree about a figure.
//
// Nothing here knows any strata legislation. Period length, due dates, grace
// days and the interest rate are all settings the committee entered for their
// own scheme; this module only does arithmetic on them.

export type Frequency = "monthly" | "quarterly" | "half_yearly" | "yearly";

const MONTHS_PER_PERIOD: Record<Frequency, number> = {
  monthly: 1,
  quarterly: 3,
  half_yearly: 6,
  yearly: 12,
};

const SHORT_MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function normaliseFrequency(value: string): Frequency {
  return value === "monthly" || value === "half_yearly" || value === "yearly" ? value : "quarterly";
}

/**
 * The label for a financial year starting in `startYear`. A year that runs
 * within one calendar year is just "2026"; one that straddles is "2026-27".
 */
export function yearLabel(fyStartMonth: number, startYear: number) {
  if (fyStartMonth === 1) return String(startYear);
  return `${startYear}-${String((startYear + 1) % 100).padStart(2, "0")}`;
}

/** The financial year that contains `on`, given the scheme's FY start month. */
export function currentYearStart(fyStartMonth: number, on = new Date()) {
  const year = on.getUTCFullYear();
  return on.getUTCMonth() + 1 >= fyStartMonth ? year : year - 1;
}

export type GeneratedPeriod = { sequence: number; label: string; dueDate: Date };

/**
 * The periods of one financial year. Each period falls due on its first day —
 * a committee can move any due date afterwards.
 */
export function periodsForYear(frequency: Frequency, fyStartMonth: number, startYear: number): GeneratedPeriod[] {
  const step = MONTHS_PER_PERIOD[frequency];
  const count = 12 / step;

  return Array.from({ length: count }, (_, i) => {
    const monthIndex = fyStartMonth - 1 + i * step;
    const year = startYear + Math.floor(monthIndex / 12);
    const month = monthIndex % 12;
    const dueDate = new Date(Date.UTC(year, month, 1));

    let label: string;
    if (frequency === "monthly") label = `${SHORT_MONTH[month]} ${year}`;
    else if (frequency === "quarterly") label = `Q${i + 1}`;
    else if (frequency === "half_yearly") label = `H${i + 1}`;
    else label = "Full year";

    return { sequence: i + 1, label, dueDate };
  });
}

export function round2(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export type LotShare = { lotId: number; basis: number };
export type LevySplit = { lotId: number; fund1: number; fund2: number };

/**
 * Apportion one period's contributions across the lots by entitlement.
 *
 * Rounding each share to cents leaves a few cents that belong to nobody. Rather
 * than let the schedule fail to add up to the budget, the remainder goes to the
 * largest lot — so the printed schedule always totals exactly what was budgeted.
 */
export function apportion(fund1PerPeriod: number, fund2PerPeriod: number, lots: LotShare[]): LevySplit[] {
  const total = lots.reduce((sum, l) => sum + l.basis, 0);
  if (lots.length === 0) return [];

  if (total <= 0) {
    // No entitlements recorded yet — split evenly rather than dividing by zero.
    const even1 = round2(fund1PerPeriod / lots.length);
    const even2 = round2(fund2PerPeriod / lots.length);
    return lots.map((l) => ({ lotId: l.lotId, fund1: even1, fund2: even2 }));
  }

  // Largest-remainder apportionment. Rounding each share independently gave two
  // lots with identical entitlements different levies, which is indefensible on
  // a notice — so each share is floored to cents and the leftover cents are
  // handed out one at a time, largest fractional part first, with equal parts
  // broken by entitlement then by lot. Equal entitlements therefore always
  // produce equal levies, and the schedule still totals the budget exactly.
  function share(poolCents: number) {
    const exact = lots.map((l) => ({ lotId: l.lotId, basis: l.basis, raw: (poolCents * l.basis) / total }));
    const floors = exact.map((e) => ({ ...e, cents: Math.floor(e.raw), rem: e.raw - Math.floor(e.raw) }));
    let left = poolCents - floors.reduce((s, f) => s + f.cents, 0);

    const order = [...floors].sort(
      (a, b) => b.rem - a.rem || b.basis - a.basis || a.lotId - b.lotId,
    );
    for (const entry of order) {
      if (left <= 0) break;
      entry.cents += 1;
      left -= 1;
    }

    const byLot = new Map(floors.map((f) => [f.lotId, f.cents]));
    return byLot;
  }

  const fund1Cents = share(Math.round(fund1PerPeriod * 100));
  const fund2Cents = share(Math.round(fund2PerPeriod * 100));

  return lots.map((l) => ({
    lotId: l.lotId,
    fund1: (fund1Cents.get(l.lotId) ?? 0) / 100,
    fund2: (fund2Cents.get(l.lotId) ?? 0) / 100,
  }));
}

export const MS_PER_DAY = 86_400_000;

export function daysBetween(from: Date, to: Date) {
  return Math.floor((to.getTime() - from.getTime()) / MS_PER_DAY);
}

/**
 * Simple interest on an overdue balance, accruing only after the grace period
 * the committee set. Returns 0 when the scheme charges no interest.
 */
export function interestOn(opts: {
  outstanding: number;
  dueDate: Date;
  graceDays: number | null;
  annualRatePercent: number | null;
  asOf?: Date;
}) {
  const { outstanding, dueDate, graceDays, annualRatePercent } = opts;
  if (outstanding <= 0.005 || !annualRatePercent || annualRatePercent <= 0) return 0;

  const asOf = opts.asOf ?? new Date();
  const chargeableDays = daysBetween(dueDate, asOf) - (graceDays ?? 0);
  if (chargeableDays <= 0) return 0;

  return round2((outstanding * (annualRatePercent / 100) * chargeableDays) / 365);
}

export type ArrearsStage = {
  stage: 0 | 1 | 2 | 3 | 4;
  label: string;
  nextAction: string;
  /** True where the software will not act on its own — a person must decide. */
  needsCommittee: boolean;
};

/**
 * Where a debt sits on the escalation ladder. The day thresholds are fixed
 * habits of the product, not legal periods — nothing is sent automatically
 * past stage 2, and stages 3 and 4 always wait for a person.
 */
export function arrearsStage(outstanding: number, daysOverdue: number): ArrearsStage {
  if (outstanding <= 0.005) {
    return { stage: 0, label: "Clear", nextAction: "—", needsCommittee: false };
  }
  if (daysOverdue <= 0) {
    return { stage: 0, label: "Not yet due", nextAction: "Notice issued", needsCommittee: false };
  }
  if (daysOverdue <= 14) {
    return { stage: 1, label: "Reminder", nextAction: "Send a reminder", needsCommittee: false };
  }
  if (daysOverdue <= 30) {
    return { stage: 2, label: "Notice of demand", nextAction: "Issue a notice of demand", needsCommittee: false };
  }
  if (daysOverdue <= 60) {
    return { stage: 3, label: "Final notice", nextAction: "Committee to approve a final notice", needsCommittee: true };
  }
  return { stage: 4, label: "Recovery", nextAction: "Committee resolution to commence recovery", needsCommittee: true };
}

export function money(value: number) {
  return value.toLocaleString("en-AU", { style: "currency", currency: "AUD" });
}
