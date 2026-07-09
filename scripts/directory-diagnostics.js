// Directory health diagnostics (READ-ONLY, admin/developer use).
// Usage: node scripts/directory-diagnostics.js
require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const STATES = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'];
const pub = { status: 'published', suspended: false };

function table(rows) {
  if (!rows.length) return console.log('   (none)');
  const cols = Object.keys(rows[0]);
  const w = cols.map((c) => Math.max(c.length, ...rows.map((r) => String(r[c] ?? '').length)));
  const line = (vals) => vals.map((v, i) => String(v ?? '').padEnd(w[i])).join('  ');
  console.log('   ' + line(cols));
  console.log('   ' + w.map((n) => '-'.repeat(n)).join('  '));
  rows.forEach((r) => console.log('   ' + line(cols.map((c) => r[c]))));
}

(async () => {
  console.log('\n=== RBA DIRECTORY DIAGNOSTICS ===\n');

  const total = await prisma.company.count({ where: pub });
  const totalAll = await prisma.company.count();
  console.log(`Active (published, not suspended) businesses: ${total}   [all statuses: ${totalAll}]\n`);

  // Per state (by residence)
  console.log('Businesses per state (residence):');
  const perState = [];
  for (const st of STATES) {
    const n = await prisma.company.count({ where: { ...pub, locations: { some: { state: st } } } });
    perState.push({ state: st, businesses: n });
  }
  table(perState);

  // Per active category (top-level)
  const cats = await prisma.category.findMany({ where: { is_active: true, parent_id: null }, select: { id: true, name: true, slug: true }, orderBy: { name: 'asc' } });
  const perCat = [];
  for (const c of cats) {
    const n = await prisma.company.count({ where: { ...pub, OR: [{ main_category_id: c.id }, { main_category: { parent_id: c.id } }] } });
    perCat.push({ slug: c.slug, name: c.name, businesses: n });
  }
  console.log(`\nActive top-level categories: ${cats.length}. Businesses per category (top 15):`);
  table([...perCat].sort((a, b) => b.businesses - a.businesses).slice(0, 15));

  // Categories with ZERO businesses (candidate dead landing routes)
  const emptyCats = perCat.filter((c) => c.businesses === 0);
  console.log(`\nActive categories with ZERO businesses (${emptyCats.length}) — /directory/<slug>/<state> would show 0:`);
  table(emptyCats.slice(0, 20).map((c) => ({ slug: c.slug, name: c.name })));

  // Category + state combos returning 0 (sample: biggest categories x all states)
  console.log('\nCategory+state combos returning 0 (top 8 categories × 8 states):');
  const zeros = [];
  for (const c of [...perCat].sort((a, b) => b.businesses - a.businesses).slice(0, 8)) {
    const cat = cats.find((x) => x.slug === c.slug);
    for (const st of STATES) {
      const n = await prisma.company.count({ where: { ...pub, locations: { some: { state: st } }, OR: [{ main_category_id: cat.id }, { main_category: { parent_id: cat.id } }] } });
      if (n === 0) zeros.push({ category: c.slug, state: st });
    }
  }
  table(zeros);

  // Data quality
  const noCat = await prisma.company.count({ where: { ...pub, main_category_id: null } });
  const noLoc = await prisma.company.count({ where: { ...pub, locations: { none: {} } } });
  console.log('\nData quality (published, not suspended):');
  table([
    { issue: 'missing main category', count: noCat },
    { issue: 'no location row', count: noLoc },
  ]);

  // Profile slugs
  const noSlug = await prisma.company.count({ where: { ...pub, OR: [{ slug: '' }] } });
  const slugRows = await prisma.company.groupBy({ by: ['slug'], where: pub, _count: { _all: true }, having: { slug: { _count: { gt: 1 } } } });
  console.log('\nProfile links:');
  table([
    { issue: 'businesses with empty slug (broken /company link)', count: noSlug },
    { issue: 'duplicate company slugs', count: slugRows.length },
  ]);
  if (slugRows.length) table(slugRows.slice(0, 10).map((r) => ({ slug: r.slug, times: r._count._all })));

  // Duplicate category slugs
  const catSlugDup = await prisma.category.groupBy({ by: ['slug'], _count: { _all: true }, having: { slug: { _count: { gt: 1 } } } });
  console.log(`\nDuplicate category slugs: ${catSlugDup.length}`);
  if (catSlugDup.length) table(catSlugDup.slice(0, 10).map((r) => ({ slug: r.slug, times: r._count._all })));

  console.log('\n=== END ===\n');
  await prisma.$disconnect();
})().catch(async (e) => { console.error('DIAGNOSTIC ERROR:', e.message); await prisma.$disconnect(); process.exit(1); });
