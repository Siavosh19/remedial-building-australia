"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Acid-wash"
  | "Phosphoric"
  | "Efflorescence"
  | "Mortar-stain"
  | "Masonry-cleaning"
  | "Brick"
  | "Concrete"
  | "PPE-required"
  | "Pre-mixed"
  | "Calcium-silicate";

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
    fullLabel: "Parchem Construction Supplies",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#0369a1",
    name: "Phosphoric acid brick cleaner — pre-mixed formulation",
    descriptionLine: "Pre-mixed phosphoric acid brick cleaner — gentler than HCl — suitable for clay brick, calcium silicate brick and some concrete masonry — removes lime bloom, calcium carbonate staining and efflorescence — PPE required",
    productType: "Phosphoric acid masonry cleaner — pre-mixed — external brick and concrete",
    filterTags: ["Acid-wash", "Phosphoric", "Efflorescence", "Mortar-stain", "Masonry-cleaning", "Brick", "Concrete", "PPE-required", "Pre-mixed", "Calcium-silicate"],
    techChips: [
      { label: "Phosphoric acid", cls: "bg-sky-100 text-sky-800" },
      { label: "Pre-mixed RTU", cls: "bg-green-100 text-green-700" },
      { label: "Low fuming", cls: "bg-slate-100 text-slate-700" },
      { label: "PPE required", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Parchem Construction Supplies offers a pre-mixed phosphoric acid brick cleaner for removal of lime bloom, calcium carbonate staining, and efflorescence from clay brick, calcium silicate brick, and some concrete masonry on Class 2 strata buildings and commercial structures. Phosphoric acid is significantly gentler than hydrochloric acid — lower fuming, less corrosive, and slower acting — making it more appropriate where occupied areas, delicate masonry surfaces, or softer substrates preclude HCl use. Safer on adjacent materials than HCl but PPE remains mandatory and pre-wetting is still required before any acid application. The pre-mixed formulation eliminates on-site dilution and provides a consistent working concentration with surfactant package to improve wetting and surface contact. Suitable for calcium silicate brick where HCl is prohibited. After dwell time of 2–5 minutes, scrub and flush with large volumes of clean water. Confirm that phosphate residue is fully flushed before applying any paint, sealant, or coating — residual phosphate deposits affect adhesion. Still prohibited on sandstone, limestone, and reconstituted stone.",
    technicalProperties: [
      "Acid type: Phosphoric acid — pre-mixed at working concentration with surfactant addition for improved wetting",
      "Application: Brush or low-pressure spray onto pre-wetted masonry — dwell time 2–5 minutes, scrub and flush",
      "Compatible masonry: Clay brick, calcium silicate brick, and concrete masonry — gentler than HCl on all substrates",
      "Pre-wetting: Mandatory before application to prevent deep acid absorption into porous masonry",
      "Neutralisation: Thorough water rinse required — confirm phosphate residue is fully removed before coating",
      "PPE: Acid-resistant gloves, safety glasses, rubber apron — mandatory for all phosphoric acid cleaning operations",
      "Standards: AS 3700 masonry; NATSPEC 03 30 00 masonry cleaning pre-treatment requirements",
    ],
    limitations: [
      "Still an acid — PPE mandatory; prohibited on sandstone and limestone which dissolve in acid",
      "Slower reaction than HCl — may require longer dwell time (2–5 minutes) or repeat applications for heavy mortar smear",
      "May leave a phosphate residue film if not flushed adequately — check that residue is fully removed before applying paint, sealant, or coating",
      "Higher material cost than site-diluted HCl for large-scale facade cleaning jobs",
      "Not effective on rust staining — use oxalic acid cleaner or proprietary iron stain remover for rust and iron deposits",
      "Confirm compatibility with specific substrate before applying to unusual or heritage masonry — trial area mandatory",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — trade and specialist construction supply nationally", url: "https://www.parchem.com.au" },
      { name: "Blackwoods — phosphoric acid and pre-mixed masonry cleaners, trade quantities", url: "https://www.blackwoods.com.au" },
      { name: "Bunnings / Mitre 10 — phosphoric acid cleaners in store, 2 L and 5 L sizes", url: "https://www.bunnings.com.au" },
      { name: "Chem Supply Australia — phosphoric acid bulk supply and safety data sheets", url: "https://www.chemsupply.com.au" },
    ],
  },
  {
    fullLabel: "Bondall / RLA Polymers",
    brandUrl: "https://www.bondall.com.au",
    accentColor: "#b45309",
    name: "Phosphoric acid masonry cleaner — hardware merchant supply",
    descriptionLine: "Pre-formulated phosphoric acid masonry cleaner — hardware merchant distribution — gentler than HCl — suitable for clay brick and calcium silicate masonry — lime bloom and efflorescence removal — PPE required",
    productType: "Phosphoric acid masonry cleaner — hardware supply — external brick and concrete",
    filterTags: ["Acid-wash", "Phosphoric", "Efflorescence", "Mortar-stain", "Masonry-cleaning", "Brick", "Concrete", "PPE-required", "Pre-mixed", "Calcium-silicate"],
    techChips: [
      { label: "Phosphoric acid", cls: "bg-sky-100 text-sky-800" },
      { label: "Hardware supply", cls: "bg-green-100 text-green-700" },
      { label: "Low fuming", cls: "bg-slate-100 text-slate-700" },
      { label: "PPE required", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Bondall and RLA Polymers manufacture phosphoric acid masonry cleaners distributed through hardware merchants and trade supply outlets nationally for removal of lime bloom, calcium carbonate staining, and efflorescence from clay brick, calcium silicate brick, and concrete masonry on Class 2 strata buildings and residential structures. Phosphoric acid provides a safer alternative to HCl for general facade cleaning where heavy mortar smear is not the primary defect — lower fuming, slower acting, and less damaging to adjacent materials. Pre-mixed at working concentration for trade and hardware supply — available in 2 L, 5 L, and 20 L containers through Bunnings, Mitre 10, and merchant outlets. The same safety requirements apply as all acid cleaners: pre-wet the masonry before application; PPE mandatory; flush thoroughly after treatment to remove phosphate residue before any subsequent coating or sealing. Suitable for calcium silicate brick where HCl would cause substrate damage. Prohibited on sandstone, limestone, and reconstituted stone.",
    technicalProperties: [
      "Pre-mixed at working concentration — hardware and trade merchant distribution nationally in 2 L, 5 L, and 20 L sizes",
      "Phosphoric acid with surfactant — gentler than HCl on substrate and adjacent materials while still dissolving calcium deposits",
      "Suitable for calcium silicate brick (Hebel, Siporex) where HCl is prohibited — confirm with manufacturer TDS before applying",
      "Lower fuming than HCl — more practical in partially occupied areas or areas with limited ventilation",
      "Surfactant package improves wetting and surface contact on dense or glazed brick faces",
      "PPE required: acid-resistant gloves, safety glasses, rubber apron — same requirements regardless of acid concentration",
    ],
    limitations: [
      "Prohibited on sandstone, limestone, and reconstituted stone — phosphoric acid dissolves calcium-based masonry substrates",
      "Phosphate residue must be fully removed by flushing before applying paint, sealant, or waterproof coating — residual phosphate affects adhesion",
      "Not effective on oil, rust, or organic staining — different cleaning chemistry required for these stain types",
      "Slower acting than HCl — heavy mortar smear may require repeat applications or specification of HCl for more aggressive cleaning",
      "PPE mandatory regardless of product concentration — acid burns from phosphoric acid are slower onset but still serious",
    ],
    procurementSources: [
      { name: "Bondall — national distribution through hardware and trade stores", url: "https://www.bondall.com.au" },
      { name: "Bunnings / Mitre 10 — Bondall and generic phosphoric acid cleaners in store", url: "https://www.bunnings.com.au" },
      { name: "Blackwoods / Tradelink — 20 L trade quantities for commercial cleaning jobs", url: "https://www.blackwoods.com.au" },
      { name: "Parchem Construction Supplies — specialist masonry cleaning products nationally", url: "https://www.parchem.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Acid-wash", label: "Acid wash" },
  { id: "Phosphoric", label: "Phosphoric acid" },
  { id: "Efflorescence", label: "Efflorescence" },
  { id: "Mortar-stain", label: "Mortar stain" },
  { id: "Masonry-cleaning", label: "Masonry cleaning" },
  { id: "Brick", label: "Clay brick" },
  { id: "Concrete", label: "Concrete" },
  { id: "Calcium-silicate", label: "Calcium silicate brick" },
  { id: "PPE-required", label: "PPE required" },
  { id: "Pre-mixed", label: "Pre-mixed" },
];

const SYSTEM_COMPARISON: {
  supplier: string;
  product: string;
  concentration: string;
  compatible: string;
  distribution: string;
  keyFeature: string;
  primaryUse: string;
}[] = [
  {
    supplier: "Parchem Construction Supplies",
    product: "Phosphoric acid brick cleaner",
    concentration: "Pre-mixed with surfactant",
    compatible: "Clay brick + calcium silicate + concrete",
    distribution: "Trade / specialist supply",
    keyFeature: "Trade-quality formulation with surfactant",
    primaryUse: "Lime bloom + efflorescence",
  },
  {
    supplier: "Bondall / RLA Polymers",
    product: "Phosphoric acid masonry cleaner",
    concentration: "Pre-mixed RTU",
    compatible: "Clay brick + calcium silicate + concrete",
    distribution: "Hardware merchants nationally",
    keyFeature: "Wide hardware availability",
    primaryUse: "General efflorescence + lime stain",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Removal of lime bloom and calcium carbonate staining from clay brick and calcium silicate brick facades following construction or remediation work",
    "Removal of efflorescence from brick, calcium silicate, and concrete masonry where gentler acid cleaning is required",
    "Surface preparation of brick and masonry facades before applying waterproof coating or sealant where HCl would be too aggressive",
    "Cleaning of calcium silicate brick (Hebel, Siporex) where HCl is prohibited due to substrate damage risk",
    "Cleaning in partially occupied or semi-enclosed areas where HCl fuming is unacceptable",
  ],
  selectionCriteria: [
    "Select phosphoric acid over HCl where calcium silicate brick is present — phosphoric is less damaging to softer masonry substrates",
    "Prefer phosphoric acid for use in partially occupied buildings or enclosed areas where HCl fuming would be hazardous",
    "Pre-wet the substrate thoroughly before application — the same mandatory requirement applies as with HCl",
    "Confirm phosphate residue is fully flushed after treatment before specifying any subsequent coating — residual phosphate affects adhesion",
    "Commission a trial area on an inconspicuous section before treating the full facade — confirm no unexpected reaction on the substrate",
    "PPE is mandatory for all phosphoric acid cleaning operations — acid-resistant gloves, safety glasses, and rubber apron as minimum",
  ],
  limitations: [
    "NEVER use on sandstone, limestone, or reconstituted stone — phosphoric acid dissolves calcium-based masonry",
    "Phosphate residue must be fully flushed before coating — test runoff for phosphate residue if coating adhesion is a concern",
    "Slower acting than HCl — not suitable as the primary choice for heavy Portland cement mortar smear",
    "Not effective on oil, rust, or organic staining — different cleaning chemistry required for these stain types",
    "PPE is mandatory regardless of working concentration — do not assume safety because it is gentler than HCl",
  ],
  standardsNotes: [
    "Safe Work Australia Model Code of Practice — hazardous chemicals on construction sites; SDS mandatory on site",
    "State WHS regulations — handling and storage of corrosive substances; PPE requirements for acid cleaning",
    "AS 3700 Masonry Structures — masonry surface preparation requirements",
    "NATSPEC worksection 03 30 00 — masonry cleaning and pre-treatment specifications",
    "EPA state regulations — disposal of acid rinse water; confirm local requirements before stormwater disposal",
  ],
  suitableDefects: [
    "Lime bloom and calcium carbonate deposits on clay brick and calcium silicate brick facades",
    "Efflorescence (white salt deposits) on brick and concrete masonry — light to moderate severity",
    "Surface soiling with calcium-based deposits from water runoff over concrete parapets or sills onto brick below",
    "Mild mortar smear on calcium silicate brick where HCl would damage the substrate",
    "Preparation of brick and masonry surfaces before waterproof coating or sealant application",
  ],
  typicalSubstrates: [
    "Fired clay face brick and engineering brick — same applications as HCl but gentler on dense brick surfaces",
    "Calcium silicate brick (Hebel, Siporex, autoclaved aerated concrete) — phosphoric acid is preferred over HCl for these substrates",
    "Concrete masonry units (block) and concrete surfaces — phosphoric acid is more appropriate for concrete than HCl",
    "NOT suitable: sandstone, limestone, marble, or reconstituted stone — acid dissolves calcium-based substrates",
    "NOT suitable: surfaces with existing paint or sealant coating without pre-testing compatibility",
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

export function PhosphoricAcidCleanerIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What is phosphoric acid brick cleaner?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Phosphoric acid brick cleaner is a gentler alternative to hydrochloric acid for removal of lime bloom, calcium carbonate staining, and efflorescence from clay brick, calcium silicate brick, and concrete masonry on Class 2 strata buildings. Lower fuming, slower acting, and less corrosive than HCl — making it more appropriate where occupied areas, calcium silicate substrates, or limited ventilation preclude the use of hydrochloric acid. Pre-mixed formulations with surfactant additions are available from trade and hardware supply nationally.
        </p>
        {expanded && (
          <>
            <p>
              Phosphoric acid is the preferred choice for calcium silicate brick (Hebel, Siporex) where HCl would cause substrate damage. It is also better suited to concrete masonry surfaces where the more aggressive HCl would strip the surface excessively. The same mandatory pre-wetting requirement applies — saturate all masonry surfaces with clean water before application to prevent deep acid absorption. Dwell time of 2–5 minutes before scrubbing and flushing is typically required, which is longer than HCl due to the lower acidity. PPE remains mandatory for all phosphoric acid cleaning operations.
            </p>
            <p>
              A critical post-treatment requirement is the complete removal of phosphate residue. Phosphoric acid leaves a phosphate film on the treated surface if not thoroughly flushed — this phosphate residue affects the adhesion of subsequently applied paint, sealant, or waterproof coating. Flush with large volumes of clean water until no soapy or slippery feel remains on the surface. The same substrate prohibition applies as HCl: never use phosphoric acid on sandstone, limestone, or reconstituted stone — these calcium-based substrates dissolve in any acid cleaner.
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

export function PhosphoricAcidCleanerProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">2 product systems — phosphoric acid brick cleaner — scroll to view all</p>
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
                style={{ borderLeftWidth: 4, borderLeftColor: product.accentColor }}
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
                      {product.brandUrl !== "#" && (
                        <a
                          href={product.brandUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                        >
                          <ExternalLink size={9} /> Brand Site
                        </a>
                      )}
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
              Side-by-side comparison of phosphoric acid brick cleaner supply options. Confirm substrate suitability and flush thoroughly to remove phosphate residue before any subsequent coating.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Concentration</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Compatible</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Distribution</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key feature</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.supplier} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.supplier}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.concentration}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.compatible}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.distribution}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.keyFeature}</td>
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
