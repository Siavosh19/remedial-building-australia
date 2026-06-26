import type { Metadata } from "next";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { SelfLevellingUnderlayIntroSection, SelfLevellingUnderlayProductSection } from "./SelfLevellingUnderlayProductSection";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Self-Levelling Underlayments — Magnesite Flooring Deterioration — Remedial Building Australia",
  description:
    "Technical product reference for self-levelling underlayments for magnesite flooring remediation in Australian Class 2 strata buildings — Ardex K 15, Ardex K 301, Sika Level-01 Top, Parchem Flowfill RS, and Mapei Ultraplan Eco comparisons.",
};

const ACTIVE_SLUG = "self-levelling-underlayments";
const BASE = "/repair-systems/magnesite-flooring-deterioration";

const SIBLING_TABS = [
  { label: "Moisture primers", slug: "moisture-suppression-primers" },
  { label: "Self-levelling", slug: "self-levelling-underlayments" },
  { label: "Floor patching", slug: "floor-patching-compounds" },
  { label: "Grinding & prep", slug: "floor-grinding-preparation" },
];

export default function SelfLevellingUnderlayPage() {
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
              <a href={BASE} className="hover:text-sky-700 transition">Magnesite flooring deterioration</a><span>/</span>
              <span className="text-sky-950">Self-levelling underlayments</span>
            </nav>
            <PageNav />
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — Concrete &amp; Structural Defects</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">Self-levelling underlayments</h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">Technical product reference for cementitious and rapid-set self-levelling floor compounds applied over moisture-primed magnesite and concrete in Australian Class 2 strata building floor remediation. Covers standard-set and rapid-set products from Ardex, Sika, Parchem, and Mapei.</p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Products covered", value: "5" },
                  { label: "Application range", value: "2–30 mm" },
                  { label: "Post-prime only", value: "Mandatory" },
                  { label: "Rapid set", value: "2–4 hrs traffic" },
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

        <section className="px-8 py-14">
          <div className="mx-auto max-w-7xl space-y-10">
            <SelfLevellingUnderlayIntroSection />
            <SelfLevellingUnderlayProductSection />
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white"><AlertTriangle size={15} /></div>
                <h3 className="text-base font-extrabold text-amber-900">Do not confuse self-levelling underlayments with:</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Moisture suppression primers — primers are applied before self-levelling compounds and are a separate step; self-levelling underlayments must never be applied without the correct moisture primer on magnesite; the two products work in sequence, not as substitutes",
                  "Floor patching compounds and feather-edge compounds — patching compounds are used to fill localised depressions and voids before SLC application; they are spot applied, not poured over the full floor area; SLC is applied over the full floor area after localised patching is complete",
                  "Epoxy floor coatings and toppings (Sika Sikafloor 264, Fosroc Nitocote) — epoxy floor coatings are applied as thin wearing surfaces on fully cured concrete; they do not self-level, do not fill depth variations, and are not underlayments for floor coverings",
                  "Concrete micro-toppings and overlays — thin decorative concrete overlays are applied for aesthetic effect; they are not floor levelling compounds and do not satisfy the planarity requirements of AS 1884 for floor covering installation",
                  "Tile adhesive bed (thick-bed adhesive mortar) — thick-bed cementitious tile adhesive is applied at 6–20 mm as a bedding layer during tiling; it is not poured to self-level and cannot substitute for a proper floor levelling underlayment under vinyl, carpet, or timber floor coverings",
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
                { href: BASE, label: "Magnesite Flooring Deterioration", title: "Browse all product categories for magnesite flooring repair" },
                { href: `${BASE}/moisture-suppression-primers`, label: "Moisture Primers", title: "Epoxy moisture barrier primers applied before self-levelling" },
                { href: `${BASE}/floor-patching-compounds`, label: "Floor Patching", title: "Localised patching compounds applied before self-levelling" },
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
