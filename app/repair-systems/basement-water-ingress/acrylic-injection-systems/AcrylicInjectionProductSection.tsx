"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Acrylic-acrylate" | "Very-low-viscosity"
  | "Fine-cracks" | "Gel-forming"
  | "Construction-joints" | "EN-1504-5"
  | "Slow-seepage" | "Hairline-cracks";

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
    tdsUrl: "https://aus.sika.com/dam/dms/au01/o/sika_injection-306.pdf",
    accentColor: "#cc0000",
    name: "Sika Injection-306",
    descriptionLine: "2-component acrylic acrylate gel injection system — very low viscosity — hairline cracks and fine construction joints",
    productType: "2C acrylic acrylate injection gel",
    filterTags: ["Acrylic-acrylate", "Very-low-viscosity", "Fine-cracks", "Gel-forming", "Construction-joints", "EN-1504-5", "Slow-seepage", "Hairline-cracks"],
    techChips: [
      { label: "2-component", cls: "bg-sky-100 text-sky-800" },
      { label: "Acrylic acrylate", cls: "bg-slate-100 text-slate-700" },
      { label: "Very low viscosity", cls: "bg-slate-100 text-slate-700" },
      { label: "Adjustable gel time", cls: "bg-green-50 text-green-700" },
      { label: "EN 1504-5", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sika Injection-306 is a 2-component acrylic acrylate injection gel system with very low viscosity before gelation, allowing it to penetrate hairline cracks and fine pores in concrete that are inaccessible to polyurethane injection resins. When the two components are mixed at the injection head, a chemical reaction initiates gelation — the gel time is adjustable by varying the component ratio, allowing the contractor to control penetration depth and set time. After gelation, the product forms a flexible, water-impermeable gel seal within the crack.\n\nIn Australian Class 2 strata basement remediation, Sika Injection-306 is specified for hairline cracks and fine construction joints where hydrophilic PU foam injection is too viscous to penetrate — typically cracks below 0.3mm width where PU resin cannot enter and create an effective seal. It is also used for fine pore sealing in poorly consolidated concrete zones around construction joints. The very low viscosity allows injection at low pressure, reducing the risk of substrate fracture in brittle masonry or lightweight concrete.\n\nConfirm current product name and formulation with Sika Australia at aus.sika.com before specifying. Sika injection product names and formulations change with range updates.",
    technicalProperties: [
      "Very low viscosity before gelation — penetrates hairline cracks below 0.3mm width — lower viscosity than hydrophilic PU systems",
      "2-component — gel time adjustable by component ratio — from approximately 20 seconds to several minutes",
      "Flexible gel after cure — accommodates minor ongoing movement without re-opening",
      "Suitable for damp and wet cracks — hydrophilic chemistry — water present in the crack does not inhibit gelation",
      "Good penetration into porous and poorly consolidated concrete zones",
      "EN 1504-5 classification — crack injection principle C — confirm current compliance with Sika Australia",
    ],
    limitations: [
      "2-component system — requires 2-component injection pump with accurate metering — specialist equipment required",
      "Specialist contractor required — incorrect metering ratio produces incorrect gel time and inconsistent seal",
      "Not suitable for active high-velocity water flow — gel can be displaced before set by fast-moving water — use hydrophilic PU for active high-flow conditions",
      "Not structural — gel does not restore concrete tensile or compressive strength across crack — structural engineer assessment required",
      "Post-cure re-opening possible if crack is actively growing — structural movement must be stabilised before injection treatment is permanent",
      "Confirm potable water contact suitability with Sika Australia before use in water storage applications",
      "Confirm current product name and mixing ratio with Sika Australia before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — contact for current pricing and trade supply", url: "https://aus.sika.com" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Master Builders Solutions (BASF)",
    brandUrl: "https://www.master-builders-solutions.com/en-au",
    accentColor: "#003591",
    name: "BASF MasterInject 1315",
    descriptionLine: "2-component acrylic acrylate injection gel — very low viscosity — fine crack and hairline crack sealing in basement concrete",
    productType: "2C acrylic acrylate injection gel",
    filterTags: ["Acrylic-acrylate", "Very-low-viscosity", "Fine-cracks", "Gel-forming", "Construction-joints", "EN-1504-5", "Slow-seepage", "Hairline-cracks"],
    techChips: [
      { label: "2-component", cls: "bg-sky-100 text-sky-800" },
      { label: "Acrylic acrylate gel", cls: "bg-slate-100 text-slate-700" },
      { label: "Very low viscosity", cls: "bg-slate-100 text-slate-700" },
      { label: "Adjustable gel time", cls: "bg-slate-100 text-slate-700" },
      { label: "EN 1504-5", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "BASF MasterInject 1315 is a 2-component acrylic acrylate gel injection product in the Master Builders Solutions MasterInject injection range. Like other acrylic acrylate systems, it is characterised by its very low pre-gelation viscosity — lower than hydrophilic PU resins — enabling it to penetrate hairline cracks in concrete that cannot be reached by conventional injection resins. The two components are mixed at the injection head using a 2-component injection pump, with gel time adjustable by varying the component ratio.\n\nIn Australian Class 2 strata basement remediation, MasterInject 1315 is the BASF equivalent to Sika Injection-306 — a 2C acrylic acrylate product for fine crack and hairline crack sealing where PU injection is impractical due to crack width or substrate porosity. It is typically used by contractors who prefer the BASF supply chain and have an established relationship with Master Builders Solutions Australia.\n\nNote: BASF product names and numbers have changed with the transition from BASF Construction Chemicals to the Master Builders Solutions brand. Confirm that MasterInject 1315 is the current Australian product name and number before ordering. Check master-builders-solutions.com/en-au for current Australian product listings.",
    technicalProperties: [
      "Very low viscosity before gelation — penetrates cracks below 0.3mm width",
      "2-component — gel time adjustable by component ratio",
      "Flexible gel after cure — accommodates minor crack movement",
      "Hydrophilic — suitable for damp and wet conditions — water present does not prevent gelation",
      "Good penetration into porous and poorly consolidated concrete around construction joints",
      "EN 1504-5 — confirm current compliance with BASF Australia for specific product and mix ratio",
    ],
    limitations: [
      "2-component pump required — specialist contractor and equipment",
      "Not suitable for high-velocity active water flow — use hydrophilic PU for high-flow conditions",
      "Not structural — does not restore concrete continuity",
      "Confirm current product name (MasterInject 1315) with BASF Australia before ordering — product numbering may have changed",
      "Specialist injection contractor required — poor technique produces voids and incomplete sealing",
      "Confirm potable water contact suitability with BASF Australia before specifying for water storage applications",
    ],
    procurementSources: [
      { name: "Master Builders Solutions Australia — contact for current pricing", url: "https://www.master-builders-solutions.com/en-au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Acrylic-acrylate", label: "Acrylic acrylate" },
  { id: "Very-low-viscosity", label: "Very low viscosity" },
  { id: "Fine-cracks", label: "Fine cracks" },
  { id: "Hairline-cracks", label: "Hairline cracks" },
  { id: "Gel-forming", label: "Gel-forming" },
  { id: "Construction-joints", label: "Construction joints" },
  { id: "Slow-seepage", label: "Slow seepage" },
  { id: "EN-1504-5", label: "EN 1504-5" },
];

const COMPARISON_ROWS: {
  product: string;
  brand: string;
  type: string;
  viscosity: string;
  gelTime: string;
  activeFlow: string;
  en15045: string;
  keyRestriction: string;
}[] = [
  {
    product: "Injection-306",
    brand: "Sika",
    type: "2C acrylic acrylate",
    viscosity: "Very low",
    gelTime: "Adjustable (~20s to min)",
    activeFlow: "Slow seepage only",
    en15045: "Yes",
    keyRestriction: "2C pump required — not for high-velocity flow",
  },
  {
    product: "MasterInject 1315",
    brand: "BASF",
    type: "2C acrylic acrylate",
    viscosity: "Very low",
    gelTime: "Adjustable",
    activeFlow: "Slow seepage only",
    en15045: "Confirm with BASF AU",
    keyRestriction: "Confirm current product name with BASF AU before ordering",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Hairline cracks below 0.3mm — fine cracks in concrete basement walls and slabs where PU foam injection cannot penetrate",
    "Fine construction joints — where the construction joint is tight and PU resin cannot enter at low pressure",
    "Porous concrete zones — poorly consolidated concrete around joints, particularly around formwork tie rod locations",
    "Fine cracks around cast-in service conduits and blockouts — water pathways through concrete around embedded items",
    "Secondary treatment — used after hydrophilic PU injection to seal any residual fine cracks or pores in the treated zone",
  ],
  selectionCriteria: [
    "Crack width below 0.3mm: specify acrylic acrylate — PU resin cannot penetrate — very low viscosity is critical for fine crack entry",
    "Crack width 0.3mm and above with active flow: specify hydrophilic PU injection (Sika Injection-107 or equivalent) — PU foam is simpler and more effective",
    "Dry fine cracks: consider epoxy injection (structural) or leave ungrouted if non-structural — acrylic gel is for wet/damp conditions",
    "High-velocity active water: neither acrylic gel nor 1C PU — use 2C PU (Sika Injection-101 RC) with short gel time or hydraulic cement plug first",
    "Sika Injection-306 vs BASF MasterInject 1315: functionally equivalent — select based on supply chain preference and contractor familiarity",
  ],
  limitations: [
    "2-component pump required — cannot be injected with simple 1C pump — specialist contractor with correct equipment required",
    "Not structural — acrylic gel does not restore concrete strength — structural engineer must confirm adequacy",
    "Not suitable for high-velocity water flow — gel displaced before setting — apply hydraulic cement plug first then inject with PU or acrylic",
    "Gel may shrink slightly over time in dry conditions — not a concern in permanently wet basement conditions",
    "Not suitable for large voids — acrylic gel is for fine cracks and pores only — use cementitious grout or expanding foam for large voids",
    "Confirm potable water contact compliance before specifying in water storage or tank applications",
  ],
  standardsNotes: [
    "EN 1504-5 — concrete injection, principle C — Sika Injection-306 confirmed compliant — confirm for BASF product",
    "AS 3600 — structural engineer must confirm whether crack injection alone is adequate or whether structural intervention is required",
    "NCC — basement waterproofing performance obligations — injection system must achieve the required performance outcome; no specific injection standard in NCC",
    "Confirm current EN 1504-5 classification with manufacturer before specifying for infrastructure or public projects",
  ],
  suitableDefects: [
    "Hairline cracks in basement concrete walls — fine seeping cracks where moisture is visually apparent but not flowing",
    "Fine construction joints with slow seepage — tightly formed joints where water is moving but not dripping",
    "Porous concrete zones with distributed seepage — poorly consolidated concrete showing damp patches without discrete cracks",
    "Fine cracks around embedded items — service conduits, cast-in inserts, and formwork hardware paths through concrete walls",
  ],
  typicalSubstrates: [
    "Reinforced concrete basement walls — in-situ poured — fine crack sealing in otherwise sound concrete",
    "Reinforced concrete slabs — fine crack treatment in slab soffits and floors",
    "Masonry — limited to fine cracks in mortar joints and brick/block face — confirm penetration with specialist before specifying",
  ],
};

function CollapsibleList({ items, icon, limit = 3 }: { items: string[]; icon: "check" | "x"; limit?: number }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, limit);
  const extra = items.length - limit;
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
        <button onClick={() => setExpanded((e) => !e)} className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600">
          {expanded ? "Show less ↑" : `+${extra} more ↓`}
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
        <button onClick={() => setExpanded((e) => !e)} className="text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide ↑" : "See more ↓"}</button>
      </div>
      {expanded && (
        <div className="mt-2 space-y-1.5">
          {sources.map((src) => (
            <div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs">
              {src.url ? (
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">
                  {src.name}<ExternalLink size={9} className="text-slate-300" />
                </a>
              ) : <span className="font-semibold text-slate-600">{src.name}</span>}
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
      {expanded && (
        <>
          <p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>
          {chips.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {chips.map((chip) => (
                <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>
              ))}
            </div>
          )}
        </>
      )}
      <button onClick={() => setExpanded((e) => !e)} className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600">
        {expanded ? "Hide details ↑" : "Show details ↓"}
      </button>
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>{text}</p>
      <button onClick={() => setExpanded((e) => !e)} className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900">
        {expanded ? "Show less ↑" : "Show more ↓"}
      </button>
    </div>
  );
}

export function AcrylicInjectionIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are acrylic injection systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Acrylic acrylate injection systems are 2-component resins with exceptionally low viscosity before gelation — typically lower than water — enabling them to penetrate hairline cracks and fine pores in concrete that cannot be reached by polyurethane injection resins. When the two components are mixed at the injection head, a chemical reaction initiates gelation, forming a flexible, water-impermeable gel seal within the crack. The gel time is adjustable by varying the component ratio.
        </p>
        {expanded && (
          <>
            <p>
              In Australian Class 2 strata basement remediation, acrylic acrylate injection is a specialist technique used where hydrophilic PU injection cannot achieve crack penetration — primarily for hairline cracks below 0.3mm width and for sealing fine porous zones in poorly consolidated concrete around construction joints. Unlike PU foam, acrylic gel does not expand — it fills the crack void without generating lateral pressure, making it appropriate for fine cracks in concrete with limited cover or in unreinforced masonry where PU expansion could cause spalling.
            </p>
            <p>
              Acrylic acrylate injection requires a 2-component pump with precise metering capability — typically the same equipment used for 2C PU injection. Because of the specialist equipment requirement, acrylic injection is less common than PU injection in Australian strata basement work and is more likely to be specified by structural engineers or waterproofing consultants for specific crack conditions. The comparison with hydrophilic PU: PU is simpler (1C option available), suitable for active flow, and more widely available — specify acrylic only when crack width is the limiting constraint.
            </p>
          </>
        )}
      </div>
      <button onClick={() => setExpanded((e) => !e)} className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900">
        {expanded ? "Read less ↑" : "Read more ↓"}
      </button>
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

export function AcrylicInjectionProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (id: FilterTag) => {
    setActiveFilters((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  };

  const visibleProducts = activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));
  const scroll = (dir: "left" | "right") => { scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" }); };

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button type="button" onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, acrylic vs PU selection, gel time, substrates, limitations, and standards</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? <>Hide detail <ChevronUp size={14} /></> : <>Show detail <ChevronDown size={14} /></>}
          </div>
        </button>
        {accordionOpen && (
          <div className="border-t border-slate-100 px-7 pb-7 pt-6">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <TechCard icon={<Layers size={15} />} title="Typical Applications" items={TECH_INFO.typicalApplications} style="bullet" />
              <TechCard icon={<Ruler size={15} />} title="Selection — Acrylic vs PU" items={TECH_INFO.selectionCriteria} style="check" />
              <TechCard icon={<AlertTriangle size={15} />} title="Critical Limitations" items={TECH_INFO.limitations} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards & Compliance" items={TECH_INFO.standardsNotes} style="bullet" />
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
            <p className="mt-1 text-sm text-slate-500">2 products — 2 brands — Sika / BASF MBS — scroll to view all</p>
          </div>
        </div>
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => {
            const active = activeFilters.has(f.id);
            return (
              <button key={f.id} type="button" onClick={() => toggleFilter(f.id)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}>
                {f.label}
              </button>
            );
          })}
          {activeFilters.size > 0 && <button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">Clear filters</button>}
        </div>
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">{visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll for more</span>
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
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">{product.fullLabel}</span>
                    <div className="flex shrink-0 items-center gap-1">
                      {product.tdsUrl && <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><FileText size={9} /> TDS</a>}
                      <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><ExternalLink size={9} /> Brand Site</a>
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <div className="mt-0.5"><p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p></div>
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
            <h2 className="text-2xl font-extrabold text-sky-950">Acrylic injection system comparison</h2>
            <p className="mt-1 text-sm text-slate-500">Confirmed Australian products — confirm current product names with manufacturers before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Viscosity</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Gel time</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Active flow</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">EN 1504-5</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key restriction</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.product}</td>
                  <td className="px-4 py-3 font-semibold whitespace-nowrap" style={{ color: row.brand === "Sika" ? "#cc0000" : "#003591" }}>{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.viscosity}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.gelTime}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.activeFlow}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.en15045}</td>
                  <td className="px-4 py-3 text-slate-500">{row.keyRestriction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
