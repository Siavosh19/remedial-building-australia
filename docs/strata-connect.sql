-- Strata Connect: inbound work-order intake tables.
-- Run once in the Supabase SQL editor. Idempotent & additive.
-- `LocationState` enum already exists (used by other tables) — not recreated here.

-- 1. Status enum
DO $$ BEGIN
  CREATE TYPE "StrataIntakeStatus" AS ENUM
    ('received', 'extracting', 'needs_review', 'approved', 'rejected', 'converted', 'failed');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- 2. Intakes
CREATE TABLE IF NOT EXISTS "strata_intakes" (
  "id"                    SERIAL PRIMARY KEY,
  "message_id"            TEXT UNIQUE,
  "from_email"            TEXT NOT NULL,
  "from_name"             TEXT,
  "envelope_from"         TEXT,
  "to_email"              TEXT,
  "subject"               TEXT,
  "body_text"             TEXT,
  "body_html"             TEXT,
  "received_at"           TIMESTAMP(3) NOT NULL DEFAULT now(),
  "building_address"      TEXT,
  "suburb"                TEXT,
  "postcode"              TEXT,
  "state"                 "LocationState",
  "strata_plan_number"    TEXT,
  "order_number"          TEXT,
  "job_description"       TEXT,
  "contact_name"          TEXT,
  "contact_phone"         TEXT,
  "extracted_units"       JSONB,
  "matched_category_id"   INTEGER,
  "matched_category_slug" TEXT,
  "matched_category_name" TEXT,
  "match_confidence"      TEXT,
  "extraction_error"      TEXT,
  "status"                "StrataIntakeStatus" NOT NULL DEFAULT 'received',
  "review_notes"          TEXT,
  "reviewed_by"           INTEGER,
  "reviewed_at"           TIMESTAMP(3),
  "quote_request_id"      INTEGER,
  "created_at"            TIMESTAMP(3) NOT NULL DEFAULT now(),
  "updated_at"            TIMESTAMP(3) NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "strata_intakes_status_idx"      ON "strata_intakes" ("status");
CREATE INDEX IF NOT EXISTS "strata_intakes_received_at_idx" ON "strata_intakes" ("received_at");

-- Safety net if the table pre-existed without the contact columns:
ALTER TABLE "strata_intakes" ADD COLUMN IF NOT EXISTS "contact_name"  TEXT;
ALTER TABLE "strata_intakes" ADD COLUMN IF NOT EXISTS "contact_phone" TEXT;

-- 3. Attachments
CREATE TABLE IF NOT EXISTS "strata_intake_files" (
  "id"             SERIAL PRIMARY KEY,
  "intake_id"      INTEGER NOT NULL REFERENCES "strata_intakes" ("id") ON DELETE CASCADE,
  "filename"       TEXT NOT NULL,
  "content_type"   TEXT,
  "size_bytes"     INTEGER,
  "url"            TEXT,
  "is_pdf"         BOOLEAN NOT NULL DEFAULT false,
  "extracted_text" TEXT,
  "created_at"     TIMESTAMP(3) NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "strata_intake_files_intake_id_idx" ON "strata_intake_files" ("intake_id");
