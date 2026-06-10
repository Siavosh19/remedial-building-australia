"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "PU"
  | "1C"
  | "Facade"
  | "Movement-joint"
  | "Paintable"
  | "Moisture-cure"
  | "Silicone"
  | "Neutral-cure"
  | "Structural"
  | "Glazing"
  | "Expansion-joint"
  | "Polysulfide"
  | "2C"
  | "Precast"
  | "Masonry"
  | "Primer"
  | "Concrete"
  | "Metal";

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
    name: "Sikaflex Pro-3",
    productType: "One-part PU facade movement joint sealant",
    descriptionLine: "Premium one-part polyurethane sealant for facade movement joints, expansion joints and curtain wall perimeters",
    filterTags: ["PU", "1C", "Facade", "Movement-joint", "Paintable", "Moisture-cure"],
    techChips: [
      { label: "Polyurethane sealant", cls: "bg-sky-100 text-sky-800" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Moisture-cure", cls: "bg-slate-100 text-slate-700" },
      { label: "Facade / movement joint", cls: "bg-slate-100 text-slate-700" },
      { label: "Paintable", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sikaflex Pro-3 is a premium one-part moisture-curing polyurethane sealant formulated for facade movement joints, expansion joints and curtain wall perimeter sealing on Class 2 strata buildings. It is applied by cartridge gun into prepared joints over closed-cell backer rod and is suitable for horizontal, vertical and overhead joints on concrete, masonry, render and metal facades. The product accommodates the thermal and structural movement demands typical of multi-storey facades and is paintable after full cure, making it appropriate where facade coatings are applied over sealed joints.\n\nSikaflex Pro-3 is specified by facade consultants and remedial contractors for re-sealing failed control joints, expansion joints between precast panels, and perimeter joints at aluminium curtain wall frames and window/door surrounds. Confirm current product designation, movement accommodation class and compliance with AS 4386 requirements with Sika Australia before specifying. Backer rod and Sika Primer-215 are typically required as part of the complete joint system.\n\nDo not apply to contaminated, damp or inadequately primed joint faces. Clean, dry substrate with appropriate primer is mandatory for reliable adhesion on concrete and masonry facades.",
    technicalProperties: [
      "One-part polyurethane — moisture-curing — no on-site mixing required — reduces application error on multi-storey facade access",
      "Paintable after full cure with compatible exterior paint systems — confirm paint compatibility with Sika technical before specifying",
      "Good movement accommodation — suitable for facade control and expansion joints subject to thermal and structural movement",
      "Available in standard facade colours — confirm current colour range and colour match to existing facade finishes with Sika",
      "Gun-applied from standard cartridge — toolable after application to form smooth concave or flat joint profile flush with facade",
    ],
    limitations: [
      "Backer rod mandatory in all facade joints — three-sided adhesion causes premature cohesive failure — joint width/depth ratio must be maintained",
      "Primer required on most facade substrates including concrete, masonry and metal — confirm primer selection with Sika technical and current TDS",
      "Not for use in structural glazing applications without specific Sika approval — confirm load-bearing joint suitability with Sika technical",
      "Do not apply to joints with active water flow or in continuously submerged conditions",
      "Confirm current product specification, movement accommodation class and compliance requirements with Sika Australia before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply — contact for current pricing and colour range", url: "https://aus.sika.com" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "Total Fasteners & Building Products — trade nationally", url: "https://www.totalfasteners.com.au" },
    ],
  },
  {
    fullLabel: "Tremco CPG Australia",
    brandUrl: "https://www.tremcosealants.com.au",
    accentColor: "#22c55e",
    name: "Tremco Spectrem 2",
    productType: "Neutral-cure structural silicone sealant",
    descriptionLine: "High-modulus neutral-cure silicone for structural glazing and facade curtain wall expansion joints",
    filterTags: ["Silicone", "Neutral-cure", "Structural", "Glazing", "Facade", "1C"],
    techChips: [
      { label: "Neutral-cure silicone", cls: "bg-sky-100 text-sky-800" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Structural glazing", cls: "bg-green-50 text-green-700" },
      { label: "Curtain wall", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 4386", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Tremco Spectrem 2 is a high-modulus one-part neutral-cure silicone sealant formulated for structural glazing, facade curtain wall expansion joints and weather sealing of metal framing systems. Neutral-cure chemistry is non-corrosive to anodised aluminium, metal framing, coated metals and glazing — making it the appropriate choice for joints between glass, aluminium framing members, and facade panels on multi-storey Class 2 strata buildings. It is used in both new facade construction and remediation of failed structural silicone joints.\n\nSpectrem 2 provides high structural performance and UV resistance appropriate for exposed facade joints subject to weathering, UV and wind loading. It should be applied to clean, dry and correctly primed substrates following the Tremco substrate primer schedule. Confirm structural glazing suitability and compliance with glazing engineer and Tremco CPG technical before specifying in structural applications.\n\nConfirm whether Spectrem 2 remains the current active product designation in the Tremco CPG Australia range before specifying — product names are subject to periodic revision.",
    technicalProperties: [
      "High-modulus neutral-cure silicone — non-corrosive — suitable for anodised aluminium, coated metals, glass and most facade substrates",
      "One-component — no mixing required — suitable for facade remediation in restricted or elevated access conditions",
      "UV stable after cure — appropriate for exposed facade joints subject to direct solar radiation on north-facing facades",
      "Structural glazing performance — designed to accommodate wind loading and thermal movement in curtain wall and window surrounds",
      "Confirm movement accommodation class, modulus and structural performance from current Tremco CPG TDS before specifying",
    ],
    limitations: [
      "Not paintable after cure — silicone joints cannot be overpainted — colour selection must be confirmed against facade finish before application",
      "Silicone-to-silicone re-sealing requires full mechanical removal of all existing cured silicone — new silicone will not bond to cured silicone",
      "Primer required on most non-glass substrates — confirm Tremco primer schedule for concrete, masonry and coated metal substrates",
      "Not suitable for joints in contact with bituminous or coal-tar products — confirm substrate compatibility with Tremco technical",
      "Confirm current product specification and compliance with Tremco CPG Australia before specifying in structural glazing applications",
    ],
    procurementSources: [
      { name: "Tremco CPG Australia — trade supply — contact for current pricing and primer schedule", url: "https://www.tremcosealants.com.au" },
      { name: "Glazing and facade trade distributors nationally — confirm current stock with Tremco CPG", url: "https://www.tremcosealants.com.au" },
    ],
  },
  {
    fullLabel: "Bostik Australia",
    brandUrl: "https://www.bostik.com/en-au",
    accentColor: "#8b5cf6",
    name: "Bostik Seal-N-Flex Pro",
    productType: "One-part PU facade and expansion joint sealant",
    descriptionLine: "One-part moisture-curing PU sealant for facade movement joints and precast panel perimeter joints",
    filterTags: ["PU", "1C", "Facade", "Expansion-joint", "Paintable", "Movement-joint"],
    techChips: [
      { label: "Polyurethane sealant", cls: "bg-sky-100 text-sky-800" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Moisture-cure", cls: "bg-slate-100 text-slate-700" },
      { label: "Facade / expansion joint", cls: "bg-slate-100 text-slate-700" },
      { label: "Paintable", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Bostik Seal-N-Flex Pro is a one-part moisture-curing polyurethane sealant for facade movement joints, expansion joints and precast concrete panel perimeter sealing on multi-storey Class 2 strata buildings. Applied by cartridge gun over closed-cell backer rod to prepared, primed joint faces, it accommodates the thermal and structural movement demands of external facade joints. The product is paintable after full cure, enabling re-coating of the sealed facade surface as part of a complete facade remediation program.\n\nSeal-N-Flex Pro is suitable for vertical and horizontal joints on concrete, render and masonry facades, around precast panel perimeters, and at expansion joint interfaces between facade zones. It is part of the Bostik facade sealing system — confirm compatible primer selection and preparation requirements with the current Bostik technical data sheet.\n\nConfirm that Seal-N-Flex Pro is the current correct Bostik product designation for facade PU movement joint sealant in the Australian market before specifying.",
    technicalProperties: [
      "One-part polyurethane — moisture-curing — no on-site mixing required — suitable for facade remediation under working access conditions",
      "Paintable after full cure with compatible exterior paint systems — confirm paint compatibility with Bostik technical before specifying",
      "Suitable for concrete, render and masonry facade substrates — confirm primer requirements with Bostik TDS",
      "Available in standard facade colours — confirm current colour range with Bostik Australia before specifying",
      "Gun-applied from standard cartridge — toolable to form flush or concave joint profile appropriate to facade finish",
    ],
    limitations: [
      "Backer rod mandatory in all facade joints — three-sided adhesion will cause premature joint failure — do not omit backer rod",
      "Primer required on porous and contaminated substrates — confirm primer selection with Bostik technical and current TDS",
      "Do not apply to damp, frozen or excessively hot joint faces — substrate temperature must be within product application range per TDS",
      "Not suitable for structural glazing applications — confirm load-bearing suitability with Bostik technical before specifying",
      "Confirm current product specification and compliance with Bostik Australia before specifying",
    ],
    procurementSources: [
      { name: "Bostik Australia — trade supply — contact for current pricing", url: "https://www.bostik.com/en-au" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Trade builders merchants nationally — confirm current stock", url: "https://www.bostik.com/en-au" },
    ],
  },
  {
    fullLabel: "Tremco CPG Australia",
    brandUrl: "https://www.tremcosealants.com.au",
    accentColor: "#f97316",
    name: "Illbruck ME300 Polysulfide",
    productType: "Two-part polysulfide sealant for precast and masonry joints",
    descriptionLine: "Two-part polysulfide sealant for precast concrete panel joints and masonry expansion joints on facades",
    filterTags: ["Polysulfide", "2C", "Precast", "Masonry", "Expansion-joint", "Facade"],
    techChips: [
      { label: "Polysulfide sealant", cls: "bg-sky-100 text-sky-800" },
      { label: "Two-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Precast panels", cls: "bg-slate-100 text-slate-700" },
      { label: "Masonry / concrete", cls: "bg-slate-100 text-slate-700" },
      { label: "Expansion joint", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Illbruck ME300 Polysulfide is a two-part polysulfide sealant designed for precast concrete panel joints and masonry expansion joints on facades of multi-storey buildings. Two-part polysulfide chemistry provides excellent chemical resistance and adhesion to concrete and masonry substrates and has a long track record in Australian facade sealing. The product is mixed on site from base and activator components and applied by gun or spatula into prepared joints over closed-cell backer rod.\n\nPolysulfide sealants are particularly suited to precast concrete panel perimeter joints, expansion joints in masonry facades, and joints subject to exposure to fuel, oil or chemical contaminants. They exhibit lower movement accommodation than polyurethane sealants in some formulations — confirm movement accommodation class against joint design requirements with the current Tremco CPG technical data sheet before specifying.\n\nConfirm whether Illbruck ME300 Polysulfide is the current active product designation in the Tremco CPG Australia Illbruck range before specifying — product names are subject to periodic revision.",
    technicalProperties: [
      "Two-part polysulfide chemistry — excellent adhesion to concrete and masonry — well-proven track record in Australian facade panel joint sealing",
      "Chemical resistance — suitable for joints exposed to mild chemical contamination, fuel and oils where PU sealants may not be appropriate",
      "Mixed on site from two-component system — pot life management required on site — follow Tremco CPG mixing and pot life guidance",
      "Good UV resistance after cure — appropriate for exposed facade joints subject to weathering",
      "Confirm movement accommodation class, elongation at break and adhesion properties from current Tremco CPG TDS before specifying",
    ],
    limitations: [
      "Two-component mixing required on site — mixing error can compromise cure and joint performance — trained applicator mandatory",
      "Pot life limited after mixing — do not mix more material than can be applied within the stated pot life from the TDS",
      "Backer rod mandatory in all precast and masonry joints — three-sided adhesion compromises movement accommodation and causes premature failure",
      "Not suitable for structural glazing or joints against anodised aluminium — confirm substrate compatibility with Tremco CPG technical",
      "Confirm current product specification, availability and compliance with Tremco CPG Australia before specifying",
    ],
    procurementSources: [
      { name: "Tremco CPG Australia — trade supply — contact for current pricing and mixing guidance", url: "https://www.tremcosealants.com.au" },
      { name: "Facade and construction product distributors nationally — confirm current stock with Tremco CPG", url: "https://www.tremcosealants.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#3b82f6",
    name: "Sika Primer-215",
    productType: "PU sealant primer for concrete, masonry and metal",
    descriptionLine: "Solvent-based primer for improving adhesion of PU sealants on concrete, masonry and metal substrates",
    filterTags: ["Primer", "PU", "Concrete", "Masonry", "Metal"],
    techChips: [
      { label: "Sealant primer", cls: "bg-sky-100 text-sky-800" },
      { label: "Solvent-based", cls: "bg-slate-100 text-slate-700" },
      { label: "PU compatible", cls: "bg-slate-100 text-slate-700" },
      { label: "Concrete / masonry / metal", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Sika Primer-215 is a solvent-based primer formulated to improve the adhesion of Sikaflex polyurethane sealants to concrete, masonry and metal substrates on facade joint remediation projects. Applied by brush or swab to clean, dry joint faces immediately prior to sealant application, Primer-215 penetrates porous substrates and activates the joint face to improve sealant-to-substrate adhesion and reduce the risk of adhesive failure at the interface.\n\nPrimer is not optional on facade joint remediation — many adhesive sealant failures on concrete and masonry facades are caused by inadequate surface preparation and omission of primer. Primer-215 is specified as part of the Sikaflex Pro-3 joint system for facade applications and must be applied and allowed to flash off per the current Sika TDS before sealant application commences.\n\nConfirm the current primer specification for each substrate type with the Sika Primer-215 technical data sheet and Sika Australia technical support. Primer selection must be matched to the specific sealant product and substrate combination.",
    technicalProperties: [
      "Solvent-based primer — penetrates porous concrete and masonry substrates to activate joint face for improved PU sealant adhesion",
      "Suitable for concrete, masonry, render and metal substrates — confirm suitability for coated or treated metal facades with Sika technical",
      "Applied by brush or lint-free swab to clean, dry joint faces — thin even coat — allow to flash off before sealant application per TDS",
      "Improves long-term adhesion durability of facade PU sealant joints — particularly critical in high-movement or high-UV exposure joints",
      "Confirm flash-off time and application temperature range from current Sika Primer-215 TDS before use on site",
    ],
    limitations: [
      "Solvent-based — adequate ventilation required — do not use in confined spaces without forced ventilation and appropriate PPE",
      "Not a standalone sealant or waterproofing product — must be used as part of a complete Sika PU sealant joint system",
      "Do not apply to damp, dusty or contaminated joint faces — substrate preparation is the foundation of primer effectiveness",
      "Confirm compatibility with specific Sikaflex sealant product before use — primer selection must be matched to sealant product per Sika TDS",
      "Confirm current product specification, availability and shelf life with Sika Australia before ordering for large facade remediation programs",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply — contact for current pricing and technical guidance", url: "https://aus.sika.com" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "PU", label: "PU" },
  { id: "1C", label: "One-component" },
  { id: "Facade", label: "Facade" },
  { id: "Movement-joint", label: "Movement-joint" },
  { id: "Paintable", label: "Paintable" },
  { id: "Moisture-cure", label: "Moisture-cure" },
  { id: "Silicone", label: "Silicone" },
  { id: "Neutral-cure", label: "Neutral-cure" },
  { id: "Structural", label: "Structural" },
  { id: "Glazing", label: "Glazing" },
  { id: "Expansion-joint", label: "Expansion-joint" },
  { id: "Polysulfide", label: "Polysulfide" },
  { id: "2C", label: "Two-component" },
  { id: "Precast", label: "Precast" },
  { id: "Masonry", label: "Masonry" },
  { id: "Primer", label: "Primer" },
  { id: "Concrete", label: "Concrete" },
  { id: "Metal", label: "Metal" },
];

const BRAND_EQUIV: { system: string; sika: string; tremco: string; bostik: string }[] = [
  { system: "PU facade sealant (1C, paintable)", sika: "Sikaflex Pro-3", tremco: "—", bostik: "Seal-N-Flex Pro" },
  { system: "Neutral-cure silicone (structural glazing)", sika: "—", tremco: "Spectrem 2", bostik: "—" },
  { system: "Polysulfide sealant (2C, precast)", sika: "—", tremco: "Illbruck ME300", bostik: "—" },
  { system: "PU sealant primer", sika: "Primer-215", tremco: "—", bostik: "—" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  chemistry: string;
  cureType: string;
  paintable: string;
  primerRequired: string;
  movementAccomm: string;
  primaryUse: string;
}[] = [
  {
    product: "Sikaflex Pro-3",
    brand: "Sika",
    chemistry: "Polyurethane",
    cureType: "Moisture-cure (1C)",
    paintable: "Yes (confirm with Sika)",
    primerRequired: "Yes — Primer-215",
    movementAccomm: "High — confirm TDS",
    primaryUse: "Facade movement & expansion joints — curtain wall perimeter",
  },
  {
    product: "Tremco Spectrem 2",
    brand: "Tremco",
    chemistry: "Neutral-cure silicone",
    cureType: "Condensation-cure (1C)",
    paintable: "No",
    primerRequired: "Yes on non-glass (confirm TDS)",
    movementAccomm: "High — confirm TDS",
    primaryUse: "Structural glazing — curtain wall expansion joints",
  },
  {
    product: "Bostik Seal-N-Flex Pro",
    brand: "Bostik",
    chemistry: "Polyurethane",
    cureType: "Moisture-cure (1C)",
    paintable: "Yes (confirm with Bostik)",
    primerRequired: "Yes on porous substrates",
    movementAccomm: "High — confirm TDS",
    primaryUse: "Facade movement joints — precast panel perimeters",
  },
  {
    product: "Illbruck ME300 Polysulfide",
    brand: "Tremco",
    chemistry: "Polysulfide",
    cureType: "Two-component chemical cure",
    paintable: "Confirm TDS",
    primerRequired: "Yes — confirm TDS",
    movementAccomm: "Moderate — confirm TDS",
    primaryUse: "Precast panel joints — masonry expansion joints",
  },
  {
    product: "Sika Primer-215",
    brand: "Sika",
    chemistry: "Solvent-based primer",
    cureType: "N/A (primer only)",
    paintable: "N/A",
    primerRequired: "N/A",
    movementAccomm: "N/A",
    primaryUse: "PU sealant adhesion primer — concrete, masonry, metal",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Control and expansion joints in concrete and masonry facades on multi-storey Class 2 strata buildings",
    "Perimeter joints at aluminium curtain wall framing, window surrounds and door perimeters",
    "Precast concrete panel perimeter joints and inter-panel expansion joints",
    "Structural glazing joints in facade curtain wall systems",
    "Failed or deteriorated facade joint sealant re-sealing as part of facade remediation programs",
  ],
  selectionCriteria: [
    "Select neutral-cure silicone for joints against anodised aluminium, coated metals, glass — do not use acetoxy-cure silicone on metal facade substrates",
    "Select PU sealant where joint requires painting after cure — silicone cannot be overpainted",
    "Select two-part polysulfide for precast concrete panel joints where chemical resistance or long track record is required",
    "Joint width and depth must be designed to meet expected movement — AS 4386 requires correct width/depth ratio with backer rod installed",
    "Confirm primer selection against substrate type per manufacturer TDS — primer is mandatory on concrete and masonry facade joints",
  ],
  limitations: [
    "Acetoxy-cure (acid-cure) silicone must never be used on metal or anodised aluminium facade joints — corrosive cure by-products cause substrate damage",
    "Silicone sealants cannot be painted — joint colour must be selected against facade finish before application",
    "Three-sided adhesion in facade joints causes premature cohesive failure — backer rod mandatory in all joints wider than 5mm",
    "Two-part polysulfide requires careful on-site mixing — mixing error compromises cure — trained applicator essential",
    "Joint faces must be clean, dry and correctly primed — adhesive failure at the substrate interface is the primary facade sealant failure mode",
  ],
  standardsNotes: [
    "AS 4386 — Sealants for the construction industry — classification, requirements and test methods relevant to facade joint sealant selection",
    "AS 4284 — Testing of Building Facades — relevant to performance testing of sealed facade assemblies",
    "ISO 11600 — Building construction — jointing products — classification and requirements for sealants — referenced by some facade specifications",
    "Sealant movement accommodation class must be confirmed against joint design movement from structural or facade engineer calculations",
    "NCC / BCA — facade sealing requirements referenced in waterproofing and weatherproofing provisions for Class 2 buildings",
  ],
  suitableDefects: [
    "Failed, cracked or debonded facade control and expansion joint sealants on concrete and masonry facades",
    "Deteriorated perimeter sealants at aluminium curtain wall framing, window and door surrounds",
    "Split or failed polysulfide sealant in precast concrete panel perimeter joints",
    "Failed structural silicone joints in glazing and curtain wall facade systems",
    "Sealant missing or inadequate at facade expansion joints allowing water ingress into strata building structure",
  ],
  typicalSubstrates: [
    "Concrete and masonry facades — control joints, expansion joints, panel perimeters",
    "Precast concrete panels — inter-panel joints and perimeter sealing",
    "Anodised aluminium curtain wall framing — neutral-cure silicone only",
    "Render facades — movement joints and expansion joints in rendered external envelope systems",
    "Metal cladding perimeter joints — confirm substrate compatibility and primer requirements with manufacturer TDS",
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

export function FailedSealantsIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are facade joint sealant systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Facade joint sealant systems seal the movement joints, control joints, expansion joints and perimeter gaps in the external envelope of multi-storey buildings. These joints are essential to the weatherproofing performance of the facade — they accommodate thermal expansion, structural movement and differential settlement between facade elements while maintaining a continuous weather barrier. On Class 2 strata buildings, failed facade sealant joints are one of the most common sources of water ingress into common property and private lots.
        </p>
        <p>
          The three primary sealant chemistries used in Australian facade joint remediation are one-part polyurethane, neutral-cure silicone, and two-part polysulfide. One-part PU sealants are moisture-curing, paintable and suitable for concrete, masonry and render facades. Neutral-cure silicone is the correct choice for joints against anodised aluminium, glass, coated metals and curtain wall framing — it is non-corrosive and UV stable. Two-part polysulfide sealants provide excellent adhesion and chemical resistance on precast concrete panel perimeter joints and masonry expansion joints, with a long track record in Australian facade construction.
        </p>
        <p>
          All facade sealant joints must be formed over closed-cell backer rod to prevent three-sided adhesion, maintain the correct joint width-to-depth ratio (2:1), and allow the sealant to flex freely with facade movement. Primer is mandatory on concrete, masonry and metal substrates for reliable long-term adhesion — omission of primer is a leading cause of adhesive failure in remediated facade joints. AS 4386 provides the classification framework for facade joint sealants in Australia.
        </p>
        <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
          <p className="mb-2 text-xs font-bold text-slate-700">Do not confuse with:</p>
          <ul className="space-y-1.5">
            {[
              "Acetoxy-cure (acid-cure) silicone — corrosive to metals and anodised aluminium — never use on metal facade substrates or curtain wall framing",
              "Tile wet area sealants — rated for interior wet area use only — not formulated for facade UV and weathering exposure",
              "Structural adhesives — bond components together and do not accommodate joint movement — not a sealant substitute",
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

export function FailedSealantsProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">5 products — 4 brands — facade joint sealant systems — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side technical comparison of facade joint sealant products. Confirm current product specifications with manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Chemistry</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Cure type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Paintable</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Primer required</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Movement accomm.</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.chemistry}</td>
                  <td className="px-4 py-3 text-slate-600">{row.cureType}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold ${row.paintable.startsWith("Yes") ? "bg-green-50 text-green-700" : row.paintable === "No" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`}>
                      {row.paintable}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{row.primerRequired}</td>
                  <td className="px-4 py-3 text-slate-600">{row.movementAccomm}</td>
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
            <p className="mt-1 text-sm text-slate-500">Facade sealant equivalents across brands active in Australian Class 2 strata remediation.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#ef4444" }}>Sika</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#22c55e" }}>Tremco</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#8b5cf6" }}>Bostik</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.sika, row.tremco, row.bostik].map((val, j) => (
                    <td key={j} className="px-4 py-3 text-slate-600">{val === "—" ? <span className="text-slate-300">—</span> : val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Warning callouts — BELOW comparison table only ── */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-amber-900">Backer rod mandatory in facade joints</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Three-sided adhesion in facade sealant joints causes premature cohesive failure — closed-cell backer rod must be installed in all joints wider than 5mm before sealant application. Without backer rod, the sealant bonds to the bottom of the joint as well as the two sides, preventing the hourglass deformation required for movement accommodation and causing the sealant to split under thermal cycling.",
            "Joint width-to-depth ratio must be maintained at approximately 2:1 — for example, a 20mm wide joint should have a sealant depth of approximately 10mm. Backer rod controls this ratio by setting the joint depth. Over-deep sealant joints are stiffer and accommodate less movement; over-shallow joints have insufficient bond area and are prone to adhesive failure.",
            "Closed-cell polyethylene backer rod is the standard specification for facade joints — it is non-absorbent, compressible, and does not bond to the sealant (providing the bond break on the third face). Open-cell backer rod absorbs moisture and is not suitable for facade weatherproofing joints.",
            "Confirm backer rod diameter against joint width — backer rod should be 25% larger than the joint width so it compresses into the joint and seats correctly without movement. Undersized backer rod will not seat correctly and will allow sealant to wrap around and bond to the third face.",
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
