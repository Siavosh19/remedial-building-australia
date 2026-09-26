// ── Who may edit, and what it costs ──────────────────────────────────────────
// Decided in exactly one place. The pages, the API and (later) the billing all
// read the same function, so they cannot disagree about whether an account is
// entitled — a disagreement between the UI and the gate is how people end up
// locked out of something they have paid for, or editing something they have not.
//
// The allowance is per ACCOUNT, because the free tier is "one strata plan under
// the lot limit". A second plan makes the account billable however small it is.

import { prisma } from "@/lib/prisma";

export type PricingSettings = {
  centsPerLotMonthly: number;
  yearlyMonthsCharged: number;
  freeLotLimit: number;
  freeSchemeLimit: number;
  trialMonths: number;
  graceDays: number;
};

const FALLBACK: PricingSettings = {
  centsPerLotMonthly: 80,
  yearlyMonthsCharged: 10,
  freeLotLimit: 13,
  freeSchemeLimit: 1,
  trialMonths: 6,
  graceDays: 30,
};

/** The single source of truth for price, free allowance and trial length. */
export async function pricing(): Promise<PricingSettings> {
  // The public pricing page reads this. It must never be the reason a page
  // fails to render, so an unreachable or not-yet-migrated database falls back
  // to the shipped defaults rather than throwing.
  let row: Awaited<ReturnType<typeof prisma.strataPricing.findUnique>> = null;
  try {
    row = await prisma.strataPricing.findUnique({ where: { id: 1 } });
  } catch (err) {
    console.error("[strata] pricing unavailable, using defaults:", err);
    return FALLBACK;
  }
  if (!row) return FALLBACK;
  return {
    centsPerLotMonthly: row.cents_per_lot_monthly,
    yearlyMonthsCharged: row.yearly_months_charged,
    freeLotLimit: row.free_lot_limit,
    freeSchemeLimit: row.free_scheme_limit,
    trialMonths: row.trial_months,
    graceDays: row.grace_days,
  };
}

export type EntitlementState = "free" | "trialling" | "active" | "grace" | "locked";

export type Entitlement = {
  state: EntitlementState;
  /** The only question the rest of the app asks. */
  canEdit: boolean;
  /** One plain sentence, shown to the committee when editing is blocked. */
  reason: string;
  ownerUserId: number;
  schemes: number;
  lots: number;
  billableLots: number;
  monthlyCents: number;
  yearlyCents: number;
  trialEndsAt: Date | null;
  trialDaysLeft: number | null;
  currentPeriodEnd: Date | null;
  interval: "monthly" | "yearly" | null;
  withinFreeAllowance: boolean;
  settings: PricingSettings;
};

function daysUntil(date: Date, from = new Date()) {
  const ms =
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) -
    Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate());
  return Math.round(ms / 86_400_000);
}

export function monthlyCentsFor(billableLots: number, settings: PricingSettings) {
  return billableLots * settings.centsPerLotMonthly;
}

export function yearlyCentsFor(billableLots: number, settings: PricingSettings) {
  return billableLots * settings.centsPerLotMonthly * settings.yearlyMonthsCharged;
}

export function formatAud(cents: number) {
  return (cents / 100).toLocaleString("en-AU", { style: "currency", currency: "AUD" });
}

/**
 * Start the trial the first time an account is seen. No card, nothing to accept
 * beyond the terms — the clock simply starts when the first scheme is created.
 */
export async function ensureSubscription(userId: number) {
  const existing = await prisma.strataSubscription.findUnique({ where: { user_id: userId } });
  if (existing) return existing;

  const settings = await pricing();
  const now = new Date();
  const ends = new Date(now);
  ends.setUTCMonth(ends.getUTCMonth() + settings.trialMonths);

  return prisma.strataSubscription.create({
    data: { user_id: userId, status: "trialling", trial_started_at: now, trial_ends_at: ends },
  });
}

/** Entitlement for the account that owns a scheme. */
export async function entitlementForOwner(ownerUserId: number, now = new Date()): Promise<Entitlement> {
  const settings = await pricing();

  const [schemes, subscription] = await Promise.all([
    prisma.strataScheme.findMany({
      where: { owner_user_id: ownerUserId },
      select: { id: true, _count: { select: { lots: true } } },
    }),
    prisma.strataSubscription.findUnique({ where: { user_id: ownerUserId } }),
  ]);

  const schemeCount = schemes.length;
  const lots = schemes.reduce((sum, s) => sum + s._count.lots, 0);

  // The free allowance: one plan, under the lot limit. Anything beyond either
  // makes the whole account billable on its total lots.
  const withinFreeAllowance =
    schemeCount <= settings.freeSchemeLimit && lots <= settings.freeLotLimit;
  const billableLots = withinFreeAllowance ? 0 : lots;

  const base = {
    ownerUserId,
    schemes: schemeCount,
    lots,
    billableLots,
    monthlyCents: monthlyCentsFor(billableLots, settings),
    yearlyCents: yearlyCentsFor(billableLots, settings),
    trialEndsAt: subscription?.trial_ends_at ?? null,
    trialDaysLeft: subscription?.trial_ends_at ? daysUntil(subscription.trial_ends_at, now) : null,
    currentPeriodEnd: subscription?.current_period_end ?? null,
    interval: (subscription?.interval ?? null) as "monthly" | "yearly" | null,
    withinFreeAllowance,
    settings,
  };

  if (withinFreeAllowance) {
    return {
      ...base,
      state: "free",
      canEdit: true,
      reason: `Free — one strata plan with ${settings.freeLotLimit} lots or fewer.`,
    };
  }

  // A paid subscription that has not lapsed.
  if (subscription?.status === "active") {
    const lapsed =
      subscription.current_period_end !== null && subscription.current_period_end < now;
    if (!lapsed) {
      return { ...base, state: "active", canEdit: true, reason: "Subscription active." };
    }
  }

  // Trial still running.
  if (subscription?.trial_ends_at && subscription.trial_ends_at > now) {
    return {
      ...base,
      state: "trialling",
      canEdit: true,
      reason: `Free trial — ${Math.max(0, daysUntil(subscription.trial_ends_at, now))} days left.`,
    };
  }

  // Payment failed, or the trial just ended: a grace window before locking.
  if (subscription) {
    const reference = subscription.current_period_end ?? subscription.trial_ends_at;
    if (reference) {
      const sinceEnd = -daysUntil(reference, now);
      if (sinceEnd <= settings.graceDays) {
        const left = settings.graceDays - sinceEnd;
        return {
          ...base,
          state: "grace",
          canEdit: true,
          reason:
            subscription.status === "past_due"
              ? `Payment did not go through. ${left} days to fix it before the scheme becomes read-only.`
              : `Your free trial has ended. ${left} days to subscribe before the scheme becomes read-only.`,
        };
      }
    }
  }

  return {
    ...base,
    state: "locked",
    canEdit: false,
    reason:
      schemeCount > settings.freeSchemeLimit
        ? "This account has more than one strata plan, so it needs a subscription. Your records are safe and can still be read and exported."
        : `This scheme has ${lots} lots, above the free limit of ${settings.freeLotLimit}. Your records are safe and can still be read and exported.`,
  };
}

/** Entitlement for a scheme, resolved through the account that owns it. */
export async function entitlementForScheme(schemeId: number, now = new Date()) {
  const scheme = await prisma.strataScheme.findUnique({
    where: { id: schemeId },
    select: { owner_user_id: true },
  });
  if (!scheme) return null;
  return entitlementForOwner(scheme.owner_user_id, now);
}
