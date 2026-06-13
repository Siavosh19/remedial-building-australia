/**
 * Reorganise the directory Excel:
 *  1. Rows WITH a "Verified Business Type (Web)" value → top
 *  2. One blank divider row
 *  3. Rows WITHOUT a value → bottom
 * Preserves all other columns and data exactly.
 */

const XLSX = require('xlsx');
const path = require('path');
const os   = require('os');

const FILE = path.join(os.homedir(), 'Desktop', 'RBA_Directory_2026-06-12.xlsx');

const wb   = XLSX.readFile(FILE);
const ws   = wb.Sheets[wb.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });

console.log(`Loaded ${rows.length} rows`);

const withDesc    = rows.filter(r => (r['Verified Business Type (Web)'] || '').trim());
const withoutDesc = rows.filter(r => !(r['Verified Business Type (Web)'] || '').trim());

console.log(`  With description:    ${withDesc.length}`);
console.log(`  Without description: ${withoutDesc.length}`);

// Build column order — keep original key order
const allKeys = Object.keys(rows[0]);

// Divider row: blank everything, mark divider column for visibility
const divider = {};
allKeys.forEach(k => { divider[k] = ''; });
divider['name'] = '──────────────── NO DESCRIPTION BELOW ────────────────';

const reordered = [...withDesc, divider, ...withoutDesc];

const wsNew = XLSX.utils.json_to_sheet(reordered, { header: allKeys });

// Column widths
const colWidths = {};
reordered.forEach(row => {
  allKeys.forEach(k => {
    colWidths[k] = Math.max(colWidths[k] || k.length, String(row[k] || '').length);
  });
});
wsNew['!cols'] = allKeys.map(k => ({ wch: Math.min(colWidths[k] || 10, 80) }));

const wbNew = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wbNew, wsNew, 'Directory');
XLSX.writeFile(wbNew, FILE);

console.log(`Done. Saved to: ${FILE}`);
console.log(`Row order: ${withDesc.length} filled → 1 divider → ${withoutDesc.length} empty`);
