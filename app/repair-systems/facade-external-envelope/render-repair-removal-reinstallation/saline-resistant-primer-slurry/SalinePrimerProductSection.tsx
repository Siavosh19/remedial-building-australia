"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Saline-primer"
  | "Slurry"
  | "Cementitious"
  | "Polymer"
  | "Exterior"
  | "Masonry"
  | "Concrete"
  | "Coastal"
  | "Salt-affected";

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
    fullLabel: "Remmers Australia",
    brandUrl: "https://www.remmers.com.au",
    tdsUrl: "https://www.remmers.com.au",
    accentColor: "#0369a1",
    name: "Remmers Vorspritzmörtel SP (WTA Spray Slurry)",
    descriptionLine: "WTA spray slurry — cementitious bonding slurry for salt-affected substrates before WTA renovating render — Remmers Australia",
    productType: "WTA cementitious spray slurry — salt-affected substrate primer",
    filterTags: ["Saline-primer", "Slurry", "Cementitious", "Exterior", "Masonry", "Concrete", "Coastal", "Salt-affected"],
    techChips: [
      { label: "WTA spray slurry", cls: "bg-sky-100 text-sky-800" },
      { label: "Cementitious", cls: "bg-slate-100 text-slate-700" },
      { label: "Salt-affected substrate", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Remmers Vorspritzmörtel SP is a WTA-compliant cementitious spray slurry (Vorspritzmörtel) applied to the substrate immediately before WTA renovating render application on salt-contaminated facades. It provides a bonding slurry layer that bridges the salt-retardant treatment and the renovating render. Confirm product name, application method, coverage, and system sequence with Remmers Australia. TODO: owner confirm — Remmers Vorspritzmörtel SP specification, WTA compliance and Australian availability.",
    technicalProperties: [
      "WTA cementitious spray slurry",
      "Applied to substrate after salt-retardant treatment before WTA render",
      "Provides bonding key for renovating render",
      "Confirm coverage and application method from Remmers TDS",
      "Part of Remmers WTA system — confirm compatibility",
    ],
    limitations: [
      "Applied wet — apply renovating render within correct time window — confirm from TDS",
      "TODO: owner confirm — Remmers Vorspritzmörtel SP specification and availability",
    ],
    procurementSources: [
      { name: "Remmers Australia", url: "https://www.remmers.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au",
    accentColor: "#0369a1",
    name: "Mapei Renderfix / Polymer Bonding Slurry for Salt Substrates",
    descriptionLine: "Polymer bonding slurry for salt-affected substrates — applied before salt-resistant render — exterior masonry and concrete facades — Mapei Australia",
    productType: "Polymer bonding slurry — salt-affected substrate render primer",
    filterTags: ["Saline-primer", "Slurry", "Polymer", "Exterior", "Masonry", "Concrete", "Coastal", "Salt-affected"],
    techChips: [
      { label: "Polymer slurry", cls: "bg-sky-100 text-sky-800" },
      { label: "Salt-affected substrate", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior masonry", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "A polymer-modified cementitious bonding slurry applied to salt-affected masonry and concrete substrates before salt-resistant or breathable render. Confirm the specific Mapei product for polymer bonding slurry on salt-contaminated substrates with Mapei Australia technical — the Mapei range includes bonding and priming products suited to this application. TODO: owner confirm — specific Mapei product for saline-resistant primer/slurry on salt-affected substrates.",
    technicalProperties: [
      "Polymer-modified cementitious bonding slurry",
      "Applied to clean salt-treated substrate before render",
      "Improves render adhesion on salt-contaminated surfaces",
      "Confirm product, coverage, and application timing with Mapei technical",
    ],
    limitations: [
      "TODO: owner confirm — specific Mapei product for saline-resistant primer/slurry on salt-affected substrates",
      "Apply render within timing window specified in TDS",
    ],
    procurementSources: [
      { name: "Mapei Australia", url: "https://www.mapei.com/au" },
      { name: "Bayset", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Rockcote / Saint-Gobain Weber",
    brandUrl: "https://www.rockcote.com.au",
    tdsUrl: "https://www.rockcote.com.au",
    accentColor: "#b45309",
    name: "Rockcote Saline Primer / Salt Substrate Slurry",
    descriptionLine: "Saline-resistant primer or cementitious slurry for salt-affected substrates — exterior masonry facades — before salt-resistant render — Saint-Gobain Weber Australia",
    productType: "Saline-resistant primer / cementitious slurry — salt-affected facade",
    filterTags: ["Saline-primer", "Slurry", "Cementitious", "Exterior", "Masonry", "Coastal", "Salt-affected"],
    techChips: [
      { label: "Saline primer", cls: "bg-amber-100 text-amber-800" },
      { label: "Cementitious slurry", cls: "bg-slate-100 text-slate-700" },
      { label: "Salt-affected facade", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Rockcote / Saint-Gobain Weber supplies primer and slurry products for salt-affected facade substrates. Confirm the specific Rockcote product for saline-resistant primer or bonding slurry on salt-contaminated substrates with Saint-Gobain Weber / Rockcote technical. TODO: owner confirm — Rockcote product for saline primer/slurry on salt-affected substrates.",
    technicalProperties: [
      "Saline-resistant primer or cementitious slurry",
      "Applied before salt-resistant render",
      "Confirm product, coverage and application sequence with Rockcote technical",
    ],
    limitations: [
      "TODO: owner confirm — specific Rockcote saline primer/slurry product",
      "Confirm application timing window",
    ],
    procurementSources: [
      { name: "Rockcote / Saint-Gobain Weber", url: "https://www.rockcote.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Saline-primer", label: "Saline primer" },
  { id: "Slurry", label: "Slurry" },
  { id: "Cementitious", label: "Cementitious" },
  { id: "Polymer", label: "Polymer" },
  { id: "Exterior", label: "Exterior" },
  { id: "Masonry", label: "Masonry" },
  { id: "Concrete", label: "Concrete" },
  { id: "Coastal", label: "Coastal" },
  { id: "Salt-affected", label: "Salt-affected" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  type: string;
  application: string;
  substrateType: string;
  applyBefore: string;
  primaryUse: string;
}[] = [
  {
    product: "Remmers Vorspritzmörtel SP",
    brand: "Remmers Australia",
    type: "WTA cementitious spray slurry",
    application: "Spray applied to substrate",
    substrateType: "Salt-contaminated masonry and concrete",
    applyBefore: "Remmers WTA renovating render",
    primaryUse: "WTA bonding slurry between salt-retardant treatment and WTA render",
  },
  {
    product: "Mapei Renderfix / Polymer Slurry",
    brand: "Mapei Australia",
    type: "Polymer-modified cementitious slurry",
    application: "Brush-on to substrate",
    substrateType: "Salt-contaminated masonry and concrete",
    applyBefore: "Salt-resistant or breathable render",
    primaryUse: "Polymer bonding slurry on salt-affected substrates before render",
  },
  {
    product: "Rockcote Saline Primer / Slurry",
    brand: "Rockcote / Saint-Gobain Weber",
    type: "TODO: confirm with Rockcote",
    application: "Confirm with Rockcote technical",
    substrateType: "Salt-contaminated exterior masonry",
    applyBefore: "Rockcote salt-resistant render",
    primaryUse: "Saline primer/slurry for salt-affected facade re-render",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Substrate priming on salt-contaminated masonry and concrete before WTA renovating render",
    "Bonding slurry application as part of complete WTA salt-attack remediation system",
    "Coastal facade re-render — applied after salt-retardant treatment and before salt-resistant render",
  ],
  selectionCriteria: [
    "System compatibility — saline primer must be compatible with the renovating render system — confirm with manufacturer",
    "Application timing — apply render within the specified window after primer/slurry",
    "WTA compliance — confirm WTA classification of primer/slurry where WTA system is specified",
    "Coverage rate — confirm from TDS",
  ],
  limitations: [
    "Not a stand-alone product — must be used as part of a complete WTA renovation render system",
    "Apply render within time window — do not allow primer/slurry to dry or over-cure before render",
    "Not a substitute for salt-retardant substrate treatment — that is applied to substrate before the primer",
  ],
  standardsNotes: [
    "WTA Merkblatt 2-9-04/D — saline primer/slurry is part of the complete WTA renovation system",
    "AS 3700 — Masonry Structures",
    "Manufacturer system guide — application sequence is critical",
  ],
  suitableDefects: [
    "Salt attack facade remediation — saline primer applied as part of complete system before renovating render",
    "Coastal masonry re-render — applied after salt-retardant treatment",
  ],
  typicalSubstrates: [
    "Masonry — brick and block contaminated with chloride or sulfate",
    "Concrete — external facades with salt contamination",
    "Heritage masonry — confirm compatibility with lime mortar joints",
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
      <p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>
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

export function SalinePrimerIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are saline-resistant primer and slurry systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Saline-resistant primers and cementitious bonding slurries are substrate preparation products applied to salt-contaminated masonry and concrete facades immediately before the application of WTA-classified salt-resistant renovating render. They provide a bonding bridge between the salt-retardant substrate treatment and the renovating render layer.
        </p>
        {expanded && (
          <>
            <p>
              They are the third stage in a complete WTA renovation render system — applied after salt-retardant substrate treatment and before the WTA renovating render body coat. Unlike general-purpose bonding agents, saline-resistant primers and slurries are formulated to be compatible with salt-contaminated substrates and WTA renovating renders. Product selection must be confirmed as part of the same manufacturer&apos;s WTA system to ensure complete system compatibility.
            </p>
          </>
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

export function SalinePrimerProductSection() {
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
              <TechCard icon={<BookOpen size={15} />} title="Standards & Notes" items={TECH_INFO.standardsNotes} style="bullet" />
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — saline-resistant primer and slurry systems — scroll to view all</p>
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
              Side-by-side comparison of saline-resistant primer and slurry systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Application</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Substrate type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Apply before</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600">{row.application}</td>
                  <td className="px-4 py-3 text-slate-600">{row.substrateType}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.applyBefore}</td>
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
