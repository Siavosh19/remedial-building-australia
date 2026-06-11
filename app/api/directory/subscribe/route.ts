import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDirectoryUserFromRequest } from "@/lib/directory-auth";
import { stripe, STRIPE_DIR_PRICES, DIR_PLAN_AMOUNTS } from "@/lib/stripe";
import type { DirectoryPlanType, DirectoryBillingCycle } from "@prisma/client";

type PriceKey = keyof typeof STRIPE_DIR_PRICES;

const PLAN_KEY_MAP: Record<string, PriceKey> = {
  "claimed-monthly":  "claimed_monthly",
  "claimed-yearly":   "claimed_yearly",
  "featured-monthly": "featured_monthly",
  "featured-yearly":  "featured_yearly",
};

export async function POST(request: NextRequest) {
  const user = await getDirectoryUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const planKey = String(body.plan ?? "");
  const priceKey = PLAN_KEY_MAP[planKey];
  if (!priceKey) return NextResponse.json({ error: "Invalid plan." }, { status: 400 });

  const company = await prisma.company.findFirst({
    where: { users: { some: { user_id: user.id } } },
    include: { directory_subscription: true },
  });
  if (!company) return NextResponse.json({ error: "Company not found." }, { status: 404 });

  const planType: DirectoryPlanType = planKey.startsWith("featured") ? "featured" : "claimed";
  const billingCycle: DirectoryBillingCycle = planKey.endsWith("yearly") ? "yearly" : "monthly";

  // Manual fallback if Stripe not configured
  if (!stripe || !STRIPE_DIR_PRICES[priceKey]) {
    const trialEnd = new Date();
    trialEnd.setDate(trialEnd.getDate() + 60);

    await prisma.$transaction(async (tx) => {
      await tx.company.update({
        where: { id: company.id },
        data: {
          plan_type: planType,
          listing_claim_status: "claimed",
          is_claimed: true,
          quote_requests_enabled: true,
          ...(planType === "featured" ? { is_featured: true } : {}),
        },
      });
      await tx.directorySubscription.upsert({
        where: { company_id: company.id },
        create: {
          company_id: company.id,
          plan_type: planType,
          billing_cycle: billingCycle,
          subscription_status: "trialing",
          trial_started_at: new Date(),
          trial_ends_at: trialEnd,
          admin_notes: "Manual trial — Stripe not yet configured",
        },
        update: {
          plan_type: planType,
          billing_cycle: billingCycle,
          subscription_status: "trialing",
          trial_started_at: new Date(),
          trial_ends_at: trialEnd,
          admin_notes: "Manual trial — Stripe not yet configured",
        },
      });
    });

    return NextResponse.json({ success: true, mode: "manual_trial", trialEndsAt: trialEnd.toISOString() });
  }

  // Stripe checkout session
  let stripeCustomerId = company.directory_subscription?.stripe_customer_id ?? null;
  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      name: user.full_name ?? undefined,
      metadata: { company_id: String(company.id), user_id: String(user.id) },
    });
    stripeCustomerId = customer.id;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.remedialbuildingaustralia.com.au";
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: stripeCustomerId,
    line_items: [{ price: STRIPE_DIR_PRICES[priceKey], quantity: 1 }],
    subscription_data: {
      trial_period_days: 60,
      metadata: { company_id: String(company.id), plan_type: planType, billing_cycle: billingCycle },
    },
    success_url: `${siteUrl}/directory/dashboard/subscription?checkout=success`,
    cancel_url: `${siteUrl}/directory/pricing`,
    metadata: { company_id: String(company.id) },
  });

  // Save customer ID early
  await prisma.directorySubscription.upsert({
    where: { company_id: company.id },
    create: {
      company_id: company.id,
      plan_type: planType,
      billing_cycle: billingCycle,
      subscription_status: "none",
      stripe_customer_id: stripeCustomerId,
    },
    update: { stripe_customer_id: stripeCustomerId },
  });

  return NextResponse.json({ checkoutUrl: session.url });
}
