import CategoryFilter from "./CategoryFilter";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata = {
  title: "Balcony, Roof, Planter Box and Podium Waterproofing Failure — Repair Systems — Remedial Building Australia",
  description:
    "Product categories for balcony, roof, planter box and podium waterproofing repair in Australian Class 2 strata apartment buildings — liquid applied membranes, sheet systems, HDPE, hot melt asphalt, root resistant membranes, tapered insulation boards, pedestal systems, drainage cells, ballast and drainage accessories.",
};

const GROUPS = [
  {
    heading: "Membrane Systems",
    categories: [
      { label: "Liquid applied membranes — polyurethane & hybrid", count: 10, slug: "liquid-applied-membranes-polyurethane" },
      { label: "Liquid applied membranes — acrylic", count: 6, slug: "liquid-applied-membranes-acrylic" },
      { label: "Sheet membranes — torch-on bitumen modified", count: 11, slug: "sheet-membranes-torch-on" },
      { label: "Sheet membranes — cold-applied self-adhered", count: 4, slug: "sheet-membranes-cold-applied" },
      { label: "Cementitious flexible membranes", count: 6, slug: "cementitious-flexible-membranes" },
      { label: "HDPE sheet membrane systems (roofs and podiums)", count: 5, slug: "hdpe-sheet-membrane-systems" },
      { label: "Single-ply ballasted membrane systems (roofs and podiums)", count: 6, slug: "single-ply-membrane-systems-ballasted" },
      { label: "TPO/FPO sheet membranes (exposed roofs and decks)", count: 2, slug: "tpo-fpo-sheet-membranes-exposed" },
      { label: "Hot melt rubberised asphalt systems (roofs and podiums)", count: 4, slug: "hot-melt-rubberised-asphalt-systems" },
    ],
  },
  {
    heading: "Preparation & Priming",
    categories: [
      { label: "Primers and bonding agents", count: 10, slug: "primers-bonding-agents" },
      { label: "Reinforcing fabric and mesh", count: 5, slug: "reinforcing-fabric-mesh" },
      { label: "Abrasives, blades and tools", count: 11, slug: "abrasives-blades-tools" },
      { label: "Membrane termination bars and accessories", count: 3, slug: "membrane-termination-bars-accessories" },
    ],
  },
  {
    heading: "Screeds, Falls & Tile Build-up",
    categories: [
      { label: "Screed systems — polymer-modified", count: 7, slug: "screed-systems-polymer-modified" },
      { label: "Screed systems — self-levelling", count: 4, slug: "screed-systems-self-levelling" },
      { label: "Tile adhesive systems", count: 10, slug: "tile-adhesive-systems" },
      { label: "Tile sealants — silicone and sanitary", count: 3, slug: "tile-sealants-silicone-sanitary" },
    ],
  },
  {
    heading: "Upstands & Hobs",
    categories: [
      { label: "Hobs and upstands — precast, cast-in, in-situ, masonry & lintel", count: 5, slug: "hobs-upstands" },
    ],
  },
  {
    heading: "Drainage & Penetrations",
    categories: [
      { label: "Drainage — puddle flanges and floor wastes", count: 8, slug: "drainage-puddle-flanges-floor-wastes" },
      { label: "Drainage — linear grates and channel drains", count: 7, slug: "drainage-linear-grates-channel-drains" },
      { label: "Penetration collars — pre-formed and site-formed", count: 6, slug: "penetration-collars" },
      { label: "Drainage systems — podium outlets and scuppers (podiums)", count: 7, slug: "drainage-podium-outlets-scuppers" },
      { label: "Balcony edge trims", count: 5, slug: "gutter-lining-systems" },
      { label: "Flashing compound systems (roofs)", count: 7, slug: "flashing-compound-systems" },
    ],
  },
  {
    heading: "Joints & Movement",
    categories: [
      { label: "Backer rod and bond breaker tape", count: 3, slug: "backer-rod-bond-breaker-tape" },
      { label: "Expansion joint cover systems — trafficable (balconies and podiums)", count: 3, slug: "expansion-joint-cover-systems-trafficable" },
    ],
  },
  {
    heading: "Protection & Overburden",
    categories: [
      { label: "Protection boards", count: 6, slug: "protection-boards" },
      { label: "Root resistant membrane systems — polyolefin and HDPE (planter boxes and podiums)", count: 6, slug: "root-resistant-membrane-systems" },
      { label: "Tapered and flat roof insulation boards — PIR / XPS / mineral wool (roofs and podiums)", count: 6, slug: "tapered-insulation-board-systems" },
      { label: "Pedestal systems — adjustable height (podiums)", count: 5, slug: "pedestal-systems-adjustable-height" },
      { label: "Drainage cell systems (planter boxes)", count: 5, slug: "drainage-cell-systems" },
      { label: "Filter fabric systems (planter boxes)", count: 5, slug: "filter-fabric-systems" },
      { label: "Ballast systems (roofs)", count: 5, slug: "ballast-systems" },
      { label: "Vapour control layers — warm roof (balconies and podiums)", count: 3, slug: "vapour-control-layers-warm-roof" },
    ],
  },
  {
    heading: "Testing & QA",
    categories: [
      { label: "Flood test equipment and plugs", count: 5, slug: "flood-test-equipment" },
    ],
  },
];

export default function BalconyWaterproofingFailurePage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header ── */}
      <SiteHeader />

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
              <span className="text-sky-950">Balcony, roof, planter box and podium waterproofing failure</span>
            </nav>
            <PageNav />
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 01</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
              Balcony, roof, planter box and podium waterproofing failure
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Technical repair system reference for balcony, roof deck, planter box and podium waterproofing failure in Australian Class 2 strata — select a product category to view system information, product comparisons and brand equivalents.
            </p>
          </div>
        </section>

        {/* ── Product category cards — grouped with search/filter ── */}
        <CategoryFilter groups={GROUPS} />
      </main>

      {/* ── Footer ── */}
      <SeoCrossPromo />

      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <a href="/repair-systems/waterproofing-water-ingress" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200 transition">← Waterproofing Systems</a>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.</p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
            <div className="flex flex-col gap-2">
              <a href="/directory" className="hover:text-sky-700">Business Directory</a>
              <a href="/repair-systems" className="hover:text-sky-700">Repair Systems</a>
              <a href="/defect-library" className="hover:text-sky-700">Defect Library</a>
              <a href="/industry-news" className="hover:text-sky-700">News &amp; Insights</a>
            </div>
            <div className="flex flex-col gap-2">
              <a href="/advertise" className="hover:text-sky-700">Advertise With Us</a>
              <a href="/contact" className="hover:text-sky-700">Contact</a>
              <a href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</a>
              <a href="/terms" className="hover:text-sky-700">Terms</a>
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
