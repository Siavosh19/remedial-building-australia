import { prisma } from "@/lib/prisma";
import PricingClient, { type PricingRow } from "./PricingClient";

export const dynamic = "force-dynamic";

export default async function JobsPricingPage() {
  let pricing: PricingRow[] = [];
  try {
    const rows = await prisma.jobPricing.findMany({ orderBy: [{ display_order: "asc" }, { amount_cents: "asc" }] });
    pricing = rows.map((r) => ({
      id: r.id, key: r.key, name: r.name, description: r.description, kind: r.kind,
      amountCents: r.amount_cents, currency: r.currency, durationDays: r.duration_days,
      features: r.features, isActive: r.is_active, displayOrder: r.display_order,
      hasStripePrice: Boolean(r.stripe_price_id),
    }));
  } catch (err) {
    console.error("[admin/jobs/pricing] load failed:", err);
  }
  return <PricingClient initial={pricing} stripeConfigured={Boolean(process.env.STRIPE_SECRET_KEY)} />;
}
