import type { Metadata } from "next";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Paint Failure | Remedial Building Australia",
  description: "Technical guide to internal paint failure in Class 2 buildings — blistering, peeling, adhesion loss and repair methodology.",
};

const inspectionItems = [
  "Identify whether paint failure is cohesive (failure within the paint) or adhesive (loss of bond to substrate).",
  "Assess the moisture content of the substrate using a moisture meter — paint will not adhere to damp substrates.",
  "Check for moisture ingress at the wall from behind — inspect the external facade at the equivalent location.",
  "Test the existing paint adhesion using a cross-cut adhesion test.",
  "Assess the existing paint system for compatibility — oil-based over water-based is a common adhesion failure cause.",
  "Check for alkalinity in fresh concrete or render substrate using a pH indicator strip.",
  "Inspect for mould under blistered paint areas after removing loose film.",
  "Document the extent and pattern of paint failure with photographs for the repair specification.",
];

const methodology = [
  "Identify and rectify any moisture source before repainting.",
  "Allow the substrate to dry to below 15% moisture content and cure for a minimum of 28 days after plastering.",
  "Remove all loose, blistering and flaking paint by scraping, sanding or chemical stripping.",
  "Wash all surfaces with a sugar soap solution to remove grease, contamination and chalking residue.",
  "Sand all edges of removed paint to feather into the surrounding sound paint.",
  "Fill all holes, cracks and surface defects with a flexible interior filler.",
  "Prime new plaster, patched areas and bare substrates with a compatible alkali-resistant or PVA primer.",
  "Apply a mould-resistant sealer coat over any areas previously affected by mould or water staining.",
  "Apply two finish coats of a quality water-based paint in the specified sheen level.",
  "Allow adequate drying time between coats in accordance with the paint manufacturer specification.",
  "Carry out a final quality check under raking light to identify any defects before handover.",
];

const risks = [
  "Ongoing moisture damage to the substrate where blistering is caused by water ingress",
  "Mould growth under the paint film in blistered areas",
  "Health risks to occupants from deteriorating paint film",
  "Escalating repair cost if substrate preparation must be redone each repaint cycle",
  "Amenity and aesthetic impact on common areas and residential lots",
  "Owner corporation liability for inadequate maintenance of common area finishes",
  "Recurring failure if underlying moisture source is not addressed",
];

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <SiteHeader />
      <main className="px-6 py-20">
        <section className="mx-auto max-w-7xl">
          <a href="/defect-library/internal-defects-finishes" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100">← Back to Internal Defects & Finishes</a>
          <div className="mt-10">
            <div>
              <PageNav />
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Internal Defects & Finishes</p>
              <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-sky-950">Paint Failure</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">Internal paint failure manifests as blistering, peeling, flaking, chalking and adhesion loss — each of which indicates a different underlying cause. In Class 2 buildings, paint failure is frequently a symptom of a deeper problem: moisture ingress from behind, alkalinity from fresh concrete or render, or a contaminated surface that was not adequately prepared before painting. Repainting without addressing the underlying cause results in rapid recurrence. The correct repair sequence is always to identify and fix the cause, allow the substrate to dry and stabilise, and only then repaint with a compatible system.</p>
            </div>
          </div>
          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard title="Common Signs" items={["Blistering or bubbling of the paint film", "Peeling or flaking paint in sheets or chips", "Chalking of the paint surface leaving a powder residue", "Brown or yellow staining through the paint from moisture below", "Paint surface cracking in a map or alligatoring pattern", "Loss of adhesion where the paint can be peeled by hand", "Paint discolouration from mould growth through the film"]} />
            <InfoCard title="Common Causes" items={["Moisture ingress from behind the wall or ceiling causing hydrostatic blistering", "Painting over a wet or damp substrate", "Alkaline salts from fresh concrete or render reacting with the paint binder", "Inadequate surface preparation — paint applied over contamination, gloss or chalking surfaces", "Incompatible paint systems applied over each other", "Application in adverse conditions — high humidity, low temperature or direct sun", "Low-quality or incorrectly thinned paint reducing film formation and adhesion"]} />
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
              <ul className="mt-4 space-y-2">{["Complete paint system removal and replacement", "Surface preparation and priming systems", "Mould-resistant paint systems", "Alkali-resistant primer systems for new substrates", "Stain-blocking and sealant primer systems"].map((item) => (<li key={item} className="flex gap-3 text-base leading-7 text-slate-700"><span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-800" />{item}</li>))}</ul>
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
