"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "uPVC"
  | "Marley"
  | "Gravity"
  | "Copper"
  | "Crane"
  | "Heritage";

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
    fullLabel: "Marley New Zealand / Aliaxis",
    brandUrl: "https://www.marley.com.au",
    accentColor: "#0369a1",
    name: "Marley uPVC Roof Overflow Pipe DN100",
    descriptionLine: "100mm uPVC pipe overflow system; includes top cap/strainer and bottom outlet fitting; compatible with Colorbond and concrete roofs; standard 3m lengths",
    productType: "uPVC gravity pipe overflow system — DN100",
    filterTags: ["uPVC", "Marley", "Gravity"],
    techChips: [
      { label: "uPVC", cls: "bg-sky-100 text-sky-800" },
      { label: "Marley", cls: "bg-slate-100 text-slate-700" },
      { label: "Gravity overflow", cls: "bg-green-50 text-green-700" },
      { label: "DN100", cls: "bg-slate-100 text-slate-700" },
      { label: "Colorbond / concrete compatible", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "The Marley uPVC Roof Overflow Pipe DN100 is a gravity-operated pipe overflow system manufactured from unplasticised PVC, designed for use as a secondary overflow outlet on flat roofs and low-pitched roof areas in both new construction and remedial work. The system includes a top cap or strainer to prevent debris ingress while maintaining the required overflow hydraulic capacity, and a bottom outlet fitting for connection to the roof drainage system or controlled discharge point. The pipe is set with its inlet at 25–50mm above the primary drain invert level, ensuring the system activates only during an emergency overflow event as required by AS/NZS 3500.3. Available in standard 3m lengths, compatible with Colorbond metal roofing and concrete roof substrates. The uPVC material is cost-effective, widely available through plumbing trade supply, and suitable for the majority of standard flat roof overflow applications in Australian conditions. Confirm the current product range, sizing, and fixing details with Marley or your local plumbing supplier before specifying.",
    technicalProperties: [
      "uPVC pipe body — DN100 — suitable for flat roof and low-pitched roof overflow applications",
      "Includes top cap or strainer — debris control while maintaining overflow hydraulic capacity",
      "Bottom outlet fitting included — connection to drainage system or controlled discharge",
      "Set with inlet at 25–50mm above primary drain invert per AS/NZS 3500.3",
      "Compatible with Colorbond metal roofing and concrete roof substrates",
      "Standard 3m lengths — cut to required height on site",
      "Cost-effective gravity overflow solution — widely available through plumbing trade supply nationally",
    ],
    limitations: [
      "Must be set at correct activation height — 25–50mm above primary drain invert — incorrect height renders overflow system non-compliant",
      "uPVC — confirm suitability for extreme heat exposure on dark-coloured metal roofs — high surface temperatures may affect material performance",
      "Not a heritage-appropriate product — for heritage and premium applications, specify copper overflow pipe instead",
      "Through-parapet penetration must be continuously waterproofed — pipe must be flashed and sealed at the wall penetration",
      "Strainer must be inspected and cleared regularly as part of building maintenance — blocked strainer will defeat overflow capacity",
      "Confirm current product range, DN options, and specifications with Marley Australia before ordering",
    ],
    procurementSources: [
      { name: "Marley Australia — trade supply", url: "https://www.marley.com.au" },
      { name: "Reece Plumbing", url: "https://www.reece.com.au" },
      { name: "Tradelink", url: "https://www.tradelink.com.au" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Crane Copper Tube",
    brandUrl: "https://www.cranecopper.com.au",
    accentColor: "#b45309",
    name: "Crane Copper Overflow Pipe System",
    descriptionLine: "DN75/DN100 soft-drawn copper tube; soldered fittings; formed lead flashing at penetration; for heritage and premium applications",
    productType: "Copper gravity pipe overflow system — DN75/DN100 — heritage applications",
    filterTags: ["Copper", "Crane", "Heritage"],
    techChips: [
      { label: "Copper", cls: "bg-amber-100 text-amber-800" },
      { label: "Crane", cls: "bg-slate-100 text-slate-700" },
      { label: "Heritage / premium", cls: "bg-green-50 text-green-700" },
      { label: "DN75 / DN100", cls: "bg-slate-100 text-slate-700" },
      { label: "Soldered fittings", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "The Crane Copper Overflow Pipe System is a gravity pipe overflow system using soft-drawn copper tube in DN75 or DN100 diameters, assembled on site with soldered copper fittings. Copper is the preferred material for overflow pipe systems on heritage buildings and premium architectural projects where visual compatibility with existing copper or lead flashings, gutters, and downpipes is required. The through-parapet wall penetration is sealed with formed lead flashing bonded to the copper pipe body — the lead is dressed around the pipe and into the waterproofing membrane or roof substrate to provide a continuous, watertight seal. Copper overflow pipes develop a natural patina over time that is compatible with the aesthetic character of heritage buildings. Suitable for both new installation and remedial replacement of failed or undersized overflow outlets on heritage roofs. Confirm the current product range, tube grades, and soldering requirements with Crane Copper Tube before specifying.",
    technicalProperties: [
      "Soft-drawn copper tube — DN75 and DN100 — assembled on site with soldered copper fittings",
      "Heritage and premium applications — compatible with existing copper flashings, gutters, and downpipes",
      "Formed lead flashing at through-parapet penetration — dressed around copper pipe and into waterproofing membrane",
      "Natural copper patina develops over time — aesthetically appropriate for heritage buildings",
      "Set with inlet at 25–50mm above primary drain invert per AS/NZS 3500.3",
      "Gravity overflow — no mechanical components — reliable, low-maintenance operation",
      "Suitable for remedial replacement on heritage roofs where uPVC would be inappropriate",
    ],
    limitations: [
      "Higher cost than uPVC systems — material and labour costs for copper pipe and soldered fittings exceed uPVC alternatives",
      "Requires skilled plumber for soldered copper fitting assembly — not suitable for DIY installation",
      "Lead flashing at penetration — confirm current requirements and lead handling regulations with the project plumber and WHS adviser",
      "Confirm compatibility with existing copper grades on heritage buildings — mixing copper alloy grades can cause galvanic issues",
      "Not required for standard non-heritage roofing applications — uPVC pipe overflow is the standard cost-effective alternative",
      "Confirm current product specifications and tube grades with Crane Copper Tube before ordering",
    ],
    procurementSources: [
      { name: "Crane Copper Tube — trade supply", url: "https://www.cranecopper.com.au" },
      { name: "Reece Plumbing", url: "https://www.reece.com.au" },
      { name: "Tradelink", url: "https://www.tradelink.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "uPVC", label: "uPVC" },
  { id: "Copper", label: "Copper" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  material: string;
  pipeSize: string;
  installation: string;
  suitableFor: string;
}[] = [
  {
    product: "uPVC Roof Overflow Pipe DN100",
    brand: "Marley",
    material: "uPVC",
    pipeSize: "DN100",
    installation: "Cut to height on site — slip joint or solvent-weld fittings",
    suitableFor: "Standard flat roofs — Colorbond and concrete — cost-effective",
  },
  {
    product: "Copper Overflow Pipe System",
    brand: "Crane",
    material: "Soft-drawn copper — soldered fittings",
    pipeSize: "DN75 / DN100",
    installation: "Soldered copper fittings — formed lead flashing at penetration",
    suitableFor: "Heritage buildings — premium architectural — copper flashing compatibility",
  },
];

const BRAND_EQUIV = [
  "Marley uPVC — standard cost-effective overflow pipe for the majority of flat roof applications in Australian construction and remedial work.",
  "Crane Copper — premium heritage-appropriate alternative where copper or lead flashing compatibility is required and visual character of the building demands a non-plastic overflow outlet.",
];

const TECH_INFO = {
  howItWorks: [
    "Pipe overflow systems use a vertical or angled pipe installed through the parapet wall with the pipe inlet open at the emergency overflow activation height",
    "The pipe inlet is set at 25–50mm above the primary drain invert — water level rises to this height only in the event of primary drain blockage",
    "When water reaches the pipe inlet, gravity carries overflow water through the pipe to the discharge point outside the building",
    "Hydraulic capacity of the pipe depends on pipe diameter, pipe length, and head of water above the inlet — confirm against AS/NZS 3500.3 sizing",
    "Pipe overflow systems are simple, reliable, and low-maintenance — no moving parts, no mechanical components",
  ],
  materialSelection: [
    "uPVC — cost-effective, widely available, suitable for the majority of standard flat roof overflow applications in Australia",
    "Copper — selected for heritage buildings, premium architectural projects, and where visual compatibility with existing copper flashings is required",
    "uPVC may be unsuitable for roofs with very high surface temperatures — dark Colorbond roofs in hot climates — confirm with manufacturer",
    "Copper requires skilled plumber for soldered fitting assembly — cost and lead time must be accounted for in programme and budget",
    "Both materials provide gravity overflow — neither is inherently superior in hydraulic performance at equivalent pipe sizes",
  ],
  flashing: [
    "The through-parapet pipe penetration must be continuously waterproofed — an unsealed penetration will allow water to enter the wall cavity",
    "uPVC pipe penetrations are typically sealed with a EPDM or neoprene pipe flashing collar bonded to the waterproofing membrane",
    "Copper pipe penetrations are traditionally sealed with formed lead flashing — the lead is dressed around the pipe and into the roof membrane or substrate",
    "For liquid-applied waterproofing membranes, a proprietary pipe penetration collar compatible with the membrane system should be used — confirm with the membrane supplier",
    "All pipe penetration flashings must be inspected and flood-tested before the roof is handed over to the owner",
  ],
  maintenance: [
    "Pipe overflow inlets and strainers must be inspected at least twice annually and after major storm events",
    "Leaves, debris, and bird nesting material can block overflow pipe inlets — blocked inlets defeat the overflow system and can lead to roof flooding",
    "Overflow pipe discharge points must remain clear and unobstructed — discharge must not impinge on building fabric, windows, or adjacent properties",
    "Include overflow pipe inspection in building maintenance plans and strata management schedules",
    "Replace any pipe overflow components that show signs of damage, corrosion, or displacement — a compromised overflow system is non-compliant",
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

export function PipeOverflowIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are pipe overflow systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Pipe overflow systems are secondary drainage outlets that use a vertical or angled pipe installed through the parapet wall of a flat or low-pitched roof. The pipe inlet is set at 25–50mm above the primary drain invert level, ensuring the system activates only when primary drainage is blocked and water level rises to the emergency overflow height as required by AS/NZS 3500.3.
        </p>
        {expanded && (
          <>
            <p>
              Pipe overflow systems are manufactured in uPVC for standard applications and in copper for heritage and premium architectural projects. The through-wall pipe penetration must be continuously waterproofed — typically with a formed lead flashing on copper systems, or a proprietary pipe penetration collar for uPVC. Both systems operate by gravity — no mechanical components, no power supply required.
            </p>
            <p>
              Sizing must be confirmed against AS/NZS 3500.3 and a hydraulic engineer's calculation. The overflow capacity must be at least 50% of the primary drain capacity. Regular inspection of the pipe inlet and any strainer is critical — a blocked overflow inlet removes the secondary drainage protection entirely.
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

export function PipeOverflowProductSection() {
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
              How pipe overflow works, uPVC vs copper selection, flashing at penetration, inspection and maintenance
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
              <TechCard icon={<Layers size={15} />} title="How Pipe Overflow Systems Work" items={TECH_INFO.howItWorks} style="bullet" />
              <TechCard icon={<Ruler size={15} />} title="uPVC vs Copper — Selection" items={TECH_INFO.materialSelection} style="check" />
              <TechCard icon={<BookOpen size={15} />} title="Flashing at Pipe Penetration" items={TECH_INFO.flashing} style="bullet" />
              <TechCard icon={<AlertTriangle size={15} />} title="Inspection and Maintenance" items={TECH_INFO.maintenance} style="warn" />
            </div>

            {/* Brand equivalency */}
            <div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50 p-5">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-sky-950 text-white">
                  <SquareStack size={12} />
                </div>
                <p className="text-sm font-extrabold text-sky-950">Brand Equivalency Notes</p>
              </div>
              <ul className="space-y-2">
                {BRAND_EQUIV.map((note, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs leading-5 text-sky-900">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
                    {note}
                  </li>
                ))}
              </ul>
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
            <p className="mt-1 text-sm text-slate-500">2 products — uPVC and copper pipe overflow systems — scroll to view all</p>
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
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll for all
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
              Side-by-side comparison of pipe overflow systems. Confirm all product selections against the current manufacturer TDS before specifying.
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
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Pipe size</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Installation</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Suitable for</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.pipeSize}</td>
                  <td className="px-4 py-3 text-slate-600">{row.installation}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.suitableFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
