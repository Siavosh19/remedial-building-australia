import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import CategoryFilter from "./CategoryFilter";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Reinforcement Corrosion — Concrete & Structural Defects — Remedial Building Australia",
  description: "Product category reference for reinforcement corrosion repair systems — corrosion inhibitors, epoxy zinc-rich primers, cathodic protection, CFRP strengthening, and repair mortars from Sika, Fosroc, Mapei, Vector Corrosion and more.",
};

const GROUPS = [
  {
    heading: "Corrosion Protection",
    categories: [
      { label: "Corrosion inhibitors (MCI)", count: 4, slug: "corrosion-inhibitors-mci" },
      { label: "Rebar primers & inhibitors", count: 4, slug: "rebar-primers-inhibitors" },
      { label: "Cathodic protection", count: 3, slug: "cathodic-protection" },
    ],
  },
  {
    heading: "Structural Repair",
    categories: [
      { label: "Repair mortars (polymer-modified)", count: 4, slug: "repair-mortars-polymer-modified" },
      { label: "Reinforcement mesh", count: 3, slug: "reinforcement-mesh" },
    ],
  },
  {
    heading: "Structural Strengthening",
    categories: [
      { label: "Epoxy anchoring adhesives", count: 4, slug: "epoxy-anchoring-adhesives" },
      { label: "CFRP strips & laminates", count: 3, slug: "cfrp-strips-laminates" },
      { label: "Epoxy laminating resins", count: 3, slug: "epoxy-laminating-resins" },
    ],
  },
  {
    heading: "Tools & Abrasives",
    categories: [
      { label: "Abrasives, blades & tools", count: 4, slug: "abrasives-blades-tools" },
    ],
  },
];

const BASE = "/repair-systems/reinforcement-corrosion";

export default function ReinforcementCorrosionPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />

      <main>
        <section className="border-b border-slate-200 bg-white px-4 sm:px-8 py-14">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <a href="/" className="hover:text-sky-700 transition">Home</a><span>/</span>
              <a href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</a><span>/</span>
              <a href="/repair-systems/concrete-structural-defects" className="hover:text-sky-700 transition">Concrete &amp; Structural Defects</a><span>/</span>
              <span className="text-sky-950">Reinforcement corrosion</span>
            </nav>
            <PageNav />
            <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 02 — Concrete &amp; Structural Defects</p>
                <h1 className="mt-3 text-5xl font-extrabold leading-tight tracking-tight text-sky-950">Reinforcement corrosion</h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Technical product reference for reinforcement corrosion repair and protection systems used in Australian remedial building. Covers migrating corrosion inhibitors, epoxy zinc-rich rebar primers, cathodic protection systems, CFRP structural strengthening, and polymer-modified repair mortars.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {GROUPS.map(g => (
                    <span key={g.heading} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-bold text-sky-950">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-700" />
                      {g.heading}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Product categories", value: "10" },
                  { label: "Protection types", value: "4" },
                  { label: "Strengthening", value: "CFRP / Epoxy" },
                  { label: "Standards", value: "AS 5216, EN 1504" },
                ].map(s => (
                  <div key={s.label} className="rounded-xl border border-slate-100 bg-white p-4 text-center">
                    <div className="text-xl font-extrabold leading-tight text-sky-950">{s.value}</div>
                    <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CategoryFilter groups={GROUPS} />

        <section className="border-t border-slate-200 bg-white px-4 sm:px-8 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex items-start gap-3">
              <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
              <div>
                <h2 className="text-xl font-extrabold text-sky-950">Related repair systems</h2>
                <p className="mt-1 text-sm text-slate-500">Other subcategories in Concrete &amp; Structural Defects</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { href: "/repair-systems/concrete-spalling", label: "Concrete Spalling", desc: "Repair mortars, rebar primers, curing, slab-edge repair — 11 product categories" },
                { href: "/repair-systems/concrete-cracking", label: "Concrete Cracking", desc: "PU and epoxy injection, crack ports, anchors, sealants — 9 product categories" },
                { href: "/repair-systems/magnesite-flooring-deterioration", label: "Magnesite Flooring", desc: "Moisture suppression primers, self-levellers, patching — 4 product categories" },
                { href: "/repair-systems/concrete-structural-defects", label: "All Subcategories", desc: "Full concrete and structural defects repair system index" },
              ].map(card => (
                <a key={card.href} href={card.href} className="group block rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-sky-200 hover:bg-white hover:shadow-md">
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">{card.label}</div>
                  <p className="text-xs leading-5 text-slate-600">{card.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-bold text-sky-700 transition group-hover:text-red-700">Open <ArrowRight size={11} /></div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SeoCrossPromo />

      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10"><a href="/repair-systems/concrete-structural-defects" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">← Concrete &amp; Structural Defects</a></div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div><div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div><p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.</p></div>
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
        <div className="mx-auto max-w-7xl border-t border-slate-200 px-5 py-5 text-xs text-slate-400">© 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved. Unauthorised reproduction prohibited.</div>
      </footer>
    </div>
  );
}
