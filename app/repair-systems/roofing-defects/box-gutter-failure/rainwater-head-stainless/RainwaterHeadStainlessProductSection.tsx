"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Blucher"
  | "Stainless-316"
  | "Coastal"
  | "Welded"
  | "Custom"
  | "TIG-welded";

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
    fullLabel: "Blucher",
    brandUrl: "https://www.blucher.com.au",
    accentColor: "#0369a1",
    name: "Blucher Stainless Rainwater Head",
    descriptionLine: "AISI 316 stainless steel; 1.2mm sheet; custom width 200–500mm; brushed or mirror finish; DN100 outlet with welded spigot; suitable for marine-zone Class 2 strata buildings.",
    productType: "AISI 316 stainless steel rainwater head — Blucher — coastal and marine zone",
    filterTags: ["Blucher", "Stainless-316", "Coastal", "Welded"],
    techChips: [
      { label: "Blucher", cls: "bg-sky-100 text-sky-800" },
      { label: "AISI 316 stainless", cls: "bg-slate-100 text-slate-700" },
      { label: "1.2mm sheet", cls: "bg-slate-100 text-slate-700" },
      { label: "Brushed or mirror finish", cls: "bg-green-50 text-green-700" },
      { label: "Coastal / marine-zone", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Blucher is one of the only major proprietary suppliers of AISI 316 stainless steel rainwater heads available in Australia as a catalogue product. Their stainless rainwater heads are fabricated from 1.2mm AISI 316 grade sheet in custom widths from 200mm to 500mm. DN100 outlet spigot is welded to the body to provide a continuous, watertight, fully welded stainless assembly without soldered or folded seam vulnerabilities. Available in brushed (#4) or mirror polished (#8) finish — brushed is the standard specification for most building applications and is preferred over mirror polished in coastal environments where salt retention on polished surfaces can concentrate corrosive deposits. Blucher stainless rainwater heads are suitable for Class 2 strata buildings in marine-zone and high-corrosivity class C4/C5 environments where Colorbond steel does not meet the required service life. Confirm current product dimensions, outlet size options, finish availability, and lead time with Blucher Australia before specifying. Blucher also supply a range of stainless steel drainage products that can be used to create a complete all-316 stainless drainage system — gutter outlets, downpipes, and floor drains — for the most demanding coastal environments.",
    technicalProperties: [
      "AISI 316 stainless steel — 1.2mm sheet — molybdenum-alloyed for enhanced chloride resistance",
      "Custom width 200–500mm — fabricated to project specification",
      "DN100 welded outlet spigot — continuous welded joint — no soldered or folded seam at the outlet",
      "Brushed (#4) or mirror polished (#8) finish — brushed preferred for coastal environments",
      "Suitable for corrosivity class C3–C5 — marine-zone strata buildings and coastal industrial environments",
      "No maintenance coating required — passive oxide layer provides ongoing corrosion resistance",
      "Service life exceeding 40 years in C4/C5 marine-zone environments without surface re-treatment",
    ],
    limitations: [
      "DN100 outlet only — confirm downpipe diameter before specifying — DN90 connection may require an adaptor",
      "Maximum width 500mm — for wider rainwater heads, a custom-fabricated unit must be specified",
      "Premium cost — AISI 316 stainless is significantly more expensive than Colorbond steel — confirm that the corrosivity class justifies the specification before ordering",
      "Mirror polished (#8) finish retains salt deposits more readily than brushed (#4) in coastal environments — brushed finish is preferred for most building applications",
      "Confirm current product range, dimensions, finish options, and lead time with Blucher Australia before specifying",
      "AISI 316 is not a universal substitute for copper on heritage buildings — confirm with the heritage authority before specifying stainless in place of copper",
    ],
    procurementSources: [
      { name: "Blucher Australia", url: "https://www.blucher.com.au" },
    ],
  },
  {
    fullLabel: "Custom Sheet Metal Fabricator",
    brandUrl: "https://www.masterbuilders.com.au",
    accentColor: "#16a34a",
    name: "Custom Fabricator — 316 Stainless Rainwater Head",
    descriptionLine: "Workshop-fabricated AISI 316 stainless steel rainwater head; TIG-welded seams; custom to project drawing; available with proprietary overflow weir; brushed #4 or mirror #8 finish.",
    productType: "Bespoke AISI 316 stainless steel rainwater head — custom TIG-welded fabrication",
    filterTags: ["Stainless-316", "Custom", "TIG-welded", "Coastal"],
    techChips: [
      { label: "AISI 316", cls: "bg-sky-100 text-sky-800" },
      { label: "TIG-welded seams", cls: "bg-slate-100 text-slate-700" },
      { label: "Custom to drawing", cls: "bg-slate-100 text-slate-700" },
      { label: "Overflow weir option", cls: "bg-green-50 text-green-700" },
      { label: "Brushed #4 or mirror #8", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Where the box gutter configuration, hydraulic design, or project requirement cannot be met by a Blucher standard range product, a custom-fabricated AISI 316 stainless steel rainwater head TIG-welded by a specialist stainless steel fabricator is the appropriate solution. Custom fabrication allows the rainwater head to be dimensioned exactly to the hydraulic engineer's specification — any width, depth, and outlet configuration can be accommodated. TIG (tungsten inert gas) welding of AISI 316 stainless steel produces continuous, fully penetrated, corrosion-resistant weld seams that are stronger and more durable than folded or soldered seams. This is the preferred joint method for stainless steel rainwater heads in marine-zone environments where weld seam integrity is critical for long-term service life. An integrated overflow weir can be incorporated at fabrication — this provides a visible overflow indicator and ensures controlled overflow direction in the event that the primary drainage is blocked, which is a particularly important design feature for Class 2 strata buildings where uncontrolled overflow could cause water ingress into the building structure. Finish options include brushed #4 (standard) and mirror polished #8 (premium architectural applications). Engage a stainless fabricator with experience in architectural and building stainless work — not all general metalwork fabricators have AISI 316 TIG welding capability at the quality required for long-term building applications.",
    technicalProperties: [
      "AISI 316 stainless steel — TIG-welded seams — continuous, fully penetrated corrosion-resistant weld",
      "Custom to project drawing — no size or shape restriction",
      "Integrated overflow weir option — controlled overflow direction for Class 2 strata buildings",
      "Brushed #4 or mirror polished #8 finish — specify at time of engagement",
      "DN90 or DN100 outlet — confirm outlet diameter and connection method in project drawing",
      "Corrosivity class C3–C5 — marine-zone and coastal industrial environments",
      "No maintenance coating required — passive oxide layer provides ongoing corrosion resistance",
    ],
    limitations: [
      "Custom fabrication — all dimensions and details must be confirmed in a project drawing before fabrication — no standard sizes",
      "TIG welding of AISI 316 stainless requires a specialist fabricator with architectural stainless experience — not all metalwork fabricators are capable of producing marine-grade weld quality",
      "Premium cost — both material (AISI 316 sheet) and labour (TIG welding) costs are significantly higher than Colorbond steel or aluminium alternatives",
      "Integrated overflow weir adds complexity to the fabrication — confirm detail with the fabricator and hydraulic engineer before including",
      "Mirror polished #8 finish retains salt deposits more readily than brushed #4 in coastal environments — specify brushed for most applications",
      "AISI 316 is not suitable for applications in contact with chlorine or hypochlorite — confirm suitability for any specialist chemical exposure environment",
    ],
    procurementSources: [
      { name: "Master Builders Australia — find a fabricator", url: "https://www.masterbuilders.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Blucher", label: "Blucher" },
  { id: "Stainless-316", label: "Stainless 316" },
  { id: "Coastal", label: "Coastal" },
  { id: "Welded", label: "Welded" },
  { id: "Custom", label: "Custom" },
  { id: "TIG-welded", label: "TIG-welded" },
];

const SYSTEM_COMPARISON: {
  supplier: string;
  grade: string;
  seamType: string;
  suitableCorrosivityClass: string;
}[] = [
  {
    supplier: "Blucher",
    grade: "AISI 316 — 1.2mm sheet",
    seamType: "Welded (outlet spigot)",
    suitableCorrosivityClass: "C3–C5 — marine zone",
  },
  {
    supplier: "Custom Fabricator",
    grade: "AISI 316 — specify gauge",
    seamType: "TIG-welded seams throughout",
    suitableCorrosivityClass: "C3–C5 — marine zone and coastal industrial",
  },
];

const TECH_INFO = {
  grade316vs304: [
    "AISI 316 contains 2–3% molybdenum compared to AISI 304 which contains none — molybdenum significantly enhances resistance to chloride-induced pitting corrosion, which is the primary failure mode for stainless steel in coastal and marine environments",
    "AISI 304 is not acceptable for box gutter rainwater heads in C3/C4/C5 coastal environments — chloride pitting will occur within a few years of installation in salt-laden air environments",
    "AISI 316L (low carbon) is preferred over standard 316 for welded components — the low carbon content reduces the risk of sensitisation (carbide precipitation at weld heat-affected zones) that can create corrosion pathways in the weld area",
    "Confirm the specific 316 grade (316 vs 316L) with the fabricator when specifying TIG-welded stainless rainwater heads — 316L is preferred for all welded applications",
  ],
  corrosivityClass: [
    "Corrosivity class C1–C2: Colorbond steel or aluminium rainwater heads are adequate — stainless steel is not required",
    "Corrosivity class C3: Enhanced Colorbond (Ultra) or aluminium may be adequate — stainless steel is optional but preferred for long service life",
    "Corrosivity class C4: AISI 316 stainless is the recommended specification — Colorbond steel service life will be significantly reduced",
    "Corrosivity class C5 (marine zone — within 200m of the coast or directly exposed to salt spray): AISI 316 stainless is required — Colorbond steel is not appropriate and aluminium may have reduced service life",
  ],
  seamType: [
    "TIG-welded seams provide a continuous, fully penetrated, corrosion-resistant joint — the preferred seam type for stainless steel rainwater heads in C4/C5 environments where seam integrity is critical",
    "Folded seams (without welding) are used by some fabricators to reduce cost — however, folded seams in stainless steel are not as robust as TIG-welded seams and may open under thermal movement or impact loading in exposed locations",
    "Soldered seams are not appropriate for stainless steel — stainless is not compatible with conventional soldering alloys used for copper",
    "Confirm seam type in the project specification before engaging a fabricator — TIG-welded throughout is the correct specification for marine-zone Class 2 strata buildings",
  ],
  downpipeCompatibility: [
    "Connection of AISI 316 stainless rainwater heads to PVC downpipes: compatible — no galvanic corrosion risk — use a rubber or EPDM gasket at the connection",
    "Connection to copper downpipes: compatible with isolation — stainless and copper have a small galvanic potential but corrosion risk is low in most building environments — confirm with a corrosion engineer for C5 marine-zone applications",
    "Connection to Colorbond steel downpipes: acceptable with isolation tape at the contact point — stainless is noble relative to Colorbond steel and will cause corrosion of the Colorbond at the contact point if direct metal-to-metal contact exists",
    "Connection to aluminium downpipes: isolate — stainless is noble relative to aluminium and galvanic corrosion of the aluminium will occur at direct contact points in the presence of moisture",
  ],
};

/* ── Collapsible helpers ── */

function CollapsibleList({
  items,
  icon,
  limit = 3,
}: {
  items: string[];
  icon: "check" | "x" | "bullet";
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
            ) : icon === "x" ? (
              <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />
            ) : (
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
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

export function RainwaterHeadStainlessIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are stainless steel rainwater heads for box gutters?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          AISI 316 stainless steel rainwater heads are specified for coastal and industrial environments where the corrosivity class (C3–C5) exceeds the design life of Colorbond steel or enhanced Colorbond products. The presence of molybdenum in grade 316 — absent in grade 304 — provides resistance to chloride-induced pitting corrosion that makes it the only stainless grade suitable for marine-zone box gutter applications on Class 2 strata buildings.
        </p>
        {expanded && (
          <>
            <p>
              The principal advantage of AISI 316 stainless over Colorbond steel in C4/C5 environments is that no maintenance coating is required — the passive chromium oxide layer that forms on stainless steel is self-repairing and does not depend on a factory-applied paint coating for corrosion protection. In contrast, Colorbond steel, once the painted coating is damaged or reaches end of coating life, will corrode progressively. In a marine zone (within 200m of the coast), Colorbond steel coating life can be significantly shorter than inland equivalent.
            </p>
            <p>
              The cost premium for AISI 316 stainless steel rainwater heads — both material and fabrication — is significant compared to Colorbond alternatives. The specification should be justified by the confirmed corrosivity class for the site location. Where the corrosivity class is C1–C2, Colorbond Ultra is the appropriate specification and stainless steel is not warranted.
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

export function RainwaterHeadStainlessProductSection() {
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
              AISI 316 vs 304, corrosivity class, TIG welding, downpipe compatibility
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
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
              <TechCard icon={<Ruler size={15} />} title="AISI 316 vs 304 — Why 316 is Required for Coastal Applications" items={TECH_INFO.grade316vs304} style="bullet" />
              <TechCard icon={<Layers size={15} />} title="Corrosivity Class C3–C5 and Material Selection" items={TECH_INFO.corrosivityClass} style="check" />
              <TechCard icon={<AlertTriangle size={15} />} title="TIG Welding vs Folded Seams" items={TECH_INFO.seamType} style="warn" />
              <TechCard icon={<SquareStack size={15} />} title="Connection to PVC, Copper and Colorbond Downpipes" items={TECH_INFO.downpipeCompatibility} style="bullet" />
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
            <p className="mt-1 text-sm text-slate-500">2 products — AISI 316 stainless steel rainwater heads for box gutters — scroll to view all</p>
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
              style={{ width: "calc(50% - 10px)", minWidth: "300px" }}
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
              Side-by-side comparison of AISI 316 stainless steel rainwater head options. Confirm all product selections against the current supplier before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Grade</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Seam type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Suitable corrosivity class</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.supplier} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.supplier}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.grade}</td>
                  <td className="px-4 py-3 text-slate-600">{row.seamType}</td>
                  <td className="px-4 py-3 text-slate-600">{row.suitableCorrosivityClass}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
