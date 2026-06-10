"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Limemortar"
  | "Remmers"
  | "Heritage-specialist"
  | "Lime-putty"
  | "Lime-mortar"
  | "Heritage"
  | "Breathable"
  | "Soft-brick"
  | "Pre-1920s"
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
    fullLabel: "Limemortar.com.au",
    brandUrl: "https://www.limemortar.com.au",
    accentColor: "#0369a1",
    name: "Limemortar.com.au — Lime Putty Gauged Repointing Mortar",
    descriptionLine: "Limemortar.com.au specialist lime putty supply — slaked lime putty with custom aggregate for gauged repointing mortar — for very soft, friable historic masonry on Class 2 heritage facades",
    productType: "Lime putty gauged repointing mortar — specialist supply — Limemortar.com.au",
    filterTags: ["Limemortar", "Lime-putty", "Lime-mortar", "Heritage", "Breathable", "Soft-brick", "Pre-1920s", "External"],
    techChips: [
      { label: "Lime putty binder", cls: "bg-sky-100 text-sky-800" },
      { label: "Softest available", cls: "bg-green-50 text-green-700" },
      { label: "0.5–2.5 MPa", cls: "bg-slate-100 text-slate-700" },
      { label: "Specialist supply", cls: "bg-violet-50 text-violet-700" },
      { label: "Limemortar.com.au", cls: "bg-sky-50 text-sky-700" },
    ],
    systemDescription:
      "Limemortar.com.au is an Australian specialist heritage lime supplier offering slaked lime putty and custom aggregate supply for gauged repointing mortar on very soft, friable historic masonry on Class 2 buildings. Lime putty mortars are completely non-hydraulic and are the softest and most breathable option available — reserved for very soft, mechanically weak historic brick or sandstone where any hydraulic binder would cause damage. The specialist will confirm the lime putty source, aggregate type, colour, and grading matched to the original mortar, and provide a mix specification and application guide. Confirm current product range, lead times, and state delivery availability with Limemortar.com.au before specifying. Lime putty mortar requires an experienced lime contractor — poor application will compromise durability.",
    technicalProperties: [
      "Slaked lime putty binder — non-hydraulic — compressive strength 0.5–2.5 MPa — softest available repointing material",
      "Very high vapour permeability — maximum breathability — critical for managing rising or lateral damp in lime-mortar masonry",
      "Custom aggregate blend — aggregate type, colour and grading matched to original mortar by specialist",
      "Completely reversible and re-repointing-compatible — traditional material matched to pre-1920s construction",
      "Specialist supply includes mix design advice and application specification",
      "Strength gain by carbonation only — initial strength takes weeks to months; requires moist curing and protection",
      "Confirm state availability and lead times with Limemortar.com.au before specifying",
    ],
    limitations: [
      "Lowest compressive strength of all repointing options — not suitable for high-exposure, wind-driven rain locations without hydraulic additive",
      "Longest cure time — initial strength takes weeks to months to develop via carbonation; protect from frost, rain and mechanical loading",
      "Specialist supply — longer lead times and higher cost than standard pre-blended products",
      "Requires experienced lime contractor — incorrect application or mix proportions will compromise durability",
      "Mix proportions must be designed by specialist — do not attempt to specify lime putty mix proportions without specialist input",
    ],
    procurementSources: [
      { name: "Limemortar.com.au — specialist Australian lime supplier", url: "https://www.limemortar.com.au" },
      { name: "Limemortar.com.au contact — confirm availability, mix design and lead time", url: "https://www.limemortar.com.au/contact" },
    ],
  },
  {
    fullLabel: "Remmers Australia",
    brandUrl: "https://www.remmers.com.au",
    accentColor: "#b45309",
    name: "Remmers Heritage Lime Mortar / Calcestruzzo",
    descriptionLine: "Remmers heritage masonry lime mortar products — including lime putty compatible formulations — for repointing very soft and friable historic masonry on heritage Class 2 facades",
    productType: "Lime putty / heritage lime mortar — Remmers Australia — pre-mixed specialist range",
    filterTags: ["Remmers", "Lime-putty", "Lime-mortar", "Heritage", "Breathable", "Soft-brick", "Pre-1920s", "External"],
    techChips: [
      { label: "Lime putty / NHL", cls: "bg-amber-100 text-amber-800" },
      { label: "Breathable", cls: "bg-green-50 text-green-700" },
      { label: "Heritage masonry", cls: "bg-amber-50 text-amber-700" },
      { label: "Remmers", cls: "bg-amber-50 text-amber-700" },
      { label: "Pre-mixed range", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Remmers Australia offers a specialist heritage masonry mortar range including lime putty compatible and pre-mixed heritage lime mortars for repointing very soft, friable historic masonry on Class 2 heritage buildings. Remmers products are widely specified for significant heritage masonry remediation in Europe and are supplied through Australian distribution. Confirm current product code, mix type, and state availability with Remmers Australia before specifying — the heritage masonry range may include both pre-mixed lime mortar and mortar mineral colour pigment systems for aggregate and colour matching. Remmers technical support can advise on the appropriate product for the substrate and heritage authority requirements.",
    technicalProperties: [
      "Lime putty / NHL binder options — softest available to moderately breathable — confirm specific product binder type with Remmers before specifying",
      "Breathable mortar — high vapour permeability — suitable for management of moisture in historic lime-mortar masonry",
      "Pre-mixed heritage lime mortar range — consistent formulation and quality control — reduces site mixing error",
      "Colour and texture matching to original mortar — Remmers offers mineral colour pigment systems for aggregate colour matching",
      "Suitable for very soft, friable historic brick and sandstone masonry where cement mortar would cause face spalling",
      "Confirm strength range, NHL grade or lime putty binder with Remmers technical support for specific application",
      "Moist curing for 3–7+ days depending on specific product — protect from frost, rain and rapid drying",
    ],
    limitations: [
      "Confirm specific product type and binder with Remmers — the heritage masonry range covers a range of binder types and strength classes",
      "Confirm current Australian product availability and distribution — Remmers product codes and ranges change",
      "Specialist masonry product — may have longer lead times than standard trade mortar products",
      "Requires experienced heritage lime contractor — poor application will compromise durability",
      "Colour matching to original mortar requires specialist aggregate selection — confirm with Remmers before ordering",
    ],
    procurementSources: [
      { name: "Remmers Australia — heritage masonry products", url: "https://www.remmers.com.au" },
      { name: "Remmers technical support — confirm product code, binder type and availability", url: "https://www.remmers.com.au/contact" },
    ],
  },
  {
    fullLabel: "Local heritage lime specialist",
    brandUrl: "https://www.limemortar.com.au",
    accentColor: "#7c3aed",
    name: "Local Heritage Lime Specialist — Custom Lime Putty Gauged Mortar",
    descriptionLine: "Local heritage lime specialist — custom lime putty gauged repointing mortar — full mortar analysis, aggregate matching, and trial panel — for heritage authority-approved works on Class 2 facades",
    productType: "Lime putty gauged repointing mortar — local heritage specialist — full analysis service",
    filterTags: ["Heritage-specialist", "Lime-putty", "Lime-mortar", "Heritage", "Breathable", "Soft-brick", "Pre-1920s", "External"],
    techChips: [
      { label: "Lime putty binder", cls: "bg-violet-100 text-violet-800" },
      { label: "Full mortar analysis", cls: "bg-amber-50 text-amber-700" },
      { label: "Authority-grade", cls: "bg-rose-50 text-rose-700" },
      { label: "0.5–2.5 MPa", cls: "bg-slate-100 text-slate-700" },
      { label: "Heritage specialist", cls: "bg-violet-50 text-violet-700" },
    ],
    systemDescription:
      "A local heritage lime specialist provides a full mortar analysis and specification service for lime putty gauged repointing on heritage Class 2 buildings where heritage authority oversight is required. This includes: mortar sampling and petrographic analysis of original fabric, lime putty source and aggregate selection, trial panel commissioning and assessment, application specification, and contractor selection and supervision. This level of service is required for State Heritage Register or local heritage conservation area buildings where the heritage authority requires documented material compatibility and a demonstrated trial panel. Confirm local heritage lime specialists operating in your state — they operate across major Australian states but availability, qualifications, and lead times vary. Engage the specialist early in the remediation design phase.",
    technicalProperties: [
      "Slaked lime putty binder — non-hydraulic — compressive strength 0.5–2.5 MPa — confirmed by mortar analysis and specialist specification",
      "Full petrographic analysis of original mortar — aggregate type, grading, colour, and binder type identified before mix specification",
      "Custom aggregate blend — precisely matched to original mortar colour, texture and grading for significant heritage buildings",
      "Trial panel commissioning and heritage authority assessment — required before full-scope works proceed",
      "Application specification and contractor supervision — critical for heritage compliance and durability",
      "Very high vapour permeability — maximum breathability — compatible with management of damp in lime-mortar masonry",
      "Reversible and re-repointing-compatible — traditional material matched to pre-1920s construction",
    ],
    limitations: [
      "Longest lead time and highest cost of all lime mortar options — analysis, custom blending, and trial panel add significant time and cost",
      "Heritage authority may require specific accreditation of the specialist and documentation of all stages of the specification process",
      "Availability varies by state — confirm specialist availability before commencing design or tendering",
      "Requires experienced lime contractor — heritage specialist specification is wasted if applied by an inexperienced contractor",
      "Strength development by carbonation is slow — protect from frost, rain and mechanical loading for weeks after application",
    ],
    procurementSources: [
      { name: "Limemortar.com.au — specialist Australian lime supplier", url: "https://www.limemortar.com.au" },
      { name: "State heritage authority — confirm approved specialist list for listed buildings", url: "https://www.limemortar.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Limemortar", label: "Limemortar.com.au" },
  { id: "Remmers", label: "Remmers" },
  { id: "Heritage-specialist", label: "Heritage specialist" },
  { id: "Lime-putty", label: "Lime putty" },
  { id: "Lime-mortar", label: "Lime mortar" },
  { id: "Heritage", label: "Heritage" },
  { id: "Breathable", label: "Breathable" },
  { id: "Soft-brick", label: "Soft brick" },
  { id: "Pre-1920s", label: "Pre-1920s" },
  { id: "External", label: "External" },
];

const SYSTEM_COMPARISON: {
  supplier: string;
  product: string;
  distribution: string;
  binder: string;
  strength: string;
  keyFeature: string;
  primaryUse: string;
}[] = [
  {
    supplier: "Limemortar.com.au",
    product: "Lime putty + custom aggregate",
    distribution: "Specialist (national)",
    binder: "Lime putty",
    strength: "0.5–2.5 MPa",
    keyFeature: "Specialist supply, aggregate matched",
    primaryUse: "Very soft / friable historic brick",
  },
  {
    supplier: "Remmers Australia",
    product: "Remmers heritage lime mortar",
    distribution: "National (distributor)",
    binder: "Lime putty / NHL (confirm)",
    strength: "Confirm with Remmers",
    keyFeature: "Pre-mixed heritage range, colour pigments",
    primaryUse: "Significant heritage masonry",
  },
  {
    supplier: "Local heritage specialist",
    product: "Custom lime putty gauged",
    distribution: "State-based specialist",
    binder: "Lime putty",
    strength: "0.5–2.5 MPa",
    keyFeature: "Full analysis, trial panel, authority spec",
    primaryUse: "State Heritage Register buildings",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Repointing very soft, porous or friable historic clay brick on Class 2 strata buildings where any hydraulic binder would cause brick face spalling",
    "Repointing pre-1920s lime-mortar masonry where the original mortar was lime putty based and any harder mortar would transmit movement stress to the brick arris",
    "Heritage authority-required repointing on State Heritage Register or conservation area buildings where material compatibility must be demonstrated",
    "Reinstatement of tuckpointed lime putty pointing on significant Victorian-era facades where the fine ribbon pointing must be precisely colour-matched",
    "Remediation of failed masonry joints where previous cement or NHL repointing was incompatible with soft historic brick and has been removed",
  ],
  selectionCriteria: [
    "Confirm the brick is soft and friable enough to require lime putty — not just heritage but genuinely mechanically weak and unable to tolerate NHL mortar",
    "Engage a heritage specialist to sample and analyse the original mortar before specifying — do not specify lime putty mix proportions without specialist input",
    "Commission a trial panel before full works — assess the mortar in wet and dry conditions and confirm heritage authority acceptance before proceeding",
    "Confirm aggregate type and grading are matched to the original mortar — aggregate colour matching is critical for heritage authority approval",
    "Confirm lime contractor experience with lime putty application — poor mixing or application will compromise strength and durability",
    "Allow for slow strength development — carbonation-based strength gain takes weeks to months; protect from weather and mechanical loading",
  ],
  limitations: [
    "Do not specify lime putty mortar on moderately hard historic brick where NHL 3.5 or NHL 5.0 would be more appropriate — lime putty may erode prematurely",
    "Never use Portland cement mortar on soft, historic, or lime-mortar masonry — causes brick face spalling and moisture trapping",
    "Do not repoint over existing movement joints — movement joints must be raked out and resealed with polyurethane or silicone, not mortar",
    "Lime putty mortars gain strength slowly — do not expose to frost, rain or mechanical loading for weeks after application",
    "Do not apply in temperatures below 5°C or when frost is forecast within 7 days",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — primary Australian standard for mortar proportions and designations",
    "Heritage state authority guidelines — Heritage NSW, Heritage Victoria, and equivalent bodies publish guidance on mortar specification for heritage buildings — authority approval may be required before works commence",
    "ICOMOS conservation principles — material compatibility, reversibility, and minimal intervention apply to all heritage masonry repointing work",
    "Petrographic analysis of original mortar — required for significant heritage buildings — confirms original binder type and aggregate selection for matching",
  ],
  suitableDefects: [
    "Deteriorated, eroded or failed lime putty mortar joints in very soft, porous historic masonry where NHL mortar would be too strong",
    "Mortar joint failure in pre-1920s lime-mortar construction where original mortar was lime putty based",
    "Failed repointing where incompatible cement or NHL mortar was previously installed on very soft brick and has caused damage",
    "Tuckpointed heritage joints requiring reinstatement of fine ribbon lime putty pointing on Victorian-era facades",
  ],
  typicalSubstrates: [
    "Very soft, porous and friable historic fired clay brick — pre-1920s construction — where the brick is too weak to accommodate any hydraulic binder",
    "Sandstone and limestone masonry where the stone compressive strength is very low and only lime putty mortar is compatible",
    "Soft handmade brick from colonial-era construction — where machine-pressed modern brick testing methods overstate the in-situ brick strength",
    "NOT suitable: moderately hard historic brick — use NHL 3.5 or NHL 5.0 mortar instead",
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

export function LimePuttyMortarIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What is lime putty gauged repointing mortar?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Lime putty gauged repointing mortar is a completely non-hydraulic mortar made from slaked lime putty and fine aggregate — typically mixed at 1:2.5 to 1:3 lime putty to sharp washed sand by volume. It is the softest and most breathable repointing mortar available, reserved for very soft, friable historic brick or sandstone masonry where any hydraulic binder would cause face spalling or moisture damage.
        </p>
        {expanded && (
          <>
            <p>
              Mix proportions and aggregate selection must be specified by a heritage specialist — there is no standard off-the-shelf specification for this product type. Strength gain occurs by carbonation only, which takes weeks to months. Protect from frost, rain and mechanical loading during the entire cure period.
            </p>
            <p>
              A trial panel on the building is mandatory before proceeding with full works. Heritage authority approval may be required before any works commence on listed buildings. Engage a specialist supplier and experienced lime contractor early in the design phase.
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

export function LimePuttyMortarProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 suppliers — lime putty gauged repointing mortars — scroll to view all</p>
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
              Side-by-side comparison of lime putty gauged repointing mortar suppliers. Confirm all product selections against the current manufacturer TDS before specifying.
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
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Binder</th>
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
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.binder}</td>
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
