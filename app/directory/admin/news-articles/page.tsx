import { prisma } from "@/lib/prisma";
import { reviewTier, isGovernmentTier, tierHint, TIER_STYLE, TRUSTED_DOMAINS } from "@/lib/news-source-tiers";
import { publishFlags, shortSummary, FLAG_STYLE } from "@/lib/news-publish-check";
import type { Prisma } from "@prisma/client";
import { ExternalLink } from "lucide-react";
import RemoveNewsButton from "./RemoveNewsButton";
import RecycleNewsButton from "./RecycleNewsButton";
import UnpublishNewsButton from "./UnpublishNewsButton";
import PublishNewsButton from "./PublishNewsButton";
import GovSweepButton from "./GovSweepButton";
import CategorySelect from "./CategorySelect";
import NewsletterToggle from "./NewsletterToggle";
import SummariseRejectedButton from "./SummariseRejectedButton";

export const dynamic = "force-dynamic";

const SITE = "https://www.remedialbuildingaustralia.com.au";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "draft", label: "Drafts" },
  { key: "published", label: "Published" },
  { key: "rejected", label: "Rejected" },
  { key: "government", label: "Government" },
  { key: "trusted", label: "Industry bodies" },
  { key: "newsletter", label: "In newsletter" },
] as const;

type NewsRow = {
  id: string | number;
  title: string;
  slug: string | null;
  category: string | null;
  summary: string | null;
  source_name: string | null;
  source_url: string | null;
  published_date: string | null;
  tags: string[];
  status: string | null;
  include_in_newsletter: boolean | null;
};

// Anything that is not explicitly published or rejected is a draft waiting to
// be reviewed — that includes older rows with a null status.
function statusLabel(status: string | null): string {
  if (status === "published") return "published";
  if (status === "rejected") return "rejected";
  return "draft";
}

function statusPill(status: string | null): string {
  if (status === "published") return "bg-emerald-100 text-emerald-700";
  if (status === "rejected") return "bg-rose-100 text-rose-700";
  return "bg-amber-100 text-amber-700";
}

function fmtDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return isNaN(d.getTime()) ? "—" : d.toLocaleDateString("en-AU");
}

export default async function AdminNewsArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const active = FILTERS.some((f) => f.key === status) ? (status as string) : "all";

  const where: Prisma.IndustryNewsWhereInput =
    active === "newsletter"
      ? { include_in_newsletter: true }
      : active === "government"
        // Anything with a government angle — the agency's own site, or someone
        // else's write-up of a regulator, an Act, a code or an NCC building
        // class. Keyword matching happens in lib/gov-sources.ts, which SQL
        // cannot express, so this pulls the rows and sifts them below.
        ? {}
        : active === "trusted"
          // Published BY an industry peak body — same idea as the government
          // filter, one tier down. Matched on the body's own domain.
          ? { OR: TRUSTED_DOMAINS.map((d) => ({ source_url: { contains: d } })) }
          : active === "all"
            ? {}
            : active === "draft"
              // Legacy rows with no status have never been reviewed either.
              ? { OR: [{ status: "draft" }, { status: null }] }
              : { status: active };

  let rows: NewsRow[] = [];
  let selectedCount = 0;
  let unsummarisedRejects = 0;
  try {
    const [found, queued, bare] = await Promise.all([
      prisma.industryNews.findMany({
        where,
        orderBy: { published_date: { sort: "desc", nulls: "last" } },
        // The government tab has no SQL to narrow it, so it reads the archive
        // and sifts afterwards — a bigger ceiling, or the oldest matches fall
        // off the end of a list that was never filtered in the first place.
        take: active === "government" ? 4000 : 1000,
        select: {
          id: true,
          title: true,
          slug: true,
          category: true,
          summary: true,
          source_name: true,
          source_url: true,
          published_date: true,
          tags: true,
          status: true,
          include_in_newsletter: true,
        },
      }),
      // How many articles are currently queued for the next newsletter send.
      // Only published ones count — the send skips drafts, so a queued draft
      // would otherwise inflate this number.
      prisma.industryNews.count({ where: { include_in_newsletter: true, status: "published" } }),
      // Rejected articles that predate the reject note the ingest now writes.
      prisma.industryNews.count({
        where: { status: "rejected", OR: [{ summary: null }, { summary: "" }] },
      }),
    ]);
    rows = found.map((r) => ({
      ...r,
      tags: r.tags ?? [],
      published_date: r.published_date ? r.published_date.toISOString() : null,
    }));
    if (active === "government") rows = rows.filter((r) => isGovernmentTier(reviewTier(r)));
    selectedCount = queued;
    unsummarisedRejects = bare;
  } catch (err) {
    console.error("[admin/news-articles] query failed:", err);
  }

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-slate-900">News Articles</h1>
        <p className="mt-1 text-sm text-slate-500">
          Every article arrives as a <span className="font-semibold text-slate-700">draft</span> — nothing goes on the
          website until you publish it, and anything published can be unpublished again at any time. Each row carries a
          short summary so you can decide without opening it; click <span className="font-semibold text-sky-700">Read</span> for
          the full article and its original source link.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          <span className="rounded bg-slate-200 px-1 font-semibold text-slate-800">Grey</span> rows have a government
          angle — a regulator, an Act, the Code, an NCC building class — whether they come from the agency&apos;s own
          site (darker grey, marked <span className="font-semibold text-slate-700">Gov source</span>) or from a news
          outlet writing about it. <span className="rounded bg-emerald-100 px-1 font-semibold text-emerald-800">Green</span>{" "}
          rows come from an industry peak body (Master Builders, HIA, Strata Community Association and the like). Both
          are the safest to publish. <span className="rounded border border-slate-200 bg-white px-1 font-semibold text-slate-700">White</span>{" "}
          rows are the ordinary trade, product and market stories the search feeds turned up — they stand out because
          they are the ones that need reading before you publish.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          The small tags under each summary are the legal points to check before publishing — hover one to see what it
          means. <span className="rounded bg-rose-100 px-1 font-semibold text-rose-700">Red</span> means read the article
          first. They are prompts, not a legal opinion. Use <span className="font-semibold text-emerald-700">Add</span> to
          pick which published articles go in the next newsletter. Rejected articles carry a line of their own — what
          the article was, and why it did not make it — so the <span className="font-semibold text-slate-700">Rejected</span>{" "}
          tab can be read for mistakes without opening every link.
        </p>
      </div>

      {/* Newsletter queue status */}
      <div className="mb-5 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm text-emerald-800">
        {selectedCount ? (
          <span>
            <strong>{selectedCount}</strong> article{selectedCount === 1 ? "" : "s"} queued for the next newsletter.
            Only these will be sent (newest first, up to 8). Selection clears automatically after the send.
          </span>
        ) : (
          <span>
            No articles selected — the next newsletter will fall back to the <strong>latest 8 published</strong>.
            Click <strong>Add</strong> on the articles you want to curate a specific send.
          </span>
        )}
      </div>

      <GovSweepButton />

      <SummariseRejectedButton outstanding={unsummarisedRejects} />

      {/* Filter tabs */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <a
            key={f.key}
            href={f.key === "all" ? "/directory/admin/news-articles" : `/directory/admin/news-articles?status=${f.key}`}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
              active === f.key
                ? "bg-sky-950 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-800"
            }`}
          >
            {f.label}
          </a>
        ))}
        <span className="ml-auto self-center text-xs text-slate-400">{rows.length} shown</span>
      </div>

      {/* Mobile: stacked cards (the table is too wide to use on a phone) */}
      <div className="space-y-3 md:hidden">
        {rows.map((r) => {
          const isPublished = r.status === "published";
          const isRejected = r.status === "rejected";
          const readUrl = `/news-preview/${r.id}`;
          const liveUrl = isPublished && r.slug ? `${SITE}/industry-news/${r.slug}` : null;
          const tier = reviewTier(r);
          const style = TIER_STYLE[tier];
          // The two-paragraph article summary, cut to a line or two — enough to
          // decide on without opening it. Flags are the legal points to check.
          const summary = shortSummary(r.summary);
          const flags = publishFlags(r);
          return (
            <div key={String(r.id)} className={`rounded-xl border p-4 shadow-sm ${style.card}`}>
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold text-slate-900">
                  {style.label && (
                    <span
                      title={tierHint(r, tier)}
                      className={`mr-2 cursor-help rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${style.badge}`}
                    >
                      {style.label}
                    </span>
                  )}
                  {r.title || "—"}
                </p>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusPill(r.status)}`}>
                  {statusLabel(r.status)}
                </span>
              </div>
              <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                <a href={readUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-sky-700 hover:text-sky-900 hover:underline">
                  Read <ExternalLink size={11} />
                </a>
                {liveUrl && (
                  <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 hover:underline">
                    Live page <ExternalLink size={11} />
                  </a>
                )}
                {r.source_url && (
                  <a href={r.source_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 hover:underline">
                    Original source <ExternalLink size={11} />
                  </a>
                )}
              </div>
              {summary && (
                <p className="mt-2 max-w-3xl text-xs leading-relaxed text-slate-600">{summary}</p>
              )}
              {flags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {flags.map((f, i) => (
                    <span
                      key={i}
                      title={f.detail}
                      className={`cursor-help rounded px-1.5 py-0.5 text-[10px] font-semibold ${FLAG_STYLE[f.level]}`}
                    >
                      {f.level === "caution" ? "\u26a0 " : ""}
                      {f.label}
                    </span>
                  ))}
                </div>
              )}
              <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                <div className="min-w-0">
                  <dt className="mb-1 font-semibold text-slate-400">Category</dt>
                  <dd><CategorySelect id={String(r.id)} current={r.category || "Other"} /></dd>
                </div>
                <div className="min-w-0">
                  <dt className="mb-1 font-semibold text-slate-400">Source</dt>
                  <dd className="truncate text-slate-600">{r.source_name || "—"}</dd>
                </div>
                <div>
                  <dt className="mb-1 font-semibold text-slate-400">Published</dt>
                  <dd className="text-slate-500">{fmtDate(r.published_date)}</dd>
                </div>
                <div>
                  <dt className="mb-1 font-semibold text-slate-400">Newsletter</dt>
                  <dd>
                    {isPublished ? (
                      <NewsletterToggle id={String(r.id)} selected={!!r.include_in_newsletter} />
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </dd>
                </div>
              </dl>
              <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-slate-100 pt-3">
                <a
                  href={`/directory/admin/news-articles/${r.id}/edit`}
                  className="rounded-lg border border-sky-200 px-3 py-1.5 text-xs font-semibold text-sky-700 hover:bg-sky-50 transition"
                >
                  Edit
                </a>
                {isPublished ? (
                  <UnpublishNewsButton id={String(r.id)} />
                ) : isRejected ? (
                  <RecycleNewsButton id={String(r.id)} />
                ) : (
                  <PublishNewsButton id={String(r.id)} />
                )}
                <RemoveNewsButton id={String(r.id)} />
              </div>
            </div>
          );
        })}
        {!rows.length && (
          <p className="rounded-xl border border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-400">No articles in this view.</p>
        )}
      </div>

      {/* Desktop: full table (scrolls horizontally on narrow tablets as a fallback) */}
      <div className="hidden overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Title</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Category</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Source</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Published</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Newsletter</th>
              <th className="px-4 py-3 text-right font-semibold text-slate-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const isPublished = r.status === "published";
              const isRejected = r.status === "rejected";
              const readUrl = `/news-preview/${r.id}`;
              const liveUrl = isPublished && r.slug ? `${SITE}/industry-news/${r.slug}` : null;
              const tier = reviewTier(r);
              const style = TIER_STYLE[tier];
              // The two-paragraph article summary, cut to a line or two — enough to
              // decide on without opening it. Flags are the legal points to check.
              const summary = shortSummary(r.summary);
              const flags = publishFlags(r);
              return (
                <tr
                  key={String(r.id)}
                  className={`border-b align-top transition ${style.row}`}
                >
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-900">
                      {style.label && (
                        <span
                          title={tierHint(r, tier)}
                          className={`mr-2 cursor-help rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${style.badge}`}
                        >
                          {style.label}
                        </span>
                      )}
                      {r.title || "—"}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                      <a href={readUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-sky-700 hover:text-sky-900 hover:underline">
                        Read <ExternalLink size={11} />
                      </a>
                      {liveUrl && (
                        <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 hover:underline">
                          Live page <ExternalLink size={11} />
                        </a>
                      )}
                      {r.source_url && (
                        <a href={r.source_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 hover:underline">
                          Original source <ExternalLink size={11} />
                        </a>
                      )}
                    </div>
                    {summary && (
                      <p className="mt-2 max-w-3xl text-xs leading-relaxed text-slate-600">{summary}</p>
                    )}
                    {flags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {flags.map((f, i) => (
                          <span
                            key={i}
                            title={f.detail}
                            className={`cursor-help rounded px-1.5 py-0.5 text-[10px] font-semibold ${FLAG_STYLE[f.level]}`}
                          >
                            {f.level === "caution" ? "\u26a0 " : ""}
                            {f.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <CategorySelect id={String(r.id)} current={r.category || "Other"} />
                  </td>
                  <td className="px-4 py-3 text-slate-600">{r.source_name || "—"}</td>
                  <td className="px-4 py-3 text-xs text-slate-400">{fmtDate(r.published_date)}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusPill(r.status)}`}>
                      {statusLabel(r.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {isPublished ? (
                      <NewsletterToggle id={String(r.id)} selected={!!r.include_in_newsletter} />
                    ) : (
                      <span className="text-xs text-slate-300">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap items-center justify-end gap-1.5">
                      <a
                        href={`/directory/admin/news-articles/${r.id}/edit`}
                        className="rounded-lg border border-sky-200 px-3 py-1.5 text-xs font-semibold text-sky-700 hover:bg-sky-50 transition"
                      >
                        Edit
                      </a>
                      {isPublished ? (
                        <UnpublishNewsButton id={String(r.id)} />
                      ) : isRejected ? (
                        <RecycleNewsButton id={String(r.id)} />
                      ) : (
                        <PublishNewsButton id={String(r.id)} />
                      )}
                      <RemoveNewsButton id={String(r.id)} />
                    </div>
                  </td>
                </tr>
              );
            })}
            {!rows.length && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-slate-400">No articles in this view.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
