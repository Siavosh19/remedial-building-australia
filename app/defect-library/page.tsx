const categoryData = [
  {
    title: "Concrete & Structural Defects",
    image: "/Images/Categories/concrete-structural-defects.jpg",
    href: "/defect-library/concrete-structural-defects",
  },
  {
    title: "Waterproofing & Water Ingress",
    image: "/Images/Categories/waterproofing-water-ingress.jpg",
    href: "/defect-library/waterproofing-water-ingress",
  },
  {
    title: "Façade & External Envelope",
    image: "/Images/Categories/facade-external-envelope.jpg",
    href: "/defect-library/facade-external-envelope",
  },
  {
    title: "Roofing Defects",
    image: "/Images/Categories/roofing-defects.jpg",
    href: "/defect-library/roofing-defects",
  },
  {
    title: "Balconies & Podiums",
    image: "/Images/Categories/balconies-podiums.jpg",
    href: "/defect-library/balconies-podiums",
  },
  {
    title: "Internal Defects & Finishes",
    image: "/Images/Categories/internal-defects-finishes.jpg",
    href: "/defect-library/internal-defects-finishes",
  },
  {
    title: "Services & Drainage",
    image: "/Images/Categories/services-drainage.jpg",
    href: "/defect-library/services-drainage",
  },
  {
    title: "Basements & Substructure",
    image: "/Images/Categories/basements-substructure.jpg",
    href: "/defect-library/basements-substructure",
  },
  {
    title: "Miscellaneous / Other",
    image: "/Images/Categories/miscellaneous-other.jpg",
    href: "/defect-library/miscellaneous-other",
  },
];

export default function DefectLibraryPage() {
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
            <a
              href="/newsletter"
              className="whitespace-nowrap rounded-lg bg-red-700 px-4 py-2 text-sm text-white hover:bg-red-800 transition"
            >
              Subscribe
            </a>
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
          <div className="max-w-5xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">
              Defect Library
            </p>

            <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950 md:text-6xl">
              Browse remedial building defects by category
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Structured technical database for waterproofing failures, façade
              deterioration, concrete spalling, roofing defects, balconies,
              drainage systems and remedial repair pathways for Class 2 buildings.
            </p>
          </div>

          <div className="mt-10">
            <input
              className="w-full rounded-3xl border border-slate-200 bg-white p-5 text-base shadow-sm outline-none transition focus:border-sky-700"
              placeholder="Search defects, repair systems, water ingress, concrete spalling..."
            />
          </div>

          <div className="mt-16 grid items-start gap-8 md:grid-cols-2 xl:grid-cols-3">
            {categoryData.map((category) => (
              <a
                href={category.href}
                key={category.title}
                className="block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-64 w-full object-cover"
                />

                <div className="p-8">
                  <div className="mb-5 h-1.5 w-16 rounded-full bg-red-700" />

                  <h2 className="text-2xl font-bold leading-tight text-sky-950">
                    {category.title}
                  </h2>

                  <p className="mt-5 text-sm leading-7 text-slate-600">
                    Browse defects, inspection methods, causes of failure,
                    associated risks and compliant remedial repair pathways.
                  </p>

                  <div className="mt-8 w-full rounded-2xl bg-sky-900 px-5 py-4 text-center text-sm font-semibold text-white transition hover:bg-sky-800">
                    Open Category
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
