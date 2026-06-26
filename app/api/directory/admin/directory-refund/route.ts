import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireWriteAdmin } from "@/lib/admin-auth";
import { stripe } from "@/lib/stripe";

// Admin refund for a directory business. Refunds the most recent successful
// payment (full or a partial amount), and can optionally cancel the subscription
// immediately and revert the listing to free Basic.
export async function POST(request: NextRequest) {
  const { error } = await requireWriteAdmin(request);
  if (error) return error;
  if (!stripe) return NextResponse.json({ error: "Stripe is not configured." }, { status: 503 });

  const body = await request.json().catch(() => null);
  const companyId = Number(body?.companyId);
  const chargeId = typeof body?.chargeId === "string" && body.chargeId ? body.chargeId : null; // refund a specific transaction
  const amountCents = body?.amountCents != null && body.amountCents !== "" ? Number(body.amountCents) : null; // null = full
  const alsoCancel = body?.alsoCancel === true;
  if (!companyId) return NextResponse.json({ error: "Invalid company." }, { status: 400 });

  const company = await prisma.company.findUnique({
    where: { id: companyId },
    include: { directory_subscription: true },
  });
  const customerId = company?.directory_subscription?.stripe_customer_id;
  if (!company || !customerId) {
    return NextResponse.json({ error: "This business has no Stripe customer / payment to refund." }, { status: 400 });
  }

  // The specific transaction to refund (or the most recent refundable one).
  let charge;
  if (chargeId) {
    charge = await stripe.charges.retrieve(chargeId).catch(() => null);
    if (!charge || charge.customer !== customerId) {
      return NextResponse.json({ error: "Transaction not found for this business." }, { status: 400 });
    }
    if (charge.amount - charge.amount_refunded <= 0) {
      return NextResponse.json({ error: "This transaction has already been fully refunded." }, { status: 400 });
    }
  } else {
    const charges = await stripe.charges.list({ customer: customerId, limit: 10 });
    charge = charges.data.find((c) => c.status === "succeeded" && c.paid && c.amount - c.amount_refunded > 0) ?? null;
  }
  if (!charge) return NextResponse.json({ error: "No refundable payment found for this business." }, { status: 400 });

  const refundable = charge.amount - charge.amount_refunded;
  if (amountCents != null && (!Number.isInteger(amountCents) || amountCents <= 0 || amountCents > refundable)) {
    return NextResponse.json({ error: `Refund amount must be between $0.01 and $${(refundable / 100).toFixed(2)}.` }, { status: 400 });
  }

  let refund;
  try {
    refund = await stripe.refunds.create({ charge: charge.id, ...(amountCents != null ? { amount: amountCents } : {}) });
  } catch (e) {
    return NextResponse.json({ error: `Stripe refund failed: ${(e as Error).message}` }, { status: 502 });
  }

  // Optionally end the subscription now and drop the listing to free.
  let cancelled = false;
  if (alsoCancel && company.directory_subscription?.stripe_subscription_id) {
    try { await stripe.subscriptions.cancel(company.directory_subscription.stripe_subscription_id); } catch { /* may already be gone */ }
    await prisma.$transaction([
      prisma.directorySubscription.update({
        where: { company_id: companyId },
        data: { subscription_status: "cancelled", cancelled_at: new Date(), cancel_at_period_end: false },
      }),
      prisma.company.update({
        where: { id: companyId },
        data: { plan_type: "basic", is_featured: false, quote_requests_enabled: false },
      }),
    ]);
    cancelled = true;
  }

  return NextResponse.json({
    success: true,
    refundedCents: refund.amount,
    currency: refund.currency.toUpperCase(),
    cancelled,
  });
}
