import { supabaseAdmin } from "@/lib/supabase-admin";

// Single public bucket for all jobs-board uploads (résumés + company logos).
export const JOBS_BUCKET = "jobs-media";

export async function uploadJobFile(path: string, buffer: Buffer, contentType: string): Promise<string> {
  await supabaseAdmin.storage.createBucket(JOBS_BUCKET, { public: true }).catch(() => {});
  const { error } = await supabaseAdmin.storage.from(JOBS_BUCKET).upload(path, buffer, { contentType, upsert: false });
  if (error) throw new Error(error.message);
  const { data } = supabaseAdmin.storage.from(JOBS_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
