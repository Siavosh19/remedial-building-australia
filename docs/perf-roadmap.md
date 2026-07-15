# Performance & "Instagram feel" roadmap

Goal: make the **app/portal** (logged-in client + business dashboards) feel instant and
solid — like a native app. The **public website** (`/`, `/directory`, `/repair-systems`,
`/defect-library`, `/industry-news`) is 576 mostly-static prerendered pages and is already
fast; it only needs the cross-cutting polish items so both sides feel like one product.

## Diagnosis (measured 2026-07-15)

| Finding | Number | Consequence |
|---|---|---|
| `force-dynamic` pages | 51 (19 in portal) | No caching; every visit is a fresh server render |
| `loading.tsx` skeletons | 2 → (Phase 0 adds portal coverage) | Blank pause on nav |
| `error.tsx` boundaries | 0 → (Phase 0 adds portal) | Any error = white screen |
| Raw `<img>` (unoptimized) | 14 files | Layout shift + slow images |
| `use client` components | 493 | Large JS bundles, slow hydration |
| Heavy client deps | `xlsx` (~1MB), `framer-motion` | Bundle bloat |
| `middleware.ts` | none | Auth logic repeated per layout |
| Auth query caching | `getCurrentDirectoryUser` already `cache()`-wrapped ✓ | (good — not a problem) |

## Phased plan (~2 weeks focused)

### Phase 0 — Quick wins · ½ day · low risk  ← IN PROGRESS
- [x] Confirm `getCurrentDirectoryUser` is `cache()`-wrapped (already done).
- [ ] Add `loading.tsx` skeleton to the client portal (business side already has one).
- [ ] Add `error.tsx` boundaries to client + business portals (no more white screens).
- [ ] (fast follow) Convert the 14 raw `<img>` → `next/image`.

### Phase 1 — Instant navigation · 1–2 days
- `<Suspense>` + streaming around slow data sections.
- Persistent app shell (sidebar/header don't remount on nav); link prefetch.

### Phase 2 — Real speed & caching · 2–3 days
- Triage the 51 `force-dynamic`: cache read-mostly pages with `revalidate` / `unstable_cache`,
  tag-invalidate on writes.
- Reduce per-request auth cost (session claims in cookie vs DB lookup) + add `middleware.ts`.
- DB pass: indexes + kill N+1 in Prisma `include`s.

### Phase 3 — Solidity (the Instagram core) · 2–3 days
- Replace the 11 `router.refresh()` calls with `useOptimistic` + server actions.
- Mobile bottom tab bar (native muscle memory) + View Transitions between pages.

### Phase 4 — Bundle & polish · 1–2 days
- Dynamic-import `xlsx` / `framer-motion`; push logic off client components to the server.
- One consistent design system across portal + public site; PWA install polish.

## Recommendation
Phase 0 + 1 delivers ~80% of the perceived improvement for ~20% of the effort.

## Reality check after digging in (2026-07-15)
The app was already more optimised than the raw metrics implied — several roadmap
items were already done or are non-issues:
- `getCurrentDirectoryUser` is already `cache()`-wrapped (auth dedupes per render). ✓
- `loading.tsx` now covers both portals (Phase 0). ✓
- A **PWA bottom tab bar already exists** (`components/PWAAppShell.tsx`, installed/standalone
  mode, 4 public sections) — so Phase 3's "mobile tab bar" is partly covered; a *portal*-scoped
  tab bar would be the only addition.
- `xlsx` is **not** imported in app code (only a comment + a file-input `accept`), so it does
  not bloat the client bundle — no dynamic-import needed.
- `framer-motion` is used in exactly one file (`app/HomeClient.tsx`, the public hero) — low value
  to change and risky (above the fold).

### Done in this pass (committed to branch, not deployed)
- **DB:** removed a redundant second `company` query on the business dashboard — the base
  `findFirst` already returns all scalar columns, so the checklist re-fetch was a wasted round-trip
  on every load.
- **Optimistic UI:** `LeadFlowActions` now flips instantly on tap (interested / not-interested /
  outcome) and reverts on failure, instead of waiting for the server round-trip.

### Genuinely remaining (higher-risk — do deliberately, not in bulk)
- Convert the 14 raw `<img>` → `next/image` (needs per-image dimensions).
- Audit the 51 `force-dynamic` pages: only some are truly per-user; the rest can be cached with
  `revalidate` / `unstable_cache` + tag invalidation. Must be done page-by-page to avoid serving
  one user's data to another.
- Suspense streaming on the heaviest pages (marginal now that `loading.tsx` covers nav).
- A portal-scoped mobile bottom tab bar + View Transitions.
