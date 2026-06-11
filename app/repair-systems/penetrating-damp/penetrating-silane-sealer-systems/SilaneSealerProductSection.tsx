"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Silane"
  | "Solvent-based"
  | "Water-based"
  | "Penetrating"
  | "Concrete"
  | "Masonry"
  | "Brick"
  | "Sandstone"
  | "Deep-penetration"
  | "Colourless"
  | "Below-DPC"
  | "External"
  | "1C";

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
    fullLabel: "Wacker Chemie Australia",
    brandUrl: "https://www.wacker.com/en/au",
    accentColor: "#003d7a",
    name: "Wacker Silres BS 290 — Solvent-Based Silane/Siloxane Penetrating Water Repellent",
    descriptionLine: "TODO: owner confirm — card previously listed 'Wacker Silres BS 45' but BS 45 is a water-dilutable paint binder emulsion, not a penetrating masonry sealer. Wacker's penetrating sealer range is the BS 290 / BS 1001 series. Verify the correct AU Wacker penetrating sealer product name with Wacker Chemie Australia before publishing.",
    productType: "Penetrating silane/siloxane water repellent — solvent-based",
    filterTags: ["Silane", "Solvent-based", "Penetrating", "Concrete", "Masonry", "Brick", "Deep-penetration", "Colourless", "External", "1C"],
    techChips: [
      { label: "TODO: confirm product name", cls: "bg-red-100 text-red-800" },
      { label: "Solvent-based", cls: "bg-amber-50 text-amber-700" },
      { label: "Penetrating sealer", cls: "bg-green-50 text-green-700" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "TODO: owner confirm — this card previously listed Wacker Silres BS 45, described as an 'oligomeric isobutyltriethoxysilane solvent-based silane sealer'. However, Wacker Silres BS 45 is a water-dilutable solventless emulsion binder used in silicone resin paints and plasters — it is NOT a penetrating masonry sealer. The correct Wacker penetrating sealer products for concrete and masonry hydrophobisation are from the SILRES BS 290 and BS 1001 series. SILRES BS 290 is a solventless silane/siloxane concentrate and BS 1001 is a water-thinnable silane/siloxane emulsion. The correct product name and specification for the Australian market must be confirmed with Wacker Chemie Australia before this card can be published.",
    technicalProperties: [
      "TODO: owner confirm — all technical claims for this card must be reverified with the correct Wacker penetrating sealer product (BS 290 series or as confirmed by Wacker AU)",
      "Penetrating silane/siloxane — chemically bonds within substrate pores — cannot peel or flake",
      "Completely colourless — no visible surface film — does not change substrate appearance",
      "Vapour-permeable — the substrate continues to breathe after treatment",
      "Chemically bonds within substrate pores — provides hydrophobic protection against rain-driven moisture",
      "Reduces chloride ion ingress — relevant for reinforced concrete elements in marine or carbonation-affected environments",
    ],
    limitations: [
      "TODO: owner confirm — all technical claims must be reverified once the correct Wacker AU product is confirmed",
      "Substrate must be clean, dry and free of laitance, oils, coatings or previous sealers before application",
      "Not suitable for substrates with active water ingress or positive-side hydrostatic pressure",
      "Not a waterproofing membrane — provides water repellency only — not suitable as the sole measure for severe water ingress",
      "Re-treatment interval depends on exposure — confirm expected service life with Wacker Australia",
      "Confirm current product specification, application rate and technical support with Wacker Chemie Australia before specifying",
    ],
    procurementSources: [
      { name: "Wacker Chemie Australia — direct trade supply — contact for current pricing", url: "https://www.wacker.com/en/au" },
      { name: "Specialist concrete repair and protection suppliers — confirm current availability", url: "https://www.wacker.com/en/au" },
    ],
  },
  {
    fullLabel: "Remmers Australia",
    brandUrl: "https://www.remmers.com.au",
    accentColor: "#1a5276",
    name: "Remmers Funcosil SL",
    descriptionLine: "Solvent-based oligomeric silane — deep-penetrating facade and masonry water repellent — Remmers WTA-referenced system",
    productType: "Penetrating silane sealer — solvent-based",
    filterTags: ["Silane", "Solvent-based", "Penetrating", "Concrete", "Masonry", "Brick", "Sandstone", "Deep-penetration", "Colourless", "External", "1C"],
    techChips: [
      { label: "Oligomeric silane", cls: "bg-sky-100 text-sky-800" },
      { label: "WTA-referenced", cls: "bg-amber-50 text-amber-700" },
      { label: "Facade & masonry", cls: "bg-green-50 text-green-700" },
      { label: "Colourless", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Remmers Funcosil SL is a solvent-based oligomeric silane penetrating sealer from the Remmers Funcosil range — one of the most established facade and masonry protection product lines in the Australian remedial building market. Funcosil SL penetrates deeply into the pore structure of masonry and concrete substrates and reacts in place to form a chemically bonded hydrophobic lining within the pores, significantly reducing water absorption without forming a surface film.\n\nThe Funcosil SL is part of Remmers' WTA-referenced penetrating damp and facade protection system and is commonly specified for external masonry facades, brick veneer panels, concrete elements and masonry walls affected by penetrating damp where the source of moisture is rain-driven ingress through the pore structure and mortar joints. Remmers Australia provides technical documentation, application support and system warranties through their Australian representative network.\n\nConfirm the current Funcosil SL product specification, application rate for the specific substrate, and system documentation with Remmers Australia before specifying. The Funcosil range includes multiple product variants — confirm the correct product for the specific substrate porosity and exposure condition.",
    technicalProperties: [
      "Solvent-based oligomeric silane/siloxane blend with ~7% active ingredient by mass — deep penetration into masonry — reduces water absorption without forming a surface film",
      "Remmers Funcosil system — documented in Remmers facade protection system literature; TODO: owner confirm — 'WTA-referenced' claim could not be confirmed from live sources. Verify with Remmers Australia before publishing.",
      "Chemically bonds within the substrate pore structure — permanent hydrophobic treatment — cannot peel, flake or delaminate",
      "Colourless and vapour-permeable — no change to substrate appearance — substrate continues to breathe after treatment",
      "Suitable for brick, sandstone, calcium silicate, concrete block and dense concrete — coverage 0.2–1.5 L/m² depending on substrate porosity; confirm specific substrate suitability with Remmers technical",
      "Remmers Australia technical support — national representative network — system documentation available",
    ],
    limitations: [
      "Substrate must be thoroughly dry before application — wet or damp substrates block silane penetration",
      "Solvent-based — requires PPE, adequate ventilation and appropriate waste disposal — check current SDS before specifying for occupied or enclosed sites",
      "Not suitable for substrates with active water ingress under hydrostatic pressure — penetrating sealer is not a waterproofing system",
      "Algae, lichen, moss or biological growth must be removed and treated before application — contamination blocks silane penetration",
      "Confirm the correct Funcosil product variant for the specific substrate and exposure — Funcosil SL vs SL Concentrate vs other variants",
      "Confirm current product specification, application rate, system documentation and technical support with Remmers Australia before specifying",
    ],
    procurementSources: [
      { name: "Remmers Australia — trade supply — contact for current pricing", url: "https://www.remmers.com.au" },
    ],
  },
  {
    fullLabel: "Evonik Australia",
    brandUrl: "https://www.evonik.com/en/country/australia",
    accentColor: "#6a1fa0",
    name: "Protectosil BHN",
    descriptionLine: "n-octyltriethoxysilane — penetrating silane sealer for concrete and masonry — widely specified for chloride barrier and penetrating damp protection",
    productType: "Penetrating silane sealer — solvent-based",
    filterTags: ["Silane", "Solvent-based", "Penetrating", "Concrete", "Masonry", "Deep-penetration", "Colourless", "Below-DPC", "External", "1C"],
    techChips: [
      { label: "n-Octylsilane", cls: "bg-sky-100 text-sky-800" },
      { label: "Chloride barrier", cls: "bg-red-50 text-red-700" },
      { label: "Concrete & masonry", cls: "bg-green-50 text-green-700" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Protectosil BHN by Evonik (formerly Degussa) is an n-octyltriethoxysilane penetrating sealer used widely in Australia and globally for protection of concrete and masonry against water ingress and chloride ion penetration. Protectosil BHN is one of the benchmark products in the penetrating silane sealer category and is referenced in numerous Australian concrete protection specifications for infrastructure, marine structures, and residential and commercial masonry facades.\n\nThe n-octylsilane chemistry provides deep penetration into concrete and masonry pores. After reaction with ambient moisture and substrate alkalinity, the product creates a durable hydrophobic lining throughout the penetration depth. The treatment is colourless and does not form a surface film — the concrete or masonry appearance is essentially unchanged and the substrate remains vapour-permeable.\n\nIn remedial building applications, Protectosil BHN is specified to reduce penetrating damp through concrete elements, masonry panels and concrete block construction. The product is also used as a chloride barrier on concrete structures in marine or de-icing salt environments where carbonation-induced corrosion is a concern.\n\nConfirm current product availability through Evonik Australia and confirm the correct Protectosil product specification (BHN vs CREME vs other variants) for the specific application before specifying.",
    technicalProperties: [
      "n-Octyltriethoxysilane — monomeric silane — good penetration into open-pore concrete and masonry substrates",
      "Effective chloride barrier — reduces chloride ion ingress into reinforced concrete — extends service life in marine and aggressive environments",
      "Colourless — no surface film — substrate appearance unchanged after treatment",
      "Vapour-permeable — substrate continues to breathe — moisture vapour transmission not blocked",
      "Broad track record in Australian concrete protection specification — infrastructure, marine, residential and commercial masonry",
    ],
    limitations: [
      "Substrate must be clean, dry and free of surface contamination — confirm substrate preparation requirements with Evonik technical",
      "Not suitable for dense polished or sealed concrete — requires open pore structure for penetration",
      "Not a waterproofing system — does not resist hydrostatic water pressure — supplement with waterproofing where pressure water ingress is present",
      "Service life in aggressive exposure conditions may require re-treatment — confirm expected service life with Evonik Australia for the specific exposure",
      "Confirm that Protectosil BHN is the correct variant for the specific substrate and application — Evonik supplies multiple Protectosil products",
      "Confirm current product specification, Australian availability and technical support with Evonik Australia before specifying",
    ],
    procurementSources: [
      { name: "Evonik Australia — contact for current distribution and pricing", url: "https://www.evonik.com/en/country/australia" },
      { name: "Specialist concrete protection suppliers — confirm current stocking of Protectosil BHN", url: "https://www.evonik.com/en/country/australia" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Silane", label: "Silane" },
  { id: "Solvent-based", label: "Solvent-based" },
  { id: "Water-based", label: "Water-based" },
  { id: "Penetrating", label: "Penetrating" },
  { id: "Concrete", label: "Concrete" },
  { id: "Masonry", label: "Masonry" },
  { id: "Brick", label: "Brick" },
  { id: "Sandstone", label: "Sandstone" },
  { id: "Deep-penetration", label: "Deep penetration" },
  { id: "Colourless", label: "Colourless" },
  { id: "Below-DPC", label: "Below DPC" },
  { id: "External", label: "External" },
];

const BRAND_EQUIV: { system: string; wacker: string; remmers: string; evonik: string }[] = [
  { system: "Silane sealer — concrete and dense masonry", wacker: "TODO: confirm (BS 290 series?)", remmers: "Funcosil SL", evonik: "Protectosil BHN" },
  { system: "Silane sealer — brick and sandstone masonry", wacker: "TODO: confirm (BS 290 series?)", remmers: "Funcosil SL", evonik: "Protectosil BHN" },
];

const TECH_INFO = {
  typicalApplications: [
    "External masonry facades with penetrating damp — brick veneer, concrete block and solid masonry wall panels in Australian Class 2 strata buildings",
    "Concrete wall panels, columns and beams below and at DPC level where moisture ingress through the concrete fabric is occurring",
    "Concrete elements in marine or coastal environments — chloride barrier to reduce chloride-induced reinforcement corrosion",
    "Sandstone, calcium silicate brick and heritage masonry facades where surface film-forming coatings are inappropriate",
    "Masonry facades with mortar joint deterioration allowing rain penetration — applied in conjunction with mortar joint repointing",
  ],
  selectionCriteria: [
    "Confirm that penetrating damp is the correct diagnosis — rule out membrane failure, joint failure, flashing failure and surface crack ingress before specifying a penetrating sealer",
    "Silane sealers are most effective on open-pore substrates — confirm substrate porosity before specifying — dense concrete and engineering brick may achieve better results with silane/siloxane cream products",
    "Solvent-based silane provides deeper penetration than water-based formulations — preferred for concrete and dense masonry",
    "Substrate must be completely dry for a minimum period before application — confirm minimum dry period with manufacturer for the specific substrate and climate",
    "Silane sealers do not address structural cracks, failed mortar joints, or membrane failure — confirm all other moisture pathways are addressed before applying the sealer",
  ],
  limitations: [
    "Penetrating silane sealers treat water repellency at the substrate pore level — they do not address cracking, joint failure or membrane failure",
    "The treatment is not permanent — service life depends on exposure, substrate porosity, UV exposure and pollution levels — confirm expected service life and maintenance interval with manufacturer",
    "Solvent-based sealers require careful handling — confirm current SDS, PPE requirements and site management procedures before specifying on occupied or confined-space sites",
    "Application to wet substrates significantly reduces penetration depth and product efficacy — substrate dryness is mandatory",
  ],
  standardsNotes: [
    "AS 4548 — Guide to Long-Life Coatings for Concrete and Masonry — the primary Australian standard for concrete protection systems including penetrating sealers",
    "EN 1504-2 — Surface protection products for concrete — European product classification standard referenced on European manufacturer products",
    "WTA guidelines — WTA Merkblatt for facade water repellents — referenced on Remmers products",
    "CCAA data sheets — Cement Concrete and Aggregates Australia technical publications on concrete durability and protection",
  ],
  suitableDefects: [
    "Penetrating damp through masonry or concrete walls — rain-driven moisture penetrating through the pore structure of the wall fabric",
    "Efflorescence on masonry facades — mineral salt deposition on the facade surface driven by moisture movement through the masonry",
    "Damp patches on internal wall surfaces — corresponding to rain events on external masonry facades without membrane or film-coating damage",
    "Chloride ingress into concrete — concrete elements in marine or coastal environments where chloride-induced reinforcement corrosion is a risk",
  ],
  typicalSubstrates: [
    "Solid fired clay brick — standard red brick masonry facades — the most common substrate for penetrating silane sealer treatment in Australian strata buildings",
    "Concrete block masonry — confirm block porosity before specifying — dense blocks may require extended application or different product",
    "Concrete — reinforced concrete panels, columns, walls and beams — confirm surface preparation requirements",
    "Sandstone — natural stone — confirm silane compatibility with specific sandstone type — some sandstones may require specialist assessment",
    "Calcium silicate brick — confirm silane suitability and application rate with manufacturer",
  ],
};

/* ── Collapsible helpers ── */

function CollapsibleList({ items, icon, limit = 3 }: { items: string[]; icon: "check" | "x"; limit?: number }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, limit);
  const extra = items.length - limit;
  return (
    <div>
      <ul className="space-y-1.5">
        {visible.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
            {icon === "check" ? <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" /> : <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />}
            {item}
          </li>
        ))}
      </ul>
      {items.length > limit && (
        <button onClick={() => setExpanded((e) => !e)} className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600">
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
        <button onClick={() => setExpanded((e) => !e)} className="text-[9px] font-bold text-slate-400 hover:text-slate-600">
          {expanded ? "Hide ↑" : "See more ↓"}
        </button>
      </div>
      {expanded && (
        <div className="mt-2 space-y-1.5">
          {sources.map((src) => (
            <div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs">
              {src.url ? (
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">
                  {src.name}<ExternalLink size={9} className="text-slate-300" />
                </a>
              ) : (
                <span className="font-semibold text-slate-600">{src.name}</span>
              )}
            </div>
          ))}
        </div>
      )}
      <p className="mt-2 text-[10px] italic text-slate-400">Confirm suitability with the current manufacturer TDS before specifying or applying.</p>
    </div>
  );
}

function CollapsibleCardDetails({ text, chips }: { text: string; chips: { label: string; cls: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      {expanded && (
        <>
          <p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>
          {chips.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {chips.map((chip) => (
                <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>
              ))}
            </div>
          )}
        </>
      )}
      <button onClick={() => setExpanded((e) => !e)} className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600">
        {expanded ? "Hide details ↑" : "Show details ↓"}
      </button>
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>{text}</p>
      <button onClick={() => setExpanded((e) => !e)} className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900">
        {expanded ? "Show less ↑" : "Show more ↓"}
      </button>
    </div>
  );
}

export function SilaneSealerIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are penetrating silane sealer systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Penetrating silane sealers are water-repellent treatments for concrete and masonry that work by chemically bonding within the pore structure of the substrate — not by forming a surface film. The silane molecules penetrate into the substrate and react with moisture and alkalinity in the pore walls to produce a permanently hydrophobic silicone resin lining. The result is a substrate that repels water while remaining fully vapour-permeable.
        </p>
        <p>
          Silanes are the smaller and more mobile of the two main penetrating sealer chemistries. Their low molecular weight allows deeper penetration into concrete and dense masonry than siloxane molecules, making them better suited to dense concrete panels, engineering brick, and other low-porosity masonry substrates. Solvent-based silane formulations penetrate further than water-based versions because the low-viscosity solvent carrier reduces surface tension and drives the silane further into the pore network before evaporation.
        </p>
        <p>
          In penetrating damp remediation, silane sealers are used to reduce rain-driven moisture absorption through the fabric of external walls where no surface coating or membrane is appropriate — typically on brick veneer facades, concrete panels, and heritage masonry where film-forming coatings would trap moisture, change the appearance, or create ongoing maintenance obligations.
        </p>
      </div>
      <div className="mt-5 space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Do not confuse with:</p>
        <ul className="space-y-1.5">
          {[
            "Siloxane sealers — larger molecule, typically water-based or cream — better suited to brick and porous masonry — see the siloxane sealer page",
            "Silane/siloxane blend sealers — combined chemistry — see the siloxane sealer page for products with blend chemistry",
            "Film-forming masonry sealers — acrylic or polyurethane topcoat — different chemistry — not breathable — not a penetrating treatment",
            "Crystalline waterproofing (Xypex, Penetron) — active cementitious chemistry — for concrete with hydrostatic water pressure — not a water repellent sealer",
            "Anti-carbonation coatings — surface barrier coatings — different product category and purpose",
          ].map((item) => (
            <li key={item} className="flex gap-2.5 text-xs leading-5 text-slate-600">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function TechCard({ icon, title, items, style }: { icon: React.ReactNode; title: string; items: string[]; style: "bullet" | "check" | "warn" }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-white">{icon}</div>
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

export function SilaneSealerProductSection() {
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

  const visibleProducts =
    activeFilters.size === 0
      ? PRODUCTS
      : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });
  };

  return (
    <>
      {/* ── Technical Accordion ── */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button type="button" onClick={() => setAccordionOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, substrate selection, limitations, standards and suitable defects</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? <>Hide detail <ChevronUp size={14} /></> : <>Show detail <ChevronDown size={14} /></>}
          </div>
        </button>
        {accordionOpen && (
          <div className="border-t border-slate-100 px-7 pb-7 pt-6">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <TechCard icon={<Layers size={15} />} title="Typical Applications" items={TECH_INFO.typicalApplications} style="bullet" />
              <TechCard icon={<Ruler size={15} />} title="Selection Criteria" items={TECH_INFO.selectionCriteria} style="check" />
              <TechCard icon={<AlertTriangle size={15} />} title="Limitations" items={TECH_INFO.limitations} style="warn" />
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — penetrating silane sealers for concrete and masonry water repellency</p>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => {
            const active = activeFilters.has(f.id);
            return (
              <button key={f.id} type="button" onClick={() => toggleFilter(f.id)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}>
                {f.label}
              </button>
            );
          })}
          {activeFilters.size > 0 && (
            <button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">Clear filters</button>
          )}
        </div>

        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">{visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""}</span>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll("left")} aria-label="Scroll left" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronLeft size={16} /></button>
            <button onClick={() => scroll("right")} aria-label="Scroll right" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronRight size={16} /></button>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}>
          {visibleProducts.map((product) => (
            <div key={product.name} className="flex-none" style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                style={{ borderLeft: `4px solid ${product.accentColor}` }}>
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">{product.fullLabel}</span>
                    <div className="flex shrink-0 items-center gap-1">
                      {product.tdsUrl && (
                        <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
                          <FileText size={9} /> TDS
                        </a>
                      )}
                      <a href={product.brandUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
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

      {/* ── Brand Equivalents ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Brand Equivalents</h2>
            <p className="mt-1 text-sm text-slate-500">Penetrating silane sealer equivalents by substrate type. Confirm substrate suitability and application rate with manufacturer before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Application type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#003d7a" }}>Wacker Chemie</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#1a5276" }}>Remmers</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#6a1fa0" }}>Evonik</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.wacker, row.remmers, row.evonik].map((val, j) => (
                    <td key={j} className="px-4 py-3 text-slate-600">{val === "—" ? <span className="text-slate-300">—</span> : val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Warning boxes — BELOW comparison table ── */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-amber-900">Silane sealers do not address cracking, joint failure or membrane failure — confirm all moisture pathways before specifying</h3>
        </div>
        <ul className="space-y-2">
          {[
            "A penetrating silane sealer reduces moisture absorption through the intact pore structure of the masonry or concrete — it does not seal cracks, failed mortar joints, open bed joints, or any other discrete moisture pathway",
            "If penetrating damp is occurring through cracks, failed mortar joints or around window and door frames, these pathways must be repaired before the silane sealer is applied — the sealer alone will not stop moisture ingress through discrete openings",
            "Confirm that the moisture source has been correctly identified as penetrating damp through the wall fabric — not membrane failure, flashing failure, or capillary moisture from another source",
            "The substrate must be completely dry before application — applying silane sealer to a wet substrate reduces penetration depth significantly and may require re-treatment after the substrate dries",
          ].map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-amber-900">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
