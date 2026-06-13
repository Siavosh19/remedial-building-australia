import type { Metadata } from "next";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { AluminiumHatchProductSection, AluminiumHatchIntroSection } from "./AluminiumHatchProductSection";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Aluminium Roof Access Hatch Systems — Roof Access Hatch — Roofing Defects — Remedial Building Australia",
  description:
    "Technical product reference for aluminium roof access hatch systems for Class 2 strata buildings in Australia — Milcor Style AL, Gorter HAL, and Bilco E-50TB aluminium hatches, AS 1657 compliance, waterproofing at curb, and brand comparisons.",
};

const SIBLING_GROUPS = [
  {
    heading: "Access Hatch Systems",
    tabs: [
      { label: "Aluminium hatches", slug: "aluminium-hatch-systems" },
      { label: "Insulated hatches", slug: "insulated-hatch-systems" },
    ],
  },
];

export default function AluminiumHatchSystemsPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      <SiteHeader />

      <main>

        {/* ── Hero ── */}
        <section className="border-b border-slate-200 bg-white px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <a href="/" className="hover:text-sky-700 transition">Home</a>
              <span>/</span>
              <a href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</a>
              <span>/</span>
              <a href="/repair-systems/roofing-defects" className="hover:text-sky-700 transition">Roofing Defects</a>
              <span>/</span>
              <a href="/repair-systems/roofing-defects/roof-access-hatch" className="hover:text-sky-700 transition">Roof Access Hatch</a>
              <span>/</span>
              <span className="text-sky-950">Aluminium hatch systems</span>
            </nav>
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — Roofing Defects</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  Aluminium roof access hatch systems for strata buildings
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Aluminium roof access hatches provide code-compliant, weather-tight access to flat and low-pitched roofs in Class 2 strata buildings for maintenance personnel. Units from Milcor and Gorter comply with AS 1657 fixed platforms and stairways requirements and include security locks, gasket seals and integral lifting handles.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Size range", value: "600×600mm to 1200×1200mm" },
                  { label: "Standard", value: "AS 1657" },
                  { label: "Material", value: "Mill or anodised aluminium" },
                  { label: "Load rating", value: "150kg/m²" },
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

        {/* ── Sibling tabs ── */}
        <div className="border-b border-slate-200 bg-white px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-stretch gap-0 overflow-x-auto">
              {SIBLING_GROUPS.map((group, gi) => (
                <div
                  key={group.heading}
                  className={`flex shrink-0 flex-col${gi > 0 ? " border-l border-slate-200 ml-1 pl-1" : ""}`}
                >
                  <div className="px-3 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-red-700 whitespace-nowrap">
                    {group.heading}
                  </div>
                  <div className="flex items-end">
                    {group.tabs.map((tab) => {
                      const active = tab.slug === "aluminium-hatch-systems";
                      return (
                        <a
                          key={tab.slug}
                          href={`/repair-systems/roofing-defects/roof-access-hatch/${tab.slug}`}
                          className={`relative shrink-0 border-b-2 px-4 py-3 text-xs font-bold whitespace-nowrap transition ${
                            active
                              ? "border-red-700 text-sky-950"
                              : "border-transparent text-slate-500 hover:text-sky-900"
                          }`}
                        >
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

        {/* ── Content ── */}
        <section className="px-8 py-14">
          <div className="mx-auto max-w-7xl space-y-10">

            <AluminiumHatchIntroSection />

            <AluminiumHatchProductSection />

            {/* Do not confuse warning */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-amber-900">Do not confuse aluminium roof access hatch systems with:</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Insulated roof access hatches — where NCC Section J compliance is required in conditioned spaces, an insulated hatch with thermal break and airtight seal is required — listed separately on the insulated hatch systems page",
                  "Fire-rated access hatches — standard aluminium hatches do not have a fire resistance rating — confirm fire resistance requirements with the building surveyor before specifying a non-rated aluminium hatch",
                  "Skylight curb-mount units — aluminium roof access hatches are access and maintenance hatches, not glazed skylights — the Velux FCM and similar flat roof glazed units are a different product category",
                  "Roofing access ladders — the access hatch provides the weather-tight opening — a separate fixed ladder to AS 1657 may be required and must be specified separately",
                  "Smoke ventilation hatches — smoke ventilation systems are a separate life safety product category with different standards and activation requirements — do not substitute a standard access hatch for a smoke ventilation hatch",
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

        {/* ── Disclaimer + related links ── */}
        <section className="border-t border-slate-200 bg-slate-50 px-8 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Disclaimer</p>
              <p className="text-xs leading-6 text-amber-900">
                This page provides general technical information only. Final product selection must be confirmed against the current manufacturer technical data sheet, AS 1657 requirements for the specific building configuration, building surveyor requirements, and the building consent conditions. Confirm load rating, clear opening size, and waterproofing at curb requirements with the relevant consultants before ordering. Do not rely on this reference as a substitute for professional engineering or building consultant advice.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  href: "/repair-systems/roofing-defects",
                  label: "Back to Roofing Defects",
                  title: "Browse all roofing defect subcategories",
                },
                {
                  href: "/repair-systems/roofing-defects/roof-access-hatch",
                  label: "Back to Roof Access Hatch",
                  title: "Browse all product categories for roof access hatch",
                },
                {
                  href: "/repair-systems/roofing-defects/roof-access-hatch/insulated-hatch-systems",
                  label: "Insulated Hatch Systems",
                  title: "Fakro LST and Milcor SSD thermally insulated roof hatch systems",
                },
                {
                  href: "/ai-scope-builder",
                  label: "AI Scope Builder",
                  title: "Generate a scope of works for roof access hatch replacement",
                },
              ].map((card) => (
                <a
                  key={card.href}
                  href={card.href}
                  className="group block rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-sky-200 hover:shadow-md"
                >
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">{card.label}</div>
                  <h4 className="text-sm font-extrabold leading-snug text-sky-950">{card.title}</h4>
                  <div className="mt-4 flex items-center gap-1 text-xs font-bold text-sky-700 transition group-hover:text-red-700">
                    Open <ArrowRight size={11} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <a href="/repair-systems/roofing-defects/roof-access-hatch" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">
            ← Roof Access Hatch
          </a>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">
              A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.
            </p>
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
