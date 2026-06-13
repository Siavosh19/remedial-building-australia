#!/usr/bin/env node
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

function stripPrivate(s) {
  return s ? s.replace(/[-]/g, '').trim() : s;
}

async function run() {
  const raw = JSON.parse(fs.readFileSync(path.join(__dirname, '../business-leads-output/maps-raw.json'), 'utf8'));
  const byName = new Map();
  for (const r of raw) {
    byName.set((r.business_name || '').trim().toLowerCase(), r);
  }

  const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  await client.connect();

  const { rows: orphans } = await client.query(
    'SELECT c.id, c.name FROM companies c LEFT JOIN locations l ON l.company_id = c.id WHERE l.id IS NULL ORDER BY c.id'
  );
  console.log('Orphaned companies (no location):', orphans.length);

  let fixed = 0, notFound = 0, errors = 0;
  for (const c of orphans) {
    const r = byName.get(c.name.trim().toLowerCase());
    if (!r) {
      console.log('  Not in scrape data:', c.id, c.name);
      notFound++;
      continue;
    }
    try {
      await client.query(
        'INSERT INTO locations (company_id, address, suburb, city, state, postcode, latitude, longitude) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',
        [
          c.id,
          stripPrivate(r.address || '').trim(),
          (r.suburb || '').trim() || null,
          (r.suburb || '').trim() || null,
          (r.state || '').trim() || null,
          (r.postcode || '').trim(),
          r.latitude || null,
          r.longitude || null,
        ]
      );
      fixed++;
    } catch (e) {
      console.log('  Error:', c.name, e.message);
      errors++;
    }
  }

  console.log('Fixed:', fixed, '| Not found in scrape:', notFound, '| Errors:', errors);
  await client.end();
}

run().catch(e => { console.error(e.message); process.exit(1); });
