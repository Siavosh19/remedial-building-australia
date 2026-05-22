import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Concrete Cracking | Remedial Building Australia",
  description:
    "Technical guide to concrete cracking — causes, inspection requirements, typical repair methodology and related repair systems for Class 2 buildings.",
};

const inspectionItems = [
  "Map and record all crack locations, orientations, widths and approximate depths.",
  "Measure crack widths using a crack gauge and note whether cracks taper or are consistent.",
  "Determine whether cracks are active (moving) or dormant using tell-tales or crack monitors.",
  "Inspect for associated moisture penetration, rust staining or efflorescence.",
  "Assess the likely cause — structural, thermal, shrinkage, corrosion-induced or movement-related.",
  "Obtain structural engineer assessment for cracks indicating structural distress.",
  "Consider crack injection feasibility versus rout and seal based on crack width and access.",
];

const methodology = [
  "Confirm crack classification — active or dormant — before selecting repair method.",
  "For dormant cracks: clean crack faces with compressed air to remove dust and debris.",
  "Drill injection ports at regular intervals along the crack, typically 150–200mm centres.",
  "Seal crack surface between ports with epoxy paste or surface seal and allow to cure.",
  "For active cracks: use flexible polyurethane resin or sealant compatible with movement.",
  "For structural cracks: obtain written engineer direction before proceeding with any repair.",
  "Inject epoxy or polyurethane resin under controlled low pressure, starting from the lowest point.",
  "Progress injection upward, closing each port after resin appears at the next location.",
  "Allow resin to fully cure before removing ports and finishing the surface.",
  "For fine surface cracks: rout to a defined profile, clean and apply flexible sealant.",
  "Apply protective coating or sealer over repaired areas where required by the specification.",
  "Monitor active cracks after repair and report any recurrence or further movement.",
  "Record all crack locations, widths, repair products, batch numbers and QA photos.",
];

const risks = [
  "Water and moisture ingress through cracks.",
  "Accelerated corrosion of reinforcement.",
  "Progressive structural deterioration.",
  "Crack widening and propagation over time.",
  "Failed waterproofing membranes at cracks.",
  "Increased remedial cost if left untreated.",
  "Potential structural capacity concerns.",
];

export default function ConcreteCrackingPage() {
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

          <a
            href="/"
            className="hidden shrink-0 rounded-xl bg-sky-700 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-800 md:inline-flex"
          >
            Home
          </a>
        </div>
      </header>

      <main className="px-6 py-20">
        <section className="mx-auto max-w-7xl">
          <a
            href="/defect-library/concrete-structural-defects"
            className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100"
          >
            ← Back to Concrete & Structural Defects
          </a>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">
                Concrete & Structural Defects
              </p>

              <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">
                Concrete Cracking
              </h1>

              <p className="mt-6 text-xl leading-9 text-slate-700">
                Concrete cracking encompasses structural and non-structural
                cracking caused by thermal movement, shrinkage, applied loading,
                differential settlement, reinforcement corrosion or design and
                construction deficiencies in Class 2 building elements.
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
              <img
                src="/Images/Categories/concrete-structural-defects/concrete-cracking.jpg"
                alt="Concrete cracking on building element"
                className="h-[420px] w-full object-cover"
              />
              <div className="border-t border-slate-200 p-5 text-base font-semibold text-slate-700">
                Typical concrete cracking requiring investigation and classification.
              </div>
            </div>
          </div>

          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard
              title="Common Signs"
              items={[
                "Visible surface or through cracks",
                "Map or pattern cracking",
                "Crack widening or movement over time",
                "Moisture penetration at crack locations",
                "Rust staining along cracks",
                "Efflorescence or salt deposits",
              ]}
            />

            <InfoCard
              title="Common Causes"
              items={[
                "Thermal movement and shrinkage",
                "Structural loading and deflection",
                "Reinforcement corrosion",
                "Settlement or ground movement",
                "Poor mix design or curing",
                "Design or construction deficiency",
              ]}
            />

            <InfoCard title="Risk of Neglect" items={risks} />
          </section>

          <section className="mt-16 rounded-3xl bg-white p-8 shadow-sm">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <h2 className="text-3xl font-bold text-sky-950">
                Inspection Requirements
              </h2>

              <a
                href="/downloads/concrete-cracking-inspection-checklist.pdf"
                className="rounded-xl bg-sky-900 px-5 py-3 text-base font-semibold text-white hover:bg-sky-800"
              >
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
            <h2 className="text-3xl font-bold text-sky-950">
              Typical Repair Methodology
            </h2>

            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
              The repair approach depends on whether cracks are active or dormant
              and whether structural implications exist. The final scope must be
              confirmed by the project engineer before commencing works.
            </p>

            <img
              src="/Images/Categories/concrete-structural-defects/concrete-cracking/Typical%20Repair%20Approach.png"
              alt="Concrete cracking repair methodology"
              className="mt-8 w-full rounded-2xl border border-slate-200 object-cover"
            />

            <ol className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-7 py-6">
              {methodology.map((step, index) => (
                <li
                  key={step}
                  className="flex gap-4 text-base leading-8 text-slate-800"
                  style={{ marginBottom: index < methodology.length - 1 ? "3mm" : 0 }}
                >
                  <span className="mt-1 shrink-0 text-sm font-bold text-slate-500">
                    {String(index + 1).padStart(2, "0")}.
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-16 rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-sky-950">
              Before / After Repair
            </h2>

            <p className="mt-4 text-base leading-8 text-slate-700">
              Typical concrete cracking condition before and after remedial repair.
            </p>

            <img
              src="/Images/Categories/concrete-structural-defects/concrete-cracking/Before-After.png"
              alt="Concrete cracking before and after repair"
              className="mt-8 w-full rounded-2xl border border-slate-200 object-cover"
            />
          </section>

          <section className="mt-16 grid gap-8 md:grid-cols-2" style={{ paddingTop: "3mm" }}>
            <a
              href="/repair-systems/crack-injection"
              className="block rounded-3xl border border-slate-200 bg-white p-8 text-sky-950 shadow-md transition hover:shadow-xl"
            >
              <h3 className="text-2xl font-bold">Related Repair Systems</h3>
              <ul className="mt-4 space-y-2">
                {["Epoxy and polyurethane crack injection systems", "Rout and seal methods", "Flexible sealants", "Structural repair systems"].map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-slate-700">
                    <span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-800" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 font-bold text-red-700">Open Repair Systems →</div>
            </a>

            <a
              href="/materials-products/crack-injection"
              className="block rounded-3xl border border-slate-200 bg-white p-8 text-sky-950 shadow-md transition hover:shadow-xl"
            >
              <h3 className="text-2xl font-bold">Related Materials</h3>
              <ul className="mt-4 space-y-2">
                {["Epoxy resins", "Polyurethane foams", "Flexible sealants", "Crack injection packers", "Surface sealers", "Protective coatings"].map((item) => (
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
          <a
            href="/"
            className="inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-100"
          >
            ← Home
          </a>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">
              Remedial Building Australia
            </div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">
              A structured Australian remedial building knowledge platform for
              defects, repair systems, materials and future AI-assisted scope writing.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm font-bold text-sky-950 md:grid-cols-3">
            <a href="/about" className="hover:text-sky-700">About</a>
            <a href="/terms" className="hover:text-sky-700">Terms</a>
            <a href="/contact" className="hover:text-sky-700">Contact</a>          </div>
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
