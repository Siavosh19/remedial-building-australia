-- ============================================================================
-- Enable Row-Level Security (RLS) on every table in the public schema.
--
-- Why: Supabase exposes the public schema through the PostgREST API using the
-- public "anon" key (which ships in the browser bundle, lib/supabase.ts).
-- With RLS disabled, anyone with the project URL + anon key can read/write/
-- delete every row in every table. Supabase flagged this as
-- `rls_disabled_in_public` / `sensitive_columns_exposed`.
--
-- After enabling RLS with NO policy, the anon/authenticated roles are denied
-- by default. Two access paths are unaffected:
--   * Prisma connects as the table-owning `postgres` role, which BYPASSES RLS
--     (we do NOT use FORCE ROW LEVEL SECURITY).
--   * Server routes using the service-role key bypass RLS.
--
-- The only legitimate anon access is the public website reading PUBLISHED
-- news / insights (homepage carousel runs in the browser). Those two tables
-- get a narrow published-only SELECT policy below.
-- ============================================================================

-- 1. Enable RLS on every public table that doesn't already have it.
--    NOTE: prefer `node scripts/enable-rls.mjs`, which runs each ALTER in its
--    own transaction with a lock_timeout + retry. This DO block locks all
--    tables in ONE transaction, so a single busy table (e.g. `companies`)
--    rolls the whole thing back. Filtering to relrowsecurity = false avoids
--    needlessly locking already-RLS tables, but the runner is still safer.
DO $$
DECLARE r record;
BEGIN
  FOR r IN
    SELECT c.relname
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public'
      AND c.relkind = 'r'            -- ordinary tables only
      AND c.relrowsecurity = false   -- skip tables already protected
  LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', r.relname);
  END LOOP;
END $$;

-- 2. Narrow public-read policies for the two tables the browser reads via the
--    anon key. Published rows only — drafts stay invisible to the public API.
DROP POLICY IF EXISTS anon_read_published ON public.industry_news;
CREATE POLICY anon_read_published ON public.industry_news
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

DROP POLICY IF EXISTS anon_read_published ON public.rba_insights_articles;
CREATE POLICY anon_read_published ON public.rba_insights_articles
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');
