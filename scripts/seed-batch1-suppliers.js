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
    {
      name: "Ardex Australia",
      website: "https://ardexaustralia.com",
      phone: "1300 788 780",
      email: "sales@ardexaustralia.com",
      address: "2 Buda Way, Kemps Creek NSW 2178",
      suburb: "Kemps Creek",
      state: "NSW",
      postcode: "2178",
      confidence: 75,
      categorySlug: "suppliers-materials",
      description: "High-performance construction materials for substrate preparation, flooring, tiling, and waterproofing systems.",
      nationwide: true,
    },
    {
      name: "Sika Australia",
      website: "https://aus.sika.com",
      phone: "02 9725 1145",
      email: "",
      address: "55 Elizabeth Street, Wetherill Park NSW 2164",
      suburb: "Wetherill Park",
      state: "NSW",
      postcode: "2164",
      confidence: 75,
      categorySlug: "suppliers-materials",
      description: "Specialty chemicals and products for bonding, sealing, damping, reinforcing and protecting structures.",
      nationwide: true,
    },
    {
      name: "Mapei Australia",
      website: "https://www.mapei.com/au/en/home-page",
      phone: "1300 456 598",
      email: "",
      address: "180 Viking Drive, Wacol QLD 4076",
      suburb: "Wacol",
      state: "QLD",
      postcode: "4076",
      confidence: 75,
      categorySlug: "suppliers-materials",
      description: "Leading manufacturer of adhesives, sealants and chemical products for building and construction.",
      nationwide: true,
    },
    {
      name: "Tremco CPG Australia",
      website: "https://www.tremco.com.au",
      phone: "02 9638 2755",
      email: "marketing@tremco.com.au",
      address: "Unit 12, 4 Southridge Street, Eastern Creek NSW 2766",
      suburb: "Eastern Creek",
      state: "NSW",
      postcode: "2766",
      confidence: 75,
      categorySlug: "suppliers-materials",
      description: "Sealants and waterproofing products with hands-on technical support for construction professionals.",
      nationwide: true,
    },
    {
      name: "Parchem Construction Supplies",
      website: "https://www.parchem.com.au",
      phone: "1800 801 108",
      email: "",
      address: "29-31 Manton Street, Hindmarsh SA 5007",
      suburb: "Hindmarsh",
      state: "SA",
      postcode: "5007",
      confidence: 75,
      categorySlug: "suppliers-materials",
      description: "Australia's leading supplier of construction chemicals, products and equipment for the building industry.",
      nationwide: true,
    },
    {
      name: "Fosroc Australia",
      website: "https://www.fosroc.com.au",
      phone: "1800 812 864",
      email: "",
      address: "Sydney NSW 2000",
      suburb: "Sydney",
      state: "NSW",
      postcode: "2000",
      confidence: 55,
      categorySlug: "suppliers-materials",
      description: "Specialist construction chemicals for concrete repair, waterproofing, engineering grouts and protective coatings.",
      nationwide: true,
    },
    {
      name: "Bostik Australia",
      website: "https://www.bostik.com/australia/en_AU/",
      phone: "0499 699 552",
      email: "",
      address: "Level 1, 111 Coventry St, Southbank VIC 3006",
      suburb: "Southbank",
      state: "VIC",
      postcode: "3006",
      confidence: 55,
      categorySlug: "suppliers-materials",
      description: "Smart adhesive, sealant and waterproofing solutions for construction, flooring and industrial applications.",
      nationwide: true,
    },
    {
      name: "Dulux Protective Coatings",
      website: "https://www.duluxprotectivecoatings.com.au",
      phone: "03 9263 3645",
      email: "",
      address: "1956 Dandenong Rd, Clayton VIC 3168",
      suburb: "Clayton",
      state: "VIC",
      postcode: "3168",
      confidence: 55,
      categorySlug: "suppliers-materials",
      description: "Industrial protective coatings and corrosion protection systems for infrastructure and commercial assets.",
      nationwide: true,
    },
    {
      name: "Wattyl Industrial Coatings",
      website: "https://info.wattyl.com.au",
      phone: "02 9567 4429",
      email: "",
      address: "325 Forest Rd, Bexley NSW 2207",
      suburb: "Bexley",
      state: "NSW",
      postcode: "2207",
      confidence: 55,
      categorySlug: "suppliers-materials",
      description: "High-performance protective coating solutions for oil and gas, mining, infrastructure, water and marine industries.",
      nationwide: true,
    },
    {
      name: "Hilti Australia",
      website: "https://www.hilti.com.au",
      phone: "131 292",
      email: "serviceaustralia@hilti.com",
      address: "Unit 1, 1 Tucks Rd, Seven Hills NSW 2147",
      suburb: "Seven Hills",
      state: "NSW",
      postcode: "2147",
      confidence: 75,
      categorySlug: "suppliers-materials",
      description: "Innovative power tools, anchoring systems and construction solutions for productivity and safety.",
      nationwide: true,
    },
    {
      name: "Simpson Strong-Tie Australia",
      website: "https://strongtie.com.au",
      phone: "1300 787 664",
      email: "",
      address: "Unit 2A, 201-203 Power Street, Glendenning NSW 2761",
      suburb: "Glendenning",
      state: "NSW",
      postcode: "2761",
      confidence: 75,
      categorySlug: "suppliers-materials",
      description: "Structural connectors, fasteners and hardware for safer, stronger construction structures.",
      nationwide: true,
    },
    {
      name: "James Hardie Australia",
      website: "https://www.jameshardie.com.au",
      phone: "13 11 03",
      email: "",
      address: "Level 3, 22 Pitt Street, Sydney NSW 2000",
      suburb: "Sydney",
      state: "NSW",
      postcode: "2000",
      confidence: 75,
      categorySlug: "suppliers-materials",
      description: "World's leading manufacturer of fibre cement building products for walls, floors and facades.",
      nationwide: true,
    },
    {
      name: "CSR Building Products",
      website: "https://www.csr.com.au",
      phone: "02 6285 7400",
      email: "",
      address: "North Ryde NSW 2113",
      suburb: "North Ryde",
      state: "NSW",
      postcode: "2113",
      confidence: 55,
      categorySlug: "suppliers-materials",
      description: "Leading manufacturer of building products across Australia and New Zealand for over 170 years.",
      nationwide: true,
    },
    {
      name: "Knauf Australia",
      website: "https://knauf.com/en-AU",
      phone: "1800 459 272",
      email: "",
      address: "Sydney NSW 2000",
      suburb: "Sydney",
      state: "NSW",
      postcode: "2000",
      confidence: 55,
      categorySlug: "suppliers-materials",
      description: "Leading manufacturer of plasterboard, joint compounds, metal framing and insulation systems.",
      nationwide: true,
    },
    {
      name: "ROCKWOOL Australia",
      website: "https://www.rockwool.com/anz/",
      phone: "1800 762 059",
      email: "",
      address: "Sydney NSW 2000",
      suburb: "Sydney",
      state: "NSW",
      postcode: "2000",
      confidence: 55,
      categorySlug: "suppliers-materials",
      description: "Stone wool insulation products for thermal, fire and acoustic performance in buildings.",
      nationwide: true,
    },
  ];

  let added = 0, skipped = 0;
  for (const b of businesses) {
    if (existingNames.has(b.name.toLowerCase().trim())) { console.log(`SKIP (exists): ${b.name}`); skipped++; continue; }
    const cat = catBySlug[b.categorySlug];
    if (!cat) { console.log(`No cat for ${b.categorySlug}`); skipped++; continue; }

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
  console.log(`\nBatch 1 Complete — Added: ${added}, Skipped: ${skipped}`);
}
main().catch(console.error).finally(() => prisma.$disconnect());
