import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SheetSealantsProductSection, SheetSealantsIntroSection } from "./SheetSealantsProductSection";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title:
    "Sheet Lap and Seam Sealants — Metal Sheet Roof — Remedial Building Australia",
  description:
    "Technical product reference for sheet lap and seam sealants on metal roofs — butyl mastic tape, neutral-cure silicone and polyurethane sealants for Australian metal sheet roof repair under AS 4654 and manufacturer specifications.",
};

const SIBLING_GROUPS = [
  {
    heading: "Metal Sheets",
    tabs: [
      { label: "Corrugated — Colorbond", slug: "metal-sheet-replacement-colorbond-corrugated" },
      { label: "Trimdek", slug: "metal-sheet-replacement-trimdek" },
      { label: "Klip-Lok", slug: "metal-sheet-replacement-klip-lok" },
      { label: "Zincalume", slug: "metal-sheet-replacement-zincalume" },
      { label: "Zinc (natural)", slug: "metal-sheet-replacement-zinc" },
    ],
  },
  {
    heading: "Cappings & Accessories",
    tabs: [
      { label: "Ridge/barge cappings", slug: "ridge-barge-cappings-metal" },
      { label: "Anti-con blanket", slug: "anti-con-blanket-metal-sheet" },
      { label: "Roofing screws", slug: "roofing-screws-sealing-washers" },
      { label: "Sheet sealants", slug: "sheet-lap-seam-sealants" },
    ],
  },
];

const ACTIVE_SLUG = "sheet-lap-seam-sealants";
const BASE_URL = "/repair-systems/roofing-defects/roof-leaks-metal-sheet-roof";

export default function SheetSealantsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />

      <main>
        <section className="border-b border-slate-200 bg-white px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <a href="/" className="hover:text-sky-700 transition">Home</a><span>/</span>
              <a href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</a><span>/</span>
              <a href="/repair-systems/roofing-defects" className="hover:text-sky-700 transition">Roofing Defects</a><span>/</span>
              <a href={BASE_URL} className="hover:text-sky-700 transition">Roof Leaks — Metal Sheet Roof</a><span>/</span>
              <span className="text-sky-950">Sheet lap and seam sealants</span>
            </nav>
            <PageNav />
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 04 — Roofing Defects</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  Sheet lap and seam sealants — metal sheet roof
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Butyl mastic tape is the primary sealing medium for sheet-to-sheet end laps and ridge capping joints on metal roofs. Neutral-cure silicone is used at penetrations and detail junctions. Acid-cure silicone must never be applied to Colorbond, Zincalume or natural zinc — the acetic acid released attacks the metallic coating and will cause premature delamination and corrosion.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Primary lap sealant", value: "Butyl tape" },
                  { label: "Penetration sealant", value: "Neutral-cure silicone" },
                  { label: "Min end lap (≤5°)", value: "300mm" },
                  { label: "CRITICAL", value: "No acid-cure" },
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
                      return (<a key={tab.slug} href={`${BASE_URL}/${tab.slug}`} className={`relative shrink-0 border-b-2 px-4 py-3 text-xs font-bold whitespace-nowrap transition ${active ? "border-red-700 text-sky-950" : "border-transparent text-slate-500 hover:text-sky-900"}`}>{tab.label}</a>);
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="px-8 py-14">
          <div className="mx-auto max-w-7xl space-y-10">
            <SheetSealantsIntroSection />
            <SheetSealantsProductSection />
          </div>
        </section>

        <section className="border-t border-slate-200 bg-slate-50 px-8 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Disclaimer</p>
              <p className="text-xs leading-6 text-amber-900">This page provides general technical information only. Sealant type, application method, end-lap dimensions and primer requirements must be confirmed against the current manufacturer TDS, the sheet manufacturer warranty conditions and the structural engineer specification. Do not rely on this reference as a substitute for professional advice.</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { href: `${BASE_URL}/metal-sheet-replacement-colorbond-corrugated`, label: "Metal Sheets", title: "Corrugated — Colorbond sheet replacement" },
                { href: `${BASE_URL}/ridge-barge-cappings-metal`, label: "Cappings & Accessories", title: "Ridge and barge cappings — metal" },
                { href: `${BASE_URL}/anti-con-blanket-metal-sheet`, label: "Cappings & Accessories", title: "Anti-con blanket systems" },
                { href: `${BASE_URL}/roofing-screws-sealing-washers`, label: "Cappings & Accessories", title: "Roofing screws and sealing washers" },
                { href: BASE_URL, label: "Back to defect", title: "Roof Leaks — Metal Sheet Roof" },
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
          <a href={BASE_URL} className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">← Roof Leaks — Metal Sheet Roof</a>
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
