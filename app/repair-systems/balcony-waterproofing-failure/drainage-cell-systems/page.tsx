import type { Metadata } from "next";
import { BookOpen, AlertTriangle, ArrowRight } from "lucide-react";
import { DrainageCellProductSection } from "./DrainageCellProductSection";

export const metadata: Metadata = {
  title: "Drainage Cell Systems — Planter Boxes and Podiums — Balcony Waterproofing — Remedial Building Australia",
  description:
    "Technical product reference for drainage cell systems used in planter box, green roof, and podium slab waterproofing remediation on Australian Class 2 strata apartment buildings — modular polypropylene drainage cells, void ratio, compressive strength, water retention cups, passive irrigation, drainage cell depth selection, filter fabric pairing, and brand comparisons.",
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

export default function DrainageCellSystemsPage() {
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
              <span className="text-sky-950">Drainage cell systems — planter boxes and podiums</span>
            </nav>
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 01</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  Drainage cell systems — planter boxes and podiums
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Technical product reference for modular polypropylene drainage cell systems used in planter box, green roof, and podium slab waterproofing remediation on Australian Class 2 strata buildings. Covers depth selection, void ratio, compressive strength, water retention cups, passive irrigation, filter fabric pairing, and brand comparisons.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Products listed", value: "5" },
                  { label: "Brands covered", value: "5" },
                  { label: "Available depths", value: "20mm / 30mm / 50mm" },
                  { label: "Applications", value: "Planter box and podium subsurface drainage" },
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
                const active = tab.slug === "drainage-cell-systems";
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

            {/* Intro card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
                  <BookOpen size={15} />
                </div>
                <h3 className="text-base font-extrabold text-sky-950">What are drainage cell systems — planter boxes and podiums?</h3>
              </div>
              <div className="space-y-4 text-sm leading-7 text-slate-600">
                <p>
                  Drainage cell systems are modular, interlocking polypropylene panels placed between the waterproofing membrane and the growing medium in planter boxes, green roofs, and landscaped podium slabs. Their primary function is to create a permanent, non-clogging subsurface drainage void above the membrane — allowing excess water from irrigation and rainfall to flow laterally through the void to the drainage outlets, while the growing medium above retains only the moisture required for plant health. Without a drainage void, waterlogged growing medium sits directly on the membrane surface, promotes membrane degradation, prevents root aeration, and prevents excess water from reaching the outlet — all of which contribute to planter box failure and membrane damage over time.
                </p>
                <p>
                  Drainage cells replace the traditional coarse aggregate drainage layer used in conventional planter box construction. A 30mm drainage cell provides approximately the same drainage capacity as 150mm of coarse gravel aggregate, while adding only 2% of the gravel's weight to the structural slab — a critical advantage on podium slabs and roof decks where dead load is constrained. The reduced drainage layer depth also allows greater growing medium depth within the same overall planter box height, expanding the range of plants and tree species that can be used above the membrane.
                </p>
                <p>
                  Drainage cells are available in 20mm, 30mm, and 50mm depths — selected based on the required drainage flow rate, the growing medium depth, the loading conditions above, and the available build-up height within the planter box. Many drainage cell formats incorporate small water retention cups in the base of each cell — these cups retain a small volume of water below the drainage void level, creating a perched water table that provides passive irrigation to the growing medium during dry periods without retaining standing water on the membrane surface.
                </p>
              </div>
            </div>

            {/* Interactive: accordion + product grid + comparison table */}
            <DrainageCellProductSection />

            {/* Warning boxes — all below comparison table */}
            <div className="grid gap-5 md:grid-cols-2">

              <div className="rounded-2xl border border-red-200 bg-red-50 p-7">
                <div className="mb-4 flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-700 text-white">
                    <AlertTriangle size={15} />
                  </div>
                  <h3 className="text-base font-extrabold text-red-900">Filter fabric is mandatory above every drainage cell installation — without it the cells will clog and fail</h3>
                </div>
                <p className="text-sm leading-7 text-red-900">
                  Geotextile filter fabric must be placed over the full surface of the drainage cell layer — covering every panel and lapping up the planter box walls — before growing medium is placed above. Without filter fabric, fine particles from the growing medium migrate down into the drainage cell void with each irrigation and rainfall event, progressively clogging the drainage paths. Once clogged, drainage cells cannot be cleaned or restored — the growing medium and cells must be completely removed and replaced. Filter fabric is not optional and is not a value-engineering reduction — it is a mandatory component of every drainage cell installation. See the Filter Fabric page for geotextile filter fabric specification and selection.
                </p>
              </div>

              <div className="rounded-2xl border border-red-200 bg-red-50 p-7">
                <div className="mb-4 flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-700 text-white">
                    <AlertTriangle size={15} />
                  </div>
                  <h3 className="text-base font-extrabold text-red-900">Drainage cells must be installed above a correctly waterproofed and inspected membrane — not as a substitute for waterproofing</h3>
                </div>
                <p className="text-sm leading-7 text-red-900">
                  Drainage cells are a subsurface drainage product — they sit above the waterproofing membrane and manage the movement of water within the planter box system. They are not waterproofing products and do not protect the structural slab from water ingress. The waterproofing membrane below the drainage cells must be correctly specified (root resistant where plants are to be grown above), correctly installed, flood tested, and confirmed defect-free before the drainage cells are placed above it. Placing drainage cells over an uninspected, defective, or non-root-resistant membrane will not prevent long-term water ingress into the structure below. Confirm the waterproofing membrane specification on the Root Resistant Membranes page before specifying drainage cells.
                </p>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
                <div className="mb-4 flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
                    <AlertTriangle size={15} />
                  </div>
                  <h3 className="text-base font-extrabold text-amber-900">Confirm structural loading with the engineer before specifying a planter box system on an existing podium slab</h3>
                </div>
                <p className="text-sm leading-7 text-amber-900">
                  On existing Class 2 strata podium slabs and roof decks, the structural capacity for a new or replacement planter box system must be confirmed with a structural engineer before the system is specified. The combined dead load of the waterproofing membrane, protection board, drainage cells, filter fabric, growing medium, and plant material must be within the slab's design load capacity. Even with drainage cells substituting gravel (98% weight saving in the drainage layer), the growing medium and plants impose significant dead loads — particularly where deep-rooted plants or trees are specified. Older podium slabs may have been designed for minimal or no planting load. Do not assume an existing slab can carry a new planter box system without engineering confirmation.
                </p>
              </div>

              <div className="rounded-2xl border border-sky-200 bg-sky-50 p-7">
                <div className="mb-4 flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
                    <BookOpen size={15} />
                  </div>
                  <h3 className="text-base font-extrabold text-sky-950">Drainage cell depth selection — confirm with the hydraulic engineer and landscape architect before ordering</h3>
                </div>
                <p className="text-sm leading-7 text-slate-700">
                  The correct drainage cell depth (20mm, 30mm, or 50mm) must be confirmed against three criteria before ordering: the hydraulic design flow rate required for the drainage area and rainfall intensity, the available build-up height within the planter box (membrane surface level to the top of the planter wall), and the compressive strength required for any machinery access. These three criteria are rarely all equal — the deepest available cell is not always the correct specification. A 50mm cell that exceeds the available build-up height leaves insufficient depth for growing medium. A 20mm cell that cannot handle the design rainfall flow rate will cause waterlogging above the cells. Confirm depth selection with the hydraulic engineer and landscape architect before placing the order.
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
                This page provides general technical information only. Final product selection must be confirmed against the current manufacturer technical data sheet, project specification, hydraulic design flow rate, drainage cell compressive strength requirements, available build-up height, structural loading confirmation from the engineer, landscape architect planting specification, and NCC requirements. Geotextile filter fabric is mandatory above all drainage cell installations. Drainage cells are subsurface drainage products and are not waterproofing — the waterproofing membrane below must be correctly specified, installed, and flood tested before drainage cells are placed above. Do not rely on this reference as a substitute for professional hydraulic engineer, structural engineer, landscape architect, or waterproofing consultant advice.
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
                  href: "/repair-systems/balcony-waterproofing-failure/root-resistant-membrane-systems",
                  label: "Related — Root Resistant Membranes",
                  title: "Root resistant waterproofing membranes for planter boxes and podiums",
                },
                {
                  href: "/repair-systems/balcony-waterproofing-failure/filter-fabric-systems",
                  label: "Related — Filter Fabric Systems",
                  title: "Geotextile filter fabric — always specified above drainage cells",
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
