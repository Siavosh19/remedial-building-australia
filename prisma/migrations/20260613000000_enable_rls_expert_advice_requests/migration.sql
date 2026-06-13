-- Enable Row-Level Security on expert_advice_requests.
-- This table was created directly via Supabase and missed the original
-- 20260603000000_enable_rls_all_tables migration. It stores customer PII
-- (name, email, phone, IP address) and must not be readable via the anon key.
-- App access is server-side via the Supabase service role, which bypasses RLS.
-- No policies are added — this blocks direct anon-key access entirely.

ALTER TABLE "expert_advice_requests" ENABLE ROW LEVEL SECURITY;
