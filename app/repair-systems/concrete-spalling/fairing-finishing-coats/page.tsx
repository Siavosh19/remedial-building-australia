import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { FairingFinishingProductSection, FairingFinishingIntroSection } from "./FairingFinishingProductSection";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Fairing & Finishing Coats — Concrete Spalling — Remedial Building Australia",
  description: "Technical product reference for fairing and finishing coats — Westox Plastalite Fairing Coat Part A for surface profiling and finishing after concrete spalling repair.",
};

const ACTIVE_SLUG = "fairing-finishing-coats";
const BASE = "/repair-systems/concrete-spalling";

const SIBLING_TABS = [
  { label: "Repair mortars (PM)", slug: "repair-mortars-polymer-modified" },
  { label: "Cementitious mortars", slug: "cementitious-repair-mortars" },
  { label: "Epoxy mortars", slug: "epoxy-repair-mortars" },
  { label: "Structural grouts", slug: "structural-grouts" },
  { label: "Micro-concrete", slug: "micro-concrete" },
  { label: "High-build mortars", slug: "high-build-repair-mortars" },
  { label: "Fairing & finishing", slug: "fairing-finishing-coats" },
  { label: "Bonding agents & SBR", slug: "bonding-agents-sbr-latex" },
  { label: "Rebar primers", slug: "rebar-primers-inhibitors" },
  { label: "Primers & realkalisation", slug: "concrete-primers-realkalisation" },
  { label: "Repair adhesives", slug: "concrete-repair-adhesives" },
  { label: "Edge forms", slug: "edge-forms-accessories" },
  { label: "Reinforcement mesh", slug: "reinforcement-mesh" },
  { label: "Curing compounds", slug: "curing-compounds" },
  { label: "Curing sheeting", slug: "curing-sheeting" },
  { label: "Form release agents", slug: "form-release-agents" },
  { label: "Cement & aggregates", slug: "cement-aggregates" },
];

export default function FairingFinishingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main>
        <section className="border-b border-slate-200 bg-white px-4 sm:px-8 py-12"><div className="mx-auto max-w-7xl"><nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400"><a href="/" className="hover:text-sky-700 transition">Home</a><span>/</span><a href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</a><span>/</span><a href={BASE} className="hover:text-sky-700 transition">Concrete Spalling</a><span>/</span><span className="text-sky-950">Fairing &amp; finishing coats</span></nav><PageNav /><div className="grid gap-8 lg:grid-cols-[1fr_340px]"><div><p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — Concrete Spalling</p><h1 className="mt-3 text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">Fairing &amp; finishing coats</h1><p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">Technical product reference for fairing and finishing coats — Westox Plastalite Fairing Coat Part A for surface profiling and finishing after concrete spalling repair.</p></div><div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">{[{ label: "Products listed", value: "1" }, { label: "Brand", value: "Westox" }].map((s) => <div key={s.label} className="rounded-xl border border-slate-100 bg-white p-3 text-center"><div className="text-lg font-extrabold leading-tight text-sky-950">{s.value}</div><div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{s.label}</div></div>)}</div></div></div></section>
        <div className="border-b border-slate-200 bg-white px-8"><div className="mx-auto max-w-7xl"><div className="flex items-center gap-0 overflow-x-auto">{SIBLING_TABS.map((tab) => { const active = tab.slug === ACTIVE_SLUG; return <a key={tab.slug} href={`${BASE}/${tab.slug}`} className={`relative shrink-0 border-b-2 px-4 py-3 text-xs font-bold whitespace-nowrap transition ${active ? "border-red-700 text-sky-950" : "border-transparent text-slate-500 hover:text-sky-900"}`}>{tab.label}</a>; })}</div></div></div>
        <section className="px-4 sm:px-8 py-14"><div className="mx-auto max-w-7xl space-y-10"><FairingFinishingIntroSection /><FairingFinishingProductSection /></div></section>
        <section className="border-t border-slate-200 bg-slate-50 px-4 sm:px-8 py-10"><div className="mx-auto max-w-7xl"><div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5"><p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Disclaimer</p><p className="text-xs leading-6 text-amber-900">Confirm product selection against current TDS and project specification. Do not rely on this reference as a substitute for professional advice.</p></div><div className="mt-8"><a href={BASE} className="inline-flex items-center gap-2 rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200 transition"><ArrowRight size={14} className="rotate-180" /> Back to Concrete Spalling</a></div></div></section>
      </main>
      <SeoCrossPromo />

      <footer className="border-t border-slate-200 bg-slate-100"><div className="mx-auto max-w-7xl px-5 pt-10"><a href={BASE} className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">← Concrete Spalling</a></div><div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]"><div><div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div><p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">A structured Australian remedial building knowledge platform.</p></div><div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
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
          </div></div><div className="mx-auto max-w-7xl border-t border-slate-200 px-5 py-5 text-xs text-slate-400">© 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved.</div></footer>
    </div>
  );
}
