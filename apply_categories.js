/**
 * Category migration — REAL apply. DRY RUN by default (no writes); set APPLY=1 to write.
 * Reads migration.v2.json: { renames:[{slug,new_name,old_name}], reactivations:[{slug,name}], additions:[{name,slug}] }
 *
 * Safety:
 *  - Renames only change categories.name (slug + id unchanged) -> businesses stay attached, URLs unchanged.
 *  - Reactivations only set is_active=true on an existing (currently inactive) row.
 *  - Additions upsert by slug: existing slug -> reactivate (+ set name); else INSERT new top-level active row.
 *  - No deletes, no deactivations. All writes run in a single transaction.
 */
require("dotenv").config({ path: ".env.local" });
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const prisma = new PrismaClient();
const APPLY = process.env.APPLY === "1";
const plan = JSON.parse(fs.readFileSync(process.argv[2] || "migration.v2.json", "utf8"));

(async () => {
  console.log(`\n===== CATEGORY MIGRATION ${APPLY ? "(APPLY — WRITING)" : "(DRY RUN — no writes)"} =====\n`);
  const ops = []; // {kind, fn}
  let warnings = 0;

  // ---------- RENAMES ----------
  console.log(`RENAMES (${plan.renames.length}):`);
  for (const r of plan.renames) {
    const cat = await prisma.category.findFirst({ where: { slug: r.slug }, select: { id: true, name: true } });
    if (!cat) { console.log(`  ✗ slug '${r.slug}' NOT FOUND — skip`); warnings++; continue; }
    const n = await prisma.company.count({ where: { main_category_id: cat.id } });
    const already = cat.name === r.new_name;
    const mismatch = cat.name !== r.old_name && !already;
    console.log(`  ${already ? "= " : "→ "}'${cat.name}' => '${r.new_name}'  [${n} businesses stay]${mismatch ? `  ⚠ DB name != expected old '${r.old_name}'` : ""}${already ? "  (already applied)" : ""}`);
    if (mismatch) warnings++;
    if (!already) ops.push({ kind: "rename", fn: (tx) => tx.category.update({ where: { id: cat.id }, data: { name: r.new_name } }) });
  }

  // ---------- REACTIVATIONS ----------
  console.log(`\nREACTIVATIONS (${plan.reactivations.length}):`);
  for (const a of plan.reactivations) {
    const cat = await prisma.category.findFirst({ where: { slug: a.slug }, select: { id: true, name: true, is_active: true } });
    if (!cat) { console.log(`  ✗ slug '${a.slug}' NOT FOUND — skip`); warnings++; continue; }
    const needName = a.name && cat.name !== a.name;
    console.log(`  ${cat.is_active ? "= " : "→ "}'${cat.name}' active:${cat.is_active}=>true${needName ? ` (rename to '${a.name}')` : ""}${cat.is_active && !needName ? "  (already active)" : ""}`);
    if (!cat.is_active || needName) {
      ops.push({ kind: "reactivate", fn: (tx) => tx.category.update({ where: { id: cat.id }, data: { is_active: true, ...(needName ? { name: a.name } : {}) } }) });
    }
  }

  // ---------- ADDITIONS ----------
  const maxRow = await prisma.category.aggregate({ _max: { display_order: true } });
  let nextOrder = (maxRow._max.display_order || 0) + 1;
  console.log(`\nADDITIONS (${plan.additions.length})  [new display_order starts at ${nextOrder}]:`);
  let willInsert = 0, willReactivate = 0, alreadyActive = 0;
  for (const a of plan.additions) {
    const e = await prisma.category.findFirst({ where: { slug: a.slug }, select: { id: true, name: true, is_active: true } });
    if (!e) {
      willInsert++;
      const order = nextOrder++;
      ops.push({ kind: "insert", fn: (tx) => tx.category.create({ data: { name: a.name, slug: a.slug, is_active: true, parent_id: null, display_order: order } }) });
    } else if (!e.is_active) {
      willReactivate++;
      ops.push({ kind: "insert-reactivate", fn: (tx) => tx.category.update({ where: { id: e.id }, data: { is_active: true, name: a.name } }) });
      console.log(`  ⚠ '${a.name}' slug exists but INACTIVE -> reactivate`);
    } else {
      alreadyActive++;
      console.log(`  ⚠ '${a.name}' slug already ACTIVE (as '${e.name}') — skip (no duplicate created)`);
    }
  }
  // active-name collisions (same name, different slug, active)
  const names = plan.additions.map((a) => a.name);
  const nameHits = await prisma.category.findMany({ where: { name: { in: names }, is_active: true }, select: { name: true, slug: true } });
  const addSlugs = new Set(plan.additions.map((a) => a.slug));
  const realCollisions = nameHits.filter((h) => !addSlugs.has(h.slug));
  if (realCollisions.length) {
    console.log(`  ⚠ ${realCollisions.length} addition name(s) already exist as a DIFFERENT active category (possible duplicate):`);
    realCollisions.forEach((h) => console.log(`     - '${h.name}' (existing slug ${h.slug})`));
    warnings += realCollisions.length;
  }
  console.log(`  ${willInsert} brand-new INSERT, ${willReactivate} reactivate, ${alreadyActive} already-active (skipped).`);

  // ---------- SUMMARY ----------
  console.log(`\n===== SUMMARY =====`);
  console.log(`  Writes queued: ${ops.length}  (${ops.filter((o) => o.kind === "rename").length} rename, ${ops.filter((o) => o.kind === "reactivate").length} reactivate, ${ops.filter((o) => o.kind === "insert").length} insert, ${ops.filter((o) => o.kind === "insert-reactivate").length} addition-reactivate)`);
  console.log(`  Warnings: ${warnings}`);

  if (!APPLY) {
    console.log(`\nDRY RUN complete — nothing was written. Re-run with APPLY=1 to write.`);
    await prisma.$disconnect();
    return;
  }

  console.log(`\nAPPLYING ${ops.length} writes in a transaction...`);
  await prisma.$transaction(ops.map((o) => o.fn(prisma)));
  console.log(`✅ APPLIED ${ops.length} writes.`);
  const activeNow = await prisma.category.count({ where: { is_active: true } });
  console.log(`Active categories now: ${activeNow}`);
  await prisma.$disconnect();
})().catch(async (e) => { console.error("ERR", e); try { await prisma.$disconnect(); } catch {} process.exit(1); });
