import CategoryFilter from "./CategoryFilter";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata = {
  title: "Concrete Spalling Repair Systems — Remedial Building Australia",
  description:
    "Product categories for concrete spalling repair in Australian Class 2 strata — polymer-modified and cementitious repair mortars, epoxy mortars, SBR bonding agents, rebar primers, curing compounds, formwork, aggregates and tools.",
};

const GROUPS = [
  {
    heading: "Repair Mortars",
    categories: [
      { label: "Repair mortars (polymer-modified)", count: 4, slug: "repair-mortars-polymer-modified" },
      { label: "Cementitious repair mortars", count: 4, slug: "cementitious-repair-mortars" },
      { label: "Epoxy repair mortars", count: 4, slug: "epoxy-repair-mortars" },
    ],
  },
  {
    heading: "Substrate Preparation",
    categories: [
      { label: "Bonding agents & SBR latex", count: 4, slug: "bonding-agents-sbr-latex" },
      { label: "Rebar primers & inhibitors", count: 4, slug: "rebar-primers-inhibitors" },
    ],
  },
  {
    heading: "Curing & Protection",
    categories: [
      { label: "Curing compounds", count: 4, slug: "curing-compounds" },
      { label: "Curing sheeting", count: 4, slug: "curing-sheeting" },
    ],
  },
  {
    heading: "Slab Edge Repair",
    categories: [
      { label: "Edge forms & accessories", count: 4, slug: "edge-forms-accessories" },
      { label: "Reinforcement mesh", count: 4, slug: "reinforcement-mesh" },
    ],
  },
  {
    heading: "Formwork",
    categories: [
      { label: "Form release agents", count: 4, slug: "form-release-agents" },
    ],
  },
  {
    heading: "Materials & Aggregates",
    categories: [
      { label: "Cement & aggregates", count: 4, slug: "cement-aggregates" },
    ],
  },
];

export default function ConcreteSpallingPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header ── */}
      <SiteHeader />

      <main>
        {/* ── Hero ── */}
        <section className="border-b border-slate-200 bg-white px-4 sm:px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <a href="/" className="hover:text-sky-700 transition">Home</a>
              <span>/</span>
              <a href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</a>
              <span>/</span>
              <a href="/repair-systems/concrete-structural-defects" className="hover:text-sky-700 transition">Concrete &amp; Structural Defects</a>
              <span>/</span>
              <span className="text-sky-950">Concrete spalling</span>
            </nav>
            <PageNav />
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 02</p>
            <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
              Concrete spalling
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Technical repair system reference for concrete spalling in Australian Class 2 strata, carparks and civil structures — select a product category to view system information, product comparisons and brand equivalents.
            </p>
          </div>
        </section>

        {/* ── Product category cards — grouped with search/filter ── */}
        <CategoryFilter groups={GROUPS} />
      </main>

      {/* ── Footer ── */}
      <SeoCrossPromo />

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
