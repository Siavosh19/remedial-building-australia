"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Heritage-Masonry"
  | "Salvage-yard"
  | "Heritage-specialist"
  | "Reclaimed"
  | "Heritage"
  | "Colour-match"
  | "Structural"
  | "AS-3700"
  | "AS-NZS-4455"
  | "Facade";

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
    fullLabel: "Heritage Masonry Australia",
    brandUrl: "https://www.heritagemasonry.com.au",
    accentColor: "#0369a1",
    name: "Heritage Masonry — Reclaimed Matching Brick (Salvage Stock)",
    descriptionLine: "Heritage Masonry specialist salvage stock — reclaimed brick matched by physical sample comparison to the existing building — heritage and pre-1980s facade replacement on Class 2 buildings",
    productType: "Reclaimed matching brick — physical sample match — heritage masonry specialist",
    filterTags: ["Heritage-Masonry", "Reclaimed", "Heritage", "Colour-match", "Structural", "AS-3700", "Facade"],
    techChips: [
      { label: "Reclaimed salvage", cls: "bg-sky-100 text-sky-800" },
      { label: "Physical sample match", cls: "bg-slate-100 text-slate-700" },
      { label: "Heritage compatible", cls: "bg-amber-50 text-amber-700" },
      { label: "Confirm AS/NZS 4455", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "Heritage Masonry Australia is a specialist supplier of reclaimed bricks matched by physical sample comparison to the existing building facade. For Class 2 strata buildings built between pre-1940s and 1980, reclaimed brick is often the only viable route to achieving an acceptable colour, texture and size match — particularly for colonial, federation or inter-war construction where the original kiln run cannot be replicated by any manufacturer. Submit a physical sample from the building to Heritage Masonry before committing to a programme — indoor colour comparison is not adequate. Confirm AS/NZS 4455 durability grade suitability with the structural engineer before ordering. Build a trial panel on the building in a visible location and allow 4–8 weeks of weathering before approving the match.",
    technicalProperties: [
      "Best available colour and texture match for pre-1980s brick — original firing, clay source and surface texture cannot be replicated by new pressed brick",
      "Weathered surface — reclaimed brick has already undergone decades of weathering; new manufactured brick will stand out visibly against aged adjacent masonry",
      "Suitable for all structural applications when sourced to AS/NZS 4455 grade — confirm compressive strength and durability class with Heritage Masonry before ordering",
      "Heritage compatible — traditional material for heritage conservation area buildings and heritage authority-listed facades",
      "Environmentally preferred — reuse of existing material avoids new manufacturing energy and embodied carbon",
    ],
    limitations: [
      "Supply is unpredictable — reclaimed brick from a specific original source cannot be guaranteed; allow adequate lead time for sourcing before committing to a programme",
      "Quality is variable — salvage bricks must be inspected individually for cracks, spalling and mortar contamination before use",
      "May not achieve AS/NZS 4455 grade — not all salvage brick can be confirmed to AS/NZS 4455 durability requirements; confirm grade suitability with structural engineer for exposed high-load applications",
      "Dimensional variation — reclaimed brick sizes vary across kiln runs; confirm dimensional tolerance is acceptable before ordering",
      "Trial panel required — do not accept colour match without a trial panel built on the building and assessed in wet and dry conditions",
    ],
    procurementSources: [
      { name: "Heritage Masonry Australia — specialist salvage stock", url: "https://www.heritagemasonry.com.au" },
      { name: "Heritage Masonry contact — physical sample matching service", url: "https://www.heritagemasonry.com.au/contact" },
    ],
  },
  {
    fullLabel: "State demolition salvage yards",
    brandUrl: "https://www.heritagemasonry.com.au",
    accentColor: "#b45309",
    name: "State Demolition Salvage Yards — Reclaimed Brick Stock",
    descriptionLine: "State-based demolition salvage yards — reclaimed brick from local demolition projects — physical sample matching to the existing building — variable stock, quality and grade",
    productType: "Reclaimed matching brick — demolition salvage — state-based — physical sample required",
    filterTags: ["Salvage-yard", "Reclaimed", "Heritage", "Colour-match", "Structural", "AS-3700", "Facade"],
    techChips: [
      { label: "Demolition salvage", cls: "bg-amber-100 text-amber-800" },
      { label: "Physical sample match", cls: "bg-slate-100 text-slate-700" },
      { label: "Variable quality", cls: "bg-red-50 text-red-700" },
      { label: "Confirm AS/NZS 4455", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "State-based demolition salvage yards supply reclaimed brick from local demolition projects — often the most accessible source for reclaimed brick matching. Stock availability varies by yard, by state, and by the specific demolition projects in progress at the time. Confirm the physical brick dimensions, colour, surface texture and firing characteristics by submitting a sample from the building before visiting the yard. Many salvage yards in major Australian cities carry a range of 19th and 20th century fired clay brick from local sources — particularly in Victoria, NSW and Queensland where significant pre-war residential construction used consistent local brick types. Grade confirmation to AS/NZS 4455 is typically not available from salvage yards — the structural engineer must confirm the grade is acceptable for the exposure and load class before ordering.",
    technicalProperties: [
      "Most accessible source for reclaimed brick in most Australian states — salvage yards operate in all major metro areas",
      "Broad colour and texture range from diverse demolition sources — provides the best chance of finding a close match to a range of original brick types",
      "Weathered surface — reclaimed brick already shows appropriate surface aging for use alongside existing aged masonry",
      "Variable supply — stock turns over rapidly; early sourcing and reservation of confirmed quantities is critical to programme",
      "Cost-effective for small replacement quantities where minimum order quantities from a manufacturer would be prohibitive",
    ],
    limitations: [
      "Grade confirmation to AS/NZS 4455 typically not available — structural engineer must accept the salvage grade or commission testing before approving for structural use",
      "Variable quality — each brick must be inspected for cracks, spalling, alkali contamination and mortar residue before use",
      "Supply cannot be guaranteed beyond the available stock at the time of sourcing — reserve quantities early to avoid supply failure during works",
      "No consistent sizing — bricks from different demolition sources will have dimensional variation; confirm dimensional tolerance is acceptable before ordering",
      "Trial panel mandatory — do not accept colour match without a trial panel on the building assessed in wet and dry conditions",
    ],
    procurementSources: [
      { name: "Heritage Masonry Australia — salvage stock reference", url: "https://www.heritagemasonry.com.au" },
      { name: "State demolition salvage yards — confirm local availability and stock", url: "https://www.heritagemasonry.com.au" },
    ],
  },
  {
    fullLabel: "Heritage brick specialist",
    brandUrl: "https://www.heritagemasonry.com.au",
    accentColor: "#7c3aed",
    name: "Heritage Brick Specialist — Sourced-to-Order Reclaimed Brick",
    descriptionLine: "Heritage brick specialist — sourced-to-order reclaimed brick from multiple salvage and demolition sources — physical sample submission required — for significant heritage buildings on Class 2 facades",
    productType: "Reclaimed matching brick — sourced to order — heritage specialist — significant heritage buildings",
    filterTags: ["Heritage-specialist", "Reclaimed", "Heritage", "Colour-match", "Structural", "AS-3700", "Facade"],
    techChips: [
      { label: "Sourced to order", cls: "bg-violet-100 text-violet-800" },
      { label: "Heritage specialist", cls: "bg-amber-50 text-amber-700" },
      { label: "Multiple sources", cls: "bg-green-50 text-green-700" },
      { label: "Confirm AS/NZS 4455", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "Heritage brick specialists source reclaimed brick to order for significant heritage buildings where a generic salvage yard search is unlikely to find a suitable match. The specialist draws on a network of salvage yards, demolition contractors, and private collections to locate brick from the specific kiln run, region, or era of the original construction. Submit a physical sample from the building — ideally from a non-exposed location such as inside a pier or cavity — with full photographic documentation. The specialist will advise on likely sources, lead times, and sample quantities for trial panels. This approach is appropriate for State Heritage Register buildings and significant conservation area facades where heritage authority sign-off on the brick match is required.",
    technicalProperties: [
      "Access to broader network of sources than a single salvage yard — increases probability of finding a close kiln run or regional match",
      "Specialist knowledge of historic brick types by era and region — provides guidance on likely sources and appropriate grades",
      "Can advise on heritage authority requirements for brick matching on listed buildings — critical for State Heritage Register works",
      "Sourced-to-order service — reduces risk of supply failure for complex matching requirements",
      "Physical sample submission and specialist assessment before procurement — reduces risk of ordering the wrong brick",
    ],
    limitations: [
      "Longer lead times than salvage yard direct purchase — sourcing to order adds 2–6 weeks to the procurement programme",
      "Higher cost than direct salvage yard sourcing — specialist sourcing service adds cost, particularly for small quantities",
      "Grade confirmation to AS/NZS 4455 still not guaranteed from salvage sources — structural engineer must confirm grade acceptability",
      "Availability of a specific kiln run or regional match cannot be guaranteed — the specialist will advise on the closest available match",
      "Trial panel still required — do not accept colour match without a trial panel on the building assessed in wet and dry conditions",
    ],
    procurementSources: [
      { name: "Heritage Masonry Australia — specialist heritage brick sourcing", url: "https://www.heritagemasonry.com.au" },
      { name: "Heritage brick specialists — confirm availability by state", url: "https://www.heritagemasonry.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Heritage-Masonry", label: "Heritage Masonry" },
  { id: "Salvage-yard", label: "Salvage yard" },
  { id: "Heritage-specialist", label: "Heritage specialist" },
  { id: "Reclaimed", label: "Reclaimed" },
  { id: "Heritage", label: "Heritage" },
  { id: "Colour-match", label: "Colour match" },
  { id: "Structural", label: "Structural" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "AS-NZS-4455", label: "AS/NZS 4455" },
  { id: "Facade", label: "Facade" },
];

const SYSTEM_COMPARISON: {
  supplier: string;
  source: string;
  matching: string;
  grade: string;
  supply: string;
  cost: string;
  primaryUse: string;
}[] = [
  {
    supplier: "Heritage Masonry Australia",
    source: "Specialist salvage stock",
    matching: "Physical sample — heritage specialist",
    grade: "Confirm AS/NZS 4455",
    supply: "Specialist — confirm lead time",
    cost: "Moderate–high",
    primaryUse: "Heritage / pre-1980s exact colour match",
  },
  {
    supplier: "State demolition salvage yards",
    source: "Demolition salvage",
    matching: "Physical sample comparison",
    grade: "Confirm with engineer",
    supply: "Variable — stock-dependent",
    cost: "Low–moderate",
    primaryUse: "General reclaimed brick matching",
  },
  {
    supplier: "Heritage brick specialist",
    source: "Sourced to order",
    matching: "Network sourcing + specialist advice",
    grade: "Confirm with engineer",
    supply: "2–6 week lead time",
    cost: "High (sourcing service)",
    primaryUse: "State Heritage Register buildings",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Replacement of individual or small numbers of spalled, cracked or damaged face bricks on Class 2 strata building facades where the building is pre-1980s construction",
    "Heritage facade restoration where matching the original kiln run brick colour and texture is required by heritage authority",
    "Brick replacement in parapets, piers and exposed masonry elements on heritage-listed buildings following structural assessment",
    "Replacement of damaged bricks in conservation area buildings where manufactured matching brick cannot achieve an acceptable weathered appearance",
  ],
  selectionCriteria: [
    "Submit a physical brick sample from the building to the salvage yard or specialist before committing — indoor dry colour comparison is not adequate",
    "Build a trial panel on the building in a visible location and allow 4–8 weeks of weathering before approving the colour and texture match",
    "Confirm the replacement brick compressive strength and durability class meets or exceeds AS/NZS 4455 for the exposure classification",
    "Confirm bedding mortar type matches the original — do not bed replacement brick in cement mortar into a lime-mortar wall",
    "Structural engineer oversight is mandatory for all brick replacement in load-bearing masonry elements",
    "Reserve confirmed supply quantities early — reclaimed brick stock is finite and cannot be replaced once depleted",
  ],
  limitations: [
    "Reclaimed brick supply cannot be guaranteed — do not commit to a programme without confirming source and quantities",
    "Do not use cement mortar to bed replacement brick in a lime-mortar wall — differential stiffness concentrates movement at the interface",
    "Cosmetic epoxy brick repairs must not be accepted as a substitute for full brick replacement in structurally compromised brick",
    "Do not drill or cut into surrounding good brickwork when removing a damaged brick — work from the centre outward",
    "Do not order from photographs alone — physical sample comparison is mandatory",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — governs mortar designations, brick grades and structural performance requirements",
    "AS/NZS 4455 — Masonry Units — defines clay brick durability classes (R1–R3) and compressive strength grades",
    "Heritage state authority guidelines — Heritage NSW, Heritage Victoria, and equivalent bodies may require specific approval of replacement brick matching on listed buildings",
    "NCC Volume One — facade and masonry requirements for Class 2 buildings — confirm compliance with applicable performance requirements",
    "Structural engineer certificate required for all brick replacement in load-bearing masonry elements",
  ],
  suitableDefects: [
    "Spalled or delaminated brick faces where the brick body is structurally intact — cosmetic or full replacement on heritage buildings",
    "Mechanically cracked bricks following structural movement, settlement or thermal cycling — full replacement required",
    "Salt-damaged brickwork where the brick face has been lost to sub-efflorescence salt crystallisation — full replacement after salt treatment",
    "Bricks damaged during construction activity or penetration work on heritage facades — replacement to match",
  ],
  typicalSubstrates: [
    "Pre-1980s colonial, federation, inter-war, and post-war clay brick masonry facades on Class 2 strata buildings",
    "Heritage-listed clay brick facades where the heritage authority requires material compatibility",
    "Conservation area brickwork where the weathered appearance of the existing masonry means new manufactured brick is not acceptable",
    "NOT suitable: post-1960s modern brick facades where manufactured matching brick is the preferred approach",
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

export function ReclaimedMatchingBrickIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What is reclaimed matching brick?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Reclaimed matching brick is salvaged fired clay brick sourced from demolition projects or specialist salvage stocks and physically matched by sample comparison to the existing brick on the building facade. For pre-1980s and heritage masonry, reclaimed brick is often the only option that can achieve an acceptable colour and texture match.
        </p>
        {expanded && (
          <>
            <p>
              The original kiln run cannot be replicated by any manufacturer — the clay source, firing temperature and weathered surface patina of a historic brick are unique to its production era and location. Manufactured replacement brick will look conspicuously different from the existing weathered masonry for many years.
            </p>
            <p>
              A physical trial panel on the building is mandatory before approving the match. Grade confirmation to AS/NZS 4455 must be provided or accepted by the structural engineer before reclaimed brick is used in structurally loaded applications. Reserve quantities early — reclaimed brick stock is finite and cannot be replaced once depleted.
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

export function ReclaimedMatchingBrickProductSection() {
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
              <TechCard icon={<BookOpen size={15} />} title="Standards & Notes" items={TECH_INFO.standardsNotes} style="bullet" />
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 sources — reclaimed matching brick — scroll to view all</p>
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
              Side-by-side comparison of reclaimed brick suppliers and sources. Confirm all product selections against the current supplier before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Source</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Matching method</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Grade</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supply</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Cost</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.supplier} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.supplier}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.source}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.matching}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.grade}</td>
                  <td className="px-4 py-3 text-slate-600">{row.supply}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.cost}</td>
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
