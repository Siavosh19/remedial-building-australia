import { readdirSync, existsSync } from "fs";
import { join, extname } from "path";
import { supabase } from "@/lib/supabase";
import { prisma } from "@/lib/prisma";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { NewsGridClient, type NewsArticle } from "@/components/industry-news/NewsGridClient";
import { NewsLegalFooter } from "@/components/industry-news/NewsLegalFooter";
import { assignUniqueImages } from "@/lib/news-categories";
import { InsightsSidebar, type InsightCard } from "@/components/rba-insights/InsightsSidebar";

export const revalidate = 300;

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

function getNewsImagePool(): string[] {
  const dir = join(process.cwd(), "public", "Images", "News");
  if (!existsSync(dir)) return [];
  const EXCLUDE = new Set(["Home page.jpg", "ChatGPT Image Apr 4, 2025, 03_51_18 PM.png"]);
  return readdirSync(dir)
    .filter((f) => IMAGE_EXTS.has(extname(f).toLowerCase()) && !EXCLUDE.has(f))
    .sort()
    .map((f) => `/Images/News/${f}`);
}

async function getArticles(): Promise<Omit<NewsArticle, "featured_image">[]> {
  const { data } = await supabase
    .from("industry_news")
    .select(
      "id, title, slug, summary, category, tags, source_name, source_url, published_date, created_at, priority"
    )
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .order("published_date", { ascending: false, nullsFirst: false });

  return (data ?? []).map((row: Record<string, unknown>) => ({
    id: String(row.id ?? ""),
    title: String(row.title ?? ""),
    slug: String(row.slug ?? ""),
    summary: String(row.summary ?? ""),
    category: String(row.category ?? "Other"),
    tags: Array.isArray(row.tags) ? (row.tags as string[]) : [],
    source_name: String(row.source_name ?? ""),
    source_url: String(row.source_url ?? ""),
    published_date: String(row.published_date ?? ""),
    priority: typeof row.priority === "number" ? (row.priority as 1 | 2 | 3) : 2,
  }));
}

async function getInsights(): Promise<InsightCard[]> {
  const rows = await prisma.rbaInsightsArticle.findMany({
    where: { status: "published" },
    orderBy: [{ is_featured: "desc" }, { published_date: "desc" }],
    take: 6,
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
    },
  });
  return rows.map((r) => ({
    ...r,
    published_date: r.published_date ? r.published_date.toISOString() : null,
  }));
}

export default async function IndustryNewsPage() {
  const [rawArticles, imagePool, insights] = await Promise.all([
    getArticles(),
    Promise.resolve(getNewsImagePool()),
    getInsights(),
  ]);
  const articles = assignUniqueImages(rawArticles, [], imagePool);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8 py-4">
          <a href="/" className="flex shrink-0 items-center gap-3">
            <div>
              <div className="text-lg font-extrabold tracking-tight text-sky-950">
                Remedial Building Australia
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Technical Remedial Building Platform
              </div>
            </div>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-sky-800 md:flex">
            <a href="/" className="whitespace-nowrap transition hover:text-red-700">Home</a>
            <a href="/repair-systems" className="whitespace-nowrap hover:text-red-700">Repair Systems</a>
            <a href="/industry-news" className="whitespace-nowrap text-red-700">News &amp; Insights</a>
            <a href="/directory" className="whitespace-nowrap hover:text-red-700">Directory</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700">AI Scope Builder</a>
          </nav>
          <a
            href="/ai-scope-builder"
            className="hidden shrink-0 rounded-xl bg-sky-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800 md:inline-flex"
          >
            AI Scope Builder
          </a>
        </div>
      </header>

      <main>

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section className="border-b border-sky-900/30 bg-sky-950 px-8 py-8">
          <div className="mx-auto max-w-5xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-sky-500">
              Industry Intelligence
            </p>
            <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
              Industry News &amp; Remedial Insights
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-sky-300">
              Australian remedial building updates — Building Commission NSW, waterproofing compliance, façade defects, strata issues, concrete repair and DBP Act developments.
            </p>
          </div>
        </section>

        {/* ── Editorial note ────────────────────────────────────────────────── */}
        <div className="border-b border-slate-200 bg-slate-50 px-8 py-3">
          <p className="mx-auto max-w-7xl text-xs leading-5 text-slate-500">
            We monitor Australian building, strata, waterproofing, façade, concrete repair and construction industry updates, then summarise them for remedial relevance. All articles link back to the original publisher.
          </p>
        </div>

        {/* ── Two-column layout: News + RBA Insights sidebar ────────────────── */}
        <div className="mx-auto max-w-7xl px-0 lg:px-6">
          <div className="flex flex-col lg:flex-row lg:gap-8">

            {/* Left column — existing Industry News feed (untouched) */}
            <div className="min-w-0 flex-1">
              <NewsGridClient articles={articles} />
            </div>

            {/* Right sidebar — RBA Insights */}
            <div className="w-full border-t border-slate-200 bg-slate-50 px-6 py-8 lg:w-80 lg:shrink-0 lg:border-l lg:border-t-0 lg:bg-transparent lg:pt-8">
              <InsightsSidebar insights={insights} />
            </div>

          </div>
        </div>

        {/* ── Newsletter ─────────────────────────────────────────────────────── */}
        <NewsletterSignup variant="section" />

      </main>

      {/* ── News Legal Footer ──────────────────────────────────────────────── */}
      <NewsLegalFooter />

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-sky-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-6 pt-10">
          <a
            href="/"
            className="inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-100"
          >
            ← Home
          </a>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm leading-6 text-sky-900">
              A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
            <a href="/about" className="hover:text-sky-700">About</a>
            <a href="/contact" className="hover:text-sky-700">Contact</a>
            <a href="/terms" className="hover:text-sky-700">Terms</a>
            <a href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</a>
            <a href="/defect-library" className="hover:text-sky-700">Defect Library</a>
            <a href="/repair-systems" className="hover:text-sky-700">Repair Systems</a>
            <a href="/industry-news" className="hover:text-sky-700">News &amp; Insights</a>
            <a href="/directory" className="hover:text-sky-700">Business Directory</a>
            <a href="#" className="termly-display-preferences hover:text-sky-700">Consent Preferences</a>
          </div>
        </div>
        <div className="mx-auto max-w-7xl border-t border-slate-200 px-5 py-5 text-xs text-slate-400">
          © 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved. Unauthorised reproduction prohibited.
        </div>
      </footer>

    </div>
  );
}
