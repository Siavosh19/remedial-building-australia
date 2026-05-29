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
    // FIRE SERVICES
    // =============================================
    {
      name: "Betta Fire Protection",
      website: "https://bettafireprotection.com.au",
      phone: "02 8669 9100",
      email: "",
      address: "Sydney NSW 2000",
      suburb: "Sydney",
      state: "NSW",
      postcode: "2000",
      confidence: 55,
      categorySlug: "fire-services",
      description: "Sydney fire protection specialists providing fire door installation, inspection and passive fire services for strata buildings.",
      nationwide: false,
    },
    {
      name: "Fire Rate",
      website: "https://www.firerate.com.au",
      phone: "1300 850 960",
      email: "",
      address: "Sydney NSW 2000",
      suburb: "Sydney",
      state: "NSW",
      postcode: "2000",
      confidence: 55,
      categorySlug: "fire-services",
      description: "BCA-compliant fire door installation, certification and inspection specialists servicing commercial and strata buildings in Sydney.",
      nationwide: false,
    },
    // =============================================
    // LEGAL
    // =============================================
    {
      name: "Bannermans Lawyers",
      website: "https://www.bannermans.com.au",
      phone: "02 9929 0226",
      email: "dbannerman@bannermans.com.au",
      address: "Level 2, Suite 1, 65 Berry Street, North Sydney NSW 2060",
      suburb: "North Sydney",
      state: "NSW",
      postcode: "2060",
      confidence: 75,
      categorySlug: "legal-insurance-finance",
      description: "Specialist strata, development, construction and insurance lawyers acting primarily for owners corporations and strata managers.",
      nationwide: false,
    },
    {
      name: "Pelham Strata Lawyers",
      website: "https://www.pelhamstrata.com.au",
      phone: "03 9428 5735",
      email: "anthony@pelhamstrata.com.au",
      address: "Suite 306, 91 Murphy Street, Richmond VIC 3121",
      suburb: "Richmond",
      state: "VIC",
      postcode: "3121",
      confidence: 75,
      categorySlug: "legal-insurance-finance",
      description: "Melbourne boutique strata law firm specialising in owners corporation law and building defect matters in Victoria.",
      nationwide: false,
    },
    // =============================================
    // PLUMBING — MELBOURNE
    // =============================================
    {
      name: "G Brand and Sons Plumbing",
      website: "https://gbrand.com.au",
      phone: "0411 072 131",
      email: "bruce@gbrand.com.au",
      address: "63a Grange Road, Cheltenham VIC 3192",
      suburb: "Cheltenham",
      state: "VIC",
      postcode: "3192",
      confidence: 75,
      categorySlug: "plumbing-drainage",
      description: "Commercial plumbing specialists serving strata buildings and industrial properties in Melbourne with pipe relining services.",
      nationwide: false,
    },
    {
      name: "Sewer Surgeon",
      website: "https://www.sewersurgeon.com.au",
      phone: "1300 734 677",
      email: "",
      address: "Sydney NSW 2000",
      suburb: "Sydney",
      state: "NSW",
      postcode: "2000",
      confidence: 55,
      categorySlug: "plumbing-drainage",
      description: "Licensed plumbers providing residential, strata and commercial plumbing including pipe relining and drainage solutions.",
      nationwide: false,
    },
    // =============================================
    // INVESTIGATION & TESTING
    // =============================================
    {
      name: "TC Remedial",
      website: "https://tcremedial.com.au",
      phone: "0401 926 226",
      email: "",
      address: "Sydney NSW 2000",
      suburb: "Sydney",
      state: "NSW",
      postcode: "2000",
      confidence: 55,
      categorySlug: "investigation-testing",
      description: "Building investigation specialists providing leak detection, remedial diagnostics and technical assessments for strata buildings.",
      nationwide: false,
    },
    {
      name: "BWR Australia",
      website: "https://www.bwra.com.au",
      phone: "02 9979 9781",
      email: "",
      address: "Sydney NSW 2000",
      suburb: "Sydney",
      state: "NSW",
      postcode: "2000",
      confidence: 55,
      categorySlug: "investigation-testing",
      description: "Waterproofing inspection and building diagnostic consultants specialising in mould, moisture and condensation assessments.",
      nationwide: false,
    },
    // =============================================
    // MASONRY / BRICK REPAIR
    // =============================================
    {
      name: "Patch and Caulk",
      website: "https://patchandcaulk.com.au",
      phone: "08 7111 0078",
      email: "",
      address: "Adelaide SA 5000",
      suburb: "Adelaide",
      state: "SA",
      postcode: "5000",
      confidence: 55,
      categorySlug: "masonry-brick-repair",
      description: "Adelaide concrete remediation specialists with over 1000 Tier 1 and 2 projects including epoxy crack injections and joint sealant applications.",
      nationwide: false,
    },
    // =============================================
    // DEMOLITION / STRIP OUT
    // =============================================
    {
      name: "Sydney Asbestos",
      website: "https://sydneyasbestos.com",
      phone: "1300 04 3366",
      email: "",
      address: "Sydney NSW 2000",
      suburb: "Sydney",
      state: "NSW",
      postcode: "2000",
      confidence: 55,
      categorySlug: "demolition-strip-out",
      description: "NSW Government licensed asbestos removal and demolition specialists for residential and commercial properties in Sydney.",
      nationwide: false,
    },
    // =============================================
    // DBP PRACTITIONERS
    // =============================================
    {
      name: "Sydney Strata Engineers",
      website: "https://www.sydneystrataengineers.com.au",
      phone: "02 9979 5566",
      email: "",
      address: "Suite 13, 90 Mona Vale Road, Warriewood NSW 2102",
      suburb: "Warriewood",
      state: "NSW",
      postcode: "2102",
      confidence: 55,
      categorySlug: "dbp-practitioners",
      description: "Design and building practitioner engineers specialising in remedial engineering solutions for strata buildings in NSW.",
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
  console.log(`\nFinal Batch Complete — Added: ${added}, Skipped: ${skipped}`);
}
main().catch(console.error).finally(() => prisma.$disconnect());
