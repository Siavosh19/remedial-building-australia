// Full backup of directory-related tables before the wipe & replace.
// Run: node scripts/directory-backup.js
require("dotenv").config({ path: ".env.local" });
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

async function main() {
  const dir = path.join(__dirname, "..", "backups", "directory-backup-2026-06-13");
  fs.mkdirSync(dir, { recursive: true });

  const dump = async (name, rows) => {
    fs.writeFileSync(path.join(dir, `${name}.json`), JSON.stringify(rows, null, 2));
    console.log(`  ${name}: ${rows.length}`);
  };

  console.log("Backing up to", dir);
  await dump("companies", await prisma.company.findMany());
  await dump("locations", await prisma.location.findMany());
  await dump("categories", await prisma.category.findMany());
  await dump("company_categories", await prisma.companyCategory.findMany());
  await dump("company_users", await prisma.companyUser.findMany());
  await dump("company_tags", await prisma.companyTag.findMany());
  await dump("licences", await prisma.licence.findMany());
  await dump("lead_subscriptions", await prisma.leadSubscription.findMany());
  await dump("lead_deliveries", await prisma.leadDelivery.findMany());
  await dump("admin_review_queue", await prisma.adminReviewQueue.findMany());
  await dump("directory_subscription", await prisma.directorySubscription.findMany());
  await dump("claim_requests", await prisma.claimRequest.findMany());
  await dump("quote_requests", await prisma.quoteRequest.findMany());
  await dump("company_media", await prisma.companyMedia.findMany());

  console.log("Backup complete.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
