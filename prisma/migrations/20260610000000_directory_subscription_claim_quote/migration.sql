-- CreateEnum
CREATE TYPE "DirectoryPlanType" AS ENUM ('basic', 'claimed', 'featured');

-- CreateEnum
CREATE TYPE "DirectoryClaimStatus" AS ENUM ('unclaimed', 'claim_pending', 'claimed', 'rejected');

-- CreateEnum
CREATE TYPE "DirectorySubStatus" AS ENUM ('none', 'trialing', 'active', 'past_due', 'cancelled', 'expired');

-- CreateEnum
CREATE TYPE "DirectoryBillingCycle" AS ENUM ('free', 'monthly', 'yearly');

-- CreateEnum
CREATE TYPE "QuoteRequestStatus" AS ENUM ('new', 'viewed', 'responded', 'not_suitable', 'won', 'lost');

-- CreateEnum
CREATE TYPE "QuoteRequestRole" AS ENUM ('strata_manager', 'committee_member', 'building_manager', 'consultant', 'builder', 'owner', 'other');

-- AlterTable: add new fields to companies
ALTER TABLE "companies"
  ADD COLUMN "plan_type"              "DirectoryPlanType"    NOT NULL DEFAULT 'basic',
  ADD COLUMN "listing_claim_status"   "DirectoryClaimStatus" NOT NULL DEFAULT 'unclaimed',
  ADD COLUMN "logo_url"               TEXT,
  ADD COLUMN "quote_requests_enabled" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "claimed_at"             TIMESTAMP(3),
  ADD COLUMN "featured_until"         TIMESTAMP(3),
  ADD COLUMN "licence_number"         TEXT,
  ADD COLUMN "licence_type"           TEXT,
  ADD COLUMN "insurance_details"      TEXT,
  ADD COLUMN "profile_views"          INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "website_clicks"         INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "phone_clicks"           INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "suspended"              BOOLEAN NOT NULL DEFAULT false;

-- Back-fill plan_type from existing is_featured / is_claimed
UPDATE "companies" SET "plan_type" = 'featured' WHERE "is_featured" = true;
UPDATE "companies" SET "plan_type" = 'claimed'  WHERE "is_claimed" = true AND "is_featured" = false;
UPDATE "companies" SET "listing_claim_status" = 'claimed' WHERE "is_claimed" = true;

-- CreateIndex on companies
CREATE INDEX "companies_plan_type_idx"           ON "companies"("plan_type");
CREATE INDEX "companies_listing_claim_status_idx" ON "companies"("listing_claim_status");

-- CreateTable: directory_subscriptions
CREATE TABLE "directory_subscriptions" (
  "id"                     SERIAL       NOT NULL,
  "company_id"             INTEGER      NOT NULL,
  "plan_type"              "DirectoryPlanType"     NOT NULL DEFAULT 'basic',
  "billing_cycle"          "DirectoryBillingCycle" NOT NULL DEFAULT 'free',
  "subscription_status"    "DirectorySubStatus"    NOT NULL DEFAULT 'none',
  "stripe_customer_id"     TEXT,
  "stripe_subscription_id" TEXT,
  "trial_started_at"       TIMESTAMP(3),
  "trial_ends_at"          TIMESTAMP(3),
  "current_period_start"   TIMESTAMP(3),
  "current_period_end"     TIMESTAMP(3),
  "cancel_at_period_end"   BOOLEAN  NOT NULL DEFAULT false,
  "cancelled_at"           TIMESTAMP(3),
  "admin_override_plan"    "DirectoryPlanType",
  "admin_override_by"      INTEGER,
  "admin_override_at"      TIMESTAMP(3),
  "admin_notes"            TEXT,
  "created_at"             TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"             TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "directory_subscriptions_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "directory_subscriptions_company_id_key" ON "directory_subscriptions"("company_id");
CREATE INDEX "directory_subscriptions_subscription_status_idx" ON "directory_subscriptions"("subscription_status");
CREATE INDEX "directory_subscriptions_plan_type_idx"           ON "directory_subscriptions"("plan_type");

ALTER TABLE "directory_subscriptions"
  ADD CONSTRAINT "directory_subscriptions_company_id_fkey"
  FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable: claim_requests
CREATE TABLE "claim_requests" (
  "id"              SERIAL       NOT NULL,
  "company_id"      INTEGER      NOT NULL,
  "user_id"         INTEGER      NOT NULL,
  "status"          "DirectoryClaimStatus" NOT NULL DEFAULT 'claim_pending',
  "claimant_name"   TEXT         NOT NULL,
  "claimant_email"  TEXT         NOT NULL,
  "claimant_phone"  TEXT,
  "notes"           TEXT,
  "admin_notes"     TEXT,
  "reviewed_by"     INTEGER,
  "reviewed_at"     TIMESTAMP(3),
  "created_at"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "claim_requests_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "claim_requests_company_id_idx" ON "claim_requests"("company_id");
CREATE INDEX "claim_requests_status_idx"     ON "claim_requests"("status");
CREATE INDEX "claim_requests_user_id_idx"    ON "claim_requests"("user_id");

ALTER TABLE "claim_requests"
  ADD CONSTRAINT "claim_requests_company_id_fkey"
  FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable: quote_requests
CREATE TABLE "quote_requests" (
  "id"                 SERIAL       NOT NULL,
  "company_id"         INTEGER      NOT NULL,
  "requester_name"     TEXT         NOT NULL,
  "requester_email"    TEXT         NOT NULL,
  "requester_phone"    TEXT,
  "requester_role"     "QuoteRequestRole",
  "building_suburb"    TEXT,
  "project_category"   TEXT,
  "urgency"            TEXT,
  "budget_range"       TEXT,
  "message"            TEXT,
  "status"             "QuoteRequestStatus" NOT NULL DEFAULT 'new',
  "notified_business"  BOOLEAN      NOT NULL DEFAULT false,
  "notified_admin"     BOOLEAN      NOT NULL DEFAULT false,
  "responded_at"       TIMESTAMP(3),
  "created_at"         TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"         TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "quote_requests_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "quote_requests_company_id_idx" ON "quote_requests"("company_id");
CREATE INDEX "quote_requests_status_idx"     ON "quote_requests"("status");
CREATE INDEX "quote_requests_created_at_idx" ON "quote_requests"("created_at");

ALTER TABLE "quote_requests"
  ADD CONSTRAINT "quote_requests_company_id_fkey"
  FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable: company_media
CREATE TABLE "company_media" (
  "id"          SERIAL       NOT NULL,
  "company_id"  INTEGER      NOT NULL,
  "media_type"  TEXT         NOT NULL,
  "url"         TEXT         NOT NULL,
  "filename"    TEXT,
  "size_bytes"  INTEGER,
  "sort_order"  INTEGER      NOT NULL DEFAULT 0,
  "created_at"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "company_media_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "company_media_company_id_idx"  ON "company_media"("company_id");
CREATE INDEX "company_media_media_type_idx"  ON "company_media"("media_type");

ALTER TABLE "company_media"
  ADD CONSTRAINT "company_media_company_id_fkey"
  FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
