import type { Metadata } from "next";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { BoxGutterSystemsProductSection, BoxGutterSystemsIntroSection } from "./BoxGutterSystemsProductSection";

export const metadata: Metadata = {
  title: "Box Gutter Systems — Gutter Replacement — Roofing Defects — Remedial Building Australia",
  description:
    "Technical product reference for custom Colorbond and Zincalume box gutter fabrication systems from Lysaght and Stratco — design requirements, overflow provisions, and AS/NZS 3500.3 compliance for Class 2 strata and commercial buildings.",
};

const SIBLING_GROUPS = [
  {
    heading: "Gutter Systems",
    tabs: [
      { label: "Quad gutter", slug: "quad-gutter-systems" },
      { label: "Half-round gutter", slug: "half-round-gutter-systems" },
      { label: "Box gutter", slug: "box-gutter-systems" },
    ],
  },
];

export default function BoxGutterSystemsPage() {
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
              <a href="/repair-systems/roofing-defects/gutter-replacement" className="hover:text-sky-700 transition">Gutter Replacement</a>
              <span>/</span>
              <span className="text-sky-950">Box gutter systems</span>
            </nav>
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — Roofing Defects — Gutter Replacement</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  Custom box gutter systems — Colorbond and Zincalume
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Box gutters are custom-fabricated from Colorbond or Zincalume steel to suit specific building dimensions and drainage requirements, typically on Class 2 multi-unit residential buildings and commercial structures. Unlike profiled gutters, box gutters are site-formed or fabricated off-site by roofing contractors and require careful design for overflow, falls and outlet sizing.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Fabrication", value: "Custom on-site or shop-fabricated" },
                  { label: "Material", value: "Colorbond / Zincalume" },
                  { label: "Min fall", value: "1:200" },
                  { label: "Overflow", value: "Required per AS/NZS 3500.3" },
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
                      const active = tab.slug === "box-gutter-systems";
                      return (
                        <a
                          key={tab.slug}
                          href={`/repair-systems/roofing-defects/gutter-replacement/${tab.slug}`}
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

            <BoxGutterSystemsIntroSection />

            <BoxGutterSystemsProductSection />

            {/* Do not confuse warning */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-amber-900">Do not confuse box gutter replacement with:</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Quad (ogee) gutters — profiled external eave gutters — listed on the quad gutter systems page — entirely different product category and application",
                  "Half-round gutters — profiled external eave gutters — listed on the half-round gutter systems page — not appropriate for internal box gutter applications",
                  "Box gutter relining — a separate scope item where a liquid membrane or GRP lining system is applied inside the existing structural box gutter without full replacement — assess lining vs replacement before specifying",
                  "Box gutter waterproofing — where liquid-applied membrane systems are used to waterproof existing box gutters rather than replacing the steel — listed under waterproofing systems",
                  "Overflow scupper replacement — overflow outlets and scuppers are a separate component that must be co-ordinated with any box gutter replacement scope",
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

        {/* ── Disclaimer + related links ── */}
        <section className="border-t border-slate-200 bg-slate-50 px-8 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Disclaimer</p>
              <p className="text-xs leading-6 text-amber-900">
                This page provides general technical information only. Final product selection and box gutter design must be confirmed against the current manufacturer technical data sheet, project-specific drainage calculations, AS/NZS 3500.3 requirements for minimum fall, overflow outlet sizing and location, structural conditions, NCC requirements, and contractor supply relationships. Box gutter design and detailing is a specialist scope item — do not rely on this reference as a substitute for professional engineering or building consultant advice.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  href: "/repair-systems/roofing-defects/gutter-replacement",
                  label: "← Gutter Replacement",
                  title: "Browse all gutter replacement product types",
                },
                {
                  href: "/repair-systems/roofing-defects/gutter-replacement/quad-gutter-systems",
                  label: "Quad Gutter Systems",
                  title: "Lysaght, Stramit and Stratco quad (ogee) gutter systems",
                },
                {
                  href: "/repair-systems/roofing-defects/gutter-replacement/half-round-gutter-systems",
                  label: "Half-Round Gutter Systems",
                  title: "Lysaght, Stramit and Stratco half-round gutter systems",
                },
                {
                  href: "/repair-systems/roofing-defects",
                  label: "Roofing Defects",
                  title: "Browse all roofing defect repair system categories",
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
          <a href="/repair-systems/roofing-defects/gutter-replacement" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">
            ← Gutter Replacement
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
