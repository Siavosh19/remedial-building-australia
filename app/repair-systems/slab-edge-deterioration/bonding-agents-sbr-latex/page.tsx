import type { Metadata } from "next";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { BondingAgentsSBRIntroSection, BondingAgentsSBRProductSection } from "./BondingAgentsSBRProductSection";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Bonding Agents & SBR Latex — Slab Edge Deterioration — Remedial Building Australia",
  description:
    "Technical product reference for SBR latex and acrylic bonding agents for slab edge deterioration repair in Australian carparks and Class 2 buildings — Ardex P 51, Sika Latex SBR, Fosroc Nitobond SBR, and Tremco system comparisons.",
};

const ACTIVE_SLUG = "bonding-agents-sbr-latex";
const BASE = "/repair-systems/slab-edge-deterioration";

const SIBLING_TABS = [
  { label: "PM repair mortars", slug: "repair-mortars-polymer-modified" },
  { label: "Epoxy mortars", slug: "epoxy-repair-mortars" },
  { label: "Bonding agents", slug: "bonding-agents-sbr-latex" },
  { label: "Edge forms", slug: "edge-forms-accessories" },
  { label: "Reinforcement mesh", slug: "reinforcement-mesh" },
  { label: "Curing compounds", slug: "curing-compounds" },
  { label: "Abrasives & tools", slug: "abrasives-blades-tools" },
];

export default function BondingAgentsSBRPage() {
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
              <a href={BASE} className="hover:text-sky-700 transition">Slab edge deterioration</a><span>/</span>
              <span className="text-sky-950">Bonding agents &amp; SBR latex</span>
            </nav>
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — Concrete &amp; Structural Defects</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">Bonding agents &amp; SBR latex</h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">Technical product reference for SBR latex and acrylic bonding agents applied to slab edges before repair mortar placement. Covers slurry bond coat products, primer methods, and open-time constraints from Ardex, Sika, Fosroc, and Tremco.</p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Products covered", value: "4" },
                  { label: "Bond method", value: "Slurry coat" },
                  { label: "Open time", value: "15–30 min" },
                  { label: "Sequence", value: "Pre-mortar" },
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
              <div className="flex shrink-0 flex-col">
                <div className="px-3 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-red-700 whitespace-nowrap">Slab Edge Deterioration — Product Categories</div>
                <div className="flex items-end">
                  {SIBLING_TABS.map((tab) => {
                    const active = tab.slug === ACTIVE_SLUG;
                    return (
                      <a key={tab.slug} href={`${BASE}/${tab.slug}`} className={`relative shrink-0 border-b-2 px-4 py-3 text-xs font-bold whitespace-nowrap transition ${active ? "border-red-700 text-sky-950" : "border-transparent text-slate-500 hover:text-sky-900"}`}>{tab.label}</a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="px-8 py-14">
          <div className="mx-auto max-w-7xl space-y-10">
            <BondingAgentsSBRIntroSection />
            <BondingAgentsSBRProductSection />
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white"><AlertTriangle size={15} /></div>
                <h3 className="text-base font-extrabold text-amber-900">Do not confuse SBR bonding agents with:</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Curing compounds (Sika Antisol E, Fosroc Concure WB30) — membrane-forming curing compounds are applied after mortar placement to retain moisture during curing — they are applied on top of the mortar, not between substrate and mortar, and must never be used as bonding agents",
                  "SBR waterproofing admixtures (Sika Latex-R, Fosroc Renderproof) — SBR latex added to render mixes as a waterproofing admixture is a different use from slurry bonding agent; the dosage, mix ratios, and application method differ — check TDS for each specific use",
                  "Epoxy bonding agents (Sika Sikadur-32, Fosroc Nitobond EP) — two-part epoxy bonding agents are used for structural crack repair, epoxy mortar systems, and heritage concrete; SBR bonding agents are used for cementitious repair mortars — do not substitute epoxy bonding agent for SBR bonding agent under PM mortars",
                  "Release agents and form oils — release agents (Sika Separol, petroleum-based oils) are applied to formwork surfaces; they must never contact the substrate face where bonding is required — any contamination from release agents on the repair substrate will cause adhesion failure",
                  "Floor levelling primers (Ardex P 51 used as SLC primer) — the same product (e.g. Ardex P 51) may have different dilution ratios and application methods when used as a floor levelling adhesion primer versus a slab edge bonding agent slurry — always follow the specific TDS instructions for the intended application",
                ].map((item) => (
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
              <p className="text-xs leading-6 text-amber-900">This page provides general technical information only. Final product selection must be confirmed against the current manufacturer TDS, project specification, substrate condition, and applicable standards. Do not rely on this reference as a substitute for professional engineering advice.</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { href: "/repair-systems/concrete-structural-defects", label: "Concrete & Structural Defects", title: "Browse all concrete and structural defect subcategories" },
                { href: BASE, label: "Slab Edge Deterioration", title: "Browse all product categories for slab edge repair" },
                { href: `${BASE}/repair-mortars-polymer-modified`, label: "PM Repair Mortars", title: "Repair mortars applied over bonding agent slurry coat" },
                { href: "/ai-scope-builder", label: "AI Scope Builder", title: "Generate a scope of works for slab edge repair" },
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

      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <a href={BASE} className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">← Slab edge deterioration</a>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.</p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
            <a href="/about" className="hover:text-sky-700">About</a>
            <a href="/contact" className="hover:text-sky-700">Contact</a>
            <a href="/terms" className="hover:text-sky-700">Terms</a>
            <a href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</a>
            <a href="/defect-library" className="hover:text-sky-700">Defect Library</a>
            <a href="/repair-systems" className="hover:text-sky-700">Repair Systems</a>
            <a href="/industry-news" className="hover:text-sky-700">News &amp; Insights</a>
            <a href="/directory" className="hover:text-sky-700">Business Directory</a>
            <a href="#" className="termly-display-preferences hover:text-sky-700">Consent Preferences</a>
          </div>
        </div>
        <div className="mx-auto max-w-7xl border-t border-slate-200 px-5 py-5 text-xs text-slate-400">
          © 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved. Unauthorised reproduction prohibited.
        </div>
      </footer>
    </div>
  );
}
