"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, Users, HardHat, Droplets, Layers, Search, ScanSearch } from "lucide-react";
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
    title: "Find verified remedial building specialists across Australia.",
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
};


export default function RemedialBuildingAustraliaHome() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [carouselImages, setCarouselImages] = useState<string[]>([]);
  const [newsImageIndex, setNewsImageIndex] = useState(0);
  const [newsSlides, setNewsSlides] = useState<NewsSlide[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [directoryQuery, setDirectoryQuery] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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

  useEffect(() => {
    async function fetchNews() {
      try {
        const { data, error } = await supabase
          .from("industry_news")
          .select("title, slug, category, summary, source_name, published_date, source_url")
          .eq("status", "published")
          .order("published_date", { ascending: false, nullsFirst: false })
          .order("created_at", { ascending: false })
          .limit(15);

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
            <a href="/" className="whitespace-nowrap hover:text-red-700 transition">Home</a>
            <a href="/repair-systems" className="whitespace-nowrap hover:text-red-700 transition">Repair Systems</a>
            <a href="/industry-news" className="whitespace-nowrap hover:text-red-700 transition">News &amp; Insights</a>
            <a href="/directory" className="whitespace-nowrap hover:text-red-700 transition">Directory</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700 transition">AI Scope Builder</a>
          </nav>

          <a href="/directory/login" className="hidden shrink-0 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800 transition md:inline-flex">Login / Create Account</a>
          <button
            className="md:hidden p-1"
            onClick={() => setMobileNavOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <Menu size={22} />
          </button>
        </div>
        {mobileNavOpen && (
          <div className="border-t border-sky-100 bg-white px-6 py-4 md:hidden">
            <nav className="flex flex-col gap-4 text-sm font-semibold text-sky-800">
              <a href="/" onClick={() => setMobileNavOpen(false)} className="hover:text-red-700 transition">Home</a>
              <a href="/repair-systems" onClick={() => setMobileNavOpen(false)} className="hover:text-red-700 transition">Repair Systems</a>
              <a href="/industry-news" onClick={() => setMobileNavOpen(false)} className="hover:text-red-700 transition">News &amp; Insights</a>
              <a href="/ai-scope-builder" onClick={() => setMobileNavOpen(false)} className="hover:text-red-700 transition">AI Scope Builder</a>
              <a href="/defect-library" onClick={() => setMobileNavOpen(false)} className="hover:text-red-700 transition">Defect Library</a>
              <a href="/directory" onClick={() => setMobileNavOpen(false)} className="hover:text-red-700 transition">Business Directory</a>
              <a href="/directory/login" onClick={() => setMobileNavOpen(false)} className="mt-2 inline-flex rounded-xl bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800 transition">Login / Create Account</a>
            </nav>
          </div>
        )}
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
                Search Directory
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
              A structured Australian remedial building knowledge platform — defects, repair systems, industry news, business directory and AI-assisted scope writing.
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