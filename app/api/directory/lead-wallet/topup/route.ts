import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDirectoryUserFromRequest } from "@/lib/directory-auth";
import { dirTier } from "@/lib/directory-tier";
import { stripe } from "@/lib/stripe";
import { LEAD_TOPUP_OPTIONS_CENTS, DEFAULT_TOPUP_CENTS, fmtAud } from "@/lib/lead-pricing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.remedialbuildingaustralia.com.au";

// Pre-load the lead wallet with credit (e.g. $100). Leads then draw down from the
// balance at the per-urgency price. Silver & Gold only. On payment the webhook
// credits the wallet; if Stripe isn't configured we credit immediately (dev).
export async function POST(request: NextRequest) {
  const user = await getDirectoryUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const company = await prisma.company.findFirst({
    where: { users: { some: { user_id: user.id } } },
    select: { id: true, name: true, plan_type: true },
  });
  if (!company) return NextResponse.json({ error: "Company not found." }, { status: 404 });

  const tier = dirTier(company.plan_type);
  if (tier !== "silver" && tier !== "gold") {
    return NextResponse.json(
      { error: "Lead credit is available on Silver and Gold plans.", code: "not_eligible" },
      { status: 403 },
    );
  }

  const body = await request.json().catch(() => ({}));
  const requested = Number(body?.amountCents);
  const amountCents = (LEAD_TOPUP_OPTIONS_CENTS as readonly number[]).includes(requested)
    ? requested
    : DEFAULT_TOPUP_CENTS;

  // Dev / Stripe not configured — credit immediately so the flow is testable.
  if (!stripe) {
    await prisma.company.update({ where: { id: company.id }, data: { lead_wallet_cents: { increment: amountCents } } });
    await prisma.leadWalletTxn.create({
      data: { company_id: company.id, delta_cents: amountCents, kind: "topup", status: "completed" },
    });
    return NextResponse.json({ success: true, paid: true, source: "manual", amountCents });
  }

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
            unit_amount: amountCents,
            product_data: { name: `Lead credit top-up — ${fmtAud(amountCents)}` },
          },
          quantity: 1,
        },
      ],
      success_url: `${SITE_URL}/directory/dashboard/lead-requests?topup=success`,
      cancel_url: `${SITE_URL}/directory/dashboard/lead-requests?topup=cancelled`,
      metadata: {
        product_line: "lead_topup",
        company_id: String(company.id),
        amount_cents: String(amountCents),
      },
      payment_intent_data: {
        metadata: { product_line: "lead_topup", company_id: String(company.id), amount_cents: String(amountCents) },
      },
    });
  } catch (err) {
    console.error("[lead-topup] checkout failed:", err);
    return NextResponse.json({ error: "Could not start checkout. Please try again." }, { status: 502 });
  }

  await prisma.leadWalletTxn.create({
    data: {
      company_id: company.id,
      delta_cents: amountCents,
      kind: "topup",
      stripe_session_id: session.id,
      status: "pending",
    },
  });

  return NextResponse.json({ checkoutUrl: session.url });
}
