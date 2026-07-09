require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const PLAN = { featured: 'Gold', premium: 'Gold', claimed: 'Silver', business: 'Silver', basic: 'Free' };
(async () => {
  const rows = await prisma.company.findMany({
    where: { status: 'published', suspended: false },
    select: {
      name: true, phone: true, website: true, email: true, plan_type: true, slug: true,
      main_category: { select: { name: true, slug: true } },
      locations: { take: 1, select: { suburb: true, state: true, postcode: true } },
    },
  });
  const groups = {};
  for (const r of rows) {
    const cat = r.main_category?.name || 'Uncategorised';
    const slug = r.main_category?.slug || 'uncategorised';
    (groups[cat] = groups[cat] || { name: cat, slug, businesses: [] });
    const loc = r.locations[0] || {};
    groups[cat].businesses.push({
      name: r.name, plan: PLAN[r.plan_type] || 'Free',
      suburb: loc.suburb || '', state: loc.state || '', postcode: loc.postcode || '',
      phone: r.phone || '', email: r.email || '', website: r.website || '',
      profile: r.slug ? `https://www.remedialbuildingaustralia.com.au/directory/company/${r.slug}` : '',
    });
  }
  const out = Object.values(groups).sort((a, b) => b.businesses.length - a.businesses.length);
  fs.writeFileSync('/tmp/cat_biz_export.json', JSON.stringify(out));
  console.log('categories:', out.length, '| total businesses:', rows.length);
  await prisma.$disconnect();
})().catch(async e => { console.error('ERR', e.message); await prisma.$disconnect(); process.exit(1); });
