import "server-only";

// Look up the NSW cadastral Lot parcel for a project so the workspace can
// highlight EXACTLY which property it refers to (not every lot in the street).
// Public NSW Spatial Services Cadastre service, layer 9 = Lot.
//
// Geocoders (esp. the keyless Nominatim fallback) often drop the address point on
// the road centre-line, which is inside no lot. So we first try a strict
// point-in-polygon hit, then fall back to the nearest lot within a small radius.
const LOT_QUERY =
  "https://maps.six.nsw.gov.au/arcgis/rest/services/public/NSW_Cadastre/MapServer/9/query";

export type Parcel = {
  geometry: unknown; // GeoJSON Polygon in EPSG:4326
  lotId: string | null; // e.g. "7063//DP93865"
  planLabel: string | null;
  areaSqm: number | null;
};

type GjFeature = {
  geometry: { type: string; coordinates: number[][][] | number[][][][] };
  properties?: Record<string, unknown>;
};

async function queryLots(lat: number, lng: number, distanceMetres: number): Promise<GjFeature[]> {
  const params = new URLSearchParams({
    geometry: `${lng},${lat}`,
    geometryType: "esriGeometryPoint",
    inSR: "4326",
    spatialRel: "esriSpatialRelIntersects",
    outFields: "lotidstring,planlabel,shape_Area",
    returnGeometry: "true",
    outSR: "4326",
    f: "geojson",
  });
  if (distanceMetres > 0) {
    params.set("distance", String(distanceMetres));
    params.set("units", "esriSRUnit_Meter");
  }
  const res = await fetch(`${LOT_QUERY}?${params.toString()}`, { next: { revalidate: 86400 } });
  if (!res.ok) return [];
  const d = await res.json();
  return (d.features ?? []) as GjFeature[];
}

// Rough centroid of a (multi)polygon's first ring — good enough to rank nearest.
function ringCentroid(f: GjFeature): [number, number] | null {
  const c = f.geometry?.coordinates as unknown;
  // Polygon: number[][][]; MultiPolygon: number[][][][]
  const ring = (Array.isArray(c) && Array.isArray(c[0]) && Array.isArray((c[0] as unknown[])[0]) && typeof ((c as number[][][])[0][0][0]) === "number"
    ? (c as number[][][])[0]
    : (c as number[][][][])[0]?.[0]) as number[][] | undefined;
  if (!ring || !ring.length) return null;
  let x = 0, y = 0;
  for (const [px, py] of ring) { x += px; y += py; }
  return [x / ring.length, y / ring.length];
}

function toParcel(f: GjFeature): Parcel {
  const p = f.properties ?? {};
  return {
    geometry: f.geometry,
    lotId: (p.lotidstring as string) ?? null,
    planLabel: (p.planlabel as string) ?? null,
    areaSqm: typeof p.shape_Area === "number" ? (p.shape_Area as number) : null,
  };
}

export async function getParcelForPoint(lat: number, lng: number): Promise<Parcel | null> {
  try {
    // 1. Strict: the lot the point falls inside.
    const exact = await queryLots(lat, lng, 0);
    if (exact.length) return toParcel(exact[0]);

    // 2. Fallback: nearest lot within 35 m (handles road-centreline geocodes).
    const near = await queryLots(lat, lng, 35);
    if (!near.length) return null;
    near.sort((a, b) => {
      const ca = ringCentroid(a), cb = ringCentroid(b);
      if (!ca) return 1;
      if (!cb) return -1;
      const da = (ca[0] - lng) ** 2 + (ca[1] - lat) ** 2;
      const db = (cb[0] - lng) ** 2 + (cb[1] - lat) ** 2;
      return da - db;
    });
    return toParcel(near[0]);
  } catch (err) {
    console.error("[measuremap] parcel lookup failed:", err);
    return null;
  }
}
