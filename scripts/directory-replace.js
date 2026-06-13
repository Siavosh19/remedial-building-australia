// Wipe the current directory and reload from the labelled Excel.
//  - Creates one category per distinct "Best Directory Label" (flat list)
//  - Deactivates the old 516-category taxonomy (kept in DB; still referenced
//    by directory_leads). Renames any old slug that clashes with a new label.
//  - Deletes all companies + dependent rows, then re-inserts every Excel row.
//  - Carries forward fields the Excel omits (google_business_url, street
//    address / city / lat / long, engagement counters, slug, created_at)
//    from the backup, matched by id.
// Run: node scripts/directory-replace.js
require("dotenv").config({ path: ".env.local" });
const { PrismaClient } = require("@prisma/client");
const XLSX = require("xlsx");
const path = require("path");

const prisma = new PrismaClient();
const XLSX_PATH = "/Users/siasepehrara/Desktop/Final_RBA_Directory_2026-06-12_LABELLED (3).xlsx";
const BK = path.join(__dirname, "..", "backups", "directory-backup-2026-06-13");

const VALID_STATE = new Set(["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"]);
const VALID_STATUS = new Set(["draft", "published", "needs_review", "rejected"]);
const VALID_PLAN = new Set(["basic", "claimed", "featured"]);
const VALID_CLAIM = new Set(["unclaimed", "claim_pending", "claimed", "rejected"]);

function slugify(name) {
  return name.toLowerCase().replace(/&/g, "and").replace(/\//g, "-")
    .replace(/[().,]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
const toInt = (v) => { const n = parseInt(v, 10); return Number.isFinite(n) ? n : null; };
const str = (v) => { const s = String(v ?? "").trim(); return s === "" ? null : s; };

async function main() {
  // ---- Load Excel ----
  const rowsRaw = XLSX.utils.sheet_to_json(XLSX.readFile(XLSX_PATH).Sheets["Directory"], { defval: "" });
  const rows = rowsRaw.filter((r) => r.id && String(r.name).trim());
  console.log(`Excel rows usable: ${rows.length} (skipped ${rowsRaw.length - rows.length})`);

  // ---- Backup lookups (by id) ----
  const bkCompanies = require(path.join(BK, "companies.json"));
  const bkLocations = require(path.join(BK, "locations.json"));
  const cById = new Map(bkCompanies.map((c) => [c.id, c]));
  const lByCompany = new Map(bkLocations.map((l) => [l.company_id, l]));

  // ---- 1. Resolve slug clashes & deactivate old taxonomy ----
  const labels = [...new Set(rows.map((r) => String(r["Best Directory Label"]).trim()).filter(Boolean))];
  const newSlugs = new Set(labels.map(slugify));
  const existing = await prisma.category.findMany({ select: { id: true, slug: true } });
  for (const cat of existing) {
    if (newSlugs.has(cat.slug)) {
      await prisma.category.update({ where: { id: cat.id }, data: { slug: `legacy-${cat.slug}-${cat.id}` } });
    }
  }
  await prisma.category.updateMany({ data: { is_active: false } });
  console.log(`Deactivated ${existing.length} old categories (renamed clashing slugs).`);

  // ---- 2. Create new label categories ----
  await prisma.category.createMany({
    data: labels.map((name, i) => ({
      name, slug: slugify(name), parent_id: null, display_order: i, is_active: true,
    })),
  });
  const newCats = await prisma.category.findMany({ where: { is_active: true }, select: { id: true, slug: true } });
  const labelToCatId = new Map();
  for (const lab of labels) labelToCatId.set(lab, newCats.find((c) => c.slug === slugify(lab)).id);
  console.log(`Created ${labels.length} label categories.`);

  // ---- 3. Wipe companies + dependents ----
  await prisma.companyCategory.deleteMany();
  await prisma.companyTag.deleteMany();
  await prisma.licence.deleteMany();
  await prisma.leadDelivery.deleteMany();
  await prisma.leadSubscription.deleteMany();
  await prisma.adminReviewQueue.deleteMany();
  await prisma.directorySubscription.deleteMany();
  await prisma.claimRequest.deleteMany();
  await prisma.quoteRequest.deleteMany();
  await prisma.companyMedia.deleteMany();
  await prisma.companyUser.deleteMany();
  await prisma.location.deleteMany();
  await prisma.company.deleteMany();
  console.log("Wiped all companies, locations and dependent rows.");

  // ---- 4. Build new company + location rows ----
  const companyData = [];
  const locationData = [];
  for (const r of rows) {
    const id = toInt(r.id);
    const bk = cById.get(id) || {};
    const label = String(r["Best Directory Label"]).trim();
    const status = VALID_STATUS.has(r.status) ? r.status : "published";
    const plan = VALID_PLAN.has(r.plan_type) ? r.plan_type : "basic";
    const claim = VALID_CLAIM.has(r.listing_claim_status) ? r.listing_claim_status : "unclaimed";

    companyData.push({
      id,
      slug: bk.slug || slugify(r.name) + "-" + id,
      name: String(r.name).trim(),
      abn: str(r.abn),
      website: str(r.website),
      phone: str(r.phone),
      email: str(r.email) || "",
      google_business_url: bk.google_business_url ?? null,
      description: str(r.description),
      year_established: toInt(r.year_established),
      main_category_id: labelToCatId.get(label) ?? null,
      status,
      profile_status: bk.profile_status || "basic",
      confidence_score: toInt(r.confidence_score) ?? 0,
      is_claimed: r.is_claimed === true || r.is_claimed === "true",
      is_featured: bk.is_featured ?? false,
      created_at: bk.created_at ? new Date(bk.created_at) : undefined,
      plan_type: plan,
      listing_claim_status: claim,
      logo_url: bk.logo_url ?? null,
      profile_views: bk.profile_views ?? 0,
      website_clicks: bk.website_clicks ?? 0,
      phone_clicks: bk.phone_clicks ?? 0,
      suspended: bk.suspended ?? false,
    });

    // Location: preserve backup geo data; refresh suburb/state/postcode/service flags from Excel.
    const bl = lByCompany.get(id);
    const state = VALID_STATE.has(String(r.state).trim().toUpperCase())
      ? String(r.state).trim().toUpperCase()
      : (bl && bl.state) || null;
    if (bl || state) {
      locationData.push({
        id: bl ? bl.id : undefined,
        company_id: id,
        address: (bl && bl.address) || `${str(r.suburb) || ""} ${state || ""} ${str(r.postcode) || ""}`.trim() || "—",
        suburb: str(r.suburb) || (bl && bl.suburb) || null,
        city: (bl && bl.city) || str(r.suburb) || null,
        state: state,
        postcode: str(r.postcode) || (bl && bl.postcode) || "",
        latitude: bl ? bl.latitude : null,
        longitude: bl ? bl.longitude : null,
        service_radius_km: bl ? bl.service_radius_km : null,
        services_statewide: r.services_statewide === true || r.services_statewide === "true" || (bl ? bl.services_statewide : false),
        services_nationwide: r.services_nationwide === true || r.services_nationwide === "true" || (bl ? bl.services_nationwide : false),
        states_serviced: bl ? bl.states_serviced : [],
      });
    }
  }

  // skip any location with no valid state (enum is non-null)
  const locClean = locationData.filter((l) => l.state);
  console.log(`Prepared ${companyData.length} companies, ${locClean.length} locations.`);

  // ---- 5. Insert in batches ----
  const BATCH = 500;
  for (let i = 0; i < companyData.length; i += BATCH) {
    await prisma.company.createMany({ data: companyData.slice(i, i + BATCH), skipDuplicates: true });
  }
  console.log("Inserted companies.");
  for (let i = 0; i < locClean.length; i += BATCH) {
    await prisma.location.createMany({ data: locClean.slice(i, i + BATCH), skipDuplicates: true });
  }
  console.log("Inserted locations.");

  // ---- 6. Reset sequences ----
  await prisma.$executeRawUnsafe(`SELECT setval('companies_id_seq', (SELECT COALESCE(MAX(id),1) FROM companies))`);
  await prisma.$executeRawUnsafe(`SELECT setval('locations_id_seq', (SELECT COALESCE(MAX(id),1) FROM locations))`);
  await prisma.$executeRawUnsafe(`SELECT setval('categories_id_seq', (SELECT COALESCE(MAX(id),1) FROM categories))`);
  console.log("Reset id sequences.");

  // ---- 7. Verify ----
  const cCount = await prisma.company.count();
  const lCount = await prisma.location.count();
  const actCats = await prisma.category.count({ where: { is_active: true } });
  const uncategorized = await prisma.company.count({ where: { main_category_id: null } });
  console.log(`\nDONE — companies: ${cCount}, locations: ${lCount}, active categories: ${actCats}, uncategorized companies: ${uncategorized}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
