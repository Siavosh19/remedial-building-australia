"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight,
} from "lucide-react";

type FilterTag = "Rapid-set" | "Concrete" | "Mortar" | "Hob" | "Balcony" | "Two-part" | "AS-3600" | "NCC" | "High-strength" | "Cementitious";

type Product = {
  fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string;
  name: string; descriptionLine: string; productType: string;
  filterTags: FilterTag[]; techChips: { label: string; cls: string }[];
  systemDescription: string; technicalProperties: string[];
  limitations: string[]; procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/en/construction/concrete-repair-protection/mortar-concrete-repair/sikagrout-212.html",
    accentColor: "#dc2626",
    name: "Sika® SikaGrout®-212 / SikaRep® rapid-set mortar",
    descriptionLine: "Sika rapid-set cementitious repair mortar — used for forming or reinstating balcony door hob upstands where a fast return to service is required — achieves structural strength within hours — confirm current product name and specification with Sika Australia before specifying",
    productType: "Rapid-set cementitious repair mortar — hob formation",
    filterTags: ["Rapid-set", "Concrete", "Mortar", "Hob", "Balcony", "AS-3600", "Cementitious", "High-strength"],
    techChips: [
      { label: "Sika rapid-set", cls: "bg-slate-100 text-slate-700" },
      { label: "High strength", cls: "bg-sky-100 text-sky-800" },
      { label: "Fast cure", cls: "bg-green-50 text-green-700" },
      { label: "Confirm current product", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Sika rapid-set repair mortars (such as SikaGrout-212, SikaRep rapid-set mortar or current equivalent) are used for forming or reinstating balcony door hob upstands where a fast return to service is required. The mortar achieves structural strength within hours, allowing waterproofing trades to begin work on the hob the same day or the following day rather than waiting the 7–14 days required for standard concrete. The substrate must be prepared by cutting back to sound concrete, cleaning with a mechanical method (not acid wash before priming), saturating with water (SSD condition), and applying a compatible Sika primer or bonding agent immediately before placing the mortar. Confirm the minimum hob height requirement with the NCC and the project waterproofing specification before forming the hob. Confirm the current product name, mix ratios and current TDS with Sika Australia before specifying — product ranges are updated periodically. TODO: owner confirm — confirm preferred Sika rapid mortar product and current specification before use.",
    technicalProperties: [
      "Rapid-set cementitious repair mortar — achieves structural strength within hours of placing",
      "High compressive strength — suitable for structural hob formation and repair",
      "Requires priming with Sika bonding agent — confirm compatible primer with current Sika TDS",
      "Mix to TDS directions — do not add extra water — water:powder ratio is critical to strength",
      "Substrate must be in SSD (saturated surface dry) condition before placing — no free water",
      "TODO: owner confirm — confirm current product name and spec with Sika Australia",
    ],
    limitations: [
      "Short pot life — rapid-set mortar must be placed and finished quickly — confirm pot life for site temperature",
      "Not suitable for placing in hot weather without cooling measures — confirm pot life in summer conditions",
      "Substrate preparation is critical — unbonded mortar will delaminate under waterproofing and traffic",
      "Hob height must comply with NCC and project waterproofing specification — confirm before forming",
      "TODO: owner confirm — confirm current Sika product name and TDS before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — direct or through distributors", url: "https://aus.sika.com" },
      { name: "Parchem Construction Supplies — Sika product supply", url: "https://www.parchem.com.au" },
      { name: "ITW Polymers & Fluids / building trade suppliers — repair mortars", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions/products/detail/planitop-xtra",
    accentColor: "#0369a1",
    name: "Mapei Planitop® Xtra / Planitop® Rapid rapid-set structural mortar",
    descriptionLine: "Mapei rapid-set structural repair mortar — suitable for balcony hob formation and repair where fast return to service is required — fibre-reinforced formulation available — confirm current product name and specification with Mapei Australia before specifying",
    productType: "Rapid-set structural repair mortar — balcony hob — Mapei",
    filterTags: ["Rapid-set", "Concrete", "Mortar", "Hob", "Balcony", "AS-3600", "Cementitious", "High-strength"],
    techChips: [
      { label: "Mapei rapid-set", cls: "bg-slate-100 text-slate-700" },
      { label: "Fibre-reinforced", cls: "bg-sky-100 text-sky-800" },
      { label: "Structural grade", cls: "bg-green-50 text-green-700" },
      { label: "Confirm current product", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Mapei Planitop Xtra or Planitop Rapid (or current equivalent rapid-set structural mortar) is a polymer-modified, rapid-strength-gain repair mortar suitable for balcony door hob formation and repair where a fast return to service is required. Fibre-reinforced formulations (e.g., Planitop Xtra) provide improved crack resistance in thin section hob applications. Substrate must be cut back to sound concrete, cleaned, and primed with a compatible Mapei bonding agent (e.g., Primer E or Eporip) before placing the mortar. The substrate must be in SSD condition — no free water. Confirm hob height with NCC and the project waterproofing specification before forming. Confirm the current product name, formulation and TDS with Mapei Australia before specifying — product range is updated periodically. All waterproofing membranes applied over the hob must be compatible with the mortar — confirm with the waterproofing product manufacturer. TODO: owner confirm — confirm preferred Mapei rapid mortar product before specifying.",
    technicalProperties: [
      "Rapid-set polymer-modified structural mortar — fast strength gain for early waterproofing installation",
      "Fibre-reinforced formulation available — improved crack resistance in thin section applications",
      "Requires priming with Mapei bonding agent — confirm compatible primer with current Mapei TDS",
      "SSD substrate condition required — no free water or dry, dusty surface at time of placing",
      "Compatible with Mapei waterproofing membranes — confirm compatibility with project WP system",
      "TODO: owner confirm — confirm current product name and formulation with Mapei Australia",
    ],
    limitations: [
      "Rapid-set — confirm pot life for site temperature before commencing — hot weather reduces working time",
      "Substrate preparation and priming is critical — delamination of unprimed mortar will undermine WP",
      "Hob height must comply with NCC and project WP spec — confirm before forming",
      "Confirm compatibility with the specific waterproofing system being applied over the hob",
      "TODO: owner confirm — confirm current Mapei product name and TDS",
    ],
    procurementSources: [
      { name: "Mapei Australia — direct supply or through distributors", url: "https://www.mapei.com/au" },
      { name: "Parchem Construction Supplies — Mapei product supply", url: "https://www.parchem.com.au" },
      { name: "Building trade suppliers — Mapei repair mortars", url: "https://www.mapei.com/au" },
    ],
  },
  {
    fullLabel: "Ardex Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://www.ardex.com.au/products/ardex-k-22/",
    accentColor: "#7c3aed",
    name: "Ardex Pandomo® / Ardex K 22 rapid-set floor and repair mortar",
    descriptionLine: "Ardex rapid-set concrete repair and resurfacing mortar — suitable for balcony hob formation and repair in remedial applications — confirm current product selection with Ardex Australia for hob formation applications before specifying",
    productType: "Rapid-set concrete repair mortar — balcony hob — Ardex",
    filterTags: ["Rapid-set", "Concrete", "Mortar", "Hob", "Balcony", "Cementitious"],
    techChips: [
      { label: "Ardex rapid-set", cls: "bg-slate-100 text-slate-700" },
      { label: "Repair mortar", cls: "bg-sky-100 text-sky-800" },
      { label: "Fast strength gain", cls: "bg-green-50 text-green-700" },
      { label: "TODO: confirm product", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Ardex produces a range of rapid-set cementitious repair and resurfacing products suitable for balcony hob formation and repair. Products such as Ardex K 22, Ardex Pandomo or the current equivalent rapid-set structural mortar can be used for forming or reinstating balcony door hob upstands. As with other rapid-set mortars, substrate preparation (cut back to sound concrete, clean, prime, SSD condition) is critical. Hob height must comply with NCC and the project waterproofing specification. Confirm the most appropriate current Ardex product for hob formation with the Ardex technical team before specifying — Ardex has a broad product range and the most suitable product for the specific application should be confirmed. All waterproofing systems applied over the hob must be confirmed as compatible with the Ardex repair mortar. TODO: owner confirm — confirm preferred Ardex rapid mortar product for hob formation with Ardex Australia before specifying.",
    technicalProperties: [
      "Ardex rapid-set mortar range — fast strength gain for early return to waterproofing installation",
      "Suitable for balcony hob formation and repair in remedial applications",
      "Requires substrate preparation and compatible Ardex primer — confirm with current Ardex TDS",
      "SSD substrate condition required — no free water at time of placing",
      "TODO: owner confirm — confirm specific Ardex product selection for hob formation application",
    ],
    limitations: [
      "Confirm specific Ardex product for hob formation with Ardex Australia — broad product range, not all suitable",
      "Rapid-set — confirm pot life for site temperature — reduce batch sizes in hot weather",
      "Substrate preparation is critical — delamination will occur on unprimed or contaminated substrate",
      "Confirm waterproofing membrane compatibility with specific Ardex product before specifying",
      "TODO: owner confirm — confirm product selection and current TDS with Ardex Australia",
    ],
    procurementSources: [
      { name: "Ardex Australia — direct or through distributors", url: "https://www.ardex.com.au" },
      { name: "Parchem Construction Supplies — Ardex product supply", url: "https://www.parchem.com.au" },
      { name: "Building trade suppliers — Ardex repair mortars", url: "https://www.ardex.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Rapid-set", label: "Rapid set" },
  { id: "High-strength", label: "High strength" },
  { id: "Cementitious", label: "Cementitious" },
  { id: "Mortar", label: "Mortar" },
  { id: "Hob", label: "Hob" },
  { id: "Balcony", label: "Balcony" },
  { id: "AS-3600", label: "AS 3600" },
];

const SYSTEM_COMPARISON = [
  { product: "Sika SikaGrout-212 / SikaRep rapid-set", brand: "Sika", type: "Rapid-set mortar", pot: "Short — confirm", priming: "Sika bonding agent", strength: "High", primaryUse: "Sika rapid hob formation — confirm current product name with Sika Australia" },
  { product: "Mapei Planitop Xtra / Planitop Rapid", brand: "Mapei", type: "Rapid-set mortar", pot: "Short — confirm", priming: "Mapei bonding agent", strength: "High", primaryUse: "Mapei rapid hob formation — fibre-reinforced option available — confirm current product" },
  { product: "Ardex K 22 / Ardex rapid mortar", brand: "Ardex", type: "Rapid-set mortar", pot: "Short — confirm", priming: "Ardex primer", strength: "High", primaryUse: "Ardex rapid hob formation — confirm specific product with Ardex Australia" },
];

const TECH_INFO = {
  typicalApplications: [
    "Formation of new balcony door hob upstands where the original hob is absent or too low to comply with NCC",
    "Reinstatement of failed, spalled or cracked hob upstands as part of balcony waterproofing remediation",
    "Rapid-set hob formation where early return to service is required to minimise disruption to building occupants",
    "Hob repair as part of a complete balcony waterproofing replacement program on strata buildings",
    "Repair of hob concrete prior to application of a new waterproofing membrane system",
  ],
  selectionCriteria: [
    "Confirm minimum hob height with NCC Volume One and the project waterproofing specification before forming",
    "Confirm rapid-set pot life for the site temperature before commencing work — hot weather significantly reduces working time",
    "Substrate must be cut back to sound concrete, free of laitance, and in SSD condition before placing",
    "Apply compatible primer or bonding agent immediately before placing mortar — do not allow primer to dry out",
    "Confirm compatibility of the rapid-set mortar with the waterproofing membrane system being applied over the hob",
    "Confirm current product name and TDS with the manufacturer before specifying — product ranges are updated periodically",
  ],
  limitations: [
    "Not suitable for structural hob formation without engineer sign-off — confirm design with structural engineer",
    "Short pot life in hot weather — restrict batch sizes and plan work to avoid mortar going off in the bucket",
    "Substrate preparation failures (no primer, dry substrate, contamination) are the most common cause of delamination",
    "Hob height below NCC minimum will result in non-compliance — measure existing hob before specifying repair depth",
    "Cannot replace a structurally failed hob without demolition and reinstatement — assess before specifying mortar topping only",
  ],
  standardsNotes: [
    "AS 3600 — concrete structures — repair material performance requirements",
    "NCC Volume One — balcony and wet area threshold height requirements",
    "AS 3740 — waterproofing of domestic wet areas — hob and threshold height requirements",
    "Manufacturer TDS — confirm mix ratios, pot life, priming requirements and curing times",
  ],
  suitableDefects: [
    "Absent or inadequate balcony door hob upstand — hob height below NCC minimum threshold",
    "Spalled, cracked or delaminated hob concrete requiring repair before waterproofing membrane application",
    "Hob concrete contaminated with old waterproofing membrane residue requiring cut-back and reinstatement",
    "Hob damaged by balcony door installation or modification requiring rapid reinstatement before re-waterproofing",
  ],
  typicalSubstrates: [
    "Sound concrete slab — cut back to sound concrete, clean, prime and place mortar in SSD condition",
    "Masonry hob — confirm compatibility of repair mortar with masonry substrate before specifying",
    "Not suitable for substrates with active water pressure or where the substrate is wet at time of placing",
    "Not suitable for placement over existing waterproofing membrane — must be removed to bare substrate",
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
        <button onClick={() => setExpanded(e => !e)} className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600">
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
        <button onClick={() => setExpanded(e => !e)} className="text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide ↑" : "See more ↓"}</button>
      </div>
      {expanded && (
        <div className="mt-2 space-y-1.5">
          {sources.map(src => (
            <div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs">
              {src.url ? <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">{src.name}<ExternalLink size={9} className="text-slate-300" /></a> : <span className="font-semibold text-slate-600">{src.name}</span>}
            </div>
          ))}
        </div>
      )}
      <p className="mt-2 text-[10px] italic text-slate-400">Confirm current product name, TDS and pot life for site conditions before ordering.</p>
    </div>
  );
}

function CollapsibleCardDetails({ text, chips }: { text: string; chips: { label: string; cls: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      {expanded && (<><p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>{chips.length > 0 && <div className="mt-2 flex flex-wrap gap-1.5">{chips.map(chip => <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>)}</div>}</>)}
      <button onClick={() => setExpanded(e => !e)} className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide details ↑" : "Show details ↓"}</button>
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>{text}</p>
      <button onClick={() => setExpanded(e => !e)} className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900">{expanded ? "Show less ↑" : "Show more ↓"}</button>
    </div>
  );
}

export function QuickSetConcreteIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are rapid-set concrete systems for balcony door hobs?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Rapid-set cementitious mortars are used to form or reinstate balcony door hob upstands where a fast return to service is required. In remedial waterproofing programs on strata buildings, the balcony hob is often the critical path — the waterproofing trade cannot start until the hob is at the correct height and the mortar has cured. Rapid-set products cut this waiting time from 7–14 days (normal concrete) to hours.</p>
        {expanded && <p>The balcony door hob (also called the threshold upstand) must meet a minimum height above the finished floor level as set out in the NCC and the project waterproofing specification — typically 25mm minimum for internal waterproofed areas and higher for external balconies. Where the existing hob is absent, too low, or has been damaged, a rapid-set repair mortar is used to form or build up the hob to the required height. Substrate preparation is critical — the existing concrete must be cut back to a sound surface, cleaned, saturated (SSD condition) and primed with a compatible bonding agent immediately before placing the mortar. Confirm the current product name and TDS with the manufacturer before specifying — rapid-set mortar product ranges are frequently updated.</p>}
      </div>
      <button onClick={() => setExpanded(e => !e)} className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900">{expanded ? "Read less ↑" : "Read more ↓"}</button>
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

export function QuickSetConcreteProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (id: FilterTag) => {
    setActiveFilters(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  };

  const visibleProducts = activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter(p => Array.from(activeFilters).every(f => p.filterTags.includes(f)));
  const scroll = (dir: "left" | "right") => scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button type="button" onClick={() => setAccordionOpen(o => !o)} className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable substrates</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? <>Hide detail <ChevronUp size={14} /></> : <>Show detail <ChevronDown size={14} /></>}
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

      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">3 products — rapid-set concrete systems for balcony hob — scroll to view all</p>
          </div>
        </div>
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map(f => {
            const active = activeFilters.has(f.id);
            return (
              <button key={f.id} type="button" onClick={() => toggleFilter(f.id)} className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}>
                {f.label}
              </button>
            );
          })}
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
          {visibleProducts.map(product => (
            <div key={product.name} className="flex-none" style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ borderLeft: `4px solid ${product.accentColor}` }}>
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">{product.fullLabel}</span>
                    <div className="flex shrink-0 items-center gap-1">
                      <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><ExternalLink size={9} /> Supplier</a>
                      {product.tdsUrl && <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><ExternalLink size={9} /> TDS</a>}
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                  <CollapsibleCardDetails text={product.descriptionLine} chips={product.techChips} />
                </div>
                <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
                  <CollapsibleDescription text={product.systemDescription} />
                </div>
                <div className="space-y-3 px-5 py-4">
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-green-700">Technical Properties</p>
                    <CollapsibleList items={product.technicalProperties} icon="check" limit={3} />
                  </div>
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">Limitations</p>
                    <CollapsibleList items={product.limitations} icon="x" limit={3} />
                  </div>
                </div>
                <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3">
                  <CollapsibleSources sources={product.procurementSources} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of rapid-set concrete hob systems. Confirm current product names and pot life before ordering.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Pot life</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Priming</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Strength</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.pot}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.priming}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.strength}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.primaryUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
