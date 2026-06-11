"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Baumit"
  | "Parex"
  | "Heritage-specialist"
  | "NHL-3.5"
  | "Lime-mortar"
  | "Heritage"
  | "Breathable"
  | "AS-3700"
  | "Soft-brick"
  | "External";

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
    fullLabel: "Baumit Australia",
    brandUrl: "https://www.baumit.com.au",
    accentColor: "#0369a1",
    name: "Baumit KalkMörtel / NHL 3.5 Natural Hydraulic Lime Mortar",
    descriptionLine: "Baumit natural hydraulic lime mortar — NHL 3.5 binder — feebly hydraulic — for repointing soft and historic clay brick masonry on Class 2 facades",
    productType: "NHL 3.5 natural hydraulic lime repointing mortar — heritage masonry — Baumit",
    filterTags: ["Baumit", "NHL-3.5", "Lime-mortar", "Heritage", "Breathable", "AS-3700", "Soft-brick", "External"],
    techChips: [
      { label: "NHL 3.5 binder", cls: "bg-sky-100 text-sky-800" },
      { label: "Breathable", cls: "bg-green-50 text-green-700" },
      { label: "2–7 MPa", cls: "bg-slate-100 text-slate-700" },
      { label: "Heritage masonry", cls: "bg-amber-50 text-amber-700" },
      { label: "Baumit", cls: "bg-sky-50 text-sky-700" },
    ],
    systemDescription:
      "Baumit natural hydraulic lime mortar using NHL 3.5 binder for repointing soft, historic and heritage clay brick masonry on Class 2 strata building facades. Baumit supplies a range of pre-blended lime mortars through their Australian distributor network — confirm current product name and availability in your state before specifying. NHL 3.5 produces a soft, flexible, breathable mortar that must be weaker in compressive strength than the brick unit so that thermal movement causes the mortar to crack before spalling the brick arris. Rake out joints to minimum 15mm depth, remove dust with compressed air, and dampen the joint before application. Apply in layers not exceeding 10mm per pass, compact each layer firmly with a pointing iron, and finish flush with or slightly recessed from the brick face. Moist-cure for 3–7 days and protect from rain and frost during the cure period.",
    technicalProperties: [
      "NHL 3.5 binder — feebly hydraulic — compressive strength 2–7 MPa — softer than standard modern brick",
      "High vapour permeability — breathable — allows moisture trapped in masonry to escape without causing joint face failure",
      "Flexible mortar — accommodates minor thermal and structural movement without transmitting stress to adjacent brick arrises",
      "Pre-blended formulation from Baumit — consistent NHL grade and aggregate content reduces site mixing error",
      "Suitable for restoration of pre-1920s construction where original mortar was lime-based",
      "Minimum 15mm raking depth required — shallow joints allow the repointing to detach under thermal cycling",
      "Moist curing for 3–7 days after application — protect from rapid drying, frost and rain",
    ],
    limitations: [
      "Lower compressive strength than cement mortars — not suitable for high-load structural joints or hard, modern engineering brick",
      "Longer cure time than cement mortar — requires protection from rain and frost for 3–7 days after application",
      "Confirm current Baumit product range available in your state — distributor network varies by region",
      "Colour matching to original mortar may require custom blending — confirm standard colour range with Baumit before specifying",
      "Not suitable for repointing of modern hard-burnt engineering brick or concrete masonry units",
    ],
    procurementSources: [
      { name: "Baumit Australia — national distributor network", url: "https://www.baumit.com.au" },
      { name: "Baumit technical support — confirm product range by state", url: "https://www.baumit.com.au/en/contact" },
    ],
  },
  {
    fullLabel: "Parex Australia",
    brandUrl: "https://www.parex.com.au",
    accentColor: "#b45309",
    name: "Parex NHL 3.5 Natural Hydraulic Lime Mortar",
    descriptionLine: "Parex natural hydraulic lime mortar — NHL 3.5 grade — pre-blended, add-water-only — for repointing heritage soft brick masonry on Class 2 facades",
    productType: "NHL 3.5 natural hydraulic lime repointing mortar — heritage masonry — Parex",
    filterTags: ["Parex", "NHL-3.5", "Lime-mortar", "Heritage", "Breathable", "AS-3700", "Soft-brick", "External"],
    techChips: [
      { label: "NHL 3.5 binder", cls: "bg-amber-100 text-amber-800" },
      { label: "Breathable", cls: "bg-green-50 text-green-700" },
      { label: "2–7 MPa", cls: "bg-slate-100 text-slate-700" },
      { label: "Heritage masonry", cls: "bg-amber-50 text-amber-700" },
      { label: "Parex", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Parex natural hydraulic lime mortar — NHL 3.5 grade — for repointing soft, historic and heritage clay brick masonry on Class 2 strata buildings. Parex supplies pre-blended lime mortar products through their Australian distribution network — confirm current product code and state availability before specifying. NHL 3.5 (feebly hydraulic) produces a relatively soft, flexible, breathable mortar that must be weaker in compressive strength than the brick unit. The pre-blended formulation minimises site mixing error compared to gauged site-mixed lime mortars. Rake joints to minimum 15mm depth, clean with compressed air, dampen before application, and apply in layers not exceeding 10mm per pass. Moist-cure for 3–7 days and protect from rain, frost and direct sunlight during the cure period.",
    technicalProperties: [
      "NHL 3.5 binder — feebly hydraulic — compressive strength 2–7 MPa — confirmed softer than standard modern brick units",
      "High vapour permeability — breathable mortar — critical for management of interstitial moisture in lime-mortar masonry",
      "Pre-blended formulation — consistent NHL grade and aggregate content — reduces risk of incorrect site-batching",
      "Suitable for restoration of pre-1920s lime-mortar construction where cement mortar would cause brick face damage",
      "Reversible mortar system — can be re-repointed without damage to adjacent masonry",
      "Moist curing for 3–7 days — protect from frost, rain and rapid drying during cure",
      "Confirm aggregate colour to match original mortar — Parex offers standard colour range; custom blending may be available",
    ],
    limitations: [
      "Lower compressive strength than cement mortars — not suitable for structural load joints or hard, modern engineering brick",
      "Longer cure time than cement-based products — protect from weather for 3–7 days after application",
      "Confirm current Parex product range and availability in your state before specifying",
      "Colour matching to original mortar may require custom aggregate selection — confirm with Parex before ordering",
      "Not suitable for repointing modern hard-burnt engineering brick or concrete masonry block",
    ],
    procurementSources: [
      { name: "Parex Australia — national distributor network", url: "https://www.parex.com.au" },
      { name: "Parex technical sales — confirm product and state availability", url: "https://www.parex.com.au/contact" },
    ],
  },
  {
    fullLabel: "Heritage lime specialist supplier",
    brandUrl: "https://www.limemortar.com.au",
    accentColor: "#7c3aed",
    name: "Heritage Lime Specialist — NHL 3.5 Custom Blended Mortar",
    descriptionLine: "Specialist heritage lime supplier — NHL 3.5 custom blended repointing mortar — aggregate-matched to original mortar — for significant heritage masonry on Class 2 facades",
    productType: "NHL 3.5 natural hydraulic lime repointing mortar — heritage specialist — custom blended",
    filterTags: ["Heritage-specialist", "NHL-3.5", "Lime-mortar", "Heritage", "Breathable", "Soft-brick", "External"],
    techChips: [
      { label: "NHL 3.5 binder", cls: "bg-violet-100 text-violet-800" },
      { label: "Custom blended", cls: "bg-amber-50 text-amber-700" },
      { label: "Colour-matched", cls: "bg-green-50 text-green-700" },
      { label: "2–7 MPa", cls: "bg-slate-100 text-slate-700" },
      { label: "Heritage specialist", cls: "bg-violet-50 text-violet-700" },
    ],
    systemDescription:
      "Specialist heritage lime suppliers offer custom-blended NHL 3.5 repointing mortars where aggregate type, colour, and grading are specifically matched to the original mortar on the building. This approach is required for significant heritage buildings where standard pre-blended products will not achieve the necessary colour and texture match, or where the heritage authority requires provenance of the lime source and aggregate selection. The heritage specialist will typically analyse a sample of the original mortar, specify the NHL grade and aggregate blend, supply a test batch for on-site trial panel assessment, and provide a mixing and application specification for the works. Confirm state availability — specialist heritage lime suppliers operate in all major states but supply and lead times vary. limemortar.com.au is one Australian specialist; confirm current product range and availability before specifying.",
    technicalProperties: [
      "NHL 3.5 binder — feebly hydraulic — compressive strength 2–7 MPa — grade confirmed by specialist to match original mortar strength",
      "Custom aggregate blend — aggregate type, colour and grading specifically matched to the original mortar on the building",
      "Very high vapour permeability — maximum breathability for management of moisture in lime-mortar masonry",
      "Heritage specialist specification — mix proportions, aggregate source, and curing programme confirmed by specialist",
      "Trial panel assessment before full-scale application — critical for heritage authority approval on significant buildings",
      "Reversible and re-repointing-compatible — traditional material matched to pre-1920s construction methods",
      "Moist curing for 3–7 days — protect from frost, rain and rapid drying during cure",
    ],
    limitations: [
      "Longer lead time than standard pre-blended products — custom blending and mortar analysis adds time to procurement",
      "Higher cost than standard pre-blended NHL mortars — specialist supply and custom aggregate blending increases cost",
      "Requires experienced lime work contractor — poor mixing proportions or application will compromise durability",
      "State availability varies — confirm specialist supplier availability and lead times before commencing design",
      "Heritage authority may require specific provenance documentation for lime source and aggregate — confirm requirements before specifying",
    ],
    procurementSources: [
      { name: "Limemortar.com.au — specialist Australian lime supplier", url: "https://www.limemortar.com.au" },
      { name: "Heritage lime specialist — confirm state availability and lead time", url: "https://www.limemortar.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Baumit", label: "Baumit" },
  { id: "Parex", label: "Parex" },
  { id: "Heritage-specialist", label: "Heritage specialist" },
  { id: "NHL-3.5", label: "NHL 3.5" },
  { id: "Lime-mortar", label: "Lime mortar" },
  { id: "Heritage", label: "Heritage" },
  { id: "Breathable", label: "Breathable" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "Soft-brick", label: "Soft brick" },
  { id: "External", label: "External" },
];

const SYSTEM_COMPARISON: {
  supplier: string;
  product: string;
  distribution: string;
  nhlGrade: string;
  strength: string;
  keyFeature: string;
  primaryUse: string;
}[] = [
  {
    supplier: "Baumit Australia",
    product: "Baumit KalkMörtel / NHL 3.5",
    distribution: "National (distributor)",
    nhlGrade: "NHL 3.5",
    strength: "2–7 MPa",
    keyFeature: "Pre-blended, consistent grade",
    primaryUse: "Heritage repointing — soft brick",
  },
  {
    supplier: "Parex Australia",
    product: "Parex NHL 3.5",
    distribution: "National (distributor)",
    nhlGrade: "NHL 3.5",
    strength: "2–7 MPa",
    keyFeature: "Pre-blended, standard colour range",
    primaryUse: "Heritage repointing — soft brick",
  },
  {
    supplier: "Heritage lime specialist",
    product: "Custom blended NHL 3.5",
    distribution: "State-based (specialist)",
    nhlGrade: "NHL 3.5",
    strength: "2–7 MPa",
    keyFeature: "Aggregate colour-matched to original",
    primaryUse: "Significant heritage buildings",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Repointing deteriorated lime mortar joints in heritage and historic clay brick facades on Class 2 strata buildings where the original masonry was built with lime mortar",
    "Repointing soft, porous or friable historic brick where cement mortar would cause brick face spalling by transmitting thermal movement stress to the arris",
    "Repointing heritage brickwork in conservation areas or under heritage orders where NHL 3.5 matches the original mortar compressive strength range",
    "Restoration of mortar joints in pre-1920s brick construction following facade investigation or brick cleaning works",
    "Reinstatement of failed or eroded mortar joints in lime-mortar masonry following removal of incompatible Portland cement repointing",
  ],
  selectionCriteria: [
    "Confirm that NHL 3.5 mortar compressive strength (2–7 MPa) is appropriate for the brick unit strength — mortar must always be weaker than the brick face",
    "Confirm original mortar was lime-based before specifying — take a mortar sample for analysis or consult a heritage specialist",
    "Minimum 15mm raking depth — shallow joints allow the repointing mortar to detach under thermal cycling",
    "Moist-cure for 3–7 days after application — protect from rapid drying, frost and rain during cure",
    "Commission a trial panel on the building before proceeding with full repointing works — view in wet and dry conditions before approval",
    "Select standard Baumit or Parex pre-blended products for most heritage projects; use a specialist supplier for significant heritage buildings requiring colour-matched aggregate",
  ],
  limitations: [
    "Never use Portland cement mortar on soft, historic, or lime-mortar masonry — causes brick face spalling and moisture trapping",
    "Do not repoint over existing movement joints — movement joints must be raked out and resealed with polyurethane or silicone, not mortar",
    "Lime mortars gain strength slowly — do not expose to frost, rain or mechanical loading within the cure period (3–7 days minimum for NHL)",
    "Do not apply in temperatures below 5°C or when frost is forecast within 7 days",
    "Do not confuse NHL 3.5 with NHL 5.0 — NHL 5.0 is stronger and may damage very soft brick if over-specified",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — primary Australian standard for mortar proportions and designations",
    "BS EN 459 — Building Lime — the primary standard for natural hydraulic lime grade classification — confirm NHL 3.5 grade from product TDS",
    "Heritage state authority guidelines — Heritage NSW, Heritage Victoria, and equivalent bodies publish guidance on mortar specification for heritage buildings",
    "ICOMOS conservation principles — material compatibility and reversibility apply to all heritage masonry repointing work",
  ],
  suitableDefects: [
    "Deteriorated, eroded or failed lime mortar joints in historic and heritage masonry where the original mortar was lime-based",
    "Mortar joint failure caused by salt crystallisation — after substrate treatment, compatible lime mortar must be used to allow the wall to breathe",
    "Failed repointing where an incompatible cement mortar was previously installed and has been removed",
    "Open or raked joints following brick cleaning or facade investigation on heritage masonry",
  ],
  typicalSubstrates: [
    "Soft historic fired clay brick — pre-1920s construction — where original mortar was lime-based",
    "Friable or weathered historic brick where any hydraulic binder would cause brick face spalling under thermal movement",
    "Sandstone and limestone masonry where mortar strength must not exceed substrate compressive strength",
    "NOT suitable: modern hard-burnt engineering brick or concrete masonry — use cement mortar for these substrates",
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

export function NhlThreePointFiveMortarIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What is NHL 3.5 natural hydraulic lime repointing mortar?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Natural hydraulic lime (NHL) 3.5 repointing mortar is a feebly hydraulic lime mortar used for repointing soft, historic and heritage clay brick masonry on Class 2 strata building facades where the original mortar was lime-based. NHL 3.5 produces a soft, flexible, breathable mortar with a compressive strength of 2–7 MPa — always weaker than the brick unit, ensuring that thermal and structural movement causes the mortar to fail before spalling the brick arris.
        </p>
        {expanded && (
          <>
            <p>
              The mortar must be specified by a heritage practitioner familiar with the original building fabric. The pre-blended NHL 3.5 formulations from Baumit and Parex provide consistent grade and aggregate content, reducing site mixing error. For significant heritage buildings, a specialist supplier offering aggregate-matched custom blends is required to achieve heritage authority approval.
            </p>
            <p>
              Minimum joint raking depth is 15mm. Apply in layers not exceeding 10mm per pass, compact firmly with a pointing iron, and moist-cure for 3–7 days. Protect from frost, rain and rapid drying during the cure period. Never use Portland cement mortar on lime-mortar masonry — it causes brick face spalling.
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

export function NhlThreePointFiveMortarProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 suppliers — NHL 3.5 natural hydraulic lime repointing mortars — scroll to view all</p>
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
              Side-by-side comparison of NHL 3.5 lime repointing mortar suppliers. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Distribution</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">NHL grade</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Strength</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key feature</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.supplier} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.supplier}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.distribution}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.nhlGrade}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.strength}</td>
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
