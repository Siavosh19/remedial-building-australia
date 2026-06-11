"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Colorbond"
  | "Pre-painted"
  | "Step-flashing"
  | "Counter-flashing"
  | "Standard";

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
    fullLabel: "Lysaght / BlueScope",
    brandUrl: "https://www.bluescopesteel.com.au",
    tdsUrl: "https://www.bluescopesteel.com.au/products/colorbond-steel",
    accentColor: "#0369a1",
    name: "Lysaght/BlueScope Colorbond Step Flashing",
    descriptionLine: "Pre-formed or site-formed step and counter-flashing from BlueScope Colorbond steel — most common material for step flashings against masonry walls on tiled roofs in Australia — available in standard Colorbond colours",
    productType: "Colorbond steel step and counter-flashing — site-formed or pre-formed",
    filterTags: ["Colorbond", "Pre-painted", "Step-flashing", "Counter-flashing", "Standard"],
    techChips: [
      { label: "Colorbond steel", cls: "bg-sky-100 text-sky-800" },
      { label: "Pre-painted factory finish", cls: "bg-slate-100 text-slate-700" },
      { label: "Standard Colorbond colours", cls: "bg-green-50 text-green-700" },
      { label: "Site-formed or pre-formed", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 1562.1 — standard material", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Lysaght/BlueScope Colorbond step flashing is the most common material for step and counter-flashing installations against masonry walls on pitched tiled roofs across Australia. Produced from BlueScope Colorbond pre-painted steel sheet, this material is specified for both soaker-type step flashings that weave between tiles and the wall, and for continuous step flashings at wall junctions. The pre-painted Colorbond finish — applied in the factory — provides excellent corrosion resistance, colour retention, and compatibility with roofing tile colours and wall finishes. Colorbond step flashings are either formed by the roofing contractor on site from Colorbond coil or sheet stock using a sheet metal folder, or can be supplied pre-formed to a specified profile by a roofing sheet metal fabricator. Counter-flashings — the upper flashing fixed into a raked mortar joint in the masonry wall — are similarly formed from Colorbond sheet. The installation must comply with tile manufacturer requirements for soaker overlap and step flashing fixing, and with AS 1562.1 for metal roofing and wall cladding. Colour matching against the roof tiles or wall cladding is an important aesthetic requirement — select the Colorbond colour that most closely matches the tile colour or the wall render/cladding. Confirm the current Colorbond colour range and availability with BlueScope or the roofing sheet metal supplier before ordering.",
    technicalProperties: [
      "BlueScope Colorbond pre-painted steel — factory-applied paint system over zinc-aluminium alloy-coated base steel substrate",
      "Available in the full standard Colorbond colour range — confirm current colour availability with BlueScope or sheet metal supplier",
      "Site-formed from Colorbond coil or flat sheet using a manual or powered folder — or supplied pre-formed to specification by fabricator",
      "Suitable for step flashings (soaker type or continuous), counter-flashings into mortar joints, and apron flashings at masonry wall abutments",
      "Standard material for AS 1562.1 compliant step flashing installations on pitched tiled roofs — most widely specified and stocked material in Australia",
      "Corrosion-resistant factory paint system — does not require site painting or site-applied coating — self-finished",
      "Fixings must be compatible — use stainless steel or Colorbond-compatible screws and clips — do not use plain steel or copper fixings",
    ],
    limitations: [
      "Cannot be formed by hand like lead — requires a sheet metal folder or brake to achieve clean, consistent bends — site-forming requires appropriate trade tools",
      "Factory colour is fixed — cannot easily be repainted on site to exactly match a non-standard tile colour — colour mismatch is a common aesthetic issue",
      "Not suitable for complex curved or irregular profiles where the material cannot be bent with a standard folder — use lead sheet for complex heritage applications",
      "Dissimilar metal contact — do not allow Colorbond to come into direct contact with copper flashings or copper-based fixings — use Colorbond-compatible fixings only",
      "Counter-flashings into mortar joints must be properly raked and pointed — a poor mortar joint will allow water ingress behind the counter-flashing regardless of material",
      "Confirm current Colorbond product specifications and colour availability with BlueScope before ordering — colour range is subject to periodic revision",
    ],
    procurementSources: [
      { name: "BlueScope Steel — trade supply", url: "https://www.bluescopesteel.com.au" },
      { name: "Lysaght — product information", url: "https://www.lysaght.com" },
      { name: "Roofing and Building Supplies nationally", url: "https://www.roofmaster.com.au" },
      { name: "Stratco — roofing sheet metal", url: "https://www.stratco.com.au" },
    ],
  },
  {
    fullLabel: "Stramit",
    brandUrl: "https://www.stramit.com.au",
    accentColor: "#b45309",
    name: "Stramit Colorbond Step Flashing",
    descriptionLine: "Stramit Colorbond steel step and counter-flashing — alternative to Lysaght — site-formed from Colorbond coil — same Colorbond colour range",
    productType: "Colorbond steel step and counter-flashing — site-formed",
    filterTags: ["Colorbond", "Pre-painted", "Step-flashing"],
    techChips: [
      { label: "Colorbond steel", cls: "bg-amber-100 text-amber-800" },
      { label: "Pre-painted factory finish", cls: "bg-slate-100 text-slate-700" },
      { label: "Stramit supply network", cls: "bg-green-50 text-green-700" },
      { label: "Site-formed from coil", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Stramit Colorbond step flashing is Stramit's equivalent product to the Lysaght/BlueScope Colorbond step flashing listed above. Stramit produces Colorbond-coated steel products from its own manufacturing facilities and distributes through its own branch network across Australia. The product performs identically to the Lysaght equivalent — same Colorbond pre-painted steel substrate, same colour range, same forming method. The primary distinction between Stramit and Lysaght Colorbond products is the supply chain — some roofing contractors and sheet metal fabricators source their Colorbond coil and sheet stock through Stramit branches rather than BlueScope/Lysaght distributors, depending on local branch proximity and trade account arrangements. Both products use BlueScope Colorbond steel and the Colorbond colour range is the same. For the roofing contractor forming step flashings on site from coil stock, the choice between Lysaght and Stramit Colorbond is typically determined by trade account and local supplier availability. Confirm the current product range and colour availability with the local Stramit branch before ordering.",
    technicalProperties: [
      "Stramit Colorbond pre-painted steel — same BlueScope Colorbond substrate as Lysaght products",
      "Available in the standard Colorbond colour range — confirm current availability with local Stramit branch",
      "Site-formed from Colorbond coil or flat sheet using folder or brake — same forming method as Lysaght",
      "Suitable for step flashings, counter-flashings, and apron flashings at masonry wall abutments on tiled roofs",
      "Distributed through Stramit branches nationally — trade supply to roofing contractors and sheet metal fabricators",
      "Fixings must be Colorbond-compatible — stainless steel or approved clips — same fixing requirements as Lysaght Colorbond",
    ],
    limitations: [
      "Cannot be formed by hand — requires a sheet metal folder or brake — same tooling requirement as Lysaght Colorbond",
      "Fixed factory colour — cannot easily be repainted on site — same colour-matching limitation as all Colorbond products",
      "Dissimilar metal contact — same precautions apply as for Lysaght — do not use copper fixings or allow copper contact",
      "Confirm current product specifications, gauge availability, and colour range with the local Stramit branch before ordering",
      "Not suitable for complex curved or heritage profiles requiring hand-forming — lead is the appropriate material for those applications",
    ],
    procurementSources: [
      { name: "Stramit — trade supply and branch network", url: "https://www.stramit.com.au" },
      { name: "Stratco — roofing sheet metal", url: "https://www.stratco.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Colorbond", label: "Colorbond" },
  { id: "Pre-painted", label: "Pre-painted" },
  { id: "Step-flashing", label: "Step flashing" },
  { id: "Counter-flashing", label: "Counter-flashing" },
  { id: "Standard", label: "Standard specification" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  colourOptions: string;
  customForming: string;
  corrosionResistance: string;
}[] = [
  {
    product: "Lysaght/BlueScope Colorbond Step Flashing",
    brand: "BlueScope / Lysaght",
    colourOptions: "Full standard Colorbond range — confirm current colours",
    customForming: "Site-formed by roofer or pre-formed by fabricator",
    corrosionResistance: "Excellent — Colorbond factory paint system over Zincalume substrate",
  },
  {
    product: "Stramit Colorbond Step Flashing",
    brand: "Stramit",
    colourOptions: "Full standard Colorbond range — confirm current colours",
    customForming: "Site-formed from Colorbond coil by roofer",
    corrosionResistance: "Excellent — same Colorbond factory paint system",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Step flashings at the junction between a masonry wall (brick, render, or block) and a pitched tiled roof — the most common application for Colorbond step flashing in Australian residential construction",
    "Counter-flashings fixed into raked mortar joints at masonry abutments — laps over the step flashing below and is fixed into the wall joint with lead wedges or mortar",
    "Apron flashings at the base of masonry chimneys and parapet walls on tiled roofs",
    "Remedial replacement of corroded, failed, or missing step flashings on existing tiled roofs — particularly strata buildings with parapet walls and masonry abutments",
    "New step and counter-flashing installations on tiled roof extensions, additions, and alterations",
  ],
  selectionCriteria: [
    "Colorbond is the most common and standard step flashing material for pitched tiled roofs in Australia — specify unless there is a heritage reason to use lead or a specific requirement for aluminium",
    "Colour match — select the Colorbond colour that most closely matches the roof tile colour or wall cladding — confirm colour range with BlueScope/Stramit before ordering",
    "Soaker vs continuous step flashing — tile profile determines whether individual soakers or a continuous step flashing is appropriate — confirm with tile manufacturer",
    "Counter-flashing into mortar joint — ensure mortar joint is raked to minimum 25mm depth and pointed on completion — this is critical to the watertight performance of the system",
    "Lap requirements — minimum lap between step flashing and counter-flashing must comply with tile manufacturer requirements and AS 1562.1",
    "Fixings — use stainless steel screws and Colorbond-compatible clips — never plain steel (galvanic corrosion) or copper (galvanic incompatibility with Colorbond)",
  ],
  limitations: [
    "Not suitable for complex or intricate profiles on heritage buildings where lead hand-forming is required — use lead sheet for those applications",
    "Cannot be repainted on site to an exact colour match — if colour matching to a non-standard tile or wall colour is critical, consider a custom powder-coated aluminium fabrication instead",
    "Galvanic incompatibility with copper — never use copper fixings or allow contact with copper flashings or gutters",
    "Does not self-seal at overlaps like lead — laps must be correctly dimensioned and directed to shed water — sealant is sometimes applied at laps in remedial work but is not a substitute for correct lap geometry",
    "Counter-flashing performance is dependent on the quality of the mortar joint rake and pointing — do not allow the counter-flashing to be installed into an unraked or poorly pointed joint",
  ],
  standardsNotes: [
    "AS 1562.1 — Design and Installation of Sheet Roof and Wall Cladding — Metal — governs step and counter-flashing design and minimum lap requirements",
    "Tile manufacturer installation guides — most major tile manufacturers (Bristile, Monier, CSR Roofing) publish specific step flashing requirements for their tile profiles — always confirm",
    "NCC Volume Two — Performance requirements for roof drainage and weather-tightness in Class 1 and 10 buildings — applicable to residential remediation work",
    "BlueScope Colorbond product warranty — Colorbond steel is warranted by BlueScope — confirm current warranty conditions before specifying",
  ],
  suitableDefects: [
    "Roof leaks at masonry wall abutments — step flashing failure (missing, corroded, dislodged, or poorly lapped flashings) — most common source of roof leaks at wall junctions",
    "Roof leaks at chimney abutments — step and counter-flashing replacement around masonry chimneys on pitched tiled roofs",
    "Water ingress at parapet wall / roof junctions on strata buildings — step counter-flashing remediation",
  ],
  typicalSubstrates: [
    "Masonry walls — brick, concrete block, rendered masonry — counter-flashing fixed into raked mortar joint",
    "Tiled roof — terracotta, concrete, or slate tiles — step flashing weaves between tiles or sits under tile course",
    "Timber fascia and barge board at gable ends — apron flashings",
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

export function StepFlashingColorbondIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are Colorbond step and counter-flashings?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Colorbond step and counter-flashings are pre-painted BlueScope steel flashings used at the junction between a pitched tiled roof and a masonry wall or chimney. The step flashing weaves between the tiles and the wall — either as individual soakers under each tile course, or as a continuous step flashing bent to follow the tile profile. The counter-flashing laps over the top of the step flashing and is fixed into a raked mortar joint in the masonry wall. Together, they form a two-part weathertight system that accommodates minor differential movement between the roof and the wall.
        </p>
        {expanded && (
          <>
            <p>
              Colorbond is the most commonly specified step flashing material for Australian residential pitched tiled roof construction. The factory-applied pre-painted finish provides corrosion resistance and colour matching to the tile and wall colour without requiring site painting. Colorbond step flashings are site-formed by the roofing contractor from coil or flat sheet stock using a sheet metal folder, or can be supplied pre-formed to a specified profile by a roofing sheet metal fabricator. The two principal suppliers of Colorbond for this application are BlueScope/Lysaght and Stramit — both supply from the same BlueScope Colorbond steel base material.
            </p>
            <p>
              Product selection for step flashings should consider the tile profile (which determines the soaker or continuous step geometry), the Colorbond colour (matched to the tile or wall colour), the mortar joint depth and type for the counter-flashing, and the fixing method. All work must comply with tile manufacturer installation requirements and AS 1562.1.
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

export function StepFlashingColorbondProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">2 products — 2 brands — Colorbond steel step and counter-flashing — scroll to view all</p>
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
              Side-by-side comparison of Colorbond steel step and counter-flashing products. Confirm all product selections against the current manufacturer data before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Colour options</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Custom forming</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Corrosion resistance</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.colourOptions}</td>
                  <td className="px-4 py-3 text-slate-600">{row.customForming}</td>
                  <td className="px-4 py-3 text-slate-600">{row.corrosionResistance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
