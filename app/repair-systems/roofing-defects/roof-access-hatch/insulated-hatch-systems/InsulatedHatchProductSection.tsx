"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Fakro"
  | "Milcor"
  | "Insulated"
  | "Integrated-ladder"
  | "Airtight"
  | "Thermal-break"
  | "Mineral-wool";

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
    fullLabel: "Fakro Australia",
    brandUrl: "https://www.fakro.com.au",
    tdsUrl: "https://www.fakro.com.au/products/attic-stairs/insulated/lst/",
    accentColor: "#16a34a",
    name: "Fakro LST Insulated Attic Hatch",
    descriptionLine: "Thermally insulated steel-framed hatch; 700×1000mm standard; EPS foam insulated cover; 160kg ladder capacity; airtight perimeter seal; 60min fire resistance option.",
    productType: "Insulated attic hatch with integrated ladder — airtight — EPS insulated cover",
    filterTags: ["Fakro", "Insulated", "Integrated-ladder", "Airtight"],
    techChips: [
      { label: "Fakro", cls: "bg-green-100 text-green-800" },
      { label: "Insulated EPS cover", cls: "bg-slate-100 text-slate-700" },
      { label: "Integrated ladder", cls: "bg-green-50 text-green-700" },
      { label: "Airtight perimeter seal", cls: "bg-amber-50 text-amber-700" },
      { label: "160kg ladder capacity", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "The Fakro LST is a thermally insulated attic access hatch with an integrated folding ladder system, designed to comply with NCC Section J energy efficiency requirements for roof penetrations in Class 2 conditioned buildings. The hatch cover incorporates an EPS (expanded polystyrene) foam insulation layer that provides thermal resistance at the hatch opening, reducing the thermal bridging effect that is inherent in a non-insulated hatch at a roof penetration in a conditioned space. The airtight perimeter seal reduces air leakage between the conditioned room below and the roof space above — a critical requirement in NCC Section J compliant buildings where uncontrolled air movement through the building envelope is a significant source of energy loss. The integrated folding ladder is rated to 160kg and can be specified in lengths to suit varying floor-to-ceiling heights — confirm the ladder length with Fakro Australia for the specific floor-to-ceiling height in the building. The 700×1000mm standard size is designed to meet the minimum clear opening requirements of AS 1657 for roof access by a maintenance person carrying tools or equipment. A 60-minute fire resistance option is available — confirm fire resistance requirements with the building surveyor before specifying. The LST is appropriate where a combined insulated hatch and integrated ladder system is required, avoiding the need for a separately supplied fixed ladder. Confirm current NCC Section J compliance status, R-value of the EPS cover, and airtightness rating with Fakro Australia before specifying for the specific climate zone.",
    technicalProperties: [
      "Thermally insulated attic hatch with integrated folding ladder — 700×1000mm standard",
      "EPS foam insulated cover — R-value to be confirmed with Fakro Australia for NCC Section J compliance in specific climate zone",
      "Airtight perimeter seal — reduces air leakage between conditioned room and roof space",
      "Integrated ladder rated to 160kg — confirm ladder length for specific floor-to-ceiling height with Fakro Australia",
      "60-minute fire resistance option available — confirm requirement with building surveyor before ordering",
      "NCC Section J compliant roof penetration design — reduces thermal bridging at hatch opening",
      "Confirm current product specification, R-value, and airtightness rating with Fakro Australia before specifying",
    ],
    limitations: [
      "EPS insulated cover — confirm current R-value with Fakro Australia — do not assume R-value meets NCC Section J requirement for the specific climate zone without confirmation",
      "Integrated ladder is a folding system — confirm that the deployed ladder angle and stair-to-riser geometry meets AS 1657 requirements for the specific installation",
      "700×1000mm standard size — confirm that this size meets AS 1657 clear opening requirements for the specific use case and building configuration",
      "60-minute fire rating is an option — not standard — confirm and specify if required — do not assume fire rating is included",
      "Airtight seal must be maintained — the seal is subject to compression set over time — confirm maintenance and re-sealing requirements with Fakro",
      "Confirm current product availability and lead times with Fakro Australia before ordering",
    ],
    procurementSources: [
      { name: "Fakro Australia — trade supply", url: "https://www.fakro.com.au" },
      { name: "Roofmaster", url: "https://www.roofmaster.com.au" },
      { name: "Trend Windows", url: "https://www.trendwindows.com.au" },
    ],
  },
  {
    fullLabel: "Milcor",
    brandUrl: "https://www.milcor.com",
    tdsUrl: "https://www.milcor.com/products/access-doors/ssd/",
    accentColor: "#0369a1",
    name: "Milcor SSD Insulated Access Door",
    descriptionLine: "Steel frame with thermal break; mineral wool insulation; 12.7mm drywall-faced lid; suitable for air-conditioned spaces; EPDM compression seal; 150mm curb height.",
    productType: "Insulated access door — thermal break frame — mineral wool insulation",
    filterTags: ["Milcor", "Insulated", "Thermal-break", "Mineral-wool"],
    techChips: [
      { label: "Milcor", cls: "bg-sky-100 text-sky-800" },
      { label: "Thermal break frame", cls: "bg-slate-100 text-slate-700" },
      { label: "Mineral wool insulation", cls: "bg-green-50 text-green-700" },
      { label: "EPDM compression seal", cls: "bg-amber-50 text-amber-700" },
      { label: "Drywall-faced lid", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "The Milcor SSD is a thermally insulated steel-framed access door (not a hatch with integral ladder) for air-conditioned spaces where thermal performance and airtightness at the opening are required. The steel frame incorporates a thermal break to reduce the thermal conductance of the frame itself — a critical consideration in NCC Section J compliant buildings where an uninsulated steel frame would create a significant thermal bridge at the roof penetration. The insulated lid contains mineral wool (rockwool) insulation, which provides both thermal resistance and acoustic damping — a useful property in strata buildings where noise transmission between floors and the roof space is a design consideration. The lid is faced with 12.7mm drywall (plasterboard) on the room-side face, which integrates with the ceiling finish and can be taped and set to match the surrounding ceiling — a requirement in strata buildings where a seamless finished appearance is expected. The EPDM compression seal on the frame head provides a weathertight and airtight closure when the door is shut. The 150mm curb height is appropriate for standard flat roof or ceiling applications — confirm curb height requirements with the structural engineer for the specific installation. The SSD does not include an integrated ladder — a separate fixed access ladder to AS 1657 must be specified and installed separately. Confirm current NCC Section J compliance, R-value, and thermal break specification with Milcor Australia before specifying.",
    technicalProperties: [
      "Insulated steel-framed access door — thermal break frame — mineral wool insulated lid",
      "Lid faced with 12.7mm drywall on room side — integrates with ceiling finish — can be taped and set",
      "EPDM compression seal — airtight closure — suitable for air-conditioned spaces",
      "Thermal break frame — reduces thermal conductance of steel frame at roof penetration",
      "Mineral wool insulation — thermal resistance and acoustic damping",
      "150mm curb height — confirm with structural engineer for specific installation",
      "Confirm current R-value, NCC Section J compliance, and thermal break specification with Milcor Australia",
    ],
    limitations: [
      "No integrated ladder — a separate fixed access ladder to AS 1657 must be specified and installed — do not specify SSD without a separate ladder plan",
      "Confirm R-value of mineral wool insulation with Milcor Australia — do not assume the R-value meets NCC Section J requirement for the specific climate zone without confirmation",
      "Steel frame with thermal break — confirm the thermal break specification reduces the frame U-value to the level required for NCC Section J compliance in the specific climate zone",
      "Drywall-faced lid — not suitable for external rooftop applications — the SSD is an internal access door to the roof space, not an external weathering hatch",
      "Confirm fire resistance requirements with the building surveyor — the SSD may require a fire-rated specification for some Class 2 building applications",
      "Confirm current product specification, lead times, and distributor availability before ordering",
    ],
    procurementSources: [
      { name: "Milcor — trade supply via Australian distributors", url: "https://www.milcor.com" },
      { name: "Raven Products", url: "https://www.raven.com.au" },
      { name: "Access Products Australia", url: "https://www.accessproducts.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag | "All"; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Fakro", label: "Fakro" },
  { id: "Milcor", label: "Milcor" },
];

const SYSTEM_COMPARISON: {
  product: string;
  rValue: string;
  ladderIncluded: string;
  sealType: string;
  fireRating: string;
}[] = [
  {
    product: "Fakro LST",
    rValue: "Confirm with Fakro Australia",
    ladderIncluded: "Yes — integrated folding ladder, 160kg rated",
    sealType: "Airtight perimeter seal",
    fireRating: "60min option available — confirm if required",
  },
  {
    product: "Milcor SSD",
    rValue: "Confirm with Milcor Australia",
    ladderIncluded: "No — separate fixed ladder required",
    sealType: "EPDM compression seal",
    fireRating: "Confirm fire-rated option with Milcor",
  },
];

const TECH_INFO = [
  "NCC Section J requirements for roof penetrations in conditioned spaces — confirm R-value and airtightness requirements for the specific climate zone before specifying",
  "Integrated ladder vs separate fixed ladder for roof access compliance — integrated folding ladders must meet AS 1657 stair angle and tread requirements — confirm with manufacturer",
  "Thermal bridging at hatch frame — thermal break design reduces but does not eliminate frame conductance — confirm frame U-value with manufacturer before specifying for NCC Section J",
  "Fire resistance requirements for hatches in Class 2 buildings — confirm with building surveyor whether a fire-rated hatch is required at the specific roof penetration location",
];

const BRAND_EQUIV = [
  "Fakro LST — insulated hatch with integrated folding ladder — appropriate for habitable space access where a combined hatch and ladder solution is required",
  "Milcor SSD — insulated access door without integral ladder — appropriate where a separate fixed ladder is already installed or specified separately",
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

export function InsulatedHatchIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are thermally insulated roof hatch systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Insulated roof access hatches reduce thermal bridging at the roof penetration point and are required in NCC Section J energy-compliant buildings. Fakro LST and equivalent units include integral attic ladders, insulated covers and airtight seals to comply with energy efficiency requirements.
        </p>
        {expanded && (
          <>
            <p>
              An uninsulated roof hatch in a conditioned space creates a significant thermal bridge — the uninsulated steel or aluminium frame conducts heat directly between the conditioned room and the unconditioned roof space, undermining the thermal performance of the roof insulation system. NCC Section J requires that all roof penetrations in conditioned Class 2 buildings address this thermal bridging through an insulated and airtight hatch specification.
            </p>
            <p>
              The choice between an integrated ladder system (Fakro LST) and an access door without integral ladder (Milcor SSD) depends on whether a fixed access ladder is already installed or is being specified separately. Both products must have their R-values and airtightness ratings confirmed against the NCC Section J requirements for the specific climate zone before specification.
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

export function InsulatedHatchProductSection() {
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
              NCC Section J requirements, thermal bridging, fire rating, brand equivalencies
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
            <p className="mt-1 text-sm text-slate-500">2 products — insulated roof hatch systems — scroll to view all</p>
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
              Side-by-side comparison of insulated roof hatch systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">R-value</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Ladder included</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Seal type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Fire rating</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.rValue}</td>
                  <td className="px-4 py-3 text-slate-600">{row.ladderIncluded}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.sealType}</td>
                  <td className="px-4 py-3 text-slate-600">{row.fireRating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
