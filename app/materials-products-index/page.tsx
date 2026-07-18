import rawData from "@/lib/materials-index-data.json";
import Link from "next/link";
import MaterialsIndexClient, {
  type ProductRow,
  type DropdownOptions,
} from "./MaterialsIndexClient";

import SiteHeader from "@/components/SiteHeader";
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
      <SiteHeader />

      <main>

        {/* ── Hero ── */}
        <section className="border-b border-slate-200 bg-white px-8 py-14">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex items-center gap-2 text-xs font-semibold text-slate-400">
              <Link href="/" className="hover:text-sky-700 transition">Home</Link>
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
            <Link href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</Link>
            <Link href="/defect-library" className="hover:text-sky-700 transition">Defect Library</Link>
            <Link href="/advertise" className="hover:text-sky-700 transition">Advertise With Us</Link>
            <Link href="/terms" className="hover:text-sky-700 transition">Terms &amp; Conditions</Link>
            <Link href="/privacy-policy" className="hover:text-sky-700 transition">Privacy Policy</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
