import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Basement Water Ingress | Remedial Building Australia",
  description:
    "Technical guide to basement water ingress — causes, inspection requirements, typical repair methodology and related repair systems for Class 2 buildings.",
};

const inspectionItems = [
  "Map all active leak points including cracks, construction joints, penetrations and wall-slab junctions.",
  "Assess whether water ingress is hydrostatic (pressure-driven) or seepage-based to determine the correct repair approach.",
  "Inspect all construction joints for failed waterstops, joint sealants or injection ports from previous works.",
  "Check pile caps, pile head connections and tie rod penetrations for water entry points.",
  "Assess the basement drainage system including sumps, pumps and perimeter drains for function and capacity.",
  "Inspect wall and slab surfaces for concrete deterioration, cracking and salt efflorescence.",
  "Review available structural and waterproofing drawings to confirm the original waterproofing specification and system.",
  "Obtain moisture readings in the concrete substrate to understand the extent of water-affected areas.",
];

const methodology = [
  "Confirm the repair approach with a structural engineer and waterproofing consultant, distinguishing between positive-side, negative-side and cavity drain systems.",
  "Identify and isolate all active leak points using packer injection ports, surface applied sealants or mechanical plugging as an initial containment measure.",
  "Inject active cracks and construction joints with polyurethane hydrophilic foam to stop immediate water flow.",
  "Follow polyurethane injection with epoxy resin injection where structural crack repair and long-term sealing is required.",
  "Prepare all failed construction joints by routing and cleaning the joint, removing failed sealant and installing an appropriate waterstop or injection hose.",
  "Inject waterstop hoses at construction joints with cementitious or polyurethane grout under pressure to form a watertight seal.",
  "Apply crystalline waterproofing or cementitious coating to all water-affected surfaces as a negative-side barrier system where appropriate.",
  "Install a cavity drain membrane system where hydrostatic pressure is ongoing and a drainage management solution is required.",
  "Connect the cavity drain system to a perimeter drainage channel and sump pump arrangement to manage collected water.",
  "Seal all penetrations including tie rods, pipes and conduits with compatible mechanical seals and backing rods.",
  "Apply a protective coating or lining system to the treated basement walls and floor as required.",
  "Commission the sump pump system and confirm drainage capacity is adequate for the site conditions.",
  "Record all QA documentation including injection volumes, product batch numbers, before and after photographs and leak point mapping.",
];

const risks = [
  "Progressive structural deterioration from sustained moisture in the concrete.",
  "Reinforcement corrosion leading to cracking and concrete spalling.",
  "Damage to mechanical, electrical and hydraulic services in the basement.",
  "Degradation of waterproofing membranes on the positive side from hydrostatic uplift.",
  "Mould growth and poor air quality in the occupied basement space.",
  "Failure of sump pump systems causing flooding of the basement.",
  "Significant escalation in repair cost as the extent of deterioration widens.",
];

export default function BasementWaterIngressPage() {
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
          <a href="/defect-library/waterproofing-water-ingress" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100">
            ← Back to Waterproofing & Water Ingress
          </a>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Waterproofing & Water Ingress</p>
              <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">Basement Water Ingress</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">
                Basement water ingress is a complex defect driven by hydrostatic groundwater pressure, failed waterproofing membranes and water entry through construction joints, cracks and penetrations. In Class 2 buildings, basements typically serve as car parks, storage and service areas — making water ingress both a structural risk and an ongoing operational problem. Repair strategies must address the source of the water, the structural integrity of the concrete and the long-term management of groundwater pressure at the site.
              </p>
            </div>
            <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
              <img src="/Images/Categories/waterproofing-water-ingress.jpg" alt="Basement water ingress" className="h-[420px] w-full object-cover" />
              <div className="border-t border-slate-200 p-5 text-base font-semibold text-slate-700">
                Active water ingress through a basement construction joint driven by hydrostatic pressure.
              </div>
            </div>
          </div>

          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard
              title="Common Signs"
              items={[
                "Active water seepage through cracks and joints",
                "White salt efflorescence deposits on walls and slabs",
                "Rust staining from corroding reinforcement",
                "Wet or damp floor slabs and puddles after rain",
                "Failed or swollen joint sealants and waterstops",
                "Mould growth on walls, columns and soffits",
                "Corrosion of metal fixtures, fittings and services",
              ]}
            />
            <InfoCard
              title="Common Causes"
              items={[
                "Hydrostatic groundwater pressure against the basement walls and slab",
                "Failed or absent positive-side waterproofing membrane",
                "Construction joint waterstop failure or incorrect installation",
                "Cracked concrete from early thermal movement or structural loading",
                "Failed pipe and conduit penetration seals",
                "Inadequate perimeter drainage and subsoil drainage design",
                "Pile head waterproofing failures at pile caps",
              ]}
            />
            <InfoCard title="Risk of Neglect" items={risks} />
          </section>

          <section className="mt-16 rounded-3xl bg-white p-8 shadow-sm">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <h2 className="text-3xl font-bold text-sky-950">Inspection Requirements</h2>
              <a href="/downloads/basement-water-ingress-inspection-checklist.pdf" className="rounded-xl bg-sky-900 px-5 py-3 text-base font-semibold text-white hover:bg-sky-800">
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
              Basement water ingress repairs require a staged approach confirmed by a structural engineer and waterproofing specialist. The methodology below covers a typical negative-side and crack injection repair sequence.
            </p>
            <img src="/Images/Categories/waterproofing-water-ingress.jpg" alt="Basement water ingress repair methodology" className="mt-8 w-full rounded-2xl border border-slate-200 object-cover" />
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
              Typical basement condition before and after crack injection, joint repair and negative-side waterproofing application.
            </p>
            <img src="/Images/Categories/waterproofing-water-ingress.jpg" alt="Basement water ingress before and after repair" className="mt-8 w-full rounded-2xl border border-slate-200 object-cover" />
          </section>

          <section className="mt-16 grid gap-8 md:grid-cols-2">
            <a href="/repair-systems/waterproofing-systems" className="block rounded-3xl border border-slate-200 bg-white p-8 text-sky-950 shadow-md transition hover:shadow-xl">
              <h3 className="text-2xl font-bold">Related Repair Systems</h3>
              <ul className="mt-4 space-y-2">
                {["Polyurethane crack injection systems", "Epoxy crack injection systems", "Crystalline waterproofing coatings", "Cavity drain membrane systems", "Cementitious tanking and waterproofing"].map((item) => (
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
                {["Hydrophilic polyurethane injection resins", "Epoxy injection resins", "Crystalline waterproofing compounds", "Cavity drain membranes", "Mechanical joint seals and waterstop systems"].map((item) => (
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
