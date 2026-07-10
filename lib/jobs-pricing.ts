import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import type { JobPricing } from "@prisma/client";

// Admin-managed jobs pricing is the single source of truth. Each row is mirrored
// to a Stripe Product + one-time Price. Stripe prices are immutable, so changing
// an amount creates a NEW price and repoints the row (mirrors lib/plans.ts).

export async function getActiveJobPricing(): Promise<JobPricing[]> {
  return prisma.jobPricing.findMany({
    where: { is_active: true },
    orderBy: [{ display_order: "asc" }, { amount_cents: "asc" }],
  });
}

export async function getJobPricingByKey(key: string): Promise<JobPricing | null> {
  return prisma.jobPricing.findUnique({ where: { key } });
}

// Rich listing-tier data for the post/edit form cards (name, description,
// features, price + duration) — so the form shows exactly what admin configured.
export type ListingTier = {
  name: string;
  priceLabel: string | null;
  durationDays: number;
  description: string | null;
  features: string[];
};

export async function getListingTiers(): Promise<{ standard: ListingTier | null; featured: ListingTier | null }> {
  const toTier = (r: JobPricing | null): ListingTier | null =>
    r
      ? {
          name: r.name,
          priceLabel: formatAud(r.amount_cents),
          durationDays: r.duration_days,
          description: r.description,
          features: r.features ?? [],
        }
      : null;
  try {
    const [std, feat] = await Promise.all([getJobPricingByKey("standard"), getJobPricingByKey("featured")]);
    return { standard: toTier(std), featured: toTier(feat) };
  } catch {
    return { standard: null, featured: null };
  }
}

// Resolve the price a job should be charged: featured row when featured, else standard.
export async function resolveJobPrice(isFeatured: boolean): Promise<JobPricing | null> {
  const key = isFeatured ? "featured" : "standard";
  const row = await getJobPricingByKey(key);
  if (row && row.is_active) return row;
  // Fall back to the other listing tier if the requested one is missing/inactive.
  return prisma.jobPricing.findFirst({
    where: { kind: "listing", is_active: true },
    orderBy: { display_order: "asc" },
  });
}

// Create/refresh the Stripe Product + one-time Price for a pricing row. Degrades
// gracefully (returns nulls) when Stripe isn't configured yet.
export async function syncJobPricingToStripe(
  row: Pick<JobPricing, "name" | "description" | "amount_cents" | "currency" | "key" | "stripe_product_id">,
): Promise<{ stripe_product_id: string | null; stripe_price_id: string | null }> {
  if (!stripe) return { stripe_product_id: row.stripe_product_id ?? null, stripe_price_id: null };

  let productId = row.stripe_product_id ?? null;
  if (productId) {
    try {
      await stripe.products.update(productId, { name: row.name, description: row.description ?? undefined });
    } catch {
      productId = null; // deleted in Stripe — recreate
    }
  }
  if (!productId) {
    const product = await stripe.products.create({
      name: row.name,
      description: row.description ?? undefined,
      metadata: { product_line: "jobs", key: row.key },
    });
    productId = product.id;
  }

  const price = await stripe.prices.create({
    product: productId,
    currency: (row.currency || "aud").toLowerCase(),
    unit_amount: row.amount_cents,
    metadata: { product_line: "jobs", key: row.key },
  });

  return { stripe_product_id: productId, stripe_price_id: price.id };
}

export async function archiveJobStripePrice(priceId: string | null) {
  if (!stripe || !priceId) return;
  try {
    await stripe.prices.update(priceId, { active: false });
  } catch {
    /* ignore */
  }
}

export function formatAud(cents: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}
