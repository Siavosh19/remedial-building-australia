"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Acrylic"
  | "Spray-applied"
  | "Machine-applied"
  | "Exterior"
  | "AAC"
  | "Masonry"
  | "Lightweight"
  | "Pre-bagged"
  | "Two-coat"
  | "AS-3700"
  | "Coastal";

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
    fullLabel: "Rockcote / Saint-Gobain Weber",
    brandUrl: "https://www.rockcote.com.au",
    tdsUrl: "https://www.rockcote.com.au",
    accentColor: "#b45309",
    name: "Rockcote Machine Render + Rockcote Finessa",
    descriptionLine:
      "Machine spray-applied render — Rockcote Machine Render (acrylic/cement, spray-applied base coat) + Rockcote Finessa fine finish coat — exterior AAC and masonry facades",
    productType: "Acrylic/cement spray-applied render — exterior facade",
    filterTags: ["Acrylic", "Spray-applied", "Machine-applied", "Exterior", "AAC", "Masonry", "Pre-bagged", "Two-coat", "AS-3700"],
    techChips: [
      { label: "Machine spray", cls: "bg-amber-100 text-amber-800" },
      { label: "Acrylic/cement", cls: "bg-slate-100 text-slate-700" },
      { label: "AAC and masonry", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Rockcote's machine spray render system uses a pre-bagged acrylic/cement render applied by machine spray as the base coat. The finish coat (Finessa Fine Render) is applied by trowel or float to produce a smooth surface for coating. Machine spray application is suitable for large facade areas where spray equipment is available. Confirm product selection, equipment requirements, mix consistency, and application specifications with Rockcote/Saint-Gobain Weber technical before specifying. TODO: owner confirm — confirm specific Rockcote machine render product and TDS with Saint-Gobain Weber Australia.",
    technicalProperties: [
      "Machine spray base coat — pre-bagged acrylic/cement render",
      "Suitable over AAC, masonry, and concrete substrates",
      "Large area spray application",
      "Finessa fine finish coat applied after base coat",
      "Confirm mix consistency, pump pressure, and nozzle specification with Rockcote",
      "Confirm primer requirements for AAC and smooth substrates",
    ],
    limitations: [
      "Requires spray equipment — not suitable for hand application",
      "Confirm machine compatibility with Rockcote technical",
      "TODO: owner confirm — Rockcote machine render product, TDS, and current availability",
      "Overspray control required — adjacent surfaces must be protected",
    ],
    procurementSources: [
      { name: "Rockcote / Saint-Gobain Weber", url: "https://www.rockcote.com.au" },
      { name: "Saint-Gobain Weber trade distribution nationally", url: "https://www.rockcote.com.au" },
    ],
  },
  {
    fullLabel: "Boral / USG Boral",
    brandUrl: "https://www.boral.com.au",
    tdsUrl: "https://www.boral.com.au",
    accentColor: "#92400e",
    name: "Boral Acrylic Render System",
    descriptionLine:
      "Acrylic spray-applied or hand-applied render — Boral acrylic/cement render system — exterior AAC and masonry facades",
    productType: "Acrylic/cement render — spray or hand applied — exterior facade",
    filterTags: ["Acrylic", "Spray-applied", "Exterior", "AAC", "Masonry", "Pre-bagged", "AS-3700"],
    techChips: [
      { label: "Acrylic/cement", cls: "bg-amber-100 text-amber-800" },
      { label: "AAC and masonry", cls: "bg-slate-100 text-slate-700" },
      { label: "Spray or hand apply", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Boral produces acrylic render systems for exterior facade use on AAC and masonry substrates. Confirm the specific Boral product for acrylic spray-applied render with Boral technical — the Boral range includes render systems suitable for machine spray and hand application. TODO: owner confirm — confirm specific Boral acrylic render product, application method, and TDS with Boral Australia technical.",
    technicalProperties: [
      "Pre-bagged acrylic/cement render",
      "Suitable for exterior AAC and masonry",
      "Spray or hand apply (confirm method with Boral)",
      "Confirm primer and substrate preparation requirements",
      "Confirm DFT, inter-coat timing, and finish coat compatibility",
    ],
    limitations: [
      "TODO: owner confirm — specific Boral acrylic render product, TDS and current availability",
      "Confirm machine spray suitability and equipment requirements",
    ],
    procurementSources: [
      { name: "Boral Australia", url: "https://www.boral.com.au" },
      { name: "Boral distribution — builders merchants nationally", url: "https://www.boral.com.au" },
    ],
  },
  {
    fullLabel: "Weber / Saint-Gobain",
    brandUrl: "https://www.rockcote.com.au",
    tdsUrl: "https://www.rockcote.com.au",
    accentColor: "#0f766e",
    name: "Weber Render Systems (Spray-Applied)",
    descriptionLine:
      "Weber machine spray render — pre-bagged acrylic/cement render system for machine spray application — exterior masonry and AAC facades — Saint-Gobain Weber Australia",
    productType: "Weber machine spray acrylic/cement render — exterior facade",
    filterTags: ["Acrylic", "Spray-applied", "Machine-applied", "Exterior", "AAC", "Masonry", "Pre-bagged", "AS-3700"],
    techChips: [
      { label: "Weber spray render", cls: "bg-teal-100 text-teal-800" },
      { label: "Machine spray", cls: "bg-slate-100 text-slate-700" },
      { label: "AAC and masonry", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Saint-Gobain Weber Australia (trading as Rockcote/Weber) supplies machine spray render systems for facade application. Confirm the specific Weber product for spray-applied acrylic/cement render with Saint-Gobain Weber technical. TODO: owner confirm — Weber spray render product, TDS, and current range with Saint-Gobain Weber Australia technical before specifying.",
    technicalProperties: [
      "Pre-bagged acrylic/cement — machine spray",
      "Suitable for exterior masonry and AAC",
      "Confirm substrate preparation, primer, and inter-coat timing with Weber technical",
      "Available through Saint-Gobain Weber trade distribution nationally",
    ],
    limitations: [
      "TODO: owner confirm — Weber spray render product, current availability, and TDS",
      "Requires spray equipment — confirm machine type and mix consistency with Weber technical",
    ],
    procurementSources: [
      { name: "Saint-Gobain Weber / Rockcote Australia", url: "https://www.rockcote.com.au" },
      { name: "Trade distribution nationally", url: "https://www.rockcote.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Acrylic", label: "Acrylic" },
  { id: "Spray-applied", label: "Spray-applied" },
  { id: "Machine-applied", label: "Machine-applied" },
  { id: "Exterior", label: "Exterior" },
  { id: "AAC", label: "AAC" },
  { id: "Masonry", label: "Masonry" },
  { id: "Lightweight", label: "Lightweight" },
  { id: "Pre-bagged", label: "Pre-bagged" },
  { id: "Two-coat", label: "Two-coat" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "Coastal", label: "Coastal rated" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  applicationMethod: string;
  suitableSubstrate: string;
  finishCoat: string;
  coastal: string;
  primaryUse: string;
}[] = [
  {
    product: "Rockcote Machine Render + Finessa",
    brand: "Rockcote / Saint-Gobain Weber",
    applicationMethod: "Machine spray (base) + trowel (finish)",
    suitableSubstrate: "AAC, masonry, concrete",
    finishCoat: "Rockcote Finessa",
    coastal: "Confirm with Rockcote technical",
    primaryUse: "Large facade re-render on AAC and masonry",
  },
  {
    product: "Boral Acrylic Render System",
    brand: "Boral / USG Boral",
    applicationMethod: "Spray or hand apply (confirm with Boral)",
    suitableSubstrate: "AAC and masonry",
    finishCoat: "Confirm with Boral technical",
    coastal: "Confirm with Boral technical",
    primaryUse: "Exterior AAC and masonry facade render",
  },
  {
    product: "Weber Spray Render",
    brand: "Weber / Saint-Gobain",
    applicationMethod: "Machine spray",
    suitableSubstrate: "Masonry and AAC",
    finishCoat: "Confirm with Weber technical",
    coastal: "Confirm with Weber technical",
    primaryUse: "Commercial facade machine spray render on masonry and AAC",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Large facade re-render on AAC (autoclaved aerated concrete) lightweight construction buildings",
    "Machine spray render for high-rise external facade works where hand application is impractical",
    "Base coat application over masonry and concrete facades before fine finish render coat",
    "Commercial building facade renovation works using machine spray equipment",
  ],
  selectionCriteria: [
    "Machine equipment — confirm spray equipment type, pump capacity, and nozzle specification with manufacturer",
    "Substrate — confirm product suitability for AAC, masonry, or concrete",
    "Primer — AAC typically requires a specific primer before spray render — confirm with manufacturer",
    "Inter-coat timing — confirm from TDS",
    "Overspray management — adjacent surfaces and windows must be masked",
  ],
  limitations: [
    "Not suitable for hand application — spray equipment required",
    "Overspray risk — adjacent areas must be protected",
    "Not a structural repair system — substrate must be sound before applying spray render",
    "Confirm workability window — machine-mixed render must be applied promptly",
    "Do not thin with excess water",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures",
    "NCC Volume One — facade performance",
    "Manufacturer TDS — spray pressure, mix consistency, primer, inter-coat timing",
  ],
  suitableDefects: [
    "Full render removal and replacement on large AAC facade panels",
    "Render reinstallation on lightweight construction buildings",
    "Commercial facade resurfacing where machine spray application is specified",
  ],
  typicalSubstrates: [
    "AAC — autoclaved aerated concrete lightweight block",
    "Masonry — brick and concrete block",
    "Concrete — external concrete facade panels (confirm primer requirement)",
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

export function AcrylicSprayRenderIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are acrylic spray-applied render systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Acrylic spray-applied renders are pre-bagged factory-blended cement and acrylic polymer mixes designed for machine spray application over exterior facade substrates. Unlike trowel-applied polymer-modified renders, spray-applied systems are typically formulated with a specific consistency and acrylic content suited to pump delivery and spray application over large facade areas.
        </p>
        {expanded && (
          <p>
            They are most commonly used on AAC (autoclaved aerated concrete) lightweight block construction and masonry facades where large area coverage and consistent render thickness are required. Machine spray application offers significant productivity advantages over hand trowelling on high-rise and large commercial facades. Spray-applied render systems require compatible spray equipment, correct mix consistency, and appropriate substrate preparation including priming — confirm all requirements with the manufacturer TDS before specifying.
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

export function AcrylicSprayRenderProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — acrylic spray-applied render systems — scroll to view all</p>
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
              Side-by-side comparison of acrylic spray-applied render systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Application method</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Suitable substrate</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Finish coat</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coastal</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.applicationMethod}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.suitableSubstrate}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.finishCoat}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coastal}</td>
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
