import type { Metadata } from "next";
import { BookOpen, AlertTriangle, Info, ArrowRight } from "lucide-react";
import { PedestalProductSection } from "./PedestalProductSection";

export const metadata: Metadata = {
  title: "Pedestal Systems — Adjustable Height — Podiums and Balconies — Remedial Building Australia",
  description:
    "Technical product reference for adjustable height pedestal systems used on podium slabs, roof decks, and balconies in Australian Class 2 strata apartment buildings — paver and tile pedestal supports, height range selection, slope correction, load capacity, wind uplift clips, membrane protection, and brand comparisons.",
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

export default function PedestalSystemsAdjustableHeightPage() {
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
              <span className="text-sky-950">Pedestal systems — adjustable height — podiums and balconies</span>
            </nav>
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — Drainage and Support</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  Pedestal systems — adjustable height — podiums and balconies
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Technical product reference for adjustable height pedestal systems used on podium slabs, roof decks, and balconies. Covers height range selection, slope correction, load capacity, wind uplift retention, membrane protection, paver format compatibility, and Australian brand comparisons.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Products listed",  value: "5" },
                  { label: "Brands covered",   value: "4" },
                  { label: "Height range",     value: "12mm to 1070mm" },
                  { label: "Applications",     value: "Podium and balcony raised paver systems" },
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
                const active = tab.slug === "pedestal-systems-adjustable-height";
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
                <h3 className="text-base font-extrabold text-sky-950">What are adjustable height pedestal systems — podiums and balconies?</h3>
              </div>
              <div className="space-y-4 text-sm leading-7 text-slate-600">
                <p>
                  Adjustable height pedestal systems are polypropylene support components used to create a raised, level paved surface over a waterproofing membrane on balconies, terraces, podium slabs, and roof decks. Each pedestal supports the corner or edge of a paver or tile at an adjustable height above the membrane surface — the paver rests on the pedestal head rather than being bedded in adhesive or mortar. The gap between adjacent pavers allows surface water to drain freely through the joints and discharge across the membrane below, which then conveys water to the drainage outlets. The pedestals protect the membrane from direct traffic loads by distributing paver loads through the pedestal base rather than imposing concentrated point loads on the membrane surface.
                </p>
                <p>
                  In Class 2 strata remediation on podium slabs and roof decks, pedestal systems are specified where the existing slab requires a new waterproofing membrane and the finished paver level must be set at a fixed height — typically at the threshold level of doorways or at an agreed finished floor level above the membrane surface. Pedestal systems allow the paver height to be adjusted during installation to achieve a level finished surface regardless of minor variation in the membrane or protection board surface below. They also allow access to the membrane and any services below by simply lifting the pavers off the pedestals — without breaking out adhesive or mortar.
                </p>
                <p>
                  Pedestal height range is the critical specification decision. Heights from as low as 12mm (for thin-set paver applications on essentially flat substrates) to over 1000mm (for deep build-up requirements on podium slabs above services or insulation) are available. The required height is determined by the membrane surface level, the required finished paver level, the thickness of any insulation or protection board below the paver, and the paver thickness itself.
                </p>
              </div>
            </div>

            {/* Client component: accordion + product cards + comparison table */}
            <PedestalProductSection />

            {/* ── All warning and callout boxes — below comparison table only ── */}

            {/* Box 1 — Red: wind uplift */}
            <div className="rounded-2xl border border-red-200 bg-red-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-700 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-red-900">WIND UPLIFT RETENTION MUST BE SPECIFIED FOR EXPOSED ROOFTOP AND COASTAL LOCATIONS — STANDARD PEDESTALS RELY ON PAVER DEAD WEIGHT ONLY</h3>
              </div>
              <p className="text-sm leading-7 text-red-900">
                Standard adjustable height pedestals support pavers by gravity — the paver rests on the pedestal head by its own weight and is not mechanically fixed. On exposed roof decks, elevated terraces, and coastal balconies where wind pressure beneath the paved surface can exceed the paver dead weight, this is a serious safety risk — pavers can be lifted and displaced by wind, creating a fall and projectile hazard for occupants and adjacent areas. Before specifying standard gravity-retained pedestal paving on any exposed or elevated location, confirm with the building engineer whether wind uplift retention is required. Where required, specify windproof pedestal heads with mechanical clips (Buzon fixing accessories, Elmich Versijack CP, Keksia windproof T-clips and L-clips) or adhesive paver retention systems. Do not assume that paver weight alone is sufficient on high-rise balconies, elevated terraces, or coastal locations.
              </p>
            </div>

            {/* Box 2 — Amber: no Australian standard */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-amber-900">THERE IS CURRENTLY NO AUSTRALIAN STANDARD FOR PEDESTAL PAVING — APPLY MANUFACTURER GUIDANCE AND ENGINEERING JUDGEMENT</h3>
              </div>
              <p className="text-sm leading-7 text-amber-900">
                AS/NZS 4452 governs masonry paving units but covers testing methodologies for pavers installed on a traditional solid base only — it does not address load capacity, paver span, pedestal spacing, or structural performance for pedestal-mounted paving systems. There is currently no Australian Standard that specifically governs paving installed on adjustable height pedestals. On commercial podium slabs, roof decks, and strata balconies, the pedestal spacing, paver thickness, load capacity, and structural performance must be determined by applying the pedestal manufacturer&apos;s technical guidance and, where loadings are significant or uncertain, by an engineer&apos;s assessment. Do not assume that any pedestal system is compliant with an Australian Standard for pedestal paving — no such standard currently exists.
              </p>
            </div>

            {/* Box 3 — Amber: membrane protection */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-amber-900">CONFIRM MEMBRANE PROTECTION BEFORE PLACING PEDESTALS ON THE CURED MEMBRANE</h3>
              </div>
              <p className="text-sm leading-7 text-amber-900">
                Adjustable height pedestals are placed directly on or above the cured waterproofing membrane — either on the membrane surface itself or on a protection board above the membrane. The pedestal base must not damage, puncture, or abrade the membrane surface. On soft liquid-applied PU and hybrid membranes, placing pedestals directly on the membrane without a protection board can cause indentation or stress concentration at each pedestal base, potentially compromising the membrane at those points over time under repeated loading. Confirm with the membrane manufacturer whether a protection board or membrane protection mat is required between the membrane surface and the pedestal bases before placing pedestals. Refer to the Protection Boards page for compatible protection board options.
              </p>
            </div>

            {/* Box 4 — Blue: membrane access */}
            <div className="rounded-2xl border border-sky-200 bg-sky-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-700 text-white">
                  <Info size={15} />
                </div>
                <h3 className="text-base font-extrabold text-sky-900">PEDESTAL PAVING PROVIDES MEMBRANE ACCESS — ADHESIVE-BEDDED TILE DOES NOT</h3>
              </div>
              <p className="text-sm leading-7 text-sky-900">
                A significant advantage of pedestal paving over adhesive-bedded tile on podium slabs and roof decks is accessibility to the membrane below. Individual pavers can be lifted off the pedestals without tools or breaking out, allowing the membrane to be inspected, flood-tested, or repaired after the paving is complete. This is particularly important on Class 2 strata podium slabs and roof decks where the membrane may need to be inspected for defects or repaired under warranty — and where breaking out and re-bedding adhesive-fixed tiles is prohibitively costly. Confirm with the building owner and strata manager whether membrane accessibility is a priority for the specific project before specifying either pedestal or adhesive-bedded paving.
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
                This page provides general technical information only. Final product selection must be confirmed against the current manufacturer technical data sheet, project specification, required height range, substrate fall, paver format and weight, load capacity requirements, wind uplift exposure assessment, membrane protection requirements, and structural engineer advice where applicable. There is currently no Australian Standard governing pedestal-mounted paving systems — apply manufacturer technical guidance and engineering judgement. Do not rely on this reference as a substitute for professional engineer or waterproofing consultant advice.
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
