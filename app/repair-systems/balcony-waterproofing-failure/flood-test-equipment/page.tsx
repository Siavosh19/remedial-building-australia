import type { Metadata } from "next";
import { BookOpen, AlertTriangle, ArrowRight, Info } from "lucide-react";
import { FloodTestProductSection } from "./FloodTestProductSection";

export const metadata: Metadata = {
  title: "Flood Test Equipment and Plugs — Balcony Waterproofing — Remedial Building Australia",
  description:
    "Technical product reference for flood test equipment and drain plugs used to verify waterproofing membrane integrity on balconies and terraces in Australian Class 2 strata apartment buildings — inflatable rubber plugs, mechanical expansion plugs, integrated puddle flange plug systems, water depth gauges, and AS 3740 flood test requirements.",
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

export default function FloodTestEquipmentPage() {
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
              <span className="text-sky-950">Flood test equipment and plugs</span>
            </nav>
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — Flood Test Equipment</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  Flood test equipment and plugs
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Technical product reference for flood test equipment and drain plugs used to verify waterproofing membrane integrity on balconies and terraces in Australian Class 2 strata apartment buildings — inflatable rubber plugs, mechanical expansion plugs, integrated puddle flange plug systems, water depth gauges, and AS 3740 flood test requirements.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Products listed", value: "5" },
                  { label: "Brands covered", value: "4" },
                  { label: "Equipment types", value: "Inflatable / mechanical / integrated" },
                  { label: "Application", value: "Pre-cover membrane QA" },
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
                const active = tab.slug === "flood-test-equipment";
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

            {/* ── Intro ── */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
                  <BookOpen size={15} />
                </div>
                <h3 className="text-base font-extrabold text-sky-950">What is flood test equipment — balcony waterproofing?</h3>
              </div>
              <div className="space-y-4 text-sm leading-7 text-slate-600">
                <p>
                  Flood testing is the process of verifying the integrity of a completed waterproofing membrane before it is covered by screed, tiles, or any other finish. All drainage points in the area are sealed with flood test plugs, the area is filled with water to a minimum depth, and the water level is monitored over a minimum period — typically 24 hours — while the underside and perimeter of the balcony or terrace are inspected for any sign of water penetration. A flood test that passes confirms that the membrane is continuous, correctly applied, and watertight before it is permanently covered. A flood test that fails identifies the location of a defect while the membrane is still accessible and repairable.
                </p>
                <p>
                  Flood test equipment for balcony waterproofing remediation consists primarily of drain plugs that seal the floor waste or puddle flange outlet during the test. The plug must be capable of sealing the drain completely against the test head of water without leaking, must not damage the membrane or the drain body, and must be easily removable after the test. Drain plugs used in flood testing are available in inflatable rubber balloon formats, mechanical expansion formats, and as integrated components built into specific puddle flange systems. The correct plug type depends on the drain outlet diameter, the drain body type, and the puddle flange system installed.
                </p>
                <p>
                  Flood test documentation is a mandatory quality assurance hold point on Class 2 strata balcony waterproofing remediation projects. The test result — pass or fail, water depth, test duration, date, and inspector — must be recorded and retained as part of the project QA record. On strata remediation projects, the flood test certificate is typically required by the building manager, owners corporation, or certifier before tiling can proceed.
                </p>
              </div>
            </div>

            {/* ── Accordion + Product Cards + Comparison Table (client component) ── */}
            <FloodTestProductSection />

            {/* ── BOX 1 — RED: mandatory hold point ── */}
            <div className="rounded-2xl border border-red-200 bg-red-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-700 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-red-900">THE FLOOD TEST IS A MANDATORY HOLD POINT — DO NOT TILE BEFORE THE MEMBRANE HAS BEEN TESTED AND PASSED</h3>
              </div>
              <p className="text-sm leading-7 text-red-900">
                The flood test is a mandatory quality assurance hold point in every compliant balcony waterproofing scope on Class 2 strata buildings. Tiling must not commence until the membrane has been flood tested, the test has passed, the result has been documented, and the waterproofing consultant or certifier has confirmed the hold point is cleared. Tiling over an untested membrane permanently conceals any membrane defects — defects that would have been identifiable and repairable during the test become inaccessible after tiling and will result in water ingress that requires full tile and membrane removal to rectify. The cost of skipping the flood test is never justified by the time saved.
              </p>
            </div>

            {/* ── BOX 2 — AMBER: confirm plug seals before filling ── */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-amber-900">CONFIRM THE PLUG SEALS CORRECTLY BEFORE FILLING — DO NOT FILL OVER A LEAKING PLUG</h3>
              </div>
              <p className="text-sm leading-7 text-amber-900">
                Before filling the balcony with water, confirm that the flood test plug is correctly seated and not leaking around its perimeter. Fill the drain body immediately around the plug first and observe for 5 minutes — any water tracking past the plug into the drain pipe is a plug failure, not a membrane failure. If the plug is leaking, remove it, check the plug size against the pipe ID, re-seat or replace it, and reconfirm the seal before proceeding to fill. Filling over a leaking plug will produce a false fail result — the water level will drop due to plug leakage, not membrane deficiency — and will waste the test period.
              </p>
            </div>

            {/* ── BOX 3 — AMBER: structural load capacity ── */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-amber-900">CHECK THE STRUCTURAL LOAD CAPACITY OF THE BALCONY BEFORE FLOOD TESTING LARGE AREAS</h3>
              </div>
              <p className="text-sm leading-7 text-amber-900">
                Water at 25mm depth imposes approximately 25 kg/m² on the balcony slab. On large balcony areas, podium decks, or older strata buildings where the balcony structural capacity may be limited or unknown, confirm with the structural engineer that the flood test water load does not exceed the balcony&apos;s design imposed load before conducting the test. This is particularly important where the flood test depth is increased above 25mm or where the balcony slab is known to be in a compromised condition. Do not assume all balconies can sustain a flood test load without engineering confirmation on large or older structures.
              </p>
            </div>

            {/* ── BOX 4 — BLUE: document the flood test ── */}
            <div className="rounded-2xl border border-sky-200 bg-sky-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-700 text-white">
                  <Info size={15} />
                </div>
                <h3 className="text-base font-extrabold text-sky-900">DOCUMENT THE FLOOD TEST — A VERBAL PASS IS NOT A QA RECORD</h3>
              </div>
              <p className="text-sm leading-7 text-sky-900">
                The flood test result must be documented in writing as part of the project QA record. The flood test certificate must include: project address and balcony location, date and start and end time of the test, water depth at commencement and at the end of the test period, evaporation allowance applied, weather conditions during the test, name and licence number of the waterproofing applicator, pass or fail result, and the applicator&apos;s signature. On Class 2 strata remediation projects, the flood test certificate is typically required by the strata manager, owners corporation, or certifier before tiling proceeds. Photographs of the plug in place, the starting water level mark, and the final water level mark should be retained with the certificate.
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
                This page provides general technical information only. Final product selection and flood test procedures must be confirmed against the current AS 3740:2021 requirements, project specification, waterproofing consultant requirements, certifier requirements, drain outlet diameter, and structural engineer advice where applicable for large area flood testing. The flood test is a mandatory hold point — tiling must not commence before the membrane has been tested, passed, and the result documented. Do not rely on this reference as a substitute for professional waterproofing consultant advice.
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
