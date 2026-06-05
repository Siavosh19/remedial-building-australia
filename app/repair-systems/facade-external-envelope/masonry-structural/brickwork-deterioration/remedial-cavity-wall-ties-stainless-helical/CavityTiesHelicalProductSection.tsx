"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Helical"
  | "Stainless-316"
  | "Grout-in"
  | "Friction-DryFix"
  | "AS-3700"
  | "Cavity-wall"
  | "6mm"
  | "8mm"
  | "Hollow-substrate"
  | "Solid-substrate";

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
    accentColor: "#0369a1",
    name: "Grade 316 stainless helical tie — 6mm, grout-in",
    descriptionLine: "6mm diameter 316 SS helical bar cavity wall tie — grout-in installation — all masonry substrates including hollow and perforated — AS 3700",
    productType: "6mm 316 SS helical wall tie — grout-in — AS 3700 — remedial cavity wall tie",
    filterTags: ["Helical", "Stainless-316", "Grout-in", "AS-3700", "Cavity-wall", "6mm", "Hollow-substrate", "Solid-substrate"],
    techChips: [
      { label: "6mm helical", cls: "bg-sky-100 text-sky-800" },
      { label: "Grade 316 SS", cls: "bg-slate-100 text-slate-700" },
      { label: "Grout-in", cls: "bg-green-50 text-green-700" },
      { label: "All masonry substrates", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 3700", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "6mm diameter grade 316 stainless steel helical bar cavity wall tie for remedial installation into existing masonry. The helical profile allows the bar to be driven into a drilled bore hole and grouted in position using a cementitious or resin grout — the helical section provides mechanical interlock with the grout mass and with the bore hole wall. Used to replace corroded original wall ties discovered during a remedial investigation. Tie length must be specified to suit the actual cavity width — measure each wall before ordering.",
    technicalProperties: [
      "Suitable for hollow, perforated and cellular masonry — the grout fills the bore and encapsulates the helical section regardless of substrate void geometry",
      "Grade 316 stainless — no corrosion risk for the design life of the building in both coastal and inland environments",
      "Minimal disruption to masonry surface — drilled from the outer face, leaving only a small hole for drilling and grouting",
      "Well-proven Australian remedial tie system — widely specified and installed by experienced remedial contractors",
      "Standard lengths: 200mm, 250mm, 300mm, 350mm — custom lengths available — measure cavity width before ordering",
    ],
    limitations: [
      "Tie length must be confirmed for each wall section — the cavity width must be measured before ordering; incorrect tie length results in inadequate embedment depth",
      "Bore holes must be drilled at the correct angle and cleaned thoroughly — a dirty or misaligned bore will impair grout encapsulation and bond",
      "Cannot be used as a structural tie without engineer design — tie type, diameter, spacing and embedment must all be engineer-specified",
      "Grout must achieve adequate strength before the wall is loaded — confirm grout cure time with the contractor before removing any temporary propping",
    ],
    procurementSources: [
      { name: "Helifix Australia — specialist supply", url: "https://www.helifix.com.au" },
      { name: "Thor Helical — national distribution", url: "https://www.thorhelical.com.au" },
      { name: "Simpson Strong-Tie Australia", url: "https://www.strongtie.com.au" },
    ],
  },
  {
    fullLabel: "Helifix / Thor Helical / Ancon",
    brandUrl: "https://www.helifix.com.au",
    accentColor: "#b45309",
    name: "Grade 316 stainless helical tie — 8mm, heavy duty",
    descriptionLine: "8mm diameter 316 SS helical bar — grout-in installation — dense solid masonry — higher tensile capacity than 6mm — engineer-specified for high-wind or high-load applications",
    productType: "8mm 316 SS helical wall tie — heavy duty grout-in — AS 3700",
    filterTags: ["Helical", "Stainless-316", "Grout-in", "AS-3700", "Cavity-wall", "8mm", "Solid-substrate"],
    techChips: [
      { label: "8mm heavy duty", cls: "bg-amber-100 text-amber-800" },
      { label: "Grade 316 SS", cls: "bg-slate-100 text-slate-700" },
      { label: "High wind load", cls: "bg-red-50 text-red-700" },
      { label: "Grout-in", cls: "bg-green-50 text-green-700" },
      { label: "Engineer-specified only", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "8mm diameter grade 316 stainless steel helical bar cavity wall tie for heavy-duty remedial applications on Class 2 strata buildings. The larger 8mm diameter provides higher tensile and shear capacity than the 6mm tie — used where engineer design specifies an increased tie capacity per unit to meet higher out-of-plane wind load requirements, or for ties at closer centres in high-wind or high-rise applications. Always confirm with the structural engineer whether the project requires 6mm or 8mm ties.",
    technicalProperties: [
      "Higher tensile capacity than 6mm helical tie — suitable for high-wind-load facades and upper levels of taller Class 2 buildings",
      "Grade 316 stainless — full corrosion resistance for all Australian exposure classifications",
      "Same grout-in installation as 6mm — drilled from outer face, minimal surface disruption",
      "Can be specified to suit any required tie density pattern by adjusting spacing and embedment length",
      "Standard lengths: 200mm, 250mm, 300mm, 350mm, 400mm — confirm with engineer",
    ],
    limitations: [
      "Requires larger bore hole diameter than 6mm tie — confirm drill bit diameter with manufacturer; bore must be drilled to correct size to achieve required grout annulus",
      "Heavier and stiffer than 6mm bar — driving the 8mm bar into tight bore holes requires more controlled installation technique",
      "Higher cost than 6mm tie — only specify where engineer has determined the 8mm capacity is required",
      "Tie length must still be confirmed for each wall section — same measurement requirement as 6mm system",
    ],
    procurementSources: [
      { name: "Helifix Australia — specialist supply", url: "https://www.helifix.com.au" },
      { name: "Thor Helical — national distribution", url: "https://www.thorhelical.com.au" },
      { name: "Ancon Building Products Australia", url: "https://www.ancon.com.au" },
    ],
  },
  {
    fullLabel: "Helifix BowTie DryFix / Thor Helical DryFix",
    brandUrl: "https://www.helifix.com.au",
    accentColor: "#be123c",
    name: "Grade 316 stainless helical DryFix tie — friction install",
    descriptionLine: "316 SS helical DryFix tie — friction installation into solid masonry without grout — faster installation — pull-out testing mandatory — solid dense masonry only",
    productType: "316 SS helical DryFix tie — no grout friction install — AS 3700 — solid masonry only",
    filterTags: ["Helical", "Stainless-316", "Friction-DryFix", "AS-3700", "Cavity-wall", "6mm", "Solid-substrate"],
    techChips: [
      { label: "DryFix — no grout", cls: "bg-rose-100 text-rose-800" },
      { label: "Grade 316 SS", cls: "bg-slate-100 text-slate-700" },
      { label: "Solid masonry only", cls: "bg-amber-50 text-amber-700" },
      { label: "Pull-out test mandatory", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "Grade 316 stainless helical cavity wall tie for friction installation into solid masonry without grout — the DryFix helical thread creates mechanical interlock with the bore hole wall as the tie is driven in, without the need for a separate grout injection step. Provides faster installation in solid masonry substrates but is not suitable for hollow, perforated or cellular masonry substrates where a grout is required to fill voids around the tie. Pull-out testing is mandatory on all DryFix tie installations to confirm adequate capacity before proceeding.",
    technicalProperties: [
      "Faster installation than grout-in systems — no grout mixing, injection or cure wait time",
      "Grade 316 stainless — same long-term corrosion resistance as grouted helical ties",
      "Suitable for solid masonry bore holes where grout injection access is difficult",
      "Compact packaging — no grout component reduces delivery and storage requirements",
    ],
    limitations: [
      "Not suitable for hollow, perforated or cellular masonry — the DryFix tie relies on friction with the bore wall; voids behind the tie face will result in pull-out failure",
      "Pull-out testing is mandatory — every DryFix installation must be validated by on-site pull-out testing before the programme proceeds; the engineer specifies the minimum test load",
      "Bore hole preparation is critical — undersized or oversized bore holes will result in either inability to drive the tie or insufficient friction interlock",
      "Not suitable for friable or soft masonry — the installation force required can crack aged brick; use grout-in system in older or softer masonry",
    ],
    procurementSources: [
      { name: "Helifix Australia — BowTie DryFix supply", url: "https://www.helifix.com.au" },
      { name: "Thor Helical DryFix — national distribution", url: "https://www.thorhelical.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Helical", label: "Helical" },
  { id: "Stainless-316", label: "Stainless 316" },
  { id: "Grout-in", label: "Grout-in" },
  { id: "Friction-DryFix", label: "Friction / DryFix" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "Cavity-wall", label: "Cavity wall" },
  { id: "6mm", label: "6 mm bar" },
  { id: "8mm", label: "8 mm bar" },
  { id: "Hollow-substrate", label: "Hollow substrate" },
  { id: "Solid-substrate", label: "Solid substrate" },
];

const SYSTEM_COMPARISON: {
  product: string;
  diameter: string;
  installMethod: string;
  substrate: string;
  groutRequired: string;
  pulloutTest: string;
  primaryUse: string;
}[] = [
  {
    product: "6mm grout-in helical",
    diameter: "6 mm",
    installMethod: "Grout-in",
    substrate: "All masonry — hollow and solid",
    groutRequired: "Yes",
    pulloutTest: "Recommended",
    primaryUse: "Standard remedial tie — all masonry types",
  },
  {
    product: "8mm heavy-duty helical",
    diameter: "8 mm",
    installMethod: "Grout-in",
    substrate: "Dense solid masonry",
    groutRequired: "Yes",
    pulloutTest: "Recommended",
    primaryUse: "High-wind / high-load — engineer-specified",
  },
  {
    product: "DryFix friction tie",
    diameter: "6 mm",
    installMethod: "Friction — no grout",
    substrate: "Solid masonry only",
    groutRequired: "No",
    pulloutTest: "Mandatory",
    primaryUse: "Speed install — solid substrate — pull-out test required",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Replacement of corroded original galvanised or carbon steel cavity wall ties discovered during a remedial investigation on Class 2 strata buildings",
    "Supplementary tie installation where the original tie density is insufficient for the current wind load per AS 3700",
    "Tie replacement in cavity brick walls where original ties have been confirmed corroded by physical investigation",
    "Remedial tie installation at newly constructed openings, penetrations or alterations affecting the original tie layout",
    "All cavity wall tie remediation on coastal or high-exposure buildings where grade 316 SS is specified for service life",
  ],
  selectionCriteria: [
    "All remedial cavity wall tie work requires a structural engineer specification before work commences — tie type, diameter, length and spacing are engineer-designed",
    "Use grade 316 SS only — do not use 304 SS, carbon steel or galvanised ties in a remedial application; only 316 SS provides corrosion resistance for the full design life",
    "Confirm actual cavity width by physical measurement before ordering — tie length must achieve required embedment in both outer and inner leaves",
    "Use grout-in helical ties for hollow, perforated or cellular masonry — only use DryFix friction ties in confirmed solid dense masonry",
    "Confirm grout type (cementitious or resin) with the engineer for the specific substrate and temperature conditions",
    "Pull-out testing on a sample of installed ties is required before proceeding with the full installation",
  ],
  limitations: [
    "Do not commence remedial tie work without a structural engineer's tie specification — tie pattern, diameter and embedment depth are life-safety critical",
    "Do not substitute 8mm ties for 6mm (or vice versa) without engineer approval — capacity and bore requirements differ",
    "DryFix friction ties must not be used in hollow, perforated or cellular masonry — pull-out failure will result",
    "Do not use galvanised or 304 SS ties for remedial applications — these will corrode within the design life of the building",
    "Do not load the wall before grout has reached adequate strength — confirm cure time with the contractor",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — governs tie type, spacing, embedment and structural design of cavity wall tie systems",
    "AS 3700 Clause 4 — structural requirements for cavity wall tie design and spacing per wind load classification",
    "Helifix, Thor Helical and Simpson Strong-Tie all publish technical data and pull-out load tables for their specific tie systems — confirm data applies to the substrate type on the project",
    "Structural engineer certificate required — all remedial cavity wall tie work must be certified by the project structural engineer",
    "NCC Volume One — structural and facade requirements for Class 2 buildings",
  ],
  suitableDefects: [
    "Corroded original galvanised cavity wall ties identified during visual inspection, core sampling or cavity investigation",
    "Missing cavity wall ties at locations where original tie installation was deficient or ties were omitted",
    "Original tie density insufficient for the current wind load classification — additional ties required",
    "Ties corroded in coastal or highly corrosive environments where galvanised ties have reached end of service life",
    "Cavity wall tie deficiency identified during the building defect inspection process prior to remediation works",
  ],
  typicalSubstrates: [
    "Hollow clay brick — standard and face brick — grout-in helical tie required — DryFix is not suitable",
    "Perforated or cellular clay brick — grout-in helical tie required — grout fills voids around the helical bar",
    "Solid dense clay brick (compressive strength ≥15 MPa) — grout-in or DryFix friction tie may be used — confirm with engineer",
    "Solid concrete masonry block — grout-in or DryFix — confirm substrate condition and pull-out test before proceeding with DryFix",
    "Soft or friable historic masonry — grout-in helical tie only — DryFix and mechanical expansion ties are not suitable",
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

export function CavityTiesHelicalIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are stainless helical cavity wall tie systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Grade 316 stainless helical bar cavity wall tie systems are the most widely used remedial tie system in Australia for replacing corroded original galvanised cavity wall ties on Class 2 strata buildings. The drilled-in installation causes minimal disruption to the masonry face and the helical profile is effective in both solid and hollow masonry substrates when grouted. All cavity wall tie remediation is structural life-safety work — a structural engineer must be engaged before work commences.
        </p>
        {expanded && (
          <>
            <p>
              The 6mm grout-in helical tie is the standard specification for most remedial cavity wall tie work. The 8mm heavy-duty tie is only specified where the structural engineer determines that a higher per-tie capacity is required. The DryFix friction tie is an option for speed-of-installation in confirmed solid, dense masonry substrates — but pull-out testing is mandatory for every DryFix installation. Grade 316 SS is the only acceptable tie material for remedial applications — do not use 304 SS, galvanised or carbon steel ties.
            </p>
            <p>
              Tie length must be confirmed by physical measurement of the cavity width at each wall section before ordering. The standard tie lengths (200–350mm) cover most cavity widths encountered in Australian Class 2 construction — but variations do occur and must be checked.
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

export function CavityTiesHelicalProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 systems — 316 SS helical cavity wall ties — scroll to view all</p>
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
            {visibleProducts.length} system{visibleProducts.length !== 1 ? "s" : ""} — scroll to view all
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
              Side-by-side comparison of 316 SS helical cavity wall tie systems. All tie specifications must be confirmed with the structural engineer before ordering.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Diameter</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Install method</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Substrate</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Grout required</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Pull-out test</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.diameter}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.installMethod}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.substrate}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.groutRequired}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.pulloutTest}</td>
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
