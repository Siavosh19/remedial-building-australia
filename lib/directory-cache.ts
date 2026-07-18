import { revalidateTag } from "next/cache";

// Tag shared by the directory search's cached match-row query (see
// app/api/directory/search/route.ts). Busting it drops the 5-minute freshness
// lag so a newly created / edited / published listing shows in search
// immediately, while normal repeat searches still hit the warm cache.
export const DIRECTORY_CACHE_TAG = "directory-companies";

// Call after any write that changes what search should return (create, profile
// edit, publish/unpublish, plan change). Best-effort — never let a cache bust
// break the primary action.
export function bustDirectoryCache(): void {
  try {
    // Next 16 requires a second "profile" arg. These are Route Handlers doing
    // read-your-own-writes (an edit must show in search immediately), so expire
    // the tag now rather than serve stale-while-revalidate. Per the Next docs,
    // `{ expire: 0 }` is the route-handler pattern for immediate expiration.
    revalidateTag(DIRECTORY_CACHE_TAG, { expire: 0 });
  } catch {
    /* ignore — cache invalidation is best-effort */
  }
}
