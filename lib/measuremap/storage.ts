import "server-only";
import { supabaseAdmin } from "@/lib/supabase-admin";

// Private bucket for all MeasureMap uploads (PDF/JPG/PNG drawings). NEVER public.
// Files are read/written only server-side via the service-role client, and served
// to the browser exclusively through short-lived signed URLs. Object key layout:
//   {owner_user_id}/{project_id}/{drawing_id}/{filename}
export const MEASUREMAP_BUCKET = "measuremap-files";

/** Build the canonical storage path for a drawing file. */
export function drawingObjectPath(
  ownerUserId: number,
  projectId: string,
  drawingId: string,
  filename: string,
): string {
  const safe = filename.replace(/[^\w.\-]+/g, "_").slice(0, 180);
  return `${ownerUserId}/${projectId}/${drawingId}/${safe}`;
}

/**
 * Short-lived signed URL for a stored object. Generated on demand (never
 * persisted) so links can't leak. Returns null on failure so callers surface a
 * friendly "link expired / unavailable" state instead of throwing.
 */
export async function signedDrawingUrl(path: string, expiresInSeconds = 300): Promise<string | null> {
  try {
    const { data, error } = await supabaseAdmin.storage
      .from(MEASUREMAP_BUCKET)
      .createSignedUrl(path, expiresInSeconds);
    if (error || !data) return null;
    return data.signedUrl;
  } catch (err) {
    console.error("[measuremap] signed URL failed:", err);
    return null;
  }
}
