import type { Metadata } from "next";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { CFRPStripsLaminatesIntroSection, CFRPStripsLaminatesProductSection } from "./CFRPStripsLaminatesProductSection";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "CFRP Strips & Laminates — Reinforcement Corrosion — Remedial Building Australia",
  description:
    "Technical product reference for carbon fibre reinforced polymer (CFRP) strips and laminates used in structural strengthening of reinforcement-corroded concrete — Sika CarboDur S, Mapei Mapewrap C Uni-Ax, Fosroc Nitowrap CF — ACI 440.2R design.",
};

const ACTIVE_SLUG = "cfrp-strips-laminates";
const BASE = "/repair-systems/reinforcement-corrosion";

const SIBLING_TABS = [
  { label: "Corrosion inhibitors (MCI)", slug: "corrosion-inhibitors-mci" },
  { label: "Epoxy zinc-rich primers", slug: "epoxy-zinc-rich-primers" },
  { label: "Rebar primers", slug: "rebar-primers-inhibitors" },
  { label: "Cathodic protection", slug: "cathodic-protection" },
  { label: "Repair mortars (PM)", slug: "repair-mortars-polymer-modified" },
  { label: "Reinforcement mesh", slug: "reinforcement-mesh" },
  { label: "Epoxy anchoring adhesives", slug: "epoxy-anchoring-adhesives" },
  { label: "CFRP strips & laminates", slug: "cfrp-strips-laminates" },
  { label: "Epoxy laminating resins", slug: "epoxy-laminating-resins" },
  { label: "Abrasives & tools", slug: "abrasives-blades-tools" },
];

export default function CFRPStripsLaminatesPage() {
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
              <a href={BASE} className="hover:text-sky-700 transition">Reinforcement corrosion</a><span>/</span>
              <span className="text-sky-950">CFRP strips &amp; laminates</span>
            </nav>
            <PageNav />
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — Concrete &amp; Structural Defects</p>
                <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">CFRP strips &amp; laminates</h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">Technical product reference for carbon fibre reinforced polymer (CFRP) strips and laminates used in externally bonded reinforcement (EBR) schemes to restore or upgrade structural capacity of reinforcement-corroded concrete beams, slabs, columns, and walls — design to ACI 440.2R required.</p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "System types", value: "3" },
                  { label: "Max modulus", value: "240 GPa" },
                  { label: "Methods", value: "EB / NSM" },
                  { label: "Standard", value: "ACI 440.2R" },
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
                <div className="px-3 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-red-700 whitespace-nowrap">Reinforcement Corrosion — Product Categories</div>
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
            <CFRPStripsLaminatesIntroSection />
            <CFRPStripsLaminatesProductSection />
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white"><AlertTriangle size={15} /></div>
                <h3 className="text-base font-extrabold text-amber-900">Do not confuse CFRP strips and laminates with:</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "GFRP (glass fibre) wraps — glass fibre fabrics have a significantly lower tensile modulus than carbon fibre and are not equivalent for structural strengthening; do not substitute GFRP for CFRP without structural engineer review of the design",
                  "Epoxy laminating resins (Sikadur-30, Adesilex PG1, Nitowrap EP) — these are the bonding adhesive component of the CFRP system; the CFRP strip or fabric and the laminating resin are separate paired products — both are required and must not be substituted independently",
                  "Repair mortars — polymer-modified repair mortars reinstate concrete cover and section; CFRP provides additional external tensile capacity — they address different structural deficiencies and may both be required in a comprehensive repair",
                  "Reinforcement mesh and bar — internal steel reinforcement and external CFRP are not equivalent — CFRP does not replace corroded internal bar for compression or combined loading without specific engineer design",
                  "Structural epoxy adhesives for joints — Sikadur-31, Sikadur-32, and similar general structural epoxies are not CFRP laminating systems and must not be substituted for the system-specific bonding adhesive",
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
              <p className="text-xs leading-6 text-amber-900">This page provides general technical information only. All CFRP strengthening schemes must be designed by a structural engineer to ACI 440.2R or AS 1640. Substrate pull-off testing, surface preparation, and cure verification are mandatory. Do not rely on this reference as a substitute for professional engineering advice.</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { href: "/repair-systems/concrete-structural-defects", label: "Concrete & Structural Defects", title: "Browse all concrete and structural defect subcategories" },
                { href: BASE, label: "Reinforcement Corrosion", title: "Browse all product categories for reinforcement corrosion repair" },
                { href: `${BASE}/epoxy-laminating-resins`, label: "Epoxy Laminating Resins", title: "Sikadur-30, Adesilex PG1 — bonding adhesives for CFRP systems" },
                { href: `${BASE}/abrasives-blades-tools`, label: "Abrasives & Tools", title: "Angle grinders for CSP 3–4 substrate preparation before CFRP" },
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
          <a href={BASE} className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">← Reinforcement corrosion</a>
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
