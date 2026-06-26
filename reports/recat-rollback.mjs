// ROLLBACK: restores main_category_id for the 2,005 businesses re-tagged on 2026-06-14.
// Run from project root:  node reports/recat-rollback.mjs
import { config } from 'dotenv';
config({ path: '.env.local' });
import { readFileSync } from 'fs';
const { PrismaClient } = await import('@prisma/client');
const prisma = new PrismaClient();
const backup = JSON.parse(readFileSync(new URL('./recat-rollback-data.json', import.meta.url),'utf8'));
console.log("Restoring", backup.length, "records to their previous category…");
let n=0;
// group by old category for fewer queries
const byOld = new Map();
for (const b of backup){ const k=b.old_main_category_id; if(!byOld.has(k)) byOld.set(k,[]); byOld.get(k).push(b.id); }
for (const [oldCat, ids] of byOld){
  const res = await prisma.company.updateMany({ where:{ id:{ in: ids } }, data:{ main_category_id: oldCat } });
  n += res.count;
}
console.log("Restored:", n);
await prisma.$disconnect();
