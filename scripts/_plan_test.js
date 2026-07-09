require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const MODE = process.env.MODE; // 'set' | 'revert'
const DRY = process.env.DRY === '1';
const SILVER_ID = 2663, GOLD_ID = 16437;
(async () => {
  if (MODE === 'set') {
    const cur = await prisma.company.findMany({ where: { id: { in: [SILVER_ID, GOLD_ID] } }, select: { id: true, plan_type: true, is_featured: true, is_claimed: true } });
    fs.writeFileSync('/tmp/plan_orig.json', JSON.stringify(cur));
    console.log('original:', JSON.stringify(cur));
    if (DRY) return console.log('DRY — would set', SILVER_ID, '->claimed(Silver),', GOLD_ID, '->featured(Gold)'), prisma.$disconnect();
    await prisma.company.update({ where: { id: SILVER_ID }, data: { plan_type: 'claimed', is_claimed: true } });
    await prisma.company.update({ where: { id: GOLD_ID }, data: { plan_type: 'featured', is_featured: true } });
    console.log('SET: Silver=', SILVER_ID, 'Gold=', GOLD_ID);
  } else if (MODE === 'revert') {
    const orig = JSON.parse(fs.readFileSync('/tmp/plan_orig.json', 'utf8'));
    if (DRY) return console.log('DRY — would revert to', JSON.stringify(orig)), prisma.$disconnect();
    for (const o of orig) await prisma.company.update({ where: { id: o.id }, data: { plan_type: o.plan_type, is_featured: o.is_featured, is_claimed: o.is_claimed } });
    console.log('REVERTED to original:', JSON.stringify(orig));
  }
  await prisma.$disconnect();
})().catch(async e => { console.error('ERR', e.message); await prisma.$disconnect(); process.exit(1); });
