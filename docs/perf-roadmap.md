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
