-- Allow admins to suspend any account (blocks login across all roles).
ALTER TABLE "users" ADD COLUMN "suspended" BOOLEAN NOT NULL DEFAULT false;
