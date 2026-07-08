import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireWriteAdmin } from "@/lib/admin-auth";
import { syncJobPricingToStripe, archiveJobStripePrice } from "@/lib/jobs-pricing";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireWriteAdmin(request);
  if (error) return error;
  const { id } = await params;
  const row = await prisma.jobPricing.findUnique({ where: { id: Number(id) } });
  if (!row) return NextResponse.json({ error: "Not found." }, { status: 404 });

  const body = await request.json().catch(() => ({}));
  const name = body.name != null ? String(body.name).trim() : row.name;
  const description = body.description != null ? String(body.description) : row.description;
  const currency = body.currency != null ? String(body.currency).toLowerCase() : row.currency;
  const amount = body.amount_cents != null ? Number(body.amount_cents) : row.amount_cents;
  if (!Number.isInteger(amount) || amount < 0) return NextResponse.json({ error: "Amount must be whole cents." }, { status: 400 });

  // Repricing → new immutable Stripe price; archive the old one.
  const priceChanged = amount !== row.amount_cents || currency !== row.currency || name !== row.name;
  let stripeIds = { stripe_product_id: row.stripe_product_id, stripe_price_id: row.stripe_price_id };
  if (priceChanged) {
    const synced = await syncJobPricingToStripe({ name, description, amount_cents: amount, currency, key: row.key, stripe_product_id: row.stripe_product_id });
    if (synced.stripe_price_id) {
      await archiveJobStripePrice(row.stripe_price_id);
      stripeIds = synced;
    }
  }

  const updated = await prisma.jobPricing.update({
    where: { id: row.id },
    data: {
      name, description, currency, amount_cents: amount,
      kind: body.kind === "addon" ? "addon" : body.kind === "listing" ? "listing" : row.kind,
      duration_days: body.duration_days != null ? Number(body.duration_days) : row.duration_days,
      features: Array.isArray(body.features) ? body.features.map(String).filter(Boolean) : row.features,
      is_active: body.is_active != null ? Boolean(body.is_active) : row.is_active,
      display_order: body.display_order != null ? Number(body.display_order) : row.display_order,
      stripe_product_id: stripeIds.stripe_product_id,
      stripe_price_id: stripeIds.stripe_price_id,
    },
  });
  return NextResponse.json({ pricing: updated });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireWriteAdmin(request);
  if (error) return error;
  const { id } = await params;
  const row = await prisma.jobPricing.findUnique({ where: { id: Number(id) } });
  if (!row) return NextResponse.json({ error: "Not found." }, { status: 404 });
  // Soft-deactivate rather than delete so historical payments stay coherent.
  await prisma.jobPricing.update({ where: { id: row.id }, data: { is_active: false } });
  await archiveJobStripePrice(row.stripe_price_id);
  return NextResponse.json({ ok: true });
}
