import type { Metadata } from "next";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Cladding Failure | Remedial Building Australia",
  description:
    "Technical guide to facade cladding failure in Class 2 buildings — fibre cement, composite and aluminium panel defects, inspection requirements and repair methodology.",
};

const inspectionItems = [
  "Inspect all cladding panels for cracking, delamination, blistering, discolouration and surface degradation.",
  "Check all panel-to-panel joints and cladding-to-frame connections for sealant failure, panel movement and fixing corrosion.",
  "Assess the condition of all fixings visible at panel edges and joints — look for corrosion, pull-through or shear failure.",
  "Inspect the face of fibre cement panels for moisture absorption, surface breakdown or delamination of the factory coating.",
  "For aluminium composite panels (ACP), check for delamination of the aluminium face sheets from the core — particularly relevant for panels installed pre-2019 with combustible PE core.",
  "Assess the drainage system behind the cladding — confirm the presence and condition of cavity drainage and ventilation.",
  "Inspect the interface of cladding panels with windows, doors, penetrations and roof elements for sealant integrity.",
  "Review the fire classification of the installed cladding system, particularly on buildings over two storeys, and confirm compliance with NCC Volume 1 requirements.",
];

const methodology = [
  "Engage a facade engineer to assess the extent of failure and confirm the required scope — consider whether panel replacement, re-coating or full re-cladding is appropriate.",
  "Where combustible cladding is identified, report immediately to the relevant building authority and engage a fire safety engineer in addition to the facade engineer.",
  "Erect scaffolding or swing stage to provide safe access to all affected cladding areas.",
  "Remove defective cladding panels from the affected zones, taking care not to damage the substrate framing or membrane behind.",
  "Inspect the substrate and waterproofing membrane behind the removed panels for damage, moisture or mould — repair before re-cladding.",
  "Source replacement panels that match in specification, colour, texture and fire performance — confirm fire classification prior to ordering.",
  "Install replacement panels in accordance with the manufacturer's installation specification and the engineer's detailing.",
  "Apply compatible sealant to all panel joints and interfaces, using backer rod to achieve the correct sealant width-to-depth ratio.",
  "Where the cladding system is to be retained and re-coated, prepare all panel surfaces by cleaning, sanding or abrasive blasting to remove all contamination.",
  "Apply a compatible primer system and finish coat appropriate to the panel material and the specified colour.",
  "Inspect all panel fixings and replace any corroded, loose or inadequate fixings before finalising the re-cladding.",
  "Record all QA documentation including panel fire certificates, photographs, sealant product details and fixing specifications.",
];

const risks = [
  "Combustible cladding panels presenting a significant fire spread risk in multi-storey buildings.",
  "Water ingress behind failed panels causing substrate damage, framing corrosion and internal moisture problems.",
  "Panel detachment from height creating a serious falling hazard.",
  "Accelerating panel degradation from UV exposure and moisture cycling.",
  "Non-compliance with NCC fire performance requirements for external facades.",
  "Significant legal and financial liability for owners and builders where combustible cladding is present.",
  "Building Commission intervention and rectification orders where unsafe cladding is identified.",
];

export default function CladdingFailurePage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <SiteHeader />

      <main className="px-6 py-20">
        <section className="mx-auto max-w-7xl">
          <a href="/defect-library/facade-external-envelope" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100">
            ← Back to Façade & External Envelope
          </a>

          <div className="mt-10">
            <div>
              <PageNav />
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Façade & External Envelope</p>
              <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">Cladding Failure</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">
                Cladding failure in Class 2 buildings encompasses delamination, cracking, surface degradation, fixing failure and moisture ingress affecting fibre cement, aluminium composite, compressed sheet and similar panel cladding systems. The Grenfell Tower fire and subsequent Australian reviews have elevated the fire safety performance of external cladding as a critical issue — particularly for aluminium composite panels with combustible polyethylene cores installed prior to 2019. Remediation scope must address both performance and safety, with fire engineer input required for multi-storey buildings.
              </p>
            </div>
          </div>

          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard
              title="Common Signs"
              items={[
                "Cracking, blistering or delamination of panel faces",
                "Discolouration, UV fade and surface coating breakdown",
                "Failed or open sealant joints between panels",
                "Visible panel movement, buckling or distortion",
                "Rust staining from corroding fixing systems",
                "Water ingress visible at internal wall faces behind cladding",
                "Panels with combustible ACP core on buildings over two storeys",
              ]}
            />
            <InfoCard
              title="Common Causes"
              items={[
                "Use of combustible aluminium composite panels on high-rise buildings",
                "Failure of factory-applied coating systems from UV and moisture exposure",
                "Inadequate or absent drainage cavity behind the cladding skin",
                "Corrosion of fixing systems from incompatible metals or exposed conditions",
                "Sealant joint failure allowing water behind the panel system",
                "Insufficient panel-to-panel joint width for thermal movement",
                "Panels installed without manufacturer specification compliance",
              ]}
            />
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
            <a href="/ai-scope-builder" className="inline-flex rounded-xl bg-sky-900 px-5 py-3 text-base font-semibold text-white hover:bg-sky-800">
              Start Inspection Checklist
            </a>
            <p className="mt-2 text-sm text-slate-500">Create a project inspection record, add defect locations, upload photos, and save notes for scope writing.</p>
          </div>

          <section className="mt-16 rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-sky-950">Typical Repair Methodology</h2>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
              Cladding remediation scope must be confirmed by a facade engineer. Fire safety compliance must be confirmed before any replacement panels are installed on buildings of two storeys or more.
            </p>
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
            <a href="/repair-systems" className="block rounded-3xl border border-slate-200 bg-white p-8 text-sky-950 shadow-md transition hover:shadow-xl">
              <h3 className="text-2xl font-bold">Related Repair Systems</h3>
              <ul className="mt-4 space-y-2">
                {["Fire-compliant cladding replacement systems", "Panel re-coating and surface treatment systems", "Joint sealant replacement programmes", "Cladding fixing and anchor systems", "Cavity drainage and ventilation systems"].map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-slate-700">
                    <span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-800" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 font-bold text-red-700">Open Repair Systems →</div>
            </a>
          </section>
        </section>
      </main>

      <SeoCrossPromo />

      <footer className="border-t border-sky-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-12">
          <a href="/" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200">← Home</a>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">A structured Australian remedial building knowledge platform for defects, repair systems, materials and future AI-assisted scope writing.</p>
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
