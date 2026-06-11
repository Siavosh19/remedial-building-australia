"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Velux"
  | "Fakro"
  | "Tile-roof"
  | "Aluminium"
  | "Insulated";

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
    fullLabel: "Velux Australia",
    brandUrl: "https://www.velux.com.au",
    tdsUrl: "https://www.velux.com.au/products/flashings/edz-insulated-flashing",
    accentColor: "#0369a1",
    name: "Velux EDZ MK04",
    descriptionLine: "Insulated flashings for tiles; suits GGL/GGU MK04 (78×98cm); aluminium with powder coat; internal membrane and external step/counter flashing; weatherproof for all standard tile profiles.",
    productType: "Matched insulated tile flashing kit — Velux GGL/GGU MK04",
    filterTags: ["Velux", "Tile-roof", "Aluminium", "Insulated"],
    techChips: [
      { label: "Velux", cls: "bg-sky-100 text-sky-800" },
      { label: "Tile-roof", cls: "bg-slate-100 text-slate-700" },
      { label: "Aluminium powder-coated", cls: "bg-green-50 text-green-700" },
      { label: "Insulated", cls: "bg-amber-50 text-amber-700" },
      { label: "MK04 size — 78×98cm", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "The Velux EDZ MK04 is the matched insulated tile flashing kit for Velux GGL and GGU roof windows in the MK04 size (78×98cm). It is a model-specific and size-specific product — the EDZ MK04 cannot be used with any other Velux size and is not interchangeable with flashing kits from other manufacturers. The kit includes powder-coated aluminium step and counter flashings, an internal underfelt/membrane collar, and an insulated upstand that reduces thermal bridging at the skylight perimeter. The aluminium components are factory formed to match the tile profile geometries of all standard Australian tile types including terracotta plain tiles, concrete tiles, and Decramastic tiles — however, the installer must confirm compatibility with the specific tile profile on site before ordering. The step flashing sequence follows a specific Velux-prescribed installation order: underfelt collar first, then the insulated upstand, then the aluminium step flashings, then the counter flashing last. Deviation from this sequence can result in a detail that does not achieve the intended weathertight condition. Velux publishes installation guides for the EDZ kit including video instructions — confirm the current installation sequence from Velux Australia documentation. This kit is the mandatory companion product for the GGL MK04 on tiled roofs — generic lead flashings or site-made aluminium flashings are not an acceptable substitute and will void the Velux warranty.",
    technicalProperties: [
      "Matched insulated flashing kit for Velux GGL/GGU MK04 (78×98cm) — model-specific and size-specific",
      "Powder-coated aluminium step and counter flashings — compatible with terracotta, concrete, and Decramastic tile profiles",
      "Internal underfelt/membrane collar included — prevents water ingress under tile at skylight upstand",
      "Insulated upstand — reduces thermal bridging at skylight perimeter — improves NCC Section J compliance",
      "5-piece installation system — prescribed Velux installation sequence must be followed",
      "Weatherproof for all standard Australian tile profiles — confirm compatibility with specific on-site tile profile",
      "Mandatory companion product for GGL MK04 on tiled roofs — generic flashings not acceptable",
    ],
    limitations: [
      "Model-specific and size-specific — EDZ MK04 suits GGL/GGU MK04 only — confirm skylight model and size before ordering",
      "Not suitable for metal roof applications — separate Velux BDX or BFX flashing kit required for metal and corrugated iron roofs",
      "Aluminium flashings are factory-formed — site adjustment to tile profile must be within the tolerance range — confirm with installer before ordering",
      "Installation sequence is prescribed — deviation from the Velux installation guide may compromise weathertightness and void warranty",
      "Insulated upstand reduces but does not eliminate thermal bridging at frame perimeter — confirm NCC Section J compliance for climate zone with Velux Australia",
      "Confirm current product code and availability with Velux Australia before ordering — product codes are subject to periodic revision",
    ],
    procurementSources: [
      { name: "Velux Australia — trade supply", url: "https://www.velux.com.au" },
      { name: "Roofmaster", url: "https://www.roofmaster.com.au" },
      { name: "Bunnings", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Fakro Australia",
    brandUrl: "https://www.fakro.com.au",
    tdsUrl: "https://www.fakro.com.au/products/flashings/lft-insulated-flashing-kit/",
    accentColor: "#16a34a",
    name: "Fakro LFT Insulated Flashing Kit",
    descriptionLine: "Aluminium insulated flashing for Fakro FTP/FTU skylights; fits all standard sizes; suitable for terracotta, concrete and Decramastic tile; 5-piece install system.",
    productType: "Matched insulated tile flashing kit — Fakro FTP/FTU series",
    filterTags: ["Fakro", "Tile-roof", "Aluminium", "Insulated"],
    techChips: [
      { label: "Fakro", cls: "bg-green-100 text-green-800" },
      { label: "Tile-roof", cls: "bg-slate-100 text-slate-700" },
      { label: "Aluminium", cls: "bg-green-50 text-green-700" },
      { label: "Insulated", cls: "bg-amber-50 text-amber-700" },
      { label: "5-piece system", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "The Fakro LFT Insulated Flashing Kit is the matched aluminium insulated tile flashing system for the Fakro FTP and FTU range of roof windows and skylights. Unlike the Velux EDZ which is sized to a specific skylight model, the Fakro LFT is available to suit all standard Fakro skylight sizes in the FTP/FTU range — confirm the specific kit code for the skylight size being installed. The LFT kit comprises a 5-piece aluminium system including an insulated underfelt collar, step flashings, a top counter flashing, and side flashings, all powder-coated for durability and corrosion resistance. The insulated collar reduces thermal bridging at the skylight perimeter and is compatible with the NCC Section J thermal performance requirements for roof penetrations in Class 2 buildings. The kit is suitable for terracotta plain tiles, concrete tiles, and Decramastic tiles — on-site confirmation of tile profile compatibility is required before installation. The Fakro LFT is the mandatory companion product for Fakro roof window installation on tiled roofs. The Fakro installation guide prescribes a specific installation sequence — confirm the current sequence from the Fakro Australia documentation. Fakro LFT kits are sold by size to match the specific skylight unit purchased — both must be ordered together. The LFT must not be used with Velux skylight units, and the Velux EDZ must not be used with Fakro units — the frame dimensions and upstand geometries are manufacturer-specific.",
    technicalProperties: [
      "Matched insulated tile flashing kit for Fakro FTP/FTU series — available for all standard Fakro skylight sizes",
      "5-piece aluminium installation system — step flashings, counter flashing, insulated underfelt collar, and side flashings",
      "Powder-coated aluminium — corrosion resistant — suitable for Australian coastal and inland environments",
      "Insulated collar — reduces thermal bridging at skylight perimeter — NCC Section J compliant installation",
      "Compatible with terracotta plain tiles, concrete tiles, and Decramastic tile profiles",
      "Manufacturer-prescribed installation sequence — confirm current sequence from Fakro Australia documentation",
      "Must be matched to the specific Fakro skylight size — confirm kit code with Fakro before ordering",
    ],
    limitations: [
      "Fakro LFT must only be used with Fakro FTP/FTU skylight units — not compatible with Velux or other manufacturer units",
      "Not suitable for metal or corrugated iron roof applications — confirm separate Fakro metal roof flashing kit for non-tile roofs",
      "Tile profile compatibility must be confirmed on-site before installation — the LFT is designed for standard tile profiles, not unusual or oversized tile types",
      "Kit code is size-specific — confirm the correct LFT size for the skylight being installed — do not substitute a different size kit",
      "Insulated collar reduces but does not eliminate thermal bridging — confirm NCC Section J compliance for specific climate zone with Fakro Australia",
      "Confirm current product availability and lead times with Fakro Australia before ordering",
    ],
    procurementSources: [
      { name: "Fakro Australia — trade supply", url: "https://www.fakro.com.au" },
      { name: "Roofmaster", url: "https://www.roofmaster.com.au" },
      { name: "Trend Windows", url: "https://www.trendwindows.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag | "All"; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Velux", label: "Velux" },
  { id: "Fakro", label: "Fakro" },
];

const SYSTEM_COMPARISON: {
  brand: string;
  sizesAvailable: string;
  tileCompatibility: string;
  insulationIncluded: string;
}[] = [
  {
    brand: "Velux EDZ",
    sizesAvailable: "Size-specific — confirm code for skylight model and size",
    tileCompatibility: "Terracotta, concrete, Decramastic",
    insulationIncluded: "Yes — insulated upstand",
  },
  {
    brand: "Fakro LFT",
    sizesAvailable: "Available for all standard Fakro FTP/FTU sizes",
    tileCompatibility: "Terracotta, concrete, Decramastic",
    insulationIncluded: "Yes — insulated underfelt collar",
  },
];

const TECH_INFO = [
  "Why matched flashing kits are required — frame upstand dimensions are manufacturer-specific and generic lead flashings cannot achieve the same weathertight geometry",
  "Correct installation sequence for step and counter flashings with skylights — underfelt collar first, insulated upstand, step flashings, then counter flashing last",
  "Metal roof vs tiled roof flashing kit differences — separate kit range required for corrugated iron, Colorbond and other metal profile roofs",
  "Flashing maintenance and re-sealing without skylight replacement — silicone sealant at counter flashing head joint is a maintenance item — inspect every 5 years",
];

const BRAND_EQUIV = [
  "Velux EDZ ≈ Fakro LFT — both matched aluminium insulated flashing kits for tiled roofs, 5-piece system, powder-coated",
  "Both are model-specific — must match the skylight unit purchased — EDZ for Velux units, LFT for Fakro units only",
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

export function SkylightFlashingIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are skylight flashing kit systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Skylight flashing kits seal the junction between the skylight frame and the roof covering, preventing water ingress at what is one of the most common leak points in residential and Class 2 buildings. Velux EDZ and Fakro LFT matched kits are engineered to specific skylight models and roof tile profiles to ensure weatherproof installation.
        </p>
        {expanded && (
          <>
            <p>
              Matched manufacturer flashing kits are mandatory for skylight installation on tiled roofs. Generic lead flashings and site-made aluminium flashings cannot replicate the engineered geometry of the manufacturer kit and will not achieve the same weathertightness outcome. Installation with non-matched flashings will void the skylight warranty and is likely to result in water ingress.
            </p>
            <p>
              The flashing kit must match both the skylight brand and the specific size. Velux and Fakro flashing kits are not interchangeable between brands — the frame upstand dimensions are different. Confirm the correct flashing kit code for the specific skylight unit being installed before ordering.
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

export function SkylightFlashingProductSection() {
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
              Installation requirements, brand equivalencies, maintenance notes
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
          <div className="border-t border-slate-100 px-7 pb-7 pt-6 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <TechCard
                icon={<Layers size={15} />}
                title="Technical Information"
                items={TECH_INFO}
                style="bullet"
              />
              <TechCard
                icon={<Ruler size={15} />}
                title="Brand Equivalencies"
                items={BRAND_EQUIV}
                style="check"
              />
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
            <p className="mt-1 text-sm text-slate-500">2 products — skylight flashing kit systems — scroll to view all</p>
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
                  <p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
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
              Side-by-side comparison of skylight flashing kit systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Sizes available</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Tile compatibility</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Insulation included</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.brand} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.sizesAvailable}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.tileCompatibility}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.insulationIncluded}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
