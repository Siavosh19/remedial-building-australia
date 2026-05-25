import { notFound } from "next/navigation";
import { CONCRETE_DEFECTS_DATA } from "@/lib/concrete-defects-data";
import { ProductCategoryCarousel, TechnicalAccordionClient } from "@/components/repair-systems/ProductCategoryClient";
import { ArrowRight, BookOpen } from "lucide-react";

export function generateStaticParams() {
  const params: { subcategory: string; productCategory: string }[] = [];
  for (const sub of CONCRETE_DEFECTS_DATA) {
    for (const cat of sub.productCategories) {
      params.push({ subcategory: sub.slug, productCategory: cat.slug });
    }
  }
  return params;
}

export function generateMetadata({
  params,
}: {
  params: { subcategory: string; productCategory: string };
}) {
  const sub = CONCRETE_DEFECTS_DATA.find((s) => s.slug === params.subcategory);
  const cat = sub?.productCategories.find((c) => c.slug === params.productCategory);
  if (!sub || !cat) return {};
  return {
    title: `${cat.label} — ${sub.label} — Repair Systems — Remedial Building Australia`,
    description: `Technical reference for ${cat.label.toLowerCase()} — product comparisons, brand equivalents and selection guidance for ${sub.label.toLowerCase()} in Australian remedial building practice.`,
  };
}

export default function ProductCategoryPage({
  params,
}: {
  params: { subcategory: string; productCategory: string };
}) {
  const sub = CONCRETE_DEFECTS_DATA.find((s) => s.slug === params.subcategory);
  if (!sub) notFound();

  const cat = sub.productCategories.find((c) => c.slug === params.productCategory);
  if (!cat) notFound();

  const firstNotes = cat.materials.find((m) => m.notes)?.notes ?? "";
  const firstProductType = cat.materials.find((m) => m.productType)?.productType ?? cat.label;
  const totalBrands = new Set(
    cat.materials.flatMap((m) =>
      ["brandArdex", "brandSika", "brandFosroc", "brandTremco", "brandParchem"].filter(
        (k) => m[k as keyof typeof m]
      )
    )
  ).size;
  const totalCards = cat.materials.reduce(
    (n, m) =>
      n +
      ["brandArdex", "brandSika", "brandFosroc", "brandTremco", "brandParchem"].filter(
        (k) => m[k as keyof typeof m]
      ).length,
    0
  );

  const techInfo = {
    typicalApplications: [
      `${cat.label} for ${sub.label.toLowerCase()} remediation`,
      "Concrete repair and substrate reinstatement",
      "Protection of reinforced concrete elements",
      "Building envelope and structural repair works",
    ],
    selectionCriteria: [
      "Substrate condition and exposure class (AS 3600)",
      "Repair depth and application thickness requirements",
      "Compatibility with existing materials and primers",
      "Structural or non-structural repair requirement",
      "Environmental conditions during application",
    ],
    limitations: [
      "Apply only within manufacturer temperature range (typically 5°C – 35°C)",
      "Adequate substrate preparation is mandatory — minimum CSP must be achieved",
      "Do not use beyond published shelf life",
      "Not a substitute for waterproofing unless specifically rated",
      "Colour match to existing concrete not guaranteed",
    ],
    standardsNotes: [
      "AS 3600 — Concrete Structures: exposure classification and cover requirements",
      "EN 1504 series (adopted in Australian practice) — concrete repair product classification",
      "NCC performance requirements applicable to the building classification",
      "Manufacturer ITP requirements must be observed on site",
    ],
    suitableDefects: [
      sub.label,
      "Concrete spalling and cover loss",
      "Post-breakout substrate reinstatement",
      "Surface profiling and preparation",
    ],
    typicalSubstrates: [
      "In-situ reinforced concrete",
      "Precast concrete panels",
      "Masonry (with appropriate primer)",
      "Previously repaired concrete (confirm compatibility)",
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8 py-5">
          <a href="/" className="flex shrink-0 items-center gap-3">
            <div>
              <div className="text-lg font-extrabold tracking-tight text-sky-950">Remedial Building Australia</div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Technical Remedial Building Platform</div>
            </div>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-sky-800 md:flex">
            <a href="/" className="whitespace-nowrap hover:text-red-700 transition">Home</a>
            <a href="/defect-library" className="whitespace-nowrap hover:text-red-700 transition">Defect Library</a>
            <a href="/repair-systems" className="whitespace-nowrap text-sky-950 underline underline-offset-4 decoration-red-700">Repair Systems</a>
            <a href="/industry-news" className="whitespace-nowrap hover:text-red-700 transition">Industry News</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700 transition">AI Scope Builder</a>
          </nav>
          <a href="/newsletter" className="hidden shrink-0 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800 transition md:inline-flex">Subscribe</a>
        </div>
      </header>

      <main>

        {/* ── Hero ── */}
        <section className="border-b border-slate-200 bg-white px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <a href="/" className="hover:text-sky-700 transition">Home</a>
              <span>/</span>
              <a href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</a>
              <span>/</span>
              <a href={`/repair-systems/${sub.slug}`} className="hover:text-sky-700 transition">{sub.label}</a>
              <span>/</span>
              <span className="text-sky-950">{cat.label}</span>
            </nav>
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">{cat.label}</h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  {firstProductType} — technical reference for {sub.label.toLowerCase()} in Australian remedial building practice. Covers system selection, product comparisons, and brand equivalents.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Products listed",  value: String(totalCards) },
                  { label: "Brands available", value: String(totalBrands) },
                  { label: "Pack size",        value: cat.materials.find((m) => m.packSize)?.packSize ?? "—" },
                  { label: "Unit",             value: cat.materials.find((m) => m.unitOfMeasure)?.unitOfMeasure ?? "—" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl bg-white p-3 text-center border border-slate-100">
                    <div className="text-lg font-extrabold text-sky-950 leading-tight">{s.value}</div>
                    <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Sibling tabs ── */}
        <div className="border-b border-slate-200 bg-white px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end gap-0 overflow-x-auto">
              {sub.productCategories.map((sib) => {
                const active = sib.slug === cat.slug;
                return (
                  <a
                    key={sib.slug}
                    href={`/repair-systems/${sub.slug}/${sib.slug}`}
                    className={`relative shrink-0 border-b-2 px-5 py-4 text-sm font-bold whitespace-nowrap transition ${
                      active ? "border-red-700 text-sky-950" : "border-transparent text-slate-500 hover:text-sky-900"
                    }`}
                  >
                    {sib.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <section className="px-8 py-14">
          <div className="mx-auto max-w-7xl space-y-10">

            {/* What is */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
                  <BookOpen size={15} />
                </div>
                <h3 className="text-base font-extrabold text-sky-950">What is {cat.label.toLowerCase()}?</h3>
              </div>
              <p className="text-sm leading-7 text-slate-600">
                {firstNotes ||
                  `${cat.label} are specialist materials used for ${sub.label.toLowerCase()} repair and remediation in Australian concrete and building practice. Products are selected based on substrate condition, exposure class, and specific repair requirements in accordance with AS 3600 and manufacturer specifications.`}
              </p>
            </div>

            {/* Technical Accordion — client component */}
            <TechnicalAccordionClient techInfo={techInfo} />

            {/* Product Carousel — client component */}
            <div>
              <div className="mb-6 flex items-start justify-between gap-6">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
                  <div>
                    <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
                    <p className="mt-1 text-sm text-slate-500">Use the TDS link for verified specifications before specifying on any project.</p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">{totalCards} products</span>
              </div>
              <ProductCategoryCarousel materials={cat.materials} />
            </div>

            {/* Brand Equivalents */}
            <div>
              <div className="mb-6 flex items-start gap-3">
                <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
                <div>
                  <h2 className="text-2xl font-extrabold text-sky-950">Brand Equivalents</h2>
                  <p className="mt-1 text-sm text-slate-500">Side-by-side view of equivalent products across all major brands.</p>
                </div>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                <table className="min-w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="bg-slate-800 px-5 py-3 text-left font-bold text-white whitespace-nowrap sticky left-0">Material</th>
                      <th className="bg-orange-600 px-4 py-3 text-left font-bold text-white whitespace-nowrap">Ardex</th>
                      <th className="bg-red-600 px-4 py-3 text-left font-bold text-white whitespace-nowrap">Sika</th>
                      <th className="bg-blue-700 px-4 py-3 text-left font-bold text-white whitespace-nowrap">Fosroc</th>
                      <th className="bg-green-700 px-4 py-3 text-left font-bold text-white whitespace-nowrap">Tremco / Other</th>
                      <th className="bg-teal-700 px-4 py-3 text-left font-bold text-white whitespace-nowrap">Parchem / Mapei</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cat.materials.map((m, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                        <td className="sticky left-0 bg-inherit px-5 py-3 font-semibold text-slate-800 border-r border-slate-200 whitespace-nowrap">{m.materialName}</td>
                        {(["brandArdex","brandSika","brandFosroc","brandTremco","brandParchem"] as const).map((k) => (
                          <td key={k} className="px-4 py-3 text-slate-600">
                            {m[k] ? m[k]!.split(/\s[–-]\s/)[0] : <span className="text-slate-300">—</span>}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </section>

        {/* ── Disclaimer ── */}
        <section className="border-t border-slate-200 bg-slate-50 px-8 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Disclaimer</p>
              <p className="text-xs leading-6 text-amber-900">
                Information is general only. Product selection must be confirmed against project requirements, substrate condition, exposure class, manufacturer technical data sheets, NCC requirements, Australian Standards (including AS 3600), and consultant or structural engineer specifications. Do not rely on this reference as a substitute for professional engineering advice.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { href: "/defect-library/concrete-structural-defects", label: "Defect Library", title: "Concrete & Structural Defects", desc: "Identify defect types, causes, and repair pathways before selecting a system." },
                { href: `/repair-systems/${sub.slug}`, label: "Back to Subcategory", title: sub.label, desc: `Browse all product categories for ${sub.label.toLowerCase()}.` },
                { href: "/ai-scope-builder/new", label: "AI Scope Builder", title: "Generate a Scope of Works", desc: "Use the AI Scope Builder to assemble a remedial scope." },
              ].map((card) => (
                <a key={card.href} href={card.href} className="group block h-full rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-sky-200 hover:shadow-md">
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">{card.label}</div>
                  <h4 className="text-sm font-extrabold text-sky-950 leading-snug">{card.title}</h4>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{card.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-bold text-sky-700 group-hover:text-red-700 transition">Open <ArrowRight size={11} /></div>
                </a>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <a href={`/repair-systems/${sub.slug}`} className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200 transition">← {sub.label}</a>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.</p>
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
