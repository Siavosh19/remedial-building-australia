import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Balcony Leaks | Remedial Building Australia",
  description: "Technical guide to balcony leaks in Class 2 buildings — waterproofing failure, causes, inspection and repair methodology.",
};

const inspectionItems = [
  "Inspect the balcony surface for tile cracking, hollowness (hammer test) and grout joint failure.",
  "Inspect all balcony drains for blockage and confirm they are flush with the finished surface.",
  "Inspect the perimeter sealant joint between membrane upturns and the wall finish.",
  "Check the threshold detail at the door from the apartment — confirm membrane upturn height is minimum 35 mm above finished floor.",
  "Inspect the balcony soffit for staining, rust and wet patches — map against the balcony above.",
  "Use a moisture meter to measure the moisture content of the soffit concrete — elevated readings confirm active ingress.",
  "Conduct a flood test on the balcony (50 mm water level for 24 hours) to confirm the membrane is defective.",
  "Engage a waterproofing consultant to confirm the membrane system, AS 3740 compliance and repair scope.",
];

const methodology = [
  "Confirm the membrane defect through flood testing before demolition works.",
  "Remove all tiles, adhesive, screed and existing membrane from the balcony surface.",
  "Inspect and repair the concrete substrate — patch all cracks, spalling and corroded reinforcement before waterproofing.",
  "Prime the prepared substrate with the system-specific primer in accordance with AS 3740.",
  "Install the waterproofing membrane in a minimum of two coats to the required wet and dry film thicknesses.",
  "Form membrane upturns to all walls a minimum 100 mm above the finished surface level.",
  "Form the membrane upturn at the door threshold a minimum 35 mm above the finished floor level inside the apartment.",
  "Detail all penetrations including drains and pipe penetrations with compatible pre-formed or site-formed membrane collars.",
  "Conduct a flood test at 50 mm depth for 24 hours before applying tile adhesive.",
  "Install tiles over the approved membrane using a polymer-modified tile adhesive and grout.",
  "Apply a polyurethane sealant to all perimeter joints between tiles and walls or upstands.",
  "Record all QA documentation including flood test results, product details and photographs.",
];

const risks = [
  "Structural concrete corrosion and spalling below from ongoing moisture",
  "Staining and amenity loss for occupants below",
  "Internal damage to ceiling plaster and building services",
  "Significant owner corporation liability for consequential damage to lot owner property",
  "Increasing repair cost as waterproofing failure progresses to structural damage",
  "Health risks from mould growth in affected areas",
  "Non-compliance with AS 3740 creating warranty and building commission issues",
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
            <a href="/industry-news" className="whitespace-nowrap hover:text-red-700">News &amp; Insights</a>
            <a href="/directory" className="whitespace-nowrap hover:text-red-700">Directory</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700">AI Scope Builder</a>
          
          </nav>
          <a href="/directory/login" className="hidden shrink-0 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800 transition md:inline-flex">Login / Create Account</a>
        </div>
      </header>

      <main className="px-6 py-20">
        <section className="mx-auto max-w-7xl">
          <a href="/defect-library/balconies-podiums" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100">
            ← Back to Balconies & Podiums
          </a>

          <div className="mt-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Balconies & Podiums</p>
              <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">Balcony Leaks</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">Balcony water ingress is one of the most frequently reported defects in Class 2 residential buildings and is responsible for a substantial proportion of strata remediation expenditure. Balconies in apartment buildings must comply with AS 3740 for waterproofing, which prescribes minimum membrane upturns, substrate preparation, drainage falls and detailing at penetrations and junctions. When the waterproofing system fails — or was never correctly installed — water travels through the structure and appears as staining, wet patches and active drips on the soffit of the balcony or ceiling of the apartment below.</p>
            </div>
          </div>

          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard title="Common Signs" items={["Active water drips or staining on the balcony soffit below", "Wet patches on the ceiling of the apartment below the balcony", "Rust staining on the soffit from corroding balcony reinforcement", "Hollow tiles on the balcony surface — indicating membrane failure", "Cracking or lifting of the balcony tile finish", "Efflorescence on the soffit or balcony edge", "Ponding water on the balcony surface from blocked drains or inadequate falls"]} />
            <InfoCard title="Common Causes" items={["Non-compliant membrane system not meeting AS 3740 requirements", "Insufficient membrane upturns at walls and door thresholds", "Failed membrane at tile-over-tile installations without adequate substrate preparation", "Cracks in the membrane from thermal movement and substrate deflection", "Blocked balcony drains causing water to pond and find its level through cracks", "No membrane installed — tiles direct-set to concrete or screed", "Failed sealant at the perimeter junction between the membrane and wall"]} />
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
            <a href="/ai-scope-builder" className="inline-flex rounded-xl bg-sky-900 px-5 py-3 text-base font-semibold text-white hover:bg-sky-800">
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
                {["Balcony waterproofing membrane systems to AS 3740", "Tile removal and substrate preparation systems", "Concrete crack and spalling repair systems", "Perimeter sealant joint systems", "Drainage outlet installation systems"].map((item) => (
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
