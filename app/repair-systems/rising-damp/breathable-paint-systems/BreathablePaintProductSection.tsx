"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { BREATHABLE_PAINT_CARDS } from "./breathablePaintData";

const TECH_INFO = {
  typicalApplications: [
    "External topcoat on masonry walls following completion of rising damp treatment — DPC injection + WTA renovation plaster + breathable render — final decorative and protective coating",
    "Breathable topcoat on heritage masonry facades where breathability is required to prevent moisture trapping",
    "Replacement of existing acrylic paint on external masonry walls affected by rising damp — stripping impermeable coating and replacing with a breathable mineral silicate paint",
    "Internal masonry wall topcoat on rising damp walls that have completed their primary drying phase after WTA renovation plastering",
  ],
  selectionCriteria: [
    "For heritage masonry or walls where maximum breathability is required, Keim Granital (potassium-silicate paint, Sd ≤ 0.01 m) is the technically superior choice",
    "Dulux Weathershield is an acrylic paint (not a mineral silicate) — it does not publish an Sd value and is not genuinely vapour-open; prefer a silicate paint (Keim Granital, Tikkurila Finngard Silicate) on a drying rising-damp wall",
    "Do not apply any paint — including breathable paint — to walls with active rising damp or in the early phase of drying after DPC injection — let the WTA renovation plaster complete its salt-management function first",
    "Confirm the vapour permeability (Sd value or EN 1062 class) of the selected product — a lower Sd value (more breathable) is always preferable on rising damp walls",
    "Breathable paint must not be applied over acrylic-contaminated substrates without stripping — the existing acrylic film prevents the new paint delivering its breathability benefit",
  ],
  limitations: [
    "Breathable paint is the final step in rising damp treatment — it does not treat rising damp itself — DPC injection + renovation plaster must have been completed first",
    "Breathable paint does not prevent rising damp — it only allows vapour to escape through the topcoat during the drying-out period",
    "Even the most breathable paint has some vapour resistance — walls require 6–24 months to dry fully after treatment — redecoration too early will trap residual moisture",
    "Acrylic 'micro-porous' paints have much higher vapour resistance than mineral silicate paints — confirm suitability for the drying stage with the manufacturer",
  ],
  standardsNotes: [
    "EN 1062-1 — Classification of coating materials for exterior masonry — includes vapour permeability classes (V1/V2/V3) — confirm classification of the selected product",
    "ISO 7783 — Water vapour transmission rate classification for coatings — Sd value (equivalent air layer thickness) — lower Sd value = more breathable",
    "AS/NZS 2311 — Guide to the Painting of Buildings — Australian painting and coating reference standard",
    "WTA 2-9-04 — renovation plaster standard — indirectly governs topcoat requirements through the system vapour permeability requirements during drying",
  ],
  suitableDefects: [
    "Failed acrylic paint on external masonry — blistering, peeling, salt bloom under paint film — caused by moisture trapping under impermeable topcoat on rising damp walls",
    "Salt efflorescence through paint on lower internal or external walls — symptom of salt crystallisation beneath non-breathable paint on rising damp walls",
    "Final decoration of rising damp remediation works — after DPC injection + renovation plaster + render system has been completed and the wall is in later-stage drying",
  ],
  typicalSubstrates: [
    "Mineral render (Parex Monorex, NHL / silicate render) — external face — suitable for silicate or mineral paint topcoat",
    "WTA renovation plaster (Remmers SP) — internal face — confirm breathable paint compatibility with manufacturer",
    "Masonry (brick, blockwork, sandstone) — direct application — confirm surface preparation with manufacturer",
    "Cement render — confirm compatibility — cement render is a mineral substrate compatible with silicate paint",
  ],
};

export function BreathablePaintIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are breathable paint systems for rising damp remediation?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Breathable paint systems are the final topcoat applied to masonry walls after rising damp remediation. Their role is to provide colour, surface protection and weather resistance while remaining vapour-permeable — allowing the wall to continue releasing moisture during the drying-out period without trapping it beneath an impermeable film.
        </p>
        <p>
          Standard acrylic and vinyl masonry paints have low vapour permeability (high Sd values) and are not appropriate for use on walls in the active drying phase after DPC injection and renovation plastering. Applying a non-breathable topcoat traps residual moisture within the wall, accelerates salt crystallisation at the paint-render interface, and typically causes paint failure within 12–24 months through blistering, peeling and efflorescence.
        </p>
        <p>
          Mineral silicate paint (Keim Granital, Sd ≤ 0.01 m) is the most breathable topcoat available — it chemically bonds to mineral masonry substrates rather than forming a film, giving it very high vapour transmission. Other silicate facade paints (Tikkurila Finngard Silicate) are equivalent mineral options. Standard acrylic masonry paints marketed as "micro-porous" (e.g. Dulux Weathershield) are not genuinely vapour-open and should not be relied on over a drying rising-damp wall.
        </p>
      </div>
      <div className="mt-5 space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Do not confuse with:</p>
        <ul className="space-y-1.5">
          {[
            "Standard acrylic masonry paint — not genuinely breathable — not suitable over rising damp walls or walls in the drying-out phase",
            "Breathable renders (Parex Monorex, Keim silicate render) — a render system — not a paint — see the breathable render page",
            "WTA renovation plasters (Remmers SP) — internal salt-resistant replastering system — different role — see the salt-resistant plaster page",
            "Waterproof masonry paint — specifically formulated to prevent water ingress — typically low vapour permeability — not appropriate for rising damp walls",
            "Crystalline waterproofing slurries — active waterproofing products — not a decorative paint system",
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
  "Confirm the paint is genuinely vapour-permeable (mineral silicate Sd ≤ ~0.01 m — never rely on acrylic 'micro-porous' over a drying wall); binder (silicate vs acrylic) and EN 1062 / ISO 7783 Sd class; mineral-substrate compatibility and the coordinated primer; that it is applied only after the wall has completed primary drying; and that no acrylic film remains on the substrate. Confirm every value against the current AU manufacturer TDS.";

export function BreathablePaintProductSection() {
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

      <AutoProductReference products={[]} cards={BREATHABLE_PAINT_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Breathable paint systems" pruneEmptyFacts />
    </>
  );
}
