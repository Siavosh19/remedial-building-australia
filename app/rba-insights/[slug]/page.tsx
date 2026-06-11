import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { ArrowLeft, Clock, Calendar, ChevronRight } from "lucide-react";
import { marked } from "marked";

export const revalidate = 60;

function formatDate(d: Date | null): string {
  if (!d) return "";
  return d.toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
}

async function getArticle(slug: string) {
  return prisma.rbaInsightsArticle.findFirst({
    where: { slug, status: "published" },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Article Not Found" };

  const title = article.seo_title ?? article.title;
  const description = article.seo_description ?? (article.summary ?? "").slice(0, 155);

  return {
    title: `${title} | Remedial Building Australia`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      siteName: "Remedial Building Australia",
      ...(article.featured_image_url ? { images: [{ url: article.featured_image_url, alt: article.featured_image_alt_text ?? title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(article.featured_image_url ? { images: [article.featured_image_url] } : {}),
    },
    alternates: {
      canonical: `https://remedialbuildingaustralia.com.au/rba-insights/${slug}`,
    },
    robots: { index: true, follow: true },
  };
}

export default async function RbaInsightsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const bodyHtml = article.body_content
    ? await marked(article.body_content, { async: false })
    : null;

  // Related links
  const defectLinks = (article.related_defect_pages ?? []).filter(Boolean);
  const systemLinks = (article.related_repair_systems ?? []).filter(Boolean);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.seo_title ?? article.title,
    description: article.seo_description ?? article.summary,
    image: article.featured_image_url,
    datePublished: article.published_date?.toISOString(),
    dateModified: article.updated_at.toISOString(),
    author: { "@type": "Organization", name: article.author },
    publisher: { "@type": "Organization", name: "Remedial Building Australia", url: "https://remedialbuildingaustralia.com.au" },
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">

      {/* ── Schema ──────────────────────────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8 py-4">
          <a href="/" className="flex shrink-0 items-center gap-3">
            <div>
              <div className="text-lg font-extrabold tracking-tight text-sky-950">Remedial Building Australia</div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Technical Remedial Building Platform</div>
            </div>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-sky-800 md:flex">
            <a href="/" className="whitespace-nowrap hover:text-red-700">Home</a>
            <a href="/repair-systems" className="whitespace-nowrap hover:text-red-700">Repair Systems</a>
            <a href="/industry-news" className="whitespace-nowrap hover:text-red-700">News &amp; Insights</a>
            <a href="/directory" className="whitespace-nowrap hover:text-red-700">Directory</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700">AI Scope Builder</a>
          </nav>
          <a href="/directory/login" className="hidden shrink-0 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800 md:inline-flex">
            Login / Create Account
          </a>
        </div>
      </header>

      <main>

        {/* ── Hero Image ──────────────────────────────────────────────────── */}
        {article.featured_image_url ? (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-200 md:aspect-[3/1]">
            <Image
              src={article.featured_image_url}
              alt={article.featured_image_alt_text ?? article.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 px-8 pb-8 md:px-16">
              <div className="mx-auto max-w-3xl">
                <span className="mr-2 inline-block rounded-md bg-red-700/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white">
                  Remedial Insights
                </span>
                <span className="inline-block rounded-md bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-sm border border-white/20">
                  {article.category}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-32 w-full bg-gradient-to-br from-sky-950 to-sky-800" />
        )}

        {/* ── Article body ────────────────────────────────────────────────── */}
        <div className="mx-auto max-w-3xl px-6 pb-16 md:px-8">

          {/* Back link */}
          <div className="pt-8 pb-6">
            <a
              href="/rba-insights"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-slate-400 transition hover:text-sky-700"
            >
              <ArrowLeft size={13} /> RBA Insights
            </a>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
            {article.published_date && (
              <span className="flex items-center gap-1.5">
                <Calendar size={13} className="text-slate-400" />
                {formatDate(article.published_date)}
              </span>
            )}
            <span className="text-slate-300">·</span>
            <span className="text-slate-500">{article.author}</span>
            {article.reading_time_minutes && (
              <>
                <span className="text-slate-300">·</span>
                <span className="flex items-center gap-1.5">
                  <Clock size={13} className="text-slate-400" />
                  {article.reading_time_minutes} min read
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-4xl">
            {article.title}
          </h1>

          {/* Summary */}
          {article.summary && (
            <p className="mt-4 text-base leading-7 text-slate-600 font-medium border-l-4 border-sky-200 pl-4">
              {article.summary}
            </p>
          )}

          {/* Disclaimer */}
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-800">
            This article is general information only and should not be relied on as project-specific advice. Remedial building works should be assessed by suitably qualified consultants, engineers, contractors or registered practitioners where required.
          </div>

          <hr className="mt-7 border-slate-100" />

          {/* Body content */}
          {bodyHtml ? (
            <div
              className="mt-8 prose-content"
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />
          ) : (
            <p className="mt-8 text-slate-400 italic">Article body coming soon.</p>
          )}

          {/* Related Defect Pages */}
          {defectLinks.length > 0 && (
            <div className="mt-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">Related Defect Pages</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {defectLinks.map((href) => (
                  <a
                    key={href}
                    href={href}
                    className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-sky-800 transition hover:border-sky-300 hover:bg-sky-50"
                  >
                    <span className="truncate">{href.split("/").pop()?.replace(/-/g, " ") ?? href}</span>
                    <ChevronRight size={14} className="shrink-0 text-slate-300 transition group-hover:text-sky-600" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Related Repair Systems */}
          {systemLinks.length > 0 && (
            <div className="mt-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">Related Repair Systems</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {systemLinks.map((href) => (
                  <a
                    key={href}
                    href={href}
                    className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-sky-800 transition hover:border-sky-300 hover:bg-sky-50"
                  >
                    <span className="truncate">{href.split("/").pop()?.replace(/-/g, " ") ?? href}</span>
                    <ChevronRight size={14} className="shrink-0 text-slate-300 transition group-hover:text-sky-600" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Footer disclaimer */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">Disclaimer</p>
            <p className="text-xs leading-relaxed text-slate-500">
              This article is general information only and should not be relied on as project-specific advice. Remedial building works should be assessed by suitably qualified consultants, engineers, contractors or registered practitioners where required. Remedial Building Australia is an independent information platform and this content does not constitute professional, legal or engineering advice.
            </p>
          </div>

        </div>

        {/* ── Back link ───────────────────────────────────────────────────── */}
        <div className="border-t border-slate-100 bg-white px-6 py-8 text-center">
          <a
            href="/rba-insights"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-sky-800"
          >
            <ArrowLeft size={15} /> All RBA Insights
          </a>
        </div>

      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-sky-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-6 pt-10">
          <a href="/" className="inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-100">← Home</a>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm leading-6 text-sky-900">A structured Australian remedial building knowledge platform.</p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
            <a href="/about" className="hover:text-sky-700">About</a>
            <a href="/contact" className="hover:text-sky-700">Contact</a>
            <a href="/industry-news" className="hover:text-sky-700">News &amp; Insights</a>
            <a href="/rba-insights" className="hover:text-sky-700">RBA Insights</a>
            <a href="/repair-systems" className="hover:text-sky-700">Repair Systems</a>
            <a href="/directory" className="hover:text-sky-700">Directory</a>
          </div>
        </div>
        <div className="mx-auto max-w-7xl border-t border-slate-200 px-5 py-5 text-xs text-slate-400">
          © 2025 Remedial Building Australia. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
