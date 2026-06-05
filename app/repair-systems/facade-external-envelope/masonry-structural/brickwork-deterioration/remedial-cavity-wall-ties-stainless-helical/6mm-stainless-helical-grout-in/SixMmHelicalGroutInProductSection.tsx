"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Helifix"
  | "Thor-Helical"
  | "Simpson"
  | "6mm"
  | "Grout-in"
  | "Helical"
  | "Stainless-316"
  | "National"
  | "AS-3700"
  | "Cavity-tie";

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
    fullLabel: "Helifix Australia",
    brandUrl: "https://www.helifix.com.au",
    accentColor: "#0369a1",
    name: "Helifix SockFix / HeliBond — 6mm Stainless Helical Grout-in Tie",
    descriptionLine: "Helifix 6mm stainless 316 helical bar — grout-in installation with cementitious or resin grout — remedial cavity wall tie for Class 2 strata masonry — AS 3700 compliant",
    productType: "6mm Helical Grout-in Cavity Wall Tie",
    filterTags: ["Helifix", "6mm", "Grout-in", "Helical", "Stainless-316", "National", "AS-3700", "Cavity-tie"],
    techChips: [
      { label: "6mm stainless 316", cls: "bg-sky-100 text-sky-800" },
      { label: "Grout-in", cls: "bg-green-50 text-green-700" },
      { label: "AS 3700", cls: "bg-slate-100 text-slate-700" },
      { label: "National supply", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Helifix 6mm Type 316 stainless steel helical bar installed with cementitious or resin grout as a remedial cavity wall tie for Class 2 strata masonry. The helical profile provides mechanical interlock with the grout annulus, giving reliable pullout performance even in variable or soft mortar beds. Install by drilling an oversize core hole through the outer leaf, threading the helical bar through the cavity and bedding it in the inner leaf with grout at both leaf interfaces. Confirm drill size, grout type, embedment depth and tie spacing with the Helifix technical team and with the structural engineer before proceeding. Perform pull-out testing on a sample of installed ties to confirm in-situ performance.",
    technicalProperties: [
      "316 stainless steel — BS EN 1015-11 pullout tested — confirmed corrosion resistance for cavity masonry",
      "6mm diameter — standard remedial tie diameter for most single-leaf cavity wall conditions",
      "Grout-in installation — cementitious or resin grout in the drilled core provides the load-transfer mechanism",
      "Helical profile provides mechanical bond with grout regardless of mortar bed condition",
      "Available in a range of cavity widths — confirm correct length for the specific building cavity width",
      "Helifix national distribution and technical support — full system including tooling and grout",
    ],
    limitations: [
      "Grout-in installation requires a wet grout process — not suitable where grouting would cause staining on the outer leaf face",
      "Core drilling must be kept square and aligned with the horizontal mortar bed — angled holes reduce pullout performance",
      "Confirm grout compatibility with the mortar bed — resin grout is preferred in wet or damp cavities",
      "Pull-out testing on representative sample required to confirm in-situ performance before committing to full installation",
      "Confirm tie spacing and layout with structural engineer — AS 3700 requirements apply to tie density and spacing",
    ],
    procurementSources: [
      { name: "Helifix Australia — national technical supply", url: "https://www.helifix.com.au" },
      { name: "Helifix technical support — drill size, grout type, embedment depth", url: "https://www.helifix.com.au/contact" },
    ],
  },
  {
    fullLabel: "Thor Helical Australia",
    brandUrl: "https://www.thorhelical.com.au",
    accentColor: "#b45309",
    name: "Thor Helical — 6mm Stainless Helical Cavity Wall Tie",
    descriptionLine: "Thor Helical 6mm stainless 316 helical bar — grout-in remedial cavity wall tie — for Class 2 masonry facade remediation — AS 3700 compliant — national supply",
    productType: "6mm Helical Grout-in Cavity Wall Tie",
    filterTags: ["Thor-Helical", "6mm", "Grout-in", "Helical", "Stainless-316", "National", "AS-3700", "Cavity-tie"],
    techChips: [
      { label: "6mm stainless 316", cls: "bg-amber-100 text-amber-800" },
      { label: "Grout-in", cls: "bg-green-50 text-green-700" },
      { label: "AS 3700", cls: "bg-slate-100 text-slate-700" },
      { label: "National supply", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Thor Helical Australia supplies 6mm Type 316 stainless steel helical bars for remedial cavity wall tie installation. Thor Helical products are manufactured and tested to BS EN standards and comply with the requirements of AS 3700 for remedial masonry ties. Installation follows the same grout-in procedure as other helical tie systems — drill oversize core holes through the outer leaf, thread the bar across the cavity, and grout into the inner leaf at both interfaces. Confirm drill size, cavity width, grout type and tie spacing with Thor Helical technical team and the structural engineer. Pull-out testing is recommended on a sample of installed ties to confirm in-situ performance on the specific substrate.",
    technicalProperties: [
      "316 stainless steel — tested pullout performance to BS EN standards — AS 3700 compliant",
      "6mm diameter — standard remedial tie diameter for single-leaf cavity wall conditions",
      "Grout-in installation — suitable for cementitious or resin grout depending on cavity moisture conditions",
      "National distribution from Thor Helical Australia — specialist remedial supply network",
      "Compatible range of installation accessories — drill bits, grout injection nozzles, and tie spacing guides",
    ],
    limitations: [
      "Wet grout process — not suitable where grouting would stain or damage the outer leaf face",
      "Core drilling must be kept square and aligned with the mortar bed",
      "Pull-out testing on representative sample required to confirm in-situ performance",
      "Confirm tie density and spacing with structural engineer against AS 3700 requirements",
      "Confirm correct bar length for the specific cavity width before ordering",
    ],
    procurementSources: [
      { name: "Thor Helical Australia — national supply", url: "https://www.thorhelical.com.au" },
      { name: "Thor Helical technical support", url: "https://www.thorhelical.com.au/contact" },
    ],
  },
  {
    fullLabel: "Simpson Strong-Tie Australia",
    brandUrl: "https://www.strongtie.com.au",
    accentColor: "#7c3aed",
    name: "Simpson Strong-Tie — 6mm Stainless Helical Masonry Tie",
    descriptionLine: "Simpson Strong-Tie 6mm stainless 316 helical masonry tie — grout-in installation — remedial cavity wall tie for Class 2 masonry — AS 3700 compliant — national supply",
    productType: "6mm Helical Grout-in Cavity Wall Tie",
    filterTags: ["Simpson", "6mm", "Grout-in", "Helical", "Stainless-316", "National", "AS-3700", "Cavity-tie"],
    techChips: [
      { label: "6mm stainless 316", cls: "bg-violet-100 text-violet-800" },
      { label: "Grout-in", cls: "bg-green-50 text-green-700" },
      { label: "AS 3700", cls: "bg-slate-100 text-slate-700" },
      { label: "National supply", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Simpson Strong-Tie Australia supplies 6mm Type 316 stainless steel helical masonry ties for remedial cavity wall tie installation on Class 2 strata buildings. Simpson Strong-Tie is a major Australian masonry fixings supplier with national distribution, and their helical tie range complies with AS 3700 requirements for remedial masonry ties. Follow the standard grout-in installation procedure — drill oversize core holes, thread the bar through the cavity, and grout into both leaf interfaces. Confirm drill size, bar length, grout type, and tie spacing with Simpson Strong-Tie technical support and the structural engineer before proceeding.",
    technicalProperties: [
      "316 stainless steel — tested corrosion resistance for cavity masonry environments",
      "6mm diameter helical bar — standard for single-leaf cavity wall remedial tie installation",
      "Grout-in installation with cementitious or resin grout depending on cavity conditions",
      "National distribution network — broad trade availability in all states",
      "Simpson Strong-Tie technical support available for product selection and installation guidance",
    ],
    limitations: [
      "Wet grout process — confirm grouting will not stain or damage the outer leaf face before commencing",
      "Core drilling must be square with the mortar bed for maximum pullout performance",
      "Pull-out testing on representative sample required to confirm in-situ performance",
      "Confirm tie density and spacing with structural engineer",
      "Confirm correct bar length for the specific cavity width",
    ],
    procurementSources: [
      { name: "Simpson Strong-Tie Australia — national trade supply", url: "https://www.strongtie.com.au" },
      { name: "Simpson Strong-Tie technical support", url: "https://www.strongtie.com.au/contact" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Helifix", label: "Helifix" },
  { id: "Thor-Helical", label: "Thor Helical" },
  { id: "Simpson", label: "Simpson" },
  { id: "6mm", label: "6mm" },
  { id: "Grout-in", label: "Grout-in" },
  { id: "Helical", label: "Helical" },
  { id: "Stainless-316", label: "Stainless 316" },
  { id: "National", label: "National supply" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "Cavity-tie", label: "Cavity tie" },
];

const SYSTEM_COMPARISON: {
  supplier: string;
  product: string;
  diameter: string;
  grade: string;
  distribution: string;
  keyFeature: string;
  primaryUse: string;
}[] = [
  { supplier: "Helifix Australia", product: "Helifix SockFix / HeliBond", diameter: "6mm", grade: "316 SS", distribution: "National", keyFeature: "BS EN tested, broad cavity range", primaryUse: "Standard remedial cavity tie" },
  { supplier: "Thor Helical Australia", product: "Thor Helical 6mm bar", diameter: "6mm", grade: "316 SS", distribution: "National", keyFeature: "BS EN tested, installation accessories included", primaryUse: "Standard remedial cavity tie" },
  { supplier: "Simpson Strong-Tie Australia", product: "Simpson 6mm helical", diameter: "6mm", grade: "316 SS", distribution: "National", keyFeature: "Wide trade supply network", primaryUse: "Standard remedial cavity tie" },
];

const TECH_INFO = {
  typicalApplications: [
    "Remedial installation of cavity wall ties in Class 2 strata buildings where original galvanised ties have corroded or failed",
    "Supplementary tie installation where the original tie pattern does not comply with current AS 3700 requirements for tie density",
    "Cavity wall tie replacement following facade investigation and tie testing confirming tie failure or absence",
    "New tie installation in areas of high wind loading or seismic zones where existing tie density is insufficient",
  ],
  selectionCriteria: [
    "Engage a structural engineer to confirm tie specification, spacing, and embedment depth against AS 3700 requirements",
    "Confirm cavity width and select correct tie length — minimum 50mm embedment into each leaf",
    "Confirm grout type — cementitious grout for dry cavities, resin grout for damp or wet conditions",
    "Perform pull-out testing on a sample of installed ties before committing to full installation",
    "Confirm drill hole diameter — typically 10–12mm for 6mm bar depending on grout type used",
    "Document each tie location on a tie layout plan for the structural engineer's records",
  ],
  limitations: [
    "Grout-in process not suitable where grouting would stain or contaminate the outer leaf face — use DryFix friction tie where grouting is not acceptable",
    "Do not install ties through existing cracked or delaminated masonry — repair the structural defect first",
    "Pull-out testing is not optional — in-situ masonry quality varies and testing confirms actual installation performance",
    "Do not substitute 6mm ties for 8mm ties without structural engineer confirmation — the two grades have different load capacities",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — governs tie material, embedment depth, tie density and spacing requirements for masonry walls",
    "BS EN 846-5 — Testing methods for ancillary components for masonry — tie and anchor pullout testing standard",
    "NCC Volume One — structural requirements for Class 2 building masonry",
    "Structural engineer certificate required for all remedial tie installation",
  ],
  suitableDefects: [
    "Failed or corroded original galvanised cavity wall ties identified during facade investigation",
    "Absence of ties in specific facade zones following cavity investigation and core drilling",
    "Tie density insufficient for current wind or seismic loading requirements",
    "Wall tie replacement as part of a broader facade remediation and repointing scope",
  ],
  typicalSubstrates: [
    "Clay brick cavity wall construction — single outer leaf tied to inner brick or blockwork leaf",
    "Calcium silicate brick outer leaf cavity walls",
    "Concrete masonry unit cavity wall construction where the outer leaf is brick",
    "NOT suitable: solid masonry construction without a cavity — use a different tie type for solid masonry",
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

export function SixMmHelicalGroutInIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What is a 6mm stainless helical grout-in cavity wall tie?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          A 6mm stainless steel (Type 316) helical bar installed with cementitious or resin grout into drilled core holes through the outer masonry leaf and across the cavity to the inner leaf. The helical profile provides mechanical interlock with the grout annulus for reliable pullout performance. The standard diameter for most remedial cavity wall tie installations on Class 2 strata buildings.
        </p>
        {expanded && (
          <>
            <p>
              Original galvanised cavity wall ties corrode and lose section over time, particularly in coastal and chloride-exposed environments. Failed ties cause outer leaf delamination, bulging, and in extreme cases, outer leaf collapse. A structural engineer must survey and confirm tie failure before specifying replacement, determine the required new tie density per AS 3700, and certify the completed installation.
            </p>
            <p>
              Installation requires careful alignment of the drilled core holes with the horizontal mortar bed. Grout type selection — cementitious for dry cavities, resin for damp conditions — and pull-out testing on a representative sample of installed ties are mandatory quality assurance steps. Confirm all specifications with the chosen supplier's technical team before commencing works.
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

export function SixMmHelicalGroutInProductSection() {
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
              Applications, selection criteria, limitations, standards, suitable substrates
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
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <TechCard icon={<Layers size={15} />} title="Typical Applications" items={TECH_INFO.typicalApplications} style="bullet" />
              <TechCard icon={<Ruler size={15} />} title="Selection Criteria" items={TECH_INFO.selectionCriteria} style="check" />
              <TechCard icon={<AlertTriangle size={15} />} title="When NOT to Use" items={TECH_INFO.limitations} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards &amp; Notes" items={TECH_INFO.standardsNotes} style="bullet" />
              <TechCard icon={<CheckCircle size={15} />} title="Suitable Defects" items={TECH_INFO.suitableDefects} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="Typical Substrates" items={TECH_INFO.typicalSubstrates} style="bullet" />
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — 6mm stainless helical grout-in cavity wall ties — scroll to view all</p>
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
              Side-by-side comparison of 6mm stainless helical grout-in cavity wall tie suppliers. Confirm all product selections against current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Diameter</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Grade</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Distribution</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key Feature</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary Use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.supplier} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.supplier}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.diameter}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.grade}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.distribution}</td>
                  <td className="px-4 py-3 text-slate-600">{row.keyFeature}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.primaryUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
