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
  | "GP-cement"
  | "Fly-ash"
  | "Silica-fume"
  | "Aggregate"
  | "Binder"
  | "SCM"
  | "Site-batched"
  | "AS-3972"
  | "AS-3582";

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
  procurementSources: { name: string; url?: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Boral / Holcim / Adbri",
    brandUrl: "https://www.adbri.com.au",
    accentColor: "#7c3aed",
    name: "General Purpose (GP) Portland Cement — 20 kg",
    descriptionLine: "AS 3972 Type GP cement — primary cementitious binder for site-batched repair mortars, bonding slurry preparation, and non-structural concrete reinstatement",
    productType: "GP Portland cement — AS 3972 Type GP — bagged 20 kg",
    filterTags: ["GP-cement", "Binder", "Site-batched", "AS-3972"],
    techChips: [
      { label: "AS 3972 Type GP", cls: "bg-purple-100 text-purple-900" },
      { label: "20 kg bags", cls: "bg-slate-100 text-slate-700" },
      { label: "Initial set ~2 hrs @ 20°C", cls: "bg-amber-50 text-amber-700" },
      { label: "Boral / Holcim / Adbri", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "General Purpose (GP) Portland cement to AS 3972 is the standard cement used in site-batched repair mortars, bonding slurry, and concrete used in concrete spalling repair. It is used as the primary cementitious binder when the repair is batched on-site from raw materials — for example, a repair mortar mix proportioned as 1 part GP cement : 3 parts washed concrete sand : SBR latex admixture. For remedial work, bagged 20 kg GP cement from Boral, Holcim, or Adbri is the most practical supply form for small-volume site batching. Note that site-batched mortars from raw GP cement and aggregate are less consistent than purpose-manufactured pre-bagged polymer-modified repair mortars (such as Sika MonoTop or Ardex BR 340) — for critical repair applications, pre-bagged factory-manufactured repair mortar is strongly preferred. GP cement from the three major suppliers meets the same AS 3972 GP specification — differences between suppliers are minor in practice.",
    technicalProperties: [
      "AS 3972 Type GP — 20 kg bags — Boral, Holcim, Adbri nationally available",
      "Used in site-batched repair mortars, bonding slurry, and non-structural concrete",
      "Setting time at 20°C: initial set ~2 hours, final set ~4 hours (varies by temperature)",
      "Compressive strength Class 32.5 or 42.5 — confirm from manufacturer",
    ],
    limitations: [
      "Site-batched mortars from GP cement and aggregate are less consistent than factory-manufactured pre-bagged repair mortars — use pre-bagged products for structural or critical repair applications",
      "GP cement does not include polymer modifier — site-batched mortars have lower adhesion and flexibility than polymer-modified repair mortars unless SBR or acrylic admixture is included",
      "Shelf life 3–6 months in sealed unopened bags — store off the ground, dry — lumpy cement indicates partial hydration and must not be used",
    ],
    procurementSources: [
      { name: "Boral Building Products — nationally available", url: "https://www.boral.com.au" },
      { name: "Holcim Australia — nationally available", url: "https://www.holcim.com.au" },
      { name: "Adbri — nationally available", url: "https://www.adbri.com.au" },
      { name: "Bunnings Trade — nationally available", url: "https://www.bunnings.com.au/trade" },
    ],
  },
  {
    fullLabel: "Flyash Australia / Holcim / Regional",
    brandUrl: "https://www.holcim.com.au",
    accentColor: "#64748b",
    name: "Fly Ash — Supplementary Cementitious Material (SCM)",
    descriptionLine: "Class F fly ash to AS 3582.1 — added at 20–30% of cementitious content to improve workability, reduce permeability, and increase chloride resistance in site-batched repair mortars",
    productType: "Fly ash — Class F — AS 3582.1 — supplementary cementitious material",
    filterTags: ["Fly-ash", "SCM", "Site-batched", "AS-3582"],
    techChips: [
      { label: "AS 3582.1 Class F", cls: "bg-slate-100 text-slate-700" },
      { label: "20–30% replacement", cls: "bg-slate-100 text-slate-700" },
      { label: "Slower early strength", cls: "bg-amber-50 text-amber-700" },
      { label: "Reduces chloride permeability", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Class F fly ash to AS 3582.1 is a supplementary cementitious material (SCM) added to site-batched repair mortars and concrete to improve workability, reduce permeability, and increase long-term durability — particularly in chloride and sulfate-exposed environments. Fly ash is a by-product of coal combustion collected as fine particulate from power station exhausts. In remedial repair mortar, fly ash is typically added at 20–30% of total cementitious content as a partial replacement for GP cement. It improves the fluidity of the fresh mix, reduces heat of hydration, and refines the pore structure to reduce permeability and chloride penetration. Strength gain is slower than GP cement alone — fly ash mortars gain most of their strength between 28 and 90 days. For repair mortars requiring early strength, fly ash is not suitable without high early-strength cement or accelerating admixture.",
    technicalProperties: [
      "Class F fly ash — AS 3582.1 — pozzolanic supplementary cementitious material",
      "Replacement rate: 20–30% of total cementitious content (partial GP cement replacement)",
      "Improves workability, reduces permeability, increases chloride resistance",
      "Slower early strength than GP cement — strength gain 28–90 days",
    ],
    limitations: [
      "Not suitable for early-strength repair applications — slow strength gain requires extended protection of fresh repair",
      "Quality varies by source — confirm Class F compliance and fineness from current TDS",
      "Regional availability — not universally stocked — confirm availability in your region before specifying",
    ],
    procurementSources: [
      { name: "Flyash Australia — regional suppliers", url: "https://www.holcim.com.au" },
      { name: "Holcim Australia — confirm regional availability", url: "https://www.holcim.com.au" },
    ],
  },
  {
    fullLabel: "Elkem / Local Suppliers",
    brandUrl: "https://www.elkem.com",
    accentColor: "#0369a1",
    name: "Silica Fume (Microsilica) — Densified",
    descriptionLine: "Densified silica fume to AS 3582.3 added at 5–10% of cementitious content — dramatically reduces permeability in chloride-affected coastal and marine spalling repair mortars",
    productType: "Silica fume — densified — AS 3582.3 — high-durability SCM",
    filterTags: ["Silica-fume", "SCM", "Site-batched", "AS-3582"],
    techChips: [
      { label: "AS 3582.3 densified", cls: "bg-sky-100 text-sky-800" },
      { label: "5–10% of cementitious", cls: "bg-slate-100 text-slate-700" },
      { label: "Requires superplasticiser", cls: "bg-amber-50 text-amber-700" },
      { label: "Coastal/marine structures", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Densified silica fume (microsilica) to AS 3582.3 is a highly reactive pozzolanic SCM added to site-batched repair mortars and concrete at 5–10% of total cementitious content to dramatically reduce permeability and chloride ion penetration. Silica fume particles are approximately 100 times finer than GP cement — they fill the microscopic voids between cement particles in the hydrated paste, creating a very dense, low-permeability matrix. This is particularly valuable in chloride-affected spalling repair on coastal structures, marine structures, and carpark decks exposed to de-icing salts or sea spray. Silica fume significantly increases early compressive strength and reduces water demand — it requires an adequate dosage of superplasticiser to maintain workability. For most patch repair applications, a factory-manufactured silica-fume-enhanced repair mortar is more practical than site-batching silica fume into a mortar from raw materials.",
    technicalProperties: [
      "AS 3582.3 densified silica fume — 5–10% of total cementitious content",
      "Dramatic permeability reduction — fills voids in hydrated cement paste",
      "Increased early compressive strength — reduced chloride ion penetration",
      "Used in high-durability repair mortars for chloride-affected and coastal structures",
    ],
    limitations: [
      "Requires superplasticiser to maintain workability — without it, silica fume makes the mix very stiff",
      "Difficult to handle on site — dusty, fine — use P2 respirator when handling dry silica fume",
      "For most patch repair, purpose-manufactured silica fume repair mortars are more consistent and easier to use than site-batching with raw microsilica",
      "Regional availability varies — confirm from Elkem or concrete admixture supplier",
    ],
    procurementSources: [
      { name: "Elkem — silica fume supplier", url: "https://www.elkem.com" },
      { name: "Concrete admixture suppliers — regional availability varies", url: "https://www.elkem.com" },
    ],
  },
  {
    fullLabel: "Boral / Independent Quarries",
    brandUrl: "https://www.boral.com.au",
    accentColor: "#16a34a",
    name: "Washed Concrete Sand and 10 mm Crushed Aggregate",
    descriptionLine: "AS 2758.1 washed concrete sand (0–5 mm) and 10 mm crushed aggregate for site-batched repair mortars — must be clean, washed, and free of clay, organic, and salt contamination",
    productType: "Fine and coarse aggregate — AS 2758.1 — site-batched repair mortar",
    filterTags: ["Aggregate", "Site-batched"],
    techChips: [
      { label: "AS 2758.1", cls: "bg-green-100 text-green-900" },
      { label: "Fine: 0–5 mm sand", cls: "bg-slate-100 text-slate-700" },
      { label: "Coarse: 10 mm crushed", cls: "bg-slate-100 text-slate-700" },
      { label: "Washed — no contamination", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Washed concrete sand (fine aggregate, particle size 0–5 mm, zone M or zone C) and 10 mm crushed coarse aggregate to AS 2758.1 are used in site-batched repair mortars and concrete for concrete spalling reinstatement repair. Washed concrete sand is the fine aggregate component in site-batched repair mortars — it must be clean, washed, free of organic material, clay, and salt contamination. Contaminated or dirty sand significantly reduces mortar strength and increases shrinkage. 10 mm crushed aggregate is used in site-batched structural reinstatement concrete pours where fine mortar alone is not adequate. Both products are available in 20 kg bags and bulk from Boral building products and independent quarry suppliers. Confirm particle grading from the current supplier test certificate before use — aggregate grading affects the mix design and workability of site-batched mortars.",
    technicalProperties: [
      "Washed concrete sand — AS 2758.1 fine aggregate — particle size 0–5 mm",
      "10 mm crushed aggregate — AS 2758.1 coarse aggregate — for structural repair concrete",
      "Clean, washed — free of organics, clay fines, salt contamination",
      "20 kg bags and bulk supply from Boral and quarry suppliers nationally",
    ],
    limitations: [
      "Do not use beach sand, high-fines river sand, or unwashed aggregate in repair mortars — contamination reduces strength and increases shrinkage",
      "Confirm particle grading and cleanliness from supplier test certificate before use in repair mortars",
      "Site-batched mortar consistency depends on aggregate moisture content — adjust water addition at batch based on aggregate moisture",
    ],
    procurementSources: [
      { name: "Boral Building Products — nationally available", url: "https://www.boral.com.au" },
      { name: "Independent quarry suppliers — regional", url: "https://www.boral.com.au" },
      { name: "Bunnings Trade — 20 kg bags nationally available", url: "https://www.bunnings.com.au/trade" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "GP-cement", label: "GP cement" },
  { id: "Fly-ash", label: "Fly ash" },
  { id: "Silica-fume", label: "Silica fume" },
  { id: "Aggregate", label: "Aggregate" },
  { id: "Binder", label: "Binder" },
  { id: "SCM", label: "SCM" },
  { id: "Site-batched", label: "Site-batched" },
  { id: "AS-3972", label: "AS 3972" },
  { id: "AS-3582", label: "AS 3582" },
];

const SYSTEM_COMPARISON = [
  { product: "GP Portland Cement", standard: "AS 3972 Type GP", role: "Primary binder — site-batched mortars", strength: "Class 32.5 / 42.5", notes: "Use pre-bagged repair mortars for critical applications" },
  { product: "Fly Ash (Class F)", standard: "AS 3582.1 SCM", role: "20–30% replacement — durability improvement", strength: "Slow early — gain 28–90 days", notes: "Slow early strength — not for early-traffic repair" },
  { product: "Silica Fume (densified)", standard: "AS 3582.3 SCM", role: "5–10% addition — permeability reduction", strength: "Increases early strength", notes: "Requires superplasticiser — high-durability coastal repairs" },
  { product: "Concrete Sand / 10 mm Aggregate", standard: "AS 2758.1", role: "Fine/coarse aggregate — site-batched mortars", strength: "N/A", notes: "Must be clean, washed — confirm grading certificate" },
];

const TECH_INFO = {
  typicalApplications: [
    "GP cement used as primary binder in site-batched repair mortars where pre-bagged polymer-modified repair mortar is not available or practical",
    "GP cement mixed with SBR latex admixture and washed concrete sand for site-batched bonding slurry preparation",
    "Fly ash added at 20–30% to site-batched repair mortar to improve workability and long-term durability on chloride-exposed structures",
    "Silica fume added at 5–10% to high-durability repair mortars for coastal, marine, and carpark structures with high chloride exposure",
    "Washed concrete sand and 10 mm aggregate used in site-batched structural reinstatement concrete pours for large-volume spalling repair",
  ],
  selectionCriteria: [
    "For critical structural repair: always use factory-manufactured pre-bagged polymer-modified repair mortar (Sika MonoTop, Ardex BR, Fosroc Renderoc, Mapei Mapegrout) in preference to site-batching from GP cement and aggregate",
    "GP cement site-batching: only appropriate for large-volume reinstatement pours, bonding slurry preparation, or where pre-bagged product is unavailable",
    "Fly ash vs silica fume: fly ash improves workability and long-term durability — silica fume dramatically reduces permeability for high-chloride exposures — different purposes",
    "Aggregate selection: confirm grading from supplier test certificate — aggregate grading zone affects mix design and workability",
    "Do not site-batch from GP cement and sand without polymer admixture for spalling repair — adhesion is inadequate without SBR or acrylic polymer",
  ],
  limitations: [
    "Site-batched mortars from GP cement and aggregate are less consistent than factory-manufactured pre-bagged products — use pre-bagged repair mortars for structural and critical applications",
    "Do not use beach sand, high-fines river sand, or contaminated aggregate in repair mortars — contamination causes rapid strength loss and increased shrinkage cracking",
    "Cement more than 3 months old from manufacture date should be tested before use — damp storage causes partial hydration",
    "Silica fume is a respirable hazard — use P2 respirator when handling dry silica fume on site",
    "Fly ash availability varies by region — confirm availability before specifying for a project",
  ],
  standardsNotes: [
    "AS 3972 — Portland and Blended Cements — Type GP cement specification — binder for site-batched mortars",
    "AS 3582.1 — Fly Ash — supplementary cementitious material specification — Class F fly ash",
    "AS 3582.3 — Amorphous Silica — silica fume specification — densified microsilica",
    "AS 2758.1 — Aggregates and Rock for Engineering Purposes — concrete aggregate specification — particle grading and cleanliness requirements",
    "Pre-bagged polymer-modified repair mortars are preferred in AS 3600 repair specification for consistency and traceability — site-batching requires documented mix design",
  ],
  suitableDefects: [
    "Concrete spalling — large-volume reinstatement pours where site-batched concrete is cost-effective and appropriate",
    "Non-structural gap filling and surface finishing where pre-bagged products are impractical",
    "Bonding slurry preparation — GP cement mixed with SBR latex before repair mortar application",
    "Structural reinstatement concrete pours — full cross-section replacement of severely deteriorated concrete elements",
  ],
  typicalSubstrates: [
    "In-situ reinforced concrete — substrate for repair mortar from any source — pre-bagged products preferred for critical repair",
    "Large-volume concrete elements (columns, beams, slabs) — site-batched concrete appropriate for full element reinstatement where pre-bagged mortar is impractical",
    "Non-structural concrete — site-batched concrete suitable for non-structural fill, levelling, and reinstatement",
  ],
};

export function CementAggregatesIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">Cement and aggregates in concrete spalling repair</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Cement and aggregates are listed as a product category for concrete spalling repair because they are sometimes needed for site-batched mortars, bonding slurries, and structural reinstatement concrete. However, the primary recommendation for concrete spalling repair in Australian remedial practice is to use factory-manufactured pre-bagged polymer-modified repair mortars (such as Sika MonoTop, Ardex BR series, Fosroc Renderoc, or Mapei Mapegrout) rather than site-batching from raw cement and aggregate.
        </p>
        {expanded && (
          <>
            <p>
              Pre-bagged repair mortars provide consistent mix proportions, controlled polymer modification, calibrated setting time, and traceable quality — none of which can be reliably achieved with site batching. Site-batching from raw cement and aggregate is appropriate where pre-bagged repair mortar is not available, for large-volume reinstatement pours where cost and volume make pre-bagged product impractical, or for bonding slurry preparation from GP cement and SBR latex. Supplementary cementitious materials (fly ash and silica fume) are added to site-batched mixes to improve durability — fly ash for workability and long-term permeability, silica fume for high-durability coastal applications.
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

export function CementAggregatesProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 materials — GP cement, fly ash, silica fume, and aggregate for site-batched repair — scroll to view all</p>
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
            {visibleProducts.length} material{visibleProducts.length !== 1 ? "s" : ""} — scroll for more
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
                        <ExternalLink size={9} /> Supplier Site
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
            <p className="mt-1 text-sm text-slate-500">Cement and aggregate materials for site-batched repair mortars. Confirm mix design from specification before batching on site.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Standard</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Role in mix</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Strength note</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Notes</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.standard}</td>
                  <td className="px-4 py-3 text-slate-600">{row.role}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.strength}</td>
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
