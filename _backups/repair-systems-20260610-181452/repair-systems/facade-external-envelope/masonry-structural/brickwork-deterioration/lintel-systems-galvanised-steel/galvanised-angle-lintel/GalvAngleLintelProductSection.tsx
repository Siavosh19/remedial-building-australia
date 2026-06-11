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
  | "HDG-only"
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
    name: "InfraBuild — Hot-dip galvanised steel angle lintel — AS/NZS 4680 — 600 g/m² zinc",
    descriptionLine: "Hot-dip galvanised steel angle lintel — AS/NZS 4680 compliant — 600 g/m² minimum zinc coating — national steel merchant — engineer to confirm section and bearing",
    productType: "Hot-dip galvanised steel angle lintel — HDG only — AS/NZS 4680 — national distribution",
    filterTags: ["InfraBuild", "Angle", "HDG-only", "AS-3700", "AS-4100", "AS-NZS-4680", "Structural", "Inland"],
    techChips: [
      { label: "HDG only", cls: "bg-sky-100 text-sky-800" },
      { label: "AS/NZS 4680", cls: "bg-slate-100 text-slate-700" },
      { label: "15–25 yr inland", cls: "bg-amber-100 text-amber-800" },
      { label: "Engineer required", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "InfraBuild supplies hot-dip galvanised equal angle sections compliant with AS/NZS 4680 with a minimum zinc coating of 600 g/m² for structural members. Galvanised-only angle lintels are the standard entry-level masonry lintel specification for inland C2/C3 environments where a 15–25 year service life is acceptable. This is a single-layer protective system with no paint overcoat — the zinc coating provides cathodic protection for the steel but without the additional barrier protection of a duplex paint system. Service life is significantly shorter than duplex coated angle lintels (40–50 years). The 75×75×6 mm equal angle is the typical standard section, but section selection must be confirmed by a structural engineer per AS 4100. Not suitable for coastal or C4/C5 environments — specify duplex coated or stainless steel lintels for those environments.",
    technicalProperties: [
      "AS/NZS 4680 compliant hot-dip galvanising — minimum 600 g/m² zinc coating on structural sections; request MTC from supplier before accepting delivery",
      "Standard entry-level masonry lintel specification for inland C2/C3 environments — widely stocked and competitively priced",
      "National distribution through InfraBuild steel merchant branches — short lead times for standard 75×75×6 EA sections",
      "Cathodic protection from zinc coating — zinc sacrificially corrodes in preference to the underlying steel",
      "Suitable for masonry openings when engineer confirms section capacity for the actual span and load",
    ],
    limitations: [
      "Shorter service life than duplex coated systems — HDG only provides 15–25 years inland; specify duplex coated angle for a 40–50 year system life",
      "Not suitable for coastal, marine or C4/C5 corrosivity environments — specify duplex coated or grade 316L stainless steel angle lintels",
      "Structural engineer must design and certify the lintel section, bearing length and installation requirements per AS 4100 and AS 3700",
      "No paint overcoat — any damage to the zinc coating is not protected by a secondary barrier; zinc depletion accelerates in areas of coating damage",
      "Temporary propping of masonry above is mandatory before removing the existing lintel",
    ],
    procurementSources: [
      { name: "InfraBuild Steel — national steel merchant branches", url: "https://www.infrabuild.com" },
      { name: "InfraBuild branch locator — confirm local HDG angle stock", url: "https://www.infrabuild.com/contact" },
    ],
  },
  {
    fullLabel: "Lysaght / BlueScope",
    brandUrl: "https://www.lysaght.com",
    accentColor: "#b45309",
    name: "Lysaght / BlueScope — Hot-dip galvanised angle sections — structural merchant — national",
    descriptionLine: "Hot-dip galvanised equal angle sections — AS/NZS 4680 compliant — national structural steel merchant — BlueScope-origin steel — engineer to confirm section and bearing design",
    productType: "Hot-dip galvanised steel angle lintel — HDG only — BlueScope/Lysaght — national distribution",
    filterTags: ["Lysaght-BlueScope", "Angle", "HDG-only", "AS-3700", "AS-4100", "AS-NZS-4680", "Structural", "Inland"],
    techChips: [
      { label: "HDG only", cls: "bg-amber-100 text-amber-800" },
      { label: "BlueScope steel", cls: "bg-sky-50 text-sky-700" },
      { label: "15–25 yr inland", cls: "bg-amber-100 text-amber-800" },
      { label: "National distribution", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Lysaght and BlueScope structural steel equal angle sections are available hot-dip galvanised to AS/NZS 4680 and are widely stocked through national structural steel merchants across all Australian states. BlueScope-origin steel with HDG provides a standard galvanised-only lintel system for inland C2/C3 masonry opening applications where the shorter 15–25 year service life is acceptable to the owner. The structural engineer must confirm the section size, bearing length and installation requirements per AS 4100 and AS 3700 before ordering. Not suitable for coastal or marine-influenced environments — confirm C2/C3 site corrosivity before specifying galvanised over duplex coated.",
    technicalProperties: [
      "BlueScope-origin steel sections — quality-assured Australian steel production from a major domestic manufacturer",
      "AS/NZS 4680 compliant HDG coating — minimum zinc coating mass on structural sections; confirm with MTC",
      "Broad national distribution through structural steel merchants — readily available in all major Australian cities",
      "Standard entry-level galvanised lintel for inland masonry openings — cost-effective for typical residential strata applications",
      "Full range of equal angle sections — engineer selects appropriate section from the standard range",
    ],
    limitations: [
      "Shorter service life than duplex coated systems — HDG only; specify duplex coated angle where 40–50 year life is required",
      "Not suitable for coastal or C4/C5 environments — stainless or duplex coated lintels required for coastal applications",
      "Structural engineer must confirm section, bearing and installation requirements before ordering",
      "No secondary paint overcoat — any zinc coating damage is unprotected",
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
    name: "State-based masonry lintel fabricators — cut-to-length galvanised angle lintels",
    descriptionLine: "Cut-to-length hot-dip galvanised angle lintels — local fabrication to engineer's drawings — AS/NZS 4680 HDG — state-based fabrication and supply",
    productType: "Hot-dip galvanised steel angle lintel — cut to length — local fabrication — engineer's drawings",
    filterTags: ["State-fabricator", "Angle", "HDG-only", "AS-3700", "AS-4100", "Structural", "Inland"],
    techChips: [
      { label: "Cut to length", cls: "bg-violet-100 text-violet-800" },
      { label: "Local fabrication", cls: "bg-green-50 text-green-700" },
      { label: "HDG only", cls: "bg-amber-100 text-amber-800" },
      { label: "Engineer's drawings", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "State-based masonry lintel fabricators supply cut-to-length hot-dip galvanised angle lintels fabricated to the structural engineer's drawings. This approach is used when the required lintel length is not available as standard merchant stock, or when the project requires lintels fabricated to precise dimensions. The fabricator cuts the angle sections to the required lengths and hot-dip galvanises them per AS/NZS 4680. Request a fabrication and coating certificate confirming compliance before accepting delivery. Confirm the fabricator's HDG bath can accommodate the required lintel lengths before placing an order. Not suitable for coastal environments — specify stainless or duplex coated for coastal applications.",
    technicalProperties: [
      "Cut to exact length — consistent bearing length at both ends per the engineer's specification",
      "Fabricated to engineer's drawings — section, length and bearing requirements per the structural design",
      "AS/NZS 4680 HDG applied by fabricator — confirm coating specification in the purchase order",
      "Short lead times for standard section galvanised lintels — typically 3–7 business days from standard stock",
      "Local supply reduces transport cost and lead time for custom-length lintels",
    ],
    limitations: [
      "Confirm the fabricator's HDG bath can accommodate the required lintel lengths before ordering",
      "Request fabrication certificate confirming AS/NZS 4680 compliance before accepting delivery",
      "Not suitable for coastal environments — confirm site corrosivity is C2/C3 inland before specifying galvanised-only",
      "Structural engineer's drawings must be provided before ordering",
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
    product: "HDG angle lintel",
    coating: "HDG only — AS/NZS 4680",
    sections: "75×75×6 mm EA standard",
    life: "15–25 yr inland C2/C3",
    distribution: "National — steel merchant",
    keyFeature: "600 g/m² zinc coating",
    primaryUse: "Standard inland masonry opening",
  },
  {
    supplier: "Lysaght / BlueScope",
    product: "HDG angle lintel",
    coating: "HDG only — AS/NZS 4680",
    sections: "Standard EA range",
    life: "15–25 yr inland C2/C3",
    distribution: "National — structural merchant",
    keyFeature: "BlueScope-origin steel",
    primaryUse: "General inland masonry lintel",
  },
  {
    supplier: "State fabricators",
    product: "Cut-to-length HDG angle",
    coating: "HDG only — per spec",
    sections: "Engineer-specified",
    life: "15–25 yr inland C2/C3",
    distribution: "State-based — local fabrication",
    keyFeature: "Exact length — no waste",
    primaryUse: "Non-standard spans",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Replacement of corroded or failed galvanised steel angle lintels above window and door openings in inland Class 2 strata building facades",
    "New lintel installation at inland buildings where the owner accepts a 15–25 year service life before the next replacement cycle",
    "Masonry opening support for standard window and door openings in C2/C3 inland corrosivity environments",
    "Lintel replacements where budget constraints make galvanised-only acceptable and the owner accepts the shorter service life",
    "Temporary or short-term masonry opening support in inland buildings pending a full remediation programme",
  ],
  selectionCriteria: [
    "Confirm site corrosivity is C2/C3 inland — specify duplex coated for 40–50 year life, or stainless for coastal/C4/C5 environments",
    "Discuss service life with the owner — galvanised-only provides 15–25 years inland; duplex coated provides 40–50 years at moderate additional cost",
    "Structural engineer must design and certify lintel section, bearing and installation per AS 4100 and AS 3700",
    "Request AS/NZS 4680 compliance certificate confirming zinc coating mass before accepting delivery",
    "Confirm section availability from the nominated merchant before specifying",
    "Temporary propping of masonry above is mandatory before removing the existing lintel",
  ],
  limitations: [
    "Shorter service life than duplex coated — HDG only provides 15–25 years inland; consider duplex coated for new installations",
    "Not suitable for coastal, marine or C4/C5 environments — duplex coated or stainless steel required",
    "No secondary protective layer — zinc depletion is not slowed by a paint overcoat",
    "Structural engineer sign-off is mandatory — do not install without a confirmed structural design",
    "Temporary propping is mandatory during lintel replacement",
  ],
  standardsNotes: [
    "AS 4100 — Steel Structures — primary design standard for lintel section design",
    "AS 3700 — Masonry Structures — governs bearing zone design, lintel deflection limits and masonry lintel span requirements",
    "AS/NZS 4680 — Hot-dip galvanised coatings — minimum zinc coating 600 g/m² for structural members; request MTC before accepting",
    "NCC Volume One — structural and durability requirements for Class 2 building facades",
    "Structural engineer certificate required for all lintel replacements on Class 2 strata buildings",
  ],
  suitableDefects: [
    "Corroded galvanised steel angle lintels in inland buildings — red rust, section loss or mortar cracking above the lintel",
    "Failed galvanised lintels approaching end of service life in inland locations — replacement with new galvanised or upgraded to duplex",
    "Lintels with insufficient bearing length — masonry cracking at ends indicates the bearing zone is overstressed",
    "Lintels identified for replacement during cavity flashing replacement or masonry remediation scope",
  ],
  typicalSubstrates: [
    "Clay brick masonry in C2/C3 inland environments — confirm bearing zone is in sound condition",
    "Concrete masonry unit walls in inland environments — confirm block compressive strength for bearing stress",
    "Calcium silicate brick masonry in inland locations — confirm bearing zone condition with structural engineer",
    "NOT suitable for coastal buildings — specify duplex coated or stainless for coastal environments",
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

export function GalvAngleLintelIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What is a hot-dip galvanised steel angle lintel?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          A hot-dip galvanised steel angle lintel is a plain hot-dip galvanised (HDG) equal angle steel section with no paint overcoat, used to support masonry above window and door openings in inland buildings. The HDG zinc coating provides cathodic protection for the underlying steel — the zinc sacrificially corrodes in preference to the carbon steel. Without a paint overcoat, galvanised-only lintels have a shorter service life than duplex coated systems: typically 15–25 years in inland C2/C3 environments.
        </p>
        {expanded && (
          <>
            <p>
              Galvanised-only angle lintels are the standard entry-level specification for inland masonry openings. They are lower in cost than duplex coated systems but require replacement sooner. When advising owners on replacement specifications, the lifecycle cost of duplex coated systems (40–50 year life) should be compared with the total cost of two galvanised-only replacement cycles. In many cases, duplex coated systems deliver better value over the building&apos;s life despite the higher initial cost.
            </p>
            <p>
              The structural requirements are identical to duplex coated angle lintels: a structural engineer must confirm the section size, bearing length and installation requirements per AS 4100 and AS 3700 before ordering. Not suitable for coastal or C4/C5 environments — specify duplex coated or grade 316L stainless steel in those environments.
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

export function GalvAngleLintelProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 supplier systems — hot-dip galvanised steel angle lintels — scroll to view all</p>
          </div>
        </div>

        {/* Filter chips */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {(["InfraBuild", "Lysaght-BlueScope", "State-fabricator", "Angle", "HDG-only", "AS-4100", "AS-NZS-4680", "Inland"] as FilterTag[]).map((f) => {
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
              Side-by-side comparison of hot-dip galvanised steel angle lintel systems. Confirm all selections against the structural engineer&apos;s design and request AS/NZS 4680 certificates before accepting delivery.
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
