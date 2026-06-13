import type { Metadata } from "next";
import { AlertTriangle, BookOpen, ArrowRight } from "lucide-react";
import { AcrylicInjectionProductSection, AcrylicInjectionIntroSection } from "./AcrylicInjectionProductSection";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Acrylic Injection Systems — Basement Water Ingress — Remedial Building Australia",
  description: "Technical product reference for acrylic acrylate gel injection systems used to seal fine cracks and construction joints against water ingress in Australian basement and below-ground structures.",
};

const SIBLING_GROUPS = [
  {
    heading: "Injection Systems",
    tabs: [
      { label: "Hydrophilic PU injection", slug: "hydrophilic-pu-injection" },
      { label: "Acrylic injection", slug: "acrylic-injection-systems" },
      { label: "Ports & packers", slug: "crack-injection-port-packer" },
    ],
  },
  {
    heading: "Tanking & Plugging",
    tabs: [
      { label: "Hydraulic cement plugging", slug: "hydraulic-cement-plugging" },
      { label: "Crystalline tanking", slug: "cementitious-crystalline-tanking" },
    ],
  },
  {
    heading: "Drainage Systems",
    tabs: [
      { label: "Cavity drain membranes", slug: "cavity-drain-membrane-systems" },
      { label: "Sump & pump", slug: "sump-and-pump-systems" },
    ],
  },
];

export default function AcrylicInjectionPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      <SiteHeader />

      <main>

        {/* ── Hero ── */}
        <section className="border-b border-slate-200 bg-white px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <a href="/" className="hover:text-sky-700 transition">Home</a>
              <span>/</span>
              <a href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</a>
              <span>/</span>
              <a href="/repair-systems/basement-water-ingress" className="hover:text-sky-700 transition">Basement Water Ingress</a>
              <span>/</span>
              <span className="text-sky-950">Acrylic injection</span>
            </nav>
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — Basement Water Ingress</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  Acrylic injection systems
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Technical product reference for acrylic acrylate gel injection systems used to seal fine cracks, hairline cracks, and construction joints against water ingress in basement and below-ground structures on Australian Class 2 strata and commercial buildings. Covers product selection, viscosity, gel time, injection pressure, and comparison with hydrophilic PU systems.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Products listed", value: "2" },
                  { label: "Brands available", value: "2" },
                  { label: "Viscosity", value: "Very low" },
                  { label: "Standard", value: "EN 1504-5" },
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
                      const active = tab.slug === "acrylic-injection-systems";
                      return (
                        <a
                          key={tab.slug}
                          href={`/repair-systems/basement-water-ingress/${tab.slug}`}
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
            <AcrylicInjectionIntroSection />
            <AcrylicInjectionProductSection />
          </div>
        </section>

        {/* ── Disclaimer ── */}
        <section className="border-t border-slate-200 bg-slate-50 px-8 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Disclaimer</p>
              <p className="text-xs leading-6 text-amber-900">
                This page provides general technical information only. Final product selection must be confirmed against the current manufacturer technical data sheet, project specification, substrate condition, and structural engineer advice where applicable. Basement and below-ground waterproofing involves hydrostatic pressure — confirm system selection with a qualified waterproofing consultant before specifying. Do not rely on this reference as a substitute for professional advice.
              </p>
            </div>
            <div className="mt-8">
              <a href="/repair-systems/basement-water-ingress" className="inline-flex items-center gap-2 rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200 transition">
                <ArrowRight size={14} className="rotate-180" /> Back to Basement Water Ingress
              </a>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-slate-200 bg-slate-100">
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
            </div>
          </div>
          <div className="mx-auto max-w-7xl border-t border-slate-200 px-5 py-5 text-xs text-slate-400">
            © 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved.
          </div>
        </footer>
      </main>
    </div>
  );
}
