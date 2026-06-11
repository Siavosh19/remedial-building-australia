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
  | "Water-based"
  | "Solvent-based"
  | "Wax-emulsion"
  | "Mineral-oil"
  | "Spray-applied"
  | "Brush-applied"
  | "Steel-forms"
  | "Plywood-forms"
  | "Low-staining";

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
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#be123c",
    name: "Sika Separol WB — Water-Based Form Release Agent",
    descriptionLine: "Water-based, low-VOC form release agent for steel and plywood formwork in concrete spalling patch repair and reinstatement",
    productType: "Water-based reactive form release agent — steel and plywood formwork",
    filterTags: ["Water-based", "Spray-applied", "Brush-applied", "Steel-forms", "Plywood-forms", "Low-staining"],
    techChips: [
      { label: "Water-based / low VOC", cls: "bg-rose-100 text-rose-800" },
      { label: "Steel and plywood forms", cls: "bg-slate-100 text-slate-700" },
      { label: "Low staining", cls: "bg-green-50 text-green-700" },
      { label: "Spray or brush applied", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Sika Separol WB is a water-based reactive form release agent used on steel and plywood formwork in concrete spalling repair reinstatement work. A form release agent is applied to the formwork surface before placing repair mortar or concrete — it creates a thin barrier film that prevents the mortar from chemically bonding to the formwork face, allowing the formwork to be stripped cleanly after the mortar has achieved sufficient strength. Sika Separol WB is a low-VOC water-based product suitable for use in enclosed environments including carparks, building interiors, and residential buildings. Apply by brush, roller, or pump spray to a clean, dry formwork face in a thin, even coat. Allow the release agent to dry before placing repair mortar — typically 15–30 minutes at 23°C. Do not allow release agent to run or puddle — pools of release agent on the lower form face cause surface defects and staining in the finished mortar. The product is reactive — it chemically bonds to the form surface and does not transfer significantly to the mortar face.",
    technicalProperties: [
      "Water-based reactive release agent — low VOC — suitable for enclosed environments",
      "For steel and plywood formwork — apply by brush, roller, or pump spray",
      "Allow to dry before placing mortar — 15–30 minutes at 23°C",
      "Low transfer to concrete face — reduces staining of finished repair mortar surface",
    ],
    limitations: [
      "Do not apply to wet formwork — water-based release agents do not adhere to wet or damp form surfaces — ensure formwork is dry before application",
      "Do not allow to puddle or pool — excess release agent on the lower face of formwork causes surface voids and blowhole staining in the finished concrete face",
      "On high-reuse steel formwork in sustained wet conditions, a single coat of water-based release agent may not provide sufficient lubrication — consult Sika technical for multi-pour applications",
      "Not suitable for porous or uncoated foam polystyrene formwork inserts — use mineral oil or a purpose-made release agent for polystyrene",
    ],
    procurementSources: [
      { name: "Sika Australia — distributed nationally via trade", url: "https://aus.sika.com" },
      { name: "Parchem Construction Supplies — nationally", url: "https://www.parchem.com.au" },
      { name: "Concrete and formwork trade suppliers nationally", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Fosroc Australia (via Parchem)",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#7c2d12",
    name: "Fosroc Ronaform — Water-Based Release Agent",
    descriptionLine: "Water-based low-stain release agent for steel, plywood, and coated formwork — good coverage rate and low transfer to concrete face",
    productType: "Water-based release agent — steel, plywood, and coated steel formwork",
    filterTags: ["Water-based", "Spray-applied", "Brush-applied", "Steel-forms", "Plywood-forms", "Low-staining"],
    techChips: [
      { label: "Water-based", cls: "bg-orange-100 text-orange-900" },
      { label: "Low transfer", cls: "bg-green-50 text-green-700" },
      { label: "Steel and plywood", cls: "bg-slate-100 text-slate-700" },
      { label: "Spray or brush", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Fosroc Ronaform is a water-based release agent designed for steel and plywood formwork in concrete construction and repair applications. It is applied to clean formwork faces before repair mortar placement and provides a reliable release film that allows formwork to strip cleanly from the set mortar without damage to the mortar surface. Ronaform has a low transfer characteristic — the release film remains largely on the formwork face rather than transferring to the concrete surface — resulting in minimal staining or surface contamination on the finished mortar. Apply by brush, roller, or spray in a thin, even coat. In remedial repair work, Ronaform is commonly used on the plywood or steel side forms used to form up slab edge repairs, column base repairs, and beam soffit boxing. Available through Parchem Construction Supplies nationally. Coverage rate is typically 30–50 m2/L depending on surface texture and application method.",
    technicalProperties: [
      "Water-based release agent — low VOC — for indoor and enclosed use",
      "Suitable for steel formwork, coated steel, and plywood formwork faces",
      "Low transfer to concrete face — minimal staining of repair mortar surface",
      "Coverage 30–50 m2/L by spray or brush — apply in thin, even coat",
    ],
    limitations: [
      "Apply to dry formwork only — do not apply to wet or damp form faces",
      "Allow to dry before placing mortar — typically 15–30 minutes at 23°C — do not place mortar onto wet release agent",
      "Not suitable for uncoated foam or polystyrene formwork — use a mineral-oil-based or purpose-made release agent for polystyrene",
      "Re-apply for each pour on reused formwork — do not rely on residual release agent from a previous pour",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — nationally", url: "https://www.parchem.com.au" },
      { name: "Fosroc via Parchem — concrete repair trade supply", url: "https://www.parchem.com.au" },
      { name: "Trade concrete and formwork suppliers nationally", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Generic Supply — Workshop / Fuel Supplier",
    brandUrl: "https://www.bunnings.com.au/trade",
    accentColor: "#374151",
    name: "Diesel Fuel / Mineral Oil — Non-Reactive Release",
    descriptionLine: "Common site-mixed alternative — diesel fuel or light mineral oil applied to steel formwork — low cost but high staining and environmental risk",
    productType: "Non-reactive petroleum-based release — diesel or mineral oil on steel forms",
    filterTags: ["Solvent-based", "Mineral-oil", "Brush-applied", "Steel-forms"],
    techChips: [
      { label: "Diesel / mineral oil", cls: "bg-slate-700 text-white" },
      { label: "Steel forms only", cls: "bg-slate-100 text-slate-700" },
      { label: "High staining risk", cls: "bg-red-50 text-red-700" },
      { label: "Not for exposed finishes", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Diesel fuel and light mineral oil are non-reactive petroleum-based release agents that have been used in Australian construction as a low-cost alternative to purpose-made release agents, particularly on steel forms. Applied by brush or rag to a clean steel formwork face before placing mortar or concrete, they form a physical oil barrier that prevents the mortar from bonding to the steel. However, petroleum-based release agents have significant disadvantages compared to purpose-made water-based reactive products: they are high-staining — the oil transfers to the concrete face and leaves brown staining that cannot be removed easily; they are not reactive and do not bond to the form face, so they transfer more readily to the concrete surface; and they are environmental and fire hazards on site. Diesel and mineral oil release agents are not recommended for use in remedial repair work where the mortar surface will be visible, will receive a coating, or where staining will affect appearance or bond of subsequent finishes. Their use on sites with stormwater drainage must be managed carefully to prevent petroleum contamination.",
    technicalProperties: [
      "Non-reactive — oil film only — higher transfer to concrete face than reactive products",
      "Low cost — widely available — suitable for rough steel formwork where staining is acceptable",
      "Apply by brush or rag in thin coat — excess oil causes severe surface voids and staining",
      "Suitable for steel forms only — damages plywood face and causes delamination of ply",
    ],
    limitations: [
      "High staining of concrete and mortar face — the oil film transfers to the concrete surface and causes brown/grey staining — do not use where the mortar surface will be visible or will receive a coating",
      "Environmental risk — do not allow diesel or mineral oil to drain to stormwater or soil — manage waste rags and spills as petroleum waste",
      "Not suitable for plywood formwork — oil damages the ply adhesive and face veneer, causing delamination",
      "Fire hazard — diesel fuel is a class C1 flammable liquid — do not use near hot work, open flame, or ignition sources",
    ],
    procurementSources: [
      { name: "Service stations and fuel suppliers — nationally", url: "https://www.bunnings.com.au/trade" },
      { name: "Hardware and trade supply — mineral oil", url: "https://www.bunnings.com.au/trade" },
      { name: "Not recommended — use purpose-made water-based release agent instead", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Generic — Trade Plastics / Specialty Supply",
    brandUrl: "https://www.construction-chemicals.com.au",
    accentColor: "#d97706",
    name: "Wax Emulsion Release Agent",
    descriptionLine: "Wax-in-water emulsion release agent — better than diesel for release quality and staining — suitable for polished or architectural concrete surface finishes",
    productType: "Wax emulsion release agent — steel, plywood, and FRP formwork",
    filterTags: ["Water-based", "Wax-emulsion", "Spray-applied", "Brush-applied", "Steel-forms", "Plywood-forms", "Low-staining"],
    techChips: [
      { label: "Wax emulsion", cls: "bg-amber-100 text-amber-900" },
      { label: "Lower staining than oil", cls: "bg-green-50 text-green-700" },
      { label: "Steel, plywood, FRP", cls: "bg-slate-100 text-slate-700" },
      { label: "Architectural finishes", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Wax-in-water emulsion release agents are a step above petroleum oils in quality — they consist of a wax compound emulsified in water that is applied to formwork and dries to a thin wax film that provides physical release without significant transfer to the concrete face. Wax emulsion release agents are suitable for steel, plywood, and FRP (fibreglass) formwork and produce a cleaner concrete surface with less staining than petroleum-based products. They are used in applications where the finished concrete or mortar surface quality matters — in remedial work, this includes exposed column repairs, architectural concrete repairs, and precast concrete component reinstatement. Apply by spray or brush to clean, dry formwork and allow to dry before placing mortar. Available from specialist concrete chemicals suppliers including Construction Chemicals Australia. Wax emulsion release agents are not as technically advanced as modern reactive water-based products (such as Sika Separol WB or Fosroc Ronaform) but are a reasonable intermediate option and are widely used in precast production.",
    technicalProperties: [
      "Wax-in-water emulsion — dries to thin wax film — physical release without reactive chemistry",
      "Lower staining than petroleum oils — better surface finish on exposed concrete faces",
      "Suitable for steel, plywood, and FRP fibreglass formwork",
      "Apply by spray or brush — allow to dry before placing mortar — re-apply each pour",
    ],
    limitations: [
      "Not as technically advanced as modern reactive water-based products — modern reactive release agents (Sika Separol WB, Fosroc Ronaform) provide better release and lower staining on high-reuse formwork",
      "Apply to dry formwork only — wax emulsion does not adhere to wet form faces",
      "Allow full dry time before placing mortar — wet wax emulsion transfers to concrete face and can cause surface voids",
      "Do not use on polystyrene or expanded foam formwork inserts — wax emulsion can attack the surface of some foam types",
    ],
    procurementSources: [
      { name: "Construction Chemicals Australia — specialty supply", url: "https://www.construction-chemicals.com.au" },
      { name: "Sika, Fosroc, Mapei — purpose-made alternatives preferred", url: "https://aus.sika.com" },
      { name: "Trade concrete chemical suppliers — nationally available", url: "https://www.construction-chemicals.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Water-based", label: "Water-based" },
  { id: "Solvent-based", label: "Solvent / oil" },
  { id: "Wax-emulsion", label: "Wax emulsion" },
  { id: "Mineral-oil", label: "Mineral oil" },
  { id: "Spray-applied", label: "Spray applied" },
  { id: "Brush-applied", label: "Brush applied" },
  { id: "Steel-forms", label: "Steel forms" },
  { id: "Plywood-forms", label: "Plywood forms" },
  { id: "Low-staining", label: "Low staining" },
];

const SYSTEM_COMPARISON = [
  {
    product: "Sika Separol WB",
    type: "Reactive water-based",
    staining: "Very low",
    suitableforms: "Steel, plywood, coated steel",
    notes: "Best all-round for remedial — low VOC for enclosed spaces",
  },
  {
    product: "Fosroc Ronaform",
    type: "Reactive water-based",
    staining: "Very low",
    suitableforms: "Steel, plywood, coated steel",
    notes: "Good coverage rate — low transfer — for carpark and building repairs",
  },
  {
    product: "Diesel / Mineral Oil",
    type: "Non-reactive petroleum",
    staining: "High",
    suitableforms: "Steel only",
    notes: "Avoid for repairs — high staining, environmental risk, not for coated surfaces",
  },
  {
    product: "Wax Emulsion",
    type: "Physical wax film",
    staining: "Low–moderate",
    suitableforms: "Steel, plywood, FRP",
    notes: "Intermediate — lower staining than oil — less advanced than reactive products",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Boxing up slab edge repairs — apply to plywood or steel side forms before placing repair mortar",
    "Column base and pedestal formwork — apply to steel or plywood forms before casting repair concrete",
    "Beam soffit formwork — apply to soffit boxing and side forms before casting cementitious reinstatement",
    "Precast concrete element repair — apply to form faces when casting replacement sections or fins",
    "Carpark column and wall formwork — water-based release agents preferred in enclosed environments",
    "Any remedial concrete or mortar casting where clean formwork release is required without damage to the mortar surface",
  ],
  selectionCriteria: [
    "Water-based reactive (Sika Separol WB, Fosroc Ronaform) — preferred for all enclosed repair environments, where staining must be minimised, and where the repair mortar surface will be visible or will receive a coating",
    "Wax emulsion — acceptable intermediate choice where reactive products are not available — lower staining than oil",
    "Diesel / mineral oil — use only on steel formwork for rough non-visible substrates — high staining risk — not recommended for remedial repair work",
    "Plywood formwork: reactive water-based or wax emulsion only — petroleum oils damage plywood face and cause delamination",
    "In enclosed carparks and indoor environments: water-based, low-VOC products only — petroleum products create unacceptable fume exposure in enclosed spaces",
    "For architectural or exposed concrete finishes: use manufacturer-specified release agent confirmed with the concrete surface specification — test on sample area first",
  ],
  limitations: [
    "Do NOT apply release agent to reinforcement, bond faces, or substrate contact areas — release agent on bond faces will eliminate mortar adhesion — mask carefully before application",
    "Do not apply to wet formwork — water-based release agents do not bond to wet form faces and petroleum products pool on wet steel",
    "Do not allow release agent to pool or run — pools of release agent on lower form faces cause voids, bugholes, and staining in the finished mortar face",
    "Re-apply for each pour — do not assume residual release agent from a previous pour is sufficient",
    "Petroleum release agents (diesel, mineral oil) are not suitable for use in enclosed environments — use water-based products in carparks, building interiors, and any enclosed space",
    "Keep release agent off existing concrete surfaces where new repair mortar will bond — wipe up any overspray immediately",
  ],
  standardsNotes: [
    "AS 3610 — Formwork for Concrete — references release agents for use with concrete formwork — no Australian Standard specifies a particular type of form release agent for repair work",
    "Repair mortar TDS — the primary reference for form release agent compatibility — some polymer-modified mortars specify which release agents are acceptable and which will affect the mortar chemistry",
    "WorkSafe / WHS — petroleum products (diesel, mineral oil) used as release agents must be treated as hazardous chemicals — SDS required — fire risk management required",
    "Environmental management — all petroleum release agents must be managed as environmental hazards — prevent runoff to stormwater or soil — contain and dispose as regulated waste",
    "AS 1379 — Specification and supply of concrete — references formwork release requirements for fresh concrete",
  ],
  suitableDefects: [
    "Concrete spalling — any repair where formwork is used to contain repair mortar — slab edges, columns, beams, walls",
    "Slab edge deterioration — boxing up slab edges before casting repair mortar",
    "Exposed column bases — steel form boxing around column base repairs",
    "Beam soffit reinstatement — soffit and side formwork for cast mortar repair",
    "Crack filling — grouted crack repairs requiring formwork at cracks",
  ],
  typicalSubstrates: [
    "Steel formwork — the primary substrate for release agent application — reactive water-based or wax emulsion",
    "Plywood formwork (F11 structural ply) — reactive water-based or wax emulsion — petroleum oils damage ply",
    "Coated steel form panels — reactive water-based products are most compatible with coated steel panel systems",
    "FRP and fibreglass formwork — wax emulsion or reactive water-based — check with panel supplier for compatibility",
  ],
};

export function FormReleaseAgentsIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">Form release agents in concrete spalling repair</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          A form release agent is applied to formwork before placing repair mortar or concrete to prevent the fresh mortar from bonding chemically and mechanically to the formwork face. Without a release agent, removal of formwork from set cementitious repair mortar can damage the mortar surface, spall repair edges, and leave mortar adhered to the form — making formwork reuse difficult. In enclosed environments such as carparks and building interiors, water-based, low-VOC reactive release agents are the correct product — petroleum-based alternatives (diesel fuel, mineral oil) are unsuitable due to high fume levels and staining.
        </p>
        {expanded && (
          <>
            <p>
              A reactive water-based release agent chemically bonds to the form surface and forms a thin film that provides clean release without significant transfer to the mortar face. This results in a cleaner finished mortar surface with fewer bugholes and less staining — important when the repair surface will be visible, will receive a waterproof coating, or will be painted. The key application rule is: apply to a clean, dry formwork face in a thin, even coat and allow to dry before placing mortar — excess product or wet application causes surface defects in the finished mortar.
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

export function FormReleaseAgentsProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 release agent products — reactive water-based, wax emulsion, and petroleum alternatives — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of form release agents for concrete spalling repair. Always apply to dry formwork in thin, even coat — allow to dry before placing mortar.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Staining</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Suitable Forms</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Notes</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.staining}</td>
                  <td className="px-4 py-3 text-slate-600">{row.suitableforms}</td>
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
