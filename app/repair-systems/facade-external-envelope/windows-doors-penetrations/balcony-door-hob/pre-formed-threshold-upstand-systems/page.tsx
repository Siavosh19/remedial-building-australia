import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PreformedThresholdIntroSection, PreformedThresholdProductSection } from "./PreformedThresholdProductSection";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Pre-Formed Threshold & Upstand Systems — Balcony Door Hob — Remedial Building Australia",
  description:
    "Technical product reference for pre-formed threshold and upstand systems used in balcony door hob remediation on Australian Class 2 strata buildings — aluminium threshold, stainless upstand and hybrid system comparisons.",
};

const ACTIVE_SLUG = "pre-formed-threshold-upstand-systems";
const BASE_PERIMETER = "/repair-systems/facade-external-envelope/windows-doors-penetrations/window-door-perimeter-failure";
const BASE_HOB = "/repair-systems/facade-external-envelope/windows-doors-penetrations/balcony-door-hob";
const HUB = "/repair-systems/facade-external-envelope/windows-doors-penetrations";

const SIBLING_GROUPS = [
  {
    heading: "Window and Door Perimeter Failure",
    tabs: [
      { label: "Perimeter sealant — silicone", slug: "perimeter-sealant-neutral-cure-silicone" },
      { label: "Perimeter sealant — PU", slug: "perimeter-sealant-polyurethane" },
      { label: "Epoxy wood filler / hardener", slug: "epoxy-wood-filler-timber-hardener-systems" },
      { label: "Head flashing — stainless", slug: "head-flashing-stainless" },
      { label: "Head flashing — Colorbond", slug: "head-flashing-colorbond" },
      { label: "Storm angle — aluminium", slug: "storm-angle-aluminium" },
      { label: "Storm angle — stainless", slug: "storm-angle-stainless" },
      { label: "Subsill drainage", slug: "subsill-drainage-systems" },
    ],
    base: BASE_PERIMETER,
  },
  {
    heading: "Balcony Door Hob",
    tabs: [
      { label: "Quick-set concrete hob", slug: "quick-set-rapid-set-high-strength-concrete" },
      { label: "Pre-formed threshold", slug: "pre-formed-threshold-upstand-systems" },
      { label: "WP termination — liquid membrane", slug: "waterproofing-termination-liquid-applied-membrane" },
      { label: "WP termination — metal angle", slug: "waterproofing-termination-metal-angle-flashing" },
    ],
    base: BASE_HOB,
  },
];

export default function PreformedThresholdPage() {
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
              <a href={HUB} className="hover:text-sky-700 transition">Windows, Doors &amp; Penetrations</a><span>/</span>
              <span className="text-sky-950">Pre-formed threshold &amp; upstand</span>
            </nav>
            <PageNav />
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 03 — Facade &amp; External Envelope</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  Pre-formed threshold &amp; upstand systems
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Technical product reference for pre-formed threshold and upstand systems used in balcony door hob remediation on Australian Class 2 strata buildings. Covers factory-fabricated aluminium threshold profiles, stainless upstand angles and composite threshold systems — used where a pre-formed metal hob or upstand is specified in preference to a formed concrete hob.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Products listed", value: "3" },
                  { label: "Types covered", value: "3" },
                  { label: "System type", value: "Threshold upstand" },
                  { label: "Standards", value: "NCC Volume One" },
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
            <PreformedThresholdIntroSection />
            <PreformedThresholdProductSection />
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                </div>
                <h3 className="text-base font-extrabold text-amber-900">Critical notes for pre-formed threshold and upstand installation:</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Pre-formed thresholds must achieve the minimum required upstand height above the finished waterproofed floor level — confirm height requirement against door frame specification and NCC waterproofing requirements",
                  "All fixings through the threshold into the concrete substrate must be sealed against water ingress — fixing penetrations are common leak points in threshold systems",
                  "Waterproofing membrane must be turned up and lapped over or under the threshold profile as specified by the membrane manufacturer — the threshold-to-membrane junction is a critical waterproofing detail",
                  "Specify 316 stainless fasteners for all threshold fixings in balcony applications — carbon steel and zinc-plated fasteners corrode and cause rust staining on the balcony tile finish",
                  "Pre-formed aluminium thresholds must be anodised or powder-coated for coastal and wet-area use — bare aluminium corrodes and stains tile grout in balcony environments",
                  "Confirm door frame manufacturer compatibility with proposed threshold profile — threshold height and profile affects door sliding operation and seal engagement",
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
              <p className="text-xs leading-6 text-amber-900">This page provides general technical information only. Threshold selection, height, fixing detail and waterproofing integration must be confirmed by a qualified remedial practitioner against the existing balcony construction, door frame manufacturer requirements and NCC.</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { href: "/repair-systems/facade-external-envelope", label: "Facade & External Envelope", title: "Browse all facade defect subcategories" },
                { href: HUB, label: "Windows, Doors & Penetrations", title: "Browse all window remediation categories" },
                { href: "/defect-library/facade-external-envelope", label: "Defect Library", title: "Balcony door hob failure" },
                { href: "/ai-scope-builder", label: "AI Scope Builder", title: "Generate a scope of works for balcony threshold systems" },
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
          <a href={HUB} className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">← Windows, Doors &amp; Penetrations</a>
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
