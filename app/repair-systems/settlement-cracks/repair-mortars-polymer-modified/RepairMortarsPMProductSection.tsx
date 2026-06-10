"use client";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, BookOpen, Layers, Ruler, SquareStack, FileText } from "lucide-react";
import { CollapsibleList, CollapsibleDescription, CollapsibleSources, CollapsibleCardDetails, TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";

type FilterTag = "Crack-Fill" | "Vertical-Apply" | "Rapid-Set" | "High-Strength" | "Concrete-Block" | "Foundation-Repair";

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
    fullLabel: "Sika Australia — SikaTop-121",
    brandUrl: "https://aus.sika.com",
    accentColor: "#0369a1",
    name: "Sika SikaTop-121 — TODO: owner confirm — SikaTop-121 does not appear on the Australian Sika website (aus.sika.com); the Australian Sika range uses MonoTop products for concrete repair — confirm whether SikaTop-121 is currently available and sold in Australia",
    descriptionLine: "TODO: owner confirm product availability — 2-component polymer-modified repair mortar — SikaTop-121 not found on aus.sika.com; Australian Sika concrete repair range appears to be MonoTop series",
    productType: "TODO: owner confirm — Two-component polymer-modified cementitious repair mortar — confirm product is available in Australia before publishing",
    filterTags: ["Crack-Fill", "Vertical-Apply", "High-Strength", "Foundation-Repair"],
    techChips: [
      { label: "2-component PM", cls: "bg-sky-100 text-sky-800" },
      { label: "> 30 MPa", cls: "bg-slate-100 text-slate-700" },
      { label: "Concrete only", cls: "bg-amber-100 text-amber-700" },
    ],
    systemDescription: "Sika SikaTop-121 is a two-component polymer-modified cementitious repair mortar for crack filling and surface repair in concrete elements affected by settlement cracking. Used in settlement crack repair specifically for concrete foundations, retaining walls, concrete block walls, and concrete frames — NOT for brick masonry, where lime-based mortars are required. The polymer emulsion component improves adhesion, reduces permeability, and increases flexibility compared to plain cementitious mortar. After the settlement crack has been structurally stitched (helical bars or epoxy dowels) and any water ingress has been stopped (PU injection), SikaTop-121 is used to fill the visible crack gap and restore a smooth surface. Applied by trowel or hand-pack in layers up to 25 mm per coat; thicker sections require form-and-pour. SikaTop-121 is suitable for vertical and overhead repair applications.",
    technicalProperties: [
      "Two-component polymer-modified mortar — cementitious binder + acrylic polymer",
      "Compressive strength > 30 MPa at 28 days",
      "Suitable for vertical and overhead application — anti-slump formulation",
      "Sika Australia — national direct and distributor supply",
    ],
    limitations: [
      "CONCRETE ONLY — not for use in brick, stone, or heritage masonry (use lime-based mortars for masonry)",
      "Do not apply to a crack that is still actively moving — repair mortar will re-crack",
      "Bond coat (SikaBond or equivalent) required on all concrete surfaces before mortar application",
      "Depth per coat limited to approximately 25 mm — build up in layers for deeper fills, or use form-and-pour for cracks > 50 mm wide",
    ],
    procurementSources: [
      { name: "Sika Australia", url: "https://aus.sika.com" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Ardex Australia — RA55",
    brandUrl: "https://www.ardex.com.au",
    accentColor: "#15803d",
    name: "Ardex RA55 — TODO: owner confirm — 'ARDEX RA55' not found on ardexaustralia.com; Australian ARDEX concrete repair mortars are RA 54, RA 56, A 45, and A 46 — confirm correct current Australian product name before publishing",
    descriptionLine: "TODO: owner confirm product name — 'ARDEX RA55' not found on ardexaustralia.com; confirm correct product from Australian ARDEX range (A 45, A 46, RA 54, RA 56) and update all specifications",
    productType: "TODO: owner confirm product name — Rapid-setting single-component polymer-modified cementitious mortar",
    filterTags: ["Crack-Fill", "Vertical-Apply", "Rapid-Set", "Foundation-Repair"],
    techChips: [
      { label: "Rapid set", cls: "bg-green-100 text-green-800" },
      { label: "Single component", cls: "bg-slate-100 text-slate-700" },
      { label: "> 25 MPa at 4 hrs", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription: "Ardex RA55 is a rapid-setting single-component polymer-modified repair mortar for concrete crack filling and patch repair in settlement damage scenarios where early return to service is required. Add water only — no separate polymer component to mix. Achieves > 25 MPa compressive strength within 4 hours, allowing earlier trafficking or structural loading than standard repair mortars. Used in settlement crack repair for concrete footpaths, driveways, and concrete elements where access must be restored quickly after the structural crack repair is completed. Also suitable for filling large gap cracks in concrete block walls and foundations. Ardex RA55 is applied by trowel or hand-pack in layers; bond agent required on prepared concrete surface.",
    technicalProperties: [
      "Single-component — water only addition — consistent mix quality",
      "Rapid strength gain: > 25 MPa compressive strength at 4 hours",
      "Polymer-modified — improved adhesion and reduced shrinkage vs plain cementitious",
      "Ardex Australia — national supply",
    ],
    limitations: [
      "CONCRETE ONLY — not for heritage brick masonry or sandstone",
      "Rapid set reduces working time — mix only as much as can be placed in 5–8 minutes at 20°C",
      "Bond agent required on prepared concrete surface before application",
      "Do not apply to cracks still experiencing movement — rapid-set mortar has low tensile strain capacity",
    ],
    procurementSources: [
      { name: "Ardex Australia", url: "https://www.ardex.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc Australia — Renderoc HB40 Plus",
    brandUrl: "https://www.fosroc.com.au",
    accentColor: "#be123c",
    name: "TODO: owner confirm — Fosroc Renderoc HS does not exist in the Australian Fosroc/Parchem range — confirm correct current product name",
    descriptionLine: "TODO: owner confirm — 'Renderoc HS' not found on fosroc.com.au; closest Australian Fosroc products are Renderoc HB40 (~45 MPa, EN1504-3 Class R3) and Renderoc HB40 Plus — confirm correct product before publishing",
    productType: "TODO: owner confirm product name — single-component high-strength cementitious repair mortar",
    filterTags: ["Crack-Fill", "Vertical-Apply", "High-Strength", "Concrete-Block", "Foundation-Repair"],
    techChips: [
      { label: "TODO: confirm product name", cls: "bg-amber-100 text-amber-800" },
      { label: "TODO: confirm strength — Renderoc HB40 ~45 MPa", cls: "bg-slate-100 text-slate-700" },
      { label: "Structural patch — confirm with Parchem", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription: "TODO: owner confirm — the product named 'Fosroc Renderoc HS' does not appear in the current Australian Fosroc/Parchem product range. The Australian Fosroc concrete repair mortar range includes Renderoc HB (28 MPa at 28 days, high-build vertical/overhead), Renderoc HB25, Renderoc HB40 (~45 MPa, EN1504-3 Class R3, vertical patches up to 40mm), and Renderoc HB40 Plus. None of these are called 'Renderoc HS'. The globally listed 'Renderoc HS' redirects to the Australian homepage (fosroc.com.au), suggesting it is not available in Australia. Owner must confirm the correct current Fosroc/Parchem product for high-strength concrete patch and settlement crack fill repair, and update this card with the correct product name, strength data, application thickness, and bond agent requirement.",
    technicalProperties: [
      "TODO: owner confirm product — Renderoc HB40 confirmed on fosroc.com.au: ~45 MPa at 28 days, EN1504-3 Class R3, vertical and overhead, 20 kg bag",
      "TODO: owner confirm — single-component pre-bagged — water only",
      "TODO: owner confirm bond agent requirement for selected product",
      "Fosroc — distributed nationally through Parchem Construction Supplies",
    ],
    limitations: [
      "CONCRETE ONLY — not for brick masonry, sandstone, or heritage masonry",
      "Bond agent required before application to existing concrete — confirm bond agent for selected product with Parchem technical",
      "TODO: owner confirm maximum layer thickness per coat for selected product",
      "Settlement must be confirmed dormant before mortar application",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies (Fosroc distributor)", url: "https://www.parchem.com.au" },
      { name: "Fosroc Australia", url: "https://www.fosroc.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia — Mapegrout Fast-Set",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#78716c",
    name: "Mapei Mapegrout Fast-Set — Rapid Repair Mortar for Concrete",
    descriptionLine: "Single-component rapid-setting fibre-reinforced repair mortar — concrete crack fill and structural patch — Mapei national supply",
    productType: "Single-component rapid-setting fibre-reinforced repair mortar",
    filterTags: ["Crack-Fill", "Vertical-Apply", "Rapid-Set", "High-Strength", "Foundation-Repair"],
    techChips: [
      { label: "Rapid-set + fibre", cls: "bg-stone-200 text-stone-800" },
      { label: "Single component", cls: "bg-slate-100 text-slate-700" },
      { label: "Concrete only", cls: "bg-amber-100 text-amber-700" },
    ],
    systemDescription: "Mapei Mapegrout Fast-Set is a single-component rapid-setting fibre-reinforced repair mortar for filling settlement cracks in concrete elements. The polypropylene fibre reinforcement reduces plastic shrinkage cracking during cure — important in thin sections and vertical applications. Rapid strength gain allows return to service within hours. Used in settlement crack repair for concrete foundations, retaining walls, and pathways where the structural repair (stitching, injection) is complete and the visible gap or spalled surface needs to be filled and reinstated. Mapei provides national technical support and has a broad Australian distribution network through building and specialist trade suppliers.",
    technicalProperties: [
      "Single-component — water only addition — polypropylene fibre reinforcement",
      "Rapid strength: > 20 MPa at 3 hours, > 40 MPa at 28 days",
      "Reduced plastic shrinkage cracking from fibre reinforcement",
      "Mapei Australia — national supply through trade distributors",
    ],
    limitations: [
      "CONCRETE ONLY — not for brick masonry or other masonry substrates",
      "Rapid set reduces working time — plan application in manageable batches",
      "Bond coat required on prepared concrete substrate before application",
      "Fibre reinforcement is anti-shrinkage only — does not replace structural reinforcement or stitching in cracked sections",
    ],
    procurementSources: [
      { name: "Mapei Australia", url: "https://www.mapei.com/au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
];

const FILTER_DEFS: { tag: FilterTag; label: string }[] = [
  { tag: "Crack-Fill", label: "Crack fill / gap fill" },
  { tag: "Vertical-Apply", label: "Vertical / overhead apply" },
  { tag: "Rapid-Set", label: "Rapid-setting" },
  { tag: "High-Strength", label: "High-strength (> 35 MPa)" },
  { tag: "Concrete-Block", label: "Concrete block" },
  { tag: "Foundation-Repair", label: "Foundation repair" },
];

const TECH_INFO = {
  typicalApplications: [
    "Filling visible crack gaps in concrete foundations after structural stitching and epoxy injection",
    "Patch repair of spalled and damaged concrete surfaces from settlement movement",
    "Crack fill in concrete retaining walls after settlement crack stitching",
    "Surface reinstatement of concrete block walls after epoxy dowel installation",
    "Structural patch repair of concrete elements post-underpinning where concrete damage has occurred",
  ],
  selectionCriteria: [
    "These products are for CONCRETE and CONCRETE BLOCK substrates ONLY — for brick masonry, use lime-based mortars",
    "Structural filling after stitching: use high-strength products (TODO: confirm Fosroc AU product name — Renderoc HS not in AU range; Mapei Mapegrout Fast-Set confirmed) for structural elements",
    "Early return to service: use rapid-setting products (TODO: confirm ARDEX AU product name — RA55 not confirmed on ardexaustralia.com; Mapei Mapegrout Fast-Set confirmed) where traffic or loading must resume quickly",
    "Bond coat required for all products — never apply PM mortar to an un-primed concrete surface",
    "Deep fills (> 50 mm) require form-and-pour or build-up in multiple layers — no single-coat mortar should exceed 25 mm per lift without reinforcement",
  ],
  whenNotToUse: [
    "Never use polymer-modified cementitious mortars in brick, stone, or heritage masonry — they are harder and less permeable than the masonry and cause brick face damage",
    "Do not apply to a crack that is still actively moving — PM mortars have low tensile strain capacity and will re-crack",
    "Do not use as the primary structural repair — PM mortar fills the crack gap after structural reinstatement; it does not carry structural load across the crack",
    "Do not apply without bond coat to existing concrete — PM mortar will debond from an unprimed surface",
    "Not suitable for continuously water-bearing cracks — address water ingress with PU injection before mortar application",
  ],
  standardsNotes: [
    "AS 3600 — Concrete Structures — repair mortar requirements for structural concrete",
    "ICRI 310.1R — Guide for Surface Preparation for the Repair of Deteriorated Concrete",
    "Concrete surface preparation to minimum CSP 3 (ICRI scale) before repair mortar application",
    "Bond coat application strictly per manufacturer TDS — pot life and open time are critical",
    "Engineer confirmation of structural adequacy of repaired section required for load-bearing elements",
  ],
  suitableDefects: [
    "Settlement cracks in concrete foundations — gap fill after stitching",
    "Spalled and cracked concrete retaining walls from differential settlement",
    "Concrete block wall surface reinstatement after epoxy dowel installation",
    "Ground slab crack fill at settlement crack locations (surface fill only — not structural)",
    "Concrete footing surface repair after settlement movement and crack treatment",
  ],
  typicalSubstrates: [
    "Reinforced and unreinforced concrete — foundations, retaining walls, structural frames",
    "Concrete masonry block — dense solid block (not hollow block without containment)",
    "Pre-cast concrete elements — panels, beams, columns with settlement damage",
    "In-situ concrete slabs and ground slabs",
    "Concrete surfaces in below-grade applications (basement walls, pits) — where water ingress has been treated",
  ],
};

const SYSTEM_COMPARISON = [
  { product: "TODO: confirm — SikaTop-121 not found on aus.sika.com; confirm AU product name", components: "2-component", strength: "TODO: confirm", set: "Standard", keyFeature: "PM with polymer liquid component — confirm AU product" },
  { product: "TODO: owner confirm — 'ARDEX RA55' not found on ardexaustralia.com; confirm correct AU product from RA 54, RA 56, A 45, A 46 range", components: "1-component", strength: "TODO: confirm for selected product", set: "Rapid", keyFeature: "TODO: confirm — early return to service claimed but product name unverified" },
  { product: "TODO: owner confirm — Renderoc HS not in AU range — confirm correct Fosroc AU product", components: "1-component", strength: "TODO: confirm — HB40 ~45 MPa at 28d", set: "Standard", keyFeature: "High-strength structural patch — confirm product name" },
  { product: "Mapei Mapegrout Fast-Set", components: "1-component", strength: "> 40 MPa at 28d", set: "Rapid", keyFeature: "Rapid + fibre reinforcement" },
];

export function RepairMortarsPMIntroSection() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-start gap-3 text-left">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700"><BookOpen size={16} /></div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-extrabold text-sky-950">PM repair mortars in settlement crack repair — concrete only, not for masonry</h2>
            <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
          </div>
          <p className="mt-1 text-sm text-slate-500">When PM mortars are used, bond coat requirements, and the masonry compatibility rule</p>
        </div>
      </button>
      {open && (
        <div className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm leading-7 text-slate-600">
          <p>Polymer-modified (PM) cementitious repair mortars are used in settlement crack repair to fill visible crack gaps and patch spalled or damaged surfaces in concrete elements — foundations, retaining walls, concrete block walls, and concrete frames. They are applied after the structural repair sequence is complete: settlement dormant, structural stitching done, water ingress stopped with PU injection.</p>
          <p>PM mortars are ONLY for concrete and concrete block substrates. For brick masonry, stone, and heritage masonry, PM mortars are harder and less permeable than the masonry substrate and must not be used — they cause brick face spalling and salt crystallisation damage. Use lime-based repointing mortars (NHL grades) for all masonry joint work.</p>
        </div>
      )}
    </div>
  );
}

export function RepairMortarsPMProductSection() {
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const [accordionOpen, setAccordionOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (tag: FilterTag) =>
    setActiveFilters((prev) => { const n = new Set(prev); n.has(tag) ? n.delete(tag) : n.add(tag); return n; });

  const filtered = activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter((p) => p.filterTags.some((t) => activeFilters.has(t)));

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir === "left" ? -420 : 420, behavior: "smooth" });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Filter:</span>
        {FILTER_DEFS.map(({ tag, label }) => (
          <button key={tag} onClick={() => toggleFilter(tag)} className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${activeFilters.has(tag) ? "border-red-700 bg-red-700 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-sky-400"}`}>{label}</button>
        ))}
        {activeFilters.size > 0 && <button onClick={() => setActiveFilters(new Set())} className="text-xs font-bold text-red-700 underline">Clear</button>}
      </div>

      <div className="relative">
        <button onClick={() => scroll("left")} className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm hover:bg-slate-50"><ChevronLeft size={16} /></button>
        <div ref={scrollRef} className="flex gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none]">
          {filtered.map((p) => (
            <div key={p.name} className="w-[380px] shrink-0 rounded-2xl border border-slate-200 bg-white overflow-hidden" style={{ borderTop: `4px solid ${p.accentColor}` }}>
              <div className="p-5">
                <a href={p.brandUrl} target="_blank" rel="noopener noreferrer" className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-sky-700">{p.fullLabel} ↗</a>
                {p.tdsUrl && <a href={p.tdsUrl} target="_blank" rel="noopener noreferrer" className="mb-2 flex items-center gap-1 text-[10px] font-semibold text-sky-600 hover:text-sky-800">TDS ↗</a>}
                <h3 className="text-sm font-extrabold leading-snug text-sky-950">{p.name}</h3>
                <p className="mt-1 text-xs text-slate-500">{p.descriptionLine}</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{p.productType}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.techChips.map((c) => <span key={c.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${c.cls}`}>{c.label}</span>)}
                </div>
                <CollapsibleDescription text={p.systemDescription} />
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <CollapsibleCardDetails
                    text=""
                    chips={p.filterTags.map((t) => ({ label: t.replace(/-/g, " "), cls: "bg-sky-50 text-sky-700" }))}
                  />
                </div>
                <div className="mt-3">
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">Technical properties</p>
                  <CollapsibleList items={p.technicalProperties} icon="check" limit={3} />
                </div>
                <div className="mt-3">
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">Limitations</p>
                  <CollapsibleList items={p.limitations} icon="x" limit={3} />
                </div>
                <div className="mt-3">
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">Procurement</p>
                  <CollapsibleSources sources={p.procurementSources} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => scroll("right")} className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm hover:bg-slate-50"><ChevronRight size={16} /></button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white">
        <button onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sky-700"><Layers size={16} /></div>
            <span className="text-sm font-extrabold text-sky-950">PM repair mortar technical reference</span>
          </div>
          <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform ${accordionOpen ? "rotate-180" : ""}`} />
        </button>
        {accordionOpen && (
          <div className="border-t border-slate-100 px-6 pb-6 pt-5">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <TechCard icon={<Layers size={14} />} title="Typical applications" items={TECH_INFO.typicalApplications} style="bullet" />
              <TechCard icon={<CheckCircle size={14} />} title="Selection criteria" items={TECH_INFO.selectionCriteria} style="check" />
              <TechCard icon={<AlertTriangle size={14} />} title="When NOT to use" items={TECH_INFO.whenNotToUse} style="warn" />
              <TechCard icon={<FileText size={14} />} title="Standards & notes" items={TECH_INFO.standardsNotes} style="bullet" />
              <TechCard icon={<SquareStack size={14} />} title="Suitable defects" items={TECH_INFO.suitableDefects} style="bullet" />
              <TechCard icon={<Ruler size={14} />} title="Typical substrates" items={TECH_INFO.typicalSubstrates} style="bullet" />
            </div>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-sm font-extrabold text-sky-950">PM repair mortar comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {["Product", "Components", "Strength", "Set type", "Key feature"].map((h) => (
                  <th key={h} className="px-3 py-2.5 text-left font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SYSTEM_COMPARISON.map((row) => (
                <tr key={row.product} className="hover:bg-slate-50">
                  <td className="px-3 py-2.5 font-semibold text-sky-950">{row.product}</td>
                  <td className="px-3 py-2.5 text-slate-600">{row.components}</td>
                  <td className="px-3 py-2.5 text-slate-600">{row.strength}</td>
                  <td className="px-3 py-2.5 text-slate-600">{row.set}</td>
                  <td className="px-3 py-2.5 text-slate-600">{row.keyFeature}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
