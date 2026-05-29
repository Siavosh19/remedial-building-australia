import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Slab Edge Deterioration | Remedial Building Australia",
  description:
    "Technical guide to slab edge deterioration in Class 2 buildings — causes, inspection requirements, typical repair methodology and related repair systems.",
};

const inspectionItems = [
  "Inspect the full perimeter of all exposed slab edges at balconies, car parks, podiums and roof levels for spalling, cracking and delamination.",
  "Assess the depth and extent of concrete loss using a hammer and chisel — sound concrete will ring; delaminated or carbonated concrete will sound hollow.",
  "Measure reinforcement cover depth at slab edges using a cover meter — minimum 40 mm cover required under AS 3600 for exposed conditions.",
  "Inspect for rust staining, cracking parallel to the slab soffit edge and visible corroded reinforcement.",
  "Assess the condition of any existing edge form, fascia or drip groove detail for its role in water drainage away from the slab edge.",
  "Test the carbonation depth of the concrete at slab edges using phenolphthalein indicator solution on a freshly broken core or surface.",
  "Document all defective areas with photographs and measurements for the scope of works and quantification.",
  "Engage a structural engineer where slab edge deterioration is severe, affects load-bearing elements, or where reinforcement loss is identified.",
];

const methodology = [
  "Prepare a scope of works with reference to an engineer's assessment confirming the extent of deterioration and minimum standards for repair.",
  "Erect scaffolding or swing stage to provide safe access to all slab edge locations for inspection and repair works.",
  "Break out all delaminated, spalled and carbonated concrete from the slab edge to expose sound substrate — minimum 10 mm behind any corroded reinforcement.",
  "Remove all loose concrete and exposed corroded reinforcement bars by chipping, scabbling or high-pressure water blasting.",
  "Clean all exposed reinforcement by mechanical wire brushing or abrasive blasting to remove all rust scale and contamination.",
  "Apply a two-component epoxy or cementitious reinforcement primer to all cleaned steel bars immediately after preparation.",
  "Apply a corrosion-inhibiting treatment to adjacent reinforcement within the repair zone that cannot be fully exposed.",
  "Prime the prepared concrete substrate with the specified bonding agent in accordance with manufacturer requirements.",
  "Rebuild the slab edge profile using a pre-bagged polymer-modified cementitious repair mortar complying with AS 1478 and compatible with the bonding agent.",
  "Form the repair in multiple layers where the repair depth exceeds 30 mm — do not apply in a single deep lift.",
  "Re-form any drip groove or edge profile detail as part of the repair to maintain positive water drainage away from the building.",
  "Apply a penetrating silane or siloxane surface treatment to all repaired and adjacent exposed concrete surfaces after curing.",
  "Apply a protective elastomeric coating or anti-carbonation coating over slab soffits and edges where specified.",
  "Record all QA documentation including photographs, area measurements and product batch numbers.",
];

const risks = [
  "Progressive corrosion of slab edge reinforcement leading to structural capacity reduction.",
  "Concrete spalling creating a falling hazard to pedestrians below.",
  "Water ingress through deteriorated slab edges causing internal damage.",
  "Accelerating deterioration once carbonation front reaches reinforcement depth.",
  "Staining and amenity impact on building facades from rust run-off.",
  "Significant cost escalation from delayed repair as corrosion spreads along bar length.",
  "Potential non-conformance with the Strata Schemes Management Act duty to maintain common property.",
];

export default function SlabEdgeDeteriorationPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8 py-5">
          <a href="/" className="flex shrink-0 items-center gap-3">
            <div>
              <div className="text-lg font-extrabold tracking-tight text-sky-950">Remedial Building Australia</div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-900">Technical Remedial Building Platform</div>
            </div>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-sky-800 md:flex">
                        <a href="/" className="whitespace-nowrap hover:text-red-700 transition">Home</a>
            <a href="/repair-systems" className="whitespace-nowrap hover:text-red-700">Repair Systems</a>
            <a href="/industry-news" className="whitespace-nowrap hover:text-red-700">Industry News</a>
            <a href="/directory" className="whitespace-nowrap hover:text-red-700">Directory</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700">AI Scope Builder</a>
          
          </nav>
          <a href="/" className="hidden shrink-0 rounded-xl bg-sky-700 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-800 md:inline-flex">Home</a>
        </div>
      </header>

      <main className="px-6 py-20">
        <section className="mx-auto max-w-7xl">
          <a href="/defect-library/concrete-structural-defects" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100">
            ← Back to Concrete & Structural Defects
          </a>

          <div className="mt-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Concrete & Structural Defects</p>
              <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">Slab Edge Deterioration</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">
                Slab edge deterioration refers to the progressive breakdown of exposed concrete at balcony, car park and podium slab perimeters. The slab edge is one of the most vulnerable areas in a reinforced concrete building — it is directly exposed to weather, has limited concrete cover over reinforcement, and is subject to concentrated moisture run-off from the slab above. Carbonation and chloride ingress depassivate the reinforcement, initiating corrosion that causes internal expansive forces sufficient to crack and delaminate the concrete cover. Left unaddressed, slab edge deterioration accelerates rapidly and presents both structural and safety risks.
              </p>
            </div>
          </div>

          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard
              title="Common Signs"
              items={[
                "Concrete spalling and delamination at slab perimeter edges",
                "Rust staining running down the face of the slab edge",
                "Visible corroded reinforcement bars at broken concrete zones",
                "Horizontal cracking parallel to the slab soffit edge",
                "Hollow sound when the slab edge face is tapped",
                "Loss of drip groove detail or edge profile",
                "Previous patch repairs that have failed or are delaminating",
              ]}
            />
            <InfoCard
              title="Common Causes"
              items={[
                "Insufficient concrete cover over slab edge reinforcement",
                "Carbonation of concrete reducing pH and depassivating steel",
                "Chloride ingress in marine or coastal environments",
                "Ponding water at the slab edge from inadequate drainage falls",
                "Absence of a drip groove allowing water to track under the slab soffit",
                "Use of lower-grade concrete mixes with high water-cement ratio",
                "Damage to concrete cover during original construction or formwork stripping",
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
            <a href="/ai-scope-builder/new" className="inline-flex rounded-xl bg-sky-900 px-5 py-3 text-base font-semibold text-white hover:bg-sky-800">
              Start Inspection Checklist
            </a>
            <p className="mt-2 text-sm text-slate-500">Create a project inspection record, add defect locations, upload photos, and save notes for scope writing.</p>
          </div>

          <section className="mt-16 rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-sky-950">Typical Repair Methodology</h2>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
              Slab edge repairs require full concrete removal to sound substrate, treatment of exposed reinforcement, and application of a compatible repair mortar system. The methodology below is typical for a patch repair programme across multiple slab edge locations.
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
            <a href="/repair-systems/slab-edge-deterioration" className="block rounded-3xl border border-slate-200 bg-white p-8 text-sky-950 shadow-md transition hover:shadow-xl">
              <h3 className="text-2xl font-bold">Related Repair Systems</h3>
              <ul className="mt-4 space-y-2">
                {["Repair mortars", "Epoxy repair mortars", "Bonding agents", "Edge forms and accessories", "Reinforcement mesh", "Curing compounds", "Abrasives, blades and tools"].map((item) => (
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
            <a href="/about" className="hover:text-sky-700">About</a>
            <a href="/contact" className="hover:text-sky-700">Contact</a>
            <a href="/terms" className="hover:text-sky-700">Terms</a>
            <a href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</a>
            <a href="/defect-library" className="hover:text-sky-700">Defect Library</a>
            <a href="/repair-systems" className="hover:text-sky-700">Repair Systems</a>
            <a href="/industry-news" className="hover:text-sky-700">Industry News</a>
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
