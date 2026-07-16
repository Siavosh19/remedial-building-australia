-- Lead purchase / pay-per-lead + lead wallet. Additive & idempotent so it is
-- safe to (re)apply on a live DB via `prisma migrate deploy`.

-- Pre-paid lead credit balance on the company (cents).
ALTER TABLE "companies" ADD COLUMN IF NOT EXISTS "lead_wallet_cents" INTEGER NOT NULL DEFAULT 0;

-- Mark a delivery as bought (outside the weekly interest allowance).
ALTER TABLE "quote_request_deliveries" ADD COLUMN IF NOT EXISTS "purchased_at" TIMESTAMP(3);
ALTER TABLE "quote_request_deliveries" ADD COLUMN IF NOT EXISTS "purchase_cents" INTEGER;

-- Admin-managed per-urgency price to buy a single lead.
CREATE TABLE IF NOT EXISTS "lead_prices" (
  "id" SERIAL PRIMARY KEY,
  "urgency" TEXT NOT NULL,
  "amount_cents" INTEGER NOT NULL,
  "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX IF NOT EXISTS "lead_prices_urgency_key" ON "lead_prices"("urgency");

-- Ledger for lead-wallet credits/debits and one-off purchases.
CREATE TABLE IF NOT EXISTS "lead_wallet_txns" (
  "id" SERIAL PRIMARY KEY,
  "company_id" INTEGER NOT NULL,
  "delta_cents" INTEGER NOT NULL,
  "kind" TEXT NOT NULL,
  "delivery_id" INTEGER,
  "urgency" TEXT,
  "stripe_session_id" TEXT,
  "status" TEXT NOT NULL DEFAULT 'completed',
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "lead_wallet_txns_company_id_idx" ON "lead_wallet_txns"("company_id");

-- Seed default per-urgency prices: $20 emergency, $10 within a week / a few
-- weeks, $5 planning / budgeting. Left untouched if a row already exists.
INSERT INTO "lead_prices" ("urgency", "amount_cents") VALUES
  ('emergency', 2000),
  ('within_week', 1000),
  ('within_month', 1000),
  ('planning', 500)
ON CONFLICT ("urgency") DO NOTHING;
