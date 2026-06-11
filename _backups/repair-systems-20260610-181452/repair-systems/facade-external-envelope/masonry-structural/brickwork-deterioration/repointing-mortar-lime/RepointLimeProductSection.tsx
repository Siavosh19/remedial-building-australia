"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "NHL-3.5"
  | "NHL-5.0"
  | "Lime-putty"
  | "Lime-mortar"
  | "Heritage"
  | "Breathable"
  | "AS-3700"
  | "Soft-brick"
  | "External"
  | "Pre-mixed";

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
    fullLabel: "Baumit / Parex / Specialist supplier",
    brandUrl: "https://www.baumit.com.au",
    accentColor: "#0369a1",
    name: "Natural hydraulic lime mortar — NHL 3.5",
    descriptionLine: "NHL 3.5 (feebly hydraulic) natural lime repointing mortar — breathable, soft, flexible — for heritage and historic soft brick masonry on Class 2 facades",
    productType: "Natural hydraulic lime repointing mortar — NHL 3.5 — heritage masonry",
    filterTags: ["NHL-3.5", "Lime-mortar", "Heritage", "Breathable", "AS-3700", "Soft-brick", "External"],
    techChips: [
      { label: "NHL 3.5 binder", cls: "bg-sky-100 text-sky-800" },
      { label: "Breathable", cls: "bg-green-50 text-green-700" },
      { label: "Heritage masonry", cls: "bg-amber-50 text-amber-700" },
      { label: "2–7 MPa", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 3700", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "NHL 3.5 natural hydraulic lime mortar for repointing soft, historic and heritage brickwork on Class 2 buildings. NHL 3.5 (feebly hydraulic) produces a relatively soft, flexible, breathable mortar suitable for pointing worn or mechanically weak historic brickwork where original lime mortars were used. The mortar must be weaker in compressive strength than the brick leaf — typically 2–7 MPa — so that any thermal or structural movement causes the mortar to fail before spalling the brick face. Rake out joints to a minimum 15mm depth, clean all dust with compressed air, and dampen the joint with clean water before applying mortar to prevent rapid suction drawing moisture out of the fresh mix. Apply in layers not exceeding 10mm per pass, compact each layer firmly with a pointing iron, and finish the joint face flush with or slightly recessed from the brick face. Protect fresh mortar from rain for 24 hours and from frost for 7 days. Confirm exact NHL grade to match the compressive strength of the original mortar — consult a heritage specialist before specifying. TODO: owner confirm — confirm supplier and current product range available in your state before specifying.",
    technicalProperties: [
      "NHL 3.5 binder — feebly hydraulic — compressive strength 2–7 MPa — weaker than most historic brick units",
      "High vapour permeability — breathable — allows moisture within masonry to escape without trapping damp behind the joint face",
      "Flexible mortar — accommodates minor thermal and structural movement without transmitting stress to adjacent brick arrises",
      "Reversible — compatible with re-repointing without damage; traditional material for pre-1920s construction",
      "Minimum 15mm raking depth before application — shallow joints allow mortar to pop out under thermal cycling",
      "Moist curing required for 3–7 days after application — protect from rapid drying, frost and rain",
      "Confirm NHL grade and aggregate type with heritage specialist before specifying — mix must match original mortar compressive strength",
    ],
    limitations: [
      "Lower compressive strength than cement mortars — not suitable for high-load structural joints or hard, modern engineering brick",
      "Longer cure time than cement mortar — requires protection from rain and frost for 3–7 days after application",
      "Moisture-sensitive during cure — application in rain or sub-5°C temperatures will impair strength gain",
      "Colour and texture must be matched to original mortar — available in limited standard colours; custom blending may be required",
      "TODO: owner confirm — confirm supplier and current product range available in your state before specifying",
    ],
    procurementSources: [
      { name: "Baumit Australia — trade supply", url: "https://www.baumit.com.au" },
      { name: "Parex Australia — lime mortar range", url: "https://www.parex.com.au" },
      { name: "Heritage lime specialist supplier — confirm state availability", url: "https://www.baumit.com.au" },
    ],
  },
  {
    fullLabel: "Parex / Limemortar.com.au / Specialist supplier",
    brandUrl: "https://www.parex.com.au",
    accentColor: "#b45309",
    name: "Natural hydraulic lime mortar — NHL 5.0",
    descriptionLine: "NHL 5.0 (eminently hydraulic) natural lime repointing mortar — stronger than NHL 3.5 — for exposed parapets and moderately hard historic brick on Class 2 facades",
    productType: "Natural hydraulic lime repointing mortar — NHL 5.0 — exposed masonry",
    filterTags: ["NHL-5.0", "Lime-mortar", "Heritage", "Breathable", "AS-3700", "External", "Pre-mixed"],
    techChips: [
      { label: "NHL 5.0 binder", cls: "bg-amber-100 text-amber-800" },
      { label: "Breathable", cls: "bg-green-50 text-green-700" },
      { label: "Exposed parapets", cls: "bg-slate-100 text-slate-700" },
      { label: "5–15 MPa", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 3700", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "NHL 5.0 natural hydraulic lime mortar for repointing moderately hard historic brickwork on Class 2 buildings in exposed locations. NHL 5.0 (eminently hydraulic) is the strongest NHL grade, producing a mortar approaching the compressive strength of early OPC mortars — used for exposed parapets and hard-burnt historic brick where NHL 3.5 would be too weak but full cement mortar would be too rigid and non-breathable. Pre-mixed formulations are available for consistent mix proportions and reduced site error. Confirm NHL grade matches the existing brick compressive strength before specifying — a harder mortar than the brick will cause brick face spalling under thermal movement. Same joint preparation and curing requirements as NHL 3.5: rake to minimum 15mm depth, clean, dampen, apply in layers, moist-cure 3–7 days. Aggregate colour and type must be matched to the original mortar — confirm aggregate selection with heritage specialist before ordering. TODO: owner confirm — confirm current supplier availability and match aggregate type to existing mortar colour before ordering.",
    technicalProperties: [
      "NHL 5.0 binder — eminently hydraulic — compressive strength 5–15 MPa — stronger than NHL 3.5 but still breathable",
      "Moderate–high vapour permeability — better breathability than Portland cement mortar; suitable for damp masonry remediation",
      "Better freeze-thaw resistance than NHL 3.5 — suitable for southern states with regular frost events",
      "Pre-mixed formulations available — consistent mix proportions and reduced site mixing errors compared to site-gauged lime",
      "Suitable for exposed parapets and wind-driven rain environments where NHL 3.5 would erode",
      "Still softer than cement mortar — mortar fails before the brick under movement stress, protecting historic masonry",
      "Confirm NH 5.0 grade is appropriate for the brick compressive strength with a heritage specialist before specifying",
    ],
    limitations: [
      "Harder than NHL 3.5 — can cause spalling of very soft or mechanically weak historic brick if over-specified",
      "Still softer than cement mortar — not suitable for joints in highly loaded structural masonry without engineer confirmation",
      "Requires thorough joint raking to minimum 15mm depth — shallow joints will allow mortar to pop out under thermal movement",
      "Colour matching to original mortar requires aggregate selection — confirm aggregate colour with heritage specialist",
      "TODO: owner confirm — confirm current supplier availability and match aggregate type to existing mortar colour before ordering",
    ],
    procurementSources: [
      { name: "Parex Australia — lime mortar range", url: "https://www.parex.com.au" },
      { name: "Limemortar.com.au — specialist lime supplier", url: "https://www.limemortar.com.au" },
      { name: "Heritage specialist lime suppliers — confirm state availability", url: "https://www.parex.com.au" },
    ],
  },
  {
    fullLabel: "Custom site-mixed / Heritage lime supplier",
    brandUrl: "https://www.limemortar.com.au",
    accentColor: "#be123c",
    name: "Lime putty repointing mortar — gauged mix",
    descriptionLine: "Slaked lime putty gauged with fine aggregate — 1:2.5 to 1:3 lime putty to sand by volume — for very soft and friable historic masonry on heritage Class 2 buildings",
    productType: "Lime putty gauged repointing mortar — heritage specialist — pre-1920s construction",
    filterTags: ["Lime-putty", "Lime-mortar", "Heritage", "Breathable", "Soft-brick", "External"],
    techChips: [
      { label: "Lime putty binder", cls: "bg-rose-100 text-rose-800" },
      { label: "Softest available", cls: "bg-green-50 text-green-700" },
      { label: "Very high breathability", cls: "bg-slate-100 text-slate-700" },
      { label: "0.5–2.5 MPa", cls: "bg-slate-100 text-slate-700" },
      { label: "Heritage specialist", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Slaked lime putty gauged with fine aggregate for repointing very soft and friable historic masonry on Class 2 heritage buildings — typically a 1:2.5 or 1:3 lime putty to sharp washed sand ratio by volume. Lime putty mortars are completely non-hydraulic and are the softest and most breathable option available — reserved for very soft, mechanically weak historic brick or sandstone where any hydraulic binder would cause damage. The mix must be confirmed by a heritage specialist — there is no standard off-the-shelf specification for lime putty repointing on heritage fabric. Lime putty must be allowed to stand (slake) for at least 24 hours after mixing with aggregate before use to improve workability and strength. Apply in layers not exceeding 10mm per pass, keep mortar moist during cure, and protect from rain wash-out for several weeks. Initial strength development through carbonation takes weeks to months. Mix proportions, aggregate grading, and curing programme must all be confirmed with a heritage specialist before commencing work. TODO: owner confirm — lime putty gauged mortars require heritage specialist specification; confirm mix proportions and aggregate source before commencing work.",
    technicalProperties: [
      "Lime putty binder — non-hydraulic — compressive strength 0.5–2.5 MPa — softest available repointing material",
      "Very high vapour permeability — maximum breathability — critical for managing rising or lateral damp in lime-mortar masonry",
      "Softest available mortar system — will not cause spalling of even the weakest historic brick or sandstone",
      "Completely reversible and re-repointing-compatible — traditional material matched to pre-1920s construction",
      "Can be colour-matched precisely by varying aggregate type and sand source",
      "Strength gain by carbonation only — initial strength takes weeks to months to develop; requires moist curing and protection",
      "Mix proportions must be designed by a heritage specialist — not a standard product",
    ],
    limitations: [
      "Lowest compressive strength of all repointing options — not suitable for high-exposure, wind-driven rain locations without hydraulic additive",
      "Longest cure time — initial strength takes weeks to months to develop via carbonation; fresh mortar must be kept moist and protected",
      "Requires experienced lime work contractor — poor mixing proportions or aggregate selection will compromise strength and durability",
      "Mix proportions must be designed by a heritage specialist — there is no standard off the shelf mix for heritage lime putty repointing",
      "TODO: owner confirm — lime putty gauged mortars require heritage specialist specification; confirm mix proportions and aggregate source before commencing work",
    ],
    procurementSources: [
      { name: "Limemortar.com.au — specialist lime supplier", url: "https://www.limemortar.com.au" },
      { name: "Remmers Australia — heritage masonry products", url: "https://www.remmers.com.au" },
      { name: "Local heritage lime supplier — confirm state availability", url: "https://www.limemortar.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "NHL-3.5", label: "NHL 3.5" },
  { id: "NHL-5.0", label: "NHL 5.0" },
  { id: "Lime-putty", label: "Lime putty" },
  { id: "Lime-mortar", label: "Lime mortar" },
  { id: "Heritage", label: "Heritage" },
  { id: "Breathable", label: "Breathable" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "Soft-brick", label: "Soft brick" },
  { id: "External", label: "External" },
  { id: "Pre-mixed", label: "Pre-mixed" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  binder: string;
  strength: string;
  breathable: string;
  heritage: string;
  substrate: string;
  primaryUse: string;
}[] = [
  {
    product: "NHL 3.5 mortar",
    brand: "Baumit / Parex",
    binder: "NHL 3.5",
    strength: "2–7 MPa",
    breathable: "High",
    heritage: "Yes",
    substrate: "Soft historic brick",
    primaryUse: "Standard heritage repointing",
  },
  {
    product: "NHL 5.0 mortar",
    brand: "Parex / Specialist",
    binder: "NHL 5.0",
    strength: "5–15 MPa",
    breathable: "Moderate–high",
    heritage: "Yes",
    substrate: "Moderately hard brick",
    primaryUse: "Exposed / parapet repointing",
  },
  {
    product: "Lime putty gauged",
    brand: "Site-mixed / Heritage supplier",
    binder: "Lime putty",
    strength: "0.5–2.5 MPa",
    breathable: "Very high",
    heritage: "Yes (specialist)",
    substrate: "Softest historic brick",
    primaryUse: "Pre-1930s lime masonry",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Repointing deteriorated or failed mortar joints in heritage and historic clay brick facades on Class 2 strata buildings where the original masonry was built with lime mortar",
    "Repointing soft, porous or friable historic brick, sandstone or limestone masonry where cement mortar would damage or trap moisture in the substrate",
    "Repointing heritage brickwork in conservation areas or under heritage orders where material compatibility with original lime mortar is required",
    "Restoration of mortar joints in pre-1930 brick construction following brick cleaning or facade investigation works",
    "Repointing at parapets, exposed piers and wind-driven rain zones on heritage buildings using NHL 5.0 for greater strength",
  ],
  selectionCriteria: [
    "Confirm NHL grade to match original mortar strength — NHL 3.5 for soft brick, NHL 5.0 for harder brick, lime putty for very soft or friable masonry — match strength to the weakest element (usually the brick face)",
    "Confirm mortar is softer than the brick unit — hard mortar on soft historic brick causes brick face spalling under thermal movement",
    "Confirm aggregate type and grading to match original mortar colour and texture — a heritage specialist must be consulted for significant heritage work",
    "Minimum 15mm raking depth before application — shallow joints allow the repointing mortar to pop out under thermal cycling",
    "Moist-cure NHL mortars for 3–7 days — protect from rapid drying, frost and rain during the initial cure period",
    "Commission a trial panel on the building before proceeding with full repointing scope — view in wet and dry conditions before approving",
  ],
  limitations: [
    "Never use Portland cement mortar on soft, historic, or lime-mortar masonry — causes brick face spalling and moisture trapping in damp masonry",
    "Do not repoint over existing movement joints — movement joints must be raked out and resealed with polyurethane or silicone, not mortar",
    "Lime mortars gain strength slowly — do not expose to frost, rain or mechanical loading within the cure period (3–7 days minimum for NHL; weeks for lime putty)",
    "Lime putty mortars require a heritage specialist specification — do not attempt to specify lime putty mix proportions without expert input",
    "Do not apply in temperatures below 5°C or when frost is forecast within 7 days",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — primary Australian standard for mortar proportions and designations — confirm NHL mortar designation requirements for the specific application",
    "Heritage New South Wales, Heritage Victoria, and equivalent state heritage bodies publish guidance on mortar specification for heritage buildings — confirm applicable guidance before specifying",
    "ICOMOS conservation principles — material compatibility and reversibility principles apply to all heritage masonry repointing work",
    "BS EN 459 — Building Lime — the primary European standard for natural hydraulic lime products — confirm NHL grade classification from the product TDS",
    "Manufacturer application guides — joint preparation, mortar consistency, application method, curing protection, and protection period are all critical to durability",
  ],
  suitableDefects: [
    "Deteriorated, eroded or failed lime mortar joints in historic and heritage masonry where the original mortar was lime-based",
    "Mortar joint failure caused by salt crystallisation within the joint — after substrate treatment, compatible lime mortar must be used to allow the wall to breathe and manage salt migration",
    "Failed repointing work where an incompatible cement mortar was previously installed and has been removed — restore with matching lime mortar",
    "Open or raked joints following brick or stone cleaning works on heritage masonry",
    "Partial or full repointing on heritage facades following remedial investigation or structural repair works",
  ],
  typicalSubstrates: [
    "Soft historic fired clay brick — pre-1920s construction — where original mortar was lime-based and the brick face is relatively soft and porous",
    "Sandstone and limestone masonry — confirm mortar strength does not exceed substrate compressive strength",
    "Friable or weathered historic brick — where any hydraulic binder would cause the brick face to spall under differential thermal movement",
    "Tuckpointed heritage joints — where the original fine ribbon lime putty pointing must be reinstated",
    "NOT suitable: modern hard-burnt engineering brick or concrete masonry — specify cement mortar for these substrates",
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

export function RepointLimeIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are lime mortar repointing systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Lime mortar repointing systems use natural hydraulic lime (NHL) or lime putty mortars to replace deteriorated or failed mortar joints in historic and heritage masonry on Australian Class 2 strata buildings. Lime mortars are specified where the original masonry was built with lime mortar — substituting Portland cement mortar in lime-mortar masonry will trap moisture, cause salt damage and spall brick faces.
        </p>
        {expanded && (
          <>
            <p>
              The correct NHL grade and aggregate must be confirmed against the specific brick type and original mortar compressive strength — a heritage specialist should be consulted for all significant heritage work. The fundamental rule is that the mortar must be softer than the masonry unit: NHL 3.5 for soft brick, NHL 5.0 for harder brick and exposed locations, and lime putty gauged mortar for very soft or friable pre-1920s historic masonry.
            </p>
            <p>
              Minimum joint raking depth of 15mm is essential — shallow joints allow the repointing mortar to pop out under thermal cycling. Lime mortars require moist curing for 3–7 days and must be protected from frost, rain and rapid drying during the cure period. Lime putty mortars gain strength only by carbonation and require much longer protection periods.
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

export function RepointLimeProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — lime mortar repointing systems — scroll to view all</p>
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
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll for more
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
              Side-by-side comparison of lime mortar repointing systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Binder</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Strength</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Breathable</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Heritage use</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Substrate</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.binder}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.strength}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.breathable}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.heritage}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.substrate}</td>
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
