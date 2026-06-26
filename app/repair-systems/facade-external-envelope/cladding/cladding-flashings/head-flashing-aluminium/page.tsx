import type { Metadata } from "next";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { HeadFlashAlumIntroSection, HeadFlashAlumProductSection } from "./HeadFlashAlumProductSection";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Head Flashing — Aluminium — Cladding Flashings — Remedial Building Australia",
  description:
    "Technical product reference for aluminium head flashings at cladding panel openings — drip-edge, Z-flashing, and box gutter head flashings for facade cladding remediation in inland and sheltered exposure zones on Class 2 buildings.",
};

const BASE_REPLACEMENT = "/repair-systems/facade-external-envelope/cladding/cladding-replacement-fire-rated";
const BASE_SUBFRAME = "/repair-systems/facade-external-envelope/cladding/cladding-subframe-support";
const BASE_FIXINGS = "/repair-systems/facade-external-envelope/cladding/cladding-fixings-anchors";
const BASE_FLASHINGS = "/repair-systems/facade-external-envelope/cladding/cladding-flashings";
const BASE_JOINTS = "/repair-systems/facade-external-envelope/cladding/cladding-joints-weatherproofing";

const SIBLING_GROUPS = [
  { heading: "Cladding Replacement — Fire-Rated", tabs: [
    { label: "Solid aluminium", slug: "solid-aluminium-sheet-non-combustible" },
    { label: "ACP — FR/A2 core", slug: "aluminium-composite-fr-a2-core" },
    { label: "Fibre cement sheet", slug: "fibre-cement-compressed-sheet" },
    { label: "Fibre cement panel", slug: "fibre-cement-architectural-panel" },
    { label: "Vitreous enamel", slug: "vitreous-enamel-porcelain-panel" },
    { label: "HPL fire-rated", slug: "high-pressure-laminate-fire-rated" },
    { label: "Terracotta panel", slug: "terracotta-ceramic-facade-panel" },
    { label: "Metal profiled", slug: "metal-profiled-standing-seam-cladding" },
  ], base: BASE_REPLACEMENT },
  { heading: "Subframe & Support", tabs: [
    { label: "Top-hat / rail", slug: "top-hat-aluminium-subframe-rail-systems" },
    { label: "Helping-hand bracket", slug: "helping-hand-bracket-fixing-systems" },
  ], base: BASE_SUBFRAME },
  { heading: "Fixings & Anchors", tabs: [
    { label: "SS 316 fixings", slug: "cladding-fixing-anchor-systems-stainless-316" },
    { label: "Rivet / concealed", slug: "rivet-concealed-fix-systems" },
  ], base: BASE_FIXINGS },
  { heading: "Cladding Flashings", tabs: [
    { label: "Head — stainless", slug: "head-flashing-stainless" },
    { label: "Head — aluminium", slug: "head-flashing-aluminium" },
    { label: "Head — Colorbond", slug: "head-flashing-colorbond" },
    { label: "Sill flashing", slug: "sill-flashing" },
    { label: "Jamb flashing", slug: "jamb-flashing" },
    { label: "Base / weep", slug: "base-weep-flashing" },
    { label: "Expressed joint", slug: "expressed-joint-vertical-joint-flashing" },
    { label: "External corner", slug: "external-corner-flashing" },
  ], base: BASE_FLASHINGS },
  { heading: "Joints & Weatherproofing", tabs: [
    { label: "Joint sealant", slug: "joint-sealant-replacement-systems" },
    { label: "Express joint / trim", slug: "express-joint-trim-systems" },
    { label: "Wall wrap / sarking", slug: "vapour-permeable-wall-wrap-sarking" },
  ], base: BASE_JOINTS },
];

const ACTIVE_SLUG = "head-flashing-aluminium";

export default function HeadFlashAlumPage() {
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
              <a href="/repair-systems/facade-external-envelope/cladding" className="hover:text-sky-700 transition">Cladding</a><span>/</span>
              <span className="text-sky-950">Head Flashing — Aluminium</span>
            </nav>
            <PageNav />
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 03 — Facade &amp; External Envelope</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">Head Flashing — Aluminium</h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Technical product reference for extruded and folded aluminium head flashings at facade cladding panel openings — drip-edge, Z-profile, and box gutter head flashings for window heads, door heads, and horizontal panel junctions. Suitable for inland and sheltered exposure zones; not for coastal or marine applications without additional protective coating.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Products listed", value: "4" },
                  { label: "Brands covered", value: "4" },
                  { label: "System type", value: "Aluminium head flashing" },
                  { label: "Standards", value: "AS/NZS 2904" },
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
                    {group.tabs.map((tab) => (
                      <a key={tab.slug} href={`${group.base}/${tab.slug}`}
                        className={`relative shrink-0 border-b-2 px-4 py-3 text-xs font-bold whitespace-nowrap transition ${tab.slug === ACTIVE_SLUG ? "border-red-700 text-sky-950" : "border-transparent text-slate-500 hover:text-sky-900"}`}>
                        {tab.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <section className="px-8 py-14">
          <div className="mx-auto max-w-7xl space-y-10">
            <HeadFlashAlumIntroSection />
            <HeadFlashAlumProductSection />

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-amber-900">Do not confuse aluminium head flashings with:</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Stainless 316 head flashing — required in marine zone exposures where aluminium alone may not provide adequate corrosion resistance; aluminium head flashings are appropriate for inland and general coastal zones, not direct marine spray environments",
                  "Lead flashing — prohibited for most new and remedial facade work in Australia; lead is a hazardous material, not to be confused with grey-coloured aluminium flashings that may look similar in some profiles",
                  "Colorbond head flashing against aluminium cladding — steel-substrate Colorbond in direct contact with aluminium creates a bimetallic corrosion risk; use aluminium head flashing with aluminium cladding systems, or isolate dissimilar metals with a barrier",
                  "Z-flashing used without anti-capillary groove — a plain Z-flashing allows water to track back under capillary action without a drip groove; head flashings must include an anti-capillary drip groove or drip edge to prevent water re-entry into the wall",
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
              <p className="text-xs leading-6 text-amber-900">Information is general only. Flashing profiles and fixing methods must be confirmed by a facade engineer against the specific cladding system design, panel deflection, and wind loading. Aluminium flashings are not suitable for coastal or marine environments without engineer-specified protective coating. Do not rely on this reference as a substitute for professional engineering advice.</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { href: "/repair-systems/facade-external-envelope/cladding", label: "Back to Cladding", title: "Browse all cladding subcategories" },
                { href: `${BASE_FLASHINGS}/head-flashing-stainless`, label: "Head — Stainless", title: "Stainless 316 head flashing for cladding" },
                { href: `${BASE_FLASHINGS}/sill-flashing`, label: "Sill Flashing", title: "Sill flashing for cladding panels" },
                { href: "/ai-scope-builder", label: "AI Scope Builder", title: "Generate a scope of works for cladding remediation" },
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
          <a href="/repair-systems/facade-external-envelope/cladding" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">← Cladding</a>
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
        <div className="mx-auto max-w-7xl border-t border-slate-200 px-5 py-5 text-xs text-slate-400">© 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved.</div>
      </footer>
    </div>
  );
}
