-- Verification-reminder tracking: how many nudge emails an unverified account
-- has been sent (0-3) and when the last one went out. Additive + safe.
ALTER TABLE "users" ADD COLUMN "verify_reminder_stage" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "users" ADD COLUMN "verify_reminder_last_at" TIMESTAMP(3);
