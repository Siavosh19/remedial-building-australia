"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, ExternalLink, Loader2 } from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { getNewsImage, formatDate } from "@/lib/news-categories";

type Article = {
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

export default function IndustryNewsArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    async function fetchArticle() {
      setLoading(true);
      const { data, error } = await supabase
        .from("industry_news")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single();

      if (error || !data) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const row = data as Record<string, unknown>;
      setArticle({
        id: String(row.id ?? ""),
        title: String(row.title ?? ""),
        slug: String(row.slug ?? slug),
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
      });
      setLoading(false);
    }
    fetchArticle();
  }, [slug]);

  const impactBullets = article?.industry_impact
    ? article.industry_impact.split(" | ").map((s) => s.trim()).filter(Boolean)
    : [];

  const heroImage = getNewsImage(article?.category ?? "Other", article?.title ?? "");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">

      {/* Header */}
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

        {/* Back button */}
        <div className="mx-auto max-w-4xl px-5 pt-8">
          <a
            href="/industry-news"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-100"
          >
            <ArrowLeft size={16} /> Industry News
          </a>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="animate-spin text-sky-700" size={36} />
          </div>
        )}

        {/* Not found */}
        {!loading && notFound && (
          <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <p className="text-lg font-bold text-slate-500">Article not found.</p>
            <a href="/industry-news" className="mt-4 inline-block text-sm font-bold text-sky-700 hover:text-red-700">
              ← Browse all articles
            </a>
          </div>
        )}

        {/* Article */}
        {!loading && article && (
          <>
            {/* Article header */}
            <div className="mx-auto max-w-4xl px-5 pt-10">
              <span className="inline-block rounded-md bg-sky-100 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-sky-950">
                {article.category}
              </span>
              <p className="mt-2 text-sm text-slate-400">
                {formatDate(article.published_date)}
                {article.source_name && ` · ${article.source_name}`}
              </p>
              <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-4xl">
                {article.title}
              </h1>
              {article.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Featured image */}
            <div className="mx-auto mt-6 max-w-4xl px-5">
              <div className="relative h-72 w-full overflow-hidden rounded-2xl md:h-96">
                <Image
                  src={heroImage}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 896px) 100vw, 896px"
                  priority
                />
              </div>
            </div>

            {/* Content */}
            <div className="mx-auto max-w-4xl px-5 pb-10">

              {/* Summary section */}
              <div className="mt-10">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Summary</p>
                <p className="mt-3 text-base leading-8 text-slate-700">
                  {article.summary}
                </p>
              </div>

              {/* Industry Impact section */}
              {impactBullets.length > 0 && (
                <div className="mt-8 border-l-4 border-red-700 rounded-r-2xl bg-sky-50 px-6 py-5">
                  <p className="text-sm font-extrabold uppercase tracking-wider text-red-700">
                    Industry Impact
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Why this matters for Australian remedial building professionals
                  </p>
                  <ul className="mt-4 space-y-2">
                    {impactBullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm leading-7 text-slate-700">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-700" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              {article.tags.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Source section */}
              {article.source_url && (
                <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <p className="text-sm text-slate-600">
                    This article was sourced from{" "}
                    <span className="font-bold text-slate-800">{article.source_name}</span>.{" "}
                    Read the original article on their website.
                  </p>
                  <a
                    href={article.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-sky-950 px-6 py-3 text-sm font-bold text-white hover:bg-sky-800 transition"
                  >
                    Read Original Source <ExternalLink size={14} />
                  </a>
                </div>
              )}

              {/* Disclaimer */}
              <p className="mt-10 border-t border-slate-200 pt-6 text-xs leading-6 text-slate-400">
                AI-generated summary and industry impact analysis. Always verify with the original source.
              </p>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-sky-200 bg-slate-100">
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
