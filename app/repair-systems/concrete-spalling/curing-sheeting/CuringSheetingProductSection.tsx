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
  | "LDPE"
  | "200-micron"
  | "250-micron"
  | "Clear"
  | "Black"
  | "Curing-membrane"
  | "Horizontal"
  | "Vertical"
  | "AS-3799";

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
    fullLabel: "Packline Australia",
    brandUrl: "https://www.packline.com.au",
    accentColor: "#0369a1",
    name: "Packline 200 µm Clear LDPE Builder's Plastic",
    descriptionLine: "200 µm clear polyethylene film for wet concrete curing — standard weight for most repair mortar curing applications",
    productType: "200 µm clear LDPE polyethylene sheeting — concrete curing membrane",
    filterTags: ["LDPE", "200-micron", "Clear", "Curing-membrane", "Horizontal", "Vertical"],
    techChips: [
      { label: "200 µm thickness", cls: "bg-sky-100 text-sky-800" },
      { label: "Clear — inspect cure", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 3799 compliant", cls: "bg-green-50 text-green-700" },
      { label: "4 m wide rolls", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Packline 200 µm clear LDPE polyethylene sheeting is a standard builder's plastic sheeting used as a wet curing membrane in concrete spalling repair. After applying repair mortar and achieving initial set, the mortar surface is covered with polythene sheeting and weighted or taped at edges to trap moisture against the fresh mortar surface. This maintains a high humidity environment around the fresh mortar through the initial curing period — typically 3 to 7 days depending on mortar type, ambient temperature, and wind exposure. Clear sheeting allows the repair surface to be inspected without lifting the membrane. Packline sheeting is available in 200 µm and 250 µm thicknesses and in rolls up to 4 m wide. The 200 µm weight is standard for most repair mortar curing applications on horizontal slabs, beam soffits, and columns. Sheeting should be wetted on the underside and weighted or fixed at edges to prevent wind lifting and edge drying.",
    technicalProperties: [
      "200 µm LDPE polyethylene film — clear — AS 3799 compliant",
      "Rolls available 2 m, 3 m, and 4 m wide — cut to length on site",
      "Clear film — allows inspection of fresh mortar without lifting membrane",
      "Suitable for horizontal and vertical surfaces — tape edges on vertical work",
    ],
    limitations: [
      "Wind can lift unsecured sheeting from vertical and inclined surfaces — tape or pin all edges on vertical applications",
      "Clear sheeting in direct sun can cause overheating of fresh mortar in summer — shade or use black sheeting where direct sunlight exposure is unavoidable",
      "Single-use only — sheeting contaminated with mortar should not be reused",
      "Sheeting alone does not provide initial curing protection in the first minutes after placement — an initial spray of water or application of evaporation retarder is required in hot/windy conditions before applying the membrane",
    ],
    procurementSources: [
      { name: "Packline Australia — builders plastic rolls", url: "https://www.packline.com.au" },
      { name: "Bunnings Trade — nationally available", url: "https://www.bunnings.com.au/trade" },
      { name: "Hydraulink and trade plastic suppliers nationally", url: "https://www.packline.com.au" },
    ],
  },
  {
    fullLabel: "Tuff Wrap / National Plastics",
    brandUrl: "https://www.nationalplastics.com.au",
    accentColor: "#16a34a",
    name: "Tuff Wrap 200 µm Black LDPE Builder's Plastic",
    descriptionLine: "200 µm black opaque polyethylene sheeting — preferred for summer curing to reduce solar heating of fresh mortar under direct sunlight",
    productType: "200 µm black LDPE polyethylene sheeting — curing membrane and protection",
    filterTags: ["LDPE", "200-micron", "Black", "Curing-membrane", "Horizontal"],
    techChips: [
      { label: "200 µm black", cls: "bg-slate-800 text-white" },
      { label: "Reduces solar heating", cls: "bg-green-100 text-green-800" },
      { label: "Opaque — blocks UV", cls: "bg-slate-100 text-slate-700" },
      { label: "Summer curing", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Tuff Wrap 200 µm black LDPE builder's plastic is a heavy-duty black polyethylene sheeting used as a curing membrane for fresh repair mortar where direct sunlight exposure would cause overheating under a clear membrane. Black sheeting reflects less solar radiation than clear but its primary advantage is that it absorbs and dissipates rather than concentrating heat under the membrane. In practice, on outdoor horizontal repairs in summer, the recommendation is to wet the mortar surface, apply black sheeting, and shade the sheeting with hessian or shade cloth for best temperature control. The opaque nature of black sheeting means the mortar surface cannot be inspected without lifting the membrane — on larger repairs, one edge of the membrane can be lifted briefly to check cure status. Available from National Plastics, Tuff Wrap, and major trade suppliers in 2 m, 3 m, and 4 m wide rolls.",
    technicalProperties: [
      "200 µm black LDPE polyethylene — opaque — absorbs and dissipates rather than concentrating solar heat",
      "Suitable for outdoor horizontal repairs in summer — reduces risk of mortar overheating under clear membrane",
      "Rolls 2 m and 4 m wide — cut to length on site",
      "Can be combined with hessian or shade cloth for maximum temperature control in hot weather",
    ],
    limitations: [
      "Cannot inspect mortar through membrane — lift edge briefly to check cure progress",
      "Black sheeting absorbs heat when left in direct sun without shade — can still cause overheating of thin mortar patches in extreme conditions — use hessian shade cover over black membrane in extreme heat",
      "Single-use — discard after each repair pour",
      "Not suitable for vertical applications without securing edges — weight or tape all perimeter edges",
    ],
    procurementSources: [
      { name: "National Plastics — nationally available", url: "https://www.nationalplastics.com.au" },
      { name: "Bunnings Trade — black builder's plastic", url: "https://www.bunnings.com.au/trade" },
      { name: "Trade and industrial plastics suppliers nationally", url: "https://www.nationalplastics.com.au" },
    ],
  },
  {
    fullLabel: "Bunnings Trade / Independent Hardware",
    brandUrl: "https://www.bunnings.com.au/trade",
    accentColor: "#f59e0b",
    name: "Builder's Plastic Sheeting — 200 µm Clear (Generic Supply)",
    descriptionLine: "Generic 200 µm clear polyethylene builder's plastic from trade hardware — suitable for short cure periods and low-wind indoor applications",
    productType: "200 µm clear polyethylene builder's plastic — general trade supply",
    filterTags: ["LDPE", "200-micron", "Clear", "Curing-membrane", "Horizontal"],
    techChips: [
      { label: "200 µm standard weight", cls: "bg-amber-100 text-amber-800" },
      { label: "Trade hardware supply", cls: "bg-slate-100 text-slate-700" },
      { label: "Off-the-shelf availability", cls: "bg-green-50 text-green-700" },
      { label: "Short curing periods", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Generic 200 µm clear builder's plastic sheeting available from Bunnings Trade, Mitre 10, and independent hardware suppliers is a practical curing membrane option for small patch repairs and repairs in low-wind indoor environments such as carparks and building interiors. This grade of sheeting is identical in function to branded builder's plastic — the key specification is 200 µm minimum thickness, which provides adequate durability for short cure periods of 3–7 days. Thinner sheeting (100–150 µm 'drop sheets') should not be used for curing as they tear easily and do not trap moisture reliably. When using generic trade supply sheeting, buy the heavier-weight builder's plastic grade (usually labelled '200 micron' or '0.2 mm') rather than lightweight drop sheet plastic. Available in pre-cut packs and roll lengths at most trade hardware stores nationally.",
    technicalProperties: [
      "200 µm minimum — standard trade builder's plastic grade — 100–150 µm drop sheets not suitable for curing",
      "Clear polyethylene — allows inspection of mortar surface without removing membrane",
      "Pre-cut packs and rolls — nationally available from trade hardware",
      "Suitable for indoor carpark and basement repairs — short cure periods 3–7 days",
    ],
    limitations: [
      "Generic trade supply sheeting is not always labelled with thickness — verify minimum 200 µm before purchase",
      "Lighter drop sheet grades (100–150 µm) look similar but tear more easily — confirm grade before use",
      "Not suitable for extended outdoor exposure beyond 7 days — UV degradation can cause sheeting to become brittle and fail",
      "Edge sealing requires tape or weighting to prevent drying of mortar edges under wind — particularly important for outdoor horizontal repairs",
    ],
    procurementSources: [
      { name: "Bunnings Trade — builder's plastic rolls and packs", url: "https://www.bunnings.com.au/trade" },
      { name: "Mitre 10 and independent hardware nationally", url: "https://www.mitre10.com.au" },
      { name: "Trade plastics suppliers nationally", url: "https://www.nationalplastics.com.au" },
    ],
  },
  {
    fullLabel: "Packline / Generic Supply",
    brandUrl: "https://www.packline.com.au",
    accentColor: "#7c3aed",
    name: "Heavy Duty 250 µm LDPE Sheeting",
    descriptionLine: "250 µm heavy-duty LDPE sheeting for extended cure periods, windy outdoor locations, and protection of fresh mortar from weather",
    productType: "250 µm heavy-duty LDPE sheeting — extended curing and weather protection",
    filterTags: ["LDPE", "250-micron", "Clear", "Black", "Curing-membrane", "Horizontal", "Vertical", "AS-3799"],
    techChips: [
      { label: "250 µm heavy duty", cls: "bg-purple-100 text-purple-800" },
      { label: "Extended cure 7–28 days", cls: "bg-slate-100 text-slate-700" },
      { label: "Wind and weather", cls: "bg-amber-50 text-amber-700" },
      { label: "Vertical applications", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Heavy-duty 250 µm LDPE polyethylene sheeting is used when a more durable curing membrane is required — for extended cure periods exceeding 7 days, in windy outdoor environments where standard 200 µm sheeting is prone to tearing, and for vertical or overhead curing where the membrane must hold reliably under its own weight when taped or fixed. For post-tensioned slab repairs and high-specification structural repairs where extended moist curing is specified (14–28 days), 250 µm sheeting provides a more reliable long-term moisture barrier than standard 200 µm film. Available from Packline Australia in clear and black variants and from trade plastics suppliers nationally. Use tape (duct tape or waterproof sealing tape) at all edges, laps, and penetrations for vertical and overhead applications. Re-wet the substrate side of the membrane daily if required by the repair mortar TDS curing specification.",
    technicalProperties: [
      "250 µm LDPE — heavier weight — more tear-resistant than standard 200 µm",
      "Suitable for extended cure periods 7–28 days — less UV degradation than thinner film",
      "Available in clear and black — rolls to 4 m wide",
      "Preferred for vertical and overhead curing where membrane must hold under its own weight",
    ],
    limitations: [
      "Still requires edge taping and securing on vertical and overhead surfaces — not self-adhering",
      "In extreme summer heat, even 250 µm black sheeting under direct sun can cause overheating — shade with hessian or shade cloth",
      "More expensive than standard 200 µm grade — overkill for most short-term 3–7 day indoor curing applications",
      "Must be removed before overcoating or topping application — membrane residue on mortar surface can reduce bond if left in contact",
    ],
    procurementSources: [
      { name: "Packline Australia — 250 µm LDPE sheeting", url: "https://www.packline.com.au" },
      { name: "National Plastics — heavy-duty builder's plastic", url: "https://www.nationalplastics.com.au" },
      { name: "Trade plastics and packaging suppliers nationally", url: "https://www.packline.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "LDPE", label: "LDPE" },
  { id: "200-micron", label: "200 µm" },
  { id: "250-micron", label: "250 µm" },
  { id: "Clear", label: "Clear" },
  { id: "Black", label: "Black" },
  { id: "Curing-membrane", label: "Curing membrane" },
  { id: "Horizontal", label: "Horizontal" },
  { id: "Vertical", label: "Vertical" },
  { id: "AS-3799", label: "AS 3799" },
];

const SYSTEM_COMPARISON = [
  {
    product: "200 µm Clear LDPE (Packline)",
    thickness: "200 µm",
    type: "Clear",
    cureperiod: "3–7 days",
    supply: "Trade and plastics suppliers",
    notes: "Standard weight — inspect mortar through film",
  },
  {
    product: "200 µm Black LDPE (Tuff Wrap)",
    thickness: "200 µm",
    type: "Black / opaque",
    cureperiod: "3–7 days",
    supply: "National Plastics, trade suppliers",
    notes: "Reduce solar heating in summer — shade with hessian over",
  },
  {
    product: "200 µm Clear — Trade supply",
    thickness: "200 µm",
    type: "Clear — generic",
    cureperiod: "3–7 days",
    supply: "Bunnings Trade, Mitre 10",
    notes: "Confirm grade is 200 µm builder's plastic — not drop sheet",
  },
  {
    product: "250 µm Heavy Duty LDPE",
    thickness: "250 µm",
    type: "Clear or black",
    cureperiod: "7–28 days",
    supply: "Packline, National Plastics",
    notes: "Extended curing and vertical/overhead applications",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Wet curing of polymer-modified repair mortars after placement — cover immediately after initial set to trap moisture",
    "Moist curing of fresh concrete placed in formwork for reinstatement work — apply sheeting immediately on striking forms",
    "Protection of fresh repair mortar from wind and sun drying in outdoor exposed locations — balcony slabs, carpark decks, external columns",
    "Extended curing of structural concrete repairs in post-tensioned slabs — 250 µm heavy-duty for 14–28 day moist cure specifications",
    "Protection of completed repair work from rain washout in the first 24 hours after placement",
    "Curing of thin bonding slurry coats and feather-edge repairs before topping mortar application",
  ],
  selectionCriteria: [
    "200 µm clear sheeting — standard selection for most indoor repairs and short outdoor cure periods (3–7 days)",
    "200 µm black sheeting — preferred for outdoor repairs in summer where direct sunlight on clear membrane would cause overheating of fresh mortar",
    "250 µm heavy-duty — use for extended cure periods (7–28 days), windy outdoor locations, and vertical or overhead curing where durability is needed",
    "Clear vs. black: clear allows mortar inspection without lifting membrane — preferred for detailed work; black reduces solar heat gain — preferred for exposed outdoor slabs in summer",
    "Roll width selection: 4 m rolls cover most patch repair areas — pre-cut packs are convenient for small repairs",
    "For high-specification repairs, confirm curing requirements from the repair mortar TDS — some products specify minimum 7-day moist cure, others accept spray-applied curing compound as alternative to sheeting",
  ],
  limitations: [
    "Polyethylene sheeting is not a substitute for initial evaporation control — if conditions are hot, windy, or very dry, apply evaporation retarder or shade the fresh mortar before applying the membrane",
    "Sheeting edges must be sealed or weighted — a loose edge allows the mortar to dry from the perimeter inward — the most common cause of curing failures in patch repair",
    "Clear sheeting + direct sun = risk of mortar overheating in summer — temperatures under clear sheeting in direct sun can exceed 60°C in Australian summer conditions — this accelerates set but impairs strength development",
    "Do not use lightweight drop sheet plastic (100–150 µm) for curing — it tears during placement and wind handling and does not maintain reliable moisture contact",
    "Sheeting must be removed before any overcoating — membrane residue on mortar surface will inhibit bond of primers, coatings, and toppings",
  ],
  standardsNotes: [
    "AS 3799 — Liquid Membrane-Forming Compounds for Curing Concrete — covers spray-applied curing compounds, not sheeting; sheeting curing is referenced in AS 3600 (Concrete Structures) and repair mortar TDS documents",
    "AS 3600 Clause 19.1.3 — Curing requirements — specifies minimum moist curing periods based on concrete strength and exposure conditions",
    "Repair mortar TDS — always the primary reference for curing method and duration — some products specify moist curing, others allow curing compound, others specify both",
    "ICRI Technical Guideline 310.3R — Guide for the Preparation of Concrete Surfaces — references wet curing membrane as an acceptable curing method for repair mortars",
    "WHS — safe handling of large rolls of sheeting — team lifts required for 4 m wide heavy rolls — UV degraded sheeting can fragment and create trip hazards on site",
  ],
  suitableDefects: [
    "Concrete spalling — primary application — curing all repair mortar placed in spalling repair patches",
    "Patch repair of exposed reinforcement — curing mortar placed around and over cleaned and primed rebar",
    "Slab edge reinstatement — curing mortar cast in formwork at slab edges and beam soffits",
    "Crack repair by filling — curing mortar or grout placed to fill cracks in concrete slabs and walls",
    "Precast panel repairs — curing patch mortar in factory or on-site in precast concrete repairs",
  ],
  typicalSubstrates: [
    "Fresh polymer-modified cementitious repair mortar — primary substrate — apply as soon as initial set has occurred",
    "Fresh ordinary Portland cement mortar and concrete — curing sheeting on newly placed concrete for reinstatement work",
    "Thin bonding slurry coats applied to existing concrete before topping mortar — cure the slurry before the primary mortar coat",
    "Existing concrete surfaces wetted before repair mortar placement — sheeting can also be used to pre-soak dry substrates before repair",
  ],
};

export function CuringSheetingIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">Curing sheeting in concrete spalling repair</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Polyethylene curing sheeting is a critical but often overlooked consumable in concrete spalling repair. After placing repair mortar, the mortar must be protected from moisture loss during the initial curing period — typically 3 to 7 days — to achieve its specified compressive strength and durability. Premature drying causes plastic shrinkage cracking, reduces surface strength, and can cause the repair to delaminate. Covering the fresh mortar with polyethylene sheeting as soon as initial set has occurred traps moisture against the mortar surface and maintains the high humidity environment required for cement hydration.
        </p>
        {expanded && (
          <>
            <p>
              The standard in Australian remedial practice is 200 µm clear LDPE builder's plastic sheeting — this thickness resists tearing during placement and normal site handling, is wide enough to cover most repair patches without joins, and is light enough to handle easily on vertical surfaces when taped. The sheeting must be sealed at all edges — a loose edge allows the mortar to dry from the perimeter inward, which is the most common cause of curing failures in patch repair work. In summer and in direct sunlight, consider black sheeting to reduce solar heating under the membrane, or shade the sheeting with hessian.
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

export function CuringSheetingProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 sheeting products — 200 µm and 250 µm LDPE in clear and black — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of curing sheeting options for concrete spalling repair. Confirm curing method and duration from repair mortar TDS before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Thickness</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Cure Period</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supply</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Notes</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.thickness}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.cureperiod}</td>
                  <td className="px-4 py-3 text-slate-600">{row.supply}</td>
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
