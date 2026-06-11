import type { Metadata } from "next";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { DrainageProductSection, DrainageIntroSection } from "./DrainageProductSection";

export const metadata: Metadata = {
  title: "Puddle Flanges and Floor Wastes — Balcony Waterproofing Repair — Remedial Building Australia",
  description:
    "Technical product reference for puddle flanges and floor wastes used in balcony and terrace waterproofing remediation on Australian Class 2 strata apartment buildings — material selection, membrane integration, installation sequence, adjustable height systems, brand comparisons, and AS/NZS 3500 requirements.",
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
    heading: "Testing & QA",
    tabs: [
      { label: "Flood test", slug: "flood-test-equipment" },
    ],
  },
];

export default function DrainagePuddleFlangesPage() {
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
              <span className="text-sky-950">Puddle flanges and floor wastes</span>
            </nav>
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — Drainage</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  Puddle flanges and floor wastes — balcony waterproofing
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Technical product reference for puddle flanges and floor wastes used in balcony and terrace waterproofing remediation. Covers material selection, membrane system compatibility, height setting, installation sequence, brand comparisons, and compliance requirements for Australian Class 2 strata buildings.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Products listed", value: "5" },
                  { label: "Brands covered", value: "3" },
                  { label: "Materials", value: "PVC / stainless / brass" },
                  { label: "Function", value: "Membrane-integrated drainage" },
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
                      const active = tab.slug === "drainage-puddle-flanges-floor-wastes";
                      return (
                        <a
                          key={tab.slug}
                          href={`/repair-systems/balcony-waterproofing-failure/${tab.slug}`}
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

            {/* What is it */}
            <DrainageIntroSection />

            {/* Interactive: accordion + product grid + comparison table */}
            <DrainageProductSection />

            {/* Do not confuse with */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-amber-900">Do not confuse puddle flanges with:</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Standard floor waste strainers — a strainer or grate alone is not a membrane integration fitting; a puddle flange body is required beneath the strainer to integrate the membrane",
                  "Linear channel drains — linear drainage systems use a different integration methodology and are not interchangeable with puddle flanges for central or offset waste configurations",
                  "Penetration collars — penetration collars seal pipe penetrations through the membrane field (pipes, conduit, posts); puddle flanges integrate the membrane at the drainage outlet specifically",
                  "Overflow scuppers — overflow relief scuppers are a secondary drainage device at balcony thresholds; they serve a different function from the primary puddle flange waste",
                  "Standard PVC pipe fittings — a plain PVC pipe fitting or reducer is not a waterproofing puddle flange; purpose-manufactured flanges with a bonding or clamping flap are required for compliant membrane integration",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-6 text-amber-900">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </section>

        {/* ── Disclaimer + related links ── */}
        <section className="border-t border-slate-200 bg-slate-50 px-8 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Disclaimer</p>
              <p className="text-xs leading-6 text-amber-900">
                This page provides general technical information only. Final product selection must be confirmed against the current manufacturer technical data sheet, project specification, membrane system compatibility, substrate condition, drainage design, floor waste sizing, AS 3740:2021 requirements, AS/NZS 3500.3 requirements, NCC requirements, and hydraulic engineer advice where applicable. Do not rely on this reference as a substitute for professional waterproofing consultant or hydraulic engineer advice.
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
                  href: "/repair-systems/balcony-waterproofing-failure/drainage-linear-grates-channel-drains",
                  label: "Related — Linear Drainage",
                  title: "Linear grates and channel drains — balcony waterproofing",
                },
                {
                  href: "/defect-library/waterproofing-water-ingress/balcony-waterproofing-failure",
                  label: "Defect Library",
                  title: "Balcony Waterproofing Failure — causes, inspection, methodology",
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
