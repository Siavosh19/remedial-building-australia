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
