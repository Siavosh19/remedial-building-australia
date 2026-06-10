import rawData from "@/lib/materials-index-data.json";
import MaterialsIndexClient, {
  type ProductRow,
  type DropdownOptions,
} from "./MaterialsIndexClient";

export const metadata = {
  title: "Materials & Products Index — Remedial Building Australia",
  description:
    "Searchable index of all materials and products listed across the repair system pages — search and filter by brand, material type, application and repair system page.",
};

export default function MaterialsProductsIndexPage() {
  const { dropdowns, products } = rawData as {
    meta: Record<string, unknown>;
    dropdowns: DropdownOptions;
    products: ProductRow[];
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8 py-5">
          <a href="/" className="flex shrink-0 items-center gap-3">
            <div>
              <div className="text-lg font-extrabold tracking-tight text-sky-950">
                Remedial Building Australia
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Technical Remedial Building Platform
              </div>
            </div>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-sky-800 md:flex">
            <a href="/" className="whitespace-nowrap hover:text-red-700 transition">Home</a>
            <a href="/repair-systems" className="whitespace-nowrap hover:text-red-700 transition">Repair Systems</a>
            <a href="/industry-news" className="whitespace-nowrap hover:text-red-700 transition">Industry News</a>
            <a href="/directory" className="whitespace-nowrap hover:text-red-700 transition">Directory</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700 transition">AI Scope Builder</a>
          </nav>
          <a
            href="/directory/login"
            className="hidden shrink-0 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800 transition md:inline-flex"
          >
            Login / Create Account
          </a>
        </div>
      </header>

      <main>

        {/* ── Hero ── */}
        <section className="border-b border-slate-200 bg-white px-8 py-14">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex items-center gap-2 text-xs font-semibold text-slate-400">
              <a href="/" className="hover:text-sky-700 transition">Home</a>
              <span>/</span>
              <span className="text-sky-950">Materials &amp; Products Index</span>
            </nav>

            <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">
              Materials &amp; Products Index
            </p>
            <h1 className="mt-3 max-w-4xl text-5xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-6xl">
              Materials &amp; Products Index
            </h1>
            <div className="mt-5 max-w-3xl space-y-1 text-base leading-7 text-slate-600">
              <p>
                Search products and materials used across existing repair system pages, grouped by brand,
                material type, application, and linked repair system.
              </p>
              <p>
                All data is drawn directly from existing repair system pages. Click any Repair System Page
                link to view full technical specifications and product details.
              </p>
            </div>
          </div>
        </section>

        {/* ── Notice bar ── */}
        <div className="border-b border-slate-200 bg-slate-100 px-8 py-3.5">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs text-slate-600">
              <span className="font-semibold text-slate-700">Index only.</span>{" "}
              We use brand names, product names, material type, applications and repair system page links to
              help you find relevant information. No product photos are included. Click the Repair System Page
              link on any row to access full technical details, system descriptions and procurement guidance.
            </p>
          </div>
        </div>

        {/* ── Interactive table ── */}
        <MaterialsIndexClient products={products} dropdowns={dropdowns} />

      </main>

      {/* ── Footer ── */}
      <footer className="mt-10 border-t border-slate-200 bg-white px-8 py-10">
        <div className="mx-auto max-w-7xl flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-extrabold text-sky-950">Remedial Building Australia</div>
            <div className="mt-1 text-xs text-slate-400">
              &copy; {new Date().getFullYear()} Arasep Projects Pty Ltd ABN 20 675 874 003. All rights reserved.
            </div>
          </div>
          <nav className="flex flex-wrap gap-5 text-xs font-semibold text-slate-500">
            <a href="/terms" className="hover:text-sky-700 transition">Terms &amp; Conditions</a>
            <a href="/privacy-policy" className="hover:text-sky-700 transition">Privacy Policy</a>
            <a href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</a>
            <a href="/defect-library" className="hover:text-sky-700 transition">Defect Library</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
