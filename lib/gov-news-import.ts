// Turn a government publication found by lib/gov-original-source.ts into its
// own draft article, sitting alongside the third-party coverage it came from.
// Like every ingested article it lands as a draft — nothing reaches the site
// until an admin publishes it.

import { prisma } from "@/lib/prisma";
import { getCategoryImage } from "@/lib/news-categories";
import {
  findGovernmentOriginal,
  type LookupOptions,
  type SourceArticle,
} from "@/lib/gov-original-source";
import { isGovernmentSourceUrl, isGovernmentTopic } from "@/lib/gov-sources";

/**
 * Tag written back onto an article once we have gone looking for its official
 * source. It is how the sweep remembers what it has already tried — the table
 * has no column for it, and re-searching the same article every run would burn
 * the whole budget on articles the government never wrote about.
 */
export const GOV_CHECKED_TAG = "gov-source-checked";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 90);
}

export type GovImportOutcome =
  | { status: "created"; id: string; url: string; title: string }
  | { status: "duplicate"; url: string }
  | { status: "not_found" }
  | { status: "skipped" };

/** Remember that this article has been searched, so the sweep moves on. */
async function markChecked(id: string | undefined, tags: string[] | undefined) {
  if (!id) return;
  const next = Array.from(new Set([...(tags ?? []), GOV_CHECKED_TAG]));
  await prisma.industryNews.update({ where: { id }, data: { tags: next } }).catch(() => {});
}

/**
 * For one third-party article about a government matter, find the agency's own
 * publication and save it as a new draft. Returns what happened so the caller
 * can report it.
 */
export async function importGovernmentOriginal(
  article: SourceArticle & { id?: string; tags?: string[] },
  options: LookupOptions = {},
): Promise<GovImportOutcome> {
  // Only chase articles that are actually about a government matter, and only
  // when the article we have is somebody else's reporting of it.
  if (!isGovernmentTopic({ title: article.title, summary: article.summary, tags: article.tags })) {
    return { status: "skipped" };
  }
  if (isGovernmentSourceUrl(article.source_url)) return { status: "skipped" };

  const found = await findGovernmentOriginal(article, options);
  if (!found) {
    await markChecked(article.id, article.tags);
    return { status: "not_found" };
  }

  // One row per government publication, however many outlets covered it.
  const existing = await prisma.industryNews.findFirst({
    where: { source_url: found.url },
    select: { id: true },
  });
  if (existing) {
    await markChecked(article.id, article.tags);
    return { status: "duplicate", url: found.url };
  }

  const base = slugify(found.title) || `gov-${Date.now().toString(36)}`;
  const record = {
    title: found.title,
    summary: found.summary,
    industry_impact: found.impact,
    category: found.category,
    tags: found.tags,
    source_name: found.agency,
    source_url: found.url,
    published_date: found.published_date ? new Date(found.published_date) : new Date(),
    featured_image: getCategoryImage(found.category),
    status: "draft",
    priority: 1,
  };

  let created: { id: string };
  try {
    created = await prisma.industryNews.create({
      data: { ...record, slug: base },
      select: { id: true },
    });
  } catch {
    // Slug collision — the government's own titles repeat across years.
    created = await prisma.industryNews.create({
      data: { ...record, slug: `${base}-${Date.now().toString(36)}` },
      select: { id: true },
    });
  }

  await markChecked(article.id, article.tags);
  return { status: "created", id: created.id, url: found.url, title: found.title };
}

export type SweepResult = {
  considered: number;
  attempted: number;
  created: { id: string; title: string; url: string }[];
  duplicates: number;
  not_found: number;
  remaining: number;
};

/**
 * Work through articles that read like government matters but link to somebody
 * else's reporting, and pull in the official publication behind each one.
 *
 * Bounded twice over: `limit` attempts, and a wall-clock budget — a web search
 * plus a read of the official page is slow, and this has to return inside the
 * hosting platform's function timeout.
 */
export async function sweepForGovernmentOriginals({
  limit = 2,
  budgetMs = 45000,
  lookup = {},
}: {
  limit?: number;
  budgetMs?: number;
  lookup?: LookupOptions;
} = {}): Promise<SweepResult> {
  const deadline = Date.now() + budgetMs;

  // Newest first: an article about a code change matters most while it's live.
  const pool = await prisma.industryNews.findMany({
    where: {
      status: { not: "rejected" },
      NOT: { tags: { has: GOV_CHECKED_TAG } },
      summary: { not: null },
    },
    orderBy: { published_date: { sort: "desc", nulls: "last" } },
    take: 400,
    select: { id: true, title: true, summary: true, source_url: true, source_name: true, tags: true },
  });

  const candidates = pool.filter(
    (row) =>
      !isGovernmentSourceUrl(row.source_url) &&
      isGovernmentTopic({ title: row.title, summary: row.summary, tags: row.tags }),
  );

  const result: SweepResult = {
    considered: candidates.length,
    attempted: 0,
    created: [],
    duplicates: 0,
    not_found: 0,
    remaining: 0,
  };

  for (const candidate of candidates.slice(0, limit)) {
    const remainingMs = deadline - Date.now();
    if (remainingMs < 8000) break;

    result.attempted++;
    const outcome = await importGovernmentOriginal(
      {
        id: candidate.id,
        title: candidate.title,
        summary: candidate.summary,
        source_url: candidate.source_url,
        source_name: candidate.source_name,
        tags: candidate.tags,
      },
      { timeoutMs: remainingMs - 3000, ...lookup },
    );

    if (outcome.status === "created") {
      result.created.push({ id: outcome.id, title: outcome.title, url: outcome.url });
    } else if (outcome.status === "duplicate") {
      result.duplicates++;
    } else if (outcome.status === "not_found") {
      result.not_found++;
    }
  }

  result.remaining = Math.max(0, result.considered - result.attempted);
  return result;
}
