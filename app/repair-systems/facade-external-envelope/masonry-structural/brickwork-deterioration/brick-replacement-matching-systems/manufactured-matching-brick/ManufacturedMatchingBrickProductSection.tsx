"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Brickworks"
  | "PGH"
  | "Midland-Brick"
  | "Manufactured"
  | "Colour-match"
  | "AS-NZS-4455"
  | "AS-3700"
  | "Structural"
  | "Facade"
  | "National"
  | "WA";

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
    fullLabel: "Brickworks / Austral Bricks",
    brandUrl: "https://www.brickworks.com.au",
    accentColor: "#b45309",
    name: "Brickworks / Austral Bricks — Manufactured Colour-Matched Brick",
    descriptionLine: "Brickworks / Austral Bricks — national manufacturer — colour-matched replacement brick for post-1960s facades — AS/NZS 4455 compliant — colour matching service available",
    productType: "Manufactured colour-matched clay brick — national supply — AS/NZS 4455 compliant",
    filterTags: ["Brickworks", "Manufactured", "Colour-match", "AS-NZS-4455", "AS-3700", "Structural", "Facade", "National"],
    techChips: [
      { label: "AS/NZS 4455 compliant", cls: "bg-amber-100 text-amber-800" },
      { label: "Colour matching service", cls: "bg-green-50 text-green-700" },
      { label: "National supply", cls: "bg-slate-100 text-slate-700" },
      { label: "Trial panel required", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "Brickworks is Australia's largest brick manufacturer, operating under the Austral Bricks brand in eastern states and South Australia. They offer an extensive range of pressed and extruded clay bricks and provide a colour-matching service where a physical sample from the building is submitted for comparison against their current range and archive stock. Confirm the current product range, minimum order quantities, and colour-matching service availability with Brickworks before specifying. New manufactured brick will look conspicuously different from weathered adjacent masonry for 2–5 years until surface weathering develops — advise the building owner and carry out a trial panel before committing to full replacement quantities.",
    technicalProperties: [
      "Consistent quality — manufactured to AS/NZS 4455 with reliable compressive strength and durability class",
      "Colour matching service — submit a physical sample to the Brickworks colour matching team before ordering",
      "Predictable supply and national distribution network — confirmed quantities available to programme",
      "Austral Bricks archive stock may include discontinued colours — confirm availability with Brickworks technical team",
      "Uniform nominal dimensions — tighter dimensional tolerance than salvage brick for consistent bed and perpend joints",
    ],
    limitations: [
      "New brick will not weather-match immediately — allow 2–5 years for surface weathering to develop",
      "Colour matching is never exact — confirm with a trial panel on the building before approving full replacement",
      "Minimum order quantities — confirm minimum batch size with Brickworks; small quantities may not be available as a custom batch",
      "Kiln batch colour variation — confirm all replacement bricks are from a single kiln batch to avoid colour banding",
      "Not suitable for heritage buildings where a weathered reclaimed brick is required by heritage authority",
    ],
    procurementSources: [
      { name: "Brickworks — national trade supply and colour matching", url: "https://www.brickworks.com.au" },
      { name: "Austral Bricks — eastern states and SA", url: "https://www.australbricks.com.au" },
    ],
  },
  {
    fullLabel: "PGH Bricks",
    brandUrl: "https://www.pghbricks.com.au",
    accentColor: "#0369a1",
    name: "PGH Bricks — Manufactured Colour-Matched Brick",
    descriptionLine: "PGH Bricks — eastern states manufacturer — colour-matched replacement brick — AS/NZS 4455 compliant — colour matching service and wide product range",
    productType: "Manufactured colour-matched clay brick — eastern states — AS/NZS 4455 compliant",
    filterTags: ["PGH", "Manufactured", "Colour-match", "AS-NZS-4455", "AS-3700", "Structural", "Facade", "National"],
    techChips: [
      { label: "AS/NZS 4455 compliant", cls: "bg-sky-100 text-sky-800" },
      { label: "Colour matching service", cls: "bg-green-50 text-green-700" },
      { label: "Eastern states supply", cls: "bg-slate-100 text-slate-700" },
      { label: "Trial panel required", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "PGH Bricks is a major Australian brick manufacturer (part of the Brickworks group) supplying the eastern states market. They offer a comprehensive colour-matching service and a wide current product range. Confirm the current product range, colour-matching service, and minimum order quantities with PGH before specifying. As with all manufactured replacement brick, new brick will look conspicuously different from weathered adjacent masonry for 2–5 years — carry out a trial panel on the building in a visible location and allow sufficient time for weathering assessment before approving the match.",
    technicalProperties: [
      "Wide product range — high probability of finding a close match to most eastern states common brick types",
      "Colour matching service — submit a physical brick sample from the building to PGH before ordering",
      "AS/NZS 4455 compliant — reliable compressive strength and durability class grading",
      "Predictable supply — confirmed quantities available to programme with clear lead times",
      "Technical support available — PGH technical team can advise on mortar type, bedding, and installation",
    ],
    limitations: [
      "New brick will not weather-match immediately — advise owner that colour matching takes 2–5 years of weathering",
      "Not suitable for heritage buildings where reclaimed brick is required by heritage authority",
      "Minimum order quantities — confirm minimum batch size before committing to small replacement quantities",
      "Colour matching service may not find an exact match for discontinued or unusual historic brick",
      "Confirm current product availability — PGH product ranges change with kiln production cycles",
    ],
    procurementSources: [
      { name: "PGH Bricks — eastern states trade supply", url: "https://www.pghbricks.com.au" },
      { name: "PGH colour matching service — submit physical sample", url: "https://www.pghbricks.com.au/colour-matching" },
    ],
  },
  {
    fullLabel: "Midland Brick (WA)",
    brandUrl: "https://www.midlandbrick.com.au",
    accentColor: "#7c3aed",
    name: "Midland Brick — Manufactured Colour-Matched Brick (WA)",
    descriptionLine: "Midland Brick — Western Australia manufacturer — colour-matched replacement brick for WA facades — AS/NZS 4455 compliant — wide WA product range",
    productType: "Manufactured colour-matched clay brick — Western Australia — AS/NZS 4455 compliant",
    filterTags: ["Midland-Brick", "Manufactured", "Colour-match", "AS-NZS-4455", "AS-3700", "Structural", "Facade", "WA"],
    techChips: [
      { label: "AS/NZS 4455 compliant", cls: "bg-violet-100 text-violet-800" },
      { label: "WA specialist", cls: "bg-green-50 text-green-700" },
      { label: "Broad WA range", cls: "bg-slate-100 text-slate-700" },
      { label: "Trial panel required", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "Midland Brick is the leading brick manufacturer in Western Australia, supplying a wide range of clay bricks from local WA clay sources. Their product range includes many of the brick colours and textures common in WA Class 2 buildings, making them the first point of contact for matching replacement brick in WA. Submit a physical sample from the building to Midland Brick for colour-matching assessment before ordering. Confirm current product range, minimum order quantities, and lead times. As with all manufactured replacement brick, carry out a trial panel on the building and allow sufficient weathering time before approving the colour match.",
    technicalProperties: [
      "Broad WA-specific product range — covers most brick types used in WA residential and strata construction from the 1960s to present",
      "Colour matching service — submit physical sample to Midland Brick for assessment against current and archive range",
      "AS/NZS 4455 compliant — confirmed compressive strength and durability class for WA exposure conditions",
      "Local WA supply — shortest lead times and most competitive pricing for WA projects",
      "Technical support available for WA-specific projects — mortar, bedding and installation advice",
    ],
    limitations: [
      "WA supply only — not suitable for eastern states projects; use Brickworks/PGH for eastern states replacement",
      "New brick will not weather-match immediately — allow 2–5 years for surface weathering to develop",
      "Not suitable for heritage buildings where reclaimed brick is required by heritage authority",
      "Minimum order quantities — confirm before committing to small replacement quantities",
      "Confirm current product availability — product ranges change with production cycles",
    ],
    procurementSources: [
      { name: "Midland Brick — WA trade supply and colour matching", url: "https://www.midlandbrick.com.au" },
      { name: "Midland Brick contact — confirm product range and matching service", url: "https://www.midlandbrick.com.au/contact" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Brickworks", label: "Brickworks" },
  { id: "PGH", label: "PGH Bricks" },
  { id: "Midland-Brick", label: "Midland Brick" },
  { id: "Manufactured", label: "Manufactured" },
  { id: "Colour-match", label: "Colour match" },
  { id: "AS-NZS-4455", label: "AS/NZS 4455" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "Structural", label: "Structural" },
  { id: "Facade", label: "Facade" },
  { id: "National", label: "National supply" },
  { id: "WA", label: "WA only" },
];

const SYSTEM_COMPARISON: {
  supplier: string;
  region: string;
  colourMatch: string;
  standard: string;
  supply: string;
  keyFeature: string;
  primaryUse: string;
}[] = [
  {
    supplier: "Brickworks / Austral Bricks",
    region: "National",
    colourMatch: "Colour matching service",
    standard: "AS/NZS 4455",
    supply: "Reliable — min order qtys apply",
    keyFeature: "Archive stock, widest range",
    primaryUse: "Eastern states / national post-1960s",
  },
  {
    supplier: "PGH Bricks",
    region: "Eastern states",
    colourMatch: "Colour matching service",
    standard: "AS/NZS 4455",
    supply: "Reliable — confirm min order",
    keyFeature: "Wide eastern states range",
    primaryUse: "Eastern states post-1960s",
  },
  {
    supplier: "Midland Brick",
    region: "WA only",
    colourMatch: "Colour matching service",
    standard: "AS/NZS 4455",
    supply: "Reliable (WA) — confirm min order",
    keyFeature: "WA-specific clay range",
    primaryUse: "WA post-1960s brick replacement",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Replacement of individual or small numbers of spalled, cracked or damaged face bricks on post-1960s Class 2 strata building facades",
    "Brick replacement in parapets, piers and exposed masonry elements on modern brick facades",
    "Replacement of damaged bricks following construction activity, penetration work or window replacement on modern strata buildings",
    "Full brick replacement as part of a facade remediation scope where the original brick is modern pressed or extruded clay",
  ],
  selectionCriteria: [
    "Submit a physical brick sample from the building to the manufacturer — indoor dry colour comparison is not adequate",
    "Build a trial panel on the building in a visible location and allow 4–8 weeks of weathering before approving the match",
    "Confirm replacement brick compressive strength meets or exceeds AS/NZS 4455 grade for the exposure classification",
    "Confirm bedding mortar type matches the original — do not use a harder or softer mortar than was originally specified",
    "Confirm all replacement bricks are from the same kiln batch to avoid visible colour banding",
    "Structural engineer oversight is mandatory for all brick replacement in load-bearing masonry elements",
  ],
  limitations: [
    "New brick will never match aged adjacent masonry immediately — advise the owner that colour matching takes 2–5 years of weathering",
    "Do not use manufactured matching brick on heritage or pre-1960s buildings where reclaimed brick is required",
    "Do not order without a physical trial panel on the building — do not rely on manufacturer colour swatches or photographs",
    "Minimum order quantities may apply — confirm before committing to small replacement scopes",
    "Colour match varies between kiln batches — reserve sufficient quantities from a single batch for the full replacement scope",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — governs mortar designations, brick grades and structural performance requirements",
    "AS/NZS 4455 — Masonry Units — defines clay brick durability classes (R1–R3) and compressive strength grades",
    "NCC Volume One — facade and masonry requirements for Class 2 buildings",
    "Structural engineer certificate required for all brick replacement in load-bearing masonry elements",
  ],
  suitableDefects: [
    "Spalled or delaminated brick faces on modern post-1960s buildings where a manufactured colour match is achievable",
    "Mechanically cracked bricks following structural movement — full replacement required",
    "Bricks damaged during construction activity or penetration work on modern strata buildings",
    "Brick replacement following cavity investigation and wall tie replacement on modern brick facades",
  ],
  typicalSubstrates: [
    "Post-1960s modern pressed or extruded clay brick facades on Class 2 strata buildings",
    "Calcium silicate brick — confirm matching product availability from the relevant manufacturer",
    "NOT suitable: pre-1960s heritage brick facades where a weathered reclaimed brick is required",
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

export function ManufacturedMatchingBrickIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What is manufactured matching brick?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Manufactured matching brick is purpose-made new clay brick colour-matched to the existing building facade through the manufacturer's colour-matching service. For post-1960s buildings with pressed or extruded clay brick, a manufactured match from a major supplier is the preferred approach over salvage brick — offering predictable supply, consistent quality, and AS/NZS 4455 grade compliance.
        </p>
        {expanded && (
          <>
            <p>
              A physical trial panel on the building is mandatory before approving the match. New manufactured brick will look conspicuously different from weathered adjacent masonry for 2–5 years until surface weathering develops — the building owner must be advised of this before works commence.
            </p>
            <p>
              All replacement bricks should be from the same kiln batch to avoid colour banding. Confirm minimum order quantities with the manufacturer before committing to small replacement scopes. For heritage or pre-1960s buildings, reclaimed brick is the preferred approach — not manufactured matching brick.
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

export function ManufacturedMatchingBrickProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 manufacturers — manufactured colour-matched brick — scroll to view all</p>
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
              Side-by-side comparison of manufactured matching brick suppliers. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Region</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Colour match</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Standard</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supply</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key feature</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.supplier} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.supplier}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.region}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.colourMatch}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.standard}</td>
                  <td className="px-4 py-3 text-slate-600">{row.supply}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.keyFeature}</td>
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
