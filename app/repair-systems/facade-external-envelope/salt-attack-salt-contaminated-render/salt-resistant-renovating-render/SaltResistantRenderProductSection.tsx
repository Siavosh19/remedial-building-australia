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
    fullLabel: "Remmers (Australia)",
    brandUrl: "https://www.remmers.com.au",
    accentColor: "#0369a1",
    name: "Remmers WTA Sanierputz",
    descriptionLine: "WTA-classified salt-resistant renovating render — minimum 25% pore volume — exterior masonry use on salt-affected substrates",
    productType: "WTA-classified salt-resistant renovating render",
    filterTags: ["WTA-classified", "Salt-resistant", "Renovating-render", "Exterior", "Masonry", "Coastal", "AS-3700"],
    techChips: [
      { label: "WTA-classified", cls: "bg-sky-100 text-sky-800" },
      { label: "Salt-resistant", cls: "bg-slate-100 text-slate-700" },
      { label: "Min. 25% pore volume", cls: "bg-green-50 text-green-700" },
      { label: "Exterior masonry", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: owner confirm AU name", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Remmers Sanierputz WTA is a WTA-classified salt-resistant renovating render from Remmers (Australia). Designed for masonry and concrete substrates contaminated with soluble salts — applied over cleaned and pre-treated substrate to provide a render body that accommodates salt crystallisation within the pore structure without surface disruption. Apply in a minimum 20mm single coat or two coats for thicker sections. Substrate must be pre-treated with compatible salt-retardant treatment (Remmers Silan or similar) before render application. Confirm primer and system sequence with Remmers Australia technical. Flag with TODO: owner confirm — confirm current Australian product name and availability with Remmers Australia.",
    technicalProperties: [
      "WTA-classified porous matrix render — minimum 25% pore volume — accommodates salt crystallisation in render body",
      "Exterior masonry use — concrete and masonry substrates contaminated with chloride or sulfate salts",
      "Minimum application thickness 20mm",
      "Pre-treatment with compatible substrate treatment required",
      "Confirm AS 3700 compliance with Remmers Australia",
    ],
    limitations: [
      "TODO: owner confirm — Remmers Sanierputz product name and AU specification",
      "Not suitable over active moisture intrusion without addressing water source",
      "Minimum coat thickness critical — thin application will fail under salt attack",
      "Not a waterproofing system — address rising damp or moisture ingress source before applying",
    ],
    procurementSources: [
      { name: "Remmers (Australia) — trade supply", url: "https://www.remmers.com.au" },
      { name: "Building trade suppliers — confirm local Remmers distributor", url: "https://www.remmers.com.au" },
    ],
  },
  {
    fullLabel: "Parex (Alumasc)",
    brandUrl: "https://www.parex.com.au",
    accentColor: "#7c2d12",
    name: "Parex Reveno Renovating Render",
    descriptionLine: "Salt-tolerant porous-matrix renovating render — facades subject to salt attack and efflorescence — Parex/Alumasc distribution",
    productType: "Salt-tolerant porous-matrix renovating render",
    filterTags: ["Salt-resistant", "Renovating-render", "Exterior", "Masonry", "Coastal"],
    techChips: [
      { label: "Salt-tolerant", cls: "bg-orange-100 text-orange-800" },
      { label: "Porous matrix", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior masonry", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Parex Reveno is Parex's salt-tolerant renovating render — a porous-matrix render formulated for facades subject to salt attack and efflorescence. The Parex range is distributed in Australia through Alumasc Building Products. Confirm current product name, WTA classification status, and Australian availability with Parex/Alumasc technical before specifying. TODO: owner confirm — Parex Reveno product specification, WTA classification, and availability in Australia.",
    technicalProperties: [
      "Porous-matrix render for salt-affected facades",
      "Exterior masonry use",
      "Apply over salt-retardant substrate treatment",
      "Confirm minimum thickness and inter-coat timing with Parex technical",
    ],
    limitations: [
      "TODO: owner confirm — Parex Reveno product name, specification and WTA classification status in Australia",
      "Confirm current Parex/Alumasc distribution nationally",
      "Not a substitute for standard PM render on non-salt-affected substrates",
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
      "Rockcote (Saint-Gobain Weber) supplies salt-resistant and renovating render systems for salt-affected facades. Confirm the current specific product name in the Rockcote/Weber range for salt-resistant renovating render application with Saint-Gobain Weber Australia technical. TODO: owner confirm — exact Rockcote or Weber product name and specification for salt-resistant renovating render applications. The Rockcote range includes render products for coastal and salt-affected environments — confirm current catalogue and system guide from Rockcote/Saint-Gobain Weber before specifying.",
    technicalProperties: [
      "Salt-resistant render for exterior masonry facades",
      "Suitable for coastal and salt-affected environments",
      "Pre-bagged — mixed with clean water",
      "Confirm WTA classification, pore volume, and system sequence with Rockcote technical",
    ],
    limitations: [
      "TODO: owner confirm — exact Rockcote/Weber product name for salt-resistant renovating render",
      "Confirm WTA classification status with Saint-Gobain Weber Australia",
      "Apply only after proper substrate preparation and salt-retardant treatment",
    ],
    procurementSources: [
      { name: "Rockcote / Saint-Gobain Weber — trade supply nationally", url: "https://www.rockcote.com.au" },
      { name: "Saint-Gobain Weber Australia", url: "https://www.rockcote.com.au" },
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
    product: "Remmers WTA Sanierputz",
    brand: "Remmers",
    wtaClass: "WTA-classified — confirm with Remmers AU",
    poreVolume: "Min. 25% — confirm from TDS",
    minThickness: "20mm — confirm with Remmers",
    substratePrep: "Salt-retardant treatment + primer required",
    primaryUse: "Salt-affected masonry and concrete facades — chloride / sulfate contamination",
  },
  {
    product: "Parex Reveno",
    brand: "Parex / Alumasc",
    wtaClass: "TODO: confirm WTA status with Parex AU",
    poreVolume: "Confirm from TDS with Parex AU",
    minThickness: "Confirm with Parex technical",
    substratePrep: "Apply over salt-retardant treatment",
    primaryUse: "Salt-affected facades with efflorescence and recurring render failure",
  },
  {
    product: "Rockcote Salt Renovating Render",
    brand: "Rockcote / Saint-Gobain Weber",
    wtaClass: "TODO: confirm WTA status with Weber AU",
    poreVolume: "Confirm from TDS with Weber AU",
    minThickness: "Confirm with Rockcote technical",
    substratePrep: "Apply after substrate preparation and treatment",
    primaryUse: "Coastal and salt-affected exterior masonry facades",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Facades with active efflorescence and recurring render failure from salt attack",
    "Coastal masonry facades with chloride contamination",
    "Walls subject to rising damp and salt migration (after DPC treatment)",
    "Heritage masonry facades with soluble salt contamination",
    "Strata buildings in coastal exposure zones where standard render has failed repeatedly",
  ],
  selectionCriteria: [
    "WTA classification and pore volume — confirm minimum 25% pore volume for WTA compliance",
    "Substrate treatment sequence — salt-retardant treatment must be applied before renovating render",
    "Minimum render thickness — confirm minimum 20mm application thickness",
    "Moisture source — identify and treat rising damp or moisture ingress source before applying renovating render",
    "Primer requirement — confirm with manufacturer",
    "Coastal exposure rating — confirm product suitability for marine or industrial salt exposure",
  ],
  limitations: [
    "Not suitable over active moisture ingress without treating the source",
    "Not a waterproofing system — renovating render must be combined with waterproofing works where moisture intrusion is ongoing",
    "Minimum thickness critical — thin application will fail",
    "Do not apply standard PM render as a substitute for WTA-classified renovating render on salt-affected substrates",
    "All products flagged TODO: owner confirm — verify with manufacturer before specifying",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures",
    "WTA Merkblatt 2-9-04/D — German/European standard for renovating render systems, widely referenced in Australia for salt attack render specification",
    "NCC Volume One — performance requirements for facade cladding in Class 2 buildings",
    "Manufacturer system guides — critical for substrate treatment sequence, primer, and inter-coat timing",
  ],
  suitableDefects: [
    "Salt attack and efflorescence — render delamination, map cracking, and surface disruption caused by soluble salt crystallisation",
    "Recurring render failure on coastal facades — where standard render has been replaced multiple times and continues to fail",
    "Post-rising-damp remediation — re-rendering after DPC injection works on masonry facades",
  ],
  typicalSubstrates: [
    "Masonry — brick and block contaminated with chloride or sulfate salts",
    "Concrete — external concrete facades with chloride contamination",
    "Existing render (where fully removed) — must clean back to substrate and treat before re-rendering",
    "Heritage masonry — lime mortar joints and soft brick — confirm compatibility with lime-based renovating render system",
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

export function SaltResistantRenderIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are salt-resistant renovating renders?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Salt-resistant renovating renders (also called sanierputz or renovating plasters) are polymer-modified, porous-matrix cementitious render systems specifically formulated for masonry and concrete substrates contaminated with soluble salts. Unlike standard sand-cement or polymer-modified renders, renovating renders are engineered with a controlled pore structure and low soluble-salt content that allows crystallising salts to migrate into the render body without causing surface disruption, efflorescence, or delamination.
        </p>
        {expanded && (
          <p>
            They are classified under the European WTA standard for renovating render systems and are widely used in Australian coastal strata remediation where salt attack from chloride or sulfate ingress has caused repeated failure of standard render systems. Product selection must confirm the WTA classification, pore volume (minimum 25% by volume), sd value, and compatibility with the substrate treatment system applied before rendering.
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — salt-resistant renovating render systems only — scroll to view all</p>
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
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">WTA class</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Pore volume</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Min. thickness</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Substrate prep</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.wtaClass}</td>
                  <td className="px-4 py-3 text-slate-600">{row.poreVolume}</td>
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
