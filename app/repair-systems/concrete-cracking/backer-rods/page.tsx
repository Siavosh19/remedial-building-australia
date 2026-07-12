import type { Metadata } from "next";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { BackerRodsIntroSection, BackerRodsProductSection } from "./BackerRodsProductSection";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Backer Rods — Concrete Cracking — Remedial Building Australia",
  description:
    "Technical product reference for polyethylene foam backer rods and bond-breaker tape used in concrete joint and crack sealing — closed-cell PE rod, open-cell PE rod, and bond-breaker tape for correct sealant depth control and two-point adhesion geometry in Australia.",
};

const ACTIVE_SLUG = "backer-rods";
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

export default function BackerRodsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />

      <main>
        <section className="border-b border-slate-200 bg-white px-4 sm:px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <a href="/" className="hover:text-sky-700 transition">Home</a><span>/</span>
              <a href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</a><span>/</span>
              <a href="/repair-systems/concrete-structural-defects" className="hover:text-sky-700 transition">Concrete &amp; Structural Defects</a><span>/</span>
              <a href={BASE} className="hover:text-sky-700 transition">Concrete cracking</a><span>/</span>
              <span className="text-sky-950">Backer rods</span>
            </nav>
            <PageNav />
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — Concrete &amp; Structural Defects</p>
                <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">Backer rods</h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">Technical product reference for closed-cell PE backer rods, open-cell PE backer rods, and bond-breaker tape used before sealant application in concrete joints — covers cell type, sealant compatibility, sizing rules, and depth:width ratio control for Australian joint sealing practice.</p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Products covered", value: "3" },
                  { label: "Target depth:width", value: "1:2" },
                  { label: "Rod oversize factor", value: "25–50%" },
                  { label: "PU sealant pairing", value: "Closed-cell only" },
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
                <div className="px-3 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-red-700 whitespace-nowrap">Concrete Cracking — Product Categories</div>
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
            <BackerRodsIntroSection />
            <BackerRodsProductSection />
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white"><AlertTriangle size={15} /></div>
                <h3 className="text-base font-extrabold text-amber-900">Do not confuse backer rods with:</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "The sealant itself — backer rods and bond-breaker tape are accessories installed before sealant application; they do not seal the joint — the PU or silicone sealant is the sealing element; both must be present for a correctly performing joint system",
                  "Compriband / impregnated foam tape — pre-compressed impregnated polyurethane foam tapes (Compriband, ISO-BLOCO) are self-expanding joint fillers applied to the joint face before a frame or panel is installed; they are a complete joint seal themselves, not a depth-control accessory for a gun-applied sealant",
                  "Fibre reinforcement in crack injection — polypropylene or steel fibre added to repair mortars and grouts reinforces the cured mortar matrix against shrinkage cracking; backer rods have no structural function and are not fibre reinforcement products",
                  "Masking tape — masking tape applied to sealant joint edges is used to achieve clean sealant lines; it is removed after tooling and must never be used as a bond breaker at the joint base as the adhesive transfers to the concrete and causes sealant bonding at the base",
                  "Compression seals — neoprene compression seals (used in highway bridge and carpark expansion joints) are preformed rubber profiles compressed into routed slots; they are structural joint seals under vehicle loading and are not substitutable by foam backer rods and sealant in trafficked joints",
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
                { href: BASE, label: "Concrete Cracking", title: "Browse all product categories for concrete cracking repair" },
                { href: `${BASE}/sealants-polyurethane`, label: "PU Sealants", title: "PU, MS-polymer, and silicone sealants for concrete joints and cracks" },
                { href: "/ai-scope-builder", label: "AI Scope Builder", title: "Generate a scope of works for concrete joint sealing" },
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
