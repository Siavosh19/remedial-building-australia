import type { Metadata } from "next";
import Link from "next/link";
import CladdingCategoryFilter from "./CladdingCategoryFilter";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Cladding — Facade & External Envelope — Remedial Building Australia",
  description:
    "Technical repair system reference for cladding defects and remediation in Australian Class 2 strata — fire-rated non-combustible cladding replacement, subframe systems, fixings and anchors, flashings, joint sealants and vapour-permeable wall wrap — 23 product categories.",
};

const PARENT = "/repair-systems/facade-external-envelope";
const BASE_REPLACEMENT = "/repair-systems/facade-external-envelope/cladding/cladding-replacement-fire-rated";
const BASE_SUBFRAME = "/repair-systems/facade-external-envelope/cladding/cladding-subframe-support";
const BASE_FIXINGS = "/repair-systems/facade-external-envelope/cladding/cladding-fixings-anchors";
const BASE_FLASHINGS = "/repair-systems/facade-external-envelope/cladding/cladding-flashings";
const BASE_JOINTS = "/repair-systems/facade-external-envelope/cladding/cladding-joints-weatherproofing";

const GROUPS = [
  {
    heading: "Cladding Replacement — Fire-Rated / Non-Combustible",
    categories: [
      { label: "Solid aluminium sheet — non-combustible", count: 3, href: `${BASE_REPLACEMENT}/solid-aluminium-sheet-non-combustible` },
      { label: "Aluminium composite — FR / A2 core", count: 3, href: `${BASE_REPLACEMENT}/aluminium-composite-fr-a2-core` },
      { label: "Fibre cement compressed sheet", count: 3, href: `${BASE_REPLACEMENT}/fibre-cement-compressed-sheet` },
      { label: "Fibre cement architectural panel", count: 3, href: `${BASE_REPLACEMENT}/fibre-cement-architectural-panel` },
      { label: "Vitreous enamel / porcelain panel", count: 3, href: `${BASE_REPLACEMENT}/vitreous-enamel-porcelain-panel` },
      { label: "High-pressure laminate (HPL) — fire-rated grade", count: 3, href: `${BASE_REPLACEMENT}/high-pressure-laminate-fire-rated` },
      { label: "Terracotta / ceramic facade panel", count: 3, href: `${BASE_REPLACEMENT}/terracotta-ceramic-facade-panel` },
      { label: "Metal profiled / mini-orb / standing-seam cladding", count: 3, href: `${BASE_REPLACEMENT}/metal-profiled-standing-seam-cladding` },
    ],
  },
  {
    heading: "Cladding Subframe & Support",
    categories: [
      { label: "Top-hat / aluminium subframe & rail systems", count: 3, href: `${BASE_SUBFRAME}/top-hat-aluminium-subframe-rail-systems` },
      { label: "Helping-hand / bracket fixing systems", count: 3, href: `${BASE_SUBFRAME}/helping-hand-bracket-fixing-systems` },
    ],
  },
  {
    heading: "Cladding Fixings & Anchors",
    categories: [
      { label: "Cladding fixing and anchor systems — stainless grade 316", count: 3, href: `${BASE_FIXINGS}/cladding-fixing-anchor-systems-stainless-316` },
      { label: "Rivet / concealed-fix systems", count: 3, href: `${BASE_FIXINGS}/rivet-concealed-fix-systems` },
    ],
  },
  {
    heading: "Cladding Flashings",
    categories: [
      { label: "Head flashing — stainless", count: 3, href: `${BASE_FLASHINGS}/head-flashing-stainless` },
      { label: "Head flashing — aluminium", count: 3, href: `${BASE_FLASHINGS}/head-flashing-aluminium` },
      { label: "Head flashing — Colorbond", count: 3, href: `${BASE_FLASHINGS}/head-flashing-colorbond` },
      { label: "Sill flashing", count: 3, href: `${BASE_FLASHINGS}/sill-flashing` },
      { label: "Jamb flashing", count: 3, href: `${BASE_FLASHINGS}/jamb-flashing` },
      { label: "Base / weep flashing", count: 3, href: `${BASE_FLASHINGS}/base-weep-flashing` },
      { label: "Expressed-joint / vertical-joint flashing", count: 3, href: `${BASE_FLASHINGS}/expressed-joint-vertical-joint-flashing` },
      { label: "External corner flashing", count: 3, href: `${BASE_FLASHINGS}/external-corner-flashing` },
    ],
  },
  {
    heading: "Cladding Joints & Weatherproofing",
    categories: [
      { label: "Joint sealant replacement systems", count: 3, href: `${BASE_JOINTS}/joint-sealant-replacement-systems` },
      { label: "Express joint / trim systems", count: 3, href: `${BASE_JOINTS}/express-joint-trim-systems` },
      { label: "Vapour-permeable wall wrap / sarking behind cladding", count: 3, href: `${BASE_JOINTS}/vapour-permeable-wall-wrap-sarking` },
    ],
  },
];

export default function CladdingPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header ── */}
      <SiteHeader />

      <main>

        {/* ── Hero ── */}
        <section className="border-b border-slate-200 bg-white px-4 sm:px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <Link href="/" className="hover:text-sky-700 transition">Home</Link><span>/</span>
              <Link href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</Link><span>/</span>
              <a href={PARENT} className="hover:text-sky-700 transition">Facade &amp; External Envelope</a><span>/</span>
              <span className="text-sky-950">Cladding</span>
            </nav>
            <PageNav />
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 03 — Facade &amp; External Envelope</p>
            <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
              Cladding
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Technical repair system reference for cladding defects and remediation in Australian Class 2 strata — fire-rated non-combustible cladding replacement, subframe and support systems, fixings and anchors, flashings, joint sealants and vapour-permeable wall wrap — select a product category to view system information, brand comparisons and procurement sources.
            </p>
          </div>
        </section>

        <CladdingCategoryFilter groups={GROUPS} />

      </main>

      {/* ── Footer ── */}
      <SeoCrossPromo />

      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <a href={PARENT} className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">← Facade &amp; External Envelope</a>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.</p>
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
