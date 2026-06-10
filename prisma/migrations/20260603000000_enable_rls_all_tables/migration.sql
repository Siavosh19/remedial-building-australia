-- Enable Row-Level Security on all public tables.
-- All app access is server-side via Prisma (service role), which bypasses RLS.
-- No policies are added — this blocks direct anon-key access entirely.

ALTER TABLE "companies" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "locations" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "categories" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "company_categories" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "licences" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "tags" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "company_tags" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "company_users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "lead_subscriptions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "leads" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "lead_deliveries" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "admin_review_queue" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "directory_leads" ENABLE ROW LEVEL SECURITY;
