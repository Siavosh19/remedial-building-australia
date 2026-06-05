"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Parex"
  | "Limemortar"
  | "Heritage-specialist"
  | "NHL-5.0"
  | "Lime-mortar"
  | "Heritage"
  | "Breathable"
  | "AS-3700"
  | "Exposed-parapet"
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
    fullLabel: "Parex Australia",
    brandUrl: "https://www.parex.com.au",
    accentColor: "#b45309",
    name: "Parex NHL 5.0 Natural Hydraulic Lime Mortar",
    descriptionLine: "Parex natural hydraulic lime mortar — NHL 5.0 grade — eminently hydraulic — for repointing moderately hard historic brick and exposed parapets on Class 2 facades",
    productType: "NHL 5.0 natural hydraulic lime repointing mortar — exposed masonry — Parex",
    filterTags: ["Parex", "NHL-5.0", "Lime-mortar", "Heritage", "Breathable", "AS-3700", "Exposed-parapet", "External"],
    techChips: [
      { label: "NHL 5.0 binder", cls: "bg-amber-100 text-amber-800" },
      { label: "Breathable", cls: "bg-green-50 text-green-700" },
      { label: "5–15 MPa", cls: "bg-slate-100 text-slate-700" },
      { label: "Exposed parapets", cls: "bg-slate-100 text-slate-700" },
      { label: "Parex", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Parex natural hydraulic lime mortar — NHL 5.0 grade — for repointing moderately hard historic brickwork and exposed parapets on Class 2 strata buildings. NHL 5.0 (eminently hydraulic) is the strongest NHL grade, producing a mortar compressive strength of 5–15 MPa — stronger than NHL 3.5 but still breathable and softer than Portland cement mortar. Used where NHL 3.5 would erode in exposed or wind-driven rain environments, and where the brick is hard enough to accommodate a stronger mortar without face spalling. Confirm NHL 5.0 is appropriate for the brick compressive strength before specifying — a harder mortar than the brick will cause brick face spalling under thermal movement. Rake joints to minimum 15mm depth, clean, dampen, apply in layers not exceeding 10mm per pass, moist-cure 3–7 days, and protect from rain, frost and rapid drying during cure.",
    technicalProperties: [
      "NHL 5.0 binder — eminently hydraulic — compressive strength 5–15 MPa — stronger than NHL 3.5 but still breathable",
      "Moderate–high vapour permeability — better breathability than Portland cement mortar; suitable for damp masonry management",
      "Better freeze-thaw resistance than NHL 3.5 — suitable for southern states with regular frost and exposed parapet locations",
      "Pre-mixed formulations available — consistent mix proportions and reduced site mixing errors",
      "Suitable for exposed parapets and wind-driven rain environments where NHL 3.5 would erode prematurely",
      "Still softer than Portland cement mortar — mortar fails before the brick under thermal movement stress",
      "Moist curing for 3–7 days after application — protect from frost, rain and rapid drying",
    ],
    limitations: [
      "Stronger than NHL 3.5 — can cause spalling of very soft or mechanically weak historic brick if over-specified",
      "Still softer than Portland cement mortar — not suitable for joints in highly loaded structural masonry without engineer confirmation",
      "Colour matching to original mortar requires aggregate selection — confirm aggregate colour with specialist before ordering",
      "Confirm current Parex product range and state availability before specifying",
      "Not suitable for repointing very soft, friable historic brick — use NHL 3.5 or lime putty instead",
    ],
    procurementSources: [
      { name: "Parex Australia — national distributor network", url: "https://www.parex.com.au" },
      { name: "Parex technical sales — confirm product and state availability", url: "https://www.parex.com.au/contact" },
    ],
  },
  {
    fullLabel: "Limemortar.com.au",
    brandUrl: "https://www.limemortar.com.au",
    accentColor: "#0369a1",
    name: "Limemortar.com.au NHL 5.0 Hydraulic Lime Mortar",
    descriptionLine: "Specialist Australian lime supplier — NHL 5.0 natural hydraulic lime mortar — custom blended with aggregate colour-matched to original — for heritage exposed masonry on Class 2 facades",
    productType: "NHL 5.0 natural hydraulic lime repointing mortar — specialist supply — Limemortar.com.au",
    filterTags: ["Limemortar", "NHL-5.0", "Lime-mortar", "Heritage", "Breathable", "Exposed-parapet", "External"],
    techChips: [
      { label: "NHL 5.0 binder", cls: "bg-sky-100 text-sky-800" },
      { label: "Specialist supply", cls: "bg-violet-50 text-violet-700" },
      { label: "Custom blended", cls: "bg-amber-50 text-amber-700" },
      { label: "5–15 MPa", cls: "bg-slate-100 text-slate-700" },
      { label: "Limemortar.com.au", cls: "bg-sky-50 text-sky-700" },
    ],
    systemDescription:
      "Limemortar.com.au is an Australian specialist heritage lime supplier offering NHL 5.0 natural hydraulic lime mortar with custom aggregate blending to match the colour and texture of original mortar on heritage buildings. This approach is suited to significant heritage buildings where standard pre-blended products do not achieve the required colour match, or where heritage authority requirements necessitate demonstrated aggregate provenance. Confirm current product range, lead times, and state delivery availability before specifying. Supply is specialist and lead times may be longer than standard trade products.",
    technicalProperties: [
      "NHL 5.0 binder — eminently hydraulic — compressive strength 5–15 MPa — specialist-confirmed grade for the specific application",
      "Custom aggregate blend — aggregate type, colour and grading matched to original mortar for significant heritage buildings",
      "Moderate–high vapour permeability — breathable mortar suitable for heritage damp masonry management",
      "Specialist supply includes mix design advice, application specification, and on-site trial panel support",
      "Better freeze-thaw resistance than NHL 3.5 — suitable for southern states and exposed parapet locations",
      "Reversible system — compatible with future re-repointing without damage to adjacent masonry",
      "Moist curing for 3–7 days — protect from frost, rain and rapid drying",
    ],
    limitations: [
      "Specialist supply — longer lead times than standard trade products; confirm availability and lead times before scheduling work",
      "Higher cost than standard pre-blended NHL products — specialist supply and custom aggregate blending increases cost",
      "Requires experienced lime work contractor — poor application or mix proportions will compromise durability",
      "Stronger than NHL 3.5 — confirm brick compressive strength is sufficient to accommodate NHL 5.0 before specifying",
      "Heritage authority may require specific documentation on lime source and aggregate — confirm requirements before specifying",
    ],
    procurementSources: [
      { name: "Limemortar.com.au — specialist Australian lime supplier", url: "https://www.limemortar.com.au" },
      { name: "Limemortar.com.au contact — confirm availability and lead time", url: "https://www.limemortar.com.au/contact" },
    ],
  },
  {
    fullLabel: "Heritage lime specialist",
    brandUrl: "https://www.limemortar.com.au",
    accentColor: "#7c3aed",
    name: "Heritage Specialist — NHL 5.0 Custom Mortar Specification",
    descriptionLine: "Heritage specialist supplier — NHL 5.0 custom blended repointing mortar with aggregate matched to original — for significant heritage masonry requiring authority approval on Class 2 facades",
    productType: "NHL 5.0 natural hydraulic lime repointing mortar — heritage specialist — authority-grade specification",
    filterTags: ["Heritage-specialist", "NHL-5.0", "Lime-mortar", "Heritage", "Breathable", "Exposed-parapet", "External"],
    techChips: [
      { label: "NHL 5.0 binder", cls: "bg-violet-100 text-violet-800" },
      { label: "Custom specification", cls: "bg-amber-50 text-amber-700" },
      { label: "Authority-grade", cls: "bg-rose-50 text-rose-700" },
      { label: "5–15 MPa", cls: "bg-slate-100 text-slate-700" },
      { label: "Heritage specialist", cls: "bg-violet-50 text-violet-700" },
    ],
    systemDescription:
      "Heritage specialist lime suppliers offer a full specification service for NHL 5.0 repointing mortar on significant heritage buildings — mortar analysis of original fabric, NHL grade selection, aggregate matching, trial panel commissioning, and application specification. This level of service is required where a heritage authority (Heritage NSW, Heritage Victoria, etc.) has oversight of the works, or where the building is listed and requires demonstrated material compatibility. Confirm the specific specialist supplier and their service offering in your state — specialist heritage lime consultants operate in most Australian states but supply, analysis services, and lead times vary significantly.",
    technicalProperties: [
      "NHL 5.0 binder — eminently hydraulic — compressive strength 5–15 MPa — grade confirmed by analysis of original mortar fabric",
      "Full mortar analysis service — original mortar sampled and analysed for NHL grade, aggregate type, and colour before specification",
      "Custom aggregate blend — aggregate type, colour and grading specifically matched to original mortar on building",
      "Trial panel commissioning — test batch assessed on building in wet and dry conditions before full works proceed",
      "Application specification and contractor supervision available — critical for heritage authority compliance",
      "Better freeze-thaw and weather resistance than NHL 3.5 — suitable for exposed parapets and southern states",
      "Reversible mortar system — compatible with future re-repointing without damage to adjacent masonry",
    ],
    limitations: [
      "Longest lead time and highest cost — mortar analysis, custom blending, and trial panel add significant time and cost to the programme",
      "Requires specialist engagement before tendering — cannot be specified from a standard TDS alone",
      "Availability varies by state — confirm specialist availability before commencing design or tendering",
      "Heritage authority may require specific accreditation of the specialist and documentation of the specification process",
      "Requires experienced lime work contractor — heritage specialist specification is wasted if applied by an inexperienced contractor",
    ],
    procurementSources: [
      { name: "Limemortar.com.au — specialist Australian lime supplier", url: "https://www.limemortar.com.au" },
      { name: "State heritage authority — confirm approved suppliers list for listed buildings", url: "https://www.limemortar.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Parex", label: "Parex" },
  { id: "Limemortar", label: "Limemortar.com.au" },
  { id: "Heritage-specialist", label: "Heritage specialist" },
  { id: "NHL-5.0", label: "NHL 5.0" },
  { id: "Lime-mortar", label: "Lime mortar" },
  { id: "Heritage", label: "Heritage" },
  { id: "Breathable", label: "Breathable" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "Exposed-parapet", label: "Exposed parapet" },
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
    supplier: "Parex Australia",
    product: "Parex NHL 5.0",
    distribution: "National (distributor)",
    nhlGrade: "NHL 5.0",
    strength: "5–15 MPa",
    keyFeature: "Pre-blended, standard colour range",
    primaryUse: "Exposed parapets, moderately hard brick",
  },
  {
    supplier: "Limemortar.com.au",
    product: "NHL 5.0 custom blended",
    distribution: "Specialist (national)",
    nhlGrade: "NHL 5.0",
    strength: "5–15 MPa",
    keyFeature: "Aggregate colour-matched to original",
    primaryUse: "Heritage buildings, colour-match required",
  },
  {
    supplier: "Heritage lime specialist",
    product: "Custom mortar specification",
    distribution: "State-based specialist",
    nhlGrade: "NHL 5.0",
    strength: "5–15 MPa",
    keyFeature: "Full analysis, trial panel, authority spec",
    primaryUse: "Listed heritage buildings — authority oversight",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Repointing moderately hard historic clay brick facades on Class 2 strata buildings where the original mortar was lime-based and NHL 3.5 would erode prematurely",
    "Repointing exposed parapets and wind-driven rain zones on heritage buildings where weather exposure requires greater mortar strength than NHL 3.5",
    "Repointing historic brickwork where previous NHL 3.5 mortar has eroded or failed prematurely due to exposure conditions",
    "Restoration of mortar joints in late-Victorian and Edwardian-era construction where harder brick units were used with stronger original lime mortars",
    "Heritage repointing on southern state buildings subject to regular frost events where NHL 3.5 freeze-thaw resistance is insufficient",
  ],
  selectionCriteria: [
    "Confirm NHL 5.0 mortar strength (5–15 MPa) is appropriate for the brick unit strength — mortar must remain weaker than the brick face",
    "Use NHL 5.0 where NHL 3.5 is too weak for the exposure conditions — particularly exposed parapets and wind-driven rain zones",
    "Do not use NHL 5.0 on very soft, friable historic brick where NHL 3.5 or lime putty is required — risk of brick face spalling",
    "Confirm original mortar was lime-based before specifying — take a mortar sample for analysis or consult a heritage specialist",
    "Minimum 15mm raking depth — shallow joints allow the repointing mortar to detach under thermal cycling",
    "Commission a trial panel on the building before proceeding — view in wet and dry conditions before approval",
  ],
  limitations: [
    "Do not use on very soft or friable historic brick — NHL 5.0 is too strong and will cause brick face spalling under thermal movement",
    "Never use Portland cement mortar on soft, historic or lime-mortar masonry — causes brick face spalling and moisture trapping",
    "Do not repoint over existing movement joints — movement joints must be raked out and resealed with polyurethane or silicone",
    "Lime mortars gain strength slowly — do not expose to frost, rain or mechanical loading within the cure period",
    "Do not apply in temperatures below 5°C or when frost is forecast within 7 days",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — primary Australian standard for mortar proportions and designations",
    "BS EN 459 — Building Lime — the primary standard for natural hydraulic lime grade classification — confirm NHL 5.0 grade from product TDS",
    "Heritage state authority guidelines — Heritage NSW, Heritage Victoria, and equivalent bodies publish guidance on mortar specification",
    "ICOMOS conservation principles — material compatibility and reversibility apply to all heritage masonry repointing work",
  ],
  suitableDefects: [
    "Deteriorated, eroded or failed lime mortar joints in moderately hard historic masonry where NHL 3.5 is too weak for the exposure conditions",
    "Mortar joint failure at exposed parapets, copings and wind-driven rain zones on heritage buildings",
    "Failed NHL 3.5 repointing on exposed or harder historic brick — upgrade to NHL 5.0 where exposure conditions require greater strength",
    "Open or raked joints following facade investigation or brick cleaning on heritage masonry where stronger NHL grade is specified",
  ],
  typicalSubstrates: [
    "Moderately hard historic fired clay brick — where NHL 3.5 would erode but full Portland cement mortar would cause face spalling",
    "Exposed parapets and copings in heritage masonry — where greater mortar strength and freeze-thaw resistance is required",
    "Hard-burnt Victorian-era brick in southern states — where the brick is hard enough to accommodate NHL 5.0 mortar",
    "NOT suitable: very soft, friable historic brick — use NHL 3.5 or lime putty for these substrates",
    "NOT suitable: modern hard-burnt engineering brick or concrete masonry units — use cement mortar for these substrates",
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

export function NhlFivePointZeroMortarIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What is NHL 5.0 natural hydraulic lime repointing mortar?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Natural hydraulic lime (NHL) 5.0 repointing mortar is an eminently hydraulic lime mortar used for repointing moderately hard historic brick and exposed parapets on Class 2 strata building facades where the original mortar was lime-based. NHL 5.0 produces a mortar compressive strength of 5–15 MPa — stronger than NHL 3.5 and better suited to wind-driven rain zones and exposed locations. It remains breathable and softer than Portland cement mortar.
        </p>
        {expanded && (
          <>
            <p>
              NHL 5.0 must not be harder than the brick unit — confirm brick compressive strength before specifying. It is used where NHL 3.5 would erode prematurely in exposed or high-rainfall environments. For very soft or friable historic brick, NHL 3.5 or lime putty must be used instead.
            </p>
            <p>
              Rake joints to minimum 15mm depth, apply in layers not exceeding 10mm per pass, and moist-cure for 3–7 days. A trial panel on the building is required before proceeding with full works. Protect from frost, rain and rapid drying during the cure period.
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

export function NhlFivePointZeroMortarProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 suppliers — NHL 5.0 natural hydraulic lime repointing mortars — scroll to view all</p>
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
                  <CollapsibleCardDetails text={product.descriptionLine} chips={product.techChips} />
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
              Side-by-side comparison of NHL 5.0 lime repointing mortar suppliers. Confirm all product selections against the current manufacturer TDS before specifying.
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
