# RBA MeasureMap — Setup & Handoff

Private quantity-takeoff module. Completely separate from the directory, client/
service dashboards, quotes, jobs, subscriptions, scope writer, etc. It reuses
**only** the existing login session and app shell.

## Architecture decisions (why this differs from a "standard" Supabase build)

RBA uses **custom JWT auth** (`lib/directory-auth.ts`), not Supabase Auth, and all
data access goes through **Prisma** on a privileged Postgres role. So:

- `owner_user_id` is an **INTEGER** FK to `public.users(id)` — not a UUID, not
  `auth.users`. There is **no `auth.uid()`** in this app.
- The **effective access gate is application-level**: `lib/measuremap/access.ts`.
  Every route/action/API handler calls it, plus a per-record ownership check.
- **RLS is enabled as defence-in-depth** against the public PostgREST API (the
  anon key ships in the browser). Tables are default-deny to `anon`/`authenticated`
  and their privileges are revoked. RLS is **not** `auth.uid()`-based because that
  would be meaningless here.

## Owner steps for Phase 1 (do these in order)

### 1. Run the database migration
Open **Supabase → SQL editor** and run the whole file:
`docs/measuremap/001_foundation.sql`

It creates the 6 tables, indexes, FKs, helper functions, RLS, seeds the tester
(`remedial.building2@mail.com`) into `measuremap_access`, and creates the private
`measuremap-files` storage bucket.

Verify:
```sql
SELECT * FROM public.measuremap_access;          -- expect 1 row, status active
SELECT tablename, rowsecurity FROM pg_tables
  WHERE tablename LIKE 'measuremap_%';            -- rowsecurity = true for all
```
If the `storage.buckets` INSERT at the bottom fails on permissions, instead create
the bucket in **Dashboard → Storage → New bucket**: name `measuremap-files`,
**Public = OFF**.

> Note: `remedial.building2@mail.com` must already exist in `public.users`. If the
> seed inserts 0 rows, that account hasn't signed up yet — create it via the normal
> RBA signup, then re-run just the `INSERT ... measuremap_access` block.

### 2. Confirm environment variables (already present, just verify)
MeasureMap Phase 1 needs **no new env vars**. It relies on existing ones:
- `DATABASE_URL` / `DIRECT_URL` — Prisma (already set)
- `DIRECTORY_JWT_SECRET` (or `NEXTAUTH_SECRET`) — session auth (already set)
- `SUPABASE_SERVICE_ROLE_KEY` + `NEXT_PUBLIC_SUPABASE_URL` — storage (already set;
  used from Phase 4 for drawing uploads)

New env vars come later:
- **Phase 2** (geocoding): `MEASUREMAP_GEOCODER` + a provider key
  (`GOOGLE_MAPS_API_KEY` **or** `GEOSCAPE_API_KEY`). Until set, address lookup uses
  the existing keyless Nominatim fallback.

### 3. Deploy
The code is safe to deploy before/after the SQL because the new models are only
imported under `/measuremap`, which is gated to the tester. Nothing in the existing
site imports them. (`hasMeasureMapAccess` fails closed if the table is missing.)

## How to test Phase 1

1. Log in as **remedial.building2@mail.com** → visit `/measuremap` → you see the
   foundation dashboard. ✅
2. Log in as **any other** account → visit `/measuremap` → redirected to
   `/measuremap/access-restricted`. ✅
3. Logged out → `/measuremap` → redirected to `/directory/login?next=/measuremap`. ✅
4. Existing dashboards (`/supplier-dashboard`, `/client/...`) are unchanged. ✅

## What Phase 1 delivered
- `docs/measuremap/001_foundation.sql` — DB migration (owner-run)
- `prisma/schema.prisma` — 6 appended MeasureMap models (existing models untouched)
- `lib/measuremap/access.ts` — access-control core
- `lib/measuremap/storage.ts` — private bucket helpers (used from Phase 4)
- `types/measuremap/index.ts` — shared domain types
- `app/measuremap/(workspace)/{layout,page}.tsx` — gated workspace + landing
- `app/measuremap/access-restricted/page.tsx` — 403 page
- `components/measuremap/MeasureMapShell.tsx` — module chrome
