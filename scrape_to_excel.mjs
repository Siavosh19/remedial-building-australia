// Post-process scraped business JSON (/tmp/scrape/cat-*.json) → dedupe vs the live
// directory + geocode + write one Excel per category to ~/Desktop/RBA_New_Businesses.
import { PrismaClient } from '@prisma/client';
import xlsx from 'xlsx'; import os from 'os'; import fs from 'fs'; import path from 'path';
import coords from './lib/au-postcode-coords.json' with { type: 'json' };
const prisma = new PrismaClient({ datasources: { db: { url: process.env.DIRECT_URL } } });

const domain = (u) => (u || '').replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0].toLowerCase().trim();
const normName = (s) => (s || '').toLowerCase().replace(/\b(pty|ltd|the|group|services|australia|au)\b/g, '').replace(/[^a-z0-9]/g, '');
const geo = (sub, st, pc) => {
  const h = (sub && st && coords.bySuburbState[`${String(sub).toUpperCase()}|${String(st).toUpperCase()}`]) || (pc && coords.byPostcode[String(pc).trim()]);
  return h ? { lat: h[0], lng: h[1] } : { lat: '', lng: '' };
};

// 1) Load existing directory for dedup (name + website domain)
const existing = await prisma.company.findMany({ select: { id: true, name: true, website: true } });
const existDom = new Map(); const existName = new Map();
for (const c of existing) {
  const d = domain(c.website); if (d) existDom.set(d, c);
  const n = normName(c.name); if (n.length >= 4) existName.set(n, c);
}
console.log('loaded', existing.length, 'existing companies for dedup');

// 2) Read scraped files from the DURABLE store (survives /tmp clearing)
const outDir = path.join(os.homedir(), 'Desktop', 'RBA_New_Businesses_From_Web');
const srcDir = path.join(outDir, '_source_json');
fs.mkdirSync(srcDir, { recursive: true });
const files = fs.readdirSync(srcDir).filter((f) => /^cat-\d+\.json$/.test(f));

const safe = (s) => s.replace(/[\/\\:*?"<>|]/g, '-').replace(/\s+/g, ' ').trim().slice(0, 60);
let totalFound = 0, totalNew = 0; const summary = [];

for (const f of files.sort()) {
  let data;
  try { data = JSON.parse(fs.readFileSync(path.join(srcDir, f), 'utf8')); } catch { console.log('SKIP bad JSON', f); continue; }
  const cat = data.categoryName || f;
  const rows = (data.businesses || []).map((b) => {
    const d = domain(b.website); const nn = normName(b.name);
    const dup = (d && existDom.get(d)) || (nn.length >= 4 && existName.get(nn)) || null;
    const g = geo(b.suburb, b.state, b.postcode);
    return {
      'Business Name': b.name || '', 'Category (suggested)': cat,
      'State': b.state || '', 'Suburb': b.suburb || '', 'Postcode': b.postcode || '',
      'Address': b.address || '', 'Phone': b.phone || '', 'Email': b.email || '',
      'Website': b.website || '', 'ABN': b.abn || '',
      'Description': b.description || '', 'Services': b.services || '', 'Service Areas': b.service_areas || '',
      'Lat': g.lat, 'Lng': g.lng, 'Source': b.source_url || '',
      'Already in directory?': dup ? `YES (#${dup.id} ${dup.name})` : 'No — NEW',
    };
  });
  const newN = rows.filter((r) => r['Already in directory?'] === 'No — NEW').length;
  totalFound += rows.length; totalNew += newN;
  summary.push({ Category: cat, Found: rows.length, New: newN, Existing: rows.length - newN });

  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.json_to_sheet(rows);
  ws['!cols'] = [{wch:38},{wch:40},{wch:6},{wch:16},{wch:9},{wch:34},{wch:16},{wch:28},{wch:34},{wch:15},{wch:55},{wch:40},{wch:34},{wch:10},{wch:10},{wch:34},{wch:30}];
  xlsx.utils.book_append_sheet(wb, ws, safe(cat).slice(0, 28) || 'Category');
  xlsx.writeFile(wb, path.join(outDir, `${String(data.categoryId).padStart(4,'0')}_${safe(cat)}.xlsx`));
}

// 3) Summary workbook
const swb = xlsx.utils.book_new();
const sws = xlsx.utils.json_to_sheet(summary.sort((a,b)=>b.New-a.New));
sws['!cols'] = [{wch:50},{wch:8},{wch:8},{wch:10}];
xlsx.utils.book_append_sheet(swb, sws, 'Summary');
xlsx.writeFile(swb, path.join(outDir, '_SUMMARY.xlsx'));

console.log(`\nWROTE ${files.length} category files + _SUMMARY.xlsx to ${outDir}`);
console.log(`TOTAL found: ${totalFound} | NEW (not in directory): ${totalNew} | already-in: ${totalFound - totalNew}`);
await prisma.$disconnect();
