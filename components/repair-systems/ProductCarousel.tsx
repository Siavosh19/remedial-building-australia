"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Package,
  Store,
} from "lucide-react";
import type { RepairMortarProduct } from "@/lib/repair-systems-data";

interface Props {
  products: RepairMortarProduct[];
}

export function ProductCarousel({ products }: Props) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(products.length - 1, i + 1));

  const product = products[index];
  if (!product) return null;

  return (
    <div>
      {/* ── Navigation header ── */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            disabled={index === 0}
            aria-label="Previous product"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-sky-300 hover:text-sky-950 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-xs font-bold text-slate-400 tabular-nums">
            {index + 1} / {products.length}
          </span>
          <button
            onClick={next}
            disabled={index === products.length - 1}
            aria-label="Next product"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-sky-300 hover:text-sky-950 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center gap-1.5">
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to product ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-sky-950" : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Product card ── */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">

        {/* Top bar: image + identity */}
        <div className="grid md:grid-cols-[280px_1fr]">

          {/* Image area */}
          <div className="flex flex-col items-center justify-center border-b border-slate-100 bg-slate-50 px-8 py-10 md:border-b-0 md:border-r">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-48 w-full object-contain"
              />
            ) : (
              <div className="flex h-48 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 text-center text-xs text-slate-400">
                <Package size={28} className="mb-2 text-slate-300" />
                <span className="font-semibold">Product image</span>
                <span className="mt-1 max-w-[160px] leading-5">
                  {product.imageNote ?? "Image to be added manually."}
                </span>
              </div>
            )}
          </div>

          {/* Identity + quick facts */}
          <div className="px-7 py-7">
            <div className="mb-1 text-[11px] font-bold uppercase tracking-widest text-red-700">
              {product.manufacturer}
            </div>
            <h3 className="text-2xl font-extrabold leading-tight text-sky-950">
              {product.name}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              <span className="font-semibold text-sky-950">Best for:</span>{" "}
              {product.bestFor}
            </p>

            {/* Quick spec pills */}
            <div className="mt-4 flex flex-wrap gap-2">
              <SpecPill label="Repair depth" value={`${product.specs.repairDepthMm.min}–${product.specs.repairDepthMm.max} mm`} />
              <SpecPill label="Bag size" value={`${product.bagSizeKg} kg`} />
              <SpecPill label="Compressive strength" value={product.specs.compressiveStrengthMPa} />
              <SpecPill label="Marine" value={product.specs.marineSuitable ? "Suitable" : "Not specified"} highlight={product.specs.marineSuitable} />
            </div>

            {/* Document links */}
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={product.tdsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-sky-200 bg-sky-50 px-4 py-2 text-xs font-bold text-sky-800 transition hover:bg-sky-100"
              >
                <FileText size={13} /> Technical Data Sheet
                <ExternalLink size={10} className="opacity-60" />
              </a>
              {product.sdsUrl && (
                <a
                  href={product.sdsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
                >
                  <ShieldCheck size={13} /> Safety Data Sheet
                  <ExternalLink size={10} className="opacity-60" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-100" />

        {/* Body: three-column grid */}
        <div className="grid gap-0 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">

          {/* Column 1: Applications + Coverage */}
          <div className="px-6 py-6">
            <SectionLabel>Typical Applications</SectionLabel>
            <ul className="mt-3 space-y-1.5">
              {product.applications.map((app) => (
                <li key={app} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
                  {app}
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <SectionLabel>Coverage Rate</SectionLabel>
              <p className="mt-1.5 text-xs leading-5 text-slate-600">{product.coverageRate}</p>
            </div>
          </div>

          {/* Column 2: Advantages + Limitations */}
          <div className="px-6 py-6">
            <SectionLabel>Advantages</SectionLabel>
            <ul className="mt-3 space-y-1.5">
              {product.advantages.map((a) => (
                <li key={a} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
                  <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-600" />
                  {a}
                </li>
              ))}
            </ul>

            <div className="mt-5">
              <SectionLabel>Limitations</SectionLabel>
              <ul className="mt-3 space-y-1.5">
                {product.limitations.map((l) => (
                  <li key={l} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
                    <XCircle size={12} className="mt-0.5 shrink-0 text-red-500" />
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: Technical specs + Retailers + Price */}
          <div className="px-6 py-6">
            <SectionLabel>Technical Specifications</SectionLabel>
            <div className="mt-3 space-y-2">
              <SpecRow label="Repair depth" value={`${product.specs.repairDepthMm.min}–${product.specs.repairDepthMm.max} mm${product.specs.repairDepthMm.perLift ? ` (${product.specs.repairDepthMm.perLift} mm/lift)` : ""}`} />
              <SpecRow label="Exposure classes" value={product.specs.exposureClasses.join(", ")} />
              <SpecRow label="Compressive strength" value={product.specs.compressiveStrengthMPa} />
              <SpecRow label="Bond strength" value={product.specs.bondStrengthMPa} />
              <SpecRow label="Shrinkage" value={product.specs.shrinkage} />
              <SpecRow label="Chloride resistance" value={product.specs.chlorideResistance} />
              <SpecRow label="Primer required" value={product.specs.primerRequired} />
              <SpecRow
                label="Marine suitable"
                value={product.specs.marineSuitable ? "Yes" : "Not specified"}
              />
            </div>

            <div className="mt-5">
              <SectionLabel>Indicative Price</SectionLabel>
              <p className="mt-1.5 text-sm font-bold text-sky-950">{product.priceRange}</p>
              <p className="mt-0.5 text-[10px] leading-4 text-slate-400">{product.priceNote}</p>
            </div>

            <div className="mt-5">
              <SectionLabel>Manufacturer / Supplier</SectionLabel>
              <div className="mt-2 space-y-1.5">
                {product.suppliers.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-semibold text-sky-950 hover:text-red-700 transition"
                  >
                    <ExternalLink size={11} className="shrink-0 text-sky-400" />
                    {s.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <SectionLabel>Buy Online — Retailers</SectionLabel>
              <div className="mt-2 space-y-1.5">
                {product.retailers.map((r) => (
                  <a
                    key={r.name}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-semibold text-sky-700 hover:text-red-700 transition"
                  >
                    <Store size={11} className="shrink-0" />
                    {r.name}
                    <ExternalLink size={9} className="opacity-50" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Standards + Notes footer */}
        <div className="border-t border-slate-100 bg-slate-50 px-6 py-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Standards &amp; Notes
          </p>
          <p className="text-xs leading-5 text-slate-500">{product.standardsNotes}</p>
          {product.notes && (
            <p className="mt-2 text-[11px] leading-5 text-slate-400 italic">{product.notes}</p>
          )}
        </div>
      </div>

      {/* Desktop preview strip for other products */}
      {products.length > 1 && (
        <div className="mt-5 hidden gap-3 md:grid md:grid-cols-3">
          {products.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setIndex(i)}
              className={`rounded-xl border p-4 text-left transition ${
                i === index
                  ? "border-sky-950 bg-sky-950 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-sky-300"
              }`}
            >
              <div className={`mb-1 text-[10px] font-bold uppercase tracking-wider ${i === index ? "text-sky-300" : "text-red-700"}`}>
                {p.manufacturer}
              </div>
              <div className={`text-sm font-extrabold leading-tight ${i === index ? "text-white" : "text-sky-950"}`}>
                {p.name}
              </div>
              <div className={`mt-1 text-[11px] ${i === index ? "text-sky-200" : "text-slate-400"}`}>
                {p.specs.repairDepthMm.min}–{p.specs.repairDepthMm.max} mm depth
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
      {children}
    </p>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-slate-50 pb-1.5">
      <span className="text-[11px] font-semibold text-slate-400 shrink-0">{label}</span>
      <span className="text-[11px] text-right font-medium text-sky-950">{value}</span>
    </div>
  );
}

function SpecPill({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border px-3 py-1.5 ${
        highlight
          ? "border-green-200 bg-green-50"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </div>
      <div
        className={`mt-0.5 text-xs font-bold ${
          highlight ? "text-green-700" : "text-sky-950"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
