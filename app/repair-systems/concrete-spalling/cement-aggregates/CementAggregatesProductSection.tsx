"use client";

import { useState, useRef } from "react";
import {
  Layers, SquareStack, Ruler, ExternalLink,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight, FileText, BookOpen,
} from "lucide-react";
import {
  CollapsibleList, CollapsibleDescription, CollapsibleSources,
  CollapsibleCardDetails, TechCard,
  AISelectionStage1, AISelectionStage2,
  CheckCircle, AlertTriangle,
} from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";

type FilterTag =
  | "GP-cement"
  | "Fly-ash"
  | "Silica-fume"
  | "Aggregate"
  | "Binder"
  | "SCM"
  | "Site-batched"
  | "AS-3972"
  | "AS-3582";

type Product = {
  fullLabel: string;
  brandUrl: string;
  tdsUrl?: string;
  accentColor: string;
  name: string;
  descriptionLine: string;
  productType: string;
  filterTags: FilterTag[];
  techChips: { label: string; cls: string }[];
  systemDescription: string;
  technicalProperties: string[];
  limitations: string[];
  procurementSources: { name: string; url?: string }[];
};

export const PRODUCTS: Product[] = [
  {
    fullLabel: "Boral / Holcim / Adbri",
    brandUrl: "https://www.adbri.com.au",
    accentColor: "#7c3aed",
    name: "General Purpose (GP) Portland Cement — 20 kg",
    descriptionLine: "AS 3972 Type GP cement — primary cementitious binder for site-batched repair mortars, bonding slurry preparation, and non-structural concrete reinstatement",
    productType: "GP Portland cement — AS 3972 Type GP — bagged 20 kg",
    filterTags: ["GP-cement", "Binder", "Site-batched", "AS-3972"],
    techChips: [
      { label: "AS 3972 Type GP", cls: "bg-purple-100 text-purple-900" },
      { label: "20 kg bags", cls: "bg-slate-100 text-slate-700" },
      { label: "Initial set ~2 hrs @ 20°C", cls: "bg-amber-50 text-amber-700" },
      { label: "Boral / Holcim / Adbri", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "General Purpose (GP) Portland cement to AS 3972 is the standard cement used in site-batched repair mortars, bonding slurry, and concrete used in concrete spalling repair. It is used as the primary cementitious binder when the repair is batched on-site from raw materials — for example, a repair mortar mix proportioned as 1 part GP cement : 3 parts washed concrete sand : SBR latex admixture. For remedial work, bagged 20 kg GP cement from Boral, Holcim, or Adbri is the most practical supply form for small-volume site batching. Note that site-batched mortars from raw GP cement and aggregate are less consistent than purpose-manufactured pre-bagged polymer-modified repair mortars (such as Sika MonoTop or Ardex BR 340) — for critical repair applications, pre-bagged factory-manufactured repair mortar is strongly preferred. GP cement from the three major suppliers meets the same AS 3972 GP specification — differences between suppliers are minor in practice.",
    technicalProperties: [
      "AS 3972 Type GP — 20 kg bags — Boral, Holcim, Adbri nationally available",
      "Used in site-batched repair mortars, bonding slurry, and non-structural concrete",
      "Setting time at 20°C: initial set ~2 hours, final set ~4 hours (varies by temperature)",
      "Compressive strength Class 32.5 or 42.5 — confirm from manufacturer",
    ],
    limitations: [
      "Site-batched mortars from GP cement and aggregate are less consistent than factory-manufactured pre-bagged repair mortars — use pre-bagged products for structural or critical repair applications",
      "GP cement does not include polymer modifier — site-batched mortars have lower adhesion and flexibility than polymer-modified repair mortars unless SBR or acrylic admixture is included",
      "Shelf life 3–6 months in sealed unopened bags — store off the ground, dry — lumpy cement indicates partial hydration and must not be used",
    ],
    procurementSources: [
      { name: "Boral Building Products — nationally available", url: "https://www.boral.com.au" },
      { name: "Holcim Australia — nationally available", url: "https://www.holcim.com.au" },
      { name: "Adbri — nationally available", url: "https://www.adbri.com.au" },
      { name: "Bunnings Trade — nationally available", url: "https://www.bunnings.com.au/trade" },
    ],
  },
  {
    fullLabel: "Flyash Australia / Holcim / Regional",
    brandUrl: "https://www.holcim.com.au",
    accentColor: "#64748b",
    name: "Fly Ash — Supplementary Cementitious Material (SCM)",
    descriptionLine: "Class F fly ash to AS 3582.1 — added at 20–30% of cementitious content to improve workability, reduce permeability, and increase chloride resistance in site-batched repair mortars",
    productType: "Fly ash — Class F — AS 3582.1 — supplementary cementitious material",
    filterTags: ["Fly-ash", "SCM", "Site-batched", "AS-3582"],
    techChips: [
      { label: "AS 3582.1 Class F", cls: "bg-slate-100 text-slate-700" },
      { label: "20–30% replacement", cls: "bg-slate-100 text-slate-700" },
      { label: "Slower early strength", cls: "bg-amber-50 text-amber-700" },
      { label: "Reduces chloride permeability", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Class F fly ash to AS 3582.1 is a supplementary cementitious material (SCM) added to site-batched repair mortars and concrete to improve workability, reduce permeability, and increase long-term durability — particularly in chloride and sulfate-exposed environments. Fly ash is a by-product of coal combustion collected as fine particulate from power station exhausts. In remedial repair mortar, fly ash is typically added at 20–30% of total cementitious content as a partial replacement for GP cement. It improves the fluidity of the fresh mix, reduces heat of hydration, and refines the pore structure to reduce permeability and chloride penetration. Strength gain is slower than GP cement alone — fly ash mortars gain most of their strength between 28 and 90 days. For repair mortars requiring early strength, fly ash is not suitable without high early-strength cement or accelerating admixture.",
    technicalProperties: [
      "Class F fly ash — AS 3582.1 — pozzolanic supplementary cementitious material",
      "Replacement rate: 20–30% of total cementitious content (partial GP cement replacement)",
      "Improves workability, reduces permeability, increases chloride resistance",
      "Slower early strength than GP cement — strength gain 28–90 days",
    ],
    limitations: [
      "Not suitable for early-strength repair applications — slow strength gain requires extended protection of fresh repair",
      "Quality varies by source — confirm Class F compliance and fineness from current TDS",
      "Regional availability — not universally stocked — confirm availability in your region before specifying",
    ],
    procurementSources: [
      { name: "Flyash Australia — regional suppliers", url: "https://www.holcim.com.au" },
      { name: "Holcim Australia — confirm regional availability", url: "https://www.holcim.com.au" },
    ],
  },
  {
    fullLabel: "Elkem / Local Suppliers",
    brandUrl: "https://www.elkem.com",
    accentColor: "#0369a1",
    name: "Silica Fume (Microsilica) — Densified",
    descriptionLine: "Densified silica fume to AS 3582.3 added at 5–10% of cementitious content — dramatically reduces permeability in chloride-affected coastal and marine spalling repair mortars",
    productType: "Silica fume — densified — AS 3582.3 — high-durability SCM",
    filterTags: ["Silica-fume", "SCM", "Site-batched", "AS-3582"],
    techChips: [
      { label: "AS 3582.3 densified", cls: "bg-sky-100 text-sky-800" },
      { label: "5–10% of cementitious", cls: "bg-slate-100 text-slate-700" },
      { label: "Requires superplasticiser", cls: "bg-amber-50 text-amber-700" },
      { label: "Coastal/marine structures", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Densified silica fume (microsilica) to AS 3582.3 is a highly reactive pozzolanic SCM added to site-batched repair mortars and concrete at 5–10% of total cementitious content to dramatically reduce permeability and chloride ion penetration. Silica fume particles are approximately 100 times finer than GP cement — they fill the microscopic voids between cement particles in the hydrated paste, creating a very dense, low-permeability matrix. This is particularly valuable in chloride-affected spalling repair on coastal structures, marine structures, and carpark decks exposed to de-icing salts or sea spray. Silica fume significantly increases early compressive strength and reduces water demand — it requires an adequate dosage of superplasticiser to maintain workability. For most patch repair applications, a factory-manufactured silica-fume-enhanced repair mortar is more practical than site-batching silica fume into a mortar from raw materials.",
    technicalProperties: [
      "AS 3582.3 densified silica fume — 5–10% of total cementitious content",
      "Dramatic permeability reduction — fills voids in hydrated cement paste",
      "Increased early compressive strength — reduced chloride ion penetration",
      "Used in high-durability repair mortars for chloride-affected and coastal structures",
    ],
    limitations: [
      "Requires superplasticiser to maintain workability — without it, silica fume makes the mix very stiff",
      "Difficult to handle on site — dusty, fine — use P2 respirator when handling dry silica fume",
      "For most patch repair, purpose-manufactured silica fume repair mortars are more consistent and easier to use than site-batching with raw microsilica",
      "Regional availability varies — confirm from Elkem or concrete admixture supplier",
    ],
    procurementSources: [
      { name: "Elkem — silica fume supplier", url: "https://www.elkem.com" },
      { name: "Concrete admixture suppliers — regional availability varies", url: "https://www.elkem.com" },
    ],
  },
  {
    fullLabel: "Boral / Independent Quarries",
    brandUrl: "https://www.boral.com.au",
    accentColor: "#16a34a",
    name: "Washed Concrete Sand and 10 mm Crushed Aggregate",
    descriptionLine: "AS 2758.1 washed concrete sand (0–5 mm) and 10 mm crushed aggregate for site-batched repair mortars — must be clean, washed, and free of clay, organic, and salt contamination",
    productType: "Fine and coarse aggregate — AS 2758.1 — site-batched repair mortar",
    filterTags: ["Aggregate", "Site-batched"],
    techChips: [
      { label: "AS 2758.1", cls: "bg-green-100 text-green-900" },
      { label: "Fine: 0–5 mm sand", cls: "bg-slate-100 text-slate-700" },
      { label: "Coarse: 10 mm crushed", cls: "bg-slate-100 text-slate-700" },
      { label: "Washed — no contamination", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Washed concrete sand (fine aggregate, particle size 0–5 mm, zone M or zone C) and 10 mm crushed coarse aggregate to AS 2758.1 are used in site-batched repair mortars and concrete for concrete spalling reinstatement repair. Washed concrete sand is the fine aggregate component in site-batched repair mortars — it must be clean, washed, free of organic material, clay, and salt contamination. Contaminated or dirty sand significantly reduces mortar strength and increases shrinkage. 10 mm crushed aggregate is used in site-batched structural reinstatement concrete pours where fine mortar alone is not adequate. Both products are available in 20 kg bags and bulk from Boral building products and independent quarry suppliers. Confirm particle grading from the current supplier test certificate before use — aggregate grading affects the mix design and workability of site-batched mortars.",
    technicalProperties: [
      "Washed concrete sand — AS 2758.1 fine aggregate — particle size 0–5 mm",
      "10 mm crushed aggregate — AS 2758.1 coarse aggregate — for structural repair concrete",
      "Clean, washed — free of organics, clay fines, salt contamination",
      "20 kg bags and bulk supply from Boral and quarry suppliers nationally",
    ],
    limitations: [
      "Do not use beach sand, high-fines river sand, or unwashed aggregate in repair mortars — contamination reduces strength and increases shrinkage",
      "Confirm particle grading and cleanliness from supplier test certificate before use in repair mortars",
      "Site-batched mortar consistency depends on aggregate moisture content — adjust water addition at batch based on aggregate moisture",
    ],
    procurementSources: [
      { name: "Boral Building Products — nationally available", url: "https://www.boral.com.au" },
      { name: "Independent quarry suppliers — regional", url: "https://www.boral.com.au" },
      { name: "Bunnings Trade — 20 kg bags nationally available", url: "https://www.bunnings.com.au/trade" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "GP-cement", label: "GP cement" },
  { id: "Fly-ash", label: "Fly ash" },
  { id: "Silica-fume", label: "Silica fume" },
  { id: "Aggregate", label: "Aggregate" },
  { id: "Binder", label: "Binder" },
  { id: "SCM", label: "SCM" },
  { id: "Site-batched", label: "Site-batched" },
  { id: "AS-3972", label: "AS 3972" },
  { id: "AS-3582", label: "AS 3582" },
];

const SYSTEM_COMPARISON = [
  { product: "GP Portland Cement", standard: "AS 3972 Type GP", role: "Primary binder — site-batched mortars", strength: "Class 32.5 / 42.5", notes: "Use pre-bagged repair mortars for critical applications" },
  { product: "Fly Ash (Class F)", standard: "AS 3582.1 SCM", role: "20–30% replacement — durability improvement", strength: "Slow early — gain 28–90 days", notes: "Slow early strength — not for early-traffic repair" },
  { product: "Silica Fume (densified)", standard: "AS 3582.3 SCM", role: "5–10% addition — permeability reduction", strength: "Increases early strength", notes: "Requires superplasticiser — high-durability coastal repairs" },
  { product: "Concrete Sand / 10 mm Aggregate", standard: "AS 2758.1", role: "Fine/coarse aggregate — site-batched mortars", strength: "N/A", notes: "Must be clean, washed — confirm grading certificate" },
];

const TECH_INFO = {
  typicalApplications: [
    "GP cement used as primary binder in site-batched repair mortars where pre-bagged polymer-modified repair mortar is not available or practical",
    "GP cement mixed with SBR latex admixture and washed concrete sand for site-batched bonding slurry preparation",
    "Fly ash added at 20–30% to site-batched repair mortar to improve workability and long-term durability on chloride-exposed structures",
    "Silica fume added at 5–10% to high-durability repair mortars for coastal, marine, and carpark structures with high chloride exposure",
    "Washed concrete sand and 10 mm aggregate used in site-batched structural reinstatement concrete pours for large-volume spalling repair",
  ],
  selectionCriteria: [
    "For critical structural repair: always use factory-manufactured pre-bagged polymer-modified repair mortar (Sika MonoTop, Ardex BR, Fosroc Renderoc, Mapei Mapegrout) in preference to site-batching from GP cement and aggregate",
    "GP cement site-batching: only appropriate for large-volume reinstatement pours, bonding slurry preparation, or where pre-bagged product is unavailable",
    "Fly ash vs silica fume: fly ash improves workability and long-term durability — silica fume dramatically reduces permeability for high-chloride exposures — different purposes",
    "Aggregate selection: confirm grading from supplier test certificate — aggregate grading zone affects mix design and workability",
    "Do not site-batch from GP cement and sand without polymer admixture for spalling repair — adhesion is inadequate without SBR or acrylic polymer",
  ],
  limitations: [
    "Site-batched mortars from GP cement and aggregate are less consistent than factory-manufactured pre-bagged products — use pre-bagged repair mortars for structural and critical applications",
    "Do not use beach sand, high-fines river sand, or contaminated aggregate in repair mortars — contamination causes rapid strength loss and increased shrinkage cracking",
    "Cement more than 3 months old from manufacture date should be tested before use — damp storage causes partial hydration",
    "Silica fume is a respirable hazard — use P2 respirator when handling dry silica fume on site",
    "Fly ash availability varies by region — confirm availability before specifying for a project",
  ],
  standardsNotes: [
    "AS 3972 — Portland and Blended Cements — Type GP cement specification — binder for site-batched mortars",
    "AS 3582.1 — Fly Ash — supplementary cementitious material specification — Class F fly ash",
    "AS 3582.3 — Amorphous Silica — silica fume specification — densified microsilica",
    "AS 2758.1 — Aggregates and Rock for Engineering Purposes — concrete aggregate specification — particle grading and cleanliness requirements",
    "Pre-bagged polymer-modified repair mortars are preferred in AS 3600 repair specification for consistency and traceability — site-batching requires documented mix design",
  ],
  suitableDefects: [
    "Concrete spalling — large-volume reinstatement pours where site-batched concrete is cost-effective and appropriate",
    "Non-structural gap filling and surface finishing where pre-bagged products are impractical",
    "Bonding slurry preparation — GP cement mixed with SBR latex before repair mortar application",
    "Structural reinstatement concrete pours — full cross-section replacement of severely deteriorated concrete elements",
  ],
  typicalSubstrates: [
    "In-situ reinforced concrete — substrate for repair mortar from any source — pre-bagged products preferred for critical repair",
    "Large-volume concrete elements (columns, beams, slabs) — site-batched concrete appropriate for full element reinstatement where pre-bagged mortar is impractical",
    "Non-structural concrete — site-batched concrete suitable for non-structural fill, levelling, and reinstatement",
  ],
};

// ── AI Selection Data (review mode) — derived from this page; unverified = unconfirmed/null ──
export const AI_STAGE1 = {
  headers: ["Gate", "Demand (allowed values)", "Pass rule"],
  rows: [
    ["role", "binder / scm / aggregate", "select component for site-batched mix (binder + scm + aggregate)"],
    ["batching", "site_batched / pre_bagged", "this category = site-batched raw materials; critical/structural → pre-bagged factory mortar preferred"],
    ["strength_demand", "early / standard / long_term", "early → GP/silica fume; SCM (fly ash) alone is slow-strength"],
    ["exposure", "standard / chloride_coastal", "chloride_coastal → add SCM (fly ash / silica fume) for permeability/chloride resistance"],
    ["standard", "AS3972 / AS3582 / AS2758", "confirm component compliance to relevant Australian Standard"],
  ],
  json: {
    category: "cement_aggregates",
    stage1_gates: {
      role: { allowed: ["binder", "scm", "aggregate"], rule: "select component for site-batched mix" },
      batching: { allowed: ["site_batched", "pre_bagged"], rule: "raw materials=site_batched; critical=pre-bagged factory mortar preferred" },
      strength_demand: { allowed: ["early", "standard", "long_term"], rule: "early=GP/silica fume; fly ash alone slow-strength" },
      exposure: { allowed: ["standard", "chloride_coastal"], rule: "chloride_coastal=add SCM for permeability/chloride resistance" },
      standard: { allowed: ["AS3972", "AS3582", "AS2758"], rule: "confirm component compliance" },
    },
  },
};

const AI_STAGE2_HEADERS = ["Field", "Type", "Value"];

export const AI_STAGE2: Record<string, { rows: string[][]; json: unknown }> = {
  "General Purpose (GP) Portland Cement — 20 kg": {
    rows: [
      ["role", "gate", "binder"],
      ["batching", "gate", "site_batched"],
      ["early_strength", "gate", "yes"],
      ["exposure_benefit", "gate", "none"],
      ["standard", "tag", "AS3972_GP"],
      ["replacement_rate_pct", "rank", "null (primary binder)"],
      ["pack_size", "meta", "20kg"],
      ["supply", "meta", "boral/holcim/adbri"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "gp_portland_cement_20kg",
      gates: { role: "binder", batching: "site_batched", early_strength: "yes", exposure_benefit: "none" },
      tag: { standard: "AS3972_GP" },
      rank: { replacement_rate_pct: null },
      meta: { pack_size: "20kg", supply: "boral/holcim/adbri", alternative_product: "pre-bagged PM repair mortar (critical repairs)", data_status: "verified", selectable: true, source: "AS 3972 Type GP — Boral/Holcim/Adbri bagged cement", confirmed_date: null },
    },
  },
  "Fly Ash — Supplementary Cementitious Material (SCM)": {
    rows: [
      ["role", "gate", "scm"],
      ["batching", "gate", "site_batched"],
      ["early_strength", "gate", "slow"],
      ["exposure_benefit", "gate", "chloride_resistance"],
      ["standard", "tag", "AS3582.1_ClassF"],
      ["replacement_rate_pct", "rank", "20-30"],
      ["pack_size", "meta", "null (unconfirmed)"],
      ["supply", "meta", "flyash_australia/holcim (regional)"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "fly_ash_class_f",
      gates: { role: "scm", batching: "site_batched", early_strength: "slow", exposure_benefit: "chloride_resistance" },
      tag: { standard: "AS3582.1_ClassF" },
      rank: { replacement_rate_pct: "20-30" },
      meta: { pack_size: null, supply: "flyash_australia/holcim", alternative_product: null, data_status: "verified", selectable: true, source: "AS 3582.1 Class F fly ash — regional availability varies", confirmed_date: null },
    },
  },
  "Silica Fume (Microsilica) — Densified": {
    rows: [
      ["role", "gate", "scm"],
      ["batching", "gate", "site_batched"],
      ["early_strength", "gate", "yes (increased)"],
      ["exposure_benefit", "gate", "chloride_resistance (high)"],
      ["standard", "tag", "AS3582.3"],
      ["replacement_rate_pct", "rank", "5-10"],
      ["pack_size", "meta", "null (unconfirmed)"],
      ["supply", "meta", "elkem/admixture_suppliers"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "silica_fume_densified",
      gates: { role: "scm", batching: "site_batched", early_strength: "yes", exposure_benefit: "chloride_resistance_high" },
      tag: { standard: "AS3582.3" },
      rank: { replacement_rate_pct: "5-10" },
      meta: { pack_size: null, supply: "elkem/admixture_suppliers", alternative_product: "factory silica-fume repair mortar (more consistent)", data_status: "verified", selectable: true, source: "AS 3582.3 densified silica fume — requires superplasticiser", confirmed_date: null },
    },
  },
  "Washed Concrete Sand and 10 mm Crushed Aggregate": {
    rows: [
      ["role", "gate", "aggregate"],
      ["batching", "gate", "site_batched"],
      ["early_strength", "gate", "n/a"],
      ["exposure_benefit", "gate", "none"],
      ["standard", "tag", "AS2758.1"],
      ["replacement_rate_pct", "rank", "null (n/a)"],
      ["pack_size", "meta", "20kg/bulk"],
      ["supply", "meta", "boral/quarries"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "washed_sand_10mm_aggregate",
      gates: { role: "aggregate", batching: "site_batched", early_strength: "n/a", exposure_benefit: "none" },
      tag: { standard: "AS2758.1" },
      rank: { replacement_rate_pct: null },
      meta: { pack_size: "20kg/bulk", supply: "boral/quarries", alternative_product: null, data_status: "verified", selectable: true, source: "AS 2758.1 washed concrete sand + 10mm crushed aggregate (must be clean/washed)", confirmed_date: null },
    },
  },
};

export function CementAggregatesIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">Cement and aggregates in concrete spalling repair</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Cement and aggregates are listed as a product category for concrete spalling repair because they are sometimes needed for site-batched mortars, bonding slurries, and structural reinstatement concrete. However, the primary recommendation for concrete spalling repair in Australian remedial practice is to use factory-manufactured pre-bagged polymer-modified repair mortars (such as Sika MonoTop, Ardex BR series, Fosroc Renderoc, or Mapei Mapegrout) rather than site-batching from raw cement and aggregate.
        </p>
        {expanded && (
          <>
            <p>
              Pre-bagged repair mortars provide consistent mix proportions, controlled polymer modification, calibrated setting time, and traceable quality — none of which can be reliably achieved with site batching. Site-batching from raw cement and aggregate is appropriate where pre-bagged repair mortar is not available, for large-volume reinstatement pours where cost and volume make pre-bagged product impractical, or for bonding slurry preparation from GP cement and SBR latex. Supplementary cementitious materials (fly ash and silica fume) are added to site-batched mixes to improve durability — fly ash for workability and long-term permeability, silica fume for high-durability coastal applications.
            </p>
          </>
        )}
      </div>
      <button onClick={() => setExpanded((e) => !e)} className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900">
        {expanded ? "Read less ↑" : "Read more ↓"}
      </button>
    </div>
  );
}

const DESIGN_CRITERIA = "Cement type & strength class (AS 3972 GP/GB/HE); supplementary cementitious material type & spec (fly ash Class F to AS 3582.1, slag AS 3582.2, silica fume AS 3582.3) and replacement % for durability/sulfate resistance; aggregate grading, nominal size & soundness (AS 2758.1); aggregate cleanliness, fines/silt content & water absorption; alkali-aggregate (AAR) reactivity; chloride & sulfate content limits for reinforced repair (AS 3600 durability); target w/c ratio & cementitious content; bulk density & yield; bagged/bulk supply & shelf life.";

export function CementAggregatesProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setAccordionOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50"
        >
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable substrates</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? (<>Hide detail <ChevronUp size={14} /></>) : (<>Show detail <ChevronDown size={14} /></>)}
          </div>
        </button>
        {accordionOpen && (
          <div className="border-t border-slate-100 px-7 pb-7 pt-6">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <TechCard icon={<Layers size={15} />} title="Typical Applications" items={TECH_INFO.typicalApplications} style="bullet" />
              <TechCard icon={<Ruler size={15} />} title="Selection Criteria" items={TECH_INFO.selectionCriteria} style="check" />
              <TechCard icon={<AlertTriangle size={15} />} title="When NOT to Use" items={TECH_INFO.limitations} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards & Notes" items={TECH_INFO.standardsNotes} style="bullet" />
              <TechCard icon={<CheckCircle size={15} />} title="Suitable Defects" items={TECH_INFO.suitableDefects} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="Typical Substrates" items={TECH_INFO.typicalSubstrates} style="bullet" />
            </div>
          </div>
        )}
      </div>

      <AutoProductReference products={PRODUCTS} designCriteria={DESIGN_CRITERIA} sectionLabel="Concrete spalling" />
    </>
  );
}
