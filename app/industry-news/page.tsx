"use client";

import { useState, useMemo } from "react";
import { Search, Mail, ArrowRight } from "lucide-react";

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
  externalUrl: string;
  tags: string[];
  featured: boolean;
};

// ─── Categories ───────────────────────────────────────────────────────────────

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

// ─── Article Data ─────────────────────────────────────────────────────────────

const articles: Article[] = [
  {
    id: "1",
    title: "Building Commission NSW Releases Updated Inspection Framework for Class 2 Buildings",
    slug: "bcnsw-updated-inspection-framework-class-2",
    category: "Building Commission NSW",
    source: "Building Commission NSW",
    publishedDate: "2026-05-15",
    image: "/Images/Categories/facade-external-envelope.jpg",
    excerpt:
      "The Building Commission NSW has released an updated inspection framework targeting Class 2 residential buildings, with increased scrutiny on waterproofing, concrete elements and façade systems throughout the construction phase.",
    externalUrl: "#",
    tags: ["Building Commission", "Class 2", "Inspection", "NSW"],
    featured: true,
  },
  {
    id: "2",
    title: "DBP Act Compliance: Key Obligations for Design and Building Practitioners in 2026",
    slug: "dbp-act-compliance-obligations-2026",
    category: "DBP Act",
    source: "NSW Fair Trading",
    publishedDate: "2026-05-10",
    image: "/Images/Categories/basements-substructure.jpg",
    excerpt:
      "NSW Fair Trading has outlined updated compliance expectations under the Design and Building Practitioners Act, with focus on documentation requirements for declared engineering work on Class 2 buildings.",
    externalUrl: "#",
    tags: ["DBP Act", "Compliance", "NSW", "Class 2"],
    featured: true,
  },
  {
    id: "3",
    title: "Waterproofing Failures in Balcony Construction Remain the Leading Defect Type",
    slug: "waterproofing-failures-balcony-leading-defect",
    category: "Waterproofing Defects",
    source: "Remedial Building Australia",
    publishedDate: "2026-05-08",
    image: "/Images/Categories/waterproofing-water-ingress.jpg",
    excerpt:
      "Analysis of recent defect reports across Class 2 buildings continues to identify balcony waterproofing failures as the most frequently recorded defect type, driven by poor substrate preparation and inadequate membrane detailing at junctions.",
    externalUrl: "#",
    tags: ["Waterproofing", "Balcony", "Defects", "Class 2"],
    featured: true,
  },
  {
    id: "4",
    title: "Concrete Spalling and Carbonation: Assessment Requirements for Existing Buildings",
    slug: "concrete-spalling-carbonation-assessment",
    category: "Concrete Repair",
    source: "Engineers Australia",
    publishedDate: "2026-05-05",
    image: "/Images/Categories/concrete-structural-defects.jpg",
    excerpt:
      "Updated guidance on carbonation depth testing and concrete cover assessment for existing structures, particularly relevant for buildings constructed prior to current Australian Standards on concrete durability.",
    externalUrl: "#",
    tags: ["Concrete", "Carbonation", "Spalling", "Structural"],
    featured: false,
  },
  {
    id: "5",
    title: "NSW Cladding Combustibility Compliance — Façade Rectification Progress",
    slug: "nsw-cladding-facade-rectification-progress",
    category: "Façade Defects",
    source: "NSW Government",
    publishedDate: "2026-04-28",
    image: "/Images/Categories/facade-external-envelope.jpg",
    excerpt:
      "The NSW Government has released updated data on the cladding rectification programme, with hundreds of buildings still requiring works and new compliance pathway guidance issued for building owners and owners corporations.",
    externalUrl: "#",
    tags: ["Cladding", "Façade", "Rectification", "NSW"],
    featured: false,
  },
  {
    id: "6",
    title: "Strata Building Bond and Defect Inspections — What Owners Corporations Need to Know",
    slug: "strata-building-bond-defect-inspections",
    category: "Strata Defects",
    source: "NSW Fair Trading",
    publishedDate: "2026-04-22",
    image: "/Images/Categories/balconies-podiums.jpg",
    excerpt:
      "NSW Fair Trading has updated its guidance for owners corporations on the strata building bond and inspection scheme, clarifying how the bond is triggered, inspected and claimed for serious building defects.",
    externalUrl: "#",
    tags: ["Strata", "Building Bond", "Owners Corporation", "NSW"],
    featured: false,
  },
  {
    id: "7",
    title: "Roof Waterproofing Defects in Class 2 Buildings — Common Failure Mechanisms",
    slug: "roof-waterproofing-defects-class-2-failure",
    category: "Waterproofing Defects",
    source: "Remedial Building Australia",
    publishedDate: "2026-04-18",
    image: "/Images/Categories/roofing-defects.jpg",
    excerpt:
      "A review of roof waterproofing failures in Class 2 residential buildings identifies inadequate lap detailing, membrane incompatibility and poor penetration sealing as the three most common causes of premature failure.",
    externalUrl: "#",
    tags: ["Roofing", "Waterproofing", "Class 2", "Defects"],
    featured: false,
  },
  {
    id: "8",
    title: "Polyurethane vs Epoxy Crack Injection — Selecting the Right System",
    slug: "polyurethane-vs-epoxy-crack-injection-guide",
    category: "Product & Material Updates",
    source: "Remedial Building Australia",
    publishedDate: "2026-04-12",
    image: "/Images/Categories/concrete-structural-defects.jpg",
    excerpt:
      "A technical comparison of polyurethane foam and epoxy resin crack injection systems, covering crack type suitability, movement tolerance, substrate conditions and long-term performance expectations.",
    externalUrl: "#",
    tags: ["Crack Injection", "Polyurethane", "Epoxy", "Concrete Repair"],
    featured: false,
  },
  {
    id: "9",
    title: "Building Commission NSW — Inspection Results for New Class 2 Buildings",
    slug: "bcnsw-class-2-inspection-results-2026",
    category: "Building Commission NSW",
    source: "Building Commission NSW",
    publishedDate: "2026-04-08",
    image: "/Images/Categories/basements-substructure.jpg",
    excerpt:
      "The Building Commission NSW has released its latest inspection results, with waterproofing, fire safety and structural elements continuing to generate the highest volume of non-conformance notices across new buildings.",
    externalUrl: "#",
    tags: ["Building Commission", "Inspections", "Non-Conformance", "Class 2"],
    featured: false,
  },
  {
    id: "10",
    title: "Remedial Scope Writing — Common Gaps That Lead to Disputed Claims",
    slug: "remedial-scope-writing-disputed-claims",
    category: "Remedial Construction",
    source: "Remedial Building Australia",
    publishedDate: "2026-04-03",
    image: "/Images/Categories/internal-defects-finishes.jpg",
    excerpt:
      "A review of disputed remedial building claims identifies scope ambiguity, missing hold points and undefined product specifications as the most common causes of cost disputes and defective repair outcomes.",
    externalUrl: "#",
    tags: ["Scope Writing", "Remedial", "Claims", "Documentation"],
    featured: false,
  },
  {
    id: "11",
    title: "Magnesite Flooring in Strata Buildings — Deterioration, Risk and Remediation",
    slug: "magnesite-flooring-strata-deterioration-remediation",
    category: "Strata Defects",
    source: "Remedial Building Australia",
    publishedDate: "2026-03-27",
    image: "/Images/Categories/internal-defects-finishes.jpg",
    excerpt:
      "Magnesite flooring in older strata buildings continues to cause moisture-related reinforcement corrosion and slab damage. This article outlines the assessment process and current remediation approaches used in the industry.",
    externalUrl: "#",
    tags: ["Magnesite", "Strata", "Flooring", "Deterioration"],
    featured: false,
  },
  {
    id: "12",
    title: "Reinforcement Corrosion in Coastal Class 2 Buildings — Assessment and Repair",
    slug: "reinforcement-corrosion-coastal-class-2",
    category: "Building Defects",
    source: "Remedial Building Australia",
    publishedDate: "2026-03-20",
    image: "/Images/Categories/concrete-structural-defects.jpg",
    excerpt:
      "Chloride-induced reinforcement corrosion in coastal Class 2 buildings requires a structured assessment approach to determine the extent of deterioration and inform a compliant, engineer-confirmed repair methodology.",
    externalUrl: "#",
    tags: ["Reinforcement", "Corrosion", "Coastal", "Concrete"],
    featured: false,
  },
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
  return (
    <a
      href={article.externalUrl}
      className="group flex overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:shadow-xl"
    >
      <div className="w-52 shrink-0 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <CategoryPill label={article.category} />
        <span className="mt-1.5 text-xs text-slate-400">{formatDate(article.publishedDate)}</span>
        <h2 className="mt-3 text-lg font-bold leading-snug text-sky-950 group-hover:text-sky-700">
          {article.title}
        </h2>
        <p className="mt-2 flex-1 text-sm leading-6 text-slate-500 line-clamp-3">{article.excerpt}</p>
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            {article.source}
          </span>
          <span className="flex items-center gap-1 text-xs font-bold text-sky-700 group-hover:text-red-700">
            Read More <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </a>
  );
}

// Stacked card — used for the two secondary featured articles
function FeaturedSideCard({ article }: { article: Article }) {
  return (
    <a
      href={article.externalUrl}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:shadow-lg"
    >
      <div className="h-32 w-full shrink-0 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <CategoryPill label={article.category} />
        <span className="mt-1.5 text-xs text-slate-400">{formatDate(article.publishedDate)}</span>
        <h3 className="mt-2 flex-1 text-sm font-bold leading-snug text-sky-950 group-hover:text-sky-700">
          {article.title}
        </h3>
        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            {article.source}
          </span>
          <span className="flex items-center gap-1 text-xs font-bold text-sky-700 group-hover:text-red-700">
            Read More <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </a>
  );
}

// Standard grid card — used in Latest News section
function NewsCard({ article }: { article: Article }) {
  return (
    <a
      href={article.externalUrl}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="h-36 w-full shrink-0 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <CategoryPill label={article.category} />
        <span className="mt-1.5 text-xs text-slate-400">{formatDate(article.publishedDate)}</span>
        <h3 className="mt-2 flex-1 text-sm font-bold leading-snug text-sky-950 group-hover:text-sky-700">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">{article.excerpt}</p>
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">{article.source}</span>
          <span className="flex items-center gap-1 text-xs font-bold text-sky-700 group-hover:text-red-700">
            Read More <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </a>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function IndustryNewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");

  const featuredArticles = useMemo(
    () => articles.filter((a) => a.featured).slice(0, 3),
    []
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
  }, [searchQuery, activeCategory, isFiltering]);

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
              Industry News
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
              Industry News
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

          {/* Featured — hidden when filtering */}
          {!isFiltering && (
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
          <section>
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
          </section>

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
            <a href="/about" className="hover:text-sky-700">About</a>
            <a href="/terms" className="hover:text-sky-700">Terms</a>
            <a href="/contact" className="hover:text-sky-700">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
