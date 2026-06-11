"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag = "Stainless-316" | "Head-flashing" | "Custom" | "Pre-formed" | "Coastal" | "AS-3700" | "Window" | "Door" | "Masonry";

type Product = {
  fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string;
  name: string; descriptionLine: string; productType: string;
  filterTags: FilterTag[]; techChips: { label: string; cls: string }[];
  systemDescription: string; technicalProperties: string[];
  limitations: string[]; procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Custom fabrication — stainless sheet supplier",
    brandUrl: "https://www.midwaymetals.com.au",
    accentColor: "#dc2626",
    name: "Custom-fabricated 316L stainless head flashing — 1.0mm",
    descriptionLine: "Custom-fabricated 316 stainless steel head flashing from 1.0mm sheet — the standard gauge for residential and low-rise strata window head flashing — fabricated by a local sheet metal fabricator to project-specific dimensions — preferred specification for most Class 2 strata window remediation",
    productType: "Custom-fabricated 316L stainless head flashing — 1.0mm gauge",
    filterTags: ["Stainless-316", "Head-flashing", "Custom", "Coastal", "AS-3700", "Window", "Door", "Masonry"],
    techChips: [
      { label: "316L stainless", cls: "bg-slate-100 text-slate-700" },
      { label: "1.0mm sheet", cls: "bg-sky-100 text-sky-800" },
      { label: "Custom fabricated", cls: "bg-green-50 text-green-700" },
      { label: "Coastal rated", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Custom-fabricated stainless 316L head flashings at 1.0mm gauge are the standard specification for window head flashings in Australian Class 2 strata remediation. The flashing is fabricated by a local sheet metal fabricator to project-specific dimensions — including the projection length, upstand height, drip nose profile and any folded ends required for the specific window surround. 316L stainless is specified (not 304) for all exterior applications including coastal environments. The flashing is typically supplied in a mill or powder-coated finish to match the facade colour. It is fixed to the masonry or render return above the window frame with stainless 316 screws or plugs, and the back joint sealed with a compatible neutral cure silicone or PU sealant. The flashing nose must project minimum 25mm clear of the facade face to provide an effective drip edge. Confirm fabricator availability and lead time before specifying — custom flashings are not ex-stock items.",
    technicalProperties: [
      "316L stainless steel — suitable for all coastal and exterior environments",
      "1.0mm gauge — standard for residential and low-rise strata head flashings",
      "Custom fabricated to project-specific dimensions — projection, upstand, drip nose, folded ends",
      "Powder-coated or mill finish — confirm colour match with facade before ordering",
      "All fixings in 316 stainless — no bimetallic corrosion risk",
      "Long service life in coastal and high-exposure environments — no recoating required",
    ],
    limitations: [
      "Custom fabrication — lead time required — not ex-stock; plan ahead for fabrication and delivery",
      "Must be fixed and sealed correctly — back joint, end caps and all fixing penetrations must be sealed",
      "Minimum drip nose projection 25mm clear of facade face — do not allow render to conceal the drip nose",
      "Confirm fabricator is competent in stainless steel working — stainless requires different cutting and forming tools to mild steel",
      "TODO: owner confirm — confirm local fabricator, gauge and finish with project requirements",
    ],
    procurementSources: [
      { name: "Midway Metals — stainless sheet supply (raw material)", url: "https://www.midwaymetals.com.au" },
      { name: "One Steel / InfraBuild — stainless section supply (raw material)", url: "https://www.infrabuild.com" },
      { name: "Local sheet metal fabricator — confirm fabricator and lead time", url: "https://www.midwaymetals.com.au" },
    ],
  },
  {
    fullLabel: "Custom fabrication — heavy gauge stainless",
    brandUrl: "https://www.midwaymetals.com.au",
    accentColor: "#0369a1",
    name: "Custom-fabricated 316L stainless head flashing — 1.2mm heavy gauge",
    descriptionLine: "Custom-fabricated 316 stainless steel head flashing from 1.2mm heavy-gauge sheet — specified for wider spans, high-exposure locations or where increased rigidity is required — same fabrication process as 1.0mm but with increased material gauge for reduced deflection over longer spans",
    productType: "Custom-fabricated 316L stainless head flashing — 1.2mm heavy gauge",
    filterTags: ["Stainless-316", "Head-flashing", "Custom", "Coastal", "AS-3700", "Window", "Door", "Masonry"],
    techChips: [
      { label: "316L stainless", cls: "bg-slate-100 text-slate-700" },
      { label: "1.2mm heavy gauge", cls: "bg-sky-100 text-sky-800" },
      { label: "Wide span", cls: "bg-green-50 text-green-700" },
      { label: "High exposure", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Heavy-gauge 1.2mm 316L stainless head flashings are specified where wider window openings, high-wind-exposure or elevated building locations require increased flashing rigidity. The heavier gauge reduces mid-span deflection over wider window openings, preventing water ponding on the flashing and ensuring positive drainage off the drip nose. Fabrication and fixing details are the same as 1.0mm flashings — 316 stainless fixings, neutral cure or PU sealant at the back joint, minimum 25mm drip nose projection. Confirm whether 1.0mm or 1.2mm gauge is required based on window width, building exposure category and wind load requirements with the project engineer. Powder coat or mill finish available — confirm colour match before ordering. TODO: owner confirm — confirm gauge selection against window width and exposure category requirements.",
    technicalProperties: [
      "316L stainless steel — suitable for all coastal and exterior environments",
      "1.2mm heavy gauge — reduced deflection over wider window spans",
      "Custom fabricated to project-specific dimensions",
      "Same installation and sealing requirements as 1.0mm gauge",
      "Suitable for high-exposure and coastal locations without recoating",
      "TODO: owner confirm — confirm gauge and span requirements with project engineer",
    ],
    limitations: [
      "Higher cost than 1.0mm gauge — confirm whether heavier gauge is required for the project",
      "Custom fabrication — lead time required — confirm availability before specifying",
      "All fixings and sealant must match 316 stainless specification",
      "TODO: owner confirm — confirm gauge selection is appropriate for the window span and exposure category",
    ],
    procurementSources: [
      { name: "Midway Metals — stainless sheet supply (raw material)", url: "https://www.midwaymetals.com.au" },
      { name: "Local sheet metal fabricator — confirm fabricator and lead time", url: "https://www.midwaymetals.com.au" },
    ],
  },
  {
    fullLabel: "Stratco / Fielders / local roll-forming supplier",
    brandUrl: "https://www.stratco.com.au",
    accentColor: "#7c3aed",
    name: "Pre-formed 316 stainless Z-profile head flashing section",
    descriptionLine: "Pre-formed 316 stainless Z-profile or hook-nose head flashing section — available ex-stock from some roofing and flashings suppliers in standard profiles — cut to length on site — suitable where standard profile matches the window reveal depth",
    productType: "Pre-formed 316 stainless head flashing section — ex-stock",
    filterTags: ["Stainless-316", "Head-flashing", "Pre-formed", "Coastal", "AS-3700", "Window", "Masonry"],
    techChips: [
      { label: "316 stainless", cls: "bg-slate-100 text-slate-700" },
      { label: "Pre-formed", cls: "bg-sky-100 text-sky-800" },
      { label: "Ex-stock", cls: "bg-green-50 text-green-700" },
      { label: "TODO: confirm AU stock", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Pre-formed 316 stainless steel Z-profile or hook-nose head flashing sections are available ex-stock from some Australian roofing and flashings supply companies. These sections are roll-formed in standard profiles and supplied in lengths (typically 2400mm or 3000mm) to be cut to length on site. They are suitable where the standard profile matches the project window reveal depth and projection requirement. Unlike custom fabricated flashings, pre-formed sections do not require fabricator lead time — they can be ordered from a flashings supplier and cut to length on site. However, pre-formed profiles are limited to standard shapes and may not accommodate all window reveal geometries. End caps must be fabricated or cut and folded on site. Confirm 316 grade (not 304) before ordering — some pre-formed sections are 304 grade and may not meet the coastal specification. TODO: owner confirm — confirm 316 grade, profile dimensions and Australian supplier availability before specifying.",
    technicalProperties: [
      "Pre-formed stainless Z-profile — available ex-stock from some Australian suppliers",
      "Cut to length on site — no fabricator lead time required",
      "Suitable for standard reveal depths where the profile matches the project requirement",
      "316 grade (confirm before ordering — some ex-stock sections are 304)",
      "End caps must be fabricated or folded on site at each end",
      "TODO: owner confirm — confirm 316 grade, profile dimensions and AU supplier availability",
    ],
    limitations: [
      "Limited to standard profiles — does not accommodate non-standard reveal depths without modification",
      "Confirm 316 grade before ordering — 304 is not suitable for coastal locations",
      "End caps and folded ends require site fabrication — confirm trade capability before using pre-formed sections",
      "May not be available in all Australian locations — confirm supplier stock before specifying",
      "TODO: owner confirm — confirm 316 grade, profile availability and local supplier before specifying",
    ],
    procurementSources: [
      { name: "Stratco — flashings supply (confirm 316 grade and stock)", url: "https://www.stratco.com.au" },
      { name: "Fielders — roll-formed sections (confirm 316 grade and stock)", url: "https://www.fielders.com.au" },
      { name: "TODO: owner confirm — confirm local 316 stainless flashing supplier and stock before specifying", url: "https://www.stratco.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Stainless-316", label: "Stainless 316" },
  { id: "Head-flashing", label: "Head flashing" },
  { id: "Custom", label: "Custom fabricated" },
  { id: "Pre-formed", label: "Pre-formed" },
  { id: "Coastal", label: "Coastal rated" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "Window", label: "Window" },
  { id: "Masonry", label: "Masonry" },
];

const SYSTEM_COMPARISON = [
  { product: "316L stainless — 1.0mm custom", type: "Custom fab", grade: "316L", finish: "Powder coat / mill", coastal: "Yes", span: "Standard spans", primaryUse: "Standard residential / low-rise strata window head flashing — most common specification" },
  { product: "316L stainless — 1.2mm heavy", type: "Custom fab", grade: "316L", finish: "Powder coat / mill", coastal: "Yes", span: "Wide / high-exp spans", primaryUse: "Wider windows, high-exposure or elevated locations requiring increased rigidity" },
  { product: "Pre-formed Z-profile 316", type: "Pre-formed", grade: "316 (confirm)", finish: "Mill", coastal: "Confirm grade", span: "Standard profile only", primaryUse: "Standard reveals where profile matches — no fabricator lead time — confirm AU stock" },
];

const TECH_INFO = {
  typicalApplications: [
    "Window head flashing replacement over masonry or rendered facade openings on Class 2 strata buildings",
    "New head flashing installation where original building was constructed without head flashings",
    "Head flashing replacement where existing galvanised or aluminium flashings have corroded or failed",
    "Coastal strata building window head flashing where 316 stainless is required for corrosion resistance",
    "High-rise and elevated strata building window head flashing in wind-exposed locations",
  ],
  selectionCriteria: [
    "Always specify 316 stainless for exterior coastal applications — 304 is not suitable within 1 km of the ocean",
    "Select 1.0mm for standard residential spans — upgrade to 1.2mm for wider openings or high-exposure locations",
    "Custom fabrication where the window reveal geometry requires a non-standard profile",
    "Pre-formed sections only where the standard profile matches — confirm AU supplier stock before specifying",
    "All fixings must be 316 stainless — do not use carbon steel or zinc-plated fasteners with stainless flashings",
    "Confirm flashing projection: minimum 25mm drip nose clear of facade face for effective drainage",
  ],
  limitations: [
    "Stainless head flashings require correct installation — sealing at back, drip nose must project clear of facade",
    "Do not use 304 grade in coastal environments — visible surface corrosion and staining within years",
    "Do not fix with carbon steel or galvanised fasteners — bimetallic corrosion will stain the facade",
    "Custom fabrication requires lead time — allow 2–4 weeks for fabrication; confirm with fabricator",
    "Head flashings do not replace the need for correctly installed perimeter sealant at the frame",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures (cover requirements and flashing requirements in masonry)",
    "AS/NZS 4284 — Testing of building facades (weatherproofing performance)",
    "NCC Volume One — weatherproofing requirements for external walls",
    "Manufacturer / fabricator TDS — confirm grade, gauge and finish requirements before ordering",
  ],
  suitableDefects: [
    "Absent head flashings above window openings — missing from original construction",
    "Corroded or failed galvanised or aluminium head flashings requiring stainless replacement",
    "Water ingress above window frames where head flashing is absent or inadequate",
    "Failed or debonded head flashing at back-of-flashing sealant joint",
  ],
  typicalSubstrates: [
    "Masonry — brick and block facade — flashing embedded in or fixed to masonry above window opening",
    "Render — rendered masonry — flashing fixed to return above window and sealed before rendering",
    "Concrete — concrete facade panels — flashing fixed to concrete with stainless anchors",
    "Not suitable for use with carbon steel or galvanised fasteners — all fixings must be 316 stainless",
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
      <p className="mt-2 text-[10px] italic text-slate-400">Confirm grade, profile and fabricator availability before specifying or ordering.</p>
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

export function HeadFlashStainlessIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are stainless steel head flashing systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Stainless steel 316 head flashings are sheet metal elements installed above window and door openings in masonry and rendered facades to deflect water away from the frame-to-wall interface. They are one of the most effective long-term solutions for preventing water ingress above windows on Australian Class 2 strata buildings — particularly in buildings where head flashings were absent from the original construction or where original galvanised or aluminium flashings have failed.</p>
        {expanded && <p>A correctly installed head flashing has four critical elements: an upstand embedded in or fixed to the masonry/render return above the opening, a flat drainage bed sloped to drain water outward, a drip nose that projects minimum 25mm clear of the facade face, and sealed joints at the back, sides and all fixing penetrations. 316L stainless is specified in preference to 304 for all coastal and exterior applications — 304 grade is susceptible to surface pitting and staining in salt-laden air. Flashings must be fixed with 316 stainless fasteners only — carbon steel or galvanised fasteners will corrode and cause staining on the facade below the window. Head flashings supplement, but do not replace, correctly installed perimeter sealant at the window frame.</p>}
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

export function HeadFlashStainlessProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — stainless 316 head flashing systems — scroll to view all</p>
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
                      <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><ExternalLink size={9} /> Supplier</a>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of stainless 316 head flashing systems. Confirm grade, profile and fabricator availability before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Grade</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Finish</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Coastal</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Span</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.grade}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.finish}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coastal}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.span}</td>
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
