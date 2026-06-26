"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { SILANE_SEALER_CARDS } from "./silaneSealerData";

const TECH_INFO = {
  typicalApplications: [
    "External masonry facades with penetrating damp — brick veneer, concrete block and solid masonry wall panels in Australian Class 2 strata buildings",
    "Concrete wall panels, columns and beams below and at DPC level where moisture ingress through the concrete fabric is occurring",
    "Concrete elements in marine or coastal environments — a chloride barrier to reduce chloride-induced reinforcement corrosion",
    "Sandstone, calcium silicate brick and heritage masonry facades where surface film-forming coatings are inappropriate",
    "Masonry facades with mortar joint deterioration allowing rain penetration — applied in conjunction with mortar joint repointing",
  ],
  selectionCriteria: [
    "Confirm penetrating damp is the correct diagnosis — rule out membrane, joint, flashing and surface-crack failure before specifying a penetrating sealer",
    "Silane sealers are most effective on open-pore substrates — confirm substrate porosity; dense concrete and engineering brick may do better with a higher-active silane (Protectosil BHN)",
    "Solvent-based / 100%-active silane provides deeper penetration than dilute or water-based formulations — preferred for concrete and dense masonry",
    "The substrate must be completely dry for a minimum period before application — confirm the minimum dry period with the manufacturer for the substrate and climate",
    "Silane sealers do not address structural cracks, failed mortar joints, or membrane failure — confirm all other moisture pathways are addressed first",
  ],
  limitations: [
    "Penetrating silane sealers treat water repellency at the substrate pore level — they do not address cracking, joint failure or membrane failure",
    "The treatment is not permanent — service life depends on exposure, substrate porosity, UV and pollution — confirm expected service life and maintenance interval with the manufacturer",
    "Solvent-diluted / solvent-based products require careful handling — confirm current SDS, PPE and site management before specifying on occupied or confined-space sites",
    "Application to wet substrates significantly reduces penetration depth and efficacy — substrate dryness is mandatory",
  ],
  standardsNotes: [
    "AS 4548 — Guide to Long-Life Coatings for Concrete and Masonry — the primary Australian standard for concrete protection systems including penetrating sealers",
    "EN 1504-2 — Surface protection products for concrete — European product classification referenced on European manufacturer products",
    "WTA guidelines — WTA Merkblatt for facade water repellents — referenced on Remmers products",
    "CCAA data sheets — Cement Concrete and Aggregates Australia publications on concrete durability and protection",
  ],
  suitableDefects: [
    "Penetrating damp through masonry or concrete walls — rain-driven moisture penetrating through the pore structure of the wall fabric",
    "Efflorescence on masonry facades — mineral salt deposition driven by moisture movement through the masonry",
    "Damp patches on internal wall surfaces — corresponding to rain events on external masonry without membrane or film-coating damage",
    "Chloride ingress into concrete — elements in marine / coastal environments where chloride-induced reinforcement corrosion is a risk",
  ],
  typicalSubstrates: [
    "Solid fired clay brick — standard red brick masonry facades — the most common substrate for penetrating silane treatment",
    "Concrete block masonry — confirm block porosity; dense blocks may require extended application or a different product",
    "Concrete — reinforced concrete panels, columns, walls and beams — confirm surface preparation",
    "Sandstone — confirm silane compatibility with the specific sandstone type — some require specialist assessment",
    "Calcium silicate brick — confirm silane suitability and application rate with the manufacturer",
  ],
};

export function SilaneSealerIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are penetrating silane sealer systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Penetrating silane sealers are clear water-repellent impregnations that soak into the pore structure of masonry and concrete and react with moisture to line the pores with a hydrophobic (water-repelling) silicone, without forming a surface film. Because they line rather than block the pores, the treated wall sheds rain-driven water but stays vapour-permeable (breathable). Silane (the smallest molecule) gives the deepest penetration — best for dense concrete and harder masonry.
        </p>
        <p>
          They treat penetrating damp at the pore level only — they do not seal cracks, failed mortar joints, flashing failures or membrane defects, which must be diagnosed and fixed first. The substrate must be dry, products range from 100%-active concentrates (diluted on site) to solvent-based and solvent-free impregnations, and the treatment is a maintenance item with a finite service life. Confirm dry-substrate requirements, coverage and service life with the manufacturer.
        </p>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Confirm penetrating damp is the diagnosis (rule out cracks / joints / flashings / membranes first); substrate porosity and dryness; active chemistry & content (silane depth; higher active for dense substrates); dilution / coverage / number of coats; that the wall stays vapour-permeable; VOC / solvent handling for occupied sites; and the maintenance interval (finite service life). Confirm every value against the current AU manufacturer TDS.";

export function SilaneSealerProductSection() {
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

      <AutoProductReference products={[]} cards={SILANE_SEALER_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Penetrating silane sealer systems" pruneEmptyFacts />
    </>
  );
}
