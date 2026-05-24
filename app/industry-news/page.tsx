"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { FILTER_CATEGORIES, getNewsImage, formatDate } from "@/lib/news-categories";
import { NewsletterSignup } from "@/components/NewsletterSignup";

// ─── Types ────────────────────────────────────────────────────────────────────

type NewsArticle = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  industry_impact: string;
  category: string;
  tags: string[];
  source_name: string;
  source_url: string;
  published_date: string;
  featured_image: string;
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function IndustryNewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      setFetchError(null);
      try {
        const { data, error } = await supabase
          .from("industry_news")
          .select(
            "id, title, slug, summary, industry_impact, category, tags, source_name, source_url, published_date, featured_image"
          )
          .eq("status", "published")
          .order("published_date", { ascending: false });

        if (error) throw error;
        setArticles(
          (data ?? []).map((row: Record<string, unknown>) => ({
            id: String(row.id ?? ""),
            title: String(row.title ?? ""),
            slug: String(row.slug ?? ""),
            summary: String(row.summary ?? ""),
            industry_impact: String(row.industry_impact ?? ""),
            category: String(row.category ?? "Other"),
            tags: Array.isArray(row.tags) ? (row.tags as string[]) : [],
            source_name: String(row.source_name ?? ""),
            source_url: String(row.source_url ?? ""),
            published_date: String(row.published_date ?? ""),
            featured_image: String(
              getNewsImage(String(row.category ?? "Other"), String(row.title ?? ""))
            ),
          }))
        );
      } catch (err) {
        setFetchError("Unable to load articles. Please try again later.");
        console.error("Supabase fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory]);

  const ARTICLES_PER_PAGE = 12;
  const isFiltering = searchQuery.trim().length > 0 || activeCategory !== "All";

  const filteredArticles = useMemo(() => {
    let pool = articles;
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
  }, [searchQuery, activeCategory, articles]);

  // Featured article: first article when not filtering
  const featuredArticle =
    !isFiltering && articles.length > 0 ? articles[0] : null;

  // Grid articles: exclude featured from the grid
  const gridPool = isFiltering ? filteredArticles : filteredArticles.slice(1);

  const totalPages = Math.ceil(gridPool.length / ARTICLES_PER_PAGE);
  const paginatedArticles = gridPool.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8 py-5">
          <a href="/" className="flex shrink-0 items-center gap-3">
            <div>
              <div className="text-lg font-extrabold tracking-tight text-sky-950">
                Remedial Building Australia
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-900">
                Technical Defect Database
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-sky-800 md:flex">
            <a href="/defect-library" className="whitespace-nowrap hover:text-red-700">Defect Library</a>
            <a href="/repair-systems" className="whitespace-nowrap hover:text-red-700">Repair Systems</a>
            <a href="/materials-products" className="whitespace-nowrap hover:text-red-700">Materials</a>
            <a href="/industry-news" className="whitespace-nowrap text-red-700">Industry News</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700">AI Scope Builder</a>
            <a
              href="/newsletter"
              className="whitespace-nowrap rounded-lg bg-red-700 px-4 py-2 text-sm text-white hover:bg-red-800 transition"
            >
              Subscribe
            </a>
          </nav>

          <a
            href="/"
            className="hidden shrink-0 rounded-xl bg-sky-700 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-800 md:inline-flex"
          >
            Home
          </a>
        </div>
      </header>

      <main>

        {/* ── Hero ───────────────────────────────────────────────────────────── */}
        <section className="bg-sky-950 px-8 py-10">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white">
              Industry News & Articles
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
              Industry News & Articles
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-sky-300">
              Tracking Australian remedial building updates — Building Commission NSW, waterproofing compliance, façade defects, strata issues, concrete repair and DBP Act developments.
            </p>

            <div className="mt-6 flex max-w-xl items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-5 py-3.5">
              <Search className="shrink-0 text-sky-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, topics or sources…"
                className="flex-1 bg-transparent text-sm text-white placeholder-sky-400 outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="shrink-0 text-xs font-semibold text-sky-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ── Category Filter Pills ────────────────────────────────────────── */}
        <div className="border-b border-slate-200 bg-white px-5">
          <div className="mx-auto max-w-7xl">
            <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
              {FILTER_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-sky-950 text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-sky-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Content ────────────────────────────────────────────────────────── */}
        <div className="mx-auto max-w-7xl px-5 py-10 space-y-10">

          {/* Loading state */}
          {loading && (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="animate-spin text-sky-700" size={36} />
            </div>
          )}

          {/* Error state */}
          {!loading && fetchError && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
              <p className="text-base font-semibold text-red-700">{fetchError}</p>
            </div>
          )}

          {/* Featured Article */}
          {!loading && !fetchError && featuredArticle && (
            <section>
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-block rounded-full bg-red-700 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  Latest
                </span>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                  Featured Article
                </p>
              </div>
              <a
                href={`/industry-news/${featuredArticle.slug}`}
                className="group grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg lg:grid-cols-[1fr_1fr]"
              >
                <div className="relative h-64 w-full overflow-hidden lg:h-auto">
                  <Image
                    src={getNewsImage(featuredArticle.category, featuredArticle.title)}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-col justify-center p-8">
                  <span className="inline-block w-fit rounded-md bg-sky-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-sky-950">
                    {featuredArticle.category}
                  </span>
                  <p className="mt-2 text-xs text-slate-400">
                    {formatDate(featuredArticle.published_date)}
                    {featuredArticle.source_name && ` · ${featuredArticle.source_name}`}
                  </p>
                  <h2 className="mt-4 text-2xl font-extrabold leading-tight text-sky-950 group-hover:text-sky-700">
                    {featuredArticle.title}
                  </h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-500">
                    {featuredArticle.summary}
                  </p>
                  <span className="mt-5 flex items-center gap-1.5 text-sm font-bold text-sky-700 group-hover:text-red-700">
                    Read Full Summary <ArrowRight size={14} />
                  </span>
                </div>
              </a>
            </section>
          )}

          {/* News Grid */}
          {!loading && !fetchError && (
            <section>
              {isFiltering && (
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">
                    {filteredArticles.length} article{filteredArticles.length !== 1 ? "s" : ""} found
                  </p>
                  <button
                    onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                    className="text-xs font-bold text-sky-700 hover:text-red-700"
                  >
                    Clear filters
                  </button>
                </div>
              )}

              {paginatedArticles.length > 0 ? (
                <>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {paginatedArticles.map((article) => (
                      <a
                        key={article.id}
                        href={`/industry-news/${article.slug}`}
                        className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                      >
                        <div className="relative h-44 w-full overflow-hidden">
                          <Image
                            src={getNewsImage(article.category, article.title)}
                            alt={article.title}
                            fill
                            className="object-cover transition duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                        <div className="flex flex-1 flex-col p-5">
                          <span className="inline-block w-fit rounded-md bg-sky-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-sky-950">
                            {article.category}
                          </span>
                          <p className="mt-1 text-xs text-slate-400">
                            {formatDate(article.published_date)}
                            {article.source_name && ` · ${article.source_name}`}
                          </p>
                          <h3 className="mt-2 flex-1 text-sm font-bold leading-snug text-sky-950 line-clamp-2 group-hover:text-sky-700">
                            {article.title}
                          </h3>
                          <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
                            {article.summary}
                          </p>
                          <span className="mt-3 flex items-center gap-1 text-xs font-bold text-sky-700 group-hover:text-red-700">
                            Read Summary <ArrowRight size={12} />
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="mt-10 flex items-center justify-center gap-3">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-sm hover:border-sky-300 hover:text-sky-800 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        ← Previous
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`rounded-lg border px-4 py-2.5 text-sm font-semibold shadow-sm transition ${
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
                        className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-sm hover:border-sky-300 hover:text-sky-800 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Next →
                      </button>
                    </div>
                  )}
                </>
              ) : (
                !loading && (
                  <div className="rounded-2xl border border-slate-200 bg-white py-20 text-center">
                    <p className="text-base font-semibold text-slate-400">No articles found.</p>
                    <button
                      onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                      className="mt-4 text-sm font-bold text-sky-700 hover:text-red-700"
                    >
                      Clear filters
                    </button>
                  </div>
                )
              )}
            </section>
          )}
        </div>

        {/* ── Newsletter ──────────────────────────────────────────────────────── */}
        <NewsletterSignup variant="section" />

      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-sky-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-12">
          <a
            href="/"
            className="inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-100"
          >
            ← Home
          </a>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">
              A structured Australian remedial building knowledge platform for defects, repair systems, materials and future AI-assisted scope writing.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm font-bold text-sky-950 md:grid-cols-3">
            <a href="/about" className="underline hover:text-sky-700">About</a>
            <a href="/terms" className="underline hover:text-sky-700">Terms</a>
            <a href="/contact" className="underline hover:text-sky-700">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
