import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { ChimneyFlashingLeadProductSection, ChimneyFlashingLeadIntroSection } from "./ChimneyFlashingLeadProductSection";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Chimney Flashing Systems — Lead — Flashing Failures — Remedial Building Australia",
  description:
    "Technical product reference for lead sheet chimney flashing systems used in roof flashing failure remediation on Australian buildings — Code 4 and Code 5 lead sheet, chimney apron, back gutter, soakers, and brand comparisons.",
};

const SIBLING_GROUPS = [
  { heading: "Step Flashings", tabs: [
    { label: "Step — Colorbond", slug: "step-flashing-colorbond" },
    { label: "Step — aluminium", slug: "step-flashing-aluminium" },
  ]},
  { heading: "Chimney Flashings", tabs: [
    { label: "Chimney — lead", slug: "chimney-flashing-lead" },
  ]},
  { heading: "Penetration & Sealing", tabs: [
    { label: "Penetration collars", slug: "penetration-flashing-collar" },
    { label: "PU sealant — laps", slug: "pu-sealant-laps-terminations" },
  ]},
];

export default function ChimneyFlashingLeadPage() {
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
              <Link href="/repair-systems/roofing-defects/flashing-failures" className="hover:text-sky-700 transition">Flashing Failures</Link>
              <span>/</span>
              <span className="text-sky-950">Chimney flashing systems — lead</span>
            </nav>
            <PageNav />
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 04</p>
                <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  Chimney flashing systems — lead sheet
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Technical product reference for lead sheet chimney flashing systems used in chimney flashing failure remediation. Covers Code 4 and Code 5 lead sheet, chimney apron, back gutter, soaker, and counter-flashing details, AS 3703 requirements, and supplier comparisons for Australian residential and heritage buildings.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Products listed", value: "3" },
                  { label: "Brands covered", value: "2" },
                  { label: "Material", value: "Lead sheet" },
                  { label: "Standard", value: "AS 3703" },
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
                      const active = tab.slug === "chimney-flashing-lead";
                      return (
                        <Link
                          key={tab.slug}
                          href={`/repair-systems/roofing-defects/flashing-failures/${tab.slug}`}
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

            <ChimneyFlashingLeadIntroSection />

            <ChimneyFlashingLeadProductSection />

            {/* Do not confuse warning */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-amber-900">Do not confuse chimney lead flashing with:</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Chimney flashing using Colorbond steel — less common and less malleable than lead — Colorbond cannot be hand-dressed to the brick surface to self-seal — lead is the traditional and preferred material for chimney flashings on heritage and older Australian buildings",
                  "Lead-lined collars (different product for pipe penetrations) — lead collar flashings for pipe penetrations are not the same as lead sheet chimney flashings — different product, different detailing, different installation",
                  "Code 3 lead sheet — Code 3 (1.32mm) is too light for external chimney flashing applications — Code 4 minimum for chimney apron and soakers, Code 5 for back gutter",
                  "Bituminous or mastic flashing compounds — non-metallic sealants applied as a patch repair over failed flashings — not a substitute for a correctly installed lead chimney flashing system",
                  "Soldered lead seams — chimney flashing laps must be dressed, not soldered, unless specifically detailed — confirm with the roof plumber and heritage authority requirements before soldering",
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
                Lead chimney flashings require an experienced licensed roof plumber. Lead handling requires appropriate PPE per WHS regulations. Confirm codes and minimum thicknesses with AS 3703. Do not rely on this reference as a substitute for professional engineering or roofing consultant advice.
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
                  href: "/repair-systems/roofing-defects/flashing-failures",
                  label: "Back to Flashing Failures",
                  title: "Browse all product categories for this defect",
                },
                {
                  href: "/defect-library/roofing-defects/flashing-failures",
                  label: "Defect Library",
                  title: "Flashing Failures — causes, inspection, methodology",
                },
                {
                  href: "/ai-scope-builder",
                  label: "AI Scope Builder",
                  title: "Generate a scope of works for chimney flashing failure remediation",
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
          <Link href="/repair-systems/roofing-defects/flashing-failures" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">
            ← Flashing Failures
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
