import type { Metadata } from "next";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Downpipe Defects | Remedial Building Australia",
  description: "Technical guide to downpipe defects in Class 2 buildings — leaks, blockage, cracking and repair methodology.",
};

const inspectionItems = [
  "Inspect all external downpipes for cracking, joint failure, rust and physical damage.",
  "Trace all downpipes from gutter connection to point of discharge — confirm correct connection to stormwater.",
  "Inspect internal downpipe locations for moisture staining, acoustic evidence of leaks during rain.",
  "Check all downpipe strainers and outlets for blockage by debris.",
  "Conduct a flow test by running a hose into the gutter and observing downpipe performance.",
  "CCTV internal concealed downpipes where leaks are suspected but cannot be visually inspected.",
  "Assess the condition of all wall penetrations where downpipes pass through the building fabric.",
  "Confirm all downpipe discharge points comply with AS/NZS 3500.3 and are correctly connected to stormwater.",
];

const methodology = [
  "Replace all downpipe sections that are cracked, corroded, perforated or have failed joints.",
  "Clear all blocked downpipes by jetting or rodding and install strainers at all gutter outlets to prevent recurrence.",
  "Connect all surface-discharging downpipes to the stormwater system where not currently connected.",
  "Replace PVC downpipes with UV-stabilised or Colorbond downpipes where UV degradation is the cause of failure.",
  "Repair all wall penetrations where downpipes pass through the building fabric — apply sealant and flashing collar.",
  "Install expansion joints in long straight downpipe runs to accommodate thermal movement.",
  "Repair all render and substrate damage adjacent to defective downpipe locations.",
  "CCTV test replaced sections to confirm integrity before making good wall finishes over concealed pipes.",
  "Record all replaced downpipe sections with photographs and material specifications.",
];

const risks = [
  "Water damage to building facade and structure at defective downpipe locations",
  "Basement ingress from downpipes discharging adjacent to substructure",
  "Subfloor saturation causing timber decay and mould",
  "Erosion of landscaping and paving at surface discharge points",
  "Accelerating facade deterioration from concentrated water discharge",
  "Internal wall cavity moisture from concealed downpipe leaks",
  "Tree root intrusion at soil-level discharge points entering the drainage system",
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
              <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-sky-950">Downpipe Defects</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">Downpipes carry stormwater from gutters, balconies and roof outlets to the drainage system below. Defective downpipes — from cracking, joint failure, incorrect termination or blockage — discharge water directly against the building structure rather than to the drainage system. Over time, this causes progressive deterioration of the building fabric, including render cracking, masonry wetting, basement ingress and subfloor saturation. External downpipes on multi-storey buildings are exposed to UV and thermal cycling, while internal downpipes within wall cavities are frequently not inspected and can fail silently over many years.</p>
            </div>
          </div>
          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard title="Common Signs" items={["Visible water discharge from joints or cracks in external downpipes during rain", "Staining and moisture on walls adjacent to concealed internal downpipes", "Rust staining on facades from corroding steel downpipes", "Overflow at gutter-to-downpipe connections from blocked pipes", "Ground saturation at downpipe discharge points", "Cracking and spalling of render adjacent to leaking downpipe sections", "Downpipes discharging to surface rather than connected to stormwater system"]} />
            <InfoCard title="Common Causes" items={["Joint failure between downpipe sections from thermal movement and age", "Cracking of uPVC downpipes from UV degradation and thermal cycling", "Corrosion of steel downpipes from moisture and coastal salt exposure", "Blockage from leaf and debris accumulation at offset sections and bends", "Downpipes incorrectly terminated above ground rather than connected to drainage", "Internal downpipes damaged by occupant works or construction activity", "Inadequate fall on horizontal sections causing water to trap and corrode the pipe"]} />
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
              <ul className="mt-4 space-y-2">{["Downpipe replacement systems", "Colorbond and uPVC downpipe systems", "Downpipe strainer and leaf guard systems", "Downpipe connection to stormwater systems", "CCTV pipe inspection services"].map((item) => (<li key={item} className="flex gap-3 text-base leading-7 text-slate-700"><span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-800" />{item}</li>))}</ul>
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
