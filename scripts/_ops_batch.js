require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const DRY = process.env.DRY === '1';
const PLAN = [
  { kind: 'merge', from: 2264, to: 2265, rename: 'Air Conditioning & HVAC Service', label: 'Air Conditioning -> Air Conditioning & HVAC Service' },
  { kind: 'move', ids: [15368, 9736, 9729, 9732], to: 2284, label: 'Basement Builder (4) -> Building Contractor' },
  { kind: 'move', ids: [15378], to: 871, label: 'Retention/Civil Works (1) -> Civil Construction' },
  { kind: 'move', ids: [9702], to: 2400, label: 'Underpinning/Foundation (1) -> Underpinning & Foundation Repair' },
];
(async () => {
  console.log(DRY ? '=== DRY RUN (no writes) ===' : '=== LIVE ===');
  for (const op of PLAN) {
    if (op.kind === 'merge') {
      const n = await prisma.company.count({ where: { main_category_id: op.from } });
      console.log(`MERGE: ${op.label} — ${n} businesses to move`);
      if (!DRY) {
        await prisma.company.updateMany({ where: { main_category_id: op.from }, data: { main_category_id: op.to } });
        await prisma.category.update({ where: { id: op.from }, data: { is_active: false } });
        await prisma.category.update({ where: { id: op.to }, data: { name: op.rename } });
      }
    } else {
      const n = await prisma.company.count({ where: { id: { in: op.ids } } });
      console.log(`MOVE: ${op.label} — ${n} of ${op.ids.length} target businesses found`);
      if (!DRY) await prisma.company.updateMany({ where: { id: { in: op.ids } }, data: { main_category_id: op.to } });
    }
  }
  if (!DRY) console.log('Active categories now:', await prisma.category.count({ where: { is_active: true } }));
  await prisma.$disconnect();
})().catch(async e => { console.error('ERR', e.message); await prisma.$disconnect(); process.exit(1); });
