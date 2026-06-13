import type { Metadata } from "next";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { CladdingRecoatingPVDFIntroSection, CladdingRecoatingPVDFProductSection } from "./CladdingRecoatingPVDFProductSection";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Cladding & Metal Panel PVDF Recoating Systems — External Coating — Remedial Building Australia",
  description:
    "Technical product reference for fluoropolymer and PVDF recoating systems for aluminium composite panel and metal cladding — Dulux Luxafloor, Wattyl and specialist PVDF/Kynar recoating systems for facades.",
};

const SIBLING_GROUPS = [
  { heading: "Primers & Preparation", tabs: [{ label: "Alkali primer", slug: "alkali-resistant-primer-systems" }, { label: "Rust primer", slug: "rust-inhibiting-primer-systems" }, { label: "Consolidant", slug: "penetrating-consolidant-systems" }, { label: "Biocide prep", slug: "biocide-surface-preparation-systems" }]},
  { heading: "Topcoat Systems", tabs: [{ label: "Acrylic 2-coat", slug: "exterior-acrylic-coating-systems" }, { label: "Elastomeric", slug: "elastomeric-coating-systems" }, { label: "Crack-bridging", slug: "elastomeric-crack-bridging-coating" }, { label: "Metal enamel", slug: "uv-resistant-enamel-metal" }, { label: "Timber enamel", slug: "exterior-enamel-timber" }]},
  { heading: "Water Repellents", tabs: [{ label: "Silane/siloxane", slug: "penetrating-silane-siloxane" }, { label: "PVDF recoating", slug: "cladding-metal-panel-recoating-pvdf" }]},
];

const ACTIVE_SLUG = "cladding-metal-panel-recoating-pvdf";
const BASE_URL = "/repair-systems/facade-external-envelope/external-coating-paint-deterioration";

export default function CladdingRecoatingPVDFPage() {
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
              <a href={BASE_URL} className="hover:text-sky-700 transition">External Coating &amp; Paint Deterioration</a><span>/</span>
              <span className="text-sky-950">Cladding / metal panel PVDF recoating</span>
            </nav>
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 03 — Facade &amp; External Envelope</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">Cladding and metal panel recoating systems — PVDF / fluoropolymer</h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">PVDF (polyvinylidene fluoride) and fluoropolymer recoating systems are the highest-performance option for aluminium composite panel (ACP) and metal cladding facades where the original factory coating has chalked, faded or delaminated. Meeting AAMA 2605 for colour retention and chalk resistance, they provide 15–25 year service life in harsh exterior exposure. Application requires specialist preparation and spray equipment — not a conventional roller or brush paint.</p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[{ label: "Binder", value: "70% PVDF/Kynar" }, { label: "DFT", value: "25+25µm" }, { label: "Application", value: "Factory/specialist spray" }, { label: "Standard", value: "AAMA 2605" }].map((s) => (
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
        <section className="px-8 py-14"><div className="mx-auto max-w-7xl space-y-10"><CladdingRecoatingPVDFIntroSection /><CladdingRecoatingPVDFProductSection />

            {/* Do not confuse warning */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-amber-900">Do not confuse PVDF and fluoropolymer cladding recoating systems with:</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "UV-resistant enamel topcoats for metal — conventional solvent or water-based metal enamels are not fluoropolymer systems and will not achieve the 20-year colour retention and chalk resistance of PVDF; they are appropriate for balustrades and lintels, not aluminium curtain wall or ACP panels",
                  "Standard polyester powder coating — polyester powder coat meets AAMA 2604 (5-year colour retention) at best; PVDF powder coat (Interpon D3020, Axalta Alesta PVDF) meets AAMA 2605 (10-year minimum) — specifying 'powder coat' without the PVDF qualifier will produce a shorter-life finish",
                  "Anti-corrosion paint systems for steel — zinc-rich and epoxy primer systems for steel are not applicable to aluminium cladding; aluminium is corrosion-resistant but requires PVDF or powder coat for UV/aesthetic protection, not zinc-rich anti-corrosion paint",
                  "Exterior acrylic or masonry coatings — acrylic masonry paint systems are not formulated for non-porous aluminium substrates and will not adhere to metal cladding panels without specialist adhesion primer",
                  "Anodising — anodising is an electrochemical surface treatment applied to aluminium profiles at manufacture; it cannot be applied as a site or factory recoating process to existing cladding — specify PVDF or powder coat for recoating scenarios",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-6 text-amber-900">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div></section>
        <section className="border-t border-slate-200 bg-slate-50 px-8 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5"><p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Disclaimer</p><p className="text-xs leading-6 text-amber-900">General technical information only. PVDF recoating is a specialist application — standard paint contractors are not qualified for this work. Panels with delaminated PE cores or fire-safety compliance issues must be assessed separately. Confirm applicator licensing, surface preparation and warranty terms with the system manufacturer. Not a substitute for professional advice.</p></div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[{ href: `${BASE_URL}/penetrating-silane-siloxane`, label: "External Coating", title: "Penetrating silane/siloxane water repellents" }, { href: `${BASE_URL}/uv-resistant-enamel-metal`, label: "External Coating", title: "UV-resistant enamel — metal" }, { href: `${BASE_URL}/rust-inhibiting-primer-systems`, label: "External Coating", title: "Rust-inhibiting primer systems" }, { href: `${BASE_URL}/exterior-acrylic-coating-systems`, label: "External Coating", title: "Exterior acrylic coating systems" }, { href: BASE_URL, label: "Back to defect", title: "External Coating & Paint Deterioration" }].map((card) => (
                <a key={card.href} href={card.href} className="group block rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-sky-200 hover:shadow-md"><div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">{card.label}</div><h4 className="text-sm font-extrabold leading-snug text-sky-950">{card.title}</h4><div className="mt-4 flex items-center gap-1 text-xs font-bold text-sky-700 transition group-hover:text-red-700">Open <ArrowRight size={11} /></div></a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10"><a href={BASE_URL} className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">← External Coating &amp; Paint Deterioration</a></div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]"><div><div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div><p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.</p></div><div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950"><a href="/about" className="hover:text-sky-700">About</a><a href="/contact" className="hover:text-sky-700">Contact</a><a href="/terms" className="hover:text-sky-700">Terms</a><a href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</a><a href="/defect-library" className="hover:text-sky-700">Defect Library</a><a href="/repair-systems" className="hover:text-sky-700">Repair Systems</a><a href="/industry-news" className="hover:text-sky-700">News &amp; Insights</a><a href="/directory" className="hover:text-sky-700">Business Directory</a><a href="#" className="termly-display-preferences hover:text-sky-700">Consent Preferences</a></div></div>
        <div className="mx-auto max-w-7xl border-t border-slate-200 px-5 py-5 text-xs text-slate-400">© 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved. Unauthorised reproduction prohibited.</div>
      </footer>
    </div>
  );
}
