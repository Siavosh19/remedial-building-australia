import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Cavity Flashing — Alcore Composite — Brickwork Deterioration — Remedial Building Australia",
  description:
    "Technical product reference for Alcore composite cavity flashing systems for masonry facade remediation on Australian Class 2 strata buildings — aluminium-core composite flashings for coastal and high-exposure masonry applications.",
};

const ACTIVE_SLUG = "cavity-flashing-alcore";
const BASE_ALCORE = "/repair-systems/facade-external-envelope/masonry-structural/brickwork-deterioration/cavity-flashing-alcore";
const BASE_BRICKWORK = "/repair-systems/facade-external-envelope/masonry-structural/brickwork-deterioration";
const BASE_CRACK = "/repair-systems/facade-external-envelope/masonry-structural/crack-stitching-masonry";
const HUB = "/repair-systems/facade-external-envelope/masonry-structural";

const SIBLING_GROUPS = [
  {
    heading: "Brickwork Deterioration",
    tabs: [
      { label: "Repointing — lime", slug: "repointing-mortar-lime" },
      { label: "Repointing — cement", slug: "repointing-mortar-cement" },
      { label: "Brick replacement", slug: "brick-replacement-matching-systems" },
      { label: "Cavity ties — helical", slug: "remedial-cavity-wall-ties-stainless-helical" },
      { label: "Cavity ties — resin anchor", slug: "remedial-cavity-wall-ties-chemical-resin-anchor" },
      { label: "Cavity ties — mechanical", slug: "remedial-cavity-wall-ties-mechanical-expansion" },
      { label: "Lintel — duplex steel", slug: "lintel-systems-duplex-coated-steel" },
      { label: "Lintel — galvanised", slug: "lintel-systems-galvanised-steel" },
      { label: "Lintel — stainless", slug: "lintel-systems-stainless-steel" },
      { label: "Lintel — concrete", slug: "lintel-systems-concrete" },
      { label: "Cavity flashing — aluminium", slug: "cavity-flashing-aluminium" },
      { label: "Cavity flashing — lead", slug: "cavity-flashing-lead" },
      { label: "Cavity flashing — Alcore", slug: "cavity-flashing-alcore" },
      { label: "Movement joint sealant", slug: "movement-joint-polyurethane-sealant" },
      { label: "Silane water repellent", slug: "penetrating-silane-water-repellent" },
      { label: "Masonry cleaning — acid", slug: "masonry-cleaning-acid-wash" },
      { label: "Masonry cleaning — chemical", slug: "masonry-cleaning-chemical-poultice" },
    ],
    base: BASE_BRICKWORK,
  },
  {
    heading: "Crack Stitching — Masonry",
    tabs: [
      { label: "Helical bars", slug: "helical-bed-joint-reinforcement-bars" },
      { label: "Stainless rod epoxy", slug: "stainless-rod-epoxy-grouted-systems" },
    ],
    base: BASE_CRACK,
  },
];

export default function CavityFlashAlcorePage() {
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
              <a href="/repair-systems/facade-external-envelope" className="hover:text-sky-700 transition">Facade &amp; External Envelope</a><span>/</span>
              <a href={HUB} className="hover:text-sky-700 transition">Masonry &amp; Structural</a><span>/</span>
              <a href={BASE_BRICKWORK} className="hover:text-sky-700 transition">Brickwork Deterioration</a><span>/</span>
              <span className="text-sky-950">Cavity flashing — Alcore</span>
            </nav>
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 03 — Facade &amp; External Envelope</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  Cavity flashing — Alcore composite
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Technical product reference for Alcore (aluminium-core composite) cavity flashing systems for masonry facade remediation on Australian Class 2 strata buildings. Alcore composite flashings combine an aluminium foil core with a polyester or bitumen-modified outer layer — offering the formability of lead with improved chemical resistance, lighter weight and suitability for a wider range of exposure environments including coastal and marine-influenced locations.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Alcore types", value: "3" },
                  { label: "Suppliers", value: "5+" },
                  { label: "System type", value: "Alcore composite" },
                  { label: "Standards", value: "AS 3700" },
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
                    {group.tabs.map((tab) => {
                      const active = tab.slug === ACTIVE_SLUG;
                      return (
                        <a key={tab.slug} href={`${group.base}/${tab.slug}`}
                          className={`relative shrink-0 border-b-2 px-4 py-3 text-xs font-bold whitespace-nowrap transition ${active ? "border-red-700 text-sky-950" : "border-transparent text-slate-500 hover:text-sky-900"}`}>
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

        <section className="px-8 py-14">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-2 text-xl font-extrabold text-sky-950">Alcore composite cavity flashing types</h2>
            <p className="mb-8 max-w-2xl text-sm leading-6 text-slate-600">Select the Alcore flashing type below to compare individual suppliers, technical data, and procurement sources.</p>
            <div className="grid gap-5 sm:grid-cols-3">
              {[
                {
                  href: `${BASE_ALCORE}/alcore-bitumen-aluminium-composite`,
                  label: "Standard",
                  title: "Alcore Bitumen-Aluminium Composite",
                  description: "Standard aluminium foil + bitumen compound laminate — self-healing at minor mechanical damage, lighter than lead, simpler to install than aluminium strip. Standard cavity applications.",
                  suppliers: "Alcore Australia · Bituline",
                  tag: "Self-healing",
                },
                {
                  href: `${BASE_ALCORE}/alcore-polyester-reinforced-composite`,
                  label: "Heavy duty",
                  title: "Alcore Polyester Reinforced Composite",
                  description: "Polyester scrim reinforcement bonded between aluminium and bitumen layers — enhanced puncture resistance and dimensional stability for wide-cavity and parapet applications.",
                  suppliers: "Alcore Australia · Bituline",
                  tag: "Wide cavity",
                },
                {
                  href: `${BASE_ALCORE}/alcore-self-adhesive-with-weep-formers`,
                  label: "Self-adhesive",
                  title: "Alcore Self-Adhesive with Weep Formers",
                  description: "Self-adhesive bitumen-aluminium composite with integral weep former geometry — bonded installation, single step installs flashing and weep provision together.",
                  suppliers: "Alcore Australia · Proofex · Grace GCP",
                  tag: "Integral weep",
                },
              ].map((card) => (
                <a key={card.href} href={card.href} className="group block rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-sky-300 hover:shadow-md">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="inline-block rounded-md bg-sky-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-700">{card.label}</span>
                    <span className="inline-block rounded-md bg-red-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-red-700">{card.tag}</span>
                  </div>
                  <h3 className="mb-2 text-sm font-extrabold leading-snug text-sky-950">{card.title}</h3>
                  <p className="mb-4 text-xs leading-5 text-slate-500">{card.description}</p>
                  <div className="mb-4 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{card.suppliers}</div>
                  <div className="flex items-center gap-1 text-xs font-bold text-sky-700 transition group-hover:text-red-700">View suppliers <ArrowRight size={11} /></div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-slate-50 px-8 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Disclaimer</p>
              <p className="text-xs leading-6 text-amber-900">This page provides general technical information only. Alcore composite cavity flashing type, coastal suitability, lap and weep hole spacing must be confirmed against the project's exposure classification, masonry type and AS 3700 requirements. Confirm product coastal rating with the manufacturer before specification.</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { href: "/repair-systems/facade-external-envelope", label: "Facade & External Envelope", title: "Browse all facade defect subcategories" },
                { href: HUB, label: "Masonry & Structural", title: "Browse all masonry remediation categories" },
                { href: "/defect-library/facade-external-envelope", label: "Defect Library", title: "Cavity water ingress and flashing failure" },
                { href: "/ai-scope-builder", label: "AI Scope Builder", title: "Generate a scope of works for cavity flashing replacement" },
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
          <a href={HUB} className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">← Masonry &amp; Structural</a>
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
