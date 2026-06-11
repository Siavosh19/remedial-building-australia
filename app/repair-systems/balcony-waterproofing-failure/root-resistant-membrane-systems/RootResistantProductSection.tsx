"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, Shield,
  ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText, Sprout, Wrench, Info,
} from "lucide-react";

type FilterTag =
  | "Weldable-sheet"
  | "Polypropylene-lined"
  | "Root-inhibitor"
  | "Preventol-B2"
  | "Heat-welded"
  | "PVC-sheet"
  | "FLL-certified"
  | "Material-resistant"
  | "Fleece-backing"
  | "Under-tile"
  | "Hot-air-welded"
  | "Liquid-applied"
  | "Polyurethane"
  | "Anti-root-additive"
  | "Self-adhesive-sheet"
  | "SBS-modified-bitumen"
  | "Cold-applied"
  | "Torch-on"
  | "Anti-root-cap"
  | "Planter-box"
  | "Green-roof"
  | "Podium-slab"
  | "Below-grade"
  | "Retaining-wall"
  | "ARDEX-accredited"
  | "Projex-accredited"
  | "Hot-work-required"
  | "Flameless"
  | "Confirm-AU-availability"
  | "AS-4654";

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
  procurementSources: { name: string; url?: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://ardexaustralia.com/product/ardex-root-repell/",
    accentColor: "#f97316",
    name: "ARDEX Root Repell (WPM 1000 RR)",
    descriptionLine: "Weldable polypropylene-lined waterproofing sheet membrane with Preventol B2 root inhibitor — 1.2mm consistent thickness — heat-welded seams — planter boxes, retaining walls, and green roofs — ARDEX Accredited Applicator required — AS 4654.1 compliant",
    productType: "Weldable polypropylene sheet membrane — Preventol B2 root inhibitor — ARDEX Australia",
    filterTags: ["Weldable-sheet", "Polypropylene-lined", "Root-inhibitor", "Preventol-B2", "Heat-welded", "Planter-box", "Green-roof", "Retaining-wall", "ARDEX-accredited", "AS-4654"],
    techChips: [
      { label: "Weldable polypropylene sheet", cls: "bg-orange-100 text-orange-800" },
      { label: "Preventol B2 root inhibitor", cls: "bg-slate-100 text-slate-700" },
      { label: "1.2mm consistent thickness", cls: "bg-slate-100 text-slate-700" },
      { label: "Heat-welded seams", cls: "bg-green-50 text-green-700" },
      { label: "ARDEX Accredited Applicator req'd", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "ARDEX Root Repell (also referenced as ARDEX WPM 1000 RR) is ARDEX Australia's dedicated weldable root resistant waterproofing sheet membrane for planter boxes, retaining walls, green roofs, and damp-proofing applications. The membrane is a polypropylene-lined waterproofing sheet incorporating Preventol B2 — a premium chemical root inhibitor that repels root growth without systemic action that would kill the plant above. The polypropylene lining provides a consistent 1.2mm membrane thickness across the full installation.\n\nLaps and seams are heat-welded using a Leister hot air gun and rolled with a rubber roller to ensure continuous watertight seams. The heat-welded seam is stronger than the membrane itself. Roll size is 1.4m × 20m — available through ARDEX Australia and waterproofing trade stockists. Flood testing, tiling, and screeding can begin one hour after membrane installation. Compatible with selected ARDEX tiling systems and ARDEX water-based liquid-applied membranes — confirm compatibility with ARDEX technical before combining with other products.\n\nImportant substrate and installation notes from the ARDEX TDS: ARDEX engineered screeds must not be applied directly to ARDEX Root Repell. LOSP (Light Organic Solvent Preservative) treated plywood must not be used under ARDEX Root Repell under any circumstances. The membrane must not be exposed to UV for more than 30 days without protection. Application must be carried out by an ARDEX Accredited Applicator.",
    technicalProperties: [
      "Polypropylene-lined weldable waterproofing sheet membrane",
      "Preventol B2 root inhibitor — repels root growth without killing plant",
      "Consistent 1.2mm membrane thickness",
      "Heat-welded laps and seams — Leister hot air gun",
      "Roll size: 1.4m × 20m",
      "Flood testing / tiling / screeding can begin 1 hour after installation",
      "AS 4654.1 compliant — Waterproofing membranes for external above-ground use",
      "Compatible with selected ARDEX tiling systems and ARDEX water-based liquid-applied membranes",
      "Substrates: concrete, brick, fibre-cement, plywood, timber",
    ],
    limitations: [
      "ARDEX Accredited Applicator required — do not install without accredited applicator",
      "ARDEX engineered screeds must not be applied directly to Root Repell — confirm system sequence with ARDEX technical",
      "LOSP-treated plywood must not be used as substrate under any circumstances",
      "Maximum UV exposure without protection: 30 days — protect promptly after installation",
      "Not suitable as a trafficable surface or for long-term UV exposure",
      "Confirm Preventol B2 effectiveness against the specific plant species before specifying for high-risk plants such as bamboo — confirm with ARDEX technical",
      "Confirm current product TDS, roll availability, and pricing with ARDEX Australia before specifying",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply", url: "https://www.ardex.com.au" },
      { name: "The Waterproofing Shop", url: "https://thewaterproofingshop.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "TradieCart", url: "https://www.tradiecart.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
    ],
  },
  {
    fullLabel: "Wolfin Membranes / Projex Group Australia",
    brandUrl: "https://projex.com.au",
    tdsUrl: "https://projex.com.au/products/wolfin-membrane/",
    accentColor: "#b45309",
    name: "Wolfin IB",
    descriptionLine: "FLL-certified root-resistant PVC single-ply sheet membrane — hot-air welded seams — planter boxes, green roofs, landscaped podium slabs, and retaining walls — material root resistance (not chemical inhibitor) — Projex Group-accredited applicator required — up to 15-year workmanship and materials warranty",
    productType: "FLL-certified PVC sheet membrane — material root resistance — Projex Group",
    filterTags: ["PVC-sheet", "FLL-certified", "Material-resistant", "Hot-air-welded", "Planter-box", "Green-roof", "Podium-slab", "Retaining-wall", "Projex-accredited"],
    techChips: [
      { label: "PVC single-ply sheet", cls: "bg-amber-100 text-amber-800" },
      { label: "FLL certified — root resistance", cls: "bg-green-100 text-green-800" },
      { label: "Material root resistance", cls: "bg-slate-100 text-slate-700" },
      { label: "Hot-air welded seams", cls: "bg-slate-100 text-slate-700" },
      { label: "Up to 15-yr warranty", cls: "bg-sky-50 text-sky-700" },
    ],
    systemDescription:
      "Wolfin IB is FLL-certified for root penetration resistance — confirmed through independent testing under the German FLL standard using aggressive root-forming plant species. The root resistance of Wolfin is a material property of the PVC compound — roots cannot physically penetrate the dense, flexible polyester-reinforced PVC sheet. This is a passive mechanical resistance that does not rely on a chemical inhibitor and does not degrade over time as a chemical additive might. Wolfin has been installed in Australian planter boxes and green roofs since the late 1980s — a 2018 Projex Group case study confirmed Wolfin membrane found intact and unpenetrated after 11 years of service in planter boxes containing bamboo at a Bella Vista corporate facility.\n\nIn planter box and podium slab applications, Wolfin IB is loose-laid over the prepared substrate with adjacent rolls overlapped and hot-air welded. The welded seam is stronger than the membrane field. Wolfinsteel profiles (galvanised or 316L stainless) are used for perimeter termination, upstand details, and wall junctions — all fixings are encapsulated within the profile body and welded to the membrane, eliminating exposed mechanical fixings that roots could follow. Protection board or dimple mat is placed above the membrane before growing medium is installed.\n\nEvery Wolfin installation is inspected and signed off by Projex Group, resulting in a single-point warranty on workmanship and materials for up to 15 years issued to the building owner.",
    technicalProperties: [
      "Polyester-reinforced PVC single-ply sheet membrane — manufactured in Germany",
      "FLL certified for root penetration resistance — independent test certification",
      "Material root resistance — not chemical inhibitor dependent",
      "Hot-air welded seams — loose-laid and ballasted installation",
      "Suitable for: planter boxes, green roofs, landscaped podium slabs, retaining walls, terraces, balconies",
      "Wolfinsteel perimeter profiles — galvanised or 316L stainless — encapsulated fixings",
      "Up to 15-year single-point warranty on workmanship and materials",
      "Projex Group-accredited applicator required",
    ],
    limitations: [
      "Projex Group-accredited applicator required — confirm availability before specifying",
      "PVC contains plasticisers — separate from bitumen and incompatible materials with a separation layer — confirm material compatibility with Projex Group",
      "Hot-air welded seams require specialist welding equipment and trained applicator",
      "Confirm protection board or dimple mat specification above the membrane with Projex Group before growing medium is installed",
      "Confirm current product specification and pricing with Projex Group before specifying",
    ],
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
    name: "Cosmofin FG / FG LL",
    descriptionLine: "FLL-certified root-resistant reinforced PVC sheet membrane with fleece backing — planter boxes, retaining walls, and landscaped podium slabs — fleece backing compatible with tile adhesive for under-tile applications — Projex Group-accredited applicator required",
    productType: "FLL-certified PVC sheet — fleece backing — under-tile compatible — Projex Group",
    filterTags: ["PVC-sheet", "FLL-certified", "Material-resistant", "Fleece-backing", "Under-tile", "Hot-air-welded", "Planter-box", "Retaining-wall", "Podium-slab", "Projex-accredited", "AS-4654"],
    techChips: [
      { label: "PVC sheet — fleece backing", cls: "bg-teal-100 text-teal-800" },
      { label: "FLL certified — root resistance", cls: "bg-green-100 text-green-800" },
      { label: "Under-tile compatible", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: owner confirm — Projex now uses 'FG LLV' for 2mm fleece-backed and 'FG LL' for 1.5mm non-fleece — confirm correct variant, thickness, and roll size", cls: "bg-red-100 text-red-700" },
      { label: "AS 4654.1 / AS 4858", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Cosmofin FG is the Projex Group's second FLL-certified root-resistant PVC sheet membrane, distinct from Wolfin IB in that it is supplied with a fleece backing that allows tile adhesive to bond directly to the membrane surface — making Cosmofin FG LL suitable for under-tile balcony and terrace applications as well as planter box and green roof use. Like Wolfin, Cosmofin achieves root resistance through the material properties of the PVC compound (FLL tested and certified) rather than through a chemical inhibitor. Hot-air welded at seams. Pre-made factory corner pieces and drain outlets are supplied in the same PVC material as the membrane, ensuring full system compatibility.\n\nIn planter box and podium slab applications on Australian strata buildings, Cosmofin is used where the project requires a root-resistant sheet membrane that is also compatible with a tiled finish above — for example, a tiled podium courtyard over a planted basement or car park where the single membrane must address both root resistance below the growing medium and tile compatibility in the tiled areas.\n\nTODO: owner confirm — Projex Group product page now distinguishes 'Cosmofin FG LLV' (fleece-backed, 1.5mm, 1.65m × 15m) from 'Cosmofin FG LL' (non-fleece, 1.5mm, 1.65m × 20m). The previous specification of '2mm thick including fleece, 1.65m × 15m' appears to match the LLV variant. Confirm current product variant name, thickness, and roll dimensions with Projex Group before specifying. NATA certified. Cosmofin FG LL and LLV comply with AS 4654.1:2012 — confirmed on projex.com.au. Cosmofin FG LL also complies with AS 4858 for internal and wet area applications.",
    technicalProperties: [
      "TODO: owner confirm — Projex Group product page (projex.com.au/products/cosmofin/) now lists 'Cosmofin FG LLV' as the fleece-backed variant (1.5mm, 1.65m × 15m) and 'Cosmofin FG LL' as the non-fleece variant (1.5mm, 1.65m × 20m) — confirm which variant is the under-tile root-resistant product before specifying",
      "FLL certified for root penetration resistance — material root resistance — confirmed on projex.com.au",
      "Roll size: 1.65m × 15m (fleece-backed LLV) or 1.65m × 20m (non-fleece FG LL) — TODO: owner confirm correct variant",
      "AS 4654.1:2012 compliant (FG LL / LLV) — AS 4858 compliant (FG LL) — confirmed on projex.com.au — NATA certified",
      "Fleece backing: tile adhesive can be bonded to membrane surface — compatible with selected tile adhesive systems",
      "Hot-air welded seams — factory pre-made corner pieces and drain outlets in matching PVC",
      "Suitable for: planter boxes, retaining walls, podium slabs, under-tile balcony and terrace applications",
      "Projex Group-accredited applicator required",
    ],
    limitations: [
      "Projex Group-accredited applicator required",
      "PVC plasticiser migration — separate from bitumen and incompatible materials",
      "Confirm whether Cosmofin FG or FG LL is required for the specific application standard (AS 4654.1 vs AS 4858) before specifying",
      "Tile adhesive compatibility with fleece backing must be confirmed with Projex Group and tile adhesive manufacturer before specifying under-tile applications",
      "Confirm current product specification, roll availability, and pricing with Projex Group before specifying",
    ],
    procurementSources: [
      { name: "Projex Group — sole Australian distributor", url: "https://projex.com.au" },
      { name: "Installation by Projex Group-accredited applicators only" },
    ],
  },
  {
    fullLabel: "Tremco Australia",
    brandUrl: "https://www.tremco.com.au",
    tdsUrl: "https://www.tremco.com.au/products/tremproof-211",
    accentColor: "#475569",
    name: "Tremco TREMproof 211 + Anti-Root Additive",
    descriptionLine: "Single-component moisture-curing polyurethane waterproofing membrane with anti-root additive — designed for planter boxes and below-grade applications — low VOC — AS 4654.1 tested — anti-root additive must be mixed in before application",
    productType: "Liquid-applied PU — anti-root additive — Tremco Australia",
    filterTags: ["Liquid-applied", "Polyurethane", "Anti-root-additive", "Planter-box", "Below-grade", "Retaining-wall", "AS-4654"],
    techChips: [
      { label: "Liquid-applied PU", cls: "bg-slate-200 text-slate-800" },
      { label: "Anti-Root Additive required", cls: "bg-red-50 text-red-700" },
      { label: "Single-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Low VOC — high solids", cls: "bg-green-50 text-green-700" },
      { label: "AS 4654.1 tested", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Tremco TREMproof 211 is a low VOC, high solids, single-component moisture-curing polyurethane waterproofing membrane designed primarily for planter box and below-grade waterproofing applications. For planter box use, TREMproof 211 is applied in conjunction with the TREMproof Anti-Root Additive — the additive must be mixed into the liquid membrane before application to provide root resistance. The combined product provides a liquid-applied root-resistant membrane suitable for the constant water immersion and biologically active conditions of planter box environments.\n\nTREMproof 211 is tested to AS 4654.1 — Waterproofing membranes for external above-ground use. Single-component — moisture-curing — minimises application errors associated with incorrect mixing of two-component products. Low VOC formulation. Suitable for planter boxes, below-grade retaining walls, and applications where constant water immersion is expected.\n\nConfirm with Tremco Australia that the Anti-Root Additive is included in the specification and correctly dosed before application — the membrane without the additive does not provide root resistance. Confirm the effectiveness of the additive against the specific plant species to be grown above, particularly for high-risk species such as bamboo, with Tremco technical before specifying.",
    technicalProperties: [
      "Single-component moisture-curing polyurethane liquid-applied membrane",
      "TREMproof Anti-Root Additive required for planter box root resistance — must be mixed in before application",
      "Low VOC — high solids",
      "AS 4654.1 tested — Waterproofing membranes for external above-ground use",
      "Suitable for: planter boxes, below-grade retaining walls, constant water immersion applications",
      "Applied by brush, roller, or spray — confirm application method with Tremco technical",
    ],
    limitations: [
      "Anti-Root Additive must be mixed in before application — TREMproof 211 alone is not a root-resistant membrane",
      "Confirm Anti-Root Additive dosage and mixing method with Tremco technical before application",
      "Confirm effectiveness of anti-root additive against the specific plant species before specifying — particularly for high-risk species (bamboo, fig, aggressive ground covers)",
      "Liquid-applied membrane — DFT must be verified by wet film thickness gauge during application — insufficient DFT reduces root resistance and waterproofing performance",
      "Must be covered by protection board and growing medium — not a trafficable or exposed surface",
      "Confirm primer requirement for the specific substrate with Tremco technical before applying",
      "Confirm current product specification, Anti-Root Additive availability, and pricing with Tremco Australia before specifying",
    ],
    procurementSources: [
      { name: "Tremco Australia — confirm trade distributor and Anti-Root Additive stocking", url: "https://www.tremco.com.au" },
    ],
  },
  {
    fullLabel: "Soprema / Bayset Australia",
    brandUrl: "https://www.soprema.com.au",
    tdsUrl: undefined,
    accentColor: "#0369a1",
    name: "Soprema Colphene 3000 + Alsan Flashing Quadro",
    descriptionLine: "Self-adhesive SBS-modified bitumen sheet membrane for planter box waterproofing on concrete and blockwork — flameless cold-applied installation — used with Soprema Alsan Flashing Quadro root-resistant PU detail membrane — confirm current Australian availability before specifying",
    productType: "Self-adhesive SBS modified bitumen sheet — Soprema / Bayset — confirm AU availability",
    filterTags: ["Self-adhesive-sheet", "SBS-modified-bitumen", "Cold-applied", "Flameless", "Planter-box", "Retaining-wall", "Confirm-AU-availability"],
    techChips: [
      { label: "Self-adhesive SBS sheet", cls: "bg-sky-100 text-sky-800" },
      { label: "Cold-applied — flameless", cls: "bg-green-50 text-green-700" },
      { label: "Alsan Flashing Quadro detail", cls: "bg-slate-100 text-slate-700" },
      { label: "Bayset System 510", cls: "bg-slate-100 text-slate-700" },
      { label: "Confirm AU availability", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "Soprema Colphene 3000 is a self-adhering SBS-modified bitumen sheet membrane used for planter box waterproofing on concrete and blockwork substrates. It is applied by cold adhesion — no torch required — making it suitable for planter box applications where hot-work is restricted or impractical. It is available in Australia through Bayset as part of a documented planter box waterproofing system (Bayset System 510).\n\nIn the Bayset documented system, Colphene 3000 is applied to the planter box substrate and all penetrations and junctions are detailed using Soprema Alsan Flashing Quadro — a single-component root and rhizome-resistant polyurethane resin used for flameless waterproofing at junctions, upstands, and penetrations, incorporating Soprema Alsan Fleece 165 B reinforcing fabric at junctions. Aluminium K Flashing or Aluminium Pressure Seal is used to protect the exposed membrane edge at the top of the wall.\n\nConfirm with Soprema Australia or Bayset that Colphene 3000 is currently available and that the system is appropriate for the specific planter box substrate, plant species, and project conditions before specifying.",
    technicalProperties: [
      "Self-adhering SBS-modified bitumen sheet membrane — cold-applied, no torch required",
      "Applied with pressure roller to ensure full substrate contact",
      "Used with Soprema Alsan Flashing Quadro — root and rhizome-resistant PU junction detail membrane",
      "Alsan Fleece 165 B reinforcing fabric embedded in Alsan Flashing Quadro at all junctions",
      "Suitable for: concrete and blockwork planter boxes, retaining walls",
      "Documented system available through Bayset (System 510)",
      "Flameless installation — suitable where hot-work restrictions apply",
    ],
    limitations: [
      "Confirm current Australian product availability and distribution with Soprema Australia or Bayset before specifying",
      "SBS modified bitumen — confirm root resistance certification against the specific plant species with Soprema before specifying",
      "Cold-applied adhesion requires firm, consistent substrate pressure during installation",
      "Confirm compatibility of Alsan Flashing Quadro with the plant species above with Soprema technical",
      "Not for torch-on application — cold-adhesive system only",
      "Confirm current product name, system specification (System 510), and pricing with Bayset or Soprema Australia before specifying",
    ],
    procurementSources: [
      { name: "Bayset — Soprema system supplier in Australia", url: "https://www.bayset.com.au" },
      { name: "Soprema Australia — confirm direct distribution", url: "https://www.soprema.com.au" },
    ],
  },
  {
    fullLabel: "Tremco Australia",
    brandUrl: "https://www.tremco.com.au",
    tdsUrl: "https://www.tremco.com.au/products/tremproof-torch-anti-root",
    accentColor: "#be123c",
    name: "Tremco TREMproof Torch Anti-Root — Torch-on Anti-Root SBS Cap Sheet",
    descriptionLine: "TREMproof Torch Anti-Root — torch-on SBS-modified bitumen anti-root cap sheet — confirmed on tremco.com.au — applied as the top layer of a torch-on system — podium slabs, green roofs, and planter boxes — hot-work permit required",
    productType: "Torch-on SBS modified bitumen anti-root cap sheet — Tremco Australia — confirmed product",
    filterTags: ["Torch-on", "SBS-modified-bitumen", "Anti-root-cap", "Planter-box", "Green-roof", "Podium-slab", "Hot-work-required"],
    techChips: [
      { label: "Torch-on SBS modified bitumen", cls: "bg-rose-100 text-rose-800" },
      { label: "Anti-root cap sheet", cls: "bg-slate-100 text-slate-700" },
      { label: "Two-layer system", cls: "bg-slate-100 text-slate-700" },
      { label: "Established Australian system", cls: "bg-green-50 text-green-700" },
      { label: "Hot-work permit required", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "Modified bitumen torch-on sheet membranes with anti-root cap sheets are an established waterproofing system for podium slabs, green roofs, and planter box applications in Australia. The system consists of a standard SBS-modified bitumen base sheet, torch-applied to the prepared substrate, followed by an anti-root SBS cap sheet as the top layer. The anti-root cap sheet is formulated to resist root and rhizome penetration from the growing medium above.\n\nTremco Australia supplies TREMproof torch-applied SBS modified bitumen systems for podium and roof applications, including anti-root variants for green roof and planter box applications. The torch-on anti-root system is one of the more commonly used approaches in Australian strata podium and planter box waterproofing remediation — it is familiar to Australian torch-on waterproofing contractors and the materials are accessible through Tremco Australia's distribution network.\n\nHot-work permit and site safety management required for torch-on application — confirm hot-work permit availability and site safety requirements with the building manager before specifying for strata buildings. Torch-on is not suitable where gas lines, combustible materials, or confined spaces near the application area make open-flame application a safety risk.",
    technicalProperties: [
      "SBS-modified bitumen base sheet and anti-root cap sheet — torch-applied system",
      "Anti-root cap sheet formulated to resist root and rhizome penetration",
      "Suitable for: podium slabs, green roofs, planter boxes, and landscaped terrace applications",
      "Established system in Australian strata waterproofing practice",
      "Hot-work permit required for torch application",
      "Available through Tremco Australia distribution network",
    ],
    limitations: [
      "Hot-work permit required — confirm availability with building manager before specifying on occupied strata buildings",
      "Not suitable where gas lines, combustible materials, or confined spaces make torch application a safety risk",
      "Confirm with Tremco technical that the specific anti-root cap sheet is FLL certified or independently tested for root resistance against the plant species above",
      "Torch-on sheet seams must be correctly lapped and torch-bonded — seam quality determines root resistance at joints",
      "Confirm current Tremco anti-root product name, specification, and availability before specifying — product names and formulations can change",
    ],
    procurementSources: [
      { name: "Tremco Australia — confirm trade distributor and current anti-root cap sheet product", url: "https://www.tremco.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc Australia (via Parchem)",
    brandUrl: "https://www.parchem.com.au",
    tdsUrl: "https://www.parchem.com.au",
    accentColor: "#0369a1",
    name: "Fosroc Nitoproof 210",
    descriptionLine: "Fosroc root-resistant sheet membrane system for planter boxes and podium slabs",
    productType: "Root-resistant sheet membrane system",
    filterTags: ["Cold-applied", "Planter-box", "Below-grade", "Green-roof", "Podium-slab", "Confirm-AU-availability"],
    techChips: [
      { label: "Root-resistant", cls: "bg-green-100 text-green-800" },
      { label: "Sheet membrane", cls: "bg-slate-100 text-slate-700" },
      { label: "Fosroc / Parchem", cls: "bg-slate-100 text-slate-700" },
      { label: "Planter box / podium", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Fosroc Nitoproof 210 is a Fosroc root-resistant sheet membrane system for use in planter box and podium slab waterproofing applications where root intrusion resistance is required. As a Fosroc product distributed in Australia through Parchem Construction Supplies, it is available as part of the broader Fosroc waterproofing system range. Confirm current product specification, root resistance testing, applicable installation conditions, and system requirements with Fosroc Australia / Parchem before specifying.",
    technicalProperties: [
      "Root-resistant sheet membrane system — for planter box, podium slab and below-grade waterproofing applications",
      "Part of the Fosroc waterproofing system range — distributed through Parchem nationally",
      "Confirm current product specification and root resistance credentials from Fosroc Australia / Parchem TDS",
    ],
    limitations: [
      "Confirm current product name, specification and root resistance certification with Fosroc Australia / Parchem before specifying",
      "Confirm compatible Fosroc primer and system accessories required for installation",
      "Root resistance should be confirmed against the plant species to be installed above",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — Fosroc nationally", url: "https://www.parchem.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Weldable-sheet",        label: "Weldable sheet" },
  { id: "PVC-sheet",             label: "PVC sheet" },
  { id: "Liquid-applied",        label: "Liquid-applied PU" },
  { id: "Self-adhesive-sheet",   label: "Self-adhesive sheet" },
  { id: "Torch-on",              label: "Torch-on" },
  { id: "SBS-modified-bitumen",  label: "SBS modified bitumen" },
  { id: "FLL-certified",         label: "FLL certified" },
  { id: "Material-resistant",    label: "Material root resistance" },
  { id: "Root-inhibitor",        label: "Chemical root inhibitor" },
  { id: "Anti-root-additive",    label: "Anti-root additive" },
  { id: "Anti-root-cap",         label: "Anti-root cap sheet" },
  { id: "Preventol-B2",          label: "Preventol B2" },
  { id: "Fleece-backing",        label: "Fleece backing" },
  { id: "Under-tile",            label: "Under-tile compatible" },
  { id: "Planter-box",           label: "Planter box" },
  { id: "Green-roof",            label: "Green roof" },
  { id: "Podium-slab",           label: "Podium slab" },
  { id: "Below-grade",           label: "Below grade" },
  { id: "Retaining-wall",        label: "Retaining wall" },
  { id: "Cold-applied",          label: "Cold-applied / flameless" },
  { id: "Hot-work-required",     label: "Hot-work permit required" },
  { id: "ARDEX-accredited",      label: "ARDEX accredited applicator" },
  { id: "Projex-accredited",     label: "Projex Group accredited applicator" },
  { id: "Confirm-AU-availability", label: "Confirm Australian availability" },
  { id: "AS-4654",               label: "AS 4654" },
];

const TECH_SECTIONS: { icon: React.ReactNode; heading: string; body: string }[] = [
  {
    icon: <Shield size={15} />,
    heading: "FLL ROOT RESISTANCE CERTIFICATION",
    body: "The FLL (German Landscape Research, Development and Construction Society) test is the internationally recognised standard for root penetration resistance of waterproofing membranes. The test exposes the membrane to aggressive root-forming plant species under controlled conditions for a defined period and certifies whether the membrane resists penetration. FLL certification is confirmed by independent testing — it is not a manufacturer self-assessment. When specifying root resistant membranes for planter boxes and podium slabs, confirm that the selected membrane holds current FLL certification or equivalent independent root penetration test certification. Wolfin and Cosmofin PVC membranes (Projex Group) are FLL certified. ARDEX Root Repell contains Preventol B2 chemical root inhibitor — confirm the current independent certification status with ARDEX Australia before specifying.",
  },
  {
    icon: <Sprout size={15} />,
    heading: "ROOT RESISTANCE MECHANISMS",
    body: "Two mechanisms are used in root resistant membranes. Material resistance — the membrane material is physically impenetrable by roots due to its density, thickness, and chemical composition. PVC sheet membranes (Wolfin, Cosmofin) achieve root resistance through the material properties of the PVC compound — roots cannot mechanically penetrate the dense, flexible PVC sheet. This is a passive mechanical resistance. Chemical root inhibitor — the membrane incorporates a chemical additive (such as Preventol B2) that deters root growth toward and into the membrane without systemic herbicide action that would kill the plant above. ARDEX Root Repell uses Preventol B2. Chemical inhibitors do not mechanically prevent root penetration — they deter it. The inhibitor effectiveness depends on the plant species, growing medium depth, moisture conditions, and the durability of the inhibitor over the membrane's service life.",
  },
  {
    icon: <Layers size={15} />,
    heading: "SHEET VS LIQUID-APPLIED — SELECTION",
    body: "Weldable sheet membranes (ARDEX Root Repell, Wolfin, Cosmofin) are preferred for planter boxes and podium slabs where continuous mechanical root resistance is required across the full membrane area — heat-welded seams provide a continuous watertight and root-resistant sheet — no wet film thickness variation — consistent root resistance across the full installation. Liquid-applied membranes with anti-root additive (Tremco TREMproof 211 + Anti-Root Additive) are suitable where liquid-applied application is required for the substrate geometry, access, or project specification — anti-root additive must be mixed correctly into the liquid membrane before application — root resistance is dependent on correct mixing, correct DFT, and the additive's effectiveness against the specific plant species.",
  },
  {
    icon: <AlertTriangle size={15} />,
    heading: "PLANT SPECIES RISK",
    body: "Not all plants carry the same root penetration risk. The following plant types carry elevated root penetration risk and should trigger a higher-specification root resistant membrane system: bamboo (all species) — highly aggressive rhizomes capable of penetrating standard membranes; large trees — including fig species, liquidambar, and large-growing palms; deep-rooted ground covers and grasses — particularly in growing medium depths exceeding 300mm; plants with known aggressive root systems specified by the landscape architect. Confirm the plant species list with the landscape architect before selecting the membrane system. Where high-risk plant species are specified, FLL-certified sheet membrane systems are strongly preferred over liquid-applied membranes with additive.",
  },
  {
    icon: <BookOpen size={15} />,
    heading: "PROTECTION ABOVE THE MEMBRANE",
    body: "Root resistant membranes in planter box and podium applications must be protected from mechanical damage by root balls, aggregate, and growing medium installation. A protection board or drainage mat must be placed over the membrane before the drainage layer, filter fabric, and growing medium are installed. Confirm the required protection specification with the membrane manufacturer. Where the membrane is also required to provide drainage — on podium slabs with a drainage void above the membrane — a dimple mat protection and drainage layer is used rather than a solid protection board.",
  },
  {
    icon: <Wrench size={15} />,
    heading: "ACCREDITED APPLICATOR REQUIREMENTS",
    body: "ARDEX Root Repell must be installed by an ARDEX Accredited Applicator. Wolfin and Cosmofin must be installed by Projex Group-accredited applicators. Confirm accredited applicator availability before specifying either product. Torch-on anti-root cap sheet systems require a trained torch-on waterproofing contractor with a current hot-work permit — confirm contractor availability and hot-work permit access with the building manager before specifying torch-on systems on occupied strata buildings.",
  },
  {
    icon: <Info size={15} />,
    heading: "SYSTEM POSITION",
    body: "Root resistant membrane is applied to the prepared concrete substrate of the planter box or podium slab. The system build-up above the membrane is: (1) root resistant membrane applied to substrate, (2) protection board or dimple mat drainage layer, (3) filter fabric (geotextile), (4) growing medium (soil, aggregate, or planting mix), (5) plants. The membrane is never left exposed — it must be covered by the protection layer and growing medium. Confirm the complete system specification — including protection board, drainage, filter fabric, and growing medium — with the membrane manufacturer and the landscape architect before installation begins.",
  },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  type: string;
  mechanism: string;
  fll: string;
  application: string;
  accredited: string;
  keyRestriction: string;
}[] = [
  {
    product: "ARDEX Root Repell (WPM 1000 RR)",
    brand: "ARDEX Australia",
    type: "Weldable polypropylene sheet — 1.2mm",
    mechanism: "Preventol B2 chemical root inhibitor",
    fll: "Confirm current certification with ARDEX",
    application: "Heat-welded seams — Leister hot air gun",
    accredited: "Yes — ARDEX Accredited Applicator required",
    keyRestriction: "No ARDEX screed directly on membrane — no LOSP plywood — max 30 days UV exposure — confirm inhibitor effectiveness for high-risk species",
  },
  {
    product: "Wolfin IB",
    brand: "Projex Group",
    type: "Polyester-reinforced PVC sheet",
    mechanism: "Material root resistance — FLL certified",
    fll: "Yes — FLL certified",
    application: "Hot-air welded — loose-laid",
    accredited: "Yes — Projex Group-accredited applicator required",
    keyRestriction: "PVC separate from bitumen — accredited applicator required — up to 15-year warranty with accredited installation",
  },
  {
    product: "Cosmofin FG / FG LL",
    brand: "Projex Group",
    type: "Reinforced PVC sheet — fleece backing — 2mm",
    mechanism: "Material root resistance — FLL certified",
    fll: "Yes — FLL certified",
    application: "Hot-air welded — bonded or loose-laid",
    accredited: "Yes — Projex Group-accredited applicator required",
    keyRestriction: "Confirm FG vs FG LL for application standard — confirm tile adhesive compatibility with fleece backing",
  },
  {
    product: "TREMproof 211 + Anti-Root Additive",
    brand: "Tremco Australia",
    type: "Liquid-applied PU",
    mechanism: "Chemical anti-root additive — must be mixed in",
    fll: "Confirm with Tremco",
    application: "Brush, roller, or spray",
    accredited: "Confirm with Tremco",
    keyRestriction: "Anti-Root Additive must be specified and mixed in — TREMproof 211 alone is not root resistant — confirm additive effectiveness against plant species",
  },
  {
    product: "Colphene 3000 + Alsan Flashing",
    brand: "Soprema / Bayset",
    type: "Self-adhesive SBS modified bitumen sheet",
    mechanism: "SBS bitumen resistance — Alsan Flashing root and rhizome resistant",
    fll: "Confirm with Soprema",
    application: "Cold-applied self-adhesive — no torch",
    accredited: "Confirm with Soprema",
    keyRestriction: "Confirm Australian availability — confirm root resistance certification against specific plant species — flameless application only",
  },
  {
    product: "TREMproof Torch Anti-Root",
    brand: "Tremco Australia",
    type: "Torch-on SBS modified bitumen anti-root cap sheet — confirmed product on tremco.com.au",
    mechanism: "Anti-root SBS cap sheet formulation",
    fll: "Confirm FLL or independent certification with Tremco",
    application: "Torch-applied — hot-work permit required",
    accredited: "Confirm with Tremco",
    keyRestriction: "Hot-work permit required — confirm anti-root cap sheet FLL certification — seam quality critical for root resistance at laps",
  },
];

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

export function RootResistantIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are root resistant membrane systems — planter boxes and podiums?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Root resistant membrane systems are waterproofing membranes specifically designed and tested to resist penetration by plant roots over the life of a planter box or green roof installation. Standard waterproofing membranes — whether liquid-applied polyurethane, torch-on modified bitumen, or PVC single-ply — are not designed to resist root penetration. Plant roots, particularly from woody shrubs, trees, and aggressive species such as bamboo and some ornamental grasses, exert significant mechanical pressure and produce organic acids and enzymes that can penetrate and degrade a standard membrane over time, leading to water ingress through the structural podium slab or roof deck below. Root resistant membranes address this by providing either a physical barrier through a dense, root-impenetrable material (typically weldable polypropylene or PVC), a chemical barrier through a root inhibitor compound (typically Preventol B2) incorporated into the membrane, or a combination of both mechanisms.
        </p>
        {expanded && (
          <>
            <p>
              The definitive performance standard for root resistance is the FLL Guideline — published by the German Forschungsgesellschaft Landschaftsentwicklung Landschaftsbau (FLL) — which defines a standardised test protocol for root and rhizome penetration resistance. Products that carry FLL root resistance certification have been independently tested and confirmed to resist root penetration through the membrane under the FLL test conditions. In the Australian market, FLL certification is the primary basis for specifying a membrane as root resistant. Products without FLL certification should not be specified as root resistant waterproofing in planter box or green roof applications regardless of manufacturer claims. The AS 4654 series covers waterproofing of wet areas including roofs, but FLL certification specifically addresses root resistance and remains the relevant standard for this application.
            </p>
            <p>
              Root resistant membranes are one layer in a complete planter box or podium slab waterproofing system. The complete system above a structural concrete slab includes, in order from slab upward: the waterproofing membrane (root resistant), a protection board or drainage mat, a drainage cell or aggregate drainage layer, a geotextile filter fabric layer, and then growing medium and planting. The root resistant membrane is never left exposed and must be covered by a protection course immediately after application or installation — UV exposure and foot traffic will degrade any waterproofing membrane, including root resistant types, if left unprotected. Drainage design, outlet sizing, and filter fabric selection must be coordinated with the landscape architect to ensure the planter box system performs as a whole.
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
export function RootResistantProductSection() {
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
              FLL certification, root resistance mechanisms, sheet vs liquid-applied selection, system position, plant species risk, protection above membrane, accredited applicator requirements
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? <>Hide detail <ChevronUp size={14} /></> : <>Show detail <ChevronDown size={14} /></>}
          </div>
        </button>
        {accordionOpen && (
          <div className="border-t border-slate-100 px-7 pb-7 pt-6">
            <div className="grid gap-5 md:grid-cols-2">
              {TECH_SECTIONS.map((section) => (
                <div key={section.heading} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-3 flex items-center gap-2.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-white">
                      {section.icon}
                    </div>
                    <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-sky-950">{section.heading}</h3>
                  </div>
                  <p className="text-xs leading-6 text-slate-600">{section.body}</p>
                </div>
              ))}
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
              6 products — 4 brands — weldable sheet membranes with root inhibitor, FLL-certified PVC sheet membranes, liquid-applied membranes with anti-root additive, and anti-root modified bitumen cap sheets — planter box, green roof, and podium slab waterproofing
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
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll to view all
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
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                      {product.fullLabel}
                    </span>
                    <div className="flex shrink-0 items-center gap-1">
                      {product.tdsUrl && (
                        <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
                          <FileText size={9} /> TDS
                        </a>
                      )}
                      {product.brandUrl && (
                        <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
                          <ExternalLink size={9} /> Brand Site
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{product.descriptionLine}</p>
                </div>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-1.5 border-b border-slate-100 bg-white px-5 py-3">
                  {product.techChips.map((chip) => (
                    <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>
                  ))}
                </div>

                {/* System Description */}
                <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
                  <CollapsibleDescription text={product.systemDescription} />
                </div>

                {/* Properties & Limitations */}
                <div className="space-y-3 px-5 py-4">
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-green-700">Technical Properties</p>
                    <ul className="space-y-1.5">
                      {product.technicalProperties.map((prop, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
                          <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" />{prop}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">Limitations</p>
                    <ul className="space-y-1.5">
                      {product.limitations.map((lim, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
                          <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />{lim}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Procurement */}
                <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-4">
                  <p className="mb-3 text-[10px] uppercase tracking-wider text-slate-400">PROCUREMENT SOURCES</p>
                  <div className="space-y-2">
                    {product.procurementSources.map((src) => (
                      <div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs">
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
                  <p className="mt-3 text-[10px] italic text-slate-400">Confirm suitability with the current manufacturer TDS before specifying or applying.</p>
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
            <h2 className="text-2xl font-extrabold text-sky-950">Root resistant membrane system comparison</h2>
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of root resistant membrane systems for planter boxes and podium slabs. Confirm all product selections against the current manufacturer TDS, FLL certification, and plant species list before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Root resistance mechanism</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">FLL certified</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Application method</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Accredited applicator</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key restriction</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600">{row.mechanism}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.fll.startsWith("Yes") ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-green-700"><CheckCircle size={11} />{row.fll}</span>
                    ) : (
                      <span className="text-slate-500">{row.fll}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.application}</td>
                  <td className="px-4 py-3 text-slate-600">{row.accredited}</td>
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
