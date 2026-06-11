"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "WTA-classified"
  | "Salt-resistant"
  | "Renovating-render"
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
    fullLabel: "Remmers Australia",
    brandUrl: "https://www.remmers.com.au",
    accentColor: "#0369a1",
    name: "Remmers WTA Sanierputz SP",
    descriptionLine: "WTA-classified salt-resistant renovating render — exterior masonry facades with salt contamination — chloride and sulfate attack — Remmers Australia",
    productType: "WTA-classified salt-resistant renovating render — exterior masonry",
    filterTags: ["WTA-classified", "Salt-resistant", "Renovating-render", "Exterior", "Masonry", "Coastal", "AS-3700"],
    techChips: [
      { label: "WTA-classified", cls: "bg-sky-100 text-sky-800" },
      { label: "Porous matrix", cls: "bg-slate-100 text-slate-700" },
      { label: "Coastal / salt-affected", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Remmers WTA Sanierputz SP is a WTA-classified salt-resistant renovating render (sanierputz) for exterior masonry and concrete facades subject to salt attack from chloride and sulfate contamination. It is formulated with a controlled pore structure that allows crystallising salts to migrate into the render body without causing surface disruption, efflorescence, or delamination. Confirm pore volume, WTA classification status in Australia, minimum thickness, and application sequence with Remmers Australia technical before specifying. TODO: owner confirm — Remmers WTA Sanierputz SP, pore volume, WTA classification and availability in Australia.",
    technicalProperties: [
      "WTA-classified salt-resistant renovating render",
      "Porous matrix — allows salt crystallisation within render pores",
      "Minimum 20mm application thickness (confirm from TDS)",
      "Apply over salt-retardant substrate treatment — confirm sequence with Remmers",
      "Exterior masonry and concrete substrates",
      "Confirm pore volume (minimum 25% by volume — WTA requirement) with Remmers Australia",
    ],
    limitations: [
      "Not suitable over active moisture ingress — treat moisture source first",
      "Minimum thickness critical — thin application fails",
      "Not a standard PM render substitute on non-salt-affected substrates",
      "TODO: owner confirm — Remmers WTA Sanierputz specification, pore volume and WTA status in Australia",
      "Confirm primer requirement with Remmers Australia",
    ],
    procurementSources: [
      { name: "Remmers Australia — trade supply", url: "https://www.remmers.com.au" },
      { name: "Confirm local Remmers distributor with Remmers Australia", url: "https://www.remmers.com.au" },
    ],
  },
  {
    fullLabel: "Parex (Alumasc)",
    brandUrl: "https://www.parex.com.au",
    accentColor: "#7c2d12",
    name: "Parex Reveno Renovating Render",
    descriptionLine: "Salt-tolerant porous-matrix renovating render — facades subject to salt attack and efflorescence — Parex/Alumasc distribution Australia",
    productType: "Salt-tolerant porous-matrix renovating render — exterior masonry",
    filterTags: ["Salt-resistant", "Renovating-render", "Exterior", "Masonry", "Coastal"],
    techChips: [
      { label: "Salt-tolerant", cls: "bg-orange-100 text-orange-800" },
      { label: "Porous matrix", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior masonry", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Parex Reveno is a porous-matrix renovating render formulated for facades subject to salt attack and recurring efflorescence. The Parex range is distributed in Australia through Alumasc Building Products. Confirm current product name, WTA classification status, and Australian availability with Parex/Alumasc technical before specifying. TODO: owner confirm — Parex Reveno specification, WTA classification and Australian availability.",
    technicalProperties: [
      "Porous-matrix render for salt-affected facades",
      "Exterior masonry use",
      "Apply over salt-retardant substrate treatment",
      "Confirm minimum thickness and inter-coat timing with Parex technical",
    ],
    limitations: [
      "TODO: owner confirm — Parex Reveno product name, specification and WTA classification in Australia",
      "Confirm current Parex/Alumasc distribution nationally",
      "Not a standard PM render substitute",
    ],
    procurementSources: [
      { name: "Parex / Alumasc Building Products Australia", url: "https://www.parex.com.au" },
      { name: "Confirm local distributor with Parex Australia", url: "https://www.parex.com.au" },
    ],
  },
  {
    fullLabel: "Rockcote / Saint-Gobain Weber",
    brandUrl: "https://www.rockcote.com.au",
    accentColor: "#b45309",
    name: "Rockcote Salt Renovation Render",
    descriptionLine: "Salt-resistant renovating render — exterior facade — coastal and salt-affected environments — Saint-Gobain Weber Australia",
    productType: "Salt-resistant renovating render — exterior facade",
    filterTags: ["Salt-resistant", "Renovating-render", "Exterior", "Masonry", "Coastal", "AS-3700"],
    techChips: [
      { label: "Salt-resistant", cls: "bg-amber-100 text-amber-800" },
      { label: "Exterior masonry", cls: "bg-slate-100 text-slate-700" },
      { label: "Coastal environments", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Rockcote (Saint-Gobain Weber) supplies salt-resistant renovating render systems for salt-affected facades. Confirm the current specific product name in the Rockcote/Weber range for salt-resistant renovating render with Saint-Gobain Weber Australia. TODO: owner confirm — exact Rockcote or Weber product name and specification for salt-resistant renovating render applications.",
    technicalProperties: [
      "Salt-resistant render for exterior masonry",
      "Suitable for coastal environments",
      "Pre-bagged — mixed with clean water",
      "Confirm WTA classification, pore volume and system sequence with Rockcote technical",
    ],
    limitations: [
      "TODO: owner confirm — exact Rockcote/Weber product for salt-resistant renovating render",
      "Confirm WTA status with Saint-Gobain Weber Australia",
      "Apply after substrate treatment",
    ],
    procurementSources: [
      { name: "Rockcote / Saint-Gobain Weber — trade supply nationally", url: "https://www.rockcote.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "WTA-classified", label: "WTA-classified" },
  { id: "Salt-resistant", label: "Salt-resistant" },
  { id: "Renovating-render", label: "Renovating render" },
  { id: "Exterior", label: "Exterior" },
  { id: "Masonry", label: "Masonry" },
  { id: "Coastal", label: "Coastal" },
  { id: "AS-3700", label: "AS 3700" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  wtaClass: string;
  poreVolume: string;
  minThickness: string;
  substratePrep: string;
  primaryUse: string;
}[] = [
  {
    product: "Remmers WTA Sanierputz SP",
    brand: "Remmers Australia",
    wtaClass: "WTA-classified (confirm AU status)",
    poreVolume: "Min 25% by volume (confirm TDS)",
    minThickness: "Min 20mm (confirm TDS)",
    substratePrep: "Salt-retardant treatment + Remmers primer",
    primaryUse: "Salt-attacked exterior masonry and concrete facades",
  },
  {
    product: "Parex Reveno Renovating Render",
    brand: "Parex / Alumasc",
    wtaClass: "TODO: confirm WTA status",
    poreVolume: "Confirm with Parex/Alumasc",
    minThickness: "Confirm with Parex TDS",
    substratePrep: "Salt-retardant substrate treatment",
    primaryUse: "Salt-affected facade re-render — coastal masonry",
  },
  {
    product: "Rockcote Salt Renovation Render",
    brand: "Rockcote / Saint-Gobain Weber",
    wtaClass: "TODO: confirm WTA status",
    poreVolume: "Confirm with Rockcote TDS",
    minThickness: "Confirm with Rockcote TDS",
    substratePrep: "Substrate treatment — confirm with Rockcote",
    primaryUse: "Coastal and salt-affected facade re-render",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Facades with active efflorescence and recurring render failure from salt attack",
    "Coastal masonry facades with chloride contamination",
    "Walls subject to rising damp and salt migration (after DPC treatment)",
    "Heritage masonry with soluble salt contamination",
    "Strata buildings in coastal exposure zones where standard render has failed repeatedly",
  ],
  selectionCriteria: [
    "WTA classification and pore volume — confirm minimum 25% pore volume",
    "Substrate treatment sequence — salt-retardant treatment before render",
    "Minimum render thickness — confirm minimum 20mm",
    "Moisture source — identify and treat before applying",
    "Primer requirement — confirm with manufacturer",
  ],
  limitations: [
    "Not suitable over active moisture ingress without treating the source",
    "Not a waterproofing system — must be combined with waterproofing where moisture intrusion ongoing",
    "Minimum thickness critical",
    "Do not substitute standard PM render on salt-affected substrates",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures",
    "WTA Merkblatt 2-9-04/D — European standard for renovating render widely referenced in Australia",
    "NCC Volume One",
    "Manufacturer system guides",
  ],
  suitableDefects: [
    "Salt attack and efflorescence — render delamination from soluble salt crystallisation",
    "Recurring render failure on coastal facades",
    "Post-rising-damp remediation re-rendering",
  ],
  typicalSubstrates: [
    "Masonry — brick and block contaminated with chloride or sulfate",
    "Concrete — external facades with chloride contamination",
    "Heritage masonry — confirm lime-based system compatibility",
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

export function SaltResistantRenderIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are salt-resistant renovating render systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Salt-resistant renovating renders (also called sanierputz or renovating plasters) are polymer-modified, porous-matrix cementitious render systems specifically formulated for masonry and concrete substrates contaminated with soluble salts.
        </p>
        {expanded && (
          <>
            <p>
              They are classified under the WTA standard for renovating render and are widely used in Australian coastal strata remediation where repeated failure of standard render has occurred due to chloride or sulfate ingress. Product selection must confirm WTA classification, pore volume (minimum 25% by volume), and compatibility with the substrate treatment system.
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

export function SaltResistantRenderProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — salt-resistant renovating render systems — scroll to view all</p>
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
              Side-by-side comparison of salt-resistant renovating render systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">WTA class</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Pore volume</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Min thickness</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Substrate prep</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.wtaClass}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.poreVolume}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.minThickness}</td>
                  <td className="px-4 py-3 text-slate-600">{row.substratePrep}</td>
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
