"use client";

// ──────────────────────────────────────────────────────────────────────────────
// ProductSpecCardV2 — shared consultant/selection card used by AutoProductReference
// across every repair-system product page. Collapsible sections (Key properties /
// Best for / Avoid where / Key warnings) with a shared open/closed state so a
// section opens on every card at once and the cards stay aligned (CSS subgrid).
// ──────────────────────────────────────────────────────────────────────────────

import { useState, type ReactNode } from "react";
import {
  CheckCircle, XCircle, AlertTriangle, ChevronDown, ChevronUp, FlaskConical, Ruler,
} from "lucide-react";

export type BadgeTone = "navy" | "blue" | "amber" | "slate" | "rose";
export type SectionKey = "props" | "best" | "avoid" | "warn";

export interface RefBadge { label: string; tone: BadgeTone; }
export interface AppInfoItem { label: string; value: string; }
export interface TechRow { label: string; value: string; source?: string; }

export interface RefCard {
  brand: string;
  rangeName: string;
  shortType: string;
  filterTags?: string[];
  badges: RefBadge[];
  bestFor: string[];
  avoidWhere: string[];
  appInfo: AppInfoItem[];
  warnings: string[];
  advanced: {
    description: string;
    designCriteria: string;
    techData: TechRow[];
  };
}

const TONE: Record<BadgeTone, string> = {
  navy: "bg-slate-900 text-white",
  blue: "bg-sky-50 text-sky-700 border border-sky-200",
  amber: "bg-slate-100 text-slate-700 border border-slate-200",
  slate: "bg-slate-100 text-slate-700 border border-slate-200",
  rose: "bg-slate-100 text-slate-700 border border-slate-200",
};

// Brand accent (thin top strip + brand label colour) — no heavy header band.
function brandAccent(brand: string) {
  const b = brand.toLowerCase();
  if (b.includes("sika")) return { strip: "bg-yellow-400", label: "text-amber-700" };
  if (b.includes("ardex")) return { strip: "bg-slate-400", label: "text-slate-600" };
  if (b.includes("fosroc") || b.includes("parchem")) return { strip: "bg-red-600", label: "text-red-700" };
  if (b.includes("mapei")) return { strip: "bg-blue-700", label: "text-blue-700" };
  return { strip: "bg-sky-800", label: "text-sky-700" };
}

const FONT = "var(--font-geist-sans), Inter, Manrope, 'Source Sans 3', Roboto, system-ui, -apple-system, 'Segoe UI', sans-serif";

// One collapsible section box. Collapsed = just the title bar (short). Open =
// title bar + content. The header is a button; the chevron + More/Less hint it.
function SectionBox({
  id, open, onToggle, boxClass, icon, title, mt, children,
}: {
  id: SectionKey;
  open: boolean;
  onToggle: (id: SectionKey) => void;
  boxClass: string;
  icon: ReactNode;
  title: string;
  mt: string;
  children: ReactNode;
}) {
  return (
    <section className={`mx-5 ${mt} rounded-[13px] border border-[#D8E0EA] ${boxClass}`}>
      <button
        type="button"
        onClick={() => onToggle(id)}
        aria-expanded={open}
        className={`flex w-full items-center justify-between gap-2 px-4 py-3 text-left ${open ? "border-b border-slate-300/60" : ""}`}
      >
        <span className="flex items-center gap-2 text-[14px] font-bold uppercase tracking-[0.04em] text-slate-900">
          {icon} {title}
        </span>
        <span className="flex shrink-0 items-center gap-1 text-[11px] font-semibold text-slate-500">
          {open ? "Less" : "More"}
          {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </span>
      </button>
      {open && <div className="px-4 py-3">{children}</div>}
    </section>
  );
}

export function ProductSpecCardV2({
  card,
  open,
  onToggle,
}: {
  card: RefCard;
  open?: Set<SectionKey>;
  onToggle?: (id: SectionKey) => void;
}) {
  // Fall back to per-card local state if no shared state is provided.
  const [localOpen, setLocalOpen] = useState<Set<SectionKey>>(new Set());
  const openSet = open ?? localOpen;
  const toggle = onToggle ?? ((id: SectionKey) =>
    setLocalOpen((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; }));

  const [advOpen, setAdvOpen] = useState(false);
  const sources = [...new Set(card.advanced.techData.map((r) => r.source).filter(Boolean))];
  const acc = brandAccent(card.brand);

  return (
    <div
      data-card
      className="grid items-start overflow-hidden rounded-[14px] border border-[#D8E0EA] bg-[#FAFBFD] shadow-sm ring-1 ring-slate-900/5"
      style={{ gridTemplateRows: "subgrid", gridRow: "span 9", fontFamily: FONT }}
    >
      {/* row 1 ── Brand accent strip ── */}
      <div className={`h-2.5 w-full ${acc.strip}`} />

      {/* row 2 ── Header ── */}
      <div className="border-b border-slate-100 px-5 pb-3.5 pt-3">
        <p className={`text-[11px] font-bold uppercase tracking-[0.14em] ${acc.label}`}>{card.brand}</p>
        <h3 className="mt-1 text-xl font-extrabold leading-tight text-slate-900">{card.rangeName}</h3>
        <p className="mt-1 text-[14px] font-medium leading-snug text-slate-600">{card.shortType}</p>
      </div>

      {/* row 3 ── Description (under header, full) ── */}
      {card.advanced.description ? (
        <p className="border-b border-slate-100 px-5 py-3.5 text-[15px] leading-[1.6] text-slate-700">
          {card.advanced.description}
        </p>
      ) : (
        <div aria-hidden />
      )}

      {/* row 4 ── Badges ── */}
      {card.badges.length > 0 ? (
        <div className="flex flex-wrap gap-1.5 border-b border-slate-100 px-5 py-3">
          {card.badges.map((b, i) => (
            <span key={i} className={`rounded-md px-2.5 py-1 text-[12px] font-semibold ${TONE[b.tone]}`}>
              {b.label}
            </span>
          ))}
        </div>
      ) : (
        <div aria-hidden />
      )}

      {/* row 5 ── Key properties (collapsible) ── */}
      {card.appInfo.length > 0 ? (
        <SectionBox
          id="props" open={openSet.has("props")} onToggle={toggle} mt="mt-4"
          boxClass="bg-[#F1F5F9]"
          icon={<Ruler size={15} className="text-slate-500" />} title="Key properties"
        >
          <ul className="space-y-2.5">
            {card.appInfo.filter((it) => (it.value ?? "").trim() !== "").map((it, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[13.5px] leading-[1.6] text-slate-900">
                <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                <span>
                  <span className="font-bold text-slate-900">{it.label}</span>
                  {": "}
                  <span className={/^N\/A/.test(it.value) ? "text-slate-400" : "font-normal text-slate-700"}>{it.value}</span>
                </span>
              </li>
            ))}
          </ul>
        </SectionBox>
      ) : (
        <div aria-hidden />
      )}

      {/* row 6 ── Best for (collapsible) ── */}
      {card.bestFor.length > 0 ? (
        <SectionBox
          id="best" open={openSet.has("best")} onToggle={toggle} mt="mt-2.5"
          boxClass="bg-[#F0F9FF]"
          icon={<CheckCircle size={15} className="text-sky-600" />} title="Performance Highlights"
        >
          <ul className="space-y-2.5">
            {card.bestFor.slice(0, 5).map((t, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[13.5px] leading-[1.6] text-slate-800">
                <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                {t}
              </li>
            ))}
          </ul>
        </SectionBox>
      ) : (
        <div aria-hidden />
      )}

      {/* row 7 ── Avoid where (collapsible) ── */}
      {card.avoidWhere.length > 0 ? (
        <SectionBox
          id="avoid" open={openSet.has("avoid")} onToggle={toggle} mt="mt-2.5"
          boxClass="bg-[#FFF7ED]"
          icon={<XCircle size={15} className="text-orange-500" />} title="Cautions"
        >
          <ul className="space-y-2.5">
            {card.avoidWhere.slice(0, 5).map((t, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[13.5px] leading-[1.6] text-slate-800">
                <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                {t}
              </li>
            ))}
          </ul>
        </SectionBox>
      ) : (
        <div aria-hidden />
      )}

      {/* row 8 ── Key warnings (collapsible) ── */}
      {card.warnings.length > 0 ? (
        <div className="mb-4">
          <SectionBox
            id="warn" open={openSet.has("warn")} onToggle={toggle} mt="mt-2.5"
            boxClass="bg-[#FEF2F2]"
            icon={<AlertTriangle size={15} className="text-red-600" />} title="Key warnings"
          >
            <ul className="space-y-2.5">
              {card.warnings.map((w, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[13.5px] font-semibold leading-[1.6] text-red-700">
                  <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
                  {w}
                </li>
              ))}
            </ul>
          </SectionBox>
        </div>
      ) : (
        <div aria-hidden />
      )}

      {/* row 9 ── Advanced Technical Data — expandable row ── */}
      <div className="border-t border-[#D8E0EA]">
        <button
          type="button"
          onClick={() => setAdvOpen((o) => !o)}
          aria-expanded={advOpen}
          className="flex w-full items-center justify-between gap-2 bg-slate-50 px-5 py-3.5 text-left transition hover:bg-slate-100"
        >
          <span className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white ring-1 ring-slate-200">
              <FlaskConical size={15} className="text-sky-700" />
            </span>
            <span className="text-[13px] font-semibold text-slate-800">Advanced Technical Data</span>
          </span>
          {advOpen ? <ChevronUp size={18} className="text-slate-500" /> : <ChevronDown size={18} className="text-slate-500" />}
        </button>

        {advOpen && (
          <div className="space-y-4 border-t border-slate-100 bg-slate-50/50 px-5 py-4">
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.04em] text-slate-700">Design criteria — selection values</p>
              <div className="overflow-hidden rounded-lg border border-slate-200">
                <table className="w-full text-[12px]">
                  <tbody>
                    {card.advanced.techData.filter((r) => (r.value ?? "").trim() !== "").map((r, i) => (
                      <tr key={i} className={i % 2 ? "bg-white" : "bg-slate-50/60"}>
                        <td className="whitespace-nowrap border-b border-slate-100 px-3 py-2 align-top font-semibold text-slate-600">
                          {r.label}
                        </td>
                        <td className={`border-b border-slate-100 px-3 py-2 align-top ${r.value === "N/A" ? "text-slate-400" : "text-slate-800"}`}>
                          {r.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {sources.length > 0 && (
                <p className="mt-2 text-[11px] italic leading-[1.55] text-slate-400">Source: {sources.join("; ")}</p>
              )}
            </div>

            <p className="text-[11px] italic leading-[1.55] text-slate-400">
              Confirm all values against the current manufacturer TDS before specifying. &ldquo;N/A&rdquo; = not confirmed on the sourced TDS.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
