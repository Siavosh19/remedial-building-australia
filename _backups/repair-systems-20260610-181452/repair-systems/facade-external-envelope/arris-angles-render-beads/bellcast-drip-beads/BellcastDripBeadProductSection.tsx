"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Bellcast"
  | "Drip-profile"
  | "Water-shedding"
  | "Aluminium"
  | "PVC"
  | "Slab-edge"
  | "Window-sill"
  | "Exterior"
  | "Masonry"
  | "Concrete"
  | "Render-termination";

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
    name: "Rondo Aluminium Bellcast / Drip Bead",
    descriptionLine: "Aluminium bellcast and drip profile bead — forms bellcast or drip at slab edges and window sills — directs water away from facade substrate — exterior render",
    productType: "Aluminium bellcast / drip profile bead — render termination",
    filterTags: ["Bellcast", "Drip-profile", "Water-shedding", "Aluminium", "Slab-edge", "Window-sill", "Exterior", "Masonry", "Concrete", "Render-termination"],
    techChips: [
      { label: "Aluminium bellcast", cls: "bg-sky-100 text-sky-800" },
      { label: "Drip profile", cls: "bg-slate-100 text-slate-700" },
      { label: "Slab edge and sill", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Rondo aluminium bellcast beads are used at slab edges, window sills, and any horizontal render surface to form a bellcast or drip profile that directs water away from the facade substrate below. The bead is embedded in the render with perforated flanges while the bellcast nose projects beyond the render plane to create the drip. Confirm profile dimensions, nose projection, and leg specification with Rondo. TODO: owner confirm — Rondo aluminium bellcast/drip bead specification and available profiles.",
    technicalProperties: [
      "Aluminium bellcast nose with perforated flanges",
      "Forms drip profile at slab edges, window sills, and horizontal render terminations",
      "Directs water away from facade substrate",
      "Confirm nose projection and leg dimensions from Rondo",
      "Exterior use",
      "Confirm material for coastal environments — consider PVC or stainless in marine zones",
    ],
    limitations: [
      "Aluminium not suitable for coastal/marine environments — use PVC or stainless steel bellcast beads in corrosive zones",
      "TODO: owner confirm — Rondo bellcast bead specification, profile dimensions and availability",
      "Bellcast must project sufficiently beyond render face to create effective drip — confirm nose projection",
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
    name: "USG Boral Aluminium / PVC Drip Bead",
    descriptionLine: "Aluminium or PVC drip bead — render termination with drip profile — slab edges, window sills and horizontal render surfaces — exterior facade",
    productType: "Aluminium or PVC drip bead — horizontal render termination",
    filterTags: ["Drip-profile", "Water-shedding", "Aluminium", "PVC", "Slab-edge", "Window-sill", "Exterior", "Render-termination"],
    techChips: [
      { label: "Aluminium or PVC", cls: "bg-amber-100 text-amber-800" },
      { label: "Drip profile", cls: "bg-slate-100 text-slate-700" },
      { label: "Slab edge / sill", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "USG Boral / Beadex distributes aluminium and PVC drip beads for render edge termination with a formed drip profile at horizontal surfaces. Confirm material (aluminium or PVC for coastal), profile dimensions, and available leg lengths with USG Boral. TODO: owner confirm — USG Boral drip bead specification, material options and dimensions.",
    technicalProperties: [
      "Aluminium or PVC — confirm material for environment",
      "Drip profile at render termination",
      "Slab edges, window sills and horizontal surfaces",
      "Confirm nose projection and leg from USG Boral",
    ],
    limitations: [
      "TODO: owner confirm — USG Boral drip bead specification",
      "Aluminium not suitable for coastal — use PVC",
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
    name: "Trade-Supply Bellcast / Drip Bead (Aluminium or PVC)",
    descriptionLine: "Trade-supply aluminium or PVC bellcast and drip beads — various profiles — render and plasterboard merchant supply nationally",
    productType: "Trade-supply bellcast / drip profile bead",
    filterTags: ["Bellcast", "Drip-profile", "Water-shedding", "Aluminium", "PVC", "Exterior", "Render-termination"],
    techChips: [
      { label: "Trade supply", cls: "bg-teal-100 text-teal-800" },
      { label: "Aluminium or PVC", cls: "bg-slate-100 text-slate-700" },
      { label: "Various profiles", cls: "bg-green-50 text-green-700" },
      { label: "Confirm dimensions", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Bellcast and drip beads are available as standard stock items through render and plasterboard merchants nationally. Confirm material (aluminium or PVC), nose projection, leg dimension, and UV stabilisation (for PVC in exterior applications) when ordering. In coastal environments, specify PVC or stainless steel bellcast beads.",
    technicalProperties: [
      "Aluminium or PVC available",
      "Standard stock at render merchants",
      "Various nose projection and leg profiles",
      "Confirm material and dimensions from supplier",
    ],
    limitations: [
      "Confirm material for coastal environments — specify PVC or stainless",
      "Confirm UV stabilisation for PVC in exterior exposed applications",
      "Verify nose projection is adequate for effective drip",
    ],
    procurementSources: [
      { name: "Tradelink", url: "https://www.tradelink.com.au" },
      { name: "Render and plasterboard merchants nationally", url: "https://www.tradelink.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Bellcast", label: "Bellcast" },
  { id: "Drip-profile", label: "Drip profile" },
  { id: "Water-shedding", label: "Water shedding" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "PVC", label: "PVC" },
  { id: "Slab-edge", label: "Slab edge" },
  { id: "Window-sill", label: "Window sill" },
  { id: "Exterior", label: "Exterior" },
  { id: "Masonry", label: "Masonry" },
  { id: "Concrete", label: "Concrete" },
  { id: "Render-termination", label: "Render termination" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  material: string;
  noseProfile: string;
  legSize: string;
  coastal: string;
  primaryUse: string;
}[] = [
  {
    product: "Rondo Aluminium Bellcast / Drip Bead",
    brand: "Rondo",
    material: "Aluminium",
    noseProfile: "Bellcast / drip — confirm from Rondo",
    legSize: "Confirm from Rondo",
    coastal: "Not suitable — use PVC or SS",
    primaryUse: "Slab edges, window sills, horizontal render terminations",
  },
  {
    product: "USG Boral Drip Bead",
    brand: "USG Boral / Beadex",
    material: "Aluminium or PVC",
    noseProfile: "Drip profile — confirm from USG Boral",
    legSize: "Confirm from USG Boral",
    coastal: "PVC suitable — aluminium not suitable",
    primaryUse: "Horizontal render terminations — slab edges and sills",
  },
  {
    product: "Trade-Supply Bellcast / Drip Bead",
    brand: "Trade Supply",
    material: "Aluminium or PVC",
    noseProfile: "Various — confirm from supplier",
    legSize: "Various — confirm from supplier",
    coastal: "Specify PVC or SS for coastal",
    primaryUse: "General render termination — slab edges, sills",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Slab edge render termination — bellcast bead at lower edge of render at each floor level to shed water",
    "Window and door sill render — drip bead at sill soffit to direct water away from the wall below",
    "Horizontal render terminations — any exposed horizontal render surface where water run-off is needed",
    "Re-rendering of facades where original bellcast beads are missing or corroded",
  ],
  selectionCriteria: [
    "Material — aluminium for sheltered environments; PVC or stainless for coastal",
    "Nose projection — must project sufficiently beyond render face for an effective drip (typically minimum 10–15mm — confirm from manufacturer)",
    "Leg length — match to render depth",
    "Profile — bellcast (curved) versus sharp drip edge — confirm profile suits the architectural requirement",
  ],
  limitations: [
    "Nose must project beyond the render face to create an effective drip — flush beads do not shed water effectively",
    "Aluminium beads corrode in coastal environments — causing expansion, rust staining, and render delamination",
    "Ensure bellcast bead is installed level — an uneven bellcast will allow water to run back against the facade",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures",
    "NCC Volume One — facade weatherproofing",
    "Manufacturer product guide — confirm profile, leg dimensions and installation details",
  ],
  suitableDefects: [
    "Missing or corroded drip beads causing water ingress and render staining below slab edges",
    "Render delamination below horizontal surfaces caused by water running back against the facade",
    "Re-render works — bellcast beads installed at all slab edges and window sills as part of new render system",
  ],
  typicalSubstrates: [
    "Masonry — brick and block at slab edges",
    "Concrete — slab soffits and edges",
    "AAC — lightweight block at window sills",
    "Render substrate — where full removal and replacement of render is in scope",
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

export function BellcastDripBeadIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are bellcast and drip beads?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Bellcast and drip beads are extruded aluminium or PVC profiles installed at horizontal render terminations — particularly slab edges, window sills, and any exposed horizontal render surface — to form a drip profile that directs water away from the facade substrate and prevents water tracking back under the render edge.
        </p>
        {expanded && (
          <>
            <p>
              Without a properly formed drip, water running down a facade can track back against the wall at slab edges and sills, causing recurring dampness, staining, and render delamination below horizontal surfaces. Bellcast beads have a curved profile that tapers to a nose below the render plane; sharp-edge drip beads have a more angular profile. Both must project sufficiently beyond the render face to create an effective drip — a flush termination does not shed water effectively.
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

export function BellcastDripBeadProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — bellcast and drip profile beads — scroll to view all</p>
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
              Side-by-side comparison of bellcast and drip bead products. Confirm all product selections against the current manufacturer TDS before specifying.
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
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Nose profile</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Leg size</th>
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
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.noseProfile}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.legSize}</td>
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
