import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDirectoryUserFromRequest } from "@/lib/directory-auth";
import { dirTier } from "@/lib/directory-tier";
import { stripe } from "@/lib/stripe";
import { getLeadPriceCents, urgencyLabelForPrice } from "@/lib/lead-pricing";
import { applyLeadInterest } from "@/lib/lead-interest";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.remedialbuildingaustralia.com.au";
type Params = { params: Promise<{ id: string }> };

// Buy a single lead once the weekly interest allowance is used up. Silver & Gold
// only. Two funding sources:
//   1. Lead wallet — if the balance covers the urgency price, deduct it and
//      record interest immediately (no redirect).
//   2. Stripe one-off checkout — otherwise send them to pay for this one lead;
//      the webhook records the interest on payment.
export async function POST(request: NextRequest, { params }: Params) {
  const user = await getDirectoryUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const deliveryId = Number(id);
  if (!Number.isInteger(deliveryId)) return NextResponse.json({ error: "Invalid ID." }, { status: 400 });

  const company = await prisma.company.findFirst({
    where: { users: { some: { user_id: user.id } } },
    select: { id: true, name: true, plan_type: true, lead_wallet_cents: true },
  });
  if (!company) return NextResponse.json({ error: "Company not found." }, { status: 404 });

  // Only paying tiers can buy leads.
  const tier = dirTier(company.plan_type);
  if (tier !== "silver" && tier !== "gold") {
    return NextResponse.json(
      { error: "Buying leads is available on Silver and Gold plans. Upgrade to buy leads.", code: "not_eligible" },
      { status: 403 },
    );
  }

  const delivery = await prisma.quoteRequestDelivery.findFirst({
    where: { id: deliveryId, company_id: company.id },
    select: {
      id: true,
      interested_at: true,
      request: { select: { id: true, status: true, urgency: true } },
    },
  });
  if (!delivery) return NextResponse.json({ error: "Lead not found." }, { status: 404 });
  if (delivery.request.status === "closed") {
    return NextResponse.json({ error: "The client has closed this request." }, { status: 409 });
  }
  // Already expressed interest — nothing to buy.
  if (delivery.interested_at) return NextResponse.json({ success: true, alreadyInterested: true });

  const priceCents = await getLeadPriceCents(delivery.request.urgency);

  // ── Source 1: pay from the wallet balance ──────────────────────────────────
  if (company.lead_wallet_cents >= priceCents) {
    // Atomic conditional decrement guards against a double-spend from two taps.
    const debit = await prisma.company.updateMany({
      where: { id: company.id, lead_wallet_cents: { gte: priceCents } },
      data: { lead_wallet_cents: { decrement: priceCents } },
    });
    if (debit.count === 0) {
      return NextResponse.json({ error: "Insufficient wallet balance." }, { status: 409 });
    }
    await prisma.leadWalletTxn.create({
      data: {
        company_id: company.id,
        delta_cents: -priceCents,
        kind: "spend",
        delivery_id: delivery.id,
        urgency: delivery.request.urgency,
        status: "completed",
      },
    });
    const result = await applyLeadInterest(delivery.id, company.id, { paidCents: priceCents });
    if (result === "already") {
      // Interest was recorded elsewhere between our checks — refund the debit.
      await prisma.company.update({ where: { id: company.id }, data: { lead_wallet_cents: { increment: priceCents } } });
      await prisma.leadWalletTxn.create({
        data: { company_id: company.id, delta_cents: priceCents, kind: "refund", delivery_id: delivery.id, status: "completed" },
      });
    }
    return NextResponse.json({ success: true, paid: true, source: "wallet", priceCents });
  }

  // ── Source 2: one-off Stripe checkout for this single lead ──────────────────
  if (!stripe) {
    // Dev / Stripe not configured — record the interest so the flow is testable.
    await applyLeadInterest(delivery.id, company.id, { paidCents: priceCents });
    await prisma.leadWalletTxn.create({
      data: { company_id: company.id, delta_cents: -priceCents, kind: "purchase", delivery_id: delivery.id, urgency: delivery.request.urgency, status: "completed" },
    });
    return NextResponse.json({ success: true, paid: true, source: "manual", priceCents });
  }

  const label = urgencyLabelForPrice(delivery.request.urgency);
  let session;
  try {
    session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: user.email,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "aud",
            unit_amount: priceCents,
            product_data: { name: `Lead purchase — ${label}` },
          },
          quantity: 1,
        },
      ],
      success_url: `${SITE_URL}/directory/dashboard/lead-requests/${delivery.id}?purchase=success`,
      cancel_url: `${SITE_URL}/directory/dashboard/lead-requests/${delivery.id}?purchase=cancelled`,
      metadata: {
        product_line: "lead",
        company_id: String(company.id),
        delivery_id: String(delivery.id),
        price_cents: String(priceCents),
      },
      payment_intent_data: {
        metadata: { product_line: "lead", company_id: String(company.id), delivery_id: String(delivery.id) },
      },
    });
  } catch (err) {
    console.error("[lead-purchase] checkout failed:", err);
    return NextResponse.json({ error: "Could not start checkout. Please try again." }, { status: 502 });
  }

  await prisma.leadWalletTxn.create({
    data: {
      company_id: company.id,
      delta_cents: -priceCents,
      kind: "purchase",
      delivery_id: delivery.id,
      urgency: delivery.request.urgency,
      stripe_session_id: session.id,
      status: "pending",
    },
  });

  return NextResponse.json({ checkoutUrl: session.url });
}
