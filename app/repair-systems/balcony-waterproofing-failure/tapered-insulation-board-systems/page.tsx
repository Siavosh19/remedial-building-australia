import type { Metadata } from "next";
import { BookOpen, AlertTriangle, Info, ArrowRight } from "lucide-react";
import { TaperedInsulationProductSection } from "./TaperedInsulationProductSection";

export const metadata: Metadata = {
  title: "Tapered Insulation Board Systems — Roofs and Podiums — Remedial Building Australia",
  description:
    "Technical product reference for tapered insulation board systems — PIR, XPS, and mineral wool — used on roof decks and podium slabs in Australian Class 2 strata apartment buildings — warm roof and inverted roof assemblies, falls creation within the insulation layer, condensation risk, vapour control layers, NCC Section J compliance, and brand comparisons.",
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
  { label: "Gutter lining (roofs)", slug: "gutter-lining-systems" },
  { label: "Flashing compounds (roofs)", slug: "flashing-compound-systems" },
];

export default function TaperedInsulationBoardSystemsPage() {
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
              <span className="text-sky-950">Tapered insulation board systems — roofs and podiums</span>
            </nav>
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — Insulation and Falls</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  Tapered insulation board systems — roofs and podiums
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Technical product reference for tapered insulation board systems used on roof decks and podium slabs. Covers warm roof and inverted roof assemblies, PIR vs XPS vs mineral wool selection, falls creation, vapour control layers, condensation risk, NCC Section J compliance, and Australian brand comparisons.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Products listed",  value: "6" },
                  { label: "Brands covered",   value: "4" },
                  { label: "System types",     value: "PIR / XPS / mineral wool" },
                  { label: "Applications",     value: "Warm roof and inverted roof insulation" },
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
                const active = tab.slug === "tapered-insulation-board-systems";
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

            {/* Intro — clean prose only */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
                  <BookOpen size={15} />
                </div>
                <h3 className="text-base font-extrabold text-sky-950">What are tapered insulation board systems — roofs and podiums?</h3>
              </div>
              <div className="space-y-4 text-sm leading-7 text-slate-600">
                <p>
                  Tapered insulation board systems are rigid thermal insulation panels manufactured with a pre-cut slope — a taper — that creates a drainage fall across a flat or near-flat roof deck or podium slab without the need for a sloped concrete screed or structural fall in the slab. By varying the thickness of adjacent boards across the roof or podium area, the insulation layer itself creates the required drainage gradient from the high point of the deck to the outlets. This eliminates the weight, labour, and drying time of a concrete falls screed, and in remediation projects avoids the structural load implications of adding a thick screed over an existing flat slab.
                </p>
                <p>
                  In Australian Class 2 strata remediation, tapered insulation systems are specified on roof decks and podium slabs where the existing concrete slab is structurally flat or has insufficient drainage fall, where the waterproofing system is a warm roof assembly (insulation above the membrane) and falls correction within the build-up is required, and where NCC Section J thermal performance requirements must be met as part of the remediation scope. Tapered insulation also provides thermal performance benefits that reduce condensation risk within the roof or podium build-up — an important consideration on concrete deck structures above habitable spaces in Australian strata buildings.
                </p>
                <p>
                  Tapered insulation board systems are available in three primary materials: PIR (polyisocyanurate) rigid foam, XPS (extruded polystyrene) rigid foam, and mineral wool. Each material has different thermal performance, compressive strength, moisture resistance, and fire performance characteristics that determine suitability for warm roof, inverted roof, and podium slab applications. Tapered insulation is a design and manufacture exercise specific to each project — the board layout, taper angle, and board thickness at each point on the deck must be designed to achieve the required fall to the drainage outlets before boards are cut and supplied.
                </p>
              </div>
            </div>

            {/* Client component: accordion + product cards + comparison table */}
            <TaperedInsulationProductSection />

            {/* ── All warning and callout boxes — below comparison table only ── */}

            {/* Box 1 — Red: do not use PIR in inverted roof above membrane */}
            <div className="rounded-2xl border border-red-200 bg-red-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-700 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-red-900">DO NOT USE PIR INSULATION IN AN INVERTED ROOF ASSEMBLY ABOVE THE WATERPROOFING MEMBRANE</h3>
              </div>
              <p className="text-sm leading-7 text-red-900">
                PIR (polyisocyanurate) insulation is designed for warm roof assemblies where it is positioned below the waterproofing membrane, protected from moisture by the membrane and VCL below. PIR is not suitable for inverted roof (protected membrane) assemblies where the insulation is positioned above the waterproofing membrane and is exposed to moisture draining through the ballast, paver, or growing medium layers above. In permanently wet above-membrane conditions, PIR absorbs moisture over time, degrading thermal performance and potentially causing structural issues. The correct insulation for inverted roof assemblies above the waterproofing membrane is XPS — which has a closed-cell structure that resists moisture absorption. Do not substitute PIR for XPS in an inverted roof assembly without specific manufacturer and building physicist confirmation.
              </p>
            </div>

            {/* Box 2 — Red: VCL mandatory in warm roof over habitable spaces */}
            <div className="rounded-2xl border border-red-200 bg-red-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-700 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-red-900">A VAPOUR CONTROL LAYER IS MANDATORY IN WARM ROOF ASSEMBLIES OVER HABITABLE SPACES — OMISSION CAUSES INTERSTITIAL CONDENSATION</h3>
              </div>
              <p className="text-sm leading-7 text-red-900">
                In a warm roof assembly over a habitable space (occupied apartments, car parks with habitable floors above), warm moist air from below will rise through the structural deck and condense within the insulation layer if a vapour control layer (VCL) is not installed between the deck and the insulation. Interstitial condensation within the insulation degrades thermal performance, causes moisture damage to the structure, and may result in mould growth on the underside of the deck. A VCL — typically a self-adhesive bituminous sheet, reinforced polyethylene, or aluminium-foil-faced board — must be installed on the warm side of the insulation (between the deck and the insulation) in all warm roof assemblies over habitable spaces. Confirm the VCL specification with a building physicist or the insulation system designer before specifying.
              </p>
            </div>

            {/* Box 3 — Amber: bespoke manufactured product */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-amber-900">TAPERED INSULATION IS A BESPOKE MANUFACTURED PRODUCT — THE LAYOUT MUST BE DESIGNED BEFORE ORDERING</h3>
              </div>
              <p className="text-sm leading-7 text-amber-900">
                Tapered insulation boards are not stocked items that can be ordered off the shelf and cut on site. The taper profile, board thickness at each position, fall direction, ridges, valleys, and hips in the insulation layout must be designed by the insulation manufacturer or a roof drainage engineer based on the roof or podium geometry, outlet positions, and required fall. The designed layout is then used to manufacture boards with the correct taper for each board position, labelled for site placement. This design and manufacture process takes time — confirm lead times with the supplier well before the project installation programme. Do not order tapered insulation without a confirmed layout design — once boards are cut to a specific layout they cannot be repositioned to a different plan.
              </p>
            </div>

            {/* Box 4 — Blue: confirm NCC Section J */}
            <div className="rounded-2xl border border-sky-200 bg-sky-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-700 text-white">
                  <Info size={15} />
                </div>
                <h3 className="text-base font-extrabold text-sky-900">CONFIRM NCC SECTION J REQUIREMENTS BEFORE SPECIFYING INSULATION THICKNESS</h3>
              </div>
              <p className="text-sm leading-7 text-sky-900">
                NCC Section J sets minimum thermal performance (R-value) requirements for roof and podium deck assemblies in Class 2 strata buildings. In remediation projects, confirm with the building certifier and a thermal performance assessor whether the remediation scope triggers a Section J upgrade requirement and what R-value must be achieved. The required R-value determines the insulation type and minimum thickness — do not assume a standard insulation thickness will meet Section J requirements without a thermal performance calculation. Different insulation materials (PIR, XPS, mineral wool) achieve different R-values at the same thickness — confirm the material and thickness against the calculated required R-value before specifying.
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
                This page provides general technical information only. Final product selection must be confirmed against the current manufacturer technical data sheet, project specification, roof assembly type (warm or inverted), structural loading, compressive strength requirements, NCC Section J thermal performance requirements, vapour control layer specification, condensation risk analysis, drainage design, fire performance requirements, and building certifier requirements. Tapered insulation requires bespoke project-specific design before manufacture and ordering — confirm lead times with the supplier before committing to programme dates. Do not rely on this reference as a substitute for professional building physicist, thermal performance assessor, structural engineer, or waterproofing consultant advice.
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
            ← Balcony Waterproofing Failure
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
