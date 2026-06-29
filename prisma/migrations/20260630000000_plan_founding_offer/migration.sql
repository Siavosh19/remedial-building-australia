-- Founding-offer pricing: standard (struck-through) price + its Stripe price + label.
ALTER TABLE "plans" ADD COLUMN "compare_at_cents" INTEGER;
ALTER TABLE "plans" ADD COLUMN "promo_label" TEXT;
ALTER TABLE "plans" ADD COLUMN "standard_stripe_price_id" TEXT;
