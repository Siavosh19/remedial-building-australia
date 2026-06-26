# Materials & Products Index — Refactor Design (for review)

Status: **DESIGN ONLY — not yet implemented.** Normalisation will live in
`scripts/extract-materials-index.js` (regenerable). No DB; the index is the
generated JSON `lib/materials-index-data.json` consumed by
`app/materials-products-index/`.

Grounded in the live data (2026-06-19 snapshot): 1,245 products · 482 brand
strings (127 noisy) · 1,176 distinct Material Types · 1,564 distinct
"Application" tags · 14 top sections.

---

## 1. Revised schema (data model)

```ts
type SupplyMethod = "Trade supply" | "Hire" | "Fabricated" | "Contractor supply";

interface ProductRow {
  id: string;
  name: string;               // cleaned product name ("— TODO …" stripped)
  brand: string;              // manufacturer name ONLY
  supplyMethod: SupplyMethod; // NEW — split out of brand

  materialCategory: string;   // NEW — controlled vocab (§2), 2–5 words
  materialSubType?: string;   // NEW — finer detail: chemistry / parts / format
  productNotes?: string;      // was `productType` verbose text — tooltip only

  locationTags: string[];     // NEW — controlled (§3a)
  processTags: string[];      // NEW — controlled (§3b)
  propertyTags: string[];     // NEW — controlled (§3c)
  complianceTags: string[];   // NEW (recommended 4th group) — AS/NCC/ISO (§3d)

  pageUrl: string;
  pageName: string;           // NEW — individual repair page name (for filter §4)
  defectSection: string;      // mid-level (e.g. "Balcony Waterproofing")
  systemGroup: string;        // top parent (one of the 5 — §4)
}
```

Rationale for `complianceTags` (4th group): AS-3700 (194), NCC-2022 (38),
ISO-11600 (35), AS-4858 (32), AS-4100 (33), AS-4654 (23) are heavily used and
are compliance attributes, not "applications". Folding them into propertyTags
would muddy filtering. Flagging for your call — can merge into propertyTags if
you prefer exactly 3 groups.

---

## 2. Controlled `materialCategory` vocabulary (~60)

Derived bottom-up from the 1,176 Material Types + the 14 sections. AS naming
applied where it clarifies (e.g. membrane classes per AS 4654 / AS 4858).

**Concrete repair**
Cementitious Repair Mortar · Polymer-Modified Repair Mortar · Epoxy Repair
Mortar · High-Build Repair Mortar · Micro-Concrete · Structural Grout ·
Cement & Aggregate · Fairing / Finishing Coat

**Priming / bonding / corrosion**
Bonding Agent (SBR/Acrylic) · Concrete Primer · Rebar Primer · Epoxy Zinc-Rich
Primer · Corrosion Inhibitor (MCI) · Cathodic Protection Anode

**Cracks / joints / sealants**
Epoxy Injection Resin · PU Injection Resin · Injection Port / Packer ·
PU Sealant · Silicone Sealant · Polysulfide Sealant · Backing Rod / Bond
Breaker · Expansion Joint Cover

**Waterproofing membranes** (AS 4654.1 / AS 4858)
PU Liquid Membrane · Acrylic Liquid Membrane · Cementitious Membrane ·
Torch-On Sheet Membrane · Cold-Applied Sheet Membrane · HDPE/PVC Sheet Membrane ·
TPO/FPO Sheet Membrane · Crystalline Tanking · Vapour Control Layer ·
Root-Resistant Membrane

**Tiling / screeds / drainage**
Tile Adhesive · Tile Adhesive Admix · Tile Grout · Tile Sealant ·
Polymer-Modified Screed · Self-Levelling Screed · Drainage Cell ·
Linear Drain / Grate · Floor Waste / Puddle Flange · Podium Outlet / Scupper ·
Pedestal System · Protection Board · Filter Fabric · Reinforcing Fabric ·
Tapered Insulation · Ballast

**Façade / masonry / structural**
Render · Repointing / Masonry Mortar · Lintel / Steel Section · Crack-Stitching
Bar · Structural Anchor / Dowel · Epoxy Chemical Anchor · CFRP Strip/Laminate ·
CFRP Fabric · Epoxy Laminating Resin · Reinforcement Bar / Mesh · Flashing ·
Cladding Panel · Protective/Anti-Carbonation Coating · Silane/Siloxane Sealer

**Curing / formwork / ancillary**
Curing Compound · Curing Sheeting · Form Release Agent · Formwork Plywood ·
Formwork Timber · Tie Wire / Fixing · Abrasive / Blade / Tool · Ventilation Fan/Vent

> `materialSubType` carries the detail pulled off the verbose type, e.g.
> "3-part, thixotropic", "Class III (AS 4654)", "1C", "fibre-reinforced".

---

## 3. Applications taxonomy (deduplicated, structured)

Routing rule first — these are **removed** from Applications:
- material/chemistry descriptors (Aluminium, Concrete, Masonry, Acrylic, Epoxy,
  PVC, PU, Steel, Colorbond, Stainless-316 …) → `materialCategory` / `materialSubType`
- format notes (1C, Two-coat, Pre-bagged, Hand-applied, Brush-applied,
  Factory-folded) → `materialSubType`
- brand names → `brand`
- standards (AS-/NCC-/ISO-) → `complianceTags`

### 3a. locationTags (controlled)
Balcony · Terrace · Podium · Planter Box · Facade · External Wall · Internal ·
Roof · Roof Deck · Parapet · Soffit · Column / Beam · Basement / Below-Grade ·
Carpark · Wet Area · Coastal · Inland

### 3b. processTags (controlled)
Waterproofing · Surface Preparation · Bonding / Priming · Crack Injection ·
Concrete Repair · Structural Repair · Structural Strengthening ·
Corrosion Protection · Cathodic Protection · Rendering · Repointing ·
Coating · Sealing / Jointing · Tiling · Screeding · Drainage · Curing · Formwork

### 3c. propertyTags (controlled)
Trafficable · Flexible · Non-Combustible · Fire-Rated · UV-Stable · Breathable ·
Water-Based · Paintable · Heritage-Compatible · Self-Levelling · Rapid-Set ·
Chemical-Resistant · Root-Resistant · Movement-Accommodating · Potable-Water-Safe

### 3d. complianceTags (controlled)
AS 4654 (waterproofing — external above-ground) · AS 4858 (wet-area membranes) ·
AS 3600 (concrete structures) · AS 3700 (masonry) · AS 4100 (steel) ·
ISO 11600 (sealants) · AS 1428 (access) · NCC 2022

### Dedup map (examples — full map built in implementation)
```
Stainless / Stainless-steel / SS-316 / 316-SS / 316-Stainless-Steel /
  Grade-316 / Stainless-316 / Stainless-316L      → (material) Stainless Steel 316
304-SS / Grade-304                                 → (material) Stainless Steel 304
UV-resistant / UV-stable                           → propertyTags: UV-Stable
Balcony-terrace / Balcony                          → locationTags: Balcony (+ Terrace)
Non-combustible                                    → propertyTags: Non-Combustible
AS-3700 / AS3700                                   → complianceTags: AS 3700
```

---

## 4. Repair System Page filter

Replace the flat/5-bucket filter with the existing repair-systems hierarchy
(already encoded in `LIBRARY_SYSTEMS` in `MaterialsIndexClient.tsx`):

- **5 parent system groups** as collapsible headers →
- each expands to **mid-level defect sections** (the 14 `topSection`s) →
- each lists the **individual repair page names** (`pageName`) as the actual
  filter options (links to the page).

`systemGroup` + `defectSection` + `pageName` on each row drive this 3-level tree.

---

## 5. Brand → brand + supplyMethod split

127 of 482 brand strings carry non-brand noise. Rules (applied in extractor):
- contains `hire` / `contractor supply` → `supplyMethod: "Hire"` (or "Contractor supply"); strip note
- `fabricated` / `factory-folded` / `custom-formed` / `folded` → `supplyMethod: "Fabricated"`
- everything after ` — ` that is a spec/supply note → drop from brand, keep first real maker
- multi-maker `A / B / C` → keep as-is in brand (genuine alternatives) but trim trailing ` — accessories/supply` note
- default → `supplyMethod: "Trade supply"`

---

## 6. Filter component (deliverable #4) — logic changes

- Multi-group tag filters: 4 independent multi-selects (location / process /
  property / compliance); a row matches if it satisfies the AND across groups,
  OR within a group.
- **Sorting**: clickable asc/desc on Material/Product and Brand.
- **Page size**: default 25; selector 10 / 25 / 50 / 100.
- **Typo**: "All applicationss" → "All applications".
- **Applications column**: render as wrapped tag pills inside the product row
  (location=blue, process=slate, property=green, compliance=amber), not a
  separate horizontally-scrolling column.

---

## 7. Implementation plan (on approval)

1. **Extractor — read `.ts` data files** (34 balcony pages) so all materials are
   captured (fixes the ARDEX E 90 / tile-adhesive drop). Verify count ≥ 1,245.
2. **Extractor — normalisation pipeline**: brand/supplyMethod split → name clean
   → materialCategory + materialSubType classification (keyword→category map +
   per-section default) → tag routing & dedup → pageName/defectSection/systemGroup.
3. Regenerate JSON in the new schema; **report reclassification coverage**
   (% auto-classified, list of unmatched material types for manual review).
4. Update `MaterialsIndexClient.tsx` (schema, 4 tag filters, sorting, page size,
   pills, page-name tree) + `page.tsx` types.
5. Typecheck. (No deploy.)

Open item for your call: keep `complianceTags` as a 4th group, or fold into
propertyTags (brief specified 3 groups).
