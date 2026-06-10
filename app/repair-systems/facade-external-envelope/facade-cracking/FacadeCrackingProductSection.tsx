"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Epoxy"
  | "2C"
  | "Injection"
  | "Structural"
  | "Low-viscosity"
  | "Concrete"
  | "PU"
  | "1C"
  | "Hydrophilic"
  | "Active-crack"
  | "Water-reactive"
  | "Elastomeric"
  | "Crack-bridging"
  | "Acrylic"
  | "Exterior"
  | "Coating"
  | "Sealant"
  | "Control-joint"
  | "Facade"
  | "Movement-joint";

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
    accentColor: "#ef4444",
    name: "Sika Injection-451",
    productType: "Two-part low-viscosity epoxy injection resin",
    descriptionLine: "Low-viscosity two-part epoxy injection resin for structural repair of dormant cracks in concrete and masonry facades",
    filterTags: ["Epoxy", "2C", "Injection", "Structural", "Low-viscosity", "Concrete"],
    techChips: [
      { label: "Epoxy injection resin", cls: "bg-sky-100 text-sky-800" },
      { label: "Two-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Low-viscosity", cls: "bg-slate-100 text-slate-700" },
      { label: "Structural repair", cls: "bg-green-50 text-green-700" },
      { label: "Dormant cracks", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sika Injection-451 is a low-viscosity two-part epoxy injection resin designed for the structural reinstatement of dormant cracks in concrete and masonry. It penetrates hairline cracks under pressure, bonds the crack faces together and restores the structural continuity of the element. It is widely used in Australian remedial building practice for structural crack repair in concrete facade panels, columns, beams and masonry walls where the crack is dormant (not actively moving) and the substrate is dry or slightly damp.\n\nThe system is applied by low-pressure injection using a series of injection ports installed at centres along the crack. The two-part resin is mixed at the injection nozzle during application. After cure, the repaired section achieves structural bond strength exceeding the tensile strength of the surrounding concrete.\n\nSika Injection-451 is not suitable for active, water-bearing or wet cracks — use a hydrophilic PU injection resin for active or wet conditions. Always confirm crack type (dormant vs active) and crack width with a structural engineer before specifying epoxy injection on Class 2 strata facades.",
    technicalProperties: [
      "Low viscosity — penetrates fine dormant cracks under low injection pressure — suitable for hairline cracks from approximately 0.1 mm width",
      "Two-component epoxy — high bond strength after cure — restores structural continuity of cracked concrete and masonry elements",
      "Structural repair system — used for cracks in concrete facade panels, beams, columns and masonry walls where load transfer across the crack is required",
      "Relatively low exotherm for an epoxy — suitable for injection into confined cracks without excessive heat build-up",
      "Gun-applied through low-pressure injection ports — confirm port spacing and injection pressure with Sika technical data sheet",
    ],
    limitations: [
      "Not suitable for active (moving) cracks — epoxy is rigid after cure and will re-crack if the underlying movement continues",
      "Not suitable for wet or water-bearing cracks — use hydrophilic PU injection resin for wet crack conditions",
      "Dormant crack status must be confirmed by a structural engineer before specifying epoxy injection — active cracks require different treatment",
      "Two-component — requires accurate mixing at injection nozzle — incorrect mix ratio will result in under-cured resin and inadequate bond",
      "Confirm current product specification and compliance with Sika Australia technical data sheet before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply — contact for current pricing and technical support", url: "https://aus.sika.com" },
      { name: "Waterproofing and concrete repair trade suppliers — confirm current stock", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#f97316",
    name: "Sika Injection-101 RC",
    productType: "One-part hydrophilic PU injection resin",
    descriptionLine: "Water-reactive one-part PU injection resin for sealing active leaking cracks in concrete facades",
    filterTags: ["PU", "1C", "Hydrophilic", "Injection", "Active-crack", "Water-reactive", "Concrete"],
    techChips: [
      { label: "PU injection resin", cls: "bg-sky-100 text-sky-800" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Hydrophilic", cls: "bg-slate-100 text-slate-700" },
      { label: "Active / wet crack", cls: "bg-red-50 text-red-700" },
      { label: "Water-reactive", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sika Injection-101 RC is a one-component hydrophilic polyurethane injection resin that reacts with water to expand and form a flexible, water-resistant foam or gel within the crack. It is used for sealing active, leaking or water-bearing cracks in concrete facade elements where water ingress through the crack is the primary concern, and where the crack is actively moving or wet.\n\nBecause the resin is water-reactive, it is ideally suited to wet crack conditions where epoxy injection would be impractical. The cured material is flexible and can accommodate minor ongoing crack movement. It does not restore structural continuity of the cracked element — it seals against water ingress only. A separate structural assessment is required for active cracks in structural elements.\n\nActive and water-bearing facade cracks in Class 2 strata buildings must be assessed by a structural engineer before specifying any injection system. PU hydrophilic injection addresses the water ingress symptom but does not address the underlying cause of cracking.",
    technicalProperties: [
      "Hydrophilic PU — reacts with water present in the crack — suitable for wet and actively leaking crack conditions",
      "One-component — no on-site mixing required — reduces application complexity",
      "Flexible after cure — accommodates minor ongoing crack movement — not a rigid structural repair",
      "Expands on reaction with water — fills void and surrounding pore structure — forms water-resistant barrier within the crack",
      "Used for water-stopping in active cracks in concrete facade panels, balcony soffits, and masonry wall elements",
    ],
    limitations: [
      "Not a structural repair — does not restore tensile or compressive strength across the crack — structural assessment required separately",
      "Active cracks in structural elements must be assessed by a structural engineer — PU injection addresses water ingress only",
      "May not be suitable for very fine dry cracks — water activation requires moisture present in or near the crack",
      "Reaction rate and expansion are temperature dependent — confirm application temperature range with Sika TDS",
      "Confirm current product specification and compliance with Sika Australia technical data sheet before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply — contact for current pricing and technical support", url: "https://aus.sika.com" },
      { name: "Concrete repair and waterproofing trade suppliers — confirm current stock", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Parchem Construction Products",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#3b82f6",
    name: "Nitofill LVEP",
    productType: "Low-viscosity epoxy for structural crack injection",
    descriptionLine: "Two-part low-viscosity epoxy resin for structural reinstatement of dormant cracks in concrete and masonry facades",
    filterTags: ["Epoxy", "2C", "Injection", "Structural", "Low-viscosity", "Concrete"],
    techChips: [
      { label: "Epoxy injection resin", cls: "bg-sky-100 text-sky-800" },
      { label: "Two-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Low-viscosity", cls: "bg-slate-100 text-slate-700" },
      { label: "Structural repair", cls: "bg-green-50 text-green-700" },
      { label: "Dormant cracks", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Nitofill LVEP is Parchem's two-part low-viscosity epoxy injection resin for structural crack injection in concrete and masonry. It penetrates hairline dormant cracks under low-pressure injection and after cure restores structural bond across the crack interface. The product is part of the Parchem (formerly Fosroc) concrete repair range and is commonly specified for structural crack injection in concrete facade panels, columns, beams and masonry walls in Class 2 strata remediation.\n\nThe system is applied through low-pressure injection ports installed at centres along the crack. Mixed at the injection nozzle during application, the two-part resin achieves high tensile bond strength after cure. Nitofill LVEP is broadly equivalent in function to Sika Injection-451 and is specified where the Parchem supply chain is preferred or required by specification.\n\nCrack dormancy must be confirmed before specifying epoxy injection — active cracks require PU hydrophilic injection or movement joint treatment. Confirm current product designation and technical data with Parchem before specifying.",
    technicalProperties: [
      "Low-viscosity two-part epoxy — penetrates dormant hairline cracks from approximately 0.1 mm width under low injection pressure",
      "High bond strength after cure — structural reinstatement of concrete and masonry cracks — restores load transfer across crack interface",
      "Part of the Parchem concrete repair system — compatible with Parchem surface preparation and crack preparation products",
      "Two-component epoxy — mixed at injection nozzle — confirm mix ratio and injection equipment requirements with Parchem TDS",
      "Suitable for concrete facade panels, beams, columns and masonry walls — confirm substrate suitability with Parchem technical",
    ],
    limitations: [
      "Not suitable for active or moving cracks — rigid epoxy will re-crack if movement continues after injection",
      "Not suitable for wet or water-bearing cracks — requires dry or slightly damp crack conditions for reliable cure and bond",
      "Dormant crack status must be confirmed by a structural engineer — structural cracks must not be injected without engineering assessment",
      "Two-component product — incorrect mix ratio at injection nozzle will result in inadequate cure and bond failure",
      "Confirm current product specification and compliance with Parchem Construction Products before specifying",
    ],
    procurementSources: [
      { name: "Parchem Construction Products — trade supply nationally — contact for current pricing", url: "https://www.parchem.com.au" },
      { name: "Concrete repair trade suppliers — confirm current stock with Parchem", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Dulux Group Australia",
    brandUrl: "https://www.acratex.com.au",
    accentColor: "#22c55e",
    name: "Acratex Surfacekote",
    productType: "Elastomeric crack-bridging exterior coating",
    descriptionLine: "Elastomeric acrylic coating for crack-bridging over hairline facade cracks — applied after injection or as primary treatment for fine cracks",
    filterTags: ["Elastomeric", "Crack-bridging", "Acrylic", "Exterior", "Coating"],
    techChips: [
      { label: "Elastomeric coating", cls: "bg-sky-100 text-sky-800" },
      { label: "Crack-bridging", cls: "bg-slate-100 text-slate-700" },
      { label: "Acrylic", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior facade", cls: "bg-green-50 text-green-700" },
      { label: "Surface treatment", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Acratex Surfacekote is a high-build elastomeric acrylic coating system from the Acratex (Dulux Group) range, used for crack-bridging over hairline and fine facade cracks in concrete and masonry exterior wall surfaces. It is applied by roller or airless spray in multiple coats to build a flexible film over the facade surface that bridges fine cracks and provides a water-resistant exterior coating layer.\n\nAcratex Surfacekote is used after structural crack injection has been completed (where injection is required) to provide a continuous, crack-bridging exterior coating finish over the repaired surface. For fine hairline facade cracks that do not require structural injection, it may be applied as the primary crack treatment. It is not a substitute for structural crack injection on dormant or active structural cracks.\n\nThe product is part of the broader Acratex exterior coating system. Confirm surface preparation, primer selection and number of coats required with the current Acratex technical data sheet and system specification. The facade surface must be clean, sound and free of contamination before application.",
    technicalProperties: [
      "Elastomeric acrylic — flexible film that bridges hairline facade cracks and accommodates minor surface movement without cracking",
      "High-build coating — applied in multiple coats by roller or airless spray — builds a continuous water-resistant film over the facade surface",
      "Exterior-rated — UV-stable acrylic formulation — suitable for exposed concrete and masonry facade surfaces",
      "Crack-bridging — test crack-bridging capacity against crack width and expected movement — confirm with current Acratex TDS",
      "Part of Acratex exterior coating system — compatible with Acratex primers — confirm full system specification with Dulux Group technical",
    ],
    limitations: [
      "Surface treatment only — does not inject or fill cracks structurally — cannot substitute for structural crack injection on dormant or active structural cracks",
      "Crack-bridging capacity is limited — not suitable for wide or actively moving cracks — confirm maximum bridgeable crack width with Acratex TDS",
      "Surface must be clean, dry, sound and free of contamination — delaminating render or loose material must be removed before application",
      "Requires primer coat on most substrates — confirm primer selection for concrete and masonry facade substrates with Acratex",
      "Confirm current product specification, system requirements and colour range with Dulux Group / Acratex before specifying",
    ],
    procurementSources: [
      { name: "Acratex / Dulux Group Australia — trade supply — contact for current pricing and technical support", url: "https://www.acratex.com.au" },
      { name: "Dulux trade centres nationally — confirm current stock and colour range", url: "https://www.dulux.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#8b5cf6",
    name: "Sikaflex-11 FC+",
    productType: "PU sealant at facade control joints",
    descriptionLine: "One-part PU sealant for sawcut or formed control joints and movement joints in concrete and masonry facade elements",
    filterTags: ["Sealant", "PU", "1C", "Control-joint", "Facade", "Movement-joint"],
    techChips: [
      { label: "Polyurethane sealant", cls: "bg-sky-100 text-sky-800" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Movement joint", cls: "bg-slate-100 text-slate-700" },
      { label: "Control joint / facade", cls: "bg-green-50 text-green-700" },
      { label: "Moisture-cure", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sikaflex-11 FC+ is a one-component moisture-curing polyurethane sealant widely used at sawcut and formed control joints and movement joints in concrete and masonry facade elements. At the facade level, it is applied to formed or sawcut control joints between precast or insitu concrete panels, at junctions between different facade materials, and to movement joints at floor-to-facade junctions and slab edges.\n\nFacade cracks that result from the absence or failure of movement joints — including cracks at regular spacing in concrete panel systems — may be addressed by forming a sawcut control joint at the crack location and sealing with Sikaflex-11 FC+. This converts a random crack into a controlled, sealed movement joint. The approach requires structural engineer review to confirm that forming a control joint at that location is appropriate.\n\nApplied by gun from standard cartridge over backer rod or bond breaker tape. Available in multiple standard colours. Confirm primer requirements on concrete and masonry substrates with Sika TDS before application.",
    technicalProperties: [
      "One-component moisture-curing PU sealant — no site mixing required — applied by gun from standard cartridge",
      "Movement joint sealant — accommodates joint movement in concrete and masonry facade elements at control joints and expansion joints",
      "Paintable after full cure with compatible paint systems — confirm with Sika technical before applying paint overcoat",
      "Available in multiple standard colours — confirm current colour range with Sika Australia",
      "Suitable for sawcut control joints, formed movement joints and facade perimeter joints in Class 2 strata concrete and masonry facades",
    ],
    limitations: [
      "Not a structural crack repair — does not bond crack faces together or restore structural continuity — used for movement joints and controlled joints only",
      "Backer rod or bond breaker tape mandatory — three-sided adhesion prevents correct sealant movement and causes premature failure",
      "Do not apply to contaminated, wet or uncured concrete joint faces — confirm minimum concrete age and surface preparation with Sika TDS",
      "Sawcut control joint at existing crack location requires structural engineer review — confirm joint location and depth are appropriate before cutting",
      "Confirm current product specification and compliance with Sika Australia technical data sheet before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply — contact for current pricing and technical support", url: "https://aus.sika.com" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Waterproofing and construction trade suppliers nationally", url: "https://aus.sika.com" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Epoxy", label: "Epoxy" },
  { id: "2C", label: "Two-component" },
  { id: "Injection", label: "Injection" },
  { id: "Structural", label: "Structural" },
  { id: "Low-viscosity", label: "Low-viscosity" },
  { id: "Concrete", label: "Concrete" },
  { id: "PU", label: "PU" },
  { id: "1C", label: "One-component" },
  { id: "Hydrophilic", label: "Hydrophilic" },
  { id: "Active-crack", label: "Active-crack" },
  { id: "Water-reactive", label: "Water-reactive" },
  { id: "Elastomeric", label: "Elastomeric" },
  { id: "Crack-bridging", label: "Crack-bridging" },
  { id: "Acrylic", label: "Acrylic" },
  { id: "Exterior", label: "Exterior" },
  { id: "Coating", label: "Coating" },
  { id: "Sealant", label: "Sealant" },
  { id: "Control-joint", label: "Control-joint" },
  { id: "Facade", label: "Facade" },
];

const BRAND_EQUIV: { system: string; sika: string; parchem: string; dulux: string }[] = [
  { system: "Epoxy injection (structural, dormant cracks)", sika: "Injection-451", parchem: "Nitofill LVEP", dulux: "—" },
  { system: "PU injection (active/wet cracks)", sika: "Injection-101 RC", parchem: "—", dulux: "—" },
  { system: "Elastomeric coating (crack-bridging, surface)", sika: "—", parchem: "—", dulux: "Acratex Surfacekote" },
  { system: "Movement joint sealant (control joints)", sika: "Sikaflex-11 FC+", parchem: "—", dulux: "—" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  type: string;
  viscosity: string;
  structural: string;
  crackWidthSuited: string;
  primaryUse: string;
}[] = [
  {
    product: "Sika Injection-451",
    brand: "Sika",
    type: "Epoxy (2C)",
    viscosity: "Low",
    structural: "Yes — restores structural continuity",
    crackWidthSuited: "~0.1 mm+ (dormant)",
    primaryUse: "Structural reinstatement of dormant dry cracks in concrete / masonry facade",
  },
  {
    product: "Sika Injection-101 RC",
    brand: "Sika",
    type: "PU hydrophilic (1C)",
    viscosity: "Low",
    structural: "No — water-stopping only",
    crackWidthSuited: "Active / wet cracks",
    primaryUse: "Sealing active or water-bearing cracks in concrete facade elements",
  },
  {
    product: "Nitofill LVEP",
    brand: "Parchem",
    type: "Epoxy (2C)",
    viscosity: "Low",
    structural: "Yes — restores structural continuity",
    crackWidthSuited: "~0.1 mm+ (dormant)",
    primaryUse: "Structural reinstatement of dormant dry cracks — Parchem supply chain",
  },
  {
    product: "Acratex Surfacekote",
    brand: "Dulux / Acratex",
    type: "Elastomeric acrylic coating",
    viscosity: "N/A — surface coating",
    structural: "No — surface treatment only",
    crackWidthSuited: "Hairline (see TDS for limit)",
    primaryUse: "Crack-bridging exterior coating over repaired or fine facade cracks",
  },
  {
    product: "Sikaflex-11 FC+",
    brand: "Sika",
    type: "PU sealant (1C)",
    viscosity: "N/A — gun-applied sealant",
    structural: "No — movement joint sealant",
    crackWidthSuited: "Formed / sawcut control joints",
    primaryUse: "Movement joint sealant at facade control joints and panel junctions",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Structural epoxy injection of dormant hairline cracks in precast and insitu concrete facade panels",
    "Hydrophilic PU injection of active and water-bearing cracks in concrete facade soffits and panels",
    "Elastomeric crack-bridging coating applied over hairline facade cracks after structural repair",
    "Movement joint sealant at sawcut control joints and formed panel joints in concrete facades",
    "Facade crack repair as part of a broader remedial program on Class 2 strata apartment buildings",
  ],
  selectionCriteria: [
    "Determine crack type first: dormant (stable, no movement) vs active (moving, water-bearing) — selection depends entirely on this assessment",
    "Use epoxy injection (Injection-451, Nitofill LVEP) for dormant cracks requiring structural reinstatement in dry or slightly damp concrete",
    "Use hydrophilic PU injection (Injection-101 RC) for active, wet or water-bearing cracks where water-stopping is the primary objective",
    "Use elastomeric crack-bridging coating (Acratex Surfacekote) for hairline cracks not requiring injection — or as a finishing coat over injected cracks",
    "Use movement joint sealant (Sikaflex-11 FC+) at formed or sawcut control joints and where crack location is converted to a controlled movement joint",
  ],
  limitations: [
    "Epoxy injection is rigid after cure — will re-crack if applied to an active or moving crack — dormancy must be confirmed before specifying",
    "PU hydrophilic injection is water-stopping only — does not restore structural continuity — structural assessment required separately for structural cracks",
    "Elastomeric coatings have a limited crack-bridging capacity — not suitable for wide or actively moving cracks",
    "Movement joint sealants at sawcut locations require structural engineer confirmation that the joint location is appropriate",
    "All facade crack repair work on structural elements must be assessed and specified by a structural engineer before commencing",
  ],
  standardsNotes: [
    "AS 3600 — Concrete Structures — structural assessment and repair requirements for concrete facade elements",
    "CSIRO and structural engineer assessment recommended before specifying injection for structural cracks on Class 2 strata facades",
    "Structural engineer required to classify cracks as active vs dormant and to confirm injection method and repair strategy",
    "AS/NZS 4456 — referenced in some masonry crack repair specifications — confirm applicability with structural engineer",
    "All crack injection work on structural elements should be documented with pre- and post-repair surveys",
  ],
  suitableDefects: [
    "Dormant hairline cracks in precast or insitu concrete facade panels requiring structural reinstatement",
    "Active or water-bearing facade cracks causing water ingress through the external wall envelope",
    "Fine hairline facade cracks suitable for elastomeric crack-bridging coating without injection",
    "Failed or absent control joints in concrete facades causing regular crack patterns at panel junctions",
    "Facade cracks at floor-to-facade junctions in Class 2 strata apartment buildings",
  ],
  typicalSubstrates: [
    "Precast concrete facade panels — dormant hairline cracks — epoxy injection",
    "Insitu concrete columns, beams and wall panels — structural dormant cracks",
    "Concrete and masonry facade elements — active wet cracks — PU hydrophilic injection",
    "Concrete and masonry exterior facade surfaces — elastomeric crack-bridging coating",
    "Sawcut or formed control joints in concrete facade panels — movement joint sealant",
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
                  {src.name} <ExternalLink size={9} className="text-slate-300" />
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

export function FacadeCrackingIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are facade crack repair systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Facade cracks in Class 2 strata apartment buildings occur in concrete panels, masonry walls, render coatings, and at junctions between dissimilar materials. Before selecting a repair system, the fundamental distinction to make is between a dormant crack and an active crack. A dormant crack has stabilised — it is not actively moving and carries no water. An active crack continues to move under live loads, thermal cycling, settlement, or water pressure. This distinction drives the entire repair specification: the wrong system applied to the wrong crack type will fail.
        </p>
        <p>
          For dormant cracks in structural concrete and masonry, low-viscosity epoxy injection restores structural continuity by bonding the crack faces together under pressure. The cured epoxy achieves bond strength exceeding the tensile strength of the surrounding concrete. For active or water-bearing cracks, hydrophilic polyurethane injection is used — it reacts with water to form a flexible, water-resistant seal within the crack, but does not restore structural continuity. For fine hairline cracks not requiring injection, an elastomeric crack-bridging coating provides a continuous, flexible film over the facade surface. Where cracks result from absent or failed movement joints, the crack location may be converted to a sawcut control joint and sealed with a flexible PU sealant.
        </p>
        <p>
          The selection between these systems must be made by a structural engineer for all structural elements. Crack injection of structural elements without engineering assessment is not appropriate practice for Class 2 strata facade remediation. Surface coatings and movement joint sealants are supplementary products that address water ingress and movement accommodation — they do not replace structural assessment and repair.
        </p>
        <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
          <p className="mb-2 text-xs font-bold text-slate-700">Do not confuse with:</p>
          <ul className="space-y-1.5">
            {[
              "Surface crack fillers — cosmetic fillers with no injection component — not structural and do not address crack depth",
              "Masonry crack stitching — reinforcement bar and epoxy grout systems — not resin injection into cracks",
              "Waterproofing membranes applied over cracks — surface-applied membrane over the crack, not injection into the crack — different product category",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-xs leading-5 text-slate-600">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function FacadeCrackingProductSection() {
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
        <button
          type="button"
          onClick={() => setAccordionOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50"
        >
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable defects and substrates</p>
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
            <p className="mt-1 text-sm text-slate-500">5 products — 4 brands — crack injection and repair systems — scroll to view all</p>
          </div>
        </div>

        {/* Filter chips */}
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

        {/* Nav row */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — 3 visible, scroll for more
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

        {/* Scrollable card row */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {visibleProducts.map((product) => (
            <div key={product.name} className="flex-none" style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ borderLeft: `4px solid ${product.accentColor}` }}>
                {/* Card header */}
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">{product.fullLabel}</span>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side technical comparison of facade crack repair products. Confirm current product specifications with manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Viscosity</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Structural</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Crack width suited</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600">{row.viscosity}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold ${row.structural.startsWith("Yes") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                      {row.structural}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{row.crackWidthSuited}</td>
                  <td className="px-4 py-3 text-slate-600">{row.primaryUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Brand Equivalents ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Brand Equivalents</h2>
            <p className="mt-1 text-sm text-slate-500">Facade crack repair system equivalents across brands active in Australian Class 2 strata remediation.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#ef4444" }}>Sika</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#3b82f6" }}>Parchem</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#22c55e" }}>Dulux / Acratex</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.sika, row.parchem, row.dulux].map((val, j) => (
                    <td key={j} className="px-4 py-3 text-slate-600">{val === "—" ? <span className="text-slate-300">—</span> : val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Warning callout — BELOW comparison table only ── */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-amber-900">Active cracks require structural assessment</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Cracks that are actively moving, water-bearing, or of structural concern must be assessed by a structural engineer before any injection system is specified or applied",
            "Injecting a dormant-style rigid epoxy resin into an active crack is a critical specification error — the crack will re-open around or through the cured resin as movement continues, and the repair will fail — the correct product for active cracks is a flexible hydrophilic PU injection resin",
            "PU hydrophilic injection seals water ingress but does not restore structural continuity — a structural assessment must be completed separately to determine whether the cracked element requires structural intervention beyond water-stopping",
            "Do not rely on visual inspection alone to classify a crack as dormant — install crack monitors and observe over time, or engage a structural engineer to assess crack activity before specifying injection",
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
