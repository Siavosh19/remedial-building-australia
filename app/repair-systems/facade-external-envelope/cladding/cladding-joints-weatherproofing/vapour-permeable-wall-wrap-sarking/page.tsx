import type { Metadata } from "next";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { WallWrapIntroSection, WallWrapProductSection } from "./WallWrapProductSection";

export const metadata: Metadata = {
  title: "Vapour-Permeable Wall Wrap / Sarking — Cladding — Remedial Building Australia",
  description:
    "Technical product reference for vapour-permeable wall wrap and sarking products for facade cladding systems — house wraps, drainage mats, and breather membranes installed in the cavity behind cladding panels on Class 2 buildings in Australia.",
};

const BASE_REPLACEMENT = "/repair-systems/facade-external-envelope/cladding/cladding-replacement-fire-rated";
const BASE_SUBFRAME = "/repair-systems/facade-external-envelope/cladding/cladding-subframe-support";
const BASE_FIXINGS = "/repair-systems/facade-external-envelope/cladding/cladding-fixings-anchors";
const BASE_FLASHINGS = "/repair-systems/facade-external-envelope/cladding/cladding-flashings";
const BASE_JOINTS = "/repair-systems/facade-external-envelope/cladding/cladding-joints-weatherproofing";

const SIBLING_GROUPS = [
  { heading: "Cladding Replacement — Fire-Rated", tabs: [
    { label: "Solid aluminium", slug: "solid-aluminium-sheet-non-combustible" },
    { label: "ACP — FR/A2 core", slug: "aluminium-composite-fr-a2-core" },
    { label: "Fibre cement sheet", slug: "fibre-cement-compressed-sheet" },
    { label: "Fibre cement panel", slug: "fibre-cement-architectural-panel" },
    { label: "Vitreous enamel", slug: "vitreous-enamel-porcelain-panel" },
    { label: "HPL fire-rated", slug: "high-pressure-laminate-fire-rated" },
    { label: "Terracotta panel", slug: "terracotta-ceramic-facade-panel" },
    { label: "Metal profiled", slug: "metal-profiled-standing-seam-cladding" },
  ], base: BASE_REPLACEMENT },
  { heading: "Subframe & Support", tabs: [
    { label: "Top-hat / rail", slug: "top-hat-aluminium-subframe-rail-systems" },
    { label: "Helping-hand bracket", slug: "helping-hand-bracket-fixing-systems" },
  ], base: BASE_SUBFRAME },
  { heading: "Fixings & Anchors", tabs: [
    { label: "SS 316 fixings", slug: "cladding-fixing-anchor-systems-stainless-316" },
    { label: "Rivet / concealed", slug: "rivet-concealed-fix-systems" },
  ], base: BASE_FIXINGS },
  { heading: "Cladding Flashings", tabs: [
    { label: "Head — stainless", slug: "head-flashing-stainless" },
    { label: "Head — aluminium", slug: "head-flashing-aluminium" },
    { label: "Head — Colorbond", slug: "head-flashing-colorbond" },
    { label: "Sill flashing", slug: "sill-flashing" },
    { label: "Jamb flashing", slug: "jamb-flashing" },
    { label: "Base / weep", slug: "base-weep-flashing" },
    { label: "Expressed joint", slug: "expressed-joint-vertical-joint-flashing" },
    { label: "External corner", slug: "external-corner-flashing" },
  ], base: BASE_FLASHINGS },
  { heading: "Joints & Weatherproofing", tabs: [
    { label: "Joint sealant", slug: "joint-sealant-replacement-systems" },
    { label: "Express joint / trim", slug: "express-joint-trim-systems" },
    { label: "Wall wrap / sarking", slug: "vapour-permeable-wall-wrap-sarking" },
  ], base: BASE_JOINTS },
];

const ACTIVE_SLUG = "vapour-permeable-wall-wrap-sarking";

export default function WallWrapPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8 py-5">
          <a href="/" className="flex shrink-0 items-center gap-3"><div>
            <div className="text-lg font-extrabold tracking-tight text-sky-950">Remedial Building Australia</div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Technical Remedial Building Platform</div>
          </div></a>
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
              <a href="/repair-systems/facade-external-envelope" className="hover:text-sky-700 transition">Facade &amp; External Envelope</a><span>/</span>
              <a href="/repair-systems/facade-external-envelope/cladding" className="hover:text-sky-700 transition">Cladding</a><span>/</span>
              <span className="text-sky-950">Vapour-Permeable Wall Wrap / Sarking</span>
            </nav>
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 03 — Facade &amp; External Envelope</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">Vapour-Permeable Wall Wrap / Sarking</h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Technical product reference for vapour-permeable wall wrap and sarking products installed in the drained cavity behind facade cladding systems — breather membranes, drainage mats, and self-adhesive house wraps that shed water penetrating the outer cladding layer to the drainage cavity while allowing vapour to pass outward. Required under NCC 2022 for most external wall cladding systems.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Products listed", value: "4" },
                  { label: "Brands covered", value: "4" },
                  { label: "System type", value: "Breather / drainage wrap" },
                  { label: "Standards", value: "AS 4200 / NCC 2022" },
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
              {SIBLING_GROUPS.map((group, gi) => (
                <div key={group.heading} className={`flex shrink-0 flex-col${gi > 0 ? " border-l border-slate-200 ml-1 pl-1" : ""}`}>
                  <div className="px-3 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-red-700 whitespace-nowrap">{group.heading}</div>
                  <div className="flex items-end">
                    {group.tabs.map((tab) => (
                      <a key={tab.slug} href={`${group.base}/${tab.slug}`}
                        className={`relative shrink-0 border-b-2 px-4 py-3 text-xs font-bold whitespace-nowrap transition ${tab.slug === ACTIVE_SLUG ? "border-red-700 text-sky-950" : "border-transparent text-slate-500 hover:text-sky-900"}`}>
                        {tab.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <section className="px-8 py-14">
          <div className="mx-auto max-w-7xl space-y-10">
            <WallWrapIntroSection />
            <WallWrapProductSection />

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-amber-900">Do not confuse vapour-permeable wall wrap / sarking with:</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Vapour barrier membrane (non-permeable) — a vapour barrier prevents all moisture vapour from passing through; in a drained-cavity cladding system where inward drying is required, a vapour barrier can trap moisture inside the wall — specify vapour-permeable wall wrap, not vapour barrier, unless the design requires vapour control",
                  "Foil-faced reflective sarking used as wall wrap — standard foil sarking has very low vapour permeance and acts as a vapour barrier, not a breather membrane; in walls where moisture must dry outward, foil sarking on the warm side of insulation is incorrect — verify Sd value before specification",
                  "Polyethylene builder's film — basic PE film has no vapour permeance and no moisture-vapour management function; it acts as a vapour barrier only and is not suitable as a wall wrap in a breathable wall system — not compliant with NCC 2022 requirements for sarking in framed external walls",
                  "Self-adhesive flashing tape — self-adhesive peel-and-stick membrane tape is designed for lapping wall wrap joints, sealing around penetrations, and flashing details; it is not a wall wrap and must not be used as a continuous wall wrapping membrane",
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
        <section className="border-t border-slate-200 bg-slate-50 px-8 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Disclaimer</p>
              <p className="text-xs leading-6 text-amber-900">Information is general only. Wall wrap and sarking selection, installation, lapping, and integration with flashings and cavity drainage must be confirmed by a building envelope engineer. An incorrectly installed or vapour-impermeable wrap can trap moisture in the wall assembly. Do not rely on this reference as a substitute for professional engineering advice.</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { href: "/repair-systems/facade-external-envelope/cladding", label: "Back to Cladding", title: "Browse all cladding subcategories" },
                { href: `${BASE_JOINTS}/joint-sealant-replacement-systems`, label: "Joint Sealant", title: "Joint sealant replacement systems for cladding" },
                { href: `${BASE_FLASHINGS}/base-weep-flashing`, label: "Base / Weep Flashing", title: "Base and weep flashings for cladding drainage" },
                { href: "/ai-scope-builder", label: "AI Scope Builder", title: "Generate a scope of works for cladding remediation" },
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
          <a href="/repair-systems/facade-external-envelope/cladding" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">← Cladding</a>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.</p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
            <a href="/about" className="hover:text-sky-700">About</a><a href="/contact" className="hover:text-sky-700">Contact</a>
            <a href="/terms" className="hover:text-sky-700">Terms</a><a href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</a>
            <a href="/defect-library" className="hover:text-sky-700">Defect Library</a><a href="/repair-systems" className="hover:text-sky-700">Repair Systems</a>
            <a href="/industry-news" className="hover:text-sky-700">News &amp; Insights</a><a href="/directory" className="hover:text-sky-700">Business Directory</a>
          </div>
        </div>
        <div className="mx-auto max-w-7xl border-t border-slate-200 px-5 py-5 text-xs text-slate-400">© 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved.</div>
      </footer>
    </div>
  );
}
