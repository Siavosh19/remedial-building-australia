"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Backing-rod"
  | "Bond-breaker"
  | "Closed-cell"
  | "Open-cell"
  | "PE-foam"
  | "PE-tape"
  | "Facade-joint"
  | "Control-joint"
  | "Wide-joint"
  | "Waterproofing-joint";

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
    fullLabel: "Sika",
    brandUrl: "https://aus.sika.com",
    accentColor: "#D2000F",
    name: "Sika Backing Rod",
    descriptionLine: "Closed-cell polyethylene foam backing rod — movement joint depth control for silicone and PU sealants",
    productType: "Closed-cell PE foam backing rod",
    filterTags: ["Backing-rod", "Closed-cell", "PE-foam", "Facade-joint", "Control-joint", "Waterproofing-joint"],
    techChips: [
      { label: "Closed-cell PE", cls: "bg-red-50 text-red-700" },
      { label: "Depth control", cls: "bg-slate-100 text-slate-700" },
      { label: "2-point adhesion", cls: "bg-sky-50 text-sky-700" },
      { label: "Multiple diameters", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Sika closed-cell polyethylene foam backing rod for controlling the depth of movement joint sealant and ensuring correct two-point adhesion (adhesion to the two sides of the joint only — not the back). Available in 6mm to 50mm diameters. Used in facade joint sealing, balcony waterproofing joints, control joints and expansion joints across all sealant types including silicone, polyurethane, polysulfide and modified silicone. The backing rod diameter should be 25% larger than the joint width to ensure a compression fit. Prevents three-point adhesion which causes premature sealant failure.",
    technicalProperties: [
      "Closed-cell PE foam — does not absorb water or sealant components",
      "Available in range of diameters 6mm–50mm",
      "Compresses into joint and holds sealant depth",
      "Compatible with all standard sealant chemistries (silicone, PU, polysulfide)",
      "UV resistant and weatherstable",
      "Does not off-gas under silicone cure",
    ],
    limitations: [
      "Closed-cell only — do not use open-cell backing rod with solvent-based sealants (outgassing causes bubbling)",
      "Backing rod diameter must be 25% larger than joint width for correct compression",
      "Do not allow primer or sealant to run behind backing rod — this creates three-point adhesion",
      "Confirm compatibility with sealant chemistry from Sika TDS",
    ],
    procurementSources: [
      { name: "Sika Australia — aus.sika.com — trade supply, construction supply houses and facade trade distributors", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Backer Rod Mfg",
    brandUrl: "https://www.backerrod.com",
    accentColor: "#1A3A5C",
    name: "Backer Rod Mfg — Closed Cell",
    descriptionLine: "Closed-cell polyethylene foam backing rod — wide range of diameters for all joint types",
    productType: "Closed-cell PE foam backing rod",
    filterTags: ["Backing-rod", "Closed-cell", "PE-foam", "Facade-joint", "Control-joint", "Wide-joint"],
    techChips: [
      { label: "Closed-cell PE", cls: "bg-indigo-100 text-indigo-800" },
      { label: "Wide diameter range", cls: "bg-slate-100 text-slate-700" },
      { label: "Industry standard", cls: "bg-amber-50 text-amber-700" },
      { label: "All joint types", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Backer Rod Manufacturing (BRM) closed-cell polyethylene foam backing rod is one of the most widely specified backing rod products in North America and Australia for movement joint sealing applications. Available in a comprehensive range of diameters from 6mm to 100mm+ for wide structural expansion joints. Used in facade joint sealing, below-grade waterproofing joints, concrete construction joints and all sealant joint applications requiring controlled depth and two-point adhesion. Confirm Australian availability with construction supply distributors.",
    technicalProperties: [
      "Closed-cell low-density PE foam",
      "Very wide diameter range including large diameter for structural expansion joints",
      "Does not absorb sealant or water",
      "Compatible with all standard joint sealant chemistries",
      "UV stable for exposed applications",
      "Compressible for installation into joint",
    ],
    limitations: [
      "Confirm Australian supply and lead time — product is US-origin",
      "Not suitable as bond breaker tape (different product purpose)",
      "Must be sized correctly — 25% larger than joint for compression fit",
      "Confirm with sealant manufacturer that closed-cell foam is compatible with their specific product",
    ],
    procurementSources: [
      { name: "backerrod.com — US supply", url: "https://www.backerrod.com" },
      { name: "Construction supply houses in Australia (confirm availability)", url: "https://www.backerrod.com" },
      { name: "Contact sealant distributors for equivalent local products", url: "https://www.backerrod.com" },
    ],
  },
  {
    fullLabel: "Generic / Trade Supply",
    brandUrl: "https://www.sika.com",
    accentColor: "#64748B",
    name: "PE Bond Breaker Tape",
    descriptionLine: "Polyethylene film bond breaker tape — prevents three-point adhesion in wide or shallow sealant joints",
    productType: "Polyethylene bond breaker tape",
    filterTags: ["Bond-breaker", "PE-tape", "Facade-joint", "Control-joint", "Wide-joint", "Waterproofing-joint"],
    techChips: [
      { label: "PE tape", cls: "bg-slate-100 text-slate-700" },
      { label: "Bond breaker", cls: "bg-sky-50 text-sky-700" },
      { label: "No primer required", cls: "bg-amber-50 text-amber-700" },
      { label: "Shallow joints", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Polyethylene bond breaker tape is applied to the back of a sealant joint in wide or shallow joints where a backing rod cannot be adequately compressed, or where the joint is too shallow to accommodate a backing rod. The PE tape does not bond to most sealant chemistries and prevents adhesion to the substrate back face — maintaining two-point adhesion (to the two sides of the joint only). Used in concrete control joints, wide facade joints and any sealant joint where backing rod insertion is impractical. Standard PE tapes (masking tape backing, non-permeable) can be used — confirm the selected tape does not bond to the sealant chemistry being used.",
    technicalProperties: [
      "Polyethylene film does not bond to silicone, PU or polysulfide sealants",
      "Self-adhesive backing for application to concrete or masonry joint base",
      "Suitable for use where backing rod is impractical",
      "Low cost and available from construction supply houses",
      "Multiple widths available",
    ],
    limitations: [
      "Must not be used on joint sides — only on the base (back) of the joint — applying to sides defeats the purpose",
      "PE tape alone does not control sealant depth — use in conjunction with a bead depth gauge or correct tooling",
      "Some sealant chemistries (cyanoacrylate, epoxy) may adhere to PE — confirm compatibility",
      "Not a substitute for backing rod where backing rod is specified",
    ],
    procurementSources: [
      { name: "Sika Australia — aus.sika.com (sold alongside backing rod)", url: "https://aus.sika.com" },
      { name: "Tremco, Dow — ask distributor for bond breaker tape", url: "https://www.sika.com" },
      { name: "General construction supply houses (masking tape PE film or purpose-made construction tape)", url: "https://www.sika.com" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag | "All"; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Backing-rod", label: "Backing-rod" },
  { id: "Bond-breaker", label: "Bond-breaker" },
  { id: "Closed-cell", label: "Closed-cell" },
  { id: "Facade-joint", label: "Facade-joint" },
  { id: "Wide-joint", label: "Wide-joint" },
  { id: "Waterproofing-joint", label: "Waterproofing-joint" },
];

const BRAND_EQUIV: { system: string; sika: string; brm: string; generic: string }[] = [
  { system: "Closed-cell backing rod", sika: "Sika Backing Rod", brm: "BRM Closed Cell", generic: "Various brands" },
  { system: "Bond breaker tape", sika: "Sika PE tape", brm: "—", generic: "PE masking/construction tape" },
];

const SYSTEM_COMPARISON: {
  row: string;
  sika: string;
  brm: string;
  tape: string;
}[] = [
  { row: "Type", sika: "Closed-cell PE foam rod", brm: "Closed-cell PE foam rod", tape: "Polyethylene film tape" },
  { row: "Purpose", sika: "Joint depth control + 2-point adhesion", brm: "Joint depth control + 2-point adhesion", tape: "Prevent back-face adhesion only" },
  { row: "Installation", sika: "Compressed into joint before sealant", brm: "Compressed into joint before sealant", tape: "Applied to joint base before sealant" },
  { row: "Joint depth control", sika: "Yes — controls sealant depth directly", brm: "Yes — controls sealant depth directly", tape: "No — depth controlled separately" },
  { row: "Water absorption", sika: "None — closed-cell", brm: "None — closed-cell", tape: "None — PE film" },
  { row: "Compatibility", sika: "All standard sealant chemistries", brm: "All standard sealant chemistries (confirm)", tape: "Silicone, PU, polysulfide (confirm)" },
];

const TECH_INFO_CARDS: {
  title: string;
  icon: "layers" | "ruler" | "square" | "book";
  style: "bullet" | "check" | "warn";
  items: string[];
}[] = [
  {
    title: "Two-point adhesion rule",
    icon: "layers",
    style: "bullet",
    items: [
      "Sealant must only bond to the two sides of the joint — not the back face",
      "Three-point adhesion prevents the sealant from stretching when the joint moves — the sealant tears instead",
      "Backing rod or bond breaker tape eliminates bond to the back of the joint",
      "This principle applies to all movement joint sealant chemistries — silicone, PU, polysulfide, hybrid",
      "Three-point adhesion is the single most common cause of premature sealant cohesive failure",
    ],
  },
  {
    title: "Sizing the backing rod",
    icon: "ruler",
    style: "check",
    items: [
      "Backing rod diameter must be 25% larger than the joint width — this ensures a compression fit in the joint",
      "A compression fit holds the rod in place and creates a consistent sealant depth platform",
      "If backing rod is too small it will not compress correctly and may move or fall during sealant application",
      "If backing rod is too large it may bow the joint faces or be impossible to install correctly",
      "Confirm diameter selection from sealant manufacturer's joint design guide",
    ],
  },
  {
    title: "Width-to-depth ratio",
    icon: "square",
    style: "bullet",
    items: [
      "Optimal sealant joint geometry is typically 2:1 width to depth — joint twice as wide as it is deep",
      "Correct width-to-depth ratio allows the sealant to deform in tension and compression without tearing",
      "If the joint is too deep the sealant becomes too stiff in tension — backing rod controls this",
      "If the joint is too shallow the sealant cross-section is insufficient to accommodate movement — widen the joint",
      "Minimum depth is typically 6mm — confirm from sealant manufacturer TDS",
    ],
  },
  {
    title: "When to use bond breaker tape vs backing rod",
    icon: "book",
    style: "check",
    items: [
      "Use backing rod as the primary solution wherever the joint width and depth allow it",
      "Use bond breaker tape where the joint is too shallow to accept a backing rod",
      "Use bond breaker tape in very wide joints where rod compression would not be practical",
      "Bond breaker tape alone does not control sealant depth — additional depth control measures required",
      "Both backing rod and bond breaker tape prevent the same failure mode — three-point adhesion — but through different mechanisms",
    ],
  },
];

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

export function BackingRodBondBreakerIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are backing rods and bond breaker tape?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Backing rods and bond breaker tape are joint design components — not sealants. They are installed in a movement joint before the sealant is applied to control sealant depth and prevent three-point adhesion. Three-point adhesion occurs when sealant bonds to both sides of the joint and to the back face of the joint — this prevents the sealant from stretching when the joint moves, causing it to tear. Backing rod or bond breaker tape eliminates adhesion to the back face, ensuring the sealant only bonds to the two joint sides (two-point adhesion).
        </p>
        <p>
          Closed-cell polyethylene foam backing rod is the standard approach for most movement joints. It is compressed into the joint to create a platform at the correct depth, then sealant is applied over it. Bond breaker tape is used where the joint is too shallow or wide to accept a backing rod. Both products are essential components of correctly designed sealant joints — their omission is a primary cause of premature sealant failure across all sealant chemistries.
        </p>
      </div>
      <div className="mt-5 space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Do not confuse with:</p>
        <ul className="space-y-1.5">
          {[
            "Backing rod vs bond breaker tape — these are different products with different applications. Backing rod controls joint depth and prevents back-face adhesion. Bond breaker tape only prevents back-face adhesion and does not control depth. They are not interchangeable.",
            "Closed-cell vs open-cell foam — only closed-cell polyethylene foam is suitable as a backing rod. Open-cell foam absorbs sealant components and outgasses under some sealant chemistries — do not use open-cell foam as a backing rod.",
            "Backing rod is not a sealant — it is installed below the sealant bead, not instead of it. Always apply sealant over the backing rod.",
            "Bond breaker tape is not a primer — it is specifically non-bonding to sealant chemistries. Do not confuse with adhesion primers which promote bonding.",
            "Expansion joint cover systems — proprietary mechanical covers for wide structural expansion joints — not a backing rod or tape application.",
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

function iconForCard(icon: "layers" | "ruler" | "square" | "book") {
  const size = 15;
  if (icon === "layers") return <Layers size={size} />;
  if (icon === "ruler") return <Ruler size={size} />;
  if (icon === "square") return <SquareStack size={size} />;
  return <BookOpen size={size} />;
}

export function BackingRodBondBreakerProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterTag | "All">("All");
  const scrollRef = useRef<HTMLDivElement>(null);

  const visibleProducts =
    activeFilter === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.filterTags.includes(activeFilter as FilterTag));

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
            <p className="text-base font-extrabold text-sky-950">Technical Reference — Joint Design Principles</p>
            <p className="mt-0.5 text-xs text-slate-500">
              Two-point adhesion rule, backing rod sizing, width-to-depth ratio, and when to use tape vs rod
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
            <div className="grid gap-6 md:grid-cols-2">
              {TECH_INFO_CARDS.map((card) => (
                <TechCard
                  key={card.title}
                  icon={iconForCard(card.icon)}
                  title={card.title}
                  items={card.items}
                  style={card.style}
                />
              ))}
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
            <p className="mt-1 text-sm text-slate-500">3 products — backing rods and bond breaker tape for movement joint design — scroll to view all</p>
          </div>
        </div>

        {/* Filter chips */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => {
            const active = activeFilter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
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
        </div>

        {/* Nav row */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll for more
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
              Backing rod vs bond breaker tape — key differences across type, purpose, installation and depth control.
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
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#D2000F" }}>Sika Backing Rod</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#1A3A5C" }}>BRM Closed Cell</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#64748B" }}>PE Bond Breaker Tape</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.row} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">
                    {row.row}
                  </td>
                  {[row.sika, row.brm, row.tape].map((val, j) => (
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

      {/* ── Brand Equivalents ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Brand Equivalents</h2>
            <p className="mt-1 text-sm text-slate-500">
              Backing rod and bond breaker tape product equivalents across brands. Confirm exact product with supplier before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">
                  Product type
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#D2000F" }}>Sika</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#1A3A5C" }}>Backer Rod Mfg</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Generic trade</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">
                    {row.system}
                  </td>
                  {[row.sika, row.brm, row.generic].map((val, j) => (
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

      {/* ── Critical callout — BELOW comparison tables ── */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-amber-900">Critical — Three-Point Adhesion and Joint Design</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Backing rod or bond breaker tape is mandatory for all movement joint sealant applications — without one of these products, three-point adhesion will occur and the sealant will fail in cohesion when the joint moves",
            "Backing rod must be closed-cell — open-cell foam absorbs sealant components and outgasses — only use closed-cell polyethylene foam backing rod",
            "Backing rod diameter must be 25% larger than the joint width — install by compression so it sits firmly in the joint",
            "Bond breaker tape is applied to the back face of the joint only — do not apply to the joint sides — applying to sides defeats the purpose and causes adhesion failure",
            "Incorrect joint design — missing backing rod, wrong depth, three-point adhesion — is a primary cause of premature sealant failure across all sealant chemistries including silicone, PU and polysulfide",
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
