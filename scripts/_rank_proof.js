require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const R = 6371, toR = d => d * Math.PI / 180;
const km = (aLat, aLng, bLat, bLng) => { const dLa = toR(bLat - aLat), dLo = toR(bLng - aLng); const h = Math.sin(dLa / 2) ** 2 + Math.cos(toR(aLat)) * Math.cos(toR(bLat)) * Math.sin(dLo / 2) ** 2; return 2 * R * Math.asin(Math.min(1, Math.sqrt(h))); };
const BLAT = -33.8908, BLNG = 151.2743; // Bondi
const PLAN = { featured: 2, claimed: 1, basic: 0 };
(async () => {
  const cat = await prisma.category.findFirst({ where: { name: 'Plumbing & Drainage', is_active: true } });
  const rows = await prisma.company.findMany({ where: { status: 'published', main_category_id: cat.id }, select: { id: true, name: true, locations: { select: { suburb: true, state: true, latitude: true, longitude: true } } } });
  let list = rows.map(r => { const l = r.locations[0]; if (!l || l.latitude == null || l.state !== 'NSW') return null; return { id: r.id, name: r.name, sub: l.suburb, km: Math.round(km(BLAT, BLNG, l.latitude, l.longitude)), plan: 'basic' }; }).filter(Boolean);
  const far = list.filter(x => x.km >= 65).sort((a, b) => b.km - a.km)[0]; far.plan = 'featured';   // hypothetical GOLD
  const mid = list.find(x => x.km >= 40 && x.km <= 52); mid.plan = 'claimed';                        // hypothetical SILVER
  const CAP = 50;
  const kept = list.filter(x => PLAN[x.plan] === 2 || x.km == null || x.km <= CAP);                  // Gold=state, Silver/Free<=50km
  kept.sort((a, b) => (PLAN[b.plan] - PLAN[a.plan]) || (a.km - b.km));                               // tier, then closest-first
  console.log('=== "plumber near Bondi" — result order (hypothetical Gold/Silver) ===');
  kept.slice(0, 12).forEach((x, i) => console.log(String(i + 1).padStart(2), (x.plan === 'featured' ? 'GOLD' : x.plan === 'claimed' ? 'SILVER' : 'Free').padEnd(6), (x.km + 'km').padStart(6), ' ', x.sub + ' — ' + x.name.slice(0, 30)));
  const droppedFar = list.filter(x => PLAN[x.plan] < 2 && x.km > 50).length;
  console.log('\nFree/Silver beyond 50km correctly EXCLUDED:', droppedFar, 'businesses');
  console.log('GOLD shown from', far.km, 'km away (state-wide, past the 50km cap):', far.sub);
  await prisma.$disconnect();
})().catch(async e => { console.error('ERR', e.message); await prisma.$disconnect(); process.exit(1); });
