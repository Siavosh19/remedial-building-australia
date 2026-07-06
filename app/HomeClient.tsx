"use client";

import { useState, useEffect } from "react";
import SiteHeader from "@/components/SiteHeader";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Check, Users, HardHat, Droplets, Layers, Search, ScanSearch, ClipboardCheck, FileSearch, Calculator, Wrench, Building2, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";

// Home-page Expert Remedial Advice services.
// Drives the interactive left-list / carousel / details layout.
// Swap `image` to replace any slide — paths are relative to /public.
const expertAdviceCards = [
  {
    title: "Preliminary Defect Assessment",
    short: "Independent defect identification and documentation.",
    description: "Identify and document defects with a clear, independent assessment.",
    detail:
      "A clear, independent first look at your building. We identify and document defects, explain likely causes and set out what matters most — so you can make confident next-step decisions.",
    points: [
      "Independent defect identification",
      "Clear written documentation",
      "Risk-based next steps",
    ],
    image: "/Images/Preliminary%20Defect%20Assessment.jpg",
    href: "/expert-remedial-advice/preliminary-defect-assessment",
    cta: "View Service",
    Icon: ClipboardCheck,
  },
  {
    title: "Scope, Quote & Tender Review",
    short: "Check scopes, quotes and tenders for fairness.",
    description: "Independent review of scopes, quotes and tenders to ensure completeness, accuracy and fairness.",
    detail:
      "An independent review of your scope, quotes and tenders to ensure they are complete, accurate and fair — helping you compare submissions on equal footing and avoid gaps that cost you later.",
    points: [
      "Completeness and accuracy checks",
      "Like-for-like comparison",
      "Independent, unbiased review",
    ],
    image: "/Images/Scope%2C%20Quote%20%26%20Tender%20Review.jpg",
    href: "/expert-remedial-advice/scope-quote-tender-review",
    cta: "Learn More",
    Icon: FileSearch,
  },
  {
    title: "Remedial Budget Estimate",
    short: "Realistic budgets for planning and funding.",
    description: "Realistic budget estimates to support planning, funding and decision making.",
    detail:
      "Realistic, well-reasoned budget estimates to support your planning, funding and decision making — giving committees and owners a dependable figure to work from before committing to works.",
    points: [
      "Realistic, defensible estimates",
      "Supports funding decisions",
      "Clear assumptions and scope",
    ],
    image: "/Images/Remedial%20Budget%20Estimate.jpg",
    href: "/expert-remedial-advice/remedial-budget-estimate",
    cta: "View Service",
    Icon: Calculator,
  },
  {
    title: "Building Repair Strategy Advice",
    short: "Risk-based repair strategy for your asset.",
    description: "Tailored repair strategies and risk-based recommendations to protect your asset.",
    detail:
      "Tailored repair strategies and risk-based recommendations that protect your asset and prioritise the right works in the right order — balancing durability, disruption and long-term value.",
    points: [
      "Tailored repair strategy",
      "Risk-based prioritisation",
      "Long-term asset protection",
    ],
    image: "/Images/Building%20Repair%20Strategy%20Advice.jpg",
    href: "/expert-remedial-advice/building-repair-strategy-advice",
    cta: "View Service",
    Icon: Wrench,
  },
  {
    title: "Pre-Purchase Apartment Defect Review",
    short: "Defect and risk review before you buy.",
    description: "Independent defect review and risk assessment before you buy.",
    detail:
      "An independent defect review and risk assessment before you buy — surfacing the building issues and red flags that affect value and liveability, so you can negotiate and decide with eyes open.",
    points: [
      "Independent pre-purchase review",
      "Building risk red flags",
      "Confident buying decisions",
    ],
    image: "/Images/Categories/facade-external-envelope.jpg",
    href: "/expert-remedial-advice/pre-purchase-apartment-defect-review",
    cta: "View Service",
    Icon: Building2,
  },
  {
    title: "Capital Works Forecast",
    short: "Long-term forecasting for confident budgeting.",
    description: "Long-term capital works forecasting to plan and budget with confidence.",
    detail:
      "Long-term capital works forecasting so you can plan and budget with confidence — mapping anticipated works across the years ahead to keep funds, levies and major projects on a steady footing.",
    points: [
      "Long-term works forecast",
      "Steady, planned budgeting",
      "Supports strata planning",
    ],
    image: "/Images/Capital%20Works%20Forecast.jpg",
    href: "/expert-remedial-advice/capital-works-forecast",
    cta: "View Service",
    Icon: LineChart,
  },
];

// Simple "How it works" steps shown beneath the Expert Remedial Advice section.
const expertAdviceSteps = [
  { step: "1", title: "Select a Service", text: "Choose the independent advice that fits your situation." },
  { step: "2", title: "Share Your Documents", text: "Send plans, photos, reports or quotes for review." },
  { step: "3", title: "Receive Expert Advice", text: "Get clear, independent written guidance you can act on." },
];

interface CoreService {
  title: string;
  text: string;
  image: string;
  href: string;
  badge?: string;
  underDevelopment?: boolean;
  quickLinks?: { label: string; href: string; available: boolean }[];
}

const coreServices: CoreService[] = [
  {
    title: "Defect Library",
    text: "Structured guidance for common Class 2 building defects, organised by category, cause, risk and repair pathway.",
    image: "/Images/Defect%20Library.jpg",
    href: "/defect-library",
    badge: "In Development",
    underDevelopment: true,
  },
  {
    title: "Repair Systems",
    text: "Technical reference for concrete repair mortars, corrosion inhibitors, waterproofing, crack injection and coatings — structured for Australian Class 2 remedial practice.",
    image: "/Images/Repair%20methods.jpg",
    href: "/repair-systems",
    badge: "In Development",
    underDevelopment: true,
  },
  {
    title: "Materials & Products Index",
    text: "Search products and materials used across existing repair system pages, grouped by brand, material type, application, and linked repair system.",
    image: "/Images/Material%20and%20tools.jpg",
    href: "/materials-products-index",
    badge: "Now Live",
  },
  {
    title: "AI Scope Builder",
    text: "AI-assisted remedial scope writing — select defects, repair systems, materials and clauses, then generate a consultant, builder, strata or tender scope.",
    image: "/Images/AI%20Scope%20Builder.jpg",
    href: "/ai-scope-builder",
    badge: "Live",
    quickLinks: [
      { label: "New Scope",        href: "/ai-scope-builder",      available: true },
      { label: "Saved Projects",   href: "/ai-scope-builder/projects", available: true },
    ],
  },
  {
    title: "Courses",
    text: "Training resources covering remedial building works, waterproofing systems, concrete repair, defect identification and industry practice.",
    image: "/Images/Courses.jpg",
    href: "/courses",
  },
  {
    title: "Useful Resources",
    text: "Practical drawings, data sheets, spreadsheets and reference documents suited to remedial building scopes, systems and industry applications.",
    image: "/Images/technical%20Resources.jpg",
    href: "/useful-resources",
  },
];


// Add new cover photos here as they are saved — they will automatically rotate across hero slides.
const coverPhotos = [
  "/Images/Home%20Cover%20Photo%201.Jpg",
  "/Images/Home%20Cover%20Photo%202.Jpg",
  "/Images/Home%20Cover%20Photo%203.Jpg",
];

const heroSlidesBase = [
  {
    label: "Business Directory",
    title: "Find remedial building specialists across Australia.",
    description: "Search waterproofing contractors, façade engineers, strata building consultants and more — filtered by location, licence status and specialisation.",
    href: "/directory",
    cta: "Search the Directory",
  },
  {
    label: "Defect Library",
    title: "Every major Class 2 building defect — causes, risks and repair pathways.",
    description: "Structured technical guidance on concrete deterioration, waterproofing failure, façade defects, basement ingress and more — organised for Australian strata practice.",
    href: "/defect-library",
    cta: "Explore Defect Library",
  },
  {
    label: "Repair Systems",
    title: "Technical product reference for every stage of remedial work.",
    description: "Repair mortars, corrosion inhibitors, waterproofing membranes, crack injection systems and protective coatings — with product comparisons, specs and selection criteria.",
    href: "/repair-systems",
    cta: "Browse Repair Systems",
  },
  {
    label: "News & Insights",
    title: "Regulatory and technical updates for the remedial building sector.",
    description: "Coverage of Building Commission decisions, DBP Act changes, strata remedial obligations, waterproofing compliance and façade rectification programs.",
    href: "/industry-news",
    cta: "Read News & Insights",
  },
  {
    label: "AI Scope Builder",
    title: "Generate a professional scope of works in minutes.",
    description: "Select your defects, repair systems and clauses — the AI Scope Builder structures a consultant, builder or strata-ready scope of works tailored to the job.",
    href: "/ai-scope-builder",
    cta: "Open AI Scope Builder",
  },
];

const heroSlides = heroSlidesBase.map((slide, i) => ({
  ...slide,
  image: coverPhotos[i % coverPhotos.length],
}));


type NewsSlide = {
  title: string;
  slug: string;
  tag: string;
  summary: string;
  source: string;
  publishedDate: string;
  sourceUrl: string;
  /** "insight" = original RBA-published article (links to /rba-insights). */
  kind?: "news" | "insight";
  href?: string;
};


export default function HomeClient() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [carouselImages, setCarouselImages] = useState<string[]>([]);
  const [newsImageIndex, setNewsImageIndex] = useState(0);
  const [newsSlides, setNewsSlides] = useState<NewsSlide[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [directoryQuery, setDirectoryQuery] = useState("");
  const [activeExpertService, setActiveExpertService] = useState(0);
  const [expertPaused, setExpertPaused] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Load available carousel images dynamically from the News folder
  useEffect(() => {
    fetch("/api/news-images")
      .then((r) => r.json())
      .then((imgs: string[]) => { if (imgs.length > 0) setCarouselImages(imgs); })
      .catch(() => {});
  }, []);

  // Rotate carousel — restarts if image list changes
  useEffect(() => {
    if (carouselImages.length === 0) return;
    const timer = setInterval(() => {
      setNewsImageIndex((i) => (i + 1) % carouselImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  // Auto-advance the Expert Remedial Advice carousel (pauses on hover/focus)
  useEffect(() => {
    if (expertPaused) return;
    const timer = setInterval(() => {
      setActiveExpertService((i) => (i + 1) % expertAdviceCards.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [expertPaused]);

  useEffect(() => {
    async function fetchNews() {
      try {
        const [newsRes, insightRes] = await Promise.all([
          supabase
            .from("industry_news")
            .select("title, slug, category, summary, source_name, published_date, source_url")
            .eq("status", "published")
            .order("published_date", { ascending: false, nullsFirst: false })
            .order("created_at", { ascending: false })
            .limit(15),
          // RBA's own published insights — mixed into this list, badged + linked internally.
          supabase
            .from("rba_insights_articles")
            .select("title, slug, category, summary, published_date")
            .eq("status", "published")
            .order("published_date", { ascending: false, nullsFirst: false })
            .limit(15),
        ]);

        const newsSlides: NewsSlide[] = (newsRes.error ? [] : newsRes.data ?? []).map((row) => ({
          title: row.title ?? "",
          slug: row.slug ?? "",
          tag: row.category ?? "Other",
          summary: row.summary ?? "",
          source: row.source_name ?? "Remedial Building Australia",
          publishedDate: row.published_date ?? "",
          sourceUrl: row.source_url ?? "",
          kind: "news" as const,
        }));

        const insightSlides: NewsSlide[] = (insightRes.error ? [] : insightRes.data ?? []).map((row) => ({
          title: (row.title ?? "").trim(),
          slug: row.slug ?? "",
          tag: row.category ?? "RBA Insight",
          summary: row.summary ?? "",
          source: "Remedial Building Australia",
          publishedDate: row.published_date ?? "",
          sourceUrl: "",
          kind: "insight" as const,
          href: `/rba-insights/${row.slug ?? ""}`,
        }));

        const merged = [...newsSlides, ...insightSlides].sort((a, b) => {
          const ta = a.publishedDate ? new Date(a.publishedDate).getTime() : 0;
          const tb = b.publishedDate ? new Date(b.publishedDate).getTime() : 0;
          return tb - ta;
        });

        if (merged.length > 0) setNewsSlides(merged);
      } finally {
        setNewsLoading(false);
      }
    }
    fetchNews();
  }, []);

  const activeHero = heroSlides[heroIndex];
  const activeExpert = expertAdviceCards[activeExpertService];

  return (
    <div className="min-h-screen bg-white text-sky-950">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden bg-sky-800">
          <AnimatePresence mode="wait">
            <motion.div
              key={heroIndex}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              <img
                src={activeHero.image}
                alt={activeHero.label}
                className="h-full w-full object-cover opacity-40"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-sky-950/95 via-sky-800/75 to-sky-700/20" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white to-transparent" />

          <div className="relative mx-auto max-w-7xl px-10 py-24 md:px-16 md:py-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={heroIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-5 inline-flex rounded-full border border-white/25 bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-white">
                  {activeHero.label}
                </div>

                <h2 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
                  {activeHero.title}
                </h2>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-sky-50">
                  {activeHero.description}
                </p>

                <div className="mt-8">
                  <a href={activeHero.href} className="inline-flex items-center gap-2 rounded-xl bg-red-700 px-7 py-4 text-base font-semibold text-white hover:bg-red-800 transition">
                    {activeHero.cta}
                    <ArrowRight size={16} />
                  </a>
                </div>

              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex gap-2">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setHeroIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === heroIndex ? "w-8 bg-white" : "w-2 bg-white/40"}`}
                  aria-label={heroSlides[i].label}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── SEO intro / about ───────────────────────────────────────────── */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-4xl px-6 py-14">
            <h1 className="text-3xl font-extrabold tracking-tight text-sky-950 md:text-4xl">
              Remedial Building Australia
            </h1>
            <div className="mt-5 flex flex-col gap-4 text-base leading-7 text-slate-600">
              <p>
                Remedial Building Australia is an independent knowledge platform for the remedial
                building sector — bringing together remedial building advice, defect guidance,
                repair system information and remedial specifications for strata and apartment
                buildings across the country. From strata remedial works to recurring apartment
                building defects, our resources help you understand the problem before any repair
                begins.
              </p>
              <p>
                Whether you are sourcing{" "}
                <a href="/remedial-building-services" className="font-semibold text-sky-700 hover:text-red-700">Remedial Building Services</a>,
                planning{" "}
                <a href="/building-remediation" className="font-semibold text-sky-700 hover:text-red-700">Building Remediation</a>{" "}
                works, preparing{" "}
                <a href="/remedial-repair-specifications" className="font-semibold text-sky-700 hover:text-red-700">Remedial Repair Specifications</a>,
                or comparing{" "}
                <a href="/remedial-building-solutions" className="font-semibold text-sky-700 hover:text-red-700">Remedial Building Solutions</a>,
                our resources span remedial construction, concrete repair, waterproofing and façade
                rectification to help owners, committees and consultants make confident decisions.
                You can also find{" "}
                <a href="/remedial-builders" className="font-semibold text-sky-700 hover:text-red-700">Remedial Builders</a>{" "}
                through our national directory.
              </p>
            </div>
          </div>
        </section>

        {/* ── Find Strata Building Specialists ────────────────────────────── */}
        <section className="border-y border-slate-200 bg-slate-50 py-14">
          <div className="mx-auto max-w-7xl px-5">
            <div className="mb-8">
              <div className="text-sm font-extrabold uppercase tracking-[0.25em] text-red-700">Industry Directory</div>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-sky-950 md:text-4xl">
                Find Strata Building Specialists
              </h2>
              <p className="mt-2 text-base text-slate-500">
                Search Australia&rsquo;s strata building services directory
              </p>
            </div>

            {/* Search bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const q = directoryQuery.trim();
                window.location.href = q ? `/directory?q=${encodeURIComponent(q)}` : "/directory";
              }}
              className="mb-8 flex max-w-2xl gap-2"
            >
              <input
                type="text"
                value={directoryQuery}
                onChange={(e) => setDirectoryQuery(e.target.value)}
                placeholder="Search by service, suburb or postcode…"
                className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm transition focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
              />
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-sky-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-800"
              >
                Go to Directory Page
              </button>
            </form>

            {/* Category cards */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {[
                { name: "Remedial Consultants",   href: "/directory?category=consultants-practitioners",  Icon: Users      },
                { name: "Remedial Builders",      href: "/directory?category=remedial-contractors",        Icon: HardHat    },
                { name: "Waterproofing",          href: "/directory?category=waterproofing",               Icon: Droplets   },
                { name: "Facade & Cladding",      href: "/directory?category=facade-external-envelope",    Icon: Layers     },
                { name: "Access Systems",         href: "/directory?category=access-systems",              Icon: Search     },
                { name: "Testing & Investigation",href: "/directory?category=investigation-testing",       Icon: ScanSearch },
              ].map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                    <Icon size={20} />
                  </span>
                  <span className="text-xs font-bold leading-tight text-sky-950">{name}</span>
                </a>
              ))}
            </div>

            {/* Browse all link */}
            <div className="mt-7 text-center">
              <a
                href="/directory"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-sky-800 shadow-sm transition hover:border-sky-300 hover:text-red-700"
              >
                Browse the Full Directory <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="text-sm font-extrabold uppercase tracking-[0.25em] text-red-700">News &amp; Insights</div>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-sky-950 md:text-5xl">Latest News &amp; Insights</h2>
            </div>
            <a href="/industry-news" className="shrink-0 text-sm font-bold text-sky-700 hover:text-red-700">View all →</a>
          </div>

          <div className="grid gap-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[1fr_1fr]">
            {/* Rotating image panel — images loaded dynamically from /Images/News/ */}
            <div className="relative min-h-[280px] bg-slate-200">
              {carouselImages.length > 0 ? (
                carouselImages.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt="Industry news"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: i === newsImageIndex % carouselImages.length ? 1 : 0,
                      transition: "opacity 0.9s ease",
                    }}
                  />
                ))
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-sky-900 to-sky-950" />
              )}
              {carouselImages.length > 1 && (
                <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-1.5">
                  {carouselImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setNewsImageIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === newsImageIndex % carouselImages.length ? "w-5 bg-white" : "w-1.5 bg-white/50"}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Articles list — scrollable, newest first */}
            <div className="flex flex-col px-6 py-5">
              <div className="mb-4 flex shrink-0 items-center justify-between">
                <h3 className="text-base font-extrabold tracking-tight text-sky-950">Latest News</h3>
                <a href="/industry-news" className="text-xs font-bold text-sky-600 hover:text-red-700">View all →</a>
              </div>
              <div className="divide-y divide-slate-100 overflow-y-auto" style={{ maxHeight: "520px" }}>
              {newsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="h-6 w-6 animate-spin rounded-full border-4 border-slate-200 border-t-sky-700" />
                </div>
              ) : newsSlides.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-sm text-slate-400">No recent articles.</p>
                </div>
              ) : newsSlides.map((slide, idx) => {
                const dateStr = slide.publishedDate
                  ? (() => { const d = new Date(slide.publishedDate); return isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }); })()
                  : "";
                const hiddenSources = new Set(["Google News", "Industry News"]);
                const source = hiddenSources.has(slide.source) ? "" : slide.source;
                const showTag = slide.tag && slide.tag !== "Other";
                const summary = slide.summary
                  .replace(/<[^>]+>/g, " ")
                  .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
                  .replace(/https?:\/\/\S+/g, "")
                  .replace(/\s{2,}/g, " ").trim();
                const meta = [showTag ? slide.tag : null, dateStr, source].filter(Boolean).join(" · ");
                const cleanedTitle = slide.title.replace(/\s+-\s+[^-]+$/, "").trim() || slide.title;
                const isDuplicate = summary.toLowerCase().replace(/[^\w]/g, "").startsWith(cleanedTitle.toLowerCase().replace(/[^\w]/g, "").slice(0, 60));
                return (
                  <div key={`${slide.kind ?? "news"}-${slide.slug || slide.title}`} className="py-4">
                    {meta && <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{meta}</p>}
                    <div className="flex items-baseline gap-2">
                      <span className="shrink-0 text-sm font-bold text-sky-950">{idx + 1}.</span>
                      <span className="leading-snug">
                        {slide.kind === "insight" && (
                          <span className="mr-1.5 inline-block rounded bg-sky-100 px-1.5 py-0.5 align-middle text-[9px] font-bold uppercase tracking-wider text-sky-800">
                            RBA Insight
                          </span>
                        )}
                        {slide.slug ? (
                          <a href={slide.href ?? `/industry-news/${slide.slug}`}
                            className="text-sm font-semibold text-sky-950 hover:text-red-700 hover:underline">
                            {cleanedTitle}
                          </a>
                        ) : (
                          <span className="text-sm font-semibold text-sky-950">{cleanedTitle}</span>
                        )}
                      </span>
                    </div>
                    {summary && !isDuplicate && (
                      <p className="mt-1 pl-5 line-clamp-2 text-sm leading-6 text-slate-500">{summary}</p>
                    )}
                  </div>
                );
              })}
              </div>
            </div>
          </div>
        </section>

        {/* ── Expert Remedial Advice ───────────────────────────────────────── */}
        <section className="border-y border-slate-100 bg-slate-50/60">
          <div className="mx-auto max-w-7xl px-5 py-20">
            <div className="mb-10">
              <div className="text-sm font-extrabold uppercase tracking-[0.25em] text-red-700">Expert Remedial Advice</div>
              <h2 className="mt-2 max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-4xl">
                Independent desktop advice for building defects, scopes, budgets and strata planning
              </h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-500">
                Practical, independent guidance from experienced professionals to help you make confident decisions at every stage of the remedial process.
              </p>
            </div>

            {/* Interactive: service list · preview carousel · selected details */}
            <div
              className="grid items-stretch gap-6 lg:grid-cols-12"
              onMouseEnter={() => setExpertPaused(true)}
              onMouseLeave={() => setExpertPaused(false)}
            >
              {/* Left — service list */}
              <div className="lg:col-span-3">
                <ul className="flex flex-col gap-2.5">
                  {expertAdviceCards.map((s, i) => {
                    const ListIcon = s.Icon;
                    const active = i === activeExpertService;
                    return (
                      <li key={s.title}>
                        <button
                          type="button"
                          onClick={() => setActiveExpertService(i)}
                          aria-pressed={active}
                          className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                            active
                              ? "border-red-200 bg-white text-sky-950 shadow-sm ring-1 ring-red-100"
                              : "border-slate-200 bg-white/60 text-sky-800 hover:border-sky-300 hover:bg-white hover:text-red-700"
                          }`}
                        >
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition ${
                              active ? "bg-red-700 text-white" : "bg-slate-100 text-sky-800"
                            }`}
                          >
                            <ListIcon size={18} />
                          </span>
                          <span className="text-sm font-semibold leading-snug">{s.title}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Middle — preview carousel (~1.3× larger) */}
              <div className="lg:col-span-5">
                <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                  <div className="relative h-72 w-full overflow-hidden sm:h-80 lg:h-[23rem]">
                    {expertAdviceCards.map((s, i) => (
                      <img
                        key={s.title}
                        src={s.image}
                        alt={s.title}
                        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                          i === activeExpertService ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-t from-sky-950/80 via-sky-950/15 to-transparent" />

                    {/* Caption */}
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <div className="text-xs font-bold uppercase tracking-[0.22em] text-white/80">Expert Advice</div>
                      <div className="mt-1 text-xl font-extrabold leading-tight text-white md:text-2xl">{activeExpert.title}</div>
                    </div>

                    {/* Arrows */}
                    <button
                      type="button"
                      aria-label="Previous service"
                      onClick={() =>
                        setActiveExpertService((i) => (i - 1 + expertAdviceCards.length) % expertAdviceCards.length)
                      }
                      className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-sky-950 shadow-md ring-1 ring-slate-200 transition hover:bg-white hover:text-red-700"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      type="button"
                      aria-label="Next service"
                      onClick={() => setActiveExpertService((i) => (i + 1) % expertAdviceCards.length)}
                      className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-sky-950 shadow-md ring-1 ring-slate-200 transition hover:bg-white hover:text-red-700"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>

                  {/* Dots */}
                  <div className="flex items-center justify-center gap-2 py-4">
                    {expertAdviceCards.map((s, i) => (
                      <button
                        key={s.title}
                        type="button"
                        aria-label={`Show ${s.title}`}
                        aria-current={i === activeExpertService}
                        onClick={() => setActiveExpertService(i)}
                        className={`h-2.5 rounded-full transition-all ${
                          i === activeExpertService ? "w-7 bg-red-700" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right — selected service details */}
              <div className="lg:col-span-4">
                <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-700 ring-1 ring-red-100">
                    <activeExpert.Icon size={24} />
                  </span>
                  <h3 className="mt-4 text-xl font-extrabold leading-snug text-sky-950">{activeExpert.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">{activeExpert.detail}</p>

                  <ul className="mt-5 flex flex-col gap-2.5">
                    {activeExpert.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm font-medium text-sky-900">
                        <Check size={16} className="mt-0.5 shrink-0 text-red-700" />
                        {p}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
                    <a
                      href={activeExpert.href}
                      className="inline-flex items-center gap-2 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-red-800"
                    >
                      {activeExpert.cta}
                      <ArrowRight size={15} />
                    </a>
                    <a
                      href="/expert-remedial-advice"
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-sky-800 transition hover:border-sky-300 hover:text-red-700"
                    >
                      All Services
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* How it works */}
            <div className="mt-14">
              <div className="mb-6 text-center text-sm font-bold uppercase tracking-[0.22em] text-sky-800">How it works</div>
              <div className="grid gap-5 sm:grid-cols-3">
                {expertAdviceSteps.map((s) => (
                  <div key={s.step} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-950 text-base font-extrabold text-white">
                      {s.step}
                    </span>
                    <div>
                      <div className="text-base font-extrabold text-sky-950">{s.title}</div>
                      <p className="mt-1 text-sm leading-6 text-slate-500">{s.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20">
          <div className="mb-10">
            <div className="text-sm font-extrabold uppercase tracking-[0.25em] text-red-700">What We Provide</div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-sky-950 md:text-4xl">Core platform sections</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {coreServices.map((service) => (
              <a
                key={service.title}
                href={service.href}
                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover"
                  />
                  {service.badge && (
                    <div className="absolute right-4 top-4 rounded-full bg-sky-950 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow">
                      {service.badge}
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <div className="mb-4 h-1.5 w-12 rounded-full bg-red-700" />
                  <h3 className="text-2xl font-extrabold text-sky-950">{service.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-500">{service.text}</p>

                  {service.underDevelopment && (
                    <p className="mt-3 inline-flex items-center gap-1.5 self-start rounded-lg bg-amber-50 px-2.5 py-1.5 text-xs font-semibold text-amber-800 ring-1 ring-amber-200">
                      <span aria-hidden>🚧</span> This section is still under development
                    </p>
                  )}

                  {service.quickLinks && service.quickLinks.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {service.quickLinks.map((ql) =>
                        ql.available ? (
                          <span
                            key={ql.label}
                            onClick={(e) => { e.preventDefault(); window.location.href = ql.href; }}
                            className="inline-flex cursor-pointer items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-bold text-sky-800 transition hover:bg-sky-100 hover:text-red-700"
                          >
                            {ql.label}
                          </span>
                        ) : (
                          <span
                            key={ql.label}
                            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-400"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                            {ql.label}
                          </span>
                        )
                      )}
                    </div>
                  )}

                  <div className="mt-auto pt-6 flex items-center text-sm font-bold text-sky-700 group-hover:text-red-700 transition">
                    View more <ArrowRight className="ml-2" size={16} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <SeoCrossPromo />

        <NewsletterSignup variant="section" />
      </main>

      <footer className="border-t border-sky-100 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
              A structured Australian remedial building knowledge platform — defects, repair systems, industry news, business directory and AI-assisted scope writing.
            </p>
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
          © 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved. Unauthorised reproduction prohibited.
        </div>
      </footer>
    </div>
  );
}