import type { Metadata } from "next";
import RenderRepairCategoryFilter from "./RenderRepairCategoryFilter";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Render Repair Systems — Facade & External Envelope — Remedial Building Australia",
  description:
    "Technical repair system reference for render repair, removal and reinstallation, salt attack and salt-contaminated render, and arris angles and render beads on Australian Class 2 strata and commercial facades — 18 product categories.",
};

const PARENT = "/repair-systems/facade-external-envelope";
const BASE_RENDER = "/repair-systems/facade-external-envelope/render-repair-removal-reinstallation";
const BASE_SALT   = "/repair-systems/facade-external-envelope/salt-attack-salt-contaminated-render";
const BASE_ARRIS  = "/repair-systems/facade-external-envelope/arris-angles-render-beads";

const GROUPS = [
  {
    heading: "Render Repair, Removal & Reinstallation",
    categories: [
      { label: "Two-coat polymer-modified render systems",       count: 4, href: `${BASE_RENDER}/two-coat-polymer-modified-render` },
      { label: "Two-coat sand-cement render systems",            count: 3, href: `${BASE_RENDER}/two-coat-sand-cement-render` },
      { label: "Fibre-reinforced render systems",                count: 4, href: `${BASE_RENDER}/fibre-reinforced-render` },
      { label: "Acrylic spray-applied render systems",           count: 3, href: `${BASE_RENDER}/acrylic-spray-applied-render` },
      { label: "EIFS render systems",                            count: 4, href: `${BASE_RENDER}/eifs-render-systems` },
      { label: "Bonding agent and primer systems",               count: 4, href: `${BASE_RENDER}/bonding-agent-primer-systems` },
    ],
  },
  {
    heading: "Salt Attack & Salt-Contaminated Render",
    categories: [
      { label: "Salt-resistant / renovating render systems",     count: 3, href: `${BASE_SALT}/salt-resistant-renovating-render` },
      { label: "Salt-retardant substrate treatment systems",     count: 3, href: `${BASE_SALT}/salt-retardant-substrate-treatment` },
      { label: "Breathable / vapour-permeable render systems",   count: 3, href: `${BASE_SALT}/breathable-vapour-permeable-render` },
      { label: "Saline-resistant primer / slurry systems",       count: 3, href: `${BASE_SALT}/saline-resistant-primer-slurry` },
    ],
  },
  {
    heading: "Arris Angles & Render Beads",
    categories: [
      { label: "Aluminium arris and corner angle beads",         count: 4, href: `${BASE_ARRIS}/aluminium-arris-corner-angle-beads` },
      { label: "Stainless steel arris and corner angle beads",   count: 3, href: `${BASE_ARRIS}/stainless-steel-arris-corner-angle-beads` },
      { label: "PVC arris and corner angle beads",               count: 3, href: `${BASE_ARRIS}/pvc-arris-corner-angle-beads` },
      { label: "Render stop beads",                              count: 3, href: `${BASE_ARRIS}/render-stop-beads` },
      { label: "Bellcast and drip beads",                        count: 3, href: `${BASE_ARRIS}/bellcast-drip-beads` },
      { label: "Movement and expansion beads",                   count: 3, href: `${BASE_ARRIS}/movement-expansion-beads` },
      { label: "Reveal beads",                                   count: 3, href: `${BASE_ARRIS}/reveal-beads` },
      { label: "Mesh-wing render beads",                         count: 3, href: `${BASE_ARRIS}/mesh-wing-render-beads` },
    ],
  },
];

export default function RenderRepairSystemsPage() {
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
              <span className="text-sky-950">Render Repair Systems</span>
            </nav>
            <PageNav />
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 03 — Facade &amp; External Envelope</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
              Render Repair Systems
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Technical repair system reference for render repair and reinstallation, salt attack remediation and facade edge bead systems on Australian Class 2 strata and commercial buildings — select a product category to view system information, brand comparisons and procurement sources.
            </p>
          </div>
        </section>

        <RenderRepairCategoryFilter groups={GROUPS} />

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
