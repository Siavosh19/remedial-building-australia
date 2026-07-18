import { ArrowRight } from "lucide-react";
import Link from "next/link";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata = {
  title: "Basement Water Ingress — Repair Systems — Remedial Building Australia",
  description:
    "Technical repair system reference for basement water ingress in Australian Class 2 strata and commercial buildings — injection systems, crystalline tanking, hydraulic cement plugging, cavity drain membranes, sump and pump systems.",
};

const SUBCATEGORIES = [
  {
    heading: "Injection Systems",
    items: [
      {
        label: "Hydrophilic polyurethane injection systems",
        slug: "hydrophilic-pu-injection",
        count: 3,
        description: "1C and 2C hydrophilic PU foam and gel injection resins for sealing active water ingress through basement wall cracks, construction joints and cold joints.",
        live: true,
      },
      {
        label: "Acrylic injection systems",
        slug: "acrylic-injection-systems",
        count: 2,
        description: "2C acrylic acrylate gel injection systems for sealing hairline cracks and fine construction joints with very low viscosity resin.",
        live: true,
      },
      {
        label: "Crack injection ports and packer systems",
        slug: "crack-injection-port-packer",
        count: 4,
        description: "Surface-mounted injection ports and drill-in packers for delivering PU, acrylic, and epoxy resins into basement cracks and joints.",
        live: true,
      },
    ],
  },
  {
    heading: "Tanking & Plugging",
    items: [
      {
        label: "Hydraulic cement plugging systems",
        slug: "hydraulic-cement-plugging",
        count: 3,
        description: "Rapid-setting hydraulic cementitious products for physically stopping active running water through basement walls, slabs and pipe penetrations.",
        live: true,
      },
      {
        label: "Cementitious crystalline tanking systems",
        slug: "cementitious-crystalline-tanking",
        count: 3,
        description: "Xypex, Penetron and equivalent crystalline waterproofing systems — positive and negative side application — autogenous crack healing.",
        live: true,
      },
    ],
  },
  {
    heading: "Drainage Systems",
    items: [
      {
        label: "Cavity drain membrane systems",
        slug: "cavity-drain-membrane-systems",
        count: 3,
        description: "Delta MS HDPE dimple cavity drain wall and floor membranes — water management approach — BS 8102 Grade 2 and Grade 3 applications.",
        live: true,
      },
      {
        label: "Sump and pump systems",
        slug: "sump-and-pump-systems",
        count: 3,
        description: "Grundfos and DAB submersible drainage pumps — primary automatic and backup manual sump pumps for cavity drain basement waterproofing systems.",
        live: true,
      },
    ],
  },
] as const;

export default function BasementWaterIngressPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header ── */}
      <SiteHeader />

      <main>
        {/* ── Hero ── */}
        <section className="border-b border-slate-200 bg-white px-4 sm:px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex items-center gap-2 text-xs font-semibold text-slate-400">
              <Link href="/" className="hover:text-sky-700 transition">Home</Link>
              <span>/</span>
              <Link href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</Link>
              <span>/</span>
              <span className="text-sky-950">Basement Water Ingress</span>
            </nav>
            <PageNav />
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — Basement Water Ingress</p>
            <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
              Basement water ingress repair systems
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Technical repair system reference for water ingress through basement walls, slabs, and joints in Australian Class 2 strata and commercial buildings — select a product category to view system information, product comparisons, and brand equivalents.
            </p>
          </div>
        </section>

        {/* ── Subcategory cards — grouped ── */}
        <section className="px-4 sm:px-8 py-14">
          <div className="mx-auto max-w-7xl space-y-14">
            {SUBCATEGORIES.map((group) => (
              <div key={group.heading}>
                <div className="mb-6 flex items-start gap-3">
                  <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
                  <div>
                    <h2 className="text-xl font-extrabold text-sky-950">{group.heading}</h2>
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((sub) =>
                    sub.live ? (
                      <Link
                        key={sub.slug}
                        href={`/repair-systems/basement-water-ingress/${sub.slug}`}
                        className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <div className="h-0.5 w-8 rounded-full bg-red-700" />
                          <span className="inline-flex items-center gap-1 rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-[10px] font-bold text-green-700">
                            <span className="h-1 w-1 rounded-full bg-green-500" />Live
                          </span>
                        </div>
                        <h3 className="text-base font-extrabold leading-tight text-sky-950 transition group-hover:text-sky-700">{sub.label}</h3>
                        <p className="mt-2 text-xs leading-5 text-slate-500">{sub.description}</p>
                        <p className="mt-3 text-xs font-semibold text-slate-400">{sub.count} products listed</p>
                        <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-sky-700 transition group-hover:text-red-700">
                          View systems <ArrowRight size={12} />
                        </div>
                      </Link>
                    ) : (
                      <div key={sub.slug} className="rounded-2xl border border-slate-100 bg-white p-6 opacity-50">
                        <div className="mb-3 flex items-center justify-between">
                          <div className="h-0.5 w-8 rounded-full bg-slate-300" />
                          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-400">
                            In development
                          </span>
                        </div>
                        <h3 className="text-base font-extrabold leading-tight text-slate-600">{sub.label}</h3>
                        <p className="mt-2 text-xs leading-5 text-slate-400">{sub.description}</p>
                        <p className="mt-3 text-xs font-semibold text-slate-300">{sub.count} product categories</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <SeoCrossPromo />

      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <Link href="/repair-systems" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200 transition">← Repair Systems</Link>
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
