"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { NewsletterSignup } from "@/components/NewsletterSignup";

interface CoreService {
  title: string;
  text: string;
  image: string;
  href: string;
  badge?: string;
  quickLinks?: { label: string; href: string; available: boolean }[];
}

const coreServices: CoreService[] = [
  {
    title: "Defect Library",
    text: "Structured guidance for common Class 2 building defects, organised by category, cause, risk and repair pathway.",
    image: "/Images/Defect%20Library.jpg",
    href: "/defect-library",
  },
  {
    title: "Repair Systems",
    text: "Technical reference for concrete repair mortars, corrosion inhibitors, waterproofing, crack injection and coatings — structured for Australian Class 2 remedial practice.",
    image: "/Images/Repair%20methods.jpg",
    href: "/repair-systems",
    badge: "Now Live",
    quickLinks: [
      { label: "Repair Mortars",       href: "/repair-systems/repair-mortars",       available: true  },
      { label: "Corrosion Inhibitors", href: "/repair-systems/corrosion-inhibitors", available: false },
      { label: "Waterproofing",        href: "/repair-systems/waterproofing-systems", available: false },
    ],
  },
  {
    title: "Materials & Products",
    text: "Technical product database with applications, compatible substrates, coverage rates and linked defects.",
    image: "/Images/Material%20and%20tools.jpg",
    href: "/materials-products",
  },
  {
    title: "AI Scope Builder",
    text: "AI-assisted remedial scope writing — select defects, repair systems, materials and clauses, then generate a consultant, builder, strata or tender scope.",
    image: "/Images/AI%20Scope%20Builder.png",
    href: "/ai-scope-builder",
    badge: "Live",
    quickLinks: [
      { label: "New Scope",        href: "/ai-scope-builder/new",      available: true },
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
  "/Images/Home%20Cover%20Photo.Jpg",
  "/Images/Home%20Cover%20Photo%202.Jpg",
  "/Images/Home%20Cover%20Photo%203.Jpg",
];

const heroSlidesBase = [
  {
    label: "Defect Library",
    title: "Structured remedial building knowledge for Australian strata and Class 2 buildings.",
    description: "Structured guidance for common Class 2 building defects, organised by category, cause, risk and repair pathway.",
    href: "/defect-library",
    cta: "Explore Defect Library",
  },
  {
    label: "Repair Systems",
    title: "Compare and select the right repair system for every defect type.",
    description: "Concrete repair mortars, corrosion inhibitors, waterproofing systems, crack injection and coatings — now with product comparisons, technical specs and selection guidance.",
    href: "/repair-systems",
    cta: "Browse Repair Systems",
  },
  {
    label: "Materials & Products",
    title: "Technical product data prepared for real remedial applications.",
    description: "Future product database with applications, compatible substrates, coverage rates and defects linked directly to material selection.",
    href: "/materials-products",
    cta: "Browse Materials",
  },
  {
    label: "Industry News",
    title: "Stay current with remedial building and strata construction updates.",
    description: "Focused updates for Building Commission, DBP Act, strata remedial works, waterproofing compliance and façade rectification.",
    href: "/industry-news",
    cta: "Read Industry News",
  },
  {
    label: "AI Scope Builder",
    title: "AI-assisted scope writing built on structured technical data.",
    description: "Select defects, repair systems, materials and clauses — then generate a consultant, builder, strata or tender scope of works in seconds.",
    href: "/ai-scope-builder",
    cta: "Open AI Scope Builder",
  },
];

const heroSlides = heroSlidesBase.map((slide, i) => ({
  ...slide,
  image: coverPhotos[i % coverPhotos.length],
}));

const NEWS_IMAGES = [
  "/Images/News1.jpg",
  "/Images/News2-Building-Commissioner.jpg",
  "/Images/News3-class%202%20building%20Registration.jpg",
  "/Images/News5-Cladding.jpg",
  "/Images/News7-Concrete%20Spalling.jpg",
  "/Images/News8-Apartment.jpg",
  "/Images/News9waterproroing%20defects%20planterbxoes.jpg",
  "/Images/News10-NCC-Building%20Codes-Standard.jpg",
];

type NewsSlide = {
  title: string;
  slug: string;
  tag: string;
  summary: string;
  source: string;
  publishedDate: string;
  sourceUrl: string;
};


export default function RemedialBuildingAustraliaHome() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [newsImageIndex, setNewsImageIndex] = useState(0);
  const [newsSlides, setNewsSlides] = useState<NewsSlide[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setNewsImageIndex((i) => (i + 1) % NEWS_IMAGES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function fetchNews() {
      try {
        const { data, error } = await supabase
          .from("industry_news")
          .select("title, slug, category, summary, source_name, published_date, source_url")
          .eq("status", "published")
          .order("published_date", { ascending: false })
          .limit(5);

        if (!error && data && data.length > 0) {
          setNewsSlides(
            data.map((row) => ({
              title: row.title ?? "",
              slug: row.slug ?? "",
              tag: row.category ?? "Other",
              summary: row.summary ?? "",
              source: row.source_name ?? "Remedial Building Australia",
              publishedDate: row.published_date ?? "",
              sourceUrl: row.source_url ?? "",
            }))
          );
        }
      } finally {
        setNewsLoading(false);
      }
    }
    fetchNews();
  }, []);

  const activeHero = heroSlides[heroIndex];

  return (
    <div className="min-h-screen bg-white text-sky-950">
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8 py-5">
          <a href="/" className="flex shrink-0 items-center gap-3">
            <div>
              <div className="text-lg font-extrabold tracking-tight text-sky-950">
                Remedial Building Australia
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-900">
                Technical Remedial Building Platform
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-sky-800 md:flex">
            <a href="/defect-library"   className="whitespace-nowrap hover:text-red-700 transition">Defect Library</a>
            <a href="/repair-systems"   className="whitespace-nowrap hover:text-red-700 transition">Repair Systems</a>
            <a href="/industry-news"    className="whitespace-nowrap hover:text-red-700 transition">Industry News</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700 transition">AI Scope Builder</a>
          </nav>

          <a
            href="/newsletter"
            className="hidden shrink-0 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800 transition md:inline-flex"
          >
            Subscribe
          </a>
          <Menu className="md:hidden" />
        </div>
      </header>

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

                <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
                  {activeHero.title}
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-sky-50">
                  {activeHero.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={activeHero.href} className="rounded-xl bg-red-700 px-6 py-4 text-base font-semibold text-white hover:bg-red-800">
                    {activeHero.cta}
                  </a>
                  <a href="/defect-library" className="rounded-xl border border-white/40 bg-white/15 px-6 py-4 text-base font-semibold text-white hover:bg-white hover:text-sky-950">
                    Browse Defect Library
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

        <section className="mx-auto max-w-7xl px-5 py-20">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="text-sm font-extrabold uppercase tracking-[0.25em] text-red-700">Industry News & Articles</div>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-sky-950 md:text-5xl">Latest Industry News</h2>
            </div>
            <a href="/industry-news" className="shrink-0 text-sm font-bold text-sky-700 hover:text-red-700">View all →</a>
          </div>

          <div className="grid gap-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[1fr_1fr]">
            {/* Rotating image panel */}
            <div className="relative bg-slate-200" style={{ minHeight: "280px" }}>
              {NEWS_IMAGES.map((src, i) => (
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
                    opacity: i === newsImageIndex ? 1 : 0,
                    transition: "opacity 0.9s ease",
                  }}
                />
              ))}
              {/* Dot indicators */}
              <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-1.5">
                {NEWS_IMAGES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setNewsImageIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === newsImageIndex ? "w-5 bg-white" : "w-1.5 bg-white/50"}`}
                  />
                ))}
              </div>
            </div>

            {/* Articles list */}
            <div className="px-6 py-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base font-extrabold tracking-tight text-sky-950">Latest News</h3>
                <a href="/industry-news" className="text-xs font-bold text-sky-600 hover:text-red-700">View all →</a>
              </div>
              <div className="divide-y divide-slate-100">
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
                  <div key={slide.title} className="py-4">
                    {meta && <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{meta}</p>}
                    <div className="flex items-baseline gap-2">
                      <span className="shrink-0 text-sm font-bold text-sky-950">{idx + 1}.</span>
                      {slide.slug ? (
                        <a href={`/industry-news/${slide.slug}`}
                          className="text-sm font-semibold leading-snug text-sky-950 hover:text-red-700 hover:underline">
                          {cleanedTitle}
                        </a>
                      ) : (
                        <span className="text-sm font-semibold leading-snug text-sky-950">{cleanedTitle}</span>
                      )}
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

                  {service.quickLinks && service.quickLinks.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {service.quickLinks.map((ql) =>
                        ql.available ? (
                          <span
                            key={ql.label}
                            onClick={(e) => { e.preventDefault(); window.location.href = ql.href; }}
                            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-bold text-sky-800 transition hover:bg-sky-100 hover:text-red-700"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
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

        <NewsletterSignup variant="section" />
      </main>

      <footer className="border-t border-sky-100 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
              A structured Australian remedial building knowledge platform for defects, repair systems, materials and future AI-assisted scope writing.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm font-semibold text-slate-500 md:grid-cols-3">
            <a href="/about">About</a>
            <a href="/terms">Terms</a>
            <a href="/contact">Contact</a>          </div>
        </div>
      </footer>
    </div>
  );
}