import type { Metadata } from "next";
import SealantsCategoryFilter from "./SealantsCategoryFilter";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Sealants, Joints & Cracks — Facade & External Envelope — Remedial Building Australia",
  description:
    "Technical repair system reference for failed facade sealants, joint failures and non-structural facade cracking in Australian Class 2 strata — polyurethane, silicone and polysulfide sealant systems, backer rod, primer systems, and flexible crack filler systems — 8 product categories.",
};

const PARENT = "/repair-systems/facade-external-envelope";
const BASE_SEALANTS = "/repair-systems/facade-external-envelope/sealants-joints-cracks/failed-sealants-joints";
const BASE_CRACKING = "/repair-systems/facade-external-envelope/sealants-joints-cracks/facade-cracking";

const GROUPS = [
  {
    heading: "Failed Sealants and Joints",
    categories: [
      { label: "Polyurethane sealant — one part", count: 3, href: `${BASE_SEALANTS}/polyurethane-sealant-one-part` },
      { label: "Polyurethane sealant — two part", count: 3, href: `${BASE_SEALANTS}/polyurethane-sealant-two-part` },
      { label: "Neutral cure silicone sealant systems", count: 3, href: `${BASE_SEALANTS}/neutral-cure-silicone-sealant-systems` },
      { label: "Polysulfide sealant systems", count: 3, href: `${BASE_SEALANTS}/polysulfide-sealant-systems` },
      { label: "Backer rod systems", count: 3, href: `${BASE_SEALANTS}/backer-rod-systems` },
      { label: "Primer systems — per substrate type", count: 3, href: `${BASE_SEALANTS}/primer-systems-per-substrate-type` },
    ],
  },
  {
    heading: "Facade Cracking (Non-Structural, Non-Coating)",
    categories: [
      { label: "Flexible crack filler systems", count: 3, href: `${BASE_CRACKING}/flexible-crack-filler-systems` },
      { label: "Movement joint and sealant systems", count: 3, href: `${BASE_CRACKING}/movement-joint-sealant-systems` },
    ],
  },
];

export default function SealantsJointsCracksPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header ── */}
      <SiteHeader />

      <main>

        {/* ── Hero ── */}
        <section className="border-b border-slate-200 bg-white px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <a href="/" className="hover:text-sky-700 transition">Home</a><span>/</span>
              <a href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</a><span>/</span>
              <a href={PARENT} className="hover:text-sky-700 transition">Facade &amp; External Envelope</a><span>/</span>
              <span className="text-sky-950">Sealants, Joints &amp; Cracks</span>
            </nav>
            <PageNav />
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 03 — Facade &amp; External Envelope</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
              Sealants, Joints &amp; Cracks
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Technical repair system reference for failed facade sealants, joint failures and non-structural facade cracking in Australian Class 2 strata — polyurethane, silicone and polysulfide sealant systems, backer rod, primer systems and flexible crack filler systems — select a product category to view system information, brand comparisons and procurement sources.
            </p>
          </div>
        </section>

        <SealantsCategoryFilter groups={GROUPS} />

      </main>

      {/* ── Footer ── */}
      <SeoCrossPromo />

      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <a href={PARENT} className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">← Facade &amp; External Envelope</a>
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
