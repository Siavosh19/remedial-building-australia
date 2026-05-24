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
  retailers: ProductRetailer[];
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
    imageUrl: null,
    imageNote: "Image to be added manually — source from ardex.com.au",
    tdsUrl: "https://www.ardex.com.au/products/",
    sdsUrl: undefined,
    bagSizeKg: 25,
    priceRange: "~$45–$65 per 25 kg bag",
    priceNote: "Indicative online range only. Prices vary by supplier, region, and order volume. Verify with supplier prior to use in any cost estimate.",
    retailers: [
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
      { name: "ARDEX Direct",                  url: "https://www.ardex.com.au" },
    ],
    bestFor: "Vertical and overhead concrete patch repair on façades, balcony soffits, and columns where extended working time is required.",
    applications: [
      "Concrete spall repair on vertical and overhead surfaces",
      "Balcony soffit and column reinstatement",
      "Repair depths from 6 mm to 40 mm per lift",
      "Façade substrate preparation prior to coating",
    ],
    coverageRate: "Approximately 1.6 kg/m² per mm thickness (verify with manufacturer data sheet)",
    specs: {
      repairDepthMm: { min: 6, max: 40, perLift: 40 },
      exposureClasses: ["B1", "B2", "C1"],
      compressiveStrengthMPa: "≥ 40 MPa at 28 days (indicative — refer to TDS)",
      bondStrengthMPa: "≥ 1.5 MPa (indicative — refer to TDS)",
      shrinkage: "Low shrinkage — polymer modification reduces drying shrinkage",
      chlorideResistance: "Good — polymer modification reduces chloride permeability",
      carbonationResistance: "Good — dense cementitious matrix",
      primerRequired: "Bonding primer required — ARDEX primer as specified per TDS",
      wetAreaSuitable: false,
      marineSuitable: true,
    },
    advantages: [
      "Extended open time suitable for larger repair areas",
      "High build per lift reduces number of applications",
      "Good workability — suitable for overhead application with appropriate technique",
      "Fibre reinforcement reduces early-age cracking",
      "Compatible with ARDEX corrosion inhibitor and primer systems",
    ],
    limitations: [
      "Requires compatible ARDEX bonding primer — do not apply to dry or contaminated substrate",
      "Not suitable as a standalone waterproofing system",
      "Maximum application thickness per lift must not be exceeded",
      "Colour may not match adjacent concrete",
      "Verify current TDS before specifying — product formulations may be updated",
    ],
    standardsNotes:
      "AS 3600 exposure classification compliance should be verified by the specifying consultant. Product is broadly aligned with EN 1504-3 Class R3/R4 principles — confirm classification on current TDS.",
    notes:
      "Product specification details above are indicative only and based on general product range information. Always obtain and verify the current Technical Data Sheet from ARDEX Australia before specifying or applying.",
  },
  {
    id: "fosroc-renderoc-hb40",
    name: "Renderoc HB40",
    manufacturer: "Fosroc Australia",
    imageUrl: null,
    imageNote: "Image to be added manually — source from fosroc.com or fosroc.com.au",
    tdsUrl: "https://www.fosroc.com/product/renderoc-hb40",
    sdsUrl: "https://www.fosroc.com/product/renderoc-hb40",
    bagSizeKg: 25,
    priceRange: "~$50–$70 per 25 kg bag",
    priceNote: "Indicative online range only. Prices vary by supplier, region, and order volume. Verify with supplier prior to use in any cost estimate.",
    retailers: [
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
      { name: "Fosroc Direct",                 url: "https://www.fosroc.com.au" },
      { name: "Conspec",                        url: "https://www.conspec.com.au" },
    ],
    bestFor: "High-build repairs on horizontal and vertical concrete surfaces — suited to large-volume patch repairs where extended build per lift is advantageous.",
    applications: [
      "Large-area concrete spall repair",
      "Slab edge and column repair",
      "Reinstatement of concrete cover to corroded reinforcement",
      "Balcony soffit and parapet repair",
      "Repair depths from 10 mm to 75 mm in a single application",
    ],
    coverageRate: "Approximately 1.6–1.7 kg/m² per mm thickness (verify with manufacturer data sheet)",
    specs: {
      repairDepthMm: { min: 10, max: 75, perLift: 75 },
      exposureClasses: ["B1", "B2", "C1", "C2"],
      compressiveStrengthMPa: "≥ 45 MPa at 28 days (indicative — refer to TDS)",
      bondStrengthMPa: "≥ 1.5 MPa (indicative — refer to TDS)",
      shrinkage: "Controlled shrinkage — compensated formulation",
      chlorideResistance: "High — suitable for chloride-contaminated environments",
      carbonationResistance: "High — dense polymer-modified matrix",
      primerRequired: "Nitobond EP or Nitoprime Zincrich as specified — confirm with Fosroc TDS",
      wetAreaSuitable: false,
      marineSuitable: true,
    },
    advantages: [
      "High build in a single lift — up to 75 mm without formwork on vertical surfaces",
      "Fibre reinforced — minimises early shrinkage cracking",
      "Suitable for C1 and C2 exposure classes",
      "Strong track record in Australian remedial practice",
      "Widely available through established remedial supply network",
    ],
    limitations: [
      "Requires Fosroc primer system — do not substitute without manufacturer approval",
      "Large volume mixing required for efficient application — suitable for crew-based works, not minor isolated repairs",
      "Not a waterproofing system — membrane required where water exclusion is needed",
      "Surface finish may require skim coat for architectural applications",
      "Verify current TDS — Fosroc periodically updates product formulations and application requirements",
    ],
    standardsNotes:
      "Classified under EN 1504-3 as a structural and non-structural concrete repair mortar (R4 category indicative — confirm on current TDS). AS 3600 exposure class compliance is the responsibility of the specifying engineer.",
    notes:
      "Product data above is indicative and based on publicly available Fosroc product information. Obtain and verify the current Fosroc Australia Technical Data Sheet and Safety Data Sheet before specifying or applying on any project.",
  },
  {
    id: "sika-monotop-615",
    name: "SikaMonoTop®-615",
    manufacturer: "Sika Australia",
    imageUrl: null,
    imageNote: "Image to be added manually — source from aus.sika.com",
    tdsUrl: "https://aus.sika.com/en/construction/concrete-restoration-protection/concrete-repair-mortars/sika-monotop-615.html",
    sdsUrl: "https://aus.sika.com/en/construction/concrete-restoration-protection/concrete-repair-mortars/sika-monotop-615.html",
    bagSizeKg: 25,
    priceRange: "~$55–$75 per 25 kg bag",
    priceNote: "Indicative online range only. Prices vary by supplier, region, and order volume. Verify with supplier prior to use in any cost estimate.",
    retailers: [
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
      { name: "Sika Australia",                url: "https://aus.sika.com" },
      { name: "PBS Building Products",         url: "https://www.pbsbuildingproducts.com.au" },
    ],
    bestFor: "Structural concrete repair on Class 2 building façades, balconies, and columns — particularly where R4-class structural mortar is required by engineering specification.",
    applications: [
      "Structural patch repair to reinforced concrete",
      "Reinstatement of concrete cover following corrosion repair",
      "Balcony slab soffit and edge beam repair",
      "Column, beam, and wall repair",
      "Repair depths from 5 mm to 50 mm per layer",
    ],
    coverageRate: "Approximately 1.6 kg/m² per mm thickness (verify with Sika TDS)",
    specs: {
      repairDepthMm: { min: 5, max: 50, perLift: 50 },
      exposureClasses: ["B1", "B2", "C1", "C2"],
      compressiveStrengthMPa: "≥ 45 MPa at 28 days (indicative — refer to TDS)",
      bondStrengthMPa: "≥ 2.0 MPa (indicative — refer to TDS)",
      shrinkage: "Low — compensated shrinkage formulation",
      chlorideResistance: "High — enhanced chloride barrier properties",
      carbonationResistance: "High — suitable for coastal and industrial environments",
      primerRequired: "SikaBond®-615 or Sika® Monotop® Primer as specified per TDS",
      wetAreaSuitable: false,
      marineSuitable: true,
    },
    advantages: [
      "Part of the Sika MonoTop system — fully compatible primer, mortar, and coating solution",
      "EN 1504-3 R4 classification — suitable for structural repair specification",
      "Suitable for coastal and marine exposure environments",
      "Available nationally through established Sika supply network",
      "Good track record in Australian Class 2 remedial projects",
      "High bond strength — suitable for structural reinstatement requirements",
    ],
    limitations: [
      "Requires Sika MonoTop primer — do not substitute with non-Sika products without approval",
      "Not a standalone waterproofing material",
      "Coverage rate estimates should be calculated per project — waste and profile variations affect actual usage",
      "Skilled application required for overhead and vertical surfaces",
      "Verify current TDS — Sika periodically revises product data and application requirements",
    ],
    standardsNotes:
      "EN 1504-3 R4 classification (structural mortar) — confirm on current Sika Australia TDS. AS 3600 exposure class compliance is the responsibility of the specifying structural engineer.",
    notes:
      "Product specification details above are indicative and based on publicly available Sika Australia information. Always obtain the current Technical Data Sheet and Safety Data Sheet from Sika Australia before specifying or applying this product.",
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
