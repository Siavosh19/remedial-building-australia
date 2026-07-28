import "server-only";

// ============================================================================
// MeasureMap address lookup / geocoding — provider-agnostic service.
//
// The active provider is chosen by env MEASUREMAP_GEOCODER:
//   "nsw"       → NSW Spatial Services AddressPoint (DEFAULT — free, keyless,
//                 rooftop-accurate; the same authoritative data SIX Maps uses)
//   "google"    → Google Geocoding API   (needs GOOGLE_MAPS_API_KEY)
//   "geoscape"  → Geoscape Predictive    (needs GEOSCAPE_API_KEY)
//   "nominatim" → OpenStreetMap, keyless  (street-level only; last resort)
//
// If a paid provider is selected but its key is missing, we fall back to the
// NSW provider. Callers only ever touch searchAddresses()/resolveAddress().
// ============================================================================

export type AddressSuggestion = {
  id: string; // opaque token the client hands back to resolveAddress()
  label: string; // human display string
};

export type ResolvedAddress = {
  full_address: string;
  suburb: string | null;
  state: string | null;
  postcode: string | null;
  latitude: number;
  longitude: number;
};

type Provider = "nsw" | "google" | "geoscape" | "nominatim";

const UA = "RemedialBuildingAustralia-MeasureMap/1.0 (info@remedialbuildingaustralia.com.au)";

function activeProvider(): Provider {
  const want = (process.env.MEASUREMAP_GEOCODER ?? "nsw").toLowerCase();
  if (want === "google" && !process.env.GOOGLE_MAPS_API_KEY) {
    console.warn("[measuremap] MEASUREMAP_GEOCODER=google but GOOGLE_MAPS_API_KEY unset — using nsw");
    return "nsw";
  }
  if (want === "geoscape" && !process.env.GEOSCAPE_API_KEY) {
    console.warn("[measuremap] MEASUREMAP_GEOCODER=geoscape but GEOSCAPE_API_KEY unset — using nsw");
    return "nsw";
  }
  if (want === "google" || want === "geoscape" || want === "nominatim") return want;
  return "nsw";
}

export async function searchAddresses(query: string): Promise<AddressSuggestion[]> {
  const q = query.trim();
  if (q.length < 3) return [];
  try {
    switch (activeProvider()) {
      case "google":
        return await googleSearch(q);
      case "geoscape":
        return await geoscapeSearch(q);
      case "nominatim":
        return await nominatimSearch(q);
      default:
        return await nswSearch(q);
    }
  } catch (err) {
    console.error("[measuremap] address search failed:", err);
    return [];
  }
}

export async function resolveAddress(id: string): Promise<ResolvedAddress | null> {
  try {
    switch (activeProvider()) {
      case "google":
        return await googleResolve(id);
      case "geoscape":
        return await geoscapeResolve(id);
      case "nominatim":
        return await nominatimResolve(id);
      default:
        return await nswResolve(id);
    }
  } catch (err) {
    console.error("[measuremap] address resolve failed:", err);
    return null;
  }
}

// ── NSW Spatial Services AddressPoint (default — free, rooftop-accurate) ─────
// Same authoritative NSW address data SIX Maps uses. Returns the point INSIDE
// the parcel, so the downstream cadastre lookup lands on the correct lot.
const NSW_ADDRESS_LAYER =
  "https://portal.spatial.nsw.gov.au/server/rest/services/NSW_Geocoded_Addressing_Theme/FeatureServer/1/query";

const STREET_TYPES = new Set([
  "STREET", "ST", "ROAD", "RD", "AVENUE", "AVE", "AV", "LANE", "LN", "PLACE", "PL",
  "DRIVE", "DR", "COURT", "CT", "CRESCENT", "CRES", "CR", "CLOSE", "CL", "PARADE", "PDE",
  "WAY", "TERRACE", "TCE", "HIGHWAY", "HWY", "CIRCUIT", "CCT", "BOULEVARD", "BVD",
  "GROVE", "GR", "ESPLANADE", "ESP", "SQUARE", "SQ", "WALK", "RISE", "ROW", "LOOP",
]);

// Suburb = the tokens that follow the last recognised street-type word.
function suburbFromAddress(addr: string): string | null {
  const parts = addr.trim().split(/\s+/);
  let lastStreetIdx = -1;
  parts.forEach((p, i) => { if (STREET_TYPES.has(p.toUpperCase())) lastStreetIdx = i; });
  if (lastStreetIdx < 0 || lastStreetIdx >= parts.length - 1) return null;
  return parts.slice(lastStreetIdx + 1).join(" ");
}

type NswHit = { properties: { address: string }; geometry: { coordinates: [number, number] } };

async function nswSearch(q: string): Promise<AddressSuggestion[]> {
  const tokens = q.toUpperCase().replace(/[^A-Z0-9\s/]/g, " ").trim().split(/\s+/).filter(Boolean);
  if (!tokens.length) return [];
  // PREFIX match (no leading wildcard). Stored addresses are uppercase and start
  // with the house number, so `address LIKE 'TYPED%'` uses the index and returns
  // in ~0.2s vs ~11s for a '%...%' scan. Users type left-to-right (number → street
  // → suburb), which matches the stored "98 MOUNT STREET COOGEE" order.
  const prefix = tokens.join(" ") + "%";
  const where = `address LIKE '${prefix.replace(/'/g, "''")}'`;
  const url =
    `${NSW_ADDRESS_LAYER}?where=${encodeURIComponent(where)}` +
    `&outFields=address&returnGeometry=true&outSR=4326&resultRecordCount=15&f=geojson`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) return [];
  const data = await res.json();
  const hits = (data.features ?? []) as NswHit[];

  // Dedupe by rounded coordinate, keeping the shortest label (the base street
  // address rather than each unit that shares the same point).
  const byCoord = new Map<string, { label: string; lng: number; lat: number }>();
  for (const h of hits) {
    const [lng, lat] = h.geometry.coordinates;
    const key = `${lng.toFixed(6)},${lat.toFixed(6)}`;
    const label = h.properties.address;
    const cur = byCoord.get(key);
    if (!cur || label.length < cur.label.length) byCoord.set(key, { label, lng, lat });
  }
  return Array.from(byCoord.values()).slice(0, 6).map((e) => ({
    id: "nsw:" + Buffer.from(JSON.stringify({
      full_address: `${e.label} NSW`,
      suburb: suburbFromAddress(e.label),
      state: "NSW",
      postcode: null,
      latitude: e.lat,
      longitude: e.lng,
    })).toString("base64"),
    label: e.label,
  }));
}

async function nswResolve(id: string): Promise<ResolvedAddress | null> {
  if (!id.startsWith("nsw:")) return null;
  const parsed = JSON.parse(Buffer.from(id.slice(4), "base64").toString("utf8")) as ResolvedAddress;
  if (!Number.isFinite(parsed.latitude) || !Number.isFinite(parsed.longitude)) return null;
  return parsed;
}

// ── Nominatim (keyless default) ─────────────────────────────────────────────
// The id token encodes the full structured result so resolve() needs no 2nd call.
type NominatimHit = {
  display_name: string;
  lat: string;
  lon: string;
  address?: Record<string, string>;
};

function pickSuburb(a: Record<string, string> = {}): string | null {
  return a.suburb || a.city_district || a.town || a.village || a.city || a.municipality || null;
}
function pickState(a: Record<string, string> = {}): string | null {
  const map: Record<string, string> = {
    "new south wales": "NSW", victoria: "VIC", queensland: "QLD",
    "south australia": "SA", "western australia": "WA", tasmania: "TAS",
    "northern territory": "NT", "australian capital territory": "ACT",
  };
  const s = (a.state || "").toLowerCase();
  return map[s] || (a.state ? a.state : null);
}

async function nominatimSearch(q: string): Promise<AddressSuggestion[]> {
  const url =
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}` +
    `&format=json&addressdetails=1&limit=6&countrycodes=au`;
  const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" }, next: { revalidate: 3600 } });
  if (!res.ok) return [];
  const data: NominatimHit[] = await res.json();
  return data.map((h) => ({
    // Encode structured data in the id so resolve() is offline.
    id: "osm:" + Buffer.from(JSON.stringify({
      full_address: h.display_name,
      suburb: pickSuburb(h.address),
      state: pickState(h.address),
      postcode: h.address?.postcode ?? null,
      latitude: parseFloat(h.lat),
      longitude: parseFloat(h.lon),
    })).toString("base64"),
    label: h.display_name,
  }));
}

async function nominatimResolve(id: string): Promise<ResolvedAddress | null> {
  if (!id.startsWith("osm:")) return null;
  const parsed = JSON.parse(Buffer.from(id.slice(4), "base64").toString("utf8")) as ResolvedAddress;
  if (!Number.isFinite(parsed.latitude) || !Number.isFinite(parsed.longitude)) return null;
  return parsed;
}

// ── Google Geocoding API (paid) ─────────────────────────────────────────────
type GoogleResult = {
  formatted_address: string;
  geometry: { location: { lat: number; lng: number } };
  address_components: Array<{ long_name: string; short_name: string; types: string[] }>;
  place_id: string;
};

function googleParts(c: GoogleResult["address_components"]) {
  const get = (t: string) => c.find((x) => x.types.includes(t));
  return {
    suburb: get("locality")?.long_name ?? get("sublocality")?.long_name ?? null,
    state: get("administrative_area_level_1")?.short_name ?? null,
    postcode: get("postal_code")?.long_name ?? null,
  };
}

async function googleGeocode(q: string): Promise<GoogleResult[]> {
  const key = process.env.GOOGLE_MAPS_API_KEY!;
  const url =
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(q)}` +
    `&components=country:AU&key=${key}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) return [];
  const data = await res.json();
  return data.status === "OK" ? (data.results as GoogleResult[]) : [];
}

async function googleSearch(q: string): Promise<AddressSuggestion[]> {
  const results = await googleGeocode(q);
  return results.slice(0, 6).map((r) => ({ id: "gp:" + r.place_id, label: r.formatted_address }));
}

async function googleResolve(id: string): Promise<ResolvedAddress | null> {
  // Re-geocode by place_id for authoritative parts + coords.
  const placeId = id.startsWith("gp:") ? id.slice(3) : id;
  const key = process.env.GOOGLE_MAPS_API_KEY!;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${encodeURIComponent(placeId)}&key=${key}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  const r: GoogleResult | undefined = data.results?.[0];
  if (!r) return null;
  const parts = googleParts(r.address_components);
  return {
    full_address: r.formatted_address,
    ...parts,
    latitude: r.geometry.location.lat,
    longitude: r.geometry.location.lng,
  };
}

// ── Geoscape Predictive (paid, NSW/AU authoritative) ────────────────────────
async function geoscapeSearch(q: string): Promise<AddressSuggestion[]> {
  const key = process.env.GEOSCAPE_API_KEY!;
  const url = `https://api.psma.com.au/v1/predictive/address?query=${encodeURIComponent(q)}&stateTerritory=NSW`;
  const res = await fetch(url, { headers: { Authorization: key }, next: { revalidate: 3600 } });
  if (!res.ok) return [];
  const data = await res.json();
  const sugg: Array<{ id: string; address: string }> = data.suggest ?? [];
  return sugg.slice(0, 6).map((s) => ({ id: "gs:" + s.id, label: s.address }));
}

async function geoscapeResolve(id: string): Promise<ResolvedAddress | null> {
  const key = process.env.GEOSCAPE_API_KEY!;
  const addrId = id.startsWith("gs:") ? id.slice(3) : id;
  const url = `https://api.psma.com.au/v1/predictive/address/${encodeURIComponent(addrId)}?ge:coordinates=true`;
  const res = await fetch(url, { headers: { Authorization: key } });
  if (!res.ok) return null;
  const d = await res.json();
  const a = d.address ?? d;
  const coords = a?.geo?.geometry?.coordinates ?? a?.coordinates;
  if (!coords || coords.length < 2) return null;
  return {
    full_address: a.formattedAddress ?? a.address ?? "",
    suburb: a.localityName ?? a.suburb ?? null,
    state: a.stateTerritory ?? "NSW",
    postcode: a.postcode ?? null,
    latitude: coords[1], // GeoJSON is [lng, lat]
    longitude: coords[0],
  };
}
