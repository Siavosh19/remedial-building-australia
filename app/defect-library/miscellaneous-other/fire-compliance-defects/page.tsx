import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Fire Compliance Defects | Remedial Building Australia",
  description: "Technical guide to fire compliance defects in Class 2 buildings — passive fire protection, compartmentation and NCC compliance.",
};

const inspectionItems = [
  "Engage a fire safety engineer to conduct a comprehensive fire safety audit of the building.",
  "Inspect all external cladding panels to confirm fire classification — obtain product documentation and test certificates.",
  "Inspect all penetrations through fire-rated walls and floors for correct fire stopping — visual inspection and destructive probe testing where required.",
  "Test all fire doors for self-closing, latching and compliance with the required fire resistance level.",
  "Confirm the fire detection and suppression system has been serviced within the required period.",
  "Review the current Annual Fire Safety Statement against the current building use and occupancy.",
  "Confirm all essential fire safety measures listed in the Fire Safety Schedule are installed and operational.",
  "Engage a specialist cladding consultant where combustible cladding is suspected.",
];

const methodology = [
  "Immediately engage a fire safety engineer upon identification of fire compliance defects — some defects require urgent interim mitigation.",
  "Report combustible cladding to the relevant state Building Commission or fire authority in accordance with mandatory reporting obligations.",
  "Develop an interim fire safety management plan for any defects that cannot be immediately rectified.",
  "Replace non-compliant cladding with a fire-rated alternative — engage a fire engineer and facade engineer to specify the replacement system.",
  "Fire-stop all penetrations through fire-rated elements using listed and tested fire stopping products appropriate for the penetration type.",
  "Replace all non-compliant fire doors with FRL-compliant doors with listed self-closing devices.",
  "Repair all gaps and breaches in fire-rated walls and slabs using tested and listed fire-rated systems.",
  "Upgrade the fire detection and suppression system to current NCC and BCA requirements as specified by the fire engineer.",
  "Obtain an updated Annual Fire Safety Statement from the certifier after all rectification works are complete.",
  "Record all fire compliance rectification works with fire engineer certification and photographs.",
];

const risks = [
  "Catastrophic risk to life and property in the event of a fire from inadequate compartmentation",
  "Rapid fire spread through combustible cladding systems on multi-storey buildings",
  "Non-compliance with the Environmental Planning and Assessment Act and NCC",
  "Building Commission rectification orders and potential prosecution",
  "Insurance voidance or non-coverage for fire events in non-compliant buildings",
  "Significant financial liability for owners and managers of affected buildings",
  "Mandatory reporting obligations in some states where fire safety defects are identified",
];

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <SiteHeader />
      <main className="px-6 py-20">
        <section className="mx-auto max-w-7xl">
          <a href="/defect-library/miscellaneous-other" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100">← Back to Miscellaneous & Other</a>
          <div className="mt-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Miscellaneous & Other</p>
              <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">Fire Compliance Defects</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">Fire compliance defects in Class 2 buildings encompass failures of both active and passive fire protection systems — including inadequate fire compartmentation, missing or incorrect fire stopping at service penetrations, combustible external cladding, inadequate fire doors and non-compliant fire detection systems. The consequences of fire defects are potentially catastrophic. The Lacrosse fire in Melbourne (2014) and subsequent national cladding audits have elevated fire compliance as the highest-priority safety defect category in Class 2 buildings. Building owners have legal obligations to maintain fire safety systems and must act immediately when defects are identified.</p>
            </div>
          </div>
          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard title="Common Signs" items={["Combustible cladding panels identified on the external facade", "Missing or inadequate fire stopping at service penetrations through fire-rated walls and slabs", "Fire doors that do not self-close, latch or are propped open", "Gaps at the perimeter of fire-rated walls at ceilings or floors", "Missing or damaged intumescent collars at plastic pipe penetrations through fire-rated elements", "Non-compliant or expired fire safety schedule items", "Smoke detectors absent, disabled or not interconnected as required"]} />
            <InfoCard title="Common Causes" items={["Use of combustible aluminium composite panels with polyethylene core on multi-storey buildings", "Service penetrations not fire-stopped after installation by tradespeople", "Fire doors modified, replaced with non-compliant doors or having defective self-closing devices", "Fire-rated walls penetrated and not reinstated to the correct fire rating", "Building works by occupants or contractors without regard for fire compartmentation", "Inspection and certification not conducted after construction or remediation works", "Incorrect specification or installation of fire suppression or detection systems"]} />
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
              <ul className="mt-4 space-y-2">{["Combustible cladding replacement systems", "Service penetration fire stopping systems", "Fire door replacement and hardware systems", "Fire-rated wall and ceiling reinstatement systems", "Fire detection and suppression upgrade systems"].map((item) => (<li key={item} className="flex gap-3 text-base leading-7 text-slate-700"><span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-800" />{item}</li>))}</ul>
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
