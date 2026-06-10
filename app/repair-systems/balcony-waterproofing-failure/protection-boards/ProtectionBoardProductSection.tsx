"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "XPS-foam-board"
  | "Extruded-polystyrene"
  | "Membrane-protection"
  | "Screed-over-membrane"
  | "Post-membrane"
  | "Compressive-strength"
  | "Balcony-and-terrace"
  | "Podium-slab"
  | "Moisture-resistant"
  | "Lightweight"
  | "Uncoupling-mat"
  | "Polyethylene"
  | "Tile-directly-over"
  | "Vapour-management"
  | "Drainage-void"
  | "Schluter-compatible"
  | "Dimple-mat"
  | "HDPE"
  | "Drainage-and-protection"
  | "Roof-deck"
  | "Growing-medium"
  | "Root-resistant"
  | "Composite-protection-board"
  | "Root-barrier"
  | "Green-roof"
  | "Torch-on-compatible"
  | "Geocomposite"
  | "Filter-fabric-bonded"
  | "Single-layer-drainage"
  | "Confirm-availability"
  | "Fluted-polyethylene"
  | "Corflute-type"
  | "ARDEX-system"
  | "Below-grade";

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
    fullLabel: "Owens Corning / various — confirm with supplier",
    brandUrl: "https://www.wpdgroup.com.au",
    accentColor: "#f59e0b",
    name: "Foamular XPS Extruded Polystyrene Protection Board",
    descriptionLine: "Extruded polystyrene (XPS) rigid foam protection board — placed over cured waterproofing membrane before screed or paver installation — moisture resistant — confirm compressive strength against applied loading before specifying",
    productType: "XPS extruded polystyrene rigid foam protection board — moisture resistant",
    filterTags: ["XPS-foam-board", "Extruded-polystyrene", "Membrane-protection", "Screed-over-membrane", "Post-membrane", "Compressive-strength", "Balcony-and-terrace", "Podium-slab", "Moisture-resistant", "Lightweight"],
    techChips: [
      { label: "XPS foam board", cls: "bg-amber-100 text-amber-800" },
      { label: "Moisture resistant", cls: "bg-slate-100 text-slate-700" },
      { label: "Multiple compressive strength grades", cls: "bg-green-50 text-green-700" },
      { label: "Placed loose — not bonded", cls: "bg-slate-100 text-slate-700" },
      { label: "Balcony / terrace / podium", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Extruded polystyrene (XPS) rigid foam board is the standard protection board material for over-membrane screed applications on balconies, terraces, and podium slabs. XPS is moisture resistant, dimensionally stable, and available in a range of thicknesses and compressive strength grades. Placed loose over the cured and inspected waterproofing membrane before screed is applied, the XPS board protects the membrane surface from puncture, abrasion, and point loading during screed placement and compaction.\n\nIn balcony waterproofing remediation, XPS protection board is most commonly specified over torch-on modified bitumen sheet membrane systems before a polymer-modified screed topping (ARDEX A 38, Mapecem Pronto) is placed above. It is also used on podium slab applications where a drainage layer or growing medium is to be placed above the membrane. XPS is not a drainage layer — it does not provide a drainage void above the membrane. Where drainage through the protection layer is also required, specify a dimple mat system instead.\n\nConfirm compressive strength of the selected XPS board against the loading above — screed, paver, or growing medium weight — before specifying. XPS is available in multiple compressive strength grades (typically 200 kPa, 300 kPa, 500 kPa) — the correct grade must match the applied load.",
    technicalProperties: [
      "Extruded polystyrene (XPS) rigid foam — moisture resistant — dimensionally stable",
      "Available in multiple thicknesses (typically 20mm, 30mm, 50mm) and compressive strength grades",
      "Placed loose over cured membrane — not bonded in standard applications",
      "Suitable for balcony, terrace, and podium slab over-membrane protection",
      "Lightweight — does not add significant dead load to the structure",
      "Not a drainage layer — does not provide drainage void",
    ],
    limitations: [
      "Not a drainage product — where drainage through the protection layer is required, specify dimple mat instead",
      "Compressive strength grade must be confirmed against the applied loading — do not specify the lowest grade without checking the load",
      "Not suitable as a standalone finish — must be covered by screed, paver, or ballast",
      "Confirm membrane compatibility — XPS is placed loose in most applications but confirm with the membrane manufacturer that the XPS board material is not chemically aggressive to the membrane surface",
      "Confirm current product availability, thickness, and compressive strength grades with local supplier before specifying",
    ],
    procurementSources: [
      { name: "Confirm with local insulation and waterproofing trade suppliers", url: "https://www.wpdgroup.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
    ],
  },
  {
    fullLabel: "Schlüter-Systems Australia",
    brandUrl: "https://www.schlueter.com.au",
    tdsUrl: "https://www.schlueter.com.au/products/uncoupling-membranes/ditra",
    accentColor: "#0369a1",
    name: "Schlüter DITRA / DITRA-HEAT — Uncoupling and Protection Mat",
    descriptionLine: "Polyethylene uncoupling and protection mat — placed over cured waterproofing membrane before tiling — provides uncoupling, drainage void, and membrane protection — Schlüter system — confirm external balcony suitability with Schlüter Australia",
    productType: "Polyethylene uncoupling mat — tile-over system — Schlüter",
    filterTags: ["Uncoupling-mat", "Polyethylene", "Membrane-protection", "Post-membrane", "Tile-directly-over", "Vapour-management", "Balcony-and-terrace", "Schluter-compatible", "Drainage-void"],
    techChips: [
      { label: "Uncoupling mat", cls: "bg-sky-100 text-sky-800" },
      { label: "Polyethylene — waffle cavity", cls: "bg-slate-100 text-slate-700" },
      { label: "Drainage void above membrane", cls: "bg-green-50 text-green-700" },
      { label: "Tile adhesive into waffle profile", cls: "bg-slate-100 text-slate-700" },
      { label: "Confirm external balcony suitability", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Schlüter DITRA is a polyethylene mat with a waffle-profile cavity structure and a fleece bonding layer on the underside, used as an uncoupling and protection layer between the waterproofing membrane and the tile adhesive bed. The waffle cavities provide a drainage void above the membrane, allow vapour transmission, and uncouple the tile layer from the membrane substrate — reducing the risk of tile cracking under differential thermal movement between the tile and the substrate.\n\nIn balcony waterproofing remediation, DITRA may be specified over a cured KERDI or liquid-applied membrane where uncoupling and drainage void are required below the tile layer. The tile adhesive is applied into and over the DITRA waffle profile, bonding the tile to the mat rather than directly to the membrane surface. This system is used where the membrane or substrate has characteristics that benefit from uncoupling — thermal movement, residual moisture, or substrate variability.\n\nConfirm with Schlüter Australia that DITRA is appropriate and rated for the specific external balcony application and membrane system before specifying. DITRA is primarily an internal product in some configurations — external balcony suitability must be confirmed.",
    technicalProperties: [
      "Polyethylene uncoupling mat — waffle cavity profile — fleece bonding layer on underside",
      "Provides uncoupling, drainage void, and membrane protection in a single layer",
      "Tile adhesive applied into the waffle cavities — tiles bonded to the mat surface",
      "Compatible with Schlüter KERDI membrane system — confirm compatibility with other liquid-applied membranes",
      "Available in standard roll widths — confirm sizing with Schlüter Australia",
    ],
    limitations: [
      "Confirm external balcony suitability with Schlüter Australia before specifying — not all DITRA configurations are rated for external exposed conditions",
      "Confirm membrane compatibility with membrane manufacturer — DITRA is primarily designed for the KERDI system",
      "Not a standalone waterproofing product — must be used over a correctly applied and cured waterproofing membrane",
      "Confirm current product range, external suitability, and pricing with Schlüter Australia before specifying",
    ],
    procurementSources: [
      { name: "Schlüter-Systems Australia", url: "https://www.schlueter.com.au" },
      { name: "Confirm trade distributor with Schlüter Australia", url: "https://www.schlueter.com.au" },
      { name: "TradieCart", url: "https://www.tradiecart.com.au" },
    ],
  },
  {
    fullLabel: "Reln / various — confirm with supplier",
    brandUrl: "https://www.reln.com.au",
    accentColor: "#16a34a",
    name: "Reln Dimple Mat / HDPE Drainage Protection Mat",
    descriptionLine: "HDPE dimple mat — drainage and membrane protection in a single layer — placed over cured membrane on podium slabs, roof decks, and planter boxes — provides drainage void above the membrane while protecting membrane surface",
    productType: "HDPE dimple mat — drainage and protection — podium, roof deck, planter box",
    filterTags: ["Dimple-mat", "HDPE", "Drainage-and-protection", "Post-membrane", "Podium-slab", "Roof-deck", "Growing-medium", "Drainage-void", "Root-resistant", "Lightweight"],
    techChips: [
      { label: "HDPE dimple mat", cls: "bg-green-100 text-green-800" },
      { label: "Drainage void + protection", cls: "bg-slate-100 text-slate-700" },
      { label: "Podium / roof deck / planter", cls: "bg-green-50 text-green-700" },
      { label: "Root resistant", cls: "bg-slate-100 text-slate-700" },
      { label: "Specify with filter fabric above", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "HDPE dimple mat is a dual-function product — it provides both membrane protection and a drainage void above the waterproofing membrane in a single layer. The raised dimple profile creates a continuous drainage channel above the membrane surface, allowing water to flow laterally to the drainage outlets while the dimple body intercepts point loads and protects the membrane from damage during backfill, growing medium placement, or paver installation.\n\nIn balcony waterproofing remediation, dimple mat is used primarily on podium slabs, roof decks, and planter box applications where a drainage layer above the membrane is required as well as membrane protection. It is not typically used on standard residential balconies with a tile finish, where a protection board or no board (confirm with membrane manufacturer) is the appropriate specification. On podium slabs with pavers on pedestals or growing medium above, dimple mat is the standard protection and drainage layer directly above the membrane.\n\nAvailable in various dimple heights — confirm dimple height against the required drainage capacity for the project area and rainfall intensity. Filter fabric is typically placed above the dimple mat to prevent fine particles from the growing medium or ballast clogging the drainage void — specify filter fabric in conjunction with dimple mat on planter and green roof applications.",
    technicalProperties: [
      "HDPE dimple mat — drainage void above membrane and physical protection in one layer",
      "Dimple profile creates continuous lateral drainage channel above membrane",
      "Suitable for podium slabs, roof decks, planter boxes, and green roof applications",
      "Available in various dimple heights — confirm drainage capacity against project requirements",
      "Lightweight — does not add significant dead load",
      "Root resistant — suitable for use under growing medium",
    ],
    limitations: [
      "Not typically required on standard residential balconies with tile finish — confirm with membrane manufacturer and project specification",
      "Filter fabric required above dimple mat on planter and green roof applications — specify together",
      "Confirm dimple height and drainage capacity against the project rainfall intensity and drainage design",
      "Not a structural product — does not provide load distribution equivalent to rigid board for heavy paver or ballast applications — confirm compressive strength with supplier",
      "Confirm current product availability, dimple height options, and pricing with supplier before specifying",
    ],
    procurementSources: [
      { name: "Reln Australia", url: "https://www.reln.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
      { name: "Confirm with local drainage and waterproofing trade suppliers", url: "https://www.reln.com.au" },
    ],
  },
  {
    fullLabel: "Alwitra / various — confirm with supplier",
    brandUrl: "https://www.alwitra.de/en",
    accentColor: "#7c3aed",
    name: "Alwitra Evalon Protection Board / Composite Root Barrier",
    descriptionLine: "Composite protection and root barrier board — physical membrane protection combined with root penetration resistance — podium slab, planter box, and green roof applications over sheet membrane systems — confirm Australian availability with distributor",
    productType: "Composite protection board with root barrier — podium, green roof, planted terrace",
    filterTags: ["Composite-protection-board", "Root-barrier", "Podium-slab", "Green-roof", "Post-membrane", "Torch-on-compatible", "Membrane-protection", "Confirm-availability"],
    techChips: [
      { label: "Composite root barrier board", cls: "bg-violet-100 text-violet-800" },
      { label: "Physical + root protection", cls: "bg-slate-100 text-slate-700" },
      { label: "Podium / green roof / planter", cls: "bg-green-50 text-green-700" },
      { label: "Sheet membrane compatible", cls: "bg-slate-100 text-slate-700" },
      { label: "Confirm Australian availability", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Composite protection boards combining physical membrane protection with integrated root barrier properties are used on podium planter boxes, green roofs, and intensively planted terrace applications where root penetration resistance is required in addition to physical protection of the waterproofing membrane. Alwitra and similar manufacturers produce composite boards for use over modified bitumen sheet membrane systems on podium and roof deck applications.\n\nThe composite board is placed over the cured and inspected membrane before the drainage layer, filter fabric, and growing medium are installed. The root barrier element prevents root tips from penetrating the protection board and reaching the membrane below — relevant where trees, shrubs, or deep-rooted plants are specified above the waterproofing system.\n\nConfirm with the Alwitra Australian distributor or the project waterproofing consultant that the selected composite protection board is appropriate for the specific membrane system, plant species, and growing medium depth on the project. Root barrier performance requirements vary by plant type — confirm with the landscape architect and waterproofing consultant before specifying.",
    technicalProperties: [
      "Composite protection board with integrated root barrier layer",
      "Physical membrane protection combined with root penetration resistance",
      "Suitable for podium slab, planter box, and green roof applications over sheet membrane systems",
      "Compatible with torch-on and cold-applied sheet membrane systems — confirm with distributor",
      "Placed loose over cured membrane before drainage layer and growing medium",
    ],
    limitations: [
      "Confirm Australian availability with Alwitra distributor or equivalent local supplier before specifying",
      "Root barrier performance must be confirmed against the plant species and growing medium depth specified by the landscape architect",
      "Not required on standard residential balcony applications — specified for planted podium and roof deck applications",
      "Confirm compatibility with the specific membrane system with both the protection board supplier and the membrane manufacturer",
      "Confirm current product name, specification, and Australian distributor before specifying",
    ],
    procurementSources: [
      { name: "Alwitra — confirm Australian distributor via alwitra.de/en", url: "https://www.alwitra.de/en" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "Confirm with local waterproofing and green roof trade suppliers", url: "https://www.wpdgroup.com.au" },
    ],
  },
  {
    fullLabel: "Colbond / Enka — confirm Australian distributor",
    brandUrl: "https://www.wpdgroup.com.au",
    accentColor: "#0891b2",
    name: "Enkadrain / Geocomposite Drainage and Protection Mat",
    descriptionLine: "Geocomposite drainage and protection mat with bonded filter fabric — single layer providing drainage, filtration, and membrane protection — podium slab, roof deck, and green roof applications — confirm Australian availability before specifying",
    productType: "Geocomposite — drainage core + bonded geotextile — podium, roof deck, green roof",
    filterTags: ["Geocomposite", "Filter-fabric-bonded", "Drainage-and-protection", "Post-membrane", "Podium-slab", "Roof-deck", "Single-layer-drainage", "Growing-medium", "Green-roof", "Confirm-availability"],
    techChips: [
      { label: "Geocomposite drainage mat", cls: "bg-cyan-100 text-cyan-800" },
      { label: "Drainage core + geotextile", cls: "bg-slate-100 text-slate-700" },
      { label: "Single layer — drainage + filtration + protection", cls: "bg-green-50 text-green-700" },
      { label: "Podium / roof deck / green roof", cls: "bg-slate-100 text-slate-700" },
      { label: "Confirm Australian availability", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Geocomposite drainage and protection mats (such as Enkadrain and similar products) combine a three-dimensional drainage core with a bonded geotextile filter fabric in a single prefabricated layer. The drainage core provides lateral water movement above the membrane, the filter fabric prevents fine particles from the growing medium migrating into the drainage void, and the mat body provides physical protection to the membrane surface — all in a single product, eliminating the need to specify separate protection board, dimple mat, and filter fabric layers.\n\nOn podium slabs, roof decks, and planted terrace applications in Australian strata remediation, geocomposite mats are used where the project specification requires a single-layer, factory-manufactured drainage and protection solution above the membrane. They are particularly suited to green roof and podium planter applications where installation speed and product layer reduction are project priorities.\n\nConfirm Australian availability with a local geotextile or waterproofing trade supplier before specifying. The geocomposite market in Australia is served by several international brands through local distribution — confirm the specific product range, drainage capacity, and availability with the local supplier.",
    technicalProperties: [
      "Geocomposite — three-dimensional drainage core with bonded geotextile filter fabric",
      "Provides drainage, filtration, and membrane protection in a single layer",
      "Suitable for podium slab, roof deck, and green roof applications",
      "Eliminates need for separate protection board, dimple mat, and filter fabric layers",
      "Available in standard roll widths — confirm sizing and drainage capacity with supplier",
    ],
    limitations: [
      "Confirm Australian availability and specific product range with local distributor before specifying",
      "Drainage capacity must be confirmed against the project rainfall intensity and drainage design",
      "Not typically required on standard residential balconies with tile finish",
      "Confirm compatibility with the specific membrane system with both the geocomposite supplier and the membrane manufacturer",
      "Confirm current product name, specification, and pricing with local supplier before specifying",
    ],
    procurementSources: [
      { name: "Confirm with local geotextile and waterproofing trade suppliers", url: "https://www.wpdgroup.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "Confirm with hydraulic engineer or waterproofing consultant for podium and green roof applications", url: "https://www.wpdgroup.com.au" },
    ],
  },
  {
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://ardexaustralia.com/product/ardex-protection-board/",
    accentColor: "#f97316",
    name: "ARDEX Protection Board",
    descriptionLine: "Fluted polyethylene protection board — 1,830 × 1,220mm — placed over cured ARDEX membrane before backfill or screed — protects membrane from mechanical damage during subsequent construction — black or natural",
    productType: "Fluted polyethylene (corflute-type) protection board — ARDEX membrane systems",
    filterTags: ["Fluted-polyethylene", "Corflute-type", "Membrane-protection", "Screed-over-membrane", "Post-membrane", "ARDEX-system", "Balcony-and-terrace", "Below-grade", "Lightweight"],
    techChips: [
      { label: "Fluted polyethylene — corflute-type", cls: "bg-orange-100 text-orange-800" },
      { label: "2.5mm / 350gsm", cls: "bg-slate-100 text-slate-700" },
      { label: "1,830 × 1,220mm — packs of 25", cls: "bg-green-50 text-green-700" },
      { label: "Black or natural", cls: "bg-slate-100 text-slate-700" },
      { label: "ARDEX system — confirm requirement with ARDEX technical", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "ARDEX Protection Board is a fluted polyethylene (corflute-type) board placed over the cured waterproofing membrane after membrane installation and before backfilling, screed placement, or any subsequent construction activity that would impose mechanical damage, puncture, or abrasion on the membrane surface. It is ARDEX Australia's dedicated membrane protection board, sold as part of the ARDEX waterproofing system.\n\nBoards are 1,830 × 1,220mm, 2.5mm thick at 350gsm, available in black or natural, sold in packs of 25. The fluted profile distributes point loads and intercepts sharp aggregate, tools, and site traffic before they reach the membrane surface. Placed loose over the cured membrane — not bonded. Boards are lapped and joined with PVC duct tape only — no mechanical fixings that would puncture the board or the membrane below.\n\nIn balcony and terrace waterproofing remediation, ARDEX Protection Board is specified over ARDEX torch-on and liquid-applied membrane systems where screed or paver topping is to follow, and in below-grade applications where backfill is placed against the membrane. Confirm with ARDEX technical that the protection board is required for the specific system before specifying.",
    technicalProperties: [
      "Fluted polyethylene (corflute-type) — 2.5mm / 350gsm",
      "Board size: 1,830 × 1,220mm — sold in packs of 25",
      "Available in black or natural",
      "Loose-laid over cured ARDEX membrane — not bonded",
      "Lapped and joined with PVC duct tape — no mechanical fixings",
      "Protects membrane from mechanical damage, puncture, and abrasion during subsequent construction",
      "Suitable for balcony, terrace, and below-grade backfill applications over ARDEX membrane systems",
    ],
    limitations: [
      "Not a structural board — confirm compressive performance with ARDEX technical for heavy screed or ballast loading — do not assume it substitutes for XPS rigid board under heavy loading",
      "No mechanical fixings — PVC duct tape at laps only — mechanical fixings will puncture the board and the membrane below",
      "Membrane must be fully cured and inspected before the board is placed — once covered it cannot be accessed without removing all layers above",
      "Confirm with ARDEX technical that this product is required for the specific membrane system and application",
      "Confirm current availability and pricing with ARDEX Australia or local stockist before specifying",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply", url: "https://www.ardex.com.au" },
      { name: "TradieCart", url: "https://www.tradiecart.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "XPS-foam-board", label: "XPS foam board" },
  { id: "Extruded-polystyrene", label: "Extruded polystyrene" },
  { id: "Membrane-protection", label: "Membrane protection" },
  { id: "Screed-over-membrane", label: "Screed over membrane" },
  { id: "Post-membrane", label: "Post-membrane" },
  { id: "Compressive-strength", label: "Compressive strength" },
  { id: "Balcony-and-terrace", label: "Balcony and terrace" },
  { id: "Podium-slab", label: "Podium slab" },
  { id: "Moisture-resistant", label: "Moisture resistant" },
  { id: "Lightweight", label: "Lightweight" },
  { id: "Uncoupling-mat", label: "Uncoupling mat" },
  { id: "Polyethylene", label: "Polyethylene" },
  { id: "Tile-directly-over", label: "Tile directly over" },
  { id: "Drainage-void", label: "Drainage void" },
  { id: "Dimple-mat", label: "Dimple mat" },
  { id: "HDPE", label: "HDPE" },
  { id: "Drainage-and-protection", label: "Drainage and protection" },
  { id: "Roof-deck", label: "Roof deck" },
  { id: "Growing-medium", label: "Growing medium" },
  { id: "Root-resistant", label: "Root resistant" },
  { id: "Root-barrier", label: "Root barrier" },
  { id: "Green-roof", label: "Green roof" },
  { id: "Composite-protection-board", label: "Composite protection board" },
  { id: "Geocomposite", label: "Geocomposite" },
  { id: "Filter-fabric-bonded", label: "Filter fabric bonded" },
  { id: "Single-layer-drainage", label: "Single layer drainage" },
  { id: "Confirm-availability", label: "Confirm availability" },
  { id: "Torch-on-compatible", label: "Torch-on compatible" },
  { id: "Fluted-polyethylene", label: "Fluted polyethylene" },
  { id: "Corflute-type", label: "Corflute-type" },
  { id: "ARDEX-system", label: "ARDEX system" },
  { id: "Below-grade", label: "Below-grade" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  material: string;
  application: string;
  drainageVoid: boolean | "confirm";
  rootResistant: boolean | "confirm";
  typicalUse: string;
  keyRestriction: string;
}[] = [
  {
    product: "XPS Foam Board",
    brand: "Various",
    material: "Extruded polystyrene",
    application: "Over membrane — under screed or paver",
    drainageVoid: false,
    rootResistant: false,
    typicalUse: "Balcony, terrace, podium — screed over membrane",
    keyRestriction: "Confirm compressive strength grade against applied loading — not a drainage product",
  },
  {
    product: "Schlüter DITRA",
    brand: "Schlüter",
    material: "Polyethylene uncoupling mat",
    application: "Over membrane — under tile adhesive",
    drainageVoid: true,
    rootResistant: false,
    typicalUse: "Balcony and terrace — tile finish — uncoupling required",
    keyRestriction: "Confirm external balcony suitability and membrane compatibility with Schlüter Australia",
  },
  {
    product: "HDPE Dimple Mat",
    brand: "Reln / various",
    material: "HDPE",
    application: "Over membrane — under growing medium, ballast, or pavers",
    drainageVoid: true,
    rootResistant: false,
    typicalUse: "Podium slab, roof deck, planter box",
    keyRestriction: "Specify with filter fabric above — confirm drainage capacity — not typically for standard tiled balcony",
  },
  {
    product: "Composite Root Barrier Board",
    brand: "Alwitra / various",
    material: "Composite — confirm with supplier",
    application: "Over sheet membrane — under drainage layer and growing medium",
    drainageVoid: "confirm",
    rootResistant: true,
    typicalUse: "Podium planter, green roof, planted terrace",
    keyRestriction: "Confirm Australian availability — root barrier performance must match plant species — not for standard balcony",
  },
  {
    product: "Geocomposite Drainage Mat (Enkadrain)",
    brand: "Colbond / Enka / various",
    material: "Geocomposite — drainage core + geotextile",
    application: "Over membrane — under growing medium or ballast",
    drainageVoid: true,
    rootResistant: "confirm",
    typicalUse: "Podium slab, roof deck, green roof — single layer drainage and protection",
    keyRestriction: "Confirm Australian availability — confirm drainage capacity against project rainfall — not for standard tiled balcony",
  },
  {
    product: "ARDEX Protection Board",
    brand: "ARDEX Australia",
    material: "Fluted polyethylene (corflute-type)",
    application: "Over cured ARDEX membrane — before backfill or screed",
    drainageVoid: false,
    rootResistant: false,
    typicalUse: "Balcony, terrace, below-grade — ARDEX membrane systems",
    keyRestriction: "Not a structural board — PVC duct tape laps only — no mechanical fixings — confirm compressive performance with ARDEX for heavy loading",
  },
];

const TECH_INFO = {
  whenRequired: [
    "Over torch-on modified bitumen sheet membranes where screed, pavers, or growing medium is to be placed directly on the membrane surface",
    "On podium slabs where a granular drainage layer, growing medium, or paver system is placed over the membrane and the membrane requires ongoing protection from root penetration and physical damage",
    "On roof decks where ballast, pavers, or growing medium is placed over the membrane",
    "Where the project specification or membrane manufacturer's warranty conditions require a protection board as part of the system",
    "Where site conditions during construction mean the membrane will be subject to foot traffic or material handling over an extended period before it is covered by the final finish",
  ],
  whenNotRequired: [
    "On standard balcony remediation where a liquid-applied PU or hybrid membrane is immediately followed by tile adhesive and tile fixing with no intermediate screed or paver layer — confirm with the membrane manufacturer",
    "Some liquid-applied membranes are designed to be tiled directly without a protection board in a standard residential balcony configuration — confirm with the membrane manufacturer TDS",
    "Even where a separate protection board is not required, temporary protection of the membrane surface between application and tiling is good practice",
  ],
  materialSelection: [
    "XPS extruded polystyrene foam board — lightweight, moisture resistant, good compressive strength for screed-over-membrane applications — confirm compressive strength against the screed loading",
    "PIR polyisocyanurate rigid board — higher thermal performance than XPS — used where insulation is also required above the membrane — confirm compressive strength and moisture resistance for external applications",
    "Dimple mat (HDPE drainage protection mat) — used on podium slabs and roof decks where drainage through the protection layer is required — the dimple profile creates a drainage void above the membrane below the growing medium or ballast",
    "Composite root barrier and protection board — used on podium planter boxes, green roofs, and planter decks where root penetration resistance is required in addition to physical membrane protection",
  ],
  systemPosition: [
    "The protection board is placed over the cured and inspected waterproofing membrane — after the membrane has been flood-tested where required and confirmed defect-free",
    "The protection board is not bonded to the membrane in most applications — it sits loose on the membrane surface and is held in position by the weight of the material placed above it",
    "Confirm whether bonding is required with the protection board manufacturer for the specific application",
    "Once placed, the membrane below cannot be inspected or repaired without removing the protection board and all layers above it",
  ],
  compressiveStrength: [
    "The compressive strength of the protection board must be sufficient to resist the loads imposed by the material placed above it without transmitting point loads through to the membrane surface",
    "For screed-over applications, confirm the required compressive strength with the protection board manufacturer against the screed thickness and compaction method",
    "For ballast and paver applications on podium and roof decks, confirm with the structural engineer and waterproofing consultant",
    "XPS is available in multiple compressive strength grades — typically 200 kPa, 300 kPa, 500 kPa — the correct grade must match the applied load",
  ],
  filterFabric: [
    "On podium planter, green roof, and growing medium applications, dimple mat and geocomposite drainage mats must be covered with a filter fabric (geotextile) layer above the drainage mat and below the growing medium",
    "Without filter fabric, fine particles from the growing medium or soil will migrate into the drainage void and clog it over time, eliminating the drainage function",
    "Filter fabric is a mandatory companion product to dimple mat and geocomposite mat on all planted applications",
    "Confirm the correct filter fabric specification with the supplier or waterproofing consultant — covered separately on the Filter Fabric page",
  ],
  standards: [
    "NCC Volume One — performance requirements for waterproofing in Class 2 buildings — protection board must be part of a compliant waterproofing system",
    "AS 3740 — Waterproofing of Domestic Wet Areas — confirms waterproofing inspection and testing sequence before protection board placement",
    "Membrane manufacturer's warranty conditions — many membrane systems require the membrane to be flood-tested and certified before any protection layer is placed",
    "Structural engineer and hydraulic engineer input required for podium and roof deck applications — loading and drainage design must be confirmed before specifying protection board type",
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

export function ProtectionBoardIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are protection boards — membrane over-protection?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Protection boards are materials placed directly over a cured waterproofing membrane to protect it from physical damage during subsequent construction activities — screed placement, paver laying, tile adhesive application, backfill, and general site traffic. The membrane is the most vulnerable component of the waterproofing system during the construction phase immediately after it is applied and before it is covered by the final finish layer. A protection board intercepts mechanical damage, puncture, and abrasion that would otherwise be inflicted on the membrane surface.
        </p>
        {expanded && (
          <>
            <p>
              In balcony and terrace waterproofing remediation on Class 2 strata buildings, protection boards are used in two primary situations: over torch-on modified bitumen sheet membranes where a screed or paver topping is to be applied over the membrane, and on podium slabs and roof decks where a thick growing medium, ballast, or paver system is to be placed over the membrane and ongoing protection from root penetration, thermal stress, and physical loading is required. On standard balcony remediation where the membrane is immediately covered by tile adhesive and tiles, a separate protection board is not always required — confirm with the membrane manufacturer and the project specification.
            </p>
            <p>
              Protection board materials range from extruded polystyrene (XPS) foam board and polyisocyanurate (PIR) rigid insulation board, through to dimple mat drainage protection layers and composite root-barrier and protection boards. Material selection is governed by the compressive strength required for the loading above, the drainage characteristics required below the protection layer, and compatibility with the waterproofing membrane below.
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

export function ProtectionBoardProductSection() {
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
              When protection boards are required, material selection, compressive strength, membrane compatibility, system position, podium and roof applications
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
              <TechCard icon={<CheckCircle size={15} />} title="When Protection Boards Are Required" items={TECH_INFO.whenRequired} style="bullet" />
              <TechCard icon={<AlertTriangle size={15} />} title="When NOT Required — Confirm with Manufacturer" items={TECH_INFO.whenNotRequired} style="warn" />
              <TechCard icon={<Layers size={15} />} title="Material Selection by Application" items={TECH_INFO.materialSelection} style="bullet" />
              <TechCard icon={<SquareStack size={15} />} title="System Position" items={TECH_INFO.systemPosition} style="check" />
              <TechCard icon={<Ruler size={15} />} title="Compressive Strength" items={TECH_INFO.compressiveStrength} style="bullet" />
              <TechCard icon={<BookOpen size={15} />} title="Filter Fabric — Planted Applications" items={TECH_INFO.filterFabric} style="warn" />
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
            <p className="mt-1 text-sm text-slate-500">6 products — 5 brands — XPS foam board, fluted polyethylene, dimple mat, composite protection and drainage layers — balcony, terrace, podium, and roof deck membrane protection</p>
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
            <h2 className="text-2xl font-extrabold text-sky-950">Protection board system comparison</h2>
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of protection board systems. Confirm all product selections against the current manufacturer TDS before specifying.
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
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Application</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Drainage void</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Root resistant</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Typical use</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key restriction</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600">{row.application}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.drainageVoid === true ? (
                      <span className="inline-flex items-center gap-1 text-green-700 font-semibold"><CheckCircle size={11} /> Yes</span>
                    ) : row.drainageVoid === "confirm" ? (
                      <span className="text-slate-500 italic">Confirm with supplier</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-600 font-semibold"><XCircle size={11} /> No</span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.rootResistant === true ? (
                      <span className="inline-flex items-center gap-1 text-green-700 font-semibold"><CheckCircle size={11} /> Yes</span>
                    ) : row.rootResistant === "confirm" ? (
                      <span className="text-slate-500 italic">Confirm with supplier</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-600 font-semibold"><XCircle size={11} /> No</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.typicalUse}</td>
                  <td className="px-4 py-3 text-slate-600">{row.keyRestriction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── ALL WARNING AND CALLOUT BOXES — BELOW COMPARISON TABLE ONLY ── */}

      {/* Box 1 — Amber warning: not required on all systems */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-amber-900">Protection boards are not required on all balcony waterproofing systems — confirm with the membrane manufacturer</h3>
        </div>
        <p className="text-sm leading-7 text-amber-800">
          On standard residential balcony waterproofing remediation where a liquid-applied PU or hybrid membrane is immediately followed by tile adhesive and tile fixing, a separate protection board may not be required or specified by the membrane manufacturer. Do not automatically add a protection board to a standard tiled balcony specification without confirming it is required. Conversely, on torch-on sheet membrane systems where screed or pavers are placed above the membrane, a protection board is standard practice — confirm with the membrane manufacturer's system specification in both cases before including or omitting a protection board from the scope.
        </p>
      </div>

      {/* Box 2 — Red critical: inspect and flood test first */}
      <div className="rounded-2xl border border-red-200 bg-red-50 p-7">
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-700 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-red-900">The membrane must be inspected and flood-tested before the protection board is placed</h3>
        </div>
        <p className="text-sm leading-7 text-red-800">
          The protection board is placed over the cured and inspected waterproofing membrane. Once the protection board is in place and covered by screed, pavers, or growing medium, the membrane below cannot be inspected or repaired without removing all layers above it. The membrane must be flood-tested where required, inspected for defects, and confirmed defect-free before the protection board is installed. Do not place a protection board over an uninspected or flood-test-failed membrane — the board will conceal defects that will result in water ingress after the project is complete.
        </p>
      </div>

      {/* Box 3 — Blue informational: do not confuse with insulation boards */}
      <div className="rounded-2xl border border-sky-200 bg-sky-50 p-7">
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-700 text-white">
            <BookOpen size={15} />
          </div>
          <h3 className="text-base font-extrabold text-sky-900">Do not confuse protection boards with insulation boards</h3>
        </div>
        <p className="text-sm leading-7 text-sky-800">
          XPS and PIR rigid boards are used both as membrane protection boards and as thermal insulation in inverted roof and warm roof deck systems. The two applications have different compressive strength and moisture resistance requirements. A thermal insulation board used as a protection board must have sufficient compressive strength for the loading applied above it — a standard thermal insulation grade may not have adequate compressive strength for over-membrane screed applications. Confirm the compressive strength of the selected board against the applied loading regardless of whether the board is being used primarily for protection or insulation.
        </p>
      </div>

      {/* Box 4 — Amber warning: filter fabric required with dimple mat */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-amber-900">Dimple mat and geocomposite mats require filter fabric above them on planted applications</h3>
        </div>
        <p className="text-sm leading-7 text-amber-800">
          On podium planter, green roof, and growing medium applications, dimple mat and geocomposite drainage mats must be covered with a filter fabric (geotextile) layer above the drainage mat and below the growing medium. Without filter fabric, fine particles from the growing medium or soil will migrate down into the drainage void and clog it over time, eliminating the drainage function of the mat. Filter fabric is a mandatory companion product to dimple mat and geocomposite mat on all planted applications. It is covered separately on the Filter Fabric page — confirm the correct filter fabric specification with the supplier or waterproofing consultant.
        </p>
      </div>
    </>
  );
}
