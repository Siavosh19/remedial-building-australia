import type { Metadata } from "next";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { LimeRepointingMortarsIntroSection, LimeRepointingMortarsProductSection } from "./LimeRepointingMortarsProductSection";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Lime Repointing Mortars — Settlement Cracks — Remedial Building Australia",
  description:
    "Technical product reference for natural hydraulic lime and non-hydraulic lime putty mortars for repointing masonry joints after settlement crack repair — NHL 2, NHL 3.5, NHL 5, Parex Limetech, and site-gauged mortars for heritage and pre-1960 brick masonry in Australia.",
};

const ACTIVE_SLUG = "lime-repointing-mortars";
const BASE = "/repair-systems/settlement-cracks";

const SIBLING_TABS = [
  { label: "PU flexible injection", slug: "injection-resins-pu-flexible" },
  { label: "Epoxy rigid injection", slug: "injection-resins-epoxy-rigid" },
  { label: "Crack injection ports", slug: "crack-injection-ports" },
  { label: "Structural anchors", slug: "structural-anchors-dowels" },
  { label: "Repair mortars (PM)", slug: "repair-mortars-polymer-modified" },
  { label: "Lime repointing", slug: "lime-repointing-mortars" },
  { label: "PU sealants", slug: "sealants-polyurethane" },
  { label: "Backer rods", slug: "backer-rods" },
];

export default function LimeRepointingMortarsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />

      <main>
        <section className="border-b border-slate-200 bg-white px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <a href="/" className="hover:text-sky-700 transition">Home</a><span>/</span>
              <a href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</a><span>/</span>
              <a href="/repair-systems/concrete-structural-defects" className="hover:text-sky-700 transition">Concrete &amp; Structural Defects</a><span>/</span>
              <a href={BASE} className="hover:text-sky-700 transition">Settlement cracks</a><span>/</span>
              <span className="text-sky-950">Lime repointing mortars</span>
            </nav>
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — Concrete &amp; Structural Defects</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">Lime repointing mortars</h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">Technical product reference for natural hydraulic lime (NHL 2 / 3.5 / 5), non-hydraulic lime putty, Parex Limetech, and site-gauged mortars for repointing masonry joints after settlement crack repair — the most important rule in heritage brick masonry: mortar must always be weaker and more permeable than the brick.</p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Products covered", value: "4" },
                  { label: "Critical rule", value: "Weaker than brick" },
                  { label: "Min joint rake", value: "15 mm depth" },
                  { label: "Test panel cure", value: "3 weeks" },
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

        <section className="px-8 py-14">
          <div className="mx-auto max-w-7xl space-y-10">
            <LimeRepointingMortarsIntroSection />
            <LimeRepointingMortarsProductSection />
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white"><AlertTriangle size={15} /></div>
                <h3 className="text-base font-extrabold text-amber-900">Do not confuse lime repointing mortars with:</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Polymer-modified cementitious repair mortars (Sika MonoTop, Ardex RA55, Fosroc Renderoc) — these are for concrete elements only and must never be used in pre-1960 brick masonry; they are harder and less permeable than heritage brick and cause face spalling and salt damage",
                  "OPC (ordinary Portland cement) mortar — standard OPC mortar (M3, M4 mixes) is incompatible with pre-1960 brick masonry; OPC mortar is harder than the brick and forces thermal and moisture movement into the brick face rather than the joint, causing accelerating brick face spalling",
                  "Render and base coat render — cementitious render is applied to the full face of masonry walls as a weathering surface; it is not a jointing material and must not be used to fill individual mortar joints in masonry after settlement crack repair",
                  "Structural anchoring adhesives — two-component epoxy anchoring adhesives (Hilti HIT-RE 500, Ramset Chemset) are used for dowel and helical bar installation, not for mortar joint fill; they are hard, rigid, and non-breathable — completely incompatible with lime mortar joint function",
                  "Masking tape applied to joints — masking tape is used to protect adjacent masonry faces from pointing staining and is removed immediately after tooling; it must never be left in the joint as a filler or temporary fill",
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
                { href: BASE, label: "Settlement Cracks", title: "Browse all product categories for settlement crack repair" },
                { href: `${BASE}/structural-anchors-dowels`, label: "Structural Anchors", title: "Helical bar and epoxy dowel stitching for masonry and concrete" },
                { href: `${BASE}/injection-resins-pu-flexible`, label: "PU Flexible Injection", title: "Water-stop injection for active and wet settlement cracks" },
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
          <a href={BASE} className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">← Settlement cracks</a>
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
