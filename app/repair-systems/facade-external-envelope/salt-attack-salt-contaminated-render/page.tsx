import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Salt Attack & Salt-Contaminated Render — Facade Repair — Remedial Building Australia",
  description:
    "Technical product reference for salt-resistant renovating render, salt-retardant substrate treatments, breathable vapour-permeable render and saline-resistant primer systems for salt attack and salt-contaminated render defects on Class 2 strata facades in Australia.",
};

const BASE_URL = "/repair-systems/facade-external-envelope/salt-attack-salt-contaminated-render";
const PARENT_URL = "/repair-systems/facade-external-envelope";

const GROUPS = [
  {
    heading: "Salt Attack Repair Systems",
    items: [
      {
        label: "Salt-resistant / renovating render systems",
        slug: "salt-resistant-renovating-render",
        count: 3,
        description: "Rockcote, Parex and Weber renovating render systems formulated to tolerate high salt environments — porous matrix allows salt migration without surface disruption, low soluble salt content.",
        live: true,
      },
      {
        label: "Salt-retardant substrate treatment systems",
        slug: "salt-retardant-substrate-treatment",
        count: 3,
        description: "Sika, Remmers and Aquron silicate-based crystalline and penetrating salt-retardant treatments applied to masonry and concrete substrates to reduce capillary salt migration before re-rendering.",
        live: true,
      },
      {
        label: "Breathable / vapour-permeable render systems",
        slug: "breathable-vapour-permeable-render",
        count: 3,
        description: "Caparol, Remmers and Rockcote WTA-compliant vapour-permeable render systems — sd value <0.14m, high pore volume >35%, allows moisture vapour to escape without disrupting the render surface.",
        live: true,
      },
      {
        label: "Saline-resistant primer / slurry systems",
        slug: "saline-resistant-primer-slurry",
        count: 3,
        description: "Cementitious bonding slurry and polymer primer systems for salt-affected substrates — SikaCem bonding slurry, Fosroc Nitobond and Dulux primer systems applied before salt-resistant render.",
        live: true,
      },
    ],
  },
] as const;

export default function SaltAttackHubPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />

      <main>
        <section className="border-b border-slate-200 bg-white px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <a href="/" className="hover:text-sky-700 transition">Home</a><span>/</span>
              <a href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</a><span>/</span>
              <a href={PARENT_URL} className="hover:text-sky-700 transition">Facade &amp; External Envelope</a><span>/</span>
              <span className="text-sky-950">Salt Attack &amp; Salt-Contaminated Render</span>
            </nav>
            <PageNav />
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 03 — Facade &amp; External Envelope</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
              Salt attack &amp; salt-contaminated render — repair systems
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Technical product reference for salt attack remediation on Class 2 strata facades — select a product type to view salt-resistant renovating renders, substrate treatments, breathable render systems and bonding primers for salt-contaminated substrates. Note: where rising damp is the cause of salt attack, see the <a href="/repair-systems/rising-damp" className="underline hover:text-red-700">Rising Damp section</a> for DPC injection and damp-proof systems.
            </p>
          </div>
        </section>

        <section className="px-8 py-14">
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

            <div className="rounded-2xl border border-sky-200 bg-sky-50 px-6 py-5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-sky-700">Related Systems</p>
              <p className="text-xs leading-6 text-sky-900">
                Where rising damp is the underlying cause of salt attack, render repair alone is not sufficient. See the{" "}
                <a href="/repair-systems/rising-damp" className="font-bold underline hover:text-red-700">Rising Damp</a> section for DPC injection, silane cream, breathable render and renovating plaster systems that address the moisture source before re-rendering.
              </p>
            </div>
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
