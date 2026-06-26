"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { SILOXANE_SEALER_CARDS } from "./siloxaneSealerData";

const TECH_INFO = {
  typicalApplications: [
    "Brick masonry facades with rain-driven penetrating damp — the primary application for siloxane and cream sealers in Australian Class 2 strata remediation",
    "External rendered masonry walls with penetrating damp where the render is sound but absorbing water through fine cracks and the porous render surface",
    "Heritage masonry facades — soft brick, sandstone, calcium silicate — where silane/siloxane cream is preferred over liquid for compatibility and penetration control",
    "Masonry walls with raked or open mortar joints where the joints are a primary pathway for rain-driven moisture ingress",
    "South-facing or wind-driven-rain-exposed facades of Class 2 strata buildings with chronic penetrating damp complaints from lower-level apartments",
  ],
  selectionCriteria: [
    "Silane/siloxane cream (Stormdry) is the best choice for brick masonry with open or raked mortar joints — the cream penetrates joints better than liquid products",
    "Where low VOC / odour is critical on an occupied site, confirm a low-odour / odourless variant (note: standard Funcosil SNL is solvent-based; a 'Funcosil SNL Odourless' variant exists)",
    "Solvent-based silane/siloxane (Sikagard-700 S) gives deeper penetration into concrete and dense masonry than water-based products — EN 1504-2 class I",
    "For heritage or heritage-adjacent masonry, confirm compatibility of the specific product with the substrate with the AU distributor or Remmers technical before specifying",
    "Confirm all other moisture pathways (cracking, failed mortar joints, window perimeter sealants, membrane failure) have been identified and addressed before applying a penetrating sealer",
  ],
  limitations: [
    "Penetrating siloxane / cream sealers treat moisture absorption through the intact masonry fabric — they do not waterproof cracks, failed joints or membrane penetrations",
    "Service life in aggressive coastal or pollution-affected environments may be shorter — confirm expected service life with the manufacturer for the exposure",
    "Liquid water-based / dilute products have lower penetration depth than higher-active or cream formulations in dense substrates — confirm suitability for dense concrete or engineering brick",
    "Re-treatment may be required after 5–15 years depending on exposure, substrate type and product selection",
  ],
  standardsNotes: [
    "AS 4548 — Guide to Long-Life Coatings for Concrete and Masonry — Australian standard for concrete and masonry protection systems",
    "EN 1504-2 — European standard for surface protection products for concrete — Sikagard-700 S is classified hydrophobic impregnation, penetration class I",
    "WTA Merkblatt guidelines — WTA Institute guidelines for penetrating damp and facade water repellency — referenced on Remmers products",
    "BBA Agrément certification — Stormdry Masonry Protection Cream holds BBA certificate 15/5198 (25-year durability statement)",
  ],
  suitableDefects: [
    "Penetrating damp through brick masonry facades — rain-driven moisture appearing as damp patches on internal walls corresponding to rain events",
    "Efflorescence and salt bloom on brick masonry facades driven by moisture cycling through the masonry fabric",
    "Damp mortar joints — mortar acting as the primary pathway for rain-driven moisture into cavity or solid brick walls",
    "Porous render absorbing rain — fine cracking and paint failure on external rendered facades caused by repeated wetting and drying",
  ],
  typicalSubstrates: [
    "Fired clay brick — standard Australian red brick — the primary substrate for siloxane and cream sealer treatment",
    "Calcium silicate brick — confirm product suitability with the manufacturer for this substrate type",
    "Sandstock and handmade brick — heritage brick — confirm product and application method for soft porous brick",
    "Mineral cement render — exterior render on masonry walls — confirm product compatibility and application rate for the render type",
    "Sandstone — confirm silane/siloxane compatibility with the specific sandstone type — some require specialist assessment",
  ],
};

export function SiloxaneSealerIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are penetrating siloxane &amp; cream sealer systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Penetrating siloxane and silane/siloxane cream sealers are clear water repellents for masonry facades with rain-driven penetrating damp. The larger siloxane molecule (and the cream form, which holds the active in place longer) suits brick masonry and open or raked mortar joints, lining the pores with a water-repellent silicone while keeping the wall vapour-permeable. Creams penetrate more deeply than thin liquids and are well suited to brick with poor joints.
        </p>
        <p>
          Like all penetrating sealers, they treat absorption through the intact masonry fabric only — they do not waterproof cracks, failed joints, perimeter sealants or membranes, which must be addressed first. Service life is finite (often 5–15 years depending on exposure), and re-treatment will eventually be needed. Confirm substrate compatibility, coverage and service life with the manufacturer.
        </p>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Confirm penetrating damp is the diagnosis (cracks / joints / sealants / membranes addressed first); the form (cream for brick with open joints; liquid for general facades); active chemistry & content; coverage and number of coats; that the wall stays vapour-permeable; VOC / odour for occupied sites; certification (EN 1504-2 / BBA); and the re-treatment interval. Confirm every value against the current AU manufacturer TDS.";

export function SiloxaneSealerProductSection() {
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

      <AutoProductReference products={[]} cards={SILOXANE_SEALER_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Penetrating siloxane sealer systems" pruneEmptyFacts />
    </>
  );
}
