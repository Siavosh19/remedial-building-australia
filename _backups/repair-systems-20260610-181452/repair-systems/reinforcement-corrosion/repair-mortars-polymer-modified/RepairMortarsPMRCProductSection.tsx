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
  | "EN-1504-R4"
  | "EN-1504-R3"
  | "2-component"
  | "1-component"
  | "Thixotropic"
  | "Overhead"
  | "Vertical"
  | "High-strength"
  | "Corrosion-repair";

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
    name: "Sika MonoTop-412N",
    descriptionLine: "1-component polymer-modified repair mortar — EN 1504-3 R4 — thixotropic — overhead and vertical application — high early strength",
    productType: "1-component polymer-modified repair mortar — EN 1504-3 R4",
    filterTags: ["EN-1504-R4", "1-component", "Thixotropic", "Overhead", "Vertical", "High-strength", "Corrosion-repair"],
    techChips: [
      { label: "EN 1504-3 R4", cls: "bg-rose-100 text-rose-800" },
      { label: "1-component — add water only", cls: "bg-slate-100 text-slate-700" },
      { label: "Overhead + vertical", cls: "bg-amber-50 text-amber-700" },
      { label: "Sika Australia nationally", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Sika MonoTop-412N is a 1-component thixotropic polymer-modified repair mortar achieving EN 1504-3 structural repair class R4. Mixed with water on site (no separate polymer component required), MonoTop-412N achieves high early and final compressive strength suitable for structural repair. The thixotropic consistency allows application at layer thicknesses up to 50 mm per lift on overhead and vertical surfaces without slumping. Used in reinforcement corrosion repair after rebar is cleaned, primed with SikaTop Armatec 110 EpoCem (applied wet-on-wet), and the concrete substrate is prepared to minimum CSP 3. Compatible with Sika Ferrogard-903+ surface MCI post-treatment. Confirm current TDS for application temperature limits, minimum and maximum layer thickness, and curing requirements from Sika Australia.",
    technicalProperties: [
      "EN 1504-3 R4 — structural repair class — high compressive strength",
      "1-component — pre-bagged — mixed with water on site only",
      "Thixotropic — overhead and vertical up to 50 mm per lift without slumping",
      "Sika Australia — trade supply nationally",
    ],
    limitations: [
      "Mix strictly to water:powder ratio from Sika TDS — over-watering reduces strength and durability",
      "Apply within the pot life from mixing — discard any mortar that stiffens beyond workable consistency",
      "Substrate must be prepared to minimum CSP 3 and SSD (saturated surface dry) before application",
      "Do not apply in direct sunlight or high-wind conditions without shade/windbreak — rapid drying causes plastic shrinkage cracking",
    ],
    procurementSources: [
      { name: "Sika Australia — national trade supply", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Ardex Australia",
    brandUrl: "https://www.ardex.com.au",
    accentColor: "#0369a1",
    name: "Ardex BR 345",
    descriptionLine: "2-component polymer-modified repair mortar — thixotropic — overhead and vertical — high-build — for reinforcement corrosion and concrete spalling repair",
    productType: "2-component polymer-modified repair mortar",
    filterTags: ["EN-1504-R3", "2-component", "Thixotropic", "Overhead", "Vertical", "Corrosion-repair"],
    techChips: [
      { label: "2-component — powder + liquid", cls: "bg-sky-100 text-sky-800" },
      { label: "Thixotropic — overhead + vertical", cls: "bg-slate-100 text-slate-700" },
      { label: "High-build per lift", cls: "bg-amber-50 text-amber-700" },
      { label: "Ardex Australia — national supply", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Ardex BR 345 is a 2-component polymer-modified repair mortar (cement powder + polymer liquid component) used for structural and cosmetic repair of reinforced concrete in reinforcement corrosion and concrete spalling repair scenarios. The 2-component formulation provides consistent polymer content without the variability of site-batched polymer additions. Thixotropic rheology allows overhead and vertical application without slumping at appropriate build thicknesses. Used as part of the Ardex BR repair system following rebar cleaning and application of Ardex BR 10 ZP rebar primer. Confirm current product classification, EN 1504-3 class, application thickness per lift, and curing protocol from the current Ardex Australia TDS — the BR product range has been subject to revision and renaming.",
    technicalProperties: [
      "2-component — polymer powder + liquid — consistent polymer content",
      "Thixotropic — suitable for overhead and vertical application",
      "High-build per lift — confirm maximum thickness from Ardex TDS",
      "Ardex Australia — national trade supply",
    ],
    limitations: [
      "2-component — liquid component must be added at specified ratio — incorrect ratio compromises performance",
      "Confirm current product name and EN 1504-3 classification from Ardex — BR series subject to revision",
      "Apply within pot life after mixing — discard overworked mortar",
      "Substrate must be prepared to the Ardex specification — minimum CSP 3 and SSD",
    ],
    procurementSources: [
      { name: "Ardex Australia — national trade supply", url: "https://www.ardex.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#7c2d12",
    name: "Fosroc Renderoc HB",
    descriptionLine: "Polymer-modified repair mortar — thixotropic high-build — overhead and vertical — EN 1504-3 class R3/R4 — Parchem national supply",
    productType: "Polymer-modified thixotropic high-build repair mortar",
    filterTags: ["EN-1504-R4", "1-component", "Thixotropic", "Overhead", "Vertical", "High-strength", "Corrosion-repair"],
    techChips: [
      { label: "EN 1504-3 R3/R4", cls: "bg-red-100 text-red-900" },
      { label: "Thixotropic high-build", cls: "bg-slate-100 text-slate-700" },
      { label: "Overhead + vertical", cls: "bg-amber-50 text-amber-700" },
      { label: "Parchem — nationally available", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Fosroc Renderoc HB is a polymer-modified thixotropic repair mortar for structural repair of reinforced concrete structures affected by spalling and reinforcement corrosion. The thixotropic consistency allows hand application on overhead and vertical surfaces at build thicknesses specified in the Fosroc TDS without sagging. Renderoc HB is used as part of the Fosroc Renderoc repair system following substrate preparation, rebar cleaning, and application of Fosroc Nitoprime Zincrich rebar primer. EN 1504-3 class R3 or R4 depending on the specific Renderoc product — confirm classification from the current Parchem/Fosroc TDS, as the Renderoc range includes multiple grades. Available through Parchem Construction Supplies (DuluxGroup) nationally.",
    technicalProperties: [
      "Polymer-modified thixotropic high-build repair mortar",
      "EN 1504-3 R3/R4 — confirm specific classification from Parchem TDS",
      "Suitable for overhead and vertical application without sagging",
      "Parchem — DuluxGroup — national trade supply",
    ],
    limitations: [
      "Confirm the specific Renderoc grade and EN 1504-3 class from Parchem before specifying — Renderoc HB, HB60, and HBS are different products",
      "Substrate preparation to CSP 3 minimum required — Nitoprime Zincrich rebar primer and Nitobond EP bonding agent specified in the Fosroc system",
      "Apply within pot life — do not add water to stiffened mortar",
      "Maximum layer thickness per lift is product-specific — confirm from Parchem TDS",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — national (DuluxGroup)", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#16a34a",
    name: "Mapei Mapegrout Thixotropic",
    descriptionLine: "1-component polymer-modified thixotropic repair mortar — EN 1504-3 R3 — for vertical and overhead repair of reinforced concrete — Mapei Australia nationally",
    productType: "1-component polymer-modified thixotropic repair mortar — EN 1504-3 R3",
    filterTags: ["EN-1504-R3", "1-component", "Thixotropic", "Overhead", "Vertical", "Corrosion-repair"],
    techChips: [
      { label: "EN 1504-3 R3", cls: "bg-green-100 text-green-900" },
      { label: "1-component — add water only", cls: "bg-slate-100 text-slate-700" },
      { label: "Thixotropic — overhead + vertical", cls: "bg-amber-50 text-amber-700" },
      { label: "Mapei Australia — national supply", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Mapei Mapegrout Thixotropic is a pre-bagged 1-component polymer-modified repair mortar achieving EN 1504-3 R3. Mixed with water on site (no polymer liquid additive required), the thixotropic formulation is suitable for overhead and vertical application. Used as part of the Mapei concrete repair system following substrate preparation, rebar cleaning, and application of Mapei Mapefer 1K rebar primer (apply repair mortar while Mapefer is still plastic). Mapegrout Thixotropic is one of several grades in the Mapei Mapegrout range — confirm the correct grade for the structural class required (R2, R3, or R4) from the current Mapei Australia TDS. Available through Mapei Australia trade supply nationally.",
    technicalProperties: [
      "EN 1504-3 R3 — confirm current TDS for strength class",
      "1-component — pre-bagged — add water on site only",
      "Thixotropic — suitable for overhead and vertical application",
      "Mapei Australia — national trade supply",
    ],
    limitations: [
      "EN 1504-3 R3 — if R4 structural class is required, confirm from Mapei whether Mapegrout Thixotropic meets the specification or whether a higher-grade Mapegrout product is needed",
      "Confirm current TDS — Mapegrout range has multiple grades; do not assume all are thixotropic",
      "Apply within pot life — do not add water to stiffened mortar",
      "Apply repair mortar while Mapefer 1K primer is still plastic — if primer fully dries before mortar is placed, re-apply primer",
    ],
    procurementSources: [
      { name: "Mapei Australia — national trade supply", url: "https://www.mapei.com/au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "EN-1504-R4", label: "EN 1504-3 R4" },
  { id: "EN-1504-R3", label: "EN 1504-3 R3" },
  { id: "2-component", label: "2-component" },
  { id: "1-component", label: "1-component" },
  { id: "Thixotropic", label: "Thixotropic" },
  { id: "Overhead", label: "Overhead" },
  { id: "Vertical", label: "Vertical" },
  { id: "High-strength", label: "High-strength" },
  { id: "Corrosion-repair", label: "Corrosion repair" },
];

const SYSTEM_COMPARISON = [
  {
    product: "Sika MonoTop-412N",
    class: "R4",
    parts: "1-component",
    primer: "SikaTop Armatec 110 EpoCem",
    strength: "High — confirm from TDS",
    notes: "Wet-on-wet with Armatec — no separate bonding agent",
  },
  {
    product: "Ardex BR 345",
    class: "R3 — confirm",
    parts: "2-component",
    primer: "Ardex BR 10 ZP",
    strength: "High — confirm from TDS",
    notes: "Consistent polymer content — 2-part system",
  },
  {
    product: "Fosroc Renderoc HB",
    class: "R3/R4 — confirm",
    parts: "1-component",
    primer: "Nitoprime Zincrich + Nitobond EP",
    strength: "High — confirm from TDS",
    notes: "Multiple Renderoc grades — confirm HB vs HB60 vs HBS",
  },
  {
    product: "Mapei Mapegrout Thixotropic",
    class: "R3",
    parts: "1-component",
    primer: "Mapei Mapefer 1K",
    strength: "Medium-high — confirm from TDS",
    notes: "Apply mortar while primer is still plastic",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Patch repair of spalled concrete over corroded reinforcement in elevated carparks, balconies, building facades, and civil structures",
    "Structural patch repair following break-out, rebar cleaning, priming, and substrate preparation in EN 1504-compliant repair specifications",
    "Overhead soffit repair on carpark slabs and balcony undersides — thixotropic formulation essential to prevent sagging",
    "Vertical column, beam, and wall repair — thixotropic formulation allows hand application without shuttering for smaller patches",
    "Repair of chloride-induced and carbonation-induced corrosion zones in Class 2 strata and commercial carpark structures",
    "Larger patches requiring formwork — these mortars are also suitable for formed pours where a more fluid consistency is needed; confirm with the manufacturer",
  ],
  selectionCriteria: [
    "Match the mortar to the EN 1504-3 repair class required by the engineer of record — R4 for structural repair, R3 for non-structural and cosmetic repair",
    "Match the mortar brand to the rebar primer brand to maintain system warranty — Sika/MonoTop with Armatec, Ardex/BR345 with BR 10 ZP, Fosroc/Renderoc with Nitoprime Zincrich, Mapei/Mapegrout with Mapefer",
    "Select thixotropic formulation for overhead and vertical application — confirm maximum build thickness per lift from the TDS",
    "For repairs requiring formwork, a pourable formulation may be more appropriate — confirm formwork grade product availability from the supplier",
    "Consider the project location — confirm the repair mortar supplier has trade supply in the relevant state before specifying",
    "For marine or high-chloride exposure classifications, confirm that the selected mortar meets the exposure class durability requirements from the TDS",
  ],
  limitations: [
    "Repair mortars are not structural elements — the engineer of record must confirm that patch repair (rather than section strengthening or replacement) is the appropriate repair strategy",
    "Mortar must not be applied in direct sunlight or high-wind conditions without shading and windbreak — plastic shrinkage cracking risk",
    "Do not apply to frozen, frost-contaminated, or wet substrates — confirm minimum substrate temperature from TDS",
    "All polymer-modified repair mortars have limited pot life after mixing — do not use stiffened or re-tempered mortar",
    "Do not apply repair mortar over wet or un-cured rebar primer — confirm primer state from the product TDS before applying mortar",
    "Curing must be applied immediately after finishing — wet hessian or curing compound as specified in the TDS — prevent plastic shrinkage and early drying",
  ],
  standardsNotes: [
    "EN 1504-3 — Products and Systems for the Protection and Repair of Concrete Structures — repair mortars — classes R1 (non-structural) to R4 (structural)",
    "AS 3600 — Concrete Structures — used by the engineer to specify the exposure classification and required performance class for the repair mortar",
    "AS 1379 — Specification and Supply of Concrete — not directly applicable to repair mortars but context for concrete strength class equivalents referenced in specifications",
    "Manufacturer system certificates — Sika, Ardex, Fosroc, Mapei — confirm current EN 1504-3 third-party test certificates from the supplier before specifying",
    "Project specification — the engineer of record specification is the controlling document — match the mortar grade, mixing, application, and curing protocol to the specification",
  ],
  suitableDefects: [
    "Chloride-induced reinforcement corrosion — patch repair of corroded rebar zones after break-out, cleaning, and priming",
    "Carbonation-induced reinforcement corrosion — repair mortar restores concrete cover and alkalinity over cleaned and primed rebar",
    "Concrete spalling — repair of mechanically or corrosion-induced spalled areas where the substrate is sound and primed",
    "Delaminated concrete — after removing the delaminated layer and preparing the sound substrate",
  ],
  typicalSubstrates: [
    "Prepared in-situ reinforced concrete substrate — minimum CSP 3, saturated surface dry (SSD), free of dust, loose material, and oil",
    "Precast concrete — same preparation standard as in-situ; confirm compatibility of mortar with precast mix design from the supplier",
    "Masonry and blockwork — polymer-modified mortars may be used for block or brick repair in some specifications; confirm from TDS",
    "Concrete substrate where bonding agent has been applied — confirm bonding agent compatibility from the mortar supplier's TDS",
  ],
};

export function RepairMortarsPMRCIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">Polymer-modified repair mortars in reinforcement corrosion repair</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Polymer-modified repair mortars are the primary material used to reinstate the concrete cover over cleaned and primed reinforcement in structural and cosmetic patch repair. They are classified under EN 1504-3 from R1 (cosmetic, non-structural) to R4 (structural, high compressive strength). Thixotropic formulations allow overhead and vertical application by hand without sagging, which is essential for soffit repair on elevated carparks and balconies.
        </p>
        {expanded && (
          <>
            <p>
              Repair mortars in reinforcement corrosion repair are used within a complete repair system — substrate preparation, rebar cleaning, rebar priming, bonding agent (or wet-on-wet primer), repair mortar, and curing. Each manufacturer supplies a matched system; the rebar primer and repair mortar should be from the same manufacturer's system to maintain warranty and ensure compatibility. For reinforcement corrosion repair in EN 1504 specifications, the engineer of record will specify the EN 1504-3 repair class required (typically R3 or R4 for structural repairs). Confirm the current product TDS and EN 1504-3 third-party certification before specifying.
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

export function RepairMortarsPMRCProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 products — polymer-modified repair mortars for reinforcement corrosion repair — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Polymer-modified repair mortars for reinforcement corrosion repair. Confirm all selections from current manufacturer TDS before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">EN 1504-3 class</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Parts</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System primer</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Strength</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Notes</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.class}</td>
                  <td className="px-4 py-3 text-slate-600">{row.parts}</td>
                  <td className="px-4 py-3 text-slate-600">{row.primer}</td>
                  <td className="px-4 py-3 text-slate-600">{row.strength}</td>
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
