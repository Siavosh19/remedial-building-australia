"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "InfraBuild"
  | "Lysaght-BlueScope"
  | "State-fabricator"
  | "Angle"
  | "Duplex"
  | "HDG-epoxy"
  | "AS-3700"
  | "AS-4100"
  | "AS-NZS-4680"
  | "Structural"
  | "Inland";

type Supplier = {
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

const SUPPLIERS: Supplier[] = [
  {
    fullLabel: "InfraBuild",
    brandUrl: "https://www.infrabuild.com",
    accentColor: "#0369a1",
    name: "InfraBuild — Duplex coated steel angle lintel — 75×75×6 mm standard",
    descriptionLine: "Hot-dip galvanised + epoxy paint duplex angle lintel — 75×75×6 mm standard — AS/NZS 4680 + AS 4100 — national steel merchant — structural engineer to specify section and bearing",
    productType: "Duplex coated steel angle lintel — HDG + epoxy — AS/NZS 4680 — national distribution",
    filterTags: ["InfraBuild", "Angle", "Duplex", "HDG-epoxy", "AS-3700", "AS-4100", "AS-NZS-4680", "Structural", "Inland"],
    techChips: [
      { label: "HDG + epoxy paint", cls: "bg-sky-100 text-sky-800" },
      { label: "AS/NZS 4680", cls: "bg-slate-100 text-slate-700" },
      { label: "Inland only", cls: "bg-amber-100 text-amber-800" },
      { label: "Engineer required", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "InfraBuild supplies hot-dip galvanised equal angle sections compliant with AS/NZS 4680, finished with an epoxy paint overcoat to form a duplex coating system for masonry lintel applications. The duplex system — hot-dip galvanising plus epoxy paint — provides a significantly longer service life than galvanising alone: typically 40–50 years in inland C2/C3 environments. The 75×75×6 mm equal angle is the standard section for masonry openings up to approximately 2–2.5 m, but section selection must be confirmed by a structural engineer per AS 4100 for the actual span, load and bearing conditions. InfraBuild has national distribution through steel merchant branches — confirm branch stock before specifying. Not suitable for coastal or C4/C5 environments where stainless steel lintels are required.",
    technicalProperties: [
      "Duplex coating system — HDG (AS/NZS 4680, 600 g/m² minimum) plus epoxy paint overcoat — significantly extends service life over galvanised-only systems",
      "40–50 year inland service life in C2/C3 inland environments when the epoxy overcoat is maintained — significantly longer than galvanised-only (15–25 yr)",
      "AS/NZS 4680 compliant hot-dip galvanising — minimum zinc coating mass confirmed by certification from InfraBuild",
      "National distribution through InfraBuild steel merchant branches — short lead times for standard 75×75×6 EA sections",
      "Suitable for masonry opening spans up to approximately 2–3 m when selected by a structural engineer for the actual load and span",
      "Compatible with Alcore composite, lead or aluminium cavity flashings above — confirm compatibility with project flashing type",
    ],
    limitations: [
      "Not suitable for coastal, marine or C4/C5 corrosivity environments — specify grade 316L stainless steel angle lintel for all coastal applications",
      "Section size must be designed by a structural engineer per AS 4100 — do not assume 75×75×6 is adequate without engineering confirmation for the actual span and load",
      "Bearing length at each end must comply with the structural engineer's specification and AS 3700 — minimum 100 mm typical but confirm for project",
      "Epoxy overcoat requires maintenance inspection — duplex system life depends on the integrity of the paint overcoat; any damage to the paint film should be touched up",
      "Temporary propping of masonry above the opening is mandatory during lintel replacement works",
    ],
    procurementSources: [
      { name: "InfraBuild Steel — national steel merchant branches", url: "https://www.infrabuild.com" },
      { name: "InfraBuild branch locator — confirm local stock", url: "https://www.infrabuild.com/contact" },
    ],
  },
  {
    fullLabel: "Lysaght / BlueScope",
    brandUrl: "https://www.lysaght.com",
    accentColor: "#b45309",
    name: "Lysaght / BlueScope — HDG + epoxy angle lintel — standard angle sections",
    descriptionLine: "Hot-dip galvanised + epoxy paint angle lintel — standard equal angle sections — national structural merchant — AS/NZS 4680 compliant — engineer to confirm section and bearing design",
    productType: "Duplex coated steel angle lintel — HDG + epoxy — BlueScope/Lysaght sections — national distribution",
    filterTags: ["Lysaght-BlueScope", "Angle", "Duplex", "HDG-epoxy", "AS-3700", "AS-4100", "AS-NZS-4680", "Structural", "Inland"],
    techChips: [
      { label: "HDG + epoxy", cls: "bg-amber-100 text-amber-800" },
      { label: "BlueScope steel", cls: "bg-sky-50 text-sky-700" },
      { label: "Inland only", cls: "bg-amber-100 text-amber-800" },
      { label: "National distribution", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Lysaght and BlueScope structural steel sections — including equal angle (EA) — are available hot-dip galvanised to AS/NZS 4680 with an epoxy paint overcoat applied by merchant or fabricator to form a duplex coating system for masonry lintel applications. Lysaght/BlueScope sections are widely stocked by national structural steel merchants and distributors across all Australian states. The duplex system delivers 40–50 year inland service life in C2/C3 environments. A structural engineer must confirm the section size, bearing length and installation requirements per AS 4100 and AS 3700 before ordering. Not suitable for coastal or marine-influenced environments — confirm C2/C3 corrosivity classification for the project site before specifying duplex over stainless.",
    technicalProperties: [
      "HDG + epoxy paint duplex system — zinc coating to AS/NZS 4680 standard with epoxy paint overcoat for extended service life",
      "40–50 year estimated inland service life — substantially longer than galvanised-only systems in C2/C3 environments",
      "BlueScope-origin steel sections — quality-assured Australian steel production from a major domestic manufacturer",
      "Broad national distribution through structural steel merchants — readily available in all major Australian cities and regions",
      "Full range of standard equal angle sections available — engineer can select the appropriate section from the standard range",
      "Compatible with standard masonry cavity flashings above — confirm flashing type with the engineer for the project",
    ],
    limitations: [
      "Not suitable for coastal, marine or C4/C5 corrosivity environments — stainless steel angle lintel required for coastal applications",
      "Structural engineer must design and certify lintel section, span and bearing — do not select section without engineering confirmation",
      "Epoxy overcoat must be inspected and touched up if damaged during installation — the paint film is essential to the duplex system life",
      "Bearing zone masonry must be assessed for condition before installation — corroded lintel may have damaged the bearing masonry",
    ],
    procurementSources: [
      { name: "Lysaght / BlueScope — structural steel sections", url: "https://www.lysaght.com" },
      { name: "BlueScope Distribution — national steel merchant network", url: "https://www.bluescopedistribution.com.au" },
    ],
  },
  {
    fullLabel: "State-based masonry lintel fabricators",
    brandUrl: "#",
    accentColor: "#7c3aed",
    name: "State-based masonry lintel fabricators — cut-to-length duplex coated angle lintels",
    descriptionLine: "Cut-to-length duplex coated angle lintels — local fabrication to engineer's drawings — HDG + paint finish to project specification — state-based fabrication and supply",
    productType: "Duplex coated steel angle lintel — cut to length — local fabrication — engineer's drawings",
    filterTags: ["State-fabricator", "Angle", "Duplex", "HDG-epoxy", "AS-3700", "AS-4100", "Structural", "Inland"],
    techChips: [
      { label: "Cut to length", cls: "bg-violet-100 text-violet-800" },
      { label: "Local fabrication", cls: "bg-green-50 text-green-700" },
      { label: "Engineer's drawings", cls: "bg-slate-100 text-slate-700" },
      { label: "Inland only", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "State-based masonry lintel fabricators supply cut-to-length duplex coated angle lintels fabricated to the structural engineer's drawings. This approach is used when the required lintel length or section size is not available as standard stock, or when the project requires lintels fabricated to precise dimensions with a specified duplex coating system. The fabricator hot-dip galvanises the cut sections and applies an epoxy paint overcoat per the specification. Request a fabrication and coating certificate confirming AS/NZS 4680 compliance before accepting delivery. Confirm the fabricator's HDG bath dimensions are adequate for the required lintel lengths before placing an order. Not suitable for coastal environments — specify stainless steel for coastal applications.",
    technicalProperties: [
      "Cut to exact length — avoids wastage and ensures consistent bearing length at both ends per the engineer's specification",
      "Fabricated to engineer's drawings — section, length, bearing plates and any intermediate stiffeners per the structural design",
      "HDG + epoxy paint duplex system applied by fabricator — confirm coating specification in the purchase order",
      "Short lead times for standard section duplex lintels — typically 5–10 business days from standard stock",
      "Local supply and fabrication — reduces transport cost and lead time compared to national merchant ordering for custom lengths",
    ],
    limitations: [
      "Confirm the fabricator's HDG bath can accommodate the required lintel lengths before ordering — bath length limits maximum lintel length",
      "Request fabrication and coating certificate confirming AS/NZS 4680 compliance — do not accept delivery without certification",
      "Not suitable for coastal environments — confirm site corrosivity classification is C2/C3 before specifying duplex instead of stainless",
      "Structural engineer's drawings must be provided to the fabricator before ordering — do not order without a confirmed structural design",
    ],
    procurementSources: [
      { name: "State-based structural steel fabricators — confirm local supplier", url: "https://www.infrabuild.com" },
      { name: "Masonry lintel specialists — confirm local availability by state", url: "https://www.infrabuild.com" },
    ],
  },
];

const SYSTEM_COMPARISON: {
  supplier: string;
  product: string;
  coating: string;
  sections: string;
  life: string;
  distribution: string;
  keyFeature: string;
  primaryUse: string;
}[] = [
  {
    supplier: "InfraBuild",
    product: "Duplex angle lintel",
    coating: "HDG + epoxy paint",
    sections: "75×75×6 mm EA standard",
    life: "40–50 yr inland C2/C3",
    distribution: "National — steel merchant branches",
    keyFeature: "AS/NZS 4680 certified HDG",
    primaryUse: "Standard masonry opening — inland",
  },
  {
    supplier: "Lysaght / BlueScope",
    product: "Duplex angle lintel",
    coating: "HDG + epoxy paint",
    sections: "Standard EA range",
    life: "40–50 yr inland C2/C3",
    distribution: "National — structural merchant",
    keyFeature: "BlueScope-origin steel",
    primaryUse: "General masonry lintel — inland",
  },
  {
    supplier: "State fabricators",
    product: "Cut-to-length duplex angle",
    coating: "HDG + epoxy — per spec",
    sections: "Engineer-specified",
    life: "40–50 yr inland C2/C3",
    distribution: "State-based — local fabrication",
    keyFeature: "Exact length — no waste",
    primaryUse: "Non-standard spans or sections",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Replacement of corroded galvanised steel angle lintels above window and door openings in inland Class 2 strata building facades",
    "New lintel installation at inland buildings where an extended duplex service life is required over galvanised-only systems",
    "Masonry opening support for standard window and door openings in C2/C3 inland corrosivity environments",
    "Lintel replacements identified during facade remediation, cavity flashing replacement or salt attack repair scopes on inland buildings",
    "Buildings where the owner requires a 40–50 year replacement-free lintel life in an inland environment",
  ],
  selectionCriteria: [
    "Confirm site corrosivity classification is C2/C3 inland — if the building is within 1 km of the coast or classified C4/C5, specify grade 316L stainless steel angle lintel instead",
    "Structural engineer must design and certify the lintel section, bearing length and installation requirements per AS 4100 and AS 3700",
    "Confirm section availability from the nominated merchant before specifying — standard 75×75×6 EA is widely stocked but confirm for non-standard sections",
    "Request AS/NZS 4680 compliance certificate from the supplier confirming zinc coating mass before accepting delivery",
    "Confirm the epoxy overcoat has been applied before delivery — inspect the paint film before installation",
    "Temporary propping of masonry above the opening must be installed before the existing lintel is removed",
  ],
  limitations: [
    "Do not specify duplex angle lintels for coastal, marine or C4/C5 corrosivity environments — use grade 316L stainless steel angle lintels",
    "Do not install without a structural engineer's signed design — section size and bearing design must be confirmed for the actual loads",
    "Do not reduce bearing length below the engineer's specification — insufficient bearing causes masonry cracking at the lintel ends",
    "Temporary propping is mandatory during lintel replacement — do not remove the existing lintel before propping the masonry above",
    "Do not paint over a damaged or rusted existing galvanised lintel as a substitute for replacement — the lintel must be replaced",
  ],
  standardsNotes: [
    "AS 4100 — Steel Structures — primary design standard for lintel section design; engineer must confirm section capacity for span and load",
    "AS 3700 — Masonry Structures — governs bearing zone design, lintel deflection limits, and masonry lintel span requirements",
    "AS/NZS 4680 — Hot-dip galvanised coatings — specifies minimum zinc coating mass (600 g/m² for structural members); request MTC before accepting",
    "NCC Volume One — structural and durability requirements for Class 2 building facades; confirm C2/C3 corrosivity classification for the site",
    "Structural engineer certificate required for all lintel replacements on Class 2 strata buildings",
  ],
  suitableDefects: [
    "Corroded galvanised steel angle lintels in inland buildings — red rust, section loss or mortar cracking above the lintel",
    "Failed galvanised lintels where section loss has caused deflection, mortar cracking or masonry movement above the opening",
    "Lintels with insufficient bearing length — masonry cracking at lintel ends indicates the bearing zone is overstressed",
    "Lintels identified for replacement during cavity flashing replacement or salt attack remediation scope",
    "Deflecting or bowing galvanised lintels above doors or windows in inland building facades",
  ],
  typicalSubstrates: [
    "Clay brick masonry in C2/C3 inland environments — confirm bearing zone is in sound condition before installation",
    "Concrete masonry unit (block) walls in inland environments — confirm block compressive strength for bearing stress",
    "Calcium silicate brick masonry in inland locations — confirm bearing zone condition with the structural engineer",
    "All masonry substrates confirmed as C2/C3 inland corrosivity classification",
    "NOT suitable for coastal buildings or buildings within 1 km of the coast — specify stainless steel in those environments",
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

export function DuplexAngleLintelIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What is a duplex coated steel angle lintel?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          A duplex coated steel angle lintel is a hot-dip galvanised (HDG) equal angle steel section with an epoxy paint overcoat applied over the zinc coating. The combination of HDG zinc layer and an epoxy paint topcoat — the &quot;duplex system&quot; — provides a service life of 40–50 years in inland C2/C3 environments, substantially longer than the 15–25 years achievable with hot-dip galvanising alone. Duplex coated angle lintels are the standard specification for masonry lintel replacement on Class 2 strata buildings in non-coastal Australian environments.
        </p>
        {expanded && (
          <>
            <p>
              The duplex system works because zinc and epoxy paint each protect the steel by different mechanisms: the zinc coating provides cathodic protection (the zinc sacrificially corrodes in preference to the steel), while the epoxy paint acts as a barrier coat that prevents moisture and oxygen from reaching the zinc surface. When both systems are intact, the rate of zinc consumption is dramatically reduced — extending the overall system life. The critical requirement is that the epoxy paint film must be inspected and touched up during the building&apos;s life to maintain the barrier function.
            </p>
            <p>
              Structural engineer involvement is mandatory for all lintel replacements on Class 2 strata buildings. The engineer must confirm the lintel section (typically 75×75×6 mm EA for spans to 2 m, larger sections for longer spans), the minimum bearing length at each end, and the temporary propping requirements during replacement. The duplex system does not affect the structural capacity — it is a corrosion protection system applied to a standard carbon steel section designed per AS 4100.
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

export function DuplexAngleLintelProductSection() {
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

  const visibleSuppliers =
    activeFilters.size === 0
      ? SUPPLIERS
      : SUPPLIERS.filter((s) =>
          Array.from(activeFilters).every((f) => s.filterTags.includes(f))
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
              <TechCard icon={<BookOpen size={15} />} title="Standards &amp; Notes" items={TECH_INFO.standardsNotes} style="bullet" />
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
            <p className="mt-1 text-sm text-slate-500">3 supplier systems — duplex coated steel angle lintels — scroll to view all</p>
          </div>
        </div>

        {/* Filter chips */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {(["InfraBuild", "Lysaght-BlueScope", "State-fabricator", "Angle", "Duplex", "HDG-epoxy", "AS-4100", "AS-NZS-4680", "Inland"] as FilterTag[]).map((f) => {
            const active = activeFilters.has(f);
            return (
              <button
                key={f}
                type="button"
                onClick={() => toggleFilter(f)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                  active
                    ? "border-sky-950 bg-sky-950 text-white"
                    : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
                }`}
              >
                {f.replace(/-/g, " ")}
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
            {visibleSuppliers.length} supplier{visibleSuppliers.length !== 1 ? "s" : ""} — scroll to view all
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
          {visibleSuppliers.map((supplier) => (
            <div
              key={supplier.name}
              className="flex-none"
              style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}
            >
              <div
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                style={{ borderLeftWidth: 4, borderLeftColor: supplier.accentColor }}
              >
                {/* Card header */}
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                      {supplier.fullLabel}
                    </span>
                    <div className="flex shrink-0 items-center gap-1">
                      {supplier.tdsUrl && (
                        <a
                          href={supplier.tdsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                        >
                          <FileText size={9} /> TDS
                        </a>
                      )}
                      {supplier.brandUrl !== "#" && (
                        <a
                          href={supplier.brandUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                        >
                          <ExternalLink size={9} /> Brand Site
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{supplier.name}</h3>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{supplier.productType}</p>
                  </div>
                  <CollapsibleCardDetails
                    text={supplier.descriptionLine}
                    chips={supplier.techChips}
                  />
                </div>

                {/* System Description */}
                <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
                  <CollapsibleDescription text={supplier.systemDescription} />
                </div>

                {/* Technical Properties & Limitations */}
                <div className="space-y-3 px-5 py-4">
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-green-700">Technical Properties</p>
                    <CollapsibleList items={supplier.technicalProperties} icon="check" limit={3} />
                  </div>
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">Limitations</p>
                    <CollapsibleList items={supplier.limitations} icon="x" limit={3} />
                  </div>
                </div>

                {/* Procurement Sources */}
                <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3">
                  <CollapsibleSources sources={supplier.procurementSources} />
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
              Side-by-side comparison of duplex coated steel angle lintel systems. Confirm all selections against the structural engineer&apos;s design and request AS/NZS 4680 certificates before accepting delivery.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coating</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Sections</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Service life</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Distribution</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key feature</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.supplier} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.supplier}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coating}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.sections}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.life}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.distribution}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.keyFeature}</td>
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
