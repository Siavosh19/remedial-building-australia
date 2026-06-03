"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Render-stop"
  | "Screed-bead"
  | "Aluminium"
  | "PVC"
  | "Edge-termination"
  | "Control-joint"
  | "Masonry"
  | "Concrete"
  | "Exterior"
  | "Interior"
  | "Slab-soffit"
  | "Window-head";

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
    fullLabel: "Rondo Building Services",
    brandUrl: "https://www.rondo.com.au",
    tdsUrl: "https://www.rondo.com.au",
    accentColor: "#0369a1",
    name: "Rondo Aluminium Render Stop Bead",
    descriptionLine: "Aluminium render stop / screed bead — defines render termination line at slab soffits, window heads, control joints and substrate changes — exterior and interior facade",
    productType: "Aluminium render stop and screed bead",
    filterTags: ["Render-stop", "Screed-bead", "Aluminium", "Edge-termination", "Control-joint", "Masonry", "Concrete", "Exterior", "Interior", "Slab-soffit", "Window-head"],
    techChips: [
      { label: "Aluminium render stop", cls: "bg-sky-100 text-sky-800" },
      { label: "Screed guide", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior and interior", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Rondo aluminium render stop beads define the render termination line at horizontal and vertical edge conditions including slab soffits, window heads, panel joints, and changes of substrate. The bead provides a clean, straight edge to terminate render and can also serve as a screed guide to control render thickness. Confirm leg dimensions, flange width, and available profiles with Rondo. TODO: owner confirm — Rondo aluminium render stop bead specification, leg dimensions and profiles.",
    technicalProperties: [
      "Aluminium render stop / screed bead",
      "Defines render termination line",
      "Suitable for slab soffits, window heads, panel joints, substrate changes",
      "Can be used as screed guide for render thickness control",
      "Exterior and interior applications",
      "Confirm leg and flange dimensions from Rondo",
    ],
    limitations: [
      "Not suitable for coastal environments — use stainless or PVC in corrosive zones",
      "TODO: owner confirm — Rondo render stop bead specification and dimensions",
      "Not a movement joint — do not use render stop bead at locations requiring movement capacity",
    ],
    procurementSources: [
      { name: "Rondo Building Services", url: "https://www.rondo.com.au" },
      { name: "Render and plasterboard merchants nationally", url: "https://www.rondo.com.au" },
    ],
  },
  {
    fullLabel: "USG Boral / Beadex",
    brandUrl: "https://www.usgboral.com.au",
    tdsUrl: "https://www.usgboral.com.au",
    accentColor: "#92400e",
    name: "USG Boral Aluminium / PVC Render Stop Bead",
    descriptionLine: "Aluminium or PVC render stop bead — exterior and interior render edge termination — USG Boral distribution",
    productType: "Aluminium or PVC render stop bead — edge termination",
    filterTags: ["Render-stop", "Aluminium", "PVC", "Edge-termination", "Masonry", "Concrete", "Exterior", "Interior"],
    techChips: [
      { label: "Aluminium or PVC", cls: "bg-amber-100 text-amber-800" },
      { label: "Render stop / edge", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior and interior", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "USG Boral distributes aluminium and PVC render stop beads for render edge termination. Confirm material (aluminium or PVC), leg dimensions, and available profiles with USG Boral. In coastal environments specify PVC or stainless steel render stop beads. TODO: owner confirm — USG Boral render stop bead specification and available materials.",
    technicalProperties: [
      "Aluminium or PVC — confirm material for environment",
      "Render stop / screed guide",
      "Exterior and interior applications",
      "Confirm leg and flange dimensions from USG Boral",
    ],
    limitations: [
      "TODO: owner confirm — USG Boral render stop bead specification and materials",
      "Aluminium not suitable for coastal — specify PVC or stainless",
    ],
    procurementSources: [
      { name: "USG Boral", url: "https://www.usgboral.com.au" },
      { name: "Builders merchants nationally", url: "https://www.usgboral.com.au" },
    ],
  },
  {
    fullLabel: "Trade Supply",
    brandUrl: "https://www.tradelink.com.au",
    tdsUrl: "https://www.tradelink.com.au",
    accentColor: "#0f766e",
    name: "Trade-Supply Render Stop / Screed Bead",
    descriptionLine: "Trade-supply aluminium and PVC render stop and screed beads — various leg profiles — available through render and plasterboard merchants nationally",
    productType: "Trade-supply render stop and screed bead",
    filterTags: ["Render-stop", "Screed-bead", "Aluminium", "PVC", "Edge-termination", "Masonry", "Exterior", "Interior"],
    techChips: [
      { label: "Trade supply", cls: "bg-teal-100 text-teal-800" },
      { label: "Aluminium or PVC", cls: "bg-slate-100 text-slate-700" },
      { label: "Various profiles", cls: "bg-green-50 text-green-700" },
      { label: "Confirm dimensions", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Render stop and screed beads are widely available as standard stock items through plasterboard merchants and render suppliers. Confirm material (aluminium or PVC), leg dimensions, and flange type when ordering for specific applications. In coastal environments, specify PVC render stop beads or stainless steel.",
    technicalProperties: [
      "Standard stock item — widely available",
      "Aluminium or PVC (confirm material)",
      "Various leg profiles",
      "Interior and exterior applications",
    ],
    limitations: [
      "Confirm material and UV stabilisation for exterior use",
      "Aluminium not suitable for coastal — specify PVC",
      "Confirm leg dimensions",
    ],
    procurementSources: [
      { name: "Tradelink", url: "https://www.tradelink.com.au" },
      { name: "Render and plasterboard merchants nationally", url: "https://www.tradelink.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Render-stop", label: "Render-stop" },
  { id: "Screed-bead", label: "Screed-bead" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "PVC", label: "PVC" },
  { id: "Edge-termination", label: "Edge-termination" },
  { id: "Control-joint", label: "Control-joint" },
  { id: "Masonry", label: "Masonry" },
  { id: "Concrete", label: "Concrete" },
  { id: "Exterior", label: "Exterior" },
  { id: "Interior", label: "Interior" },
  { id: "Slab-soffit", label: "Slab-soffit" },
  { id: "Window-head", label: "Window-head" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  material: string;
  profile: string;
  legSize: string;
  screedGuide: string;
  coastal: string;
  primaryUse: string;
}[] = [
  {
    product: "Rondo Aluminium Render Stop Bead",
    brand: "Rondo Building Services",
    material: "Aluminium",
    profile: "Render stop / screed bead",
    legSize: "Confirm from Rondo",
    screedGuide: "Yes — confirm",
    coastal: "Not suitable — use PVC or stainless",
    primaryUse: "Render termination — slab soffits, window heads, panel joints",
  },
  {
    product: "USG Boral Aluminium / PVC Render Stop Bead",
    brand: "USG Boral / Beadex",
    material: "Aluminium or PVC",
    profile: "Render stop",
    legSize: "Confirm from USG Boral",
    screedGuide: "Confirm from supplier",
    coastal: "PVC suitable — aluminium not",
    primaryUse: "Render edge termination — exterior and interior",
  },
  {
    product: "Trade-Supply Render Stop / Screed Bead",
    brand: "Trade supply",
    material: "Aluminium or PVC",
    profile: "Render stop / screed",
    legSize: "Various — confirm from merchant",
    screedGuide: "Confirm from supplier",
    coastal: "PVC suitable — aluminium not",
    primaryUse: "Render termination — widely available nationally",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Render termination at slab soffits — defines clean render edge at horizontal soffit/wall junction",
    "Window and door head render termination — stop bead at top of render to window head",
    "Render termination at substrate changes — junction between masonry render and other cladding types",
    "Control joint termination — render stop bead installed on both sides of a control joint",
    "Render thickness screed guide — used to control render depth across large facade areas",
  ],
  selectionCriteria: [
    "Material — aluminium for sheltered environments; PVC for coastal or corrosive environments",
    "Leg length — match to render depth",
    "Flange type — confirm perforated flange for render key",
    "Profile — confirm stop bead or screed bead profile is correct for the application",
    "Installation — bead must be straight and plumb — use string line to align",
  ],
  limitations: [
    "Render stop beads are edge termination profiles, not movement joints — do not use at locations requiring movement capacity",
    "Correct alignment is critical — a crooked stop bead will show as a visible defect in the finished render",
    "Not suitable as a substitute for a movement bead at expansion joints",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures",
    "Manufacturer product guide — leg dimensions and profiles",
    "NCC Volume One — facade weatherproofing requirements",
  ],
  suitableDefects: [
    "Render reinstatement at slab soffit edges — stop bead installed as part of render replacement works",
    "Window head render repair — stop bead replaced where original was corroded or missing",
    "Full facade re-render — stop beads installed at all termination lines as part of new render system",
  ],
  typicalSubstrates: [
    "Masonry — brick and block",
    "AAC — lightweight block",
    "Concrete — external facade panels",
    "Render substrate — where re-rendering over existing substrate",
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

export function RenderStopBeadIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are render stop beads and screed beads?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Render stop beads (also called screed beads) are extruded aluminium or PVC profiles installed at the edges and termination lines of render to provide a clean, straight finish at junctions with soffits, window heads, control joints, and changes of substrate.
        </p>
        {expanded && (
          <>
            <p>
              Unlike corner beads which protect render at external corners, stop beads define where the render ends — providing a precise, sharp termination line rather than a feathered or cut edge. They also function as screed guides to control render depth during application. Render stop beads must be installed straight and level using a string line — a misaligned stop bead will create a visible defect in the finished render surface.
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

export function RenderStopBeadProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — render stop beads and screed beads — scroll to view all</p>
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
              Side-by-side comparison of render stop bead and screed bead products. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Profile</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Leg size</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Screed guide</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coastal</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.profile}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.legSize}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.screedGuide}</td>
                  <td className="px-4 py-3 text-slate-600">{row.coastal}</td>
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
