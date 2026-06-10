"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "PIR"
  | "XPS"
  | "Mineral-wool"
  | "Tapered"
  | "Warm-roof"
  | "Inverted-roof"
  | "Foil-faced"
  | "Mechanically-fixed"
  | "Fully-adhered"
  | "Single-ply-compatible"
  | "Bituminous-compatible"
  | "Podium-slab"
  | "Roof-deck"
  | "NCC-Section-J"
  | "High-thermal-performance"
  | "Project-specific-design"
  | "Falls-creation"
  | "Warranty"
  | "Condensation-risk"
  | "NSW"
  | "Service-based"
  | "Moisture-resistant"
  | "Closed-cell"
  | "Compressive-strength"
  | "Ballasted-roof"
  | "Green-roof"
  | "Trade-supply"
  | "Non-combustible"
  | "Fire-performance"
  | "Kingspan";

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
  specifierNote: string;
  procurementSources: { name: string; url?: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Recticel Insulation / WPD Group",
    brandUrl: "https://www.wpdgroup.com.au/pages/recticel-insulation",
    tdsUrl: "https://www.wpdgroup.com.au/pages/recticel-insulation",
    accentColor: "#b45309",
    name: "Recticel Eurothane Silver A",
    descriptionLine: "PIR rigid foam tapered insulation board — foil-faced both sides — bespoke tapered layout for falls creation on warm flat roofs and podium slabs — compatible with mechanically fixed single-ply and bituminous waterproofing systems — available in Australia through WPD Group",
    productType: "PIR tapered insulation board — warm roof — bespoke project layout",
    filterTags: ["PIR", "Tapered", "Warm-roof", "Foil-faced", "Mechanically-fixed", "Single-ply-compatible", "Bituminous-compatible", "Podium-slab", "NCC-Section-J", "High-thermal-performance", "Project-specific-design"],
    techChips: [
      { label: "PIR — foil-faced both sides", cls: "bg-amber-100 text-amber-800" },
      { label: "Tapered — bespoke layout", cls: "bg-slate-100 text-slate-700" },
      { label: "Warm roof — below membrane", cls: "bg-green-50 text-green-700" },
      { label: "Single-ply and bituminous", cls: "bg-slate-100 text-slate-700" },
      { label: "Via WPD Group Australia", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Recticel Eurothane Silver A is a PIR (polyisocyanurate) rigid foam tapered thermal insulation board with multi-layer gas-diffusion-tight foil facing on both sides. It is used in warm flat roof assemblies to simultaneously provide thermal insulation and create drainage falls across the deck without a concrete falls screed. The core PIR foam provides high thermal performance — lambda value of the PIR core is low, allowing the required R-value to be achieved at a thinner board cross-section than XPS or mineral wool alternatives.\n\nThe tapered profile is cut to project-specific requirements — Recticel (through its tapered insulation division, Gradient) designs a bespoke layout plan for each roof or podium showing board positions, thicknesses, taper directions, ridges, and valleys to achieve the required drainage fall to the outlets. Boards are labelled for position on site. The system is compatible with mechanically fixed single-ply waterproofing systems and bituminous waterproofing systems — confirm the facing type required for the specific membrane above before ordering.\n\nIn Australia, Recticel Eurothane Silver A is available through WPD Group (Waterproofing Direct). Confirm current stock, minimum order quantities, lead time for tapered layouts, and pricing with WPD Group before specifying.",
    technicalProperties: [
      "PIR rigid foam — foil-faced both sides — gas-diffusion-tight multi-layer foil facers",
      "Tapered configuration — bespoke layout designed for each project",
      "High thermal performance — lambda value confirm with current Recticel TDS",
      "Compatible with mechanically fixed single-ply (PVC, FPO) and bituminous waterproofing systems",
      "Warm roof assembly — insulation below the waterproofing membrane",
      "VCL required below insulation in warm roof assembly above habitable space — confirm specification with Recticel technical",
      "Available in Australia through WPD Group",
    ],
    limitations: [
      "Warm roof assembly only — not for inverted roof (protected membrane) applications above the waterproofing membrane — PIR absorbs moisture in permanently wet above-membrane conditions",
      "VCL specification must be confirmed with Recticel technical for the specific assembly",
      "Bespoke tapered layout must be designed before ordering — cannot be repositioned once cut",
      "Confirm current Australian availability, lead times for tapered layouts, and pricing with WPD Group before specifying",
      "Confirm compressive strength of the specific board grade against the paver, ballast, or traffic loading above",
    ],
    specifierNote: "Confirm tapered layout design, VCL requirement, warm roof assembly position, and Australian availability with WPD Group and Recticel technical before specifying.",
    procurementSources: [
      { name: "WPD Group (Waterproofing Direct) — Australian distributor for Recticel insulation", url: "https://www.wpdgroup.com.au" },
    ],
  },
  {
    fullLabel: "Fatra Australia",
    brandUrl: "https://fatraaustralia.com.au",
    tdsUrl: "https://fatraaustralia.com.au/cut-to-fall/concrete/fully-adhered",
    accentColor: "#0369a1",
    name: "Fatra PIR Tapered Insulation System",
    descriptionLine: "Project-specific PIR tapered insulation board system — fully adhered or mechanically fixed — designed and manufactured for each project to create the required drainage fall — supplied as part of the complete Fatra PVC membrane and insulation system — 20 or 30-year manufacturer-backed warranty available",
    productType: "PIR tapered insulation system — complete warm roof system — Fatra Australia",
    filterTags: ["PIR", "Tapered", "Warm-roof", "Fully-adhered", "Mechanically-fixed", "Project-specific-design", "Podium-slab", "Roof-deck", "Warranty", "Condensation-risk", "NCC-Section-J", "Falls-creation"],
    techChips: [
      { label: "PIR — project-specific", cls: "bg-sky-100 text-sky-800" },
      { label: "Fully adhered system", cls: "bg-slate-100 text-slate-700" },
      { label: "Fatrafol PVC membrane", cls: "bg-green-50 text-green-700" },
      { label: "20 / 30-year warranty", cls: "bg-slate-100 text-slate-700" },
      { label: "Confirmed Australian presence", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Fatra Australia designs and manufactures project-specific PIR tapered insulation systems as part of their complete warm roof waterproofing system — incorporating the Fatra PIR tapered insulation board, the FatraVap or Fatrapar vapour control layer, and the Fatrafol PVC waterproofing membrane above the insulation. The tapered PIR insulation board is manufactured to the site-specific layout plan, creating the required drainage fall across the roof or podium with a claimed 99% degree of accuracy. The system is available in fully adhered and mechanically fixed configurations.\n\nIn the fully adhered system, the FatraVap self-adhesive VCL is bonded directly to the concrete substrate. The PIR insulation board is then fully adhered to the VCL using Fatrabond 1210 moisture-curing PU adhesive. The Fatrafol 807v PVC membrane (fleece-backed) is fully adhered to the tissue-faced insulation board using Fatrabond 1215 moisture-curing PU adhesive — creating a completely non-penetrative, fully bonded warm roof assembly with no mechanical fixings through the membrane field.\n\nIn the mechanically fixed system, the Fatrapar VCL is laid over the substrate. The PIR insulation is mechanically fixed using the Fatra engineered Pad System. The Fatrafol 810v reinforced PVC membrane is attached to the Fatra Pad System using engineered Pad adhesive — again non-penetrative through the membrane. Fatra Australia offers 20-year and what it describes as Australia's only 30-year manufacturer-backed warranty on their insulated waterproofing systems.",
    technicalProperties: [
      "PIR tapered insulation board — manufactured to project-specific layout plan",
      "Fully adhered system: FatraVap VCL + Fatrabond 1210 adhesive + PIR board + Fatrabond 1215 + Fatrafol 807v PVC membrane",
      "Mechanically fixed system: Fatrapar VCL + PIR board mechanically fixed + Fatrafol 810v PVC membrane via Fatra Pad System",
      "Non-penetrative fully adhered option — no mechanical fixings through membrane field",
      "Suitable for: concrete, CLT, and structural steel deck substrates — roofs, podiums, and balconies",
      "20-year and 30-year manufacturer-backed warranty available",
      "Australian presence confirmed — fatraaustralia.com.au",
    ],
    limitations: [
      "Warm roof assembly — insulation below the Fatrafol membrane — not an inverted roof system",
      "Complete Fatra system required — PIR insulation board is not supplied as a standalone product for use with other membrane systems",
      "Bespoke project-specific design required before ordering — layout plan, taper angles, and board thicknesses designed for each project",
      "Fatra-accredited applicator required — confirm availability with Fatra Australia before specifying",
      "Confirm VCL specification, adhesive quantities, and lead times with Fatra Australia before specifying",
      "Green roof variant available — Fatrafol PVC membrane is FLL certified for root resistance — refer to the Root Resistant Membranes page for green roof build-up",
    ],
    specifierNote: "Confirm complete system specification, project-specific tapered layout design, and accredited applicator availability with Fatra Australia before specifying.",
    procurementSources: [
      { name: "Fatra Australia — direct supply and system design", url: "https://fatraaustralia.com.au" },
    ],
  },
  {
    fullLabel: "Enduroflex Australia",
    brandUrl: "https://www.enduroflex.com.au",
    tdsUrl: "https://www.enduroflex.com.au/warm-roof-services",
    accentColor: "#0d9488",
    name: "Enduroflex Tapered Insulation Service",
    descriptionLine: "Warm roof tapered insulation design and installation service — New South Wales — condensation risk analysis provided — PIR tapered board systems for falls creation on podium slabs and roof decks — confirm availability for the specific project location with Enduroflex before specifying",
    productType: "Warm roof tapered insulation service — NSW — condensation risk analysis included",
    filterTags: ["PIR", "Tapered", "Warm-roof", "Podium-slab", "Roof-deck", "NCC-Section-J", "NSW", "Service-based", "Condensation-risk", "Falls-creation"],
    techChips: [
      { label: "Service-based", cls: "bg-teal-100 text-teal-800" },
      { label: "NSW focus", cls: "bg-slate-100 text-slate-700" },
      { label: "Condensation risk analysis", cls: "bg-green-50 text-green-700" },
      { label: "BRANZ appraised DuO system", cls: "bg-slate-100 text-slate-700" },
      { label: "NCC Section J", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Enduroflex provides warm roof tapered insulation design and installation services in New South Wales, offering condensation risk analysis in conjunction with their tapered insulation system specification. Enduroflex supplies the DuO waterproofing membrane (BRANZ appraised) for exposed roof deck, podium, and balcony applications, and offers tapered insulation as part of a complete warm roof system for projects where falls creation within the insulation layer is required.\n\nCondensation risk analysis is a critical design step for warm roof assemblies over habitable spaces — Enduroflex confirms they provide this analysis as part of their warm roof service. This is important in Australian strata remediation where roof decks and podiums are frequently above occupied apartments — incorrect VCL specification or omission can result in interstitial condensation damaging the structure and reducing thermal performance.\n\nEnduroflex's geographic focus is confirmed in New South Wales. Confirm current availability, product range, and geographic reach with Enduroflex before specifying for projects outside NSW.",
    technicalProperties: [
      "Warm roof tapered insulation design and installation service — NSW",
      "PIR tapered insulation for falls creation on flat roof decks and podium slabs",
      "Condensation risk analysis provided as part of warm roof service",
      "Compatible with Enduroflex DuO waterproofing membrane system (BRANZ appraised) — confirm compatibility with other membrane systems",
      "NCC Section J thermal performance assessment available — confirm with Enduroflex",
    ],
    limitations: [
      "Geographic coverage primarily NSW — confirm availability for specific project location with Enduroflex before specifying",
      "Service-based offering — not a standalone tapered insulation product supply — Enduroflex designs and installs as a package",
      "Confirm current product range, membrane system compatibility, and service availability with Enduroflex before specifying",
      "Confirm whether condensation risk analysis and NCC Section J assessment are included or separately priced",
    ],
    specifierNote: "Confirm current service availability, geographic reach, and complete system specification with Enduroflex before specifying.",
    procurementSources: [
      { name: "Enduroflex Australia — direct enquiry for warm roof tapered insulation service", url: "https://www.enduroflex.com.au" },
    ],
  },
  {
    fullLabel: "Various — Owens Corning, Styrofoam, trade supply",
    brandUrl: "https://www.wpdgroup.com.au",
    accentColor: "#475569",
    name: "XPS Extruded Polystyrene Board",
    descriptionLine: "Extruded polystyrene (XPS) rigid insulation board — closed-cell moisture-resistant structure — standard insulation for inverted roof (protected membrane) assemblies above the waterproofing membrane — also used in warm roof and podium slab applications where moisture resistance is required",
    productType: "XPS rigid insulation board — inverted roof above membrane — moisture resistant",
    filterTags: ["XPS", "Inverted-roof", "Moisture-resistant", "Closed-cell", "Compressive-strength", "Podium-slab", "Ballasted-roof", "Green-roof", "Trade-supply", "Warm-roof"],
    techChips: [
      { label: "XPS — closed-cell", cls: "bg-slate-100 text-slate-700" },
      { label: "Inverted roof — above membrane", cls: "bg-green-50 text-green-700" },
      { label: "Moisture resistant", cls: "bg-slate-100 text-slate-700" },
      { label: "200 / 300 / 500 kPa grades", cls: "bg-amber-50 text-amber-700" },
      { label: "Trade supply Australia", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Extruded polystyrene (XPS) rigid insulation board is the standard insulation material for inverted roof (protected membrane) assemblies where the insulation sits above the waterproofing membrane and is in direct contact with water draining through the ballast, paver, or growing medium layers above. The closed-cell structure of XPS provides very low water vapour diffusion resistance and minimal moisture absorption over time — critical in inverted roof applications where the insulation is permanently exposed to moisture.\n\nXPS is placed loose above the cured waterproofing membrane in an inverted roof assembly — below the protection board or drainage layer, and above the membrane. It is held in position by the weight of the ballast, pavers, or growing medium above. XPS boards in an inverted roof do not require bonding to the membrane. A VCL below the membrane is not required in an inverted roof assembly because the membrane itself acts as the moisture barrier.\n\nXPS is also used in warm roof assemblies and podium slab applications where moisture resistance in the insulation layer is a priority, and as protection board over membranes before screed or paver installation on standard balcony and terrace applications (see the Protection Boards page for the protection-only application). Available in multiple compressive strength grades — typically 200 kPa, 300 kPa, and 500 kPa. Confirm the required compressive strength against the paver, ballast, or traffic loading above before specifying.",
    technicalProperties: [
      "Extruded polystyrene (XPS) closed-cell rigid foam",
      "Very low moisture absorption — moisture-resistant structure — suitable for inverted roof (above-membrane) position",
      "Available in compressive strength grades 200 kPa, 300 kPa, 500 kPa — confirm grade for the specific loading",
      "Thermal conductivity: lambda approximately 0.033–0.038 W/mK — lower thermal performance than PIR at same thickness",
      "Suitable for: inverted roof (PMR) assemblies, warm roof assemblies, podium slab insulation",
      "Flat boards available — tapered XPS for falls creation available from specialist suppliers — confirm with supplier",
    ],
    limitations: [
      "Lower thermal performance than PIR at the same thickness — thicker XPS required to achieve the same R-value as PIR",
      "XPS is not recyclable at end of life in most Australian locations — confirm sustainability requirements with the project specification",
      "Tapered XPS for falls creation is less commonly stocked in Australia than flat boards — confirm tapered availability with supplier before specifying",
      "Not a warm roof insulation above a habitable space without VCL consideration — confirm with building physicist for the specific assembly",
      "Confirm current product availability, grade, compressive strength, and pricing with local supplier before specifying",
    ],
    specifierNote: "Confirm inverted or warm roof assembly position, required compressive strength, and Australian availability before specifying.",
    procurementSources: [
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
      { name: "Confirm with local insulation and waterproofing trade suppliers" },
    ],
  },
  {
    fullLabel: "Various — Rockwool, Knauf, Sika Sikatherm",
    brandUrl: "https://aus.sika.com",
    accentColor: "#78716c",
    name: "Mineral Wool Flat Roof Board",
    descriptionLine: "Non-combustible mineral wool rigid insulation board for warm flat roof and podium slab applications — required where NCC or fire engineer specifies non-combustible insulation in the roof build-up — lower thermal performance than PIR — confirm compressive strength and Australian availability before specifying",
    productType: "Mineral wool rigid insulation board — non-combustible — warm roof below membrane",
    filterTags: ["Mineral-wool", "Non-combustible", "Fire-performance", "Warm-roof", "Single-ply-compatible", "Bituminous-compatible", "Podium-slab", "NCC-Section-J", "Compressive-strength"],
    techChips: [
      { label: "Mineral wool — non-combustible", cls: "bg-stone-100 text-stone-800" },
      { label: "Warm roof — below membrane", cls: "bg-slate-100 text-slate-700" },
      { label: "Fire performance", cls: "bg-red-50 text-red-700" },
      { label: "Single-ply and bituminous", cls: "bg-slate-100 text-slate-700" },
      { label: "Confirm AU availability", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Mineral wool (stone wool / rockwool) rigid insulation boards are non-combustible — they do not contribute to fire spread and maintain structural integrity at high temperatures. This makes mineral wool the preferred or required insulation material on roof decks and podium slabs where the NCC, the project fire engineer, or the building certifier specifies non-combustible construction in the roof build-up. In Australian Class 2 strata buildings, non-combustible insulation requirements may apply depending on the building height, construction type, and the fire performance requirements of the specific project.\n\nMineral wool flat roof boards are used in warm roof assemblies — placed above the VCL and below the waterproofing membrane. They are compatible with single-ply PVC and FPO membranes (mechanically fixed through the insulation into the deck) and with torch-on modified bitumen sheet systems where the facer is bitumen-compatible. Thermal performance is lower than PIR — lambda typically 0.033–0.036 W/mK — meaning thicker mineral wool is required to achieve the same R-value as PIR for a given build-up depth.\n\nMineral wool is also available in tapered formats from specialist suppliers for falls creation in warm roof assemblies. Confirm tapered mineral wool availability in Australia with the supplier before specifying — tapered mineral wool is less commonly available in Australia than tapered PIR.",
    technicalProperties: [
      "Non-combustible mineral wool (stone wool) rigid insulation board",
      "Warm roof assembly — placed above VCL and below waterproofing membrane",
      "Compatible with single-ply PVC and FPO mechanically fixed systems and bituminous waterproofing systems",
      "Thermal conductivity: lambda approximately 0.033–0.036 W/mK — lower performance than PIR",
      "Tapered mineral wool available from specialist suppliers — confirm Australian availability",
      "Required where NCC or fire engineer specifies non-combustible insulation in the roof build-up",
    ],
    limitations: [
      "Lower thermal performance than PIR — thicker boards required to achieve the same R-value",
      "Confirm compressive strength of the specific board grade against the paver, ballast, or traffic loading above",
      "Confirm Australian product availability — Rockwool, Knauf, and Sika Sikatherm mineral wool boards may have limited availability in Australia — confirm with local supplier",
      "Tapered mineral wool for falls creation is less commonly stocked in Australia — confirm availability with supplier",
      "VCL required below insulation in warm roof assembly above habitable space — confirm specification with insulation system designer",
    ],
    specifierNote: "Confirm non-combustible requirement with fire engineer, compressive strength for loading, Australian availability, and VCL specification before specifying.",
    procurementSources: [
      { name: "Sika Australia — Sikatherm mineral wool boards — confirm current Australian stocking", url: "https://aus.sika.com" },
      { name: "Confirm with local insulation and roofing trade suppliers — Rockwool, Knauf" },
      { name: "Confirm with project fire engineer and waterproofing consultant for system-specific advice" },
    ],
  },
  {
    fullLabel: "Kingspan Insulation Australia",
    brandUrl: "https://www.kingspan.com/au",
    tdsUrl: "https://www.kingspan.com/au/en/products/insulation/roof-insulation/thermataper-tt46/",
    accentColor: "#be123c",
    name: "Kingspan Thermataper TT46 / TT47",
    descriptionLine: "PIR foil-faced tapered roofing insulation board — TT46 for mechanically fixed single-ply systems — TT47 for flat roof insulation and drainage — bespoke tapered layout design service available — lambda 0.022 W/mK — confirmed Australian product and distribution",
    productType: "PIR tapered insulation board — warm roof — lambda 0.022 W/mK — Kingspan Australia",
    filterTags: ["PIR", "Tapered", "Warm-roof", "Foil-faced", "Mechanically-fixed", "Single-ply-compatible", "Bituminous-compatible", "NCC-Section-J", "High-thermal-performance", "Roof-deck", "Project-specific-design", "Kingspan"],
    techChips: [
      { label: "PIR — lambda 0.022 W/mK", cls: "bg-rose-100 text-rose-800" },
      { label: "Foil-faced — composite", cls: "bg-slate-100 text-slate-700" },
      { label: "Warm roof — below membrane", cls: "bg-green-50 text-green-700" },
      { label: "Bespoke layout design service", cls: "bg-slate-100 text-slate-700" },
      { label: "Confirmed — kingspan.com/au", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Kingspan Thermataper TT46 and TT47 are PIR (polyisocyanurate) tapered insulation boards with composite foil facing on both sides, autohesively bonded to the insulation core during manufacture. Both products are listed on Kingspan's Australian product pages (kingspan.com/au) and are part of Kingspan's Therma Tapered Roofing Systems range — one of the most established tapered insulation systems globally.\n\nTT46 is designed for flat roofs waterproofed with mechanically fixed single-ply membrane systems — compatible with PVC, FPO, and TPO single-ply membranes. It provides 1:60 and 1:80 fall systems depending on the board thickness configuration. Lambda value 0.022 W/mK — among the highest thermal performance available in rigid insulation. TT47 is the companion flat roof insulation and drainage board — used for areas where a constant thickness is required alongside the tapered sections.\n\nKingspan provides a tapered roofing design service — the project-specific roof layout plan, board thicknesses, taper angles, ridges, valleys, hips, and packer boards are designed by Kingspan for each project. Boards are labelled for site placement. The system can be laid on new roofs (eliminating the need for a structural fall) and on existing roofs over existing insulation or waterproofing where the existing substrate is sound — in the over-existing-roof application, provision of a separate VCL may not be required; confirm with Kingspan technical for the specific assembly.",
    technicalProperties: [
      "PIR rigid foam — composite foil facing both sides — autohesively bonded",
      "TT46: for mechanically fixed single-ply waterproofing (PVC, FPO, TPO) — 1:60 and 1:80 fall systems",
      "TT47: companion flat insulation board for constant-thickness areas alongside TT46 tapered sections",
      "Lambda 0.022 W/mK — high thermal performance",
      "Bespoke project-specific tapered layout design service — boards labelled for placement",
      "Suitable for new roofs and installation over existing sound insulation or waterproofing",
      "Confirmed Australian product — kingspan.com/au — confirm current stocking and lead times with Kingspan Australia",
    ],
    limitations: [
      "Warm roof assembly — below the waterproofing membrane — not for inverted roof above-membrane position",
      "TT46 is specified for mechanically fixed single-ply systems — confirm compatibility with fully bonded or torch-on systems with Kingspan technical before specifying",
      "Bespoke layout design required before ordering — cannot be cut on site to a different layout — confirm lead times before committing to programme",
      "VCL required in warm roof assembly over habitable space — confirm specification with Kingspan technical",
      "Confirm current Australian stock availability, minimum order quantities, lead times, and pricing with Kingspan Australia before specifying",
    ],
    specifierNote: "Confirm warm roof assembly compatibility, tapered layout design service scope, VCL requirement, and current Australian availability with Kingspan Australia before specifying.",
    procurementSources: [
      { name: "Kingspan Insulation Australia — confirm trade distributor and tapered layout design service", url: "https://www.kingspan.com/au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "PIR", label: "PIR" },
  { id: "XPS", label: "XPS" },
  { id: "Mineral-wool", label: "Mineral wool" },
  { id: "Tapered", label: "Tapered" },
  { id: "Warm-roof", label: "Warm roof" },
  { id: "Inverted-roof", label: "Inverted roof" },
  { id: "Foil-faced", label: "Foil-faced" },
  { id: "Mechanically-fixed", label: "Mechanically fixed" },
  { id: "Fully-adhered", label: "Fully adhered" },
  { id: "Single-ply-compatible", label: "Single-ply compatible" },
  { id: "Bituminous-compatible", label: "Bituminous compatible" },
  { id: "Podium-slab", label: "Podium slab" },
  { id: "Roof-deck", label: "Roof deck" },
  { id: "NCC-Section-J", label: "NCC Section J" },
  { id: "High-thermal-performance", label: "High thermal performance" },
  { id: "Project-specific-design", label: "Project-specific design" },
  { id: "Falls-creation", label: "Falls creation" },
  { id: "Warranty", label: "20/30-year warranty" },
  { id: "Condensation-risk", label: "Condensation risk analysis" },
  { id: "NSW", label: "NSW" },
  { id: "Service-based", label: "Service-based" },
  { id: "Moisture-resistant", label: "Moisture resistant" },
  { id: "Closed-cell", label: "Closed-cell" },
  { id: "Compressive-strength", label: "Compressive strength" },
  { id: "Ballasted-roof", label: "Ballasted roof" },
  { id: "Green-roof", label: "Green roof" },
  { id: "Trade-supply", label: "Trade supply" },
  { id: "Non-combustible", label: "Non-combustible" },
  { id: "Fire-performance", label: "Fire performance" },
  { id: "Kingspan", label: "Kingspan" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  material: string;
  assemblyPosition: string;
  thermalPerformance: string;
  taperedAvailable: string;
  auAvailability: string;
  keyRestriction: string;
}[] = [
  {
    product: "Eurothane Silver A",
    brand: "Recticel / WPD Group",
    material: "PIR — foil-faced both sides",
    assemblyPosition: "Warm roof — below membrane",
    thermalPerformance: "High — lambda confirm TDS",
    taperedAvailable: "Yes — bespoke via Recticel Gradient",
    auAvailability: "Through WPD Group Australia",
    keyRestriction: "Warm roof only — not inverted above membrane — VCL required — bespoke layout before ordering",
  },
  {
    product: "Fatra PIR Tapered",
    brand: "Fatra Australia",
    material: "PIR — fully adhered or mechanically fixed — complete system",
    assemblyPosition: "Warm roof — below Fatrafol PVC membrane",
    thermalPerformance: "High — confirm with Fatra TDS",
    taperedAvailable: "Yes — project-specific design",
    auAvailability: "Confirmed — fatraaustralia.com.au",
    keyRestriction: "Complete Fatra system — not standalone insulation — accredited applicator required — 20/30-yr warranty",
  },
  {
    product: "Enduroflex Service",
    brand: "Enduroflex",
    material: "PIR — service-based — NSW",
    assemblyPosition: "Warm roof — below membrane",
    thermalPerformance: "Confirm with Enduroflex",
    taperedAvailable: "Yes — design service",
    auAvailability: "NSW confirmed — other states confirm with Enduroflex",
    keyRestriction: "Service not product supply — NSW primary — condensation risk analysis included",
  },
  {
    product: "XPS Board",
    brand: "Various",
    material: "XPS — closed-cell rigid foam",
    assemblyPosition: "Inverted roof above membrane — also warm roof",
    thermalPerformance: "Moderate — 0.033–0.038 W/mK",
    taperedAvailable: "Tapered from specialist suppliers — confirm stocking",
    auAvailability: "Available through trade supply in Australia",
    keyRestriction: "Inverted roof primary use — not PIR — tapered XPS confirm availability — lower thermal performance than PIR",
  },
  {
    product: "Mineral Wool Board",
    brand: "Rockwool / Knauf / Sika Sikatherm",
    material: "Mineral wool — stone wool",
    assemblyPosition: "Warm roof — below membrane",
    thermalPerformance: "Moderate — 0.033–0.036 W/mK",
    taperedAvailable: "Confirm Australian availability",
    auAvailability: "Confirm stocking with local supplier",
    keyRestriction: "Non-combustible — required where NCC or fire engineer specifies — lower thermal performance than PIR",
  },
  {
    product: "Thermataper TT46 / TT47",
    brand: "Kingspan Australia",
    material: "PIR — foil-faced both sides",
    assemblyPosition: "Warm roof — below membrane",
    thermalPerformance: "High — lambda 0.022 W/mK",
    taperedAvailable: "Yes — bespoke project layout design service",
    auAvailability: "Confirmed at kingspan.com/au — confirm stocking and lead times",
    keyRestriction: "Warm roof only — TT46 for mechanically fixed single-ply — confirm torch-on or fully bonded compatibility with Kingspan — VCL required — bespoke layout before ordering",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Roof decks and podium slabs where the existing concrete slab is flat or has insufficient drainage fall — tapered insulation creates required drainage gradient within the build-up without a concrete falls screed",
    "Warm roof assemblies where falls correction within the insulation layer is required and a concrete falls screed would add unacceptable structural load or programme time",
    "Inverted roof (PMR) assemblies where XPS insulation above the membrane must create falls — confirm tapered XPS availability in Australia with supplier before specifying",
    "NCC Section J thermal performance upgrade requirements in Class 2 strata building roof or podium remediation where improved insulation is part of the remediation scope",
    "Podium slabs above habitable spaces where condensation risk must be managed with correctly specified insulation type and vapour control layer",
    "Green roof and planter box podium slabs where insulation above the root resistant membrane is part of the complete system build-up",
  ],
  selectionCriteria: [
    "Determine assembly type first — warm roof (insulation below membrane) or inverted roof (insulation above membrane) — this determines the correct insulation material before any brand is selected",
    "Warm roof: PIR (highest thermal performance, lambda 0.022–0.023 W/mK) or mineral wool (non-combustible) — positioned below the membrane — VCL required on the warm side",
    "Inverted roof: XPS (closed-cell, moisture-resistant) — positioned above the membrane — do not use PIR above the membrane in permanently wet above-membrane conditions",
    "Non-combustible requirement: mineral wool — required where NCC or the project fire engineer specifies non-combustible roof or podium insulation",
    "Compressive strength: confirm the required grade (200 kPa, 300 kPa, 500 kPa) against the paver, ballast, growing medium, or traffic loading above the insulation",
    "NCC Section J R-value: confirm required R-value with thermal performance assessor before specifying insulation type and minimum thickness",
  ],
  materialTypes: [
    "PIR (polyisocyanurate): highest thermal performance — lambda 0.022–0.023 W/mK — warm roof below membrane only — not above membrane in inverted roof — foil-faced — bespoke tapered layouts available from Recticel, Fatra, and Kingspan",
    "XPS (extruded polystyrene): closed-cell — moisture resistant — standard for inverted roof above membrane — lambda 0.033–0.038 W/mK — tapered XPS available from specialist suppliers — confirm stocking in Australia",
    "Mineral wool (stone wool/rockwool): non-combustible — warm roof below membrane — lambda 0.033–0.036 W/mK — compatible with single-ply and bituminous systems — tapered format available but confirm in Australia",
    "Vapour control layer (VCL): mandatory in warm roof over habitable space — placed on warm side between structural deck and insulation — typically self-adhesive bituminous sheet, reinforced PE, or foil-faced board",
    "Tapered profile: varying-thickness boards creating a slope from the high point to drainage outlets — bespoke design per project — fall typically 1:80 to 1:100 — boards manufactured and labelled for placement on site",
  ],
  vapourControl: [
    "In warm roof assemblies over habitable spaces, a vapour control layer (VCL) must be installed between the structural deck and the insulation — placed on the warm side of the insulation",
    "The VCL prevents warm moist air rising from the habitable space below from condensing within the insulation layer — interstitial condensation damages the structure and degrades thermal performance over time",
    "Typical VCL products: self-adhesive bituminous sheet, reinforced polyethylene membrane, or aluminium-foil-faced insulation board — confirm specification with insulation system designer",
    "In inverted roof assemblies, the waterproofing membrane itself acts as the moisture barrier — a separate VCL below the membrane is not typically required — confirm with building physicist for the specific assembly",
    "Do not omit VCL in warm roof assemblies over occupied spaces — omission is a common and serious failure mode resulting in mould and structural damage",
    "Confirm VCL specification with the insulation system designer or building physicist before specifying — the correct VCL type depends on the insulation, membrane, and occupancy below",
  ],
  fallsDesign: [
    "Minimum drainage fall created by the tapered insulation is typically 1:80 to 1:100 — confirm requirement with waterproofing consultant and drainage engineer before ordering",
    "The fall direction, outlet positions, ridges, valleys, and hips in the tapered insulation layout must be designed by the insulation manufacturer or a roof drainage engineer before boards are ordered",
    "Design is carried out by the insulation manufacturer (Recticel Gradient, Kingspan tapered design service, Fatra) or a roof drainage engineer based on the deck geometry and outlet positions — confirm who is responsible before ordering",
    "Boards are manufactured to the project-specific layout with each board labelled for position on site — they cannot be repositioned to a different layout once cut",
    "Confirm lead times for bespoke tapered board manufacture with the supplier well before the installation programme — do not commit to a programme date without confirmed supply lead time",
    "NCC Section J: confirm with building certifier and thermal performance assessor whether the remediation scope triggers a Section J upgrade — the calculated required R-value determines the insulation type and minimum thickness",
  ],
  limitations: [
    "PIR must not be used in inverted roof assemblies above the waterproofing membrane — PIR absorbs moisture in permanently wet above-membrane conditions, degrading thermal performance over time",
    "VCL omission in warm roof assemblies over habitable spaces causes interstitial condensation — confirm VCL specification with building physicist before specifying",
    "Do not order tapered insulation without a confirmed bespoke layout design — boards cut to a specific layout cannot be repositioned to a different plan",
    "Do not assume standard insulation thickness meets NCC Section J requirements without a thermal performance calculation — confirm R-value with thermal performance assessor",
    "Tapered mineral wool and tapered XPS are less commonly available in Australia than tapered PIR — confirm availability before specifying either material in tapered format",
    "Compressive strength must be confirmed for the loading condition — do not assume a standard board grade is adequate without checking manufacturer load ratings for the specific loading above",
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
      <p
        className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}
      >
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

export function TaperedInsulationIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are tapered insulation board systems — roofs and podiums?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Tapered insulation board systems are rigid thermal insulation panels manufactured with a pre-cut slope — a taper — that creates a drainage fall across a flat or near-flat roof deck or podium slab without the need for a sloped concrete screed or structural fall in the slab. By varying the thickness of adjacent boards across the roof or podium area, the insulation layer itself creates the required drainage gradient from the high point of the deck to the outlets. This eliminates the weight, labour, and drying time of a concrete falls screed, and in remediation projects avoids the structural load implications of adding a thick screed over an existing flat slab.
        </p>
        {expanded && (
          <>
            <p>
              In Australian Class 2 strata remediation, tapered insulation systems are specified on roof decks and podium slabs where the existing concrete slab is structurally flat or has insufficient drainage fall, where the waterproofing system is a warm roof assembly (insulation above the membrane) and falls correction within the build-up is required, and where NCC Section J thermal performance requirements must be met as part of the remediation scope. Tapered insulation also provides thermal performance benefits that reduce condensation risk within the roof or podium build-up — an important consideration on concrete deck structures above habitable spaces in Australian strata buildings.
            </p>
            <p>
              Tapered insulation board systems are available in three primary materials: PIR (polyisocyanurate) rigid foam, XPS (extruded polystyrene) rigid foam, and mineral wool. Each material has different thermal performance, compressive strength, moisture resistance, and fire performance characteristics that determine suitability for warm roof, inverted roof, and podium slab applications. Tapered insulation is a design and manufacture exercise specific to each project — the board layout, taper angle, and board thickness at each point on the deck must be designed to achieve the required fall to the drainage outlets before boards are cut and supplied.
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

export function TaperedInsulationProductSection() {
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
              Warm roof vs inverted roof, PIR vs XPS vs mineral wool, vapour control layers, condensation risk, falls design, NCC Section J, compressive strength, system position
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
              <TechCard icon={<SquareStack size={15} />} title="Material Types — PIR / XPS / Mineral Wool" items={TECH_INFO.materialTypes} style="bullet" />
              <TechCard icon={<BookOpen size={15} />} title="Vapour Control Layer" items={TECH_INFO.vapourControl} style="check" />
              <TechCard icon={<FileText size={15} />} title="Falls Design & NCC Section J" items={TECH_INFO.fallsDesign} style="bullet" />
              <TechCard icon={<AlertTriangle size={15} />} title="When NOT to Use" items={TECH_INFO.limitations} style="warn" />
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
              6 products — 4 brands — tapered PIR for falls creation and flat PIR, XPS, and mineral wool for thermal performance — warm roof and inverted roof assemblies — bespoke design required for tapered products
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
                    {product.techChips.filter((c) => c.label.toLowerCase().includes("warranty")).map((chip) => (
                      <span key={chip.label} className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${chip.cls}`}>
                        {chip.label}
                      </span>
                    ))}
                  </div>
                  <CollapsibleCardDetails
                    text={product.descriptionLine}
                    chips={product.techChips.filter((c) => !c.label.toLowerCase().includes("warranty"))}
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
                  <div className="rounded-lg border border-amber-100 bg-amber-50 px-3 py-2">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Specifier Note</p>
                    <p className="text-xs leading-5 text-amber-900">{product.specifierNote}</p>
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
            <h2 className="text-2xl font-extrabold text-sky-950">Tapered insulation board system comparison</h2>
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of tapered insulation board systems. Confirm all product selections against the current manufacturer TDS before specifying.
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
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Assembly position</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Thermal performance</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Tapered available</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Australian availability</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key restriction</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.assemblyPosition}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.thermalPerformance}</td>
                  <td className="px-4 py-3 text-slate-600">{row.taperedAvailable}</td>
                  <td className="px-4 py-3 text-slate-600">{row.auAvailability}</td>
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
