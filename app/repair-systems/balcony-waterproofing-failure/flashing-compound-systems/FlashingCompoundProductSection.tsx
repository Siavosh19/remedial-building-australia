"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Single-component"
  | "PU-bitumen"
  | "UV-resistant"
  | "Exposed"
  | "Root-resistant"
  | "Bituminous-compatible"
  | "Brushable"
  | "Fibre-reinforced"
  | "Flameless"
  | "Self-adhesive"
  | "Butyl-rubber"
  | "Aluminium-faced"
  | "System-specific"
  | "General-trade";

type Product = {
  section: "liquid-compound" | "self-adhesive-tape";
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
  // ── SECTION 1: Liquid and compound flashing systems ───────────────────────
  {
    section: "liquid-compound",
    fullLabel: "Soprema Australia",
    brandUrl: "https://soprema.com.au",
    tdsUrl: "https://soprema.com.au/product-category/alsan-flashing/",
    accentColor: "#1d4ed8",
    name: "Soprema Alsan Flashing",
    descriptionLine: "Single-component PU-bitumen liquid flashing resin — UV resistant — can be left exposed without cap sheet or metal flashing above — brush or roller — no primer on most substrates — 100% compatible with SBS and APP bituminous sheet membrane systems — 19L pail",
    productType: "Single-component polyurethane-bitumen liquid flashing resin — UV resistant — exposed grade",
    filterTags: ["Single-component", "PU-bitumen", "UV-resistant", "Exposed", "Bituminous-compatible"],
    techChips: [
      { label: "Single-component", cls: "bg-blue-100 text-blue-800" },
      { label: "PU-bitumen resin", cls: "bg-slate-100 text-slate-700" },
      { label: "UV resistant — exposed", cls: "bg-green-50 text-green-700" },
      { label: "No primer — most substrates", cls: "bg-slate-100 text-slate-700" },
      { label: "100% bituminous compatible", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Soprema Alsan Flashing is a patented single-component, ready-to-use polyurethane-bitumen waterproofing resin used to waterproof hard-to-access upstands and detail junctions where applying sheet waterproofing membranes is difficult or impractical. It is applied by brush or roller in 2–3 coats directly to the substrate — no primer or catalyst required on most surfaces. UV resistant and can be left exposed without additional protection — an important advantage over bituminous compounds that require a cap sheet or metal flashing above if exposed to UV.\n\nOn torch-on modified bitumen sheet membrane systems, Alsan Flashing is applied at upstands, parapet wall bases, step junctions, and penetration perimeters — locations where the torch-on sheet cannot be heat-bonded to a vertical surface without risk and where a liquid compound is more practical. The compound is 100% compatible with bituminous sheet membrane systems — it bonds directly to torch-on SBS and APP modified bitumen membranes without a separate adhesive or primer.\n\nApplied in 2–3 coats with reinforcing fleece (Alsan Polyfleece) embedded between coats at corners, angles, and penetration perimeters. The fleece is mandatory at any change of plane — do not apply without fleece at internal or external angles. Cure time is dependent on temperature and humidity — confirm with Soprema Australia before applying in cold or humid conditions.\n\nAvailable in Australia through Bayset and The Waterproofing Shop in 19L pails.",
    technicalProperties: [
      "Single-component PU-bitumen liquid resin — ready to use — no catalyst or primer required on most substrates",
      "UV resistant — can be left exposed without cap sheet or metal flashing above",
      "Applied by brush or roller in 2–3 coats",
      "Reinforcing fleece (Alsan Polyfleece) required at all changes of plane, corners, and penetration perimeters",
      "100% compatible with SBS and APP modified bituminous sheet membrane systems",
      "Cures to a dark brown finish — can be finished with hand-cast minerals to match surrounding granule surfacing",
      "Suitable for: upstands, parapet walls, penetration perimeters, step junctions, roof-to-wall interfaces, gutter upstands",
      "Available in 19L pail through Bayset and The Waterproofing Shop — confirm current availability before specifying",
    ],
    limitations: [
      "Bituminous membrane system primary — confirm compatibility with liquid-applied PU and single-ply membrane systems with Soprema Australia before applying over non-bituminous systems",
      "Reinforcing fleece is mandatory at all angles and penetration perimeters — do not apply without fleece at these locations",
      "Cures to dark brown — not suitable where a light colour finish is required in an exposed position",
      "Confirm cure time with Soprema Australia for cold or humid conditions before applying",
      "Confirm current product availability, pricing, and lead times with Bayset or Soprema Australia before specifying",
    ],
    procurementSources: [
      { name: "Bayset — confirmed Australian stockist", url: "https://www.bayset.com.au" },
      { name: "The Waterproofing Shop — confirmed Australian stockist", url: "https://thewaterproofingshop.com.au" },
      { name: "Soprema Australia — direct enquiry", url: "https://soprema.com.au" },
    ],
    specifierNote:
      "Confirm membrane system compatibility and reinforcing fleece requirements with Soprema Australia before specifying. For non-bituminous systems (ARDEX, Mapei liquid-applied PU), confirm compatibility directly with Soprema Australia — Alsan Flashing is not automatically approved over non-bituminous field membranes.",
  },
  {
    section: "liquid-compound",
    fullLabel: "Soprema Australia",
    brandUrl: "https://soprema.com.au",
    tdsUrl: "https://soprema.com.au/alsan-flashing-quadro/",
    accentColor: "#0369a1",
    name: "Soprema Alsan Flashing Quadro",
    descriptionLine: "Single-component polyurethane resin — cold-applied flameless — dark grey (RAL 7012) — no catalyst or activator required — for occupied strata remediation where hot-work is restricted — Soprema bituminous system compatible — used in Bayset System 510",
    productType: "Single-component polyurethane resin — cold-applied — flameless — dark grey",
    filterTags: ["Single-component", "UV-resistant", "Exposed", "Flameless", "Bituminous-compatible"],
    techChips: [
      { label: "Single-component", cls: "bg-sky-100 text-sky-800" },
      { label: "Cold-applied — flameless", cls: "bg-green-50 text-green-700" },
      { label: "No hot-work permit", cls: "bg-green-50 text-green-700" },
      { label: "Dark grey (RAL 7012)", cls: "bg-slate-100 text-slate-700" },
      { label: "Soprema system primary", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Soprema Alsan Flashing Quadro is a single-component polyurethane resin liquid flashing compound used at upstands, parapet bases, and detail interfaces on roofs and balconies. It is cold-applied with no catalyst or activator required — applicable at any time of year and across a wide temperature range without affecting performance. Unlike torch-on flashing details, Alsan Flashing Quadro involves no flame and no heat — eliminating the hot-work permit requirement at the flashing detail. This is particularly valuable on occupied strata building remediation where hot-work restrictions apply.\n\nAlsan Flashing Quadro is used in conjunction with Soprema bituminous membrane systems as the upstand and detail compound. It is applied with Alsan Fleece 165B reinforcing fabric embedded between coats at all corners and changes of plane. Alsan Flashing Quadro is specified as the detail compound in Bayset's documented planter box waterproofing System 510 (used with Soprema Colphene 3000 self-adhesive sheet membrane). It can also be applied directly to concrete, wood, bitumen, PVC, and many metal surfaces.\n\nAvailable in dark grey (RAL 7012) — can be finished with hand-cast minerals to create a consistent finish with the surrounding membrane. Confirm current Australian product availability and pricing with Soprema Australia or Bayset before specifying.",
    technicalProperties: [
      "Single-component polyurethane resin — no catalyst or activator required",
      "Cold-applied — flameless — no hot-work permit required",
      "Applied in 2–3 coats — Alsan Fleece 165B embedded between coats at corners and changes of plane",
      "Compatible substrates: concrete, wood, bitumen, PVC, and many metals",
      "Used with Soprema bituminous membrane systems as upstand and detail compound — specified in Bayset System 510",
      "Dark grey (RAL 7012) — can be finished with hand-cast minerals",
      "Suitable for: upstands, parapet walls, planter box walls, detail junctions, and penetration perimeters",
      "Flameless — appropriate for occupied strata building remediation where hot-work is restricted",
    ],
    limitations: [
      "Soprema system primary — confirm compatibility with non-Soprema membrane systems with Soprema Australia before applying",
      "Alsan Fleece 165B embedded reinforcement is mandatory at all angles and penetration perimeters",
      "Confirm current Australian product availability, pricing, and lead times with Soprema Australia or Bayset before specifying",
      "Dark grey finish — not for applications requiring a light colour without an additional coating above",
      "Confirm UV resistance and exposure classification with Soprema Australia for extended exposed applications",
    ],
    procurementSources: [
      { name: "Bayset — Soprema system supplier in Australia", url: "https://www.bayset.com.au" },
      { name: "Soprema Australia — direct enquiry", url: "https://soprema.com.au" },
    ],
    specifierNote:
      "Confirm Soprema system compatibility and current Australian availability with Soprema Australia or Bayset before specifying. Alsan Fleece 165B reinforcing fabric must be embedded between coats at all corners, angles, and penetration perimeters — not optional.",
  },
  {
    section: "liquid-compound",
    fullLabel: "Soprema Australia",
    brandUrl: "https://soprema.com.au",
    tdsUrl: "https://soprema.com.au/product/alsan-flashing-jardin-1657/",
    accentColor: "#16a34a",
    name: "Soprema Alsan Flashing Jardin",
    descriptionLine: "Single-component PU-bitumen resin with anti-root and rhizome-resistance properties — for waterproofing upstands, planter box walls, and roof edge details on green roofs and planted podium applications where root penetration at the vertical face is a risk",
    productType: "Single-component PU-bitumen liquid flashing resin — anti-root and rhizome resistant",
    filterTags: ["Single-component", "PU-bitumen", "Root-resistant", "Bituminous-compatible"],
    techChips: [
      { label: "Single-component", cls: "bg-green-100 text-green-800" },
      { label: "PU-bitumen resin", cls: "bg-slate-100 text-slate-700" },
      { label: "Root and rhizome resistant", cls: "bg-green-50 text-green-700" },
      { label: "Planter box / green roof", cls: "bg-slate-100 text-slate-700" },
      { label: "Vertical upstand face", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Soprema Alsan Flashing Jardin is the root and rhizome-resistant variant of the Alsan Flashing family — a single-component, ready-to-use bitumen-polyurethane resin specifically formulated for waterproofing upstands, planters, roof edges, and difficult detail areas on green roofs and planted podium applications where root and rhizome penetration resistance is required at the vertical face as well as the horizontal membrane.\n\nOn green roof and podium planter applications, the FLL-certified horizontal membrane (Wolfin, Cosmofin, or Soprema Colphene 3000) provides root resistance across the floor of the planter. However, the vertical upstand faces — planter box walls, parapet bases, and step junctions — require a root-resistant flashing compound to maintain the integrity of the root barrier system at the detail. Alsan Flashing Jardin addresses this vertical face root resistance requirement.\n\nApplied by brush or roller in 2–3 coats with reinforcing fleece at angles and changes of plane. Confirmed at soprema.com.au Australian product pages. Confirm current product availability, pricing, and lead times with Soprema Australia before specifying.",
    technicalProperties: [
      "Single-component PU-bitumen liquid resin — anti-root and anti-rhizome penetration properties",
      "Applied by brush or roller in 2–3 coats — reinforcing fleece required at all angles and changes of plane",
      "For: planter box walls, green roof upstands, parapet bases, and roof edge details on planted podium applications",
      "No primer required on most substrates",
      "For use with Soprema green roof and planter system products — confirmed at soprema.com.au",
      "Addresses vertical upstand face root resistance — must be used with a root-resistant horizontal membrane below",
    ],
    limitations: [
      "Soprema green roof and planter system primary — confirm compatibility with non-Soprema membrane systems with Soprema Australia before applying",
      "Root resistance is at the vertical upstand face — the horizontal membrane must also be root-resistant (see Root Resistant Membranes page)",
      "Confirm current Australian product availability with Soprema Australia before specifying",
      "Confirm reinforcing fleece requirements at angles and penetration perimeters with Soprema Australia",
      "Confirm root resistance certification and FLL compliance status with Soprema Australia for the specific planted application",
    ],
    procurementSources: [
      { name: "Soprema Australia — direct enquiry", url: "https://soprema.com.au" },
      { name: "Bayset — Soprema system supplier", url: "https://www.bayset.com.au" },
    ],
    specifierNote:
      "Confirm root resistance certification, membrane system compatibility, and Australian availability with Soprema Australia before specifying. The horizontal membrane must also be independently root-resistant — Alsan Flashing Jardin covers the vertical face only.",
  },
  {
    section: "liquid-compound",
    fullLabel: "Tremco Australia",
    brandUrl: "https://www.tremco.com.au",
    tdsUrl: "https://www.tremco.com.au/products/waterproofing",
    accentColor: "#7c2d12",
    name: "Tremco Brushable Hydroseal",
    descriptionLine: "Heavy bituminous fibre-reinforced rust-inhibiting sealing compound — applied thickly by brush at lap joints, upstands, metal flashing bedding, pipe penetration perimeters, and general joint sealing — not UV resistant as a standalone exposed product",
    productType: "Heavy bituminous fibre-reinforced sealing compound — brush applied — rust inhibiting",
    filterTags: ["Bituminous-compatible", "Fibre-reinforced", "Brushable"],
    techChips: [
      { label: "Heavy bituminous compound", cls: "bg-amber-900 text-amber-100" },
      { label: "Fibre reinforced", cls: "bg-slate-100 text-slate-700" },
      { label: "Rust inhibiting", cls: "bg-green-50 text-green-700" },
      { label: "Applied by brush", cls: "bg-slate-100 text-slate-700" },
      { label: "UV cover required exposed", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "Tremco Brushable Hydroseal is a heavy bituminous, fibre-reinforced, rust-inhibiting sealing compound specifically designed to be brushed thickly onto any surface requiring a flexible, bituminous waterproof seal. It is used at roof lap joints, upstand sealing details, metal flashing bedding, pipe penetration perimeters, and as a general sealing compound under and around metal flashings on flat roof and balcony applications.\n\nIn Australian strata roof and balcony remediation, Brushable Hydroseal is used where a heavy-body bituminous compound is required to seal a joint, bridge a gap, or bed a metal flashing before a torch-on sheet membrane is applied above. The fibre reinforcement provides flexibility and crack-bridging capability beyond plain bituminous paint products.\n\nNot UV resistant as a standalone exposed product — where applied in an exposed position, a cap sheet, metal flashing, or other UV-resistant covering must be applied above. Confirm the application detail and UV exposure status with the project specification and Tremco technical before using in an exposed position without additional covering.",
    technicalProperties: [
      "Heavy bituminous compound — fibre reinforced — rust inhibiting",
      "Applied thickly by brush — heavy body application — no mixing required",
      "Suitable substrates: steel, concrete, and masonry",
      "Used at: lap joints, upstand sealing, metal flashing bedding, pipe penetration perimeters, joint sealing",
      "Rust inhibiting — suitable for sealing around metal components and on steel substrates",
      "Tremco Australia — confirmed product at tremco.com.au",
    ],
    limitations: [
      "Not UV resistant as a standalone exposed product — metal flashing or cap sheet required above in any exposed position",
      "Not a primary field membrane — a sealing and bedding compound for detail locations only",
      "Confirm substrate preparation and primer requirements with Tremco technical before applying to non-standard substrates",
      "Confirm current product specification, formulation, and availability with Tremco Australia before specifying",
    ],
    procurementSources: [
      { name: "Tremco Australia — confirm trade distributor", url: "https://www.tremco.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "The Waterproofing Shop", url: "https://thewaterproofingshop.com.au" },
    ],
    specifierNote:
      "Not UV resistant in exposed positions — a metal flashing or cap sheet must be applied above Brushable Hydroseal in any location exposed to direct sunlight or weathering. Confirm UV exposure status before specifying.",
  },

  // ── SECTION 2: Self-adhesive flashing tapes ───────────────────────────────
  {
    section: "self-adhesive-tape",
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://ardexaustralia.com/product/ardex-flashing-tape/",
    accentColor: "#f97316",
    name: "ARDEX Flashing Tape",
    descriptionLine: "Self-adhesive flashing tape — 100mm wide × 4.7m roll — ARDEX Weldtec membrane system component — adhered with ARDEX WA 98 adhesive — Weldtec membrane heat-welded or glued over tape after installation — for joints, pipe flashings, and critical details",
    productType: "Self-adhesive tape — ARDEX Weldtec system component — 100mm × 4.7m",
    filterTags: ["Self-adhesive", "System-specific"],
    techChips: [
      { label: "Self-adhesive tape", cls: "bg-orange-100 text-orange-800" },
      { label: "100mm × 4.7m roll", cls: "bg-slate-100 text-slate-700" },
      { label: "ARDEX Weldtec system only", cls: "bg-red-50 text-red-700" },
      { label: "ARDEX WA 98 adhesive required", cls: "bg-slate-100 text-slate-700" },
      { label: "Weldtec membrane applied over", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "ARDEX Flashing Tape is a self-adhesive tape product used within the ARDEX Weldtec membrane system for waterproofing joints, pipe flashings, sealing mouldings in gussets, securing pipe flashings, and handling challenging or awkward construction scenarios. The tape is cut to size and adhered to the prepared substrate using ARDEX WA 98 adhesive during installation. Once correctly positioned and adhered, the ARDEX Weldtec membrane is then glued or heat-welded over the flashing tape to create a seamless waterproofing membrane system at and around critical detail areas.\n\nThe ARDEX Flashing Tape is a system component — it is designed to work within the ARDEX Weldtec membrane system and is not a standalone waterproofing product. The tape provides a substrate preparation and reinforcement function at detail areas before the Weldtec membrane is applied over the top. Available in 100mm wide × 4.7m roll format. Confirm current availability and pricing with ARDEX Australia or trade stockists before ordering.",
    technicalProperties: [
      "Self-adhesive flashing tape — 100mm wide × 4.7m roll",
      "Used within the ARDEX Weldtec membrane system — system component, not a standalone waterproofing product",
      "Adhered to prepared substrate using ARDEX WA 98 adhesive",
      "ARDEX Weldtec membrane is glued or heat-welded over the tape after installation",
      "For: joints, pipe flashings, sealing gussets, and awkward construction details within the Weldtec system",
      "Available through ARDEX Australia and trade stockists — confirm current availability before ordering",
    ],
    limitations: [
      "ARDEX Weldtec system component only — not for use as a standalone waterproofing tape without the Weldtec membrane applied over",
      "ARDEX WA 98 adhesive required for substrate bonding — the tape is not directly self-adhesive without WA 98",
      "Confirm current product availability, roll format, and system specification with ARDEX Australia before specifying",
      "Do not use as a substitute for reinforcing fabric (Deckweb) in standard ARDEX liquid-applied membrane systems — the flashing tape is for the Weldtec system specifically",
      "Confirm the tape is the correct format for the specific ARDEX Weldtec application with ARDEX technical before ordering",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply", url: "https://www.ardex.com.au" },
      { name: "The Waterproofing Shop", url: "https://thewaterproofingshop.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
    ],
    specifierNote:
      "ARDEX Weldtec system component only — confirm this is the correct product for the ARDEX Weldtec membrane system being specified. ARDEX WA 98 adhesive is required for bonding — the flashing tape cannot be applied without WA 98.",
  },
  {
    section: "self-adhesive-tape",
    fullLabel: "Tremco Australia",
    brandUrl: "https://www.tremco.com.au",
    tdsUrl: "https://www.tremco.com.au",
    accentColor: "#7c2d12",
    name: "Tremco PermAFab",
    descriptionLine: "Self-adhesive reinforced flashing tape — for lap sealing, joint bridging, and pipe penetration flashing on roofing and balcony waterproofing applications — Tremco system compatible — available through Bowens Australia and Tremco trade supply",
    productType: "Self-adhesive reinforced flashing tape — Tremco Australia",
    filterTags: ["Self-adhesive", "System-specific"],
    techChips: [
      { label: "Self-adhesive tape", cls: "bg-amber-100 text-amber-800" },
      { label: "Reinforced", cls: "bg-slate-100 text-slate-700" },
      { label: "Tremco system compatible", cls: "bg-green-50 text-green-700" },
      { label: "Lap sealing / joint bridging", cls: "bg-slate-100 text-slate-700" },
      { label: "Available — Bowens", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Tremco PermAFab is a self-adhesive reinforced flashing tape used for lap sealing, joint bridging, and pipe penetration flashing on roofing and balcony waterproofing applications in Australian strata and commercial construction. Confirmed available through Bowens building supply in Australia. Applied by pressing directly onto the prepared substrate — the self-adhesive backing bonds to the surface and provides immediate waterproofing at the joint or penetration.\n\nPermAFab is used in conjunction with Tremco roofing and waterproofing membrane systems as a system-specific flashing and detail tape. It can also be used as a repair tape on existing roofing systems for lap sealing and joint bridging at failed joints or penetrations. Confirm the correct Tremco system specification for the specific application before ordering — Tremco produces multiple flashing and tape products within its roofing range.",
    technicalProperties: [
      "Self-adhesive reinforced flashing tape — pressed directly onto prepared substrate",
      "For: lap sealing, joint bridging, pipe penetration flashing on roofing and balcony applications",
      "Used with Tremco roofing and waterproofing membrane systems as a system flashing detail tape",
      "Available through Bowens Australia and Tremco trade supply — confirmed Australian stockist",
      "Can also be used as a repair tape on existing roofing systems at failed laps and joints",
    ],
    limitations: [
      "Confirm the correct Tremco flashing tape product for the specific membrane system and application — Tremco produces multiple tape formats",
      "Confirm substrate preparation requirements with Tremco technical before applying",
      "Not a standalone primary waterproofing product — used at detail and joint locations within a Tremco system",
      "Confirm current product availability, width, and roll length with Tremco Australia or Bowens before ordering",
    ],
    procurementSources: [
      { name: "Tremco Australia — confirm trade distributor", url: "https://www.tremco.com.au" },
      { name: "Bowens — confirmed Australian stockist", url: "https://www.bowens.com.au" },
    ],
    specifierNote:
      "Confirm the correct Tremco flashing tape product and system application with Tremco Australia before ordering. Multiple tape formats are available — confirm the specific product for the membrane system and application.",
  },
  {
    section: "self-adhesive-tape",
    fullLabel: "Crommelin / Gripset / various",
    brandUrl: "#",
    accentColor: "#64748b",
    name: "Generic Butyl / Aluminium Flashing Tape",
    descriptionLine: "Self-adhesive butyl rubber or aluminium-faced bitumen flashing tape — widely available through trade waterproofing suppliers — for pipe penetration sealing, joint bridging, and minor flashing repairs — confirm compatibility with the primary membrane system before applying",
    productType: "Self-adhesive butyl rubber or aluminium-faced bitumen tape — trade supply — multiple brands",
    filterTags: ["Self-adhesive", "General-trade", "Butyl-rubber", "Aluminium-faced"],
    techChips: [
      { label: "Butyl rubber format", cls: "bg-slate-100 text-slate-700" },
      { label: "Aluminium-faced format", cls: "bg-slate-100 text-slate-700" },
      { label: "Multiple brands", cls: "bg-slate-100 text-slate-700" },
      { label: "Trade supply — widely available", cls: "bg-green-50 text-green-700" },
      { label: "Confirm system compatibility", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Self-adhesive butyl rubber and aluminium-faced bitumen flashing tapes are widely available through Australian waterproofing and building trade suppliers under multiple brand names (Crommelin, Gripset, and generic trade supply). These tapes are used for pipe penetration sealing, joint bridging, minor flashing repairs, and general detail waterproofing on residential and light commercial roofing and balcony applications.\n\nThe butyl rubber format provides a highly conformable, permanently flexible seal at joints and penetrations — butyl remains flexible in cold conditions and bonds to a wide range of substrates. The aluminium-faced bitumen format provides a more rigid, UV-resistant tape suitable for exposed flashing and lap sealing applications on roofing where a dimensionally stable tape is preferred.\n\nThese generic trade tapes are appropriate for minor repair, maintenance, and residential detail work. For Class 2 strata remediation, confirm that the tape is appropriate for the specific membrane system and substrate before applying — system-specific flashing tapes (ARDEX Flashing Tape, Tremco PermAFab) are preferred where the work is part of a full membrane system remediation under a manufacturer warranty.",
    technicalProperties: [
      "Butyl rubber format: highly conformable — permanently flexible — bonds to a wide range of substrates in cold and warm conditions",
      "Aluminium-faced bitumen format: dimensionally stable — UV resistant — suitable for exposed flashing and lap sealing",
      "For: pipe penetration sealing, joint bridging, minor flashing repairs, general detail waterproofing",
      "Multiple brands — Crommelin, Gripset, and generic trade supply — widely available nationally",
      "Applied by pressing directly onto prepared substrate — self-adhesive backing — immediate waterproofing at detail",
    ],
    limitations: [
      "Not a primary field membrane — detail and repair application only",
      "Confirm compatibility with the primary membrane system before applying — generic tapes may not be compatible with all membrane systems under manufacturer warranty",
      "For Class 2 strata remediation under a manufacturer system warranty, use system-specific flashing tapes (ARDEX, Tremco) rather than generic trade tapes",
      "Confirm substrate preparation and primer requirements with the tape supplier before applying",
      "Confirm current product availability, width, roll length, and format with local supplier before ordering",
    ],
    procurementSources: [
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "The Waterproofing Shop", url: "https://thewaterproofingshop.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
      { name: "TradieCart", url: "https://www.tradiecart.com.au" },
      { name: "Bunnings Trade — Crommelin and generic flashing tape formats", url: "https://www.bunnings.com.au" },
    ],
    specifierNote:
      "Confirm membrane system compatibility before applying generic trade tapes — system-specific flashing tapes are preferred for full strata remediation work under manufacturer warranty. Generic tapes are appropriate for minor repair, maintenance, and residential detail work.",
  },
];

const LIQUID_FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Single-component", label: "Single-component" },
  { id: "PU-bitumen", label: "PU-bitumen resin" },
  { id: "UV-resistant", label: "UV resistant" },
  { id: "Exposed", label: "Can be left exposed" },
  { id: "Root-resistant", label: "Root resistant" },
  { id: "Bituminous-compatible", label: "Bituminous system compatible" },
  { id: "Brushable", label: "Brush applied" },
  { id: "Fibre-reinforced", label: "Fibre reinforced" },
  { id: "Flameless", label: "Flameless — no hot-work permit" },
];

const TAPE_FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Self-adhesive", label: "Self-adhesive" },
  { id: "System-specific", label: "System specific" },
  { id: "General-trade", label: "General trade supply" },
  { id: "Butyl-rubber", label: "Butyl rubber" },
  { id: "Aluminium-faced", label: "Aluminium-faced" },
];

const COMPARISON_LIQUID: {
  product: string;
  brand: string;
  type: string;
  uvExposed: string;
  reinforcement: string;
  membraneCompatibility: string;
  keyRestriction: string;
}[] = [
  {
    product: "Alsan Flashing",
    brand: "Soprema",
    type: "Single-component PU-bitumen liquid resin",
    uvExposed: "Yes — UV resistant — can be left exposed",
    reinforcement: "Yes — Alsan Polyfleece at all angles and penetrations",
    membraneCompatibility: "100% compatible with SBS and APP bituminous sheet systems — confirm with non-bituminous systems",
    keyRestriction: "Dark brown cure — reinforcing fleece mandatory at angles — confirm compatibility with non-bituminous systems",
  },
  {
    product: "Alsan Flashing Quadro",
    brand: "Soprema",
    type: "Single-component PU resin — cold-applied",
    uvExposed: "Yes — UV resistant",
    reinforcement: "Yes — Alsan Fleece 165B at angles and penetrations",
    membraneCompatibility: "Soprema bituminous systems primary — used in Bayset System 510",
    keyRestriction: "Flameless — no hot-work permit — confirm compatibility with non-Soprema systems — dark grey (RAL 7012)",
  },
  {
    product: "Alsan Flashing Jardin",
    brand: "Soprema",
    type: "Single-component PU-bitumen — root and rhizome resistant",
    uvExposed: "Confirm with Soprema",
    reinforcement: "Yes — reinforcing fleece at angles",
    membraneCompatibility: "Soprema green roof and planter systems",
    keyRestriction: "Root resistance at vertical upstand face — horizontal membrane must also be root-resistant — confirm Australian availability",
  },
  {
    product: "Brushable Hydroseal",
    brand: "Tremco",
    type: "Heavy bituminous fibre-reinforced compound",
    uvExposed: "No — UV cover required above in exposed positions",
    reinforcement: "No — applied thickly as single layer",
    membraneCompatibility: "Tremco bituminous systems — general sealing and bedding",
    keyRestriction: "Not UV resistant exposed — metal flashing or cap sheet required above — rust inhibiting — sealing and bedding compound only",
  },
];

const COMPARISON_TAPE: {
  product: string;
  brand: string;
  type: string;
  uvExposed: string;
  systemSpecificity: string;
  keyRestriction: string;
}[] = [
  {
    product: "ARDEX Flashing Tape",
    brand: "ARDEX Australia",
    type: "Self-adhesive tape — 100mm × 4.7m — Weldtec system",
    uvExposed: "No — Weldtec membrane applied over tape",
    systemSpecificity: "ARDEX Weldtec system specific — not standalone",
    keyRestriction: "Requires ARDEX WA 98 adhesive for bonding — Weldtec membrane must be applied over — not for other ARDEX membrane systems",
  },
  {
    product: "Tremco PermAFab",
    brand: "Tremco Australia",
    type: "Self-adhesive reinforced tape",
    uvExposed: "Confirm with Tremco",
    systemSpecificity: "Tremco system compatible",
    keyRestriction: "Confirm correct Tremco tape product for specific membrane and application — multiple tape formats available — confirm with Tremco Australia",
  },
  {
    product: "Generic Butyl / Aluminium Tape",
    brand: "Crommelin / Gripset / various",
    type: "Self-adhesive butyl rubber or aluminium-faced bitumen",
    uvExposed: "Aluminium-faced format: UV resistant",
    systemSpecificity: "General trade — not system specific",
    keyRestriction: "Not for primary field waterproofing — system-specific tapes preferred for full strata remediation under warranty — confirm membrane compatibility before applying",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Upstand and parapet wall junctions on flat roofs and balconies where the field sheet membrane terminates and a liquid compound continues the waterproof layer up the vertical face",
    "Step junctions, kicker bases, and roof-to-wall interfaces on strata building remediation where complex geometry prevents sheet membrane installation",
    "Pipe penetration perimeters and drain surrounds on torch-on SBS and APP modified bitumen roof membrane systems",
    "Planter box walls and green roof upstands where root and rhizome resistance is required at the vertical face",
    "Repair and maintenance applications — applying over failed or cracked existing upstand membrane at detail locations where full system replacement is not yet scheduled",
    "Minor joint repairs on residential and commercial roofing applications using self-adhesive flashing tapes",
  ],
  selectionCriteria: [
    "Confirm compatibility with the primary field membrane — Soprema Alsan Flashing is 100% compatible with bituminous sheet systems but must be confirmed for non-bituminous systems",
    "UV exposure status — Alsan Flashing and Alsan Flashing Quadro can be left exposed; Tremco Brushable Hydroseal cannot be left exposed without UV protection above",
    "Hot-work restriction — Alsan Flashing Quadro is cold-applied and flameless — appropriate for occupied strata buildings where hot-work permits are restricted",
    "Root resistance requirement — specify Alsan Flashing Jardin where the vertical upstand face is in contact with planting media on green roofs or planter boxes",
    "System specificity — ARDEX Flashing Tape is only for the ARDEX Weldtec membrane system — confirm the correct product before specifying",
    "Reinforcing fleece — all liquid flashing compounds require embedded reinforcing fleece at all angles, changes of plane, and penetration perimeters — this is mandatory, not optional",
    "For Class 2 strata remediation under a manufacturer warranty, use system-specific products — do not substitute with generic trade tapes unless confirmed with the manufacturer",
  ],
  limitations: [
    "Flashing compounds are not field membrane products — they seal detail junctions, not the horizontal field area of a roof or balcony",
    "Do not use flashing compounds across the horizontal field of a roof or balcony as a substitute for the primary field membrane — the coverage and thickness are insufficient for field waterproofing",
    "Do not omit reinforcing fleece at angles and penetration perimeters — applying liquid flashing compound without embedded fleece at changes of plane is the most common cause of liquid compound failure",
    "Do not apply generic trade flashing tapes under a manufacturer system warranty without confirming compatibility with the system manufacturer",
    "Bituminous compounds (Tremco Brushable Hydroseal) must not be left exposed without UV protection above — UV degradation is rapid on unprotected bituminous compounds",
    "Do not apply Soprema Alsan Flashing to non-bituminous membrane systems without confirming compatibility with Soprema Australia",
  ],
  standardsNotes: [
    "AS 3740:2021 — waterproofing of domestic wet areas — minimum upstand height requirements for balcony and wet area applications — typically 150mm above finished floor level",
    "AS 4654.2 — waterproofing membranes for external above-ground use — installation requirements — includes upstand height requirements for roof applications",
    "NCC Volume One — Class 2 building waterproofing performance requirements — upstand heights, flashing details, and membrane penetration requirements",
    "FLL Guidelines (Germany) — root resistance certification for green roof and planter box systems — confirm with Soprema Australia for Alsan Flashing Jardin",
    "Manufacturer system documentation and ITP hold points — primer, first coat, fleece embedding, second coat, and inspection are all mandatory hold points for liquid flashing compounds",
  ],
  suitableDefects: [
    "Failed upstand waterproofing on strata building roofs and balconies — flashing compound applied to correctly prepared existing upstand as a repair or full replacement detail compound",
    "Cracked or delaminated bituminous compound at upstands on torch-on SBS membrane systems — Alsan Flashing or Brushable Hydroseal applied to repaired substrate",
    "Pipe penetration perimeter failure — liquid compound or self-adhesive flashing tape applied at the pipe perimeter with reinforcing fleece embedded",
    "Planter box wall waterproofing failure — Alsan Flashing Jardin applied to planter box walls in conjunction with an FLL-certified root-resistant horizontal membrane",
    "Minor roof lap joint failure on existing torch-on systems — self-adhesive flashing tape applied over the failed lap pending full system remediation",
  ],
  typicalSubstrates: [
    "Concrete upstands and parapet walls — sound, clean, dry, laitance-free — suitable for all liquid flashing compounds without primer on most cases",
    "Masonry upstands and block walls — confirm primer requirement with Soprema Australia for porous or absorbent masonry substrates",
    "Steel and metal substrates — confirm rust inhibiting and adhesion requirements — Brushable Hydroseal is formulated for steel; Soprema Alsan Flashing requires primer confirmation for metal",
    "Existing bituminous sheet membrane — Alsan Flashing bonds directly to torch-on SBS and APP bituminous surfaces — ideal for upstand details on existing torch-on systems",
    "Concrete, wood, bitumen, PVC — Alsan Flashing Quadro confirmed for these substrates without primer on most cases",
  ],
};

export function FlashingCompoundIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are flashing compound systems — roofs and balconies?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Flashing compound systems are liquid-applied or self-adhesive waterproofing products used to seal and waterproof upstands, parapet wall junctions, roof-to-wall interfaces, penetrations, step junctions, and other detail areas on roofs and balconies where a sheet membrane cannot be easily applied, heat-bonded, or formed into a watertight junction. On torch-on modified bitumen sheet membrane systems — the dominant sheet membrane system in Australian strata building remediation — the sheet membrane covers the horizontal field of the roof or balcony, but the junctions with vertical upstands, parapet walls, step flashings, and penetrations require a separate compound or flashing product to complete the waterproof detail. Flashing compounds bridge the gap between the field membrane and the vertical surface, conforming to irregular substrates and complex geometry that sheet membranes cannot reach.
        </p>
        {expanded && (
          <>
            <p>
              Flashing compound systems are also used as standalone repair compounds on existing waterproofing systems — applied over failed or cracked existing membrane at upstands, corners, and penetration perimeters where the primary membrane has failed but full replacement is not required or is not yet scheduled. In this repair role, flashing compounds extend the service life of an existing system at its most vulnerable detail locations.
            </p>
            <p>
              The three primary flashing compound types used in Australian roof and balcony waterproofing remediation are liquid PU-bitumen flashing compounds, bituminous brushable compounds, and self-adhesive flashing tapes. Each has a distinct substrate compatibility, membrane system compatibility, UV resistance, and application method. The correct flashing compound must be selected to match the primary membrane system it is used with — flashing compounds are not universally interchangeable across membrane systems and brands.
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

function ProductCard({ product }: { product: Product }) {
  return (
    <div
      className="flex-none"
      style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}
    >
      <div
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        style={{ borderLeft: `4px solid ${product.accentColor}` }}
      >
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
          <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">{product.descriptionLine}</p>
        </div>

        <div className="flex flex-wrap gap-1.5 border-b border-slate-100 bg-white px-5 py-3">
          {product.techChips.map((chip) => (
            <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>
              {chip.label}
            </span>
          ))}
        </div>

        {product.specifierNote && (
          <div className="border-b border-amber-100 bg-amber-50 px-5 py-3">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Specifier Note</p>
            <p className="text-xs leading-5 text-amber-900">{product.specifierNote}</p>
          </div>
        )}

        <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
          {product.systemDescription.split("\n\n").map((para, i) => (
            <p key={i} className={`text-xs leading-6 text-slate-700 ${i > 0 ? "mt-3" : ""}`}>{para}</p>
          ))}
        </div>

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
        </div>

        <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-4">
          <p className="mb-3 text-[10px] uppercase tracking-wider text-slate-400">PROCUREMENT SOURCES</p>
          <div className="space-y-2">
            {product.procurementSources.map((src) => (
              <div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs">
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
          <p className="mt-3 text-[10px] italic text-slate-400">
            Confirm suitability with the current manufacturer TDS before specifying or applying.
          </p>
        </div>
      </div>
    </div>
  );
}

export function FlashingCompoundProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [liquidFilters, setLiquidFilters] = useState<Set<FilterTag>>(new Set());
  const [tapeFilters, setTapeFilters] = useState<Set<FilterTag>>(new Set());
  const liquidScrollRef = useRef<HTMLDivElement>(null);
  const tapeScrollRef = useRef<HTMLDivElement>(null);

  const toggleLiquidFilter = (id: FilterTag) => {
    setLiquidFilters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleTapeFilter = (id: FilterTag) => {
    setTapeFilters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const liquidProducts = PRODUCTS.filter((p) => p.section === "liquid-compound");
  const tapeProducts = PRODUCTS.filter((p) => p.section === "self-adhesive-tape");

  const visibleLiquid =
    liquidFilters.size === 0
      ? liquidProducts
      : liquidProducts.filter((p) => Array.from(liquidFilters).every((f) => p.filterTags.includes(f)));

  const visibleTapes =
    tapeFilters.size === 0
      ? tapeProducts
      : tapeProducts.filter((p) => Array.from(tapeFilters).every((f) => p.filterTags.includes(f)));

  const scrollLiquid = (dir: "left" | "right") => {
    liquidScrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });
  };

  const scrollTape = (dir: "left" | "right") => {
    tapeScrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });
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
              Flashing vs field membrane, upstand height requirements, substrate compatibility, UV exposure, membrane system compatibility, metal flashing vs compound flashing
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
              <TechCard icon={<BookOpen size={15} />} title="Standards & Testing" items={TECH_INFO.standardsNotes} style="bullet" />
              <TechCard icon={<CheckCircle size={15} />} title="Suitable Defects" items={TECH_INFO.suitableDefects} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="Typical Substrates" items={TECH_INFO.typicalSubstrates} style="bullet" />
            </div>
          </div>
        )}
      </div>

      {/* ── Section 1: Liquid and compound flashing systems ── */}
      <div>
        <div className="mb-6 flex items-center gap-4">
          <span className="h-px flex-1 bg-red-700" />
          <span className="text-base font-bold uppercase tracking-[0.2em] text-sky-950">Section 1 — Liquid and Compound Flashing Systems</span>
          <span className="h-px flex-1 bg-red-700" />
        </div>

        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Liquid and Compound Flashing Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">4 products — single-component PU-bitumen resin, bituminous rubber compound — upstands, parapet bases, wall junctions, penetration perimeters, and step detail waterproofing on roofs and balconies</p>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {LIQUID_FILTER_DEFS.map((f) => {
            const active = liquidFilters.has(f.id);
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => toggleLiquidFilter(f.id)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                  active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
                }`}
              >
                {f.label}
              </button>
            );
          })}
          {liquidFilters.size > 0 && (
            <button type="button" onClick={() => setLiquidFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">
              Clear filters
            </button>
          )}
        </div>

        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">
            {visibleLiquid.length} product{visibleLiquid.length !== 1 ? "s" : ""} — scroll to view all
          </span>
          <div className="flex items-center gap-2">
            <button onClick={() => scrollLiquid("left")} aria-label="Scroll left" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => scrollLiquid("right")} aria-label="Scroll right" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div
          ref={liquidScrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {visibleLiquid.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </div>

      {/* ── Section 2: Self-adhesive flashing tapes ── */}
      <div>
        <div className="mb-6 flex items-center gap-4">
          <span className="h-px flex-1 bg-red-700" />
          <span className="text-base font-bold uppercase tracking-[0.2em] text-sky-950">Section 2 — Self-Adhesive Flashing Tapes</span>
          <span className="h-px flex-1 bg-red-700" />
        </div>

        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Self-Adhesive Flashing Tape Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">3 products — butyl rubber, aluminium-faced bitumen, and reinforced polyethylene — for joint sealing, pipe penetration flashing, lap sealing, and critical detail waterproofing on roofs and balconies</p>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {TAPE_FILTER_DEFS.map((f) => {
            const active = tapeFilters.has(f.id);
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => toggleTapeFilter(f.id)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                  active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
                }`}
              >
                {f.label}
              </button>
            );
          })}
          {tapeFilters.size > 0 && (
            <button type="button" onClick={() => setTapeFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">
              Clear filters
            </button>
          )}
        </div>

        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">
            {visibleTapes.length} product{visibleTapes.length !== 1 ? "s" : ""} — scroll to view all
          </span>
          <div className="flex items-center gap-2">
            <button onClick={() => scrollTape("left")} aria-label="Scroll left" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => scrollTape("right")} aria-label="Scroll right" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div
          ref={tapeScrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {visibleTapes.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </div>

      {/* ── System Comparison ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Flashing Compound and Tape System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison — Part A: liquid and compound flashing systems, Part B: self-adhesive flashing tapes. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>

        <p className="mb-3 text-sm font-bold text-sky-950">Part A — Liquid and Compound Flashing Systems</p>
        <div className="mb-8 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">UV exposed</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Reinforcement required</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Membrane compatibility</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key restriction</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_LIQUID.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600">{row.uvExposed}</td>
                  <td className="px-4 py-3 text-slate-600">{row.reinforcement}</td>
                  <td className="px-4 py-3 text-slate-600">{row.membraneCompatibility}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.keyRestriction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mb-3 text-sm font-bold text-sky-950">Part B — Self-Adhesive Flashing Tapes</p>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">UV exposed</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System specificity</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key restriction</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_TAPE.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600">{row.uvExposed}</td>
                  <td className="px-4 py-3 text-slate-600">{row.systemSpecificity}</td>
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
