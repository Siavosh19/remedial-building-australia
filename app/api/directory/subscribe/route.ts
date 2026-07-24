import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDirectoryUserFromRequest } from "@/lib/directory-auth";
import { stripe } from "@/lib/stripe";
import { getDirectoryPlan } from "@/lib/plans";
import { sendNewSubscriptionAdminEmail } from "@/lib/directory-email";
import { goldSlotsLeft } from "@/lib/gold-cap";
import type { DirectoryPlanType, DirectoryBillingCycle } from "@prisma/client";

// Maps the front-end plan key → (tier, Stripe interval, billing cycle label).
const PLAN_MAP: Record<string, { tier: DirectoryPlanType; interval: string; cycle: DirectoryBillingCycle }> = {
  "claimed-monthly":  { tier: "claimed",  interval: "month", cycle: "monthly" },
  "featured-monthly": { tier: "featured", interval: "month", cycle: "monthly" },
  // ANNUAL DISMANTLED (2026-07-15) — yearly checkout disabled for now. Restore
  // these two keys to re-enable annual billing.
  // "claimed-yearly":   { tier: "claimed",  interval: "year",  cycle: "yearly" },
  // "featured-yearly":  { tier: "featured", interval: "year",  cycle: "yearly" },
};

export async function POST(request: NextRequest) {
  const user = await getDirectoryUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const planKey = String(body.plan ?? "");
  const mapped = PLAN_MAP[planKey];
  if (!mapped) return NextResponse.json({ error: "Invalid plan." }, { status: 400 });

  const company = await prisma.company.findFirst({
    where: { users: { some: { user_id: user.id } } },
    include: {
      directory_subscription: true,
      main_category: { select: { name: true } },
      locations: { take: 1, select: { state: true } },
    },
  });
  if (!company) return NextResponse.json({ error: "Company not found." }, { status: 404 });

  const planType = mapped.tier;
  const billingCycle = mapped.cycle;

  // ── Gold cap: max 3 Featured per category per State/Territory ──────────────────
  if (planType === "featured" && company.plan_type !== "featured") {
    const catId = company.main_category_id;
    const state = company.locations[0]?.state ?? null;
    if (catId && state) {
      const left = await goldSlotsLeft(catId, state, company.id);
      if (left <= 0) {
        return NextResponse.json(
          {
            error: `Gold is full in ${state} for ${company.main_category?.name ?? "your category"} — all 3 Featured spots are taken. Choose Silver to receive quote requests, or contact us to join the waitlist.`,
            goldFull: true,
          },
          { status: 409 },
        );
      }
    }
  }

  // Admin-managed plan from the DB is the source of truth for price + trial.
  // Gold (featured) has NO free trial — billed immediately at checkout. Silver
  // keeps its admin-configured trial.
  const plan = await getDirectoryPlan(mapped.tier, mapped.interval);
  const trialDays = planType === "featured" ? 0 : (plan?.trial_days ?? 60);
  const hasTrial = trialDays > 0;

  // Manual fallback when Stripe isn't configured OR this plan hasn't been synced
  // to a Stripe price yet — activate the listing so it still upgrades. Silver
  // gets a manual trial; Gold (no trial) goes straight to active.
  if (!stripe || !plan?.stripe_price_id) {
    const trialEnd = new Date();
    trialEnd.setDate(trialEnd.getDate() + trialDays);

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
      const adminNote = hasTrial
        ? "Manual trial — Stripe price not configured"
        : "Manual activation (no trial) — Stripe price not configured";
      await tx.directorySubscription.upsert({
        where: { company_id: company.id },
        create: {
          company_id: company.id, plan_type: planType, billing_cycle: billingCycle,
          subscription_status: hasTrial ? "trialing" : "active",
          trial_started_at: hasTrial ? new Date() : null,
          trial_ends_at: hasTrial ? trialEnd : null,
          admin_notes: adminNote,
        },
        update: {
          plan_type: planType, billing_cycle: billingCycle,
          subscription_status: hasTrial ? "trialing" : "active",
          trial_started_at: hasTrial ? new Date() : null,
          trial_ends_at: hasTrial ? trialEnd : null,
          admin_notes: adminNote,
        },
      });
    });

    sendNewSubscriptionAdminEmail({ companyName: company.name, planLabel: planType === "featured" ? "Gold" : "Silver", billingCycle, changeType: "new" }).catch(() => {});
    return NextResponse.json({ success: true, mode: hasTrial ? "manual_trial" : "manual_active", trialEndsAt: hasTrial ? trialEnd.toISOString() : null });
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

  // Existing subscriber → swap the plan on their CURRENT subscription (upgrade /
  // downgrade) instead of a brand-new checkout. Avoids a second charge & the redirect.
  const existingSubId = company.directory_subscription?.stripe_subscription_id;
  const existingStatus = company.directory_subscription?.subscription_status;
  if (existingSubId && (existingStatus === "active" || existingStatus === "trialing")) {
    try {
      const current = await stripe.subscriptions.retrieve(existingSubId);
      // A cancelled / incomplete / expired sub can't be swapped — let it fall
      // through to a fresh checkout below rather than erroring.
      if (current.status === "active" || current.status === "trialing") {
        const itemId = current.items.data[0]?.id;
        if (itemId) {
          await stripe.subscriptions.update(existingSubId, {
            items: [{ id: itemId, price: plan.stripe_price_id }],
            proration_behavior: "create_prorations",
            metadata: { company_id: String(company.id), plan_type: planType, billing_cycle: billingCycle },
          });
          await prisma.$transaction([
            prisma.directorySubscription.update({ where: { company_id: company.id }, data: { plan_type: planType, billing_cycle: billingCycle } }),
            prisma.company.update({ where: { id: company.id }, data: { plan_type: planType, is_featured: planType === "featured", quote_requests_enabled: true } }),
          ]);
          sendNewSubscriptionAdminEmail({ companyName: company.name, planLabel: planType === "featured" ? "Gold" : "Silver", billingCycle, changeType: "upgrade" }).catch(() => {});
          return NextResponse.json({ success: true, mode: "updated" });
        }
      }
    } catch {
      // The stored subscription id isn't valid on this Stripe account (e.g. a
      // test-mode id after going live). Ignore it and start a fresh checkout.
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.remedialbuildingaustralia.com.au";
  let session;
  try {
    session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: stripeCustomerId,
      line_items: [{ price: plan.stripe_price_id, quantity: 1 }],
      subscription_data: {
        // Stripe rejects a 0-day trial — only include it when there genuinely is one.
        ...(trialDays > 0 ? { trial_period_days: trialDays } : {}),
        metadata: { company_id: String(company.id), plan_type: planType, billing_cycle: billingCycle },
      },
      success_url: `${siteUrl}/directory/dashboard/subscription?checkout=success`,
      cancel_url: `${siteUrl}/directory/pricing`,
      metadata: { company_id: String(company.id) },
    });
  } catch {
    return NextResponse.json({ error: "Could not start checkout. Please try again." }, { status: 502 });
  }

  await prisma.directorySubscription.upsert({
    where: { company_id: company.id },
    create: {
      company_id: company.id, plan_type: planType, billing_cycle: billingCycle,
      subscription_status: "none", stripe_customer_id: stripeCustomerId,
    },
    update: { stripe_customer_id: stripeCustomerId },
  });

  return NextResponse.json({ checkoutUrl: session.url });
}
