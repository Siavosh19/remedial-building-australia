"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Overflow"
  | "Scupper"
  | "Stainless"
  | "Pipe-overflow"
  | "Weir"
  | "Aluminium"
  | "Flat-roof"
  | "Box-gutter";

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
    fullLabel: "Blucher",
    brandUrl: "https://www.blucher.com.au",
    accentColor: "#ef4444",
    name: "Blucher Stainless Steel Scupper Outlet",
    descriptionLine: "Marine-grade 316 stainless steel scupper overflow for flat roofs and balconies — set at overflow level above primary drain to provide emergency discharge",
    productType: "Stainless steel scupper overflow outlet for flat roofs",
    filterTags: ["Overflow", "Scupper", "Stainless", "Flat-roof"],
    techChips: [
      { label: "Stainless steel 316", cls: "bg-sky-100 text-sky-800" },
      { label: "Scupper overflow", cls: "bg-slate-100 text-slate-700" },
      { label: "Flat roof / balcony", cls: "bg-slate-100 text-slate-700" },
      { label: "Emergency discharge", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "The Blucher Stainless Steel Scupper Outlet is a marine-grade 316 stainless steel overflow scupper designed for flat roof and balcony applications. It is installed through the parapet or upstand at a height above the primary drain, providing an emergency overflow discharge path when the primary drainage system is at capacity or blocked.\n\nThe scupper body is fabricated from 316 grade stainless steel for corrosion resistance in external roof environments. The outlet connects through the parapet face and discharges to the outside of the building — the discharge point must be positioned to avoid discharge onto occupied areas below. Confirm installation height above primary drain level with hydraulic engineer to meet AS/NZS 3500.3 overflow relief requirements.",
    technicalProperties: [
      "Marine-grade 316 stainless steel construction — corrosion-resistant for external roof and balcony environments",
      "Installed through parapet or upstand at overflow level — set height above primary drain confirmed by hydraulic design",
      "Provides emergency overflow discharge path when primary drain is at capacity or blocked",
      "Available in multiple outlet sizes — size confirmed by hydraulic design for the drainage zone area",
      "Compatible with most flat roof membrane systems — integrate into waterproofing upstand detail per Blucher installation guide",
    ],
    limitations: [
      "Overflow sizing must be confirmed by hydraulic engineer to AS/NZS 3500.3 — do not size by rule of thumb",
      "Discharge location must be confirmed — overflow must not discharge onto occupied areas or pedestrian paths below",
      "Installation height above primary drain must be confirmed by hydraulic design — incorrect height defeats overflow relief function",
      "Waterproofing upstand detail around scupper penetration must be completed per manufacturer instructions — potential leak point",
      "Confirm current product specification and availability with Blucher Australia before specifying",
    ],
    procurementSources: [
      { name: "Blucher Australia — trade supply — contact for current pricing", url: "https://www.blucher.com.au" },
      { name: "Plumbing trade suppliers — confirm stock nationally", url: "https://www.blucher.com.au" },
    ],
  },
  {
    fullLabel: "OMG Roofing",
    brandUrl: "https://www.omgroofing.com",
    accentColor: "#3b82f6",
    name: "OMG RhinoBolt Overflow Pipe Riser",
    descriptionLine: "Adjustable-height overflow pipe riser set above primary drain level — provides secondary overflow relief path for flat roofs when primary drain is blocked",
    productType: "Adjustable overflow pipe riser for flat roof drainage",
    filterTags: ["Overflow", "Pipe-overflow", "Flat-roof"],
    techChips: [
      { label: "Pipe overflow riser", cls: "bg-sky-100 text-sky-800" },
      { label: "Adjustable height", cls: "bg-slate-100 text-slate-700" },
      { label: "Secondary overflow", cls: "bg-slate-100 text-slate-700" },
      { label: "Flat roof", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "The OMG RhinoBolt Overflow Pipe Riser is an adjustable-height overflow riser installed within or adjacent to the primary drain body on flat roofs. The riser pipe is set at a height above the primary drain inlet level, so normal rainfall drains through the primary outlet while the riser only activates when water levels reach the overflow height — providing a secondary relief path when the primary drain is blocked or at capacity.\n\nThe adjustable height allows the overflow level to be set on-site to suit the hydraulic design requirement. The riser discharges into the primary drain body and is directed to the drainage system. Confirm set height with hydraulic engineer to meet AS/NZS 3500.3 overflow relief requirements for the drainage zone.",
    technicalProperties: [
      "Adjustable-height riser allows overflow level to be set on-site per hydraulic design requirement",
      "Installed within or adjacent to primary drain body — secondary relief path activated at overflow level",
      "Compatible with OMG RhinoDrain primary flat roof drain system — confirm compatibility with other drain brands",
      "Provides overflow relief without requiring separate penetration through parapet — suitable where parapet scupper is not possible",
      "Confirm current product sizing and height adjustment range with OMG Roofing technical before specifying",
    ],
    limitations: [
      "Overflow sizing and riser height must be confirmed by hydraulic engineer to AS/NZS 3500.3 — do not set height by rule of thumb",
      "Riser discharges into primary drain body — confirm drain capacity is sufficient to handle combined primary and overflow flow rates",
      "Not suitable as the only overflow relief method where hydraulic design requires separate overflow discharge path",
      "Must be inspected and kept clear of debris annually — blocked riser defeats overflow relief function",
      "Confirm current product specification and compatibility with OMG Roofing before specifying",
    ],
    procurementSources: [
      { name: "OMG Roofing — trade supply — contact for current pricing", url: "https://www.omgroofing.com" },
      { name: "Roofing trade suppliers — confirm stock nationally", url: "https://www.omgroofing.com" },
    ],
  },
  {
    fullLabel: "Alproc",
    brandUrl: "https://www.alproc.com.au",
    accentColor: "#22c55e",
    name: "Alproc Aluminium Weir Overflow Strip",
    descriptionLine: "Extruded aluminium weir overflow strip installed at parapet or box gutter end — provides overflow relief when primary drainage is at capacity",
    productType: "Aluminium weir overflow strip for box gutters and flat roofs",
    filterTags: ["Overflow", "Weir", "Aluminium", "Box-gutter", "Flat-roof"],
    techChips: [
      { label: "Extruded aluminium", cls: "bg-sky-100 text-sky-800" },
      { label: "Weir overflow", cls: "bg-slate-100 text-slate-700" },
      { label: "Box gutter / flat roof", cls: "bg-slate-100 text-slate-700" },
      { label: "Overflow relief", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "The Alproc Aluminium Weir Overflow Strip is an extruded aluminium profile installed at the end of a box gutter or at the parapet of a flat roof to provide overflow relief. The weir strip establishes the overflow level — when water in the gutter or on the roof reaches the weir height, it overflows over the strip and discharges safely to the outside of the building, preventing water from backing up into the structure.\n\nThe aluminium extrusion is powder-coated or mill-finish depending on the project requirement. The weir height is set per the hydraulic design for the drainage zone. The strip must be fixed so that it remains at the design weir height under roof loading — confirm fixing and structural support with the roofing contractor. The overflow discharge point must be positioned to avoid discharge onto occupied areas below.",
    technicalProperties: [
      "Extruded aluminium construction — lightweight and corrosion-resistant for external roof and gutter environments",
      "Weir height set per hydraulic design for the drainage zone — establishes overflow level at box gutter or flat roof parapet",
      "Provides overflow relief by allowing water to discharge over the weir strip when primary drainage is at capacity",
      "Available in powder-coated or mill-finish — confirm finish and colour requirement with Alproc",
      "Suitable for box gutter end and flat roof parapet applications — confirm fixing detail and structural support with roofing contractor",
    ],
    limitations: [
      "Weir height must be confirmed by hydraulic engineer to AS/NZS 3500.3 — do not set height without hydraulic design",
      "Discharge location must be confirmed — overflow must not discharge onto occupied areas or pedestrian paths below",
      "Weir strip fixing must be confirmed by structural engineer — strip must remain at design height under all roof loading conditions",
      "Waterproofing seal between weir strip and substrate must be maintained — potential water ingress point if seal fails",
      "Confirm current product specification and availability with Alproc before specifying",
    ],
    procurementSources: [
      { name: "Alproc — trade supply — contact for current pricing", url: "https://www.alproc.com.au" },
      { name: "Roofing and gutter trade suppliers — confirm stock nationally", url: "https://www.alproc.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Overflow", label: "Overflow" },
  { id: "Scupper", label: "Scupper" },
  { id: "Stainless", label: "Stainless" },
  { id: "Pipe-overflow", label: "Pipe-overflow" },
  { id: "Weir", label: "Weir" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "Flat-roof", label: "Flat-roof" },
  { id: "Box-gutter", label: "Box-gutter" },
];

const BRAND_EQUIV: { system: string; blucher: string; omg: string; alproc: string }[] = [
  { system: "Scupper overflow (stainless)", blucher: "Stainless Scupper", omg: "—", alproc: "—" },
  { system: "Pipe overflow riser", blucher: "—", omg: "RhinoBolt Riser", alproc: "—" },
  { system: "Weir overflow strip (aluminium)", blucher: "—", omg: "—", alproc: "Weir Overflow Strip" },
];

const SYSTEM_COMPARISON: {
  product: string; brand: string; type: string; material: string; drainageZone: string; setHeight: string; primaryUse: string;
}[] = [
  {
    product: "Blucher Stainless Steel Scupper Outlet",
    brand: "Blucher",
    type: "Scupper overflow",
    material: "316 stainless steel",
    drainageZone: "Flat roof / balcony",
    setHeight: "Above primary drain — hydraulic design",
    primaryUse: "Parapet scupper emergency overflow discharge",
  },
  {
    product: "OMG RhinoBolt Overflow Pipe Riser",
    brand: "OMG Roofing",
    type: "Pipe overflow riser",
    material: "Proprietary — confirm TDS",
    drainageZone: "Flat roof",
    setHeight: "Adjustable — set per hydraulic design",
    primaryUse: "In-drain secondary overflow relief riser",
  },
  {
    product: "Alproc Aluminium Weir Overflow Strip",
    brand: "Alproc",
    type: "Weir overflow strip",
    material: "Extruded aluminium",
    drainageZone: "Box gutter / flat roof parapet",
    setHeight: "Weir height per hydraulic design",
    primaryUse: "Box gutter end / parapet weir overflow relief",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Emergency overflow relief at flat roof drainage zones where primary drain may block during extreme rainfall events",
    "Box gutter overflow relief where primary downpipes may not cope with design storm flows",
    "Balcony overflow outlets set above primary floor waste to prevent flooding of adjacent internal areas",
    "Podium deck overflow at parapet where primary drainage cannot drain peak storm flows fast enough",
    "Strata apartment rooftop overflow compliance under NCC and AS/NZS 3500.3 for Class 2 buildings",
  ],
  selectionCriteria: [
    "Select scupper outlet where parapet penetration is feasible and overflow must discharge outside the building envelope",
    "Select pipe overflow riser where overflow must drain into the existing primary drain system and parapet scupper is not possible",
    "Select weir strip for box gutter end overflow or parapet overflow where a linear weir profile is required",
    "Overflow type and size must be confirmed by hydraulic engineer for each drainage zone — do not select without hydraulic design",
    "Confirm discharge location for all overflow types — overflow must not discharge onto occupied areas, pedestrian paths or adjacent properties",
  ],
  limitations: [
    "Overflow systems are a secondary relief — they do not replace the requirement for correctly sized primary drainage",
    "All overflow outlets must be maintained and kept clear of debris — blocked overflows defeat the overflow relief function",
    "Overflow sizing must be confirmed by hydraulic design to AS/NZS 3500.3 — rule of thumb sizing is not acceptable",
    "Discharge point must be to a safe location — overflow onto occupied areas below is a safety and liability issue",
    "Set height above primary drain must be confirmed by hydraulic design — incorrect height may allow ponding before overflow activates",
  ],
  standardsNotes: [
    "AS/NZS 3500.3 — Plumbing and Drainage — Stormwater Drainage — overflow relief requirements for roof drainage zones",
    "NCC Volume One — Class 2 buildings — roof drainage and overflow relief requirements",
    "AS/NZS 3500.1 — Water Services — referenced for roof drainage design in conjunction with AS/NZS 3500.3",
    "Hydraulic engineer must confirm overflow sizing and set height for each drainage zone — not a self-certifiable design decision",
  ],
  suitableDefects: [
    "Flat roofs with no overflow relief in violation of NCC and AS/NZS 3500.3 requirements",
    "Box gutters with blocked or absent overflow outlets causing water to back up into the building structure",
    "Rooftop areas where primary drains have failed or become blocked causing ponding and potential structural overload",
    "Balconies without overflow relief where primary floor waste cannot drain extreme rainfall events",
  ],
  typicalSubstrates: [
    "Flat roof membrane surface — scupper through parapet or pipe riser in drain body",
    "Box gutter — weir strip at gutter end or scupper through side wall",
    "Concrete parapet or upstand — scupper outlet through core or block-out",
    "Steel or aluminium fascia / gutter end — weir strip fixed to end plate",
  ],
};

/* ── Collapsible helpers ── */

function CollapsibleList({ items, icon, limit = 3 }: { items: string[]; icon: "check" | "x"; limit?: number }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, limit);
  const extra = items.length - limit;
  return (
    <div>
      <ul className="space-y-1.5">
        {visible.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
            {icon === "check" ? (
              <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" />
            ) : (
              <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />
            )}
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
        <button onClick={() => setExpanded((e) => !e)} className="text-[9px] font-bold text-slate-400 hover:text-slate-600">
          {expanded ? "Hide ↑" : "See more ↓"}
        </button>
      </div>
      {expanded && (
        <div className="mt-2 space-y-1.5">
          {sources.map((src) => (
            <div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs">
              {src.url ? (
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">
                  {src.name} <ExternalLink size={9} className="text-slate-300" />
                </a>
              ) : (
                <span className="font-semibold text-slate-600">{src.name}</span>
              )}
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

export function OverflowIssuesIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are roof overflow systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Roof overflow systems provide a secondary emergency drainage path when the primary drainage outlets on a flat roof or box gutter are blocked or at capacity during extreme rainfall events. The National Construction Code (NCC) and AS/NZS 3500.3 require that overflow relief drainage be provided at every roof drainage zone — the absence of overflow outlets is a common non-compliance in Australian Class 2 strata apartment buildings. A blocked primary drain without overflow relief can cause rapid ponding, structural overload, and water ingress into the building below.
        </p>
        <p>
          The three main overflow system types used on flat roofs and box gutters are scupper outlets (penetrating through the parapet face to discharge to the outside), pipe overflow risers (installed within the primary drain body at a set height above the primary inlet), and weir overflow strips (linear aluminium extrusions installed at the end of box gutters or at parapet copings to establish a weir overflow level). Each system suits different roof configurations and structural constraints — the correct type is determined by the hydraulic engineer based on the drainage zone area, rainfall intensity, and building configuration.
        </p>
        <p>
          All overflow outlets must be set at a height above the primary drain that is confirmed by hydraulic design to AS/NZS 3500.3. This set height determines the maximum water level before overflow activates — too high and the roof may pond excessively before the overflow operates; too low and normal rainfall will divert to the overflow before the primary drain can cope. Overflow outlets must discharge to a safe location and must be inspected and maintained annually to remain clear of debris and functional.
        </p>
        <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
          <p className="mb-2 text-xs font-bold text-slate-700">Do not confuse with:</p>
          <ul className="space-y-1.5">
            {[
              "Primary drainage outlets — the normal drain, floor waste or downpipe from the roof — not an overflow system",
              "Box gutter downpipes — normal drainage discharging from the gutter — not overflow relief",
              "Flat roof fall correction — screed or tapered insulation to improve drainage gradient — not an overflow system",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-xs leading-5 text-slate-600">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function OverflowIssuesProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (id: FilterTag) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const visibleProducts =
    activeFilters.size === 0
      ? PRODUCTS
      : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });
  };

  return (
    <>
      {/* ── Technical Accordion ── */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setAccordionOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50"
        >
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable defects and substrates</p>
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
              <TechCard icon={<AlertTriangle size={15} />} title="Limitations" items={TECH_INFO.limitations} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards & Testing" items={TECH_INFO.standardsNotes} style="bullet" />
              <TechCard icon={<CheckCircle size={15} />} title="Suitable Defects" items={TECH_INFO.suitableDefects} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="Typical Substrates" items={TECH_INFO.typicalSubstrates} style="bullet" />
            </div>
          </div>
        )}
      </div>

      {/* ── Product Reference ── */}
      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — roof overflow systems — scroll to view all</p>
          </div>
        </div>

        {/* Filter chips */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => {
            const active = activeFilters.has(f.id);
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => toggleFilter(f.id)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                  active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
                }`}
              >
                {f.label}
              </button>
            );
          })}
          {activeFilters.size > 0 && (
            <button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">
              Clear filters
            </button>
          )}
        </div>

        {/* Nav row */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — 3 visible, scroll for more
          </span>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll("left")} aria-label="Scroll left" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => scroll("right")} aria-label="Scroll right" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable card row */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {visibleProducts.map((product) => (
            <div key={product.name} className="flex-none" style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ borderLeft: `4px solid ${product.accentColor}` }}>
                {/* Card header */}
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">{product.fullLabel}</span>
                    <div className="flex shrink-0 items-center gap-1">
                      {product.tdsUrl && (
                        <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
                          <FileText size={9} /> TDS
                        </a>
                      )}
                      <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
                        <ExternalLink size={9} /> Brand Site
                      </a>
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                  </div>
                  <CollapsibleCardDetails text={product.descriptionLine} chips={product.techChips} />
                </div>

                {/* System Description */}
                <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
                  <CollapsibleDescription text={product.systemDescription} />
                </div>

                {/* Technical Properties & Limitations */}
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

                {/* Procurement Sources */}
                <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3">
                  <CollapsibleSources sources={product.procurementSources} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── System Comparison ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">Side-by-side technical comparison of overflow system products for flat roof and box gutter drainage zones. Confirm current product specifications with manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Drainage zone</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Set height</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600">{row.drainageZone}</td>
                  <td className="px-4 py-3 text-slate-600">{row.setHeight}</td>
                  <td className="px-4 py-3 text-slate-600">{row.primaryUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Brand Equivalents ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Brand Equivalents</h2>
            <p className="mt-1 text-sm text-slate-500">Overflow system equivalents across brands active in Australian Class 2 strata roofing remediation.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#ef4444" }}>Blucher</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#3b82f6" }}>OMG Roofing</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#22c55e" }}>Alproc</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.blucher, row.omg, row.alproc].map((val, j) => (
                    <td key={j} className="px-4 py-3 text-slate-600">{val === "—" ? <span className="text-slate-300">—</span> : val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Warning callouts — BELOW comparison table only ── */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-amber-900">Overflow is a life-safety requirement</h3>
        </div>
        <ul className="space-y-2">
          {[
            "NCC requires overflow drainage at every roof area — a confirmed hydraulic design is required to size overflow outlets and set overflow height to AS/NZS 3500.3",
            "Overflow must discharge to a safe location — overflow outlets must not discharge into occupied areas, pedestrian paths, or onto adjacent properties below",
            "Overflow outlets must be maintained — inspected annually and kept clear of blockage — a blocked overflow outlet provides no protection when the primary drain fails",
          ].map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-amber-900">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
