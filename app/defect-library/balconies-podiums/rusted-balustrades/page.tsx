import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rusted Balustrades | Remedial Building Australia",
  description: "Technical guide to corroded and rusted balustrades on balconies — structural failure, core fill issues and repair methodology.",
};

const inspectionItems = [
  "Inspect all balustrade post bases for rust staining, cracking and tile lifting at the base.",
  "Test all balustrade posts for structural soundness by applying a lateral load of 1.0 kN (approx. 100 kg) horizontally at top rail level.",
  "Inspect the perimeter sealant around all post bases for cracking, gaps and failure.",
  "Where tiles are cracked or lifted at post bases, remove to expose the post base and core fill zone.",
  "Measure residual wall thickness of exposed post sections using ultrasonic testing where significant section loss is suspected.",
  "Assess the degree of corrosion in the embedded section — this may require coring around the post to expose the embedded zone.",
  "Engage a structural engineer to assess balustrade structural capacity where corrosion is identified at the embedded section.",
  "Check that the balustrade height meets AS 1428.1 minimum 1000 mm at balconies above 4 m height.",
];

const methodology = [
  "Engage a structural engineer to assess all corroded balustrade posts and confirm which require replacement.",
  "Erect temporary hoarding or barrier protection in place of any balustrade posts identified as structurally compromised.",
  "Remove tiles and screed from around all defective post bases to expose the full embedded section.",
  "Remove corroded posts by cutting at the slab level and drilling out the remaining core fill.",
  "Clean and prepare the core hole and surrounding slab surface.",
  "Install a stainless steel or hot-dip galvanised replacement post with a correctly specified base plate and anchor system.",
  "Install a waterproof sleeve or membrane detail around the base of all replacement posts before screed is reinstated.",
  "Reinstate screed and tiles with a polyurethane perimeter seal at all post bases.",
  "For existing posts confirmed as structurally sound — clean, prime and apply a two-pack epoxy paint system and reseal the base with polyurethane.",
  "Record all structural engineer sign-off documentation and photographs for the strata maintenance register.",
];

const risks = [
  "Structural failure of corroded balustrade posts under lateral loading — fall hazard",
  "Non-compliance with AS 1170.1 minimum balustrade load requirements",
  "Building Commission urgent rectification orders where balustrade safety is compromised",
  "Strata liability for injury or death from balustrade failure",
  "Significant remediation cost from replacement of multiple posts and associated waterproofing",
  "Damage to surrounding tiles and membrane from corrosion expansion at post bases",
  "Recurring failure if replacement posts are not installed with correct waterproofing details",
];

export default function Page() {
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
          <a href="/defect-library/balconies-podiums" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100">
            ← Back to Balconies & Podiums
          </a>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Balconies & Podiums</p>
              <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">Rusted Balustrades</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">Balustrade corrosion on balconies is a critical safety defect — the primary purpose of a balustrade is to prevent falls, and a corroded or structurally compromised balustrade may fail at the moment it is most needed. In Class 2 buildings, mild steel balustrade posts are commonly core-filled into the balcony slab or screed without adequate waterproofing of the core fill opening. Water ingress to the core fill zone causes accelerating corrosion of the embedded post base, which can reduce structural capacity to below the minimum 1.0 kN horizontal load requirement under AS 1170.1 without any external visible indication of the extent of section loss below the surface.</p>
            </div>
            <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
              <img src="/Images/Categories/balconies-podiums.jpg" alt="Rusted Balustrades" className="h-[420px] w-full object-cover" />
              <div className="border-t border-slate-200 p-5 text-base font-semibold text-slate-700">
                Typical rusted balustrades condition in a Class 2 building.
              </div>
            </div>
          </div>

          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard title="Common Signs" items={["Rust staining on the balcony surface around balustrade post bases", "Cracking and spalling of the tile, screed or concrete around post base locations", "Swelling or lifting of tiles at post base locations from corrosion expansion", "Visible rust and section loss on exposed post sections", "Balustrade posts that move or deflect when loaded laterally", "Paint blistering and bubbling on painted steel balustrade elements", "Open or poorly sealed core fill openings at post bases allowing water entry"]} />
            <InfoCard title="Common Causes" items={["Mild steel posts core-filled into the slab without a waterproof sleeve or adequate sealing", "Water ingress into the core fill zone from failed perimeter sealant around the post base", "Absence of a waterproofing membrane layer under the tile at post base locations", "Post bases cast directly into a non-galvanised or uncoated condition", "Marine or coastal environment chloride exposure accelerating corrosion", "Maintenance painting not reaching the post base junction — area most at risk left unprotected", "Incorrect post material specification — mild steel where stainless steel was required by the environment"]} />
            <InfoCard title="Risk of Neglect" items={risks} />
          </section>

          <section className="mt-16 rounded-3xl bg-white p-8 shadow-sm">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <h2 className="text-3xl font-bold text-sky-950">Inspection Requirements</h2>
              <a href="#" className="rounded-xl bg-sky-900 px-5 py-3 text-base font-semibold text-white hover:bg-sky-800">
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
            <img src="/Images/Categories/balconies-podiums.jpg" alt="Rusted Balustrades repair" className="mt-8 w-full rounded-2xl border border-slate-200 object-cover" />
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
            <img src="/Images/Categories/balconies-podiums.jpg" alt="Rusted Balustrades before and after" className="mt-8 w-full rounded-2xl border border-slate-200 object-cover" />
          </section>

          <section className="mt-16 grid gap-8 md:grid-cols-2">
            <a href="/repair-systems" className="block rounded-3xl border border-slate-200 bg-white p-8 text-sky-950 shadow-md transition hover:shadow-xl">
              <h3 className="text-2xl font-bold">Related Repair Systems</h3>
              <ul className="mt-4 space-y-2">
                {["Balustrade post replacement systems", "Core fill waterproofing systems", "Hot-dip galvanised and stainless steel fixing systems", "Tile and screed reinstatement at post base systems", "Structural certification and load testing services"].map((item) => (
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
                {["Stainless steel grade 316 balustrade posts", "Hot-dip galvanised steel post systems", "Epoxy and polyurethane base plate grouts", "Polyurethane post base perimeter sealants", "Two-pack epoxy paint systems for steel"].map((item) => (
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
