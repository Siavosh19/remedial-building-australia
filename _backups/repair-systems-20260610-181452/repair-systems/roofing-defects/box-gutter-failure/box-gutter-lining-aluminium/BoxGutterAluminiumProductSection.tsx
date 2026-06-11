"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Aluminium"
  | "Capral"
  | "Metalcorp"
  | "Mill-finish"
  | "Box-gutter"
  | "Custom-formed";

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
    fullLabel: "Capral Aluminium",
    brandUrl: "https://www.capral.com.au",
    accentColor: "#0369a1",
    name: "Capral Aluminium Sheet (box gutter lining)",
    descriptionLine: "Capral 5000-series aluminium alloy sheet, 1.0mm to 2.0mm, custom roll-formed by fabricator into box gutter profile. Mill-finish — requires paint for aesthetic finish. Lighter than steel. High corrosion resistance.",
    productType: "5000-series aluminium alloy sheet — mill-finish — custom roll-formed box gutter lining",
    filterTags: ["Aluminium", "Capral", "Mill-finish", "Box-gutter", "Custom-formed"],
    techChips: [
      { label: "5000-series alloy", cls: "bg-sky-100 text-sky-800" },
      { label: "Mill-finish", cls: "bg-slate-100 text-slate-700" },
      { label: "1.0mm to 2.0mm", cls: "bg-slate-100 text-slate-700" },
      { label: "Custom roll-formed", cls: "bg-green-50 text-green-700" },
      { label: "High corrosion resistance", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Capral Aluminium is Australia's largest aluminium manufacturer and distributor, supplying 5000-series marine-grade aluminium alloy sheet for box gutter lining applications. The 5000-series alloy (typically 5052 or 5005) provides high corrosion resistance, good formability, and weldability — properties that make it well suited to box gutter lining fabrication in coastal or high-humidity environments. Aluminium sheet at 1.0mm to 2.0mm thickness is supplied to a specialist sheet metal fabricator who custom roll-forms the sheet into the required box gutter profile. Mill-finish aluminium has no factory-applied paint or coating — the gutter lining will require painting after installation for an acceptable aesthetic finish. Aluminium is significantly lighter than steel of equivalent thickness, which may be an advantage for loading on older or lighter roof structures. Joints in aluminium box gutter linings can be welded by a qualified aluminium welder or mechanically lapped and sealed. Welded joints are more reliable than lapped and sealed joints and are preferred for new box gutter linings. Aluminium must not be in direct contact with copper or copper alloys — galvanic corrosion will occur rapidly. Confirm alloy specification, thickness, and joint method with the fabricator and roofing engineer before specifying.",
    technicalProperties: [
      "5000-series aluminium alloy (5052 or 5005) — marine grade — high corrosion resistance — good formability and weldability",
      "Thickness range: 1.0mm to 2.0mm — confirm required thickness against AS 1562.3 and hydraulic design",
      "Mill-finish — no factory-applied paint or coating — requires painting after installation for aesthetic finish",
      "Lighter than equivalent steel — may be advantageous for loading on lightweight or older roof structures",
      "Weldable by qualified aluminium welder — welded joints preferred over lapped and sealed joints for box gutter applications",
      "High corrosion resistance — suitable for coastal and high-humidity environments — superior to standard Colorbond steel in some aggressive environments",
      "Custom roll-formed by specialist fabricator to required box gutter profile dimensions",
    ],
    limitations: [
      "Mill-finish only — must be painted after installation — factor painting cost and programme into the project budget",
      "Must NOT be in direct contact with copper, copper alloys, or copper-bearing surfaces — rapid galvanic corrosion will occur — install separation layer or isolator where copper contact is possible",
      "Welding of aluminium requires a qualified aluminium welder with appropriate TIG welding capability — not all sheet metal fabricators are equipped for aluminium welding",
      "Aluminium is susceptible to attack from strongly alkaline or acidic materials — do not allow contact with concrete, mortar, or lime without appropriate separation or coating",
      "Expansion and contraction must be accommodated in the gutter design — aluminium has a higher coefficient of thermal expansion than steel",
      "Confirm alloy specification and mechanical properties with Capral before specifying — not all aluminium alloys have the same corrosion resistance and formability",
    ],
    procurementSources: [
      { name: "Capral Aluminium — national branches", url: "https://www.capral.com.au" },
      { name: "Local roofing and sheet metal fabricators", url: "https://www.masterbuilders.com.au" },
    ],
  },
  {
    fullLabel: "Metalcorp Steel",
    brandUrl: "https://www.metalcorp.com.au",
    accentColor: "#7c2d12",
    name: "Metalcorp Aluminium Sheet (box gutter lining)",
    descriptionLine: "Metalcorp aluminium sheet for custom-formed box gutter applications. Alternative supplier to Capral for aluminium sheet supply.",
    productType: "Aluminium sheet — mill-finish — custom-formed box gutter lining — alternative supplier",
    filterTags: ["Aluminium", "Metalcorp", "Mill-finish", "Box-gutter"],
    techChips: [
      { label: "Metalcorp supply", cls: "bg-orange-100 text-orange-800" },
      { label: "Mill-finish aluminium", cls: "bg-slate-100 text-slate-700" },
      { label: "Alternative to Capral", cls: "bg-slate-100 text-slate-700" },
      { label: "Custom-formed", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Metalcorp is an alternative aluminium and steel sheet distributor for custom-formed box gutter lining applications. Where Capral does not have a local branch with appropriate stock, Metalcorp can supply aluminium sheet to the required alloy specification and thickness for fabrication by a specialist sheet metal contractor. Metalcorp's branch network covers most Australian metropolitan and regional centres. When obtaining aluminium sheet from Metalcorp for box gutter lining, confirm the alloy specification (5000-series preferred for corrosion resistance and weldability), the available thickness range, and the current lead time. The fabrication, jointing, painting, and installation requirements are the same as for Capral-supplied aluminium sheet — the material specification and design requirements are identical regardless of which supplier provides the aluminium coil or sheet. Obtain competitive quotations from both Capral and Metalcorp for larger projects.",
    technicalProperties: [
      "Aluminium sheet supply for custom-formed box gutter lining fabrication",
      "Alternative supplier to Capral — national branch network coverage",
      "Confirm alloy specification (5000-series preferred) and available thickness at time of order",
      "Same fabrication, jointing, painting, and installation requirements as Capral-supplied aluminium sheet",
      "Competitive alternative pricing for larger projects",
    ],
    limitations: [
      "Confirm alloy specification and available thickness with Metalcorp before specifying — do not assume equivalent alloy specification to Capral without confirmation",
      "All standard aluminium box gutter lining precautions apply — no copper contact, alkaline contact, or galvanic coupling without separation",
      "Fabrication capability and aluminium welding must be confirmed with the appointed sheet metal contractor",
      "Confirm current stock availability and lead time before programming works",
      "Confirm suitability of the supplied alloy for the specific exposure environment with Metalcorp technical",
    ],
    procurementSources: [
      { name: "Metalcorp — national branches", url: "https://www.metalcorp.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Aluminium", label: "Aluminium" },
  { id: "Capral", label: "Capral" },
  { id: "Metalcorp", label: "Metalcorp" },
  { id: "Mill-finish", label: "Mill-finish" },
  { id: "Box-gutter", label: "Box gutter" },
  { id: "Custom-formed", label: "Custom-formed" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  alloy: string;
  thickness: string;
  finish: string;
  corrosionResistance: string;
  weldability: string;
}[] = [
  {
    product: "Capral Aluminium Sheet",
    brand: "Capral Aluminium",
    alloy: "5000-series (5052 or 5005) — marine grade",
    thickness: "1.0mm to 2.0mm",
    finish: "Mill-finish — requires painting after installation",
    corrosionResistance: "High — 5000-series alloy — suitable for coastal environments",
    weldability: "Good — TIG weldable by qualified aluminium welder",
  },
  {
    product: "Metalcorp Aluminium Sheet",
    brand: "Metalcorp",
    alloy: "Confirm alloy at order — 5000-series preferred",
    thickness: "Confirm at order",
    finish: "Mill-finish — requires painting after installation",
    corrosionResistance: "Confirm with Metalcorp for specific alloy",
    weldability: "Confirm with fabricator for specific alloy",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Box gutter lining in coastal or high-humidity environments where corrosion resistance is a primary concern",
    "Box gutter remediation on older or lightweight roof structures where the weight of steel lining may be a concern",
    "Projects where a welded, monolithic aluminium gutter lining is required for superior joint integrity",
    "Alternative to Colorbond steel where the specifier or engineer has determined aluminium is more appropriate for the site environment",
    "Box gutter lining where mill-finish aluminium with a site-applied paint finish is acceptable to the owner",
  ],
  selectionCriteria: [
    "Alloy specification — 5000-series (5052 or 5005) preferred for corrosion resistance and weldability — confirm with supplier",
    "Thickness — 1.0mm to 2.0mm — confirm against AS 1562.3 requirements and hydraulic design",
    "Joint method — welded vs lapped and sealed — welded joints preferred for new box gutter linings",
    "Fabricator capability — confirm the appointed fabricator has aluminium roll-forming and TIG welding capability",
    "Painting requirements — mill-finish aluminium requires a suitable paint system after installation",
    "Dissimilar metal precautions — confirm no copper or copper alloy contact in the gutter assembly",
    "Thermal expansion — aluminium has a higher coefficient of thermal expansion than steel — joint design must accommodate movement",
  ],
  limitations: [
    "Aluminium must NOT contact copper or copper alloys — rapid galvanic corrosion will occur — critical where copper overflow outlets or copper downpipes are present",
    "Mill-finish aluminium requires painting — this is an additional cost and programme step compared to pre-painted Colorbond steel",
    "Aluminium welding requires a qualified TIG welder — not all sheet metal fabricators have this capability",
    "Alkaline attack — aluminium is susceptible to attack from concrete, mortar, and lime — must be isolated from alkaline materials",
    "Thermal expansion — aluminium expands significantly with temperature change — expansion must be accommodated in the design",
    "Do not specify aluminium lining in gutters with existing copper components without installing an appropriate isolation or separation detail",
  ],
  standardsNotes: [
    "AS 1562.3 — Design and Installation of Sheet Metal Roof and Wall Cladding — Part 3: Aluminium — primary standard for aluminium box gutter design and installation",
    "AS/NZS 1734 — Aluminium and Aluminium Alloys — Flat Sheet, Coiled Sheet and Plate — material standard for aluminium sheet",
    "NCC Volume One — performance requirements for roof drainage on Class 2 buildings",
    "AS 3500.3 — Plumbing and Drainage — Stormwater Drainage — hydraulic design requirements for box gutters",
    "Hydraulic design — box gutter must be sized by a licensed hydraulic engineer for the roof catchment area",
  ],
  suitableDefects: [
    "Box gutter lining corrosion in coastal or high-corrosivity environments where steel lining has failed prematurely",
    "Box gutter failure on older buildings where aluminium lining weight advantage is beneficial",
    "Replacement of failed steel lining with aluminium where engineer has determined aluminium is the superior material for the environment",
  ],
  typicalSubstrates: [
    "Existing timber box gutter structure — must be confirmed as structurally sound before lining installation",
    "Steel box gutter substrate — confirm isolation between aluminium lining and steel structure to prevent galvanic corrosion",
    "Concrete or masonry gutter substrate — install isolation between aluminium and alkaline substrate",
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

export function BoxGutterAluminiumIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are aluminium box gutter lining systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Aluminium sheet box gutter lining systems use custom roll-formed aluminium alloy sheet installed within the existing box gutter structure to replace a failed or corroded lining. Aluminium is specified as an alternative to Colorbond steel where its higher corrosion resistance, lighter weight, or weldability are considered advantageous for the specific project environment or structural conditions.
        </p>
        {expanded && (
          <>
            <p>
              5000-series aluminium alloys (marine-grade) are the standard specification for box gutter lining fabrication in Australia. Mill-finish aluminium requires painting after installation — unlike Colorbond steel which is factory-coated. Welded aluminium box gutter joints provide a monolithic, leak-free lining that is superior to lapped and sealed joints, but requires a specialist aluminium TIG welder. Dissimilar metal precautions are critical — aluminium must never contact copper or copper alloys without appropriate isolation.
            </p>
            <p>
              Aluminium box gutter lining design must comply with AS 1562.3 and be sized by a licensed hydraulic engineer. The higher coefficient of thermal expansion of aluminium compared to steel means that thermal movement must be accounted for in the gutter design and joint detailing.
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

export function BoxGutterAluminiumProductSection() {
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
              <TechCard icon={<BookOpen size={15} />} title="Standards & Testing" items={TECH_INFO.standardsNotes} style="bullet" />
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
            <p className="mt-1 text-sm text-slate-500">2 products — 2 brands — aluminium sheet box gutter lining — scroll to view all</p>
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
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} shown
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
                  <div className="mt-0.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                  </div>
                  <CollapsibleCardDetails text={product.descriptionLine} chips={product.techChips} />
                </div>

                <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
                  <CollapsibleDescription text={product.systemDescription} />
                </div>

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
              Side-by-side comparison of aluminium sheet box gutter lining systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Alloy</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Thickness</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Finish</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Corrosion resistance</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Weldability</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.alloy}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.thickness}</td>
                  <td className="px-4 py-3 text-slate-600">{row.finish}</td>
                  <td className="px-4 py-3 text-slate-600">{row.corrosionResistance}</td>
                  <td className="px-4 py-3 text-slate-600">{row.weldability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
