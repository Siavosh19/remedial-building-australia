import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, AlertTriangle, ArrowRight, Info } from "lucide-react";
import { AbrasivesProductSection, AbrasivesIntroSection } from "./AbrasivesProductSection";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Abrasives, Blades and Tools — Balcony Waterproofing — Remedial Building Australia",
  description:
    "Technical product reference for abrasives, blades, and tools used in balcony waterproofing remediation on Australian Class 2 strata apartment buildings — tile removal tools, diamond cup wheels, floor grinders, scarifying machines, diamond saw blades, membrane application rollers and trowels, concrete moisture meters, and wet film thickness gauges.",
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
    heading: "Upstands & Hobs",
    tabs: [
      { label: "Hobs & upstands", slug: "hobs-upstands" },
    ],
  },
  {
    heading: "Testing & QA",
    tabs: [
      { label: "Flood test", slug: "flood-test-equipment" },
    ],
  },
];

export default function AbrasivesBladesToolsPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header ── */}
      <SiteHeader />

      <main>

        {/* ── Hero ── */}
        <section className="border-b border-slate-200 bg-white px-4 sm:px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <Link href="/" className="hover:text-sky-700 transition">Home</Link>
              <span>/</span>
              <Link href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</Link>
              <span>/</span>
              <Link href="/repair-systems/waterproofing-water-ingress" className="hover:text-sky-700 transition">Waterproofing Systems</Link>
              <span>/</span>
              <Link href="/repair-systems/balcony-waterproofing-failure" className="hover:text-sky-700 transition">Balcony, roof, planter box and podium waterproofing failure</Link>
              <span>/</span>
              <span className="text-sky-950">Abrasives, blades and tools</span>
            </nav>
            <PageNav />
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — Abrasives, Blades and Tools</p>
                <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  Abrasives, blades and tools — balcony waterproofing
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Technical product reference for abrasives, blades, and tools used in balcony waterproofing remediation on Australian Class 2 strata apartment buildings — tile removal, concrete surface preparation, diamond cutting, liquid membrane application, and substrate measurement and inspection.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Products listed", value: "11" },
                  { label: "Tool categories", value: "5" },
                  { label: "Supply types", value: "Multi-brand" },
                  { label: "Applications", value: "Surface prep / application / measurement" },
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
                      const active = tab.slug === "abrasives-blades-tools";
                      return (
                        <Link
                          key={tab.slug}
                          href={`/repair-systems/balcony-waterproofing-failure/${tab.slug}`}
                          className={`relative shrink-0 border-b-2 px-4 py-3 text-xs font-bold whitespace-nowrap transition ${
                            active
                              ? "border-red-700 text-sky-950"
                              : "border-transparent text-slate-500 hover:text-sky-900"
                          }`}
                        >
                          {tab.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <section className="px-4 sm:px-8 py-14">
          <div className="mx-auto max-w-7xl space-y-10">

            {/* ── Intro ── */}
            <AbrasivesIntroSection />


            {/* ── Product Sections + Accordion + Comparison Table (client component) ── */}
            <AbrasivesProductSection />

            {/* ── BOX 1 — RED: silica dust ── */}
            <div className="rounded-2xl border border-red-200 bg-red-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-700 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-red-900">SILICA DUST — DRY CUTTING OR DRY GRINDING ON SITE IS A WHS REGULATORY BREACH</h3>
              </div>
              <p className="text-sm leading-7 text-red-900">
                Crystalline silica is a Group 1 occupational carcinogen. Safe Work Australia&apos;s Model WHS Regulations and Code of Practice: Managing the Risks of Respirable Crystalline Silica from Engineered Stone prohibit dry cutting and dry grinding of concrete, ceramic tile, porcelain tile, and tile adhesive on Australian construction sites. This prohibition applies to all surface preparation and cutting operations on balcony waterproofing remediation projects — grinding, scarifying, diamond saw cutting, and chiselling — regardless of project scale or work duration. All grinding and cutting must be conducted with either a water feed (wet cutting/wet grinding) or a dust extraction shroud connected to an M-class or H-class vacuum. All workers in the dust zone must wear at minimum a P2 half-face respirator. A Safe Work Method Statement that addresses silica dust controls must be in place before any grinding or cutting commences. Failure to comply with silica dust regulations is a WHS regulatory breach and exposes the contractor to prosecution, enforceable undertakings, and improvement or prohibition notices.
              </p>
            </div>

            {/* ── BOX 2 — RED: surface preparation ── */}
            <div className="rounded-2xl border border-red-200 bg-red-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-700 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-red-900">SURFACE PREPARATION FAILURE IS THE MOST COMMON CAUSE OF WATERPROOFING MEMBRANE ADHESION FAILURE — DO NOT APPLY PRIMER OVER AN UNPREPARED SUBSTRATE</h3>
              </div>
              <p className="text-sm leading-7 text-red-900">
                Inadequate concrete surface preparation is the most frequently identified cause of liquid-applied waterproofing membrane delamination and adhesion failure in Australian strata remediation practice. A membrane applied over concrete that has not been mechanically prepared to the correct ICRI CSP profile — or applied over residual tile adhesive, laitance, surface contamination, or an elevated-moisture substrate — will not bond correctly and will fail under normal use and exposure conditions. The membrane may initially appear correctly applied but will progressively delaminate, blister, and lift as it is exposed to thermal cycling, ponding water, and foot traffic. The cost of surface preparation by diamond grinding and scarifying is a small fraction of the cost of a membrane failure — failed membranes require full tile and membrane removal and complete re-application, repeating the entire remediation scope. Do not apply primer to any area of the substrate that has not been correctly prepared, vacuumed, tested for moisture, and confirmed compliant with the membrane manufacturer TDS requirements.
              </p>
            </div>

            {/* ── BOX 3 — AMBER: confirm CSP ── */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
                  <AlertTriangle size={15} />
                </div>
                <h3 className="text-base font-extrabold text-amber-900">CONFIRM THE REQUIRED CSP PROFILE WITH THE MEMBRANE MANUFACTURER BEFORE COMMENCING SURFACE PREPARATION</h3>
              </div>
              <p className="text-sm leading-7 text-amber-900">
                Different liquid-applied waterproofing membrane systems specify different ICRI CSP surface profile requirements. Most liquid-applied PU, acrylic, and cementitious membranes specify CSP 3–4, achieved by diamond cup wheel grinding. Some membrane systems — particularly those used over heavily contaminated or painted substrates — may require CSP 5–6, achieved by scarifying. The distinction is important: a CSP 5–8 surface produced by scarifying may require a levelling or skim coat before a liquid-applied membrane can be applied at the correct film thickness. Do not assume CSP 3–4 applies to all systems. Confirm the required CSP profile with the specific membrane manufacturer TDS and obtain written confirmation from the membrane technical representative if the substrate condition is unusual or if a non-standard preparation method is being considered. Record the achieved CSP profile and preparation method in the project QA record.
              </p>
            </div>

            {/* ── BOX 4 — BLUE: QA record ── */}
            <div className="rounded-2xl border border-sky-200 bg-sky-50 p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-700 text-white">
                  <Info size={15} />
                </div>
                <h3 className="text-base font-extrabold text-sky-900">DOCUMENT SURFACE PREPARATION AND MOISTURE TESTING AS A QA RECORD BEFORE PROCEEDING TO PRIMER APPLICATION</h3>
              </div>
              <p className="text-sm leading-7 text-sky-900">
                The surface preparation stage of balcony waterproofing remediation must be documented as part of the project quality assurance record before primer application commences. The QA record for surface preparation should include: date of surface preparation, preparation method used (demolition chisel, diamond grinding, scarifying — with tool reference), CSP profile achieved (with photographic evidence), concrete moisture readings (instrument model, calibration reference, test locations, and readings), any substrate repairs completed before preparation (repair mortar product and curing period), and the name and signature of the supervising applicator or waterproofing consultant who cleared the substrate for primer application. On Class 2 strata remediation projects, this record is typically required by the owners corporation, strata manager, or certifier as part of the project QA file. Photographs of the prepared substrate, moisture meter readings, and any substrate repairs are the minimum photographic evidence. Do not proceed to primer application until the surface preparation QA record is complete and has been signed off.
              </p>
            </div>

          </div>
        </section>

        {/* ── Disclaimer + related links ── */}
        <section className="border-t border-slate-200 bg-slate-50 px-4 sm:px-8 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Disclaimer</p>
              <p className="text-xs leading-6 text-amber-900">
                This page provides general technical information only. Final tool selection and surface preparation methods must be confirmed against the current membrane manufacturer TDS, project specification, and Safe Work Australia silica dust regulations and Code of Practice: Managing the Risks of Respirable Crystalline Silica. Dry cutting or grinding of concrete, ceramic tile, tile adhesive, or sand-cement screed on site without mandatory dust extraction controls is a WHS regulatory breach — confirm site WHS controls before commencing any grinding, cutting, or demolition. Confirm the required ICRI CSP profile with the membrane system manufacturer before commencing surface preparation. Do not rely on this reference as a substitute for professional waterproofing consultant advice.
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
                  href: "/ai-scope-builder",
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
      <SeoCrossPromo />

      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <Link href="/repair-systems/balcony-waterproofing-failure" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">
            ← Balcony Waterproofing Failure
          </Link>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">
              A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
            <div className="flex flex-col gap-2">
              <Link href="/directory" className="hover:text-sky-700">Business Directory</Link>
              <Link href="/repair-systems" className="hover:text-sky-700">Repair Systems</Link>
              <Link href="/defect-library" className="hover:text-sky-700">Defect Library</Link>
              <Link href="/industry-news" className="hover:text-sky-700">News &amp; Insights</Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/advertise" className="hover:text-sky-700">Advertise With Us</Link>
              <Link href="/contact" className="hover:text-sky-700">Contact</Link>
              <Link href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-sky-700">Terms</Link>
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
