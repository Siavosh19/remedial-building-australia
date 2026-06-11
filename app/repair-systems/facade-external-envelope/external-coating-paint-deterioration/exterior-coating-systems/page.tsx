import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { ExteriorCoatingProductSection, ExteriorCoatingIntroSection } from "./ExteriorCoatingProductSection";

export const metadata: Metadata = {
  title: "Exterior Coating Systems — External Coating — Remedial Building Australia",
  description: "Technical product reference for Wattyl exterior coating systems — Wattyl Duraguard and Solagard Low Sheen acrylic topcoats for masonry and render facades on Australian strata and commercial buildings.",
};

const SIBLING_GROUPS = [
  { heading: "Primers & Preparation", tabs: [{ label: "Alkali primer", slug: "alkali-resistant-primer-systems" }, { label: "Rust primer", slug: "rust-inhibiting-primer-systems" }, { label: "Consolidant", slug: "penetrating-consolidant-systems" }, { label: "Biocide prep", slug: "biocide-surface-preparation-systems" }] },
  { heading: "Topcoat Systems", tabs: [{ label: "Acrylic 2-coat", slug: "exterior-acrylic-coating-systems" }, { label: "Elastomeric", slug: "elastomeric-coating-systems" }, { label: "Crack-bridging", slug: "elastomeric-crack-bridging-coating" }, { label: "Metal enamel", slug: "uv-resistant-enamel-metal" }, { label: "Timber enamel", slug: "exterior-enamel-timber" }] },
  { heading: "Water Repellents", tabs: [{ label: "Silane/siloxane", slug: "penetrating-silane-siloxane" }, { label: "PVDF recoating", slug: "cladding-metal-panel-recoating-pvdf" }] },
  { heading: "Specialist Coatings", tabs: [{ label: "Anti-carbonation", slug: "anti-carbonation-facade-coatings" }, { label: "Elastomeric facade", slug: "elastomeric-facade-coatings" }, { label: "Masonry protective", slug: "masonry-protective-coatings" }, { label: "Exterior systems", slug: "exterior-coating-systems" }, { label: "High-build acrylic", slug: "high-build-acrylic-membranes-facade" }, { label: "Trafficable protect.", slug: "trafficable-protective-coatings" }, { label: "Trafficable safety", slug: "trafficable-safety-coatings" }, { label: "Flexible coatings", slug: "flexible-coatings" }, { label: "Clear water repellent", slug: "clear-masonry-water-repellents" }, { label: "Textured protective", slug: "textured-protective-coatings" }, { label: "Epoxy coatings", slug: "epoxy-coatings-primers" }] },
];

const ACTIVE_SLUG = "exterior-coating-systems";
const BASE_URL = "/repair-systems/facade-external-envelope/external-coating-paint-deterioration";

export default function ExteriorCoatingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8 py-5">
          <a href="/" className="flex shrink-0 items-center gap-3"><div><div className="text-lg font-extrabold tracking-tight text-sky-950">Remedial Building Australia</div><div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Technical Remedial Building Platform</div></div></a>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-sky-800 md:flex">
            <a href="/" className="whitespace-nowrap hover:text-red-700 transition">Home</a><a href="/repair-systems" className="whitespace-nowrap text-sky-950 underline underline-offset-4 decoration-red-700">Repair Systems</a><a href="/industry-news" className="whitespace-nowrap hover:text-red-700 transition">News &amp; Insights</a><a href="/directory" className="whitespace-nowrap hover:text-red-700 transition">Directory</a><a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700 transition">AI Scope Builder</a>
          </nav>
          <a href="/directory/login" className="hidden shrink-0 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800 transition md:inline-flex">Login / Create Account</a>
        </div>
      </header>
      <main>
        <section className="border-b border-slate-200 bg-white px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400"><a href="/" className="hover:text-sky-700 transition">Home</a><span>/</span><a href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</a><span>/</span><a href="/repair-systems/facade-external-envelope" className="hover:text-sky-700 transition">Facade &amp; External Envelope</a><span>/</span><a href={BASE_URL} className="hover:text-sky-700 transition">External Coating &amp; Paint Deterioration</a><span>/</span><span className="text-sky-950">Exterior coating systems</span></nav>
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 03 — Facade &amp; External Envelope</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">Exterior coating systems</h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">Technical product reference for Wattyl exterior acrylic coating systems — Wattyl Duraguard and Solagard Low Sheen for exterior masonry and render facade repainting on Australian strata and commercial buildings.</p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[{ label: "Products listed", value: "2" }, { label: "Brand", value: "Wattyl" }].map((s) => <div key={s.label} className="rounded-xl border border-slate-100 bg-white p-3 text-center"><div className="text-lg font-extrabold leading-tight text-sky-950">{s.value}</div><div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{s.label}</div></div>)}
              </div>
            </div>
          </div>
        </section>
        <div className="border-b border-slate-200 bg-white px-8"><div className="mx-auto max-w-7xl"><div className="flex items-stretch gap-0 overflow-x-auto">{SIBLING_GROUPS.map((group, gi) => (<div key={group.heading} className={`flex shrink-0 flex-col${gi > 0 ? " border-l border-slate-200 ml-1 pl-1" : ""}`}><div className="px-3 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-red-700 whitespace-nowrap">{group.heading}</div><div className="flex items-end">{group.tabs.map((tab) => { const active = tab.slug === ACTIVE_SLUG; return <a key={tab.slug} href={`${BASE_URL}/${tab.slug}`} className={`relative shrink-0 border-b-2 px-4 py-3 text-xs font-bold whitespace-nowrap transition ${active ? "border-red-700 text-sky-950" : "border-transparent text-slate-500 hover:text-sky-900"}`}>{tab.label}</a>; })}</div></div>))}</div></div></div>
        <section className="px-8 py-14"><div className="mx-auto max-w-7xl space-y-10"><ExteriorCoatingIntroSection /><ExteriorCoatingProductSection /></div></section>
        <section className="border-t border-slate-200 bg-slate-50 px-8 py-10"><div className="mx-auto max-w-7xl"><div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5"><p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Disclaimer</p><p className="text-xs leading-6 text-amber-900">This page provides general technical information only. Final product selection must be confirmed against the current manufacturer technical data sheet and project specification. Do not rely on this reference as a substitute for professional advice.</p></div><div className="mt-8"><a href={BASE_URL} className="inline-flex items-center gap-2 rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200 transition"><ArrowRight size={14} className="rotate-180" /> Back to External Coating &amp; Paint Deterioration</a></div></div></section>
      </main>
      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10"><a href={BASE_URL} className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">← External Coating &amp; Paint Deterioration</a></div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]"><div><div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div><p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.</p></div><div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950"><a href="/about" className="hover:text-sky-700">About</a><a href="/contact" className="hover:text-sky-700">Contact</a><a href="/terms" className="hover:text-sky-700">Terms</a><a href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</a><a href="/repair-systems" className="hover:text-sky-700">Repair Systems</a><a href="/directory" className="hover:text-sky-700">Business Directory</a></div></div>
        <div className="mx-auto max-w-7xl border-t border-slate-200 px-5 py-5 text-xs text-slate-400">© 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved.</div>
      </footer>
    </div>
  );
}
