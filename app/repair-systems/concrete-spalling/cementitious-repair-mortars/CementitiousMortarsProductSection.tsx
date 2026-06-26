"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";
import { AISelectionStage1, AISelectionStage2, DataNote } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { CEMENTITIOUS_CARDS } from "./cementitiousData";

type FilterTag =
  | "Cementitious"
  | "General-use"
  | "Rapid-set"
  | "Site-mixed"
  | "Pre-bagged"
  | "Hand-applied"
  | "Trowel-grade"
  | "Non-structural"
  | "Budget";

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
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#be123c",
    name: "Sika MonoTop-412 NFG",
    descriptionLine: "R4 fibre-reinforced structural repair mortar with corrosion inhibitor — confirm current specification and Australian availability with Sika technical before specifying",
    productType: "R4 fibre-reinforced structural repair mortar with corrosion inhibitor",
    filterTags: ["Cementitious", "Pre-bagged", "Hand-applied", "Trowel-grade"],
    techChips: [
      { label: "R4 fibre-reinforced structural", cls: "bg-slate-100 text-slate-700" },
      { label: "Sika — AU supply", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: confirm specs from TDS", cls: "bg-rose-100 text-rose-800" },
    ],
    systemDescription:
      "Sika MonoTop-412 NFG is a R4 fibre-reinforced structural repair mortar with corrosion inhibitor. EN 1504-3 R4 structural patch repair mortar with an integral corrosion inhibitor for hand/trowel application. Confirm the current product data sheet, key performance values (such as strength, coverage and application limits) and Australian availability with Sika technical before specifying. TODO: verify specific performance figures from the current Sika TDS.",
    technicalProperties: [
      "R4 fibre-reinforced structural repair mortar with corrosion inhibitor",
      "EN 1504-3 R4 structural patch repair mortar with an integral corrosion inhibitor for hand/trowel application.",
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
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#be123c",
    name: "Sika MonoTop-352 NFG",
    descriptionLine: "R3 fibre-reinforced lightweight hand-applied repair mortar — confirm current specification and Australian availability with Sika technical before specifying",
    productType: "R3 fibre-reinforced lightweight hand-applied repair mortar",
    filterTags: ["Cementitious", "Pre-bagged", "Hand-applied", "Trowel-grade"],
    techChips: [
      { label: "R3 fibre-reinforced lightweigh", cls: "bg-slate-100 text-slate-700" },
      { label: "Sika — AU supply", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: confirm specs from TDS", cls: "bg-rose-100 text-rose-800" },
    ],
    systemDescription:
      "Sika MonoTop-352 NFG is a R3 fibre-reinforced lightweight hand-applied repair mortar. EN 1504-3 R3 lightweight fibre-reinforced repair mortar for general hand-applied patching. Confirm the current product data sheet, key performance values (such as strength, coverage and application limits) and Australian availability with Sika technical before specifying. TODO: verify specific performance figures from the current Sika TDS.",
    technicalProperties: [
      "R3 fibre-reinforced lightweight hand-applied repair mortar",
      "EN 1504-3 R3 lightweight fibre-reinforced repair mortar for general hand-applied patching.",
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
    accentColor: "#1d4ed8",
    name: "Mapei Mapegrout T60",
    descriptionLine: "R4 sulphate-resistant fibre-reinforced thixotropic repair mortar — confirm current specification and Australian availability with Mapei technical before specifying",
    productType: "R4 sulphate-resistant fibre-reinforced thixotropic repair mortar",
    filterTags: ["Cementitious", "Pre-bagged", "Hand-applied", "Trowel-grade"],
    techChips: [
      { label: "R4 sulphate-resistant fibre-re", cls: "bg-slate-100 text-slate-700" },
      { label: "Mapei — AU supply", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: confirm specs from TDS", cls: "bg-rose-100 text-rose-800" },
    ],
    systemDescription:
      "Mapei Mapegrout T60 is a R4 sulphate-resistant fibre-reinforced thixotropic repair mortar. EN 1504-3 R4 sulphate-resistant thixotropic repair mortar for structural reinstatement on vertical and overhead surfaces. Confirm the current product data sheet, key performance values (such as strength, coverage and application limits) and Australian availability with Mapei technical before specifying. TODO: verify specific performance figures from the current Mapei TDS.",
    technicalProperties: [
      "R4 sulphate-resistant fibre-reinforced thixotropic repair mortar",
      "EN 1504-3 R4 sulphate-resistant thixotropic repair mortar for structural reinstatement on vertical and overhead surfaces.",
      "Confirm key performance values (strength / coverage / application) from the current Mapei TDS — TODO",
      "Australian-market product — confirm current availability and pack sizes with Mapei",
    ],
    limitations: [
      "Confirm current product formulation and system suitability with Mapei technical before specifying",
      "TODO: confirm application limits, substrate preparation and temperature range from the current TDS",
      "Verify current Australian availability and pack sizes with Mapei",
    ],
    procurementSources: [
      { name: "Mapei — Australian trade supply", url: "https://www.mapei.com/au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions/products/detail/mapegrout-t40",
    accentColor: "#1d4ed8",
    name: "Mapei Mapegrout T40",
    descriptionLine: "Thixotropic, fibre-reinforced cementitious repair mortar — EN 1504-3 R3 (40 MPa) — hand-applied to vertical and overhead surfaces up to 30–35 mm per coat",
    productType: "R3 thixotropic fibre-reinforced cementitious repair mortar (40 MPa)",
    filterTags: ["Cementitious", "Pre-bagged", "Hand-applied", "Trowel-grade"],
    techChips: [
      { label: "EN 1504-3 R3", cls: "bg-rose-100 text-rose-800" },
      { label: "40 MPa", cls: "bg-slate-100 text-slate-700" },
      { label: "Thixotropic / fibre-reinforced", cls: "bg-slate-100 text-slate-700" },
      { label: "Mapei AU trade supply", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Mapei Mapegrout T40 is a thixotropic, fibre-reinforced cementitious repair mortar meeting EN 1504-3 Class R3 with a compressive strength of about 40 MPa, for hand-applied repair of vertical and overhead concrete surfaces such as balconies, columns and beams up to 30–35 mm per coat. Supplied in 25 kg bags. Confirm the current primer/SSD requirement, exact layer limits and rebar-protection compatibility against the current Mapei Australia TDS before specifying.",
    technicalProperties: [
      "Thixotropic, fibre-reinforced cementitious repair mortar — EN 1504-3 R3, ~40 MPa @28d",
      "Hand-applied to vertical and overhead surfaces up to 30–35 mm per coat",
      "Supplied in 25 kg bags",
      "Confirm primer/SSD prep and rebar-protection compatibility from the current Mapei Australia TDS — N/A — sought",
    ],
    limitations: [
      "Observe maximum per-coat thickness (30–35 mm) — build up in coats per the TDS",
      "Prepare substrate to SSD and confirm primer requirement with Mapei before specifying",
      "Confirm application temperature range and pack size with Mapei Australia",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply nationally", url: "https://www.mapei.com/au" },
      { name: "Bayset — national Mapei distribution", url: "https://www.bayset.com.au" },
    ],
  }





];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Cementitious", label: "Cementitious" },
  { id: "General-use", label: "General use" },
  { id: "Rapid-set", label: "Rapid-set" },
  { id: "Pre-bagged", label: "Pre-bagged" },
  { id: "Hand-applied", label: "Hand-applied" },
  { id: "Non-structural", label: "Non-structural" },
  { id: "Budget", label: "Budget tier" },
];

const SYSTEM_COMPARISON = [
  { brand: "Sika", product: "Sika MonoTop-436N", setting: "Normal-set", en1504: "R4 (confirmed aus.sika.com)", primer: "TODO: confirm from Sika AU TDS", maxLayer: "20–300 mm one pour", bestFor: "Pourable structural repair — formwork required" },
  { brand: "Ardex", product: "Ardex BR 340", setting: "Normal-set", en1504: "Confirm with Ardex TDS", primer: "TODO: confirm from Ardex AU TDS", maxLayer: "80 mm", bestFor: "High-build spall — strata and commercial" },
  { brand: "Fosroc / Parchem", product: "TODO: confirm — Renderoc GP not in AU range", setting: "Normal-set", en1504: "Confirm with Parchem TDS", primer: "Nitobond SBR", maxLayer: "Confirm TDS", bestFor: "TODO: confirm correct AU product with Parchem" },
  { brand: "Mapei", product: "Mapei Mapegrout Fast-Set", setting: "Rapid-set", en1504: "Confirm with Mapei TDS", primer: "Planicrete AC or Eporip", maxLayer: "Confirm TDS", bestFor: "Fast-track programme — carparks" },
];

const TECH_INFO = {
  typicalApplications: [
    "General concrete spalling repair on sheltered or moderate-exposure elements such as internal carpark columns, beams, and protected slab soffits",
    "Fast-track spalling repair on carpark decks and vehicle access areas where traffic reinstatement within hours is required",
    "Non-structural patch repair on concrete surfaces in areas with limited moisture and thermal exposure",
    "Repair of honeycombing and surface defects on new or existing concrete in sheltered conditions",
    "Temporary or intermediate repair prior to application of a protective coating system",
  ],
  selectionCriteria: [
    "Set time: use normal-set for general programme applications — use rapid-set only when traffic reinstatement or fast programme is required, with experienced applicators",
    "Exposure: in coastal, high-chloride, or externally exposed locations, specify a polymer-modified mortar (not a basic cementitious grade) for improved durability and lower porosity",
    "EN 1504-3 compliance: confirm class (R3/R4) for structural repairs from the current manufacturer TDS — not all cementitious repair mortars carry EN 1504-3 structural classification",
    "Primer: SBR bonding slurry is the standard primer for porous prepared concrete — epoxy bond coat is required for smooth, dense, or low-absorption substrates",
    "Cost: cementitious repair mortars are typically lower cost than fully polymer-modified grades — appropriate for budget-constrained non-critical applications at moderate exposures",
  ],
  limitations: [
    "Lower flexibility and crack resistance than polymer-modified mortars — not recommended for thermally exposed facades or high-movement locations",
    "Higher porosity than polymer-modified grades — increased risk of chloride and carbonation ingress in moderate-to-high exposure environments",
    "Rapid-setting grades require experienced applicators — premature stiffening in hot or windy conditions will reduce placement quality",
    "Bonding coat is mandatory regardless of brand — dry, dust-covered, or contaminated surfaces will prevent adequate adhesion",
    "Do not use as a cosmetic profiling mortar alone — where a smooth surface finish is required, a compatible fine finishing mortar must be applied over the cured patch",
  ],
  standardsNotes: [
    "AS 3600 — Concrete Structures — minimum cover requirements for the exposure classification must be reinstated by the repair",
    "EN 1504-3 — Products and Systems for Protection and Repair of Concrete Structures — confirm class from manufacturer TDS for structural applications",
    "ICRI 310.2 — concrete substrate preparation profile (CSP) requirements — minimum CSP 3 for cementitious repair mortars",
    "Manufacturer TDS — primer, substrate condition, layer thickness, and curing requirements are critical — always confirm from current Australian TDS",
  ],
  suitableDefects: [
    "Concrete spalling — general repair at moderate exposures where polymer-modified grade is not required",
    "Honeycombing and surface voids — non-structural patch repair in sheltered locations",
    "Minor surface deterioration — shallow patch repair prior to coating",
    "Rapid-set grade: carpark deck and ramp spalling repair where traffic reinstatement is required",
  ],
  typicalSubstrates: [
    "In-situ reinforced concrete — prepared by chipping, scabbling, or high-pressure washing to achieve CSP 3 minimum — saturated surface dry",
    "Precast concrete — same preparation as in-situ — confirm primer requirement for high-density precast",
    "Exposed reinforcement bars — must be cleaned and primed with zinc-rich or epoxy rebar primer before repair mortar application — never encapsulate unprepared corroded bars",
  ],
};

function CollapsibleList({ items, icon, limit = 3 }: { items: string[]; icon: "check" | "x"; limit?: number }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, limit);
  return (
    <div>
      <ul className="space-y-1.5">
        {visible.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
            {icon === "check" ? <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" /> : <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />}
            {item}
          </li>
        ))}
      </ul>
      {items.length > limit && (
        <button onClick={() => setExpanded((e) => !e)} className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600">
          {expanded ? "Show less ↑" : `+${items.length - limit} more ↓`}
        </button>
      )}
    </div>
  );
}

function CollapsibleSources({ sources }: { sources: { name: string; url?: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">PROCUREMENT SOURCES</p>
        <button onClick={() => setExpanded((e) => !e)} className="text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide ↑" : "See more ↓"}</button>
      </div>
      {expanded && (
        <div className="mt-2 space-y-1.5">
          {sources.map((src) => (
            <div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs">
              {src.url ? (
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">
                  {src.name} <ExternalLink size={9} className="text-slate-300" />
                </a>
              ) : <span className="font-semibold text-slate-600">{src.name}</span>}
            </div>
          ))}
        </div>
      )}
      <p className="mt-2 text-[10px] italic text-slate-400">Confirm suitability with current manufacturer TDS before specifying.</p>
    </div>
  );
}

function CollapsibleCardDetails({ text, chips }: { text: string; chips: { label: string; cls: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      {expanded && (
        <>
          <p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>
          {chips.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {chips.map((chip) => <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>)}
            </div>
          )}
        </>
      )}
      <button onClick={() => setExpanded((e) => !e)} className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600">
        {expanded ? "Hide details ↑" : "Show details ↓"}
      </button>
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>{text}</p>
      <button onClick={() => setExpanded((e) => !e)} className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900">
        {expanded ? "Show less ↑" : "Show more ↓"}
      </button>
    </div>
  );
}

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
    ["defect_type", "spalling / honeycombing / active_crack / cosmetic_only", "spalling/honeycombing → this category; active_crack → not_suitable (rigid, re-cracks); cosmetic_only → requires_alternative (fine-finish mortar)"],
    ["structural_demand", "structural / non_structural", "structural → requires EN 1504-3 R3/R4 grade"],
    ["exposure", "sheltered / moderate / coastal_high_chloride", "coastal_high_chloride → requires_alternative (polymer-modified, not basic cementitious)"],
    ["element_orientation", "horizontal / vertical / overhead / formwork_pour", "gate against product application capability"],
    ["substrate_condition", "ssd_porous / dense_smooth / exposed_rebar", "dense_smooth → epoxy bond coat; exposed_rebar → rebar primer first"],
  ],
  json: {
    category: "cementitious_repair_mortars",
    stage1_gates: {
      defect_type: { allowed: ["spalling", "honeycombing", "active_crack", "cosmetic_only"], rule: "spalling/honeycombing=suitable; active_crack=not_suitable; cosmetic_only=requires_alternative" },
      structural_demand: { allowed: ["structural", "non_structural"], rule: "structural=requires EN1504-3 R3/R4" },
      exposure: { allowed: ["sheltered", "moderate", "coastal_high_chloride"], rule: "coastal_high_chloride=requires_alternative (polymer-modified)" },
      element_orientation: { allowed: ["horizontal", "vertical", "overhead", "formwork_pour"], rule: "match product application capability" },
      substrate_condition: { allowed: ["ssd_porous", "dense_smooth", "exposed_rebar"], rule: "dense_smooth=epoxy bond coat; exposed_rebar=rebar primer first" },
    },
  },
};

const AI_STAGE2_HEADERS = ["Field", "Type", "Value"];

export const AI_STAGE2: Record<string, { rows: string[][]; json: unknown }> = {
  "Sika MonoTop-436N": {
    rows: [
      ["structural_demand", "gate", "structural"],
      ["setting", "gate", "normal_set"],
      ["exposure_max", "gate", "unconfirmed"],
      ["orientation", "gate", "formwork_pour (vertical/overhead need formwork)"],
      ["substrate_prep", "gate", "unconfirmed"],
      ["min_layer_mm", "rank", "20"],
      ["max_layer_mm", "rank", "300"],
      ["compressive_28d_mpa", "rank", "null (unconfirmed)"],
      ["chemistry", "tag", "cementitious_microconcrete"],
      ["en1504_class", "tag", "R4"],
      ["primer", "meta", "unconfirmed"],
      ["pack_size", "meta", "20kg"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "sika_monotop_436n",
      gates: { structural_demand: "structural", setting: "normal_set", exposure_max: "unconfirmed", orientation: "formwork_pour", substrate_prep: "unconfirmed" },
      tag: { chemistry: "cementitious_microconcrete", en1504_class: "R4" },
      rank: { min_layer_mm: 20, max_layer_mm: 300, compressive_28d_mpa: null },
      meta: { primer: null, pack_size: "20kg", alternative_product: null, data_status: "verified", selectable: true, source: "aus.sika.com Sika MonoTop-436N product page", confirmed_date: null },
    },
  },
  "Ardex BR 340": {
    rows: [
      ["structural_demand", "gate", "structural"],
      ["setting", "gate", "normal_set"],
      ["exposure_max", "gate", "unconfirmed"],
      ["orientation", "gate", "vertical/horizontal/overhead"],
      ["substrate_prep", "gate", "unconfirmed"],
      ["min_layer_mm", "rank", "null (unconfirmed)"],
      ["max_layer_mm", "rank", "80"],
      ["compressive_28d_mpa", "rank", "30-40"],
      ["chemistry", "tag", "polymer_modified_fibre_reinforced"],
      ["en1504_class", "tag", "unconfirmed"],
      ["primer", "meta", "unconfirmed"],
      ["pack_size", "meta", "20kg"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "ardex_br_340",
      gates: { structural_demand: "structural", setting: "normal_set", exposure_max: "unconfirmed", orientation: "vertical/horizontal/overhead", substrate_prep: "unconfirmed" },
      tag: { chemistry: "polymer_modified_fibre_reinforced", en1504_class: "unconfirmed" },
      rank: { min_layer_mm: null, max_layer_mm: 80, compressive_28d_mpa: "30-40" },
      meta: { primer: null, pack_size: "20kg", alternative_product: null, data_status: "verified", selectable: true, source: "ardexaustralia.com Ardex BR 340 product page", confirmed_date: null },
    },
  },
  "Fosroc Renderoc HB": {
    rows: [
      ["structural_demand", "gate", "unconfirmed"],
      ["setting", "gate", "unconfirmed"],
      ["exposure_max", "gate", "unconfirmed"],
      ["orientation", "gate", "unconfirmed"],
      ["substrate_prep", "gate", "unconfirmed"],
      ["min_layer_mm", "rank", "null (unconfirmed)"],
      ["max_layer_mm", "rank", "null (unconfirmed)"],
      ["compressive_28d_mpa", "rank", "null (unconfirmed)"],
      ["chemistry", "tag", "unconfirmed"],
      ["en1504_class", "tag", "unconfirmed"],
      ["primer", "meta", "null (unconfirmed)"],
      ["pack_size", "meta", "null (unconfirmed)"],
      ["data_status", "meta", "unconfirmed"],
      ["selectable", "meta", "false"],
    ],
    json: {
      id: "fosroc_renderoc_hb",
      gates: { structural_demand: "unconfirmed", setting: "unconfirmed", exposure_max: "unconfirmed", orientation: "unconfirmed", substrate_prep: "unconfirmed" },
      tag: { chemistry: "unconfirmed", en1504_class: "unconfirmed" },
      rank: { min_layer_mm: null, max_layer_mm: null, compressive_28d_mpa: null },
      meta: { primer: null, pack_size: null, alternative_product: null, data_status: "unconfirmed", selectable: false, source: "fosroc.com.au — Renderoc GP not in AU range; correct product unverified", confirmed_date: null },
    },
  },
  "Mapei Mapegrout Fast-Set": {
    rows: [
      ["structural_demand", "gate", "unconfirmed"],
      ["setting", "gate", "rapid_set"],
      ["exposure_max", "gate", "unconfirmed"],
      ["orientation", "gate", "unconfirmed"],
      ["substrate_prep", "gate", "unconfirmed"],
      ["min_layer_mm", "rank", "null (unconfirmed)"],
      ["max_layer_mm", "rank", "null (unconfirmed)"],
      ["compressive_28d_mpa", "rank", "null (unconfirmed)"],
      ["chemistry", "tag", "rapid_set_cementitious"],
      ["en1504_class", "tag", "unconfirmed"],
      ["primer", "meta", "planicrete_ac_or_eporip"],
      ["pack_size", "meta", "25kg"],
      ["data_status", "meta", "unconfirmed"],
      ["selectable", "meta", "false"],
    ],
    json: {
      id: "mapei_mapegrout_fast_set",
      gates: { structural_demand: "unconfirmed", setting: "rapid_set", exposure_max: "unconfirmed", orientation: "unconfirmed", substrate_prep: "unconfirmed" },
      tag: { chemistry: "rapid_set_cementitious", en1504_class: "unconfirmed" },
      rank: { min_layer_mm: null, max_layer_mm: null, compressive_28d_mpa: null },
      meta: { primer: "planicrete_ac_or_eporip", pack_size: "25kg", alternative_product: null, data_status: "unconfirmed", selectable: false, source: "mapei.com/au — AU availability/product name not confirmed", confirmed_date: null },
    },
  },
  "Sika MonoTop FC": {
    rows: [
      ["structural_demand", "gate", "cosmetic"],
      ["setting", "gate", "unconfirmed"],
      ["exposure_max", "gate", "unconfirmed"],
      ["orientation", "gate", "unconfirmed"],
      ["substrate_prep", "gate", "over_repaired_concrete"],
      ["min_layer_mm", "rank", "null (unconfirmed)"],
      ["max_layer_mm", "rank", "null (unconfirmed)"],
      ["compressive_28d_mpa", "rank", "null (unconfirmed)"],
      ["chemistry", "tag", "cementitious_fine_finish"],
      ["en1504_class", "tag", "unconfirmed"],
      ["primer", "meta", "null (unconfirmed)"],
      ["pack_size", "meta", "null (unconfirmed)"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "sika_monotop_fc",
      gates: { structural_demand: "cosmetic", setting: "unconfirmed", exposure_max: "unconfirmed", orientation: "unconfirmed", substrate_prep: "over_repaired_concrete" },
      tag: { chemistry: "cementitious_fine_finish", en1504_class: "unconfirmed" },
      rank: { min_layer_mm: null, max_layer_mm: null, compressive_28d_mpa: null },
      meta: { primer: null, pack_size: null, alternative_product: null, data_status: "verified", selectable: true, source: "aus.sika.com Sika MonoTop FC — formulation/system to confirm", confirmed_date: null },
    },
  },
  "Sika MonoTop-723 N": {
    rows: [
      ["structural_demand", "gate", "unconfirmed"],
      ["setting", "gate", "normal_set"],
      ["exposure_max", "gate", "unconfirmed"],
      ["orientation", "gate", "vertical/horizontal/overhead"],
      ["substrate_prep", "gate", "exposed_rebar (rebar primer first)"],
      ["min_layer_mm", "rank", "null (unconfirmed)"],
      ["max_layer_mm", "rank", "null (unconfirmed)"],
      ["compressive_28d_mpa", "rank", "null (unconfirmed)"],
      ["chemistry", "tag", "cementitious"],
      ["en1504_class", "tag", "unconfirmed"],
      ["primer", "meta", "sika_monotop-910n (rebar) — confirm"],
      ["pack_size", "meta", "null (unconfirmed)"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "sika_monotop_723n",
      gates: { structural_demand: "unconfirmed", setting: "normal_set", exposure_max: "unconfirmed", orientation: "vertical/horizontal/overhead", substrate_prep: "exposed_rebar" },
      tag: { chemistry: "cementitious", en1504_class: "unconfirmed" },
      rank: { min_layer_mm: null, max_layer_mm: null, compressive_28d_mpa: null },
      meta: { primer: "sika_monotop-910n", pack_size: null, alternative_product: null, data_status: "verified", selectable: true, source: "aus.sika.com Sika MonoTop-723 N — formulation/system to confirm", confirmed_date: null },
    },
  },
};

export function CementitiousMortarsIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are cementitious repair mortars?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Cementitious repair mortars are cement-based patch repair materials with limited or no added polymer — they rely primarily on the cementitious binder for strength and adhesion. Compared to fully polymer-modified systems, they are generally lower in cost and have higher porosity. In Australian remedial building practice, cementitious repair mortars are used where the exposure classification and project budget do not justify a fully polymer-modified system, or where a rapid-setting formulation is required for fast-track programme works.
        </p>
        {expanded && (
          <>
            <p>
              In most Class 2 strata and carpark concrete spalling repair specifications, a polymer-modified repair mortar (EN 1504-3 Class R3 or above) is specified rather than a basic cementitious grade — because polymer modification reduces porosity, improves adhesion, and reduces the risk of early shrinkage cracking. However, cementitious mortars remain appropriate for non-structural repair in sheltered environments, cosmetic patching, and time-critical applications where a rapid-setting formulation is required. In all cases, a bonding coat (SBR slurry or epoxy) must be applied to the prepared substrate before the cementitious repair mortar is placed.
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

const DESIGN_CRITERIA = "EN 1504-3 class (R1–R4) & structural vs non-structural use; compressive, flexural & bond (pull-off) strength (MPa); min & max single-layer thickness and max total build; pourable/flowable (micro-concrete) vs hand-applied trowel grade vs fine finishing grade; shrinkage class / dimensional stability & cracking resistance; fibre/polymer modification; E-modulus & thermal-expansion match to parent concrete; initial/final set & strength-gain rate (rapid vs standard); chloride/sulfate resistance & low-permeability for cover restoration to AS 3600; primer/bonding-coat & SSD saturated substrate prep; overhead/vertical sag resistance; application & curing temp range; aggregate size vs section.";

export function CementitiousMortarsProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button type="button" onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
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

      <AutoProductReference products={PRODUCTS} designCriteria={DESIGN_CRITERIA} sectionLabel="Concrete spalling" criteriaKey="concrete-spalling/cementitious-repair-mortars" cards={CEMENTITIOUS_CARDS} />
    </>
  );
}
