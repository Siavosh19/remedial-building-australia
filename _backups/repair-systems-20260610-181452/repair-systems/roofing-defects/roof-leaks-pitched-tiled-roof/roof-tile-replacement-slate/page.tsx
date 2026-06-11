import type { Metadata } from "next";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { RoofTileSlateProductSection, RoofTileSlateIntroSection } from "./RoofTileSlateProductSection";

export const metadata: Metadata = {
  title: "Slate Roof Tile Replacement Systems — Roof Leaks — Remedial Building Australia",
  description:
    "Technical product reference for slate roof tile replacement systems — natural Welsh slate, Spanish slate, and fibre cement slate — for pitched slate roof remediation on Australian Class 2 strata apartment buildings. Includes asbestos cement warning and AS 2050 guidance.",
};

const SIBLING_GROUPS = [
  { heading: "Roof Tiles", tabs: [
    { label: "Terracotta", slug: "roof-tile-replacement-terracotta" },
    { label: "Concrete", slug: "roof-tile-replacement-concrete" },
    { label: "Slate", slug: "roof-tile-replacement-slate" },
  ]},
  { heading: "Ridge & Hip", tabs: [
    { label: "Ridge/hip rebed", slug: "ridge-hip-capping-rebed" },
  ]},
  { heading: "Valley Flashings", tabs: [
    { label: "Valley — alum", slug: "valley-flashing-aluminium" },
    { label: "Valley — copper", slug: "valley-flashing-copper" },
    { label: "Valley — Colorbond", slug: "valley-flashing-colorbond" },
  ]},
  { heading: "Step Flashings", tabs: [
    { label: "Step — Colorbond", slug: "step-counter-flashing-colorbond" },
    { label: "Step — aluminium", slug: "step-counter-flashing-aluminium" },
    { label: "Step — lead", slug: "step-counter-flashing-lead" },
  ]},
  { heading: "Penetrations", tabs: [
    { label: "Flashing collars", slug: "penetration-flashing-collar" },
    { label: "Plinths", slug: "penetration-plinth-systems" },
  ]},
  { heading: "Sarking & Insulation", tabs: [
    { label: "Sarking — foil", slug: "sarking-reflective-foil" },
    { label: "Sarking — PIR", slug: "sarking-pir-under-tile" },
    { label: "Sarking — mineral wool", slug: "sarking-mineral-wool" },
    { label: "Battens", slug: "roof-battens" },
    { label: "Anti-ponding", slug: "anti-ponding-boards" },
    { label: "Insulation R4", slug: "roof-insulation-r4" },
  ]},
];

export default function RoofTileReplacementSlatePage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header ── */}
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

        {/* ── Hero ── */}
        <section className="border-b border-slate-200 bg-white px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <a href="/" className="hover:text-sky-700 transition">Home</a>
              <span>/</span>
              <a href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</a>
              <span>/</span>
              <a href="/repair-systems/roofing-defects" className="hover:text-sky-700 transition">Roofing Defects</a>
              <span>/</span>
              <a href="/repair-systems/roofing-defects/roof-leaks-pitched-tiled-roof" className="hover:text-sky-700 transition">Roof Leaks — Pitched Tiled Roof</a>
              <span>/</span>
              <span className="text-sky-950">Slate roof tile replacement systems</span>
            </nav>
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 04</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  Slate roof tile replacement systems
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Technical product reference for natural and fibre cement slate roof tile replacement systems. Covers Welsh and Spanish natural slate, fibre cement slate alternatives, AS 2050 compliance, asbestos cement hazard identification, and specialist contractor requirements for Class 2 strata pitched slate roof remediation.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Products listed", value: "3" },
                  { label: "Brands covered", value: "3" },
                  { label: "Tile type", value: "Natural / fibre cement" },
                  { label: "Standard", value: "AS 2050" },
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
              {SIBLING_GROUPS.map((group, gi) => (
                <div
                  key={group.heading}
                  className={`flex shrink-0 flex-col${gi > 0 ? " border-l border-slate-200 ml-1 pl-1" : ""}`}
                >
                  <div className="px-3 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-red-700 whitespace-nowrap">
                    {group.heading}
                  </div>
                  <div className="flex items-end">
                    {group.tabs.map((tab) => {
                      const active = tab.slug === "roof-tile-replacement-slate";
                      return (
                        <a
                          key={tab.slug}
                          href={`/repair-systems/roofing-defects/roof-leaks-pitched-tiled-roof/${tab.slug}`}
                          className={`relative shrink-0 border-b-2 px-4 py-3 text-xs font-bold whitespace-nowrap transition ${
                            active
                              ? "border-red-700 text-sky-950"
                              : "border-transparent text-slate-500 hover:text-sky-900"
                          }`}
                        >
                          {tab.label}
                        </a>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <section className="px-8 py-14">
          <div className="mx-auto max-w-7xl space-y-10">

            <RoofTileSlateIntroSection />

            <RoofTileSlateProductSection />

            {/* Do not confuse warning */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-amber-900">Do not confuse slate tiles with — and critical hazard warning:</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "ASBESTOS CEMENT SLATES — Asbestos cement (AC) roofing slates were widely installed in Australia before the late 1980s and visually resemble fibre cement slate. They must NOT be disturbed, cut, or removed without a SafeWork-compliant asbestos management plan and a licensed asbestos removalist. If you are uncertain whether existing slates on a building are natural slate, fibre cement, or asbestos cement — stop work and have a sample tested by a NATA-accredited laboratory before proceeding.",
                  "Concrete roof tiles (Monier Horizon, Trimline, Boral range and similar) — a different product category — listed on the concrete roof tile replacement page",
                  "Terracotta (clay) roof tiles (Monier Marseille, Elabana, Boral Montrose and similar) — a different product category — listed on the terracotta roof tile replacement page",
                  "Fibre cement corrugated roofing sheets (such as Super Six and similar) — a different profile and product category — not a slate roofing product",
                ].map((item, i) => (
                  <li key={i} className={`flex items-start gap-3 text-sm leading-6 ${i === 0 ? "font-semibold text-red-900" : "text-amber-900"}`}>
                    <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${i === 0 ? "bg-red-600" : "bg-amber-600"}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </section>

        {/* ── Disclaimer + related links ── */}
        <section className="border-t border-slate-200 bg-slate-50 px-8 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Disclaimer</p>
              <p className="text-xs leading-6 text-amber-900">
                Confirm existing slates are not asbestos cement before any disturbance or replacement. Natural slate requires a specialist roofing contractor — do not use a general tile or metal roofing contractor for natural slate work. Confirm sizing, thickness, lap, batten gauge, and fixing method against the existing installation before ordering. Do not rely on this reference as a substitute for a licensed roofing contractor's assessment.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  href: "/repair-systems/roofing-defects/roof-leaks-pitched-tiled-roof",
                  label: "Back to Roof Leaks",
                  title: "Browse all product categories for Roof Leaks — Pitched Tiled Roof",
                },
                {
                  href: "/repair-systems/roofing-defects",
                  label: "Back to Roofing Defects",
                  title: "Browse all roofing defect subcategories",
                },
                {
                  href: "/defect-library",
                  label: "Defect Library",
                  title: "Roofing defects — causes, inspection, methodology",
                },
                {
                  href: "/ai-scope-builder",
                  label: "AI Scope Builder",
                  title: "Generate a scope of works for pitched slate roof remediation",
                },
              ].map((card) => (
                <a
                  key={card.href}
                  href={card.href}
                  className="group block rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-sky-200 hover:shadow-md"
                >
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
      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <a href="/repair-systems/roofing-defects/roof-leaks-pitched-tiled-roof" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">
            ← Roof Leaks — Pitched Tiled Roof
          </a>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">
              A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.
            </p>
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
