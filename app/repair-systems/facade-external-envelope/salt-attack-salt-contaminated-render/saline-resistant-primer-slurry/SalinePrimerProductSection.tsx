"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Cementitious-slurry"
  | "Epoxy-primer"
  | "Acrylic-primer"
  | "Bonding-primer"
  | "Salt-resistant"
  | "Masonry"
  | "Concrete";

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
    tdsUrl: "https://aus.sika.com",
    accentColor: "#be123c",
    name: "SikaCem Bonding Slurry",
    descriptionLine: "Cementitious bonding slurry — saline substrate adhesion primer — apply at green set before render — polymer-modified",
    productType: "Cementitious bonding slurry — saline substrate adhesion primer",
    filterTags: ["Cementitious-slurry", "Bonding-primer", "Salt-resistant", "Masonry", "Concrete"],
    techChips: [
      { label: "Cementitious slurry", cls: "bg-rose-100 text-rose-800" },
      { label: "Polymer-modified", cls: "bg-slate-100 text-slate-700" },
      { label: "Salt-tolerant", cls: "bg-green-50 text-green-700" },
      { label: "Apply at green set", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "SikaCem Bonding Slurry is a polymer-modified cementitious bonding slurry applied as a primer coat to concrete and masonry substrates to improve adhesion of the subsequent render coat. Cementitious bonding slurries are generally more tolerant of salt-contaminated substrates than acrylic polymer primers — the cementitious chemistry is compatible with salt-affected concrete and masonry surfaces. Applied by brush to the prepared substrate and left to reach a tacky set (green set) before render is applied. Confirm current product name and specification with Sika Australia technical. TODO: owner confirm — SikaCem Bonding Slurry current Australian product name and specification for salt-affected substrates.",
    technicalProperties: [
      "Polymer-modified cementitious bonding slurry",
      "Applied by brush to prepared substrate",
      "Cementitious chemistry tolerant of salt-contaminated substrates",
      "Apply render at green set (tacky) stage — confirm timing with Sika technical",
      "Compatible with Sika render systems — confirm specific compatibility",
    ],
    limitations: [
      "TODO: owner confirm — SikaCem Bonding Slurry product name and specification",
      "Must be applied at correct green-set stage — too early or too late will reduce adhesion",
      "Not a waterproofing primer — does not seal the substrate",
      "Confirm system compatibility with subsequent renovating render system",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply nationally", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem Construction Supplies",
    brandUrl: "https://www.parchem.com.au",
    tdsUrl: "https://www.parchem.com.au",
    accentColor: "#7c2d12",
    name: "Fosroc Nitobond EP",
    descriptionLine: "Two-component epoxy bonding primer — strong adhesion to dense and salt-contaminated substrates — Parchem national distribution",
    productType: "Epoxy bonding primer for dense and salt-contaminated substrates",
    filterTags: ["Epoxy-primer", "Bonding-primer", "Salt-resistant", "Concrete", "Masonry"],
    techChips: [
      { label: "Two-component epoxy", cls: "bg-orange-100 text-orange-800" },
      { label: "Salt-contaminated OK", cls: "bg-slate-100 text-slate-700" },
      { label: "National — Parchem", cls: "bg-green-50 text-green-700" },
      { label: "Apply while tacky", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Fosroc Nitobond EP is a two-component epoxy bonding primer distributed through Parchem Construction Supplies (DuluxGroup). Epoxy-based bonding primers provide strong adhesion to dense, smooth, and contaminated substrates including salt-affected concrete and masonry. Applied by brush or roller to the prepared substrate — render or repair mortar is applied while the epoxy primer is still tacky. TODO: owner confirm — Fosroc Nitobond EP suitability as primer for salt-resistant renovating render on salt-affected masonry facades. Confirm current product specification and compatibility with renovating render systems with Parchem Construction Supplies technical.",
    technicalProperties: [
      "Two-component epoxy bonding primer — strong adhesion to dense and contaminated substrates",
      "Applied while tacky — confirm pot life and application window with Parchem",
      "Suitable for salt-contaminated concrete and masonry",
      "Compatible with polymer-modified cementitious systems over cured epoxy primer",
      "Nationally available through Parchem Construction Supplies",
    ],
    limitations: [
      "TODO: owner confirm — Nitobond EP suitability specifically for salt-resistant renovating render systems",
      "Two-component — must be mixed in correct ratio",
      "Pot life limited — plan application sequence",
      "Confirm compatibility with specific renovating render system before specifying",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — national distribution (DuluxGroup)", url: "https://www.parchem.com.au" },
      { name: "Fosroc Australia — product information", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Dulux / AcraTex",
    brandUrl: "https://www.duluxpro.com.au",
    tdsUrl: "https://www.duluxpro.com.au",
    accentColor: "#0369a1",
    name: "Dulux Professional Render Primer",
    descriptionLine: "Acrylic render primer for masonry and concrete — confirm suitability for salt-contaminated substrates with Dulux technical before specifying",
    productType: "Acrylic render primer for masonry and concrete",
    filterTags: ["Acrylic-primer", "Bonding-primer", "Masonry", "Concrete"],
    techChips: [
      { label: "Acrylic primer", cls: "bg-sky-100 text-sky-800" },
      { label: "Masonry and concrete", cls: "bg-slate-100 text-slate-700" },
      { label: "Widely available", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Dulux Professional (AcraTex) supplies acrylic primer systems for masonry and concrete substrates prior to render application. TODO: owner confirm — confirm the current Dulux/AcraTex product recommended as primer for salt-affected substrates before renovating render application. Standard acrylic primers may be less tolerant of highly salt-contaminated substrates than cementitious bonding slurry — confirm with Dulux technical whether an acrylic primer is appropriate or whether a cementitious bonding slurry is recommended for the specific substrate salt contamination level.",
    technicalProperties: [
      "Acrylic primer for masonry and concrete",
      "Applied by brush or roller",
      "Confirm suitability for salt-contaminated substrates with Dulux technical",
      "Widely available nationally",
    ],
    limitations: [
      "TODO: owner confirm — standard acrylic primers may be less tolerant of salt-contaminated substrates than cementitious slurry systems",
      "Confirm suitability for salt-affected facade substrates with Dulux technical before specifying",
      "Not all acrylic primers are equal in salt tolerance — confirm specific product recommendation",
    ],
    procurementSources: [
      { name: "Dulux / AcraTex — trade supply nationally", url: "https://www.duluxpro.com.au" },
      { name: "Bunnings — in-store", url: "https://www.bunnings.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Cementitious-slurry", label: "Cementitious slurry" },
  { id: "Epoxy-primer", label: "Epoxy primer" },
  { id: "Acrylic-primer", label: "Acrylic primer" },
  { id: "Bonding-primer", label: "Bonding primer" },
  { id: "Salt-resistant", label: "Salt-resistant" },
  { id: "Masonry", label: "Masonry" },
  { id: "Concrete", label: "Concrete" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  type: string;
  saltTolerance: string;
  application: string;
  renderCompatibility: string;
  primaryUse: string;
}[] = [
  {
    product: "SikaCem Bonding Slurry",
    brand: "Sika Australia",
    type: "Cementitious slurry",
    saltTolerance: "High — cementitious chemistry compatible with salt-contaminated substrates",
    application: "Brush — apply render at green set",
    renderCompatibility: "Sika render systems — confirm specific compatibility",
    primaryUse: "Primer coat on salt-contaminated masonry and concrete before renovating render",
  },
  {
    product: "Fosroc Nitobond EP",
    brand: "Fosroc / Parchem",
    type: "Two-component epoxy",
    saltTolerance: "High — epoxy bonds to dense and contaminated substrates",
    application: "Brush or roller — apply render while tacky",
    renderCompatibility: "PM cementitious systems — confirm with Parchem",
    primaryUse: "Adhesion improvement on dense or smooth salt-contaminated substrates",
  },
  {
    product: "Dulux Professional Render Primer",
    brand: "Dulux / AcraTex",
    type: "Acrylic primer",
    saltTolerance: "Confirm with Dulux technical for salt-contaminated substrates",
    application: "Brush or roller",
    renderCompatibility: "Dulux / AcraTex render systems — confirm",
    primaryUse: "General render primer — confirm suitability for salt-affected substrates with Dulux",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Primer coat on salt-contaminated masonry before renovating render",
    "Bonding layer on smooth or dense concrete before render repair",
    "Adhesion improvement on substrates where salt contamination has reduced surface absorbency",
  ],
  selectionCriteria: [
    "Cementitious slurry vs acrylic primer — cementitious slurry is generally more compatible with salt-contaminated substrates",
    "System compatibility — confirm primer is specified by the render manufacturer as part of their system",
    "Application window — epoxy and cementitious slurry must be applied at the correct stage",
    "Confirm suitability for the specific substrate contamination level with manufacturer",
  ],
  limitations: [
    "All products are TODO: owner confirm",
    "Do not use standard acrylic primer on highly salt-contaminated substrates without confirming tolerance with manufacturer",
    "Primer is one step in a system — substrate treatment and render selection must also be correct",
  ],
  standardsNotes: [
    "Manufacturer system guides — primer selection must be confirmed as part of the render manufacturer's specified system",
    "AS 3700 — Masonry Structures",
  ],
  suitableDefects: [
    "Salt attack on masonry and concrete facades — bonding primer step in the renovating render system",
    "Salt-contaminated substrates where adhesion of new render is at risk without priming",
  ],
  typicalSubstrates: [
    "Masonry contaminated with soluble salts — chloride or sulfate",
    "Concrete with surface contamination from salt ingress",
    "Substrates previously treated with salt-retardant substrate treatment",
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

export function SalinePrimerIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are saline-resistant primers and slurries?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Saline-resistant primers and bonding slurries are products applied to salt-contaminated concrete and masonry substrates to improve the adhesion of the subsequent renovating render coat. On substrates with elevated soluble salt content, standard acrylic primers may be disrupted by salt crystallisation at the primer/substrate interface — saline-resistant systems use either cementitious bonding slurry chemistry (which is compatible with salt-contaminated substrates) or polymer primer formulations specifically tested for adhesion on salt-affected surfaces.
        </p>
        {expanded && (
          <p>
            The bonding slurry or primer is applied as a thin coat to the prepared, treated substrate before the first coat of renovating render or the base coat of the render system. System compatibility must be confirmed — the primer must be specified by the render manufacturer as part of their system for salt-affected substrates.
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — saline-resistant primer and slurry systems only — scroll to view all</p>
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
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Salt tolerance</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Application</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Render compatibility</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600">{row.saltTolerance}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.application}</td>
                  <td className="px-4 py-3 text-slate-600">{row.renderCompatibility}</td>
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
