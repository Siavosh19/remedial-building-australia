import type { Metadata } from "next";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { EpoxyMortarsIntroSection, EpoxyMortarsProductSection } from "./EpoxyMortarsProductSection";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Epoxy Repair Mortars — Concrete Spalling — Remedial Building Australia",
  description:
    "Technical product reference for epoxy repair mortars for concrete spalling repair in carparks, vehicle ramps and chemically exposed areas — 2-part and 3-part systems from Ardex, Sika and Fosroc.",
};

const ACTIVE_SLUG = "epoxy-repair-mortars";
const BASE = "/repair-systems/concrete-spalling";

const SIBLING_TABS = [
  { label: "Repair mortars (PM)", slug: "repair-mortars-polymer-modified" },
  { label: "Cementitious mortars", slug: "cementitious-repair-mortars" },
  { label: "Epoxy mortars", slug: "epoxy-repair-mortars" },
  { label: "Bonding agents & SBR", slug: "bonding-agents-sbr-latex" },
  { label: "Rebar primers", slug: "rebar-primers-inhibitors" },
  { label: "Curing compounds", slug: "curing-compounds" },
  { label: "Curing sheeting", slug: "curing-sheeting" },
  { label: "Formwork timber", slug: "formwork-timber" },
  { label: "Formwork plywood", slug: "formwork-plywood" },
  { label: "Form release agents", slug: "form-release-agents" },
  { label: "Tie wire & fixings", slug: "tie-wire-fixings" },
  { label: "Cement & aggregates", slug: "cement-aggregates" },
  { label: "Abrasives & tools", slug: "abrasives-blades-tools" },
];

export default function EpoxyMortarsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />

      <main>
        <section className="border-b border-slate-200 bg-white px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <a href="/" className="hover:text-sky-700 transition">Home</a><span>/</span>
              <a href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</a><span>/</span>
              <a href="/repair-systems/concrete-structural-defects" className="hover:text-sky-700 transition">Concrete &amp; Structural Defects</a><span>/</span>
              <a href={BASE} className="hover:text-sky-700 transition">Concrete spalling</a><span>/</span>
              <span className="text-sky-950">Epoxy repair mortars</span>
            </nav>
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 02 — Concrete &amp; Structural Defects</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">Epoxy repair mortars</h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Technical product reference for 2-part and 3-part epoxy repair mortars for concrete spalling repair in carparks, vehicle ramps, and chemically exposed areas. Covers chemical resistance, early strength, thin-section application, and brand comparisons across Ardex, Sika, and Fosroc.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Products listed", value: "4" },
                  { label: "Brands covered", value: "3" },
                  { label: "System type", value: "2-part / 3-part" },
                  { label: "Min depth", value: "10 mm" },
                ].map(s => (
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
              <div className="flex shrink-0 flex-col">
                <div className="px-3 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-red-700 whitespace-nowrap">Concrete Spalling — Product Categories</div>
                <div className="flex items-end">
                  {SIBLING_TABS.map(tab => {
                    const active = tab.slug === ACTIVE_SLUG;
                    return <a key={tab.slug} href={`${BASE}/${tab.slug}`} className={`relative shrink-0 border-b-2 px-4 py-3 text-xs font-bold whitespace-nowrap transition ${active ? "border-red-700 text-sky-950" : "border-transparent text-slate-500 hover:text-sky-900"}`}>{tab.label}</a>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="px-8 py-14">
          <div className="mx-auto max-w-7xl space-y-10">
            <EpoxyMortarsIntroSection />
            <EpoxyMortarsProductSection />
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white"><AlertTriangle size={15} /></div>
                <h3 className="text-base font-extrabold text-amber-900">Do not confuse epoxy repair mortars with:</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Polymer-modified cementitious repair mortars — cementitious binder with polymer — standard choice for most concrete spalling repair — lower cost and simpler application — listed on the polymer-modified repair mortars page",
                  "Epoxy crack injection resins — low-viscosity liquid epoxy resins for injection into cracks — not mortars — listed under concrete cracking product categories",
                  "Epoxy anchoring adhesives — cartridge-dispensed epoxy for fixing bolts and anchors into concrete — not structural repair mortars",
                  "Epoxy floor coatings and sealers — thin-film epoxy coatings applied over sound concrete — protective surface systems, not structural repair materials",
                  "Structural grouts — epoxy or cementitious grouts for filling voids under baseplates or around prestress tendons — different product class from repair mortars",
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-6 text-amber-900">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-slate-50 px-8 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Disclaimer</p>
              <p className="text-xs leading-6 text-amber-900">This page provides general technical information only. Final product selection must be confirmed against the current manufacturer TDS, project specification, substrate condition, and exposure classification. Do not rely on this reference as a substitute for professional engineering or remedial building consultant advice.</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { href: BASE, label: "Concrete Spalling", title: "Browse all product categories for concrete spalling" },
                { href: `${BASE}/repair-mortars-polymer-modified`, label: "Polymer-Modified Mortars", title: "Standard structural repair mortars for most spalling applications" },
                { href: `${BASE}/bonding-agents-sbr-latex`, label: "Bonding Agents & SBR", title: "Primers and bonding agents for concrete repair" },
                { href: "/ai-scope-builder", label: "AI Scope Builder", title: "Generate a scope of works for concrete spalling repair" },
              ].map(card => (
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

      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <a href={BASE} className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">← Concrete spalling</a>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.</p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
            <a href="/about" className="hover:text-sky-700">About</a><a href="/contact" className="hover:text-sky-700">Contact</a>
            <a href="/terms" className="hover:text-sky-700">Terms</a><a href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</a>
            <a href="/defect-library" className="hover:text-sky-700">Defect Library</a><a href="/repair-systems" className="hover:text-sky-700">Repair Systems</a>
            <a href="/industry-news" className="hover:text-sky-700">News &amp; Insights</a><a href="/directory" className="hover:text-sky-700">Business Directory</a>
            <a href="#" className="termly-display-preferences hover:text-sky-700">Consent Preferences</a>
          </div>
        </div>
        <div className="mx-auto max-w-7xl border-t border-slate-200 px-5 py-5 text-xs text-slate-400">© 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved. Unauthorised reproduction prohibited.</div>
      </footer>
    </div>
  );
}
