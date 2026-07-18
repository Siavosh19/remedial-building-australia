import type { Metadata } from "next";
import Link from "next/link";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Crack Injection Failures | Remedial Building Australia",
  description: "Technical guide to failed crack injection repairs in basement structures — causes, reassessment and re-injection methodology.",
};

const inspectionItems = [
  "Inspect all previously injected cracks for recurrence of moisture, staining and efflorescence.",
  "Tap the injected zone to assess whether the resin has fully consolidated within the crack.",
  "Check whether cracks are still active by installing tell-tales before committing to re-injection.",
  "Assess the crack width and depth — measure at the face and probe depth where possible.",
  "Confirm whether water is active (flowing) or passive (seeping) in the crack — different products apply to each.",
  "Review previous injection contractor records to determine the product used and ports spaced.",
  "Engage a specialist waterproofing engineer to confirm the re-injection specification and product selection.",
  "Assess whether the structural cause of cracking has been addressed — re-injection without structural stabilisation will fail again.",
];

const methodology = [
  "Confirm the crack is dormant or arrest active movement before re-injection.",
  "Remove all previous injection ports and resin residue from the crack face.",
  "Clean the crack face with high-pressure air to remove all contamination.",
  "For active wet cracks — use a hydrophilic polyurethane resin that reacts with and expands in the presence of water.",
  "For dormant dry cracks — use a low-viscosity epoxy resin to structurally rebond the crack faces.",
  "Space injection ports at maximum 100 mm centres for fine cracks, 150 mm for wider cracks.",
  "Inject from the lowest port upward, moving to the next port only when resin appears at the adjacent port.",
  "Maintain injection pressure until the resin has fully saturated the crack before capping the port.",
  "Allow the resin to cure for the full manufacturer-specified time before water testing the repair.",
  "Apply a crystalline waterproofing coating to the repaired zone as a secondary measure.",
  "Monitor the repaired crack over 4 weeks before confirming success.",
];

const risks = [
  "Ongoing water ingress at failed injection locations causing building damage",
  "Water finding new pathways through adjacent cracks and construction joints",
  "Ongoing corrosion of basement reinforcement from chronic moisture",
  "Increasing cost of re-repair with each failed injection cycle",
  "Structural capacity concern where cracks are in load-bearing basement walls",
  "Owner corporation frustration from recurrent failed repairs without root cause resolution",
  "Escalation to more invasive and expensive cavity drain or external waterproofing solutions",
];

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <SiteHeader />
      <main className="px-6 py-20">
        <section className="mx-auto max-w-7xl">
          <Link href="/defect-library/basements-substructure" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100">← Back to Basements & Substructure</Link>
          <div className="mt-10">
            <div>
              <PageNav />
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Basements & Substructure</p>
              <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-sky-950">Crack Injection Failures</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">Crack injection — using epoxy resin or polyurethane foam — is the primary repair method for water-bearing cracks in basement concrete walls and slabs. When correctly executed, injection creates a watertight seal within the crack. When it fails, water reappears at the same crack or at adjacent locations as the water finds new paths. Injection failures arise from incorrect product selection, insufficient injection pressure, active water in the crack washing out the resin before cure, or structural movement reopening the crack after injection. Understanding the failure mode is essential to selecting the correct re-injection or alternative approach.</p>
            </div>
          </div>
          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard title="Common Signs" items={["Water reappearing at a previously injected crack location", "Injection ports still visible from a previous repair", "Hollow sound when the injected crack zone is tapped — indicating incomplete fill", "Water appearing adjacent to the injected zone — indicating the crack has propagated", "Damp staining or efflorescence at injection port locations", "Cracking visible in the hardened epoxy at the crack face", "Failed polyurethane foam visible at the surface — compressed or washed out"]} />
            <InfoCard title="Common Causes" items={["Epoxy injected into an active (still wet) crack — water washes resin from the crack before cure", "Injection pressure insufficient to fill the full depth and width of the crack", "Crack still actively moving after injection — reopens the sealed zone", "Wrong product selected — low-viscosity epoxy for a wide crack does not fill the crack profile", "Ports spaced too far apart — crack not fully saturated with resin", "Crack faces contaminated with oil, release agent or old sealant preventing resin adhesion", "Polyurethane foam over-expanded and pushed out of the crack rather than consolidating within it"]} />
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
          <div className="mt-6">
            <Link href="/ai-scope-builder" className="inline-flex rounded-xl bg-sky-900 px-5 py-3 text-base font-semibold text-white hover:bg-sky-800">
              Start Inspection Checklist
            </Link>
            <p className="mt-2 text-sm text-slate-500">Create a project inspection record, add defect locations, upload photos, and save notes for scope writing.</p>
          </div>
          <section className="mt-16 rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-sky-950">Typical Repair Methodology</h2>
<ol className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-7 py-6">
              {methodology.map((step, index) => (<li key={step} className="flex gap-4 text-base leading-8 text-slate-800" style={{ marginBottom: index < methodology.length - 1 ? "3mm" : 0 }}><span className="mt-1 shrink-0 text-sm font-bold text-slate-500">{String(index + 1).padStart(2, "0")}.</span><span>{step}</span></li>))}
            </ol>
          </section>
          <section className="mt-16">
            <Link href="/repair-systems" className="block rounded-3xl border border-slate-200 bg-white p-8 text-sky-950 shadow-md transition hover:shadow-xl">
              <h3 className="text-2xl font-bold">Related Repair Systems</h3>
              <ul className="mt-4 space-y-2">{["Polyurethane hydrophilic injection systems", "Epoxy resin structural crack injection systems", "Crystalline waterproofing coating systems", "Crack monitoring and tell-tale systems", "Waterproofing engineer assessment services"].map((item) => (<li key={item} className="flex gap-3 text-base leading-7 text-slate-700"><span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-800" />{item}</li>))}</ul>
              <div className="mt-6 font-bold text-red-700">Open Repair Systems →</div>
            </Link>
          </section>
        </section>
      </main>
      <SeoCrossPromo />

      <footer className="border-t border-sky-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-12"><Link href="/" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200">← Home</Link></div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div><div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div><p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">A structured Australian remedial building knowledge platform for defects, repair systems, materials and future AI-assisted scope writing.</p></div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
            <div className="flex flex-col gap-2">
              <Link href="/directory" className="hover:text-sky-700">Business Directory</Link>
              <Link href="/repair-systems" className="hover:text-sky-700">Repair Systems</Link>
              <Link href="/defect-library" className="hover:text-sky-700">Defect Library</Link>
              <Link href="/industry-news" className="hover:text-sky-700">News &amp; Insights</Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/advertise" className="hover:text-sky-700">Advertise With Us</Link>
              <Link href="/contact" className="hover:text-sky-700">Contact</Link>
              <Link href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-sky-700">Terms</Link>
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
        {items.map((item) => (<li key={item} className="flex gap-3 text-base leading-8 text-slate-800"><span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-red-700" />{item}</li>))}
      </ul>
    </div>
  );
}
