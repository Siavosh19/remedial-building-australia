"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag = "Two-part" | "PU" | "Facade" | "High-movement" | "Paintable" | "Concrete" | "Precast" | "Masonry" | "ISO-11600" | "Horizontal" | "Vertical";

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
    brandUrl: "https://www.sika.com/au",
    accentColor: "#dc2626",
    name: "Sika Sikaflex-2CSL",
    descriptionLine: "Two-part, self-leveling polyurethane joint sealant — for horizontal facade joints and traffic-exposed deck joints — high movement accommodation — mixed A+B components on site — widely used on Australian precast concrete facade and carpark structures",
    productType: "Two-part self-leveling polyurethane sealant — horizontal joints",
    filterTags: ["Two-part", "PU", "Facade", "High-movement", "Concrete", "Precast", "ISO-11600", "Horizontal"],
    techChips: [
      { label: "Two-part", cls: "bg-slate-100 text-slate-700" },
      { label: "Self-leveling", cls: "bg-sky-100 text-sky-800" },
      { label: "High movement", cls: "bg-amber-50 text-amber-700" },
      { label: "Horizontal joints", cls: "bg-green-50 text-green-700" },
      { label: "ISO 11600", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription: "Sikaflex-2CSL is a two-part, self-leveling polyurethane joint sealant designed for horizontal movement joints, expansion joints and control joints in precast concrete facades, concrete decks and plaza areas. Unlike one-part PU sealants, it requires mixing of A and B components on site and has a defined pot life — careful batching and timing is essential. Two-part PU sealants generally offer higher movement accommodation than one-part systems, making them suitable for wide or highly active movement joints. Sikaflex-2CSL self-levels after application and is suitable for horizontal joint orientations where gravity allows the sealant to flow and self-smooth. Backer rod is required for joint depth control. Primer (Sika Primer-3N or substrate-specific Sika primer) is typically required on porous substrates — confirm with Sika Australia technical. TODO: owner confirm — confirm current Australian product designation, movement class, mixing ratio, pot life and primer requirements with Sika Australia technical.",
    technicalProperties: [
      "Two-part — A+B mixed on site — defined pot life (confirm from current TDS)",
      "Self-leveling — suitable for horizontal joints — not suitable for vertical or overhead joints",
      "High movement accommodation — confirm movement class from current Sika TDS",
      "Paintable after cure — confirm paint compatibility with Sika Australia",
      "Primer required on most porous substrates — Sika Primer-3N or system primer",
      "TODO: owner confirm — confirm mixing ratio, pot life, movement class and primer requirements",
    ],
    limitations: [
      "Self-leveling — not suitable for vertical or overhead joint application",
      "Two-part mixing required — more complex site application than one-part systems",
      "Defined pot life — material must be applied within pot life window once mixed",
      "Primer required on most substrates — do not apply without primer on porous or non-porous substrates without confirming TDS",
      "Not suitable for structural glazing bonding",
      "TODO: owner confirm — confirm all application parameters, pot life and substrate requirements with Sika Australia",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply", url: "https://www.sika.com/au" },
      { name: "Bayset — national distribution", url: "https://www.bayset.com.au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Tremco Australia",
    brandUrl: "https://www.tremcoinc.com.au",
    accentColor: "#0369a1",
    name: "Tremco Dymeric 240 FC",
    descriptionLine: "Two-part polyurethane joint sealant — for vertical and horizontal facade expansion joints — high movement accommodation — paintable — used in commercial and strata facade remediation across Australia",
    productType: "Two-part polyurethane sealant — facade expansion joints",
    filterTags: ["Two-part", "PU", "Facade", "High-movement", "Paintable", "Concrete", "Masonry", "ISO-11600", "Vertical"],
    techChips: [
      { label: "Two-part", cls: "bg-slate-100 text-slate-700" },
      { label: "High movement", cls: "bg-sky-100 text-sky-800" },
      { label: "Paintable", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Tremco Dymeric 240 FC is a two-part, chemically curing polyurethane sealant designed for facade expansion joints, structural movement joints and wide-movement facade applications. As a two-part system, it requires careful mixing of A and B components on site and must be applied within the pot life window. Two-part PU sealants are typically specified for joints with higher movement demands than one-part systems can accommodate, or where faster cure and better low-temperature performance is required. Primer (Tremco 636 or Primer AP) may be required on porous or non-porous substrates — confirm primer selection and application with Tremco Australia technical. TODO: owner confirm — confirm current Australian product designation, movement class, mixing ratio, pot life, primer requirements and availability with Tremco Australia technical.",
    technicalProperties: [
      "Two-part chemically curing — A+B mixed on site — faster cure than moisture-curing one-part systems",
      "High movement accommodation — confirm movement class from current Tremco TDS",
      "Suitable for vertical and horizontal facade joint orientations",
      "Paintable after cure — confirm paint compatibility with Tremco Australia",
      "Primer may be required — confirm substrate-specific primer with Tremco",
      "TODO: owner confirm — confirm all parameters from current Tremco TDS",
    ],
    limitations: [
      "Two-part — defined pot life — must be applied promptly after mixing",
      "More complex site application than one-part systems — trained applicator recommended",
      "Primer may be required on most substrates — do not skip primer without TDS confirmation",
      "Not suitable for structural glazing",
      "Do not apply on wet or frozen substrates",
      "TODO: owner confirm — confirm movement class, primer requirements and current Australian product range with Tremco Australia",
    ],
    procurementSources: [
      { name: "Tremco Australia — trade supply", url: "https://www.tremcoinc.com.au" },
      { name: "Bayset — national distribution", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc Australia",
    brandUrl: "https://www.fosroc.com/au",
    accentColor: "#7c3aed",
    name: "Fosroc Expandite Plastijoint",
    descriptionLine: "Two-part polyurethane joint sealant — suitable for facade movement joints, construction joints and expansion joints in concrete structures — widely used in Australian commercial and strata building remediation",
    productType: "Two-part polyurethane sealant — construction and facade joints",
    filterTags: ["Two-part", "PU", "Facade", "High-movement", "Concrete", "Precast", "Masonry", "ISO-11600"],
    techChips: [
      { label: "Two-part PU", cls: "bg-slate-100 text-slate-700" },
      { label: "Construction joints", cls: "bg-sky-100 text-sky-800" },
      { label: "Facade joints", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Fosroc Expandite Plastijoint is a two-part polyurethane joint sealant used in Australian construction and remediation for movement joints, expansion joints and construction joints in concrete facades, precast panels and masonry structures. Fosroc is a well-established Australian-market brand with a comprehensive technical support network. Two-part PU systems from Fosroc are commonly specified in commercial and strata remediation where a higher movement accommodation or chemically curing system is required. Confirm the current product range and system designation with Fosroc Australia technical, as product names and formulations may have been updated. Primer (Fosroc Nitobond EP or substrate-specific primer) is typically required — confirm with Fosroc technical. TODO: owner confirm — confirm current product designation, movement class, mixing ratio, pot life and primer requirements with Fosroc Australia.",
    technicalProperties: [
      "Two-part — A+B mixed on site — chemically curing without dependence on atmospheric moisture",
      "Suitable for construction joints, expansion joints and facade movement joints",
      "Good adhesion to concrete and masonry — primer required on most substrates",
      "Fosroc national technical and distribution network in Australia",
      "TODO: owner confirm — confirm movement class, pot life, mixing ratio and primer requirements from current Fosroc TDS",
    ],
    limitations: [
      "Two-part — defined pot life — must be used within pot life window after mixing",
      "Primer required on most substrates — confirm with Fosroc Australia technical",
      "Not suitable for structural glazing bonding",
      "Do not apply on wet or contaminated substrates",
      "TODO: owner confirm — confirm current product designation and all technical data with Fosroc Australia",
    ],
    procurementSources: [
      { name: "Fosroc Australia — trade supply", url: "https://www.fosroc.com/au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
      { name: "Bayset — national distribution", url: "https://www.bayset.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Two-part", label: "Two-part" },
  { id: "PU", label: "Polyurethane" },
  { id: "Facade", label: "Facade" },
  { id: "High-movement", label: "High movement" },
  { id: "Paintable", label: "Paintable" },
  { id: "Concrete", label: "Concrete" },
  { id: "Precast", label: "Precast" },
  { id: "Masonry", label: "Masonry" },
  { id: "ISO-11600", label: "ISO 11600" },
  { id: "Horizontal", label: "Horizontal joints" },
  { id: "Vertical", label: "Vertical joints" },
];

const SYSTEM_COMPARISON = [
  { product: "Sikaflex-2CSL", brand: "Sika", parts: "Two", movement: "High — confirm TDS", paintable: "Yes — confirm", primer: "Required — confirm substrate", primaryUse: "Horizontal expansion joints, precast concrete facades, traffic deck joints" },
  { product: "Dymeric 240 FC", brand: "Tremco", parts: "Two", movement: "High — confirm TDS", paintable: "Yes — confirm", primer: "May be required — confirm", primaryUse: "Facade expansion joints, structural movement joints — vertical and horizontal" },
  { product: "Expandite Plastijoint", brand: "Fosroc", parts: "Two", movement: "Confirm TDS", paintable: "Confirm TDS", primer: "Required — confirm substrate", primaryUse: "Construction joints, expansion joints, facade movement joints in concrete structures" },
];

const TECH_INFO = {
  typicalApplications: [
    "Wide facade expansion joints where one-part PU movement accommodation is insufficient",
    "Horizontal movement joints in precast concrete facade panels and spandrel beams",
    "High-movement control joints in concrete facades with significant thermal cycling",
    "Construction joint sealing in concrete facades and structure-to-facade interfaces",
    "Traffic-exposed joint sealing in elevated carpark facades and podium decks",
  ],
  selectionCriteria: [
    "Movement accommodation — confirm higher movement class required before specifying two-part over one-part",
    "Joint orientation — self-leveling systems for horizontal joints; non-sag systems for vertical joints",
    "Pot life — confirm applicator can complete work within pot life window on site",
    "Primer requirement — confirm substrate-specific primer with manufacturer before application",
    "Cure mechanism — two-part chemical curing is independent of moisture, unlike one-part PU",
    "Applicator competency — two-part mixing requires trained applicator and correct equipment",
  ],
  limitations: [
    "Two-part mixing adds site complexity and potential for incorrect mixing ratios",
    "Defined pot life — waste increases if batches are too large for available workforce",
    "Not suitable for structural glazing bonding — structural silicone required",
    "Not suitable for permanently submerged joints — polysulfide or specialist product required",
    "Primer typically required on all substrates — check TDS carefully before applying without primer",
  ],
  standardsNotes: [
    "ISO 11600 — Building Construction — Jointing products — Classification and requirements for sealants",
    "ASTM C 920 — Standard specification for elastomeric joint sealants",
    "AS 3600 — Concrete structures — movement joint design requirements",
    "Manufacturer TDS — confirm all mixing ratios, pot life, primer and movement class before specifying",
  ],
  suitableDefects: [
    "Failed high-movement facade expansion joints where one-part sealant has inadequate movement accommodation",
    "Failed horizontal joint sealant in precast concrete facade panels",
    "Open or debonded construction joint sealant in concrete facades",
    "Deteriorated expansion joint in elevated carpark facade or podium structure",
  ],
  typicalSubstrates: [
    "Precast concrete — external facade panels and spandrel beams",
    "In-situ concrete — cast facades, columns and slabs",
    "Masonry — block and brick facade construction joints",
    "Render over concrete — where render has been applied over concrete substrate",
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
      <p className="mt-2 text-[10px] italic text-slate-400">Confirm suitability with the current manufacturer TDS before specifying or applying.</p>
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

export function PU2PartIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are two-part polyurethane sealant systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Two-part polyurethane (PU) sealants consist of two separate components — typically a base (Part A) and a curative or activator (Part B) — that must be mixed together on site in the correct ratio before application. Unlike one-part PU sealants which cure by reaction with atmospheric moisture, two-part systems cure by a chemical reaction between the two components, making cure speed independent of humidity. This provides a more predictable cure, faster development of full mechanical properties, and generally higher movement accommodation than one-part equivalents.</p>
        {expanded && <p>Two-part PU sealants are used in Australian facade remediation where joint movement demands exceed the accommodation of one-part systems — typically for wide expansion joints in precast concrete facades, high-movement construction joints, or joints subject to significant thermal cycling. The trade-off is increased application complexity: once mixed, the sealant must be applied within its pot life window, which varies by product and ambient temperature. Primer is almost always required on substrate surfaces. Applicators must be trained in mixing procedures and joint preparation. In Class 2 strata remediation, two-part PU is less commonly specified than one-part for routine perimeter and control joint work, but is the correct choice for expansion joints in precast concrete panel facades and similar high-movement applications.</p>}
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

export function PU2PartProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — two-part polyurethane facade sealant systems — scroll to view all</p>
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
                      {product.tdsUrl && <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><FileText size={9} /> TDS</a>}
                      <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><ExternalLink size={9} /> Brand Site</a>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of two-part PU sealant systems. Confirm all product selections against the current manufacturer TDS before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Components</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Movement</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Paintable</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Primer</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.parts}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.movement}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.paintable}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.primer}</td>
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
