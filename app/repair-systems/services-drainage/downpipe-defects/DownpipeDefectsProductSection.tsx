"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Downpipe"
  | "PVC"
  | "Colorbond"
  | "Steel"
  | "Aluminium"
  | "Copper"
  | "UV-stabilised"
  | "Round"
  | "Square"
  | "Penetration"
  | "Collar"
  | "EPDM"
  | "Sealant"
  | "PU";

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
    fullLabel: "Vinidex",
    brandUrl: "https://www.vinidex.com.au",
    accentColor: "#ef4444",
    name: "Vinidex PVC Round Downpipe DN100",
    descriptionLine: "UV-stabilised PVC round downpipe DN100 for rainwater discharge from gutters — lightweight, corrosion-free, available in standard lengths and colours",
    productType: "UV-stabilised PVC round downpipe DN100",
    filterTags: ["Downpipe", "PVC", "UV-stabilised", "Round"],
    techChips: [
      { label: "UV-stabilised PVC", cls: "bg-sky-100 text-sky-800" },
      { label: "DN100 round", cls: "bg-slate-100 text-slate-700" },
      { label: "Corrosion-free", cls: "bg-green-50 text-green-700" },
      { label: "Rainwater discharge", cls: "bg-slate-100 text-slate-700" },
      { label: "AS/NZS 3500.3", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Vinidex UV-stabilised PVC round downpipe DN100 is a standard Australian downpipe for rainwater discharge from residential and low-rise commercial buildings. PVC construction is lightweight, corrosion-free, and does not require painting or protective coating. Available in standard lengths (typically 6 m) with matching bends, offsets, shoes and brackets. Colour-coded or paintable to match building facade or gutter colour.\n\nCommonly used as a direct replacement for failed PVC or galvanised steel downpipes in Class 2 strata apartment building remediation. Confirm current available colour range, bracket centres and jointing method with Vinidex before specifying — joint at each storey level must include a push-fit or solvent-welded socket to allow thermal expansion.",
    technicalProperties: [
      "UV-stabilised PVC — resistant to UV degradation and colour fade over service life — no painting required",
      "Lightweight — DN100 nominal bore — suitable for residential and low-rise commercial roof catchment areas",
      "Full system of matching fittings — bends, offsets, shoes, brackets and leaf guards available from Vinidex",
      "Corrosion-free — not subject to galvanic or chemical corrosion — suitable for coastal and industrial environments",
      "Push-fit or solvent-welded jointing — confirm expansion allowance at each storey level with Vinidex TDS",
    ],
    limitations: [
      "PVC is subject to thermal expansion — expansion provisions at each floor level are mandatory — confirm bracket and jointing method",
      "Not suitable for heritage buildings where existing downpipes are copper, cast iron or lead — colour match may not be achievable",
      "Impact damage from vehicles or plant in trafficable areas — protect with bollards or masonry surrounds where exposed",
      "Solvent-welded joints are permanent — push-fit joints allow thermal movement but must be clipped to prevent pullout",
      "Confirm current product specification and compliance with Vinidex before specifying",
    ],
    procurementSources: [
      { name: "Vinidex — trade supply — contact for current pricing and colour availability", url: "https://www.vinidex.com.au" },
      { name: "Reece Plumbing — trade nationally", url: "https://www.reece.com.au" },
      { name: "Tradelink — trade nationally", url: "https://www.tradelink.com.au" },
    ],
  },
  {
    fullLabel: "Lysaght",
    brandUrl: "https://www.lysaght.com",
    accentColor: "#f97316",
    name: "Lysaght Square Line Downpipe",
    descriptionLine: "Pre-formed Colorbond steel square downpipe — compatible with Lysaght fascia gutters, available in full Colorbond colour range",
    productType: "Colorbond steel square downpipe for pitched roofs",
    filterTags: ["Downpipe", "Colorbond", "Steel", "Square"],
    techChips: [
      { label: "Colorbond steel", cls: "bg-sky-100 text-sky-800" },
      { label: "Square profile", cls: "bg-slate-100 text-slate-700" },
      { label: "Pre-painted", cls: "bg-green-50 text-green-700" },
      { label: "Full colour range", cls: "bg-slate-100 text-slate-700" },
      { label: "AS/NZS 3500.3", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Lysaght Square Line Downpipe is a pre-formed Colorbond steel square-profile downpipe compatible with Lysaght fascia gutter systems. Available in the full BlueScope Colorbond colour range, making it the standard replacement for existing Colorbond steel downpipes on low-to-medium rise residential buildings in Australia. Roll-formed from BlueScope Colorbond steel with pre-painted exterior finish — no field painting required.\n\nThe square profile fits neatly against wall faces and corners and accepts matching Lysaght Square Line bends, offsets, shoes and brackets. Confirm current colour range, bracket centres, and junction box availability with Lysaght before specifying — colour match to existing Colorbond gutter is critical in strata remediation to avoid owner body approval issues.",
    technicalProperties: [
      "Pre-formed Colorbond steel — full BlueScope colour range — matches Lysaght fascia and quad gutter system colours",
      "Square profile — low visual profile against wall face — compatible with Lysaght Square Line fittings system",
      "Pre-painted factory finish — no field painting required under normal conditions",
      "Long service life in Australian climate — Colorbond steel corrosion resistance well established",
      "Matching Lysaght fittings — bends, shoes, brackets, offset pieces and junction boxes available in same colour",
    ],
    limitations: [
      "Cut ends must be touch-up painted immediately after cutting to prevent corrosion at exposed steel edges",
      "Not suitable where existing downpipes are PVC, copper or aluminium — material change requires strata body approval",
      "Galvanic corrosion risk if in direct contact with copper or bare aluminium fittings — use non-metallic or coated fixings",
      "Colour match to aged Colorbond gutters may not be achievable — confirm current colour availability against existing gutter",
      "Confirm current product specification and compliance with Lysaght before specifying",
    ],
    procurementSources: [
      { name: "Lysaght — trade supply via BlueScope distribution network — contact for current pricing", url: "https://www.lysaght.com" },
      { name: "Stratco — national roofing and guttering trade supply", url: "https://www.stratco.com.au" },
      { name: "Roofline distributors — confirm current stock and colour availability locally", url: "https://www.lysaght.com" },
    ],
  },
  {
    fullLabel: "Calder",
    brandUrl: "https://www.calder.com.au",
    accentColor: "#eab308",
    name: "Calder Copper Round Downpipe",
    descriptionLine: "Seamless copper tube downpipe for heritage or premium replacement where existing downpipes are copper — develops natural patina, extremely long service life",
    productType: "Seamless copper tube downpipe for heritage buildings",
    filterTags: ["Downpipe", "Copper", "Round"],
    techChips: [
      { label: "Seamless copper tube", cls: "bg-sky-100 text-sky-800" },
      { label: "Round profile", cls: "bg-slate-100 text-slate-700" },
      { label: "Heritage match", cls: "bg-amber-50 text-amber-700" },
      { label: "Natural patina", cls: "bg-slate-100 text-slate-700" },
      { label: "AS/NZS 3500.3", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Calder Copper Round Downpipe is a seamless copper tube downpipe for heritage or premium residential buildings where existing downpipes are copper. Copper develops a natural green patina over time, matching aged copper gutters and downpipes on heritage-listed and pre-war apartment buildings. Extremely long service life under Australian conditions — copper is not subject to UV degradation, rust, or paint failure.\n\nSeamless tube construction eliminates longitudinal seam failure. Jointing by solder, compression fittings, or push-fit copper fittings — confirm jointing method with Calder and the relevant plumbing authority before specifying. Do not use copper in direct galvanic contact with aluminium or steel without isolating fittings — confirm material compatibility with existing gutter outlet and building fixings.",
    technicalProperties: [
      "Seamless copper tube — no longitudinal seam — eliminates seam corrosion and joint failure over service life",
      "Heritage material match — suitable for heritage-listed buildings where copper is required by heritage order or owner approval",
      "Develops natural patina over time — no painting required — extremely low maintenance over service life",
      "Extremely long service life — copper downpipes in Australian buildings routinely exceed 50–80 years of service",
      "Compatible with copper soldering and compression jointing systems — full range of bends, shoes, offsets and brackets available",
    ],
    limitations: [
      "High material cost compared to PVC or Colorbond steel — not economically justified except for heritage match or premium specification",
      "Galvanic corrosion — do not allow direct contact between copper and aluminium, galvanised steel or other dissimilar metals",
      "Do not discharge from copper downpipes onto zinc or galvanised roofing surfaces — copper run-off causes accelerated corrosion",
      "Soldering requires licenced plumber — compression or push-fit jointing may be preferred in remediation to avoid hot work permits",
      "Confirm current product specification and compliance with Calder before specifying",
    ],
    procurementSources: [
      { name: "Calder — trade supply — contact for current pricing and available diameters", url: "https://www.calder.com.au" },
      { name: "Reece Plumbing — trade nationally — confirm copper downpipe stock", url: "https://www.reece.com.au" },
    ],
  },
  {
    fullLabel: "Deks",
    brandUrl: "https://www.deks.com.au",
    accentColor: "#22c55e",
    name: "Deks D-1 Multi Pipe Flashing Collar",
    descriptionLine: "EPDM rubber self-sealing pipe collar for downpipe penetrations through roofs and external walls — suits DN50–DN100 pipe diameter",
    productType: "EPDM self-sealing pipe penetration collar for roof/wall penetrations",
    filterTags: ["Penetration", "Collar", "EPDM", "Downpipe"],
    techChips: [
      { label: "EPDM rubber collar", cls: "bg-sky-100 text-sky-800" },
      { label: "Self-sealing", cls: "bg-green-50 text-green-700" },
      { label: "DN50–DN100", cls: "bg-slate-100 text-slate-700" },
      { label: "Roof / wall penetration", cls: "bg-slate-100 text-slate-700" },
      { label: "UV-stabilised", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Deks D-1 Multi Pipe Flashing Collar is an EPDM rubber self-sealing pipe penetration collar for sealing downpipe penetrations through roof surfaces and external walls. The EPDM rubber base self-seals around the pipe diameter when the collar is pressed over the pipe — no additional sealant required at the pipe-to-collar interface under standard installation conditions. Available in sizes to suit DN50–DN100 pipe diameters.\n\nThe aluminium or polymer base flange is bedded and fixed to the roof or wall substrate and lapped or integrated with the adjacent flashing or waterproofing membrane. EPDM rubber is UV-stabilised for long service life under Australian sun. Widely used in remediation of failed lead or silicone pipe collars at downpipe roof penetrations in Class 2 strata apartment buildings.",
    technicalProperties: [
      "EPDM rubber self-sealing collar — seals around pipe diameter without additional sealant at the pipe-to-collar interface",
      "UV-stabilised EPDM — suitable for exposed roof penetrations in Australian conditions — long outdoor service life",
      "Suits DN50–DN100 pipe outside diameter — confirm exact collar size against pipe OD before ordering",
      "Aluminium or polymer base flange — integrate with adjacent roof membrane or flashing during installation",
      "Replaces failed lead, silicone or mastic pipe collars — direct replacement in remediation without roof substrate recoring",
    ],
    limitations: [
      "Must be installed before the downpipe is fixed — threading the collar over an in-place fixed pipe may not be possible",
      "Confirm base flange material compatibility with adjacent roof membrane system — aluminium flange may react with some bituminous membranes",
      "Not suitable for pipes subject to significant thermal movement — EPDM collar will accommodate minor movement only",
      "Base flange must be fully lapped and sealed to adjacent membrane or flashing — collar alone is not a complete penetration waterproofing system",
      "Confirm current product specification and compliance with Deks before specifying",
    ],
    procurementSources: [
      { name: "Deks — trade supply — contact for current pricing and size range", url: "https://www.deks.com.au" },
      { name: "Reece Plumbing — trade nationally", url: "https://www.reece.com.au" },
      { name: "Waterproofing Direct — trade supply nationally", url: "https://www.wpdgroup.com.au" },
    ],
  },
  {
    fullLabel: "Sika",
    brandUrl: "https://aus.sika.com",
    accentColor: "#3b82f6",
    name: "Sikaflex-11 FC+",
    descriptionLine: "1-part polyurethane sealant for sealing downpipe-to-collar, downpipe-to-gutter outlet and gutter joint connections",
    productType: "1-part PU sealant for downpipe-to-collar and gutter joints",
    filterTags: ["Sealant", "PU", "Downpipe", "Penetration"],
    techChips: [
      { label: "1-part polyurethane", cls: "bg-sky-100 text-sky-800" },
      { label: "Moisture-cure", cls: "bg-slate-100 text-slate-700" },
      { label: "Downpipe joints", cls: "bg-slate-100 text-slate-700" },
      { label: "Gutter connections", cls: "bg-slate-100 text-slate-700" },
      { label: "Gun-applied", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sikaflex-11 FC+ is a one-component moisture-curing polyurethane sealant used for sealing downpipe-to-collar interfaces, downpipe-to-gutter outlet connections, and gutter lap joints in remediation of downpipe and gutter systems on Class 2 strata apartment buildings. Applied by gun from cartridge to prepared joint faces — toolable after application to form a smooth fillet or joint profile.\n\nPolyurethane chemistry provides good adhesion to PVC, Colorbond steel, aluminium, and most common downpipe and gutter substrate materials. Available in multiple standard colours. Confirm primer requirements against joint substrate material per Sika TDS before application — primer is mandatory on some substrates for reliable long-term adhesion.",
    technicalProperties: [
      "1-part moisture-curing polyurethane — no site mixing required — reduces application error in downpipe and gutter remediation",
      "Good adhesion to PVC, Colorbond steel, aluminium and most downpipe and gutter substrate materials",
      "Good elongation and movement accommodation — suitable for joints subject to thermal movement in exposed locations",
      "Gun-applied from standard cartridge — toolable to form smooth fillet at downpipe-to-collar and gutter lap joint connections",
      "Available in multiple standard colours — confirm current colour range against downpipe or gutter colour with Sika",
    ],
    limitations: [
      "Primer mandatory on some substrates — confirm primer requirement for each specific substrate material with Sika TDS before application",
      "Not suitable for joints subject to continuous immersion — confirm suitability with Sika technical for submerged or ponded applications",
      "Joint faces must be clean, dry and free of old sealant, paint or corrosion before application — adhesion failure is the primary sealant failure mode",
      "Do not apply at temperatures below 5°C or above 40°C — confirm application temperature range with Sika TDS",
      "Confirm current product specification and compliance with Sika Australia before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply — contact for current pricing", url: "https://aus.sika.com" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Reece Plumbing — trade nationally", url: "https://www.reece.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Downpipe", label: "Downpipe" },
  { id: "PVC", label: "PVC" },
  { id: "Colorbond", label: "Colorbond" },
  { id: "Steel", label: "Steel" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "Copper", label: "Copper" },
  { id: "UV-stabilised", label: "UV-stabilised" },
  { id: "Round", label: "Round" },
  { id: "Square", label: "Square" },
  { id: "Penetration", label: "Penetration" },
  { id: "Collar", label: "Collar" },
  { id: "EPDM", label: "EPDM" },
  { id: "Sealant", label: "Sealant" },
  { id: "PU", label: "PU" },
];

const BRAND_EQUIV: { system: string; vinidex: string; lysaght: string; calder: string; deks: string; sika: string }[] = [
  { system: "PVC round downpipe", vinidex: "DN100 PVC Round", lysaght: "—", calder: "—", deks: "—", sika: "—" },
  { system: "Colorbond square downpipe", vinidex: "—", lysaght: "Square Line", calder: "—", deks: "—", sika: "—" },
  { system: "Copper round downpipe", vinidex: "—", lysaght: "—", calder: "Copper Round", deks: "—", sika: "—" },
  { system: "EPDM pipe collar", vinidex: "—", lysaght: "—", calder: "—", deks: "D-1 Multi", sika: "—" },
  { system: "PU joint sealant", vinidex: "—", lysaght: "—", calder: "—", deks: "—", sika: "Sikaflex-11 FC+" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  material: string;
  profile: string;
  diameter: string;
  corrosionResist: string;
  primaryUse: string;
}[] = [
  {
    product: "Vinidex PVC Round Downpipe DN100",
    brand: "Vinidex",
    material: "UV-stabilised PVC",
    profile: "Round",
    diameter: "DN100",
    corrosionResist: "Excellent — no corrosion",
    primaryUse: "Standard residential / low-rise replacement",
  },
  {
    product: "Lysaght Square Line Downpipe",
    brand: "Lysaght",
    material: "Colorbond steel",
    profile: "Square",
    diameter: "Varies — confirm with Lysaght",
    corrosionResist: "Good — Colorbond pre-painted",
    primaryUse: "Colorbond gutter system match — pitched roofs",
  },
  {
    product: "Calder Copper Round Downpipe",
    brand: "Calder",
    material: "Seamless copper",
    profile: "Round",
    diameter: "Confirm with Calder",
    corrosionResist: "Excellent — develops protective patina",
    primaryUse: "Heritage / premium copper replacement",
  },
  {
    product: "Deks D-1 Multi Pipe Flashing Collar",
    brand: "Deks",
    material: "EPDM rubber + flange",
    profile: "Collar (not downpipe)",
    diameter: "DN50–DN100",
    corrosionResist: "EPDM UV-stabilised",
    primaryUse: "Roof / wall penetration sealing collar",
  },
  {
    product: "Sikaflex-11 FC+",
    brand: "Sika",
    material: "Polyurethane sealant",
    profile: "Gun-applied sealant",
    diameter: "N/A",
    corrosionResist: "N/A — sealant product",
    primaryUse: "Downpipe-to-collar / gutter joint sealing",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Full replacement of failed UV-degraded or impact-damaged PVC downpipes on Class 2 strata apartment buildings",
    "Colorbond steel square downpipe replacement to match existing Lysaght fascia gutter systems on pitched-roof residential buildings",
    "Copper downpipe replacement on heritage-listed or pre-war strata buildings where existing downpipes are copper",
    "Sealing of failed pipe penetration collars at roof or external wall penetrations with EPDM self-sealing collar",
    "Re-sealing of downpipe-to-gutter outlet, collar, and gutter lap joints with PU sealant during remediation",
  ],
  selectionCriteria: [
    "Match downpipe material to existing system where possible — PVC for PVC, Colorbond for Colorbond, copper for copper",
    "Confirm downpipe cross-section by hydraulic calculation against design rainfall intensity for the roof catchment area per AS/NZS 3500.3",
    "Confirm colour match for Colorbond steel downpipes against existing gutter before ordering — aged Colorbond colour match may be limited",
    "Select EPDM collar for new or replacement penetrations through roof or wall — not bare pipe through substrate",
    "Confirm material compatibility between downpipe, gutter outlet, and fixings — avoid galvanic contact between copper and aluminium",
  ],
  limitations: [
    "Downpipe sizing is a hydraulic design function — do not replace with a smaller diameter without hydraulic confirmation",
    "PVC expansion must be accommodated at each floor level — omission causes joint pullout or buckling over the building service life",
    "Colorbond cut ends corrode if not touch-up painted immediately — failure to touch-up painted ends is a common installation deficiency",
    "EPDM collars require integration with adjacent roof membrane or flashing — collar alone is not a complete penetration system",
    "PU sealant adhesion requires clean, dry, primed substrate — adhesion failure at joint faces is the primary sealant failure mode",
  ],
  standardsNotes: [
    "AS/NZS 3500.3 — Plumbing and Drainage — Stormwater Drainage — hydraulic sizing and installation requirements for downpipes and gutters",
    "NCC/BCA — National Construction Code — requires all stormwater drainage to comply with AS/NZS 3500.3 for Class 2 buildings",
    "Heritage orders (state-specific) — may mandate material match for copper or cast iron downpipes on heritage-listed buildings",
    "Strata scheme by-laws — material and colour changes to common property require owners corporation approval — confirm before specifying",
  ],
  suitableDefects: [
    "Failed, cracked or UV-degraded PVC downpipes leaking at joints or along the pipe body",
    "Impact-damaged Colorbond steel downpipes deformed by vehicle contact or plant access",
    "Corroded copper downpipe sections on heritage apartment buildings requiring like-for-like replacement",
    "Failed or absent pipe penetration collars at downpipe roof or wall penetrations causing water ingress",
    "Leaking downpipe-to-gutter outlet or collar connections due to failed sealant or push-fit joint pullout",
  ],
  typicalSubstrates: [
    "PVC downpipe body — solvent-welded or push-fit socket jointing with PVC fittings",
    "Colorbond steel — riveted or screwed lap joints — touch-up paint at cut ends mandatory",
    "Copper — soldered or compression-fit copper jointing — confirm hot work permit requirements",
    "Roof membrane or sheet roof substrate — for EPDM collar base flange integration",
    "Gutter outlet, collar and lap joint faces — for PU sealant application — clean and dry substrate mandatory",
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

export function DownpipeDefectsIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are downpipe replacement systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Downpipes on Class 2 strata apartment buildings fail through a combination of UV degradation, impact damage, corrosion, joint failure and — in many older buildings — being undersized for the actual roof catchment area. UV-degraded PVC becomes brittle and cracks along the pipe body or at socket joints; galvanised steel corrodes from the inside out over time; copper develops pinhole corrosion at the base of vertical runs where stormwater ponds; push-fit PVC joints pull apart under thermal movement when expansion provisions were omitted during original installation. Any of these failure modes can result in water discharging against the building facade rather than away from it, leading to water ingress, facade staining, and long-term structural damage.
        </p>
        <p>
          Material selection for replacement depends on what is already installed and what the strata body will approve. PVC is the lowest-cost option and is suitable for standard residential roof catchment areas — UV-stabilised grades are required for exposed installation. Colorbond steel square downpipes are the standard replacement where existing downpipes match a Lysaght gutter system — colour match is critical and must be confirmed before ordering. Copper is used exclusively for heritage match where existing downpipes are copper and heritage orders or strata by-laws mandate like-for-like replacement. Aluminium is used in some coastal applications where corrosion resistance is required without the cost of copper.
        </p>
        <p>
          All downpipe penetrations through roof surfaces or external walls must be sealed with a compliant pipe penetration collar — a bare pipe passing through a roof or wall membrane without a collar is not an acceptable installation under AS/NZS 3500.3. EPDM self-sealing rubber collars are the current standard for new and replacement penetrations in remediation. The collar base flange must be fully lapped and sealed to the adjacent roof membrane or flashing — the collar seals the pipe-to-collar interface but does not waterproof the surrounding substrate. PU sealant is applied at the downpipe-to-gutter outlet junction, at collar-to-downpipe interfaces where additional sealing is required, and at gutter lap joints during gutter remediation.
        </p>
        <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
          <p className="mb-2 text-xs font-bold text-slate-700">Do not confuse with:</p>
          <ul className="space-y-1.5">
            {[
              "Pipe penetration collars — the collar at the penetration point, not the downpipe tube itself — collar is a separate product category",
              "Stormwater pipes — underground drainage pipes from the downpipe shoe to the stormwater pit or drain — not above-ground downpipes",
              "Internal sewer pipes — plumbing within the building for waste discharge — not rainwater downpipes",
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

export function DownpipeDefectsProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">5 products — 5 brands — downpipe replacement systems — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side technical comparison of downpipe replacement products. Confirm current product specifications with manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Profile</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Diameter</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Corrosion resistance</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600">{row.profile}</td>
                  <td className="px-4 py-3 text-slate-600">{row.diameter}</td>
                  <td className="px-4 py-3 text-slate-600">{row.corrosionResist}</td>
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
            <p className="mt-1 text-sm text-slate-500">Downpipe system equivalents across brands active in Australian Class 2 strata remediation.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#ef4444" }}>Vinidex</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#f97316" }}>Lysaght</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#eab308" }}>Calder</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#22c55e" }}>Deks</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#3b82f6" }}>Sika</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.vinidex, row.lysaght, row.calder, row.deks, row.sika].map((val, j) => (
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
          <h3 className="text-base font-extrabold text-amber-900">Hydraulic sizing and penetration waterproofing</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Downpipe cross-section must be confirmed against design rainfall intensity for the roof catchment area — do not replace with a smaller diameter without hydraulic confirmation per AS/NZS 3500.3",
            "All roof and wall penetrations must be sealed with a compliant collar — bare pipe through roof surface is not acceptable and will result in water ingress at the penetration",
            "Confirm material compatibility between new downpipe, existing gutter outlet and fixings — avoid galvanic contact between copper and aluminium to prevent accelerated corrosion at junctions",
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
