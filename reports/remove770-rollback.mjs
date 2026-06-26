// ROLLBACK: re-publishes the 770 out-of-scope businesses hidden on 2026-06-14.
// Run from project root:  node reports/remove770-rollback.mjs
import { config } from 'dotenv'; config({ path: '.env.local' });
import { readFileSync } from 'fs';
const { PrismaClient } = await import('@prisma/client');
const prisma = new PrismaClient();
const backup = JSON.parse(readFileSync(new URL('./remove770-rollback-data.json', import.meta.url),'utf8'));
console.log("Restoring status for", backup.length, "records…");
let n=0;
for (const b of backup){ await prisma.company.update({ where:{ id:b.id }, data:{ status:b.status } }); n++; }
console.log("Restored:", n);
await prisma.$disconnect();
