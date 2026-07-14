-- Directory search performance: index the fields the search WHERE clause and the
-- IDF document-frequency counts hit on every request.
--
-- The keyword search uses ILIKE '%term%' (Prisma `contains`) across company name,
-- description and category name. A leading-wildcard ILIKE cannot use a btree index,
-- so Postgres sequential-scanned the whole companies table on every search. A
-- pg_trgm GIN index lets those ILIKE scans use an index instead.
--
-- All statements are idempotent so this is safe to re-run.

CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Trigram GIN indexes for the ILIKE keyword / IDF matching.
CREATE INDEX IF NOT EXISTS companies_name_trgm_idx
  ON companies USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS companies_description_trgm_idx
  ON companies USING gin (description gin_trgm_ops);
CREATE INDEX IF NOT EXISTS categories_name_trgm_idx
  ON categories USING gin (name gin_trgm_ops);

-- Btree indexes for the category hard-filters (primary + approved secondary trades)
-- used by buildWhere(), getTopListings() and the ai-category-match resolver.
CREATE INDEX IF NOT EXISTS companies_main_category_id_idx
  ON companies (main_category_id);
CREATE INDEX IF NOT EXISTS company_categories_company_id_idx
  ON company_categories (company_id);
CREATE INDEX IF NOT EXISTS company_categories_category_id_idx
  ON company_categories (category_id);
CREATE INDEX IF NOT EXISTS company_categories_is_approved_category_id_idx
  ON company_categories (is_approved, category_id);
