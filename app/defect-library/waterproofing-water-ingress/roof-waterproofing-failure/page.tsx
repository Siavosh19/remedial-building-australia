import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roof Waterproofing Failure | Remedial Building Australia",
  description:
    "Technical guide to roof waterproofing failure — causes, inspection requirements, typical repair methodology and related repair systems for Class 2 buildings.",
};

const inspectionItems = [
  "Identify all active leak locations on the ceiling below and map against the roof plan.",
  "Inspect the full roof membrane surface for blistering, cracking, delamination and lap failures.",
  "Check all penetrations including pipes, conduits, mechanical units and roof anchors for failed sealing.",
  "Inspect flashings at parapet walls, expansion joints, upstands and transitions for displacement or failure.",
  "Assess drainage falls across the roof to identify ponding areas and blocked or poorly positioned outlets.",
  "Check membrane upturns at all parapet walls and vertical elements for height and continuity.",
  "Assess the condition of any roof tiles, sheeting or protective topping coat over the membrane.",
  "Core sample or probe the membrane to assess thickness, layer adhesion and substrate moisture content.",
];

const methodology = [
  "Engage a waterproofing consultant or engineer to confirm the defect assessment, system selection and repair scope.",
  "Isolate the roof from traffic and protect drainage outlets during removal and repair works.",
  "Remove all existing roofing materials, membrane layers, insulation and screed as required to expose the structural substrate.",
  "Repair any substrate damage including concrete spalling, cracking or reinforcement corrosion before waterproofing.",
  "Re-form drainage falls where insufficient — minimum 1:100 to outlets required under AS 1428 and relevant standards.",
  "Prepare the substrate surface by grinding or scarifying to remove all contamination, laitance and old adhesive.",
  "Inspect and upgrade all roof drains to ensure they are correctly positioned, flush with the membrane and free from obstruction.",
  "Prime the prepared substrate with the system-specific primer and allow to cure in accordance with manufacturer requirements.",
  "Install the approved waterproofing membrane system across the full roof area in accordance with the specification and AS 4654.",
  "Install the membrane in a minimum of two coats or layers ensuring the required total wet and dry film thickness is achieved.",
  "Detail all penetrations with compatible pre-formed or site-formed membrane collars and sealant.",
  "Install flashings at all parapet upstands, expansion joints and transitions, with upturns a minimum 150 mm above finished surface.",
  "Apply a UV-stable protective topping coat, pavers, ballast or insulation board as specified to protect the membrane.",
  "Conduct flood testing across the roof area and at all critical junctions in accordance with AS 4654.",
  "Record all QA documentation including flood test results, product batch numbers, wet film thickness readings and photographs.",
];

const risks = [
  "Active water ingress to occupied levels below the roof.",
  "Damage to internal ceilings, walls, finishes and building services.",
  "Structural deterioration of the concrete roof slab and reinforcement.",
  "Membrane blistering and total system failure from prolonged UV and moisture exposure.",
  "Significant cost escalation from delayed remediation.",
  "Potential mould growth in ceiling spaces and affected rooms.",
  "Building Commission non-conformance and potential strata disputes.",
];

export default function RoofWaterproofingFailurePage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8 py-5">
          <a href="/" className="flex shrink-0 items-center gap-3">
            <div>
              <div className="text-lg font-extrabold tracking-tight text-sky-950">
                Remedial Building Australia
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-900">
                Technical Defect Database
              </div>
            </div>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-sky-800 md:flex">
            <a href="/defect-library" className="whitespace-nowrap hover:text-red-700">Defect Library</a>
            <a href="/repair-systems" className="whitespace-nowrap hover:text-red-700">Repair Systems</a>
            <a href="/materials-products" className="whitespace-nowrap hover:text-red-700">Materials</a>
            <a href="/industry-news" className="whitespace-nowrap hover:text-red-700">Industry News</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700">AI Scope Builder</a>
          </nav>
          <a href="/" className="hidden shrink-0 rounded-xl bg-sky-700 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-800 md:inline-flex">
            Home
          </a>
        </div>
      </header>

      <main className="px-6 py-20">
        <section className="mx-auto max-w-7xl">
          <a href="/defect-library/waterproofing-water-ingress" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100">
            ← Back to Waterproofing & Water Ingress
          </a>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">
                Waterproofing & Water Ingress
              </p>
              <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">
                Roof Waterproofing Failure
              </h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">
                Roof waterproofing failure occurs when the membrane system installed to a flat or low-pitched concrete roof deck deteriorates, blisters, cracks or fails at critical junctions — allowing water to penetrate into the building structure below. In Class 2 buildings, roof waterproofing failure typically affects common roof decks above apartments, plant rooms and car park structures. Failures at penetrations, parapets and drainage outlets are among the most frequent causes.
              </p>
            </div>
            <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
              <img src="/images/categories/waterproofing-water-ingress.jpg" alt="Roof waterproofing failure" className="h-[420px] w-full object-cover" />
              <div className="border-t border-slate-200 p-5 text-base font-semibold text-slate-700">
                Typical roof membrane blistering and lap failure on a Class 2 building.
              </div>
            </div>
          </div>

          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard
              title="Common Signs"
              items={[
                "Active water ingress through roof slab to the level below",
                "Staining and wet patches on internal ceilings",
                "Membrane blistering, bubbling or surface cracking",
                "Delamination of membrane at laps and edges",
                "Ponding water across the roof surface",
                "Failed or displaced parapet flashings",
                "Blocked or incorrectly positioned roof drainage outlets",
              ]}
            />
            <InfoCard
              title="Common Causes"
              items={[
                "Membrane lap failures from inadequate bond width or adhesive",
                "UV degradation of unprotected membrane surface",
                "Thermal movement causing membrane splitting or de-bonding",
                "Failed penetration detailing at pipes and mechanical units",
                "Insufficient falls leading to ponding and hydrostatic pressure",
                "Parapet upturn height below the required 150 mm minimum",
                "Substrate moisture vapour causing blistering of adhered membranes",
              ]}
            />
            <InfoCard title="Risk of Neglect" items={risks} />
          </section>

          <section className="mt-16 rounded-3xl bg-white p-8 shadow-sm">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <h2 className="text-3xl font-bold text-sky-950">Inspection Requirements</h2>
              <a href="/downloads/roof-waterproofing-inspection-checklist.pdf" className="rounded-xl bg-sky-900 px-5 py-3 text-base font-semibold text-white hover:bg-sky-800">
                Download Inspection Checklist
              </a>
            </div>
            <ul className="mt-8 space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-7">
              {inspectionItems.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-8 text-slate-800">
                  <span className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-800" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-16 rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-sky-950">Typical Repair Methodology</h2>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
              The final repair scope must be confirmed by the waterproofing consultant and engineer. The sequence below outlines a typical full roof waterproofing replacement methodology.
            </p>
            <img src="/images/categories/waterproofing-water-ingress.jpg" alt="Roof waterproofing repair methodology" className="mt-8 w-full rounded-2xl border border-slate-200 object-cover" />
            <ol className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-7 py-6">
              {methodology.map((step, index) => (
                <li key={step} className="flex gap-4 text-base leading-8 text-slate-800" style={{ marginBottom: index < methodology.length - 1 ? "3mm" : 0 }}>
                  <span className="mt-1 shrink-0 text-sm font-bold text-slate-500">{String(index + 1).padStart(2, "0")}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-16 rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-sky-950">Before / After Repair</h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              Typical roof deck condition before and after full waterproofing membrane replacement.
            </p>
            <img src="/images/categories/waterproofing-water-ingress.jpg" alt="Roof waterproofing before and after" className="mt-8 w-full rounded-2xl border border-slate-200 object-cover" />
          </section>

          <section className="mt-16 grid gap-8 md:grid-cols-2">
            <a href="/repair-systems/waterproofing-systems" className="block rounded-3xl border border-slate-200 bg-white p-8 text-sky-950 shadow-md transition hover:shadow-xl">
              <h3 className="text-2xl font-bold">Related Repair Systems</h3>
              <ul className="mt-4 space-y-2">
                {["Liquid applied membrane systems", "Torch-on bituminous sheet membranes", "Self-adhered sheet waterproofing", "Trafficable and inverted roof systems", "Protective topping and ballast systems"].map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-slate-700">
                    <span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-800" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 font-bold text-red-700">Open Repair Systems →</div>
            </a>
            <a href="/materials-products/waterproofing" className="block rounded-3xl border border-slate-200 bg-white p-8 text-sky-950 shadow-md transition hover:shadow-xl">
              <h3 className="text-2xl font-bold">Related Materials</h3>
              <ul className="mt-4 space-y-2">
                {["Polyurethane liquid membranes", "Bituminous torch-on membranes", "UV-stable topcoats and coatings", "Pre-formed penetration collars", "Parapet and expansion joint flashings"].map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-slate-700">
                    <span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-800" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 font-bold text-red-700">Open Materials →</div>
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
          <div className="grid grid-cols-2 gap-3 text-sm font-bold text-sky-950 md:grid-cols-3">
            <a href="/about" className="hover:text-sky-700">About</a>
            <a href="/terms" className="hover:text-sky-700">Terms</a>
            <a href="/contact" className="hover:text-sky-700">Contact</a>
          </div>
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
