import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { ArrowRight, Clock, Calendar } from "lucide-react";

import SiteHeader from "@/components/SiteHeader";
export const metadata: Metadata = {
  title: "RBA Insights | Remedial Building Australia",
  description: "Original remedial building articles, guides and technical insights by Remedial Building Australia.",
  openGraph: {
    title: "RBA Insights | Remedial Building Australia",
    description: "Original remedial building articles, guides and technical insights by Remedial Building Australia.",
    type: "website",
    siteName: "Remedial Building Australia",
  },
};

export const revalidate = 60;

function formatDate(d: Date | null): string {
  if (!d) return "";
  return d.toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
}

export default async function RbaInsightsPage() {
  const articles = await prisma.rbaInsightsArticle.findMany({
    where: { status: "published" },
    orderBy: [{ is_featured: "desc" }, { published_date: "desc" }],
    select: {
      id: true,
      title: true,
      slug: true,
      category: true,
      summary: true,
      featured_image_url: true,
      featured_image_alt_text: true,
      published_date: true,
      reading_time_minutes: true,
      author: true,
      is_featured: true,
    },
  });

  const featured = articles.find((a) => a.is_featured) ?? articles[0] ?? null;
  const rest = articles.filter((a) => a.id !== featured?.id);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <SiteHeader />

      <main>
        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section className="border-b border-sky-900/30 bg-sky-950 px-8 py-10">
          <div className="mx-auto max-w-5xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-red-400">RBA Insights</p>
            <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
              Remedial Building Insights
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-sky-300">
              Original technical articles, guides and practical insights written by Remedial Building Australia — covering waterproofing, concrete repair, façade defects, strata compliance and more.
            </p>
            <a href="/industry-news" className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-sky-400 hover:text-white transition">
              ← Also see: Industry News &amp; Insights
            </a>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-6 py-10 space-y-10">

          {articles.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
              <p className="text-base font-semibold text-slate-400">No insights published yet. Check back soon.</p>
            </div>
          )}

          {/* ── Featured article ──────────────────────────────────────────── */}
          {featured && (
            <a
              href={`/rba-insights/${featured.slug}`}
              className="group grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:shadow-xl lg:grid-cols-[1.1fr_0.9fr]"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 lg:aspect-[3/1]">
                {featured.featured_image_url ? (
                  <Image
                    src={featured.featured_image_url}
                    alt={featured.featured_image_alt_text ?? featured.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-sky-900 to-sky-950" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-red-700 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow">
                  Featured Insight
                </span>
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-10">
                <span className="inline-block w-fit rounded-md bg-sky-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-sky-950">
                  {featured.category}
                </span>
                <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-slate-400">
                  {featured.published_date && <span className="flex items-center gap-1"><Calendar size={10} />{formatDate(featured.published_date)}</span>}
                  {featured.reading_time_minutes && <><span>·</span><span className="flex items-center gap-1"><Clock size={10} />{featured.reading_time_minutes} min read</span></>}
                </div>
                <h2 className="mt-3 text-2xl font-extrabold leading-tight text-sky-950 transition group-hover:text-sky-700 md:text-[1.6rem]">
                  {featured.title}
                </h2>
                {featured.summary && (
                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-500">{featured.summary}</p>
                )}
                <span className="mt-5 flex items-center gap-1.5 text-sm font-bold text-sky-700 transition group-hover:text-red-700">
                  Read article <ArrowRight size={14} />
                </span>
              </div>
            </a>
          )}

          {/* ── Grid ──────────────────────────────────────────────────────── */}
          {rest.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((article) => (
                <a
                  key={article.id}
                  href={`/rba-insights/${article.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    {article.featured_image_url ? (
                      <Image
                        src={article.featured_image_url}
                        alt={article.featured_image_alt_text ?? article.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-sky-900 to-sky-950" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-1.5">
                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-red-700">Remedial Insights</span>
                      <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">{article.category}</span>
                    </div>
                    <h3 className="mt-2 flex-1 text-sm font-bold leading-snug text-sky-950 line-clamp-2 transition group-hover:text-sky-700">
                      {article.title}
                    </h3>
                    {article.summary && (
                      <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">{article.summary}</p>
                    )}
                    <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] text-slate-400">
                      {article.published_date && <span>{formatDate(article.published_date)}</span>}
                      {article.reading_time_minutes && <><span>·</span><span>{article.reading_time_minutes} min read</span></>}
                    </div>
                    <span className="mt-3 flex items-center gap-1 text-xs font-bold text-sky-700 transition group-hover:text-red-700">
                      Read article <ArrowRight size={12} />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}
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
            <div className="flex flex-col gap-2">
              <a href="/directory" className="hover:text-sky-700">Business Directory</a>
              <a href="/repair-systems" className="hover:text-sky-700">Repair Systems</a>
              <a href="/defect-library" className="hover:text-sky-700">Defect Library</a>
              <a href="/industry-news" className="hover:text-sky-700">News &amp; Insights</a>
            </div>
            <div className="flex flex-col gap-2">
              <a href="/advertise" className="hover:text-sky-700">Advertise With Us</a>
              <a href="/contact" className="hover:text-sky-700">Contact</a>
              <a href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</a>
              <a href="/terms" className="hover:text-sky-700">Terms</a>
              <a href="#" className="termly-display-preferences hover:text-sky-700">Consent Preferences</a>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl border-t border-slate-200 px-5 py-5 text-xs text-slate-400">
          © 2025 Remedial Building Australia. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
