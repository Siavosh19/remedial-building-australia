// Offline AU geocoder — resolves a suburb/state/postcode to approximate
// coordinates from a compact lookup built from the public-domain Australian
// postcode dataset. Used to keep new directory listings geocoded so they take
// part in the directory's nearest-first proximity ranking. No network / API cost.

import coords from "./au-postcode-coords.json";

type Pair = [number, number];
const byPostcode = coords.byPostcode as unknown as Record<string, Pair>;
const bySuburbState = coords.bySuburbState as unknown as Record<string, Pair>;

export type Coords = { latitude: number; longitude: number };

/**
 * Best-effort coordinates for a location. Prefers an exact suburb+state match
 * (most precise), then falls back to the postcode centroid. Returns null when
 * nothing matches (e.g. an invalid/garbage postcode), in which case the listing
 * simply ranks after geocoded ones within its state.
 */
export function geocodeAU(
  suburb: string | null | undefined,
  state: string | null | undefined,
  postcode: string | null | undefined,
): Coords | null {
  const sub = (suburb ?? "").trim().toUpperCase();
  const st = (state ?? "").trim().toUpperCase();
  const pc = (postcode ?? "").trim();

  if (sub && st) {
    const hit = bySuburbState[`${sub}|${st}`];
    if (hit) return { latitude: hit[0], longitude: hit[1] };
  }
  if (pc) {
    const hit = byPostcode[pc];
    if (hit) return { latitude: hit[0], longitude: hit[1] };
  }
  return null;
}
