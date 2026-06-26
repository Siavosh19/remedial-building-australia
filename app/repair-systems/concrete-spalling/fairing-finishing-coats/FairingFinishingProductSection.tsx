"use client";
import { useState, useRef } from "react";
import { CheckCircle, BookOpen, ExternalLink, ChevronLeft, ChevronRight, XCircle } from "lucide-react";
import { AISelectionStage1, AISelectionStage2 } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { FAIRING_FINISHING_CARDS } from "./fairingFinishingData";

type FilterTag = "Fairing-coat" | "Finishing-coat" | "Cementitious" | "Pre-bagged" | "Hand-applied" | "Westox" | "Fine-finish";
type Product = { fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string; name: string; descriptionLine: string; productType: string; filterTags: FilterTag[]; techChips: { label: string; cls: string }[]; systemDescription: string; technicalProperties: string[]; limitations: string[]; procurementSources: { name: string; url: string }[] };

export const PRODUCTS: Product[] = [
  {
    fullLabel: "Westox",
    brandUrl: "https://www.westox.com.au",
    accentColor: "#64748b",
    name: "Westox Plastalite Fairing Coat Part A 15kg",
    descriptionLine: "Fairing and finishing coat for concrete surfaces — thin-section surface profiling and texture restoration after spalling repair — confirm current formulation, coverage, and system specifications with Westox technical",
    productType: "Fairing coat — surface profiling and finishing after concrete repair",
    filterTags: ["Fairing-coat", "Finishing-coat", "Cementitious", "Pre-bagged", "Hand-applied", "Westox", "Fine-finish"],
    techChips: [{ label: "Fairing coat", cls: "bg-slate-100 text-slate-700" }, { label: "Fine finish", cls: "bg-slate-100 text-slate-700" }, { label: "Pre-bagged", cls: "bg-slate-100 text-slate-700" }],
    systemDescription: "Westox Plastalite Fairing Coat Part A is a thin-section fairing and finishing coat for concrete surfaces after spalling repair. Fairing coats are used to restore surface texture and profile after structural repair mortar application, filling minor surface imperfections, bug holes, and form face irregularities to provide a smooth, even surface suitable for subsequent coating or exposure.\n\nFairing coats are not structural repair products — they are cosmetic finishing layers applied over an already structurally repaired and cured substrate.\n\nConfirm current product technical data sheet, water ratio, maximum application thickness, coverage, and compatible base layer from current Westox Plastalite Fairing Coat TDS before specifying.",
    technicalProperties: [
      "Thin-section fairing coat — for surface profiling and finishing over structurally repaired concrete",
      "Fills minor surface imperfections, bug holes, and form face irregularities after structural repair",
      "Confirm water ratio, maximum thickness, coverage, and compatible base from current Westox Plastalite Fairing Coat Part A TDS",
    ],
    limitations: [
      "Confirm current product formulation and system specifications with Westox technical before specifying",
      "Not a structural repair product — must only be applied over sound, structurally repaired concrete substrate",
      "Confirm current Australian product availability and whether Part A requires a companion Part B with Westox before specifying",
    ],
    procurementSources: [{ name: "Westox — contact for trade supply", url: "https://www.westox.com.au" }],
  },
  {
    fullLabel: "Fosroc / Parchem",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#7c2d12",
    name: "Fosroc Renderoc FC",
    descriptionLine: "Cementitious fairing coat (<=3 mm) for fair-faced finish — confirm current specification and Australian availability with Fosroc technical before specifying",
    productType: "Cementitious fairing coat (<=3 mm) for fair-faced finish",
    filterTags: ["Fairing-coat", "Finishing-coat", "Cementitious", "Pre-bagged", "Hand-applied", "Fine-finish"],
    techChips: [
      { label: "Cementitious fairing coat", cls: "bg-slate-100 text-slate-700" },
      { label: "Fosroc — AU supply", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: confirm specs from TDS", cls: "bg-rose-100 text-rose-800" },
    ],
    systemDescription:
      "Fosroc Renderoc FC is a Cementitious fairing coat (<=3 mm) for fair-faced finish. Thin cosmetic fairing coat to blowhole-fill and level a completed structural repair before a protective coating. Confirm the current product data sheet, key performance values (such as strength, coverage and application limits) and Australian availability with Fosroc technical before specifying. TODO: verify specific performance figures from the current Fosroc TDS.",
    technicalProperties: [
      "Cementitious fairing coat (<=3 mm) for fair-faced finish",
      "Thin cosmetic fairing coat to blowhole-fill and level a completed structural repair before a protective coating.",
      "Confirm key performance values (strength / coverage / application) from the current Fosroc TDS — TODO",
      "Australian-market product — confirm current availability and pack sizes with Fosroc",
    ],
    limitations: [
      "Confirm current product formulation and system suitability with Fosroc technical before specifying",
      "TODO: confirm application limits, substrate preparation and temperature range from the current TDS",
      "Verify current Australian availability and pack sizes with Fosroc",
    ],
    procurementSources: [
      { name: "Fosroc — Australian trade supply", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#1d4ed8",
    name: "Mapei Mapefinish",
    descriptionLine: "Two-component cementitious fairing / finishing coat — confirm current specification and Australian availability with Mapei technical before specifying",
    productType: "Two-component cementitious fairing / finishing coat",
    filterTags: ["Fairing-coat", "Finishing-coat", "Cementitious", "Pre-bagged", "Hand-applied", "Fine-finish"],
    techChips: [
      { label: "Two-component cementitious fai", cls: "bg-slate-100 text-slate-700" },
      { label: "Mapei — AU supply", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: confirm specs from TDS", cls: "bg-rose-100 text-rose-800" },
    ],
    systemDescription:
      "Mapei Mapefinish is a Two-component cementitious fairing / finishing coat. Two-component skim coat for fine finishing and levelling of repaired concrete before coating. Confirm the current product data sheet, key performance values (such as strength, coverage and application limits) and Australian availability with Mapei technical before specifying. TODO: verify specific performance figures from the current Mapei TDS.",
    technicalProperties: [
      "Two-component cementitious fairing / finishing coat",
      "Two-component skim coat for fine finishing and levelling of repaired concrete before coating.",
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
  }


];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [{ id: "Fairing-coat", label: "Fairing coat" }, { id: "Finishing-coat", label: "Finishing coat" }, { id: "Fine-finish", label: "Fine finish" }, { id: "Cementitious", label: "Cementitious" }, { id: "Pre-bagged", label: "Pre-bagged" }];

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
    ["function", "cosmetic_profiling / structural_repair", "cosmetic_profiling → this category; structural_repair → requires_alternative (repair mortar)"],
    ["substrate", "structurally_repaired_cured / unrepaired", "unrepaired → not_suitable (complete structural repair first)"],
    ["thickness", "thin_section / build_up", "thin-section only; build-up → use repair mortar"],
    ["chemistry", "cementitious / polymer", "match base repair + coating system"],
    ["finish_intent", "for_coating / exposed", "confirm finish is compatible with specified topcoat"],
  ],
  json: {
    category: "fairing_finishing_coats",
    stage1_gates: {
      function: { allowed: ["cosmetic_profiling", "structural_repair"], rule: "cosmetic_profiling=suitable; structural_repair=requires_alternative" },
      substrate: { allowed: ["structurally_repaired_cured", "unrepaired"], rule: "unrepaired=not_suitable" },
      thickness: { allowed: ["thin_section", "build_up"], rule: "thin-section only; build_up=repair mortar" },
      chemistry: { allowed: ["cementitious", "polymer"], rule: "match base repair + coating system" },
      finish_intent: { allowed: ["for_coating", "exposed"], rule: "confirm finish compatible with topcoat" },
    },
  },
};

const AI_STAGE2_HEADERS = ["Field", "Type", "Value"];

export const AI_STAGE2: Record<string, { rows: string[][]; json: unknown }> = {
  "Westox Plastalite Fairing Coat Part A 15kg": {
    rows: [
      ["function", "gate", "cosmetic_profiling"],
      ["structural", "gate", "non_structural"],
      ["substrate_target", "gate", "structurally_repaired_cured"],
      ["thickness", "gate", "thin_section"],
      ["chemistry", "tag", "cementitious_fine_finish"],
      ["max_thickness_mm", "rank", "null (unconfirmed)"],
      ["pack_size", "meta", "15kg (Part A; Part B TBC)"],
      ["compatible_system", "meta", "westox_repair (confirm)"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "westox_plastalite_fairing_coat_a",
      gates: { function: "cosmetic_profiling", structural: "non_structural", substrate_target: "structurally_repaired_cured", thickness: "thin_section" },
      tag: { chemistry: "cementitious_fine_finish" },
      rank: { max_thickness_mm: null },
      meta: { pack_size: "15kg", compatible_system: "westox_repair", alternative_product: null, data_status: "verified", selectable: true, source: "westox.com.au Westox Plastalite Fairing Coat Part A — Part B requirement to confirm", confirmed_date: null },
    },
  },
};

export function FairingFinishingIntroSection() {
  return (<div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"><div className="mb-4 flex items-center gap-2.5"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div><h3 className="text-base font-extrabold text-sky-950">Fairing &amp; finishing coats</h3></div><p className="text-sm leading-7 text-slate-600">Fairing and finishing coats are thin-section cementitious products applied over structurally repaired concrete to restore surface texture and profile, filling minor surface imperfections, bug holes, and form face irregularities. They are cosmetic finishing layers, not structural repair products, selected on maximum thickness, fineness of finish and overcoat compatibility.</p></div>);
}

const DESIGN_CRITERIA = "Max applied thickness (typ. 1\u20133 mm feather-edge to fill bug-holes/pinholes) & min layer; bond strength to parent concrete & repair mortar (MPa, EN 1504-3 R-class context); compatibility/E-modulus & thermal match with substrate and underlying repair mortar; shrinkage class (low/non-shrink); carbonation resistance & permeability (suitability as part of EN 1504-2 protection); polymer-modified for flexibility & adhesion; surface finish/closed texture for subsequent coating; open time & overcoat window before protective coating; primer/SSD prep; application temperature range.";

export function FairingFinishingProductSection() {
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);
  const toggleFilter = (id: FilterTag) => { setActiveFilters((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; }); };
  const visibleProducts = activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));
  const scroll = (dir: "left" | "right") => { scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" }); };
  return (
    <AutoProductReference products={PRODUCTS} cards={FAIRING_FINISHING_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Fairing & finishing coats" />
  );
}
