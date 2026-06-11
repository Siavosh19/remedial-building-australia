"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Woven-polyester"
  | "Junction-reinforcement"
  | "ARDEX-membrane-compatible"
  | "190mm-wide"
  | "Mandatory-junctions"
  | "Internal-external-corners"
  | "Wall-to-floor"
  | "Liquid-applied-membrane"
  | "Penetration-reinforcement"
  | "Fibreglass-mesh"
  | "Alkali-resistant"
  | "Mapei-membrane-compatible"
  | "150gsm"
  | "4x4-5mm-mesh"
  | "Cementitious-membrane"
  | "Balcony-and-terrace"
  | "1m-wide-roll"
  | "Non-woven-polyester"
  | "Self-adhesive"
  | "Bandage-tape"
  | "Pre-formed"
  | "Fast-application"
  | "Polyester-bandage"
  | "Junction-tape"
  | "Pre-formed-cove"
  | "Corner-detail"
  | "Drain-flashing"
  | "Mapelastic-systems";

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
    tdsUrl: "https://ardexaustralia.com/product/ardex-deckweb/",
    accentColor: "#f97316",
    name: "ARDEX Deckweb",
    descriptionLine: "Woven polyester reinforcement cloth — 190mm wide — embedded at all junctions, corners, coves, and penetrations in ARDEX liquid-applied membrane systems — mandatory at all internal and external angles and changes of plane",
    productType: "Woven polyester reinforcement cloth — ARDEX liquid-applied membrane systems",
    filterTags: ["Woven-polyester", "Junction-reinforcement", "ARDEX-membrane-compatible", "190mm-wide", "Mandatory-junctions", "Internal-external-corners", "Wall-to-floor", "Liquid-applied-membrane", "Penetration-reinforcement"],
    techChips: [
      { label: "Woven polyester", cls: "bg-orange-100 text-orange-800" },
      { label: "190mm wide", cls: "bg-slate-100 text-slate-700" },
      { label: "ARDEX systems only", cls: "bg-green-50 text-green-700" },
      { label: "Embedded between coats", cls: "bg-slate-100 text-slate-700" },
      { label: "Mandatory at all junctions", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "ARDEX Deckweb is ARDEX Australia's woven polyester reinforcement cloth, used as mandatory junction reinforcement in ARDEX liquid-applied membrane systems on balconies, terraces, and wet areas. It is specified at all internal and external corners, wall-to-floor junctions, cove details, construction joints, cracks, and around all penetrations — wherever the substrate geometry creates a stress concentration that could cause the liquid membrane to crack or split without reinforcement.\n\nThe 190mm width is the ARDEX-specified width for junction reinforcement — confirmed in ARDEX Technical Bulletin TB006 and ARDEX system specifications. At a typical wall-to-floor junction, the Deckweb is centred on the junction and extends minimum 100mm onto the floor and minimum 90mm up the wall. The fabric is embedded between the first and second coats of ARDEX liquid membrane, pressed into the wet first coat until the fabric is fully saturated, then overcoated with the second coat to fully encapsulate the fabric.\n\nARDEX Deckweb is confirmed for use with ARDEX WPM 300 series, ARDEX WPM 7000, ARDEX WPM 7015, and other ARDEX liquid-applied membrane systems — confirm the current ARDEX system specification for the specific membrane being applied before specifying.",
    technicalProperties: [
      "Woven polyester reinforcement cloth — compatible with ARDEX liquid-applied membrane systems",
      "190mm wide — ARDEX-specified junction reinforcement width",
      "Embedded between first and second membrane coats — fully encapsulated",
      "Mandatory at all internal and external corners, wall-to-floor junctions, construction joints, cracks, and around all penetrations",
      "Available from ARDEX Australia and trade stockists",
    ],
    limitations: [
      "ARDEX membrane systems only — do not use ARDEX Deckweb as junction reinforcement in Mapei or other brand membrane systems without cross-brand compatibility confirmation",
      "Fabric must be fully saturated by the first coat before the second coat is applied — dry fabric edges or air pockets indicate incorrect installation",
      "190mm width is the minimum ARDEX-specified width — do not cut narrower at junctions",
      "Confirm current product specification and width with ARDEX Australia before specifying",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply", url: "https://www.ardex.com.au" },
      { name: "TradieCart", url: "https://www.tradiecart.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
      { name: "MJS Floorcoverings", url: "https://mjsfloorcoverings.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions/products/detail/mapenet-150",
    accentColor: "#0369a1",
    name: "Mapei Mapenet 150",
    descriptionLine: "Alkali-resistant fibreglass reinforcing mesh — 150 g/m² — embedded in Mapei cementitious flexible membrane systems at junctions, corners, and penetrations — 1m wide roll, cut to required width — mandatory junction reinforcement",
    productType: "Alkali-resistant fibreglass mesh — 150 g/m² — Mapei cementitious membrane systems",
    filterTags: ["Fibreglass-mesh", "Alkali-resistant", "Junction-reinforcement", "Mapei-membrane-compatible", "150gsm", "4x4-5mm-mesh", "Cementitious-membrane", "Balcony-and-terrace", "1m-wide-roll"],
    techChips: [
      { label: "Alkali-resistant fibreglass mesh", cls: "bg-sky-100 text-sky-800" },
      { label: "150 g/m² — 4×4.5mm mesh", cls: "bg-slate-100 text-slate-700" },
      { label: "Mapei cementitious systems", cls: "bg-green-50 text-green-700" },
      { label: "1m wide × 50m roll", cls: "bg-slate-100 text-slate-700" },
      { label: "Embedded between membrane coats", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Mapei Mapenet 150 is an alkali-resistant fibreglass reinforcing mesh used as mandatory junction reinforcement in Mapei cementitious flexible membrane systems — including Mapelastic, Mapelastic Foundation, Mapelastic Smart, and Mapelastic AquaDefense. The mesh is embedded in the wet membrane coat at all internal and external corners, wall-to-floor junctions, construction joints, cracks, and around all penetrations, reinforcing the membrane layer at stress concentration points.\n\nAlkali-resistant fibreglass is specified for use with cementitious membrane systems because standard glass fibre degrades in the alkaline environment of cement-based products — Mapenet 150 is treated to resist alkali attack and maintain its reinforcing performance within the cured cementitious membrane layer. The 150 g/m² weight and 4×4.5mm mesh size are specified by Mapei to provide adequate reinforcement without preventing membrane penetration through the mesh apertures.\n\nSupplied in 1m wide, 50m long rolls — cut to the required width for the junction being reinforced. Embedded between membrane coats — first coat applied, mesh pressed into wet coat and allowed to saturate through, second coat applied to fully encapsulate. Confirm the current Mapei system specification for the specific membrane being applied before specifying.",
    technicalProperties: [
      "Alkali-resistant fibreglass mesh — 150 g/m² ± 5% — 4×4.5mm mesh size",
      "Blue colour — confirms alkali-resistant treatment",
      "1m wide × 50m long rolls — cut to required junction width",
      "Embedded between membrane coats — fully encapsulated in the cured cementitious membrane",
      "Compatible with Mapei cementitious flexible membrane systems — Mapelastic, Mapelastic Foundation, Mapelastic Smart, Mapelastic AquaDefense",
      "Mandatory junction reinforcement at all angles, changes of plane, and penetrations",
    ],
    limitations: [
      "Mapei cementitious membrane systems — confirm compatibility with Mapei PU or hybrid liquid-applied membrane systems with Mapei technical before using Mapenet 150 in non-cementitious Mapei systems",
      "Do not use standard fibreglass mesh (non-alkali-resistant) with cementitious membrane systems — standard glass fibre will degrade in the alkaline environment",
      "Mesh must be fully saturated by the first membrane coat before the second coat is applied — confirm with Mapei technical if using with thicker-viscosity cementitious membranes",
      "Confirm current product specification, roll dimensions, and pricing with Mapei Australia before specifying",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply", url: "https://www.mapei.com/au" },
      { name: "TradieCart", url: "https://www.tradiecart.com.au" },
      { name: "Bayset", url: "https://www.bayset.com.au" },
      { name: "Kevmor", url: "https://kevmor.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions/products/detail/mapetex-sel",
    accentColor: "#0369a1",
    name: "Mapei Mapetex Sel",
    descriptionLine: "Non-woven macro-holed polypropylene reinforcing fabric — 80 g/m² — 1 m wide × 25 m rolls — embedded in Mapei liquid-applied and cementitious membrane systems at junctions and corners — alternative to Mapenet 150 for specific Mapei membrane applications — confirm system specification before use",
    productType: "Non-woven macro-holed polypropylene reinforcing fabric — Mapei membrane systems",
    filterTags: ["Non-woven-polyester", "Junction-reinforcement", "Mapei-membrane-compatible", "Mapelastic-systems", "Internal-external-corners", "Wall-to-floor", "Penetration-reinforcement", "Liquid-applied-membrane"],
    techChips: [
      { label: "Non-woven polypropylene", cls: "bg-sky-100 text-sky-800" },
      { label: "80 g/m² — macro-holed", cls: "bg-slate-100 text-slate-700" },
      { label: "1 m × 25 m roll", cls: "bg-green-50 text-green-700" },
      { label: "Alternative to Mapenet 150 for specific systems", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Mapei Mapetex Sel is a non-woven macro-holed polypropylene reinforcing fabric (not polyester) used as junction reinforcement in specific Mapei waterproofing membrane systems. It is supplied in 1 m wide × 25 m long rolls and weighs 80 g/m². It is referenced alongside Mapenet 150 in Mapei system specifications — for example, Mapelastic Smart is specified with either Mapetex Sel or Mapenet 150 depending on the application detail and system being used. Non-woven polypropylene fabric provides a different reinforcement profile to fibreglass mesh — it absorbs membrane into its fibre structure through macro holes rather than relying on mesh apertures for membrane penetration.\n\nConfirm with the current Mapei system specification and with Mapei technical which reinforcing fabric — Mapenet 150 or Mapetex Sel — is specified for the specific Mapei membrane being applied on the project before specifying. Do not substitute one fabric for the other without confirmation from Mapei technical.",
    technicalProperties: [
      "Non-woven macro-holed polypropylene reinforcing fabric — 80 g/m² — 0.6 mm thickness",
      "1 m wide × 25 m long rolls — cut to required junction width",
      "Compatible with Mapei liquid-applied and cementitious membrane systems — confirm specific membrane with Mapei technical",
      "Used at junctions, corners, and around penetrations — embedded between membrane coats",
      "Referenced in Mapelastic Smart and other Mapei system specifications as an alternative to Mapenet 150 for specific applications",
    ],
    limitations: [
      "Confirm with Mapei Australia which reinforcing fabric (Mapenet 150 or Mapetex Sel) is specified for the specific membrane system being applied — do not assume they are interchangeable",
      "Confirm current product availability and specification with Mapei Australia before specifying",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply", url: "https://www.mapei.com/au" },
      { name: "Bayset", url: "https://www.bayset.com.au" },
      { name: "Kevmor", url: "https://kevmor.com.au" },
    ],
  },
  {
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://www.ardex.com.au",
    accentColor: "#f97316",
    name: "ARDEX Deckweb — Self-Adhesive Bandage Tape Format",
    descriptionLine: "Self-adhesive woven polyester bandage tape — pre-applied to substrate at junctions before membrane application — ARDEX membrane system compatible — speeds junction reinforcement on complex or repetitive junction details",
    productType: "Self-adhesive woven polyester bandage tape — ARDEX membrane systems",
    filterTags: ["Self-adhesive", "Bandage-tape", "Woven-polyester", "Junction-reinforcement", "ARDEX-membrane-compatible", "Pre-formed", "Internal-external-corners", "Wall-to-floor", "Fast-application"],
    techChips: [
      { label: "Self-adhesive bandage tape", cls: "bg-orange-100 text-orange-800" },
      { label: "Woven polyester", cls: "bg-slate-100 text-slate-700" },
      { label: "Pre-applied to substrate", cls: "bg-green-50 text-green-700" },
      { label: "ARDEX systems — confirm approved application", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "In addition to the standard roll-form Deckweb embedded between membrane coats, ARDEX also produces self-adhesive bandage tape formats for junction reinforcement. Self-adhesive bandage tape is applied directly to the prepared substrate at the junction before membrane application begins — the tape adheres to the substrate and provides a pre-positioned reinforcing layer that the membrane is then applied over in a single continuous operation, rather than requiring the embed-between-coats method of standard fabric reinforcement.\n\nSelf-adhesive junction tape formats are used where the junction geometry, project programme, or applicator preference makes pre-applied reinforcement more practical than the embed method. They are particularly useful on projects with a large number of repetitive junction details — threshold angles, column bases, drain surrounds — where the pre-application of tape before membrane application speeds the overall process.\n\nConfirm with ARDEX technical that the self-adhesive bandage tape format is an approved alternative to standard embedded Deckweb for the specific membrane system and junction type before specifying. Not all ARDEX membrane systems approve the self-adhesive pre-applied method as a substitute for embedded reinforcement at all junction types.",
    technicalProperties: [
      "Self-adhesive woven polyester bandage tape — pre-applied to substrate before membrane application",
      "Compatible with ARDEX liquid-applied membrane systems — confirm specific membrane with ARDEX technical",
      "Applied directly to prepared substrate at junction — membrane applied over the top",
      "Speeds junction reinforcement on complex or repetitive details",
      "Available in various widths — confirm available widths with ARDEX Australia",
    ],
    limitations: [
      "Confirm with ARDEX technical that self-adhesive pre-applied format is an approved method for the specific membrane system and junction type — not universally interchangeable with embedded Deckweb",
      "Substrate must be clean, primed, and sound for the self-adhesive backing to bond correctly",
      "Confirm current product availability, widths, and pricing with ARDEX Australia before specifying",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply", url: "https://www.ardex.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions/products/detail/mapeband",
    accentColor: "#0369a1",
    name: "Mapei Mapeband — Fabric Corner and Junction Tape",
    descriptionLine: "Rubber-coated polyester junction and corner bandage tape — cove roll and drain flashing formats — compatible with Mapei Mapelastic membrane systems — pre-formed to suit standard junction geometries — speeds corner and drain detail application",
    productType: "Rubber-coated polyester bandage tape — cove and drain formats — Mapei Mapelastic systems",
    filterTags: ["Polyester-bandage", "Junction-tape", "Mapei-membrane-compatible", "Pre-formed-cove", "Corner-detail", "Drain-flashing", "Self-adhesive", "Fast-application", "Mapelastic-systems"],
    techChips: [
      { label: "Rubber-coated polyester bandage", cls: "bg-sky-100 text-sky-800" },
      { label: "Cove roll + drain flashing formats", cls: "bg-slate-100 text-slate-700" },
      { label: "Mapei Mapelastic systems", cls: "bg-green-50 text-green-700" },
      { label: "Pre-formed cove — no mortar fillet needed", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Mapei Mapeband is a rubber-coated polyester fabric bandage tape available in cove roll and drain flashing formats, designed for fast application at standard junction details in Mapei Mapelastic waterproofing system applications. The cove roll format provides a pre-formed concave profile for wall-to-floor junctions, eliminating the need to form a cove fillet in mortar before membrane application. The drain flashing format provides a pre-cut circular or square flashing detail for drain surrounds and puddle flange perimeters.\n\nIn balcony waterproofing remediation, Mapeband is used as a system-specific junction reinforcement accessory within Mapei Mapelastic system specifications. It is applied to the prepared substrate at junctions before membrane application and provides a combined cove and reinforcement function at the wall-to-floor detail. It is not a substitute for full Mapenet 150 or Mapetex Sel reinforcement at all junction types — confirm with the current Mapei system specification which junction details require Mapeband and which require embedded mesh reinforcement.",
    technicalProperties: [
      "Rubber-coated polyester fabric bandage tape — cove roll and drain flashing formats",
      "Cove roll: pre-formed concave profile for wall-to-floor junctions — eliminates mortar cove fillet",
      "Drain flashing: pre-cut flashing detail for drain and puddle flange surrounds",
      "Compatible with Mapei Mapelastic system specifications",
      "Applied to prepared substrate before membrane application",
    ],
    limitations: [
      "Mapei Mapelastic system only — confirm compatibility with other Mapei membrane systems with Mapei technical before specifying",
      "Not a universal substitute for full Mapenet 150 or Mapetex Sel reinforcement at all junction types — confirm which junction details require Mapeband and which require embedded mesh",
      "Confirm current product availability, formats, and sizing with Mapei Australia before specifying",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply", url: "https://www.mapei.com/au" },
      { name: "Bayset", url: "https://www.bayset.com.au" },
      { name: "Kevmor", url: "https://kevmor.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
  },
  {
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://www.ardex.com.au",
    accentColor: "#f97316",
    name: "ARDEX UD 158 Seam Reinforcement Mesh Tape",
    descriptionLine: "ARDEX self-adhesive reinforcing mesh tape for membrane seam reinforcement at junctions and transitions",
    productType: "Self-adhesive reinforcing mesh tape — membrane seam reinforcement",
    filterTags: ["Self-adhesive", "Junction-reinforcement", "Wall-to-floor", "Internal-external-corners", "ARDEX-membrane-compatible"],
    techChips: [
      { label: "Self-adhesive mesh tape", cls: "bg-orange-100 text-orange-800" },
      { label: "ARDEX system", cls: "bg-slate-100 text-slate-700" },
      { label: "Seam reinforcement", cls: "bg-slate-100 text-slate-700" },
      { label: "Junction and transition", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "ARDEX UD 158 is a self-adhesive reinforcing mesh tape for membrane seam reinforcement at junctions, corners and transitions in ARDEX waterproofing systems. It is designed for use within the ARDEX waterproofing system — applied directly to prepared substrates at internal and external corners, wall-to-floor junctions, drain surrounds and other transitions before membrane application. The self-adhesive format allows fast, precise placement without mortar fillet preparation. Embed the tape into the wet first coat of membrane and ensure the full membrane DFT is achieved over the tape in subsequent coats. Confirm current product specification and compatible ARDEX membrane systems with ARDEX Australia before specifying.",
    technicalProperties: [
      "Self-adhesive reinforcing mesh tape — for junction reinforcement at membrane transitions",
      "Suitable for internal and external corners, wall-to-floor junctions, drain surrounds and penetrations",
      "For use within ARDEX waterproofing systems — confirm compatible membranes with ARDEX technical",
      "Apply to prepared substrate before membrane application — ensure full membrane DFT is achieved over tape",
    ],
    limitations: [
      "ARDEX system only — confirm compatibility with the specific ARDEX membrane being used",
      "Not a substitute for full membrane DFT at junctions — full membrane film thickness must still be achieved over the tape",
      "Confirm current product name and specification with ARDEX Australia before specifying",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply — contact for current pricing", url: "https://www.ardex.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Woven-polyester", label: "Woven polyester" },
  { id: "Non-woven-polyester", label: "Non-woven polyester" },
  { id: "Fibreglass-mesh", label: "Fibreglass mesh" },
  { id: "Alkali-resistant", label: "Alkali-resistant" },
  { id: "Junction-reinforcement", label: "Junction reinforcement" },
  { id: "Mandatory-junctions", label: "Mandatory junctions" },
  { id: "Internal-external-corners", label: "Internal and external corners" },
  { id: "Wall-to-floor", label: "Wall-to-floor" },
  { id: "Penetration-reinforcement", label: "Penetration reinforcement" },
  { id: "ARDEX-membrane-compatible", label: "ARDEX membrane compatible" },
  { id: "Mapei-membrane-compatible", label: "Mapei membrane compatible" },
  { id: "Liquid-applied-membrane", label: "Liquid-applied membrane" },
  { id: "Cementitious-membrane", label: "Cementitious membrane" },
  { id: "Mapelastic-systems", label: "Mapelastic systems" },
  { id: "190mm-wide", label: "190mm wide" },
  { id: "1m-wide-roll", label: "1m wide roll" },
  { id: "Self-adhesive", label: "Self-adhesive" },
  { id: "Bandage-tape", label: "Bandage tape" },
  { id: "Pre-formed", label: "Pre-formed" },
  { id: "Pre-formed-cove", label: "Pre-formed cove" },
  { id: "Drain-flashing", label: "Drain flashing" },
  { id: "Fast-application", label: "Fast application" },
  { id: "Balcony-and-terrace", label: "Balcony and terrace" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  material: string;
  membraneSystem: string;
  applicationMethod: string;
  widthFormat: string;
  keyRestriction: string;
}[] = [
  {
    product: "ARDEX Deckweb",
    brand: "ARDEX Australia",
    material: "Woven polyester",
    membraneSystem: "ARDEX liquid-applied membrane systems",
    applicationMethod: "Embedded between first and second membrane coats",
    widthFormat: "190mm wide — roll",
    keyRestriction: "ARDEX systems only — do not substitute in Mapei systems without confirmation — minimum 190mm width — full saturation required before second coat",
  },
  {
    product: "Mapei Mapenet 150",
    brand: "Mapei Australia",
    material: "Alkali-resistant fibreglass mesh — 150 g/m²",
    membraneSystem: "Mapei cementitious flexible membrane systems — Mapelastic, Mapelastic Foundation, Mapelastic Smart",
    applicationMethod: "Embedded between membrane coats",
    widthFormat: "1m wide roll — cut to required width",
    keyRestriction: "Alkali-resistant grade essential for cementitious systems — do not use standard fibreglass mesh — confirm whether Mapenet 150 or Mapetex Sel is specified for the specific membrane",
  },
  {
    product: "Mapei Mapetex Sel",
    brand: "Mapei Australia",
    material: "Non-woven macro-holed polypropylene — 80 g/m²",
    membraneSystem: "Mapei liquid-applied and cementitious systems — confirm specific membrane",
    applicationMethod: "Embedded between membrane coats",
    widthFormat: "1 m wide × 25 m long roll — cut to required width",
    keyRestriction: "Confirm with Mapei technical which fabric is specified — not universally interchangeable with Mapenet 150",
  },
  {
    product: "ARDEX Deckweb — Self-Adhesive Bandage",
    brand: "ARDEX Australia",
    material: "Self-adhesive woven polyester",
    membraneSystem: "ARDEX liquid-applied membrane systems",
    applicationMethod: "Pre-applied to substrate before membrane application",
    widthFormat: "Various widths — confirm with ARDEX",
    keyRestriction: "Confirm with ARDEX technical that pre-applied format is approved for the specific membrane and junction type",
  },
  {
    product: "Mapei Mapeband",
    brand: "Mapei Australia",
    material: "Rubber-coated polyester — cove and drain formats",
    membraneSystem: "Mapei Mapelastic systems",
    applicationMethod: "Applied to substrate before membrane — pre-formed cove or drain profile",
    widthFormat: "Cove roll and drain flashing pre-formed formats",
    keyRestriction: "Mapelastic system — confirm which junctions require Mapeband vs embedded Mapenet 150 or Mapetex Sel",
  },
];

const TECH_INFO = {
  mandatoryLocations: [
    "All internal corners — floor-to-wall, wall-to-wall",
    "All external corners",
    "All wall-to-floor junctions (cove or fillet)",
    "All construction joints and control joints in the substrate",
    "All cracks in the concrete substrate (confirm crack repair sequence before reinforcing)",
    "Around all pipe penetrations — minimum 100mm onto the horizontal surface and 50mm up the pipe",
    "Around all puddle flange and floor waste perimeters",
    "At all changes of plane — steps, rebates, upstands, threshold details",
  ],
  fabricWidth: [
    "ARDEX specifies ARDEX Deckweb at 190mm wide for junction reinforcement",
    "Mapei specifies Mapenet 150 at 1m wide roll — cut to the required width for the junction",
    "Minimum width at any junction is typically 200mm — 100mm onto each face of the junction",
    "Confirm the required width with the membrane manufacturer's system specification",
  ],
  installationMethod: [
    "Step 1 — Apply first coat of liquid membrane to the junction area — extend minimum 100mm onto each face",
    "Step 2 — While the first coat is still wet, press the reinforcing fabric into the wet membrane — work from centre outward to eliminate air pockets",
    "Step 3 — Allow the first coat to penetrate through the fabric — the fabric must be fully wet through from the underside before the second coat is applied",
    "Step 4 — Apply second coat of membrane over the fully saturated fabric — fully encapsulate the fabric with no dry edges or exposed fabric threads",
    "Step 5 — Allow to cure before applying field membrane coats",
  ],
  fabricTypeBySystem: [
    "Woven polyester fabric (ARDEX Deckweb) — for use with ARDEX liquid-applied membrane systems — embedded at junctions and corners",
    "Fibreglass mesh (Mapei Mapenet 150) — for use with Mapei cementitious flexible membrane systems — alkali-resistant fibreglass — embedded in the wet membrane coat",
    "Non-woven polyester fabric (Mapei Mapetex Sel) — for use with some Mapei liquid-applied and cementitious systems — confirm with membrane manufacturer",
    "Self-adhesive bandage tape — pre-formed self-adhesive fabric strips for junction reinforcement — applied directly to substrate before membrane application — confirm compatibility with membrane system",
  ],
  fabricNotMembrane: [
    "Reinforcing fabric embedded in liquid-applied membrane is not a waterproofing product on its own",
    "The membrane coats above and below the fabric are the waterproofing layer — the fabric reinforces the membrane at the junction",
    "Full membrane dry film thickness must still be achieved at the junction detail above the fabric layer",
    "An applicator who applies only one coat of membrane over embedded fabric on the assumption that the fabric itself provides waterproofing has produced a non-compliant undersized membrane at the most critical location in the system",
  ],
  standardsNotes: [
    "AS 3740:2021 requires that liquid-applied membranes be reinforced at all internal and external angles, changes of plane, and at pipe penetrations",
    "Junction reinforcement is a compliance requirement — not a recommended best practice",
    "On remediation projects, junction reinforcement must be inspected before the field membrane coats are applied over it",
    "NCC Volume One — performance requirements for waterproofing in Class 2 buildings — membrane installation must comply with AS 3740",
    "Membrane manufacturer system specifications — confirm hold points and inspection requirements for junction reinforcement with the manufacturer before commencing works",
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

export function ReinforcingFabricIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are reinforcing fabric and mesh — waterproofing?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Reinforcing fabric and mesh are materials embedded into the wet waterproofing membrane at junctions, corners, changes of plane, cracks, and around penetrations during membrane application. Their function is to build membrane thickness and continuity at locations where the substrate geometry creates stress concentrations — internal and external corners, wall-to-floor junctions, construction joints, and pipe and drain penetrations. At these locations, a single coat of liquid-applied membrane is insufficient without reinforcement — the fabric or mesh carries the membrane across the junction and prevents cracking, splitting, and delamination under the thermal movement and substrate deflection that all external balcony and terrace slabs experience.
        </p>
        {expanded && (
          <>
            <p>
              In liquid-applied membrane systems, the reinforcing fabric is embedded between coats — a first coat of membrane is applied to the junction, the fabric is pressed into the wet membrane so it is fully saturated from below, and a second coat is applied over the top to fully encapsulate the fabric. The result is a reinforced membrane layer at the junction that is significantly thicker and more crack-resistant than the field membrane alone. Reinforcing fabric used in this way is a mandatory component of all compliant liquid-applied membrane systems on external balconies — it is not optional and its omission is a common cause of membrane failure at junctions.
            </p>
            <p>
              Different fabric types — woven polyester, non-woven polyester, fibreglass mesh, and self-adhesive bandage tape — suit different membrane systems and junction types. The correct fabric type must be specified to match the membrane system being applied. Each membrane manufacturer specifies which reinforcing fabric is approved for use in their system.
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

export function ReinforcingFabricProductSection() {
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
              Mandatory locations, fabric types, installation method, membrane system compatibility, width requirements, AS 3740 requirements
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
              <TechCard icon={<CheckCircle size={15} />} title="Mandatory Reinforcement Locations" items={TECH_INFO.mandatoryLocations} style="bullet" />
              <TechCard icon={<Ruler size={15} />} title="Fabric Width Requirements" items={TECH_INFO.fabricWidth} style="check" />
              <TechCard icon={<Layers size={15} />} title="Installation Method — Embed Between Coats" items={TECH_INFO.installationMethod} style="bullet" />
              <TechCard icon={<SquareStack size={15} />} title="Fabric Type by Membrane System" items={TECH_INFO.fabricTypeBySystem} style="check" />
              <TechCard icon={<AlertTriangle size={15} />} title="Reinforcing Fabric is NOT the Membrane" items={TECH_INFO.fabricNotMembrane} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards and Compliance" items={TECH_INFO.standardsNotes} style="bullet" />
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
            <p className="mt-1 text-sm text-slate-500">5 products — 2 brands — woven polyester, fibreglass mesh, non-woven polyester, and self-adhesive bandage — mandatory junction reinforcement for liquid-applied membrane systems on external balconies and terraces</p>
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
            <h2 className="text-2xl font-extrabold text-sky-950">Reinforcing fabric and mesh system comparison</h2>
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of reinforcing fabric and mesh systems. Confirm all product selections against the current manufacturer TDS and membrane system specification before specifying.
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
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Membrane system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Application method</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Width / format</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key restriction</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600">{row.membraneSystem}</td>
                  <td className="px-4 py-3 text-slate-600">{row.applicationMethod}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.widthFormat}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.keyRestriction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── ALL WARNING AND CALLOUT BOXES — BELOW COMPARISON TABLE ONLY ── */}

      {/* Box 1 — Red critical: junction reinforcement is mandatory */}
      <div className="rounded-2xl border border-red-200 bg-red-50 p-7">
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-700 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-red-900">Junction reinforcement is mandatory — omitting it is a non-compliant membrane installation</h3>
        </div>
        <p className="text-sm leading-7 text-red-800">
          AS 3740:2021 requires that liquid-applied waterproofing membranes be reinforced at all internal and external angles, changes of plane, and at pipe penetrations. Reinforcing fabric at junctions is not optional and not a matter of applicator preference — it is a compliance requirement. On external balcony remediation on Class 2 strata buildings, junction reinforcement omission is one of the most frequently identified defects in membrane failure investigations. If junction reinforcement is not installed, the membrane will crack at the junction under thermal movement regardless of how well the field membrane has been applied. Do not accept a membrane installation where junction reinforcement has been omitted.
        </p>
      </div>

      {/* Box 2 — Amber warning: use only specified fabric */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-amber-900">Use only the reinforcing fabric specified for the membrane system being applied</h3>
        </div>
        <p className="text-sm leading-7 text-amber-800">
          Each membrane manufacturer specifies which reinforcing fabric is approved for use in their system. ARDEX specifies ARDEX Deckweb (woven polyester) for ARDEX liquid-applied systems. Mapei specifies Mapenet 150 (alkali-resistant fibreglass) or Mapetex Sel (non-woven polyester) for Mapei cementitious and liquid-applied systems respectively. Using the wrong fabric type — for example, standard fibreglass mesh in a cementitious system, or a non-approved fabric in an ARDEX system — can result in fabric degradation, delamination, or inadequate reinforcement at the junction. Always confirm the specified reinforcing fabric with the membrane manufacturer's current system specification before ordering.
        </p>
      </div>

      {/* Box 3 — Amber warning: fabric does not replace membrane coat */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-amber-900">Do not confuse reinforcing fabric with the membrane — the fabric does not replace the membrane coat</h3>
        </div>
        <p className="text-sm leading-7 text-amber-800">
          Reinforcing fabric embedded in liquid-applied membrane is not waterproofing. The membrane coats above and below the fabric are the waterproofing layer — the fabric reinforces the membrane at stress concentration points. Full membrane dry film thickness must still be achieved above the fabric layer at junction details. An applicator who applies only one coat of membrane over embedded fabric at a junction — on the assumption that the fabric itself provides waterproofing — has produced a non-compliant, undersized membrane at the most critical location in the system.
        </p>
      </div>

      {/* Box 4 — Blue informational: full saturation required */}
      <div className="rounded-2xl border border-sky-200 bg-sky-50 p-7">
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-700 text-white">
            <BookOpen size={15} />
          </div>
          <h3 className="text-base font-extrabold text-sky-900">Reinforcing fabric must be fully saturated before the second coat is applied</h3>
        </div>
        <p className="text-sm leading-7 text-sky-800">
          When embedding reinforcing fabric between membrane coats, the fabric must be fully wetted through from below before the second coat is applied over it. Dry fabric, air pockets under the fabric, or incompletely saturated edges indicate that the first membrane coat was insufficient to wet the fabric before the second coat was applied. Applying the second coat over incompletely saturated fabric traps dry fabric within the membrane layer — this creates a plane of weakness at the junction that will allow the membrane to crack and split along the fabric edge under thermal movement. Press the fabric firmly into the wet first coat and verify full saturation before overcoating.
        </p>
      </div>
    </>
  );
}
