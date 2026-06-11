import type { Metadata } from "next";
import { AlertTriangle, BookOpen, ArrowRight } from "lucide-react";
import { TPOProductSection, TPOIntroSection } from "./TPOProductSection";

export const metadata: Metadata = {
  title: "TPO/FPO Sheet Membrane Systems — Exposed Roofs and Decks — Remedial Building Australia",
  description:
    "Technical product reference for TPO and FPO heat-weldable sheet membrane systems used on exposed roof decks, balconies, and utility platforms in Australian Class 2 strata apartment buildings — ARDEX WPM 715 and WPM 717 WeldTec range — fully bonded, loose-laid, AS 4654.1 compliant.",
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

export default function TPOFPOSheetMembranesPage() {
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
            <a href="/industry-news" className="whitespace-nowrap hover:text-red-700 transition">News &amp; Insights</a>
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
              <span className="text-sky-950">TPO/FPO membranes (exposed roofs)</span>
            </nav>
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 01</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  TPO/FPO sheet membrane systems — exposed roofs and decks
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Technical product reference for TPO and FPO heat-weldable sheet membrane systems used on exposed roof decks, balconies, and utility platforms in Australian Class 2 strata apartment buildings. Covers product type classification, installation method selection (fully bonded, loose-laid), substrate compatibility, heat-welding requirements, trafficability, and AS 4654.1 compliance.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Products listed", value: "2" },
                  { label: "Brands available", value: "1" },
                  { label: "Membrane thickness", value: "1.4–1.5mm" },
                  { label: "Standard", value: "AS 4654.1" },
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
                      const active = tab.slug === "tpo-fpo-sheet-membranes-exposed";
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

            {/* Intro */}
            <TPOIntroSection />

            {/* Interactive: accordion + product cards + comparison table */}
            <TPOProductSection />

            {/* ── Warning boxes — BELOW comparison table only ── */}

            {/* Do not confuse with */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
                  <BookOpen size={15} />
                </div>
                <h3 className="text-base font-extrabold text-amber-900">Do not confuse TPO/FPO exposed membranes with:</h3>
              </div>
              <ul className="space-y-2">
                {[
                  "Single-ply PVC ballasted membranes (Wolfin IB, Cosmofin, Fatrafol 810v, Sarnafil G 410-L) — PVC with plasticiser, covered by ballast (pebble or pavers), not UV-exposed — separate product category on this site",
                  "Liquid-applied polyurethane and hybrid membranes (ARDEX WPM 157, Sika Sikalastic-487) — applied by roller or brush as a liquid, not a factory-manufactured sheet product",
                  "Torch-on modified bitumen sheet membranes (SBS and APP bitumen) — bituminous chemistry, heat-applied by gas torch, not TPO — different material, different installation, different performance profile",
                  "HDPE sheet membrane systems — high-density polyethylene, different chemistry, typically used below-slab, in planter boxes, or on podium structures with overburden — not UV-exposed",
                  "Cementitious flexible membranes (ARDEX 8+9, Mapei Mapelastic) — two-part cement-based systems applied by brush, not sheet systems",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-amber-900">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Critical: WA 98 seam zone warning */}
            <div className="rounded-2xl border border-red-200 bg-red-50 p-7">
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-700 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-red-900">ARDEX WA 98 contact adhesive must not be applied to heat-weld seam zones</h3>
              </div>
              <p className="text-sm leading-7 text-red-900">
                ARDEX WA 98 is the solvent-based contact adhesive used to bond WPM 715 to the substrate in fully bonded installations. A critical installation rule applies: WA 98 must not be applied to any area of the membrane or substrate where adjacent sheets will be seam-welded. Contact adhesive contamination prevents the hot-air welding equipment from forming a correct seam — the adhesive residue degrades the weld, and the seam will fail. Plan adhesive application zones carefully before installation to ensure all seam overlap areas (minimum 40mm from the sheet edge on both sheets) remain adhesive-free. Mark seam lines on the substrate before applying WA 98.
              </p>
            </div>

            {/* Critical: heat welding requirement */}
            <div className="rounded-2xl border border-red-200 bg-red-50 p-7">
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-700 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-red-900">All seams and laps must be heat-welded using an approved hot-air welding unit — no cold bonding at seams</h3>
              </div>
              <p className="text-sm leading-7 text-red-900">
                ARDEX WeldTec TPO membranes are thermoplastic systems — seams and laps are formed by heat-welding with an approved hot-air welding machine, not by cold bonding with adhesive. Cold-bonded seams are not acceptable and will fail over time. Minimum 40mm overlap is required at all side and end laps before welding. The membrane surface must be solvent-wiped before welding to remove contamination — unwashed membrane surface will not weld correctly and the seam will delaminate. ARDEX requires installation to be carried out by trained and approved applicators using an approved welding unit — confirm accreditation requirements with ARDEX Australia before commencing work.
              </p>
            </div>

            {/* Info: Sika Sarnafil AT note */}
            <div className="rounded-2xl border border-sky-200 bg-sky-50 p-7">
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
                  <BookOpen size={15} />
                </div>
                <h3 className="text-base font-extrabold text-sky-950">Sika Sarnafil AT — FPO mechanically fixed membrane — confirm Australian availability</h3>
              </div>
              <p className="text-sm leading-7 text-slate-700">
                Sika Sarnafil AT is a confirmed FPO (flexible polyolefin) single-ply membrane available internationally in AT-15, AT-18, and AT-25 variants, designed for mechanically fixed exposed roof applications with UV resistance. It is confirmed in Sika UK and Sika global documentation but was not confirmed on the Australian Sika website (aus.sika.com) at the time of publication. If Sarnafil AT is being considered for an Australian Class 2 strata roof project, confirm current Australian product availability, accredited applicator access, and current technical specifications directly with Sika Australia at aus.sika.com or by contacting Sika Australia technical on 1300 22 33 48. Do not specify based on international documentation alone.
              </p>
            </div>

          </div>
        </section>

        {/* ── Disclaimer ── */}
        <section className="border-t border-slate-200 bg-slate-50 px-8 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Disclaimer</p>
              <p className="text-xs leading-6 text-amber-900">
                This page provides general technical information only. Final product selection must be confirmed against the current manufacturer technical data sheet, project specification, substrate moisture content, installation method suitability (fully bonded vs loose-laid), AS 4654.1 compliance status, wind uplift requirements, and NCC requirements. Substrate moisture content must be within ARDEX limits before WPM 715 or WPM 717 installation — confirm with ARDEX Australia. WA 98 contact adhesive must not be applied to areas where heat-welded seams will be located. All seams require heat welding with an approved hot-air welding unit — minimum 40mm overlap — solvent-wiped before welding. Maintenance inspection obligations apply to exposed membranes per ARDEX TB272. Do not rely on this reference as a substitute for professional waterproofing consultant advice.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  href: "/repair-systems/balcony-waterproofing-failure",
                  label: "Back to Category",
                  title: "All waterproofing product categories",
                },
                {
                  href: "/repair-systems/balcony-waterproofing-failure/single-ply-membrane-systems-ballasted",
                  label: "Single-ply ballasted membranes",
                  title: "Wolfin, Cosmofin, Fatrafol, Sarnafil G — PVC ballasted systems",
                },
                {
                  href: "/repair-systems/balcony-waterproofing-failure/hdpe-sheet-membrane-systems",
                  label: "HDPE sheet membrane systems",
                  title: "HDPE below-slab and planter box waterproofing",
                },
                {
                  href: "/repair-systems/balcony-waterproofing-failure/liquid-applied-membranes-polyurethane",
                  label: "Liquid-applied PU membranes",
                  title: "PU and hybrid liquid-applied balcony membranes",
                },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-sky-800 shadow-sm transition hover:border-sky-300 hover:text-red-700"
                >
                  <div>
                    <div className="font-bold">{link.label}</div>
                    <div className="mt-0.5 text-[10px] font-normal text-slate-400">{link.title}</div>
                  </div>
                  <ArrowRight size={14} className="shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-slate-200 bg-slate-100">
          <div className="mx-auto max-w-7xl px-5 pt-10">
            <a href="/repair-systems/balcony-waterproofing-failure" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200 transition">← Balcony Waterproofing Systems</a>
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
              <a href="/industry-news" className="hover:text-sky-700">News &amp; Insights</a>
              <a href="/directory" className="hover:text-sky-700">Business Directory</a>
            </div>
          </div>
          <div className="mx-auto max-w-7xl border-t border-slate-200 px-5 py-5 text-xs text-slate-400">
            © 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved. Unauthorised reproduction prohibited.
          </div>
        </footer>
      </main>
    </div>
  );
}
