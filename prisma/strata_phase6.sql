-- ─────────────────────────────────────────────────────────────────────────────
-- RBA · Self-managed strata · Phase 6 (bank statement import & matching)
-- Additive only. Safe to re-run.
-- ─────────────────────────────────────────────────────────────────────────────

DO $$ BEGIN
  CREATE TYPE "StrataBankLineStatus" AS ENUM ('pending', 'matched', 'ignored');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS "strata_bank_imports" (
  "id"          SERIAL PRIMARY KEY,
  "scheme_id"   INTEGER NOT NULL,
  "filename"    TEXT,
  "row_count"   INTEGER NOT NULL DEFAULT 0,
  "auto_count"  INTEGER NOT NULL DEFAULT 0,
  "imported_by" INTEGER,
  "created_at"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "strata_bank_imports_scheme_id_fkey"
    FOREIGN KEY ("scheme_id") REFERENCES "strata_schemes"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "strata_bank_imports_scheme_id_idx" ON "strata_bank_imports"("scheme_id");

CREATE TABLE IF NOT EXISTS "strata_bank_lines" (
  "id"               SERIAL PRIMARY KEY,
  "scheme_id"        INTEGER NOT NULL,
  "import_id"        INTEGER NOT NULL,
  "transaction_date" TIMESTAMP(3) NOT NULL,
  "description"      TEXT NOT NULL,
  "amount"           DOUBLE PRECISION NOT NULL,
  "status"           "StrataBankLineStatus" NOT NULL DEFAULT 'pending',
  "matched_by"       TEXT,
  "lot_id"           INTEGER,
  "expense_id"       INTEGER,
  "suggestion"       TEXT,
  "note"             TEXT,
  "created_at"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "strata_bank_lines_scheme_id_fkey"
    FOREIGN KEY ("scheme_id") REFERENCES "strata_schemes"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "strata_bank_lines_import_id_fkey"
    FOREIGN KEY ("import_id") REFERENCES "strata_bank_imports"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "strata_bank_lines_lot_id_fkey"
    FOREIGN KEY ("lot_id") REFERENCES "strata_lots"("id") ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT "strata_bank_lines_expense_id_fkey"
    FOREIGN KEY ("expense_id") REFERENCES "strata_expenses"("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "strata_bank_lines_scheme_id_status_idx" ON "strata_bank_lines"("scheme_id", "status");
CREATE INDEX IF NOT EXISTS "strata_bank_lines_import_id_idx" ON "strata_bank_lines"("import_id");

ALTER TABLE "strata_bank_imports" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "strata_bank_lines"   ENABLE ROW LEVEL SECURITY;
