"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Mail, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

// ─── Types ────────────────────────────────────────────────────────────────────

type Article = {
  id: string;
  title: string;
  slug: string;
  category: string;
  source: string;
  publishedDate: string;
  image: string;
  excerpt: string;
  sourceUrl: string;
  tags: string[];
  featured: boolean;
};

// Row shape coming back from Supabase (snake_case DB columns)
type DbRow = {
  id: string | number;
  title: string;
  slug?: string;
  category?: string;
  source?: string;
  date_published?: string;
  published_date?: string;
  image?: string;
  image_url?: string;
  excerpt?: string;
  source_url?: string;
  external_url?: string;
  tags?: string[] | string;
  featured?: boolean;
  status?: string;
};

function mapRow(row: DbRow): Article {
  return {
    id: String(row.id),
    title: row.title ?? "",
    slug: row.slug ?? String(row.id),
    category: row.category ?? "General",
    source: row.source ?? "Remedial Building Australia",
    publishedDate: row.date_published ?? row.published_date ?? new Date().toISOString(),
    image: row.image ?? row.image_url ?? "/Images/Categories/facade-external-envelope.jpg",
    excerpt: row.excerpt ?? "",
    sourceUrl: row.source_url ?? row.external_url ?? "#",
    tags: Array.isArray(row.tags)
      ? row.tags
      : typeof row.tags === "string"
      ? row.tags.split(",").map((t: string) => t.trim())
      : [],
    featured: row.featured ?? false,
  };
}

// ─── Static category list ─────────────────────────────────────────────────────

const CATEGORIES = [
  "All",
  "Building Commission NSW",
  "Class 2 Buildings",
  "Waterproofing Defects",
  "Concrete Repair",
  "Façade Defects",
  "Strata Defects",
  "DBP Act",
  "Remedial Construction",
  "Building Defects",
  "Product & Material Updates",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ─── Components ───────────────────────────────────────────────────────────────

function CategoryPill({ label }: { label: string }) {
  return (
    <span className="inline-block shrink-0 rounded-md bg-sky-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-sky-950">
      {label}
    </span>
  );
}

// Large card — used for the primary featured article
function FeaturedMainCard({ article }: { article: Article }) {
  const hasUrl = article.sourceUrl && article.sourceUrl !== "#";
  return (
    <div className="flex overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="w-52 shrink-0 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <CategoryPill label={article.category} />
        <span className="mt-1.5 text-xs text-slate-400">{formatDate(article.publishedDate)}</span>
        {hasUrl ? (
          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 text-lg font-bold leading-snug text-sky-950 hover:underline hover:text-sky-700 cursor-pointer"
          >
            {article.title}
          </a>
        ) : (
          <h2 className="mt-3 text-lg font-bold leading-snug text-sky-950">{article.title}</h2>
        )}
        <p className="mt-2 flex-1 text-sm leading-6 text-slate-500 line-clamp-3">{article.excerpt}</p>
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="text-xs font-semibold text-slate-400">Source: {article.source}</span>
          {hasUrl && (
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-bold text-sky-700 hover:text-red-700"
            >
              Read Article <ArrowRight size={12} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// Stacked card — used for the two secondary featured articles
function FeaturedSideCard({ article }: { article: Article }) {
  const hasUrl = article.sourceUrl && article.sourceUrl !== "#";
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="h-32 w-full shrink-0 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <CategoryPill label={article.category} />
        <span className="mt-1.5 text-xs text-slate-400">{formatDate(article.publishedDate)}</span>
        {hasUrl ? (
          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex-1 text-sm font-bold leading-snug text-sky-950 hover:underline hover:text-sky-700 cursor-pointer"
          >
            {article.title}
          </a>
        ) : (
          <h3 className="mt-2 flex-1 text-sm font-bold leading-snug text-sky-950">{article.title}</h3>
        )}
        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="text-xs font-semibold text-slate-400">Source: {article.source}</span>
          {hasUrl && (
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-bold text-sky-700 hover:text-red-700"
            >
              Read Article <ArrowRight size={12} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// Standard grid card — used in Latest News section
function NewsCard({ article }: { article: Article }) {
  const hasUrl = article.sourceUrl && article.sourceUrl !== "#";
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="h-36 w-full shrink-0 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <CategoryPill label={article.category} />
        <span className="mt-1.5 text-xs text-slate-400">{formatDate(article.publishedDate)}</span>
        {hasUrl ? (
          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex-1 text-sm font-bold leading-snug text-sky-950 hover:underline hover:text-sky-700 cursor-pointer"
          >
            {article.title}
          </a>
        ) : (
          <h3 className="mt-2 flex-1 text-sm font-bold leading-snug text-sky-950">{article.title}</h3>
        )}
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">{article.excerpt}</p>
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="text-xs font-semibold text-slate-400">Source: {article.source}</span>
          {hasUrl && (
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-bold text-sky-700 hover:text-red-700"
            >
              Read Article <ArrowRight size={12} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function IndustryNewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      setFetchError(null);
      try {
        const { data, error } = await supabase
          .from("news_articles")
          .select("*")
          .eq("status", "published")
          .order("date_published", { ascending: false });

        if (error) throw error;
        setArticles((data as DbRow[]).map(mapRow));
      } catch (err) {
        setFetchError("Unable to load articles. Please try again later.");
        console.error("Supabase fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  const featuredArticles = useMemo(
    () => articles.filter((a) => a.featured).slice(0, 3),
    [articles]
  );

  const isFiltering = searchQuery.trim().length > 0 || activeCategory !== "All";

  const filteredArticles = useMemo(() => {
    let pool = isFiltering ? articles : articles.filter((a) => !a.featured);
    if (activeCategory !== "All") {
      pool = pool.filter((a) => a.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      pool = pool.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.source.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return pool;
  }, [searchQuery, activeCategory, isFiltering, articles]);

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

        <div className="h-1 w-full bg-red-700" />

        {/* ── Category Filter ────────────────────────────────────────────────── */}
        <section className="border-b border-slate-200 bg-white px-5 py-3">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-md px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] transition ${
                    activeCategory === cat
                      ? "bg-sky-950 text-white"
                      : "border border-slate-200 bg-white text-slate-500 hover:border-sky-300 hover:text-sky-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

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

          {/* Featured — hidden when loading, error, or filtering */}
          {!loading && !fetchError && !isFiltering && (
            <section>
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-700">Featured</p>
                <h2 className="mt-2 text-2xl font-extrabold text-sky-950">Top Stories</h2>
              </div>

              <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
                {featuredArticles[0] && (
                  <FeaturedMainCard article={featuredArticles[0]} />
                )}
                <div className="flex flex-col gap-6">
                  {featuredArticles.slice(1, 3).map((a) => (
                    <FeaturedSideCard key={a.id} article={a} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Latest News Grid */}
          {!loading && !fetchError && <section>
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-700">
                  {isFiltering ? "Results" : "Latest"}
                </p>
                <h2 className="mt-2 text-2xl font-extrabold text-sky-950">
                  {isFiltering
                    ? `${filteredArticles.length} article${filteredArticles.length !== 1 ? "s" : ""} found`
                    : "Latest News"}
                </h2>
              </div>
              {isFiltering && (
                <button
                  onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-500 hover:border-sky-300 hover:text-sky-800"
                >
                  Clear filters
                </button>
              )}
            </div>

            {filteredArticles.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredArticles.map((a) => (
                  <NewsCard key={a.id} article={a} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white py-20 text-center">
                <p className="text-base font-semibold text-slate-400">
                  No articles found for this search.
                </p>
                <button
                  onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                  className="mt-4 text-sm font-bold text-sky-700 hover:text-red-700"
                >
                  Clear filters
                </button>
              </div>
            )}
          </section>}

        </div>

        {/* ── Articles ───────────────────────────────────────────────────────── */}
        {!loading && !fetchError && !isFiltering && (
          <div className="mx-auto max-w-7xl px-5 pb-10">
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-700">Technical Articles</p>
              <h2 className="mt-2 text-2xl font-extrabold text-sky-950">In-Depth Articles</h2>
              <p className="mt-2 text-sm text-slate-500 max-w-2xl">Detailed technical content on defect assessment, repair methodology and industry practice from the Remedial Building Australia editorial team.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Understanding AS 3740 Waterproofing Requirements for Balconies and Wet Areas",
                  category: "Waterproofing",
                  excerpt: "A detailed walkthrough of AS 3740 requirements for membrane type selection, upturn heights, drainage falls, penetration detailing and flood testing in Class 2 buildings.",
                  image: "/Images/Categories/waterproofing-water-ingress.jpg",
                  readTime: "8 min read",
                },
                {
                  title: "How to Read a Concrete Condition Report: A Practical Guide for Strata Managers",
                  category: "Concrete Repair",
                  excerpt: "Breaking down the key elements of a structural concrete condition report — carbonation depths, cover measurements, corrosion risk and repair priority recommendations.",
                  image: "/Images/Categories/concrete-structural-defects.jpg",
                  readTime: "6 min read",
                },
                {
                  title: "Facade Sealant Replacement: Planning a Building-Wide Programme",
                  category: "Façade Defects",
                  excerpt: "How to scope, specify, sequence and quality-control a building-wide sealant replacement programme — from initial condition survey through to post-repair hose testing.",
                  image: "/Images/Categories/facade-external-envelope.jpg",
                  readTime: "7 min read",
                },
                {
                  title: "Polyurethane Injection for Basement Cracks: When It Works and When It Fails",
                  category: "Concrete Repair",
                  excerpt: "A technical review of the conditions under which polyurethane hydrophilic injection succeeds and fails — covering crack activity, product selection, injection pressure and monitoring.",
                  image: "/Images/Categories/basements-substructure.jpg",
                  readTime: "9 min read",
                },
                {
                  title: "Balustrade Corrosion in Strata Buildings: Structural Risk and Remediation",
                  category: "Building Defects",
                  excerpt: "Assessing the structural significance of corroded balustrade posts, load testing requirements under AS 1170.1, and a step-by-step replacement and waterproofing methodology.",
                  image: "/Images/Categories/balconies-podiums.jpg",
                  readTime: "7 min read",
                },
                {
                  title: "Magnesite Flooring Assessment and Remediation in Older Strata Buildings",
                  category: "Strata Defects",
                  excerpt: "The full assessment process for magnesite flooring in strata buildings — moisture testing, corrosion risk, removal scope, and compliant reinstatement options under current Australian Standards.",
                  image: "/Images/Categories/internal-defects-finishes.jpg",
                  readTime: "8 min read",
                },
              ].map((article) => (
                <div key={article.title} className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                  <div className="h-36 w-full shrink-0 overflow-hidden">
                    <img src={article.image} alt={article.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="inline-block shrink-0 rounded-md bg-sky-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-sky-950 w-fit">{article.category}</span>
                    <span className="mt-1.5 text-xs text-slate-400">{article.readTime}</span>
                    <h3 className="mt-2 flex-1 text-sm font-bold leading-snug text-sky-950 group-hover:text-sky-700">{article.title}</h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">{article.excerpt}</p>
                    <div className="mt-4 border-t border-slate-100 pt-3">
                      <span className="flex items-center gap-1 text-xs font-bold text-sky-700 group-hover:text-red-700">
                        Read Article <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Disclaimer ─────────────────────────────────────────────────────── */}
        <div className="mx-auto max-w-7xl px-5 pb-10">
          <p className="text-xs leading-6 text-slate-400 border-t border-slate-200 pt-6">
            Articles sourced from third-party publications. Remedial Building Australia does not own or reproduce article content. All articles link directly to their original source.
          </p>
        </div>

        {/* ── Newsletter ──────────────────────────────────────────────────────── */}
        <section className="bg-sky-950 px-8 py-20 text-white">
          <div className="mx-auto max-w-7xl grid gap-10 md:grid-cols-[1fr_0.85fr] md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-white">Newsletter</p>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">
                Get the Fortnightly Remedial Building Update
              </h2>
              <p className="mt-4 max-w-lg text-base leading-7 text-sky-300">
                Industry news, defect trends, compliance updates and technical articles — delivered fortnightly.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-6">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="min-h-12 flex-1 rounded-xl border border-white/20 bg-white/10 px-4 text-sm text-white placeholder-sky-400 outline-none focus:border-sky-400"
                />
                <button className="flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-red-700 px-6 text-sm font-bold text-white hover:bg-red-800">
                  <Mail size={16} /> Subscribe
                </button>
              </div>
              <p className="mt-3 text-xs text-sky-500">No spam. Unsubscribe at any time.</p>
            </div>
          </div>
        </section>

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
