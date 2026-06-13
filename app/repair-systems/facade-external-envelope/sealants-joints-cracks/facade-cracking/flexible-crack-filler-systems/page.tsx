import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { FlexCrackIntroSection, FlexCrackProductSection } from "./FlexCrackProductSection";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Flexible Crack Filler Systems — Sealants, Joints & Cracks — Remedial Building Australia",
  description:
    "Technical product reference for flexible crack filler systems used in non-structural facade cracking remediation on Australian Class 2 strata buildings — Sika, Bostik and Selleys flexible filler system comparisons.",
};

const ACTIVE_SLUG = "flexible-crack-filler-systems";
const BASE_SEALANTS = "/repair-systems/facade-external-envelope/sealants-joints-cracks/failed-sealants-joints";
const BASE_CRACKING = "/repair-systems/facade-external-envelope/sealants-joints-cracks/facade-cracking";
const HUB = "/repair-systems/facade-external-envelope/sealants-joints-cracks";

const SIBLING_GROUPS = [
  {
    heading: "Failed Sealants and Joints",
    tabs: [
      { label: "PU sealant — one part", slug: "polyurethane-sealant-one-part" },
      { label: "PU sealant — two part", slug: "polyurethane-sealant-two-part" },
      { label: "Neutral cure silicone", slug: "neutral-cure-silicone-sealant-systems" },
      { label: "Polysulfide sealant", slug: "polysulfide-sealant-systems" },
      { label: "Backer rod", slug: "backer-rod-systems" },
      { label: "Primer systems", slug: "primer-systems-per-substrate-type" },
    ],
    base: BASE_SEALANTS,
  },
  {
    heading: "Facade Cracking",
    tabs: [
      { label: "Flexible crack filler", slug: "flexible-crack-filler-systems" },
      { label: "Movement joint sealant", slug: "movement-joint-sealant-systems" },
    ],
    base: BASE_CRACKING,
  },
];

export default function FlexibleCrackFillerPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />

      <main>
        <section className="border-b border-slate-200 bg-white px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <a href="/" className="hover:text-sky-700 transition">Home</a><span>/</span>
              <a href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</a><span>/</span>
              <a href="/repair-systems/facade-external-envelope" className="hover:text-sky-700 transition">Facade &amp; External Envelope</a><span>/</span>
              <a href={HUB} className="hover:text-sky-700 transition">Sealants, Joints &amp; Cracks</a><span>/</span>
              <span className="text-sky-950">Flexible crack filler systems</span>
            </nav>
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 03 — Facade &amp; External Envelope</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  Flexible crack filler systems
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Technical product reference for flexible crack filler systems used in non-structural facade cracking remediation on Australian Class 2 strata buildings. Covers paintable elastomeric fillers, polymer-modified crack fillers and flexible acrylic sealants for hairline-to-moderate width cracks in rendered and masonry facade surfaces — where some accommodation of ongoing minor movement is required.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Products listed", value: "3" },
                  { label: "Brands covered", value: "3" },
                  { label: "System type", value: "Flexible filler" },
                  { label: "Standards", value: "AS/NZS 4858" },
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

        <section className="px-8 py-14">
          <div className="mx-auto max-w-7xl space-y-10">
            <FlexCrackIntroSection />
            <FlexCrackProductSection />
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                </div>
                <h3 className="text-base font-extrabold text-amber-900">Do not use flexible crack filler for:</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Structural cracks (cracks from structural movement, settlement or active cracking require engineering assessment — a facade consultant or structural engineer must assess the crack cause before any repair is attempted)",
                  "Active wide movement joints (where crack widths are significant or ongoing — a sealant-backed movement joint system is required, not a crack filler — listed on the movement joint sealant systems page)",
                  "Cracks requiring epoxy crack injection (live structural cracks or cracks in structural elements — epoxy injection is used for structural repair — different product category)",
                  "Waterproofing over wide cracks (a flexible membrane system is required for waterproofing over cracked substrates — not a crack filler alone)",
                  "Cracks indicating underlying active defects (spalling, corrosion, delamination — crack filler applied over these defects will fail — remediate the underlying cause first)",
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

        <section className="border-t border-slate-200 bg-slate-50 px-8 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Disclaimer</p>
              <p className="text-xs leading-6 text-amber-900">
                This page provides general technical information only. Facade cracks must be assessed by a qualified building consultant, facade engineer or remedial building practitioner before specifying any repair system. Do not apply crack fillers over structurally active cracks without engineering assessment.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { href: "/repair-systems/facade-external-envelope", label: "Facade & External Envelope", title: "Browse all facade defect subcategories" },
                { href: HUB, label: "Sealants, Joints & Cracks", title: "Browse all sealant product categories" },
                { href: "/defect-library/facade-external-envelope", label: "Defect Library", title: "Facade cracking — causes, inspection, methodology" },
                { href: "/ai-scope-builder", label: "AI Scope Builder", title: "Generate a scope of works for facade crack remediation" },
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
          <a href={HUB} className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">← Sealants, Joints &amp; Cracks</a>
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
