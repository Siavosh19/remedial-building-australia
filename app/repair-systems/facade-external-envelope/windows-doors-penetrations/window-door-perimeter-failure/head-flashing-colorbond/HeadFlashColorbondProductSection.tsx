"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag = "Colorbond" | "Head-flashing" | "Custom" | "Pre-formed" | "Inland" | "AS-3700" | "Window" | "Door" | "Masonry" | "Zincalume";

type Product = {
  fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string;
  name: string; descriptionLine: string; productType: string;
  filterTags: FilterTag[]; techChips: { label: string; cls: string }[];
  systemDescription: string; technicalProperties: string[];
  limitations: string[]; procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "LYSAGHT / Colorbond — custom fabrication",
    brandUrl: "https://www.lysaght.com/en-au",
    tdsUrl: "https://www.lysaght.com/en-au",
    accentColor: "#dc2626",
    name: "Custom-fabricated Colorbond head flashing",
    descriptionLine: "Custom-fabricated Colorbond steel head flashing — fabricated by a local sheet metal fabricator from Colorbond coated steel — full colour range available — suitable for non-coastal and low-to-moderate exposure environments — the standard colour-matched head flashing for inland and sheltered strata buildings",
    productType: "Custom-fabricated Colorbond head flashing — standard exposure",
    filterTags: ["Colorbond", "Head-flashing", "Custom", "Inland", "AS-3700", "Window", "Door", "Masonry"],
    techChips: [
      { label: "Colorbond steel", cls: "bg-slate-100 text-slate-700" },
      { label: "Custom fabricated", cls: "bg-sky-100 text-sky-800" },
      { label: "Full colour range", cls: "bg-green-50 text-green-700" },
      { label: "Non-coastal only", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Custom-fabricated Colorbond head flashings are the most common head flashing material in Australian residential and low-rise strata construction in non-coastal environments. They are fabricated by a local sheet metal fabricator from LYSAGHT Colorbond steel to project-specific dimensions, and are available in the full Colorbond colour range — allowing the flashing to match the facade colour scheme or existing Colorbond elements. Colorbond is appropriate for inland and sheltered locations within the LYSAGHT recommended exposure zone — confirm the Lysaght exposure zone classification for the project location before specifying. All cut edges and drilled holes must be treated with Zincalume touch-up paint or cut-edge sealant before installation — bare steel edges will corrode at cut edges. Fix with Colorbond-compatible stainless or Zincalume screws only. Seal the back joint with a compatible neutral cure silicone or PU sealant. TODO: owner confirm — confirm the applicable LYSAGHT exposure zone for the project location before specifying Colorbond.",
    technicalProperties: [
      "Full Colorbond colour range — colour-match to facade or existing elements",
      "Custom fabricated to project-specific dimensions — projection, upstand, drip nose, folded ends",
      "Colorbond product warranty — confirm warranty zone from LYSAGHT for the project location",
      "All cut edges must be treated with Zincalume touch-up before installation",
      "Fix with Colorbond-compatible stainless or Zincalume screws — not carbon steel",
      "Not suitable for coastal environments — confirm exposure zone before specifying",
    ],
    limitations: [
      "Not suitable for coastal, marine or high-chloride environments — specify stainless 316 instead",
      "All cut edges, drilled holes and damaged areas must be treated before installation — exposed steel corrodes",
      "LYSAGHT exposure zone must be confirmed before specifying — Colorbond warranty is zone-specific",
      "Carbon steel fasteners are not compatible — use Zincalume or stainless compatible fasteners only",
      "TODO: owner confirm — confirm LYSAGHT exposure zone classification for the project location before specifying Colorbond",
    ],
    procurementSources: [
      { name: "LYSAGHT — Colorbond sheet supply and fabrication guidance", url: "https://www.lysaght.com/en-au" },
      { name: "Stratco — Colorbond products and distribution", url: "https://www.stratco.com.au" },
      { name: "Local sheet metal fabricator — confirm fabricator and lead time", url: "https://www.lysaght.com/en-au" },
    ],
  },
  {
    fullLabel: "LYSAGHT / Zincalume — custom fabrication",
    brandUrl: "https://www.lysaght.com/en-au",
    tdsUrl: "https://www.lysaght.com/en-au",
    accentColor: "#0369a1",
    name: "Custom-fabricated Zincalume head flashing",
    descriptionLine: "Custom-fabricated Zincalume (Zn/Al alloy coated) steel head flashing — unpainted mill finish — for concealed applications where the flashing will be rendered over or where a mill finish is acceptable — improved corrosion resistance over galvanised but not suitable for coastal environments",
    productType: "Custom-fabricated Zincalume head flashing — concealed applications",
    filterTags: ["Zincalume", "Head-flashing", "Custom", "Inland", "AS-3700", "Window", "Masonry"],
    techChips: [
      { label: "Zincalume coated", cls: "bg-slate-100 text-slate-700" },
      { label: "Mill finish", cls: "bg-sky-100 text-sky-800" },
      { label: "Concealed apps", cls: "bg-green-50 text-green-700" },
      { label: "Non-coastal only", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Custom-fabricated Zincalume head flashings use zinc/aluminium alloy (ZA) coated steel sheet in a mill (unpainted) finish. Zincalume offers improved corrosion resistance over galvanised steel but is not suitable for coastal or high-chloride environments. It is typically used in concealed applications where the flashing will be rendered over or where a mill finish is acceptable and the flashing is not visually prominent. Zincalume is less expensive than Colorbond (no paint coating) but is not available in a colour-matched finish — if the flashing will be visible, specify Colorbond or stainless. All cut edges must be treated with Zincalume touch-up before installation. Fix with Zincalume-compatible or stainless fasteners. Confirm the appropriate LYSAGHT exposure zone for the project before specifying. TODO: owner confirm — confirm exposure zone suitability for Zincalume at the project location.",
    technicalProperties: [
      "Zincalume (Zn/Al alloy) coating — improved corrosion resistance over galvanised",
      "Mill (unpainted) finish — suitable for concealed or rendered-over applications",
      "Lower cost than Colorbond (no paint coating)",
      "Custom fabricated to project-specific dimensions",
      "All cut edges must be treated before installation",
      "TODO: owner confirm — confirm exposure zone and application suitability",
    ],
    limitations: [
      "Not suitable for coastal environments — specify stainless 316 for coastal locations",
      "Mill finish only — not available in colour-matched finish; not suitable for exposed applications where colour match is required",
      "All cut edges and penetrations must be treated before installation",
      "TODO: owner confirm — confirm LYSAGHT exposure zone and confirm Zincalume is appropriate for the specific application",
    ],
    procurementSources: [
      { name: "LYSAGHT — Zincalume sheet supply", url: "https://www.lysaght.com/en-au" },
      { name: "Stratco — steel flashings and distribution", url: "https://www.stratco.com.au" },
      { name: "Local sheet metal fabricator — confirm fabricator and lead time", url: "https://www.lysaght.com/en-au" },
    ],
  },
  {
    fullLabel: "Stratco / Fielders — pre-formed Colorbond sections",
    brandUrl: "https://www.stratco.com.au",
    tdsUrl: "https://www.stratco.com.au",
    accentColor: "#7c3aed",
    name: "Pre-formed Colorbond head flashing section",
    descriptionLine: "Pre-formed Colorbond steel Z-profile or hook-nose head flashing section — available ex-stock from Stratco, Fielders and flashings suppliers — cut to length on site — suitable for standard reveals where profile matches project requirements",
    productType: "Pre-formed Colorbond head flashing — ex-stock standard profile",
    filterTags: ["Colorbond", "Head-flashing", "Pre-formed", "Inland", "AS-3700", "Window", "Masonry"],
    techChips: [
      { label: "Colorbond", cls: "bg-slate-100 text-slate-700" },
      { label: "Pre-formed", cls: "bg-sky-100 text-sky-800" },
      { label: "Ex-stock", cls: "bg-green-50 text-green-700" },
      { label: "Standard profile", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Pre-formed Colorbond head flashing sections are roll-formed in standard profiles and available ex-stock from Stratco, Fielders and flashings supply companies. They are cut to length on site, avoiding the lead time of custom fabrication. Sections are available in a range of Colorbond colours but may be limited compared to the full custom fabrication colour palette — confirm colour availability with the supplier before specifying. Pre-formed sections are appropriate where the standard profile matches the project window reveal geometry. End caps must be cut and folded on site. All cut edges must be treated before installation. Confirm Colorbond exposure zone suitability before specifying — Colorbond is not suitable for coastal environments. TODO: owner confirm — confirm profile dimensions, colour availability and LYSAGHT exposure zone classification before specifying.",
    technicalProperties: [
      "Pre-formed Colorbond steel — no fabrication lead time — ex-stock",
      "Cut to length on site — simple site operation",
      "Available in range of Colorbond colours — confirm specific colour availability with supplier",
      "Suitable where standard profile matches window reveal depth",
      "All cut edges must be treated before installation",
      "TODO: owner confirm — confirm profile dimensions, colour and exposure zone from supplier",
    ],
    limitations: [
      "Limited to standard profiles — cannot accommodate non-standard reveal geometries",
      "Not suitable for coastal environments — specify stainless 316 for coastal locations",
      "Colour range may be limited compared to custom fabrication options — confirm with supplier",
      "End caps require site fabrication at each end",
      "TODO: owner confirm — confirm profile, colour and exposure zone suitability before ordering",
    ],
    procurementSources: [
      { name: "Stratco — pre-formed Colorbond flashings (ex-stock)", url: "https://www.stratco.com.au" },
      { name: "Fielders — roll-formed Colorbond sections", url: "https://www.fielders.com.au" },
      { name: "Bunnings Warehouse — Colorbond flashing sections (limited profiles)", url: "https://www.bunnings.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Colorbond", label: "Colorbond" },
  { id: "Zincalume", label: "Zincalume" },
  { id: "Head-flashing", label: "Head flashing" },
  { id: "Custom", label: "Custom fabricated" },
  { id: "Pre-formed", label: "Pre-formed" },
  { id: "Inland", label: "Inland / non-coastal" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "Window", label: "Window" },
  { id: "Masonry", label: "Masonry" },
];

const SYSTEM_COMPARISON = [
  { product: "Custom Colorbond head flashing", type: "Custom fab", material: "Colorbond steel", finish: "Full colour range", coastal: "No", availability: "Lead time req.", primaryUse: "Colour-matched head flashings — inland/non-coastal — most common in residential strata" },
  { product: "Custom Zincalume head flashing", type: "Custom fab", material: "Zincalume steel", finish: "Mill (unpainted)", coastal: "No", availability: "Lead time req.", primaryUse: "Concealed / rendered-over applications — lower cost than Colorbond" },
  { product: "Pre-formed Colorbond section", type: "Pre-formed", material: "Colorbond steel", finish: "Limited colours", coastal: "No", availability: "Ex-stock", primaryUse: "Standard reveals — no fabrication lead time — confirm profile match before ordering" },
];

const TECH_INFO = {
  typicalApplications: [
    "Window head flashing installation on inland and non-coastal Class 2 strata buildings",
    "Colorbond head flashings where the facade colour scheme incorporates Colorbond elements",
    "Replacement of failed galvanised head flashings in non-coastal environments",
    "Concealed head flashings in rendered facades where Zincalume mill finish is acceptable",
    "Head flashings where cost is a factor and the coastal specification (stainless 316) is not required",
  ],
  selectionCriteria: [
    "Confirm LYSAGHT exposure zone for the project — Colorbond and Zincalume are not suitable for coastal exposure zones",
    "Specify stainless 316 for coastal, marine or high-chloride environments — do not specify Colorbond or Zincalume",
    "Confirm colour match with facade paint scheme or existing Colorbond elements before ordering",
    "Custom fabrication for non-standard reveals — pre-formed sections for standard profiles only",
    "All cut edges must be treated with Zincalume touch-up or cut-edge sealant before installation",
  ],
  limitations: [
    "Not suitable for coastal environments — use stainless 316 for coastal and marine-influenced locations",
    "LYSAGHT exposure zone must be confirmed — warranty is zone-specific and some locations are excluded",
    "All cut edges, holes and damaged coating areas must be treated before installation",
    "Do not use carbon steel fasteners — use Colorbond-compatible Zincalume or stainless fasteners only",
    "Colorbond coating can be damaged by incompatible sealants — confirm sealant compatibility with LYSAGHT",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures (flashing requirements for masonry construction)",
    "LYSAGHT Product Warranty — exposure zone classification and warranty conditions",
    "NCC Volume One — weatherproofing requirements for external walls",
    "Manufacturer TDS — confirm exposure zone, compatible fasteners and sealant before specifying",
  ],
  suitableDefects: [
    "Failed or corroded galvanised head flashings requiring replacement in non-coastal environments",
    "Absent head flashings above window openings on inland strata buildings",
    "Water ingress above window frames where head flashings are absent or undersized",
    "Flashings requiring colour-match to existing Colorbond roof or facade elements",
  ],
  typicalSubstrates: [
    "Masonry — brick and block facades — flashing fixed to masonry or embedded in mortar course",
    "Render — rendered masonry — flashing fixed to return and sealed before rendering",
    "Not suitable for coastal masonry — specify stainless 316 for coastal locations",
    "Not compatible with carbon steel fasteners — use Colorbond-compatible fixings only",
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
      <p className="mt-2 text-[10px] italic text-slate-400">Confirm exposure zone suitability and fabricator availability before ordering.</p>
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

export function HeadFlashColorbondIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are Colorbond head flashing systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Colorbond steel head flashings are LYSAGHT-branded, pre-painted steel flashings used above window and door openings on Australian strata buildings in non-coastal environments. They are the standard head flashing material for inland residential and low-rise strata construction where the Colorbond colour range is suitable for the facade scheme and the coastal specification (stainless 316) is not required.</p>
        {expanded && <p>Colorbond is appropriate only within the LYSAGHT-specified exposure zone — it is not suitable for coastal, marine or high-chloride environments. Always confirm the LYSAGHT exposure zone classification for the project location before specifying Colorbond. A critical installation requirement is that all cut edges, drilled holes and any areas where the Colorbond coating is damaged must be treated with Zincalume touch-up paint or cut-edge sealant before installation — exposed steel at cut edges will corrode and stain the facade below. Fasteners must be Colorbond-compatible Zincalume or stainless — not carbon steel. The sealant at the back of the flashing must be compatible with the Colorbond coating — confirm compatibility with LYSAGHT before applying. Where the project location is within a coastal zone, specify stainless 316 head flashings instead.</p>}
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

export function HeadFlashColorbondProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — Colorbond and Zincalume head flashing systems — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of Colorbond and Zincalume head flashing systems. Confirm LYSAGHT exposure zone before specifying for any project.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Material</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Finish</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Coastal</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Availability</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.finish}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coastal}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.availability}</td>
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
