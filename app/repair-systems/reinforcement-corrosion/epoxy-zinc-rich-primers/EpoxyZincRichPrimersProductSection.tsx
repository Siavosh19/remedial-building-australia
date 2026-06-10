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
  | "2-part-epoxy"
  | "1-part-cementitious"
  | "3-component"
  | "Zinc-rich"
  | "Chloride"
  | "Carbonation"
  | "Brush-applied"
  | "High-build";

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
    fullLabel: "Fosroc / Parchem",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#7c2d12",
    name: "Fosroc Nitoprime Zincrich",
    descriptionLine: "TODO: owner confirm — Parchem AU site is JS-rendered; could not verify product name, components, or chemistry from live source — 2-part epoxy zinc-rich rebar primer — solvent-based — brush applied directly to cleaned rebar before repair mortar",
    productType: "2-part epoxy zinc-rich rebar primer — TODO: owner confirm from current Parchem TDS",
    filterTags: ["2-part-epoxy", "Zinc-rich", "Chloride", "Carbonation", "Brush-applied"],
    techChips: [
      { label: "2-part epoxy zinc-rich", cls: "bg-red-100 text-red-900" },
      { label: "St 2 / St 3 rebar prep", cls: "bg-slate-100 text-slate-700" },
      { label: "Parchem — nationally available", cls: "bg-amber-50 text-amber-700" },
      { label: "Solvent-based — ventilation required", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Fosroc Nitoprime Zincrich is a 2-part epoxy zinc-rich primer applied by brush directly to cleaned reinforcing steel before the application of repair mortar in concrete spalling and reinforcement corrosion repair. Zinc particles in the coating provide sacrificial galvanic protection to the steel, while the epoxy binder provides chemical resistance and adhesion. Applied to rebar cleaned to St 2 minimum (wire brush or needle gun). The primer must be fully cured and within the overcoat window before repair mortar is applied — confirm open time and overcoat window from the current Parchem/Fosroc TDS. Solvent-based formulation — ensure adequate ventilation in confined or enclosed repair areas. Available through Parchem Construction Supplies nationally (DuluxGroup).",
    technicalProperties: [
      "2-part epoxy zinc-rich — sacrificial galvanic protection to cleaned rebar",
      "Applied to rebar cleaned to St 2 minimum by wire brush or needle gun",
      "Solvent-based — ensure adequate ventilation in enclosed repair areas",
      "Parchem — DuluxGroup — national trade supply",
    ],
    limitations: [
      "Rebar must be cleaned to St 2 minimum — product will not bond to loose scale or active rust",
      "Solvent-based — not suitable in confined spaces without mechanical ventilation and appropriate respiratory PPE",
      "Repair mortar must be applied within the overcoat window — if the primer fully cures before mortar is placed, re-prime the surface",
      "Not a migrating corrosion inhibitor — only provides protection where rebar is physically exposed and primed",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — national (DuluxGroup)", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Ardex Australia",
    brandUrl: "https://ardexaustralia.com",
    accentColor: "#0369a1",
    name: "Ardex BR 10 ZP",
    descriptionLine: "Single-component zinc-rich rebar primer — TODO: owner confirm — 'zinc-rich epoxy' descriptor not confirmed from live ardexaustralia.com source (live source describes as zinc-rich primer only, binder chemistry not stated) — brush applied directly to cleaned rebar — compatible with Ardex repair mortars",
    productType: "Single-component zinc-rich rebar primer — TODO: owner confirm epoxy binder chemistry",
    filterTags: ["Zinc-rich", "Chloride", "Carbonation", "Brush-applied"],
    techChips: [
      { label: "Single-component zinc-rich", cls: "bg-sky-100 text-sky-800" },
      { label: "Brush applied to cleaned rebar", cls: "bg-slate-100 text-slate-700" },
      { label: "Compatible with Ardex repair mortars", cls: "bg-amber-50 text-amber-700" },
      { label: "Ardex Australia — national supply", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Ardex BR 10 ZP is a single-component zinc-rich primer applied by brush to cleaned reinforcing steel before the placement of Ardex polymer-modified repair mortars. The zinc content provides sacrificial protection while the polymer binder ensures adhesion and compatibility with Ardex BR-series repair systems. Single-component formulation — no on-site mixing required, which reduces application errors. Apply to rebar cleaned to St 2 or better; allow to reach the required surface tack or curing stage as specified in the current Ardex TDS before applying repair mortar. Ardex Australia supplies nationally through its trade distribution network. Confirm current product availability and TDS from Ardex directly — product naming in the Ardex BR series has been subject to revision.",
    technicalProperties: [
      "Single-component zinc-rich primer — no on-site mixing required",
      "Applied by brush directly to cleaned rebar (St 2 minimum)",
      "Compatible with Ardex BR-series polymer-modified repair mortars",
      "Ardex Australia — national trade supply",
    ],
    limitations: [
      "Clean rebar to St 2 minimum — do not apply over loose scale or chloride-contaminated mill scale",
      "Apply repair mortar within the specified overcoat window — confirm from Ardex TDS",
      "Verify current product name and TDS from Ardex — BR series naming subject to revision",
      "Single-component zinc-rich does not provide the same electrochemical protection level as 2-part epoxy zinc-rich in high-chloride environments — confirm selection with the engineer of record",
    ],
    procurementSources: [
      { name: "Ardex Australia — national trade supply", url: "https://ardexaustralia.com" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#be123c",
    name: "SikaTop Armatec 110 EpoCem",
    descriptionLine: "TODO: owner confirm — Sika AU is a JS SPA; could not verify product name or specifications from live source — 3-component epoxy cement corrosion protection coating and bonding agent — brushed to cleaned rebar and substrate — Sika Australia nationally",
    productType: "3-component epoxy cement rebar coating and bonding agent — TODO: owner confirm from current Sika AU TDS",
    filterTags: ["3-component", "Zinc-rich", "Chloride", "Carbonation", "Brush-applied", "High-build"],
    techChips: [
      { label: "3-component epoxy cement", cls: "bg-rose-100 text-rose-800" },
      { label: "Rebar coating + bonding agent", cls: "bg-slate-100 text-slate-700" },
      { label: "Sika Australia nationally", cls: "bg-amber-50 text-amber-700" },
      { label: "Compatible with Sika MonoTop", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "SikaTop Armatec 110 EpoCem is a 3-component (epoxy resin, cement, water) corrosion protection coating that functions as both a corrosion protection primer for cleaned rebar and a bonding agent applied to the prepared concrete substrate. The epoxy-cement matrix combines the chemical resistance of epoxy with the alkalinity of cement, creating a passivating layer over the rebar. Applied by brush to the cleaned rebar and the prepared concrete substrate face, followed by repair mortar placement into the wet Armatec coating — this wet-on-wet application technique is critical and is part of the Sika system specification. Compatible with Sika MonoTop and SikaTop repair mortar systems. 3-part mixing on site is required — confirm current mixing ratio, pot life, and open time from the current Sika Australia TDS. Available through Sika Australia distributors nationally.",
    technicalProperties: [
      "3-component epoxy cement — rebar corrosion protection and concrete bonding agent in one product",
      "Wet-on-wet application — repair mortar placed into fresh Armatec coating",
      "Compatible with Sika MonoTop and SikaTop repair mortar systems",
      "Sika Australia — trade supply nationally",
    ],
    limitations: [
      "3-component mixing on site — incorrect ratio will compromise corrosion protection and bond strength",
      "Wet-on-wet technique required — repair mortar must be placed while Armatec is still fresh and within pot life",
      "Not suitable for use with repair mortars from other manufacturers unless confirmed by both Sika and the mortar supplier",
      "Rebar must be cleaned to St 2 minimum before Armatec application",
    ],
    procurementSources: [
      { name: "Sika Australia — national trade supply", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#16a34a",
    name: "Mapei Mapefer 1K",
    descriptionLine: "TODO: owner confirm — Mapei AU site blocked (Cloudflare); could not verify product name or specifications from live source — single-component cementitious corrosion protection coating applied directly to cleaned rebar — Mapei Australia nationally",
    productType: "Single-component cementitious rebar corrosion protection coating — TODO: owner confirm from current Mapei AU TDS",
    filterTags: ["1-part-cementitious", "Chloride", "Carbonation", "Brush-applied"],
    techChips: [
      { label: "Single-component cementitious", cls: "bg-green-100 text-green-900" },
      { label: "Applied to cleaned rebar by brush", cls: "bg-slate-100 text-slate-700" },
      { label: "Compatible with Mapegrout repair mortars", cls: "bg-amber-50 text-amber-700" },
      { label: "Mapei Australia — national supply", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Mapei Mapefer 1K is a single-component, polymer-modified cementitious corrosion protection coating applied by brush directly to cleaned reinforcing steel before repair mortar placement. The cementitious matrix provides a high-pH alkaline environment at the rebar surface that passivates the steel and inhibits ongoing electrochemical corrosion. Single-component powder mixed with water on site — no hazardous solvent component. Compatible with Mapei Mapegrout repair mortar systems. Apply to rebar cleaned to St 2 minimum; apply repair mortar while the Mapefer 1K coating is still in a plastic/stiff green state — confirm open time and application technique from the current Mapei Australia TDS. Available through Mapei Australia trade supply nationally.",
    technicalProperties: [
      "Single-component cementitious — powder mixed with water — no solvent",
      "Applied by brush to cleaned rebar (St 2 minimum) as a corrosion protection coating",
      "Compatible with Mapei Mapegrout polymer-modified repair mortars",
      "Mapei Australia — national trade supply",
    ],
    limitations: [
      "Apply repair mortar while coating is still plastic/green — if fully cured before mortar is placed, re-apply",
      "Cementitious coating provides alkaline passivation — does not provide the same zinc galvanic protection level as zinc-rich epoxy primers in high-chloride environments",
      "Rebar must be cleaned to St 2 minimum before application",
      "Single component — no zinc — select zinc-rich product if galvanic protection is required by specification",
    ],
    procurementSources: [
      { name: "Mapei Australia — national trade supply", url: "https://www.mapei.com/au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "2-part-epoxy", label: "2-part epoxy" },
  { id: "1-part-cementitious", label: "1-part cementitious" },
  { id: "3-component", label: "3-component" },
  { id: "Zinc-rich", label: "Zinc-rich" },
  { id: "Chloride", label: "Chloride" },
  { id: "Carbonation", label: "Carbonation" },
  { id: "Brush-applied", label: "Brush applied" },
  { id: "High-build", label: "High-build" },
];

const SYSTEM_COMPARISON = [
  {
    product: "Fosroc Nitoprime Zincrich",
    parts: "2-part epoxy",
    zinc: "Yes — galvanic",
    chloride: "High resistance",
    notes: "Solvent-based — ventilation required",
  },
  {
    product: "Ardex BR 10 ZP",
    parts: "1-component zinc-rich",
    zinc: "Yes — galvanic",
    chloride: "Good resistance",
    notes: "No on-site mixing — simpler application",
  },
  {
    product: "SikaTop Armatec 110 EpoCem",
    parts: "3-component epoxy cement",
    zinc: "No — alkaline passivation",
    chloride: "High resistance",
    notes: "Bonding agent + rebar coating — wet-on-wet",
  },
  {
    product: "Mapei Mapefer 1K",
    parts: "1-component cementitious",
    zinc: "No — alkaline passivation",
    chloride: "Moderate resistance",
    notes: "No solvent — easiest site handling",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Applied by brush to cleaned reinforcing steel exposed during concrete spalling repair before placement of polymer-modified repair mortar",
    "Used in active repair zones on carparks, balconies, facades, and civil structures where rebar is exposed and corrosion is active",
    "Applied to new dowels and starter bars immediately after drilling and before grouting or mortar encapsulation",
    "Used on bridge and overpass structure repair where rebar is exposed and corrosion protection is required before repair mortar is placed",
    "Applied as part of a complete Sika, Ardex, Fosroc, or Mapei repair system to maintain system warranty",
    "High-chloride coastal and marine structure repair where galvanic zinc-rich protection (Fosroc Nitoprime Zincrich, Ardex BR 10 ZP) is specified",
  ],
  selectionCriteria: [
    "2-part epoxy zinc-rich (Fosroc Nitoprime Zincrich) for high-chloride exposure where galvanic sacrificial protection is required — bridges, marine structures, exposed coastal carparks",
    "3-component epoxy cement (SikaTop Armatec 110 EpoCem) when the product also functions as a concrete bonding agent — eliminates the need for a separate bonding agent application",
    "Single-component cementitious (Mapei Mapefer 1K) where solvent-free handling is required — enclosed spaces, low-VOC specifications",
    "Match the primer brand to the repair mortar brand to ensure system warranty coverage — confirm compatibility from the mortar supplier's TDS",
    "Confirm the rebar preparation standard required (St 2, St 3, or Sa 2.5) from the engineer of record and select the primer appropriate for that prep standard",
    "For high-chloride environments, prefer zinc-rich epoxy products over cementitious primers — the galvanic protection is more effective where chloride contamination will continue to migrate to the repair zone",
  ],
  limitations: [
    "All rebar primers require rebar to be cleaned to the minimum standard specified — no primer provides protection over loose scale, active rust flakes, or chloride-contaminated mill scale",
    "Primers must be applied within the overcoat window before repair mortar is placed — if the window is missed, re-prime the surface",
    "Rebar primers do not provide long-term protection in heavily chloride-contaminated concrete without additional protection measures such as cathodic protection or MCI surface treatment",
    "Solvent-based products (Fosroc Nitoprime Zincrich) require mechanical ventilation and appropriate respiratory PPE in enclosed repair areas",
    "3-component products (SikaTop Armatec 110 EpoCem) require accurate on-site mixing — incorrect ratios will compromise both corrosion protection and bond strength",
    "Do not substitute primers between systems without written approval from both the primer and mortar suppliers — bond failure and warranty voidance risk",
  ],
  standardsNotes: [
    "EN 1504-7 — Reinforcement Corrosion Protection — product performance requirements for rebar coating products applied in EN 1504 repair systems",
    "AS 3600 — minimum cover requirements for the exposure classification — rebar preparation standard and primer selection should be consistent with the specified exposure class",
    "AS 1627.4 — Metal finishing — preparation of surfaces — cleaning of rebar by hand tool (St 2) and power tool (St 3) methods",
    "Manufacturer system certificates — Sika MonoTop / Armatec, Ardex BR / ZP, Fosroc Renderoc / Nitoprime, Mapei Mapegrout / Mapefer — confirm the current system compatibility certificate from the supplier",
    "Project specification — the engineer of record or remedial building consultant specification takes precedence over general guidance on this page",
  ],
  suitableDefects: [
    "Chloride-induced reinforcement corrosion — active repair zones where rebar is exposed and corrosion is active",
    "Carbonation-induced reinforcement corrosion — rebar exposed after concrete removal requires priming before mortar replacement",
    "Concrete spalling — rebar exposed during break-out requires cleaning and priming before repair mortar is placed",
    "Dowel and starter bar installation in repair pours — new rebar requires priming before concrete or mortar encapsulation where corrosion protection is specified",
  ],
  typicalSubstrates: [
    "Cleaned reinforcing steel (Rx deformed bar, Rx round bar) after wire brush, needle gun, or angle grinder cleaning to St 2 or better",
    "New deformed bar (D500N) or round bar immediately after fabrication and before concrete cover is placed",
    "Stainless steel bar — confirm primer compatibility with the manufacturer for stainless substrates",
    "Galvanised reinforcement — do not apply zinc-rich epoxy primers over galvanised bar without confirming compatibility — galvanic coupling risk",
  ],
};

export function EpoxyZincRichPrimersIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">Epoxy zinc-rich and cementitious rebar primers in reinforcement corrosion repair</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Rebar primers are applied directly to cleaned reinforcing steel exposed during concrete break-out repair to provide corrosion protection and, in some systems, to act as a bonding agent between the existing concrete and the repair mortar. Zinc-rich primers (Fosroc Nitoprime Zincrich, Ardex BR 10 ZP) provide sacrificial galvanic protection — the zinc corrodes preferentially, protecting the steel below. Cementitious and epoxy-cement products (SikaTop Armatec 110 EpoCem, Mapei Mapefer 1K) provide alkaline passivation of the steel surface.
        </p>
        {expanded && (
          <>
            <p>
              In high-chloride environments — coastal and marine structures, carparks with de-icing salts, industrial structures — zinc-rich epoxy primers are typically preferred for active repair zones. Cementitious primers are appropriate for carbonation-induced repair and for enclosed areas where solvent exposure is a concern. All primers must be applied to rebar cleaned to the minimum standard specified by the engineer — typically St 2 (wire brush / needle gun) — and repair mortar must be placed within the primer's overcoat window. Confirm primer-to-mortar compatibility within the same manufacturer's system to maintain warranty.
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

export function EpoxyZincRichPrimersProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 products — epoxy zinc-rich and cementitious rebar primers — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Epoxy zinc-rich and cementitious rebar primer comparison. Confirm all product selections from current manufacturer TDS before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Parts</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Zinc galvanic</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Chloride resistance</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Notes</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.parts}</td>
                  <td className="px-4 py-3 text-slate-600">{row.zinc}</td>
                  <td className="px-4 py-3 text-slate-600">{row.chloride}</td>
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
