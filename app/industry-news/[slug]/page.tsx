import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { readdirSync, existsSync } from "fs";
import { join, extname } from "path";
import { ArrowLeft, ExternalLink, Clock, Calendar, Building2, ChevronRight } from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { getArticleImage, formatDate } from "@/lib/news-categories";
import { ArticleDisclaimer } from "@/components/industry-news/ArticleDisclaimer";
import { NewsLegalFooter } from "@/components/industry-news/NewsLegalFooter";
import SiteHeader from "@/components/SiteHeader";

export const revalidate = 3600;

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const EXCLUDE = new Set(["Home page.jpg", "ChatGPT Image Apr 4, 2025, 03_51_18 PM.png"]);

function getNewsImagePool(): string[] {
  const dir = join(process.cwd(), "public", "Images", "News");
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => IMAGE_EXTS.has(extname(f).toLowerCase()) && !EXCLUDE.has(f))
    .sort()
    .map((f) => `/Images/News/${f}`);
}

// ─── Internal resource links by category ─────────────────────────────────────

const CATEGORY_RESOURCES: Record<string, { label: string; href: string }[]> = {
  "Concrete Repair": [
    { label: "Concrete Spalling", href: "/defect-library/concrete-structural-defects/concrete-spalling" },
    { label: "Reinforcement Corrosion", href: "/defect-library/concrete-structural-defects/reinforcement-corrosion" },
    { label: "Polymer-Modified Repair Mortars", href: "/repair-systems/concrete-spalling/repair-mortars-polymer-modified" },
    { label: "Epoxy Repair Mortars", href: "/repair-systems/concrete-spalling/epoxy-repair-mortars" },
    { label: "Cementitious Repair Mortars", href: "/repair-systems/concrete-spalling/cementitious-repair-mortars" },
  ],
  "Waterproofing Defects": [
    { label: "Balcony Waterproofing Failure", href: "/defect-library/waterproofing-water-ingress/balcony-waterproofing-failure" },
    { label: "Podium Waterproofing Failure", href: "/defect-library/waterproofing-water-ingress/podium-waterproofing-failure" },
    { label: "Basement Water Ingress", href: "/defect-library/waterproofing-water-ingress/basement-water-ingress" },
    { label: "Planter Box Waterproofing Failure", href: "/defect-library/waterproofing-water-ingress/planter-box-waterproofing-failure" },
    { label: "Repair Systems", href: "/repair-systems" },
  ],
  "Façade Defects": [
    { label: "Cladding Failure", href: "/defect-library/facade-external-envelope/cladding-failure" },
    { label: "Façade Cracking", href: "/defect-library/facade-external-envelope/facade-cracking" },
    { label: "Failed Sealants & Joints", href: "/defect-library/facade-external-envelope/failed-sealants-joints" },
    { label: "Brickwork Deterioration", href: "/defect-library/facade-external-envelope/brickwork-deterioration" },
  ],
  "Strata Defects": [
    { label: "Defect Library", href: "/defect-library" },
    { label: "Balcony & Podium Defects", href: "/defect-library/balconies-podiums" },
    { label: "Concrete Structural Defects", href: "/defect-library/concrete-structural-defects" },
    { label: "AI Scope Builder", href: "/ai-scope-builder" },
  ],
  "Building Defects": [
    { label: "Defect Library", href: "/defect-library" },
    { label: "Concrete Structural Defects", href: "/defect-library/concrete-structural-defects" },
    { label: "Waterproofing & Water Ingress", href: "/defect-library/waterproofing-water-ingress" },
    { label: "Repair Systems", href: "/repair-systems" },
  ],
  "Building Commission NSW": [
    { label: "Defect Library", href: "/defect-library" },
    { label: "Repair Systems", href: "/repair-systems" },
    { label: "AI Scope Builder", href: "/ai-scope-builder" },
  ],
  "DBP Act": [
    { label: "Defect Library", href: "/defect-library" },
    { label: "AI Scope Builder", href: "/ai-scope-builder" },
    { label: "Repair Systems", href: "/repair-systems" },
  ],
  "Class 2 Buildings": [
    { label: "Defect Library", href: "/defect-library" },
    { label: "Concrete Structural Defects", href: "/defect-library/concrete-structural-defects" },
    { label: "Balcony & Podium Defects", href: "/defect-library/balconies-podiums" },
    { label: "AI Scope Builder", href: "/ai-scope-builder" },
  ],
  "Remedial Construction": [
    { label: "Repair Systems", href: "/repair-systems" },
    { label: "Defect Library", href: "/defect-library" },
    { label: "AI Scope Builder", href: "/ai-scope-builder" },
  ],
  "Product & Material Updates": [
    { label: "Repair Systems", href: "/repair-systems" },
    { label: "Polymer-Modified Repair Mortars", href: "/repair-systems/concrete-spalling/repair-mortars-polymer-modified" },
    { label: "Epoxy Repair Mortars", href: "/repair-systems/concrete-spalling/epoxy-repair-mortars" },
    { label: "Bonding Agents & SBR Latex", href: "/repair-systems/concrete-spalling/bonding-agents-sbr-latex" },
  ],
  "New Construction Systems": [
    { label: "Repair Systems", href: "/repair-systems" },
    { label: "Defect Library", href: "/defect-library" },
    { label: "AI Scope Builder", href: "/ai-scope-builder" },
  ],
};

const DEFAULT_RESOURCES = [
  { label: "Defect Library", href: "/defect-library" },
  { label: "Repair Systems", href: "/repair-systems" },
  { label: "AI Scope Builder", href: "/ai-scope-builder" },
];

// ─── Who this affects, by category ───────────────────────────────────────────

const CATEGORY_AUDIENCE: Record<string, string[]> = {
  "Building Commission NSW": ["Remedial building consultants", "Licensed builders & contractors", "Building managers & facilities teams", "Strata committees & owners corporations"],
  "DBP Act": ["Design practitioners (registered)", "Building practitioners", "Principal certifiers", "Remedial contractors & builders"],
  "Class 2 Buildings": ["Strata managers & committees", "Lot owners & investors", "Remedial building consultants", "Licensed builders"],
  "Waterproofing Defects": ["Waterproofing contractors & applicators", "Remedial building consultants", "Strata managers", "Building & facilities managers"],
  "Façade Defects": ["Façade & cladding contractors", "Remedial building consultants", "Engineers & building certifiers", "Strata committees"],
  "Concrete Repair": ["Remedial building consultants", "Structural & civil engineers", "Remedial concrete contractors", "Strata managers & committees"],
  "Strata Defects": ["Strata managers & committees", "Lot owners", "Remedial building consultants", "Building managers"],
  "Building Defects": ["Remedial building consultants", "Licensed builders", "Strata managers", "Engineers & surveyors"],
  "Remedial Construction": ["Remedial building consultants", "Remedial contractors", "Structural engineers", "Project managers"],
  "Product & Material Updates": ["Remedial building consultants", "Waterproofing & concrete contractors", "Estimators & quantity surveyors", "Engineers specifying repair systems"],
  "New Construction Systems": ["Architects & designers", "Remedial building consultants", "Contractors & applicators", "Engineers"],
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function readingTime(text: string): string {
  const mins = Math.max(1, Math.round((text ?? "").trim().split(/\s+/).length / 200));
  return `${mins} min read`;
}

function summaryToParagraphs(summary: string): string[] {
  if (!summary) return [];
  // New format: paragraphs separated by blank lines
  const blankLineSplit = summary.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
  if (blankLineSplit.length >= 2) return blankLineSplit;
  // Legacy fallback: split long text by sentence count
  const sentences = summary.match(/[^.!?]*[.!?]+(?:\s+|$)/g) ?? [];
  if (sentences.length <= 3) return [summary];
  const perPara = Math.ceil(sentences.length / 3);
  const paras: string[] = [];
  for (let i = 0; i < sentences.length; i += perPara) {
    const p = sentences.slice(i, i + perPara).join("").trim();
    if (p) paras.push(p);
  }
  return paras.length ? paras : [summary];
}

// ─── Data fetching ────────────────────────────────────────────────────────────

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
  created_at: string;
};

async function getArticle(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from("industry_news")
    .select("id, title, slug, summary, industry_impact, category, tags, source_name, source_url, published_date, created_at")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !data) return null;

  const row = data as Record<string, unknown>;
  return {
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
    created_at: String(row.created_at ?? ""),
  };
}

async function getRelatedArticles(category: string, excludeSlug: string): Promise<Article[]> {
  const { data } = await supabase
    .from("industry_news")
    .select("id, title, slug, summary, industry_impact, category, tags, source_name, source_url, published_date, created_at")
    .eq("status", "published")
    .eq("category", category)
    .neq("slug", excludeSlug)
    .order("published_date", { ascending: false })
    .limit(3);

  return (data ?? []).map((row: Record<string, unknown>) => ({
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
    created_at: String(row.created_at ?? ""),
  }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Article Not Found | Industry News" };

  const description = article.summary.slice(0, 155).replace(/\s+\S*$/, "") + "…";
  return {
    title: `${article.title} | Remedial Building Australia`,
    description,
    openGraph: {
      title: article.title,
      description,
      type: "article",
      siteName: "Remedial Building Australia",
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function IndustryNewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [article, relatedArticles] = await Promise.all([
    getArticle(slug),
    getArticle(slug).then((a) =>
      a ? getRelatedArticles(a.category, slug) : Promise.resolve([])
    ),
  ]);

  if (!article) notFound();

  const imagePool = getNewsImagePool();
  const heroImage = getArticleImage(article.category, article.title, imagePool);
  const relatedArticlesWithImages = relatedArticles.map((r) => ({
    ...r,
    featured_image: getArticleImage(r.category, r.title, imagePool),
  }));
  const paragraphs = summaryToParagraphs(article.summary);
  const whyItMatters = article.industry_impact?.trim() || null;
  const resources = CATEGORY_RESOURCES[article.category] ?? DEFAULT_RESOURCES;
  const audience = CATEGORY_AUDIENCE[article.category] ?? [];

  return (
    <div className="min-h-screen bg-white text-slate-800">

      <SiteHeader />

      <main>

        {/* ── Hero image ─────────────────────────────────────────────────── */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-200 md:aspect-[2/1]">
          <Image
            src={heroImage}
            alt={article.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-8 pb-8 md:px-16">
            <div className="mx-auto max-w-3xl">
              <span className="inline-block rounded-md bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-sm border border-white/20">
                {article.category}
              </span>
            </div>
          </div>
        </div>

        {/* ── Article body ───────────────────────────────────────────────── */}
        <div className="mx-auto max-w-3xl px-6 pb-16 md:px-8">

          {/* Back link */}
          <div className="pt-8 pb-6">
            <a
              href="/industry-news"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-slate-400 transition hover:text-sky-700"
            >
              <ArrowLeft size={13} /> News & Insights
            </a>
          </div>

          {/* Metadata bar */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-slate-400" />
              {formatDate(article.published_date)}
            </span>
            {article.source_name && (
              <>
                <span className="text-slate-300">·</span>
                <span className="flex items-center gap-1.5">
                  <Building2 size={13} className="text-slate-400" />
                  {article.source_name}
                </span>
              </>
            )}
            <span className="text-slate-300">·</span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-slate-400" />
              {readingTime(article.summary)}
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-4xl">
            {article.title}
          </h1>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] text-slate-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <hr className="mt-7 border-slate-100" />

          {/* ── Editorial summary ──────────────────────────────────────── */}
          <div className="mt-8">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-3 w-0.5 rounded-full bg-slate-300" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Editorial Summary — Remedial Building Australia
              </p>
            </div>
            <div className="space-y-5">
              {paragraphs.map((para, i) => (
                <p key={i} className="text-base leading-8 text-slate-700">
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* ── Read original source ───────────────────────────────────── */}
          {article.source_url && (
            <div className="mt-6">
              <a
                href={article.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-sky-800 shadow-sm transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-950"
              >
                Read the original source <ExternalLink size={13} />
              </a>
              {article.source_name && (
                <p className="mt-2 text-[11px] text-slate-400">
                  Originally reported by <span className="font-semibold">{article.source_name}</span>. Editorial summary and analysis prepared by Remedial Building Australia.
                </p>
              )}
            </div>
          )}

          {/* ── Why It Matters ─────────────────────────────────────────── */}
          {whyItMatters && (
            <div className="mt-10">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-3 w-0.5 rounded-full bg-red-500" />
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-700">
                  Why It Matters
                </p>
              </div>
              <div className="rounded-2xl border-l-4 border-red-600 bg-red-50 px-7 py-6">
                <p className="text-base leading-8 text-slate-800">
                  {whyItMatters}
                </p>
                <p className="mt-3 text-[11px] text-red-400">
                  General observation only — not professional, legal, or engineering advice.
                </p>
              </div>
            </div>
          )}

          {/* ── Who This May Affect ───────────────────────────────────── */}
          {audience.length > 0 && (
            <div className="mt-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
                Who May Find This Relevant
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {audience.map((a) => (
                  <span
                    key={a}
                    className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-600"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}

          <hr className="mt-10 border-slate-100" />

          {/* ── Source & Attribution ───────────────────────────────────── */}
          {article.source_url && (
            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-3">
                Source &amp; Attribution
              </p>
              <div className="space-y-2 text-sm text-slate-600">
                {article.source_name && (
                  <p>
                    <span className="font-semibold text-slate-700">Original publisher:</span>{" "}
                    {article.source_name}
                  </p>
                )}
                <p>
                  <span className="font-semibold text-slate-700">Published:</span>{" "}
                  {formatDate(article.published_date)}
                </p>
                <p>
                  <a
                    href={article.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold text-sky-700 hover:text-sky-900 transition"
                  >
                    View original article <ExternalLink size={11} />
                  </a>
                </p>
              </div>
              <p className="mt-4 text-[11px] leading-relaxed text-slate-500 border-t border-slate-200 pt-4">
                This article contains an editorial summary and industry commentary prepared by Remedial Building Australia. It does not reproduce original article wording. Remedial Building Australia is an independent industry information platform and is not affiliated with the original publisher. Content is general information only — not professional, legal, or engineering advice.
              </p>
            </div>
          )}

          {/* ── Disclaimer ────────────────────────────────────────────── */}
          <div className="mt-8">
            <ArticleDisclaimer />
          </div>

          {/* ── Related Resources ─────────────────────────────────────── */}
          <div className="mt-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
              Related Resources on This Platform
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {resources.map((r) => (
                <a
                  key={r.href}
                  href={r.href}
                  className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-sky-800 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-950"
                >
                  <span>{r.label}</span>
                  <ChevronRight size={14} className="text-slate-300 transition group-hover:text-sky-600" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* ── Related Articles ───────────────────────────────────────────── */}
        {relatedArticlesWithImages.length > 0 && (
          <section className="border-t border-slate-100 bg-slate-50 px-6 py-12 md:px-8">
            <div className="mx-auto max-w-5xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
                More from {article.category}
              </p>
              <div className="mt-5 grid gap-5 sm:grid-cols-3">
                {relatedArticlesWithImages.map((rel) => (
                  <a
                    key={rel.id}
                    href={`/industry-news/${rel.slug}`}
                    className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      <Image
                        src={rel.featured_image}
                        alt={rel.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <p className="text-[10px] text-slate-400">{formatDate(rel.published_date)}</p>
                      <h3 className="mt-1 flex-1 text-sm font-bold leading-snug text-sky-950 line-clamp-3 transition group-hover:text-sky-700">
                        {rel.title}
                      </h3>
                      <span className="mt-2 flex items-center gap-1 text-xs font-bold text-sky-700 transition group-hover:text-red-700">
                        Read <ChevronRight size={12} />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Back link ──────────────────────────────────────────────────── */}
        <div className="border-t border-slate-100 bg-white px-6 py-8 text-center">
          <a
            href="/industry-news"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-sky-800"
          >
            <ArrowLeft size={15} /> All News & Insights
          </a>
        </div>

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
              An independent Australian remedial building information platform. General information only — not professional or engineering advice.
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
