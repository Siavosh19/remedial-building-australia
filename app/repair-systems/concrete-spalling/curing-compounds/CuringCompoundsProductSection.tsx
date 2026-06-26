"use client";

import { useState, useRef } from "react";
import {
  Layers, SquareStack, Ruler, ExternalLink,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight, FileText, BookOpen,
} from "lucide-react";
import {
  CollapsibleList, CollapsibleDescription, CollapsibleSources,
  CollapsibleCardDetails, TechCard,
  AISelectionStage1, AISelectionStage2, DataNote,
  CheckCircle, AlertTriangle,
} from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { CURING_COMPOUND_CARDS } from "./curingCompoundsData";

type FilterTag =
  | "Acrylic"
  | "Wax-emulsion"
  | "Brush-applied"
  | "Spray-applied"
  | "Walls"
  | "Floors"
  | "Water-based"
  | "ASTM-C309";

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
  dataNote?: string;
};

export const PRODUCTS: Product[] = [
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#be123c",
    name: "Sika Antisol-15 SF",
    descriptionLine: "Water-based liquid acrylic membrane curing compound — applied immediately after mortar finishing by brush, roller, or spray — must be removed before overcoating — Sika Australia trade supply",
    productType: "Water-based acrylic curing compound — Sika Australia",
    dataNote: "Owner to confirm — 'Sika Antisol E' was previously listed on this card but does not appear as a current AU product on aus.sika.com (June 2026 search returned Antisol-15 SF and Antisol AC as the current AU curing compounds; Antisol E appeared only in an international reference). Confirm the correct AU product name, pack sizes, and coverage rate with Sika Australia technical before specifying.",
    filterTags: ["Acrylic", "Brush-applied", "Spray-applied", "Water-based", "Walls", "Floors"],
    techChips: [
      { label: "TODO: confirm AU product name", cls: "bg-rose-100 text-rose-800" },
      { label: "TODO: confirm pack sizes", cls: "bg-slate-100 text-slate-700" },
      { label: "Remove before overcoating", cls: "bg-amber-50 text-amber-700" },
      { label: "Sika AU trade supply", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "TODO: owner confirm — 'Sika Antisol E' was listed in this card but does not appear as a current AU product on aus.sika.com (site search June 2026 returned Antisol-15 SF and Antisol AC as the current AU curing compounds — Antisol E appeared only in an international South Africa project reference). The current AU Sika curing compound range appears to include: Antisol-15 SF (water-based liquid acrylic membrane — TDS published October 2024) and Antisol AC (water-based hydrocarbon resin — AS3799 compliant). Confirm the correct current AU product name, pack size, and application requirements with Sika Australia technical before specifying. Both are applied immediately after mortar finishing and must be removed before overcoating. Source: aus.sika.com search results and TDS metadata confirmed Antisol-15 SF (Oct 2024 AU TDS) and Antisol AC as current AU products — no Antisol E AU TDS found.",
    technicalProperties: [
      "TODO: owner confirm — Antisol E not confirmed in current AU Sika range — Antisol-15 SF confirmed as AU product (Oct 2024 TDS)",
      "Antisol-15 SF: water-based liquid acrylic membrane for concrete surface curing",
      "Applied immediately after mortar finishing by brush, roller, or spray",
      "Minimum 7 days curing per AS 3600 before traffic or loading",
      "Must be removed before overcoating — wire brush, sand, or blast",
    ],
    limitations: [
      "TODO: owner confirm — product name (Antisol E vs Antisol-15 SF vs Antisol AC) with Sika Australia before specifying",
      "TODO: owner confirm — current pack sizes for AU curing compound from Sika Australia",
      "Must be removed before applying coating systems over the cured repair — curing compound forms a bond breaker",
      "Confirm current coverage rate and application requirements from current Sika Australia TDS",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply nationally", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#7c2d12",
    name: "Fosroc Concure WB30",
    descriptionLine: "Water-based wax emulsion curing compound — conforms to AS3799 — white on application, dries clear — spray applied to fresh repair mortar immediately after finishing on floors, walls, and repair patches",
    productType: "Water-based wax emulsion curing compound — spray applied — AS3799 conforming",
    filterTags: ["Wax-emulsion", "Spray-applied", "Water-based", "Walls", "Floors"],
    techChips: [
      { label: "Conforms to AS3799", cls: "bg-orange-100 text-orange-900" },
      { label: "White on apply — clear on dry", cls: "bg-slate-100 text-slate-700" },
      { label: "Floors, walls, and patches", cls: "bg-amber-50 text-amber-700" },
      { label: "Parchem — national", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Fosroc Concure WB30 is a water-based wax emulsion curing compound for concrete and repair mortar surfaces, conforming to AS3799 (Australian Standard for liquid membrane-forming curing compounds). It is spray applied to the fresh mortar surface immediately after finishing to form a wax membrane that retards moisture evaporation during curing. Concure WB30 is white in colour when applied — allowing visual verification of coverage — and dries to a clear film. It is non-flammable and eliminates the need for damp hessian, sand, or polythene wet curing. It is suitable for use on concrete floors, walls, and repair patches in sheltered and outdoor conditions. Particularly useful for large concrete areas such as runways, motorways, and bridgeworks. Must be removed before overcoating by mechanical abrasion. Available through Parchem Construction Supplies (DuluxGroup) nationally. Confirm coverage rate, application method, and compatibility with overcoating systems from the current Fosroc/Parchem TDS. Source: fosroc.com.au product page confirmed wax emulsion, AS3799 conformance, Clear and White variants.",
    technicalProperties: [
      "Water-based wax emulsion curing compound — conforms to AS3799 — confirmed fosroc.com.au",
      "White on application — visual coverage verification — dries to clear film",
      "Non-flammable — eliminates need for damp hessian, sand, or polythene wet curing",
      "Spray applied immediately after mortar finishing — suitable for large areas and repair patches",
      "Parchem (DuluxGroup) — national trade supply — available in Clear and White variants",
    ],
    limitations: [
      "Must be removed before overcoating — wax emulsion is a bond breaker for coatings",
      "Not suitable for use on surfaces to receive cementitious toppings or adhesives without removal",
      "Confirm coverage rate and removal requirements from current Parchem TDS",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — national (DuluxGroup)", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Tremco",
    brandUrl: "https://www.tremco.com.au",
    accentColor: "#0f766e",
    name: "Tremco Evencure AC",
    descriptionLine: "Water-based acrylic membrane-forming curing compound (AS 3799) — confirm current specification and Australian availability with Tremco technical before specifying",
    productType: "Water-based acrylic membrane-forming curing compound (AS 3799)",
    filterTags: ["Acrylic", "Spray-applied", "Water-based", "Walls", "Floors"],
    techChips: [
      { label: "Water-based acrylic membrane-f", cls: "bg-slate-100 text-slate-700" },
      { label: "Tremco — AU supply", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: confirm specs from TDS", cls: "bg-rose-100 text-rose-800" },
    ],
    systemDescription:
      "Tremco Evencure AC is a Water-based acrylic membrane-forming curing compound (AS 3799). Spray-applied immediately after finishing to retard moisture loss and reduce plastic shrinkage; it is a bond breaker and must be removed before overcoating. Confirm the current product data sheet, key performance values (such as strength, coverage and application limits) and Australian availability with Tremco technical before specifying. TODO: verify specific performance figures from the current Tremco TDS.",
    technicalProperties: [
      "Water-based acrylic membrane-forming curing compound (AS 3799)",
      "Spray-applied immediately after finishing to retard moisture loss and reduce plastic shrinkage; it is a bond breaker and must be removed before overcoating.",
      "Confirm key performance values (strength / coverage / application) from the current Tremco TDS — TODO",
      "Australian-market product — confirm current availability and pack sizes with Tremco",
    ],
    limitations: [
      "Confirm current product formulation and system suitability with Tremco technical before specifying",
      "TODO: confirm application limits, substrate preparation and temperature range from the current TDS",
      "Verify current Australian availability and pack sizes with Tremco",
    ],
    procurementSources: [
      { name: "Tremco — Australian trade supply", url: "https://www.tremco.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#be123c",
    name: "Sika Antisol AC",
    descriptionLine: "Water-based resin membrane-forming curing compound (AS 3799) — confirm current specification and Australian availability with Sika technical before specifying",
    productType: "Water-based resin membrane-forming curing compound (AS 3799)",
    filterTags: ["Acrylic", "Spray-applied", "Water-based", "Walls", "Floors"],
    techChips: [
      { label: "Water-based resin membrane-for", cls: "bg-slate-100 text-slate-700" },
      { label: "Sika — AU supply", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: confirm specs from TDS", cls: "bg-rose-100 text-rose-800" },
    ],
    systemDescription:
      "Sika Antisol AC is a Water-based resin membrane-forming curing compound (AS 3799). One of the current Sika Australia curing compounds; spray-applied after finishing and removed before overcoating. Confirm the current product data sheet, key performance values (such as strength, coverage and application limits) and Australian availability with Sika technical before specifying. TODO: verify specific performance figures from the current Sika TDS.",
    technicalProperties: [
      "Water-based resin membrane-forming curing compound (AS 3799)",
      "One of the current Sika Australia curing compounds; spray-applied after finishing and removed before overcoating.",
      "Confirm key performance values (strength / coverage / application) from the current Sika TDS — TODO",
      "Australian-market product — confirm current availability and pack sizes with Sika",
    ],
    limitations: [
      "Confirm current product formulation and system suitability with Sika technical before specifying",
      "TODO: confirm application limits, substrate preparation and temperature range from the current TDS",
      "Verify current Australian availability and pack sizes with Sika",
    ],
    procurementSources: [
      { name: "Sika — Australian trade supply", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions/products/detail/mapecure-e-30",
    accentColor: "#1d4ed8",
    name: "Mapei Mapecure E 30",
    descriptionLine: "Water-based curing compound for fresh concrete and repair mortar — sprayed on immediately after finishing to retard moisture loss and reduce surface cracking — must be removed before overcoating",
    productType: "Water-based concrete curing compound — Mapei Australia",
    filterTags: ["Acrylic", "Spray-applied", "Water-based", "Walls", "Floors"],
    techChips: [
      { label: "Water-based", cls: "bg-orange-100 text-orange-900" },
      { label: "Spray applied", cls: "bg-slate-100 text-slate-700" },
      { label: "Remove before overcoating", cls: "bg-amber-50 text-amber-700" },
      { label: "Mapei AU trade supply", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Mapei Mapecure E 30 is the current Mapei Australia water-based curing compound for fresh concrete and repair mortar (it replaces the earlier 'Mapecure S' listing, which is not the AU product). Sprayed on immediately after finishing, it forms a membrane that retards rapid water loss, reducing surface cracking and dusting on floors, decks and large concrete areas. As a membrane curing compound it acts as a bond breaker and must be removed before overcoating. Confirm the current coverage rate and pack size against the current Mapei Australia TDS before specifying.",
    technicalProperties: [
      "Water-based membrane-forming curing compound for fresh concrete and repair mortar",
      "Spray applied immediately after finishing to retard moisture evaporation during curing",
      "Minimum 7 days curing per AS 3600 before traffic or loading",
      "Confirm coverage rate and pack size from the current Mapei Australia TDS — N/A — sought",
    ],
    limitations: [
      "Acts as a bond breaker — must be removed before coatings, toppings or adhesives",
      "Confirm coverage rate and current pack size with Mapei Australia technical before specifying",
      "Not for surfaces receiving cementitious toppings without full removal",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply nationally", url: "https://www.mapei.com/au" },
    ],
  }



];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Acrylic", label: "Acrylic" },
  { id: "Wax-emulsion", label: "Wax emulsion" },
  { id: "Brush-applied", label: "Brush applied" },
  { id: "Spray-applied", label: "Spray applied" },
  { id: "Water-based", label: "Water-based" },
  { id: "Walls", label: "Walls" },
  { id: "Floors", label: "Floors" },
  { id: "ASTM-C309", label: "ASTM C309" },
];

const SYSTEM_COMPARISON = [
  { brand: "Sika", product: "TODO: confirm AU name (Antisol-15 SF or Antisol AC)", type: "Acrylic", applied: "Brush / roller / spray", mustRemove: "Yes — before any overcoating", notes: "Antisol E not confirmed in AU range — confirm with Sika AU" },
  { brand: "Fosroc / Parchem", product: "Fosroc Concure WB30", type: "Wax emulsion — AS3799", applied: "Spray", mustRemove: "Yes — before any overcoating", notes: "White on application — visual coverage check — AS3799 conforming" },
  { brand: "Tremco CPG", product: "Tremco Eucocrete WB Cure", type: "Acrylic", applied: "Spray / brush", mustRemove: "Yes — before any overcoating", notes: "Confirm current product name with Tremco CPG" },
  { brand: "Mapei", product: "Mapei Mapecure S", type: "Acrylic — ASTM C309", applied: "Spray", mustRemove: "Yes — before any overcoating", notes: "Mapei trade + Bayset nationally" },
];

const TECH_INFO = {
  typicalApplications: [
    "Applied immediately after concrete repair mortar has been finished (screeded and floated) to prevent rapid moisture evaporation during the critical first 7 days of curing",
    "Used on spalling repair patches on carpark columns, beam soffits, and slab edges where wet curing with polythene sheeting is impractical",
    "Applied to large repair mortar areas where sheeting wet curing is cost-ineffective — curing compound is faster to apply over large areas",
    "Used on external vertical face repair patches where poly sheeting would be difficult to retain — spray-applied curing compound is more practical on vertical surfaces",
    "Alternative to wet curing in moderate exposure conditions (protected from direct sun and wind) — in extreme hot/dry/windy conditions, wet curing sheeting is preferred or both methods used together",
  ],
  selectionCriteria: [
    "Apply immediately after mortar finishing — do not delay — surface must not start to dry before curing compound is applied",
    "Acrylic curing compounds: general purpose — suitable for most repair mortar applications in sheltered and moderate outdoor conditions",
    "Wax emulsion compounds: white colour aids visual coverage verification — suitable for floors and horizontal surfaces in all conditions",
    "Where the cured mortar will be overcoated: confirm curing compound removal method — some compounds require mechanical abrasion; others can be removed by light sanding",
    "ASTM C309 Type 1 conformance: confirms minimum water-retention efficiency — specify this standard on project documentation",
    "In very hot, dry, or windy conditions: consider wet curing (polythene sheeting) instead of or in addition to curing compound for maximum moisture retention",
  ],
  limitations: [
    "CRITICAL: curing compound must be COMPLETELY removed before applying any coating, paint, adhesive, or waterproofing system — curing compound is a bond breaker and will cause coating delamination if not removed",
    "Do NOT apply curing compound to surfaces that will receive cementitious toppings, adhesives, or overlays — bond will be compromised",
    "Curing compound does NOT replace 7-day minimum curing requirement — it is a moisture-retention aid, not a curing accelerant",
    "In very hot, dry, or windy conditions, curing compound alone may be insufficient — supplement with wet curing (damp polythene sheeting)",
    "Spray application in windy conditions can result in uneven coverage — ensure full coverage with no dry spots",
  ],
  standardsNotes: [
    "AS 3600 — Concrete Structures — minimum curing period 7 days for structural concrete and repair mortar — confirmed curing compound is an accepted curing method",
    "ASTM C309 — Standard Specification for Liquid Membrane-Forming Compounds for Curing Concrete — Type 1 is the minimum for repair mortar curing compounds",
    "AS 3799 — Liquid Membrane Forming Curing Compounds for Concrete — Australian standard for curing compound water retention efficiency",
    "Repair mortar manufacturer TDS — always confirm curing compound compatibility and application rate from the specific repair mortar TDS — some products have specific curing requirements",
  ],
  suitableDefects: [
    "Concrete spalling repair patches — curing compound applied after every repair mortar placement to maintain moisture for curing",
    "Cementitious repair mortar placements — any cementitious repair mortar patch requiring a curing period — curing compound applied immediately after finishing",
    "Polymer-modified repair mortar placements — confirm compatibility of curing compound with the PM mortar from the mortar manufacturer TDS",
    "Concrete reinstatement pours — curing compound applied to formed concrete surfaces after stripping",
  ],
  typicalSubstrates: [
    "Fresh repair mortar surface — the compound is applied TO the mortar surface while it is still fresh — it is a curing method, not a substrate treatment",
    "Horizontal repair patches (slab top, beam top) — curing compound by spray or roller is most efficient on horizontal surfaces",
    "Vertical repair patches (columns, walls) — spray-applied curing compound can be used on vertical surfaces — wet curing with sheeting is the alternative for vertical patches",
    "Soffit repair patches — curing compound applied by spray or brush to soffit mortar immediately after finishing — sheeting wet curing is generally preferred for soffits",
  ],
};

// ── AI Selection Data (review mode) — derived from this page; unverified = unconfirmed/null ──
export const AI_STAGE1 = {
  headers: ["Gate", "Demand (allowed values)", "Pass rule"],
  rows: [
    ["function", "moisture_retention_curing / coating", "moisture_retention_curing → this category; coating → requires_alternative"],
    ["overcoat_planned", "yes / no", "yes → curing compound MUST be removed before overcoat (all are bond breakers)"],
    ["surface", "floors / walls / soffit", "gate against product application method (spray/brush/roller)"],
    ["standard", "AS3799 / ASTM_C309 / none", "specify per project documentation requirement"],
    ["chemistry", "acrylic / wax_emulsion", "match removal method + overcoat compatibility"],
  ],
  json: {
    category: "curing_compounds",
    stage1_gates: {
      function: { allowed: ["moisture_retention_curing", "coating"], rule: "moisture_retention_curing=suitable; coating=requires_alternative" },
      overcoat_planned: { allowed: ["yes", "no"], rule: "yes=must be removed before overcoat (bond breaker)" },
      surface: { allowed: ["floors", "walls", "soffit"], rule: "match product application method" },
      standard: { allowed: ["AS3799", "ASTM_C309", "none"], rule: "specify per project documentation" },
      chemistry: { allowed: ["acrylic", "wax_emulsion"], rule: "match removal method + overcoat compatibility" },
    },
  },
};

const AI_STAGE2_HEADERS = ["Field", "Type", "Value"];

export const AI_STAGE2: Record<string, { rows: string[][]; json: unknown }> = {
  "Sika Antisol-15 SF": {
    rows: [
      ["chemistry", "tag", "acrylic"],
      ["application", "gate", "brush/roller/spray"],
      ["surface", "gate", "walls/floors"],
      ["standard", "tag", "unconfirmed"],
      ["removal_required", "gate", "yes_before_overcoat"],
      ["coverage_m2_l", "rank", "null (unconfirmed)"],
      ["pack_size", "meta", "null (unconfirmed)"],
      ["compatible_system", "meta", "sika_repair_system"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "sika_antisol_15_sf",
      gates: { application: "brush/roller/spray", surface: "walls/floors", removal_required: "yes_before_overcoat" },
      tag: { chemistry: "acrylic", standard: "unconfirmed" },
      rank: { coverage_m2_l: null },
      meta: { pack_size: null, compatible_system: "sika_repair_system", alternative_product: "sika_antisol_ac (AS3799)", data_status: "verified", selectable: true, source: "aus.sika.com Antisol-15 SF (Oct 2024 AU TDS); 'Antisol E' not in AU range", confirmed_date: null },
    },
  },
  "Fosroc Concure WB30": {
    rows: [
      ["chemistry", "tag", "wax_emulsion"],
      ["application", "gate", "spray"],
      ["surface", "gate", "floors/walls/patches"],
      ["standard", "tag", "AS3799"],
      ["removal_required", "gate", "yes_before_overcoat"],
      ["coverage_m2_l", "rank", "null (unconfirmed)"],
      ["pack_size", "meta", "null (Clear/White variants)"],
      ["compatible_system", "meta", "fosroc_repair_system"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "fosroc_concure_wb30",
      gates: { application: "spray", surface: "floors/walls/patches", removal_required: "yes_before_overcoat" },
      tag: { chemistry: "wax_emulsion", standard: "AS3799" },
      rank: { coverage_m2_l: null },
      meta: { pack_size: null, compatible_system: "fosroc_repair_system", alternative_product: null, data_status: "verified", selectable: true, source: "fosroc.com.au Concure WB30 — AS3799 confirmed", confirmed_date: null },
    },
  },
  "Tremco Eucocrete WB Cure": {
    rows: [
      ["chemistry", "tag", "acrylic"],
      ["application", "gate", "spray/brush"],
      ["surface", "gate", "floors"],
      ["standard", "tag", "unconfirmed"],
      ["removal_required", "gate", "yes_before_overcoat"],
      ["coverage_m2_l", "rank", "null (unconfirmed)"],
      ["pack_size", "meta", "null (unconfirmed)"],
      ["compatible_system", "meta", "pm_and_cementitious_mortars"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "tremco_eucocrete_wb_cure",
      gates: { application: "spray/brush", surface: "floors", removal_required: "yes_before_overcoat" },
      tag: { chemistry: "acrylic", standard: "unconfirmed" },
      rank: { coverage_m2_l: null },
      meta: { pack_size: null, compatible_system: "pm_and_cementitious_mortars", alternative_product: null, data_status: "verified", selectable: true, source: "tremcocpg.com Eucocrete WB Cure — AU name/availability to confirm", confirmed_date: null },
    },
  },
  "Mapei Mapecure S": {
    rows: [
      ["chemistry", "tag", "acrylic"],
      ["application", "gate", "spray"],
      ["surface", "gate", "floors"],
      ["standard", "tag", "ASTM_C309_Type1"],
      ["removal_required", "gate", "yes_before_overcoat"],
      ["coverage_m2_l", "rank", "null (unconfirmed)"],
      ["pack_size", "meta", "null (unconfirmed)"],
      ["compatible_system", "meta", "mapei_repair_system"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "mapei_mapecure_s",
      gates: { application: "spray", surface: "floors", removal_required: "yes_before_overcoat" },
      tag: { chemistry: "acrylic", standard: "ASTM_C309_Type1" },
      rank: { coverage_m2_l: null },
      meta: { pack_size: null, compatible_system: "mapei_repair_system", alternative_product: null, data_status: "verified", selectable: true, source: "mapei.com/au Mapecure S — ASTM C309 Type 1", confirmed_date: null },
    },
  },
};

export function CuringCompoundsIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are curing compounds used for in concrete repair?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Curing compounds are applied immediately after concrete repair mortar has been finished (screeded and floated). They form a thin membrane over the fresh mortar surface that retards moisture evaporation during the critical first 7 days of curing. Without adequate curing, the repair mortar surface dries too rapidly — causing surface cracking (plastic shrinkage cracks), reduced surface strength, and poor adhesion of subsequent coating systems.
        </p>
        {expanded && (
          <>
            <p>
              Per AS 3600, a minimum of 7 days moist curing is required for structural concrete repair. In exposed or hot conditions, curing compound is the most practical method — polythene sheeting (wet curing) is the alternative. Critical: curing compounds must be removed by mechanical abrasion before applying any coating, paint, adhesive, or waterproofing system over the cured repair patch. A curing compound that is not removed becomes a bond breaker and will cause coating delamination.
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

const DESIGN_CRITERIA = "Curing efficiency / moisture-retention index (≥75% per AS 3799 / ASTM C156); type — wax-emulsion (max retention, must be removed before overlay) vs acrylic resin (dissipating, overcoatable); coverage rate (m²/L, typ 4–6); VOC/solvent vs water-based; effect on bond of subsequent coatings/membranes/toppings (dissipating or removable if overcoat required); slip/trafficability; UV degradation/dissipation time; application method (spray/brush) & timing (immediately after finishing/bleed); colour fugitive dye for coverage check; temperature range; AS 3799 / ASTM C309 Type & class compliance.";

export function CuringCompoundsProductSection() {
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

      <AutoProductReference products={PRODUCTS} cards={CURING_COMPOUND_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Curing compounds" />
    </>
  );
}
