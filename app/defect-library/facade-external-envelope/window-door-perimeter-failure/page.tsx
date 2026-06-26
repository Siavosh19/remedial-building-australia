import type { Metadata } from "next";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Window & Door Perimeter Failure | Remedial Building Australia",
  description:
    "Technical guide to window and door perimeter defects in Class 2 buildings — water ingress, rotten frames, failed flashings, missing storm angles, jammed sashes and non-compliant door hobs.",
};

const inspectionItems = [
  "Inspect all window and door perimeters on the exterior facade for sealant cracking, adhesive failure, gaps and missing sections.",
  "Check all timber window and door frames for softening, rot, section loss and paint failure — probe suspect areas with a sharp tool to detect concealed decay.",
  "Attempt to open and close all operable windows and doors to identify sashes that are jammed, binding, swollen or no longer functioning correctly.",
  "Inspect window and door head flashings for correct installation, slope, continuity and condition — absent or failed head flashings are a primary cause of ingress.",
  "Check for the presence and condition of storm angles (return leg at the jamb) — absent or missing storm angles allow wind-driven rain into the frame-to-facade junction.",
  "Inspect sill flashings and drip edges for correct slope and drainage — flat or reverse-sloped sills direct water toward the frame rather than away from it.",
  "Inspect subsill detailing for correct waterproofing, slope and drainage — particularly at aluminium-framed windows where the subsill must drain outward.",
  "Assess the internal reveals at windows and doors for staining, paint failure, plaster damage and mould — these indicate ongoing moisture ingress.",
  "Check the weepholes in window frames for blockage — blocked weepholes allow water retained in the frame to overflow internally.",
  "Inspect the interface between the window or door frame and the surrounding render, brickwork or cladding for gaps, cracking and open joints.",
  "For balcony doors: inspect the door hob (threshold) for correct height and waterproofing angle detail — a non-compliant or absent door hob allows water driven across a wet balcony to enter the interior.",
  "Conduct a hose test on suspect perimeters — apply water at window head and track ingress points internally.",
  "Review window and door installation documentation for compliance with manufacturer requirements, particularly for minimum sill slope, flashing specification and sealant type.",
];

const methodology = [
  "Identify all water entry points through hose testing and internal inspection before commencing works.",
  "For timber windows and doors with localised rot: remove all rotted timber using chisel and oscillating tool, treat surrounding timber with an appropriate timber hardener, and fill with a two-part epoxy wood filler shaped to profile before repainting.",
  "For timber windows and doors with extensive frame decay or structural failure of the frame: replace the full window or door unit. Engage a joiner or window specialist to fabricate a replacement to match the original profile where heritage requirements apply.",
  "For jammed or binding timber sashes: assess the cause — if swelling from moisture ingress, resolve the ingress first, then plane or sand the sash to correct clearance. Repaint all bare timber after adjustment.",
  "Remove all existing perimeter sealant from the window or door frame-to-facade interface using a sharp knife and oscillating tool.",
  "Clean all joint faces thoroughly to remove all dust, contamination, old sealant residue and bond breakers.",
  "Install backer rod at the correct depth to achieve a 2:1 width-to-depth sealant joint ratio.",
  "Prime joint faces with the sealant manufacturer's specified primer for the substrate combination.",
  "Apply a neutral-cure silicone or polyurethane sealant to the perimeter joint, tooling to a concave profile for positive drainage.",
  "Where storm angles are absent or failed: install a new powder-coated aluminium or stainless steel storm angle to the jamb, bedded in sealant, with the return leg lapping the facade substrate by a minimum of 50 mm.",
  "Inspect and rectify window head flashings — where absent, install a correctly sloped stainless steel or colorbond flashing with a minimum 10 mm overhang and stop ends to the sides.",
  "Where subsill drainage is inadequate or absent: cut a channel and install a correctly sloped subsill tray with a weephole to the external face before resealing.",
  "Clear all blocked weepholes in window frames and ensure the drainage system within the frame is functional.",
  "Where sill slope is inadequate, apply a mortar fillet or packing to achieve a minimum 1:40 slope away from the frame before resealing.",
  "For balcony doors with a non-compliant or absent hob: construct a correctly detailed hob to the manufacturer's and NCC minimum height requirement, incorporating a waterproofing angle at the base of the door frame before screed and tiling are reinstated.",
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
  "Progressive timber frame rot that eventually requires full window replacement if not addressed early.",
  "Security risk from windows and doors that can no longer be properly closed or locked.",
  "Strata liability for consequential damage to lot owner property from common property defects.",
  "Escalating remediation cost as substrate and internal finishes deteriorate without intervention.",
];

export default function WindowDoorPerimeterFailurePage() {
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
              <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">Window & Door Perimeter Failure</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">
                Window and door defects in Class 2 buildings extend well beyond sealant failure. The interface between a window or door frame and the surrounding facade is a complex weatherproofing junction requiring correctly installed flashings, storm angles, subsill drainage, a compliant door hob where applicable, and a durable perimeter sealant to remain watertight over the building&rsquo;s service life. In older buildings, deteriorated timber frames — with rot, binding sashes, paint failure and swelling — are among the most common maintenance defects. Failure to address these early results in progressive structural decay that eventually requires full unit replacement. For balcony doors, a non-compliant or absent door hob is a waterproofing defect that allows water driven across a wet balcony surface to enter the building at threshold level.
              </p>
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
                "Failed or absent head flashing above windows and doors",
                "Flat or inward-sloping window sills directing water to the frame",
                "Timber frames that are soft, decayed or showing significant paint failure",
                "Windows and doors that no longer open, close or lock correctly",
                "Swollen or binding timber sashes",
                "Missing or corroded storm angles at window jambs",
                "Water entry at balcony door threshold from absent or non-compliant door hob",
                "Staining on external facade below window openings",
              ]}
            />
            <InfoCard
              title="Common Causes"
              items={[
                "Failed or absent perimeter sealant at the frame-to-facade interface",
                "Missing or incorrectly installed head flashing above windows and doors",
                "Missing or failed storm angles at window jamb returns",
                "Flat or reverse-sloped sills allowing water pooling at the frame",
                "Inadequate or absent subsill drainage detail",
                "Blocked weepholes preventing internal frame drainage",
                "Age-related timber decay from prolonged moisture exposure",
                "Lack of regular maintenance painting allowing moisture into end grain",
                "Sealant applied over contaminated or unprimed surfaces",
                "Thermal movement opening perimeter joints over time",
                "Non-compliant or absent door hob at balcony door thresholds",
                "Poor interface between window frame and facade substrate",
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
              Window and door perimeter repairs must address all contributing defects as a combined system — flashings, storm angles, sill drainage, sealant and frame condition. Rectifying only one element while leaving others defective will result in ongoing water ingress.
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
                  "Window perimeter sealant replacement systems",
                  "Head flashing, storm angle and sill flashing systems",
                  "Timber window frame repair and replacement systems",
                  "Balcony door hob and threshold waterproofing systems",
                  "Window frame drainage and weephole systems",
                  "Internal reveal and plaster repair systems",
                  "Hose testing and water ingress investigation services",
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
