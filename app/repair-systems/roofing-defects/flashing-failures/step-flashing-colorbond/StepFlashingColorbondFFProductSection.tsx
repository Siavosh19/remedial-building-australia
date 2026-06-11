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
  | "Wall-abutment"
  | "BlueScope"
  | "Stramit";

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
    fullLabel: "Lysaght / BlueScope Steel",
    brandUrl: "https://www.lysaght.com",
    accentColor: "#0369a1",
    name: "Lysaght/BlueScope Colorbond Step Flashing",
    descriptionLine: "Factory-pre-painted Colorbond steel step and soaker flashing — site-formed by roofer — standard for all stepped wall-to-roof abutment flashing repairs on tiled roofs — full BlueScope Colorbond colour range",
    productType: "Pre-painted Colorbond steel step flashing — AS 1562.1 — BlueScope Colorbond",
    filterTags: ["Colorbond", "Pre-painted", "Step-flashing", "Wall-abutment", "BlueScope"],
    techChips: [
      { label: "Pre-painted Colorbond", cls: "bg-sky-100 text-sky-800" },
      { label: "BlueScope colour range", cls: "bg-slate-100 text-slate-700" },
      { label: "Site-formed", cls: "bg-green-50 text-green-700" },
      { label: "AS 1562.1 compliant", cls: "bg-slate-100 text-slate-700" },
      { label: "Wall-to-roof abutment", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Lysaght/BlueScope Colorbond step flashing is the standard specification for stepped wall-to-roof abutment flashing repairs on tiled pitched roofs across Australian residential and strata buildings. The Colorbond steel is factory-pre-painted in BlueScope's full Colorbond colour range, allowing the roofer to match the existing roof colour or specify a contrasting colour where required by the client or strata committee. The flashing material is supplied as flat coil or pre-cut strip and is site-formed by the licensed roof plumber using a brake press or hand folder to match the required step profile and tile gauge. The step flashing seats under each tile course and laps up the wall or parapet, with soaker flashings interlaced between tiles at the wall junction. The step profile and minimum upstand dimensions are governed by AS 1562.1 and the tile manufacturer's installation requirements — confirm both before cutting and forming. BlueScope Colorbond is the industry benchmark for pre-painted steel step flashing in Australia. The steel substrate provides good resistance to thermal movement and mechanical damage during installation. Colour durability is governed by BlueScope's Colorbond warranty conditions. Confirm current colour availability and lead time with Lysaght or BlueScope trade supply before ordering for strata projects where specific colour matching is required.",
    technicalProperties: [
      "Factory-pre-painted Colorbond steel — full BlueScope Colorbond colour range — colour-matched to existing roof",
      "Site-formed by licensed roof plumber — brake press or hand folder — profile matches tile gauge and wall profile",
      "Step and soaker detail — step flashing under each tile course, soakers interlaced between tiles at wall junction",
      "AS 1562.1 compliant — minimum upstand and lap dimensions per standard and tile manufacturer requirements",
      "Steel substrate — good resistance to thermal movement and mechanical damage during installation",
      "Available as flat coil or pre-cut strip from BlueScope/Lysaght trade supply and metal roofing suppliers",
      "Widely stocked by roofing trade suppliers nationally — confirm colour and thickness availability before ordering",
    ],
    limitations: [
      "Step profile and minimum upstand dimensions must comply with AS 1562.1 and the tile manufacturer's installation guide — confirm before forming",
      "Galvanic corrosion risk where Colorbond steel contacts copper or lead — confirm compatibility and use isolating tape or sleeve where copper pipe penetrations are present near the flashing",
      "Pre-painted coating is not site-repairable with Colorbond paint — damaged or scratched areas must be touched up with an approved touch-up product or the flashing replaced",
      "Colour matching on aged roofs may not be exact — Colorbond colours change in appearance with weathering — confirm colour selection with client before ordering",
      "Not suitable for heritage buildings or applications where lead step flashing is required by heritage authority — lead is listed separately on the Chimney — lead page",
      "Confirm current colour availability and lead time with Lysaght or BlueScope trade supply before ordering for strata projects",
    ],
    procurementSources: [
      { name: "Lysaght — trade supply", url: "https://www.lysaght.com" },
      { name: "BlueScope Steel — trade supply", url: "https://www.bluescopesteel.com.au" },
      { name: "Steel & Tube Roofing", url: "https://www.steelandtube.com.au" },
      { name: "Fielders / Metroll — roofing trade supply", url: "https://www.fielders.com.au" },
    ],
  },
  {
    fullLabel: "Stramit Corporation",
    brandUrl: "https://www.stramit.com.au",
    accentColor: "#7c3aed",
    name: "Stramit Colorbond Step Flashing",
    descriptionLine: "Stramit Colorbond step flashing — formed from Colorbond coil — alternative to BlueScope/Lysaght for step and soaker flashing at wall-to-roof abutments on tiled pitched roofs",
    productType: "Pre-painted Colorbond steel step flashing — Stramit — AS 1562.1",
    filterTags: ["Colorbond", "Pre-painted", "Step-flashing", "Wall-abutment", "Stramit"],
    techChips: [
      { label: "Colorbond steel", cls: "bg-violet-100 text-violet-800" },
      { label: "Stramit — alternative supplier", cls: "bg-slate-100 text-slate-700" },
      { label: "Site-formed", cls: "bg-green-50 text-green-700" },
      { label: "AS 1562.1 compliant", cls: "bg-slate-100 text-slate-700" },
      { label: "Wall-to-roof abutment", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Stramit Colorbond step flashing is formed from Colorbond coil and provides an alternative supply channel to BlueScope/Lysaght for step and soaker flashing at wall-to-roof abutment junctions on tiled pitched roofs. Stramit is a major Australian roll-forming and steel products manufacturer and distributor with broad national trade supply coverage. The Colorbond steel is factory-pre-painted and is available in standard Colorbond colours. Step flashing is site-formed by the licensed roof plumber in the same manner as BlueScope/Lysaght product — flat coil or pre-cut strip is brake-pressed or hand-folded on site to match the required step profile and tile gauge. AS 1562.1 and tile manufacturer installation requirements apply equally to all Colorbond step flashing regardless of brand — minimum upstand, step height, soaker lap dimensions, and fixings must all comply. Stramit product may offer competitive pricing or better regional availability compared to BlueScope/Lysaght depending on the project location. Confirm current colour range, available thicknesses, and regional stock with Stramit trade supply before ordering.",
    technicalProperties: [
      "Colorbond steel — factory-pre-painted — standard Colorbond colour range",
      "Alternative supply channel to BlueScope/Lysaght — Stramit national trade supply network",
      "Site-formed by licensed roof plumber — same forming method as BlueScope/Lysaght product",
      "AS 1562.1 compliant — minimum upstand and lap dimensions per standard and tile manufacturer requirements",
      "Available as flat coil or pre-cut strip from Stramit trade supply",
      "Confirm current colour range and regional stock with Stramit trade supply before ordering",
    ],
    limitations: [
      "Confirm current Colorbond colour range with Stramit — may differ from BlueScope/Lysaght range in specific colours or finishes",
      "Same galvanic corrosion risk as BlueScope/Lysaght where Colorbond steel contacts copper or lead — confirm compatibility",
      "Step profile and upstand dimensions must comply with AS 1562.1 and tile manufacturer requirements — no difference to BlueScope/Lysaght product",
      "Not suitable for heritage buildings where lead flashing is required",
      "Confirm current product availability, colour range, thicknesses, and regional stock with Stramit before ordering",
    ],
    procurementSources: [
      { name: "Stramit Corporation — trade supply", url: "https://www.stramit.com.au" },
      { name: "Fielders — trade supply", url: "https://www.fielders.com.au" },
      { name: "Steel & Tube Roofing", url: "https://www.steelandtube.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Colorbond", label: "Colorbond" },
  { id: "Pre-painted", label: "Pre-painted" },
  { id: "Step-flashing", label: "Step flashing" },
  { id: "Wall-abutment", label: "Wall abutment" },
  { id: "BlueScope", label: "BlueScope" },
  { id: "Stramit", label: "Stramit" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  material: string;
  painted: string;
  colourRange: string;
  forming: string;
  standard: string;
  primaryUse: string;
}[] = [
  {
    product: "Colorbond Step Flashing",
    brand: "Lysaght / BlueScope",
    material: "Colorbond steel",
    painted: "Factory pre-painted",
    colourRange: "Full BlueScope Colorbond range",
    forming: "Site-formed — brake press or hand folder",
    standard: "AS 1562.1",
    primaryUse: "Step and soaker flashing at wall-to-roof abutments — tiled pitched roofs",
  },
  {
    product: "Colorbond Step Flashing",
    brand: "Stramit",
    material: "Colorbond steel",
    painted: "Factory pre-painted",
    colourRange: "Standard Colorbond colours — confirm range with Stramit",
    forming: "Site-formed — brake press or hand folder",
    standard: "AS 1562.1",
    primaryUse: "Step and soaker flashing at wall-to-roof abutments — alternative supply channel",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Step flashing repair at brick veneer wall-to-roof abutment junctions where original lead or poorly formed Colorbond flashings have failed",
    "New step flashing installation following tile replacement where existing flashings have been disturbed or are beyond service life",
    "Soaker and step flashing remediation at parapet-to-roof junctions on Class 2 strata buildings",
    "Replacement of corroded or mechanically damaged step flashings in residential and strata roofing remediation",
    "Step flashing upgrade where original flashings do not comply with current AS 1562.1 minimum upstand requirements",
  ],
  selectionCriteria: [
    "Colour selection — match existing Colorbond colour on roof as closely as possible — confirm colour against current BlueScope or Stramit colour range",
    "Thickness selection — confirm minimum metal thickness from AS 1562.1 and tile manufacturer requirements — typically 0.42mm BMT minimum for Colorbond step flashing",
    "Wall construction — confirm flashing profile suits wall construction (brick veneer, rendered masonry, fibre cement cladding) — counterflashing or cap flashing method may differ",
    "Tile gauge — step height of the flashing must match the tile gauge — confirm with tile manufacturer installation guide",
    "Soaker dimensions — minimum soaker lap, length, and upstand dimensions must comply with AS 1562.1",
    "Fixings — confirm fixing type and spacing — stainless steel screws or nails required to avoid galvanic corrosion of Colorbond steel",
  ],
  limitations: [
    "Not suitable for heritage buildings or applications where lead step flashing is specified by heritage authority",
    "Not suitable where the tile gauge or wall profile prevents correct step flashing formation — custom fabrication may be required",
    "Colorbond step flashing is not a liquid-applied or sealant product — it is a formed metal flashing — do not confuse with flashing compounds or sealants",
    "Do not use aluminium fixings with Colorbond steel flashings — galvanic corrosion will result — use stainless steel fixings",
    "Do not assume all Colorbond colours are stocked by all suppliers — confirm colour availability and lead time before ordering",
  ],
  standardsNotes: [
    "AS 1562.1 — Design and Installation of Sheet Roof and Wall Cladding — Metal — minimum upstand, lap, and fixing requirements for step flashing",
    "Tile manufacturer installation guides — step height and soaker dimensions must comply with the specific tile manufacturer's requirements — AS 1562.1 sets minimums only",
    "NCC / BCA — roofing and flashing requirements for Class 1 and Class 2 buildings",
    "BlueScope Colorbond warranty conditions — confirm warranty terms for colour and coating durability before specifying",
  ],
  suitableDefects: [
    "Flashing failures — step flashing at wall-to-roof abutment — failed, corroded, or missing step flashings causing roof leaks",
    "Roof leaks — pitched tiled roof — where step flashing failure is the identified cause of water ingress",
    "Strata apartment building roof remediation — step flashing at parapet or wall abutment failure",
  ],
  typicalSubstrates: [
    "Brick veneer external wall — standard wall construction for stepped flashing at parapet or wall junction",
    "Rendered masonry — confirm counter-flashing or cap flashing detail at top of step flashing upstand",
    "Fibre cement cladding — confirm fixing and sealing requirements at wall-flashing junction",
    "Tiled pitched roof — all standard tile profiles — terracotta, concrete, and slate",
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

export function StepFlashingColorbondFFIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are Colorbond steel step flashing systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Colorbond steel step flashings are factory-pre-painted steel flashings formed on site by a licensed roof plumber to seat under successive tile courses and lap up a wall or parapet face at a stepped wall-to-roof abutment junction. The step-and-soaker detail is the standard method for waterproofing the junction between a tiled pitched roof and an adjacent vertical wall or parapet on Australian residential and strata buildings.
        </p>
        {expanded && (
          <>
            <p>
              Colorbond steel is the most common material for new and replacement step flashings in contemporary Australian roofing. It is pre-painted in BlueScope's Colorbond colour range, allowing colour matching to existing roof tiles and gutters. The material is rigid enough to maintain its formed profile under installation and wind loads, and the factory paint coating provides durable UV and weathering resistance without requiring site painting.
            </p>
            <p>
              Step flashing design must comply with AS 1562.1 and the specific tile manufacturer's installation guide. The step height must match the tile gauge, the soaker must have the correct upstand and lap dimensions, and counter-flashing or cap flashing at the top of the upstand must seal the flashing to the wall face. Fixings must be stainless steel to prevent galvanic corrosion of the Colorbond steel substrate.
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

export function StepFlashingColorbondFFProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">2 products — 2 brands — Colorbond steel step flashing systems only — scroll to view all</p>
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
              Side-by-side comparison of Colorbond steel step flashing systems. Confirm all product selections against the current manufacturer data before specifying.
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
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Painted</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Colour range</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Forming method</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Standard</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.brand} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.painted}</td>
                  <td className="px-4 py-3 text-slate-600">{row.colourRange}</td>
                  <td className="px-4 py-3 text-slate-600">{row.forming}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.standard}</td>
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
