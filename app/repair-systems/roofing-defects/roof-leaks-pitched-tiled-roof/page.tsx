import { ArrowRight } from "lucide-react";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata = {
  title: "Roof Leaks — Pitched Tiled Roof — Roofing Defects — Remedial Building Australia",
  description:
    "Technical product reference for roof leak repair on pitched tiled roofs in Australian Class 2 strata buildings — select a product type to browse systems, brand comparisons and technical specifications.",
};

const DEFECT_SLUG = "roof-leaks-pitched-tiled-roof";

const GROUPS = [
  {
    heading: "Roof Tile Systems",
    items: [
      { label: "Roof tile replacement — terracotta", slug: "roof-tile-replacement-terracotta", count: 4, description: "Monier, Boral and Bristile terracotta roof tile replacement systems for pitched tiled roofs." },
      { label: "Roof tile replacement — concrete", slug: "roof-tile-replacement-concrete", count: 4, description: "Monier, Boral and Bristile concrete roof tile replacement systems for pitched tiled roofs." },
      { label: "Roof tile replacement — slate", slug: "roof-tile-replacement-slate", count: 3, description: "Natural and fibre cement slate replacement systems for pitched slate roofs." },
    ],
  },
  {
    heading: "Ridge & Hip Systems",
    items: [
      { label: "Ridge and hip capping rebed — polymer mortar", slug: "ridge-hip-capping-rebed", count: 3, description: "Flexible polymer-modified bedding mortars for ridge and hip capping rebed and point on terracotta and concrete tiled roofs." },
    ],
  },
  {
    heading: "Valley Flashing Systems",
    items: [
      { label: "Valley flashing systems — aluminium", slug: "valley-flashing-aluminium", count: 3, description: "Aluminium roll valley iron and formed valley flashing systems for tiled roof valley replacement." },
      { label: "Valley flashing systems — copper", slug: "valley-flashing-copper", count: 2, description: "Copper sheet valley flashing systems for high-specification and heritage tiled roof valley replacement." },
      { label: "Valley flashing systems — Colorbond", slug: "valley-flashing-colorbond", count: 3, description: "BlueScope Colorbond and Lysaght roll valley iron systems for tiled roof valley replacement." },
    ],
  },
  {
    heading: "Step & Counter-Flashing Systems",
    items: [
      { label: "Step and counter-flashing — Colorbond", slug: "step-counter-flashing-colorbond", count: 2, description: "BlueScope Colorbond step and counter-flashing systems for wall-abutment flashings on tiled roofs." },
      { label: "Step and counter-flashing — aluminium", slug: "step-counter-flashing-aluminium", count: 3, description: "Aluminium step and counter-flashing systems for wall-abutment flashings on tiled roofs." },
      { label: "Step and counter-flashing — lead", slug: "step-counter-flashing-lead", count: 3, description: "Lead sheet step and counter-flashing systems — Code 3, 4 and 5 lead — for all flashing applications on tiled roofs." },
    ],
  },
  {
    heading: "Penetration Systems",
    items: [
      { label: "Penetration flashing collar systems", slug: "penetration-flashing-collar", count: 5, description: "Deks, Kempart and Polyplas pre-formed penetration flashing collar systems for pipe and service penetrations through pitched tiled roofs." },
      { label: "Penetration plinth systems", slug: "penetration-plinth-systems", count: 2, description: "Fabricated and proprietary raised plinth systems for pipe service penetrations requiring a raised weathered surround on pitched tiled roofs." },
    ],
  },
  {
    heading: "Sarking & Underlay Systems",
    items: [
      { label: "Sarking — EHD anti-glare reflective foil", slug: "sarking-reflective-foil", count: 4, description: "Bradford Anticon, Fletcher Sisalation and equivalent extra heavy duty anti-glare reflective foil sarking systems for under-tile installation." },
      { label: "Sarking — PIR under-tile insulation board", slug: "sarking-pir-under-tile", count: 3, description: "Kingspan, Recticel and equivalent PIR board sarking/insulation systems installed under roof tiles." },
      { label: "Sarking — mineral wool under-tile insulation", slug: "sarking-mineral-wool", count: 3, description: "Bradford, Knauf and Rockwool mineral wool under-tile insulation systems for pitched roof insulation upgrade." },
    ],
  },
  {
    heading: "Structural & Substrate Systems",
    items: [
      { label: "Roof batten systems — H2 and H3 treated", slug: "roof-battens", count: 3, description: "H2 and H3 preservative-treated timber roof batten systems for tile replacement and roof re-battening." },
      { label: "Anti-ponding board systems", slug: "anti-ponding-boards", count: 3, description: "Bradford and equivalent anti-ponding board systems for installation at eaves to prevent insulation blocking gutter airflow." },
      { label: "Roof insulation systems — R4", slug: "roof-insulation-r4", count: 4, description: "Bradford Gold, Knauf Earthwool and Fletcher Insulation R4.0 ceiling batt systems for roof insulation upgrade on Class 2 strata buildings." },
    ],
  },
];

export default function RoofLeaksPitchedTiledRoofPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header ── */}
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
              <a href="/repair-systems/roofing-defects" className="hover:text-sky-700 transition">Roofing Defects</a>
              <span>/</span>
              <span className="text-sky-950">Roof Leaks — Pitched Tiled Roof</span>
            </nav>
            <PageNav />
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 04 — Roofing Defects</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
              Roof leaks — pitched tiled roof repair systems
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Technical product reference for roof leak repair on pitched tiled roofs in Australian Class 2 strata buildings — select a product type to browse systems, brand comparisons and technical specifications.
            </p>
          </div>
        </section>

        {/* ── Product type card groups ── */}
        <section className="px-8 py-14">
          <div className="mx-auto max-w-7xl space-y-12">
            {GROUPS.map((group) => (
              <div key={group.heading}>
                <div className="mb-6 flex items-start gap-3">
                  <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
                  <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-red-700">{group.heading}</h2>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((item) => (
                    <a
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
                    </a>
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
          <a href="/repair-systems/roofing-defects" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200 transition">← Roofing Defects</a>
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
