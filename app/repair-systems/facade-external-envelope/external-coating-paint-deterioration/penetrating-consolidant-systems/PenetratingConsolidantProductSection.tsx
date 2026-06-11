"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Consolidant"
  | "Penetrating"
  | "Concrete"
  | "Render"
  | "Masonry"
  | "Pre-coat"
  | "Dusty-substrate"
  | "Primer"
  | "Stabiliser"
  | "Low-VOC"
  | "Water-based";

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

const PRODUCTS: Product[] = [
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#e2003a",
    name: "Sika Sikagard-705 L Primer",
    descriptionLine: "Penetrating acrylic primer and consolidant for dusty, porous and poorly bonded concrete and render surfaces — improves topcoat adhesion on difficult substrates — Sika Australia",
    productType: "Penetrating acrylic primer/consolidant — concrete and render",
    filterTags: ["Consolidant", "Penetrating", "Concrete", "Render", "Masonry", "Pre-coat", "Dusty-substrate", "Primer", "Low-VOC", "Water-based"],
    techChips: [
      { label: "Penetrating", cls: "bg-red-100 text-red-800" },
      { label: "Consolidant", cls: "bg-amber-100 text-amber-700" },
      { label: "Water-based", cls: "bg-blue-100 text-blue-700" },
      { label: "Sika system", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Sika Sikagard-705 L is a penetrating acrylic primer and consolidant for dusty, porous and loosely bonded concrete and render surfaces before the application of protective coating systems. It penetrates into the substrate, binds loose particles and friable material, and provides a stable, consolidated base for subsequent topcoat adhesion. Used on concrete facades with surface carbonation chalking, poorly bonded render, and existing substrate that lacks sufficient tensile strength for direct topcoat application. Compatible with Sika Sikagard protective coating systems. Confirm current product range, DFT, coverage rate and topcoat compatibility from the current Sika Australia TDS before specifying.",
    technicalProperties: [
      "Penetrates substrate — binds loose, dusty and friable surface particles before topcoat",
      "Water-based acrylic — low VOC — suitable for use in occupied environments",
      "Improves adhesion of Sikagard protective coating systems on difficult substrates",
      "Coverage: confirm from current Sika TDS — varies with substrate porosity",
      "Compatible with Sika Sikagard coating systems — confirm system from Sika technical",
    ],
    limitations: [
      "Not a standalone waterproof coating — primer only — must be overcoated with compatible topcoat",
      "Not suitable for substrates with active structural movement or loose delaminating render layers — repair substrate before priming",
      "Do not apply to wet substrates or in rain",
      "Confirm current Sika product designation and system from Sika Australia TDS",
    ],
    procurementSources: [
      { name: "Sika Australia — Technical Supply", url: "https://aus.sika.com" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
      { name: "Sika trade distributors — nationally", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Parchem Construction Supplies (Fosroc)",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#0369a1",
    name: "Parchem Nitoprime 25 / Nitocote DP",
    descriptionLine: "Penetrating primer and consolidant for concrete, render and masonry — binds dusty and porous surfaces before protective coating — Fosroc product through Parchem nationally",
    productType: "Penetrating primer/consolidant — concrete and masonry — Parchem/Fosroc",
    filterTags: ["Consolidant", "Penetrating", "Concrete", "Render", "Masonry", "Pre-coat", "Dusty-substrate", "Primer", "Water-based"],
    techChips: [
      { label: "Penetrating", cls: "bg-sky-100 text-sky-800" },
      { label: "Consolidant", cls: "bg-amber-100 text-amber-700" },
      { label: "Fosroc system", cls: "bg-slate-100 text-slate-700" },
      { label: "National supply", cls: "bg-green-100 text-green-700" },
    ],
    systemDescription:
      "Parchem Nitoprime 25 / Nitocote DP is a penetrating primer and consolidant from the Fosroc product range, available through Parchem Construction Supplies nationally. It penetrates porous concrete and render surfaces, stabilises loose and dusty substrate layers, and improves the adhesion of subsequent protective coating systems. Suitable for application before Nitocote and other Fosroc/Parchem protective coating systems on concrete and masonry facades. Confirm the current product designation — Nitoprime 25 and Nitocote DP serve related but different functions within the Parchem range — and confirm the appropriate product for the specific application from the current Parchem TDS before specifying.",
    technicalProperties: [
      "Penetrating primer — stabilises dusty, porous and friable concrete and render surfaces",
      "National supply through Parchem branch network",
      "Compatible with Nitocote protective coating systems from Parchem",
      "Confirm DFT, coverage rate and topcoat compatibility from current Parchem TDS",
      "Confirm product code — Nitoprime 25 vs Nitocote DP for specific application",
    ],
    limitations: [
      "Confirm correct product designation with Parchem technical before ordering",
      "Not a standalone coating — topcoat must be applied within manufacturer's overcoat window",
      "Not suitable for structurally delaminated substrate — repair before applying consolidant",
      "Do not apply to wet substrates",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — nationally", url: "https://www.parchem.com.au" },
      { name: "Parchem branches — call for local branch", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#7c3aed",
    name: "Mapei Primer S",
    descriptionLine: "Acrylic primer and consolidant for concrete, render and masonry — stabilises absorbent and dusty surfaces — used before Mapei coating and waterproofing systems",
    productType: "Acrylic primer/consolidant — concrete, render and masonry — Mapei",
    filterTags: ["Consolidant", "Penetrating", "Concrete", "Render", "Masonry", "Pre-coat", "Dusty-substrate", "Primer", "Low-VOC", "Water-based"],
    techChips: [
      { label: "Acrylic primer", cls: "bg-purple-100 text-purple-800" },
      { label: "Consolidant", cls: "bg-amber-100 text-amber-700" },
      { label: "Water-based", cls: "bg-blue-100 text-blue-700" },
      { label: "Mapei system", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Mapei Primer S is an acrylic primer and consolidant for absorbent, dusty and porous concrete, render and masonry substrates before the application of Mapei coating, waterproofing and tiling systems. It penetrates the substrate surface, stabilises loose and friable material, and reduces differential absorption that can cause topcoat adhesion failure or surface defects such as pinholes and patchiness. Widely used in Australia before Mapei's Elastocolor and other exterior coating systems. Confirm the current product designation, dilution rate, and topcoat compatibility from the current Mapei Australia TDS before specifying.",
    technicalProperties: [
      "Acrylic consolidant — penetrates and stabilises absorbent and dusty substrates",
      "Reduces differential absorption — provides uniform substrate for topcoat adhesion",
      "Water-based — low VOC",
      "Compatible with Mapei exterior coating and waterproofing systems",
      "Confirm dilution rate from Mapei TDS — often applied diluted for maximum penetration",
    ],
    limitations: [
      "Not a standalone coating — must be overcoated with compatible Mapei system",
      "Not suitable for loose or delaminating substrate — repair substrate before applying",
      "Confirm Mapei product code and dilution rate from current TDS",
      "Allow to dry fully before applying topcoat — confirm open time from Mapei TDS",
    ],
    procurementSources: [
      { name: "Mapei Australia — distributor network", url: "https://www.mapei.com/au" },
      { name: "Mapei distributors — nationally", url: "https://www.mapei.com/au" },
      { name: "Tile and trade supply stores — Mapei stockists", url: "https://www.mapei.com/au" },
    ],
  },
  {
    fullLabel: "Ardex Australia",
    brandUrl: "https://www.ardex.com.au",
    accentColor: "#b45309",
    name: "Ardex P 82 / Ardex P 51 Primer",
    descriptionLine: "Penetrating acrylic primer and consolidant for concrete and cementitious substrates — stabilises dusty and porous surfaces before Ardex coating and waterproofing systems",
    productType: "Penetrating primer/consolidant — concrete and cementitious — Ardex",
    filterTags: ["Consolidant", "Penetrating", "Concrete", "Render", "Pre-coat", "Dusty-substrate", "Primer", "Water-based"],
    techChips: [
      { label: "Penetrating primer", cls: "bg-amber-100 text-amber-800" },
      { label: "Ardex system", cls: "bg-slate-100 text-slate-700" },
      { label: "Water-based", cls: "bg-blue-100 text-blue-700" },
    ],
    systemDescription:
      "Ardex P 82 / Ardex P 51 are penetrating acrylic primers and consolidants for concrete and cementitious substrates before application of Ardex coating and waterproofing systems. They penetrate and stabilise the substrate, improve adhesion of subsequent Ardex system products, and reduce substrate absorption variation. Used in Australian construction and remediation projects on concrete facades, render and cementitious substrates. Confirm the appropriate product (P 82 or P 51) for the specific application from the current Ardex Australia TDS before specifying — the two products serve slightly different functions within the Ardex system.",
    technicalProperties: [
      "Penetrating primer — stabilises dusty and porous cementitious substrates",
      "Improves adhesion of Ardex coating and waterproofing systems",
      "Water-based — low VOC",
      "Confirm product code (P 82 vs P 51) and dilution rate from current Ardex TDS",
      "Available through Ardex distributors nationally",
    ],
    limitations: [
      "Confirm correct product code with Ardex technical — P 82 and P 51 have different applications",
      "Not a standalone coating — overcoat with Ardex system product",
      "Not suitable for structurally failed substrate",
      "Confirm topcoat compatibility with Ardex before specifying",
    ],
    procurementSources: [
      { name: "Ardex Australia — distributor network", url: "https://www.ardex.com.au" },
      { name: "Ardex distributors — nationally", url: "https://www.ardex.com.au" },
    ],
  },
  {
    fullLabel: "Dulux Australia",
    brandUrl: "https://www.dulux.com.au",
    accentColor: "#059669",
    name: "Dulux Concrete & Render Sealer",
    descriptionLine: "Penetrating sealer and consolidant for concrete and render — stabilises dusty and chalky surfaces before Dulux exterior topcoat — widely available through Dulux trade and Bunnings",
    productType: "Penetrating sealer/consolidant — concrete and render — Dulux",
    filterTags: ["Consolidant", "Penetrating", "Concrete", "Render", "Masonry", "Pre-coat", "Dusty-substrate", "Primer", "Low-VOC", "Water-based"],
    techChips: [
      { label: "Penetrating sealer", cls: "bg-emerald-100 text-emerald-800" },
      { label: "Wide availability", cls: "bg-slate-100 text-slate-700" },
      { label: "Water-based", cls: "bg-blue-100 text-blue-700" },
    ],
    systemDescription:
      "Dulux Concrete & Render Sealer is a penetrating sealer and consolidant for concrete and render surfaces before exterior acrylic topcoat application. It penetrates and seals the substrate surface, stabilises chalky and dusty surfaces resulting from UV weathering or inadequate curing, and provides a consolidated base for the Dulux exterior topcoat system. Widely available through Dulux trade centres and Bunnings nationally. Confirm the current product name, coverage rate, dilution rate, and topcoat compatibility from the current Dulux TDS before specifying.",
    technicalProperties: [
      "Penetrating sealer action — stabilises chalky, dusty and porous substrate surfaces",
      "Water-based — widely available nationally through Dulux and Bunnings trade",
      "Compatible with Dulux exterior acrylic coating systems",
      "Confirm coverage rate and dilution from current Dulux TDS",
    ],
    limitations: [
      "Confirm current product name from Dulux trade technical — product range may vary",
      "Not suitable for structurally delaminated substrate",
      "Not a standalone waterproof coating — topcoat with compatible Dulux system",
    ],
    procurementSources: [
      { name: "Dulux Trade — Product Finder", url: "https://www.dulux.com.au" },
      { name: "Dulux Trade Centres — national", url: "https://www.dulux.com.au" },
      { name: "Bunnings Trade", url: "https://www.bunnings.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Consolidant", label: "Consolidant" },
  { id: "Penetrating", label: "Penetrating" },
  { id: "Concrete", label: "Concrete" },
  { id: "Render", label: "Render" },
  { id: "Masonry", label: "Masonry" },
  { id: "Pre-coat", label: "Pre-coat" },
  { id: "Dusty-substrate", label: "Dusty substrate" },
  { id: "Primer", label: "Primer" },
  { id: "Stabiliser", label: "Stabiliser" },
  { id: "Low-VOC", label: "Low VOC" },
  { id: "Water-based", label: "Water-based" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  type: string;
  penetration: string;
  substrate: string;
  dft: string;
  waterBased: string;
  primaryUse: string;
}[] = [
  { product: "Sikagard-705 L", brand: "Sika", type: "Acrylic penetrating primer", penetration: "Good", substrate: "Concrete, render", dft: "Confirm TDS", waterBased: "Yes", primaryUse: "Sika Sikagard coating system primer" },
  { product: "Nitoprime 25 / Nitocote DP", brand: "Parchem (Fosroc)", type: "Penetrating primer", penetration: "Good", substrate: "Concrete, masonry", dft: "Confirm TDS", waterBased: "Yes", primaryUse: "Fosroc coating system primer" },
  { product: "Primer S", brand: "Mapei", type: "Acrylic consolidant", penetration: "Excellent — diluted", substrate: "Concrete, render, masonry", dft: "Confirm TDS", waterBased: "Yes", primaryUse: "Mapei coating and waterproofing systems" },
  { product: "P 82 / P 51 Primer", brand: "Ardex", type: "Acrylic penetrating primer", penetration: "Good", substrate: "Concrete, cementitious", dft: "Confirm TDS", waterBased: "Yes", primaryUse: "Ardex system primer" },
  { product: "Concrete & Render Sealer", brand: "Dulux", type: "Penetrating sealer/consolidant", penetration: "Good", substrate: "Concrete, render", dft: "Confirm TDS", waterBased: "Yes", primaryUse: "Dulux exterior coating system primer" },
];

const TECH_INFO = {
  typicalApplications: [
    "Stabilising dusty, chalky or poorly bonded concrete and render surfaces before exterior protective coating",
    "Priming porous concrete facades where differential absorption would cause topcoat patchiness",
    "Pre-coating treatment on weathered or UV-degraded existing render before repainting",
    "Consolidating friable or lightly carbonated concrete surfaces before anti-carbonation or protective coating",
    "Preparing variable-porosity masonry substrates for consistent topcoat adhesion",
  ],
  selectionCriteria: [
    "Use a penetrating consolidant where the substrate is dusty, chalky, friable or has variable porosity — standard alkali-resistant primer alone will not bind loose substrate material",
    "Confirm the consolidant is compatible with the intended topcoat system — use same-brand primer/topcoat systems where possible",
    "For very porous or dusty substrates, apply consolidant diluted per manufacturer's instructions for maximum penetration depth",
    "Consolidant alone does not replace structural repair — substrate delamination or active cracking must be repaired before applying consolidant",
    "Check if the substrate requires alkali-resistant primer in addition to consolidant — some systems combine both functions",
  ],
  limitations: [
    "Penetrating consolidants are not standalone coatings — they do not provide UV protection, waterproofing or corrosion resistance",
    "Do not apply to substrate with active structural movement, deep delamination or significant cracking — repair substrate first",
    "Do not apply to wet substrate — surface and substrate must be dry before consolidant application",
    "Do not apply in rain or below 5°C — low temperatures slow penetration and cure",
    "Confirm the consolidant does not prevent adhesion of the subsequent topcoat — some penetrating products can reduce topcoat bond if over-applied",
  ],
  standardsNotes: [
    "AS 4548 — Guide to long-life coatings for concrete and masonry — substrate preparation requirements",
    "AS 4020 — Testing of products for use in contact with drinking water — relevant for surfaces in contact with water supply",
    "Manufacturer TDS — confirm dilution rate, coverage, penetration depth and topcoat compatibility",
    "CCAA (Cement Concrete & Aggregates Australia) — concrete surface treatment guidelines",
    "NATSPEC worksection 0233 — confirm primer specification requirements for specific coatings",
  ],
  suitableDefects: [
    "Chalking, dusty or UV-degraded cement render or concrete facade surface before repainting",
    "Porous or variable-porosity concrete panels with differential absorption causing topcoat patchiness",
    "Loosely bonded surface layer of render or concrete following weathering or salt attack",
    "Concrete facades requiring protection before anti-carbonation coating application",
    "Substrate preparation step before application of elastomeric or waterproof facade coating systems",
  ],
  typicalSubstrates: [
    "Cement render — new or existing — where surface is dusty, porous or of variable porosity",
    "Concrete — precast or in-situ — where surface is chalky or loosely bonded",
    "Concrete masonry units (block) with high surface porosity",
    "Existing painted concrete or render where previous coating is chalky or poorly bonded — after preparation",
    "NOT for: metal surfaces (use rust-inhibiting primer), waterproof membrane applications (use system primer), or as a replacement for structural repair",
  ],
};

function CollapsibleList({ items, icon, limit = 3 }: { items: string[]; icon: "check" | "x"; limit?: number }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, limit);
  const extra = items.length - limit;
  return (
    <div>
      <ul className="space-y-1.5">{visible.map((item, i) => (<li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">{icon === "check" ? <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" /> : <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />}{item}</li>))}</ul>
      {items.length > limit && <button onClick={() => setExpanded((e) => !e)} className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Show less ↑" : `+${extra} more ↓`}</button>}
    </div>
  );
}

function CollapsibleSources({ sources }: { sources: { name: string; url?: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between"><p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">PROCUREMENT SOURCES</p><button onClick={() => setExpanded((e) => !e)} className="text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide ↑" : "See more ↓"}</button></div>
      {expanded && <div className="mt-2 space-y-1.5">{sources.map((src) => (<div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs">{src.url ? <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">{src.name}<ExternalLink size={9} className="text-slate-300" /></a> : <span className="font-semibold text-slate-600">{src.name}</span>}</div>))}</div>}
      <p className="mt-2 text-[10px] italic text-slate-400">Confirm suitability with the current manufacturer TDS before specifying or applying.</p>
    </div>
  );
}

function CollapsibleCardDetails({ text, chips }: { text: string; chips: { label: string; cls: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      {expanded && (<><p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>{chips.length > 0 && <div className="mt-2 flex flex-wrap gap-1.5">{chips.map((chip) => <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>)}</div>}</>)}
      <button onClick={() => setExpanded((e) => !e)} className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide details ↑" : "Show details ↓"}</button>
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>{text}</p>
      <button onClick={() => setExpanded((e) => !e)} className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900">{expanded ? "Show less ↑" : "Show more ↓"}</button>
    </div>
  );
}

export function PenetratingConsolidantIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are penetrating consolidant systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Penetrating consolidants are low-viscosity primers that penetrate into dusty, porous, chalky or poorly bonded concrete and render substrates, binding loose surface particles and stabilising friable material before application of a protective or decorative topcoat. Unlike surface primers that form a bond coat on top of the substrate, consolidants work by impregnating the substrate surface layer — creating a stable, consolidated zone for the topcoat to adhere to.</p>
        {expanded && (<>
          <p>They are used when the substrate surface lacks sufficient tensile strength for direct topcoat adhesion — where a standard primer would simply peel off along with the loose substrate layer. Common triggers for specifying a consolidant include: visible surface chalking or dusting, history of previous coating failure caused by substrate delamination, porous or variable-porosity concrete or render, and existing painted surfaces where the paint has degraded to a chalky or non-adherent film.</p>
          <p>Consolidants are always used as part of a system — they do not provide UV protection, waterproofing or corrosion resistance and must be overcoated with the appropriate topcoat system. Specify the consolidant from the same manufacturer as the topcoat where possible to confirm compatibility and system warranty coverage. The consolidant does not replace structural repair — active delamination, significant cracking and movement must be addressed before consolidant application.</p>
        </>)}
      </div>
      <button onClick={() => setExpanded((e) => !e)} className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900">{expanded ? "Read less ↑" : "Read more ↓"}</button>
    </div>
  );
}

function TechCard({ icon, title, items, style }: { icon: React.ReactNode; title: string; items: string[]; style: "bullet" | "check" | "warn" }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5"><div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-white">{icon}</div><h3 className="text-sm font-extrabold text-sky-950">{title}</h3></div>
      <ul className="space-y-2">{items.map((item, i) => (<li key={i} className="flex items-start gap-2.5 text-xs leading-5 text-slate-600">{style === "check" && <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-600" />}{style === "warn" && <AlertTriangle size={12} className="mt-0.5 shrink-0 text-amber-500" />}{style === "bullet" && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />}{item}</li>))}</ul>
    </div>
  );
}

export function PenetratingConsolidantProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);
  const toggleFilter = (id: FilterTag) => { setActiveFilters((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; }); };
  const visibleProducts = activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));
  const scroll = (dir: "left" | "right") => { scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" }); };

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button type="button" onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
          <div><p className="text-base font-extrabold text-sky-950">System Technical Reference</p><p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable substrates</p></div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">{accordionOpen ? <>Hide detail <ChevronUp size={14} /></> : <>Show detail <ChevronDown size={14} /></>}</div>
        </button>
        {accordionOpen && (<div className="border-t border-slate-100 px-7 pb-7 pt-6"><div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <TechCard icon={<Layers size={15} />} title="Typical Applications" items={TECH_INFO.typicalApplications} style="bullet" />
          <TechCard icon={<Ruler size={15} />} title="Selection Criteria" items={TECH_INFO.selectionCriteria} style="check" />
          <TechCard icon={<AlertTriangle size={15} />} title="When NOT to Use" items={TECH_INFO.limitations} style="warn" />
          <TechCard icon={<BookOpen size={15} />} title="Standards & Notes" items={TECH_INFO.standardsNotes} style="bullet" />
          <TechCard icon={<CheckCircle size={15} />} title="Suitable Defects" items={TECH_INFO.suitableDefects} style="check" />
          <TechCard icon={<SquareStack size={15} />} title="Typical Substrates" items={TECH_INFO.typicalSubstrates} style="bullet" />
        </div></div>)}
      </div>
      <div>
        <div className="mb-5 flex items-start gap-3"><div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" /><div><h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2><p className="mt-1 text-sm text-slate-500">5 products — 5 brands — penetrating consolidant systems — scroll to view all</p></div></div>
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => { const active = activeFilters.has(f.id); return (<button key={f.id} type="button" onClick={() => toggleFilter(f.id)} className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}>{f.label}</button>); })}
          {activeFilters.size > 0 && <button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">Clear filters</button>}
        </div>
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">{visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""}</span>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll("left")} aria-label="Scroll left" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronLeft size={16} /></button>
            <button onClick={() => scroll("right")} aria-label="Scroll right" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronRight size={16} /></button>
          </div>
        </div>
        <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}>
          {visibleProducts.map((product) => (
            <div key={product.name} className="flex-none" style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ borderLeft: `4px solid ${product.accentColor}` }}>
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2"><span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">{product.fullLabel}</span><div className="flex shrink-0 items-center gap-1">{product.tdsUrl && <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><FileText size={9} /> TDS</a>}<a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><ExternalLink size={9} /> Brand Site</a></div></div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                  <CollapsibleCardDetails text={product.descriptionLine} chips={product.techChips} />
                </div>
                <div className="border-b border-sky-100 bg-sky-50 px-5 py-4"><p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p><CollapsibleDescription text={product.systemDescription} /></div>
                <div className="space-y-3 px-5 py-4">
                  <div><p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-green-700">Technical Properties</p><CollapsibleList items={product.technicalProperties} icon="check" limit={3} /></div>
                  <div><p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">Limitations</p><CollapsibleList items={product.limitations} icon="x" limit={3} /></div>
                </div>
                <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3"><CollapsibleSources sources={product.procurementSources} /></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-6 flex items-start gap-3"><div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" /><div><h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2><p className="mt-1 text-sm text-slate-500">Side-by-side comparison of penetrating consolidant systems. Confirm all selections against current manufacturer TDS before specifying.</p></div></div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead><tr className="border-b border-slate-200 bg-slate-50"><th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Type</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Penetration</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Substrate</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">DFT</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Water-based</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th></tr></thead>
            <tbody>{SYSTEM_COMPARISON.map((row, i) => (<tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}><td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td><td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td><td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.type}</td><td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.penetration}</td><td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.substrate}</td><td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.dft}</td><td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.waterBased}</td><td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.primaryUse}</td></tr>))}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
