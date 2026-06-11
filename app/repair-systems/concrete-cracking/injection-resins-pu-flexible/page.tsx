import type { Metadata } from "next";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { InjectionResinsPUFlexibleIntroSection, InjectionResinsPUFlexibleProductSection } from "./InjectionResinsPUFlexibleProductSection";

export const metadata: Metadata = {
  title: "PU Flexible Injection Resins — Concrete Cracking — Remedial Building Australia",
  description:
    "Technical product reference for polyurethane flexible injection resins used to seal wet and live cracks in concrete — Sika Injection-107, Fosroc Nitoflex PU, Mapei Mapeject PU series, and generic hydrophilic/hydrophobic PU resins for Australian structural repair.",
};

const ACTIVE_SLUG = "injection-resins-pu-flexible";
const BASE = "/repair-systems/concrete-cracking";

const SIBLING_TABS = [
  { label: "PU flexible injection", slug: "injection-resins-pu-flexible" },
  { label: "Epoxy rigid injection", slug: "injection-resins-epoxy-rigid" },
  { label: "Crack injection ports", slug: "crack-injection-ports" },
  { label: "Epoxy anchoring adhesives", slug: "epoxy-anchoring-adhesives" },
  { label: "PU sealants", slug: "sealants-polyurethane" },
  { label: "Backer rods", slug: "backer-rods" },
  { label: "Abrasives & tools", slug: "abrasives-blades-tools" },
];

export default function InjectionResinsPUFlexiblePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8 py-5">
          <a href="/" className="flex shrink-0 items-center gap-3">
            <div>
              <div className="text-lg font-extrabold tracking-tight text-sky-950">Remedial Building Australia</div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Technical Remedial Building Platform</div>
            </div>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-sky-800 md:flex">
            <a href="/" className="whitespace-nowrap hover:text-red-700 transition">Home</a>
            <a href="/repair-systems" className="whitespace-nowrap text-sky-950 underline underline-offset-4 decoration-red-700">Repair Systems</a>
            <a href="/industry-news" className="whitespace-nowrap hover:text-red-700 transition">News &amp; Insights</a>
            <a href="/directory" className="whitespace-nowrap hover:text-red-700 transition">Directory</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700 transition">AI Scope Builder</a>
          </nav>
          <a href="/directory/login" className="hidden shrink-0 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800 transition md:inline-flex">Login / Create Account</a>
        </div>
      </header>

      <main>
        <section className="border-b border-slate-200 bg-white px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <a href="/" className="hover:text-sky-700 transition">Home</a><span>/</span>
              <a href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</a><span>/</span>
              <a href="/repair-systems/concrete-structural-defects" className="hover:text-sky-700 transition">Concrete &amp; Structural Defects</a><span>/</span>
              <a href={BASE} className="hover:text-sky-700 transition">Concrete cracking</a><span>/</span>
              <span className="text-sky-950">PU flexible injection</span>
            </nav>
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — Concrete &amp; Structural Defects</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">PU flexible injection resins</h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">Technical product reference for polyurethane flexible injection resins used to seal wet and live cracks in concrete — covers hydrophilic and hydrophobic PU resins, foaming vs non-foaming types, and system selection criteria for Australian structural repair.</p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Products covered", value: "4" },
                  { label: "Use case", value: "Wet / live cracks" },
                  { label: "Max expansion", value: "30× (hydrophilic)" },
                  { label: "Structural?", value: "No — sealing only" },
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

        <section className="px-8 py-14">
          <div className="mx-auto max-w-7xl space-y-10">
            <InjectionResinsPUFlexibleIntroSection />
            <InjectionResinsPUFlexibleProductSection />
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white"><AlertTriangle size={15} /></div>
                <h3 className="text-base font-extrabold text-amber-900">Do not confuse PU flexible injection resins with:</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Epoxy rigid injection resins — epoxy resins (Sika Injection-451, Fosroc Concresive 1414) restore structural capacity by fusing crack faces into a bond stronger than the concrete; PU flexible resins seal cracks against water ingress only and have no structural function",
                  "PU joint sealants — surface-applied PU sealants (Sikaflex-11FC, Fosroc Nitoseal MS300) are applied as a bead over a backer rod in routed joints at the concrete surface; PU injection resins are pumped under pressure through ports deep into the crack trace",
                  "Cementitious crystalline waterproofing — products such as Xypex and Vandex penetrate the concrete matrix and block capillary pores; PU injection resins seal crack voids by physical filling and flexible bonding — different mechanism and application method",
                  "Cementitious grout injection — Portland cement or neat cement grout injection is used for ground anchors and rock mass stabilisation; PU injection resins are specified for tight cracks in concrete elements, not void grouting",
                  "PU injection pump equipment — pressure injection equipment (packers, pumps, hoses) is the delivery hardware; the injection resin is the reactive chemical product — equipment and resin are specified separately",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-6 text-amber-900">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />{item}
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
              <p className="text-xs leading-6 text-amber-900">This page provides general technical information only. Final product selection must be confirmed against the current manufacturer TDS, project specification, substrate condition, and applicable standards. Do not rely on this reference as a substitute for professional engineering advice.</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { href: "/repair-systems/concrete-structural-defects", label: "Concrete & Structural Defects", title: "Browse all concrete and structural defect subcategories" },
                { href: BASE, label: "Concrete Cracking", title: "Browse all product categories for concrete cracking repair" },
                { href: `${BASE}/injection-resins-epoxy-rigid`, label: "Epoxy Rigid Injection", title: "Structural epoxy injection resins for dry dormant cracks" },
                { href: "/ai-scope-builder", label: "AI Scope Builder", title: "Generate a scope of works for concrete crack remediation" },
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
          <a href={BASE} className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">← Concrete cracking</a>
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
