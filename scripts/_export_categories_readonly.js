// READ-ONLY export of live categories + business counts. No writes.
require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

(async () => {
  const cats = await prisma.category.findMany({
    select: { id: true, name: true, slug: true, parent_id: true, display_order: true, is_active: true },
    orderBy: { id: 'asc' },
  });

  // business counts per category (primary)
  const mainCounts = await prisma.company.groupBy({
    by: ['main_category_id'],
    _count: { _all: true },
    where: { main_category_id: { not: null } },
  });
  const mainMap = {};
  mainCounts.forEach(r => { mainMap[r.main_category_id] = r._count._all; });

  // secondary tags per category
  const secCounts = await prisma.companyCategory.groupBy({
    by: ['category_id'],
    _count: { _all: true },
  });
  const secMap = {};
  secCounts.forEach(r => { secMap[r.category_id] = r._count._all; });

  const rows = cats.map(c => ({
    id: c.id, name: c.name, slug: c.slug,
    parent_id: c.parent_id, is_active: c.is_active,
    primary_businesses: mainMap[c.id] || 0,
    secondary_tags: secMap[c.id] || 0,
  }));

  fs.writeFileSync('/tmp/live_categories.json', JSON.stringify(rows, null, 0));
  console.log('categories:', rows.length);
  console.log('with primary businesses:', rows.filter(r => r.primary_businesses > 0).length);
  console.log('parents (parent_id null):', rows.filter(r => r.parent_id == null).length);
  console.log('total primary business tags:', Object.values(mainMap).reduce((a,b)=>a+b,0));
  await prisma.$disconnect();
})().catch(async e => { console.error('ERR', e.message); await prisma.$disconnect(); process.exit(1); });
