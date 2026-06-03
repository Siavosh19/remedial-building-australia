import type { Metadata } from "next";
import { BookOpen, AlertTriangle, ArrowRight } from "lucide-react";
import { AluminiumArrisIntroSection, AluminiumArrisProductSection } from "./AluminiumArrisProductSection";

export const metadata: Metadata = {
  title: "Aluminium Arris & Corner Angle Beads — Arris Angles & Render Beads — Remedial Building Australia",
  description:
    "Technical product reference for aluminium arris and corner angle beads used in render repair and reinstallation works on Australian Class 2 strata and commercial buildings — standard duty, heavy duty, perforated flange profiles.",
};

const ACTIVE_SLUG = "aluminium-arris-corner-angle-beads";
const BASE_RENDER = "/repair-systems/facade-external-envelope/render-repair-removal-reinstallation";
const BASE_ARRIS = "/repair-systems/facade-external-envelope/arris-angles-render-beads";

const SIBLING_GROUPS = [
  {
    heading: "Render Repair, Removal & Reinstallation",
    tabs: [
      { label: "Two-coat PM render", slug: "two-coat-polymer-modified-render" },
      { label: "Two-coat sand cement", slug: "two-coat-sand-cement-render" },
      { label: "Fibre-reinforced render", slug: "fibre-reinforced-render" },
      { label: "Acrylic spray render", slug: "acrylic-spray-applied-render" },
      { label: "EIFS render", slug: "eifs-render-systems" },
      { label: "Salt-resistant render", slug: "salt-resistant-renovating-render" },
      { label: "Breathable render", slug: "breathable-vapour-permeable-render" },
      { label: "Bonding agents", slug: "bonding-agent-primer-systems" },
      { label: "Salt-retardant treatment", slug: "salt-retardant-substrate-treatment" },
      { label: "Saline primer / slurry", slug: "saline-resistant-primer-slurry" },
    ],
    base: BASE_RENDER,
  },
  {
    heading: "Arris & Render Beads",
    tabs: [
      { label: "Aluminium arris", slug: "aluminium-arris-corner-angle-beads" },
      { label: "Stainless arris", slug: "stainless-steel-arris-corner-angle-beads" },
      { label: "PVC arris", slug: "pvc-arris-corner-angle-beads" },
      { label: "Render stop beads", slug: "render-stop-beads" },
      { label: "Bellcast / drip beads", slug: "bellcast-drip-beads" },
      { label: "Movement beads", slug: "movement-expansion-beads" },
      { label: "Reveal beads", slug: "reveal-beads" },
      { label: "Mesh-wing beads", slug: "mesh-wing-render-beads" },
    ],
    base: BASE_ARRIS,
  },
];

export default function AluminiumArrisPage() {
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
              <a href="/" className="hover:text-sky-700 transition">Home</a>
              <span>/</span>
              <a href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</a>
              <span>/</span>
              <a href="/repair-systems/facade-external-envelope" className="hover:text-sky-700 transition">Facade &amp; External Envelope</a>
              <span>/</span>
              <a href={BASE_ARRIS} className="hover:text-sky-700 transition">Arris Angles &amp; Render Beads</a>
              <span>/</span>
              <span className="text-sky-950">Aluminium arris &amp; corner angle beads</span>
            </nav>
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 03 — Facade &amp; External Envelope</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  Aluminium arris &amp; corner angle beads
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Technical product reference for aluminium arris and corner angle beads used in render repair, removal and reinstallation works on Australian Class 2 strata and commercial buildings. Covers product classification, material grades, duty ratings, and brand comparisons.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Products listed", value: "4" },
                  { label: "Brands / types", value: "4" },
                  { label: "Material", value: "Aluminium" },
                  { label: "Standards", value: "AS 3700" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-slate-100 bg-white p-3 text-center">
                    <div className="text-lg font-extrabold leading-tight text-sky-950">{s.value}</div>
                    <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Sibling tabs ── */}
        <div className="border-b border-slate-200 bg-white px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-stretch gap-0 overflow-x-auto">
              {SIBLING_GROUPS.map((group, gi) => (
                <div
                  key={group.heading}
                  className={`flex shrink-0 flex-col${gi > 0 ? " border-l border-slate-200 ml-1 pl-1" : ""}`}
                >
                  <div className="px-3 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-red-700 whitespace-nowrap">
                    {group.heading}
                  </div>
                  <div className="flex items-end">
                    {group.tabs.map((tab) => {
                      const active = tab.slug === ACTIVE_SLUG;
                      return (
                        <a
                          key={tab.slug}
                          href={`${group.base}/${tab.slug}`}
                          className={`relative shrink-0 border-b-2 px-4 py-3 text-xs font-bold whitespace-nowrap transition ${
                            active
                              ? "border-red-700 text-sky-950"
                              : "border-transparent text-slate-500 hover:text-sky-900"
                          }`}
                        >
                          {tab.label}
                        </a>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <section className="px-8 py-14">
          <div className="mx-auto max-w-7xl space-y-10">

            <AluminiumArrisIntroSection />

            <AluminiumArrisProductSection />

            {/* Do not confuse warning */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-amber-900">Do not confuse aluminium arris beads with:</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Stainless steel beads (different material — use in coastal/corrosive environments)",
                  "PVC arris beads (plastic not metal)",
                  "Mesh-wing beads (have integral fibreglass mesh wings)",
                  "Render stop beads (different profile — terminate render, not protect corners)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-6 text-amber-900">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </section>

        {/* ── Disclaimer + related links ── */}
        <section className="border-t border-slate-200 bg-slate-50 px-8 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Disclaimer</p>
              <p className="text-xs leading-6 text-amber-900">
                This page provides general technical information only. Final product selection must be confirmed against the current manufacturer technical data sheet, project specification, substrate condition, exposure classification, AS 3700, NCC requirements, and applicator warranty conditions. Products marked TODO: owner confirm require verification before specifying. Do not rely on this reference as a substitute for professional engineering or facade consultant advice.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  href: "/repair-systems/facade-external-envelope",
                  label: "Facade & External Envelope",
                  title: "Browse all facade defect subcategories",
                },
                {
                  href: BASE_ARRIS,
                  label: "Arris Angles & Render Beads",
                  title: "Browse all product categories for arris and render beads",
                },
                {
                  href: "/defect-library/facade-external-envelope/render-cracking-delamination",
                  label: "Defect Library",
                  title: "Render cracking and delamination — causes, inspection, methodology",
                },
                {
                  href: "/ai-scope-builder",
                  label: "AI Scope Builder",
                  title: "Generate a scope of works for facade render remediation",
                },
              ].map((card) => (
                <a
                  key={card.href}
                  href={card.href}
                  className="group block rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-sky-200 hover:shadow-md"
                >
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">{card.label}</div>
                  <h4 className="text-sm font-extrabold leading-snug text-sky-950">{card.title}</h4>
                  <div className="mt-4 flex items-center gap-1 text-xs font-bold text-sky-700 transition group-hover:text-red-700">
                    Open <ArrowRight size={11} />
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
          <a href={BASE_ARRIS} className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">
            ← Arris Angles &amp; Render Beads
          </a>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">
              A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.
            </p>
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
