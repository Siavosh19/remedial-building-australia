import type { Metadata } from "next";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { StainlessFlatBarLintelIntroSection, StainlessFlatBarLintelProductSection } from "./StainlessFlatBarLintelProductSection";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Grade 316L Stainless Steel Flat Bar Lintel — Lintel Systems Stainless Steel — Remedial Building Australia",
  description:
    "Supplier reference for grade 316L stainless steel flat bar lintels for shallow rebate coastal masonry openings on Australian Class 2 strata buildings — Ancon and state stainless fabricators.",
};

const ACTIVE_SLUG = "stainless-flat-bar-lintel";
const BASE_SS = "/repair-systems/facade-external-envelope/masonry-structural/brickwork-deterioration/lintel-systems-stainless-steel";
const BASE_BRICKWORK = "/repair-systems/facade-external-envelope/masonry-structural/brickwork-deterioration";
const HUB = "/repair-systems/facade-external-envelope/masonry-structural";

const SIBLING_GROUPS = [
  {
    heading: "Stainless Steel Lintels",
    tabs: [
      { label: "Angle Lintel", slug: "stainless-angle-lintel" },
      { label: "Flat Bar Lintel", slug: "stainless-flat-bar-lintel" },
      { label: "Back-to-Back Angle", slug: "stainless-back-to-back-angle-lintel" },
    ],
    base: BASE_SS,
  },
];

export default function StainlessFlatBarLintelPage() {
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
              <a href={HUB} className="hover:text-sky-700 transition">Masonry &amp; Structural</a><span>/</span>
              <a href={BASE_BRICKWORK} className="hover:text-sky-700 transition">Brickwork Deterioration</a><span>/</span>
              <a href={BASE_SS} className="hover:text-sky-700 transition">Lintel Systems — Stainless Steel</a><span>/</span>
              <span className="text-sky-950">Flat Bar Lintel</span>
            </nav>
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 03 — Facade &amp; External Envelope</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  Grade 316L stainless steel flat bar lintel
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Supplier reference for grade 316L stainless steel flat bar lintels for shallow rebate coastal masonry openings on Class 2 strata buildings. Covers Ancon Building Products and state stainless steel fabricators — restricted to spans typically under 2 m where the shallow rebate opening geometry prevents use of a full angle section. Structural engineer deflection verification is mandatory.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Suppliers", value: "3+" },
                  { label: "Grade", value: "316L SS" },
                  { label: "Profile", value: "Flat bar" },
                  { label: "Standard", value: "AS 4100" },
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
            <StainlessFlatBarLintelIntroSection />
            <StainlessFlatBarLintelProductSection />
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-amber-900">Do not confuse 316L flat bar lintel with:</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "316L angle lintel — deeper equal angle section — higher structural capacity than flat bar — use for all standard openings where rebate depth allows; flat bar is only for shallow rebate openings where angle cannot be accommodated",
                  "Galvanised flat bar lintel — zinc-coated carbon steel flat bar — not suitable for coastal or marine environments; corrodes within 10–15 years in chloride-rich masonry",
                  "Duplex coated flat bar — galvanised plus powder coat — improved corrosion resistance over plain galvanised but not adequate for direct coastal or marine environments",
                  "Back-to-back angle lintel — two 316L angles bolted together — for wide openings requiring higher capacity than single angle; not relevant for shallow rebate openings",
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
              <p className="text-xs leading-6 text-amber-900">This page provides general technical information only. Grade 316L stainless flat bar lintel design, section size, span capacity, deflection, and bearing details must be specified and certified by a structural engineer for each specific opening per AS 4100 and AS 3700.</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { href: BASE_SS, label: "Lintel Systems — Stainless Steel", title: "Browse all stainless lintel types" },
                { href: BASE_BRICKWORK, label: "Brickwork Deterioration", title: "Browse all brickwork remediation products" },
                { href: "/defect-library/facade-external-envelope", label: "Defect Library", title: "Lintel corrosion and masonry cracking" },
                { href: "/ai-scope-builder", label: "AI Scope Builder", title: "Generate a scope of works for lintel replacement" },
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
          <a href={BASE_SS} className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">← Lintel Systems — Stainless Steel</a>
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
