require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const DRY = process.env.DRY === '1';
const RENAMES = [
  { from: 'Plastering', to: 'Plastering & Gyprock Service' },
  { from: 'Blinds', to: 'Blinds & Shutters' },
  { from: 'Cladding Compliance', to: 'Cladding Consultant' },
  { from: 'Commercial Property', to: 'Commercial Property Management' },
  { from: 'Shotcrete', to: 'Shotcreting Contractor' },
];
(async () => {
  console.log(DRY ? '=== DRY RUN ===' : '=== LIVE ===');
  for (const r of RENAMES) {
    const c = await prisma.category.findFirst({ where: { name: r.from, is_active: true }, select: { id: true, name: true } });
    if (!c) { console.log(`NOT FOUND: "${r.from}"`); continue; }
    const biz = await prisma.company.count({ where: { main_category_id: c.id } });
    console.log(`${DRY ? 'WOULD RENAME' : 'RENAMED'}: "${r.from}" (id=${c.id}, ${biz} biz) -> "${r.to}"`);
    if (!DRY) await prisma.category.update({ where: { id: c.id }, data: { name: r.to } });
  }
  await prisma.$disconnect();
})().catch(async e => { console.error('ERR', e.message); await prisma.$disconnect(); process.exit(1); });
