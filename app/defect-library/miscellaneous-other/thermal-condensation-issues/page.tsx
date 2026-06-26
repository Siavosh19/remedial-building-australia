import type { Metadata } from "next";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Thermal & Condensation Issues | Remedial Building Australia",
  description: "Technical guide to thermal performance deficiencies and condensation in Class 2 buildings — causes, assessment and remediation.",
};

const inspectionItems = [
  "Engage a thermal performance assessor to conduct an energy rating assessment of affected lots.",
  "Use a thermal imaging camera (thermographic survey) to identify insulation gaps, thermal bridges and air leakage paths.",
  "Measure surface temperatures of external walls and windows in winter conditions.",
  "Assess the insulation specification in the building fabric — review construction documents and conduct invasive checks where documentation is absent.",
  "Measure internal relative humidity over a monitoring period to quantify condensation risk.",
  "Inspect the vapour control layer for continuity and correct position — should be on the warm side of the insulation.",
  "Identify all thermal bridges — concrete balcony slabs, exposed slab edges, steel fixings through insulated panels.",
  "Engage a mechanical engineer to assess the ventilation system against the requirements for the building size and occupancy.",
];

const methodology = [
  "Engage a thermal performance engineer to confirm the upgrade specification based on assessment findings.",
  "Install insulation batts to all ceiling spaces that are accessible — specify R-values appropriate to the climate zone.",
  "Install blown-in insulation to wall cavities where batt installation is not possible without full strip-out.",
  "Upgrade all single-glazed windows to double-glazed or laminated glass where condensation risk or thermal performance is the driver.",
  "Apply insulating render or external wall insulation systems to thermally massive external walls where accessible.",
  "Seal all air infiltration paths — penetrations, service entries and wall-floor junctions — with a compatible sealant.",
  "Install a vapour control layer where absent on the warm side of insulation in high humidity or cold climate situations.",
  "Upgrade mechanical ventilation to achieve the minimum air changes required to control internal humidity.",
  "Apply a mould-resistant paint system to all affected surfaces after remediation.",
  "Conduct a post-upgrade thermal performance assessment to confirm compliance.",
];

const risks = [
  "Mould growth from condensation causing health risks for occupants",
  "Structural damage to wall framing and insulation from interstitial condensation",
  "High energy costs from inadequate thermal performance",
  "NCC non-compliance from insufficient insulation or glazing performance",
  "Building Commission and warranty claims from occupants",
  "Significant cost of retrofit insulation and thermal bridging remediation within existing buildings",
  "Difficulty in selling or renting thermally poor apartments in energy-conscious markets",
];

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <SiteHeader />
      <main className="px-6 py-20">
        <section className="mx-auto max-w-7xl">
          <a href="/defect-library/miscellaneous-other" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100">← Back to Miscellaneous & Other</a>
          <div className="mt-10">
            <div>
              <PageNav />
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Miscellaneous & Other</p>
              <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">Thermal & Condensation Issues</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">Thermal performance deficiencies and condensation problems in Class 2 buildings arise when the building envelope does not adequately restrict heat transfer and prevent condensation forming within the building fabric. The NCC specifies minimum energy efficiency requirements for Class 2 buildings — including insulation R-values for roofs, walls and floors, window glazing performance and air infiltration control. When these requirements are not met — or when the building is constructed with thermal bridges, inadequate vapour control or insufficient insulation — residents experience discomfort, high energy costs and, in the worst cases, condensation-driven mould and structural damage.</p>
            </div>
          </div>
          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard title="Common Signs" items={["Condensation forming on internal surfaces of external walls and windows", "Mould growth on external-facing walls and in poorly ventilated corner areas", "High energy costs from excessive heating and cooling loads", "Cold radiant surfaces — walls and ceilings cold to the touch in winter", "Moisture staining within wall cavities or on insulation batts", "Interstitial condensation visible when wall linings are removed", "Resident complaints of discomfort, cold drafts and high utility bills"]} />
            <InfoCard title="Common Causes" items={["Absent or insufficient ceiling and wall insulation below the NCC minimum R-values", "Thermal bridges — continuous concrete or steel elements bridging the insulated envelope", "Missing or incorrectly positioned vapour control layer", "Air infiltration at penetrations, joints and service entries bypassing insulation", "Single-glazed windows in climate zones requiring double-glazing for condensation control", "Uninsulated slab edges and perimeters in cold climates", "Insufficient exhaust ventilation allowing internal humidity to build up to condensation levels"]} />
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
              <ul className="mt-4 space-y-2">{["Ceiling and wall insulation installation systems", "External wall insulation systems", "Double-glazing and window upgrade systems", "Air infiltration sealing systems", "Mechanical ventilation upgrade systems"].map((item) => (<li key={item} className="flex gap-3 text-base leading-7 text-slate-700"><span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-800" />{item}</li>))}</ul>
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
