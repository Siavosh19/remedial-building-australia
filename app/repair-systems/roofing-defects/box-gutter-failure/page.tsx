import { ArrowRight } from "lucide-react";
import Link from "next/link";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata = {
  title: "Box Gutter Failure — Roofing Defects — Remedial Building Australia",
  description:
    "Technical product reference for box gutter failure repair on Australian Class 2 strata buildings — select a product type to browse gutter lining systems, overflow systems and protection systems.",
};

const DEFECT_SLUG = "box-gutter-failure";

const GROUPS = [
  {
    heading: "Gutter Lining Systems",
    items: [
      { label: "Box gutter lining — Colorbond steel", slug: "box-gutter-lining-colorbond", count: 3, description: "BlueScope Colorbond Ultra and Lysaght Colorbond steel box gutter lining systems for failed or undersized box gutters." },
      { label: "Box gutter lining — aluminium", slug: "box-gutter-lining-aluminium", count: 2, description: "Capral and Metalcorp aluminium sheet box gutter lining systems for failed or corroded box gutters." },
      { label: "Box gutter lining — copper", slug: "box-gutter-lining-copper", count: 2, description: "Austral Lead and Calder copper sheet box gutter lining systems for high-specification and heritage box gutter replacement." },
    ],
  },
  {
    heading: "Rainwater Head Systems",
    items: [
      { label: "Rainwater head systems — Colorbond steel", slug: "rainwater-head-colorbond", count: 3, description: "Custom-fabricated and proprietary Colorbond steel rainwater heads for box gutter to downpipe transitions on Class 2 strata buildings." },
      { label: "Rainwater head systems — aluminium", slug: "rainwater-head-aluminium", count: 3, description: "Aluminium rainwater heads — mill-finished and anodised — for box gutter outlets on strata and commercial buildings." },
      { label: "Rainwater head systems — copper", slug: "rainwater-head-copper", count: 2, description: "Copper rainwater heads for heritage and high-specification box gutter applications on Class 2 buildings." },
      { label: "Rainwater head systems — stainless steel", slug: "rainwater-head-stainless", count: 2, description: "AISI 316 stainless steel rainwater heads for coastal, industrial and premium Class 2 strata building applications." },
    ],
  },
  {
    heading: "Overflow & Protection",
    items: [
      { label: "Overflow scupper and weir systems", slug: "overflow-scupper-weir", count: 3, description: "Blucher, Geberit and Alproc overflow scupper and weir systems for box gutter overflow compliance on Class 2 strata buildings." },
      { label: "Leaf guard and strainer basket systems", slug: "leaf-guard-strainer", count: 3, description: "Leaf Stopper, Hedgehog and Gutter Mesh leaf guard and outlet strainer basket systems for box gutter protection." },
    ],
  },
];

export default function BoxGutterFailurePage() {
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
              <Link href="/repair-systems/roofing-defects" className="hover:text-sky-700 transition">Roofing Defects</Link>
              <span>/</span>
              <span className="text-sky-950">Box Gutter Failure</span>
            </nav>
            <PageNav />
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 04 — Roofing Defects</p>
            <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
              Box gutter failure repair systems
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Technical product reference for box gutter failure repair on Australian Class 2 strata buildings — select a product type to browse gutter lining systems, overflow systems and protection systems.
            </p>
          </div>
        </section>

        {/* ── Product type card groups ── */}
        <section className="px-4 sm:px-8 py-14">
          <div className="mx-auto max-w-7xl space-y-12">
            {GROUPS.map((group) => (
              <div key={group.heading}>
                <div className="mb-6 flex items-start gap-3">
                  <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
                  <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-red-700">{group.heading}</h2>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/repair-systems/roofing-defects/${DEFECT_SLUG}/${item.slug}`}
                      className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <div className="h-0.5 w-8 rounded-full bg-red-700" />
                        <span className="inline-flex items-center gap-1 rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-[10px] font-bold text-green-700">
                          <span className="h-1 w-1 rounded-full bg-green-500" />Live
                        </span>
                      </div>
                      <h3 className="text-base font-extrabold leading-tight text-sky-950 transition group-hover:text-sky-700">{item.label}</h3>
                      <p className="mt-2 text-xs leading-5 text-slate-500">{item.description}</p>
                      <p className="mt-3 text-xs font-semibold text-slate-400">{item.count} product systems</p>
                      <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-sky-700 transition group-hover:text-red-700">
                        View systems <ArrowRight size={12} />
                      </div>
                    </Link>
                  ))}
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
          <Link href="/repair-systems/roofing-defects" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200 transition">← Roofing Defects</Link>
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
