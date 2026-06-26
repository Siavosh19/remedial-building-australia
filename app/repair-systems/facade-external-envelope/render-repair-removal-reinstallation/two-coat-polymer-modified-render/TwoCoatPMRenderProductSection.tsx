"use client";

import { useState } from "react";
import {
  BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp,
  CheckCircle, AlertTriangle, XCircle, FileText, ExternalLink,
  ShieldCheck, Phone, Database, Star,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────────
   Two-coat polymer-modified render systems — Product Reference

   CARD DESIGN unchanged (full-width featured card + 2-per-row standard cards,
   brand logos, collapsed accordions, 3D depth). CARD CONTENT rebuilt to the
   spec-card methodology:
     KEY PROPERTIES (measurable specs) · PERFORMANCE HIGHLIGHTS (spec-backed
     differentiators) · CAUTIONS (where NOT to use) · KEY WARNINGS (failure /
     H&S) · ADVANCED TECHNICAL DATA (label·value·source) + a typed selector
     JSON per product (TWO_COAT_PM_RENDER_SELECTORS).

   LINEUP CORRECTED to genuine CURRENT AUSTRALIAN two-coat render systems.
   The previous names were not current AU renders (Sika SikaTop-122 / Fosroc
   Renderoc Classic are concrete-REPAIR mortars; "Rockcote Primus/Finessa"
   are not in the Rockcote catalogue). Every value below is from the cited
   AU manufacturer source; anything not published reads
   "CONFIRM — <field> not stated on <source>". No fabricated numbers.

   SELECTION SCHEMA for this category (KEY PROPERTIES field set):
     system (base+finish) · binder / polymer type · base-coat thickness per
     coat (+ multi-pass max) · finish-coat thickness · coverage / yield ·
     application method (trowel / pump) · inter-coat / recoat time · primer /
     key coat · suitable substrates · pack size · classification (AS 3700 /
     EN 998-1 / fire).
   ────────────────────────────────────────────────────────────────────────── */

const BRAND_RED = "#8B1A1A";

type TechRow = { label: string; value: string; source?: string };

type Product = {
  brand: string;
  brandColor: string;
  brandHome: string;
  logoSrc?: string; // <-- Replace with actual brand logo src from owner assets
  tdsUrl?: string;
  name: string;
  subtitle: string;
  description: string;          // plain-prose, writer-spec
  keyProperties: string[];      // "Label: value" lines (objective specs)
  performanceHighlights: string[];
  cautions: string[];
  keyWarnings: string[];
  advancedTechData: TechRow[];
  standardsTags: string[];
  procurementSources: { name: string; url: string }[];
  note?: string;
  featured?: boolean;
  verified?: boolean;
};

const PRODUCTS: Product[] = [
  /* ── FEATURED — Dulux Acratex RenderWall (genuine AU two-coat render system) ── */
  {
    brand: "Dulux Acratex",
    brandColor: "#C8102E",
    brandHome: "https://www.dulux.com.au/specifier/products/193",
    tdsUrl: "https://www.dulux.com.au/specifier/products/acratex-render/acratex-renderwall-acrabuild-medium/",
    name: "Dulux Acratex RenderWall — Acrabuild base + Acratex texture finish",
    subtitle: "Acrylic polymer-modified cement render — two-coat Acratex facade system",
    description:
      "A two-coat system: a pre-packaged dry-mix cement base render gauged with water and applied by hawk-and-trowel or render pump to level the substrate, then overcoated with an acrylic texture finish that forms the decorative weatherproof surface.\n\nUsed as the render layer of an exterior facade coating specification on absorbent masonry — brick and block. It is a levelling base render for render and re-render work, not a stand-alone weather finish, and supply is limited to certain states; confirm current state availability against current TDS.\n\nThe base render must cure before the texture finish is applied; confirm the recoat and inter-coat period against current TDS. Confirm primer or sealer requirement for the substrate and the compatible texture finish against current TDS. It is not suitable for dense or low-absorption substrates without confirmation.",
    keyProperties: [
      "System: Acrabuild base render + Acratex acrylic texture finish (two-coat)",
      "Binder: acrylic polymer-modified, low-cement dry-mix render",
      "Base thickness: 3–4 mm skim; 4–6 mm single pump pass; up to 12 mm multi-pass",
      "Application: hawk & trowel or render pump",
      "Recoat / overcoat: 7–10 days",
      "Substrates: absorbent masonry — brick and block",
      "Availability: NSW & QLD per Dulux specifier — CONFIRM other states",
      "Coverage / yield: CONFIRM — not stated on the cited Dulux specifier page",
      "Finish-coat thickness & standard: CONFIRM — not stated on the cited Dulux specifier page",
    ],
    performanceHighlights: [
      "Pump-applied up to 12 mm in multiple passes — high build for levelling out-of-true masonry",
      "Single-source Acratex system — base render, texture finish and topcoat from one manufacturer",
      "Acrylic polymer modification for adhesion on absorbent brick/block (per Dulux)",
    ],
    cautions: [
      "Listed for absorbent masonry (brick/block) — confirm suitability/primer for dense or low-absorption substrates (off-form concrete, painted surfaces)",
      "Acrabuild Medium is listed NSW & QLD only — confirm supply elsewhere before specifying",
      "Not a weather finish on its own — must be overcoated with the compatible Acratex texture/topcoat",
    ],
    keyWarnings: [
      "Allow the 7–10 day recoat/cure before overcoating — overcoating green render risks finish failure",
      "Confirm the correct RenderWall variant for the project (Acrabuild Fine/Medium/Coarse, AcraPro P400, or the fire-rated RenderWall FR) and its substrate/fire rating",
      "Confirm primer/sealer and the compatible Acratex finish from the current TDS before specifying",
    ],
    advancedTechData: [
      { label: "Type", value: "Acrylic polymer-modified dry-mix cement render (Acrabuild)", source: "Dulux Acratex RenderWall Acrabuild Medium — dulux.com.au specifier" },
      { label: "Base thickness", value: "3–4 mm skim; 4–6 mm single pump; up to 12 mm multi-pass", source: "Dulux specifier (Acrabuild Medium)" },
      { label: "Recoat / overcoat", value: "7–10 days", source: "Dulux specifier (Acrabuild Medium)" },
      { label: "Application", value: "Hawk & trowel or render pump", source: "Dulux specifier (Acrabuild Medium)" },
      { label: "Substrates", value: "Absorbent masonry (brick, block)", source: "Dulux specifier (Acrabuild Medium)" },
      { label: "Availability", value: "NSW & QLD (per Dulux specifier)", source: "Dulux specifier (Acrabuild Medium)" },
      { label: "Coverage / pack / standard", value: "CONFIRM — not stated on the cited Dulux specifier page" },
    ],
    standardsTags: ["AS 3700", "Acrylic polymer-modified", "Acratex two-coat system"],
    procurementSources: [
      { name: "Dulux Acratex — specifier / technical", url: "https://www.dulux.com.au/specifier/products/193" },
      { name: "Dulux trade stores — national distribution", url: "https://www.dulux.com.au" },
    ],
    featured: true,
    verified: true,
  },

  /* ── Rockcote Quick Render PM100 + Quick Render Fine ── */
  {
    brand: "Rockcote / Saint-Gobain Australia",
    brandColor: "#00529B",
    brandHome: "https://www.rockcote.com.au",
    tdsUrl: "https://rockcote.com.au/wp-content/uploads/2020/09/QuickRender_PM100_TDS_September2020.pdf",
    name: "Rockcote Quick Render PM100 + Quick Render Fine",
    subtitle: "Polymer-modified cement render — base + fine finish, over Keycote",
    description:
      "A two-coat render: a pre-blended polymer-modified cement base render gauged with clean water and applied by hand or machine, followed by a smooth fine finish render applied over it to produce a surface ready for an acrylic texture or paint. A higher-build base grade is available for thicker single passes.\n\nUsed as the render layer over masonry, off-form and precast concrete, and lightweight (EPS/XPS) walling on exterior facades; on lightweight walling it forms part of a mesh-reinforced render build-up rather than a plain trowel render.\n\nSmooth, dense or low-absorption substrates require a key coat before the base render; confirm the key-coat or primer requirement against current TDS. Confirm inter-coat timing between base and finish, and reinforcing mesh embedment where used, against current TDS. It is not suitable for substrates with active cracking or rising damp until those are addressed.",
    keyProperties: [
      "System: Quick Render PM100 base + Quick Render Fine finish (over Keycote / High-Adhesion Primer)",
      "Binder: polymer-modified cement render — minimal drying shrinkage",
      "Base thickness: up to ~10 mm per coat (PM100); High Build 5–30 mm single pass",
      "Coverage: ~1.3 m² per 12 kg bag @ 10 mm (PM100 High Build)",
      "Application: hand trowel or machine pump",
      "Key coat: Rockcote Keycote / High-Adhesion Primer on smooth/low-absorption substrates",
      "Substrates: masonry, off-form/precast concrete, EPS/XPS (RRR system)",
      "Finish-coat thickness / set / recoat / pack: CONFIRM — not extractable from the cited TDS PDF",
      "Standard (AS/EN): CONFIRM — not stated on the cited source",
    ],
    performanceHighlights: [
      "Minimal drying shrinkage — reliable base for acrylic texture/paint over-coating (per Rockcote)",
      "High Build grade builds 5–30 mm in a single pass for levelling",
      "System-compatible from key coat (Keycote) → base (PM100) → fine finish from one manufacturer",
    ],
    cautions: [
      "Smooth, dense or low-absorption substrates require the Keycote / High-Adhesion Primer key coat first",
      "Not for substrates with active cracking or rising damp — address defects before rendering",
      "Confirm maximum coat thickness (~10 mm for PM100) and over-coat timing from the current TDS",
    ],
    keyWarnings: [
      "EPS/XPS use is part of the Rockcote Reinforced Render (RRR) system — reinforcing mesh must be fully embedded",
      "Confirm the correct grade (PM100 vs PM100 High Build) and current AU availability with Rockcote",
      "Do not apply in direct sun, high wind, or when rain is expected within 24 h",
    ],
    advancedTechData: [
      { label: "Type", value: "Polymer-modified cement render — minimal drying shrinkage", source: "Rockcote Quick Render PM100 TDS (rockcote.com.au)" },
      { label: "Base thickness", value: "Up to ~10 mm/coat; High Build 5–30 mm single pass", source: "Rockcote Quick Render PM100 / PM100 High Build TDS" },
      { label: "Coverage", value: "~1.3 m² per 12 kg bag @ 10 mm (High Build)", source: "Rockcote PM100 High Build TDS" },
      { label: "Application", value: "Hand trowel or machine pump", source: "Rockcote Quick Render PM100 TDS" },
      { label: "Key coat", value: "Keycote / High-Adhesion Primer on smooth substrates", source: "Rockcote render system documentation" },
      { label: "Finish / set / recoat / pack / standard", value: "CONFIRM — not extractable from the cited TDS PDF" },
    ],
    standardsTags: ["AS 3700", "Polymer-modified", "Machine applicable", "Minimal shrinkage"],
    procurementSources: [
      { name: "Rockcote / Saint-Gobain — trade supply", url: "https://www.rockcote.com.au" },
      { name: "Rockcote trade distributors — contact Rockcote for nearest", url: "https://www.rockcote.com.au" },
    ],
  },

  /* ── Mapei Nivoplan (real Mapei render/levelling mortar — AU availability to confirm) ── */
  {
    brand: "Mapei",
    brandColor: "#0067B1",
    brandHome: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions/lines/renders-and-installation-mortars",
    name: "Mapei Nivoplan — levelling render mortar (+ Mapei finish coat)",
    subtitle: "Cement-based levelling render — EN 998-1 GP, category CS IV",
    description:
      "A cement-based levelling render gauged with water and applied by trowel or rendering machine to true up and render vertical surfaces, then finished with a compatible skim or coating to complete the two-coat build.\n\nUsed to render and level out-of-plumb or rough masonry and concrete walls, interior and exterior, including as preparation before tiling or coating.\n\nConfirm current Australian availability against current TDS, as the product is listed in international rather than Australian documentation. Confirm primer requirement on smooth or low-absorption substrates, the compatible finish coat, and inter-coat timing against current TDS. It is not a structural repair mortar and the substrate must be sound before rendering.",
    keyProperties: [
      "Type: GP cement-based levelling render (cement + aggregates + synthetic resins)",
      "Classification: EN 998-1 GP, category CS IV",
      "Thickness: 2–20 mm per application",
      "Consumption: ~1.4 kg/m² per mm of thickness",
      "Workability: ~2–3 hours",
      "Pack: 25 kg bags; colours grey / white",
      "Application: trowel or rendering machine",
      "AU availability & matching finish coat: CONFIRM — no dedicated Mapei AU page found; confirm with Mapei Australia",
    ],
    performanceHighlights: [
      "Builds 2–20 mm in a single application for levelling out-of-plumb walls",
      "Interior and exterior use — trowel or spray-machine applied",
      "EN 998-1 GP (CS IV) classified general-purpose render",
    ],
    cautions: [
      "Confirm current Australian availability — Nivoplan appears in Mapei international catalogues; no dedicated AU page found",
      "Confirm primer requirement on smooth or low-absorption substrates",
      "Not a structural repair mortar — substrate must be sound before rendering",
    ],
    keyWarnings: [
      "Do not rely on EU/international Nivoplan figures for an AU specification — confirm AU TDS values with Mapei Australia",
      "Confirm the compatible Mapei finish/skim and topcoat for the two-coat system",
      "Confirm minimum/maximum thickness per pass and inter-coat timing from the AU TDS",
    ],
    advancedTechData: [
      { label: "Type", value: "Cement-based levelling render (cement, aggregates, synthetic resins)", source: "Mapei Nivoplan TDS (mapei.com)" },
      { label: "Classification", value: "EN 998-1 GP, category CS IV", source: "Mapei Nivoplan TDS" },
      { label: "Thickness", value: "2–20 mm per application", source: "Mapei Nivoplan TDS" },
      { label: "Consumption", value: "~1.4 kg/m² per mm of thickness", source: "Mapei Nivoplan TDS" },
      { label: "Workability", value: "~2–3 hours", source: "Mapei Nivoplan TDS" },
      { label: "Pack", value: "25 kg bags (grey / white)", source: "Mapei Nivoplan TDS" },
      { label: "AU availability / finish coat", value: "CONFIRM — confirm with Mapei Australia (no dedicated AU page found)" },
    ],
    standardsTags: ["EN 998-1 GP", "Category CS IV", "Cement render"],
    procurementSources: [
      { name: "Mapei Australia — trade supply / technical", url: "https://www.mapei.com/au" },
      { name: "Bayset — national distribution", url: "https://www.bayset.com.au" },
    ],
    note: "Nivoplan is the genuine Mapei levelling-render product (the earlier 'Planitop XS' is a structural repair mortar, not a render). Confirm current AU availability with Mapei Australia.",
  },

  /* ── Sto Australia — StoLevell base + Sto finish ── */
  {
    brand: "Sto Australia",
    brandColor: "#E2001A",
    brandHome: "https://www.stoaustralia.com.au",
    tdsUrl: "https://www.stoaustralia.com.au/08_detail_finder/tds-msds.php",
    name: "Sto Render System — StoLevell base + Sto finishing render",
    subtitle: "Mesh-reinforced mineral/cement base render + Sto facade finish",
    description:
      "A two-coat reinforced render: a cement-based base render applied with glass-fibre reinforcing mesh fully embedded, then overcoated with a finishing render that forms the facade surface.\n\nUsed as a render-only or reinforced-render facade system over masonry, concrete and autoclaved aerated concrete panel construction.\n\nThis is a mesh-reinforced system rather than a plain trowel render, and the mesh must be fully embedded in the base coat. Confirm the specific base render for the substrate, the base and finish coat application, the primer or bonding requirement, and the compatible finish against current TDS.",
    keyProperties: [
      "System: StoLevell reinforcing base render + Sto finishing render (e.g. Stolit) — two-coat",
      "Binder: cement-based mineral base render (StoLevell)",
      "Reinforcement: Sto glass-fibre mesh embedded in the base coat",
      "Substrates: masonry, concrete, AAC panel (StoRend / Sto-Poren panel systems)",
      "Range: StoLevell Uni / Novo (base) — confirm the specified product",
      "Base/finish thickness, consumption, pack, standard: CONFIRM — not extractable from the cited Sto PDF; confirm from the Sto Australia TDS portal",
    ],
    performanceHighlights: [
      "Mesh-reinforced base render distributes stress and resists cracking (Sto reinforced-render systems)",
      "Complete single-source facade system — base, mesh and finish from Sto",
      "Dedicated AAC-panel render system available (Sto-Poren panel)",
    ],
    cautions: [
      "Confirm the correct StoLevell base for the substrate (Uni vs Novo)",
      "Reinforcing mesh embedment is integral — not a plain two-coat trowel render",
      "Confirm primer/bonding requirement for the substrate",
    ],
    keyWarnings: [
      "Specify from the current Sto Australia TDS — numeric data could not be extracted from the published PDF and must be confirmed",
      "Mesh must be fully embedded in the base coat per Sto system requirements",
      "Confirm the compatible Sto finish and its exposure/fire rating for the project",
    ],
    advancedTechData: [
      { label: "Type", value: "Mesh-reinforced cement/mineral base render + Sto finish", source: "Sto Australia (StoRend render systems / TDS portal)" },
      { label: "Reinforcement", value: "Sto glass-fibre mesh embedded in base coat", source: "Sto Australia reinforced-render systems" },
      { label: "Substrates", value: "Masonry, concrete, AAC panel", source: "Sto Australia (StoRend / Sto-Poren panel)" },
      { label: "Base product", value: "StoLevell Uni / Novo — confirm the specified product", source: "Sto Australia TDS portal" },
      { label: "Thickness / consumption / pack / standard", value: "CONFIRM — not extractable from the cited Sto PDF" },
    ],
    standardsTags: ["Reinforced render", "Mineral base", "Sto system"],
    procurementSources: [
      { name: "Sto Australia — technical / TDS portal", url: "https://www.stoaustralia.com.au/08_detail_finder/tds-msds.php" },
      { name: "Sto Australia — render systems", url: "https://www.stoaustralia.com.au/03_building/22_finishes/stolit-finishes.php" },
    ],
  },

  /* ── Boral Uni-Render ── */
  {
    brand: "Boral",
    brandColor: "#003087",
    brandHome: "https://www.boral.com.au",
    tdsUrl: "https://www.boral.com.au/product-brochure/uni-render-product-data-sheet",
    name: "Boral Uni-Render",
    subtitle: "Polymer-modified cement render — base render for masonry & concrete",
    description:
      "A polymer-modified cement base render gauged with water and applied by trowel or render pump as a levelling render, then overcoated with a compatible texture coating or paint system to complete the facade.\n\nUsed as a render over masonry and concrete substrates on residential and commercial facades.\n\nConfirm primer requirement on smooth or low-absorption substrates, minimum coat count, inter-coat timing and the compatible finish system against current TDS. It is not suitable for substrates with active cracking or rising damp until those are addressed.",
    keyProperties: [
      "Type: polymer-modified cement render (base/levelling render) — Boral",
      "Application: trowel or render pump",
      "Substrates: masonry and concrete",
      "Finish: overcoat with a compatible texture/paint system",
      "Thickness, coverage, water demand, recoat, pack, standard: CONFIRM — not extractable from the cited Boral PDS",
    ],
    performanceHighlights: [
      "Australian-manufactured polymer-modified render with a published Boral PDS",
      "Trowel- or pump-applied — residential and commercial facade render",
      "Further differentiators: CONFIRM against the Boral Uni-Render PDS (numeric data not extractable here)",
    ],
    cautions: [
      "Not for substrates with active cracking or rising damp — address defects first",
      "Confirm primer requirement on smooth or low-absorption substrates",
      "Confirm coastal / exposure suitability with Boral",
    ],
    keyWarnings: [
      "Specify from the current Boral Uni-Render PDS — key numeric data could not be extracted from the published PDF and must be confirmed",
      "Confirm the compatible finish/topcoat system for the two-coat build",
      "Confirm minimum coat thickness and recoat timing before overcoating",
    ],
    advancedTechData: [
      { label: "Type", value: "Polymer-modified cement render (base/levelling)", source: "Boral Uni-Render PDS (boral.com.au)" },
      { label: "Application", value: "Trowel or render pump", source: "Boral Uni-Render PDS" },
      { label: "Substrates", value: "Masonry and concrete", source: "Boral Uni-Render PDS" },
      { label: "Thickness / coverage / water / recoat / pack / standard", value: "CONFIRM — not extractable from the cited Boral PDS" },
    ],
    standardsTags: ["AS 3700", "Polymer-modified", "Australian made"],
    procurementSources: [
      { name: "Boral — product information / PDS", url: "https://www.boral.com.au/product-brochure/uni-render-product-data-sheet" },
      { name: "Boral trade — national distribution", url: "https://www.boral.com.au" },
    ],
  },
];

/* Typed selector variables for the downstream system selector. */
export const TWO_COAT_PM_RENDER_SELECTORS = [
  { product_id: "dulux_acratex_renderwall_acrabuild", category: "two-coat-polymer-modified-render", base_product: "Acratex RenderWall Acrabuild", finish_product: "Acratex acrylic texture", polymer_type: "acrylic", coat_count: "two_coat", base_thickness_mm: { skim: [3, 4], single_pump: [4, 6], multi_max: 12 }, recoat_days: [7, 10], machine_applicable: true, substrate: ["brick", "block"], availability_states: ["NSW", "QLD"], coverage: null, standard: null, au_distributor: "Dulux Australia", source_tds_url: "https://www.dulux.com.au/specifier/products/acratex-render/acratex-renderwall-acrabuild-medium/", confidence: "confirmed" },
  { product_id: "rockcote_quick_render_pm100", category: "two-coat-polymer-modified-render", base_product: "Quick Render PM100", finish_product: "Quick Render Fine", polymer_type: "polymer_modified_cement", coat_count: "two_coat", base_thickness_mm: { per_coat_max: 10, high_build: [5, 30] }, coverage_m2_per_12kg_at_10mm: 1.3, key_coat: "Keycote / High-Adhesion Primer", machine_applicable: true, substrate: ["masonry", "concrete", "EPS", "XPS"], finish_thickness_mm: null, standard: null, au_distributor: "Rockcote / Saint-Gobain Australia", source_tds_url: "https://rockcote.com.au/wp-content/uploads/2020/09/QuickRender_PM100_TDS_September2020.pdf", confidence: "confirmed" },
  { product_id: "mapei_nivoplan", category: "two-coat-polymer-modified-render", base_product: "Nivoplan", finish_product: null, polymer_type: "cement_synthetic_resin", coat_count: "two_coat", classification: "EN_998-1_GP_CS_IV", thickness_mm: [2, 20], consumption_kg_m2_per_mm: 1.4, workability_hours: [2, 3], pack_kg: 25, machine_applicable: true, au_availability: "confirm", au_distributor: "Mapei Australia", source_tds_url: "https://www.mapei.com/au/en/products-and-solutions/lines/renders-and-installation-mortars", confidence: "needs_confirmation" },
  { product_id: "sto_render_system", category: "two-coat-polymer-modified-render", base_product: "StoLevell (Uni / Novo)", finish_product: "Sto finishing render (e.g. Stolit)", polymer_type: "mineral_cement", coat_count: "two_coat", reinforcement: "glass_fibre_mesh", substrate: ["masonry", "concrete", "AAC"], thickness_mm: null, consumption: null, standard: null, au_distributor: "Sto Australia", source_tds_url: "https://www.stoaustralia.com.au/08_detail_finder/tds-msds.php", confidence: "needs_confirmation" },
  { product_id: "boral_uni_render", category: "two-coat-polymer-modified-render", base_product: "Uni-Render", finish_product: null, polymer_type: "polymer_modified_cement", coat_count: "two_coat", machine_applicable: true, substrate: ["masonry", "concrete"], thickness_mm: null, coverage: null, standard: null, au_distributor: "Boral", source_tds_url: "https://www.boral.com.au/product-brochure/uni-render-product-data-sheet", confidence: "needs_confirmation" },
];

/* ── System comparison (base/finish thickness columns) ── */
const SYSTEM_COMPARISON: {
  product: string; brand: string; baseCoat: string; finishCoat: string;
  polymerType: string; baseThickness: string; finishThickness: string;
  machine: string; primer: string; coastal: string; primaryUse: string;
}[] = [
  {
    product: "Acratex RenderWall (Acrabuild)",
    brand: "Dulux Acratex",
    baseCoat: "Acrabuild base render",
    finishCoat: "Acratex acrylic texture",
    polymerType: "Acrylic polymer-modified",
    baseThickness: "3–4 mm skim; up to 12 mm multi-pass",
    finishThickness: "Confirm Acratex finish TDS",
    machine: "Yes — trowel or pump",
    primer: "Confirm sealer per substrate",
    coastal: "Confirm with Dulux",
    primaryUse: "Levelling render + texture on brick/block (NSW & QLD)",
  },
  {
    product: "Quick Render PM100 + Fine",
    brand: "Rockcote / Saint-Gobain",
    baseCoat: "Quick Render PM100",
    finishCoat: "Quick Render Fine",
    polymerType: "Polymer-modified cement",
    baseThickness: "≈10 mm/coat (HB 5–30 mm)",
    finishThickness: "Confirm with Rockcote TDS",
    machine: "Yes — hand or machine",
    primer: "Keycote on smooth substrates",
    coastal: "Confirm with Rockcote",
    primaryUse: "Render over masonry, concrete, EPS/XPS",
  },
  {
    product: "Nivoplan (+ Mapei finish)",
    brand: "Mapei",
    baseCoat: "Nivoplan levelling render",
    finishCoat: "Confirm Mapei finish coat",
    polymerType: "Cement + synthetic resin (GP)",
    baseThickness: "2–20 mm per application",
    finishThickness: "Confirm with Mapei AU",
    machine: "Yes — trowel or machine",
    primer: "Confirm primer",
    coastal: "Confirm with Mapei AU",
    primaryUse: "Levelling render int/ext — confirm AU availability",
  },
  {
    product: "Sto Render System",
    brand: "Sto Australia",
    baseCoat: "StoLevell base (mesh)",
    finishCoat: "Sto finish (e.g. Stolit)",
    polymerType: "Mineral/cement, mesh-reinforced",
    baseThickness: "Confirm with Sto TDS",
    finishThickness: "Confirm with Sto TDS",
    machine: "Confirm with Sto",
    primer: "Confirm bonding/primer",
    coastal: "Confirm with Sto",
    primaryUse: "Reinforced render — masonry, concrete, AAC",
  },
  {
    product: "Uni-Render",
    brand: "Boral",
    baseCoat: "Uni-Render base",
    finishCoat: "Confirm finish/texture",
    polymerType: "Polymer-modified cement",
    baseThickness: "Confirm with Boral PDS",
    finishThickness: "Confirm with Boral PDS",
    machine: "Yes — trowel or pump",
    primer: "Confirm primer",
    coastal: "Confirm with Boral",
    primaryUse: "Render over masonry and concrete",
  },
];

/* ── System Technical Reference content (category-level) ── */
const TECH_INFO = {
  applications: [
    "Full render removal and replacement on concrete and masonry facades — Class 2 strata apartment buildings and commercial buildings",
    "Large-area patch render where isolated render panels have failed",
    "Re-render over substrate repairs (spalling, delamination, carbonation repair) once structural mortar has cured",
    "Render over new or replacement masonry — brickwork, blockwork, AAC (Hebel)",
    "Levelling out-of-true masonry before a texture or paint finish system",
  ],
  substratesSuitable: [
    "Concrete — formed and off-form (confirm key coat/primer)",
    "Clay brick masonry",
    "Concrete masonry block",
    "AAC (Hebel) — confirm AAC-specific system (e.g. Sto-Poren panel)",
    "Cement render over masonry (re-coat)",
    "EPS / XPS walling — only within a reinforced-render (mesh) system",
  ],
  substratesNotSuitable: [
    "Direct application over existing paint or coating without mechanical removal or a compatible bonding primer",
    "Active cracking — cracks wider than hairline must be cut and filled before rendering",
    "Rising-damp-affected substrate — treat rising damp first",
    "Substrates with efflorescence or salt contamination — treat with salt retardant and saline primer first",
  ],
  selectionCriteria: [
    "Base-coat adhesion / key coat — confirm whether a key coat or bonding primer (e.g. Rockcote Keycote) is required for the substrate",
    "Polymer type — acrylic vs polymer-modified cement vs mineral/mesh-reinforced — impacts adhesion, flexibility and the finish system",
    "Coat thickness range — confirm minimum and maximum per coat and the multi-pass build limit",
    "Inter-coat / recoat timing — minimum time before the finish coat or topcoat",
    "Coastal / salt exposure — confirm suitability for projects within 1 km of coastline",
    "Topcoat compatibility — confirm the compatible texture or paint finish from the same manufacturer where possible",
    "Machine vs hand application — confirm pumpability if machine application is intended",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — render application requirements",
    "EN 998-1 — render/plaster mortar classification (GP / CS class) referenced on some products",
    "NCC Section B — Structure; AS 1530.1 where a non-combustible/fire-rated render is required",
    "Manufacturer TDS takes precedence for product-specific requirements",
  ],
  selectorFields: [
    "substrate_type: concrete | masonry | AAC | brick | block | EPS_XPS",
    "application: full_rerend | patch_render | render_over_repair | levelling",
    "exposure_class: internal | sheltered | moderate | severe | coastal",
    "coat_count: two_coat",
    "polymer_type: acrylic | polymer_modified_cement | mineral_mesh_reinforced",
    "machine_applicable: yes | confirm",
    "topcoat_required: yes",
    "key_coat_required: confirm_per_substrate",
    "fire_rated_variant: confirm_per_product",
  ],
};

/* ════════════════════════════ UI PRIMITIVES ════════════════════════════ */

// Brand logo: <img> slot with a styled brand-colour badge fallback.
// Hotlinked manufacturer logo files are unreliable in production (hotlink
// protection / broken images), so the badge is the default render.
function BrandLogo({ brand, color, logoSrc, home }: { brand: string; color: string; logoSrc?: string; home: string }) {
  return (
    <a href={home} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center" aria-label={`${brand} website`}>
      {/* Replace with actual brand logo src from owner assets */}
      {logoSrc ? (
        <img src={logoSrc} alt={`${brand} logo`} style={{ height: 32, width: "auto" }} className="block" />
      ) : (
        <span
          className="inline-flex items-center rounded-md px-3 text-[13px] font-extrabold uppercase tracking-wide text-white"
          style={{ height: 32, backgroundColor: color }}
        >
          {brand.split(" / ")[0].split(" ")[0]}
        </span>
      )}
    </a>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-sky-950 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
      {label}
    </span>
  );
}

type Tone = "blue" | "green" | "amber" | "red" | "slate";
const TONE: Record<Tone, { head: string; border: string }> = {
  blue: { head: "text-sky-700", border: "border-sky-100" },
  green: { head: "text-emerald-700", border: "border-emerald-100" },
  amber: { head: "text-amber-700", border: "border-amber-100" },
  red: { head: "text-red-700", border: "border-red-100" },
  slate: { head: "text-slate-600", border: "border-slate-100" },
};

function Accordion({
  title, tone, icon, defaultOpen = false, children,
}: {
  title: string; tone: Tone; icon: React.ReactNode; defaultOpen?: boolean; children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`rounded-xl border ${TONE[tone].border} bg-white`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-4 py-2 text-left"
      >
        <span className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider ${TONE[tone].head}`}>
          {icon} {title}
        </span>
        {open ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

const isConfirm = (s: string) => /CONFIRM/i.test(s);

/* KEY PROPERTIES — "Label: value" lines, label bold, CONFIRM values amber */
function KeyPropList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((it, i) => {
        const idx = it.indexOf(": ");
        const label = idx > 0 ? it.slice(0, idx) : "";
        const val = idx > 0 ? it.slice(idx + 2) : it;
        return (
          <li key={i} className="flex items-start gap-2 text-xs leading-5">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sky-900" />
            <span className="text-slate-600">
              {label && <span className="font-bold text-sky-950">{label}: </span>}
              <span className={isConfirm(val) ? "font-semibold text-amber-700" : ""}>{val}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/* Highlights / Cautions / Warnings */
function PropList({ items, kind }: { items: string[]; kind: "check" | "x" | "warn" }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className={`flex items-start gap-2 text-xs leading-5 ${isConfirm(item) ? "text-amber-700" : "text-slate-600"}`}>
          {kind === "check" && <CheckCircle size={12} className="mt-0.5 shrink-0 text-emerald-600" />}
          {kind === "x" && <XCircle size={12} className="mt-0.5 shrink-0 text-amber-500" />}
          {kind === "warn" && <AlertTriangle size={12} className="mt-0.5 shrink-0 text-red-500" />}
          {item}
        </li>
      ))}
    </ul>
  );
}

/* ADVANCED TECHNICAL DATA — label · value · source */
function AdvancedData({ rows }: { rows: TechRow[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-100">
      <table className="w-full text-[11px]">
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={i % 2 ? "bg-slate-50" : "bg-white"}>
              <td className="w-2/5 px-3 py-1.5 align-top font-semibold text-slate-700">{r.label}</td>
              <td className="px-3 py-1.5 align-top">
                <span className={isConfirm(r.value) ? "font-semibold text-amber-700" : "text-slate-600"}>{r.value}</span>
                {r.source && <span className="mt-0.5 block text-[9px] italic text-slate-400">Source: {r.source}</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SourceList({ sources }: { sources: { name: string; url: string }[] }) {
  return (
    <div className="space-y-1.5">
      {sources.map((s) => (
        <a
          key={s.name}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
        >
          {s.name} <ExternalLink size={9} className="text-slate-300" />
        </a>
      ))}
    </div>
  );
}

/* System-description toggle — collapsed by default so the card stays compact. */
function DescriptionToggle({ text, note }: { text: string; note?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-sky-100 bg-white">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-4 py-2 text-left"
      >
        <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-sky-700">
          <BookOpen size={12} /> {open ? "Hide system description" : "Show system description"}
        </span>
        {open ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
      </button>
      {open && (
        <div className="px-4 pb-4">
          <p className="whitespace-pre-line text-sm leading-6 text-slate-700">{text}</p>
          {note && (
            <div className="mt-3 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-900">
              <AlertTriangle size={13} className="mt-0.5 shrink-0 text-amber-500" />
              {note}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* Shared card body — description + 4 spec panels + Advanced Technical Data +
   Procurement, all collapsed behind toggles. Collapsed card shows only the
   tag pills + toggle rows so every card reads as a compact, equal panel. */
function CardBody({ product }: { product: Product }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        {product.standardsTags.map((t) => <Tag key={t} label={t} />)}
      </div>

      <div className="mt-3 space-y-1.5">
        <DescriptionToggle text={product.description} note={product.note} />
        <Accordion title="Key Properties" tone="blue" icon={<Ruler size={12} />}>
          <KeyPropList items={product.keyProperties} />
        </Accordion>
        <Accordion title="Performance Highlights" tone="green" icon={<CheckCircle size={12} />}>
          <PropList items={product.performanceHighlights} kind="check" />
        </Accordion>
        <Accordion title="Cautions" tone="amber" icon={<XCircle size={12} />}>
          <PropList items={product.cautions} kind="x" />
        </Accordion>
        <Accordion title="Key Warnings" tone="red" icon={<AlertTriangle size={12} />}>
          <PropList items={product.keyWarnings} kind="warn" />
        </Accordion>
        <Accordion title="Advanced Technical Data" tone="slate" icon={<Database size={12} />}>
          <AdvancedData rows={product.advancedTechData} />
        </Accordion>
        <Accordion title="Procurement Sources" tone="slate" icon={<FileText size={12} />}>
          <SourceList sources={product.procurementSources} />
          <p className="mt-2 text-[10px] italic text-slate-400">
            Confirm suitability with the current manufacturer TDS before specifying or applying.
          </p>
        </Accordion>
      </div>
    </>
  );
}

/* Card header: logo + brand chip + TDS/brand links */
function CardHeader({ product }: { product: Product }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-3">
        <BrandLogo brand={product.brand} color={product.brandColor} logoSrc={product.logoSrc} home={product.brandHome} />
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{product.brand}</span>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        {product.tdsUrl && (
          <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
            <FileText size={9} /> TDS
          </a>
        )}
        <a href={product.brandHome} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
          <ExternalLink size={9} /> Brand Site
        </a>
      </div>
    </div>
  );
}

function FeaturedCard({ product }: { product: Product }) {
  return (
    <div
      className="rba-featured-card relative col-span-1 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2 lg:p-8"
      style={{ borderLeft: `4px solid ${BRAND_RED}` }}
    >
      {/* RBA Choice — bold badge, top-left */}
      <span
        className="mb-4 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-sm"
        style={{ backgroundColor: BRAND_RED }}
      >
        <Star size={13} className="fill-current" /> RBA Choice
      </span>

      <CardHeader product={product} />

      <h3 className="mt-4 font-serif text-2xl font-extrabold leading-snug text-sky-950">{product.name}</h3>
      <p className="mt-1 text-sm font-semibold text-red-800">{product.subtitle}</p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {product.verified && (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] font-bold text-green-800">
            <ShieldCheck size={11} /> Data verified against current TDS
          </span>
        )}
      </div>

      <div className="mt-5">
        <CardBody product={product} />
      </div>

      {/* Technical Enquiries — no sales language, no CTA button */}
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-1 border-t border-slate-100 pt-4 text-xs text-slate-500">
        <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-slate-400">
          <Phone size={12} /> Technical Enquiries
        </span>
        {/* Replace name and phone with owner technical contact details */}
        <span className="font-semibold text-slate-700">Remedial Building Australia — Technical</span>
        <span className="text-slate-500">[Owner to insert direct contact phone]</span>
      </div>
    </div>
  );
}

function StandardCard({ product }: { product: Product }) {
  return (
    <div className="rba-product-card flex flex-col rounded-2xl border border-slate-200 bg-white p-6">
      <CardHeader product={product} />
      <h3 className="mt-4 font-serif text-lg font-extrabold leading-snug text-sky-950">{product.name}</h3>
      <p className="mt-1 text-sm font-semibold text-red-800">{product.subtitle}</p>
      <div className="mt-4">
        <CardBody product={product} />
      </div>
      <p className="mt-4 border-t border-slate-100 pt-3 text-[10px] italic text-slate-400">
        Confirm data against current TDS.
      </p>
    </div>
  );
}

/* ════════════════════════════ SECTIONS ════════════════════════════ */

export function TwoCoatPMRenderIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="font-serif text-lg font-extrabold text-sky-950">
          What are two-coat polymer-modified render systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Two-coat polymer-modified render systems consist of a cement-based scratch/base coat and a finer finish coat, both incorporating polymer admixtures — typically acrylic, SBR (styrene-butadiene rubber), or vinyl-acetate polymer dispersions — to improve adhesion, flexibility, impact resistance, and durability compared to traditional sand-cement mixes. They are applied in sequence: a thicker scratch coat first (typically 8–15 mm) to establish level, fill substrate irregularities, and create a mechanical key, followed by a finer finish coat (typically 3–6 mm) once the base coat has reached initial set (minimum 24 hours — confirm from TDS).
        </p>
        <p>
          In remedial building on Australian Class 2 strata, two-coat PM render systems are the standard specification for full render removal and replacement on concrete, masonry, clay brick, and AAC (autoclaved aerated concrete) substrates. They are also used for large-area patch rendering where isolated panels of failed render are removed and the substrate is re-rendered to match the existing profile before painting or texture coating.
        </p>
        <p>
          Key selection criteria include: polymer type and content, bond strength to the specific substrate, shrinkage characteristics, minimum and maximum coat thicknesses, inter-coat timing, compatibility with the proposed topcoat or texture system, resistance to coastal salt exposure, and whether a bonding primer or slurry coat is required before the scratch coat.
        </p>
      </div>
    </div>
  );
}

function TechCard({ icon, title, items, style }: { icon: React.ReactNode; title: string; items: string[]; style: "bullet" | "check" | "warn" }) {
  return (
    <div className="rba-sys-ref-panel rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-white">{icon}</div>
        <h3 className="text-sm font-extrabold text-sky-950">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-xs leading-5 text-slate-600">
            {style === "check" && <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-600" />}
            {style === "warn" && <AlertTriangle size={12} className="mt-0.5 shrink-0 text-amber-500" />}
            {style === "bullet" && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TwoCoatPMRenderProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const featured = PRODUCTS.find((p) => p.featured)!;
  const standard = PRODUCTS.filter((p) => !p.featured);

  return (
    <>
      {/* ── System Technical Reference (collapsed) ── */}
      <div
        className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
        // System selector data fields — structured attributes for future selector use
        data-substrate-type="concrete|masonry|AAC|brick|block|EPS_XPS"
        data-application="full_rerend|patch_render|render_over_repair|levelling"
        data-exposure-class="internal|sheltered|moderate|severe|coastal"
        data-coat-count="two_coat"
        data-polymer-type="acrylic|polymer_modified_cement|mineral_mesh_reinforced"
        data-machine-applicable="yes|confirm"
        data-topcoat-required="yes"
        data-key-coat-required="confirm_per_substrate"
        data-fire-rated-variant="confirm_per_product"
      >
        <button
          type="button"
          onClick={() => setAccordionOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50"
        >
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">
              Applications, selection criteria, limitations, standards, suitable substrates and system selector data
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? (<>Hide detail <ChevronUp size={14} /></>) : (<>Show detail <ChevronDown size={14} /></>)}
          </div>
        </button>
        {accordionOpen && (
          <div className="border-t border-slate-100 px-7 pb-7 pt-6">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <TechCard icon={<Layers size={15} />} title="Applications" items={TECH_INFO.applications} style="bullet" />
              <TechCard icon={<SquareStack size={15} />} title="Substrate Types Suitable" items={TECH_INFO.substratesSuitable} style="check" />
              <TechCard icon={<AlertTriangle size={15} />} title="Substrates NOT Suitable" items={TECH_INFO.substratesNotSuitable} style="warn" />
              <TechCard icon={<Ruler size={15} />} title="Key Selection Criteria for Engineers" items={TECH_INFO.selectionCriteria} style="check" />
              <TechCard icon={<BookOpen size={15} />} title="Australian Standards Referenced" items={TECH_INFO.standardsNotes} style="bullet" />
              <TechCard icon={<Database size={15} />} title="System Selector Data Fields" items={TECH_INFO.selectorFields} style="bullet" />
            </div>
          </div>
        )}
      </div>

      {/* ── Product Reference ── */}
      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full" style={{ backgroundColor: BRAND_RED }} />
          <div>
            <h2 className="font-serif text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">
              Genuine current Australian two-coat render systems — one card per row, two per row on desktop, all visible (no carousel). Each card: Key Properties · Performance Highlights · Cautions · Key Warnings · Advanced Technical Data.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <FeaturedCard product={featured} />
          {standard.map((p) => <StandardCard key={p.name} product={p} />)}
        </div>
      </div>

      {/* ── System Comparison ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full" style={{ backgroundColor: BRAND_RED }} />
          <div>
            <h2 className="font-serif text-2xl font-extrabold text-sky-950">System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of two-coat polymer-modified render systems — confirm all product selections against the current manufacturer TDS before specifying.
            </p>
            <p className="mt-1 text-xs font-semibold text-slate-400">Scroll the table sideways to see every column →</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {["Product system", "Brand", "Base coat", "Finish coat", "Polymer type", "Base coat thickness", "Finish coat thickness", "Machine applicable", "Bonding primer required", "Coastal rated", "Primary use"].map((h, i) => (
                  <th
                    key={h}
                    className={`px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700 ${i === 0 ? "sticky left-0 border-r border-slate-200 bg-slate-50 px-5" : ""}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.baseCoat}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.finishCoat}</td>
                  <td className="px-4 py-3 text-slate-600">{row.polymerType}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.baseThickness}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.finishThickness}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.machine}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.primer}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coastal}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.primaryUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
