// ─────────────────────────────────────────────────────────────────────────────
// SCOPE BUILDER — PLACEHOLDER DATA
// Replace these arrays with Supabase calls or an imported Excel database later.
// All data is typed via scope-builder-types.ts.
// ─────────────────────────────────────────────────────────────────────────────

import type {
  DefectCategory,
  RepairSystem,
  Material,
  ScopeClause,
} from "./scope-builder-types";

// ─── Defect categories & types ────────────────────────────────────────────────

export const DEFECT_CATEGORIES: Record<DefectCategory, string[]> = {
  "Waterproofing & Water Ingress": [
    "Balcony Membrane Failure",
    "Podium Deck Waterproofing Failure",
    "Wet Area Membrane Failure",
    "Planter Box Waterproofing Failure",
    "Below-Ground / Basement Waterproofing Failure",
    "Shower Recess Waterproofing Failure",
    "External Wall Water Ingress",
    "Internal Water Penetration",
  ],
  "Concrete & Structural Defects": [
    "Concrete Spalling (Concrete Cancer)",
    "Carbonation-Induced Corrosion",
    "Chloride-Induced Corrosion",
    "Structural Cracking",
    "Post-Tensioned Concrete Defects",
    "Concrete Delamination",
    "Reinforcement Corrosion",
    "Honeycombing / Poor Consolidation",
  ],
  "Façade & External Envelope": [
    "External Wall Coating Failure",
    "Cladding Defects",
    "Brick / Masonry Defects",
    "Expansion Joint Failure",
    "Efflorescence",
    "Render Failure",
    "External Insulation System Failure",
    "Combustible / Non-Compliant Cladding",
  ],
  "Roofing Defects": [
    "Roof Membrane Failure",
    "Flashing Failure",
    "Roof Drainage Failure",
    "Penetration Leaks",
    "Ridge / Hip Failure",
    "Roof Sheet / Tile Failure",
  ],
  "Balconies & Podiums": [
    "Balcony Tile Delamination",
    "Failed Screed / Topping",
    "Structural Concrete Deterioration",
    "Balustrade Corrosion",
    "Balcony Drainage Failure",
    "Podium Structural Defects",
  ],
  "Windows & Flashings": [
    "Window Sealant Failure",
    "Head Flashing Failure",
    "Sill Flashing Failure",
    "Window Frame Corrosion",
    "Glazing Defects",
    "Window Weather Seal Failure",
  ],
  "Services & Drainage": [
    "Blocked Stormwater Drainage",
    "Inadequate Drainage Capacity",
    "Downpipe Failure",
    "Sewer Defects",
    "Essential Services Defects",
    "Drainage Outlet Failure",
  ],
};

// ─── Repair systems ───────────────────────────────────────────────────────────

export const REPAIR_SYSTEMS: RepairSystem[] = [
  {
    id: "rs-01",
    name: "Full Membrane Replacement",
    description:
      "Complete removal of existing failed waterproofing membrane and installation of a new compliant system to AS 3740 or AS 4654.",
    suitableFor: [
      "Waterproofing & Water Ingress",
      "Balconies & Podiums",
      "Roofing Defects",
    ],
    process: [
      "Remove all finishes (tiles, screed, protection board)",
      "Remove existing membrane and prepare substrate",
      "Apply primer and install new compliant membrane system",
      "Install upstands, flashings and drainage outlets",
      "Flood test to AS 3740",
      "Reinstate protection layer and finishes",
    ],
    considerations:
      "Most comprehensive waterproofing solution. Required where membrane has failed across large areas or has exceeded design service life. Confirm membrane system compatibility with substrate and drainage design.",
  },
  {
    id: "rs-02",
    name: "Localised Membrane Repair",
    description:
      "Targeted removal and repair of isolated membrane failures without full strip-out of finishes.",
    suitableFor: ["Waterproofing & Water Ingress", "Balconies & Podiums"],
    process: [
      "Locate and expose failure point",
      "Remove finishes in affected area",
      "Cut back and remove failed membrane section",
      "Prepare and prime substrate",
      "Apply compatible repair membrane and detail edges",
      "Reinstate finishes",
    ],
    considerations:
      "Only suitable where failures are isolated and existing membrane is otherwise sound. Requires investigation to confirm root cause before localised repair is specified.",
  },
  {
    id: "rs-03",
    name: "Concrete Patch Repair",
    description:
      "Mechanical removal of defective concrete and replacement with a compatible repair mortar system.",
    suitableFor: ["Concrete & Structural Defects", "Balconies & Podiums"],
    process: [
      "Outline defective areas with saw cuts",
      "Break out defective concrete to minimum 10mm behind corrosion",
      "Clean and prepare substrate (remove all laitance)",
      "Clean reinforcement to St2/St3 (ISO 8501-1)",
      "Apply anti-corrosion coating to steel",
      "Apply bonding primer and repair mortar in lifts",
      "Cure for minimum 7 days",
    ],
    considerations:
      "Extent of breakout may increase on exposure. Engineer review required for structural concrete repairs. Repair mortar must be compatible with existing concrete substrate.",
  },
  {
    id: "rs-04",
    name: "Reinforcement Treatment",
    description:
      "Corrosion treatment of exposed or at-risk reinforcing steel without full concrete replacement.",
    suitableFor: ["Concrete & Structural Defects"],
    process: [
      "Expose reinforcing steel by controlled breakout",
      "Clean steel to St2 or St3 standard (ISO 8501-1)",
      "Apply anti-corrosion primer/coating to all exposed steel",
      "Allow to cure per manufacturer's data sheet",
      "Encapsulate with compatible repair mortar",
    ],
    considerations:
      "Suitable for early-stage corrosion with structurally sound steel cross-section. Structural assessment required if significant section loss is present.",
  },
  {
    id: "rs-05",
    name: "Crack Injection",
    description:
      "Injection of epoxy or polyurethane resin into cracks to restore structural integrity or provide water tightness.",
    suitableFor: ["Concrete & Structural Defects", "Waterproofing & Water Ingress"],
    process: [
      "Clean crack face and mark injection port locations",
      "Install injection ports at 150–300mm centres",
      "Seal crack face between ports",
      "Inject epoxy (structural) or polyurethane (water stop) resin under low pressure",
      "Remove ports on cure and finish surface",
    ],
    considerations:
      "Epoxy injection for structural restoration of dormant cracks. Polyurethane for active water-bearing cracks. Crack must be investigated to determine if structural or non-structural before treatment.",
  },
  {
    id: "rs-06",
    name: "Façade Coating System",
    description:
      "Application of a protective elastomeric or texture coating system to external wall surfaces.",
    suitableFor: ["Façade & External Envelope"],
    process: [
      "Clean substrate (high pressure wash, remove organic growth)",
      "Repair cracks and voids with compatible filler",
      "Apply alkali-resistant primer",
      "Apply texture coat if required",
      "Apply minimum 2 coats of elastomeric finish coat",
    ],
    considerations:
      "Surface preparation is critical — coatings applied over contaminated or weak substrates will fail. System must be breathable to allow moisture vapour transmission.",
  },
  {
    id: "rs-07",
    name: "Sealant Replacement",
    description:
      "Full removal and replacement of failed expansion joint sealants, window perimeter sealants and construction joint sealants.",
    suitableFor: [
      "Façade & External Envelope",
      "Windows & Flashings",
      "Balconies & Podiums",
    ],
    process: [
      "Fully remove existing sealant (mechanical removal, solvent clean)",
      "Clean joint faces to remove all residue",
      "Install backing rod of correct diameter",
      "Apply primer where required",
      "Install new sealant and tool to concave profile",
    ],
    considerations:
      "Joint geometry must meet minimum depth-to-width ratio (typically 1:2). Sealant product must be compatible with adjacent substrates (concrete, aluminium, glass). UV-stable sealant required for exposed joints.",
  },
  {
    id: "rs-08",
    name: "Flashing Replacement",
    description:
      "Removal and replacement of failed metal or flexible flashings at window heads, sills, parapets and roof junctions.",
    suitableFor: ["Windows & Flashings", "Roofing Defects", "Façade & External Envelope"],
    process: [
      "Remove failed flashing and associated sealants",
      "Prepare and clean substrate",
      "Install new flashing with correct laps and end dams",
      "Seal all joints with compatible sealant",
      "Re-dress adjacent finishes",
    ],
    considerations:
      "Material selection (aluminium, copper, colorbond, lead) must be compatible with adjacent materials. Galvanic corrosion risk must be considered. End dams essential at all flashing terminations.",
  },
  {
    id: "rs-09",
    name: "Roof Membrane Replacement",
    description:
      "Complete removal and replacement of the roof waterproofing system including insulation, drainage and flashings.",
    suitableFor: ["Roofing Defects"],
    process: [
      "Remove existing roof system to structural deck",
      "Inspect and repair structural deck",
      "Install fall formers / insulation as required",
      "Install new waterproofing membrane system",
      "Flash all penetrations, upstands and junctions",
      "Install drainage outlets and test",
    ],
    considerations:
      "Requires engineer involvement for fall design and drainage capacity. Consider trafficable vs. non-trafficable requirements. Check compliance with NCC for minimum fall to drainage.",
  },
  {
    id: "rs-10",
    name: "Drainage Outlet Upgrade",
    description:
      "Removal, upgrade and replacement of blocked, undersized or failed drainage outlets and their interfaces with the waterproofing system.",
    suitableFor: ["Services & Drainage", "Waterproofing & Water Ingress", "Balconies & Podiums"],
    process: [
      "Remove existing drainage outlet and surrounding finishes",
      "Prepare substrate and ensure correct fall to outlet",
      "Install new outlet of correct size and type",
      "Integrate outlet flange with waterproofing membrane",
      "Reinstate finishes",
      "Hydraulic test at completion",
    ],
    considerations:
      "Outlet sizing to comply with AS 3500.3. Confirm compatibility of outlet material with membrane system. Minimum outlet size and number per area of roof or deck must be verified by hydraulic engineer.",
  },
];

// ─── Materials ────────────────────────────────────────────────────────────────
// Replace this data with your Supabase/Excel product database.

export const MATERIALS: Material[] = [
  {
    id: "mat-01",
    brand: "Sika",
    productName: "Sikalastic 800W",
    category: "Liquid Membrane",
    suitableSystem: "Full Membrane Replacement",
    compatibleSubstrate: "Concrete, masonry, fibre cement",
    location: "External",
    uvExposed: true,
    applicationNotes:
      "2-coat system, minimum 1.0mm DFT total. Apply by brush or roller. Allow 4–6 hours between coats at 23°C.",
    tdsLink: "https://aus.sika.com",
    limitations:
      "Not suitable for direct trafficable surfaces without protection layer. Do not apply below 5°C or above 40°C.",
  },
  {
    id: "mat-02",
    brand: "Fosroc",
    productName: "Nitoproof 600",
    category: "Cementitious Waterproofing",
    suitableSystem: "Full Membrane Replacement / Localised Repair",
    compatibleSubstrate: "Concrete, masonry",
    location: "Both",
    uvExposed: false,
    applicationNotes:
      "Brush or roller application, 2 coats at 0.8kg/m² per coat. Substrate must be pre-wetted to SSD condition.",
    tdsLink: "https://www.fosroc.com/au",
    limitations:
      "Not suitable for positive hydrostatic pressure exceeding 5m head. Not for use as a trafficable surface.",
  },
  {
    id: "mat-03",
    brand: "Tremco",
    productName: "Vulkem 116",
    category: "Polyurethane Sealant",
    suitableSystem: "Sealant Replacement",
    compatibleSubstrate: "Concrete, glass, aluminium, steel",
    location: "External",
    uvExposed: true,
    applicationNotes:
      "Prime with Vulkem Primer 171. Joint width minimum 6mm, depth-to-width ratio 1:2. Tool to concave profile.",
    tdsLink: "https://www.tremcosealants.com",
    limitations:
      "Not for use in immersed or continuously wet conditions. Allow 48h cure before water exposure.",
  },
  {
    id: "mat-04",
    brand: "Sika",
    productName: "Sikadur 31 CF Normal",
    category: "Epoxy Adhesive / Repair Mortar",
    suitableSystem: "Crack Injection / Concrete Patch Repair",
    compatibleSubstrate: "Concrete, masonry, stone",
    location: "Both",
    uvExposed: false,
    applicationNotes:
      "2-component, mix ratio A:B = 3:1 by weight. Pot life 40 min at 20°C. Apply within pot life.",
    tdsLink: "https://aus.sika.com",
    limitations:
      "Not for structurally cracked concrete without engineering review. Amber coloured — UV yellowing if exposed.",
  },
  {
    id: "mat-05",
    brand: "Penetron",
    productName: "Penetron Standard",
    category: "Crystalline Waterproofing",
    suitableSystem: "Full Membrane Replacement / Concrete Patch Repair",
    compatibleSubstrate: "Concrete",
    location: "Both",
    uvExposed: false,
    applicationNotes:
      "Apply as slurry at 1.5kg/m², 2 coats. Substrate must be damp (SSD). Avoid application in rain.",
    tdsLink: "https://www.penetron.com.au",
    limitations:
      "Requires actively damp substrate for crystalline reaction. Not effective on dry or contaminated concrete.",
  },
  {
    id: "mat-06",
    brand: "BASF / Master Builders",
    productName: "MasterSeal 590",
    category: "Elastomeric Coating",
    suitableSystem: "Façade Coating System",
    compatibleSubstrate: "Concrete, render, masonry, fibre cement",
    location: "External",
    uvExposed: true,
    applicationNotes:
      "Minimum 2 coats at 250μm WFT per coat. Apply by brush, roller or airless spray. Allow 4h between coats.",
    tdsLink: "https://www.master-builders-solutions.com",
    limitations:
      "Not for substrates with active water ingress. Not for immersed conditions. Substrate must be sound and free of efflorescence.",
  },
  {
    id: "mat-07",
    brand: "Mapei",
    productName: "Mapelastic Smart",
    category: "Flexible Waterproofing Membrane",
    suitableSystem: "Full Membrane Replacement / Localised Membrane Repair",
    compatibleSubstrate: "Concrete, screed, masonry",
    location: "External",
    uvExposed: true,
    applicationNotes:
      "2-component, mix ratio 4:1 by weight. 2 coats, embed fibreglass mesh in first coat at upstands.",
    tdsLink: "https://www.mapei.com/au",
    limitations:
      "Not suitable for constant water immersion. Not for use below waterline. Protect from rain for 24h after application.",
  },
  {
    id: "mat-08",
    brand: "Parchem",
    productName: "Renderoc FC",
    category: "Cementitious Repair Mortar",
    suitableSystem: "Concrete Patch Repair",
    compatibleSubstrate: "Concrete, masonry",
    location: "Both",
    uvExposed: false,
    applicationNotes:
      "Apply in layers of 10–50mm. Pre-wet substrate to SSD. Moist cure for minimum 3 days. Apply Nitobond EP primer first.",
    tdsLink: "https://www.parchem.com.au",
    limitations:
      "Not for structural repair without engineering review. Not suitable as a wearing surface without protection.",
  },
  {
    id: "mat-09",
    brand: "Sika",
    productName: "Sika MonoTop-412 N",
    category: "Reinforcement Protection Coating",
    suitableSystem: "Reinforcement Treatment / Concrete Patch Repair",
    compatibleSubstrate: "Reinforcing steel, concrete",
    location: "Both",
    uvExposed: false,
    applicationNotes:
      "Apply 1–2mm thick to all cleaned and exposed reinforcing steel. Allow minimum 4h cure before overcoating.",
    tdsLink: "https://aus.sika.com",
    limitations:
      "Steel must be clean to minimum St2 (ISO 8501-1). Do not apply to actively corroding steel without full mechanical cleaning.",
  },
  {
    id: "mat-10",
    brand: "Bostik",
    productName: "Canseal Pro 40",
    category: "Polyurethane Sealant",
    suitableSystem: "Sealant Replacement",
    compatibleSubstrate: "Concrete, aluminium, glass, stone",
    location: "External",
    uvExposed: true,
    applicationNotes:
      "Paintable. Joint width minimum 6mm. Use Bostik Universal Primer on porous substrates.",
    tdsLink: "https://www.bostik.com/au",
    limitations:
      "Not for use in aquatic or permanently immersed conditions. Not for joints subject to chemical exposure.",
  },
  {
    id: "mat-11",
    brand: "Belzona",
    productName: "Belzona 4111 (Magma-Quartz)",
    category: "Chemical Resistant Coating",
    suitableSystem: "Drainage Outlet Upgrade",
    compatibleSubstrate: "Concrete, masonry, brick",
    location: "Internal",
    uvExposed: false,
    applicationNotes:
      "2-coat system. 24h cure between coats at 25°C. Substrate must be dry, clean, and free of contamination.",
    tdsLink: "https://www.belzona.com",
    limitations:
      "Requires fully cured concrete (minimum 28 days). Not for UV-exposed applications. Application temperature minimum 5°C.",
  },
  {
    id: "mat-12",
    brand: "Dulux",
    productName: "AcraTex Sealer Primer",
    category: "Primer / Sealer",
    suitableSystem: "Façade Coating System",
    compatibleSubstrate: "Render, masonry, fibre cement, concrete",
    location: "External",
    uvExposed: false,
    applicationNotes:
      "Apply 1 coat by brush or roller. Allow minimum 2h dry before topcoat. Thin 10% with water if required.",
    tdsLink: "https://www.dulux.com.au/acratex",
    limitations:
      "Not for use on substrates with active efflorescence or moisture. Do not apply to friable or powdery surfaces.",
  },
  {
    id: "mat-13",
    brand: "Lanko",
    productName: "Lanko 720 Structural Repair Mortar",
    category: "Structural Repair Mortar",
    suitableSystem: "Concrete Patch Repair",
    compatibleSubstrate: "Concrete, reinforced concrete",
    location: "Both",
    uvExposed: false,
    applicationNotes:
      "Apply in lifts to 50mm maximum. Pre-wet substrate. Moist cure for minimum 7 days. Bond coat required.",
    tdsLink: "https://www.sika.com/au/lanko",
    limitations:
      "Structural applications require engineer sign-off. Not for use as wearing surface. Shrinkage-compensated; do not over-dilute.",
  },
  {
    id: "mat-14",
    brand: "Ardex",
    productName: "WPM 300",
    category: "Polyurethane Sheet Membrane",
    suitableSystem: "Full Membrane Replacement",
    compatibleSubstrate: "Concrete, screeds, fibre cement",
    location: "External",
    uvExposed: false,
    applicationNotes:
      "Self-adhesive laps minimum 50mm. Adhere using Ardex Primer 50. All laps heat-welded or bonded per instructions.",
    tdsLink: "https://www.ardex.com.au",
    limitations:
      "UV protection required within 30 days. Not for direct trafficable applications without protection. Cold weather below 10°C slows adhesion.",
  },
  {
    id: "mat-15",
    brand: "Sika",
    productName: "Sikaflex 11 FC+",
    category: "1-Component Polyurethane Sealant",
    suitableSystem: "Sealant Replacement / Flashing Replacement",
    compatibleSubstrate: "Concrete, wood, ceramics, aluminium, glass",
    location: "Both",
    uvExposed: true,
    applicationNotes:
      "No primer required on most substrates. Joint depth-to-width ratio 1:2. Overcoatable with most paints.",
    tdsLink: "https://aus.sika.com",
    limitations:
      "Not for immersed conditions. Not for glass curtain wall structural glazing. Expansion joint movement ±25% of joint width.",
  },
];

// ─── Scope clauses ────────────────────────────────────────────────────────────

export const SCOPE_CLAUSES: ScopeClause[] = [
  // ── Preliminaries ──
  {
    id: "cl-prelim-01",
    category: "Preliminaries",
    title: "Site Establishment & Mobilisation",
    content:
      "The Contractor shall establish their site set-up, including any temporary hoarding, site office (if required), signage and safety systems prior to commencing any work. All site activities shall comply with relevant Work Health and Safety legislation and the building owner's site-specific requirements.",
  },
  {
    id: "cl-prelim-02",
    category: "Preliminaries",
    title: "Safe Work Method Statements (SWMS)",
    content:
      "Prior to commencing work, the Contractor shall prepare and submit SWMS for all high-risk construction work as defined under the Work Health and Safety Regulation. SWMS shall be approved by the Superintendent before any related works commence.",
  },
  {
    id: "cl-prelim-03",
    category: "Preliminaries",
    title: "Materials Approval",
    content:
      "All materials proposed for use shall be submitted to the Superintendent for review and approval prior to procurement. Product data sheets (TDS) and safety data sheets (SDS) shall be provided. No substitution of approved materials is permitted without written approval.",
  },
  // ── Access ──
  {
    id: "cl-access-01",
    category: "Access",
    title: "Building Access Co-ordination",
    content:
      "The Contractor shall co-ordinate access with the Owners Corporation / Building Manager. Not less than 48 hours' notice shall be given prior to requiring access to individual lots or common property areas. A scope of access requirements shall be provided to the Building Manager at the commencement of works.",
  },
  {
    id: "cl-access-02",
    category: "Access",
    title: "Access Equipment",
    content:
      "The Contractor shall provide all access equipment (scaffolding, elevated work platforms, boom lifts, rope access systems) as required to safely complete the works. All access equipment shall be operated by persons holding current competencies. Scaffolding shall be designed and certified as required.",
  },
  {
    id: "cl-access-03",
    category: "Access",
    title: "Hours of Work",
    content:
      "No loud power tools shall be operated outside standard construction hours (7:00am–5:00pm Monday to Saturday) without prior written approval from the Building Manager / Owners Corporation. Works involving significant noise or vibration shall be scheduled to minimise impact on building occupants.",
  },
  // ── Protection ──
  {
    id: "cl-prot-01",
    category: "Protection of Residents & Property",
    title: "Resident & Property Protection",
    content:
      "The Contractor shall take all reasonable precautions to protect residents, visitors, and their property from damage, dust, noise and disruption during the works. Temporary dust screens, drop sheets, floor protection and movement of furniture shall be carried out prior to commencing work in or adjacent to occupied areas.",
  },
  {
    id: "cl-prot-02",
    category: "Protection of Residents & Property",
    title: "Common Area Protection",
    content:
      "All common areas, finishes, fittings and landscaping adjacent to the works shall be adequately protected throughout the duration of works. Any damage caused by the Contractor shall be made good to the satisfaction of the Superintendent at no additional cost.",
  },
  // ── Demolition ──
  {
    id: "cl-demo-01",
    category: "Demolition & Strip-out",
    title: "Removal of Failed Materials",
    content:
      "All failed, delaminated, defective or contaminated materials shall be carefully removed using appropriate methods. Removal shall extend to sound substrate and beyond the visible extent of the defect as directed by the Superintendent. Any latent conditions discovered shall be promptly reported before proceeding.",
  },
  {
    id: "cl-demo-02",
    category: "Demolition & Strip-out",
    title: "Waste Disposal",
    content:
      "All removed materials, construction waste and packaging shall be collected, contained and disposed of lawfully in accordance with environmental protection legislation. No waste material shall be placed in building drainage systems. Waste records shall be maintained and provided to the Superintendent on request.",
  },
  // ── Substrate preparation ──
  {
    id: "cl-prep-01",
    category: "Substrate Preparation",
    title: "General Surface Preparation",
    content:
      "All surfaces to receive repair mortars, coatings, membranes or sealants shall be prepared in strict accordance with the relevant manufacturer's data sheet. Preparation shall include removal of all contaminants, laitance, loose material, existing coatings and organic growth. Minimum surface profile and cleanliness standards shall be achieved as specified.",
  },
  {
    id: "cl-prep-02",
    category: "Substrate Preparation",
    title: "Moisture Content Requirements",
    content:
      "Moisture content of substrates shall be within acceptable limits specified by the product manufacturer prior to application. Testing shall be carried out using appropriate instruments and results recorded. Works shall not proceed on substrates that exceed maximum moisture content limits.",
  },
  // ── Concrete breakout ──
  {
    id: "cl-concrete-01",
    category: "Concrete Breakout",
    title: "Mechanical Concrete Removal",
    content:
      "Concrete removal shall be performed using 7kg chipping hammers or angle grinders only. Pneumatic tools, large demolition hammers or other high-impact equipment shall not be used without prior written approval from the Superintendent. All breakout shall extend a minimum of 10mm behind the rearmost line of corrosion on any reinforcing steel and to a clean, laitance-free substrate.",
  },
  {
    id: "cl-concrete-02",
    category: "Concrete Breakout",
    title: "Breakout Profiles",
    content:
      "All breakout perimeters shall be saw-cut to a minimum depth of 10mm to provide a clean vertical edge. Feathered or tapered edges shall not be accepted. Breakout profiles shall be reviewed and approved by the Superintendent before repair mortar is applied.",
  },
  // ── Reinforcement treatment ──
  {
    id: "cl-reo-01",
    category: "Reinforcement Treatment",
    title: "Steel Cleaning & Preparation",
    content:
      "All exposed reinforcing steel shall be cleaned to a minimum St2 or St3 standard (ISO 8501-1) by mechanical means (wire brushing, grinding or needle gun). All rust, scale, contaminants and existing coatings shall be removed. Degreasing with a suitable solvent shall be carried out where oil or grease contamination is present.",
  },
  {
    id: "cl-reo-02",
    category: "Reinforcement Treatment",
    title: "Anti-Corrosion Coating",
    content:
      "Following cleaning, all exposed reinforcing steel shall be coated with an approved anti-corrosion primer / coating. The coating shall be applied to achieve full coverage including the underside and back of all exposed steel. Curing shall be completed per the manufacturer's specified period before encapsulation with repair mortar.",
  },
  // ── Membrane installation ──
  {
    id: "cl-mem-01",
    category: "Membrane Installation",
    title: "Waterproofing Application",
    content:
      "Membranes shall be applied strictly in accordance with the manufacturer's published installation instructions and the current edition of AS 3740 (wet areas) or AS 4654 (above-ground waterproofing) as applicable. Surface and ambient temperatures shall be within the specified range. Application rates shall be measured, recorded and maintained throughout.",
  },
  {
    id: "cl-mem-02",
    category: "Membrane Installation",
    title: "Critical Details",
    content:
      "All laps, upstands, penetrations, junctions, outlets and terminations shall be detailed in accordance with the specification and manufacturer's standard details. Reinforcing mesh or fabric shall be incorporated at all internal and external corners. Upstand height shall comply with AS 3740 minimum requirements.",
  },
  // ── Flood testing ──
  {
    id: "cl-flood-01",
    category: "Flood Testing",
    title: "Water Tightness Testing",
    content:
      "All waterproofed areas shall be flood tested in accordance with AS 3740 prior to reinstatement of any finishes or protection. The test shall be conducted with a minimum water depth of 25mm retained for a minimum of 24 hours. Test results shall be documented (photographs and written record) and submitted to the Superintendent before reinstatement commences.",
  },
  // ── Flashing ──
  {
    id: "cl-flash-01",
    category: "Flashing Installation",
    title: "Flashing General Requirements",
    content:
      "All flashings shall be installed to shed water away from the building structure. Flashings shall be lapped and sealed at all joints with a minimum lap of 75mm. End dams shall be provided at all horizontal flashing terminations. All penetrations through flashings shall be sealed with a compatible sealant.",
  },
  // ── Sealant ──
  {
    id: "cl-seal-01",
    category: "Sealant Installation",
    title: "Joint Sealant Application",
    content:
      "All existing sealant shall be fully removed using mechanical means and joint faces cleaned with a suitable solvent prior to application of new sealant. Backing rod of the correct diameter and type shall be installed to achieve the correct depth-to-width ratio (minimum 1:2). Sealant shall be tooled to a neat concave profile immediately after application.",
  },
  // ── Coating ──
  {
    id: "cl-coat-01",
    category: "Coating Application",
    title: "Protective Coating System",
    content:
      "All coating systems shall be applied in the number of coats, at the application rates and at the intercoat cure intervals specified by the manufacturer. Coatings shall not be applied in rain, fog, high humidity (above 85% RH), extreme heat (above 35°C) or to surfaces below the dew point. Test panels shall be prepared and approved before widespread application.",
  },
  // ── QA / Hold Points ──
  {
    id: "cl-qa-01",
    category: "QA & Hold Points",
    title: "Hold Point Requirements",
    content:
      "The Contractor shall notify the Superintendent a minimum of 24 hours prior to each designated hold point. Work shall not proceed past a hold point without written authorisation from the Superintendent. The following are mandatory hold points: (1) substrate preparation sign-off; (2) primer application; (3) membrane application (each coat); (4) flood test completion; (5) commencement of reinstatement.",
  },
  {
    id: "cl-qa-02",
    category: "QA & Hold Points",
    title: "Inspection & Testing Records",
    content:
      "The Contractor shall maintain a quality register recording all hold point inspections, test results (DFT, pull-off, flood test, moisture readings), material batch numbers and weather conditions at time of application. Records shall be submitted to the Superintendent at completion of the works.",
  },
  // ── Clean-up ──
  {
    id: "cl-clean-01",
    category: "Clean-up & Completion",
    title: "Progressive and Final Clean-up",
    content:
      "All building waste, removed materials, packaging and surplus product shall be removed from site regularly and not allowed to accumulate. At completion, all areas within and adjacent to the works shall be left in a clean condition, with all protection removed and surfaces cleaned to the satisfaction of the Superintendent.",
  },
  // ── Exclusions ──
  {
    id: "cl-excl-01",
    category: "Exclusions",
    title: "Scope Exclusions",
    content:
      "The following items are specifically excluded from this scope of works unless separately instructed in writing by the Superintendent: (a) any work not explicitly described in this document; (b) rectification of latent defects not visible at time of inspection; (c) structural engineering design or certification; (d) authority applications, permits or approvals; (e) works to areas or elements not identified in this scope.",
  },
  {
    id: "cl-excl-02",
    category: "Exclusions",
    title: "Latent Conditions",
    content:
      "Allowances for items of indeterminate extent (e.g. total breakout area, extent of membrane failure) are based on visible inspection only. Where the actual extent of defects differs materially from that assumed, the Contractor shall immediately notify the Superintendent and submit a variation claim prior to proceeding with additional works.",
  },
  // ── Assumptions ──
  {
    id: "cl-assum-01",
    category: "Assumptions",
    title: "Scope Assumptions",
    content:
      "This scope has been prepared on the following assumptions: (a) the building structure is fundamentally sound; (b) access arrangements described herein are achievable; (c) the building is/will be occupied/unoccupied as stated; (d) no asbestos or hazardous materials are present in the areas to be repaired. Should conditions differ, the Contractor shall notify the Superintendent immediately.",
  },
  {
    id: "cl-assum-02",
    category: "Assumptions",
    title: "Further Investigation",
    content:
      "Quantities and extents shown are based on visual inspection only. Invasive investigation may be required to determine the full extent of defects. This scope will be updated following further investigation if required. The Contractor should allow for provisional items and should clarify quantity-based items before tendering.",
  },
];

// Pre-selected default clause IDs for new projects
export const DEFAULT_CLAUSE_IDS: string[] = [
  "cl-prelim-01",
  "cl-prelim-02",
  "cl-prelim-03",
  "cl-access-01",
  "cl-access-02",
  "cl-access-03",
  "cl-prot-01",
  "cl-prot-02",
  "cl-demo-01",
  "cl-demo-02",
  "cl-prep-01",
  "cl-qa-01",
  "cl-qa-02",
  "cl-clean-01",
  "cl-excl-01",
  "cl-excl-02",
  "cl-assum-01",
  "cl-assum-02",
];

// Output type display labels
export const OUTPUT_TYPE_LABELS: Record<string, string> = {
  consultant: "Consultant-Level Scope",
  builder: "Builder Pricing Scope",
  strata: "Strata-Friendly Summary",
  methodology: "Methodology Statement",
  tender: "Tender Scope",
};

// ─── Building construction options ───────────────────────────────────────────

export const CONSTRUCTION_TYPES = [
  "Reinforced concrete frame",
  "Post-tensioned concrete",
  "Precast concrete panels",
  "Steel frame with concrete floors",
  "Timber frame (Class 2 / walk-up)",
  "Masonry / brick construction",
  "Mixed construction",
  "Unknown / not yet investigated",
];

export const ROOF_TYPES = [
  "Flat — liquid applied membrane",
  "Flat — sheet membrane (torch-on / self-adhesive)",
  "Flat — bituminous / built-up system",
  "Flat — concrete slab (waterproofed)",
  "Flat — green roof / podium garden",
  "Pitched — metal (Colorbond / Zincalume)",
  "Pitched — concrete or terracotta tile",
  "Pitched — fibrous cement or slate",
  "Unknown / not yet investigated",
];

export const EXTERNAL_WALL_TYPES = [
  "Brick / masonry cavity wall",
  "Brick / masonry solid wall",
  "Reinforced concrete (off-form)",
  "Precast concrete panels",
  "Rendered masonry or concrete",
  "Lightweight fibre cement cladding",
  "Aluminium composite panel (ACP)",
  "Glass curtain wall / unitised system",
  "Timber or metal weatherboard cladding",
  "External insulation and finish system (EIFS)",
  "Mixed / multiple types",
  "Unknown / not yet investigated",
];

// ─── Defect library URL mapping ───────────────────────────────────────────────
// Links defect categories back to the Defect Library for cross-reference

export const DEFECT_LIBRARY_URLS: Partial<Record<DefectCategory, string>> = {
  "Waterproofing & Water Ingress": "/defect-library/waterproofing-water-ingress",
  "Concrete & Structural Defects": "/defect-library/concrete-structural-defects",
  "Façade & External Envelope":    "/defect-library/facade-external-envelope",
  "Roofing Defects":               "/defect-library/roofing-defects",
  "Balconies & Podiums":           "/defect-library/balconies-podiums",
  "Services & Drainage":           "/defect-library/services-drainage",
};

// ─── Diagnostic question templates ───────────────────────────────────────────
// Auto-populated when a defect type is selected. User fills in the blanks.
// These questions mirror the investigation approach in the Defect Library.

export const DIAGNOSTIC_QUESTIONS: Record<string, string> = {
  // ── Waterproofing ──
  "Balcony Membrane Failure":
`Approximate age of existing membrane (years):
Visible blistering, bubbling or delamination:
Water ingress evidence below (soffit staining / ceiling damage):
Finishes type over membrane (tiles / pavers / screed / exposed):
Previous repairs attempted (yes/no — describe if yes):
Drainage outlet condition (clear / blocked / corroded / absent):
Extent (localised areas / widespread / full deck): `,

  "Podium Deck Waterproofing Failure":
`Podium deck area (m²):
Existing finish (tiles / pavers / exposed membrane / screed):
Age of waterproofing system (years):
Water ingress into carpark or occupied space below:
Evidence of tree or plant root intrusion:
Number and condition of drainage outlets:
Falls to drainage (adequate / ponding water observed): `,

  "Wet Area Membrane Failure":
`Affected wet area type (shower recess / bathroom / laundry / ensuite):
Unit / lot number(s):
Water damage to adjacent walls or ceilings:
Mould growth present (yes/no — extent):
Duration issue has been evident (years / months):
Finishes to be retained or replaced:
Shower hob or hobless design: `,

  "Planter Box Waterproofing Failure":
`Number of planter boxes affected:
Planter box dimensions (approx.):
Root barrier in place (yes / no / unknown):
Evidence of overflow from planting:
Age of planter box installation:
Water ingress below (soffit / garage / occupied space): `,

  "Below-Ground / Basement Waterproofing Failure":
`Area of basement affected (m²):
Type of ingress (active seepage / damp / flooding):
Location of ingress (floor slab / walls / construction joints / pile caps):
Groundwater table level (high / low / seasonal / unknown):
Existing waterproofing system (if known):
Age of building:
Any dewatering systems in place: `,

  "External Wall Water Ingress":
`Location of ingress (window reveals / wall face / joints / parapet):
Floor levels affected:
Internal damage observed (plasterboard / paint / flooring):
Weather conditions causing ingress (heavy rain / driven rain / any rain):
Cladding / wall type:
Previous repairs or investigations: `,

  // ── Concrete & Structural ──
  "Concrete Spalling (Concrete Cancer)":
`Structural elements affected (soffit / column / beam / slab edge / wall / balcony):
Visible rust staining on surface (extent and location):
Depth of existing spalling (mm):
Estimated extent of affected area (m² or no. of locations):
Building age (years):
Concrete cover depth if known (mm):
Structural engineer involved or required:
Previous concrete patch repairs (yes/no): `,

  "Carbonation-Induced Corrosion":
`Building age (years):
Depth of carbonation if tested (mm):
Concrete cover depth (mm):
Extent of rust staining visible:
Structural elements affected:
Carbonation or half-cell testing conducted (yes/no — results if available):
Previous protective treatments applied: `,

  "Chloride-Induced Corrosion":
`Distance from coastline (approx. m):
Building age (years):
Chloride levels tested (yes/no — results if available):
Extent and location of rust staining:
Structural elements affected:
Concrete cover depth if known (mm):
Corrosion protection measures in original design: `,

  "Structural Cracking":
`Crack widths observed (mm):
Crack length and extent:
Pattern (diagonal / vertical / horizontal / stepped / map cracking):
Active (moving) or dormant:
Any associated water ingress:
Location (internal / external / structural element):
Structural engineer assessment conducted (yes/no): `,

  "Post-Tensioned Concrete Defects":
`Evidence of PT tendon corrosion or failure:
Location of defects (slab / beam / suspended floor):
Structural engineer involved (yes/no):
Any deflection or serviceability issues:
Building age:
Extent of delamination or cracking: `,

  "Concrete Delamination":
`Extent of delamination (m²):
Structural elements affected:
Tap test conducted — hollow areas identified:
Any associated cracking or rust staining:
Suspected cause (shrinkage / freeze-thaw / contamination / construction defect): `,

  // ── Façade & External Envelope ──
  "External Wall Coating Failure":
`Failure type (peeling / blistering / chalking / cracking / delamination):
Extent of failure (localised / widespread — %):
Years since last repaint or coating application:
Underlying substrate condition (sound / friable / cracked / damp):
Evidence of water ingress through coating:
Previously applied coating system (if known): `,

  "Cladding Defects":
`Cladding material type (ACP / fibre cement / EIFS / GRC / other):
Combustibility concerns identified (yes/no):
Fixings condition (secure / corroding / missing / loose):
Joint and sealant condition:
Evidence of water ingress behind cladding:
Area of cladding affected (m²): `,

  "Expansion Joint Failure":
`Number of joints affected:
Joint type (movement joint / construction joint / control joint):
Sealant condition (debonded / cracked / missing / hardened):
Evidence of water ingress through joint:
Joint width (mm):
Previous joint treatment: `,

  "Render Failure":
`Failure type (cracking / delamination / hollow / moisture damage / efflorescence):
Area of failure (m²):
Render thickness (mm if known):
Substrate type (masonry / concrete / lightweight):
Evidence of water ingress:
Age of existing render system: `,

  // ── Roofing ──
  "Roof Membrane Failure":
`Roof area (m²):
Membrane type (liquid applied / sheet / torch-on / bituminous):
Age of system (years):
Evidence of ponding water:
Drainage outlet condition and number:
Fall to drainage (adequate / areas of reverse fall):
Previous repairs carried out: `,

  "Flashing Failure":
`Location of failed flashing (parapet / penetration / edge / step flashing / cap):
Flashing material (aluminium / Colorbond / lead / PVC):
Failure mode (corroded / open lap / lifted / missing / unsealed):
Evidence of water ingress at flashing:
Number of locations affected: `,

  // ── Balconies & Podiums ──
  "Balcony Tile Delamination":
`Approximate area of hollow or delaminated tiles (m²):
Tile size and type (ceramic / porcelain / stone):
Signs of grout cracking or joint failure:
Evidence of water ingress below:
Age of tile installation (years):
Bedding compound type (if known): `,

  "Balcony Drainage Failure":
`Number and location of outlets affected:
Outlet type (centre drain / edge drain / scupper):
Evidence of ponding water during or after rain:
Floor level falls (adequate / reverse fall / flat):
Evidence of overflow or water ingress into building: `,

  "Structural Concrete Deterioration":
`Location on balcony (slab edge / soffit / beam / balustrade post base):
Extent of concrete deterioration:
Rust staining visible:
Structural engineer involved:
Any cracking or deflection of balcony: `,

  // ── Windows & Flashings ──
  "Window Sealant Failure":
`Number of windows and units affected:
Evidence of water ingress into building (yes/no):
Sealant condition (shrunk / cracked / debonded / absent):
Window frame material (aluminium / timber / uPVC):
Age of windows (years):
Failure location (head / jamb / sill / perimeter): `,

  "Head Flashing Failure":
`Number of windows affected:
Evidence of water ingress at window head:
Flashing material and condition:
Weep holes present and clear (yes/no):
Adjacent render or cladding condition: `,

  // ── Services & Drainage ──
  "Blocked Stormwater Drainage":
`Number of outlets affected:
Frequency of overflow during rain:
Evidence of property damage from overflows:
Pipe material (PVC / cast iron / clay / concrete):
Last cleaned or inspected (date if known):
Location (roof / podium / carpark / garden): `,

  "Inadequate Drainage Capacity":
`Area of hard surface draining to affected outlets (m²):
Pipe diameter and gradient:
Frequency and severity of overflow:
Hydraulic engineer assessment undertaken:
Proposed catchment area changes (e.g. green roof to hard surface): `,

  "Drainage Outlet Failure":
`Number of outlets affected:
Outlet type (membrane-flanged / cast iron / PVC / scupper):
Failure mode (blocked / corroded / debonded / missing flange):
Evidence of leakage at outlet:
Age of outlets (years): `,
};
