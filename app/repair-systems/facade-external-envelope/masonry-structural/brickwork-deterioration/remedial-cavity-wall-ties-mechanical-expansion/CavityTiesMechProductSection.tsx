"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Mechanical-expansion"
  | "Stainless-316"
  | "Torque-set"
  | "AS-3700"
  | "Cavity-wall"
  | "Solid-substrate"
  | "Dense-brick"
  | "Concrete-block"
  | "No-grout"
  | "Pull-out-test";

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
    fullLabel: "Helifix / Ancon — specialist masonry fixings",
    brandUrl: "https://www.helifix.com.au",
    accentColor: "#b45309",
    name: "316 SS wedge expansion cavity wall tie — solid masonry",
    descriptionLine: "Grade 316 SS wedge-type mechanical expansion tie — no grout required — immediate load capacity — solid dense clay or concrete masonry only",
    productType: "Mechanical wedge expansion cavity wall tie — 316 SS — solid masonry — AS 3700",
    filterTags: ["Mechanical-expansion", "Stainless-316", "AS-3700", "Cavity-wall", "Solid-substrate", "Dense-brick", "No-grout", "Pull-out-test"],
    techChips: [
      { label: "Wedge expansion", cls: "bg-amber-100 text-amber-800" },
      { label: "No grout", cls: "bg-green-100 text-green-700" },
      { label: "Immediate load", cls: "bg-slate-100 text-slate-700" },
      { label: "Pull-out test req.", cls: "bg-red-100 text-red-700" },
    ],
    systemDescription:
      "Grade 316 stainless steel wedge-type mechanical expansion cavity wall tie for solid, dense masonry substrates. The tie body is inserted into a drilled bore hole and expanded by torquing the head — the wedge or sleeve expands against the bore hole wall, gripping the masonry by friction and mechanical interlock. No grout is required — the mechanical interlock provides the full pull-out resistance. Immediate load capacity after installation — unlike grouted systems, the tie is loaded as soon as it is torqued to the specified installation torque. Suitable for solid dense clay or concrete masonry only. Not for hollow, perforated or friable masonry substrates — the expansion force will either fail to grip or crack the masonry around the bore. The expansion force can crack aged or softer masonry — assess masonry condition carefully before specifying in pre-1970 brick. Bore hole diameter is critical — an oversize bore hole will not allow the expansion element to grip adequately. Pull-out testing on a sample of installed ties is mandatory before proceeding with the full installation programme.",
    technicalProperties: [
      "No grout required — faster installation than grouted helical or resin anchor systems in solid masonry",
      "Immediate load capacity — tie is load-ready as soon as torqued to the specified installation torque",
      "Grade 316 stainless steel — full corrosion resistance for all Australian exposure classifications",
      "Simple installation — no mixing, injecting, or cure time management required",
      "Bore hole diameter and depth control are the only critical installation variables",
      "Pull-out capacity confirmed by on-site testing at a sample of installed tie locations",
    ],
    limitations: [
      "Solid masonry only — do not use in hollow, perforated, or cracked brick; expansion force will fail to grip or crack masonry",
      "Pull-out testing mandatory — on-site testing on a sample of installed ties required to confirm grip in specific masonry condition",
      "Expansion force can crack aged or softer masonry — assess condition carefully in pre-1970 brick",
      "Bore hole diameter critical — oversize bore = inadequate grip; undersize bore = installation damage to masonry",
    ],
    procurementSources: [
      { name: "Helifix Australia — specialist masonry fixing supply", url: "https://www.helifix.com.au" },
      { name: "Ancon Building Products Australia — stainless masonry ties", url: "https://www.ancon.com.au" },
      { name: "Simpson Strong-Tie Australia — national distribution", url: "https://www.strongtie.com.au" },
      { name: "Confirm bore specification and tie length with supplier before ordering", url: "https://www.helifix.com.au" },
    ],
  },
  {
    fullLabel: "Rawlplug / Würth / Hilti — specialist supplier",
    brandUrl: "https://www.rawlplug.com.au",
    accentColor: "#0369a1",
    name: "316 SS sleeve expansion tie — torque-controlled installation",
    descriptionLine: "Grade 316 SS sleeve-type mechanical expansion tie — torque-controlled setting — consistent expansion force — immediate load capacity — calibrated torque wrench required",
    productType: "Torque-controlled sleeve expansion cavity wall tie — 316 SS — solid masonry — AS 3700",
    filterTags: ["Mechanical-expansion", "Stainless-316", "Torque-set", "AS-3700", "Cavity-wall", "Solid-substrate", "Dense-brick", "Concrete-block", "No-grout", "Pull-out-test"],
    techChips: [
      { label: "Torque-controlled", cls: "bg-sky-100 text-sky-800" },
      { label: "Sleeve expansion", cls: "bg-slate-100 text-slate-700" },
      { label: "Consistent force", cls: "bg-green-100 text-green-700" },
      { label: "Torque wrench req.", cls: "bg-red-100 text-red-700" },
    ],
    systemDescription:
      "Grade 316 stainless steel sleeve-type expansion tie for torque-controlled installation in solid masonry — the sleeve anchor is set by applying a specified installation torque that expands the sleeve against the bore hole wall to a defined clamping force. Torque-controlled installation provides consistent expansion force across the installation, reducing variability in pull-out capacity compared to impact-set or feel-set anchors. Must be used with a calibrated torque wrench at the engineer-specified installation torque — do not use an uncalibrated wrench or tighten by feel. Over-torquing can crack the masonry or strip the tie thread. Published load data is available from major suppliers for solid masonry substrates. Immediate load capacity — no grout cure time required. On-site pull-out testing should be completed even with torque control, to confirm capacity in the actual masonry condition. Solid substrate only — same restriction as all mechanical expansion ties.",
    technicalProperties: [
      "Torque-controlled setting — consistent expansion force reduces variability in pull-out capacity across installation",
      "Immediate load capacity — no grout cure time required; ties are load-ready after setting to specified torque",
      "Published load data available from major suppliers for solid masonry substrates",
      "Grade 316 stainless steel — full corrosion resistance for the full building service life",
      "Sleeve anchor profile provides broad bearing contact with bore wall — more consistent than wedge type on variable masonry",
      "Compatible with calibrated digital or click-type torque wrenches for on-site quality verification",
    ],
    limitations: [
      "Solid substrate only — not for hollow, perforated, or cracked masonry; same restriction as all mechanical expansion ties",
      "Calibrated torque wrench required — do not use uncalibrated wrench or tighten by feel; over-torque cracks masonry",
      "Pull-out testing still recommended — torque control does not eliminate need for on-site pull-out confirmation",
      "Not suitable for friable or weak historic brick — expansion force at bore hole wall will crack soft masonry",
    ],
    procurementSources: [
      { name: "Rawlplug Australia — national distribution", url: "https://www.rawlplug.com.au" },
      { name: "Würth Australia — national trade supply", url: "https://www.wurth.com.au" },
      { name: "Hilti Australia — national trade supply and technical support", url: "https://www.hilti.com.au" },
      { name: "Confirm masonry substrate rating and pull-out load table with supplier TDS before ordering", url: "https://www.rawlplug.com.au" },
    ],
  },
  {
    fullLabel: "Hilti / Fischer — engineering fixings supplier",
    brandUrl: "https://www.hilti.com.au",
    accentColor: "#7c3aed",
    name: "316 SS undercut expansion tie — high pull-out capacity solid masonry",
    descriptionLine: "Grade 316 SS undercut anchor tie — mechanical bearing interlock into undercut bore profile — highest capacity mechanical tie — specialist installation equipment required",
    productType: "Undercut expansion anchor cavity wall tie — 316 SS — dense solid masonry — high load — AS 3700",
    filterTags: ["Mechanical-expansion", "Stainless-316", "AS-3700", "Solid-substrate", "Dense-brick", "Concrete-block", "Pull-out-test"],
    techChips: [
      { label: "Undercut interlock", cls: "bg-purple-100 text-purple-800" },
      { label: "Highest capacity", cls: "bg-green-100 text-green-700" },
      { label: "Specialist equipment", cls: "bg-red-100 text-red-700" },
      { label: "High wind load", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Grade 316 stainless steel undercut anchor tie for high-capacity remedial wall tie applications in solid, dense masonry. The undercut anchor creates mechanical interlock by expanding into an undercut profile in the bore hole — providing higher characteristic pull-out capacity than standard sleeve expansion anchors in the same solid substrate. Pull-out resistance is by mechanical bearing against the undercut shoulder, not friction alone — less dependent on masonry surface condition than friction-type expansion anchors. Used for high-wind-load or structurally critical facade tie applications where standard expansion ties cannot achieve the engineer's required pull-out load at the specified tie spacing. Specialist manufacturer-specific installation equipment is required to create the undercut bore hole profile — standard rotary hammer drilling is insufficient. Solid substrate only — the undercut requires cutting into a dense, intact bore hole wall; not possible in hollow, perforated, or soft masonry. Highest cost of all mechanical expansion anchor types — only justified where the pull-out requirement cannot be achieved with standard expansion anchors at the specified spacing.",
    technicalProperties: [
      "Highest pull-out capacity of all mechanical anchor types in solid masonry — undercut interlock resists pull-out through bearing, not friction alone",
      "Load capacity less dependent on masonry surface condition than friction-type expansion anchors",
      "Reduces required tie density for high wind load applications — fewer ties at wider spacing can meet the structural requirement",
      "Grade 316 stainless steel — full long-term corrosion resistance for the full building service life",
      "Published load data available from Hilti and Fischer for dense solid masonry substrates",
      "Manufacturer-trained installation required — ensures correct undercut profile depth and tie setting",
    ],
    limitations: [
      "Specialist installation equipment required — undercut bore profile requires manufacturer-specific drill bit; standard rotary hammer is insufficient",
      "Solid substrate only — undercut cutting into dense intact bore hole wall not possible in hollow, perforated, or soft masonry",
      "Highest cost of all mechanical expansion anchor types — only justified where pull-out capacity requirement cannot be achieved with standard anchors at specified spacing",
      "Installation requires trained operatives — undercut process must be completed correctly or anchor will not achieve rated capacity",
    ],
    procurementSources: [
      { name: "Hilti Australia — HDA undercut anchor system, national trade supply", url: "https://www.hilti.com.au" },
      { name: "Fischer Fixings Australia — undercut anchor systems, national distribution", url: "https://www.fischer.com.au" },
      { name: "Confirm complete installation kit — drill bit and setting tool — with manufacturer before ordering", url: "https://www.hilti.com.au" },
      { name: "Engineer to confirm substrate suitability before specifying undercut anchor system", url: "https://www.fischer.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Mechanical-expansion", label: "Mechanical expansion" },
  { id: "Stainless-316", label: "Stainless 316" },
  { id: "Torque-set", label: "Torque-set" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "Cavity-wall", label: "Cavity wall" },
  { id: "Solid-substrate", label: "Solid substrate" },
  { id: "Dense-brick", label: "Dense brick" },
  { id: "Concrete-block", label: "Concrete block" },
  { id: "No-grout", label: "No grout" },
  { id: "Pull-out-test", label: "Pull-out test" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  mechanism: string;
  substrate: string;
  grout: string;
  capacity: string;
  cost: string;
  primaryUse: string;
}[] = [
  {
    product: "Wedge expansion tie",
    brand: "Helifix / Ancon",
    mechanism: "Wedge friction",
    substrate: "Solid masonry only",
    grout: "Not required",
    capacity: "Standard",
    cost: "Low",
    primaryUse: "Standard solid masonry — faster installation than grouted systems",
  },
  {
    product: "Sleeve torque-control tie",
    brand: "Rawlplug / Würth / Hilti",
    mechanism: "Sleeve friction — torque-set",
    substrate: "Solid masonry only",
    grout: "Not required",
    capacity: "Standard–high",
    cost: "Medium",
    primaryUse: "Where consistent pull-out capacity across installation is required",
  },
  {
    product: "Undercut expansion tie",
    brand: "Hilti / Fischer",
    mechanism: "Mechanical bearing — undercut",
    substrate: "Dense solid only",
    grout: "Not required",
    capacity: "High",
    cost: "High",
    primaryUse: "High wind load or critical facade — where standard expansion anchors cannot meet engineer's load requirement",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Remedial cavity wall tie installation in solid, dense fired clay brick outer leaf construction",
    "Remedial tie installation in solid concrete masonry block outer leaf cavity walls",
    "Supplementary tie installation to increase tie density in solid masonry where original tie density is insufficient",
    "High-wind-load facade tie remediation where engineer requires maximum pull-out capacity — undercut anchors",
    "Structural engineer-specified tie programme following cavity wall tie survey confirming solid masonry substrate",
  ],
  selectionCriteria: [
    "Confirm outer leaf masonry is solid and dense before specifying mechanical expansion ties — inspect and test masonry condition",
    "Use grouted helical or chemical resin anchor ties for hollow, perforated, or soft masonry — do not use mechanical expansion",
    "Select torque-controlled sleeve type where consistent pull-out capacity across multiple tie locations is required",
    "Select undercut anchor only where standard expansion anchor cannot achieve engineer's required pull-out load at specified spacing",
    "Pull-out testing is mandatory on all mechanical expansion tie installations — confirm minimum test load with engineer before commencing",
    "Engineer specification and inspection are mandatory for all cavity wall tie remediation — this is structural life-safety work",
  ],
  limitations: [
    "Mechanical expansion ties are not suitable for hollow, perforated, cellular, or soft masonry — use chemical resin anchor for those substrates",
    "Pull-out testing on a sample of installed ties is mandatory before proceeding with the full installation programme",
    "Do not use an uncalibrated torque wrench for torque-controlled ties — over-torque cracks masonry; under-torque reduces capacity",
    "Do not use in buildings constructed before 1970 without first confirming the brick compressive strength exceeds 15 MPa",
    "Engineer specification is mandatory — do not use manufacturer published tables as a substitute for engineering assessment",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — structural requirements for wall ties and spacing in cavity wall construction",
    "AS/NZS 2699.1 — Built-in components for masonry construction — wall ties — material and dimensional requirements",
    "NCC Volume One — Class 2 building structural requirements — masonry wall construction and tie requirements",
    "Manufacturer TDS and published load tables — confirm pull-out capacity for the specific substrate type, bore diameter, and embedment depth",
    "Structural engineer's specification — all cavity wall tie remediation is life-safety structural work requiring documented engineer involvement",
  ],
  suitableDefects: [
    "Corroded or missing original galvanised cavity wall ties in solid, dense masonry facades confirmed by inspection or survey",
    "Under-tied solid masonry outer leaf where original tie density does not meet current AS 3700 requirements",
    "Delaminating or bulging outer masonry leaf in solid brick construction where inadequate tie support is the cause",
    "Post-survey remedial tie programme in solid masonry following structural engineer's assessment and spacing design",
  ],
  typicalSubstrates: [
    "Solid dense fired clay brick — compressive strength confirmed ≥15 MPa — mechanical expansion is the preferred fast-track system",
    "Solid concrete masonry block — dense, solid-core block only — confirm compressive strength before specifying",
    "Modern face brick — dense, well-fired modern clay brick — suitable for all three mechanical expansion tie types",
    "NOT suitable: hollow clay brick, perforated brick, cellular block, or soft historic brick — use chemical resin anchor for these",
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

export function CavityTiesMechIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are mechanical expansion cavity wall tie systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Mechanical expansion cavity wall tie systems use grade 316 stainless steel ties set into drilled bore holes by expansion — wedge, sleeve, or undercut — without grout or resin. The expansion element grips the bore hole wall by friction or mechanical bearing, providing immediate load capacity after setting. They are the fastest remedial tie installation method in solid masonry, requiring no mixing, injection, or cure time.
        </p>
        {expanded && (
          <>
            <p>
              The critical limitation of mechanical expansion ties is that they are only effective in solid, dense masonry substrates. For hollow, perforated or cellular masonry, the expansion element cannot grip the bore hole wall adequately — the void pattern provides insufficient contact area for friction-based anchorage. In those substrates, chemical resin anchor ties are the correct system. Before specifying mechanical expansion ties, the masonry type must be confirmed by physical inspection.
            </p>
            <p>
              On-site pull-out testing is mandatory for all mechanical expansion tie installations. Published manufacturer load values are indicative only — the actual pull-out capacity depends on the specific masonry unit compressive strength, the bore hole quality, and the installation torque. Test results must be recorded and retained for engineering certification. All cavity wall tie remediation is structural life-safety work requiring engineer specification and inspection.
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

export function CavityTiesMechProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 product systems — mechanical expansion cavity wall ties — scroll to view all</p>
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
              Side-by-side comparison of mechanical expansion cavity wall tie systems. All mechanical expansion ties are limited to solid, dense masonry substrates. Engineer specification mandatory.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Mechanism</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Substrate</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Grout</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Capacity</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Relative cost</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.mechanism}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.substrate}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.grout}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.capacity}</td>
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
