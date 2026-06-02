"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Rapid-set"
  | "Site-batched"
  | "Pre-mixed"
  | "Pre-blended"
  | "Single-component"
  | "Bonded"
  | "Unbonded"
  | "Pre-membrane"
  | "Over-membrane"
  | "Large-area"
  | "Localised-areas"
  | "Domestic-small"
  | "Falls-correction"
  | "Fast-tile-over"
  | "Internal-external"
  | "ARDEX-system"
  | "Mapei-system"
  | "Fosroc-Parchem";

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

const SCREED_PRODUCTS: Product[] = [
  {
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://ardexaustralia.com/product/ardex-a-38/",
    accentColor: "#f97316",
    name: "ARDEX A 38",
    descriptionLine: "Rapid-set site-batched screed binder — bonded ~15mm min / unbonded min 35mm preferably 40mm — pre-membrane falls correction and over-membrane unbonded protection topping — polymer additive mandatory for external use",
    productType: "Rapid-set screed binder — site-batched with sand and polymer additive",
    filterTags: ["Rapid-set", "Site-batched", "Bonded", "Unbonded", "Pre-membrane", "Over-membrane", "Falls-correction", "Large-area", "Internal-external", "ARDEX-system"],
    techChips: [
      { label: "Rapid-set binder", cls: "bg-orange-100 text-orange-800" },
      { label: "Site-batched", cls: "bg-slate-100 text-slate-700" },
      { label: "Pre-membrane falls", cls: "bg-green-50 text-green-700" },
      { label: "Over-membrane unbonded topping", cls: "bg-sky-50 text-sky-700" },
      { label: "Tile over ~8 hours", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "ARDEX A 38 is the primary ARDEX screed system for balcony falls correction and over-membrane protection toppings on external terraces and podiums. It is a site-batched rapid-set screed binder — mixed on site with washed sand and water, with ARDEX Abacrete or WPM 405 polymer additive incorporated into both the bonding slurry and the gauging water. It is not a pre-blended ready-to-use product.\n\nAs a pre-membrane bonded screed, A 38 is applied directly to the mechanically prepared concrete substrate over a polymer-modified bonding slurry applied wet, with the screed placed wet-on-wet immediately after. This corrects or establishes the drainage fall to the floor waste before the waterproofing membrane is installed. Minimum bonded thickness approximately 15mm. Maximum bay size approximately 40m² — larger areas require saw cuts or planned bays. The screed must cure and dry before the waterproofing membrane is applied — apply a moisture check and consider ARDEX WPM 300 HydrEpoxy as a moisture seal on fast-track programmes.\n\nAs an over-membrane unbonded protection topping, A 38 is the only ARDEX-engineered screed approved for use directly over liquid-applied waterproofing membranes — placed over a double-layer 200 micron polyethylene slip sheet that isolates the screed from the cured membrane. Minimum unbonded thickness at least 35mm, preferably 40mm — confirm from the current ARDEX Australia TDS. Self-levelling compounds are not approved for this application.",
    technicalProperties: [
      "Rapid-set engineered screed binder — site-batched with washed sand and water",
      "Polymer additive (Abacrete or WPM 405) in bonding slurry and gauging water — mandatory for external and wet environment use",
      "Bonded: minimum approximately 15mm — Unbonded: minimum 35mm, preferably 40mm — confirm from current ARDEX TDS",
      "Dimensionally stable — internal and external use — large balcony, terrace, and podium areas",
      "Walk on: approximately 3 hours — tile over: approximately 8 hours",
      "Only ARDEX-approved engineered screed for over-membrane unbonded topping over liquid-applied membranes",
      "Bay size: maximum approximately 40m² for bonded applications — saw cuts required for larger areas",
    ],
    limitations: [
      "Site-batched — correct aggregate grading and water:binder ratio are critical — over-watering weakens the screed",
      "Polymer additive mandatory for external balcony use — plain water gauging alone is not acceptable",
      "Bonding slurry must be applied wet and screed applied wet-on-wet immediately — if slurry dries before screed, re-slurry",
      "Screed must reach acceptable moisture content before membrane application — wet screed under a membrane causes delamination",
      "Unbonded over-membrane applications require a double-layer polyethylene slip sheet — do not bond directly to liquid-applied membrane",
      "Self-levelling compounds based on ARDEX Ardurapid technology are not approved for external balcony use and must not be substituted for A 38",
      "Confirm current thickness requirements and full system specification with ARDEX Australia before specifying",
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
    tdsUrl: "https://ardexaustralia.com/product/ardex-a-48/",
    accentColor: "#f97316",
    name: "ARDEX A 48",
    descriptionLine: "Rapid-set pre-mixed screed — cement and aggregate pre-combined — water only on site — tile over approximately 4 hours — domestic and smaller balcony falls correction and over-membrane topping",
    productType: "Rapid-set pre-mixed screed — cement and aggregate pre-combined — water only on site",
    filterTags: ["Rapid-set", "Pre-mixed", "Bonded", "Unbonded", "Pre-membrane", "Over-membrane", "Falls-correction", "Domestic-small", "Fast-tile-over", "Internal-external", "ARDEX-system"],
    techChips: [
      { label: "Rapid-set pre-mixed", cls: "bg-orange-100 text-orange-800" },
      { label: "Water only on site", cls: "bg-slate-100 text-slate-700" },
      { label: "Tile over ~4 hours", cls: "bg-green-50 text-green-700" },
      { label: "Pre-membrane and over-membrane", cls: "bg-sky-50 text-sky-700" },
      { label: "Domestic / smaller balcony", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "ARDEX A 48 is ARDEX's pre-mixed rapid-set screed for domestic and smaller-scale balcony remediation. Unlike ARDEX A 38, the cement and aggregate are pre-combined in the bag — only water (and polymer additive where required) is added on site. This eliminates the need to source correctly graded sand separately and simplifies site logistics on smaller projects and strata apartments where batching space and materials storage are constrained.\n\nA 48 is positioned for domestic-scale and smaller commercial balcony remediation, while A 38 is better suited to larger commercial balcony, terrace, and podium screeds where the volume justifies site batching. The key performance difference in the balcony context is tile-over time — A 48 is ready to receive most tiles and natural stone after approximately 4 hours, compared to approximately 8 hours for A 38. On programme-critical occupied strata remediation projects where the same area must be waterproofed and tiled within a short access window, the faster tile-over time of A 48 can be a decisive factor.\n\nLike A 38, ARDEX A 48 is one of the two ARDEX-approved engineered screed systems for use as an unbonded topping over liquid-applied waterproofing membranes — placed over a double-layer polyethylene slip sheet. Self-levelling compounds are not approved for this application.",
    technicalProperties: [
      "Pre-mixed cement and aggregate — water only added on site — simpler logistics than A 38 site batching",
      "Rapid-set — tile over approximately 4 hours — faster than A 38's approximately 8 hours",
      "Bonded, unbonded (on slip sheet), floating, and heated screed applications",
      "Internal and external use — suited to domestic and smaller commercial balcony remediation",
      "Approved for unbonded over-membrane topping over liquid-applied waterproofing membranes (over double-layer slip sheet)",
      "Polymer additive (Abacrete or WPM 405) recommended in bonding slurry and gauging water for all external applications",
    ],
    limitations: [
      "Confirm current bonded and unbonded minimum thickness from the ARDEX Australia TDS before specifying — confirm same unbonded minimum (35mm preferably 40mm) applies as per A 38",
      "Polymer additive recommended for all external applications — plain water gauging not acceptable in external wet environments",
      "Same double-layer slip sheet requirement as A 38 for over-membrane unbonded applications — do not bond directly to liquid-applied membrane",
      "Do not substitute ARDEX Ardurapid-based self-levelling compounds for A 48 in external balcony applications",
      "Confirm current product specification with ARDEX Australia before specifying",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply", url: "https://www.ardex.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "TradieCart", url: "https://www.tradiecart.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions/products/detail/mapecem-pronto",
    accentColor: "#0369a1",
    name: "Mapei Mapecem Pronto",
    descriptionLine: "Pre-blended ready-to-use rapid-setting screed — water only on site — bonded 10–50mm / floating 35–70mm — ceramic and stone tile over in 3 hours — pre-membrane falls correction",
    productType: "Pre-blended rapid-setting shrinkage-compensated screed — water only on site",
    filterTags: ["Pre-blended", "Bonded", "Unbonded", "Pre-membrane", "Falls-correction", "Fast-tile-over", "Large-area", "Mapei-system"],
    techChips: [
      { label: "Pre-blended — water only", cls: "bg-sky-100 text-sky-800" },
      { label: "Tile over 3 hours", cls: "bg-green-50 text-green-700" },
      { label: "Bonded 10–50mm", cls: "bg-slate-100 text-slate-700" },
      { label: "Floating 35–70mm", cls: "bg-slate-100 text-slate-700" },
      { label: "Membrane over 4 hours", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Mapei Mapecem Pronto is Mapei Australia's pre-blended ready-to-use rapid-setting screed mortar for pre-membrane falls correction on balconies, terraces, and podium slabs. Binder and aggregate are pre-combined in the 20kg bag — only clean water is added on site (1.5–1.7 litres per bag). This eliminates site batching variation and the need for separate aggregate sourcing — particularly practical on strata balcony remediation projects in high-rise or city-centre locations where aggregate storage is impractical.\n\nMapecem Pronto is primarily used as a pre-membrane screed — the screed is placed to establish the required falls, allowed to cure, and the waterproofing membrane is then applied. The TDS confirms the membrane can be applied over the screed after 4 hours — confirm this timing with the membrane manufacturer before scheduling on the same day.\n\nFor bonded applications, Planicrete or Planicrete SP bonding slurry is applied first and the Mapecem Pronto screed applied while the slurry is still wet. For floating (unbonded) applications, isolate the substrate with a polyethylene sheet before placing the screed. Workability time is 20–30 minutes — mix only the quantity that can be placed and finished in this window. Residual moisture at 24 hours is less than 2% — significantly drier than conventional sand-cement screeds on the same timeline.",
    technicalProperties: [
      "Pre-blended ready-to-use rapid-setting shrinkage-compensated screed — 1.5–1.7 litres water per 20kg bag",
      "Workability: 20–30 minutes — light foot traffic: 2–3 hours",
      "Tile over (ceramic and stone): 3 hours — membrane over: after 4 hours — confirm with membrane manufacturer",
      "Residual moisture at 24 hours: less than 2%",
      "Bonded: 10–50mm — Floating: 35–70mm with polyethylene sheet",
      "Bonding slurry: Planicrete or Planicrete SP — must be applied wet before screed",
      "Green Star compliant — contributes to Green Star credits",
    ],
    limitations: [
      "Do not mix with other binders or aggregates — water only — do not add Topcem, cement, lime, or gypsum",
      "Workability window: 20–30 minutes — do not batch more than can be placed and finished in this time",
      "Cannot be transported after mixing — fast-set product — batch at point of use",
      "Do not re-mix or add water after initial set begins",
      "Membrane timing: confirm minimum 4 hours with membrane manufacturer before scheduling same-day membrane work",
      "Large bays require saw cuts to one-third screed depth",
      "Confirm current Australian product specification with Mapei Australia before specifying",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply", url: "https://www.mapei.com/au" },
      { name: "Bayset", url: "https://www.bayset.com.au" },
      { name: "Intafloors", url: "https://intafloors.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions/products/detail/topcem-pronto",
    accentColor: "#0369a1",
    name: "Mapei Topcem Pronto AU",
    descriptionLine: "Pre-blended ready-to-use fast-drying screed — conventional workability time — faster drying than standard cement — bonded and floating — suited to larger pour areas where Mapecem Pronto workability window is too short",
    productType: "Pre-blended fast-drying screed — conventional open time — Australian formulation",
    filterTags: ["Pre-blended", "Bonded", "Unbonded", "Pre-membrane", "Falls-correction", "Large-area", "Mapei-system"],
    techChips: [
      { label: "Pre-blended — water only", cls: "bg-sky-100 text-sky-800" },
      { label: "Conventional workability time", cls: "bg-green-50 text-green-700" },
      { label: "Faster drying than cement", cls: "bg-slate-100 text-slate-700" },
      { label: "Bonded and floating", cls: "bg-slate-100 text-slate-700" },
      { label: "Suited to larger pours", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Mapei Topcem Pronto AU is Mapei's Australian-formulation pre-blended screed binder that provides a conventional workability time — similar to a standard cement-based mortar — while drying significantly faster than conventional Portland cement screeds. This is the key difference from Mapecem Pronto: Mapecem Pronto sets very quickly (tile over in 3 hours) but has only a 20–30 minute workability window, which can be too short for larger balcony pours or where a smaller crew is placing and finishing the screed. Topcem Pronto AU gives the applicator the familiar working time of a conventional cement mortar without the long drying delays of a standard cement screed — bridging the gap between fast-set and conventional products.\n\nOn larger balcony terraces and podium slabs where multiple batches must be placed sequentially, or where the finishing work requires more time, Topcem Pronto AU is more practical than Mapecem Pronto. On small domestic balconies or where very fast tile-over is the priority, Mapecem Pronto is the better choice.\n\nLike Mapecem Pronto, Topcem Pronto AU is a pre-blended product — only water is added on site, eliminating site batching risk. Bonded and floating/unbonded applications. Do not mix with other binders or aggregates.",
    technicalProperties: [
      "Pre-blended ready-to-use fast-drying screed — water only on site",
      "Conventional workability time — same open time as standard cement mortar — significantly longer than Mapecem Pronto's 20–30 minutes",
      "Faster drying than conventional Portland cement — earlier access and tile-over than site-batched sand-cement",
      "Bonded and floating/unbonded applications",
      "Australian-specific formulation — Topcem Pronto AU",
      "Suited to larger balcony pours where Mapecem Pronto workability window is insufficient",
    ],
    limitations: [
      "Do not mix with other binders (Mapecem, cement, lime, gypsum) or separate aggregates — water only",
      "Confirm current bonded thickness range, floating thickness range, tile-over time, and membrane-over time from the current Mapei Australia TDS — these differ from Mapecem Pronto and must be confirmed separately",
      "Saw cuts recommended for large bay installations",
      "Confirm current product specification with Mapei Australia before specifying",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply", url: "https://www.mapei.com/au" },
      { name: "Bayset", url: "https://www.bayset.com.au" },
      { name: "Kevmor", url: "https://kevmor.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem Construction Supplies",
    brandUrl: "https://www.fosroc.com.au",
    tdsUrl: "https://www.fosroc.com.au/product/cemtop-screed",
    accentColor: "#7c2d12",
    name: "Fosroc Cemtop Screed",
    descriptionLine: "Single-component ready-to-use shrinkage-compensated screed — water only on site — 3–40mm — localised falls correction prior to waterproofing membranes — Fosroc/Parchem distribution — Nitoprime 330 required",
    productType: "Single-component polymer-modified shrinkage-compensated screed — localised falls correction",
    filterTags: ["Single-component", "Bonded", "Pre-membrane", "Falls-correction", "Localised-areas", "Fosroc-Parchem"],
    techChips: [
      { label: "Single-component", cls: "bg-orange-100 text-orange-900" },
      { label: "3–40mm thickness", cls: "bg-slate-100 text-slate-700" },
      { label: "Localised falls correction", cls: "bg-green-50 text-green-700" },
      { label: "Nitoprime 330 required", cls: "bg-red-50 text-red-700" },
      { label: "Parchem distribution", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Fosroc Cemtop Screed is a single-component ready-to-use polymer-modified shrinkage-compensated screed distributed in Australia by Parchem Construction Supplies. Only water is added on site — no site batching of aggregate or polymer admixture. It is specifically confirmed for correcting falls in concrete substrates prior to the application of waterproofing membranes and floor finishes — making it directly relevant to balcony remediation.\n\nThe key characteristic that defines Cemtop Screed's position in this product group is its coverage rate: one 20kg bag covers approximately 4m² at 3mm thickness. This confirms it is best suited to localised falls correction on smaller balconies or targeted low-point correction on larger terraces — not the primary screed solution for a full large-area balcony pour. Where the required screed volume is large, ARDEX A 38, A 48, or Mapei Mapecem Pronto are more practical and economical solutions.\n\nWhere Cemtop Screed is useful: correcting isolated low points or reverse fall areas on a balcony slab before waterproofing, filling localised depressions, and providing thin falls correction in the 3–15mm range where a site-batched sand-cement screed would be impractical. The 3mm minimum is lower than most site-batched screeds can reliably achieve.\n\nNitoprime 330 primer is required on the substrate before application. Nitobond AR curing membrane is applied over the completed screed. Do not apply below 5°C or above 30°C, or in hot windy conditions. Not for structural applications.",
    technicalProperties: [
      "Single-component polymer-modified screed — water only on site — no separate aggregate or admixture required",
      "Application thickness: 3mm minimum to 40mm maximum — 3mm minimum is lower than most site-batched screeds",
      "Shrinkage compensated — dimensionally stable after cure",
      "Coverage: approximately 4m² at 3mm thickness per 20kg bag — suited to localised correction",
      "Confirmed for falls correction prior to waterproofing membranes and floor finishes",
      "Nitoprime 330 primer required on all substrates before application — Nitobond AR curing membrane applied over completed screed",
      "Application temperature: 5°C to 30°C — not in hot or windy conditions — Parchem distribution nationally",
    ],
    limitations: [
      "Localised areas only — approximately 4m² per 20kg bag at 3mm — not economical or practical for large full-balcony pours — use ARDEX A 38, A 48, or Mapecem Pronto for larger areas",
      "Nitoprime 330 primer mandatory before application — do not apply to unprimed substrate",
      "Do not apply below 5°C or above 30°C or in hot windy conditions",
      "Not a structural product — do not use for load-bearing applications",
      "Confirm minimum cure time before membrane application with Parchem technical — do not apply membrane before screed is confirmed dry",
      "Confirm current product specification, primer requirement, and bay size limits with Parchem before specifying",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — trade supply", url: "https://www.parchem.com.au" },
      { name: "Fosroc Australia — product information", url: "https://www.fosroc.com.au" },
    ],
  },
];

const ADDITIVE_PRODUCTS: Product[] = [
  {
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://ardexaustralia.com/product/ardex-abacrete/",
    accentColor: "#f97316",
    name: "ARDEX Abacrete",
    descriptionLine: "Acrylic polymer liquid additive — gauged into bonding slurry and sand-cement or ARDEX screed gauging water — improves adhesion, shear, and tensile strength of external balcony screed systems — not a standalone screed",
    productType: "POLYMER ADMIXTURE — NOT A SCREED — acrylic liquid additive for cement-based systems",
    filterTags: [],
    techChips: [
      { label: "Acrylic polymer admixture", cls: "bg-orange-100 text-orange-800" },
      { label: "Not a screed — additive only", cls: "bg-red-50 text-red-700" },
      { label: "Bonding slurry component", cls: "bg-slate-100 text-slate-700" },
      { label: "Gauging water additive", cls: "bg-slate-100 text-slate-700" },
      { label: "Non-toxic — water-based", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "ARDEX Abacrete is a non-toxic acrylic liquid polymer additive used to upgrade site-batched sand-cement screeds, renders, and granolithic toppings applied in external balcony waterproofing systems. It is not a screed product — it is an admixture gauged into the bonding slurry and gauging water of the screed mix.\n\nIn balcony screed applications, Abacrete is used in two ways: mixed with cement and water to produce the bonding slurry broomed wet onto the prepared concrete substrate before the screed mortar is applied, and added to the gauging water of the screed mortar itself to improve the screed's bond strength, shear resistance, and tensile performance. Adding Abacrete reduces the water/cement ratio of the mix while maintaining workability — producing a stronger, less permeable screed than plain water gauging.\n\nAbacrete and ARDEX WPM 405 serve the same function in ARDEX screed systems. Abacrete is acrylic-based; WPM 405 is SBR-based. Both are used interchangeably as gauging water additives and bonding slurry components in ARDEX A 38 and A 48 screed systems for external balcony use.",
    technicalProperties: [
      "Acrylic polymer liquid admixture — non-toxic — water-based",
      "Used as bonding slurry component and gauging water additive in site-batched sand-cement and ARDEX A 38/A 48 screed systems",
      "Improves shear strength, tensile bond, and water resistance of cementitious mixes",
      "Reduces water/cement ratio while maintaining workability — stronger and less permeable than plain water gauging",
      "Interchangeable with ARDEX WPM 405 in ARDEX screed systems",
    ],
    limitations: [
      "Not a standalone screed — must be gauged into cement-based mixes at the correct dosage from the current TDS",
      "Confirm dosage rate with current ARDEX Abacrete TDS before specifying — incorrect dosage reduces performance",
      "Confirm current product specification with ARDEX Australia",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply", url: "https://www.ardex.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
      { name: "TradieCart", url: "https://www.tradiecart.com.au" },
    ],
  },
  {
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://ardexaustralia.com/product/ardex-wpm-405/",
    accentColor: "#f97316",
    name: "ARDEX WPM 405",
    descriptionLine: "Concentrated SBR liquid polymer admixture — gauged into bonding slurry, sand-cement screeds, renders, and repair mortars — also functions as temporary waterproofing sealer — not a standalone screed",
    productType: "POLYMER ADMIXTURE — NOT A SCREED — concentrated SBR liquid additive for cement-based systems",
    filterTags: [],
    techChips: [
      { label: "SBR polymer admixture", cls: "bg-orange-100 text-orange-800" },
      { label: "Not a screed — additive only", cls: "bg-red-50 text-red-700" },
      { label: "Concentrated", cls: "bg-slate-100 text-slate-700" },
      { label: "Temporary waterproof sealer", cls: "bg-sky-50 text-sky-700" },
      { label: "Water-based", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "ARDEX WPM 405 (Sheltercrete Additive) is a concentrated SBR (styrene-butadiene rubber) polymer liquid admixture used to improve bond strength, flexibility, and water resistance of site-batched sand-cement mortars, screeds, and renders. Like Abacrete, it is not a screed — it is a polymer admixture that is gauged into cement-based mixes.\n\nWPM 405 is used interchangeably with Abacrete in ARDEX A 38 and A 48 balcony screed systems as a bonding slurry component and gauging water additive. The SBR chemistry of WPM 405 gives it one additional capability not shared by Abacrete: when mixed with cement and applied as a two-coat surface treatment at 12m² per litre per coat, WPM 405 functions as a temporary waterproofing sealer on external substrates — useful for protecting a freshly placed screed from rain before the permanent waterproofing membrane is installed, or for temporarily sealing a prepared substrate between stages of a multi-stage remediation programme.\n\nThis temporary sealing function distinguishes WPM 405 from Abacrete — but confirm any temporary waterproofing application with ARDEX technical before relying on it as a weather protection measure.",
    technicalProperties: [
      "Concentrated SBR polymer liquid admixture — water-based — non-toxic",
      "Used as bonding slurry component and gauging water additive in ARDEX A 38, A 48, and site-batched sand-cement screeds",
      "Improves bond strength, flexibility, and water resistance",
      "Also functions as a temporary waterproofing sealer when mixed with cement and applied at 12m²/L per coat (2 coats)",
      "Interchangeable with Abacrete in ARDEX screed bonding and gauging applications",
    ],
    limitations: [
      "Not a standalone screed — must be gauged into cement-based mixes at the correct dosage",
      "Temporary waterproofing sealing is not a substitute for a classified membrane — confirm with ARDEX technical before use for weather protection",
      "Confirm current dosage rate and dilution ratio with ARDEX WPM 405 TDS before specifying",
      "Confirm current product specification with ARDEX Australia",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply", url: "https://www.ardex.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "TradieCart", url: "https://www.tradiecart.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Rapid-set", label: "Rapid-set" },
  { id: "Site-batched", label: "Site-batched (binder + sand)" },
  { id: "Pre-mixed", label: "Pre-mixed (cement + aggregate)" },
  { id: "Pre-blended", label: "Pre-blended (water only)" },
  { id: "Single-component", label: "Single-component" },
  { id: "Bonded", label: "Bonded" },
  { id: "Unbonded", label: "Unbonded / floating" },
  { id: "Pre-membrane", label: "Pre-membrane (falls correction)" },
  { id: "Over-membrane", label: "Over-membrane (unbonded topping)" },
  { id: "Falls-correction", label: "Falls correction" },
  { id: "Fast-tile-over", label: "Fast tile-over" },
  { id: "Large-area", label: "Large balcony areas" },
  { id: "Domestic-small", label: "Domestic / smaller balconies" },
  { id: "Localised-areas", label: "Localised / targeted correction" },
  { id: "Internal-external", label: "Internal and external" },
  { id: "ARDEX-system", label: "ARDEX system" },
  { id: "Mapei-system", label: "Mapei system" },
  { id: "Fosroc-Parchem", label: "Fosroc / Parchem" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  type: string;
  mixingOnSite: string;
  thicknessRange: string;
  tileOver: string;
  systemPosition: string;
  suitableLargeArea: string;
}[] = [
  {
    product: "A 38",
    brand: "ARDEX",
    type: "Rapid-set screed binder — site-batched",
    mixingOnSite: "Binder + sand + water + polymer additive",
    thicknessRange: "Bonded ~15mm min / Unbonded ~35mm min preferably 40mm",
    tileOver: "~8 hours",
    systemPosition: "Pre-membrane falls or over-membrane unbonded topping",
    suitableLargeArea: "Yes",
  },
  {
    product: "A 48",
    brand: "ARDEX",
    type: "Rapid-set pre-mixed screed",
    mixingOnSite: "Pre-mixed + water (+ polymer additive for external)",
    thicknessRange: "Confirm with ARDEX TDS",
    tileOver: "~4 hours",
    systemPosition: "Pre-membrane falls or over-membrane unbonded topping",
    suitableLargeArea: "Domestic and smaller areas",
  },
  {
    product: "Mapecem Pronto",
    brand: "Mapei",
    type: "Pre-blended rapid-setting screed",
    mixingOnSite: "Water only — 1.5–1.7L per 20kg",
    thicknessRange: "Bonded 10–50mm / Floating 35–70mm",
    tileOver: "3 hours (ceramic / stone)",
    systemPosition: "Pre-membrane falls correction",
    suitableLargeArea: "Yes",
  },
  {
    product: "Topcem Pronto AU",
    brand: "Mapei",
    type: "Pre-blended fast-drying screed",
    mixingOnSite: "Water only",
    thicknessRange: "Confirm with Mapei AU TDS",
    tileOver: "Confirm with Mapei AU TDS",
    systemPosition: "Pre-membrane falls correction",
    suitableLargeArea: "Yes — better for larger pours than Mapecem Pronto",
  },
  {
    product: "Cemtop Screed",
    brand: "Fosroc / Parchem",
    type: "Single-component polymer-modified screed",
    mixingOnSite: "Water only",
    thicknessRange: "3–40mm",
    tileOver: "Confirm with Parchem TDS",
    systemPosition: "Pre-membrane localised falls correction",
    suitableLargeArea: "Localised areas only — ~4m² per 20kg at 3mm",
  },
  {
    product: "Abacrete",
    brand: "ARDEX",
    type: "Acrylic polymer admixture — NOT a screed",
    mixingOnSite: "Gauged into cement mix",
    thicknessRange: "N/A",
    tileOver: "N/A",
    systemPosition: "Bonding slurry and gauging water — A 38/A 48 and sand-cement systems",
    suitableLargeArea: "Supporting additive only",
  },
  {
    product: "WPM 405",
    brand: "ARDEX",
    type: "SBR polymer admixture — NOT a screed",
    mixingOnSite: "Gauged into cement mix",
    thicknessRange: "N/A",
    tileOver: "N/A",
    systemPosition: "Bonding slurry, gauging water, and temporary weatherproof sealer",
    suitableLargeArea: "Supporting additive only",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Pre-membrane falls correction on balcony and terrace slabs where the existing concrete does not drain correctly to the floor waste — mandatory where reverse falls or inadequate falls are identified",
    "Over-membrane unbonded protection topping applied over cured liquid-applied waterproofing membranes on external balcony and podium slabs — A 38 and A 48 only",
    "Filling depressions, low points, and localised reverse fall areas on concrete balcony substrates prior to waterproofing",
    "Localised falls correction in the 3–15mm range using single-component pre-mixed systems on smaller balconies or targeted areas",
    "Polymer-upgraded site-batched sand-cement screeds on larger commercial balcony, terrace, and podium slabs using Abacrete or WPM 405 admixtures",
  ],
  selectionCriteria: [
    "Screed position in the system — confirm whether screed is pre-membrane (bonded to concrete) or over-membrane (unbonded, on slip sheet) — this changes product selection, thickness, and bonding requirements entirely",
    "Thickness required — minimum bonded ~15mm (A 38); minimum unbonded typically 35–40mm — confirm from current TDS for each product",
    "Workability time — Mapecem Pronto has 20–30 min workability; Topcem Pronto AU has conventional workability — critical for larger pours and smaller crews",
    "Falls requirement — 1:100 minimum per AS 3740 — target 1:60 to 1:80 to allow for construction tolerance — falls must be formed in the screed, not compensated by tile adhesive thickness",
    "Tile-over time — A 48 tiles in ~4 hours, Mapecem Pronto in 3 hours, A 38 in ~8 hours — confirm against programme before selecting product",
    "Polymer additive requirement — mandatory for external balcony use for ARDEX A 38 and A 48 — confirm dosage from current TDS",
    "Membrane cure and moisture check — all screeds must reach acceptable moisture content before membrane application — measure and record before commencing membrane",
  ],
  limitations: [
    "Do not apply ARDEX Ardurapid-based self-levelling compounds for external balcony use — these are internal products and are not approved for external above-ground waterproofing systems",
    "Do not bond screeds directly to liquid-applied waterproofing membranes without a double-layer polyethylene slip sheet — not approved in standard ARDEX systems",
    "Do not apply waterproofing membrane over wet screed — wet screed under a membrane is one of the most common causes of bubbling and delamination on balcony remediation",
    "Do not use Cemtop Screed as the primary solution for large-area full-balcony pours — it is suited to localised correction only (~4m² per 20kg bag at 3mm)",
    "Do not substitute sand-cement screed for a specifically engineered rapid-set screed where programme constraints require early tile-over",
    "Do not vary tile adhesive bed thickness to compensate for inadequate falls — falls must be formed in the screed layer",
  ],
  standardsNotes: [
    "AS 3740 — minimum fall 1:100 to floor waste for external above-ground areas — specifiers typically target 1:60 to 1:80 to allow for construction tolerance",
    "AS 3958 — minimum screed thickness approximately 15mm for bonded applications",
    "AS 1884 — moisture measurement before floor coverings — measure and record screed moisture content before membrane commences — this is a mandatory hold point",
    "Bonding slurry must be applied wet and screed placed wet-on-wet — if slurry dries, re-slurry before proceeding — this is a field hold point",
    "Slip sheet installation for over-membrane applications is a hold point — double-layer polyethylene minimum 200 micron each layer, top layer at right angles to base layer",
    "Saw cuts to one-third screed depth required for large bays — plan bay sizes before screed pour commences",
  ],
  suitableDefects: [
    "Balcony waterproofing failure where inadequate falls or reverse falls on the concrete slab are contributing to water ponding and membrane failure",
    "Falls correction on existing balcony slabs identified during defect inspection — falls established in screed layer before membrane replacement",
    "Low points and isolated depressions on balcony substrates identified during level survey prior to waterproofing remediation",
    "Over-membrane protection topping requirement on exposed podium and terrace waterproofing systems after membrane installation",
    "Falls defect identified in post-construction defect inspection on Class 2 strata buildings under the Home Building Act 1989 or Design and Building Practitioners Act 2020",
  ],
  typicalSubstrates: [
    "In-situ reinforced concrete — minimum 28 days cure — mechanically prepared by grinding, scarifying, or shot-blasting — clean and free of laitance before bonding slurry and screed",
    "Existing concrete balcony slabs on remediation projects — must be structurally sound and well-bonded — delaminated areas repaired before screed",
    "Cured liquid-applied waterproofing membranes — for over-membrane unbonded applications only — covered with double-layer polyethylene slip sheet (minimum 200 micron) before screed",
    "Existing bonded screed that is structurally sound — confirm compatibility and primer requirements with manufacturer before applying new screed over existing",
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

export function ScreedIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are polymer-modified screed systems — balcony waterproofing?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Polymer-modified screeds are cement-based levelling and falls-correction materials gauged with a polymer admixture — either factory pre-blended (bagged rapid-set screeds such as ARDEX A 38 or Mapei Mapecem Pronto) or site-batched with a polymer liquid admixture added to a sand-cement mix (such as ARDEX Abacrete or ARDEX WPM 405 admixture). The polymer modification improves adhesion to the substrate, reduces shrinkage cracking, and increases the water resistance of the screed layer itself.
        </p>
        {expanded && (
          <>
            <p>
              In balcony and terrace waterproofing remediation on Class 2 strata buildings, screeds serve one of two distinct system positions:
            </p>
            <p>
              Product selection must confirm: screed position (pre- or over-membrane), minimum and maximum application thickness, compressive strength, whether the product is suitable for external exposure, whether polymer admixture is factory pre-blended or site-added, primer requirements, tile-over time, movement joint requirements, and maximum bay size.
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

function ProductCard({ product }: { product: Product }) {
  return (
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

      <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
        <p className="whitespace-pre-line text-xs leading-6 text-slate-700">{product.systemDescription}</p>
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

      <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-4">
        <p className="mb-3 text-[10px] uppercase tracking-wider text-slate-400">PROCUREMENT SOURCES</p>
        <div className="space-y-2">
          {product.procurementSources.map((src) => (
            <div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs">
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900"
              >
                {src.name}
                <ExternalLink size={9} className="text-slate-300" />
              </a>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[10px] italic text-slate-400">
          Confirm suitability with the current manufacturer TDS before specifying or applying.
        </p>
      </div>
    </div>
  );
}

export function ScreedProductSection() {
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
      ? SCREED_PRODUCTS
      : SCREED_PRODUCTS.filter((p) =>
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
              Falls, screed position, bonding, over-membrane compatibility, bay sizes, cure times, standards
            </p>
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
              <TechCard icon={<BookOpen size={15} />} title="Standards &amp; Hold Points" items={TECH_INFO.standardsNotes} style="bullet" />
              <TechCard icon={<CheckCircle size={15} />} title="Suitable Defects" items={TECH_INFO.suitableDefects} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="Typical Substrates" items={TECH_INFO.typicalSubstrates} style="bullet" />
            </div>
          </div>
        )}
      </div>

      {/* ── Product Reference — Screed Products ── */}
      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">5 screed products — 2 polymer additives — 3 brands — confirm system compatibility before specifying — scroll to view all</p>
          </div>
        </div>

        {/* Filter chips */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter screeds by:</span>
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
            {visibleProducts.length} screed product{visibleProducts.length !== 1 ? "s" : ""} — 3 visible, scroll for more
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

        {/* Scrollable screed card row */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {visibleProducts.map((product) => (
            <div key={product.name} className="flex-none" style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>


      {/* ── Supporting products — polymer additives ── */}
      <div>
        <div className="mb-5 flex items-center gap-4 rounded-2xl border border-slate-300 bg-slate-100 px-6 py-4">
          <div className="h-5 w-1 shrink-0 rounded-full bg-slate-500" />
          <div>
            <p className="text-sm font-extrabold text-slate-700">Supporting products — polymer additives for site-batched sand-cement and ARDEX screed systems</p>
            <p className="mt-0.5 text-xs font-semibold text-slate-500">Not standalone screeds — gauged into cement-based mixes only — do not apply neat</p>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {ADDITIVE_PRODUCTS.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </div>

      {/* ── System Comparison ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Screed and Additive System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of polymer-modified screed systems and supporting additives. Confirm all product selections against the current manufacturer TDS before specifying.
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
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Mixing on site</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Thickness range</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Tile-over</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System position</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Suitable large areas</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600">{row.mixingOnSite}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.thicknessRange}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.tileOver}</td>
                  <td className="px-4 py-3 text-slate-600">{row.systemPosition}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.suitableLargeArea === "Yes" ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-green-700">
                        <CheckCircle size={11} /> Yes
                      </span>
                    ) : row.suitableLargeArea.startsWith("Yes") ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-green-700">
                        <CheckCircle size={11} /> {row.suitableLargeArea}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 font-semibold text-slate-500">
                        <XCircle size={11} /> {row.suitableLargeArea}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
