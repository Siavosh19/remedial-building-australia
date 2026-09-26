-- ─────────────────────────────────────────────────────────────────────────────
-- RBA · Self-managed strata · billing, trial and terms
-- Additive only. Safe to re-run.
-- ─────────────────────────────────────────────────────────────────────────────

DO $$ BEGIN
  CREATE TYPE "StrataBillingInterval" AS ENUM ('monthly', 'yearly');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE "StrataSubscriptionStatus" AS ENUM ('trialling', 'active', 'past_due', 'cancelled');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS "strata_subscriptions" (
  "id"                     SERIAL PRIMARY KEY,
  "user_id"                INTEGER NOT NULL,
  "status"                 "StrataSubscriptionStatus" NOT NULL DEFAULT 'trialling',
  "interval"               "StrataBillingInterval",
  "trial_started_at"       TIMESTAMP(3),
  "trial_ends_at"          TIMESTAMP(3),
  "stripe_customer_id"     TEXT,
  "stripe_subscription_id" TEXT,
  "stripe_price_id"        TEXT,
  "current_period_end"     TIMESTAMP(3),
  "cancel_at_period_end"   BOOLEAN NOT NULL DEFAULT false,
  "billed_lots"            INTEGER,
  "warned_at"              TIMESTAMP(3),
  "created_at"             TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"             TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX IF NOT EXISTS "strata_subscriptions_user_id_key" ON "strata_subscriptions"("user_id");

CREATE TABLE IF NOT EXISTS "strata_terms_acceptances" (
  "id"          SERIAL PRIMARY KEY,
  "user_id"     INTEGER NOT NULL,
  "version"     TEXT NOT NULL,
  "accepted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "ip"          TEXT,
  "user_agent"  TEXT
);
CREATE UNIQUE INDEX IF NOT EXISTS "strata_terms_acceptances_user_id_version_key"
  ON "strata_terms_acceptances"("user_id", "version");
CREATE INDEX IF NOT EXISTS "strata_terms_acceptances_user_id_idx" ON "strata_terms_acceptances"("user_id");

CREATE TABLE IF NOT EXISTS "strata_pricing" (
  "id"                    INTEGER PRIMARY KEY DEFAULT 1,
  "cents_per_lot_monthly" INTEGER NOT NULL DEFAULT 80,
  "yearly_months_charged" INTEGER NOT NULL DEFAULT 10,
  "free_lot_limit"        INTEGER NOT NULL DEFAULT 13,
  "free_scheme_limit"     INTEGER NOT NULL DEFAULT 1,
  "trial_months"          INTEGER NOT NULL DEFAULT 6,
  "grace_days"            INTEGER NOT NULL DEFAULT 30,
  "updated_at"            TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "strata_pricing" ("id") VALUES (1) ON CONFLICT ("id") DO NOTHING;

ALTER TABLE "strata_subscriptions"      ENABLE ROW LEVEL SECURITY;
ALTER TABLE "strata_terms_acceptances"  ENABLE ROW LEVEL SECURITY;
ALTER TABLE "strata_pricing"            ENABLE ROW LEVEL SECURITY;
