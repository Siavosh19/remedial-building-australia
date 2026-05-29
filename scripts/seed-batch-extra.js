require("dotenv").config({ path: ".env.local" });
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const cats = await prisma.category.findMany({ select: { id: true, slug: true, name: true } });
  const catBySlug = Object.fromEntries(cats.map(c => [c.slug, c]));

  const existing = await prisma.company.findMany({ select: { name: true, slug: true } });
  const existingNames = new Set(existing.map(c => c.name.toLowerCase().trim()));

  function makeSlug(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  const businesses = [
    // =============================================
    // MORE ENGINEERING / CONSULTANTS
    // =============================================
    {
      name: "Endeavour Engineering Group",
      website: "https://endeavoureng.com.au",
      phone: "02 9062 3224",
      email: "admin@endeavoureng.com.au",
      address: "1 Barratt Street, Hurstville NSW 2220",
      suburb: "Hurstville",
      state: "NSW",
      postcode: "2220",
      confidence: 75,
      categorySlug: "engineering-services",
      description: "Specialist remedial and structural engineering providing inspections and reports for strata corporations and property owners across NSW.",
      nationwide: false,
    },
    {
      name: "Principal Built Engineering",
      website: "https://www.pbengineering.com.au",
      phone: "03 8564 8597",
      email: "info@pbengineering.com.au",
      address: "470 St Kilda Road, Melbourne VIC 3004",
      suburb: "Melbourne",
      state: "VIC",
      postcode: "3004",
      confidence: 75,
      categorySlug: "engineering-services",
      description: "Structural and civil engineering consultancy specialising in strata building inspections, defect analysis and compliance in Melbourne.",
      nationwide: false,
    },
    {
      name: "DDEG Building Compliance",
      website: "https://ddeg.com.au",
      phone: "1300 470 578",
      email: "",
      address: "Suite 102, Level 1, 5 Rider Boulevard, Rhodes NSW 2138",
      suburb: "Rhodes",
      state: "NSW",
      postcode: "2138",
      confidence: 55,
      categorySlug: "facade-external-envelope",
      description: "Facade engineering, fire engineering and building compliance consultants providing performance-based design solutions.",
      nationwide: false,
    },
    // =============================================
    // BUILDING SURVEYORS / CERTIFIERS
    // =============================================
    {
      name: "Steve Watson and Partners",
      website: "https://stevewatsonandpartners.com.au",
      phone: "02 9283 6555",
      email: "info@stevewatsonandpartners.com.au",
      address: "Level 17, 456 Kent Street, Sydney NSW 2000",
      suburb: "Sydney",
      state: "NSW",
      postcode: "2000",
      confidence: 75,
      categorySlug: "building-surveyors-certifiers",
      description: "Building code consultants, surveyors and certifiers providing certification and compliance services in Sydney and NSW.",
      nationwide: false,
    },
    {
      name: "Grinsell and Johns",
      website: "https://www.grinsell.com.au",
      phone: "02 9790 6608",
      email: "admin@grinsell.com.au",
      address: "Level 3, 31 Grose Street, Parramatta NSW 2150",
      suburb: "Parramatta",
      state: "NSW",
      postcode: "2150",
      confidence: 75,
      categorySlug: "building-surveyors-certifiers",
      description: "Private subdivision certifiers and building surveyors serving Sydney and NSW with development certification services.",
      nationwide: false,
    },
    // =============================================
    // HVAC / MECHANICAL
    // =============================================
    {
      name: "Enterprise Air Conditioning",
      website: "https://www.enterpriseairconditioning.com.au",
      phone: "02 9987 4573",
      email: "info@enterpriseairconditioning.com.au",
      address: "8/8 Leighton Place, Hornsby NSW 2077",
      suburb: "Hornsby",
      state: "NSW",
      postcode: "2077",
      confidence: 75,
      categorySlug: "hvac-mechanical",
      description: "Commercial and strata air conditioning specialists preferred by body corporates and property managers throughout Sydney.",
      nationwide: false,
    },
    {
      name: "Austech Air Conditioning",
      website: "https://austechairconditioning.com.au",
      phone: "1300 135 637",
      email: "",
      address: "Sydney NSW 2000",
      suburb: "Sydney",
      state: "NSW",
      postcode: "2000",
      confidence: 55,
      categorySlug: "hvac-mechanical",
      description: "Commercial and residential air conditioning installation and maintenance services with over 20 years experience in Sydney.",
      nationwide: false,
    },
    // =============================================
    // ELECTRICAL
    // =============================================
    {
      name: "CFS Electrics",
      website: "https://www.cfselectrics.com",
      phone: "02 8005 0950",
      email: "",
      address: "Sydney NSW 2000",
      suburb: "Sydney",
      state: "NSW",
      postcode: "2000",
      confidence: 55,
      categorySlug: "electrical",
      description: "Licensed strata and real estate electricians providing reliable electrical services for strata schemes across Sydney.",
      nationwide: false,
    },
    {
      name: "AB Electrical and Communications",
      website: "https://www.abelectricians.com.au",
      phone: "02 9061 7060",
      email: "",
      address: "Sydney NSW 2000",
      suburb: "Sydney",
      state: "NSW",
      postcode: "2000",
      confidence: 55,
      categorySlug: "electrical",
      description: "Professional electricians in Sydney specialising in residential, commercial and strata electrical services.",
      nationwide: false,
    },
    // =============================================
    // SECURITY / ACCESS CONTROL
    // =============================================
    {
      name: "Serious Security",
      website: "https://www.serioussecurity.com.au",
      phone: "02 8734 3250",
      email: "sales@serioussecurity.com.au",
      address: "Sydney NSW 2000",
      suburb: "Sydney",
      state: "NSW",
      postcode: "2000",
      confidence: 75,
      categorySlug: "security-access-control",
      description: "Integrated access control, CCTV and alarm systems for commercial and strata buildings in Sydney and Melbourne.",
      nationwide: false,
    },
    {
      name: "Sydneywide Security",
      website: "https://sydneywidesecurity.com.au",
      phone: "1300 029 999",
      email: "",
      address: "Sydney NSW 2000",
      suburb: "Sydney",
      state: "NSW",
      postcode: "2000",
      confidence: 55,
      categorySlug: "security-access-control",
      description: "Commercial and residential access control and security system specialists across Sydney.",
      nationwide: false,
    },
    // =============================================
    // STRATA MANAGEMENT — MELBOURNE
    // =============================================
    {
      name: "Melcorp Strata",
      website: "https://melcorpstrata.com.au",
      phone: "03 8638 1822",
      email: "info@melcorpstrata.com.au",
      address: "A17/501 Swanston Street, Melbourne VIC 3000",
      suburb: "Melbourne",
      state: "VIC",
      postcode: "3000",
      confidence: 75,
      categorySlug: "strata-management-advisory",
      description: "Leading owners corporation management company in Melbourne providing comprehensive strata management services for 15 years.",
      nationwide: false,
    },
    {
      name: "Australian Strata Management",
      website: "https://asmstrata.com.au",
      phone: "02 9790 0078",
      email: "",
      address: "Sydney NSW 2000",
      suburb: "Sydney",
      state: "NSW",
      postcode: "2000",
      confidence: 55,
      categorySlug: "strata-management-advisory",
      description: "Trusted strata and body corporate management with over 60 branches across Australia since 1989.",
      nationwide: true,
    },
    // =============================================
    // CLEANING — MELBOURNE
    // =============================================
    {
      name: "Keen to Clean",
      website: "https://keentoclean.com.au",
      phone: "1300 737 978",
      email: "enquiry@keentoclean.com.au",
      address: "Suite A, Level 1, 104 Burwood Road, Hawthorn VIC 3122",
      suburb: "Hawthorn",
      state: "VIC",
      postcode: "3122",
      confidence: 75,
      categorySlug: "cleaning-maintenance",
      description: "Professional body corporate and strata cleaning services for apartment buildings in Melbourne and Sydney.",
      nationwide: false,
    },
    // =============================================
    // ROOFING — MELBOURNE
    // =============================================
    {
      name: "Melbourne Commercial Roofing",
      website: "https://melbournecommercialroofing.com.au",
      phone: "0407 530 111",
      email: "",
      address: "Melbourne VIC 3000",
      suburb: "Melbourne",
      state: "VIC",
      postcode: "3000",
      confidence: 55,
      categorySlug: "roofing",
      description: "Melbourne's leading commercial metal roofing company with over 40 years delivering quality roof installations and repairs.",
      nationwide: false,
    },
    {
      name: "Watermaster Steel Roofing",
      website: "https://www.watermasterroofing.com.au",
      phone: "1300 576 075",
      email: "",
      address: "Melbourne VIC 3000",
      suburb: "Melbourne",
      state: "VIC",
      postcode: "3000",
      confidence: 55,
      categorySlug: "roofing",
      description: "Metal roofing specialists in Melbourne providing roof replacements, repairs and roof plumbing services.",
      nationwide: false,
    },
    // =============================================
    // HAZARDOUS MATERIALS — MELBOURNE
    // =============================================
    {
      name: "Asbestos Removal Co",
      website: "https://asbestosremovalco.com.au",
      phone: "0414 390 450",
      email: "info@asbestosremovalco.com.au",
      address: "Melbourne VIC 3000",
      suburb: "Melbourne",
      state: "VIC",
      postcode: "3000",
      confidence: 75,
      categorySlug: "hazardous-materials",
      description: "WorkSafe and EPA Victoria accredited asbestos removal specialists with over 35 years of experience in Melbourne.",
      nationwide: false,
    },
    // =============================================
    // MOULD REMEDIATION
    // =============================================
    {
      name: "PureProtect",
      website: "https://pureprotect.com.au",
      phone: "1800 664 602",
      email: "info@pureprotect.com.au",
      address: "Unit 3, 41-43 Green Street, Banksmeadow NSW 2019",
      suburb: "Banksmeadow",
      state: "NSW",
      postcode: "2019",
      confidence: 75,
      categorySlug: "hazardous-materials",
      description: "Sydney's leading mould removal, remediation and restoration company serving residential and commercial properties.",
      nationwide: false,
    },
    // =============================================
    // LANDSCAPING
    // =============================================
    {
      name: "Earthform Landscaping",
      website: "https://earthformlandscaping.com.au",
      phone: "0468 448 831",
      email: "",
      address: "Sydney NSW 2000",
      suburb: "Sydney",
      state: "NSW",
      postcode: "2000",
      confidence: 55,
      categorySlug: "landscaping-grounds",
      description: "Strata grounds maintenance specialists servicing all local government areas across Greater Sydney.",
      nationwide: false,
    },
    {
      name: "Accord Property Services",
      website: "https://accordproperty.com.au",
      phone: "1300 122 267",
      email: "",
      address: "Sydney NSW 2000",
      suburb: "Sydney",
      state: "NSW",
      postcode: "2000",
      confidence: 55,
      categorySlug: "landscaping-grounds",
      description: "Commercial grounds and garden maintenance for strata, office, industrial, health and government sectors across Sydney.",
      nationwide: false,
    },
    // =============================================
    // SCAFFOLDING — MELBOURNE
    // =============================================
    {
      name: "Western Scaffold",
      website: "https://westernscaffold.com.au",
      phone: "03 8360 8047",
      email: "",
      address: "Melbourne VIC 3000",
      suburb: "Melbourne",
      state: "VIC",
      postcode: "3000",
      confidence: 55,
      categorySlug: "access-systems",
      description: "Scaffolding hire services for builders, trades and owner builders in Melbourne, Geelong and regional Victoria.",
      nationwide: false,
    },
    {
      name: "Alltrade Scaffolding",
      website: "https://www.alltradescaffolding.com.au",
      phone: "1300 578 243",
      email: "",
      address: "Melbourne VIC 3000",
      suburb: "Melbourne",
      state: "VIC",
      postcode: "3000",
      confidence: 55,
      categorySlug: "access-systems",
      description: "Commercial and residential scaffolding hire and installation services across Melbourne.",
      nationwide: false,
    },
    // =============================================
    // EPOXY FLOORING — MELBOURNE
    // =============================================
    {
      name: "Epoxy Gurus Melbourne",
      website: "https://www.epoxygurusmelbourne.com.au",
      phone: "03 9988 9188",
      email: "",
      address: "Melbourne VIC 3000",
      suburb: "Melbourne",
      state: "VIC",
      postcode: "3000",
      confidence: 55,
      categorySlug: "specialist-trades",
      description: "Commercial and residential epoxy flooring specialists in Melbourne delivering durable, high-quality floor coating solutions.",
      nationwide: false,
    },
  ];

  let added = 0, skipped = 0;
  for (const b of businesses) {
    if (existingNames.has(b.name.toLowerCase().trim())) { console.log(`SKIP (exists): ${b.name}`); skipped++; continue; }
    const cat = catBySlug[b.categorySlug];
    if (!cat) { console.log(`No cat for slug "${b.categorySlug}" — ${b.name}`); skipped++; continue; }

    const slug = makeSlug(b.name);
    try {
      await prisma.company.create({
        data: {
          name: b.name,
          slug: slug,
          description: b.description || null,
          phone: b.phone || null,
          website: b.website || null,
          email: b.email || "",
          status: "published",
          profile_status: "basic",
          is_claimed: false,
          is_featured: false,
          confidence_score: b.confidence,
          main_category_id: cat.id,
          locations: b.suburb ? {
            create: [{
              address: b.address || `${b.suburb} ${b.state}`,
              suburb: b.suburb,
              state: b.state,
              postcode: b.postcode || "",
              services_nationwide: b.nationwide || false,
              services_statewide: false,
            }]
          } : undefined,
        }
      });
      existingNames.add(b.name.toLowerCase().trim());
      console.log(`ADDED: ${b.name}`);
      added++;
    } catch(e) {
      if (e.code === 'P2002') { console.log(`SKIP (dup slug): ${b.name}`); skipped++; }
      else console.error(b.name, e.message);
    }
  }
  console.log(`\nExtra Batch Complete — Added: ${added}, Skipped: ${skipped}`);
}
main().catch(console.error).finally(() => prisma.$disconnect());
