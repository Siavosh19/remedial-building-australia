import type { Metadata } from "next";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { EpoxyAnchoringAdhesivesIntroSection, EpoxyAnchoringAdhesivesProductSection } from "./EpoxyAnchoringAdhesivesProductSection";

export const metadata: Metadata = {
  title: "Epoxy Anchoring Adhesives — Reinforcement Corrosion — Remedial Building Australia",
  description:
    "Technical product reference for epoxy and vinylester chemical anchoring adhesives used in reinforcement corrosion repair — Hilti HIT-RE 500 V3, Sika AnchorFix-3+, Ramset Chemset Epoxy 500+, Mapei Mapefox EW — AS 5216 compliant.",
};

const ACTIVE_SLUG = "epoxy-anchoring-adhesives";
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

export default function EpoxyAnchoringAdhesivesPage() {
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
            <a href="/industry-news" className="whitespace-nowrap hover:text-red-700 transition">Industry News</a>
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
              <a href={BASE} className="hover:text-sky-700 transition">Reinforcement corrosion</a><span>/</span>
              <span className="text-sky-950">Epoxy anchoring adhesives</span>
            </nav>
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — Concrete &amp; Structural Defects</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">Epoxy anchoring adhesives</h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">Technical product reference for injectable epoxy anchoring adhesives used to dowel new reinforcement and threaded rod into existing concrete in reinforcement corrosion repair — Hilti HIT-RE 500 V3, Sika AnchorFix-3+, Ramset Chemset Epoxy 500+, and Mapei Mapefox EW — AS 5216 compliant.</p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Products covered", value: "4" },
                  { label: "Compliance", value: "AS 5216" },
                  { label: "Chemistry", value: "Epoxy / Acrylate" },
                  { label: "Design tool", value: "PROFIS Anchor" },
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

        <section className="px-8 py-14">
          <div className="mx-auto max-w-7xl space-y-10">
            <EpoxyAnchoringAdhesivesIntroSection />
            <EpoxyAnchoringAdhesivesProductSection />
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white"><AlertTriangle size={15} /></div>
                <h3 className="text-base font-extrabold text-amber-900">Do not confuse epoxy anchoring adhesives with:</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Mechanical anchors (expansion anchors, undercut anchors) — torque-set or undercut mechanical anchors work differently to chemical anchors; they are not tested or approved for rebar dowelling in reinforcement corrosion repair — use chemical anchors where the structural engineer specifies chemical bond",
                  "Epoxy laminating resins (Sikadur-30, Adesilex PG1) — these are CFRP bonding adhesives applied to the concrete surface; they are not injection adhesives and must not be used as anchoring adhesives in drilled holes",
                  "Rebar primers (SikaTop Armatec, Fosroc Nitoprime Zincrich) — rebar primers are applied to the cleaned rebar surface for corrosion protection; they are a different product from the anchoring adhesive and do not provide structural anchorage",
                  "General construction adhesive — silicone, polyurethane construction adhesives, and general-purpose epoxy are not AS 5216 compliant anchoring systems and must not be used for structural rebar dowelling",
                  "Bonding agents (SBR latex, acrylic bonding agents) — bonding agents are applied to the substrate to improve adhesion between old and new concrete; they are not anchoring adhesives and must not be used for rebar dowelling into drilled holes",
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
              <p className="text-xs leading-6 text-amber-900">This page provides general technical information only. All structural anchor design must be confirmed by a structural engineer against AS 5216 and the current manufacturer TDS. Hole diameter, embedment depth, edge distance, and spacing are design inputs — do not estimate. Do not rely on this reference as a substitute for professional engineering advice.</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { href: "/repair-systems/concrete-structural-defects", label: "Concrete & Structural Defects", title: "Browse all concrete and structural defect subcategories" },
                { href: BASE, label: "Reinforcement Corrosion", title: "Browse all product categories for reinforcement corrosion repair" },
                { href: `${BASE}/reinforcement-mesh`, label: "Reinforcement Mesh", title: "Mesh and bar anchored with epoxy adhesives in corrosion repair" },
                { href: `${BASE}/repair-mortars-polymer-modified`, label: "Repair Mortars (PM)", title: "Repair mortars placed around anchored reinforcement" },
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
          <a href={BASE} className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">← Reinforcement corrosion</a>
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
            <a href="/industry-news" className="hover:text-sky-700">Industry News</a>
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
