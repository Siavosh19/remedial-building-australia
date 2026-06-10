"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Mapei"
  | "Silane"
  | "Siloxane"
  | "Penetrating"
  | "Water-repellent"
  | "Masonry"
  | "Concrete"
  | "Breathable"
  | "Colourless"
  | "Flood-coat"
  | "Vapour-permeable";

type Supplier = {
  fullLabel: string;
  brandUrl: string;
  tdsUrl?: string;
  accentColor: string;
  name: string;
  descriptionLine: string;
  productType: string;
  filterTags: FilterTag[];
  techChips: { label: string; cls: string }[];
  systemDescription: string;
  technicalProperties: string[];
  limitations: string[];
  procurementSources: { name: string; url: string }[];
};

const SUPPLIERS: Supplier[] = [
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com.au",
    accentColor: "#0369a1",
    name: "Mapei Antipluviol S silane/siloxane water repellent blend",
    descriptionLine: "Combined silane (deep penetration) and siloxane (surface zone) water repellent blend — colourless — vapour permeable — brush or low-pressure spray application — for brick, stone, concrete and render",
    productType: "Penetrating silane/siloxane blend water repellent — no surface film — flood coat application",
    filterTags: ["Mapei", "Silane", "Siloxane", "Penetrating", "Water-repellent", "Masonry", "Concrete", "Breathable", "Colourless", "Flood-coat", "Vapour-permeable"],
    techChips: [
      { label: "Silane/siloxane blend", cls: "bg-sky-100 text-sky-800" },
      { label: "No surface film", cls: "bg-green-100 text-green-700" },
      { label: "Vapour permeable", cls: "bg-slate-100 text-slate-700" },
      { label: "Colourless", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Mapei Antipluviol S is a silane/siloxane blend water repellent that combines silane (for deep pore penetration) and siloxane (for enhanced protection in the surface zone) to provide a dual-depth water repellent effect on brick, stone, concrete and render. The combined chemistry provides deeper protection than siloxane alone and broader surface-zone coverage than silane alone. Colourless — no visible change to surface appearance after treatment. Vapour permeable — maintains breathability of treated masonry. No surface film formed — treatment is penetrating only. Application by brush or low-pressure spray — flood coat to saturation required; surface must be fully wetted. Substrate must be clean and dry — minimum 48 hours no rain before application. Confirm coverage by water absorption test on a test area before treating full facade. Confirm with water drop test after 7 days cure. Mapei Antipluviol S is available through Mapei national distributors.",
    technicalProperties: [
      "Silane/siloxane blend — combined deep penetration (silane) and surface zone protection (siloxane) in one product",
      "Deeper protection than siloxane-only products — silane component penetrates further into the pore structure",
      "Colourless — no visible change to surface appearance after treatment; suitable for heritage and aesthetic-sensitive facades",
      "Vapour permeable — maintains breathability of treated masonry; moisture within the wall can escape outward",
      "No surface film — cannot peel, blister, or trap moisture behind a surface film",
      "Brush or low-pressure spray application — flood coat to saturation required for adequate penetration",
    ],
    limitations: [
      "Supplementary protection only — does NOT seal cracks or repair structural defects; all defects must be repaired before treatment",
      "Substrate must be dry — minimum 48 hours no rain before application; confirm substrate moisture before treating",
      "Ineffective on painted or coated surfaces — must penetrate bare masonry or concrete pore structure",
      "Confirm coverage rate on a test area — porosity varies widely between substrate types",
    ],
    procurementSources: [
      { name: "Mapei Australia — national distributors", url: "https://www.mapei.com.au" },
      { name: "Parchem Construction Supplies — national", url: "https://www.parchem.com.au" },
      { name: "Ardex Australia — national masonry treatment supply", url: "https://www.ardex.com.au" },
      { name: "Confirm current Mapei distributor in your state before ordering", url: "https://www.mapei.com.au" },
    ],
  },
];

const SYSTEM_COMPARISON: {
  attribute: string;
  value: string;
}[] = [
  { attribute: "Supplier", value: "Mapei Australia" },
  { attribute: "Product", value: "Antipluviol S" },
  { attribute: "Chemistry", value: "Silane/siloxane blend" },
  { attribute: "Surface film", value: "None (penetrating treatment)" },
  { attribute: "Vapour permeable", value: "Yes" },
  { attribute: "Penetration", value: "Dual-depth — silane (deep) + siloxane (surface zone)" },
  { attribute: "Application method", value: "Brush or low-pressure spray — flood coat" },
  { attribute: "Substrate moisture limit", value: "Dry — minimum 48 hours no rain" },
  { attribute: "Colourless", value: "Yes — appearance unchanged" },
  { attribute: "Reapplication interval", value: "Confirm with current Mapei TDS" },
];

const TECH_INFO = {
  typicalApplications: [
    "Water repellent treatment to brick, stone and render facades after structural repairs and repointing are complete",
    "Supplementary protection on exposed masonry parapets, piers and wind-driven rain faces",
    "Treatment of concrete and render facades where combined silane and siloxane protection is required",
    "Post-salt-attack remediation treatment to reduce future water and chloride ingress into repaired masonry",
    "Water repellent treatment where a silane/siloxane blend is specified for dual-depth protection",
  ],
  selectionCriteria: [
    "Specify Antipluviol S where a silane/siloxane blend is required for both deep penetration and surface zone protection",
    "Apply as a flood coat — surface must be fully wetted to achieve adequate penetration at both depths",
    "All structural defects, cracks, and failed joints must be repaired before silane treatment — treatment does not seal cracks",
    "Substrate must be dry — minimum 48 hours no rain; confirm substrate is dry before applying",
    "Confirm coverage rate on a test area before treating the full facade — porosity varies by substrate type",
    "Confirm treatment with water drop test after 7 days cure",
  ],
  limitations: [
    "Does not seal cracks — any crack wider than ~0.1 mm will allow water entry regardless of treatment",
    "Will not stop rising damp or below-ground moisture — treatment is a facade water repellent only",
    "Ineffective on painted, coated, or contaminated surfaces — must penetrate bare masonry pore structure",
    "Do not apply in direct sunlight when surface temperature is high — carrier evaporates before penetration",
    "Do not apply to frozen surfaces or when frost is forecast",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — references water repellent treatment as supplementary protection",
    "BS EN 13580 — Products and systems for protection and repair of concrete — water absorption after impregnation",
    "Mapei Antipluviol S TDS — confirm current coverage rate, substrate moisture limit, and reapplication interval",
    "CCAA Data Sheet — Water Repellent Treatments for Concrete — guidance on silane/siloxane selection and application",
  ],
  suitableDefects: [
    "Porous or absorbent masonry facade where water ingress occurs through the pore structure (not through cracks or open joints)",
    "Wind-driven rain penetration on exposed elevations where masonry porosity is confirmed as the ingress mechanism",
    "Efflorescence caused by water cycling through porous masonry — treat after eliminating salts and completing repointing",
    "Post-remediation treatment to reduce recurrence of water-related deterioration after structural repairs are complete",
  ],
  typicalSubstrates: [
    "Fired clay brick — bare, dry, unpainted surface required — flood coat to saturation",
    "Natural stone — confirm product compatibility with stone type before applying to porous or heritage stone",
    "Concrete — bare, dry concrete — flood coat application",
    "Render and textured masonry coatings — confirm product compatibility with the render type before specifying",
    "NOT suitable: painted or coated surfaces — coating blocks penetration; strip coating before treatment",
  ],
};

/* ── Collapsible helpers ── */

function CollapsibleList({ items, icon, limit = 3 }: { items: string[]; icon: "check" | "x"; limit?: number }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, limit);
  const extra = items.length - limit;
  return (
    <div>
      <ul className="space-y-1.5">
        {visible.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
            {icon === "check" ? <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" /> : <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />}
            {item}
          </li>
        ))}
      </ul>
      {items.length > limit && (
        <button onClick={() => setExpanded((e) => !e)} className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600">
          {expanded ? "Show less ↑" : `+${extra} more ↓`}
        </button>
      )}
    </div>
  );
}

function CollapsibleSources({ sources }: { sources: { name: string; url?: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? sources : sources.slice(0, 2);
  const extra = sources.length - 2;
  return (
    <div>
      <ul className="space-y-1.5">
        {visible.map((s, i) => (
          <li key={i} className="flex items-center gap-2 text-xs">
            {s.url ? (
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-sky-700 hover:underline">
                <ExternalLink size={10} /> {s.name}
              </a>
            ) : (
              <span className="text-slate-500">{s.name}</span>
            )}
          </li>
        ))}
      </ul>
      {sources.length > 2 && (
        <button onClick={() => setExpanded((e) => !e)} className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600">
          {expanded ? "Show less ↑" : `+${extra} more ↓`}
        </button>
      )}
    </div>
  );
}

function CollapsibleCardDetails({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen((o) => !o)} className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-slate-400 hover:text-slate-600">
        {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        {open ? "Hide technical detail" : "Show technical detail"}
      </button>
      {open && <div className="mt-3 space-y-4 border-t border-slate-100 pt-4">{children}</div>}
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const preview = text.slice(0, 220);
  const isTruncated = text.length > 220;
  return (
    <p className="text-xs leading-5 text-slate-600">
      {expanded || !isTruncated ? text : <>{preview}…</>}
      {isTruncated && (
        <button onClick={() => setExpanded((e) => !e)} className="ml-1 font-bold text-sky-600 hover:underline">
          {expanded ? "less" : "more"}
        </button>
      )}
    </p>
  );
}

function TechCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="mb-3 flex items-center gap-2 text-sm font-extrabold text-sky-950">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-sky-50 text-sky-700">{icon}</span>
        {title}
      </div>
      {children}
    </div>
  );
}

export function MapeiAntipluviolIntroSection() {
  return (
    <div className="rounded-2xl border border-sky-100 bg-sky-50 p-7">
      <h2 className="mb-3 text-lg font-extrabold text-sky-950">What is Mapei Antipluviol S silane/siloxane water repellent?</h2>
      <p className="mb-4 max-w-3xl text-sm leading-6 text-slate-700">
        Mapei Antipluviol S is a silane/siloxane blend water repellent that provides dual-depth protection — the silane component penetrates deep into the pore structure while the siloxane component reinforces the surface zone. Combined, the blend provides broader and deeper water repellent protection than either chemistry alone. Colourless, vapour permeable, no surface film. Applied by brush or low-pressure spray as a flood coat to saturation. All defects must be repaired and the substrate must be dry before application.
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: <Layers size={14} />, label: "Chemistry", value: "Silane/siloxane blend" },
          { icon: <Ruler size={14} />, label: "Film", value: "None (penetrating)" },
          { icon: <BookOpen size={14} />, label: "Standard", value: "AS 3700 / BS EN 13580" },
        ].map((s) => (
          <div key={s.label} className="flex items-start gap-3 rounded-xl border border-sky-200 bg-white p-4">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700">{s.icon}</span>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{s.label}</div>
              <div className="mt-0.5 text-sm font-extrabold text-sky-950">{s.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MapeiAntipluviolProductSection() {
  const [activeFilters, setActiveFilters] = useState<FilterTag[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (f: FilterTag) =>
    setActiveFilters((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  const filtered =
    activeFilters.length === 0
      ? SUPPLIERS
      : SUPPLIERS.filter((s) => activeFilters.every((f) => s.filterTags.includes(f)));

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-sky-950">Supplier reference — Mapei Antipluviol S silane/siloxane blend</h2>
        <div className="flex gap-2">
          <button onClick={() => scroll("left")} className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm hover:bg-slate-50">
            <ChevronLeft size={15} />
          </button>
          <button onClick={() => scroll("right")} className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm hover:bg-slate-50">
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {(["Mapei", "Silane", "Siloxane", "Penetrating", "Water-repellent", "Masonry", "Breathable", "Vapour-permeable"] as FilterTag[]).map((f) => (
          <button
            key={f}
            onClick={() => toggleFilter(f)}
            className={`rounded-full border px-3 py-1 text-[11px] font-bold transition ${activeFilters.includes(f) ? "border-sky-600 bg-sky-600 text-white" : "border-slate-200 bg-white text-slate-500 hover:border-sky-300"}`}
          >
            {f.replace(/-/g, " ")}
          </button>
        ))}
        {activeFilters.length > 0 && (
          <button onClick={() => setActiveFilters([])} className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[11px] font-bold text-red-600 hover:bg-red-100">
            Clear filters
          </button>
        )}
      </div>

      <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-2">
        {filtered.map((s) => (
          <div key={s.fullLabel} className="flex w-[340px] shrink-0 flex-col rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ borderLeftColor: s.accentColor, borderLeftWidth: 4 }}>
            <div className="p-5">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: s.accentColor }}>{s.fullLabel}</div>
                  <h3 className="mt-1 text-sm font-extrabold leading-snug text-sky-950">{s.name}</h3>
                </div>
                <div className="flex shrink-0 flex-col gap-1.5">
                  {s.brandUrl !== "#" && (
                    <a href={s.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[10px] font-bold text-sky-700 hover:bg-sky-50">
                      <ExternalLink size={9} /> Brand Site
                    </a>
                  )}
                  {s.tdsUrl && (
                    <a href={s.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[10px] font-bold text-sky-700 hover:bg-sky-50">
                      <FileText size={9} /> TDS
                    </a>
                  )}
                </div>
              </div>
              <CollapsibleDescription text={s.descriptionLine} />
              <div className="mt-3 flex flex-wrap gap-1.5">
                {s.techChips.map((c) => (
                  <span key={c.label} className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${c.cls}`}>{c.label}</span>
                ))}
              </div>
            </div>
            <div className="border-t border-slate-100 px-5 pb-5">
              <CollapsibleCardDetails>
                <div>
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">System description</div>
                  <p className="text-xs leading-5 text-slate-600">{s.systemDescription}</p>
                </div>
                <div>
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Technical properties</div>
                  <CollapsibleList items={s.technicalProperties} icon="check" />
                </div>
                <div>
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Limitations</div>
                  <CollapsibleList items={s.limitations} icon="x" />
                </div>
                <div>
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Procurement sources</div>
                  <CollapsibleSources sources={s.procurementSources} />
                </div>
              </CollapsibleCardDetails>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="flex h-40 w-full items-center justify-center text-sm text-slate-400">No suppliers match the selected filters.</div>
        )}
      </div>

      {/* Technical data table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-6 py-4">
          <h3 className="text-sm font-extrabold text-sky-950">Mapei Antipluviol S — key technical data</h3>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <th className="px-4 py-3 text-left">Attribute</th>
              <th className="px-4 py-3 text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            {SYSTEM_COMPARISON.map((row, i) => (
              <tr key={i} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="px-4 py-3 font-semibold text-sky-900">{row.attribute}</td>
                <td className="px-4 py-3 text-slate-600">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Technical info cards */}
      <div className="grid gap-5 lg:grid-cols-2">
        <TechCard icon={<SquareStack size={14} />} title="Typical applications">
          <CollapsibleList items={TECH_INFO.typicalApplications} icon="check" />
        </TechCard>
        <TechCard icon={<CheckCircle size={14} />} title="Selection criteria">
          <CollapsibleList items={TECH_INFO.selectionCriteria} icon="check" />
        </TechCard>
        <TechCard icon={<AlertTriangle size={14} />} title="Limitations & exclusions">
          <CollapsibleList items={TECH_INFO.limitations} icon="x" />
        </TechCard>
        <TechCard icon={<BookOpen size={14} />} title="Standards & notes">
          <CollapsibleList items={TECH_INFO.standardsNotes} icon="check" />
        </TechCard>
        <TechCard icon={<Layers size={14} />} title="Suitable defects">
          <CollapsibleList items={TECH_INFO.suitableDefects} icon="check" />
        </TechCard>
        <TechCard icon={<Ruler size={14} />} title="Typical substrates">
          <CollapsibleList items={TECH_INFO.typicalSubstrates} icon="check" />
        </TechCard>
      </div>
    </div>
  );
}
