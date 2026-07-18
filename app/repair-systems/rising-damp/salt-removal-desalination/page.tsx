import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SaltRemovalDesalinationProductSection, SaltRemovalDesalinationIntroSection } from "./SaltRemovalDesalinationProductSection";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Salt Removal & Desalination — Rising Damp — Remedial Building Australia",
  description: "Technical product reference for salt removal and desalination — Westox Cocoon desalination poultice for masonry, brick, and stone facades on Australian strata and commercial buildings.",
};

const ACTIVE_SLUG = "salt-removal-desalination";
const BASE_URL = "/repair-systems/rising-damp";

const SIBLING_GROUPS = [
  {
    heading: "Chemical DPC",
    tabs: [
      { label: "Silane cream", slug: "chemical-dpc-injection-silane-cream" },
      { label: "Siloxane liquid", slug: "chemical-dpc-injection-siloxane-liquid" },
    ],
  },
  {
    heading: "Renders & Plasters",
    tabs: [
      { label: "Salt-resistant plaster", slug: "renovating-salt-resistant-plaster" },
      { label: "Breathable render", slug: "breathable-render-systems" },
      { label: "Salt-affected render", slug: "salt-affected-render-systems" },
    ],
  },
  {
    heading: "Coatings",
    tabs: [
      { label: "Breathable paint", slug: "breathable-paint-systems" },
    ],
  },
  {
    heading: "Preparation",
    tabs: [
      { label: "Salt removal", slug: "salt-removal-desalination" },
    ],
  },
];

export default function SaltRemovalDesalinationPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main>
        <section className="border-b border-slate-200 bg-white px-4 sm:px-8 py-12"><div className="mx-auto max-w-7xl"><nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400"><Link href="/" className="hover:text-sky-700 transition">Home</Link><span>/</span><Link href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</Link><span>/</span><a href={BASE_URL} className="hover:text-sky-700 transition">Rising Damp</a><span>/</span><span className="text-sky-950">Salt removal &amp; desalination</span></nav><PageNav /><div className="grid gap-8 lg:grid-cols-[1fr_340px]"><div><p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — Rising Damp</p><h1 className="mt-3 text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">Salt removal &amp; desalination</h1><p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">Technical product reference for salt removal and desalination poultices — proprietary compresses (Westox Cocoon, Remmers Desalting Compress) and traditional clay/cellulose poultices for salt extraction from masonry, brick, and stone affected by rising damp or salt contamination.</p></div><div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">{[{ label: "Products listed", value: "3" }, { label: "Brands", value: "Westox · Remmers" }].map((s) => <div key={s.label} className="rounded-xl border border-slate-100 bg-white p-3 text-center"><div className="text-lg font-extrabold leading-tight text-sky-950">{s.value}</div><div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{s.label}</div></div>)}</div></div></div></section>
        <div className="border-b border-slate-200 bg-white px-8"><div className="mx-auto max-w-7xl"><div className="flex items-stretch gap-0 overflow-x-auto">{SIBLING_GROUPS.map((group, gi) => (<div key={group.heading} className={`flex shrink-0 flex-col${gi > 0 ? " border-l border-slate-200 ml-1 pl-1" : ""}`}><div className="px-3 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-red-700 whitespace-nowrap">{group.heading}</div><div className="flex items-end">{group.tabs.map((tab) => { const active = tab.slug === ACTIVE_SLUG; return <a key={tab.slug} href={`${BASE_URL}/${tab.slug}`} className={`relative shrink-0 border-b-2 px-4 py-3 text-xs font-bold whitespace-nowrap transition ${active ? "border-red-700 text-sky-950" : "border-transparent text-slate-500 hover:text-sky-900"}`}>{tab.label}</a>; })}</div></div>))}</div></div></div>
        <section className="px-4 sm:px-8 py-14"><div className="mx-auto max-w-7xl space-y-10"><SaltRemovalDesalinationIntroSection /><SaltRemovalDesalinationProductSection /></div></section>
        <section className="border-t border-slate-200 bg-slate-50 px-4 sm:px-8 py-10"><div className="mx-auto max-w-7xl"><div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5"><p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Disclaimer</p><p className="text-xs leading-6 text-amber-900">Confirm product selection against current TDS and project specification. Do not rely on this reference as a substitute for professional advice.</p></div><div className="mt-8"><a href={BASE_URL} className="inline-flex items-center gap-2 rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200 transition"><ArrowRight size={14} className="rotate-180" /> Back to Rising Damp</a></div></div></section>
      </main>
      <SeoCrossPromo />

      <footer className="border-t border-slate-200 bg-slate-100"><div className="mx-auto max-w-7xl px-5 pt-10"><a href={BASE_URL} className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">← Rising Damp</a></div><div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]"><div><div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div><p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">A structured Australian remedial building knowledge platform.</p></div><div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
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
          </div></div><div className="mx-auto max-w-7xl border-t border-slate-200 px-5 py-5 text-xs text-slate-400">© 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved.</div></footer>
    </div>
  );
}
