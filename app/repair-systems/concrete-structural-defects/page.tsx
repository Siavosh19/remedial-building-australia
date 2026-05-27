import { ArrowRight, Wrench } from "lucide-react";
import { REPAIR_SYSTEM_DEFECT_CHIPS } from "@/lib/repair-systems-data";
import { CONCRETE_DEFECTS_DATA } from "@/lib/concrete-defects-data";
import { buildProductIndex } from "@/lib/product-search-index";
import { ProductSearchBar } from "@/components/repair-systems/ProductSearchBar";

export const metadata = {
  title: "Concrete & Structural Defect Repair Systems — Remedial Building Australia",
  description:
    "Technical repair system reference for concrete repair mortars, corrosion inhibitors, crack injection, coatings and tools — structured for Australian Class 2 remedial building practice.",
};

export default function ConcreteStructuralHubPage() {
  const products = buildProductIndex();
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8 py-5">
          <a href="/" className="flex shrink-0 items-center gap-3">
            <div>
              <div className="text-lg font-extrabold tracking-tight text-sky-950">Remedial Building Australia</div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Technical Remedial Building Platform</div>
            </div>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-sky-800 md:flex">
                        <a href="/"                className="whitespace-nowrap hover:text-red-700 transition">Home</a>
            <a href="/repair-systems"  className="whitespace-nowrap text-sky-950 underline underline-offset-4 decoration-red-700">Repair Systems</a>
            <a href="/industry-news"   className="whitespace-nowrap hover:text-red-700 transition">Industry News</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700 transition">AI Scope Builder</a>
          
          </nav>
          <a href="/newsletter" className="hidden shrink-0 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800 transition md:inline-flex">Subscribe</a>
        </div>
      </header>

      <main>

        {/* ── Hero ── */}
        <section className="border-b border-slate-200 bg-white px-8 py-16">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-400">
              <a href="/" className="hover:text-sky-700 transition">Home</a>
              <span>/</span>
              <a href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</a>
              <span>/</span>
              <span className="text-sky-950">Concrete &amp; Structural Defects</span>
            </nav>

            <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 02</p>

            <h1 className="mt-3 max-w-4xl text-5xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-6xl">
              Concrete &amp; Structural Defect Repair Systems
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Structured technical reference for repair mortars, corrosion inhibitors,
              waterproofing systems, crack injection, primers, coatings and tools — built
              for Australian remedial building practice and Class 2 strata remediation.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="/repair-systems/concrete-spalling/repair-mortars-polymer-modified"
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

        {/* ── Product Search ── */}
        <section className="border-b border-slate-200 bg-slate-50 px-8 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-5 flex items-start gap-3">
              <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
              <div>
                <h2 className="text-xl font-extrabold text-sky-950">AI Product Search</h2>
                <p className="mt-0.5 text-sm text-slate-500">Describe your application — e.g. &ldquo;overhead structural mortar coastal exposure&rdquo; — and AI will match the right products.</p>
              </div>
            </div>
            <ProductSearchBar products={products} />
          </div>
        </section>

        {/* ── Subcategory cards ── */}
        <section className="px-8 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex items-start gap-3">
              <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
              <div>
                <h2 className="text-2xl font-extrabold text-sky-950">
                  Defect subcategories
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Select a defect subcategory to browse product categories and brand comparisons.
                </p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {CONCRETE_DEFECTS_DATA.map((sub) => (
                <div
                  key={sub.slug}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:shadow-md hover:border-sky-200"
                >
                  <div className="p-5">
                    <div className="mb-3 h-0.5 w-8 rounded-full bg-red-700" />
                    <a href={`/repair-systems/${sub.slug}`} className="group block">
                      <h3 className="text-base font-extrabold leading-tight text-sky-950 group-hover:text-sky-700 transition">
                        {sub.label}
                      </h3>
                    </a>
                    <ul className="mt-3 space-y-1.5">
                      {sub.productCategories.map((cat) => (
                        <li key={cat.slug}>
                          <a
                            href={`/repair-systems/${sub.slug}/${cat.slug}`}
                            className="flex items-center gap-2 text-xs text-slate-500 transition hover:text-sky-700"
                          >
                            <span className="h-1 w-1 shrink-0 rounded-full bg-red-500" />
                            {cat.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={`/repair-systems/${sub.slug}`}
                      className="mt-4 flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-red-700 transition"
                    >
                      All {sub.productCategories.length} categories <ArrowRight size={12} />
                    </a>
                  </div>
                </div>
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

      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <a href="/repair-systems" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200 transition">
            ← Repair Systems
          </a>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">
              A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.
            </p>
          </div>
                    <div className="grid grid-cols-2 gap-3 text-sm font-bold text-sky-950 md:grid-cols-5">
            <a href="/" className="underline hover:text-sky-700">Home</a>
            <a href="/repair-systems" className="underline hover:text-sky-700">Repair Systems</a>
            <a href="/ai-scope-builder" className="underline hover:text-sky-700">AI Scope Builder</a>
            <a href="/industry-news" className="underline hover:text-sky-700">Industry News</a>
            <a href="/defect-library" className="underline hover:text-sky-700">Defect Library</a>
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
