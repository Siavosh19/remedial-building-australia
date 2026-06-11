"use client";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, BookOpen, Layers, Ruler, SquareStack, FileText } from "lucide-react";
import { CollapsibleList, CollapsibleDescription, CollapsibleSources, CollapsibleCardDetails, TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";

type FilterTag = "Movement-Joint" | "Masonry-Joint" | "Concrete-Joint" | "Paintable" | "External" | "Internal";

type Product = {
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
  procurementSources: { name: string; url?: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Sika Australia — Sikaflex-11FC+",
    brandUrl: "https://aus.sika.com",
    accentColor: "#0369a1",
    name: "Sika Sikaflex-11FC+ — Single-Component PU Joint Sealant",
    descriptionLine: "1-component moisture-curing polyurethane sealant — ±25% movement — masonry and concrete joints — paintable",
    productType: "Single-component polyurethane elastomeric sealant",
    filterTags: ["Movement-Joint", "Masonry-Joint", "Concrete-Joint", "Paintable", "External", "Internal"],
    techChips: [
      { label: "1C moisture-cure", cls: "bg-sky-100 text-sky-800" },
      { label: "±25% movement", cls: "bg-slate-100 text-slate-700" },
      { label: "Paintable", cls: "bg-sky-50 text-sky-700" },
    ],
    systemDescription: "Sika Sikaflex-11FC+ is a single-component moisture-curing polyurethane sealant used for sealing movement joints and dormant settlement cracks in masonry walls and concrete elements after structural repair. In settlement crack repair, PU sealant is applied at the surface of a repaired crack or at a designated movement joint location when the structural repair sequence is complete — the settlement cause has been addressed, the crack stitched or injected, and a flexible surface seal is required to exclude water and debris while accommodating any residual minor movement. Sikaflex-11FC+ accommodates ±25% joint movement, is paintable once cured, and is suitable for external and internal masonry and concrete joints. Backer rod at 1:2 depth:width ratio and primer are required for correct joint design. Used widely in Australian remedial building work.",
    technicalProperties: [
      "Single-component PU — moisture-curing — no mixing required on site",
      "Movement accommodation: ±25% of joint width",
      "Paintable after full cure — compatible with most acrylic and solvent-free paints",
      "Sika Australia — national trade and hardware supply",
    ],
    limitations: [
      "Primer required on porous or low-adhesion substrates (masonry, concrete) — check Sika primer guide before application",
      "Backer rod at correct depth:width ratio (1:2) required — do not apply without backer rod in joints > 6 mm wide",
      "±25% movement limit — if residual settlement movement exceeds this, consult engineer for alternative joint design",
      "Do not apply over wet or contaminated joint faces — surface must be clean, dry, and primed",
    ],
    procurementSources: [
      { name: "Sika Australia", url: "https://aus.sika.com" },
      { name: "Bunnings Trade / Hardware", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Tremco — Vulkem 116",
    brandUrl: "https://www.tremcosealants.com.au",
    accentColor: "#15803d",
    name: "Tremco Vulkem 116 — Single-Component Polyurethane Sealant",
    descriptionLine: "1-component PU sealant — ±25% movement — external masonry, concrete, and expansion joints — Tremco national supply",
    productType: "Single-component polyurethane elastomeric sealant",
    filterTags: ["Movement-Joint", "Masonry-Joint", "Concrete-Joint", "External"],
    techChips: [
      { label: "Tremco Vulkem", cls: "bg-green-100 text-green-800" },
      { label: "±25% movement", cls: "bg-slate-100 text-slate-700" },
      { label: "External use", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription: "Tremco Vulkem 116 is a single-component polyurethane sealant for external movement joints and crack sealing in masonry and concrete after settlement crack repair. Vulkem 116 is a well-established specification-grade product in the Australian remedial and commercial construction market, often specified by name in engineering documents for movement joint sealing. Suitable for external masonry and concrete joints with ±25% movement accommodation. Tremco supplies the Australian market nationally and provides detailed joint design guidance including primer selection, backer rod sizing, and expected service life. Used at movement joints in repaired masonry and concrete walls, and at control joints in concrete slabs and retaining walls adjacent to settlement-affected areas.",
    technicalProperties: [
      "Single-component PU — moisture-curing",
      "Movement: ±25% of joint width",
      "External masonry, concrete, and expansion joint applications",
      "Tremco Australia — national supply and technical support",
    ],
    limitations: [
      "Primer required — Tremco Vulkem Primer or equivalent on most masonry and concrete substrates",
      "Backer rod at depth:width 1:2 ratio required for joints > 6 mm wide",
      "Do not apply at temperatures below 5°C or above 40°C",
      "Not paintable in all colour variants — confirm paintability with Tremco technical for specific project colours",
    ],
    procurementSources: [
      { name: "Tremco Australia", url: "https://www.tremcosealants.com.au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia — Mapeflex PU40",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#be123c",
    name: "Mapei Mapeflex PU40 — Single-Component Polyurethane Sealant",
    descriptionLine: "1-component PU sealant — ±25% movement — external and internal masonry and concrete — Mapei national supply",
    productType: "Single-component polyurethane elastomeric sealant",
    filterTags: ["Movement-Joint", "Masonry-Joint", "Concrete-Joint", "Paintable", "External", "Internal"],
    techChips: [
      { label: "Mapei Mapeflex", cls: "bg-red-100 text-red-800" },
      { label: "±25% movement", cls: "bg-slate-100 text-slate-700" },
      { label: "Paintable", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription: "Mapei Mapeflex PU40 is a single-component polyurethane sealant for movement joint sealing and dormant crack surface sealing in settlement crack repair. The PU40 designation indicates a 40-grade polyurethane — suitable for moderate movement joints in masonry and concrete. Mapei provides a full sealant system including primer (Mapei Primer MF or equivalent) and joint design guidance. Mapeflex PU40 is paintable after cure and suitable for internal and external applications — making it a versatile choice for masonry walls repaired from settlement where a consistent paint finish is required over the repaired joint. Mapei has a broad Australian distribution network through building and specialist trade suppliers.",
    technicalProperties: [
      "Single-component PU — moisture-curing — paintable after cure",
      "Movement: ±25% of joint width",
      "Suitable for internal and external masonry and concrete joints",
      "Mapei Australia — national supply through trade distributors",
    ],
    limitations: [
      "Primer required — Mapei Primer MF or equivalent on masonry and concrete",
      "Backer rod required at correct depth:width ratio before sealant application",
      "Full cure required before painting — confirm cure time from Mapei TDS at ambient temperature",
      "Joint must be clean, dry, and dust-free before primer and sealant application",
    ],
    procurementSources: [
      { name: "Mapei Australia", url: "https://www.mapei.com/au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Parchem / DCP — Flowseal NF",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#78716c",
    name: "Parchem Flowseal NF — Self-Levelling Polyurethane Sealant",
    descriptionLine: "Self-levelling 1-component PU sealant — horizontal joints — dormant crack surface sealing — Parchem national supply",
    productType: "Single-component self-levelling polyurethane sealant",
    filterTags: ["Movement-Joint", "Concrete-Joint", "External", "Internal"],
    techChips: [
      { label: "Self-levelling", cls: "bg-stone-200 text-stone-800" },
      { label: "Horizontal joints", cls: "bg-slate-100 text-slate-700" },
      { label: "1-component PU", cls: "bg-stone-100 text-stone-700" },
    ],
    systemDescription: "Parchem Flowseal NF is a self-levelling single-component polyurethane sealant for horizontal joint sealing in settlement crack repair — floor joints, expansion joints in ground slabs, and horizontal crack surfaces in concrete and masonry at-grade elements. Self-levelling formulation flows into the joint profile without tooling, making it particularly suitable for horizontal expansion joints and dormant crack surface sealing in ground slabs adjacent to settlement-affected structures. Not suitable for vertical or overhead joints — use a non-sag PU sealant (Sikaflex-11FC+, Vulkem 116, Mapeflex PU40) for all vertical and overhead applications. Parchem supplies the product nationally with technical support.",
    technicalProperties: [
      "Self-levelling 1-component PU — no tooling required in horizontal joints",
      "Suitable for horizontal joints and floor expansion joints",
      "Moisture-curing PU — suitable for external and internal horizontal applications",
      "Parchem Australia — national supply and technical support",
    ],
    limitations: [
      "Horizontal joints only — not suitable for vertical or overhead applications",
      "Backer rod required at correct depth:width ratio before pouring",
      "Do not apply in horizontal joints subject to trafficked wheeled loads without confirming product load rating",
      "Not paintable in standard formulation — confirm with Parchem if a trafficable or paintable version is required",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
];

const FILTER_DEFS: { tag: FilterTag; label: string }[] = [
  { tag: "Movement-Joint", label: "Movement joint" },
  { tag: "Masonry-Joint", label: "Masonry substrate" },
  { tag: "Concrete-Joint", label: "Concrete substrate" },
  { tag: "Paintable", label: "Paintable after cure" },
  { tag: "External", label: "External use" },
  { tag: "Internal", label: "Internal use" },
];

const TECH_INFO = {
  typicalApplications: [
    "Sealing dormant settlement crack surfaces after structural repair is complete",
    "Movement joint sealing in masonry walls at locations of previous settlement cracking",
    "Joint sealing at control joints in concrete ground slabs adjacent to settlement-affected structures",
    "Surface sealing of repaired concrete retaining wall crack faces",
    "Horizontal joint sealing in concrete slabs at settlement crack locations (self-levelling grade)",
  ],
  selectionCriteria: [
    "For vertical joints in masonry and concrete walls: use non-sag PU sealant (Sikaflex-11FC+, Vulkem 116, Mapeflex PU40)",
    "For horizontal joints and floor joints: use self-levelling grade (Parchem Flowseal NF)",
    "Where painted finish over sealant is required: confirm sealant is paintable and use Sikaflex-11FC+ or Mapeflex PU40",
    "Joint depth:width ratio 1:2 — use backer rod to achieve correct geometry before sealant application",
    "Primer required on all masonry and concrete substrates — confirm primer type from sealant manufacturer",
  ],
  whenNotToUse: [
    "PU sealant is not a structural treatment — do not use as the sole treatment for a structural settlement crack without prior stitching or injection",
    "Do not apply PU sealant to a crack that is still actively moving beyond the ±25% movement limit — the sealant will fail in cohesion",
    "Do not apply without backer rod in joints wider than 6 mm — three-sided adhesion (bottom + two faces) prevents correct sealant movement",
    "Do not apply on a wet, dirty, or unprimed surface — adhesion failure occurs rapidly on contaminated substrates",
    "Do not use self-levelling sealant in vertical joints — it will flow out before cure",
  ],
  standardsNotes: [
    "AS 4654 — Waterproofing membranes for external above-ground use — sealant compatibility reference",
    "ISO 11600 — Building construction — jointing products — classification and requirements for sealants",
    "Joint design per AS 3700 (masonry) and AS 3600 (concrete) movement joint requirements",
    "Sealant manufacturer primer guides — confirm primer type for specific substrate before application",
    "Backer rod: closed-cell PE for PU sealants — open-cell PE or bond-breaker tape for silicone",
  ],
  suitableDefects: [
    "Surface sealing of dormant settlement crack repairs in masonry and concrete",
    "Movement joint sealing at expansion joints in walls and slabs adjacent to settlement areas",
    "Crack surface seal after helical bar stitching and lime mortar repointing in masonry",
    "Joint sealing at repaired concrete retaining walls and foundations",
    "Control joint sealing in concrete ground slabs after settlement movement has been treated",
  ],
  typicalSubstrates: [
    "Brick and masonry walls — vertical movement joints and dormant crack sealing",
    "Concrete walls, retaining walls, and foundations — crack surface sealing",
    "Concrete ground slabs — horizontal joints and expansion joint sealing",
    "Concrete masonry block walls — movement joint sealing",
    "Mixed masonry/concrete substrates at wall/slab junctions",
  ],
};

const SYSTEM_COMPARISON = [
  { product: "Sika Sikaflex-11FC+", orientation: "Vertical + horizontal", movement: "±25%", paintable: "Yes", use: "General masonry + concrete" },
  { product: "Tremco Vulkem 116", orientation: "Vertical + horizontal", movement: "±25%", paintable: "Variant-dependent", use: "Specification-grade external" },
  { product: "Mapei Mapeflex PU40", orientation: "Vertical + horizontal", movement: "±25%", paintable: "Yes", use: "Internal + external — paintable" },
  { product: "Parchem Flowseal NF", orientation: "Horizontal only", movement: "±25%", paintable: "No (standard)", use: "Floor and slab expansion joints" },
];

export function SealantsPUIntroSection() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-start gap-3 text-left">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700"><BookOpen size={16} /></div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-extrabold text-sky-950">PU sealants in settlement crack repair — surface sealing after structural treatment</h2>
            <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
          </div>
          <p className="mt-1 text-sm text-slate-500">When to apply sealant, joint geometry requirements, and primer rules</p>
        </div>
      </button>
      {open && (
        <div className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm leading-7 text-slate-600">
          <p>PU sealant is the final step in settlement crack repair — applied after the structural repair sequence is complete (settlement dormant, stitching done, mortar or mortar fill applied). The sealant excludes water and debris from the repaired joint or crack surface, and accommodates minor residual thermal and moisture movement that will occur in the joint over the building's service life.</p>
          <p>PU sealant is not structural — it does not restore load transfer across the crack. Applying sealant as the only treatment for a structural settlement crack is incorrect and will result in ongoing cracking. The joint design must include: backer rod at 1:2 depth:width ratio, primer on masonry and concrete substrates, and sealant applied at the correct tooled profile. Joints wider than the sealant's movement limit require engineer review.</p>
        </div>
      )}
    </div>
  );
}

export function SealantsPUProductSection() {
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const [accordionOpen, setAccordionOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (tag: FilterTag) =>
    setActiveFilters((prev) => { const n = new Set(prev); n.has(tag) ? n.delete(tag) : n.add(tag); return n; });

  const filtered = activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter((p) => p.filterTags.some((t) => activeFilters.has(t)));

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir === "left" ? -420 : 420, behavior: "smooth" });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Filter:</span>
        {FILTER_DEFS.map(({ tag, label }) => (
          <button key={tag} onClick={() => toggleFilter(tag)} className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${activeFilters.has(tag) ? "border-red-700 bg-red-700 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-sky-400"}`}>{label}</button>
        ))}
        {activeFilters.size > 0 && <button onClick={() => setActiveFilters(new Set())} className="text-xs font-bold text-red-700 underline">Clear</button>}
      </div>

      <div className="relative">
        <button onClick={() => scroll("left")} className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm hover:bg-slate-50"><ChevronLeft size={16} /></button>
        <div ref={scrollRef} className="flex gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none]">
          {filtered.map((p) => (
            <div key={p.name} className="w-[380px] shrink-0 rounded-2xl border border-slate-200 bg-white overflow-hidden" style={{ borderTop: `4px solid ${p.accentColor}` }}>
              <div className="p-5">
                <a href={p.brandUrl} target="_blank" rel="noopener noreferrer" className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-sky-700">{p.fullLabel} ↗</a>
                <h3 className="text-sm font-extrabold leading-snug text-sky-950">{p.name}</h3>
                <p className="mt-1 text-xs text-slate-500">{p.descriptionLine}</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{p.productType}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.techChips.map((c) => <span key={c.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${c.cls}`}>{c.label}</span>)}
                </div>
                <CollapsibleDescription text={p.systemDescription} />
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <CollapsibleCardDetails
                    text=""
                    chips={p.filterTags.map((t) => ({ label: t.replace(/-/g, " "), cls: "bg-sky-50 text-sky-700" }))}
                  />
                </div>
                <div className="mt-3">
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">Technical properties</p>
                  <CollapsibleList items={p.technicalProperties} icon="check" limit={3} />
                </div>
                <div className="mt-3">
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">Limitations</p>
                  <CollapsibleList items={p.limitations} icon="x" limit={3} />
                </div>
                <div className="mt-3">
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">Procurement</p>
                  <CollapsibleSources sources={p.procurementSources} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => scroll("right")} className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm hover:bg-slate-50"><ChevronRight size={16} /></button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white">
        <button onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sky-700"><Layers size={16} /></div>
            <span className="text-sm font-extrabold text-sky-950">PU sealant technical reference</span>
          </div>
          <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform ${accordionOpen ? "rotate-180" : ""}`} />
        </button>
        {accordionOpen && (
          <div className="border-t border-slate-100 px-6 pb-6 pt-5">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <TechCard icon={<Layers size={14} />} title="Typical applications" items={TECH_INFO.typicalApplications} style="bullet" />
              <TechCard icon={<CheckCircle size={14} />} title="Selection criteria" items={TECH_INFO.selectionCriteria} style="check" />
              <TechCard icon={<AlertTriangle size={14} />} title="When NOT to use" items={TECH_INFO.whenNotToUse} style="warn" />
              <TechCard icon={<FileText size={14} />} title="Standards & notes" items={TECH_INFO.standardsNotes} style="bullet" />
              <TechCard icon={<SquareStack size={14} />} title="Suitable defects" items={TECH_INFO.suitableDefects} style="bullet" />
              <TechCard icon={<Ruler size={14} />} title="Typical substrates" items={TECH_INFO.typicalSubstrates} style="bullet" />
            </div>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-sm font-extrabold text-sky-950">PU sealant comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {["Product", "Orientation", "Movement", "Paintable", "Primary use"].map((h) => (
                  <th key={h} className="px-3 py-2.5 text-left font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SYSTEM_COMPARISON.map((row) => (
                <tr key={row.product} className="hover:bg-slate-50">
                  <td className="px-3 py-2.5 font-semibold text-sky-950">{row.product}</td>
                  <td className="px-3 py-2.5 text-slate-600">{row.orientation}</td>
                  <td className="px-3 py-2.5 text-slate-600">{row.movement}</td>
                  <td className="px-3 py-2.5 text-slate-600">{row.paintable}</td>
                  <td className="px-3 py-2.5 text-slate-600">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
