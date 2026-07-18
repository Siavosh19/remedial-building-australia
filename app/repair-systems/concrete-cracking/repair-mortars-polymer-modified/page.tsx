import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { RepairMortarsPMIntroSection, RepairMortarsPMProductSection } from "./RepairMortarsPMProductSection";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Polymer-Modified Repair Mortars — Concrete Cracking — Remedial Building Australia",
  description:
    "Technical product reference for polymer-modified cementitious repair mortars for concrete crack filling and patch repair after settlement — Sika SikaTop-121, Ardex RA55, Fosroc Renderoc HS, and Mapei Mapegrout Fast-Set for concrete elements in Australia. Not for heritage brick masonry.",
};

const ACTIVE_SLUG = "repair-mortars-polymer-modified";
const BASE = "/repair-systems/concrete-cracking";

const SIBLING_TABS = [
  { label: "PU injection", slug: "injection-resins-pu-flexible" },
  { label: "Epoxy injection", slug: "injection-resins-epoxy-rigid" },
  { label: "Injection ports", slug: "crack-injection-ports" },
  { label: "PU sealants", slug: "sealants-polyurethane" },
  { label: "Backer rods", slug: "backer-rods" },
  { label: "Epoxy anchoring", slug: "epoxy-anchoring-adhesives" },
  { label: "Anchors & dowels", slug: "structural-anchors-dowels" },
  { label: "Crack stitching", slug: "crack-stitching" },
  { label: "CFRP strips", slug: "cfrp-strips-laminates" },
  { label: "Repair mortars (PM)", slug: "repair-mortars-polymer-modified" },
  { label: "Abrasives & tools", slug: "abrasives-blades-tools" },
];

export default function RepairMortarsPMPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />

      <main>
        <section className="border-b border-slate-200 bg-white px-4 sm:px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <Link href="/" className="hover:text-sky-700 transition">Home</Link><span>/</span>
              <Link href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</Link><span>/</span>
              <Link href="/repair-systems/concrete-structural-defects" className="hover:text-sky-700 transition">Concrete &amp; Structural Defects</Link><span>/</span>
              <a href={BASE} className="hover:text-sky-700 transition">Concrete cracking</a><span>/</span>
              <span className="text-sky-950">Repair mortars (PM)</span>
            </nav>
            <PageNav />
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — Concrete &amp; Structural Defects</p>
                <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">Polymer-modified repair mortars</h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">Technical product reference for polymer-modified cementitious repair mortars for filling crack gaps and patching spalled surfaces in concrete elements after settlement crack repair — concrete and concrete block substrates only; not for heritage brick or stone masonry.</p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Products covered", value: "4" },
                  { label: "Substrate", value: "Concrete only" },
                  { label: "Strength", value: "> 30 MPa" },
                  { label: "Sequence", value: "Post-stitch fill" },
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
              <div className="flex shrink-0 flex-col">
                <div className="px-3 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-red-700 whitespace-nowrap">Settlement Cracks — Product Categories</div>
                <div className="flex items-end">
                  {SIBLING_TABS.map((tab) => {
                    const active = tab.slug === ACTIVE_SLUG;
                    return (
                      <a key={tab.slug} href={`${BASE}/${tab.slug}`} className={`relative shrink-0 border-b-2 px-4 py-3 text-xs font-bold whitespace-nowrap transition ${active ? "border-red-700 text-sky-950" : "border-transparent text-slate-500 hover:text-sky-900"}`}>{tab.label}</a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="px-4 sm:px-8 py-14">
          <div className="mx-auto max-w-7xl space-y-10">
            <RepairMortarsPMIntroSection />
            <RepairMortarsPMProductSection />
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white"><AlertTriangle size={15} /></div>
                <h3 className="text-base font-extrabold text-amber-900">Do not confuse PM repair mortars with:</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Lime repointing mortars (NHL, lime putty) — lime-based mortars are for masonry joint reinstatement in brick, stone, and heritage masonry; PM cementitious mortars and lime mortars are for completely different substrates and must never be substituted for each other; PM mortar in heritage brick causes brick face spalling",
                  "Epoxy injection resins — low-viscosity epoxy resins are injected under pressure into fine cracks; PM mortars are trowel-applied surface fills for visible crack gaps and spalled areas; they serve different functions in the same repair sequence",
                  "Non-shrink cementitious grout (Sika Grout-215, Conbextra GP) — non-shrink grouts are flowable, poured materials used for equipment baseplate bedding, void filling under footings, and anchor grouting; they are not trowel-applied patch materials and are not suitable for vertical crack fill applications",
                  "Epoxy repair mortars (Sikadur 31, Sikadur 41) — epoxy aggregate mortars are aggregate-filled two-component epoxy materials for high-stress chemical-resistant patches; they are significantly more expensive than PM mortars and are specified where epoxy chemical resistance is required; most settlement crack fill applications do not require epoxy mortars",
                  "Render (Rockcote, BGC) — cementitious render is applied to the full surface of a masonry or concrete wall; it is not used to fill individual settlement cracks or spalled spots in isolation; render is a surface coating treatment, not a crack fill mortar",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-6 text-amber-900">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />{item}
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
              <p className="text-xs leading-6 text-amber-900">This page provides general technical information only. Final product selection must be confirmed against the current manufacturer TDS, project specification, substrate condition, and applicable standards. Do not rely on this reference as a substitute for professional engineering advice.</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { href: "/repair-systems/concrete-structural-defects", label: "Concrete & Structural Defects", title: "Browse all concrete and structural defect subcategories" },
                { href: BASE, label: "Settlement Cracks", title: "Browse all product categories for settlement crack repair" },
                { href: `${BASE}/structural-anchors-dowels`, label: "Structural Anchors", title: "Structural stitching — completed before mortar crack fill" },
                { href: `${BASE}/lime-repointing-mortars`, label: "Lime Repointing", title: "Lime mortars for masonry — not for concrete elements" },
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
          <a href={BASE} className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">← Concrete cracking</a>
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
