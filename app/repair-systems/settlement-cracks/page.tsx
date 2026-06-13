import type { Metadata } from "next";
import CategoryFilter from "../_components/CategoryFilter";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Settlement Crack Repair Systems — Remedial Building Australia",
  description:
    "Product reference for settlement crack repair in Australian buildings — injection resins, structural anchors, polymer-modified repair mortars, lime repointing, and sealants for cracks caused by foundation movement and differential settlement.",
};

const BASE = "/repair-systems/settlement-cracks";

const GROUPS = [
  {
    heading: "Crack Injection",
    categories: [
      { label: "PU flexible injection resins", count: 4, slug: "injection-resins-pu-flexible" },
      { label: "Epoxy rigid injection resins", count: 4, slug: "injection-resins-epoxy-rigid" },
      { label: "Crack injection ports", count: 4, slug: "crack-injection-ports" },
    ],
  },
  {
    heading: "Structural Repair",
    categories: [
      { label: "Structural anchors & dowels", count: 4, slug: "structural-anchors-dowels" },
      { label: "Repair mortars (PM)", count: 4, slug: "repair-mortars-polymer-modified" },
    ],
  },
  {
    heading: "Masonry Repointing",
    categories: [
      { label: "Lime repointing mortars", count: 4, slug: "lime-repointing-mortars" },
    ],
  },
  {
    heading: "Sealants & Backer Materials",
    categories: [
      { label: "Polyurethane sealants", count: 4, slug: "sealants-polyurethane" },
      { label: "Backer rods", count: 3, slug: "backer-rods" },
    ],
  },
];

export default function SettlementCracksPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      <SiteHeader />

      <main>
        {/* ── Hero ── */}
        <section className="border-b border-slate-200 bg-white px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <a href="/" className="hover:text-sky-700 transition">Home</a>
              <span>/</span>
              <a href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</a>
              <span>/</span>
              <a href="/repair-systems/concrete-structural-defects" className="hover:text-sky-700 transition">Concrete &amp; Structural Defects</a>
              <span>/</span>
              <span className="text-sky-950">Settlement cracks</span>
            </nav>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — Concrete &amp; Structural Defects</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
              Settlement cracks
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Injection resins, structural anchors, repair mortars, lime repointing products, and sealants for repairing cracks caused by foundation settlement, differential movement, and soil instability. Structural cause assessment and engineer confirmation is required before any settlement crack repair.
            </p>
          </div>
        </section>

        {/* ── Product category cards — grouped with search/filter ── */}
        <CategoryFilter groups={GROUPS} basePath={BASE} />
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
