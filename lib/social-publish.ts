// lib/social-publish.ts
// ─── Cross-post a published RBA Insights article to social ────────────────────
// Posts to a Facebook Page, an Instagram Business account and a LinkedIn
// organization (company) page. Each platform is INDEPENDENT and best-effort:
//   • a platform with no env config is skipped (not an error),
//   • a failure on one platform never blocks the others,
//   • nothing is written to the DB — the caller returns the per-platform
//     results to the admin UI so the human sees exactly what happened.
//
// Required env (per platform; omit a platform's vars to skip it):
//   FB_PAGE_ID, FB_PAGE_ACCESS_TOKEN            → Facebook Page
//   IG_BUSINESS_ACCOUNT_ID (+ FB_PAGE_ACCESS_TOKEN) → Instagram Business
//   LINKEDIN_ACCESS_TOKEN, LINKEDIN_ORG_ID      → LinkedIn company page
// NEXT_PUBLIC_SITE_URL is used to build the public article link.

import { prisma } from "@/lib/prisma";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.remedialbuildingaustralia.com.au").replace(/\/$/, "");
const GRAPH = "https://graph.facebook.com/v21.0";

export type PlatformResult = {
  platform: "facebook" | "instagram" | "linkedin";
  ok: boolean;
  skipped?: boolean; // config missing → not attempted
  id?: string;
  url?: string;
  error?: string;
};

type ArticleForShare = {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
  featured_image_url: string | null;
  status: string;
};

function articleUrl(slug: string): string {
  return `${SITE_URL}/rba-insights/${slug}`;
}

// Shared caption/commentary. Plain text; each platform renders the link its own
// way — FB/LinkedIn as a clickable card, Instagram as "link in bio" (IG captions
// can't have clickable links).
function buildCaption(a: ArticleForShare, url: string, opts?: { linkInBio?: boolean }): string {
  const parts = [a.title];
  if (a.summary) parts.push("", a.summary.trim());
  parts.push("", opts?.linkInBio ? "Read the full article — link in bio." : `Read more: ${url}`);
  parts.push("", "#strata #remedialbuilding #buildingdefects #propertymaintenance");
  return parts.join("\n").slice(0, 2100); // IG hard limit ~2200 chars
}

async function postToFacebook(a: ArticleForShare, url: string): Promise<PlatformResult> {
  const pageId = process.env.FB_PAGE_ID;
  const token = process.env.FB_PAGE_ACCESS_TOKEN;
  if (!pageId || !token) {
    return { platform: "facebook", ok: false, skipped: true, error: "Not configured (FB_PAGE_ID / FB_PAGE_ACCESS_TOKEN)." };
  }
  try {
    const res = await fetch(`${GRAPH}/${pageId}/feed`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: buildCaption(a, url), link: url, access_token: token }),
    });
    const data = (await res.json().catch(() => ({}))) as { id?: string; error?: { message?: string } };
    if (!res.ok) return { platform: "facebook", ok: false, error: data.error?.message ?? `HTTP ${res.status}` };
    return { platform: "facebook", ok: true, id: data.id, url: data.id ? `https://www.facebook.com/${data.id}` : undefined };
  } catch (e) {
    return { platform: "facebook", ok: false, error: String((e as Error)?.message ?? e) };
  }
}

async function postToInstagram(a: ArticleForShare, url: string): Promise<PlatformResult> {
  const igId = process.env.IG_BUSINESS_ACCOUNT_ID;
  const token = process.env.FB_PAGE_ACCESS_TOKEN;
  if (!igId || !token) {
    return { platform: "instagram", ok: false, skipped: true, error: "Not configured (IG_BUSINESS_ACCOUNT_ID / FB_PAGE_ACCESS_TOKEN)." };
  }
  if (!a.featured_image_url) {
    return { platform: "instagram", ok: false, error: "Instagram requires an image and this article has no featured image." };
  }
  const imageUrl = a.featured_image_url.startsWith("http") ? a.featured_image_url : `${SITE_URL}${a.featured_image_url}`;
  try {
    // 1) Create the media container.
    const createRes = await fetch(`${GRAPH}/${igId}/media`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image_url: imageUrl, caption: buildCaption(a, url, { linkInBio: true }), access_token: token }),
    });
    const createData = (await createRes.json().catch(() => ({}))) as { id?: string; error?: { message?: string } };
    if (!createRes.ok || !createData.id) {
      return { platform: "instagram", ok: false, error: createData.error?.message ?? `HTTP ${createRes.status} creating media` };
    }
    // 2) Publish the container.
    const pubRes = await fetch(`${GRAPH}/${igId}/media_publish`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ creation_id: createData.id, access_token: token }),
    });
    const pubData = (await pubRes.json().catch(() => ({}))) as { id?: string; error?: { message?: string } };
    if (!pubRes.ok) return { platform: "instagram", ok: false, error: pubData.error?.message ?? `HTTP ${pubRes.status} publishing` };
    return { platform: "instagram", ok: true, id: pubData.id };
  } catch (e) {
    return { platform: "instagram", ok: false, error: String((e as Error)?.message ?? e) };
  }
}

async function postToLinkedIn(a: ArticleForShare, url: string): Promise<PlatformResult> {
  const token = process.env.LINKEDIN_ACCESS_TOKEN;
  const orgId = process.env.LINKEDIN_ORG_ID; // numeric id or full "urn:li:organization:123"
  if (!token || !orgId) {
    return { platform: "linkedin", ok: false, skipped: true, error: "Not configured (LINKEDIN_ACCESS_TOKEN / LINKEDIN_ORG_ID)." };
  }
  const authorUrn = orgId.startsWith("urn:li:organization:") ? orgId : `urn:li:organization:${orgId}`;
  try {
    const res = await fetch("https://api.linkedin.com/v2/ugcPosts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
      },
      body: JSON.stringify({
        author: authorUrn,
        lifecycleState: "PUBLISHED",
        specificContent: {
          "com.linkedin.ugc.ShareContent": {
            shareCommentary: { text: buildCaption(a, url) },
            shareMediaCategory: "ARTICLE",
            media: [
              {
                status: "READY",
                originalUrl: url,
                title: { text: a.title.slice(0, 200) },
                ...(a.summary ? { description: { text: a.summary.slice(0, 250) } } : {}),
              },
            ],
          },
        },
        visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
      }),
    });
    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      return { platform: "linkedin", ok: false, error: `HTTP ${res.status}: ${errText.slice(0, 300)}` };
    }
    const postId = res.headers.get("x-restli-id") ?? undefined;
    return {
      platform: "linkedin",
      ok: true,
      id: postId,
      url: postId ? `https://www.linkedin.com/feed/update/${postId}` : undefined,
    };
  } catch (e) {
    return { platform: "linkedin", ok: false, error: String((e as Error)?.message ?? e) };
  }
}

export type ShareOutcome = { ok: boolean; url: string; results: PlatformResult[] };

// Orchestrator: load the article (must be published), then post to the requested
// platforms in parallel. Every result is captured; unconfigured platforms come
// back as skipped. Returns everything for the admin UI to display.
export async function shareArticleToSocial(
  articleId: number,
  platforms?: Array<"facebook" | "instagram" | "linkedin">,
): Promise<ShareOutcome> {
  const article = await prisma.rbaInsightsArticle.findUnique({
    where: { id: articleId },
    select: { id: true, title: true, slug: true, summary: true, featured_image_url: true, status: true },
  });
  if (!article) throw new Error("Article not found.");
  if (article.status !== "published") throw new Error("Only published articles can be shared to social.");

  const url = articleUrl(article.slug);
  const want = new Set(platforms && platforms.length ? platforms : (["facebook", "instagram", "linkedin"] as const));

  const tasks: Array<Promise<PlatformResult>> = [];
  if (want.has("facebook")) tasks.push(postToFacebook(article, url));
  if (want.has("instagram")) tasks.push(postToInstagram(article, url));
  if (want.has("linkedin")) tasks.push(postToLinkedIn(article, url));

  const results = await Promise.all(tasks);
  return { ok: results.some((r) => r.ok), url, results };
}
