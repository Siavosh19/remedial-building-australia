"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "TPO"
  | "FPO"
  | "Single-ply"
  | "Exposed-UV"
  | "Flat-roof"
  | "Heat-welded"
  | "Mechanically-fixed"
  | "Adhered"
  | "AS-4654";

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
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardexaustralia.com",
    tdsUrl: "https://www.ardexaustralia.com",
    accentColor: "#f97316",
    name: "ARDEX WPM 612 TPO",
    descriptionLine: "Thermoplastic polyolefin (TPO) single-ply roofing membrane — heat-welded seams — exposed UV-rated flat roof system — mechanically fixed or fully adhered installation — confirm current specifications with ARDEX Australia technical",
    productType: "TPO single-ply exposed flat roof membrane",
    filterTags: ["TPO", "Single-ply", "Exposed-UV", "Flat-roof", "Heat-welded", "Mechanically-fixed"],
    techChips: [
      { label: "TPO", cls: "bg-orange-100 text-orange-800" },
      { label: "Single-ply", cls: "bg-orange-100 text-orange-800" },
      { label: "Heat-welded", cls: "bg-sky-100 text-sky-800" },
      { label: "UV exposed", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "ARDEX WPM 612 TPO is a thermoplastic polyolefin single-ply roofing membrane intended for exposed flat roof applications requiring UV resistance and thermal movement accommodation. TPO membranes are heat-weld seamed at laps, providing a continuous monolithic waterproofing layer when correctly installed.\n\nInstallation methods include mechanical fixation (screw and plate at field and perimeter), fully adhered (bonded to substrate with compatible ARDEX adhesive), and ballasted systems where permitted by roof structural capacity. Heat-welded seams require calibrated hot-air welding equipment and trained installers — seam integrity is the primary quality control point in TPO installation.\n\nConfirm current product technical data sheet, system design guide, approved installation methods, seam weld width requirements, and applicator approval requirements with ARDEX Australia technical before specifying. Do not rely on this general reference as a substitute for current ARDEX WPM 612 TPO technical documentation.",
    technicalProperties: [
      "TPO (thermoplastic polyolefin) membrane — UV-resistant exposed roofing single-ply system",
      "Heat-weld seamed laps — continuous monolithic waterproofing layer when properly installed",
      "Compatible with mechanically fixed, fully adhered, and ballasted installation methods — confirm system design with ARDEX technical",
      "Suitable for exposed flat roof and low-pitch roof applications — confirm minimum pitch requirements with ARDEX",
      "Confirm thickness, roll dimensions, elongation, tensile strength, and AS 4654 compliance from current ARDEX WPM 612 TPO TDS",
    ],
    limitations: [
      "TPO seam welding requires trained installers and calibrated hot-air welding equipment — improper seam welding is the primary failure mode for single-ply TPO roofs",
      "Not suitable for detailed application without appropriate ARDEX-approved flashing tape, pre-formed corners, and termination accessories — confirm detail system with ARDEX Australia",
      "Confirm compatibility with existing roof substrate and any overlay requirements before specifying — do not apply directly over loose or delaminating substrates without addressing substrate first",
      "Ballasted systems require roof structure capable of supporting ballast load — confirm with structural engineer",
      "Confirm current product availability, system documentation and ARDEX-approved applicator requirements with ARDEX Australia before specifying",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply and technical", url: "https://www.ardexaustralia.com" },
    ],
  },
  {
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardexaustralia.com",
    tdsUrl: "https://www.ardexaustralia.com",
    accentColor: "#f97316",
    name: "ARDEX WPM 615 TPO",
    descriptionLine: "Reinforced thermoplastic polyolefin (TPO) single-ply roofing membrane — polyester fleece reinforced — heat-welded seams — exposed UV-rated flat roof system — confirm current specifications with ARDEX Australia technical",
    productType: "Reinforced TPO single-ply exposed flat roof membrane",
    filterTags: ["TPO", "Single-ply", "Exposed-UV", "Flat-roof", "Heat-welded", "Adhered"],
    techChips: [
      { label: "TPO reinforced", cls: "bg-orange-100 text-orange-800" },
      { label: "Polyester fleece", cls: "bg-orange-100 text-orange-800" },
      { label: "Heat-welded", cls: "bg-sky-100 text-sky-800" },
      { label: "UV exposed", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "ARDEX WPM 615 TPO is a polyester fleece-reinforced thermoplastic polyolefin single-ply roofing membrane for exposed flat roof applications. The fleece reinforcement layer provides dimensional stability and improved puncture resistance compared to unreinforced TPO, making it suited to adhered installation over prepared substrates.\n\nThe reinforced construction allows direct bonding to the substrate using compatible ARDEX adhesive systems, providing wind uplift resistance without mechanical fasteners penetrating the waterproofing layer. Heat-welded seams form the waterproof lap joints in the same manner as unreinforced TPO systems.\n\nConfirm current product technical data sheet, system design guide, approved adhesives, seam weld width requirements, and applicator approval requirements with ARDEX Australia technical before specifying. Confirm dimensional stability testing, elongation, tensile strength, and AS 4654 compliance from current ARDEX WPM 615 TPO TDS.",
    technicalProperties: [
      "Polyester fleece-reinforced TPO membrane — improved dimensional stability and puncture resistance over unreinforced grades",
      "Heat-weld seamed laps — continuous monolithic waterproofing layer when properly installed",
      "Suited to fully adhered installation with compatible ARDEX adhesive — no mechanical fasteners penetrating membrane field",
      "Suitable for exposed flat roof and low-pitch roof applications — confirm minimum pitch requirements with ARDEX",
      "Confirm thickness, roll dimensions, elongation, tensile strength, and AS 4654 compliance from current ARDEX WPM 615 TPO TDS",
    ],
    limitations: [
      "TPO seam welding requires trained installers and calibrated hot-air welding equipment — improper seam welding is the primary failure mode for single-ply TPO roofs",
      "Fully adhered installation requires clean, sound, and level substrate — loose, contaminated, or rough substrates will cause adhesion failure",
      "Confirm compatible ARDEX adhesive product, application rate, and open time requirements before specifying — do not use non-approved adhesives",
      "Not suitable for detailed application without appropriate ARDEX-approved flashing tape, pre-formed corners, and termination accessories",
      "Confirm current product availability, system documentation and ARDEX-approved applicator requirements with ARDEX Australia before specifying",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply and technical", url: "https://www.ardexaustralia.com" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "TPO", label: "TPO" },
  { id: "FPO", label: "FPO" },
  { id: "Single-ply", label: "Single-ply" },
  { id: "Exposed-UV", label: "UV exposed" },
  { id: "Flat-roof", label: "Flat roof" },
  { id: "Heat-welded", label: "Heat-welded" },
  { id: "Mechanically-fixed", label: "Mechanically fixed" },
  { id: "Adhered", label: "Adhered" },
];

const TECH_INFO = {
  typicalApplications: [
    "Exposed flat roof and low-pitch roof waterproofing remediation — ponding water areas",
    "Re-roofing over existing substrates where torch-on or built-up bitumen systems have failed",
    "New construction flat roofs where exposed UV-rated single-ply system is specified",
    "Plant rooms, service decks and utility roof areas requiring trafficable exposed waterproofing",
    "Carpark top decks and podium roofs where ballasted single-ply is permitted by structural load capacity",
  ],
  selectionCriteria: [
    "Select TPO for UV-exposed applications — TPO is inherently UV-stable without requiring additional UV coating",
    "Choose reinforced grade (WPM 615) for fully adhered installation — unreinforced grade (WPM 612) for mechanically fixed or ballasted",
    "Confirm minimum roof pitch — single-ply membranes are suitable for flat and low-pitch but require adequate fall to outlets to prevent ponding",
    "Confirm wind uplift design — mechanically fixed systems require engineering calculation for fastener spacing",
    "Specify ARDEX-approved trained applicator — unapproved installers void manufacturer warranty",
  ],
  limitations: [
    "TPO seam welding is a critical quality control point — poorly welded seams are the primary failure mode — do not use non-approved installers",
    "Not a DIY product — requires specialist roofing applicator with ARDEX approval and hot-air welding equipment",
    "Do not apply over delaminating, saturated, or structurally compromised substrate without addressing substrate defect first",
    "Not suitable for applications with standing tree roots or aggressive green roof overburden without confirmed root-resistance rating",
    "Do not specify for under-tile or protected balcony applications — TPO is an exposed roofing product, not an under-tile membrane",
  ],
  standardsNotes: [
    "AS 4654.1 — Waterproofing membranes for external above-ground use — material testing requirements",
    "AS 4654.2 — Application requirements — confirm installation method against AS 4654.2 requirements",
    "Confirm current ARDEX system design manual and installation guide before specifying",
    "Manufacturer applicator approval is typically required to access product warranty — confirm with ARDEX Australia",
  ],
  suitableDefects: [
    "Flat roof ponding due to inadequate falls — confirmed after fall correction substrate has been placed",
    "Existing bitumen membrane failure on flat roof — re-roofing with TPO single-ply over prepared substrate",
    "UV-degraded existing coating or membrane requiring replacement on exposed flat roof",
  ],
  typicalSubstrates: [
    "Concrete flat roof slab — prepared, clean, and structurally sound",
    "Compressed fibre cement and proprietary roof substrates — confirm ARDEX system compatibility",
    "Existing polymer-modified screed fall correction layer — confirm cure and surface preparation requirements",
    "Existing stable substrate with sound bonding — confirm overlay suitability with ARDEX Australia",
  ],
};

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

export function TPOFlatRoofIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are TPO/FPO single-ply exposed roofing membranes?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Thermoplastic polyolefin (TPO) and flexible polyolefin (FPO) single-ply membranes are UV-rated exposed flat roofing systems installed by heat-weld seaming. Unlike bituminous torch-on membranes, TPO/FPO systems are inherently UV-stable and do not require ballast or surface coating for UV protection.
        </p>
        {expanded && (
          <>
            <p>
              TPO membranes are classified as single-ply because the waterproofing is achieved by a single sheet rather than a multi-layer built-up system. Seam welds (hot-air welded laps) are the critical quality control point — incorrectly welded seams are the primary failure mode for TPO roofing. Installation requires trained applicators with calibrated welding equipment, and most manufacturers require installer approval before their warranty applies.
            </p>
            <p>
              In Australian remedial practice, TPO/FPO systems are used for re-roofing over failed bitumen flat roofs, new construction exposed flat roofs, plant room roofs, and service decks. They are not suitable for under-tile or protected balcony applications — these require AS 3740 or AS 4858 compliant liquid-applied or cementitious membrane systems. Confirm system design, fall requirements, substrate preparation, and applicator approval with ARDEX Australia technical before specifying.
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

export function TPOFlatRoofProductSection() {
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
      {/* Technical Accordion */}
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

      {/* Product Reference */}
      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">2 products — 1 brand — TPO/FPO single-ply exposed flat roof membrane systems — scroll to view all</p>
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
                  <CollapsibleCardDetails text={product.descriptionLine} chips={product.techChips} />
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
    </>
  );
}
