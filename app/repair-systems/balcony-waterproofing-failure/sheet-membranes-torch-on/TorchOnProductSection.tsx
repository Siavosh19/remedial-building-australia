"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { TORCH_ON_CARDS } from "./torchOnMembranesData";

const TECH_INFO = {
  typicalApplications: [
    "Multi-layer roof, podium and planter-box waterproofing with a torch-applied base sheet + mineral cap sheet",
    "Exposed UV roof/deck membranes (mineral-finished APP/SBS cap sheets)",
    "Re-roofing and remedial overlay of sound existing bitumen systems",
    "Box gutters, parapets and upstands within a bituminous system",
  ],
  selectionCriteria: [
    "Match the layer role — base/intermediate sheet (sand finish) vs exposed cap sheet (mineral/slate finish)",
    "APP (plastomeric — heat/UV) vs SBS (elastomeric — low-temperature flexibility) — choose for the climate and movement",
    "Confirm reinforcement (polyester, glass-fibre-stabilised, or combined) and thickness/weight for the duty",
    "Confirm the cap is UV-exposure rated; base sheets must be capped",
    "Never torch onto heat-sensitive substrates (insulation, timber) — use a cold self-adhesive base there",
    "Confirm Class 2 (NCC) test evidence (AS 4654.1) for the specific product before specifying",
  ],
  limitations: [
    "Open-flame application — hot-works permit, fire watch and trained installers are mandatory",
    "Not for heat-sensitive substrates without a cold base sheet",
    "Base sheets are not standalone — they require a cap/finish layer",
    "Sanded base sheets are not UV-exposure rated",
    "Imported systems — confirm current Australian distributor, grade and AS 4654 certification",
  ],
  standardsNotes: [
    "AS 4654.1 / .2 — Waterproofing membranes for external above-ground use — the core standard for these membranes",
    "AS 2904 — Damp-proof courses and flashings — referenced for some sheet/flashing grades",
    "EN 13707 / CE marking — appears on imported (European) membranes; it is not an Australian certification",
    "Class 2 (NCC) — specify only a sheet with a current AU test certificate (CSIRO/BRANZ report or CodeMark)",
  ],
  suitableDefects: [
    "Roof, podium and planter-box waterproofing failure under a bituminous overburden",
    "Failed/aged bitumen membranes requiring a torch-on overlay system",
    "Box gutter, parapet and upstand leaks within a bituminous roof",
    "UV-degraded exposed membranes needing a new mineral cap",
  ],
  typicalSubstrates: [
    "In-situ and precast concrete — primed per manufacturer requirements",
    "Sound existing bitumen membranes — confirm adhesion / overlay suitability",
    "Sheathing boards (non-combustible) — confirm fixing and primer",
    "Heat-sensitive substrates require a cold self-adhesive base first (never direct torch)",
  ],
};

export function TorchOnIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are torch-on (torch-applied) bitumen membranes?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Torch-on membranes are pre-formed modified-bitumen sheets melt-bonded to the substrate and to each other with a gas torch, normally built up in layers — a base/intermediate sheet plus an exposed cap sheet. The bitumen is modified either with APP (plastomeric — heat- and UV-tolerant) or SBS (elastomeric — better low-temperature flexibility), and reinforced with polyester and/or glass fibre. Selection turns on the layer role (base vs cap), APP vs SBS, reinforcement and thickness/weight, whether the cap is UV-exposure rated, and the Class 2 (NCC) test evidence to AS 4654.1.
        </p>
        <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <AlertTriangle size={14} className="mt-0.5 shrink-0 text-amber-600" />
          <p className="text-xs font-semibold leading-5 text-amber-800">
            Class 2 (NCC) — balconies, roofs &amp; podiums: specify only a sheet with current Australian test certification (see the &ldquo;Class 2 / NCC tested&rdquo; field on each card). EN/CE marking is a European mark, not an Australian certification.
          </p>
        </div>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Layer role (base/intermediate sand-finish vs exposed mineral cap); modifier (APP plastomeric vs SBS elastomeric); reinforcement (polyester / glass-fibre stabilised / combined); thickness or weight; UV-exposure rating; substrate (never torch on heat-sensitive — cold base required); Class 2 (NCC) test evidence to AS 4654.1 (a named CSIRO/BRANZ report or CodeMark — EN/CE is not AU certification). Confirm every value against the current AU manufacturer TDS.";

export function TorchOnProductSection() {
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

      <AutoProductReference products={[]} cards={TORCH_ON_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Torch-on bitumen membranes" pruneEmptyFacts />
    </>
  );
}
