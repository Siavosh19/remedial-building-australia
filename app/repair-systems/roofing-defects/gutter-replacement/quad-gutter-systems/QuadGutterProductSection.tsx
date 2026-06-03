"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Lysaght"
  | "Stramit"
  | "Stratco"
  | "Colorbond"
  | "Quad"
  | "115mm"
  | "150mm"
  | "125mm";

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
    accentColor: "#0369a1",
    name: "Lysaght QUAD Gutter",
    descriptionLine: "Formed Colorbond/Zincalume steel quad gutter; 115mm and 150mm sizes; 6m lengths; complete range of angles, joiners, end caps and downpipe adapters; BHP steel substrate.",
    productType: "Colorbond/Zincalume steel quad (ogee) gutter — 115mm and 150mm",
    filterTags: ["Lysaght", "Colorbond", "Quad", "115mm", "150mm"],
    techChips: [
      { label: "Lysaght", cls: "bg-sky-100 text-sky-800" },
      { label: "Colorbond / Zincalume", cls: "bg-slate-100 text-slate-700" },
      { label: "115mm and 150mm", cls: "bg-green-50 text-green-700" },
      { label: "6m lengths", cls: "bg-slate-100 text-slate-700" },
      { label: "Full fittings range", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Lysaght QUAD Gutter is the market-leading quad (ogee) profile gutter formed from BlueScope Colorbond or Zincalume steel. Available in 115mm and 150mm standard residential sizes with 6m standard lengths. The Lysaght system includes a comprehensive range of internal and external angles, joiners, stop ends, and downpipe adapters to allow complete installation of the gutter system without site-fabricated components. The quad profile is the dominant residential gutter shape in Australia, characterised by its ogee (S-shaped) cross-section. Lysaght gutters are formed from BHP BlueScope steel substrate and are available in the full range of current Colorbond colours. For coastal and marine environments, Zincalume steel provides enhanced corrosion resistance compared to standard painted finishes. Replacement works must comply with AS/NZS 3500.3 for minimum gutter fall (1:500) and outlet sizing. Confirm the current product range, available sizes, and Colorbond colour availability with Lysaght or your local roofing supplier before ordering.",
    technicalProperties: [
      "Quad (ogee) profile formed from BlueScope Colorbond or Zincalume steel — 115mm and 150mm standard sizes",
      "Available in 6m lengths — complete range of fittings: angles, joiners, stop ends, and downpipe adapters",
      "Full range of current Colorbond colours — coastal environments may warrant Zincalume specification",
      "BHP BlueScope steel substrate — compatible with standard fascia bracket fixing systems",
      "Minimum fall 1:500 per AS/NZS 3500.3 — outlet sizing to match rainfall intensity zone",
      "Compatible with standard round and rectangular downpipe adapters and connection systems",
      "Nationally available through roofing suppliers and Lysaght distributors",
    ],
    limitations: [
      "Not suitable for box gutter applications — this is a profiled external eave gutter only",
      "Gutter sizing must be confirmed against rainfall intensity zones per AS/NZS 3500.3 — do not assume 115mm is adequate in high-intensity rainfall zones without calculation",
      "Colorbond finish is not suitable for direct contact with dissimilar metals (copper, lead) — confirm material compatibility on heritage or mixed-material roofs",
      "Minimum fall of 1:500 must be achieved in replacement works — check existing fascia levels before committing to replacement without fall correction",
      "Joint sealant at joiners must be compatible with Colorbond steel — confirm with Lysaght or sealant manufacturer",
      "Confirm current Colorbond colour range and product availability with Lysaght or local supplier before specifying",
    ],
    procurementSources: [
      { name: "Lysaght — product information", url: "https://www.lysaght.com" },
      { name: "Roofing and Building Supplies (national)", url: "https://www.roofmaster.com.au" },
      { name: "Stratco — trade supply", url: "https://www.stratco.com.au" },
      { name: "Steel Supplies — trade", url: "https://www.steelsupplies.com.au" },
    ],
  },
  {
    fullLabel: "Stramit",
    brandUrl: "https://www.stramit.com.au",
    accentColor: "#16a34a",
    name: "Stramit Quad Gutter",
    descriptionLine: "Quad profile gutter in BlueScope Colorbond steel; 115mm and 150mm; full range of fittings; compatible with Stramit roof sheeting; available nationally.",
    productType: "Colorbond steel quad (ogee) gutter — 115mm and 150mm",
    filterTags: ["Stramit", "Colorbond", "Quad", "115mm", "150mm"],
    techChips: [
      { label: "Stramit", cls: "bg-green-100 text-green-800" },
      { label: "Colorbond steel", cls: "bg-slate-100 text-slate-700" },
      { label: "115mm and 150mm", cls: "bg-green-50 text-green-700" },
      { label: "Full fittings range", cls: "bg-slate-100 text-slate-700" },
      { label: "Compatible with Stramit roofing", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Stramit Quad Gutter is Stramit's quad (ogee) profile external eave gutter formed from BlueScope Colorbond steel. Available in 115mm and 150mm standard sizes, the Stramit system includes a full range of fittings including angles, joiners, stop ends, and downpipe outlets. Stramit is a major national supplier of steel roofing and rainwater goods and the quad gutter is designed for compatibility with Stramit's range of corrugated and ribbed roof sheeting products. Available through Stramit branches and roofing trade suppliers nationally. Replacement works must comply with AS/NZS 3500.3 — confirm gutter sizing against the rainfall intensity zone for the building location. Confirm the current product range, Colorbond colour availability, and fitting compatibility with your local Stramit branch before ordering.",
    technicalProperties: [
      "Quad (ogee) profile gutter in BlueScope Colorbond steel — 115mm and 150mm standard sizes",
      "Full range of fittings: angles, joiners, stop ends, and downpipe outlet adapters",
      "Compatible with Stramit corrugated and ribbed roof sheeting for co-ordinated material supply",
      "Available in current Colorbond colour range — confirm available colours with local Stramit branch",
      "Minimum fall 1:500 per AS/NZS 3500.3 — outlet sizing to match rainfall intensity zone",
      "Nationally available through Stramit branches and trade roofing suppliers",
      "Standard fascia bracket system for gutter fixing — confirm bracket spacing with Stramit technical",
    ],
    limitations: [
      "Not suitable for box gutter applications — profiled eave gutter only",
      "Gutter sizing must be confirmed against rainfall intensity zones — do not specify without hydraulic calculation per AS/NZS 3500.3",
      "Minimum fall of 1:500 must be verified in the existing fascia line before replacement — fascia correction may be required",
      "Colorbond finish must not be in direct contact with dissimilar metals — confirm on mixed-material roofs",
      "Joint sealant compatibility with Colorbond must be confirmed before use",
      "Confirm current product name, sizing, and availability with Stramit before specifying",
    ],
    procurementSources: [
      { name: "Stramit — trade supply nationally", url: "https://www.stramit.com.au" },
      { name: "Roofmaster", url: "https://www.roofmaster.com.au" },
      { name: "Steel Supplies — trade", url: "https://www.steelsupplies.com.au" },
    ],
  },
  {
    fullLabel: "Stratco",
    brandUrl: "https://www.stratco.com.au",
    accentColor: "#b45309",
    name: "Stratco Quad Gutter",
    descriptionLine: "Colorbond steel quad gutter; 115mm, 150mm and 125mm sizes; 6m lengths; pre-painted and galvanised options; comprehensive fittings range.",
    productType: "Colorbond steel quad (ogee) gutter — 115mm, 125mm and 150mm",
    filterTags: ["Stratco", "Colorbond", "Quad", "115mm", "150mm", "125mm"],
    techChips: [
      { label: "Stratco", cls: "bg-amber-100 text-amber-800" },
      { label: "Colorbond steel", cls: "bg-slate-100 text-slate-700" },
      { label: "115mm, 125mm and 150mm", cls: "bg-green-50 text-green-700" },
      { label: "Pre-painted and galvanised", cls: "bg-slate-100 text-slate-700" },
      { label: "Comprehensive fittings", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Stratco Quad Gutter is Stratco's quad (ogee) profile gutter formed from Colorbond steel, available in 115mm, 150mm, and an intermediate 125mm size not offered by all competitors. The 125mm size provides an intermediate hydraulic capacity option for situations where 115mm is marginal but 150mm is considered oversized for aesthetic or fascia width reasons. Stratco offers both pre-painted Colorbond finishes and galvanised steel options, providing flexibility for projects where a painted finish is not required or where galvanised material is more economical. The Stratco system includes a comprehensive range of internal and external angles, joiners, stop ends, and downpipe adapters. Available nationally through Stratco trade centres and roofing suppliers. Confirm the current product range, available sizes, and colour availability with your local Stratco trade centre before ordering. All replacement works must comply with AS/NZS 3500.3.",
    technicalProperties: [
      "Quad (ogee) profile in Colorbond steel — 115mm, 125mm, and 150mm sizes — 6m standard lengths",
      "Intermediate 125mm size available — useful where 115mm is marginal and 150mm is oversized for the application",
      "Pre-painted Colorbond and galvanised steel options — colour and material flexibility",
      "Comprehensive fittings range: angles, joiners, stop ends, downpipe adapters, and fascia brackets",
      "Available nationally through Stratco trade centres and roofing distributors",
      "Minimum fall 1:500 per AS/NZS 3500.3 — confirm outlet sizing per rainfall intensity zone",
      "Compatible with standard fascia bracket fixing — confirm bracket spacing requirements with Stratco",
    ],
    limitations: [
      "Not suitable for box gutter applications — this is a profiled eave gutter only",
      "The 125mm size may not always be stocked at all Stratco branches — confirm availability locally before specifying",
      "Galvanised steel option may not match Colorbond finishes on adjacent roofing — confirm material compatibility",
      "Minimum fall of 1:500 must be verified in the existing fascia line before replacement",
      "Colorbond finish must not be in contact with dissimilar metals — confirm on mixed-material roofs",
      "Confirm current product range, sizes, and Colorbond colour availability with Stratco before specifying",
    ],
    procurementSources: [
      { name: "Stratco — trade centres nationally", url: "https://www.stratco.com.au" },
      { name: "Roofmaster", url: "https://www.roofmaster.com.au" },
      { name: "Steel Supplies — trade", url: "https://www.steelsupplies.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Lysaght", label: "Lysaght" },
  { id: "Stramit", label: "Stramit" },
  { id: "Stratco", label: "Stratco" },
  { id: "Colorbond", label: "Colorbond" },
  { id: "Quad", label: "Quad" },
  { id: "115mm", label: "115mm" },
  { id: "150mm", label: "150mm" },
  { id: "125mm", label: "125mm" },
];

const SYSTEM_COMPARISON: {
  brand: string;
  availableSizes: string;
  material: string;
  fittingsRange: string;
}[] = [
  {
    brand: "Lysaght",
    availableSizes: "115mm, 150mm",
    material: "Colorbond / Zincalume steel",
    fittingsRange: "Angles, joiners, stop ends, downpipe adapters — full range",
  },
  {
    brand: "Stramit",
    availableSizes: "115mm, 150mm",
    material: "Colorbond steel (BlueScope)",
    fittingsRange: "Full fittings range — compatible with Stramit roofing products",
  },
  {
    brand: "Stratco",
    availableSizes: "115mm, 125mm, 150mm",
    material: "Colorbond steel / galvanised steel",
    fittingsRange: "Comprehensive fittings — intermediate 125mm size available",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Standard residential eave gutter replacement on houses and Class 2 strata apartment buildings — most common gutter profile in Australia",
    "Replacement of corroded, sagging, or leaking quad gutters where the fascia is sound and the fall can be maintained or corrected",
    "Re-guttering of strata buildings following defect inspection and report recommendation",
    "Situations where gutter undersizing is the primary cause of overflow — upgrade from 115mm to 150mm or 125mm",
    "Re-guttering as part of a broader roofing defect remediation scope including flashing, downpipe, and roof sheet work",
  ],
  selectionCriteria: [
    "Confirm gutter size against rainfall intensity zone per AS/NZS 3500.3 — do not select 115mm without hydraulic calculation in high-intensity zones",
    "Colorbond colour match to existing roofing and fascia — confirm available colours with supplier before specifying",
    "Zincalume specification for coastal or marine environments where additional corrosion resistance is required",
    "Availability of intermediate 125mm size (Stratco only) where 115mm is marginal and 150mm is disproportionate",
    "Existing fascia width and bracket type — confirm gutter profile fits the existing bracket system or budget for new brackets",
    "Fall correction requirement — if existing fascia does not provide 1:500 fall, assess whether fascia packing or re-levelling is included in scope",
    "Fitting compatibility — confirm angles, joiners, and downpipe adapters are available from the same supplier for co-ordinated installation",
  ],
  limitations: [
    "Quad gutters are not appropriate for large catchment areas on multi-storey buildings — box gutters or larger proprietary systems may be required",
    "Gutter replacement alone will not resolve overflow issues if the root cause is inadequate downpipe sizing, blocked outlets, or incorrect falls — diagnose before specifying",
    "Colorbond finishes will fade over time — colour match to existing older gutters is unlikely to be exact — advise the client before specifying a partial re-gutter",
    "Do not specify a partial re-gutter where the retained existing gutter sections are at end of serviceable life — whole-of-building re-gutter is preferred",
    "Joint sealants at joiners require periodic maintenance — advise the owner of maintenance requirements",
  ],
  standardsNotes: [
    "AS/NZS 3500.3 — Plumbing and Drainage — Stormwater Drainage — gutter sizing, fall, and outlet requirements",
    "Australian Rainfall and Runoff (ARR) — used with AS/NZS 3500.3 to determine design rainfall intensity for the building location",
    "NCC Volume One — BCA Performance Requirements for stormwater drainage on Class 2 buildings",
    "Lysaght, Stramit and Stratco product installation guides — fascia bracket spacing, fall requirements, and joiner detailing",
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

export function QuadGutterIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are quad gutter systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Quad gutters (also called ogee gutters) are the most common residential gutter profile in Australia, widely available from Lysaght, Stramit and Stratco in standard and Colorbond steel. Replacement is required when gutters corrode, sag, overflow due to undersizing, or fail at joint sealants and end caps.
        </p>
        {expanded && (
          <>
            <p>
              The quad profile is characterised by its ogee (S-shaped) cross-section, which provides both a traditional aesthetic and efficient water flow characteristics for standard residential catchment areas. The profile is available in 115mm and 150mm standard sizes from all major suppliers, with Stratco also offering an intermediate 125mm size.
            </p>
            <p>
              Replacement works must comply with AS/NZS 3500.3 — minimum gutter fall of 1:500 must be maintained, and outlet sizing must be confirmed against the local rainfall intensity zone. On Class 2 strata buildings, re-guttering is often included in broader roofing defect remediation scopes following defect inspection and report. Confirm the appropriate gutter size against the building's catchment area and local rainfall data before specifying.
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

export function QuadGutterProductSection() {
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
              Applications, selection criteria, limitations, standards
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
              <TechCard icon={<Layers size={15} />} title="Typical Applications" items={TECH_INFO.typicalApplications} style="bullet" />
              <TechCard icon={<Ruler size={15} />} title="Selection Criteria" items={TECH_INFO.selectionCriteria} style="check" />
              <TechCard icon={<AlertTriangle size={15} />} title="When NOT to Use" items={TECH_INFO.limitations} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards & Testing" items={TECH_INFO.standardsNotes} style="bullet" />
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
            <p className="mt-1 text-sm text-slate-500">3 products — Lysaght, Stramit, Stratco — quad (ogee) gutter systems — scroll to view all</p>
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
              Side-by-side comparison of quad gutter systems. All three brands supply Colorbond steel quad gutters with full fitting ranges — primary differences are sizing range and supplier relationships.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Available sizes</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Fittings range</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.brand} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.availableSizes}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600">{row.fittingsRange}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-5">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">Brand Equivalence Note</p>
          <p className="text-xs leading-6 text-slate-600">
            <strong>Lysaght QUAD ≈ Stramit Quad ≈ Stratco Quad</strong> — all are Colorbond steel quad gutters with full fitting ranges suitable for standard residential and strata re-guttering. Primary differences are sizing range and available fittings — Stratco offers an intermediate 125mm size not available from all competitors. Product selection is typically driven by the roofing contractor&apos;s existing supplier relationship and local stock availability.
          </p>
        </div>
      </div>
    </>
  );
}
