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
  | "Paste-adhesive"
  | "Liquid-resin"
  | "Strip-bonding"
  | "Fabric-saturation"
  | "2-component"
  | "High-modulus"
  | "Overhead"
  | "Vertical";

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
    accentColor: "#0369a1",
    name: "Sika Sikadur-30",
    descriptionLine: "2-component high-modulus thixotropic epoxy paste adhesive for bonding CFRP pultruded strips to concrete — externally bonded strengthening",
    productType: "2-component epoxy paste adhesive — CFRP strip bonding",
    filterTags: ["Paste-adhesive", "Strip-bonding", "2-component", "High-modulus", "Overhead", "Vertical"],
    techChips: [
      { label: "Paste adhesive — CFRP strip bonding", cls: "bg-sky-100 text-sky-800" },
      { label: "2-component — mix on site", cls: "bg-slate-100 text-slate-700" },
      { label: "High modulus — thixotropic", cls: "bg-amber-50 text-amber-700" },
      { label: "Sika Australia nationally", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Sika Sikadur-30 is a 2-component high-modulus, thixotropic epoxy paste adhesive used to bond Sika CarboDur pultruded CFRP strips to the soffit and face of concrete beams and slabs in externally bonded (EB) CFRP strengthening. The thixotropic consistency prevents sagging on vertical and overhead surfaces during the curing period. Both the prepared concrete surface and the primed CFRP strip surface receive Sikadur-30; the strip is then pressed firmly and held until the adhesive stiffens. The high elastic modulus of the cured Sikadur-30 adhesive layer is critical to effective load transfer from the concrete to the CFRP strip — a low-modulus adhesive would reduce the strengthening efficiency. Mix at the specified ratio on site; confirm pot life, minimum bond thickness, and curing requirements from the current Sika Australia TDS. Sikadur-30 is specifically formulated and tested for the Sika CarboDur EB strengthening system.",
    technicalProperties: [
      "2-component epoxy paste — high modulus cured adhesive layer",
      "Thixotropic — suitable for overhead and vertical CFRP strip bonding",
      "Used exclusively with Sika CarboDur CFRP strips in the EB strengthening system",
      "Sika Australia — national trade supply",
    ],
    limitations: [
      "Do not use Sikadur-30 with CFRP fabric (wet lay-up) — Sikadur-30 is a strip bonding paste, not an impregnating resin for fabric saturation",
      "Mix at the correct ratio — incorrect ratio will result in inadequate cure and reduced bond strength",
      "Minimum ambient and substrate temperature must be met — confirm from Sika TDS before use in cold or hot conditions",
      "The bonded CFRP strip must not be loaded until the Sikadur-30 has reached full cure at the site temperature — confirm cure time from TDS",
    ],
    procurementSources: [
      { name: "Sika Australia — national trade supply", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#dc2626",
    name: "Mapei Adesilex PG1",
    descriptionLine: "TODO: owner confirm — Mapei AU site blocked (Cloudflare); could not verify product name, viscosity, or specifications from live source — 2-component low-viscosity epoxy impregnating resin for wet lay-up CFRP fabric strengthening — saturates fabric fibres for flexural and shear strengthening",
    productType: "2-component epoxy impregnating resin — CFRP fabric wet lay-up — TODO: owner confirm from current Mapei AU TDS",
    filterTags: ["Liquid-resin", "Fabric-saturation", "2-component", "Overhead", "Vertical"],
    techChips: [
      { label: "Low-viscosity impregnating resin", cls: "bg-red-100 text-red-900" },
      { label: "Wet lay-up CFRP fabric saturation", cls: "bg-slate-100 text-slate-700" },
      { label: "Compatible with Mapewrap C Uni-Ax", cls: "bg-amber-50 text-amber-700" },
      { label: "Mapei Australia — national supply", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Mapei Adesilex PG1 is a 2-component low-viscosity epoxy laminating resin used to saturate Mapei Mapewrap C Uni-Ax carbon fibre fabric in the wet lay-up CFRP strengthening technique. The low viscosity allows rapid and complete impregnation of the dry carbon fibre fabric, ensuring void-free saturation and effective load transfer between the fibres and the concrete substrate. Mixed on site at the specified ratio, Adesilex PG1 is applied to the prepared concrete surface as a primer coat, the fabric is positioned, and additional resin is applied and worked into the fabric with a roller. Used for flexural and shear strengthening of beams, slabs, and full-wrap column confinement. Adesilex PG1 is part of the Mapei CFRP strengthening system — use only with Mapei Mapewrap fabric. Confirm cure time, mixing ratio, and maximum application temperature from the current Mapei Australia TDS.",
    technicalProperties: [
      "2-component low-viscosity epoxy — for wet lay-up fabric saturation",
      "Compatible with Mapei Mapewrap C Uni-Ax CFRP fabric",
      "Applied as primer coat and fabric saturant in a single system",
      "Mapei Australia — national trade supply",
    ],
    limitations: [
      "Low viscosity — will run and sag on overhead applications if not used with care — experienced applicators required for overhead fabric installation",
      "Do not mix beyond the stated pot life — mixed resin that has begun to gel will not saturate the fabric uniformly",
      "Do not use Adesilex PG1 with non-Mapei CFRP fabrics without confirming compatibility from Mapei",
      "Maximum application temperature is limited — in hot weather, pot life reduces dramatically; plan large-area installations for cooler conditions or early morning",
    ],
    procurementSources: [
      { name: "Mapei Australia — national trade supply", url: "https://www.mapei.com/au" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#15803d",
    name: "Fosroc Nitowrap EP",
    descriptionLine: "TODO: owner confirm — Parchem AU site is JS-rendered; could not verify product name or specifications from live source — 2-component epoxy laminating/impregnating resin for wet lay-up with Fosroc Nitowrap CF CFRP fabric — flexural and shear strengthening",
    productType: "2-component epoxy impregnating resin — CFRP fabric wet lay-up — TODO: owner confirm from current Parchem TDS",
    filterTags: ["Liquid-resin", "Fabric-saturation", "2-component", "Overhead"],
    techChips: [
      { label: "Epoxy impregnating resin", cls: "bg-green-100 text-green-900" },
      { label: "Wet lay-up with Nitowrap CF fabric", cls: "bg-slate-100 text-slate-700" },
      { label: "Parchem — nationally available", cls: "bg-amber-50 text-amber-700" },
      { label: "Confirm current TDS", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Fosroc Nitowrap EP is a 2-component epoxy laminating and impregnating resin for use with Fosroc Nitowrap CF CFRP fabric in the wet lay-up strengthening technique. Nitowrap EP is the resin component of the Fosroc CFRP system — it is used to prime the prepared concrete surface, saturate the CFRP fabric, and finish the surface of the laminate. Applied by brush or roller; the fabric is pressed into the wet resin on the concrete surface and additional resin worked into the fabric. Cures to form the fibre-reinforced epoxy composite. Available through Parchem Construction Supplies (DuluxGroup) nationally. Confirm the current Fosroc Nitowrap EP product specification, mix ratio, lap shear strength, and application protocol from the current Parchem TDS before specifying — the Nitowrap system has been subject to product revision.",
    technicalProperties: [
      "2-component epoxy laminating resin for CFRP fabric wet lay-up",
      "Compatible with Fosroc Nitowrap CF carbon fibre fabric",
      "Applied as concrete primer and fabric saturant",
      "Parchem — DuluxGroup — national trade supply",
    ],
    limitations: [
      "Must be used with Fosroc Nitowrap CF fabric only — do not substitute fabric without Fosroc/Parchem confirmation",
      "Confirm current product specification from Parchem TDS — Nitowrap system subject to revision",
      "Low-viscosity resin — same sag and run risk on overhead surfaces as other wet lay-up resins — specialist applicator required",
      "Structural design by qualified engineer is mandatory before installation",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — national (DuluxGroup)", url: "https://www.parchem.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Paste-adhesive", label: "Paste adhesive" },
  { id: "Liquid-resin", label: "Liquid resin" },
  { id: "Strip-bonding", label: "Strip bonding" },
  { id: "Fabric-saturation", label: "Fabric saturation" },
  { id: "2-component", label: "2-component" },
  { id: "High-modulus", label: "High modulus" },
  { id: "Overhead", label: "Overhead" },
  { id: "Vertical", label: "Vertical" },
];

const SYSTEM_COMPARISON = [
  {
    product: "Sika Sikadur-30",
    viscosity: "Paste (thixotropic)",
    mixRatio: "Confirm from Sika TDS",
    application: "CFRP pultruded strip bonding",
    pairedFRP: "Sika CarboDur S strip",
    lapShear: "High — confirm from TDS",
  },
  {
    product: "Mapei Adesilex PG1",
    viscosity: "Low (liquid)",
    mixRatio: "Confirm from Mapei TDS",
    application: "CFRP fabric wet lay-up saturation",
    pairedFRP: "Mapei Mapewrap C Uni-Ax",
    lapShear: "Confirm from TDS",
  },
  {
    product: "Fosroc Nitowrap EP",
    viscosity: "Low (liquid)",
    mixRatio: "Confirm from Parchem TDS",
    application: "CFRP fabric wet lay-up saturation",
    pairedFRP: "Fosroc Nitowrap CF fabric",
    lapShear: "Confirm from TDS",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Sikadur-30 paste — bonding Sika CarboDur pultruded CFRP strips to beam and slab soffits for flexural strengthening",
    "Adesilex PG1 and Nitowrap EP liquid resins — saturating CFRP fabric for wet lay-up flexural and shear strengthening of beams, slabs, and walls",
    "Column confinement wrapping — Adesilex PG1 or Nitowrap EP used to saturate the wrapping fabric for full-column CFRP confinement",
    "Near-surface mounted (NSM) strip installation — Sikadur-30 paste used to fill slots and bond NSM CFRP strips embedded in sawn grooves",
    "CFRP fabric end-zone anchorage — paste or resin used to bond end anchor fabric at the terminal zones of CFRP strips to prevent plate-end debonding",
    "General structural epoxy bonding — Sikadur-30 is also used for epoxy bonding of concrete elements and steel plates in structural repair",
  ],
  selectionCriteria: [
    "Paste adhesive (Sikadur-30) for pultruded strip bonding — the high viscosity paste is required to fill the micro-roughness on the concrete and strip surfaces and achieve void-free bond",
    "Liquid resin (Adesilex PG1, Nitowrap EP) for fabric wet lay-up — low viscosity is necessary to achieve complete fibre saturation throughout the fabric thickness",
    "Pair the resin with the matched CFRP product — Sikadur-30 with CarboDur, Adesilex PG1 with Mapewrap, Nitowrap EP with Nitowrap CF — cross-system pairing is not warranted",
    "Confirm the cured resin elastic modulus from the TDS — the modulus of the bonding/laminating resin affects the load transfer efficiency of the CFRP system",
    "Consider pot life and application temperature range — hot site conditions dramatically reduce pot life; plan large-area installations for cooler periods",
    "For overhead fabric application, an experienced applicator is essential — liquid resin will run if the pot life is approaching or the resin viscosity is too low for the ambient temperature",
  ],
  limitations: [
    "Do not mix beyond pot life — partially gelled resin will not achieve full cure or adequate bond strength",
    "Do not apply to wet, frost-contaminated, or below-minimum-temperature substrates — confirm minimum substrate temperature from TDS",
    "CFRP laminating resins are hazardous — PPE (gloves, goggles, respiratory protection in confined spaces) required; dispose per SDS",
    "Do not use liquid laminating resins (Adesilex PG1, Nitowrap EP) for pultruded strip bonding — the resin viscosity is too low for the paste adhesive role",
    "Do not use paste adhesive (Sikadur-30) as a fabric saturant — the high viscosity prevents complete fibre impregnation",
    "Structural design by qualified engineer is mandatory — the resin is only part of the CFRP system; the design specifies the CFRP dimensions, orientation, and detailing",
  ],
  standardsNotes: [
    "ACI 440.2R — Guide for the Design and Construction of Externally Bonded FRP Systems — the primary design reference for FRP strengthening using externally bonded laminating resins",
    "EN 1504-4 — Products and Systems for the Protection and Repair of Concrete — structural bonding — applies to epoxy adhesives used in structural bonding applications",
    "AS 3600 — the structural engineer confirms that the FRP-strengthened element meets AS 3600 requirements",
    "Manufacturer certification — Sika, Mapei, Fosroc — confirm current third-party test certificates for tensile strength, elastic modulus, lap shear, and elongation of the cured resin",
    "Pull-off testing — minimum pull-off strength of the concrete surface is typically 1.5 MPa or better before CFRP bonding; confirm the minimum required from the structural engineer",
  ],
  suitableDefects: [
    "Structural strengthening of concrete beams and slabs requiring flexural capacity increase — used as the bonding or laminating resin in the CFRP system",
    "Shear strengthening of concrete elements — wet lay-up fabric applied in U-wrap or full-wrap using laminating resin",
    "Column confinement and ductility enhancement for seismic upgrade — laminating resin saturates the full-wrap CFRP fabric",
    "Near-surface mounted (NSM) CFRP strip installation — paste adhesive fills the sawn groove and bonds the NSM rod or strip",
  ],
  typicalSubstrates: [
    "Prepared in-situ reinforced concrete — minimum CSP 3, dry or SSD, pull-off tested before CFRP bonding",
    "Precast concrete — same preparation requirements; confirm compatibility of the resin with the precast mix from the resin supplier",
    "Primed CFRP pultruded strip surface (Sika CarboDur) — Sikadur-30 is applied to both the strip and the concrete",
    "Dry CFRP fabric — Adesilex PG1 and Nitowrap EP saturate the dry fabric fibres in situ on the prepared concrete surface",
  ],
};

export function EpoxyLaminatingResinsIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">Epoxy laminating and bonding resins for CFRP structural strengthening</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Epoxy laminating and bonding resins are the adhesive medium in externally bonded (EB) CFRP strengthening systems. They bond pultruded CFRP strips to concrete using a paste adhesive (Sikadur-30), or saturate woven CFRP fabric in a wet lay-up technique using a low-viscosity liquid resin (Adesilex PG1, Nitowrap EP). The mechanical properties of the cured resin are critical to load transfer efficiency — an inadequate resin or incorrect application will result in premature debonding.
        </p>
        {expanded && (
          <>
            <p>
              The resin must always be used as part of the matched CFRP system: Sikadur-30 with Sika CarboDur strips, Adesilex PG1 with Mapei Mapewrap fabric, and Nitowrap EP with Fosroc Nitowrap CF fabric. Cross-system pairing is not warranted and voids the system performance data. All CFRP strengthening using these resins requires structural design by a qualified engineer to ACI 440.2R or equivalent, and installation by an experienced CFRP applicator.
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

export function EpoxyLaminatingResinsProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — epoxy paste adhesive and laminating resins for CFRP strengthening systems — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Epoxy paste adhesives and laminating resins for CFRP strengthening systems. Always use paired CFRP product from the same manufacturer's system.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Viscosity</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Mix ratio</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Application</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Paired FRP</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Lap shear</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.viscosity}</td>
                  <td className="px-4 py-3 text-slate-600">{row.mixRatio}</td>
                  <td className="px-4 py-3 text-slate-600">{row.application}</td>
                  <td className="px-4 py-3 text-slate-600">{row.pairedFRP}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.lapShear}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
