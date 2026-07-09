import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import type { LocationState } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { lookupSuburb, toStateCode, postcodeToState } from "@/lib/au-locations";
import { resolveAuLocation } from "@/lib/au-suburbs";

const PAGE_SIZE = 20;
const MATCH_CAP = 3000; // max rows pulled for in-memory relevance scoring

const VALID_STATES: LocationState[] = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];

const PROFILE_STATUS_RANK: Record<string, number> = {
  featured: 6,
  claimed: 5,
  practitioner_verified: 4,
  licence_verified: 3,
  business_verified: 2,
  contact_verified: 1,
  basic: 0,
};

// ─── Trust / completeness ───────────────────────────────────────────────────────

function trustBoost(row: {
  is_featured: boolean;
  confidence_score: number;
  is_claimed: boolean;
  profile_status: string;
}): number {
  return (
    (row.is_featured ? 30 : 0) +
    row.confidence_score * 0.2 +
    (row.is_claimed ? 10 : 0) +
    (PROFILE_STATUS_RANK[row.profile_status] ?? 0) * 3
  );
}

// Reward more complete profiles (a real description, a phone number).
function completenessBoost(row: { description: string | null; phone: string | null }): number {
  return (row.description && row.description.trim().length > 30 ? 12 : 0) + (row.phone ? 6 : 0);
}

// ─── Paid plan priority (future-ready, not faked) ───────────────────────────────
// Paid tiers should rank above free listings ONLY among results that already match
// relevance. This is the highest sort key, but it is gated on a GENUINELY ACTIVE
// paid plan (is_featured + unexpired featured_until). While no subscriptions are
// active, planRank returns 0 for everyone, so ranking is driven purely by
// relevance, location and trust — nothing is faked. Extend PLAN_PRIORITY later.
const PLAN_PRIORITY: Record<string, number> = {
  featured: 2, // Gold
  premium: 2,
  claimed: 1, // Silver
  business: 1,
  basic: 0, // Free
};

// Gold (featured) ranks above Silver (claimed) above Free (basic). plan_type is
// already gated on an active subscription — the Stripe webhook reverts a company
// to basic when its subscription expires — so we rank by it directly. This is the
// highest sort key, so Gold/Silver lead the (already state-filtered) results.
function planRank(row: { plan_type?: string | null }): number {
  return PLAN_PRIORITY[row.plan_type ?? "basic"] ?? 0;
}

// Membership visibility radius. Gold (featured) shows across the whole state; Silver
// (claimed) and Free (basic) are capped at this many km from the searched suburb.
// Keep this in sync with the plan cards and the marketing guide page.
const SILVER_FREE_RADIUS_KM = 50;

// ─── Synonym + typo-tolerant query analysis ─────────────────────────────────────
// Three things are handled here, in JS, before the Prisma WHERE clause is built:
//   (a) spelling mistakes / typos      → Levenshtein correction onto a vocabulary
//   (b) similar words / word families  → SYNONYM_GROUPS (treated as STRONG terms)
//   (c) related trades / intent        → CONCEPT_EXPANSIONS (treated as WEAK terms)
//                                        + CATEGORY_INTENT (maps a query to the
//                                          directory categories it should surface)
// STRONG terms score much higher than WEAK terms, so a query like "remedial
// builder" ranks actual remedial/facade/waterproofing businesses above a general
// builder or a lawyer that merely mentions "construction" in its description.
//
// To extend matching later, just add entries to the lists below.

const STOPWORDS = new Set([
  "building", "buildings", "service", "services", "management", "australia",
  "australian", "company", "companies", "group", "pty", "ltd", "the", "and",
  "for", "with", "our", "all", "new", "south", "wales", "victoria", "queensland",
  "near", "around",
]);

// Generic action verbs appear across every trade ("repair", "installation",
// "service"…), so they must NOT drive ranking or they pull in unrelated trades
// (a "window repair" search must not surface "Roofing Repairs"). These are demoted
// to WEAK and excluded from exact-category matching — the NOUN/MATERIAL leads.
const GENERIC_ACTIONS = new Set([
  "repair", "repairs", "repairing", "install", "installs", "installed",
  "installation", "installations", "installer", "installers",
  "replace", "replaced", "replacing", "replacement", "replacements",
  "service", "servicing", "maintenance", "maintaining",
  "fix", "fixing", "fixes", "supply", "supplies", "upgrade", "upgrades",
]);

const SYNONYM_GROUPS: string[][] = [
  ["consultant", "consultants", "consulting", "advisory", "adviser", "advisor", "surveyor", "surveying"],
  ["inspector", "inspection", "inspections", "assessment", "assessor"],
  ["cleaner", "cleaners", "cleaning", "washing", "hygiene"],
  ["waterproof", "waterproofing", "membrane", "membranes", "tanking"],
  ["seal", "sealing", "sealant", "sealants", "caulk", "caulking"],
  ["concrete", "concreting", "concreter", "concretor", "spalling", "carbonation"],
  ["remedial", "remediation", "restoration"],
  ["repair", "repairs"],
  ["engineer", "engineers", "engineering"],
  ["painter", "painters", "painting", "coating", "coatings", "recoating"],
  ["balcony", "balconies"],
  ["roof", "roofing", "roofer", "roofers"],
  ["plumber", "plumbers", "plumbing", "drainage", "drain"],
  ["facade", "cladding"],
  ["strata"],
  ["defect", "defects", "defective"],
  ["fire safety", "fire protection"],
  ["electrical", "electrician", "electricians"],
  ["scaffold", "scaffolding"],
  ["render", "rendering"],
  ["tiling", "tiles", "tile", "tiler", "tilers"],
  ["timber", "carpentry", "carpenter"],
  ["structural", "structure"],
  ["window", "windows", "glazier", "glazing", "glazed"],
  ["fire door", "fire doors", "firedoor", "fire-rated door", "fire rated door"],
  ["passive fire", "firestopping", "fire stopping", "fire stop", "intumescent", "penetration seal", "fire collar", "fireproofing"],
  ["leak", "leaks", "leaking"],
  ["balustrade", "balustrades", "handrail", "handrails", "balustrading"],
  ["crack", "cracks", "cracking"],
  ["brick", "bricks", "bricklayer", "bricklaying", "brickwork", "repointing", "pointing"],
  ["plaster", "plasterer", "plasterers", "plastering", "gyprock", "gyprocker", "gyprocking", "plasterboard", "cornice"],
  ["air conditioning", "air con", "aircon", "air conditioner", "hvac", "ducted", "refrigeration"],
];

// Directed concept / occupation expansions (WEAK related terms).
const CONCEPT_EXPANSIONS: Record<string, string[]> = {
  "remedial builder": ["building repair", "remediation", "facade repair", "concrete repair", "remedial"],
  "remedial building": ["building repair", "remediation", "facade repair", "concrete repair", "remedial"],
  builder: ["building repair", "remedial", "construction"],
  engineer: ["structural engineer", "civil engineer", "remedial consultant", "structural", "engineering"],
  engineering: ["structural engineer", "civil engineer", "structural"],
  "water leak": ["waterproofing", "leak detection", "membrane repair", "membrane"],
  leak: ["waterproofing", "leak detection", "membrane repair"],
  leaking: ["waterproofing", "leak detection", "membrane repair"],
  window: ["window contractor", "glazier", "aluminium windows", "window replacement", "glazing"],
  windows: ["window contractor", "glazier", "aluminium windows", "window replacement", "glazing"],
  glazier: ["window contractor", "glazing", "aluminium windows", "window replacement"],
  facade: ["facade repair", "cladding", "render"],
  concrete: ["concrete repair", "spalling", "concrete cancer"],
  "concrete cancer": ["concrete repair", "spalling", "carbonation", "remedial"],
  waterproofing: ["membrane", "tanking", "leak detection", "membrane repair"],
};

// Maps a user query (by substring) to the directory CATEGORIES it should surface.
// Category names must match the live category names exactly (case-insensitive).
// This is what makes "remedial builder" return the "Remedial & Facade Building"
// category strongly, even though those words never appear verbatim in the name.
type CategoryIntent = { patterns: string[]; categories: string[] };
const CATEGORY_INTENT: CategoryIntent[] = [
  {
    patterns: ["remedial builder", "remedial builders", "remedial contractor", "remedial contractors", "remedial construction", "remedial building", "remedial", "facade builder", "facade building"],
    categories: ["Building Contractor", "Facade Contractor", "Building Maintenance"],
  },
  {
    patterns: ["waterproofing", "waterproof", "water leak", "leaking balcony", "balcony leak", "leaking shower", "membrane", "tanking", "leak detection", "water ingress", "rising damp", "penetrating damp"],
    categories: ["Waterproofing"],
  },
  {
    patterns: ["facade", "façade", "cladding", "external wall", "external envelope", "render", "rendering"],
    categories: ["Facade Contractor", "Cladding", "Rendering & Coating"],
  },
  {
    patterns: ["engineer", "engineering", "structural engineer", "structural assessment", "structural", "civil engineer", "geotechnical"],
    categories: ["Engineering Services"],
  },
  {
    patterns: ["concrete repair", "spalling", "concrete cancer", "carbonation", "concrete remediation", "reinforcement corrosion"],
    categories: ["Building Contractor", "Concreter / Concreting Contractor"],
  },
  {
    patterns: ["concreter", "concretor", "concreting", "concrete placement"],
    categories: ["Concreter / Concreting Contractor"],
  },
  {
    patterns: ["roof leak", "roof repair", "roofing", "roof restoration", "roof leaks"],
    categories: ["Roofing & Restoration"],
  },
  {
    patterns: ["roof plumber", "roof plumbing", "box gutter", "gutter"],
    categories: ["Roofing & Restoration", "Gutter & Roof Repair & Cleaning"],
  },
  {
    patterns: ["strata manager", "strata management", "oc manager", "owners corporation", "body corporate", "strata"],
    categories: ["Strata Management"],
  },
  {
    patterns: ["builder", "building repair", "construction", "renovation", "renovations"],
    categories: ["Building Contractor", "Building Maintenance"],
  },
  {
    patterns: ["balustrade", "handrail", "balustrading"],
    categories: ["Balustrade"],
  },
  {
    // Passive fire protection (fire-stopping, penetrations, collars/dampers,
    // intumescent, fire-rated construction) — distinct from active fire (sprinklers/
    // alarms/extinguishers under "Fire Protection & Safety") and from fire doors.
    patterns: ["passive fire", "passive fire protection", "fire stopping", "firestopping", "fire-stopping", "fire stop", "intumescent", "penetration seal", "penetration sealing", "fire collar", "fire damper", "fireproofing", "fire proofing", "fire rated systems"],
    categories: ["Passive Fire Protection"],
  },
  {
    // Fire doors are a distinct fire-rated trade (AS 1905) — keep them out of the
    // general window/door bucket. Listed BEFORE the window intent; "fire door" never
    // matches the window patterns below, so the two stay cleanly separated.
    patterns: ["fire door", "fire doors", "firedoor", "fire-door", "fire-rated door", "fire rated door", "fire door installer", "fire door supplier", "fire door inspection", "fire door maintenance"],
    categories: ["Doors & Fire Doors"],
  },
  {
    patterns: ["window", "glazier", "glazing", "windows and doors", "window and door", "sliding door", "aluminium door", "timber door", "entry door"],
    categories: ["Glazing Works", "Window & Door Service", "Window & Door Supplier"],
  },
  {
    patterns: ["painter", "painting", "protective coating", "epoxy"],
    categories: ["Painting", "Coatings & Paint"],
  },
  {
    patterns: ["scaffold", "scaffolding"],
    categories: ["Scaffolding"],
  },
  {
    patterns: ["air conditioning", "air con", "aircon", "air conditioner", "hvac", "ducted air", "ducted heating", "split system", "heating and cooling", "refrigeration mechanic"],
    categories: ["Air Conditioning & HVAC Service"],
  },
  {
    patterns: ["plaster", "plasterer", "plasterers", "plastering", "gyprock", "gyprocker", "gyprocking", "plasterboard", "cornice", "wall lining", "ceiling lining"],
    categories: ["Plastering & Gyprock Service", "Rendering & Coating"],
  },
  {
    patterns: ["fire safety", "fire protection", "fire compliance"],
    categories: ["Fire Protection", "Fire Engineers and Safety Consultant"],
  },
];

// Extra known-good words the typo corrector can snap a misspelling onto.
const EXTRA_VOCAB = [
  "expansion", "joint", "joints", "rectification", "balcony", "stormwater",
  "epoxy", "grout", "grouting", "anchor", "anchors", "corrosion", "efflorescence",
];

// ─── Typo correction (Levenshtein) ─────────────────────────────────────────────

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  let curr = new Array<number>(n + 1);
  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
    }
    [prev, curr] = [curr, prev];
  }
  return prev[n];
}

const VOCAB: string[] = (() => {
  const set = new Set<string>();
  const add = (phrase: string) =>
    phrase.toLowerCase().split(/\s+/).forEach((w) => { if (w.length >= 4) set.add(w); });
  SYNONYM_GROUPS.forEach((g) => g.forEach(add));
  Object.keys(CONCEPT_EXPANSIONS).forEach(add);
  Object.values(CONCEPT_EXPANSIONS).forEach((arr) => arr.forEach(add));
  CATEGORY_INTENT.forEach((ci) => ci.patterns.forEach(add));
  EXTRA_VOCAB.forEach(add);
  return Array.from(set);
})();

function correctWord(word: string): string | null {
  if (word.length < 4 || VOCAB.includes(word)) return null;
  const maxDist = word.length <= 6 ? 1 : 2;
  let best: string | null = null;
  let bestDist = Infinity;
  for (const term of VOCAB) {
    if (Math.abs(term.length - word.length) > maxDist) continue;
    const d = levenshtein(word, term);
    if (d < bestDist) { bestDist = d; best = term; }
    if (bestDist === 1) break;
  }
  return bestDist <= maxDist ? best : null;
}

// ─── Query analysis ─────────────────────────────────────────────────────────────

type QueryAnalysis = {
  phrase: string;        // the raw lowercased query
  strong: string[];      // query words, synonyms, typo corrections (high weight)
  weak: string[];        // broader related/concept terms (low weight)
  intentCategories: string[]; // category names this query should surface (lowercased)
  words: string[];            // cleaned content words (no synonyms) for exact-category matching
  tokenIdf?: Record<string, number>; // IDF weight per content word (multi-word queries only)
  idfCutoff?: number;                 // min IDF coverage to keep a result (drops generic-word floods)
};

const MAX_TERMS = 20;

function analyzeQuery(q: string): QueryAnalysis {
  const phrase = q.toLowerCase().trim();
  const strong = new Set<string>();
  const weak = new Set<string>();

  if (phrase) strong.add(phrase);

  // Multi-word concept phrases (e.g. "remedial builder", "water leak")
  for (const [key, vals] of Object.entries(CONCEPT_EXPANSIONS)) {
    if (key.includes(" ") && phrase.includes(key)) vals.forEach((t) => weak.add(t));
  }

  const words = phrase.split(/\s+/).filter((w) => w.length >= 3 && !STOPWORDS.has(w));
  const coreWords: string[] = []; // nouns/materials only (verbs excluded) — drives exact-category match
  for (const word of words) {
    if (GENERIC_ACTIONS.has(word)) { weak.add(word); continue; }
    coreWords.push(word);
    strong.add(word);
    const corrected = correctWord(word);
    const forms = corrected ? [word, corrected] : [word];
    for (const form of forms) {
      strong.add(form);
      // synonym families → strong
      for (const group of SYNONYM_GROUPS) {
        if (group.includes(form)) group.forEach((syn) => strong.add(syn));
      }
      // concept expansions → weak
      (CONCEPT_EXPANSIONS[form] ?? []).forEach((t) => weak.add(t));
    }
  }

  // Category intents
  const intent = new Set<string>();
  for (const ci of CATEGORY_INTENT) {
    if (ci.patterns.some((p) => phrase.includes(p))) {
      ci.categories.forEach((c) => intent.add(c.toLowerCase()));
    }
  }

  // Don't double-count: a weak term that is already strong is dropped.
  for (const s of strong) weak.delete(s);

  return {
    phrase,
    strong: [...strong].filter((t) => t.length >= 3).slice(0, MAX_TERMS),
    weak: [...weak].filter((t) => t.length >= 3).slice(0, MAX_TERMS),
    intentCategories: [...intent],
    words: coreWords,
  };
}

// ─── Relevance scoring ──────────────────────────────────────────────────────────

function relevanceScore(
  row: {
    name: string;
    description: string | null;
    main_category: { name: string } | null;
    company_categories?: { category: { name: string } | null }[];
  },
  A: QueryAnalysis,
): number {
  if (!A.phrase) return 0;
  const name = row.name.toLowerCase();
  const desc = (row.description ?? "").toLowerCase();
  const cat = (row.main_category?.name ?? "").toLowerCase();
  // Approved secondary trades — additional categories the business operates in.
  const secCats = (row.company_categories ?? [])
    .map((cc) => (cc.category?.name ?? "").toLowerCase())
    .filter((c) => c && c !== cat);

  let s = 0;

  // Whole-phrase name match (strongest signal)
  if (name === A.phrase) s += 1000;
  else if (name.startsWith(A.phrase)) s += 450;
  else if (A.phrase.length >= 4 && name.includes(A.phrase)) s += 320;

  // Category intent — the query maps to this business's category. The primary
  // category is the strongest signal; an approved SECONDARY category counts too,
  // a notch below primary (so a genuine secondary trade surfaces, but a business
  // whose main trade matches still ranks ahead).
  if (cat) {
    if (A.intentCategories.includes(cat)) s += 600;
    else if (A.intentCategories.some((ic) => cat.includes(ic) || ic.includes(cat))) s += 320;
  }
  for (const sc of secCats) {
    if (A.intentCategories.includes(sc)) { s += 360; break; }
    if (A.intentCategories.some((ic) => sc.includes(ic) || ic.includes(sc))) { s += 200; break; }
  }

  // Strong terms (query words + synonyms + typo fixes)
  for (const t of A.strong) {
    if (cat.includes(t)) s += 130;
    if (secCats.some((sc) => sc.includes(t))) s += 75;
    if (name.includes(t)) s += 90;
    if (desc.includes(t)) s += 22;
  }

  // Weak terms (broader related trades / concepts)
  for (const t of A.weak) {
    if (cat.includes(t)) s += 32;
    if (secCats.some((sc) => sc.includes(t))) s += 18;
    if (name.includes(t)) s += 20;
    if (desc.includes(t)) s += 6;
  }

  // IDF-weighted token coverage (multi-word queries) — rare tokens (brand names,
  // specific materials) dominate over generic words like "supplier"/"contractor";
  // matching ALL query tokens earns an AND-boost so "Mapei supplier" ranks a real
  // Mapei supplier above the generic supplier list.
  if (A.tokenIdf && A.words.length) {
    const hay = `${name} ${desc} ${cat} ${secCats.join(" ")}`;
    let cov = 0, matched = 0;
    for (const w of A.words) {
      if (hay.includes(w)) { cov += A.tokenIdf[w] ?? 0; matched++; }
    }
    s += cov * 45;
    if (A.words.length >= 2 && matched === A.words.length) s += 300; // all tokens present
  }

  return s;
}

// IDF-weighted coverage of a query's content words in a row (name/desc/category/
// secondary). Used as the relevance cutoff that drops generic-word-only floods.
function idfCoverage(
  row: {
    name: string;
    description: string | null;
    main_category: { name: string } | null;
    company_categories?: { category: { name: string } | null }[];
  },
  A: QueryAnalysis,
): number {
  if (!A.tokenIdf) return 0;
  const cat = (row.main_category?.name ?? "").toLowerCase();
  const sec = (row.company_categories ?? []).map((c) => (c.category?.name ?? "").toLowerCase()).join(" ");
  const hay = `${row.name.toLowerCase()} ${(row.description ?? "").toLowerCase()} ${cat} ${sec}`;
  let cov = 0;
  for (const w of A.words) if (hay.includes(w)) cov += A.tokenIdf[w] ?? 0;
  return cov;
}

// ─── Location resolution ────────────────────────────────────────────────────────
// Resolve whatever the visitor gave us (picked-suggestion coords, an explicit
// suburb/postcode/state, or a free-text location box) into a single shape:
//   { state, lat, lng, suburb, postcode }
// `state` is the KEY field — when present, results are HARD-FILTERED to that state
// (a Sydney search never shows VIC/SA businesses). `lat`/`lng` drive the
// closest-first distance ranking. Coordinates come from (in priority order):
//   1. coords already supplied by the front-end (picked suggestion / geocode)
//   2. our hardcoded city/suburb table (accurate city centres)
//   3. the directory's own location data (avg coords for that suburb/postcode)

type ResolvedLocation = {
  state?: LocationState;
  lat?: number;
  lng?: number;
  suburb?: string;
  postcode?: string;
};

// ─── Distance + proximity tiers ─────────────────────────────────────────────────
// Great-circle distance in km between two lat/lng points. Now that ~99% of valid
// business locations are geocoded, we rank genuinely nearest-first instead of by
// crude postcode-number distance.

function haversineKm(aLat: number, aLng: number, bLat: number, bLng: number): number {
  const R = 6371;
  const dLat = ((bLat - aLat) * Math.PI) / 180;
  const dLng = ((bLng - aLng) * Math.PI) / 180;
  const la1 = (aLat * Math.PI) / 180;
  const la2 = (bLat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

// Translate a business location into a proximity tier relative to the searched
// point. Lower tier = closer / should appear first. Tiers map directly to the
// requested behaviour: same suburb → nearby suburbs → metro/region → wider →
// elsewhere-in-state. A business whose SERVICE AREA covers the search (statewide /
// nationwide) is kept eligible (capped at the "wider region" tier) so it isn't
// buried below far-flung locals, but genuine locals still rank ahead of it.
type ProxInfo = { km: number | null; tier: number };

function proximityInfo(
  loc: {
    suburb: string | null;
    latitude: number | null;
    longitude: number | null;
    services_statewide: boolean;
    services_nationwide: boolean;
  } | null,
  searchLat: number | undefined,
  searchLng: number | undefined,
  searchSuburb: string,
): ProxInfo {
  const exactSuburb = Boolean(searchSuburb && loc?.suburb && loc.suburb.toLowerCase() === searchSuburb);

  let km: number | null = null;
  if (loc?.latitude != null && loc?.longitude != null && searchLat != null && searchLng != null) {
    km = haversineKm(searchLat, searchLng, loc.latitude, loc.longitude);
  }

  let tier: number;
  if (exactSuburb) tier = 0;
  else if (km != null) {
    if (km <= 5) tier = 0;          // same suburb / immediate vicinity
    else if (km <= 15) tier = 1;    // nearby suburbs
    else if (km <= 50) tier = 2;    // metro / city region
    else if (km <= 150) tier = 3;   // wider region
    else tier = 4;                  // far, but still in-state
  } else {
    tier = 5;                       // unknown location (bad/missing coords) — last
  }

  // Service-area override: a statewide/nationwide servicer is relevant locally even
  // if its office is far — lift it to the "wider region" tier at worst, never above
  // genuine locals (tiers 0–2).
  if ((loc?.services_statewide || loc?.services_nationwide) && tier > 3) tier = 3;

  return { km, tier };
}

const asState = (s: string | undefined): LocationState | undefined =>
  s && (VALID_STATES as string[]).includes(s) ? (s as LocationState) : undefined;

async function resolveLocation(opts: {
  lat: number;
  lng: number;
  hasCoords: boolean;
  locationState: string;
  suburb: string;
  postcode: string;
  stateFilter: string;
  rawLocation: string;
}): Promise<ResolvedLocation> {
  // 1. Front-end already supplied coordinates.
  if (opts.hasCoords) {
    return {
      lat: opts.lat,
      lng: opts.lng,
      state: asState((opts.locationState || opts.stateFilter).toUpperCase()),
      suburb: opts.suburb || undefined,
      postcode: opts.postcode || undefined,
    };
  }

  // 2. Work out the target from explicit params or the free-text location box.
  let suburb = opts.suburb;
  let postcode = opts.postcode;
  let state = opts.stateFilter ? asState(opts.stateFilter.toUpperCase()) : undefined;

  if (!suburb && !postcode && !state && opts.rawLocation) {
    const t = opts.rawLocation.trim();
    if (/^\d{4}$/.test(t)) postcode = t;
    else {
      const sc = toStateCode(t);
      if (sc) state = sc as LocationState;
      else suburb = t;
    }
  }

  // 3a. Postcode → state (+ representative coords from our data).
  if (postcode) {
    const row = await prisma.location.findFirst({
      where: { postcode, latitude: { not: null }, longitude: { not: null } },
      select: { state: true, latitude: true, longitude: true },
    });
    if (row) {
      return { state: row.state, postcode, lat: Number(row.latitude), lng: Number(row.longitude) };
    }
    return { state: asState(postcodeToState(postcode) ?? undefined), postcode };
  }

  // 3b. Suburb / city → state (+ representative coords for nearest-first ranking).
  if (suburb) {
    const hc = lookupSuburb(suburb);
    const hcState = hc ? asState(hc.stateCode) : undefined;

    if (hc) {
      // Accurate city/suburb centre from our curated table.
      const pcRow = await prisma.location.findFirst({
        where: { suburb: { equals: suburb, mode: "insensitive" }, NOT: { postcode: "" }, ...(hcState ? { state: hcState } : {}) },
        select: { postcode: true },
      });
      return { state: hcState, lat: hc.lat, lng: hc.lng, suburb, postcode: pcRow?.postcode };
    }

    // Full AU place list — resolves ANY real suburb or region (Katoomba, Marsden
    // Park, Blue Mountains, Central Coast, …) to a state + coordinates, even when
    // no business is listed there yet. This is what lets a search anywhere return
    // the nearest businesses instead of nothing.
    const au = resolveAuLocation(suburb, opts.stateFilter || undefined);
    if (au) {
      return { state: asState(au.state), suburb: au.suburb, postcode: au.postcode, lat: au.lat, lng: au.lng };
    }

    // Not in the dataset — derive a representative coordinate from the
    // geocoded directory itself (a real listing in that suburb).
    const geo = await prisma.location.findFirst({
      where: {
        suburb: { equals: suburb, mode: "insensitive" },
        latitude: { not: null },
        longitude: { not: null },
      },
      select: { state: true, latitude: true, longitude: true, postcode: true },
    });
    if (geo) {
      return {
        state: geo.state, suburb, postcode: geo.postcode || undefined,
        lat: geo.latitude == null ? undefined : Number(geo.latitude),
        lng: geo.longitude == null ? undefined : Number(geo.longitude),
      };
    }

    // Suburb exists but no coords — still hard-filter by its state if known.
    const stateOnly = await prisma.location.findFirst({
      where: { suburb: { equals: suburb, mode: "insensitive" } },
      select: { state: true },
    });
    if (stateOnly) return { state: stateOnly.state, suburb };

    // Unknown suburb — can't determine a state; fall back to a soft suburb match.
    return { suburb };
  }

  // 3c. State only.
  return { state };
}

// ─── WHERE builder ──────────────────────────────────────────────────────────────

function buildWhere(params: {
  A: QueryAnalysis;
  category: string;
  featured: boolean;
  licenceVerified: boolean;
  claimed: boolean;
  enforcedState?: LocationState;
  softSuburb?: string;
}): Prisma.CompanyWhereInput {
  const { A, category, featured, licenceVerified, claimed, enforcedState, softSuburb } = params;

  const where: Prisma.CompanyWhereInput = { status: "published" };
  const AND: Prisma.CompanyWhereInput[] = [];

  // ── Keyword search — recall across all terms + intent categories ──────────────
  if (A.phrase) {
    const terms = [...new Set([...A.strong, ...A.weak])];
    const or: Prisma.CompanyWhereInput[] = terms.flatMap((term) => [
      { name: { contains: term, mode: "insensitive" } },
      { description: { contains: term, mode: "insensitive" } },
      { main_category: { name: { contains: term, mode: "insensitive" } } },
      // Approved secondary trades are searchable too.
      { company_categories: { some: { is_approved: true, category: { name: { contains: term, mode: "insensitive" } } } } },
    ]);
    // Intent categories — surface the right category even with no literal text match.
    for (const ic of A.intentCategories) {
      or.push({ main_category: { name: { contains: ic, mode: "insensitive" } } });
      or.push({ company_categories: { some: { is_approved: true, category: { name: { contains: ic, mode: "insensitive" } } } } });
    }
    AND.push({ OR: or });
  }

  // ── Category filter (explicit dropdown/slug) ──────────────────────────────────
  if (category) {
    AND.push({
      OR: [
        { main_category: { slug: category } },
        { main_category: { parent: { slug: category } } },
      ],
    });
  }

  // ── Location restriction ──────────────────────────────────────────────────────
  // A resolved state HARD-FILTERS results to that state (a Sydney search never
  // returns VIC/SA businesses). If we couldn't resolve a state but have a suburb,
  // fall back to a soft suburb match so the search still narrows sensibly.
  if (enforcedState) {
    AND.push({ locations: { some: { state: enforcedState } } });
  } else if (softSuburb) {
    AND.push({ locations: { some: { suburb: { contains: softSuburb, mode: "insensitive" } } } });
  }

  // ── Verification filters ──────────────────────────────────────────────────────
  if (featured) AND.push({ is_featured: true });
  if (claimed) AND.push({ is_claimed: true });
  if (licenceVerified) AND.push({ licences: { some: { status: "verified" } } });

  if (AND.length > 0) where.AND = AND;
  return where;
}

// ─── SELECT shapes ──────────────────────────────────────────────────────────────

const MATCH_SELECT = {
  id: true,
  name: true,
  description: true,
  phone: true,
  plan_type: true,
  featured_until: true,
  is_featured: true,
  confidence_score: true,
  is_claimed: true,
  listing_claim_status: true,
  profile_status: true,
  main_category_id: true,
  main_category: { select: { name: true } },
  company_categories: {
    where: { is_approved: true },
    select: { category: { select: { name: true } } },
  },
  locations: {
    take: 1,
    select: {
      suburb: true,
      postcode: true,
      state: true,
      latitude: true,
      longitude: true,
      services_nationwide: true,
      services_statewide: true,
      service_radius_km: true,
    },
  },
} satisfies Prisma.CompanySelect;

const COMPANY_SELECT = {
  id: true,
  slug: true,
  name: true,
  description: true,
  phone: true,
  website: true,
  email: true,
  plan_type: true,
  profile_status: true,
  confidence_score: true,
  is_featured: true,
  is_claimed: true,
  listing_claim_status: true,
  logo_url: true,
  main_category: { select: { id: true, name: true, slug: true } },
  locations: {
    take: 1,
    select: {
      suburb: true,
      state: true,
      postcode: true,
      services_nationwide: true,
      services_statewide: true,
    },
  },
  licences: { where: { status: "verified" }, take: 1, select: { status: true } },
  company_tags: {
    where: { is_approved: true },
    take: 5,
    select: { tag: { select: { name: true, tag_type: true } } },
  },
} satisfies Prisma.CompanySelect;

// ─── Top Listing section ─────────────────────────────────────────────────────
// Premium subscribers for the search's category, ordered by subscription date
// (first to subscribe = position 1), max 3. Returns [] when the category can't be
// determined or nobody has subscribed.
async function getTopListings(
  category: string,
  matchingRows: { id: number; main_category_id: number | null }[],
  resolved: ResolvedLocation,
) {
  let sectionCatId: number | null = null;
  if (category) {
    const cat = await prisma.category.findUnique({ where: { slug: category }, select: { id: true } });
    sectionCatId = cat?.id ?? null;
  }
  if (sectionCatId == null) {
    // Most common category among the matched results = what this search is about.
    const counts = new Map<number, number>();
    for (const r of matchingRows) if (r.main_category_id != null) counts.set(r.main_category_id, (counts.get(r.main_category_id) ?? 0) + 1);
    let best: number | null = null, bestN = 0;
    for (const [id, n] of counts) if (n > bestN) { bestN = n; best = id; }
    sectionCatId = best;
  }
  if (sectionCatId == null) return { items: [] as TopListingCard[], eligible: false };

  const tops = await prisma.company.findMany({
    where: {
      status: "published",
      // Eligible for this category's Top 3 via the main category OR an approved
      // secondary trade — so synonym/secondary selections fold into the same
      // canonical bucket and a paid listing isn't dropped from a category it serves.
      OR: [
        { main_category_id: sectionCatId },
        { company_categories: { some: { is_approved: true, category_id: sectionCatId } } },
      ],
      // Gold Featured only, and only the 3 in the searched State/Territory.
      plan_type: "featured",
      directory_subscription: { is: { subscription_status: { in: ["active", "trialing"] } } },
      ...(resolved.state ? { locations: { some: { state: resolved.state } } } : {}),
    },
    orderBy: { directory_subscription: { created_at: "asc" } }, // first to subscribe first
    take: 3,
    select: {
      id: true, slug: true, name: true, logo_url: true, description: true,
      main_category: { select: { name: true } },
      locations: { take: 1, select: { suburb: true, state: true, latitude: true, longitude: true } },
    },
  });

  const items = tops.map((t) => {
    const loc = t.locations[0];
    let km: number | null = null;
    if (resolved.lat != null && resolved.lng != null && loc?.latitude != null && loc?.longitude != null) {
      km = Math.round(haversineKm(resolved.lat, resolved.lng, loc.latitude, loc.longitude));
    }
    return {
      id: t.id, slug: t.slug, name: t.name, logo_url: t.logo_url, description: t.description,
      main_category: t.main_category,
      locations: t.locations.map((l) => ({ suburb: l.suburb, state: l.state })),
      distance_km: km,
    };
  });
  // eligible = a real category was determined → show the promo card when items is empty.
  return { items, eligible: true };
}

type TopListingCard = {
  id: number; slug: string; name: string; logo_url: string | null; description: string | null;
  main_category: { name: string } | null;
  locations: { suburb: string | null; state: string }[];
  distance_km: number | null;
};

// ─── Handler ───────────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;

  // Accept both `q` and `search` for the keyword.
  const q = (sp.get("q") ?? sp.get("search") ?? "").trim();
  const lat = parseFloat(sp.get("lat") ?? "");
  const lng = parseFloat(sp.get("lng") ?? "");
  const locationState = sp.get("locationState")?.trim() ?? "";
  const category = sp.get("category")?.trim() ?? "";
  const featured = sp.get("featured") === "true";
  const licenceVerified = sp.get("licenceVerified") === "true";
  const claimed = sp.get("claimed") === "true";
  // `sort=distance` ranks strictly nearest-first (used by the AI "near me" search).
  const sortMode = sp.get("sort")?.trim() ?? "";
  const page = Math.max(1, parseInt(sp.get("page") ?? "1") || 1);
  const offset = (page - 1) * PAGE_SIZE;

  // Search radius (km) from the searched point. "au"/absent = Australia-wide (no cap).
  const radiusRaw = sp.get("radius")?.trim() ?? "";
  const radiusKm = radiusRaw && radiusRaw !== "au" ? Number(radiusRaw) : null;

  // Location inputs: explicit suburb/postcode/state params, coords, or free-text box.
  const suburbParam = sp.get("suburb")?.trim() ?? "";
  const postcodeParam = sp.get("postcode")?.trim() ?? "";
  const stateParam = sp.get("state")?.trim() ?? "";
  const rawLocation = sp.get("location")?.trim() ?? "";
  const hasCoordsParam = !isNaN(lat) && !isNaN(lng);
  const locationRequested = Boolean(
    suburbParam || postcodeParam || stateParam || rawLocation || hasCoordsParam,
  );

  // ── Relevance guard — no listings without a search intent ─────────────────────
  const hasAnyCriteria = Boolean(
    q || category || locationRequested || featured || licenceVerified || claimed,
  );
  if (!hasAnyCriteria) {
    return NextResponse.json({
      companies: [], total: 0, page, pageSize: PAGE_SIZE, totalPages: 0, isLocalFallback: false,
    });
  }

  const A = analyzeQuery(q);
  const now = new Date();

  try {
    // Resolve the requested location → state (hard filter) + coordinates (ranking).
    const resolved: ResolvedLocation = locationRequested
      ? await resolveLocation({
          lat, lng, hasCoords: hasCoordsParam, locationState,
          suburb: suburbParam, postcode: postcodeParam, stateFilter: stateParam, rawLocation,
        })
      : {};

    const enforcedState = resolved.state;
    // Soft suburb match only when we couldn't pin a state (unknown suburb).
    const softSuburb = !enforcedState ? (resolved.suburb ?? "") : "";

    // IDF token weighting (Bug 2). For multi-word queries, weight each content word
    // by its inverse document frequency so a rare token (a brand like "Mapei")
    // dominates a common one ("supplier"), and set a coverage cutoff that drops
    // generic-word-only matches from the results + count.
    if (A.words.length >= 2) {
      const [N, ...dfs] = await Promise.all([
        prisma.company.count({ where: { status: "published" } }),
        ...A.words.map((w) =>
          prisma.company.count({
            where: {
              status: "published",
              OR: [
                { name: { contains: w, mode: "insensitive" } },
                { description: { contains: w, mode: "insensitive" } },
                { main_category: { name: { contains: w, mode: "insensitive" } } },
              ],
            },
          }),
        ),
      ]);
      const idf: Record<string, number> = {};
      A.words.forEach((w, i) => { idf[w] = Math.log((N + 1) / (dfs[i] + 1)); });
      A.tokenIdf = idf;
      // Keep results covering ≥ half the rarest token's weight: drops "supplier"-only
      // matches for "Mapei supplier", but keeps both halves of similarly-common pairs
      // (e.g. "waterproofing membrane").
      A.idfCutoff = 0.5 * Math.max(...A.words.map((w) => idf[w]));
    }

    const where = buildWhere({ A, category, featured, licenceVerified, claimed, enforcedState, softSuburb });

    // Pull matching rows for in-memory relevance + proximity scoring.
    const matchingRows = await prisma.company.findMany({
      where,
      select: MATCH_SELECT,
      take: MATCH_CAP,
    });

    if (matchingRows.length === 0) {
      return NextResponse.json({
        companies: [], total: 0, page, pageSize: PAGE_SIZE, totalPages: 0, isLocalFallback: false,
      });
    }

    // Proximity ranking. Business locations are now geocoded, so we rank by TRUE
    // great-circle distance from the searched point, bucketed into tiers
    // (same suburb → nearby → metro → wider → elsewhere-in-state). An exact suburb
    // name match still counts as closest of all.
    const searchSuburb = (resolved.suburb ?? "").toLowerCase();

    // Coarse relevance tiers keep strong category/name matches above weak
    // description-only matches; within a tier we order nearest-first.
    const relTier = (rel: number) => (rel >= 400 ? 3 : rel >= 200 ? 2 : rel >= 80 ? 1 : 0);

    const scored = matchingRows.map((row) => {
      const loc = row.locations[0] ?? null;
      const rel = relevanceScore(row, A);
      const trust = trustBoost(row) + completenessBoost(row);

      let distTier = 0;
      let distKm: number | null = null;
      if (locationRequested) {
        const p = proximityInfo(loc, resolved.lat, resolved.lng, searchSuburb);
        distTier = p.tier;
        distKm = p.km;
      }

      // Membership visibility radius:
      //   • Gold (featured) shows across the whole state — results are already
      //     state-filtered (enforcedState), so Gold is never distance-capped.
      //   • Silver (claimed) & Free (basic) are capped at 50km of the searched point,
      //     even if the business self-declares statewide/nationwide. A user-selected
      //     radius can only narrow this, never widen it.
      //   • Unknown distance (geocode miss) is kept and ranked last — never hidden.
      const isGold = planRank(row) === 2;
      const cap = radiusKm == null ? SILVER_FREE_RADIUS_KM : Math.min(radiusKm, SILVER_FREE_RADIUS_KM);
      const keep =
        !locationRequested ? true :
        isGold ? true :
        distKm == null ? true :
        distKm <= cap;

      // Exact category match: ALL searched words appear in the business's PRIMARY
      // category name — e.g. "access consultant" puts an Access Consultant above a
      // Building Consultant that only shares the generic word "consultant".
      const catName = (row.main_category?.name ?? "").toLowerCase();
      const catExact = A.words.length > 0 && A.words.every((w) => catName.includes(w));
      // IDF coverage + whole-phrase hit — drive the multi-word relevance cutoff.
      const cov = idfCoverage(row, A);
      const phraseHit = A.words.length >= 2 &&
        (row.name.toLowerCase().includes(A.phrase) || catName.includes(A.phrase));

      return {
        id: row.id, rel, tier: relTier(rel), distTier, distKm, trust, keep, catExact, cov, phraseHit,
        planScore: planRank(row),
        keywordScore: rel + trust,
      };
    });

    if (locationRequested) {
      const kmOf = (x: { distKm: number | null }) => (x.distKm == null ? Number.MAX_SAFE_INTEGER : x.distKm);
      if (sortMode === "distance") {
        // Strict nearest-first (AI "near me" search): order by ACTUAL kilometres,
        // closest first, with unknown-distance rows last. Paid plans still lead
        // for monetisation; relevance/trust only break exact-distance ties. The
        // keyword WHERE clause already guarantees topical relevance, so the
        // matched set can be ordered purely by proximity.
        scored.sort((a, b) =>
          (b.planScore - a.planScore) ||
          (kmOf(a) - kmOf(b)) ||
          (b.rel - a.rel) ||
          (b.trust - a.trust)
        );
      } else {
        // Default location ordering (membership model):
        //   1. plan tier — Gold (state) → Silver → Free (tier ALWAYS beats distance)
        //   2. exact category match, then relevance tier — keep the right trade up
        //   3. closest first within the same tier + relevance (unknown distance last)
        //   4. relevance score, then trust as final tie-breakers
        scored.sort((a, b) =>
          (b.planScore - a.planScore) ||
          (Number(b.catExact) - Number(a.catExact)) ||
          (b.tier - a.tier) ||
          (a.distTier - b.distTier) ||
          (kmOf(a) - kmOf(b)) ||
          (b.rel - a.rel) ||
          (b.trust - a.trust)
        );
      }
    } else {
      // Keyword-only search: pure relevance (then trust).
      scored.sort((a, b) => (b.planScore - a.planScore) || (Number(b.catExact) - Number(a.catExact)) || (b.keywordScore - a.keywordScore));
    }

    // Keep each result's computed distance so the UI can show "~N km away".
    const distById = new Map(scored.map((s) => [s.id, s.distKm]));

    // Apply the radius filter (no-op when Australia-wide / no radius chosen).
    const base = radiusKm == null ? scored : scored.filter((s) => s.keep);
    // Relevance cutoff (Bug 2): for multi-word queries, drop results that don't
    // cover enough of the rarest token's weight (generic-word-only floods), unless
    // the whole phrase appears or the category is an exact match. Single-word and
    // idf-less queries are unaffected (cutoff = 0).
    const cutoff = A.idfCutoff ?? 0;
    const visible = cutoff > 0
      ? base.filter((s) => s.cov >= cutoff || s.phraseHit || s.catExact)
      : base;

    // Hard state filter means results are always in-region — no cross-state fallback.
    const isLocalFallback = false;

    const totalCount = visible.length;
    const pageSlice = visible.slice(offset, offset + PAGE_SIZE);
    const pageIds = pageSlice.map((r) => r.id);

    if (pageIds.length === 0) {
      return NextResponse.json({
        companies: [], total: totalCount, page, pageSize: PAGE_SIZE,
        totalPages: Math.ceil(totalCount / PAGE_SIZE), isLocalFallback,
      });
    }

    // Fetch full data for the page, preserve ranking order.
    const fullRows = await prisma.company.findMany({
      where: { id: { in: pageIds } },
      select: COMPANY_SELECT,
    });
    const companies = pageIds.map((id) => {
      const row = fullRows.find((r) => r.id === id)!;
      const km = distById.get(id);
      return { ...row, distance_km: km == null ? null : Math.round(km) };
    });

    // Top Listing section — only meaningful on the first page.
    const topData = page === 1
      ? await getTopListings(category, matchingRows, resolved)
      : { items: [] as TopListingCard[], eligible: false };

    return NextResponse.json({
      companies,
      total: totalCount,
      page,
      pageSize: PAGE_SIZE,
      totalPages: Math.ceil(totalCount / PAGE_SIZE),
      isLocalFallback,
      topListings: topData.items,
      topListingEligible: topData.eligible,
    });
  } catch (err) {
    console.error("Directory search error:", err);
    return NextResponse.json({
      companies: [], total: 0, page, pageSize: PAGE_SIZE, totalPages: 0, isLocalFallback: false,
    });
  }
}
