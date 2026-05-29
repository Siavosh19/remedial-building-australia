// Category seed script - 29 parent categories + all subcategories
// Run: node scripts/seed-categories-v3.js

require("dotenv").config({ path: ".env.local" });
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function slug(name) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\//g, "-")
    .replace(/[().,]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const TAXONOMY = [
  {
    name: "Consultants & Practitioners",
    slug: "consultants-practitioners",
    subs: [
      "Remedial Consultants","Building Consultants","Strata Remedial Consultants",
      "Dilapidation Consultants","Forensic Building Consultants","Defects Consultants",
      "Asset Management Consultants","Facilities Management Consultants","Building Managers",
      "Owners Corporation Managers","Strata Managers","Community Association Managers",
      "NCC / BCA Compliance Consultants","Accessibility Consultants (DDA)","Heritage Consultants",
      "Sustainability Consultants","Energy Efficiency Consultants","NatHERS Assessors",
      "NABERS Assessors","Green Star Consultants","BASIX Consultants",
      "Expert Witnesses (Building)","Dispute Resolution Consultants","Quantity Surveyors",
      "Project Managers","Construction Managers","Development Managers","Development Consultants",
    ],
  },
  {
    name: "Engineering Services",
    slug: "engineering-services",
    subs: [
      "Structural Engineers","Civil Engineers","Facade Engineers","Geotechnical Engineers",
      "Environmental Engineers","Hydraulic Engineers","Mechanical Engineers","Electrical Engineers",
      "Fire Engineers","Acoustic Engineers","Wind Engineers","Traffic Engineers",
      "Corrosion Engineers","Materials Engineers","Forensic Engineers","Sustainability Engineers",
      "Building Services Engineers","Vertical Transport Engineers","Telecommunications Engineers",
    ],
  },
  {
    name: "DBP Practitioners",
    slug: "dbp-practitioners",
    subs: [
      "DBP Design Practitioner - Class 1","DBP Design Practitioner - Class 2",
      "DBP Design Practitioner - Facade","DBP Design Practitioner - Structural",
      "DBP Design Practitioner - Mechanical","DBP Design Practitioner - Electrical",
      "DBP Design Practitioner - Fire Safety","DBP Design Practitioner - Waterproofing",
      "DBP Building Practitioner - Class 1","DBP Building Practitioner - Class 2",
      "DBP Building Practitioner - Facade","DBP Building Practitioner - Structural",
    ],
  },
  {
    name: "Building Surveyors & Certifiers",
    slug: "building-surveyors-certifiers",
    subs: [
      "Building Surveyors","Principal Certifiers (PCA)","Construction Certificate Certifiers",
      "Occupation Certificate Certifiers","Complying Development Certifiers","Building Inspectors",
      "Swimming Pool Inspectors","Plumbing Inspectors","Drainage Inspectors",
      "Essential Services Inspectors","Annual Fire Safety Statement Inspectors",
      "Asbestos Assessors","Hazardous Materials Assessors","WHS Consultants","SafeWork Consultants",
    ],
  },
  {
    name: "Remedial Contractors",
    slug: "remedial-contractors",
    subs: [
      "Class 1 Remedial Builders","Class 2 Remedial Builders","Remedial Builders",
      "Specialist Remedial Contractors","Facade Remediation Contractors",
      "Structural Remediation Contractors","Concrete Cancer Repair Contractors",
      "Concrete Spalling Contractors","Crack Injection Contractors","Carbon Fibre / FRP Contractors",
      "Shotcrete Contractors","Micro-Concrete Contractors","Grouting Contractors",
      "Cathodic Protection Specialists","Galvanic Anode Installers","Balcony Repair Contractors",
      "Basement Remediation Contractors","Protective Coating Contractors",
      "Sealant Contractors","Structural Steel Contractors",
    ],
  },
  {
    name: "Waterproofing",
    slug: "waterproofing",
    subs: [
      "Licensed Waterproofers","Remedial Waterproofing Contractors","Balcony Waterproofing Contractors",
      "Roof Waterproofing Contractors","Podium Waterproofing Contractors",
      "Basement Waterproofing Contractors","Planter Box Waterproofing Contractors",
      "Negative Side Waterproofing Contractors","Injection Waterproofing Contractors",
      "Liquid Membrane Contractors","Sheet Membrane Contractors","Waterproofing Inspectors",
      "Flood Testing Services","Dampproofing Contractors","Tanking Contractors",
      "Crystalline Waterproofing Contractors",
    ],
  },
  {
    name: "Roofing",
    slug: "roofing",
    subs: [
      "Roofing Contractors","Roof Plumbers","Metal Roofing Contractors","Tile Roofers",
      "Membrane Roofing Contractors","Torch-On Membrane Contractors","Slate Roofers",
      "Green Roof Installers","Solar Roof Installers","Box Gutter Contractors",
      "Flashing Contractors","Skylight Installers","Roof Ventilation Installers",
      "Roof Leak Repair Contractors",
    ],
  },
  {
    name: "Facade & External Envelope",
    slug: "facade-external-envelope",
    subs: [
      "Cladding Contractors","ACP Replacement Contractors","Renderers","Render Repair Contractors",
      "Facade Coating Contractors","Facade Access Contractors","External Insulation Contractors (EIFS)",
      "Stone Cladding Contractors","Terracotta Cladding Contractors","Precast Concrete Panel Contractors",
      "Aluminium Window Contractors","Window Replacement Contractors","Timber Window Contractors",
      "Timber Window Restoration Specialists","Heritage Window Contractors",
      "Window Waterproofing Specialists","Window Leak Repair Contractors","Glaziers",
      "Curtain Wall Contractors","Balustrade Contractors","Handrail Contractors",
      "Louvres / Screens Contractors","Awning Installers","Shading System Contractors",
    ],
  },
  {
    name: "Masonry & Brick Repair",
    slug: "masonry-brick-repair",
    subs: [
      "Bricklayers","Blocklayers","Brick Repointing Contractors","Brick Replacement Contractors",
      "Brick Crack Repair Specialists","Tuckpointing Specialists","Masonry Stitching / Helifix Installers",
      "Heritage Masonry Contractors","Cavity Flashing Repair Contractors",
      "Corroded Lintel Repair Contractors","Parapet Repair Contractors",
      "Stone Restoration Contractors","Stonemasons","Masonry Cleaning Contractors",
      "Efflorescence Treatment Contractors","Renderers","Plasterers","Fibrous Plasterers",
    ],
  },
  {
    name: "Joints & Movement",
    slug: "joints-movement",
    subs: [
      "Expansion Joint Contractors","Control Joint Contractors",
      "Movement Joint System Suppliers","Architectural Joint Specialists",
    ],
  },
  {
    name: "Access Systems",
    slug: "access-systems",
    subs: [
      "Scaffold Companies","Swing Stage Providers","Mast Climber Providers","Hoist Providers",
      "Rope Access Contractors","BMU Providers","Height Safety Contractors",
      "Anchor Point Installers","Static Line Installers","Temporary Edge Protection",
      "Traffic Control","Hoarding Companies","Gantry Contractors",
    ],
  },
  {
    name: "Investigation & Testing",
    slug: "investigation-testing",
    subs: [
      "Leak Detection Specialists","Concrete Scanning","NDT Testing","Corrosion Testing",
      "Concrete Testing Labs","Drone Inspection","Thermographic / Infrared Inspection",
      "Geotechnical Testing","Structural Monitoring","Moisture Testing","CCTV Drain Inspection",
      "Waterproofing Inspectors","Land Surveyors","Measured Survey Contractors",
      "3D Scanning Contractors","Laser Scanning Contractors","As Built Survey Contractors",
      "Air Quality Testing","Soil Testing Contractors",
    ],
  },
  {
    name: "Hazardous Materials",
    slug: "hazardous-materials",
    subs: [
      "Asbestos Consultants","Asbestos Removal Contractors","Mould Remediation Contractors",
      "Lead Paint Contractors","Hazardous Materials Consultants","Contaminated Materials Disposal",
      "Contaminated Soil Contractors","Chemical Waste Contractors","Bird Control Contractors",
      "Rodent Control Contractors","Termite Treatment Contractors","Pest Control Contractors",
    ],
  },
  {
    name: "Demolition & Strip-Out",
    slug: "demolition-strip-out",
    subs: [
      "Selective Demolition Contractors","Tile & Screed Strip-Out Contractors",
      "Concrete Breaking Contractors","Hydro-Demolition Contractors","Concrete Saw Cutting",
      "Core Drilling","Earthmoving Contractors","Excavators","Bobcat Operators",
    ],
  },
  {
    name: "Plumbing & Drainage",
    slug: "plumbing-drainage",
    subs: [
      "General Plumbers","Emergency Plumbers","Commercial Plumbers","Industrial Plumbers",
      "Remedial Plumbers","Roof Plumbers","Gas Fitters","Mechanical Plumbers",
      "Hot Water System Contractors","Backflow Prevention Specialists","Pipe Relining Contractors",
      "Drainage Contractors","Stormwater Contractors","Stormwater Pit & Grate Contractors",
      "Stormwater Harvesting Contractors","Stormwater Detention System Contractors",
      "Stormwater Design Consultants","Civil Drainage Contractors","Downpipe Contractors",
      "Pump System Contractors","Sewer Contractors","Grease Trap Contractors",
      "Water Filtration Contractors","Rainwater Harvesting Contractors",
    ],
  },
  {
    name: "Electrical",
    slug: "electrical",
    subs: [
      "General Electricians","Commercial Electricians","Industrial Electricians",
      "Emergency Electricians","Strata Electricians","High Voltage Electricians",
      "Switchboard Upgrades","Lighting Contractors","Emergency Lighting Contractors",
      "Exit Sign Contractors","Data & Communications Electricians","Solar & Battery Installers",
      "EV Charging Installers","Security Electricians","Intercom & CCTV Contractors",
      "Test & Tag Contractors","Building Automation Contractors","Smart Building Contractors",
      "AV Installers","NBN Installers","Antenna Installers","Fibre Optic Contractors",
      "IoT Installers",
    ],
  },
  {
    name: "HVAC & Mechanical",
    slug: "hvac-mechanical",
    subs: [
      "Air Conditioning Contractors","Mechanical Services Contractors","Ventilation Contractors",
      "Ductwork Contractors","Chiller Contractors","Boiler Contractors",
      "Hydronic Heating Contractors","Split System Installers","BMS Contractors",
      "Refrigeration Contractors",
    ],
  },
  {
    name: "Fire Services",
    slug: "fire-services",
    subs: [
      "Passive Fire Contractors","Fire Stopping Contractors","Fire Door Contractors",
      "Fire Sprinkler Contractors","Fire Hydrant Contractors","Fire Alarm Contractors",
      "Fire Suppression Contractors","Smoke Control System Contractors","Fire Safety Officers",
      "Intumescent Coating Contractors","Annual Fire Safety Statement Inspectors",
      "AS1851 Compliance Inspectors",
    ],
  },
  {
    name: "Security & Access Control",
    slug: "security-access-control",
    subs: [
      "Security System Installers","CCTV Installers","Access Control System Installers",
      "Intercom Installers","Boom Gate Installers","Perimeter Security Contractors",
      "Alarm Monitoring Services","Locksmiths","Master Key System Installers",
      "Biometric Access Installers",
    ],
  },
  {
    name: "Lifts & Vertical Transport",
    slug: "lifts-vertical-transport",
    subs: [
      "Lift Installers","Lift Maintenance Contractors","Escalator Contractors",
      "Dumbwaiter Installers","Platform Lift Installers","Stair Lift Installers",
    ],
  },
  {
    name: "Specialist Trades",
    slug: "specialist-trades",
    subs: [
      "Painters","Commercial Painters","Industrial Painters","Sandblasters / Abrasive Blasters",
      "Line Marking Contractors","Carpenters","Joiners","Cabinet Makers","Door Installers",
      "Staircase Contractors","Decking Contractors","Pergola Builders","Tilers","Screeders",
      "Vinyl Floor Layers","Carpet Layers","Timber Floor Layers","Epoxy Flooring Contractors",
      "Polished Concrete Contractors","Anti Slip Coating Contractors","Floor Grinding Contractors",
      "Concreters","Concrete Pumping","Caulking Contractors","Steel Fabricators",
      "Structural Steel Erectors","Aluminium Fabricators","Stainless Steel Contractors",
      "Sheet Metal Workers","Welders","Fence Installers","Gate Installers","Pool Builders",
      "Signage Contractors","Blinds & Window Covering Installers",
    ],
  },
  {
    name: "Landscaping & Grounds",
    slug: "landscaping-grounds",
    subs: [
      "Landscape Contractors","Landscape Designers","Irrigation Contractors",
      "Garden Maintenance Contractors","Tree Services / Arborists","Tree Surgeons",
      "Turf Suppliers & Installers","Retaining Wall Contractors","Paving Contractors",
      "Outdoor Drainage Contractors","Outdoor Lighting Contractors",
      "Pool & Water Feature Contractors","Pool Maintenance Contractors",
      "Strata Grounds Maintenance","Deck Builders",
    ],
  },
  {
    name: "Cleaning & Maintenance",
    slug: "cleaning-maintenance",
    subs: [
      "Strata Cleaning Companies","Commercial Cleaners","Window Cleaners",
      "High-Rise Window Cleaning (Rope Access)","Pressure Washing Contractors",
      "Car Park Cleaners","Bin Room Cleaners","Common Area Cleaners",
      "Graffiti Removal Contractors","Carpet Cleaners","Rubbish Removal Contractors",
      "Skip Bin Hire","Waste Management Contractors",
    ],
  },
  {
    name: "Solar & Renewables",
    slug: "solar-renewables",
    subs: [
      "Solar Panel Installers","Battery Storage Installers","EV Charging Installers",
      "Solar Hot Water Installers","Greywater System Contractors","Rainwater Tank Installers",
      "Wind Energy Contractors",
    ],
  },
  {
    name: "Strata Management & Advisory",
    slug: "strata-management-advisory",
    subs: [
      "Strata Managers","Owners Corporation Managers","Community Association Managers",
      "Building Managers","Facilities Managers","Strata Lawyers","Owners Corporation Lawyers",
      "Strata Mediators","Strata Adjudicators","NCAT Representatives","Strata Financial Advisors",
      "Strata Insurance Brokers","Strata Loan Providers","Strata Finance Consultants",
      "Strata Search Agents","Strata By-Law Consultants","Strata Dispute Consultants",
    ],
  },
  {
    name: "Planning & Development",
    slug: "planning-development",
    subs: [
      "Town Planners","Urban Designers","Heritage Consultants","Environmental Impact Consultants",
      "Flood Consultants","Bushfire Consultants","Acoustic Planning Consultants",
      "Traffic and Parking Consultants","Arborist Report Consultants",
      "Contamination Report Consultants","Planning Lawyers","Aboriginal Heritage Consultants",
    ],
  },
  {
    name: "Legal, Insurance & Finance",
    slug: "legal-insurance-finance",
    subs: [
      "Building Defect Lawyers","Construction Lawyers","Strata Lawyers",
      "Owners Corporation Lawyers","Planning Lawyers","Insurance Brokers",
      "Strata Insurance Brokers","Construction Finance Providers","Strata Loan Providers",
      "Expert Witnesses (Building)","Mediators / Adjudicators","Arbitrators",
    ],
  },
  {
    name: "Technology & Software",
    slug: "technology-software",
    subs: [
      "BIM / Digital Twin Consultants","Asset Management Software","Defect Management Platforms",
      "Strata Reporting Software","Building Information Platforms","Smart Building Software",
      "IoT Platform Providers","Drone Survey Software","Building Compliance Software",
    ],
  },
  {
    name: "Suppliers & Materials",
    slug: "suppliers-materials",
    subs: [
      "Waterproofing Suppliers","Concrete Repair Suppliers","Sealant Suppliers","Coating Suppliers",
      "Roofing Material Suppliers","Facade Material Suppliers","Brick / Masonry Suppliers",
      "Timber Suppliers","Steel Suppliers","Glass Suppliers","Insulation Suppliers",
      "Flooring Suppliers","Paint Suppliers","Chemical Suppliers","Fastener Suppliers",
      "Access Equipment Suppliers","Safety Equipment Suppliers","Testing Equipment Suppliers",
      "Epoxy / Injection Resin Suppliers","Expansion Joint Suppliers","Carbon Fibre / FRP Suppliers",
      "Formwork Suppliers","Signage / Hoarding Suppliers","Concrete Suppliers","Tool Hire Companies",
    ],
  },
];

async function main() {
  console.log("Starting category seed v3...");

  // 1. Null out company main_category_id and clear join table
  await prisma.$executeRaw`UPDATE companies SET main_category_id = NULL`;
  await prisma.$executeRaw`DELETE FROM company_categories`;
  console.log("Cleared company category references.");

  // 2. Null out lead category references
  await prisma.$executeRaw`UPDATE leads SET category_id = NULL WHERE category_id IS NOT NULL`;
  await prisma.$executeRaw`UPDATE leads SET subcategory_id = NULL WHERE subcategory_id IS NOT NULL`;
  console.log("Cleared lead category references.");

  // 3. Delete all categories (children first, then parents)
  await prisma.$executeRaw`DELETE FROM categories WHERE parent_id IS NOT NULL`;
  await prisma.$executeRaw`DELETE FROM categories WHERE parent_id IS NULL`;
  console.log("Deleted all existing categories.");

  // 4. Seed parents
  let parentCount = 0;
  let subCount = 0;

  for (let i = 0; i < TAXONOMY.length; i++) {
    const parent = TAXONOMY[i];
    const created = await prisma.category.create({
      data: {
        name: parent.name,
        slug: parent.slug,
        display_order: i + 1,
        is_active: true,
      },
    });
    parentCount++;

    // 5. Seed subcategories
    for (let j = 0; j < parent.subs.length; j++) {
      const subName = parent.subs[j];
      let subSlug = slug(subName);
      // Ensure slug uniqueness by prefixing with parent slug if needed
      // (some sub names like "Renderers" appear in multiple parents)
      const existing = await prisma.category.findFirst({ where: { slug: subSlug } });
      if (existing) {
        subSlug = `${parent.slug}-${subSlug}`;
      }
      await prisma.category.create({
        data: {
          name: subName,
          slug: subSlug,
          parent_id: created.id,
          display_order: j + 1,
          is_active: true,
        },
      });
      subCount++;
    }
    console.log(`  [${i + 1}/29] ${parent.name} — ${parent.subs.length} subcategories`);
  }

  // 6. Assign test companies to first parent category
  const firstCat = await prisma.category.findFirst({ where: { slug: "remedial-contractors" } });
  if (firstCat) {
    await prisma.$executeRaw`UPDATE companies SET main_category_id = ${firstCat.id} WHERE status = 'published'`;
    console.log(`Re-assigned ${await prisma.company.count({ where: { status: "published" } })} published companies to "Remedial Contractors".`);
  }

  console.log(`\nDone! ${parentCount} parent categories + ${subCount} subcategories seeded.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
