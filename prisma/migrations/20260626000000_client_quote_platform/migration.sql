-- Strata / Client Quote-Request Platform (additive — directory tables untouched)

-- CreateEnum
CREATE TYPE "ClientType" AS ENUM ('strata_manager', 'owners_corp_rep', 'building_manager', 'property_owner', 'consultant', 'other');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('residential_strata', 'commercial_strata', 'mixed_use', 'residential_house', 'commercial_building', 'other');

-- CreateEnum
CREATE TYPE "ClientQuoteStatus" AS ENUM ('draft', 'submitted', 'sent_to_businesses', 'responses_received', 'closed');

-- CreateEnum
CREATE TYPE "ContractorResponseStatus" AS ENUM ('pending', 'contacted', 'quoted', 'declined', 'not_suitable');

-- CreateEnum
CREATE TYPE "QuoteEmailStatus" AS ENUM ('pending', 'sent', 'failed');

-- AlterEnum: add client roles/account type to existing enums
ALTER TYPE "UserRole" ADD VALUE IF NOT EXISTS 'client_user';
ALTER TYPE "AccountType" ADD VALUE IF NOT EXISTS 'strata_client';

-- CreateTable: client_profiles
CREATE TABLE "client_profiles" (
  "id"           SERIAL       NOT NULL,
  "user_id"      INTEGER      NOT NULL,
  "client_type"  "ClientType" NOT NULL,
  "company_name" TEXT,
  "created_at"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"   TIMESTAMP(3) NOT NULL,
  CONSTRAINT "client_profiles_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "client_profiles_user_id_key" ON "client_profiles"("user_id");

-- CreateTable: client_quote_requests
CREATE TABLE "client_quote_requests" (
  "id"                         SERIAL              NOT NULL,
  "client_user_id"             INTEGER             NOT NULL,
  "contact_name"               TEXT                NOT NULL,
  "contact_email"              TEXT                NOT NULL,
  "contact_phone"              TEXT,
  "company_name"               TEXT,
  "building_address"           TEXT                NOT NULL,
  "suburb"                     TEXT                NOT NULL,
  "postcode"                   TEXT                NOT NULL,
  "state"                      "LocationState",
  "strata_plan_number"         TEXT,
  "property_type"              "PropertyType"      NOT NULL,
  "work_category_id"           INTEGER             NOT NULL,
  "work_subcategory_id"        INTEGER,
  "description"                TEXT                NOT NULL,
  "urgency"                    "LeadUrgency"       NOT NULL,
  "preferred_inspection"       TEXT,
  "consultant_scope_available" BOOLEAN             NOT NULL DEFAULT false,
  "budget_range"               TEXT,
  "terms_accepted"             BOOLEAN             NOT NULL DEFAULT false,
  "terms_version"              TEXT,
  "accepted_at"                TIMESTAMP(3),
  "status"                     "ClientQuoteStatus" NOT NULL DEFAULT 'draft',
  "matched_count"              INTEGER             NOT NULL DEFAULT 0,
  "latitude"                   DOUBLE PRECISION,
  "longitude"                  DOUBLE PRECISION,
  "created_at"                 TIMESTAMP(3)        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"                 TIMESTAMP(3)        NOT NULL,
  "submitted_at"               TIMESTAMP(3),
  "closed_at"                  TIMESTAMP(3),
  CONSTRAINT "client_quote_requests_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "client_quote_requests_client_user_id_idx" ON "client_quote_requests"("client_user_id");
CREATE INDEX "client_quote_requests_status_idx" ON "client_quote_requests"("status");
CREATE INDEX "client_quote_requests_work_category_id_idx" ON "client_quote_requests"("work_category_id");
CREATE INDEX "client_quote_requests_created_at_idx" ON "client_quote_requests"("created_at");

-- CreateTable: quote_request_deliveries
CREATE TABLE "quote_request_deliveries" (
  "id"              SERIAL                     NOT NULL,
  "request_id"      INTEGER                    NOT NULL,
  "company_id"      INTEGER                    NOT NULL,
  "rank_tier"       INTEGER                    NOT NULL DEFAULT 0,
  "email_status"    "QuoteEmailStatus"         NOT NULL DEFAULT 'pending',
  "email_sent_at"   TIMESTAMP(3),
  "email_error"     TEXT,
  "opened_at"       TIMESTAMP(3),
  "response_status" "ContractorResponseStatus" NOT NULL DEFAULT 'pending',
  "responded_at"    TIMESTAMP(3),
  "quote_doc_url"   TEXT,
  "notes"           TEXT,
  "created_at"      TIMESTAMP(3)               NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"      TIMESTAMP(3)               NOT NULL,
  CONSTRAINT "quote_request_deliveries_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "quote_request_deliveries_request_id_company_id_key" ON "quote_request_deliveries"("request_id", "company_id");
CREATE INDEX "quote_request_deliveries_request_id_idx" ON "quote_request_deliveries"("request_id");
CREATE INDEX "quote_request_deliveries_company_id_idx" ON "quote_request_deliveries"("company_id");
CREATE INDEX "quote_request_deliveries_response_status_idx" ON "quote_request_deliveries"("response_status");

-- CreateTable: quote_request_files
CREATE TABLE "quote_request_files" (
  "id"           SERIAL       NOT NULL,
  "request_id"   INTEGER      NOT NULL,
  "file_type"    TEXT         NOT NULL,
  "url"          TEXT         NOT NULL,
  "filename"     TEXT,
  "size_bytes"   INTEGER,
  "content_type" TEXT,
  "uploaded_by"  TEXT         NOT NULL DEFAULT 'client',
  "created_at"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "quote_request_files_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "quote_request_files_request_id_idx" ON "quote_request_files"("request_id");

-- AddForeignKey
ALTER TABLE "client_profiles" ADD CONSTRAINT "client_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "client_quote_requests" ADD CONSTRAINT "client_quote_requests_client_user_id_fkey" FOREIGN KEY ("client_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "client_quote_requests" ADD CONSTRAINT "client_quote_requests_work_category_id_fkey" FOREIGN KEY ("work_category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "client_quote_requests" ADD CONSTRAINT "client_quote_requests_work_subcategory_id_fkey" FOREIGN KEY ("work_subcategory_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "quote_request_deliveries" ADD CONSTRAINT "quote_request_deliveries_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "client_quote_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "quote_request_deliveries" ADD CONSTRAINT "quote_request_deliveries_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "quote_request_files" ADD CONSTRAINT "quote_request_files_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "client_quote_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Enable Row-Level Security (server-side Prisma access only; blocks anon-key access)
ALTER TABLE "client_profiles" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "client_quote_requests" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "quote_request_deliveries" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "quote_request_files" ENABLE ROW LEVEL SECURITY;
