import type { Metadata } from "next";
import Link from "next/link";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Overflow Issues | Remedial Building Australia",
  description: "Technical guide to roof and podium overflow issues — inadequate overflow provision, blockage and design deficiencies in Class 2 buildings.",
};

const inspectionItems = [
  "Check all parapet walls and box gutters for the presence and condition of overflow outlets.",
  "Measure the invert level of all overflow outlets relative to the membrane or finished surface level — overflows should be at or within 25 mm above the primary outlet invert.",
  "Inspect all overflow outlets for blockage, debris and restriction from leaf guards or caps.",
  "Calculate whether the total overflow outlet area is sufficient for the roof catchment area under AS/NZS 3500.3.",
  "Assess balcony drainage capacity by measuring outlet sizes and grate open areas relative to catchment.",
  "Conduct a hose test simulating heavy rain to observe drainage performance and identify overflow thresholds.",
  "Check that overflows discharge to a location where the overflow water volume can be safely managed without further damage.",
  "Review design drawings and hydraulic plans to confirm the intended overflow provision against the built condition.",
];

const methodology = [
  "Engage a hydraulic engineer or plumbing consultant to calculate the required overflow capacity for all roof catchments.",
  "Install new overflow scuppers or outlets at all parapet locations where absent — position at maximum 25 mm above the primary outlet level.",
  "Size overflow outlets to pass the design storm event with primary drainage assumed blocked, in accordance with AS/NZS 3500.3.",
  "Where existing overflows are blocked, clear all debris and confirm openings are unobstructed.",
  "Lower overflow outlet inverts where they are installed above the required threshold level.",
  "For box gutters without overflow provision, cut new overflow openings at the required level and install correctly sized pre-formed outlets.",
  "Ensure all overflow discharge points direct water away from occupied areas, entrances and electrical equipment.",
  "Conduct a flood test after installation to confirm overflow activation at the correct water level.",
  "Record all overflow outlet sizes, positions and invert levels in the building maintenance records.",
];

const risks = [
  "Catastrophic internal flooding of occupied levels below the roof",
  "Structural damage from sudden and large water ingress events",
  "Damage to building services, electrical systems and fitout",
  "Significant consequential damage to lot owner property",
  "Insurance claims and disputes from unmitigated overflow events",
  "Building Commission non-conformance with AS/NZS 3500.3",
  "Potential structural overloading of the roof structure from retained water",
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
              <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-sky-950">Overflow Issues</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">Overflow failure occurs when the primary drainage system of a roof, balcony, podium or box gutter is unable to cope with the design storm rainfall intensity, causing water to back up and breach the building envelope. Australian Standard AS/NZS 3500.3 requires that all roof areas are provided with a secondary overflow system capable of passing the design storm event in the event that primary drainage is blocked. Absent, blocked or undersized overflow provisions are a common construction defect in Class 2 buildings and represent a significant risk of catastrophic internal flooding.</p>
            </div>
          </div>

          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard title="Common Signs" items={["Water overflowing at parapet walls during heavy rain", "Overflow staining on facade surfaces below parapet and eave levels", "Absence of overflow outlets or scuppers at parapets", "Overflow outlets that are positioned above the design water level", "Box gutters without secondary overflow provision", "Balcony drainage unable to cope with moderate to heavy rainfall", "Internal flooding at door thresholds and wall bases following storm events"]} />
            <InfoCard title="Common Causes" items={["Absence of overflow outlets at parapet walls as required by AS/NZS 3500.3", "Primary drainage outlets blocked by debris causing water to rise to overflow level", "Overflow outlets installed too high — above the effective overflow threshold", "Insufficient number of overflow outlets for the roof catchment area", "Overflow scuppers sealed or blocked during subsequent works", "Box gutter design without secondary overflow provision", "Balcony drainage capacity inadequate for the catchment area and local rainfall intensity"]} />
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
                {["Overflow scupper and outlet installation systems", "Parapet and box gutter overflow systems", "Hydraulic drainage design and assessment services", "Drainage capacity upgrade systems", "Roof drainage maintenance programmes"].map((item) => (
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
