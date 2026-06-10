"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen,
  ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight,
} from "lucide-react";

type FilterTag =
  | "Natural-slate"
  | "Fibre-cement"
  | "Heritage-compatible"
  | "Premium"
  | "Handcut"
  | "Imported"
  | "Spanish-slate"
  | "Multiple-grades"
  | "Lightweight"
  | "Australian-made"
  | "Budget"
  | "AS-2050";

type Product = {
  fullLabel: string;
  brandUrl: string;
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
    fullLabel: "Welsh Slate Company",
    brandUrl: "https://www.welshslate.com",
    accentColor: "#4A4A6A",
    name: "Welsh Slate — natural",
    descriptionLine: "Natural Welsh slate — Penrhyn, Ffestiniog and Welsh Blue varieties — premium replacement for natural slate pitched roofs",
    productType: "Natural slate — Welsh",
    filterTags: ["Natural-slate", "Heritage-compatible", "Premium", "Handcut", "Imported", "AS-2050"],
    techChips: [
      { label: "Natural slate", cls: "bg-slate-200 text-slate-800" },
      { label: "Welsh — imported", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 2050", cls: "bg-amber-50 text-amber-700" },
      { label: "Heritage compatible", cls: "bg-slate-100 text-slate-700" },
      { label: "100-yr guarantee", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Welsh Slate is internationally considered the benchmark natural slate for heritage and premium residential roofing. Penrhyn (blue-grey) and Ffestiniog (grey-green) varieties are available in Australia through specialist importers. Used for high-specification and heritage Class 2 strata buildings with natural slate roofs where profile, texture, and heritage appearance must be preserved. Sizing, thickness, and fixing method must be confirmed against existing slate specification. Welsh Slate carries a 100-year product guarantee from the manufacturer.",
    technicalProperties: [
      "Natural riven cleavage slate — low water absorption — high compressive and tensile strength",
      "Available in multiple sizes and custom sizes",
      "Head-nailed or side-nailed on timber battens",
      "100-year manufacturer guarantee",
      "AS 2050 compliant",
    ],
    limitations: [
      "Premium pricing — significantly more expensive than fibre cement alternatives",
      "Natural material — minor colour and thickness variation between pieces",
      "Sourced from Wales — import lead times apply",
      "Requires specialist slate roofing contractor for installation",
    ],
    procurementSources: [
      { name: "Welsh Slate — welshslate.com", url: "https://www.welshslate.com" },
      { name: "Specialist slate roofing material importers — contact for Australian supply", url: "https://www.welshslate.com" },
    ],
  },
  {
    fullLabel: "Cupa Group",
    brandUrl: "https://www.cupagroup.com",
    accentColor: "#2C3E50",
    name: "Cupa Slate",
    descriptionLine: "Spanish natural slate — Cupa 3, Cupa 5, Cupa 9 and CUPA PIZARRAS grades — replacement natural slate for pitched slate roofs",
    productType: "Natural slate — Spanish",
    filterTags: ["Natural-slate", "Heritage-compatible", "Spanish-slate", "Imported", "Multiple-grades", "AS-2050"],
    techChips: [
      { label: "Natural slate", cls: "bg-slate-200 text-slate-800" },
      { label: "Spanish — imported", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 2050", cls: "bg-amber-50 text-amber-700" },
      { label: "Multiple grades", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Cupa is one of the world's largest natural slate producers, operating quarries in Galicia, Spain. The Cupa range — including Cupa 3 (standard), Cupa 5 (premium), Cupa 9 and CUPA PIZARRAS (ultra-premium) grades — offers natural cleavage slate of varying quality and uniformity. Available in Australia through specialist importers. Used where natural slate appearance is required for Class 2 strata heritage or premium replacement without the premium cost of Welsh Slate. AS 2050 compliant.",
    technicalProperties: [
      "Natural riven cleavage slate — multiple grades by uniformity and absorption",
      "Available in standard and custom sizes",
      "AS 2050 compliant",
      "Head-nailed or side-nailed fixing",
    ],
    limitations: [
      "Grade selection critical — lower grades have more variation",
      "Import lead times apply",
      "Requires specialist slate contractor",
      "Colour and texture variation is inherent in natural slate",
    ],
    procurementSources: [
      { name: "Cupa Group — cupagroup.com", url: "https://www.cupagroup.com" },
      { name: "Specialist roofing tile importers — contact for Australian supply", url: "https://www.cupagroup.com" },
    ],
  },
  {
    fullLabel: "Stramit",
    brandUrl: "https://www.stramit.com.au",
    accentColor: "#006633",
    name: "Stramit Fibre Cement Slate",
    descriptionLine: "Fibre cement roofing slate — Australian-manufactured — replacement for existing fibre cement slate and lower-cost alternative to natural slate",
    productType: "Fibre cement slate",
    filterTags: ["Fibre-cement", "Lightweight", "AS-2050", "Australian-made", "Budget"],
    techChips: [
      { label: "Fibre cement", cls: "bg-green-100 text-green-800" },
      { label: "Australian-made", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 2050", cls: "bg-amber-50 text-amber-700" },
      { label: "Lightweight", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Stramit and other Australian manufacturers produce fibre cement roofing slates as a cost-effective and lighter-weight alternative to natural slate. Fibre cement slate is non-asbestos (post-1980s production) and suitable for pitched roof replacement on Class 2 strata buildings where natural slate appearance at lower cost is acceptable. Confirm that existing slates on the building are also fibre cement (not asbestos cement) before specifying — asbestos-containing slates require licensed removal before replacement. AS 2050 compliant.",
    technicalProperties: [
      "Fibre cement composition — pre-drilled for head-nail fixing",
      "Lighter than natural slate",
      "AS 2050 compliant",
      "Available in standard sizes — pre-coloured or paintable",
    ],
    limitations: [
      "Lighter weight than natural slate — appearance less premium",
      "Verify existing slates are fibre cement not asbestos cement before any disturbance",
      "Cut edges must be sealed with edge treatment",
      "Not as durable as natural slate in harsh coastal environments",
    ],
    procurementSources: [
      { name: "Stramit — stramit.com.au", url: "https://www.stramit.com.au" },
      { name: "Roofing materials suppliers and builders merchants", url: "https://www.stramit.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag | "All"; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Natural-slate", label: "Natural-slate" },
  { id: "Fibre-cement", label: "Fibre-cement" },
  { id: "Heritage-compatible", label: "Heritage-compatible" },
  { id: "Imported", label: "Imported" },
];

const SYSTEM_COMPARISON = [
  {
    product: "Welsh Slate",
    brand: "Welsh Slate Co.",
    material: "Natural Welsh slate",
    origin: "Wales — imported",
    weight: "Heavy",
    heritageSuitable: "Yes",
    as2050: "Compliant",
    leadTime: "Import — allow lead time",
    costLevel: "Premium",
  },
  {
    product: "Cupa Slate",
    brand: "Cupa Group",
    material: "Natural Spanish slate",
    origin: "Spain — imported",
    weight: "Heavy",
    heritageSuitable: "Yes",
    as2050: "Compliant",
    leadTime: "Import — allow lead time",
    costLevel: "Medium-high (grade dependent)",
  },
  {
    product: "Stramit FC Slate",
    brand: "Stramit",
    material: "Fibre cement",
    origin: "Australian-made",
    weight: "Light",
    heritageSuitable: "Limited",
    as2050: "Compliant",
    leadTime: "Local supply",
    costLevel: "Budget",
  },
];

const TECH_INFO = [
  {
    title: "AS 2050 — Roofing Slates",
    style: "bullet" as const,
    items: [
      "AS 2050 is the Australian Standard for roofing slates — it covers both natural and fibre cement slate products used on pitched roofs",
      "The standard sets minimum requirements for dimensions, water absorption, transverse strength, and resistance to freezing and thawing",
      "All slate products used on Australian buildings should comply with AS 2050 — confirm compliance with the supplier or manufacturer before specifying",
    ],
  },
  {
    title: "Natural Slate vs Fibre Cement Slate",
    style: "check" as const,
    items: [
      "Natural slate (Welsh or Spanish) is a durable, premium product with a 100+ year design life — fibre cement slate is a manufactured product with a shorter design life",
      "Natural slate has greater weight, more variation in colour and thickness, and requires a specialist contractor — fibre cement slate is more uniform and easier to handle",
      "For heritage buildings, natural slate is strongly preferred where the existing roof is natural slate — fibre cement may be acceptable on non-heritage strata buildings",
      "Do not mix natural slate and fibre cement slate on the same roof — different thickness and fixing requirements will result in visual and performance problems",
    ],
  },
  {
    title: "Asbestos Cement Warning — Verify Existing Material",
    style: "warn" as const,
    items: [
      "Before any disturbance of existing slate tiles, determine whether the tiles are natural slate, fibre cement, or asbestos cement",
      "Asbestos cement roofing slates were commonly installed in Australia before the late 1980s — they visually resemble fibre cement slate but contain asbestos",
      "Asbestos cement slates must not be disturbed without a SafeWork-compliant asbestos management plan and licensed asbestos removalist — this is a mandatory legal requirement",
      "Do not assume that slates on a building are fibre cement without testing — if in doubt, engage a NATA-accredited laboratory to test a sample",
    ],
  },
  {
    title: "Specialist Contractor Requirement",
    style: "warn" as const,
    items: [
      "Natural slate roofing requires a contractor with specific experience in slate roofing — standard concrete tile or metal roofing contractors are not equivalent",
      "Slate fixing methods, batten gauges, lap dimensions, and head and side nailing patterns are specific to slate and must be correctly specified and installed",
      "Incorrect fixing of natural slate — including over-driving nails or under-lapping tiles — can cause premature failure and voiding of any manufacturer guarantee",
      "Confirm contractor experience and references in natural slate roofing before awarding a slate replacement contract",
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

function TechCard({
  title,
  items,
  style,
}: {
  title: string;
  items: string[];
  style: "bullet" | "check" | "warn";
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-white">
          {style === "check" && <CheckCircle size={15} />}
          {style === "warn" && <AlertTriangle size={15} />}
          {style === "bullet" && <BookOpen size={15} />}
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

export function RoofTileSlateIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are slate roof tile replacement systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Slate roof tile replacement systems cover the supply and installation of natural or fibre cement slate tiles to replace cracked, broken, slipped, or missing slates on pitched slate roofs of Class 2 strata apartment buildings. Natural slate roofs are less common than concrete or terracotta tile roofs on Australian strata buildings, but are found on heritage and premium buildings — particularly pre-war and early post-war construction. Slate replacement is a specialist scope requiring a contractor with specific experience in slate roofing.
        </p>
        {expanded && (
          <>
            <p>
              There are two distinct categories of slate product used in Australian roofing: natural slate (imported from Wales, Spain, or other quarries) and fibre cement slate (manufactured in Australia). These are fundamentally different materials — natural slate is a split stone product with a 100+ year design life, while fibre cement slate is a manufactured composite with a shorter service life. Do not confuse either of these with asbestos cement slates, which were commonly installed in Australia before the late 1980s and require licensed removal before any disturbance.
            </p>
            <p>
              AS 2050 is the relevant Australian Standard for roofing slates. Compliance should be confirmed for all replacement slate products before specification. Confirm sizing, thickness, lap, batten gauge, and fixing method against the existing installation before ordering replacement slate.
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

export function RoofTileSlateProductSection() {
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
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">
              AS 2050, natural vs fibre cement, asbestos cement warning, specialist contractor requirement
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
              {TECH_INFO.map((card) => (
                <TechCard key={card.title} title={card.title} items={card.items} style={card.style} />
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — natural and fibre cement slate — scroll to view all</p>
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
                    <a
                      href={product.brandUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                    >
                      <ExternalLink size={9} /> Brand Site
                    </a>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
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
              Side-by-side comparison of slate roof tile products. Confirm all selections against current manufacturer TDS before specifying.
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
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Origin</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Weight</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Heritage suitable</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">AS 2050</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Lead time</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Cost level</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.origin}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.weight}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.heritageSuitable === "Yes" ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-green-700">
                        <CheckCircle size={11} /> Yes
                      </span>
                    ) : (
                      <span className="text-slate-500">{row.heritageSuitable}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 font-semibold text-green-700">
                      <CheckCircle size={11} /> {row.as2050}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.leadTime}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.costLevel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
