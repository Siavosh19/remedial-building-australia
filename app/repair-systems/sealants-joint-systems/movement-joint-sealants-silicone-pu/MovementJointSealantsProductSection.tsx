"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Silicone"
  | "Polyurethane"
  | "Hybrid-PU"
  | "Neutral-cure"
  | "Acetoxy-cure"
  | "Structural"
  | "Weatherseal"
  | "Facade-joint"
  | "Movement-joint"
  | "Expansion-joint"
  | "High-movement"
  | "1C"
  | "UV-stable"
  | "Paintable"
  | "ISO-11600";

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
    fullLabel: "Dow",
    brandUrl: "https://www.dow.com",
    tdsUrl: "https://www.dow.com",
    accentColor: "#0066cc",
    name: "Dow Corning 795",
    descriptionLine: "Neutral-cure structural silicone sealant — façade glazing and curtain wall joints",
    productType: "Neutral-cure silicone",
    filterTags: ["Silicone", "Neutral-cure", "Structural", "Facade-joint", "Movement-joint", "UV-stable", "ISO-11600", "1C"],
    techChips: [
      { label: "Neutral-cure silicone", cls: "bg-sky-100 text-sky-800" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
      { label: "UV stable", cls: "bg-amber-50 text-amber-700" },
      { label: "Structural glazing", cls: "bg-slate-100 text-slate-700" },
      { label: "ISO 11600", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Dow Corning 795 is a one-component neutral-cure structural silicone sealant used for structural glazing and high-performance weatherseal applications on curtain wall, window and façade systems. In Australian Class 2 and commercial building remediation it is specified for structural joint sealing where high movement capacity, UV resistance and adhesion to glass, metal, masonry and concrete are required. Joints must be designed with a backing rod, correct width-to-depth ratio and compatible surface primer where required. Confirm compatibility with substrate coatings and contact Dow technical before specifying over existing sealant.",
    technicalProperties: [
      "Neutral-cure — does not release acetic acid — suitable for use on metals, stone, masonry and porous substrates",
      "High movement capacity — typically ±25% or greater depending on joint width — confirm with current Dow TDS",
      "Excellent UV and weathering resistance — does not chalk, crack or degrade under direct sun exposure",
      "Structural performance — suitable for structural glazing where two-sided or four-sided adhesion is required",
      "ISO 11600 classified — confirm exact classification category with current Dow TDS before specifying",
    ],
    limitations: [
      "Not suitable for use over existing non-compatible sealant without full removal — adhesion will not be achieved over incompatible old sealant",
      "Substrate primers required on many substrates — confirm from Dow technical data sheet for each specific substrate",
      "Joint design must comply with manufacturer guide — minimum width and depth must be calculated from anticipated movement",
      "Do not use where chemical exposure (acids, fuels, oils) is anticipated without confirming chemical resistance with Dow",
      "Confirm current product name, specification and ISO 11600 classification with Dow Australia before specifying",
    ],
    procurementSources: [
      { name: "Dow Australia — trade supply — contact for current pricing", url: "https://www.dow.com" },
      { name: "GlassTec and façade glazing distributors — confirm regional availability", url: "https://www.dow.com" },
    ],
  },
  {
    fullLabel: "Dow",
    brandUrl: "https://www.dow.com",
    tdsUrl: "https://www.dow.com",
    accentColor: "#0066cc",
    name: "Dow Corning 791",
    descriptionLine: "Acetoxy-cure silicone weatherproofing sealant — perimeter window and door sealing",
    productType: "Acetoxy-cure silicone",
    filterTags: ["Silicone", "Acetoxy-cure", "Weatherseal", "Facade-joint", "Movement-joint", "UV-stable", "1C"],
    techChips: [
      { label: "Acetoxy-cure silicone", cls: "bg-violet-100 text-violet-800" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
      { label: "UV stable", cls: "bg-amber-50 text-amber-700" },
      { label: "Weatherseal", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Dow Corning 791 is a one-component acetoxy-cure silicone sealant for perimeter window, door and general façade weathersealing on Australian remediation projects. Acetoxy-cure silicone releases acetic acid during cure — not suitable for use on porous stone, concrete, mortar or metals where acetic acid may cause staining or corrosion. Commonly used for aluminium window frame perimeter sealing and glass-to-frame joints. Confirm substrate compatibility before specifying — acetoxy cure is not suitable for all substrates.",
    technicalProperties: [
      "Acetoxy-cure — one-component — no mixing required — fast cure in humid conditions",
      "Good UV and weathering resistance — suitable for external exposure on window and door perimeters",
      "Excellent adhesion to glass, aluminium and many plastics without primer",
      "Widely available through hardware and trade supply channels nationally",
      "Fast skin-over time — can be tooled quickly after application",
    ],
    limitations: [
      "Acetoxy-cure releases acetic acid during cure — not for use on porous stone, natural stone, concrete, mortar or galvanised steel — staining and corrosion risk",
      "Not a structural sealant — do not specify for structural glazing — use Dow 795 or equivalent neutral-cure structural silicone",
      "Lower movement capacity than neutral-cure structural silicone — confirm against joint design requirements",
      "Confirm compatibility with painted or powder-coated surfaces — acetic acid release may affect some coatings",
      "Confirm current product name and specification with Dow Australia before specifying",
    ],
    procurementSources: [
      { name: "Dow Australia — trade supply — contact for current pricing", url: "https://www.dow.com" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Hardware and building trade supply nationally", url: "https://www.dow.com" },
    ],
  },
  {
    fullLabel: "Tremco CPG Australia",
    brandUrl: "https://www.tremcosealants.com.au",
    tdsUrl: "https://www.tremcosealants.com.au",
    accentColor: "#22c55e",
    name: "Tremco Spectrem 2",
    descriptionLine: "Neutral-cure high-movement silicone sealant — ISO 11600 Class 25 façade and curtain wall joints",
    productType: "Neutral-cure silicone",
    filterTags: ["Silicone", "Neutral-cure", "Weatherseal", "Facade-joint", "Movement-joint", "UV-stable", "ISO-11600", "1C", "High-movement"],
    techChips: [
      { label: "Neutral-cure silicone", cls: "bg-sky-100 text-sky-800" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
      { label: "High movement — ±25%", cls: "bg-green-50 text-green-700" },
      { label: "UV stable", cls: "bg-amber-50 text-amber-700" },
      { label: "ISO 11600 Class 25", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Tremco Spectrem 2 is a one-component neutral-cure high-movement silicone sealant for exterior façade, curtain wall and glazing joint applications on Class 2 and commercial buildings in Australia. ISO 11600 classified for high-movement façade applications. Neutral-cure system — no acetic acid release — suitable for a wider substrate range including porous masonry, concrete and metals. Used in façade joint sealing, curtain wall weathersealing and perimeter flashing applications. Part of Tremco CPG's complete façade sealant system — warranted when used with compatible Tremco primers throughout.",
    technicalProperties: [
      "Neutral-cure — no acetic acid release — suitable for metals, masonry, concrete and porous substrates",
      "High movement capacity — ISO 11600 Class 25 — ±25% movement — suitable for façade and curtain wall joints",
      "UV stable — does not chalk, crack or degrade under direct sun exposure on external façades",
      "One-component — no mixing — suitable for field application by contractors",
      "Part of Tremco CPG system — system warranty when used with Tremco-compatible primers throughout",
    ],
    limitations: [
      "Primer required on many substrates — confirm primer selection from Tremco TDS and application guide for each substrate",
      "System warranty requires use of Tremco-specified primers — do not substitute with other brand primers",
      "Tremco CPG distribution in Australia more limited than Sika or Dow — confirm local availability before specifying",
      "Confirm current product specification and ISO 11600 classification with Tremco CPG Australia before specifying",
    ],
    procurementSources: [
      { name: "Tremco CPG Australia — trade supply — contact for current pricing", url: "https://www.tremcosealants.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com",
    accentColor: "#cc0000",
    name: "Sika Sikaflex-11 FC+",
    descriptionLine: "One-component polyurethane sealant and adhesive — general purpose façade and construction joints",
    productType: "One-component polyurethane",
    filterTags: ["Polyurethane", "Facade-joint", "Movement-joint", "Weatherseal", "1C", "ISO-11600", "Paintable"],
    techChips: [
      { label: "One-component PU", cls: "bg-sky-100 text-sky-800" },
      { label: "Sealant & adhesive", cls: "bg-slate-100 text-slate-700" },
      { label: "Paintable", cls: "bg-green-50 text-green-700" },
      { label: "ISO 11600 Class 25", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sika Sikaflex-11 FC+ is a one-component moisture-curing polyurethane sealant and adhesive widely used in Australian construction and remediation for façade, balcony, wall and floor joints. Suitable for sealing joints in concrete, masonry, metal, wood and most plastics. Can be painted after full cure. Used extensively in Class 2 strata remediation for sealing non-structural movement joints, window perimeter sealing, balcony edge joints and general construction joint sealing. Confirm joint width, depth and movement expectations against manufacturer joint design guidance before specifying.",
    technicalProperties: [
      "One-component PU — moisture cures — no mixing required — straightforward field application",
      "Dual-function sealant and adhesive — one product for sealing and bonding applications",
      "Paintable after full cure — suitable for colour-matched repair in visible locations",
      "ISO 11600 Class 25 — ±25% movement capacity — suitable for general construction and façade movement joints",
      "Good adhesion to concrete, masonry, metal, wood and most plastics — confirm primer requirements per substrate from Sika TDS",
    ],
    limitations: [
      "Not a structural sealant — do not specify for structural glazing — use Sika structural silicone for structural glazing applications",
      "Lower UV resistance than silicone — may discolour with prolonged direct sun exposure on some colours",
      "Primer required on certain substrates — confirm from Sika TDS per substrate combination before application",
      "Confirm compatibility of topcoat or paint before applying over cured sealant",
      "Confirm current product name, specification and ISO 11600 classification with Sika Australia before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply — contact for current pricing", url: "https://aus.sika.com" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Hardware and building trade supply nationally", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com",
    accentColor: "#cc0000",
    name: "Sika Sikaflex-PRO-3 WF",
    descriptionLine: "One-component weatherproofing polyurethane sealant — façade, balcony and movement joints",
    productType: "One-component polyurethane",
    filterTags: ["Polyurethane", "Facade-joint", "Movement-joint", "Weatherseal", "Expansion-joint", "1C", "UV-stable", "ISO-11600", "High-movement"],
    techChips: [
      { label: "One-component PU", cls: "bg-sky-100 text-sky-800" },
      { label: "Weatherproofing grade", cls: "bg-slate-100 text-slate-700" },
      { label: "UV resistant", cls: "bg-amber-50 text-amber-700" },
      { label: "ISO 11600 Class 25", cls: "bg-amber-50 text-amber-700" },
      { label: "High movement", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Sika Sikaflex-PRO-3 WF is a one-component moisture-curing polyurethane weatherproofing sealant for façade, balcony, horizontal and vertical movement joint applications in Class 2 and commercial building remediation. Designed for higher movement applications and improved UV resistance compared to Sikaflex-11 FC+. Commonly specified for façade joint sealing on concrete, masonry and fibre cement cladding systems. Confirm primer selection per substrate from Sika TDS and application guide. Confirm current product name and specification with Sika Australia.",
    technicalProperties: [
      "One-component PU — moisture cures — ISO 11600 Class 25 — ±25% movement capacity",
      "Improved UV and weathering resistance over general purpose PU — better colour stability in direct sun exposure",
      "Suitable for both horizontal and vertical joint orientations — versatile for balcony deck and façade applications",
      "Good adhesion to concrete, masonry, fibre cement, metal and primed timber",
      "Weatherproofing grade — designed for external exposure in Australian climate conditions",
    ],
    limitations: [
      "Primer required on many substrates — mandatory on smooth concrete, steel and dense surfaces — confirm from Sika TDS",
      "Moisture-curing PU — do not apply to wet or damp surfaces — substrate moisture content must meet Sika requirements",
      "Not a structural sealant — do not use in structural glazing applications",
      "Movement capacity is lower than silicone — for very high-movement expansion joints specify high-movement silicone",
      "Confirm current product specification, ISO 11600 classification and local availability with Sika Australia before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply — contact for current pricing", url: "https://aus.sika.com" },
      { name: "Sika national distribution network", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au",
    accentColor: "#e63a22",
    name: "Mapei Mapeflex PU50",
    descriptionLine: "One-component polyurethane sealant — movement and construction joints in Class 2 and commercial buildings",
    productType: "One-component polyurethane",
    filterTags: ["Polyurethane", "Facade-joint", "Movement-joint", "Weatherseal", "Expansion-joint", "1C", "ISO-11600", "Paintable"],
    techChips: [
      { label: "One-component PU", cls: "bg-sky-100 text-sky-800" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Paintable", cls: "bg-green-50 text-green-700" },
      { label: "ISO 11600", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Mapei Mapeflex PU50 is a one-component moisture-curing polyurethane sealant for movement and construction joints in Class 2 strata, commercial and industrial building applications in Australia. Suitable for vertical and horizontal joint applications on concrete, masonry, wood, aluminium and most plastics. Used for sealing movement joints in balcony floors, façade joints, expansion joints between structural elements and control joints in concrete slabs. Paintable after full cure. Confirm primer requirements per substrate from Mapei TDS.",
    technicalProperties: [
      "One-component PU — moisture cures — no site mixing — suitable for contractor application on remediation sites",
      "Suitable for horizontal and vertical joint orientations — versatile for construction and remediation joint sealing",
      "Paintable after full cure — suitable for colour-matched repairs in visible locations",
      "ISO 11600 classified — confirm exact classification category with current Mapei TDS before specifying",
      "Good adhesion to concrete, masonry, wood, aluminium and most plastics with correct surface preparation",
    ],
    limitations: [
      "Primer required on many substrates — confirm from Mapei TDS before application on smooth concrete, metal or dense surfaces",
      "Not a structural sealant — do not use in structural glazing applications",
      "Moisture-curing — do not apply to wet or damp substrates — allow adequate dry time before sealing",
      "Confirm current product name, specification and local availability with Mapei Australia before specifying — product range subject to periodic revision",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply — contact for current pricing", url: "https://www.mapei.com/au" },
      { name: "Mapei national distribution network — confirm regional availability", url: "https://www.mapei.com/au" },
    ],
  },
  {
    fullLabel: "Tremco CPG Australia",
    brandUrl: "https://www.tremcosealants.com.au",
    tdsUrl: "https://www.tremcosealants.com.au",
    accentColor: "#22c55e",
    name: "Tremco Dymonic",
    descriptionLine: "One-component hybrid polyurethane sealant — high-movement façade and construction joints",
    productType: "One-component polyurethane-hybrid",
    filterTags: ["Polyurethane", "Hybrid-PU", "Facade-joint", "Movement-joint", "Weatherseal", "Expansion-joint", "1C", "ISO-11600", "High-movement"],
    techChips: [
      { label: "One-component PU-hybrid", cls: "bg-violet-100 text-violet-800" },
      { label: "High movement", cls: "bg-green-50 text-green-700" },
      { label: "ISO 11600 Class 25", cls: "bg-amber-50 text-amber-700" },
      { label: "Façade grade", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Tremco Dymonic is a one-component hybrid polyurethane sealant for high-movement façade and construction joint applications on Class 2 and commercial buildings in Australia. Product type is one-component polyurethane-hybrid — confirm exact polymer chemistry classification with Tremco CPG Australia technical before specifying. Used in façade remediation for sealing control joints, expansion joints, window perimeters and horizontal deck joints. Part of Tremco CPG's façade sealant system — warranted when used with compatible Tremco-specified primers throughout.",
    technicalProperties: [
      "One-component PU-hybrid — good movement capacity — suitable for high-movement façade and construction joints",
      "ISO 11600 classified — confirm current classification with Tremco CPG TDS before specifying",
      "Suitable for vertical and horizontal joint orientations — versatile for remediation applications",
      "Part of Tremco CPG façade system — system warranty when used with Tremco-compatible primers",
      "Good adhesion to concrete, masonry, fibre cement, metal and primed substrates",
    ],
    limitations: [
      "Primer required on most substrates — do not apply without primer on smooth concrete, metal or dense surfaces — confirm from Tremco TDS",
      "System warranty requires Tremco-specified primers throughout — do not substitute with other brand primers",
      "PU-hybrid — confirm elongation and movement capacity against project specification before selecting",
      "Tremco CPG distribution in Australia more limited than Sika or Dow — confirm local availability before specifying",
      "Confirm current product name, specification and ISO 11600 classification with Tremco CPG Australia before specifying",
    ],
    procurementSources: [
      { name: "Tremco CPG Australia — trade supply — contact for current pricing", url: "https://www.tremcosealants.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Silicone", label: "Silicone" },
  { id: "Polyurethane", label: "Polyurethane" },
  { id: "Hybrid-PU", label: "PU-hybrid" },
  { id: "Neutral-cure", label: "Neutral-cure" },
  { id: "Acetoxy-cure", label: "Acetoxy-cure" },
  { id: "Structural", label: "Structural" },
  { id: "Weatherseal", label: "Weatherseal" },
  { id: "Facade-joint", label: "Façade joint" },
  { id: "Movement-joint", label: "Movement joint" },
  { id: "Expansion-joint", label: "Expansion joint" },
  { id: "High-movement", label: "High movement" },
  { id: "1C", label: "One-component" },
  { id: "UV-stable", label: "UV stable" },
  { id: "Paintable", label: "Paintable" },
  { id: "ISO-11600", label: "ISO 11600" },
];

const BRAND_EQUIV: { system: string; dow: string; sika: string; mapei: string; tremco: string }[] = [
  { system: "Silicone neutral-cure — structural / high-movement", dow: "795", sika: "Sikasil structural*", mapei: "—", tremco: "Spectrem 2" },
  { system: "Silicone acetoxy-cure — weatherseal / window perimeter", dow: "791", sika: "Sikasil-GP*", mapei: "—", tremco: "—" },
  { system: "PU 1C — general purpose sealant / adhesive", dow: "—", sika: "Sikaflex-11 FC+", mapei: "Mapeflex PU50", tremco: "—" },
  { system: "PU 1C — weatherproofing façade / high movement", dow: "—", sika: "Sikaflex-PRO-3 WF", mapei: "—", tremco: "Dymonic" },
];

const TECH_INFO = {
  typicalApplications: [
    "Movement joint sealing in concrete façades and cladding systems on Class 2 strata buildings",
    "Perimeter window and door frame sealing — weatherproofing joint between frame and structure",
    "Expansion joint sealing in concrete slabs, balcony decks and podium structures",
    "Control joint sealing in rendered and masonry façades",
    "Curtain wall and glazing weatherseal joint applications",
    "Remediation re-sealing of failed or failed-adhesion existing sealant joints",
  ],
  selectionCriteria: [
    "Silicone vs polyurethane — silicone offers better UV resistance and longer life in direct sun exposure; PU offers paintability and stronger adhesion to some substrates",
    "Neutral-cure vs acetoxy-cure silicone — neutral-cure for metals, masonry and porous substrates; acetoxy for glass and aluminium window joints only",
    "Confirm movement capacity against joint design requirements — ISO 11600 Class 25 (±25%) is standard for most façade and movement joints",
    "Check substrate compatibility — confirm primer requirements for each substrate from manufacturer TDS before application",
    "Confirm paintability requirement — PU sealants are generally paintable after cure; silicone sealants are not paintable without special topcoat",
    "Joint design is critical — correct width-to-depth ratio, bond breaker tape and backing rod are mandatory for all movement joint sealant applications",
  ],
  limitations: [
    "Backing rod and bond breaker tape mandatory for all movement joints — without bond breaker, three-sided adhesion causes cohesive failure",
    "Joint design must comply with manufacturer's specification — minimum joint width must be calculated from anticipated maximum movement",
    "Primer mandatory on most substrates — incorrect or omitted primer is the primary cause of sealant adhesion failure",
    "Do not apply sealant over existing failed sealant without confirming adhesion compatibility — old sealant must be removed in most cases",
    "Substrate must be clean, dry and within manufacturer's moisture limits at time of application",
    "Silicone sealants are generally not paintable — specify PU if sealant must be painted to match façade",
  ],
  standardsNotes: [
    "ISO 11600 — Classification and Requirements for Joint Sealants for Building Construction — primary sealant classification standard",
    "ISO 11600 Class 25 — ±25% movement capacity — standard minimum for external façade and movement joints",
    "ISO 11600 Class F — façade designation — for non-submerged external applications",
    "AS 4055 — Wind Loads for Housing — referenced for window joinery perimeter sealant design in residential buildings",
    "NCC Volume One — performance requirements for weatherproofing of Class 2 building envelopes",
    "ASTM C920 — US sealant standard — referenced on some manufacturer TDS for Australian-distributed products",
  ],
  suitableDefects: [
    "Failed movement joint sealants — cohesive failure, adhesive failure, hardening, cracking or loss of sealant from joint",
    "Water ingress through façade joints — horizontal and vertical movement joints in concrete and masonry façades",
    "Failed window and door perimeter sealing — water ingress at frame-to-wall junction",
    "Failed curtain wall weatherseal joints — air and water infiltration through curtain wall panel joints",
    "Expansion joint failure — loss of sealant or membrane at structural expansion joints in balcony or podium slabs",
  ],
  typicalSubstrates: [
    "In-situ reinforced concrete — primed per manufacturer requirements — confirm primer per substrate condition",
    "Precast concrete façade panels — confirm surface condition and primer requirements before sealing",
    "Aluminium window frames and curtain wall framing — confirm primer and cure type (neutral vs acetoxy)",
    "Rendered masonry façades — confirm render condition and compatibility with sealant system",
    "Fibre cement cladding — confirm primer requirement per manufacturer TDS for specific substrate",
    "Previously sealed joints — confirm removal of old sealant, clean substrate and adhesion testing before re-sealing",
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

export function MovementJointSealantsIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are movement joint sealants?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          This category covers silicone and polyurethane movement joint sealants used in Australian Class 2 strata, commercial and façade remediation. Sealants seal joints between structural and non-structural elements — façade panels, window frames, expansion joints, control joints, and balcony edge and deck joints. Product selection must consider sealant chemistry (silicone vs PU), cure type (neutral vs acetoxy for silicone), movement capacity (ISO 11600 classification), substrate compatibility, primer requirement, joint design (width, depth, backing rod, bond breaker), UV exposure, and whether the sealant must be paintable after cure.
        </p>
      </div>
      <div className="mt-5 space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Do not confuse with:</p>
        <ul className="space-y-1.5">
          {[
            "Expansion joint cover systems — proprietary mechanical cover plates for wide structural expansion joints — not sealant-based",
            "Polysulfide sealants — two-component systems with different chemistry — not silicone or PU",
            "Fire-rated intumescent joint sealants — passive fire protection products — not standard weatherseal sealants",
            "Epoxy joint fillers — rigid, non-moving joint compounds — not movement joint sealants",
            "Backing rod alone — bond breaker foam — not a sealant — must be used in conjunction with sealant, not instead of it",
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

export function MovementJointSealantsProductSection() {
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
      : PRODUCTS.filter((p) =>
          Array.from(activeFilters).every((f) => p.filterTags.includes(f))
        );

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
              Applications, selection criteria, limitations, standards, suitable defects and substrates
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
            <p className="mt-1 text-sm text-slate-500">7 products — 4 brands — silicone and polyurethane movement joint sealants — scroll to view all</p>
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
                  active
                    ? "border-sky-950 bg-sky-950 text-white"
                    : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
                }`}
              >
                {f.label}
              </button>
            );
          })}
          {activeFilters.size > 0 && (
            <button
              type="button"
              onClick={() => setActiveFilters(new Set())}
              className="text-xs text-slate-400 underline hover:text-slate-600"
            >
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

      {/* ── Brand Equivalents ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Brand Equivalents</h2>
            <p className="mt-1 text-sm text-slate-500">
              Silicone and PU movement joint sealant equivalents across brands active in Australian Class 2 and commercial building remediation. * Confirm exact product and classification with manufacturer before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">
                  System type
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#0066cc" }}>Dow</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#cc0000" }}>Sika</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#e63a22" }}>Mapei</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#22c55e" }}>Tremco</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">
                    {row.system}
                  </td>
                  {[row.dow, row.sika, row.mapei, row.tremco].map((val, j) => (
                    <td key={j} className="px-4 py-3 text-slate-600">
                      {val === "—" ? <span className="text-slate-300">—</span> : val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Joint Design Warning — BELOW comparison table ── */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-amber-900">Critical — Joint Design and Backing Rod</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Backing rod is mandatory for all movement joint sealant applications — bond breaker tape or closed-cell polyethylene foam rod must be installed before sealant application to prevent three-sided adhesion",
            "Three-sided adhesion causes cohesive failure — if sealant bonds to the back of the joint as well as the two joint faces, the sealant cannot stretch without tearing",
            "Joint width must be designed from anticipated maximum movement — minimum 6 mm joint width; width must be at least 4× the movement for ISO 11600 Class 25 sealants",
            "Joint depth must be controlled — depth should be approximately half the joint width for elastomeric sealants — confirm with manufacturer TDS",
            "Do not apply sealant in temperatures below 5°C or above 40°C without confirming manufacturer's temperature application limits",
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
