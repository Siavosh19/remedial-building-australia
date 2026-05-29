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
    // CONSULTANTS
    // =============================================
    {
      name: "Habitat Building Consultancy",
      website: "https://habitatbc.com.au",
      phone: "02 4862 2788",
      email: "",
      address: "Sydney NSW 2000",
      suburb: "Sydney",
      state: "NSW",
      postcode: "2000",
      confidence: 55,
      categorySlug: "consultants-practitioners",
      description: "Building consultants providing defect reports, remedial project management and inspections for strata and property managers in Sydney.",
      nationwide: false,
    },
    {
      name: "Strata Consulting Solutions Australia",
      website: "https://strataconsultingsolutions.com.au",
      phone: "1300 263 820",
      email: "info@strataconsultingsolutions.com.au",
      address: "Level 13, 50 Cavill Avenue, Surfers Paradise QLD 4217",
      suburb: "Surfers Paradise",
      state: "QLD",
      postcode: "4217",
      confidence: 75,
      categorySlug: "planning-development",
      description: "Strata planning and development consultants helping developers and owners corporations navigate complex strata schemes.",
      nationwide: true,
    },
    // =============================================
    // MASONRY / BRICK REPAIR
    // =============================================
    {
      name: "Propoint Masonry Restoration",
      website: "https://www.propointmasonryrestoration.com.au",
      phone: "0415 301 966",
      email: "",
      address: "PO Box 6030, Malabar NSW 2036",
      suburb: "Malabar",
      state: "NSW",
      postcode: "2036",
      confidence: 55,
      categorySlug: "masonry-brick-repair",
      description: "Specialist brick repointing, tuckpointing and masonry restoration services for heritage and strata buildings across Sydney.",
      nationwide: false,
    },
    {
      name: "Bricklayers Sydney",
      website: "https://bricklayerssydney.com.au",
      phone: "02 9119 5920",
      email: "",
      address: "Sydney NSW 2000",
      suburb: "Sydney",
      state: "NSW",
      postcode: "2000",
      confidence: 55,
      categorySlug: "masonry-brick-repair",
      description: "Professional bricklayers providing brick repairs, restoration and new brickwork throughout Sydney.",
      nationwide: false,
    },
    {
      name: "Brick and Tuck Pointing",
      website: "https://brickandtuckpointing.com.au",
      phone: "0439 973 842",
      email: "",
      address: "Sydney NSW 2000",
      suburb: "Sydney",
      state: "NSW",
      postcode: "2000",
      confidence: 55,
      categorySlug: "masonry-brick-repair",
      description: "Professional masonry restoration, tuckpointing and building restoration services across Sydney, Central Coast and Newcastle.",
      nationwide: false,
    },
    // =============================================
    // JOINTS & MOVEMENT
    // =============================================
    {
      name: "Sonaa Building Maintenance",
      website: "https://sonaa.com.au",
      phone: "0449 178 470",
      email: "info@sonaa.com.au",
      address: "Sydney NSW 2000",
      suburb: "Sydney",
      state: "NSW",
      postcode: "2000",
      confidence: 75,
      categorySlug: "joints-movement",
      description: "Commercial waterproofing, joint sealing and high-rise building maintenance specialists using rope access across Sydney.",
      nationwide: false,
    },
    {
      name: "Australian Caulking Experts",
      website: "https://www.caulkingexperts.com.au",
      phone: "1300 472 855",
      email: "",
      address: "Sydney NSW 2000",
      suburb: "Sydney",
      state: "NSW",
      postcode: "2000",
      confidence: 55,
      categorySlug: "joints-movement",
      description: "Remedial caulking and sealant specialists correcting failed or non-compliant joint sealant work on Sydney buildings.",
      nationwide: false,
    },
    // =============================================
    // DEMOLITION / STRIP OUT
    // =============================================
    {
      name: "Hazaway Asbestos Removal",
      website: "https://hazaway.com.au",
      phone: "0432 622 292",
      email: "",
      address: "Melbourne VIC 3000",
      suburb: "Melbourne",
      state: "VIC",
      postcode: "3000",
      confidence: 55,
      categorySlug: "demolition-strip-out",
      description: "WorkSafe Class B licensed asbestos removal specialists with EPA Victoria approved vehicles serving Melbourne.",
      nationwide: false,
    },
    // =============================================
    // DBP PRACTITIONERS
    // =============================================
    {
      name: "Demlakian Consulting Engineers",
      website: "https://www.demlakian.com.au",
      phone: "02 9412 1088",
      email: "",
      address: "Sydney NSW 2000",
      suburb: "Sydney",
      state: "NSW",
      postcode: "2000",
      confidence: 55,
      categorySlug: "dbp-practitioners",
      description: "Engineering, strata and remedial services in Sydney, Brisbane and London with over 35 years of experience.",
      nationwide: false,
    },
    // =============================================
    // FACADE / EXTERNAL ENVELOPE
    // =============================================
    {
      name: "Prime Consulting Engineers",
      website: "https://primeengineers.com.au",
      phone: "02 8999 9900",
      email: "",
      address: "Sydney NSW 2000",
      suburb: "Sydney",
      state: "NSW",
      postcode: "2000",
      confidence: 55,
      categorySlug: "facade-external-envelope",
      description: "Facade engineering and cladding consultants with hundreds of facade designs across Sydney and Australia.",
      nationwide: true,
    },
    {
      name: "CGS Facade Engineering",
      website: "https://cgsfacade.com.au",
      phone: "02 9331 5555",
      email: "",
      address: "Sydney NSW 2000",
      suburb: "Sydney",
      state: "NSW",
      postcode: "2000",
      confidence: 55,
      categorySlug: "facade-external-envelope",
      description: "Facade engineering specialists working with developers, builders, architects and building corporates since 2005.",
      nationwide: false,
    },
    // =============================================
    // ADDITIONAL WATERPROOFING
    // =============================================
    {
      name: "Mainline Waterproofing",
      website: "https://mainlinewaterproofing.com.au",
      phone: "07 3103 5454",
      email: "",
      address: "Brisbane QLD 4000",
      suburb: "Brisbane",
      state: "QLD",
      postcode: "4000",
      confidence: 55,
      categorySlug: "waterproofing",
      description: "Qualified waterproofing trade professionals serving Brisbane and South East Queensland with residential and commercial services.",
      nationwide: false,
    },
    // =============================================
    // ADDITIONAL REMEDIAL CONTRACTORS
    // =============================================
    {
      name: "Southern Remedial Solutions",
      website: "https://www.southernremedial.com.au",
      phone: "03 9776 0000",
      email: "",
      address: "Melbourne VIC 3000",
      suburb: "Melbourne",
      state: "VIC",
      postcode: "3000",
      confidence: 55,
      categorySlug: "remedial-contractors",
      description: "Remedial building works specialists providing concrete repair, waterproofing and structural restoration services.",
      nationwide: false,
    },
    // =============================================
    // ADDITIONAL STRATA MANAGERS
    // =============================================
    {
      name: "Absolute Strata",
      website: "https://absolutestrata.com.au",
      phone: "02 9553 0244",
      email: "info@absolutestrata.com.au",
      address: "Sydney NSW 2000",
      suburb: "Sydney",
      state: "NSW",
      postcode: "2000",
      confidence: 75,
      categorySlug: "strata-management-advisory",
      description: "Professional strata management services for residential and commercial schemes across Sydney and NSW.",
      nationwide: false,
    },
    // =============================================
    // LIFT MAINTENANCE — MELBOURNE
    // =============================================
    {
      name: "TITAN Lifts",
      website: "https://titanlifts.com.au",
      phone: "1800 954 726",
      email: "",
      address: "Sydney NSW 2000",
      suburb: "Sydney",
      state: "NSW",
      postcode: "2000",
      confidence: 55,
      categorySlug: "lifts-vertical-transport",
      description: "Lift maintenance, repair and support services for residential and commercial buildings throughout Sydney.",
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
  console.log(`\nGap Batch Complete — Added: ${added}, Skipped: ${skipped}`);
}
main().catch(console.error).finally(() => prisma.$disconnect());
