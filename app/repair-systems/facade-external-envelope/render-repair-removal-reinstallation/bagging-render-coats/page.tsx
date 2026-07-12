import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { BaggingRenderProductSection, BaggingRenderIntroSection } from "./BaggingRenderProductSection";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Bagging Render Coats — Render Repair, Removal & Reinstallation — Remedial Building Australia",
  description: "Technical product reference for bagging render coats — Westox Plastalite Bagging Mix for masonry, brick, and concrete block facade surfaces on Australian strata and commercial buildings.",
};

const ACTIVE_SLUG = "bagging-render-coats";
const BASE_RENDER = "/repair-systems/facade-external-envelope/render-repair-removal-reinstallation";
const BASE_ARRIS = "/repair-systems/facade-external-envelope/arris-angles-render-beads";

const SIBLING_GROUPS = [
  {
    heading: "Render Repair, Removal & Reinstallation",
    tabs: [
      { label: "Two-coat PM render", slug: "two-coat-polymer-modified-render" },
      { label: "Two-coat sand cement", slug: "two-coat-sand-cement-render" },
      { label: "Fibre-reinforced render", slug: "fibre-reinforced-render" },
      { label: "Acrylic spray render", slug: "acrylic-spray-applied-render" },
      { label: "EIFS render", slug: "eifs-render-systems" },
      { label: "Salt-resistant render", slug: "salt-resistant-renovating-render" },
      { label: "Breathable render", slug: "breathable-vapour-permeable-render" },
      { label: "Bonding agents", slug: "bonding-agent-primer-systems" },
      { label: "Salt-retardant treatment", slug: "salt-retardant-substrate-treatment" },
      { label: "Saline primer / slurry", slug: "saline-resistant-primer-slurry" },
      { label: "Bagging coats", slug: "bagging-render-coats" },
      { label: "Multi-finish render", slug: "multi-finish-render-coatings" },
    ],
    base: BASE_RENDER,
  },
  {
    heading: "Arris & Render Beads",
    tabs: [
      { label: "Aluminium arris", slug: "aluminium-arris-corner-angle-beads" },
      { label: "Stainless arris", slug: "stainless-steel-arris-corner-angle-beads" },
      { label: "PVC arris", slug: "pvc-arris-corner-angle-beads" },
      { label: "Render stop beads", slug: "render-stop-beads" },
      { label: "Bellcast / drip beads", slug: "bellcast-drip-beads" },
      { label: "Movement beads", slug: "movement-expansion-beads" },
      { label: "Reveal beads", slug: "reveal-beads" },
      { label: "Mesh-wing beads", slug: "mesh-wing-render-beads" },
    ],
    base: BASE_ARRIS,
  },
];

export default function BaggingRenderPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main>
        <section className="border-b border-slate-200 bg-white px-4 sm:px-8 py-12"><div className="mx-auto max-w-7xl"><nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400"><a href="/" className="hover:text-sky-700 transition">Home</a><span>/</span><a href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</a><span>/</span><a href="/repair-systems/facade-external-envelope" className="hover:text-sky-700 transition">Facade &amp; External Envelope</a><span>/</span><a href={BASE_RENDER} className="hover:text-sky-700 transition">Render Repair, Removal &amp; Reinstallation</a><span>/</span><span className="text-sky-950">Bagging render coats</span></nav><PageNav /><div className="grid gap-8 lg:grid-cols-[1fr_340px]"><div><p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 03 — Facade &amp; External Envelope</p><h1 className="mt-3 text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">Bagging render coats</h1><p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">Technical product reference for bagging render coats — Westox Plastalite Bagging Mix for masonry, brick, and concrete block facade surfaces.</p></div><div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">{[{ label: "Products listed", value: "1" }, { label: "Brand", value: "Westox" }].map((s) => <div key={s.label} className="rounded-xl border border-slate-100 bg-white p-3 text-center"><div className="text-lg font-extrabold leading-tight text-sky-950">{s.value}</div><div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{s.label}</div></div>)}</div></div></div></section>
        <div className="border-b border-slate-200 bg-white px-8"><div className="mx-auto max-w-7xl"><div className="flex items-stretch gap-0 overflow-x-auto">{SIBLING_GROUPS.map((group, gi) => (<div key={group.heading} className={`flex shrink-0 flex-col${gi > 0 ? " border-l border-slate-200 ml-1 pl-1" : ""}`}><div className="px-3 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-red-700 whitespace-nowrap">{group.heading}</div><div className="flex items-end">{group.tabs.map((tab) => { const active = tab.slug === ACTIVE_SLUG; return <a key={tab.slug} href={`${group.base}/${tab.slug}`} className={`relative shrink-0 border-b-2 px-4 py-3 text-xs font-bold whitespace-nowrap transition ${active ? "border-red-700 text-sky-950" : "border-transparent text-slate-500 hover:text-sky-900"}`}>{tab.label}</a>; })}</div></div>))}</div></div></div>
        <section className="px-4 sm:px-8 py-14"><div className="mx-auto max-w-7xl space-y-10"><BaggingRenderIntroSection /><BaggingRenderProductSection /></div></section>
        <section className="border-t border-slate-200 bg-slate-50 px-4 sm:px-8 py-10"><div className="mx-auto max-w-7xl"><div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5"><p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Disclaimer</p><p className="text-xs leading-6 text-amber-900">Confirm product selection against current TDS and project specification. Do not rely on this reference as a substitute for professional advice.</p></div><div className="mt-8"><a href={BASE_RENDER} className="inline-flex items-center gap-2 rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200 transition"><ArrowRight size={14} className="rotate-180" /> Back to Render Repair, Removal &amp; Reinstallation</a></div></div></section>
      </main>
      <SeoCrossPromo />

      <footer className="border-t border-slate-200 bg-slate-100"><div className="mx-auto max-w-7xl px-5 pt-10"><a href={BASE_RENDER} className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">← Render Repair, Removal &amp; Reinstallation</a></div><div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]"><div><div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div><p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">A structured Australian remedial building knowledge platform.</p></div><div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
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
