"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight,
} from "lucide-react";

type FilterTag =
  | "Terracotta"
  | "French-profile"
  | "Flat-profile"
  | "Natural-clay"
  | "AS-2049"
  | "Heritage-compatible"
  | "Low-profile";

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
    accentColor: "#C0392B",
    name: "Monier Marseille Terracotta",
    descriptionLine: "Traditional French-profile terracotta roof tile — replacement for Marseille profile pitched tiled roofs",
    productType: "Terracotta roof tile — French profile",
    filterTags: ["Terracotta", "French-profile", "Natural-clay", "AS-2049", "Heritage-compatible"],
    techChips: [
      { label: "Terracotta clay", cls: "bg-orange-100 text-orange-800" },
      { label: "French profile", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 2049", cls: "bg-amber-50 text-amber-700" },
      { label: "Heritage compatible", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Monier Marseille is Australia's most widely installed French-profile terracotta roof tile. Made from natural clay fired at high temperature, it is the standard terracotta replacement tile for the vast majority of Class 2 strata apartment buildings built in Australia between the 1960s and 2000s with French-profile clay tile roofs. Profile compatibility must be confirmed on site before ordering — Marseille profile tiles from different manufacturers may have minor differences in interlocking detail. Confirm pitch range, batten gauge, and clip/ridge compatibility with current Monier technical documentation before specifying replacement tiles.",
    technicalProperties: [
      "Fired terracotta clay — UV and weather resistant — natural thermal mass",
      "AS 2049 compliant",
      "Suitable pitch range — confirm from TDS",
      "Interlocking profile — clip or mortar fixing depending on pitch",
      "Lifespan 50+ years when correctly installed and maintained",
    ],
    limitations: [
      "Profile must match existing — interlock detail varies by manufacturer and era",
      "Second-hand tiles may not match current colour batch — check with Monier for colour continuity",
      "Not suitable for pitches below minimum specified in AS 2049",
      "Handling and cutting requires tile saw",
    ],
    procurementSources: [
      { name: "Monier Australia — monier.com.au", url: "https://www.monier.com.au" },
      { name: "Roofing trade suppliers and builders merchants", url: "https://www.monier.com.au" },
    ],
  },
  {
    fullLabel: "Monier",
    brandUrl: "https://www.monier.com.au",
    accentColor: "#C0392B",
    name: "Monier Elabana Terracotta",
    descriptionLine: "Low-profile flat terracotta roof tile — replacement for Elabana and equivalent flat terracotta profile roofs",
    productType: "Terracotta roof tile — flat profile",
    filterTags: ["Terracotta", "Flat-profile", "Natural-clay", "AS-2049", "Low-profile"],
    techChips: [
      { label: "Terracotta clay", cls: "bg-orange-100 text-orange-800" },
      { label: "Flat profile", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 2049", cls: "bg-amber-50 text-amber-700" },
      { label: "Low profile", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Monier Elabana is a low-profile flat terracotta tile used on steeply pitched roofs where a flat terracotta aesthetic is specified. Used in Class 2 strata buildings requiring replacement of existing flat terracotta profile tiles. Profile match must be confirmed — Elabana profile is specific to Monier and may not be interchangeable with tiles from other manufacturers.",
    technicalProperties: [
      "Flat low-profile fired terracotta clay",
      "AS 2049 compliant",
      "Requires steeper minimum pitch than French profile — confirm from TDS",
      "Clip fixing standard",
      "Available in natural terracotta colours — single lap construction",
    ],
    limitations: [
      "Pitch requirements higher than French profile — confirm from TDS",
      "Profile-specific — replacement must use same profile",
      "Colour matching for partial re-roofs may be difficult for older buildings",
    ],
    procurementSources: [
      { name: "Monier Australia — monier.com.au", url: "https://www.monier.com.au" },
      { name: "Roofing trade suppliers", url: "https://www.monier.com.au" },
    ],
  },
  {
    fullLabel: "Boral",
    brandUrl: "https://www.boral.com.au/building-products/roofing",
    accentColor: "#8B4513",
    name: "Boral Montrose Terracotta",
    descriptionLine: "Standard French-profile terracotta roof tile — replacement for Boral Montrose and equivalent profile pitched tiled roofs",
    productType: "Terracotta roof tile — French profile",
    filterTags: ["Terracotta", "French-profile", "Natural-clay", "AS-2049", "Heritage-compatible"],
    techChips: [
      { label: "Terracotta clay", cls: "bg-amber-100 text-amber-800" },
      { label: "French profile", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 2049", cls: "bg-amber-50 text-amber-700" },
      { label: "Boral", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Boral Montrose is Boral's primary French-profile terracotta roof tile. Used for replacement of failed, cracked or missing Boral terracotta tiles on Class 2 strata apartment buildings. Confirms to AS 2049. Profile match with existing is critical — confirm with Boral technical that Montrose profile is compatible with the existing tile installation before ordering.",
    technicalProperties: [
      "Fired natural clay — AS 2049 compliant",
      "French interlocking profile",
      "Suitable for standard pitch range — confirm from Boral TDS",
      "Clip and mortar fixing options depending on pitch",
    ],
    limitations: [
      "Confirm profile compatibility with existing Boral tiles — profile details have varied over production runs",
      "Available in limited current colour range — colour continuity for partial re-roofs must be confirmed",
    ],
    procurementSources: [
      { name: "Boral Roofing Australia — boral.com.au/building-products/roofing", url: "https://www.boral.com.au/building-products/roofing" },
      { name: "Roofing trade suppliers", url: "https://www.boral.com.au/building-products/roofing" },
    ],
  },
  {
    fullLabel: "Bristile Roofing",
    brandUrl: "https://www.bristile-roofing.com.au",
    accentColor: "#B7410E",
    name: "Bristile Terracotta",
    descriptionLine: "French-profile terracotta roof tiles — Bristile brand, now under Monier Group — WA and eastern states market",
    productType: "Terracotta roof tile — French profile",
    filterTags: ["Terracotta", "French-profile", "Natural-clay", "AS-2049"],
    techChips: [
      { label: "Terracotta clay", cls: "bg-red-100 text-red-800" },
      { label: "French profile", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 2049", cls: "bg-amber-50 text-amber-700" },
      { label: "Bristile / Monier", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Bristile is a Western Australian roofing tile manufacturer now operating under the Monier Group. Bristile terracotta tiles are common on Class 2 strata buildings in WA and are also found in eastern states markets. Profile match for replacement is essential — confirm tile profile and batten gauge compatibility with Bristile/Monier technical before ordering.",
    technicalProperties: [
      "Fired terracotta clay — AS 2049 compliant",
      "French profile interlocking tile",
      "Standard pitch range — confirm from TDS",
      "Available in natural terracotta colour range",
    ],
    limitations: [
      "Bristile brand primarily WA market — confirm eastern states availability with Monier Group",
      "Profile compatibility with existing tiles must be confirmed",
    ],
    procurementSources: [
      { name: "Bristile Roofing (Monier Group) — bristile-roofing.com.au", url: "https://www.bristile-roofing.com.au" },
      { name: "Roofing trade suppliers WA and eastern states", url: "https://www.bristile-roofing.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag | "All"; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Terracotta", label: "Terracotta" },
  { id: "French-profile", label: "French-profile" },
  { id: "Flat-profile", label: "Flat-profile" },
  { id: "Heritage-compatible", label: "Heritage-compatible" },
];

const SYSTEM_COMPARISON = [
  {
    product: "Marseille Terracotta",
    brand: "Monier",
    profileType: "French profile",
    clayType: "Natural fired clay",
    as2049: "Compliant",
    minPitch: "Confirm TDS",
    clipFixing: "Yes (mortar option at low pitch)",
    heritage: "Yes",
    colourRange: "Natural terracotta — confirm continuity",
  },
  {
    product: "Elabana Terracotta",
    brand: "Monier",
    profileType: "Flat / low profile",
    clayType: "Natural fired clay",
    as2049: "Compliant",
    minPitch: "Higher — confirm TDS",
    clipFixing: "Yes",
    heritage: "Limited",
    colourRange: "Natural terracotta — confirm continuity",
  },
  {
    product: "Montrose Terracotta",
    brand: "Boral",
    profileType: "French profile",
    clayType: "Natural fired clay",
    as2049: "Compliant",
    minPitch: "Confirm TDS",
    clipFixing: "Yes (mortar option)",
    heritage: "Yes",
    colourRange: "Limited current range — confirm",
  },
  {
    product: "Bristile Terracotta",
    brand: "Bristile / Monier",
    profileType: "French profile",
    clayType: "Natural fired clay",
    as2049: "Compliant",
    minPitch: "Confirm TDS",
    clipFixing: "Confirm with Bristile",
    heritage: "Yes",
    colourRange: "Natural terracotta — WA primary market",
  },
];

const TECH_INFO = [
  {
    title: "AS 2049 — Clay and Terracotta Roof Tiles",
    icon: "book",
    style: "bullet" as const,
    items: [
      "AS 2049 is the Australian Standard that covers clay roof tiles — including terracotta — for pitched roof applications",
      "The standard sets minimum requirements for dimensions, breaking load, water absorption, and resistance to thermal shock",
      "Compliance with AS 2049 is required for all terracotta tiles used on Australian residential and strata buildings",
      "Confirm current AS 2049 compliance with Monier or Boral — the standard has been revised over time",
    ],
  },
  {
    title: "Profile Matching — Why It Is Critical",
    icon: "layers",
    style: "warn" as const,
    items: [
      "Terracotta roof tiles interlock — the profile of the replacement tile must precisely match the profile of the existing tile in order for the interlock to function",
      "A mismatched profile will not seat correctly, will not seal against wind-driven rain, and will leave gaps or create high points that allow water ingress",
      "Profile names and dimensions have varied across manufacturers and across production runs of the same manufacturer — tiles from different eras may differ",
      "Always compare a sample replacement tile against the existing in-situ tiles on the roof before ordering in quantity",
    ],
  },
  {
    title: "Minimum Pitch — Terracotta Tile Requirements",
    icon: "ruler",
    style: "check" as const,
    items: [
      "Terracotta interlocking tiles have a specified minimum pitch range — below this pitch, wind-driven rain can enter through the tile laps",
      "French-profile (Marseille) tiles typically have a lower minimum pitch than flat-profile tiles — confirm from manufacturer TDS",
      "AS 2049 and individual product TDS both specify minimum pitch — the more conservative of the two applies",
      "Do not install terracotta tiles below the minimum pitch without additional under-tile waterproofing as specified in the manufacturer installation guide",
    ],
  },
  {
    title: "Colour Continuity — Managing Partial Re-Roofs",
    icon: "layers",
    style: "warn" as const,
    items: [
      "Terracotta tiles are a natural fired clay product — colour varies between production batches and weathers over time",
      "Replacement tiles from current production will differ visually from 20–40-year-old weathered tiles on the same building",
      "For partial re-roofing, consider whether visual match is a contract requirement — discuss with the building owner before ordering",
      "Second-hand matching tiles may be available from roofing tile recyclers — these carry no manufacturer warranty but may provide a better colour match",
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

export function RoofTileTerracottaIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are terracotta roof tile replacement systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Terracotta roof tile replacement systems cover the supply and installation of fired clay interlocking roof tiles to replace cracked, broken, slipped, or missing tiles on pitched tiled roofs of Class 2 strata apartment buildings. Terracotta tiles are a natural product — made from clay fired at high temperature — and are characterised by their warm red-orange colour, natural thermal mass, and 50+ year design life when correctly installed and maintained.
        </p>
        {expanded && (
          <>
            <p>
              The most common terracotta tile profiles used on Australian strata buildings are French-profile (Marseille) tiles, which are the predominant tile type on Class 2 strata built between the 1960s and 2000s. Flat-profile terracotta tiles (such as the Monier Elabana) are less common and are used on steeply pitched roofs. Profile matching is critical in all terracotta tile replacement work — the replacement tile must have an identical interlocking profile to the existing tiles on the roof, or it will not seat correctly and will allow water ingress.
            </p>
            <p>
              AS 2049 is the Australian Standard governing clay roof tiles — compliance should be confirmed for all replacement tile products before specification. Pitch range, batten gauge, fixing method, and ridge and hip cap compatibility must all be confirmed from the current manufacturer technical data sheet before ordering replacement tiles.
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

export function RoofTileTerracottaProductSection() {
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
              AS 2049, profile matching, pitch requirements, colour continuity
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
            <p className="mt-1 text-sm text-slate-500">4 products — 3 brands — terracotta clay roof tiles — scroll to view all</p>
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
              Side-by-side comparison of terracotta roof tile products. Confirm all selections against current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Profile type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Clay type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">AS 2049</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Min pitch</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Clip fixing</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Heritage</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Colour range</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.profileType}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.clayType}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 font-semibold text-green-700">
                      <CheckCircle size={11} /> {row.as2049}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.minPitch}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.clipFixing}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.heritage}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.colourRange}</td>
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
              Guide to identifying brand equivalents by profile type. Profile compatibility must always be confirmed on site — this table is a guide only.
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
                { profile: "French profile", monier: "Marseille", boral: "Montrose", bristile: "Bristile French" },
                { profile: "Flat profile", monier: "Elabana", boral: "—", bristile: "—" },
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
