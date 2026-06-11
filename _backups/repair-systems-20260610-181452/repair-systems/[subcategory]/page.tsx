import { CONCRETE_DEFECTS_DATA } from "@/lib/concrete-defects-data";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

export function generateStaticParams() {
  return CONCRETE_DEFECTS_DATA.map((s) => ({ subcategory: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ subcategory: string }> }) {
  const { subcategory } = await params;
  const sub = CONCRETE_DEFECTS_DATA.find((s) => s.slug === subcategory);
  if (!sub) return {};
  return {
    title: `${sub.label} — Repair Systems — Remedial Building Australia`,
    description: `Repair system product categories for ${sub.label} — technical reference for Australian remedial building practice.`,
  };
}

export default async function SubcategoryPage({ params }: { params: Promise<{ subcategory: string }> }) {
  const { subcategory } = await params;
  const sub = CONCRETE_DEFECTS_DATA.find((s) => s.slug === subcategory);
  if (!sub) notFound();

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
                        <a href="/" className="whitespace-nowrap hover:text-red-700 transition">Home</a>
            <a href="/repair-systems" className="whitespace-nowrap text-sky-950 underline underline-offset-4 decoration-red-700">Repair Systems</a>
            <a href="/industry-news" className="whitespace-nowrap hover:text-red-700 transition">Industry News</a>
            <a href="/directory" className="whitespace-nowrap hover:text-red-700">Directory</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700 transition">AI Scope Builder</a>
          
          </nav>
          <a href="/directory/login" className="hidden shrink-0 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800 transition md:inline-flex">Login / Create Account</a>
        </div>
      </header>

      <main>
        {/* ── Hero ── */}
        <section className="border-b border-slate-200 bg-white px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex items-center gap-2 text-xs font-semibold text-slate-400">
              <a href="/" className="hover:text-sky-700 transition">Home</a>
              <span>/</span>
              <a href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</a>
              <span>/</span>
              <a href="/repair-systems/concrete-structural-defects" className="hover:text-sky-700 transition">Concrete &amp; Structural</a>
              <span>/</span>
              <span className="text-sky-950">{sub.label}</span>
            </nav>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">{sub.label}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Technical repair system reference for {sub.label.toLowerCase()} — select a product category to view system information, product comparisons and brand equivalents.
            </p>
          </div>
        </section>

        {/* ── Product category cards ── */}
        <section className="px-8 py-14">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-start gap-3">
              <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
              <div>
                <h2 className="text-2xl font-extrabold text-sky-950">Product Categories</h2>
                <p className="mt-1 text-sm text-slate-500">{sub.productCategories.length} product categories — select to view technical reference and brand equivalents.</p>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {sub.productCategories.map((cat) => (
                <a
                  key={cat.slug}
                  href={`/repair-systems/${sub.slug}/${cat.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
                >
                  <div className="mb-3 h-0.5 w-8 rounded-full bg-red-700" />
                  <h3 className="text-base font-extrabold leading-tight text-sky-950 group-hover:text-sky-700 transition">{cat.label}</h3>
                  <p className="mt-2 text-xs text-slate-400 font-semibold">{cat.materials.length} {cat.materials.length === 1 ? "material" : "materials"}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-sky-700 group-hover:text-red-700 transition">
                    View systems <ArrowRight size={12} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <a href="/repair-systems/concrete-structural-defects" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200 transition">← Concrete &amp; Structural Defects</a>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.</p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
            <a href="/about" className="hover:text-sky-700">About</a>
            <a href="/contact" className="hover:text-sky-700">Contact</a>
            <a href="/terms" className="hover:text-sky-700">Terms</a>
            <a href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</a>
            <a href="/defect-library" className="hover:text-sky-700">Defect Library</a>
            <a href="/repair-systems" className="hover:text-sky-700">Repair Systems</a>
            <a href="/industry-news" className="hover:text-sky-700">Industry News</a>
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
