/**
 * Category migration — DRY RUN by default (no writes). Set APPLY=1 to write.
 * Reads migration.json: { renames:[{slug,new_name,old_name}], additions:[{name,slug}] }
 */
require("dotenv").config({ path: ".env.local" });
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const prisma = new PrismaClient();
const APPLY = process.env.APPLY === "1";
const plan = JSON.parse(fs.readFileSync(process.argv[2] || "migration.json", "utf8"));

(async () => {
  console.log(`\n===== CATEGORY MIGRATION ${APPLY ? "(APPLY — WRITING)" : "(DRY RUN — no writes)"} =====\n`);

  // ---- RENAMES ----
  console.log(`RENAMES (${plan.renames.length}):`);
  let renameOk = 0, renameWarn = 0, bizTotal = 0;
  for (const r of plan.renames) {
    const cat = await prisma.category.findFirst({ where: { slug: r.slug }, select: { id: true, name: true, is_active: true } });
    if (!cat) { console.log(`  ✗ slug '${r.slug}' NOT FOUND — skip`); renameWarn++; continue; }
    const n = await prisma.company.count({ where: { main_category_id: cat.id } });
    bizTotal += n;
    const already = cat.name === r.new_name;
    const mismatch = cat.name !== r.old_name && !already;
    console.log(`  ${already ? "= " : "→ "}'${cat.name}' => '${r.new_name}'  [${n} businesses stay]${mismatch ? "  ⚠ DB name != expected old '" + r.old_name + "'" : ""}${already ? "  (already renamed)" : ""}`);
    if (mismatch) renameWarn++; else renameOk++;
  }
  console.log(`  -> ${renameOk} ok, ${renameWarn} warnings; ${bizTotal} businesses stay attached.\n`);

  // ---- ADDITIONS ----
  const slugs = plan.additions.map((a) => a.slug);
  const existing = await prisma.category.findMany({ where: { slug: { in: slugs } }, select: { slug: true, name: true, is_active: true } });
  const bySlug = Object.fromEntries(existing.map((e) => [e.slug, e]));

  let willInsert = 0, reactivate = 0, alreadyActive = 0;
  const inserts = [], reacts = [], actives = [];
  for (const a of plan.additions) {
    const e = bySlug[a.slug];
    if (!e) { willInsert++; inserts.push(a.name); }
    else if (e.is_active) { alreadyActive++; actives.push(`${a.name} (slug exists, active as '${e.name}')`); }
    else { reactivate++; reacts.push(`${a.name} (slug exists but INACTIVE as '${e.name}')`); }
  }
  console.log(`ADDITIONS (${plan.additions.length}):`);
  console.log(`  ${willInsert} brand-new INSERT, ${reactivate} slug-exists-inactive (reactivate), ${alreadyActive} already-active.`);
  if (reacts.length) { console.log("  ⚠ slug already exists but inactive:"); reacts.forEach((s) => console.log("     - " + s)); }
  if (actives.length) { console.log("  ⚠ slug already exists AND active (would be a duplicate — skip):"); actives.forEach((s) => console.log("     - " + s)); }
  console.log(`  First 6 brand-new: ${inserts.slice(0, 6).join(" | ")}${inserts.length > 6 ? " …" : ""}`);

  // name collisions (active category with same NAME but different slug)
  const names = plan.additions.map((a) => a.name);
  const nameHits = await prisma.category.findMany({ where: { name: { in: names }, is_active: true }, select: { name: true, slug: true } });
  if (nameHits.length) {
    console.log(`  ⚠ ${nameHits.length} addition name(s) already exist as an active category (possible duplicate):`);
    nameHits.forEach((h) => console.log(`     - '${h.name}' (slug ${h.slug})`));
  }

  console.log(`\n===== SUMMARY =====`);
  console.log(`  Renames to apply: ${renameOk}  (+${renameWarn} to review)`);
  console.log(`  New inserts: ${willInsert}  | reactivate: ${reactivate}  | skip(active): ${alreadyActive}`);
  console.log(APPLY ? "\n(APPLY mode — writes would happen here.)" : "\nDRY RUN complete — nothing was written.");
  await prisma.$disconnect();
})().catch((e) => { console.error(e); process.exit(1); });
