"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "River-pebble"
  | "Concrete-paver"
  | "Loose-laid"
  | "Single-ply"
  | "Wind-uplift"
  | "Structural-confirm"
  | "Protection-board"
  | "Pebble-option"
  | "Paver-option"
  | "Walkable";

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
  specifierNote?: string;
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Various — BCSands / landscape and quarry supply / Bayset",
    brandUrl: "https://www.bcsands.com.au",
    tdsUrl: "https://www.bcsands.com.au/index.php?main_page=product_info&products_id=3561",
    accentColor: "#78716c",
    name: "Washed River Pebble Ballast — 20–40mm and 40–75mm",
    descriptionLine: "Washed river pebble roof ballast — 20–40mm or 40–75mm rounded smooth pebble — minimum 50mm depth and 80 kg/m² in field zone — compatible with loose-laid single-ply membrane systems — confirm with membrane manufacturer",
    productType: "Washed rounded river pebble ballast — 20–40mm / 40–75mm — loose-laid single-ply membrane wind uplift resistance",
    filterTags: ["River-pebble", "Pebble-option", "Loose-laid", "Single-ply", "Wind-uplift", "Structural-confirm", "Protection-board"],
    techChips: [
      { label: "Washed rounded river pebble", cls: "bg-stone-100 text-stone-800" },
      { label: "20–40mm or 40–75mm", cls: "bg-slate-100 text-slate-700" },
      { label: "Min 50mm / 80 kg/m² field zone", cls: "bg-amber-50 text-amber-700" },
      { label: "Compatible with loose-laid single-ply systems", cls: "bg-green-50 text-green-700" },
      { label: "Protection board required — confirm with membrane mfr", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "Washed river pebble is the most widely used ballast material for loose-laid single-ply membrane roof systems in Australia. The rounded, smooth particle shape is critical — it distributes load across the membrane surface without point concentrations that sharp crushed aggregate would create. Washed pebble is free of fine particles and dust that could block drainage or contaminate the membrane surface.\n\nBCSands (Sydney) specifically markets 40–75mm rounded river pebble for rooftop ballast applications, describing its large size as preventing displacement by birds or wind. This is consistent with the international single-ply membrane industry standard that recommends larger particle sizes (20–40mm or larger) for roof ballast over smaller gravel that can be displaced by wind action.\n\nMinimum 50mm depth and minimum 80 kg/m² in the field zone is a standard starting point — perimeter and corner zones require heavier ballast confirmed by the wind uplift analysis for the specific project. A protection board or separation layer must be placed between the membrane surface and the pebble ballast on most membrane systems — confirm with the membrane manufacturer whether a protection layer is required before placing pebble directly on the cured membrane.",
    technicalProperties: [
      "Washed rounded river pebble — 20–40mm or 40–75mm particle size",
      "Smooth rounded particles — no sharp edges — membrane safe when protection board is in place",
      "Minimum 50mm depth — minimum 80 kg/m² in field zone — perimeter and corner zones require more per wind uplift analysis",
      "Compatible with loose-laid single-ply membrane systems — confirm particle size and protection board requirements with the membrane manufacturer",
      "Protection board or separation layer required below ballast — confirm requirement with membrane manufacturer",
      "Available from landscape and quarry suppliers across Australia — confirm washed rounded pebble availability",
    ],
    limitations: [
      "Sharp crushed aggregate must not be used — rounded smooth pebble only — sharp edges can puncture or abrade the membrane",
      "Minimum weight (80 kg/m²) is the field zone minimum — perimeter and corner zones require heavier ballast per wind uplift analysis — do not apply uniform ballast without zone differentiation",
      "Structural loading must be confirmed with structural engineer before placing ballast on existing roof or podium slab",
      "Protection board requirement must be confirmed with membrane manufacturer before placing pebble directly on membrane",
      "Wind uplift analysis required before ballast weights are specified — confirm required depths and weights with the structural engineer and membrane manufacturer",
    ],
    procurementSources: [
      { name: "BCSands — confirmed rooftop ballast pebble (Sydney)", url: "https://www.bcsands.com.au" },
      { name: "Bayset — ballasted roof system materials", url: "https://www.bayset.com.au" },
      { name: "Landscape and quarry suppliers — confirm washed rounded pebble with local supplier", url: "#" },
    ],
    specifierNote: "Confirm particle size, minimum weight, zone requirements, and protection board requirement with the membrane manufacturer before ordering. Wind uplift analysis required.",
  },
  {
    fullLabel: "Various — Hanson / CSR / local precast suppliers",
    brandUrl: "#",
    tdsUrl: undefined,
    accentColor: "#475569",
    name: "Precast Concrete Paver Ballast — 400×400mm or 600×600mm",
    descriptionLine: "Precast concrete pavers placed as ballast over loose-laid single-ply membrane — flat walkable surface and wind uplift resistance — protection board or separation layer required between membrane and pavers — confirm with membrane manufacturer",
    productType: "Precast concrete paver ballast — 400×400mm / 600×600mm — flat lay or pedestal — walkable surface",
    filterTags: ["Concrete-paver", "Paver-option", "Loose-laid", "Single-ply", "Wind-uplift", "Structural-confirm", "Protection-board", "Walkable"],
    techChips: [
      { label: "Precast concrete paver", cls: "bg-slate-100 text-slate-700" },
      { label: "400×400 or 600×600mm", cls: "bg-slate-100 text-slate-700" },
      { label: "~95–110 kg/m² edge-to-edge", cls: "bg-amber-50 text-amber-700" },
      { label: "Walkable maintenance surface", cls: "bg-green-50 text-green-700" },
      { label: "Protection board required", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "Precast concrete pavers are used as ballast on loose-laid single-ply membrane roof decks and podium slabs where a flat, walkable surface finish is required rather than loose pebble. The paver dead weight holds the membrane against wind uplift while providing a maintenance-accessible surface above the membrane. Standard precast concrete pavers for roof ballast applications are typically 400×400mm or 600×600mm in plan, 40mm thick, weighing approximately 15–17 kg each — providing approximately 95–110 kg/m² when placed edge-to-edge without gaps.\n\nConcrete paver ballast is used across a range of loose-laid single-ply membrane systems where the project finish and maintenance access requirements favour a flat paved surface over loose pebble. Where pavers are placed on adjustable pedestals for height variation and drainage void, the pedestal system provides the dead weight — confirm the pedestal and paver combination provides sufficient weight per m² against the wind uplift design for the specific zone.\n\nPavers used as ballast must be placed on a protection board or separation layer above the membrane — not directly on the membrane surface. The paver edges and corners can concentrate load on the membrane surface and damage the membrane face without a protection layer between them. Confirm the protection layer specification with the membrane manufacturer before placing pavers.",
    technicalProperties: [
      "Standard precast concrete paver — 400×400×40mm or 600×600×40mm — confirm sizing and weight with supplier",
      "Approximately 15–17 kg per 400×400mm paver — approximately 95–110 kg/m² placed edge-to-edge",
      "Flat walkable surface — suitable for maintenance access above the membrane",
      "Compatible with loose-laid single-ply membrane systems — confirm protection board and paver weight requirements with the membrane manufacturer",
      "Protection board or separation layer required between membrane and pavers",
      "Available from precast concrete suppliers across Australia",
    ],
    limitations: [
      "Protection board or separation layer required — do not place pavers directly on membrane without a protection layer",
      "Paver weight must be confirmed against the wind uplift design — confirm that edge-to-edge placement provides sufficient weight in all zones including perimeter and corners",
      "Structural loading — concrete pavers at 95–110 kg/m² impose significant dead load — confirm with structural engineer before specifying",
      "Pavers at perimeter and corner zones may need to be supplemented with pebble ballast or mechanical fixing if paver weight alone is insufficient for wind uplift forces in those zones",
      "Confirm paver dimensions, weight, and availability with local precast supplier before specifying",
    ],
    procurementSources: [
      { name: "Local precast concrete suppliers — Hanson, CSR, and regional precast manufacturers", url: "#" },
      { name: "Bayset — ballasted roof system materials", url: "https://www.bayset.com.au" },
      { name: "Landscape paving suppliers — confirm concrete paver suitability for roof ballast", url: "#" },
    ],
    specifierNote: "Confirm paver weight against wind uplift zone requirements, protection layer specification, and structural loading with the membrane manufacturer and structural engineer before specifying.",
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "River-pebble", label: "River pebble ballast" },
  { id: "Concrete-paver", label: "Concrete paver ballast" },
  { id: "Loose-laid", label: "Loose-laid system" },
  { id: "Single-ply", label: "Single-ply membrane" },
  { id: "Wind-uplift", label: "Wind uplift analysis required" },
  { id: "Structural-confirm", label: "Structural confirmation required" },
  { id: "Protection-board", label: "Protection board required" },
  { id: "Pebble-option", label: "Pebble ballast" },
  { id: "Paver-option", label: "Paver ballast" },
  { id: "Walkable", label: "Walkable surface" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  membraneSystem: string;
  ballastType: string;
  minFieldWeight: string;
  perimeterZone: string;
  structuralLoad: string;
  keyRestriction: string;
}[] = [
  {
    product: "Washed River Pebble",
    brand: "Various suppliers",
    membraneSystem: "Loose-laid single-ply membrane systems — confirm with membrane manufacturer",
    ballastType: "Rounded washed river pebble — 20–40mm or 40–75mm",
    minFieldWeight: "Min 50mm depth / 80 kg/m² in field zone — confirm with membrane manufacturer",
    perimeterZone: "Heavier ballast required per wind uplift analysis — do not apply uniform weight without zone differentiation",
    structuralLoad: "Confirm with structural engineer — 80 kg/m² ≈ 0.8 kPa additional dead load",
    keyRestriction: "Rounded smooth pebble only — no sharp crushed aggregate — protection board required — wind uplift analysis mandatory",
  },
  {
    product: "Precast Concrete Pavers",
    brand: "Local precast suppliers",
    membraneSystem: "Loose-laid single-ply membrane systems — confirm with membrane manufacturer",
    ballastType: "Precast concrete paver — 400×400mm or 600×600mm — flat lay or on pedestals",
    minFieldWeight: "~95–110 kg/m² edge-to-edge — confirm against wind uplift design",
    perimeterZone: "Confirm paver weight provides sufficient resistance at perimeter and corner zones — supplement with pebble or mechanical fixing if insufficient",
    structuralLoad: "Confirm with structural engineer — 95–110 kg/m² ≈ 1.0 kPa additional dead load",
    keyRestriction: "Protection board between membrane and pavers — confirm weight against wind uplift zone requirements — structural loading confirmation mandatory",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Loose-laid single-ply PVC and FPO membrane roofs where the membrane is not bonded or mechanically fixed to the substrate in the field area — ballast provides the hold-down mechanism",
    "Podium slab waterproofing using loose-laid single-ply membranes where ballast provides the membrane wind uplift resistance in the field area",
    "Inverted roof systems — where insulation is placed above the membrane and ballast is placed above the insulation as overburden",
    "Any loose-laid membrane installation where wind suction forces on the underside of the membrane must be counteracted by dead weight above",
    "Flat and low-pitch roof decks in Class 2 strata buildings where the structural slab capacity has been confirmed by the structural engineer against the ballast dead load",
  ],
  windUpliftZones: [
    "Field zone — the central area of the roof away from edges — lowest uplift forces — minimum ballast depth and weight applies here — typically 50mm at 80 kg/m²",
    "Perimeter zone — strip around the full roof perimeter — typically 2% of building height wide or minimum 1m, whichever is greater — subject to higher uplift than the field zone",
    "Corner zone — where two perimeter zones intersect at roof corners — subject to the highest uplift forces on the roof — requires the heaviest ballast or supplementary mechanical fixing",
    "Mark zone boundaries on the roof plan before ballast placement — ensure the correct weight is placed in each zone before moving to the next",
    "A common installation error is placing uniform ballast across the full roof without increasing weight at perimeters and corners — this is incorrect and must not occur",
  ],
  limitations: [
    "Do not apply uniform ballast without increasing weight at perimeter and corner zones — zone-specific weights are mandatory per the wind uplift design",
    "Do not specify ballast without a project-specific wind uplift analysis per AS/NZS 1170.2 — a standard depth may be insufficient for the building height, location, and geometry",
    "Do not place ballast on an existing roof or podium slab without structural engineer confirmation that the slab can carry the additional dead load",
    "Do not use sharp crushed aggregate as roof ballast — rounded smooth washed river pebble only — sharp edges can puncture or abrade the membrane under ballast weight",
    "Do not place ballast over the membrane without confirming all seams are complete and tested first — once ballast is placed, all seams are permanently inaccessible",
    "If the structural slab cannot carry the ballast load, specify a mechanically fixed or fully bonded membrane system instead of a loose-laid ballasted system",
  ],
  standardsNotes: [
    "AS/NZS 1170.2 — Wind Actions — provides the wind speed design data for wind uplift analysis — building height, roof geometry, wind region, and terrain category all affect the required ballast weight",
    "Structural engineer — must confirm slab dead load capacity before ballast is specified — 80 kg/m² pebble adds 0.8 kPa; 100mm pebble adds 1.5–1.7 kPa",
    "Membrane manufacturer — the membrane manufacturer and their applicator are responsible for confirming the required ballast weight for the specific project system and wind uplift design",
    "NCC Volume One — performance requirements for roof waterproofing on Class 2 buildings — confirm compliance with the building certifier",
    "Membrane manufacturer system specifications — the membrane manufacturer provides zone-specific ballast weight requirements for their system — always use the current manufacturer data for the specific membrane installed, not generic tables",
  ],
  selectionCriteria: [
    "Confirm ballast type with the membrane manufacturer — some systems have specific requirements for pebble particle size, protection layers, or compatible ballast materials",
    "Rounded smooth washed river pebble — use where a natural stone appearance is acceptable and the roof is not required as a walkable terrace — lower cost than paver ballast",
    "Precast concrete pavers — use where a flat, walkable, maintenance-accessible surface above the membrane is required — higher cost but provides a usable terrace or maintenance deck",
    "Confirm pebble particle size — 20–40mm or 40–75mm depending on the membrane system — larger particles resist wind displacement more effectively",
    "Protection board or separation layer — confirm with membrane manufacturer whether a protection layer is required below the ballast before placing material directly on the membrane",
    "For insulated roof systems — ballast is placed above the insulation in the correct inverted roof sequence — see Tapered Insulation page for the full inverted roof build-up",
  ],
  installationSequence: [
    "Confirm all membrane seams are complete, tested, and documented before any ballast is placed — once ballast is placed, seams are permanently inaccessible",
    "Confirm all membrane perimeter terminations are correctly fixed and sealed per the membrane manufacturer's requirements before ballast placement commences",
    "Place protection board or separation layer above the membrane if required by the membrane manufacturer before ballast placement commences",
    "Confirm the correct ballast depth and weight for each zone from the wind uplift analysis before any material is placed on the roof",
    "Place ballast in the correct zone weights — perimeter and corner zones require heavier ballast than the field zone — do not apply uniformly",
    "Once ballast is placed and confirmed, the membrane is permanently covered — all subsequent condition observations must be from perimeter and penetration details only",
  ],
};

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

export function BallastProductSection() {
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
              Ballast weight and depth requirements, wind uplift zones, structural loading, protection board below ballast, ballast particle size, perimeter and corner zone requirements
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
              <TechCard icon={<CheckCircle size={15} />} title="Wind Uplift Zones" items={TECH_INFO.windUpliftZones} style="check" />
              <TechCard icon={<AlertTriangle size={15} />} title="When NOT to Use / Common Errors" items={TECH_INFO.limitations} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards and Analysis Requirements" items={TECH_INFO.standardsNotes} style="bullet" />
              <TechCard icon={<Ruler size={15} />} title="Selection Criteria" items={TECH_INFO.selectionCriteria} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="Installation Sequence" items={TECH_INFO.installationSequence} style="bullet" />
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
            <p className="mt-1 text-sm text-slate-500">
              2 ballast products — washed river pebble and precast concrete pavers — placed above loose-laid single-ply membrane to provide wind uplift resistance — ballast weight confirmed by wind uplift analysis before ordering
            </p>
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
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""}
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
                      {product.brandUrl !== "#" && (
                        <a
                          href={product.brandUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                        >
                          <ExternalLink size={9} /> Brand Site
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{product.descriptionLine}</p>
                </div>

                {/* Tech spec chips */}
                <div className="flex flex-wrap gap-1.5 border-b border-slate-100 bg-white px-5 py-3">
                  {product.techChips.map((chip) => (
                    <span
                      key={chip.label}
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}
                    >
                      {chip.label}
                    </span>
                  ))}
                </div>

                {/* Specifier Note */}
                {product.specifierNote && (
                  <div className="border-b border-amber-100 bg-amber-50 px-5 py-3">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Specifier Note</p>
                    <p className="text-xs leading-5 text-amber-900">{product.specifierNote}</p>
                  </div>
                )}

                {/* System Description */}
                <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
                  <p className="text-xs leading-6 text-slate-700 whitespace-pre-line">{product.systemDescription}</p>
                </div>

                {/* Technical Properties & Limitations */}
                <div className="space-y-3 px-5 py-4">
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-green-700">Technical Properties</p>
                    <ul className="space-y-1.5">
                      {product.technicalProperties.map((prop, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
                          <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" />
                          {prop}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">Limitations</p>
                    <ul className="space-y-1.5">
                      {product.limitations.map((lim, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
                          <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />
                          {lim}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Procurement Sources */}
                <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-4">
                  <p className="mb-3 text-[10px] uppercase tracking-wider text-slate-400">PROCUREMENT SOURCES</p>
                  <div className="space-y-2">
                    {product.procurementSources.map((src) => (
                      <div
                        key={src.name}
                        className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs"
                      >
                        {src.url !== "#" ? (
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
                          <span className="font-semibold text-slate-700">{src.name}</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-[10px] italic text-slate-400">
                    Confirm suitability with the current manufacturer TDS before specifying or applying.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Ballast System Comparison ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Ballast system comparison</h2>
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of the two ballast products covered on this page. Confirm all selections against the membrane manufacturer requirements, wind uplift analysis, and structural engineer confirmation before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Membrane system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Ballast type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Min field weight</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Perimeter / corner zone</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Structural load</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key restriction</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.membraneSystem}</td>
                  <td className="px-4 py-3 text-slate-600">{row.ballastType}</td>
                  <td className="px-4 py-3 text-slate-600">{row.minFieldWeight}</td>
                  <td className="px-4 py-3 text-slate-600">{row.perimeterZone}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.structuralLoad}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.keyRestriction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
