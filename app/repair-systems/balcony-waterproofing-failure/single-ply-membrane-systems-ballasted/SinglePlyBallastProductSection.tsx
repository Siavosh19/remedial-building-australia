"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { SINGLE_PLY_CARDS } from "../hdpe-sheet-membrane-systems/pvcSheetCards";

const TECH_INFO = {
  typicalApplications: [
    "Ballasted single-ply roof/podium systems — the membrane is loose-laid and held by ballast (pavers, gravel, or a green-roof/podium build-up)",
    "Inverted (protected-membrane) roofs and podiums with overburden over the single-ply",
    "Large-area commercial roofs where mechanical fixing is undesirable and ballast is available",
    "Re-roofing over sound substrates with a loose-laid accredited single-ply system",
  ],
  selectionCriteria: [
    "Confirm the ballast/overburden weight is adequate for wind uplift before specifying a loose-laid system",
    "Match the membrane to the install — loose-laid/ballasted-capable PVC single-ply (Wolfin IB, Cosmofin, Fatrafol, Sarnafil)",
    "Single-ply systems are installer-critical — accredited applicators and welded laps are mandatory",
    "Confirm Class 2 (NCC) test evidence (NATA/CSIRO/BRANZ/CodeMark to AS 4654.1) — EN 13956 / CE is not AU certification",
    "Confirm protection / separation layers between the membrane and the ballast/overburden",
    "Confirm the manufacturer/distributor warranty and the applicator accreditation it depends on",
  ],
  limitations: [
    "Ballast must be designed for wind uplift — a loose-laid membrane relies on it",
    "Accredited applicators only — welded laps must be made and tested correctly",
    "EN 13956 / CE marking is European — confirm Australian AS 4654 certification separately",
    "Overburden/ballast must be separated/protected from the membrane",
    "Warranties typically depend on accredited installation and inspection",
  ],
  standardsNotes: [
    "AS 4654.1 / .2 — Waterproofing membranes for external above-ground use — for exposed/ballasted single-ply",
    "AS 4858 — Wet area membranes — referenced for some PVC sheet systems",
    "EN 13956 — European single-ply membrane standard (CE) — not an Australian certification",
    "NATA — Australian test accreditation (e.g. Wolfin/Cosmofin NATA-tested)",
    "Class 2 (NCC) — specify only a sheet with current AU test evidence (NATA/CSIRO/BRANZ/CodeMark)",
  ],
  suitableDefects: [
    "Ballasted / inverted roof and podium membrane failure",
    "Green-roof and planter-box waterproofing under overburden",
    "Large-area roof leaks suited to loose-laid ballasted single-ply",
    "Re-roofing where mechanical fixing is undesirable",
  ],
  typicalSubstrates: [
    "In-situ and precast concrete decks — prepared per the system",
    "Insulation boards (inverted / protected-membrane roof)",
    "Drainage / protection layers beneath ballast or overburden",
    "Sound existing membranes — confirm overlay suitability with the manufacturer",
  ],
};

export function SinglePlyIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are ballasted single-ply membrane systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Ballasted single-ply systems loose-lay a factory-made PVC sheet membrane and hold it down with ballast — pavers, gravel, or a green-roof/podium build-up — rather than mechanical fixings or full bonding. They suit inverted (protected-membrane) roofs and podiums where overburden is present. The membranes are the same accredited single-ply products used elsewhere; selection turns on ballast/uplift design, the install method, protection layers, and Class 2 (NCC) test evidence to AS 4654.1.
        </p>
        <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <AlertTriangle size={14} className="mt-0.5 shrink-0 text-amber-600" />
          <p className="text-xs font-semibold leading-5 text-amber-800">
            Class 2 (NCC) — balconies, roofs &amp; podiums: specify only a sheet with current Australian test certification (see the &ldquo;Class 2 / NCC tested&rdquo; field on each card). EN 13956 / CE marking is European, not an Australian certification.
          </p>
        </div>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Ballast / overburden design for wind uplift; membrane type (loose-laid/ballast-capable PVC single-ply); thickness; reinforcement; welded-lap install by accredited applicators; protection/separation layers under ballast; Class 2 (NCC) test evidence (NATA/CSIRO/BRANZ/CodeMark — not EN/CE); manufacturer warranty. Confirm every value against the current AU manufacturer/distributor TDS.";

export function SinglePlyBallastProductSection() {
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

      <AutoProductReference products={[]} cards={SINGLE_PLY_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Ballasted single-ply membrane systems" pruneEmptyFacts />
    </>
  );
}
