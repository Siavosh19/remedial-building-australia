-- ─────────────────────────────────────────────────────────────────────────────
-- RBA · Self-managed strata · Phase 3 (compliance, capital works, expenses)
-- Additive only. Safe to re-run.
-- ─────────────────────────────────────────────────────────────────────────────

DO $$ BEGIN
  CREATE TYPE "StrataExpenseStatus" AS ENUM ('unpaid', 'paid', 'disputed');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Opening fund balances — the capital works projection starts from these.
ALTER TABLE "strata_schemes" ADD COLUMN IF NOT EXISTS "fund_1_opening" DOUBLE PRECISION;
ALTER TABLE "strata_schemes" ADD COLUMN IF NOT EXISTS "fund_2_opening" DOUBLE PRECISION;

-- Compliance & insurance -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "strata_compliance_items" (
  "id"           SERIAL PRIMARY KEY,
  "scheme_id"    INTEGER NOT NULL,
  "item"         TEXT NOT NULL,
  "provider"     TEXT,
  "reference"    TEXT,
  "sum_insured"  DOUBLE PRECISION,
  "last_done"    TIMESTAMP(3),
  "next_due"     TIMESTAMP(3),
  "cycle_months" INTEGER,
  "responsible"  TEXT,
  "notes"        TEXT,
  "created_at"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "strata_compliance_items_scheme_id_fkey"
    FOREIGN KEY ("scheme_id") REFERENCES "strata_schemes"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "strata_compliance_items_scheme_id_idx" ON "strata_compliance_items"("scheme_id");

-- Capital works plan ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS "strata_capital_works_items" (
  "id"             SERIAL PRIMARY KEY,
  "scheme_id"      INTEGER NOT NULL,
  "item"           TEXT NOT NULL,
  "last_done_year" INTEGER,
  "cycle_years"    INTEGER,
  "next_due_year"  INTEGER,
  "estimated_cost" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "notes"          TEXT,
  "created_at"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "strata_capital_works_items_scheme_id_fkey"
    FOREIGN KEY ("scheme_id") REFERENCES "strata_schemes"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "strata_capital_works_items_scheme_id_idx" ON "strata_capital_works_items"("scheme_id");

-- Expenses -------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "strata_expenses" (
  "id"             SERIAL PRIMARY KEY,
  "scheme_id"      INTEGER NOT NULL,
  "invoice_date"   TIMESTAMP(3) NOT NULL,
  "invoice_number" TEXT,
  "supplier"       TEXT NOT NULL,
  "budget_item_id" INTEGER,
  "fund"           "StrataFund" NOT NULL DEFAULT 'fund_1',
  "amount"         DOUBLE PRECISION NOT NULL,
  "gst"            DOUBLE PRECISION,
  "status"         "StrataExpenseStatus" NOT NULL DEFAULT 'unpaid',
  "due_on"         TIMESTAMP(3),
  "paid_on"        TIMESTAMP(3),
  "method"         TEXT,
  "work_order_id"  INTEGER,
  "contractor_id"  INTEGER,
  "notes"          TEXT,
  "created_at"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "strata_expenses_scheme_id_fkey"
    FOREIGN KEY ("scheme_id") REFERENCES "strata_schemes"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "strata_expenses_budget_item_id_fkey"
    FOREIGN KEY ("budget_item_id") REFERENCES "strata_budget_items"("id") ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT "strata_expenses_work_order_id_fkey"
    FOREIGN KEY ("work_order_id") REFERENCES "strata_work_orders"("id") ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT "strata_expenses_contractor_id_fkey"
    FOREIGN KEY ("contractor_id") REFERENCES "strata_contractors"("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "strata_expenses_scheme_id_idx" ON "strata_expenses"("scheme_id");
CREATE INDEX IF NOT EXISTS "strata_expenses_budget_item_id_idx" ON "strata_expenses"("budget_item_id");

-- RLS ------------------------------------------------------------------------
ALTER TABLE "strata_compliance_items"    ENABLE ROW LEVEL SECURITY;
ALTER TABLE "strata_capital_works_items" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "strata_expenses"            ENABLE ROW LEVEL SECURITY;
