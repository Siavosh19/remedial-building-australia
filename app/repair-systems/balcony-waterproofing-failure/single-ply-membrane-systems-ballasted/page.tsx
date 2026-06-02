import type { Metadata } from "next";
import { BookOpen, AlertTriangle, ArrowRight } from "lucide-react";
import { SinglePlyBallastProductSection, SinglePlyIntroSection } from "./SinglePlyBallastProductSection";

export const metadata: Metadata = {
  title: "Single-Ply Ballasted Membrane Systems — Roofs and Podiums — Remedial Building Australia",
  description:
    "Technical product reference for single-ply ballasted waterproofing membrane systems used on roof decks and podium slabs in Australian Class 2 strata apartment buildings — loose-laid PVC and FPO/TPO membranes held by pebble or paver ballast — Wolfin IB, Cosmofin, Fatrafol 810v, and Sarnafil G 410 ballasted configurations — hot-air welded seams, Wolfinsteel perimeter profiles, accredited applicator requirements, and system comparisons.",
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

export default function SinglePlyBallastedMembranesPage() {
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
              <span className="text-sky-950">Single-ply membranes (ballasted)</span>
            </nav>
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — Roof &amp; Podium Waterproofing</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  Single-ply ballasted membrane systems — roofs and podiums
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Technical product reference for loose-laid PVC single-ply membranes held by pebble or paver ballast — Wolfin IB, Cosmofin, Fatrafol 810v, and Sarnafil G 410 in ballasted configurations — hot-air welded seams — accredited applicator required.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Products listed", value: "4" },
                  { label: "Brands covered", value: "3" },
                  { label: "Membrane type", value: "PVC / FPO — loose-laid ballasted" },
                  { label: "Applications", value: "Roof deck and podium slab waterproofing" },
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
                const active = tab.slug === "single-ply-membrane-systems-ballasted";
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
            <SinglePlyIntroSection />

            {/* Interactive: accordion + product grid + comparison table */}
            <SinglePlyBallastProductSection />

            {/* ── Warning boxes — below comparison table only ── */}

            {/* Box 1 — Red (critical) */}
            <div className="rounded-2xl border border-red-200 bg-red-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-red-900">ACCREDITED APPLICATOR REQUIRED FOR ALL PRODUCTS ON THIS PAGE — DO NOT SPECIFY WITHOUT CONFIRMING AVAILABILITY</h3>
              </div>
              <p className="text-sm leading-7 text-red-900">
                Every single-ply ballasted membrane system on this page requires installation by a manufacturer-accredited specialist applicator with calibrated hot-air welding equipment, manufacturer training, and verified system installation experience. Projex Group (Wolfin, Cosmofin), Fatra Australia (Fatrafol), and Sika (Sarnafil) all mandate accredited installation as a condition of the system warranty. An incorrectly welded seam — wrong temperature, speed, or pressure — will appear continuous but will fail under hydrostatic pressure and thermal cycling. Accredited applicators are not available in all locations in Australia. Confirm accredited applicator availability in the project location before including any of these products in a project specification. Do not specify a product if an accredited applicator cannot be confirmed.
              </p>
            </div>

            {/* Box 2 — Red (critical) */}
            <div className="rounded-2xl border border-red-200 bg-red-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-red-900">ALL SEAMS MUST BE TESTED AND CONFIRMED BEFORE BALLAST IS PLACED — SEAMS CANNOT BE ACCESSED AFTER BALLASTING</h3>
              </div>
              <p className="text-sm leading-7 text-red-900">
                Once pebble or paver ballast is placed over the membrane, the membrane surface and all hot-air welded seams are permanently inaccessible without full ballast removal — a major cost and programme disruption on an occupied strata building. All seams must be tested using point probe or air lance methods immediately after welding, before any ballast is placed. Every failed seam must be repaired and re-tested before the ballasting sequence continues. The accredited applicator must document all seam test results as part of the project quality record before the installation is signed off and covered. This is a mandatory hold point — not an optional QA step.
              </p>
            </div>

            {/* Box 3 — Amber (warning) */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-amber-900">BALLAST MATERIALS, WEIGHTS, AND ZONE REQUIREMENTS ARE ON THE BALLAST SYSTEMS PAGE — NOT THIS PAGE</h3>
              </div>
              <p className="text-sm leading-7 text-amber-900">
                This page covers the membrane products used in single-ply ballasted systems. The ballast materials — washed river pebble and precast concrete pavers — including minimum weights, depth requirements, zone design (field, perimeter, and corner), wind uplift analysis requirements, and structural loading confirmation, are covered on the Ballast Systems page. Both pages must be consulted together when specifying a single-ply ballasted roof or podium system. The membrane and the ballast are separate specifications — neither is complete without the other.
              </p>
            </div>

            {/* Box 4 — Blue (informational) */}
            <div className="rounded-2xl border border-sky-200 bg-sky-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
                  <BookOpen size={15} />
                </div>
                <h3 className="text-base font-extrabold text-sky-950">ARDEX WPM 715 IS NOT A BALLASTED MEMBRANE — IT IS AN EXPOSED UV-RESISTANT SINGLE-PLY MEMBRANE</h3>
              </div>
              <p className="text-sm leading-7 text-slate-700">
                ARDEX WPM 715 (Weldtec) is an exposed, UV-resistant, heat-weldable single-ply membrane designed for roofs and decks where the membrane is left exposed to UV and the elements. ARDEX does not publish a ballasted system specification for WPM 715. Ballasting WPM 715 would cover a membrane that is specifically designed and warranted for exposed use. If WPM 715 is being considered for a project, it should be specified as an exposed membrane — not in a ballasted configuration. For ballasted single-ply systems, specify one of the four products on this page. For exposed single-ply membrane applications, refer to the HDPE Sheet Membranes (roofs/podiums) page or confirm with ARDEX Australia whether WPM 715 has a separate page on this site.
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
                This page provides general technical information only. Final product selection must be confirmed against the current manufacturer technical data sheet, project specification, substrate condition, wind uplift analysis per AS/NZS 1170.2, structural engineer confirmation of slab dead load capacity, AS 4654.1 compliance requirements, NCC requirements, and accredited applicator availability. All hot-air welded seams must be tested before ballast is placed. Ballast materials, weights, and zone requirements are covered on the Ballast Systems page — both pages must be consulted together when specifying a single-ply ballasted system. Do not rely on this reference as a substitute for professional waterproofing consultant or structural engineer advice.
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
                  href: "/repair-systems/balcony-waterproofing-failure/ballast-systems",
                  label: "Ballast Systems",
                  title: "Washed river pebble and precast concrete paver ballast — wind uplift analysis, zone design, and structural loading",
                },
                {
                  href: "/repair-systems/balcony-waterproofing-failure/tapered-insulation-board-systems",
                  label: "Tapered Insulation Board Systems",
                  title: "Tapered insulation for inverted ballasted roof systems — PIR / XPS / mineral wool",
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
