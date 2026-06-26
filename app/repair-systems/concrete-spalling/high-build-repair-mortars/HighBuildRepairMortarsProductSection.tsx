"use client";
import { useState, useRef } from "react";
import { CheckCircle, BookOpen, ExternalLink, ChevronLeft, ChevronRight, XCircle } from "lucide-react";
import { AISelectionStage1, AISelectionStage2 } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { HIGH_BUILD_CARDS } from "./highBuildData";

type FilterTag = "High-build" | "Cementitious" | "Pre-bagged" | "Hand-applied" | "Westox" | "Structural" | "Polymer-modified";
type Product = { fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string; name: string; descriptionLine: string; productType: string; filterTags: FilterTag[]; techChips: { label: string; cls: string }[]; systemDescription: string; technicalProperties: string[]; limitations: string[]; procurementSources: { name: string; url: string }[] };

export const PRODUCTS: Product[] = [
  {
    fullLabel: "Westox",
    brandUrl: "https://www.westox.com.au",
    accentColor: "#64748b",
    name: "Westox Plastalite High Build Repair Mortar A 15kg",
    descriptionLine: "High-build polymer-modified cementitious repair mortar for deep concrete spalling repair — confirm current formulation, maximum coat thickness, coverage, and system specifications with Westox technical",
    productType: "High-build cementitious repair mortar — deep concrete spalling repair",
    filterTags: ["High-build", "Cementitious", "Pre-bagged", "Hand-applied", "Westox", "Polymer-modified"],
    techChips: [{ label: "High-build", cls: "bg-slate-100 text-slate-700" }, { label: "Polymer-modified", cls: "bg-slate-100 text-slate-700" }, { label: "Pre-bagged", cls: "bg-slate-100 text-slate-700" }],
    systemDescription: "Westox Plastalite High Build Repair Mortar A is a polymer-modified cementitious repair mortar for deep concrete spalling reinstatement. High-build mortars are used where the depth of spall repair exceeds what can be achieved in a single application of standard repair mortar, reducing the number of coats required and the total application time.\n\nHigh-build mortars are applied in thicker sections and may require reinforcing mesh for very deep repairs. Confirm current product technical data sheet, maximum single-coat thickness, water ratio, coverage, substrate preparation, and compatible primer and topcoat system with Westox technical before specifying.",
    technicalProperties: [
      "High-build polymer-modified cementitious repair mortar — suitable for deep concrete spalling repair",
      "Applied in thicker sections than standard repair mortars — confirm maximum single-coat thickness from current Westox TDS",
      "Confirm water ratio, coverage, primer specification, and system design from current Westox Plastalite High Build Repair Mortar A TDS",
    ],
    limitations: [
      "Confirm current product formulation and system specifications with Westox technical before specifying",
      "Very deep repairs (confirm threshold with Westox) may require reinforcing mesh or steel fibre addition — confirm with Westox",
      "Not suitable for application over wet or contaminated concrete — substrate must be prepared to current Westox specification",
      "Confirm current Australian product availability with Westox before specifying",
    ],
    procurementSources: [{ name: "Westox — contact for trade supply", url: "https://www.westox.com.au" }],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/en/construction/concrete-repair-protection/concrete-repair-mortars/cementitious-repairmortars/sika-monotop-612n.html",
    accentColor: "#be123c",
    name: "Sika MonoTop-612 N",
    descriptionLine: "One-component, silica-fume and polymer-modified cementitious high-build repair mortar — EN 1504-3 R4 — high-build up to 100 mm in one application on horizontal, vertical and overhead surfaces",
    productType: "R4 high-build cementitious repair mortar — to 100 mm, low-permeability (silica fume + polymer)",
    filterTags: ["High-build", "Cementitious", "Polymer-modified", "Structural", "Hand-applied", "Pre-bagged"],
    techChips: [
      { label: "EN 1504-3 R4", cls: "bg-rose-100 text-rose-800" },
      { label: "High build to 100 mm", cls: "bg-slate-100 text-slate-700" },
      { label: "Silica fume + polymer", cls: "bg-slate-100 text-slate-700" },
      { label: "Sika AU trade supply", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Sika MonoTop-612 N is a one-component, cement-based, low-permeability concrete repair mortar containing silica fume and polymer, meeting EN 1504-3 Class R4. It is designed for high-build application up to 100 mm in a single pass on horizontal, vertical and overhead surfaces, for high-strength (>45 MPa) repairs including exterior, marine and trafficable applications. Confirm the current compressive strength, exact maximum layer, primer requirement and pack size against the current Sika Australia TDS before specifying.",
    technicalProperties: [
      "One-component cementitious high-build repair mortar — EN 1504-3 R4 — silica fume + polymer modified",
      "High build up to 100 mm in one application; horizontal, vertical and overhead",
      "Suited to high-strength (>45 MPa), exterior, marine and trafficable repairs",
      "Confirm compressive strength, max layer, primer and pack size from the current Sika Australia TDS — N/A — sought",
    ],
    limitations: [
      "Confirm primer / bonding-coat and rebar-priming requirement from the current Sika Australia TDS",
      "Observe minimum and maximum layer thickness per the TDS",
      "Confirm current pack size and application temperature range with Sika Australia technical before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply nationally", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem",
    brandUrl: "https://www.fosroc.com.au",
    accentColor: "#7c2d12",
    name: "Fosroc Renderoc HB",
    descriptionLine: "Hand-applied, polymer-modified, fibre-reinforced high-build cementitious repair mortar — up to 80 mm vertical / 50 mm overhead per layer — primed with Nitobond HAR",
    productType: "High-build polymer-modified cementitious repair mortar (to 80 mm V / 50 mm OH)",
    filterTags: ["High-build", "Cementitious", "Polymer-modified", "Structural", "Hand-applied", "Pre-bagged"],
    techChips: [
      { label: "High build", cls: "bg-rose-100 text-rose-800" },
      { label: "Fibre-reinforced", cls: "bg-slate-100 text-slate-700" },
      { label: "Vertical / overhead", cls: "bg-slate-100 text-slate-700" },
      { label: "Parchem — national", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Fosroc Renderoc HB is a hand-applied, polymer-modified, fibre-reinforced high-build cementitious structural repair mortar distributed by Parchem, applied up to 80 mm on vertical and 50 mm on overhead surfaces per layer. It is reported to Australian Standards (no EN 1504-3 class — specify Renderoc HB40 where an R3 classification is required) and is primed with Nitobond HAR, with rebar primed by Nitoprime Zincrich. Confirm current compressive strength, exact layer limits and pack size against the current Fosroc / Parchem TDS before specifying.",
    technicalProperties: [
      "Hand-applied polymer-modified, fibre-reinforced high-build cementitious repair mortar",
      "Up to 80 mm vertical / 50 mm overhead per layer; reported to Australian Standards (no EN class)",
      "Substrate primer Nitobond HAR; rebar primer Nitoprime Zincrich",
      "Confirm compressive strength and pack size from the current Fosroc / Parchem TDS — N/A — sought",
    ],
    limitations: [
      "Where an EN 1504-3 R3 class is required, specify Renderoc HB40 instead",
      "Do not apply without Nitobond HAR primer / Nitoprime Zincrich on exposed rebar",
      "Confirm application temperature range and pack size with Parchem before specifying",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — national (DuluxGroup)", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem",
    brandUrl: "https://www.fosroc.com.au",
    accentColor: "#7c2d12",
    name: "Fosroc Renderoc HB40",
    descriptionLine: "Polymer-modified, fibre-reinforced high-build cementitious repair mortar — EN 1504-3 R3 — for hand-applied vertical and overhead structural patching",
    productType: "High-build cementitious repair mortar — EN 1504-3 R3 (~45 MPa)",
    filterTags: ["High-build", "Cementitious", "Polymer-modified", "Structural", "Hand-applied", "Pre-bagged"],
    techChips: [
      { label: "EN 1504-3 R3", cls: "bg-rose-100 text-rose-800" },
      { label: "High build", cls: "bg-slate-100 text-slate-700" },
      { label: "Fibre-reinforced", cls: "bg-slate-100 text-slate-700" },
      { label: "Parchem — national", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Fosroc Renderoc HB40 is a polymer-modified, fibre-reinforced high-build cementitious structural repair mortar meeting EN 1504-3 Class R3, for hand-applied patch repair on vertical and overhead surfaces. It is the EN-classified high-build option in the Renderoc range. Confirm the current compressive strength, exact maximum layer, primer requirement and pack size against the current Fosroc / Parchem TDS before specifying.",
    technicalProperties: [
      "Polymer-modified, fibre-reinforced high-build cementitious repair mortar — EN 1504-3 R3",
      "Hand-applied to vertical and overhead surfaces",
      "Substrate primer Nitobond HAR; rebar primer Nitoprime Zincrich",
      "Confirm compressive strength, max layer and pack size from the current Fosroc / Parchem TDS — N/A — sought",
    ],
    limitations: [
      "Do not apply without Nitobond HAR primer / Nitoprime Zincrich on exposed rebar",
      "Observe minimum and maximum layer thickness per the TDS",
      "Confirm application temperature range and pack size with Parchem before specifying",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — national (DuluxGroup)", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Ardex Australia",
    brandUrl: "https://ardexaustralia.com",
    accentColor: "#0369a1",
    name: "Ardex BR 340",
    descriptionLine: "MICROTEC fibre-reinforced, polymer-modified high-build structural repair mortar — up to 80 mm on vertical, horizontal and overhead surfaces — with active corrosion inhibitor",
    productType: "High-build polymer-modified structural repair mortar (to 80 mm) with corrosion inhibitor",
    filterTags: ["High-build", "Cementitious", "Polymer-modified", "Structural", "Hand-applied", "Pre-bagged"],
    techChips: [
      { label: "High build to 80 mm", cls: "bg-rose-100 text-rose-800" },
      { label: "Fibre-reinforced (MICROTEC)", cls: "bg-slate-100 text-slate-700" },
      { label: "Corrosion inhibitor", cls: "bg-slate-100 text-slate-700" },
      { label: "Ardex AU trade supply", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Ardex BR 340 is a MICROTEC fibre-reinforced, polymer-modified high-build structural repair mortar for hand application up to 80 mm on vertical, horizontal and overhead surfaces, incorporating an active corrosion inhibitor. It is a low-resistivity mortar (galvanic-anode compatible). Confirm the current EN 1504-3 class, compressive strength, exact layer limits, primer requirement and pack size against the current Ardex Australia TDS before specifying.",
    technicalProperties: [
      "MICROTEC fibre-reinforced, polymer-modified high-build structural repair mortar with active corrosion inhibitor",
      "Up to 80 mm on vertical, horizontal and overhead surfaces (minimum ~10 mm, square edges)",
      "Low-resistivity — compatible with galvanic anodes (e.g. Ardex BRX 60 LO)",
      "Confirm EN class, compressive strength and pack size from the current Ardex Australia TDS — N/A — sought",
    ],
    limitations: [
      "Minimum ~10 mm with square edges — not for feather-edging",
      "Where high electrical resistivity is required, BR 340 is low-resistivity — confirm suitability",
      "Confirm primer requirement, application temperature and pack size with Ardex Australia before specifying",
    ],
    procurementSources: [
      { name: "Ardex Australia — national trade supply", url: "https://ardexaustralia.com" },
    ],
  }

];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [{ id: "High-build", label: "High-build" }, { id: "Polymer-modified", label: "Polymer-modified" }, { id: "Cementitious", label: "Cementitious" }, { id: "Pre-bagged", label: "Pre-bagged" }, { id: "Hand-applied", label: "Hand-applied" }];

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
    ["defect_type", "spalling / honeycombing / active_crack / cosmetic_only", "spalling/honeycombing → this category; active_crack → not_suitable (rigid, re-cracks); cosmetic_only → requires_alternative (fine-finish mortar)"],
    ["repair_depth", "shallow / deep", "deep spall → high-build grade; shallow → standard repair mortar may suffice"],
    ["structural_demand", "structural / non_structural", "structural → requires EN 1504-3 R3/R4 grade"],
    ["element_orientation", "horizontal / vertical / overhead", "gate against product application capability"],
    ["substrate_condition", "ssd_porous / dense_smooth / exposed_rebar", "dense_smooth → epoxy bond coat; exposed_rebar → rebar primer first"],
  ],
  json: {
    category: "high_build_repair_mortars",
    stage1_gates: {
      defect_type: { allowed: ["spalling", "honeycombing", "active_crack", "cosmetic_only"], rule: "spalling/honeycombing=suitable; active_crack=not_suitable; cosmetic_only=requires_alternative" },
      repair_depth: { allowed: ["shallow", "deep"], rule: "deep=high-build grade; shallow=standard mortar may suffice" },
      structural_demand: { allowed: ["structural", "non_structural"], rule: "structural=requires EN1504-3 R3/R4" },
      element_orientation: { allowed: ["horizontal", "vertical", "overhead"], rule: "match product application capability" },
      substrate_condition: { allowed: ["ssd_porous", "dense_smooth", "exposed_rebar"], rule: "dense_smooth=epoxy bond coat; exposed_rebar=rebar primer first" },
    },
  },
};

const AI_STAGE2_HEADERS = ["Field", "Type", "Value"];

export const AI_STAGE2: Record<string, { rows: string[][]; json: unknown }> = {
  "Westox Plastalite High Build Repair Mortar A 15kg": {
    rows: [
      ["structural_demand", "gate", "unconfirmed"],
      ["setting", "gate", "unconfirmed"],
      ["exposure_max", "gate", "unconfirmed"],
      ["orientation", "gate", "unconfirmed"],
      ["substrate_prep", "gate", "unconfirmed"],
      ["min_layer_mm", "rank", "null (unconfirmed)"],
      ["max_layer_mm", "rank", "null (unconfirmed)"],
      ["compressive_28d_mpa", "rank", "null (unconfirmed)"],
      ["chemistry", "tag", "polymer_modified_cementitious"],
      ["en1504_class", "tag", "unconfirmed"],
      ["primer", "meta", "null (unconfirmed)"],
      ["pack_size", "meta", "15kg"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "westox_plastalite_high_build_a",
      gates: { structural_demand: "unconfirmed", setting: "unconfirmed", exposure_max: "unconfirmed", orientation: "unconfirmed", substrate_prep: "unconfirmed" },
      tag: { chemistry: "polymer_modified_cementitious", en1504_class: "unconfirmed" },
      rank: { min_layer_mm: null, max_layer_mm: null, compressive_28d_mpa: null },
      meta: { primer: null, pack_size: "15kg", alternative_product: null, data_status: "verified", selectable: true, source: "westox.com.au Westox Plastalite High Build Repair Mortar A", confirmed_date: null },
    },
  },
};

export function HighBuildRepairMortarsIntroSection() {
  return (<div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"><div className="mb-4 flex items-center gap-2.5"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div><h3 className="text-base font-extrabold text-sky-950">High-build repair mortars</h3></div><p className="text-sm leading-7 text-slate-600">High-build repair mortars are polymer-modified cementitious products designed for application in thicker sections than standard repair mortars, used in deep concrete spalling repairs where multiple coats of standard mortar would otherwise be required. They are applied in thicker single passes, reducing the number of coats and the total application time; very deep repairs may require reinforcing mesh.</p></div>);
}

const DESIGN_CRITERIA = "Compressive / flexural / tensile-bond strength (MPa) and EN 1504-3 class (R3/R4 structural); single-pass build thickness \u2014 min & max (mm) and max total build for deep spalls (often 50\u2013100+ mm with build-out coats); shrinkage class (low/compensated) & cracking resistance; E-modulus / thermal-expansion match to parent concrete (structural compatibility); set times & early strength (overhead/vertical workability \u2014 thixotropy, sag resistance); chloride & sulfate resistance and carbonation resistance (durability); rebar-primer / bonding-bridge requirement & SSD substrate prep; aggregate top-size vs build depth; application temp range & pot life; fibre reinforcement; overcoat/curing regime; AS 3600 durability & AS 1478 admixture context.";

export function HighBuildRepairMortarsProductSection() {
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);
  const toggleFilter = (id: FilterTag) => { setActiveFilters((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; }); };
  const visibleProducts = activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));
  const scroll = (dir: "left" | "right") => { scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" }); };
  return (
    <AutoProductReference products={PRODUCTS} cards={HIGH_BUILD_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="High-build repair mortars" />
  );
}
