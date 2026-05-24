import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hydrostatic Pressure Issues | Remedial Building Australia",
  description: "Technical guide to hydrostatic pressure water ingress in Class 2 building basements — causes, assessment and waterproofing methodology.",
};

const inspectionItems = [
  "Engage a geotechnical engineer to assess the groundwater table level relative to the basement structure.",
  "Inspect all basement walls and slab for moisture, seepage and active flow locations.",
  "Map the pattern of ingress — construction joints, cracks, wall-slab junctions and slab face separately.",
  "Assess the severity of ingress — weeping (minor), seeping (moderate) or flowing (severe).",
  "Review the original design for external waterproofing type and specification.",
  "Test the basement drainage system — confirm sumps, pumps and external drainage are functioning.",
  "Assess whether remediation by internal tanking, injection or cavity drain is appropriate for the situation.",
  "Engage a waterproofing engineer to prepare the remediation specification.",
];

const methodology = [
  "Engage a waterproofing engineer to assess the hydrostatic conditions and specify the appropriate remediation system.",
  "For minor to moderate hydrostatic ingress — apply a cementitious crystalline waterproofing system to all basement wall and slab faces.",
  "Inject all active cracks and construction joints with hydrophilic polyurethane resin before applying the crystalline coating.",
  "For significant hydrostatic ingress — install a cavity drain membrane system to all walls and slab.",
  "Install a perimeter drainage channel and sump pump behind the cavity drain membrane.",
  "Specify a primary and backup pump with battery backup for critical basement applications.",
  "Where accessible, improve external drainage by installing a perimeter aggregate drainage blanket and slotted pipe to lower the groundwater table.",
  "Apply a crystalline waterproofing admixture to all new concrete pours in the repair zone.",
  "Monitor the sump pump activation frequency after installation to confirm the system is functioning.",
  "Record all works with a waterproofing engineer certification and photographs.",
];

const risks = [
  "Continuous water ingress to basement causing ongoing property damage",
  "Corrosion of basement reinforcement from chronic moisture exposure",
  "Mould growth in habitable basement areas",
  "Damage to basement finishes, fit-out and stored property",
  "Structural deterioration of the basement slab from hydrostatic uplift and heave",
  "Building services damage from flooding events",
  "Significant remediation cost — hydrostatic waterproofing is one of the most expensive defect categories to resolve",
];

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8 py-5">
          <a href="/" className="flex shrink-0 items-center gap-3"><div><div className="text-lg font-extrabold tracking-tight text-sky-950">Remedial Building Australia</div><div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-900">Technical Remedial Building Platform</div></div></a>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-sky-800 md:flex">
            <a href="/" className="whitespace-nowrap hover:text-red-700 transition">Home</a>
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
          <a href="/defect-library/basements-substructure" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100">← Back to Basements & Substructure</a>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Basements & Substructure</p>
              <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">Hydrostatic Pressure Issues</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">Hydrostatic pressure is the force exerted by groundwater against the external face of basement walls and slabs. In areas with a high groundwater table or in periods of sustained rain, this pressure can force water through even small defects in the concrete and waterproofing system — appearing as weeping, seeping or active flow through the basement structure. Hydrostatic ingress is particularly challenging to remediate because the water pressure is continuous, unlike rain-driven ingress. The repair approach must either resist the hydrostatic head (tanking) or relieve it (cavity drain or drainage systems).  </p>
            </div>
            <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
              <img src="/Images/Categories/basements-substructure.jpg" alt="Hydrostatic Pressure Issues" className="h-[420px] w-full object-cover" />
              <div className="border-t border-slate-200 p-5 text-base font-semibold text-slate-700">Typical hydrostatic pressure issues condition in a Class 2 building.</div>
            </div>
          </div>
          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard title="Common Signs" items={["Seeping or weeping water through basement walls and slab without rain events", "White crystalline deposits (efflorescence) on basement walls from mineral-laden groundwater", "Damp concrete surfaces that do not dry even in summer", "Active water flow at construction joints, cracks and slab-wall junctions", "Visible tide marks on the lower basement walls corresponding to the groundwater level", "Floor coverings lifting or bubbling from hydrostatic pressure below", "Flooding of the basement slab during periods of high rainfall or after heavy rain"]} />
            <InfoCard title="Common Causes" items={["High seasonal or permanent groundwater table at or above basement level", "External drainage system inadequate to lower the groundwater table", "Absence of external waterproofing on basement walls", "External waterproofing that has failed or was never applied", "Permeable concrete from high water-cement ratio or inadequate compaction", "Failed construction joint waterproofing strips or injection hoses", "Dewatering system turned off without adequate permanent groundwater management"]} />
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
          <section className="mt-16 rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-sky-950">Typical Repair Methodology</h2>
            <img src="/Images/Categories/basements-substructure.jpg" alt="Hydrostatic Pressure Issues repair" className="mt-8 w-full rounded-2xl border border-slate-200 object-cover" />
            <ol className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-7 py-6">
              {methodology.map((step, index) => (<li key={step} className="flex gap-4 text-base leading-8 text-slate-800" style={{ marginBottom: index < methodology.length - 1 ? "3mm" : 0 }}><span className="mt-1 shrink-0 text-sm font-bold text-slate-500">{String(index + 1).padStart(2, "0")}.</span><span>{step}</span></li>))}
            </ol>
          </section>
          <section className="mt-16 rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-sky-950">Before / After Repair</h2>
            <img src="/Images/Categories/basements-substructure.jpg" alt="Hydrostatic Pressure Issues before and after" className="mt-8 w-full rounded-2xl border border-slate-200 object-cover" />
          </section>
          <section className="mt-16 grid gap-8 md:grid-cols-2">
            <a href="/repair-systems" className="block rounded-3xl border border-slate-200 bg-white p-8 text-sky-950 shadow-md transition hover:shadow-xl">
              <h3 className="text-2xl font-bold">Related Repair Systems</h3>
              <ul className="mt-4 space-y-2">{["Crystalline cementitious waterproofing systems", "Cavity drain membrane and sump pump systems", "Hydrophilic polyurethane crack injection systems", "External perimeter drainage systems", "Basement waterproofing engineer assessment services"].map((item) => (<li key={item} className="flex gap-3 text-base leading-7 text-slate-700"><span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-800" />{item}</li>))}</ul>
              <div className="mt-6 font-bold text-red-700">Open Repair Systems →</div>
            </a>
            <a href="/materials-products" className="block rounded-3xl border border-slate-200 bg-white p-8 text-sky-950 shadow-md transition hover:shadow-xl">
              <h3 className="text-2xl font-bold">Related Materials</h3>
              <ul className="mt-4 space-y-2">{["Crystalline waterproofing slurries and admixtures", "HDPE cavity drain membranes", "Submersible sump pumps with battery backup", "Hydrophilic polyurethane injection resins", "Drainage composites and perimeter drainage pipes"].map((item) => (<li key={item} className="flex gap-3 text-base leading-7 text-slate-700"><span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-800" />{item}</li>))}</ul>
              <div className="mt-6 font-bold text-red-700">Open Materials →</div>
            </a>
          </section>
        </section>
      </main>
      <footer className="border-t border-sky-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-12"><a href="/" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200">← Home</a></div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div><div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div><p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">A structured Australian remedial building knowledge platform for defects, repair systems, materials and future AI-assisted scope writing.</p></div>
          <div className="grid grid-cols-2 gap-3 text-sm font-bold text-sky-950 md:grid-cols-3"><a href="/about" className="underline hover:text-sky-700">About</a><a href="/terms" className="underline hover:text-sky-700">Terms</a><a href="/contact" className="underline hover:text-sky-700">Contact</a></div>
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
