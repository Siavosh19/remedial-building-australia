import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Facade & External Envelope — Repair Systems — Remedial Building Australia",
  description:
    "Technical repair system reference for facade and external envelope defects in Australian Class 2 strata apartment buildings — render systems, brickwork, cladding, facade cracking, window perimeter failure and external coatings.",
};

const SUBCATEGORIES = [
  {
    label: "Render cracking and delamination",
    slug: "render-cracking-delamination",
    count: 6,
    description: "Polymer-modified render repair systems, fibre-reinforced render, EIFS repair, elastomeric and texture coatings and bonding primers for render cracking and delamination on Class 2 strata facades.",
    live: true,
    href: "/repair-systems/facade-external-envelope/render-cracking-delamination",
  },
  {
    label: "Render removal and installation",
    slug: "render-removal-and-installation",
    count: 4,
    description: "Sand cement, polymer-modified, acrylic spray-applied render systems and EIFS systems for full render removal and replacement on Class 2 strata facades.",
    live: true,
    href: "/repair-systems/facade-external-envelope/render-removal-and-installation",
  },
  {
    label: "Arris, angle and edge replacement",
    slug: "arris-angle-edge-replacement",
    count: 3,
    description: "Aluminium, stainless steel and PVC arris angle systems for replacement of damaged or missing render returns at external corners and edges.",
    live: true,
    href: "/repair-systems/facade-external-envelope/arris-angle-edge-replacement",
  },
  {
    label: "Brickwork deterioration",
    slug: "brickwork-deterioration",
    count: 9,
    description: "Repointing mortars, brick replacement, cavity wall tie systems, lintel systems, cavity flashings, movement joint sealants and masonry water repellents for brickwork defects in Class 2 strata facades.",
    live: true,
    href: "/repair-systems/facade-external-envelope/brickwork-deterioration",
  },
  {
    label: "Crack stitching — masonry",
    slug: "crack-stitching-masonry",
    count: 2,
    description: "Helical stainless steel bar and stainless rod epoxy-grouted crack stitching systems for structural crack repair and masonry reinforcement in Class 2 strata facades.",
    live: true,
    href: "/repair-systems/facade-external-envelope/crack-stitching-masonry",
  },
  {
    label: "Cladding failure",
    slug: "cladding-failure",
    count: 4,
    description: "Fire-rated cladding replacement systems (FR-core ACP, solid aluminium, fibre cement), panel re-coating, joint sealant replacement and stainless 316 fixing systems for cladding failure on Class 2 strata buildings.",
    live: true,
    href: "/repair-systems/facade-external-envelope/cladding-failure",
  },
  {
    label: "Failed sealants and joints",
    slug: "failed-sealants-joints",
    count: 5,
    description: "PU sealant (1-part and 2-part), neutral-cure silicone, polysulfide sealants, backer rod and primer systems for failed facade sealant joints in Class 2 strata buildings.",
    live: true,
    href: "/repair-systems/facade-external-envelope/failed-sealants-joints",
  },
  {
    label: "Facade cracking",
    slug: "facade-cracking",
    count: 5,
    description: "Epoxy and PU crack injection, flexible crack filler, elastomeric crack-bridging coating and movement joint sealant systems for facade cracks in Class 2 strata buildings.",
    live: true,
    href: "/repair-systems/facade-external-envelope/facade-cracking",
  },
  {
    label: "Window and door perimeter failure",
    slug: "window-door-perimeter-failure",
    count: 6,
    description: "Epoxy timber repair, perimeter sealant systems, head flashings, storm angles, subsill drainage and balcony door hob systems for window and door perimeter water ingress in Class 2 strata buildings.",
    live: true,
    href: "/repair-systems/facade-external-envelope/window-door-perimeter-failure",
  },
  {
    label: "External coating and paint deterioration",
    slug: "external-coating-paint-deterioration",
    count: 9,
    description: "Alkali-resistant and rust-inhibiting primers, penetrating consolidants, exterior acrylic and elastomeric coatings, UV-resistant metal and timber enamels, silane/siloxane water repellents and biocide systems for external facade coating and paint defects.",
    live: true,
    href: "/repair-systems/facade-external-envelope/external-coating-paint-deterioration",
  },
] as const;

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
              <span className="text-sky-950">Facade &amp; External Envelope</span>
            </nav>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 03</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
              Facade &amp; External Envelope
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Technical repair system reference for facade and external envelope defects in Australian Class 2 strata — select a defect subcategory to view product categories, system information and brand equivalents.
            </p>
          </div>
        </section>

        {/* ── Subcategory cards ── */}
        <section className="px-8 py-14">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-start gap-3">
              <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
              <div>
                <h2 className="text-2xl font-extrabold text-sky-950">Defect Subcategories</h2>
                <p className="mt-1 text-sm text-slate-500">Select a facade defect type to browse product categories and brand comparisons.</p>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SUBCATEGORIES.map((sub) =>
                sub.live ? (
                  <a
                    key={sub.slug}
                    href={sub.href}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <div className="h-0.5 w-8 rounded-full bg-red-700" />
                      <span className="inline-flex items-center gap-1 rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-[10px] font-bold text-green-700">
                        <span className="h-1 w-1 rounded-full bg-green-500" />Live
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold leading-tight text-sky-950 transition group-hover:text-sky-700">{sub.label}</h3>
                    <p className="mt-2 text-xs leading-5 text-slate-500">{sub.description}</p>
                    <p className="mt-3 text-xs font-semibold text-slate-400">{sub.count} product categories</p>
                    <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-sky-700 transition group-hover:text-red-700">
                      View systems <ArrowRight size={12} />
                    </div>
                  </a>
                ) : (
                  <div key={sub.slug} className="rounded-2xl border border-slate-100 bg-white p-6 opacity-50">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="h-0.5 w-8 rounded-full bg-slate-300" />
                      <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-400">
                        In development
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold leading-tight text-slate-600">{sub.label}</h3>
                    <p className="mt-2 text-xs leading-5 text-slate-400">{sub.description}</p>
                    <p className="mt-3 text-xs font-semibold text-slate-300">{sub.count} product categories</p>
                  </div>
                )
              )}
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
