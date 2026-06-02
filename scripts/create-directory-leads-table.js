require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

const sql = `
CREATE TABLE IF NOT EXISTS directory_leads (
  id                            SERIAL PRIMARY KEY,
  google_place_id               TEXT NOT NULL UNIQUE,
  business_name                 TEXT NOT NULL,
  phone                         TEXT,
  website                       TEXT,
  email                         TEXT,
  address                       TEXT,
  suburb                        TEXT,
  state                         "LocationState",
  postcode                      TEXT,
  latitude                      DOUBLE PRECISION,
  longitude                     DOUBLE PRECISION,
  google_maps_url               TEXT,
  google_rating                 DOUBLE PRECISION,
  google_review_count           INTEGER,
  category_id                   INTEGER REFERENCES categories(id),
  subcategory_id                INTEGER REFERENCES categories(id),
  category_name                 TEXT,
  subcategory_name              TEXT,
  search_query                  TEXT,
  status                        TEXT NOT NULL DEFAULT 'unverified',
  approved_for_public_directory BOOLEAN NOT NULL DEFAULT false,
  website_scraped               BOOLEAN NOT NULL DEFAULT false,
  website_scrape_error          TEXT,
  notes                         TEXT,
  collected_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at                    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS directory_leads_status_idx       ON directory_leads(status);
CREATE INDEX IF NOT EXISTS directory_leads_category_idx     ON directory_leads(category_id);
CREATE INDEX IF NOT EXISTS directory_leads_subcategory_idx  ON directory_leads(subcategory_id);
CREATE INDEX IF NOT EXISTS directory_leads_state_idx        ON directory_leads(state);
CREATE INDEX IF NOT EXISTS directory_leads_collected_at_idx ON directory_leads(collected_at);
`;

async function main() {
  const client = new Client({ connectionString: process.env.DIRECT_URL });
  await client.connect();
  try {
    await client.query(sql);
    console.log('✓ directory_leads table created (or already exists)');
  } finally {
    await client.end();
  }
}

main().catch(err => { console.error(err); process.exit(1); });
