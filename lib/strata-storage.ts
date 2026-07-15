import { supabaseAdmin } from "@/lib/supabase-admin";

// Single public bucket for Strata Connect inbound-email attachments (work
// orders, scopes of works, PDFs, photos). Mirrors lib/jobs-storage — the bucket
// is created lazily on first upload so no manual dashboard step is needed.
//
// Public, for consistency with QuoteRequestFile URLs: on approval an intake's
// files are copied onto the resulting quote request and shown to businesses via
// their public URLs anyway, so the attachment lives at a public URL either way.
export const STRATA_BUCKET = "strata-intake-media";

export function hasStorageKey(): boolean {
  return Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export async function uploadStrataFile(path: string, buffer: Buffer, contentType: string): Promise<string> {
  await supabaseAdmin.storage.createBucket(STRATA_BUCKET, { public: true }).catch(() => {});
  const { error } = await supabaseAdmin.storage.from(STRATA_BUCKET).upload(path, buffer, { contentType, upsert: false });
  if (error) throw new Error(error.message);
  const { data } = supabaseAdmin.storage.from(STRATA_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
