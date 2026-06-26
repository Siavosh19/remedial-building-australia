"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";
import { DataNote } from "@/app/repair-systems/_components/ProductPageShared";

type FilterTag =
  | "Elastomeric"
  | "High-build"
  | "Waterproof"
  | "Crack-tolerant"
  | "Masonry"
  | "Render"
  | "Concrete"
  | "Water-based"
  | "UV-resistant"
  | "Coastal"
  | "Anti-fungal"
  | "Two-coat";

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
    fullLabel: "Dulux Australia",
    brandUrl: "https://www.dulux.com.au",
    accentColor: "#e2003a",
    name: "Dulux Acratex Weathershield Flex",
    descriptionLine: "High-build elastomeric acrylic exterior coating for masonry and render — flexible, waterproof, UV-resistant — two-coat system for facades with minor crack movement and moisture exposure",
    productType: "High-build elastomeric acrylic — masonry and render facades",
    dataNote: "Owner to confirm — product name not found: 'Dulux Acratex Weathershield Flex' does not appear in the current Dulux Acratex range on dulux.com.au; confirmed Acratex elastomeric products include AcraShield Advance, Elastomeric 201, Acraskin, and AcraGuard. Confirm the correct current Dulux Acratex elastomeric facade coating product name and its primer (AcraPrime 501 for render cured 28+ days, or Green Render Sealer for render cured under 28 days) with Dulux Acratex technical before publishing.",
    filterTags: ["Elastomeric", "High-build", "Waterproof", "Crack-tolerant", "Masonry", "Render", "Water-based", "UV-resistant", "Coastal", "Anti-fungal", "Two-coat"],
    techChips: [
      { label: "Elastomeric", cls: "bg-red-100 text-red-800" },
      { label: "High-build", cls: "bg-amber-100 text-amber-700" },
      { label: "Waterproof", cls: "bg-blue-100 text-blue-700" },
      { label: "UV-resistant", cls: "bg-slate-100 text-slate-700" },
      { label: "Coastal rated", cls: "bg-sky-100 text-sky-800" },
    ],
    systemDescription:
      "TODO: owner confirm — PRODUCT NAME NOT CONFIRMED. 'Dulux Acratex Weathershield Flex' was not found in the current Dulux Acratex product range as of verification date. The Dulux Acratex elastomeric/high-build range includes products such as AcraShield Advance (Low Gloss/Matt/Concrete/Aluminium variants), Elastomeric 201, Acraskin, and AcraGuard — the correct elastomeric facade coating product must be confirmed with Dulux Acratex technical. Once the correct product is confirmed, all technical specifications (DFT, primer, system specification, and application details) must be sourced from the current Dulux Acratex TDS for that product. The primer reference 'Dulux Acratex Prep Coat' should also be confirmed as the primer is now 'AcraPrime 501' (for render cured 28+ days) or 'Green Render Sealer' (for render cured less than 28 days) in the current Acratex system.",
    technicalProperties: [
      "Elastomeric binder — high elongation at break — bridges fine and hairline cracks in render and masonry",
      "High-build system — significantly higher DFT than standard exterior acrylic — confirm DFT from current TDS",
      "Waterproof — forms continuous flexible membrane over facade surface — reduces water ingress through render",
      "UV-resistant and anti-fungal — suitable for coastal and high-humidity environments",
      "Water-based — low VOC — suitable for occupied strata building facade repainting",
      "Confirm primer specification, DFT, and overcoat interval from current Dulux Acratex TDS before specifying",
    ],
    limitations: [
      "Not a crack-bridging coating for active or structural cracks — specify elastomeric crack-bridging system for cracks with movement",
      "Higher cost than standard exterior acrylic — specify where enhanced waterproofing and flexibility is required",
      "Alkali-resistant primer mandatory on new or unpainted render — confirm system specification with Dulux Acratex",
      "Application requires consistent high-build thickness — coverage rate lower than standard acrylic — confirm from TDS",
    ],
    procurementSources: [
      { name: "Dulux Acratex — trade supply", url: "https://www.dulux.com.au" },
      { name: "Dulux Trade Centres — national", url: "https://www.dulux.com.au" },
      { name: "Bunnings Trade — trade account", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Solver Paints Australia",
    brandUrl: "https://www.solverpaints.com.au",
    accentColor: "#0369a1",
    name: "Solver Permalastic",
    descriptionLine: "Elastomeric acrylic exterior coating for masonry and render — flexible waterproof system with UV resistance for strata facade repainting — two-coat over primer",
    productType: "Elastomeric acrylic exterior topcoat — masonry and render",
    filterTags: ["Elastomeric", "High-build", "Waterproof", "Crack-tolerant", "Masonry", "Render", "Water-based", "UV-resistant", "Two-coat"],
    techChips: [
      { label: "Elastomeric", cls: "bg-sky-100 text-sky-800" },
      { label: "Waterproof", cls: "bg-blue-100 text-blue-700" },
      { label: "Flexible", cls: "bg-green-100 text-green-700" },
      { label: "Two-coat", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Solver Permalastic is an elastomeric acrylic exterior coating for masonry and rendered facade surfaces requiring enhanced flexibility and waterproofing beyond standard exterior acrylics. The elastomeric binder allows the coating film to flex with the substrate through thermal cycling and minor movement, accommodating fine cracks without splitting or delaminating. Applied as a two-coat system over a compatible Solver exterior primer, Permalastic forms a durable flexible barrier on masonry and render facades. It is UV-resistant and suitable for residential and commercial strata exterior repainting where moisture resistance and minor crack tolerance are specification requirements. Solver has strong trade distribution in Victoria and eastern Australia. Confirm current product name, system specification, primer requirements, DFT, and coverage from the current Solver Permalastic TDS before specifying.",
    technicalProperties: [
      "Elastomeric acrylic binder — flexible film that accommodates fine crack formation and minor substrate movement",
      "Waterproof — enhanced moisture resistance compared to standard exterior acrylic — reduces water ingress",
      "UV-resistant — suitable for exterior facade repainting in Australian conditions",
      "Two-coat system over compatible Solver exterior primer — confirm primer specification from TDS",
      "Suitable for residential and commercial strata masonry and render facades",
      "Confirm current product name, DFT, and coverage from current Solver Permalastic TDS before specifying",
    ],
    limitations: [
      "Not a crack-bridging system for actively moving or structural cracks — specify specialist crack-bridging system where required",
      "Confirm current availability — Solver trade distribution strongest in Victoria and eastern Australia",
      "Primer mandatory on new render — confirm Solver primer specification before application",
      "Confirm current product formulation and name with Solver trade before specifying on a remedial project",
    ],
    procurementSources: [
      { name: "Solver Paints Trade — Product Finder", url: "https://www.solverpaints.com.au" },
      { name: "Solver Trade Centres — VIC and eastern Australia", url: "https://www.solverpaints.com.au" },
      { name: "Independent paint retailers — confirm local availability", url: "https://www.solverpaints.com.au" },
    ],
  },
  {
    fullLabel: "Taubmans Australia",
    brandUrl: "https://www.taubmans.com.au",
    accentColor: "#7c3aed",
    name: "Taubmans Endure Exterior Flex",
    descriptionLine: "Flexible exterior acrylic topcoat with elastomeric properties for masonry and render facades — enhanced waterproofing and crack tolerance in a durable two-coat exterior system",
    productType: "Flexible acrylic exterior topcoat — masonry and render",
    dataNote: "Owner to confirm — product appears discontinued: the 'Taubmans Endure Exterior' range has been discontinued per trade sources. Confirm whether a current Taubmans flexible/elastomeric exterior facade coating exists in the current AU range with Taubmans technical before publishing.",
    filterTags: ["Elastomeric", "Waterproof", "Crack-tolerant", "Masonry", "Render", "Water-based", "UV-resistant", "Anti-fungal", "Two-coat"],
    techChips: [
      { label: "Flexible acrylic", cls: "bg-purple-100 text-purple-800" },
      { label: "Waterproof", cls: "bg-blue-100 text-blue-700" },
      { label: "Anti-fungal", cls: "bg-green-100 text-green-700" },
      { label: "Two-coat", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Taubmans Endure Exterior Flex is a flexible acrylic exterior topcoat with elastomeric properties for use on masonry and render facades requiring enhanced flexibility and waterproofing compared to standard exterior acrylics. The flexible binder system accommodates minor substrate movement and fine crack formation without splitting, providing a more durable coating performance on facades subject to temperature cycling and minor structural movement. Applied as a two-coat system over Taubmans exterior primer or alkali-resistant primer on cement render, Endure Exterior Flex includes anti-fungal additives and UV resistance suitable for Australian exterior conditions. Confirm current product name, primer specification, DFT, and system details from the current Taubmans product documentation before specifying — product range and naming may vary.",
    technicalProperties: [
      "Flexible acrylic with elastomeric properties — accommodates fine cracks and minor substrate movement",
      "Waterproof — enhanced moisture resistance for masonry and render facades",
      "UV-resistant and anti-fungal — suitable for exterior exposure in Australian conditions",
      "Two-coat system over compatible Taubmans primer or alkali-resistant primer",
      "Suitable for residential and commercial strata exterior facade repainting",
      "Confirm current product name, primer, and DFT from Taubmans TDS before specifying",
    ],
    limitations: [
      "Not a specialist crack-bridging system — specify elastomeric crack-bridging coating for actively moving cracks",
      "Alkali-resistant primer mandatory on new cement render before topcoat application",
      "Confirm current product name and formulation — Taubmans exterior flex range may vary",
      "Touch-up areas require priming before topcoat application to avoid sheen variation",
    ],
    procurementSources: [
      { name: "Taubmans Trade — Product Finder", url: "https://www.taubmans.com.au" },
      { name: "Bunnings — trade and retail", url: "https://www.bunnings.com.au" },
      { name: "Independent paint trade suppliers", url: "https://www.taubmans.com.au" },
    ],
  },
  {
    fullLabel: "Nutech Paints Australia",
    brandUrl: "https://www.nutechpaint.com.au",
    accentColor: "#b45309",
    name: "Nutech Nuvol Elastomeric Coating",
    descriptionLine: "High-performance elastomeric coating for masonry and render — specialist remedial product designed for waterproofing, UV resistance and crack accommodation on Australian strata facades",
    productType: "High-performance elastomeric coating — specialist remedial facade system",
    dataNote: "Owner to confirm — product name not found: 'Nutech Nuvol' was not found on nutechpaint.com.au at the time of verification; the Nutech range includes roof coatings (NuFlex, TileFlex), concrete sealers, and sports surface coatings, with no facade elastomeric product called 'Nuvol'. Confirm whether a Nutech facade elastomeric coating product exists in the current AU range with Nutech technical before publishing.",
    filterTags: ["Elastomeric", "High-build", "Waterproof", "Crack-tolerant", "Masonry", "Render", "Concrete", "UV-resistant", "Coastal", "Two-coat"],
    techChips: [
      { label: "Specialist remedial", cls: "bg-amber-100 text-amber-800" },
      { label: "High-build", cls: "bg-red-100 text-red-800" },
      { label: "Waterproof", cls: "bg-blue-100 text-blue-700" },
      { label: "Elastomeric", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Nutech Nuvol is a high-performance elastomeric coating specifically developed for the Australian remedial building market. It is positioned as a specialist facade protection system for masonry, render, and concrete substrates on strata buildings requiring superior waterproofing, crack accommodation, and UV resistance in demanding Australian climatic conditions. Nutech is an Australian company with strong market positioning in the remedial and strata painting sector across NSW and Queensland. Nuvol is applied by brush, roller or spray as a high-build system over Nutech primers and provides a thick, flexible protective film that resists hydrostatic moisture penetration. It is particularly suited to commercial and multi-storey strata facades where durability, waterproofing, and long service life are specification priorities. Confirm current product specification, primer requirements, DFT, and system documentation from Nutech technical before specifying.",
    technicalProperties: [
      "High-performance elastomeric binder — designed specifically for the Australian remedial strata market",
      "High-build system — thick protective film — significantly enhanced waterproofing and crack accommodation",
      "UV-resistant — formulated for Australian coastal and high-UV exposures",
      "Suitable for masonry, render and concrete on residential and commercial Class 2 strata buildings",
      "Nutech — Australian company — technical support and specification service for strata remediation projects",
      "Confirm current product specification and system documentation from Nutech technical before specifying",
    ],
    limitations: [
      "Specialist product — confirm current availability and pricing through Nutech trade supply network",
      "Not a crack-bridging system for actively moving structural cracks — specify crack-bridging system where required",
      "System requires compatible Nutech primer — do not mix system components from other manufacturers without confirmation",
      "Confirm current product name and system documentation from Nutech — product range may be updated",
    ],
    procurementSources: [
      { name: "Nutech Paints — trade supply", url: "https://www.nutechpaint.com.au" },
      { name: "Nutech — NSW and QLD trade network", url: "https://www.nutechpaint.com.au" },
      { name: "Confirm local availability with Nutech Australia", url: "https://www.nutechpaint.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://www.sika.com/en/construction/solutions/waterproofing-protection.html",
    tdsUrl: "https://aus.sika.com/en/solutions_products/02/02a015/02a015sa01/sikagard-545-w-elastocolor.html",
    accentColor: "#059669",
    name: "Sika Sikagard 545 W Elastocolor",
    descriptionLine: "Specialist elastomeric waterproof coating for concrete and masonry facades — Sika professional remedial system with high elongation, UV resistance and waterproofing for strata and commercial buildings",
    productType: "Specialist elastomeric waterproof facade coating — concrete and masonry",
    dataNote: "Owner to confirm — product does not exist in the Sika AU range: the product URL on aus.sika.com returns 404, and 'Sikagard 545 W Elastocolor' appears to be a European product not sold in Australia. The Sika AU elastomeric coating is 'Sikagard 550 W Elastic' (a crack-bridging product — see the crack-bridging file). Confirm whether any Sika elastomeric (non-crack-bridging) facade coating product exists in the current Sika AU range with Sika technical before publishing.",
    filterTags: ["Elastomeric", "High-build", "Waterproof", "Crack-tolerant", "Masonry", "Concrete", "Water-based", "UV-resistant", "Coastal"],
    techChips: [
      { label: "Sika professional", cls: "bg-green-100 text-green-800" },
      { label: "High elongation", cls: "bg-amber-100 text-amber-700" },
      { label: "Waterproof", cls: "bg-blue-100 text-blue-700" },
      { label: "Concrete specialist", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Sika Sikagard 545 W Elastocolor is a specialist elastomeric waterproof facade coating in the Sika professional remedial product range. It provides high elongation at break — enabling the coating to bridge fine and hairline cracks in the substrate — combined with strong UV resistance and waterproofing performance on concrete and masonry facades. Sikagard 545 W Elastocolor is a water-based elastomeric system applied as part of the Sika facade protection system upstream of Sika primers and with Sika reinforcing fabric for more demanding crack-bridging applications. It is primarily specified on commercial and multi-storey strata buildings where a professional-grade remedial facade coating system is required. Available through Sika's national trade and contractor supply network. Confirm current product specification, system documentation, primer requirements, and DFT from the current Sika Sikagard 545 W Elastocolor TDS before specifying.",
    technicalProperties: [
      "High elongation at break — bridges fine and hairline cracks in concrete and masonry substrates",
      "Waterproof — forms a continuous flexible waterproof film over the facade surface",
      "UV-resistant — suitable for Australian exterior exposure including coastal environments",
      "Water-based elastomeric — low VOC — suitable for occupied building facade repainting",
      "Part of the Sika facade protection system — confirm primer and system specification from Sika technical",
      "Available through Sika's national trade and contractor supply network",
    ],
    limitations: [
      "Specialist product — confirm current system specification with Sika Australia technical before specifying",
      "Not a structural crack repair system — confirm with Sika before applying over actively moving structural cracks",
      "System requires Sika primer — do not mix with other manufacturer systems without confirmation",
      "Confirm current Australian product name and TDS — Sika product range and naming may be updated",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply", url: "https://aus.sika.com" },
      { name: "Sika distributors — national building trade network", url: "https://aus.sika.com" },
      { name: "Confirm local distributor with Sika Australia", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#dc2626",
    name: "Mapei Elastocolor Paint",
    descriptionLine: "Elastomeric waterproof coating for concrete and masonry facades — Mapei specialist remedial system with high elongation, anti-carbonation protection and UV resistance for strata and commercial buildings",
    productType: "Elastomeric waterproof facade coating — concrete and masonry — Mapei system",
    filterTags: ["Elastomeric", "High-build", "Waterproof", "Crack-tolerant", "Masonry", "Concrete", "Water-based", "UV-resistant", "Coastal", "Anti-fungal"],
    techChips: [
      { label: "Mapei specialist", cls: "bg-red-100 text-red-800" },
      { label: "Anti-carbonation", cls: "bg-amber-100 text-amber-700" },
      { label: "Elastomeric", cls: "bg-green-100 text-green-700" },
      { label: "Waterproof", cls: "bg-blue-100 text-blue-700" },
    ],
    systemDescription:
      "Mapei Elastocolor Paint is a specialist elastomeric waterproof coating for concrete and masonry facades in the Mapei professional remedial product range. It provides high elongation at break enabling fine crack bridging, combined with waterproofing, UV resistance, anti-fungal properties, and anti-carbonation protection — making it particularly suited to concrete facade remediation where carbonation-induced corrosion of reinforcement is a design consideration alongside waterproofing. Elastocolor Paint is applied as part of the Mapei facade protection system and is designed to work with Mapei primers and reinforcement systems for more demanding crack-bridging applications. Available through Mapei's national trade supply and building contractor network. Confirm current product specification, system documentation, primer requirements, and DFT from the current Mapei Elastocolor Paint TDS before specifying.",
    technicalProperties: [
      "Elastomeric binder — high elongation at break — bridges fine and hairline cracks in concrete and masonry",
      "Waterproof — forms continuous flexible waterproof membrane over facade surface",
      "Anti-carbonation protection — reduces CO₂ diffusion into concrete — relevant for reinforcement protection",
      "UV-resistant and anti-fungal — suitable for Australian exterior exposure including coastal environments",
      "Part of the Mapei facade protection system — confirm primer specification from Mapei technical",
      "Available through Mapei's national trade and contractor supply network",
    ],
    limitations: [
      "Specialist product — confirm current system specification with Mapei Australia technical before specifying",
      "Not a structural crack repair system — confirm with Mapei before applying over actively moving structural cracks",
      "System requires Mapei primer — do not mix with other manufacturer systems without confirmation",
      "Confirm current Australian product TDS and specification — Mapei product documentation may be updated",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply", url: "https://www.mapei.com/au" },
      { name: "Mapei distributors — national building trade network", url: "https://www.mapei.com/au" },
      { name: "Confirm local availability with Mapei Australia", url: "https://www.mapei.com/au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Elastomeric", label: "Elastomeric" },
  { id: "High-build", label: "High-build" },
  { id: "Waterproof", label: "Waterproof" },
  { id: "Crack-tolerant", label: "Crack-tolerant" },
  { id: "Masonry", label: "Masonry" },
  { id: "Render", label: "Render" },
  { id: "Concrete", label: "Concrete" },
  { id: "Water-based", label: "Water-based" },
  { id: "UV-resistant", label: "UV-resistant" },
  { id: "Coastal", label: "Coastal rated" },
  { id: "Anti-fungal", label: "Anti-fungal" },
  { id: "Two-coat", label: "Two-coat" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  binder: string;
  elongation: string;
  waterproof: string;
  antiFungal: string;
  coastal: string;
  primaryUse: string;
}[] = [
  {
    product: "Acratex Weathershield Flex",
    brand: "Dulux",
    binder: "Elastomeric acrylic",
    elongation: "High — confirm TDS",
    waterproof: "Yes",
    antiFungal: "Yes",
    coastal: "Yes",
    primaryUse: "Benchmark elastomeric — Dulux Acratex system — wide availability",
  },
  {
    product: "Permalastic",
    brand: "Solver",
    binder: "Elastomeric acrylic",
    elongation: "High — confirm TDS",
    waterproof: "Yes",
    antiFungal: "Confirm TDS",
    coastal: "Confirm TDS",
    primaryUse: "Solver system — VIC and eastern Australia — strata repainting",
  },
  {
    product: "Endure Exterior Flex",
    brand: "Taubmans",
    binder: "Flexible acrylic",
    elongation: "Moderate — confirm TDS",
    waterproof: "Yes",
    antiFungal: "Yes",
    coastal: "Confirm TDS",
    primaryUse: "Taubmans system — residential and commercial strata",
  },
  {
    product: "Nuvol Elastomeric",
    brand: "Nutech",
    binder: "High-performance elastomeric",
    elongation: "High — confirm TDS",
    waterproof: "Yes",
    antiFungal: "Confirm TDS",
    coastal: "Yes",
    primaryUse: "Specialist remedial — strata market NSW/QLD — Australian company",
  },
  {
    product: "Sikagard 545 W Elastocolor",
    brand: "Sika",
    binder: "Elastomeric — water-based",
    elongation: "High — confirm TDS",
    waterproof: "Yes",
    antiFungal: "Confirm TDS",
    coastal: "Yes",
    primaryUse: "Sika professional remedial — concrete and masonry — commercial",
  },
  {
    product: "Elastocolor Paint",
    brand: "Mapei",
    binder: "Elastomeric — water-based",
    elongation: "High — confirm TDS",
    waterproof: "Yes",
    antiFungal: "Yes",
    coastal: "Yes",
    primaryUse: "Mapei remedial system — anti-carbonation — concrete facades",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Facade repainting on masonry and render where enhanced waterproofing and flexibility are required beyond standard exterior acrylic",
    "Protective coating on facades with fine or hairline crack formation where minor crack accommodation is required",
    "Repainting of shaded, south-facing or moisture-exposed facades where waterproof and anti-fungal performance is a specification priority",
    "Commercial and multi-storey strata facade repainting where extended service life and durability are required",
    "Concrete facade protection where anti-carbonation protection is a design consideration alongside waterproofing",
  ],
  selectionCriteria: [
    "Specify elastomeric coating where the substrate has fine or hairline cracking and minor crack movement is expected",
    "Specify where enhanced waterproofing is required — facades with moisture ingress through render or masonry",
    "Select specialist professional-grade elastomeric systems for commercial and multi-storey strata facades",
    "Always specify over compatible primer — alkali-resistant primer mandatory on new or unpainted render",
    "Do NOT specify elastomeric coating as a substitute for structural crack repair — address moving cracks before coating",
    "Confirm system with manufacturer — DFT, primer, and overcoat intervals vary between brands",
  ],
  limitations: [
    "Elastomeric coatings bridge fine and hairline cracks — they do NOT seal actively moving or structural cracks",
    "Higher DFT and lower coverage rate than standard exterior acrylic — requires accurate coverage calculation",
    "System requires compatible primer — do not apply elastomeric coating directly to bare or unpainted render",
    "Touch-up areas require compatible primer and full system application — elastomeric coatings are difficult to patch",
    "Not a substitute for structural investigation and crack repair where cracks exceed fine hairline width or are actively moving",
  ],
  standardsNotes: [
    "AS 4548 — Guide to long-life coatings for concrete and masonry — relevant for elastomeric facade coating specification",
    "AS 3730 — Guide to properties of paints for buildings — paint classification reference",
    "NATSPEC — Section 0233 — Exterior painting specification — confirm applicable worksection",
    "Manufacturer TDS — confirm DFT, coverage, primer specification, and overcoat intervals",
    "NCC Volume One — external coating systems must not compromise fire performance of the wall assembly",
  ],
  suitableDefects: [
    "Fine and hairline cracking in cement render facades — moisture entry through render cracks",
    "Facades with recurring fine crack formation due to thermal cycling or minor substrate movement",
    "Moisture-affected render and masonry facades requiring enhanced waterproofing beyond standard exterior acrylic",
    "Biological growth on moisture-affected facades — biocide treatment then elastomeric recoating with anti-fungal system",
    "UV-faded or deteriorated existing elastomeric coating requiring recoating with compatible system",
  ],
  typicalSubstrates: [
    "Cement render — new (primed) and existing painted — common elastomeric coating substrate on strata facades",
    "Brick and block masonry — porous surfaces requiring enhanced waterproofing in wet or coastal exposures",
    "Concrete panel facades — particularly for anti-carbonation elastomeric systems",
    "Existing sound elastomeric coating — confirm compatibility before recoating with new elastomeric system",
    "Fibre cement cladding — confirm system suitability with manufacturer before applying elastomeric topcoat",
  ],
};

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
        <button onClick={() => setExpanded((e) => !e)} className="text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide ↑" : "See more ↓"}</button>
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

export function ElastomericCoatingIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are elastomeric coating systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Elastomeric coatings are high-build flexible exterior coatings for masonry and render facades that provide enhanced waterproofing, crack tolerance, and durability compared to standard exterior acrylics. The elastomeric binder allows the coating film to stretch and recover with substrate movement, accommodating fine and hairline cracks without splitting.
        </p>
        {expanded && (
          <>
            <p>
              Unlike standard exterior acrylic topcoats which are relatively rigid films, elastomeric systems are designed to flex with the substrate through thermal cycling and minor movement. This makes them particularly suitable for facades with fine crack formation where moisture ingress through cracks is a concern. However, elastomeric coatings are not crack-bridging systems for actively moving or structural cracks — those require specialist high-elongation crack-bridging membranes applied with fabric reinforcement.
            </p>
            <p>
              Elastomeric coatings are applied at significantly higher DFT than standard exterior acrylics and require compatible primer systems. The higher build provides the flexible membrane thickness necessary for the elongation properties to function. System specification — primer type, DFT, number of coats, and overcoat interval — must be confirmed from the current manufacturer TDS before specifying on a remedial project.
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

export function ElastomericCoatingProductSection() {
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
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button type="button" onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable substrates</p>
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
            <p className="mt-1 text-sm text-slate-500">6 products — 6 brands — elastomeric coating systems — scroll to view all</p>
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
          <span className="text-xs font-semibold text-slate-400">{visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — 3 visible, scroll for more</span>
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
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
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
                <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3 space-y-2">
                  {product.dataNote && <DataNote text={product.dataNote} />}
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of elastomeric coating systems. Confirm all product selections against the current manufacturer TDS before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Binder</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Elongation</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Waterproof</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Anti-fungal</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coastal</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.binder}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.elongation}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.waterproof}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.antiFungal}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coastal}</td>
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
