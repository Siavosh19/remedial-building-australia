import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Balcony Waterproofing Failure | Remedial Building Australia",
  description:
    "Technical guide to balcony waterproofing failure — causes, inspection requirements, typical repair methodology and related repair systems for Class 2 buildings.",
};

const inspectionItems = [
  "Identify all areas of water ingress to the soffit or internal ceiling below the balcony.",
  "Map membrane condition across the balcony field, upturns, junctions and penetrations.",
  "Assess falls and drainage to confirm water is directing away from the building and not ponding.",
  "Inspect all penetrations including balustrade posts, pipes and anchors for failed or absent sealing.",
  "Check perimeter upturns for height compliance and continuity with the wall or door threshold detail.",
  "Flood test or moisture scan to confirm leak location and the extent of water-affected substrate.",
  "Inspect the substrate beneath any tiled finish for soundness using hammer tap testing.",
  "Assess structural condition of the concrete slab or substrate for deterioration caused by prolonged moisture.",
];

const methodology = [
  "Confirm the repair scope with the engineer or waterproofing consultant, including substrate condition and system selection.",
  "Isolate the work area and protect adjacent finishes and structure from damage during removal works.",
  "Remove all tiles, adhesive beds, screeds and existing membrane system to expose the concrete substrate.",
  "Remove balustrade posts and any embedded penetrations as required to allow full membrane continuity.",
  "Assess the exposed substrate for deterioration, spalling or reinforcement corrosion and repair as directed.",
  "Prepare the concrete substrate by grinding or scarifying to remove all laitance, adhesive residue and contamination.",
  "Form or rebuild falls where insufficient — minimum 1:100 fall to drains is required under AS 3740.",
  "Inspect and repair all drains, ensuring they are flush with the finished membrane level and correctly positioned.",
  "Prime the prepared substrate with the approved primer compatible with the selected waterproofing system.",
  "Install the approved waterproofing membrane system to the full field area, upturns and all junctions in accordance with AS 3740.",
  "Ensure upturns extend a minimum 150 mm above the finished surface level at all wall and door threshold junctions.",
  "Form coved transitions at all angle changes — no sharp 90-degree intersections permitted.",
  "Install pre-formed or site-formed membrane collars at all penetrations including balustrade post sleeves.",
  "Carry out a flood test in accordance with AS 3740 to confirm waterproofing integrity prior to tiling.",
  "Install tile bed, tiles and approved grout system over the confirmed watertight membrane.",
  "Record QA documentation including flood test results, product batch numbers, application thicknesses and photographs.",
];

const risks = [
  "Progressive water damage to the structural slab and reinforcement.",
  "Water ingress to the apartment or occupied space below.",
  "Reinforcement corrosion and concrete spalling on the soffit.",
  "Tile delamination and trip hazard from substrate movement.",
  "Significant cost escalation from delayed remediation.",
  "Potential liability under home building warranty legislation.",
  "Damage to common property elements and internal finishes.",
];

export default function BalconyWaterproofingFailurePage() {
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
            href="/defect-library/waterproofing-water-ingress"
            className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100"
          >
            ← Back to Waterproofing & Water Ingress
          </a>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">
                Waterproofing & Water Ingress
              </p>

              <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">
                Balcony Waterproofing Failure
              </h1>

              <p className="mt-6 text-xl leading-9 text-slate-700">
                Balcony waterproofing failure is one of the most commonly reported defects in Class 2 residential buildings across Australia. Failure occurs when the waterproofing membrane system installed beneath the tile or surface finish deteriorates, de-bonds or is incorrectly detailed at junctions, penetrations or upturns — allowing water to track into the structural slab and the occupied space below. Non-compliant installation to AS 3740 is a primary driver of failure in new construction.
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
              <img
                src="/images/categories/waterproofing-water-ingress.jpg"
                alt="Balcony waterproofing failure"
                className="h-[420px] w-full object-cover"
              />
              <div className="border-t border-slate-200 p-5 text-base font-semibold text-slate-700">
                Typical balcony membrane failure with water tracking to soffit below.
              </div>
            </div>
          </div>

          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard
              title="Common Signs"
              items={[
                "Water staining or active leaks on the soffit below",
                "Damp patches on internal ceilings or walls",
                "Tiles lifting, cracking or becoming loose",
                "Efflorescence or salt staining on balcony edges",
                "Rust staining from balustrade post corrosion",
                "Ponding water on the balcony surface",
                "Deteriorating grout lines and failed sealant joints",
              ]}
            />

            <InfoCard
              title="Common Causes"
              items={[
                "Non-compliant membrane installation to AS 3740",
                "Insufficient upturn height at walls and thresholds",
                "Failed or absent penetration detailing at balustrade posts",
                "Poor or absent coved transitions at angle changes",
                "Membrane de-bonding from inadequate substrate preparation",
                "Incorrect product selection for the exposure environment",
                "Inadequate or missing drainage falls",
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
                href="/downloads/balcony-waterproofing-inspection-checklist.pdf"
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
              The repair scope must be confirmed by a waterproofing consultant or engineer. The sequence below reflects a typical full-replacement methodology for balcony waterproofing failure.
            </p>

            <img
              src="/images/categories/waterproofing-water-ingress.jpg"
              alt="Balcony waterproofing repair methodology"
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
              Typical balcony waterproofing condition before and after full membrane replacement and tiling works.
            </p>

            <img
              src="/images/categories/waterproofing-water-ingress.jpg"
              alt="Balcony waterproofing before and after repair"
              className="mt-8 w-full rounded-2xl border border-slate-200 object-cover"
            />
          </section>

          <section className="mt-16 grid gap-8 md:grid-cols-2">
            <a
              href="/repair-systems/waterproofing-systems"
              className="block rounded-3xl border border-slate-200 bg-white p-8 text-sky-950 shadow-md transition hover:shadow-xl"
            >
              <h3 className="text-2xl font-bold">Related Repair Systems</h3>
              <ul className="mt-4 space-y-2">
                {[
                  "Polyurethane liquid waterproofing membranes",
                  "Sheet membrane systems",
                  "Cementitious waterproofing systems",
                  "Trafficable membrane systems",
                  "Flood testing and quality assurance",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-slate-700">
                    <span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-800" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 font-bold text-red-700">Open Repair Systems →</div>
            </a>

            <a
              href="/materials-products/waterproofing"
              className="block rounded-3xl border border-slate-200 bg-white p-8 text-sky-950 shadow-md transition hover:shadow-xl"
            >
              <h3 className="text-2xl font-bold">Related Materials</h3>
              <ul className="mt-4 space-y-2">
                {[
                  "Liquid applied polyurethane membranes",
                  "Torch-on sheet membranes",
                  "Membrane primers and bonding agents",
                  "Coved fillet and pre-formed angle pieces",
                  "Penetration collars and pipe seals",
                ].map((item) => (
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
          <a href="/" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200">
            ← Home
          </a>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">
              A structured Australian remedial building knowledge platform for defects, repair systems, materials and future AI-assisted scope writing.
            </p>
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
