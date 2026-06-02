"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "PVC-sheet"
  | "Polyester-reinforced"
  | "Fleece-backing"
  | "Glass-inlay"
  | "Loose-laid"
  | "Ballasted"
  | "Projex-Group"
  | "Fatra-Australia"
  | "Sika"
  | "Root-resistant"
  | "FLL-certified"
  | "Green-roof"
  | "AS-4654"
  | "Under-tile-option"
  | "Insulated-config"
  | "Warranty-15yr"
  | "Warranty-20-30yr"
  | "Confirm-availability";

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
  specifierNote?: string;
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Wolfin Membranes / Projex Group Australia",
    brandUrl: "https://projex.com.au",
    tdsUrl: "https://projex.com.au/products/wolfin-membrane/",
    accentColor: "#1d4ed8",
    name: "Wolfin IB",
    descriptionLine: "Polyester-reinforced PVC membrane — loose-laid and ballasted — hot-air welded seams — Wolfinsteel galvanised or 316L SS perimeter profiles — roof decks, podium slabs, green roofs, and planter boxes — FLL root resistant — AS 4654.1:2012 compliant — up to 15-year warranty",
    productType: "Loose-laid ballasted PVC single-ply membrane — AS 4654.1:2012 — FLL root resistant",
    filterTags: ["PVC-sheet", "Polyester-reinforced", "Loose-laid", "Ballasted", "Projex-Group", "Root-resistant", "FLL-certified", "Green-roof", "AS-4654", "Warranty-15yr"],
    techChips: [
      { label: "Polyester-reinforced PVC", cls: "bg-blue-100 text-blue-800" },
      { label: "Loose-laid ballasted", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 4654.1:2012 — NATA certified", cls: "bg-green-50 text-green-700" },
      { label: "FLL root resistant", cls: "bg-green-50 text-green-700" },
      { label: "Up to 15-year warranty", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Wolfin IB is Projex Group's primary loose-laid ballasted single-ply PVC membrane for roof decks, podium slabs, large terraces, and green roofs in the Australian market. The polyester-reinforced PVC membrane is manufactured in Germany and has been installed across Australia since the late 1980s — a documented track record of performance in all Australian climatic zones including coastal, tropical, and alpine environments.\n\nIn the ballasted configuration, Wolfin IB is unrolled loose-laid over the prepared substrate. Adjacent rolls are overlapped and hot-air welded at seams. Wolfinsteel galvanised or 316L stainless steel perimeter profiles are fixed to the substrate at all edges and upstands — the membrane is welded to the Wolfinsteel face, encapsulating all fixings within the profile body with no exposed fasteners through the membrane field. Pebble or paver ballast is placed in the field area after seam testing — the Wolfinsteel profiles provide mechanical restraint at the perimeter and corner zones where wind uplift forces are highest.\n\nWolfin IB is FLL certified for root penetration resistance — the same membrane is used on green roofs and planter boxes where root resistance is required. Confirmed AS 4654.1:2012 compliant. NATA certified. Every Wolfin installation is inspected by Projex Group and backed by a single-point warranty on workmanship and materials for up to 15 years issued to the building owner.",
    technicalProperties: [
      "Polyester-reinforced PVC single-ply membrane — manufactured in Germany",
      "Loose-laid and ballasted installation — hot-air welded seams",
      "Wolfinsteel perimeter profiles — galvanised or 316L stainless — encapsulated fixings — no exposed fasteners through the membrane field",
      "UV stable — root resistant — FLL certified for green roof and planter box applications",
      "AS 4654.1:2012 compliant — NATA certified",
      "Compatible with pebble ballast and paver ballast systems — see Ballast Systems page for ballast materials",
      "Up to 15-year single-point workmanship and materials warranty issued to building owner — Projex Group accredited applicator required",
      "Suitable applications: roof decks, podium slabs, green roofs, planter boxes, large terraces",
    ],
    limitations: [
      "Projex Group-accredited applicator required — confirm applicator availability in the project location before specifying",
      "Ballast weight and zone requirements must be confirmed by wind uplift analysis per AS/NZS 1170.2 — see Ballast Systems page",
      "Structural engineer must confirm slab dead load capacity before ballast is specified",
      "PVC contains plasticisers — separate from bituminous materials with a compatible separation layer where contact may occur",
      "Seams must be tested by point probe or air lance before ballast is placed — once covered, seams cannot be accessed or repaired without full ballast removal",
      "Wolfinsteel 316L stainless must be specified for coastal and marine-exposed locations — confirm with Projex Group",
      "Confirm current product specification, warranty terms, and accredited applicator availability with Projex Group before specifying",
    ],
    procurementSources: [
      { name: "Projex Group — sole Australian distributor for Wolfin", url: "https://projex.com.au" },
      { name: "Installation by Projex Group-accredited applicators only", url: "https://projex.com.au" },
    ],
    specifierNote: "Confirm accredited applicator availability, wind uplift analysis, and structural loading with Projex Group before specifying. Ballast materials are on the Ballast Systems page.",
  },
  {
    fullLabel: "Wolfin Membranes / Projex Group Australia",
    brandUrl: "https://projex.com.au",
    tdsUrl: "https://projex.com.au/products/cosmofin/",
    accentColor: "#2563eb",
    name: "Cosmofin FG / FG LL",
    descriptionLine: "Reinforced PVC membrane — 2mm including fleece backing — loose-laid ballasted or fully bonded — hot-air welded — factory corner pieces and drain outlets — AS 4654.1 and AS 4858 compliant — under-tile option via fleece bond — FLL root resistant — up to 15-year warranty",
    productType: "Reinforced PVC single-ply membrane with fleece backing — AS 4654.1 — AS 4858",
    filterTags: ["PVC-sheet", "Fleece-backing", "Loose-laid", "Ballasted", "Projex-Group", "Root-resistant", "FLL-certified", "AS-4654", "Under-tile-option", "Warranty-15yr"],
    techChips: [
      { label: "Reinforced PVC — fleece backing", cls: "bg-blue-100 text-blue-800" },
      { label: "Loose-laid ballasted or bonded", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 4654.1:2012 (FG) — AS 4858 (FG LL)", cls: "bg-green-50 text-green-700" },
      { label: "FLL root resistant — NATA certified", cls: "bg-green-50 text-green-700" },
      { label: "Up to 15-year warranty", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Cosmofin FG is Projex Group's reinforced PVC single-ply membrane that can be used in loose-laid ballasted configurations on roof decks and podium slabs, and also in bonded configurations where a fleece-backed membrane is required for tile adhesive bonding in under-tile applications. This dual capability makes Cosmofin FG particularly useful on projects that combine a ballasted membrane zone over the main podium slab with a tiled zone at threshold areas or podium edges — a single membrane product covers both areas.\n\nCosmofin is manufactured in Germany by Wolfin Membranes. The system includes factory pre-made corner pieces and drain outlets in the same PVC compound as the membrane, ensuring full material compatibility at the critical junction details. Roll size 1.65m × 15m, 2mm thick including fleece. The PVC compound is FLL certified for root penetration resistance. Two variants: Cosmofin FG (AS 4654.1:2012 compliant) and Cosmofin FG LL (also AS 4858 compliant for internal and wet area applications). NATA certified.\n\nIn the ballasted configuration, Cosmofin FG is loose-laid, hot-air welded at seams, and held by pebble or paver ballast in the field area with Wolfinsteel profiles at all perimeters. Confirm which variant (FG or FG LL) is required for the specific application standard before specifying.",
    technicalProperties: [
      "Reinforced PVC single-ply membrane — 2mm thick including fleece backing — 1.65m × 15m rolls",
      "Loose-laid ballasted or fully bonded installation — hot-air welded seams",
      "Factory pre-made corner pieces and drain outlets in the same PVC compound as the membrane — full material compatibility at junctions",
      "Fleece backing — compatible with tile adhesive in under-tile applications — allows single product across ballasted and tiled zones",
      "FLL certified root resistant — AS 4654.1:2012 compliant (FG) — AS 4858 compliant (FG LL) — NATA certified",
      "Wolfinsteel perimeter profiles for loose-laid ballasted configuration",
      "Up to 15-year single-point workmanship and materials warranty — Projex Group-accredited applicator required",
    ],
    limitations: [
      "Projex Group-accredited applicator required — confirm applicator availability before specifying",
      "Confirm FG vs FG LL variant against the required application standard before specifying — not interchangeable without checking the standard",
      "Ballast weight and zone requirements confirmed by wind uplift analysis — see Ballast Systems page",
      "Structural engineer must confirm slab dead load capacity before ballast is specified",
      "PVC — separate from bituminous materials with a compatible separation layer where contact may occur",
      "Tile adhesive compatibility with fleece backing must be confirmed with Projex Group technical for under-tile applications",
      "Seams must be tested before ballast is placed — once covered, seams cannot be accessed without full ballast removal",
      "Confirm current product specification, variant availability, and warranty terms with Projex Group before specifying",
    ],
    procurementSources: [
      { name: "Projex Group — sole Australian distributor for Cosmofin", url: "https://projex.com.au" },
      { name: "Installation by Projex Group-accredited applicators only", url: "https://projex.com.au" },
    ],
    specifierNote: "Confirm correct variant (FG or FG LL), accredited applicator availability, and wind uplift analysis with Projex Group before specifying.",
  },
  {
    fullLabel: "Fatra Australia",
    brandUrl: "https://fatraaustralia.com.au",
    tdsUrl: "https://fatraaustralia.com.au/roof/concrete/uninsulated-ballasted",
    accentColor: "#065f46",
    name: "Fatrafol 810v",
    descriptionLine: "Reinforced PVC membrane — loose-laid and ballasted — pebble, paver, or pedestal ballast — uninsulated and insulated (inverted roof) configurations — CAD details, WORD spec templates, and certification available at fatraaustralia.com.au — 20 and 30-year manufacturer warranty — Fatra Australia accredited applicator required",
    productType: "Reinforced PVC loose-laid ballasted membrane — Fatra Australia system — uninsulated and insulated",
    filterTags: ["PVC-sheet", "Loose-laid", "Ballasted", "Fatra-Australia", "Insulated-config", "Warranty-20-30yr"],
    techChips: [
      { label: "Reinforced PVC — Fatra system", cls: "bg-emerald-100 text-emerald-800" },
      { label: "Loose-laid ballasted", cls: "bg-slate-100 text-slate-700" },
      { label: "Uninsulated and insulated config", cls: "bg-green-50 text-green-700" },
      { label: "CAD details + WORD spec at fatraaustralia.com.au", cls: "bg-slate-100 text-slate-700" },
      { label: "20 and 30-year warranty available", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Fatrafol 810v is Fatra Australia's reinforced PVC single-ply membrane for loose-laid ballasted roof deck and podium slab applications. Confirmed at fatraaustralia.com.au for concrete uninsulated ballasted and insulated ballasted configurations. In the ballasted system, Fatrafol 810v is loose-laid on the prepared concrete substrate with adjacent rolls hot-air welded at seams. Ballast — pebble, concrete pavers, or adjustable pedestals with pavers — is placed above the membrane after seam testing.\n\nFatra Australia offers two ballasted system configurations for the Fatrafol 810v: uninsulated ballasted (membrane directly on concrete slab — ballast above membrane) and insulated ballasted as an inverted roof (membrane on concrete slab — XPS insulation above membrane — ballast above insulation). See the Tapered Insulation page for the insulated configuration.\n\nFatra Australia provides comprehensive project documentation — CAD detail drawings, WORD specification templates, technical data sheets, maintenance guides, and certification are all available through fatraaustralia.com.au. This documentation package is a significant advantage for specifiers who need to integrate the product into a formal project specification. Fatra Australia also offers 20-year and 30-year manufacturer-backed warranties, described as Australia's only 30-year manufacturer warranty on an insulated waterproofing system.",
    technicalProperties: [
      "Reinforced PVC single-ply membrane — Fatra system — manufactured to Fatra specification",
      "Loose-laid ballasted installation — hot-air welded seams",
      "Ballast options: washed river pebble, precast concrete pavers, or adjustable pedestal and paver system",
      "Uninsulated configuration: membrane directly on concrete slab — ballast above membrane",
      "Insulated configuration (inverted roof): membrane on slab — XPS insulation above — ballast above XPS — see Tapered Insulation page",
      "CAD detail drawings, WORD specification templates, TDS, maintenance guide, and certification available at fatraaustralia.com.au",
      "20-year and 30-year manufacturer warranty available — Fatra Australia accredited applicator required",
    ],
    limitations: [
      "Fatra Australia accredited applicator required — confirm applicator availability in the project location before specifying",
      "Ballast type and minimum weight confirmed by wind uplift analysis per AS/NZS 1170.2 — see Ballast Systems page",
      "Structural engineer must confirm slab dead load capacity before ballast is specified",
      "For insulated configuration: confirm XPS specification and compatibility on the Tapered Insulation page",
      "Seams must be tested before ballast is placed — once ballast is in place seams cannot be accessed without full ballast removal",
      "Confirm AS 4654.1 compliance status with Fatra Australia before specifying for projects where AS 4654.1 is a specification requirement",
      "Confirm current system specification, warranty terms, and accredited applicator availability with Fatra Australia before specifying",
    ],
    procurementSources: [
      { name: "Fatra Australia — direct supply and system design", url: "https://fatraaustralia.com.au" },
    ],
    specifierNote: "Confirm system configuration (insulated or uninsulated), ballast type, accredited applicator availability, and warranty terms with Fatra Australia before specifying.",
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/en/construction/roofing/pvc-sheet-membranes/membranes/sarnafil-g-410-20l.html",
    accentColor: "#b91c1c",
    name: "Sarnafil G 410",
    descriptionLine: "PVC membrane with glass non-woven inlay — loose-laid and gravel ballasted — minimum 50mm / 80 kg/m² gravel ballast in field zone — UV stable and root resistant — part of Sika complete roofing system — Sika-accredited applicator required — confirm Australian product availability with Sika Australia",
    productType: "PVC single-ply membrane with glass non-woven inlay — gravel-ballasted — Sika complete roofing system",
    filterTags: ["PVC-sheet", "Glass-inlay", "Loose-laid", "Ballasted", "Sika", "Root-resistant", "Green-roof", "Confirm-availability"],
    techChips: [
      { label: "PVC — glass non-woven inlay", cls: "bg-red-100 text-red-800" },
      { label: "Loose-laid gravel ballasted", cls: "bg-slate-100 text-slate-700" },
      { label: "Min 80 kg/m² field zone ballast", cls: "bg-amber-50 text-amber-700" },
      { label: "UV stable — root resistant", cls: "bg-green-50 text-green-700" },
      { label: "Confirm Australian availability", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "Sika Sarnafil G 410 is a multi-layer PVC single-ply membrane with a glass non-woven inlay specifically designed for gravel-ballasted roof deck, podium slab, and green roof applications. The glass non-woven inlay provides dimensional stability. In the ballasted configuration, Sarnafil G 410 is loose-laid on the prepared substrate — on insulation in a warm roof build-up, or directly on the structural slab in an uninsulated configuration — and held in place by gravel ballast placed above the membrane. Sika specifies a minimum gravel layer depth of 50mm and a minimum ballast weight of 80 kg/m² in field zones for the Sarnafil gravel-ballasted system.\n\nSarnafil G 410 is UV stable and resistant to biological microorganisms. It can be used as the waterproofing layer in green roof assemblies where growing medium, drainage cells, and filter fabric are placed above the ballast layer. It is part of the Sika complete roofing system, which includes compatible Sika insulation, vapour control layers, and perimeter accessories.\n\nSika has a confirmed Australian presence through aus.sika.com — however, Sarnafil G 410 in its ballasted configuration is a specialist roofing system product. Confirm with Sika Australia directly that the product is currently available, that accredited applicators are accessible in the project location, and that the complete Sika ballasted roofing system specification is supported by Sika Australia technical before specifying.",
    technicalProperties: [
      "Multi-layer PVC sheet membrane with glass non-woven inlay — UV stabilised — dimensionally stable",
      "Loose-laid and gravel-ballasted installation — hot-air welded seams",
      "Minimum gravel ballast: 50mm depth / 80 kg/m² in field zone — perimeter and corner zones require more, confirmed by wind uplift analysis",
      "UV stable — root resistant — resistant to biological microorganisms",
      "Part of Sika complete roofing system — includes compatible Sika insulation, vapour control layers, and perimeter accessories",
      "Available in standard thicknesses — confirm current thickness options and product availability with Sika Australia",
      "Sika-accredited applicator required",
    ],
    limitations: [
      "Confirm current Australian product availability and accredited applicator access with Sika Australia before specifying — Sarnafil ballasted roofing is a specialist system",
      "Minimum 80 kg/m² is field zone minimum only — confirm perimeter and corner zone ballast weights with wind uplift analysis — see Ballast Systems page",
      "Structural engineer must confirm slab dead load capacity before ballast is specified",
      "Must be separated from bituminous materials with a compatible separation layer — confirm compatibility requirements with Sika Australia technical",
      "Seams must be tested before ballast is placed — once covered, seams cannot be accessed without full ballast removal",
      "PVC — confirm plasticiser migration separation requirements with Sika for adjacent bituminous materials",
      "Confirm current product TDS, thickness options, system specification, and accredited applicator availability with Sika Australia before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — confirm trade distributor and accredited applicator with Sika Australia", url: "https://aus.sika.com" },
    ],
    specifierNote: "Confirm Australian product availability, accredited applicator availability, and complete Sika system specification with Sika Australia directly before specifying.",
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "PVC-sheet", label: "PVC sheet" },
  { id: "Polyester-reinforced", label: "Polyester reinforced" },
  { id: "Fleece-backing", label: "Fleece backing" },
  { id: "Glass-inlay", label: "Glass non-woven inlay" },
  { id: "Loose-laid", label: "Loose-laid" },
  { id: "Ballasted", label: "Ballasted" },
  { id: "Projex-Group", label: "Projex Group" },
  { id: "Fatra-Australia", label: "Fatra Australia" },
  { id: "Sika", label: "Sika / Sarnafil" },
  { id: "Root-resistant", label: "Root resistant" },
  { id: "FLL-certified", label: "FLL certified" },
  { id: "Green-roof", label: "Green roof" },
  { id: "AS-4654", label: "AS 4654.1" },
  { id: "Under-tile-option", label: "Under-tile option" },
  { id: "Insulated-config", label: "Insulated (inverted) config" },
  { id: "Warranty-15yr", label: "Up to 15-year warranty" },
  { id: "Warranty-20-30yr", label: "20–30 year warranty" },
  { id: "Confirm-availability", label: "Confirm Australian availability" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  material: string;
  seamJoining: string;
  perimeterSystem: string;
  rootResistant: string;
  as4654: string;
  warranty: string;
  accreditedApplicator: string;
  keyRestriction: string;
}[] = [
  {
    product: "Wolfin IB",
    brand: "Projex Group",
    material: "Polyester-reinforced PVC",
    seamJoining: "Hot-air welded",
    perimeterSystem: "Wolfinsteel galvanised or 316L SS — encapsulated fixings",
    rootResistant: "Yes — FLL certified",
    as4654: "Yes — AS 4654.1:2012 — NATA certified",
    warranty: "Up to 15-year single-point",
    accreditedApplicator: "Yes — Projex Group accredited",
    keyRestriction: "Separate from bituminous — ballast weight by wind uplift analysis — seams tested before ballast — structural loading confirmed",
  },
  {
    product: "Cosmofin FG / FG LL",
    brand: "Projex Group",
    material: "Reinforced PVC — fleece backing — 2mm",
    seamJoining: "Hot-air welded — factory corner pieces",
    perimeterSystem: "Wolfinsteel profiles",
    rootResistant: "Yes — FLL certified",
    as4654: "FG: AS 4654.1:2012 — FG LL: also AS 4858 — NATA certified",
    warranty: "Up to 15-year single-point",
    accreditedApplicator: "Yes — Projex Group accredited",
    keyRestriction: "Confirm FG vs FG LL variant — fleece for under-tile applications — seams tested before ballast — structural loading confirmed",
  },
  {
    product: "Fatrafol 810v",
    brand: "Fatra Australia",
    material: "Reinforced PVC — Fatra system",
    seamJoining: "Hot-air welded",
    perimeterSystem: "Fatra system perimeter details — confirm with Fatra Australia",
    rootResistant: "Confirm with Fatra Australia",
    as4654: "Confirm AS 4654.1 with Fatra Australia",
    warranty: "20-year and 30-year manufacturer warranty available",
    accreditedApplicator: "Yes — Fatra Australia accredited",
    keyRestriction: "Uninsulated and insulated configs — CAD and WORD spec at fatraaustralia.com.au — seams tested before ballast — confirm system with Fatra",
  },
  {
    product: "Sarnafil G 410",
    brand: "Sika Australia",
    material: "PVC with glass non-woven inlay",
    seamJoining: "Hot-air welded",
    perimeterSystem: "Sika perimeter accessories — confirm complete system with Sika Australia",
    rootResistant: "Yes — root resistant",
    as4654: "Confirm AS 4654.1 with Sika Australia",
    warranty: "Confirm with Sika Australia",
    accreditedApplicator: "Yes — Sika-accredited",
    keyRestriction: "Confirm Australian availability with Sika Australia — min 80 kg/m² field zone — perimeter zones per wind uplift — separate from bituminous — seams tested before ballast",
  },
];

const TECH_INFO = {
  howItWorks: [
    "Membrane unrolled directly onto prepared substrate without adhesive or mechanical fixings in the field area",
    "Adjacent rolls overlapped (typically 100–150mm depending on system) and hot-air welded to create a continuous watertight sheet",
    "At perimeters, upstands, and edges — mechanical termination profiles (Wolfinsteel or equivalent) fix the membrane edge to the substrate and encapsulate all fixings within the profile body",
    "Ballast placed above the membrane after seam testing — provides wind uplift resistance in the field area",
    "Perimeter profiles provide mechanical restraint at the high-uplift edge zones — reducing the ballast weight required in those zones",
    "System requires specialist hot-air welding equipment and a manufacturer-accredited applicator — not suitable for unlicensed installation",
  ],
  systemTypes: [
    "Loose-laid ballasted (this page): membrane not bonded — fastest to install — requires ballast above — cannot be used on steep slopes or where ballast dead load exceeds structural capacity",
    "Fully bonded: membrane adhered with compatible adhesive — no ballast required — more demanding substrate preparation — Wolfin GWSK and Fatra fully adhered systems — covered on separate pages",
    "Mechanically fixed: membrane attached through insulation with engineered fasteners at specified spacing — used on exposed roofs where neither ballast nor bonding is appropriate",
    "Ballasted systems are preferred where: membrane area is large, structural loading permits ballast, design life favours loose-laid, and substrate movement accommodation without stress concentration is needed",
    "System selection must consider wind uplift zone design, structural loading, substrate condition, and design life — not interchangeable without engineering confirmation",
  ],
  seamTesting: [
    "All hot-air welded seams must be tested after welding and before any ballast is placed — this is a mandatory hold point",
    "Once ballast covers the membrane, all seams are permanently inaccessible without full ballast removal — a major cost and disruption on an occupied strata building",
    "Point probe testing and air lance testing are the standard seam test methods — confirm the required method with the accredited applicator",
    "Every failed seam must be repaired and re-tested before the ballasting sequence continues — partial repair without re-test is not acceptable",
    "The accredited applicator must document all seam test results as part of the project quality record before the installation is signed off and covered",
    "Do not place ballast over untested seams under any circumstances — programme must include adequate time for seam testing",
  ],
  perimeterProfiles: [
    "Wolfin systems (Wolfin IB and Cosmofin, Projex Group) use Wolfinsteel galvanised or 316L stainless steel perimeter profiles at all edges, upstands, and termination points",
    "The Wolfinsteel profile body encapsulates the mechanical fixings to the substrate — the membrane is hot-air welded to the face of the profile, eliminating exposed fasteners through the membrane",
    "This perimeter mechanical restraint carries the high wind uplift forces at the roof edge without requiring excessively heavy ballast in the perimeter zone",
    "Wolfinsteel galvanised — standard specification for inland and non-coastal locations",
    "Wolfinsteel 316L stainless — specify for coastal and marine-exposed locations — confirm exposure classification with Projex Group",
    "Fatra Australia and Sika (Sarnafil) systems use equivalent perimeter termination details — confirm perimeter system design with the respective Australian representative",
  ],
  standardsCompliance: [
    "AS 4654.1 — single-ply sheet membranes for external roof and podium applications — Wolfin and Cosmofin confirmed AS 4654.1:2012 compliant",
    "Fatra Fatrafol 810v and Sarnafil G 410 comply with relevant international standards — confirm AS 4654.1 compliance with the respective Australian representative before specifying",
    "ARDEX WPM 715 (Weldtec) is NOT on this page — it is an exposed UV-resistant membrane designed for exposed use — ARDEX does not publish a ballasted system specification for WPM 715",
    "Ballasting ARDEX WPM 715 would cover a membrane specifically designed and warranted for exposed UV use — do not specify WPM 715 in a ballasted configuration",
    "For exposed single-ply membrane applications, refer to the HDPE Sheet Membranes (roofs/podiums) page or confirm with ARDEX Australia",
    "NCC compliance for waterproofing in Class 2 buildings requires that the specified system meets the relevant Australian Standards — confirm compliance for each system with the manufacturer",
  ],
  accreditedApplicator: [
    "Hot-air welding of PVC and FPO single-ply membranes requires specialist calibrated welding equipment, manufacturer training, and verified installation experience — it cannot be self-performed",
    "Projex Group (Wolfin, Cosmofin): accredited applicator network — confirm applicator availability in the project location directly with Projex Group before specifying",
    "Fatra Australia (Fatrafol): accredited applicator required for all Fatra system installations — confirm with Fatra Australia",
    "Sika Australia (Sarnafil): Sika-accredited applicator required — confirm applicator availability and complete Australian system support with Sika Australia before specifying",
    "Accredited applicators are not available in all locations in Australia — do not specify a product if an accredited applicator cannot be confirmed for the project location",
    "The system warranty is issued through the accredited applicator — an installation by an uncertified installer will not be covered by the manufacturer warranty",
  ],
};

function CollapsibleList({
  items,
  icon,
  limit = 3,
}: {
  items: string[];
  icon: React.ReactNode;
  limit?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, limit);
  const hasMore = items.length > limit;
  return (
    <div>
      <ul className="space-y-1.5">
        {visible.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
            {icon}
            {item}
          </li>
        ))}
      </ul>
      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="mt-2 flex items-center gap-1 text-[10px] font-bold text-sky-700 hover:text-sky-900 transition"
        >
          {expanded ? `Show less ↑` : `+${items.length - limit} more ↓`}
        </button>
      )}
    </div>
  );
}

function CollapsibleCardDesc({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="mt-1">
      {expanded && <p className="mb-1 text-xs leading-5 text-slate-500">{text}</p>}
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="text-[10px] font-bold text-sky-600 hover:text-sky-900 transition"
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
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="mt-1.5 flex items-center gap-1 text-[10px] font-bold text-sky-700 hover:text-sky-900 transition"
      >
        {expanded ? "Show less ↑" : "Show more ↓"}
      </button>
    </div>
  );
}

export function SinglePlyIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are single-ply ballasted membrane systems — roofs and podiums?</h3>
      </div>
      <div className="text-sm leading-7 text-slate-600">
        <p>
          Single-ply ballasted membrane systems are waterproofing systems in which a factory-manufactured polymeric sheet membrane — typically PVC or FPO — is installed loose-laid over a flat roof deck or podium slab and held in place against wind uplift by the weight of ballast material placed above it. The membrane is not bonded to the substrate and not mechanically fixed through the field — it lies free on the deck with adjacent rolls overlapped and hot-air welded at seams. Washed river pebble or precast concrete pavers placed above the membrane provide the dead weight that counteracts wind suction forces acting on the underside of the membrane during wind events. At perimeter edges and upstands, proprietary metal termination profiles provide mechanical restraint, reducing the ballast weight required in those high-uplift zones.
        </p>
        {expanded && (
          <div className="mt-4 space-y-4">
            <p>
              In Australian Class 2 strata remediation, single-ply ballasted systems are specified on communal roof decks, podium slabs above car parks and basements, and large external terraces where the membrane area, structural loading constraints, and design life requirements favour a loose-laid system over a fully bonded or mechanically fixed alternative. The absence of bonding to the substrate means the membrane can be installed rapidly over large areas without substrate priming, and the loose-laid configuration allows the membrane to accommodate minor substrate movement without stress concentration. The ballast above also protects the membrane from UV degradation, physical damage, and foot traffic, significantly extending service life compared to an exposed membrane installation.
            </p>
            <p>
              This page covers the membrane products used in single-ply ballasted systems — Wolfin IB, Cosmofin, Fatrafol 810v, and Sarnafil G 410 in their ballasted configurations. Ballast materials — washed river pebble and precast concrete pavers — are covered on the Ballast Systems page. All systems on this page require installation by manufacturer-accredited specialist applicators with hot-air welding equipment and training.
            </p>
          </div>
        )}
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="mt-3 flex items-center gap-1 text-sm font-bold text-sky-700 hover:text-sky-900 transition"
        >
          {expanded ? "Read less ↑" : "Read more ↓"}
        </button>
      </div>
    </div>
  );
}

function CollapsibleSources({ sources }: { sources: { name: string; url: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <p className="text-[9px] uppercase tracking-wider text-slate-400">PROCUREMENT SOURCES</p>
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="text-[9px] font-bold text-sky-600 hover:text-sky-900 transition"
        >
          {expanded ? "Hide ↑" : "See more ↓"}
        </button>
      </div>
      {expanded && (
        <div className="mb-1.5 space-y-1">
          {sources.map((src) => (
            <div
              key={src.name}
              className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[10px]"
            >
              {src.url !== "#" ? (
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
                <span className="font-semibold text-slate-700">{src.name}</span>
              )}
            </div>
          ))}
        </div>
      )}
      <p className="mt-1 text-[9px] italic text-slate-400">
        Confirm suitability with the current manufacturer TDS before specifying or applying.
      </p>
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

export function SinglePlyBallastProductSection() {
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
              Loose-laid vs bonded vs mechanically fixed — hot-air welding and seam testing — Wolfinsteel perimeter profiles — AS 4654.1 compliance — ARDEX WPM 715 exclusion — accredited applicator requirement
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
              <TechCard icon={<Layers size={15} />} title="How It Works — Loose-Laid Ballasted" items={TECH_INFO.howItWorks} style="bullet" />
              <TechCard icon={<SquareStack size={15} />} title="System Types — Ballasted vs Bonded vs Fixed" items={TECH_INFO.systemTypes} style="bullet" />
              <TechCard icon={<AlertTriangle size={15} />} title="Seam Testing — Mandatory Before Ballast" items={TECH_INFO.seamTesting} style="warn" />
              <TechCard icon={<Ruler size={15} />} title="Perimeter Profiles — Wolfinsteel and Equivalents" items={TECH_INFO.perimeterProfiles} style="check" />
              <TechCard icon={<BookOpen size={15} />} title="Standards and Compliance" items={TECH_INFO.standardsCompliance} style="bullet" />
              <TechCard icon={<CheckCircle size={15} />} title="Accredited Applicator Requirement" items={TECH_INFO.accreditedApplicator} style="check" />
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
            <p className="mt-1 text-sm text-slate-500">
              4 products — 3 brands — loose-laid PVC and FPO single-ply membranes for ballasted roof deck and podium slab applications — hot-air welded seams — accredited applicator required for all systems — ballast materials on the Ballast Systems page
            </p>
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
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""}
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
                      {product.brandUrl !== "#" && (
                        <a
                          href={product.brandUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                        >
                          <ExternalLink size={9} /> Brand Site
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                    {product.techChips.filter(c => c.label.toLowerCase().includes("warranty")).map(chip => (
                      <span key={chip.label} className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${chip.cls}`}>
                        {chip.label}
                      </span>
                    ))}
                  </div>
                  <CollapsibleCardDesc text={product.descriptionLine} />
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
                    <CollapsibleList
                      items={product.technicalProperties}
                      icon={<CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" />}
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">Limitations</p>
                    <CollapsibleList
                      items={product.limitations}
                      icon={<XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />}
                    />
                  </div>
                </div>

                {/* Specifier note */}
                {product.specifierNote && (
                  <div className="mx-5 mb-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
                    <p className="mb-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-700">Specifier Note</p>
                    <p className="text-[10px] leading-4 text-amber-900">{product.specifierNote}</p>
                  </div>
                )}

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
            <h2 className="text-2xl font-extrabold text-sky-950">Single-ply ballasted membrane system comparison</h2>
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of four loose-laid ballasted PVC single-ply membrane systems. Confirm all product selections against the current manufacturer TDS and accredited applicator requirements before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Seam joining</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Perimeter system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Root resistant</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">AS 4654.1</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Warranty</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Accredited applicator</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key restriction</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.seamJoining}</td>
                  <td className="px-4 py-3 text-slate-600">{row.perimeterSystem}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.rootResistant.startsWith("Yes") ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-green-700">
                        <CheckCircle size={11} /> {row.rootResistant}
                      </span>
                    ) : (
                      <span className="text-slate-500 italic">{row.rootResistant}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{row.as4654}</td>
                  <td className="px-4 py-3 text-slate-600">{row.warranty}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 font-semibold text-green-700">
                      <CheckCircle size={11} /> {row.accreditedApplicator}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.keyRestriction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
