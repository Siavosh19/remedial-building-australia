"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Matching-brick"
  | "Reclaimed"
  | "Manufactured"
  | "Epoxy-repair"
  | "AS-3700"
  | "AS/NZS-4455"
  | "Heritage"
  | "Colour-match"
  | "Structural"
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
    fullLabel: "Salvage yard / demolition contractor",
    brandUrl: "https://www.heritagemasonry.com.au",
    accentColor: "#0369a1",
    name: "Reclaimed matching brick — salvage source",
    descriptionLine: "Reclaimed brick sourced from demolition salvage — physical sample match to the existing building brick — AS/NZS 4455 grade confirmation required — heritage and pre-1980s facade replacement",
    productType: "Reclaimed brick — physical sample matching — AS 3700 — heritage masonry",
    filterTags: ["Matching-brick", "Reclaimed", "Heritage", "Colour-match", "AS-3700", "Facade", "Structural"],
    techChips: [
      { label: "Reclaimed", cls: "bg-sky-100 text-sky-800" },
      { label: "Physical sample match", cls: "bg-slate-100 text-slate-700" },
      { label: "Heritage compatible", cls: "bg-amber-50 text-amber-700" },
      { label: "Confirm AS/NZS 4455", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "Reclaimed brick sourced from demolition salvage, specifically matched by physical sample comparison to the existing brick on the building. For Class 2 strata buildings built between 1940 and 1980, reclaimed brick is often the only viable route to achieving an acceptable colour, texture and size match — particularly for colonial, federation or inter-war construction. The salvage yard must provide brick from a matching original kiln run where possible, and a physical trial panel must be built and approved before committing to full replacement quantities.",
    technicalProperties: [
      "Best available colour and texture match for pre-1980s brick — original firing, clay source and surface texture cannot be replicated by new pressed brick",
      "Weathered surface — reclaimed brick has already undergone decades of weathering; new brick will stand out against aged adjacent masonry",
      "Suitable for all structural applications when sourced to AS/NZS 4455 grade — confirm compressive strength, water absorption and durability with salvage supplier",
      "Environmentally preferred — reuse of existing material avoids new manufacturing energy",
    ],
    limitations: [
      "Supply is unpredictable — reclaimed brick from a specific original source cannot be guaranteed; allow adequate time for sourcing before committing to a programme",
      "Quality is variable — salvage bricks must be inspected individually for cracks, spalling and mortar contamination before use",
      "May not achieve AS/NZS 4455 grade — not all salvage brick can be graded to AS/NZS 4455 durability requirements; confirm grade suitability with structural engineer for exposed high-load applications",
      "Dimensional variation — reclaimed brick sizes vary across kiln runs; confirm the dimensional tolerance is acceptable before ordering",
    ],
    procurementSources: [
      { name: "Heritage Masonry (heritage brick salvage)", url: "https://www.heritagemasonry.com.au" },
      { name: "State demolition salvage yards — confirm local availability", url: "https://www.heritagemasonry.com.au" },
      { name: "Heritage brick specialist suppliers — sourced to order", url: "https://www.heritagemasonry.com.au" },
    ],
  },
  {
    fullLabel: "PGH Bricks / Austral Bricks / Brickworks",
    brandUrl: "https://www.brickworks.com.au",
    accentColor: "#b45309",
    name: "Manufactured matching brick — specialist pressed or extruded",
    descriptionLine: "Purpose-manufactured brick matched to the existing building brick by colour, texture and nominal size — AS/NZS 4455 compliant — colour matching service available from major manufacturers",
    productType: "Manufactured matching brick — AS/NZS 4455 — colour matched — external facade",
    filterTags: ["Matching-brick", "Manufactured", "Colour-match", "AS-3700", "AS/NZS-4455", "Facade", "Structural"],
    techChips: [
      { label: "Manufactured — AS/NZS 4455", cls: "bg-amber-100 text-amber-800" },
      { label: "Colour matching service", cls: "bg-green-50 text-green-700" },
      { label: "Predictable supply", cls: "bg-slate-100 text-slate-700" },
      { label: "Trial panel required", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "Purpose-manufactured brick matched to the existing building brick by colour, texture and nominal size, supplied by a specialist brick manufacturer or their colour-matching service. Major Australian brick manufacturers offer colour-matching services and can sometimes manufacture special batches or supply discontinued colours from archive stock. Confirm the current product range and minimum order quantities with the manufacturer — small replacement quantities may not be available as a separate batch order and may require sourcing a full pallet of the closest available standard colour.",
    technicalProperties: [
      "Consistent quality — manufactured brick conforms to AS/NZS 4455 and provides reliable compressive strength and durability class",
      "Colour matching service available from major manufacturers — submit a physical sample to the manufacturer's colour matching team before ordering",
      "Predictable supply — manufactured brick can be ordered in confirmed quantities to programme; no supply uncertainty from salvage sourcing",
      "Uniform dimensions — nominal dimensional tolerance tighter than salvage brick; easier to lay to consistent bed and perpend joints",
    ],
    limitations: [
      "New brick will not weather-match immediately — new brick will look conspicuously different from the aged surrounding masonry for 2–5 years until surface weathering develops",
      "Colour matching is never perfect — the fired colour of a new brick cannot exactly replicate decades of weathering and atmospheric soiling on the original",
      "Minimum order quantities may be large — most manufacturers will not produce a custom colour batch for small quantities; may need to accept the nearest standard colour",
      "Kiln batch colour variation — confirm that all replacement bricks are from a single kiln batch to avoid visible colour banding within the replacement zone",
    ],
    procurementSources: [
      { name: "Brickworks / Austral Bricks — national", url: "https://www.brickworks.com.au" },
      { name: "PGH Bricks — eastern states", url: "https://www.pghbricks.com.au" },
      { name: "Midland Brick — WA", url: "https://www.midlandbrick.com.au" },
    ],
  },
  {
    fullLabel: "Sika / Mapei / Ardex / Specialty repair supplier",
    brandUrl: "https://aus.sika.com",
    accentColor: "#be123c",
    name: "Brick fragment epoxy repair compound",
    descriptionLine: "Tinted cementitious or two-part epoxy repair mortar for restoring spalled or damaged brick faces — cosmetic face restoration only — not a structural repair — colour-matched and textured on site",
    productType: "Epoxy / cementitious brick face repair — cosmetic only — AS 3700",
    filterTags: ["Epoxy-repair", "Colour-match", "AS-3700", "Facade", "Heritage"],
    techChips: [
      { label: "Epoxy or cementitious", cls: "bg-rose-100 text-rose-800" },
      { label: "Cosmetic repair only", cls: "bg-amber-50 text-amber-700" },
      { label: "Colour matched on site", cls: "bg-slate-100 text-slate-700" },
      { label: "Not structural", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "Tinted cementitious or two-part epoxy repair mortar for restoring spalled or damaged brick faces where full brick replacement is not practicable. The repair compound is applied to the prepared spall void, built up in layers and sculpted to restore the original brick profile and face texture before curing. The compound is tinted to match the brick colour and finished to replicate the original brick texture by stamping, brushing or sponging while plastic. Not a structural repair — for cosmetic face restoration of mechanically sound brick only; does not restore structural capacity to cracked or delaminated brick.",
    technicalProperties: [
      "Avoids the disruption and cost of full brick replacement where the brick is structurally sound but cosmetically damaged",
      "Can be colour-matched and textured on site to approach the appearance of the adjacent brick",
      "Suitable for isolated spalls on otherwise sound brick — particularly useful where a perfectly matched replacement brick cannot be sourced",
      "Shorter programme than brick replacement — no scaffolding for demolition of brick out, no repointing and curing required",
    ],
    limitations: [
      "Not a structural repair — epoxy or cementitious face patching does not restore the brick's compressive strength or bond capacity; confirm with engineer that the brick is structurally sound before accepting a cosmetic repair",
      "Durability is lower than full brick replacement — patch repairs in exposed facades are subject to differential thermal movement and may de-bond over 5–15 years",
      "Colour match deteriorates with weathering — the repair compound and the surrounding original brick will weather at different rates; colour difference becomes more apparent over time",
      "Not suitable for large-area damage — patch repairs covering more than approximately 30% of the brick face should be reviewed by engineer for full brick replacement",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply nationally", url: "https://aus.sika.com" },
      { name: "Mapei Australia — national distributors", url: "https://www.mapei.com/au" },
      { name: "Ardex Australia — national distributors", url: "https://www.ardex.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Matching-brick", label: "Matching brick" },
  { id: "Reclaimed", label: "Reclaimed" },
  { id: "Manufactured", label: "Manufactured" },
  { id: "Epoxy-repair", label: "Epoxy repair" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "AS/NZS-4455", label: "AS/NZS 4455" },
  { id: "Heritage", label: "Heritage" },
  { id: "Colour-match", label: "Colour match" },
  { id: "Structural", label: "Structural" },
  { id: "Facade", label: "Facade" },
];

const SYSTEM_COMPARISON: {
  product: string;
  source: string;
  structural: string;
  colourMatch: string;
  supply: string;
  durability: string;
  primaryUse: string;
}[] = [
  {
    product: "Reclaimed matching brick",
    source: "Salvage",
    structural: "Yes (confirm AS/NZS 4455)",
    colourMatch: "Best (weathered surface)",
    supply: "Uncertain — allow lead time",
    durability: "High",
    primaryUse: "Heritage / pre-1980s exact colour match",
  },
  {
    product: "Manufactured matching brick",
    source: "New pressed / extruded",
    structural: "Yes (AS/NZS 4455)",
    colourMatch: "Good (new — trial panel required)",
    supply: "Reliable — min order qtys apply",
    durability: "High",
    primaryUse: "Modern / post-1960s brick replacement",
  },
  {
    product: "Epoxy brick repair compound",
    source: "Repair compound",
    structural: "No — cosmetic only",
    colourMatch: "Moderate",
    supply: "Reliable",
    durability: "Moderate (5–15 yr)",
    primaryUse: "Isolated face spall restoration — no match brick available",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Replacement of individual or small numbers of spalled, cracked or damaged face bricks on Class 2 strata building facades",
    "Brick replacement in parapets, piers and exposed masonry elements following structural assessment",
    "Heritage facade restoration where matching original kiln run brick is required",
    "Cosmetic face repair of isolated brick spalls where full replacement is not practicable or economical",
    "Brick replacement as part of a facade remediation scope following cavity investigation and wall tie replacement",
  ],
  selectionCriteria: [
    "Submit a physical brick sample from the building to suppliers before committing — indoor dry colour comparison is not adequate",
    "Build a trial panel on the building in a visible location and allow 4–8 weeks to weathering before approving the match",
    "Confirm the replacement brick compressive strength is appropriate — must meet or exceed AS/NZS 4455 grade for the exposure classification",
    "Confirm bedding mortar type matches the original — do not bed a replacement brick in cement mortar into a lime-mortar wall",
    "For cosmetic epoxy repair, confirm with the engineer that the brick is structurally sound before accepting a cosmetic repair",
    "Structural engineer oversight is mandatory for all brick replacement in load-bearing masonry elements",
  ],
  limitations: [
    "New brick will never match aged adjacent masonry immediately — advise the owner that colour matching takes 2–5 years of weathering",
    "Do not use cement mortar to bed replacement brick in a lime-mortar wall — differential stiffness concentrates movement at the interface",
    "Cosmetic epoxy brick repairs must not be accepted as a substitute for full brick replacement in structurally compromised brick",
    "Reclaimed brick supply cannot be guaranteed — do not commit to a programme without confirming supply source and quantities",
    "Do not drill or cut into surrounding good brickwork when removing a damaged brick — work from the centre of the damaged brick outward",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — governs mortar designations, brick grades and structural performance requirements",
    "AS/NZS 4455 — Masonry Units — defines clay brick durability classes (R1–R3) and compressive strength grades",
    "NCC Volume One — facade and masonry requirements for Class 2 buildings — confirm compliance with applicable performance requirements",
    "NATSPEC worksection 03 41 00 — Masonry — project specification requirements for brick replacement work",
    "Structural engineer certificate required for all brick replacement in load-bearing masonry elements",
  ],
  suitableDefects: [
    "Spalled or delaminated brick faces where the brick body is structurally intact — cosmetic or full replacement",
    "Mechanically cracked bricks following structural movement, settlement or thermal cycling — full replacement required",
    "Salt-damaged brickwork where the brick face has been lost to sub-efflorescence salt crystallisation — full replacement after salt treatment",
    "Bricks damaged during construction activity, penetration work or window replacement — replacement to match",
    "Failed brick replacement work from previous remediation that does not match the original building — full replacement and re-matching required",
  ],
  typicalSubstrates: [
    "Clay brick masonry — colonial, inter-war, post-war and modern fired clay brick facades",
    "Calcium silicate brick — confirm matching product availability from manufacturer before specifying replacement",
    "Concrete masonry unit facades — confirm matching CMU grade and colour before ordering",
    "Reconstructed stone brick — confirm with manufacturer whether the product has a colour-matching service",
    "Heritage or conservation-listed brick — confirm replacement requirements with heritage consultant or relevant authority before commencing work",
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

export function BrickReplacementIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are brick replacement and matching systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Brick replacement and matching systems cover the selection, procurement and installation of replacement bricks for Class 2 strata building facades. Achieving an acceptable colour and texture match between replacement and existing brick is the primary challenge — new brick does not look like weathered brick, and the original brick kiln run is rarely available. A structured matching process (physical sample, supplier assessment, trial panel) is essential.
        </p>
        {expanded && (
          <>
            <p>
              For heritage or pre-1980s buildings, reclaimed brick sourced from demolition salvage is often the only viable match — but supply is unpredictable and quality is variable. For post-1960s buildings, a colour-matched manufactured brick from a major supplier is the more reliable option, with the understanding that a new brick will always look conspicuously different from weathered adjacent masonry for 2–5 years. Where a matching brick cannot be sourced, a tinted epoxy or cementitious face repair compound can restore the cosmetic appearance of an isolated spall — but this is not a structural repair.
            </p>
            <p>
              Structural engineer oversight is mandatory for all brick replacement in load-bearing masonry elements — the engineer must confirm structural continuity, temporary propping requirements, and replacement brick grade per AS 3700 and AS/NZS 4455.
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

export function BrickReplacementProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 options — brick replacement and matching — scroll to view all</p>
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
            {visibleProducts.length} option{visibleProducts.length !== 1 ? "s" : ""} — scroll to view all
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
              Side-by-side comparison of brick replacement options. Confirm all selections with the structural engineer and supplier before ordering.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Source</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Structural</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Colour match</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supply certainty</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Durability</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.source}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.structural}</td>
                  <td className="px-4 py-3 text-slate-600">{row.colourMatch}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.supply}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.durability}</td>
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
