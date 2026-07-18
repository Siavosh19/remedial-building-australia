import type { Metadata } from "next";
import Link from "next/link";
import WindowsCategoryFilter from "./WindowsCategoryFilter";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Windows, Doors & Penetrations — Facade & External Envelope — Remedial Building Australia",
  description:
    "Technical repair system reference for window, door and penetration failures in Australian Class 2 strata — perimeter sealants, head flashings, storm angles, subsill drainage, balcony door hob systems and waterproofing terminations — 12 product categories.",
};

const PARENT = "/repair-systems/facade-external-envelope";
const BASE_PERIMETER = "/repair-systems/facade-external-envelope/windows-doors-penetrations/window-door-perimeter-failure";
const BASE_HOB = "/repair-systems/facade-external-envelope/windows-doors-penetrations/balcony-door-hob";

const GROUPS = [
  {
    heading: "Window and Door Perimeter Failure",
    categories: [
      { label: "Perimeter sealant — neutral cure silicone", count: 3, href: `${BASE_PERIMETER}/perimeter-sealant-neutral-cure-silicone` },
      { label: "Perimeter sealant — polyurethane", count: 3, href: `${BASE_PERIMETER}/perimeter-sealant-polyurethane` },
      { label: "Epoxy wood filler and timber hardener systems", count: 3, href: `${BASE_PERIMETER}/epoxy-wood-filler-timber-hardener-systems` },
      { label: "Head flashing — stainless", count: 3, href: `${BASE_PERIMETER}/head-flashing-stainless` },
      { label: "Head flashing — Colorbond", count: 3, href: `${BASE_PERIMETER}/head-flashing-colorbond` },
      { label: "Storm angle — aluminium", count: 3, href: `${BASE_PERIMETER}/storm-angle-aluminium` },
      { label: "Storm angle — stainless", count: 3, href: `${BASE_PERIMETER}/storm-angle-stainless` },
      { label: "Subsill drainage systems", count: 3, href: `${BASE_PERIMETER}/subsill-drainage-systems` },
    ],
  },
  {
    heading: "Balcony Door Hob",
    categories: [
      { label: "Quick-set / rapid-set high-strength concrete (cast in-situ hob)", count: 3, href: `${BASE_HOB}/quick-set-rapid-set-high-strength-concrete` },
      { label: "Pre-formed / threshold upstand systems", count: 3, href: `${BASE_HOB}/pre-formed-threshold-upstand-systems` },
      { label: "Waterproofing termination — liquid-applied membrane turn-up", count: 3, href: `${BASE_HOB}/waterproofing-termination-liquid-applied-membrane` },
      { label: "Waterproofing termination — metal angle / flashing", count: 3, href: `${BASE_HOB}/waterproofing-termination-metal-angle-flashing` },
    ],
  },
];

export default function WindowsDoorsPage() {
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
              <span className="text-sky-950">Windows, Doors &amp; Penetrations</span>
            </nav>
            <PageNav />
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 03 — Facade &amp; External Envelope</p>
            <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
              Windows, Doors &amp; Penetrations
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Technical repair system reference for window, door and penetration failures in Australian Class 2 strata — perimeter sealants, head flashings, storm angles, subsill drainage systems, balcony door hob repair and waterproofing termination systems — select a product category to view system information, brand comparisons and procurement sources.
            </p>
          </div>
        </section>

        <WindowsCategoryFilter groups={GROUPS} />

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
