"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { SILOXANE_LIQUID_DPC_CARDS } from "./siloxaneLiquidDPCData";

const TECH_INFO = {
  typicalApplications: [
    "Dense or low-porosity masonry where silane cream does not achieve full penetration depth across the wall cross-section",
    "Thick solid masonry walls (>350mm) where full width penetration must be confirmed under low pressure",
    "Rising damp in harder brick types — some Victorian-era bricks and engineering bricks have lower porosity than standard bricks",
    "Situations where injection pump equipment is available and pressure-controlled delivery is preferred",
  ],
  selectionCriteria: [
    "Siloxane liquid is preferred over cream for dense masonry substrates with low porosity where cream cannot penetrate the full wall width",
    "Silane cream (Dryzone, SikaMur InjectoCream-100) is more practical for standard porous masonry and small-scale works without pump equipment",
    "Confirm masonry porosity before selecting between cream and liquid — a simple water drop absorption test on the masonry gives a qualitative indication",
    "Liquid injection requires injection pump equipment — factor this into application cost and specifier requirements",
    "Both silane cream and siloxane liquid require the same follow-on treatment: plaster stripping and salt-resistant renovation plaster",
  ],
  limitations: [
    "Liquid injection requires sealed holes or downward-drilled holes to prevent product loss before curing",
    "Injection pump equipment required — increases application complexity compared to cream products",
    "Complete system: injection + plaster removal + salt-resistant renovation plaster + breathable topcoat — liquid injection alone is insufficient",
    "Rising damp diagnosis must be confirmed before injection — moisture meter testing across wall height required",
  ],
  standardsNotes: [
    "BS 6576 — Code of Practice for Design and Installation of Damp-Proofing Using Remedial Chemical Treatments — drilling specification and injection requirements",
    "WTA 2-6-99 — German WTA Institute standard for chemical injection DPC — referenced in Remmers system documentation",
    "Drilling specification varies by product — confirm hole diameter, spacing, angle and depth from the manufacturer TDS",
  ],
  suitableDefects: [
    "Rising damp in dense or hard brick masonry where silane cream DPC does not achieve full depth penetration",
    "Failed or absent physical DPC in dense masonry walls",
    "Rising damp in thick solid masonry walls where pressure injection ensures full width penetration",
  ],
  typicalSubstrates: [
    "Dense fired clay brick — lower porosity than standard brickwork — confirmed by poor water absorption on test",
    "Hard or semi-engineering brick — some Victorian and Edwardian-era commercial buildings",
    "Thick solid masonry walls (>350mm) where cream penetration depth may not reach the full wall width",
    "Calcium silicate brick — confirm porosity and suitability with manufacturer",
  ],
};

export function SiloxaneLiquidDPCIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are siloxane liquid DPC injection systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Siloxane liquid chemical DPC injection systems are low-viscosity fluid products injected under pressure into pre-drilled holes in masonry to create a hydrophobic damp-proof barrier against rising damp. The low viscosity of liquid siloxane products allows deeper penetration into dense or fine-pored masonry substrates compared to cream products, making them the preferred injection product where masonry porosity is lower than standard brickwork.
        </p>
        <p>
          The key distinction from silane cream DPC is the product consistency and application method. Liquid products require the injection holes to be drilled at a slight downward angle or sealed after injection to prevent the product from running out. Low-pressure injection equipment (hand pump or motorised pump) is typically required to achieve controlled dosing. This increases application complexity compared to cream products but ensures uniform distribution across the full wall width in dense masonry.
        </p>
        <p>
          Like all chemical DPC injection systems, liquid injection treats capillary rise only. Old salt-contaminated plaster must be stripped and replaced with WTA-compliant salt-resistant renovation plaster after injection. The wall must then be allowed to dry before any non-breathable finish is applied.
        </p>
      </div>
      <div className="mt-5 space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Do not confuse with:</p>
        <ul className="space-y-1.5">
          {[
            "Silane cream DPC injection (Dryzone, SikaMur InjectoCream-100) — cream consistency, no pump required, preferred for standard porous masonry",
            "Surface-applied siloxane water repellents (facade creams, masonry treatments) — surface treatment only, does not create a barrier within the wall",
            "Crystalline waterproofing injection (PU injection, acrylic injection) — used for active water ingress under pressure — not a rising damp DPC system",
            "Electro-osmotic damp proofing — different operating principle — confirm evidence base before specifying",
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
  "Confirm the damp mechanism is rising damp; masonry porosity (liquid siloxane suits dense / low-porosity masonry where cream under-penetrates); chemistry & form (silicification concentrate vs siloxane micro-emulsion) and dilution; pressure / pump injection with sealed or angled holes to prevent run-out; drilling spec per the manufacturer TDS / BS 6576 / WTA; mandatory follow-on — strip salt-contaminated plaster and replaster with salt-resistant renovation plaster. Confirm every value against the current AU manufacturer TDS.";

export function SiloxaneLiquidDPCProductSection() {
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
              <TechCard icon={<BookOpen size={15} />} title="Standards & Testing" items={TECH_INFO.standardsNotes} style="bullet" />
              <TechCard icon={<CheckCircle size={15} />} title="Suitable Defects" items={TECH_INFO.suitableDefects} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="Typical Substrates" items={TECH_INFO.typicalSubstrates} style="bullet" />
            </div>
          </div>
        )}
      </div>

      <AutoProductReference products={[]} cards={SILOXANE_LIQUID_DPC_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Siloxane liquid chemical DPC injection" pruneEmptyFacts />

      {/* ── Page-level warning callout ── */}
      <div className="rounded-2xl border border-red-200 bg-red-50 p-7">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-700 text-white"><AlertTriangle size={15} /></div>
          <h3 className="text-base font-extrabold text-red-900">Liquid injection without replastering is incomplete treatment — plaster failure will recur</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Liquid DPC injection creates a barrier to further capillary rise but does not remove salt contamination already present in the existing plaster",
            "Old plaster must be stripped to a minimum 300mm above the visible salt tide mark before replastering",
            "After injection and plaster removal, replaster with WTA-compliant salt-resistant renovation plaster — standard cement or gypsum plaster will fail in the presence of residual rising damp salts",
            "No non-breathable surface finish should be applied until the wall has fully dried — confirm drying period with a building pathologist",
          ].map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-red-900"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />{item}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
