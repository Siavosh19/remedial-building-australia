"use client";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, BookOpen, Layers, Ruler, SquareStack, FileText } from "lucide-react";
import { CollapsibleList, CollapsibleDescription, CollapsibleSources, CollapsibleCardDetails, TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";

type FilterTag = "Non-Hydraulic" | "NHL-2" | "NHL-3.5" | "NHL-5" | "Pre-Blended" | "Heritage-Match";

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
    fullLabel: "Rockcote / BGC / Boral — Lime Putty",
    brandUrl: "https://www.boral.com.au",
    accentColor: "#0369a1",
    name: "Non-Hydraulic Lime Putty — Heritage Pointing Mortar Base",
    descriptionLine: "Calcium hydroxide lime putty — site-gauged with washed sand — pre-1920 soft brick and sandstone masonry",
    productType: "Non-hydraulic lime binder",
    filterTags: ["Non-Hydraulic", "Heritage-Match"],
    techChips: [
      { label: "Non-hydraulic", cls: "bg-sky-100 text-sky-800" },
      { label: "Site-gauged 1:2.5–1:3", cls: "bg-slate-100 text-slate-700" },
      { label: "Ca(OH)₂", cls: "bg-sky-50 text-sky-700" },
    ],
    systemDescription: "Non-hydraulic lime putty is the binder base for traditional gauged repointing mortars used in heritage brick, soft sandstone, and pre-1930 masonry where cement-based mortars are incompatible with the substrate. Supplied in sealed buckets and aged on site for several weeks in a gauging tub to reach full plasticity. Gauged on site with washed fine sand at 1:2.5 to 1:3 (lime:sand). The most important principle: the repointing mortar must always be softer and more permeable than the brick or stone being pointed — if the mortar is harder, movement and moisture cycling damages the brick face, not the joint. Non-hydraulic lime gains strength by carbonation (absorbing atmospheric CO₂), making it flexible and self-healing in lightly cracked joints over time. Rockcote (through BGC) and Boral supply lime putty nationally.",
    technicalProperties: [
      "Calcium hydroxide (Ca(OH)₂) — non-hydraulic lime putty",
      "Site-gauged: 1:2.5–1:3 lime:sand by volume",
      "Strength gained by carbonation — slow cure, inherently flexible",
      "Compatible with pre-1920 soft brick, sandstone, and limestone substrates",
    ],
    limitations: [
      "Slow set — protect from drying, rain, and frost for at least 7 days after application",
      "Not suitable below DPC or in continuously saturated conditions — use NHL in damp environments",
      "Do not add OPC — increases mortar strength above the brick's capacity and causes face spalling",
      "Match mortar colour to existing joint by test panel (minimum 3 weeks cure) before full application",
    ],
    procurementSources: [
      { name: "Rockcote / BGC", url: "https://www.bgccement.com.au" },
      { name: "Boral Australia", url: "https://www.boral.com.au" },
    ],
  },
  {
    fullLabel: "Boral / Hanson / BGC — NHL 2 / NHL 3.5 / NHL 5",
    brandUrl: "https://www.boral.com.au",
    accentColor: "#15803d",
    name: "Natural Hydraulic Lime (NHL 2 / NHL 3.5 / NHL 5) — Repointing Binder",
    descriptionLine: "NHL grades matched to brick hardness — sets hydraulically in damp conditions — Federation and inter-war brick masonry",
    productType: "Natural hydraulic lime binder",
    filterTags: ["NHL-2", "NHL-3.5", "NHL-5"],
    techChips: [
      { label: "NHL 2 / 3.5 / 5", cls: "bg-green-100 text-green-800" },
      { label: "Hydraulic set", cls: "bg-slate-100 text-slate-700" },
      { label: "EN 459-1 / AS 2701", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription: "Natural hydraulic lime (NHL) gains strength by hydraulic reaction with water as well as carbonation, providing more reliable early strength than non-hydraulic lime putty — critically, it sets in damp conditions, which is important where settlement-affected walls are exposed to rising damp or rainwater. Grade selection must match brick hardness: NHL 2 (weakest, most permeable) for very soft historic bricks (pre-1920); NHL 3.5 (most versatile — medium strength) for standard Federation and inter-war brick (approximately 1900–1950); NHL 5 (stronger) for denser post-1950 brick and concrete block. Mixed with washed sand 1:2.5 to 1:3. NHL is the most appropriate binder for the majority of Australian settlement crack repointing projects in masonry from the 1900–1960 period.",
    technicalProperties: [
      "NHL 2 ≤ 2 MPa / NHL 3.5 ≤ 5 MPa / NHL 5 ≤ 15 MPa — specify grade to match brick",
      "Sets hydraulically — reliable in damp and wet conditions",
      "1:2.5–1:3 NHL:washed sand — site-gauged",
      "Softer and more permeable than OPC — compatible with pre-1960 brick masonry",
    ],
    limitations: [
      "NHL 5 is too strong for soft historic bricks (pre-1920) — use NHL 2 or lime putty blends for these substrates",
      "Moist-cure for first 3 days — rapid drying from sun or wind causes shrinkage cracking before hydraulic set develops",
      "Rake out existing mortar to minimum 15 mm depth before repointing — shallow pointing over old mortar debonds",
      "Do not mix NHL with OPC — combined chemistry causes excessive early strength and defeats the purpose",
    ],
    procurementSources: [
      { name: "Boral Australia", url: "https://www.boral.com.au" },
      { name: "Hanson Australia", url: "https://www.hanson.com.au" },
      { name: "BGC Cement", url: "https://www.bgccement.com.au" },
    ],
  },
  {
    fullLabel: "Parex Australia — Limetech",
    brandUrl: "https://www.parex.com.au",
    accentColor: "#dc2626",
    name: "Parex Limetech — Pre-Blended NHL Repointing Mortar",
    descriptionLine: "TODO: owner confirm — Parex Limetech not confirmed on current Parex Australia website — verify current product name and availability",
    productType: "Pre-blended natural hydraulic lime mortar",
    filterTags: ["NHL-3.5", "Pre-Blended"],
    techChips: [
      { label: "Pre-blended", cls: "bg-red-100 text-red-800" },
      { label: "NHL 3.5 equiv.", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: confirm AU availability", cls: "bg-red-100 text-red-800" },
    ],
    systemDescription: "TODO: owner confirm — Parex Limetech could not be verified on the current Parex Australia website (parex.com.au — SSL error at time of verification). The Parex brand was acquired by Sika in 2019. Confirm with Parex Australia (or Sika's Australian operations) whether 'Limetech' is the current product name, the correct bag size, and current national availability before specifying. If confirmed, Limetech eliminates site-gauging variability by providing a factory-blended NHL 3.5 equivalent repointing mortar — add water only.",
    technicalProperties: [
      "Pre-blended NHL 3.5 equivalent — consistent batch-to-batch quality",
      "25 kg bags — water only addition on site, no site gauging",
      "Factory aggregate grading matched for Australian residential brick masonry",
      "Parex Australia — national trade supply",
    ],
    limitations: [
      "May not exactly match existing mortar colour and texture — always produce a test panel and gain approval before full installation",
      "Requires moist curing — do not allow to dry rapidly in wind or direct sun",
      "Not appropriate for very soft pre-1900 heritage bricks — consult Parex technical for bespoke formulations",
      "Over-addition of water reduces strength and increases shrinkage cracking",
    ],
    procurementSources: [
      { name: "Parex Australia", url: "https://www.parex.com.au" },
    ],
  },
  {
    fullLabel: "Site-Gauged — Custom Heritage Mortar Mix",
    brandUrl: "https://www.boral.com.au",
    accentColor: "#78716c",
    name: "Site-Gauged Lime Mortar — Custom Heritage-Matched Mix",
    descriptionLine: "Lime putty + NHL + locally sourced aggregate — colour and strength matched to existing joint by forensic analysis and test panel",
    productType: "Site-gauged custom lime mortar",
    filterTags: ["Non-Hydraulic", "NHL-2", "NHL-3.5", "Heritage-Match"],
    techChips: [
      { label: "Heritage-matched", cls: "bg-stone-200 text-stone-800" },
      { label: "Test panel req.", cls: "bg-amber-100 text-amber-800" },
      { label: "3-week cure panel", cls: "bg-stone-100 text-stone-700" },
    ],
    systemDescription: "For heritage masonry and cases where pre-blended products do not achieve a close colour and texture match to the existing mortar, site-gauged mortars are prepared using a combination of: non-hydraulic lime putty, NHL 2 or NHL 3.5 (for initial strength), and locally sourced washed sand matched to the colour and grading of the original joint. A test batch is applied to a 300 × 300 mm minimum test panel and allowed to cure for minimum 3 weeks before colour comparison under varying light conditions — lime mortar colour changes significantly during cure, so wet colour must not be used for approval. Final mix proportions are recorded and maintained across the entire project without substituting aggregate sources mid-project. Requires a qualified stonemason or lime mortar specialist. For heritage-listed buildings, the relevant heritage authority should confirm the mortar specification before commencement.",
    technicalProperties: [
      "Custom blend — lime putty + NHL + locally sourced aggregate matched to existing joint",
      "Test panel required — minimum 3 weeks cure before colour approval under varying light",
      "Mortar forensic analysis of existing joint recommended before blending",
      "Most accurate heritage colour and texture match — suitable for heritage-listed structures",
    ],
    limitations: [
      "Requires specialist knowledge — incorrect lime:aggregate ratio produces mortar too strong or too weak for the substrate",
      "Must not change aggregate source during project — quarry colour varies between batches",
      "Time-intensive — test panel and approval adds 3–4 weeks to programme",
      "Components sourced separately — lime putty, NHL, and aggregate from different suppliers",
    ],
    procurementSources: [
      { name: "Rockcote / BGC — lime putty", url: "https://www.bgccement.com.au" },
      { name: "Boral / Hanson — NHL binder", url: "https://www.boral.com.au" },
    ],
  },
];

const FILTER_DEFS: { tag: FilterTag; label: string }[] = [
  { tag: "Non-Hydraulic", label: "Non-hydraulic lime putty" },
  { tag: "NHL-2", label: "NHL 2 (softest)" },
  { tag: "NHL-3.5", label: "NHL 3.5 (versatile)" },
  { tag: "NHL-5", label: "NHL 5 (strongest)" },
  { tag: "Pre-Blended", label: "Pre-blended bag mortar" },
  { tag: "Heritage-Match", label: "Heritage colour match" },
];

const TECH_INFO = {
  typicalApplications: [
    "Masonry joint repointing in settlement-cracked brick walls after helical bar crack stitching",
    "Heritage brick wall mortar joint reinstatement in pre-1960 Federation and Victorian buildings",
    "Repointing sandstone and limestone masonry following settlement movement",
    "Lime mortar joint repair in heritage-listed masonry after structural crack repair",
    "Removal and replacement of old Portland cement pointing that has caused brick face spalling",
  ],
  selectionCriteria: [
    "Match mortar strength to brick hardness — mortar must always be weaker and more permeable than the brick",
    "NHL 2 for pre-1920 very soft historic bricks; NHL 3.5 for standard Federation brick (most common); NHL 5 for post-1950 hard brick and block",
    "Non-hydraulic lime putty for the softest heritage substrates and pre-1900 brick and stone",
    "Parex Limetech where consistent mix quality is the priority and exact heritage colour match is not mandatory",
    "Site-gauged mortar for heritage-listed buildings where colour and texture match to existing is a mandatory condition of approval",
    "Always produce a minimum 300 × 300 mm test panel, cure for 3 weeks, and obtain approval before commencing full works",
  ],
  whenNotToUse: [
    "Never use OPC or polymer-modified cementitious mortar in pre-1960 brick masonry — it is harder than the brick and forces movement into the brick face, causing spalling",
    "Never use lime mortars in concrete structural crack repair — use polymer-modified cementitious repair mortars for concrete",
    "NHL 5 is too strong for pre-1920 soft historic brick — use NHL 2 or non-hydraulic lime putty blends",
    "Do not apply lime mortar below 5°C without frost protection — fresh lime mortar destroyed by frost before carbonation or hydraulic set",
    "Shallow pointing over existing mortar without raking to minimum 15 mm is not acceptable — it debonds within months",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — governs masonry material requirements in Australian construction",
    "EN 459-1:2015 — Building lime — definitions, specifications, and conformity criteria for NHL grades",
    "Heritage Council of NSW / Heritage Victoria — lime mortar specification guidance for listed buildings",
    "ICOMOS Guidelines — lime mortar for heritage masonry repair (international best practice reference)",
    "BRE Digest 362 — Building Lime and its Uses (UK reference, broadly applicable to Australian practice)",
  ],
  suitableDefects: [
    "Settlement crack repointing in masonry walls after stitching with helical bars",
    "Stepped cracking through mortar joints in brick walls from differential foundation settlement",
    "Open and hollow mortar joints from previous incorrect Portland cement repointing",
    "Mortar joint deterioration in heritage brick, sandstone, and limestone masonry",
    "Cavity wall mortar joint reinstatement after wall tie replacement",
  ],
  typicalSubstrates: [
    "Pre-1960 heritage brick — soft, porous, low compressive strength",
    "Sandstone masonry — natural sandstone heritage buildings and retaining walls",
    "Limestone masonry — colonial-era limestone blockwork",
    "Double-brick and cavity brick masonry — Federation and inter-war residential construction",
    "Concrete masonry block — post-1950 hollow and solid block walls (NHL 5 grade)",
  ],
};

const SYSTEM_COMPARISON = [
  { product: "Lime putty (non-hydraulic)", binder: "Ca(OH)₂", strength: "< 1 MPa", setBasis: "Carbonation — slow", suited: "Pre-1920 soft brick, stone" },
  { product: "NHL 2", binder: "Natural hydraulic lime", strength: "≤ 2 MPa", setBasis: "Hydraulic + carbonation", suited: "Pre-1920 to 1930 brick" },
  { product: "NHL 3.5", binder: "Natural hydraulic lime", strength: "≤ 5 MPa", setBasis: "Hydraulic + carbonation", suited: "1900–1960 Federation brick" },
  { product: "NHL 5", binder: "Natural hydraulic lime", strength: "≤ 15 MPa", setBasis: "Primarily hydraulic", suited: "Post-1950 hard brick, block" },
  { product: "Parex Limetech", binder: "Pre-blended NHL 3.5", strength: "~5 MPa", setBasis: "Hydraulic", suited: "General residential repointing" },
];

export function LimeRepointingMortarsIntroSection() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-start gap-3 text-left">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700"><BookOpen size={16} /></div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-extrabold text-sky-950">Why lime mortar — and why cement mortar damages heritage brick</h2>
            <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
          </div>
          <p className="mt-1 text-sm text-slate-500">Mortar compatibility, NHL grade selection, and heritage repointing requirements</p>
        </div>
      </button>
      {open && (
        <div className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm leading-7 text-slate-600">
          <p>Bricks in pre-1960 Australian masonry are typically soft, highly porous, and were originally laid in lime mortar. When walls move from settlement, moisture cycling, or thermal expansion, the movement is designed to be accommodated by the mortar joints — the mortar cracks and weeps, while the bricks stay intact. If the original lime mortar is replaced with OPC or polymer-modified cementitious mortar, the mortar becomes harder and less permeable than the brick. Movement is now forced into the brick faces, which spall and delaminate. Moisture that would have evaporated through a permeable lime joint is forced through the face of the brick, causing face spalling and salt crystallisation damage.</p>
          <p>Natural hydraulic lime (NHL) is the correct material for all masonry joint repair in pre-1960 construction. NHL grade selection must match the hardness of the brick: NHL 2 for very soft pre-1920 bricks; NHL 3.5 for the majority of Federation and inter-war brick; NHL 5 for post-1950 harder brick and concrete block. The rule is simple and absolute: the mortar must always be weaker and more permeable than the substrate.</p>
        </div>
      )}
    </div>
  );
}

export function LimeRepointingMortarsProductSection() {
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
                {p.tdsUrl && <a href={p.tdsUrl} target="_blank" rel="noopener noreferrer" className="mb-2 flex items-center gap-1 text-[10px] font-semibold text-sky-600 hover:text-sky-800">TDS ↗</a>}
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
            <span className="text-sm font-extrabold text-sky-950">Lime mortar technical reference</span>
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
        <h3 className="mb-4 text-sm font-extrabold text-sky-950">Lime mortar strength selection guide</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {["Product", "Binder", "Strength class", "Set basis", "Suited to"].map((h) => (
                  <th key={h} className="px-3 py-2.5 text-left font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SYSTEM_COMPARISON.map((row) => (
                <tr key={row.product} className="hover:bg-slate-50">
                  <td className="px-3 py-2.5 font-semibold text-sky-950">{row.product}</td>
                  <td className="px-3 py-2.5 text-slate-600">{row.binder}</td>
                  <td className="px-3 py-2.5 text-slate-600">{row.strength}</td>
                  <td className="px-3 py-2.5 text-slate-600">{row.setBasis}</td>
                  <td className="px-3 py-2.5 text-slate-600">{row.suited}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
