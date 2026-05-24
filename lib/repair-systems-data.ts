// ─────────────────────────────────────────────────────────────────────────────
// REPAIR SYSTEMS — STRUCTURED DATA LAYER
// Replace sample data with Supabase queries or imported spreadsheet later.
// All exports are typed so additional products / categories can be added
// without touching page components.
// ─────────────────────────────────────────────────────────────────────────────

// ── Hub categories ────────────────────────────────────────────────────────────

export interface RepairSystemCategory {
  slug: string;
  title: string;
  description: string;
  href: string;
  imageUrl: string | null; // null = use placeholder div
  available: boolean;       // false = "Coming Soon" badge
}

export const REPAIR_SYSTEM_CATEGORIES: RepairSystemCategory[] = [
  {
    slug: "repair-mortars",
    title: "Repair Mortars",
    description:
      "Polymer-modified cementitious mortars for concrete patch repair, spall repair, and full-depth substrate reinstatement.",
    href: "/repair-systems/repair-mortars",
    imageUrl: null, // Add: /Images/RepairSystems/repair-mortars.jpg
    available: true,
  },
  {
    slug: "corrosion-inhibitors",
    title: "Corrosion Inhibitors",
    description:
      "Migrating and barrier corrosion inhibitor systems for protecting embedded steel reinforcement in carbonated or chloride-contaminated concrete.",
    href: "/repair-systems/corrosion-inhibitors",
    imageUrl: null,
    available: false,
  },
  {
    slug: "sacrificial-anodes",
    title: "Sacrificial Anodes",
    description:
      "Embedded galvanic anodes providing impressed current cathodic protection to slow or halt active corrosion in concrete structures.",
    href: "/repair-systems/sacrificial-anodes",
    imageUrl: null,
    available: false,
  },
  {
    slug: "primers-coatings",
    title: "Primers & Coatings",
    description:
      "Bonding primers, epoxy coatings, anti-carbonation coatings and protective sealers for concrete and masonry substrates.",
    href: "/repair-systems/primers-coatings",
    imageUrl: null,
    available: false,
  },
  {
    slug: "waterproofing-systems",
    title: "Waterproofing Systems",
    description:
      "Liquid membranes, sheet membranes, crystalline waterproofing and trafficable deck systems for below-ground and above-ground applications.",
    href: "/repair-systems/waterproofing-systems",
    imageUrl: null,
    available: false,
  },
  {
    slug: "injection-crack-repair",
    title: "Injection & Crack Repair",
    description:
      "Epoxy, polyurethane, and cementitious injection systems for structural and non-structural crack repair in concrete and masonry.",
    href: "/repair-systems/injection-crack-repair",
    imageUrl: null,
    available: false,
  },
  {
    slug: "self-levelling-screeds",
    title: "Self-Levelling & Screeds",
    description:
      "Flow-applied levelling compounds and screeds for floor reinstatement, fall correction, and substrate preparation prior to membrane application.",
    href: "/repair-systems/self-levelling-screeds",
    imageUrl: null,
    available: false,
  },
  {
    slug: "tools",
    title: "Tools & Equipment",
    description:
      "Application tools, mixing equipment, concrete preparation tools, testing equipment, and access systems for remedial works.",
    href: "/repair-systems/tools",
    imageUrl: null,
    available: false,
  },
];

// ── Defect cross-reference chips (Browse by Defect section) ───────────────────

export interface DefectChip {
  label: string;
  href: string;
}

export const REPAIR_SYSTEM_DEFECT_CHIPS: DefectChip[] = [
  { label: "Concrete Spalling",        href: "/defect-library/concrete-structural-defects" },
  { label: "Reinforcement Corrosion",  href: "/defect-library/concrete-structural-defects" },
  { label: "Carbonation",              href: "/defect-library/concrete-structural-defects" },
  { label: "Chloride Ingress",         href: "/defect-library/concrete-structural-defects" },
  { label: "Balcony Membrane Failure", href: "/defect-library/balconies-podiums" },
  { label: "Water Ingress",            href: "/defect-library/waterproofing-water-ingress" },
  { label: "Crack Repair",             href: "/defect-library/concrete-structural-defects" },
  { label: "Façade Deterioration",     href: "/defect-library/facade-external-envelope" },
  { label: "Roof Membrane Failure",    href: "/defect-library/roofing-defects" },
  { label: "Drainage Failure",         href: "/defect-library/services-drainage" },
  { label: "Sealant Failure",          href: "/defect-library/facade-external-envelope" },
  { label: "Substrate Delamination",   href: "/defect-library/concrete-structural-defects" },
];

// ── Repair Mortars — technical system overview ────────────────────────────────

export interface TechnicalSystemInfo {
  whatIs: string;
  typicalApplications: string[];
  selectionCriteria: string[];
  limitations: string[];
  standardsNotes: string[];
  suitableDefects: string[];
  typicalSubstrates: string[];
}

export const REPAIR_MORTAR_SYSTEM_INFO: TechnicalSystemInfo = {
  whatIs:
    "Polymer-modified repair mortars are cementitious repair materials enhanced with polymer additives (typically styrene-butadiene, acrylic, or epoxy) to improve bond strength, flexibility, durability, and resistance to chloride ingress and carbonation. They are the primary system for concrete patch repair in Australian remedial practice and are specified for structural and non-structural concrete reinstatement following spalling, delamination, corrosion-related breakout, and physical damage.",
  typicalApplications: [
    "Concrete patch repair following spalling removal and breakout",
    "Reinstatement of concrete cover to corroded reinforcement",
    "Balcony soffit repair and vertical surface reinstatement",
    "Column and beam repair after structural investigation",
    "Façade concrete repair and surface profiling",
    "Full-depth concrete reinstatement in columns and beams",
    "Step and riser repair",
    "Below-ground retaining wall and basement repair",
  ],
  selectionCriteria: [
    "Repair depth — match mortar type to minimum and maximum application thickness",
    "Exposure class (AS 3600) — select chloride and carbonation resistance appropriate to exposure",
    "Structural or cosmetic requirement — ensure compressive strength matches substrate",
    "Vertical, overhead, or horizontal application — product must be rated accordingly",
    "Coastal or marine environment — select mortars with enhanced chloride resistance",
    "Primer requirement — confirm whether bonding primer is mandatory for the product",
    "Compatibility with corrosion inhibitor or sacrificial anode system if specified",
    "Traffic or loading — select high-strength or rapid-set mortar where early loading is required",
  ],
  limitations: [
    "Not suitable as a waterproofing system — a separate membrane system is required where waterproofing is needed",
    "Application thickness limits must be respected — do not exceed manufacturer maximum per lift",
    "Shrinkage cracking may occur if substrate preparation is inadequate or curing is insufficient",
    "Must not be applied to frozen, frost-affected, or contaminated substrates",
    "Incompatible with some epoxy injection systems — confirm compatibility before use",
    "Performance is highly dependent on substrate preparation — minimum CSP (Concrete Surface Profile) must be achieved",
    "Colour match to existing concrete cannot be guaranteed",
    "Product shelf life must be verified — do not use beyond expiry date",
  ],
  standardsNotes: [
    "AS 3600 — Concrete Structures: governs exposure classification, cover requirements, and structural performance",
    "AS 3958 — Guide to the use of waterborne adhesives in ceramic tile fixing (where applicable to combined systems)",
    "EN 1504 series (adopted into Australian practice) — provides product classification for concrete repair: Part 3 for structural and non-structural repair, Part 10 for site application",
    "Manufacturer ITP and hold point requirements must be observed — substrate testing, pull-off bond testing, and flood testing as applicable",
    "Minimum compressive strength at time of application and at 28 days should be verified against structural requirements",
  ],
  suitableDefects: [
    "Concrete spalling (cover concrete loss)",
    "Reinforcement corrosion — post-breakout reinstatement",
    "Delaminated concrete",
    "Honeycombing and voids",
    "Physical impact damage",
    "Substrate profiling prior to waterproofing or coating",
  ],
  typicalSubstrates: [
    "In-situ reinforced concrete",
    "Precast concrete panels",
    "Post-tensioned concrete slabs",
    "Masonry (with appropriate primer)",
    "Previously repaired concrete (confirm compatibility)",
  ],
};

// ── Repair Mortar technical specification fields ───────────────────────────────

export interface RepairMortarSpecs {
  repairDepthMm: { min: number; max: number; perLift?: number };
  exposureClasses: string[];
  compressiveStrengthMPa: string;
  bondStrengthMPa: string;
  shrinkage: string;
  chlorideResistance: string;
  carbonationResistance: string;
  primerRequired: string;
  wetAreaSuitable: boolean;
  marineSuitable: boolean;
}

// ── Product data ──────────────────────────────────────────────────────────────

export interface ProductRetailer {
  name: string;
  url: string;
  price?: string;       // e.g. "$77.00 incl GST" — leave undefined if not publicly listed
  inStock?: boolean;    // undefined = unknown
}

export interface RepairMortarProduct {
  id: string;
  name: string;
  manufacturer: string;
  imageUrl: string | null;
  imageNote?: string;       // shown in UI when imageUrl is null
  tdsUrl: string;
  sdsUrl?: string;
  bagSizeKg: number;
  priceRange: string;       // always "Indicative only" — update via data field
  priceNote: string;
  suppliers: ProductRetailer[];  // manufacturer / official distributor pages
  retailers: ProductRetailer[];  // online stores where you can purchase
  bestFor: string;
  applications: string[];
  coverageRate: string;
  specs: RepairMortarSpecs;
  advantages: string[];
  limitations: string[];
  standardsNotes: string;
  notes: string;
}

export const REPAIR_MORTAR_PRODUCTS: RepairMortarProduct[] = [
  {
    id: "ardex-br-345",
    name: "ARDEX BR 345",
    manufacturer: "ARDEX Australia",
    // Official ARDEX Australia product image
    imageUrl: "https://i0.wp.com/ardexaustralia.com/wp-content/uploads/2017/12/ARDEX-_BR-345-20kg_Render_1080x1080-Transparent.png",
    tdsUrl: "https://ardexaustralia.com/pdf/Spec%20Sheets/ARDEXBR345_specsheet.pdf",
    sdsUrl: undefined,
    bagSizeKg: 20,
    priceRange: "~$77–$83 per 20 kg bag",
    priceNote: "Indicative online range only. Prices vary by supplier, region, and order volume. Verify with supplier prior to use in any cost estimate.",
    suppliers: [
      { name: "ARDEX Australia", url: "https://ardexaustralia.com/product/ardex-br-345/" },
    ],
    retailers: [
      { name: "Komerco",    url: "https://komerco.com.au/products/ardex-br-345",                                              price: "$82.50 incl GST", inStock: true  },
      { name: "TradieCart", url: "https://www.tradiecart.com.au/ardex-br-345-20kg-structural-patch-and-repair-mortar/",       price: "$77.00 incl GST", inStock: true  },
    ],
    bestFor: "High-build structural patch repair on vertical, horizontal, and overhead concrete — façades, balcony soffits, columns, and beams where a single lift up to 80 mm is required.",
    applications: [
      "Concrete spall repair on vertical and overhead surfaces",
      "Balcony soffit and column reinstatement",
      "Single-lift repairs from 10 mm to 80 mm depth",
      "Façade substrate preparation prior to coating",
      "Structural reinstatement after reinforcement corrosion breakout",
    ],
    coverageRate: "12.6 litres per 20 kg bag — approximately 1.25 m² at 10 mm thickness",
    specs: {
      repairDepthMm: { min: 10, max: 80, perLift: 80 },
      exposureClasses: ["B1", "B2", "C1", "C2"],
      compressiveStrengthMPa: "30–45 MPa at 28 days (10 MPa at 1 day)",
      bondStrengthMPa: "≥ 1.5 MPa (indicative — refer to TDS)",
      shrinkage: "Shrinkage compensated — polymer modified formulation",
      chlorideResistance: "High resistivity >15,000 Ω·cm — active corrosion inhibitor included",
      carbonationResistance: "Good — dense polymer-modified matrix",
      primerRequired: "Bonding primer required — refer to ARDEX TDS for compatible primer",
      wetAreaSuitable: false,
      marineSuitable: true,
    },
    advantages: [
      "Up to 80 mm in a single lift — vertical, overhead, and horizontal",
      "Built-in active corrosion inhibitor — high resistivity formulation",
      "MICROTEC® fibre reinforcement reduces early shrinkage cracking",
      "Shrinkage compensated — dimensionally stable after cure",
      "30–45 MPa compressive strength — structural reinstatement capability",
      "Pot life of 30–45 minutes at 23°C — manageable for site conditions",
    ],
    limitations: [
      "Requires compatible ARDEX bonding primer — do not apply to dry or contaminated substrate",
      "Not suitable as a standalone waterproofing system",
      "Colour match to existing concrete cannot be guaranteed",
      "Verify current TDS before specifying — product formulations may be updated",
    ],
    standardsNotes:
      "AS 3600 exposure classification compliance should be verified by the specifying consultant. Aligned with EN 1504-3 structural repair mortar principles — confirm classification and performance class on current ARDEX Australia TDS.",
    notes:
      "Product data sourced from ARDEX Australia official product page and spec sheet. Always obtain and verify the current Technical Data Sheet from ardexaustralia.com before specifying or applying.",
  },
  {
    id: "fosroc-renderoc-hb40",
    name: "Renderoc HB40",
    manufacturer: "Fosroc Australia",
    // Official Fosroc Australia product image
    imageUrl: "https://www.fosroc.com.au/sites/default/files/styles/max_650x650/public/product_images/60d0ec834434a263db2d712233d83425.jpg",
    tdsUrl: "https://www.fosroc.com.au/product/renderoc-hb40",
    sdsUrl: "https://www.fosroc.com.au/product/renderoc-hb40",
    bagSizeKg: 20,
    priceRange: "~$83–$90 per 20 kg bag",
    priceNote: "Indicative online range only. Prices vary by supplier, region, and order volume. Verify with supplier prior to use in any cost estimate.",
    suppliers: [
      { name: "Fosroc Australia", url: "https://www.fosroc.com.au/product/renderoc-hb40" },
    ],
    retailers: [
      { name: "Bldcare",     url: "https://www.bldcare.com.au/concrete-repair-mortars/278-fosroc-renderoc-hb40-20kg.html",                                                                                              price: "$83.50 incl GST", inStock: false },
      { name: "Jaybro",      url: "https://www.jaybro.com.au/fosrocr-renderoc-hb40-20kg.html" },
      { name: "Blackwoods",  url: "https://www.blackwoods.com.au/adhesives-sealants-fillers/repair-and-wear-resistant-compounds/fosroc-renderoc/mortar-renderoc-hb40-20kg/p/00489421" },
    ],
    bestFor: "Localised vertical and overhead patch repair on reinforced concrete up to 45 MPa — suited to balcony soffits, columns, and façade repairs where wet-spray or trowel application is required.",
    applications: [
      "Localised patch repair on vertical and overhead reinforced concrete",
      "Slab edge, column, and beam repair",
      "Reinstatement of concrete cover to corroded reinforcement",
      "Balcony soffit and parapet repair",
      "Wet-spray or trowel application up to 40 mm depth",
      "Repair areas up to 1 m² per pour",
    ],
    coverageRate: "Approximately 1.6–1.7 kg/m² per mm thickness (verify with Fosroc TDS)",
    specs: {
      repairDepthMm: { min: 10, max: 40, perLift: 40 },
      exposureClasses: ["B1", "B2", "C1", "C2"],
      compressiveStrengthMPa: "35 MPa at 28 days",
      bondStrengthMPa: "≥ 1.5 MPa (indicative — refer to TDS)",
      shrinkage: "Shrinkage compensated — dimensionally stable",
      chlorideResistance: "Low permeability — suitable for chloride-exposed environments",
      carbonationResistance: "Good — low CO₂ permeability",
      primerRequired: "Nitobond EP or Nitoprime Zincrich — confirm with Fosroc TDS",
      wetAreaSuitable: true,
      marineSuitable: true,
    },
    advantages: [
      "EN 1504-3 Class R3 — certified structural repair classification",
      "Compatible with Galvashield sacrificial anode systems",
      "Suitable for potable water applications (AS/NZS 4020:2018)",
      "Wet-spray or trowel application — flexible for site conditions",
      "Shrinkage compensated — minimises cracking risk",
      "Abrasion resistant — suited to aggressive environments",
    ],
    limitations: [
      "Maximum 40 mm per lift on vertical surfaces — deeper repairs require staged application or formwork",
      "Requires Fosroc primer system — do not substitute without manufacturer approval",
      "Repair area limited to 1 m² per pour for trowel application",
      "Not a standalone waterproofing system — membrane required where water exclusion is needed",
      "Verify current TDS — Fosroc periodically updates product formulations",
    ],
    standardsNotes:
      "EN 1504-3 Class R3 (confirmed on TDS). AS/NZS 4020:2018 compliant for potable water. AS 3600 exposure class compliance is the responsibility of the specifying structural engineer.",
    notes:
      "Product data above is indicative and based on publicly available Fosroc product information. Obtain and verify the current Fosroc Australia Technical Data Sheet and Safety Data Sheet before specifying or applying on any project.",
  },
  {
    id: "sika-monotop-412-nfg",
    name: "SikaMonoTop®-412 NFG",
    manufacturer: "Sika Australia",
    // Official Sika Australia product image via Sika's CDN
    imageUrl: "https://sika.scene7.com/is/image/sikacs/au-02-en-AU-GenericSikabag-20kg-1x1-00571470:1-1?wid=480&hei=480&fit=crop%2C1",
    tdsUrl: "https://aus.sika.com/dam/dms/au01/v/sika_monotop_-412nfg.pdf",
    sdsUrl: "https://aus.sika.com/en/construction/concrete-repair-protection/concrete-repair-mortars/cementitious-repairmortars/sika-monotop-412nfg.html",
    bagSizeKg: 20,
    priceRange: "~$80–$100 per 20 kg bag",
    priceNote: "Indicative online range only. Prices vary by supplier, region, and order volume. Verify with supplier prior to use in any cost estimate.",
    suppliers: [
      { name: "Sika Australia", url: "https://aus.sika.com/en/construction/concrete-repair-protection/concrete-repair-mortars/cementitious-repairmortars/sika-monotop-412nfg.html" },
    ],
    retailers: [
      { name: "Komerco",                    url: "https://komerco.com.au/products/sika-monotop-412-nfg",                                          price: "$72.95 incl GST", inStock: true  },
      { name: "Sydney Industrial Coatings", url: "https://www.sydneyindustrialcoatings.com.au/product/sika-monotop-412nfg-20kg/",                 price: "$68.00 incl GST", inStock: true  },
      { name: "TradieCart",                 url: "https://www.tradiecart.com.au/sika-monotop-412nfg-20kg-repair-mortar/",                         price: "$99.00 incl GST", inStock: true  },
      { name: "BCSands",                    url: "https://www.bcsands.com.au/index.php?main_page=product_info&products_id=1267" },
    ],
    bestFor: "R4-class structural concrete repair on reinforced concrete buildings — façades, balcony soffits, columns, and beams where engineering specification requires EN 1504-3 R4 classification and no bonding primer.",
    applications: [
      "Structural patch repair to reinforced concrete — R4 classified",
      "Reinstatement of concrete cover following reinforcement corrosion repair",
      "Balcony slab soffit, edge beam, and column repair",
      "Repair and restoration of bridges, infrastructure, and Class 2 buildings",
      "Structural strengthening and concrete reinstatement up to 50 mm per layer",
    ],
    coverageRate: "Approximately 1.6 kg/m² per mm thickness — 20 kg bag covers ~1.25 m² at 10 mm (verify with Sika TDS)",
    specs: {
      repairDepthMm: { min: 5, max: 50, perLift: 50 },
      exposureClasses: ["B1", "B2", "C1", "C2"],
      compressiveStrengthMPa: "~50 MPa at 28 days",
      bondStrengthMPa: "> 2.0 MPa (EN 1542)",
      shrinkage: "Very low — ~600 µm/m at 28 days (EN 12617-4)",
      chlorideResistance: "High — polymer modified, low permeability",
      carbonationResistance: "High — dense matrix, suitable for coastal environments",
      primerRequired: "No bonding primer required for manual application — self-priming formulation",
      wetAreaSuitable: false,
      marineSuitable: true,
    },
    advantages: [
      "EN 1504-3 R4 structural repair classification — highest mortar performance class",
      "No bonding primer required for manual application — reduces system cost and steps",
      "~50 MPa compressive strength — suitable for structural reinstatement",
      "Very low shrinkage (~600 µm/m) — excellent dimensional stability",
      "Bond strength > 2.0 MPa — meets structural repair requirements",
      "Part of the complete Sika MonoTop system — compatible with SikaMonoTop-910N primer and Sika coatings",
      "Widely stocked across Australia through national distribution network",
    ],
    limitations: [
      "Primer required for spray application even though manual application is primer-free — confirm on TDS",
      "Not a standalone waterproofing material — membrane required where water exclusion is needed",
      "Coverage rate varies with substrate profile — allow for waste on rough or broken-out surfaces",
      "Skilled application required for overhead and vertical surfaces",
      "Verify current TDS — Sika periodically revises product data and application requirements",
    ],
    standardsNotes:
      "EN 1504-3 R4 structural repair mortar classification (confirmed — refer to current Sika Australia TDS). AS 3600 exposure class compliance is the responsibility of the specifying structural engineer.",
    notes:
      "Product data sourced from the Sika Australia official product page and TDS (aus.sika.com). Always obtain the current Technical Data Sheet and Safety Data Sheet from Sika Australia before specifying or applying this product.",
  },
];

// ── Tab navigation for the Repair Mortars page ───────────────────────────────

export interface RepairSystemTab {
  label: string;
  slug: string;
  href: string;
  available: boolean;
}

export const REPAIR_SYSTEM_TABS: RepairSystemTab[] = [
  { label: "Repair Mortars",       slug: "repair-mortars",       href: "/repair-systems/repair-mortars",       available: true  },
  { label: "Corrosion Inhibitors", slug: "corrosion-inhibitors", href: "/repair-systems/corrosion-inhibitors", available: false },
  { label: "Sacrificial Anodes",   slug: "sacrificial-anodes",   href: "/repair-systems/sacrificial-anodes",   available: false },
  { label: "Primers & Coatings",   slug: "primers-coatings",     href: "/repair-systems/primers-coatings",     available: false },
  { label: "Tools",                slug: "tools",                href: "/repair-systems/tools",                available: false },
];
