"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { SALT_PLASTER_CARDS } from "./saltResistantPlasterData";

const TECH_INFO = {
  typicalApplications: [
    "Replastering internal ground-floor masonry walls after chemical DPC injection in Class 2 strata buildings and residential properties",
    "Managing ongoing salt crystallisation during the wall drying-out period after rising damp treatment",
    "Replastering after stripping existing salt-contaminated plaster on walls with a history of rising damp",
    "External render replacement on masonry walls with rising damp affecting the external face",
  ],
  selectionCriteria: [
    "WTA 2-9-04 certified renovation plaster is the correct specification where a formal rising damp treatment system is required — confirm WTA compliance with Remmers or Mapei technical",
    "Standard cementitious renders are not suitable as renovation plasters — they do not have the pore structure to tolerate salt crystallisation",
    "Gypsum plasters are not suitable over rising damp walls — gypsum dissolves in the presence of moisture and salts",
    "Confirm vapour permeability of the selected product — the renovation plaster must be breathable to allow the wall to dry during the post-treatment period",
    "Total renovation plaster system thickness matters — WTA specifies minimum thicknesses — confirm the system achieves minimum 20mm total plaster depth",
  ],
  limitations: [
    "Renovation plaster manages salt crystallisation during drying but does not permanently waterproof the wall — the underlying DPC injection must be correctly carried out",
    "Pre-wetting the substrate before application is typically required — confirm substrate preparation with manufacturer",
    "Renovation plaster will be wasted if applied without first stripping old contaminated plaster — old plaster must be removed before new plaster is applied",
    "Walls must be allowed to dry fully after treatment — drying can take 6–24 months depending on wall thickness, porosity and environmental conditions",
  ],
  standardsNotes: [
    "WTA 2-9-04 — WTA Institute standard for renovation plasters for masonry affected by rising damp and salts — the primary product classification standard for renovation plasters",
    "WTA 2-6-99 — companion standard for chemical DPC injection — defines the complete rising damp treatment system",
    "EN 998-1 — Specification for mortar for masonry: rendering and plastering mortar — type R = renovation mortar",
    "CSIRO technical publications on rising damp treatment — confirm current guidance with building pathologist",
  ],
  suitableDefects: [
    "Internal plaster failure at low level after rising damp treatment — blistering, spalling, loss of adhesion of existing plaster",
    "Replastering after rising damp treatment (DPC injection) — new plaster must be salt-resistant to manage residual salts during drying",
    "Salt efflorescence and white staining on lower internal walls — symptom of hygroscopic salt movement from rising damp",
  ],
  typicalSubstrates: [
    "Solid brick masonry — internal face — after stripping to masonry surface",
    "Calcium silicate brick — confirm surface preparation requirements with manufacturer",
    "Concrete blockwork — confirm compatibility and mechanical key requirements",
    "Sandstone masonry — confirm suitability and preparation requirements with manufacturer for soft substrates",
  ],
};

export function SaltResistantPlasterIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are renovating salt-resistant plaster systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Renovating salt-resistant plaster systems (also called WTA renovation plasters) are specialist replastering products designed for masonry walls drying out after rising damp treatment. They differ fundamentally from standard plasters in their pore structure — WTA renovation plasters are formulated with an enlarged pore matrix that accommodates salt crystallisation within the plaster body without surface spalling or failure.</p>
        <p>When a wall has been subject to rising damp over many years, the masonry and existing plaster become loaded with hygroscopic salts — primarily nitrates, chlorides and sulphates leached from the ground. Even after DPC injection stops further capillary rise, these salts remain in the wall fabric and continue to crystallise as the wall dries. Standard gypsum or Portland cement plasters cannot tolerate this salt environment and will fail rapidly through spalling, blistering and loss of adhesion.</p>
        <p>The WTA 2-9-04 renovation plaster standard defines the minimum pore volume, mechanical properties and salt tolerance required. Remmers SP renovation plasters are the most established WTA-compliant products in Australia, used as the follow-on plastering system after Remmers Kiesol or Kiesol C DPC injection.</p>
      </div>
      <div className="mt-5 space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Do not confuse with:</p>
        <ul className="space-y-1.5">
          {[
            "Standard gypsum plaster or cement render — not salt-resistant — will fail on rising damp walls",
            "Crystalline waterproofing slurries (Xypex, Vandex Super) — active waterproofing against hydrostatic pressure — not a renovation plaster",
            "Breathable renders (NHL lime, silicate render) — for exterior application — different product category",
            "Waterproof cementitious coatings — a surface barrier coating — not the same as a salt-tolerant renovation plaster with enlarged pore structure",
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
  "Confirm the renovation plaster follows a completed and cured chemical DPC injection (it manages residual salts during drying — it is not the damp treatment itself); WTA 2-9-04 / EN 998-1 type R classification and a salt-storing macroporous pore structure; vapour permeability (the wall must keep drying through the layer); system coats and minimum total thickness (WTA ≥20 mm); strip old plaster to ≥300 mm above the salt tide mark and remove all gypsum first; allow 6–24 months drying before non-breathable finishes. Confirm every value against the current AU manufacturer TDS.";

export function SaltResistantPlasterProductSection() {
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
            <p className="mt-0.5 text-xs text-slate-500">WTA 2-9-04 standard, pore structure, system sequence, salt tolerance and substrate requirements</p>
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
              <TechCard icon={<BookOpen size={15} />} title="Standards & Testing" items={TECH_INFO.standardsNotes} style="bullet" />
              <TechCard icon={<CheckCircle size={15} />} title="Suitable Defects" items={TECH_INFO.suitableDefects} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="Typical Substrates" items={TECH_INFO.typicalSubstrates} style="bullet" />
            </div>
          </div>
        )}
      </div>

      <AutoProductReference products={[]} cards={SALT_PLASTER_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Renovating salt-resistant plasters" pruneEmptyFacts />

      {/* ── Page-level warning callout ── */}
      <div className="rounded-2xl border border-red-200 bg-red-50 p-7">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-700 text-white"><AlertTriangle size={15} /></div>
          <h3 className="text-base font-extrabold text-red-900">Do not apply standard gypsum or cement plaster to rising damp walls — it will fail</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Gypsum plaster is soluble in the presence of moisture and salts — it will dissolve, swell and delaminate rapidly on a rising damp wall",
            "Standard Portland cement render is not salt-tolerant — it has insufficient pore volume to accommodate salt crystallisation and will spall and delaminate",
            "Only WTA 2-9-04 compliant renovation plasters (Remmers SP series or equivalent) have the confirmed pore structure to manage hygroscopic salt crystallisation during the wall drying-out period",
            "Stripping old plaster to masonry and replastering with standard materials without a WTA renovation plaster is the most common failure in rising damp remediation",
          ].map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-red-900"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />{item}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
