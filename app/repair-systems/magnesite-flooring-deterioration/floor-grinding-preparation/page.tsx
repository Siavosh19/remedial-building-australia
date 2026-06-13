import type { Metadata } from "next";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { FloorGrindingPrepIntroSection, FloorGrindingPrepProductSection } from "./FloorGrindingPrepProductSection";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Floor Grinding & Preparation — Magnesite Flooring Deterioration — Remedial Building Australia",
  description:
    "Technical product reference for floor grinding machines and M-class HEPA dust extractors for magnesite flooring surface preparation in Australian Class 2 strata buildings — Husqvarna PG 280, Blastrac 1-10DS, HTC Superfloor 270EG, Festool CTL MIDI, and Makita VC3211MX1 comparisons.",
};

const ACTIVE_SLUG = "floor-grinding-preparation";
const BASE = "/repair-systems/magnesite-flooring-deterioration";

const SIBLING_TABS = [
  { label: "Moisture primers", slug: "moisture-suppression-primers" },
  { label: "Self-levelling", slug: "self-levelling-underlayments" },
  { label: "Floor patching", slug: "floor-patching-compounds" },
  { label: "Grinding & prep", slug: "floor-grinding-preparation" },
];

export default function FloorGrindingPrepPage() {
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
              <span className="text-sky-950">Floor grinding &amp; preparation</span>
            </nav>
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — Concrete &amp; Structural Defects</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">Floor grinding &amp; preparation</h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">Technical product reference for floor grinding machines and M-class HEPA dust extractors for surface preparation of magnesite floors before moisture primer and self-levelling compound application. Covers equipment and WHS dust control requirements for magnesite grinding in Australian Class 2 strata buildings.</p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Products covered", value: "5" },
                  { label: "Min. profile", value: "CSP 2" },
                  { label: "Dust control", value: "M-class HEPA" },
                  { label: "Hazard", value: "MgCl₂ chemical" },
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
            <FloorGrindingPrepIntroSection />
            <FloorGrindingPrepProductSection />
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white"><AlertTriangle size={15} /></div>
                <h3 className="text-base font-extrabold text-amber-900">Do not confuse floor grinding machines with:</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Angle grinders with grinding discs — hand-held angle grinders with diamond discs are used for edge areas, corners, and restricted spaces that floor grinding machines cannot reach; they are not a substitute for floor grinding machines on main floor areas, which are too slow, inconsistent, and physically demanding for whole-floor preparation",
                  "Vacuum cleaners and standard shop vacs — standard vacuum cleaners do not have HEPA filtration and are not rated for fine mineral and chemical dust; using a standard vacuum for magnesite dust collection is a WHS violation and a hazard to operators and other building occupants — only M-class or H-class HEPA extractors are compliant",
                  "Floor polishing and burnishing machines — floor polishers and rotary burnishers are finishing machines for floor coatings and sealers; they do not achieve CSP 2 profile on magnesite or concrete and must not be used as a substitute for diamond floor grinding",
                  "Shot blasting machines — shot blasting (steel shot propelled onto the surface) is a surface preparation method used on carpark floors and large concrete slabs; it is typically not used in residential apartment floor preparation due to noise, debris, and access constraints — diamond grinding is the standard method for apartment magnesite prep",
                  "Scarifying machines — scarifiers (carbide-tipped rotating drum) remove large amounts of surface material quickly and are used for aggressive concrete removal; they produce very deep, irregular profiles and are not suitable for magnesite floor preparation where controlled, even stock removal is required",
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
                { href: `${BASE}/moisture-suppression-primers`, label: "Moisture Primers", title: "Epoxy primers applied after grinding is complete" },
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
