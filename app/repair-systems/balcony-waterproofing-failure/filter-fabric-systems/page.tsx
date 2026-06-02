import type { Metadata } from "next";
import { BookOpen, AlertTriangle, ArrowRight } from "lucide-react";
import { FilterFabricProductSection } from "./FilterFabricProductSection";

export const metadata: Metadata = {
  title: "Filter Fabric Systems — Planter Boxes and Podiums — Balcony Waterproofing — Remedial Building Australia",
  description:
    "Technical product reference for geotextile filter fabric systems used in planter box, green roof, and podium slab waterproofing remediation on Australian Class 2 strata apartment buildings — non-woven polypropylene and polyester geotextiles, GSM weight selection, filtration vs separation functions, installation position, lap and upstand requirements, and brand comparisons.",
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
  { label: "Balcony edge trims", slug: "gutter-lining-systems" },
  { label: "Flashing compounds (roofs)", slug: "flashing-compound-systems" },
];

export default function FilterFabricSystemsPage() {
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
              <span className="text-sky-950">Filter fabric systems — planter boxes and podiums</span>
            </nav>
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — Protection &amp; Overburden</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  Filter fabric systems — planter boxes and podiums
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Technical product reference for geotextile filter fabric systems used in planter box, green roof, and podium slab waterproofing remediation on Australian Class 2 strata apartment buildings.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Products listed", value: "5" },
                  { label: "Brands covered", value: "4" },
                  { label: "Materials", value: "Non-woven PP / polyester" },
                  { label: "Categories", value: "Planter box and podium filtration" },
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
                const active = tab.slug === "filter-fabric-systems";
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

            {/* Intro */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
                  <BookOpen size={15} />
                </div>
                <h3 className="text-base font-extrabold text-sky-950">What are filter fabric systems — planter boxes and podiums?</h3>
              </div>
              <div className="space-y-4 text-sm leading-7 text-slate-600">
                <p>
                  Geotextile filter fabrics are permeable, non-woven synthetic textile sheets placed between the growing medium and the drainage layer in planter boxes, green roofs, and landscaped podium slabs. Their primary function is filtration — allowing water to pass freely downward through the fabric from the growing medium into the drainage cell or aggregate layer below, while retaining fine soil particles that would otherwise migrate down and progressively clog the drainage void. Without filter fabric, fine particles from the growing medium migrate into the drainage layer with every irrigation and rainfall event — accumulating over time until the drainage void is clogged, waterlogging the growing medium above and creating hydrostatic pressure against the waterproofing membrane below.
                </p>
                <p>
                  Filter fabrics also perform a separation function — maintaining a clean interface between the growing medium and the drainage layer, preventing the two from intermixing under the compression of plant roots, foot traffic, and settling over time. In planter box applications on Class 2 strata buildings, filter fabric must be continuous across the full floor area of the planter box and lapped up the planter box walls above the drainage layer — without a full perimeter lap up the walls, soil particles can bypass the fabric at the edges and enter the drainage void.
                </p>
                <p>
                  Geotextile filter fabrics for planter box and podium slab applications are almost universally non-woven — manufactured by needle-punching polypropylene or polyester fibres into a three-dimensional mat structure that provides high porosity, high flow rate, and particle retention simultaneously. Non-woven geotextiles are selected over woven fabrics for these applications because their randomised three-dimensional fibre structure prevents particle blinding — where fine particles become lodged in the regular openings of a woven fabric and progressively seal it. The correct GSM (grams per square metre) weight of filter fabric is selected based on the growing medium particle size distribution, the drainage design flow rate, and the loading conditions above.
                </p>
              </div>
            </div>

            {/* Interactive: accordion + product grid + comparison table */}
            <FilterFabricProductSection />

            {/* ── Warning boxes — below comparison table only ── */}

            {/* Box 1 — Red (critical) */}
            <div className="rounded-2xl border border-red-200 bg-red-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-red-900">FILTER FABRIC WITHOUT A FULL PERIMETER WALL LAP WILL FAIL — SOIL BYPASSES THE FABRIC AT THE EDGES</h3>
              </div>
              <p className="text-sm leading-7 text-red-900">
                Filter fabric placed flat across the floor of a planter box without lapping up the walls will be bypassed by soil at every edge — fine particles migrate around the perimeter of the fabric and into the drainage cell void below. This progressive edge bypass defeats the entire purpose of the filter fabric, clogging the drainage void from the perimeter inward over time. Filter fabric must be lapped up all four planter walls to a minimum height of 150mm above the top of the drainage cell layer. Secure the fabric to the wall at the top of the lap with tape, staples, or mechanical fixings before growing medium is placed — once growing medium is placed against an unsecured lap, the lap cannot be corrected without removing the growing medium.
              </p>
            </div>

            {/* Box 2 — Red (critical) */}
            <div className="rounded-2xl border border-red-200 bg-red-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-red-900">DO NOT USE WOVEN GEOTEXTILE AS FILTER FABRIC IN PLANTER BOX OR GROWING MEDIUM APPLICATIONS</h3>
              </div>
              <p className="text-sm leading-7 text-red-900">
                Woven geotextiles have a regular grid aperture that progressively blinds under the fine particle load of growing medium, potting mix, and soil — fine particles become lodged in the regular openings and seal the fabric over time, eliminating drainage function. Non-woven needle-punched geotextiles have a randomised three-dimensional fibre structure that resists blinding under fine particle loading. All filter fabric specified above drainage cells in planter boxes and roof gardens must be non-woven. Do not substitute woven geotextile — shade cloth, landscape fabric, or similar products — for non-woven geotextile filter fabric in drainage cell applications.
              </p>
            </div>

            {/* Box 3 — Amber (warning) */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-amber-900">ADJACENT ROLLS MUST OVERLAP MINIMUM 300MM — BUTT JOINTS ALLOW SOIL BYPASS</h3>
              </div>
              <p className="text-sm leading-7 text-amber-900">
                Where two adjacent rolls of filter fabric meet, the rolls must overlap by a minimum of 300mm — not butt-jointed edge to edge. A butt joint between two rolls creates an unsealed line gap through which fine particles can migrate from the growing medium directly into the drainage void below. Overlapping rolls by 300mm ensures that fine particles cannot find a path through the lap regardless of how the fabric settles under the growing medium weight. Mark the 300mm overlap line on the first roll before placing the second roll — do not rely on visual estimation to achieve the required overlap.
              </p>
            </div>

            {/* Box 4 — Blue (informational) */}
            <div className="rounded-2xl border border-sky-200 bg-sky-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
                  <BookOpen size={15} />
                </div>
                <h3 className="text-base font-extrabold text-sky-950">FILTER FABRIC IS THE FINAL LAYER BEFORE GROWING MEDIUM — CONFIRM THE FULL DRAINAGE SYSTEM IS COMPLETE BEFORE PLACING FABRIC</h3>
              </div>
              <p className="text-sm leading-7 text-slate-700">
                Filter fabric is the last installed component before growing medium is placed. Once the filter fabric is in position and growing medium is placed above it, all layers below — drainage cells, protection board, and waterproofing membrane — are permanently inaccessible without full removal of the growing medium and fabric. Confirm that the waterproofing membrane has been flood-tested and passed, the drainage cells are correctly positioned and cover the full floor area, the drainage outlets are correctly installed and unobstructed, and the filter fabric is correctly lapped at all walls before growing medium placement commences. Do not place growing medium over filter fabric until every lower layer has been inspected and confirmed correct.
              </p>
            </div>

          </div>
        </section>

        {/* ── Disclaimer + related links ── */}
        <section className="border-t border-slate-200 bg-slate-50 px-8 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Disclaimer</p>
              <p className="text-xs leading-6 text-amber-900">
                This page provides general technical information only. Final product selection must be confirmed against the current manufacturer technical data sheet, project specification, growing medium particle size distribution, hydraulic design flow rate, loading conditions, GSM requirements, landscape architect specification, and NCC requirements. Filter fabric must be non-woven — not woven. Filter fabric must be lapped up all planter walls minimum 150mm above the drainage cell layer. Adjacent rolls must overlap minimum 300mm. Once growing medium is placed, all layers below the filter fabric are permanently inaccessible. Do not rely on this reference as a substitute for professional hydraulic engineer, landscape architect, or waterproofing consultant advice.
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
                  href: "/repair-systems/balcony-waterproofing-failure/drainage-cell-systems",
                  label: "Drainage Cell Systems",
                  title: "Drainage cells for planter boxes — used below filter fabric",
                },
                {
                  href: "/ai-scope-builder/new",
                  label: "AI Scope Builder",
                  title: "Generate a scope of works for balcony waterproofing remediation",
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
