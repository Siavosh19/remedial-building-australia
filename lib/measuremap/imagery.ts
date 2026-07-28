// NSW Spatial Services imagery configuration. Public ArcGIS REST services,
// used under CC BY 4.0 with attribution. No API key required.
//   Full map (Phase 3) is loaded with OpenLayers from the WMTS/REST service;
//   here we also expose a keyless STATIC export URL for dashboard thumbnails.

export const NSW_IMAGERY_SERVICE =
  "https://maps.six.nsw.gov.au/arcgis/rest/services/public/NSW_Imagery/MapServer";
export const NSW_CADASTRE_SERVICE =
  "https://maps.six.nsw.gov.au/arcgis/rest/services/public/NSW_Cadastre/MapServer";

export const NSW_ATTRIBUTION = "Imagery © NSW Spatial Services (CC BY 4.0)";

export const AERIAL_DISCLAIMER =
  "Aerial measurements are approximate and must be verified against drawings or onsite conditions.";

/**
 * Keyless static aerial thumbnail centred on a point, via the ArcGIS MapServer
 * export endpoint. `spanDeg` controls how much ground is shown (~0.0016° ≈ 180m).
 * Returns null when coordinates are missing so callers show a placeholder.
 */
export function nswImageryThumbUrl(
  latitude: number | null | undefined,
  longitude: number | null | undefined,
  width = 480,
  height = 300,
  spanDeg = 0.0016,
): string | null {
  if (!Number.isFinite(latitude as number) || !Number.isFinite(longitude as number)) return null;
  const lat = latitude as number;
  const lng = longitude as number;
  const aspect = width / height;
  const dLng = spanDeg;
  const dLat = spanDeg / aspect;
  const bbox = `${lng - dLng},${lat - dLat},${lng + dLng},${lat + dLat}`;
  const params = new URLSearchParams({
    bbox,
    bboxSR: "4326",
    imageSR: "3857",
    size: `${width},${height}`,
    format: "png",
    transparent: "false",
    f: "image",
  });
  return `${NSW_IMAGERY_SERVICE}/export?${params.toString()}`;
}
