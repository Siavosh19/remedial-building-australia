"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Water-based"
  | "Solvent-based"
  | "Two-component"
  | "Acrylic-primer"
  | "Epoxy-primer"
  | "Bitumen-primer"
  | "SBR-admixture"
  | "Bonding-agent"
  | "Moisture-barrier"
  | "Damp-green-concrete"
  | "Torch-on-system"
  | "Sheet-membrane-system"
  | "Liquid-membrane-system"
  | "Porous-substrates"
  | "Internal-external"
  | "Pools-submerged"
  | "Flammable"
  | "Potable-water"
  | "Low-VOC"
  | "Colour-indicator"
  | "Repair-mortar-system";

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
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://ardexaustralia.com/product/ardex-wpm-265/",
    accentColor: "#f97316",
    name: "ARDEX WPM 265",
    descriptionLine: "Red water-based acrylic primer — porous substrates — prior to ARDEX water-based membranes — internal and external",
    productType: "Water-based acrylic primer — pre-membrane — porous substrates",
    filterTags: ["Water-based", "Acrylic-primer", "Porous-substrates", "Liquid-membrane-system", "Internal-external", "Low-VOC", "Colour-indicator"],
    techChips: [
      { label: "Water-based acrylic", cls: "bg-orange-100 text-orange-800" },
      { label: "Red colour indicator", cls: "bg-red-50 text-red-700" },
      { label: "Porous substrates", cls: "bg-slate-100 text-slate-700" },
      { label: "Low VOC — 11g/L", cls: "bg-green-50 text-green-700" },
      { label: "Non-flammable", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "ARDEX WPM 265 is ARDEX's general-purpose water-based acrylic primer for porous substrates prior to the application of ARDEX water-based liquid applied membranes (WPM 002, WPM 130, WPM 157, WPM 155, WPM 910 and similar). It is red pigmented — primed surfaces are easily identified visually during inspection, confirming coverage before membrane application commences.\n\nWPM 265 is a penetrating primer — it seals the pores of absorbent substrates, reducing the risk of pinholes or bubbles in the subsequently applied membrane caused by air escaping from an unprimed porous substrate. Apply by brush, roller, or low-pressure spray at approximately 6m² per litre. Allow a minimum of 1 hour recoat time. Apply membrane within the same day of priming to avoid intercoat contamination — do not leave primed surface overnight without overcoating or re-priming.\n\nWPM 265 is designed principally for internal use but can also be used for external applications. It is not suitable for damp, green, or high-moisture concrete — use ARDEX WPM 300 (HydrEpoxy) on substrates with elevated moisture content.",
    technicalProperties: [
      "Red water-based acrylic primer — penetrating — seals porous substrates before ARDEX water-based liquid membranes",
      "Red pigmentation confirms primer coverage visually during inspection — critical hold point confirmation",
      "Coverage: approximately 6m² per litre",
      "Recoat time: 1 hour minimum — must be overcoated within the same day of application",
      "Low VOC: 11g/L — solvent free — non-flammable",
      "Application temperature: 10°C to 35°C",
      "Compatible substrates: wet-area grade fibre cement sheet, particleboard, marine plywood, concrete (new and old), renders and screeds, masonry / concrete blocks",
    ],
    limitations: [
      "Not suitable for damp, green, or high-moisture concrete — use ARDEX WPM 300 (HydrEpoxy) where moisture content exceeds limits",
      "Do not leave primed surface overnight without overcoating — re-prime if surface has been left more than one day or has been contaminated",
      "Not a substitute for the waterproofing membrane — pre-membrane substrate preparation only",
      "Not compatible with torch-on or self-adhesive bitumen sheet systems — use ARDEX WPM 240 for bitumen sheet primer",
      "Do not apply below 10°C or above 35°C",
      "Confirm compatibility with the specific ARDEX membrane system before specifying",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply", url: "https://www.ardex.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "TradieCart", url: "https://www.tradiecart.com.au" },
      { name: "Total Waterproofing Supplies", url: "https://www.totalwaterproofingsupplies.com.au" },
    ],
  },
  {
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://ardexaustralia.com/product/ardex-wpm-300/",
    accentColor: "#f97316",
    name: "ARDEX WPM 300 (HydrEpoxy)",
    descriptionLine: "Two-component water-based epoxy moisture barrier and primer — damp, green, and high-moisture concrete — mandatory ARDEX primer for elevated moisture substrates — potable water compliant",
    productType: "Two-component water-based epoxy moisture barrier — pre-membrane — damp / green concrete",
    filterTags: ["Two-component", "Epoxy-primer", "Moisture-barrier", "Damp-green-concrete", "Liquid-membrane-system", "Potable-water", "Internal-external"],
    techChips: [
      { label: "Two-component epoxy", cls: "bg-orange-100 text-orange-800" },
      { label: "Moisture barrier", cls: "bg-sky-50 text-sky-700" },
      { label: "Damp / green concrete", cls: "bg-green-50 text-green-700" },
      { label: "AS 4020 potable water", cls: "bg-slate-100 text-slate-700" },
      { label: "250kPa hydrostatic", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "ARDEX WPM 300 (HydrEpoxy) is ARDEX's two-component water-based epoxy moisture barrier and primer coating. It is not an acrylic primer — it is an epoxy system used specifically where the concrete substrate has elevated moisture content, is freshly laid (green), or is producing efflorescence, and where a standard acrylic primer such as WPM 265 is not appropriate.\n\nARDEX specifies WPM 300 as the mandatory primer when substrate moisture content exceeds 80% relative humidity (ASTM F2170) or 15g/m²/24hrs (ASTM F1869) — typically equivalent to 5% or greater moisture content from a digital non-destructive moisture meter. On occupied balcony remediation projects where the existing concrete slab may retain significant residual moisture, WPM 300 is the correct primer selection.\n\nWPM 300 can withstand 250kPa of hydrostatic pressure (equivalent to a 25m head of water) when applied to the substrate — functioning as both a moisture barrier and a waterproofing membrane in tanking applications, including potable water containment. Complies with AS 4020:2000 and British Standard 6920 for use in contact with potable water.\n\nRecoat time: 4 hours minimum. Maximum overcoat window: 72 hours — membrane must be applied within 72 hours of WPM 300 application or the surface must be re-primed. Sand blinding of the wet WPM 300 surface with ARDEX primer sand extends the overcoat window and is recommended practice for external tiling applications. Available in grey and Mojo Black.",
    technicalProperties: [
      "Two-component water-based epoxy polyamide moisture barrier and primer coating — powder + liquid components mixed on site",
      "Mandatory ARDEX primer where substrate moisture exceeds 80% RH (ASTM F2170) or 15g/m²/24hrs (ASTM F1869)",
      "Withstands 250kPa hydrostatic pressure — equivalent to 25m head of water — prevents efflorescence and rising damp",
      "Potable water compliant — AS 4020:2000 and British Standard 6920",
      "Can be applied to damp surfaces and green concrete",
      "Recoat time: 4 hours — maximum overcoat window: 72 hours — re-prime if exceeded",
      "Coverage: 60m²/20L kit at 1 coat; 30m²/20L kit at 2 coats — available in grey and Mojo Black",
    ],
    limitations: [
      "Two-component — must be mixed before use — do not use as a single component",
      "Maximum overcoat window: 72 hours — re-prime if exceeded — do not leave unovercoated beyond this period",
      "Ceases to cure below 10°C — do not apply in cold conditions",
      "Do not apply where relative humidity exceeds 85% — adequate ventilation required in enclosed spaces",
      "Sand blinding recommended for external tiling jobs to extend overcoat window",
      "Not a substitute for the waterproofing membrane unless confirmed as standalone tanking system — confirm application with ARDEX Australia technical",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply", url: "https://www.ardex.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "TradieCart", url: "https://www.tradiecart.com.au" },
    ],
  },
  {
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://ardexaustralia.com/product/ardex-wpm-240/",
    accentColor: "#f97316",
    name: "ARDEX WPM 240",
    descriptionLine: "Solvent-based bitumen modified primer — mandatory substrate preparation prior to ARDEX torch-on and self-adhesive modified bitumen sheet membranes",
    productType: "Solvent-based bitumen primer — pre-sheet membrane — torch-on and self-adhesive bitumen systems",
    filterTags: ["Solvent-based", "Bitumen-primer", "Torch-on-system", "Sheet-membrane-system", "Flammable"],
    techChips: [
      { label: "Solvent-based bitumen", cls: "bg-orange-100 text-orange-800" },
      { label: "Torch-on system primer", cls: "bg-slate-100 text-slate-700" },
      { label: "Flammable — ventilate", cls: "bg-red-50 text-red-700" },
      { label: "ARDEX WPM 150 / 185 system", cls: "bg-slate-100 text-slate-700" },
      { label: "Tack-free before sheet", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "ARDEX WPM 240 (Shelter Primer) is the mandatory solvent-based bitumen primer for use on concrete substrates prior to installation of ARDEX's torch-on modified bitumen sheet membranes (WPM 150, WPM 185) and self-adhesive sheet membranes (Shelterseal range). It is not a water-based or acrylic primer — it is a solvent-based bitumen cut dissolved in mineral spirits. Its function is to seal the concrete substrate and provide the tackified surface to which the bitumen sheet membrane bonds.\n\nDo not substitute WPM 240 with a water-based or acrylic primer under torch-on or self-adhesive bitumen sheet systems. The solvent carrier in WPM 240 penetrates the concrete surface and leaves a bitumen film that is chemically and physically compatible with the modified bitumen sheet membrane applied over it. A water-based primer does not achieve this and will result in inadequate bond between the sheet and the substrate.\n\nApply by brush or airless spray. Allow the primer to become fully tack-free before installing the sheet membrane — a tacky but not wet surface is the correct condition for sheet installation. Coverage is approximately 5m² per litre, varying with substrate porosity. The product has a strong solvent odour — adequate ventilation is required. The product is flammable — store and use away from ignition sources.\n\nNote: WPM 240 primer is only required between the primed concrete substrate and the first sheet layer — it is not required between the base sheet and cap sheet layers.",
    technicalProperties: [
      "Solvent-based bitumen modified primer — black liquid — applied by brush or airless spray",
      "Mandatory primer for ARDEX Shelterbit torch-on (WPM 150, WPM 185) and Shelterseal self-adhesive sheet membranes",
      "Coverage: approximately 5m² per litre — varies with substrate porosity",
      "Must be allowed to become fully tack-free before sheet membrane is installed",
      "Not required between base sheet and cap sheet layers — substrate-to-first-sheet application only",
      "Pack size: 20L pail",
    ],
    limitations: [
      "Solvent-based — strong solvent odour — adequate ventilation mandatory during and after application — not suitable for confined spaces without forced air extraction",
      "Flammable — keep away from ignition sources and open flame during application and until fully cured",
      "Must be fully tack-free before sheet membrane is installed — sheet applied over wet primer will not bond correctly",
      "Not a substitute for water-based acrylic primers under liquid-applied membrane systems",
      "Not for use under polyurethane or acrylic liquid membranes",
      "Confirm current product specification with ARDEX Australia before specifying",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply", url: "https://www.ardex.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "TradieCart", url: "https://www.tradiecart.com.au" },
      { name: "Komerco", url: "https://komerco.com.au" },
      { name: "Total Waterproofing Supplies", url: "https://www.totalwaterproofingsupplies.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/en/construction/tile-stone-installationsystems/primers-additives/sikatile-010-secureprime.html",
    accentColor: "#be123c",
    name: "SikaTile-010 Secure Prime",
    descriptionLine: "General-purpose water-based primer — porous and dense substrates — prior to Sika water-based waterproofing membranes — internal and external including submerged applications",
    productType: "Water-based acrylic primer — crystalline technology — pre-membrane — porous and dense substrates",
    filterTags: ["Water-based", "Acrylic-primer", "Porous-substrates", "Liquid-membrane-system", "Internal-external", "Pools-submerged"],
    techChips: [
      { label: "Water-based acrylic", cls: "bg-rose-100 text-rose-800" },
      { label: "Crystalline technology", cls: "bg-slate-100 text-slate-700" },
      { label: "Pools and spas — submerged", cls: "bg-green-50 text-green-700" },
      { label: "Internal and external", cls: "bg-slate-100 text-slate-700" },
      { label: "13m² per litre", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "SikaTile-010 Secure Prime is Sika Australia's general-purpose water-based primer for porous substrates prior to the application of Sika water-based waterproofing membranes and tile adhesives. It functions as both a surface sealer on porous substrates (concrete, screeds, renders, fibre cement) and as a priming coat on dense or steel-trowelled concrete surfaces — reducing the risk of efflorescence by using a unique crystalline technology that reduces the porosity of concrete, screeds, and renders.\n\nSikaTile-010 is suitable for internal and external use, including submerged applications such as tiled pools and spas — making it one of the more versatile primers in this category. The product is milky white liquid, dries clear. Apply by brush, roller, or low-pressure spray at approximately 13m² per litre depending on substrate porosity. Allow primer to dry before applying the waterproofing membrane or tile adhesive.\n\nCompatible substrates include concrete, cement boards and sheets (including Scyon), plasterboard, glass-reinforced concrete, cement-based screeds and renders, compressed fibre cement, masonry, and most standard construction boards. Early-aged concrete must be minimum 7 days old at 22°C / 50% RH before priming. Early-aged cement-based screeds must be minimum 24 hours old per 40mm of thickness.",
    technicalProperties: [
      "General-purpose water-based acrylic primer with crystalline technology — milky white liquid, dries clear",
      "Reduces porosity of concrete, screeds, and renders — prevents efflorescence",
      "Coverage: approximately 13m² per litre depending on substrate porosity",
      "Suitable for internal and external applications including submerged (pools and spas)",
      "Compatible substrates: concrete, cement boards/sheets, plasterboard, GRC, screeds, renders, fibre cement, masonry",
      "Early-aged concrete minimum 7 days before priming — early-aged screeds minimum 24 hours per 40mm thickness",
      "Applied by brush, roller, or low-pressure spray — must be dry before membrane or adhesive is applied",
    ],
    limitations: [
      "System-specific — confirm compatibility with the specific Sika membrane before specifying — not a universal cross-brand primer",
      "Not suitable for damp or green concrete with elevated moisture — confirm moisture limits with Sika technical",
      "Early-aged concrete and screeds must meet minimum age requirements before priming",
      "Dense, glazed, or low-absorption surfaces may require a different approach — confirm with Sika technical",
      "Confirm current product specification with Sika Australia before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply", url: "https://aus.sika.com" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
    ],
  },
  {
    fullLabel: "Tremco CPG Australia",
    brandUrl: "https://www.tremco.com.au",
    tdsUrl: "https://www.tremco.com.au/products/tremproof-torch-3000",
    accentColor: "#0891b2",
    name: "Tremco Torch Bitumen Primer",
    descriptionLine: "Solvent-based bitumen primer — mandatory substrate preparation prior to Tremco TREMproof Torch 3000 and 4000M torch-on modified bitumen sheet membranes",
    productType: "Solvent-based bitumen primer — pre-sheet membrane — TREMproof Torch system",
    filterTags: ["Solvent-based", "Bitumen-primer", "Torch-on-system", "Sheet-membrane-system", "Flammable"],
    techChips: [
      { label: "Solvent-based bitumen", cls: "bg-cyan-100 text-cyan-800" },
      { label: "TREMproof Torch system", cls: "bg-slate-100 text-slate-700" },
      { label: "Flammable — ventilate", cls: "bg-red-50 text-red-700" },
      { label: "6–8m² per litre", cls: "bg-slate-100 text-slate-700" },
      { label: "Tack-free before sheet", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Tremco Torch Bitumen Primer is the mandatory solvent-based primer for concrete substrates prior to installation of Tremco's TREMproof Torch 3000 and TREMproof Torch 4000M APP modified bitumen torch-on sheet membrane system. As with all bitumen sheet primer systems, this is a solvent-based product — not a water-based or acrylic primer. The solvent carrier penetrates the concrete surface and deposits a bituminous film that provides the chemical and physical bond interface for the torched APP sheet membrane.\n\nApply at a rate of 6–8m² per litre. Allow the primer to become fully tack-free before membrane application. The primer must not be wet when the sheet is applied — a fully dried, tack-free primer surface is the correct condition. Tools and equipment are cleaned with Tremco Xylol solvent immediately after use.\n\nThe Tremco Torch Bitumen Primer is part of Tremco's complete torch-on membrane system. Tremco requires that the primer and membrane be from the same Tremco system for system warranty to apply — do not substitute a third-party primer under TREMproof Torch membranes without confirming compatibility with Tremco CPG Australia.",
    technicalProperties: [
      "Solvent-based bitumen primer for concrete substrates — applied by brush or spray",
      "Coverage rate: 6–8m² per litre",
      "Mandatory system component for TREMproof Torch 3000 and TREMproof Torch 4000M torch-on membrane systems",
      "Must reach fully tack-free condition before sheet membrane installation",
      "Equipment cleaned with Tremco Xylol solvent immediately after use",
      "Part of the complete Tremco CPG torch-on waterproofing system — system warranty requires Tremco primer with Tremco membrane",
    ],
    limitations: [
      "Solvent-based — adequate ventilation required during and after application — not suitable for confined spaces without forced air extraction",
      "Flammable — store and handle away from ignition sources",
      "Primer must be tack-free before sheet application — wet primer will prevent correct sheet bond",
      "Tremco system warranty requires use of Tremco primer with Tremco membrane — do not substitute without Tremco technical confirmation",
      "Not for use under liquid-applied polyurethane or acrylic membrane systems",
      "Confirm current product name and specification with Tremco CPG Australia before specifying",
    ],
    procurementSources: [
      { name: "Tremco CPG Australia — trade supply", url: "https://www.tremco.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem Construction Supplies",
    brandUrl: "https://www.fosroc.com.au",
    tdsUrl: "https://www.fosroc.com.au/product/nitobond-sbr",
    accentColor: "#7c2d12",
    name: "Fosroc Nitobond SBR",
    descriptionLine: "SBR polymer bonding agent and cement mortar admixture — improves adhesion, water resistance, and durability of cementitious screeds, renders, repair mortars, and primer slurries in waterproofing systems",
    productType: "SBR polymer bonding agent and cementitious mortar admixture — single component",
    filterTags: ["SBR-admixture", "Bonding-agent", "Water-based", "Repair-mortar-system", "Internal-external", "Pools-submerged"],
    techChips: [
      { label: "SBR polymer admixture", cls: "bg-orange-100 text-orange-900" },
      { label: "Single component", cls: "bg-slate-100 text-slate-700" },
      { label: "Bonding agent", cls: "bg-green-50 text-green-700" },
      { label: "Pools / submerged OK", cls: "bg-slate-100 text-slate-700" },
      { label: "Parchem distribution", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Fosroc Nitobond SBR is a modified styrene-butadiene rubber (SBR) polymer emulsion used as a bonding agent and admixture for cementitious systems in balcony waterproofing and remediation. It is not a standalone primer or membrane — it is added to site-batched cement-based mortars, screeds, renders, and slurries to improve their adhesion, water resistance, flexibility, and durability.\n\nIn balcony waterproofing remediation, Nitobond SBR is most commonly used in two ways: as a bonding slurry applied to prepared concrete before repair mortars or screeds, and as a gauging liquid added to cement powder to produce a polymer-modified primer slurry or waterproof render. In conjunction with Fosroc Nitoproof 410 cementitious membrane, a sand/cement slurry primed with Nitobond SBR is mandatory for submerged applications such as tiled pools and water tanks.\n\nNitobond SBR improves tensile and flexural properties — allowing thinner applications of repair mortars — and produces mortars resistant to freeze/thaw cycling and waterproof renders with reduced permeability. Resistant to hydrolysis — suitable for external and permanently submerged applications. Supplied as a ready-to-use white liquid. Distributed in Australia by Parchem Construction Supplies.",
    technicalProperties: [
      "Modified SBR polymer emulsion — single component ready-to-use white liquid — gauged into cement-based mixes",
      "Used as bonding agent and gauging liquid for cement-based mortars, screeds, renders, and slurries",
      "Improves adhesion, tensile strength, flexural strength, and water resistance of cementitious mixes",
      "Reduces permeability — improves weather and chemical resistance",
      "Resistant to hydrolysis — suitable for external and permanently submerged applications including pools and tanks",
      "Mandatory as sand/cement slurry primer for Nitoproof 410 in submerged applications — confirm dosage from TDS",
      "Compatible substrates: concrete, masonry, stonework, plaster, blockwork",
    ],
    limitations: [
      "Not a standalone primer or waterproofing membrane — must be gauged into cementitious mixes — do not apply neat to substrate as a primer",
      "Mix ratios must be confirmed from the current Fosroc/Parchem TDS — incorrect dosage reduces performance",
      "Not a substitute for a dedicated membrane system primer such as an acrylic or epoxy primer — confirm which primer is required for the specific Fosroc membrane system",
      "Confirm current product specification and mix ratios with Parchem before specifying",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — trade supply", url: "https://www.parchem.com.au" },
      { name: "Fosroc Australia — product information", url: "https://www.fosroc.com.au" },
    ],
  },
  {
    fullLabel: "Gripset Industries",
    brandUrl: "https://www.gripset.com",
    tdsUrl: "https://gripset.com/products/gripset-11y/",
    accentColor: "#f59e0b",
    name: "Gripset 11Y",
    descriptionLine: "Concentrated SBR latex polymer admixture — upgrades cement-based screeds, renders, repair mortars, and primer slurries for improved bond, durability, and water resistance in waterproofing systems",
    productType: "Concentrated SBR latex polymer admixture — bonding agent and cement system upgrade",
    filterTags: ["SBR-admixture", "Bonding-agent", "Water-based", "Repair-mortar-system", "Internal-external"],
    techChips: [
      { label: "SBR latex admixture", cls: "bg-amber-100 text-amber-800" },
      { label: "Concentrated", cls: "bg-slate-100 text-slate-700" },
      { label: "Bonding agent", cls: "bg-green-50 text-green-700" },
      { label: "Australian made", cls: "bg-slate-100 text-slate-700" },
      { label: "Gripset membrane systems", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Gripset 11Y is a concentrated SBR (styrene-butadiene rubber) latex polymer admixture that is added to cement-based mixes to upgrade their performance for high-bond, durable, and water-resistant applications. Like Fosroc Nitobond SBR, it is not a standalone primer or waterproofing membrane — it is an admixture that modifies cement-based systems used in and around waterproofing installations.\n\nIn balcony waterproofing remediation, Gripset 11Y is used to produce polymer-modified primer slurries applied to concrete substrates before Gripset liquid membranes (38FC, BRW systems), to improve the bond and durability of cement screeds and renders that form part of the waterproofing system, and to upgrade repair mortars applied to balcony concrete before membrane application. It is also confirmed for use over bitumen substrates as part of a preparation system — Gripset 11Y slurry over bitumen substrates before Gripset RD acrylic membrane.\n\nSubstrate compatibility is broad — confirmed for concrete, masonry, renders, concrete blocks, aerated concrete, clay bricks, pavers, cement sheeting, marine plywood, wet area particleboard, asphalt, cured bitumen, and existing acrylic coatings. This makes Gripset 11Y practical on remedial balcony projects where the existing substrate includes a range of materials. Australian manufactured by Gripset Industries.",
    technicalProperties: [
      "Concentrated SBR latex polymer admixture — added to cement-based mixes — not applied neat to substrate",
      "Improves adhesion, flexural strength, water resistance, and durability of cement-based systems",
      "Reduces permeability and shrinkage of cement mortars — accelerates early strength development",
      "Resistant to freeze/thaw cycling and de-icing salts",
      "Confirmed for use over bitumen substrates as part of Gripset RD system preparation",
      "Compatible substrates: concrete, masonry, renders, cement sheeting, marine plywood, wet area particleboard, asphalt, cured bitumen, existing acrylic coatings",
      "Australian manufactured — Gripset Industries",
    ],
    limitations: [
      "Not a standalone primer or membrane — must be mixed with cement — do not use neat as a primer",
      "Dosage rates must be confirmed from the current Gripset 11Y TDS — incorrect dosage reduces performance",
      "Not a substitute for a specific primer required by a membrane manufacturer — confirm whether the membrane system requires 11Y admixture or a dedicated primer product",
      "Confirm current product specification and dosage rates with Gripset Industries before specifying",
    ],
    procurementSources: [
      { name: "Gripset Industries — trade supply", url: "https://www.gripset.com" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "Adheseal", url: "https://adheseal.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem Construction Supplies",
    brandUrl: "https://www.fosroc.com.au",
    tdsUrl: "https://www.fosroc.com.au/product/nitobond-ep",
    accentColor: "#7c2d12",
    name: "Fosroc Nitobond EP",
    descriptionLine: "Two-component epoxy bonding agent — bonding fresh cementitious repair mortars and toppings to existing concrete — damp or permanently wet substrates",
    productType: "Two-component epoxy bonding agent — cementitious repair systems — damp and permanently wet substrates",
    filterTags: ["Two-component", "Epoxy-primer", "Bonding-agent", "Damp-green-concrete", "Repair-mortar-system", "Internal-external"],
    techChips: [
      { label: "Two-component epoxy", cls: "bg-orange-100 text-orange-900" },
      { label: "Bonding agent", cls: "bg-slate-100 text-slate-700" },
      { label: "Damp / permanently wet", cls: "bg-green-50 text-green-700" },
      { label: "Cementitious repair bond", cls: "bg-slate-100 text-slate-700" },
      { label: "Parchem distribution", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Fosroc Nitobond EP is a two-component epoxy bonding agent used to bond fresh, wet cementitious repair mortars and toppings to existing cementitious surfaces — particularly where the substrate is likely to remain permanently damp or wet, or where a moisture barrier between the substrate and the repair is required. It is suitable for internal and external applications.\n\nIn balcony waterproofing and remediation contexts, Nitobond EP is most relevant at the concrete repair stage — applied to the prepared concrete substrate before application of Renderoc or similar cementitious repair mortars on spalled, deteriorated, or delaminated balcony slab soffit and edge areas. It is not a pre-membrane primer in the same sense as acrylic or bitumen primers — it is a bonding agent for cementitious-to-cementitious repair applications.\n\nNitobond EP is the recommended alternative to Nitobond HAR where the substrate is wet or likely to remain permanently damp — HAR is for normal conditions, EP for wet conditions. The primer must be applied in a tacky state and the repair mortar must be applied before the primer becomes dry or fully cured — do not allow Nitobond EP to dry before applying the cementitious repair mortar.",
    technicalProperties: [
      "Two-component epoxy bonding agent — must be mixed before application",
      "Bonds fresh wet cementitious repair mortars to existing concrete surfaces",
      "Specifically recommended for damp or permanently wet substrates — alternative to Nitobond HAR for wet conditions",
      "Can function as a substrate/repair moisture barrier between the existing substrate and the repair mortar",
      "Applied in a tacky state — cementitious repair mortar applied before primer dries",
      "Suitable for internal and external applications",
      "Distributed in Australia by Parchem Construction Supplies",
    ],
    limitations: [
      "Repair mortar must be applied while Nitobond EP is in a tacky state — do not allow it to dry before applying mortar — re-prime if dried",
      "Two-component — must be mixed correctly before use",
      "Not a pre-membrane primer for liquid-applied or sheet membrane systems — this is a concrete repair bonding agent",
      "Confirm current product specification and application instructions with Parchem before specifying",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — trade supply", url: "https://www.parchem.com.au" },
      { name: "Fosroc Australia — product information", url: "https://www.fosroc.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com",
    accentColor: "#be123c",
    name: "Sika Sikalastic Moisture Seal",
    descriptionLine: "Sika moisture-tolerant primer/sealer for damp substrates prior to membrane application",
    productType: "Moisture-tolerant primer/sealer — damp substrate preparation",
    filterTags: ["Epoxy-primer", "Moisture-barrier", "Damp-green-concrete", "Liquid-membrane-system", "Internal-external"],
    techChips: [
      { label: "Moisture-tolerant primer", cls: "bg-rose-100 text-rose-800" },
      { label: "Damp substrate", cls: "bg-sky-50 text-sky-700" },
      { label: "Sika system", cls: "bg-slate-100 text-slate-700" },
      { label: "Pre-membrane", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Sika Sikalastic Moisture Seal is a Sika moisture-tolerant primer and sealer for use on damp substrates prior to membrane application in balcony and wet area waterproofing remediation. It is designed for situations where the concrete substrate cannot be fully dried before membrane application — a common occurrence on occupied Class 2 strata balcony remediation projects. Apply by roller or brush to the substrate and allow to cure to the specified condition before applying the Sika membrane. Confirm current product name, application requirements, and compatible membrane systems with Sika Australia technical before specifying — Sika product names are subject to periodic revision.",
    technicalProperties: [
      "Moisture-tolerant formulation — can be applied to damp concrete substrates prior to membrane",
      "Seals the substrate surface to reduce the risk of moisture-related adhesion failures under the membrane",
      "For use within the Sika waterproofing membrane system — confirm compatible membranes with Sika technical",
      "Apply by roller or brush — confirm coverage and recoat time from current Sika TDS",
    ],
    limitations: [
      "System-specific — confirm compatibility with the specific Sika membrane being used — not a universal cross-brand primer",
      "Confirm allowable substrate moisture content with Sika Australia — moisture-tolerant does not mean unlimited moisture",
      "Confirm current product name and specification with Sika Australia before specifying — product names subject to change",
      "Not a standalone waterproofing membrane — pre-membrane primer only",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply — contact for current pricing", url: "https://aus.sika.com" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
  },
  {
    fullLabel: "Westox Building Products",
    brandUrl: "https://www.westox.com.au",
    tdsUrl: "https://www.westox.com.au",
    accentColor: "#64748b",
    name: "Westox Wesprime",
    descriptionLine: "Westox primer/sealer for membrane preparation on balcony and wet area substrates",
    productType: "Primer/sealer — pre-membrane substrate preparation",
    filterTags: ["Acrylic-primer", "Water-based", "Liquid-membrane-system", "Porous-substrates", "Internal-external", "Low-VOC"],
    techChips: [
      { label: "Primer/sealer", cls: "bg-slate-100 text-slate-700" },
      { label: "Pre-membrane", cls: "bg-slate-100 text-slate-700" },
      { label: "Westox system", cls: "bg-slate-100 text-slate-700" },
      { label: "Water-based", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Westox Wesprime is a Westox primer and sealer for substrate preparation prior to membrane application in balcony and wet area waterproofing remediation. Part of the Westox waterproofing system range, Wesprime prepares the substrate to improve adhesion of the subsequently applied Westox liquid membrane. Apply by brush or roller to prepared substrates. Allow to cure as directed before membrane application. Confirm current product specification, compatible membrane systems, and application requirements with Westox Building Products before specifying.",
    technicalProperties: [
      "Primer/sealer for substrate preparation prior to Westox membrane application",
      "Improves adhesion between substrate and Westox liquid waterproofing membrane",
      "Water-based formulation — confirm from current Westox TDS",
      "For use in the Westox waterproofing membrane system — confirm compatible systems with Westox",
    ],
    limitations: [
      "Confirm compatible Westox membrane systems before specifying — system primer only",
      "Confirm current product specification and application requirements with Westox Building Products",
      "Not a substitute for the waterproofing membrane — primer preparation only",
      "Westox distribution network may be regional — confirm local availability before specifying",
    ],
    procurementSources: [
      { name: "Westox Building Products — trade supply", url: "https://www.westox.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Water-based", label: "Water-based" },
  { id: "Solvent-based", label: "Solvent-based" },
  { id: "Two-component", label: "Two-component" },
  { id: "Acrylic-primer", label: "Acrylic primer" },
  { id: "Epoxy-primer", label: "Epoxy primer / barrier" },
  { id: "Bitumen-primer", label: "Bitumen primer" },
  { id: "SBR-admixture", label: "SBR admixture" },
  { id: "Bonding-agent", label: "Bonding agent" },
  { id: "Moisture-barrier", label: "Moisture barrier" },
  { id: "Damp-green-concrete", label: "Damp / green concrete" },
  { id: "Torch-on-system", label: "Torch-on system" },
  { id: "Sheet-membrane-system", label: "Sheet membrane system" },
  { id: "Liquid-membrane-system", label: "Liquid membrane system" },
  { id: "Porous-substrates", label: "Porous substrates" },
  { id: "Internal-external", label: "Internal and external" },
  { id: "Pools-submerged", label: "Pools / submerged" },
  { id: "Flammable", label: "Flammable (solvent)" },
  { id: "Potable-water", label: "Potable water approved" },
  { id: "Low-VOC", label: "Low VOC / non-flammable" },
  { id: "Colour-indicator", label: "Colour indicator" },
  { id: "Repair-mortar-system", label: "Repair mortar system" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  type: string;
  chemistry: string;
  substrateCondition: string;
  usedBefore: string;
  solventOrWater: string;
  keyRestriction: string;
}[] = [
  {
    product: "WPM 265",
    brand: "ARDEX",
    type: "Acrylic primer",
    chemistry: "Water-based acrylic",
    substrateCondition: "Dry — porous",
    usedBefore: "ARDEX water-based liquid membranes",
    solventOrWater: "Water-based",
    keyRestriction: "Not for damp/green concrete — overcoat same day",
  },
  {
    product: "WPM 300 HydrEpoxy",
    brand: "ARDEX",
    type: "Epoxy moisture barrier / primer",
    chemistry: "Two-part water-based epoxy",
    substrateCondition: "Damp, green, or high-moisture concrete",
    usedBefore: "ARDEX liquid membranes and levelling compounds",
    solventOrWater: "Water-based",
    keyRestriction: "72hr max overcoat window — re-prime if exceeded",
  },
  {
    product: "WPM 240",
    brand: "ARDEX",
    type: "Bitumen primer",
    chemistry: "Solvent-based bitumen cut",
    substrateCondition: "Dry concrete",
    usedBefore: "ARDEX torch-on and self-adhesive bitumen sheets",
    solventOrWater: "Solvent-based",
    keyRestriction: "Flammable — ventilation required — tack-free before sheet",
  },
  {
    product: "SikaTile-010 Secure Prime",
    brand: "Sika",
    type: "Acrylic primer",
    chemistry: "Water-based acrylic crystalline",
    substrateCondition: "Dry — porous or dense",
    usedBefore: "Sika water-based membranes and tile adhesives",
    solventOrWater: "Water-based",
    keyRestriction: "System-specific — confirm with Sika for each membrane",
  },
  {
    product: "Torch Bitumen Primer",
    brand: "Tremco",
    type: "Bitumen primer",
    chemistry: "Solvent-based bitumen",
    substrateCondition: "Dry concrete",
    usedBefore: "TREMproof Torch 3000 / 4000M torch-on sheet",
    solventOrWater: "Solvent-based",
    keyRestriction: "Flammable — tack-free before sheet — Tremco system warranty requirement",
  },
  {
    product: "Nitobond SBR",
    brand: "Fosroc / Parchem",
    type: "SBR polymer admixture",
    chemistry: "SBR latex emulsion",
    substrateCondition: "Concrete / masonry",
    usedBefore: "Cement mortars, screeds, primer slurries — Nitoproof systems",
    solventOrWater: "Water-based",
    keyRestriction: "Gauged into cement — not applied neat",
  },
  {
    product: "Gripset 11Y",
    brand: "Gripset",
    type: "SBR latex admixture",
    chemistry: "SBR latex polymer",
    substrateCondition: "Concrete / masonry / bitumen",
    usedBefore: "Cement screeds, renders, mortars, Gripset membrane systems",
    solventOrWater: "Water-based",
    keyRestriction: "Gauged into cement — not applied neat",
  },
  {
    product: "Nitobond EP",
    brand: "Fosroc / Parchem",
    type: "Epoxy bonding agent",
    chemistry: "Two-part epoxy",
    substrateCondition: "Damp or permanently wet concrete",
    usedBefore: "Cementitious repair mortars over damp substrate",
    solventOrWater: "Water-based epoxy",
    keyRestriction: "Apply mortar while tacky — re-prime if dried",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Prior to all liquid-applied waterproofing membranes (PU, acrylic, cementitious) on balcony and terrace concrete substrates where the substrate is porous or absorbent",
    "Prior to torch-on and self-adhesive sheet membranes — solvent-based bitumen primer applied to concrete before modified bitumen sheet",
    "On green or high-moisture concrete slabs where standard acrylic primers are not suitable and an epoxy moisture barrier primer is required",
    "As a bonding slurry under polymer-modified screeds, renders, and repair mortars in balcony waterproofing remediation systems",
    "As SBR admixture in cementitious primer slurries and screeds to improve bond, water resistance, and durability",
    "At the concrete repair stage prior to cementitious repair mortar application on spalled, delaminated, or deteriorated balcony concrete",
  ],
  selectionCriteria: [
    "Substrate type — concrete, fibre cement, render, masonry, plywood, existing tiles — each substrate may require a different primer or primer regime — confirm with the membrane manufacturer TDS",
    "Substrate moisture content — high-moisture or green concrete requires an epoxy moisture barrier rather than a standard acrylic primer — measure substrate moisture before selecting primer type",
    "ARDEX specifies WPM 300 when moisture content exceeds 80% RH (ASTM F2170) or 15g/m²/24hrs (ASTM F1869) — this is a hard specification requirement, not a preference",
    "Open time — the period after primer application during which the membrane must be applied — most acrylic primers have an open time of 1–24 hours depending on conditions — confirm from TDS",
    "Overcoat window — some primers have a maximum overcoat time after which re-priming is required — build this into the programme",
    "Application temperature — most water-based primers cease to cure below 10°C — solvent-based bitumen primers require adequate ventilation — confirm limits from TDS",
    "Membrane system compatibility — never use a primer from a different manufacturer or system without confirming compatibility with both the primer and membrane manufacturer",
  ],
  limitations: [
    "Never omit primer — membrane applied to an unprimed substrate is a defect regardless of membrane quality — primer is not optional",
    "Never substitute a water-based acrylic primer for a solvent-based bitumen primer under torch-on or self-adhesive sheet systems — the systems are not interchangeable",
    "Never apply a membrane before the primer has reached the correct tack condition — wet primer produces poor adhesion; contaminated primer requires re-priming before membrane",
    "Do not use generic hardware-store primers — these are not tested or warranted for use under classified waterproofing membrane systems",
    "Do not assume primers are interchangeable between brands — cross-brand priming requires specific compatibility confirmation from both manufacturers",
    "SBR and epoxy bonding agents are not the same as pre-membrane primers — confirm which category of product is required for each stage of the system",
    "Do not leave primed surfaces uncovered for extended periods — contamination from rain, dust, or foot traffic requires re-priming",
  ],
  standardsNotes: [
    "Primer application is a mandatory hold point in every liquid-applied and sheet membrane waterproofing system — the waterproofing inspector must verify primer has been applied and reached correct tack condition before membrane commences",
    "AS 4858 — Wet Area Membranes — does not classify primers directly, but membrane compliance testing presupposes application per the manufacturer system including specified primer",
    "AS 4654.1 — Waterproofing Membranes for External Above-Ground Use — membrane system compliance requires installation per the manufacturer system specification including primer",
    "AS/NZS 4020 — Testing of Products for Use in Contact with Drinking Water — relevant for primers and moisture barriers in pool and potable water applications — ARDEX WPM 300 is AS 4020 compliant",
    "ITP and hold point requirements — primer application, primer tack condition, and approval to proceed to membrane are all standard hold points in the inspection and test plan for waterproofing works",
  ],
  suitableDefects: [
    "Balcony waterproofing failure — substrate preparation before new membrane installation — all liquid and sheet membrane systems require manufacturer-specified primer",
    "Wet area waterproofing failure — bathrooms, showers, laundries — primer applied to prepared substrate before new membrane",
    "Concrete spalling and repair — bonding agents and SBR admixtures used at the repair mortar stage before waterproofing membrane is applied",
    "Moisture and efflorescence problems — epoxy moisture barrier primers applied to high-moisture concrete before new floor finishes or membranes",
    "Sheet membrane replacement — solvent-based bitumen primer required on concrete before torch-on or self-adhesive bitumen sheet replacement",
  ],
  typicalSubstrates: [
    "In-situ reinforced concrete — minimum 28 days cure for standard acrylic primer — green or high-moisture concrete requires epoxy moisture barrier primer",
    "Masonry — concrete block and brick — confirm primer compatibility and application rate for porous masonry substrates",
    "Render — existing render coats must be sound before priming — confirm render porosity and primer selection",
    "Fibre cement compressed sheet — confirm primer type and application rate from the membrane manufacturer TDS",
    "Marine plywood and wet area particleboard — confirm primer compatibility — most acrylic primers are compatible but confirm from TDS",
    "Existing cured bitumen — SBR bonding agents such as Gripset 11Y are confirmed for bonding cementitious systems to cured bitumen substrates — confirm with TDS",
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

export function PrimersIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are primers and bonding agents — balcony waterproofing?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Primers and bonding agents are mandatory components of all liquid-applied, sheet membrane, and cementitious waterproofing systems. The correct primer ensures adhesion of the waterproofing membrane to the prepared substrate. Missing or incorrect primer is one of the most common causes of premature membrane delamination on balcony and terrace remediation projects.
        </p>
        {expanded && (
          <>
            <p>
              Primers are not interchangeable across membrane systems or brands. Each membrane manufacturer specifies which primer must be used on which substrate for their membrane system. Using a generic or incorrect primer, or omitting primer entirely, can void the membrane manufacturer&apos;s warranty and compromise system performance regardless of how well the membrane itself is applied.
            </p>
            <p>
              This page covers three categories of primer used in Australian balcony waterproofing:
            </p>
            <p>
              Product selection must confirm: membrane system compatibility, substrate type, substrate moisture content, open time, overcoat window, application temperature limits, and whether a single coat or multiple coats are required.
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

export function PrimersProductSection() {
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
              Selection criteria, substrate conditions, open time, overcoat windows, and critical hold points
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
              <TechCard icon={<BookOpen size={15} />} title="Standards &amp; Hold Points" items={TECH_INFO.standardsNotes} style="bullet" />
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
            <p className="mt-1 text-sm text-slate-500">8 products — 4 brands — primers and bonding agents for balcony waterproofing systems — scroll to view all</p>
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
                  <p className="whitespace-pre-line text-xs leading-6 text-slate-700">{product.systemDescription}</p>
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
            <h2 className="text-2xl font-extrabold text-sky-950">Primer and Bonding Agent System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of primers and bonding agents for balcony waterproofing systems. Confirm all product selections against the current manufacturer TDS before specifying.
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
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Chemistry</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Substrate condition</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Used before</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Solvent / water-based</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key restriction</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.chemistry}</td>
                  <td className="px-4 py-3 text-slate-600">{row.substrateCondition}</td>
                  <td className="px-4 py-3 text-slate-600">{row.usedBefore}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.solventOrWater.toLowerCase().includes("solvent") ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-red-600">
                        <XCircle size={11} /> {row.solventOrWater}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 font-semibold text-green-700">
                        <CheckCircle size={11} /> {row.solventOrWater}
                      </span>
                    )}
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
