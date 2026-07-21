import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { RebarPrimersIntroSection, RebarPrimersProductSection } from "./RebarPrimersProductSection";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Rebar Primers and Corrosion Inhibitors — Concrete Spalling — Remedial Building Australia",
  description:
    "Technical product reference for zinc-rich cementitious primers, epoxy zinc-rich primers, and migrating corrosion inhibitors (MCI) applied to cleaned reinforcement in concrete spalling repair on Australian structures.",
};

const ACTIVE_SLUG = "rebar-primers-inhibitors";
const BASE = "/repair-systems/concrete-spalling";

const SIBLING_TABS = [
  { label: "Repair mortars (PM)", slug: "repair-mortars-polymer-modified" },
  { label: "Cementitious mortars", slug: "cementitious-repair-mortars" },
  { label: "Epoxy mortars", slug: "epoxy-repair-mortars" },
  { label: "Structural grouts", slug: "structural-grouts" },
  { label: "Micro-concrete", slug: "micro-concrete" },
  { label: "High-build mortars", slug: "high-build-repair-mortars" },
  { label: "Fairing & finishing", slug: "fairing-finishing-coats" },
  { label: "Bonding agents & SBR", slug: "bonding-agents-sbr-latex" },
  { label: "Rebar primers", slug: "rebar-primers-inhibitors" },
  { label: "Primers & realkalisation", slug: "concrete-primers-realkalisation" },
  { label: "Repair adhesives", slug: "concrete-repair-adhesives" },
  { label: "Edge forms", slug: "edge-forms-accessories" },
  { label: "Reinforcement mesh", slug: "reinforcement-mesh" },
  { label: "Curing compounds", slug: "curing-compounds" },
  { label: "Curing sheeting", slug: "curing-sheeting" },
  { label: "Form release agents", slug: "form-release-agents" },
  { label: "Cement & aggregates", slug: "cement-aggregates" },
];

export default function RebarPrimersPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header ── */}
      <SiteHeader />

      <main>

        {/* ── Hero ── */}
        <section className="border-b border-slate-200 bg-white px-4 sm:px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <Link href="/" className="hover:text-sky-700 transition">Home</Link>
              <span>/</span>
              <Link href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</Link>
              <span>/</span>
              <Link href="/repair-systems/concrete-structural-defects" className="hover:text-sky-700 transition">Concrete &amp; Structural Defects</Link>
              <span>/</span>
              <a href={BASE} className="hover:text-sky-700 transition">Concrete spalling</a>
              <span>/</span>
              <span className="text-sky-950">Rebar primers &amp; inhibitors</span>
            </nav>
            <PageNav />
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 02 — Concrete &amp; Structural Defects</p>
                <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  Rebar primers and corrosion inhibitors
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Technical product reference for zinc-rich cementitious rebar primers, two-component epoxy zinc-rich primers, and migrating corrosion inhibitors (MCI) applied to cleaned reinforcement after needle scaling in concrete spalling repair. Covers primer type selection by environment, minimum substrate cleanliness, and compatibility with repair mortar systems.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Products covered", value: "4" },
                  { label: "Min. rebar clean", value: "St 2" },
                  { label: "Clean standard", value: "ISO 8501-1" },
                  { label: "Types", value: "Zinc-rich & MCI" },
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

        {/* ── Sibling tabs ── */}
        <div className="border-b border-slate-200 bg-white px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-stretch gap-0 overflow-x-auto">
              <div className="flex shrink-0 flex-col">
                <div className="px-3 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-red-700 whitespace-nowrap">
                  Concrete Spalling — Product Categories
                </div>
                <div className="flex items-end">
                  {SIBLING_TABS.map((tab) => {
                    const active = tab.slug === ACTIVE_SLUG;
                    return (
                      <a
                        key={tab.slug}
                        href={`${BASE}/${tab.slug}`}
                        className={`relative shrink-0 border-b-2 px-4 py-3 text-xs font-bold whitespace-nowrap transition ${
                          active ? "border-red-700 text-sky-950" : "border-transparent text-slate-500 hover:text-sky-900"
                        }`}
                      >
                        {tab.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <section className="px-4 sm:px-8 py-14">
          <div className="mx-auto max-w-7xl space-y-10">

            <RebarPrimersIntroSection />

            <RebarPrimersProductSection />

            {/* Do not confuse warning */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-amber-900">Do not confuse rebar primers and corrosion inhibitors with:</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Bonding agents and SBR latex primers — bonding agents are applied to the concrete substrate to improve mortar adhesion — rebar primers are applied to cleaned steel reinforcement — these are different products applied to different substrates — never apply a bonding agent to rebar or a rebar primer to concrete bond faces",
                  "Surface-applied migrating corrosion inhibitors (applied to hardened concrete surface) — surface-applied MCI treatments such as Sika Ferrogard-903 applied to the outside of existing concrete are a different application from the rebar primer use described on this page — surface-applied MCI is used without chipping and repair to slow active corrosion in adjacent concrete",
                  "Cathodic protection systems (impressed current or sacrificial anode) — galvanic anode systems and impressed current cathodic protection are engineered long-term corrosion management systems, not a substitute for rebar primer in a patch repair — if cathodic protection is specified by the engineer, a separate specialist system is required",
                  "Galvanising — hot-dip galvanising of rebar provides zinc coating before concrete placement and is different from site-applied zinc-rich primers — not interchangeable in a repair application",
                  "Epoxy coating for new rebar — factory-applied epoxy-coated rebar (green bar) is a product for new construction, not a repair primer — do not use epoxy-coated replacement bars in repair without engineering confirmation of bond adequacy in the repair mortar system",
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

        {/* ── Related links ── */}
        <section className="border-t border-slate-200 bg-slate-50 px-4 sm:px-8 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Disclaimer</p>
              <p className="text-xs leading-6 text-amber-900">
                This page provides general technical information only. Final product selection must be confirmed against the current manufacturer technical data sheet, project specification, substrate condition, exposure classification, AS 3600 requirements, and applicator warranty conditions. Do not rely on this reference as a substitute for professional engineering or remedial building consultant advice.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { href: "/repair-systems/concrete-structural-defects", label: "Concrete & Structural Defects", title: "Browse all concrete and structural defect subcategories" },
                { href: BASE, label: "Concrete Spalling", title: "Browse all product categories for concrete spalling repair" },
                { href: `${BASE}/abrasives-blades-tools`, label: "Abrasives & Tools", title: "Needle scalers and cup wheels used to clean rebar before priming" },
                { href: "/ai-scope-builder", label: "AI Scope Builder", title: "Generate a scope of works for concrete spalling remediation" },
              ].map((card) => (
                <a key={card.href} href={card.href} className="group block rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-sky-200 hover:shadow-md">
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">{card.label}</div>
                  <h4 className="text-sm font-extrabold leading-snug text-sky-950">{card.title}</h4>
                  <div className="mt-4 flex items-center gap-1 text-xs font-bold text-sky-700 transition group-hover:text-red-700">
                    Open <ArrowRight size={11} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <SeoCrossPromo />

      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <a href={BASE} className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">
            ← Concrete spalling
          </a>
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
              <Link href="/faq" className="hover:text-sky-700">FAQ</Link>
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
