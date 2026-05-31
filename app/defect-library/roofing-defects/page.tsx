import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roofing Defects | Remedial Building Australia",
  description:
    "Technical guidance on roofing defects in Class 2 buildings — roof leaks, box gutter failure, flashing failures, poor falls, ponding and overflow issues.",
};

const defects = [
  {
    title: "Roof Leaks",
    description: "Water penetration through the roof covering, membrane or junction details causing damage to the building below.",
    image: "/Images/Categories/roofing-defects.jpg",
    href: "/defect-library/roofing-defects/roof-leaks",
    imagePosition: "object-center",
  },
  {
    title: "Box Gutter Failure",
    description: "Deterioration or blockage of concealed box gutters causing overflow, water ingress and structural damage.",
    image: "/Images/Categories/roofing-defects.jpg",
    href: "/defect-library/roofing-defects/box-gutter-failure",
    imagePosition: "object-center",
  },
  {
    title: "Flashing Failures",
    description: "Failure of roof flashings at ridges, hips, valleys, penetrations and abutments allowing water ingress.",
    image: "/Images/Categories/roofing-defects.jpg",
    href: "/defect-library/roofing-defects/flashing-failures",
    imagePosition: "object-center",
  },
  {
    title: "Poor Falls & Ponding",
    description: "Inadequate roof drainage falls causing water ponding, accelerated membrane degradation and structural loading.",
    image: "/Images/Categories/roofing-defects.jpg",
    href: "/defect-library/roofing-defects/poor-falls-ponding",
    imagePosition: "object-center",
  },
  {
    title: "Overflow Issues",
    description: "Inadequate or blocked overflow provision causing water to back up and breach the building envelope during heavy rain.",
    image: "/Images/Categories/roofing-defects.jpg",
    href: "/defect-library/roofing-defects/overflow-issues",
    imagePosition: "object-center",
  },
];

export default function RoofingDefectsPage() {
  return (
    <div className="min-h-screen bg-slate-100">
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
            <a href="/industry-news" className="whitespace-nowrap hover:text-red-700">Industry News</a>
            <a href="/directory" className="whitespace-nowrap hover:text-red-700">Directory</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700">AI Scope Builder</a>
          
          </nav>
          <a href="/directory/login" className="hidden shrink-0 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800 transition md:inline-flex">Login / Create Account</a>
        </div>
      </header>

      <main className="px-6 py-16">
        <section className="mx-auto max-w-7xl">
          <a href="/defect-library" className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100">
            ← Back to Defect Library
          </a>

          <div className="mt-10 max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Defect Category</p>
            <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">Roofing Defects</h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Technical guidance covering roof leaks, box gutter failure, flashing defects, poor drainage falls and overflow issues commonly found on Class 2 building roofs and podium decks.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {defects.map((defect) => (
              <a key={defect.title} href={defect.href} className="rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
<div className="p-8">
                  <div className="mb-5 h-1.5 w-16 rounded-full bg-red-700" />
                  <h2 className="text-2xl font-bold leading-tight text-sky-950">{defect.title}</h2>
                  <p className="mt-5 text-sm leading-7 text-slate-600">{defect.description}</p>
                  <div className="mt-8 text-sm font-bold text-sky-700 transition hover:text-red-700">Open Defect →</div>
                </div>
              </a>
            ))}
          </div>
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
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
            <a href="/about" className="hover:text-sky-700">About</a>
            <a href="/contact" className="hover:text-sky-700">Contact</a>
            <a href="/terms" className="hover:text-sky-700">Terms</a>
            <a href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</a>
            <a href="/defect-library" className="hover:text-sky-700">Defect Library</a>
            <a href="/repair-systems" className="hover:text-sky-700">Repair Systems</a>
            <a href="/industry-news" className="hover:text-sky-700">Industry News</a>
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
