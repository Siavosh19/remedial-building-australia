import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY && process.env.NODE_ENV === "production") {
  console.warn("[Stripe] STRIPE_SECRET_KEY is not set — billing features will not work");
}

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2026-05-27.dahlia" })
  : null;

export function getStripe(): Stripe {
  if (!stripe) throw new Error("Stripe is not configured. Add STRIPE_SECRET_KEY to environment variables.");
  return stripe;
}

export const STRIPE_PRICES = {
  basic: process.env.STRIPE_PRICE_BASIC ?? "",
  promoted: process.env.STRIPE_PRICE_PROMOTED ?? "",
  premium: process.env.STRIPE_PRICE_PREMIUM ?? "",
  category_sponsor: process.env.STRIPE_PRICE_CATEGORY_SPONSOR ?? "",
};

// Directory listing subscription prices
// Set these env vars once Stripe products are created:
//   STRIPE_DIR_CLAIMED_MONTHLY   = price_xxx  ($29/month, 60-day trial)
//   STRIPE_DIR_CLAIMED_YEARLY    = price_xxx  ($270/year, 60-day trial)
//   STRIPE_DIR_FEATURED_MONTHLY  = price_xxx  ($79/month, 60-day trial)
//   STRIPE_DIR_FEATURED_YEARLY   = price_xxx  ($750/year, 60-day trial)
export const STRIPE_DIR_PRICES = {
  claimed_monthly:  process.env.STRIPE_DIR_CLAIMED_MONTHLY  ?? "",
  claimed_yearly:   process.env.STRIPE_DIR_CLAIMED_YEARLY   ?? "",
  featured_monthly: process.env.STRIPE_DIR_FEATURED_MONTHLY ?? "",
  featured_yearly:  process.env.STRIPE_DIR_FEATURED_YEARLY  ?? "",
} as const;

export type DirPriceKey = keyof typeof STRIPE_DIR_PRICES;

export const DIR_PLAN_AMOUNTS = {
  claimed_monthly:  2900,   // cents AUD
  claimed_yearly:   27000,
  featured_monthly: 7900,
  featured_yearly:  75000,
} as const;
