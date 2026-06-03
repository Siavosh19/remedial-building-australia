"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Intumescent"
  | "Fire-rated"
  | "Penetration-seal"
  | "Linear-joint"
  | "Pipe-penetration"
  | "Cable-penetration"
  | "Duct-penetration"
  | "FRL-rated"
  | "Water-based"
  | "AS1530";

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
    fullLabel: "Hilti",
    brandUrl: "https://www.hilti.com.au",
    accentColor: "#D2000F",
    name: "Hilti CP 601S",
    descriptionLine: "Intumescent acrylic firestop sealant — pipe, cable and duct penetrations through fire-rated walls and floors",
    productType: "Intumescent acrylic sealant",
    filterTags: ["Intumescent", "Fire-rated", "Penetration-seal", "Pipe-penetration", "Cable-penetration", "Duct-penetration", "FRL-rated", "Water-based", "AS1530"],
    techChips: [
      { label: "Intumescent acrylic", cls: "bg-red-100 text-red-800" },
      { label: "FRL rated", cls: "bg-amber-100 text-amber-800" },
      { label: "Water-based", cls: "bg-sky-50 text-sky-700" },
      { label: "Paintable", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 1530.4 tested", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Hilti CP 601S is a water-based intumescent acrylic firestop sealant used for sealing around cable, pipe and small duct penetrations through fire-rated walls and floors in Australian Class 2 and commercial buildings. On exposure to fire it expands to seal the void and prevent fire, smoke and toxic gas spread. The FRL and applicable substrate/service combinations must be confirmed from the Hilti LABC (Local Authority Building Certificate) or third-party test report listing. All installations must comply with NCC Section C and be certified by a qualified passive fire protection installer.",
    technicalProperties: [
      "Intumescent expansion on fire exposure seals pipe and cable penetrations",
      "Water-based acrylic formulation — water cleanup before cure",
      "FRL ratings available for tested combinations only",
      "Paintable after cure for aesthetic finish",
      "Suitable for combustible pipe (PE/PP/PVC) where tested combinations exist",
    ],
    limitations: [
      "FRL only applies to tested substrate/penetration combinations — never extrapolate",
      "Not suitable for large ductwork without separate duct collar system",
      "Must be installed by qualified passive fire protection contractor",
      "Minimum annular space requirements apply",
      "Confirm current LABC certificate before specifying",
    ],
    procurementSources: [
      { name: "Hilti Australia — hilti.com.au — trade supply", url: "https://www.hilti.com.au" },
      { name: "Passive fire protection trade distributors", url: "https://www.hilti.com.au" },
    ],
  },
  {
    fullLabel: "3M",
    brandUrl: "https://www.3m.com.au",
    accentColor: "#FF0000",
    name: "3M Fire Barrier CP 25WB+",
    descriptionLine: "Water-based intumescent firestop sealant — penetrations and perimeter joints in fire-rated assemblies",
    productType: "Intumescent acrylic sealant",
    filterTags: ["Intumescent", "Fire-rated", "Penetration-seal", "Linear-joint", "Pipe-penetration", "Cable-penetration", "FRL-rated", "Water-based", "AS1530"],
    techChips: [
      { label: "Intumescent acrylic", cls: "bg-slate-100 text-slate-700" },
      { label: "FRL rated", cls: "bg-amber-100 text-amber-800" },
      { label: "Linear joints", cls: "bg-sky-50 text-sky-700" },
      { label: "Perimeter seal", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 1530.4 tested", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "3M Fire Barrier Sealant CP 25WB+ is a water-based intumescent acrylic sealant used for sealing pipe, cable and conduit penetrations and perimeter gaps in fire-rated wall and floor assemblies. It is one of the most widely specified intumescent sealants in Australian Class 2 and commercial building passive fire protection work. FRL ratings apply to tested assemblies only; confirm from 3M LABC certification or Warnock Hersey listing before specifying. Installation must be by a qualified passive fire protection contractor.",
    technicalProperties: [
      "Water-based — easy cleanup before cure",
      "Expands under fire to seal penetrations and gaps",
      "Suitable for penetrations and perimeter joints in fire-rated assemblies",
      "Tested to AS 1530.4",
      "FRL depends on tested assembly combination",
    ],
    limitations: [
      "FRL only valid for tested assembly — never substitute substrates or services without re-testing",
      "Not paintable after cure (unlike CP 601S)",
      "Requires correct depth of fill",
      "Must be installed by qualified passive fire protection installer",
    ],
    procurementSources: [
      { name: "3M Australia — 3m.com.au", url: "https://www.3m.com.au" },
      { name: "Passive fire protection trade distributors", url: "https://www.3m.com.au" },
    ],
  },
  {
    fullLabel: "Bostik",
    brandUrl: "https://www.bostik.com/au",
    accentColor: "#E63946",
    name: "Bostik FireFlex Firestop Sealant",
    descriptionLine: "Intumescent acrylic firestop sealant — pipe and cable penetrations and perimeter joint sealing",
    productType: "Intumescent acrylic sealant",
    filterTags: ["Intumescent", "Fire-rated", "Penetration-seal", "Pipe-penetration", "Cable-penetration", "Linear-joint", "FRL-rated", "Water-based"],
    techChips: [
      { label: "Intumescent acrylic", cls: "bg-purple-100 text-purple-800" },
      { label: "FRL rated", cls: "bg-amber-100 text-amber-800" },
      { label: "Pipe & cable", cls: "bg-slate-100 text-slate-700" },
      { label: "Perimeter joint", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Bostik FireFlex is a water-based intumescent acrylic firestop sealant for sealing pipe, cable and conduit penetrations through fire-rated wall and floor assemblies, and for perimeter joint sealing in fire-rated construction. Used in Australian Class 2 and commercial building passive fire protection work where an affordable tested sealant solution is required. FRL and applicable combinations must be confirmed from Bostik's LABC or test certification — do not substitute services or substrates without re-confirming certification.",
    technicalProperties: [
      "Intumescent acrylic chemistry",
      "Water-based and low VOC",
      "Paintable after cure",
      "Tested to AS 1530.4 for applicable combinations",
      "Suitable for perimeter and head-of-wall joints where tested",
    ],
    limitations: [
      "FRL valid for tested combinations only",
      "Minimum annular space requirements apply",
      "Qualified passive fire installer required",
      "Confirm current LABC certification before specifying",
      "Pot-life limited after container opened",
    ],
    procurementSources: [
      { name: "Bostik Australia — bostik.com/au", url: "https://www.bostik.com/au" },
      { name: "Passive fire protection distributors", url: "https://www.bostik.com/au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag | "All"; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Intumescent", label: "Intumescent" },
  { id: "Fire-rated", label: "Fire-rated" },
  { id: "Penetration-seal", label: "Penetration-seal" },
  { id: "Linear-joint", label: "Linear-joint" },
  { id: "FRL-rated", label: "FRL-rated" },
];

const BRAND_EQUIV: { application: string; hilti: string; threeM: string; bostik: string }[] = [
  { application: "Pipe penetrations", hilti: "CP 601S", threeM: "CP 25WB+", bostik: "FireFlex" },
  { application: "Cable penetrations", hilti: "CP 601S", threeM: "CP 25WB+", bostik: "FireFlex" },
  { application: "Perimeter/linear joints", hilti: "—", threeM: "CP 25WB+", bostik: "FireFlex" },
  { application: "Paintable after cure", hilti: "CP 601S", threeM: "—", bostik: "FireFlex" },
];

type SystemComparisonRow = {
  property: string;
  hilti: string;
  threeM: string;
  bostik: string;
};

const SYSTEM_COMPARISON: SystemComparisonRow[] = [
  { property: "Type", hilti: "Intumescent acrylic", threeM: "Intumescent acrylic", bostik: "Intumescent acrylic" },
  { property: "Water-based", hilti: "Yes", threeM: "Yes", bostik: "Yes" },
  { property: "Paintable", hilti: "Yes", threeM: "—", bostik: "Yes" },
  { property: "Linear joint use", hilti: "—", threeM: "Yes", bostik: "Yes" },
  { property: "Pipe penetration", hilti: "Yes", threeM: "Yes", bostik: "Yes" },
  { property: "Cable penetration", hilti: "Yes", threeM: "Yes", bostik: "Yes" },
  { property: "AS 1530.4 tested", hilti: "Yes", threeM: "Yes", bostik: "Yes" },
];

const TECH_INFO = {
  frlRatings: [
    "Fire Resistance Level (FRL) is expressed as structural adequacy / integrity / insulation in minutes",
    "FRL applies only to tested assembly combinations — substrate, service type, annular space, depth of fill and sealant product must all match the test certificate",
    "Never extrapolate or assume FRL from a different assembly — confirm exact tested combination from LABC or test report",
    "Common FRL requirements for Class 2 buildings: 60/60/60 for fire walls, 90/90/90 for fire-rated separating elements",
    "Always confirm FRL requirement from the building's fire safety schedule before specifying a sealant system",
  ],
  nccRequirements: [
    "NCC Section C sets passive fire protection requirements for Australian Class 2 and commercial buildings",
    "Penetrations through fire-rated elements must be sealed with a tested firestop system achieving the required FRL",
    "All passive fire protection work must be installed by a qualified passive fire protection installer",
    "Certifier must approve the passive fire protection schedule before and after installation",
    "Do not substitute the specified sealant product without re-confirming the tested assembly with the certifier",
  ],
  installation: [
    "Only qualified passive fire protection contractors may install intumescent firestop sealants in fire-rated assemblies",
    "Correct depth of fill is mandatory — confirm from LABC certificate for the specific combination",
    "Tool flush with substrate surface — no proud bead and no recessed fill unless specified in the test certificate",
    "Minimum annular space requirements must be observed — oversized penetrations must be reduced to tested dimensions",
    "Do not install over existing failed sealant — remove and re-seal to the tested system specification",
  ],
  testingEvidence: [
    "LABC (Local Authority Building Certificate) — manufacturer-held certification confirming tested assembly combinations",
    "Warnock Hersey listings — independent third-party test evidence accepted in Australia for firestop systems",
    "CodeMark — product certification scheme accepted under NCC — confirm if applicable to the product being specified",
    "AS 1530.4 — Methods for fire tests on building materials, components and structures — the primary Australian test standard for firestop sealants",
    "Always request the current LABC or test report and confirm the exact assembly matches the project conditions before specifying",
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

export function IntumescentJointSealantsIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are intumescent joint sealants?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Intumescent joint sealants are passive fire protection products used to seal service penetrations — pipes, cables, conduits and small ducts — and perimeter gaps through fire-rated walls and floors in Australian Class 2 and commercial buildings. Unlike standard construction sealants, intumescent sealants contain an intumescent agent that expands dramatically when exposed to heat, sealing the void left by a burning or deforming service and maintaining the fire resistance of the assembly. They are assessed against AS 1530.4 and assigned a Fire Resistance Level (FRL) for specific tested assembly combinations.
        </p>
        <p>
          Selection must be based on the required FRL, the substrate (concrete, masonry, plasterboard, fibre cement), the service type (combustible plastic pipe, metallic pipe, cable bundle, conduit), the annular space dimension, and the depth of fill — all of which must match a tested, certified combination. Intumescent sealants must be installed by qualified passive fire protection contractors and must be certified before occupancy.
        </p>
        <p>
          Critical note: FRL applies to tested assembly combinations only. No FRL can be assumed, extrapolated or transferred from one assembly configuration to another. Always confirm the current LABC certificate or test report against the exact project conditions before specifying.
        </p>
      </div>
      <div className="mt-5 space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Do not confuse with:</p>
        <ul className="space-y-1.5">
          {[
            "Acoustic sealant — flexible sealant used to control sound transmission through joints and penetrations — does not provide fire resistance",
            "Standard construction sealant — silicone, polyurethane or polysulfide sealants used for weatherproofing — not fire-rated and must not be used in fire-rated assemblies",
            "Intumescent strips — solid intumescent material used in door frames and glazing systems — different product form, not a paste sealant",
            "Intumescent duct collars — mechanical collars used around combustible ductwork penetrations — separate product category from firestop sealant",
            "Fire-rated caulk (colloquial term) — always confirm whether the product is an independently tested and certified firestop system before use in a fire-rated assembly",
          ].map((item) => (
            <li key={item} className="flex gap-2.5 text-xs leading-5 text-slate-600">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>
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

export function IntumescentJointSealantsProductSection() {
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
              FRL ratings, NCC requirements, installation requirements and testing evidence
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
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
              <TechCard icon={<Layers size={15} />} title="FRL Ratings" items={TECH_INFO.frlRatings} style="bullet" />
              <TechCard icon={<BookOpen size={15} />} title="NCC Requirements" items={TECH_INFO.nccRequirements} style="check" />
              <TechCard icon={<Ruler size={15} />} title="Installation" items={TECH_INFO.installation} style="warn" />
              <TechCard icon={<SquareStack size={15} />} title="Testing Evidence" items={TECH_INFO.testingEvidence} style="bullet" />
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — intumescent acrylic firestop sealants — scroll to view all</p>
          </div>
        </div>

        {/* Filter chips */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.filter((f) => f.id !== "All").map((f) => {
            const active = activeFilters.has(f.id as FilterTag);
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => toggleFilter(f.id as FilterTag)}
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
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll to view all
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

      {/* ── Brand Equivalents ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Brand Equivalents by Application</h2>
            <p className="mt-1 text-sm text-slate-500">
              Intumescent firestop sealant product equivalents by application type across the three brands listed. Confirm tested assembly with current LABC or certification before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">
                  Application
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#D2000F" }}>Hilti</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#FF0000" }}>3M</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#E63946" }}>Bostik</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.application} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">
                    {row.application}
                  </td>
                  {[row.hilti, row.threeM, row.bostik].map((val, j) => (
                    <td key={j} className="px-4 py-3 text-slate-600">
                      {val === "—" ? <span className="text-slate-300">—</span> : val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── System Comparison ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side property comparison for the three intumescent firestop sealants listed on this page.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">
                  Property
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#D2000F" }}>Hilti CP 601S</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#FF0000" }}>3M CP 25WB+</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#E63946" }}>Bostik FireFlex</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.property} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">
                    {row.property}
                  </td>
                  {[row.hilti, row.threeM, row.bostik].map((val, j) => (
                    <td key={j} className="px-4 py-3 text-slate-600">
                      {val === "—" ? <span className="text-slate-300">—</span> : val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── FRL Critical Warning — BELOW comparison table ── */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-amber-900">Critical — FRL Applies to Tested Assemblies Only</h3>
        </div>
        <ul className="space-y-2">
          {[
            "FRL is not a property of the sealant product — it is a property of the tested assembly combination, which includes the substrate, service type, annular space, depth of fill and the specific sealant product used in the test",
            "Never assume or extrapolate FRL from a different assembly — a different pipe material, a different wall substrate, a different annular space or a different depth of fill will invalidate the tested FRL",
            "Always confirm the LABC certificate or Warnock Hersey test report before specifying — the current certificate must list the exact assembly configuration used in the project",
            "Intumescent firestop sealants must be installed by a qualified passive fire protection contractor — unqualified installation is not compliant under NCC Section C regardless of product used",
            "Do not paint over intumescent sealant unless the product is confirmed as paintable and painting does not compromise the intumescent expansion performance",
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
