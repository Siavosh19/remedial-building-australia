-- ── Industry Jobs Board ──────────────────────────────────────────────────────
-- Additive migration: new enums + tables only. Nothing existing is altered.

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('draft', 'pending_payment', 'active', 'expired', 'rejected');
CREATE TYPE "JobEmploymentType" AS ENUM ('full_time', 'part_time', 'contract', 'casual', 'temporary', 'apprenticeship');
CREATE TYPE "JobExperienceLevel" AS ENUM ('entry', 'junior', 'mid', 'senior', 'lead', 'executive');
CREATE TYPE "JobApplicationStatus" AS ENUM ('new', 'reviewed', 'contacted', 'closed');
CREATE TYPE "JobPaymentStatus" AS ENUM ('pending', 'paid', 'failed', 'refunded');

-- CreateTable
CREATE TABLE "job_employers" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "company_name" TEXT,
    "contact_name" TEXT,
    "phone" TEXT,
    "website" TEXT,
    "logo_url" TEXT,
    "company_id" INTEGER,
    "last_login_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "job_employers_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "job_employers_email_key" ON "job_employers"("email");

CREATE TABLE "job_categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "job_categories_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "job_categories_slug_key" ON "job_categories"("slug");
CREATE INDEX "job_categories_group_idx" ON "job_categories"("group");

CREATE TABLE "jobs" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "employer_id" INTEGER NOT NULL,
    "category_id" INTEGER,
    "title" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "company_logo_url" TEXT,
    "company_website" TEXT,
    "company_about" TEXT,
    "location" TEXT NOT NULL,
    "state" "LocationState",
    "employment_type" "JobEmploymentType",
    "experience_level" "JobExperienceLevel",
    "salary" TEXT,
    "description" TEXT NOT NULL,
    "responsibilities" TEXT,
    "requirements" TEXT,
    "contact_email" TEXT NOT NULL,
    "closing_date" TIMESTAMP(3),
    "status" "JobStatus" NOT NULL DEFAULT 'draft',
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "company_id" INTEGER,
    "meta_title" TEXT,
    "meta_description" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,
    "published_at" TIMESTAMP(3),
    "expires_at" TIMESTAMP(3),
    "featured_until" TIMESTAMP(3),
    "reminder_sent" BOOLEAN NOT NULL DEFAULT false,
    "admin_notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "jobs_slug_key" ON "jobs"("slug");
CREATE INDEX "jobs_status_idx" ON "jobs"("status");
CREATE INDEX "jobs_is_featured_idx" ON "jobs"("is_featured");
CREATE INDEX "jobs_category_id_idx" ON "jobs"("category_id");
CREATE INDEX "jobs_state_idx" ON "jobs"("state");
CREATE INDEX "jobs_employer_id_idx" ON "jobs"("employer_id");
CREATE INDEX "jobs_published_at_idx" ON "jobs"("published_at");
CREATE INDEX "jobs_expires_at_idx" ON "jobs"("expires_at");

CREATE TABLE "job_applications" (
    "id" SERIAL NOT NULL,
    "job_id" INTEGER NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "resume_url" TEXT,
    "resume_name" TEXT,
    "cover_message" TEXT,
    "status" "JobApplicationStatus" NOT NULL DEFAULT 'new',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "job_applications_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "job_applications_job_id_idx" ON "job_applications"("job_id");
CREATE INDEX "job_applications_status_idx" ON "job_applications"("status");

CREATE TABLE "job_pricing" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "kind" TEXT NOT NULL DEFAULT 'listing',
    "amount_cents" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'aud',
    "duration_days" INTEGER NOT NULL DEFAULT 30,
    "features" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "stripe_product_id" TEXT,
    "stripe_price_id" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "job_pricing_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "job_pricing_key_key" ON "job_pricing"("key");

CREATE TABLE "job_payments" (
    "id" SERIAL NOT NULL,
    "job_id" INTEGER NOT NULL,
    "employer_id" INTEGER NOT NULL,
    "plan_key" TEXT NOT NULL,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "amount_cents" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'aud',
    "status" "JobPaymentStatus" NOT NULL DEFAULT 'pending',
    "stripe_session_id" TEXT,
    "stripe_payment_intent" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "job_payments_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "job_payments_job_id_idx" ON "job_payments"("job_id");
CREATE INDEX "job_payments_status_idx" ON "job_payments"("status");

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_employer_id_fkey" FOREIGN KEY ("employer_id") REFERENCES "job_employers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "job_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "job_payments" ADD CONSTRAINT "job_payments_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Enable RLS (project convention). Prisma connects via DATABASE_URL and bypasses
-- RLS; this only denies the public anon/authenticated PostgREST roles, which the
-- jobs board never uses. No policies = deny-all for those roles.
ALTER TABLE "job_employers" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "job_categories" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "jobs" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "job_applications" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "job_pricing" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "job_payments" ENABLE ROW LEVEL SECURITY;
