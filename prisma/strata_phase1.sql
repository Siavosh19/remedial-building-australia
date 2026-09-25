-- ─────────────────────────────────────────────────────────────────────────────
-- RBA · Self-managed strata · Phase 1 (budget, levies, receipts, arrears)
-- Additive only. Safe to re-run.
-- ─────────────────────────────────────────────────────────────────────────────

DO $$ BEGIN
  CREATE TYPE "StrataFund" AS ENUM ('fund_1', 'fund_2');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Budget ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "strata_budget_items" (
  "id"         SERIAL PRIMARY KEY,
  "scheme_id"  INTEGER NOT NULL,
  "year_label" TEXT NOT NULL,
  "category"   TEXT,
  "item"       TEXT NOT NULL,
  "fund"       "StrataFund" NOT NULL DEFAULT 'fund_1',
  "amount"     DOUBLE PRECISION NOT NULL DEFAULT 0,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "strata_budget_items_scheme_id_fkey"
    FOREIGN KEY ("scheme_id") REFERENCES "strata_schemes"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "strata_budget_items_scheme_id_year_label_idx"
  ON "strata_budget_items"("scheme_id", "year_label");

-- Levy periods ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "strata_levy_periods" (
  "id"         SERIAL PRIMARY KEY,
  "scheme_id"  INTEGER NOT NULL,
  "year_label" TEXT NOT NULL,
  "sequence"   INTEGER NOT NULL,
  "label"      TEXT NOT NULL,
  "due_date"   TIMESTAMP(3) NOT NULL,
  "issued_at"  TIMESTAMP(3),
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "strata_levy_periods_scheme_id_fkey"
    FOREIGN KEY ("scheme_id") REFERENCES "strata_schemes"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "strata_levy_periods_scheme_id_year_label_sequence_key"
  ON "strata_levy_periods"("scheme_id", "year_label", "sequence");
CREATE INDEX IF NOT EXISTS "strata_levy_periods_scheme_id_idx" ON "strata_levy_periods"("scheme_id");

-- Levies (one row per lot per period) ----------------------------------------
CREATE TABLE IF NOT EXISTS "strata_levies" (
  "id"            SERIAL PRIMARY KEY,
  "scheme_id"     INTEGER NOT NULL,
  "period_id"     INTEGER NOT NULL,
  "lot_id"        INTEGER NOT NULL,
  "fund_1_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "fund_2_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "created_at"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "strata_levies_scheme_id_fkey"
    FOREIGN KEY ("scheme_id") REFERENCES "strata_schemes"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "strata_levies_period_id_fkey"
    FOREIGN KEY ("period_id") REFERENCES "strata_levy_periods"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "strata_levies_lot_id_fkey"
    FOREIGN KEY ("lot_id") REFERENCES "strata_lots"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "strata_levies_period_id_lot_id_key" ON "strata_levies"("period_id", "lot_id");
CREATE INDEX IF NOT EXISTS "strata_levies_scheme_id_idx" ON "strata_levies"("scheme_id");
CREATE INDEX IF NOT EXISTS "strata_levies_lot_id_idx" ON "strata_levies"("lot_id");

-- Receipts -------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "strata_levy_payments" (
  "id"          SERIAL PRIMARY KEY,
  "scheme_id"   INTEGER NOT NULL,
  "levy_id"     INTEGER NOT NULL,
  "amount"      DOUBLE PRECISION NOT NULL,
  "received_on" TIMESTAMP(3) NOT NULL,
  "method"      TEXT,
  "reference"   TEXT,
  "note"        TEXT,
  "created_at"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "strata_levy_payments_scheme_id_fkey"
    FOREIGN KEY ("scheme_id") REFERENCES "strata_schemes"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "strata_levy_payments_levy_id_fkey"
    FOREIGN KEY ("levy_id") REFERENCES "strata_levies"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "strata_levy_payments_scheme_id_idx" ON "strata_levy_payments"("scheme_id");
CREATE INDEX IF NOT EXISTS "strata_levy_payments_levy_id_idx" ON "strata_levy_payments"("levy_id");

-- Arrears actions ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "strata_arrears_actions" (
  "id"          SERIAL PRIMARY KEY,
  "scheme_id"   INTEGER NOT NULL,
  "lot_id"      INTEGER NOT NULL,
  "stage"       INTEGER NOT NULL,
  "action"      TEXT NOT NULL,
  "actioned_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "note"        TEXT,
  "created_at"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "strata_arrears_actions_scheme_id_fkey"
    FOREIGN KEY ("scheme_id") REFERENCES "strata_schemes"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "strata_arrears_actions_lot_id_fkey"
    FOREIGN KEY ("lot_id") REFERENCES "strata_lots"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "strata_arrears_actions_scheme_id_lot_id_idx"
  ON "strata_arrears_actions"("scheme_id", "lot_id");

-- RLS ------------------------------------------------------------------------
ALTER TABLE "strata_budget_items"    ENABLE ROW LEVEL SECURITY;
ALTER TABLE "strata_levy_periods"    ENABLE ROW LEVEL SECURITY;
ALTER TABLE "strata_levies"          ENABLE ROW LEVEL SECURITY;
ALTER TABLE "strata_levy_payments"   ENABLE ROW LEVEL SECURITY;
ALTER TABLE "strata_arrears_actions" ENABLE ROW LEVEL SECURITY;
