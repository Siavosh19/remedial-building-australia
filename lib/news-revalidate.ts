import { revalidatePath } from "next/cache";

// The public news surfaces are ISR-cached for an hour (see the `revalidate`
// exports on /industry-news, /industry-news/[slug], /rba-insights and
// /api/home-news). The admin writes status straight to Postgres, so without an
// explicit flush a freshly published article only appears on the next scheduled
// rebuild — up to an hour after the editor pressed Publish.
function flush(paths: (string | null | undefined)[]) {
  for (const path of paths) {
    if (!path) continue;
    try {
      revalidatePath(path);
    } catch (err) {
      console.error("[news revalidate] failed for", path, err);
    }
  }
}

// An industry-news article changed status / content. The homepage carousel and
// the news feed both read it; the article page only exists once it is live.
export function revalidateNews(slug?: string | null) {
  flush(["/api/home-news", "/industry-news", slug ? `/industry-news/${slug}` : null]);
}

// RBA Insights are mixed into the industry-news feed and sidebar as well as
// their own section, so an insight change has to flush both.
export function revalidateInsight(slug?: string | null) {
  flush([
    "/api/home-news",
    "/industry-news",
    "/rba-insights",
    slug ? `/rba-insights/${slug}` : null,
  ]);
}
