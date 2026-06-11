"use client";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, BookOpen, Layers, Ruler, SquareStack, FileText } from "lucide-react";
import { CollapsibleList, CollapsibleDescription, CollapsibleSources, CollapsibleCardDetails, TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";

type FilterTag = "Structural" | "Slab-Edge" | "General-Use" | "High-Build" | "Polymer-Modified" | "Pre-Bagged" | "Vertical-Apply" | "EN-1504-3";

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
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/en/construction/concrete-repair-and-protection.html",
    accentColor: "#be123c",
    name: "Sika MonoTop-612 N — Slab Edge Repair Mortar",
    descriptionLine: "Polymer-modified high-strength high-build repair mortar — EN 1504-3 Class R4 — up to 100 mm single layer — vertical and overhead — Sika Australia (current AU product is MonoTop-612 N)",
    productType: "Polymer-modified cementitious repair mortar — EN 1504-3 Class R4 — slab edge",
    filterTags: ["Structural", "Slab-Edge", "General-Use", "High-Build", "Polymer-Modified", "Pre-Bagged", "Vertical-Apply", "EN-1504-3"],
    techChips: [
      { label: "EN 1504-3 Class R4", cls: "bg-rose-100 text-rose-800" },
      { label: "Thixotropic — vertical", cls: "bg-slate-100 text-slate-700" },
      { label: "High-build to 100 mm", cls: "bg-green-50 text-green-700" },
      { label: "Pre-bagged", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sika MonoTop-612 N is the current Australian Sika polymer-modified repair mortar for slab edge spalling repair on Class 2 strata buildings, carparks, and balcony fascia beams. It is rated EN 1504-3 Class R4 and supports high-build application up to 100 mm in a single layer — suitable for both shallow and deep slab edge spalls without requiring multiple lifts. The product is thixotropic and applied vertically and overhead without sagging. On a well-prepared and roughened substrate a bonding primer is generally not required — however when a primer is specified, it is applied to a pre-wet saturated-surface-dry substrate and the mortar applied wet on wet. For corrosion protection applications the mortar is applied wet on dry after the reinforcement corrosion protection product. Slab edge form angles must be fixed before mortar application to maintain a true arris on the repaired edge. Cure minimum 7 days before trafficking. Confirm all specifications from the current Sika Australia TDS — do not use Sika international TDS for Australian projects. TODO: owner confirm — Sika MonoTop-620 is not listed on the current Sika Australia product page; it has been replaced by MonoTop-612 N for high-build applications in the AU market.",
    technicalProperties: [
      "MonoTop-612 N — EN 1504-3 Class R4 — structural slab edge repair — up to 100 mm per single layer",
      "Thixotropic consistency — suitable for vertical and overhead slab soffit application",
      "Pre-bagged dry-mix — mixed with clean water only — no separate polymer additive required",
      "Bonding primer generally not required on well-prepared roughened substrate — confirm from current Sika AU TDS",
      "When primer used: apply wet on wet to pre-wet SSD substrate — Sika MonoTop-910 N or SikaTop Armatec 110 EpoCem",
      "Good adhesion to prepared, saturated-surface-dry concrete substrate",
    ],
    limitations: [
      "Confirm primer requirement from current Sika AU TDS — primer generally not required on well-prepared substrate but may be specified",
      "Do not apply over active or moving cracks — mortar is rigid and will re-crack with ongoing movement",
      "Confirm maximum single-coat thickness from current Sika TDS — exceeding limits causes shrinkage cracking",
      "Not suitable for high-traffic abrasion-resistant surfaces — specify epoxy mortar for traffic areas",
      "Protect fresh mortar from sun, wind, and rain — minimum 24 hours post-application",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply nationally", url: "https://aus.sika.com" },
      { name: "Bayset — national Sika distribution", url: "https://www.bayset.com.au" },
      { name: "Bunnings — MonoTop grades (confirm availability)", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Ardex Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://www.ardex.com.au/products",
    accentColor: "#0369a1",
    name: "Ardex BR 340 — Fibre-Reinforced Polymer-Modified Slab Edge Repair Mortar",
    descriptionLine: "MICROTEC fibre-reinforced polymer-modified structural repair mortar — up to 80 mm per single application — vertical, horizontal and overhead — Ardex trade supply",
    productType: "Fibre-reinforced polymer-modified repair mortar — slab edge — Ardex Australia",
    filterTags: ["Structural", "Slab-Edge", "General-Use", "High-Build", "Polymer-Modified", "Pre-Bagged", "Vertical-Apply"],
    techChips: [
      { label: "Structural repair", cls: "bg-sky-100 text-sky-800" },
      { label: "BR 340 — MICROTEC fibre", cls: "bg-slate-100 text-slate-700" },
      { label: "Up to 80 mm", cls: "bg-green-50 text-green-700" },
      { label: "Ardex trade supply", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Ardex BR 340 is a MICROTEC fibre-reinforced, polymer-modified, structural concrete patching and repair mortar from Ardex Australia for slab edge spalling. It supports application up to 80 mm thickness on vertical, horizontal, and overhead surfaces in a single application. It is a pre-bagged, single-component product mixed with clean water. It also contains an active corrosion inhibitor. Confirm the required priming system from the current Ardex Australia TDS — the product page references Ardex WR Prime as a primer/slurry coat; confirm whether Ardex P 51 is an alternative or additional requirement. BR 340 is thixotropic — suitable for vertical and overhead slab soffit application without sagging. Fix galvanised steel or PVC edge form angles before application to maintain a clean arris on the repaired slab edge. Cure minimum 7 days with wet hessian or curing compound before trafficking. Confirm all primer requirements, DFT, spread rate, and lift limitations from the current Ardex Australia TDS before specifying.",
    technicalProperties: [
      "MICROTEC fibre-reinforced, polymer-modified single-component mortar — mixed with clean water",
      "Thixotropic consistency — suitable for vertical slab edge and overhead soffit application",
      "Up to 80 mm single application — vertical, horizontal and overhead surfaces",
      "Contains active corrosion inhibitor — shrinkage compensated",
      "Pre-bagged dry-mix — consistent quality — no site-measured batching required",
      "Available nationally through Ardex trade supply and selected building merchants",
    ],
    limitations: [
      "Confirm required primer/bond coat from current Ardex Australia TDS — WR Prime slurry coat referenced; confirm P 51 requirement",
      "Do not apply over active settlement cracks — confirm movement is dormant before proceeding",
      "Confirm maximum single-application thickness and any staging requirements from current Ardex TDS",
      "Not suitable for high-abrasion traffic surfaces — confirm with Ardex Australia for exposed slab traffic areas",
      "Confirm current product name and primer requirements from the current Ardex Australia TDS",
    ],
    procurementSources: [
      { name: "Ardex Australia — trade supply nationally", url: "https://www.ardex.com.au" },
      { name: "Ardex distributor network — confirm local branch", url: "https://www.ardex.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem Australia",
    brandUrl: "https://www.parchem.com.au",
    tdsUrl: "https://www.parchem.com.au/products/fosroc",
    accentColor: "#15803d",
    name: "Fosroc Renderoc HB / Renderoc LA55 — Slab Edge Repair Mortars",
    descriptionLine: "Fosroc repair mortars for slab edge — Renderoc HB (high-build structural, up to 80 mm trowel) and Renderoc LA55 (low-alkali EN 1504-3 R4 structural micro-concrete, up to 200 mm form-pour) — distributed nationally by Parchem",
    productType: "Polymer-modified cementitious repair mortar — Fosroc — distributed by Parchem",
    filterTags: ["Structural", "Slab-Edge", "General-Use", "High-Build", "Polymer-Modified", "Pre-Bagged", "Vertical-Apply", "EN-1504-3"],
    techChips: [
      { label: "Renderoc HB — high-build trowel", cls: "bg-green-100 text-green-800" },
      { label: "Renderoc LA55 — R4 structural", cls: "bg-slate-100 text-slate-700" },
      { label: "EN 1504-3 rated", cls: "bg-blue-50 text-blue-700" },
      { label: "Parchem distribution", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Fosroc Renderoc HB and Renderoc LA55 are the primary structural repair mortars from the Fosroc Australia range for slab edge spalling repair, distributed nationally by Parchem. Renderoc HB is the high-build trowel-applied structural repair mortar — applied 10–80 mm vertical in a single application — suitable for balcony fascia beam and soffit repairs where deep concrete cover loss has occurred. The Renderoc HB range includes variants HB25, HB40, HB40 Plus and HB70. Renderoc LA55 is a high-strength, free-flowing low-alkali micro-concrete (EN 1504-3 Class R4, 60 MPa at 28 days) for deep section patch repair by form pour or pump, 50–200 mm depth — it is NOT a fine cosmetic mortar. LA55 contains a dual expansion system for shrinkage control and is compatible with Galvashield anode protection systems. Both are pre-bagged, mixed with clean water. Confirm bond coat requirements from the current Fosroc Parchem TDS — Nitobond AR is referenced as a bonding agent/curing membrane. Steel or PVC edge form angles must be fixed before application on slab edges. Confirm current product grade, lift thickness limits, and primer requirements from the current Fosroc TDS available from Parchem before specifying.",
    technicalProperties: [
      "Renderoc HB — high-build structural trowel mortar — 10–80 mm single application — vertical, overhead",
      "Renderoc LA55 — EN 1504-3 Class R4 — 60 MPa at 28 days — low-alkali — form pour or pump — 50–200 mm depth",
      "Pre-bagged, single-component — mixed with clean water — consistent batch quality",
      "Fosroc Nitobond AR bond coat referenced — confirm primer requirements from current Fosroc TDS",
      "Thixotropic consistency (Renderoc HB) — suitable for vertical and overhead slab soffit application",
      "Distributed nationally through Parchem — confirm local stock with Parchem trade",
    ],
    limitations: [
      "Confirm bond coat/primer requirement from current Fosroc Parchem TDS before specifying",
      "Renderoc LA55 is a structural form-pour micro-concrete — NOT for cosmetic profiling or thin-section work",
      "Confirm HB variant (HB25/HB40/HB70) and lift thickness limits from current Fosroc TDS",
      "Do not apply over active cracks or ongoing settlement movement",
      "Confirm current Fosroc product range and availability from Parchem before specifying",
    ],
    procurementSources: [
      { name: "Parchem — national distribution of Fosroc products", url: "https://www.parchem.com.au" },
      { name: "Parchem trade branches — confirm local availability", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Tremco CPG Australia",
    brandUrl: "https://www.tremcosealants.com.au",
    accentColor: "#78716c",
    name: "Tremco Eucocrete HBM — High-Build Structural Repair Mortar",
    descriptionLine: "Polymer-modified high-build structural repair mortar for concrete slab edge and fascia beam repair — Tremco CPG Australia trade supply",
    productType: "Polymer-modified structural repair mortar — high-build — Tremco CPG Australia",
    filterTags: ["Structural", "Slab-Edge", "General-Use", "High-Build", "Polymer-Modified", "Pre-Bagged", "Vertical-Apply"],
    techChips: [
      { label: "High-build structural", cls: "bg-stone-100 text-stone-700" },
      { label: "Polymer-modified", cls: "bg-slate-100 text-slate-700" },
      { label: "Tremco CPG", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Tremco Eucocrete HBM is a high-build polymer-modified structural repair mortar from Tremco CPG Australia for concrete slab edge and fascia beam repair on Class 2 strata and commercial buildings. The product is a pre-bagged, single-component cementitious mortar mixed with clean water on site. It provides a high-build capacity for deeper slab edge spall repairs where multiple thinner lifts would be impractical. The mortar requires a bonding primer — confirm the appropriate Tremco primer system with Tremco CPG Australia before specifying. Fix steel or PVC edge form angles before application to achieve a clean, true slab edge arris. Cure minimum 7 days before trafficking. Tremco CPG also supplies a range of protective coatings for application over the cured repair where carbonation or chloride protection is required. Confirm current product specifications, primer requirements, and lift thickness limits from the current Tremco CPG Australia TDS before specifying.",
    technicalProperties: [
      "High-build polymer-modified mortar — suited to deeper slab edge repairs",
      "Pre-bagged single-component — mixed with clean water on site",
      "Thixotropic — vertical and overhead application without sagging",
      "Apply over manufacturer-specified primer/bond coat — confirm from Tremco CPG TDS",
      "Available through Tremco CPG Australia trade supply",
    ],
    limitations: [
      "Confirm required primer/bond coat with Tremco CPG before specifying — do not apply over unprepared substrate",
      "Do not apply over active cracks or moving substrate",
      "Confirm maximum single-lift thickness from current Tremco TDS",
      "Confirm current product availability and specifications with Tremco CPG Australia directly",
    ],
    procurementSources: [
      { name: "Tremco CPG Australia — trade supply", url: "https://www.tremcosealants.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions",
    accentColor: "#b45309",
    name: "Mapei Mapegrout T60 — Thixotropic Structural Repair Mortar",
    descriptionLine: "TODO: owner confirm — Mapegrout SHB is not listed on the current Mapei Australia product page. Mapegrout T60 (thixotropic, EN 1504-3) and Mapegrout T40 are the current listed AU thixotropic repair mortars — confirm correct product with Mapei Australia before specifying",
    productType: "TODO: owner confirm — thixotropic cementitious repair mortar — EN 1504-3 — Mapei Australia",
    filterTags: ["Structural", "Slab-Edge", "High-Build", "Polymer-Modified", "Pre-Bagged", "Vertical-Apply", "EN-1504-3"],
    techChips: [
      { label: "TODO: confirm product name", cls: "bg-amber-100 text-amber-800" },
      { label: "EN 1504-3 rated", cls: "bg-blue-50 text-blue-700" },
      { label: "Thixotropic", cls: "bg-slate-100 text-slate-700" },
      { label: "Mapei — trade supply", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "TODO: owner confirm — Mapegrout SHB is not listed on the current Mapei Australia product page (mapei.com/au). The current Mapei Australia thixotropic structural repair mortars listed are Mapegrout T40 and Mapegrout T60. Confirm the correct current AU product name and specifications with Mapei Australia before specifying or publishing. The general characteristics of Mapei thixotropic repair mortars: shrinkage-compensated, polymer-modified cementitious, EN 1504-3 rated, suitable for structural concrete slab edge repairs, applied vertically and overhead. Apply over Mapei Mapefer 1K or Primer SN bonding primer on the prepared saturated-surface-dry concrete substrate. Fix steel or PVC edge angle form before mortar application. Cure with curing compound or wet hessian for minimum 7 days. Confirm current product grade, DFT, and primer from the current Mapei Australia TDS before specifying.",
    technicalProperties: [
      "TODO: owner confirm — Mapegrout SHB not found on AU Mapei site — verify current AU product name with Mapei Australia",
      "EN 1504-3 rated — structural repair classification",
      "Pre-bagged single-component — mixed with clean water",
      "Thixotropic — vertical and overhead application",
      "Apply over Mapei Mapefer 1K or Primer SN bonding primer — confirm from current TDS",
      "Available through Mapei Australia trade supply nationally",
    ],
    limitations: [
      "TODO: owner confirm — verify current Mapei Australia product name before specifying",
      "Mapei primer is mandatory — confirm correct primer from Mapei TDS before application",
      "Do not apply over active cracks or ongoing substrate movement",
      "Confirm maximum lift thickness from current Mapei TDS",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply nationally", url: "https://www.mapei.com/au" },
      { name: "Mapei distributor network — confirm local branch", url: "https://www.mapei.com/au" },
    ],
  },
];

const FILTER_DEFS: { tag: FilterTag; label: string }[] = [
  { tag: "Structural", label: "Structural" },
  { tag: "Slab-Edge", label: "Slab edge" },
  { tag: "General-Use", label: "General use" },
  { tag: "High-Build", label: "High-build" },
  { tag: "Polymer-Modified", label: "Polymer-modified" },
  { tag: "Pre-Bagged", label: "Pre-bagged" },
  { tag: "Vertical-Apply", label: "Vertical apply" },
  { tag: "EN-1504-3", label: "EN 1504-3" },
];

const TECH_INFO = {
  typicalApplications: [
    "Slab edge spalling repair on balconies, carparks, and external walkways",
    "Fascia beam and balcony soffit concrete reinstatement",
    "Step nosing and stair tread edge repair",
    "Corrosion-driven concrete cover loss at slab edge perimeter",
    "Precast panel edge repair and profiling",
    "Post-breakout substrate reinstatement before protective coating",
  ],
  selectionCriteria: [
    "EN 1504-3 Class R3 or R4 for structural repairs reinstating cover over reinforcement — confirm class from current AU TDS",
    "Repair depth — trowel-applied up to 80–100 mm (confirm product) vs form-pour up to 200 mm for deep section repair",
    "Thixotropy required for vertical and overhead slab soffit application",
    "Primer/bond coat compatibility with the selected mortar brand system",
    "Return-to-service time — standard vs rapid-set where early trafficking is required",
    "Coastal exposure — confirm chloride-resistant admixture or specify corrosion inhibitor primer",
  ],
  limitations: [
    "Do not apply over active or moving cracks — confirm settlement is dormant before proceeding",
    "Not suitable for high-abrasion traffic surfaces — specify epoxy aggregate mortar for vehicular traffic",
    "Not suitable for heritage masonry substrates — use lime mortars for brick or stone masonry joints",
    "Do not apply below +5°C or above +35°C without specific cold or hot weather procedures",
    "Curing compound or wet hessian mandatory — rapid drying in sun and wind causes surface cracking",
  ],
  standardsNotes: [
    "EN 1504-3 — Products and Systems for the Protection and Repair of Concrete Structures: Class R3 for structural repair",
    "AS 3600 — Concrete Structures: exposure class and concrete cover requirements",
    "ICRI 310.2 — Guideline for Selecting and Specifying Concrete Surface Preparation (CSP) — minimum CSP 3 for structural repair",
    "NCC performance requirements for structural adequacy of Class 2 elements",
  ],
  suitableDefects: [
    "Slab edge spalling from corrosion-driven concrete cover loss",
    "Impact-damaged step nosings and stair treads",
    "Balcony fascia beam concrete delamination",
    "Carpark deck edge spalling from water and chloride ingress",
    "Concrete cover loss at balcony slab perimeter",
  ],
  typicalSubstrates: [
    "In-situ reinforced concrete slab edges",
    "Precast concrete panel edges",
    "Concrete fascia beams and soffits",
    "Step nosings and stair treads",
    "Carpark deck edges and drainage channels",
  ],
};

const SYSTEM_COMPARISON = [
  { product: "MonoTop-612 N", brand: "Sika", grade: "EN 1504-3 R4", maxLift: "100 mm", feature: "Single product; R4 high-build; primer generally not required on prepared substrate" },
  { product: "BR 340", brand: "Ardex", grade: "Structural", maxLift: "80 mm", feature: "MICROTEC fibre-reinforced; active corrosion inhibitor; confirm primer from TDS" },
  { product: "Renderoc HB / LA55", brand: "Fosroc/Parchem", grade: "EN 1504-3 / R4", maxLift: "80 mm HB / 200 mm LA55 (form-pour)", feature: "HB trowel + LA55 high-strength form-pour micro-concrete" },
  { product: "Eucocrete HBM", brand: "Tremco", grade: "Structural", maxLift: "Confirm TDS", feature: "High-build — confirm primer from Tremco" },
  { product: "TODO: confirm AU name", brand: "Mapei", grade: "EN 1504-3 rated", maxLift: "Confirm TDS", feature: "Mapegrout SHB not listed on AU site — confirm current AU product with Mapei" },
];

export function RepairMortarsPMIntroSection() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-start gap-3 text-left">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700"><BookOpen size={16} /></div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-extrabold text-sky-950">What are polymer-modified repair mortars for slab edge?</h2>
            <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
          </div>
          <p className="mt-1 text-sm text-slate-500">How PM mortars work, the bonding primer requirement, and when to specify high-build vs general-use grades</p>
        </div>
      </button>
      {open && (
        <div className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm leading-7 text-slate-600">
          <p>Polymer-modified (PM) cementitious repair mortars are the standard material for concrete slab edge spalling repair in Australian remedial building practice. They consist of a dry-mix blend of cement, aggregate, and pre-incorporated polymer (acrylic or SBR) mixed with clean water on site. The polymer improves adhesion to existing concrete, reduces shrinkage during curing, and provides better resistance to cracking compared to plain sand-cement mixes — which lose 70–80% of their adhesion when dry-cured onto a dry substrate.</p>
          <p>A bonding primer or bond coat is mandatory before PM mortar application — it is not optional. Applying mortar directly to dry concrete results in very low adhesion and early spalling of the repair. The primer is applied to a saturated-surface-dry substrate, allowed to reach a tacky consistency, and the mortar is then applied before the primer dries fully. The primer-mortar interface is where most slab edge repair failures initiate when this step is skipped.</p>
          <p>Product selection turns on repair depth: Sika MonoTop-612 N (current AU product) supports up to 100 mm in a single layer; ARDEX BR 340 supports up to 80 mm; Fosroc Renderoc HB up to 80 mm by trowel; Renderoc LA55 up to 200 mm by form-pour. Confirm current AU product names and specifications from the current manufacturer TDS before specifying.</p>
        </div>
      )}
    </div>
  );
}

export function RepairMortarsPMProductSection() {
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const [accordionOpen, setAccordionOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (tag: FilterTag) =>
    setActiveFilters((prev) => { const n = new Set(prev); n.has(tag) ? n.delete(tag) : n.add(tag); return n; });

  const filtered = activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter((p) => p.filterTags.some((t) => activeFilters.has(t)));

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir === "left" ? -420 : 420, behavior: "smooth" });
  };

  return (
    <div className="space-y-8">
      {/* Filter tags */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Filter:</span>
        {FILTER_DEFS.map(({ tag, label }) => (
          <button key={tag} onClick={() => toggleFilter(tag)} className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${activeFilters.has(tag) ? "border-red-700 bg-red-700 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-sky-400"}`}>{label}</button>
        ))}
        {activeFilters.size > 0 && <button onClick={() => setActiveFilters(new Set())} className="text-xs font-bold text-red-700 underline">Clear</button>}
      </div>

      {/* Carousel */}
      <div className="relative">
        <button onClick={() => scroll("left")} className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm hover:bg-slate-50"><ChevronLeft size={16} /></button>
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto scroll-smooth pb-2" style={{ scrollbarWidth: "none" }}>
          {filtered.map((p) => (
            <div key={p.name} className="w-80 shrink-0 rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ borderLeftWidth: 4, borderLeftColor: p.accentColor }}>
              <div className="border-b border-slate-100 px-5 py-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">{p.fullLabel}</span>
                  <div className="flex gap-1">
                    {p.tdsUrl && <a href={p.tdsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 hover:text-slate-700"><FileText size={9} /> TDS</a>}
                    <a href={p.brandUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 hover:text-slate-700">Brand</a>
                  </div>
                </div>
                <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{p.name}</h3>
                <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">{p.productType}</p>
                <CollapsibleCardDetails text={p.descriptionLine} chips={p.techChips} />
              </div>
              <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
                <CollapsibleDescription text={p.systemDescription} />
              </div>
              <div className="space-y-3 px-5 py-4">
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-green-700">Technical Properties</p>
                  <CollapsibleList items={p.technicalProperties} icon="check" limit={3} />
                </div>
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">Limitations</p>
                  <CollapsibleList items={p.limitations} icon="x" limit={3} />
                </div>
              </div>
              <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3">
                <CollapsibleSources sources={p.procurementSources} />
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => scroll("right")} className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm hover:bg-slate-50"><ChevronRight size={16} /></button>
      </div>

      {/* Technical Accordion */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left hover:bg-slate-50">
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable substrates</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? "Hide detail" : "Show detail"} <ChevronDown size={14} className={`transition-transform ${accordionOpen ? "rotate-180" : ""}`} />
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

      {/* System Comparison */}
      <div>
        <h3 className="mb-4 text-lg font-extrabold text-sky-950">System Comparison</h3>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-3 text-left font-bold text-slate-700 whitespace-nowrap sticky left-0 bg-slate-50 border-r border-slate-200">Product</th>
                <th className="px-4 py-3 text-left font-bold text-slate-600 whitespace-nowrap">Brand</th>
                <th className="px-4 py-3 text-left font-bold text-slate-600 whitespace-nowrap">Grade</th>
                <th className="px-4 py-3 text-left font-bold text-slate-600 whitespace-nowrap">Max lift</th>
                <th className="px-4 py-3 text-left font-bold text-slate-600 whitespace-nowrap">Key feature</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 bg-inherit px-5 py-3 font-semibold text-slate-800 border-r border-slate-200 whitespace-nowrap">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.grade}</td>
                  <td className="px-4 py-3 text-slate-600">{row.maxLift}</td>
                  <td className="px-4 py-3 text-slate-600">{row.feature}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
