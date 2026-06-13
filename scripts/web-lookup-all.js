/**
 * Proper web lookup for each business.
 * Priority:
 *   1. Fetch the business's own website — extract og:description, meta description,
 *      h1 + first paragraph, or any meaningful page text.
 *   2. Search Yellow Pages Australia for businesses without a website or whose site failed.
 * 3 concurrent workers, saves every 100 rows.
 */

require('dotenv').config({ path: '.env.local' });
const https  = require('https');
const http   = require('http');
const XLSX   = require('xlsx');
const path   = require('path');
const os     = require('os');

const FILE        = path.join(os.homedir(), 'Desktop', 'RBA_Directory_2026-06-12.xlsx');
const CONCURRENCY = 3;
const TIMEOUT_MS  = 15000;
const SAVE_EVERY  = 400;

// ── HTTP fetch with redirect following ───────────────────────────────────────
function fetch(rawUrl, opts = {}, redirectsLeft = 5) {
  return new Promise(resolve => {
    let url;
    try {
      let u = (rawUrl || '').trim();
      if (!u) return resolve({ status: 0, body: '' });
      if (!/^https?:\/\//i.test(u)) u = 'https://' + u;
      url = new URL(u);
    } catch { return resolve({ status: 0, body: '' }); }

    const lib = url.protocol === 'https:' ? https : http;
    const req = lib.request({
      hostname: url.hostname,
      port:     url.port || (url.protocol === 'https:' ? 443 : 80),
      path:     url.pathname + url.search,
      method:   'GET',
      timeout:  TIMEOUT_MS,
      headers: {
        'User-Agent':       'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept':           'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language':  'en-AU,en;q=0.9',
        'Accept-Encoding':  'identity',
        'Cache-Control':    'no-cache',
        'Connection':       'close',
        ...(opts.headers || {}),
      },
    }, res => {
      // Follow redirects
      if ([301,302,303,307,308].includes(res.statusCode) && res.headers.location && redirectsLeft > 0) {
        try {
          const next = new URL(res.headers.location, rawUrl).toString();
          return resolve(fetch(next, opts, redirectsLeft - 1));
        } catch { return resolve({ status: res.statusCode, body: '' }); }
      }
      const httpStatus = res.statusCode;
      let body = '';
      res.setEncoding('utf8');
      res.on('data', chunk => {
        body += chunk;
        if (body.length > 200000) req.destroy(); // cap at 200KB — error fires but body is good
      });
      res.on('end',   () => resolve({ status: httpStatus, body }));
      res.on('error', () => resolve({ status: httpStatus || 200, body })); // keep real status even after destroy
    });
    req.on('error',   () => resolve({ status: 0, body: '' }));
    req.on('timeout', () => { req.destroy(); resolve({ status: 0, body: '' }); });
    req.setTimeout(TIMEOUT_MS);
    req.end();
  });
}

// ── Strip HTML tags ───────────────────────────────────────────────────────────
function stripTags(s) {
  return s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}
function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .replace(/&\w+;/g, ' ');
}
function clean(s) {
  return decodeEntities(stripTags(s)).replace(/\s+/g, ' ').trim();
}

// ── Garbage detector ─────────────────────────────────────────────────────────
const GARBAGE = [
  'bot verification', 'account suspended', 'index of /', 'domain parked',
  'dreamhost', 'godaddy', 'web hosting', 'under construction', 'coming soon',
  'forbidden', '403', '404', 'not found', 'error', 'access denied',
  'just a moment', 'cloudflare', 'captcha', 'please enable javascript',
  'ebay', 'amazon', 'facebook.com', 'youtube.com',
  'parked domain', 'this domain', 'domain for sale', 'buy this domain',
  'attract more customers', 'add more content', 'website is currently',
];
function isGarbage(s) {
  if (!s || s.length < 20) return true;
  const low = s.toLowerCase();
  return GARBAGE.some(g => low.includes(g));
}

// ── Extract meaningful description from website HTML ─────────────────────────
function extractFromWebsite(html, siteName) {
  if (!html) return '';

  // 1. og:description
  const ogDesc = html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']{20,500})["']/i)
               || html.match(/<meta[^>]+content=["']([^"']{20,500})["'][^>]+property=["']og:description["']/i);
  if (ogDesc?.[1]) {
    const v = clean(ogDesc[1]).slice(0, 250);
    if (!isGarbage(v)) return v;
  }

  // 2. meta description
  const metaDesc = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']{20,500})["']/i)
                 || html.match(/<meta[^>]+content=["']([^"']{20,500})["'][^>]+name=["']description["']/i);
  if (metaDesc?.[1]) {
    const v = clean(metaDesc[1]).slice(0, 250);
    if (!isGarbage(v)) return v;
  }

  // 3. First h1 + first <p> after it
  const h1Match = html.match(/<h1[^>]*>([\s\S]{5,200}?)<\/h1>/i);
  if (h1Match) {
    const h1 = clean(h1Match[1]).slice(0, 100);
    // try to find a paragraph near the h1
    const afterH1 = html.slice(html.indexOf(h1Match[0]));
    const pMatch = afterH1.match(/<p[^>]*>([\s\S]{30,500}?)<\/p>/i);
    if (pMatch) {
      const combined = (h1 + ' — ' + clean(pMatch[1])).slice(0, 250);
      if (!isGarbage(combined)) return combined;
    }
    if (h1 && !isGarbage(h1) && h1.length > 10) return h1;
  }

  // 4. First non-trivial <p>
  const pMatches = [...html.matchAll(/<p[^>]*>([\s\S]{40,600}?)<\/p>/gi)];
  for (const m of pMatches.slice(0, 5)) {
    const v = clean(m[1]).slice(0, 250);
    if (!isGarbage(v) && v.length > 40) return v;
  }

  return '';
}

// ── Yellow Pages AU search ────────────────────────────────────────────────────
async function yellowPagesSearch(name, state) {
  const clue  = encodeURIComponent(name);
  const loc   = encodeURIComponent(state || 'Australia');
  const url   = `https://www.yellowpages.com.au/search/listings?clue=${clue}&locationClue=${loc}&lat=&lon=`;
  const { body } = await fetch(url);
  if (!body) return '';

  // YP listing descriptions are in <span class="listing-summary"> or similar
  const patterns = [
    /class="[^"]*listing-summary[^"]*"[^>]*>([\s\S]{20,400}?)<\/span>/i,
    /class="[^"]*description[^"]*"[^>]*>([\s\S]{20,400}?)<\/(?:p|div|span)>/i,
    /class="[^"]*summary[^"]*"[^>]*>([\s\S]{20,400}?)<\/(?:p|div|span)>/i,
    /<p[^>]*class="[^"]*listing[^"]*"[^>]*>([\s\S]{20,300}?)<\/p>/i,
  ];
  for (const pat of patterns) {
    const m = body.match(pat);
    if (m) {
      const v = clean(m[1]).slice(0, 250);
      if (!isGarbage(v)) return v;
    }
  }

  // Fallback: first result title + category from YP
  const titleMatch = body.match(/class="[^"]*listing-name[^"]*"[^>]*>([\s\S]{5,150}?)<\//i);
  const catMatch   = body.match(/class="[^"]*listing-categories[^"]*"[^>]*>([\s\S]{5,100}?)<\//i);
  if (titleMatch && catMatch) {
    const v = (clean(titleMatch[1]) + ' — ' + clean(catMatch[1])).slice(0, 200);
    if (!isGarbage(v)) return v;
  }

  return '';
}

// ── True Local AU search (fallback) ──────────────────────────────────────────
async function trueLocalSearch(name, state) {
  const q   = encodeURIComponent(name);
  const loc = encodeURIComponent(state || 'Australia');
  const url = `https://www.truelocal.com.au/search?what=${q}&where=${loc}`;
  const { body } = await fetch(url);
  if (!body) return '';

  const m = body.match(/class="[^"]*business-description[^"]*"[^>]*>([\s\S]{20,400}?)<\/(?:p|div|span)>/i)
         || body.match(/class="[^"]*description[^"]*"[^>]*>([\s\S]{20,300}?)<\/(?:p|div|span)>/i);
  if (m) {
    const v = clean(m[1]).slice(0, 250);
    if (!isGarbage(v)) return v;
  }
  return '';
}

// ── Per-row lookup ────────────────────────────────────────────────────────────
async function lookupBusiness(name, state, website) {
  // 1. Try the business's own website
  if (website && website.trim()) {
    const { status, body } = await fetch(website.trim());
    if (body && (status === 0 || (status >= 200 && status < 400))) {
      const result = extractFromWebsite(body, name);
      if (result && !isGarbage(result)) return result;
    }
    // Try HTTP if HTTPS failed
    if (website.startsWith('https://')) {
      const { status: s2, body: b2 } = await fetch(website.replace('https://', 'http://'));
      if (b2 && (s2 === 0 || (s2 >= 200 && s2 < 400))) {
        const result = extractFromWebsite(b2, name);
        if (result && !isGarbage(result)) return result;
      }
    }
  }

  // 2. Yellow Pages Australia
  const yp = await yellowPagesSearch(name, state);
  if (yp && !isGarbage(yp)) return yp;

  // 3. True Local
  const tl = await trueLocalSearch(name, state);
  if (tl && !isGarbage(tl)) return tl;

  return '';
}

// ── Concurrency runner ────────────────────────────────────────────────────────
async function runConcurrent(tasks, concurrency, onDone) {
  let idx = 0;
  async function worker() {
    while (idx < tasks.length) {
      const i = idx++;
      let result = '';
      try { result = await tasks[i](); } catch { result = ''; }
      onDone(i, result);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const wb   = XLSX.readFile(FILE);
  const ws   = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });
  console.log(`Loaded ${rows.length} rows`);

  const priority = ['id','name','category','Trade (from Name)','Verified Business Type (Web)'];
  const rest      = Object.keys(rows[0]).filter(k => !priority.includes(k));
  const ordered   = [...priority, ...rest];

  const results  = new Array(rows.length).fill(undefined);
  let done       = 0;
  let filled     = 0;
  let lastSave   = 0;

  function saveFile() {
    rows.forEach((row, i) => {
      // undefined = skip row (already filled or not yet processed); only write strings
      if (results[i] !== undefined && typeof results[i] === 'string') {
        row['Verified Business Type (Web)'] = results[i];
      }
    });
    const reordered = rows.map(row => {
      const obj = {};
      ordered.forEach(k => { obj[k] = row[k] ?? ''; });
      return obj;
    });
    const wsNew = XLSX.utils.json_to_sheet(reordered);
    const colWidths = {};
    reordered.forEach(row => {
      Object.keys(row).forEach(k => {
        colWidths[k] = Math.max(colWidths[k] || k.length, String(row[k]||'').length);
      });
    });
    wsNew['!cols'] = ordered.map(k => ({ wch: Math.min(colWidths[k]||10, 80) }));
    const wbNew = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wbNew, wsNew, 'Directory');
    XLSX.writeFile(wbNew, FILE);
  }

  const tasks = rows.map((row, i) => async () => {
    // Skip rows already filled
    if ((row['Verified Business Type (Web)'] || '').trim()) {
      results[i] = undefined; // keep existing
      return undefined;
    }
    const val = await lookupBusiness(
      row['name']    || '',
      row['state']   || '',
      row['website'] || ''
    );
    results[i] = val;
    return val;
  });

  await runConcurrent(tasks, CONCURRENCY, (i, result) => {
    done++;
    if (result) filled++;
    if (done % 50 === 0) {
      process.stdout.write(`\r  ${done}/${rows.length} processed  |  ${filled} filled`);
    }
    if (done - lastSave >= SAVE_EVERY) {
      saveFile();
      lastSave = done;
      console.log(`\n  Saved: ${done}/${rows.length}  |  ${filled} filled so far`);
    }
  });

  saveFile();
  console.log(`\nDone. Filled: ${filled} / ${rows.length}`);
  console.log(`Saved to: ${FILE}`);
}

main().catch(e => { console.error(e); process.exit(1); });
