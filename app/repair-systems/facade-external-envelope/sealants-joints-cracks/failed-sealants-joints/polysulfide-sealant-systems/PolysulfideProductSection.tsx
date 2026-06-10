"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag = "Polysulfide" | "Two-part" | "Chemical-resistant" | "Immersed" | "Facade" | "Concrete" | "Masonry" | "ISO-11600" | "Pool" | "Paintable";

type Product = {
  fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string;
  name: string; descriptionLine: string; productType: string;
  filterTags: FilterTag[]; techChips: { label: string; cls: string }[];
  systemDescription: string; technicalProperties: string[];
  limitations: string[]; procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Fosroc Australia",
    brandUrl: "https://www.fosroc.com/au",
    tdsUrl: "https://www.fosroc.com/au",
    accentColor: "#dc2626",
    name: "Fosroc Thioflex 600",
    descriptionLine: "Two-part polysulfide joint sealant — chemical resistant — suitable for concrete facade joints, water-retaining structures and immersed joint applications — widely used in Australian construction and remediation",
    productType: "Two-part polysulfide sealant — facade / water-retaining structures",
    filterTags: ["Polysulfide", "Two-part", "Chemical-resistant", "Immersed", "Facade", "Concrete", "ISO-11600", "Paintable"],
    techChips: [
      { label: "Two-part", cls: "bg-slate-100 text-slate-700" },
      { label: "Polysulfide", cls: "bg-sky-100 text-sky-800" },
      { label: "Chemical resistant", cls: "bg-green-50 text-green-700" },
      { label: "Immersed joints", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Fosroc Thioflex 600 is a two-part polysulfide joint sealant used in Australian construction for facade movement joints, water-retaining structure joints, basement joints and other applications requiring chemical resistance or suitability in immersed conditions. Polysulfide sealants have been used in Australian construction for decades and are the traditional choice for water-retaining structures, potable water tanks and fuel-resistant applications. Thioflex 600 requires mixing of A and B components on site and must be applied within the pot life window. Primer (Fosroc Nitobond or substrate-specific primer) is required on most substrates — confirm with Fosroc Australia technical. In facade remediation, polysulfide has largely been superseded by polyurethane sealants for most movement joint applications, but remains the correct choice for specialist immersed and chemical-resistance applications. TODO: owner confirm — confirm current Australian product designation, mixing ratio, pot life and primer requirements with Fosroc Australia technical.",
    technicalProperties: [
      "Two-part — A+B mixed on site — chemically curing",
      "Excellent chemical resistance — suitable for immersed joints and water-retaining structures",
      "Fuel-resistant formulation available — confirm product variant with Fosroc",
      "Paintable after cure — confirm paint compatibility",
      "Primer required — confirm substrate-specific primer with Fosroc Australia",
      "TODO: owner confirm — confirm movement class, pot life and primer from current Fosroc TDS",
    ],
    limitations: [
      "Older technology — polyurethane sealants are generally preferred for facade movement joints in current Australian practice",
      "Two-part — defined pot life — more complex site application than one-part systems",
      "Primer required on most substrates",
      "Not suitable for structural glazing bonding",
      "UV resistance lower than silicone — confirm UV suitability for exposed facade applications",
      "TODO: owner confirm — confirm current product designation and all application parameters with Fosroc Australia",
    ],
    procurementSources: [
      { name: "Fosroc Australia — trade supply", url: "https://www.fosroc.com/au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
      { name: "Bayset — national distribution", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://www.sika.com/au",
    tdsUrl: "https://www.sika.com/au",
    accentColor: "#0369a1",
    name: "Sika Sikaflex-2AP",
    descriptionLine: "Two-part polysulfide sealant — suitable for immersed joints, water-retaining structures and chemical-resistance applications — Australian market availability — confirm current designation with Sika Australia",
    productType: "Two-part polysulfide sealant — specialist immersed / chemical-resistance",
    filterTags: ["Polysulfide", "Two-part", "Chemical-resistant", "Immersed", "Concrete", "Masonry", "Pool", "ISO-11600"],
    techChips: [
      { label: "Two-part", cls: "bg-slate-100 text-slate-700" },
      { label: "Polysulfide", cls: "bg-sky-100 text-sky-800" },
      { label: "Immersed joints", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Sika manufactures polysulfide sealant products for specialist construction applications including water-retaining structures, immersed joints, chemical plant and fuel-resistant applications. Polysulfide sealants from Sika are used in Australian construction where chemical resistance, fuel resistance or suitability for permanently immersed conditions is required — applications where polyurethane sealants are not appropriate. Confirm the current Australian product designation and product range with Sika Australia technical, as polysulfide products may be marketed under different product codes or may have been updated. Primer is required on all substrates — confirm the correct Sika primer for the specific substrate with Sika Australia technical. TODO: owner confirm — confirm current product designation, mixing ratio, pot life, movement class and primer requirements with Sika Australia.",
    technicalProperties: [
      "Two-part polysulfide — chemically curing — independent of moisture",
      "Chemical resistance — fuel resistance — immersed joint suitability",
      "Sika national distribution and technical support",
      "Paintable after cure — confirm compatibility with Sika Australia",
      "TODO: owner confirm — confirm all technical data and product designation from current Sika TDS",
    ],
    limitations: [
      "Polyurethane is generally preferred over polysulfide for routine facade movement joint applications in current Australian practice",
      "Primer required on all substrates",
      "Two-part — defined pot life — trained applicator required",
      "TODO: owner confirm — confirm current product designation and all application parameters with Sika Australia technical",
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
    tdsUrl: "https://www.tremcoinc.com.au",
    accentColor: "#7c3aed",
    name: "Tremco Thiokol 2235M",
    descriptionLine: "Two-part polysulfide joint sealant — chemical resistant — fuel resistant formulation — used in Australian facade, civil and industrial construction for immersed and chemical exposure joints — confirm availability with Tremco Australia",
    productType: "Two-part polysulfide sealant — fuel-resistant / chemical-resistance grade",
    filterTags: ["Polysulfide", "Two-part", "Chemical-resistant", "Immersed", "Concrete", "Masonry", "ISO-11600"],
    techChips: [
      { label: "Two-part", cls: "bg-slate-100 text-slate-700" },
      { label: "Fuel resistant", cls: "bg-sky-100 text-sky-800" },
      { label: "Chemical resistant", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Tremco Thiokol 2235M is a two-part polysulfide joint sealant known for its chemical and fuel resistance, historically used in aviation and industrial construction as well as building facade and water-retaining structure joints. Polysulfide sealants of this type are specified where resistance to fuels, solvents or chemical exposure is required in addition to movement accommodation — making them suitable for carpark joints, fuel-exposed areas and chemical plant construction. In Australian facade remediation, polysulfide remains the correct choice for specialist immersed and chemical-resistance applications. Primer is required on most substrates — confirm primer selection with Tremco Australia technical. TODO: owner confirm — confirm current Australian product designation, availability, mixing ratio, pot life and primer requirements with Tremco Australia.",
    technicalProperties: [
      "Two-part polysulfide — fuel resistant — chemical resistant",
      "Suitable for aviation fuel-exposed joints and carpark movement joints",
      "Suitable for immersed and water-retaining structure joints",
      "Primer required on all substrates — confirm with Tremco technical",
      "TODO: owner confirm — confirm current designation, availability and parameters with Tremco Australia",
    ],
    limitations: [
      "Specialist product — not required for routine facade movement joint applications",
      "Polysulfide largely superseded by polyurethane for non-chemical-resistance facade applications",
      "Two-part — defined pot life — trained applicator required",
      "Primer required on all substrates",
      "TODO: owner confirm — confirm current product designation and Australian availability with Tremco Australia",
    ],
    procurementSources: [
      { name: "Tremco Australia — trade supply", url: "https://www.tremcoinc.com.au" },
      { name: "Bayset — national distribution", url: "https://www.bayset.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Polysulfide", label: "Polysulfide" },
  { id: "Two-part", label: "Two-part" },
  { id: "Chemical-resistant", label: "Chemical resistant" },
  { id: "Immersed", label: "Immersed joints" },
  { id: "Facade", label: "Facade" },
  { id: "Concrete", label: "Concrete" },
  { id: "Masonry", label: "Masonry" },
  { id: "ISO-11600", label: "ISO 11600" },
  { id: "Pool", label: "Pool / water" },
  { id: "Paintable", label: "Paintable" },
];

const SYSTEM_COMPARISON = [
  { product: "Thioflex 600", brand: "Fosroc", parts: "Two", chemResist: "Excellent", immersed: "Yes", movement: "Confirm TDS", primaryUse: "Facade joints, water-retaining structures, basement joints, immersed applications" },
  { product: "Sikaflex-2AP", brand: "Sika", parts: "Two", chemResist: "Confirm TDS", immersed: "Confirm TDS", movement: "Confirm TDS", primaryUse: "Specialist immersed and chemical-resistance applications — confirm with Sika Australia" },
  { product: "Thiokol 2235M", brand: "Tremco", parts: "Two", chemResist: "Excellent — fuel resistant", immersed: "Yes", movement: "Confirm TDS", primaryUse: "Fuel-resistant joints, aviation, carpark and chemical-exposure joint applications" },
];

const TECH_INFO = {
  typicalApplications: [
    "Water-retaining structure joints — tanks, reservoirs, basements and water features",
    "Pool joint sealing — movement joints in concrete swimming pools",
    "Fuel-resistant joint sealing in carparks and aviation structures",
    "Chemical plant and industrial structure facade joints",
    "Basement and below-ground joint sealing where chemical resistance is required",
  ],
  selectionCriteria: [
    "Polysulfide is the correct choice when chemical resistance, fuel resistance or permanent immersion is the primary requirement",
    "For routine facade movement joints not involving chemical or immersion exposure, prefer polyurethane sealant over polysulfide",
    "Confirm two-part mixing requirement, pot life and primer for each specific substrate with manufacturer",
    "Confirm chemical or fuel resistance grade matches the specific exposure condition from TDS",
    "Applicator must be trained in two-part mixing procedures",
  ],
  limitations: [
    "Polysulfide largely superseded by polyurethane for routine facade movement joints in current Australian practice",
    "Two-part mixing required — more complex than one-part sealant systems",
    "Defined pot life — waste if batching size not matched to workforce capacity",
    "Not suitable for structural glazing bonding",
    "UV resistance lower than silicone — confirm UV stability for exposed outdoor facade applications",
  ],
  standardsNotes: [
    "ISO 11600 — Building Construction — Jointing products — Classification and requirements for sealants",
    "AS 3600 — Concrete structures — movement joint design requirements",
    "Manufacturer TDS — confirm chemical resistance grade, mixing ratio, pot life and primer",
    "Structural engineer confirmation required for immersed joint applications in water-retaining structures",
  ],
  suitableDefects: [
    "Failed joint sealant in swimming pool or water feature structures",
    "Failed or cracked joint sealant in basement or below-ground structures exposed to water or chemicals",
    "Failed fuel-resistant joint sealant in carpark or aviation structure movement joints",
    "Deteriorated polysulfide sealant in existing water-retaining facade joints requiring like-for-like replacement",
  ],
  typicalSubstrates: [
    "Concrete — water-retaining structure walls and floors",
    "Concrete — carpark slabs and ramps",
    "Masonry — below-ground retaining walls",
    "Pre-cast concrete panels — specialist immersed joint applications",
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

export function PolysulfideIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are polysulfide sealant systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Polysulfide sealants are two-part elastomeric sealants based on liquid polysulfide polymer chemistry. They were among the first elastomeric joint sealants used in building construction, gaining widespread use in the 1950s and 1960s before polyurethane and silicone sealants became dominant. Polysulfide sealants are characterised by excellent chemical resistance, particularly to fuels, oils, solvents and water — making them suitable for applications where polyurethane or silicone sealants are inadequate.</p>
        {expanded && <p>In current Australian building remediation, polysulfide sealants are a specialist product rather than a general-purpose choice. They remain the preferred or specified sealant for water-retaining structures (pools, tanks, reservoirs), fuel-exposed joints (carparks, aviation structures) and certain chemical-plant applications. For routine facade movement joint remediation in Class 2 strata, polyurethane sealants have largely replaced polysulfide due to easier one-part application, equivalent or better UV resistance, and similar movement accommodation. Polysulfide sealants require two-part mixing on site and primer on most substrates. Confirm the specific product, mixing ratio, pot life and primer requirement with the manufacturer before specifying.</p>}
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

export function PolysulfideProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — polysulfide joint sealant systems — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of polysulfide sealant systems. Confirm all product selections against current manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Components</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Chem. resist.</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Immersed</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Movement</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.parts}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.chemResist}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.immersed}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.movement}</td>
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
