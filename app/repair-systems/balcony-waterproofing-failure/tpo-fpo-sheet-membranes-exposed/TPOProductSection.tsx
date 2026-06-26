"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { TPO_CARDS } from "./tpoMembranesData";

const TECH_INFO = {
  typicalApplications: [
    "Exposed roof and deck waterproofing with a heat-weldable FPO/TPO single-ply membrane",
    "Roofs and podiums requiring high heat / UV / ozone ageing resistance without a tile or paver finish",
    "Re-roofing over sound substrates with a mechanically-fixed or adhered single-ply",
    "Light-trafficable exposed decks where a welded single-ply suits",
  ],
  selectionCriteria: [
    "Confirm the membrane is exposure-rated (UV) — FPO/TPO single-ply is designed for direct exposure",
    "Confirm thickness/grade and the fixing method (mechanically fixed vs adhered) for the wind-uplift design",
    "Hot-air-welded seams are installer-critical — accredited applicators and seam testing are mandatory",
    "Confirm Class 2 (NCC) test evidence (BRANZ/CSIRO/CodeMark to AS 4654.1) for the specific product",
    "Confirm potable-water (AS/NZS 4020) where relevant (e.g. over tanks)",
  ],
  limitations: [
    "Hot-air-welded laps must be made and tested correctly — seam failure is the main risk",
    "Specialist accredited applicators only — not a general-trade install",
    "Not for direct tile adhesion / undertile wet-area duty",
    "Confirm wind-uplift design for mechanically-fixed systems",
  ],
  standardsNotes: [
    "AS 4654.1 / .2 — Waterproofing membranes for external above-ground use — core standard for exposed single-ply",
    "AS/NZS 4020 — Products for use in contact with drinking water — for potable exposure",
    "Class 2 (NCC) — specify only a sheet with current AU test evidence (BRANZ/CSIRO/CodeMark)",
    "FPO/TPO are thermoplastic polyolefin membranes — heat-weldable, halogen-free",
  ],
  suitableDefects: [
    "Exposed roof / deck membrane failure where a welded single-ply is appropriate",
    "UV-degraded exposed membranes needing a heat/UV-resistant replacement",
    "Large-area roof leaks suited to mechanically-fixed single-ply",
    "Re-roofing of aged systems with an accredited single-ply overlay",
  ],
  typicalSubstrates: [
    "In-situ and precast concrete decks — prepared per the system",
    "Insulation boards (warm roof) — mechanically fixed or adhered",
    "Sound existing membranes — confirm overlay suitability with the manufacturer",
    "Plywood / sheathing — confirm fixing and separation layer",
  ],
};

export function TPOIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are TPO / FPO exposed sheet membranes?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          TPO / FPO membranes are thermoplastic-polyolefin single-ply sheets, heat-welded at the laps, designed for direct exposure on roofs and decks with high resistance to heat, UV and ozone ageing. They are mechanically fixed or adhered and finished exposed (no tile or paver cover). Selection turns on thickness/grade, the fixing method and wind-uplift design, and the Class 2 (NCC) test evidence to AS 4654.1.
        </p>
        <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <AlertTriangle size={14} className="mt-0.5 shrink-0 text-amber-600" />
          <p className="text-xs font-semibold leading-5 text-amber-800">
            Class 2 (NCC) — roofs &amp; podiums: specify only a sheet with current Australian test certification (see the &ldquo;Class 2 / NCC tested&rdquo; field on each card). A product with no value is unverified.
          </p>
        </div>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Exposure rating (UV) — FPO/TPO is for direct exposure; thickness/grade; fixing method (mechanically fixed vs adhered) and wind-uplift design; hot-air-welded laps by accredited applicators; potable (AS/NZS 4020) where relevant; Class 2 (NCC) test evidence to AS 4654.1 (BRANZ/CSIRO/CodeMark). Confirm every value against the current AU manufacturer TDS.";

export function TPOProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setAccordionOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50"
        >
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">
              Applications, selection criteria, limitations, standards, suitable defects and substrates
            </p>
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

      <AutoProductReference products={[]} cards={TPO_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="TPO / FPO exposed sheet membranes" pruneEmptyFacts />
    </>
  );
}
