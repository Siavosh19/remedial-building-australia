import "server-only";

// ============================================================================
// MeasureMap address lookup / geocoding — provider-agnostic service.
//
// The active provider is chosen by env MEASUREMAP_GEOCODER:
//   "google"    → Google Geocoding API   (needs GOOGLE_MAPS_API_KEY)
//   "geoscape"  → Geoscape Predictive    (needs GEOSCAPE_API_KEY)
//   "nominatim" → OpenStreetMap, keyless  (DEFAULT — works with no setup)
//
// If a paid provider is selected but its key is missing, we fall back to
// Nominatim and warn, so a missing key degrades gracefully instead of breaking
// project creation. Callers only ever touch searchAddresses()/resolveAddress().
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

type Provider = "google" | "geoscape" | "nominatim";

const UA = "RemedialBuildingAustralia-MeasureMap/1.0 (info@remedialbuildingaustralia.com.au)";

function activeProvider(): Provider {
  const want = (process.env.MEASUREMAP_GEOCODER ?? "nominatim").toLowerCase();
  if (want === "google" && !process.env.GOOGLE_MAPS_API_KEY) {
    console.warn("[measuremap] MEASUREMAP_GEOCODER=google but GOOGLE_MAPS_API_KEY unset — using nominatim");
    return "nominatim";
  }
  if (want === "geoscape" && !process.env.GEOSCAPE_API_KEY) {
    console.warn("[measuremap] MEASUREMAP_GEOCODER=geoscape but GEOSCAPE_API_KEY unset — using nominatim");
    return "nominatim";
  }
  if (want === "google" || want === "geoscape") return want;
  return "nominatim";
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
      default:
        return await nominatimSearch(q);
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
      default:
        return await nominatimResolve(id);
    }
  } catch (err) {
    console.error("[measuremap] address resolve failed:", err);
    return null;
  }
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
