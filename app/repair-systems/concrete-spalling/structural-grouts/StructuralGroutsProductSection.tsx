"use client";
import { useState, useRef } from "react";
import { CheckCircle, BookOpen, ExternalLink, ChevronLeft, ChevronRight, XCircle } from "lucide-react";
import { AISelectionStage1, AISelectionStage2 } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { STRUCTURAL_GROUT_CARDS } from "./structuralGroutsData";

type FilterTag = "Structural-grout" | "Cementitious" | "Non-shrink" | "Free-flow" | "Pre-bagged" | "Mapei" | "High-strength" | "Rapid-set";
type Product = { fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string; name: string; descriptionLine: string; productType: string; filterTags: FilterTag[]; techChips: { label: string; cls: string }[]; systemDescription: string; technicalProperties: string[]; limitations: string[]; procurementSources: { name: string; url: string }[] };

export const PRODUCTS: Product[] = [
  {
    fullLabel: "Mapei",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#0284c7",
    name: "Mapei Mapefill SP",
    descriptionLine: "Non-shrink cementitious structural grout for column bases, machinery bases, post-tensioning voids, and structural anchor installations — confirm current formulation, flow consistency, and system design with Mapei Australia technical",
    productType: "Non-shrink cementitious structural grout — column bases and machinery",
    filterTags: ["Structural-grout", "Cementitious", "Non-shrink", "Free-flow", "Pre-bagged", "Mapei"],
    techChips: [{ label: "Non-shrink", cls: "bg-blue-100 text-blue-700" }, { label: "Structural grout", cls: "bg-slate-100 text-slate-700" }, { label: "Free-flow", cls: "bg-slate-100 text-slate-700" }],
    systemDescription: "Mapei Mapefill SP is a non-shrink cementitious structural grout for column base plates, machinery bases, post-tensioning duct grouting, structural anchor installations, and void filling in concrete structures. Non-shrink grouts are formulated to maintain or expand slightly during curing to ensure full contact and load transfer between the grout and the bearing surface.\n\nMapefill SP is part of the Mapei structural repair and grouting range. Confirm current product technical data sheet, water ratio for required flow consistency, compressive strength class, maximum pour depth, and system design with Mapei Australia technical before specifying.",
    technicalProperties: [
      "Non-shrink cementitious grout — maintains full contact with bearing surface during curing through controlled expansion",
      "Suitable for column bases, machinery bases, post-tensioning voids, and anchor installations",
      "Confirm water ratio for required flow, compressive strength, and pour depth from current Mapei Mapefill SP TDS",
    ],
    limitations: [
      "Confirm current product formulation and system design with Mapei Australia technical before specifying",
      "Water-powder ratio controls flow consistency — excess water reduces strength — mix precisely to TDS specification",
      "Not suitable for application in temperatures below +5°C or above +35°C without cold/hot weather precautions — confirm with Mapei",
      "Confirm current Australian product availability with Mapei Australia or Bayset before specifying",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply", url: "https://www.mapei.com/au" },
      { name: "Bayset — national Mapei distribution", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Mapei",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#0284c7",
    name: "Mapei Mapefill HES",
    descriptionLine: "High early-strength non-shrink cementitious grout for rapid structural grouting and early load reinstatement — confirm current formulation, strength development, and system design with Mapei Australia technical",
    productType: "High early-strength non-shrink grout — rapid structural grouting",
    filterTags: ["Structural-grout", "Cementitious", "Non-shrink", "Free-flow", "Pre-bagged", "Mapei", "Rapid-set", "High-strength"],
    techChips: [{ label: "High early-strength", cls: "bg-blue-100 text-blue-700" }, { label: "Non-shrink", cls: "bg-slate-100 text-slate-700" }, { label: "Rapid", cls: "bg-slate-100 text-slate-700" }],
    systemDescription: "Mapei Mapefill HES is a high early-strength non-shrink cementitious grout for structural grouting applications where rapid strength development and early load reinstatement are required — such as column base grouting in construction programs with tight schedules, machinery reinstatement, or where temporary works need to be removed quickly.\n\nHES (High Early Strength) formulations achieve higher strength at early ages compared to standard non-shrink grouts. Confirm current product technical data sheet, early and long-term compressive strength, water ratio, pour depth, and system design with Mapei Australia technical before specifying.",
    technicalProperties: [
      "High early-strength non-shrink cementitious grout — for rapid structural grouting and early load reinstatement",
      "Suitable for column bases, machinery bases, and structural anchor installations requiring early strength",
      "Confirm early strength values, water ratio, pour depth, and system design from current Mapei Mapefill HES TDS",
    ],
    limitations: [
      "Confirm current product formulation and system design with Mapei Australia technical before specifying",
      "Rapid strength development may reduce working time — confirm pot life and workability window for site conditions",
      "Not suitable for application in temperatures below +5°C without cold weather precautions — confirm with Mapei",
      "Confirm current Australian product availability and whether Mapefill HES is the current product name with Mapei Australia or Bayset",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply", url: "https://www.mapei.com/au" },
      { name: "Bayset — national Mapei distribution", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#7c2d12",
    name: "Fosroc Conbextra GP",
    descriptionLine: "General-purpose shrinkage-compensated cementitious grout (~65 MPa) — confirm current specification and Australian availability with Fosroc technical before specifying",
    productType: "General-purpose shrinkage-compensated cementitious grout (~65 MPa)",
    filterTags: ["Structural-grout", "Cementitious", "Non-shrink", "Free-flow", "Pre-bagged"],
    techChips: [
      { label: "General-purpose shrinkage-comp", cls: "bg-slate-100 text-slate-700" },
      { label: "Fosroc — AU supply", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: confirm specs from TDS", cls: "bg-rose-100 text-rose-800" },
    ],
    systemDescription:
      "Fosroc Conbextra GP is a General-purpose shrinkage-compensated cementitious grout (~65 MPa). Free-flow grout for base plates, anchors and void filling where dimensional stability and load transfer are required. Confirm the current product data sheet, key performance values (such as strength, coverage and application limits) and Australian availability with Fosroc technical before specifying. TODO: verify specific performance figures from the current Fosroc TDS.",
    technicalProperties: [
      "General-purpose shrinkage-compensated cementitious grout (~65 MPa)",
      "Free-flow grout for base plates, anchors and void filling where dimensional stability and load transfer are required.",
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
    fullLabel: "Fosroc / Parchem",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#7c2d12",
    name: "Fosroc Conbextra HF",
    descriptionLine: "High-flow dual-expansion cementitious precision grout — confirm current specification and Australian availability with Fosroc technical before specifying",
    productType: "High-flow dual-expansion cementitious precision grout",
    filterTags: ["Structural-grout", "Cementitious", "Non-shrink", "Free-flow", "Pre-bagged", "High-strength"],
    techChips: [
      { label: "High-flow dual-expansion cemen", cls: "bg-slate-100 text-slate-700" },
      { label: "Fosroc — AU supply", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: confirm specs from TDS", cls: "bg-rose-100 text-rose-800" },
    ],
    systemDescription:
      "Fosroc Conbextra HF is a High-flow dual-expansion cementitious precision grout. High-flow precision grout for congested base plates and deeper pours requiring controlled expansion. Confirm the current product data sheet, key performance values (such as strength, coverage and application limits) and Australian availability with Fosroc technical before specifying. TODO: verify specific performance figures from the current Fosroc TDS.",
    technicalProperties: [
      "High-flow dual-expansion cementitious precision grout",
      "High-flow precision grout for congested base plates and deeper pours requiring controlled expansion.",
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
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#be123c",
    name: "Sika SikaGrout-212 HP",
    descriptionLine: "Non-shrink dual-expansion high-performance cementitious structural grout — confirm current specification and Australian availability with Sika technical before specifying",
    productType: "Non-shrink dual-expansion high-performance cementitious structural grout",
    filterTags: ["Structural-grout", "Cementitious", "Non-shrink", "Free-flow", "Pre-bagged", "High-strength"],
    techChips: [
      { label: "Non-shrink dual-expansion high", cls: "bg-slate-100 text-slate-700" },
      { label: "Sika — AU supply", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: confirm specs from TDS", cls: "bg-rose-100 text-rose-800" },
    ],
    systemDescription:
      "Sika SikaGrout-212 HP is a Non-shrink dual-expansion high-performance cementitious structural grout. Non-shrink high-performance grout for structural base plates, anchors and machinery bases. Confirm the current product data sheet, key performance values (such as strength, coverage and application limits) and Australian availability with Sika technical before specifying. TODO: verify specific performance figures from the current Sika TDS.",
    technicalProperties: [
      "Non-shrink dual-expansion high-performance cementitious structural grout",
      "Non-shrink high-performance grout for structural base plates, anchors and machinery bases.",
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

const FILTER_DEFS: { id: FilterTag; label: string }[] = [{ id: "Structural-grout", label: "Structural grout" }, { id: "Non-shrink", label: "Non-shrink" }, { id: "Free-flow", label: "Free-flow" }, { id: "High-strength", label: "High-strength" }, { id: "Rapid-set", label: "Rapid-set" }];

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
    ["application", "base_plate / void_fill / anchor_install / pt_duct / surface_patch", "base_plate/void_fill/anchor/pt_duct → this category; surface_patch → requires_alternative (repair mortar)"],
    ["shrinkage_requirement", "non_shrink / standard", "load-transfer/bearing → non_shrink required"],
    ["placement", "free_flow_pour / dry_pack", "gate against product flow consistency"],
    ["strength_demand", "high_early / standard", "high_early/early-load → HES grade"],
    ["temperature", "5_to_35C / outside_range", "outside_range → hot/cold-weather precautions required"],
  ],
  json: {
    category: "structural_grouts",
    stage1_gates: {
      application: { allowed: ["base_plate", "void_fill", "anchor_install", "pt_duct", "surface_patch"], rule: "base_plate/void_fill/anchor/pt_duct=suitable; surface_patch=requires_alternative (repair mortar)" },
      shrinkage_requirement: { allowed: ["non_shrink", "standard"], rule: "load-transfer/bearing=non_shrink required" },
      placement: { allowed: ["free_flow_pour", "dry_pack"], rule: "match product flow consistency" },
      strength_demand: { allowed: ["high_early", "standard"], rule: "high_early/early-load=HES grade" },
      temperature: { allowed: ["5_to_35C", "outside_range"], rule: "outside_range=hot/cold-weather precautions" },
    },
  },
};

const AI_STAGE2_HEADERS = ["Field", "Type", "Value"];

export const AI_STAGE2: Record<string, { rows: string[][]; json: unknown }> = {
  "Mapei Mapefill SP": {
    rows: [
      ["application_role", "gate", "base_plate/void_fill/anchor/pt_duct"],
      ["shrinkage", "gate", "non_shrink"],
      ["flow", "gate", "free_flow"],
      ["setting", "gate", "normal_set"],
      ["structural_demand", "gate", "structural"],
      ["pour_depth_mm", "rank", "null (unconfirmed)"],
      ["compressive_28d_mpa", "rank", "null (unconfirmed)"],
      ["compressive_early_mpa", "rank", "null (unconfirmed)"],
      ["chemistry", "tag", "cementitious_nonshrink"],
      ["temp_range_c", "meta", "5-35"],
      ["pack_size", "meta", "null (unconfirmed)"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "mapei_mapefill_sp",
      gates: { application_role: "base_plate/void_fill/anchor/pt_duct", shrinkage: "non_shrink", flow: "free_flow", setting: "normal_set", structural_demand: "structural" },
      tag: { chemistry: "cementitious_nonshrink" },
      rank: { pour_depth_mm: null, compressive_28d_mpa: null, compressive_early_mpa: null },
      meta: { temp_range_c: "5-35", pack_size: null, alternative_product: null, data_status: "verified", selectable: true, source: "mapei.com/au Mapei Mapefill SP — formulation/availability to confirm", confirmed_date: null },
    },
  },
  "Mapei Mapefill HES": {
    rows: [
      ["application_role", "gate", "base_plate/anchor"],
      ["shrinkage", "gate", "non_shrink"],
      ["flow", "gate", "free_flow"],
      ["setting", "gate", "rapid_high_early"],
      ["structural_demand", "gate", "structural"],
      ["pour_depth_mm", "rank", "null (unconfirmed)"],
      ["compressive_28d_mpa", "rank", "null (unconfirmed)"],
      ["compressive_early_mpa", "rank", "null (unconfirmed)"],
      ["chemistry", "tag", "cementitious_nonshrink"],
      ["temp_range_c", "meta", "min_5 (confirm upper)"],
      ["pack_size", "meta", "null (unconfirmed)"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "mapei_mapefill_hes",
      gates: { application_role: "base_plate/anchor", shrinkage: "non_shrink", flow: "free_flow", setting: "rapid_high_early", structural_demand: "structural" },
      tag: { chemistry: "cementitious_nonshrink" },
      rank: { pour_depth_mm: null, compressive_28d_mpa: null, compressive_early_mpa: null },
      meta: { temp_range_c: "min_5", pack_size: null, alternative_product: null, data_status: "verified", selectable: true, source: "mapei.com/au Mapei Mapefill HES — name/availability to confirm", confirmed_date: null },
    },
  },
};

export function StructuralGroutsIntroSection() {
  return (<div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"><div className="mb-4 flex items-center gap-2.5"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div><h3 className="text-base font-extrabold text-sky-950">Structural grouts</h3></div><p className="text-sm leading-7 text-slate-600">Structural grouts are non-shrink cementitious or epoxy-based products used to fill voids, grout column bases, machinery bases, post-tensioning ducts, and anchor bolt installations in concrete structures. Non-shrink grouts maintain full contact with the bearing surface during curing through controlled expansion. Selection is driven by flow/consistency, compressive strength class, maximum pour depth and set speed.</p></div>);
}

const DESIGN_CRITERIA = "Compressive strength & age (e.g. \u226560 MPa 28-day, plus 1/3/7-day early strength) for the structural duty; non-shrink/expansive class (positive expansion, no settlement \u2014 ASTM C1107 / EN 1504-6 anchoring); flowable vs flowable/pourable consistency & max placement gap/clearance (typ. 10\u2013100mm) & max aggregate size; flexural & bond strength to concrete/steel; effective bearing area achieved (no voids \u2014 flow & exotherm control for deep pours); max placement thickness per lift; working/flow time & set at temp; E-modulus & dimensional stability; chloride/sulfate & chemical resistance; application temperature range; cable/anchor/baseplate grouting suitability vs structural patch.";

export function StructuralGroutsProductSection() {
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);
  const toggleFilter = (id: FilterTag) => { setActiveFilters((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; }); };
  const visibleProducts = activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));
  const scroll = (dir: "left" | "right") => { scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" }); };
  return (
    <AutoProductReference products={PRODUCTS} cards={STRUCTURAL_GROUT_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Structural grouts" />
  );
}
