const defects = [
  {
    title: "Concrete Spalling",
    description:
      "Concrete deterioration caused by reinforcement corrosion, moisture ingress and concrete delamination.",
    image:
      "/Images/Categories/concrete-structural-defects/concrete-spalling.jpg",
    href: "/defect-library/concrete-structural-defects/concrete-spalling",
    imagePosition: "object-center object-[center_30%]",
  },
  {
    title: "Reinforcement Corrosion",
    description:
      "Corrosion of embedded steel reinforcement resulting from carbonation, chloride ingress and moisture exposure.",
    image:
      "/Images/Categories/concrete-structural-defects/reinforcement-corrosion.jpg",
    href:
      "/defect-library/concrete-structural-defects/reinforcement-corrosion",
    imagePosition: "object-center",
  },
  {
    title: "Concrete Cracking",
    description:
      "Structural and non-structural cracking caused by movement, shrinkage, loading and deterioration.",
    image:
      "/Images/Categories/concrete-structural-defects/concrete-cracking.jpg",
    href: "/defect-library/concrete-structural-defects/concrete-cracking",
    imagePosition: "object-center",
  },
  {
    title: "Magnesite Flooring Deterioration",
    description:
      "Deterioration of magnesite flooring systems causing moisture issues, corrosion and substrate damage.",
    image:
      "/Images/Categories/concrete-structural-defects/magnesite-flooring-deterioration.jpg",
    href:
      "/defect-library/concrete-structural-defects/magnesite-flooring-deterioration",
    imagePosition: "object-center",
  },
  {
    title: "Settlement Cracks",
    description:
      "Structural cracking caused by differential foundation movement, soil changes and inadequate footing design.",
    image: "/Images/Categories/concrete-structural-defects.jpg",
    href: "/defect-library/concrete-structural-defects/settlement-cracks",
    imagePosition: "object-center",
  },
  {
    title: "Slab Edge Deterioration",
    description:
      "Progressive concrete breakdown at exposed slab perimeters from carbonation, corrosion and moisture exposure.",
    image: "/Images/Categories/concrete-structural-defects.jpg",
    href: "/defect-library/concrete-structural-defects/slab-edge-deterioration",
    imagePosition: "object-center",
  },
];

export default function ConcreteStructuralDefectsPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8 py-5">
          <a href="/" className="flex shrink-0 items-center gap-3">
            <div>
              <div className="text-lg font-extrabold tracking-tight text-sky-950">
                Remedial Building Australia
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-900">
                Technical Remedial Building Platform
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-sky-800 md:flex">
            <a href="/" className="whitespace-nowrap hover:text-red-700 transition">Home</a>
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

      <main className="px-6 py-16">
        <section className="mx-auto max-w-7xl">
          <a
            href="/defect-library"
            className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
          >
            ← Back to Defect Library
          </a>

          <div className="mt-10 max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">
              Defect Category
            </p>

            <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">
              Concrete & Structural Defects
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Technical guidance covering concrete deterioration,
              reinforcement corrosion, cracking mechanisms and structural
              remedial issues commonly found in Class 2 buildings.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {defects.map((defect) => (
              <a
                key={defect.title}
                href={defect.href}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <img
                  src={defect.image}
                  alt={defect.title}
                  className={`h-64 w-full object-cover ${defect.imagePosition}`}
                />

                <div className="p-8">
                  <div className="mb-5 h-1.5 w-16 rounded-full bg-red-700" />

                  <h2 className="text-2xl font-bold leading-tight text-sky-950">
                    {defect.title}
                  </h2>

                  <p className="mt-5 text-sm leading-7 text-slate-600">
                    {defect.description}
                  </p>

                  <div className="mt-8 text-sm font-bold text-sky-700 transition hover:text-red-700">
                    Open Defect →
                  </div>
                </div>
              </a>
            ))}
          </div>

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
            <a href="/about" className="underline hover:text-sky-700">About</a>
            <a href="/terms" className="underline hover:text-sky-700">Terms</a>
            <a href="/contact" className="underline hover:text-sky-700">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
