/**
 * One-off: fix suburb extraction and remove false-positive emails in maps-raw.json,
 * then re-upsert all records to the DB.
 */
'use strict';
require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const fs   = require('fs');
const path = require('path');

const prisma  = new PrismaClient();
const RAW     = path.join(__dirname, '..', 'business-leads-output', 'maps-raw.json');

const BAD_SKIP   = ['example.', 'domain.com', 'sentry.', 'cloudflare', 'wix.', 'wordpress.',
                    'schema.org', 'w3.org', 'youremail', 'email.com', 'test.com', 'mailchimp',
                    'sendgrid', 'amazonaws', 'google.com', 'apple.com'];
const IMG_EXT    = /\.(png|jpg|jpeg|gif|svg|webp|ico|bmp)$/i;

function fixSuburb(address) {
  if (!address) return null;
  for (const part of address.split(',').map(p => p.trim())) {
    const m = part.match(/^(.+?)\s+(NSW|VIC|QLD|WA|SA|TAS|ACT|NT)\s+\d{4}$/);
    if (m) return m[1].trim();
  }
  return null;
}

function fixEmail(email) {
  if (!email) return null;
  const e = email.toLowerCase();
  if (BAD_SKIP.some(s => e.includes(s))) return null;
  if (IMG_EXT.test(e)) return null;
  return email;
}

async function main() {
  const records = JSON.parse(fs.readFileSync(RAW, 'utf8'));
  let fixed = 0;

  for (const r of records) {
    const newSuburb = fixSuburb(r.address);
    const newEmail  = fixEmail(r.email);
    if (newSuburb !== r.suburb || newEmail !== r.email) {
      r.suburb = newSuburb;
      r.email  = newEmail;
      fixed++;
    }
  }

  fs.writeFileSync(RAW, JSON.stringify(records, null, 2));
  console.log(`Fixed ${fixed} records in maps-raw.json`);

  // Re-upsert all to DB
  let updated = 0;
  for (const r of records) {
    await prisma.directoryLead.upsert({
      where:  { google_place_id: r.google_place_id },
      create: {
        google_place_id: r.google_place_id, business_name: r.business_name,
        phone: r.phone, website: r.website, email: r.email,
        address: r.address, suburb: r.suburb, state: r.state, postcode: r.postcode,
        google_maps_url: r.google_maps_url, google_rating: r.google_rating,
        category_id: r.category_id, subcategory_id: r.subcategory_id,
        category_name: r.category_name, subcategory_name: r.subcategory_name,
        search_query: r.search_query, status: 'unverified',
        approved_for_public_directory: false,
        website_scraped: r.website_scraped,
        notes: r.contact_url ? `Contact form: ${r.contact_url}` : null,
      },
      update: {
        email: r.email, suburb: r.suburb, updated_at: new Date(),
      },
    }).catch(() => null);
    updated++;
  }

  console.log(`Re-synced ${updated} records to directory_leads`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
