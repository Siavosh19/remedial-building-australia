"use client";

import { useState } from "react";
import { CheckCircle, XCircle, ExternalLink, FileText, ArrowRight } from "lucide-react";
import { DataNote } from "./ProductPageShared";

// ── Shared types ──────────────────────────────────────────────────────────────

export type ProductCardData = {
  // Core — present in every context (ProductSection + selector db.ts)
  name: string;
  brand: string;          // "fullLabel" in ProductSection files
  brandUrl: string;
  tdsUrl?: string;
  accentColor: string;
  descriptionLine: string;
  techChips: { label: string; cls: string }[];
  // Rich content — present in ProductSection files; absent in selector db.ts (pending extraction)
  productType?: string;
  systemDescription?: string;
  technicalProperties?: string[];
  limitations?: string[];
  procurementSources?: { name: string; url?: string }[];
  dataNote?: string;
  // Selector-specific additions — rendered around the card, not inside it
  selected?: boolean;
  onSelect?: () => void;
  sponsored?: boolean;
  referenceUrl?: string;  // link to product reference page (shown when rich content is absent)
};

// ── Internal sub-components (collapsibles) ────────────────────────────────────

function CollapsibleList({ items, icon, limit = 3 }: { items: string[]; icon: "check" | "x"; limit?: number }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, limit);
  return (
    <div>
      <ul className="space-y-1.5">
        {visible.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
            {icon === "check"
              ? <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" />
              : <XCircle    size={12} className="mt-0.5 shrink-0 text-red-400" />
            }
            {item}
          </li>
        ))}
      </ul>
      {items.length > limit && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600"
        >
          {expanded ? "Show less ↑" : `+${items.length - limit} more ↓`}
        </button>
      )}
    </div>
  );
}

function CollapsibleSources({ sources }: { sources: { name: string; url?: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">PROCUREMENT SOURCES</p>
        <button
          onClick={() => setExpanded((e) => !e)}
          className="text-[9px] font-bold text-slate-400 hover:text-slate-600"
        >
          {expanded ? "Hide ↑" : "See more ↓"}
        </button>
      </div>
      {expanded && (
        <div className="mt-2 space-y-1.5">
          {sources.map((src) => (
            <div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs">
              {src.url ? (
                <a href={src.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">
                  {src.name} <ExternalLink size={9} className="text-slate-300" />
                </a>
              ) : (
                <span className="font-semibold text-slate-600">{src.name}</span>
              )}
            </div>
          ))}
        </div>
      )}
      <p className="mt-2 text-[10px] italic text-slate-400">
        Confirm suitability with the current manufacturer TDS before specifying or applying.
      </p>
    </div>
  );
}

function CollapsibleCardDetails({ text, chips }: { text: string; chips: { label: string; cls: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      {expanded && (
        <>
          <p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>
          {chips.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {chips.map((chip) => (
                <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>
                  {chip.label}
                </span>
              ))}
            </div>
          )}
        </>
      )}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600"
      >
        {expanded ? "Hide details ↑" : "Show details ↓"}
      </button>
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>
        {text}
      </p>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900"
      >
        {expanded ? "Show less ↑" : "Show more ↓"}
      </button>
    </div>
  );
}

// ── Main shared card component ────────────────────────────────────────────────
// Used by:
//   - All ProductSection files (rich fields always present; selector props absent)
//   - System Selector StageBlock (rich fields absent pending db.ts enrichment; selector props present)

export function ProductReferenceCard({
  name, brand, brandUrl, tdsUrl, accentColor,
  descriptionLine, techChips, productType,
  systemDescription, technicalProperties, limitations, procurementSources,
  dataNote,
  selected, onSelect, sponsored, referenceUrl,
}: ProductCardData) {
  const hasRichContent = !!(systemDescription || technicalProperties?.length || limitations?.length);

  return (
    <div
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      style={{ borderLeft: `4px solid ${accentColor}` }}
    >
      {/* ── Header ── */}
      <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">
              {brand}
            </span>
            {sponsored && (
              <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                Sponsored
              </span>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-1">
            {tdsUrl && (
              <a href={tdsUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
                <FileText size={9} /> TDS
              </a>
            )}
            <a href={brandUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
              <ExternalLink size={9} /> Brand Site
            </a>
          </div>
        </div>
        <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{name}</h3>
        {productType && (
          <div className="mt-0.5 flex flex-wrap items-center gap-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{productType}</p>
          </div>
        )}
        <CollapsibleCardDetails text={descriptionLine} chips={techChips} />
      </div>

      {/* ── Rich content (full ProductSection view) ── */}
      {hasRichContent ? (
        <>
          {systemDescription && (
            <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
              <CollapsibleDescription text={systemDescription} />
            </div>
          )}
          {(technicalProperties?.length || limitations?.length) ? (
            <div className="space-y-3 px-5 py-4">
              {technicalProperties?.length ? (
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-green-700">Technical Properties</p>
                  <CollapsibleList items={technicalProperties} icon="check" limit={3} />
                </div>
              ) : null}
              {limitations?.length ? (
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">Limitations</p>
                  <CollapsibleList items={limitations} icon="x" limit={3} />
                </div>
              ) : null}
            </div>
          ) : null}
        </>
      ) : (
        /* Fallback when db.ts rich content pending extraction */
        referenceUrl ? (
          <div className="flex-1 border-b border-slate-100 px-5 py-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Full technical reference</p>
            <a href={referenceUrl} target="_blank" rel="noopener noreferrer"
              className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:text-sky-900">
              View System Description, Technical Properties &amp; Limitations
              <ArrowRight size={11} />
            </a>
          </div>
        ) : null
      )}

      {/* ── Procurement sources ── */}
      {procurementSources?.length ? (
        <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3 space-y-2">
          {dataNote && <DataNote text={dataNote} />}
          <CollapsibleSources sources={procurementSources} />
        </div>
      ) : dataNote ? (
        <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3">
          <DataNote text={dataNote} />
        </div>
      ) : null}

      {/* ── Selector-only: Select button ── */}
      {onSelect && (
        <div className="border-t border-slate-100 bg-white px-5 py-3 flex items-center justify-end">
          <button
            onClick={onSelect}
            className={`rounded-lg px-4 py-1.5 text-[11px] font-bold transition ${
              selected
                ? "bg-sky-950 text-white"
                : "border border-sky-950 text-sky-950 hover:bg-sky-950 hover:text-white"
            }`}
          >
            {selected ? "Selected ✓" : "Select"}
          </button>
        </div>
      )}
    </div>
  );
}
