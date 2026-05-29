require("dotenv").config({ path: ".env.local" });
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const cats = await prisma.category.findMany({ select: { id: true, slug: true } });
  const catBySlug = Object.fromEntries(cats.map(c => [c.slug, c]));
  const existing = await prisma.company.findMany({ select: { name: true } });
  const existingNames = new Set(existing.map(c => c.name.toLowerCase().trim()));

  function makeSlug(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  const businesses = [
    // ── SOLAR & RENEWABLES ──────────────────────────────────────────────
    {
      name: "Agile Energy Group",
      website: "https://www.agileenergy.com.au",
      phone: "1800 512 194",
      email: "info@agileenergy.com.au",
      suburb: "Sydney",
      state: "NSW",
      postcode: "2000",
      confidence: 75,
      categorySlug: "solar-renewables",
      description: "Commercial and industrial solar specialists servicing strata, commercial and industrial buildings across Australia.",
      nationwide: true,
    },
    {
      name: "RK Solar & Consulting Services",
      website: "https://rksolar.com.au",
      phone: "1800 338 809",
      email: "info@rksolar.net",
      suburb: "Castle Hill",
      state: "NSW",
      postcode: "2154",
      confidence: 75,
      categorySlug: "solar-renewables",
      description: "CEC-approved solar panel and battery installer with over 15 years experience, specialising in strata and commercial buildings across NSW.",
    },
    {
      name: "Hilts Group Australia",
      website: "https://hilts.com.au",
      phone: "1800 961 695",
      email: "sam@hilts.com.au",
      suburb: "Sydney",
      state: "NSW",
      postcode: "2230",
      confidence: 55,
      categorySlug: "solar-renewables",
      description: "CEC-accredited strata solar specialist delivering shared-roof solar systems, EV charging, electrical and HVAC services for Sydney strata properties.",
    },

    // ── TECHNOLOGY & SOFTWARE ───────────────────────────────────────────
    {
      name: "Intellistrata",
      website: "https://intellistrata.com.au",
      phone: "(03) 9001 6956",
      email: "hello@intellistrata.com.au",
      suburb: "Melbourne",
      state: "VIC",
      postcode: "3000",
      confidence: 55,
      categorySlug: "technology-software",
      description: "ISO 27001-certified cloud-based strata management software with AGM management, levy management, compliance reporting and trust accounting.",
      nationwide: true,
    },
    {
      name: "MYBOS",
      website: "https://mybos.com",
      email: "sales@mybos.com",
      phone: null,
      suburb: "Sydney Olympic Park",
      state: "NSW",
      postcode: "2127",
      confidence: 60,
      categorySlug: "technology-software",
      description: "Smart building management software centralising maintenance, compliance tracking, communications and financial oversight for strata and commercial properties.",
      nationwide: true,
    },
    {
      name: "Urbanise",
      website: "https://www.urbanise.com",
      phone: "1300 018 098",
      email: null,
      suburb: "Sydney",
      state: "NSW",
      postcode: "2000",
      confidence: 75,
      categorySlug: "technology-software",
      description: "ASX-listed cloud platform for facility management and strata management, managing over 600,000 lots across 18 countries.",
      nationwide: true,
    },

    // ── PLANNING & DEVELOPMENT ──────────────────────────────────────────
    {
      name: "GSA Planning",
      website: "https://gsaplanning.com.au",
      phone: "(02) 9362 3364",
      email: "info@gsaplanning.com.au",
      suburb: "Paddington",
      state: "NSW",
      postcode: "2021",
      confidence: 55,
      categorySlug: "planning-development",
      description: "Sydney planning consultants with 9,000+ successful outcomes offering expert development advice, planning reports and court representation across NSW.",
    },
    {
      name: "Damian O'Toole Town Planning & Heritage Services",
      website: "https://sydneytownplanning.com.au",
      phone: "02 9690 0464",
      email: null,
      suburb: "Surry Hills",
      state: "NSW",
      postcode: "2010",
      confidence: 55,
      categorySlug: "planning-development",
      description: "Town planning and heritage consultancy established in 2003, specialising in development applications and heritage matters across Sydney.",
    },
    {
      name: "Meliora Projects",
      website: "https://meliora-projects.com.au",
      phone: null,
      email: null,
      suburb: "Sydney",
      state: "NSW",
      postcode: "2000",
      confidence: 40,
      categorySlug: "planning-development",
      description: "Town planning consultants navigating complex development across NSW for residential, commercial and mixed-use projects.",
    },
  ];

  // Filter out those with only 1 signal
  const validated = businesses.filter(b => b.confidence >= 50);

  let added = 0, skipped = 0;
  for (const b of validated) {
    if (existingNames.has(b.name.toLowerCase().trim())) { skipped++; continue; }
    const cat = catBySlug[b.categorySlug];
    if (!cat) { console.log(`No category: ${b.categorySlug}`); skipped++; continue; }
    const slug = makeSlug(b.name);
    try {
      await prisma.company.create({
        data: {
          name: b.name,
          slug,
          description: b.description || null,
          phone: b.phone || null,
          website: b.website || null,
          email: b.email || null,
          status: "published",
          profile_status: "basic",
          is_claimed: false,
          is_featured: false,
          service_radius_km: 50,
          confidence_score: b.confidence,
          main_category_id: cat.id,
          locations: b.suburb ? {
            create: [{
              suburb: b.suburb,
              state: b.state,
              postcode: b.postcode || "",
              is_primary: true,
              services_nationwide: b.nationwide || false,
              services_statewide: false,
            }],
          } : undefined,
        },
      });
      existingNames.add(b.name.toLowerCase().trim());
      added++;
      console.log(`  Added: ${b.name}`);
    } catch (e) {
      if (e.code === "P2002") { skipped++; }
      else console.error(`  Error: ${b.name} — ${e.message}`);
    }
  }
  console.log(`\nAdded: ${added}, Skipped: ${skipped}`);
}
main().catch(console.error).finally(() => prisma.$disconnect());
