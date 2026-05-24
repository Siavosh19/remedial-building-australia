import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Penetrating Damp | Remedial Building Australia",
  description:
    "Technical guide to penetrating damp — causes, inspection requirements, typical repair methodology and related repair systems for Class 2 buildings.",
};

const inspectionItems = [
  "Map all affected internal wall areas, noting the relationship to external elements such as windows, lintels and mortar joints.",
  "Inspect the external wall for cracks, failed render, open mortar joints, deteriorated sealants and exposed masonry.",
  "Check window and door perimeter sealants, flashings and sills for failure, gaps and incorrect installation.",
  "Assess the relationship between the damp area and weather exposure — penetrating damp is typically worse on the windward elevation.",
  "Probe mortar joints to assess depth of deterioration and the porosity of the masonry units.",
  "Inspect cavity walls for the presence of wall ties carrying moisture across the cavity and cavity fill that may be bridging.",
  "Review evidence of water penetration only appearing during or after rain events to differentiate from rising damp and condensation.",
  "Consider a water hose test on the external face to replicate and confirm the water entry path.",
];

const methodology = [
  "Confirm the diagnosis and water entry path with a building consultant before commencing works.",
  "Repair all external cracks in masonry, render and concrete elements using compatible crack repair mortars or flexible sealants.",
  "Rake out and repoint all failed, open or deteriorated mortar joints with a mortar compatible with the existing masonry — avoid excessively hard mortars on older softer brick.",
  "Replace failed sealants at all window and door perimeters using a compatible low-modulus silicone or polyurethane sealant over a correctly sized backing rod.",
  "Inspect and reinstate all window and door head flashings where absent or displaced, ensuring correct laps and falls to drain water away from the wall face.",
  "Apply a penetrating silane or siloxane water repellent treatment to the full external face of the affected masonry elevation.",
  "Ensure the water repellent is applied to clean, dry masonry and allowed to penetrate fully before the surface becomes wet.",
  "Where the masonry face is too deteriorated for water repellent alone, apply a compatible textured render or masonry coating system.",
  "Remove any external elements bridging the cavity — check and clear cavity weep holes to allow drainage.",
  "Remove internal plaster and finishes affected by moisture — allow the wall to dry fully before reinstating with a breathable plaster or render.",
  "Reinstate internal finishes using breathable paints and materials compatible with residual moisture vapour movement.",
  "Monitor the repaired areas for recurrence over one to two full winter seasons before closing out the defect.",
];

const risks = [
  "Progressive deterioration of masonry, mortar joints and render.",
  "Damage to internal plaster, paint, flooring and furnishings.",
  "Mould growth within the wall cavity and on internal surfaces.",
  "Salt damage and staining on both internal and external faces.",
  "Structural corrosion of embedded wall ties in cavity wall construction.",
  "Ongoing amenity impact and resident complaints in strata buildings.",
  "Escalating repair cost from delayed treatment of the underlying water entry.",
];

export default function PenetratingDampPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8 py-5">
          <a href="/" className="flex shrink-0 items-center gap-3">
            <div>
              <div className="text-lg font-extrabold tracking-tight text-sky-950">Remedial Building Australia</div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-900">Technical Defect Database</div>
            </div>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-sky-800 md:flex">
            <a href="/defect-library" className="whitespace-nowrap hover:text-red-700">Defect Library</a>
            <a href="/repair-systems" className="whitespace-nowrap hover:text-red-700">Repair Systems</a>
            <a href="/materials-products" className="whitespace-nowrap hover:text-red-700">Materials</a>
            <a href="/industry-news" className="whitespace-nowrap hover:text-red-700">Industry News</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700">AI Scope Builder</a>
            <a
              href="/newsletter"
              className="whitespace-nowrap rounded-lg bg-red-700 px-4 py-2 text-sm text-white hover:bg-red-800 transition"
            >
              Subscribe
            </a>
          </nav>
          <a href="/" className="hidden shrink-0 rounded-xl bg-sky-700 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-800 md:inline-flex">Home</a>
        </div>
      </header>

      <main className="px-6 py-20">
        <section className="mx-auto max-w-7xl">
          <a href="/defect-library/waterproofing-water-ingress" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100">
            ← Back to Waterproofing & Water Ingress
          </a>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Waterproofing & Water Ingress</p>
              <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">Penetrating Damp</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">
                Penetrating damp is the lateral movement of water through external walls driven by wind-driven rain, hydrostatic pressure against below-ground walls and water ponding at wall bases. Unlike rising damp, which moves upward through capillary action, penetrating damp tracks horizontally through the building fabric via cracks, failed mortar joints, defective sealants, window perimeter failures and porous masonry. It is one of the most common causes of water ingress complaints in strata buildings across coastal and high-rainfall areas of Australia.
              </p>
            </div>
            <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
              <img src="/Images/Categories/waterproofing-water-ingress.jpg" alt="Penetrating damp through external wall" className="h-[420px] w-full object-cover" />
              <div className="border-t border-slate-200 p-5 text-base font-semibold text-slate-700">
                Water staining on an internal wall consistent with penetrating damp through the external masonry.
              </div>
            </div>
          </div>

          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard
              title="Common Signs"
              items={[
                "Damp patches appearing on internal walls during or after rain",
                "Water staining around window and door frames",
                "Damp areas at the base of external walls",
                "Paint blistering and peeling on internal wall surfaces",
                "Salt efflorescence on external masonry and render",
                "Mould growth on internal wall faces and behind furniture",
                "Open or crumbling mortar joints on the external elevation",
              ]}
            />
            <InfoCard
              title="Common Causes"
              items={[
                "Failed or absent sealants at window and door perimeters",
                "Open or deteriorated mortar joints in masonry walls",
                "Cracked or delaminated external render",
                "Porous or highly absorbent masonry units",
                "Missing or failed flashings over windows and lintels",
                "Cavity wall ties corroding and carrying water across the cavity",
                "Cavity fill bridging the clear cavity and providing a moisture path",
              ]}
            />
            <InfoCard title="Risk of Neglect" items={risks} />
          </section>

          <section className="mt-16 rounded-3xl bg-white p-8 shadow-sm">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <h2 className="text-3xl font-bold text-sky-950">Inspection Requirements</h2>
              <a href="/downloads/penetrating-damp-inspection-checklist.pdf" className="rounded-xl bg-sky-900 px-5 py-3 text-base font-semibold text-white hover:bg-sky-800">
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
              Penetrating damp repair must target the specific water entry path. The methodology below covers a typical external masonry wall treatment and internal reinstatement sequence.
            </p>
            <img src="/Images/Categories/waterproofing-water-ingress.jpg" alt="Penetrating damp repair methodology" className="mt-8 w-full rounded-2xl border border-slate-200 object-cover" />
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
              Typical penetrating damp condition before and after external repointing, sealant replacement and water repellent treatment.
            </p>
            <img src="/Images/Categories/waterproofing-water-ingress.jpg" alt="Penetrating damp before and after repair" className="mt-8 w-full rounded-2xl border border-slate-200 object-cover" />
          </section>

          <section className="mt-16 grid gap-8 md:grid-cols-2">
            <a href="/repair-systems/waterproofing-systems" className="block rounded-3xl border border-slate-200 bg-white p-8 text-sky-950 shadow-md transition hover:shadow-xl">
              <h3 className="text-2xl font-bold">Related Repair Systems</h3>
              <ul className="mt-4 space-y-2">
                {["Masonry water repellent treatment systems", "Repointing and mortar repair systems", "External render and coating systems", "Window and door perimeter sealing systems", "Cavity wall drainage and flashing systems"].map((item) => (
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
                {["Silane and siloxane water repellents", "Low-modulus silicone and polyurethane sealants", "Repointing mortars and repair compounds", "Backing rods and bond breaker tapes", "Breathable masonry paints and renders"].map((item) => (
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
            <a href="/about" className="underline hover:text-sky-700">About</a>
            <a href="/terms" className="underline hover:text-sky-700">Terms</a>
            <a href="/contact" className="underline hover:text-sky-700">Contact</a>
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
