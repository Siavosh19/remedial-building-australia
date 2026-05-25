"use client";

import { CONCRETE_DEFECTS_DATA, type MaterialRow } from "@/lib/concrete-defects-data";
import { notFound } from "next/navigation";
import { useState } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ArrowRight, ChevronLeft, ChevronRight, ExternalLink,
  ChevronDown, ChevronUp,
} from "lucide-react";

// ── Brand config ──────────────────────────────────────────────────────────────

const BRANDS = [
  { key: "brandArdex",   label: "Ardex Australia",      tdsUrl: "https://www.ardex.com.au",           color: "bg-orange-100 text-orange-800" },
  { key: "brandSika",    label: "Sika Australia",        tdsUrl: "https://aus.sika.com",               color: "bg-red-100 text-red-800" },
  { key: "brandFosroc",  label: "Fosroc Australia",      tdsUrl: "https://www.fosroc.com/en-au",       color: "bg-blue-100 text-blue-800" },
  { key: "brandTremco",  label: "Tremco / Other",        tdsUrl: "https://www.tremcosealants.com.au",  color: "bg-green-100 text-green-800" },
  { key: "brandParchem", label: "Parchem / Mapei",       tdsUrl: "https://www.parchem.com.au",         color: "bg-teal-100 text-teal-800" },
] as const;

interface ProductCard {
  brand: string;
  brandColor: string;
  productName: string;
  description: string;
  tdsUrl: string;
  packSize: string | null;
  uom: string | null;
  notes: string | null;
}

function buildCards(materials: MaterialRow[]): ProductCard[] {
  const cards: ProductCard[] = [];
  for (const m of materials) {
    for (const b of BRANDS) {
      const val = m[b.key as keyof MaterialRow] as string | null;
      if (!val) continue;
      const parts = val.split(/\s[–-]\s/);
      cards.push({
        brand: b.label,
        brandColor: b.color,
        productName: parts[0].trim(),
        description: parts.slice(1).join(" – ").trim(),
        tdsUrl: b.tdsUrl,
        packSize: m.packSize,
        uom: m.unitOfMeasure,
        notes: m.notes,
      });
    }
  }
  return cards;
}

// ── Carousel ─────────────────────────────────────────────────────────────────

function Carousel({ cards }: { cards: ProductCard[] }) {
  const [idx, setIdx] = useState(0);
  const [expanded, setExpanded] = useState(false);
  if (!cards.length) return <p className="text-sm text-slate-400">No product data available.</p>;
  const card = cards[idx];
  return (
    <div>
      {/* Nav */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setIdx(i => Math.max(0, i - 1))} disabled={idx === 0}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-sky-300 hover:text-sky-950 disabled:cursor-not-allowed disabled:opacity-30">
            <ChevronLeft size={18} />
          </button>
          <span className="text-xs font-bold text-slate-400 tabular-nums">{idx + 1} / {cards.length}</span>
          <button onClick={() => setIdx(i => Math.min(cards.length - 1, i + 1))} disabled={idx === cards.length - 1}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-sky-300 hover:text-sky-950 disabled:cursor-not-allowed disabled:opacity-30">
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="flex items-center gap-1.5">
          {cards.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)}
              className={`h-2 rounded-full transition-all ${i === idx ? "w-6 bg-sky-950" : "w-2 bg-slate-200 hover:bg-slate-300"}`} />
          ))}
        </div>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {/* Header */}
        <div className="border-b border-slate-100 bg-slate-50 px-7 py-4 flex items-center justify-between gap-4">
          <div>
            <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${card.brandColor}`}>{card.brand}</span>
            <h3 className="mt-2 text-xl font-extrabold text-sky-950">{card.productName}</h3>
            {card.description && <p className="mt-1 text-sm text-slate-500">{card.description}</p>}
          </div>
          <a href={card.tdsUrl} target="_blank" rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2 rounded-xl bg-sky-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-sky-800">
            <ExternalLink size={13} /> TDS
          </a>
        </div>

        {/* Specs */}
        <div className="grid gap-4 px-7 py-6 sm:grid-cols-2 lg:grid-cols-3">
          {card.packSize && (
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pack Size</div>
              <div className="mt-1 font-extrabold text-sky-950 font-mono">{card.packSize}</div>
            </div>
          )}
          {card.uom && (
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Unit of Measure</div>
              <div className="mt-1 font-extrabold text-sky-950 font-mono">{card.uom}</div>
            </div>
          )}
        </div>

        {/* Notes */}
        {card.notes && (
          <div className="border-t border-slate-100 px-7 pb-6">
            <button onClick={() => setExpanded(e => !e)}
              className="flex items-center gap-2 py-4 text-xs font-bold text-sky-700 uppercase tracking-wider hover:text-sky-900">
              {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              {expanded ? "Hide" : "Show"} Technical Notes
            </button>
            {expanded && <p className="text-sm leading-7 text-slate-600">{card.notes}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Brand Equivalents Table ───────────────────────────────────────────────────

function BrandTable({ materials }: { materials: MaterialRow[] }) {
  return (
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
          {materials.map((m, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
              <td className="sticky left-0 bg-inherit px-5 py-3 font-semibold text-slate-800 border-r border-slate-200 whitespace-nowrap">{m.materialName}</td>
              {(["brandArdex","brandSika","brandFosroc","brandTremco","brandParchem"] as const).map(k => (
                <td key={k} className="px-4 py-3 text-slate-600">
                  {m[k] ? m[k]!.split(/\s[–-]\s/)[0] : <span className="text-slate-300">—</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── TechCard (accordion content) ─────────────────────────────────────────────

function TechCard({ icon, title, items, style }: { icon: React.ReactNode; title: string; items: string[]; style: "bullet"|"check"|"warn" }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-white">{icon}</div>
        <h3 className="text-sm font-extrabold text-sky-950">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-xs leading-5 text-slate-600">
            {style === "check" && <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-600" />}
            {style === "warn"  && <AlertTriangle size={12} className="mt-0.5 shrink-0 text-amber-500" />}
            {style === "bullet" && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Accordion ────────────────────────────────────────────────────────────────

function TechnicalAccordion({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <button type="button" onClick={() => setOpen(o => !o)}
        className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
        <div>
          <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
          <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable defects and substrates</p>
        </div>
        <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
          {open ? <>Hide detail <ChevronUp size={14} /></> : <>Show detail <ChevronDown size={14} /></>}
        </div>
      </button>
      {open && <div className="border-t border-slate-100 px-7 pb-7 pt-6">{children}</div>}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ProductCategoryPage({
  params,
}: {
  params: { subcategory: string; productCategory: string };
}) {
  const sub = CONCRETE_DEFECTS_DATA.find((s) => s.slug === params.subcategory);
  if (!sub) notFound();
  const cat = sub.productCategories.find((c) => c.slug === params.productCategory);
  if (!cat) notFound();

  const cards = buildCards(cat.materials);
  const brands = new Set(cards.map((c) => c.brand));
  const firstNotes = cat.materials.find((m) => m.notes)?.notes ?? "";
  const firstProductType = cat.materials.find((m) => m.productType)?.productType ?? cat.label;

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
            <nav className="mb-5 flex items-center gap-2 text-xs font-semibold text-slate-400 flex-wrap">
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
                  { label: "Products listed",   value: String(cards.length) },
                  { label: "Brands available",  value: String(brands.size) },
                  { label: "Pack size",         value: cat.materials.find(m=>m.packSize)?.packSize ?? "—" },
                  { label: "Unit",              value: cat.materials.find(m=>m.unitOfMeasure)?.unitOfMeasure ?? "—" },
                ].map(s => (
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
                  <a key={sib.slug} href={`/repair-systems/${sub.slug}/${sib.slug}`}
                    className={`relative shrink-0 border-b-2 px-5 py-4 text-sm font-bold whitespace-nowrap transition ${
                      active ? "border-red-700 text-sky-950" : "border-transparent text-slate-500 hover:text-sky-900"
                    }`}>
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
                {firstNotes || `${cat.label} are specialist materials used for ${sub.label.toLowerCase()} repair and remediation in Australian concrete and building practice. Products are selected based on substrate condition, exposure class, and specific repair requirements in accordance with AS 3600 and manufacturer specifications.`}
              </p>
            </div>

            {/* Technical Accordion */}
            <TechnicalAccordion>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                <TechCard icon={<Layers size={15}/>}       title="Typical Applications"      items={techInfo.typicalApplications}  style="bullet" />
                <TechCard icon={<Ruler size={15}/>}        title="Selection Criteria"         items={techInfo.selectionCriteria}    style="check" />
                <TechCard icon={<AlertTriangle size={15}/>} title="Limitations"              items={techInfo.limitations}          style="warn" />
                <TechCard icon={<BookOpen size={15}/>}     title="Standards &amp; Testing"   items={techInfo.standardsNotes}       style="bullet" />
                <TechCard icon={<CheckCircle size={15}/>}  title="Suitable Defects"          items={techInfo.suitableDefects}      style="check" />
                <TechCard icon={<SquareStack size={15}/>}  title="Typical Substrates"        items={techInfo.typicalSubstrates}    style="bullet" />
              </div>
            </TechnicalAccordion>

            {/* Product Carousel */}
            <div>
              <div className="mb-6 flex items-start justify-between gap-6">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
                  <div>
                    <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
                    <p className="mt-1 text-sm text-slate-500">Use the TDS link for verified specifications before specifying on any project.</p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">{cards.length} products</span>
              </div>
              <Carousel cards={cards} />
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
              <BrandTable materials={cat.materials} />
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
              <NextCard href="/defect-library/concrete-structural-defects" label="Defect Library" title="Concrete &amp; Structural Defects" desc="Identify defect types, causes, and repair pathways before selecting a system." />
              <NextCard href={`/repair-systems/${sub.slug}`} label="Back to Subcategory" title={sub.label} desc={`Browse all product categories for ${sub.label.toLowerCase()}.`} />
              <NextCard href="/ai-scope-builder/new" label="AI Scope Builder" title="Generate a Scope of Works" desc="Use the AI Scope Builder to assemble a remedial scope." />
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

function NextCard({ href, label, title, desc }: { href: string; label: string; title: string; desc: string }) {
  return (
    <a href={href} className="group block h-full rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-sky-200 hover:shadow-md">
      <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">{label}</div>
      <h4 className="text-sm font-extrabold text-sky-950 leading-snug" dangerouslySetInnerHTML={{ __html: title }} />
      <p className="mt-2 text-xs leading-5 text-slate-500">{desc}</p>
      <div className="mt-4 flex items-center gap-1 text-xs font-bold text-sky-700 group-hover:text-red-700 transition">Open <ArrowRight size={11} /></div>
    </a>
  );
}
