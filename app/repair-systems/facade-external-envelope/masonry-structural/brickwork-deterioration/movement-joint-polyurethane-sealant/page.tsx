import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Movement Joint Sealant — Polyurethane — Brickwork Deterioration — Remedial Building Australia",
  description:
    "Technical product reference for polyurethane movement joint sealant systems for masonry facade remediation on Australian Class 2 strata buildings — one-part and two-part polyurethane sealants for masonry movement joints and control joints.",
};

const ACTIVE_SLUG = "movement-joint-polyurethane-sealant";
const BASE_PU = "/repair-systems/facade-external-envelope/masonry-structural/brickwork-deterioration/movement-joint-polyurethane-sealant";
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

export default function MovJointPUPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />

      <main>
        <section className="border-b border-slate-200 bg-white px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <a href="/" className="hover:text-sky-700 transition">Home</a><span>/</span>
              <a href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</a><span>/</span>
              <a href="/repair-systems/facade-external-envelope" className="hover:text-sky-700 transition">Facade &amp; External Envelope</a><span>/</span>
              <a href={HUB} className="hover:text-sky-700 transition">Masonry &amp; Structural</a><span>/</span>
              <a href={BASE_BRICKWORK} className="hover:text-sky-700 transition">Brickwork Deterioration</a><span>/</span>
              <span className="text-sky-950">Movement joint sealant</span>
            </nav>
            <PageNav />
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 03 — Facade &amp; External Envelope</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  Movement joint sealant — polyurethane
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Technical product reference for polyurethane movement joint sealant systems for masonry facade remediation on Australian Class 2 strata buildings. Covers one-part moisture-curing and two-part polyurethane sealants for masonry movement joints, control joints and construction joints — designed to accommodate differential thermal and structural movement while maintaining a weather-tight seal. Joint geometry must comply with ISO 11600 and AS 3700.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Sealant types", value: "3" },
                  { label: "Type", value: "Polyurethane" },
                  { label: "Movement", value: "±25–35%" },
                  { label: "Standard", value: "AS 3700" },
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
            <h2 className="mb-2 text-xl font-extrabold text-sky-950">Polyurethane movement joint sealant products</h2>
            <p className="mb-8 max-w-2xl text-sm leading-6 text-slate-600">Select the sealant product below to view supplier references, technical data and procurement sources.</p>
            <div className="grid gap-5 sm:grid-cols-3">
              {[
                {
                  href: `${BASE_PU}/sikaflex-11fc-polyurethane-sealant`,
                  label: "1-part standard",
                  title: "Sikaflex-11FC+",
                  description: "One-part moisture-curing PU — ISO 11600 F 25 LM — ±25% movement — paintable after cure — gun-grade",
                  tag: "Industry standard",
                },
                {
                  href: `${BASE_PU}/mapeflex-pu45-polyurethane-sealant`,
                  label: "2-part high movement",
                  title: "Mapeflex PU45",
                  description: "Two-part PU — ISO 11600 F 35 HM — ±35% movement — mixing required — for wide or highly active joints",
                  tag: "±35% movement",
                },
                {
                  href: `${BASE_PU}/dymonic-fc-high-movement-sealant`,
                  label: "1-part high movement",
                  title: "Dymonic FC",
                  description: "One-part high-movement PU — ISO 11600 F 35 LM — ±35% movement — no mixing — for thermally active facades",
                  tag: "±35% movement",
                },
              ].map((card) => (
                <a key={card.href} href={card.href} className="group block rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-sky-300 hover:shadow-md">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="inline-block rounded-md bg-sky-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-700">{card.label}</span>
                    <span className="inline-block rounded-md bg-red-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-red-700">{card.tag}</span>
                  </div>
                  <h3 className="mb-2 text-sm font-extrabold leading-snug text-sky-950">{card.title}</h3>
                  <p className="mb-4 text-xs leading-5 text-slate-500">{card.description}</p>
                  <div className="flex items-center gap-1 text-xs font-bold text-sky-700 transition group-hover:text-red-700">View product <ArrowRight size={11} /></div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-slate-50 px-8 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Disclaimer</p>
              <p className="text-xs leading-6 text-amber-900">This page provides general technical information only. Movement joint width, depth, spacing and sealant selection must be designed against the project's movement range, substrate type and exposure conditions per AS 3700 and ISO 11600.</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { href: "/repair-systems/facade-external-envelope", label: "Facade & External Envelope", title: "Browse all facade defect subcategories" },
                { href: HUB, label: "Masonry & Structural", title: "Browse all masonry remediation categories" },
                { href: "/defect-library/facade-external-envelope", label: "Defect Library", title: "Movement joint failure and masonry cracking" },
                { href: "/ai-scope-builder", label: "AI Scope Builder", title: "Generate a scope of works for movement joint resealing" },
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
          <a href={HUB} className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">← Masonry &amp; Structural</a>
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
