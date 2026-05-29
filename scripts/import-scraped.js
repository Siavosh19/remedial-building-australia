/**
 * Pass 3 — Import scraped businesses into the database
 * Reads yp-enriched.json and inserts as unclaimed listings.
 *
 * Run: node scripts/import-scraped.js
 * Requires DATABASE_URL and DIRECT_URL in .env.local
 * Skips businesses already in the database (matched by name + state).
 */

require("dotenv").config({ path: ".env.local" });
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const IN_FILE = path.join(__dirname, "scraped-data", "yp-enriched.json");

function makeSlug(name) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

const STATE_MAP = { NSW: "NSW", VIC: "VIC", QLD: "QLD", WA: "WA", SA: "SA", TAS: "TAS", ACT: "ACT", NT: "NT" };

function newClient() {
  return new PrismaClient({ datasources: { db: { url: process.env.DIRECT_URL || process.env.DATABASE_URL } } });
}

async function main() {
  if (!fs.existsSync(IN_FILE)) {
    console.error("yp-enriched.json not found. Run enrich-emails.js first.");
    process.exit(1);
  }

  const businesses = JSON.parse(fs.readFileSync(IN_FILE, "utf8"));
  console.log(`Importing ${businesses.length} scraped businesses...\n`);

  let prisma = newClient();

  // Load all categories once
  const cats = await prisma.category.findMany({ select: { id: true, slug: true, name: true } });
  const catBySlug = Object.fromEntries(cats.map((c) => [c.slug, c]));

  // Load existing company names to skip duplicates
  const existing = await prisma.company.findMany({
    select: { name: true },
    where: { status: { in: ["published", "draft"] } },
  });
  const existingNames = new Set(existing.map((c) => c.name.toLowerCase().trim()));

  let inserted = 0;
  let skipped = 0;
  let errors = 0;
  let batchCount = 0;

  for (const biz of businesses) {
    if (!biz.name || biz.name.length < 2) { skipped++; continue; }
    const nameKey = biz.name.toLowerCase().trim();
    if (existingNames.has(nameKey)) {
      skipped++;
      continue;
    }

    // Reconnect every 200 inserts to avoid connection timeouts
    if (batchCount > 0 && batchCount % 200 === 0) {
      await prisma.$disconnect();
      prisma = newClient();
      process.stdout.write(`  [reconnected at ${batchCount}]\n`);
    }

    const state = STATE_MAP[biz.state] ?? "NSW";
    const cat = catBySlug[biz.category];

    // Build a unique slug
    let slug = makeSlug(biz.name);
    let attempt = 0;
    while (true) {
      const conflict = await prisma.company.findUnique({ where: { slug } });
      if (!conflict) break;
      attempt++;
      slug = `${makeSlug(biz.name)}-${attempt}`;
    }

    try {
      await prisma.company.create({
        data: {
          name: biz.name,
          slug,
          phone: biz.phone || null,
          email: biz.email || "",
          website: biz.website || null,
          description: biz.description || null,
          status: "published",
          profile_status: "basic",
          confidence_score: 60,
          is_claimed: false,
          is_featured: false,
          main_category_id: cat?.id ?? null,
          locations: {
            create: {
              address: biz.address || `${biz.suburb} ${state}`,
              suburb: biz.suburb || null,
              state,
              postcode: biz.postcode || "2000",
              services_nationwide: false,
              services_statewide: false,
            },
          },
        },
      });

      existingNames.add(nameKey);
      inserted++;
      batchCount++;
      process.stdout.write(`  ✓ ${biz.name} (${state})\n`);
    } catch (err) {
      errors++;
      batchCount++;
      process.stdout.write(`  ✗ ${biz.name}: ${err.message?.slice(0, 80)}\n`);
    }
  }

  await prisma.$disconnect();
  console.log(`\n✓ Done. Inserted: ${inserted} | Skipped: ${skipped} | Errors: ${errors}`);
}

main().catch(console.error);
