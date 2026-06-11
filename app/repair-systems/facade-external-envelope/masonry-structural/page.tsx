import type { Metadata } from "next";
import MasonryCategoryFilter from "./MasonryCategoryFilter";

export const metadata: Metadata = {
  title: "Masonry & Structural — Facade & External Envelope — Remedial Building Australia",
  description:
    "Technical repair system reference for masonry and structural defects in Australian Class 2 strata — brickwork deterioration repair systems, repointing mortars, cavity wall ties, lintel systems, cavity flashings, masonry cleaning and crack stitching — 19 product categories.",
};

const PARENT = "/repair-systems/facade-external-envelope";
const BASE_BRICKWORK = "/repair-systems/facade-external-envelope/masonry-structural/brickwork-deterioration";
const BASE_CRACK = "/repair-systems/facade-external-envelope/masonry-structural/crack-stitching-masonry";

const GROUPS = [
  {
    heading: "Brickwork Deterioration",
    categories: [
      { label: "Repointing mortar — lime", count: 3, href: `${BASE_BRICKWORK}/repointing-mortar-lime` },
      { label: "Repointing mortar — cement", count: 3, href: `${BASE_BRICKWORK}/repointing-mortar-cement` },
      { label: "Brick replacement and matching systems", count: 3, href: `${BASE_BRICKWORK}/brick-replacement-matching-systems` },
      { label: "Remedial cavity wall ties — stainless helical (re-tie)", count: 3, href: `${BASE_BRICKWORK}/remedial-cavity-wall-ties-stainless-helical` },
      { label: "Remedial cavity wall ties — chemical resin anchor", count: 3, href: `${BASE_BRICKWORK}/remedial-cavity-wall-ties-chemical-resin-anchor` },
      { label: "Remedial cavity wall ties — mechanical expansion", count: 3, href: `${BASE_BRICKWORK}/remedial-cavity-wall-ties-mechanical-expansion` },
      { label: "Lintel systems — duplex coated steel", count: 3, href: `${BASE_BRICKWORK}/lintel-systems-duplex-coated-steel` },
      { label: "Lintel systems — galvanised steel", count: 3, href: `${BASE_BRICKWORK}/lintel-systems-galvanised-steel` },
      { label: "Lintel systems — stainless steel", count: 3, href: `${BASE_BRICKWORK}/lintel-systems-stainless-steel` },
      { label: "Lintel systems — concrete (precast & in-situ)", count: 3, href: `${BASE_BRICKWORK}/lintel-systems-concrete` },
      { label: "Cavity flashing — aluminium", count: 3, href: `${BASE_BRICKWORK}/cavity-flashing-aluminium` },
      { label: "Cavity flashing — lead", count: 3, href: `${BASE_BRICKWORK}/cavity-flashing-lead` },
      { label: "Cavity flashing — embossed aluminium-cored (Alcore-type)", count: 3, href: `${BASE_BRICKWORK}/cavity-flashing-alcore` },
      { label: "Movement joint and polyurethane sealant systems", count: 3, href: `${BASE_BRICKWORK}/movement-joint-polyurethane-sealant` },
      { label: "Penetrating silane water repellent systems", count: 3, href: `${BASE_BRICKWORK}/penetrating-silane-water-repellent` },
      { label: "Masonry cleaning — acid wash", count: 3, href: `${BASE_BRICKWORK}/masonry-cleaning-acid-wash` },
      { label: "Masonry cleaning — chemical / poultice", count: 3, href: `${BASE_BRICKWORK}/masonry-cleaning-chemical-poultice` },
    ],
  },
  {
    heading: "Crack Stitching — Masonry",
    categories: [
      { label: "Helical bed-joint reinforcement bars (crack stitching)", count: 3, href: `${BASE_CRACK}/helical-bed-joint-reinforcement-bars` },
      { label: "Stainless rod epoxy grouted systems", count: 3, href: `${BASE_CRACK}/stainless-rod-epoxy-grouted-systems` },
    ],
  },
];

export default function MasonryStructuralPage() {
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
            <a href="/industry-news" className="whitespace-nowrap hover:text-red-700 transition">News &amp; Insights</a>
            <a href="/directory" className="whitespace-nowrap hover:text-red-700 transition">Directory</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700 transition">AI Scope Builder</a>
          </nav>
          <a href="/directory/login" className="hidden shrink-0 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800 transition md:inline-flex">Login / Create Account</a>
        </div>
      </header>

      <main>

        {/* ── Hero ── */}
        <section className="border-b border-slate-200 bg-white px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <a href="/" className="hover:text-sky-700 transition">Home</a><span>/</span>
              <a href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</a><span>/</span>
              <a href={PARENT} className="hover:text-sky-700 transition">Facade &amp; External Envelope</a><span>/</span>
              <span className="text-sky-950">Masonry &amp; Structural</span>
            </nav>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 03 — Facade &amp; External Envelope</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
              Masonry &amp; Structural
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Technical repair system reference for masonry and structural defects in Australian Class 2 strata — brickwork deterioration repair systems, repointing mortars, remedial cavity wall ties, lintel systems, cavity flashings, masonry cleaning and crack stitching — select a product category to view system information, brand comparisons and procurement sources.
            </p>
          </div>
        </section>

        <MasonryCategoryFilter groups={GROUPS} />

      </main>

      {/* ── Footer ── */}
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
