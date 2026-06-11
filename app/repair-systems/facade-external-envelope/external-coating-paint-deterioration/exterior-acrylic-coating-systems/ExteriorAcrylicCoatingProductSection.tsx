"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Acrylic"
  | "Two-coat"
  | "Exterior-topcoat"
  | "Masonry"
  | "Render"
  | "UV-resistant"
  | "Water-based"
  | "Weatherproof"
  | "Coastal"
  | "Elastomeric"
  | "Anti-fungal";

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
    fullLabel: "Dulux Australia",
    brandUrl: "https://www.dulux.com.au",
    tdsUrl: "https://www.dulux.com.au/products/trade/exterior",
    accentColor: "#e2003a",
    name: "Dulux Weathershield Exterior Acrylic",
    descriptionLine: "Premium 100% acrylic exterior topcoat — benchmark exterior masonry and render coating in Australia — UV-resistant, weather-resistant, two-coat system over primer",
    productType: "100% acrylic exterior topcoat — masonry and render facades",
    filterTags: ["Acrylic", "Two-coat", "Exterior-topcoat", "Masonry", "Render", "UV-resistant", "Water-based", "Weatherproof", "Coastal"],
    techChips: [
      { label: "100% Acrylic", cls: "bg-red-100 text-red-800" },
      { label: "UV-resistant", cls: "bg-amber-100 text-amber-700" },
      { label: "Water-based", cls: "bg-blue-100 text-blue-700" },
      { label: "Two-coat system", cls: "bg-slate-100 text-slate-700" },
      { label: "Coastal rated", cls: "bg-sky-100 text-sky-800" },
    ],
    systemDescription:
      "Dulux Weathershield is the benchmark exterior acrylic paint for masonry and render facades in Australia. The 100% acrylic binder provides excellent UV resistance, colour retention, and film flexibility, allowing the coating to move with the substrate through seasonal temperature cycling without cracking. Applied as a two-coat system over alkali-resistant primer (Dulux Weathershield Primer or equivalent), it forms a durable weather barrier on residential and commercial Class 2 strata buildings. Weathershield is available in a wide range of colours including custom Dulux tinting and is widely stocked through trade and retail channels nationally. Anti-fungal additives are included in the low-sheen formula. Confirm primer specification, DFT, and overcoat interval from the current Dulux TDS before specifying — coverage rates and DFT requirements can vary between the full range.",
    technicalProperties: [
      "Binder: 100% pure acrylic emulsion — premium UV stability and colour retention",
      "DFT: approximately 35–50 µm per coat applied at recommended coverage — two-coat system = 70–100 µm",
      "Coverage: approximately 12–16 m²/L — confirm from current TDS",
      "Anti-fungal additives included — low-sheen formula suitable for shaded and humid exposures",
      "Water-based — low VOC — suitable for occupied building facade repainting",
      "Confirm primer specification (alkali-resistant primer mandatory on new or unpainted render)",
    ],
    limitations: [
      "Alkali-resistant primer mandatory on new render — do not apply direct to unpainted new cement render",
      "Not a crack-bridging coating — use elastomeric system where active crack movement is anticipated",
      "Minimum 10°C application temperature — do not apply in wet or very humid conditions",
      "Touch-up areas must be primed before topcoat to avoid sheen variation",
    ],
    procurementSources: [
      { name: "Dulux Trade — Product Finder", url: "https://www.dulux.com.au" },
      { name: "Bunnings Trade — trade account", url: "https://www.bunnings.com.au" },
      { name: "Dulux Trade Centres — national", url: "https://www.dulux.com.au" },
    ],
  },
  {
    fullLabel: "Wattyl Australia",
    brandUrl: "https://www.wattyl.com.au",
    tdsUrl: "https://www.wattyl.com.au/en_AU/products/exterior",
    accentColor: "#0369a1",
    name: "Wattyl Solagard Exterior Acrylic",
    descriptionLine: "High-durability 100% acrylic exterior coating with advanced UV stabilisers — designed for Australian conditions with strong fade and chalk resistance on masonry and render facades",
    productType: "High-durability acrylic exterior topcoat — masonry and render",
    filterTags: ["Acrylic", "Two-coat", "Exterior-topcoat", "Masonry", "Render", "UV-resistant", "Water-based", "Weatherproof", "Anti-fungal"],
    techChips: [
      { label: "100% Acrylic", cls: "bg-sky-100 text-sky-800" },
      { label: "UV stabilised", cls: "bg-amber-100 text-amber-700" },
      { label: "Anti-fungal", cls: "bg-green-100 text-green-700" },
      { label: "Two-coat system", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Wattyl Solagard is one of Australia's most established exterior acrylic topcoats for masonry and rendered facade applications. The product incorporates advanced UV stabilisers specifically formulated for Australian conditions — including high-UV tropical and subtropical environments — to resist chalking and colour fade. It is applied as a two-coat system over an appropriate Wattyl exterior primer or alkali-resistant primer on cement render. Solagard includes anti-fungal additives and is available in a wide range of colours through Wattyl's national tinting service. It is particularly well suited to the Queensland and northern NSW markets where UV intensity and humidity combine to accelerate coating deterioration on standard acrylic systems. Confirm primer specification, coverage rates, and DFT from the current Wattyl Solagard TDS before specifying.",
    technicalProperties: [
      "Binder: 100% acrylic with enhanced UV stabiliser package — formulated for high UV-intensity Australian environments",
      "DFT: confirm from current TDS — typically 35–45 µm per coat at manufacturer's recommended spread rate",
      "Coverage: confirm from current TDS — approximately 12–16 m²/L",
      "Anti-fungal additives — suitable for humid and shaded exposures including tropical environments",
      "Wide colour range through Wattyl national tinting — low-sheen and semi-gloss finishes available",
      "Confirm current product range and primers with Wattyl technical before specifying",
    ],
    limitations: [
      "Alkali-resistant primer mandatory on new or unpainted cement render",
      "Not a crack-bridging system — specify elastomeric system where substrate cracking is active or anticipated",
      "Colour consistency across recoat intervals requires same batch tinting — commission new batch for touch-up areas",
      "Do not apply below 10°C or when rain is expected within 4 hours of application",
    ],
    procurementSources: [
      { name: "Wattyl Trade — Product Finder", url: "https://www.wattyl.com.au" },
      { name: "Wattyl Trade Centres — national", url: "https://www.wattyl.com.au" },
      { name: "Bunnings Trade", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Haymes Paint Australia",
    brandUrl: "https://www.haymespaint.com.au",
    tdsUrl: "https://www.haymespaint.com.au/products/exterior",
    accentColor: "#7c3aed",
    name: "TODO: owner confirm — Haymes Extreme Shield Exterior Acrylic (WRONG PRODUCT NAME — 'Extreme Shield' is not an active Haymes exterior acrylic product — the correct current Haymes exterior acrylic is 'Exterior Solashield®' available in Low Sheen, Matt, Satin, and Gloss finishes — confirm correct product name is 'Haymes Exterior Solashield' and update this card with current Haymes TDS data)",
    descriptionLine: "TODO: owner confirm — Australian-made premium acrylic exterior topcoat with weatherguard technology — strong UV, mould and algae resistance for masonry and render facades — independently tested for Australian conditions (product name incorrect — correct Haymes exterior acrylic is 'Exterior Solashield®' — see name field)",
    productType: "TODO: owner confirm — Premium acrylic exterior topcoat — masonry and render — Australian-made (product name unconfirmed — correct name appears to be 'Haymes Exterior Solashield' — see name field)",
    filterTags: ["Acrylic", "Two-coat", "Exterior-topcoat", "Masonry", "Render", "UV-resistant", "Water-based", "Weatherproof", "Anti-fungal"],
    techChips: [
      { label: "Australian-made", cls: "bg-purple-100 text-purple-800" },
      { label: "UV-resistant", cls: "bg-amber-100 text-amber-700" },
      { label: "Anti-mould", cls: "bg-green-100 text-green-700" },
      { label: "Premium acrylic", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "TODO: owner confirm — WRONG PRODUCT NAME. 'Haymes Extreme Shield' is not a current Haymes product. The correct current Haymes exterior acrylic is 'Exterior Solashield®' (haymespaint.com.au) — available in Low Sheen, Matt, Satin, and Gloss finishes. This card should be updated to reference 'Haymes Exterior Solashield' and the technical data (DFT, coverage, primer requirements, VOC, anti-fungal properties) should be sourced from the current Haymes Exterior Solashield TDS. Haymes is an Australian manufacturer with strong trade distribution in Victoria and regional Australia. Confirm current primer specification, DFT requirements, and product compatibility from the current Haymes Exterior Solashield TDS before specifying.",
    technicalProperties: [
      "TODO: owner confirm — product name incorrect — current Haymes exterior acrylic is 'Exterior Solashield®' not 'Extreme Shield' — update all technical data below from current Haymes Exterior Solashield TDS",
      "Strong resistance to mould and algae growth in humid exposures — confirm anti-fungal specification from current Haymes Exterior Solashield TDS",
      "Australian-manufactured and independently tested for Australian exterior conditions",
      "DFT: confirm from current Haymes Exterior Solashield TDS — apply at manufacturer's recommended spread rate per coat",
      "Wide colour range — Haymes national tinting service — custom colour matching available",
      "Confirm primer requirements from current Haymes Exterior Solashield TDS — alkali-resistant primer required on new render",
    ],
    limitations: [
      "Not a crack-bridging coating — specify elastomeric system where active crack movement is present",
      "Primer mandatory on new render — do not apply directly to unpainted cement render",
      "Haymes distribution strongest in Victoria and regional — confirm availability with local trade supplier",
      "Confirm current product name and formulation from the current Haymes TDS before specifying",
    ],
    procurementSources: [
      { name: "Haymes Paint Trade — Where to Buy", url: "https://www.haymespaint.com.au" },
      { name: "Haymes Trade Centres — VIC/NSW", url: "https://www.haymespaint.com.au" },
      { name: "Independent paint retailers — confirm local availability", url: "https://www.haymespaint.com.au" },
    ],
  },
  {
    fullLabel: "Jotun Paints Australia",
    brandUrl: "https://www.jotun.com/au",
    tdsUrl: "https://www.jotun.com/au/decorative/products",
    accentColor: "#b45309",
    name: "Jotun Jotashield Extreme",
    descriptionLine: "Premium exterior acrylic coating with Jotun's ColourGuard and DirtGuard technologies — exceptional UV and dirt resistance — suitable for demanding Australian commercial and high-rise facade applications",
    productType: "Premium acrylic exterior topcoat — commercial and high-rise facades",
    filterTags: ["Acrylic", "Two-coat", "Exterior-topcoat", "Masonry", "Render", "UV-resistant", "Water-based", "Weatherproof", "Coastal"],
    techChips: [
      { label: "ColourGuard tech", cls: "bg-orange-100 text-orange-800" },
      { label: "DirtGuard", cls: "bg-slate-100 text-slate-700" },
      { label: "UV-resistant", cls: "bg-amber-100 text-amber-700" },
      { label: "Commercial grade", cls: "bg-sky-100 text-sky-800" },
    ],
    systemDescription:
      "Jotun Jotashield Extreme is a premium exterior acrylic topcoat with Jotun's ColourGuard and DirtGuard technologies — ColourGuard provides enhanced UV stability and chalk resistance, while DirtGuard reduces the accumulation of atmospheric dirt and pollutants on the facade surface. It is particularly well suited to commercial, high-rise, and prominent strata facades where colour retention over a long repaint cycle is critical. Jotun has a strong commercial market presence in Australia through trade supply channels. Applied as a two-coat system over a compatible Jotun exterior primer or alkali-resistant primer on cement render. Confirm primer specification, DFT requirements, and current product formulation from the current Jotun Jotashield Extreme TDS before specifying. Confirm current Australian product range with Jotun Australia as formulations may vary from international catalogues.",
    technicalProperties: [
      "TODO: owner confirm — 'ColourGuard' and 'DirtGuard' technology claims not confirmed from a current AU-specific Jotun TDS at time of verification — Jotashield Extreme exists globally but Australian product positioning and technology claims may differ — confirm current AU product formulation, ColourGuard/DirtGuard applicability, and all technical data with Jotun Australia",
      "Exceptional UV stability — suited to high-UV commercial facades and long repaint cycles — confirm from current AU TDS",
      "TODO: owner confirm — DirtGuard (self-cleaning/dirt resistance) technology: not confirmed from AU-specific Jotun TDS — confirm whether DirtGuard is a current feature of the AU Jotashield Extreme formulation with Jotun Australia technical",
      "DFT: confirm from current Jotun TDS — typically two coats at manufacturer's recommended spread rate",
      "Suitable for coastal and marine environments — confirm coastal grade suitability with Jotun Australia",
      "Confirm current Australian product designation and primer from Jotun Australia technical",
    ],
    limitations: [
      "Not a crack-bridging coating — specify elastomeric system for facades with active cracking",
      "Alkali-resistant primer mandatory on new cement render — confirm Jotun primer specification",
      "Confirm Australian product availability — Jotun Australia product range may differ from international product catalogues",
      "Higher cost than standard acrylic — specify for projects where extended colour retention is justified",
    ],
    procurementSources: [
      { name: "Jotun Australia — trade supply", url: "https://www.jotun.com/au" },
      { name: "Jotun Decorative — Australia", url: "https://www.jotun.com/au" },
      { name: "Commercial paint trade suppliers — confirm local availability", url: "https://www.jotun.com/au" },
    ],
  },
  {
    fullLabel: "Westox",
    brandUrl: "https://www.westox.com.au",
    accentColor: "#64748b",
    name: "Westox WX Colourcote 15 Litre",
    descriptionLine: "Exterior acrylic topcoat for masonry and render facades — available in a range of colours — confirm current formulation, coverage, primer requirements and Australian availability with Westox technical",
    productType: "Acrylic exterior topcoat — masonry and render facades",
    filterTags: ["Acrylic", "Two-coat", "Exterior-topcoat", "Masonry", "Render", "Water-based", "Weatherproof"],
    techChips: [
      { label: "Acrylic", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior topcoat", cls: "bg-slate-100 text-slate-700" },
      { label: "Water-based", cls: "bg-blue-100 text-blue-700" },
    ],
    systemDescription:
      "Westox WX Colourcote is an exterior acrylic topcoat for masonry and render facades. Westox is an Australian decorative and protective coatings brand. Apply as a two-coat system over a compatible primer — confirm alkali-resistant primer requirement on new or unpainted cement render with Westox technical.\n\nConfirm current product formulation, coverage rates, DFT, thinning recommendations, primer specification, and Australian availability with Westox technical before specifying. Do not rely on this general reference as a substitute for current Westox WX Colourcote TDS.",
    technicalProperties: [
      "Exterior acrylic topcoat — suitable for masonry and render facades",
      "Water-based formulation — confirm VOC classification and application conditions from current TDS",
      "Confirm coverage rate, DFT per coat, and two-coat system specifications from current Westox TDS",
      "Confirm primer specification for new render and existing substrates from Westox technical",
    ],
    limitations: [
      "Confirm current product formulation, coverage, and system specifications with Westox technical before specifying",
      "Alkali-resistant primer required on new or unpainted cement render — confirm primer product with Westox",
      "Not a crack-bridging system — specify elastomeric coating where active facade cracking is present",
      "Confirm current Australian product availability with Westox or Westox distributors before specifying",
    ],
    procurementSources: [
      { name: "Westox — contact for trade supply", url: "https://www.westox.com.au" },
    ],
  },
  {
    fullLabel: "Westox",
    brandUrl: "https://www.westox.com.au",
    accentColor: "#64748b",
    name: "Westox Satintex 15 Litre",
    descriptionLine: "Satin-finish exterior acrylic coating for masonry and render facades — confirm current formulation, coverage, primer requirements and Australian availability with Westox technical",
    productType: "Satin-finish acrylic exterior coating — masonry and render",
    filterTags: ["Acrylic", "Two-coat", "Exterior-topcoat", "Masonry", "Render", "Water-based"],
    techChips: [
      { label: "Satin finish", cls: "bg-slate-100 text-slate-700" },
      { label: "Acrylic", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Westox Satintex is a satin-finish exterior acrylic coating for masonry and render facades. A satin finish provides moderate sheen compared to low-sheen or flat acrylic finishes — specify where the facade design requires a semi-reflective surface.\n\nApply as a two-coat system over a compatible primer — confirm alkali-resistant primer requirement on new or unpainted cement render with Westox technical. Confirm current product formulation, coverage rates, DFT, and primer specification from current Westox TDS before specifying.",
    technicalProperties: [
      "Satin-finish exterior acrylic topcoat — masonry and render substrates",
      "Water-based formulation — confirm VOC classification from current TDS",
      "Confirm coverage rate, DFT per coat, and two-coat system specifications from current Westox TDS",
      "Confirm primer specification for substrate type from Westox technical",
    ],
    limitations: [
      "Confirm current product formulation and system specifications with Westox technical before specifying",
      "Alkali-resistant primer required on new cement render — confirm primer product with Westox",
      "Not a crack-bridging system — specify elastomeric coating for facades with active cracking",
      "Confirm current Australian product availability with Westox before specifying",
    ],
    procurementSources: [
      { name: "Westox — contact for trade supply", url: "https://www.westox.com.au" },
    ],
  },
  {
    fullLabel: "Westox",
    brandUrl: "https://www.westox.com.au",
    accentColor: "#64748b",
    name: "Westox Glosstex 15 Litre",
    descriptionLine: "Gloss-finish exterior acrylic coating for masonry and render facades — confirm current formulation, coverage, primer requirements and Australian availability with Westox technical",
    productType: "Gloss-finish acrylic exterior coating — masonry and render",
    filterTags: ["Acrylic", "Two-coat", "Exterior-topcoat", "Masonry", "Render", "Water-based"],
    techChips: [
      { label: "Gloss finish", cls: "bg-slate-100 text-slate-700" },
      { label: "Acrylic", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Westox Glosstex is a gloss-finish exterior acrylic coating for masonry and render facades. A gloss finish provides a high-sheen reflective surface — specify where facade design or project brief requires a gloss finish exterior coating on render or masonry.\n\nApply as a two-coat system over a compatible primer — confirm alkali-resistant primer requirement on new or unpainted cement render with Westox technical. Confirm current product formulation, coverage rates, DFT, and primer specification from current Westox TDS before specifying.",
    technicalProperties: [
      "Gloss-finish exterior acrylic topcoat — masonry and render substrates",
      "Water-based formulation — confirm VOC classification from current TDS",
      "Confirm coverage rate, DFT per coat, and two-coat system specifications from current Westox TDS",
      "Confirm primer specification for substrate type from Westox technical",
    ],
    limitations: [
      "Confirm current product formulation and system specifications with Westox technical before specifying",
      "Alkali-resistant primer required on new cement render — confirm primer product with Westox",
      "Not a crack-bridging system — specify elastomeric coating for facades with active cracking",
      "High-gloss finishes will highlight substrate imperfections — ensure thorough surface preparation before application",
      "Confirm current Australian product availability with Westox before specifying",
    ],
    procurementSources: [
      { name: "Westox — contact for trade supply", url: "https://www.westox.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Acrylic", label: "Acrylic" },
  { id: "Two-coat", label: "Two-coat system" },
  { id: "Exterior-topcoat", label: "Exterior topcoat" },
  { id: "Masonry", label: "Masonry" },
  { id: "Render", label: "Render" },
  { id: "UV-resistant", label: "UV-resistant" },
  { id: "Water-based", label: "Water-based" },
  { id: "Weatherproof", label: "Weatherproof" },
  { id: "Coastal", label: "Coastal rated" },
  { id: "Anti-fungal", label: "Anti-fungal" },
  { id: "Elastomeric", label: "Elastomeric" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  binder: string;
  uvSystem: string;
  antiFungal: string;
  coastal: string;
  primer: string;
  primaryUse: string;
}[] = [
  {
    product: "Weathershield Exterior Acrylic",
    brand: "Dulux",
    binder: "100% acrylic",
    uvSystem: "Standard UV stabilisers",
    antiFungal: "Yes",
    coastal: "Yes",
    primer: "Dulux Weathershield Primer",
    primaryUse: "Benchmark exterior acrylic — wide availability — masonry and render",
  },
  {
    product: "Solagard Exterior Acrylic",
    brand: "Wattyl",
    binder: "100% acrylic — high UV grade",
    uvSystem: "Advanced UV stabilisers",
    antiFungal: "Yes",
    coastal: "Yes",
    primer: "Wattyl exterior primer",
    primaryUse: "High UV environments — QLD / tropical — masonry and render",
  },
  {
    product: "Extreme Shield Exterior Acrylic",
    brand: "Haymes",
    binder: "Premium acrylic",
    uvSystem: "Weatherguard Technology",
    antiFungal: "Yes — algaecide included",
    coastal: "Confirm with Haymes",
    primer: "Haymes exterior primer",
    primaryUse: "Australian-made — VIC/NSW — anti-mould and UV focus",
  },
  {
    product: "Jotashield Extreme",
    brand: "Jotun",
    binder: "Premium acrylic",
    uvSystem: "ColourGuard + DirtGuard",
    antiFungal: "Confirm TDS",
    coastal: "Confirm — coastal grade available",
    primer: "Jotun exterior primer",
    primaryUse: "Commercial and high-rise — extended colour retention cycle",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Two-coat acrylic topcoat on primed cement render facades — standard exterior repainting specification",
    "Full repaint restoration of masonry buildings where existing coating has chalked, faded or lost adhesion",
    "First-coat application on new render after adequate cure and priming",
    "Colour change repaints on existing painted masonry and render facades",
    "Decorative and protective coating on brick, concrete block, and fibre cement cladding",
  ],
  selectionCriteria: [
    "Apply standard acrylic for moderate UV and weather exposure — select premium grade for high UV or extended repaint cycles",
    "Select UV-stabilised premium grade for Queensland, tropical and subtropical climate zones",
    "Include anti-fungal formulation for shaded, south-facing or high-humidity exposures",
    "Always apply over alkali-resistant primer on new or unpainted render — never apply acrylic directly to unpainted cement",
    "Where substrate has active or moving cracks, specify elastomeric crack-bridging system not standard acrylic",
    "Confirm coastal grade suitability with manufacturer for buildings within 1 km of saltwater",
  ],
  limitations: [
    "Acrylic topcoats do not bridge active or moving cracks — specify elastomeric system for crack-affected facades",
    "All exterior acrylics require thorough substrate preparation — biocide wash, crack repair, and priming before application",
    "Touch-up or patch repainting over existing acrylic requires priming and may exhibit sheen variation if not feathered properly",
    "Colour retention and UV performance vary between standard and premium product grades — specify accordingly for high UV zones",
    "Do not apply below 10°C or in direct rain — allow 4 hours before rain after application",
  ],
  standardsNotes: [
    "AS 3730 — Guide to properties of paints for buildings — Australian paint classification reference",
    "AS 4548 — Guide to long-life coatings for concrete and masonry — relevant for commercial facade repainting",
    "NATSPEC — Section 0233 — Exterior painting specification — confirm applicable worksection",
    "Manufacturer TDS — confirm coverage rates, primer specification, thinning limits, and overcoat intervals",
    "NCC Volume One — external facade coating systems must not compromise fire performance of the wall assembly",
  ],
  suitableDefects: [
    "Chalking and weathering of existing exterior coating — surface chalking indicating binder breakdown",
    "UV-faded or bleached exterior paint on masonry or render facades — colour restoration repainting",
    "Minor coating peeling where substrate is sound — after thorough surface preparation and priming",
    "New render requiring first-time coating after adequate cure period (minimum 28 days for cement render)",
    "Biological growth (mould, algae) on facade requiring biocide treatment then recoating with anti-fungal acrylic",
  ],
  typicalSubstrates: [
    "Cement render — new (primed with alkali-resistant primer) and existing painted render in sound condition",
    "Brick and block masonry facades — prime porous surfaces before topcoat",
    "Concrete panel construction — confirm primer specification for dense concrete",
    "Fibre cement cladding — confirm system suitability with manufacturer before applying acrylic topcoat",
    "Existing sound acrylic or texture coating — wash, spot prime and overcoat with compatible acrylic",
  ],
};

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

export function ExteriorAcrylicCoatingIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are exterior acrylic coating systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Exterior acrylic coatings are the most commonly specified topcoat for cement render and masonry facades in Australia. They provide UV resistance, weather protection, colour retention, and moderate flexibility at an economical cost. Applied as a two-coat system over alkali-resistant primer, they form the final weather barrier in a standard exterior painting specification.
        </p>
        {expanded && (
          <>
            <p>
              Premium grades incorporate advanced UV stabiliser packages (ColourGuard, Weatherguard, and similar technologies) for extended service life in high-UV coastal and tropical environments. Anti-fungal formulations include fungicide and algaecide additives suited to shaded or humid exposures where mould and algae growth accelerates coating failure. Standard exterior acrylics are not crack-bridging systems — they will not accommodate active crack movement in the substrate. Where the facade has active or moving cracks, an elastomeric coating system with crack-bridging capability should be specified instead.
            </p>
            <p>
              Substrate preparation is the critical variable in exterior acrylic coating performance. All biological growth must be treated with a biocide wash, all loose and defective coating must be removed, all cracks must be repaired, and an alkali-resistant primer must be applied on new or bare cement render before the acrylic topcoat is applied. Failure to prepare the substrate correctly is the primary cause of premature adhesion failure of exterior acrylic coatings on Australian strata facades.
            </p>
          </>
        )}
      </div>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900"
      >
        {expanded ? "Read less ↑" : "Read more ↓"}
      </button>
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

export function ExteriorAcrylicCoatingProductSection() {
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
              Applications, selection criteria, limitations, standards, suitable substrates
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
              <TechCard icon={<AlertTriangle size={15} />} title="When NOT to Use" items={TECH_INFO.limitations} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards & Notes" items={TECH_INFO.standardsNotes} style="bullet" />
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
            <p className="mt-1 text-sm text-slate-500">4 products — 4 brands — exterior acrylic coating systems — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of exterior acrylic coating systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Binder</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">UV system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Anti-fungal</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coastal</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primer</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.binder}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.uvSystem}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.antiFungal}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coastal}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.primer}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.primaryUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
