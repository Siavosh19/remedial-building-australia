// Seeds the Industry Jobs taxonomy + default pricing. Idempotent (upserts by
// slug / key). Run once after the add_industry_jobs migration is applied:
//   set -a; . ./.env.local; set +a; node scripts/seed-jobs.mjs
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const GROUPS = [
  { group: "Strata & Property", categories: ["Strata Manager", "Building Manager", "Facilities Manager", "Property Manager", "Owners Corporation Manager", "Asset Manager"] },
  { group: "Consulting & Engineering", categories: ["Building Consultant", "Remedial Engineer", "Structural Engineer", "Façade Engineer", "Waterproofing Consultant", "Building Surveyor", "Quantity Surveyor", "Superintendent", "Design Practitioner", "Project Manager"] },
  { group: "Construction", categories: ["Remedial Builder", "Site Manager", "Contract Administrator", "Estimator", "Waterproofing Contractor", "Concrete Repair Technician", "Façade Contractor", "Roofer", "Carpenter", "Renderer", "Painter", "Glazier", "Tiler", "Rope Access Technician", "Scaffolder"] },
  { group: "Suppliers", categories: ["Technical Sales", "Product Specialist", "Sales Representative"] },
  { group: "Administration", categories: ["Office Administrator", "Reception", "Scheduler", "Accounts", "Administration Assistant"] },
];

const slugify = (s) =>
  s.toLowerCase().replace(/[àáâãäå]/g, "a").replace(/[ç]/g, "c").replace(/[èéêë]/g, "e").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const PRICING = [
  { key: "standard", name: "Standard Job Listing", description: "A 30-day job listing on the Industry Jobs board.", kind: "listing", amount_cents: 24900, duration_days: 30, display_order: 1, features: ["Live for 30 days", "Appears in Latest Jobs + search", "Applications emailed to you + saved in your dashboard", "One-click renew"] },
  { key: "featured", name: "Featured Job Listing", description: "A 30-day listing with a Featured badge and priority placement.", kind: "listing", amount_cents: 39900, duration_days: 30, display_order: 2, features: ["Everything in Standard", "Featured badge", "Top placement in Featured Jobs", "Highlighted card styling"] },
];

async function main() {
  let order = 0;
  for (const { group, categories } of GROUPS) {
    for (const name of categories) {
      order += 1;
      const slug = slugify(name);
      await prisma.jobCategory.upsert({
        where: { slug },
        create: { name, slug, group, display_order: order, is_active: true },
        update: { name, group, display_order: order },
      });
    }
  }
  console.log(`Seeded ${order} job categories.`);

  for (const p of PRICING) {
    await prisma.jobPricing.upsert({
      where: { key: p.key },
      create: p,
      update: { name: p.name, description: p.description, kind: p.kind, duration_days: p.duration_days, display_order: p.display_order, features: p.features },
      // NOTE: amount_cents is only set on create so re-running the seed never
      // overwrites a price the admin has since edited.
    });
  }
  console.log(`Seeded ${PRICING.length} pricing rows (prices preserved on re-run).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
