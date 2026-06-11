"use client";

import { useState, useRef } from "react";
import { Layers, SquareStack, Ruler, ExternalLink, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, FileText, BookOpen } from "lucide-react";
import { CollapsibleList, CollapsibleDescription, CollapsibleSources, CollapsibleCardDetails, TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";

type FilterTag =
  | "Hydrophilic"
  | "Hydrophobic"
  | "1-Component"
  | "2-Component"
  | "Water-Active"
  | "Dormant-Crack"
  | "Foaming"
  | "Flexible";

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
    name: "Sika Injection-107 — Single-Component Hydrophilic PU Injection Resin",
    descriptionLine: "1-component hydrophilic PU — water-reactive expanding foam — wet and actively leaking cracks, joints, and honeycombs — free foaming factor ~22× on contact with water",
    productType: "1-component hydrophilic polyurethane injection resin — water-reactive — Sika Australia",
    filterTags: ["Hydrophilic", "1-Component", "Water-Active", "Foaming", "Flexible"],
    techChips: [
      { label: "Hydrophilic — water-reactive", cls: "bg-sky-100 text-sky-800" },
      { label: "Free foaming factor ~22×", cls: "bg-slate-100 text-slate-700" },
      { label: "1-component pump", cls: "bg-green-50 text-green-700" },
      { label: "Not structural", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sika Injection-107 is a single-component, low-viscosity, hydrophilic polyurethane injection resin for sealing water-active (wet or actively leaking) cracks, construction joints, and voids in concrete. On contact with water, Injection-107 foams and expands — free foaming factor approximately 22× volume — to form a flexible, closed-cell foam that blocks water passage. The hydrophilic reaction is the mechanism: the more water present, the faster and more completely it reacts. It is used to stop active water ingress through cracks, cold joints, and honeycombs from the positive or negative side. Injected through low-pressure surface ports (typically 0.2–0.5 MPa) using a single-component PU injection pump. Sika Injection-107 remains flexible after curing, accommodating minor crack movement. It is NOT structural — the foam seal fills the void and stops water but does not bond or reinstate concrete tensile strength. For cracks that are both wet and structural, the correct protocol is to inject PU first to stop water, allow the crack to dry, then inject low-viscosity epoxy for structural reinstatement. Confirm application rates and injection pressure limits from the current Sika Australia TDS.",
    technicalProperties: [
      "1-component hydrophilic PU — water-reactive — free foaming factor approximately 22× volume on contact with water",
      "Forms flexible closed-cell foam — accommodates minor crack movement after cure",
      "Suitable for wet and actively leaking cracks, construction joints, and honeycombed sections",
      "Injected at low pressure 0.2–0.5 MPa through surface ports — single-component injection pump",
      "Available nationally through Sika Australia — trade and contractor supply",
    ],
    limitations: [
      "NOT structural — PU foam does not restore concrete tensile strength — use epoxy rigid injection for structural crack reinstatement",
      "Hydrophilic foam may shrink over time if crack subsequently dries out — not suitable as a permanent seal in intermittently dry conditions",
      "Crack must be accessible for port installation — injection through surface ports only — blind or inaccessible cracks may not receive full injection",
      "Do not inject at pressures exceeding manufacturer recommendation — over-pressure can cause foam to bypass the crack and cause surface spalling",
    ],
    procurementSources: [
      { name: "Sika Australia — national trade and contractor supply", url: "https://aus.sika.com" },
      { name: "Bayset — national Sika distribution", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#15803d",
    name: "TODO: owner confirm — Fosroc Nitoflex PU is not listed on the current fosroc.com.au product range; current Fosroc AU PU injection products are Nitofill PU130 (hydrophobic, semi-flexible, 20 kg) and Nitofill PU150 (hydrophilic, flexible, 20 kg) — confirm correct product and update",
    descriptionLine: "TODO: owner confirm — Nitoflex PU not found on fosroc.com.au (June 2026); Fosroc AU current hydrophobic PU injection product is Nitofill PU130 (mixed with accelerator, expands up to 25×) — verify from current Fosroc AU TDS",
    productType: "2-component polyurethane flexible injection resin — elastic rubber cure — Fosroc / Parchem Australia",
    filterTags: ["Hydrophobic", "2-Component", "Dormant-Crack", "Flexible"],
    techChips: [
      { label: "TODO: owner confirm — components (Nitoflex PU not on AU range)", cls: "bg-emerald-100 text-emerald-800" },
      { label: "TODO: owner confirm — cure type", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: owner confirm — crack condition suitability", cls: "bg-green-50 text-green-700" },
      { label: "Not structural", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "TODO: owner confirm — Fosroc Nitoflex PU does not appear on the current fosroc.com.au product listing (June 2026). The current Fosroc Australia PU injection products are Nitofill PU130 (hydrophobic, semi-flexible, mixed with accelerator, expands up to 25×, 20 kg) for sealing with controlled expansion in dry or damp conditions, and Nitofill PU150 (hydrophilic, flexible, reacts with water, expands up to 25×, 20 kg) for wet and actively leaking cracks. All properties stated for Nitoflex PU (component count, cure mechanism, crack suitability) must be reviewed against the current Nitofill PU130 / PU150 TDS. Source: fosroc.com.au product listing (June 2026) — Nitoflex PU not found. Sources: https://www.fosroc.com.au/product/nitofill-pu130 and https://www.fosroc.com.au/product/nitofill-pu150",
    technicalProperties: [
      "TODO: owner confirm — Nitoflex PU not on current fosroc.com.au range; current AU hydrophobic PU injection product is Nitofill PU130",
      "TODO: owner confirm — Nitofill PU130 expands up to 25× (hydrophobic, mixed with accelerator) — confirm all other specs from current Fosroc AU TDS",
      "Accommodates minor crack movement after cure — confirm from current Fosroc AU TDS",
      "Lower volume uncertainty than foaming hydrophilic products — confirm from current Fosroc AU TDS",
      "Available nationally through Fosroc Australia and Parchem Construction Supplies (DuluxGroup)",
    ],
    limitations: [
      "Not suitable for actively flowing cracks with water under pressure — use hydrophilic PU first to stop flow",
      "Not structural — does not restore tensile bond across the crack plane — epoxy rigid injection required for structural re-joining",
      "TODO: owner confirm — component count and pump type required for current Nitofill PU130",
      "TODO: owner confirm — maximum crack width from current Fosroc AU Nitofill PU130 TDS",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — national distribution", url: "https://www.parchem.com.au" },
      { name: "Fosroc Australia — product information", url: "https://www.fosroc.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#dc2626",
    name: "TODO: owner confirm — Mapei Mapeject PU 25H / PU 25HD product names not confirmed on current mapei.com/au product listing; verify that these PU injection formulations are available in Australia and update product name if different",
    descriptionLine: "TODO: owner confirm — Mapeject PU 25H and PU 25HD not confirmed on mapei.com/au (June 2026); Mapei AU PU injection product availability requires direct confirmation — all specs below are unverified for the Australian market",
    productType: "1-component polyurethane injection resin — two formulations — Mapei Australia",
    filterTags: ["Hydrophilic", "Hydrophobic", "1-Component", "Water-Active", "Dormant-Crack", "Foaming", "Flexible"],
    techChips: [
      { label: "PU 25H — hydrophilic/foaming", cls: "bg-red-100 text-red-800" },
      { label: "PU 25HD — hydrophobic/rubber", cls: "bg-slate-100 text-slate-700" },
      { label: "1-component — low-pressure ports", cls: "bg-green-50 text-green-700" },
      { label: "Matched Mapei port system", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Mapei Mapeject PU is available in two 1-component formulations for different crack conditions. Mapeject PU 25H (hydrophilic) reacts with water to foam and seal actively leaking cracks — the same mechanism as Sika Injection-107; used for wet, active water ingress where speed of reaction and void filling are the priority. Mapeject PU 25HD (hydrophobic) cures to a flexible rubber regardless of water presence — similar to the 2-component flexible PU products but in a 1-component pump-compatible format. The hydrophobic variant gives a more controlled, homogeneous flexible seal without the volume uncertainty of foaming. Both are 1-component, injected at low pressure through surface ports. Mapeject PU is part of Mapei's complete crack injection system — matched ports, port adhesive (Mapegrout Rapido or Eporip Turbo), and injection equipment. Using matched system components reduces compatibility issues and simplifies procurement. Available nationally through Mapei Australia. Confirm formulation selection (25H vs 25HD) based on crack moisture condition from the Mapei TDS.",
    technicalProperties: [
      "Mapeject PU 25H — hydrophilic/foaming — reactive with water — wet and actively leaking cracks",
      "Mapeject PU 25HD — hydrophobic/rubber — uniform cure without foaming — damp or dry stable cracks",
      "Both formulations: 1-component — low-pressure surface port injection",
      "Part of Mapei complete system — matched ports, adhesive, and pumps available",
      "Mapei Australia — national trade supply",
    ],
    limitations: [
      "PU 25H hydrophilic variant not suitable for dry or partially dry cracks — insufficient water to activate the foaming reaction reliably",
      "PU 25HD hydrophobic variant requires dry or damp crack — not for actively flowing water without pre-treatment",
      "Neither formulation is structural — reinstatement of tensile capacity requires epoxy rigid injection",
      "Mapei ports and adhesive recommended for system compatibility — confirm with Mapei technical if using non-Mapei hardware",
    ],
    procurementSources: [
      { name: "Mapei Australia — national trade supply", url: "https://www.mapei.com/au" },
      { name: "Bayset — national Mapei distribution", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "DCP Chemprox / Generic",
    brandUrl: "https://www.dcpchemprox.com.au",
    accentColor: "#78716c",
    name: "Generic Hydrophilic PU Resin — Single-Component Water-Stop Injection",
    descriptionLine: "Generic 1-component hydrophilic PU — water-reactive expanding foam — available through DCP Chemprox, Parchem, Rawlplug — commonly used by specialist crack injection contractors",
    productType: "1-component hydrophilic polyurethane — water-reactive foam — specialist contractor supply",
    filterTags: ["Hydrophilic", "1-Component", "Water-Active", "Foaming", "Flexible"],
    techChips: [
      { label: "1-component hydrophilic PU", cls: "bg-stone-100 text-stone-700" },
      { label: "Specialist contractor supply", cls: "bg-slate-100 text-slate-700" },
      { label: "Confirm TDS before use", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Generic single-component hydrophilic polyurethane resins are available through specialist crack injection suppliers including DCP Chemprox, Parchem, and Rawlplug in Australia. These are broadly equivalent in mechanism to branded systems — single-component, water-reactive, expanding foam seal. They are commonly used by specialist contractors for water-stop injection in basement walls, retaining structures, and carpark decks where a performance specification is in place rather than a brand specification. Key procurement consideration: confirm the TDS provides expansion ratio, minimum tensile elongation, and shore hardness of the cured foam — these vary significantly between generic products and affect long-term seal durability. Always specify a minimum elongation of ≥100% and confirm the product is not brittle when dry. Specialist contractors often carry house brands validated to their injection equipment. Confirm cartridge size and thread pattern compatibility with injection pump before purchasing.",
    technicalProperties: [
      "1-component hydrophilic PU — water-reactive expanding foam — same mechanism as branded systems",
      "Available through DCP Chemprox, Parchem, Rawlplug, and specialist injection suppliers",
      "Broad equivalence to branded systems — confirm expansion ratio and elongation from TDS",
      "Common in specialist contractor use for basements, carparks, and retaining walls",
    ],
    limitations: [
      "Generic products vary in quality — always obtain TDS and confirm expansion ratio, elongation, and shelf life before purchasing",
      "Not structural — confirm scope with engineer if any structural function is expected from the injection",
      "Shelf life sensitive — 1-component PU resins must be stored sealed in dry conditions — opened cartridges skin at the tip if left between uses",
      "Confirm compatibility with injection equipment — cartridge sizes and thread patterns vary between suppliers",
    ],
    procurementSources: [
      { name: "DCP Chemprox — specialist injection supply", url: "https://www.dcpchemprox.com.au" },
      { name: "Parchem Construction Supplies — national distribution", url: "https://www.parchem.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Hydrophilic", label: "Hydrophilic" },
  { id: "Hydrophobic", label: "Hydrophobic" },
  { id: "1-Component", label: "1-Component" },
  { id: "2-Component", label: "2-Component" },
  { id: "Water-Active", label: "Water-active crack" },
  { id: "Dormant-Crack", label: "Dormant crack" },
  { id: "Foaming", label: "Foaming" },
  { id: "Flexible", label: "Flexible cure" },
];

const SYSTEM_COMPARISON = [
  { product: "Sika Injection-107 (foaming factor ~22×)", components: "1-component", mechanism: "Hydrophilic — foaming", crackCondition: "Wet / actively leaking", structural: "No", flexibility: "Flexible foam" },
  { product: "TODO: confirm AU product name (Nitoflex PU not on fosroc.com.au — try Nitofill PU130)", components: "TODO: confirm", mechanism: "TODO: confirm from AU TDS", crackCondition: "Dry / damp — stable", structural: "No", flexibility: "TODO: confirm" },
  { product: "TODO: confirm AU product name (Mapeject PU 25H not confirmed on mapei.com/au)", components: "1-component", mechanism: "Hydrophilic — foaming", crackCondition: "Wet / actively leaking", structural: "No", flexibility: "Flexible foam" },
  { product: "TODO: confirm AU product name (Mapeject PU 25HD not confirmed on mapei.com/au)", components: "1-component", mechanism: "Hydrophobic — uniform cure", crackCondition: "Damp — not flowing", structural: "No", flexibility: "Flexible rubber" },
  { product: "Generic hydrophilic PU", components: "1-component", mechanism: "Hydrophilic — foaming", crackCondition: "Wet / leaking", structural: "No", flexibility: "Flexible foam" },
];

const TECH_INFO = {
  typicalApplications: [
    "Active water ingress through cold joints and construction joints in basements, carparks, and retaining walls — emergency water-stop injection",
    "Sealing water-active cracks in concrete slab, wall, and beam elements where the crack is wet, running, or seeping",
    "Pre-sealing wet cracks before structural epoxy injection — PU injection stops the water flow, then epoxy is injected after drying for structural reinstatement",
    "Honeycombed sections and void leakage in structural concrete where water is passing through the element",
    "Long-term flexible sealing of slowly moving cracks where rigid epoxy injection would re-crack under thermal cycling",
  ],
  selectionCriteria: [
    "Actively wet or flowing crack → hydrophilic 1-component PU (Sika Injection-107, Mapeject PU 25H)",
    "Damp but stable crack without active water flow → hydrophobic 2-component PU (Fosroc Nitoflex PU) or Mapeject PU 25HD",
    "Volume uncertainty is a concern → hydrophobic variant for controlled, non-foaming fill",
    "1-component pump available only → select 1-component product (Sika, Mapei)",
    "Crack is wet AND structural → inject PU first to stop water, allow crack to dry, then inject epoxy for structural reinstatement",
    "Ongoing minor crack movement expected → elastic rubber cure product (Nitoflex PU, PU 25HD) preferred over foaming hydrophilic",
  ],
  limitations: [
    "PU injection is NOT structural — PU foam and rubber seals do not restore tensile capacity across the crack plane",
    "Hydrophilic foam may shrink over time as moisture content in the crack fluctuates — not suited to permanently dry or seasonally dry conditions",
    "Over-pressuring injection causes foam bypass and surface spalling — always use the lowest effective pressure",
    "Opened cartridges skin at the nozzle tip — store sealed between uses, purge nozzle before re-use",
    "PU resins contain isocyanates — PPE: nitrile gloves, safety glasses, adequate ventilation mandatory",
  ],
  standardsNotes: [
    "EN 1504-5 — Products and Systems for the Protection and Repair of Concrete Structures — injection products for crack sealing",
    "AS 3600 — Concrete Structures — structural engineer must determine whether PU injection alone meets the structural requirement or whether additional treatment is needed",
    "SafeWork Australia — isocyanates are a regulated hazardous substance — P3 respirator, nitrile gloves, and ventilation mandatory for enclosed space injection",
    "Manufacturer TDS — injection pressure, port spacing, and temperature range are all specified — confirm for each product before injecting",
  ],
  suitableDefects: [
    "Live and water-active cracks in basement walls, retaining walls, and below-grade slab elements",
    "Active water ingress through construction joints, cold joints, and shrinkage cracks",
    "Honeycombed sections in poured concrete walls where water is passing through the void",
    "Slowly moving cracks in slabs and walls where flexible sealing rather than structural reinstatement is the objective",
  ],
  typicalSubstrates: [
    "In-situ reinforced concrete — from positive (wet face) or negative (dry face) side",
    "Precast concrete elements with water-active joint cracks",
    "Basement walls, retaining walls, and subterranean carpark structures",
    "Concrete slab soffits and construction joints in carpark decks where water ingress is occurring",
  ],
};

export function InjectionResinsPUFlexibleIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">PU flexible injection vs epoxy rigid — choosing the right resin</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Polyurethane flexible injection resins are used to seal water-active (wet, leaking) cracks and to provide a flexible seal in cracks that are moving. PU resins react with moisture to foam and expand, filling the crack void and blocking water passage. Unlike epoxy rigid injection, PU resins do not reinstate tensile capacity across the crack — they seal without bonding.
        </p>
        {expanded && (
          <>
            <p>
              The most common selection error is applying PU flexible resin to a dormant structural crack expecting a structural repair. PU injection is correct for wet cracks, live (moving) cracks, or as a pre-treatment before epoxy injection. For a dry, dormant structural crack requiring tensile reinstatement — beam tension cracks, column flexural cracks — epoxy rigid injection is required.
            </p>
            <p>
              Where a crack is both wet and structural, the standard protocol is a two-stage approach: inject hydrophilic PU first to stop water flow and fill the crack with foam, wait for the PU to cure and the crack to dry, then inject low-viscosity epoxy (Sika Injection-451, Fosroc Concresive 1414) through a second port pass to achieve structural reinstatement across the now-dry crack faces. Confirm this protocol with the structural engineer on each specific project.
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

export function InjectionResinsPUFlexibleProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 products — PU flexible injection resins — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of PU flexible injection resins. Confirm all product selections against the current manufacturer TDS before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Components</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Cure mechanism</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Crack condition</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Structural?</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Flexibility</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.components}</td>
                  <td className="px-4 py-3 text-slate-600">{row.mechanism}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.crackCondition}</td>
                  <td className="px-4 py-3 text-slate-600">{row.structural}</td>
                  <td className="px-4 py-3 text-slate-600">{row.flexibility}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
