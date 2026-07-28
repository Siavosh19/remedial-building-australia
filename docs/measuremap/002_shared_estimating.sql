-- ============================================================================
-- RBA MeasureMap — Migration 002: Shared Estimating Structure
-- ============================================================================
-- Run this ONCE in the Supabase SQL editor (prod DB), AFTER 001_foundation.sql.
-- Idempotent (IF NOT EXISTS / ADD COLUMN IF NOT EXISTS / ON CONFLICT) — safe to
-- re-run.
--
-- WHY: Map Measure, Plans & Takeoffs and Estimate must share ONE estimating
-- structure (per the architecture spec), not three isolated systems:
--
--   Project
--   ├── work_categories            (estimator-named, shared across all pages)
--   │   └── estimate_items         (shared row: quantity source + rates + costs)
--   │        ├── map measurements
--   │        ├── plan measurements
--   │        └── manual quantity
--   ├── free measurements          (unlinked; assigned later)
--   ├── plans (= measuremap_drawings / _drawing_pages, already exist)
--   ├── estimate_revisions
--   └── activity_logs
--
-- SAFETY: This migration is ADDITIVE. It creates new tables and adds new
-- (mostly nullable / defaulted) columns to measuremap_measurements, then
-- BACKFILLS the new shared tables from the existing takeoff_items /
-- measurements. The existing measuremap_takeoff_items table and the
-- measurements.takeoff_item_id column are LEFT IN PLACE so the currently
-- deployed Map Measure keeps working unchanged. They are retired later in
-- migration 003, only AFTER the app code has been cut over to the new tables.
--
-- ARCHITECTURE NOTE (same as 001): no Supabase Auth. owner_user_id / created_by
-- are INTEGER -> public.users(id). RLS is defence-in-depth vs the public
-- PostgREST roles only (enable + REVOKE from anon/authenticated); the app's
-- privileged Prisma role is unaffected. The app sets updated_at via Prisma
-- (@updatedAt) — no DB trigger, matching 001.
-- ============================================================================

BEGIN;

-- ---------------------------------------------------------------------------
-- 1. measuremap_work_categories — estimator-named sections, shared by all pages
--    NOTE: names are ALWAYS user-supplied. Nothing here classifies work by
--    trade; the software is project-type agnostic.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.measuremap_work_categories (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id     UUID    NOT NULL REFERENCES public.measuremap_projects(id) ON DELETE CASCADE,
  owner_user_id  INTEGER NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name           TEXT    NOT NULL,
  description    TEXT,
  sort_order     INTEGER NOT NULL DEFAULT 0,
  created_by     INTEGER REFERENCES public.users(id) ON DELETE SET NULL,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at     TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_mm_categories_project ON public.measuremap_work_categories(project_id);
CREATE INDEX IF NOT EXISTS idx_mm_categories_owner   ON public.measuremap_work_categories(owner_user_id);

-- ---------------------------------------------------------------------------
-- 2. measuremap_estimate_items — the SHARED item/row.
--    One record per item; the same record is used from Map Measure, Plans &
--    Takeoffs and the Estimate. Holds quantity inputs (manual + waste), the
--    cost rates, and the row type. Measured quantity is derived from the
--    linked measurements (see view in section 7), so it is NOT stored here.
--
--    row_type: measured | manual_quantity | lump_sum | provisional_sum |
--              optional | heading | note | subtotal
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.measuremap_estimate_items (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id        UUID    NOT NULL REFERENCES public.measuremap_projects(id) ON DELETE CASCADE,
  category_id       UUID    REFERENCES public.measuremap_work_categories(id) ON DELETE SET NULL,
  owner_user_id     INTEGER NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name              TEXT    NOT NULL,
  description       TEXT,
  unit              TEXT    NOT NULL DEFAULT 'ea',          -- m | m2 | m3 | ea | hr | day | item | lump
  measurement_type  TEXT,                                   -- area | linear | perimeter | count (default draw type; null for non-measured rows)
  colour            TEXT    NOT NULL DEFAULT '#0369a1',
  row_type          TEXT    NOT NULL DEFAULT 'measured',    -- see list above
  manual_quantity   DOUBLE PRECISION NOT NULL DEFAULT 0,    -- manual addition ON TOP of measured
  quantity_override DOUBLE PRECISION,                       -- non-null = estimator override of measured+manual (spec §11)
  waste_percent     DOUBLE PRECISION NOT NULL DEFAULT 0,
  material_rate     DOUBLE PRECISION NOT NULL DEFAULT 0,
  labour_rate       DOUBLE PRECISION NOT NULL DEFAULT 0,
  equipment_rate    DOUBLE PRECISION NOT NULL DEFAULT 0,
  subcontract_rate  DOUBLE PRECISION NOT NULL DEFAULT 0,
  other_rate        DOUBLE PRECISION NOT NULL DEFAULT 0,
  lump_sum_amount   DOUBLE PRECISION NOT NULL DEFAULT 0,    -- for lump_sum / provisional_sum rows
  markup_percent    DOUBLE PRECISION NOT NULL DEFAULT 0,
  is_visible        BOOLEAN NOT NULL DEFAULT true,
  is_locked         BOOLEAN NOT NULL DEFAULT false,
  sort_order        INTEGER NOT NULL DEFAULT 0,
  created_by        INTEGER REFERENCES public.users(id) ON DELETE SET NULL,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at        TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_mm_estitems_project  ON public.measuremap_estimate_items(project_id);
CREATE INDEX IF NOT EXISTS idx_mm_estitems_category ON public.measuremap_estimate_items(category_id);
CREATE INDEX IF NOT EXISTS idx_mm_estitems_owner    ON public.measuremap_estimate_items(owner_user_id);

-- ---------------------------------------------------------------------------
-- 3. measuremap_measurements — extend to the shared model.
--    Each measurement is now first-class (its own name/colour/type/mode) and
--    links to an estimate_item (structured) or nothing (free). Source is map
--    or plan; plan measurements reference a plan + page.
--
--    Existing rows keep takeoff_item_id (retired in 003). New columns are
--    added nullable/defaulted and BACKFILLED in section 6.
-- ---------------------------------------------------------------------------
ALTER TABLE public.measuremap_measurements
  ADD COLUMN IF NOT EXISTS category_id       UUID    REFERENCES public.measuremap_work_categories(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS estimate_item_id  UUID    REFERENCES public.measuremap_estimate_items(id)  ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS measurement_mode  TEXT,             -- free | structured
  ADD COLUMN IF NOT EXISTS measurement_type  TEXT,             -- area | linear | perimeter | count
  ADD COLUMN IF NOT EXISTS name              TEXT,
  ADD COLUMN IF NOT EXISTS description       TEXT,
  ADD COLUMN IF NOT EXISTS colour            TEXT,
  ADD COLUMN IF NOT EXISTS plan_id           UUID    REFERENCES public.measuremap_drawings(id)       ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS plan_page_id      UUID    REFERENCES public.measuremap_drawing_pages(id)  ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS map_reference     TEXT,
  ADD COLUMN IF NOT EXISTS is_visible        BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS created_by        INTEGER REFERENCES public.users(id) ON DELETE SET NULL;

-- Free measurements have no item, so takeoff_item_id can no longer be mandatory.
ALTER TABLE public.measuremap_measurements ALTER COLUMN takeoff_item_id DROP NOT NULL;

CREATE INDEX IF NOT EXISTS idx_mm_meas_estitem  ON public.measuremap_measurements(estimate_item_id);
CREATE INDEX IF NOT EXISTS idx_mm_meas_category ON public.measuremap_measurements(category_id);
CREATE INDEX IF NOT EXISTS idx_mm_meas_plan     ON public.measuremap_measurements(plan_id);
CREATE INDEX IF NOT EXISTS idx_mm_meas_mode     ON public.measuremap_measurements(measurement_mode);

-- ---------------------------------------------------------------------------
-- 4. measuremap_estimate_revisions + values — snapshot an estimate at a point
--    in time (spec §16). Populated later by the Estimate page; created now so
--    the schema is complete.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.measuremap_estimate_revisions (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id       UUID    NOT NULL REFERENCES public.measuremap_projects(id) ON DELETE CASCADE,
  revision_number  INTEGER NOT NULL,
  name             TEXT,
  status           TEXT    NOT NULL DEFAULT 'draft',   -- draft | issued | superseded | won | lost
  created_by       INTEGER REFERENCES public.users(id) ON DELETE SET NULL,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (project_id, revision_number)
);
CREATE INDEX IF NOT EXISTS idx_mm_revisions_project ON public.measuremap_estimate_revisions(project_id);

CREATE TABLE IF NOT EXISTS public.measuremap_estimate_item_revision_values (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  revision_id       UUID NOT NULL REFERENCES public.measuremap_estimate_revisions(id) ON DELETE CASCADE,
  estimate_item_id  UUID NOT NULL REFERENCES public.measuremap_estimate_items(id)      ON DELETE CASCADE,
  quantity          DOUBLE PRECISION,
  rates             JSONB,            -- {material,labour,equipment,subcontract,other}
  cost_values       JSONB,            -- {material,labour,...,base_cost}
  markup_percent    DOUBLE PRECISION,
  selling_price     DOUBLE PRECISION,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (revision_id, estimate_item_id)
);
CREATE INDEX IF NOT EXISTS idx_mm_revvals_revision ON public.measuremap_estimate_item_revision_values(revision_id);

-- ---------------------------------------------------------------------------
-- 5. measuremap_activity_logs — project history feed (spec §11, §12, §15)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.measuremap_activity_logs (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id   UUID    NOT NULL REFERENCES public.measuremap_projects(id) ON DELETE CASCADE,
  user_id      INTEGER REFERENCES public.users(id) ON DELETE SET NULL,
  action       TEXT    NOT NULL,     -- e.g. category_created | item_created | measurement_added | quantity_overridden | rate_changed
  entity_type  TEXT,                 -- category | estimate_item | measurement | plan | revision
  entity_id    TEXT,                 -- uuid as text (entities have UUID ids)
  metadata     JSONB,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_mm_activity_project ON public.measuremap_activity_logs(project_id, created_at DESC);

-- ---------------------------------------------------------------------------
-- 6. BACKFILL — migrate existing takeoff_items -> estimate_items and fill the
--    new measurement columns. Existing map takeoffs become STRUCTURED,
--    UNCATEGORISED estimate items (category_id NULL is allowed). IDs are
--    preserved so measurements.estimate_item_id == old takeoff_item_id.
--
--    measurement_type is normalised: 'length' -> 'linear' (the shared model
--    uses area | linear | perimeter | count).
-- ---------------------------------------------------------------------------

-- 6a. takeoff_items -> estimate_items (preserve id; idempotent)
INSERT INTO public.measuremap_estimate_items
  (id, project_id, owner_user_id, name, unit, measurement_type, colour, row_type,
   is_visible, is_locked, sort_order, created_at, updated_at, deleted_at)
SELECT
  ti.id, ti.project_id, ti.owner_user_id, ti.name, ti.unit,
  CASE WHEN ti.measurement_type = 'length' THEN 'linear' ELSE ti.measurement_type END,
  ti.colour, 'measured',
  ti.is_visible, ti.is_locked, ti.sort_order, ti.created_at, ti.updated_at, ti.deleted_at
FROM public.measuremap_takeoff_items ti
ON CONFLICT (id) DO NOTHING;

-- 6b. backfill measurement columns from the parent item (only rows not yet done)
UPDATE public.measuremap_measurements m
SET
  estimate_item_id = COALESCE(m.estimate_item_id, m.takeoff_item_id),
  measurement_mode = COALESCE(m.measurement_mode, 'structured'),
  measurement_type = COALESCE(
    m.measurement_type,
    CASE WHEN ti.measurement_type = 'length' THEN 'linear' ELSE ti.measurement_type END
  ),
  name    = COALESCE(m.name, m.label),
  colour  = COALESCE(m.colour, ti.colour),
  plan_id = CASE WHEN m.source_type = 'drawing' THEN m.plan_id ELSE m.plan_id END
FROM public.measuremap_takeoff_items ti
WHERE m.takeoff_item_id = ti.id
  AND (m.estimate_item_id IS NULL OR m.measurement_mode IS NULL);

-- 6c. default mode for any stragglers (measurements never had an item)
UPDATE public.measuremap_measurements
SET measurement_mode = 'free'
WHERE measurement_mode IS NULL;

-- ---------------------------------------------------------------------------
-- 7. Convenience view — measured quantity rolled up per estimate item.
--    (measured only; manual/override/waste/costs are applied in app code so
--    the calculation stays in one place and is easy to unit-test.)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE VIEW public.measuremap_item_measured_totals AS
SELECT
  ei.id AS estimate_item_id,
  ei.project_id,
  COUNT(m.id) FILTER (WHERE m.deleted_at IS NULL)                              AS measurement_count,
  COALESCE(SUM(m.calculated_quantity) FILTER (WHERE m.deleted_at IS NULL), 0)  AS measured_quantity,
  COUNT(m.id) FILTER (WHERE m.deleted_at IS NULL AND m.source_type = 'map')    AS map_count,
  COUNT(m.id) FILTER (WHERE m.deleted_at IS NULL AND m.source_type = 'drawing')AS plan_count
FROM public.measuremap_estimate_items ei
LEFT JOIN public.measuremap_measurements m
  ON m.estimate_item_id = ei.id
GROUP BY ei.id, ei.project_id;

-- ---------------------------------------------------------------------------
-- 8. Row-Level Security — default-deny to anon/authenticated (same as 001).
-- ---------------------------------------------------------------------------
DO $$
DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'measuremap_work_categories','measuremap_estimate_items',
    'measuremap_estimate_revisions','measuremap_estimate_item_revision_values',
    'measuremap_activity_logs'
  ] LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', t);
    EXECUTE format('REVOKE ALL ON public.%I FROM anon, authenticated;', t);
  END LOOP;
END $$;

COMMIT;

-- Verify:
--   SELECT count(*) FROM public.measuremap_estimate_items;              -- >= existing takeoff_items
--   SELECT measurement_mode, count(*) FROM public.measuremap_measurements GROUP BY 1;
--   SELECT * FROM public.measuremap_item_measured_totals LIMIT 5;
