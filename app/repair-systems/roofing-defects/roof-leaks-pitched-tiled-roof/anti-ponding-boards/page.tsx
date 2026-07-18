import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { AntiPondingBoardProductSection, AntiPondingBoardIntroSection } from "./AntiPondingBoardProductSection";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Anti-Ponding Board Systems — Roof Leaks — Remedial Building Australia",
  description:
    "Technical product reference for anti-ponding board systems used in pitched tiled roof leak remediation on Australian buildings — product classification, system selection, NCC eaves ventilation requirements, and brand comparisons.",
};

const SIBLING_GROUPS = [
  { heading: "Roof Tiles", tabs: [
    { label: "Terracotta", slug: "roof-tile-replacement-terracotta" },
    { label: "Concrete", slug: "roof-tile-replacement-concrete" },
    { label: "Slate", slug: "roof-tile-replacement-slate" },
  ]},
  { heading: "Ridge & Hip", tabs: [
    { label: "Ridge/hip rebed", slug: "ridge-hip-capping-rebed" },
  ]},
  { heading: "Valley Flashings", tabs: [
    { label: "Valley — alum", slug: "valley-flashing-aluminium" },
    { label: "Valley — copper", slug: "valley-flashing-copper" },
    { label: "Valley — Colorbond", slug: "valley-flashing-colorbond" },
  ]},
  { heading: "Step Flashings", tabs: [
    { label: "Step — Colorbond", slug: "step-counter-flashing-colorbond" },
    { label: "Step — aluminium", slug: "step-counter-flashing-aluminium" },
    { label: "Step — lead", slug: "step-counter-flashing-lead" },
  ]},
  { heading: "Penetrations", tabs: [
    { label: "Flashing collars", slug: "penetration-flashing-collar" },
    { label: "Plinths", slug: "penetration-plinth-systems" },
  ]},
  { heading: "Sarking & Insulation", tabs: [
    { label: "Sarking — foil", slug: "sarking-reflective-foil" },
    { label: "Sarking — PIR", slug: "sarking-pir-under-tile" },
    { label: "Sarking — mineral wool", slug: "sarking-mineral-wool" },
    { label: "Battens", slug: "roof-battens" },
    { label: "Anti-ponding", slug: "anti-ponding-boards" },
    { label: "Insulation R4", slug: "roof-insulation-r4" },
  ]},
];

export default function AntiPondingBoardsPage() {
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
              <Link href="/repair-systems/roofing-defects/roof-leaks-pitched-tiled-roof" className="hover:text-sky-700 transition">Roof Leaks — Pitched Tiled Roof</Link>
              <span>/</span>
              <span className="text-sky-950">Anti-ponding board systems</span>
            </nav>
            <PageNav />
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 04</p>
                <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  Anti-ponding board systems — eaves and gutter
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Technical product reference for anti-ponding board systems installed at the eaves of pitched tiled roofs. Covers product selection, NCC eaves ventilation requirements, compatibility with sarking products, and brand comparisons for Australian residential and Class 2 strata buildings.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Products listed", value: "3" },
                  { label: "Brands covered", value: "2" },
                  { label: "Type", value: "Anti-ponding board" },
                  { label: "Standard", value: "NCC / BCA" },
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
                      const active = tab.slug === "anti-ponding-boards";
                      return (
                        <Link
                          key={tab.slug}
                          href={`/repair-systems/roofing-defects/roof-leaks-pitched-tiled-roof/${tab.slug}`}
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

            <AntiPondingBoardIntroSection />

            <AntiPondingBoardProductSection />

            {/* Do not confuse warning */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-amber-900">Do not confuse anti-ponding boards with:</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Gutter guards (leaf protection products) — gutter guards prevent leaf and debris entry into the gutter — they are a different product entirely with a different function — anti-ponding boards manage sarking at the eave, not leaf entry",
                  "Fascia boards (structural eave members) — fascia boards are the structural or semi-structural timber or aluminium members at the eave — anti-ponding boards are accessories installed across the top of the fascia, not substitutes for the fascia itself",
                  "Insulation stops (eave insulation barriers) — insulation stops prevent ceiling batts from entering the eave cavity — these are separate from anti-ponding boards which manage the sarking membrane at the first batten",
                  "Sarking membranes — anti-ponding boards support the sarking at the eave but are not part of the sarking membrane system itself — both are required",
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
                NCC eaves ventilation requirements vary by climate zone and roof type. Confirm ventilation area requirements with building certifier before specifying solid vs ventilated anti-ponding profile. Final product selection must be confirmed against the current manufacturer technical data sheet, project specification, sarking product compatibility, and eave geometry. Do not rely on this reference as a substitute for professional engineering or roofing consultant advice.
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
                  href: "/repair-systems/roofing-defects/roof-leaks-pitched-tiled-roof",
                  label: "Back to Roof Leaks — Pitched Tiled Roof",
                  title: "Browse all product categories for this defect",
                },
                {
                  href: "/defect-library/roofing-defects/roof-leaks-pitched-tiled-roof",
                  label: "Defect Library",
                  title: "Roof Leaks — Pitched Tiled Roof — causes, inspection, methodology",
                },
                {
                  href: "/ai-scope-builder",
                  label: "AI Scope Builder",
                  title: "Generate a scope of works for pitched tiled roof leak remediation",
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
          <Link href="/repair-systems/roofing-defects/roof-leaks-pitched-tiled-roof" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">
            ← Roof Leaks — Pitched Tiled Roof
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
