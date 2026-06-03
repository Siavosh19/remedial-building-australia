"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "PVC"
  | "UV-stabilised"
  | "Lightweight"
  | "External-corner"
  | "Masonry"
  | "AAC"
  | "Render"
  | "Exterior"
  | "Interior"
  | "Corrosion-resistant"
  | "Perforated-flange";

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
    name: "Rondo PVC Corner Bead (UV-stabilised)",
    descriptionLine: "UV-stabilised PVC arris corner bead — lightweight, corrosion-resistant — exterior and interior render corners on masonry and AAC substrates",
    productType: "UV-stabilised PVC arris corner bead",
    filterTags: ["PVC", "UV-stabilised", "Lightweight", "External-corner", "Masonry", "AAC", "Render", "Exterior", "Interior", "Corrosion-resistant", "Perforated-flange"],
    techChips: [
      { label: "UV-stabilised PVC", cls: "bg-sky-100 text-sky-800" },
      { label: "Corrosion-resistant", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior and interior", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "UV-stabilised PVC arris corner beads are a lightweight corrosion-resistant alternative to metal beads. They are suitable for use in all environments including coastal and corrosive zones. PVC beads do not corrode, making them suitable for applications where metal bead corrosion would be a risk. Confirm UV stabilisation grade, leg dimensions, and material thickness with Rondo for external UV-exposed applications. TODO: owner confirm — Rondo PVC arris bead specification, UV grade and leg dimensions.",
    technicalProperties: [
      "UV-stabilised PVC — corrosion-resistant",
      "Perforated flanges for render key",
      "Suitable for exterior and interior",
      "All environments including coastal",
      "Confirm leg dimensions from Rondo",
      "Lightweight — easier to handle than metal",
    ],
    limitations: [
      "Less impact-resistant than heavy duty metal beads — avoid at high-traffic corners",
      "Confirm UV stabilisation grade for long-term exterior UV exposure",
      "TODO: owner confirm — Rondo PVC arris bead specification and UV grade",
      "PVC may soften slightly at very high surface temperatures",
    ],
    procurementSources: [
      { name: "Rondo Building Services", url: "https://www.rondo.com.au" },
      { name: "Plasterboard and render merchants nationally", url: "https://www.rondo.com.au" },
    ],
  },
  {
    fullLabel: "USG Boral",
    brandUrl: "https://www.usgboral.com.au",
    tdsUrl: "https://www.usgboral.com.au",
    accentColor: "#92400e",
    name: "USG Boral PVC Arris Bead",
    descriptionLine: "PVC arris corner bead — exterior and interior render — corrosion-resistant — USG Boral distribution",
    productType: "PVC arris corner bead — all environments",
    filterTags: ["PVC", "UV-stabilised", "Lightweight", "External-corner", "Masonry", "Render", "Exterior", "Interior"],
    techChips: [
      { label: "PVC", cls: "bg-amber-100 text-amber-800" },
      { label: "USG Boral", cls: "bg-slate-100 text-slate-700" },
      { label: "All environments", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "USG Boral supplies PVC arris and corner beads for render edge protection. Confirm the specific USG Boral PVC arris bead product, leg dimensions, and UV stabilisation specification with USG Boral. TODO: owner confirm — USG Boral PVC arris bead specification and dimensions.",
    technicalProperties: [
      "PVC — corrosion-resistant",
      "Exterior and interior render",
      "Confirm leg dimensions from USG Boral",
      "Perforated flanges for render key",
    ],
    limitations: [
      "TODO: owner confirm — USG Boral PVC arris bead specification",
      "Confirm UV stabilisation for exterior use",
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
    name: "Trade-Supply PVC Corner and Arris Bead",
    descriptionLine: "Trade-supply UV-stabilised PVC arris and corner beads — 25mm and 35mm leg — available through render and plasterboard merchants nationally",
    productType: "Trade-supply PVC arris corner bead",
    filterTags: ["PVC", "UV-stabilised", "Lightweight", "External-corner", "Masonry", "AAC", "Render", "Exterior", "Interior", "Corrosion-resistant"],
    techChips: [
      { label: "Trade supply", cls: "bg-teal-100 text-teal-800" },
      { label: "UV-stabilised PVC", cls: "bg-slate-100 text-slate-700" },
      { label: "25 and 35mm leg", cls: "bg-green-50 text-green-700" },
      { label: "Confirm UV grade", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "PVC arris and corner beads are widely available as standard stock items through plasterboard merchants and render suppliers nationally. Confirm the UV stabilisation grade when purchasing for external exposed applications — not all trade-supply PVC beads are UV-stabilised to the same standard for long-term exterior use.",
    technicalProperties: [
      "Standard stock item — widely available",
      "25mm and 35mm leg profiles",
      "UV-stabilised PVC (confirm grade from supplier)",
      "Corrosion-resistant — suitable for coastal environments",
      "Interior and exterior",
    ],
    limitations: [
      "Confirm UV stabilisation grade for exterior exposed applications",
      "Less impact-resistant than metal heavy duty beads",
      "Confirm leg dimensions for render depth",
    ],
    procurementSources: [
      { name: "Tradelink", url: "https://www.tradelink.com.au" },
      { name: "Plasterboard merchants and render suppliers nationally", url: "https://www.tradelink.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "PVC", label: "PVC" },
  { id: "UV-stabilised", label: "UV-stabilised" },
  { id: "Lightweight", label: "Lightweight" },
  { id: "External-corner", label: "External-corner" },
  { id: "Masonry", label: "Masonry" },
  { id: "AAC", label: "AAC" },
  { id: "Render", label: "Render" },
  { id: "Exterior", label: "Exterior" },
  { id: "Interior", label: "Interior" },
  { id: "Corrosion-resistant", label: "Corrosion-resistant" },
  { id: "Perforated-flange", label: "Perforated-flange" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  material: string;
  uvStabilised: string;
  legSize: string;
  impactResistance: string;
  suitableEnvironment: string;
  primaryUse: string;
}[] = [
  {
    product: "Rondo PVC Corner Bead (UV-stabilised)",
    brand: "Rondo Building Services",
    material: "UV-stabilised PVC",
    uvStabilised: "Yes — confirm grade",
    legSize: "Confirm from Rondo",
    impactResistance: "Lower than metal heavy duty",
    suitableEnvironment: "All environments including coastal",
    primaryUse: "Exterior and interior render corners — corrosion-free",
  },
  {
    product: "USG Boral PVC Arris Bead",
    brand: "USG Boral",
    material: "PVC",
    uvStabilised: "Confirm from USG Boral",
    legSize: "Confirm from USG Boral",
    impactResistance: "Lower than metal heavy duty",
    suitableEnvironment: "All environments",
    primaryUse: "Exterior and interior render corner protection",
  },
  {
    product: "Trade-Supply PVC Corner and Arris Bead",
    brand: "Trade supply",
    material: "UV-stabilised PVC",
    uvStabilised: "Confirm grade from supplier",
    legSize: "25mm or 35mm",
    impactResistance: "Lower than metal heavy duty",
    suitableEnvironment: "All environments including coastal",
    primaryUse: "Render corner protection — widely available nationally",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Coastal and marine facade render corners where metal bead corrosion is a risk",
    "Interior render corners where lightweight handling is preferred",
    "External render corners in all environments where corrosion resistance is required",
    "Window and door reveals — PVC corner protection at reveal edges",
    "Strata facades in coastal environments where replacement of corroded aluminium beads is required",
  ],
  selectionCriteria: [
    "UV stabilisation — confirm UV-stabilised grade for external exposed applications",
    "Leg length — match to render depth",
    "Impact resistance — PVC is less impact-resistant than metal heavy duty — avoid at high-traffic corners",
    "Environment — PVC is suitable in all environments including coastal",
    "Cost — PVC is generally lower cost than stainless steel",
  ],
  limitations: [
    "Lower impact resistance than heavy duty metal beads",
    "UV stabilisation must be confirmed for external exposed applications — some trade-supply PVC products have inadequate UV resistance for long-term exterior exposure",
    "May soften slightly in very high surface temperatures (metal beads preferred at sun-exposed dark-coloured facades in hot climates)",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures",
    "NCC Volume One — facade weatherproofing",
    "Manufacturer product guide — confirm UV stabilisation and leg dimensions",
  ],
  suitableDefects: [
    "Corroded aluminium bead replacement — PVC used as corrosion-resistant alternative",
    "Render corner repair where new bead is specified",
    "Coastal facade render reinstallation — PVC specified for all corner beads",
  ],
  typicalSubstrates: [
    "Masonry — brick and block",
    "AAC — lightweight block",
    "Render substrate",
    "Concrete — external facade panels",
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

export function PVCArrisIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are PVC arris and corner angle beads?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          UV-stabilised PVC arris and corner angle beads are a lightweight, corrosion-resistant alternative to aluminium and stainless steel render beads. Unlike metal beads, PVC does not corrode in coastal or corrosive environments, making it a cost-effective choice for coastal facades where stainless steel beads would otherwise be required.
        </p>
        {expanded && (
          <>
            <p>
              PVC beads are suitable for interior and exterior render in all environments, provided the correct UV-stabilised grade is specified for external exposed applications. They are generally less impact-resistant than heavy duty aluminium or stainless steel beads, so they are not the preferred specification at high-traffic corners subject to mechanical impact. Confirm UV stabilisation grade, leg dimensions, and perforated flange type with the supplier for each application.
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

export function PVCArrisProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — PVC arris and corner angle beads — scroll to view all</p>
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
              Side-by-side comparison of PVC arris and corner angle bead products. Confirm all product selections against the current manufacturer TDS before specifying.
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
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">UV stabilised</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Leg size</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Impact resistance</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Suitable environment</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.uvStabilised}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.legSize}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.impactResistance}</td>
                  <td className="px-4 py-3 text-slate-600">{row.suitableEnvironment}</td>
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
