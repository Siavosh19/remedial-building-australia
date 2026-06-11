"use client";

import { useState, useMemo } from "react";

const categoryData = [
  {
    title: "Concrete & Structural Defects",
    href: "/defect-library/concrete-structural-defects",
    defects: [
      { title: "Concrete Spalling",               href: "/defect-library/concrete-structural-defects/concrete-spalling" },
      { title: "Reinforcement Corrosion",          href: "/defect-library/concrete-structural-defects/reinforcement-corrosion" },
      { title: "Concrete Cracking",                href: "/defect-library/concrete-structural-defects/concrete-cracking" },
      { title: "Magnesite Flooring Deterioration", href: "/defect-library/concrete-structural-defects/magnesite-flooring-deterioration" },
      { title: "Settlement Cracks",                href: "/defect-library/concrete-structural-defects/settlement-cracks" },
      { title: "Slab Edge Deterioration",          href: "/defect-library/concrete-structural-defects/slab-edge-deterioration" },
    ],
  },
  {
    title: "Waterproofing & Water Ingress",
    href: "/defect-library/waterproofing-water-ingress",
    defects: [
      { title: "Balcony Waterproofing Failure",        href: "/defect-library/waterproofing-water-ingress/balcony-waterproofing-failure" },
      { title: "Roof Waterproofing Failure",           href: "/defect-library/waterproofing-water-ingress/roof-waterproofing-failure" },
      { title: "Planter Box Waterproofing Failure",    href: "/defect-library/waterproofing-water-ingress/planter-box-waterproofing-failure" },
      { title: "Basement Water Ingress",               href: "/defect-library/waterproofing-water-ingress/basement-water-ingress" },
      { title: "Podium Waterproofing Failure",         href: "/defect-library/waterproofing-water-ingress/podium-waterproofing-failure" },
      { title: "Rising Damp",                          href: "/defect-library/waterproofing-water-ingress/rising-damp" },
      { title: "Penetrating Damp",                     href: "/defect-library/waterproofing-water-ingress/penetrating-damp" },
      { title: "Façade Water Ingress",                 href: "/defect-library/waterproofing-water-ingress/facade-water-ingress" },
      { title: "Failed Screeds & Tile Delamination",   href: "/defect-library/waterproofing-water-ingress/failed-screeds-tile-delamination" },
    ],
  },
  {
    title: "Façade & External Envelope",
    href: "/defect-library/facade-external-envelope",
    defects: [
      { title: "Render Cracking & Delamination",           href: "/defect-library/facade-external-envelope/render-cracking-delamination" },
      { title: "Brickwork Deterioration",                  href: "/defect-library/facade-external-envelope/brickwork-deterioration" },
      { title: "Cladding Failure",                         href: "/defect-library/facade-external-envelope/cladding-failure" },
      { title: "Failed Sealants & Joints",                 href: "/defect-library/facade-external-envelope/failed-sealants-joints" },
      { title: "Façade Cracking",                          href: "/defect-library/facade-external-envelope/facade-cracking" },
      { title: "Window & Door Perimeter Failure",          href: "/defect-library/facade-external-envelope/window-door-perimeter-failure" },
      { title: "Defective & Non-Compliant Balustrades",    href: "/defect-library/facade-external-envelope/defective-non-compliant-balustrades" },
      { title: "External Coating & Paint Deterioration",   href: "/defect-library/facade-external-envelope/external-coating-paint-deterioration" },
    ],
  },
  {
    title: "Roofing Defects",
    href: "/defect-library/roofing-defects",
    defects: [
      { title: "Roof Leaks",            href: "/defect-library/roofing-defects/roof-leaks" },
      { title: "Box Gutter Failure",    href: "/defect-library/roofing-defects/box-gutter-failure" },
      { title: "Flashing Failures",     href: "/defect-library/roofing-defects/flashing-failures" },
      { title: "Poor Falls & Ponding",  href: "/defect-library/roofing-defects/poor-falls-ponding" },
      { title: "Overflow Issues",       href: "/defect-library/roofing-defects/overflow-issues" },
    ],
  },
  {
    title: "Internal Defects & Finishes",
    href: "/defect-library/internal-defects-finishes",
    defects: [
      { title: "Ceiling Water Damage",    href: "/defect-library/internal-defects-finishes/ceiling-water-damage" },
      { title: "Internal Cracking",       href: "/defect-library/internal-defects-finishes/internal-cracking" },
      { title: "Mould & Moisture Damage", href: "/defect-library/internal-defects-finishes/mould-moisture-damage" },
      { title: "Paint Failure",           href: "/defect-library/internal-defects-finishes/paint-failure" },
    ],
  },
  {
    title: "Services & Drainage",
    href: "/defect-library/services-drainage",
    defects: [
      { title: "Blocked & Undersized Stormwater", href: "/defect-library/services-drainage/blocked-undersized-stormwater" },
      { title: "Downpipe Defects",                href: "/defect-library/services-drainage/downpipe-defects" },
      { title: "Inadequate Drainage Design",      href: "/defect-library/services-drainage/inadequate-drainage-design" },
      { title: "Pipe Penetration Failure",        href: "/defect-library/services-drainage/pipe-penetrations-failure" },
    ],
  },
  {
    title: "Basements & Substructure",
    href: "/defect-library/basements-substructure",
    defects: [
      { title: "Crack Injection Failures",            href: "/defect-library/basements-substructure/crack-injection-failures" },
      { title: "Hydrostatic Pressure Issues",         href: "/defect-library/basements-substructure/hydrostatic-pressure-issues" },
      { title: "Joint Leaks",                         href: "/defect-library/basements-substructure/joint-leaks" },
      { title: "Negative-Side Waterproofing Failure", href: "/defect-library/basements-substructure/negative-side-waterproofing-failure" },
    ],
  },
  {
    title: "Miscellaneous / Other",
    href: "/defect-library/miscellaneous-other",
    defects: [
      { title: "Acoustic Issues",               href: "/defect-library/miscellaneous-other/acoustic-issues" },
      { title: "Fire Compliance Defects",       href: "/defect-library/miscellaneous-other/fire-compliance-defects" },
      { title: "Thermal & Condensation Issues", href: "/defect-library/miscellaneous-other/thermal-condensation-issues" },
    ],
  },
];

export default function DefectLibraryPage() {
  const [query, setQuery] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categoryData.map((c) => ({ ...c, defects: c.defects }));
    return categoryData
      .map((cat) => {
        const catMatches = cat.title.toLowerCase().includes(q);
        const matchingDefects = cat.defects.filter((d) =>
          d.title.toLowerCase().includes(q)
        );
        if (catMatches) return { ...cat, defects: cat.defects };
        if (matchingDefects.length > 0) return { ...cat, defects: matchingDefects };
        return null;
      })
      .filter(Boolean) as typeof categoryData;
  }, [query]);

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8 py-5">
          <a href="/" className="flex shrink-0 items-center gap-3">
            <div>
              <div className="text-lg font-extrabold tracking-tight text-sky-950">
                Remedial Building Australia
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-900">
                Technical Remedial Building Platform
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-sky-800 md:flex">
            <a href="/" className="whitespace-nowrap hover:text-red-700 transition">Home</a>
            <a href="/repair-systems" className="whitespace-nowrap hover:text-red-700">Repair Systems</a>
            <a href="/industry-news" className="whitespace-nowrap hover:text-red-700">News &amp; Insights</a>
            <a href="/directory" className="whitespace-nowrap hover:text-red-700">Directory</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700">AI Scope Builder</a>
          </nav>

          <a href="/directory/login" className="hidden shrink-0 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800 transition md:inline-flex">Login / Create Account</a>
          <button
            className="md:hidden p-1"
            onClick={() => setMobileNavOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {mobileNavOpen && (
          <div className="border-t border-sky-100 bg-white px-6 py-4 md:hidden">
            <nav className="flex flex-col gap-4 text-sm font-semibold text-sky-800">
              <a href="/" onClick={() => setMobileNavOpen(false)} className="hover:text-red-700 transition">Home</a>
              <a href="/repair-systems" onClick={() => setMobileNavOpen(false)} className="hover:text-red-700 transition">Repair Systems</a>
              <a href="/industry-news" onClick={() => setMobileNavOpen(false)} className="hover:text-red-700 transition">News &amp; Insights</a>
              <a href="/ai-scope-builder" onClick={() => setMobileNavOpen(false)} className="hover:text-red-700 transition">AI Scope Builder</a>
              <a href="/defect-library" onClick={() => setMobileNavOpen(false)} className="hover:text-red-700 transition">Defect Library</a>
              <a href="/directory" onClick={() => setMobileNavOpen(false)} className="hover:text-red-700 transition">Business Directory</a>
            </nav>
          </div>
        )}
      </header>

      <main className="px-6 py-16">
        <section className="mx-auto max-w-7xl">
          <div className="max-w-5xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">
              Defect Library
            </p>

            <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950 md:text-6xl">
              Browse remedial building defects by category
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Structured technical database for waterproofing failures, façade
              deterioration, concrete spalling, roofing defects, internal defects,
              drainage systems and remedial repair pathways for Class 2 buildings.
            </p>
          </div>

          <div className="mt-10">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-3xl border border-slate-200 bg-white p-5 text-base shadow-sm outline-none transition focus:border-sky-700"
              placeholder="Search defects, repair systems, water ingress, concrete spalling..."
            />
          </div>

          {filtered.length === 0 ? (
            <div className="mt-16 text-center">
              <p className="text-lg font-semibold text-slate-500">No defects matched &ldquo;{query}&rdquo;.</p>
              <button
                onClick={() => setQuery("")}
                className="mt-4 text-sm font-bold text-sky-700 hover:text-red-700 transition"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="mt-16 grid items-start gap-8 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((category) => (
                <div
                  key={category.title}
                  className="rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:shadow-xl"
                >
                  <div className="p-8">
                    <div className="mb-5 h-1.5 w-16 rounded-full bg-red-700" />

                    <h2 className="text-2xl font-bold leading-tight text-sky-950">
                      {category.title}
                    </h2>

                    <ul className="mt-5 space-y-0.5">
                      {category.defects.map((defect) => (
                        <li key={defect.title}>
                          <a
                            href={defect.href}
                            className="group flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-slate-600 transition hover:bg-sky-50 hover:text-sky-800"
                          >
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-700" />
                            <span className="flex-1">{defect.title}</span>
                            <span className="text-slate-300 transition group-hover:text-sky-500">→</span>
                          </a>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={category.href}
                      className="mt-6 block w-full rounded-2xl bg-sky-900 px-5 py-4 text-center text-sm font-semibold text-white transition hover:bg-sky-800"
                    >
                      Open Category
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-sky-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-12">
          <a href="/" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200">
            ← Home
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
