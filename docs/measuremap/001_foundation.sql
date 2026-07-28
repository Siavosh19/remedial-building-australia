-- ============================================================================
-- RBA MeasureMap — Migration 001: Foundation
-- ============================================================================
-- Run this ONCE in the Supabase SQL editor (prod DB). It is idempotent
-- (IF NOT EXISTS / ON CONFLICT) so re-running is safe.
--
-- ARCHITECTURE NOTE (read this): RBA does NOT use Supabase Auth. Users live in
-- the Prisma-managed `public.users` table with an INTEGER id, and the app talks
-- to Postgres through Prisma on a privileged role that BYPASSES row-level
-- security. Therefore:
--   * `owner_user_id` is INTEGER referencing public.users(id) — NOT a UUID and
--     NOT auth.users.
--   * The EFFECTIVE access gate is application-level (see lib/measuremap/access.ts):
--     every route/action/loader calls hasMeasureMapAccess() + an ownership check.
--   * RLS here is DEFENCE-IN-DEPTH against the public PostgREST API only. Because
--     the anon key ships in the browser bundle, any table WITHOUT rls could be
--     read via PostgREST with that key. We ENABLE RLS and add NO permissive
--     policy for anon/authenticated (default-deny), and REVOKE their privileges.
--     We do NOT use FORCE ROW LEVEL SECURITY, so the app's privileged Prisma
--     role continues to work unchanged.
-- ============================================================================

BEGIN;

-- ---------------------------------------------------------------------------
-- 1. measuremap_access — who may use MeasureMap at all
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.measuremap_access (
  user_id     INTEGER PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  email       TEXT,
  role        TEXT        NOT NULL DEFAULT 'tester',   -- owner | tester | subscriber
  status      TEXT        NOT NULL DEFAULT 'active',   -- active | inactive
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- 2. measuremap_projects — each project is anchored to a physical address
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.measuremap_projects (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_user_id     INTEGER NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  project_name      TEXT,
  project_reference TEXT,
  full_address      TEXT        NOT NULL,
  suburb            TEXT,
  state             TEXT,
  postcode          TEXT,
  latitude          DOUBLE PRECISION,
  longitude         DOUBLE PRECISION,
  notes             TEXT,
  status            TEXT        NOT NULL DEFAULT 'active',   -- active | archived
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  archived_at       TIMESTAMPTZ,
  deleted_at        TIMESTAMPTZ                              -- soft delete
);
CREATE INDEX IF NOT EXISTS idx_mm_projects_owner   ON public.measuremap_projects(owner_user_id);
CREATE INDEX IF NOT EXISTS idx_mm_projects_status  ON public.measuremap_projects(status);
CREATE INDEX IF NOT EXISTS idx_mm_projects_updated ON public.measuremap_projects(updated_at DESC);

-- ---------------------------------------------------------------------------
-- 3. measuremap_drawings — uploaded PDF/image files (metadata; bytes in Storage)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.measuremap_drawings (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id     UUID    NOT NULL REFERENCES public.measuremap_projects(id) ON DELETE CASCADE,
  owner_user_id  INTEGER NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  filename       TEXT    NOT NULL,
  storage_path   TEXT    NOT NULL,
  mime_type      TEXT,
  file_size      BIGINT,
  page_count     INTEGER NOT NULL DEFAULT 1,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at     TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_mm_drawings_project ON public.measuremap_drawings(project_id);
CREATE INDEX IF NOT EXISTS idx_mm_drawings_owner   ON public.measuremap_drawings(owner_user_id);

-- ---------------------------------------------------------------------------
-- 4. measuremap_drawing_pages — per-page scale calibration & geometry frame
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.measuremap_drawing_pages (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  drawing_id       UUID    NOT NULL REFERENCES public.measuremap_drawings(id) ON DELETE CASCADE,
  project_id       UUID    NOT NULL REFERENCES public.measuremap_projects(id) ON DELETE CASCADE,
  page_number      INTEGER NOT NULL,
  page_width       DOUBLE PRECISION,
  page_height      DOUBLE PRECISION,
  rotation         INTEGER NOT NULL DEFAULT 0,            -- 0 | 90 | 180 | 270
  pixels_per_metre DOUBLE PRECISION,                      -- null until calibrated
  scale_status     TEXT    NOT NULL DEFAULT 'unscaled',   -- unscaled | scaled
  calibration_data JSONB,                                 -- {p1,p2,realLength,unit,...}
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (drawing_id, page_number)
);
CREATE INDEX IF NOT EXISTS idx_mm_pages_drawing ON public.measuremap_drawing_pages(drawing_id);
CREATE INDEX IF NOT EXISTS idx_mm_pages_project ON public.measuremap_drawing_pages(project_id);

-- ---------------------------------------------------------------------------
-- 5. measuremap_takeoff_items — coloured quantity buckets
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.measuremap_takeoff_items (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id       UUID    NOT NULL REFERENCES public.measuremap_projects(id) ON DELETE CASCADE,
  owner_user_id    INTEGER NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  source_type      TEXT    NOT NULL,                      -- map | drawing
  source_id        UUID,                                  -- drawing_page id when source_type=drawing
  name             TEXT    NOT NULL,
  measurement_type TEXT    NOT NULL,                      -- length | perimeter | area | count
  colour           TEXT    NOT NULL DEFAULT '#e11d48',
  unit             TEXT    NOT NULL,                      -- m | m2 | ea
  is_visible       BOOLEAN NOT NULL DEFAULT true,
  is_locked        BOOLEAN NOT NULL DEFAULT false,
  sort_order       INTEGER NOT NULL DEFAULT 0,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at       TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_mm_items_project ON public.measuremap_takeoff_items(project_id);
CREATE INDEX IF NOT EXISTS idx_mm_items_owner   ON public.measuremap_takeoff_items(owner_user_id);

-- ---------------------------------------------------------------------------
-- 6. measuremap_measurements — individual geometry + calculated quantity
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.measuremap_measurements (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id          UUID    NOT NULL REFERENCES public.measuremap_projects(id) ON DELETE CASCADE,
  takeoff_item_id     UUID    NOT NULL REFERENCES public.measuremap_takeoff_items(id) ON DELETE CASCADE,
  owner_user_id       INTEGER NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  source_type         TEXT    NOT NULL,                   -- map | drawing
  source_id           UUID,                               -- drawing_page id when source_type=drawing
  geometry            JSONB   NOT NULL,                   -- enough to redraw + edit
  calculated_quantity DOUBLE PRECISION NOT NULL DEFAULT 0,-- metres / m² / count (internal = metres)
  unit                TEXT    NOT NULL,
  label               TEXT,
  sort_order          INTEGER NOT NULL DEFAULT 0,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at          TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_mm_meas_project ON public.measuremap_measurements(project_id);
CREATE INDEX IF NOT EXISTS idx_mm_meas_item    ON public.measuremap_measurements(takeoff_item_id);

-- ---------------------------------------------------------------------------
-- 7. Optional SQL helper functions (usable from server-side SQL if ever needed)
--    These take an explicit user id — there is no auth.uid() in this app.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.has_measuremap_access(p_user_id INTEGER)
RETURNS BOOLEAN LANGUAGE sql STABLE AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.measuremap_access
    WHERE user_id = p_user_id AND status = 'active'
  );
$$;

CREATE OR REPLACE FUNCTION public.owns_measuremap_project(p_user_id INTEGER, p_project_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.measuremap_projects
    WHERE id = p_project_id AND owner_user_id = p_user_id AND deleted_at IS NULL
  );
$$;

-- ---------------------------------------------------------------------------
-- 8. Row-Level Security — default-deny to the public PostgREST roles
--    (anon + authenticated). The app's Prisma role is unaffected.
-- ---------------------------------------------------------------------------
DO $$
DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'measuremap_access','measuremap_projects','measuremap_drawings',
    'measuremap_drawing_pages','measuremap_takeoff_items','measuremap_measurements'
  ] LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', t);
    -- Strip any PostgREST-facing privileges. No SELECT/INSERT/etc. for the
    -- browser-exposed roles, so the anon key cannot read MeasureMap data.
    EXECUTE format('REVOKE ALL ON public.%I FROM anon, authenticated;', t);
  END LOOP;
END $$;

-- ---------------------------------------------------------------------------
-- 9. Seed the private tester (owner) — remedial.building2@mail.com
-- ---------------------------------------------------------------------------
INSERT INTO public.measuremap_access (user_id, email, role, status)
SELECT id, email, 'owner', 'active'
FROM public.users
WHERE lower(email) = lower('remedial.building2@mail.com')
ON CONFLICT (user_id) DO UPDATE
  SET role = 'owner', status = 'active', updated_at = now();

COMMIT;

-- ---------------------------------------------------------------------------
-- 10. Private Storage bucket (run separately if your SQL role lacks storage
--     schema rights — otherwise create it in Dashboard → Storage as PRIVATE).
--     Objects are only ever read/written server-side via the service role,
--     which bypasses storage RLS; the bucket stays non-public so no anonymous
--     URL works without a server-signed token.
-- ---------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES ('measuremap-files', 'measuremap-files', false)
ON CONFLICT (id) DO UPDATE SET public = false;

-- Verify (should return one row, status active):
--   SELECT * FROM public.measuremap_access;
