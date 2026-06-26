import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-only Supabase client using the service-role key. Bypasses RLS, so it
// must NEVER be imported into client components. Use for trusted server routes
// that read/write protected tables / storage (e.g. uploads), where the public
// anon key must not have access.
//
// The client is created lazily on first use rather than at module load: with an
// empty key createClient() throws, which would crash any route module that
// merely imports this file (e.g. during build-time page-data collection).
// Callers already guard on SUPABASE_SERVICE_ROLE_KEY before using it.
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://krttmsatnftkdnbtwouy.supabase.co";

let cached: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (!cached) {
    cached = createClient(SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY ?? "", {
      auth: { persistSession: false },
    });
  }
  return cached;
}

// Proxy preserves the existing `supabaseAdmin.storage.…` call sites while
// deferring construction until the first property access at runtime.
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    return Reflect.get(getClient() as object, prop, receiver);
  },
});
