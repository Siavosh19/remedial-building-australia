require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
(async () => {
  // air con categories
  const acs = await prisma.category.findMany({ where: { name: { contains: 'Air Conditioning' }, is_active: true }, select: { id: true, name: true } });
  for (const c of acs) {
    const n = await prisma.company.count({ where: { main_category_id: c.id } });
    console.log(`AIRCON  id=${c.id} biz=${n}  "${c.name}"`);
  }
  // targets
  for (const nm of ['Building Contractor', 'Civil Construction', 'Underpinning & Foundation Repair']) {
    const c = await prisma.category.findFirst({ where: { name: nm, is_active: true }, select: { id: true, name: true } });
    console.log(`TARGET  ${c ? 'id=' + c.id : 'NOT FOUND'}  "${nm}"`);
  }
  // backup: companies originally on leaves 1016/1017/1020
  const bk = JSON.parse(fs.readFileSync('/tmp/category_backup_pre-migration.json', 'utf8'));
  for (const leaf of [1016, 1017, 1020]) {
    const ids = bk.companies.filter(c => c.main_category_id === leaf).map(c => c.id);
    console.log(`LEAF ${leaf}: ${ids.length} businesses originally -> ids ${JSON.stringify(ids.slice(0,10))}${ids.length>10?'…':''}`);
  }
  await prisma.$disconnect();
})().catch(async e => { console.error('ERR', e.message); await prisma.$disconnect(); process.exit(1); });
