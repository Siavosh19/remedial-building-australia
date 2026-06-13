import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Pipe Penetration Failure | Remedial Building Australia",
  description: "Technical guide to pipe penetration failures in Class 2 buildings — failed seals, collars and water ingress methodology.",
};

const inspectionItems = [
  "Map all service penetrations through wet area floors, balcony slabs and roofs.",
  "Inspect each penetration for the presence and condition of a membrane collar or seal.",
  "Conduct a flood test over identified penetration locations to confirm water tightness.",
  "Lift tiles adjacent to penetrations to inspect the membrane collar bond and condition.",
  "Check the annular gap around each pipe — excessive gaps indicate inadequate sleeve sizing or pipe movement.",
  "Inspect the slab soffit below each penetration location for staining, moisture and active ingress.",
  "Use a moisture meter on the soffit concrete to quantify moisture levels at penetration locations.",
  "Engage a waterproofing consultant to confirm the collar type and repair specification for each penetration.",
];

const methodology = [
  "Confirm all defective penetration locations by flood testing before commencing repairs.",
  "Remove tiles, adhesive and screed from around each defective penetration to expose the membrane and slab.",
  "Remove the defective or absent collar or sealant from the penetration.",
  "Clean the pipe surface and surrounding substrate of all contamination and oil.",
  "Install a correctly sized pre-formed membrane collar — or site-form a collar using membrane bandage — compatible with the main membrane system.",
  "Bond the collar to the pipe and to the main membrane layer in accordance with the membrane manufacturer specification.",
  "Apply the main waterproofing membrane system and integrate with the collar to form a continuous watertight layer.",
  "Conduct a flood test after the membrane has cured and before tiles are reinstated.",
  "Reinstate tiles using polymer-modified adhesive and grout.",
  "Apply a polyurethane sealant to the grout joint immediately adjacent to each pipe.",
  "Record all repaired penetrations with flood test results, photographs and product details.",
];

const risks = [
  "Water ingress to the apartment or common area below the penetration",
  "Structural concrete deterioration from ongoing wetting at penetration edges",
  "Mould growth in wall and ceiling cavities from persistent ingress",
  "Damage to building services near the ingress point",
  "Strata liability for consequential damage to lot owner property",
  "Cost of full membrane removal and replacement if multiple penetrations are affected",
  "Progressive damage if the ingress source is incorrectly diagnosed and the wrong location is repaired",
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
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Services & Drainage</p>
              <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">Pipe Penetration Failure</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">Service pipe penetrations through slabs, walls and roofs are a consistent weak point in the building envelope. Each penetration creates an opening in the waterproofing system that must be sealed with a correctly installed collar or sleeve to prevent water ingress. In Class 2 buildings, penetrations through wet area floors and balcony slabs are particularly vulnerable — AS 3740 requires pre-formed or site-formed membrane collars to all penetrations in waterproofed areas. Failed collars, absent seals and incorrectly installed sleeves allow water to track along the outside of the pipe and through the slab, appearing as ingress below.</p>
            </div>
          </div>
          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard title="Common Signs" items={["Water staining or active ingress below pipe penetration locations in slabs", "Visible gap between pipe and surrounding screed, tile or membrane", "Failed or absent sealant at pipe-to-membrane or pipe-to-tile junctions", "Rust staining around metallic pipe penetrations through concrete slabs", "Mould growth at penetration locations in wet areas", "Gurgling sound in walls adjacent to pipe penetrations during rain", "Ingress tracking along the outside of downpipes through slab penetrations"]} />
            <InfoCard title="Common Causes" items={["Membrane collar not installed at pipe penetrations in waterproofed areas", "Pre-formed collar not bonded to the waterproofing membrane", "Pipe penetration sealed with silicone only — no collar or sleeve", "Pipe movement from thermal cycling breaking the seal at the penetration", "Penetration annular gap too large for the sealant to bridge effectively", "Pipe material incompatible with the sealant used (e.g. oily HDPE pipe)", "Penetrations cut after waterproofing installation, breaking the membrane"]} />
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
              <ul className="mt-4 space-y-2">{["Waterproofing membrane collar systems", "Pre-formed penetration collar systems", "Pipe sleeve and annular gap sealing systems", "Tile removal and reinstatement over penetrations", "Flood testing and investigation services"].map((item) => (<li key={item} className="flex gap-3 text-base leading-7 text-slate-700"><span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-800" />{item}</li>))}</ul>
              <div className="mt-6 font-bold text-red-700">Open Repair Systems →</div>
            </a>
          </section>
        </section>
      </main>
      <footer className="border-t border-sky-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-12"><a href="/" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200">← Home</a></div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div><div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div><p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">A structured Australian remedial building knowledge platform for defects, repair systems, materials and future AI-assisted scope writing.</p></div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
            <a href="/about" className="hover:text-sky-700">About</a>
            <a href="/contact" className="hover:text-sky-700">Contact</a>
            <a href="/terms" className="hover:text-sky-700">Terms</a>
            <a href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</a>
            <a href="/defect-library" className="hover:text-sky-700">Defect Library</a>
            <a href="/repair-systems" className="hover:text-sky-700">Repair Systems</a>
            <a href="/industry-news" className="hover:text-sky-700">News &amp; Insights</a>
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
