import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Balcony, Roof, Planter Box and Podium Waterproofing Failure — Repair Systems — Remedial Building Australia",
  description:
    "Product categories for balcony, roof, planter box and podium waterproofing repair in Australian Class 2 strata apartment buildings — liquid applied membranes, sheet systems, HDPE, hot melt asphalt, root resistant membranes, tapered insulation boards, pedestal systems, drainage cells, ballast and drainage accessories.",
};

const PRODUCT_CATEGORIES = [
  { label: "Liquid applied membranes — polyurethane & hybrid", count: 10, slug: "liquid-applied-membranes-polyurethane" },
  { label: "Liquid applied membranes — acrylic", count: 5, slug: "liquid-applied-membranes-acrylic" },
  { label: "Sheet membranes — torch-on bitumen modified", count: 4, slug: "sheet-membranes-torch-on" },
  { label: "Sheet membranes — cold-applied self-adhered", count: 4, slug: "sheet-membranes-cold-applied" },
  { label: "Cementitious flexible membranes", count: 5, slug: "cementitious-flexible-membranes" },
  { label: "Primers and bonding agents", count: 5, slug: "primers-bonding-agents" },
  { label: "Screed systems — polymer-modified", count: 4, slug: "screed-systems-polymer-modified" },
  { label: "Screed systems — self-levelling", count: 4, slug: "screed-systems-self-levelling" },
  { label: "Drainage — puddle flanges and floor wastes", count: 5, slug: "drainage-puddle-flanges-floor-wastes" },
  { label: "Drainage — linear grates and channel drains", count: 4, slug: "drainage-linear-grates-channel-drains" },
  { label: "Penetration collars — pre-formed and site-formed", count: 4, slug: "penetration-collars" },
  { label: "Protection boards", count: 3, slug: "protection-boards" },
  { label: "Reinforcing fabric and mesh", count: 4, slug: "reinforcing-fabric-mesh" },
  { label: "Flood test equipment and plugs", count: 3, slug: "flood-test-equipment" },
  { label: "Tile adhesive systems", count: 5, slug: "tile-adhesive-systems" },
  { label: "Abrasives, blades and tools", count: 3, slug: "abrasives-blades-tools" },
  { label: "HDPE sheet membrane systems (roofs and podiums)", count: 0, slug: "hdpe-sheet-membrane-systems" },
  { label: "Hot melt rubberised asphalt systems (roofs and podiums)", count: 0, slug: "hot-melt-rubberised-asphalt-systems" },
  { label: "Root resistant membrane systems — polyolefin and HDPE (planter boxes and podiums)", count: 0, slug: "root-resistant-membrane-systems" },
  { label: "Tapered insulation board systems — PIR / XPS / mineral wool (roofs and podiums)", count: 0, slug: "tapered-insulation-board-systems" },
  { label: "Pedestal systems — adjustable height (podiums)", count: 0, slug: "pedestal-systems-adjustable-height" },
  { label: "Drainage cell systems (planter boxes)", count: 0, slug: "drainage-cell-systems" },
  { label: "Filter fabric systems (planter boxes)", count: 0, slug: "filter-fabric-systems" },
  { label: "Ballast systems (roofs)", count: 0, slug: "ballast-systems" },
  { label: "Drainage systems — podium outlets and scuppers (podiums)", count: 0, slug: "drainage-podium-outlets-scuppers" },
  { label: "Gutter lining systems (roofs)", count: 0, slug: "gutter-lining-systems" },
  { label: "Flashing compound systems (roofs)", count: 0, slug: "flashing-compound-systems" },
];

export default function BalconyWaterproofingFailurePage() {
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
            <a href="/directory" className="whitespace-nowrap hover:text-red-700">Directory</a>
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
              <span className="text-sky-950">Balcony, roof, planter box and podium waterproofing failure</span>
            </nav>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 01</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
              Balcony, roof, planter box and podium waterproofing failure
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Technical repair system reference for balcony, roof deck, planter box and podium waterproofing failure in Australian Class 2 strata — select a product category to view system information, product comparisons and brand equivalents.
            </p>
          </div>
        </section>

        {/* ── Product category cards ── */}
        <section className="px-8 py-14">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-start gap-3">
              <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
              <div>
                <h2 className="text-2xl font-extrabold text-sky-950">Product Categories</h2>
                <p className="mt-1 text-sm text-slate-500">27 product categories — select to view technical reference and brand equivalents.</p>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {PRODUCT_CATEGORIES.map((cat) => (
                <a
                  key={cat.slug}
                  href={`/repair-systems/balcony-waterproofing-failure/${cat.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
                >
                  <div className="mb-3 h-0.5 w-8 rounded-full bg-red-700" />
                  <h3 className="text-base font-extrabold leading-tight text-sky-950 group-hover:text-sky-700 transition">{cat.label}</h3>
                  <p className="mt-2 text-xs font-semibold text-slate-400">{cat.count} products</p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-sky-700 group-hover:text-red-700 transition">
                    View systems <ArrowRight size={12} />
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
          <a href="/repair-systems/waterproofing-water-ingress" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200 transition">← Waterproofing Systems</a>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.</p>
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
