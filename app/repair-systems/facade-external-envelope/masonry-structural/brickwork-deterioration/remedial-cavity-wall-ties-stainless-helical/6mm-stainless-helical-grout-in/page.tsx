import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { SixMmHelicalGroutInIntroSection, SixMmHelicalGroutInProductSection } from "./SixMmHelicalGroutInProductSection";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "6mm Stainless Helical Grout-In Wall Tie — Helifix / Thor Helical / Simpson — Remedial Building Australia",
  description:
    "Supplier comparison for 6mm stainless steel helical grout-in remedial cavity wall ties for masonry facade remediation on Australian Class 2 strata buildings — Helifix, Thor Helical, and Simpson Strong-Tie.",
};

const ACTIVE_SLUG = "6mm-stainless-helical-grout-in";
const BASE_HELICAL = "/repair-systems/facade-external-envelope/masonry-structural/brickwork-deterioration/remedial-cavity-wall-ties-stainless-helical";
const BASE_BRICKWORK = "/repair-systems/facade-external-envelope/masonry-structural/brickwork-deterioration";
const HUB = "/repair-systems/facade-external-envelope/masonry-structural";

const SIBLING_GROUPS = [
  {
    heading: "Stainless Helical Wall Ties",
    tabs: [
      { label: "6mm Grout-in Helical", slug: "6mm-stainless-helical-grout-in" },
      { label: "8mm Heavy Duty Helical", slug: "8mm-stainless-helical-heavy-duty" },
      { label: "DryFix Friction Tie", slug: "stainless-helical-dryfix-friction" },
    ],
    base: BASE_HELICAL,
  },
];

export default function SixMmHelicalGroutInPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />

      <main>
        <section className="border-b border-slate-200 bg-white px-4 sm:px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <Link href="/" className="hover:text-sky-700 transition">Home</Link><span>/</span>
              <Link href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</Link><span>/</span>
              <Link href="/repair-systems/facade-external-envelope" className="hover:text-sky-700 transition">Facade &amp; External Envelope</Link><span>/</span>
              <a href={HUB} className="hover:text-sky-700 transition">Masonry &amp; Structural</a><span>/</span>
              <a href={BASE_BRICKWORK} className="hover:text-sky-700 transition">Brickwork Deterioration</a><span>/</span>
              <a href={BASE_HELICAL} className="hover:text-sky-700 transition">Cavity Ties — Helical</a><span>/</span>
              <span className="text-sky-950">6mm Grout-in Helical</span>
            </nav>
            <PageNav />
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 03 — Facade &amp; External Envelope</p>
                <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  6mm stainless helical grout-in wall tie
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Supplier reference for 6mm Grade 316 stainless steel helical grout-in remedial cavity wall ties for masonry facade remediation on Class 2 strata buildings. The standard diameter for residential and light commercial cavity masonry. Compares Helifix, Thor Helical Australia, and Simpson Strong-Tie by product, regional distribution, and installation system.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Suppliers listed", value: "3" },
                  { label: "Bar diameter", value: "6mm" },
                  { label: "Steel grade", value: "316 SS" },
                  { label: "Standard", value: "AS 3700" },
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
                      return (
                        <a key={tab.slug} href={`${group.base}/${tab.slug}`}
                          className={`relative shrink-0 border-b-2 px-4 py-3 text-xs font-bold whitespace-nowrap transition ${active ? "border-red-700 text-sky-950" : "border-transparent text-slate-500 hover:text-sky-900"}`}>
                          {tab.label}
                        </a>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="px-4 sm:px-8 py-14">
          <div className="mx-auto max-w-7xl space-y-10">
            <SixMmHelicalGroutInIntroSection />
            <SixMmHelicalGroutInProductSection />
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-amber-900">Do not confuse 6mm grout-in helical ties with:</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "8mm heavy duty helical ties — larger diameter for increased load capacity in parapets, lintels over openings, and high-stress zones — listed on the 8mm heavy duty helical page",
                  "DryFix friction helical ties — friction-fit ties driven directly into pre-drilled holes without grout or resin, used where grout injection is impractical — listed on the DryFix friction tie page",
                  "Chemical resin anchor ties — ties fixed using vinylester or epoxy resin injection into pre-drilled holes — higher load capacity than helical, used in difficult substrates — listed on the cavity ties — resin anchor page",
                  "Mechanical expansion ties — wedge or sleeve expansion anchor ties fixed by torque, no grout or resin required — higher upfront cost, different installation procedure — listed on the cavity ties — mechanical expansion page",
                  "Original cavity wall ties — corrosion-failing mild steel ties already installed in the wall, not a remedial product — do not specify as replacement; use stainless helical remedial ties instead",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-6 text-amber-900">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
                    {item}
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
              <p className="text-xs leading-6 text-amber-900">This page provides general technical information only. Tie type, spacing, embedment depth, and structural adequacy must be confirmed by a structural engineer against project-specific cavity wall conditions and AS 3700. Tie replacement is a structural repair — engineer inspection and specification are required before installation.</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { href: BASE_HELICAL, label: "Cavity Ties — Helical", title: "Browse all stainless helical wall tie types" },
                { href: HUB, label: "Masonry & Structural", title: "Browse all masonry remediation categories" },
                { href: "/defect-library/facade-external-envelope", label: "Defect Library", title: "Cavity wall tie failure in masonry facades" },
                { href: "/ai-scope-builder", label: "AI Scope Builder", title: "Generate a scope of works for cavity tie replacement" },
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
          <a href={BASE_HELICAL} className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">← Cavity Ties — Stainless Helical</a>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.</p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
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
          </div>
        </div>
        <div className="mx-auto max-w-7xl border-t border-slate-200 px-5 py-5 text-xs text-slate-400">
          © 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved. Unauthorised reproduction prohibited.
        </div>
      </footer>
    </div>
  );
}
