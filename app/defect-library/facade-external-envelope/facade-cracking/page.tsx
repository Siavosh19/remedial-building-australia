import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Façade Cracking | Remedial Building Australia",
  description:
    "Technical guide to facade cracking in Class 2 buildings — structural and non-structural cracking causes, inspection requirements and repair methodology.",
};

const inspectionItems = [
  "Map all visible cracks on external facade surfaces, recording width, orientation, length and location relative to structural elements and openings.",
  "Classify cracks as hairline (<0.1 mm), fine (0.1–0.3 mm), medium (0.3–1 mm) or wide (>1 mm) using a calibrated crack gauge.",
  "Determine whether cracks are active or dormant by installing tell-tale gauges and taking readings over a minimum 4–6 week period.",
  "Assess crack pattern to assist diagnosis — vertical cracks indicate tensile forces, diagonal cracks at openings suggest settlement or differential movement, and horizontal cracks may indicate lateral loading.",
  "Inspect movement joint locations relative to the crack pattern — cracking at mid-panel locations often indicates absent or inadequate movement joints.",
  "Check the facade for signs of thermal bowing, particularly in render or masonry panels with dark coloured finishes or limited ventilation behind.",
  "Review structural drawings to understand load paths, slab deflection allowances and movement joint locations relative to observed cracking.",
  "Engage a structural engineer to assess all cracking, determine cause and confirm the repair specification.",
];

const methodology = [
  "Engage a structural engineer to assess all facade cracks and determine whether they are structural, thermal, shrinkage or settlement-related before proceeding with repairs.",
  "Install crack monitoring gauges at all active cracks and record movement over a minimum 4–6 week period before undertaking repairs.",
  "Erect scaffolding or swing stage to provide safe access to all cracked areas of the facade.",
  "For dormant hairline to fine cracks in render, prepare by raking out to 5 mm depth, clean, and fill with a flexible paintable sealant or crack filler.",
  "For dormant medium to wide cracks in render or masonry, rake out to a minimum 20 mm depth, clean thoroughly and fill with a compatible flexible cementitious or polymer repair mortar.",
  "For cracks in structural concrete, engage an engineer to specify whether epoxy injection (for load transfer) or flexible sealant (for dormant movement cracks) is appropriate.",
  "Install movement joints at all locations where cracking recurs due to absent joints — cut to full depth, install backer rod and seal with a compatible polyurethane or polysulfide sealant.",
  "For active cracks that cannot be arrested, install a flexible backer rod and sealant repair that accommodates ongoing movement.",
  "Repair all damaged render, coatings and surface finishes over repaired crack locations after the repair mortar or sealant has cured.",
  "Apply a crack-bridging elastomeric coating over the repaired facade surface where specified to prevent surface cracking reappearance.",
  "Record all crack locations, repair details, product information and monitoring data for the strata and owner records.",
];

const risks = [
  "Water ingress through open facade cracks causing substrate and internal damage.",
  "Ongoing crack widening from unaddressed thermal or structural movement.",
  "Structural weakening from active cracks in load-bearing facade elements.",
  "Spalling of render or masonry from widening cracks at height.",
  "Mould growth in wall cavities from moisture ingress through facade cracks.",
  "Significant escalating cost if active cracks are patched without addressing cause.",
  "Aesthetic and property value impact from visible unrepaired facade cracking.",
];

export default function FacadeCrackingPage() {
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
            <a href="/materials-products" className="whitespace-nowrap hover:text-red-700">Materials</a>
            <a href="/industry-news" className="whitespace-nowrap hover:text-red-700">Industry News</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700">AI Scope Builder</a>
          
          </nav>
          <a href="/" className="hidden shrink-0 rounded-xl bg-sky-700 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-800 md:inline-flex">Home</a>
        </div>
      </header>

      <main className="px-6 py-20">
        <section className="mx-auto max-w-7xl">
          <a href="/defect-library/facade-external-envelope" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100">
            ← Back to Façade & External Envelope
          </a>

          <div className="mt-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Façade & External Envelope</p>
              <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">Façade Cracking</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">
                Facade cracking encompasses a broad range of crack types — from hairline shrinkage cracks in render and concrete coatings through to wide structural cracks in masonry and concrete elements. Correct diagnosis is essential: the cause, activity, width and structural significance of each crack must be established before any repair approach is chosen. Patching active cracks without addressing the underlying cause invariably results in rapid recurrence. Structural engineer involvement is mandatory for any cracking that affects load-bearing elements or exceeds 1 mm in width.
              </p>
            </div>
          </div>

          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard
              title="Common Signs"
              items={[
                "Diagonal cracks at corners of window and door openings",
                "Vertical cracks at column and structural interfaces",
                "Horizontal cracks through masonry mortar beds",
                "Map cracking across render panels",
                "Cracks wider at top or bottom — indicating differential movement",
                "Recurring cracks after previous patch repairs",
                "Cracks with rust staining indicating corroded embedded steel",
              ]}
            />
            <InfoCard
              title="Common Causes"
              items={[
                "Differential structural movement or settlement",
                "Thermal expansion and contraction in absent movement joints",
                "Shrinkage of render, concrete or masonry elements during curing",
                "Corrosion of embedded reinforcement or fixings causing expansive cracking",
                "Slab deflection transferring stress to non-structural facade elements",
                "Wind loading on tall slender facades",
                "Inadequate ties between facade and structural frame",
              ]}
            />
            <InfoCard title="Risk of Neglect" items={risks} />
          </section>

          <section className="mt-16 rounded-3xl bg-white p-8 shadow-sm">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <h2 className="text-3xl font-bold text-sky-950">Inspection Requirements</h2>
              <a href="/downloads/facade-cracking-inspection-checklist.pdf" className="rounded-xl bg-sky-900 px-5 py-3 text-base font-semibold text-white hover:bg-sky-800">
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
              Facade crack repairs must be preceded by structural assessment. Active cracks require a monitoring period and root cause identification before repair — otherwise recurrence is certain.
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

          <section className="mt-16 grid gap-8 md:grid-cols-2">
            <a href="/repair-systems" className="block rounded-3xl border border-slate-200 bg-white p-8 text-sky-950 shadow-md transition hover:shadow-xl">
              <h3 className="text-2xl font-bold">Related Repair Systems</h3>
              <ul className="mt-4 space-y-2">
                {["Epoxy crack injection systems", "Flexible polyurethane sealant repair systems", "Crack monitoring and tell-tale systems", "Elastomeric crack-bridging coating systems", "Movement joint design and installation systems"].map((item) => (
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
                {["Low-viscosity epoxy resins for crack injection", "Flexible polymer crack fillers", "Elastomeric crack-bridging coatings", "Crack width gauges and tell-tale monitors", "Backer rod and polyurethane joint sealants"].map((item) => (
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
                    <div className="grid grid-cols-2 gap-3 text-sm font-bold text-sky-950 md:grid-cols-5">
            <a href="/" className="underline hover:text-sky-700">Home</a>
            <a href="/repair-systems" className="underline hover:text-sky-700">Repair Systems</a>
            <a href="/ai-scope-builder" className="underline hover:text-sky-700">AI Scope Builder</a>
            <a href="/industry-news" className="underline hover:text-sky-700">Industry News</a>
            <a href="/defect-library" className="underline hover:text-sky-700">Defect Library</a>
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
