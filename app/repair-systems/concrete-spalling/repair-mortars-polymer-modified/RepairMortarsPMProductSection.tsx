"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { AISelectionStage1 } from "../../_components/ProductPageShared";
import { PMSpecCard, type SectionKey } from "./PMSpecCard";
import { REF_CARDS } from "./referenceCardData";

type FilterTag =
  | "General-use"
  | "High-build"
  | "Fine-cosmetic"
  | "Structural"
  | "EN-1504-3"
  | "Thixotropic"
  | "Fibre-reinforced"
  | "Rapid-set"
  | "Hand-applied"
  | "Trowel-grade"
  | "Pre-bagged";

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
  procurementSources: { name: string; url: string }[];
  dataNote?: string;
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Fosroc / Parchem",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#0369a1",
    name: "Fosroc Renderoc G",
    descriptionLine: "General-purpose polymer-modified cementitious repair mortar for concrete spalling repair — hand-applied trowel-grade — confirm current formulation, coverage, and system design with Parchem technical",
    productType: "General-purpose PM repair mortar — concrete spalling repair",
    filterTags: ["General-use", "Thixotropic", "Hand-applied", "Trowel-grade", "Pre-bagged"],
    techChips: [{ label: "General use", cls: "bg-blue-100 text-blue-700" }, { label: "Pre-bagged", cls: "bg-slate-100 text-slate-700" }, { label: "Trowel-grade", cls: "bg-slate-100 text-slate-700" }],
    systemDescription: "Fosroc Renderoc G is a general-purpose polymer-modified cementitious repair mortar for concrete spalling repair on balconies, facades, car parks, and building structures. It is a pre-bagged, hand-applied trowel-grade mortar suitable for shallow to medium-depth spall reinstatement.\n\nRenderoc G is part of the Fosroc Renderoc concrete repair system, distributed in Australia through Parchem Construction Supplies. Confirm current product technical data sheet, maximum application thickness, coverage, rebar primer specification, and system design with Parchem technical before specifying. The Fosroc product range distributed by Parchem is subject to periodic revision — verify current product name and availability with Parchem.",
    technicalProperties: [
      "General-purpose polymer-modified cementitious repair mortar — suitable for shallow to medium-depth concrete spalling repair",
      "Pre-bagged trowel-grade mortar — hand-applied — part of the Fosroc Renderoc repair system",
      "Confirm maximum thickness, coverage, rebar primer, and system design from current Fosroc/Parchem Renderoc G TDS",
    ],
    limitations: [
      "Confirm current product formulation and system design with Parchem technical before specifying",
      "Rebar anti-corrosion primer (Nitoprime Zincrich or equivalent) is typically required before mortar application — confirm with Parchem",
      "Not suitable for application over wet or contaminated concrete — substrate preparation to current Fosroc specification is mandatory",
      "Confirm current Fosroc product range revision status and Renderoc G availability with Parchem before specifying",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — national distribution (DuluxGroup)", url: "https://www.parchem.com.au" },
      { name: "Fosroc Australia — product information", url: "https://www.fosroc.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "General-use", label: "General use" },
  { id: "High-build", label: "High-build" },
  { id: "Fine-cosmetic", label: "Fine / cosmetic" },
  { id: "Structural", label: "Structural rated" },
  { id: "EN-1504-3", label: "EN 1504-3" },
  { id: "Thixotropic", label: "Thixotropic" },
  { id: "Fibre-reinforced", label: "Fibre-reinforced" },
  { id: "Rapid-set", label: "Rapid-set" },
  { id: "Hand-applied", label: "Hand-applied" },
  { id: "Pre-bagged", label: "Pre-bagged" },
];

// Values reflect the current Australian manufacturer/distributor TDS (the same
// TDS-cited dataset used by the product cards). Where a manufacturer does not
// publish a value, the cell reads "Not published — refer to current TDS"
// rather than asserting a figure.
// Soft brand tint for comparison-table rows (nothing harsh). Tints are solid (no
// alpha) so the frozen first column stays opaque while cells scroll beneath it.
function brandRow(brand: string) {
  const b = (brand || "").toLowerCase();
  if (b.includes("sika")) return { tint: "bg-amber-50", bar: "bg-yellow-400", name: "text-amber-900" };
  if (b.includes("ardex")) return { tint: "bg-slate-50", bar: "bg-slate-400", name: "text-slate-800" };
  if (b.includes("fosroc") || b.includes("parchem")) return { tint: "bg-red-50", bar: "bg-red-600", name: "text-red-900" };
  if (b.includes("mapei")) return { tint: "bg-blue-50", bar: "bg-blue-700", name: "text-blue-900" };
  return { tint: "bg-sky-50", bar: "bg-sky-800", name: "text-sky-950" };
}

const SYSTEM_COMPARISON = [
  {
    brand: "Sika",
    generalMortar: "Sika MonoTop-352NFG (R3)",
    highBuild: "Sika MonoTop-612N (R4)",
    fineMortar: "Sika MonoTop FC (0–3 mm fairing) — separate product; MonoTop-412NFG is R4 structural, not cosmetic",
    en1504: "R3 (352NFG) / R4 (612N, 412NFG)",
    maxLayer: "75 mm (352NFG) / 100 mm (612N) / 50 mm (412NFG)",
    primer: "None required on a well-prepared substrate (352NFG); optional MonoTop-910 N or SikaTop Armatec 110 EpoCem",
    availability: "Bunnings (352NFG) + Sika trade / Bayset",
    primaryUse: "Full range — strata, carparks, civil",
  },
  {
    brand: "Ardex",
    generalMortar: "ARDEX BR 340 (R3, to 80 mm)",
    highBuild: "ARDEX BR 345 (R3, high-resistivity >15,000 Ω·cm, to 80 mm)",
    fineMortar: "No dedicated repair fairing — Feather Finish is a flooring smoothing compound, not a structural repair mortar",
    en1504: "R3 (BR 340 / BR 345)",
    maxLayer: "80 mm (BR 340 / BR 345) — min 10 mm, square edges",
    primer: "ARDEX WR Prime (substrate, wet-on-wet) + BR 10 ZP on rebar; EG 800 F epoxy for permanently damp substrates",
    availability: "ARDEX trade supply",
    primaryUse: "Structural spall repair — strata and commercial; BR 345 for higher chloride risk",
  },
  {
    brand: "Fosroc / Parchem",
    generalMortar: "Fosroc Renderoc HB (28 MPa, to 80 mm)",
    highBuild: "Renderoc high-build range by strength — e.g. HB40 (R3, to 40 mm)",
    fineMortar: "Fosroc Renderoc FC (0–3 mm fairing)",
    en1504: "R3 (HB40); plain HB & FC report to Australian Standards only — no EN class",
    maxLayer: "80 mm (HB) / 40 mm (HB40) / 3 mm (FC)",
    primer: "Nitobond HAR (substrate) + Nitoprime Zincrich on rebar; Nitobond EP for immersed/permanently wet",
    availability: "Parchem (DuluxGroup) nationally",
    primaryUse: "Commercial, strata, carparks — strong technical support",
  },
  {
    brand: "Mapei",
    generalMortar: "Mapei Mapegrout T40 (R3, thixotropic)",
    highBuild: "Mapei Mapegrout T60 (R4, to 100 mm vertical, multi-coat)",
    fineMortar: "Planitop Fine Finish (separate fine finishing mortar)",
    en1504: "R3 (T40) / R4 (T60)",
    maxLayer: "30–35 mm (T40) / 100 mm vertical multi-coat, 20 mm ceiling (T60)",
    primer: "None — roughened, saturated (SSD) substrate; Mapefer / Mapefer 1K on rebar",
    availability: "Mapei trade + Bayset nationally",
    primaryUse: "Structural spall repair — strata and commercial",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Full-depth spalling repair on concrete balcony soffits, columns, beams, and slab edges in Class 2 strata buildings where chloride-induced or carbonation-induced corrosion has caused concrete loss",
    "Large-area concrete spalling repair on carpark decks, vehicle ramps, and structural columns in commercial and mixed-use buildings",
    "Cosmetic profiling and void filling on exposed concrete facades, balcony soffits, and stair structures where honeycombing, surface pitting, or form-tie blow-outs require repair",
    "Reinstatement of concrete cover over repaired or replaced reinforcement bars after corrosion-induced spalling",
    "Surface preparation and profiling prior to protective coating application (anti-carbonation, elastomeric, or epoxy coating systems)",
    "Patch repair at concrete spalling on civil structures — bridges, retaining walls, car park frames, stormwater assets",
  ],
  selectionCriteria: [
    "Repair depth: use general-use mortar for depths up to 30–40 mm; high-build formula for 30–100 mm single-layer repairs; fine mortar for cosmetic profiling only",
    "Substrate: confirm primer type for substrate — epoxy bonding agent for smooth/dense concrete; SBR slurry coat for porous or prepared rough concrete",
    "EN 1504-3 compliance: structural repairs on Class 2 strata buildings should specify EN 1504-3 Class R3 or R4 product where the repair is load-bearing or cosmetically exposed",
    "Reinforcement exposure: where corroded rebar is exposed, clean, and primed with a zinc-rich or epoxy rebar primer before applying the repair mortar — do not encapsulate unprepared corroded rebar",
    "Vertical and overhead: confirm thixotropic consistency of the selected product — non-thixotropic mortars will sag on vertical surfaces at typical layer thicknesses",
    "Large area vs. patch repair: large-area repairs may require a high-build formula with steel fibre reinforcement to avoid shrinkage cracking — include control joints at maximum 1.5m centres in large-area applications",
    "Finishing: confirm whether the selected mortar produces a surface compatible with the specified coating system — some repair mortars require a compatible skim coat or coating primer before topcoat",
  ],
  limitations: [
    "Not suitable over active or moving cracks — polymer-modified mortars are rigid once cured and will re-crack under live structural movement",
    "Repair mortar alone does not address the cause of spalling — without treating the underlying corrosion (by cleaning rebar, applying corrosion inhibitor, and ensuring adequate concrete cover), spalling will recur within a few years",
    "Minimum cover requirement: reinstated concrete cover must meet AS 3600 minimum cover for the exposure classification — typically 40 mm for C2 exposure in residential strata",
    "Carbonation interface: on carbonated structures, apply an anti-carbonation or silane/siloxane protective coating system over the cured repair to prevent further carbonation advance",
    "Do not apply repair mortar over contaminated or chloride-saturated concrete without removing the chloride-affected layer — encapsulating active chloride contamination will cause recurring corrosion behind the repair",
    "Fresh repair mortar must be cured for minimum 7 days — polythene sheeting or curing compound application immediately after finishing is mandatory in exposed or hot/windy conditions",
  ],
  standardsNotes: [
    "AS 3600 — Concrete Structures — minimum cover requirements for exposure classification — repair mortar reinstatement must achieve minimum cover compliance",
    "EN 1504-3 — Products and Systems for Protection and Repair of Concrete Structures — repair mortars rated under EN 1504-3 Class R3 or R4 are appropriate for structural repair on Class 2 buildings",
    "AS 3735 — Concrete Structures for Retaining Liquids — relevant for carpark slabs with drainage or wet-area concrete repair",
    "ICRI Technical Guideline 310.2 — Surface Profile (CSP) requirements for concrete repair — minimum CSP 3–5 for polymer-modified repair mortars — confirm with manufacturer",
    "Australian standards and codes take precedence over EN designations — confirm with the project engineer that EN-rated products satisfy the applicable Australian project specification",
    "Manufacturer TDS — primer application, saturated-surface-dry substrate, mortar consistency, layer thickness, inter-coat timing, and curing protection are all critical hold points confirmed in the current TDS",
  ],
  suitableDefects: [
    "Concrete spalling — loss of concrete cover due to reinforcement corrosion, freeze-thaw, or mechanical damage — primary application for polymer-modified repair mortars",
    "Honeycombing — void formation during concrete placement — typically treated with fine or general-use repair mortar after cleaning and priming",
    "Slab edge and fascia beam deterioration — spalled or broken slab edges and balcony fascia beams where concrete cover has been lost and rebar is exposed",
    "Surface pitting and abrasion — carpark ramp surfaces, column bases, and industrial floor edges subject to mechanical wear or surface scaling",
    "Form-tie blow-outs and bug holes — cosmetic surface defects on exposed architectural concrete facades",
  ],
  typicalSubstrates: [
    "In-situ reinforced concrete — must be fully chipped back to sound concrete beyond carbonation front — mechanically prepared to CSP 3–5 — saturated surface dry before mortar application",
    "Precast concrete — same preparation as in-situ — confirm primer requirement with manufacturer for high-density precast elements",
    "Masonry and rendered concrete — confirm product suitability for masonry substrates with the manufacturer — some repair mortars are formulated specifically for concrete substrates",
    "Exposed corroded reinforcement bars — clean to bright steel (St 2 minimum per ISO 8501-1) — apply corrosion inhibitor and zinc-rich or epoxy rebar primer before applying repair mortar",
    "Previously repaired concrete — confirm adhesion of existing repair to substrate before applying new mortar — delaminated or hollow-sounding patches must be removed",
  ],
};

function TechCard({ icon, title, items, style }: { icon: React.ReactNode; title: string; items: string[]; style: "bullet" | "check" | "warn" }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
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

// ── AI Selection Data (review mode) — derived from this page; unverified = unconfirmed/null ──
export const AI_STAGE1 = {
  headers: ["Gate", "Demand (allowed values)", "Pass rule"],
  rows: [
    ["defect_type", "spalling / honeycombing / active_crack / cosmetic_only", "spalling/honeycombing → this category; active_crack → not_suitable (rigid, re-cracks); cosmetic_only → fine-mortar grade within range"],
    ["structural_demand", "structural / non_structural", "structural → EN 1504-3 R3/R4 grade (use structural product in range)"],
    ["repair_depth", "shallow / medium / deep", "deep → high-build grade in range; shallow/medium → general-use grade"],
    ["element_orientation", "horizontal / vertical / overhead", "vertical/overhead → thixotropic grade required"],
    ["substrate_condition", "ssd_porous / dense_smooth / exposed_rebar", "dense_smooth → epoxy bond coat; ssd_porous → SBR/acrylic slurry; exposed_rebar → rebar primer first"],
  ],
  json: {
    category: "repair_mortars_polymer_modified",
    stage1_gates: {
      defect_type: { allowed: ["spalling", "honeycombing", "active_crack", "cosmetic_only"], rule: "spalling/honeycombing=suitable; active_crack=not_suitable; cosmetic_only=fine-mortar grade" },
      structural_demand: { allowed: ["structural", "non_structural"], rule: "structural=EN1504-3 R3/R4 grade" },
      repair_depth: { allowed: ["shallow", "medium", "deep"], rule: "deep=high-build grade; shallow/medium=general-use grade" },
      element_orientation: { allowed: ["horizontal", "vertical", "overhead"], rule: "vertical/overhead=thixotropic grade" },
      substrate_condition: { allowed: ["ssd_porous", "dense_smooth", "exposed_rebar"], rule: "dense_smooth=epoxy bond coat; ssd_porous=SBR/acrylic slurry; exposed_rebar=rebar primer first" },
    },
  },
};

const AI_STAGE2_HEADERS = ["Field", "Type", "Value"];

export const AI_STAGE2: Record<string, { rows: string[][]; json: unknown }> = {
  "Sika MonoTop Series — MonoTop-352NFG / MonoTop-612N / MonoTop-412NFG": {
    rows: [
      ["structural_demand", "gate", "structural"],
      ["setting", "gate", "normal_set"],
      ["exposure_max", "gate", "unconfirmed"],
      ["orientation", "gate", "vertical/overhead"],
      ["substrate_prep", "gate", "ssd_porous (no primer on well-prepared per TDS)"],
      ["min_layer_mm", "rank", "null (unconfirmed)"],
      ["max_layer_mm", "rank", "100 (612N); 75 (352NFG); 50 (412NFG)"],
      ["compressive_28d_mpa", "rank", "null (unconfirmed)"],
      ["chemistry", "tag", "polymer_modified_fibre_reinforced"],
      ["en1504_class", "tag", "R3 (352NFG) / R4 (612N, 412NFG)"],
      ["primer", "meta", "none required (352NFG/612N, well-prepared)"],
      ["pack_size", "meta", "20kg"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "sika_monotop_series",
      gates: { structural_demand: "structural", setting: "normal_set", exposure_max: "unconfirmed", orientation: "vertical/overhead", substrate_prep: "ssd_porous_no_primer" },
      tag: { chemistry: "polymer_modified_fibre_reinforced", en1504_class: "R3/R4" },
      rank: { min_layer_mm: null, max_layer_mm: 100, compressive_28d_mpa: null },
      meta: { primer: "none_required_well_prepared", pack_size: "20kg", alternative_product: "sika_monotop_fc (cosmetic 0-3mm)", data_status: "verified", selectable: true, source: "aus.sika.com MonoTop-352NFG/612N/412NFG; 412NFG is R4 structural not cosmetic", confirmed_date: null },
    },
  },
  "Ardex BR Series — BR 340 / BR 345 / Feather Finish": {
    rows: [
      ["structural_demand", "gate", "structural"],
      ["setting", "gate", "normal_set"],
      ["exposure_max", "gate", "unconfirmed (BR345 high-resistivity for chloride-risk)"],
      ["orientation", "gate", "vertical/horizontal/overhead"],
      ["substrate_prep", "gate", "unconfirmed (P 51 is flooring primer — confirm)"],
      ["min_layer_mm", "rank", "null (unconfirmed)"],
      ["max_layer_mm", "rank", "80 (BR 340 / BR 345)"],
      ["compressive_28d_mpa", "rank", "null (unconfirmed)"],
      ["chemistry", "tag", "polymer_modified_fibre_reinforced"],
      ["en1504_class", "tag", "unconfirmed"],
      ["primer", "meta", "unconfirmed (P 51 not a repair primer)"],
      ["pack_size", "meta", "20kg"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "ardex_br_series",
      gates: { structural_demand: "structural", setting: "normal_set", exposure_max: "unconfirmed", orientation: "vertical/horizontal/overhead", substrate_prep: "unconfirmed" },
      tag: { chemistry: "polymer_modified_fibre_reinforced", en1504_class: "unconfirmed" },
      rank: { min_layer_mm: null, max_layer_mm: 80, compressive_28d_mpa: null },
      meta: { primer: null, pack_size: "20kg", alternative_product: "ardex_feather_finish (cosmetic — confirm AU name)", data_status: "verified", selectable: true, source: "ardexaustralia.com BR 340 / BR 345; Feather Finish name unverified", confirmed_date: null },
    },
  },
  "Fosroc Renderoc Series — Renderoc HB / Renderoc FC": {
    rows: [
      ["structural_demand", "gate", "structural"],
      ["setting", "gate", "normal_set"],
      ["exposure_max", "gate", "unconfirmed"],
      ["orientation", "gate", "vertical/overhead (HB thixotropic)"],
      ["substrate_prep", "gate", "ssd_porous/dense_smooth (Nitobond SBR/EP)"],
      ["min_layer_mm", "rank", "null (unconfirmed)"],
      ["max_layer_mm", "rank", "null (unconfirmed — HB layer TODO)"],
      ["compressive_28d_mpa", "rank", "null (unconfirmed)"],
      ["chemistry", "tag", "polymer_modified_cementitious"],
      ["en1504_class", "tag", "unconfirmed"],
      ["primer", "meta", "nitobond_sbr (porous) / nitobond_ep (dense)"],
      ["pack_size", "meta", "null (unconfirmed)"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "fosroc_renderoc_series",
      gates: { structural_demand: "structural", setting: "normal_set", exposure_max: "unconfirmed", orientation: "vertical/overhead", substrate_prep: "ssd_porous_or_dense" },
      tag: { chemistry: "polymer_modified_cementitious", en1504_class: "unconfirmed" },
      rank: { min_layer_mm: null, max_layer_mm: null, compressive_28d_mpa: null },
      meta: { primer: "nitobond_sbr_or_ep", pack_size: null, alternative_product: "renderoc_fc (cosmetic)", data_status: "verified", selectable: true, source: "parchem.com.au Renderoc HB/FC; Renderoc LA high-build name unverified", confirmed_date: null },
    },
  },
  "Mapei Mapegrout Series — Mapegrout Thixotropic / Mapegrout SFR / Mapegrout Fine Fibre": {
    rows: [
      ["structural_demand", "gate", "structural"],
      ["setting", "gate", "normal_set"],
      ["exposure_max", "gate", "unconfirmed"],
      ["orientation", "gate", "vertical/overhead (Thixotropic)"],
      ["substrate_prep", "gate", "ssd_porous/dense_smooth (Planicrete AC/Eporip)"],
      ["min_layer_mm", "rank", "10 (Thixotropic)"],
      ["max_layer_mm", "rank", "40 (Thixotropic); SFR greater (unconfirmed)"],
      ["compressive_28d_mpa", "rank", "null (unconfirmed)"],
      ["chemistry", "tag", "polymer_modified_cementitious"],
      ["en1504_class", "tag", "unconfirmed (Mapei AU TDS access-restricted)"],
      ["primer", "meta", "planicrete_ac (slurry) / eporip (epoxy)"],
      ["pack_size", "meta", "25kg"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "mapei_mapegrout_series",
      gates: { structural_demand: "structural", setting: "normal_set", exposure_max: "unconfirmed", orientation: "vertical/overhead", substrate_prep: "ssd_porous_or_dense" },
      tag: { chemistry: "polymer_modified_cementitious", en1504_class: "unconfirmed" },
      rank: { min_layer_mm: 10, max_layer_mm: 40, compressive_28d_mpa: null },
      meta: { primer: "planicrete_ac_or_eporip", pack_size: "25kg", alternative_product: "mapegrout_fine_fibre (cosmetic)", data_status: "verified", selectable: true, source: "mapei.com/au Mapegrout Thixotropic/SFR/Fine Fibre — AU TDS to confirm", confirmed_date: null },
    },
  },
  "Fosroc Renderoc G": {
    rows: [
      ["structural_demand", "gate", "unconfirmed"],
      ["setting", "gate", "normal_set"],
      ["exposure_max", "gate", "unconfirmed"],
      ["orientation", "gate", "unconfirmed"],
      ["substrate_prep", "gate", "exposed_rebar (rebar primer typically)"],
      ["min_layer_mm", "rank", "null (unconfirmed)"],
      ["max_layer_mm", "rank", "null (unconfirmed)"],
      ["compressive_28d_mpa", "rank", "null (unconfirmed)"],
      ["chemistry", "tag", "polymer_modified_cementitious"],
      ["en1504_class", "tag", "unconfirmed"],
      ["primer", "meta", "nitoprime_zincrich (rebar) — confirm"],
      ["pack_size", "meta", "null (unconfirmed)"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "fosroc_renderoc_g",
      gates: { structural_demand: "unconfirmed", setting: "normal_set", exposure_max: "unconfirmed", orientation: "unconfirmed", substrate_prep: "exposed_rebar" },
      tag: { chemistry: "polymer_modified_cementitious", en1504_class: "unconfirmed" },
      rank: { min_layer_mm: null, max_layer_mm: null, compressive_28d_mpa: null },
      meta: { primer: "nitoprime_zincrich", pack_size: null, alternative_product: null, data_status: "verified", selectable: true, source: "parchem.com.au Fosroc Renderoc G — formulation/availability to confirm", confirmed_date: null },
    },
  },
};

export function RepairMortarsPMIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are polymer-modified repair mortars?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Polymer-modified cementitious repair mortars are the standard material for concrete spalling repair in Australian remedial building practice. They consist of a dry-mix blend of cement, aggregate, and pre-incorporated polymer (typically acrylic or SBR) that is mixed with clean water on site. The polymer component improves adhesion to prepared concrete, reduces shrinkage during curing, and provides better resistance to cracking compared to plain sand-cement mortar mixes.
        </p>
        {expanded && (
          <>
            <p>
              These mortars are classified under EN 1504-3 (Products and Systems for the Protection and Repair of Concrete Structures) — Class R3 is the minimum specification for structural repairs where the mortar reinstates concrete cover over reinforcement. The key product selection variables are: repair depth (general-use for up to 30–40 mm; high-build for 30–100 mm; fine mortar for cosmetic thin-section work), thixotropy (required for vertical and overhead surfaces), and primer compatibility.
            </p>
            <p>
              In Australian Class 2 strata practice, polymer-modified repair mortars are used in conjunction with substrate preparation (mechanical scarification to remove delaminated concrete, rust-affected cover, and carbonated material), corrosion treatment of exposed reinforcement (inhibitor + primer), and protective coating systems applied over the cured repair. The repair is only part of the system — without treating the underlying corrosion and protecting the repair surface against continued carbonation or chloride ingress, spalling will recur within a few years.
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

export function RepairMortarsPMProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const [activeCard, setActiveCard] = useState(0);
  // Which card sections are expanded — shared across every visible card so a
  // section opens on all cards at once and they stay aligned (subgrid).
  const [openSections, setOpenSections] = useState<Set<SectionKey>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const ALL_SECTIONS: SectionKey[] = ["props", "best", "avoid", "warn"];
  const toggleSection = (id: SectionKey) =>
    setOpenSections((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  const allOpen = openSections.size === ALL_SECTIONS.length;
  const toggleAllSections = () =>
    setOpenSections(allOpen ? new Set() : new Set(ALL_SECTIONS));

  const toggleFilter = (id: FilterTag) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // One card per individual product (never merged into a series card).
  const visibleCards = activeFilters.size === 0
    ? REF_CARDS
    : REF_CARDS.filter((c) => Array.from(activeFilters).every((f) => (c.filterTags ?? []).includes(f)));

  // Width of one card + the flex gap (gap-5 = 20px) — used by the arrows and dots.
  const cardStep = () => {
    const el = scrollRef.current;
    if (!el) return 0;
    const card = el.querySelector<HTMLElement>("[data-card]");
    return card ? card.offsetWidth + 20 : el.clientWidth / 3;
  };

  // Two cards visible → arrows page through two cards at a time.
  const scroll = (dir: "left" | "right") => {
    const step = cardStep() * 2;
    scrollRef.current?.scrollBy({ left: dir === "right" ? step : -step, behavior: "smooth" });
  };

  const scrollToCard = (i: number) => {
    scrollRef.current?.scrollTo({ left: i * cardStep(), behavior: "smooth" });
  };

  const onCarouselScroll = () => {
    const el = scrollRef.current;
    const step = cardStep();
    if (!el || !step) return;
    setActiveCard(Math.round(el.scrollLeft / step));
  };

  return (
    <>
      {/* ── Technical Accordion ── */}
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

      <AISelectionStage1 headers={AI_STAGE1.headers} rows={AI_STAGE1.rows} json={AI_STAGE1.json} />

      {/* ── Product Reference ── */}
      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">Individual polymer-modified repair mortar products — one card each — scroll to view all</p>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => {
            const active = activeFilters.has(f.id);
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => toggleFilter(f.id)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                  active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
                }`}
              >
                {f.label}
              </button>
            );
          })}
          {activeFilters.size > 0 && (
            <button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">
              Clear filters
            </button>
          )}
        </div>

        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">
            {visibleCards.length} product{visibleCards.length !== 1 ? "s" : ""} — 2 visible, scroll for more
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleAllSections}
              className="mr-1 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-600 shadow-sm transition hover:border-sky-300 hover:text-sky-950"
            >
              {allOpen ? "Collapse all" : "Expand all"}
            </button>
            <button onClick={() => scroll("left")} aria-label="Scroll left" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => scroll("right")} aria-label="Scroll right" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={onCarouselScroll}
          className="grid grid-flow-col gap-x-5 gap-y-0 overflow-x-auto pb-4 scroll-smooth"
          style={{
            gridTemplateRows: "repeat(9, auto)",
            gridAutoColumns: "max(340px, calc(50% - 10px))",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          } as React.CSSProperties}
        >
          {visibleCards.map((card) => (
            <PMSpecCard key={card.rangeName} card={card} open={openSections} onToggle={toggleSection} />
          ))}
        </div>

        {/* Scroll indicator dots */}
        {visibleCards.length > 1 && (
          <div className="mt-1 flex flex-wrap items-center justify-center gap-2">
            {visibleCards.map((card, i) => (
              <button
                key={card.rangeName}
                type="button"
                onClick={() => scrollToCard(i)}
                aria-label={`Go to card ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === activeCard ? "w-6 bg-sky-900" : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── System Comparison ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of polymer-modified repair mortar ranges. Confirm all product selections against the current manufacturer TDS before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="w-max min-w-full border-separate border-spacing-0 text-[15px]">
            <thead>
              <tr>
                <th className="sticky left-0 z-20 whitespace-nowrap border-b border-r border-slate-200 bg-slate-100 px-4 py-3 text-left align-middle text-[14px] font-bold text-slate-900">Brand</th>
                <th className="whitespace-nowrap border-b border-r border-slate-200 bg-slate-100 px-4 py-3 text-left align-middle text-[14px] font-bold text-slate-900">General / structural mortar</th>
                <th className="whitespace-nowrap border-b border-r border-slate-200 bg-slate-100 px-4 py-3 text-left align-middle text-[14px] font-bold text-slate-900">High-build mortar</th>
                <th className="whitespace-nowrap border-b border-r border-slate-200 bg-slate-100 px-4 py-3 text-left align-middle text-[14px] font-bold text-slate-900">Fine / cosmetic mortar</th>
                <th className="whitespace-nowrap border-b border-r border-slate-200 bg-slate-100 px-4 py-3 text-left align-middle text-[14px] font-bold text-slate-900">EN 1504-3</th>
                <th className="whitespace-nowrap border-b border-r border-slate-200 bg-slate-100 px-4 py-3 text-left align-middle text-[14px] font-bold text-slate-900">Max layer</th>
                <th className="whitespace-nowrap border-b border-r border-slate-200 bg-slate-100 px-4 py-3 text-left align-middle text-[14px] font-bold text-slate-900">Primer required</th>
                <th className="whitespace-nowrap border-b border-r border-slate-200 bg-slate-100 px-4 py-3 text-left align-middle text-[14px] font-bold text-slate-900">Availability</th>
                <th className="whitespace-nowrap border-b border-slate-200 bg-slate-100 px-4 py-3 text-left align-middle text-[14px] font-bold text-slate-900">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row) => {
                const r = brandRow(row.brand);
                const cell = `whitespace-nowrap border-b border-r border-slate-200 px-4 py-3 align-middle text-[15px] font-medium text-slate-900 ${r.tint}`;
                return (
                  <tr key={row.brand}>
                    <td className={`sticky left-0 z-10 whitespace-nowrap border-b border-r border-slate-200 ${r.tint} px-4 py-3 align-middle`}>
                      <span className="flex items-center gap-2.5">
                        <span className={`h-4 w-1 shrink-0 rounded-full ${r.bar}`} />
                        <span className={`text-[15px] font-bold ${r.name}`}>{row.brand}</span>
                      </span>
                    </td>
                    <td className={cell}>{row.generalMortar}</td>
                    <td className={cell}>{row.highBuild}</td>
                    <td className={cell}>{row.fineMortar}</td>
                    <td className={cell}>{row.en1504}</td>
                    <td className={cell}>{row.maxLayer}</td>
                    <td className={cell}>{row.primer}</td>
                    <td className={cell}>{row.availability}</td>
                    <td className={`whitespace-nowrap border-b border-slate-200 px-4 py-3 align-middle text-[15px] font-medium text-slate-700 ${r.tint}`}>{row.primaryUse}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
