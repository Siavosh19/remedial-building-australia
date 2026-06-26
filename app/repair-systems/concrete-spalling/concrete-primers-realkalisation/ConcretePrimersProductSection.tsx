"use client";
import { useState, useRef } from "react";
import { CheckCircle, BookOpen, ExternalLink, ChevronLeft, ChevronRight, XCircle } from "lucide-react";
import { AISelectionStage1, AISelectionStage2 } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { CONCRETE_PRIMER_CARDS } from "./concretePrimersData";

type FilterTag = "Concrete-primer" | "Adhesive-primer" | "Re-alkalisation" | "Cementitious" | "Pre-bagged" | "Brush-applied" | "Westox";
type Product = { fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string; name: string; descriptionLine: string; productType: string; filterTags: FilterTag[]; techChips: { label: string; cls: string }[]; systemDescription: string; technicalProperties: string[]; limitations: string[]; procurementSources: { name: string; url: string }[] };

export const PRODUCTS: Product[] = [
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/dam/dms/au01/2/sikatop_armatec_-110epocem.pdf",
    accentColor: "#be123c",
    name: "SikaTop Armatec-110 EpoCem",
    descriptionLine: "Three-component cementitious, epoxy-modified bonding primer with corrosion inhibitor — brush-applied to the prepared substrate and to exposed reinforcement ahead of a Sika MonoTop repair mortar — EN 1504-7",
    productType: "3-component cementitious epoxy-modified bonding primer + corrosion inhibitor (EN 1504-7)",
    filterTags: ["Concrete-primer", "Adhesive-primer", "Cementitious", "Brush-applied"],
    techChips: [
      { label: "EN 1504-7", cls: "bg-rose-100 text-rose-800" },
      { label: "Bonding primer", cls: "bg-slate-100 text-slate-700" },
      { label: "Corrosion inhibitor", cls: "bg-slate-100 text-slate-700" },
      { label: "Sika AU trade supply", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "SikaTop Armatec-110 EpoCem is a three-component, cementitious epoxy-modified slurry that serves as a bonding primer and reinforcement corrosion-protection coat in concrete repair, meeting EN 1504-7. Built on Sika's EpoCem technology, it is brush-applied to exposed reinforcement and to the prepared concrete substrate, then overlaid with a Sika MonoTop or compatible repair mortar. Confirm the current coverage rate, number of coats, overcoat window and pack size against the current Sika Australia TDS before specifying.",
    technicalProperties: [
      "Three-component cementitious, epoxy-modified bonding primer with integral corrosion inhibitor (EN 1504-7)",
      "Brush-applied to exposed reinforcement and the prepared concrete substrate before the repair mortar",
      "Part of the Sika MonoTop / SikaTop concrete repair system",
      "Confirm coverage, coats, overcoat window and pot life from the current Sika Australia TDS — N/A — sought",
    ],
    limitations: [
      "Observe the overcoat window — apply the repair mortar within the time stated on the current TDS",
      "Three-component product — mix complete units; do not split-batch outside the TDS ratios",
      "Confirm substrate preparation, coverage rate and pack size with Sika Australia technical before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply nationally", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem",
    brandUrl: "https://www.fosroc.com.au",
    tdsUrl: "https://www.fosroc.com.au/sites/default/files/products_file_storage/Fosroc_Nitobond_HAR_TDS.pdf",
    accentColor: "#7c2d12",
    name: "Fosroc Nitobond HAR",
    descriptionLine: "Single-component polymer emulsion bonding primer for Fosroc Renderoc repair mortars — scrubbed into the prepared substrate; the mortar is applied while the primer is tacky",
    productType: "Single-component polymer emulsion bonding primer (for Renderoc repairs)",
    filterTags: ["Concrete-primer", "Adhesive-primer", "Brush-applied"],
    techChips: [
      { label: "Polymer emulsion", cls: "bg-orange-100 text-orange-900" },
      { label: "Bonding primer", cls: "bg-slate-100 text-slate-700" },
      { label: "Apply mortar when tacky", cls: "bg-amber-50 text-amber-700" },
      { label: "Parchem — national", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Fosroc Nitobond HAR is a single-component polymer emulsion bonding agent used as the substrate primer for Fosroc Renderoc repair mortars. It is scrubbed well into the prepared, saturated-surface-dry substrate and the Renderoc mortar is applied as soon as the primer becomes tacky, improving the bond between old concrete and the new repair. Non-flammable. Confirm the current coverage rate, open time and pack size against the current Fosroc / Parchem TDS before specifying.",
    technicalProperties: [
      "Single-component polymer emulsion bonding primer for the Fosroc Renderoc repair system",
      "Scrubbed into the prepared substrate; apply the repair mortar while the primer is tacky",
      "Non-flammable — confirm coverage rate and open time from the current Fosroc / Parchem TDS — N/A — sought",
      "Parchem (DuluxGroup) — national trade supply",
    ],
    limitations: [
      "Apply the repair mortar within the tacky window — do not let the primer dry out fully before mortaring",
      "Confirm suitability as a substrate primer vs other Nitobond grades for the specific duty with Parchem",
      "Confirm current coverage rate and pack size with Parchem before specifying",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — national (DuluxGroup)", url: "https://www.parchem.com.au" },
    ],
  }

];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [{ id: "Concrete-primer", label: "Concrete primer" }, { id: "Adhesive-primer", label: "Adhesive primer" }, { id: "Re-alkalisation", label: "Re-alkalisation" }, { id: "Cementitious", label: "Cementitious" }, { id: "Brush-applied", label: "Brush-applied" }];

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
    ["function", "mortar_bond / realkalisation / waterproofing", "mortar_bond/realkalisation → this category; waterproofing → requires_alternative (different product)"],
    ["substrate_condition", "porous_prepared / dense_smooth / carbonated", "carbonated → realkalisation primer; dense_smooth → epoxy bond coat instead"],
    ["application_timing", "wet_on_wet / cured", "bonding primer applied wet-on-wet before mortar (do not let dry)"],
    ["chemistry", "cementitious / acrylic / epoxy", "match repair mortar system compatibility"],
    ["compatibility", "mortar_system_match / mismatch", "confirm compatible primer from the repair mortar manufacturer"],
  ],
  json: {
    category: "concrete_primers_realkalisation",
    stage1_gates: {
      function: { allowed: ["mortar_bond", "realkalisation", "waterproofing"], rule: "mortar_bond/realkalisation=suitable; waterproofing=requires_alternative" },
      substrate_condition: { allowed: ["porous_prepared", "dense_smooth", "carbonated"], rule: "carbonated=realkalisation primer; dense_smooth=epoxy bond coat" },
      application_timing: { allowed: ["wet_on_wet", "cured"], rule: "bonding primer wet-on-wet before mortar (do not let dry)" },
      chemistry: { allowed: ["cementitious", "acrylic", "epoxy"], rule: "match repair mortar system" },
      compatibility: { allowed: ["mortar_system_match", "mismatch"], rule: "confirm compatible primer from mortar manufacturer" },
    },
  },
};

const AI_STAGE2_HEADERS = ["Field", "Type", "Value"];

export const AI_STAGE2: Record<string, { rows: string[][]; json: unknown }> = {
  "Westox RAP Adhesive": {
    rows: [
      ["function", "gate", "mortar_bond"],
      ["substrate_target", "gate", "porous_prepared"],
      ["application", "gate", "brush_wet_on_wet"],
      ["timing", "gate", "apply_while_green"],
      ["chemistry", "tag", "cementitious"],
      ["coverage_m2", "rank", "null (unconfirmed)"],
      ["compatible_system", "meta", "westox_repair_mortar (confirm)"],
      ["pack_size", "meta", "null (unconfirmed)"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "westox_rap_adhesive",
      gates: { function: "mortar_bond", substrate_target: "porous_prepared", application: "brush_wet_on_wet", timing: "apply_while_green" },
      tag: { chemistry: "cementitious" },
      rank: { coverage_m2: null },
      meta: { compatible_system: "westox_repair_mortar", pack_size: null, alternative_product: null, data_status: "verified", selectable: true, source: "westox.com.au Westox RAP Adhesive — formulation/availability to confirm", confirmed_date: null },
    },
  },
  "Westox RAP Primer DG": {
    rows: [
      ["function", "gate", "realkalisation"],
      ["substrate_target", "gate", "carbonated"],
      ["application", "gate", "brush"],
      ["timing", "gate", "unconfirmed"],
      ["chemistry", "tag", "cementitious"],
      ["coverage_m2", "rank", "null (unconfirmed)"],
      ["compatible_system", "meta", "westox_repair_mortar (confirm)"],
      ["pack_size", "meta", "null (unconfirmed)"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "westox_rap_primer_dg",
      gates: { function: "realkalisation", substrate_target: "carbonated", application: "brush", timing: "unconfirmed" },
      tag: { chemistry: "cementitious" },
      rank: { coverage_m2: null },
      meta: { compatible_system: "westox_repair_mortar", pack_size: null, alternative_product: null, data_status: "verified", selectable: true, source: "westox.com.au Westox RAP Primer DG — formulation/availability to confirm", confirmed_date: null },
    },
  },
};

export function ConcretePrimersIntroSection() {
  return (<div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"><div className="mb-4 flex items-center gap-2.5"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div><h3 className="text-base font-extrabold text-sky-950">Concrete primers &amp; re-alkalisation</h3></div><p className="text-sm leading-7 text-slate-600">Concrete adhesive primers and re-alkalisation primers are applied to prepared concrete substrates before repair mortar application to improve adhesion and substrate condition. Adhesive primers are applied wet-on-wet immediately before mortar application. Re-alkalisation primers improve the pH at the repair interface on carbonated concrete to reduce ongoing corrosion risk. Selection is driven by function, chemistry, wet-on-wet window and suitability over carbonated substrates.</p></div>);
}

const DESIGN_CRITERIA = "Function (anti-corrosion reinforcement primer vs cementitious bonding/adhesion primer vs re-alkalising primer for carbonated substrate); chemistry (polymer-cement, epoxy, alkaline cementitious); pot life & open/wet-on-wet window before mortar application; bond/pull-off strength developed (MPa); chloride/moisture tolerance & ability to passivate steel (pH, inhibitor content); compatibility with chosen repair mortar system; coverage (m²/L or kg) & coats; recoatable carbonation-front treatment depth; substrate moisture & SSD requirement; application temp; whether active corrosion inhibitor vs barrier only.";

export function ConcretePrimersProductSection() {
  return (
    <AutoProductReference products={PRODUCTS} cards={CONCRETE_PRIMER_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Concrete primers & re-alkalisation" />
  );
}
