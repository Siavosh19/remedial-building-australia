import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { sendSubscriptionStatusEmail, sendNewSubscriptionAdminEmail } from "@/lib/directory-email";
import { tierLabel } from "@/lib/directory-tier";
import type Stripe from "stripe";
import type { DirectoryPlanType, DirectoryBillingCycle } from "@prisma/client";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const stripe = getStripe();
  const sig = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_DIRECTORY_WEBHOOK_SECRET;
  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: "Missing signature or webhook secret." }, { status: 400 });
  }

  const rawBody = await request.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Webhook signature verification failed." }, { status: 400 });
  }

  const type = event.type;

  if (type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const companyId = Number(session.metadata?.company_id);
    if (!companyId) return NextResponse.json({ ok: true });
    const rawSub = session.subscription;
    const subId = typeof rawSub === "string" ? rawSub : (rawSub as { id?: string } | null)?.id ?? null;
    if (subId) {
      await activateSubscription(companyId, subId, stripe);
      // Confirmation email to the business owner (best-effort).
      try {
        const c = await prisma.company.findUnique({
          where: { id: companyId },
          select: { name: true, plan_type: true, users: { where: { role: "owner" }, include: { user: { select: { email: true, full_name: true } } } } },
        });
        const owner = c?.users[0]?.user;
        if (owner?.email) {
          await sendSubscriptionStatusEmail({
            ownerName: owner.full_name ?? c!.name, ownerEmail: owner.email, companyName: c!.name,
            status: "active", planLabel: tierLabel(c!.plan_type),
          });
        }
        if (c) {
          await sendNewSubscriptionAdminEmail({ companyName: c.name, planLabel: tierLabel(c.plan_type), changeType: "new" });
        }
      } catch { /* email optional */ }
    }
  }

  if (type === "customer.subscription.updated" || type === "customer.subscription.created") {
    const sub = event.data.object as Stripe.Subscription;
    const companyId = Number(sub.metadata?.company_id);
    if (!companyId) return NextResponse.json({ ok: true });
    await syncSubscription(companyId, sub);
  }

  if (type === "customer.subscription.deleted") {
    const sub = event.data.object as Stripe.Subscription;
    const companyId = Number(sub.metadata?.company_id);
    if (!companyId) return NextResponse.json({ ok: true });
    await expireSubscription(companyId);
  }

  if (type === "invoice.payment_failed") {
    const invoice = event.data.object as Stripe.Invoice & { subscription?: string | { id: string } };
    const rawSub = invoice.subscription;
    const subId = typeof rawSub === "string" ? rawSub : rawSub?.id ?? null;
    if (!subId) return NextResponse.json({ ok: true });
    await prisma.directorySubscription.updateMany({
      where: { stripe_subscription_id: subId },
      data: { subscription_status: "past_due" },
    });
  }

  return NextResponse.json({ ok: true });
}

async function activateSubscription(companyId: number, stripeSubId: string, stripe: ReturnType<typeof getStripe>) {
  const sub = await stripe.subscriptions.retrieve(stripeSubId);
  await syncSubscription(companyId, sub);
}

async function syncSubscription(companyId: number, sub: Stripe.Subscription) {
  const planType = (sub.metadata?.plan_type as DirectoryPlanType) ?? "claimed";
  const billingCycle = (sub.metadata?.billing_cycle as DirectoryBillingCycle) ?? "monthly";
  const status = sub.status === "trialing" ? "trialing"
    : sub.status === "active" ? "active"
    : sub.status === "past_due" ? "past_due"
    : sub.status === "canceled" ? "cancelled"
    : "none";

  const subAny = sub as unknown as Record<string, unknown>;
  const periodStart = typeof subAny.current_period_start === "number" ? new Date((subAny.current_period_start as number) * 1000) : null;
  const periodEnd   = typeof subAny.current_period_end   === "number" ? new Date((subAny.current_period_end   as number) * 1000) : null;
  const trialEnd    = sub.trial_end ? new Date(sub.trial_end * 1000) : null;

  await prisma.$transaction(async (tx) => {
    await tx.directorySubscription.upsert({
      where: { company_id: companyId },
      create: {
        company_id: companyId,
        plan_type: planType,
        billing_cycle: billingCycle,
        subscription_status: status as never,
        stripe_subscription_id: sub.id,
        trial_ends_at: trialEnd,
        current_period_start: periodStart,
        current_period_end: periodEnd,
        cancel_at_period_end: sub.cancel_at_period_end,
      },
      update: {
        plan_type: planType,
        billing_cycle: billingCycle,
        subscription_status: status as never,
        stripe_subscription_id: sub.id,
        trial_ends_at: trialEnd,
        current_period_start: periodStart,
        current_period_end: periodEnd,
        cancel_at_period_end: sub.cancel_at_period_end,
      },
    });

    const isActive = status === "active" || status === "trialing";
    await tx.company.update({
      where: { id: companyId },
      data: {
        plan_type: isActive ? planType : "basic",
        is_featured: isActive && planType === "featured",
        quote_requests_enabled: isActive && (planType === "claimed" || planType === "featured"),
        ...(isActive ? { listing_claim_status: "claimed", is_claimed: true } : {}),
      },
    });
  });
}

async function expireSubscription(companyId: number) {
  await prisma.$transaction(async (tx) => {
    const current = await tx.directorySubscription.findUnique({ where: { company_id: companyId } });
    const newPlan: DirectoryPlanType = "basic";
    await tx.directorySubscription.update({
      where: { company_id: companyId },
      data: { subscription_status: "expired", cancel_at_period_end: false, cancelled_at: new Date() },
    });
    await tx.company.update({
      where: { id: companyId },
      data: {
        plan_type: newPlan,
        is_featured: false,
        quote_requests_enabled: false,
      },
    });
  });
}
