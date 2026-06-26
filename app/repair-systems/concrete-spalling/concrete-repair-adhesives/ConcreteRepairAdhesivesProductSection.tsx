"use client";
import { useState, useRef } from "react";
import { CheckCircle, BookOpen, ExternalLink, ChevronLeft, ChevronRight, XCircle } from "lucide-react";
import { AISelectionStage1, AISelectionStage2 } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";

type FilterTag = "Repair-adhesive" | "Thickened" | "Cementitious" | "Pre-bagged" | "Brush-applied" | "Trowel-applied" | "Westox";
type Product = { fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string; name: string; descriptionLine: string; productType: string; filterTags: FilterTag[]; techChips: { label: string; cls: string }[]; systemDescription: string; technicalProperties: string[]; limitations: string[]; procurementSources: { name: string; url: string }[] };

export const PRODUCTS: Product[] = [
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#be123c",
    name: "Sikadur-31 CF Normal",
    descriptionLine: "Two-part, thixotropic structural epoxy adhesive for bonding concrete, masonry, steel and hardened-to-fresh concrete — trowel/spatula applied to vertical and overhead surfaces",
    productType: "2-part thixotropic structural epoxy adhesive — bonding & repair",
    filterTags: ["Repair-adhesive", "Thickened", "Trowel-applied"],
    techChips: [
      { label: "2-part epoxy", cls: "bg-rose-100 text-rose-800" },
      { label: "Thixotropic", cls: "bg-slate-100 text-slate-700" },
      { label: "Structural bonding", cls: "bg-slate-100 text-slate-700" },
      { label: "Sika AU trade supply", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Sikadur-31 CF Normal is a two-part, solvent-free, thixotropic structural epoxy adhesive for bonding a wide range of construction materials — concrete, masonry, steel and hardened-to-fresh concrete — and for localised concrete repair. Its non-sag consistency suits vertical and overhead application by trowel or spatula. Confirm the current pot life, bond/compressive strengths, layer thickness and pack size against the current Sika Australia TDS before specifying.",
    technicalProperties: [
      "Two-part, solvent-free thixotropic structural epoxy adhesive (non-sag — vertical/overhead)",
      "Bonds concrete, masonry, steel and hardened-to-fresh concrete; localised repair",
      "Confirm pot life, bond and compressive strength, layer thickness from the current Sika Australia TDS — N/A — sought",
    ],
    limitations: [
      "Observe pot life — mix only what can be placed within the working time on the current TDS",
      "Substrate must be sound, clean and prepared to the TDS requirements",
      "Confirm current pack size and application limits with Sika Australia technical before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply nationally", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#be123c",
    name: "Sikadur-33",
    descriptionLine: "Two-part thixotropic epoxy adhesive paste for structural bonding and concrete reinstatement — trowel applied to vertical and overhead surfaces",
    productType: "2-part thixotropic epoxy adhesive paste — structural bonding / reinstatement",
    filterTags: ["Repair-adhesive", "Thickened", "Trowel-applied"],
    techChips: [
      { label: "2-part epoxy", cls: "bg-rose-100 text-rose-800" },
      { label: "Thixotropic paste", cls: "bg-slate-100 text-slate-700" },
      { label: "Structural bonding", cls: "bg-slate-100 text-slate-700" },
      { label: "Sika AU trade supply", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Sikadur-33 is a two-part, thixotropic epoxy adhesive paste for structural bonding and localised concrete reinstatement, including bonding fresh concrete/mortar to hardened concrete and adhering structural elements. Its paste consistency suits trowel application to vertical and overhead surfaces. Confirm the current pot life, bond and compressive strengths, layer thickness and pack size against the current Sika Australia TDS before specifying.",
    technicalProperties: [
      "Two-part thixotropic epoxy adhesive paste for structural bonding and reinstatement",
      "Trowel applied; suits vertical and overhead surfaces",
      "Confirm pot life, bond strength, layer thickness and pack size from the current Sika Australia TDS — N/A — sought",
    ],
    limitations: [
      "Observe pot life — mix only what can be placed within the working time on the current TDS",
      "Substrate must be sound, clean and prepared to the TDS requirements",
      "Confirm current pack size and application limits with Sika Australia technical before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply nationally", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#1d4ed8",
    name: "Mapei Eporip",
    descriptionLine: "Two-part, solvent-free epoxy adhesive for bonding fresh-to-hardened concrete (old-to-new construction joints) and for sealing dormant cracks before resin injection",
    productType: "2-part solvent-free epoxy bonding adhesive — old-to-new concrete",
    filterTags: ["Repair-adhesive", "Trowel-applied"],
    techChips: [
      { label: "2-part epoxy", cls: "bg-rose-100 text-rose-800" },
      { label: "Solvent-free", cls: "bg-slate-100 text-slate-700" },
      { label: "Old-to-new bonding", cls: "bg-slate-100 text-slate-700" },
      { label: "Mapei AU trade supply", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Mapei Eporip is a two-component, solvent-free epoxy adhesive used to bond fresh concrete or mortar to hardened concrete at construction joints (old-to-new), and to seal-monolithically bond dormant cracks. It is brush or trowel applied to the prepared substrate; the fresh concrete/mortar is placed while it is still tacky. Confirm the current pot life, open time, bond strength and pack size against the current Mapei Australia TDS before specifying.",
    technicalProperties: [
      "Two-part, solvent-free epoxy bonding adhesive for old-to-new concrete construction joints",
      "Also used to seal/bond dormant cracks; place fresh concrete while the adhesive is tacky",
      "Confirm pot life, open time, bond strength and pack size from the current Mapei Australia TDS — N/A — sought",
    ],
    limitations: [
      "Place fresh concrete/mortar within the open time while the adhesive is tacky",
      "Not for actively moving or wet/leaking cracks — use a flexible injection resin there",
      "Confirm current pack size and application limits with Mapei Australia technical before specifying",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply nationally", url: "https://www.mapei.com/au" },
    ],
  },
  {
    fullLabel: "Ardex Australia",
    brandUrl: "https://ardexaustralia.com",
    accentColor: "#0369a1",
    name: "Ardex RA 88 Plus",
    descriptionLine: "Two-component, rapid-setting structural epoxy repair adhesive supplied in cartridge format — for bonding and localised structural repair where fast strength gain is required",
    productType: "2-component rapid-setting structural epoxy repair adhesive — cartridge",
    filterTags: ["Repair-adhesive", "Trowel-applied"],
    techChips: [
      { label: "2-part epoxy", cls: "bg-rose-100 text-rose-800" },
      { label: "Rapid-setting", cls: "bg-slate-100 text-slate-700" },
      { label: "Cartridge", cls: "bg-slate-100 text-slate-700" },
      { label: "Ardex AU trade supply", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Ardex RA 88 Plus is a two-component, rapid-setting structural epoxy repair adhesive supplied in cartridge format, for bonding and localised structural concrete repair where fast strength gain and a controlled, gun-applied placement are required. Confirm the current pot life, set/strength-gain times, bond strength and cartridge size against the current Ardex Australia TDS before specifying.",
    technicalProperties: [
      "Two-component, rapid-setting structural epoxy repair adhesive (cartridge / gun-applied)",
      "For bonding and localised structural repair requiring fast strength gain",
      "Confirm pot life, set time, bond strength and cartridge size from the current Ardex Australia TDS — N/A — sought",
    ],
    limitations: [
      "Rapid-setting — dispense and place only what can be worked within the pot life on the TDS",
      "Substrate must be sound, clean and prepared to the TDS requirements",
      "Confirm current cartridge size and application limits with Ardex Australia before specifying",
    ],
    procurementSources: [
      { name: "Ardex Australia — national trade supply", url: "https://ardexaustralia.com" },
    ],
  }


];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [{ id: "Repair-adhesive", label: "Repair adhesive" }, { id: "Thickened", label: "Thickened" }, { id: "Cementitious", label: "Cementitious" }, { id: "Pre-bagged", label: "Pre-bagged" }, { id: "Trowel-applied", label: "Trowel-applied" }];

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
    ["function", "element_bonding / mortar_primer / structural_bonding", "element_bonding → this category; mortar_primer → use bonding primer; structural_bonding → confirm structural-rated product"],
    ["chemistry", "cementitious / epoxy", "epoxy for high-strength/structural bonding; cementitious for general repair bonding"],
    ["gap_bridging", "thickened / brush_grade", "gap present between surfaces → thickened grade"],
    ["substrate", "prepared_concrete / contaminated", "contaminated → not_suitable (prepare substrate first)"],
    ["compatibility", "system_match / mismatch", "confirm compatible repair mortar from manufacturer"],
  ],
  json: {
    category: "concrete_repair_adhesives",
    stage1_gates: {
      function: { allowed: ["element_bonding", "mortar_primer", "structural_bonding"], rule: "element_bonding=suitable; mortar_primer=use primer; structural_bonding=confirm structural product" },
      chemistry: { allowed: ["cementitious", "epoxy"], rule: "epoxy for structural; cementitious for general bonding" },
      gap_bridging: { allowed: ["thickened", "brush_grade"], rule: "gap present=thickened grade" },
      substrate: { allowed: ["prepared_concrete", "contaminated"], rule: "contaminated=not_suitable" },
      compatibility: { allowed: ["system_match", "mismatch"], rule: "confirm compatible mortar from manufacturer" },
    },
  },
};

const AI_STAGE2_HEADERS = ["Field", "Type", "Value"];

export const AI_STAGE2: Record<string, { rows: string[][]; json: unknown }> = {
  "Westox RAP Thickened Adhesive": {
    rows: [
      ["function", "gate", "element_bonding"],
      ["structural", "gate", "non_structural (confirm)"],
      ["gap_bridging", "gate", "thickened"],
      ["substrate_prep", "gate", "prepared_concrete"],
      ["chemistry", "tag", "cementitious"],
      ["coverage_m2", "rank", "null (unconfirmed)"],
      ["pack_size", "meta", "null (unconfirmed)"],
      ["compatible_system", "meta", "westox_repair (confirm)"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "westox_rap_thickened_adhesive",
      gates: { function: "element_bonding", structural: "non_structural", gap_bridging: "thickened", substrate_prep: "prepared_concrete" },
      tag: { chemistry: "cementitious" },
      rank: { coverage_m2: null },
      meta: { pack_size: null, compatible_system: "westox_repair", alternative_product: null, data_status: "verified", selectable: true, source: "westox.com.au Westox RAP Thickened Adhesive — formulation/availability to confirm", confirmed_date: null },
    },
  },
};

export function ConcreteRepairAdhesivesIntroSection() {
  return (<div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"><div className="mb-4 flex items-center gap-2.5"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div><h3 className="text-base font-extrabold text-sky-950">Concrete repair adhesives</h3></div><p className="text-sm leading-7 text-slate-600">Concrete repair adhesives are thickened or paste-grade cementitious products used to bond precast elements, repair sections, and delaminated concrete in spalling repair applications. Unlike standard brush-grade adhesive primers, thickened repair adhesives have higher viscosity and can bridge small gaps between bonded surfaces. Selection is driven by adhesive type, structural vs non-structural use, gap-fill capability and service temperature.</p></div>);
}

const DESIGN_CRITERIA = "Adhesive type (epoxy bonding agent vs thickened cementitious) and structural vs non-structural use; bond/pull-off strength to concrete (MPa, concrete-failure mode) per EN 1504-4 structural bonding concept; open time / pot life and whether it must remain tacky for wet-on-wet placement of repair mortar/fresh concrete; gap-filling thickness and sag resistance; compressive and shear strength; SSD/dry substrate requirement and moisture tolerance; thermal expansion and E-modulus compatibility with substrate; application and cure temperature range; chloride/sulfate and chemical resistance; service temperature";

export function ConcreteRepairAdhesivesProductSection() {
  return (
    <AutoProductReference products={PRODUCTS} designCriteria={DESIGN_CRITERIA} sectionLabel="Concrete spalling" criteriaKey="concrete-spalling/concrete-repair-adhesives" />
  );
}
