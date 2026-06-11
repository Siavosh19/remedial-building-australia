import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ceiling Water Damage | Remedial Building Australia",
  description: "Technical guide to ceiling water damage in Class 2 buildings — causes, inspection and repair methodology.",
};

const inspectionItems = [
  "Identify the source of water ingress before undertaking any internal repair — inspect above the damaged area.",
  "Assess the extent of ceiling saturation by tapping and probing the affected area.",
  "Check for active wet insulation in the ceiling cavity — saturated insulation must be removed and replaced.",
  "Inspect the ceiling framing for moisture content, staining and early decay.",
  "Assess all electrical fittings within the affected zone — isolate power to the area if moisture is present near fittings.",
  "Moisture-meter the ceiling substrate and framing to quantify drying requirements.",
  "Inspect the unit above for the source — bathroom, laundry, balcony, kitchen or roof.",
  "Allow sufficient drying time before plastering — typically a minimum of 4 weeks after source rectification.",
];

const methodology = [
  "Identify and rectify the source of water ingress before commencing internal repairs.",
  "Remove all water-damaged insulation from the ceiling cavity and replace after drying.",
  "Allow the ceiling framing and substrate to dry to below 15% moisture content before repair.",
  "Remove all damaged plasterboard, fibrous plaster or wet ceiling panels from the affected area.",
  "Inspect and treat all ceiling framing for mould with a biocidal treatment before re-lining.",
  "Replace damaged framing members where decay has occurred.",
  "Re-line the ceiling with new plasterboard or fibrous plaster sheet to match the existing.",
  "Set and coat all joints, fixings and repaired areas to a smooth paintable finish.",
  "Prime and paint the repaired ceiling areas with a mould-resistant paint system.",
  "Reinstate all cornices, mouldings and light fittings disturbed during repair.",
  "Record all repairs with photographs and source rectification documentation.",
];

const risks = [
  "Structural collapse of water-saturated ceiling panels",
  "Electrical short circuit and fire hazard from water near fittings",
  "Mould growth causing health risks for occupants",
  "Structural damage to ceiling framing from prolonged saturation",
  "Strata liability for consequential damage if the ingress source is common property",
  "Significant remediation cost if the source is not identified and addressed before internal reinstatement",
  "Recurring damage if internal repairs are completed before the source is resolved",
];

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8 py-5">
          <a href="/" className="flex shrink-0 items-center gap-3"><div><div className="text-lg font-extrabold tracking-tight text-sky-950">Remedial Building Australia</div><div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-900">Technical Remedial Building Platform</div></div></a>
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
          <a href="/defect-library/internal-defects-finishes" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100">← Back to Internal Defects & Finishes</a>
          <div className="mt-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Internal Defects & Finishes</p>
              <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">Ceiling Water Damage</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">Ceiling water damage in Class 2 buildings is a consequence of water ingress from above — whether from a failed balcony waterproofing membrane, a leaking roof, a burst pipe, an overflowing planter box, or condensation in the ceiling cavity. Staining, sagging and collapse of plasterboard or fibrous plaster ceilings are the most visible manifestations, but the structural and health risks from prolonged saturation — including mould growth, framing rot and electrical hazards — are the more significant concerns that must be addressed as part of any ceiling repair.</p>
            </div>
          </div>
          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard title="Common Signs" items={["Brown or yellow water staining on the ceiling surface", "Sagging or bowing plasterboard or plaster ceiling panels", "Paint blistering and peeling on the ceiling", "Active dripping of water from the ceiling during or after rain", "Mould growth on the ceiling surface or in the ceiling cavity", "Cracking of the ceiling at saturation zones", "Damage to cornice and plaster mouldings from water tracking"]} />
            <InfoCard title="Common Causes" items={["Failed balcony or roof waterproofing membrane above", "Leaking water or drainage services in the ceiling cavity", "Overflow from a blocked drain, planter box or air-conditioning tray", "Condensation from uninsulated cold water pipes or inadequate ceiling ventilation", "Storm water ingress through the roof covering or flashing failures", "Leaking wet areas (bathroom, laundry) in the unit above", "Failed slab waterproofing at pool or podium deck above"]} />
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
            <a href="/ai-scope-builder" className="inline-flex rounded-xl bg-sky-900 px-5 py-3 text-base font-semibold text-white hover:bg-sky-800">
              Start Inspection Checklist
            </a>
            <p className="mt-2 text-sm text-slate-500">Create a project inspection record, add defect locations, upload photos, and save notes for scope writing.</p>
          </div>
          <section className="mt-16 rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-sky-950">Typical Repair Methodology</h2>
<ol className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-7 py-6">
              {methodology.map((step, index) => (<li key={step} className="flex gap-4 text-base leading-8 text-slate-800" style={{ marginBottom: index < methodology.length - 1 ? "3mm" : 0 }}><span className="mt-1 shrink-0 text-sm font-bold text-slate-500">{String(index + 1).padStart(2, "0")}.</span><span>{step}</span></li>))}
            </ol>
          </section>
          <section className="mt-16">
            <a href="/repair-systems" className="block rounded-3xl border border-slate-200 bg-white p-8 text-sky-950 shadow-md transition hover:shadow-xl">
              <h3 className="text-2xl font-bold">Related Repair Systems</h3>
              <ul className="mt-4 space-y-2">{["Ceiling replacement and re-lining systems", "Plasterboard and fibrous plaster repair systems", "Ceiling framing and substrate repair systems", "Mould treatment and remediation systems", "Moisture monitoring and drying services"].map((item) => (<li key={item} className="flex gap-3 text-base leading-7 text-slate-700"><span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-800" />{item}</li>))}</ul>
              <div className="mt-6 font-bold text-red-700">Open Repair Systems →</div>
            </a>
          </section>
        </section>
      </main>
      <footer className="border-t border-sky-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-12"><a href="/" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200">← Home</a></div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div><div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div><p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">A structured Australian remedial building knowledge platform for defects, repair systems, materials and future AI-assisted scope writing.</p></div>
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
        {items.map((item) => (<li key={item} className="flex gap-3 text-base leading-8 text-slate-800"><span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-red-700" />{item}</li>))}
      </ul>
    </div>
  );
}
