import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, requireWriteAdmin } from "@/lib/admin-auth";
import { syncPlanToStripe, type PlanInput } from "@/lib/plans";

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const plans = await prisma.plan.findMany({
    orderBy: [{ product_line: "asc" }, { display_order: "asc" }, { amount_cents: "asc" }],
  });
  return NextResponse.json({ plans, stripeConfigured: Boolean(process.env.STRIPE_SECRET_KEY) });
}

function parse(body: Record<string, unknown>): { data?: PlanInput; error?: string } {
  const name = String(body.name ?? "").trim();
  const product_line = String(body.product_line ?? "").trim();
  const tier = String(body.tier ?? "").trim();
  const billing_interval = String(body.billing_interval ?? "").trim();
  const amount = Number(body.amount_cents);
  if (!name) return { error: "Name is required." };
  if (!product_line) return { error: "Product line is required." };
  if (!tier) return { error: "Tier is required." };
  if (!["month", "year", "one_time"].includes(billing_interval)) return { error: "Invalid billing interval." };
  if (!Number.isInteger(amount) || amount < 0) return { error: "Amount must be a whole number of cents." };
  return {
    data: {
      name, product_line, tier, billing_interval, amount_cents: amount,
      description: body.description ? String(body.description) : null,
      currency: body.currency ? String(body.currency).toLowerCase() : "aud",
      trial_days: Number.isFinite(Number(body.trial_days)) ? Number(body.trial_days) : 0,
      features: Array.isArray(body.features) ? body.features.map(String).filter(Boolean) : [],
      is_active: body.is_active !== false,
      is_public: body.is_public !== false,
      display_order: Number.isFinite(Number(body.display_order)) ? Number(body.display_order) : 0,
    },
  };
}

export async function POST(request: NextRequest) {
  const { error } = await requireWriteAdmin(request);
  if (error) return error;
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const { data, error: vErr } = parse(body);
  if (vErr || !data) return NextResponse.json({ error: vErr }, { status: 400 });

  // Mirror to Stripe (creates Product + Price). Degrades gracefully if Stripe off.
  const stripeIds = await syncPlanToStripe({
    name: data.name, description: data.description ?? null, billing_interval: data.billing_interval,
    amount_cents: data.amount_cents, currency: data.currency ?? "aud", product_line: data.product_line,
    tier: data.tier, stripe_product_id: null,
  });

  const plan = await prisma.plan.create({
    data: {
      product_line: data.product_line, tier: data.tier, name: data.name, description: data.description ?? null,
      billing_interval: data.billing_interval, amount_cents: data.amount_cents, currency: data.currency ?? "aud",
      trial_days: data.trial_days ?? 0, features: data.features ?? [],
      is_active: data.is_active ?? true, is_public: data.is_public ?? true, display_order: data.display_order ?? 0,
      stripe_product_id: stripeIds.stripe_product_id, stripe_price_id: stripeIds.stripe_price_id,
    },
  });
  return NextResponse.json({ plan, synced: Boolean(stripeIds.stripe_price_id) });
}
