import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Render Cracking & Delamination — Facade Repair — Remedial Building Australia",
  description:
    "Technical product reference for polymer-modified and fibre-reinforced render repair systems, EIFS repair, texture coating and bonding primer systems for render cracking and delamination defects on Class 2 strata facades in Australia.",
};

const BASE_URL = "/repair-systems/facade-external-envelope/render-cracking-delamination";
const PARENT_URL = "/repair-systems/facade-external-envelope";

const GROUPS = [
  {
    heading: "Render Repair Systems",
    items: [
      {
        label: "Two-coat polymer-modified render systems",
        slug: "two-coat-polymer-modified-render",
        count: 3,
        description: "Sika MonoTop, Weber and Rockcote polymer-modified cementitious render systems for scratch coat and finish coat re-render over concrete and masonry facades.",
        live: true,
      },
      {
        label: "Fibre-reinforced render systems",
        slug: "fibre-reinforced-render",
        count: 3,
        description: "AR glass fibre-reinforced render systems for improved crack resistance on rendered facades — Parex, Rockcote and Sika fibre-modified systems.",
        live: true,
      },
      {
        label: "EIFS repair systems",
        slug: "eifs-repair-systems",
        count: 3,
        description: "External insulation and finish system repair — Sto, Parex and Rockcote EPS-board, base coat, mesh and finish coat systems for EIFS defect repair.",
        live: true,
      },
      {
        label: "Texture coating systems",
        slug: "texture-coating-systems",
        count: 3,
        description: "Dulux Acratex, Rockcote and Solver acrylic texture coating systems applied over cementitious base coats — fine, medium and coarse aggregate textures.",
        live: true,
      },
      {
        label: "Bonding agent and primer systems",
        slug: "bonding-agent-primer-systems",
        count: 3,
        description: "Polymer bonding agents, epoxy interface primers and cementitious slurry bonding systems for improved adhesion of new render over existing substrates.",
        live: true,
      },
    ],
  },
] as const;

export default function RenderCrackingHubPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />

      <main>
        <section className="border-b border-slate-200 bg-white px-4 sm:px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <Link href="/" className="hover:text-sky-700 transition">Home</Link><span>/</span>
              <Link href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</Link><span>/</span>
              <a href={PARENT_URL} className="hover:text-sky-700 transition">Facade &amp; External Envelope</a><span>/</span>
              <span className="text-sky-950">Render Cracking &amp; Delamination</span>
            </nav>
            <PageNav />
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 03 — Facade &amp; External Envelope</p>
            <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
              Render cracking &amp; delamination — repair systems
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Technical product reference for render repair on Class 2 strata facades — select a product type to view polymer-modified systems, fibre-reinforced renders, EIFS repair, texture coatings and bonding primers.
            </p>
          </div>
        </section>

        <section className="px-4 sm:px-8 py-14">
          <div className="mx-auto max-w-7xl space-y-12">
            {GROUPS.map((group) => (
              <div key={group.heading}>
                <div className="mb-6 flex items-start gap-3">
                  <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
                  <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-red-700">{group.heading}</h2>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((item) =>
                    item.live ? (
                      <a
                        key={item.slug}
                        href={`${BASE_URL}/${item.slug}`}
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
            ))}
          </div>
        </section>
      </main>

      <SeoCrossPromo />

      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <a href={PARENT_URL} className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">← Facade &amp; External Envelope</a>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.</p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
            <div className="flex flex-col gap-2">
              <Link href="/directory" className="hover:text-sky-700">Business Directory</Link>
              <Link href="/repair-systems" className="hover:text-sky-700">Repair Systems</Link>
              <Link href="/defect-library" className="hover:text-sky-700">Defect Library</Link>
              <Link href="/industry-news" className="hover:text-sky-700">News &amp; Insights</Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/advertise" className="hover:text-sky-700">Advertise With Us</Link>
              <Link href="/contact" className="hover:text-sky-700">Contact</Link>
              <Link href="/faq" className="hover:text-sky-700">FAQ</Link>
              <Link href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-sky-700">Terms</Link>
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
