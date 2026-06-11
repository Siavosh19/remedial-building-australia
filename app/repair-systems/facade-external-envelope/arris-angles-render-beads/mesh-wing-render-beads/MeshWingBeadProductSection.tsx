"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Mesh-wing"
  | "Fibreglass-mesh"
  | "Aluminium"
  | "PVC"
  | "Corner-bead"
  | "Stop-bead"
  | "Exterior"
  | "Interior"
  | "Masonry"
  | "AAC"
  | "Render"
  | "Crack-resistant"
  | "EIFS";

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
    accentColor: "#0369a1",
    name: "Rondo Mesh-Wing Corner / Stop Bead",
    descriptionLine: "Aluminium or PVC angle and stop bead with integral fibreglass mesh wings — embed mesh in render base coat for improved corner and edge reinforcement — exterior and interior facade",
    productType: "Mesh-wing render bead — corner and edge reinforcement",
    filterTags: ["Mesh-wing", "Fibreglass-mesh", "Aluminium", "PVC", "Corner-bead", "Stop-bead", "Exterior", "Interior", "Masonry", "AAC", "Render", "Crack-resistant"],
    techChips: [
      { label: "Integral mesh wings", cls: "bg-sky-100 text-sky-800" },
      { label: "Corner + edge reinforcement", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior and interior", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Rondo mesh-wing render beads are angle beads and stop beads with factory-attached alkali-resistant fibreglass mesh wings on each flange. The mesh wings are embedded in the render base coat at the time of application to provide reinforcement at render corners and edges — reducing stress cracking and improving impact resistance at these vulnerable locations. The mesh wing extends from the bead body approximately 50–100mm onto the render surface on each side. Confirm mesh wing width, bead profile, and available materials with Rondo. TODO: owner confirm — Rondo mesh-wing bead specification, mesh width and available profiles.",
    technicalProperties: [
      "Integral alkali-resistant fibreglass mesh wings — embedded in render base coat",
      "Mesh wing extends approximately 50–100mm on each side of bead — confirm from Rondo",
      "Available as corner bead and stop bead profiles",
      "Exterior and interior masonry, AAC and concrete render",
      "Mesh reduces stress cracking at render corners and edges",
      "Confirm material (aluminium or PVC) and mesh grade for specific application",
    ],
    limitations: [
      "Mesh wings must be fully embedded in render base coat — mesh must not be visible in finished render",
      "TODO: owner confirm — Rondo mesh-wing bead specification, mesh width and profiles",
      "Mesh wing requires sufficient render thickness over it — confirm minimum DFT for mesh coverage",
      "Fibreglass mesh must be alkali-resistant (AR) grade — not standard glass fibre",
    ],
    procurementSources: [
      { name: "Rondo Building Services", url: "https://www.rondo.com.au" },
      { name: "Render and plasterboard merchants nationally", url: "https://www.rondo.com.au" },
    ],
  },
  {
    fullLabel: "USG Boral / Beadex",
    brandUrl: "https://www.usgboral.com.au",
    accentColor: "#92400e",
    name: "USG Boral Mesh-Wing Corner / Edge Bead",
    descriptionLine: "Aluminium or PVC corner or edge bead with integral fibreglass mesh wings — render base coat reinforcement at corners and edge terminations — exterior facade",
    productType: "Mesh-wing render bead — corner and edge reinforcement",
    filterTags: ["Mesh-wing", "Fibreglass-mesh", "Aluminium", "PVC", "Corner-bead", "Exterior", "Masonry", "Render", "Crack-resistant"],
    techChips: [
      { label: "Mesh-wing", cls: "bg-amber-100 text-amber-800" },
      { label: "Corner reinforcement", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior masonry", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "USG Boral / Beadex supplies mesh-wing render beads with integral fibreglass mesh wings for corner and edge reinforcement. Confirm bead profile, mesh wing width, and available materials with USG Boral. TODO: owner confirm — USG Boral mesh-wing bead specification and dimensions.",
    technicalProperties: [
      "Integral fibreglass mesh wings",
      "Corner and stop bead profiles",
      "Exterior render reinforcement",
      "Confirm mesh width and material from USG Boral",
    ],
    limitations: [
      "TODO: owner confirm — USG Boral mesh-wing bead specification",
      "Mesh must be fully embedded in render",
    ],
    procurementSources: [
      { name: "USG Boral", url: "https://www.usgboral.com.au" },
      { name: "Builders merchants nationally", url: "https://www.usgboral.com.au" },
    ],
  },
  {
    fullLabel: "Trade Supply",
    brandUrl: "https://www.tradelink.com.au",
    accentColor: "#0f766e",
    name: "Trade-Supply Mesh-Wing Render Bead (PVC / Aluminium)",
    descriptionLine: "PVC and aluminium mesh-wing beads — integral fibreglass mesh for render reinforcement — render and plasterboard merchants nationally",
    productType: "Trade-supply mesh-wing render bead",
    filterTags: ["Mesh-wing", "Fibreglass-mesh", "PVC", "Aluminium", "Corner-bead", "Exterior", "Masonry", "AAC", "Render"],
    techChips: [
      { label: "Trade supply", cls: "bg-teal-100 text-teal-800" },
      { label: "Mesh-wing", cls: "bg-slate-100 text-slate-700" },
      { label: "Corner reinforcement", cls: "bg-green-50 text-green-700" },
      { label: "Confirm mesh grade", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Mesh-wing render beads are available through specialist render suppliers and plasterboard merchants. Confirm that the fibreglass mesh is alkali-resistant (AR) grade before purchasing for use in cementitious render systems — standard glass fibre mesh is not suitable in alkaline cementitious environments.",
    technicalProperties: [
      "Trade supply — render specialists and merchants",
      "PVC or aluminium bead body",
      "Integral fibreglass mesh wings",
      "Confirm AR (alkali-resistant) mesh grade for cementitious render",
    ],
    limitations: [
      "Confirm AR mesh grade — not all trade-supply mesh-wing beads use alkali-resistant mesh",
      "Mesh must be fully embedded in render base coat",
      "Confirm mesh wing width for render panel coverage",
    ],
    procurementSources: [
      { name: "Specialist render suppliers nationally", url: "https://www.tradelink.com.au" },
      { name: "Tradelink", url: "https://www.tradelink.com.au" },
      { name: "Plasterboard merchants", url: "https://www.tradelink.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Mesh-wing", label: "Mesh wing" },
  { id: "Fibreglass-mesh", label: "Fibreglass mesh" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "PVC", label: "PVC" },
  { id: "Corner-bead", label: "Corner bead" },
  { id: "Stop-bead", label: "Stop bead" },
  { id: "Exterior", label: "Exterior" },
  { id: "Interior", label: "Interior" },
  { id: "Masonry", label: "Masonry" },
  { id: "AAC", label: "AAC" },
  { id: "Render", label: "Render" },
  { id: "Crack-resistant", label: "Crack resistant" },
  { id: "EIFS", label: "EIFS" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  beadMaterial: string;
  meshType: string;
  meshWingWidth: string;
  arGrade: string;
  suitableApplication: string;
  primaryUse: string;
}[] = [
  {
    product: "Rondo Mesh-Wing Bead",
    brand: "Rondo",
    beadMaterial: "Aluminium or PVC",
    meshType: "Fibreglass mesh",
    meshWingWidth: "50–100mm each side — confirm from Rondo",
    arGrade: "Confirm AR grade from Rondo",
    suitableApplication: "Exterior and interior — masonry, AAC, concrete",
    primaryUse: "Corner and edge reinforcement — render systems",
  },
  {
    product: "USG Boral Mesh-Wing Bead",
    brand: "USG Boral / Beadex",
    beadMaterial: "Aluminium or PVC",
    meshType: "Fibreglass mesh",
    meshWingWidth: "Confirm from USG Boral",
    arGrade: "Confirm AR grade from USG Boral",
    suitableApplication: "Exterior masonry render",
    primaryUse: "Corner and edge reinforcement",
  },
  {
    product: "Trade-Supply Mesh-Wing Bead",
    brand: "Trade Supply",
    beadMaterial: "PVC or aluminium",
    meshType: "Fibreglass mesh — confirm AR grade",
    meshWingWidth: "Confirm from supplier",
    arGrade: "Confirm AR grade — not all trade supply",
    suitableApplication: "Exterior masonry, AAC — confirm application",
    primaryUse: "Corner reinforcement — trade supply",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Render corners on high-impact facades where standard corner beads have failed by delamination cracking",
    "EIFS render reinforcement — mesh-wing beads at corners and edges where additional mesh reinforcement is required",
    "Exterior render corners on AAC lightweight construction where render-to-AAC bonding is marginal",
    "Re-rendering after full render removal — mesh-wing beads installed at all corners and terminations where crack risk is elevated",
    "Window and door reveal corners — mesh-wing reveal beads for improved corner reinforcement",
  ],
  selectionCriteria: [
    "Mesh type — must be alkali-resistant (AR) fibreglass for use in cementitious render systems",
    "Mesh wing width — wider mesh wings provide more reinforcement coverage — typically 50–100mm each side",
    "Render depth — sufficient render depth must be available to fully embed the mesh wing",
    "Bead profile — corner bead, stop bead, or reveal bead with mesh — confirm profile for application",
    "Material — aluminium or PVC bead body — confirm for environment",
  ],
  limitations: [
    "Mesh must be fully embedded in render base coat — protruding mesh will telegraph through the finished render surface",
    "Mesh must be alkali-resistant (AR) grade — standard glass fibre mesh will degrade rapidly in cementitious environments",
    "Sufficient render depth required to cover mesh — minimum render thickness must cover the mesh wing completely",
    "Not a substitute for correct render mix design and substrate preparation",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures",
    "NCC Volume One — facade performance",
    "Manufacturer product guide — mesh specification, wing width and installation details",
    "Fibreglass mesh specification — confirm AR (alkali-resistant) grade from supplier",
  ],
  suitableDefects: [
    "Render corner delamination and cracking — where mesh-wing beads provide additional reinforcement to prevent recurrence",
    "Re-rendering on facades with a history of corner cracking and bead failure",
    "EIFS corner reinforcement — where additional mesh integration at bead is required",
  ],
  typicalSubstrates: [
    "Masonry — brick and block",
    "AAC — lightweight block",
    "Concrete — external facade panels",
    "Render substrate — where full removal and replacement with mesh-wing beads is specified",
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

export function MeshWingBeadIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are mesh-wing render beads?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Mesh-wing render beads are arris angle beads and stop beads with factory-attached alkali-resistant fibreglass mesh wings integrated into the bead flanges. The mesh wings extend from the bead body and are embedded in the render base coat during application, providing reinforcement at render corners and edges.
        </p>
        {expanded && (
          <>
            <p>
              Unlike standard perforated-flange arris beads that rely on the perforations for mechanical key into the render, mesh-wing beads provide additional tensile reinforcement at the most vulnerable parts of the render system — the corners and edge terminations where render cracking typically initiates. The fibreglass mesh must be alkali-resistant (AR) grade — standard glass fibre mesh rapidly degrades in alkaline cementitious environments. Mesh wings must be fully covered by the render base coat — protruding mesh will show through the finished surface.
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

export function MeshWingBeadProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — mesh-wing render beads for corner and edge reinforcement — scroll to view all</p>
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
              Side-by-side comparison of mesh-wing render bead products. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Bead material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Mesh type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Mesh wing width</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">AR grade</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Suitable application</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.beadMaterial}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.meshType}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.meshWingWidth}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.arGrade}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.suitableApplication}</td>
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
