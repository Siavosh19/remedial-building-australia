import type { Metadata } from "next";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "External Coating & Paint Deterioration | Remedial Building Australia",
  description:
    "Technical guide to external coating and paint failure on Class 2 building facades — causes, inspection methodology, surface preparation and repair for rendered, masonry, concrete, timber and metal surfaces.",
};

const inspectionItems = [
  "Inspect all external facades systematically for peeling, flaking, blistering, chalking and mould growth — document affected areas with photographs and record approximate surface areas.",
  "Conduct an adhesion test on representative areas using a cross-cut tape test or pull-off test — poor adhesion indicates the existing coating must be removed before recoating.",
  "Assess chalk level on aged paint surfaces using a visual rating — heavy chalking indicates the film has degraded and will not provide a sound base for a new coat.",
  "Inspect for blistering beneath the paint film — blistering typically indicates moisture trapped between the coating and substrate and requires investigation of the moisture source before recoating.",
  "Assess moisture content of the substrate using a moisture meter — do not proceed with coating application over damp substrates.",
  "Identify the existing coating system type where possible — solvent-borne vs water-borne, acrylic vs epoxy — to inform compatibility selection for the recoating system.",
  "Inspect all render, masonry and concrete surfaces beneath the coating for cracking, spalling, hollow areas and substrate defects — these must be repaired before coating is reinstated.",
  "Inspect all facade penetrations, control joints and window and door perimeters for sealant condition concurrent with the coating inspection — these must be resealed as part of any recoating programme.",
  "Check for rust staining through the paint film — this may indicate corroding embedded lintels, ties, fixings or reinforcement requiring investigation and treatment before recoating.",
  "In coastal or industrial environments, assess the degree of salt or chemical contamination using a Bresle patch test or equivalent — contamination must be removed before new coatings are applied.",
];

const methodology = [
  "Conduct a full facade inspection including adhesion testing, moisture readings and substrate assessment before preparing the recoating scope of works.",
  "Identify and repair all underlying substrate defects — render cracks, brickwork repointing failures, concrete spalling, failed sealants and corrosion — before commencing any coating application.",
  "Allow all substrates to dry to below the coating manufacturer's maximum permissible moisture content — typically 12–16% for render and concrete substrates.",
  "Pressure wash all exterior surfaces at a minimum 2,000 psi to remove chalk, mould, biological growth, dust, salt contamination and loose material.",
  "Apply a biocide treatment to all surfaces affected by mould, algae or lichen and allow the manufacturer's specified dwell time before washing off — do not paint over live biological growth.",
  "Remove all peeling, flaking and delaminated paint by scraping, wire brushing or mechanical preparation — new coatings must not be applied over loose or delaminated film.",
  "Apply a suitable primer or sealer appropriate to the substrate — alkali-resistant primer on new render or concrete; penetrating consolidant on friable or chalky substrates; rust-inhibiting primer on any exposed metal or corroding embedded elements.",
  "Apply a minimum of two full coats of a quality exterior acrylic paint, or a specialist elastomeric or texture coating where substrate movement, crack-bridging or heavy texture is required — follow the manufacturer's overcoating intervals.",
  "Apply a clear silicone or siloxane water-repellent impregnant to exposed masonry surfaces where the substrate is to be left unpainted but requires protection from moisture and salt ingress.",
  "Inspect and reseal all penetrations, control joints, window perimeters and door perimeters before completing the coating work — the sealant and coating must be compatible and installed in the correct sequence.",
  "Conduct a final inspection on completion to confirm full coverage, correct film build, absence of holidays, sags, brush marks and runs.",
  "Record the coating system, product names, batch numbers, application date and substrate conditions in the strata maintenance register.",
];

const risks = [
  "Moisture penetration through unprotected render, masonry and concrete substrates — leading to carbonation, reinforcement corrosion and salt damage.",
  "Accelerating substrate deterioration in uncoated concrete facades in aggressive coastal or urban environments.",
  "Biological growth — mould, lichen and algae — progressing from cosmetic nuisance to substrate damage if untreated.",
  "Increasing cost of substrate remediation if recoating is deferred to the point where render or concrete repair is required alongside the coating work.",
  "Rust staining and staining from unaddressed corroding embedded elements visible through new coatings.",
  "Non-compliance with strata maintenance obligations where paint and coating maintenance is specified.",
];

export default function ExternalCoatingPaintDeteriorationPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <SiteHeader />

      <main className="px-6 py-20">
        <section className="mx-auto max-w-7xl">
          <a href="/defect-library/facade-external-envelope" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100">
            ← Back to Façade & External Envelope
          </a>

          <div className="mt-10">
            <div>
              <PageNav />
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Façade & External Envelope</p>
              <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-sky-950">External Coating & Paint Deterioration</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">
                External coating and paint deterioration is one of the most visible forms of building envelope ageing in Class 2 buildings. While peeling or chalking paint is often treated as a cosmetic issue, a deteriorated coating exposes the substrate beneath — rendered walls, brick masonry, concrete, timber and metal elements — to moisture, UV radiation, salt and biological attack. In older buildings, repeated repainting over failing substrates can mask deeper structural or waterproofing problems, making thorough substrate assessment essential before any recoating programme is undertaken. Addressing the underlying substrate condition before recoating is the difference between a durable result and a programme of recurring paint failure.
              </p>
            </div>
          </div>

          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard
              title="Common Signs"
              items={[
                "Peeling, flaking or delaminating paint film on external facades",
                "Chalking and powdering of aged paint when rubbed by hand",
                "Blistering and bubbling of the paint film — often indicates moisture behind the coating",
                "Mould, algae and lichen growth on external surfaces",
                "Discolouration, staining and uneven fading across the facade",
                "Paint film cracking following underlying render or substrate cracks",
                "Rust staining through the coating from corroding embedded elements",
                "Colour fade and loss of sheen on sun-exposed elevations",
                "Erosion and film thinning on older repaint cycles",
              ]}
            />
            <InfoCard
              title="Common Causes"
              items={[
                "Age and end-of-service-life degradation of the paint film",
                "UV exposure causing photo-oxidation and progressive film breakdown",
                "Moisture penetration through the substrate causing blistering and delamination from below",
                "Insufficient surface preparation before repainting — chalk and contamination not removed",
                "Application of an incompatible coating over an existing system",
                "Application to a damp, alkaline or contaminated substrate",
                "Poor quality or low-durability coating products used for exterior applications",
                "Salt exposure in coastal environments causing rapid film degradation",
                "Underlying substrate defects transmitting through to the coating surface",
                "Lack of regular maintenance and recoating at recommended intervals",
              ]}
            />
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
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
              Durable recoating requires correct surface preparation above all else. A high-quality coating applied over a poorly prepared, damp or defective substrate will fail prematurely regardless of the product selected. Substrate repair, moisture testing and removal of all delaminated film must be completed before any primer or topcoat is applied.
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

          <section className="mt-16">
            <a href="/repair-systems" className="block rounded-3xl border border-slate-200 bg-white p-8 text-sky-950 shadow-md transition hover:shadow-xl">
              <h3 className="text-2xl font-bold">Related Repair Systems</h3>
              <ul className="mt-4 space-y-2">
                {[
                  "External acrylic coating and repainting systems",
                  "Elastomeric coating systems for cracked and moving facades",
                  "Masonry water repellent and impregnation systems",
                  "Mould and biological growth treatment and prevention systems",
                  "Facade cleaning and surface preparation systems",
                ].map((item) => (
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

      <SeoCrossPromo />

      <footer className="border-t border-sky-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-12">
          <a href="/" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200">← Home</a>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.</p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
            <div className="flex flex-col gap-2">
              <a href="/directory" className="hover:text-sky-700">Business Directory</a>
              <a href="/repair-systems" className="hover:text-sky-700">Repair Systems</a>
              <a href="/defect-library" className="hover:text-sky-700">Defect Library</a>
              <a href="/industry-news" className="hover:text-sky-700">News &amp; Insights</a>
            </div>
            <div className="flex flex-col gap-2">
              <a href="/advertise" className="hover:text-sky-700">Advertise With Us</a>
              <a href="/contact" className="hover:text-sky-700">Contact</a>
              <a href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</a>
              <a href="/terms" className="hover:text-sky-700">Terms</a>
              <a href="#" className="termly-display-preferences hover:text-sky-700">Consent Preferences</a>
            </div>
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
