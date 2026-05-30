import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Box Gutter Failure | Remedial Building Australia",
  description: "Technical guide to box gutter failure in Class 2 buildings — blockage, corrosion, overflow and repair methodology.",
};

const inspectionItems = [
  "Access the box gutter locations from the roof or through access panels to inspect gutter condition.",
  "Clear all debris from strainer boxes and downpipe inlets and assess the amount of debris accumulation.",
  "Inspect the full length of the box gutter lining for corrosion, holes, open seams and damaged joints.",
  "Check drainage falls across the gutter floor — falls should be a minimum 1:200 toward the outlet.",
  "Assess the overflow provision — confirm overflow outlet size and location is adequate for the roof catchment area.",
  "Inspect the condition of end seals, side flashings and junction details at abutment walls.",
  "Conduct a hose test to confirm drainage, identify any overflow points and confirm downpipe capacity.",
  "Check internal ceilings below box gutters for staining indicative of previous or current overflow.",
];

const methodology = [
  "Clear all debris from the box gutter, strainer boxes and downpipe inlets immediately.",
  "Engage a roofing contractor to prepare a full condition assessment and repair scope.",
  "Where the gutter lining is corroded or holed, remove and replace the full lining — do not patch-repair corroded metal gutters.",
  "Replace the lining with a minimum 0.9 mm Colorbond steel or 1.2 mm aluminium lining, properly lapped and sealed at all joints.",
  "Re-form the gutter falls to achieve a minimum 1:200 slope to all outlets.",
  "Install correctly sized overflow outlets in accordance with AS/NZS 3500.3 to prevent overflow during design storm events.",
  "Install leaf guards or strainer baskets at all downpipe inlets to reduce debris accumulation.",
  "Seal all end plates, side junction flashings and penetrations with a compatible sealant.",
  "Test the repaired gutter with a hose test to confirm drainage and overflow performance.",
  "Repair all internal ceiling and plaster damage after confirming the gutter is functioning correctly.",
  "Establish a maintenance programme including annual gutter cleaning.",
];

const risks = [
  "Severe internal water damage to ceilings, walls and building services",
  "Structural damage to roof framing and ceiling substrate from prolonged saturation",
  "Mould growth in roof and ceiling spaces",
  "Electrical hazard from water ingress near services",
  "Significant remediation cost from delayed identification",
  "Building Commission and insurance disputes from unmitigated damage",
  "Loss of use of occupied areas below the gutter during repair",
];

export default function Page() {
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
            <a href="/directory/login" className="whitespace-nowrap hover:text-red-700 transition">Login</a>
            <a href="/directory/login" className="whitespace-nowrap hover:text-red-700 transition">Login</a>
          
          </nav>
          <a href="/" className="hidden shrink-0 rounded-xl bg-sky-700 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-800 md:inline-flex">Home</a>
        </div>
      </header>

      <main className="px-6 py-20">
        <section className="mx-auto max-w-7xl">
          <a href="/defect-library/roofing-defects" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100">
            ← Back to Roofing Defects
          </a>

          <div className="mt-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Roofing Defects</p>
              <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">Box Gutter Failure</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">Box gutters are concealed internal gutters typically formed in steel or aluminium that collect stormwater from pitched roof sections and discharge to downpipes. In Class 2 buildings, box gutter failure is a significant risk — when blocked or corroded, box gutters overflow directly into the building structure, causing severe internal damage to ceilings, walls and building services. Unlike external gutters, the failure of a box gutter is often not visible externally until significant internal damage has already occurred. Regular inspection and maintenance is essential.</p>
            </div>
          </div>

          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard title="Common Signs" items={["Water ingress into the building during heavy rain without obvious external source", "Staining and wet patches on internal ceilings below box gutter locations", "Visible rust staining or water marks at the underside of roof structure", "Debris visible at overflow points or downpipe inlets", "Corrosion or holes visible in gutter lining where accessible", "Blockage of downpipe inlets causing water to back up in the gutter", "Overflowing water at the eave or internal wall junction during rain"]} />
            <InfoCard title="Common Causes" items={["Debris accumulation at strainer boxes and downpipe inlets causing blockage", "Corrosion of steel box gutter lining from age and ponding water", "Inadequate drainage falls allowing water to pond and corrode the lining", "Absence of an overflow provision or incorrectly sized overflow outlets", "Lining joints and end seals that have failed over time", "Leaf and debris loading beyond the design capacity of the gutter", "Inadequate maintenance inspection frequency"]} />
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
            <a href="/repair-systems" className="block rounded-3xl border border-slate-200 bg-white p-8 text-sky-950 shadow-md transition hover:shadow-xl">
              <h3 className="text-2xl font-bold">Related Repair Systems</h3>
              <ul className="mt-4 space-y-2">
                {["Box gutter lining replacement systems", "Colorbond and aluminium gutter systems", "Overflow outlet installation systems", "Leaf guard and strainer systems", "Roof drainage design and assessment services"].map((item) => (
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
