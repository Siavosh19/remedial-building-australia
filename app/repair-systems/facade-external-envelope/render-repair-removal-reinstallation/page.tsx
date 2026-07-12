import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Render Repair, Removal & Reinstallation — Facade & External Envelope — Remedial Building Australia",
  description:
    "Technical product reference for render repair, removal and reinstallation systems on Australian Class 2 strata and commercial facades — two-coat PM render, sand cement render, fibre-reinforced, acrylic spray, EIFS, salt-resistant render, breathable render, bonding agents and saline primer systems.",
};

const BASE = "/repair-systems/facade-external-envelope/render-repair-removal-reinstallation";
const PARENT = "/repair-systems/facade-external-envelope";

const ITEMS = [
  {
    label: "Two-coat polymer-modified render systems",
    slug: "two-coat-polymer-modified-render",
    count: 4,
    description:
      "Mapei, Rockcote, Sika and Fosroc two-coat polymer-modified cementitious render systems for full render removal and replacement, render repair, and facade re-render works.",
    live: true,
  },
  {
    label: "Two-coat sand-cement render systems",
    slug: "two-coat-sand-cement-render",
    count: 3,
    description:
      "Traditional two-coat sand-cement render systems — scratch coat and finish coat — for render repair and replacement on masonry and concrete facades.",
    live: true,
  },
  {
    label: "Fibre-reinforced render systems",
    slug: "fibre-reinforced-render",
    count: 4,
    description:
      "Polypropylene and glass-fibre reinforced render systems providing enhanced tensile resistance and crack distribution — for facades with elevated movement or cracking risk.",
    live: true,
  },
  {
    label: "Acrylic spray-applied render systems",
    slug: "acrylic-spray-applied-render",
    count: 3,
    description:
      "Factory-blended acrylic/cement renders applied by machine spray — typically to AAC and lightweight construction substrates — Rockcote, Weber and Boral systems.",
    live: true,
  },
  {
    label: "EIFS render systems",
    slug: "eifs-render-systems",
    count: 4,
    description:
      "External Insulation and Finish Systems (EIFS) incorporating EPS insulation board with mesh-reinforced polymer render finish — repair, replacement and partial patch systems.",
    live: true,
  },
  {
    label: "Salt-resistant renovating render systems",
    slug: "salt-resistant-renovating-render",
    count: 3,
    description:
      "Render systems specifically formulated with reduced portland cement content and specialist polymer admixtures to resist chloride and sulfate attack in coastal and salt-affected environments.",
    live: true,
  },
  {
    label: "Breathable / vapour-permeable render systems",
    slug: "breathable-vapour-permeable-render",
    count: 3,
    description:
      "WTA-compliant vapour-permeable render systems — sd value <0.14m, high pore volume >35% — allows moisture vapour to escape without disrupting the render surface.",
    live: true,
  },
  {
    label: "Bonding agent and primer systems",
    slug: "bonding-agent-primer-systems",
    count: 4,
    description:
      "Acrylic, SBR and epoxy bonding agents and cementitious bonding slurries applied to substrate before render to improve adhesion on smooth, dense or low-absorption concrete and masonry.",
    live: true,
  },
  {
    label: "Salt-retardant substrate treatment systems",
    slug: "salt-retardant-substrate-treatment",
    count: 3,
    description:
      "Crystalline and penetrating silicate-based salt-retardant treatments applied to masonry and concrete to reduce capillary salt migration before re-rendering on salt-affected facades.",
    live: true,
  },
  {
    label: "Saline-resistant primer and slurry systems",
    slug: "saline-resistant-primer-slurry",
    count: 3,
    description:
      "Cementitious bonding slurry and polymer primer systems formulated for salt-affected substrates — applied before salt-resistant or breathable render on coastal and contaminated facades.",
    live: true,
  },
] as const;

export default function RenderRepairHubPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header ── */}
      <SiteHeader />

      <main>

        {/* ── Hero ── */}
        <section className="border-b border-slate-200 bg-white px-4 sm:px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <a href="/" className="hover:text-sky-700 transition">Home</a><span>/</span>
              <a href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</a><span>/</span>
              <a href={PARENT} className="hover:text-sky-700 transition">Facade &amp; External Envelope</a><span>/</span>
              <span className="text-sky-950">Render Repair, Removal &amp; Reinstallation</span>
            </nav>
            <PageNav />
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 03 — Facade &amp; External Envelope</p>
            <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
              Render repair, removal &amp; reinstallation
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Technical product reference for render repair, removal and reinstallation systems on Australian Class 2 strata and commercial facades — select a product category to view system information, brand comparisons and procurement sources.
            </p>
          </div>
        </section>

        {/* ── Product category cards ── */}
        <section className="px-4 sm:px-8 py-14">
          <div className="mx-auto max-w-7xl">

            <div className="mb-8 flex items-start gap-3">
              <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
              <div>
                <h2 className="text-2xl font-extrabold text-sky-950">Product Categories</h2>
                <p className="mt-1 text-sm text-slate-500">10 product categories — select a category to view systems, brands and technical reference.</p>
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
