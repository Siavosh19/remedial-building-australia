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
  | "Flat-bar"
  | "Galvanised"
  | "HDG-only"
  | "AS-3700"
  | "AS-4100"
  | "AS-NZS-4680"
  | "Structural"
  | "Inland"
  | "Shallow-rebate";

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
    name: "InfraBuild — Hot-dip galvanised flat bar lintel — shallow rebate openings",
    descriptionLine: "Hot-dip galvanised flat bar lintel — shallow rebate applications — spans under 2 m — AS/NZS 4680 — 15–25yr inland service life — no paint overcoat",
    productType: "Hot-dip galvanised steel flat bar lintel — HDG only — shallow rebate — inland",
    filterTags: ["InfraBuild", "Flat-bar", "Galvanised", "HDG-only", "AS-3700", "AS-4100", "AS-NZS-4680", "Structural", "Inland", "Shallow-rebate"],
    techChips: [
      { label: "HDG only", cls: "bg-sky-100 text-sky-800" },
      { label: "Shallow rebate", cls: "bg-violet-100 text-violet-800" },
      { label: "15–25yr inland", cls: "bg-amber-100 text-amber-800" },
      { label: "Spans under 2m", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "InfraBuild supplies hot-dip galvanised flat bar sections compliant with AS/NZS 4680 for masonry lintel applications in shallow rebate openings in inland C2/C3 environments. The HDG-only system — without a paint overcoat — provides 15–25 year service life inland. Flat bar lintels are used where the window rebate geometry prevents the installation of an equal angle section. Spans are restricted to under 2 m due to the lower section modulus of flat bar compared to equal angle. A structural engineer must confirm section adequacy per AS 4100. Not suitable for coastal or C4/C5 environments.",
    technicalProperties: [
      "Hot-dip galvanised to AS/NZS 4680 — minimum zinc coating mass confirmed by material test certificate",
      "15–25 year inland service life in C2/C3 environments — shorter than duplex (HDG + paint) systems",
      "For shallow rebate openings where equal angle section cannot fit — lower section modulus than angle",
      "Spans restricted to under 2 m — structural engineer must confirm section adequacy for the actual span and load",
      "National distribution through InfraBuild steel merchant branches — standard flat bar stock available",
    ],
    limitations: [
      "Not suitable for coastal, marine or C4/C5 corrosivity environments — specify stainless steel flat bar for coastal applications",
      "Restricted to spans under 2 m — flat bar section modulus is lower than equal angle; engineer must confirm adequacy",
      "Shorter service life than duplex coated flat bar — 15–25 years HDG only vs 40–50 years HDG + paint",
      "Structural engineer must confirm section size, bearing length and span before installation",
      "Temporary propping of masonry above is mandatory during lintel replacement",
    ],
    procurementSources: [
      { name: "InfraBuild Steel — national steel merchant branches", url: "https://www.infrabuild.com" },
      { name: "InfraBuild branch locator — confirm local flat bar stock", url: "https://www.infrabuild.com/contact" },
    ],
  },
  {
    fullLabel: "Lysaght / BlueScope",
    brandUrl: "https://www.lysaght.com",
    accentColor: "#b45309",
    name: "Lysaght / BlueScope — HDG flat bar lintel — standard flat bar range",
    descriptionLine: "Hot-dip galvanised flat bar lintel — standard flat bar sections — national structural merchant — AS/NZS 4680 compliant — engineer to confirm section for span and load",
    productType: "Hot-dip galvanised steel flat bar lintel — HDG only — BlueScope/Lysaght sections — national distribution",
    filterTags: ["Lysaght-BlueScope", "Flat-bar", "Galvanised", "HDG-only", "AS-3700", "AS-4100", "AS-NZS-4680", "Structural", "Inland", "Shallow-rebate"],
    techChips: [
      { label: "HDG only", cls: "bg-amber-100 text-amber-800" },
      { label: "BlueScope steel", cls: "bg-sky-50 text-sky-700" },
      { label: "Shallow rebate", cls: "bg-violet-100 text-violet-800" },
      { label: "National distribution", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Lysaght and BlueScope flat bar sections are available hot-dip galvanised to AS/NZS 4680 for masonry lintel applications in shallow rebate openings in inland C2/C3 environments. The HDG-only system provides 15–25 year service life inland. Lysaght/BlueScope sections are widely stocked by national structural steel merchants. A structural engineer must confirm the section size, bearing length and installation requirements per AS 4100 and AS 3700. Not suitable for coastal or marine-influenced environments.",
    technicalProperties: [
      "HDG zinc coating to AS/NZS 4680 standard — quality-assured zinc coating from BlueScope-origin steel",
      "15–25 year estimated inland service life in C2/C3 environments",
      "Standard flat bar range available nationally — readily stocked by structural steel merchants",
      "Lower cost than duplex coated flat bar — economy option for short-cycle replacement programmes",
      "Suitable for shallow rebate openings where angle section cannot be accommodated",
    ],
    limitations: [
      "Not suitable for coastal, marine or C4/C5 environments — stainless steel required for coastal applications",
      "Shorter service life than duplex coated systems — 15–25 years vs 40–50 years",
      "Structural engineer must confirm section adequacy, span capacity and bearing — flat bar is restricted to under 2 m",
      "Cut ends and drilled holes must be treated with cold galvanised zinc-rich paint before installation",
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
    name: "State-based masonry lintel fabricators — cut-to-length HDG flat bar lintels",
    descriptionLine: "Cut-to-length hot-dip galvanised flat bar lintels — local fabrication to engineer's drawings — HDG finish — shallow rebate inland applications",
    productType: "Hot-dip galvanised flat bar lintel — cut to length — local fabrication — engineer's drawings",
    filterTags: ["State-fabricator", "Flat-bar", "Galvanised", "HDG-only", "AS-3700", "AS-4100", "Structural", "Inland", "Shallow-rebate"],
    techChips: [
      { label: "Cut to length", cls: "bg-violet-100 text-violet-800" },
      { label: "Local fabrication", cls: "bg-green-50 text-green-700" },
      { label: "Shallow rebate", cls: "bg-slate-100 text-slate-700" },
      { label: "HDG only", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "State-based masonry lintel fabricators supply cut-to-length hot-dip galvanised flat bar lintels fabricated to the structural engineer's drawings for shallow rebate masonry opening applications. The fabricator hot-dip galvanises the cut flat bar sections per the specification. Request a fabrication and coating certificate confirming AS/NZS 4680 compliance before accepting delivery. Not suitable for coastal environments — specify stainless steel for all coastal flat bar applications.",
    technicalProperties: [
      "Cut to exact dimensions — ensures consistent bearing length at both ends per the engineer's specification",
      "Fabricated to engineer's drawings — flat bar dimensions and bearing requirements per the structural design",
      "HDG finish applied by fabricator — confirm AS/NZS 4680 compliance in purchase order",
      "Local supply reduces transport cost and lead time for custom flat bar dimensions",
    ],
    limitations: [
      "Structural engineer's drawings must be provided before ordering — do not order without confirmed structural design",
      "Request fabrication and coating certificate confirming AS/NZS 4680 compliance before accepting delivery",
      "Not suitable for coastal environments — confirm site corrosivity is C2/C3 inland",
      "HDG-only service life 15–25 years — if longer life required, specify duplex coated flat bar lintels",
      "Flat bar section restricted to spans under 2 m — engineer must confirm adequacy for span and load",
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
    product: "HDG flat bar lintel",
    coating: "Hot-dip galvanised only",
    sections: "Standard flat bar stock",
    life: "15–25 yr inland C2/C3",
    distribution: "National — steel merchant",
    keyFeature: "AS/NZS 4680 certified HDG",
    primaryUse: "Shallow rebate — economy — short life",
  },
  {
    supplier: "Lysaght / BlueScope",
    product: "HDG flat bar lintel",
    coating: "Hot-dip galvanised only",
    sections: "Standard flat bar range",
    life: "15–25 yr inland C2/C3",
    distribution: "National — structural merchant",
    keyFeature: "BlueScope-origin steel",
    primaryUse: "Shallow rebate inland — economy",
  },
  {
    supplier: "State fabricators",
    product: "Cut-to-length HDG flat bar",
    coating: "HDG only — per spec",
    sections: "Engineer-specified",
    life: "15–25 yr inland C2/C3",
    distribution: "State-based — local fabrication",
    keyFeature: "Exact dimensions — no waste",
    primaryUse: "Non-standard shallow rebate openings",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Replacement of corroded flat bar lintels above shallow rebate window openings in inland Class 2 strata buildings",
    "Economy option for shallow rebate lintel replacement where 15–25 year service life is acceptable",
    "Budget-constrained projects in inland C2/C3 buildings where the owner accepts a shorter replacement cycle",
    "Planned maintenance programmes where short-cycle flat bar lintel replacement is integrated into the building lifecycle plan",
  ],
  selectionCriteria: [
    "Confirm site corrosivity is C2/C3 inland — if coastal or C4/C5, specify grade 316L stainless steel flat bar",
    "Confirm the building owner accepts 15–25 year service life — consider duplex coated flat bar for longer service life requirements",
    "Structural engineer must confirm flat bar section adequacy for the actual span (typically under 2 m), load and bearing per AS 4100",
    "Request AS/NZS 4680 compliance certificate from the supplier before accepting delivery",
    "Temporary propping mandatory before removing the existing lintel",
  ],
  limitations: [
    "Do not specify for coastal, marine or C4/C5 environments — specify stainless steel flat bar for coastal applications",
    "Do not specify where the owner requires 40+ year service life — specify duplex coated flat bar instead",
    "Do not install without a structural engineer's signed design — flat bar section capacity must be confirmed for the actual span and load",
    "Restricted to spans under 2 m — do not use where span or load requires a higher-capacity section",
    "Temporary propping is mandatory during lintel replacement",
  ],
  standardsNotes: [
    "AS 4100 — Steel Structures — primary design standard for flat bar lintel section design; deflection check is critical",
    "AS 3700 — Masonry Structures — governs bearing zone design and deflection limits for masonry openings",
    "AS/NZS 4680 — Hot-dip galvanised coatings — specifies minimum zinc coating mass; request MTC before accepting",
    "NCC Volume One — structural and durability requirements for Class 2 facades; confirm C2/C3 site classification",
    "Structural engineer certificate required for all lintel replacements on Class 2 strata buildings",
  ],
  suitableDefects: [
    "Corroded flat bar lintels above shallow rebate window openings in inland buildings",
    "Failed flat bar lintels where corrosion has caused section loss or mortar cracking above shallow rebate openings",
    "Flat bar lintels identified for replacement during facade remediation or cavity flashing replacement where rebate is shallow",
  ],
  typicalSubstrates: [
    "Clay brick masonry with shallow rebate openings in C2/C3 inland environments",
    "Masonry openings where the reveal depth restricts the section to a flat bar profile",
    "All masonry substrates confirmed as C2/C3 inland corrosivity classification",
    "NOT suitable for coastal buildings — specify stainless steel flat bar for coastal applications",
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

export function GalvFlatBarLintelIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What is a hot-dip galvanised steel flat bar lintel?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          A hot-dip galvanised (HDG) steel flat bar lintel is a flat bar steel section zinc-coated by the hot-dip galvanising process to AS/NZS 4680, without a paint overcoat. The HDG-only system provides 15–25 years service life in inland C2/C3 environments. Flat bar lintels are used specifically for shallow rebate masonry openings where the structural depth within the reveal cannot accommodate an equal angle section, and are restricted to spans under 2 m due to the lower section modulus of the flat bar profile.
        </p>
        {expanded && (
          <>
            <p>
              The critical distinction between a flat bar lintel and an angle lintel is the section modulus. A flat bar has a lower section modulus than an equal angle section of the same nominal height — restricting flat bar to spans under approximately 2 m under typical masonry loads. A structural engineer must confirm the span is within the bending capacity and deflection limit before specifying. Where an equal angle section can fit within the rebate depth, it should be preferred over flat bar.
            </p>
            <p>
              Without a paint overcoat, the zinc layer is directly exposed and consumed at a faster rate than in a duplex (HDG + paint) system — resulting in a 15–25 year inland service life compared to 40–50 years for duplex coated flat bar. Not suitable for coastal or C4/C5 environments — specify grade 316L stainless steel flat bar for all coastal shallow rebate applications.
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

export function GalvFlatBarLintelProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 supplier systems — hot-dip galvanised steel flat bar lintels — scroll to view all</p>
          </div>
        </div>

        {/* Filter chips */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {(["InfraBuild", "Lysaght-BlueScope", "State-fabricator", "Flat-bar", "Galvanised", "HDG-only", "AS-4100", "Inland", "Shallow-rebate"] as FilterTag[]).map((f) => {
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
              Side-by-side comparison of hot-dip galvanised steel flat bar lintel systems. Confirm all selections against the structural engineer&apos;s design and request AS/NZS 4680 certificates before accepting delivery.
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
