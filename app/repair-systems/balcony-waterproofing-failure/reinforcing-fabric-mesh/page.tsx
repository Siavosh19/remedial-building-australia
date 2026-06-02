import type { Metadata } from "next";
import { BookOpen, ArrowRight } from "lucide-react";
import { ReinforcingFabricProductSection } from "./ReinforcingFabricProductSection";

export const metadata: Metadata = {
  title: "Reinforcing Fabric and Mesh — Waterproofing — Balcony Waterproofing Repair — Remedial Building Australia",
  description:
    "Technical product reference for reinforcing fabric and mesh used in balcony and terrace waterproofing remediation on Australian Class 2 strata apartment buildings — woven polyester fabric, non-woven polyester fabric, fibreglass mesh, and self-adhesive bandage tape — junction reinforcement, membrane system compatibility, mandatory locations, and brand comparisons.",
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

export default function ReinforcingFabricMeshPage() {
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
              <span className="text-sky-950">Reinforcing fabric and mesh</span>
            </nav>
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 01</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  Reinforcing fabric and mesh — waterproofing
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Technical product reference for reinforcing fabric and mesh used in balcony and terrace waterproofing remediation. Covers woven polyester fabric, non-woven polyester fabric, fibreglass mesh, and self-adhesive bandage tape — mandatory junction reinforcement locations, membrane system compatibility, installation method, and brand comparisons for Australian Class 2 strata building applications.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Products listed", value: "5" },
                  { label: "Brands covered", value: "2" },
                  { label: "Types", value: "Woven / fibreglass / non-woven / bandage" },
                  { label: "System position", value: "Mandatory junction reinforcement" },
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
                const active = tab.slug === "reinforcing-fabric-mesh";
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

            {/* Intro — clean prose only, no boxes */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
                  <BookOpen size={15} />
                </div>
                <h3 className="text-base font-extrabold text-sky-950">What are reinforcing fabric and mesh — waterproofing?</h3>
              </div>
              <div className="space-y-5 text-sm leading-7 text-slate-600">
                <p>
                  Reinforcing fabric and mesh are materials embedded into the wet waterproofing membrane at junctions, corners, changes of plane, cracks, and around penetrations during membrane application. Their function is to build membrane thickness and continuity at locations where the substrate geometry creates stress concentrations — internal and external corners, wall-to-floor junctions, construction joints, and pipe and drain penetrations. At these locations, a single coat of liquid-applied membrane is insufficient without reinforcement — the fabric or mesh carries the membrane across the junction and prevents cracking, splitting, and delamination under the thermal movement and substrate deflection that all external balcony and terrace slabs experience.
                </p>
                <p>
                  In liquid-applied membrane systems, the reinforcing fabric is embedded between coats — a first coat of membrane is applied to the junction, the fabric is pressed into the wet membrane so it is fully saturated from below, and a second coat is applied over the top to fully encapsulate the fabric. The result is a reinforced membrane layer at the junction that is significantly thicker and more crack-resistant than the field membrane alone. Reinforcing fabric used in this way is a mandatory component of all compliant liquid-applied membrane systems on external balconies — it is not optional and its omission is a common cause of membrane failure at junctions.
                </p>
                <p>
                  Different fabric types — woven polyester, non-woven polyester, fibreglass mesh, and self-adhesive bandage tape — suit different membrane systems and junction types. The correct fabric type must be specified to match the membrane system being applied. Each membrane manufacturer specifies which reinforcing fabric is approved for use in their system.
                </p>
              </div>
            </div>

            {/* Interactive: accordion + product carousel + comparison table + warning boxes */}
            <ReinforcingFabricProductSection />

          </div>
        </section>

        {/* ── Disclaimer + related links ── */}
        <section className="border-t border-slate-200 bg-slate-50 px-8 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Disclaimer</p>
              <p className="text-xs leading-6 text-amber-900">
                This page provides general technical information only. Final product selection must be confirmed against the current manufacturer technical data sheet, membrane system specification, junction type, substrate condition, AS 3740:2021 requirements, and NCC requirements. Junction reinforcement with compatible reinforcing fabric is mandatory at all internal and external angles, changes of plane, and pipe penetrations in liquid-applied membrane systems — its omission is a non-compliant installation. Do not rely on this reference as a substitute for professional waterproofing consultant advice.
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
                  href: "/repair-systems/balcony-waterproofing-failure/liquid-applied-membranes-polyurethane",
                  label: "PU and Hybrid Membranes",
                  title: "Liquid-applied polyurethane and hybrid waterproofing systems",
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
