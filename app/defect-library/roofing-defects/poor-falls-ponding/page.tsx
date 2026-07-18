import type { Metadata } from "next";
import Link from "next/link";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Poor Falls & Ponding | Remedial Building Australia",
  description: "Technical guide to poor roof drainage falls and ponding water — causes, inspection requirements and repair methodology for Class 2 buildings.",
};

const inspectionItems = [
  "Survey the roof surface with a digital level or water test to identify all low points and measure falls to each outlet.",
  "Record the fall measurement from each low point to its nominated drainage outlet — flag all falls below 1:100.",
  "Inspect all drainage outlet positions relative to the roof surface — outlets sitting proud of the surface are a design defect.",
  "Check all drainage outlets for blockage, restricted screens and debris accumulation.",
  "Assess the structural slab profile for evidence of deflection causing ponding not related to the screed falls.",
  "Review design drawings to confirm the specified drainage falls and outlet locations against the built condition.",
  "Engage a waterproofing consultant or engineer to confirm the fall reformation requirements and methodology.",
  "Assess the capacity of existing drainage outlets against the catchment area and local rainfall intensity data.",
];

const methodology = [
  "Engage a waterproofing consultant and engineer to confirm the fall reformation approach and confirm outlet positions.",
  "Remove existing membrane, insulation, topping slab or screed to expose the structural substrate.",
  "Assess the structural slab profile and confirm whether re-falling is required at screed level or whether the structural slab must be modified.",
  "Install additional drainage outlets where existing outlets are inadequate for the catchment area or are incorrectly positioned.",
  "Form drainage falls using lightweight polymer-modified screed to achieve a minimum 1:100 fall to all outlets.",
  "Apply a waterproofing membrane system over the reformed falls in accordance with AS 4654.",
  "Set all drainage outlet frames flush with or below the finished waterproofing membrane level.",
  "Conduct a flood test to confirm falls and drainage performance before finalising.",
  "Install a UV-protective topping coat, pavers or insulation board as specified.",
  "Record all QA documentation including fall survey results, flood test data and photographs.",
];

const risks = [
  "Accelerated membrane degradation from UV and hydrostatic cycling",
  "Structural overloading of the roof slab from accumulated water weight",
  "Overflow of ponded water into the building at parapets and upturns",
  "Increased risk of waterproofing failure at low points where membrane is most stressed",
  "Building Commission non-conformance with AS 1428 drainage requirements",
  "Repeated failure of membrane systems where falls are not corrected before re-waterproofing",
  "Tenant and owner amenity complaints from ponding visible from occupied levels",
];

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <SiteHeader />

      <main className="px-6 py-20">
        <section className="mx-auto max-w-7xl">
          <Link href="/defect-library/roofing-defects" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100">
            ← Back to Roofing Defects
          </Link>

          <div className="mt-10">
            <div>
              <PageNav />
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Roofing Defects</p>
              <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-sky-950">Poor Falls & Ponding</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">Inadequate drainage falls on flat and low-pitched roofs and podium decks cause water to pond rather than drain freely to outlets. Ponding water places additional hydrostatic load on the structure, accelerates membrane degradation through UV and wet-dry cycling, and increases the risk of overflow in heavy rain events. Under AS 4654 and AS 1428, a minimum 1:100 fall to drainage outlets is required on waterproofed roof decks. Falls below this threshold are a design and construction defect that must be remediated as part of any roof waterproofing works.</p>
            </div>
          </div>

          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard title="Common Signs" items={["Visible pools of water remaining on the roof surface 48 hours after rain", "Membrane staining, tide marks and salt deposits in ponded areas", "Accelerated membrane blistering and surface breakdown in low-point areas", "Debris accumulation in persistently wet zones", "Drainage outlets sitting above the surrounding surface level", "Internal ceiling staining directly below persistent ponding zones", "Visible deflection or sag in the roof structure beneath ponding areas"]} />
            <InfoCard title="Common Causes" items={["Insufficient structural falls designed into the roof or podium slab", "Slab deflection under load causing areas to slope toward the centre", "Drainage outlets installed above the membrane surface level", "Blocked or undersized drainage outlets unable to cope with rainfall intensity", "Topping screed applied without adequate fall reforming", "Incorrect location of outlets relative to slab low points", "Inadequate number of drainage outlets for the catchment area"]} />
            <InfoCard title="Risk of Neglect" items={risks} />
          </section>

          <section className="mt-16 rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-sky-950">Inspection Requirements</h2>
            <ul className="mt-8 space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-7">
              {inspectionItems.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-8 text-slate-800">
                  <span className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-800" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <div className="mt-6">
            <Link href="/ai-scope-builder" className="inline-flex rounded-xl bg-sky-900 px-5 py-3 text-base font-semibold text-white hover:bg-sky-800">
              Start Inspection Checklist
            </Link>
            <p className="mt-2 text-sm text-slate-500">Create a project inspection record, add defect locations, upload photos, and save notes for scope writing.</p>
          </div>

          <section className="mt-16 rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-sky-950">Typical Repair Methodology</h2>
<ol className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-7 py-6">
              {methodology.map((step, index) => (
                <li key={step} className="flex gap-4 text-base leading-8 text-slate-800" style={{ marginBottom: index < methodology.length - 1 ? "3mm" : 0 }}>
                  <span className="mt-1 shrink-0 text-sm font-bold text-slate-500">{String(index + 1).padStart(2, "0")}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-16">
            <Link href="/repair-systems" className="block rounded-3xl border border-slate-200 bg-white p-8 text-sky-950 shadow-md transition hover:shadow-xl">
              <h3 className="text-2xl font-bold">Related Repair Systems</h3>
              <ul className="mt-4 space-y-2">
                {["Screed fall reformation systems", "Drainage outlet installation and upgrade systems", "Waterproofing membrane replacement systems", "Overflow outlet installation systems", "Drainage outlet cover and grate systems"].map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-slate-700">
                    <span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-800" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 font-bold text-red-700">Open Repair Systems →</div>
            </Link>
          </section>
        </section>
      </main>

      <SeoCrossPromo />

      <footer className="border-t border-sky-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-12">
          <Link href="/" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200">← Home</Link>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">A structured Australian remedial building knowledge platform for defects, repair systems, materials and future AI-assisted scope writing.</p>
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

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-3xl bg-white p-7 shadow-sm">
      <div className="mb-5 h-1.5 w-16 rounded-full bg-red-700" />
      <h2 className="text-2xl font-bold text-sky-950">{title}</h2>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-base leading-8 text-slate-800">
            <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-red-700" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
