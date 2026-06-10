"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Repointing"
  | "Lime-cement"
  | "Pre-mixed"
  | "Masonry"
  | "Mortar"
  | "Repair-mortar"
  | "Polymer-modified"
  | "Wall-tie"
  | "Stainless"
  | "304-SS"
  | "Helical"
  | "Cavity-wall"
  | "Retrofit"
  | "Chemical-anchor"
  | "Resin"
  | "Lintel"
  | "Duplex-coated"
  | "Steel"
  | "Structural"
  | "Cavity-flashing"
  | "Aluminium"
  | "DPC"
  | "Sealant"
  | "PU"
  | "Movement-joint"
  | "Silane"
  | "Water-repellent"
  | "Penetrating"
  | "Epoxy"
  | "Bonding";

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
    fullLabel: "BGC Cement",
    brandUrl: "https://www.bgc.com.au",
    accentColor: "#ef4444",
    name: "Brickies Own Repointing Mortar",
    productType: "Pre-mixed lime-cement repointing mortar",
    descriptionLine: "Pre-mixed lime-cement mortar for repointing deteriorated brick mortar joints in masonry facades",
    filterTags: ["Repointing", "Lime-cement", "Pre-mixed", "Masonry", "Mortar"],
    techChips: [
      { label: "Pre-mixed mortar", cls: "bg-sky-100 text-sky-800" },
      { label: "Lime-cement", cls: "bg-slate-100 text-slate-700" },
      { label: "Repointing", cls: "bg-amber-50 text-amber-700" },
      { label: "Masonry / brick", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "BGC Brickies Own Repointing Mortar is a pre-mixed lime-cement mortar used to repoint deteriorated mortar joints in brick masonry facades. The pre-mixed formulation ensures consistent lime-to-cement ratios across the works, reducing the variability associated with site-mixed mortars. Used in Class 2 strata facade remediation for the removal of eroded, cracked or failed mortar joints and replacement with fresh mortar to restore weathertightness and visual appearance.\n\nThe lime content provides workability and allows the mortar to accommodate minor thermal and structural movement without cracking. Repointing with a mortar of appropriate strength is essential — use of an excessively strong OPC-rich mortar in a lime-brick masonry system can cause stress concentration and spalling of the brick face. Confirm joint raking depth (minimum 15 mm) and surface preparation before application.",
    technicalProperties: [
      "Pre-mixed lime-cement formulation — consistent ratios across the works — reduces site mixing error",
      "Lime content provides workability and minor movement accommodation without cracking masonry units",
      "Suitable for repointing exposed brick facade joints in Class 2 strata remediation",
      "Available in standard mortar colours — confirm colour match to existing masonry before ordering",
      "Applied by hawk and trowel to raked joints — tooled to match existing joint profile after initial set",
    ],
    limitations: [
      "Do not use OPC-rich mortars stronger than the masonry units — stress concentration causes brick face spalling",
      "Minimum 15 mm raking depth required to provide adequate mechanical key for new mortar",
      "Do not apply in wet conditions or when frost is expected within 24 hours of application",
      "Colour match to existing mortar requires physical samples — confirm before ordering",
      "Confirm current product specification and compliance with BGC Cement before specifying",
    ],
    procurementSources: [
      { name: "BGC Cement — trade supply — contact for current pricing and availability", url: "https://www.bgc.com.au" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Masonry and building materials suppliers nationally", url: "https://www.bgc.com.au" },
    ],
  },
  {
    fullLabel: "Parchem Construction Products",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#f97316",
    name: "Renderoc MP",
    productType: "Polymer-modified masonry repair mortar",
    descriptionLine: "Polymer-modified cementitious repair mortar for masonry, brick and render repairs requiring improved bond and durability",
    filterTags: ["Repair-mortar", "Polymer-modified", "Masonry", "Mortar"],
    techChips: [
      { label: "Polymer-modified mortar", cls: "bg-sky-100 text-sky-800" },
      { label: "Cementitious", cls: "bg-slate-100 text-slate-700" },
      { label: "Repair mortar", cls: "bg-slate-100 text-slate-700" },
      { label: "Masonry / brick", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Parchem Renderoc MP is a polymer-modified cementitious repair mortar used for masonry, brick and render repairs in Class 2 strata building remediation. The polymer modification provides improved bond to the parent substrate compared to plain cementitious mortars, with enhanced durability and resistance to carbonation and chloride ingress in exposed facade environments.\n\nRenderoc MP is suitable for filling voids, repairs to spalled or damaged brickwork faces, patching render, and minor masonry section replacement. Apply in layers — confirm maximum layer thickness per Parchem TDS. Use Nitobond EP or compatible bonding agent on the substrate for improved adhesion on smooth or low-absorption surfaces.",
    technicalProperties: [
      "Polymer-modified cementitious mortar — improved bond strength to masonry and concrete substrates compared to plain cement mortar",
      "Enhanced durability — resistance to carbonation and chloride ingress in exposed facade environments",
      "Applied in layers — confirm maximum single-layer thickness with Parchem TDS before application",
      "Compatible with Parchem bonding agents including Nitobond EP for improved adhesion on low-absorption substrates",
      "Suitable for vertical and overhead application in masonry repair without excessive slump",
    ],
    limitations: [
      "Confirm maximum layer thickness per Parchem TDS — excessive single-layer application can cause slumping and cracking",
      "Substrate must be clean, free of loose material, and dampened before application — do not apply to dry or dusty surfaces",
      "Not suitable for structural section replacement where loading capacity must be maintained — consult structural engineer",
      "Colour match to existing masonry will vary — mock-up panel recommended before full application",
      "Confirm current product specification and compliance with Parchem Construction Products before specifying",
    ],
    procurementSources: [
      { name: "Parchem Construction Products — trade supply — contact for current pricing", url: "https://www.parchem.com.au" },
      { name: "Concrete and masonry repair specialists nationally", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Helifix",
    brandUrl: "https://www.helifix.com.au",
    accentColor: "#eab308",
    name: "Helifix Helibars Type 1",
    productType: "304 stainless helical cavity wall tie",
    descriptionLine: "304 stainless steel helical bar for retrofit cavity wall tie replacement and masonry reinforcement",
    filterTags: ["Wall-tie", "Stainless", "304-SS", "Helical", "Cavity-wall", "Retrofit"],
    techChips: [
      { label: "304 SS helical bar", cls: "bg-sky-100 text-sky-800" },
      { label: "Cavity wall tie", cls: "bg-slate-100 text-slate-700" },
      { label: "Retrofit", cls: "bg-amber-50 text-amber-700" },
      { label: "AS/NZS 2699", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Helifix Helibars Type 1 are 304 stainless steel helical bars used for retrofit cavity wall tie replacement and masonry crack stitching in brick veneer and cavity wall construction. Where existing mild steel wall ties have corroded and expanded — causing mortar joint cracking and brick face spalling — Helibars are installed into drilled holes in the mortar joints on either side of the cavity and fixed with resin chemical anchor to restore tie function.\n\nThe helical profile distributes load over a long bonded length and provides both tensile and compressive resistance in the cavity. Installation is carried out from the external face without requiring access to the cavity interior. Tie spacing, drilling pattern and resin selection must be confirmed by a structural engineer based on the existing wall construction and defect extent.",
    technicalProperties: [
      "304 stainless steel — corrosion-resistant — suitable for long-term exposure in cavity wall environments",
      "Helical profile — distributes load over bonded length — provides tensile and compressive resistance in the cavity",
      "Retrofit installation from external face — no requirement for cavity access or demolition",
      "Compatible with Helifix resin anchor systems for secure fixing in masonry substrates",
      "Suitable for brick veneer and cavity masonry construction — confirm applicability with structural engineer",
    ],
    limitations: [
      "Structural engineer assessment and tie pattern specification required before installation — do not install without engineering sign-off",
      "Drilling pattern and spacing must be confirmed based on existing wall construction, brick type and extent of original tie corrosion",
      "304 stainless suitable for most inland environments — confirm 316 SS requirement for marine or highly corrosive exposures",
      "Resin anchor must be compatible with the masonry substrate — confirm with Helifix technical before specifying",
      "Confirm current product specification and compliance with Helifix before specifying",
    ],
    procurementSources: [
      { name: "Helifix Australia — trade supply — contact for current pricing and technical support", url: "https://www.helifix.com.au" },
      { name: "Masonry and structural repair specialists — confirm current availability", url: "https://www.helifix.com.au" },
    ],
  },
  {
    fullLabel: "Ramset",
    brandUrl: "https://www.ramset.com.au",
    accentColor: "#22c55e",
    name: "Ramset PowerSet Chemical Anchor",
    productType: "Resin chemical anchor for masonry",
    descriptionLine: "Polyester resin-based chemical anchor for masonry wall tie and lintel fixing in concrete and brick",
    filterTags: ["Chemical-anchor", "Resin", "Masonry", "Structural", "Wall-tie"],
    techChips: [
      { label: "Polyester resin anchor", cls: "bg-sky-100 text-sky-800" },
      { label: "Chemical anchor", cls: "bg-slate-100 text-slate-700" },
      { label: "Masonry fixing", cls: "bg-slate-100 text-slate-700" },
      { label: "Wall tie / lintel", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Ramset PowerSet is a polyester resin-based chemical anchor system used for fixing wall ties, lintels, and structural anchors into concrete and brick masonry substrates. The resin is injected into a drilled hole and the anchor rod or bar is inserted before curing, creating a high-strength bond between the anchor and the parent material without mechanical expansion forces that could split the masonry.\n\nIn brickwork remediation, PowerSet is used to fix helical wall tie bars and replacement lintels into existing brickwork. The cartridge injection system allows for consistent resin volume and minimises waste. Confirm hole diameter, depth, and cleaning procedure per Ramset TDS — contamination or inadequate hole cleaning is the primary cause of chemical anchor bond failure.",
    technicalProperties: [
      "Polyester resin chemistry — high-strength bond to concrete, brick and masonry substrates",
      "Cartridge injection system — consistent resin volume — minimises waste and mixing variation",
      "No mechanical expansion forces — suitable for use in brick and hollow masonry where split risk must be avoided",
      "Fast cure time — allows reduced hold time compared to epoxy systems — confirm current TDS values",
      "Compatible with threaded rod, helical bar, and standard anchor elements",
    ],
    limitations: [
      "Hole must be clean and free of dust and moisture — inadequate hole preparation is the primary bond failure cause",
      "Not suitable for use in hollow or perforated masonry units without specialised screens — confirm with Ramset technical",
      "Temperature affects cure time — confirm working temperature range per current Ramset TDS",
      "Polyester resin — confirm suitability for continuous wet or submerged conditions before specifying",
      "Confirm current product specification and compliance with Ramset before specifying",
    ],
    procurementSources: [
      { name: "Ramset — trade supply — contact for current pricing", url: "https://www.ramset.com.au" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Trade building supplies nationally", url: "https://www.ramset.com.au" },
    ],
  },
  {
    fullLabel: "Galvatech",
    brandUrl: "https://www.galvatech.com.au",
    accentColor: "#3b82f6",
    name: "Galvatech Duplex Lintel",
    productType: "Duplex-coated steel lintel",
    descriptionLine: "Hot-dip galvanised and epoxy powder-coated steel lintel for masonry opening replacement",
    filterTags: ["Lintel", "Duplex-coated", "Steel", "Masonry", "Structural"],
    techChips: [
      { label: "Duplex-coated lintel", cls: "bg-sky-100 text-sky-800" },
      { label: "Hot-dip galvanised", cls: "bg-slate-100 text-slate-700" },
      { label: "Structural steel", cls: "bg-slate-100 text-slate-700" },
      { label: "Masonry opening", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Galvatech Duplex Lintels are hot-dip galvanised and epoxy powder-coated steel lintels for use in masonry construction. The duplex coating system — combining hot-dip galvanising with a powder-coat overcoat — provides significantly enhanced corrosion resistance compared to painted or galvanised-only sections, making them suitable for exposed and coastal masonry facade applications in Class 2 strata remediation.\n\nLintel replacement is required where existing mild steel lintels have corroded and expanded within the masonry, causing cracking above openings, brick face spalling, and mortar joint failure. Installation requires temporary propping of the masonry above the opening before the defective lintel is removed and the replacement installed. Structural engineer design is mandatory for lintel sizing, bearing length and propping requirements.",
    technicalProperties: [
      "Duplex coating — hot-dip galvanising plus epoxy powder coat — superior corrosion resistance for exposed facade environments",
      "Available in standard structural section sizes — confirm current range with Galvatech",
      "Suitable for coastal and high-exposure environments where plain galvanised sections have insufficient service life",
      "Cut-to-length availability — confirm with Galvatech for project-specific sizes",
      "Compatible with standard masonry construction details — confirm bearing length per structural engineer specification",
    ],
    limitations: [
      "Structural engineer design required for all lintel replacement — sizing, bearing and propping specification mandatory",
      "Temporary propping of masonry above opening is required before lintel removal — do not remove existing lintel without propping in place",
      "Cut ends and site-drilled holes must be treated with cold galvanising compound to restore coating continuity",
      "Confirm current section sizes and availability with Galvatech before specifying",
      "Confirm current product specification and compliance with Galvatech before specifying",
    ],
    procurementSources: [
      { name: "Galvatech — trade supply — contact for current pricing and section availability", url: "https://www.galvatech.com.au" },
      { name: "Steel and building materials suppliers nationally", url: "https://www.galvatech.com.au" },
    ],
  },
  {
    fullLabel: "Alcore",
    brandUrl: "https://www.alcore.com.au",
    accentColor: "#8b5cf6",
    name: "Alcore Cavity Flashing",
    productType: "Aluminium damp-proof cavity flashing",
    descriptionLine: "Extruded aluminium DPC cavity flashing for moisture management in masonry cavity walls",
    filterTags: ["Cavity-flashing", "Aluminium", "DPC", "Masonry", "Cavity-wall"],
    techChips: [
      { label: "Aluminium flashing", cls: "bg-sky-100 text-sky-800" },
      { label: "DPC cavity", cls: "bg-slate-100 text-slate-700" },
      { label: "Moisture management", cls: "bg-slate-100 text-slate-700" },
      { label: "Masonry cavity wall", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Alcore Cavity Flashing is an extruded aluminium damp-proof course flashing system for masonry cavity walls. The aluminium flashing is installed at the base of the cavity, above openings, and at any cavity tray location to collect and redirect moisture that penetrates the outer leaf of brickwork to weep holes at the external face, preventing moisture tracking across the cavity to the inner leaf.\n\nIn remediation works, cavity flashing replacement or installation is required where original flashings have corroded, failed or been omitted. Works typically require partial brick removal to expose the cavity and install or reinstate the flashing and weep holes. Confirm flashing profile, end dam requirements, and weep hole spacing with the building consultant or structural engineer.",
    technicalProperties: [
      "Extruded aluminium — corrosion resistant — suitable for long-term cavity wall service in masonry environments",
      "Available in standard profiles for cavity wall and over-opening flashing applications",
      "Lightweight — easier to handle and install in restricted cavity access situations than heavy gauge flashing materials",
      "Compatible with standard masonry mortar bedding — no chemical incompatibility with lime-cement mortars",
      "Suitable for use with standard weep holes to direct cavity moisture to the external face",
    ],
    limitations: [
      "Partial brick removal required to access cavity for flashing installation or replacement — confirm scope with building consultant",
      "End dams must be formed at all lateral edges to prevent moisture bypassing the flashing end",
      "Weep holes must be kept clear — blocked weep holes cause moisture to build up behind the flashing and overflow into the inner leaf",
      "Do not use aluminium flashing in direct contact with dissimilar metals without isolation — galvanic corrosion risk",
      "Confirm current product specification and compliance with Alcore before specifying",
    ],
    procurementSources: [
      { name: "Alcore — trade supply — contact for current pricing and profiles", url: "https://www.alcore.com.au" },
      { name: "Masonry and building products suppliers nationally", url: "https://www.alcore.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#ec4899",
    name: "Sikaflex-11 FC+",
    productType: "PU movement joint sealant for brickwork control joints",
    descriptionLine: "One-part moisture-curing PU sealant for movement joints and control joints in brickwork facades",
    filterTags: ["Sealant", "PU", "Movement-joint", "Masonry"],
    techChips: [
      { label: "PU sealant", cls: "bg-sky-100 text-sky-800" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Moisture-cure", cls: "bg-slate-100 text-slate-700" },
      { label: "Movement / control joint", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sikaflex-11 FC+ is a one-component moisture-curing polyurethane sealant used for movement joints and control joints in brickwork facades. In Class 2 strata brick facade remediation, movement joints are required at regular centres in long brick walls to accommodate thermal and structural movement — failure to provide or maintain these joints leads to cracking and mortar joint failure in adjacent brickwork.\n\nSikaflex-11 FC+ is applied by cartridge gun over backer rod or bond breaker tape. Available in multiple standard colours. Suitable for use at horizontal and vertical movement joints in brick facades, junction joints between brickwork and window/door frames, and at changes of plane. Confirm joint width, expected movement, and backer rod specification per Sika TDS before application.",
    technicalProperties: [
      "One-component moisture-curing polyurethane — good elongation and movement accommodation for building movement joints in brickwork",
      "Paintable after full cure — suitable for use where a painted finish over the joint is required",
      "Gun-applied from standard cartridge — toolable to smooth concave joint profile after application",
      "Available in standard colours including grey and brown — confirm current colour range with Sika",
      "Suitable for horizontal and vertical joints in brick masonry facades — confirm primer requirements per Sika TDS",
    ],
    limitations: [
      "Backer rod or bond breaker tape required to prevent three-sided adhesion — joint must be formed to correct width-to-depth ratio",
      "Joint faces must be clean, dry and free of mortar contamination — adhesion failure is the primary failure mode",
      "Do not apply to damp or frost-affected joints — confirm minimum substrate temperature per current Sika TDS",
      "Not suitable for continuous immersion without specific Sika approval — confirm for below-grade or ponding conditions",
      "Confirm current product specification and compliance with Sika Australia before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply — contact for current pricing", url: "https://aus.sika.com" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Waterproofing and sealant trade suppliers nationally", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Wattyl",
    brandUrl: "https://www.wattyl.com.au",
    accentColor: "#f59e0b",
    name: "Wattyl Silane 40",
    productType: "40% silane masonry water repellent",
    descriptionLine: "40% silane penetrating water repellent for brick, masonry and concrete facades — colourless and vapour-permeable",
    filterTags: ["Silane", "Water-repellent", "Masonry", "Penetrating"],
    techChips: [
      { label: "40% silane", cls: "bg-sky-100 text-sky-800" },
      { label: "Penetrating WR", cls: "bg-slate-100 text-slate-700" },
      { label: "Colourless", cls: "bg-slate-100 text-slate-700" },
      { label: "Vapour-permeable", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Wattyl Silane 40 is a 40% silane penetrating water repellent for brick, masonry and concrete facades. Silane penetrates into the masonry surface and reacts with silica in the substrate to form a hydrophobic lining within the surface pores — repelling liquid water while remaining vapour-permeable and allowing the masonry to breathe. The treatment is colourless and does not form a surface film, leaving the visual appearance of the brick unaltered.\n\nIn brickwork remediation, masonry water repellents are applied as a secondary protection layer after repointing and repair works are complete. They are not a substitute for adequate mortar joint integrity — water repellent cannot bridge failed joints or cracks. Confirm surface preparation, application rate, and reapplication interval per Wattyl TDS. High-concentration silane products (40%) are suitable for dense, low-absorption masonry where lower concentrations would not achieve adequate penetration depth.",
    technicalProperties: [
      "40% silane active content — high penetration depth suitable for dense brick and concrete facades with low surface absorption",
      "Colourless — no visual change to brick or masonry substrate appearance after application",
      "Vapour-permeable — allows moisture vapour to migrate from within the masonry — does not trap moisture behind the treatment",
      "Applied by low-pressure spray to clean, dry masonry — confirm coverage rate and application method per Wattyl TDS",
      "Provides hydrophobic protection without surface film formation — not subject to peeling, flaking or delamination",
    ],
    limitations: [
      "Not a substitute for mortar joint repair — does not bridge failed joints, cracks or open mortar — repoint before applying",
      "Must be applied to clean, dry and fully cured masonry — contamination or moisture in the substrate reduces penetration depth",
      "Reapplication required after the service life period — confirm current expected service life with Wattyl TDS",
      "Not suitable for use over painted surfaces — penetration will be inadequate through existing paint films",
      "Confirm current product specification and compliance with Wattyl before specifying",
    ],
    procurementSources: [
      { name: "Wattyl — trade supply — contact for current pricing and availability", url: "https://www.wattyl.com.au" },
      { name: "Dulux Trade — confirm availability of Wattyl products at trade stores", url: "https://www.dulux.com.au" },
      { name: "Painting contractors supply — confirm nationally", url: "https://www.wattyl.com.au" },
    ],
  },
  {
    fullLabel: "Parchem Construction Products",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#6366f1",
    name: "Nitobond EP",
    productType: "Epoxy bonding agent for masonry repair",
    descriptionLine: "Two-part epoxy bonding agent for improving adhesion between repair mortars and masonry substrates",
    filterTags: ["Epoxy", "Bonding", "Masonry", "Repair-mortar"],
    techChips: [
      { label: "Epoxy bonding agent", cls: "bg-sky-100 text-sky-800" },
      { label: "Two-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Substrate primer", cls: "bg-slate-100 text-slate-700" },
      { label: "Masonry repair", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Parchem Nitobond EP is a two-part epoxy bonding agent used to improve adhesion between cementitious repair mortars and masonry or concrete substrates. Applied by brush to the prepared substrate as a priming coat before the repair mortar is applied while the epoxy is still tacky, the bonding agent bridges the interface between old and new materials and significantly improves pull-off strength compared to unprimed application.\n\nIn brickwork and masonry repair, Nitobond EP is used when applying Renderoc MP or similar repair mortars to brick faces, spalled edges, and masonry voids where direct substrate bond strength may be insufficient. The two-component epoxy must be mixed in the correct ratio and applied within the pot life period. Do not allow the bonding agent to dry fully before applying the repair mortar — it must be applied to the wet or tacky epoxy.",
    technicalProperties: [
      "Two-component epoxy — high bond strength to concrete, masonry and brick substrates",
      "Applied by brush as a primer coat — significantly improves adhesion of cementitious repair mortars at the substrate interface",
      "Compatible with Parchem Renderoc MP and similar polymer-modified repair mortars in the Renderoc system",
      "Bridges old-to-new material interface — reduces risk of delamination of repair mortar from parent substrate",
      "Mixed on site in correct parts by volume — confirm ratio per current Parchem TDS before mixing",
    ],
    limitations: [
      "Repair mortar must be applied while epoxy is still wet or tacky — do not allow bonding agent to fully cure before overcoating",
      "Pot life is temperature-dependent — confirm working time at site temperature per current Parchem TDS",
      "Two-component mixing requires correct ratio — inaccurate mixing reduces bond strength and may prevent full cure",
      "Not suitable for use in conditions where the substrate will be continuously submerged without confirming with Parchem technical",
      "Confirm current product specification and compliance with Parchem Construction Products before specifying",
    ],
    procurementSources: [
      { name: "Parchem Construction Products — trade supply — contact for current pricing", url: "https://www.parchem.com.au" },
      { name: "Concrete and masonry repair specialists nationally", url: "https://www.parchem.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Repointing", label: "Repointing" },
  { id: "Lime-cement", label: "Lime-cement" },
  { id: "Pre-mixed", label: "Pre-mixed" },
  { id: "Masonry", label: "Masonry" },
  { id: "Mortar", label: "Mortar" },
  { id: "Repair-mortar", label: "Repair mortar" },
  { id: "Polymer-modified", label: "Polymer-modified" },
  { id: "Wall-tie", label: "Wall tie" },
  { id: "Stainless", label: "Stainless" },
  { id: "304-SS", label: "304 SS" },
  { id: "Helical", label: "Helical" },
  { id: "Cavity-wall", label: "Cavity wall" },
  { id: "Retrofit", label: "Retrofit" },
  { id: "Chemical-anchor", label: "Chemical anchor" },
  { id: "Resin", label: "Resin" },
  { id: "Lintel", label: "Lintel" },
  { id: "Duplex-coated", label: "Duplex-coated" },
  { id: "Steel", label: "Steel" },
  { id: "Structural", label: "Structural" },
  { id: "Cavity-flashing", label: "Cavity flashing" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "DPC", label: "DPC" },
  { id: "Sealant", label: "Sealant" },
  { id: "PU", label: "PU" },
  { id: "Movement-joint", label: "Movement joint" },
  { id: "Silane", label: "Silane" },
  { id: "Water-repellent", label: "Water-repellent" },
  { id: "Penetrating", label: "Penetrating" },
  { id: "Epoxy", label: "Epoxy" },
  { id: "Bonding", label: "Bonding" },
];

const BRAND_EQUIV: { system: string; helifix: string; ramset: string; sika: string; parchem: string; wattyl: string }[] = [
  { system: "Cavity wall tie (helical stainless)", helifix: "Helibars Type 1", ramset: "—", sika: "—", parchem: "—", wattyl: "—" },
  { system: "Chemical anchor (masonry)", helifix: "—", ramset: "PowerSet", sika: "—", parchem: "—", wattyl: "—" },
  { system: "Movement joint sealant", helifix: "—", ramset: "—", sika: "Sikaflex-11 FC+", parchem: "—", wattyl: "—" },
  { system: "Masonry repair mortar", helifix: "—", ramset: "—", sika: "—", parchem: "Renderoc MP", wattyl: "—" },
  { system: "Masonry water repellent", helifix: "—", ramset: "—", sika: "—", parchem: "—", wattyl: "Silane 40" },
];

const SYSTEM_COMPARISON: {
  product: string; brand: string; type: string; material: string; purpose: string; standard: string; primaryUse: string;
}[] = [
  {
    product: "Brickies Own Repointing Mortar",
    brand: "BGC Cement",
    type: "Repointing mortar",
    material: "Lime-cement (pre-mixed)",
    purpose: "Mortar joint replacement",
    standard: "AS 3700",
    primaryUse: "Repointing deteriorated brick mortar joints in exposed facades",
  },
  {
    product: "Renderoc MP",
    brand: "Parchem",
    type: "Repair mortar",
    material: "Polymer-modified cementitious",
    purpose: "Masonry and brick repair",
    standard: "AS 3700",
    primaryUse: "Brick face repair, render patching, void filling in masonry",
  },
  {
    product: "Helifix Helibars Type 1",
    brand: "Helifix",
    type: "Cavity wall tie",
    material: "304 stainless steel (helical)",
    purpose: "Retrofit tie replacement",
    standard: "AS/NZS 2699",
    primaryUse: "Replacement of corroded mild steel wall ties in cavity masonry",
  },
  {
    product: "Ramset PowerSet Chemical Anchor",
    brand: "Ramset",
    type: "Chemical anchor",
    material: "Polyester resin",
    purpose: "Anchor fixing in masonry",
    standard: "AS 3700",
    primaryUse: "Fixing wall ties and lintels into brick and concrete substrates",
  },
  {
    product: "Galvatech Duplex Lintel",
    brand: "Galvatech",
    type: "Structural lintel",
    material: "Duplex-coated steel",
    purpose: "Lintel replacement",
    standard: "AS 3700",
    primaryUse: "Replacement of corroded steel lintels above masonry openings",
  },
  {
    product: "Alcore Cavity Flashing",
    brand: "Alcore",
    type: "DPC flashing",
    material: "Extruded aluminium",
    purpose: "Moisture management",
    standard: "AS 3700",
    primaryUse: "Cavity flashing for moisture control in masonry cavity walls",
  },
  {
    product: "Sikaflex-11 FC+",
    brand: "Sika",
    type: "Movement joint sealant",
    material: "PU (moisture-cure, 1C)",
    purpose: "Control joint sealing",
    standard: "AS 3700",
    primaryUse: "Movement and control joints in brick facade panels",
  },
  {
    product: "Wattyl Silane 40",
    brand: "Wattyl",
    type: "Water repellent",
    material: "40% silane",
    purpose: "Surface water repellency",
    standard: "AS 3700",
    primaryUse: "Penetrating water repellent treatment for brick and masonry facades",
  },
  {
    product: "Nitobond EP",
    brand: "Parchem",
    type: "Bonding agent",
    material: "Two-part epoxy",
    purpose: "Adhesion primer for repair mortars",
    standard: "AS 3700",
    primaryUse: "Priming masonry substrate before repair mortar application",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Raking and repointing of deteriorated mortar joints in exposed brick masonry facades of Class 2 strata buildings",
    "Retrofit replacement of corroded mild steel cavity wall ties with stainless helical bar ties from the external face",
    "Replacement of corroded or structurally inadequate steel lintels above door and window openings in brick facades",
    "Installation of cavity flashings and weep holes to manage moisture in masonry cavity wall construction",
    "Application of penetrating silane water repellent to brick and masonry facades after repointing works",
  ],
  selectionCriteria: [
    "Select repointing mortar strength to match existing masonry — mortar stronger than the brick units will cause spalling and cracking",
    "Structural engineer assessment is mandatory for wall tie replacement — tie pattern, density and fixing specification must be engineered",
    "Lintel replacement requires engineering design — section size, bearing length and propping must be confirmed before work commences",
    "Apply bonding agent before repair mortars on smooth or low-absorption substrates to ensure adequate pull-off strength",
    "Apply water repellent only after all repointing and repair works are complete and fully cured",
  ],
  limitations: [
    "Repointing cannot restore structural capacity in masonry with failed wall ties or structural cracks — structural assessment required first",
    "Water repellent is not a substitute for mortar joint integrity — failed or open joints must be repointed before water repellent application",
    "Wall tie replacement is a specialist operation — requires structural engineer involvement and experienced masonry remediation contractor",
    "Cavity flashing replacement requires partial brick removal — extent of works must be confirmed by building consultant",
    "Chemical anchors are sensitive to hole preparation — inadequate cleaning is the primary cause of anchor bond failure in masonry",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — governs structural requirements for brickwork, mortar, ties, lintels and movement joints in masonry construction",
    "AS/NZS 2699 — Built-in Components for Masonry Construction — specifies requirements for wall ties including corrosion resistance class",
    "AS 3700 specifies movement joint centres in masonry walls — confirm joint spacing with building consultant or structural engineer",
    "Repointing mortar type and strength class must be specified to match the existing masonry system — refer to AS 3700 mortar designation tables",
  ],
  suitableDefects: [
    "Eroded, cracked or failed mortar joints in brick masonry facades allowing water penetration",
    "Corroded original mild steel cavity wall ties causing mortar joint cracking and brick face spalling",
    "Corroded or structurally inadequate steel lintels above masonry openings causing cracking above doors and windows",
    "Failed or absent cavity flashings allowing moisture tracking across the wall cavity to the inner leaf",
    "Unprotected brick facades experiencing water penetration through the face of the masonry units",
  ],
  typicalSubstrates: [
    "Face brick — clay or concrete — external leaf of cavity wall or solid brick veneer construction",
    "Concrete masonry — blockwork — inner leaf of cavity wall construction",
    "Mortar joints — existing lime-cement or OPC mortar — raked and repointed",
    "Steel lintels — existing mild steel or galvanised lintels — replaced with duplex-coated sections",
    "Cavity wall construction — brick outer leaf, cavity with ties, inner leaf — typical Class 2 strata facade construction",
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

export function BrickworkIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are brickwork deterioration repair systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Brickwork deterioration in Class 2 strata facades encompasses a range of defects including eroded and failed mortar joints, corroded and failed wall ties in cavity masonry construction, failed or corroded steel lintels above openings, absent or failed cavity flashings, and unprotected brick faces subject to water penetration. Each defect type requires a different remediation approach and often a different product system — repointing mortars alone cannot address structural tie failure or lintel corrosion.
        </p>
        <p>
          The most serious brickwork defect in Class 2 strata buildings is cavity wall tie failure. Original mild steel ties corrode over time — particularly in coastal environments — and as they corrode they expand, cracking mortar joints and eventually causing brick face spalling. Failed ties also reduce the structural connection between the inner and outer leaves of the wall, which is a structural safety issue. Wall tie replacement requires a structural engineer assessment and is carried out by installing stainless steel helical bars from the external face using resin chemical anchors. Repointing of the cracked mortar joints follows the tie replacement works.
        </p>
        <p>
          Brickwork remediation in strata buildings requires a staged approach: structural defects including failed ties and failed lintels must be addressed first, followed by repointing, repair mortar works, cavity flashing and movement joint sealing, and finally surface water repellent application. Applying water repellent or sealants before structural repairs are complete is ineffective and can mask ongoing defects.
        </p>
        <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
          <p className="mb-2 text-xs font-bold text-slate-700">Do not confuse brickwork repair systems with:</p>
          <ul className="space-y-1.5">
            {[
              "Crack injection for concrete — epoxy or polyurethane resin injection for concrete cracks, not masonry mortar repair",
              "Surface sealers only — cosmetic water-repellent treatments do not address structural tie replacement or failed mortar joints",
              "Rising damp injection — damp-proof course injection systems address moisture rising from the ground, not cavity wall moisture management",
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

export function BrickworkProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">9 products — 7 brands — brickwork repair, repointing and structural systems — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side technical comparison of brickwork repair products for masonry facade remediation. Confirm current product specifications with manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Purpose</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Standard</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600">{row.purpose}</td>
                  <td className="px-4 py-3 text-slate-600">{row.standard}</td>
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
            <p className="mt-1 text-sm text-slate-500">Brickwork repair system equivalents across brands active in Australian Class 2 strata facade remediation.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#eab308" }}>Helifix</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#22c55e" }}>Ramset</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#ec4899" }}>Sika</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#f97316" }}>Parchem</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#f59e0b" }}>Wattyl</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.helifix, row.ramset, row.sika, row.parchem, row.wattyl].map((val, j) => (
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
          <h3 className="text-base font-extrabold text-amber-900">Structural assessment before repair</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Cavity wall tie failure and masonry crack repair require structural engineer assessment before specifying remediation — do not repoint or apply water repellent over defects without first confirming whether structural tie failure is present",
            "Corroded wall ties expand as they corrode — the corrosion process can be significantly more advanced than visible mortar joint cracking suggests — a progressive survey is required to establish the full extent of tie failure across the facade",
            "Lintel replacement is a structural operation requiring propping of the masonry above the opening before the defective lintel is removed — unpropped lintel removal risks partial wall collapse",
            "Repointing and cosmetic repair of brickwork facades will not resolve structural defects — structural works must precede cosmetic remediation in all cases",
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
