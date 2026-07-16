import { prisma } from "@/lib/prisma";
import { URGENCY_OPTIONS } from "@/lib/quote-options";

// Pay-per-lead pricing. A business that has used its weekly interest allowance
// (WEEKLY_INTEREST_CAP) can still buy a lead — the price depends on the client's
// urgency: an emergency job is worth more than one at planning/budgeting stage.
//
// Prices live in the admin-managed `lead_prices` table (one row per urgency) so
// they can be changed without a deploy. These constants are the seed + a safe
// fallback if the table is empty or unreachable.
export const LEAD_PRICE_FALLBACK_CENTS: Record<string, number> = {
  emergency: 2000, // Emergency / make-safe — $20
  within_week: 1000, // Within a week — $10
  within_month: 1000, // Within a month (a few weeks) — $10
  planning: 500, // Planning / budgeting stage — $5
};
const DEFAULT_LEAD_PRICE_CENTS = 1000;

// Top-up bundle amounts a business can pre-load into their lead wallet. Leads
// then draw down from the wallet balance at the per-urgency price above.
export const LEAD_TOPUP_OPTIONS_CENTS = [5000, 10000, 20000] as const; // $50 / $100 / $200
export const DEFAULT_TOPUP_CENTS = 10000; // $100

export function urgencyLabelForPrice(urgency?: string | null): string {
  return URGENCY_OPTIONS.find((o) => o.id === urgency)?.label ?? "This job";
}

export function fmtAud(cents: number): string {
  const d = cents / 100;
  return Number.isInteger(d) ? `$${d.toLocaleString("en-AU")}` : `$${d.toFixed(2)}`;
}

// The price to buy a single lead, given the request's urgency. Reads the admin
// table first, falls back to the constants above.
export async function getLeadPriceCents(urgency?: string | null): Promise<number> {
  const key = urgency ?? "";
  try {
    const row = await prisma.leadPrice.findUnique({ where: { urgency: key } });
    if (row) return row.amount_cents;
  } catch {
    /* table missing / DB down — fall through to constants */
  }
  return LEAD_PRICE_FALLBACK_CENTS[key] ?? DEFAULT_LEAD_PRICE_CENTS;
}

// All configured lead prices, keyed by urgency (for the admin editor + cards).
export async function getAllLeadPricesCents(): Promise<Record<string, number>> {
  const merged: Record<string, number> = { ...LEAD_PRICE_FALLBACK_CENTS };
  try {
    const rows = await prisma.leadPrice.findMany();
    for (const r of rows) merged[r.urgency] = r.amount_cents;
  } catch {
    /* fall back to constants */
  }
  return merged;
}
