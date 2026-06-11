"use client";

import { useState, useRef } from "react";
import { Layers, SquareStack, Ruler, ExternalLink, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, FileText, BookOpen } from "lucide-react";
import { CollapsibleList, CollapsibleDescription, CollapsibleSources, CollapsibleCardDetails, TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";

type FilterTag =
  | "Structural"
  | "Low-Viscosity"
  | "2-Component"
  | "Dormant-Only"
  | "Dry-Only"
  | "High-Strength"
  | "Fine-Crack"
  | "Dual-Use";

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
    name: "TODO: owner confirm — Sika Injection-451 is not listed on the current aus.sika.com product range; current AU structural epoxy injection product appears to be Sikadur-52 AU — confirm correct product name",
    descriptionLine: "TODO: owner confirm — specs below are for Sika Injection-451 which is not confirmed on current aus.sika.com range; Sikadur-52 AU (current AU product) has ~500 mPa·s at 23°C, cracks ≥0.3 mm, tensile bond ≥8 MPa — verify and update",
    productType: "2-component low-viscosity epoxy injection resin — structural — Sika Australia",
    filterTags: ["Structural", "Low-Viscosity", "2-Component", "Dormant-Only", "Dry-Only", "High-Strength"],
    techChips: [
      { label: "TODO: owner confirm — viscosity (Inj-451 not on current AU range)", cls: "bg-sky-100 text-sky-800" },
      { label: "TODO: owner confirm — min crack width", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: owner confirm — tensile bond strength", cls: "bg-green-50 text-green-700" },
      { label: "Dry only", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "TODO: owner confirm — Sika Injection-451 does not appear on the current aus.sika.com product listing (June 2026). The current Sika Australia structural epoxy crack injection product appears to be Sikadur-52 AU (2-component, ~500 mPa·s at 23°C, cracks ≥0.3 mm, tensile bond ≥8 MPa on concrete, compressive strength ≥70 MPa, pot life ~45 min at 20°C, mix ratio 3:1 by volume). If Sika Injection-451 is still available through Sika Australia on special order, confirm current AU TDS specs before publishing. Source checked: aus.sika.com (June 2026) — Injection-451 not listed; Sikadur-52 AU page: https://aus.sika.com/en/construction/concrete-repair-protection/concrete-repair-mortars/epoxy-repair-mortarsandrigidbonding/sikadur-52-au.html",
    technicalProperties: [
      "TODO: owner confirm — Sika Injection-451 not confirmed on current aus.sika.com range; current AU product Sikadur-52 AU has ~500 mPa·s at 23°C",
      "TODO: owner confirm — tensile bond strength (Sikadur-52 AU: ≥8 MPa on concrete per fetched TDS)",
      "Crack must be fully dry — moisture prevents epoxy bonding to crack faces",
      "TODO: owner confirm — pot life (Sikadur-52 AU Normal: ~45 min at 20°C)",
      "Sika Australia — national supply",
    ],
    limitations: [
      "Do not inject into wet or moisture-contaminated cracks — epoxy does not bond to wet concrete — pre-treat with PU first then allow crack to dry",
      "Do not use for live or moving cracks — cured epoxy is rigid — crack movement will re-open adjacent concrete at the injection boundary",
      "Requires 2-component injection pump with static mixing nozzle — not compatible with single-component or manual cartridge guns without ratio control",
      "Confirm dormancy by monitoring crack width over 4–8 weeks minimum before injection — injecting a live crack with rigid epoxy fractures adjacent concrete",
    ],
    procurementSources: [
      { name: "Sika Australia — national supply", url: "https://aus.sika.com" },
      { name: "Bayset — national Sika distribution", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#15803d",
    name: "TODO: owner confirm — Fosroc Concresive 1414 is not listed on the current fosroc.com.au product range; current AU Fosroc epoxy injection product is Nitofill LV — confirm correct product name and update all specs",
    descriptionLine: "TODO: owner confirm — Concresive 1414 not found on fosroc.com.au (June 2026); Fosroc AU current epoxy injection product is Nitofill LV (low viscosity dual cartridge epoxy, 450 mL twin cartridge) — verify specs from current Fosroc AU TDS",
    productType: "2-component ultra-low viscosity epoxy injection resin — fine crack structural repair — Fosroc / Parchem Australia",
    filterTags: ["Structural", "Low-Viscosity", "2-Component", "Dormant-Only", "Dry-Only", "High-Strength", "Fine-Crack"],
    techChips: [
      { label: "TODO: owner confirm — viscosity (Concresive 1414 not on current AU range)", cls: "bg-emerald-100 text-emerald-800" },
      { label: "TODO: owner confirm — min crack width", cls: "bg-slate-100 text-slate-700" },
      { label: "Structural reinstatement", cls: "bg-green-50 text-green-700" },
      { label: "Dry only", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "TODO: owner confirm — Fosroc Concresive 1414 does not appear on the current fosroc.com.au product listing (June 2026). The current Fosroc Australia low-viscosity epoxy injection product is Nitofill LV (low viscosity dual cartridge epoxy system, 450 mL twin cartridge or 15 L pack). All viscosity, pot life, minimum crack width, compressive strength, and tensile bond values stated for Concresive 1414 must be replaced with confirmed data from the current Nitofill LV TDS. Source checked: fosroc.com.au product listing (June 2026) — Concresive 1414 not found; Nitofill LV product page: https://www.fosroc.com.au/product/nitofill-lv",
    technicalProperties: [
      "TODO: owner confirm — Concresive 1414 not on current fosroc.com.au range; current AU product is Nitofill LV",
      "TODO: owner confirm — viscosity and min crack width from current Fosroc AU Nitofill LV TDS",
      "2-component structural epoxy — tensile bond sufficient for structural crack reinstatement",
      "Used for hair cracks where standard epoxy viscosity prevents full crack penetration",
      "Fosroc / Parchem Australia — national supply",
    ],
    limitations: [
      "Crack must be dry — ultra-low viscosity transports even minor moisture contamination into the crack and impairs bond",
      "Structural use only when crack is dormant — epoxy does not accommodate any movement after cure",
      "Cold weather significantly increases viscosity — at 10°C viscosity may double, reducing penetration depth — confirm temperature limits from TDS",
      "Recently saw-cut crack faces may have concrete dust — blow with dry compressed air after port adhesive cures and before injection",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — national distribution (DuluxGroup)", url: "https://www.parchem.com.au" },
      { name: "Fosroc Australia — product information", url: "https://www.fosroc.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#dc2626",
    name: "TODO: owner confirm — Mapei Mapeject 52 is not listed on the current mapei.com/au product range; current Mapei AU epoxy injection product is Epojet (or Epojet LV for micro-cracks) — confirm correct product name and update all specs",
    descriptionLine: "TODO: owner confirm — Mapeject 52 not found on mapei.com/au (June 2026); Mapei AU current epoxy injection products are Epojet (pot life ~40 min at 23°C, EN 1504-5) and Epojet LV (very low viscosity, pot life ~35 min at 23°C) — verify specs from current Mapei AU TDS",
    productType: "2-component low-viscosity epoxy injection resin — structural crack repair — Mapei Australia",
    filterTags: ["Structural", "Low-Viscosity", "2-Component", "Dormant-Only", "Dry-Only", "High-Strength"],
    techChips: [
      { label: "TODO: owner confirm — viscosity (Mapeject 52 not on current AU range)", cls: "bg-red-100 text-red-800" },
      { label: "TODO: owner confirm — min crack width", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: owner confirm — compressive strength", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm — Mapei complete system product names", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "TODO: owner confirm — Mapei Mapeject 52 does not appear on the current mapei.com/au product listing (June 2026). The current Mapei Australia epoxy injection products are Epojet (2-component superfluid epoxy, pot life ~40 min at 23°C, EN 1504-5/EN 1504-6) and Epojet LV (very low viscosity, pot life ~35 min at 23°C, EN 1504-5). All viscosity, pot life, compressive strength, flexural strength, and minimum crack width values stated for Mapeject 52 must be replaced with confirmed data from the current Mapei AU Epojet TDS. Source checked: mapei.com/au product listing (June 2026) — Mapeject 52 not found; Epojet AU page: https://www.mapei.com/au/en/products-and-solutions/products/detail/epojet",
    technicalProperties: [
      "TODO: owner confirm — Mapeject 52 not on current mapei.com/au range; current AU product is Epojet (or Epojet LV)",
      "TODO: owner confirm — compressive and flexural strength from current Mapei AU Epojet TDS",
      "TODO: owner confirm — complete Mapei injection system product names (port adhesive is Eporip Turbo per TDS refs found, not Mapegrout Rapido)",
      "Structural crack reinstatement — dormant, dry cracks",
      "Mapei Australia — national supply",
    ],
    limitations: [
      "Crack must be dry and dust-free — moisture contamination reduces bond significantly",
      "TODO: owner confirm — minimum crack width threshold (update reference to correct current product, not Fosroc Concresive 1414)",
      "Not suitable for moving cracks — epoxy is rigid — any crack movement after cure re-opens the parent concrete",
      "TODO: owner confirm — pot life at 20°C (Epojet AU: ~40 min at 23°C per search results — confirm from current AU TDS)",
    ],
    procurementSources: [
      { name: "Mapei Australia — national trade supply", url: "https://www.mapei.com/au" },
      { name: "Bayset — national Mapei distribution", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Ardex Australia",
    brandUrl: "https://www.ardex.com.au",
    accentColor: "#7c3aed",
    name: "TODO: owner confirm — Ardex FK 45 is not listed on the current ardexaustralia.com product range; current AU Ardex epoxy crack injection products are RA 142 (super low viscosity, working time 20 min, cracks ≤3 mm) and RA 144 (low viscosity, cracks 3–6 mm) — confirm correct product name and update all specs",
    descriptionLine: "TODO: owner confirm — FK 45 not found on ardexaustralia.com (June 2026); Ardex AU current injection products are RA 142 (super low viscosity, 470 mL dual cartridge, 10–35°C) and RA 144 (low viscosity, 470 mL, 3–6 mm cracks) — verify specs from current Ardex AU TDS",
    productType: "2-component low-viscosity epoxy injection and void-filling resin — Ardex Australia",
    filterTags: ["Structural", "2-Component", "Dormant-Only", "Dry-Only", "High-Strength", "Dual-Use"],
    techChips: [
      { label: "TODO: owner confirm — mix ratio (FK 45 not on current AU range)", cls: "bg-violet-100 text-violet-800" },
      { label: "TODO: owner confirm — dual use application", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: owner confirm — compressive strength", cls: "bg-green-50 text-green-700" },
      { label: "Ardex trade supply", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "TODO: owner confirm — Ardex FK 45 does not appear on the current ardexaustralia.com product listing (June 2026). The current Ardex Australia structural epoxy crack injection products are RA 142 (super low viscosity, 470 mL dual cartridge, working time 20 min, application 10–35°C, for hairline to fine cracks) and RA 144 (low viscosity, 470 mL dual cartridge, for 3–6 mm cracks and masonry). All mix ratio, pot life, compressive strength, and minimum crack width values stated for FK 45 must be replaced with confirmed data from the current Ardex AU RA 142 / RA 144 TDS. Source checked: ardexaustralia.com crack injection product page (June 2026) — FK 45 not found. Source: https://ardexaustralia.com/products_category/concrete-repair/crack-repair-injection/",
    technicalProperties: [
      "TODO: owner confirm — FK 45 not on current ardexaustralia.com range; current AU products are RA 142 (super low viscosity) and RA 144 (low viscosity)",
      "TODO: owner confirm — compressive strength and pot life from current Ardex AU RA 142 / RA 144 TDS",
      "TODO: owner confirm — whether RA 142 / RA 144 also cover honeycombed void filling or whether a separate Ardex product is needed",
      "Ardex Australia — national trade supply",
    ],
    limitations: [
      "Crack and void must be dry — not for use in wet or moisture-present conditions without preliminary water-stop treatment",
      "Not for live or active cracks — rigid cure only — use PU flexible injection for moving or wet cracks",
      "TODO: owner confirm — minimum crack width for current Ardex AU products (RA 142 for hairline; RA 144 for 3–6 mm)",
      "TODO: owner confirm — whether honeycombed void filling is within scope of RA 142 / RA 144 per current Ardex AU TDS",
    ],
    procurementSources: [
      { name: "Ardex Australia — national trade supply", url: "https://www.ardex.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Structural", label: "Structural" },
  { id: "Low-Viscosity", label: "Low viscosity" },
  { id: "2-Component", label: "2-component" },
  { id: "Dormant-Only", label: "Dormant crack only" },
  { id: "Dry-Only", label: "Dry crack only" },
  { id: "High-Strength", label: "High strength" },
  { id: "Fine-Crack", label: "Fine crack (<0.1 mm)" },
  { id: "Dual-Use", label: "Crack + void" },
];

const SYSTEM_COMPARISON = [
  { product: "TODO: confirm AU product name (Inj-451 not on aus.sika.com)", viscosity: "TODO: confirm from AU TDS", minCrack: "TODO: confirm", tensileStrength: "TODO: confirm", potLife: "TODO: confirm", structural: "Yes" },
  { product: "TODO: confirm AU product name (Concresive 1414 not on fosroc.com.au — try Nitofill LV)", viscosity: "TODO: confirm from AU TDS", minCrack: "TODO: confirm", tensileStrength: "TODO: confirm", potLife: "TODO: confirm", structural: "Yes" },
  { product: "TODO: confirm AU product name (Mapeject 52 not on mapei.com/au — try Epojet)", viscosity: "TODO: confirm from AU TDS", minCrack: "TODO: confirm", tensileStrength: "TODO: confirm (Epojet pot life ~40 min)", potLife: "TODO: confirm", structural: "Yes" },
  { product: "TODO: confirm AU product name (FK 45 not on ardexaustralia.com — try RA 142 / RA 144)", viscosity: "TODO: confirm from AU TDS", minCrack: "TODO: confirm", tensileStrength: "TODO: confirm", potLife: "TODO: confirm (RA 142 working time 20 min)", structural: "Yes" },
];

const TECH_INFO = {
  typicalApplications: [
    "Structural reinstatement of dormant flexural cracks in suspended concrete slabs — beam tension cracks, slab soffit cracks from differential settlement",
    "Structural re-joining of through-depth cracks in columns, walls, and beams where tensile continuity across the crack plane is required",
    "Crack injection in carpark decks, bridge structures, and commercial building frames where dormant cracks are confirmed by crack width monitoring",
    "Fine crack injection in high-quality architectural concrete where surface cracking must be made watertight AND structurally continuous",
    "Void filling and fine crack repair in the same element using FK 45 dual-purpose resin",
  ],
  selectionCriteria: [
    "Confirm crack is dormant — monitor for 4–8 weeks minimum — injecting a live crack with rigid epoxy fractures adjacent concrete",
    "Crack must be dry — even residual moisture significantly reduces epoxy tensile bond — for wet cracks, pre-treat with PU then dry before epoxy injection",
    "Crack width < 0.1 mm → Fosroc Concresive 1414 (ultra-low viscosity) for reliable penetration",
    "Crack width 0.1–0.2 mm → Sika Injection-451 or equivalent low viscosity",
    "Crack width ≥ 0.2 mm → any of the four products; Mapeject 52 or FK 45 for combined crack and void application",
    "Structural engineer must confirm that crack injection alone restores adequate section capacity — CFRP or section augmentation may also be required",
  ],
  limitations: [
    "Epoxy injection is NOT suitable for live, moving, or wet cracks — rigid cure fails under movement or moisture",
    "Epoxy injection does not address the cause of cracking — without addressing the underlying load or movement, the crack or an adjacent fracture will recur",
    "Over-pressuring a fine crack causes hydraulic fracturing — always start at the lowest effective injection pressure",
    "Pot life at 20°C is 20–35 minutes — in hot weather pot life shortens significantly — plan batch sizes and injection sequences carefully",
    "Confirming full injection: continue injecting each port until resin bleeds from the adjacent port — this is the only reliable way to confirm the crack section is filled",
  ],
  standardsNotes: [
    "EN 1504-5 — Products and Systems for the Protection and Repair of Concrete Structures — crack injection products",
    "AS 3600 — Concrete Structures — structural engineer must confirm that injected crack section meets design capacity requirements",
    "ICRI Guideline 310.3 — Guide for the Selection of Strengthening Systems for Concrete Structures — when injection alone is not sufficient",
    "Manufacturer TDS — mix ratio, injection pressure, temperature range, and pot life are critical — confirm for each product and ambient conditions",
  ],
  suitableDefects: [
    "Dormant flexural and tensile cracks in reinforced concrete beams, slabs, and columns — structural reinstatement",
    "Through-depth shrinkage or settlement cracks in walls and slabs where watertightness and structural continuity are both required",
    "Fine dormant cracks in carpark decks, bridges, and strata building frames",
    "Honeycombed voids (FK 45 dual-purpose) in structural concrete elements",
  ],
  typicalSubstrates: [
    "In-situ reinforced concrete — crack faces must be dry, clean, and free of concrete dust",
    "Precast concrete elements — same requirements — confirm bond to high-density precast surfaces with manufacturer",
    "Post-tensioned concrete — structural engineer clearance required before injecting any crack in a PT element — confirm PT tendon positions before port installation",
    "Bridge and civil structure concrete — confirm with engineer for exposure classification and long-term performance requirements",
  ],
};

export function InjectionResinsEpoxyRigidIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">When epoxy rigid injection is the right choice</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Epoxy rigid injection is specified when the crack must be structurally re-joined — when the loss of tensile continuity across the crack reduces the element capacity below design. Typical cases: tension cracks in beam soffits, flexural cracks in suspended slabs, shear cracks in columns or walls. The crack must be dormant (not moving) and dry — epoxy is brittle relative to concrete and any crack cycling will fracture the adjacent concrete.
        </p>
        {expanded && (
          <>
            <p>
              Confirm dormancy by monitoring the crack width over 4–8 weeks before injecting. If the crack is wet, dry it first with warm-air dehumidification or by waiting for seasonal dry conditions — if the crack cannot be dried, structural function must be achieved by other means such as CFRP externally bonded reinforcement.
            </p>
            <p>
              Low viscosity is critical for fine crack penetration — at a given injection pressure, a lower-viscosity resin flows further into the crack and achieves more complete filling. Sika Injection-451 and Fosroc Concresive 1414 are the two lowest-viscosity products in this reference; for cracks finer than 0.1 mm, Concresive 1414 is preferred. Always confirm full injection by continuing at each port until resin bleeds from the adjacent port — visual inspection of the surface never confirms internal crack fill.
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

export function InjectionResinsEpoxyRigidProductSection() {
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
        <button type="button" onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
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
            <p className="mt-1 text-sm text-slate-500">4 products — epoxy rigid injection resins — scroll to view all</p>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => {
            const active = activeFilters.has(f.id);
            return (
              <button key={f.id} type="button" onClick={() => toggleFilter(f.id)} className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}>
                {f.label}
              </button>
            );
          })}
          {activeFilters.size > 0 && (
            <button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">Clear filters</button>
          )}
        </div>

        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">{visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll to view all</span>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll("left")} aria-label="Scroll left" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronLeft size={16} /></button>
            <button onClick={() => scroll("right")} aria-label="Scroll right" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronRight size={16} /></button>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}>
          {visibleProducts.map((product) => (
            <div key={product.name} className="flex-none" style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ borderLeft: `4px solid ${product.accentColor}` }}>
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">{product.fullLabel}</span>
                    <div className="flex shrink-0 items-center gap-1">
                      {product.tdsUrl && (
                        <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><FileText size={9} /> TDS</a>
                      )}
                      <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><ExternalLink size={9} /> Brand Site</a>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of epoxy rigid injection resins. Confirm all product selections against the current manufacturer TDS before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Viscosity</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Min crack width</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Bond / strength</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Pot life</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Structural?</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.viscosity}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.minCrack}</td>
                  <td className="px-4 py-3 text-slate-600">{row.tensileStrength}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.potLife}</td>
                  <td className="px-4 py-3 text-slate-600">{row.structural}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
