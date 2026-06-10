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
  | "Acrylic"
  | "Wax-emulsion"
  | "Brush-applied"
  | "Spray-applied"
  | "Walls"
  | "Floors"
  | "Water-based"
  | "ASTM-C309";

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
    name: "Sika Antisol-15 SF",
    descriptionLine: "TODO: owner confirm — Antisol E does not appear as a current AU Sika product (aus.sika.com search Jun 2026 returned Antisol-15 SF and Antisol AC as AU curing compounds) — confirm correct current AU product name with Sika Australia before specifying",
    productType: "TODO: owner confirm — Antisol E not confirmed in AU range — current AU products appear to be Antisol-15 SF and Antisol AC",
    filterTags: ["Acrylic", "Brush-applied", "Spray-applied", "Water-based", "Walls", "Floors"],
    techChips: [
      { label: "TODO: confirm AU product name", cls: "bg-rose-100 text-rose-800" },
      { label: "TODO: confirm pack sizes", cls: "bg-slate-100 text-slate-700" },
      { label: "Remove before overcoating", cls: "bg-amber-50 text-amber-700" },
      { label: "Sika AU trade supply", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "TODO: owner confirm — 'Sika Antisol E' was listed in this card but does not appear as a current AU product on aus.sika.com (site search June 2026 returned Antisol-15 SF and Antisol AC as the current AU curing compounds — Antisol E appeared only in an international South Africa project reference). The current AU Sika curing compound range appears to include: Antisol-15 SF (water-based liquid acrylic membrane — TDS published October 2024) and Antisol AC (water-based hydrocarbon resin — AS3799 compliant). Confirm the correct current AU product name, pack size, and application requirements with Sika Australia technical before specifying. Both are applied immediately after mortar finishing and must be removed before overcoating. Source: aus.sika.com search results and TDS metadata confirmed Antisol-15 SF (Oct 2024 AU TDS) and Antisol AC as current AU products — no Antisol E AU TDS found.",
    technicalProperties: [
      "TODO: owner confirm — Antisol E not confirmed in current AU Sika range — Antisol-15 SF confirmed as AU product (Oct 2024 TDS)",
      "Antisol-15 SF: water-based liquid acrylic membrane for concrete surface curing",
      "Applied immediately after mortar finishing by brush, roller, or spray",
      "Minimum 7 days curing per AS 3600 before traffic or loading",
      "Must be removed before overcoating — wire brush, sand, or blast",
    ],
    limitations: [
      "TODO: owner confirm — product name (Antisol E vs Antisol-15 SF vs Antisol AC) with Sika Australia before specifying",
      "TODO: owner confirm — current pack sizes for AU curing compound from Sika Australia",
      "Must be removed before applying coating systems over the cured repair — curing compound forms a bond breaker",
      "Confirm current coverage rate and application requirements from current Sika Australia TDS",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply nationally", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#7c2d12",
    name: "Fosroc Concure WB30",
    descriptionLine: "Water-based wax emulsion curing compound — conforms to AS3799 — white on application, dries clear — spray applied to fresh repair mortar immediately after finishing on floors, walls, and repair patches",
    productType: "Water-based wax emulsion curing compound — spray applied — AS3799 conforming",
    filterTags: ["Wax-emulsion", "Spray-applied", "Water-based", "Walls", "Floors"],
    techChips: [
      { label: "Conforms to AS3799", cls: "bg-orange-100 text-orange-900" },
      { label: "White on apply — clear on dry", cls: "bg-slate-100 text-slate-700" },
      { label: "Floors, walls, and patches", cls: "bg-amber-50 text-amber-700" },
      { label: "Parchem — national", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Fosroc Concure WB30 is a water-based wax emulsion curing compound for concrete and repair mortar surfaces, conforming to AS3799 (Australian Standard for liquid membrane-forming curing compounds). It is spray applied to the fresh mortar surface immediately after finishing to form a wax membrane that retards moisture evaporation during curing. Concure WB30 is white in colour when applied — allowing visual verification of coverage — and dries to a clear film. It is non-flammable and eliminates the need for damp hessian, sand, or polythene wet curing. It is suitable for use on concrete floors, walls, and repair patches in sheltered and outdoor conditions. Particularly useful for large concrete areas such as runways, motorways, and bridgeworks. Must be removed before overcoating by mechanical abrasion. Available through Parchem Construction Supplies (DuluxGroup) nationally. Confirm coverage rate, application method, and compatibility with overcoating systems from the current Fosroc/Parchem TDS. Source: fosroc.com.au product page confirmed wax emulsion, AS3799 conformance, Clear and White variants.",
    technicalProperties: [
      "Water-based wax emulsion curing compound — conforms to AS3799 — confirmed fosroc.com.au",
      "White on application — visual coverage verification — dries to clear film",
      "Non-flammable — eliminates need for damp hessian, sand, or polythene wet curing",
      "Spray applied immediately after mortar finishing — suitable for large areas and repair patches",
      "Parchem (DuluxGroup) — national trade supply — available in Clear and White variants",
    ],
    limitations: [
      "Must be removed before overcoating — wax emulsion is a bond breaker for coatings",
      "Not suitable for use on surfaces to receive cementitious toppings or adhesives without removal",
      "Confirm coverage rate and removal requirements from current Parchem TDS",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — national (DuluxGroup)", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Tremco CPG Australia",
    brandUrl: "https://www.tremcocpg.com",
    accentColor: "#065f46",
    name: "Tremco Eucocrete WB Cure",
    descriptionLine: "Water-based acrylic curing compound for concrete repair mortar — spray or brush applied immediately after mortar finishing to form moisture-retaining film during early curing period",
    productType: "Water-based acrylic curing compound — spray or brush applied",
    filterTags: ["Acrylic", "Brush-applied", "Spray-applied", "Water-based", "Floors"],
    techChips: [
      { label: "Spray or brush applied", cls: "bg-emerald-100 text-emerald-900" },
      { label: "For PM and cementitious mortars", cls: "bg-slate-100 text-slate-700" },
      { label: "Confirm with Tremco CPG", cls: "bg-amber-50 text-amber-700" },
      { label: "Remove before overcoating", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Tremco Eucocrete WB Cure is a water-based acrylic curing compound for concrete repair mortar. It is applied by spray or brush immediately after the mortar has been finished to form an acrylic film that retains moisture during the critical initial curing period. It is suitable for use with polymer-modified and cementitious repair mortars in concrete spalling applications. Must be removed by mechanical abrasion before any overcoating system is applied. Confirm current product name, coverage rate, and application instructions with Tremco CPG Australia before specifying — Tremco CPG product range for Australian projects should be confirmed from current Australian TDS.",
    technicalProperties: [
      "Water-based acrylic curing compound — spray or brush applied",
      "Applied immediately after mortar finishing — forms moisture-retaining film",
      "Suitable for polymer-modified and cementitious repair mortars",
      "Confirm current product name and coverage with Tremco CPG Australia",
    ],
    limitations: [
      "Must be removed before overcoating by mechanical abrasion",
      "Confirm current product name and Australian availability with Tremco CPG Australia before specifying",
      "Confirm application and curing requirements from current Tremco Australia TDS",
    ],
    procurementSources: [
      { name: "Tremco CPG Australia — confirm local distribution", url: "https://www.tremcocpg.com" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#1d4ed8",
    name: "Mapei Mapecure S",
    descriptionLine: "Acrylic resin curing compound conforming to ASTM C309 Type 1 — spray applied after repair mortar finishing to reduce moisture evaporation during minimum 7-day early curing period",
    productType: "Acrylic curing compound — water-based — ASTM C309 Type 1",
    filterTags: ["Acrylic", "Spray-applied", "Water-based", "Floors", "ASTM-C309"],
    techChips: [
      { label: "ASTM C309 Type 1", cls: "bg-blue-100 text-blue-900" },
      { label: "Spray applied", cls: "bg-slate-100 text-slate-700" },
      { label: "Min 7 days curing", cls: "bg-amber-50 text-amber-700" },
      { label: "Mapei trade + Bayset", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Mapei Mapecure S is an acrylic resin curing compound for concrete and repair mortar surfaces. It is applied by spray immediately after mortar finishing to reduce moisture evaporation during the early curing period. The product conforms to ASTM C309 Type 1 requirements for curing compounds. It must be removed before any coating, adhesive, or waterproofing system is applied over the cured repair. Available through Mapei Australia trade supply and Bayset nationally. Confirm coverage rate, application requirements, and compatibility with subsequent coating systems from the current Mapei Australia TDS before specifying.",
    technicalProperties: [
      "Acrylic curing compound — water-based — spray applied after mortar finishing",
      "Reduces moisture evaporation during early curing — minimum 7 days curing",
      "ASTM C309 Type 1 conformance",
      "Mapei trade + Bayset nationally",
    ],
    limitations: [
      "Must be removed before overcoating — Mapecure S is a bond breaker for coating systems",
      "Not suitable for areas to receive cementitious toppings without complete removal",
      "Confirm coverage rate and removal method from current Mapei Australia TDS",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply nationally", url: "https://www.mapei.com/au" },
      { name: "Bayset — nationally available", url: "https://www.bayset.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Acrylic", label: "Acrylic" },
  { id: "Wax-emulsion", label: "Wax emulsion" },
  { id: "Brush-applied", label: "Brush applied" },
  { id: "Spray-applied", label: "Spray applied" },
  { id: "Water-based", label: "Water-based" },
  { id: "Walls", label: "Walls" },
  { id: "Floors", label: "Floors" },
  { id: "ASTM-C309", label: "ASTM C309" },
];

const SYSTEM_COMPARISON = [
  { brand: "Sika", product: "TODO: confirm AU name (Antisol-15 SF or Antisol AC)", type: "Acrylic", applied: "Brush / roller / spray", mustRemove: "Yes — before any overcoating", notes: "Antisol E not confirmed in AU range — confirm with Sika AU" },
  { brand: "Fosroc / Parchem", product: "Fosroc Concure WB30", type: "Wax emulsion — AS3799", applied: "Spray", mustRemove: "Yes — before any overcoating", notes: "White on application — visual coverage check — AS3799 conforming" },
  { brand: "Tremco CPG", product: "Tremco Eucocrete WB Cure", type: "Acrylic", applied: "Spray / brush", mustRemove: "Yes — before any overcoating", notes: "Confirm current product name with Tremco CPG" },
  { brand: "Mapei", product: "Mapei Mapecure S", type: "Acrylic — ASTM C309", applied: "Spray", mustRemove: "Yes — before any overcoating", notes: "Mapei trade + Bayset nationally" },
];

const TECH_INFO = {
  typicalApplications: [
    "Applied immediately after concrete repair mortar has been finished (screeded and floated) to prevent rapid moisture evaporation during the critical first 7 days of curing",
    "Used on spalling repair patches on carpark columns, beam soffits, and slab edges where wet curing with polythene sheeting is impractical",
    "Applied to large repair mortar areas where sheeting wet curing is cost-ineffective — curing compound is faster to apply over large areas",
    "Used on external vertical face repair patches where poly sheeting would be difficult to retain — spray-applied curing compound is more practical on vertical surfaces",
    "Alternative to wet curing in moderate exposure conditions (protected from direct sun and wind) — in extreme hot/dry/windy conditions, wet curing sheeting is preferred or both methods used together",
  ],
  selectionCriteria: [
    "Apply immediately after mortar finishing — do not delay — surface must not start to dry before curing compound is applied",
    "Acrylic curing compounds: general purpose — suitable for most repair mortar applications in sheltered and moderate outdoor conditions",
    "Wax emulsion compounds: white colour aids visual coverage verification — suitable for floors and horizontal surfaces in all conditions",
    "Where the cured mortar will be overcoated: confirm curing compound removal method — some compounds require mechanical abrasion; others can be removed by light sanding",
    "ASTM C309 Type 1 conformance: confirms minimum water-retention efficiency — specify this standard on project documentation",
    "In very hot, dry, or windy conditions: consider wet curing (polythene sheeting) instead of or in addition to curing compound for maximum moisture retention",
  ],
  limitations: [
    "CRITICAL: curing compound must be COMPLETELY removed before applying any coating, paint, adhesive, or waterproofing system — curing compound is a bond breaker and will cause coating delamination if not removed",
    "Do NOT apply curing compound to surfaces that will receive cementitious toppings, adhesives, or overlays — bond will be compromised",
    "Curing compound does NOT replace 7-day minimum curing requirement — it is a moisture-retention aid, not a curing accelerant",
    "In very hot, dry, or windy conditions, curing compound alone may be insufficient — supplement with wet curing (damp polythene sheeting)",
    "Spray application in windy conditions can result in uneven coverage — ensure full coverage with no dry spots",
  ],
  standardsNotes: [
    "AS 3600 — Concrete Structures — minimum curing period 7 days for structural concrete and repair mortar — confirmed curing compound is an accepted curing method",
    "ASTM C309 — Standard Specification for Liquid Membrane-Forming Compounds for Curing Concrete — Type 1 is the minimum for repair mortar curing compounds",
    "AS 3799 — Liquid Membrane Forming Curing Compounds for Concrete — Australian standard for curing compound water retention efficiency",
    "Repair mortar manufacturer TDS — always confirm curing compound compatibility and application rate from the specific repair mortar TDS — some products have specific curing requirements",
  ],
  suitableDefects: [
    "Concrete spalling repair patches — curing compound applied after every repair mortar placement to maintain moisture for curing",
    "Cementitious repair mortar placements — any cementitious repair mortar patch requiring a curing period — curing compound applied immediately after finishing",
    "Polymer-modified repair mortar placements — confirm compatibility of curing compound with the PM mortar from the mortar manufacturer TDS",
    "Concrete reinstatement pours — curing compound applied to formed concrete surfaces after stripping",
  ],
  typicalSubstrates: [
    "Fresh repair mortar surface — the compound is applied TO the mortar surface while it is still fresh — it is a curing method, not a substrate treatment",
    "Horizontal repair patches (slab top, beam top) — curing compound by spray or roller is most efficient on horizontal surfaces",
    "Vertical repair patches (columns, walls) — spray-applied curing compound can be used on vertical surfaces — wet curing with sheeting is the alternative for vertical patches",
    "Soffit repair patches — curing compound applied by spray or brush to soffit mortar immediately after finishing — sheeting wet curing is generally preferred for soffits",
  ],
};

export function CuringCompoundsIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are curing compounds used for in concrete repair?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Curing compounds are applied immediately after concrete repair mortar has been finished (screeded and floated). They form a thin membrane over the fresh mortar surface that retards moisture evaporation during the critical first 7 days of curing. Without adequate curing, the repair mortar surface dries too rapidly — causing surface cracking (plastic shrinkage cracks), reduced surface strength, and poor adhesion of subsequent coating systems.
        </p>
        {expanded && (
          <>
            <p>
              Per AS 3600, a minimum of 7 days moist curing is required for structural concrete repair. In exposed or hot conditions, curing compound is the most practical method — polythene sheeting (wet curing) is the alternative. Critical: curing compounds must be removed by mechanical abrasion before applying any coating, paint, adhesive, or waterproofing system over the cured repair patch. A curing compound that is not removed becomes a bond breaker and will cause coating delamination.
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

export function CuringCompoundsProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 brands — acrylic and wax emulsion curing compounds — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Curing compounds for concrete spalling repair mortar — all must be removed before overcoating.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Applied</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Must remove</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Notes</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.applied}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.mustRemove}</td>
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
