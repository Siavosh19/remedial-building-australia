import { ArrowRight, Wrench } from "lucide-react";
import {
  REPAIR_SYSTEM_CATEGORIES,
  REPAIR_SYSTEM_DEFECT_CHIPS,
} from "@/lib/repair-systems-data";

export const metadata = {
  title: "Repair Systems Hub — Remedial Building Australia",
  description:
    "Technical repair system reference for concrete repair mortars, corrosion inhibitors, waterproofing, crack injection, coatings and tools — structured for Australian Class 2 remedial building practice.",
};

export default function RepairSystemsHubPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8 py-5">
          <a href="/" className="flex shrink-0 items-center gap-3">
            <div>
              <div className="text-lg font-extrabold tracking-tight text-sky-950">
                Remedial Building Australia
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Technical Defect Database
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-sky-800 md:flex">
            <a href="/defect-library"  className="whitespace-nowrap hover:text-red-700 transition">Defect Library</a>
            <a href="/repair-systems"  className="whitespace-nowrap text-sky-950 underline underline-offset-4 decoration-red-700">Repair Systems</a>
            <a href="/materials-products" className="whitespace-nowrap hover:text-red-700 transition">Materials</a>
            <a href="/industry-news"   className="whitespace-nowrap hover:text-red-700 transition">Industry News</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700 transition">AI Scope Builder</a>
            <a
              href="/newsletter"
              className="whitespace-nowrap rounded-lg bg-red-700 px-4 py-2 text-sm text-white hover:bg-red-800 transition"
            >
              Subscribe
            </a>
          </nav>

          <a
            href="/"
            className="hidden shrink-0 rounded-xl bg-sky-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-800 transition md:inline-flex"
          >
            Home
          </a>
        </div>
      </header>

      <main>

        {/* ── Hero ── */}
        <section className="border-b border-slate-200 bg-white px-8 py-16">
          <div className="mx-auto max-w-7xl">
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-400">
              <a href="/" className="hover:text-sky-700 transition">Home</a>
              <span>/</span>
              <span className="text-sky-950">Repair Systems</span>
            </nav>

            <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">
              Repair Systems Hub
            </p>

            <h1 className="mt-3 max-w-4xl text-5xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-6xl">
              Concrete repair &amp; remedial systems reference
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Structured technical reference for repair mortars, corrosion inhibitors,
              waterproofing systems, crack injection, primers, coatings and tools — built
              for Australian remedial building practice and Class 2 strata remediation.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="/repair-systems/repair-mortars"
                className="inline-flex items-center gap-2 rounded-xl bg-sky-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-sky-800"
              >
                Start with Repair Mortars <ArrowRight size={15} />
              </a>
              <a
                href="/defect-library"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-sky-950 transition hover:border-sky-300 hover:bg-slate-50"
              >
                Browse Defect Library
              </a>
            </div>
          </div>
        </section>

        {/* ── Category cards ── */}
        <section className="px-8 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex items-start gap-3">
              <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
              <div>
                <h2 className="text-2xl font-extrabold text-sky-950">
                  Browse by System Category
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Select a system category to view technical information and product comparisons.
                </p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {REPAIR_SYSTEM_CATEGORIES.map((cat) => (
                <CategoryCard key={cat.slug} cat={cat} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Browse by Defect ── */}
        <section className="border-t border-slate-200 bg-white px-8 py-14">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-start gap-3">
              <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
              <div>
                <h2 className="text-2xl font-extrabold text-sky-950">Browse by Defect</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Jump to the defect library to identify defect types, causes, and recommended repair pathways.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {REPAIR_SYSTEM_DEFECT_CHIPS.map((chip) => (
                <a
                  key={chip.label}
                  href={chip.href}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-sky-950 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
                >
                  <Wrench size={11} className="text-red-600" />
                  {chip.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Platform note ── */}
        <section className="border-t border-slate-200 bg-slate-50 px-8 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Platform Note
              </p>
              <p className="text-sm leading-6 text-slate-600">
                This repair systems reference is being built progressively. Repair Mortars is available now.
                Additional categories — Corrosion Inhibitors, Sacrificial Anodes, Primers &amp; Coatings,
                Waterproofing Systems, Injection &amp; Crack Repair, Screeds, and Tools — will be published
                progressively. Product data will be expanded to include filter-by-manufacturer,
                filter-by-exposure-class, and integration with the AI Scope Builder.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <a
            href="/"
            className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200 transition"
          >
            ← Home
          </a>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">
              A structured Australian remedial building knowledge platform for defects, repair systems,
              materials and AI-assisted scope writing.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm font-bold text-sky-950 md:grid-cols-3">
            <a href="/about"   className="underline hover:text-sky-700">About</a>
            <a href="/terms"   className="underline hover:text-sky-700">Terms</a>
            <a href="/contact" className="underline hover:text-sky-700">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── Category card ─────────────────────────────────────────────────────────────

function CategoryCard({
  cat,
}: {
  cat: (typeof REPAIR_SYSTEM_CATEGORIES)[number];
}) {
  const inner = (
    <div
      className={`group h-full overflow-hidden rounded-2xl border bg-white shadow-sm transition duration-200 ${
        cat.available
          ? "border-slate-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-sky-200"
          : "border-slate-200 opacity-70"
      }`}
    >
      {/* Image placeholder */}
      <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
        {cat.imageUrl ? (
          <img
            src={cat.imageUrl}
            alt={cat.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center text-slate-300">
            <Wrench size={32} />
            <span className="mt-2 text-[10px] font-semibold uppercase tracking-wider">
              Image placeholder
            </span>
          </div>
        )}
        {!cat.available && (
          <div className="absolute right-3 top-3 rounded-full bg-slate-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            Coming Soon
          </div>
        )}
        {cat.available && (
          <div className="absolute right-3 top-3 rounded-full bg-sky-950 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            Available
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="mb-3 h-0.5 w-8 rounded-full bg-red-700" />
        <h3 className="text-base font-extrabold leading-tight text-sky-950">
          {cat.title}
        </h3>
        <p className="mt-2 text-xs leading-5 text-slate-500">{cat.description}</p>

        {cat.available ? (
          <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-sky-700 group-hover:text-red-700 transition">
            View Systems <ArrowRight size={12} />
          </div>
        ) : (
          <div className="mt-4 text-xs font-semibold text-slate-400">
            Coming soon
          </div>
        )}
      </div>
    </div>
  );

  return cat.available ? (
    <a href={cat.href} className="block h-full">
      {inner}
    </a>
  ) : (
    <div className="h-full cursor-default">{inner}</div>
  );
}
