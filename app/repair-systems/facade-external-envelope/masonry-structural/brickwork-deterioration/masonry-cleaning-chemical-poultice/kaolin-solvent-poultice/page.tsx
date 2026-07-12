import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { KaolinSolventPoulticeIntroSection, KaolinSolventPoulticeProductSection } from "./KaolinSolventPoulticeProductSection";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Kaolin Solvent Poultice — Oil and Grease Stain Removal — Remedial Building Australia",
  description:
    "Technical product reference for kaolin/paper pulp solvent poultice for oil and grease stain removal from masonry on Australian Class 2 strata buildings — suitable for sandstone, limestone, and heritage masonry where acid cleaning is prohibited.",
};

const ACTIVE_SLUG = "kaolin-solvent-poultice";
const BASE_BRICKWORK = "/repair-systems/facade-external-envelope/masonry-structural/brickwork-deterioration";
const BASE_POULT = "/repair-systems/facade-external-envelope/masonry-structural/brickwork-deterioration/masonry-cleaning-chemical-poultice";
const BASE_CRACK = "/repair-systems/facade-external-envelope/masonry-structural/crack-stitching-masonry";
const HUB = "/repair-systems/facade-external-envelope/masonry-structural";

const SIBLING_GROUPS = [
  {
    heading: "Masonry Chemical Poultice",
    tabs: [
      { label: "Attapulgite / H₂O₂ Poultice", slug: "attapulgite-hydrogen-peroxide-poultice" },
      { label: "Kaolin Solvent Poultice", slug: "kaolin-solvent-poultice" },
      { label: "Proprietary Masonry Poultice", slug: "proprietary-masonry-poultice" },
    ],
    base: BASE_POULT,
  },
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

export default function KaolinSolventPoulticeePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />

      <main>
        <section className="border-b border-slate-200 bg-white px-4 sm:px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <a href="/" className="hover:text-sky-700 transition">Home</a><span>/</span>
              <a href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</a><span>/</span>
              <a href="/repair-systems/facade-external-envelope" className="hover:text-sky-700 transition">Facade &amp; External Envelope</a><span>/</span>
              <a href={HUB} className="hover:text-sky-700 transition">Masonry &amp; Structural</a><span>/</span>
              <a href={BASE_BRICKWORK} className="hover:text-sky-700 transition">Brickwork Deterioration</a><span>/</span>
              <a href={BASE_POULT} className="hover:text-sky-700 transition">Masonry Cleaning — Chemical Poultice</a><span>/</span>
              <span className="text-sky-950">Kaolin Solvent Poultice</span>
            </nav>
            <PageNav />
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 03 — Facade &amp; External Envelope</p>
                <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  Kaolin/paper pulp solvent poultice — oil and grease stain removal
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Technical product reference for kaolin clay or paper pulp and solvent poultice systems for oil, grease, tar, and hydrocarbon stain removal from masonry facades on Australian Class 2 strata buildings. Solvent dissolves the contamination; carrier draws it out as the poultice dries. Suitable for sandstone, limestone, and heritage masonry. Fire risk during application — ventilation and ignition source elimination mandatory. Hazardous waste disposal required.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Carrier", value: "Kaolin / paper pulp" },
                  { label: "Active", value: "Solvent" },
                  { label: "Stain type", value: "Oil / grease / hydrocarbon" },
                  { label: "PPE", value: "Required" },
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

        <section className="px-4 sm:px-8 py-14">
          <div className="mx-auto max-w-7xl space-y-10">
            <KaolinSolventPoulticeIntroSection />
            <KaolinSolventPoulticeProductSection />
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                </div>
                <h3 className="text-base font-extrabold text-amber-900">Do not confuse kaolin/solvent poultice with:</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Attapulgite + hydrogen peroxide poultice — for organic and biological staining (moss, algae, bird droppings, tannin) only; do not use solvent poultice for organic staining — the solvent will not remove biological pigments",
                  "Proprietary masonry poultice with chelating agent — required specifically for rust and iron staining; kaolin + solvent has no effect on rust or metal oxide deposits",
                  "Acid wash cleaning — entirely different mechanism for calcium-based deposits and efflorescence; do not substitute acid wash for solvent poultice on oil staining; they address entirely different contamination types",
                  "CRITICAL fire safety: Hydrocarbon solvent vapours are flammable — eliminate ALL ignition sources before commencing including pilot lights, electrical equipment, vehicles; do not use solvent poultice indoors without forced ventilation",
                  "Hazardous waste: Solvent-contaminated poultice material and any rinse materials are hazardous waste under EPA regulations — do not dispose to bins, stormwater, or general waste; arrange hazardous waste collection before commencing",
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

        <section className="border-t border-slate-200 bg-slate-50 px-4 sm:px-8 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Disclaimer</p>
              <p className="text-xs leading-6 text-amber-900">This page provides general technical information only. Solvent type must be matched to the specific oil contamination. Flammable solvents require exclusion of ignition sources and adequate ventilation. EPA solvent waste disposal requirements apply. Heritage projects may require method approval before treatment.</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { href: BASE_POULT, label: "Masonry Cleaning — Chemical Poultice", title: "Browse all chemical poultice masonry cleaning types" },
                { href: HUB, label: "Masonry & Structural", title: "Browse all masonry remediation categories" },
                { href: "/defect-library/facade-external-envelope", label: "Defect Library", title: "Masonry oil staining and contamination defects" },
                { href: "/ai-scope-builder", label: "AI Scope Builder", title: "Generate a scope of works for masonry stain removal" },
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
          <a href={BASE_POULT} className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">← Masonry Cleaning — Chemical Poultice</a>
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
