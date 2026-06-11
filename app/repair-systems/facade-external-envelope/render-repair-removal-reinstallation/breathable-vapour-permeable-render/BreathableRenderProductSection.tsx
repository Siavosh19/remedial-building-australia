"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Breathable"
  | "Vapour-permeable"
  | "WTA-classified"
  | "Low-sd"
  | "Exterior"
  | "Masonry"
  | "Coastal"
  | "Heritage"
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
    fullLabel: "Remmers Australia",
    brandUrl: "https://www.remmers.com.au",
    accentColor: "#0369a1",
    name: "Remmers Feinputz SP (Breathable Finish Render)",
    descriptionLine: "Vapour-permeable fine finish render — sd value <0.14m — exterior masonry facades requiring moisture vapour release — Remmers Australia",
    productType: "Vapour-permeable fine finish render — low sd value — exterior masonry",
    filterTags: ["Breathable", "Vapour-permeable", "WTA-classified", "Low-sd", "Exterior", "Masonry", "Coastal", "AS-3700"],
    techChips: [
      { label: "Low sd value", cls: "bg-sky-100 text-sky-800" },
      { label: "Vapour-permeable", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior masonry", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Remmers Feinputz SP is a vapour-permeable fine finish render with a low sd value (sd <0.14m — confirm from TDS) and high pore volume (>35% — confirm from TDS) designed for exterior masonry facades where moisture vapour release is required. It is used as the finish render in breathable render systems on salt-affected and heritage facades where trapping moisture vapour behind the render surface would cause delamination or damage. Confirm sd value, pore volume, WTA classification, and full system specification with Remmers Australia technical. TODO: owner confirm — Remmers Feinputz SP sd value, pore volume, WTA status and Australian availability.",
    technicalProperties: [
      "Vapour-permeable finish render — low sd value (confirm <0.14m from TDS)",
      "High pore volume (confirm >35% from TDS)",
      "Suitable for exterior masonry where moisture vapour release is required",
      "Apply over compatible Remmers base coat and substrate treatment",
      "Confirm system sequence — primer, base coat, finish coat — with Remmers Australia",
    ],
    limitations: [
      "Not a waterproofing system — breathable renders allow vapour transmission",
      "Not suitable where moisture ingress source has not been treated",
      "TODO: owner confirm — Remmers Feinputz SP specification, sd value, pore volume and WTA status in Australia",
      "Confirm primer and base coat compatibility",
    ],
    procurementSources: [
      { name: "Remmers Australia", url: "https://www.remmers.com.au" },
      { name: "Confirm local Remmers distributor", url: "https://www.remmers.com.au" },
    ],
  },
  {
    fullLabel: "Parex (Alumasc)",
    brandUrl: "https://www.parex.com.au",
    accentColor: "#7c2d12",
    name: "Parex Breathable Render System",
    descriptionLine: "Breathable vapour-permeable render — exterior masonry facades where low sd value is required — Parex/Alumasc distribution Australia",
    productType: "Breathable vapour-permeable render — exterior masonry",
    filterTags: ["Breathable", "Vapour-permeable", "Exterior", "Masonry", "Heritage", "AS-3700"],
    techChips: [
      { label: "Breathable", cls: "bg-orange-100 text-orange-800" },
      { label: "Low sd value", cls: "bg-slate-100 text-slate-700" },
      { label: "Heritage compatible", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Parex (distributed in Australia by Alumasc Building Products) supplies breathable render systems for exterior masonry facades. Confirm the specific Parex product for breathable vapour-permeable render application with Parex/Alumasc technical — the Parex range includes renders with varying sd values and pore volumes. TODO: owner confirm — specific Parex product for breathable vapour-permeable render, sd value, pore volume and Australian availability.",
    technicalProperties: [
      "Vapour-permeable render — confirm sd value from TDS with Parex/Alumasc",
      "Exterior masonry facades",
      "Apply over compatible primer and base coat — confirm with Parex",
      "Confirm system sequence and inter-coat timing",
    ],
    limitations: [
      "TODO: owner confirm — specific Parex breathable render product, sd value and Australian availability",
      "Confirm current Parex/Alumasc distribution nationally",
    ],
    procurementSources: [
      { name: "Parex / Alumasc Building Products Australia", url: "https://www.parex.com.au" },
    ],
  },
  {
    fullLabel: "Rockcote / Saint-Gobain Weber",
    brandUrl: "https://www.rockcote.com.au",
    accentColor: "#b45309",
    name: "Rockcote Breathable Render System",
    descriptionLine: "Breathable vapour-permeable render — exterior masonry facades — Saint-Gobain Weber Australia",
    productType: "Breathable vapour-permeable render — exterior masonry facade",
    filterTags: ["Breathable", "Vapour-permeable", "Exterior", "Masonry", "Coastal", "Heritage", "AS-3700"],
    techChips: [
      { label: "Breathable", cls: "bg-amber-100 text-amber-800" },
      { label: "Vapour-permeable", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior masonry", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Rockcote / Saint-Gobain Weber supplies breathable render systems for exterior masonry facades where low sd value and vapour permeability are required. Confirm specific product in the Rockcote/Weber range for breathable vapour-permeable render with Saint-Gobain Weber technical. TODO: owner confirm — specific Rockcote/Weber breathable render product, sd value and TDS.",
    technicalProperties: [
      "Vapour-permeable render — confirm sd value from Rockcote TDS",
      "Exterior masonry facades",
      "Apply over compatible base coat",
      "Confirm system sequence with Rockcote technical",
    ],
    limitations: [
      "TODO: owner confirm — Rockcote breathable render product, sd value and current availability",
      "Confirm WTA classification with Saint-Gobain Weber Australia",
    ],
    procurementSources: [
      { name: "Rockcote / Saint-Gobain Weber", url: "https://www.rockcote.com.au" },
      { name: "Trade distribution nationally", url: "https://www.rockcote.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Breathable", label: "Breathable" },
  { id: "Vapour-permeable", label: "Vapour-permeable" },
  { id: "WTA-classified", label: "WTA-classified" },
  { id: "Low-sd", label: "Low sd value" },
  { id: "Exterior", label: "Exterior" },
  { id: "Masonry", label: "Masonry" },
  { id: "Coastal", label: "Coastal" },
  { id: "Heritage", label: "Heritage" },
  { id: "AS-3700", label: "AS 3700" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  sdValue: string;
  poreVolume: string;
  wtaClass: string;
  application: string;
  primaryUse: string;
}[] = [
  {
    product: "Remmers Feinputz SP",
    brand: "Remmers Australia",
    sdValue: "Confirm <0.14m from TDS",
    poreVolume: "Confirm >35% from TDS",
    wtaClass: "WTA-classified (confirm AU status)",
    application: "Over Remmers base coat and primer",
    primaryUse: "Breathable finish render on salt-affected and heritage facades",
  },
  {
    product: "Parex Breathable Render System",
    brand: "Parex / Alumasc",
    sdValue: "Confirm with Parex/Alumasc TDS",
    poreVolume: "Confirm with Parex TDS",
    wtaClass: "TODO: confirm with Parex/Alumasc",
    application: "Over compatible Parex primer and base coat",
    primaryUse: "Breathable render on exterior masonry and heritage facades",
  },
  {
    product: "Rockcote Breathable Render System",
    brand: "Rockcote / Saint-Gobain Weber",
    sdValue: "Confirm with Rockcote TDS",
    poreVolume: "Confirm with Rockcote TDS",
    wtaClass: "TODO: confirm with Rockcote",
    application: "Over compatible Rockcote base coat",
    primaryUse: "Breathable render on coastal and heritage exterior masonry",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Salt-affected exterior masonry facades where moisture vapour must be released through the render",
    "Heritage masonry facades — lime mortar joints require breathable render to avoid moisture trapping",
    "Post-salt-attack remediation where WTA render system is specified",
    "Facades with known condensation or vapour drive from interior to exterior",
  ],
  selectionCriteria: [
    "sd value — confirm sd value <0.14m from TDS for vapour-permeable classification",
    "Pore volume — confirm >35% by volume for WTA compliance",
    "System sequence — confirm primer, base coat, and finish coat compatibility",
    "Heritage context — confirm breathable render specification with conservation architect",
    "Substrate treatment — salt-retardant substrate treatment is typically required before breathable render on salt-affected facades",
  ],
  limitations: [
    "Not a waterproofing system — breathable renders allow moisture vapour transmission, they do not prevent liquid water ingress",
    "Must be combined with appropriate waterproofing at penetrations, sills, and exposed horizontal surfaces",
    "Do not apply standard elastomeric or low-permeability coatings over breathable render — this defeats the purpose of the system",
  ],
  standardsNotes: [
    "WTA Merkblatt 2-9-04/D — European standard referenced in Australia for breathable and renovating render systems",
    "AS 3700 — Masonry Structures",
    "NCC Volume One — facade weatherproofing performance",
    "Manufacturer TDS — sd value, pore volume, application guide",
  ],
  suitableDefects: [
    "Render blistering and delamination caused by trapped moisture vapour",
    "Salt attack combined with vapour drive from interior",
    "Heritage masonry facades where vapour-permeable render is required to maintain wall moisture balance",
  ],
  typicalSubstrates: [
    "Heritage masonry — brick with lime mortar joints",
    "Masonry — brick and block contaminated with soluble salts",
    "Concrete — external concrete facades where vapour permeability is required",
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

export function BreathableRenderIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are breathable vapour-permeable render systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Breathable vapour-permeable renders are cementitious render systems engineered with a high pore volume and low sd (vapour diffusion resistance) value that allows moisture vapour to migrate through the render body and escape from the facade surface without causing blistering, delamination, or efflorescence.
        </p>
        {expanded && (
          <>
            <p>
              They are distinct from standard polymer-modified renders, which have lower pore volumes and higher sd values that can trap moisture vapour behind the render surface. Breathable renders are classified under the WTA standard and are used in Australian facades where moisture vapour drive from the substrate or interior space would damage a standard render. They are not waterproofing systems and must be used with appropriate wet-area waterproofing at sills, penetrations, and exposed horizontal surfaces.
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — breathable vapour-permeable render systems — scroll to view all</p>
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
              Side-by-side comparison of breathable vapour-permeable render systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">sd value</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Pore volume</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">WTA class</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Application</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.sdValue}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.poreVolume}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.wtaClass}</td>
                  <td className="px-4 py-3 text-slate-600">{row.application}</td>
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
