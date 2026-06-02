"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Wrench, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "PVC-sheet"
  | "FPO-TPO"
  | "HDPE-bentonite"
  | "Loose-laid"
  | "Ballasted"
  | "Bonded"
  | "Self-adhesive"
  | "Mechanically-fixed"
  | "Hot-air-welded"
  | "Roof-deck"
  | "Podium-slab"
  | "Green-roof"
  | "Planter-box"
  | "Below-grade"
  | "Under-tile"
  | "UV-stable"
  | "Root-resistant"
  | "AS-4654"
  | "AS-4858"
  | "Accredited-applicator";

type Product = {
  fullLabel: string;
  brandUrl?: string;
  tdsUrl?: string;
  accentColor: string;
  name: string;
  descriptionLine: string;
  productType: string;
  filterTags: FilterTag[];
  techChips: { label: string; cls: string }[];
  systemDescription: string[];
  technicalProperties: string[];
  limitations: string[];
  specifierNote: string;
  procurementSources: { name: string; url?: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Wolfin Membranes / Projex Group Australia",
    brandUrl: "https://projex.com.au",
    tdsUrl: "https://projex.com.au/products/wolfin-membrane/",
    accentColor: "#b45309",
    name: "Wolfin IB — Loose-Laid PVC Sheet Membrane",
    descriptionLine: "Polyester-reinforced PVC single-ply sheet membrane — loose-laid and ballasted installation — hot-air welded seams — roof decks, podium slabs, green roofs, and planter boxes — specialist Projex-accredited applicator required — up to 15-year workmanship and materials warranty",
    productType: "Polyester-reinforced PVC single-ply sheet membrane — loose-laid and ballasted — AS 4654.1",
    filterTags: ["PVC-sheet", "Loose-laid", "Ballasted", "Hot-air-welded", "Roof-deck", "Podium-slab", "Green-roof", "Planter-box", "UV-stable", "Root-resistant", "AS-4654", "Accredited-applicator"],
    techChips: [
      { label: "Polyester-reinforced PVC", cls: "bg-amber-100 text-amber-800" },
      { label: "Loose-laid / ballasted", cls: "bg-slate-100 text-slate-700" },
      { label: "Hot-air welded seams", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 4654.1 — NATA certified", cls: "bg-green-50 text-green-700" },
      { label: "Up to 15-yr warranty", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: [
      "Wolfin IB is a single-ply, fully homogeneous, polyester-reinforced PVC waterproofing sheet membrane manufactured in Germany and distributed in Australia by Projex Group. First introduced in 1963 and in use across Australia since the late 1980s, Wolfin is one of the most established single-ply sheet membrane systems in the Australian roof and podium waterproofing market with millions of square metres installed across all Australian climatic zones.",
      "Wolfin IB is installed loose-laid over the prepared substrate — the membrane is unrolled without bonding or mechanical fixing to the substrate, adjacent rolls are overlapped, and the laps are hot-air welded to form continuous watertight seams. Ballast (gravel, concrete pavers, or growing medium) is placed above the membrane to resist wind uplift. For applications where loose-laid is not appropriate, the Wolfin GWSK self-adhesive bonded variant is used.",
      "Wolfin is UV stable, root resistant, and chemically resistant — suitable for exposed roof decks, ballasted roofs, green roofs, podium slabs, and planter box applications. The polyester reinforcement provides dimensional stability and resistance to mechanical damage. Wolfinsteel perimeter profiles (galvanised or 316L stainless) are used for perimeter termination — all fixings are encapsulated within the profile and welded to the membrane, eliminating exposed mechanical fixings through the membrane field. Installation is by Projex Group-accredited applicators only — every Wolfin installation is inspected and signed off by Projex Group, resulting in a single-point warranty on both workmanship and materials for up to 15 years.",
    ],
    technicalProperties: [
      "Single-ply fully homogeneous polyester-reinforced PVC — manufactured in Germany by Wolfin Membranes",
      "Loose-laid and ballasted installation — hot-air welded seams",
      "UV stable — root resistant — chemical resistant",
      "Suitable for: exposed roof decks, ballasted and green roofs, podium slabs, planter boxes, balconies, terraces, basements, retaining walls",
      "Can be installed over existing membranes including bitumen and failed liquid-applied systems — confirm separation layer requirements with Projex Group",
      "AS 4654.1:2012 compliant — NATA certified",
      "Wolfinsteel perimeter profiles — galvanised or 316L stainless — encapsulated fixings",
      "Up to 15-year single-point warranty on workmanship and materials — Projex Group accredited applicator required",
    ],
    limitations: [
      "Specialist accredited applicator required — not a general waterproofing trade installation — confirm accredited applicator availability before specifying",
      "PVC contains plasticisers — must be separated from bitumen, coal tar, oils, and incompatible solvents by an appropriate separation layer — confirm material compatibility with Projex Group before specifying adjacent to bituminous products",
      "Seams must be tested after welding before any covering layer is installed",
      "Loose-laid installation requires ballast or paver cover for wind uplift resistance — confirm ballast design with structural engineer for the specific roof or podium loading",
      "Confirm current product thickness, roll width, and availability with Projex Group before specifying",
    ],
    specifierNote: "Confirm suitability with the current Projex Group technical specification and confirm accredited applicator availability before specifying.",
    procurementSources: [
      { name: "Projex Group — sole Australian distributor", url: "https://projex.com.au" },
      { name: "Installation by Projex Group-accredited applicators only" },
    ],
  },
  {
    fullLabel: "Wolfin Membranes / Projex Group Australia",
    brandUrl: "https://projex.com.au",
    tdsUrl: "https://projex.com.au/products/wolfin-membrane/",
    accentColor: "#0369a1",
    name: "Wolfin GWSK — Self-Adhesive Bonded PVC Sheet Membrane",
    descriptionLine: "Polyester-reinforced PVC single-ply sheet membrane with self-adhesive bonding layer — bonded installation directly to concrete or over existing membranes — hot-air welded seams — roof decks, podium slabs, and remediation applications — bitumen-compatible — Projex Group accredited applicator required",
    productType: "Polyester-reinforced PVC sheet membrane — self-adhesive bonded — bitumen-compatible — AS 4654.1",
    filterTags: ["PVC-sheet", "Bonded", "Self-adhesive", "Hot-air-welded", "Roof-deck", "Podium-slab", "UV-stable", "Root-resistant", "AS-4654", "Accredited-applicator"],
    techChips: [
      { label: "PVC — self-adhesive bonding", cls: "bg-sky-100 text-sky-800" },
      { label: "Bonded to substrate / existing membrane", cls: "bg-slate-100 text-slate-700" },
      { label: "Bitumen-compatible", cls: "bg-green-50 text-green-700" },
      { label: "Hot-air welded seams", cls: "bg-slate-100 text-slate-700" },
      { label: "Accredited applicator required", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: [
      "Wolfin GWSK is the self-adhesive bonded variant of the Wolfin system — a high-polymer PVC sheet membrane with an integrated special glass fleece and cold-bonding self-adhesive layer on the underside, manufactured by extrusion. The self-adhesive layer allows the membrane to be bonded directly to the substrate or over an existing membrane without separate adhesive application, simplifying installation on podium slabs and roof decks where a fully bonded system is required to prevent lateral water migration under the membrane.",
      "In remediation projects on Class 2 strata podium slabs, Wolfin GWSK is specified where the existing membrane cannot be fully removed and the new membrane is to be installed directly over the existing system — the self-adhesive layer bonds to the existing surface and the hot-air welded seams create a watertight continuous sheet. It is bitumen-compatible — the self-adhesive layer bonds to bituminous substrates, making it suitable for installation over existing torch-on modified bitumen sheet membranes.",
      "Installation is by Projex Group-accredited applicators only, with the same warranty and inspection regime as Wolfin IB — every installation is inspected and signed off by Projex Group, resulting in a single-point warranty on both workmanship and materials.",
    ],
    technicalProperties: [
      "High-polymer PVC sheet membrane with integrated glass fleece and self-adhesive bonding layer",
      "Cold-bonding self-adhesive layer — bonds to concrete and existing membrane surfaces including bitumen",
      "Hot-air welded seams — continuous watertight sheet",
      "UV stable — root resistant",
      "Suitable for: podium slabs, roof decks, and remediation over existing bitumen or membrane surfaces",
      "Bitumen-compatible self-adhesive layer — can be bonded directly over existing torch-on membranes",
      "AS 4654.1:2012 compliant — Projex Group accredited applicator required — single-point warranty",
    ],
    limitations: [
      "Specialist accredited applicator required — confirm accredited applicator availability before specifying",
      "Confirm substrate preparation requirements with Projex Group before applying to existing membrane surfaces — not all existing membrane types are compatible without surface preparation",
      "Seams must be tested after welding before covering",
      "Confirm current product specification, roll dimensions, and availability with Projex Group before specifying",
    ],
    specifierNote: "Confirm suitability with the current Projex Group technical specification and confirm accredited applicator availability before specifying.",
    procurementSources: [
      { name: "Projex Group — sole Australian distributor", url: "https://projex.com.au" },
      { name: "Installation by Projex Group-accredited applicators only" },
    ],
  },
  {
    fullLabel: "Wolfin Membranes / Projex Group Australia",
    brandUrl: "https://projex.com.au",
    tdsUrl: "https://projex.com.au/products/cosmofin/",
    accentColor: "#0d9488",
    name: "Cosmofin FG / FG LL — Reinforced PVC Single-Ply Sheet Membrane",
    descriptionLine: "Reinforced PVC single-ply sheet membrane — bonded or loose-laid installation — hot-air welded seams — roof decks, podiums, balconies, planter boxes, and under-tile applications — AS 4654.1 and AS 4858 compliant — Projex Group accredited applicator required",
    productType: "Reinforced PVC sheet membrane — bonded or loose-laid — AS 4654.1 and AS 4858 — NATA certified",
    filterTags: ["PVC-sheet", "Bonded", "Loose-laid", "Hot-air-welded", "Roof-deck", "Podium-slab", "Planter-box", "Under-tile", "AS-4654", "AS-4858", "Accredited-applicator"],
    techChips: [
      { label: "Reinforced PVC — fleece backing", cls: "bg-teal-100 text-teal-800" },
      { label: "2mm thick — 1.65m × 15m", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 4654.1 + AS 4858 (FG LL)", cls: "bg-green-50 text-green-700" },
      { label: "NATA certified", cls: "bg-slate-100 text-slate-700" },
      { label: "Pre-made factory corners", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: [
      "Cosmofin is a reinforced, high-quality flexible PVC single-ply sheet membrane engineered in Germany by Wolfin Membranes and distributed in Australia by Projex Group. Cosmofin is supplied as a complete system incorporating all ancillary components — pre-made corner pieces, drain outlets, and accessory components — factory-manufactured from the same PVC compound as the membrane to ensure total material compatibility.",
      "Cosmofin is available in two variants: Cosmofin FG (standard grade) compliant with AS 4654.1:2012, and Cosmofin FG LL which also complies with AS 4858 for internal and wet area applications. This makes Cosmofin FG LL suitable for both external podium and roof deck applications and under-tile balcony applications in Australian strata projects where a single-ply sheet membrane is specified under the tile system. Both variants are NATA certified.",
      "Roll size is 1.65m wide × 15m long, 2mm thick including the fleece backing. The fleece backing provides a bonding surface for tile adhesive when Cosmofin is used as an under-tile membrane on balconies. Cosmofin is hot-air welded at seams. Corners and junctions are hot-air welded directly to the Cosmofin field membrane using pre-made factory corner pieces — not site-formed in liquid membrane.",
    ],
    technicalProperties: [
      "Reinforced flexible PVC single-ply sheet membrane — 2mm thick including fleece",
      "Roll size: 1.65m × 15m",
      "AS 4654.1:2012 compliant (Cosmofin FG) — also AS 4858 compliant (Cosmofin FG LL) — NATA certified",
      "Bonded or loose-laid installation — hot-air welded seams",
      "Pre-made factory corner pieces and drain outlets — full system components in compatible PVC",
      "Fleece backing suitable for tile adhesive bonding in under-tile balcony applications",
      "Suitable for: roof decks, podium slabs, balconies, planter boxes, courtyards, terraces, under-tile applications",
      "Can be installed over existing membranes and damp substrates — confirm with Projex Group",
    ],
    limitations: [
      "Specialist accredited applicator required",
      "PVC plasticiser migration — separate from bitumen and incompatible solvents with separation layer",
      "Seams and junctions must be tested after welding before covering",
      "Confirm correct variant (FG or FG LL) for the applicable standard (AS 4654.1 vs AS 4858) before specifying",
      "Under-tile application requires confirmation of tile adhesive compatibility with the fleece backing surface",
      "Confirm current product variant, roll availability, and system standard applicability with Projex Group before specifying",
    ],
    specifierNote: "Confirm which Cosmofin variant (FG or FG LL) is required for the specific application standard before specifying.",
    procurementSources: [
      { name: "Projex Group — sole Australian distributor", url: "https://projex.com.au" },
      { name: "Installation by Projex Group-accredited applicators only" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/en/construction/roofing/pvc-sheet-membranes/membranes/sarnafil-g-410-20l.html",
    accentColor: "#be123c",
    name: "Sika Sarnafil G 410 — PVC Single-Ply Sheet Membrane",
    descriptionLine: "PVC single-ply sheet membrane — hot-air welded — exposed flat roofs, ballasted roofs, green roofs, and podium slab waterproofing — Sika Sarnafil system — specialist Sika-accredited applicator required",
    productType: "PVC sheet membrane with glass non-woven inlay — hot-air welded — Sika Sarnafil system",
    filterTags: ["PVC-sheet", "Loose-laid", "Ballasted", "Bonded", "Mechanically-fixed", "Hot-air-welded", "Roof-deck", "Podium-slab", "Green-roof", "UV-stable", "Root-resistant", "AS-4654", "Accredited-applicator"],
    techChips: [
      { label: "PVC — glass non-woven inlay", cls: "bg-rose-100 text-rose-800" },
      { label: "1.5mm and 2.0mm", cls: "bg-slate-100 text-slate-700" },
      { label: "UV stabilised", cls: "bg-green-50 text-green-700" },
      { label: "Exposed / ballasted / green roof", cls: "bg-slate-100 text-slate-700" },
      { label: "Sika-accredited applicator", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: [
      "Sika Sarnafil G 410 is a multi-layer PVC single-ply sheet membrane with a glass non-woven inlay, manufactured for direct exposure applications on flat roofs, ballasted roofs, green roofs, and podium slabs. The glass non-woven inlay provides dimensional stability — Sarnafil G 410 is UV stable and contains UV light stabilisers in the PVC compound. Hot-air welded at seams and laps. Available in multiple thicknesses — 1.5mm and 2.0mm — and in a range of colours.",
      "Sika Sarnafil G 410 is part of the Sika roofing system and is specified in conjunction with Sika insulation, vapour barriers, and accessories as a complete engineered roof and podium system. In Australian strata remediation, Sarnafil G 410 is used on communal roof decks, large podium slabs, and large terrace areas where a PVC single-ply system is specified and a Sika-accredited applicator is available.",
      "Sarnafil G 410 can be installed loose-laid with ballast, mechanically fixed, or fully bonded depending on the substrate and project requirements. Compatible with green roof and ballasted podium applications. Must be separated from bitumen and bituminous surfaces — confirm separation layer requirements with Sika technical.",
    ],
    technicalProperties: [
      "Multi-layer PVC sheet membrane with glass non-woven inlay — UV stabilised",
      "Available in 1.5mm and 2.0mm thickness — confirm thickness for application",
      "Hot-air welded seams — exposed, ballasted, and green roof applications",
      "Loose-laid, mechanically fixed, or fully bonded installation",
      "UV stable — root resistant — multiple colours available",
      "Part of the Sika complete roofing system — specified with Sika insulation and accessories",
      "Sika-accredited applicator required",
    ],
    limitations: [
      "Specialist accredited applicator required — confirm Sika-accredited applicator availability in the project location before specifying",
      "Must be separated from bitumen and bituminous surfaces with a compatible separation layer — confirm with Sika technical",
      "Seams must be tested after welding before covering",
      "Confirm AS 4654.1 compliance with Sika Australia for the specific product variant before specifying",
      "Confirm current product thickness range, colour options, and Australian availability with Sika Australia before specifying",
    ],
    specifierNote: "Confirm suitability with the current Sika TDS, Sika Australia technical, and confirm accredited applicator availability before specifying.",
    procurementSources: [
      { name: "Sika Australia", url: "https://aus.sika.com" },
      { name: "Confirm trade distributor and accredited applicator with Sika Australia" },
    ],
  },
  {
    fullLabel: "Tremco Australia",
    brandUrl: "https://www.tremco.com.au",
    tdsUrl: "https://www.tremco.com.au/products/waterproofing/hdpe-bentonite",
    accentColor: "#475569",
    name: "Tremco Paraseal LG — HDPE-Bentonite Composite Sheet Membrane",
    descriptionLine: "HDPE-bentonite composite sheet waterproofing membrane — self-sealing bentonite layer laminated to HDPE sheet — primarily specified for below-grade, subsoil, and below-slab horizontal applications — NOT for exposed roof deck or podium surface applications",
    productType: "HDPE-bentonite composite sheet — below-grade waterproofing — pre-applied or blindside — not for exposed podium or roof",
    filterTags: ["HDPE-bentonite", "Below-grade"],
    techChips: [
      { label: "HDPE — sodium bentonite", cls: "bg-slate-100 text-slate-700" },
      { label: "Self-sealing bentonite", cls: "bg-slate-100 text-slate-700" },
      { label: "Below-grade only", cls: "bg-red-100 text-red-800" },
      { label: "Requires confining pressure", cls: "bg-amber-50 text-amber-700" },
      { label: "NOT for exposed roof deck", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription: [
      "Tremco Paraseal LG is a multi-layer sheet membrane system consisting of a self-sealing, expandable layer of sodium bentonite clay laminated to an impermeable HDPE sheet. When exposed to water, the bentonite layer swells to create a self-sealing waterproof barrier — minor punctures or pinholes in the membrane are self-sealed by the swelling bentonite. Paraseal LG is the primary HDPE-bentonite product in the Australian waterproofing market.",
      "Paraseal LG is included on this page as the primary true HDPE sheet membrane product used in Australian strata remediation — but its application scope is fundamentally different from PVC and FPO/TPO single-ply sheet membranes. Paraseal LG is specified for below-grade waterproofing — below-slab horizontal applications (pre-applied before concrete pour), subsoil retaining wall waterproofing, and basement below-grade applications. It is not designed for exposed roof deck, podium surface, or balcony applications where UV exposure, foot traffic, and drainage above the membrane are the primary conditions.",
      "This card is included to clearly distinguish HDPE-bentonite systems from the PVC and FPO/TPO single-ply systems that are the primary products for roof and podium remediation on Class 2 strata. Do not specify Paraseal LG or similar HDPE-bentonite products for exposed podium or roof deck applications without confirming with Tremco technical that the product is appropriate for the specific application conditions.",
    ],
    technicalProperties: [
      "Multi-layer sheet — sodium bentonite clay laminated to HDPE sheet",
      "Self-sealing — bentonite swells on contact with water — minor punctures self-seal",
      "Primary application: below-grade — below-slab pre-applied horizontal, subsoil retaining walls, basement waterproofing",
      "Not designed for UV-exposed roof deck or podium surface applications",
      "Tremco Paraseal Saltwater variant available for saline and alkaline conditions — confirm with Tremco technical",
    ],
    limitations: [
      "NOT for exposed roof deck or podium surface applications — bentonite-HDPE composite is a below-grade product",
      "Must have confining pressure to activate and maintain the bentonite seal — not effective without overburden or structural confinement above the membrane",
      "Confirm application suitability with Tremco technical before specifying — do not assume HDPE-bentonite suitability for above-grade applications based on the HDPE component alone",
      "Confirm current product range, variant selection, and primer requirements with Tremco Australia before specifying",
    ],
    specifierNote: "Confirm application suitability — particularly whether the application is below-grade or above-grade exposed — with Tremco technical before specifying.",
    procurementSources: [
      { name: "Tremco Australia", url: "https://www.tremco.com.au" },
      { name: "Confirm trade distributor and applicator with Tremco Australia" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "PVC-sheet", label: "PVC sheet membrane" },
  { id: "FPO-TPO", label: "FPO/TPO sheet membrane" },
  { id: "HDPE-bentonite", label: "HDPE-bentonite composite" },
  { id: "Loose-laid", label: "Loose-laid" },
  { id: "Ballasted", label: "Ballasted" },
  { id: "Bonded", label: "Bonded" },
  { id: "Self-adhesive", label: "Self-adhesive bonding layer" },
  { id: "Mechanically-fixed", label: "Mechanically fixed" },
  { id: "Hot-air-welded", label: "Hot-air welded seams" },
  { id: "Roof-deck", label: "Roof deck" },
  { id: "Podium-slab", label: "Podium slab" },
  { id: "Green-roof", label: "Green roof" },
  { id: "Planter-box", label: "Planter box" },
  { id: "Below-grade", label: "Below-grade" },
  { id: "Under-tile", label: "Under-tile (AS 4858)" },
  { id: "UV-stable", label: "UV stable" },
  { id: "Root-resistant", label: "Root resistant" },
  { id: "AS-4654", label: "AS 4654.1 compliant" },
  { id: "AS-4858", label: "AS 4858 compliant" },
  { id: "Accredited-applicator", label: "Accredited applicator required" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  material: string;
  installMethod: string;
  seamJoining: string;
  primaryApplication: string;
  keyRestriction: string;
}[] = [
  {
    product: "Wolfin IB",
    brand: "Projex Group",
    material: "Polyester-reinforced PVC",
    installMethod: "Loose-laid and ballasted",
    seamJoining: "Hot-air welded",
    primaryApplication: "Exposed roof decks, podiums, green roofs, planter boxes",
    keyRestriction: "Accredited applicator required — separate from bitumen with separation layer — seams must be tested before covering",
  },
  {
    product: "Wolfin GWSK",
    brand: "Projex Group",
    material: "Polyester-reinforced PVC — self-adhesive bonding layer",
    installMethod: "Bonded to substrate or over existing membrane",
    seamJoining: "Hot-air welded",
    primaryApplication: "Podium slabs, roof decks — remediation over existing membranes — bitumen-compatible bonding",
    keyRestriction: "Accredited applicator required — confirm substrate preparation with Projex Group — seams must be tested",
  },
  {
    product: "Cosmofin FG / FG LL",
    brand: "Projex Group",
    material: "Reinforced PVC — fleece backing",
    installMethod: "Bonded or loose-laid",
    seamJoining: "Hot-air welded — pre-made factory corner pieces",
    primaryApplication: "Roof decks, podiums, balconies, planter boxes — FG LL also under-tile wet area (AS 4858)",
    keyRestriction: "Accredited applicator — confirm correct variant (AS 4654.1 vs AS 4858) — under-tile confirm tile adhesive compatibility",
  },
  {
    product: "Sarnafil G 410",
    brand: "Sika Australia",
    material: "PVC with glass non-woven inlay",
    installMethod: "Loose-laid, mechanically fixed, or bonded",
    seamJoining: "Hot-air welded",
    primaryApplication: "Exposed roof decks, ballasted roofs, green roofs, podium slabs",
    keyRestriction: "Accredited applicator required — separate from bitumen — confirm AS 4654.1 compliance with Sika Australia",
  },
  {
    product: "Paraseal LG",
    brand: "Tremco Australia",
    material: "HDPE — sodium bentonite composite",
    installMethod: "Pre-applied below slab or against retaining wall",
    seamJoining: "Overlap — no welding",
    primaryApplication: "Below-grade — below-slab pre-applied — subsoil retaining walls — basements",
    keyRestriction: "NOT for exposed roof deck or podium — requires confining pressure — below-grade application only",
  },
];

const TECH_INFO = {
  pvcMembranes: [
    "PVC (polyvinyl chloride) sheet membranes are the most established single-ply sheet membrane type in the Australian roof and podium waterproofing market",
    "Products such as Wolfin (polyester-reinforced PVC) and Cosmofin (reinforced PVC) from Projex Group and Sarnafil G (PVC) from Sika have been installed across Australia since the late 1980s",
    "PVC membranes are hot-air welded at seams and laps to create a continuous, watertight sheet — can be installed loose-laid (ballasted), mechanically fixed, or fully bonded",
    "UV stable, root resistant, and chemically resistant — suitable for exposed roof deck, podium slab, green roof, and planter box applications",
    "Key consideration: PVC contains plasticisers that can migrate and degrade over decades of service — PVC membranes must be separated from bituminous materials by a separation layer — confirm compatibility with adjacent materials before specifying",
  ],
  fpoTpoMembranes: [
    "FPO (flexible polyolefin) and TPO (thermoplastic polyolefin) sheet membranes are plasticiser-free single-ply membranes offering improved chemical resistance and UV stability compared to PVC",
    "Products such as Sarnafil AT (FPO) from Sika are hot-air welded and suitable for exposed roof deck, mechanically fixed, and ballasted applications",
    "FPO/TPO membranes do not contain plasticisers and are not subject to plasticiser migration — compatible with a wider range of adjacent materials than PVC",
    "FPO/TPO can be recycled at end of service life — the premium single-ply option for large-area roof and podium applications in Australia",
    "Confirm current FPO/TPO product availability and accredited applicator access with Sika Australia before specifying",
  ],
  hdpeBentonite: [
    "HDPE-bentonite composite sheet systems (such as Tremco Paraseal LG) combine a layer of sodium bentonite clay laminated to an HDPE sheet",
    "The bentonite swells on contact with water to create a self-sealing waterproof barrier — minor punctures or pinholes are self-sealed by the swelling bentonite",
    "These systems are primarily specified for below-grade waterproofing — subsoil, basement walls, and below-slab horizontal applications — not exposed roof deck and podium applications",
    "HDPE-bentonite composites require confining pressure from overburden or structural concrete to activate and maintain the bentonite seal — not effective without structural confinement",
    "Included on this page for reference and disambiguation — not a substitute for PVC or FPO/TPO single-ply sheet membranes on exposed podium and roof deck applications",
  ],
  installationMethods: [
    "Loose-laid and ballasted — membrane is loose-laid over the substrate with ballast (gravel, pavers, or growing medium) placed above to hold it in position — seams are hot-air welded — no adhesive to substrate required — suitable for large roof decks where ballast provides wind uplift resistance",
    "Mechanically fixed — membrane is fixed to the substrate using mechanical fasteners through the membrane at laps — fasteners are covered by the overlapping sheet and the seam is hot-air welded over the fixing — suitable for exposed roofs and podiums subject to wind uplift",
    "Fully bonded — membrane is bonded to the substrate with a compatible adhesive — provides maximum wind uplift resistance and prevents lateral water migration under the membrane — suitable for podium slabs and terraces where loose-laid is not appropriate",
    "Ballast design for loose-laid systems must be confirmed with the structural engineer — water at 50mm pavers plus drainage cell loading can impose significant load on the podium slab",
    "Confirm which installation method is required for the specific project with the membrane manufacturer before specifying",
  ],
  specialistApplicator: [
    "Single-ply sheet membrane installation is not a general waterproofing trade task — hot-air welding requires calibrated equipment, training, and verified installation experience",
    "Incorrect weld temperature, speed, or pressure produces welds that appear continuous but will fail under hydrostatic pressure and thermal cycling",
    "Projex Group and Sika both require installation by manufacturer-accredited applicators — single-point warranties on workmanship and materials are only provided through accredited networks",
    "Seam testing is mandatory after welding and before any covering layer is installed — point probe testing and air lance testing are standard seam test methods for PVC and FPO/TPO",
    "Accredited applicators are not available in all locations — confirm applicator availability before specifying the product for the project",
  ],
  as4654: [
    "AS 4654.1 (materials standard) and AS 4654.2 (installation standard) apply to waterproofing membranes for external above-ground use on roof decks and podium slabs",
    "Wolfin and Cosmofin products from Projex Group are confirmed compliant with AS 4654.1:2012 and NATA certified",
    "Sarnafil products comply with relevant international standards — confirm AS 4654.1 compliance with Sika Australia before specifying",
    "HDPE-bentonite composites (Paraseal LG) are below-grade products — confirm applicable standards with Tremco Australia",
    "Confirm the specific product's AS 4654.1 compliance with the manufacturer before specifying — do not assume compliance from the product category alone",
  ],
};

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

export function SinglePlyProductSection() {
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
              PVC vs FPO/TPO vs HDPE-bentonite, hot-air welding, installation methods, specialist applicator requirements, AS 4654 compliance, flood testing, warranty
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
              <TechCard icon={<Layers size={15} />} title="PVC Sheet Membranes" items={TECH_INFO.pvcMembranes} style="bullet" />
              <TechCard icon={<SquareStack size={15} />} title="FPO/TPO Sheet Membranes" items={TECH_INFO.fpoTpoMembranes} style="check" />
              <TechCard icon={<BookOpen size={15} />} title="HDPE-Bentonite Composite Systems" items={TECH_INFO.hdpeBentonite} style="bullet" />
              <TechCard icon={<Wrench size={15} />} title="Installation Methods" items={TECH_INFO.installationMethods} style="check" />
              <TechCard icon={<AlertTriangle size={15} />} title="Specialist Applicator Requirement and Seam Testing" items={TECH_INFO.specialistApplicator} style="warn" />
              <TechCard icon={<CheckCircle size={15} />} title="AS 4654 Compliance" items={TECH_INFO.as4654} style="bullet" />
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
              5 products — 3 brands — PVC sheet membranes, FPO/TPO sheet membranes, and HDPE-bentonite composite systems — specialist applicator installation required for all hot-air welded systems
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
                      {product.brandUrl && (
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
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{product.descriptionLine}</p>
                </div>

                {/* Tech spec chips */}
                <div className="flex flex-wrap gap-1.5 border-b border-slate-100 bg-white px-5 py-3">
                  {product.techChips.map((chip) => (
                    <span
                      key={chip.label}
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}
                    >
                      {chip.label}
                    </span>
                  ))}
                </div>

                {/* System Description */}
                <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
                  <div className="space-y-3">
                    {product.systemDescription.map((para, i) => (
                      <p key={i} className="text-xs leading-6 text-slate-700">{para}</p>
                    ))}
                  </div>
                </div>

                {/* Technical Properties & Limitations */}
                <div className="space-y-3 px-5 py-4">
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-green-700">Technical Properties</p>
                    <ul className="space-y-1.5">
                      {product.technicalProperties.map((prop, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
                          <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" />
                          {prop}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">Limitations</p>
                    <ul className="space-y-1.5">
                      {product.limitations.map((lim, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
                          <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />
                          {lim}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {product.specifierNote && (
                    <div className="rounded-lg border border-sky-100 bg-sky-50 px-3 py-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-sky-700">Specifier note</p>
                      <p className="mt-0.5 text-xs italic text-sky-800">{product.specifierNote}</p>
                    </div>
                  )}
                </div>

                {/* Procurement Sources */}
                <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-4">
                  <p className="mb-3 text-[10px] uppercase tracking-wider text-slate-400">PROCUREMENT SOURCES</p>
                  <div className="space-y-2">
                    {product.procurementSources.map((src) => (
                      <div
                        key={src.name}
                        className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs"
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
                          <span className="text-slate-600">{src.name}</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-[10px] italic text-slate-400">
                    Confirm suitability with the current manufacturer TDS before specifying or applying.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Comparison Table ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Single-ply sheet membrane system comparison</h2>
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of single-ply sheet membrane systems. Confirm all product selections against the current manufacturer TDS before specifying.
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
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Installation method</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Seam joining</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary application</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key restriction</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600">{row.installMethod}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.seamJoining}</td>
                  <td className="px-4 py-3 text-slate-600">{row.primaryApplication}</td>
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
