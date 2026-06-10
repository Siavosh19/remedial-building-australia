"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen,
  ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight,
} from "lucide-react";

type FilterTag =
  | "Concrete"
  | "Low-profile"
  | "Flat-profile"
  | "AS-2049"
  | "Standard-weight"
  | "Multiple-profiles";

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
    fullLabel: "Monier",
    brandUrl: "https://www.monier.com.au",
    accentColor: "#1A3A5C",
    name: "Monier Horizon",
    descriptionLine: "Low-profile concrete roof tile — Monier's primary flat concrete profile — replacement for Horizon tiled roofs",
    productType: "Concrete roof tile — low profile",
    filterTags: ["Concrete", "Low-profile", "AS-2049", "Standard-weight"],
    techChips: [
      { label: "Concrete tile", cls: "bg-slate-100 text-slate-800" },
      { label: "Low profile", cls: "bg-sky-100 text-sky-800" },
      { label: "AS 2049", cls: "bg-amber-50 text-amber-700" },
      { label: "Standard weight", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Monier Horizon is one of Australia's most widely installed concrete roof tiles — a low-profile concrete tile used on millions of Class 2 strata buildings built from the 1970s onward. Replacement of cracked, broken or missing Horizon tiles is a routine remediation task on Class 2 strata. Profile confirmation is mandatory before ordering — Horizon profile is Monier-specific. Colour match for partial re-tile work is difficult due to weathering and production batch variation. Confirm availability with Monier before specifying.",
    technicalProperties: [
      "Extruded and compressed concrete — interlocking profile",
      "AS 2049 compliant",
      "Pitch range — confirm from TDS",
      "Standard clip fixing",
      "Painted finish available in current range",
    ],
    limitations: [
      "Colour matching for partial re-tile requires comparison against weathered existing tiles — new tiles will be darker initially",
      "Confirm current production profile matches existing tiles — older profiles may vary",
      "Not suitable below minimum pitch",
    ],
    procurementSources: [
      { name: "Monier Australia — monier.com.au", url: "https://www.monier.com.au" },
      { name: "Roofing trade suppliers", url: "https://www.monier.com.au" },
    ],
  },
  {
    fullLabel: "Monier",
    brandUrl: "https://www.monier.com.au",
    accentColor: "#1A3A5C",
    name: "Monier Trimline",
    descriptionLine: "Flat interlocking concrete roof tile — Monier Trimline profile — replacement for Trimline profile tiled roofs",
    productType: "Concrete roof tile — flat profile",
    filterTags: ["Concrete", "Flat-profile", "AS-2049", "Standard-weight"],
    techChips: [
      { label: "Concrete tile", cls: "bg-slate-100 text-slate-800" },
      { label: "Flat profile", cls: "bg-sky-100 text-sky-800" },
      { label: "AS 2049", cls: "bg-amber-50 text-amber-700" },
      { label: "Standard weight", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Monier Trimline is a flat interlocking concrete tile widely installed on Class 2 strata buildings from the 1980s to 2000s. Profile compatibility with existing tiles must be confirmed — Trimline profile is Monier-specific. Used for broken tile replacement and partial re-roofing of Trimline-tiled buildings.",
    technicalProperties: [
      "Concrete interlocking flat tile",
      "AS 2049 compliant",
      "Standard clip fixing",
      "Pitch range — confirm TDS",
      "Painted finish",
    ],
    limitations: [
      "Profile match must be confirmed",
      "Colour matching for partial re-tile",
      "Confirm production continuity with Monier",
    ],
    procurementSources: [
      { name: "Monier Australia — monier.com.au", url: "https://www.monier.com.au" },
      { name: "Roofing trade suppliers", url: "https://www.monier.com.au" },
    ],
  },
  {
    fullLabel: "Boral",
    brandUrl: "https://www.boral.com.au/building-products/roofing",
    accentColor: "#8B0000",
    name: "Boral Concrete Tiles",
    descriptionLine: "Boral concrete roof tile range — replacement for Boral-tiled roofs — profile match required",
    productType: "Concrete roof tile — various profiles",
    filterTags: ["Concrete", "AS-2049", "Standard-weight", "Multiple-profiles"],
    techChips: [
      { label: "Concrete tile", cls: "bg-red-100 text-red-800" },
      { label: "Various profiles", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 2049", cls: "bg-amber-50 text-amber-700" },
      { label: "Boral", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Boral manufactures a range of concrete roof tiles sold across Australian states and territories for Class 2 strata and residential buildings. Profile match for replacement is essential — Boral profiles include various standard and proprietary interlocking designs. Confirm the exact profile, colour and current production status with Boral Roofing before ordering replacement tiles for partial re-roofing.",
    technicalProperties: [
      "Concrete interlocking profiles — AS 2049 compliant",
      "Available in standard and painted finishes",
      "Standard clip fixing",
    ],
    limitations: [
      "Confirm exact profile name and current production status — not all historical profiles remain in current production",
      "Colour matching for partial re-roofs requires careful comparison",
    ],
    procurementSources: [
      { name: "Boral Roofing — boral.com.au/building-products/roofing", url: "https://www.boral.com.au/building-products/roofing" },
      { name: "Roofing trade suppliers", url: "https://www.boral.com.au/building-products/roofing" },
    ],
  },
  {
    fullLabel: "Bristile Roofing",
    brandUrl: "https://www.bristile-roofing.com.au",
    accentColor: "#4A4A4A",
    name: "Bristile Concrete Tiles",
    descriptionLine: "Bristile concrete roof tile range — Monier Group — replacement for Bristile-tiled roofs in WA and eastern states",
    productType: "Concrete roof tile",
    filterTags: ["Concrete", "AS-2049", "Standard-weight"],
    techChips: [
      { label: "Concrete tile", cls: "bg-slate-100 text-slate-800" },
      { label: "AS 2049", cls: "bg-amber-50 text-amber-700" },
      { label: "Bristile / Monier", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Bristile Roofing (Monier Group) manufactures concrete roof tiles primarily for the WA market and some eastern states installations. Used for replacement of Bristile-tiled Class 2 strata buildings. Profile match must be confirmed with Bristile/Monier technical before ordering.",
    technicalProperties: [
      "Concrete interlocking profiles — AS 2049 compliant",
      "Painted finish options",
    ],
    limitations: [
      "Primarily WA market — confirm eastern states availability",
      "Profile confirmation essential",
    ],
    procurementSources: [
      { name: "Bristile Roofing — bristile-roofing.com.au", url: "https://www.bristile-roofing.com.au" },
      { name: "WA roofing trade suppliers", url: "https://www.bristile-roofing.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag | "All"; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Concrete", label: "Concrete" },
  { id: "Low-profile", label: "Low-profile" },
  { id: "Flat-profile", label: "Flat-profile" },
];

const SYSTEM_COMPARISON = [
  {
    product: "Monier Horizon",
    brand: "Monier",
    type: "Concrete",
    profile: "Low profile",
    as2049: "Compliant",
    weight: "Standard",
    pitchRange: "Confirm TDS",
    paintedFinish: "Yes",
  },
  {
    product: "Monier Trimline",
    brand: "Monier",
    type: "Concrete",
    profile: "Flat profile",
    as2049: "Compliant",
    weight: "Standard",
    pitchRange: "Confirm TDS",
    paintedFinish: "Yes",
  },
  {
    product: "Boral Concrete Tiles",
    brand: "Boral",
    type: "Concrete",
    profile: "Various — confirm",
    as2049: "Compliant",
    weight: "Standard",
    pitchRange: "Confirm TDS",
    paintedFinish: "Yes",
  },
  {
    product: "Bristile Concrete Tiles",
    brand: "Bristile / Monier",
    type: "Concrete",
    profile: "Various — confirm",
    as2049: "Compliant",
    weight: "Standard",
    pitchRange: "Confirm TDS",
    paintedFinish: "Yes",
  },
];

const TECH_INFO = [
  {
    title: "AS 2049 — Concrete Roof Tiles",
    style: "bullet" as const,
    items: [
      "AS 2049 covers both clay and concrete roof tiles — compliance sets minimum dimensional, strength and water absorption requirements",
      "All concrete tiles listed on this page comply with AS 2049 — confirm current compliance status with the manufacturer before specifying",
      "The standard also addresses marking requirements and test methods — confirm from manufacturer TDS",
    ],
  },
  {
    title: "Profile Matching — Concrete Tiles",
    style: "warn" as const,
    items: [
      "Concrete tiles use an interlocking profile — replacement tiles must match the exact profile of the existing tile or they will not seat correctly",
      "Monier profile names (Horizon, Trimline) are proprietary — tiles of the same name but different production era may vary slightly",
      "Always compare a sample tile against existing in-situ tiles before ordering in quantity",
      "Boral and Bristile profiles vary by product line — confirm the exact profile name before ordering",
    ],
  },
  {
    title: "Concrete Tile Weathering",
    style: "check" as const,
    items: [
      "New concrete tiles have a smooth painted or natural cement surface that weathers over time — new tiles on a partial re-roof will visually differ from existing weathered tiles",
      "Colour fading and surface carbonation change the appearance of concrete tiles over 10–20 years — this is normal and does not affect performance",
      "Confirm colour and finish availability with the manufacturer for the specific tile profile required",
    ],
  },
  {
    title: "Painting and Recoating Concrete Tiles",
    style: "bullet" as const,
    items: [
      "Concrete tiles can be recoated with proprietary roof tile paint systems to restore or change colour — this is a separate scope to tile replacement",
      "Painting does not substitute for replacement of cracked or broken tiles — damaged tiles must be replaced before painting",
      "Confirm paint system compatibility with the tile manufacturer — not all paint systems are suitable for all concrete tile types",
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

export function RoofTileConcreteIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are concrete roof tile replacement systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Concrete roof tile replacement systems cover the supply and installation of interlocking concrete roof tiles to replace cracked, broken, slipped, or missing tiles on pitched tiled roofs of Class 2 strata apartment buildings. Concrete tiles are the most common roof tile type on Australian strata buildings built from the 1970s onward, and tile replacement is one of the most frequent remediation scopes on ageing strata buildings with concrete tile roofs.
        </p>
        {expanded && (
          <>
            <p>
              Concrete tiles differ from terracotta tiles in material composition, weight characteristics, and weathering behaviour. They are manufactured by extruding and compressing a cement-based mix, and are typically finished with a painted or natural cement surface. Do not confuse concrete tiles with terracotta (clay) tiles — they are different products with different weights, thermal properties, and profile characteristics.
            </p>
            <p>
              Profile matching is critical in all concrete tile replacement work — the replacement tile must exactly match the interlocking profile of the existing tiles on the roof. AS 2049 compliance should be confirmed for all replacement products. Confirm pitch range, colour, and current production status with Monier or Boral before ordering.
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

export function RoofTileConcreteProductSection() {
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
              AS 2049, profile matching, concrete tile weathering, painting and recoating
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
            <p className="mt-1 text-sm text-slate-500">4 products — 2 brands — concrete roof tiles — scroll to view all</p>
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
              Side-by-side comparison of concrete roof tile products. Confirm all selections against current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Profile</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">AS 2049</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Weight</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Pitch range</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Painted finish</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.profile}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 font-semibold text-green-700">
                      <CheckCircle size={11} /> {row.as2049}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.weight}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.pitchRange}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.paintedFinish}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Brand Equivalence ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Brand Equivalence by Profile</h2>
            <p className="mt-1 text-sm text-slate-500">
              Guide to identifying brand equivalents by profile type. Profile compatibility must always be confirmed on site and with manufacturer technical.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-3 text-left text-xs font-bold text-slate-700">Profile</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-slate-700">Monier</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-slate-700">Boral</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-slate-700">Bristile</th>
              </tr>
            </thead>
            <tbody>
              {[
                { profile: "Low profile", monier: "Horizon", boral: "Various — confirm", bristile: "Various — confirm" },
                { profile: "Flat profile", monier: "Trimline", boral: "Various — confirm", bristile: "Various — confirm" },
              ].map((row, i) => (
                <tr key={row.profile} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="px-5 py-3 font-semibold text-sky-950">{row.profile}</td>
                  <td className="px-4 py-3 text-slate-600">{row.monier}</td>
                  <td className="px-4 py-3 text-slate-600">{row.boral}</td>
                  <td className="px-4 py-3 text-slate-600">{row.bristile}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[11px] italic text-slate-400">
          Profile names are approximate — confirm compatibility on site and with manufacturer technical before ordering.
        </p>
      </div>
    </>
  );
}
