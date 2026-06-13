import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Arris Angles & Render Beads — Facade & External Envelope — Remedial Building Australia",
  description:
    "Technical product reference for arris angle beads and render beads used in facade render repair on Australian Class 2 strata and commercial buildings — aluminium, stainless steel and PVC arris beads, render stop beads, bellcast beads, movement beads, reveal beads and mesh-wing render beads.",
};

const BASE = "/repair-systems/facade-external-envelope/arris-angles-render-beads";
const PARENT = "/repair-systems/facade-external-envelope";

const ITEMS = [
  {
    label: "Aluminium arris and corner angle beads",
    slug: "aluminium-arris-corner-angle-beads",
    count: 4,
    description:
      "Aluminium arris angle and corner beads for render edge protection on external facades — standard duty, heavy duty and perforated flange types for masonry, render and AAC substrates.",
    live: true,
  },
  {
    label: "Stainless steel arris and corner angle beads",
    slug: "stainless-steel-arris-corner-angle-beads",
    count: 3,
    description:
      "Grade 316 and 304 stainless steel arris and corner beads for coastal and corrosive environments where aluminium or galvanised steel beads are not suitable.",
    live: true,
  },
  {
    label: "PVC arris and corner angle beads",
    slug: "pvc-arris-corner-angle-beads",
    count: 3,
    description:
      "UV-stabilised PVC arris angle and corner beads — lightweight, corrosion-resistant alternative to metal beads — used in render systems on masonry and AAC substrates.",
    live: true,
  },
  {
    label: "Render stop beads",
    slug: "render-stop-beads",
    count: 3,
    description:
      "Aluminium and PVC render stop and screed beads — define render termination lines at slab soffits, window heads, control joints and changes of substrate.",
    live: true,
  },
  {
    label: "Bellcast and drip beads",
    slug: "bellcast-drip-beads",
    count: 3,
    description:
      "Bellcast and drip profile beads for render at slab edges and window sills — form a bellcast or drip profile to direct water away from the facade substrate.",
    live: true,
  },
  {
    label: "Movement and expansion beads",
    slug: "movement-expansion-beads",
    count: 3,
    description:
      "Movement joint and expansion beads for render systems — accommodate thermal and structural movement within the render plane at panel joints and substrate changes.",
    live: true,
  },
  {
    label: "Reveal beads",
    slug: "reveal-beads",
    count: 3,
    description:
      "Aluminium and PVC reveal beads for rendering window and door reveals — provide a clean render edge and drip profile at window and door perimeter reveals.",
    live: true,
  },
  {
    label: "Mesh-wing render beads",
    slug: "mesh-wing-render-beads",
    count: 3,
    description:
      "Angle and stop beads with integral fibreglass mesh wings — allow the mesh to be embedded in the render base coat for improved corner and edge reinforcement.",
    live: true,
  },
] as const;

export default function ArrisAngleBeadsHubPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      <SiteHeader />

      <main>

        {/* ── Hero ── */}
        <section className="border-b border-slate-200 bg-white px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <a href="/" className="hover:text-sky-700 transition">Home</a><span>/</span>
              <a href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</a><span>/</span>
              <a href={PARENT} className="hover:text-sky-700 transition">Facade &amp; External Envelope</a><span>/</span>
              <span className="text-sky-950">Arris Angles &amp; Render Beads</span>
            </nav>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 03 — Facade &amp; External Envelope</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
              Arris angles &amp; render beads
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Technical product reference for arris angle beads and render beads used in facade render repair and reinstallation on Australian Class 2 strata and commercial buildings — select a product category to view system information, brand comparisons and procurement sources.
            </p>
          </div>
        </section>

        {/* ── Product category cards ── */}
        <section className="px-8 py-14">
          <div className="mx-auto max-w-7xl">

            <div className="mb-8 flex items-start gap-3">
              <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
              <div>
                <h2 className="text-2xl font-extrabold text-sky-950">Product Categories</h2>
                <p className="mt-1 text-sm text-slate-500">8 product categories — select a category to view systems, brands and technical reference.</p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {ITEMS.map((item) =>
                item.live ? (
                  <a
                    key={item.slug}
                    href={`${BASE}/${item.slug}`}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <div className="h-0.5 w-8 rounded-full bg-red-700" />
                      <span className="inline-flex items-center gap-1 rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-[10px] font-bold text-green-700">
                        <span className="h-1 w-1 rounded-full bg-green-500" />Live
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold leading-tight text-sky-950 transition group-hover:text-sky-700">{item.label}</h3>
                    <p className="mt-2 text-xs leading-5 text-slate-500">{item.description}</p>
                    <p className="mt-3 text-xs font-semibold text-slate-400">{item.count} product systems</p>
                    <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-sky-700 transition group-hover:text-red-700">
                      View systems <ArrowRight size={12} />
                    </div>
                  </a>
                ) : (
                  <div key={item.slug} className="rounded-2xl border border-slate-100 bg-white p-6 opacity-50">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="h-0.5 w-8 rounded-full bg-slate-300" />
                      <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-400">
                        In development
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold leading-tight text-slate-600">{item.label}</h3>
                    <p className="mt-2 text-xs leading-5 text-slate-400">{item.description}</p>
                    <p className="mt-3 text-xs font-semibold text-slate-300">{item.count} product systems</p>
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
