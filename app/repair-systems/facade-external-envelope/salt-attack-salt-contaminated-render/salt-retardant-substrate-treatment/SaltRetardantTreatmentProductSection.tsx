"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Crystalline"
  | "Silane-modified"
  | "Salt-retardant"
  | "Penetrating"
  | "Masonry"
  | "Concrete"
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
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#be123c",
    name: "Sika Sikacryl-621",
    descriptionLine: "Crystalline / silicate substrate treatment for salt-affected masonry — penetrating — reduces capillary salt migration",
    productType: "Crystalline / silicate substrate treatment for salt-affected masonry",
    filterTags: ["Crystalline", "Salt-retardant", "Penetrating", "Masonry", "Concrete", "Coastal"],
    techChips: [
      { label: "Crystalline / silicate", cls: "bg-rose-100 text-rose-800" },
      { label: "Penetrating treatment", cls: "bg-slate-100 text-slate-700" },
      { label: "Salt-retardant", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm product name", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "TODO: owner confirm — Sika Australia product name for crystalline or silicate substrate salt-retardant treatment. Sika supplies penetrating and crystalline treatments for concrete and masonry protection. Confirm the current Sika Australia product recommended for substrate pre-treatment before salt-resistant renovating render application on salt-affected facades. Applied by brush or spray to prepared substrate. Allow to cure before applying primer and render system. Confirm system compatibility with Sika Australia technical.",
    technicalProperties: [
      "Penetrating crystalline or silicate treatment — blocks capillary pores through crystal formation",
      "Applied by brush or spray to dry or damp substrate",
      "Reduces capillary transport of salt-laden moisture",
      "Confirm application rate, cure time, and system sequence with Sika Australia",
    ],
    limitations: [
      "TODO: owner confirm — exact Sika product name for salt-retardant substrate treatment before re-rendering",
      "Not a waterproofing system under hydraulic pressure",
      "Does not address moisture ingress from active water source",
      "Confirm compatibility with subsequent primer and render system",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply", url: "https://aus.sika.com" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
  },
  {
    fullLabel: "Remmers (Australia)",
    brandUrl: "https://www.remmers.com.au",
    accentColor: "#0369a1",
    name: "Remmers Sulfatex",
    descriptionLine: "Silane-modified substrate treatment for salt-affected masonry — part of the Remmers WTA renovating render system",
    productType: "Silane-modified substrate treatment for salt-affected masonry",
    filterTags: ["Silane-modified", "Salt-retardant", "Penetrating", "Masonry", "Coastal"],
    techChips: [
      { label: "Silane-modified", cls: "bg-sky-100 text-sky-800" },
      { label: "Penetrating", cls: "bg-slate-100 text-slate-700" },
      { label: "WTA render system part", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Remmers Sulfatex is a silane-modified penetrating treatment for masonry substrates subject to sulfate and chloride salt attack — designed as part of the Remmers WTA renovating render system. Applied to prepared masonry substrate before primer and renovating render to reduce capillary moisture transport and salt migration. TODO: owner confirm — Remmers Sulfatex product name and specification for Australian market. Confirm current product designation and system sequence with Remmers Australia technical before specifying.",
    technicalProperties: [
      "Silane-modified penetrating treatment",
      "Reduces capillary moisture transport in masonry",
      "Part of the Remmers WTA renovating render system",
      "Applied by brush or spray to prepared substrate",
      "Confirm cure time and compatibility with Remmers renovating render system",
    ],
    limitations: [
      "TODO: owner confirm — Remmers Sulfatex product name and availability in Australia",
      "Confirm system sequence with Remmers Australia technical",
      "Not suitable for substrates under active hydraulic pressure",
      "Does not substitute for waterproofing works where moisture intrusion is active",
    ],
    procurementSources: [
      { name: "Remmers (Australia) — trade supply", url: "https://www.remmers.com.au" },
      { name: "Confirm local distributor", url: "https://www.remmers.com.au" },
    ],
  },
  {
    fullLabel: "Aquron Services Australia",
    brandUrl: "https://www.aquron.com.au",
    accentColor: "#7c2d12",
    name: "Aquron 2000",
    descriptionLine: "Silicate crystalline concrete and masonry treatment — permanently seals capillary pores — Australian-supplied specialist product",
    productType: "Silicate crystalline concrete and masonry treatment",
    filterTags: ["Crystalline", "Salt-retardant", "Penetrating", "Masonry", "Concrete"],
    techChips: [
      { label: "Reactive silicate crystalline", cls: "bg-orange-100 text-orange-800" },
      { label: "Penetrating", cls: "bg-slate-100 text-slate-700" },
      { label: "Australian-supplied", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Aquron 2000 is an Australian-supplied reactive silicate crystalline treatment for concrete and masonry substrates. Applied by spray or brush — reacts with free calcium hydroxide in the substrate to form calcium silicate crystals that permanently seal capillary pores. Used as a substrate sealing treatment before render application on salt-affected and salt-contaminated substrates. Aquron Services Australia is a specialist supplier — confirm current product specification, recommended application rate and system compatibility with Aquron Services before specifying. TODO: owner confirm — confirm Aquron 2000 suitability as pre-render substrate treatment for salt-affected masonry facades.",
    technicalProperties: [
      "Reactive silicate crystalline treatment",
      "Permanently seals capillary pores by crystal formation",
      "Australian-supplied through Aquron Services",
      "Applied by spray or brush",
      "Confirm compatibility with subsequent render system and primer with Aquron Services",
    ],
    limitations: [
      "TODO: owner confirm — suitability of Aquron 2000 as pre-render substrate treatment for salt-affected masonry in facade remediation context",
      "Confirm system sequence and compatibility with render primer and renovating render system",
      "Not a waterproofing membrane system",
      "Confirm current product specification with Aquron Services Australia",
    ],
    procurementSources: [
      { name: "Aquron Services Australia — specialist supply", url: "https://www.aquron.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Crystalline", label: "Crystalline" },
  { id: "Silane-modified", label: "Silane-modified" },
  { id: "Salt-retardant", label: "Salt-retardant" },
  { id: "Penetrating", label: "Penetrating" },
  { id: "Masonry", label: "Masonry" },
  { id: "Concrete", label: "Concrete" },
  { id: "Coastal", label: "Coastal" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  treatmentType: string;
  mechanism: string;
  application: string;
  compatibleRender: string;
  primaryUse: string;
}[] = [
  {
    product: "Sika Sikacryl-621",
    brand: "Sika Australia",
    treatmentType: "Crystalline / silicate penetrating",
    mechanism: "Crystal formation — blocks capillary pores",
    application: "Brush or spray to prepared substrate",
    compatibleRender: "Confirm with Sika AU",
    primaryUse: "Substrate pre-treatment before salt-resistant renovating render on salt-affected facades",
  },
  {
    product: "Remmers Sulfatex",
    brand: "Remmers",
    treatmentType: "Silane-modified penetrating",
    mechanism: "Hydrophobic lining — reduces liquid water transport",
    application: "Brush or spray to prepared substrate",
    compatibleRender: "Remmers WTA renovating render system",
    primaryUse: "Part of Remmers WTA system — substrate treatment before Remmers renovating render",
  },
  {
    product: "Aquron 2000",
    brand: "Aquron Services AU",
    treatmentType: "Reactive silicate crystalline",
    mechanism: "Permanent crystal formation in capillary pores",
    application: "Spray or brush",
    compatibleRender: "Confirm with Aquron Services",
    primaryUse: "Substrate sealing treatment before render on salt-contaminated concrete and masonry",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Substrate pre-treatment before renovating render on salt-affected masonry",
    "Pre-treatment of concrete facades with chloride contamination before re-rendering",
    "Treatment of masonry below-grade walls before rising-damp renovation render system",
    "Substrate preparation on coastal strata facades before salt-resistant render application",
  ],
  selectionCriteria: [
    "Treatment mechanism — crystalline (blocks pores) vs silane (hydrophobic lining) — confirm which is appropriate for substrate type and moisture source",
    "System compatibility — confirm treatment is compatible with subsequent primer and render system",
    "Cure time before render — confirm minimum time between treatment and primer application",
    "Substrate moisture content at time of application",
    "Confirm product suitability for masonry vs concrete substrates",
  ],
  limitations: [
    "Not a waterproofing system — does not address active hydraulic moisture ingress",
    "Does not substitute for DPC injection or rising damp treatment where damp ingress is active",
    "All products require TODO: owner confirm on Australian product names and specifications",
    "Confirm system sequence with render manufacturer",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — applicable to substrate preparation for render works on masonry",
    "Manufacturer system guides — substrate treatment is part of a system — follow the render manufacturer's prescribed sequence",
    "WTA Merkblatt 2-9-04/D — referenced in salt-resistant renovating render system specifications",
  ],
  suitableDefects: [
    "Salt attack — substrate pre-treatment before renovating render to reduce ongoing salt migration",
    "Salt-contaminated masonry before render repair works",
    "Coastal facade substrates with chloride contamination",
  ],
  typicalSubstrates: [
    "Masonry — brick and block contaminated with salts",
    "Concrete facades with chloride or sulfate contamination",
    "Heritage masonry — confirm compatibility with lime-mortared heritage substrate",
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
          Salt-retardant substrate treatments are penetrating or crystalline products applied to masonry and concrete substrates before renovating render application to reduce capillary salt migration through the substrate. They include silicate-based crystalline treatments (which react with free lime in the substrate to form insoluble calcium silicate crystals that block capillary pores) and silane/siloxane-based water-repellent treatments (which line the substrate pores with a hydrophobic layer to reduce liquid water transport while maintaining vapour permeability).
        </p>
        {expanded && (
          <p>
            These treatments do not waterproof the substrate — they reduce capillary transport of salt-laden moisture but do not address active hydraulic pressure or sustained water ingress. They are used as part of a system: substrate preparation → salt-retardant treatment → primer/bonding slurry → renovating render. Confirm the system sequence with the render system manufacturer before applying.
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — salt-retardant substrate treatment systems only — scroll to view all</p>
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
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Application</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Compatible render</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.treatmentType}</td>
                  <td className="px-4 py-3 text-slate-600">{row.mechanism}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.application}</td>
                  <td className="px-4 py-3 text-slate-600">{row.compatibleRender}</td>
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
