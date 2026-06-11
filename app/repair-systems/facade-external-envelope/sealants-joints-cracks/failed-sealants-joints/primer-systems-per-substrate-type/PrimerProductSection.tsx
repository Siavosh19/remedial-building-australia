"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag = "Primer" | "Concrete" | "Masonry" | "Aluminium" | "Glass" | "Timber" | "Universal" | "PU-compatible" | "Silicone-compatible";

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
    name: "Sika Primer-3N",
    descriptionLine: "Universal sealant adhesion primer — one-part moisture-curing — suitable for priming concrete, masonry, render, mortar and similar porous substrates before Sikaflex sealant application — most widely specified Sika sealant primer in Australian facade remediation",
    productType: "Universal sealant primer — porous substrates — PU and silicone compatible",
    filterTags: ["Primer", "Concrete", "Masonry", "Universal", "PU-compatible", "Silicone-compatible"],
    techChips: [
      { label: "Universal", cls: "bg-slate-100 text-slate-700" },
      { label: "Porous substrates", cls: "bg-sky-100 text-sky-800" },
      { label: "PU compatible", cls: "bg-green-50 text-green-700" },
      { label: "One-part", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Sika Primer-3N is a one-part, solvent-based universal primer for porous substrates used prior to application of Sikaflex sealant systems. It is suitable for priming concrete, masonry, render, mortar, AAC blocks and similar porous mineral substrates to improve sealant adhesion. Primer-3N is widely used in Australian facade remediation prior to application of Sikaflex-11FC+ and similar one-part polyurethane sealants on masonry and concrete substrates. It is applied by brush to the clean, dry joint surfaces and allowed to flash off (typically 30–60 minutes at 23°C) before sealant is applied. Do not apply sealant before primer has properly dried — confirm flash-off time from current Sika TDS. Primer-3N is also suitable for use with silicone sealants on porous substrates — confirm from current Sika system guide. Always confirm that the primer is specifically recommended for the sealant product being used and the substrate being primed — not all Sika primers are interchangeable across sealant types. TODO: owner confirm — confirm primer system, flash-off time and substrate compatibility from current Sika TDS and system guide.",
    technicalProperties: [
      "One-part solvent-based — brush applied",
      "Suitable for concrete, masonry, render and mortar substrates",
      "Compatible with Sikaflex polyurethane sealant systems",
      "Flash-off required before sealant application — confirm time from current TDS",
      "Improves long-term sealant adhesion on porous substrates",
      "TODO: owner confirm — confirm flash-off time and sealant compatibility from current Sika TDS",
    ],
    limitations: [
      "Not suitable for non-porous substrates (glass, aluminium, UPVC) without a different Sika primer — confirm correct primer for non-porous substrates with Sika technical",
      "Sealant must not be applied before primer has flashed off — premature sealant application causes adhesion failure",
      "Do not use as a paint primer or general adhesion promoter for non-sealant applications",
      "Solvent-based — ventilate work area during application",
      "TODO: owner confirm — confirm all application requirements from current Sika technical data sheet",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply", url: "https://www.sika.com/au" },
      { name: "Bayset — national distribution", url: "https://www.bayset.com.au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://www.sika.com/au",
    accentColor: "#0369a1",
    name: "Sika Primer-215",
    descriptionLine: "Silicone sealant adhesion primer — suitable for non-porous substrates including aluminium, glass and UPVC — used prior to SikaSil silicone sealant application on aluminium window frames and glazing perimeters",
    productType: "Silicone sealant primer — non-porous substrates — aluminium, glass, UPVC",
    filterTags: ["Primer", "Aluminium", "Glass", "Silicone-compatible"],
    techChips: [
      { label: "Silicone primer", cls: "bg-slate-100 text-slate-700" },
      { label: "Aluminium", cls: "bg-sky-100 text-sky-800" },
      { label: "Glass", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Sika Primer-215 is a primer designed for non-porous substrates used prior to SikaSil silicone sealant application. It is suitable for priming aluminium (anodised and powder-coated), glass and UPVC window frame substrates to improve silicone sealant adhesion. In facade remediation, Primer-215 is typically applied before SikaSil weatherseal silicone sealant on aluminium window and door frames. Apply by clean cloth, lint-free rag or brush to the clean, dry substrate surface and allow to flash off before applying sealant — confirm flash-off time from current Sika TDS. Always confirm that Primer-215 is the correct primer for the specific SikaSil product being applied and the substrate being primed — consult the current Sika sealant system guide. TODO: owner confirm — confirm primer system, flash-off time, compatibility and substrate requirements from current Sika TDS and technical documentation.",
    technicalProperties: [
      "Suitable for non-porous substrates — aluminium, glass, UPVC",
      "Used prior to SikaSil silicone sealant systems",
      "Flash-off required before sealant application — confirm from current Sika TDS",
      "Applied by clean cloth or brush to substrate surface",
      "TODO: owner confirm — confirm all parameters from current Sika system guide",
    ],
    limitations: [
      "Not suitable for porous substrates (concrete, masonry) — use Sika Primer-3N for porous substrates",
      "Must flash off completely before sealant application",
      "Confirm correct primer for specific substrate and sealant product with Sika technical",
      "TODO: owner confirm — confirm current product designation and all parameters with Sika Australia technical",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply", url: "https://www.sika.com/au" },
      { name: "Bayset — national distribution", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Tremco Australia",
    brandUrl: "https://www.tremcoinc.com.au",
    accentColor: "#7c3aed",
    name: "Tremco 636 Primer",
    descriptionLine: "Universal sealant adhesion primer — suitable for concrete, masonry, aluminium, glass and other substrates prior to Tremco sealant application — widely used in Australian facade remediation with Tremco sealant systems",
    productType: "Universal sealant primer — multi-substrate — PU and silicone compatible",
    filterTags: ["Primer", "Concrete", "Masonry", "Aluminium", "Glass", "Universal", "PU-compatible", "Silicone-compatible"],
    techChips: [
      { label: "Universal", cls: "bg-slate-100 text-slate-700" },
      { label: "Multi-substrate", cls: "bg-sky-100 text-sky-800" },
      { label: "Tremco system", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Tremco 636 Primer is a universal adhesion primer used prior to Tremco sealant applications on a range of substrates including concrete, masonry, mortar, render, aluminium, glass and anodised metals. It is widely specified alongside Tremco sealant systems in Australian facade remediation — including prior to Tremco Vulkem 116 (one-part PU) and Tremco Spectrem 1 (silicone) sealant applications. Tremco 636 Primer is applied by brush or cloth to the clean, dry joint surfaces and allowed to flash off before sealant application — confirm flash-off time from current Tremco TDS. Always confirm that Tremco 636 is the correct primer for the specific sealant product and substrate — consult the Tremco technical representative or current system guide. TODO: owner confirm — confirm primer system, flash-off time, substrate compatibility and current designation with Tremco Australia technical.",
    technicalProperties: [
      "Universal primer — suitable for concrete, masonry, aluminium and glass substrates",
      "Compatible with Tremco PU and silicone sealant systems",
      "Brush or cloth applied to clean, dry substrate",
      "Flash-off required before sealant application",
      "Tremco national technical and distribution support in Australia",
      "TODO: owner confirm — confirm flash-off time and all parameters from current Tremco TDS",
    ],
    limitations: [
      "Always confirm primer is specified for the exact sealant product and substrate being used",
      "Do not apply sealant before primer flash-off is complete",
      "Do not substitute primer types across different sealant brands without manufacturer confirmation",
      "Solvent-based — ventilate work area",
      "TODO: owner confirm — confirm current product designation and all application parameters with Tremco Australia",
    ],
    procurementSources: [
      { name: "Tremco Australia — trade supply", url: "https://www.tremcoinc.com.au" },
      { name: "Bayset — national distribution", url: "https://www.bayset.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Primer", label: "Primer" },
  { id: "Concrete", label: "Concrete" },
  { id: "Masonry", label: "Masonry" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "Glass", label: "Glass" },
  { id: "Timber", label: "Timber" },
  { id: "Universal", label: "Universal" },
  { id: "PU-compatible", label: "PU sealant" },
  { id: "Silicone-compatible", label: "Silicone sealant" },
];

const SYSTEM_COMPARISON = [
  { product: "Sika Primer-3N", brand: "Sika", substrates: "Concrete, masonry, render", sealantType: "PU, silicone (porous)", flashOff: "30–60 min — confirm TDS", primaryUse: "Porous substrates before Sikaflex PU and SikaSil silicone sealant application" },
  { product: "Sika Primer-215", brand: "Sika", substrates: "Aluminium, glass, UPVC", sealantType: "SikaSil silicone", flashOff: "Confirm TDS", primaryUse: "Non-porous substrates — aluminium window frames and glazing perimeters before SikaSil silicone" },
  { product: "Tremco 636 Primer", brand: "Tremco", substrates: "Concrete, masonry, aluminium, glass", sealantType: "PU, silicone (Tremco system)", flashOff: "Confirm TDS", primaryUse: "Multi-substrate primer before Tremco PU and silicone sealant systems" },
];

const TECH_INFO = {
  typicalApplications: [
    "Priming concrete and masonry joint faces before PU sealant application in facade movement joint remediation",
    "Priming aluminium window frames before silicone weatherseal sealant application",
    "Priming glazing perimeters before silicone sealant application",
    "Priming render and mortar joint faces before perimeter PU sealant application",
    "Confirming primer requirement before any sealant application — always check TDS",
  ],
  selectionCriteria: [
    "CRITICAL: Primer must be matched to both the sealant product AND the substrate — primers are not interchangeable",
    "Porous substrates (concrete, masonry, render): use manufacturer-recommended primer for porous substrates",
    "Non-porous substrates (aluminium, glass): use manufacturer-recommended primer for non-porous substrates",
    "Some substrates may not require primer — confirm from sealant TDS before skipping primer step",
    "Flash-off time is critical — sealant applied before primer has dried will not bond correctly",
    "Always use the primer specified by the sealant manufacturer for the specific sealant product",
  ],
  limitations: [
    "Never substitute primer types across different sealant brands without manufacturer confirmation",
    "Solvent-based primers require ventilation — follow WH&S requirements for VOC exposure",
    "Primers have shelf life limitations — do not use expired primer",
    "Primer applied to contaminated substrate (oil, dust, moisture) will not improve adhesion",
    "Do not use paint primer or concrete sealer as a sealant adhesion primer — different products",
  ],
  standardsNotes: [
    "ISO 11600 — Building Construction — Jointing products — sealant classification (references adhesion requirements)",
    "Sealant manufacturer TDS — always confirm primer product, substrate compatibility and flash-off time",
    "WH&S regulations — comply with solvent exposure requirements and PPE for solvent-based primers",
    "AS 1580 — Methods of test for paints and related materials (referenced in some primer TDS documents)",
  ],
  suitableDefects: [
    "Any facade sealant joint remediation where manufacturer TDS specifies primer on the substrate type",
    "Aluminium window frame perimeter sealant replacement where silicone sealant is specified",
    "Concrete or masonry movement joint sealant where PU sealant TDS specifies primer",
    "All two-part sealant system applications — primer typically required on all substrates",
  ],
  typicalSubstrates: [
    "Concrete — external facade panels, slabs and columns",
    "Masonry — brick and block facades",
    "Render — acrylic and cement render surfaces",
    "Anodised aluminium — window frames and curtain wall elements",
    "Powder-coated aluminium — window and door frames",
    "Glass — glazing unit perimeters",
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
      <p className="mt-2 text-[10px] italic text-slate-400">Always confirm primer with current sealant manufacturer TDS before applying.</p>
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

export function PrimerIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are sealant primer systems and when are they required?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Sealant adhesion primers are thin chemical coatings applied to joint faces before sealant application to improve bond strength between the sealant and the substrate. Whether a primer is required depends on the specific combination of sealant product and substrate type — this information is always found in the sealant manufacturer's Technical Data Sheet (TDS). Never assume a primer is or is not required without checking the TDS for the specific sealant-substrate combination.</p>
        {expanded && <p>Primers are substrate- and sealant-specific: a primer suitable for concrete with a PU sealant may not be suitable for aluminium with a silicone sealant. The most common approach in Australian facade remediation is to use the primer system from the same manufacturer as the sealant — Sika Primer-3N with Sikaflex sealants on porous substrates, Sika Primer-215 with SikaSil on non-porous substrates, Tremco 636 with Tremco sealant systems, and so on. Primers are solvent-based and must flash off (evaporate their carrier solvent) before the sealant is applied — applying sealant before the primer has dried is a common cause of adhesion failure in facade sealant remediation. Flash-off time varies by product and ambient temperature — always confirm from the current TDS.</p>}
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

export function PrimerProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — sealant primer systems by substrate type — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Sealant primer comparison by substrate type. Always confirm primer with sealant manufacturer TDS before application.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left font-bold whitespace-nowrap text-slate-700">Primer</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Substrates</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Sealant type</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Flash-off</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.substrates}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.sealantType}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.flashOff}</td>
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
