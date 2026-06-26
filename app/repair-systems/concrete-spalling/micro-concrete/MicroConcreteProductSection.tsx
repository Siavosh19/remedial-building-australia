"use client";
import { useState, useRef } from "react";
import { CheckCircle, BookOpen, ExternalLink, ChevronLeft, ChevronRight, XCircle } from "lucide-react";
import { AISelectionStage1, AISelectionStage2 } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { MICRO_CONCRETE_CARDS } from "./microConcreteData";

type FilterTag = "Micro-concrete" | "High-strength" | "Free-flow" | "Pre-bagged" | "Mapei" | "Structural" | "Deep-section";
type Product = { fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string; name: string; descriptionLine: string; productType: string; filterTags: FilterTag[]; techChips: { label: string; cls: string }[]; systemDescription: string; technicalProperties: string[]; limitations: string[]; procurementSources: { name: string; url: string }[] };

export const PRODUCTS: Product[] = [
  {
    fullLabel: "Mapei",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#0284c7",
    name: "Mapei Mapefill MC 06",
    descriptionLine: "Micro-concrete for deep-section structural concrete reinstatement — self-compacting, high-strength cementitious system for heavily-damaged columns, beams, and slabs — confirm current formulation and system design with Mapei Australia technical",
    productType: "Micro-concrete — deep-section structural concrete reinstatement",
    filterTags: ["Micro-concrete", "High-strength", "Free-flow", "Pre-bagged", "Mapei", "Structural", "Deep-section"],
    techChips: [{ label: "Micro-concrete", cls: "bg-blue-100 text-blue-700" }, { label: "Self-compacting", cls: "bg-slate-100 text-slate-700" }, { label: "Deep-section", cls: "bg-slate-100 text-slate-700" }],
    systemDescription: "Mapei Mapefill MC 06 is a micro-concrete (fine-aggregate concrete) product for deep-section structural reinstatement of heavily-damaged or section-deficient concrete elements such as columns, beams, and slabs. Micro-concrete products are designed to flow into formed sections without vibration, providing high-strength structural reinstatement.\n\nMC 06 (or equivalent current product designation) is part of the Mapei structural repair range. Confirm current product technical data sheet, compressive strength class, aggregate size, flow consistency, formwork requirements, and system design with Mapei Australia technical before specifying. Confirm current Australian product name and availability with Mapei Australia or Bayset.",
    technicalProperties: [
      "Micro-concrete for deep-section structural reinstatement — suitable for columns, beams, and slabs",
      "Self-compacting formulation — flows into formed sections without vibration for deep-section applications",
      "Confirm compressive strength, aggregate size, flow, formwork requirements from current Mapei Mapefill MC 06 TDS",
    ],
    limitations: [
      "Confirm current product formulation and system design with Mapei Australia technical before specifying",
      "Structural engineer sign-off on repair design is required for structural micro-concrete applications",
      "Formwork must be adequate to contain the free-flow material during placement and curing",
      "Confirm current Australian product name and availability with Mapei Australia or Bayset before specifying",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply", url: "https://www.mapei.com/au" },
      { name: "Bayset — national Mapei distribution", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#be123c",
    name: "Sika MonoTop-436N",
    descriptionLine: "Pourable self-compacting R4 micro-concrete repair mortar — confirm current specification and Australian availability with Sika technical before specifying",
    productType: "Pourable self-compacting R4 micro-concrete repair mortar",
    filterTags: ["Micro-concrete", "Free-flow", "Pre-bagged", "Structural", "Deep-section"],
    techChips: [
      { label: "Pourable self-compacting R4 mi", cls: "bg-slate-100 text-slate-700" },
      { label: "Sika — AU supply", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: confirm specs from TDS", cls: "bg-rose-100 text-rose-800" },
    ],
    systemDescription:
      "Sika MonoTop-436N is a Pourable self-compacting R4 micro-concrete repair mortar. Pourable, self-compacting micro-concrete for deep-section structural reinstatement placed into formwork without vibration. Confirm the current product data sheet, key performance values (such as strength, coverage and application limits) and Australian availability with Sika technical before specifying. TODO: verify specific performance figures from the current Sika TDS.",
    technicalProperties: [
      "Pourable self-compacting R4 micro-concrete repair mortar",
      "Pourable, self-compacting micro-concrete for deep-section structural reinstatement placed into formwork without vibration.",
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
  }

];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [{ id: "Micro-concrete", label: "Micro-concrete" }, { id: "High-strength", label: "High-strength" }, { id: "Structural", label: "Structural" }, { id: "Deep-section", label: "Deep-section" }, { id: "Free-flow", label: "Free-flow" }];

function CollapsibleList({ items, icon, limit = 3 }: { items: string[]; icon: "check" | "x"; limit?: number }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, limit);
  return (<div><ul className="space-y-1.5">{visible.map((item, i) => <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">{icon === "check" ? <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" /> : <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />}{item}</li>)}</ul>{items.length > limit && <button onClick={() => setExpanded((e) => !e)} className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Show less ↑" : `+${items.length - limit} more ↓`}</button>}</div>);
}
function CollapsibleSources({ sources }: { sources: { name: string; url?: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (<div><div className="flex items-center justify-between"><p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">PROCUREMENT SOURCES</p><button onClick={() => setExpanded((e) => !e)} className="text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide ↑" : "See more ↓"}</button></div>{expanded && <div className="mt-2 space-y-1.5">{sources.map((src) => <div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs">{src.url ? <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">{src.name}<ExternalLink size={9} className="text-slate-300" /></a> : <span className="font-semibold text-slate-600">{src.name}</span>}</div>)}</div>}<p className="mt-2 text-[10px] italic text-slate-400">Confirm suitability with the current manufacturer TDS before specifying or applying.</p></div>);
}
function CollapsibleCardDetails({ text, chips }: { text: string; chips: { label: string; cls: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (<div>{expanded && <><p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>{chips.length > 0 && <div className="mt-2 flex flex-wrap gap-1.5">{chips.map((chip) => <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>)}</div>}</>}<button onClick={() => setExpanded((e) => !e)} className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide details ↑" : "Show details ↓"}</button></div>);
}
function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (<div><p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>{text}</p><button onClick={() => setExpanded((e) => !e)} className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900">{expanded ? "Show less ↑" : "Show more ↓"}</button></div>);
}

// ── AI Selection Data (review mode) — derived from this page; unverified = unconfirmed/null ──
export const AI_STAGE1 = {
  headers: ["Gate", "Demand (allowed values)", "Pass rule"],
  rows: [
    ["defect_type", "section_loss / deep_spall / shallow_spall / active_crack", "section_loss/deep_spall → this category; shallow_spall → trowel repair mortar; active_crack → not_suitable"],
    ["structural_demand", "structural / non_structural", "structural → engineer sign-off + EN 1504-3 grade"],
    ["placement", "formwork_pour / trowel", "micro-concrete is formwork_pour/self-compacting; trowel-only repairs → standard mortar"],
    ["element_orientation", "horizontal / vertical / overhead", "gate against product application capability (formwork required)"],
    ["substrate_condition", "ssd_porous / dense_smooth / exposed_rebar", "dense_smooth → epoxy bond coat; exposed_rebar → rebar primer first"],
  ],
  json: {
    category: "micro_concrete",
    stage1_gates: {
      defect_type: { allowed: ["section_loss", "deep_spall", "shallow_spall", "active_crack"], rule: "section_loss/deep_spall=suitable; shallow_spall=requires_alternative (trowel mortar); active_crack=not_suitable" },
      structural_demand: { allowed: ["structural", "non_structural"], rule: "structural=engineer sign-off + EN1504-3 grade" },
      placement: { allowed: ["formwork_pour", "trowel"], rule: "micro-concrete=formwork_pour/self-compacting" },
      element_orientation: { allowed: ["horizontal", "vertical", "overhead"], rule: "match product application capability (formwork required)" },
      substrate_condition: { allowed: ["ssd_porous", "dense_smooth", "exposed_rebar"], rule: "dense_smooth=epoxy bond coat; exposed_rebar=rebar primer first" },
    },
  },
};

const AI_STAGE2_HEADERS = ["Field", "Type", "Value"];

export const AI_STAGE2: Record<string, { rows: string[][]; json: unknown }> = {
  "Mapei Mapefill MC 06": {
    rows: [
      ["structural_demand", "gate", "structural"],
      ["placement", "gate", "formwork_pour"],
      ["exposure_max", "gate", "unconfirmed"],
      ["orientation", "gate", "unconfirmed"],
      ["substrate_prep", "gate", "unconfirmed"],
      ["min_layer_mm", "rank", "null (unconfirmed)"],
      ["max_layer_mm", "rank", "null (unconfirmed)"],
      ["compressive_28d_mpa", "rank", "null (unconfirmed)"],
      ["chemistry", "tag", "cementitious_microconcrete"],
      ["en1504_class", "tag", "unconfirmed"],
      ["primer", "meta", "null (unconfirmed)"],
      ["pack_size", "meta", "null (unconfirmed)"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "mapei_mapefill_mc_06",
      gates: { structural_demand: "structural", placement: "formwork_pour", exposure_max: "unconfirmed", orientation: "unconfirmed", substrate_prep: "unconfirmed" },
      tag: { chemistry: "cementitious_microconcrete", en1504_class: "unconfirmed" },
      rank: { min_layer_mm: null, max_layer_mm: null, compressive_28d_mpa: null },
      meta: { primer: null, pack_size: null, alternative_product: null, data_status: "verified", selectable: true, source: "mapei.com/au Mapei Mapefill MC 06 — name/availability to confirm", confirmed_date: null },
    },
  },
};

export function MicroConcreteIntroSection() {
  return (<div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"><div className="mb-4 flex items-center gap-2.5"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div><h3 className="text-base font-extrabold text-sky-950">Micro-concrete</h3></div><p className="text-sm leading-7 text-slate-600">Micro-concrete products are fine-aggregate, self-compacting cementitious systems for deep-section structural reinstatement of heavily-damaged concrete elements such as columns, beams, and slabs. Unlike trowel-grade repair mortars, micro-concrete flows into formed sections without vibration.</p></div>);
}

const DESIGN_CRITERIA = "Aggregate-containing flowable micro-concrete for deep/full-depth structural reinstatement; min & max section thickness (typ 25\u2013500 mm, deeper than mortars) & cover; compressive/flexural/tensile bond strength (MPa) & class to EN 1504-3 (R4 structural); flow/self-compacting vs pourable (formwork & congested reinforcement); shrinkage compensation / non-shrink (free expansion class); E-modulus & thermal compatibility with parent concrete; chloride/sulfate resistance & low permeability; aggregate size vs reinforcement spacing & cover; placement (pump/pour into formwork); set/strength gain time & application temp; primer/SSD bond-coat requirement; AS 3600 cover/durability.";

export function MicroConcreteProductSection() {
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);
  const toggleFilter = (id: FilterTag) => { setActiveFilters((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; }); };
  const visibleProducts = activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));
  const scroll = (dir: "left" | "right") => { scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" }); };
  return (
    <AutoProductReference products={PRODUCTS} cards={MICRO_CONCRETE_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Micro-concrete" />
  );
}
