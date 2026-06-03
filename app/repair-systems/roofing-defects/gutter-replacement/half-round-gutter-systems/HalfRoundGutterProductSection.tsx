"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Lysaght"
  | "Stramit"
  | "Stratco"
  | "Colorbond"
  | "Half-round"
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
    fullLabel: "Lysaght",
    brandUrl: "https://www.lysaght.com",
    accentColor: "#0369a1",
    name: "Lysaght Half-Round Gutter",
    descriptionLine: "Colorbond and Zincalume half-round gutter; 100mm and 125mm; 6m lengths; matching half-round outlet, end cap and angle fittings; heritage-compatible profiles.",
    productType: "Colorbond/Zincalume half-round gutter — 100mm and 125mm — heritage compatible",
    filterTags: ["Lysaght", "Colorbond", "Half-round", "Heritage"],
    techChips: [
      { label: "Lysaght", cls: "bg-sky-100 text-sky-800" },
      { label: "Colorbond / Zincalume", cls: "bg-slate-100 text-slate-700" },
      { label: "100mm and 125mm", cls: "bg-green-50 text-green-700" },
      { label: "Heritage compatible", cls: "bg-purple-50 text-purple-700" },
      { label: "Full fittings range", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Lysaght Half-Round Gutter is available in Colorbond and Zincalume steel in 100mm and 125mm sizes with 6m standard lengths. The half-round profile is characterised by its smooth semicircular internal surface, which provides self-cleaning flow characteristics and a traditional aesthetic suited to heritage, Californian bungalow and Federation-style buildings. Lysaght's heritage-compatible profiles are specifically relevant on older-style buildings where the half-round profile must match the existing gutter form for aesthetic or heritage council compliance reasons. The complete fittings range includes half-round outlets, end caps, and angle sections. Colorbond finishes are available in the current colour range — Zincalume provides additional corrosion resistance for coastal and marine environments. Confirm the current product range, heritage profile availability, and Colorbond colour options with Lysaght or your local roofing supplier before ordering. All replacement works must comply with AS/NZS 3500.3.",
    technicalProperties: [
      "Half-round profile in Colorbond or Zincalume steel — 100mm and 125mm sizes — 6m lengths",
      "Smooth semicircular internal surface — self-cleaning flow characteristics — reduced debris accumulation",
      "Heritage-compatible profiles — suited to older-style, Californian bungalow and Federation buildings",
      "Full fittings range: half-round outlets, end caps, internal and external angle sections",
      "Colorbond and Zincalume options — coastal environments may warrant Zincalume specification",
      "Minimum fall 1:500 per AS/NZS 3500.3 — confirm outlet sizing per rainfall intensity zone",
      "Compatible with standard round downpipe adapter and connection systems",
    ],
    limitations: [
      "Not suitable for box gutter applications — external eave gutter only",
      "Gutter sizing must be confirmed against rainfall intensity zones per AS/NZS 3500.3 — hydraulic capacity of half-round is different from quad of the same nominal size",
      "Heritage profile availability — confirm current stock and lead times with Lysaght before specifying on a heritage project with tight programme requirements",
      "Minimum fall of 1:500 must be verified in the existing fascia line before replacement — fascia correction may be required",
      "Colorbond finish must not be in direct contact with dissimilar metals — confirm on mixed-material or heritage roofs with copper or lead components",
      "Confirm current product range and heritage profile availability with Lysaght before specifying",
    ],
    procurementSources: [
      { name: "Lysaght — product information", url: "https://www.lysaght.com" },
      { name: "Roofmaster — trade supply", url: "https://www.roofmaster.com.au" },
      { name: "Steel Supplies — trade", url: "https://www.steelsupplies.com.au" },
    ],
  },
  {
    fullLabel: "Stramit",
    brandUrl: "https://www.stramit.com.au",
    accentColor: "#16a34a",
    name: "Stramit Half-Round Gutter",
    descriptionLine: "BlueScope Colorbond steel half-round profile; 100mm, 125mm, 150mm sizes; full fittings range; suited for residential and light commercial.",
    productType: "Colorbond steel half-round gutter — 100mm, 125mm and 150mm",
    filterTags: ["Stramit", "Colorbond", "Half-round"],
    techChips: [
      { label: "Stramit", cls: "bg-green-100 text-green-800" },
      { label: "Colorbond steel", cls: "bg-slate-100 text-slate-700" },
      { label: "100mm, 125mm and 150mm", cls: "bg-green-50 text-green-700" },
      { label: "Residential and light commercial", cls: "bg-slate-100 text-slate-700" },
      { label: "Full fittings range", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Stramit Half-Round Gutter is formed from BlueScope Colorbond steel and is available in 100mm, 125mm, and 150mm sizes — the largest standard size range offered by the major suppliers. The 150mm half-round size provides significant hydraulic capacity for larger catchment areas on residential and light commercial buildings. Stramit's full fittings range includes half-round angles, joiners, stop ends, and downpipe outlets for a complete installation without site fabrication. Available nationally through Stramit branches and trade roofing suppliers. Confirm the current product range, available Colorbond colours, and stock availability with your local Stramit branch before ordering. All replacement works must comply with AS/NZS 3500.3.",
    technicalProperties: [
      "Half-round profile in BlueScope Colorbond steel — 100mm, 125mm, and 150mm sizes",
      "150mm size provides extended hydraulic capacity for larger roof catchment areas",
      "Full fittings range: angles, joiners, stop ends, and half-round downpipe outlets",
      "Suited to residential and light commercial buildings — wide size range accommodates varied catchment requirements",
      "Available in current Colorbond colour range — confirm available colours with local Stramit branch",
      "Minimum fall 1:500 per AS/NZS 3500.3 — confirm outlet sizing per rainfall intensity zone",
      "Nationally available through Stramit branches and trade roofing suppliers",
    ],
    limitations: [
      "Not suitable for box gutter applications — external eave gutter only",
      "Gutter sizing must be confirmed against rainfall intensity zones per AS/NZS 3500.3",
      "Minimum fall of 1:500 must be verified in the existing fascia line before replacement",
      "Colorbond finish must not be in direct contact with dissimilar metals — confirm on mixed-material or heritage roofs",
      "Heritage-specific profile matching may not be available — check Lysaght for heritage-specific products where profile accuracy is required",
      "Confirm current product range, sizing, and availability with Stramit before specifying",
    ],
    procurementSources: [
      { name: "Stramit — trade supply nationally", url: "https://www.stramit.com.au" },
      { name: "Roofmaster — trade supply", url: "https://www.roofmaster.com.au" },
      { name: "Steel Supplies — trade", url: "https://www.steelsupplies.com.au" },
    ],
  },
  {
    fullLabel: "Stratco",
    brandUrl: "https://www.stratco.com.au",
    accentColor: "#b45309",
    name: "Stratco Half-Round Gutter",
    descriptionLine: "Colorbond and custom-finish half-round gutter; 100mm to 150mm; complete bracket, outlet and end cap fittings; available in all Colorbond colours.",
    productType: "Colorbond steel half-round gutter — 100mm to 150mm — full Colorbond colour range",
    filterTags: ["Stratco", "Colorbond", "Half-round"],
    techChips: [
      { label: "Stratco", cls: "bg-amber-100 text-amber-800" },
      { label: "Colorbond steel", cls: "bg-slate-100 text-slate-700" },
      { label: "100mm to 150mm", cls: "bg-green-50 text-green-700" },
      { label: "Full Colorbond colour range", cls: "bg-slate-100 text-slate-700" },
      { label: "Complete fittings range", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Stratco Half-Round Gutter is available in Colorbond steel from 100mm to 150mm sizes with a complete range of bracket, outlet, and end cap fittings. The Stratco system is available in all current Colorbond colours through Stratco trade centres nationally. Stratco's comprehensive distribution network and in-store fittings range make it a practical choice for re-guttering works where colour matching to existing roofing and fascia is important. Confirm the current product range, available sizes at your local Stratco trade centre, and Colorbond colour availability before ordering. All replacement works must comply with AS/NZS 3500.3.",
    technicalProperties: [
      "Half-round profile in Colorbond steel — 100mm to 150mm sizes — available nationally through Stratco trade centres",
      "Complete fittings range: brackets, outlets, end caps, angles, and joiners — co-ordinated fittings supply",
      "Available in all current Colorbond colours — practical for colour-matched re-guttering with existing roofing",
      "Comprehensive Stratco trade centre network — local stock availability for most sizes and fittings",
      "Minimum fall 1:500 per AS/NZS 3500.3 — confirm outlet sizing per rainfall intensity zone",
      "Compatible with standard round downpipe connection systems",
    ],
    limitations: [
      "Not suitable for box gutter applications — external eave gutter only",
      "Gutter sizing must be confirmed against rainfall intensity zones per AS/NZS 3500.3",
      "Minimum fall of 1:500 must be verified in the existing fascia line before replacement",
      "Colorbond finish must not be in direct contact with dissimilar metals — confirm on mixed-material or heritage roofs",
      "Heritage-specific profile matching — confirm with Stratco whether heritage profiles are available for conservation-grade applications",
      "Confirm current product range, sizes, and Colorbond colour availability with Stratco before specifying",
    ],
    procurementSources: [
      { name: "Stratco — trade centres nationally", url: "https://www.stratco.com.au" },
      { name: "Roofmaster — trade supply", url: "https://www.roofmaster.com.au" },
      { name: "Steel Supplies — trade", url: "https://www.steelsupplies.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Lysaght", label: "Lysaght" },
  { id: "Stramit", label: "Stramit" },
  { id: "Stratco", label: "Stratco" },
  { id: "Colorbond", label: "Colorbond" },
  { id: "Half-round", label: "Half-round" },
  { id: "Heritage", label: "Heritage" },
];

const SYSTEM_COMPARISON: {
  brand: string;
  sizes: string;
  material: string;
  heritageSuitability: string;
}[] = [
  {
    brand: "Lysaght",
    sizes: "100mm, 125mm",
    material: "Colorbond / Zincalume steel",
    heritageSuitability: "Yes — heritage-compatible profiles available",
  },
  {
    brand: "Stramit",
    sizes: "100mm, 125mm, 150mm",
    material: "Colorbond steel (BlueScope)",
    heritageSuitability: "Standard residential and light commercial — confirm heritage profile with supplier",
  },
  {
    brand: "Stratco",
    sizes: "100mm to 150mm",
    material: "Colorbond steel",
    heritageSuitability: "Full colour range — confirm heritage profile availability with Stratco",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Heritage, Californian bungalow and Federation-style building re-guttering where the half-round profile is required to match existing or period-appropriate detailing",
    "Modern architectural applications where the smooth internal curve of the half-round profile is specified for aesthetic or hydraulic reasons",
    "Residential buildings where the self-cleaning characteristics of the half-round profile are preferred over the quad profile",
    "Re-guttering of strata buildings following defect inspection and report recommendation where existing gutters are half-round profile",
    "Applications where larger-capacity gutters are required — 150mm half-round from Stramit for larger catchment areas",
  ],
  selectionCriteria: [
    "Confirm gutter profile matches existing or heritage requirement — half-round and quad are not interchangeable aesthetically on heritage buildings",
    "Confirm gutter size against rainfall intensity zone per AS/NZS 3500.3 — hydraulic capacity of half-round differs from quad of the same nominal size",
    "Heritage building applications — confirm whether heritage council or conservation architect approval is required before selecting profile and finish",
    "Copper half-round gutters for conservation-grade heritage applications where Colorbond steel is not appropriate — source from specialist heritage suppliers",
    "Colorbond colour matching to existing roofing — confirm current colour range with supplier, noting older colours may no longer be available",
    "Zincalume for coastal or marine environments — provides superior corrosion resistance compared to Colorbond painted finishes",
    "Existing fascia width and bracket type — confirm gutter bracket compatibility or budget for new brackets",
  ],
  limitations: [
    "Half-round gutters require specific half-round fittings — they are not interchangeable with quad gutter fittings — confirm fitting availability from the same supplier",
    "Colour match to existing older gutters is unlikely to be exact — advise client before specifying a partial re-gutter",
    "Copper half-round gutters must not be in contact with Colorbond, Zincalume, or other ferrous metals — galvanic corrosion risk — confirm material separation on mixed-material roofs",
    "Bracket spacing for half-round gutters may differ from quad gutters — confirm with the supplier before committing to existing bracket positions",
    "Heritage profile matching — confirm with the supplier that the required profile dimensions match the existing gutter before ordering on heritage conservation works",
  ],
  standardsNotes: [
    "AS/NZS 3500.3 — Plumbing and Drainage — Stormwater Drainage — gutter sizing, fall, and outlet requirements for all gutter profiles",
    "Australian Rainfall and Runoff (ARR) — used with AS/NZS 3500.3 to determine design rainfall intensity for the building location",
    "Heritage Council guidelines — applicable to listed heritage buildings — may specify profile, material, and finish requirements",
    "Lysaght, Stramit and Stratco product installation guides — bracket spacing, fall requirements, and joiner detailing for half-round profiles",
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

export function HalfRoundGutterIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are half-round gutter systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Half-round gutters are widely used in heritage, Californian bungalow and Federation-style buildings as well as modern architectural applications due to their smooth internal profile and self-cleaning characteristics. Lysaght, Stramit and Stratco half-round gutters are available in Colorbond and Zincalume, with heritage copper options available for conservation-grade works.
        </p>
        {expanded && (
          <>
            <p>
              The half-round profile provides a smooth semicircular internal surface that allows debris and water to flow freely with minimal accumulation. This self-cleaning characteristic makes half-round gutters popular in locations with significant leaf fall and where gutter maintenance access is limited. The profile is also the traditional eave gutter form on many older Australian residential building styles.
            </p>
            <p>
              For heritage and conservation-grade applications, copper half-round gutters may be specified to match original material and profile. Copper gutters must not be in contact with Colorbond, Zincalume, or ferrous metals due to galvanic corrosion risk — confirm material separation requirements on any mixed-material installation. All replacement works must comply with AS/NZS 3500.3.
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

export function HalfRoundGutterProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — Lysaght, Stramit, Stratco — half-round gutter systems — scroll to view all</p>
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
              Side-by-side comparison of half-round gutter systems. All three brands supply Colorbond half-round gutters in equivalent sizing — Lysaght offers heritage-specific profiles for older-style building applications.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Sizes</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Heritage suitability</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.brand} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.sizes}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600">{row.heritageSuitability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-5">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">Brand Equivalence Note</p>
          <p className="text-xs leading-6 text-slate-600">
            <strong>Lysaght ≈ Stramit ≈ Stratco</strong> — all offer Colorbond half-round gutters in equivalent sizing suitable for residential and strata re-guttering. Lysaght heritage profiles are specific to older-style building applications where profile geometry must match the original gutter form. Product selection is typically driven by the roofing contractor&apos;s supplier relationship and local stock availability.
          </p>
        </div>
      </div>
    </>
  );
}
