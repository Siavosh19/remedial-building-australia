import type { Metadata } from "next";
import { AlertTriangle, BookOpen, ArrowRight } from "lucide-react";
import { FlashingCompoundProductSection } from "./FlashingCompoundProductSection";

export const metadata: Metadata = {
  title: "Flashing Compound Systems — Roofs and Balconies — Remedial Building Australia",
  description:
    "Technical product reference for flashing compound systems used in roof and balcony waterproofing remediation on Australian Class 2 strata apartment buildings — liquid PU-bitumen flashing compounds, bituminous brushable compounds, self-adhesive flashing tapes, upstand and parapet detail waterproofing, root-resistant flashing variants, and brand comparisons.",
};

const SIBLING_TABS = [
  { label: "Liquid applied — PU & hybrid", slug: "liquid-applied-membranes-polyurethane" },
  { label: "Liquid applied — acrylic", slug: "liquid-applied-membranes-acrylic" },
  { label: "Torch-on sheet", slug: "sheet-membranes-torch-on" },
  { label: "Cold-applied sheet", slug: "sheet-membranes-cold-applied" },
  { label: "Cementitious flexible", slug: "cementitious-flexible-membranes" },
  { label: "Primers", slug: "primers-bonding-agents" },
  { label: "Screed polymer", slug: "screed-systems-polymer-modified" },
  { label: "Screed SL", slug: "screed-systems-self-levelling" },
  { label: "Drainage puddle flanges", slug: "drainage-puddle-flanges-floor-wastes" },
  { label: "Drainage linear", slug: "drainage-linear-grates-channel-drains" },
  { label: "Penetration collars", slug: "penetration-collars" },
  { label: "Protection boards", slug: "protection-boards" },
  { label: "Reinforcing fabric", slug: "reinforcing-fabric-mesh" },
  { label: "Flood test", slug: "flood-test-equipment" },
  { label: "Tile adhesive", slug: "tile-adhesive-systems" },
  { label: "Tools", slug: "abrasives-blades-tools" },
  { label: "HDPE sheet membranes (roofs/podiums)", slug: "hdpe-sheet-membrane-systems" },
  { label: "Single-ply membranes (ballasted)", slug: "single-ply-membrane-systems-ballasted" },
  { label: "Hot melt asphalt (roofs/podiums)", slug: "hot-melt-rubberised-asphalt-systems" },
  { label: "Root resistant membranes (planters/podiums)", slug: "root-resistant-membrane-systems" },
  { label: "Tapered insulation (roofs/podiums)", slug: "tapered-insulation-board-systems" },
  { label: "Pedestal systems (podiums)", slug: "pedestal-systems-adjustable-height" },
  { label: "Drainage cells (planter boxes)", slug: "drainage-cell-systems" },
  { label: "Filter fabric (planter boxes)", slug: "filter-fabric-systems" },
  { label: "Ballast systems (roofs)", slug: "ballast-systems" },
  { label: "Podium outlets & scuppers", slug: "drainage-podium-outlets-scuppers" },
  { label: "Edge trims & gutter lining", slug: "gutter-lining-systems" },
  { label: "Flashing compounds (roofs)", slug: "flashing-compound-systems" },
];

export default function FlashingCompoundSystemsPage() {
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
              <a href="/repair-systems/waterproofing-water-ingress" className="hover:text-sky-700 transition">Waterproofing Systems</a>
              <span>/</span>
              <a href="/repair-systems/balcony-waterproofing-failure" className="hover:text-sky-700 transition">Balcony, roof, planter box and podium waterproofing failure</a>
              <span>/</span>
              <span className="text-sky-950">Flashing compound systems — roofs and balconies</span>
            </nav>
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 01</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  Flashing compound systems — roofs and balconies
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Technical product reference for liquid PU-bitumen flashing compounds, bituminous brushable compounds, and self-adhesive flashing tapes used to seal upstands, parapet junctions, penetrations, and detail areas on roofs and balconies in Australian Class 2 strata building remediation.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Products listed", value: "7" },
                  { label: "Brands covered", value: "4" },
                  { label: "System types", value: "PU-bitumen / bituminous / tape" },
                  { label: "Application", value: "Upstand and detail waterproofing" },
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
            <div className="flex items-end gap-0 overflow-x-auto">
              {SIBLING_TABS.map((tab) => {
                const active = tab.slug === "flashing-compound-systems";
                return (
                  <a
                    key={tab.slug}
                    href={`/repair-systems/balcony-waterproofing-failure/${tab.slug}`}
                    className={`relative shrink-0 border-b-2 px-5 py-4 text-sm font-bold whitespace-nowrap transition ${
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
        </div>

        {/* ── Content ── */}
        <section className="px-8 py-14">
          <div className="mx-auto max-w-7xl space-y-10">

            {/* ── Intro — clean prose only ── */}
            <div>
              <div className="mb-5 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
                  <BookOpen size={15} />
                </div>
                <h2 className="text-xl font-extrabold text-sky-950">What are flashing compound systems — roofs and balconies?</h2>
              </div>
              <div className="space-y-4 text-sm leading-7 text-slate-600">
                <p>
                  Flashing compound systems are liquid-applied or self-adhesive waterproofing products used to seal and waterproof upstands, parapet wall junctions, roof-to-wall interfaces, penetrations, step junctions, and other detail areas on roofs and balconies where a sheet membrane cannot be easily applied, heat-bonded, or formed into a watertight junction. On torch-on modified bitumen sheet membrane systems — the dominant sheet membrane system in Australian strata building remediation — the sheet membrane covers the horizontal field of the roof or balcony, but the junctions with vertical upstands, parapet walls, step flashings, and penetrations require a separate compound or flashing product to complete the waterproof detail. Flashing compounds bridge the gap between the field membrane and the vertical surface, conforming to irregular substrates and complex geometry that sheet membranes cannot reach.
                </p>
                <p>
                  Flashing compound systems are also used as standalone repair compounds on existing waterproofing systems — applied over failed or cracked existing membrane at upstands, corners, and penetration perimeters where the primary membrane has failed but full replacement is not required or is not yet scheduled. In this repair role, flashing compounds extend the service life of an existing system at its most vulnerable detail locations.
                </p>
                <p>
                  The three primary flashing compound types used in Australian roof and balcony waterproofing remediation are liquid PU-bitumen flashing compounds, bituminous brushable compounds, and self-adhesive flashing tapes. Each has a distinct substrate compatibility, membrane system compatibility, UV resistance, and application method. The correct flashing compound must be selected to match the primary membrane system it is used with — flashing compounds are not universally interchangeable across membrane systems and brands.
                </p>
              </div>
            </div>

            {/* Interactive: accordion + product sections + comparison tables */}
            <FlashingCompoundProductSection />

            {/* ── Warning boxes — ALL below comparison table ── */}
            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-red-200 bg-red-50 p-7">
                <div className="mb-4 flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-700 text-white">
                    <AlertTriangle size={15} />
                  </div>
                  <h3 className="text-base font-extrabold text-red-900">Flashing compounds are detail products — they do not replace the field membrane</h3>
                </div>
                <p className="text-sm leading-7 text-red-900">
                  Flashing compounds and self-adhesive flashing tapes are detail products — they seal upstands, parapet bases, penetration perimeters, and step junctions. They are not field membrane products and must not be applied across the horizontal field of a roof or balcony as a substitute for the primary membrane system. A roof or balcony waterproofed only with flashing compound at details but without a correctly applied field membrane will fail — the flashing compound coverage is insufficient to provide the required waterproofing across the field area. Every correctly specified roof or balcony waterproofing system includes both a field membrane (torch-on sheet, single-ply, or liquid-applied) and a compatible flashing compound at all detail locations. Both are mandatory — neither replaces the other.
                </p>
              </div>

              <div className="rounded-2xl border border-red-200 bg-red-50 p-7">
                <div className="mb-4 flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-700 text-white">
                    <AlertTriangle size={15} />
                  </div>
                  <h3 className="text-base font-extrabold text-red-900">Reinforcing fleece is mandatory at all angles and penetration perimeters with liquid flashing compounds</h3>
                </div>
                <p className="text-sm leading-7 text-red-900">
                  Soprema Alsan Flashing, Alsan Flashing Quadro, and Alsan Flashing Jardin must all be applied with the correct reinforcing fleece (Alsan Polyfleece or Alsan Fleece 165B) embedded between coats at all internal and external angles, changes of plane, and penetration perimeters. Applying liquid flashing compound without embedded fleece at these locations produces a thin, unreinforced film that will crack under thermal movement at the angle — the most common location for liquid flashing compound failure. The fleece is not optional at angles — do not apply liquid flashing compound to any angle or change of plane without reinforcing fleece embedded between the first and second coats.
                </p>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
                <div className="mb-4 flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
                    <AlertTriangle size={15} />
                  </div>
                  <h3 className="text-base font-extrabold text-amber-900">Confirm flashing compound compatibility with the primary membrane system before specifying</h3>
                </div>
                <p className="text-sm leading-7 text-amber-900">
                  Flashing compounds must be compatible with the primary field membrane being used on the project. Soprema Alsan Flashing is 100% compatible with SBS and APP bituminous sheet membranes — it is not automatically compatible with ARDEX or Mapei liquid-applied PU membranes. ARDEX Flashing Tape is a Weldtec system component — it is not for use in other ARDEX membrane systems. Tremco PermAFab is designed for Tremco roofing systems. Using a flashing compound from a different manufacturer's system than the field membrane — or using a system-specific flashing tape in a non-compatible system — risks adhesion failure at the detail junction and may void the membrane system warranty. Always confirm flashing compound compatibility with the field membrane manufacturer before specifying.
                </p>
              </div>

              <div className="rounded-2xl border border-sky-200 bg-sky-50 p-7">
                <div className="mb-4 flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
                    <BookOpen size={15} />
                  </div>
                  <h3 className="text-base font-extrabold text-sky-950">Upstand height must meet AS 3740 and AS 4654 minimums — flashing compound must extend to the required height</h3>
                </div>
                <p className="text-sm leading-7 text-slate-700">
                  The flashing compound applied at upstands, parapet bases, and wall junctions must extend to the minimum height required by AS 3740:2021 (for balcony and wet area applications) and AS 4654.2 (for roof membrane applications). For balcony applications, the minimum upstand height is typically 150mm above the finished floor level. The flashing compound must cover the full upstand height from the base — integrating with the field membrane — to the minimum required height on the vertical face. A flashing compound that terminates below the design upstand height leaves an unsealed gap between the top of the flashing and the wall surface — a direct water ingress path. Measure and mark the minimum upstand height on the wall before applying the flashing compound, and verify the height is achieved before the system is covered.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ── Disclaimer + related links ── */}
        <section className="border-t border-slate-200 bg-slate-50 px-8 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Disclaimer</p>
              <p className="text-xs leading-6 text-amber-900">
                This page provides general technical information only. Final product selection must be confirmed against the current manufacturer technical data sheet, project specification, primary membrane system compatibility, substrate condition, UV exposure status, upstand height requirements per AS 3740:2021 and AS 4654.2, NCC requirements, and reinforcing fleece requirements. Flashing compounds are detail products used in conjunction with a primary field membrane — they do not replace the field membrane. Reinforcing fleece is mandatory at all angles and penetration perimeters with liquid flashing compounds. Do not rely on this reference as a substitute for professional waterproofing consultant advice.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  href: "/repair-systems/waterproofing-water-ingress",
                  label: "Back to Waterproofing Systems",
                  title: "Browse all waterproofing defect subcategories",
                },
                {
                  href: "/repair-systems/balcony-waterproofing-failure",
                  label: "Back to Balcony Waterproofing Failure",
                  title: "Browse all product categories for this defect",
                },
                {
                  href: "/repair-systems/balcony-waterproofing-failure/sheet-membranes-torch-on",
                  label: "Related — Torch-on SBS membranes",
                  title: "Full torch-on SBS modified bitumen membrane product reference",
                },
                {
                  href: "/ai-scope-builder/new",
                  label: "AI Scope Builder",
                  title: "Generate a scope of works for roof and balcony waterproofing remediation",
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
          <a href="/repair-systems/balcony-waterproofing-failure" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">
            ← Balcony, roof, planter box and podium waterproofing failure
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
