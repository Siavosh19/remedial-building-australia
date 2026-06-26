"use client";

// ──────────────────────────────────────────────────────────────────────────────
// AutoProductReference — shared engine that renders the approved Product Reference
// design (ProductSpecCardV2 carousel + a clean System Comparison) from a page's
// EXISTING researched product data. One card per product. No invention: values
// are taken verbatim from the page's own technicalProperties / descriptionLine,
// and any field not found there is shown as "N/A". Any text containing "TODO" is
// stripped from what's displayed. No View-TDS / Compare buttons.
//
// Usage in a ProductSection:
//   return <AutoProductReference products={PRODUCTS} designCriteria={DESIGN_CRITERIA} sectionLabel="Concrete Spalling" />;
// ──────────────────────────────────────────────────────────────────────────────

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductSpecCardV2, type RefCard, type BadgeTone, type SectionKey } from "./ProductSpecCardV2";
import { CS_CRITERIA } from "./csCriteriaValues";

// Soft brand tint for the comparison-table rows (nothing harsh): a faint row
// background + a brand-coloured left bar and product-name colour.
function brandRow(brand: string) {
  const b = (brand || "").toLowerCase();
  if (b.includes("sika")) return { tint: "bg-amber-50/60", bar: "bg-yellow-400", name: "text-amber-900" };
  if (b.includes("ardex")) return { tint: "bg-slate-50", bar: "bg-slate-400", name: "text-slate-800" };
  if (b.includes("fosroc") || b.includes("parchem")) return { tint: "bg-red-50/60", bar: "bg-red-600", name: "text-red-900" };
  if (b.includes("mapei")) return { tint: "bg-blue-50/60", bar: "bg-blue-700", name: "text-blue-900" };
  return { tint: "bg-sky-50/50", bar: "bg-sky-800", name: "text-sky-950" };
}

// A page's revised design-criteria: the ordered parameter labels (table rows) and
// the hand-verified value per product (keyed by exact product name). "N/A" = not
// confirmed on the sourced TDS — never guessed.
export interface CritEntry {
  params: string[];
  values: Record<string, Record<string, string>>;
}

export interface AutoProduct {
  fullLabel: string;
  name: string;
  productType?: string;
  descriptionLine?: string;
  filterTags?: string[];
  techChips?: { label: string; cls?: string }[];
  systemDescription?: string;
  technicalProperties?: string[];
  limitations?: string[];
}

const hasTodo = (s: string) => /todo/i.test(s);
const clean = (arr?: string[]) => (arr ?? []).filter((s) => s && !hasTodo(s));
// Lines that are commercial / availability / pack-size noise — kept OUT of "Best
// for" (those facts live in Key properties), so Best for stays use-case only.
const COMMERCIAL = /\b(available|availability|distribut|trade supply|national|nationally|bayset|bunnings|stockist|contact|pack size|kg bag|kg bags|\d+\s*kg\b|\bL kit\b|cartridge|drum|pail|container)\b/i;

function shorten(s: string, words = 14) {
  const w = s.replace(/\s+/g, " ").trim().split(" ");
  return w.length <= words ? s.trim() : w.slice(0, words).join(" ") + "…";
}

function firstSentences(s: string | undefined, n = 2) {
  if (!s) return "";
  const parts = s.replace(/\s+/g, " ").split(/(?<=[.!?])\s+/).filter((p) => !hasTodo(p));
  return parts.slice(0, n).join(" ");
}

// Best-effort extraction of one field from the product's own text. Returns "N/A"
// when the value is not stated — never guessed.
function find(text: string, res: RegExp[]): string {
  for (const re of res) {
    const m = text.match(re);
    if (m) return (m[1] ?? m[0]).replace(/\s+/g, " ").trim();
  }
  return "N/A";
}

function badgeTone(label: string, i: number): BadgeTone {
  const l = label.toLowerCase();
  if (/en\s*1504|as\s*\d/.test(l)) return "navy";
  if (/cosmetic|non-structural|caution|warning/.test(l)) return "amber";
  return i % 2 === 0 ? "blue" : "slate";
}

function toCard(p: AutoProduct, designCriteria: string, crit?: CritEntry): RefCard {
  const tp = clean(p.technicalProperties);
  const lim = clean(p.limitations);
  const text = [p.descriptionLine, ...(p.technicalProperties ?? [])].filter((s) => s && !hasTodo(s)).join(" · ");

  const badges = (p.techChips ?? [])
    .map((c) => c.label)
    .filter((l) => l && !hasTodo(l))
    .slice(0, 5)
    .map((label, i) => ({ label, tone: badgeTone(label, i) }));

  const appInfo = [
    { label: "Thickness / layer", value: find(text, [/(\d+\s*(?:–|-|to)\s*\d+\s*mm)/i, /(up to \d+\s*mm)/i, /(\d+\s*mm\b)/i]) },
    { label: "Application temp", value: find(text, [/([+]?\d+\s*°?C?\s*(?:–|-|to)\s*[+]?\d+\s*°C)/i, /(\+?\d+°C\s*(?:to|–|-)\s*\+?\d+°C)/i]) },
    { label: "Primer / bond coat", value: (() => { const s = tp.find((t) => /primer|bond coat|nitobond|bonding agent|slurry/i.test(t)); return s ? shorten(s, 10) : "N/A"; })() },
    { label: "Pack size", value: find(text, [/(\d+(?:\.\d+)?\s*kg\b)/i, /(\d+\s*L\b)/]) },
    { label: "Application method", value: (() => { const m = text.match(/\b(hand[- ]?applied|trowel|spray(?:ed|-applied)?|roller|brush|poured|pourable|gun[- ]?applied)\b/i); return m ? m[1] : "N/A"; })() },
    { label: "Vertical / overhead", value: /vertical|overhead|soffit/i.test(text) ? "Yes" : "N/A" },
    { label: "Substrate", value: (() => { const m = text.match(/\b(SSD|saturated[- ]surface[- ]dry|roughened|prepared|primed)\b/i); return m ? m[1].toUpperCase().startsWith("SSD") ? "SSD (saturated)" : m[1] : "N/A"; })() },
    { label: "Setting", value: /rapid[- ]set|fast[- ]set/i.test(text) ? "Rapid-set" : /normal[- ]set/i.test(text) ? "Normal-set" : "N/A" },
  ];

  // When a page supplies revised criteria values, the Advanced Technical Data
  // becomes a parameter→value table (no prose note) and the visible grid shows
  // the headline parameters. Otherwise fall back to text extraction.
  const critRow = (label: string) => ({ label, value: crit?.values[p.name]?.[label] ?? "N/A" });
  const techData = crit
    ? crit.params.map(critRow)
    : tp.map((t) => {
        const idx = t.indexOf(" — ");
        if (idx > 0 && idx < 60) return { label: t.slice(0, idx).trim(), value: t.slice(idx + 3).trim() };
        return { label: "Spec", value: t.trim() };
      });

  return {
    brand: p.fullLabel,
    rangeName: p.name,
    shortType: p.productType ?? "",
    filterTags: p.filterTags ?? [],
    badges: [],
    // Best for = use-cases only (commercial/pack lines stripped), complete.
    bestFor: tp.filter((t) => !COMMERCIAL.test(t)).slice(0, 5),
    // Split limitations: first half → Avoid where, second half → Key warnings.
    avoidWhere: lim.slice(0, Math.ceil(lim.length / 2)),
    appInfo: crit ? crit.params.map(critRow) : appInfo,
    warnings: lim.slice(Math.ceil(lim.length / 2)),
    advanced: {
      description: firstSentences(p.systemDescription, 3) || p.descriptionLine || p.productType || "",
      designCriteria: crit ? "" : designCriteria,
      techData,
    },
  };
}

// A "fact" carries no real TDS value when it is blank, a dash, "N/A", "CONFIRM…",
// or "TBC" — these should never be shown as a parameter on a card.
const isEmptyFact = (v?: string) => {
  const s = (v ?? "").trim();
  return s === "" || s === "—" || s === "-" || /^n\/a\b/i.test(s) || /^confirm\b/i.test(s) || /^tbc\b/i.test(s);
};

// Clean a fact for display: drop it entirely if it has no real value, otherwise
// strip any embedded "CONFIRM…/AU TDS" note clause so the word never shows.
const cleanFact = (v?: string): string => {
  let s = (v ?? "").trim();
  if (isEmptyFact(s)) return "";
  // remove a parenthetical that is only a CONFIRM / "… AU TDS" note
  s = s.replace(/\s*\([^)]*(?:\bCONFIRM\b|AU TDS)[^)]*\)/gi, "");
  // remove a trailing "— / · / ; clause … CONFIRM …" note
  s = s.replace(/\s*[—·;]\s*[^—·;]*\bCONFIRM\b[^—·;]*$/i, "");
  s = s.replace(/\s+CONFIRM\b.*$/i, "");
  return s.replace(/[\s—·;,]+$/, "").trim();
};

// Hide no-value facts (blank → card hides the line), strip embedded CONFIRM notes,
// and drop any KEY-PROPERTIES column where NO card in the set has a real value.
function pruneFacts(cards: RefCard[]): RefCard[] {
  const labels = cards[0]?.appInfo.map((a) => a.label) ?? [];
  const keep = new Set(
    labels.filter((label) => cards.some((c) => { const it = c.appInfo.find((a) => a.label === label); return it && cleanFact(it.value) !== ""; })),
  );
  return cards.map((c) => ({
    ...c,
    appInfo: c.appInfo.filter((a) => keep.has(a.label)).map((a) => ({ ...a, value: cleanFact(a.value) })),
    advanced: { ...c.advanced, techData: c.advanced.techData.map((r) => ({ ...r, value: cleanFact(r.value) })) },
  }));
}

export function AutoProductReference({
  products,
  designCriteria,
  sectionLabel = "Products",
  cards: cardsOverride,
  criteriaKey,
  hideComparison = false,
  singleCard = false,
  pruneEmptyFacts = false,
}: {
  products: AutoProduct[];
  designCriteria: string;
  sectionLabel?: string;
  // Upgraded pages pass hand-verified RefCards (parameter→value tables, no note).
  cards?: RefCard[];
  // Or pass a slug key into CS_CRITERIA — the engine builds the param→value table.
  criteriaKey?: string;
  // Selector embeds the carousel only — hide the System Comparison table.
  hideComparison?: boolean;
  // Selector display: show one wider card at a time instead of two.
  singleCard?: boolean;
  // Hide facts with no TDS value (blank / CONFIRM / N/A) on each card, and drop
  // any KEY-PROPERTIES / tech-data column where NO card in the set has a value.
  pruneEmptyFacts?: boolean;
}) {
  const crit = criteriaKey ? CS_CRITERIA[criteriaKey] : undefined;
  const baseCards = cardsOverride ?? products.map((p) => toCard(p, designCriteria, crit));
  const cards = pruneEmptyFacts ? pruneFacts(baseCards) : baseCards;
  const [activeCard, setActiveCard] = useState(0);
  // Shared collapse state across every visible card (sections open together).
  const [openSections, setOpenSections] = useState<Set<SectionKey>>(new Set());
  const ALL_SECTIONS: SectionKey[] = ["props", "best", "avoid", "warn"];
  const toggleSection = (id: SectionKey) =>
    setOpenSections((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const allOpen = openSections.size === ALL_SECTIONS.length;
  const toggleAllSections = () => setOpenSections(allOpen ? new Set() : new Set(ALL_SECTIONS));
  const scrollRef = useRef<HTMLDivElement>(null);

  const cardStep = () => {
    const el = scrollRef.current;
    if (!el) return 0;
    const card = el.querySelector<HTMLElement>("[data-card]");
    return card ? card.offsetWidth + 20 : el.clientWidth / 2;
  };
  const scrollToCard = (i: number) => scrollRef.current?.scrollTo({ left: i * cardStep(), behavior: "smooth" });
  // Single-card mode is click-only: navigate by index (no drag/swipe/scroll).
  const goTo = (i: number) => {
    const clamped = Math.max(0, Math.min(cards.length - 1, i));
    setActiveCard(clamped);
    scrollToCard(clamped);
  };
  // Arrows page through the visible cards. In single-card mode, one card per click.
  const scroll = (dir: "left" | "right") => {
    if (singleCard) { goTo(activeCard + (dir === "right" ? 1 : -1)); return; }
    const step = cardStep() * 2;
    scrollRef.current?.scrollBy({ left: dir === "right" ? step : -step, behavior: "smooth" });
  };
  const onScroll = () => {
    const el = scrollRef.current, step = cardStep();
    if (el && step) setActiveCard(Math.round(el.scrollLeft / step));
  };

  return (
    <div className="space-y-10">
      {/* ── Product Reference ── */}
      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">
              Individual products — one card each — {singleCard ? "use arrows to view all" : "scroll to view all"}
            </p>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">
            {cards.length} product{cards.length !== 1 ? "s" : ""} — {singleCard ? "use arrows to view all" : "2 visible, scroll for more"}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleAllSections}
              className="mr-1 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-600 shadow-sm transition hover:border-sky-300 hover:text-sky-950"
            >
              {allOpen ? "Collapse all" : "Expand all"}
            </button>
            <button onClick={() => scroll("left")} disabled={singleCard && activeCard === 0} aria-label="Previous card" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950 disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-500">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => scroll("right")} disabled={singleCard && activeCard >= cards.length - 1} aria-label="Next card" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950 disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-500">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={onScroll}
          // Single-card mode: overflow-x-hidden ⇒ no user drag/swipe/scroll; the arrows
          // still drive it programmatically. Library (2-card) mode keeps native scroll.
          className={`grid grid-flow-col gap-x-5 gap-y-0 ${singleCard ? "overflow-x-hidden" : "overflow-x-auto"} pb-4 scroll-smooth`}
          style={{
            gridTemplateRows: "repeat(9, auto)",
            gridAutoColumns: singleCard ? "100%" : "max(340px, calc(50% - 10px))",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          } as React.CSSProperties}
        >
          {cards.map((card) => (
            <ProductSpecCardV2 key={card.rangeName} card={card} open={openSections} onToggle={toggleSection} />
          ))}
        </div>

        {cards.length > 1 && (
          <div className="mt-1 flex flex-wrap items-center justify-center gap-2">
            {cards.map((card, i) => (
              <button
                key={card.rangeName}
                type="button"
                onClick={() => (singleCard ? goTo(i) : scrollToCard(i))}
                aria-label={`Go to card ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === activeCard ? "w-6 bg-sky-900" : "w-2 bg-slate-300 hover:bg-slate-400"}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── System Comparison (auto, no TODO) ── */}
      {!hideComparison && (
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">
              {sectionLabel} — confirm all selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <p className="mb-2 text-[11px] font-semibold text-slate-400 md:hidden">Scroll the table sideways to see every column →</p>
        <div className="overflow-x-auto overscroll-x-contain rounded-2xl border border-slate-200 shadow-sm [scrollbar-width:auto] [scrollbar-color:#94a3b8_#e2e8f0]">
          <table className="w-max min-w-full border-collapse text-[13px]">
            <thead>
              <tr className="bg-slate-100">
                <th className="sticky left-0 z-10 border border-slate-200 bg-slate-100 px-3 py-2 text-left align-bottom text-[12px] font-bold whitespace-nowrap text-slate-900">Product</th>
                {(cards[0]?.appInfo ?? []).map((a) => (
                  <th key={a.label} className="min-w-[150px] max-w-[260px] border border-slate-200 px-3 py-2 text-left align-bottom text-[12px] font-bold leading-snug text-slate-900">{a.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cards.map((c) => {
                const r = brandRow(c.brand);
                return (
                  <tr key={c.rangeName} className={r.tint}>
                    <td className={`sticky left-0 z-10 border border-slate-200 ${r.tint} px-3 py-2 align-top whitespace-nowrap`}>
                      <span className="flex items-start gap-2.5">
                        <span className={`mt-0.5 h-4 w-1 shrink-0 rounded-full ${r.bar}`} />
                        <span>
                          <span className={`block text-[13px] font-bold ${r.name}`}>{c.rangeName}</span>
                          <span className="block text-[11px] text-slate-500">{c.brand}</span>
                        </span>
                      </span>
                    </td>
                    {c.appInfo.map((a) => (
                      <td key={a.label} className={`min-w-[150px] max-w-[260px] border border-slate-200 px-3 py-2 align-top text-[13px] leading-[1.4] [overflow-wrap:anywhere] ${!a.value || /^N\/A/.test(a.value) ? "text-slate-400" : "font-medium text-slate-900"}`}>{a.value || "—"}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      )}
    </div>
  );
}
