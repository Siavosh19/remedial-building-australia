-- Merge jobs board into the directory account: jobs are now owned by a directory
-- User instead of a separate magic-link JobEmployer. employer_id is retained
-- (nullable) during the transition; user_id becomes the primary owner.

-- jobs: make employer_id optional, add user_id owner
ALTER TABLE "jobs" ALTER COLUMN "employer_id" DROP NOT NULL;
ALTER TABLE "jobs" ADD COLUMN "user_id" INTEGER;
CREATE INDEX "jobs_user_id_idx" ON "jobs"("user_id");
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_user_id_fkey"
  FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- job_payments: make employer_id optional, add user_id owner
ALTER TABLE "job_payments" ALTER COLUMN "employer_id" DROP NOT NULL;
ALTER TABLE "job_payments" ADD COLUMN "user_id" INTEGER;
CREATE INDEX "job_payments_user_id_idx" ON "job_payments"("user_id");
ALTER TABLE "job_payments" ADD CONSTRAINT "job_payments_user_id_fkey"
  FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
