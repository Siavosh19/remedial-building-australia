"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Alcore"
  | "Bituline"
  | "Bitumen-composite"
  | "Self-healing"
  | "Lightweight"
  | "Standard-cavity"
  | "Coastal"
  | "AS-3700"
  | "National";

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
    fullLabel: "Alcore Australia",
    brandUrl: "https://www.alcore.com.au",
    accentColor: "#0369a1",
    name: "Alcore Australia — Standard Bitumen-Aluminium Composite Cavity Flashing",
    descriptionLine: "The original and leading Alcore bitumen-aluminium composite cavity flashing — Alcore's standard product for masonry cavity wall applications in Australia — self-healing, self-sealing, lightweight",
    productType: "Bitumen-aluminium composite cavity flashing — standard grade",
    filterTags: ["Alcore", "Bitumen-composite", "Self-healing", "Lightweight", "Standard-cavity", "Coastal", "AS-3700", "National"],
    techChips: [
      { label: "Bitumen-aluminium laminate", cls: "bg-sky-100 text-sky-800" },
      { label: "Self-healing", cls: "bg-green-50 text-green-700" },
      { label: "Weep former compatible", cls: "bg-slate-100 text-slate-700" },
      { label: "Coastal-grade", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Alcore Australia's standard bitumen-aluminium composite is a laminate of pure aluminium foil and bitumen compound — the bitumen layer provides self-healing properties at minor mechanical damage and self-sealing at overlaps, while the aluminium gives shape stability. Lighter than lead for the same cavity width and easier to work on site. The standard Alcore product is suitable for base of cavity, over-lintel, sill-level DPC, and step-and-cover flashings in standard-width brick cavity construction. Weep former rolls are available separately and installed at 450mm centres per AS 3700. Lap all joints a minimum of 100mm and seal with a compatible butyl or bitumen tape — do not rely on bitumen self-seal alone for vertical laps. Confirm current product dimensions, roll lengths, and available widths with Alcore Australia or local distributor before specifying.",
    technicalProperties: [
      "Construction: aluminium foil + bitumen compound — self-healing bitumen layer reseals pin holes and minor mechanical damage",
      "Available widths: 150mm, 200mm, 300mm, 450mm — standard 20m roll lengths",
      "Temperature range: -20°C to +80°C service temperature",
      "Lap requirement: minimum 100mm + compatible sealing tape — bitumen self-seal at overlaps for weather resistance",
      "Weep formers: separate Alcore weep roll — install at 450mm centres per AS 3700",
      "Finish: silver-grey aluminium face — suitable for concealed cavity applications",
      "Suitable for coastal environments — bitumen-aluminium composite resists salt-laden air and moisture",
    ],
    limitations: [
      "Not suitable for applications involving sustained contact with solvents or petroleum products",
      "Thermal movement at high temperatures may cause sag in exposed horizontal applications — confirm sag resistance for wide spans above 80°C",
      "Not recommended for fully exposed parapet coping — use Code 5/6 lead or reinforced composite for exposed parapet applications",
      "Maximum service temperature approximately 80°C — confirm with Alcore for high-temperature applications",
      "Lap sealing with compatible tape is mandatory — do not rely on bitumen self-seal alone for vertical laps",
    ],
    procurementSources: [
      { name: "Alcore Australia — direct supply and distributors nationally", url: "https://www.alcore.com.au" },
      { name: "Masonry and building products merchants — confirm local Alcore distributor", url: "https://www.alcore.com.au" },
    ],
  },
  {
    fullLabel: "Bituline",
    brandUrl: "https://www.alcore.com.au",
    accentColor: "#b45309",
    name: "Bituline — Bitumen-Aluminium Composite Cavity Flashing",
    descriptionLine: "Bitumen-aluminium composite cavity flashing strip — an alternative to Alcore for standard cavity applications — available through roofing and building products merchants",
    productType: "Bitumen-aluminium composite cavity flashing — alternative supplier",
    filterTags: ["Bituline", "Bitumen-composite", "Self-healing", "Standard-cavity", "AS-3700"],
    techChips: [
      { label: "Bitumen-aluminium laminate", cls: "bg-amber-100 text-amber-800" },
      { label: "Alternative to Alcore", cls: "bg-slate-100 text-slate-700" },
      { label: "Merchant supply", cls: "bg-green-50 text-green-700" },
      { label: "Confirm TDS", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "Bituline supplies bitumen-aluminium composite flashing strip as an alternative to Alcore for standard cavity flashing applications. Available through roofing and building products merchants. Technical properties are broadly equivalent to Alcore standard — confirm with supplier's current TDS before specifying. Lap all joints a minimum of 100mm and seal with compatible tape. Weep formers must be installed separately at 450mm centres per AS 3700. Confirm current product availability, widths, and roll lengths with local merchant before ordering.",
    technicalProperties: [
      "Construction: aluminium foil + bitumen compound — broadly equivalent to Alcore standard grade",
      "Self-healing at minor mechanical damage — bitumen layer",
      "Available in standard cavity widths — confirm widths and roll lengths with local merchant",
      "Distribution: roofing and building products merchants nationally",
      "Lap requirement: minimum 100mm + compatible sealing tape",
      "Confirm current TDS with supplier before specifying — product specifications may vary by batch or supplier",
    ],
    limitations: [
      "Confirm current TDS with supplier before specifying — product specifications may vary by batch or merchant",
      "Not always stocked at all merchant locations — confirm availability before ordering",
      "Confirm self-healing properties and lap sealing requirements from current TDS before specifying",
      "Weep formers are not typically integral — install separately at 450mm centres per AS 3700",
    ],
    procurementSources: [
      { name: "Roofing and building products merchants — confirm local availability", url: "https://www.alcore.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Alcore", label: "Alcore" },
  { id: "Bituline", label: "Bituline" },
  { id: "Bitumen-composite", label: "Bitumen composite" },
  { id: "Self-healing", label: "Self-healing" },
  { id: "Lightweight", label: "Lightweight" },
  { id: "Standard-cavity", label: "Standard cavity" },
  { id: "Coastal", label: "Coastal rated" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "National", label: "National supply" },
];

const SYSTEM_COMPARISON: {
  supplier: string;
  product: string;
  construction: string;
  selfHealing: string;
  distribution: string;
  keyFeature: string;
  primaryUse: string;
}[] = [
  {
    supplier: "Alcore Australia",
    product: "Standard Bitumen-Aluminium",
    construction: "Al foil + bitumen",
    selfHealing: "Yes",
    distribution: "National — Alcore distributors",
    keyFeature: "Original Alcore — market standard",
    primaryUse: "Standard cavity flashing — all masonry types",
  },
  {
    supplier: "Bituline",
    product: "Bitumen-Al Composite",
    construction: "Al foil + bitumen",
    selfHealing: "Yes",
    distribution: "Roofing / building merchants",
    keyFeature: "Alternative to Alcore",
    primaryUse: "Standard cavity — confirm TDS",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Base of cavity flashing at damp-proof course level in brick cavity wall construction on Class 2 strata buildings",
    "Over-lintel flashings above window and door openings in brick cavity construction",
    "Sill-level DPC and step-and-cover flashings in standard-width masonry cavity walls",
    "Remedial cavity flashing reinstatement where original flashing has failed, been omitted, or is corroded",
  ],
  selectionCriteria: [
    "Standard Alcore composite is suitable for most standard cavity flashing applications — base of cavity, above lintels, at sill courses",
    "Select polyester-reinforced grade for wide-cavity or parapet applications requiring enhanced dimensional stability and puncture resistance",
    "Select self-adhesive grade where a fully bonded DPC is required or weep formers need to be integrated into the flashing product",
    "Minimum 25mm upstand behind inner leaf — lap minimum 100mm at all joints and seal with compatible butyl or bitumen tape",
    "Weep formers must be installed at 450mm centres per AS 3700 — use Alcore weep roll or compatible preformed weep formers",
  ],
  limitations: [
    "Not suitable for applications involving sustained contact with solvents or petroleum products",
    "Thermal movement at high temperatures may cause sag in exposed horizontal applications — confirm sag resistance for wide spans",
    "Not recommended for fully exposed parapet coping — use Code 5/6 lead or reinforced composite for exposed parapet",
    "Maximum service temperature approximately 80°C — confirm for high-temperature rooftop or high-solar-gain applications",
    "Lap sealing with compatible tape is mandatory — do not rely on bitumen self-seal alone at vertical laps",
  ],
  standardsNotes: [
    "AS 3700 Masonry Structures — governs flashing installation, upstand dimension, lap requirements, and weep former spacing for cavity wall construction",
    "Alcore products tested to relevant BS EN and Australian standards for bitumen-laminate DPC performance",
    "NCC Volume One — Section J and facade waterproofing requirements for Class 2 buildings",
    "Weep formers at 450mm centres are required by AS 3700 — confirm with structural engineer for compliance",
  ],
  suitableDefects: [
    "Absent or failed cavity flashing at base of cavity causing rising damp or water infiltration into the cavity",
    "Corroded or failed over-lintel flashing causing water entry above windows and doors on brick facades",
    "Failed sill-level DPC causing moisture penetration through masonry at sill courses",
    "New construction where lightweight, workable flashing is specified as an alternative to lead",
  ],
  typicalSubstrates: [
    "Clay brick masonry cavity walls — standard 50–75mm cavity width — Class 2 strata buildings",
    "Calcium silicate brick and concrete masonry cavity construction",
    "Suitable for coastal environments — bitumen-aluminium composite resists salt-laden air",
    "NOT suitable: cavities exceeding 75mm width — use polyester-reinforced grade for wide-cavity applications",
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

export function AlcoreBitumenCompositeIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What is bitumen-aluminium composite cavity flashing?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Bitumen-aluminium composite cavity flashing is a laminate of aluminium foil and bitumen compound used as the cavity wall DPC at the base of cavity, over lintels, and at sill courses. The bitumen layer provides self-healing properties at minor mechanical damage and self-sealing at overlaps, while the aluminium gives shape stability.
        </p>
        {expanded && (
          <>
            <p>
              Alcore Australia is the original and leading supplier of bitumen-aluminium composite cavity flashing in Australia. The standard Alcore product is lighter than lead for the same cavity width, easier to work on site, and self-heals at pin holes. It is suitable for most standard-width brick cavity applications in Class 2 strata buildings.
            </p>
            <p>
              All joints must be lapped a minimum of 100mm and sealed with a compatible butyl or bitumen tape. Weep formers must be installed at 450mm centres per AS 3700. Select the polyester-reinforced grade for wide-cavity or parapet applications, and the self-adhesive grade where a bonded DPC with integral weep formers is required.
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

export function AlcoreBitumenCompositeProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">2 products — 2 suppliers — bitumen-aluminium composite cavity flashing — scroll to view all</p>
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
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll for more
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
              Side-by-side comparison of bitumen-aluminium composite cavity flashing suppliers. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Construction</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Self-healing</th>
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
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.construction}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.selfHealing}</td>
                  <td className="px-4 py-3 text-slate-600">{row.distribution}</td>
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
