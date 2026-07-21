import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { TaperedInsulationBoardProductSection, TaperedInsulationBoardIntroSection } from "./TaperedInsulationBoardProductSection";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Tapered Insulation Board Systems — Poor Falls & Ponding — Roofing Defects — Remedial Building Australia",
  description:
    "Technical product reference for tapered insulation board systems used in flat roof fall correction — PIR and mineral wool products, fire classification, thermal performance, NCC Section J compliance, and brand comparisons for Australian flat roof ponding remediation.",
};

const SIBLING_GROUPS = [
  { heading: "Fall Correction", tabs: [
    { label: "Polymer screed", slug: "polymer-modified-screed" },
    { label: "Tapered insulation", slug: "tapered-insulation-board" },
  ]},
  { heading: "Drainage & Waterproofing", tabs: [
    { label: "Drainage outlets", slug: "drainage-outlet-systems" },
    { label: "WP membrane", slug: "waterproofing-membrane-flat-roof" },
  ]},
];

export default function TaperedInsulationBoardPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header ── */}
      <SiteHeader />

      <main>

        {/* ── Hero ── */}
        <section className="border-b border-slate-200 bg-white px-4 sm:px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <Link href="/" className="hover:text-sky-700 transition">Home</Link>
              <span>/</span>
              <Link href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</Link>
              <span>/</span>
              <Link href="/repair-systems/roofing-defects" className="hover:text-sky-700 transition">Roofing Defects</Link>
              <span>/</span>
              <Link href="/repair-systems/roofing-defects/poor-falls-ponding-flat-roofs" className="hover:text-sky-700 transition">Poor Falls &amp; Ponding (Flat Roofs)</Link>
              <span>/</span>
              <span className="text-sky-950">Tapered insulation</span>
            </nav>
            <PageNav />
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — Roofing Defects</p>
                <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  Tapered insulation board systems for flat roof fall correction
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Tapered insulation boards provide simultaneous thermal performance and drainage fall correction on flat roofs without adding significant weight. PIR, XPS and mineral wool boards are cut to tapered profiles to achieve 1:80 to 1:40 falls compliant with NCC requirements.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "R-value range", value: "R2.5–R6.0" },
                  { label: "Min fall", value: "1:80" },
                  { label: "Weight", value: "3–15 kg/m²" },
                  { label: "Fire classification", value: "AS 1530.3" },
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
                      const active = tab.slug === "tapered-insulation-board";
                      return (
                        <Link
                          key={tab.slug}
                          href={`/repair-systems/roofing-defects/poor-falls-ponding-flat-roofs/${tab.slug}`}
                          className={`relative shrink-0 border-b-2 px-4 py-3 text-xs font-bold whitespace-nowrap transition ${
                            active
                              ? "border-red-700 text-sky-950"
                              : "border-transparent text-slate-500 hover:text-sky-900"
                          }`}
                        >
                          {tab.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <section className="px-4 sm:px-8 py-14">
          <div className="mx-auto max-w-7xl space-y-10">

            <TaperedInsulationBoardIntroSection />

            <TaperedInsulationBoardProductSection />

            {/* Do not confuse warning */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-amber-900">Do not confuse tapered insulation boards with:</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Flat (non-tapered) insulation boards — flat boards do not create a fall; tapered boards must be ordered to a project-specific cut schedule and cannot be substituted with flat insulation",
                  "Polymer-modified cementitious screeds (ARDEX K 301, Laticrete 3701, Mapei Ultraplan) — these are heavy cementitious systems that add 18–22 kg/m² per 10mm; tapered insulation adds only 3–15 kg/m² total — listed on the polymer screed page",
                  "Waterproofing membranes — tapered insulation is a fall correction and thermal element, not a waterproofing product; a separate roofing membrane is always required above the insulation",
                  "XPS (extruded polystyrene) boards without a tapered profile — plain XPS can be used as insulation but does not correct falls unless factory-cut to a tapered profile",
                  "Drainage cells and filter fabrics — these are overburden components in ballasted or green roof systems, not fall correction elements",
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
        <section className="border-t border-slate-200 bg-slate-50 px-4 sm:px-8 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Disclaimer</p>
              <p className="text-xs leading-6 text-amber-900">
                This page provides general technical information only. Final product selection must be confirmed against the current manufacturer technical data sheet, project specification, structural load capacity, fire engineering requirements, NCC Section J thermal requirements, vapour control design, and applicable Australian Standards. Do not rely on this reference as a substitute for professional engineering, fire engineering, or waterproofing consultant advice.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  href: "/repair-systems/roofing-defects/poor-falls-ponding-flat-roofs/polymer-modified-screed",
                  label: "Sibling page",
                  title: "Polymer-Modified Screed Systems — cementitious fall correction",
                },
                {
                  href: "/repair-systems/roofing-defects/poor-falls-ponding-flat-roofs/drainage-outlet-systems",
                  label: "Sibling page",
                  title: "Drainage Outlet Systems — roof sump and outlet selection",
                },
                {
                  href: "/repair-systems/roofing-defects/poor-falls-ponding-flat-roofs/waterproofing-membrane-flat-roof",
                  label: "Sibling page",
                  title: "Waterproofing Membrane Systems — flat roof membrane selection",
                },
                {
                  href: "/repair-systems/roofing-defects/poor-falls-ponding-flat-roofs",
                  label: "Parent defect page",
                  title: "Poor Falls & Ponding (Flat Roofs) — all repair system categories",
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
      <SeoCrossPromo />

      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <Link href="/repair-systems/roofing-defects/poor-falls-ponding-flat-roofs" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">
            ← Poor Falls &amp; Ponding (Flat Roofs)
          </Link>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">
              A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.
            </p>
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
              <Link href="/faq" className="hover:text-sky-700">FAQ</Link>
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
