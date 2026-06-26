"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { BREATHABLE_RENDER_CARDS } from "./breathableRenderData";

const TECH_INFO = {
  typicalApplications: [
    "External render replacement on masonry walls after rising damp treatment — applied after DPC injection and internal WTA renovation plastering",
    "Breathable external render over masonry walls still drying after rising damp treatment — to allow vapour escape from the wall",
    "Heritage building external render replacement where soft masonry requires a compatible lime or silicate render system",
    "New external render over solid masonry apartments where the existing render is salt-contaminated and has failed due to rising damp",
  ],
  selectionCriteria: [
    "All breathable renders for rising damp remediation must be vapour-permeable — do not use acrylic or polymer-modified renders over walls still drying after DPC injection",
    "For standard brick veneer or concrete block external walls, a through-coloured mineral render provides a cost-effective breathable solution",
    "For heritage masonry (sandstone, soft brick, traditional lime mortar) silicate render (Keim) or lime render (NHL) is more appropriate than Portland cement or acrylic render",
    "Where a single-manufacturer WTA rising damp system is required, select a lime-based render for the external face coordinated with the internal system",
    "Confirm substrate compatibility — mineral and lime renders cannot be applied over acrylic or polymer-modified paints or renders without stripping the existing coating",
  ],
  limitations: [
    "Breathable renders for rising damp remediation should not be topcoated with impermeable acrylic paints — this defeats the purpose of using a breathable render",
    "Breathable render does not substitute for internal WTA renovation plaster — the external and internal plaster systems serve different roles in the rising damp treatment sequence",
    "Old contaminated external render must be stripped before applying new breathable render — applying over contaminated old render does not prevent failure",
    "Walls must continue to dry after treatment — confirm expected drying timelines with manufacturer and building pathologist before redecoration with any non-breathable finish",
  ],
  standardsNotes: [
    "WTA 2-9-04 — renovation plaster standard — primarily governs internal plasters — external renders are not classified under WTA 2-9-04 but breathability requirements are parallel",
    "AS/NZS 2311 — Guide to the Painting of Buildings — Australian painting and coating reference standard",
    "EN 998-1 — European standard for rendering and plastering mortars — referenced by European manufacturers including Parex and Keim",
    "ICOMOS guidelines for heritage masonry — relevant for heritage building applications — confirm compatibility with Heritage NSW / relevant state body before specifying on heritage listed buildings",
  ],
  suitableDefects: [
    "External render failure on masonry walls with rising damp — spalling, delamination or salt efflorescence of existing external render",
    "Salt contamination in external render — white salt bloom or crystallisation damage to existing render on lower external wall sections",
    "Existing acrylic render applied over rising damp walls — causing moisture trapping, blistering and render failure",
  ],
  typicalSubstrates: [
    "Solid brick masonry — external face — after stripping existing contaminated render",
    "Sandstone masonry — heritage — confirm product compatibility and preparation requirements",
    "Concrete blockwork — external face — confirm mechanical key and bonding requirements",
    "Calcium silicate brick — confirm substrate preparation with manufacturer",
    "Existing cement render undercoat — confirm compatibility before applying topcoat mineral or lime render",
  ],
};

export function BreathableRenderIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are breathable render systems for rising damp remediation?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Breathable render systems are vapour-permeable external render products used on the external face of masonry walls undergoing or following rising damp treatment. The defining property is vapour permeability — the render must allow moisture vapour to escape from the masonry substrate as the wall dries out after DPC injection treatment, rather than trapping it beneath an impermeable film.
        </p>
        <p>
          Mineral renders (cement-based), lime renders and silicate renders are all vapour-permeable. Acrylic renders and polymer-modified renders typically have significantly lower vapour permeability and are not appropriate for use on walls still drying after rising damp treatment. Applying an acrylic render to a rising damp wall traps moisture, accelerates salt crystallisation damage at the render surface, and causes premature render failure.
        </p>
        <p>
          For external rising damp walls, the treatment sequence is: DPC injection → old external render stripped → wall begins to dry → breathable mineral or lime render applied to external face → WTA renovation plaster applied to internal face. The breathable external render system allows the wall to continue drying through both faces during the post-treatment drying period.
        </p>
      </div>
      <div className="mt-5 space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Do not confuse with:</p>
        <ul className="space-y-1.5">
          {[
            "WTA renovation plasters (Remmers SP, Mape-Antique) — internal plasters for rising damp walls — different product category — see the salt-resistant plaster page",
            "Acrylic or polymer-modified renders — not breathable — not appropriate for rising damp walls — will trap moisture and fail",
            "Crystalline waterproofing slurries (Xypex, Vandex Super) — positive-side active waterproofing — not a breathable render for rising damp",
            "Breathable masonry paint (Keim Granital, silicate paint) — a topcoat coating — not a render system — see the breathable paint page",
            "Textured acrylic topcoat coatings — acrylic-based — not vapour permeable — not suitable over rising damp walls",
          ].map((item) => (
            <li key={item} className="flex gap-2.5 text-xs leading-5 text-slate-600">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Confirm the render is vapour-permeable (mineral / lime / silicate — never acrylic / polymer over a drying wall); the binder and breathability (µ / Sd); coordination with a breathable topcoat (no impermeable paint); the coat build / thickness and standard (EN 998-1); substrate compatibility (strip acrylic coatings first); and that it follows DPC injection with old salt-contaminated render removed. Confirm every value against the current AU manufacturer TDS.";

export function BreathableRenderProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <>
      {/* ── System Technical Reference ── */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setAccordionOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50"
        >
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable defects and substrates</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? (<>Hide detail <ChevronUp size={14} /></>) : (<>Show detail <ChevronDown size={14} /></>)}
          </div>
        </button>
        {accordionOpen && (
          <div className="border-t border-slate-100 px-7 pb-7 pt-6">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <TechCard icon={<Layers size={15} />} title="Typical Applications" items={TECH_INFO.typicalApplications} style="bullet" />
              <TechCard icon={<Ruler size={15} />} title="Selection Criteria" items={TECH_INFO.selectionCriteria} style="check" />
              <TechCard icon={<AlertTriangle size={15} />} title="When NOT to Use" items={TECH_INFO.limitations} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards & Notes" items={TECH_INFO.standardsNotes} style="bullet" />
              <TechCard icon={<CheckCircle size={15} />} title="Suitable Defects" items={TECH_INFO.suitableDefects} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="Typical Substrates" items={TECH_INFO.typicalSubstrates} style="bullet" />
            </div>
          </div>
        )}
      </div>

      <AutoProductReference products={[]} cards={BREATHABLE_RENDER_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Breathable render systems" pruneEmptyFacts />
    </>
  );
}
