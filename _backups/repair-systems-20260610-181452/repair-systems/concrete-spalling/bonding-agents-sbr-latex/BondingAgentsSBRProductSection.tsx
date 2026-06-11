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
  | "SBR-latex"
  | "Acrylic-primer"
  | "Epoxy-bond"
  | "Brush-applied"
  | "Roller-applied"
  | "Porous-concrete"
  | "Dense-concrete"
  | "Slurry-coat"
  | "Admixture";

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
    accentColor: "#be123c",
    name: "LANKO 751 Lankolatex SBR",
    descriptionLine: "Flexible SBR latex additive used as bonding slurry coat and mortar admixture before polymer-modified repair mortars on porous concrete and masonry. Sika AU product name is LANKO 751 Lankolatex SBR — not 'Sika Latex SBR'",
    productType: "SBR latex bonding agent and mortar admixture",
    filterTags: ["SBR-latex", "Brush-applied", "Porous-concrete", "Slurry-coat", "Admixture"],
    techChips: [
      { label: "TODO: confirm mixing ratio from AU TDS", cls: "bg-rose-100 text-rose-800" },
      { label: "TODO: confirm admixture rate from AU TDS", cls: "bg-slate-100 text-slate-700" },
      { label: "5 L and 20 L containers", cls: "bg-amber-50 text-amber-700" },
      { label: "Apply while tacky", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "LANKO 751 Lankolatex SBR is the Sika Australia SBR latex product — a flexible SBR additive designed for use with Lanko, Davco and general mortar systems (Sika AU product page). It improves adhesive and compressive strength, water resistance, and flexibility, and can improve workability. Used as a bonding slurry coat and as a mortar admixture. As a bonding agent: dilute with cement to form a slurry, brush onto the prepared, saturated-surface-dry substrate, and apply the repair mortar while the slurry is still tacky. Available in 5 L and 20 L containers through Sika/Lanko/Davco trade supply. TODO: owner confirm — confirm exact mixing ratio (the 1:1 cement dilution and 10% admixture rate have not been verified from the AU TDS; the Sika AU product page does not display these ratios in the scraped content). Note: the product is not marketed as 'Sika Latex SBR' in Australia — use LANKO 751 Lankolatex SBR as the correct AU product name.",
    technicalProperties: [
      "LANKO 751 Lankolatex SBR — SBR latex — dual use: bonding slurry coat and mortar admixture",
      "TODO: owner confirm — bonding slurry dilution ratio (1:1 with cement not verified from Sika AU TDS) — confirm from current Sika/Lanko Australia TDS",
      "TODO: owner confirm — admixture rate (10% by weight of water not verified from Sika AU TDS) — confirm from current TDS",
      "Available in 5 L and 20 L containers — confirmed on aus.sika.com product page for LANKO 751 Lankolatex SBR",
    ],
    limitations: [
      "Apply repair mortar while bonding slurry is still fresh/tacky — do not allow to dry before applying mortar",
      "Confirm current dilution ratio and admixture rate from Sika Australia TDS — do not rely on international TDS",
      "Not a waterproofing product — do not use as a standalone primer in wet or submerged applications",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply nationally", url: "https://aus.sika.com" },
      { name: "Bunnings Trade — nationally available", url: "https://www.bunnings.com.au/trade" },
      { name: "Bayset — nationally available", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Ardex Australia",
    brandUrl: "https://www.ardex.com.au",
    accentColor: "#0369a1",
    name: "Ardex P 51 — TODO: owner confirm application",
    descriptionLine: "TODO: owner confirm — ARDEX P 51 is described as a 'Universal Flooring Primer' for internal use with floor levelling compounds and adhesives on ardexaustralia.com — not confirmed as a bonding primer for concrete structural repair mortars. Confirm with Ardex Australia whether P 51 is the correct primer for BR 340 / BR 345 or whether a different Ardex product is specified",
    productType: "TODO: owner confirm — Ardex P 51 is described as an internal flooring primer on ardexaustralia.com — not confirmed as a concrete repair bonding primer",
    filterTags: ["Acrylic-primer", "Brush-applied", "Roller-applied", "Porous-concrete"],
    techChips: [
      { label: "TODO: confirm — internal flooring primer per ardexaustralia.com", cls: "bg-sky-100 text-sky-800" },
      { label: "Allow to become tacky (if applicable)", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: confirm for Ardex BR 340 / BR 345", cls: "bg-amber-50 text-amber-700" },
      { label: "TODO: Ardex BE not confirmed on ardexaustralia.com", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "TODO: owner confirm — ARDEX P 51 is described on ardexaustralia.com as a 'Universal Flooring Primer' — a low VOC, concentrated, solvent-free synthetic resin dispersion designed for priming and sealing porous floor and wall substrates prior to ARDEX levelling and smoothing compounds. It is listed as internal use only and for use with floor levelling compounds and tile adhesives — not as a bonding primer for structural concrete repair mortars. The card's claim that P 51 is used before BR 340 / BR 345 has not been verified from a live Ardex AU source. Owner must confirm with Ardex Australia whether P 51 is the correct primer for concrete repair mortar applications or whether a different Ardex primer applies. Available in 5 L and 20 L containers confirmed on ardexaustralia.com. 'Ardex BE' is not confirmed as a current Ardex AU product — not found on ardexaustralia.com product listing during this audit.",
    technicalProperties: [
      "TODO: owner confirm — P 51 role as concrete repair mortar bonding primer — ardexaustralia.com describes it as a flooring primer (internal only)",
      "ARDEX P 51 available in 5 L (product no. 10231) and 20 L (product no. 16534) — confirmed on ardexaustralia.com",
      "Described on ardexaustralia.com as for: porous concrete substrates, structural particleboard and ply, sanded ceramic tiles, plasterboard — internal use only",
      "TODO: owner confirm — Ardex BE (epoxy) — not found as a current product on ardexaustralia.com product listing",
    ],
    limitations: [
      "TODO: owner confirm — P 51 suitability for concrete repair mortar bonding with Ardex Australia — the ardexaustralia.com product page specifies internal flooring use only",
      "TODO: owner confirm — Ardex BE epoxy bond coat — not found on ardexaustralia.com — confirm whether this product is still current or has been replaced",
      "Confirm primer selection for specific substrate with Ardex Australia technical",
    ],
    procurementSources: [
      { name: "Ardex Australia — trade supply nationally", url: "https://www.ardex.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#7c2d12",
    name: "Fosroc Nitobond SBR",
    descriptionLine: "SBR latex bonding agent used as slurry coat before Fosroc Renderoc repair mortars on saturated-surface-dry prepared concrete; also available as mortar admixture",
    productType: "SBR latex bonding agent and mortar admixture",
    filterTags: ["SBR-latex", "Brush-applied", "Porous-concrete", "Slurry-coat", "Admixture"],
    techChips: [
      { label: "Mix with cement + water", cls: "bg-orange-100 text-orange-900" },
      { label: "Apply while still fresh", cls: "bg-slate-100 text-slate-700" },
      { label: "Fosroc Nitobond EP for dense", cls: "bg-amber-50 text-amber-700" },
      { label: "Parchem — national", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Fosroc Nitobond SBR is a styrene-butadiene rubber (SBR) bonding agent used before Fosroc Renderoc cementitious and polymer-modified repair mortars. It is applied as a bonding slurry (mixed with cement and water to a thin slurry consistency) brushed onto the prepared, saturated-surface-dry concrete substrate. The repair mortar must be applied while the slurry is still fresh — do not allow to dry. Nitobond SBR can also be added to site-batched cementitious mortars as a polymer admixture to improve adhesion and workability. Available through Parchem Construction Supplies (DuluxGroup) nationally.",
    technicalProperties: [
      "SBR latex bonding agent — dual use: slurry coat and mortar admixture",
      "Slurry coat: mix with cement and water — brush onto SSD substrate before mortar",
      "Also available: Fosroc Nitobond EP — 2-part epoxy bond coat for smooth/dense substrates",
      "Parchem (DuluxGroup) — national distribution with technical support",
    ],
    limitations: [
      "Apply repair mortar while Nitobond SBR slurry is still fresh — do not allow to dry",
      "Not suitable for submerged or continuously wet applications — confirm with Parchem TDS",
      "Confirm slurry mix ratio from current Fosroc/Parchem TDS before use",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — national (DuluxGroup)", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#1d4ed8",
    name: "Mapei Planicrete AC",
    descriptionLine: "Acrylic copolymer bonding agent mixed 1:2 with Portland cement as slurry coat before Mapei Mapegrout repair mortars on porous concrete and masonry substrates",
    productType: "Acrylic copolymer bonding agent and mortar admixture",
    filterTags: ["Acrylic-primer", "Brush-applied", "Porous-concrete", "Slurry-coat", "Admixture"],
    techChips: [
      { label: "1:2 ratio with cement", cls: "bg-blue-100 text-blue-900" },
      { label: "Brush while slurry tacky", cls: "bg-slate-100 text-slate-700" },
      { label: "Mapei Eporip for dense", cls: "bg-amber-50 text-amber-700" },
      { label: "Mapei trade + Bayset", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Mapei Planicrete AC is an acrylic copolymer bonding agent used before Mapei Mapegrout repair mortars on prepared concrete substrates. It is applied as a bonding slurry (mixed 1:2 with Portland cement) brushed onto the saturated-surface-dry substrate, with the repair mortar applied while the slurry is still tacky. For smooth or dense substrates, Mapei Eporip (2-part epoxy bonding agent) is specified instead. Planicrete AC can also be used as an admixture in site-batched repair mortars to improve adhesion and workability. Available through Mapei Australia trade supply and Bayset nationally.",
    technicalProperties: [
      "Acrylic copolymer bonding agent — slurry coat and mortar admixture",
      "Bonding slurry: 1:2 ratio with Portland cement — brush onto SSD substrate",
      "Mapei Eporip used for smooth/dense/low-absorption substrates",
      "Mapei trade supply + Bayset nationally",
    ],
    limitations: [
      "Apply mortar while bonding slurry is still tacky — do not allow to dry",
      "Confirm dilution ratio and admixture rate from current Mapei Australia TDS",
      "Not suitable for continuously wet or submerged applications without confirming with Mapei",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply nationally", url: "https://www.mapei.com/au" },
      { name: "Bayset — nationally available", url: "https://www.bayset.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "SBR-latex", label: "SBR latex" },
  { id: "Acrylic-primer", label: "Acrylic primer" },
  { id: "Epoxy-bond", label: "Epoxy bond coat" },
  { id: "Brush-applied", label: "Brush applied" },
  { id: "Roller-applied", label: "Roller applied" },
  { id: "Porous-concrete", label: "Porous concrete" },
  { id: "Dense-concrete", label: "Dense concrete" },
  { id: "Slurry-coat", label: "Slurry coat" },
  { id: "Admixture", label: "Admixture" },
];

const SYSTEM_COMPARISON = [
  { brand: "Sika", product: "LANKO 751 Lankolatex SBR", type: "SBR latex", use: "Bonding slurry + admixture", substrate: "Porous concrete and masonry", epoxy: "TODO: owner confirm — Sika Icosit EP Primer not found on aus.sika.com — confirm current Sika AU epoxy bond coat product name" },
  { brand: "Ardex", product: "Ardex P 51 — TODO: confirm role", type: "Acrylic primer (flooring per AU site)", use: "TODO: owner confirm — ardexaustralia.com lists P 51 as internal flooring primer — confirm if applicable to concrete repair", substrate: "TODO: confirm substrate", epoxy: "TODO: owner confirm — Ardex BE not found on ardexaustralia.com" },
  { brand: "Fosroc / Parchem", product: "Fosroc Nitobond SBR", type: "SBR latex", use: "Bonding slurry + admixture", substrate: "Porous/prepared concrete", epoxy: "Fosroc Nitobond EP" },
  { brand: "Mapei", product: "Mapei Planicrete AC", type: "Acrylic copolymer", use: "Bonding slurry + admixture", substrate: "Porous/prepared concrete", epoxy: "Mapei Eporip" },
];

const TECH_INFO = {
  typicalApplications: [
    "Applied as bonding slurry coat to prepared, saturated-surface-dry concrete before polymer-modified or cementitious repair mortar in concrete spalling patch repair",
    "Used as polymer admixture into site-batched cementitious repair mortars to improve adhesion, flexibility, and workability",
    "Applied before repair mortars on masonry and block substrates where concrete bonding agent is compatible",
    "Slurry coat on carpark column and beam soffit repairs before mortar, where adhesion to the existing substrate is critical",
    "Primer coat before cementitious floor screeds and toppings on prepared concrete substrates",
  ],
  selectionCriteria: [
    "SBR latex (Sika Latex, Nitobond SBR): suitable for porous concrete and masonry — dual use as slurry coat and admixture — most commonly specified",
    "Acrylic primer (Ardex P 51): brush or roller applied — allows more working time before mortar compared to SBR slurry coat — for Ardex repair mortar systems",
    "For smooth, dense, or low-absorption concrete: specify epoxy bond coat (Ardex BE, Fosroc Nitobond EP, Mapei Eporip, Sika Icosit EP) instead of SBR or acrylic",
    "Confirm primer type with the repair mortar manufacturer — not all bonding agents are compatible with all repair mortars across brands",
    "In wet or humid conditions: SBR slurry coat degrades rapidly on a wet substrate — ensure SSD (not wet) before applying",
  ],
  limitations: [
    "Do NOT allow SBR slurry coat to dry before applying the repair mortar — a dried slurry coat becomes a bond breaker, not a bonding agent",
    "Not suitable for submerged or continuously wet applications without manufacturer confirmation",
    "SBR bonding agents are not waterproofing products — do not use as standalone waterproofing primer",
    "Do not apply to a wet (not SSD) substrate — excess water at the surface dilutes the bonding agent and reduces adhesion",
    "Check compatibility: do not assume Sika bonding agents are interchangeable with Ardex or Fosroc repair mortars — confirm compatible primer from the mortar manufacturer TDS",
  ],
  standardsNotes: [
    "AS 3600 — Concrete Structures — repair mortar adhesion requirements — bonding agent required before PM repair mortars on prepared concrete per AS 3600 clause",
    "Repair mortar manufacturer TDS — each manufacturer specifies the primer required for their system — confirm primer selection from the mortar TDS",
    "ICRI Guideline 310.2 — preparation standards for substrate before bonding agent — surface must be clean, sound, and free of contamination",
    "For structural repair: bonding agent selection and application is part of the engineered repair specification — confirm from the structural engineer or repair specification",
  ],
  suitableDefects: [
    "Concrete spalling — bonding agent is a required step in the patch repair sequence before repair mortar application",
    "Delaminated patches — prime the prepared substrate after chipping out before applying repair mortar",
    "Concrete shrinkage and carbonation surface defects — bonding agent required before cementitious topping or repair mortar",
    "Masonry spalling or deterioration — SBR bonding slurry on prepared masonry before cementitious render or repair",
  ],
  typicalSubstrates: [
    "Porous in-situ concrete — standard substrate for SBR and acrylic bonding agents — prepare to CSP 2–3, ensure SSD",
    "Masonry (concrete block, brick, rendered) — SBR or acrylic bonding agents suitable for porous masonry substrates",
    "Precast concrete — generally denser than in-situ — may require epoxy bond coat — confirm from mortar TDS",
    "Dense or smooth concrete — specify epoxy bond coat in place of SBR or acrylic for adequate adhesion",
  ],
};

export function BondingAgentsSBRIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are bonding agents and SBR latex used for?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          A bonding agent or primer is applied to the prepared, saturated-surface-dry concrete substrate immediately before the repair mortar is placed. Without a bonding agent, the repair mortar may fail to achieve adequate adhesion to the substrate — producing a hollow-sounding patch that detaches over time. SBR (styrene-butadiene rubber) latex is the most common type — mixed with cement and water to form a slurry and brushed onto the substrate. Acrylic primers are applied by brush or roller and allowed to become tacky before mortar placement.
        </p>
        {expanded && (
          <>
            <p>
              Epoxy bond coats (2-part) are specified for smooth, dense, or low-absorption substrates where SBR slurry coat may not achieve adequate adhesion. The critical rule for SBR bonding agent is timing: the repair mortar must be applied while the slurry coat is still fresh and tacky — if the slurry dries before mortar is applied, it becomes a bond breaker rather than a bonding agent. Each repair mortar manufacturer specifies which primer is required for their system — confirm the compatible primer from the mortar TDS before applying a different brand&apos;s bonding agent.
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

export function BondingAgentsSBRProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 brands — SBR latex and acrylic bonding agents — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Bonding agents for concrete spalling repair — SBR, acrylic, and epoxy alternatives per brand. Confirm primer selection from current mortar manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Use</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Substrate</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Epoxy alternative</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600">{row.use}</td>
                  <td className="px-4 py-3 text-slate-600">{row.substrate}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.epoxy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
