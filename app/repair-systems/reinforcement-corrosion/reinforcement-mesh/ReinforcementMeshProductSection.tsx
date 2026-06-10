"use client";

import { useState, useRef } from "react";
import {
  Layers, SquareStack, Ruler, ExternalLink,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight, FileText, BookOpen,
} from "lucide-react";
import {
  CollapsibleList, CollapsibleDescription, CollapsibleSources,
  CollapsibleCardDetails, TechCard,
  CheckCircle, AlertTriangle,
} from "../../_components/ProductPageShared";

type FilterTag =
  | "Welded-mesh"
  | "Deformed-bar"
  | "Trench-mesh"
  | "D500L"
  | "D500N"
  | "Overlay-reinforcement"
  | "Slab-reinforcement"
  | "Structural";

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
    fullLabel: "InfraBuild / OneSteel / Lysaght — Steel Distributor",
    brandUrl: "https://www.infrabuild.com",
    accentColor: "#374151",
    name: "SL62 Welded Mesh — 6 mm D500L",
    descriptionLine: "6 mm diameter D500L ductility class welded mesh — 200 × 200 mm grid — for thin overlays, topping slabs, and slab repair reinforcement",
    productType: "Welded reinforcing mesh — D500L — 6 mm diameter",
    filterTags: ["Welded-mesh", "D500L", "Overlay-reinforcement", "Slab-reinforcement"],
    techChips: [
      { label: "SL62 — 6 mm @ 200 × 200", cls: "bg-slate-100 text-slate-700" },
      { label: "D500L ductility class", cls: "bg-slate-100 text-slate-700" },
      { label: "Overlay and topping slab use", cls: "bg-amber-50 text-amber-700" },
      { label: "Steel distributor — state by state", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "SL62 is a standard welded reinforcing mesh in 6 mm diameter D500L (low ductility) bars at 200 × 200 mm centres. Used in thin concrete overlays, topping slabs, and slab repair reinforcement where a light reinforcing mat is required. D500L ductility class limits its use to applications where the engineer has specified low-ductility mesh — not suitable for applications requiring D500N (normal ductility) or seismic-rated ductility class. Supplied in standard sheet form (usually 6.0 m × 2.4 m). Available from InfraBuild (formerly OneSteel), Lysaght, and steel reinforcing distributors nationally — confirm availability and cut-to-size options with the local distributor. Confirm the specification grade (SL or RL) and bar diameter from the project structural drawings before ordering.",
    technicalProperties: [
      "6 mm D500L deformed bar — 200 × 200 mm weld pattern",
      "D500L — low ductility class — suitable for slab overlays and topping slabs as specified",
      "Standard sheet 6.0 m × 2.4 m — cut to size on site or by distributor",
      "InfraBuild / Lysaght / local steel distributor",
    ],
    limitations: [
      "D500L ductility class — not suitable where D500N or seismic ductility class is specified",
      "Confirm the mesh grade (SL62, SL72, SL82) from the structural drawings — do not substitute grades without engineer's approval",
      "Minimum concrete cover over mesh must be maintained — confirm from AS 3600 for the exposure classification",
      "Not suitable for primary structural reinforcement in beams, columns, or slabs where normal ductility (D500N) is required",
    ],
    procurementSources: [
      { name: "InfraBuild — nationally (state distributors)", url: "https://www.infrabuild.com" },
    ],
  },
  {
    fullLabel: "InfraBuild / OneSteel / Steel Distributor",
    brandUrl: "https://www.infrabuild.com",
    accentColor: "#0369a1",
    name: "SL81 Welded Mesh — 8 mm D500L",
    descriptionLine: "8 mm diameter D500L welded mesh — 200 × 200 mm grid — for thicker overlays, repair pours, and slab-on-grade reinforcement in repair",
    productType: "Welded reinforcing mesh — D500L — 8 mm diameter",
    filterTags: ["Welded-mesh", "D500L", "Overlay-reinforcement", "Slab-reinforcement"],
    techChips: [
      { label: "SL81 — 8 mm @ 200 × 200", cls: "bg-sky-100 text-sky-800" },
      { label: "D500L ductility class", cls: "bg-slate-100 text-slate-700" },
      { label: "Thicker overlays and repair pours", cls: "bg-amber-50 text-amber-700" },
      { label: "Steel distributor — state by state", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "SL81 is a standard welded reinforcing mesh in 8 mm diameter D500L bars at 200 × 200 mm centres. Heavier than SL62, it is used in thicker concrete repair overlays, slab-on-ground repairs, and repair pours where additional reinforcing weight is specified. D500L ductility class — same ductility limitation as SL62. Supplied in standard sheet form. Available from InfraBuild, Lysaght, and steel reinforcing distributors nationally — confirm availability and any fabrication requirements with the local distributor. For repair applications, the structural engineer of record will specify the mesh grade on the repair drawings — do not substitute without written approval.",
    technicalProperties: [
      "8 mm D500L deformed bar — 200 × 200 mm weld pattern",
      "D500L — low ductility class",
      "Heavier reinforcement than SL62 — for thicker overlays and repair pours",
      "InfraBuild / Lysaght / local steel distributor",
    ],
    limitations: [
      "D500L ductility class — not suitable where D500N or seismic ductility is specified",
      "Confirm mesh grade from structural drawings — SL81 vs SL82 vs RL81 — do not substitute without engineer approval",
      "Maintain minimum concrete cover from AS 3600 for the specified exposure classification",
      "Heavier sheet weight than SL62 — confirm site handling and placement requirements with the contractor",
    ],
    procurementSources: [
      { name: "InfraBuild — nationally (state distributors)", url: "https://www.infrabuild.com" },
    ],
  },
  {
    fullLabel: "InfraBuild / Steel Distributor",
    brandUrl: "https://www.infrabuild.com",
    accentColor: "#7c3aed",
    name: "N12 / N16 Deformed Bar — D500N",
    descriptionLine: "12 mm or 16 mm diameter D500N deformed reinforcing bar — for structural repair starter bars, dowels, and repair pour reinforcement requiring normal ductility",
    productType: "Deformed reinforcing bar — D500N — N12 or N16",
    filterTags: ["Deformed-bar", "D500N", "Structural", "Overlay-reinforcement"],
    techChips: [
      { label: "D500N — normal ductility", cls: "bg-violet-100 text-violet-800" },
      { label: "N12 or N16 — 12 mm or 16 mm", cls: "bg-slate-100 text-slate-700" },
      { label: "Starter bars and structural repair", cls: "bg-amber-50 text-amber-700" },
      { label: "Steel distributor — state by state", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "N12 and N16 deformed reinforcing bars in D500N (normal ductility) are used in structural repair applications where normal ductility class is required — including starter bars grouted or epoxy-anchored into existing concrete, structural repair pour reinforcement, and supplementary reinforcement in repair overlays where D500N is specified. D500N bars meet the full ductility and strength requirements of AS 3600 for primary structural reinforcement. N12 (12 mm) and N16 (16 mm) are the most common diameters used in remedial repair work — N10 and N20 are also available. Bars supplied in standard 12 m lengths, cut and bent to order by the steel distributor. Available from InfraBuild and reinforcing steel distributors nationally — confirm lead time for fabricated bar and bent items.",
    technicalProperties: [
      "D500N — 500 MPa yield strength — normal ductility class — suitable for primary structural reinforcement",
      "N12 (12 mm) or N16 (16 mm) — most common repair diameters",
      "Suitable for starter bar installation, structural repair pours, and dowels",
      "InfraBuild — national supply — confirm lead time for cut and bent",
    ],
    limitations: [
      "Do not substitute D500N bar with D500L mesh where D500N ductility is specified by the engineer",
      "Confirm bar diameter and grade from the structural repair drawings — N12 and N16 are different in cross-sectional area and load capacity",
      "Minimum concrete cover must be maintained per AS 3600 for the exposure classification",
      "Fabricated (cut and bent) bar requires lead time — confirm with steel distributor before programming the repair works",
    ],
    procurementSources: [
      { name: "InfraBuild — nationally (state distributors)", url: "https://www.infrabuild.com" },
    ],
  },
  {
    fullLabel: "InfraBuild / Steel Distributor",
    brandUrl: "https://www.infrabuild.com",
    accentColor: "#16a34a",
    name: "Trench Mesh L8TM / L11TM",
    descriptionLine: "Trench mesh (3-bar ladder mesh) — L8TM or L11TM — for strip footing repairs, repair pours to narrow sections, and edge repair reinforcement",
    productType: "Trench mesh — L8TM or L11TM — 3-bar D500L",
    filterTags: ["Welded-mesh", "D500L", "Overlay-reinforcement", "Structural"],
    techChips: [
      { label: "Trench mesh — 3 bar", cls: "bg-green-100 text-green-900" },
      { label: "L8TM or L11TM", cls: "bg-slate-100 text-slate-700" },
      { label: "Strip footings and narrow repair pours", cls: "bg-amber-50 text-amber-700" },
      { label: "Steel distributor — state by state", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Trench mesh (L8TM and L11TM) is a 3-bar ladder-style welded mesh product used for strip footing repair, narrow repair pours, retaining wall repairs, and situations where a full sheet mesh is not practical. L8TM uses 8 mm D500L bars; L11TM uses 11 mm D500L bars. The 3-bar configuration fits into narrow trench or strip footing excavations where full-width mesh sheets cannot be placed. Used in remedial repair for footing crack repairs, edge beam rebuild, and strip footing reinforcement. Supplied in lengths by the steel distributor — confirm standard length availability and cut-to-size options with the local distributor. Confirm the trench mesh specification from the structural repair drawings before ordering.",
    technicalProperties: [
      "3-bar D500L ladder mesh — L8TM (8 mm) or L11TM (11 mm)",
      "Suited to narrow trench, strip footing, and edge repair sections",
      "D500L ductility class — confirm suitability with the engineer of record",
      "InfraBuild / local steel distributor",
    ],
    limitations: [
      "D500L ductility — not suitable where D500N or seismic class is specified for the repair element",
      "3-bar configuration limits the width of the reinforced section — confirm suitability for the repair geometry with the engineer",
      "Confirm L8TM vs L11TM specification from the drawings — the two grades are different in bar diameter and cross-sectional area",
      "Minimum concrete cover requirements under AS 3600 apply — confirm cover achievable with the repair section geometry",
    ],
    procurementSources: [
      { name: "InfraBuild — nationally (state distributors)", url: "https://www.infrabuild.com" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Welded-mesh", label: "Welded mesh" },
  { id: "Deformed-bar", label: "Deformed bar" },
  { id: "Trench-mesh", label: "Trench mesh" },
  { id: "D500L", label: "D500L" },
  { id: "D500N", label: "D500N" },
  { id: "Overlay-reinforcement", label: "Overlay reinforcement" },
  { id: "Slab-reinforcement", label: "Slab reinforcement" },
  { id: "Structural", label: "Structural" },
];

const SYSTEM_COMPARISON = [
  {
    product: "SL62 Welded Mesh",
    bar: "6 mm @ 200 × 200",
    grade: "D500L",
    spacing: "200 × 200 mm",
    notes: "Thin overlays and topping slabs — lightest mesh option",
  },
  {
    product: "SL81 Welded Mesh",
    bar: "8 mm @ 200 × 200",
    grade: "D500L",
    spacing: "200 × 200 mm",
    notes: "Thicker overlays and repair pours — heavier than SL62",
  },
  {
    product: "N12 / N16 Deformed Bar",
    bar: "12 mm or 16 mm",
    grade: "D500N",
    spacing: "As per structural drawings",
    notes: "Primary structural repair — starter bars and repair pours",
  },
  {
    product: "Trench Mesh L8TM / L11TM",
    bar: "8 mm or 11 mm — 3 bar",
    grade: "D500L",
    spacing: "3-bar ladder",
    notes: "Strip footings and narrow repair sections",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Concrete overlay reinforcement on existing carpark slabs and slab-on-ground repairs where a reinforcing mat is specified over the existing substrate",
    "Repair pour reinforcement in structural concrete repair where the engineer has specified a reinforced repair",
    "Starter bar installation (N12 / N16 D500N) into existing concrete using chemical anchor adhesives — for new construction joints, repair pour connections, and structural continuity",
    "Strip footing repair reinforcement using trench mesh (L8TM / L11TM) in footing crack or spalling repair",
    "Supplementary reinforcement in seismic or structural upgrade works where the engineer specifies additional reinforcement over or adjacent to existing reinforcement",
    "Edge beam rebuild and balcony repair where the existing reinforcement is removed and replaced with new bar after break-out",
  ],
  selectionCriteria: [
    "Mesh grade (SL62, SL81) — selected by the structural engineer based on the repair load case and AS 3600 requirements — do not substitute grades without engineer approval",
    "D500L vs D500N — D500L is specified for non-structural overlays and topping slabs; D500N (deformed bar) is specified for primary structural reinforcement and where seismic ductility is required",
    "Deformed bar (N12, N16) for starter bars and structural repair pours where mesh cannot physically fit or where the engineer requires individual bars at specific centres",
    "Trench mesh for narrow strip footing repairs and edge sections where full-width mesh sheet placement is not possible",
    "Confirm bar diameter and spacing from the structural repair drawings — the structural engineer specifies the reinforcement; the contractor sources and places it",
    "Minimum concrete cover — confirm from AS 3600 Table 4.10.3 for the specified exposure classification — this drives the formwork and spacer selection",
  ],
  limitations: [
    "Reinforcement is a structural element — selection of grade, diameter, spacing, and cover is the responsibility of the structural engineer of record — do not vary from the specification without written approval",
    "D500L mesh is not suitable for use in seismic design or where normal ductility class (D500N) is required — check the structural specification",
    "Corroded or section-loss-damaged existing reinforcement must be assessed by the structural engineer before a repair strategy is determined — the engineer may specify full bar replacement rather than repair mortar only",
    "Minimum lap length, development length, and connection details for new-to-existing reinforcement must be designed by the structural engineer — do not assume standard lap lengths apply",
    "Bar chairs and cover spacers must be of appropriate type and size — plastic bar chairs prevent staining; mortar spacers can become corrosion initiation points in exposed environments",
    "Tie wire is used for positioning only — it provides no structural load transfer between bars",
  ],
  standardsNotes: [
    "AS/NZS 4671 — Steel reinforcing materials — bar and mesh grade designations, ductility classes, and minimum tensile and yield strength requirements",
    "AS 3600 — Concrete Structures — cover requirements for the exposure classification, reinforcement spacing, and development length requirements",
    "AS 3600 Table 4.10.3 — minimum cover for reinforcement for each exposure class — critical for selecting the correct bar chair height",
    "AS/NZS 4671 D500L — low ductility mesh — suitable for slabs on ground, topping slabs, and overlays as specified by the engineer",
    "AS/NZS 4671 D500N — normal ductility — suitable for all primary structural reinforcement including beams, columns, and slabs where ductility is required",
  ],
  suitableDefects: [
    "Structural concrete repair where the engineer specifies a reinforced repair pour",
    "Carpark slab overlay where a reinforced bonded overlay is specified to restore structural slab depth and load capacity",
    "Balcony and edge beam rebuild requiring new reinforcement after full break-out and removal of the existing corroded or structurally inadequate section",
    "Strip footing repair where the footing depth or width is reinstated with reinforced concrete after break-out and clean-up",
  ],
  typicalSubstrates: [
    "New repair pour concrete — the mesh or bar is placed within the formwork or repair pour and encapsulated in the new concrete",
    "Existing concrete slab surface — overlay mesh placed on bar chairs above the prepared existing slab surface before overlay pour",
    "Existing concrete where starter bars are epoxy-anchored or grouted into drilled holes",
    "Strip footing excavation — trench mesh placed in the trench before fresh concrete pour in strip footing repair",
  ],
};

export function ReinforcementMeshIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">Reinforcing mesh and bar in concrete repair and structural reinforcement corrosion remediation</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Reinforcing mesh and bar are specified by the structural engineer in repair applications where new or supplementary reinforcement is required — for example, in structural repair pours, reinforced overlays, and edge beam or balcony rebuilds. In reinforcement corrosion repair, new bar replaces corroded bars that are assessed as having insufficient remaining section after break-out and cleaning. The reinforcement grade, diameter, and spacing are determined by the engineer of record from AS 3600 requirements.
        </p>
        {expanded && (
          <>
            <p>
              The most common grades in Australian reinforced concrete repair are D500L (low ductility) welded mesh (SL62, SL81) for overlays and topping slabs, and D500N deformed bar (N12, N16) for structural repair pours and starter bar installation. Trench mesh (L8TM, L11TM) is used in narrow repair sections and strip footing repair. Sourcing is from InfraBuild (formerly OneSteel/Smorgon Steel) and regional steel distributors. Confirm the specific grade and cut requirements from the structural repair drawings before ordering.
            </p>
          </>
        )}
      </div>
      <button onClick={() => setExpanded((e) => !e)} className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900">
        {expanded ? "Read less ↑" : "Read more ↓"}
      </button>
    </div>
  );
}

export function ReinforcementMeshProductSection() {
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

  const visibleProducts = activeFilters.size === 0
    ? PRODUCTS
    : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });
  };

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setAccordionOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50"
        >
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable substrates</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? (<>Hide detail <ChevronUp size={14} /></>) : (<>Show detail <ChevronDown size={14} /></>)}
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

      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">4 products — welded mesh, deformed bar, and trench mesh for concrete repair reinforcement — scroll to view all</p>
          </div>
        </div>

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
                  active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
                }`}
              >
                {f.label}
              </button>
            );
          })}
          {activeFilters.size > 0 && (
            <button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">
              Clear filters
            </button>
          )}
        </div>

        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll for more
          </span>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll("left")} aria-label="Scroll left" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => scroll("right")} aria-label="Scroll right" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {visibleProducts.map((product) => (
            <div key={product.name} className="flex-none" style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ borderLeft: `4px solid ${product.accentColor}` }}>
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                      {product.fullLabel}
                    </span>
                    <div className="flex shrink-0 items-center gap-1">
                      {product.tdsUrl && (
                        <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
                          <FileText size={9} /> TDS
                        </a>
                      )}
                      <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
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
                <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
                  <CollapsibleDescription text={product.systemDescription} />
                </div>
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
                <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3">
                  <CollapsibleSources sources={product.procurementSources} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">Reinforcing mesh and bar options for concrete repair. Grade and specification are determined by the structural engineer — do not substitute without written approval.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Bar size</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Grade</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Spacing</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Notes</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.bar}</td>
                  <td className="px-4 py-3 text-slate-600">{row.grade}</td>
                  <td className="px-4 py-3 text-slate-600">{row.spacing}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
