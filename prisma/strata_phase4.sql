-- ─────────────────────────────────────────────────────────────────────────────
-- RBA · Self-managed strata · Phase 4 (records and governance)
-- Additive only. Safe to re-run.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "strata_meetings" (
  "id"               SERIAL PRIMARY KEY,
  "scheme_id"        INTEGER NOT NULL,
  "meeting_type"     TEXT NOT NULL DEFAULT 'committee',
  "held_on"          TIMESTAMP(3) NOT NULL,
  "location"         TEXT,
  "notice_issued_on" TIMESTAMP(3),
  "quorum_met"       BOOLEAN,
  "attendance"       TEXT,
  "minutes"          TEXT,
  "created_at"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "strata_meetings_scheme_id_fkey"
    FOREIGN KEY ("scheme_id") REFERENCES "strata_schemes"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "strata_meetings_scheme_id_idx" ON "strata_meetings"("scheme_id");

CREATE TABLE IF NOT EXISTS "strata_motions" (
  "id"            SERIAL PRIMARY KEY,
  "scheme_id"     INTEGER NOT NULL,
  "meeting_id"    INTEGER,
  "motion"        TEXT NOT NULL,
  "outcome"       TEXT,
  "votes_for"     INTEGER,
  "votes_against" INTEGER,
  "action"        TEXT,
  "responsible"   TEXT,
  "due_on"        TIMESTAMP(3),
  "done"          BOOLEAN NOT NULL DEFAULT false,
  "created_at"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "strata_motions_scheme_id_fkey"
    FOREIGN KEY ("scheme_id") REFERENCES "strata_schemes"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "strata_motions_meeting_id_fkey"
    FOREIGN KEY ("meeting_id") REFERENCES "strata_meetings"("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "strata_motions_scheme_id_idx" ON "strata_motions"("scheme_id");
CREATE INDEX IF NOT EXISTS "strata_motions_meeting_id_idx" ON "strata_motions"("meeting_id");

CREATE TABLE IF NOT EXISTS "strata_correspondence" (
  "id"              SERIAL PRIMARY KEY,
  "scheme_id"       INTEGER NOT NULL,
  "occurred_on"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "direction"       TEXT NOT NULL DEFAULT 'out',
  "party"           TEXT NOT NULL,
  "channel"         TEXT,
  "subject"         TEXT NOT NULL,
  "summary"         TEXT,
  "relates_to"      TEXT,
  "reference"       TEXT,
  "action_required" BOOLEAN NOT NULL DEFAULT false,
  "due_on"          TIMESTAMP(3),
  "closed"          BOOLEAN NOT NULL DEFAULT false,
  "source"          TEXT NOT NULL DEFAULT 'manual',
  "created_at"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "strata_correspondence_scheme_id_fkey"
    FOREIGN KEY ("scheme_id") REFERENCES "strata_schemes"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "strata_correspondence_scheme_id_idx" ON "strata_correspondence"("scheme_id");

CREATE TABLE IF NOT EXISTS "strata_by_laws" (
  "id"                 SERIAL PRIMARY KEY,
  "scheme_id"          INTEGER NOT NULL,
  "number"             TEXT,
  "title"              TEXT NOT NULL,
  "summary"            TEXT,
  "adopted_at"         TEXT,
  "adopted_on"         TIMESTAMP(3),
  "registered_dealing" TEXT,
  "status"             TEXT NOT NULL DEFAULT 'Current',
  "created_at"         TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"         TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "strata_by_laws_scheme_id_fkey"
    FOREIGN KEY ("scheme_id") REFERENCES "strata_schemes"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "strata_by_laws_scheme_id_idx" ON "strata_by_laws"("scheme_id");

CREATE TABLE IF NOT EXISTS "strata_breaches" (
  "id"               SERIAL PRIMARY KEY,
  "scheme_id"        INTEGER NOT NULL,
  "lot_id"           INTEGER,
  "by_law_id"        INTEGER,
  "reported_on"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "description"      TEXT NOT NULL,
  "notice_type"      TEXT,
  "notice_issued_on" TIMESTAMP(3),
  "response_due"     TIMESTAMP(3),
  "resolved_on"      TIMESTAMP(3),
  "outcome"          TEXT,
  "created_at"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "strata_breaches_scheme_id_fkey"
    FOREIGN KEY ("scheme_id") REFERENCES "strata_schemes"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "strata_breaches_lot_id_fkey"
    FOREIGN KEY ("lot_id") REFERENCES "strata_lots"("id") ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT "strata_breaches_by_law_id_fkey"
    FOREIGN KEY ("by_law_id") REFERENCES "strata_by_laws"("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "strata_breaches_scheme_id_idx" ON "strata_breaches"("scheme_id");

CREATE TABLE IF NOT EXISTS "strata_applications" (
  "id"                SERIAL PRIMARY KEY,
  "scheme_id"         INTEGER NOT NULL,
  "lot_id"            INTEGER,
  "received_on"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "applicant"         TEXT,
  "application_type"  TEXT NOT NULL,
  "description"       TEXT NOT NULL,
  "documents"         TEXT,
  "approval_required" TEXT,
  "decision"          TEXT NOT NULL DEFAULT 'Pending',
  "decision_on"       TIMESTAMP(3),
  "conditions"        TEXT,
  "checks_done"       BOOLEAN NOT NULL DEFAULT false,
  "completed_on"      TIMESTAMP(3),
  "created_at"        TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"        TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "strata_applications_scheme_id_fkey"
    FOREIGN KEY ("scheme_id") REFERENCES "strata_schemes"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "strata_applications_lot_id_fkey"
    FOREIGN KEY ("lot_id") REFERENCES "strata_lots"("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "strata_applications_scheme_id_idx" ON "strata_applications"("scheme_id");

CREATE TABLE IF NOT EXISTS "strata_insurance_claims" (
  "id"               SERIAL PRIMARY KEY,
  "scheme_id"        INTEGER NOT NULL,
  "claim_number"     TEXT,
  "insurer"          TEXT,
  "policy_reference" TEXT,
  "incident_on"      TIMESTAMP(3),
  "lodged_on"        TIMESTAMP(3),
  "description"      TEXT NOT NULL,
  "location"         TEXT,
  "estimated_damage" DOUBLE PRECISION,
  "excess"           DOUBLE PRECISION,
  "assessor"         TEXT,
  "status"           TEXT NOT NULL DEFAULT 'Lodged',
  "amount_paid"      DOUBLE PRECISION,
  "settled_on"       TIMESTAMP(3),
  "notes"            TEXT,
  "created_at"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "strata_insurance_claims_scheme_id_fkey"
    FOREIGN KEY ("scheme_id") REFERENCES "strata_schemes"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "strata_insurance_claims_scheme_id_idx" ON "strata_insurance_claims"("scheme_id");

CREATE TABLE IF NOT EXISTS "strata_keys" (
  "id"          SERIAL PRIMARY KEY,
  "scheme_id"   INTEGER NOT NULL,
  "device_id"   TEXT NOT NULL,
  "device_type" TEXT NOT NULL,
  "lot_id"      INTEGER,
  "holder"      TEXT,
  "issued_on"   TIMESTAMP(3),
  "deposit"     DOUBLE PRECISION,
  "returned_on" TIMESTAMP(3),
  "status"      TEXT NOT NULL DEFAULT 'Issued',
  "notes"       TEXT,
  "created_at"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "strata_keys_scheme_id_fkey"
    FOREIGN KEY ("scheme_id") REFERENCES "strata_schemes"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "strata_keys_lot_id_fkey"
    FOREIGN KEY ("lot_id") REFERENCES "strata_lots"("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "strata_keys_scheme_id_idx" ON "strata_keys"("scheme_id");

-- RLS ------------------------------------------------------------------------
ALTER TABLE "strata_meetings"          ENABLE ROW LEVEL SECURITY;
ALTER TABLE "strata_motions"           ENABLE ROW LEVEL SECURITY;
ALTER TABLE "strata_correspondence"    ENABLE ROW LEVEL SECURITY;
ALTER TABLE "strata_by_laws"           ENABLE ROW LEVEL SECURITY;
ALTER TABLE "strata_breaches"          ENABLE ROW LEVEL SECURITY;
ALTER TABLE "strata_applications"      ENABLE ROW LEVEL SECURITY;
ALTER TABLE "strata_insurance_claims"  ENABLE ROW LEVEL SECURITY;
ALTER TABLE "strata_keys"              ENABLE ROW LEVEL SECURITY;
