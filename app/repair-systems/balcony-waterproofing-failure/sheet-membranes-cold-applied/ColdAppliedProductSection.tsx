"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { COLD_SHEET_CARDS } from "./coldSheetMembranesData";

const TECH_INFO = {
  typicalApplications: [
    "Undertile balcony / podium waterproofing with a heat-welded or self-adhesive sheet beneath tiles, pavers or decking",
    "Cold self-adhesive sheet over heat-sensitive substrates (insulation, timber) where an open flame cannot be used",
    "Loose-laid exposed butyl single-layer membranes on decks, roofs, gutters and box gutters",
    "Below-grade / subterranean tanking with self-adhesive butyl (HDPE-faced) sheet",
    "Base sheet of a multi-layer system over rough/uneven substrates or sound existing membranes",
  ],
  selectionCriteria: [
    "Match the sheet type to the duty — undertile heat-welded vs self-adhesive cold vs loose-laid exposed butyl vs base sheet",
    "Confirm whether the sheet is exposed-rated (UV) or non-exposed/undertile — they are not interchangeable",
    "Confirm the seam/lap method (heat-weld, self-adhesive lap, seam primer + tape) and that the installer is competent in it",
    "For heat-sensitive substrates (insulation, timber) specify a cold self-adhesive sheet — never a torch-applied system",
    "Confirm facing — fabric-faced sheets take direct finishes; HDPE-faced suit subterranean/multi-layer",
    "Confirm Class 2 (NCC) test evidence (AS 4858 / AS 4654) for the specific product before specifying",
  ],
  limitations: [
    "Undertile sheets are not exposed-trafficable without tiles/screed; exposed butyl is not for direct tile adhesion",
    "Heat-welded seams require trained installers and the correct equipment",
    "Base sheets require a cap/finish layer — they are not a standalone membrane",
    "Self-adhesive bond depends on substrate prep, primer and temperature — confirm against the TDS",
    "Flood test mandatory before tiling / overburden for wet-area / undertile sheets",
  ],
  standardsNotes: [
    "AS 4858 — Wet area membranes — for undertile sheet grades",
    "AS 4654.1 / .2 — Waterproofing membranes for external above-ground use — for exposed / external sheets",
    "AS 2904 — Damp-proof courses and flashings — referenced for some flashing-grade sheets",
    "AS/NZS 4020 — Products for use in contact with drinking water — for potable-water exposure (e.g. tanks)",
    "Class 2 (NCC) — specify only a sheet with current AU test evidence (CSIRO/BRANZ report or CodeMark)",
  ],
  suitableDefects: [
    "Balcony / podium waterproofing failure under tile or paver finishes",
    "Roof, deck and gutter leaks where an exposed loose-laid butyl sheet is appropriate",
    "Below-grade / subterranean water ingress (self-adhesive butyl tanking)",
    "Failed substrates needing a base sheet over rough/uneven surfaces or sound old membranes",
  ],
  typicalSubstrates: [
    "In-situ and precast concrete — primed per manufacturer requirements",
    "Heat-sensitive substrates — insulation panels and timber (cold self-adhesive only)",
    "Plywood and fibre-cement decking — confirm fixing and primer",
    "Sound existing membranes — confirm adhesion/compatibility for an overlay base sheet",
  ],
};

export function ColdAppliedIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are cold-applied sheet membranes?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Cold-applied sheet membranes are pre-formed waterproofing sheets installed without an open flame — self-adhesive bitumen/butyl sheets, heat-welded polypropylene-lined undertile sheets, loose-laid butyl single-layer membranes, and multi-layer base sheets. They suit heat-sensitive substrates (insulation, timber) and offer a consistent factory-controlled thickness. Selection turns on the sheet type and duty (undertile vs exposed vs subterranean vs base sheet), thickness, facing (fabric vs HDPE), seam/lap method, and the Class 2 (NCC) test evidence to AS 4858 / AS 4654.
        </p>
        <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <AlertTriangle size={14} className="mt-0.5 shrink-0 text-amber-600" />
          <p className="text-xs font-semibold leading-5 text-amber-800">
            Class 2 (NCC) — balconies, roofs &amp; podiums: specify only a sheet with current Australian test certification (see the &ldquo;Class 2 / NCC tested&rdquo; field on each card). A product with no value is unverified — not a substitute for a certified system.
          </p>
        </div>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Sheet type & duty (undertile heat-welded vs self-adhesive cold vs loose-laid exposed butyl vs multi-layer base sheet); thickness; facing (fabric vs HDPE vs none); seam/lap method (heat-weld, self-adhesive, seam primer + tape); exposed (UV) vs non-exposed/undertile vs subterranean; substrate (incl. heat-sensitive — cold only); Class 2 (NCC) test evidence to AS 4858 / AS 4654 / AS 2904. Confirm every value against the current AU manufacturer TDS.";

export function ColdAppliedProductSection() {
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

      <AutoProductReference products={[]} cards={COLD_SHEET_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Cold-applied sheet membranes" pruneEmptyFacts />
    </>
  );
}
