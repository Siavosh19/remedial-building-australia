import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { UVResistantEnamelMetalIntroSection, UVResistantEnamelMetalProductSection } from "./UVResistantEnamelMetalProductSection";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "UV-Resistant Enamel Systems — Metal — External Coating — Remedial Building Australia",
  description:
    "Technical product reference for UV-resistant enamel and epoxy topcoat systems for metal facade elements — Dulux Metalshield, Wattyl Killrust and Rust-Oleum enamel systems for balustrades, lintels and metal cladding.",
};

const SIBLING_GROUPS = [
  { heading: "Primers & Preparation", tabs: [{ label: "Alkali primer", slug: "alkali-resistant-primer-systems" }, { label: "Rust primer", slug: "rust-inhibiting-primer-systems" }, { label: "Consolidant", slug: "penetrating-consolidant-systems" }, { label: "Biocide prep", slug: "biocide-surface-preparation-systems" }]},
  { heading: "Topcoat Systems", tabs: [{ label: "Acrylic 2-coat", slug: "exterior-acrylic-coating-systems" }, { label: "Elastomeric", slug: "elastomeric-coating-systems" }, { label: "Crack-bridging", slug: "elastomeric-crack-bridging-coating" }, { label: "Metal enamel", slug: "uv-resistant-enamel-metal" }, { label: "Timber enamel", slug: "exterior-enamel-timber" }]},
  { heading: "Water Repellents", tabs: [{ label: "Silane/siloxane", slug: "penetrating-silane-siloxane" }, { label: "PVDF recoating", slug: "cladding-metal-panel-recoating-pvdf" }]},
];

const ACTIVE_SLUG = "uv-resistant-enamel-metal";
const BASE_URL = "/repair-systems/facade-external-envelope/external-coating-paint-deterioration";

export default function UVResistantEnamelMetalPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main>
        <section className="border-b border-slate-200 bg-white px-4 sm:px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <Link href="/" className="hover:text-sky-700 transition">Home</Link><span>/</span>
              <Link href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</Link><span>/</span>
              <Link href="/repair-systems/facade-external-envelope" className="hover:text-sky-700 transition">Facade &amp; External Envelope</Link><span>/</span>
              <a href={BASE_URL} className="hover:text-sky-700 transition">External Coating &amp; Paint Deterioration</a><span>/</span>
              <span className="text-sky-950">UV-resistant enamel — metal</span>
            </nav>
            <PageNav />
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 03 — Facade &amp; External Envelope</p>
                <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">UV-resistant enamel systems — metal</h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">UV-resistant enamel topcoats are specified for ferrous and non-ferrous metal facade elements — balustrades, lintels, window frames, louvres and metal cladding — where a durable, gloss or semi-gloss corrosion-resistant finish is required. Applied over an appropriate rust-inhibiting primer, they provide a hard film with good UV stability and colour retention in exterior exposure conditions.</p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[{ label: "System", value: "2-pack epoxy/acrylic" }, { label: "DFT", value: "40–60µm" }, { label: "Gloss", value: "Semi or full gloss" }, { label: "Substrate", value: "Metal" }].map((s) => (
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
                    {group.tabs.map((tab) => { const active = tab.slug === ACTIVE_SLUG; return (<a key={tab.slug} href={`${BASE_URL}/${tab.slug}`} className={`relative shrink-0 border-b-2 px-4 py-3 text-xs font-bold whitespace-nowrap transition ${active ? "border-red-700 text-sky-950" : "border-transparent text-slate-500 hover:text-sky-900"}`}>{tab.label}</a>); })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <section className="px-4 sm:px-8 py-14"><div className="mx-auto max-w-7xl space-y-10"><UVResistantEnamelMetalIntroSection /><UVResistantEnamelMetalProductSection />

            {/* Do not confuse warning */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-amber-900">Do not confuse UV-resistant enamel systems for metal with:</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Rust-inhibiting zinc primers — zinc phosphate and zinc-rich primers are the first coat applied to bare metal before enamel topcoat; the enamel topcoat alone over bare metal provides no corrosion protection — always apply primer first",
                  "Exterior enamel systems for timber — timber enamels are formulated with greater flexibility to accommodate wood movement and swelling; applying a rigid metal enamel to timber joints and window frames can cause cracking and premature adhesion failure",
                  "PVDF and fluoropolymer cladding systems — PVDF (Kynar 500) is a factory-applied fluoropolymer for aluminium curtain wall and ACP panels achieving AAMA 2605; site-applied or standard metal enamels are not equivalent and will not achieve 20-year weathering performance on cladding panels",
                  "2-pack epoxy topcoats — 2-pack epoxy provides excellent adhesion and chemical resistance but is not UV stable outdoors; it yellows and chalks rapidly in exterior exposure — use for internal or below-ground metalwork only, not exterior facade elements",
                  "Acrylic masonry paint on metal — standard exterior acrylic wall paints are not formulated for metal substrates; they lack the adhesion, hardness and corrosion resistance of metal enamels and will fail prematurely over bare or primed metal",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-6 text-amber-900">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div></section>
        <section className="border-t border-slate-200 bg-slate-50 px-4 sm:px-8 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5"><p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Disclaimer</p><p className="text-xs leading-6 text-amber-900">General technical information only. Enamel topcoat performance is entirely dependent on surface preparation and primer — metal must be prepared to the required cleanliness grade before priming. Confirm topcoat compatibility with primer and recoat interval from the current manufacturer TDS. Not a substitute for professional advice.</p></div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[{ href: `${BASE_URL}/rust-inhibiting-primer-systems`, label: "External Coating", title: "Rust-inhibiting primer systems" }, { href: `${BASE_URL}/exterior-enamel-timber`, label: "External Coating", title: "Exterior enamel — timber" }, { href: `${BASE_URL}/cladding-metal-panel-recoating-pvdf`, label: "External Coating", title: "Cladding metal panel PVDF recoating" }, { href: `${BASE_URL}/exterior-acrylic-coating-systems`, label: "External Coating", title: "Exterior acrylic coating systems" }, { href: BASE_URL, label: "Back to defect", title: "External Coating & Paint Deterioration" }].map((card) => (
                <a key={card.href} href={card.href} className="group block rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-sky-200 hover:shadow-md"><div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">{card.label}</div><h4 className="text-sm font-extrabold leading-snug text-sky-950">{card.title}</h4><div className="mt-4 flex items-center gap-1 text-xs font-bold text-sky-700 transition group-hover:text-red-700">Open <ArrowRight size={11} /></div></a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SeoCrossPromo />

      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10"><a href={BASE_URL} className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">← External Coating &amp; Paint Deterioration</a></div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]"><div><div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div><p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.</p></div><div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
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
          </div></div>
        <div className="mx-auto max-w-7xl border-t border-slate-200 px-5 py-5 text-xs text-slate-400">© 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved. Unauthorised reproduction prohibited.</div>
      </footer>
    </div>
  );
}
