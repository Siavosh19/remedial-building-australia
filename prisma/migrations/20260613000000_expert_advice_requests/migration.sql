CREATE TABLE IF NOT EXISTS "expert_advice_requests" (
    "id"                      SERIAL NOT NULL,
    "created_at"              TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "service"                 TEXT NOT NULL,
    "service_name"            TEXT NOT NULL,
    "name"                    TEXT NOT NULL,
    "email"                   TEXT NOT NULL,
    "phone"                   TEXT,
    "property_type"           TEXT,
    "building_address"        TEXT NOT NULL,
    "description"             TEXT NOT NULL,
    "urgency"                 TEXT,
    "extra_fields"            JSONB,
    "uploaded_file_refs"      JSONB,
    "disclaimer_accepted"     BOOLEAN NOT NULL DEFAULT false,
    "disclaimer_version"      TEXT NOT NULL DEFAULT '1.0',
    "disclaimer_accepted_at"  TIMESTAMP(3),
    "disclaimer_text"         TEXT,
    "ip_address"              TEXT,
    "user_account_id"         INTEGER,
    "payment_id"              TEXT,
    "payment_status"          TEXT NOT NULL DEFAULT 'pending',

    CONSTRAINT "expert_advice_requests_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "expert_advice_requests_service_idx"    ON "expert_advice_requests"("service");
CREATE INDEX IF NOT EXISTS "expert_advice_requests_email_idx"      ON "expert_advice_requests"("email");
CREATE INDEX IF NOT EXISTS "expert_advice_requests_created_at_idx" ON "expert_advice_requests"("created_at" DESC);
