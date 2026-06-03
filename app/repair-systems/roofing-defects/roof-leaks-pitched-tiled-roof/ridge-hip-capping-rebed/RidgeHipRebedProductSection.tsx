"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "2-part"
  | "1-part"
  | "Polymer-modified"
  | "Flexible"
  | "Ridge-hip"
  | "Terracotta-compatible"
  | "Concrete-compatible"
  | "Weather-resistant";

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
    fullLabel: "Bostik Australia",
    brandUrl: "https://www.bostik.com/au",
    accentColor: "#0369a1",
    name: "Bostik SL Flex Pointing Mortar",
    descriptionLine: "2-part polymer-modified bedding and pointing mortar for ridge and hip capping rebed — flexible polymer content prevents rigid cracking — Australian-made — terracotta and concrete compatible",
    productType: "2-part polymer-modified flexible bedding/pointing mortar",
    filterTags: ["2-part", "Polymer-modified", "Flexible", "Ridge-hip", "Terracotta-compatible", "Concrete-compatible"],
    techChips: [
      { label: "2-part", cls: "bg-sky-100 text-sky-800" },
      { label: "Polymer-modified", cls: "bg-slate-100 text-slate-700" },
      { label: "Flexible", cls: "bg-green-50 text-green-700" },
      { label: "Terracotta compatible", cls: "bg-amber-50 text-amber-700" },
      { label: "Australian-made", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Bostik SL Flex Pointing Mortar is a two-component polymer-modified bedding and pointing mortar designed for ridge and hip capping rebed on pitched tiled roofs. The polymer content within the mortar system provides the critical flexibility that traditional rigid sand and cement mixes lack — thermal movement in roof cappings is the primary cause of cracking and failure in rigid rebed systems, and the polymer modification in SL Flex is specifically formulated to accommodate this movement without cracking over time. The product is Australian-made and is suitable for bedding and pointing terracotta and concrete ridge and hip capping on Class 2 strata and residential buildings. The two components are mixed on site in the correct ratio immediately before application. Like all polymer-modified mortars, the mix ratio is critical — deviation from the manufacturer's specified ratio compromises both strength and flexibility. The substrate must be primed or dampened before application as specified in the current TDS, and application below the manufacturer's minimum ambient temperature must be avoided to prevent incomplete curing. Confirm current product name, formulation, and specification with Bostik Australia before specifying.",
    technicalProperties: [
      "2-part polymer-modified mortar — powder and liquid components mixed on site — flexible polymer content integral to the system",
      "Flexible after cure — accommodates thermal movement in ridge and hip capping without the rigid cracking failure of sand/cement mortar",
      "Weather-resistant — formulated for exposed roofing environments — suitable for external ridge and hip capping applications",
      "Adheres to clay, concrete, and masonry substrates — suitable for terracotta and concrete ridge and hip capping",
      "Paintable after cure — compatible with roof tile paints and sealers where colour matching is required",
      "Australian-made — confirm current TDS and availability from Bostik Australia trade supply",
      "Suitable for Class 2 strata apartment and residential roof ridge and hip capping rebed applications",
    ],
    limitations: [
      "Mix ratio is critical — deviation from the manufacturer's specified ratio compromises both strength and flexibility of the cured mortar — measure components accurately",
      "Substrate must be primed or dampened in accordance with the current TDS before application — do not apply to dry or dusty surfaces without surface preparation",
      "Do not apply below the manufacturer's specified minimum ambient temperature — cold conditions delay or prevent complete polymer curing",
      "Not a substitute for traditional sand and cement mortar where a rigid bedding system is specified — polymer-modified systems are specifically for flexible rebed",
      "Confirm current product name and formulation with Bostik Australia before specifying — product ranges are subject to periodic revision",
      "Confirm compatibility with specific tile type (terracotta or concrete) and primer requirements from the current TDS before application",
    ],
    procurementSources: [
      { name: "Bostik Australia — trade supply", url: "https://www.bostik.com/au" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Bayset", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Laticrete Australia",
    brandUrl: "https://www.laticrete.com.au",
    accentColor: "#16a34a",
    name: "Laticrete 254 Platinum",
    descriptionLine: "Polymer-modified mortar for bedding and pointing ridge and hip capping — high-bond flexible bedding — water-activated single-component dry powder — terracotta and concrete capping compatible",
    productType: "1-part polymer-modified flexible bedding mortar (water-activated)",
    filterTags: ["1-part", "Polymer-modified", "Flexible", "Ridge-hip", "Terracotta-compatible", "Concrete-compatible"],
    techChips: [
      { label: "1-part", cls: "bg-green-100 text-green-800" },
      { label: "Polymer-modified", cls: "bg-slate-100 text-slate-700" },
      { label: "Flexible", cls: "bg-green-50 text-green-700" },
      { label: "Water-activated", cls: "bg-amber-50 text-amber-700" },
      { label: "High-bond", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Laticrete 254 Platinum is a polymer-modified mortar from Laticrete Australia used for bedding and pointing ridge and hip capping where a high-bond, flexible bedding mortar is required. As a water-activated single-component dry powder, 254 Platinum offers a simpler mixing process compared to 2-part systems — only water is added on site, reducing the risk of incorrect component ratio. This is an advantage on roofing sites where mixing accuracy may be more difficult to control than in controlled laboratory or workshop conditions. 254 Platinum provides the flexibility required to accommodate the thermal movement of ridge and hip capping in Australian roofing conditions. It is suitable for use under terracotta and concrete ridge and hip capping. Laticrete 254 Platinum is primarily known as a tile adhesive, and its application as a ridge capping bedding mortar must be confirmed against current Laticrete Australia technical guidance and the active TDS for the specific application, roof tile type, and substrate condition. Confirm current product name, mix water ratio, and suitability for exposed ridge capping bedding with Laticrete Australia technical before specifying.",
    technicalProperties: [
      "1-part polymer-modified mortar — single dry powder component — activated by addition of water only — no separate liquid polymer component required",
      "High-bond flexible mortar — accommodates minor substrate movement — suitable for ridge and hip capping bedding and pointing",
      "Suitable for terracotta and concrete ridge and hip capping — confirm substrate preparation requirements from current TDS",
      "Simplified on-site mixing — water only addition reduces risk of ratio errors compared to 2-part systems",
      "Confirm elongation, pot life, and coverage rates from the current Laticrete Australia TDS before specifying",
      "Widely available through Laticrete Australia trade supply — confirm stock and lead time for roofing mortar applications",
    ],
    limitations: [
      "Primarily marketed as a tile adhesive — confirm suitability specifically for ridge and hip capping bedding mortar applications with Laticrete Australia technical before specifying",
      "Confirm exposure suitability for fully external roof ridge capping applications — confirm weather resistance rating from current TDS",
      "Do not apply in temperatures outside the manufacturer's specified range — confirm minimum and maximum application temperature with current TDS",
      "Mix water ratio must be confirmed from current TDS — over-watering reduces bond and flexibility of the cured mortar",
      "Confirm compatibility with specific tile substrate type (terracotta or concrete) and required surface preparation before application",
      "Confirm current product name and formulation with Laticrete Australia before specifying — product ranges are subject to periodic revision",
    ],
    procurementSources: [
      { name: "Laticrete Australia — trade supply", url: "https://www.laticrete.com.au" },
      { name: "Bayset", url: "https://www.bayset.com.au" },
      { name: "Tile Warehouse", url: "https://tilewarehouse.com.au" },
    ],
  },
  {
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardex.com.au",
    accentColor: "#f97316",
    name: "ARDEX S 28 WR",
    descriptionLine: "Polymer-modified weather-resistant pointing and bedding mortar — ridge and hip capping bedding and joint pointing on tiled roofs — ARDEX product",
    productType: "Polymer-modified weather-resistant bedding and pointing mortar",
    filterTags: ["Polymer-modified", "Flexible", "Ridge-hip", "Weather-resistant"],
    techChips: [
      { label: "Polymer-modified", cls: "bg-orange-100 text-orange-800" },
      { label: "Weather-resistant", cls: "bg-slate-100 text-slate-700" },
      { label: "Flexible", cls: "bg-green-50 text-green-700" },
      { label: "Ridge and hip capping", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "ARDEX S 28 WR (or equivalent current ARDEX polymer-modified pointing mortar) is a polymer-modified, weather-resistant pointing and bedding mortar from ARDEX Australia, suitable for ridge and hip capping bedding and joint pointing on tiled roofs. ARDEX is a well-established Australian remedial and tile products manufacturer with a broad range of polymer-modified mortars and waterproofing systems. The S 28 WR (or current equivalent) is positioned for external, weather-exposed mortar pointing and bedding applications where flexibility and weather resistance are required. Like all ARDEX products, the application requires confirmation of the current product TDS, mixing ratio, substrate preparation, and priming requirements directly from ARDEX Australia or the current ARDEX technical datasheet before specifying. Confirm the current ARDEX product name for polymer-modified ridge and hip capping bedding mortar applications — ARDEX product naming and formulation may be updated periodically. Confirm the product through ARDEX Australia trade supply or technical support.",
    technicalProperties: [
      "Polymer-modified mortar — weather-resistant formulation for external exposed applications — suitable for ridge and hip capping bedding and pointing",
      "Flexible after cure — accommodates thermal and structural movement in exposed roofing environments",
      "Suitable for joint pointing and bedding of ridge and hip capping on tiled roofs — confirm tile type compatibility from current TDS",
      "ARDEX product — manufactured and distributed by ARDEX Australia — available through ARDEX trade supply",
      "Confirm mixing ratio, pot life, coverage, and application temperature range from the current ARDEX S 28 WR TDS",
    ],
    limitations: [
      "Confirm current product name with ARDEX Australia — ARDEX product range and naming is subject to periodic revision — do not rely on historical product names without confirming against the current ARDEX product list",
      "Confirm suitability for specific tile type (terracotta or concrete) and roof pitch from current ARDEX TDS before specifying",
      "Substrate preparation and priming requirements must be confirmed from the current ARDEX TDS — do not apply to unsound or contaminated mortar substrates",
      "Do not apply below or above the manufacturer's specified temperature range — confirm from current TDS",
      "Confirm current product specification and availability with ARDEX Australia before specifying",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply", url: "https://www.ardex.com.au" },
      { name: "Bayset", url: "https://www.bayset.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag | "All"; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Polymer-modified", label: "Polymer-modified" },
  { id: "2-part", label: "2-part" },
  { id: "1-part", label: "1-part" },
  { id: "Flexible", label: "Flexible" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  components: string;
  flexibility: string;
  substrateTypes: string;
  potLife: string;
  coverage: string;
}[] = [
  {
    product: "SL Flex Pointing Mortar",
    brand: "Bostik",
    components: "2-part — powder + liquid polymer",
    flexibility: "Flexible — polymer-modified",
    substrateTypes: "Terracotta, concrete, masonry",
    potLife: "Confirm with TDS",
    coverage: "Confirm with TDS",
  },
  {
    product: "254 Platinum",
    brand: "Laticrete",
    components: "1-part — powder + water only",
    flexibility: "Flexible — polymer-modified",
    substrateTypes: "Terracotta, concrete",
    potLife: "Confirm with TDS",
    coverage: "Confirm with TDS",
  },
  {
    product: "S 28 WR",
    brand: "ARDEX",
    components: "Confirm with ARDEX TDS",
    flexibility: "Flexible — polymer-modified",
    substrateTypes: "Terracotta, concrete — confirm with TDS",
    potLife: "Confirm with TDS",
    coverage: "Confirm with TDS",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Full rebed of ridge and hip capping where existing sand/cement bedding mortar has cracked, failed, or become dislodged",
    "Repointing of existing ridge and hip capping where bedding mortar is sound but pointing coat has eroded or cracked",
    "Replacement of failed sand/cement rebed with a flexible polymer-modified mortar system to prevent repeat failure",
    "Class 2 strata apartment buildings where roof leaks are traced to failed or dislodged ridge and hip capping",
    "Residential pitched tiled roofs where terracotta or concrete ridge and hip capping has lifted or cracked",
  ],
  selectionCriteria: [
    "1-part vs 2-part: 1-part systems are simpler to mix on site (water only); 2-part systems require accurate ratio of two components — both provide polymer modification",
    "Tile substrate type: confirm compatibility with terracotta vs concrete ridge capping from manufacturer TDS before specifying",
    "Primer requirement: some systems require the substrate to be dampened or primed before application — confirm from current TDS",
    "Pot life: mix batch sizes to suit pot life in the prevailing ambient temperature — smaller batches in hot weather",
    "Application temperature: confirm minimum and maximum application temperature from current TDS — do not apply in extremes",
    "Colour matching: polymer bedding mortars can be painted after cure — confirm with paint/sealer manufacturer for colour match",
    "Coverage rate: confirm coverage per bag or unit from current TDS to estimate quantities before ordering",
  ],
  limitations: [
    "Traditional rigid sand/cement mortar is not acceptable for ridge and hip capping rebed — it will crack and fail due to thermal movement",
    "Polymer-modified mortars are not a substitute for cracked or failed ridge capping tiles — replace damaged tiles before rebedding",
    "Do not rebed over unsound existing mortar — chip back all existing mortar to a sound substrate before applying polymer-modified bedding mortar",
    "Do not apply in wet or freezing conditions — confirm application temperature range from manufacturer TDS",
    "Repointing alone (face coat only) is not a substitute for full rebed where the bedding mortar has failed or the capping is loose",
  ],
  standardsNotes: [
    "AS 4046 — Roof tiles — relevant standard for roof tile products and installation requirements",
    "NCC Volume One — performance requirements for roof construction in Class 2 buildings",
    "Manufacturer installation guides — mixing ratio, primer, application, and cure time are all critical hold points — obtain ITP from manufacturer",
    "Confirm current AS and NCC compliance of each product with the manufacturer before specifying for Class 2 strata applications",
  ],
  suitableDefects: [
    "Ridge and hip capping lifting, cracking, or dislodging — primary cause of roof leaks at the ridge and hip line on pitched tiled roofs",
    "Cracked or eroded pointing mortar at ridge and hip capping — allows water penetration behind and beneath capping units",
    "Roof leaks at ridge line on Class 2 strata or residential buildings — where inspection identifies failed sand/cement bedding as the cause",
  ],
  typicalSubstrates: [
    "Existing concrete or terracotta ridge and hip capping tiles — must be structurally sound — replace cracked or broken tiles before rebed",
    "Roof batten substrate — battens must be sound and fixed before applying bedding mortar — replace deteriorated battens",
    "Existing mortar bed — chip back all existing mortar to a sound, clean substrate — do not apply polymer mortar over loose or contaminated mortar",
    "Tile perlin or sarking where relevant — confirm substrate condition from site inspection before specifying scope of works",
  ],
};

/* ── Collapsible helpers ── */

function CollapsibleList({
  items,
  icon,
  limit = 3,
}: {
  items: string[];
  icon: "check" | "x";
  limit?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, limit);
  const extra = items.length - limit;
  return (
    <div>
      <ul className="space-y-1.5">
        {visible.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
            {icon === "check" ? (
              <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" />
            ) : (
              <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />
            )}
            {item}
          </li>
        ))}
      </ul>
      {items.length > limit && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600"
        >
          {expanded ? "Show less ↑" : `+${extra} more ↓`}
        </button>
      )}
    </div>
  );
}

function CollapsibleSources({ sources }: { sources: { name: string; url?: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">PROCUREMENT SOURCES</p>
        <button
          onClick={() => setExpanded((e) => !e)}
          className="text-[9px] font-bold text-slate-400 hover:text-slate-600"
        >
          {expanded ? "Hide ↑" : "See more ↓"}
        </button>
      </div>
      {expanded && (
        <div className="mt-2 space-y-1.5">
          {sources.map((src) => (
            <div
              key={src.name}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs"
            >
              {src.url ? (
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
                <span className="font-semibold text-slate-600">{src.name}</span>
              )}
            </div>
          ))}
        </div>
      )}
      <p className="mt-2 text-[10px] italic text-slate-400">
        Confirm suitability with the current manufacturer TDS before specifying or applying.
      </p>
    </div>
  );
}

function CollapsibleCardDetails({
  text,
  chips,
}: {
  text: string;
  chips: { label: string; cls: string }[];
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      {expanded && (
        <>
          <p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>
          {chips.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {chips.map((chip) => (
                <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>
                  {chip.label}
                </span>
              ))}
            </div>
          )}
        </>
      )}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600"
      >
        {expanded ? "Hide details ↑" : "Show details ↓"}
      </button>
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>
        {text}
      </p>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900"
      >
        {expanded ? "Show less ↑" : "Show more ↓"}
      </button>
    </div>
  );
}

export function RidgeHipRebedIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What is a ridge and hip capping rebed system?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          A ridge and hip capping rebed system is the complete removal and replacement of the mortar bed and pointing coat that secures terracotta or concrete ridge and hip capping tiles to the ridge and hip of a pitched tiled roof. The traditional system — a rigid sand and cement mortar — is the primary cause of most ridge and hip capping failures in Australia, because the rigid mortar cracks under the thermal movement and vibration that all roof structures experience, allowing water to penetrate beneath the capping and enter the building.
        </p>
        {expanded && (
          <>
            <p>
              Modern flexible polymer-modified bedding mortars replace the rigid sand/cement system with a polymer-modified mortar that maintains flexibility after curing, accommodating thermal movement without cracking. The polymer content in the mortar is the critical differentiation — without polymer modification, the mortar will eventually crack regardless of mix quality.
            </p>
            <p>
              A ridge and hip capping rebed involves: removing all existing mortar back to a sound substrate, replacing any cracked or damaged capping tiles, applying a polymer-modified bedding mortar in the correct ratio, setting the capping tiles, and applying a polymer-modified pointing coat to all joints. The system must not be confused with repointing alone — repointing addresses only the pointing coat (face coat) and is not appropriate where the bedding mortar has failed or the capping tiles are loose.
            </p>
          </>
        )}
      </div>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900"
      >
        {expanded ? "Read less ↑" : "Read more ↓"}
      </button>
    </div>
  );
}

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

export function RidgeHipRebedProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterTag | "All">("All");
  const scrollRef = useRef<HTMLDivElement>(null);

  const visibleProducts =
    activeFilter === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.filterTags.includes(activeFilter as FilterTag));

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
              Applications, selection criteria, limitations, standards, suitable substrates
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
              <TechCard icon={<Ruler size={15} />} title="Selection Criteria" items={TECH_INFO.selectionCriteria} style="check" />
              <TechCard icon={<AlertTriangle size={15} />} title="When NOT to Use" items={TECH_INFO.limitations} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards & Testing" items={TECH_INFO.standardsNotes} style="bullet" />
              <TechCard icon={<CheckCircle size={15} />} title="Suitable Defects" items={TECH_INFO.suitableDefects} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="Typical Substrates" items={TECH_INFO.typicalSubstrates} style="bullet" />
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — polymer-modified flexible bedding and pointing mortars only — scroll to view all</p>
          </div>
        </div>

        {/* Filter chips */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => {
            const active = activeFilter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
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
        </div>

        {/* Nav row */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — 3 visible, scroll for more
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
                      <a
                        href={product.brandUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                      >
                        <ExternalLink size={9} /> Brand Site
                      </a>
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                  </div>
                  <CollapsibleCardDetails
                    text={product.descriptionLine}
                    chips={product.techChips}
                  />
                </div>

                {/* System Description */}
                <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
                  <CollapsibleDescription text={product.systemDescription} />
                </div>

                {/* Technical Properties & Limitations */}
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

                {/* Procurement Sources */}
                <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3">
                  <CollapsibleSources sources={product.procurementSources} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── System Comparison ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of polymer-modified ridge and hip capping bedding mortar systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Components</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Flexibility</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Substrate types</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Pot life</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coverage</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.components}</td>
                  <td className="px-4 py-3 text-slate-600">{row.flexibility}</td>
                  <td className="px-4 py-3 text-slate-600">{row.substrateTypes}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.potLife}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coverage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Brand Equivalence ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Brand Feature Equivalence</h2>
            <p className="mt-1 text-sm text-slate-500">
              Feature comparison across brands — confirm all features from the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Feature</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Bostik</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Laticrete</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">ARDEX</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: "Polymer modified", bostik: "✓", laticrete: "✓", ardex: "✓" },
                { feature: "2-part system", bostik: "✓", laticrete: "—", ardex: "—" },
                { feature: "Flexible", bostik: "✓", laticrete: "✓", ardex: "✓" },
              ].map((row, i) => (
                <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.feature}</td>
                  <td className="px-4 py-3 text-slate-600">{row.bostik}</td>
                  <td className="px-4 py-3 text-slate-600">{row.laticrete}</td>
                  <td className="px-4 py-3 text-slate-600">{row.ardex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
