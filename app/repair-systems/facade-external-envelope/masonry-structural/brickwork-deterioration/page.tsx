import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Brickwork Deterioration — Masonry & Structural — Remedial Building Australia",
  description:
    "Technical repair system reference for brickwork deterioration in Australian Class 2 strata facade remediation — repointing mortars, brick replacement, remedial cavity wall ties, lintel systems, cavity flashings, movement joints, silane water repellents and masonry cleaning — 17 product categories.",
};

const BASE = "/repair-systems/facade-external-envelope/masonry-structural/brickwork-deterioration";
const HUB = "/repair-systems/facade-external-envelope/masonry-structural";
const PARENT = "/repair-systems/facade-external-envelope";

const GROUPS = [
  {
    heading: "Repointing Mortars",
    items: [
      {
        label: "Repointing mortar — lime-based",
        slug: "repointing-mortar-lime",
        count: 3,
        description: "NHL 3.5, NHL 5.0 and lime putty gauged mortars for heritage and soft brick masonry repointing — breathable, compatible with pre-1950s brick.",
      },
      {
        label: "Repointing mortar — cement-based",
        slug: "repointing-mortar-cement",
        count: 3,
        description: "GP cement, polymer-modified and pre-mixed masonry cement mortars for modern brick repointing — AS 3700 compliant mix proportions.",
      },
    ],
  },
  {
    heading: "Brick Replacement & Repair",
    items: [
      {
        label: "Brick replacement and matching systems",
        slug: "brick-replacement-matching-systems",
        count: 3,
        description: "Reclaimed, manufactured matching and epoxy fragment repair systems for isolated brick replacement in Class 2 strata facades.",
      },
    ],
  },
  {
    heading: "Remedial Cavity Wall Ties",
    items: [
      {
        label: "Remedial cavity wall ties — stainless helical (re-tie)",
        slug: "remedial-cavity-wall-ties-stainless-helical",
        count: 3,
        description: "Stainless helical wall ties — 6 mm grout-in, 8 mm heavy-duty and dry-fix friction systems — for re-tying brick veneer and cavity masonry.",
      },
      {
        label: "Remedial cavity wall ties — chemical resin anchor",
        slug: "remedial-cavity-wall-ties-chemical-resin-anchor",
        count: 3,
        description: "Epoxy and vinylester resin anchor systems and proprietary kit re-tie systems for cavity wall tie replacement where grouted systems are not suitable.",
      },
      {
        label: "Remedial cavity wall ties — mechanical expansion",
        slug: "remedial-cavity-wall-ties-mechanical-expansion",
        count: 3,
        description: "Sleeve torque-control, undercut expansion and wedge expansion mechanical cavity wall tie systems for re-tying masonry facades without resin.",
      },
    ],
  },
  {
    heading: "Lintel Systems",
    items: [
      {
        label: "Lintel systems — duplex coated steel",
        slug: "lintel-systems-duplex-coated-steel",
        count: 3,
        description: "Duplex coated (hot-dip galvanised + powder coat) steel angle, channel and flat-bar lintels for new and replacement lintel installation.",
      },
      {
        label: "Lintel systems — galvanised steel",
        slug: "lintel-systems-galvanised-steel",
        count: 3,
        description: "Hot-dip galvanised steel angle, channel and flat-bar lintels — AS 4100 steel, minimum 85 µm HDG coating — for standard exposure environments.",
      },
      {
        label: "Lintel systems — stainless steel",
        slug: "lintel-systems-stainless-steel",
        count: 3,
        description: "Grade 316 stainless steel angle, flat-bar and back-to-back angle lintels for coastal, aggressive and marine exposure environments.",
      },
      {
        label: "Lintel systems — concrete (precast & in-situ)",
        slug: "lintel-systems-concrete",
        count: 3,
        description: "Standard reinforced, prestressed and engineer-designed precast concrete lintels for masonry facade openings — AS 3600 compliant.",
      },
    ],
  },
  {
    heading: "Cavity Flashing",
    items: [
      {
        label: "Cavity flashing — aluminium",
        slug: "cavity-flashing-aluminium",
        count: 3,
        description: "Mill finish, powder coated and profiled aluminium cavity tray flashings — AS 3700 compliant, non-corrosive, for standard masonry cavity applications.",
      },
      {
        label: "Cavity flashing — lead",
        slug: "cavity-flashing-lead",
        count: 3,
        description: "Code 4, Code 5 and Code 6 milled lead sheet flashings — traditional material with excellent formability for complex profiles and heritage restoration.",
      },
      {
        label: "Cavity flashing — embossed aluminium-cored (Alcore-type)",
        slug: "cavity-flashing-alcore",
        count: 3,
        description: "Bitumen-aluminium composite, polyester reinforced and self-adhesive Alcore-type embossed aluminium-cored cavity flashings with integral weep formers.",
      },
    ],
  },
  {
    heading: "Movement Joints & Water Repellents",
    items: [
      {
        label: "Movement joint and polyurethane sealant systems",
        slug: "movement-joint-polyurethane-sealant",
        count: 3,
        description: "Sikaflex-11FC, Mapeflex PU45 and Dymonic FC high-movement polyurethane sealants for masonry control and movement joints.",
      },
      {
        label: "Penetrating silane water repellent systems",
        slug: "penetrating-silane-water-repellent",
        count: 3,
        description: "Sika Protectosil, Mapei Antipluviol and Dulux Weathershield penetrating silane/siloxane water repellents for masonry facade protection.",
      },
    ],
  },
  {
    heading: "Masonry Cleaning",
    items: [
      {
        label: "Masonry cleaning — acid wash",
        slug: "masonry-cleaning-acid-wash",
        count: 3,
        description: "Hydrochloric, phosphoric and sulphamic acid brick cleaning systems for efflorescence, mortar smear and general masonry surface preparation.",
      },
      {
        label: "Masonry cleaning — chemical and poultice",
        slug: "masonry-cleaning-chemical-poultice",
        count: 3,
        description: "Attapulgite, kaolin and proprietary masonry poultice systems for stain removal, salt draw and non-acid cleaning of heritage masonry.",
      },
    ],
  },
] as const;

export default function BrickworkDeteriorationPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />

      <main>
        <section className="border-b border-slate-200 bg-white px-4 sm:px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <Link href="/" className="hover:text-sky-700 transition">Home</Link><span>/</span>
              <Link href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</Link><span>/</span>
              <a href={PARENT} className="hover:text-sky-700 transition">Facade &amp; External Envelope</a><span>/</span>
              <a href={HUB} className="hover:text-sky-700 transition">Masonry &amp; Structural</a><span>/</span>
              <span className="text-sky-950">Brickwork Deterioration</span>
            </nav>
            <PageNav />
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 03 — Facade &amp; External Envelope</p>
            <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
              Brickwork deterioration — repair systems
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Technical product reference for brickwork deterioration repair in Australian Class 2 strata — select a product category to view system information, brand comparisons and procurement sources for repointing mortars, cavity wall tie replacement, lintel systems, cavity flashings, masonry cleaning and surface protection.
            </p>
          </div>
        </section>

        <section className="px-4 sm:px-8 py-14">
          <div className="mx-auto max-w-7xl space-y-12">
            {GROUPS.map((group) => (
              <div key={group.heading}>
                <div className="mb-6 flex items-start gap-3">
                  <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
                  <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-red-700">{group.heading}</h2>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((item) => (
                    <a
                      key={item.slug}
                      href={`${BASE}/${item.slug}`}
                      className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <div className="h-0.5 w-8 rounded-full bg-red-700" />
                        <span className="inline-flex items-center gap-1 rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-[10px] font-bold text-green-700">
                          <span className="h-1 w-1 rounded-full bg-green-500" />Live
                        </span>
                      </div>
                      <h3 className="text-base font-extrabold leading-tight text-sky-950 transition group-hover:text-sky-700">{item.label}</h3>
                      <p className="mt-2 text-xs leading-5 text-slate-500">{item.description}</p>
                      <p className="mt-3 text-xs font-semibold text-slate-400">{item.count} product systems</p>
                      <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-sky-700 transition group-hover:text-red-700">
                        View systems <ArrowRight size={12} />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SeoCrossPromo />

      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <a href={HUB} className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">← Masonry &amp; Structural</a>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.</p>
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
              <Link href="/faq" className="hover:text-sky-700">FAQ</Link>
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
