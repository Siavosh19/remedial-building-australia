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

function toSuburb(r: SubRow): AuLocation {
  const name = titleCase(r.s);
  return { type: "suburb", suburb: name, state: r.st, postcode: r.pc || undefined, lat: r.lat, lng: r.lng, label: `${name}, ${r.st}${r.pc ? ` ${r.pc}` : ""}` };
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

  const subHits = suburbs.filter((x) => x.s.startsWith(u) && isRealPlace(x.s)).sort(byCloseness).slice(0, limit).map(toSuburb);
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
