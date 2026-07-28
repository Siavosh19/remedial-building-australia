# MeasureMap → Remedial Estimating: Shared Estimating Architecture

Design for connecting **Overview, Map Measure, Plans & Takeoffs, Estimate and
Reports** onto **one** shared project estimating structure (per the architecture
spec). Nothing here classifies work by trade — every category and item name is
estimator-supplied, so the product works for any project type.

Companion file: **`002_shared_estimating.sql`** (the migration to run in Supabase).

---

## 1. The shared model

```
Project
├── work_categories        (estimator-named; shared by Map / Plan / Estimate)
│   └── estimate_items      (ONE record per item; the shared row)
│        ├── measurements (source_type = map)
│        ├── measurements (source_type = plan)
│        └── manual_quantity (a field on the item)
├── measurements (free, estimate_item_id = NULL)   ← unassigned "free" measures
├── plans        (= measuremap_drawings / _drawing_pages, already exist)
├── estimate_revisions → estimate_item_revision_values
└── activity_logs
```

**One category = one row = one id.** Creating "Demolition" in Map Measure makes it
appear in Plans & Takeoffs and as an Estimate section — because all three read the
same `measuremap_work_categories` record. Same for items.

### How the spec maps onto the DB

| Spec entity (§16) | Table | Status |
|---|---|---|
| `work_categories` | `measuremap_work_categories` | **new** |
| `estimate_items` | `measuremap_estimate_items` | **new** (backfilled from `takeoff_items`) |
| `measurements` | `measuremap_measurements` | **extended** (new columns + backfill) |
| `plans` | `measuremap_drawings` | exists |
| `plan_pages` | `measuremap_drawing_pages` | exists |
| `estimate_revisions` | `measuremap_estimate_revisions` | **new** |
| `estimate_item_revision_values` | `measuremap_estimate_item_revision_values` | **new** |
| `activity_logs` | `measuremap_activity_logs` | **new** |

### Enumerated values (as stored)

- `source_type`: `map` | `drawing` *(the codebase already uses `drawing` for plan;
  the UI label is "Plan". Kept as `drawing` to match existing rows.)*
- `measurement_mode`: `free` | `structured`
- `measurement_type`: `area` | `linear` | `perimeter` | `count`
  *(the old Map Measure value `length` is normalised to `linear` in the backfill)*
- `row_type`: `measured` | `manual_quantity` | `lump_sum` | `provisional_sum` |
  `optional` | `heading` | `note` | `subtotal`
- `unit`: `m` | `m2` | `m3` | `ea` | `hr` | `day` | `item` | `lump`
  *(stored compact; the UI renders `m²`, `m³`)*

---

## 2. Quantity & cost calculation (kept in app code, one place)

Measured quantity is **derived**, never stored on the item (so it can never drift
from the measurements). The SQL view `measuremap_item_measured_totals` rolls it up;
the app applies the rest:

```
measured_quantity  = Σ measurements.calculated_quantity   (linked, not deleted)
total_quantity     = quantity_override ?? (measured_quantity + manual_quantity)
adjusted_quantity  = total_quantity × (1 + waste_percent/100)
base_cost          = adjusted_quantity × (material+labour+equipment+subcontract+other rate)
                     (+ lump_sum_amount for lump/provisional rows)
selling_price      = base_cost × (1 + markup_percent/100)
```

- **Manual override (spec §11):** `quantity_override` is `NULL` normally. When the
  estimator overrides, we store it and the UI shows measured vs estimate vs delta.
  The measurement link stays active — override is never silently clobbered when a
  measurement changes.
- **Source breakdown (spec §5, §14):** derived by grouping the item's measurements
  by `source_type` (+ `manual_quantity`) → Map / Plan / Manual / Mixed badge.

---

## 3. Prisma models — APPLY IN PHASE 2 (after the SQL is run)

> ⚠️ Do **not** add these to `schema.prisma` until `002` has been run in Supabase.
> Prisma `create/update` select all scalar columns by default, so adding the model
> fields before the DB has the columns would break the live Map Measure save/delete.

```prisma
model MeasureMapWorkCategory {
  id            String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  project_id    String    @db.Uuid
  owner_user_id Int
  name          String
  description   String?
  sort_order    Int       @default(0)
  created_by    Int?
  created_at    DateTime  @default(now())
  updated_at    DateTime  @updatedAt
  deleted_at    DateTime?

  project       MeasureMapProject       @relation(fields: [project_id], references: [id], onDelete: Cascade)
  estimate_items MeasureMapEstimateItem[]
  measurements  MeasureMapMeasurement[]

  @@index([project_id])
  @@map("measuremap_work_categories")
}

model MeasureMapEstimateItem {
  id                String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  project_id        String    @db.Uuid
  category_id       String?   @db.Uuid
  owner_user_id     Int
  name              String
  description       String?
  unit              String    @default("ea")
  measurement_type  String?
  colour            String    @default("#0369a1")
  row_type          String    @default("measured")
  manual_quantity   Float     @default(0)
  quantity_override Float?
  waste_percent     Float     @default(0)
  material_rate     Float     @default(0)
  labour_rate       Float     @default(0)
  equipment_rate    Float     @default(0)
  subcontract_rate  Float     @default(0)
  other_rate        Float     @default(0)
  lump_sum_amount   Float     @default(0)
  markup_percent    Float     @default(0)
  is_visible        Boolean   @default(true)
  is_locked         Boolean   @default(false)
  sort_order        Int       @default(0)
  created_by        Int?
  created_at        DateTime  @default(now())
  updated_at        DateTime  @updatedAt
  deleted_at        DateTime?

  project      MeasureMapProject       @relation(fields: [project_id], references: [id], onDelete: Cascade)
  category     MeasureMapWorkCategory? @relation(fields: [category_id], references: [id], onDelete: SetNull)
  measurements MeasureMapMeasurement[]

  @@index([project_id])
  @@index([category_id])
  @@map("measuremap_estimate_items")
}

// EXTEND the existing model with these fields (keep takeoff_item_id until 003):
model MeasureMapMeasurement {
  // ...existing fields...
  category_id       String?  @db.Uuid
  estimate_item_id  String?  @db.Uuid
  measurement_mode  String?              // free | structured
  measurement_type  String?              // area | linear | perimeter | count
  name              String?
  description       String?
  colour            String?
  plan_id           String?  @db.Uuid
  plan_page_id      String?  @db.Uuid
  map_reference     String?
  is_visible        Boolean  @default(true)
  created_by        Int?

  category      MeasureMapWorkCategory? @relation(fields: [category_id], references: [id], onDelete: SetNull)
  estimate_item MeasureMapEstimateItem? @relation(fields: [estimate_item_id], references: [id], onDelete: SetNull)
  // + relations to plan / plan_page
}
```

Plus `MeasureMapEstimateRevision`, `MeasureMapEstimateItemRevisionValue`,
`MeasureMapActivityLog` (straight mappings of the new tables).

---

## 4. Two measurement modes (spec §2, §8, §9)

Both Map Measure and Plans & Takeoffs get a **New Measurement / New Takeoff** menu:

- **Free Measure** → pick type → draw → optional name/description → save.
  `measurement_mode='free'`, `estimate_item_id=NULL`. Shows a "Free" badge and its
  source (Map/Plan). Never appears in the Estimate until assigned.
- **Structured Measure** → choose/create category → choose/create item → draw →
  save. `measurement_mode='structured'`, linked to `estimate_item_id`. Flows to the
  Estimate immediately.

A free measurement can later be **assigned** (set category + estimate_item, flip mode
to structured) or **moved** between items/categories (spec §13) — all just updates to
`category_id` / `estimate_item_id` on the measurement row; totals recompute from the
view. Deleting a measurement (spec §12) removes only that row and keeps the item,
rates and costs; if the item has no measurements left the UI shows
"No active measurement source" (the row is not auto-deleted).

---

## 5. Code-rework phases (after you run `002`)

**Phase 2 — data layer & Map Measure cutover** (no visual change)
1. Add the Prisma models above; `prisma generate`; typecheck.
2. New libs: `lib/measuremap/categories.ts`, `estimateItems.ts`; extend
   `measurements.ts`. New API routes under `app/api/measuremap/projects/[id]/categories`,
   `.../items`, `.../measurements` (measurements gain `mode`, `category_id`,
   `estimate_item_id`, `name`, `description`).
3. Repoint the **existing** Map Measure (`MapWorkspace.tsx`) from `takeoff_items` to
   `estimate_items` + the new measurement fields. Add the Free/Structured menu and the
   "By Category / All Measurements" left-panel views (spec §8). Behaviour-preserving:
   existing measures already backfilled as structured items.

**Phase 3 — Plans & Takeoffs engine + page** (the big new build)
- PDF render (pdfjs-dist) + per-page scale calibration writing to
  `measuremap_drawing_pages` (`pixels_per_metre`, `scale_status`) — the schema is
  already there. Draw area/linear/perimeter/count on the plan; quantities via the
  calibrated scale. Same Free/Structured modes; same shared categories/items.
- Then apply the approved P&T page design (blue/white/red skin) over that engine —
  with **real** data and empty states, not the mock's placeholder image/rows.

**Phase 4 — Estimate page** (category sections; measured + manual/lump-sum rows;
source badges; overrides; totals) and **Overview/Reports** reading shared totals
(spec §10, §15), plus `activity_logs` writes on the mutating actions (spec §11–13).

**Phase 5 — retire the old model:** migration `003` drops
`measurements.takeoff_item_id` and `measuremap_takeoff_items`.

---

## 6. Decisions I made (flag if any are wrong)

1. **Additive, not a rename.** `estimate_items` is a new table backfilled from
   `takeoff_items` (same ids), so the live Map Measure keeps working until code cuts
   over. Lower risk than renaming in place.
2. **Kept `source_type='drawing'`** (not `plan`) to match existing rows; UI says "Plan".
3. **`length` → `linear`** normalisation in the shared model.
4. **Measured quantity is derived** (SQL view + app calc), never stored — can't drift.
5. **Colour lives on both** the item (default) and the measurement (per-object), per
   spec §7/§16 which lists colour on measurements.
6. **Revisions/activity tables created now** but wired later (Estimate/Overview phases).

Open question worth your call: **is this still the "MeasureMap" module, or is it
graduating to a top-level "Estimating" product?** I kept the `measuremap_` table
prefix + module namespace (that's where the code, access gate and routes live). If you
want it renamed to `estimating_*` / a new top-level module, that's a larger rename we
should do deliberately, not silently.
