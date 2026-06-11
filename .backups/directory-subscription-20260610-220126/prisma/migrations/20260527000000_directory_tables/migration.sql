-- CreateEnum
CREATE TYPE "CompanyStatus" AS ENUM ('draft', 'published', 'needs_review', 'rejected');

-- CreateEnum
CREATE TYPE "ProfileStatus" AS ENUM ('basic', 'contact_verified', 'business_verified', 'licence_verified', 'practitioner_verified', 'claimed', 'featured');

-- CreateEnum
CREATE TYPE "LocationState" AS ENUM ('NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT');

-- CreateEnum
CREATE TYPE "LicenceStatus" AS ENUM ('verified', 'needs_review', 'unverified', 'expired');

-- CreateEnum
CREATE TYPE "TagType" AS ENUM ('service', 'defect', 'repair_system', 'capability');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('company_owner', 'admin', 'staff');

-- CreateEnum
CREATE TYPE "CompanyUserRole" AS ENUM ('owner', 'manager', 'staff');

-- CreateEnum
CREATE TYPE "LeadPlan" AS ENUM ('free', 'starter', 'professional', 'premium');

-- CreateEnum
CREATE TYPE "LeadType" AS ENUM ('service_request', 'quote_request', 'enquiry');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('new', 'sent', 'viewed', 'accepted', 'declined', 'expired');

-- CreateEnum
CREATE TYPE "LeadResponseStatus" AS ENUM ('pending', 'accepted', 'declined', 'no_response');

-- CreateEnum
CREATE TYPE "AdminReviewStatus" AS ENUM ('discovered', 'possible_match', 'verified', 'needs_review', 'rejected', 'published', 'needs_recheck');

-- CreateEnum
CREATE TYPE "LeadUrgency" AS ENUM ('emergency', 'within_week', 'within_month', 'planning');

-- CreateTable
CREATE TABLE "companies" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "abn" TEXT,
    "website" TEXT,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "google_business_url" TEXT,
    "description" TEXT,
    "year_established" INTEGER,
    "main_category_id" INTEGER,
    "status" "CompanyStatus" NOT NULL DEFAULT 'draft',
    "profile_status" "ProfileStatus" NOT NULL DEFAULT 'basic',
    "confidence_score" INTEGER NOT NULL DEFAULT 0,
    "is_claimed" BOOLEAN NOT NULL DEFAULT false,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "suburb" TEXT,
    "city" TEXT,
    "state" "LocationState" NOT NULL,
    "postcode" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "service_radius_km" INTEGER,
    "services_statewide" BOOLEAN NOT NULL DEFAULT false,
    "services_nationwide" BOOLEAN NOT NULL DEFAULT false,
    "states_serviced" "LocationState"[],

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "parent_id" INTEGER,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "icon" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_categories" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "is_approved" BOOLEAN NOT NULL DEFAULT false,
    "approved_at" TIMESTAMP(3),
    "approved_by" INTEGER,

    CONSTRAINT "company_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "licences" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "licence_number" TEXT NOT NULL,
    "licence_class" TEXT,
    "licence_authority" TEXT,
    "licence_state" TEXT,
    "verification_source_url" TEXT,
    "verification_date" TIMESTAMP(3),
    "last_checked_date" TIMESTAMP(3),
    "status" "LicenceStatus" NOT NULL DEFAULT 'needs_review',

    CONSTRAINT "licences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "tag_type" "TagType" NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_tags" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,
    "is_approved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "company_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "full_name" TEXT,
    "phone" TEXT,
    "role" "UserRole" NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "email_verified_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_users" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "role" "CompanyUserRole" NOT NULL,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "invited_at" TIMESTAMP(3),
    "accepted_at" TIMESTAMP(3),

    CONSTRAINT "company_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lead_subscriptions" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "plan" "LeadPlan" NOT NULL DEFAULT 'free',
    "categories_subscribed" INTEGER[],
    "states_subscribed" "LocationState"[],
    "radius_km" INTEGER,
    "max_leads_per_month" INTEGER,
    "leads_received_this_month" INTEGER DEFAULT 0,
    "subscription_start" TIMESTAMP(3),
    "subscription_end" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lead_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leads" (
    "id" SERIAL NOT NULL,
    "lead_type" "LeadType" NOT NULL,
    "status" "LeadStatus" NOT NULL DEFAULT 'new',
    "submitted_by_name" TEXT NOT NULL,
    "submitted_by_email" TEXT NOT NULL,
    "submitted_by_phone" TEXT,
    "postcode" TEXT NOT NULL,
    "suburb" TEXT,
    "state" "LocationState" NOT NULL,
    "category_id" INTEGER,
    "subcategory_id" INTEGER,
    "description" TEXT,
    "urgency" "LeadUrgency" NOT NULL,
    "budget_range" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3),

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lead_deliveries" (
    "id" SERIAL NOT NULL,
    "lead_id" INTEGER NOT NULL,
    "company_id" INTEGER NOT NULL,
    "delivered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "opened_at" TIMESTAMP(3),
    "response_status" "LeadResponseStatus" NOT NULL DEFAULT 'pending',
    "responded_at" TIMESTAMP(3),

    CONSTRAINT "lead_deliveries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_review_queue" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "status" "AdminReviewStatus" NOT NULL,
    "source" TEXT,
    "notes" TEXT,
    "reviewed_by" INTEGER,
    "reviewed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_review_queue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_slug_key" ON "companies"("slug");

-- CreateIndex
CREATE INDEX "companies_status_idx" ON "companies"("status");

-- CreateIndex
CREATE INDEX "companies_is_featured_idx" ON "companies"("is_featured");

-- CreateIndex
CREATE INDEX "companies_confidence_score_idx" ON "companies"("confidence_score");

-- CreateIndex
CREATE INDEX "locations_latitude_idx" ON "locations"("latitude");

-- CreateIndex
CREATE INDEX "locations_longitude_idx" ON "locations"("longitude");

-- CreateIndex
CREATE INDEX "locations_state_idx" ON "locations"("state");

-- CreateIndex
CREATE INDEX "locations_postcode_idx" ON "locations"("postcode");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "tags_slug_key" ON "tags"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "leads_status_idx" ON "leads"("status");

-- CreateIndex
CREATE INDEX "leads_category_id_idx" ON "leads"("category_id");

-- CreateIndex
CREATE INDEX "leads_state_idx" ON "leads"("state");

-- CreateIndex
CREATE INDEX "leads_created_at_idx" ON "leads"("created_at");

-- CreateIndex
CREATE INDEX "lead_deliveries_lead_id_idx" ON "lead_deliveries"("lead_id");

-- CreateIndex
CREATE INDEX "lead_deliveries_company_id_idx" ON "lead_deliveries"("company_id");

-- CreateIndex
CREATE INDEX "lead_deliveries_response_status_idx" ON "lead_deliveries"("response_status");

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_main_category_id_fkey" FOREIGN KEY ("main_category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_categories" ADD CONSTRAINT "company_categories_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_categories" ADD CONSTRAINT "company_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_categories" ADD CONSTRAINT "company_categories_approved_by_fkey" FOREIGN KEY ("approved_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "licences" ADD CONSTRAINT "licences_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_tags" ADD CONSTRAINT "company_tags_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_tags" ADD CONSTRAINT "company_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_users" ADD CONSTRAINT "company_users_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_users" ADD CONSTRAINT "company_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lead_subscriptions" ADD CONSTRAINT "lead_subscriptions_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_subcategory_id_fkey" FOREIGN KEY ("subcategory_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lead_deliveries" ADD CONSTRAINT "lead_deliveries_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lead_deliveries" ADD CONSTRAINT "lead_deliveries_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_review_queue" ADD CONSTRAINT "admin_review_queue_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_review_queue" ADD CONSTRAINT "admin_review_queue_reviewed_by_fkey" FOREIGN KEY ("reviewed_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

