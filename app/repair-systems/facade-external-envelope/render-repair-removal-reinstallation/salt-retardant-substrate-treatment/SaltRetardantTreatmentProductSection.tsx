"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Crystalline"
  | "Silicate"
  | "Penetrating"
  | "Salt-retardant"
  | "Substrate-treatment"
  | "Masonry"
  | "Concrete"
  | "Exterior"
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
    fullLabel: "Remmers Australia",
    brandUrl: "https://www.remmers.com.au",
    accentColor: "#0369a1",
    name: "Remmers Silikat-Imprägnierung SP (Silicate Impregnation)",
    descriptionLine: "Penetrating silicate salt-retardant treatment — reduces capillary salt migration in masonry and concrete before re-rendering — Remmers Australia",
    productType: "Penetrating silicate salt-retardant substrate treatment",
    filterTags: ["Silicate", "Crystalline", "Penetrating", "Salt-retardant", "Substrate-treatment", "Masonry", "Concrete", "Exterior", "Coastal"],
    techChips: [
      { label: "Silicate treatment", cls: "bg-sky-100 text-sky-800" },
      { label: "Crystalline forming", cls: "bg-slate-100 text-slate-700" },
      { label: "Salt-retardant", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Remmers silicate impregnation is a penetrating crystalline-forming silicate treatment applied to salt-contaminated masonry and concrete substrates before application of WTA renovating render. It reacts with the substrate to form calcium silicate hydrate crystals within the pore structure, reducing capillary migration of soluble salts toward the render surface. Confirm product name, application method, coverage rate, and compatibility with Remmers renovating render system with Remmers Australia. TODO: owner confirm — Remmers silicate product specification, application and WTA system guide.",
    technicalProperties: [
      "Penetrating silicate treatment — reacts within substrate pore structure",
      "Reduces capillary salt migration before re-rendering",
      "Apply to clean and dampened substrate before WTA render",
      "Confirm coverage rate, dilution, and number of applications from Remmers TDS",
      "Part of the Remmers WTA renovation system — confirm compatibility",
    ],
    limitations: [
      "Not a stand-alone waterproofing system",
      "Does not eliminate moisture source — treat damp and rising moisture before applying",
      "TODO: owner confirm — Remmers silicate product name, TDS and availability",
      "Confirm application sequence in Remmers WTA system guide",
    ],
    procurementSources: [
      { name: "Remmers Australia", url: "https://www.remmers.com.au" },
      { name: "Confirm local Remmers distributor", url: "https://www.remmers.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#0369a1",
    name: "Mapei Antipluviol S (Silane/Siloxane Impregnation)",
    descriptionLine: "Silane/siloxane water-repellent impregnation — reduces water and salt absorption in masonry and concrete substrates before render — Mapei Australia",
    productType: "Silane/siloxane water-repellent impregnation — substrate pre-treatment",
    filterTags: ["Penetrating", "Salt-retardant", "Substrate-treatment", "Masonry", "Concrete", "Exterior", "Coastal"],
    techChips: [
      { label: "Silane/siloxane", cls: "bg-sky-100 text-sky-800" },
      { label: "Water-repellent impregnation", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior masonry", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Mapei Antipluviol S (or current equivalent) is a silane/siloxane penetrating water-repellent impregnation that reduces water and dissolved salt absorption into masonry and concrete substrates. Applied to the substrate before render, it reduces capillary water uptake and limits the migration of dissolved salts into the render body. Confirm product name, dilution, coverage rate, and compatibility with the render system with Mapei Australia. TODO: owner confirm — Mapei silane/siloxane substrate treatment product, specification and application sequence.",
    technicalProperties: [
      "Silane/siloxane penetrating water-repellent impregnation",
      "Reduces capillary water and salt absorption",
      "Exterior masonry and concrete",
      "Apply to clean dry substrate",
      "Confirm coverage, dilution and number of applications from Mapei TDS",
    ],
    limitations: [
      "Not a WTA-classified salt-retardant treatment — different mechanism from silicate crystalline treatment",
      "TODO: owner confirm — Mapei product for salt-retardant substrate treatment and application sequence with render",
      "Confirm render system compatibility",
    ],
    procurementSources: [
      { name: "Mapei Australia", url: "https://www.mapei.com/au" },
      { name: "Bayset — national Mapei distribution", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Rockcote / Saint-Gobain Weber",
    brandUrl: "https://www.rockcote.com.au",
    accentColor: "#b45309",
    name: "Rockcote Salt-Retardant Substrate Treatment",
    descriptionLine: "Salt-retardant penetrating treatment — exterior masonry facades with salt contamination before re-rendering — Saint-Gobain Weber Australia",
    productType: "Salt-retardant penetrating substrate treatment — exterior masonry",
    filterTags: ["Salt-retardant", "Penetrating", "Substrate-treatment", "Masonry", "Exterior", "Coastal"],
    techChips: [
      { label: "Salt-retardant", cls: "bg-amber-100 text-amber-800" },
      { label: "Penetrating treatment", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior masonry", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Rockcote / Saint-Gobain Weber supplies substrate treatment products for salt-affected facades. Confirm the specific Rockcote product for salt-retardant substrate treatment with Saint-Gobain Weber / Rockcote technical. TODO: owner confirm — specific Rockcote product for salt-retardant substrate pre-treatment before renovating render.",
    technicalProperties: [
      "Penetrating treatment — reduces salt migration",
      "Apply before render",
      "Confirm product, dilution, and application method with Rockcote technical",
    ],
    limitations: [
      "TODO: owner confirm — specific Rockcote salt-retardant treatment product",
      "Confirm system sequence with Rockcote technical",
    ],
    procurementSources: [
      { name: "Rockcote / Saint-Gobain Weber", url: "https://www.rockcote.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Crystalline", label: "Crystalline" },
  { id: "Silicate", label: "Silicate" },
  { id: "Penetrating", label: "Penetrating" },
  { id: "Salt-retardant", label: "Salt-retardant" },
  { id: "Substrate-treatment", label: "Substrate treatment" },
  { id: "Masonry", label: "Masonry" },
  { id: "Concrete", label: "Concrete" },
  { id: "Exterior", label: "Exterior" },
  { id: "Coastal", label: "Coastal" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  treatmentType: string;
  mechanism: string;
  applicationBefore: string;
  substrate: string;
  primaryUse: string;
}[] = [
  {
    product: "Remmers Silikat-Imprägnierung SP",
    brand: "Remmers Australia",
    treatmentType: "Crystalline silicate",
    mechanism: "Forms calcium silicate hydrate crystals within pores",
    applicationBefore: "WTA renovating render",
    substrate: "Masonry and concrete — salt contaminated",
    primaryUse: "Salt-retardant pre-treatment before WTA renovating render",
  },
  {
    product: "Mapei Antipluviol S",
    brand: "Mapei Australia",
    treatmentType: "Silane/siloxane water-repellent",
    mechanism: "Lines pore walls to reduce capillary water uptake",
    applicationBefore: "Salt-resistant render — confirm compatibility",
    substrate: "Exterior masonry and concrete",
    primaryUse: "Water-repellent substrate pre-treatment before salt-resistant render",
  },
  {
    product: "Rockcote Salt-Retardant Treatment",
    brand: "Rockcote / Saint-Gobain Weber",
    treatmentType: "TODO: confirm with Rockcote",
    mechanism: "Penetrating — reduces salt migration",
    applicationBefore: "Salt-resistant renovating render",
    substrate: "Exterior masonry — salt contaminated",
    primaryUse: "Salt-retardant substrate pre-treatment for coastal facade re-render",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Substrate pre-treatment on salt-contaminated masonry before WTA renovating render application",
    "Coastal facades with chloride contamination — applied before salt-resistant render",
    "Post-rising-damp treatment — applied after DPC injection works before re-render",
    "Heritage masonry facades with soluble salt contamination — applied before breathable render system",
  ],
  selectionCriteria: [
    "Treatment type — crystalline silicate versus silane/siloxane — confirm with manufacturer for specific substrate",
    "Application sequence — applied to clean substrate before bonding agent and render",
    "Coverage rate — confirm from TDS",
    "Moisture content of substrate — confirm substrate moisture limit before treatment application",
  ],
  limitations: [
    "Salt-retardant treatments reduce but do not eliminate salt migration — they must be combined with the correct render system (WTA renovating render)",
    "Not a substitute for treating the moisture source",
    "Treatment does not remove existing salts from the substrate — it limits further migration",
    "Confirm compatibility with the selected render system before specifying",
  ],
  standardsNotes: [
    "WTA Merkblatt 2-9-04/D — substrate pre-treatment is part of the WTA renovation system",
    "AS 3700 — Masonry Structures",
    "Manufacturer system guide — application sequence is critical",
  ],
  suitableDefects: [
    "Recurring salt attack on coastal masonry facades — applied before WTA renovating render",
    "Post-rising-damp facade re-render — applied after DPC injection works",
    "Heritage masonry with soluble salt contamination",
  ],
  typicalSubstrates: [
    "Masonry — brick and block contaminated with chloride or sulfate salts",
    "Concrete — external concrete facades with chloride contamination",
    "Heritage masonry — confirm treatment compatibility with lime mortar joints",
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

export function SaltRetardantTreatmentIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are salt-retardant substrate treatments?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Salt-retardant substrate treatments are penetrating chemical treatments applied to salt-contaminated masonry and concrete substrates before re-rendering, to reduce the capillary migration of soluble salts from the substrate into the new render system.
        </p>
        {expanded && (
          <>
            <p>
              They are an essential part of the WTA renovation render system sequence — applied to the substrate after full render removal and cleaning, before the bonding agent and WTA renovating render are applied. Two main treatment types are used in Australian facade remediation: crystalline silicate treatments (which react within the pore structure to form calcium silicate hydrate crystals) and silane/siloxane penetrating water-repellent impregnations (which line the pore walls to reduce capillary water uptake). Neither type eliminates the moisture source — this must be identified and treated separately.
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

export function SaltRetardantTreatmentProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — salt-retardant substrate treatment systems — scroll to view all</p>
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
              Side-by-side comparison of salt-retardant substrate treatment systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Treatment type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Mechanism</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Apply before</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Substrate</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.treatmentType}</td>
                  <td className="px-4 py-3 text-slate-600">{row.mechanism}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.applicationBefore}</td>
                  <td className="px-4 py-3 text-slate-600">{row.substrate}</td>
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
