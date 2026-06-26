// ROLLBACK: restores the 8 passive-fire businesses to their previous categories (2026-06-15).
// Run from project root:  node reports/passivefire-rollback.mjs
import { config } from 'dotenv'; config({ path: '.env.local' });
import { readFileSync } from 'fs';
const { PrismaClient } = await import('@prisma/client');
const prisma = new PrismaClient();
const backup = JSON.parse(readFileSync(new URL('./passivefire-rollback-data.json', import.meta.url),'utf8'));
let n=0;
for (const b of backup){ await prisma.company.update({ where:{ id:b.id }, data:{ main_category_id:b.old_main_category_id } }); n++; }
console.log("Restored", n, "businesses to their previous categories.");
await prisma.$disconnect();
