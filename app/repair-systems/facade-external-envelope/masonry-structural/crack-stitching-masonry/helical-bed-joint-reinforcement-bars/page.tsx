import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { HelicalBarsIntroSection, HelicalBarsProductSection } from "./HelicalBarsProductSection";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Helical Bed Joint Reinforcement Bars — Crack Stitching — Remedial Building Australia",
  description:
    "Technical product reference for helical bed joint reinforcement bar systems for masonry crack stitching remediation on Australian Class 2 strata buildings — stainless helical bars grouted into cut bed joints to stabilise masonry cracks.",
};

const ACTIVE_SLUG = "helical-bed-joint-reinforcement-bars";
const BASE_BRICKWORK = "/repair-systems/facade-external-envelope/masonry-structural/brickwork-deterioration";
const BASE_CRACK = "/repair-systems/facade-external-envelope/masonry-structural/crack-stitching-masonry";
const HUB = "/repair-systems/facade-external-envelope/masonry-structural";

const SIBLING_GROUPS = [
  {
    heading: "Brickwork Deterioration",
    tabs: [
      { label: "Repointing — lime", slug: "repointing-mortar-lime" },
      { label: "Repointing — cement", slug: "repointing-mortar-cement" },
      { label: "Brick replacement", slug: "brick-replacement-matching-systems" },
      { label: "Cavity ties — helical", slug: "remedial-cavity-wall-ties-stainless-helical" },
      { label: "Cavity ties — resin anchor", slug: "remedial-cavity-wall-ties-chemical-resin-anchor" },
      { label: "Cavity ties — mechanical", slug: "remedial-cavity-wall-ties-mechanical-expansion" },
      { label: "Lintel — duplex steel", slug: "lintel-systems-duplex-coated-steel" },
      { label: "Lintel — galvanised", slug: "lintel-systems-galvanised-steel" },
      { label: "Lintel — stainless", slug: "lintel-systems-stainless-steel" },
      { label: "Lintel — concrete", slug: "lintel-systems-concrete" },
      { label: "Cavity flashing — aluminium", slug: "cavity-flashing-aluminium" },
      { label: "Cavity flashing — lead", slug: "cavity-flashing-lead" },
      { label: "Cavity flashing — Alcore", slug: "cavity-flashing-alcore" },
      { label: "Movement joint sealant", slug: "movement-joint-polyurethane-sealant" },
      { label: "Silane water repellent", slug: "penetrating-silane-water-repellent" },
      { label: "Masonry cleaning — acid", slug: "masonry-cleaning-acid-wash" },
      { label: "Masonry cleaning — chemical", slug: "masonry-cleaning-chemical-poultice" },
    ],
    base: BASE_BRICKWORK,
  },
  {
    heading: "Crack Stitching — Masonry",
    tabs: [
      { label: "Helical bars", slug: "helical-bed-joint-reinforcement-bars" },
      { label: "Stainless rod epoxy", slug: "stainless-rod-epoxy-grouted-systems" },
    ],
    base: BASE_CRACK,
  },
];

export default function HelicalBarsPage() {
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
              <a href={BASE_CRACK} className="hover:text-sky-700 transition">Crack Stitching — Masonry</a><span>/</span>
              <span className="text-sky-950">Helical bars</span>
            </nav>
            <PageNav />
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 03 — Facade &amp; External Envelope</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  Helical bed joint reinforcement bars
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Technical product reference for helical bed joint reinforcement bar systems for masonry crack stitching remediation on Australian Class 2 strata buildings. Stainless steel helical bars are installed into cut bed joints and grouted with a cementitious or resin grout to stitch across masonry cracks — restoring tensile continuity to the masonry leaf without full brick replacement. Structural engineer specification is required for all crack stitching works.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Products listed", value: "3" },
                  { label: "Types", value: "3" },
                  { label: "System type", value: "Helical reinforcement" },
                  { label: "Standards", value: "AS 3700" },
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
            <HelicalBarsIntroSection />
            <HelicalBarsProductSection />
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                </div>
                <h3 className="text-base font-extrabold text-amber-900">Critical notes for helical bar crack stitching:</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "STRUCTURAL WORK — a structural engineer must identify the cause of the cracking, confirm that crack stabilisation is appropriate and specify the helical bar type, diameter, length, spacing and grout system before any crack stitching commences",
                  "Crack stitching treats the symptom — the cause of cracking must be identified and eliminated or managed before stitching; stitching active cracks without addressing the cause will result in new cracking adjacent to the stitch zone",
                  "All helical bars must be grade 316 stainless steel — do not use 304 stainless, carbon steel or galvanised bar in a concealed masonry application",
                  "Bed joints must be raked out cleanly to the correct depth and width before bar installation — do not install bars in shallow or dust-filled grooves; inadequate groove preparation results in poor grout bond and bar pull-out failure",
                  "The grout must fully encapsulate the helical bar — inject grout from the back of the groove towards the face, not from the face inward; a void anywhere along the bar will cause a local corrosion point in coastal environments",
                  "Allow the grout to achieve adequate strength before repointing the joint face — premature repointing disturbs the fresh grout and can dislodge the bar before bond has developed",
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
              <p className="text-xs leading-6 text-amber-900">This page provides general technical information only. Masonry crack stitching is structural work — bar type, diameter, length, spacing, grout selection and installation must be specified and certified by a structural engineer against project-specific crack cause, masonry type and AS 3700 requirements.</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { href: "/repair-systems/facade-external-envelope", label: "Facade & External Envelope", title: "Browse all facade defect subcategories" },
                { href: HUB, label: "Masonry & Structural", title: "Browse all masonry remediation categories" },
                { href: "/defect-library/facade-external-envelope", label: "Defect Library", title: "Masonry cracking and structural movement defects" },
                { href: "/ai-scope-builder", label: "AI Scope Builder", title: "Generate a scope of works for masonry crack stitching" },
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
          <a href={HUB} className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">← Masonry &amp; Structural</a>
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
