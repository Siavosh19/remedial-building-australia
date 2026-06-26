-- Admin-managed billing plans (directory, AI scope, supplier cards, …)
CREATE TABLE "plans" (
  "id"                SERIAL PRIMARY KEY,
  "product_line"      TEXT NOT NULL,
  "tier"              TEXT NOT NULL,
  "name"              TEXT NOT NULL,
  "description"       TEXT,
  "billing_interval"  TEXT NOT NULL,
  "amount_cents"      INTEGER NOT NULL,
  "currency"          TEXT NOT NULL DEFAULT 'aud',
  "trial_days"        INTEGER NOT NULL DEFAULT 0,
  "features"          TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "stripe_product_id" TEXT,
  "stripe_price_id"   TEXT,
  "is_active"         BOOLEAN NOT NULL DEFAULT true,
  "is_public"         BOOLEAN NOT NULL DEFAULT true,
  "display_order"     INTEGER NOT NULL DEFAULT 0,
  "created_at"        TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"        TIMESTAMP(3) NOT NULL
);
CREATE INDEX "plans_product_line_idx" ON "plans"("product_line");
CREATE INDEX "plans_is_active_idx" ON "plans"("is_active");
