import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import {
  KlipLokProductSection,
  KlipLokIntroSection,
} from "./KlipLokProductSection";

export const metadata: Metadata = {
  title:
    "Metal Sheet Replacement — Klip-Lok — Roof Leaks Metal Sheet Roof — Remedial Building Australia",
  description:
    "Technical product reference for Klip-Lok concealed-fix standing seam metal sheet roof replacement — Lysaght Klip-Lok 700, Klip-Lok 406 (legacy) and concealed-fix systems for Australian Class 2 strata building metal roof remediation.",
};

const SIBLING_GROUPS = [
  {
    heading: "Metal Sheets",
    tabs: [
      { label: "Corrugated — Colorbond", slug: "metal-sheet-replacement-colorbond-corrugated" },
      { label: "Trimdek", slug: "metal-sheet-replacement-trimdek" },
      { label: "Klip-Lok", slug: "metal-sheet-replacement-klip-lok" },
      { label: "Zincalume", slug: "metal-sheet-replacement-zincalume" },
      { label: "Zinc (natural)", slug: "metal-sheet-replacement-zinc" },
    ],
  },
  {
    heading: "Cappings & Accessories",
    tabs: [
      { label: "Ridge/barge cappings", slug: "ridge-barge-cappings-metal" },
      { label: "Anti-con blanket", slug: "anti-con-blanket-metal-sheet" },
      { label: "Roofing screws", slug: "roofing-screws-sealing-washers" },
      { label: "Sheet sealants", slug: "sheet-lap-seam-sealants" },
    ],
  },
];

const ACTIVE_SLUG = "metal-sheet-replacement-klip-lok";
const BASE_URL = "/repair-systems/roofing-defects/roof-leaks-metal-sheet-roof";

export default function KlipLokPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8 py-5">
          <a href="/" className="flex shrink-0 items-center gap-3">
            <div>
              <div className="text-lg font-extrabold tracking-tight text-sky-950">Remedial Building Australia</div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Technical Remedial Building Platform</div>
            </div>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-sky-800 md:flex">
            <a href="/" className="whitespace-nowrap hover:text-red-700 transition">Home</a>
            <a href="/repair-systems" className="whitespace-nowrap text-sky-950 underline underline-offset-4 decoration-red-700">Repair Systems</a>
            <a href="/industry-news" className="whitespace-nowrap hover:text-red-700 transition">News &amp; Insights</a>
            <a href="/directory" className="whitespace-nowrap hover:text-red-700 transition">Directory</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700 transition">AI Scope Builder</a>
          </nav>
          <a href="/directory/login" className="hidden shrink-0 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800 transition md:inline-flex">Login / Create Account</a>
        </div>
      </header>

      <main>
        <section className="border-b border-slate-200 bg-white px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <a href="/" className="hover:text-sky-700 transition">Home</a>
              <span>/</span>
              <a href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</a>
              <span>/</span>
              <a href="/repair-systems/roofing-defects" className="hover:text-sky-700 transition">Roofing Defects</a>
              <span>/</span>
              <a href={BASE_URL} className="hover:text-sky-700 transition">Roof Leaks — Metal Sheet Roof</a>
              <span>/</span>
              <span className="text-sky-950">Klip-Lok sheet replacement</span>
            </nav>
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 04 — Roofing Defects</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  Klip-Lok concealed-fix sheet replacement systems
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Klip-Lok is Lysaght&apos;s concealed-fix standing seam steel roofing profile, specified for near-flat commercial and Class 2 strata roof applications with a rated minimum pitch of 1°. The concealed clip system eliminates through-fastener leak paths and accommodates thermal movement. Sheet and clip replacement must use matched manufacturer-supplied components.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Profile", value: "Klip-Lok 700/406" },
                  { label: "Min pitch", value: "1°" },
                  { label: "AS standard", value: "AS 1562.1" },
                  { label: "Fix type", value: "Concealed clip" },
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
                <div
                  key={group.heading}
                  className={`flex shrink-0 flex-col${gi > 0 ? " border-l border-slate-200 ml-1 pl-1" : ""}`}
                >
                  <div className="px-3 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-red-700 whitespace-nowrap">
                    {group.heading}
                  </div>
                  <div className="flex items-end">
                    {group.tabs.map((tab) => {
                      const active = tab.slug === ACTIVE_SLUG;
                      return (
                        <a
                          key={tab.slug}
                          href={`${BASE_URL}/${tab.slug}`}
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

        <section className="px-8 py-14">
          <div className="mx-auto max-w-7xl space-y-10">
            <KlipLokIntroSection />
            <KlipLokProductSection />
          </div>
        </section>

        <section className="border-t border-slate-200 bg-slate-50 px-8 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Disclaimer</p>
              <p className="text-xs leading-6 text-amber-900">
                This page provides general technical information only. Final product selection must be confirmed against the current manufacturer technical data sheet, project specification, roof pitch, wind classification, AS 1562.1 requirements, structural engineer sign-off, and installer warranty conditions. Concealed-fix systems require verified installer competency. Do not rely on this reference as a substitute for professional engineering or roofing consultant advice.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { href: `${BASE_URL}/metal-sheet-replacement-trimdek`, label: "Metal Sheets", title: "Trimdek sheet replacement" },
                { href: `${BASE_URL}/ridge-barge-cappings-metal`, label: "Cappings & Accessories", title: "Ridge and barge cappings — metal" },
                { href: `${BASE_URL}/roofing-screws-sealing-washers`, label: "Cappings & Accessories", title: "Roofing screws and sealing washers" },
                { href: `${BASE_URL}/sheet-lap-seam-sealants`, label: "Cappings & Accessories", title: "Sheet lap and seam sealants" },
                { href: BASE_URL, label: "Back to defect", title: "Roof Leaks — Metal Sheet Roof" },
              ].map((card) => (
                <a key={card.href} href={card.href} className="group block rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-sky-200 hover:shadow-md">
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

      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <a href={BASE_URL} className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">
            ← Roof Leaks — Metal Sheet Roof
          </a>
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
