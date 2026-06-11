"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "InfraBuild"
  | "State-fabricator"
  | "Flat-bar"
  | "Duplex"
  | "HDG-PU"
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
    name: "InfraBuild — Duplex coated steel flat bar lintel — HDG + PU paint — shallow rebate",
    descriptionLine: "Hot-dip galvanised + polyurethane paint duplex flat bar lintel — shallow rebate applications — spans under 2 m typical — AS/NZS 4680 compliant — engineer to confirm section and deflection",
    productType: "Duplex coated steel flat bar lintel — HDG + PU paint — shallow rebate — inland",
    filterTags: ["InfraBuild", "Flat-bar", "Duplex", "HDG-PU", "AS-3700", "AS-4100", "AS-NZS-4680", "Structural", "Inland", "Shallow-rebate"],
    techChips: [
      { label: "HDG + PU paint", cls: "bg-sky-100 text-sky-800" },
      { label: "Shallow rebate", cls: "bg-slate-100 text-slate-700" },
      { label: "Short spans <2 m", cls: "bg-amber-100 text-amber-800" },
      { label: "Engineer required", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "InfraBuild supplies hot-dip galvanised flat bar sections finished with a polyurethane (PU) paint overcoat to form a duplex coating system for shallow rebate masonry lintel applications. Flat bar lintels are used where the available structural depth within the masonry opening cannot accommodate an equal angle section — typically in shallow rebate openings or window reveals where the angle leg would project below the soffit line. Flat bar has a significantly lower section modulus than equal angle of the same nominal height — the structural engineer must confirm the span is within the bending and deflection limits per AS 4100 before specifying. Spans are typically restricted to under 2 m. The AS/NZS 4680 compliant HDG plus PU paint duplex system provides 40–50 year inland service life. Not suitable for coastal or C4/C5 environments.",
    technicalProperties: [
      "Minimum profile depth — fits within shallow rebate masonry openings where an equal angle section cannot be accommodated",
      "HDG + PU paint duplex system — zinc coating to AS/NZS 4680 plus polyurethane paint overcoat for extended inland service life",
      "40–50 year estimated inland service life in C2/C3 environments when the PU overcoat is maintained",
      "National distribution through InfraBuild steel merchant branches — standard flat bar stock readily available",
      "Compatible with standard masonry cavity flashings above — confirm flashing type with the structural engineer",
    ],
    limitations: [
      "Restricted to short spans — flat bar has significantly lower section modulus than equal angle of the same height; engineer must confirm span is within bending and deflection limits",
      "Structural engineer must design and certify the lintel section, span and bearing before installation — do not assume a standard flat bar size is adequate",
      "Not suitable for coastal, marine or C4/C5 corrosivity environments — specify grade 316L stainless steel flat bar for coastal applications",
      "Engineer must check deflection separately — flat bar sections are more susceptible to deflection under load than angle sections; L/500 deflection limit under masonry load must be confirmed",
      "Temporary propping of masonry above is mandatory before removing the existing lintel",
    ],
    procurementSources: [
      { name: "InfraBuild Steel — national steel merchant branches", url: "https://www.infrabuild.com" },
      { name: "InfraBuild branch locator — confirm local flat bar stock", url: "https://www.infrabuild.com/contact" },
    ],
  },
  {
    fullLabel: "State-based masonry lintel fabricators",
    brandUrl: "#",
    accentColor: "#b45309",
    name: "State-based masonry lintel fabricators — cut-to-length duplex flat bar lintels",
    descriptionLine: "Cut-to-length duplex coated flat bar lintels — local fabrication to engineer's drawings — HDG + paint finish — shallow rebate inland applications",
    productType: "Duplex coated flat bar lintel — cut to length — local fabrication — engineer's drawings",
    filterTags: ["State-fabricator", "Flat-bar", "Duplex", "HDG-PU", "AS-3700", "AS-4100", "Structural", "Inland", "Shallow-rebate"],
    techChips: [
      { label: "Cut to length", cls: "bg-amber-100 text-amber-800" },
      { label: "Local fabrication", cls: "bg-green-50 text-green-700" },
      { label: "Shallow rebate", cls: "bg-slate-100 text-slate-700" },
      { label: "Engineer's drawings", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "State-based masonry lintel fabricators supply cut-to-length duplex coated flat bar lintels fabricated to the structural engineer's drawings for shallow rebate masonry opening applications. This option is used when the required flat bar dimensions are not available as standard merchant stock, or when the project specification requires a precise duplex coating system applied to confirmed dimensions. The fabricator hot-dip galvanises the cut flat bar sections and applies a paint overcoat per the specification. Request a fabrication and coating certificate confirming AS/NZS 4680 compliance before accepting delivery. Confirm the fabricator can accommodate the required flat bar dimensions and duplex coating specification. Not suitable for coastal environments — specify stainless for all coastal flat bar lintel applications.",
    technicalProperties: [
      "Cut to exact dimensions — avoids waste and ensures consistent bearing length at both ends per the engineer's specification",
      "Fabricated to engineer's drawings — flat bar dimensions, length and bearing requirements per the structural design",
      "HDG + paint duplex system applied by fabricator — confirm coating specification (PU or epoxy paint) in the purchase order",
      "Local supply reduces transport cost and lead time — particularly for custom flat bar dimensions not in standard stock",
      "Suitable for very shallow rebate openings where standard merchant stock dimensions cannot be accommodated",
    ],
    limitations: [
      "Structural engineer's drawings must be provided before ordering — do not order cut-to-length flat bars without a confirmed structural design",
      "Request fabrication and coating certificate confirming AS/NZS 4680 compliance before accepting delivery",
      "Not suitable for coastal or marine environments — site corrosivity must be confirmed as C2/C3 inland before specifying duplex flat bar",
      "Confirm the fabricator's HDG bath can accommodate the required flat bar lengths before ordering",
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
    product: "Duplex flat bar lintel",
    coating: "HDG + PU paint",
    sections: "Standard flat bar stock",
    life: "40–50 yr inland C2/C3",
    distribution: "National — steel merchant",
    keyFeature: "AS/NZS 4680 certified HDG",
    primaryUse: "Shallow rebate — short spans <2 m",
  },
  {
    supplier: "State fabricators",
    product: "Cut-to-length duplex flat bar",
    coating: "HDG + paint — per spec",
    sections: "Engineer-specified",
    life: "40–50 yr inland C2/C3",
    distribution: "State-based — local fabrication",
    keyFeature: "Exact dimensions — no waste",
    primaryUse: "Non-standard shallow rebate openings",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Replacement of corroded flat bar lintels above shallow rebate window openings in inland Class 2 strata buildings",
    "Masonry opening support where the structural depth within the reveal cannot accommodate an equal angle section",
    "Short-span openings under 2 m in inland C2/C3 environments where an angle section would project below the soffit",
    "Lintel replacements in window reveals where the existing flat bar has corroded but the opening geometry prevents use of an angle section",
  ],
  selectionCriteria: [
    "Confirm site corrosivity is C2/C3 inland — if coastal or C4/C5, specify grade 316L stainless steel flat bar lintel",
    "Structural engineer must confirm the span is within the bending and deflection limits — flat bar has lower section modulus than angle; do not specify without engineering confirmation",
    "Engineer must check deflection to L/500 under full masonry load — deflection governs flat bar lintel design more commonly than bending",
    "Request AS/NZS 4680 compliance certificate from the supplier confirming zinc coating mass before accepting delivery",
    "Confirm the PU or epoxy paint overcoat has been applied before delivery — inspect paint film before installation",
    "Temporary propping of masonry above is mandatory before removing the existing lintel",
  ],
  limitations: [
    "Do not specify duplex flat bar lintels for coastal or C4/C5 environments — specify grade 316L stainless steel flat bar",
    "Do not specify without structural engineer design confirmation — flat bar deflection and bending capacity must be confirmed for the actual span and load",
    "Do not use flat bar where an angle section can fit — angle has higher section modulus and should be preferred where the opening geometry permits",
    "Temporary propping is mandatory during replacement — do not remove the existing lintel before propping the masonry above",
  ],
  standardsNotes: [
    "AS 4100 — Steel Structures — governs flat bar lintel section design; deflection check is critical for flat bar sections",
    "AS 3700 — Masonry Structures — governs bearing zone design and lintel deflection limits for masonry openings",
    "AS/NZS 4680 — Hot-dip galvanised coatings — specifies minimum zinc coating mass; request MTC before accepting delivery",
    "NCC Volume One — structural and durability requirements for Class 2 facades; confirm C2/C3 site classification",
    "Structural engineer certificate required for all lintel replacements on Class 2 strata buildings",
  ],
  suitableDefects: [
    "Corroded flat bar lintels above shallow rebate window openings in inland buildings — red rust, section loss or mortar cracking",
    "Deflecting flat bar lintels where section loss has caused visible deflection under masonry load",
    "Failed flat bar lintels in window reveals identified during facade remediation or cavity flashing replacement",
    "Flat bar lintels with insufficient bearing length — masonry cracking at ends indicates the bearing zone is overstressed",
  ],
  typicalSubstrates: [
    "Clay brick masonry with shallow rebate openings in C2/C3 inland environments — confirm bearing zone is in sound condition",
    "Masonry openings where the reveal depth restricts the structural section to a flat bar profile",
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

export function DuplexFlatBarLintelIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What is a duplex coated steel flat bar lintel?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          A duplex coated steel flat bar lintel is a hot-dip galvanised (HDG) flat bar steel section with a paint overcoat (typically polyurethane or epoxy) applied over the zinc coating. The duplex system provides 40–50 year service life in inland C2/C3 environments. Flat bar lintels are used specifically for shallow rebate masonry openings where the structural depth within the reveal cannot accommodate an equal angle section, and are typically restricted to spans under 2 m due to the lower section modulus of the flat bar profile.
        </p>
        {expanded && (
          <>
            <p>
              The critical distinction between a flat bar lintel and an angle lintel is the section modulus. A flat bar has a rectangular cross-section with section modulus proportional to the square of the depth — significantly lower than an equal angle section of the same nominal height, which has additional stiffness from the second leg. A structural engineer must confirm the flat bar span is within the bending capacity and deflection limit (typically L/500 under masonry load) before specifying. In practice, flat bar lintels are limited to spans under approximately 2 m.
            </p>
            <p>
              The duplex system specification is the same as for angle and channel lintels: AS/NZS 4680 hot-dip galvanising plus a paint overcoat. Not suitable for coastal or C4/C5 environments — specify grade 316L stainless steel flat bar for all coastal shallow rebate lintel applications.
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

export function DuplexFlatBarLintelProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">2 supplier systems — duplex coated steel flat bar lintels — scroll to view all</p>
          </div>
        </div>

        {/* Filter chips */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {(["InfraBuild", "State-fabricator", "Flat-bar", "Duplex", "HDG-PU", "AS-4100", "Inland", "Shallow-rebate"] as FilterTag[]).map((f) => {
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
              Side-by-side comparison of duplex coated steel flat bar lintel systems. Confirm all selections against the structural engineer&apos;s design before ordering.
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
