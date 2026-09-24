-- ─────────────────────────────────────────────────────────────────────────────
-- RBA · Self-managed strata · Phase 0 (schemes, strata roll, members)
-- Purely additive. No existing table, column, index or constraint is touched.
-- Safe to re-run: every statement is guarded.
-- ─────────────────────────────────────────────────────────────────────────────

-- Enums ----------------------------------------------------------------------
DO $$ BEGIN
  CREATE TYPE "StrataMemberRole" AS ENUM ('chair', 'treasurer', 'secretary', 'committee', 'owner');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE "StrataMemberStatus" AS ENUM ('invited', 'active');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Schemes --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "strata_schemes" (
  "id"                         SERIAL PRIMARY KEY,
  "owner_user_id"              INTEGER NOT NULL,
  "name"                       TEXT NOT NULL,
  "plan_number"                TEXT,
  "state"                      "LocationState" NOT NULL,
  "address"                    TEXT,
  "suburb"                     TEXT,
  "postcode"                   TEXT,
  "property_type"              "PropertyType" NOT NULL DEFAULT 'residential_strata',
  "fund_1_name"                TEXT NOT NULL DEFAULT 'Administrative fund',
  "fund_2_name"                TEXT NOT NULL DEFAULT 'Sinking fund',
  "financial_year_start_month" INTEGER NOT NULL DEFAULT 7,
  "levy_frequency"             TEXT NOT NULL DEFAULT 'quarterly',
  "levy_notice_days"           INTEGER,
  "arrears_grace_days"         INTEGER,
  "arrears_interest_rate"      DOUBLE PRECISION,
  "committee_spend_limit"      DOUBLE PRECISION,
  "created_at"                 TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"                 TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "strata_schemes_owner_user_id_fkey"
    FOREIGN KEY ("owner_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "strata_schemes_owner_user_id_idx" ON "strata_schemes"("owner_user_id");

-- Lots (the strata roll) -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "strata_lots" (
  "id"                SERIAL PRIMARY KEY,
  "scheme_id"         INTEGER NOT NULL,
  "lot_number"        TEXT NOT NULL,
  "description"       TEXT,
  "owner_name"        TEXT,
  "owner_email"       TEXT,
  "owner_phone"       TEXT,
  "occupancy"         TEXT,
  -- levy_basis: what contributions are apportioned on.
  -- ownership_basis: what voting / ownership share is based on.
  -- Different numbers in VIC (lot liability vs lot entitlement) and
  -- QLD (contribution vs interest schedule lot entitlement).
  "levy_basis"        DOUBLE PRECISION NOT NULL DEFAULT 0,
  "ownership_basis"   DOUBLE PRECISION NOT NULL DEFAULT 0,
  "service_address"   TEXT,
  "mortgagee"         TEXT,
  "tenancy_notice"    TEXT,
  "managing_agent"    TEXT,
  "emergency_contact" TEXT,
  "payment_reference" TEXT,
  "notices_by_email"  BOOLEAN NOT NULL DEFAULT true,
  "notes"             TEXT,
  "created_at"        TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"        TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "strata_lots_scheme_id_fkey"
    FOREIGN KEY ("scheme_id") REFERENCES "strata_schemes"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "strata_lots_scheme_id_lot_number_key" ON "strata_lots"("scheme_id", "lot_number");
CREATE INDEX IF NOT EXISTS "strata_lots_scheme_id_idx" ON "strata_lots"("scheme_id");

-- Members (who can see and change a scheme) ----------------------------------
CREATE TABLE IF NOT EXISTS "strata_members" (
  "id"           SERIAL PRIMARY KEY,
  "scheme_id"    INTEGER NOT NULL,
  "user_id"      INTEGER,
  "email"        TEXT NOT NULL,
  "full_name"    TEXT,
  "role"         "StrataMemberRole" NOT NULL DEFAULT 'committee',
  "status"       "StrataMemberStatus" NOT NULL DEFAULT 'invited',
  "lot_id"       INTEGER,
  "invite_token" TEXT,
  "invited_at"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "accepted_at"  TIMESTAMP(3),
  "created_at"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "strata_members_scheme_id_fkey"
    FOREIGN KEY ("scheme_id") REFERENCES "strata_schemes"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "strata_members_user_id_fkey"
    FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT "strata_members_lot_id_fkey"
    FOREIGN KEY ("lot_id") REFERENCES "strata_lots"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "strata_members_invite_token_key" ON "strata_members"("invite_token");
CREATE UNIQUE INDEX IF NOT EXISTS "strata_members_scheme_id_email_key" ON "strata_members"("scheme_id", "email");
CREATE INDEX IF NOT EXISTS "strata_members_scheme_id_idx" ON "strata_members"("scheme_id");
CREATE INDEX IF NOT EXISTS "strata_members_user_id_idx" ON "strata_members"("user_id");

-- RLS ------------------------------------------------------------------------
-- Matches the rest of the database: RLS on, no auth.uid policies, server access
-- is via the bypassing role. Plain ENABLE — never FORCE.
ALTER TABLE "strata_schemes" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "strata_lots"    ENABLE ROW LEVEL SECURITY;
ALTER TABLE "strata_members" ENABLE ROW LEVEL SECURITY;
