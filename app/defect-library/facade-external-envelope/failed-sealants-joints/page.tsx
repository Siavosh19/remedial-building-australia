import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Failed Sealants & Joints | Remedial Building Australia",
  description:
    "Technical guide to failed facade sealants and movement joints — causes, inspection requirements, repair methodology and related systems for Class 2 buildings.",
};

const inspectionItems = [
  "Inspect all facade sealant joints including panel joints, window and door perimeters, movement joints and penetration seals for cracking, cohesive or adhesive failure.",
  "Assess whether sealant failure is cohesive (split through the sealant body) or adhesive (debonded from one or both sides) — different causes and solutions apply.",
  "Check sealant joint width-to-depth ratio — the correct ratio is 2:1 width to depth; deep, narrow joints prevent adequate sealant movement and cause premature failure.",
  "Inspect the presence and condition of backer rod — absence of backer rod results in three-sided adhesion and sealant failure.",
  "Assess whether movement joints are correctly designed and located at structural junctions, material interfaces and at regular centres across panel systems.",
  "Check for sealant over-painting, surface contamination or priming deficiencies that reduce adhesion life.",
  "Identify any locations where inflexible materials (mortar, grout or hard caulk) have been used in movement joint locations.",
  "Test sealant adhesion by pulling an exposed edge — if the sealant pulls cleanly from the substrate without tearing, adhesive failure is confirmed.",
];

const methodology = [
  "Prepare a joint sealant schedule identifying all joint locations, widths, depths, substrate types and specified sealant products.",
  "Erect scaffolding or swing stage to provide safe access to all sealant joint locations.",
  "Remove all existing sealant from the joints to be resealed using a sharp utility knife, oscillating tool or scraper — avoid damaging the substrate face.",
  "Remove all backer rod remnants and clean the joint faces with solvent to remove all residual sealant, contamination and bond breakers.",
  "Inspect joint widths and depths before proceeding — joints that are too narrow or too deep may require modification before resealing.",
  "Install closed-cell polyethylene backer rod at the correct depth to achieve the specified 2:1 sealant width-to-depth ratio.",
  "Apply masking tape to both sides of the joint to protect adjacent surfaces and ensure clean sealant lines.",
  "Prime joint faces with the sealant manufacturer's specified primer and allow to dry — primer selection must match the substrate material.",
  "Apply the specified sealant (polyurethane, silicone or polysulfide) to the joint in a single continuous pass, tooling immediately to ensure full contact with both joint faces.",
  "Tool the sealant to a concave profile and remove masking tape before the sealant skins.",
  "Allow sealant to cure for the manufacturer's specified period before exposing to water or traffic.",
  "Record all joints completed with photographs, product details, batch numbers and joint dimensions.",
];

const risks = [
  "Water ingress through open facade joints causing internal moisture damage.",
  "Accelerating substrate deterioration from repeated wetting and drying behind failed joints.",
  "Corrosion of embedded fixings, ties and reinforcement from moisture penetration.",
  "Thermal and acoustic performance degradation from open movement joints.",
  "Mould growth in wall cavities and internal spaces from ongoing moisture ingress.",
  "Significant cost escalation if joint failure is not addressed before major substrate deterioration.",
  "Potential strata liability for water damage to lot owner property from failed common property joints.",
];

export default function FailedSealantsJointsPage() {
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
              <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">Failed Sealants & Joints</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">
                Facade sealant and movement joint failure is among the most frequent causes of water ingress in Class 2 buildings. Sealants have a finite service life — typically 10–15 years for polyurethane and 15–25 years for silicone — and must be proactively maintained as part of any building's ongoing maintenance programme. Failures arise from age, UV degradation, incorrect joint design, inadequate substrate preparation and the use of incompatible products. Even minor sealant failure can direct significant volumes of water into the building envelope during rain events.
              </p>
            </div>
          </div>

          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard
              title="Common Signs"
              items={[
                "Cracking through the sealant body (cohesive failure)",
                "Sealant debonded from one or both joint faces (adhesive failure)",
                "Gaps, voids or open joints visible on the facade",
                "Sealant surface chalking, hardening or UV degradation",
                "Water staining below joint locations after rain",
                "Mortar or grout in locations that should accommodate movement",
                "Sealant over-painted, contaminated or bridging across the joint",
              ]}
            />
            <InfoCard
              title="Common Causes"
              items={[
                "Sealant exceeding its service life without maintenance replacement",
                "Incorrect sealant product selected for the substrate or movement type",
                "Absent or incorrectly installed backer rod causing three-sided adhesion",
                "Joint too narrow or too deep for sealant to accommodate movement",
                "Substrate surface not primed or cleaned before sealant application",
                "Sealant applied over old sealant rather than fully removed and replaced",
                "Joint locations at structural junctions filled with rigid mortar",
              ]}
            />
            <InfoCard title="Risk of Neglect" items={risks} />
          </section>

          <section className="mt-16 rounded-3xl bg-white p-8 shadow-sm">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <h2 className="text-3xl font-bold text-sky-950">Inspection Requirements</h2>
              <a href="/downloads/sealant-joints-inspection-checklist.pdf" className="rounded-xl bg-sky-900 px-5 py-3 text-base font-semibold text-white hover:bg-sky-800">
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
              Sealant replacement requires complete removal of the existing sealant and backer rod — applying new sealant over old sealant is not acceptable and will result in early failure.
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
                {["Polyurethane facade joint sealant systems", "Silicone structural and facade sealant systems", "Movement joint design and installation systems", "Sealant primer and preparation systems", "Polysulfide expansion joint systems"].map((item) => (
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
                {["One and two-part polyurethane sealants", "Neutral cure silicone sealants", "Closed-cell polyethylene backer rod", "Substrate-specific sealant primers", "Bond breaker tape for three-sided adhesion prevention"].map((item) => (
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
