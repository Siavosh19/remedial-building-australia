"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Lysaght"
  | "Stratco"
  | "Stramit"
  | "Colorbond"
  | "Custom"
  | "Colorbond-Ultra"
  | "Standard-size";

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
    fullLabel: "Lysaght",
    brandUrl: "https://www.lysaght.com",
    accentColor: "#f97316",
    name: "Lysaght Custom Colorbond Rainwater Head",
    descriptionLine: "Fabricated from BlueScope Colorbond Ultra steel; custom widths 200–600mm; depth 100–250mm; all Colorbond colours; strap outlets DN90/DN100; factory-folded seams; available from Lysaght branches nationally.",
    productType: "Custom-fabricated Colorbond steel rainwater head — Lysaght",
    filterTags: ["Lysaght", "Colorbond", "Custom", "Colorbond-Ultra"],
    techChips: [
      { label: "Lysaght", cls: "bg-orange-100 text-orange-800" },
      { label: "Colorbond Ultra", cls: "bg-sky-100 text-sky-800" },
      { label: "Custom fabricated", cls: "bg-slate-100 text-slate-700" },
      { label: "DN90 / DN100 outlet", cls: "bg-green-50 text-green-700" },
      { label: "All Colorbond colours", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Lysaght Custom Colorbond Rainwater Heads are fabricated from BlueScope Colorbond Ultra steel at Lysaght branch workshops to project specification. Custom widths from 200mm to 600mm and depths from 100mm to 250mm are available. All standard Colorbond colours can be matched to adjacent gutter lining and downpipe systems. Strap outlet collars are factory-formed to DN90 or DN100 for connection to round downpipes. Factory-folded seams provide a clean, weathertight joint without site fabrication risk. Lysaght's national branch network means supply is available in all major Australian states and territories — confirm lead time and nearest branch capability before programming installation. Specify the required width, depth, inlet opening, outlet size and Colorbond colour when requesting a quotation. Lysaght technical staff can advise on sizing relative to box gutter discharge volume and AS 1562.3 hydraulic requirements. Colorbond Ultra provides enhanced coating durability compared to standard Colorbond — appropriate for coastal and high-corrosivity environments.",
    technicalProperties: [
      "Fabricated from BlueScope Colorbond Ultra steel — enhanced coating system for superior corrosion resistance",
      "Custom widths 200–600mm, depths 100–250mm — fabricated to project specification",
      "DN90 and DN100 strap outlet collars — factory-formed for round downpipe connection",
      "Factory-folded seams — weathertight joint without site fabrication",
      "All standard Colorbond colours available — colour-matched to adjacent gutter and downpipe",
      "Available through Lysaght national branch network — confirm local branch lead time before specifying",
      "Suitable for residential, commercial, and Class 2 strata building applications",
    ],
    limitations: [
      "Custom fabrication — lead time must be confirmed with Lysaght branch before programming installation — not an off-the-shelf stock item",
      "Colorbond steel must not be in direct contact with copper or lead without appropriate isolation — dissimilar metal corrosion risk",
      "Rainwater head sizing must be confirmed by a hydraulic engineer for the catchment area — Lysaght can advise on fabrication dimensions but cannot provide a hydraulic design",
      "Factory-folded seams are not welded — confirm seam sealing method and sealant compatibility with Lysaght at time of order",
      "Colorbond is not suitable for highly acidic or alkaline environments — confirm suitability for the specific exposure environment",
      "Confirm current Colorbond colour availability and lead time with Lysaght before specifying — colour availability subject to change",
    ],
    procurementSources: [
      { name: "Lysaght — national branch network", url: "https://www.lysaght.com" },
      { name: "BlueScope Steel — product information", url: "https://www.bluescopesteel.com.au" },
    ],
  },
  {
    fullLabel: "Stratco",
    brandUrl: "https://www.stratco.com.au",
    accentColor: "#0369a1",
    name: "Stratco Colorbond Rainwater Head",
    descriptionLine: "Formed Colorbond steel rainwater head; standard sizes 200×150, 250×200, 300×250mm; matching Colorbond downpipe connection; available in all Colorbond colours; outlet 90mm or 100mm.",
    productType: "Standard-size Colorbond steel rainwater head — Stratco",
    filterTags: ["Stratco", "Colorbond", "Standard-size"],
    techChips: [
      { label: "Stratco", cls: "bg-sky-100 text-sky-800" },
      { label: "Standard sizes", cls: "bg-slate-100 text-slate-700" },
      { label: "Colorbond steel", cls: "bg-slate-100 text-slate-700" },
      { label: "90mm or 100mm outlet", cls: "bg-green-50 text-green-700" },
      { label: "All Colorbond colours", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Stratco manufactures and supplies Colorbond steel rainwater heads in standard sizes suited to the majority of residential and light commercial box gutter applications. Standard sizes available are 200×150mm, 250×200mm, and 300×250mm — width × depth — with 90mm or 100mm outlet for standard round downpipe connection. All standard Colorbond colours are available so the rainwater head can be colour-matched to the adjacent gutter lining and downpipe system. Stratco rainwater heads are formed Colorbond steel with flanged inlet and outlet connections. Available through Stratco branches and selected roofing distributors nationally. For applications where the box gutter discharge volume requires a larger rainwater head than Stratco's standard range, a custom-fabricated unit from Lysaght or a specialist sheet metal fabricator should be specified. Confirm current standard size availability with Stratco before specifying — product range subject to revision.",
    technicalProperties: [
      "Formed Colorbond steel rainwater head — standard sizes 200×150mm, 250×200mm, 300×250mm",
      "90mm or 100mm outlet collar — matches standard round downpipe sizes",
      "All standard Colorbond colours available — colour-matched to adjacent gutter and downpipe",
      "Flanged inlet connection for weather-tight transition from box gutter outlet",
      "Available through Stratco branches and roofing distributors nationally",
      "Standard sizes suit the majority of residential and light commercial box gutter applications",
      "Formed Colorbond steel — confirm BMT and coating grade with Stratco for coastal or high-corrosivity environments",
    ],
    limitations: [
      "Standard sizes only — if the required rainwater head is larger than 300×250mm, a custom-fabricated unit must be specified",
      "Confirm current standard size range and availability with Stratco before specifying — product range subject to revision",
      "Colorbond steel must not be in direct contact with copper or lead without appropriate isolation",
      "Rainwater head sizing must be confirmed by a hydraulic engineer for the catchment area — standard sizes do not guarantee hydraulic adequacy",
      "Confirm seam sealing and installation requirements with Stratco technical before specifying",
      "Not all colours may be stocked at all branches — confirm colour availability and lead time before ordering",
    ],
    procurementSources: [
      { name: "Stratco — national branch network", url: "https://www.stratco.com.au" },
    ],
  },
  {
    fullLabel: "Stramit",
    brandUrl: "https://www.stramit.com.au",
    accentColor: "#16a34a",
    name: "Stramit Colorbond Rainwater Head",
    descriptionLine: "BlueScope Colorbond steel rainwater head; custom or standard sizing; DN90 and DN100 outlet; complete in matching Colorbond colour to adjacent gutter and downpipe.",
    productType: "Colorbond steel rainwater head — Stramit — custom or standard",
    filterTags: ["Stramit", "Colorbond", "Custom"],
    techChips: [
      { label: "Stramit", cls: "bg-green-100 text-green-800" },
      { label: "BlueScope Colorbond", cls: "bg-slate-100 text-slate-700" },
      { label: "Custom or standard", cls: "bg-slate-100 text-slate-700" },
      { label: "DN90 / DN100 outlet", cls: "bg-green-50 text-green-700" },
      { label: "Colour-matched", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Stramit supplies BlueScope Colorbond steel rainwater heads in both standard and custom sizes for box gutter applications. Stramit's national distribution network covers metropolitan and regional areas across Australia, making it a practical supply option for projects in locations where other suppliers have limited branch coverage. Rainwater heads are supplied with DN90 and DN100 outlet collars for connection to standard round downpipes. The complete unit — inlet, body, and outlet — is manufactured in matching Colorbond colour to provide a uniform appearance with the adjacent gutter lining and downpipe system. Custom sizing is available where the box gutter discharge volume requires a rainwater head larger than standard. Confirm current product availability, standard sizes, custom fabrication lead time, and Colorbond colour options with the nearest Stramit branch before specifying. Stramit technical staff can assist with sizing guidance relative to the hydraulic design.",
    technicalProperties: [
      "BlueScope Colorbond steel rainwater head — standard or custom sizing to project specification",
      "DN90 and DN100 outlet collars available — standard round downpipe connection",
      "Complete unit in matching Colorbond colour — inlet, body, and outlet colour-matched",
      "National distribution network — available in metropolitan and regional areas",
      "Custom sizes available for non-standard box gutter applications",
      "Suitable for residential, commercial, and Class 2 strata building applications",
      "Confirm current product range, standard sizes, and custom fabrication capability with Stramit",
    ],
    limitations: [
      "Confirm current standard size range, custom fabrication capability, and lead time with Stramit before specifying",
      "Colorbond steel must not be in direct contact with copper or lead without appropriate isolation — dissimilar metal corrosion risk",
      "Rainwater head sizing must be confirmed by a hydraulic engineer for the catchment area",
      "Confirm Colorbond colour availability with the nearest Stramit branch before ordering — not all colours stocked at all locations",
      "Custom fabrication requires longer lead time than standard sizes — confirm programme impact before specifying custom units",
      "Confirm seam type, sealing requirements, and installation details with Stramit technical before specifying",
    ],
    procurementSources: [
      { name: "Stramit — national branch network", url: "https://www.stramit.com.au" },
      { name: "BlueScope Steel — product information", url: "https://www.bluescopesteel.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Lysaght", label: "Lysaght" },
  { id: "Stratco", label: "Stratco" },
  { id: "Stramit", label: "Stramit" },
  { id: "Colorbond", label: "Colorbond" },
  { id: "Custom", label: "Custom" },
  { id: "Colorbond-Ultra", label: "Colorbond Ultra" },
  { id: "Standard-size", label: "Standard size" },
];

const SYSTEM_COMPARISON: {
  supplier: string;
  sizeRange: string;
  outletDN: string;
  colorbondColours: string;
}[] = [
  {
    supplier: "Lysaght",
    sizeRange: "Custom — 200–600mm wide, 100–250mm deep",
    outletDN: "DN90 / DN100",
    colorbondColours: "All standard Colorbond colours",
  },
  {
    supplier: "Stratco",
    sizeRange: "Standard — 200×150, 250×200, 300×250mm",
    outletDN: "90mm or 100mm",
    colorbondColours: "All standard Colorbond colours",
  },
  {
    supplier: "Stramit",
    sizeRange: "Standard and custom — confirm with branch",
    outletDN: "DN90 / DN100",
    colorbondColours: "All standard Colorbond colours",
  },
];

const TECH_INFO = {
  sizing: [
    "Rainwater head sizing is determined by the box gutter catchment area and design rainfall intensity — AS/NZS 3500.3 (Stormwater Drainage) provides the calculation method",
    "The inlet area of the rainwater head must be sufficient to accept the full box gutter discharge flow without surcharging — undersized rainwater heads are a primary cause of box gutter overflow",
    "Entry hood design — open top vs hooded inlet — affects leaf and debris management at the rainwater head. Hooded inlets reduce leaf ingress but must be sized to pass the full design flow",
    "The outlet spigot must be sized to match or exceed the design downpipe diameter — do not reduce the downpipe size at the rainwater head connection",
  ],
  positioning: [
    "Rainwater heads must be positioned at the low point of the box gutter — confirm correct gutter fall to the outlet before fabricating the rainwater head",
    "The inlet face of the rainwater head should align with the internal face of the gutter to minimise turbulence and debris accumulation at the transition",
    "Rainwater head positioning must allow for downpipe expansion joints where required — confirm expansion joint locations with the hydraulic engineer before setting out",
    "Integration with stormwater connection — confirm the downpipe outlet invert level at the rainwater head relative to the drainage connection point before installation",
  ],
  brandEquivalence: [
    "Lysaght, Stratco, and Stramit all supply Colorbond steel rainwater heads from BlueScope Colorbond coil — finished product quality depends on the fabricator and the specified seam type",
    "Selection is typically driven by the roofing contractor's preferred sheet metal supplier and local branch availability rather than material or product differences",
    "Custom fabrication capability varies between branches — confirm fabrication capability before specifying a custom unit from a specific supplier",
    "For coastal and high-corrosivity environments, specify Colorbond Ultra steel (Lysaght, Stramit) rather than standard Colorbond for enhanced coating durability",
  ],
  installation: [
    "All laps and joints at the rainwater head connection to the box gutter must be sealed with a compatible sealant — confirm sealant type with the fabricator",
    "The rainwater head must be mechanically fixed to prevent movement under wind and water load — fixings must not penetrate the waterproof skin of the adjacent gutter lining",
    "Flash the rainwater head inlet connection to the box gutter lining to prevent water ingress behind the unit — confirm flashing detail with the roofing engineer",
    "Dissimilar metal isolation is required where Colorbond steel rainwater heads connect to copper downpipes or are installed adjacent to copper or lead components",
  ],
};

/* ── Collapsible helpers ── */

function CollapsibleList({
  items,
  icon,
  limit = 3,
}: {
  items: string[];
  icon: "check" | "x" | "bullet";
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
            ) : icon === "x" ? (
              <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />
            ) : (
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
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

export function RainwaterHeadColorbondIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are Colorbond steel rainwater heads for box gutters?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Rainwater heads — also called rain heads or conductor heads — are fabricated sheet metal boxes mounted at the outlet of a box gutter that collect the gutter discharge and transition the flow from the wide gutter section into a downpipe. They reduce turbulence at the gutter-to-downpipe transition, slow the water velocity to reduce the risk of debris blockage in the downpipe, and provide a visible overflow indicator when the drainage system is at capacity. On Australian Class 2 strata buildings, Colorbond steel is the most common specification for rainwater heads due to its durability, wide colour range, and availability through national fabricators.
        </p>
        {expanded && (
          <>
            <p>
              Colorbond steel rainwater heads are fabricated either as standard sizes by manufacturers such as Stratco or as custom-fabricated units by Lysaght or Stramit to project-specific dimensions. The inlet opening must be sized to accept the full box gutter discharge flow without surcharging, and the outlet must match or exceed the design downpipe diameter. Sizing is determined by the catchment area and design rainfall intensity per AS/NZS 3500.3 — this is an engineering calculation, not a product selection.
            </p>
            <p>
              Colorbond steel rainwater heads must be colour-matched to the adjacent gutter lining and downpipe for a uniform appearance. Dissimilar metal isolation is required where Colorbond steel rainwater heads connect to copper or lead components. For coastal and high-corrosivity environments, Colorbond Ultra should be specified in preference to standard Colorbond.
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

export function RainwaterHeadColorbondProductSection() {
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
              Sizing, positioning, brand equivalence, and installation notes
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
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
              <TechCard icon={<Ruler size={15} />} title="Sizing Rainwater Heads for Box Gutter Discharge" items={TECH_INFO.sizing} style="bullet" />
              <TechCard icon={<Layers size={15} />} title="Positioning and Integration" items={TECH_INFO.positioning} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="Brand Equivalence" items={TECH_INFO.brandEquivalence} style="bullet" />
              <TechCard icon={<AlertTriangle size={15} />} title="Installation Notes" items={TECH_INFO.installation} style="warn" />
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — Colorbond steel rainwater heads for box gutters — scroll to view all</p>
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
              Side-by-side comparison of Colorbond steel rainwater head suppliers. Confirm all product selections against the current supplier before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Size range</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Outlet DN</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Colorbond colours available</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.supplier} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.supplier}</td>
                  <td className="px-4 py-3 text-slate-600">{row.sizeRange}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.outletDN}</td>
                  <td className="px-4 py-3 text-slate-600">{row.colorbondColours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
