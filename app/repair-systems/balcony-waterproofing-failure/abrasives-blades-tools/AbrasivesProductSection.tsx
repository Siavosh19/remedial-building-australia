"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { TOOLS_CARDS } from "./toolsData";

const TECH_INFO = {
  typicalApplications: [
    "Stripping tiles and removing thick adhesive beds from concrete balcony substrates",
    "Grinding/scarifying the concrete to the membrane's required surface profile (e.g. ICRI CSP 3–4)",
    "Saw-cutting tiles, chasing cracks and expansion joints, trimming edges",
    "Applying liquid-applied membranes and primers (rollers, trowels, squeegees)",
    "Substrate readiness and quality control (moisture meter, WFT comb gauge)",
  ],
  selectionCriteria: [
    "Match the shank/fit to the tool — SDS-Max vs SDS-Plus, M14 spindle, blade bore and max RPM",
    "Match the diamond bond to the concrete hardness (soft bond for hard/dense concrete)",
    "Achieve the surface profile the membrane TDS requires (CSP grade), not just 'clean'",
    "Match applicators to the membrane — solvent-resistant rollers, notch size for coverage/WFT",
    "Use measurement tools to the TDS — moisture limit and per-coat wet-film thickness",
  ],
  limitations: [
    "These are prep tools/consumables, not part of the waterproofing system — they don't waterproof",
    "Wrong shank/bore/RPM is a safety and performance failure — confirm against the tool",
    "Scarifiers and pointed chisels leave a coarse/cratered surface — re-grind before membrane",
    "Applying membrane over an out-of-spec (rough, dusty, damp) substrate causes adhesion failure",
    "Confirm exact dimensions, grades and ratings against the current supplier listing",
  ],
  standardsNotes: [
    "Surface profile commonly specified to ICRI CSP (per the membrane manufacturer's TDS)",
    "Dust control: dry grinding/cutting/chiselling generates respirable crystalline silica — WHS / Safe Work Australia silica controls (extraction + RPE)",
    "Moisture and WFT/DFT targets are taken from the membrane TDS",
    "Tool shank, bore and RPM ratings per the tool and accessory manufacturer",
  ],
  suitableDefects: [
    "Tiled balcony being stripped back to the slab for re-waterproofing",
    "Failed membrane / coating / screed requiring removal back to sound substrate",
    "Laitance, contamination or high spots preventing membrane adhesion",
    "Cracks and expansion joints needing chasing before treatment",
  ],
  typicalSubstrates: [
    "Concrete balcony, terrace and podium decks (tile removal, grinding)",
    "Tile, adhesive bed and sand-cement screed (stripping, scarifying)",
    "Prepared concrete ready for primer/membrane (measurement, application)",
    "Crack and expansion-joint lines (saw-cutting / chasing)",
  ],
};

export function AbrasivesIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are abrasives, blades &amp; tools (balcony prep)?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          These are the prep tools and consumables that get a balcony substrate ready for waterproofing — SDS-Max stripping blades and demolition chisels for tile and adhesive removal, diamond cup wheels, planetary grinders and scarifiers to achieve the membrane&apos;s required surface profile, diamond saw blades for cutting and chasing, rollers/trowels/squeegees for membrane application, and a moisture meter and wet-film gauge for quality control. They are commodity items, not part of the waterproofing system: selection turns on matching the shank/fit and RPM to the tool, the diamond bond to the concrete, the surface profile (CSP) and moisture/WFT targets to the membrane TDS, and controlling respirable silica dust throughout.
        </p>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Match shank/fit and RPM to the tool (SDS-Max vs SDS-Plus, M14 spindle, blade bore); diamond bond to the concrete hardness; surface profile to the membrane TDS (ICRI CSP); applicators to the membrane (solvent-resistant rollers, notch size); moisture limit and per-coat WFT/DFT to the membrane TDS; respirable-silica dust control (extraction + RPE) on all dry grinding/cutting/chiselling. These are prep tools, not the waterproofing system — confirm every value against the current supplier listing and the membrane TDS.";

export function AbrasivesProductSection() {
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
              <TechCard icon={<BookOpen size={15} />} title="Standards & Notes" items={TECH_INFO.standardsNotes} style="bullet" />
              <TechCard icon={<CheckCircle size={15} />} title="Suitable Defects" items={TECH_INFO.suitableDefects} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="Typical Substrates" items={TECH_INFO.typicalSubstrates} style="bullet" />
            </div>
          </div>
        )}
      </div>

      <AutoProductReference products={[]} cards={TOOLS_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Abrasives, blades & tools" pruneEmptyFacts />
    </>
  );
}
