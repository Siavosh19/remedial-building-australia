import type { Metadata } from "next";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Inadequate Drainage Design | Remedial Building Australia",
  description: "Technical guide to inadequate stormwater drainage design in Class 2 buildings — hydraulic deficiencies, design faults and remediation.",
};

const inspectionItems = [
  "Engage a hydraulic engineer to conduct a full hydraulic assessment of the stormwater system.",
  "Collect CCTV inspection data of all existing stormwater infrastructure.",
  "Measure all pipe diameters, pit sizes, falls and inlet grate open areas.",
  "Confirm the contributing catchment area to all drain elements.",
  "Run hydraulic modelling using local design rainfall intensity data from the Bureau of Meteorology.",
  "Compare the modelled capacity against the design storm requirement under AS/NZS 3500.3.",
  "Identify all elements of the system that are deficient in capacity.",
  "Confirm the capacity of the downstream council stormwater system at the connection point.",
];

const methodology = [
  "Engage a hydraulic engineer to prepare a drainage upgrade design based on the hydraulic assessment findings.",
  "Submit a development application where council consent is required for infrastructure upgrades.",
  "Upsize deficient stormwater pipes in accordance with the hydraulic engineer design.",
  "Install additional pits and grate inlets to increase surface inlet capacity.",
  "Install overflow grates or scuppers at all locations where surcharging may cause internal flooding.",
  "Regrade surfaces to improve falls to drainage inlets where inadequate grading is a contributing factor.",
  "Install pumped drainage systems in basement areas where gravity drainage to the council system is not achievable.",
  "Confirm the completed system performance through hydraulic testing and CCTV inspection.",
  "Record all upgrade works with as-built drawings, hydraulic engineer certification and photographs.",
];

const risks = [
  "Basement flooding causing significant damage to property, vehicles and building services",
  "Insurance claims and coverage disputes for repeated flood events",
  "Building Commission and council intervention for systemic drainage failure",
  "Strata liability for damage to lot owner property from flooding",
  "Ongoing remediation cost escalation if flooding recurs without hydraulic upgrade",
  "Safety risk to occupants from rapidly rising water in basement areas",
  "Potential requirement to obtain development consent for drainage upgrades",
];

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <SiteHeader />
      <main className="px-6 py-20">
        <section className="mx-auto max-w-7xl">
          <a href="/defect-library/services-drainage" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100">← Back to Services & Drainage</a>
          <div className="mt-10">
            <div>
              <PageNav />
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Services & Drainage</p>
              <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">Inadequate Drainage Design</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">Inadequate drainage design is a systemic defect — where the stormwater system was designed or constructed with insufficient capacity for the contributing catchment area and local rainfall intensity. Unlike blocked drainage (which can be rectified by cleaning), design deficiency requires hydraulic re-assessment and physical upgrade of the infrastructure. In Class 2 buildings, drainage design deficiencies are often not apparent until a design storm event — typically the 1 in 100-year storm — reveals that the system cannot cope, causing flooding that damages the building and its occupants.</p>
            </div>
          </div>
          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard title="Common Signs" items={["Persistent flooding at car park entries and basement levels during storm events", "Surface ponding across the site in areas that should drain freely", "Overflowing pits during events that appear to be of moderate intensity", "Balcony and podium areas flooding before the drainage outlets are engaged", "Surcharging at the connection to the council stormwater system", "Water entry to the building during any significant rain event", "Drainage infrastructure that is visibly undersized relative to the catchment area"]} />
            <InfoCard title="Common Causes" items={["Drainage system designed to an inadequate storm return period (e.g. 1 in 5 year rather than 1 in 100 year)", "Hydraulic calculation errors in original design", "Increased impervious area from subsequent development not reflected in drain sizing", "Incorrect rainfall intensity data used in the hydraulic design", "Inadequate gutter and outlet sizes for the roof catchment area", "Incorrect pit spacing relative to inlet capacity", "Failure of the hydraulic consultant to account for building configuration in the catchment area"]} />
            <InfoCard title="Risk of Neglect" items={risks} />
          </section>
          <section className="mt-16 rounded-3xl bg-white p-8 shadow-sm">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <h2 className="text-3xl font-bold text-sky-950">Inspection Requirements</h2>
              <a href="#" className="rounded-xl bg-sky-900 px-5 py-3 text-base font-semibold text-white hover:bg-sky-800">Download Inspection Checklist</a>
            </div>
            <ul className="mt-8 space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-7">
              {inspectionItems.map((item) => (<li key={item} className="flex gap-3 text-base leading-8 text-slate-800"><span className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-800" />{item}</li>))}
            </ul>
          </section>
          <div className="mt-6">
            <a href="/ai-scope-builder" className="inline-flex rounded-xl bg-sky-900 px-5 py-3 text-base font-semibold text-white hover:bg-sky-800">
              Start Inspection Checklist
            </a>
            <p className="mt-2 text-sm text-slate-500">Create a project inspection record, add defect locations, upload photos, and save notes for scope writing.</p>
          </div>
          <section className="mt-16 rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-sky-950">Typical Repair Methodology</h2>
<ol className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-7 py-6">
              {methodology.map((step, index) => (<li key={step} className="flex gap-4 text-base leading-8 text-slate-800" style={{ marginBottom: index < methodology.length - 1 ? "3mm" : 0 }}><span className="mt-1 shrink-0 text-sm font-bold text-slate-500">{String(index + 1).padStart(2, "0")}.</span><span>{step}</span></li>))}
            </ol>
          </section>
          <section className="mt-16">
            <a href="/repair-systems" className="block rounded-3xl border border-slate-200 bg-white p-8 text-sky-950 shadow-md transition hover:shadow-xl">
              <h3 className="text-2xl font-bold">Related Repair Systems</h3>
              <ul className="mt-4 space-y-2">{["Hydraulic drainage design and assessment services", "Stormwater pipe upsizing programmes", "Stormwater pit and inlet upgrade systems", "Basement sump and pump systems", "Surface drainage and grading improvement systems"].map((item) => (<li key={item} className="flex gap-3 text-base leading-7 text-slate-700"><span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-800" />{item}</li>))}</ul>
              <div className="mt-6 font-bold text-red-700">Open Repair Systems →</div>
            </a>
          </section>
        </section>
      </main>
      <SeoCrossPromo />

      <footer className="border-t border-sky-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-12"><a href="/" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200">← Home</a></div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div><div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div><p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">A structured Australian remedial building knowledge platform for defects, repair systems, materials and future AI-assisted scope writing.</p></div>
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

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-3xl bg-white p-7 shadow-sm">
      <div className="mb-5 h-1.5 w-16 rounded-full bg-red-700" />
      <h2 className="text-2xl font-bold text-sky-950">{title}</h2>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (<li key={item} className="flex gap-3 text-base leading-8 text-slate-800"><span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-red-700" />{item}</li>))}
      </ul>
    </div>
  );
}
