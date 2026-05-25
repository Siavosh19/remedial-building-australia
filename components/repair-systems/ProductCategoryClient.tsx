"use client";

import { useState } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ChevronLeft, ChevronRight, ExternalLink,
  ChevronDown, ChevronUp,
} from "lucide-react";
import type { MaterialRow } from "@/lib/concrete-defects-data";

// ── Brand config ──────────────────────────────────────────────────────────────

const BRANDS = [
  { key: "brandArdex",   label: "Ardex Australia",   tdsUrl: "https://www.ardex.com.au",          color: "bg-orange-100 text-orange-800" },
  { key: "brandSika",    label: "Sika Australia",     tdsUrl: "https://aus.sika.com",              color: "bg-red-100 text-red-800" },
  { key: "brandFosroc",  label: "Fosroc Australia",   tdsUrl: "https://www.fosroc.com/en-au",      color: "bg-blue-100 text-blue-800" },
  { key: "brandTremco",  label: "Tremco / Other",     tdsUrl: "https://www.tremcosealants.com.au", color: "bg-green-100 text-green-800" },
  { key: "brandParchem", label: "Parchem / Mapei",    tdsUrl: "https://www.parchem.com.au",        color: "bg-teal-100 text-teal-800" },
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

export function buildCards(materials: MaterialRow[]): ProductCard[] {
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

export function ProductCategoryCarousel({ materials }: { materials: MaterialRow[] }) {
  const cards = buildCards(materials);
  const [idx, setIdx] = useState(0);
  const [expanded, setExpanded] = useState(false);

  if (!cards.length) return <p className="text-sm text-slate-400">No product data available.</p>;
  const card = cards[idx];

  return (
    <div>
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

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
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

// ── Technical Accordion ───────────────────────────────────────────────────────

interface TechInfo {
  typicalApplications: string[];
  selectionCriteria: string[];
  limitations: string[];
  standardsNotes: string[];
  suitableDefects: string[];
  typicalSubstrates: string[];
}

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
            {style === "check"  && <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-600" />}
            {style === "warn"   && <AlertTriangle size={12} className="mt-0.5 shrink-0 text-amber-500" />}
            {style === "bullet" && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TechnicalAccordionClient({ techInfo }: { techInfo: TechInfo }) {
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
      {open && (
        <div className="border-t border-slate-100 px-7 pb-7 pt-6">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <TechCard icon={<Layers size={15}/>}        title="Typical Applications"  items={techInfo.typicalApplications} style="bullet" />
            <TechCard icon={<Ruler size={15}/>}         title="Selection Criteria"    items={techInfo.selectionCriteria}   style="check" />
            <TechCard icon={<AlertTriangle size={15}/>} title="Limitations"           items={techInfo.limitations}         style="warn" />
            <TechCard icon={<BookOpen size={15}/>}      title="Standards & Testing"   items={techInfo.standardsNotes}      style="bullet" />
            <TechCard icon={<CheckCircle size={15}/>}   title="Suitable Defects"      items={techInfo.suitableDefects}     style="check" />
            <TechCard icon={<SquareStack size={15}/>}   title="Typical Substrates"    items={techInfo.typicalSubstrates}   style="bullet" />
          </div>
        </div>
      )}
    </div>
  );
}
