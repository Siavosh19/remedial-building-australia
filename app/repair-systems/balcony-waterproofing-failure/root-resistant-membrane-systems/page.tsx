import type { Metadata } from "next";
import { BookOpen, AlertTriangle, Info, ArrowRight } from "lucide-react";
import { RootResistantProductSection } from "./RootResistantProductSection";

export const metadata: Metadata = {
  title: "Root Resistant Membrane Systems — Planter Boxes and Podiums — Remedial Building Australia",
  description:
    "Technical product reference for root resistant membrane systems used in planter box and green roof waterproofing in Australian Class 2 strata apartment buildings — FLL-certified polyolefin and PVC sheet membranes, liquid-applied PU with anti-root additive, torch-on anti-root cap sheets, chemical root inhibition, brand comparisons, and Australian market availability.",
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

export default function RootResistantMembraneSystemsPage() {
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
              <span className="text-sky-950">Root resistant membrane systems — planter boxes and podiums</span>
            </nav>
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — Specialist Membranes</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  Root resistant membrane systems — planter boxes and podiums
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Technical product reference for root resistant waterproofing membranes used in planter box and green roof remediation. Covers FLL certification, root resistance mechanisms, sheet versus liquid-applied selection, high-risk plant species, protection board and system build-up, and Australian brand comparisons.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Products listed",  value: "6" },
                  { label: "Brands covered",   value: "4" },
                  { label: "System types",     value: "Sheet / liquid-applied / modified bitumen" },
                  { label: "Applications",     value: "Planter box and green roof waterproofing" },
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
                const active = tab.slug === "root-resistant-membrane-systems";
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
                <h3 className="text-base font-extrabold text-sky-950">What are root resistant membrane systems — planter boxes and podiums?</h3>
              </div>
              <div className="space-y-4 text-sm leading-7 text-slate-600">
                <p>
                  Root resistant membrane systems are waterproofing membranes specifically designed and tested to resist penetration by plant roots over the life of a planter box or green roof installation. Standard waterproofing membranes — whether liquid-applied polyurethane, torch-on modified bitumen, or PVC single-ply — are not designed to resist root penetration. Plant roots, particularly from woody shrubs, trees, and aggressive species such as bamboo and some ornamental grasses, exert significant mechanical pressure and produce organic acids and enzymes that can penetrate and degrade a standard membrane over time, leading to water ingress through the structural podium slab or roof deck below. Root resistant membranes address this by providing either a physical barrier through a dense, root-impenetrable material (typically weldable polypropylene or PVC), a chemical barrier through a root inhibitor compound (typically Preventol B2) incorporated into the membrane, or a combination of both mechanisms.
                </p>
                <p>
                  The definitive performance standard for root resistance is the FLL Guideline — published by the German Forschungsgesellschaft Landschaftsentwicklung Landschaftsbau (FLL) — which defines a standardised test protocol for root and rhizome penetration resistance. Products that carry FLL root resistance certification have been independently tested and confirmed to resist root penetration through the membrane under the FLL test conditions. In the Australian market, FLL certification is the primary basis for specifying a membrane as root resistant. Products without FLL certification should not be specified as root resistant waterproofing in planter box or green roof applications regardless of manufacturer claims. The AS 4654 series covers waterproofing of wet areas including roofs, but FLL certification specifically addresses root resistance and remains the relevant standard for this application.
                </p>
                <p>
                  Root resistant membranes are one layer in a complete planter box or podium slab waterproofing system. The complete system above a structural concrete slab includes, in order from slab upward: the waterproofing membrane (root resistant), a protection board or drainage mat, a drainage cell or aggregate drainage layer, a geotextile filter fabric layer, and then growing medium and planting. The root resistant membrane is never left exposed and must be covered by a protection course immediately after application or installation — UV exposure and foot traffic will degrade any waterproofing membrane, including root resistant types, if left unprotected. Drainage design, outlet sizing, and filter fabric selection must be coordinated with the landscape architect to ensure the planter box system performs as a whole.
                </p>
              </div>
            </div>

            {/* Client component: accordion + product cards + comparison table */}
            <RootResistantProductSection />

            {/* ── All warning and callout boxes — below comparison table only ── */}

            {/* Box 1 — Red: standard membrane not suitable for planters */}
            <div className="rounded-2xl border border-red-200 bg-red-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-700 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-red-900">STANDARD WATERPROOFING MEMBRANES ARE NOT SUITABLE FOR PLANTER BOX AND GREEN ROOF APPLICATIONS — A ROOT RESISTANT MEMBRANE MUST BE SPECIFIED</h3>
              </div>
              <p className="text-sm leading-7 text-red-900">
                A standard liquid-applied polyurethane membrane, torch-on modified bitumen sheet, cold-applied bituminous sheet, or PVC single-ply membrane without specific root resistance certification is not suitable for use as the waterproofing layer beneath a planter box or green roof installation. Roots from plants, particularly woody species and aggressive grasses, will penetrate a standard membrane over time — often within five to ten years of planting — leading to water ingress through the structural slab below. Where soil, growing medium, or planting above any surface is present, always specify a membrane that carries FLL root resistance certification or incorporates a confirmed root inhibitor compound. Do not substitute a standard membrane on the basis that the plant species appear low-risk — plant species change and root growth is difficult to predict.
              </p>
            </div>

            {/* Box 2 — Red: bamboo and high-risk species */}
            <div className="rounded-2xl border border-red-200 bg-red-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-700 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-red-900">BAMBOO, RUNNING GRASSES, AND WOODY TREES REQUIRE FLL-CERTIFIED SHEET MEMBRANES — LIQUID-APPLIED SYSTEMS MAY BE INSUFFICIENT FOR HIGH-RISK SPECIES</h3>
              </div>
              <p className="text-sm leading-7 text-red-900">
                Not all root resistant membranes provide equivalent protection across all plant species. Bamboo (particularly running bamboo varieties) and vigorous woody shrubs and trees with aggressive root systems produce rhizomes and roots with sufficient mechanical force and diameter to penetrate liquid-applied or torch-on modified bitumen membranes even where an anti-root additive has been incorporated, particularly if the membrane has areas of reduced thickness or inadequate cure. Where the planting schedule includes bamboo, running grasses, Ficus species, large palms, or trees with documented aggressive root systems, the waterproofing consultant must specify a weldable polypropylene or FLL-certified PVC sheet membrane as the minimum standard. Liquid-applied PU systems with anti-root additive and torch-on anti-root cap sheets may be appropriate for lower-risk planting palettes only. Always obtain the plant species schedule from the landscape architect before finalising membrane selection.
              </p>
            </div>

            {/* Box 3 — Amber: confirm FLL certification */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-amber-900">CONFIRM FLL ROOT RESISTANCE CERTIFICATION AND CURRENT CERTIFICATE STATUS WITH EACH MANUFACTURER BEFORE SPECIFYING</h3>
              </div>
              <p className="text-sm leading-7 text-amber-900">
                FLL root resistance certificates are issued for specific tested products and may expire or be withdrawn if a product formulation changes. Do not rely on a past TDS, a historical project reference, or a distributor claim that a product is &quot;FLL certified&quot; without confirming the current certificate status directly with the manufacturer. Request the current FLL test certificate number and confirm it is valid for the specific product and product variant (including thickness) to be specified. Additionally, note that FLL certification is granted to a specific product tested at a specific thickness — specifying the same product at a reduced thickness may not be covered by the certificate. Confirm application thickness requirements with the manufacturer alongside the certificate.
              </p>
            </div>

            {/* Box 4 — Blue: membrane is one layer in complete system */}
            <div className="rounded-2xl border border-sky-200 bg-sky-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-700 text-white">
                  <Info size={15} />
                </div>
                <h3 className="text-base font-extrabold text-sky-900">THE ROOT RESISTANT MEMBRANE IS ONE LAYER IN A COMPLETE PLANTER BOX OR PODIUM SLAB SYSTEM — SPECIFY THE COMPLETE SYSTEM BUILD-UP</h3>
              </div>
              <p className="text-sm leading-7 text-sky-900">
                The root resistant waterproofing membrane alone does not constitute a complete planter box or green roof system. The complete system from slab upward includes: the root resistant waterproofing membrane, a protection board or drainage mat immediately above the membrane, a drainage cell or aggregate drainage layer, a geotextile filter fabric, and then growing medium and planting. Each layer must be specified and coordinated with the landscape architect and waterproofing consultant. Inadequate drainage above the root resistant membrane — including undersized drainage outlets, blocked filter fabric, or an absence of drainage cells — will cause waterlogging in the growing medium, plant death, and increased hydrostatic pressure against the membrane. The root resistant membrane does not eliminate the need for correctly sized and positioned drainage outlets to the structural slab drainage system.
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
                This page provides general technical information only. Final product selection must be confirmed against the current manufacturer technical data sheet, project specification, substrate condition, plant species list from the landscape architect, FLL root resistance certification, drainage design, NCC requirements, and waterproofing consultant advice. Root resistant membrane installation requires manufacturer-accredited applicators for weldable sheet systems — confirm accredited applicator availability before specifying. The root resistant membrane must be specified as part of a complete planter box or podium slab system including protection board, drainage layer, filter fabric, and drainage outlets. Do not rely on this reference as a substitute for professional waterproofing consultant or landscape architect advice.
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
