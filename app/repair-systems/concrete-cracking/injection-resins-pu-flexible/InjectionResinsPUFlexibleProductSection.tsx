"use client";

import { useState, useRef } from "react";
import { Layers, SquareStack, Ruler, ExternalLink, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, FileText, BookOpen } from "lucide-react";
import { CollapsibleList, CollapsibleDescription, CollapsibleSources, CollapsibleCardDetails, TechCard, CheckCircle, AlertTriangle, DataNote } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { INJECTION_PU_CARDS } from "./injectionPUData";

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
  dataNote?: string;
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#0369a1",
    name: "Sika Injection-111 + Injection-111C — Single-Component Hydrophobic PU Foam Injection Resin",
    descriptionLine: "1-component hydrophobic MDI water-reactive PU foam (+ Injection-111C catalyst) — wet and actively leaking cracks, joints, and honeycombs — fast-reacting closed-cell foam water-stop",
    productType: "1-component hydrophobic polyurethane foam injection resin (+ catalyst) — water-reactive — Sika Australia",
    filterTags: ["Hydrophobic", "1-Component", "Water-Active", "Foaming", "Flexible"],
    techChips: [
      { label: "Hydrophobic MDI — water-reactive", cls: "bg-sky-100 text-sky-800" },
      { label: "+ Injection-111C catalyst", cls: "bg-slate-100 text-slate-700" },
      { label: "1-component pump", cls: "bg-green-50 text-green-700" },
      { label: "Not structural", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sika Injection-111 is a single-component, low-viscosity, hydrophobic MDI-based polyurethane injection resin that reacts with water to form an expanding, closed-cell foam for sealing water-active (wet or actively leaking) cracks, construction joints, and voids in concrete. On contact with water it foams and expands to block water passage; being hydrophobic, the cured closed-cell foam is more dimensionally stable than a hydrophilic foam when the crack subsequently dries. The reaction rate is tuned by adding Sika Injection-111C, the matched accelerator/catalyst — more catalyst gives a faster reaction and foam rise, useful where there is heavy flowing water and a fast set is needed. Injected through low-pressure surface or drilled packers using a single-component PU injection pump. Injection-111 is part of the current Sika Australia injection range. It is NOT structural — the foam seal fills the void and stops water but does not bond or reinstate concrete tensile strength. For cracks that are both wet and structural, the correct protocol is to inject PU first to stop water, allow the crack to dry, then inject low-viscosity epoxy for structural reinstatement. TODO: confirm free-rise foaming/expansion factor, catalyst dosage range, viscosity, and injection pressure limits from the current Sika Australia Injection-111 / Injection-111C TDS before publishing.",
    technicalProperties: [
      "1-component hydrophobic MDI PU — water-reactive — forms an expanding closed-cell foam on contact with water",
      "Reaction speed and foam rise adjusted by adding Sika Injection-111C catalyst — more catalyst = faster set (TODO: confirm dosage range from Sika AU TDS)",
      "Suitable for wet and actively leaking cracks, construction joints, and honeycombed sections",
      "Injected at low pressure through surface or drilled packers — single-component injection pump",
      "Available nationally through Sika Australia — trade and contractor supply",
      "TODO: confirm free-rise expansion factor and viscosity from the current Sika Australia Injection-111 TDS",
    ],
    limitations: [
      "NOT structural — PU foam does not restore concrete tensile strength — use epoxy rigid injection for structural crack reinstatement",
      "Hydrophobic foam is more dimensionally stable on drying than hydrophilic foam, but is not a substitute for a permanent rigid seal where the crack is dormant and dry — confirm suitability from the TDS",
      "Crack must be accessible for packer installation — blind or inaccessible cracks may not receive full injection",
      "Do not inject at pressures exceeding manufacturer recommendation — over-pressure can cause foam to bypass the crack and cause surface spalling",
      "Two-part procurement — order both Injection-111 resin and Injection-111C catalyst; confirm catalyst is on hand before mobilising",
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
    name: "Fosroc Nitofill PU130 — Hydrophobic Semi-Flexible PU Injection Resin",
    descriptionLine: "Hydrophobic semi-flexible PU injection resin — mixed with accelerator — expands up to 25× — dry and damp stable cracks — 20 kg",
    productType: "Hydrophobic polyurethane flexible injection resin — elastic rubber cure — Fosroc / Parchem Australia",
    dataNote: "Owner to confirm — Fosroc Nitoflex PU (the product these specs were originally written for) is not found on the current fosroc.com.au range; the current Fosroc Australia PU injection products are Nitofill PU130 (hydrophobic, semi-flexible, expands up to 25×, 20 kg) and Nitofill PU150 (hydrophilic, flexible, expands up to 25×, 20 kg). Confirm the correct product, component count, pump type, and maximum crack width against the current Fosroc Australia TDS before publishing.",
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
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#be123c",
    name: "Sika Injection-111 + Injection-111C",
    descriptionLine: "1-component hydrophobic water-reactive PU foam (with catalyst) — confirm current specification and Australian availability with Sika technical before specifying",
    productType: "1-component hydrophobic water-reactive PU foam (with catalyst)",
    filterTags: ["Hydrophobic", "1-Component", "Water-Active", "Foaming", "Flexible"],
    techChips: [
      { label: "1-component hydrophobic water-", cls: "bg-slate-100 text-slate-700" },
      { label: "Sika — AU supply", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: confirm specs from TDS", cls: "bg-rose-100 text-rose-800" },
    ],
    systemDescription:
      "Sika Injection-111 + Injection-111C is a 1-component hydrophobic water-reactive PU foam (with catalyst). Water-reactive hydrophobic PU foam (with Injection-111C catalyst) for sealing actively leaking cracks and water ingress. Confirm the current product data sheet, key performance values (such as strength, coverage and application limits) and Australian availability with Sika technical before specifying. TODO: verify specific performance figures from the current Sika TDS.",
    technicalProperties: [
      "1-component hydrophobic water-reactive PU foam (with catalyst)",
      "Water-reactive hydrophobic PU foam (with Injection-111C catalyst) for sealing actively leaking cracks and water ingress.",
      "Confirm key performance values (strength / coverage / application) from the current Sika TDS — TODO",
      "Australian-market product — confirm current availability and pack sizes with Sika",
    ],
    limitations: [
      "Confirm current product formulation and system suitability with Sika technical before specifying",
      "TODO: confirm application limits, substrate preparation and temperature range from the current TDS",
      "Verify current Australian availability and pack sizes with Sika",
    ],
    procurementSources: [
      { name: "Sika — Australian trade supply", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#1d4ed8",
    name: "Mapei Resfoam 1KM",
    descriptionLine: "1-component water-reactive foaming PU injection resin — confirm current specification and Australian availability with Mapei technical before specifying",
    productType: "1-component water-reactive foaming PU injection resin",
    filterTags: ["Hydrophilic", "1-Component", "Water-Active", "Foaming", "Flexible"],
    techChips: [
      { label: "1-component water-reactive foa", cls: "bg-slate-100 text-slate-700" },
      { label: "Mapei — AU supply", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: confirm specs from TDS", cls: "bg-rose-100 text-rose-800" },
    ],
    systemDescription:
      "Mapei Resfoam 1KM is a 1-component water-reactive foaming PU injection resin. Water-reactive foaming PU resin for rapid water cut-off in wet, actively leaking cracks. Confirm the current product data sheet, key performance values (such as strength, coverage and application limits) and Australian availability with Mapei technical before specifying. TODO: verify specific performance figures from the current Mapei TDS.",
    technicalProperties: [
      "1-component water-reactive foaming PU injection resin",
      "Water-reactive foaming PU resin for rapid water cut-off in wet, actively leaking cracks.",
      "Confirm key performance values (strength / coverage / application) from the current Mapei TDS — TODO",
      "Australian-market product — confirm current availability and pack sizes with Mapei",
    ],
    limitations: [
      "Confirm current product formulation and system suitability with Mapei technical before specifying",
      "TODO: confirm application limits, substrate preparation and temperature range from the current TDS",
      "Verify current Australian availability and pack sizes with Mapei",
    ],
    procurementSources: [
      { name: "Mapei — Australian trade supply", url: "https://www.mapei.com/au" },
    ],
  }


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

const DESIGN_CRITERIA = "Hydrophilic (water-reactive, swells/foams) vs hydrophobic (closed-cell, water-resistant) PU — for active water-bearing/wet cracks; viscosity (mPa·s) vs crack width & penetration; minimum injectable crack width (mm); reaction/expansion ratio & foaming behaviour; gel & full-cure time; flexible/elastic cured properties (elongation %) for moving joints; damp/water tolerance during injection; injection pressure & packer spacing; chemical/alkali resistance; shrinkage on cure; suited to flexible/wet seepage NOT load-transfer (use epoxy for structural); temperature range; potable-water contact (AS/NZS 4020 if applicable)";

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

      <AutoProductReference products={PRODUCTS} cards={INJECTION_PU_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Flexible PU injection resins" />
    </>
  );
}
