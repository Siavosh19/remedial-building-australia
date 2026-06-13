/**
 * Applies the reassignments from recategorise-changes.csv to the DB.
 */

require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function main() {
  const lines = fs.readFileSync('business-leads-output/recategorise-changes.csv', 'utf8').split('\n');
  const rows = lines.slice(1).filter(Boolean).map(l => {
    const m = l.match(/^(\d+),\"(.*?)\",\"(.*?)\",\"(.*?)\"$/);
    if (!m) return null;
    return { id: parseInt(m[1]), newCat: m[4] };
  }).filter(Boolean);

  console.log(`Applying ${rows.length} reassignments...`);

  const client = await pool.connect();

  // Build a map of category name → id from DB
  const { rows: cats } = await client.query('SELECT id, name FROM categories WHERE is_active = true');
  const catMap = new Map(cats.map(c => [c.name, c.id]));

  let done = 0, failed = 0;
  for (const row of rows) {
    const catId = catMap.get(row.newCat);
    if (!catId) { console.warn('Unknown category name:', row.newCat); failed++; continue; }
    await client.query(
      'UPDATE companies SET main_category_id = $1, updated_at = NOW() WHERE id = $2',
      [catId, row.id]
    );
    done++;
    if (done % 500 === 0) process.stdout.write(`\r  ${done}/${rows.length}...`);
  }

  console.log(`\nDone. Applied: ${done}, Failed: ${failed}`);

  // Quick summary of new distribution
  const { rows: dist } = await client.query(`
    SELECT cat.name, COUNT(*) as cnt
    FROM companies c
    JOIN categories cat ON cat.id = c.main_category_id
    WHERE c.status = 'published'
    GROUP BY cat.name ORDER BY cnt DESC LIMIT 25
  `);
  console.log('\nTop 25 categories now:');
  dist.forEach(r => console.log(String(r.cnt).padStart(6), r.name));

  client.release();
  await pool.end();
}

main().catch(e => { console.error(e); process.exit(1); });
