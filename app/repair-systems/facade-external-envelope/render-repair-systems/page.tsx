import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Render Repair Systems — Facade & External Envelope — Remedial Building Australia",
  description:
    "Technical repair system reference for render repair, removal and reinstallation, salt attack and salt-contaminated render, and arris angles and render beads on Australian Class 2 strata and commercial facades.",
};

const PARENT = "/repair-systems/facade-external-envelope";

const ITEMS = [
  {
    label: "Render repair, removal and reinstallation",
    href: "/repair-systems/facade-external-envelope/render-repair-removal-reinstallation",
    count: 10,
    description:
      "Two-coat PM render, sand cement render, fibre-reinforced, acrylic spray, EIFS, salt-resistant render, breathable render, bonding agents, salt-retardant treatment and saline primer systems.",
  },
  {
    label: "Salt attack and salt-contaminated render",
    href: "/repair-systems/facade-external-envelope/salt-attack-salt-contaminated-render",
    count: 4,
    description:
      "Salt-resistant renovating render, salt-retardant substrate treatments, breathable vapour-permeable render and saline-resistant primer systems for salt attack defects.",
  },
  {
    label: "Arris angles and render beads",
    href: "/repair-systems/facade-external-envelope/arris-angles-render-beads",
    count: 8,
    description:
      "Aluminium, stainless steel and PVC arris angle beads, render stop beads, bellcast/drip beads, movement beads, reveal beads and mesh-wing render beads.",
  },
];

export default function RenderRepairSystemsPage() {
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
              <span className="text-sky-950">Render Repair Systems</span>
            </nav>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 03 — Facade &amp; External Envelope</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
              Render Repair Systems
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Technical repair system reference for render repair and reinstallation, salt attack remediation and facade edge bead systems — select a subcategory to view product categories, system information and brand equivalents.
            </p>
          </div>
        </section>

        {/* ── Subcategory cards ── */}
        <section className="px-8 py-14">
          <div className="mx-auto max-w-7xl">

            <div className="mb-8 flex items-start gap-3">
              <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
              <div>
                <h2 className="text-2xl font-extrabold text-sky-950">Subcategories</h2>
                <p className="mt-1 text-sm text-slate-500">3 subcategories — select a subcategory to view product categories, system comparisons and procurement sources.</p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
                >
                  <div className="mb-3 h-0.5 w-8 rounded-full bg-red-700" />
                  <h3 className="text-base font-extrabold leading-tight text-sky-950 transition group-hover:text-sky-700">{item.label}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{item.description}</p>
                  <p className="mt-3 text-xs font-semibold text-slate-400">{item.count} product categories</p>
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
