// ──────────────────────────────────────────────────────────────────────────────
// Penetrating silane sealer systems (penetrating damp). Hand-authored selection
// cards. Values from each product's manufacturer / AU source (cited per field).
// Values not stated → "CONFIRM — <field> not stated on <url>".
//
// appInfo comparison columns: Type · Active chemistry · Active content ·
// Form / carrier · Coverage / coats · Penetration / breathability · Standard ·
// Substrate.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Active chemistry", "Active content", "Form / carrier", "Coverage / coats", "Penetration / breathability", "Standard", "Substrate"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));

export const SILANE_SEALER_CARDS: RefCard[] = [
  {
    brand: "Wacker",
    rangeName: "Wacker SILRES BS 290",
    shortType: "Silane/siloxane water-repellent concentrate (site-diluted)",
    badges: [{ label: "100% active", tone: "navy" }, { label: "Concentrate", tone: "blue" }, { label: "Vapour-permeable", tone: "amber" }],
    appInfo: kp([
      "Silane/siloxane water-repellent concentrate (site-diluted)",
      "Silane/siloxane (solventless concentrate)",
      "100% active (concentrate)",
      "Concentrate — dilute 1:11–1:15 in hydrocarbon solvent, or 1:12 in alcohol",
      "Per dilution / substrate — CONFIRM (Wacker TDS)",
      "Penetrating; retains very high water-vapour permeability",
      "CONFIRM (Wacker TDS / EN 1504-2)",
      "Mineral, highly-alkaline substrates (concrete, masonry)",
    ]),
    bestFor: [
      "100%-active solventless silane/siloxane concentrate — diluted on site to a high-quality general-purpose water repellent for mineral / alkaline substrates",
      "Greatly lowers water absorption while the substrate retains very high water-vapour permeability (breathable)",
    ],
    avoidWhere: [
      "Use neat / undiluted — it is a concentrate; it must be diluted (1:11–1:15 hydrocarbon / 1:12 alcohol)",
      "On a wet substrate, or to fix cracks / failed mortar joints — it treats pore-level water repellency only",
    ],
    warnings: [
      "Confirm the correct dilution and solvent (1:11–1:15 hydrocarbon / 1:12 alcohol) and resulting coverage from the Wacker TDS",
      "Solvent dilution — confirm SDS / PPE and site management before specifying on occupied or confined-space sites",
    ],
    advanced: {
      description:
        "Wacker SILRES BS 290 is a solventless silicone concentrate based on a silane/siloxane mixture (100% active). It is diluted on site — 1:11 to 1:15 (by weight) in hydrocarbon solvent, or 1:12 in alcohol — to make a general-purpose water repellent for impregnating and priming mineral, highly-alkaline substrates. After application it reacts with atmospheric / pore moisture, liberating alcohol and generating the active ingredient, which greatly lowers water absorbency while the substrate retains very high water-vapour permeability. Confirm dilution, coverage and current AU supply with Wacker / the AU distributor.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Silane/siloxane water-repellent concentrate", source: "Wacker SILRES BS 290 TDS" },
        { label: "Active content", value: "100% active (concentrate)", source: "Wacker SILRES BS 290 TDS" },
        { label: "Dilution", value: "1:11–1:15 in hydrocarbon; 1:12 in alcohol (by weight)", source: "Wacker SILRES BS 290 TDS" },
        { label: "Breathability", value: "Retains very high water-vapour permeability", source: "Wacker SILRES BS 290 TDS" },
        { label: "Substrate", value: "Mineral, highly-alkaline (concrete, masonry)", source: "Wacker SILRES BS 290 TDS" },
        { label: "Coverage / standard", value: "CONFIRM — depends on dilution; confirm from the Wacker TDS" },
      ],
    },
  },
  {
    brand: "Remmers Australia",
    rangeName: "Remmers Funcosil SL",
    shortType: "Silane/siloxane hydrophobising impregnation (liquid)",
    badges: [{ label: "Silane/siloxane", tone: "navy" }, { label: "~7% active", tone: "blue" }, { label: "Solvent-based", tone: "rose" }],
    appInfo: kp([
      "Silane/siloxane hydrophobising impregnation (liquid)",
      "Silane/siloxane",
      "~7% by mass active",
      "Liquid; dearomatised-hydrocarbon carrier (density ~0.79; flash ~40 °C)",
      "Per substrate — CONFIRM coverage / coats (Remmers TDS)",
      "Penetrating; forms polysiloxane; weather- / UV-resistant",
      "WTA facade water repellent — CONFIRM EN 1504-2",
      "Limestone / mineral facades",
    ]),
    bestFor: [
      "Clear silane/siloxane impregnation (~7% active) that reacts with air humidity to form a UV- / weather-resistant polysiloxane — protects facades against driving rain",
      "Reduces dirt pickup and green discolouration on mineral facades and limestone",
    ],
    avoidWhere: [
      "On a wet substrate, or to address cracks / failed joints",
      "Where low-VOC is required — solvent (dearomatised hydrocarbon) carrier, flash point ~40 °C",
    ],
    warnings: [
      "Solvent-based (dearomatised hydrocarbon, flash ~40 °C) — confirm SDS / PPE before specifying on occupied sites",
      "Confirm coverage and the number of coats for the specific substrate from the Remmers Funcosil SL TDS",
    ],
    advanced: {
      description:
        "Remmers Funcosil SL is a clear, hydrophobising impregnation on a silane/siloxane base (~7% active by mass) in a dearomatised-hydrocarbon carrier (density ~0.79 g/cm³; flash point ~40 °C). It reacts with air humidity to form a water-repellent, UV- and weather-resistant polysiloxane, protecting facades against driving rain and reducing dirt and green discolouration — used on limestone and mineral facades. Confirm coverage, number of coats and current AU supply with Remmers Australia.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Silane/siloxane hydrophobising impregnation (liquid)", source: "Remmers Funcosil SL (remmers.com)" },
        { label: "Active content", value: "~7% by mass", source: "Remmers Funcosil SL" },
        { label: "Carrier", value: "Dearomatised hydrocarbons (density ~0.79; flash ~40 °C)", source: "Remmers Funcosil SL" },
        { label: "Action", value: "Forms UV/weather-resistant polysiloxane", source: "Remmers Funcosil SL" },
        { label: "Coverage / coats / EN 1504-2", value: "CONFIRM — confirm from the Remmers Funcosil SL TDS" },
      ],
    },
  },
  {
    brand: "Evonik (Protectosil)",
    rangeName: "Protectosil BHN",
    shortType: "100% silane water-repellent impregnation (solvent-free)",
    badges: [{ label: "100% silane", tone: "navy" }, { label: "Solvent-free / low-VOC", tone: "blue" }, { label: "Deep penetration", tone: "amber" }],
    appInfo: kp([
      "100% silane water-repellent impregnation (solvent-free)",
      "Isobutyltriethoxysilane (100% silane)",
      "100% active (no solvent)",
      "Neat liquid (solvent-free, low VOC)",
      "Per substrate — CONFIRM coverage (Evonik TDS)",
      "Very high penetration depth; chemically bonds to silica; breathable",
      "CONFIRM (Evonik / EN 1504-2)",
      "Concrete, clinker masonry, ceramic tiles",
    ]),
    bestFor: [
      "100% isobutyltriethoxysilane, solvent-free — very high penetration depth; chemically bonds to silica for a permanent, deep hydrophobic layer",
      "Low-VOC; suited to concrete and dense / clinker masonry, and as a chloride barrier in marine / coastal exposure",
    ],
    avoidWhere: [
      "On a wet substrate, or to address cracks / failed mortar joints",
      "Where a deeply-coloured or film-forming finish is required — it is a penetrating impregnation, dries invisible",
    ],
    warnings: [
      "Confirm coverage / application rate and the re-treatment interval from the Evonik Protectosil BHN TDS",
      "Substrate must be dry — confirm minimum dry period for the substrate and climate",
    ],
    advanced: {
      description:
        "Protectosil BHN (Evonik) is a 100% silane (isobutyltriethoxysilane) water-repellent impregnation with no solvent — it penetrates deeply and chemically bonds with silica in the substrate to form a permanent, deep hydrophobic layer that prevents water and water-borne contaminants entering. Low VOC and environmentally friendly, with very high penetration depth — suited to concrete, clinker masonry and ceramic tiles and to chloride-barrier (marine) applications. Confirm coverage, dry-substrate requirements and re-treatment interval with the Evonik Protectosil BHN TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "100% silane water-repellent impregnation (solvent-free)", source: "Evonik Protectosil BHN datasheet (2023)" },
        { label: "Active chemistry", value: "Isobutyltriethoxysilane (100% silane)", source: "Evonik Protectosil BHN" },
        { label: "VOC", value: "Low VOC; solvent-free", source: "Evonik Protectosil BHN" },
        { label: "Penetration", value: "Very high penetration depth; bonds to silica", source: "Evonik Protectosil BHN" },
        { label: "Substrate", value: "Concrete, clinker masonry, ceramic tiles", source: "Evonik Protectosil BHN" },
        { label: "Coverage / EN 1504-2", value: "CONFIRM — confirm from the Evonik Protectosil BHN TDS" },
      ],
    },
  },
];

export const SILANE_SEALER_SELECTORS = [
  { product_id: "wacker_silres_bs_290", category: "penetrating-silane-sealer-systems", type: "silane_siloxane_concentrate", active_pct: 100, form: "concentrate", dilution: "1:11-1:15 hydrocarbon / 1:12 alcohol", breathable: true, substrate: "mineral_alkaline", au_distributor: "Wacker (AU distributor)", source_tds_url: "https://www.wacker.com/h/en-us/medias/SILRES-BS-290-en-2020.12.02.pdf", confidence: "confirmed" },
  { product_id: "remmers_funcosil_sl", category: "penetrating-silane-sealer-systems", type: "silane_siloxane_impregnation", active_pct: 7, form: "liquid_solvent", carrier: "dearomatised_hydrocarbon", breathable: true, standard: ["WTA"], au_distributor: "Remmers Australia", source_tds_url: "https://en.remmers.com/en/conservation-restoration/funcosil-sl/p/000000000000060805", confidence: "confirmed" },
  { product_id: "protectosil_bhn", category: "penetrating-silane-sealer-systems", type: "silane_impregnation", active_pct: 100, chemistry: "isobutyltriethoxysilane", form: "liquid_solvent_free", voc: "low", penetration: "very_high", substrate: ["concrete", "clinker", "ceramic"], au_distributor: "Evonik (AU distributor)", source_tds_url: "https://www.arcat.com/datasheets/evonik/Protectosil_BHN_Datasheet_2023.pdf", confidence: "confirmed" },
];
