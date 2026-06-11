"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Resin-anchor"
  | "Stainless-316"
  | "Epoxy"
  | "Vinylester"
  | "AS-3700"
  | "Cavity-wall"
  | "Hollow-substrate"
  | "Perforated-brick"
  | "Chemical-anchor"
  | "Two-part";

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
    fullLabel: "Helifix / Thor Helical / Simpson Strong-Tie",
    brandUrl: "https://www.helifix.com.au",
    accentColor: "#b45309",
    name: "316 SS remedial cavity wall tie — vinylester resin anchor — screen sleeve system",
    descriptionLine: "Grade 316 SS cavity wall tie installed with vinylester resin through mesh sleeve into hollow, perforated or cellular masonry — standard chemical anchor for Australian Class 2 remedial tie work",
    productType: "Chemical resin anchor cavity wall tie — vinylester — hollow/perforated masonry — AS 3700",
    filterTags: ["Resin-anchor", "Stainless-316", "Vinylester", "AS-3700", "Cavity-wall", "Hollow-substrate", "Perforated-brick", "Chemical-anchor", "Two-part"],
    techChips: [
      { label: "Vinylester resin", cls: "bg-amber-100 text-amber-800" },
      { label: "316 SS tie", cls: "bg-slate-100 text-slate-700" },
      { label: "Hollow masonry", cls: "bg-green-100 text-green-700" },
      { label: "Mesh sleeve req.", cls: "bg-red-100 text-red-700" },
    ],
    systemDescription:
      "Grade 316 stainless steel cavity wall tie installed with a vinylester chemical resin anchor into hollow, perforated or cellular masonry — the resin is injected through a mesh sleeve that holds the resin in place while it cures around the tie body. Vinylester resin anchors are the standard chemical anchor type for remedial masonry tie work in Australia — suitable for hollow brick, concrete block, and perforated masonry where mechanical expansion would fail to achieve adequate interlock. The mesh sleeve must match the bore hole diameter and substrate void geometry — incorrect sleeve sizing results in resin loss before the sleeve can confine it. Bore hole must be clean and dry before resin injection — dust or moisture in the bore prevents resin curing and bond development. Cure time before loading is temperature-sensitive — confirm minimum cure time at site ambient temperature from the product data sheet. Tie geometry and resin type must be as engineer-specified. Engineer specification is mandatory for all cavity wall tie remediation.",
    technicalProperties: [
      "Suitable for hollow, perforated and cellular masonry — mesh sleeve confines resin regardless of substrate void geometry",
      "Grade 316 stainless steel tie — full corrosion resistance for all Australian exposure environments including coastal",
      "High pull-out capacity when resin is fully cured — comparable to solid masonry mechanical anchor in confirmed bond",
      "Vinylester resin: standard specification for Australian masonry remediation — reliable supply through masonry remediation suppliers",
      "Widely specified and stocked by Australian masonry remediation suppliers — established supply chain",
      "Mesh sleeve system ensures consistent resin distribution around tie shaft in void substrate",
    ],
    limitations: [
      "Bore hole must be clean and dry — dust or moisture prevents resin bond development and reduces pull-out capacity",
      "Cure time must be observed before loading — vinylester cure is temperature-sensitive; confirm minimum cure time at site temperature from TDS",
      "Mesh sleeve sizing must match bore hole — incorrect sleeve size results in resin loss into voids before confinement",
      "Not suitable for wet or saturated masonry — resin bond is significantly impaired above 5–8% substrate moisture content",
    ],
    procurementSources: [
      { name: "Helifix Australia — specialist remedial masonry fixings", url: "https://www.helifix.com.au" },
      { name: "Thor Helical Australia — helical tie and resin systems", url: "https://www.thorhelical.com.au" },
      { name: "Simpson Strong-Tie Australia — national distribution", url: "https://www.strongtie.com.au" },
      { name: "Parchem Construction Supplies — resin and fixing supply nationally", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Hilti / Fischer / Sika Australia",
    brandUrl: "https://www.hilti.com.au",
    accentColor: "#0369a1",
    name: "316 SS remedial cavity wall tie — two-part epoxy resin anchor — hollow substrate",
    descriptionLine: "Grade 316 SS cavity wall tie bonded with two-part epoxy resin — higher bond strength than vinylester — for high-wind-load applications or damp substrates above vinylester threshold",
    productType: "Two-part epoxy resin anchor cavity wall tie — 316 SS — high-load hollow masonry — AS 3700",
    filterTags: ["Resin-anchor", "Stainless-316", "Epoxy", "AS-3700", "Cavity-wall", "Hollow-substrate", "Chemical-anchor", "Two-part"],
    techChips: [
      { label: "Epoxy resin", cls: "bg-sky-100 text-sky-800" },
      { label: "High bond strength", cls: "bg-green-100 text-green-700" },
      { label: "Damp tolerant", cls: "bg-slate-100 text-slate-700" },
      { label: "Published load tables", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Grade 316 stainless steel cavity wall tie installed with a two-part epoxy chemical resin anchor — epoxy provides higher bond strength than vinylester for the same bore geometry, and is preferred where maximum pull-out capacity is required or the substrate moisture content exceeds the limit for vinylester. Epoxy anchors are also more tolerant of slightly damp substrates. Proprietary epoxy resin systems from Hilti (HIT-RE 500 V4), Fischer (FIS V Plus), and Sika (AnchorFix) are tested and published with design resistance tables for specific substrate applications including hollow masonry — always confirm the system has been tested and approved for hollow masonry substrate before specifying. Longer cure time than vinylester: at 10°C this can be 24 hours or more. Bore hole cleanliness remains critical — epoxy resin is no more tolerant of dust or debris contamination than vinylester. Two-component mixing requires correct dispensing equipment — confirm correct gun and mixing nozzle before starting.",
    technicalProperties: [
      "Higher bond strength than vinylester — useful for high wind load or where tie spacing cannot be reduced to meet engineer's pull-out requirement",
      "More tolerant of substrate moisture than vinylester — confirmed by manufacturer testing at elevated substrate moisture levels",
      "Published load tables for hollow masonry from major manufacturers — Hilti HIT-RE 500 V4 and Fischer FIS V Plus provide hollow masonry data",
      "Long pot life at low temperatures — epoxy cure is slower but working time is longer in cooler site conditions",
      "Two-component precision mixing provides consistent cured bond strength across the installation",
      "Grade 316 stainless tie — full corrosion resistance for all Australian coastal and marine exposure zones",
    ],
    limitations: [
      "Longer cure time than vinylester — at 10°C cure can be 24 hours or more; do not load before minimum cure time",
      "Higher cost than vinylester — only justify where higher bond strength or moisture tolerance is required by engineer",
      "Bore hole cleanliness still critical — epoxy is no more tolerant of dust or debris contamination than vinylester",
      "Two-component mixing requires correct dispensing gun and mixing nozzle — incorrect mixing ratio compromises cured strength",
    ],
    procurementSources: [
      { name: "Hilti Australia — national trade supply and technical support", url: "https://www.hilti.com.au" },
      { name: "Fischer Fixings Australia — national distribution network", url: "https://www.fischer.com.au" },
      { name: "Sika Australia / Parchem — national", url: "https://aus.sika.com" },
      { name: "Helifix Australia — resin anchor systems for masonry remediation", url: "https://www.helifix.com.au" },
    ],
  },
  {
    fullLabel: "Helifix / Thor Helical — specialist supplier",
    brandUrl: "https://www.helifix.com.au",
    accentColor: "#7c3aed",
    name: "Proprietary remedial cavity wall tie and resin kit — packaged system",
    descriptionLine: "Complete packaged system — grade 316 SS tie matched with resin capsule or cartridge — tested as a paired system — pull-out load data validated for the specific tie-resin combination",
    productType: "Proprietary packaged remedial cavity wall tie and resin system — hollow masonry — AS 3700",
    filterTags: ["Resin-anchor", "Stainless-316", "Chemical-anchor", "AS-3700", "Cavity-wall", "Hollow-substrate", "Two-part"],
    techChips: [
      { label: "Proprietary kit", cls: "bg-purple-100 text-purple-800" },
      { label: "System-tested", cls: "bg-green-100 text-green-700" },
      { label: "Single source", cls: "bg-slate-100 text-slate-700" },
      { label: "Technical support", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Proprietary packaged system combining a grade 316 stainless steel remedial tie with a matched resin capsule or cartridge and installation accessories — designed as a complete system to simplify specification and ordering. Proprietary systems are tested as a matched pair (tie plus resin) and published pull-out load data relates to that specific combination. Using third-party ties with a proprietary resin (or vice versa) invalidates the published load data — confirm with the system manufacturer before mixing components from different suppliers. Kit supplies tie, resin, and accessories from a single source — reduces specification risk and procurement complexity. Manufacturer technical support provided for on-site guidance. Cannot mix components from different manufacturers without retesting. Availability may be limited — proprietary systems from specialist suppliers may have longer lead times than standard tie and resin supplied separately from a masonry merchant.",
    technicalProperties: [
      "Tested as a complete system — pull-out load data validated for the specific tie and resin combination; reduces specification risk",
      "Simplified ordering — tie, resin and accessories supplied together from a single source",
      "Manufacturer technical support and on-site guidance for the specific product combination",
      "Consistent factory-manufactured components with controlled material specifications",
      "Grade 316 SS tie — full corrosion resistance for all Australian exposure environments",
      "Reduces risk of mixing incompatible components from separate supply chains",
    ],
    limitations: [
      "Cannot mix components from different manufacturers without retesting — published load data applies only to the tested tie-resin combination",
      "Availability may be limited — specialist proprietary systems may have longer lead times than separately sourced components",
      "Cost premium over equivalent separate components from a masonry merchant",
      "Tie geometry is fixed by the manufacturer — may not offer the full range of lengths or diameters available from separate sourcing",
    ],
    procurementSources: [
      { name: "Helifix Australia — CemTie and resin kit systems", url: "https://www.helifix.com.au" },
      { name: "Thor Helical Australia — ResiBond and proprietary kit systems", url: "https://www.thorhelical.com.au" },
      { name: "Simpson Strong-Tie Australia — structural masonry fixing kits", url: "https://www.strongtie.com.au" },
      { name: "Confirm kit availability and lead time with supplier before specifying", url: "https://www.helifix.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Resin-anchor", label: "Resin anchor" },
  { id: "Stainless-316", label: "Stainless 316" },
  { id: "Epoxy", label: "Epoxy" },
  { id: "Vinylester", label: "Vinylester" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "Cavity-wall", label: "Cavity wall" },
  { id: "Hollow-substrate", label: "Hollow substrate" },
  { id: "Perforated-brick", label: "Perforated brick" },
  { id: "Chemical-anchor", label: "Chemical anchor" },
  { id: "Two-part", label: "Two-part resin" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  resinType: string;
  substrate: string;
  moistureTolerance: string;
  bondStrength: string;
  cost: string;
  primaryUse: string;
}[] = [
  {
    product: "Vinylester resin anchor",
    brand: "Helifix / Thor Helical / Simpson",
    resinType: "Vinylester",
    substrate: "Hollow / perforated masonry",
    moistureTolerance: "Dry substrate required",
    bondStrength: "Good",
    cost: "Medium",
    primaryUse: "Standard hollow masonry cavity wall tie remediation",
  },
  {
    product: "Epoxy resin anchor",
    brand: "Hilti / Fischer / Sika",
    resinType: "Epoxy (two-part)",
    substrate: "Hollow — damp tolerant",
    moistureTolerance: "Damp tolerant",
    bondStrength: "High",
    cost: "Higher",
    primaryUse: "High wind load or damp substrate — where vinylester capacity insufficient",
  },
  {
    product: "Proprietary kit system",
    brand: "Helifix / Thor Helical",
    resinType: "Manufacturer-specified",
    substrate: "As per manufacturer test data",
    moistureTolerance: "As tested",
    bondStrength: "System-tested",
    cost: "Premium",
    primaryUse: "System-tested applications — simplified specification and supply",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Remedial installation of replacement cavity wall ties in masonry facades where original galvanised ties have corroded",
    "Supplementary tie installation to increase tie density in under-tied cavity wall construction",
    "Cavity wall tie replacement in hollow, perforated and cellular clay brick outer leaf construction",
    "Remedial tie installation in concrete masonry block outer leaf cavity wall construction",
    "Structural engineer-specified tie programmes following cavity wall tie survey and load assessment",
  ],
  selectionCriteria: [
    "Engineer specification is mandatory — tie type, resin type, bore depth, spacing, and pull-out load must be engineer-designed",
    "Confirm outer leaf masonry type before specifying resin type — vinylester for dry hollow masonry; epoxy for damp or high-load applications",
    "Confirm resin type with engineer for the specific substrate; confirm cure time at expected site temperature before commencing work",
    "Confirm the proprietary epoxy product is tested and approved for hollow masonry substrate — check published load tables for required pull-out load",
    "For packaged kit systems: obtain the manufacturer's current TDS and pull-out load table before specifying and confirm system is tested for the specific substrate type",
  ],
  limitations: [
    "Chemical resin anchors are not suitable for wet or saturated masonry — substrate moisture must be below the resin manufacturer's specified maximum",
    "Do not load the tie before the manufacturer's minimum cure time at the ambient site temperature — cure at low temperature can be many hours",
    "Bore hole must be clean of all dust and debris before resin injection — residual dust prevents resin bond and causes pull-out failure",
    "Do not mix components from different proprietary systems without retesting — published load data is for the tested tie-resin combination only",
    "All cavity wall tie remediation is structural life-safety work — engineer specification and inspection mandatory",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — structural requirements for wall ties and tie spacing in cavity wall construction",
    "AS 3700 Table 4.6 — minimum tie density requirements for masonry wall construction",
    "AS/NZS 2699.1 — Built-in components for masonry construction — wall ties — material and dimensional requirements",
    "Manufacturer TDS — confirm published pull-out capacity for the specific substrate type and bore geometry before specifying",
    "Structural engineer's specification — all cavity wall tie remediation is life-safety structural work",
  ],
  suitableDefects: [
    "Corroded or missing original galvanised cavity wall ties confirmed by facade survey or borescope inspection",
    "Under-tied cavity wall construction where original tie density does not meet current AS 3700 requirements",
    "Delaminating or bulging outer masonry leaf caused by inadequate or corroded tie support",
    "Post-facade-survey remedial tie programme following structural engineer's assessment of tie condition and spacing",
  ],
  typicalSubstrates: [
    "Hollow clay brick — perforated and cellular brick — resin anchor through mesh sleeve is the only suitable tie system",
    "Concrete masonry block — hollow block outer leaf — mesh sleeve and resin injection required for void substrate",
    "Dense solid clay brick — resin anchor can also be used in solid masonry where mechanical expansion is not preferred",
    "NOT suitable: saturated or flooded masonry — substrate must be dry or within the resin manufacturer's moisture tolerance limit",
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

export function CavityTiesResinIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are chemical resin anchor cavity wall tie systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Chemical resin anchor cavity wall tie systems use a two-part adhesive resin — vinylester or epoxy — injected through a mesh sleeve into a drilled bore hole to bond a grade 316 stainless steel remedial tie into the masonry. This method is the preferred system for hollow, perforated and cellular masonry where mechanical expansion ties cannot achieve adequate interlock with the bore hole wall.
        </p>
        {expanded && (
          <>
            <p>
              The resin fills the bore hole and void geometry around the tie shaft — the mesh sleeve confines the resin within the void during cure, providing bond capacity regardless of the substrate void pattern. Vinylester resin is the standard specification for dry masonry substrates. Epoxy resin is specified where the substrate is damp, where maximum pull-out capacity is required, or where the engineer's design load cannot be met with vinylester at the available tie spacing.
            </p>
            <p>
              All cavity wall tie remediation is structural life-safety work. Bore hole cleanliness is the single most critical installation factor — residual drill dust in the bore hole acts as a release agent between the resin and the masonry, preventing bond development and causing pull-out failure. The bore must be blown clean with dry compressed air, wire-brushed, and blown again before resin injection. Engineer specification and inspection are mandatory for all cavity wall tie remedial programmes.
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

export function CavityTiesResinProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 product systems — chemical resin anchor cavity wall ties — scroll to view all</p>
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
              Side-by-side comparison of chemical resin anchor cavity wall tie systems. Engineer specification mandatory for all installations. Confirm pull-out capacity with current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Resin type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Substrate</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Moisture tolerance</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Bond strength</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Cost</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.resinType}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.substrate}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.moistureTolerance}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.bondStrength}</td>
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
