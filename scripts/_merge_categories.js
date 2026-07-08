require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const DRY = process.env.DRY === '1';
const FROM = process.env.FROM, TO = process.env.TO;
(async () => {
  const from = await prisma.category.findFirst({ where: { name: FROM, is_active: true } });
  const to = await prisma.category.findFirst({ where: { name: TO, is_active: true } });
  if (!from || !to) { console.log('NOT FOUND', { from: !!from, to: !!to }); return prisma.$disconnect(); }
  const bizFrom = await prisma.company.count({ where: { main_category_id: from.id } });
  const kids = await prisma.category.count({ where: { parent_id: from.id } });
  console.log(`FROM: "${from.name}" id=${from.id} businesses=${bizFrom} children=${kids}`);
  console.log(`TO:   "${to.name}" id=${to.id}`);
  if (DRY) { console.log('DRY — no changes'); return prisma.$disconnect(); }
  const r1 = await prisma.company.updateMany({ where: { main_category_id: from.id }, data: { main_category_id: to.id } });
  const r2 = await prisma.category.updateMany({ where: { parent_id: from.id }, data: { parent_id: to.id } });
  await prisma.category.update({ where: { id: from.id }, data: { is_active: false } });
  console.log(`MERGED: moved ${r1.count} businesses, re-parented ${r2.count} children, deactivated "${from.name}".`);
  console.log('Active categories now:', await prisma.category.count({ where: { is_active: true } }));
  await prisma.$disconnect();
})().catch(async e => { console.error('ERR', e.message); await prisma.$disconnect(); process.exit(1); });
