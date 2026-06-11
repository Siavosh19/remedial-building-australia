"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Helifix"
  | "Thor-Helical"
  | "Ancon"
  | "8mm"
  | "Heavy-duty"
  | "Grout-in"
  | "Helical"
  | "Stainless-316"
  | "National"
  | "AS-3700"
  | "Cavity-tie"
  | "Parapet";

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
    fullLabel: "Helifix Australia",
    brandUrl: "https://www.helifix.com.au",
    tdsUrl: "https://www.helifix.com.au/products/remedial-wall-ties",
    accentColor: "#0369a1",
    name: "Helifix SockFix HD / HeliBond 8mm",
    descriptionLine: "8mm Grade 316 stainless helical grout-in tie for heavy-duty cavity wall applications — parapets, lintels, and high-stress zones",
    productType: "8mm Helical Grout-in — Heavy Duty",
    filterTags: ["Helifix", "8mm", "Heavy-duty", "Grout-in", "Helical", "Stainless-316", "National", "AS-3700", "Cavity-tie", "Parapet"],
    techChips: [
      { label: "8mm dia.", cls: "bg-sky-100 text-sky-800" },
      { label: "316 SS", cls: "bg-slate-100 text-slate-700" },
      { label: "Grout-in", cls: "bg-green-50 text-green-700" },
      { label: "Heavy duty", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 3700", cls: "bg-slate-100 text-slate-700" },
      { label: "National", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Helifix SockFix HD is an 8mm diameter Grade 316 stainless steel helical cavity wall tie for heavy-duty remedial installation in parapets, lintels, and high-stress zones where the standard 6mm tie is insufficient. Installed into pre-drilled holes in the outer leaf with HeliBond cementitious grout or resin, and driven into the inner leaf using a rotary hammer driver. The helical profile provides mechanical interlock with both grout and masonry, with higher withdrawal and shear resistance than the 6mm equivalent. Available in standard and extended lengths to suit wider cavities and thicker outer leaf construction.",
    technicalProperties: [
      "8mm diameter — Grade 316 stainless steel — higher withdrawal and shear resistance than standard 6mm helical tie",
      "Grout-in helical installation — HeliBond cementitious grout or approved resin system — AS 3700 compliant",
      "Helical profile provides mechanical interlock with grout and masonry in both leaves",
      "Available in standard and extended lengths to suit wider cavities and thicker outer leaf construction",
      "Helifix national distribution through authorised remedial distributors — full system supply including tooling",
    ],
    limitations: [
      "Larger drill hole required than 6mm — verify outer leaf thickness before specifying",
      "Not suitable as a like-for-like replacement for original 6mm ties without engineer confirmation",
      "Grout curing time required before full load transfer — cavity must not be disturbed",
      "Availability through Helifix-authorised distributors — not hardware chains",
    ],
    procurementSources: [
      { name: "Helifix Australia — national distribution through authorised remedial distributors", url: "https://www.helifix.com.au" },
      { name: "Remedial building specialist suppliers — national", url: "https://www.helifix.com.au" },
      { name: "Helifix website — find nearest distributor", url: "https://www.helifix.com.au" },
    ],
  },
  {
    fullLabel: "Thor Helical Australia",
    brandUrl: "https://www.thorhelical.com.au",
    tdsUrl: "https://www.thorhelical.com.au/wall-ties",
    accentColor: "#b45309",
    name: "Thor Helical 8mm Stainless Helical Cavity Wall Tie",
    descriptionLine: "8mm 316 stainless helical grout-in tie with ThixoFix thixotropic grout system for heavy-duty cavity wall tie replacement",
    productType: "8mm Helical Grout-in — Heavy Duty",
    filterTags: ["Thor-Helical", "8mm", "Heavy-duty", "Grout-in", "Helical", "Stainless-316", "National", "AS-3700", "Cavity-tie", "Parapet"],
    techChips: [
      { label: "8mm dia.", cls: "bg-amber-100 text-amber-800" },
      { label: "316 SS", cls: "bg-slate-100 text-slate-700" },
      { label: "Grout-in", cls: "bg-green-50 text-green-700" },
      { label: "Heavy duty", cls: "bg-slate-100 text-slate-700" },
      { label: "ThixoFix grout", cls: "bg-amber-50 text-amber-700" },
      { label: "National", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Thor Helical 8mm is a Grade 316 stainless steel helical grout-in wall tie for heavy-duty remedial cavity wall tie replacement in higher-demand applications. Installed using the Thor ThixoFix thixotropic cementitious grout system, which minimises grout migration into the cavity during installation. Higher withdrawal and shear capacity than the 6mm equivalent — specified by structural engineers for parapets, lintels, and zones with high wind pressure. Thor Helical Australia supplies a full system including ties, grout, and driver tooling for consistent installation.",
    technicalProperties: [
      "8mm diameter — Grade 316 stainless steel — AS 3700 compliant",
      "ThixoFix thixotropic cementitious grout system — minimises grout migration into cavity during installation",
      "Higher withdrawal and shear capacity than 6mm equivalent — structural engineer specification required",
      "National distribution from Thor Helical Australia through specialist remedial supply network",
      "Full system supply including ties, grout, and driver tooling for consistent installation",
    ],
    limitations: [
      "Requires authorised Thor Helical distributor — not available from general hardware",
      "Larger hole diameter than 6mm — masonry outer leaf thickness and condition must be assessed",
      "ThixoFix grout has limited shelf life — check expiry before use on site",
      "Cavity width must be verified before specifying tie length",
    ],
    procurementSources: [
      { name: "Thor Helical Australia — national distribution through remedial specialist network", url: "https://www.thorhelical.com.au" },
      { name: "Remedial building contractors and specialist suppliers", url: "https://www.thorhelical.com.au" },
      { name: "Thor Helical website — find nearest authorised distributor", url: "https://www.thorhelical.com.au" },
    ],
  },
  {
    fullLabel: "Ancon Building Products Australia",
    brandUrl: "https://www.ancon.com.au",
    tdsUrl: "https://www.ancon.com.au/remedial-wall-ties",
    accentColor: "#7c3aed",
    name: "Ancon MDC 8mm Remedial Helical Wall Tie",
    descriptionLine: "8mm Grade 316 stainless helical tie with cementitious or resin grout for heavy-duty masonry remediation — published load data for engineer specification",
    productType: "8mm Helical Grout-in — Heavy Duty",
    filterTags: ["Ancon", "8mm", "Heavy-duty", "Grout-in", "Helical", "Stainless-316", "National", "AS-3700", "Cavity-tie", "Parapet"],
    techChips: [
      { label: "8mm dia.", cls: "bg-violet-100 text-violet-800" },
      { label: "316 SS", cls: "bg-slate-100 text-slate-700" },
      { label: "Grout-in", cls: "bg-green-50 text-green-700" },
      { label: "Ancon MDC", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 3700", cls: "bg-slate-100 text-slate-700" },
      { label: "National", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Ancon MDC (Masonry Drilled and Cast) 8mm is a Grade 316 stainless steel helical remedial wall tie for heavy-duty cavity tie replacement in residential and commercial masonry facades. Installed by grouting into pre-drilled holes in the outer leaf and driving into the inner leaf — compatible with Ancon cementitious grout or approved resin systems. The MDC system is widely referenced in Australian remedial engineering specifications and is available through the Ancon national distribution network. Ancon provides technical load data for engineer specification, including characteristic resistance values for AS 3700 compliance.",
    technicalProperties: [
      "8mm diameter — Grade 316 stainless steel — AS 3700 compliant",
      "Grout-in helical installation — compatible with Ancon cementitious grout or approved resin systems",
      "Published load data for engineer specification — characteristic resistance values for AS 3700 compliance",
      "Widely referenced in Australian remedial engineering specifications — established MDC system",
      "Available through Ancon national specialist distribution network",
    ],
    limitations: [
      "Distributed through Ancon's specialist network — confirm local availability before specifying",
      "8mm diameter requires larger drill hole than 6mm standard — outer leaf condition assessment required",
      "Grout system must be compatible with masonry substrate — obtain Ancon technical advice for unusual substrates",
      "Installation by trained applicators recommended for consistent embedment depth",
    ],
    procurementSources: [
      { name: "Ancon Building Products Australia — national distribution through specialist suppliers", url: "https://www.ancon.com.au" },
      { name: "Masonry and fixings distributors — confirm local availability with Ancon", url: "https://www.ancon.com.au" },
      { name: "Ancon website — technical data and distributor network", url: "https://www.ancon.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Helifix", label: "Helifix" },
  { id: "Thor-Helical", label: "Thor Helical" },
  { id: "Ancon", label: "Ancon" },
  { id: "8mm", label: "8mm" },
  { id: "Heavy-duty", label: "Heavy duty" },
  { id: "Grout-in", label: "Grout-in" },
  { id: "Helical", label: "Helical" },
  { id: "Stainless-316", label: "Stainless 316" },
  { id: "National", label: "National supply" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "Cavity-tie", label: "Cavity tie" },
  { id: "Parapet", label: "Parapet" },
];

const SYSTEM_COMPARISON: {
  supplier: string;
  product: string;
  diameter: string;
  grade: string;
  distribution: string;
  groutSystem: string;
  keyFeature: string;
  primaryUse: string;
}[] = [
  { supplier: "Helifix Australia", product: "SockFix HD / HeliBond 8mm", diameter: "8mm", grade: "316 SS", distribution: "National (authorised)", groutSystem: "HeliBond cementitious", keyFeature: "Full system with tooling", primaryUse: "Heavy-duty parapet and lintel zones" },
  { supplier: "Thor Helical Australia", product: "Thor Helical 8mm", diameter: "8mm", grade: "316 SS", distribution: "National (specialist)", groutSystem: "ThixoFix thixotropic", keyFeature: "Thixotropic grout minimises cavity migration", primaryUse: "Heavy-duty cavity masonry" },
  { supplier: "Ancon Building Products", product: "Ancon MDC 8mm", diameter: "8mm", grade: "316 SS", distribution: "National (specialist)", groutSystem: "Cementitious or resin", keyFeature: "Published load data for engineers", primaryUse: "Engineer-specified heavy-duty tie replacement" },
];

const TECH_INFO = {
  typicalApplications: [
    "Parapet wall cavity tie replacement where 6mm tie capacity is insufficient",
    "Zones above lintels and openings with increased wind pressure",
    "High-exposure coastal and elevated buildings where 6mm capacity is insufficient",
    "Engineer-specified heavy-duty cavity masonry remediation",
  ],
  selectionCriteria: [
    "Specify 8mm only where engineer confirms increased load demand — 6mm is standard for most residential applications",
    "Confirm outer leaf masonry thickness and condition before drilling",
    "Match grout system to masonry substrate — cementitious grout for typical clay brick, resin for softer or irregular substrates",
    "Verify tie length against actual cavity width on site",
  ],
  limitations: [
    "Larger drill hole required — minimum outer leaf thickness must be maintained",
    "Not a like-for-like replacement for 6mm ties without engineer sign-off",
    "Grout cure time required before cavity is loaded or disturbed",
    "Specialist distributor supply only — not available from general hardware",
  ],
  standardsNotes: [
    "AS 3700 Masonry Structures — tie spacing and structural requirements",
    "AS/NZS 2699.1 — built-in components for masonry construction (context for tie specification)",
    "Engineer must confirm tie spacing and pattern for each project",
  ],
  suitableDefects: [
    "Failed or corroded original cavity wall ties causing bulging or delamination",
    "Engineer-specified heavy-duty tie replacement in parapets and high-stress zones",
    "Remedial stabilisation of outer leaf masonry in elevated or coastal buildings",
  ],
  typicalSubstrates: [
    "Clay brick outer leaf (most common)",
    "Calcium silicate brick",
    "Concrete block masonry",
    "Heritage brick — confirm substrate hardness before drilling 8mm hole",
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

export function EightMmHelicalHeavyDutyIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are 8mm heavy-duty helical grout-in wall ties?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          The 8mm helical grout-in tie is specified for heavy-duty cavity wall tie replacement where the standard 6mm tie is insufficient — typically in parapets, zones above openings, high-rise facades, and coastal buildings with elevated wind loads. The installation principle is identical to the 6mm: drilled into the outer leaf, grouted, and driven into the inner leaf. The larger diameter provides increased withdrawal and shear resistance.
        </p>
        {expanded && (
          <>
            <p>
              Structural engineer confirmation is required before substituting 8mm for standard 6mm ties. The 8mm tie requires a larger drill hole, so minimum outer leaf thickness must be assessed before specifying. Grout system selection — cementitious or thixotropic — should be matched to the masonry substrate and cavity conditions.
            </p>
            <p>
              All three suppliers listed here provide full system supply including ties, grout, and installation tooling through specialist remedial distribution networks. Confirm product availability and current TDS with each supplier before specifying.
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

export function EightMmHelicalHeavyDutyProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — 8mm heavy-duty stainless helical grout-in cavity wall ties — scroll to view all</p>
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
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — 3 visible, scroll for more
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
              Side-by-side comparison of 8mm heavy-duty stainless helical grout-in cavity wall tie suppliers. Confirm all product selections against current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Diameter</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Grade</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Distribution</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Grout System</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key Feature</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary Use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.supplier} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.supplier}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.diameter}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.grade}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.distribution}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.groutSystem}</td>
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
