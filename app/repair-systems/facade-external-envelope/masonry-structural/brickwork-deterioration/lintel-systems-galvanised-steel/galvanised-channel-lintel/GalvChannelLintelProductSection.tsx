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
  | "Channel"
  | "PFC"
  | "HDG-only"
  | "AS-3700"
  | "AS-4100"
  | "AS-NZS-4680"
  | "Structural"
  | "Inland"
  | "Wide-opening";

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
    name: "InfraBuild — Hot-dip galvanised PFC channel lintel — wide inland masonry openings",
    descriptionLine: "Hot-dip galvanised PFC channel lintel — HDG only — wide inland masonry openings — AS 4100 — engineer to confirm section and back-to-back connection",
    productType: "Hot-dip galvanised PFC channel lintel — HDG only — wide openings — inland",
    filterTags: ["InfraBuild", "Channel", "PFC", "HDG-only", "AS-3700", "AS-4100", "AS-NZS-4680", "Structural", "Inland", "Wide-opening"],
    techChips: [
      { label: "HDG only", cls: "bg-sky-100 text-sky-800" },
      { label: "PFC channel", cls: "bg-slate-100 text-slate-700" },
      { label: "Wide openings", cls: "bg-green-50 text-green-700" },
      { label: "Engineer required", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "InfraBuild supplies hot-dip galvanised parallel flange channel (PFC) sections for wide or heavily loaded masonry lintel applications in inland buildings. Galvanised-only PFC channel provides the high section modulus required for garage door and wide window openings where angle sections cannot achieve the required span or load capacity — but with a shorter service life (15–25 years inland) than a duplex coated channel (40–50 years). Back-to-back channel configurations require an engineer-designed bolt connection. The structural engineer must design and certify the section, bearing and any back-to-back connection before ordering. Not suitable for coastal or C4/C5 environments — specify stainless steel back-to-back angle or duplex coated channel for those environments.",
    technicalProperties: [
      "High section modulus — PFC channel significantly outperforms angle sections for wide spans and heavy masonry loads",
      "AS/NZS 4680 compliant HDG zinc coating — cathodic protection for the channel section in inland C2/C3 environments",
      "National distribution through InfraBuild steel merchant branches — standard PFC sections widely stocked",
      "Back-to-back configuration available — pairs of PFC channels bolted together for very wide openings where a single channel is insufficient",
      "Suitable for the widest inland masonry openings when section size is confirmed by a structural engineer",
    ],
    limitations: [
      "Shorter service life than duplex coated systems — HDG only provides 15–25 years inland; specify duplex coated channel for 40–50 year life",
      "Not suitable for coastal, marine or C4/C5 environments — specify duplex coated or stainless for coastal wide openings",
      "Structural engineer must design and certify section, bearing and back-to-back connection before ordering",
      "Back-to-back connection must be engineer-designed — bolt size, spacing and clamping force must be confirmed for the design loads",
      "Heavier than angle sections — mechanical handling required for long-span channel lintels on upper floors",
    ],
    procurementSources: [
      { name: "InfraBuild Steel — national steel merchant branches, PFC sections", url: "https://www.infrabuild.com" },
      { name: "InfraBuild branch locator — confirm local HDG PFC stock", url: "https://www.infrabuild.com/contact" },
    ],
  },
  {
    fullLabel: "State-based masonry lintel fabricators",
    brandUrl: "#",
    accentColor: "#b45309",
    name: "State-based masonry lintel fabricators — cut-to-length galvanised PFC channel lintels",
    descriptionLine: "Cut-to-length hot-dip galvanised PFC channel lintels — local fabrication to engineer's drawings — HDG only — wide inland masonry openings",
    productType: "Hot-dip galvanised PFC channel lintel — cut to length — local fabrication — engineer's drawings",
    filterTags: ["State-fabricator", "Channel", "PFC", "HDG-only", "AS-3700", "AS-4100", "Structural", "Inland", "Wide-opening"],
    techChips: [
      { label: "Cut to length", cls: "bg-amber-100 text-amber-800" },
      { label: "PFC channel", cls: "bg-slate-100 text-slate-700" },
      { label: "Local fabrication", cls: "bg-green-50 text-green-700" },
      { label: "HDG only", cls: "bg-sky-50 text-sky-700" },
    ],
    systemDescription:
      "State-based masonry lintel fabricators supply cut-to-length hot-dip galvanised PFC channel lintels to the structural engineer's drawings for wide masonry openings in inland buildings. This option is used when the required channel length or configuration is not available as standard stock, or when back-to-back channel pairs are required. The fabricator cuts and hot-dip galvanises the sections per AS/NZS 4680. For back-to-back assemblies, sections are typically pre-assembled and galvanised as a unit. Request a fabrication certificate confirming compliance before accepting delivery. Not suitable for coastal environments.",
    technicalProperties: [
      "Cut to exact length — consistent bearing length at both ends per the engineer's specification",
      "Back-to-back assemblies can be pre-fabricated and galvanised as a unit — bolt holes included in HDG bath",
      "Fabricated to engineer's drawings — section, length and back-to-back bolt connection per the structural design",
      "AS/NZS 4680 HDG applied by fabricator — confirm coating specification in purchase order",
      "Local supply reduces transport cost for heavy channel sections",
    ],
    limitations: [
      "Shorter service life than duplex coated — HDG only; consider duplex coated for extended life",
      "Structural engineer's drawings must be provided before ordering — back-to-back bolt connection must be engineer-designed",
      "Request fabrication certificate confirming AS/NZS 4680 compliance before accepting delivery",
      "Not suitable for coastal environments — confirm site corrosivity is C2/C3 inland",
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
    product: "HDG PFC channel lintel",
    coating: "HDG only — AS/NZS 4680",
    sections: "Standard PFC range",
    life: "15–25 yr inland C2/C3",
    distribution: "National — steel merchant",
    keyFeature: "High section modulus",
    primaryUse: "Wide openings — inland",
  },
  {
    supplier: "State fabricators",
    product: "Cut-to-length HDG PFC channel",
    coating: "HDG only — per spec",
    sections: "Engineer-specified",
    life: "15–25 yr inland C2/C3",
    distribution: "State-based — local fabrication",
    keyFeature: "Back-to-back pre-assembled",
    primaryUse: "Non-standard wide openings",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Replacement of corroded steel lintels above wide garage door openings in inland Class 2 strata buildings",
    "Wide window openings exceeding 3 m span in inland buildings where angle section capacity is insufficient",
    "Heavily loaded facade zones where an angle section cannot achieve the required span or load capacity",
    "Back-to-back channel lintels for very wide openings where a single channel section would be insufficient",
    "Lintel replacements identified during facade remediation where existing sections were undersized",
  ],
  selectionCriteria: [
    "Confirm site corrosivity is C2/C3 inland — specify duplex coated channel or stainless for coastal/C4/C5 environments",
    "Discuss service life with the owner — galvanised-only provides 15–25 years; duplex coated provides 40–50 years for wide openings",
    "Structural engineer must design and certify the channel section, bearing and back-to-back connection before ordering",
    "Request AS/NZS 4680 compliance certificate from the supplier before accepting delivery",
    "Confirm mechanical handling requirements — PFC channel sections are heavier than angle sections",
    "Temporary propping of masonry above is mandatory before removing the existing lintel",
  ],
  limitations: [
    "Shorter service life than duplex coated — HDG only provides 15–25 years; consider lifecycle cost before specifying galvanised-only",
    "Not suitable for coastal or C4/C5 environments — specify duplex coated or stainless for coastal wide openings",
    "Back-to-back connection must be engineer-designed — do not install back-to-back channel without a confirmed connection design",
    "Structural engineer sign-off is mandatory for all channel lintel replacements",
    "Temporary propping is mandatory during lintel replacement",
  ],
  standardsNotes: [
    "AS 4100 — Steel Structures — PFC channel section design and back-to-back connection design",
    "AS 3700 — Masonry Structures — bearing zone design and wide opening lintel requirements",
    "AS/NZS 4680 — Hot-dip galvanised coatings — minimum zinc coating mass; request MTC before accepting",
    "NCC Volume One — structural requirements for Class 2 facades; confirm C2/C3 site classification",
    "Structural engineer certificate required for all lintel replacements on Class 2 strata buildings",
  ],
  suitableDefects: [
    "Corroded steel lintels above wide garage door or large window openings in inland buildings",
    "Undersized angle lintels that have deflected or failed above wide openings — replacement with higher-capacity channel",
    "Failed or cracked masonry above wide openings where the lintel has lost capacity",
    "Lintels identified during structural assessment or facade remediation of wide openings",
  ],
  typicalSubstrates: [
    "Clay brick masonry at wide opening locations in C2/C3 inland environments",
    "Concrete masonry unit walls at wide opening locations — confirm bearing stress capacity",
    "All masonry substrates with wide openings confirmed as C2/C3 inland corrosivity classification",
    "NOT suitable for coastal buildings — specify duplex coated or stainless for coastal wide openings",
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

export function GalvChannelLintelIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What is a hot-dip galvanised steel channel lintel?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          A hot-dip galvanised steel channel lintel is a plain HDG parallel flange channel (PFC) section with no paint overcoat, used for wide or heavily loaded masonry openings in inland buildings where angle sections cannot achieve the required span or load capacity. Galvanised-only PFC channel provides 15–25 year inland service life — shorter than a duplex coated channel system (40–50 years). The structural engineer must confirm section, bearing and any back-to-back connection before ordering.
        </p>
        {expanded && (
          <p>
            When specifying channel lintels for wide openings, compare the lifecycle cost of galvanised-only (15–25 year replacement cycle) against duplex coated (40–50 year replacement cycle). For wide opening replacements where access and disruption costs are high, the duplex coated system typically delivers better lifecycle value. Not suitable for coastal or C4/C5 environments — specify duplex coated or stainless for all coastal wide opening lintel applications.
          </p>
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

export function GalvChannelLintelProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">2 supplier systems — hot-dip galvanised PFC channel lintels — scroll to view all</p>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {(["InfraBuild", "State-fabricator", "Channel", "PFC", "HDG-only", "AS-4100", "Inland", "Wide-opening"] as FilterTag[]).map((f) => {
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

        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">
            {visibleSuppliers.length} supplier{visibleSuppliers.length !== 1 ? "s" : ""} — scroll to view all
          </span>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll("left")} aria-label="Scroll left" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronLeft size={16} /></button>
            <button onClick={() => scroll("right")} aria-label="Scroll right" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronRight size={16} /></button>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}>
          {visibleSuppliers.map((supplier) => (
            <div key={supplier.name} className="flex-none" style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ borderLeftWidth: 4, borderLeftColor: supplier.accentColor }}>
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">{supplier.fullLabel}</span>
                    <div className="flex shrink-0 items-center gap-1">
                      {supplier.tdsUrl && (<a href={supplier.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><FileText size={9} /> TDS</a>)}
                      {supplier.brandUrl !== "#" && (<a href={supplier.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><ExternalLink size={9} /> Brand Site</a>)}
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{supplier.name}</h3>
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">{supplier.productType}</p>
                  <CollapsibleCardDetails text={supplier.descriptionLine} chips={supplier.techChips} />
                </div>
                <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
                  <CollapsibleDescription text={supplier.systemDescription} />
                </div>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of hot-dip galvanised PFC channel lintel systems. Confirm all selections against the structural engineer&apos;s design before ordering.</p>
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
