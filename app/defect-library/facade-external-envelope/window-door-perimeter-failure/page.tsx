import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Window & Door Perimeter Failure | Remedial Building Australia",
  description:
    "Technical guide to window and door perimeter water ingress in Class 2 buildings — causes, inspection requirements, repair methodology and related systems.",
};

const inspectionItems = [
  "Inspect all window and door perimeters on the exterior facade for sealant cracking, adhesive failure, gaps and missing sections.",
  "Check window and door head flashings for correct installation, slope, continuity and condition — absent or failed head flashings are a primary cause of ingress.",
  "Inspect sill flashings and drip edges for correct slope and drainage — flat or reverse-sloped sills direct water toward the frame.",
  "Assess the internal reveals at windows and doors for staining, paint failure, plaster damage and mould — these indicate ongoing moisture ingress.",
  "Check the weepholes in window frames for blockage — blocked weepholes allow water retained in the frame to overflow internally.",
  "Inspect the interface between the window or door frame and the surrounding render, brickwork or cladding for gaps, cracking and open joints.",
  "Conduct a hose test on suspect perimeters — apply water at window head and track ingress points internally.",
  "Review window and door installation documentation for compliance with manufacturer requirements, particularly for minimum sill slope, flashing specification and sealant type.",
];

const methodology = [
  "Identify all water entry points through hose testing and internal inspection before commencing works.",
  "Remove all existing perimeter sealant from the window or door frame-to-facade interface using a sharp knife and oscillating tool.",
  "Clean all joint faces thoroughly to remove all dust, contamination, old sealant residue and bond breakers.",
  "Install backer rod at the correct depth to achieve a 2:1 width-to-depth sealant joint ratio.",
  "Prime joint faces with the sealant manufacturer's specified primer for the substrate combination (e.g. UPVC frame to concrete or masonry).",
  "Apply a neutral-cure silicone or polyurethane sealant to the perimeter joint, tooling to a concave profile for positive drainage.",
  "Inspect and rectify window head flashings — where absent, install a correctly sloped stainless steel or colorbond flashing with a 10 mm minimum overhang and stop ends.",
  "Clear all blocked weepholes in window frames and ensure the drainage system within the frame is functional.",
  "Where sill slope is inadequate, apply a mortar fillet or packing to achieve a minimum 1:40 slope away from the frame before resealing.",
  "Repair all internal plaster, render and paint damage resulting from the water ingress after confirming the ingress source has been resolved.",
  "Conduct a follow-up hose test after all works are complete to confirm the repair is effective.",
  "Record all repairs with photographs and product details for the strata maintenance register.",
];

const risks = [
  "Ongoing water ingress to internal wall cavities, ceilings and floor levels below.",
  "Mould growth in wall linings and reveals from recurring moisture.",
  "Deterioration of internal plaster, joinery and finishes.",
  "Damage to floor coverings, cabinetry and electrical fittings below ingress points.",
  "Corrosion of embedded lintels and fixings from prolonged moisture exposure.",
  "Strata liability for consequential damage to lot owner property from common property defects.",
  "Escalating remediation cost as substrate and internal finishes deteriorate without intervention.",
];

export default function WindowDoorPerimeterFailurePage() {
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
          <a href="/defect-library/facade-external-envelope" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100">
            ← Back to Façade & External Envelope
          </a>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Façade & External Envelope</p>
              <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">Window & Door Perimeter Failure</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">
                Water ingress at window and door perimeters is one of the most frequently reported defects in Class 2 buildings. The interface between the window or door frame and the surrounding facade is a critical weatherproofing junction — requiring a combination of correctly installed flashings, adequate sill drainage and a durable perimeter sealant to remain watertight. Failure at any one of these elements allows water to enter the building, causing progressive damage to internal finishes, wall linings and building services that can be disproportionately expensive to remediate compared with the relatively simple rectification of the perimeter defect itself.
              </p>
            </div>
            <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
              <img src="/Images/Categories/facade-external-envelope.jpg" alt="Window perimeter failure" className="h-[420px] w-full object-cover" />
              <div className="border-t border-slate-200 p-5 text-base font-semibold text-slate-700">
                Failed perimeter sealant at window head allowing water ingress and internal staining.
              </div>
            </div>
          </div>

          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard
              title="Common Signs"
              items={[
                "Water staining on internal reveals and walls below windows",
                "Mould growth at window reveals and sill areas",
                "Paint blistering and plaster damage below window heads",
                "Visible gaps or open sealant at the frame-to-facade junction",
                "Failed or absent head flashing above the window",
                "Flat or inward-sloping window sills directing water to the frame",
                "Staining on external facade below window openings",
              ]}
            />
            <InfoCard
              title="Common Causes"
              items={[
                "Failed or absent perimeter sealant at the frame-to-facade interface",
                "Missing or incorrectly installed head flashing above windows and doors",
                "Flat or reverse-sloped sills allowing water pooling at the frame",
                "Blocked weepholes preventing internal frame drainage",
                "Frame not bedded in mortar or sealant on installation",
                "Sealant applied over contaminated or unprimed surfaces",
                "Thermal movement opening perimeter joints over time",
              ]}
            />
            <InfoCard title="Risk of Neglect" items={risks} />
          </section>

          <section className="mt-16 rounded-3xl bg-white p-8 shadow-sm">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <h2 className="text-3xl font-bold text-sky-950">Inspection Requirements</h2>
              <a href="/downloads/window-perimeter-inspection-checklist.pdf" className="rounded-xl bg-sky-900 px-5 py-3 text-base font-semibold text-white hover:bg-sky-800">
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
              Window perimeter repairs address the sealant joint, flashing and sill drainage as a combined system — rectifying only the sealant while leaving flashings and sill slope defective will result in ongoing ingress.
            </p>
            <img src="/Images/Categories/facade-external-envelope.jpg" alt="Window perimeter repair" className="mt-8 w-full rounded-2xl border border-slate-200 object-cover" />
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
              Typical window perimeter condition before and after flashing installation, sealant replacement and internal repair.
            </p>
            <img src="/Images/Categories/facade-external-envelope.jpg" alt="Window perimeter before and after repair" className="mt-8 w-full rounded-2xl border border-slate-200 object-cover" />
          </section>

          <section className="mt-16 grid gap-8 md:grid-cols-2">
            <a href="/repair-systems" className="block rounded-3xl border border-slate-200 bg-white p-8 text-sky-950 shadow-md transition hover:shadow-xl">
              <h3 className="text-2xl font-bold">Related Repair Systems</h3>
              <ul className="mt-4 space-y-2">
                {["Window perimeter sealant replacement systems", "Head and sill flashing systems", "Window frame drainage and weephole systems", "Internal reveal and plaster repair systems", "Hose testing and water ingress investigation services"].map((item) => (
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
                {["Neutral-cure silicone perimeter sealants", "Polyurethane facade joint sealants", "Stainless steel and Colorbond head flashings", "Substrate-specific sealant primers", "Closed-cell polyethylene backer rod"].map((item) => (
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
