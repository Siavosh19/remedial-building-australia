import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settlement Cracks | Remedial Building Australia",
  description:
    "Technical guide to settlement cracks in Class 2 buildings — causes, inspection requirements, typical repair methodology and related repair systems.",
};

const inspectionItems = [
  "Map all visible cracks across internal and external surfaces, recording width, length, orientation and location relative to structural elements.",
  "Measure crack widths using a calibrated crack width gauge — classify as hairline (<0.1 mm), fine (0.1–0.3 mm), medium (0.3–1 mm) or wide (>1 mm).",
  "Assess whether cracks are active (still moving) or dormant using tell-tale gauges or plaster witness marks installed at crack locations.",
  "Inspect the pattern of cracking — diagonal cracks at window corners and stepped cracking in brickwork are characteristic of differential settlement.",
  "Review geotechnical and structural drawings to understand founding conditions and load paths relative to crack locations.",
  "Inspect the building perimeter for evidence of ground movement — heave, subsidence, differential movement at slab edges or garden beds.",
  "Check for associated door and window binding, distorted frames or gaps at junctions that may indicate ongoing structural movement.",
  "Engage a structural engineer to assess crack severity and determine whether further geotechnical investigation or monitoring is required.",
];

const methodology = [
  "Engage a structural engineer to assess all cracks and confirm the diagnosis of settlement — rule out thermal movement, shrinkage or loading-induced cracking before proceeding.",
  "Install crack monitoring gauges (tell-tales) at active cracks and record readings over a minimum 4–8 week period to quantify movement rate and direction.",
  "Address any ground-related causes contributing to settlement — improve site drainage, remove tree roots, repair leaking services or address fill compaction issues.",
  "Where differential settlement is ongoing and significant, engage a geotechnical engineer to assess underpinning or ground improvement options.",
  "For dormant cracks in masonry, prepare crack faces by raking out loose material, dust and contamination to a minimum depth of 20 mm.",
  "Fill dormant fine to medium cracks in masonry with a flexible, breathable pointing mortar compatible with the substrate.",
  "Inject dormant medium to wide cracks in concrete elements with low-viscosity epoxy resin under controlled pressure to restore structural continuity.",
  "For active cracks, install a flexible backer rod and apply a paintable polyurethane or polysulfide sealant that accommodates ongoing movement.",
  "Reinstate all affected plaster, render and decorative finishes following crack repair using compatible materials.",
  "Apply a crack-bridging paint system over repaired areas to maintain a uniform finish and reduce risk of surface crack re-appearance.",
  "Re-inspect and re-measure monitoring gauges at regular intervals post-repair to confirm movement has ceased.",
  "Record all repair works with photographs, product details and monitoring data for warranty and strata records.",
];

const risks = [
  "Widening of existing cracks with ongoing ground movement.",
  "Water ingress through open cracks causing internal damage.",
  "Structural weakening of load-bearing walls and elements.",
  "Door and window frame distortion causing operational failure.",
  "Damage to finishes, tiling and joinery from building movement.",
  "Potential liability and disclosure obligations for owners and managers.",
  "Significant remediation cost escalation if ground movement is not arrested early.",
];

export default function SettlementCracksPage() {
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
          </nav>
          <a href="/" className="hidden shrink-0 rounded-xl bg-sky-700 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-800 md:inline-flex">Home</a>
        </div>
      </header>

      <main className="px-6 py-20">
        <section className="mx-auto max-w-7xl">
          <a href="/defect-library/concrete-structural-defects" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100">
            ← Back to Concrete & Structural Defects
          </a>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Concrete & Structural Defects</p>
              <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">Settlement Cracks</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">
                Settlement cracks occur when differential movement of the building's foundation or supporting ground causes the structure above to deform unevenly. In Class 2 buildings, settlement cracking most commonly presents as diagonal cracks at window and door openings, stepped cracking through masonry joints, and vertical cracks at structural interfaces. Unlike shrinkage cracking, settlement cracks are often active — continuing to widen over time — and require structural assessment before repair to distinguish dormant from progressive movement.
              </p>
            </div>
            <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
              <img src="/Images/Categories/concrete-structural-defects.jpg" alt="Settlement cracks in masonry" className="h-[420px] w-full object-cover" />
              <div className="border-t border-slate-200 p-5 text-base font-semibold text-slate-700">
                Characteristic diagonal cracking at window openings caused by differential foundation settlement.
              </div>
            </div>
          </div>

          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard
              title="Common Signs"
              items={[
                "Diagonal cracks at corners of windows and door openings",
                "Stepped cracking through masonry mortar joints",
                "Vertical cracks at wall junctions and column interfaces",
                "Cracks wider at one end than the other — tapered profile",
                "Binding or sticking doors and windows",
                "Gaps between walls and ceilings or floors",
                "Cracking recurring after previous repairs",
              ]}
            />
            <InfoCard
              title="Common Causes"
              items={[
                "Differential settlement of fill, soft or variable soils",
                "Tree root activity drawing moisture from expansive clay soils",
                "Leaking stormwater or sewer pipes undermining footings",
                "Inadequate footing design for the site classification",
                "Removal of vegetation causing soil moisture changes",
                "Vibration from nearby excavation or traffic loading",
                "Inadequate compaction of imported fill under slabs",
              ]}
            />
            <InfoCard title="Risk of Neglect" items={risks} />
          </section>

          <section className="mt-16 rounded-3xl bg-white p-8 shadow-sm">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <h2 className="text-3xl font-bold text-sky-950">Inspection Requirements</h2>
              <a href="/downloads/settlement-cracks-inspection-checklist.pdf" className="rounded-xl bg-sky-900 px-5 py-3 text-base font-semibold text-white hover:bg-sky-800">
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
              Settlement crack repairs must be preceded by structural assessment and a monitoring period. Repairing active cracks without addressing the root cause will result in recurring failure.
            </p>
            <img src="/Images/Categories/concrete-structural-defects.jpg" alt="Settlement crack repair" className="mt-8 w-full rounded-2xl border border-slate-200 object-cover" />
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
              Typical settlement crack condition before and after epoxy injection and render reinstatement.
            </p>
            <img src="/Images/Categories/concrete-structural-defects.jpg" alt="Settlement crack before and after repair" className="mt-8 w-full rounded-2xl border border-slate-200 object-cover" />
          </section>

          <section className="mt-16 grid gap-8 md:grid-cols-2">
            <a href="/repair-systems" className="block rounded-3xl border border-slate-200 bg-white p-8 text-sky-950 shadow-md transition hover:shadow-xl">
              <h3 className="text-2xl font-bold">Related Repair Systems</h3>
              <ul className="mt-4 space-y-2">
                {["Epoxy resin crack injection systems", "Flexible polyurethane sealant systems", "Crack monitoring and tell-tale systems", "Masonry repointing and mortar repair", "Render and plaster reinstatement systems"].map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-slate-700">
                    <span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-800" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 font-bold text-red-700">Open Repair Systems →</div>
            </a>
            <a href="/materials-products" className="block rounded-3xl border border-slate-200 bg-white p-8 text-sky-950 shadow-md transition hover:shadow-xl">
              <h3 className="text-2xl font-bold">Related Materials</h3>
              <ul className="mt-4 space-y-2">
                {["Low-viscosity epoxy injection resins", "Polyurethane and polysulfide joint sealants", "Crack bridging paint systems", "Flexible masonry pointing mortars", "Crack width gauges and monitoring equipment"].map((item) => (
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
