/**
 * Enhanced lookup for the ~6,900 businesses that have no description yet.
 * Strategy per business (in order):
 *   1. Retry website /about, /about-us, /services subpages (many sites block homepage)
 *   2. Bing search snippet  → most permissive search engine for scraping
 *   3. localsearch.com.au
 *   4. hipages.com.au (trades-focused)
 *   5. Yellow Pages AU (already tried, retry with exact name+state)
 *
 * 3 concurrent workers, saves every 400 rows.
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
const SAVE_EVERY  = 50;

// ── HTTP fetch ────────────────────────────────────────────────────────────────
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
        'User-Agent':      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-AU,en;q=0.9',
        'Accept-Encoding': 'identity',
        'Cache-Control':   'no-cache',
        'Connection':      'close',
        ...(opts.headers || {}),
      },
    }, res => {
      if ([301,302,303,307,308].includes(res.statusCode) && res.headers.location && redirectsLeft > 0) {
        try {
          const next = new URL(res.headers.location, rawUrl).toString();
          return resolve(fetch(next, opts, redirectsLeft - 1));
        } catch { return resolve({ status: res.statusCode, body: '' }); }
      }
      const httpStatus = res.statusCode;
      let body = '';
      res.setEncoding('utf8');
      res.on('data', chunk => { body += chunk; if (body.length > 200000) req.destroy(); });
      res.on('end',   () => resolve({ status: httpStatus, body }));
      res.on('error', () => resolve({ status: httpStatus || 200, body }));
    });
    req.on('error',   () => resolve({ status: 0, body: '' }));
    req.on('timeout', () => { req.destroy(); resolve({ status: 0, body: '' }); });
    req.setTimeout(TIMEOUT_MS);
    req.end();
  });
}

function stripTags(s) { return s.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim(); }
function decodeEntities(s) {
  return s.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"')
          .replace(/&#x27;/g,"'").replace(/&apos;/g,"'").replace(/&#(\d+);/g,(_,n)=>String.fromCharCode(+n))
          .replace(/&\w+;/g,' ');
}
function clean(s) { return decodeEntities(stripTags(s)).replace(/\s+/g,' ').trim(); }

const GARBAGE = [
  'bot verification','account suspended','index of /','domain parked','dreamhost','godaddy',
  'web hosting','under construction','coming soon','forbidden','403','404','not found',
  'just a moment','cloudflare','captcha','please enable javascript','ebay','amazon',
  'parked domain','domain for sale','buy this domain','attract more customers',
  'website is currently','lorem ipsum','sign in','log in','login','register',
  'slot','casino','poker','gambling','betting',
];
function isGarbage(s) {
  if (!s || s.length < 20) return true;
  const low = s.toLowerCase();
  return GARBAGE.some(g => low.includes(g));
}

// ── Extract from website HTML ─────────────────────────────────────────────────
function extractFromWebsite(html) {
  if (!html) return '';
  const ogDesc = html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']{20,500})["']/i)
               || html.match(/<meta[^>]+content=["']([^"']{20,500})["'][^>]+property=["']og:description["']/i);
  if (ogDesc?.[1]) { const v = clean(ogDesc[1]).slice(0,250); if (!isGarbage(v)) return v; }

  const metaDesc = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']{20,500})["']/i)
                 || html.match(/<meta[^>]+content=["']([^"']{20,500})["'][^>]+name=["']description["']/i);
  if (metaDesc?.[1]) { const v = clean(metaDesc[1]).slice(0,250); if (!isGarbage(v)) return v; }

  const h1Match = html.match(/<h1[^>]*>([\s\S]{5,200}?)<\/h1>/i);
  if (h1Match) {
    const h1 = clean(h1Match[1]).slice(0,100);
    const afterH1 = html.slice(html.indexOf(h1Match[0]));
    const pMatch = afterH1.match(/<p[^>]*>([\s\S]{30,500}?)<\/p>/i);
    if (pMatch) { const v = (h1+' — '+clean(pMatch[1])).slice(0,250); if (!isGarbage(v)) return v; }
    if (h1 && !isGarbage(h1) && h1.length > 15) return h1;
  }

  const pMatches = [...html.matchAll(/<p[^>]*>([\s\S]{40,600}?)<\/p>/gi)];
  for (const m of pMatches.slice(0,5)) {
    const v = clean(m[1]).slice(0,250);
    if (!isGarbage(v) && v.length > 40) return v;
  }
  return '';
}

// ── Retry website with subpages ───────────────────────────────────────────────
async function retryWebsiteSubpages(website) {
  if (!website) return '';
  let base;
  try {
    let u = website.trim();
    if (!/^https?:\/\//i.test(u)) u = 'https://' + u;
    base = new URL(u);
  } catch { return ''; }

  const subpages = ['/about', '/about-us', '/about-us/', '/about/', '/services', '/services/', '/our-services', '/who-we-are', '/company'];
  for (const page of subpages) {
    try {
      const url = base.protocol + '//' + base.hostname + page;
      const { status, body } = await fetch(url);
      if (body && (status === 0 || (status >= 200 && status < 400))) {
        const result = extractFromWebsite(body);
        if (result && !isGarbage(result)) return result;
      }
    } catch { /* skip */ }
  }
  return '';
}

// ── Bing search snippet ───────────────────────────────────────────────────────
async function bingSearch(name, suburb, state) {
  const q = encodeURIComponent(`"${name}" ${suburb || ''} ${state || ''} Australia`);
  const url = `https://www.bing.com/search?q=${q}&setlang=en-AU&cc=AU`;
  const { body } = await fetch(url, {
    headers: {
      'Accept-Language': 'en-AU,en;q=0.9',
      'Referer': 'https://www.bing.com/',
    }
  });
  if (!body) return '';

  // Bing puts result descriptions in various containers
  const patterns = [
    /<p\s+class="b_lineclamp[^"]*"[^>]*>([\s\S]{30,400}?)<\/p>/gi,
    /<div\s+class="b_caption[^"]*"[^>]*>[\s\S]*?<p[^>]*>([\s\S]{30,400}?)<\/p>/gi,
    /<span\s+class="b_algo_slim_sum[^"]*"[^>]*>([\s\S]{30,300}?)<\/span>/gi,
    /<div\s+class="b_snippet[^"]*"[^>]*>([\s\S]{30,400}?)<\/div>/gi,
    /<p\s+class="b_para[^"]*"[^>]*>([\s\S]{30,400}?)<\/p>/gi,
  ];

  for (const re of patterns) {
    for (const m of [...body.matchAll(re)].slice(0,3)) {
      const v = clean(m[1]).slice(0,250);
      if (!isGarbage(v) && v.length > 30) return v;
    }
  }

  // Fallback: any <p> inside a result block
  const resultBlock = body.match(/<ol\s+id="b_results"[^>]*>([\s\S]{0,5000})/i);
  if (resultBlock) {
    const pMatch = resultBlock[1].match(/<p[^>]*>([\s\S]{40,400}?)<\/p>/i);
    if (pMatch) {
      const v = clean(pMatch[1]).slice(0,250);
      if (!isGarbage(v)) return v;
    }
  }
  return '';
}

// ── Google search snippet (fallback, use sparingly) ───────────────────────────
async function googleSearch(name, suburb, state) {
  const q = encodeURIComponent(`"${name}" ${suburb || ''} ${state || ''} Australia building`);
  const url = `https://www.google.com/search?q=${q}&hl=en&gl=au&num=3`;
  const { body } = await fetch(url, {
    headers: {
      'Accept-Language': 'en-AU,en;q=0.9',
      'Referer': 'https://www.google.com/',
    }
  });
  if (!body) return '';

  // Google result snippets
  const patterns = [
    /<div\s+class="[^"]*VwiC3b[^"]*"[^>]*>([\s\S]{30,400}?)<\/div>/gi,
    /<span\s+class="[^"]*aCOpRe[^"]*"[^>]*>([\s\S]{30,400}?)<\/span>/gi,
    /<div\s+class="[^"]*s3v9rd[^"]*"[^>]*>([\s\S]{30,400}?)<\/div>/gi,
  ];
  for (const re of patterns) {
    for (const m of [...body.matchAll(re)].slice(0,3)) {
      const v = clean(m[1]).slice(0,250);
      if (!isGarbage(v) && v.length > 30) return v;
    }
  }
  return '';
}

// ── localsearch.com.au ────────────────────────────────────────────────────────
async function localSearch(name, suburb, state) {
  const q   = encodeURIComponent(name);
  const loc = encodeURIComponent((suburb || '') + ' ' + (state || ''));
  const url = `https://www.localsearch.com.au/find/${q}/${loc}`;
  const { body } = await fetch(url);
  if (!body) return '';

  const patterns = [
    /class="[^"]*business-description[^"]*"[^>]*>([\s\S]{20,400}?)<\/(?:p|div|span)>/i,
    /class="[^"]*description[^"]*"[^>]*>([\s\S]{20,300}?)<\/(?:p|div|span)>/i,
    /class="[^"]*listing-blurb[^"]*"[^>]*>([\s\S]{20,300}?)<\/(?:p|div|span)>/i,
  ];
  for (const p of patterns) {
    const m = body.match(p);
    if (m) { const v = clean(m[1]).slice(0,250); if (!isGarbage(v)) return v; }
  }
  return '';
}

// ── hipages.com.au ────────────────────────────────────────────────────────────
async function hiPages(name, suburb, state) {
  const q = encodeURIComponent(name + ' ' + (suburb || '') + ' ' + (state || ''));
  const url = `https://hipages.com.au/find/${encodeURIComponent(name.toLowerCase().replace(/\s+/g,'-'))}`;
  const { body } = await fetch(url);
  if (!body) return '';
  const m = body.match(/class="[^"]*description[^"]*"[^>]*>([\s\S]{20,400}?)<\/(?:p|div|span)>/i)
           || body.match(/class="[^"]*about[^"]*"[^>]*>([\s\S]{20,400}?)<\/(?:p|div|span)>/i);
  if (m) { const v = clean(m[1]).slice(0,250); if (!isGarbage(v)) return v; }
  return '';
}

// ── Yellow Pages retry with name+state ───────────────────────────────────────
async function yellowPages(name, state) {
  const clue = encodeURIComponent(name);
  const loc  = encodeURIComponent(state || 'Australia');
  const url  = `https://www.yellowpages.com.au/search/listings?clue=${clue}&locationClue=${loc}&lat=&lon=`;
  const { body } = await fetch(url);
  if (!body) return '';
  const patterns = [
    /class="[^"]*listing-summary[^"]*"[^>]*>([\s\S]{20,400}?)<\/(?:span|p|div)>/i,
    /class="[^"]*description[^"]*"[^>]*>([\s\S]{20,400}?)<\/(?:p|div|span)>/i,
  ];
  for (const p of patterns) {
    const m = body.match(p);
    if (m) { const v = clean(m[1]).slice(0,250); if (!isGarbage(v)) return v; }
  }
  return '';
}

// ── Per-row lookup ────────────────────────────────────────────────────────────
async function lookupBusiness(name, suburb, state, website) {
  // 1. Retry website subpages
  if (website && website.trim()) {
    const result = await retryWebsiteSubpages(website.trim());
    if (result && !isGarbage(result)) return result;
  }

  // 2. Bing search
  const bing = await bingSearch(name, suburb, state);
  if (bing && !isGarbage(bing)) return bing;

  // 3. localsearch.com.au
  const ls = await localSearch(name, suburb, state);
  if (ls && !isGarbage(ls)) return ls;

  // 4. Yellow Pages retry
  const yp = await yellowPages(name, state);
  if (yp && !isGarbage(yp)) return yp;

  // 5. Google (last resort — may get blocked)
  const google = await googleSearch(name, suburb, state);
  if (google && !isGarbage(google)) return google;

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

  const cols    = Object.keys(rows[0]);
  const results = new Array(rows.length).fill(undefined);
  let done = 0, filled = 0, lastSave = 0;

  function saveFile() {
    rows.forEach((row, i) => {
      if (results[i] !== undefined && typeof results[i] === 'string') {
        row['Verified Business Type (Web)'] = results[i];
      }
    });
    const reordered = rows.map(row => {
      const obj = {};
      cols.forEach(k => { obj[k] = row[k] ?? ''; });
      return obj;
    });
    const wsNew = XLSX.utils.json_to_sheet(reordered);
    const colWidths = {};
    reordered.forEach(row => {
      Object.keys(row).forEach(k => {
        colWidths[k] = Math.max(colWidths[k] || k.length, String(row[k]||'').length);
      });
    });
    wsNew['!cols'] = cols.map(k => ({ wch: Math.min(colWidths[k]||10, 80) }));
    const wbNew = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wbNew, wsNew, 'Directory');
    XLSX.writeFile(wbNew, FILE);
  }

  // Only process rows without a description
  const tasks = rows.map((row, i) => async () => {
    if ((row['Verified Business Type (Web)'] || '').trim()) {
      results[i] = undefined;
      return undefined;
    }
    const val = await lookupBusiness(
      row['name']    || '',
      row['suburb']  || '',
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
      process.stdout.write(`\r  ${done}/${rows.length} processed  |  ${filled} new filled`);
    }
    if (done - lastSave >= SAVE_EVERY) {
      saveFile();
      lastSave = done;
      console.log(`\n  Saved: ${done}/${rows.length}  |  ${filled} new filled so far`);
    }
  });

  saveFile();
  console.log(`\nDone. New descriptions filled: ${filled}`);
  console.log(`Saved to: ${FILE}`);
}

main().catch(e => { console.error(e); process.exit(1); });
