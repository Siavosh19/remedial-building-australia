import type { Metadata } from "next";
import Link from "next/link";
import CategoryFilter from "../_components/CategoryFilter";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Concrete Cracking Repair Systems — Remedial Building Australia",
  description:
    "Product reference for concrete crack repair systems — polyurethane flexible injection, epoxy rigid injection, crack ports, sealants, and anchoring adhesives for structural and non-structural cracks in Australian concrete buildings.",
};

const BASE = "/repair-systems/concrete-cracking";

const GROUPS = [
  {
    heading: "Crack Injection Systems",
    categories: [
      { label: "PU flexible injection resins", count: 4, slug: "injection-resins-pu-flexible" },
      { label: "Epoxy rigid injection resins", count: 4, slug: "injection-resins-epoxy-rigid" },
      { label: "Crack injection ports", count: 4, slug: "crack-injection-ports" },
    ],
  },
  {
    heading: "Sealants & Backer Materials",
    categories: [
      { label: "Polyurethane sealants", count: 4, slug: "sealants-polyurethane" },
      { label: "Backer rods", count: 3, slug: "backer-rods" },
    ],
  },
  {
    heading: "Structural Repair",
    categories: [
      { label: "Epoxy anchoring adhesives", count: 4, slug: "epoxy-anchoring-adhesives" },
      { label: "Crack stitching", count: 3, slug: "crack-stitching" },
      { label: "CFRP strips & laminates", count: 3, slug: "cfrp-strips-laminates" },
    ],
  },
  {
    heading: "Repair Mortars",
    categories: [
      { label: "Repair mortars (polymer-modified)", count: 4, slug: "repair-mortars-polymer-modified" },
    ],
  },
  {
    heading: "Tools & Abrasives",
    categories: [
      { label: "Abrasives & tools", count: 4, slug: "abrasives-blades-tools" },
    ],
  },
];

export default function ConcreteCrackingPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header ── */}
      <SiteHeader />

      <main>
        {/* ── Hero ── */}
        <section className="border-b border-slate-200 bg-white px-4 sm:px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <Link href="/" className="hover:text-sky-700 transition">Home</Link>
              <span>/</span>
              <Link href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</Link>
              <span>/</span>
              <Link href="/repair-systems/concrete-structural-defects" className="hover:text-sky-700 transition">Concrete &amp; Structural Defects</Link>
              <span>/</span>
              <span className="text-sky-950">Concrete cracking</span>
            </nav>
            <PageNav />
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — Concrete &amp; Structural Defects</p>
            <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
              Concrete cracking
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Injection resins, ports, sealants, and structural adhesives for repairing cracks in concrete — from fine passive cracks sealed with low-viscosity epoxy to active moving cracks injected with flexible polyurethane foam. Product selection depends on whether the crack is live (moving) or dormant (stable).
            </p>
          </div>
        </section>

        {/* ── Product category cards — grouped with search/filter ── */}
        <CategoryFilter groups={GROUPS} basePath={BASE} />
      </main>

      {/* ── Footer ── */}
      <SeoCrossPromo />

      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <Link href="/repair-systems/concrete-structural-defects" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200 transition">← Concrete &amp; Structural Defects</Link>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.</p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
            <div className="flex flex-col gap-2">
              <Link href="/directory" className="hover:text-sky-700">Business Directory</Link>
              <Link href="/repair-systems" className="hover:text-sky-700">Repair Systems</Link>
              <Link href="/defect-library" className="hover:text-sky-700">Defect Library</Link>
              <Link href="/industry-news" className="hover:text-sky-700">News &amp; Insights</Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/advertise" className="hover:text-sky-700">Advertise With Us</Link>
              <Link href="/contact" className="hover:text-sky-700">Contact</Link>
              <Link href="/faq" className="hover:text-sky-700">FAQ</Link>
              <Link href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-sky-700">Terms</Link>
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
