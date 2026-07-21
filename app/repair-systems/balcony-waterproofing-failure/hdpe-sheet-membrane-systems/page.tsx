import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, AlertTriangle, ArrowRight, Info } from "lucide-react";
import { SinglePlyProductSection, SinglePlyIntroSection } from "./SinglePlyProductSection";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Single-Ply Sheet Membrane Systems — Roofs and Podiums — Remedial Building Australia",
  description:
    "Technical product reference for single-ply polymeric sheet membrane systems used in roof deck, podium slab, and large terrace waterproofing remediation on Australian Class 2 strata apartment buildings — PVC sheet membranes, FPO/TPO sheet membranes, HDPE-bentonite composite systems — hot-air welded, loose-laid, and bonded systems, specialist applicator requirements, and brand comparisons.",
};

const SIBLING_GROUPS = [
  {
    heading: "Membrane Systems",
    tabs: [
      { label: "LQ PU & hybrid", slug: "liquid-applied-membranes-polyurethane" },
      { label: "LQ acrylic", slug: "liquid-applied-membranes-acrylic" },
      { label: "Torch-on sheet", slug: "sheet-membranes-torch-on" },
      { label: "Cold-applied sheet", slug: "sheet-membranes-cold-applied" },
      { label: "Cementitious flexible", slug: "cementitious-flexible-membranes" },
      { label: "HDPE (roofs/podiums)", slug: "hdpe-sheet-membrane-systems" },
      { label: "Single-ply ballasted", slug: "single-ply-membrane-systems-ballasted" },
      { label: "TPO/FPO exposed", slug: "tpo-fpo-sheet-membranes-exposed" },
      { label: "Hot melt asphalt", slug: "hot-melt-rubberised-asphalt-systems" },
    ],
  },
  {
    heading: "Preparation",
    tabs: [
      { label: "Primers", slug: "primers-bonding-agents" },
      { label: "Reinforcing fabric", slug: "reinforcing-fabric-mesh" },
      { label: "Tools", slug: "abrasives-blades-tools" },
    ],
  },
  {
    heading: "Screeds & Tile",
    tabs: [
      { label: "Screed polymer", slug: "screed-systems-polymer-modified" },
      { label: "Screed SL", slug: "screed-systems-self-levelling" },
      { label: "Tile adhesive", slug: "tile-adhesive-systems" },
      { label: "Tile sealants", slug: "tile-sealants-silicone-sanitary" },
    ],
  },
  {
    heading: "Drainage & Penetrations",
    tabs: [
      { label: "Puddle flanges", slug: "drainage-puddle-flanges-floor-wastes" },
      { label: "Linear drains", slug: "drainage-linear-grates-channel-drains" },
      { label: "Penetration collars", slug: "penetration-collars" },
      { label: "Podium outlets", slug: "drainage-podium-outlets-scuppers" },
      { label: "Edge trims", slug: "gutter-lining-systems" },
      { label: "Flashing compounds", slug: "flashing-compound-systems" },
    ],
  },
  {
    heading: "Prep & Fix",
    tabs: [
      { label: "Termination bars", slug: "membrane-termination-bars-accessories" },
    ],
  },
  {
    heading: "Joints & Movement",
    tabs: [
      { label: "Backer rod", slug: "backer-rod-bond-breaker-tape" },
      { label: "Expansion joint covers", slug: "expansion-joint-cover-systems-trafficable" },
    ],
  },
  {
    heading: "Protection & Overburden",
    tabs: [
      { label: "Protection boards", slug: "protection-boards" },
      { label: "Root resistant", slug: "root-resistant-membrane-systems" },
      { label: "Tapered insulation", slug: "tapered-insulation-board-systems" },
      { label: "Pedestals", slug: "pedestal-systems-adjustable-height" },
      { label: "Drainage cells", slug: "drainage-cell-systems" },
      { label: "Filter fabric", slug: "filter-fabric-systems" },
      { label: "Ballast", slug: "ballast-systems" },
      { label: "Vapour control layers", slug: "vapour-control-layers-warm-roof" },
    ],
  },
  {
    heading: "Upstands & Hobs",
    tabs: [
      { label: "Hobs & upstands", slug: "hobs-upstands" },
    ],
  },
  {
    heading: "Testing & QA",
    tabs: [
      { label: "Flood test", slug: "flood-test-equipment" },
    ],
  },
];

export default function HdpeSheetMembraneSystemsPage() {
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
              <Link href="/repair-systems/waterproofing-water-ingress" className="hover:text-sky-700 transition">Waterproofing Systems</Link>
              <span>/</span>
              <Link href="/repair-systems/balcony-waterproofing-failure" className="hover:text-sky-700 transition">Balcony, roof, planter box and podium waterproofing failure</Link>
              <span>/</span>
              <span className="text-sky-950">Single-ply sheet membrane systems — roofs and podiums</span>
            </nav>
            <PageNav />
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — Single-Ply Sheet Membranes</p>
                <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  Single-ply sheet membrane systems — roofs and podiums
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Technical product reference for single-ply polymeric sheet membrane systems used in roof deck, podium slab, and large terrace waterproofing remediation on Australian Class 2 strata apartment buildings — PVC sheet membranes, FPO/TPO sheet membranes, HDPE-bentonite composite systems, and specialist applicator requirements.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Products listed", value: "5" },
                  { label: "Brands covered", value: "3" },
                  { label: "Membrane types", value: "PVC / FPO-TPO / HDPE-bentonite" },
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
                      const active = tab.slug === "hdpe-sheet-membrane-systems";
                      return (
                        <Link
                          key={tab.slug}
                          href={`/repair-systems/balcony-waterproofing-failure/${tab.slug}`}
                          className={`relative shrink-0 border-b-2 px-4 py-3 text-xs font-bold whitespace-nowrap transition ${
                            active
                              ? "border-red-700 text-sky-950"
                              : "border-transparent text-slate-500 hover:text-sky-900"
                          }`}
                        >
                          {tab.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <section className="px-4 sm:px-8 py-14">
          <div className="mx-auto max-w-7xl space-y-10">

            {/* ── Intro — clean prose only ── */}
            <SinglePlyIntroSection />


            {/* ── Accordion + Product Cards + Comparison Table (client component) ── */}
            <SinglePlyProductSection />

            {/* ── BOX 1 — RED: specialist applicator ── */}
            <div className="rounded-2xl border border-red-200 bg-red-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-700 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-red-900">SINGLE-PLY SHEET MEMBRANE INSTALLATION REQUIRES SPECIALIST ACCREDITED APPLICATORS — DO NOT SPECIFY WITHOUT CONFIRMING APPLICATOR AVAILABILITY</h3>
              </div>
              <p className="text-sm leading-7 text-red-900">
                Hot-air welding of PVC and FPO/TPO single-ply sheet membranes is a specialist skill requiring calibrated welding equipment, manufacturer training, and verified installation experience. An improperly welded seam — incorrect weld temperature, speed, or pressure — may appear visually continuous but will fail under hydrostatic pressure and thermal cycling. Both Projex Group (Wolfin, Cosmofin) and Sika (Sarnafil) require installation by their accredited applicator networks and provide single-point warranties on workmanship and materials only through accredited installations. Do not specify single-ply sheet membranes without first confirming that a manufacturer-accredited applicator is available and accessible for the project location and programme. Accredited applicators are not available in all locations — confirm before specifying.
              </p>
            </div>

            {/* ── BOX 2 — RED: seam testing ── */}
            <div className="rounded-2xl border border-red-200 bg-red-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-700 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-red-900">ALL HOT-AIR WELDED SEAMS MUST BE TESTED BEFORE ANY COVERING LAYER IS INSTALLED</h3>
              </div>
              <p className="text-sm leading-7 text-red-900">
                Every hot-air welded seam on a single-ply sheet membrane installation must be tested for continuity before the protection board, drainage layer, growing medium, ballast, or paver system is installed above. Point probe testing and air lance testing are the standard seam test methods for PVC and FPO/TPO membranes. A seam that fails testing can be repaired by re-welding and re-testing before covering. A seam that is covered without testing and subsequently leaks requires full removal of all covering layers to access and repair — at significant cost. Seam testing is mandatory, not optional, on all Class 2 strata podium and roof deck remediation projects.
              </p>
            </div>

            {/* ── BOX 3 — AMBER: PVC and bitumen separation ── */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-amber-900">PVC MEMBRANES MUST BE SEPARATED FROM BITUMEN AND INCOMPATIBLE MATERIALS</h3>
              </div>
              <p className="text-sm leading-7 text-amber-900">
                PVC sheet membranes contain plasticisers that can migrate into and be extracted by contact with bituminous materials, coal tar, oils, and certain solvents. This plasticiser migration accelerates PVC degradation and can reduce the service life of the membrane. Where a PVC single-ply sheet membrane is installed over or adjacent to an existing bituminous membrane, screed, or surface treatment, a compatible separation layer must be installed between the PVC membrane and the bituminous material. Confirm the required separation layer type and thickness with the membrane manufacturer (Projex Group or Sika) before installing. Wolfin GWSK has a bitumen-compatible self-adhesive layer specifically designed for bonding over existing bituminous surfaces — confirm with Projex Group whether a separation layer is still required in specific circumstances.
              </p>
            </div>

            {/* ── BOX 4 — BLUE: HDPE disambiguation ── */}
            <div className="rounded-2xl border border-sky-200 bg-sky-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-700 text-white">
                  <Info size={15} />
                </div>
                <h3 className="text-base font-extrabold text-sky-900">DO NOT CONFUSE HDPE-BENTONITE COMPOSITE MEMBRANES WITH PVC AND FPO SINGLE-PLY ROOF MEMBRANES</h3>
              </div>
              <p className="text-sm leading-7 text-sky-900">
                HDPE-bentonite composite sheets (such as Tremco Paraseal LG) are below-grade waterproofing products — they require confining pressure from overburden or structural concrete to activate and maintain the bentonite seal. They are not UV stable and are not designed for exposed roof deck, podium surface, or above-grade applications. The tab title references HDPE sheet membranes, but the primary single-ply products used on Australian roof decks and podium slabs are PVC and FPO/TPO sheet membranes — not HDPE-bentonite composites. Select the correct product type for the application: PVC or FPO/TPO for exposed roof and podium; HDPE-bentonite for below-grade and subsoil.
              </p>
            </div>

          </div>
        </section>

        {/* ── Disclaimer + related links ── */}
        <section className="border-t border-slate-200 bg-slate-50 px-4 sm:px-8 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Disclaimer</p>
              <p className="text-xs leading-6 text-amber-900">
                This page provides general technical information only. Final product selection must be confirmed against the current manufacturer technical data sheet, project specification, substrate condition, drainage design, structural loading, wind uplift design, AS 4654.1 and AS 4654.2 requirements, NCC requirements, and waterproofing consultant advice. Single-ply sheet membrane installation requires manufacturer-accredited specialist applicators — do not specify without confirming accredited applicator availability. All hot-air welded seams must be tested before covering. Do not rely on this reference as a substitute for professional waterproofing consultant or structural engineer advice.
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
                  href: "/defect-library/waterproofing-water-ingress/balcony-waterproofing-failure",
                  label: "Defect Library",
                  title: "Balcony Waterproofing Failure — causes, inspection, methodology",
                },
                {
                  href: "/ai-scope-builder",
                  label: "AI Scope Builder",
                  title: "Generate a scope of works for roof and podium waterproofing remediation",
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
      <SeoCrossPromo />

      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <Link href="/repair-systems/balcony-waterproofing-failure" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">
            ← Balcony, roof, planter box and podium waterproofing failure
          </Link>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">
              A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.
            </p>
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
