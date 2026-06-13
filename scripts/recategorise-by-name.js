/**
 * Re-categorise companies by matching their name against keyword patterns.
 * Uses specificity ordering: most specific patterns checked first.
 * Only updates main_category_id — does not remove or demote companies.
 */

require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// ─── Rules: most specific first, fallbacks last ───────────────────────────────
// Each rule: { pattern (regex on company name), catId (our DB id), catName }
const RULES = [
  // ── Specific builder sub-types ────────────────────────────────────────────
  { pattern: /class\s*1\s*(remedial\s*)?build/i,         catId: 352, catName: 'Class 1 Builders' },
  { pattern: /class\s*2\s*(remedial\s*)?build/i,         catId: 353, catName: 'Class 2 Builders' },
  { pattern: /remedial\s+build/i,                        catId: 354, catName: 'Builders' },
  { pattern: /deck\s+build|build.*deck/i,                catId: 652, catName: 'Deck Builders' },
  { pattern: /pool\s+build/i,                            catId: 634, catName: 'Pool Builders' },
  { pattern: /patio\s+build/i,                           catId: 780, catName: 'Patio Builders' },
  { pattern: /pergola\s+build/i,                         catId: 613, catName: 'Pergola Builders' },
  { pattern: /shed\s+build/i,                            catId: 765, catName: 'Shed Builders' },
  { pattern: /stair.?build|staircase.*build/i,           catId: 611, catName: 'Staircase Contractors' },
  { pattern: /granny\s+flat|home.*extension/i,           catId: 758, catName: 'Renovation Builders' },
  { pattern: /renovation.*build|build.*renovat/i,        catId: 758, catName: 'Renovation Builders' },
  // General builders — must come after all specific builder sub-types
  { pattern: /\bbuilder(s)?\b/i,                         catId: 755, catName: 'Builders (General / Licensed)' },

  // ── Scaffold ──────────────────────────────────────────────────────────────
  { pattern: /scaffold/i,                                catId: 454, catName: 'Scaffold Companies' },

  // ── Concrete / structural specialists ────────────────────────────────────
  { pattern: /crack\s+inject/i,                          catId: 360, catName: 'Crack Injection Contractors' },
  { pattern: /shotcrete/i,                               catId: 362, catName: 'Shotcrete Contractors' },
  { pattern: /carbon\s+fibre|carbon\s+fiber|frp\s+/i,   catId: 361, catName: 'Carbon Fibre / FRP Contractors' },
  { pattern: /epoxy\s+floor|floor.*epoxy/i,              catId: 619, catName: 'Epoxy Flooring Contractors' },

  // ── Pipes / drains ────────────────────────────────────────────────────────
  { pattern: /pipe\s*relin/i,                            catId: 521, catName: 'Pipe Relining Contractors' },
  { pattern: /stormwater/i,                              catId: 523, catName: 'Stormwater Contractors' },

  // ── Cleaning / maintenance ────────────────────────────────────────────────
  { pattern: /graffiti/i,                                catId: 662, catName: 'Graffiti Removal Contractors' },
  { pattern: /mould.*(remov|remediat)|mold.*(remov|remediat)/i, catId: 490, catName: 'Mould Remediation Contractors' },
  { pattern: /pressure\s+wash|high.pressure.*clean/i,    catId: 658, catName: 'Pressure Washing Contractors' },
  { pattern: /asbestos/i,                                catId: 489, catName: 'Asbestos Removal Contractors' },

  // ── Windows / facades ─────────────────────────────────────────────────────
  { pattern: /window.*replac|replac.*window/i,           catId: 416, catName: 'Window Replacement Contractors' },
  { pattern: /balustrade/i,                              catId: 424, catName: 'Balustrade Contractors' },
  { pattern: /render.*(repair|contractor|special)/i,     catId: 408, catName: 'Render Repair Contractors' },

  // ── Masonry ───────────────────────────────────────────────────────────────
  { pattern: /brick.*repoint|repoint.*brick/i,           catId: 432, catName: 'Brick Repointing Contractors' },
  { pattern: /stone\s+restor/i,                          catId: 441, catName: 'Stone Restoration Contractors' },
  { pattern: /heritage.*mason|mason.*heritage/i,         catId: 437, catName: 'Heritage Masonry Contractors' },

  // ── Rope access / height safety ───────────────────────────────────────────
  { pattern: /rope\s+access/i,                           catId: 458, catName: 'Rope Access Contractors' },
  { pattern: /height\s+safety|fall.*arrest/i,            catId: 460, catName: 'Height Safety Contractors' },

  // ── Fire ─────────────────────────────────────────────────────────────────
  { pattern: /fire\s+door/i,                             catId: 573, catName: 'Fire Door Contractors' },
  { pattern: /fire\s+sprinkler/i,                        catId: 574, catName: 'Fire Sprinkler Contractors' },
  { pattern: /fire\s+stop/i,                             catId: 572, catName: 'Fire Stopping Contractors' },
  { pattern: /fire\s+hydrant/i,                          catId: 575, catName: 'Fire Hydrant Contractors' },

  // ── Certifiers / surveyors ────────────────────────────────────────────────
  { pattern: /building\s+surveyors?\s*[&+]\s*certif|certif.*building.*surv/i, catId: 335, catName: 'Building Surveyors & Certifiers' },
  { pattern: /building\s+inspector/i,                    catId: 341, catName: 'Building Inspectors' },

  // ── Demolition ────────────────────────────────────────────────────────────
  { pattern: /select.*demolit|demolit/i,                 catId: 501, catName: 'Selective Demolition Contractors' },
];

async function main() {
  const client = await pool.connect();

  try {
    // Load all companies with their current category
    const { rows: companies } = await client.query(`
      SELECT c.id, c.name, c.main_category_id, cat.name AS current_category
      FROM companies c
      LEFT JOIN categories cat ON cat.id = c.main_category_id
      WHERE c.status = 'published'
      ORDER BY c.id
    `);

    console.log(`Loaded ${companies.length} published companies`);

    const updates = [];

    for (const company of companies) {
      const name = company.name || '';
      for (const rule of RULES) {
        if (rule.pattern.test(name)) {
          // Skip if already correctly categorised
          if (company.main_category_id === rule.catId) break;
          updates.push({
            id: company.id,
            name,
            oldCat: company.current_category,
            newCatId: rule.catId,
            newCatName: rule.catName,
          });
          break; // first matching rule wins
        }
      }
    }

    console.log(`\nFound ${updates.length} companies to re-categorise`);

    // Show preview grouped by new category
    const byNewCat = {};
    for (const u of updates) {
      byNewCat[u.newCatName] = byNewCat[u.newCatName] || [];
      byNewCat[u.newCatName].push(u);
    }
    for (const [cat, list] of Object.entries(byNewCat).sort((a,b) => b[1].length - a[1].length)) {
      console.log(`\n  → ${cat} (${list.length})`);
      list.slice(0, 5).forEach(u => console.log(`       ${u.name.substring(0, 70)}`));
      if (list.length > 5) console.log(`       ... and ${list.length - 5} more`);
    }

    if (updates.length === 0) {
      console.log('Nothing to update.');
      return;
    }

    // Apply updates in batches
    let done = 0;
    for (const u of updates) {
      await client.query(
        `UPDATE companies SET main_category_id = $1, updated_at = NOW() WHERE id = $2`,
        [u.newCatId, u.id]
      );
      done++;
      if (done % 500 === 0) process.stdout.write(`\r  Updated ${done}/${updates.length}...`);
    }

    console.log(`\n\nDone. Updated ${done} companies.`);

  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(e => { console.error(e); process.exit(1); });
