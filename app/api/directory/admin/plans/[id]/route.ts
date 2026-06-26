import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireWriteAdmin } from "@/lib/admin-auth";
import { syncPlanToStripe, archiveStripePrice } from "@/lib/plans";

export async function PATCH(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { error } = await requireWriteAdmin(request);
  if (error) return error;
  const { id } = await ctx.params;
  const planId = Number(id);
  const existing = await prisma.plan.findUnique({ where: { id: planId } });
  if (!existing) return NextResponse.json({ error: "Plan not found." }, { status: 404 });

  const body = await request.json().catch(() => ({}));
  const upd: Record<string, unknown> = {};
  for (const f of ["name", "description", "tier", "product_line"] as const) {
    if (typeof body[f] === "string") upd[f] = body[f];
  }
  if (Array.isArray(body.features)) upd.features = body.features.map(String).filter(Boolean);
  if (typeof body.is_active === "boolean") upd.is_active = body.is_active;
  if (typeof body.is_public === "boolean") upd.is_public = body.is_public;
  if (Number.isFinite(Number(body.display_order))) upd.display_order = Number(body.display_order);
  if (Number.isFinite(Number(body.trial_days))) upd.trial_days = Number(body.trial_days);

  // A price/interval/currency change means a NEW Stripe price (prices are immutable).
  const newAmount = Number.isFinite(Number(body.amount_cents)) ? Number(body.amount_cents) : existing.amount_cents;
  const newInterval = typeof body.billing_interval === "string" ? body.billing_interval : existing.billing_interval;
  const newCurrency = typeof body.currency === "string" ? body.currency.toLowerCase() : existing.currency;
  const priceChanged = newAmount !== existing.amount_cents || newInterval !== existing.billing_interval || newCurrency !== existing.currency;
  const nameChanged = typeof upd.name === "string" && upd.name !== existing.name;

  if (priceChanged || nameChanged) {
    const ids = await syncPlanToStripe({
      name: (upd.name as string) ?? existing.name,
      description: (upd.description as string) ?? existing.description,
      billing_interval: newInterval, amount_cents: newAmount, currency: newCurrency,
      product_line: (upd.product_line as string) ?? existing.product_line,
      tier: (upd.tier as string) ?? existing.tier,
      stripe_product_id: existing.stripe_product_id,
    });
    if (priceChanged && ids.stripe_price_id) {
      await archiveStripePrice(existing.stripe_price_id); // retire old price
      upd.amount_cents = newAmount; upd.billing_interval = newInterval; upd.currency = newCurrency;
      upd.stripe_price_id = ids.stripe_price_id;
    } else if (priceChanged) {
      // Stripe not configured — still record the new amount; sync later.
      upd.amount_cents = newAmount; upd.billing_interval = newInterval; upd.currency = newCurrency;
    }
    if (ids.stripe_product_id) upd.stripe_product_id = ids.stripe_product_id;
  }

  const plan = await prisma.plan.update({ where: { id: planId }, data: upd });
  return NextResponse.json({ plan });
}

export async function DELETE(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { error } = await requireWriteAdmin(request);
  if (error) return error;
  const { id } = await ctx.params;
  const planId = Number(id);
  const existing = await prisma.plan.findUnique({ where: { id: planId } });
  if (!existing) return NextResponse.json({ error: "Plan not found." }, { status: 404 });
  // Soft-archive: deactivate + retire the Stripe price (keeps existing subscribers).
  await archiveStripePrice(existing.stripe_price_id);
  const plan = await prisma.plan.update({ where: { id: planId }, data: { is_active: false, is_public: false } });
  return NextResponse.json({ plan });
}
