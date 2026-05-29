require("dotenv").config({ path: ".env.local" });
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const total = await prisma.company.count({ where: { status: "published" } });
  console.log("Total published:", total);

  const byState = await prisma.$queryRaw`
    SELECT l.state, COUNT(DISTINCT c.id)::int as count
    FROM companies c
    JOIN locations l ON l.company_id = c.id
    WHERE c.status = 'published'
    GROUP BY l.state
    ORDER BY count DESC
  `;
  console.log("\nBy state:");
  for (const row of byState) console.log(`  ${row.state}: ${row.count}`);

  const byCat = await prisma.$queryRaw`
    SELECT cat.name, COUNT(c.id)::int as count
    FROM companies c
    JOIN categories cat ON cat.id = c.main_category_id
    WHERE c.status = 'published'
    GROUP BY cat.name
    ORDER BY count DESC
  `;
  console.log("\nBy category:");
  for (const row of byCat) console.log(`  ${row.name}: ${row.count}`);
}
main().catch(console.error).finally(() => prisma.$disconnect());
