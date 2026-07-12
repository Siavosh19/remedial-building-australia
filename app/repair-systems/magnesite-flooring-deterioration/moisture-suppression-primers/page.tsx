import type { Metadata } from "next";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { MoistureSupprimersPrimersIntroSection, MoistureSupprimersPrimersProductSection } from "./MoistureSupprimersPrimersProductSection";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Moisture Suppression Primers — Magnesite Flooring Deterioration — Remedial Building Australia",
  description:
    "Technical product reference for epoxy and acrylic moisture suppression primers for magnesite flooring remediation in Australian Class 2 strata buildings — Ardex MC Rapid, Sika Primer MB, Fosroc Nitoprime 28, and Mapei Eco Prim T comparisons.",
};

const ACTIVE_SLUG = "moisture-suppression-primers";
const BASE = "/repair-systems/magnesite-flooring-deterioration";

const SIBLING_TABS = [
  { label: "Moisture primers", slug: "moisture-suppression-primers" },
  { label: "Self-levelling", slug: "self-levelling-underlayments" },
  { label: "Floor patching", slug: "floor-patching-compounds" },
  { label: "Grinding & prep", slug: "floor-grinding-preparation" },
];

export default function MoistureSupprimersPrimersPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />

      <main>
        <section className="border-b border-slate-200 bg-white px-4 sm:px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <a href="/" className="hover:text-sky-700 transition">Home</a><span>/</span>
              <a href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</a><span>/</span>
              <a href="/repair-systems/concrete-structural-defects" className="hover:text-sky-700 transition">Concrete &amp; Structural Defects</a><span>/</span>
              <a href={BASE} className="hover:text-sky-700 transition">Magnesite flooring deterioration</a><span>/</span>
              <span className="text-sky-950">Moisture suppression primers</span>
            </nav>
            <PageNav />
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — Concrete &amp; Structural Defects</p>
                <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">Moisture suppression primers</h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">Technical product reference for two-part epoxy and single-component acrylic primers that suppress moisture vapour from magnesite and concrete substrates before self-levelling underlayment application. Critical for preventing osmotic blistering and SLC delamination in Australian Class 2 strata buildings.</p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Products covered", value: "5" },
                  { label: "2-part epoxy RH", value: "Up to ~97%" },
                  { label: "Testing std.", value: "ASTM F2170" },
                  { label: "Sequence", value: "Pre-SLC" },
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
                <div className="px-3 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-red-700 whitespace-nowrap">Magnesite Flooring Deterioration — Product Categories</div>
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

        <section className="px-4 sm:px-8 py-14">
          <div className="mx-auto max-w-7xl space-y-10">
            <MoistureSupprimersPrimersIntroSection />
            <MoistureSupprimersPrimersProductSection />
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white"><AlertTriangle size={15} /></div>
                <h3 className="text-base font-extrabold text-amber-900">Do not confuse moisture suppression primers with:</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Self-levelling underlayment adhesion primers (standard acrylic) — standard single-component acrylic adhesion primers (Mapei Eco Prim T, Ardex P 51 in adhesion-primer mode) improve SLC bond but do NOT suppress moisture vapour; they must never be used on high-RH magnesite substrates as a substitute for a two-part epoxy moisture barrier primer",
                  "Bonding agents and SBR latex — SBR-latex bonding agents (Ardex P 51, Sika Latex SBR) used for cementitious repair mortar application on walls are not moisture barrier products; they are adhesion promoters for vertical repair applications and are entirely different from moisture suppression floor primers",
                  "Epoxy floor coatings and sealers (Sika Sikafloor, Fosroc Nitocote EP) — epoxy floor coatings are surface-applied protective barriers on fully cured concrete; they are decorative or protective coatings and not moisture primer systems for floor levelling; applying SLC over an epoxy coating without appropriate primer causes delamination",
                  "Vapour barriers in new construction (polyethylene membrane, Sisalation) — under-slab plastic vapour barriers are structural construction elements installed during concrete slab construction; they are not the same as moisture suppression floor primers applied to existing magnesite or concrete surfaces during remediation",
                  "Penetrating concrete sealers (silane, siloxane waterproofing) — penetrating water repellents seal against liquid water ingress from the surface; they do not suppress moisture vapour drive from within the slab and are not suitable as moisture barrier primers under floor levelling compounds",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-6 text-amber-900">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />{item}
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
              <p className="text-xs leading-6 text-amber-900">This page provides general technical information only. Final product selection must be confirmed against the current manufacturer TDS, project specification, substrate condition, and applicable standards. Do not rely on this reference as a substitute for professional engineering advice.</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { href: "/repair-systems/concrete-structural-defects", label: "Concrete & Structural Defects", title: "Browse all concrete and structural defect subcategories" },
                { href: BASE, label: "Magnesite Flooring Deterioration", title: "Browse all product categories for magnesite flooring repair" },
                { href: `${BASE}/self-levelling-underlayments`, label: "Self-Levelling Underlayments", title: "SLC products applied over moisture suppression primer" },
                { href: "/ai-scope-builder", label: "AI Scope Builder", title: "Generate a scope of works for magnesite floor remediation" },
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
          <a href={BASE} className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">← Magnesite flooring deterioration</a>
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
