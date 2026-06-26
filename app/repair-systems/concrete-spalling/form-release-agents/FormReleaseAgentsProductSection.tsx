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
  | "Water-based"
  | "Solvent-based"
  | "Wax-emulsion"
  | "Mineral-oil"
  | "Spray-applied"
  | "Brush-applied"
  | "Steel-forms"
  | "Plywood-forms"
  | "Low-staining";

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
};

export const PRODUCTS: Product[] = [
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#be123c",
    name: "Sika Separol WB — Water-Based Form Release Agent",
    descriptionLine: "Water-based, low-VOC form release agent for steel and plywood formwork in concrete spalling patch repair and reinstatement",
    productType: "Water-based reactive form release agent — steel and plywood formwork",
    filterTags: ["Water-based", "Spray-applied", "Brush-applied", "Steel-forms", "Plywood-forms", "Low-staining"],
    techChips: [
      { label: "Water-based / low VOC", cls: "bg-rose-100 text-rose-800" },
      { label: "Steel and plywood forms", cls: "bg-slate-100 text-slate-700" },
      { label: "Low staining", cls: "bg-green-50 text-green-700" },
      { label: "Spray or brush applied", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Sika Separol WB is a water-based reactive form release agent used on steel and plywood formwork in concrete spalling repair reinstatement work. A form release agent is applied to the formwork surface before placing repair mortar or concrete — it creates a thin barrier film that prevents the mortar from chemically bonding to the formwork face, allowing the formwork to be stripped cleanly after the mortar has achieved sufficient strength. Sika Separol WB is a low-VOC water-based product suitable for use in enclosed environments including carparks, building interiors, and residential buildings. Apply by brush, roller, or pump spray to a clean, dry formwork face in a thin, even coat. Allow the release agent to dry before placing repair mortar — typically 15–30 minutes at 23°C. Do not allow release agent to run or puddle — pools of release agent on the lower form face cause surface defects and staining in the finished mortar. The product is reactive — it chemically bonds to the form surface and does not transfer significantly to the mortar face.",
    technicalProperties: [
      "Water-based reactive release agent — low VOC — suitable for enclosed environments",
      "For steel and plywood formwork — apply by brush, roller, or pump spray",
      "Allow to dry before placing mortar — 15–30 minutes at 23°C",
      "Low transfer to concrete face — reduces staining of finished repair mortar surface",
    ],
    limitations: [
      "Do not apply to wet formwork — water-based release agents do not adhere to wet or damp form surfaces — ensure formwork is dry before application",
      "Do not allow to puddle or pool — excess release agent on the lower face of formwork causes surface voids and blowhole staining in the finished concrete face",
      "On high-reuse steel formwork in sustained wet conditions, a single coat of water-based release agent may not provide sufficient lubrication — consult Sika technical for multi-pour applications",
      "Not suitable for porous or uncoated foam polystyrene formwork inserts — use mineral oil or a purpose-made release agent for polystyrene",
    ],
    procurementSources: [
      { name: "Sika Australia — distributed nationally via trade", url: "https://aus.sika.com" },
      { name: "Parchem Construction Supplies — nationally", url: "https://www.parchem.com.au" },
      { name: "Concrete and formwork trade suppliers nationally", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem",
    brandUrl: "https://www.fosroc.com.au",
    tdsUrl: "https://www.fosroc.com.au/sites/default/files/products_file_storage/Fosroc_Form_Release_Agent_TDS.pdf",
    accentColor: "#7c2d12",
    name: "Fosroc Form Release Agent",
    descriptionLine: "Chemical-reactive form release agent for steel, plywood and coated formwork — thin even coat by spray or brush — gives a clean strip and low staining of the concrete face",
    productType: "Chemical-reactive form release agent — steel, plywood and coated formwork",
    filterTags: ["Spray-applied", "Brush-applied", "Steel-forms", "Plywood-forms", "Low-staining"],
    techChips: [
      { label: "Chemical release agent", cls: "bg-orange-100 text-orange-900" },
      { label: "Steel / plywood / coated", cls: "bg-slate-100 text-slate-700" },
      { label: "Spray or brush", cls: "bg-slate-100 text-slate-700" },
      { label: "Parchem — national", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Fosroc Form Release Agent is the current Parchem-distributed form release agent for concrete formwork (the older Reebol WB is discontinued in Australia). It is applied as a thin, even film by spray or brush to steel, plywood and coated formwork faces before placement, giving a clean strip from the set concrete/mortar with low staining of the formed face. Confirm the current coverage rate, application method and pack size against the current Fosroc / Parchem TDS before specifying.",
    technicalProperties: [
      "Chemical-reactive form release agent for steel, plywood and coated formwork",
      "Applied as a thin even coat by spray or brush before placing concrete or repair mortar",
      "Low staining / clean strip of the formed face",
      "Confirm coverage rate and pack size from the current Fosroc / Parchem TDS — N/A — sought",
    ],
    limitations: [
      "Apply to clean, dry formwork — a thin even film only; avoid pooling",
      "Re-apply for each pour on reused formwork",
      "Confirm coverage rate and current pack size with Parchem before specifying",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — national (DuluxGroup)", url: "https://www.parchem.com.au" },
    ],
  }

];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Water-based", label: "Water-based" },
  { id: "Solvent-based", label: "Solvent / oil" },
  { id: "Wax-emulsion", label: "Wax emulsion" },
  { id: "Mineral-oil", label: "Mineral oil" },
  { id: "Spray-applied", label: "Spray applied" },
  { id: "Brush-applied", label: "Brush applied" },
  { id: "Steel-forms", label: "Steel forms" },
  { id: "Plywood-forms", label: "Plywood forms" },
  { id: "Low-staining", label: "Low staining" },
];

const SYSTEM_COMPARISON = [
  {
    product: "Sika Separol WB",
    type: "Reactive water-based",
    staining: "Very low",
    suitableforms: "Steel, plywood, coated steel",
    notes: "Best all-round for remedial — low VOC for enclosed spaces",
  },
  {
    product: "Fosroc Ronaform",
    type: "Reactive water-based",
    staining: "Very low",
    suitableforms: "Steel, plywood, coated steel",
    notes: "Good coverage rate — low transfer — for carpark and building repairs",
  },
  {
    product: "Diesel / Mineral Oil",
    type: "Non-reactive petroleum",
    staining: "High",
    suitableforms: "Steel only",
    notes: "Avoid for repairs — high staining, environmental risk, not for coated surfaces",
  },
  {
    product: "Wax Emulsion",
    type: "Physical wax film",
    staining: "Low–moderate",
    suitableforms: "Steel, plywood, FRP",
    notes: "Intermediate — lower staining than oil — less advanced than reactive products",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Boxing up slab edge repairs — apply to plywood or steel side forms before placing repair mortar",
    "Column base and pedestal formwork — apply to steel or plywood forms before casting repair concrete",
    "Beam soffit formwork — apply to soffit boxing and side forms before casting cementitious reinstatement",
    "Precast concrete element repair — apply to form faces when casting replacement sections or fins",
    "Carpark column and wall formwork — water-based release agents preferred in enclosed environments",
    "Any remedial concrete or mortar casting where clean formwork release is required without damage to the mortar surface",
  ],
  selectionCriteria: [
    "Water-based reactive (Sika Separol WB, Fosroc Ronaform) — preferred for all enclosed repair environments, where staining must be minimised, and where the repair mortar surface will be visible or will receive a coating",
    "Wax emulsion — acceptable intermediate choice where reactive products are not available — lower staining than oil",
    "Diesel / mineral oil — use only on steel formwork for rough non-visible substrates — high staining risk — not recommended for remedial repair work",
    "Plywood formwork: reactive water-based or wax emulsion only — petroleum oils damage plywood face and cause delamination",
    "In enclosed carparks and indoor environments: water-based, low-VOC products only — petroleum products create unacceptable fume exposure in enclosed spaces",
    "For architectural or exposed concrete finishes: use manufacturer-specified release agent confirmed with the concrete surface specification — test on sample area first",
  ],
  limitations: [
    "Do NOT apply release agent to reinforcement, bond faces, or substrate contact areas — release agent on bond faces will eliminate mortar adhesion — mask carefully before application",
    "Do not apply to wet formwork — water-based release agents do not bond to wet form faces and petroleum products pool on wet steel",
    "Do not allow release agent to pool or run — pools of release agent on lower form faces cause voids, bugholes, and staining in the finished mortar face",
    "Re-apply for each pour — do not assume residual release agent from a previous pour is sufficient",
    "Petroleum release agents (diesel, mineral oil) are not suitable for use in enclosed environments — use water-based products in carparks, building interiors, and any enclosed space",
    "Keep release agent off existing concrete surfaces where new repair mortar will bond — wipe up any overspray immediately",
  ],
  standardsNotes: [
    "AS 3610 — Formwork for Concrete — references release agents for use with concrete formwork — no Australian Standard specifies a particular type of form release agent for repair work",
    "Repair mortar TDS — the primary reference for form release agent compatibility — some polymer-modified mortars specify which release agents are acceptable and which will affect the mortar chemistry",
    "WorkSafe / WHS — petroleum products (diesel, mineral oil) used as release agents must be treated as hazardous chemicals — SDS required — fire risk management required",
    "Environmental management — all petroleum release agents must be managed as environmental hazards — prevent runoff to stormwater or soil — contain and dispose as regulated waste",
    "AS 1379 — Specification and supply of concrete — references formwork release requirements for fresh concrete",
  ],
  suitableDefects: [
    "Concrete spalling — any repair where formwork is used to contain repair mortar — slab edges, columns, beams, walls",
    "Slab edge deterioration — boxing up slab edges before casting repair mortar",
    "Exposed column bases — steel form boxing around column base repairs",
    "Beam soffit reinstatement — soffit and side formwork for cast mortar repair",
    "Crack filling — grouted crack repairs requiring formwork at cracks",
  ],
  typicalSubstrates: [
    "Steel formwork — the primary substrate for release agent application — reactive water-based or wax emulsion",
    "Plywood formwork (F11 structural ply) — reactive water-based or wax emulsion — petroleum oils damage ply",
    "Coated steel form panels — reactive water-based products are most compatible with coated steel panel systems",
    "FRP and fibreglass formwork — wax emulsion or reactive water-based — check with panel supplier for compatibility",
  ],
};

// ── AI Selection Data (review mode) — derived from this page; unverified = unconfirmed/null ──
export const AI_STAGE1 = {
  headers: ["Gate", "Demand (allowed values)", "Pass rule"],
  rows: [
    ["formwork_material", "steel / plywood / frp / polystyrene_foam", "polystyrene_foam → mineral-oil/purpose-made; petroleum oils damage plywood"],
    ["finish_quality", "exposed_architectural / hidden", "exposed → low-staining reactive/wax (NOT diesel/oil)"],
    ["environment", "enclosed_indoor / outdoor", "enclosed_indoor → low-VOC water-based only (no petroleum fumes)"],
    ["chemistry", "water_based_reactive / wax_emulsion / petroleum_oil", "water_based_reactive preferred; petroleum_oil last resort"],
    ["reuse", "single_pour / high_reuse", "high_reuse → confirm multi-pour suitability"],
  ],
  json: {
    category: "form_release_agents",
    stage1_gates: {
      formwork_material: { allowed: ["steel", "plywood", "frp", "polystyrene_foam"], rule: "polystyrene_foam=mineral-oil/purpose-made; oils damage plywood" },
      finish_quality: { allowed: ["exposed_architectural", "hidden"], rule: "exposed=low-staining reactive/wax; not diesel/oil" },
      environment: { allowed: ["enclosed_indoor", "outdoor"], rule: "enclosed_indoor=low-VOC water-based only" },
      chemistry: { allowed: ["water_based_reactive", "wax_emulsion", "petroleum_oil"], rule: "water_based_reactive preferred; petroleum_oil last resort" },
      reuse: { allowed: ["single_pour", "high_reuse"], rule: "high_reuse=confirm multi-pour" },
    },
  },
};

const AI_STAGE2_HEADERS = ["Field", "Type", "Value"];

export const AI_STAGE2: Record<string, { rows: string[][]; json: unknown }> = {
  "Sika Separol WB — Water-Based Form Release Agent": {
    rows: [
      ["formwork_compat", "gate", "steel/plywood"],
      ["chemistry", "tag", "water_based_reactive"],
      ["finish_quality", "gate", "exposed_ok"],
      ["voc", "gate", "low_voc"],
      ["application", "gate", "spray/brush/roller"],
      ["coverage_m2_l", "rank", "null (unconfirmed)"],
      ["staining_risk", "meta", "low"],
      ["supply", "meta", "sika/parchem"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "sika_separol_wb",
      gates: { formwork_compat: "steel/plywood", finish_quality: "exposed_ok", voc: "low_voc", application: "spray/brush/roller" },
      tag: { chemistry: "water_based_reactive" },
      rank: { coverage_m2_l: null },
      meta: { staining_risk: "low", supply: "sika/parchem", alternative_product: null, data_status: "verified", selectable: true, source: "aus.sika.com Sika Separol WB", confirmed_date: null },
    },
  },
  "Fosroc Ronaform — Water-Based Release Agent": {
    rows: [
      ["formwork_compat", "gate", "steel/plywood/coated_steel"],
      ["chemistry", "tag", "water_based_reactive"],
      ["finish_quality", "gate", "exposed_ok"],
      ["voc", "gate", "low_voc"],
      ["application", "gate", "spray/brush/roller"],
      ["coverage_m2_l", "rank", "30-50"],
      ["staining_risk", "meta", "low"],
      ["supply", "meta", "parchem"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "fosroc_ronaform",
      gates: { formwork_compat: "steel/plywood/coated_steel", finish_quality: "exposed_ok", voc: "low_voc", application: "spray/brush/roller" },
      tag: { chemistry: "water_based_reactive" },
      rank: { coverage_m2_l: "30-50" },
      meta: { staining_risk: "low", supply: "parchem", alternative_product: null, data_status: "verified", selectable: true, source: "parchem.com.au Fosroc Ronaform", confirmed_date: null },
    },
  },
  "Diesel Fuel / Mineral Oil — Non-Reactive Release": {
    rows: [
      ["formwork_compat", "gate", "steel_only"],
      ["chemistry", "tag", "petroleum_oil"],
      ["finish_quality", "gate", "hidden_only"],
      ["voc", "gate", "high"],
      ["application", "gate", "brush/rag"],
      ["coverage_m2_l", "rank", "null (unconfirmed)"],
      ["staining_risk", "meta", "high"],
      ["supply", "meta", "fuel/hardware"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "diesel_mineral_oil_release",
      gates: { formwork_compat: "steel_only", finish_quality: "hidden_only", voc: "high", application: "brush/rag" },
      tag: { chemistry: "petroleum_oil" },
      rank: { coverage_m2_l: null },
      meta: { staining_risk: "high", supply: "fuel/hardware", alternative_product: "water_based_reactive (preferred)", data_status: "verified", selectable: true, source: "generic site method — NOT recommended for remedial/exposed work (staining + environmental + fire risk)", confirmed_date: null },
    },
  },
  "Wax Emulsion Release Agent": {
    rows: [
      ["formwork_compat", "gate", "steel/plywood/frp"],
      ["chemistry", "tag", "wax_emulsion"],
      ["finish_quality", "gate", "exposed_ok"],
      ["voc", "gate", "low_voc"],
      ["application", "gate", "spray/brush"],
      ["coverage_m2_l", "rank", "null (unconfirmed)"],
      ["staining_risk", "meta", "low_moderate"],
      ["supply", "meta", "specialty_chemicals"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "wax_emulsion_release",
      gates: { formwork_compat: "steel/plywood/frp", finish_quality: "exposed_ok", voc: "low_voc", application: "spray/brush" },
      tag: { chemistry: "wax_emulsion" },
      rank: { coverage_m2_l: null },
      meta: { staining_risk: "low_moderate", supply: "specialty_chemicals", alternative_product: "water_based_reactive (more advanced)", data_status: "verified", selectable: true, source: "construction-chemicals.com.au wax emulsion release agent", confirmed_date: null },
    },
  },
};

export function FormReleaseAgentsIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">Form release agents in concrete spalling repair</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          A form release agent is applied to formwork before placing repair mortar or concrete to prevent the fresh mortar from bonding chemically and mechanically to the formwork face. Without a release agent, removal of formwork from set cementitious repair mortar can damage the mortar surface, spall repair edges, and leave mortar adhered to the form — making formwork reuse difficult. In enclosed environments such as carparks and building interiors, water-based, low-VOC reactive release agents are the correct product — petroleum-based alternatives (diesel fuel, mineral oil) are unsuitable due to high fume levels and staining.
        </p>
        {expanded && (
          <>
            <p>
              A reactive water-based release agent chemically bonds to the form surface and forms a thin film that provides clean release without significant transfer to the mortar face. This results in a cleaner finished mortar surface with fewer bugholes and less staining — important when the repair surface will be visible, will receive a waterproof coating, or will be painted. The key application rule is: apply to a clean, dry formwork face in a thin, even coat and allow to dry before placing mortar — excess product or wet application causes surface defects in the finished mortar.
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

const DESIGN_CRITERIA = "Reactive (chemically-active, water-based) vs non-reactive (barrier oil) type; surface-finish quality / off-form class (AS 3610 Class 1–5) & blowhole/staining control; compatibility with formwork face (steel/ply/FRP/coated) — staining/reaction risk; effect on subsequent bond — adhesives, coatings, renders, paint (must not impair); coverage rate (m²/L); VOC & WHS/environmental (water-based low-VOC preferred); application method & film thickness; reuse cycles; temperature range; rust-inhibition for steel forms; no concrete retardation/dusting";

export function FormReleaseAgentsProductSection() {
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
