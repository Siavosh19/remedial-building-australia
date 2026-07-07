// Category migration: flatten businesses onto the 167 final categories.
// Safe: keeps existing category rows, re-tags businesses (backup taken), reversible.
// DRY=1 -> compute + report only, no writes.
require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const DRY = process.env.DRY === '1';
const map = JSON.parse(fs.readFileSync('/tmp/final_map.json', 'utf8'));

async function main() {
  console.log(`\n=== CATEGORY MIGRATION ${DRY ? '(DRY RUN — no writes)' : '(LIVE)'} ===`);

  const allSlugs = [...map.parents.map(p => p.slug), ...map.subs.map(s => s.slug)];
  const existing = await prisma.category.findMany({ where: { slug: { in: allSlugs } }, select: { id: true, slug: true } });
  const bySlug = Object.fromEntries(existing.map(c => [c.slug, c.id]));
  console.log(`Final categories: ${allSlugs.length} (reuse existing: ${existing.length}, create new: ${allSlugs.length - existing.length})`);

  // business retag preview
  const leafIds = Object.keys(map.leafToFinal).map(Number);
  const removeIds = map.removeCategoryIds;
  const bizToRetag = await prisma.company.count({ where: { main_category_id: { in: leafIds } } });
  const bizToHide = await prisma.company.count({ where: { main_category_id: { in: removeIds } } });
  const bizToHidePub = await prisma.company.count({ where: { main_category_id: { in: removeIds }, status: 'published' } });
  const finalExistingIds = new Set(Object.values(bySlug));
  const mappedSet = new Set([...leafIds, ...removeIds, ...finalExistingIds]);
  const pubCats = await prisma.company.findMany({ where: { status: 'published', main_category_id: { not: null } }, select: { main_category_id: true }, distinct: ['main_category_id'] });
  const unmapped = pubCats.map(c => c.main_category_id).filter(id => !mappedSet.has(id));
  console.log(`Businesses to re-tag onto final categories: ${bizToRetag}`);
  console.log(`Businesses to HIDE (14 unrelated cats): ${bizToHide} (of which published now: ${bizToHidePub})`);
  console.log(`Published businesses on UNMAPPED categories (kept active, flagged): ${unmapped.length}`, unmapped.slice(0, 20));

  if (DRY) { console.log('\nDRY RUN complete. No changes made.'); await prisma.$disconnect(); return; }

  // ---- LIVE WRITES ----
  await prisma.$transaction(async (tx) => {
    const nameToId = {};
    // parents
    for (let i = 0; i < map.parents.length; i++) {
      const p = map.parents[i];
      const c = await tx.category.upsert({
        where: { slug: p.slug },
        update: { name: p.name, parent_id: null, is_active: true, display_order: i + 1 },
        create: { name: p.name, slug: p.slug, parent_id: null, is_active: true, display_order: i + 1 },
      });
      nameToId['P|' + p.name] = c.id;
    }
    const pmsId = nameToId['P|Product & Material Supplier'];
    // subs
    for (let i = 0; i < map.subs.length; i++) {
      const s = map.subs[i];
      const c = await tx.category.upsert({
        where: { slug: s.slug },
        update: { name: s.name, parent_id: pmsId, is_active: true, display_order: i + 1 },
        create: { name: s.name, slug: s.slug, parent_id: pmsId, is_active: true, display_order: i + 1 },
      });
      nameToId['S|' + s.name] = c.id;
    }
    const finalIds = new Set(Object.values(nameToId));

    // group leaves by target final id
    const groups = {};
    for (const [leaf, t] of Object.entries(map.leafToFinal)) {
      const fid = nameToId[t.kind + '|' + t.name];
      if (!fid) continue;
      (groups[fid] = groups[fid] || []).push(Number(leaf));
    }
    let retagged = 0;
    for (const [fid, leaves] of Object.entries(groups)) {
      const r = await tx.company.updateMany({
        where: { main_category_id: { in: leaves.filter(x => x !== Number(fid)) } },
        data: { main_category_id: Number(fid) },
      });
      retagged += r.count;
    }
    // hide unrelated businesses
    const hid = await tx.company.updateMany({ where: { main_category_id: { in: removeIds } }, data: { status: 'draft' } });

    // recompute which categories to keep active: finals + any still-referenced by published business
    const stillPub = await tx.company.findMany({ where: { status: 'published', main_category_id: { not: null } }, select: { main_category_id: true }, distinct: ['main_category_id'] });
    const keepActive = new Set([...finalIds, ...stillPub.map(c => c.main_category_id)]);
    await tx.category.updateMany({ where: { id: { in: [...keepActive] } }, data: { is_active: true } });
    const deact = await tx.category.updateMany({ where: { id: { notIn: [...keepActive] } }, data: { is_active: false } });

    console.log(`\nLIVE done: retagged ${retagged} businesses, hid ${hid.count}, kept active ${keepActive.size} categories, deactivated ${deact.count}.`);
  }, { timeout: 180000, maxWait: 30000 });

  // post-verify
  const activeCats = await prisma.category.count({ where: { is_active: true } });
  const activeTop = await prisma.category.count({ where: { is_active: true, parent_id: null } });
  const pubBiz = await prisma.company.count({ where: { status: 'published' } });
  console.log(`POST-CHECK: active categories=${activeCats} (top-level=${activeTop}), published businesses=${pubBiz}`);
  await prisma.$disconnect();
}
main().catch(async e => { console.error('MIGRATION ERROR:', e.message); await prisma.$disconnect(); process.exit(1); });
