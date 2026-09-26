-- ─────────────────────────────────────────────────────────────────────────────
-- RBA · Self-managed strata · Phase 5 (AI panel + token metering)
-- Additive only. Safe to re-run.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "strata_ai_usage" (
  "id"            SERIAL PRIMARY KEY,
  "scheme_id"     INTEGER NOT NULL,
  "period"        TEXT NOT NULL,
  "input_tokens"  INTEGER NOT NULL DEFAULT 0,
  "output_tokens" INTEGER NOT NULL DEFAULT 0,
  "requests"      INTEGER NOT NULL DEFAULT 0,
  "created_at"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "strata_ai_usage_scheme_id_fkey"
    FOREIGN KEY ("scheme_id") REFERENCES "strata_schemes"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "strata_ai_usage_scheme_id_period_key" ON "strata_ai_usage"("scheme_id", "period");

CREATE TABLE IF NOT EXISTS "strata_ai_messages" (
  "id"            SERIAL PRIMARY KEY,
  "scheme_id"     INTEGER NOT NULL,
  "topic"         TEXT NOT NULL,
  "role"          TEXT NOT NULL,
  "content"       TEXT NOT NULL,
  "user_id"       INTEGER,
  "input_tokens"  INTEGER,
  "output_tokens" INTEGER,
  "created_at"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "strata_ai_messages_scheme_id_fkey"
    FOREIGN KEY ("scheme_id") REFERENCES "strata_schemes"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "strata_ai_messages_scheme_id_topic_idx" ON "strata_ai_messages"("scheme_id", "topic");

ALTER TABLE "strata_ai_usage"    ENABLE ROW LEVEL SECURITY;
ALTER TABLE "strata_ai_messages" ENABLE ROW LEVEL SECURITY;
