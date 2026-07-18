import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { Code5LeadFlashingIntroSection, Code5LeadFlashingProductSection } from "./Code5LeadFlashingProductSection";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Code 5 Milled Lead Cavity Flashing — Midland Lead · Austral Lead — Remedial Building Australia",
  description:
    "Supplier comparison for Code 5 milled lead cavity flashing (2.24mm, 25 kg/m²) for masonry facade remediation on Australian Class 2 strata buildings — parapet and heavy-duty cavity applications.",
};

const ACTIVE_SLUG = "code-5-milled-lead-flashing";
const BASE_LEAD = "/repair-systems/facade-external-envelope/masonry-structural/brickwork-deterioration/cavity-flashing-lead";
const BASE_BRICKWORK = "/repair-systems/facade-external-envelope/masonry-structural/brickwork-deterioration";
const HUB = "/repair-systems/facade-external-envelope/masonry-structural";

const SIBLING_GROUPS = [
  {
    heading: "Lead Cavity Flashing",
    tabs: [
      { label: "Code 4 Lead Flashing", slug: "code-4-milled-lead-flashing" },
      { label: "Code 5 Lead Flashing", slug: "code-5-milled-lead-flashing" },
      { label: "Code 6 Heavy Duty Lead", slug: "code-6-heavy-duty-lead-flashing" },
    ],
    base: BASE_LEAD,
  },
];

export default function Code5LeadFlashingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />

      <main>
        <section className="border-b border-slate-200 bg-white px-4 sm:px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <Link href="/" className="hover:text-sky-700 transition">Home</Link><span>/</span>
              <Link href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</Link><span>/</span>
              <Link href="/repair-systems/facade-external-envelope" className="hover:text-sky-700 transition">Facade &amp; External Envelope</Link><span>/</span>
              <a href={HUB} className="hover:text-sky-700 transition">Masonry &amp; Structural</a><span>/</span>
              <a href={BASE_BRICKWORK} className="hover:text-sky-700 transition">Brickwork Deterioration</a><span>/</span>
              <a href={BASE_LEAD} className="hover:text-sky-700 transition">Cavity Flashing — Lead</a><span>/</span>
              <span className="text-sky-950">Code 5 Lead Flashing</span>
            </nav>
            <PageNav />
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 03 — Facade &amp; External Envelope</p>
                <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  Code 5 milled lead cavity flashing
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Supplier reference for Code 5 milled lead cavity flashing (2.24mm, 25 kg/m²) for masonry facade remediation on Class 2 strata buildings. The parapet-grade lead code — specified by engineers for exposed horizontal surfaces, wide-cavity applications, and locations where Code 4 durability is insufficient.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Suppliers listed", value: "2" },
                  { label: "Code", value: "Code 5" },
                  { label: "Thickness", value: "2.24mm" },
                  { label: "Weight", value: "25 kg/m²" },
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

        <div className="border-b border-slate-200 bg-white px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-stretch gap-0 overflow-x-auto">
              {SIBLING_GROUPS.map((group, gi) => (
                <div key={group.heading} className={`flex shrink-0 flex-col${gi > 0 ? " border-l border-slate-200 ml-1 pl-1" : ""}`}>
                  <div className="px-3 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-red-700 whitespace-nowrap">{group.heading}</div>
                  <div className="flex items-end">
                    {group.tabs.map((tab) => {
                      const active = tab.slug === ACTIVE_SLUG;
                      return (
                        <a key={tab.slug} href={`${group.base}/${tab.slug}`}
                          className={`relative shrink-0 border-b-2 px-4 py-3 text-xs font-bold whitespace-nowrap transition ${active ? "border-red-700 text-sky-950" : "border-transparent text-slate-500 hover:text-sky-900"}`}>
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

        <section className="px-4 sm:px-8 py-14">
          <div className="mx-auto max-w-7xl space-y-10">
            <Code5LeadFlashingIntroSection />
            <Code5LeadFlashingProductSection />
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-amber-900">Do not confuse Code 5 lead flashing with:</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Code 4 lead flashing (1.8mm, 20 kg/m²) — lighter grade for standard cavity applications at base of cavity and over lintels — not for parapets — listed on the Code 4 lead flashing page",
                  "Code 6 heavy duty lead flashing (2.65mm, 30 kg/m²) — for the most demanding applications — parapet copings in exposed coastal locations requiring maximum durability — listed on the Code 6 lead flashing page",
                  "Aluminium cavity flashing — lighter, lower cost, different thermal behaviour, not self-sealing at laps — listed on the cavity flashing — aluminium page",
                  "Alcore composite flashing — bitumen-aluminium laminate, self-adhesive type — different material and installation method — listed on the cavity flashing — Alcore page",
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

        <section className="border-t border-slate-200 bg-slate-50 px-4 sm:px-8 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Disclaimer</p>
              <p className="text-xs leading-6 text-amber-900">This page provides general technical information only. Lead code selection, flashing width, lap detail, and weep former spacing must be confirmed by a qualified remedial practitioner against project-specific conditions and AS 3700.</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { href: BASE_LEAD, label: "Cavity Flashing — Lead", title: "Browse all lead flashing codes" },
                { href: HUB, label: "Masonry & Structural", title: "Browse all masonry remediation categories" },
                { href: "/defect-library/facade-external-envelope", label: "Defect Library", title: "Cavity flashing failure in masonry facades" },
                { href: "/ai-scope-builder", label: "AI Scope Builder", title: "Generate a scope of works for cavity flashing remediation" },
              ].map((card) => (
                <a key={card.href} href={card.href} className="group block rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-sky-200 hover:shadow-md">
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">{card.label}</div>
                  <h4 className="text-sm font-extrabold leading-snug text-sky-950">{card.title}</h4>
                  <div className="mt-4 flex items-center gap-1 text-xs font-bold text-sky-700 transition group-hover:text-red-700">Open <ArrowRight size={11} /></div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SeoCrossPromo />

      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <a href={BASE_LEAD} className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">← Cavity Flashing — Lead</a>
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
