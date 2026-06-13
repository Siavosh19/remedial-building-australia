import type { Metadata } from "next";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { PUSealantLapsProductSection, PUSealantLapsIntroSection } from "./PUSealantLapsProductSection";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Polyurethane Sealant Systems — Laps and Terminations — Flashing Failures — Remedial Building Australia",
  description:
    "Technical product reference for polyurethane sealant systems used for sealing flashing lap joints, upstand terminations, and counter-flashing joints in roof flashing failure remediation on Australian buildings.",
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

export default function PUSealantLapsPage() {
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
              <a href="/repair-systems/roofing-defects/flashing-failures" className="hover:text-sky-700 transition">Flashing Failures</a>
              <span>/</span>
              <span className="text-sky-950">PU sealant — laps and terminations</span>
            </nav>
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 04</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  Polyurethane sealant systems — flashing laps and terminations
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Technical product reference for one-component polyurethane sealant systems used to seal flashing lap joints, upstand terminations, counter-flashing joints, and all roof flashing interfaces. Covers product selection, joint design, primer requirements, and brand comparisons for Australian residential and strata building applications.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Products listed", value: "4" },
                  { label: "Brands covered", value: "4" },
                  { label: "Type", value: "1-component PU sealant" },
                  { label: "Standard", value: "ISO 11600 / AS 4055" },
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
                      const active = tab.slug === "pu-sealant-laps-terminations";
                      return (
                        <a
                          key={tab.slug}
                          href={`/repair-systems/roofing-defects/flashing-failures/${tab.slug}`}
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

            <PUSealantLapsIntroSection />

            <PUSealantLapsProductSection />

            {/* Do not confuse warning */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-amber-900">Do not confuse PU sealant with:</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Silicone sealant (different chemistry) — PU is paintable, silicone is not; silicone is for static joints and non-movement glazing applications, PU is for movement joints and metal flashing lap sealing — do not substitute silicone for PU sealant on flashing lap joints",
                  "Mastic (bituminous mastic or butyl mastic) — a different formulation, less durable, less UV-resistant, and not appropriate for long-term flashing lap sealing as a substitute for a formed metal flashing or a correctly designed PU sealant joint",
                  "Polysulfide sealant — a different chemistry used in specific facade and glazing joint applications — not the standard for roofing flashing lap joints",
                  "Flashing compound (brush-applied or trowel-applied bituminous flashing compounds) — a different product category used for waterproofing surface coatings, not a sealant for joint filling at flashing laps",
                  "PU liquid waterproofing membrane — a different product category — liquid-applied polyurethane membranes are not the same as PU sealant for lap joints",
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
                Confirm sealant compatibility with the substrate and primer requirements before application. Old sealant must be fully removed before new sealant application — do not apply new sealant over old, failed sealant. Final product selection must be confirmed against the current manufacturer technical data sheet. Do not rely on this reference as a substitute for professional engineering or roofing consultant advice.
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
                  title: "Generate a scope of works for roof flashing failure remediation",
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
          <a href="/repair-systems/roofing-defects/flashing-failures" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">
            ← Flashing Failures
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
