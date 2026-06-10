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
  | "3-component"
  | "1-part-cementitious"
  | "2-part-epoxy"
  | "Bonding-agent"
  | "Rebar-primer"
  | "Zinc-rich"
  | "Chloride"
  | "Carbonation"
  | "Brush-applied";

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
    name: "SikaTop Armatec 110 EpoCem",
    descriptionLine: "3-component epoxy cement — rebar corrosion protection coating and concrete bonding agent in one — wet-on-wet application",
    productType: "3-component epoxy cement — rebar primer and bonding agent",
    filterTags: ["3-component", "Bonding-agent", "Rebar-primer", "Chloride", "Carbonation", "Brush-applied"],
    techChips: [
      { label: "3-component epoxy cement", cls: "bg-rose-100 text-rose-800" },
      { label: "Rebar primer + bonding agent", cls: "bg-slate-100 text-slate-700" },
      { label: "Wet-on-wet mortar placement", cls: "bg-amber-50 text-amber-700" },
      { label: "Sika Australia nationally", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "SikaTop Armatec 110 EpoCem is a 3-component product (epoxy resin, cement powder, water) that serves as both a corrosion protection primer for cleaned reinforcing steel and a bonding agent applied to the prepared concrete substrate. The combination of epoxy chemistry and cement gives both chemical resistance and alkalinity — creating a passivating environment over the rebar. Applied by brush to the rebar and the concrete substrate face in a single operation. The repair mortar is placed wet-on-wet into the fresh Armatec coating — this combined application method eliminates the need for a separate bonding agent. Compatible with Sika MonoTop and SikaTop repair mortar systems. Confirm current mixing ratio, pot life, and application rate from Sika Australia TDS. Available through Sika Australia distributors nationally.",
    technicalProperties: [
      "3-component epoxy cement — combined rebar primer and concrete bonding agent",
      "Applied to cleaned rebar (St 2 minimum) and prepared concrete substrate in one operation",
      "Repair mortar placed wet-on-wet into fresh Armatec — critical application technique",
      "Sika Australia — trade supply nationally",
    ],
    limitations: [
      "3-component on-site mixing required — incorrect ratio compromises both corrosion protection and bond strength",
      "Repair mortar must be placed while Armatec is within pot life — wet-on-wet technique is not optional",
      "Rebar must be cleaned to St 2 minimum before application — do not apply over loose scale or active rust flakes",
      "Not suitable for use with non-Sika repair mortars without written compatibility confirmation",
    ],
    procurementSources: [
      { name: "Sika Australia — national trade supply", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Ardex Australia",
    brandUrl: "https://www.ardex.com.au",
    accentColor: "#0369a1",
    name: "Ardex BR 10 ZP",
    descriptionLine: "Single-component zinc-rich rebar primer — brush applied directly to cleaned rebar — compatible with Ardex BR repair mortar systems",
    productType: "Single-component zinc-rich rebar primer",
    filterTags: ["1-part-cementitious", "Rebar-primer", "Zinc-rich", "Chloride", "Carbonation", "Brush-applied"],
    techChips: [
      { label: "Single-component zinc-rich", cls: "bg-sky-100 text-sky-800" },
      { label: "Brush applied to cleaned rebar", cls: "bg-slate-100 text-slate-700" },
      { label: "Compatible with Ardex BR mortars", cls: "bg-amber-50 text-amber-700" },
      { label: "Ardex Australia — national supply", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Ardex BR 10 ZP is a single-component zinc-rich primer applied by brush directly to cleaned reinforcing steel in concrete repair. The zinc provides sacrificial galvanic protection to the steel beneath, while the polymer binder provides adhesion and chemical resistance. No on-site mixing required — pre-formulated single component reduces application error risk. Apply to rebar cleaned to St 2 minimum; allow to reach the required tack stage before applying repair mortar. Used as part of the Ardex BR repair mortar system. Ardex Australia supplies nationally through its trade distribution network. Confirm current TDS from Ardex for current product naming, coverage rate, and application instructions — the BR product range has been subject to revision.",
    technicalProperties: [
      "Single-component zinc-rich primer — no on-site mixing required",
      "Applied by brush directly to cleaned rebar (St 2 minimum)",
      "Zinc provides sacrificial galvanic corrosion protection",
      "Ardex Australia — national trade supply",
    ],
    limitations: [
      "Apply repair mortar within the overcoat window — confirm from current Ardex TDS",
      "Confirm current product name and TDS from Ardex — BR series naming subject to revision",
      "Rebar must be cleaned to St 2 minimum — zinc-rich primer will not bond to loose scale or active rust",
      "Single-component zinc-rich primers may not provide the same protection level as 2-part epoxy zinc-rich in very high chloride environments — confirm selection with engineer of record",
    ],
    procurementSources: [
      { name: "Ardex Australia — national trade supply", url: "https://www.ardex.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#7c2d12",
    name: "Fosroc Nitoprime Zincrich",
    descriptionLine: "2-part epoxy zinc-rich rebar primer — solvent-based — brush applied to cleaned rebar as part of Fosroc Renderoc repair system",
    productType: "2-part epoxy zinc-rich rebar primer",
    filterTags: ["2-part-epoxy", "Rebar-primer", "Zinc-rich", "Chloride", "Carbonation", "Brush-applied"],
    techChips: [
      { label: "2-part epoxy zinc-rich", cls: "bg-red-100 text-red-900" },
      { label: "Solvent-based — ventilation required", cls: "bg-amber-100 text-amber-900" },
      { label: "Fosroc Renderoc system", cls: "bg-slate-100 text-slate-700" },
      { label: "Parchem — nationally available", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Fosroc Nitoprime Zincrich is a 2-part epoxy zinc-rich primer mixed on site and applied by brush to reinforcing steel cleaned to St 2 or St 3 before application of Fosroc Renderoc polymer-modified repair mortars. The epoxy binder provides chemical and water resistance; the zinc pigment provides sacrificial galvanic protection. The 2-part formulation gives a higher zinc content and more durable protection than single-component zinc-rich products — preferred for high-chloride and marine exposure structures. Solvent-based — ensure adequate mechanical ventilation and use appropriate respiratory PPE in enclosed repair areas. Apply within pot life after mixing; repair mortar must be placed within the overcoat window. Available through Parchem Construction Supplies (DuluxGroup) nationally.",
    technicalProperties: [
      "2-part epoxy zinc-rich — mix on site — high zinc content for galvanic protection",
      "Applied to rebar cleaned to St 2 or St 3 by brush",
      "Preferred for high-chloride and marine exposure structures",
      "Parchem — DuluxGroup — national trade supply",
    ],
    limitations: [
      "Solvent-based — mechanical ventilation and respiratory PPE required in enclosed repair areas",
      "Mix on site within pot life — discard any mixed product that exceeds pot life",
      "Repair mortar must be placed within the overcoat window — if missed, re-prime",
      "Rebar must be cleaned to St 2 minimum — do not apply to scale or contaminated steel",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — national (DuluxGroup)", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#16a34a",
    name: "Mapei Mapefer 1K",
    descriptionLine: "Single-component cementitious corrosion protection coating applied directly to cleaned rebar — compatible with Mapei Mapegrout repair mortars",
    productType: "Single-component cementitious rebar corrosion protection coating",
    filterTags: ["1-part-cementitious", "Rebar-primer", "Chloride", "Carbonation", "Brush-applied"],
    techChips: [
      { label: "Single-component cementitious", cls: "bg-green-100 text-green-900" },
      { label: "No solvent — low VOC", cls: "bg-slate-100 text-slate-700" },
      { label: "Compatible with Mapegrout mortars", cls: "bg-amber-50 text-amber-700" },
      { label: "Mapei Australia — national supply", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Mapei Mapefer 1K is a single-component polymer-modified cementitious corrosion protection coating mixed with water on site and applied by brush to cleaned reinforcing steel before repair mortar placement. The alkaline cementite matrix creates a high-pH passivating layer on the steel surface, inhibiting electrochemical corrosion. No solvent — low VOC, suitable for enclosed spaces where solvent-based primers are not appropriate. Apply to rebar cleaned to St 2 minimum; apply repair mortar while the Mapefer 1K coating is still in the stiff plastic/green state — if fully dried, re-apply. Compatible with Mapei Mapegrout polymer-modified repair mortar systems. Available through Mapei Australia trade supply nationally. Confirm open time and application protocol from the current Mapei TDS.",
    technicalProperties: [
      "Single-component cementitious — powder mixed with water — no hazardous solvent",
      "Applied by brush to cleaned rebar (St 2 minimum) as a corrosion protection coating",
      "Alkaline matrix passivates steel surface — suitable for carbonation and low-chloride environments",
      "Mapei Australia — national trade supply",
    ],
    limitations: [
      "No zinc — cementitious alkaline passivation only — confirm suitability for high-chloride environments with engineer of record",
      "Apply repair mortar while coating is still plastic — if fully cured before mortar placement, re-apply",
      "Rebar must be cleaned to St 2 minimum before application",
      "Confirm compatibility with Mapegrout repair mortar from Mapei TDS before use",
    ],
    procurementSources: [
      { name: "Mapei Australia — national trade supply", url: "https://www.mapei.com/au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "3-component", label: "3-component" },
  { id: "1-part-cementitious", label: "1-part cementitious" },
  { id: "2-part-epoxy", label: "2-part epoxy" },
  { id: "Bonding-agent", label: "Bonding agent" },
  { id: "Rebar-primer", label: "Rebar primer" },
  { id: "Zinc-rich", label: "Zinc-rich" },
  { id: "Chloride", label: "Chloride" },
  { id: "Carbonation", label: "Carbonation" },
  { id: "Brush-applied", label: "Brush applied" },
];

const SYSTEM_COMPARISON = [
  {
    product: "SikaTop Armatec 110 EpoCem",
    parts: "3-component",
    function: "Rebar primer + bonding agent",
    chloride: "High resistance",
    notes: "Wet-on-wet mortar placement — eliminates separate bonding agent",
  },
  {
    product: "Ardex BR 10 ZP",
    parts: "1-component zinc-rich",
    function: "Rebar primer only",
    chloride: "Good resistance",
    notes: "No mixing — simplest site application",
  },
  {
    product: "Fosroc Nitoprime Zincrich",
    parts: "2-part epoxy zinc-rich",
    function: "Rebar primer only",
    chloride: "High resistance",
    notes: "Solvent-based — preferred for high-chloride / marine",
  },
  {
    product: "Mapei Mapefer 1K",
    parts: "1-component cementitious",
    function: "Rebar primer only",
    chloride: "Moderate resistance",
    notes: "No solvent — suitable for enclosed spaces",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Applied to reinforcing steel exposed after concrete break-out in spalling repair — before repair mortar is placed",
    "Applied to rebar in reinforcement corrosion repair where the active repair zone includes full concrete removal to expose the corroded bar",
    "Applied to new dowels and starter bars installed in drilled holes before mortar or grout encapsulation",
    "Used as part of a complete EN 1504-compliant repair system — Sika, Ardex, Fosroc, or Mapei — to maintain system warranty",
    "Applied to rebar in elevated carpark repairs, balcony underside spalling repairs, and marine/coastal structure repairs",
    "Specified by remedial engineers as a mandatory step in concrete spalling and reinforcement corrosion repair specifications",
  ],
  selectionCriteria: [
    "Match the primer to the repair mortar brand and system to ensure warranty coverage — confirm from the mortar supplier TDS",
    "Use 2-part epoxy zinc-rich (Fosroc Nitoprime Zincrich) in high-chloride or marine structures where maximum galvanic protection is required",
    "Use 3-component product (SikaTop Armatec 110 EpoCem) when a combined primer and bonding agent is required — eliminates a separate bonding agent step and reduces application error",
    "Use single-component cementitious (Mapei Mapefer 1K) in enclosed or poorly ventilated areas where solvents are not permitted",
    "Confirm the rebar cleaning standard required (St 2, St 3, or Sa 2.5) from the engineer — the cleaning standard drives the product selection in some specifications",
    "For post-tensioned or prestressed concrete repair, confirm primer suitability with the engineer — hydrogen embrittlement risk in high-strength steel substrates",
  ],
  limitations: [
    "Rebar primers do not provide protection in areas where rebar is not physically exposed and primed — they are an active repair zone product only",
    "All primers require minimum rebar cleaning standard — confirm from engineer; do not reduce prep standard to save time",
    "Primers must be applied within the stated coverage rate — over-application can crack or delaminate; under-application provides inadequate protection",
    "Repair mortar must be placed within the overcoat window — do not leave primed rebar exposed to weather or chloride ingress after priming",
    "Do not mix primers or use incompatible primer-mortar combinations — bond failure and warranty voidance risk",
    "Solvent-based primers (Fosroc Nitoprime Zincrich) require PPE, ventilation, and safe storage — check SDS before site delivery",
  ],
  standardsNotes: [
    "EN 1504-7 — Reinforcement corrosion protection — product requirements for primers and coatings applied to reinforcement in EN 1504 repair systems",
    "AS 3600 — concrete structures — minimum cover requirements — rebar primer does not substitute for minimum cover, it supplements it",
    "AS 1627.4 — surface preparation of steel — cleaning standards St 2 (hand tool), St 3 (power tool), Sa 2.5 (abrasive blast) — confirms the cleaning method appropriate for each primer",
    "AS 1210 / AS 4100 — not directly applicable to rebar primers, but the engineer of record specification is the controlling document for primer selection",
    "Manufacturer system certificates — Sika, Ardex, Fosroc, Mapei — confirm current system certificate and compatibility scope from the supplier",
  ],
  suitableDefects: [
    "Chloride-induced reinforcement corrosion — active repair zones where rebar is exposed after concrete break-out",
    "Carbonation-induced reinforcement corrosion — exposed rebar after carbonated concrete removal",
    "Concrete spalling — any repair requiring full concrete removal and re-mortaring over exposed rebar",
    "Delaminated concrete — where rebar is exposed after removing the delaminated layer",
  ],
  typicalSubstrates: [
    "Deformed bar (D500N, D500L) cleaned to St 2 or St 3 by needle gun, wire brush, or angle grinder",
    "Round bar and mesh cleaned to St 2 minimum in the repair zone",
    "New dowel bar immediately after fabrication and before grouting into drilled holes",
    "Post-tensioned duct bar — confirm primer compatibility with the engineer for high-strength steel substrates",
  ],
};

export function RebarPrimersInhibitorsIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">Rebar primers and inhibitors in concrete repair and reinforcement corrosion management</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Rebar primers are applied directly to cleaned reinforcing steel exposed during concrete repair to provide an immediate corrosion protection layer before repair mortar is placed. They are a mandatory component of EN 1504-compliant repair systems and are specified by remedial engineers for all active repair zones in concrete spalling and reinforcement corrosion repair. The primer passivates the cleaned rebar surface and, in some products, acts as a bonding agent between the concrete and repair mortar.
        </p>
        {expanded && (
          <>
            <p>
              Three main primer types are in use in Australian remedial repair: 2-part epoxy zinc-rich (Fosroc Nitoprime Zincrich), 3-component epoxy cement acting as combined primer and bonding agent (SikaTop Armatec 110 EpoCem), and single-component cementitious (Ardex BR 10 ZP, Mapei Mapefer 1K). Primer selection should be matched to the repair mortar brand and the specific exposure environment. All primers require the rebar to be cleaned to St 2 minimum before application. Confirm application technique — wet-on-wet vs. allow-to-cure — from the specific product TDS.
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

export function RebarPrimersInhibitorsProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 products — rebar primers and corrosion protection coatings — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Rebar primer types for reinforcement corrosion repair. Confirm all selections from current manufacturer TDS before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Parts</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Function</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Chloride resistance</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Notes</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.parts}</td>
                  <td className="px-4 py-3 text-slate-600">{row.function}</td>
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
