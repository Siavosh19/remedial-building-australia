-- Social profile links shown on the public company profile (Follow card) and
-- editable by the business in their dashboard profile form.
ALTER TABLE "companies" ADD COLUMN IF NOT EXISTS "facebook_url"  TEXT;
ALTER TABLE "companies" ADD COLUMN IF NOT EXISTS "instagram_url" TEXT;
ALTER TABLE "companies" ADD COLUMN IF NOT EXISTS "linkedin_url"  TEXT;
