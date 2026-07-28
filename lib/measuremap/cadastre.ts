import "server-only";

// Look up the NSW cadastral Lot parcel that contains a point, so the workspace
// can highlight exactly which property a project refers to (not just show every
// lot line). Public NSW Spatial Services Cadastre service, layer 9 = Lot.
const LOT_QUERY =
  "https://maps.six.nsw.gov.au/arcgis/rest/services/public/NSW_Cadastre/MapServer/9/query";

export type Parcel = {
  geometry: unknown; // GeoJSON Polygon in EPSG:4326
  lotId: string | null; // e.g. "7063//DP93865"
  planLabel: string | null; // e.g. "DP93865"
  areaSqm: number | null;
};

export async function getParcelForPoint(lat: number, lng: number): Promise<Parcel | null> {
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
  try {
    const res = await fetch(`${LOT_QUERY}?${params.toString()}`, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    const d = await res.json();
    const f = d.features?.[0];
    if (!f?.geometry) return null;
    return {
      geometry: f.geometry,
      lotId: f.properties?.lotidstring ?? null,
      planLabel: f.properties?.planlabel ?? null,
      areaSqm: typeof f.properties?.shape_Area === "number" ? f.properties.shape_Area : null,
    };
  } catch (err) {
    console.error("[measuremap] parcel lookup failed:", err);
    return null;
  }
}
