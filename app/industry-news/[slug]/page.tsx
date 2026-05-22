"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, ExternalLink, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Article = {
  id: string;
  title: string;
  slug: string;
  category: string;
  source: string;
  publishedDate: string;
  image: string;
  excerpt: string;
  body: string;
  sourceUrl: string;
  tags: string[];
};

export default function ArticleDetailPage() {
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
        .from("news_articles")
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
        category: String(row.category ?? "General"),
        source: String(row.source ?? "Remedial Building Australia"),
        publishedDate: String(row.date_published ?? row.published_date ?? ""),
        image: String(
          row.image ?? row.image_url ?? "/Images/Categories/facade-external-envelope.jpg"
        ),
        excerpt: String(row.excerpt ?? ""),
        body: String(row.body ?? row.content ?? row.full_content ?? ""),
        sourceUrl: String(row.source_url ?? row.external_url ?? ""),
        tags: Array.isArray(row.tags)
          ? (row.tags as string[])
          : typeof row.tags === "string"
          ? (row.tags as string).split(",").map((t) => t.trim())
          : [],
      });
      setLoading(false);
    }
    fetchArticle();
  }, [slug]);

  function formatDate(dateStr: string) {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-AU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

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
          </nav>
          <a
            href="/"
            className="hidden shrink-0 rounded-xl bg-sky-700 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-800 md:inline-flex"
          >
            Home
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-10">

        <a
          href="/industry-news"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-100"
        >
          <ArrowLeft size={16} /> Back to Industry News
        </a>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="animate-spin text-sky-700" size={36} />
          </div>
        )}

        {/* Not found */}
        {!loading && notFound && (
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <p className="text-lg font-bold text-slate-500">Article not found.</p>
            <a href="/industry-news" className="mt-4 inline-block text-sm font-bold text-sky-700 hover:text-red-700">
              ← Browse all articles
            </a>
          </div>
        )}

        {/* Article */}
        {!loading && article && (
          <article className="mt-8">

            {/* Category & date */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-block rounded-md bg-sky-100 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-sky-950">
                {article.category}
              </span>
              {article.publishedDate && (
                <span className="text-sm text-slate-400">{formatDate(article.publishedDate)}</span>
              )}
              {article.source && (
                <span className="text-sm font-semibold text-slate-500">· Source: {article.source}</span>
              )}
            </div>

            {/* Title */}
            <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-4xl">
              {article.title}
            </h1>

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-500">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Image */}
            {article.image && (
              <div className="mt-8 overflow-hidden rounded-2xl">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-72 w-full object-cover md:h-96"
                />
              </div>
            )}

            {/* Body or excerpt */}
            <div className="mt-8 space-y-5 text-base leading-8 text-slate-700">
              {article.body ? (
                article.body.split("\n").filter(Boolean).map((para, i) => (
                  <p key={i}>{para}</p>
                ))
              ) : article.excerpt ? (
                <p>{article.excerpt}</p>
              ) : (
                <p className="text-slate-400 italic">No article content available.</p>
              )}
            </div>

            {/* Read original CTA */}
            {article.sourceUrl && (
              <div className="mt-10 rounded-2xl border border-sky-100 bg-sky-50 p-6">
                <p className="text-sm font-semibold text-sky-800">
                  This article was originally published by <span className="font-bold">{article.source}</span>.
                </p>
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-sky-700 px-6 py-3 text-sm font-bold text-white hover:bg-sky-800"
                >
                  Read Original Article <ExternalLink size={14} />
                </a>
              </div>
            )}

            {/* Disclaimer */}
            <p className="mt-10 border-t border-slate-200 pt-6 text-xs leading-6 text-slate-400">
              Articles sourced from third-party publications. Remedial Building Australia does not own or reproduce article content.
            </p>
          </article>
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
