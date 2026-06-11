"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Austral"
  | "Calder"
  | "Copper"
  | "Soldered"
  | "Heritage"
  | "Pre-patinated";

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
    fullLabel: "Austral Lead & Metals",
    brandUrl: "https://www.australlead.com.au",
    accentColor: "#b45309",
    name: "Austral Lead & Metals — Copper Rainwater Head",
    descriptionLine: "C11000 copper sheet 0.6mm and 0.9mm; fabricated to project specification; soldered seams; DN90/DN100 outlet; suitable for all Australian heritage applications; supplied through specialist roofing metal suppliers.",
    productType: "Copper rainwater head — C11000 — soldered — heritage specification",
    filterTags: ["Austral", "Copper", "Soldered", "Heritage"],
    techChips: [
      { label: "Austral Lead & Metals", cls: "bg-amber-100 text-amber-800" },
      { label: "C11000 copper", cls: "bg-slate-100 text-slate-700" },
      { label: "0.6mm or 0.9mm sheet", cls: "bg-slate-100 text-slate-700" },
      { label: "Soldered seams", cls: "bg-green-50 text-green-700" },
      { label: "Heritage applications", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Austral Lead & Metals supply C11000 copper sheet in 0.6mm and 0.9mm gauges for rainwater head fabrication to project specification. Austral are one of Australia's principal specialist roofing metal suppliers, stocking copper sheet alongside lead, zinc, and other architectural metals through a network of specialist roofing metal distributors. Copper rainwater heads fabricated from Austral C11000 copper sheet are suitable for all Australian heritage building applications — Class 2 strata buildings listed on heritage registers, conservation area properties, and premium architectural projects where natural patina and longevity are the primary specification drivers. Seams are workshop-soldered using lead-free solder to produce a watertight, aesthetically consistent joint that matches the traditional construction method for copper rainwater heads. DN90 and DN100 outlet collars are formed and soldered at fabrication for connection to copper or compatible downpipes. Copper develops a natural verdigris patina over 5–10 years outdoor exposure that protects the underlying copper and is the defining visual characteristic of copper rainwater drainage on heritage buildings. The 0.9mm sheet is preferred for larger rainwater heads or where additional stiffness is required. Confirm current stock availability, sheet gauge options, and pricing with Austral Lead & Metals or their nearest distributor before specifying.",
    technicalProperties: [
      "C11000 soft-drawn copper sheet — complies with AS 1432 — 0.6mm and 0.9mm gauges",
      "Workshop-soldered seams — lead-free solder — watertight and visually consistent with traditional copper rainwater head construction",
      "DN90 and DN100 soldered outlet collar — for connection to copper or compatible downpipes",
      "Develops natural verdigris patina — protective oxide layer — typical service life exceeding 80 years",
      "Suitable for heritage building applications — compatible with existing copper gutter lining and copper downpipes",
      "Available through specialist roofing metal distributors nationally — confirm nearest stockist",
      "Custom sizing to project specification — no standard catalogue sizes",
    ],
    limitations: [
      "Copper is incompatible with aluminium — direct contact will cause galvanic corrosion of the aluminium. Isolate copper rainwater heads from all aluminium components",
      "Copper run-off from rainwater heads can stain masonry, concrete, and Colorbond steel below — confirm staining risk with the project architect before specifying",
      "Soldering requires a qualified coppersmith or specialist copper plumber — not all roofing contractors have this capability",
      "Premium cost — copper rainwater heads are significantly more expensive than Colorbond steel equivalents — confirm budget before specifying",
      "0.6mm copper can dent or deform under impact — specify 0.9mm for larger rainwater heads or exposed locations subject to maintenance access",
      "Confirm current stock, pricing, and lead time with Austral Lead & Metals before specifying",
    ],
    procurementSources: [
      { name: "Austral Lead & Metals", url: "https://www.australlead.com.au" },
    ],
  },
  {
    fullLabel: "Calder Industrial Metals",
    brandUrl: "https://www.calderindustrial.com.au",
    accentColor: "#1e3a5f",
    name: "Calder Industrial — Copper Rainwater Head",
    descriptionLine: "Copper sheet rainwater heads fabricated to drawing; 0.7mm and 1.0mm copper; workshop-soldered; matching copper downpipe collar; natural or pre-patinated finish available.",
    productType: "Copper rainwater head — C11000 — soldered — natural or pre-patinated",
    filterTags: ["Calder", "Copper", "Soldered", "Pre-patinated"],
    techChips: [
      { label: "Calder Industrial", cls: "bg-sky-100 text-sky-800" },
      { label: "0.7mm or 1.0mm copper", cls: "bg-slate-100 text-slate-700" },
      { label: "Workshop-soldered", cls: "bg-slate-100 text-slate-700" },
      { label: "Pre-patinated option", cls: "bg-green-50 text-green-700" },
      { label: "Matching copper collar", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Calder Industrial Metals fabricate copper rainwater heads to project drawings in 0.7mm and 1.0mm copper sheet. The 1.0mm gauge provides greater stiffness and impact resistance compared to lighter gauges, making it a preferred specification for larger or more exposed rainwater heads on Class 2 strata buildings. Seams are workshop-soldered to produce a weathertight, traditional copper joint. A matching copper downpipe collar is formed and soldered onto the outlet at fabrication. A key differentiating feature of Calder's offering is the availability of pre-patinated copper finish — factory-treated to develop an artificial verdigris patina before installation. Pre-patinated copper is specified where the immediate visual result of aged copper is required without waiting 5–10 years for natural patination to occur. This is particularly relevant on heritage restoration projects where new copper rainwater heads are installed adjacent to existing, already-patinated copper components and an immediate visual match is required for heritage authority approval. Natural copper (bright mill finish) is also available for projects where natural patination is acceptable. Confirm current fabrication lead time, sheet gauge options, pre-patinated availability, and pricing with Calder Industrial before specifying.",
    technicalProperties: [
      "C11000 copper sheet — 0.7mm and 1.0mm gauges — fabricated to project drawing",
      "Workshop-soldered seams — weathertight traditional copper construction method",
      "Matching copper downpipe collar — soldered at fabrication — for connection to copper or compatible downpipes",
      "Pre-patinated finish available — factory-applied artificial verdigris for immediate heritage appearance",
      "Natural (mill-finish) copper also available — will develop verdigris patina naturally over 5–10 years outdoor exposure",
      "1.0mm gauge preferred for larger rainwater heads — greater stiffness and impact resistance",
      "Typical service life exceeding 80 years — minimal maintenance required",
    ],
    limitations: [
      "Pre-patinated finish is factory-applied — the artificial patina appearance may not exactly match aged naturally patinated copper — confirm visual match with the heritage authority before specifying",
      "Copper is incompatible with aluminium — isolate from all aluminium components",
      "Copper run-off can stain masonry, concrete, and Colorbond steel — confirm staining risk before specifying",
      "Soldering requires a qualified coppersmith — not all roofing contractors have this capability",
      "Premium cost — confirm budget before specifying copper over Colorbond alternatives",
      "Confirm current stock, fabrication lead time, pre-patinated availability, and pricing with Calder Industrial before specifying",
    ],
    procurementSources: [
      { name: "Calder Industrial Metals", url: "https://www.calderindustrial.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Austral", label: "Austral" },
  { id: "Calder", label: "Calder" },
  { id: "Copper", label: "Copper" },
  { id: "Soldered", label: "Soldered" },
  { id: "Heritage", label: "Heritage" },
  { id: "Pre-patinated", label: "Pre-patinated" },
];

const SYSTEM_COMPARISON: {
  supplier: string;
  sheetThickness: string;
  seamType: string;
  patinaOption: string;
}[] = [
  {
    supplier: "Austral Lead & Metals",
    sheetThickness: "0.6mm and 0.9mm",
    seamType: "Workshop-soldered (lead-free solder)",
    patinaOption: "Natural only — verdigris develops over 5–10 years",
  },
  {
    supplier: "Calder Industrial",
    sheetThickness: "0.7mm and 1.0mm",
    seamType: "Workshop-soldered",
    patinaOption: "Natural or pre-patinated (factory-applied verdigris)",
  },
];

const TECH_INFO = {
  gradeThickness: [
    "AS 1432 Grade C11000 is the standard specification for architectural copper sheet in Australia — soft-drawn, minimum 99.9% copper — this is the grade required for rainwater head fabrication",
    "Sheet thickness selection depends on rainwater head size and exposure: 0.6mm or 0.7mm is appropriate for standard residential and small strata rainwater heads; 0.9mm or 1.0mm is preferred for larger heads or more exposed locations",
    "Heavier gauge copper is more resistant to denting and deformation during installation and maintenance access — specify 0.9mm or 1.0mm for heads installed at low level or accessible to maintenance personnel",
    "Confirm current sheet thickness options with the fabricator — availability of specific gauges may vary depending on current coil stock",
  ],
  dissimilarMetal: [
    "Copper and aluminium must never be in direct contact in the presence of moisture — copper is noble relative to aluminium and galvanic corrosion of the aluminium will occur rapidly",
    "Copper run-off will stain concrete, masonry, and Colorbond steel blue-green over time — assess the path of rainwater run-off from copper rainwater heads before specifying",
    "Copper and zinc (galvanised steel) must be isolated — copper run-off onto zinc will corrode the zinc coating",
    "Copper and stainless steel (316) are broadly compatible — the potential difference is small and corrosion risk is low in most building environments",
  ],
  soldering: [
    "Soldered seams are the traditional and preferred method for copper rainwater heads — capillary soldering produces a continuous waterproof bond across the full seam length",
    "Lead-free solder (tin-silver or tin-antimony alloy) is now the standard specification for building applications — confirm lead-free solder with the fabricator before ordering",
    "Riveted seams with soldered joints are used by some fabricators — rivets provide mechanical strength while solder provides the waterproof seal",
    "TIG-welded copper seams are an alternative to soldering for heavier gauge (1.0mm+) copper — confirm welding capability with the fabricator if welded seams are preferred",
  ],
  heritagSpec: [
    "Heritage building consent may require the use of copper to match existing copper drainage components on a listed building — confirm specification requirements with the heritage authority before ordering",
    "Conservation guidelines for heritage buildings typically require like-for-like replacement of existing copper components — substituting Colorbond or stainless steel may not be acceptable",
    "Pre-patinated copper (Calder Industrial) is available where an immediate aged-copper appearance is required for heritage authority approval — confirm visual match requirements before specifying",
    "Confirm heritage-grade copper specification (AS 1432 C11000, minimum sheet thickness, seam type) with the heritage consultant or authority having jurisdiction before fabrication commences",
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

export function RainwaterHeadCopperIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are copper rainwater heads for box gutters?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Copper rainwater heads are fabricated from soft-drawn C11000 copper sheet (AS 1432) with workshop-soldered seams. They are specified on heritage buildings, conservation-grade strata projects, and premium architectural applications where natural patina, material authenticity, and a service life exceeding 80 years are prioritised. Copper develops a distinctive verdigris patina over 5–10 years outdoor exposure that is both visually distinctive and chemically protective — the patina prevents further corrosion of the underlying copper.
        </p>
        {expanded && (
          <>
            <p>
              Copper rainwater heads must be fabricated by a qualified coppersmith or specialist copper plumber with soldering capability. Unlike Colorbond steel or aluminium rainwater heads that can be formed by most sheet metal fabricators, copper requires specialist skills and experience in capillary soldering, annealing, and traditional copper sheet working techniques. The cost of copper rainwater heads is significantly higher than steel or aluminium equivalents — both the material cost and the specialist labour cost are premium.
            </p>
            <p>
              The principal dissimilar metal risk with copper is contact with aluminium — copper ions in water run-off will cause galvanic corrosion of aluminium components downstream. Copper run-off can also stain masonry and concrete blue-green and will corrode Colorbond steel and zinc/galvanised components below. The drainage path from copper rainwater heads must be considered carefully in the design of the downpipe system.
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

export function RainwaterHeadCopperProductSection() {
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
              Copper grade and thickness, dissimilar metal risks, soldering, heritage specification
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
              <TechCard icon={<Ruler size={15} />} title="Copper Grade and Thickness — AS 1432 C11000" items={TECH_INFO.gradeThickness} style="bullet" />
              <TechCard icon={<AlertTriangle size={15} />} title="Dissimilar Metal Contact" items={TECH_INFO.dissimilarMetal} style="warn" />
              <TechCard icon={<Layers size={15} />} title="Soldering vs Riveted Seams" items={TECH_INFO.soldering} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="Heritage and Conservation Grade Specification" items={TECH_INFO.heritagSpec} style="bullet" />
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
            <p className="mt-1 text-sm text-slate-500">2 products — copper rainwater heads for box gutters — scroll to view all</p>
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
              Side-by-side comparison of copper rainwater head suppliers. Confirm all product selections against the current supplier before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Sheet thickness</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Seam type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Patina option</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.supplier} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.supplier}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.sheetThickness}</td>
                  <td className="px-4 py-3 text-slate-600">{row.seamType}</td>
                  <td className="px-4 py-3 text-slate-600">{row.patinaOption}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
