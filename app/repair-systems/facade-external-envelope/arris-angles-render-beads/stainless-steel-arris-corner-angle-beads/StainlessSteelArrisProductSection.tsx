"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Stainless"
  | "Grade-316"
  | "Grade-304"
  | "Coastal"
  | "Corrosive"
  | "External-corner"
  | "Masonry"
  | "AAC"
  | "Render"
  | "Exterior"
  | "Heavy-duty"
  | "Perforated-flange";

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
    fullLabel: "Unifix / Buildex",
    brandUrl: "https://www.unifix.com.au",
    accentColor: "#0f766e",
    name: "Unifix Grade 316 Stainless Steel Corner Bead",
    descriptionLine: "Grade 316 stainless steel arris corner bead — coastal and marine environments — exterior render corners on masonry, AAC, and concrete substrates",
    productType: "Grade 316 stainless steel arris corner bead — coastal environments",
    filterTags: ["Stainless", "Grade-316", "Coastal", "Corrosive", "External-corner", "Masonry", "AAC", "Render", "Exterior", "Perforated-flange"],
    techChips: [
      { label: "Grade 316 stainless", cls: "bg-teal-100 text-teal-800" },
      { label: "Coastal environments", cls: "bg-sky-100 text-sky-800" },
      { label: "Exterior masonry", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Grade 316 (marine grade) stainless steel arris corner beads are used in coastal and corrosive environments where aluminium or galvanised steel beads would corrode and cause render staining or delamination. Grade 316 contains molybdenum (2–3%) for superior resistance to chloride corrosion compared to Grade 304. Confirm leg dimensions, material thickness, and availability with Unifix / Buildex. TODO: owner confirm — Unifix Grade 316 stainless arris bead specification and dimensions.",
    technicalProperties: [
      "Grade 316 stainless steel — molybdenum addition for chloride resistance",
      "Perforated flanges for render key",
      "Suitable for coastal, marine, and industrial corrosive environments",
      "Confirm leg dimensions from supplier",
      "Exterior masonry, AAC and concrete substrates",
    ],
    limitations: [
      "Higher cost than aluminium — specify where corrosion risk justifies the premium",
      "Grade 304 is not suitable in marine environments — confirm Grade 316",
      "TODO: owner confirm — Unifix Grade 316 stainless arris bead specification",
      "Cut ends may be sharp — use appropriate PPE during installation",
    ],
    procurementSources: [
      { name: "Unifix", url: "https://www.unifix.com.au" },
      { name: "Building trade merchants nationally", url: "https://www.unifix.com.au" },
    ],
  },
  {
    fullLabel: "Rondo / Specialist Supply",
    brandUrl: "https://www.rondo.com.au",
    accentColor: "#0369a1",
    name: "Rondo Stainless Steel Corner Bead (Grade 304 / 316)",
    descriptionLine: "Stainless steel arris corner bead — Grade 304 (non-coastal) or Grade 316 (coastal/marine) — exterior render corners — Rondo distribution",
    productType: "Stainless steel arris corner bead — Grade 304 or 316",
    filterTags: ["Stainless", "Grade-304", "Grade-316", "Coastal", "External-corner", "Masonry", "Render", "Exterior", "Heavy-duty"],
    techChips: [
      { label: "Grade 304 or 316", cls: "bg-sky-100 text-sky-800" },
      { label: "Rondo supply", cls: "bg-slate-100 text-slate-700" },
      { label: "Coastal or non-coastal", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Rondo distributes stainless steel corner beads in Grade 304 (for non-coastal exterior and interior applications) and Grade 316 (for coastal and marine applications). Confirm the correct grade, leg dimensions, and material thickness with Rondo for each specific application. In marine environments within 1km of the coast, Grade 316 is required — Grade 304 is not adequate for direct marine exposure. TODO: owner confirm — Rondo stainless steel arris bead specification, grades available and dimensions.",
    technicalProperties: [
      "Grade 304 for non-coastal exterior and interior",
      "Grade 316 for coastal and marine environments",
      "Perforated flanges for render key",
      "Confirm leg dimensions from Rondo",
      "Masonry, AAC and concrete substrates",
    ],
    limitations: [
      "Confirm grade — do not substitute 304 in coastal environments",
      "TODO: owner confirm — Rondo stainless arris bead specification and grade availability",
      "Higher cost than aluminium",
    ],
    procurementSources: [
      { name: "Rondo Building Services", url: "https://www.rondo.com.au" },
      { name: "Plasterboard and render merchants nationally", url: "https://www.rondo.com.au" },
    ],
  },
  {
    fullLabel: "Trade / Specialist Supply",
    brandUrl: "https://www.tradelink.com.au",
    accentColor: "#7c3aed",
    name: "Trade-Supply Grade 316 Stainless Arris Bead",
    descriptionLine: "Grade 316 stainless steel arris and corner beads — specialist trade and coastal builders merchant supply — various leg profiles — exterior render corners",
    productType: "Trade-supply Grade 316 stainless steel arris bead",
    filterTags: ["Stainless", "Grade-316", "Coastal", "Corrosive", "External-corner", "Masonry", "Render", "Exterior"],
    techChips: [
      { label: "Grade 316", cls: "bg-violet-100 text-violet-800" },
      { label: "Coastal supply", cls: "bg-slate-100 text-slate-700" },
      { label: "Various leg profiles", cls: "bg-green-50 text-green-700" },
      { label: "Confirm specification", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Grade 316 stainless steel arris beads are available through specialist coastal builders merchants and stainless steel fabrication suppliers. When sourcing from trade supply, confirm Grade 316 (not 304), leg dimensions, and material thickness before ordering. Some suppliers offer custom-cut lengths for large projects.",
    technicalProperties: [
      "Grade 316 stainless — confirm grade with supplier",
      "Available in various leg profiles",
      "Confirm material thickness",
      "Coastal and marine suitable",
    ],
    limitations: [
      "Confirm Grade 316 — not 304 — before purchase",
      "Confirm leg dimensions for render depth",
      "Specialist supply may have longer lead times",
    ],
    procurementSources: [
      { name: "Specialist stainless steel suppliers and coastal trade merchants nationally", url: "https://www.tradelink.com.au" },
      { name: "Tradelink", url: "https://www.tradelink.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Stainless", label: "Stainless" },
  { id: "Grade-316", label: "Grade-316" },
  { id: "Grade-304", label: "Grade-304" },
  { id: "Coastal", label: "Coastal" },
  { id: "Corrosive", label: "Corrosive" },
  { id: "External-corner", label: "External-corner" },
  { id: "Masonry", label: "Masonry" },
  { id: "AAC", label: "AAC" },
  { id: "Render", label: "Render" },
  { id: "Exterior", label: "Exterior" },
  { id: "Heavy-duty", label: "Heavy-duty" },
  { id: "Perforated-flange", label: "Perforated-flange" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  grade: string;
  molybdenum: string;
  legSize: string;
  flangeType: string;
  suitableEnvironment: string;
  primaryUse: string;
}[] = [
  {
    product: "Unifix Grade 316 Stainless Corner Bead",
    brand: "Unifix / Buildex",
    grade: "316 (marine grade)",
    molybdenum: "Yes — 2–3%",
    legSize: "Confirm from Unifix",
    flangeType: "Perforated",
    suitableEnvironment: "Coastal, marine, industrial corrosive",
    primaryUse: "Coastal facade render corner protection — masonry, AAC, concrete",
  },
  {
    product: "Rondo Stainless Corner Bead",
    brand: "Rondo",
    grade: "304 or 316 — confirm",
    molybdenum: "316 only — confirm grade",
    legSize: "Confirm from Rondo",
    flangeType: "Perforated",
    suitableEnvironment: "304 non-coastal; 316 coastal and marine",
    primaryUse: "Exterior and interior render corners — specify grade for environment",
  },
  {
    product: "Trade-Supply Grade 316 Stainless Arris Bead",
    brand: "Trade / Specialist Supply",
    grade: "316 — confirm with supplier",
    molybdenum: "Yes — confirm grade",
    legSize: "Various — confirm from merchant",
    flangeType: "Perforated",
    suitableEnvironment: "Coastal and marine",
    primaryUse: "Coastal facade render corners — specialist supply",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "External render corners on facades within 1km of the coast",
    "Marine industrial building facades with high chloride and salt spray exposure",
    "Facades in chemical and industrial environments where standard aluminium or galvanised steel beads would corrode",
    "Re-rendering works in coastal strata where the existing aluminium beads have corroded and caused staining",
    "Remediation of render corners where aluminium bead corrosion has caused delamination",
  ],
  selectionCriteria: [
    "Grade — Grade 316 for coastal and marine environments; Grade 304 for non-coastal exterior and interior; Never substitute grade — chloride corrosion of Grade 304 in marine environments will cause render staining and failure within 2–5 years",
    "Leg length — match to render depth",
    "Material thickness — confirm standard or heavy duty",
  ],
  limitations: [
    "Grade 304 is not suitable for direct marine or coastal exposure — specify Grade 316 only within 1km of coast",
    "Do not mix grades — specify full Grade 316 for coastal applications including all cut lengths and fixings",
    "Higher material cost than aluminium or PVC — confirm with specifier where cost is a constraint",
    "Cut ends must be clean and deburred to avoid injury and snag during render application",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures",
    "NCC Volume One — facade durability and weatherproofing",
    "AS/NZS 1554.6 — stainless steel welding (where custom-fabricated sections are used)",
    "Confirm material grade certificate with supplier for critical coastal applications",
  ],
  suitableDefects: [
    "Arris bead corrosion staining — render staining from rusting or corroding aluminium beads",
    "Render delamination at corners caused by corroded bead expansion",
    "Replacement of corroded beads during render removal and reinstallation works",
  ],
  typicalSubstrates: [
    "Masonry — brick and block",
    "AAC — lightweight block",
    "Concrete — external concrete facades",
    "Render substrate — where full render removal and bead replacement is included in the scope",
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

export function StainlessSteelArrisIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are stainless steel arris and corner angle beads?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Stainless steel arris and corner angle beads are used in coastal, marine, and corrosive environments where aluminium or galvanised steel beads would suffer chloride-induced corrosion, expand, and cause staining or delamination of the surrounding render.
        </p>
        {expanded && (
          <>
            <p>
              Grade 316 (marine grade) stainless contains 2–3% molybdenum, which provides significantly better chloride resistance than Grade 304. In Australian remedial building practice, Grade 316 is specified for all arris beads on facades within approximately 1km of the coast. Grade 304 may be used in non-coastal exterior and interior applications where durability is required but marine exposure is not present. Stainless steel beads are higher cost than aluminium but are the correct specification in corrosive environments.
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

export function StainlessSteelArrisProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — stainless steel arris and corner angle beads — scroll to view all</p>
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
              Side-by-side comparison of stainless steel arris and corner angle bead products. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Grade</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Molybdenum</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Leg size</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Flange type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Suitable environment</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.grade}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.molybdenum}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.legSize}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.flangeType}</td>
                  <td className="px-4 py-3 text-slate-600">{row.suitableEnvironment}</td>
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
