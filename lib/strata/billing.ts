// ── Stripe for the strata workspace ──────────────────────────────────────────
// Per-lot pricing, so the subscription is one price with a quantity rather than
// a plan matrix: quantity is the account's billable lot count, and the price is
// whatever the admin pricing row says a lot costs.
//
// Prices are provisioned from that row rather than pasted into env vars, so the
// marketing page, the subscription page and the charge cannot drift apart —
// there is exactly one number, in the database.
//
// The webhook lives at its own endpoint rather than in RBA's existing one, so
// nothing about directory or supplier billing is touched.

import type Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { entitlementForOwner, pricing, type PricingSettings } from "@/lib/strata/entitlement";

const PRODUCT_LOOKUP = "rba_strata_workspace";

export function priceLookupKey(interval: "monthly" | "yearly", settings: PricingSettings) {
  // The amount is in the key, so changing the price provisions a new Stripe
  // Price instead of silently repricing anybody already subscribed.
  const cents =
    interval === "monthly"
      ? settings.centsPerLotMonthly
      : settings.centsPerLotMonthly * settings.yearlyMonthsCharged;
  return `strata_lot_${interval}_${cents}`;
}

async function ensureProduct(stripe: Stripe) {
  const existing = await stripe.products.search({ query: `metadata['lookup']:'${PRODUCT_LOOKUP}'` });
  if (existing.data.length > 0) return existing.data[0];

  return stripe.products.create({
    name: "RBA strata workspace",
    description: "Self-managed strata software, charged per lot",
    metadata: { lookup: PRODUCT_LOOKUP },
  });
}

/** Find or create the per-lot Price for an interval at the current rate. */
export async function ensurePrice(interval: "monthly" | "yearly", settings: PricingSettings) {
  const stripe = getStripe();
  const lookupKey = priceLookupKey(interval, settings);

  const found = await stripe.prices.list({ lookup_keys: [lookupKey], active: true, limit: 1 });
  if (found.data.length > 0) return found.data[0];

  const product = await ensureProduct(stripe);
  const unitAmount =
    interval === "monthly"
      ? settings.centsPerLotMonthly
      : settings.centsPerLotMonthly * settings.yearlyMonthsCharged;

  return stripe.prices.create({
    product: product.id,
    currency: "aud",
    unit_amount: unitAmount,
    recurring: { interval: interval === "monthly" ? "month" : "year" },
    lookup_key: lookupKey,
    nickname: `Strata — ${interval}, ${unitAmount} cents per lot`,
  });
}

async function ensureCustomer(userId: number) {
  const stripe = getStripe();
  const [subscription, user] = await Promise.all([
    prisma.strataSubscription.findUnique({ where: { user_id: userId } }),
    prisma.user.findUnique({ where: { id: userId }, select: { email: true, full_name: true } }),
  ]);

  if (subscription?.stripe_customer_id) return subscription.stripe_customer_id;
  if (!user) throw new Error("Account not found.");

  const customer = await stripe.customers.create({
    email: user.email,
    name: user.full_name ?? undefined,
    metadata: { strata_user_id: String(userId) },
  });

  await prisma.strataSubscription.upsert({
    where: { user_id: userId },
    create: { user_id: userId, stripe_customer_id: customer.id },
    update: { stripe_customer_id: customer.id },
  });

  return customer.id;
}

/** A Checkout session for the account's current billable lot count. */
export async function createCheckout(userId: number, interval: "monthly" | "yearly", origin: string) {
  const stripe = getStripe();
  const settings = await pricing();
  const entitlement = await entitlementForOwner(userId);

  if (entitlement.billableLots <= 0) {
    throw new Error("This account is inside the free allowance — there is nothing to pay.");
  }

  const [customerId, price] = await Promise.all([ensureCustomer(userId), ensurePrice(interval, settings)]);

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: price.id, quantity: entitlement.billableLots }],
    success_url: `${origin}/client/strata/subscription?checkout=done`,
    cancel_url: `${origin}/client/strata/subscription?checkout=cancelled`,
    allow_promotion_codes: true,
    subscription_data: {
      metadata: { strata_user_id: String(userId), billable_lots: String(entitlement.billableLots) },
    },
    metadata: { strata_user_id: String(userId), interval },
  });

  return session.url;
}

/** Stripe's own billing portal, for cards, invoices and cancelling. */
export async function createPortalSession(userId: number, origin: string) {
  const stripe = getStripe();
  const customerId = await ensureCustomer(userId);
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${origin}/client/strata/subscription`,
  });
  return session.url;
}

type SubscriptionLike = {
  id: string;
  status: string;
  customer: string | { id: string };
  current_period_end?: number;
  cancel_at_period_end?: boolean;
  metadata?: Record<string, string>;
  items?: { data: { price?: { id?: string; recurring?: { interval?: string } }; quantity?: number }[] };
};

/** Bring our row into line with whatever Stripe says is true. */
export async function syncSubscription(sub: SubscriptionLike) {
  const userId = Number(sub.metadata?.strata_user_id);
  if (!Number.isFinite(userId) || userId <= 0) return;

  const item = sub.items?.data?.[0];
  const stripeInterval = item?.price?.recurring?.interval;
  const interval = stripeInterval === "year" ? "yearly" : stripeInterval === "month" ? "monthly" : null;

  const status =
    sub.status === "active" || sub.status === "trialing"
      ? "active"
      : sub.status === "past_due" || sub.status === "unpaid"
        ? "past_due"
        : "cancelled";

  await prisma.strataSubscription.upsert({
    where: { user_id: userId },
    create: {
      user_id: userId,
      status,
      interval,
      stripe_customer_id: typeof sub.customer === "string" ? sub.customer : sub.customer.id,
      stripe_subscription_id: sub.id,
      stripe_price_id: item?.price?.id ?? null,
      current_period_end: sub.current_period_end ? new Date(sub.current_period_end * 1000) : null,
      cancel_at_period_end: Boolean(sub.cancel_at_period_end),
      billed_lots: item?.quantity ?? null,
    },
    update: {
      status,
      interval,
      stripe_subscription_id: sub.id,
      stripe_price_id: item?.price?.id ?? null,
      current_period_end: sub.current_period_end ? new Date(sub.current_period_end * 1000) : null,
      cancel_at_period_end: Boolean(sub.cancel_at_period_end),
      billed_lots: item?.quantity ?? null,
    },
  });
}

/**
 * Keep the charged quantity in step with the roll. An increase is applied at
 * once and prorated, because the scheme is already using the extra lots; a
 * decrease waits for renewal so nobody is refunded mid-cycle for a lot they had.
 */
export async function syncQuantity(userId: number) {
  const subscription = await prisma.strataSubscription.findUnique({ where: { user_id: userId } });
  if (!subscription?.stripe_subscription_id || subscription.status !== "active") return;

  const entitlement = await entitlementForOwner(userId);
  const current = subscription.billed_lots ?? 0;
  if (entitlement.billableLots <= current) return;

  const stripe = getStripe();
  const sub = await stripe.subscriptions.retrieve(subscription.stripe_subscription_id);
  const item = sub.items.data[0];
  if (!item) return;

  await stripe.subscriptionItems.update(item.id, {
    quantity: entitlement.billableLots,
    proration_behavior: "create_prorations",
  });

  await prisma.strataSubscription.update({
    where: { user_id: userId },
    data: { billed_lots: entitlement.billableLots },
  });
}
