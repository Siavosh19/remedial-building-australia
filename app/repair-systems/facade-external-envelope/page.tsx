import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Facade & External Envelope — Repair Systems — Remedial Building Australia",
  description:
    "Technical repair system reference for facade and external envelope defects in Australian Class 2 strata apartment buildings — masonry, cladding, sealants, windows, coatings and render repair systems.",
};

const CARDS = [
  {
    label: "Render Repair Systems",
    href: "/repair-systems/facade-external-envelope/render-repair-systems",
    description: "Render repair, removal and reinstallation, salt attack and salt-contaminated render, arris angles and render beads — 18 product categories.",
    count: 18,
  },
  {
    label: "Masonry & Structural",
    href: "/repair-systems/facade-external-envelope/masonry-structural",
    description: "Repointing mortars, brick replacement, remedial cavity wall ties, lintel systems, cavity flashings, movement joint sealants, silane water repellents, masonry cleaning and crack stitching.",
    count: 19,
  },
  {
    label: "Cladding",
    href: "/repair-systems/facade-external-envelope/cladding",
    description: "Non-combustible cladding replacement, subframe and support systems, fixings and anchors, flashings, joint sealants and vapour-permeable wall wrap behind cladding.",
    count: 23,
  },
  {
    label: "Sealants, Joints & Cracks",
    href: "/repair-systems/facade-external-envelope/sealants-joints-cracks",
    description: "Polyurethane and silicone sealant systems, polysulfide sealants, backer rod, sealant primers and flexible crack filler systems for facade joints and non-structural cracking.",
    count: 8,
  },
  {
    label: "Windows, Doors & Penetrations",
    href: "/repair-systems/facade-external-envelope/windows-doors-penetrations",
    description: "Window and door perimeter sealants, head flashings, storm angles, subsill drainage, balcony door hob systems and waterproofing termination at threshold upstands.",
    count: 12,
  },
  {
    label: "Coatings",
    href: "/repair-systems/facade-external-envelope/external-coating-paint-deterioration",
    description: "Alkali-resistant primers, rust-inhibiting primers, exterior acrylic coatings, elastomeric coatings, silane/siloxane water repellents, biocide wash and PVDF metal panel re-coating.",
    count: 11,
  },
];

export default function FacadeExternalEnvelopePage() {
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
            <nav className="mb-5 flex items-center gap-2 text-xs font-semibold text-slate-400">
              <a href="/" className="hover:text-sky-700 transition">Home</a>
              <span>/</span>
              <a href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</a>
              <span>/</span>
              <span className="text-sky-950">Facade &amp; External Envelope</span>
            </nav>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 03</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
              Facade &amp; External Envelope
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Technical repair system reference for facade and external envelope defects in Australian Class 2 strata — select a repair system group to view product categories, system information and brand equivalents.
            </p>
          </div>
        </section>

        {/* ── Parent category cards ── */}
        <section className="px-8 py-14">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {CARDS.map((card) => (
                <a
                  key={card.href}
                  href={card.href}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="h-0.5 w-8 rounded-full bg-red-700" />
                    <span className="inline-flex items-center gap-1 rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-[10px] font-bold text-green-700">
                      <span className="h-1 w-1 rounded-full bg-green-500" />Live
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold leading-tight text-sky-950 transition group-hover:text-sky-700">
                    {card.label}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{card.description}</p>
                  <p className="mt-3 text-xs font-semibold text-slate-400">{card.count} product categories</p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-sky-700 transition group-hover:text-red-700">
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
          <a href="/repair-systems" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200 transition">← Repair Systems</a>
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
