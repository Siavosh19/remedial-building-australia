"use client";

import { useState, useMemo, useCallback } from "react";
import { Search, ArrowRight, Clock } from "lucide-react";
import Image from "next/image";
import { FILTER_CATEGORIES, formatDate } from "@/lib/news-categories";

export type NewsArticle = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  tags: string[];
  source_name: string;
  source_url: string;
  published_date: string;
  priority: 1 | 2 | 3;
  featured_image: string;
};

function readingTime(text: string): string {
  const mins = Math.max(1, Math.round((text ?? "").trim().split(/\s+/).length / 200));
  return `${mins} min read`;
}

function excerpt(summary: string, maxLen = 155): string {
  if (!summary || summary.length <= maxLen) return summary;
  return summary.slice(0, maxLen).replace(/\s+\S*$/, "") + "…";
}

const ARTICLES_PER_PAGE = 12;

function getTime(d: string): number {
  if (!d) return -Infinity;
  const t = new Date(d).getTime();
  return isNaN(t) ? -Infinity : t;
}

const GradientFallback = () => (
  <div className="h-full w-full bg-gradient-to-br from-sky-900 to-sky-950" />
);

function NewsImage({ src, alt, priority = false, sizes }: { src: string; alt: string; priority?: boolean; sizes: string }) {
  const [errored, setErrored] = useState(false);
  const handleError = useCallback(() => setErrored(true), []);
  if (!src || errored) return <GradientFallback />;
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover transition duration-500 group-hover:scale-105"
      sizes={sizes}
      priority={priority}
      onError={handleError}
    />
  );
}

export function NewsGridClient({ articles }: { articles: NewsArticle[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);

  const isFiltering = searchQuery.trim().length > 0 || activeCategory !== "All";

  // Always sort newest-first as a client-side guarantee, regardless of server order
  const sortedArticles = useMemo(
    () => [...articles].sort((a, b) => getTime(b.published_date) - getTime(a.published_date)),
    [articles]
  );

  const filteredArticles = useMemo(() => {
    let pool = sortedArticles;
    if (activeCategory !== "All") {
      pool = pool.filter((a) => a.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      pool = pool.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.source_name.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return pool;
  }, [searchQuery, activeCategory, sortedArticles]);

  // Featured = always the newest article (sortedArticles[0])
  const featuredArticle = !isFiltering && sortedArticles.length > 0 ? sortedArticles[0] : null;
  const gridPool = isFiltering
    ? filteredArticles
    : filteredArticles.filter((a) => a.id !== featuredArticle?.id);
  const totalPages = Math.ceil(gridPool.length / ARTICLES_PER_PAGE);
  const paginatedArticles = gridPool.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  function handleCategoryChange(cat: string) {
    setActiveCategory(cat);
    setCurrentPage(1);
  }

  function handleSearch(q: string) {
    setSearchQuery(q);
    setCurrentPage(1);
  }

  return (
    <div>
      {/* ── Search + Filter bar ──────────────────────────────────────────── */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          {/* Search */}
          <div className="py-4">
            <div className="flex items-center gap-3 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 focus-within:border-sky-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-sky-100 transition">
              <Search className="shrink-0 text-slate-500" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search articles, topics or sources…"
                className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearch("")}
                  className="shrink-0 text-xs font-semibold text-slate-400 hover:text-slate-700"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          {/* Category filter */}
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {FILTER_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-sky-950 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl space-y-8 px-6 py-8">

        {/* Filter count */}
        {isFiltering && (
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">
              {filteredArticles.length} article{filteredArticles.length !== 1 ? "s" : ""} found
            </p>
            <button
              onClick={() => { handleSearch(""); handleCategoryChange("All"); }}
              className="text-xs font-bold text-sky-700 hover:text-red-700"
            >
              Clear
            </button>
          </div>
        )}

        {/* ── Featured article ────────────────────────────────────────── */}
        {featuredArticle && (
          <a
            href={`/industry-news/${featuredArticle.slug}`}
            className="group grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:shadow-xl lg:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 lg:aspect-auto lg:min-h-[320px]">
              <NewsImage
                src={featuredArticle.featured_image}
                alt={featuredArticle.title}
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full bg-red-700 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow">
                {featuredArticle.priority === 1 ? "Technical Focus" : "Latest"}
              </span>
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-10">
              <span className="inline-block w-fit rounded-md bg-sky-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-sky-950">
                {featuredArticle.category}
              </span>
              <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-slate-400">
                <span>{formatDate(featuredArticle.published_date)}</span>
                {featuredArticle.source_name && (
                  <>
                    <span>·</span>
                    <span>{featuredArticle.source_name}</span>
                  </>
                )}
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock size={10} />
                  {readingTime(featuredArticle.summary)}
                </span>
              </div>
              <h2 className="mt-3 text-2xl font-extrabold leading-tight text-sky-950 transition group-hover:text-sky-700 md:text-[1.6rem]">
                {featuredArticle.title}
              </h2>
              <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-500">
                {excerpt(featuredArticle.summary, 260)}
              </p>
              <span className="mt-5 flex items-center gap-1.5 text-sm font-bold text-sky-700 transition group-hover:text-red-700">
                Read original source <ArrowRight size={14} />
              </span>
            </div>
          </a>
        )}

        {/* ── Grid ─────────────────────────────────────────────────────── */}
        {paginatedArticles.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedArticles.map((article) => (
                <a
                  key={article.id}
                  href={`/industry-news/${article.slug}`}
                  className={`group flex flex-col overflow-hidden rounded-2xl border shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
                    article.priority === 1
                      ? "border-red-100 bg-white"
                      : article.priority === 3
                      ? "border-slate-100 bg-slate-50/60"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <NewsImage
                      src={article.featured_image}
                      alt={article.title}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {article.priority === 1 && (
                      <span className="absolute left-3 top-3 rounded-full bg-red-700 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow">
                        Technical Focus
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="inline-block w-fit rounded-md border border-sky-100 bg-sky-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-sky-800">
                      {article.category}
                    </span>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11px] text-slate-400">
                      <span>{formatDate(article.published_date)}</span>
                      {article.source_name && (
                        <>
                          <span>·</span>
                          <span className="max-w-[120px] truncate">{article.source_name}</span>
                        </>
                      )}
                      <span>·</span>
                      <span className="flex shrink-0 items-center gap-0.5">
                        <Clock size={10} />
                        {readingTime(article.summary)}
                      </span>
                    </div>
                    <h3 className="mt-2 flex-1 text-sm font-bold leading-snug text-sky-950 line-clamp-2 transition group-hover:text-sky-700">
                      {article.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
                      {excerpt(article.summary)}
                    </p>
                    <span className="mt-3 flex items-center gap-1 text-xs font-bold text-sky-700 transition group-hover:text-red-700">
                      Read original source <ArrowRight size={12} />
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm hover:border-sky-300 hover:text-sky-800 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ← Previous
                </button>
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`rounded-lg border px-3.5 py-2.5 text-sm font-semibold shadow-sm transition ${
                      page === currentPage
                        ? "border-sky-950 bg-sky-950 text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-800"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm hover:border-sky-300 hover:text-sky-800 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center">
            <p className="text-base font-semibold text-slate-400">No articles found.</p>
            <button
              onClick={() => { handleSearch(""); handleCategoryChange("All"); }}
              className="mt-4 text-sm font-bold text-sky-700 hover:text-red-700"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
