-- ─────────────────────────────────────────────────────────────────────────────
-- RBA · Self-managed strata · Phase 2 (defects, work orders, contractor log)
-- Additive only. Safe to re-run.
--
-- Two columns point OUT of the strata module — strata_contractors.company_id
-- to the directory, and strata_quote_links.quote_request_id to the existing
-- quote platform. Both are plain columns with a foreign key; neither
-- companies nor client_quote_requests is altered in any way.
-- ─────────────────────────────────────────────────────────────────────────────

DO $$ BEGIN
  CREATE TYPE "StrataDefectPriority" AS ENUM ('urgent', 'high', 'medium', 'low');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE "StrataDefectStatus" AS ENUM ('open', 'awaiting_quote', 'scheduled', 'in_progress', 'closed');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE "StrataEngagement" AS ENUM ('one_off', 'ongoing');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE "StrataWorkOrderStatus" AS ENUM ('draft', 'issued', 'accepted', 'in_progress', 'completed', 'cancelled');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Defects --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "strata_defects" (
  "id"            SERIAL PRIMARY KEY,
  "scheme_id"     INTEGER NOT NULL,
  "reference"     TEXT NOT NULL,
  "reported_on"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "reported_by"   TEXT,
  "lot_id"        INTEGER,
  "location_type" TEXT,
  "location"      TEXT,
  "description"   TEXT NOT NULL,
  "priority"      "StrataDefectPriority" NOT NULL DEFAULT 'medium',
  "status"        "StrataDefectStatus" NOT NULL DEFAULT 'open',
  "quoted_cost"   DOUBLE PRECISION,
  "actual_cost"   DOUBLE PRECISION,
  "resolved_on"   TIMESTAMP(3),
  "notes"         TEXT,
  "created_at"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "strata_defects_scheme_id_fkey"
    FOREIGN KEY ("scheme_id") REFERENCES "strata_schemes"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "strata_defects_lot_id_fkey"
    FOREIGN KEY ("lot_id") REFERENCES "strata_lots"("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "strata_defects_scheme_id_reference_key" ON "strata_defects"("scheme_id", "reference");
CREATE INDEX IF NOT EXISTS "strata_defects_scheme_id_idx" ON "strata_defects"("scheme_id");

-- Contractor log -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "strata_contractors" (
  "id"               SERIAL PRIMARY KEY,
  "scheme_id"        INTEGER NOT NULL,
  "company_id"       INTEGER,
  "trade"            TEXT NOT NULL,
  "business_name"    TEXT NOT NULL,
  "contact_name"     TEXT,
  "phone"            TEXT,
  "email"            TEXT,
  "abn"              TEXT,
  "licence_number"   TEXT,
  "insurance_expiry" TIMESTAMP(3),
  "engagement"       "StrataEngagement" NOT NULL DEFAULT 'one_off',
  "frequency"        TEXT,
  "rate"             DOUBLE PRECISION,
  "rate_note"        TEXT,
  "active"           BOOLEAN NOT NULL DEFAULT true,
  "first_engaged"    TIMESTAMP(3),
  "last_engaged"     TIMESTAMP(3),
  "notes"            TEXT,
  "created_at"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "strata_contractors_scheme_id_fkey"
    FOREIGN KEY ("scheme_id") REFERENCES "strata_schemes"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "strata_contractors_company_id_fkey"
    FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "strata_contractors_scheme_id_idx" ON "strata_contractors"("scheme_id");
CREATE INDEX IF NOT EXISTS "strata_contractors_company_id_idx" ON "strata_contractors"("company_id");

-- Work orders ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "strata_work_orders" (
  "id"                      SERIAL PRIMARY KEY,
  "scheme_id"               INTEGER NOT NULL,
  "reference"               TEXT NOT NULL,
  "title"                   TEXT NOT NULL,
  "scope"                   TEXT,
  "location"                TEXT,
  "defect_id"               INTEGER,
  "contractor_id"           INTEGER,
  "status"                  "StrataWorkOrderStatus" NOT NULL DEFAULT 'draft',
  "agreed_price"            DOUBLE PRECISION,
  "issued_on"               TIMESTAMP(3),
  "start_on"                TIMESTAMP(3),
  "completed_on"            TIMESTAMP(3),
  "warranty_until"          TIMESTAMP(3),
  "defects_liability_until" TIMESTAMP(3),
  "invoice_reference"       TEXT,
  "notes"                   TEXT,
  "created_at"              TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"              TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "strata_work_orders_scheme_id_fkey"
    FOREIGN KEY ("scheme_id") REFERENCES "strata_schemes"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "strata_work_orders_defect_id_fkey"
    FOREIGN KEY ("defect_id") REFERENCES "strata_defects"("id") ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT "strata_work_orders_contractor_id_fkey"
    FOREIGN KEY ("contractor_id") REFERENCES "strata_contractors"("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "strata_work_orders_scheme_id_reference_key" ON "strata_work_orders"("scheme_id", "reference");
CREATE INDEX IF NOT EXISTS "strata_work_orders_scheme_id_idx" ON "strata_work_orders"("scheme_id");

-- Bridge to the existing quote platform --------------------------------------
CREATE TABLE IF NOT EXISTS "strata_quote_links" (
  "id"               SERIAL PRIMARY KEY,
  "scheme_id"        INTEGER NOT NULL,
  "quote_request_id" INTEGER NOT NULL,
  "defect_id"        INTEGER,
  "work_order_id"    INTEGER,
  "created_at"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "strata_quote_links_scheme_id_fkey"
    FOREIGN KEY ("scheme_id") REFERENCES "strata_schemes"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "strata_quote_links_quote_request_id_fkey"
    FOREIGN KEY ("quote_request_id") REFERENCES "client_quote_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "strata_quote_links_defect_id_fkey"
    FOREIGN KEY ("defect_id") REFERENCES "strata_defects"("id") ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT "strata_quote_links_work_order_id_fkey"
    FOREIGN KEY ("work_order_id") REFERENCES "strata_work_orders"("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "strata_quote_links_quote_request_id_key" ON "strata_quote_links"("quote_request_id");
CREATE INDEX IF NOT EXISTS "strata_quote_links_scheme_id_idx" ON "strata_quote_links"("scheme_id");

-- RLS ------------------------------------------------------------------------
ALTER TABLE "strata_defects"      ENABLE ROW LEVEL SECURITY;
ALTER TABLE "strata_contractors"  ENABLE ROW LEVEL SECURITY;
ALTER TABLE "strata_work_orders"  ENABLE ROW LEVEL SECURITY;
ALTER TABLE "strata_quote_links"  ENABLE ROW LEVEL SECURITY;
