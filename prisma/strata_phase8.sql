-- ─────────────────────────────────────────────────────────────────────────────
-- RBA · Self-managed strata · credit notes on invoices
-- Additive, defaulted, safe to re-run, and no existing row changes meaning.
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE "strata_expenses" ADD COLUMN IF NOT EXISTS "credit_note" BOOLEAN NOT NULL DEFAULT false;
