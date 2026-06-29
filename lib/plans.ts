import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import type { Plan } from "@prisma/client";

// Display labels for directory plan tiers. Internal enum values are unchanged
// (basic / claimed / featured); these are the customer-facing names used across
// dashboards, badges and emails.
const PLAN_LABELS: Record<string, string> = {
  basic: "Free Listing",
  claimed: "Silver",
  featured: "Gold",
  business: "Silver",
  premium: "Gold",
};

export function planLabel(tier: string | null | undefined): string {
  return (tier && PLAN_LABELS[tier]) || "Free Listing";
}

// Single source of truth for billing plans. Admin manages rows in the `plans`
// table; checkout + pricing read from here. Each plan is mirrored to a Stripe
// Product + Price. Stripe prices are immutable, so changing an amount creates a
// NEW price and repoints the plan — existing subscribers keep their old price.

export type PlanInput = {
  product_line: string;
  tier: string;
  name: string;
  description?: string | null;
  billing_interval: string; // "month" | "year" | "one_time"
  amount_cents: number;
  currency?: string;
  trial_days?: number;
  features?: string[];
  is_active?: boolean;
  is_public?: boolean;
  display_order?: number;
};

const intervalForStripe = (i: string): "month" | "year" | null =>
  i === "month" ? "month" : i === "year" ? "year" : null; // one_time → no recurring

// Create/refresh the Stripe Product + Price for a plan. Returns the ids to store.
// No-ops gracefully (returns nulls) when Stripe isn't configured yet — the plan
// is still saved, and can be synced later once STRIPE_SECRET_KEY is set.
export async function syncPlanToStripe(
  plan: Pick<Plan, "name" | "description" | "billing_interval" | "amount_cents" | "currency" | "product_line" | "tier" | "stripe_product_id">,
): Promise<{ stripe_product_id: string | null; stripe_price_id: string | null }> {
  if (!stripe) return { stripe_product_id: plan.stripe_product_id ?? null, stripe_price_id: null };

  // Reuse the product if one already exists for this plan; else create it.
  let productId = plan.stripe_product_id ?? null;
  if (productId) {
    try {
      await stripe.products.update(productId, { name: plan.name, description: plan.description ?? undefined });
    } catch {
      productId = null; // product was deleted in Stripe — recreate below
    }
  }
  if (!productId) {
    const product = await stripe.products.create({
      name: plan.name,
      description: plan.description ?? undefined,
      metadata: { product_line: plan.product_line, tier: plan.tier },
    });
    productId = product.id;
  }

  const recurring = intervalForStripe(plan.billing_interval);
  const price = await stripe.prices.create({
    product: productId,
    currency: (plan.currency || "aud").toLowerCase(),
    unit_amount: plan.amount_cents,
    ...(recurring ? { recurring: { interval: recurring } } : {}),
    metadata: { product_line: plan.product_line, tier: plan.tier },
  });

  return { stripe_product_id: productId, stripe_price_id: price.id };
}

// Archive the old Stripe price when a plan is repriced/deactivated (best-effort).
export async function archiveStripePrice(priceId: string | null) {
  if (!stripe || !priceId) return;
  try { await stripe.prices.update(priceId, { active: false }); } catch { /* ignore */ }
}

export async function getActivePlans(productLine: string): Promise<Plan[]> {
  return prisma.plan.findMany({
    where: { product_line: productLine, is_active: true },
    orderBy: [{ display_order: "asc" }, { amount_cents: "asc" }],
  });
}

// Resolve a directory plan by tier + interval (used by checkout).
export async function getDirectoryPlan(tier: string, interval: string): Promise<Plan | null> {
  return prisma.plan.findFirst({
    where: { product_line: "directory", tier, billing_interval: interval, is_active: true },
    orderBy: { updated_at: "desc" },
  });
}
