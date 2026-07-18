import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { CrackInjectionPortsIntroSection, CrackInjectionPortsProductSection } from "./CrackInjectionPortsProductSection";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Crack Injection Ports — Concrete Cracking — Remedial Building Australia",
  description:
    "Technical product reference for crack injection ports used in concrete crack injection — surface-bonded plastic ports, mechanical hammer-in ports, port adhesive, and crack width measurement tools for PU and epoxy injection systems in Australia.",
};

const ACTIVE_SLUG = "crack-injection-ports";
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

export default function CrackInjectionPortsPage() {
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
              <span className="text-sky-950">Crack injection ports</span>
            </nav>
            <PageNav />
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — Concrete &amp; Structural Defects</p>
                <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">Crack injection ports</h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">Technical product reference for surface-bonded and mechanical injection ports used in concrete crack injection — covers port types, maximum injection pressures, port adhesive systems, and crack measurement tools for PU and epoxy injection in Australian construction.</p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Port types", value: "2 main types" },
                  { label: "Surface port spacing", value: "100–300 mm" },
                  { label: "Surface port max P", value: "0.5 MPa" },
                  { label: "Mechanical port max P", value: "2 MPa" },
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
            <CrackInjectionPortsIntroSection />
            <CrackInjectionPortsProductSection />
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white"><AlertTriangle size={15} /></div>
                <h3 className="text-base font-extrabold text-amber-900">Do not confuse crack injection ports with:</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "The injection resin itself — crack injection ports are the hardware delivery system (the valve and fitting through which resin enters the crack); the PU or epoxy injection resin is the separate reactive chemical product that fills the crack void — both must be specified independently",
                  "Crack width gauges and comparator cards — these are diagnostic and measurement tools used before injection to classify crack width and select resin; they are part of the inspection kit, not the injection system, and do not form part of the port installation",
                  "Epoxy paste for crack stitching bars — fast-setting epoxy adhesive used to grout structural stitching bars (Hilti HIT-RE 500 V3, Ramset Chemset) is injected into drilled cylindrical holes at full diameter; crack port adhesive is a surface paste bonding the port flange over the crack trace — completely different application",
                  "Mechanical expansion anchors and plugs — concrete expansion anchors (Hilti HSA, Dynabolt) are installed into drilled holes for structural load transfer; mechanical injection ports are also drilled and inserted but function as sealed pressure fittings, not load-bearing anchors",
                  "Helifix crack stitching bars — helical stainless steel bars (HeliBar) grouted into saw-cut slots across crack planes provide tensile resistance; they are a structural stitching system, not an injection port, and require a different preparation method (slot cutting, not port drilling)",
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
                { href: `${BASE}/injection-resins-pu-flexible`, label: "PU Flexible Injection", title: "Hydrophilic and flexible PU resins for wet and live cracks" },
                { href: `${BASE}/injection-resins-epoxy-rigid`, label: "Epoxy Rigid Injection", title: "Structural epoxy injection resins for dry dormant cracks" },
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
