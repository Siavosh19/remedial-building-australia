-- CreateEnum
CREATE TYPE "StrataIntakeStatus" AS ENUM ('received', 'extracting', 'needs_review', 'approved', 'rejected', 'converted', 'failed');

-- CreateTable
CREATE TABLE "strata_intakes" (
    "id" SERIAL NOT NULL,
    "message_id" TEXT,
    "from_email" TEXT NOT NULL,
    "from_name" TEXT,
    "envelope_from" TEXT,
    "to_email" TEXT,
    "subject" TEXT,
    "body_text" TEXT,
    "body_html" TEXT,
    "received_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "building_address" TEXT,
    "suburb" TEXT,
    "postcode" TEXT,
    "state" "LocationState",
    "strata_plan_number" TEXT,
    "order_number" TEXT,
    "job_description" TEXT,
    "extracted_units" JSONB,
    "matched_category_id" INTEGER,
    "matched_category_slug" TEXT,
    "matched_category_name" TEXT,
    "match_confidence" TEXT,
    "extraction_error" TEXT,
    "status" "StrataIntakeStatus" NOT NULL DEFAULT 'received',
    "review_notes" TEXT,
    "reviewed_by" INTEGER,
    "reviewed_at" TIMESTAMP(3),
    "quote_request_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "strata_intakes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "strata_intake_files" (
    "id" SERIAL NOT NULL,
    "intake_id" INTEGER NOT NULL,
    "filename" TEXT NOT NULL,
    "content_type" TEXT,
    "size_bytes" INTEGER,
    "url" TEXT,
    "is_pdf" BOOLEAN NOT NULL DEFAULT false,
    "extracted_text" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "strata_intake_files_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "strata_intakes_message_id_key" ON "strata_intakes"("message_id");

-- CreateIndex
CREATE INDEX "strata_intakes_status_idx" ON "strata_intakes"("status");

-- CreateIndex
CREATE INDEX "strata_intakes_received_at_idx" ON "strata_intakes"("received_at");

-- CreateIndex
CREATE INDEX "strata_intake_files_intake_id_idx" ON "strata_intake_files"("intake_id");

-- AddForeignKey
ALTER TABLE "strata_intake_files" ADD CONSTRAINT "strata_intake_files_intake_id_fkey" FOREIGN KEY ("intake_id") REFERENCES "strata_intakes"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- Enable Row-Level Security on the new tables. The app connects as the postgres
-- role (which bypasses RLS), so this does NOT affect Prisma queries; it closes
-- the table to Supabase's public/anon API (RLS on + no policy = deny-all),
-- matching the posture of every other table (see 20260603000000_enable_rls_all_tables).
ALTER TABLE "strata_intakes" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "strata_intake_files" ENABLE ROW LEVEL SECURITY;
