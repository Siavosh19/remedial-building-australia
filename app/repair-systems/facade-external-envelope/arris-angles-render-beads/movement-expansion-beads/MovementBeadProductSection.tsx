"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Movement-bead"
  | "Expansion-bead"
  | "Aluminium"
  | "PVC"
  | "Control-joint"
  | "Panel-joint"
  | "Substrate-change"
  | "Exterior"
  | "Masonry"
  | "Concrete"
  | "Thermal-movement";

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
    name: "Rondo Aluminium Movement / Expansion Bead",
    descriptionLine: "Aluminium movement and expansion bead — accommodates thermal and structural movement in render plane — panel joints and substrate changes — exterior facade render",
    productType: "Aluminium movement / expansion bead — render control joint",
    filterTags: ["Movement-bead", "Expansion-bead", "Aluminium", "Control-joint", "Panel-joint", "Substrate-change", "Exterior", "Masonry", "Concrete", "Thermal-movement"],
    techChips: [
      { label: "Aluminium movement bead", cls: "bg-sky-100 text-sky-800" },
      { label: "Control joint", cls: "bg-slate-100 text-slate-700" },
      { label: "Substrate changes", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Rondo aluminium movement beads are installed at render control joints to accommodate thermal and structural movement within the render plane at panel joints, substrate changes, and locations where differential movement is anticipated. The bead consists of two render-keying flanges separated by a flexible central section or gap that allows render on each side to move independently. Confirm profile dimensions, movement capacity, and available materials with Rondo. TODO: owner confirm — Rondo aluminium movement bead specification, movement capacity and profile dimensions.",
    technicalProperties: [
      "Aluminium movement bead — two flanges with flexible or open central section",
      "Accommodates thermal and structural movement at render control joints",
      "Suitable at panel joints, substrate changes, and building expansion joints",
      "Confirm movement capacity from Rondo",
      "Exterior and interior applications",
      "Confirm material for coastal environments — consider PVC in corrosive zones",
    ],
    limitations: [
      "Aluminium not suitable for coastal environments without PVC or stainless alternative",
      "TODO: owner confirm — Rondo movement bead specification and movement capacity",
      "Not suitable for structural movement joints — for large structural movement a cover plate system is required",
      "Sealant may be required within the movement bead gap — confirm with manufacturer",
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
    name: "USG Boral Aluminium / PVC Movement Bead",
    descriptionLine: "Aluminium or PVC movement bead — render expansion and control joints — exterior facade panels and substrate changes",
    productType: "Aluminium or PVC movement / expansion bead",
    filterTags: ["Movement-bead", "Expansion-bead", "Aluminium", "PVC", "Control-joint", "Panel-joint", "Exterior", "Masonry", "Concrete"],
    techChips: [
      { label: "Aluminium or PVC", cls: "bg-amber-100 text-amber-800" },
      { label: "Movement / expansion", cls: "bg-slate-100 text-slate-700" },
      { label: "Panel and substrate joints", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "USG Boral / Beadex supplies aluminium and PVC movement beads for render expansion and control joints. Confirm material, profile, and movement capacity with USG Boral for each application. TODO: owner confirm — USG Boral movement bead specification, material options and dimensions.",
    technicalProperties: [
      "Aluminium or PVC movement bead",
      "Render control and expansion joints",
      "Confirm movement capacity and profile from USG Boral",
      "Exterior and interior applications",
    ],
    limitations: [
      "TODO: owner confirm — USG Boral movement bead specification",
      "Aluminium not suitable for coastal — specify PVC",
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
    name: "Trade-Supply PVC Movement / Expansion Bead",
    descriptionLine: "PVC movement and expansion beads — render control joints at substrate changes and panel joints — trade supply nationally",
    productType: "PVC movement / expansion bead — render control joint",
    filterTags: ["Movement-bead", "Expansion-bead", "PVC", "Control-joint", "Exterior", "Masonry", "Concrete", "Thermal-movement"],
    techChips: [
      { label: "PVC", cls: "bg-teal-100 text-teal-800" },
      { label: "Movement joint", cls: "bg-slate-100 text-slate-700" },
      { label: "Trade supply", cls: "bg-green-50 text-green-700" },
      { label: "Confirm dimensions", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "PVC movement and expansion beads are available through render merchants and builders suppliers nationally. PVC is preferred in coastal environments. Confirm profile dimensions, movement capacity, and UV stabilisation (for external applications) from the supplier.",
    technicalProperties: [
      "PVC — corrosion-resistant",
      "Render movement and control joints",
      "Trade supply — widely available",
      "Confirm profile and movement capacity from supplier",
      "UV stabilised for exterior use (confirm grade)",
    ],
    limitations: [
      "Confirm UV stabilisation for exterior exposed applications",
      "Confirm movement capacity — PVC may have different movement capacity than aluminium versions",
      "Not suitable for large structural movement joints",
    ],
    procurementSources: [
      { name: "Tradelink", url: "https://www.tradelink.com.au" },
      { name: "Render and plasterboard merchants nationally", url: "https://www.tradelink.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Movement-bead", label: "Movement bead" },
  { id: "Expansion-bead", label: "Expansion bead" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "PVC", label: "PVC" },
  { id: "Control-joint", label: "Control joint" },
  { id: "Panel-joint", label: "Panel joint" },
  { id: "Substrate-change", label: "Substrate change" },
  { id: "Exterior", label: "Exterior" },
  { id: "Masonry", label: "Masonry" },
  { id: "Concrete", label: "Concrete" },
  { id: "Thermal-movement", label: "Thermal movement" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  material: string;
  profileType: string;
  movementCapacity: string;
  coastal: string;
  primaryUse: string;
}[] = [
  {
    product: "Rondo Aluminium Movement Bead",
    brand: "Rondo",
    material: "Aluminium",
    profileType: "Two-flange — confirm from Rondo",
    movementCapacity: "Confirm from Rondo",
    coastal: "Not suitable — use PVC",
    primaryUse: "Panel joints, substrate changes, control joints",
  },
  {
    product: "USG Boral Movement Bead",
    brand: "USG Boral / Beadex",
    material: "Aluminium or PVC",
    profileType: "Confirm from USG Boral",
    movementCapacity: "Confirm from USG Boral",
    coastal: "PVC suitable — aluminium not suitable",
    primaryUse: "Render expansion and control joints",
  },
  {
    product: "Trade-Supply PVC Movement Bead",
    brand: "Trade Supply",
    material: "PVC",
    profileType: "Various — confirm from supplier",
    movementCapacity: "Confirm from supplier",
    coastal: "PVC suitable for coastal",
    primaryUse: "Render control joints — substrate changes and panel joints",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Control joints in large render panels — typically required at maximum 4.5m centres in each direction on exterior render (confirm with engineer)",
    "Substrate changes — render movement bead at junction between different substrates (masonry to concrete, masonry to steel)",
    "Slab or panel joints — render movement bead at structural expansion or construction joints",
    "Re-rendering works — movement beads installed at all control joint locations as part of new render system",
  ],
  selectionCriteria: [
    "Location — identify all substrate changes, panel joints, and areas requiring control joints before specifying",
    "Material — aluminium for sheltered environments; PVC for coastal and corrosive environments",
    "Movement capacity — confirm the bead's rated movement capacity matches the anticipated movement at each joint location",
    "Sealant — confirm whether sealant is required within the bead gap, and the compatible sealant type",
  ],
  limitations: [
    "Movement beads provide limited movement capacity — they are not suitable for large structural expansion joints where a cover plate or strip seal system is required",
    "Control joint spacing must be determined by a structural or facade engineer — beads are just the edge profile",
    "Aluminium beads corrode in coastal environments causing render staining and delamination",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures (control joint requirements in masonry and render)",
    "NCC Volume One — facade weatherproofing",
    "Manufacturer product guide — movement capacity and installation details",
    "Structural engineer advice — control joint layout and spacing",
  ],
  suitableDefects: [
    "Render cracking at panel joints and substrate changes — caused by uncontrolled movement without proper control joints",
    "Re-rendering after full render removal — movement beads installed at all required locations",
    "Render cracking at control joint locations where original beads were absent or incorrectly specified",
  ],
  typicalSubstrates: [
    "Masonry — brick and block facades",
    "Concrete — external concrete facade panels",
    "AAC — lightweight block construction",
    "Mixed substrate facades — at junctions between different substrate types",
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

export function MovementBeadIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are movement and expansion beads for render?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Movement and expansion beads are installed at render control joints to accommodate thermal expansion, contraction, and structural movement within the render plane, preventing uncontrolled cracking at panel joints, substrate changes, and building expansion joints.
        </p>
        {expanded && (
          <>
            <p>
              Render is susceptible to cracking at locations where differential movement occurs — particularly at junctions between different substrate types, at structural expansion joints, and across large uninterrupted render panels. Movement beads provide a planned termination at each side of the control joint, allowing each render panel to expand and contract independently. Control joint spacing and locations must be determined by a structural or facade engineer — the bead is the edge profile, not a substitute for engineering design.
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

export function MovementBeadProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — movement and expansion beads for render control joints — scroll to view all</p>
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
              Side-by-side comparison of movement and expansion bead products. Confirm all product selections against the current manufacturer TDS before specifying.
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
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Profile type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Movement capacity</th>
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
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.profileType}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.movementCapacity}</td>
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
