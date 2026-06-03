"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "WTA-classified"
  | "Breathable"
  | "Vapour-permeable"
  | "Exterior"
  | "Masonry"
  | "Coastal"
  | "AS-3700";

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
    fullLabel: "Remmers (Australia)",
    brandUrl: "https://www.remmers.com.au",
    tdsUrl: "https://www.remmers.com.au",
    accentColor: "#0369a1",
    name: "Remmers Außenputz WTA",
    descriptionLine: "WTA-classified vapour-permeable exterior render — high pore volume — low sd value — exterior masonry",
    productType: "WTA-classified vapour-permeable exterior render",
    filterTags: ["WTA-classified", "Breathable", "Vapour-permeable", "Exterior", "Masonry", "Coastal", "AS-3700"],
    techChips: [
      { label: "WTA-classified", cls: "bg-sky-100 text-sky-800" },
      { label: "Breathable", cls: "bg-slate-100 text-slate-700" },
      { label: "Low sd value", cls: "bg-green-50 text-green-700" },
      { label: "High pore volume", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: owner confirm AU name", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Remmers supplies WTA-classified vapour-permeable render systems for facades where moisture vapour transmission from the substrate is critical. The specific product name should be confirmed with Remmers Australia — their range includes both renovating renders and lighter vapour-permeable exterior renders. TODO: owner confirm — Remmers exterior vapour-permeable render product name and specification for Australian market. Confirm sd value, pore volume and WTA classification with Remmers Australia technical before specifying.",
    technicalProperties: [
      "WTA-classified vapour-permeable render",
      "High pore volume — allows moisture vapour to escape",
      "Low sd value — confirm from current Remmers TDS",
      "Exterior masonry use",
      "Confirm minimum thickness, inter-coat timing and substrate pre-treatment with Remmers Australia",
    ],
    limitations: [
      "TODO: owner confirm — Remmers product name for vapour-permeable exterior render in Australia",
      "Not suitable over substrates with active water ingress under pressure",
      "Confirm minimum pore volume and sd value from current TDS",
      "Confirm system sequence with Remmers Australia",
    ],
    procurementSources: [
      { name: "Remmers (Australia) — trade supply", url: "https://www.remmers.com.au" },
    ],
  },
  {
    fullLabel: "Caparol Australia (DAW SE)",
    brandUrl: "https://www.caparol.com.au",
    tdsUrl: "https://www.caparol.com.au",
    accentColor: "#7c2d12",
    name: "Caparol Capagrund / RenoExpert",
    descriptionLine: "Vapour-permeable render system for damp masonry facades — European specialist brand — Australian availability TODO confirm",
    productType: "Vapour-permeable render system for damp masonry facades",
    filterTags: ["Breathable", "Vapour-permeable", "Exterior", "Masonry"],
    techChips: [
      { label: "Vapour-permeable", cls: "bg-orange-100 text-orange-800" },
      { label: "Damp masonry", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior use", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Caparol (DAW SE Australia) supplies vapour-permeable render and coating systems for moisture-affected masonry facades. TODO: owner confirm — Caparol vapour-permeable render product name and availability in Australia. Caparol is a major European manufacturer of breathable and vapour-permeable facades systems. Confirm current Australian product range, sd value, pore volume and system sequence with Caparol Australia before specifying.",
    technicalProperties: [
      "Vapour-permeable render for damp masonry",
      "High moisture vapour transmission — low sd value (confirm from TDS)",
      "Exterior use",
      "TODO: owner confirm product name and specification",
    ],
    limitations: [
      "TODO: owner confirm — Caparol vapour-permeable render product name and availability in Australia",
      "Confirm sd value, pore volume, and WTA classification status with Caparol Australia",
      "Confirm current distribution network in Australia",
    ],
    procurementSources: [
      { name: "Caparol Australia (DAW SE) — confirm trade supply and availability", url: "https://www.caparol.com.au" },
    ],
  },
  {
    fullLabel: "Rockcote / Saint-Gobain Weber",
    brandUrl: "https://www.rockcote.com.au",
    tdsUrl: "https://www.rockcote.com.au",
    accentColor: "#b45309",
    name: "Rockcote Breathable Render",
    descriptionLine: "Breathable polymer-modified render — exterior facade — vapour permeability rating to be confirmed from TDS",
    productType: "Breathable polymer-modified render — exterior facade",
    filterTags: ["Breathable", "Vapour-permeable", "Exterior", "Masonry", "AS-3700"],
    techChips: [
      { label: "Breathable", cls: "bg-amber-100 text-amber-800" },
      { label: "Polymer-modified", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior masonry", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Rockcote (Saint-Gobain Weber) supplies polymer-modified render systems for exterior facades including renders with enhanced vapour permeability. TODO: owner confirm — confirm the current Rockcote or Weber product name and specification for breathable/vapour-permeable render application on damp or moisture-affected masonry facades. The Saint-Gobain Weber range includes various render systems with different vapour permeability ratings — confirm the sd value and pore volume of the selected product from the current TDS before specifying for moisture-critical applications.",
    technicalProperties: [
      "Polymer-modified render with vapour permeability",
      "Pre-bagged — mixed with water",
      "Exterior masonry use",
      "Confirm sd value and pore volume from current TDS",
      "TODO: owner confirm product name for breathable/vapour-permeable render in Rockcote/Weber range",
    ],
    limitations: [
      "TODO: owner confirm — exact Rockcote/Weber product name for vapour-permeable render",
      "Confirm sd value meets project specification",
      "Not all Rockcote/Weber renders are equally breathable — confirm from current TDS",
      "Confirm system compatibility with substrate treatment and primer",
    ],
    procurementSources: [
      { name: "Rockcote / Saint-Gobain Weber — trade supply nationally", url: "https://www.rockcote.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "WTA-classified", label: "WTA-classified" },
  { id: "Breathable", label: "Breathable" },
  { id: "Vapour-permeable", label: "Vapour-permeable" },
  { id: "Exterior", label: "Exterior" },
  { id: "Masonry", label: "Masonry" },
  { id: "Coastal", label: "Coastal" },
  { id: "AS-3700", label: "AS 3700" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  sdValue: string;
  poreVolume: string;
  wtaClass: string;
  exterior: string;
  primaryUse: string;
}[] = [
  {
    product: "Remmers Außenputz WTA",
    brand: "Remmers",
    sdValue: "Confirm from current Remmers TDS",
    poreVolume: "WTA minimum — confirm with Remmers AU",
    wtaClass: "WTA-classified — confirm with Remmers AU",
    exterior: "Yes — exterior masonry",
    primaryUse: "Damp masonry facades where moisture vapour transmission is critical",
  },
  {
    product: "Caparol Capagrund / RenoExpert",
    brand: "Caparol / DAW SE",
    sdValue: "Confirm from TDS with Caparol AU",
    poreVolume: "Confirm from TDS with Caparol AU",
    wtaClass: "TODO: confirm WTA status with Caparol AU",
    exterior: "Yes — exterior use",
    primaryUse: "Moisture-affected damp masonry facades — European specialist product",
  },
  {
    product: "Rockcote Breathable Render",
    brand: "Rockcote / Saint-Gobain Weber",
    sdValue: "Confirm from TDS with Rockcote AU",
    poreVolume: "Confirm from TDS with Weber AU",
    wtaClass: "TODO: confirm WTA status with Weber AU",
    exterior: "Yes — exterior masonry",
    primaryUse: "Exterior masonry facades requiring vapour-permeable render",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Damp masonry facades where substrate moisture cannot be fully eliminated before re-rendering",
    "Facades subject to condensation and moisture vapour build-up from interior",
    "Post rising-damp treatment re-rendering where substrate moisture remains",
    "Coastal masonry where salt and moisture ingress is ongoing at a low level",
  ],
  selectionCriteria: [
    "Sd value — vapour diffusion resistance — lower is more breathable — confirm target sd value from project specification",
    "Pore volume — confirm minimum for WTA classification where required",
    "WTA classification — confirm where salt attack is also present",
    "Substrate treatment compatibility — confirm render is compatible with salt-retardant treatment applied",
    "Minimum thickness and application sequence — confirm from TDS",
  ],
  limitations: [
    "Not suitable over substrates with active water ingress under hydraulic pressure",
    "Breathable render will not compensate for unaddressed rising damp — treat moisture source first",
    "All products are TODO: owner confirm",
    "Do not apply non-breathable coatings or paints over breathable render — this defeats the purpose",
  ],
  standardsNotes: [
    "WTA Merkblatt 2-9-04/D — European standard for renovating renders in damp masonry",
    "AS 3700 — Masonry Structures",
    "Manufacturer system guides — vapour permeability claims must be confirmed from current TDS",
  ],
  suitableDefects: [
    "Render failure on damp or moisture-affected masonry facades",
    "Post rising-damp remediation re-render",
    "Facades where standard render has blistered or delaminated due to moisture vapour pressure",
  ],
  typicalSubstrates: [
    "Masonry — brick and block with residual moisture content",
    "Concrete facades with internal moisture vapour",
    "Heritage masonry — confirm compatibility with lime-based systems",
  ],
};

/* ── Collapsible helpers ── */

function CollapsibleList({
  items,
  icon,
  limit = 3,
}: {
  items: string[];
  icon: "check" | "x";
  limit?: number;
}) {
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
        <button
          onClick={() => setExpanded((e) => !e)}
          className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600"
        >
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
        <button
          onClick={() => setExpanded((e) => !e)}
          className="text-[9px] font-bold text-slate-400 hover:text-slate-600"
        >
          {expanded ? "Hide ↑" : "See more ↓"}
        </button>
      </div>
      {expanded && (
        <div className="mt-2 space-y-1.5">
          {sources.map((src) => (
            <div
              key={src.name}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs"
            >
              {src.url ? (
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900"
                >
                  {src.name}
                  <ExternalLink size={9} className="text-slate-300" />
                </a>
              ) : (
                <span className="font-semibold text-slate-600">{src.name}</span>
              )}
            </div>
          ))}
        </div>
      )}
      <p className="mt-2 text-[10px] italic text-slate-400">
        Confirm suitability with the current manufacturer TDS before specifying or applying.
      </p>
    </div>
  );
}

function CollapsibleCardDetails({
  text,
  chips,
}: {
  text: string;
  chips: { label: string; cls: string }[];
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      {expanded && (
        <>
          <p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>
          {chips.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {chips.map((chip) => (
                <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>
                  {chip.label}
                </span>
              ))}
            </div>
          )}
        </>
      )}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600"
      >
        {expanded ? "Hide details ↑" : "Show details ↓"}
      </button>
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p
        className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}
      >
        {text}
      </p>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900"
      >
        {expanded ? "Show less ↑" : "Show more ↓"}
      </button>
    </div>
  );
}

export function BreathableRenderIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are breathable/vapour-permeable renders?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Breathable and vapour-permeable renders are render systems with a high pore volume (typically &gt;25–35%) and low vapour diffusion resistance (sd value typically &lt;0.14m) that allow moisture vapour generated within the facade substrate to escape through the render body without causing blistering, delamination, or surface disruption. They are used on masonry facades where residual moisture in the substrate cannot be fully controlled — for example, where rising damp treatment has been applied but some moisture remains.
        </p>
        {expanded && (
          <p>
            The key properties are the sd value (vapour diffusion resistance — lower is more breathable) and the pore volume (higher is more accommodating of salt crystallisation). WTA-classified renovating renders are a specific subset of breathable renders — they meet the WTA Merkblatt criteria for both pore volume and capillary water uptake. Product selection must confirm sd value, pore volume, WTA classification where specified, and compatibility with the substrate treatment system used.
          </p>
        )}
      </div>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900"
      >
        {expanded ? "Read less ↑" : "Read more ↓"}
      </button>
    </div>
  );
}

function TechCard({
  icon,
  title,
  items,
  style,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  style: "bullet" | "check" | "warn";
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-white">
          {icon}
        </div>
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

export function BreathableRenderProductSection() {
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
      : PRODUCTS.filter((p) =>
          Array.from(activeFilters).every((f) => p.filterTags.includes(f))
        );

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
            <p className="mt-0.5 text-xs text-slate-500">
              Applications, selection criteria, limitations, standards, suitable substrates
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? (
              <>Hide detail <ChevronUp size={14} /></>
            ) : (
              <>Show detail <ChevronDown size={14} /></>
            )}
          </div>
        </button>
        {accordionOpen && (
          <div className="border-t border-slate-100 px-7 pb-7 pt-6">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <TechCard icon={<Layers size={15} />} title="Typical Applications" items={TECH_INFO.typicalApplications} style="bullet" />
              <TechCard icon={<Ruler size={15} />} title="Selection Criteria" items={TECH_INFO.selectionCriteria} style="check" />
              <TechCard icon={<AlertTriangle size={15} />} title="When NOT to Use" items={TECH_INFO.limitations} style="warn" />
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — breathable and vapour-permeable render systems only — scroll to view all</p>
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
                  active
                    ? "border-sky-950 bg-sky-950 text-white"
                    : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
                }`}
              >
                {f.label}
              </button>
            );
          })}
          {activeFilters.size > 0 && (
            <button
              type="button"
              onClick={() => setActiveFilters(new Set())}
              className="text-xs text-slate-400 underline hover:text-slate-600"
            >
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
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"
            >
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
            <div
              key={product.name}
              className="flex-none"
              style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}
            >
              <div
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                style={{ borderLeft: `4px solid ${product.accentColor}` }}
              >
                {/* Card header */}
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                      {product.fullLabel}
                    </span>
                    <div className="flex shrink-0 items-center gap-1">
                      {product.tdsUrl && (
                        <a
                          href={product.tdsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                        >
                          <FileText size={9} /> TDS
                        </a>
                      )}
                      <a
                        href={product.brandUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                      >
                        <ExternalLink size={9} /> Brand Site
                      </a>
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                  </div>
                  <CollapsibleCardDetails
                    text={product.descriptionLine}
                    chips={product.techChips}
                  />
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
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of breathable and vapour-permeable render systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Sd value</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Pore volume</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">WTA class</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Exterior</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.sdValue}</td>
                  <td className="px-4 py-3 text-slate-600">{row.poreVolume}</td>
                  <td className="px-4 py-3 text-slate-600">{row.wtaClass}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.exterior}</td>
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
