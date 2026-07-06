// Comprehensive Australian location lookup built from the public-domain postcode
// dataset: every real suburb/locality (~17.5k) plus ABS region names (~430, e.g.
// "Blue Mountains", "Central Coast"). This is the source of truth for location
// autocomplete and search resolution — so EVERY genuine AU place is searchable,
// not just the suburbs that happen to already have a directory listing.

import data from "./au-suburbs.json";

type SubRow = { s: string; st: string; pc: string; lat: number; lng: number };
type RegRow = { s: string; st: string; lat: number; lng: number };

const suburbs = data.suburbs as SubRow[];
const regions = data.regions as RegRow[];

export type AuLocation = {
  type: "suburb" | "region";
  suburb: string; // suburb or region name (Title Case)
  state: string;
  postcode?: string;
  lat: number;
  lng: number;
  label: string;
};

const titleCase = (s: string) => s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

// Postal/delivery artifacts in the dataset that aren't real places people search
// (e.g. "KATOOMBA DC", "CENTRAL COAST MC", "MARSDEN POSTAL DEPOT").
const ARTIFACT = /(\b(DC|MC|BC|LVR)$)|POSTAL|PO BOXES|POST SHOP|POST OFFICE|DELIVERY CENTRE|MAIL CENTRE|MILITARY/;
const isRealPlace = (name: string) => !ARTIFACT.test(name);

// Canonical CBD postcode + coordinates for capital cities. The raw postcode dataset
// lists non-geographic PO-box postcodes (e.g. Sydney 1001) first, ~9km off-centre —
// we override to the real CBD so the chip + distance ranking are correct.
const CAPITAL_CBD: Record<string, { st: string; pc: string; lat: number; lng: number }> = {
  SYDNEY:     { st: "NSW", pc: "2000", lat: -33.8688, lng: 151.2093 },
  MELBOURNE:  { st: "VIC", pc: "3000", lat: -37.8136, lng: 144.9631 },
  BRISBANE:   { st: "QLD", pc: "4000", lat: -27.4698, lng: 153.0251 },
  PERTH:      { st: "WA",  pc: "6000", lat: -31.9523, lng: 115.8613 },
  ADELAIDE:   { st: "SA",  pc: "5000", lat: -34.9285, lng: 138.6007 },
  CANBERRA:   { st: "ACT", pc: "2600", lat: -35.2820, lng: 149.1287 },
  HOBART:     { st: "TAS", pc: "7000", lat: -42.8821, lng: 147.3272 },
  DARWIN:     { st: "NT",  pc: "0800", lat: -12.4634, lng: 130.8456 },
  NEWCASTLE:  { st: "NSW", pc: "2300", lat: -32.9267, lng: 151.7789 },
  WOLLONGONG: { st: "NSW", pc: "2500", lat: -34.4248, lng: 150.8931 },
};

function toSuburb(r: SubRow): AuLocation {
  const name = titleCase(r.s);
  const cbd = CAPITAL_CBD[r.s.toUpperCase()];
  const useCbd = cbd && cbd.st === r.st;
  const pc = useCbd ? cbd.pc : r.pc;
  const lat = useCbd ? cbd.lat : r.lat;
  const lng = useCbd ? cbd.lng : r.lng;
  return { type: "suburb", suburb: name, state: r.st, postcode: pc || undefined, lat, lng, label: `${name}, ${r.st}${pc ? ` ${pc}` : ""}` };
}
function toRegion(r: RegRow): AuLocation {
  const name = titleCase(r.s);
  return { type: "region", suburb: name, state: r.st, lat: r.lat, lng: r.lng, label: `${name} (region), ${r.st}` };
}

// Prefix autocomplete over suburbs + regions. Shorter names rank first so
// "syd" → Sydney before Sydenham, "katoomba" lands immediately.
export function searchAuLocations(q: string, limit = 8): AuLocation[] {
  const u = q.trim().toUpperCase();
  if (u.length < 2) return [];
  const byCloseness = (a: { s: string }, b: { s: string }) => a.s.length - b.s.length || a.s.localeCompare(b.s);

  const seenSub = new Set<string>();
  const subHits = suburbs
    .filter((x) => x.s.startsWith(u) && isRealPlace(x.s))
    .sort(byCloseness)
    .map(toSuburb)
    .filter((p) => { const k = `${p.suburb}|${p.state}`; if (seenSub.has(k)) return false; seenSub.add(k); return true; })
    .slice(0, limit);
  const regHits = regions.filter((x) => x.s.startsWith(u) && isRealPlace(x.s)).sort(byCloseness).slice(0, 3).map(toRegion);

  // Regions are useful but less specific — show after exact suburb hits.
  return [...subHits, ...regHits].slice(0, limit);
}

// Postcode prefix autocomplete → representative suburb + coordinates.
export function searchAuPostcodes(prefix: string, limit = 5): AuLocation[] {
  const p = prefix.trim();
  if (!p) return [];
  const seen = new Set<string>();
  const out: AuLocation[] = [];
  for (const r of suburbs) {
    if (r.pc && r.pc.startsWith(p) && !seen.has(r.pc) && isRealPlace(r.s)) {
      seen.add(r.pc);
      out.push(toSuburb(r));
      if (out.length >= limit) break;
    }
  }
  return out.sort((a, b) => (a.postcode || "").localeCompare(b.postcode || ""));
}

// Resolve a free-text place name (suburb OR region) to state + coordinates.
// Prefers an exact suburb match (optionally constrained to a state), then a region.
export function resolveAuLocation(name: string, state?: string): AuLocation | null {
  const u = name.trim().toUpperCase();
  if (!u) return null;
  const st = state ? state.trim().toUpperCase() : undefined;
  const pick = <T extends { s: string; st: string }>(arr: T[]) =>
    (st && arr.find((x) => x.s === u && x.st === st)) || arr.find((x) => x.s === u) || null;

  const s = pick(suburbs);
  if (s) return toSuburb(s);
  const r = pick(regions);
  if (r) return toRegion(r);
  return null;
}
