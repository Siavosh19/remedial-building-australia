// ──────────────────────────────────────────────────────────────────────────────
// TDS-sourced spec data for the 5 polymer-modified repair mortar cards.
// LOCAL to this page only. Keyed by the original Product.name so the existing
// filter logic and AI_STAGE2 lookups continue to work unchanged.
//
// Every value below was read from the current AUSTRALIAN manufacturer/distributor
// TDS (sources cited per spec). status:
//   "sourced"      = real tested/published AU TDS value
//   "class-min"    = EN class designation (NOT a tested value)
//   "not-reported" = AU TDS located but does not publish this field
//   "unsourced"    = no AU TDS could be located for this field/product
// ──────────────────────────────────────────────────────────────────────────────

import type { SpecCardProduct } from "./SpecCard";

const SIKA_TDS = "Sika Australia PDS — April 2023 (v01.04–01.05)";
const ARDEX_TDS = "ARDEX Australia TDS — issued January 2025";
const FOSROC_REPAIR_TDS = "Parchem / Fosroc Australia TDS — October 2025";
const MAPEI_TDS = "Mapei Australia TDS — T40 308-10-2017(AUS) / T60 317-01-2019(AUS)";

export const SPEC_CARD_DATA: Record<string, SpecCardProduct> = {
  // ── 1. Sika MonoTop ─────────────────────────────────────────────────────────
  "Sika MonoTop Series — MonoTop-352NFG / MonoTop-612N / MonoTop-412NFG": {
    brand: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    name: "Sika MonoTop Series — 352NFG / 612N / 412NFG",
    productType: "Polymer-modified cementitious repair mortar range",
    gradeBadge: "EN 1504-3 · R3 / R4",
    accentColor: "#be123c",
    tdsReference: SIKA_TDS,
    specs: [
      { label: "EN 1504-3 class", value: "R3 (352NFG) · R4 (612N, 412NFG)", status: "sourced", note: "Declared class per Sika AU PDS. R3 min ≥25 MPa, R4 min ≥45 MPa are class minimums, not these tested values.", source: SIKA_TDS },
      { label: "Compressive 28d", value: "≈30 / ≈70 / ≈50", unit: "MPa", status: "sourced", note: "Tested AS 1478.2: 352NFG ~30, 612N ~70, 412NFG ~50 MPa.", source: SIKA_TDS },
      { label: "Flexural 28d", value: "≈6 / ≈9 / ≈8", unit: "MPa", status: "sourced", note: "Tensile strength in flexure, ASTM C348.", source: SIKA_TDS },
      { label: "Bond adhesion", value: "≥1.5 / >2.0 / >2.0", unit: "MPa", status: "sourced", note: "Tensile adhesion EN 1542 (352NFG / 612N / 412NFG).", source: SIKA_TDS },
      { label: "Max layer", value: "75 / 100 / 50", unit: "mm", status: "sourced", note: "Per layer: 352NFG 75, 612N 100, 412NFG 50 mm.", source: SIKA_TDS },
      { label: "Min layer", value: "4 / 5 / 6", unit: "mm", status: "sourced", source: SIKA_TDS },
      { label: "Pack size", value: "20", unit: "kg", status: "sourced", source: SIKA_TDS },
      { label: "Pot life", value: "~35 (612N) · ~40 (412NFG)", unit: "min", status: "sourced", note: "352NFG lists set times only (initial ~3 h).", source: SIKA_TDS },
      { label: "Application temp", value: "+5 to +30", unit: "°C", status: "sourced", note: "Ambient and substrate.", source: SIKA_TDS },
      { label: "Primer", value: "None required on well-prepared substrate", status: "sourced", note: "Optional Sika MonoTop-910 N or SikaTop Armatec 110 EpoCem.", source: SIKA_TDS },
      { label: "Corrosion inhibitor", value: "Yes (352NFG, 412NFG) · No (612N)", status: "sourced", note: "612N is only compatible with external Sika FerroGard inhibitors/anodes.", source: SIKA_TDS },
    ],
    strengths: [
      "MonoTop-352NFG — EN 1504-3 R3, tested ~30 MPa @28d, applies up to 75 mm/layer; bonding primer not required on a well-prepared, roughened substrate (Sika AU PDS)",
      "MonoTop-612N — EN 1504-3 R4 high-build, tested ~70 MPa @28d, single layer up to 100 mm; pot life ~35 min @23°C",
      "MonoTop-412NFG — EN 1504-3 R4 structural, tested ~50 MPa @28d, up to 50 mm/layer, with built-in corrosion inhibitor",
      "352NFG and 412NFG carry a built-in corrosion inhibitor; all grades are pre-bagged, mixed with clean water only",
      "MonoTop-352NFG is available through Bunnings nationally; other grades via Sika trade and Bayset",
    ],
    limitations: [
      "612N does NOT contain a corrosion inhibitor — it is only compatible with external Sika FerroGard inhibitors/anodes; specify rebar protection separately",
      "Do not apply over active or moving cracks — cured mortar is rigid and will re-crack under live movement",
      "Observe max single-layer thickness (352NFG 75 mm, 412NFG 50 mm, 612N 100 mm) — exceeding causes shrinkage cracking",
      "Apply only between +5°C and +30°C substrate/ambient (Sika AU PDS)",
      "412NFG is an R4 structural mortar, not a fine/cosmetic mortar — the cosmetic fairing coat is Sika MonoTop FC (0–3 mm, 15 kg)",
      "Protect fresh mortar from sun, wind and rain for at least 24 hours",
    ],
  },

  // ── 2. Ardex BR ───────────────────────────────────────────────────────────────
  "Ardex BR Series — BR 340 / BR 345 / Feather Finish": {
    brand: "ARDEX Australia",
    brandUrl: "https://ardexaustralia.com",
    name: "ARDEX BR Series — BR 340 / BR 345",
    productType: "Polymer-modified fibre-reinforced repair mortar range",
    gradeBadge: "EN 1504 · R3",
    accentColor: "#0369a1",
    tdsReference: ARDEX_TDS,
    specs: [
      { label: "EN 1504 class", value: "R3", status: "class-min", note: "AU TDS presents an 'EN 1504 R3 requirements' column (class minimums) alongside tested typical results. R3 is the class designation.", source: ARDEX_TDS },
      { label: "Compressive 28d", value: "30–40 (BR340) · 30–45 (BR345)", unit: "MPa", status: "sourced", note: "Typical tested result, EN 12190.", source: ARDEX_TDS },
      { label: "Flexural 28d", value: "~8", unit: "MPa", status: "sourced", note: "Typical tested result, EN 12190.", source: ARDEX_TDS },
      { label: "Bond adhesion", value: ">1.5", unit: "MPa", status: "sourced", note: "EN 1542; numerically equals the R3 minimum.", source: ARDEX_TDS },
      { label: "Resistivity", value: "<10,000 (BR340) · >15,000 (BR345)", unit: "Ω·cm", status: "sourced", note: "BR340 low (anode-compatible); BR345 high (potable-water compliant).", source: ARDEX_TDS },
      { label: "Max layer", value: "80", unit: "mm", status: "sourced", note: "Vertical, horizontal and overhead.", source: ARDEX_TDS },
      { label: "Min layer", value: "10", unit: "mm", status: "sourced", note: "Square edges — no feather-edging.", source: ARDEX_TDS },
      { label: "Pack size", value: "20", unit: "kg", status: "sourced", source: ARDEX_TDS },
      { label: "Pot life", value: "45–90", unit: "min", status: "sourced", source: ARDEX_TDS },
      { label: "Application temp", value: "5–35", unit: "°C", status: "sourced", note: "Do not apply at 5°C and falling.", source: ARDEX_TDS },
      { label: "Primer", value: "ARDEX WR Prime + BR 10 ZP (rebar)", status: "sourced", note: "EG 800 F epoxy for permanently damp substrates. NOT ARDEX P 51 (a flooring primer).", source: ARDEX_TDS },
      { label: "Corrosion inhibitor", value: "Yes (active)", status: "sourced", source: ARDEX_TDS },
    ],
    strengths: [
      "BR 340 — MICROTEC fibre-reinforced, polymer-modified R3 structural mortar; tested 30–40 MPa @28d; up to 80 mm vertical/horizontal/overhead",
      "BR 345 — high-resistivity (>15,000 Ω·cm) R3 mortar for higher chloride-risk; tested 30–45 MPa @28d; AS/NZS 4020 potable-water compliant",
      "Both carry an active corrosion inhibitor and are pre-bagged (20 kg), mixed with clean water",
      "Correct priming system is ARDEX WR Prime (substrate, wet-on-wet) plus ARDEX BR 10 ZP zinc-rich rebar primer",
      "BR 340 (low resistivity) is designed to work with ARDEX BRX 60 LO galvanic anodes",
    ],
    limitations: [
      "Minimum applied thickness 10 mm with squared edges — do not feather-edge",
      "BR 345 (high resistivity) must NOT be used with ARDEX BRX 60 LO galvanic anodes (per TDS limitations)",
      "Apply only between 5°C and 35°C; do not apply at 5°C and falling",
      "Do not use ARDEX P 51 as a repair bonding primer — it is a flooring primer; use ARDEX WR Prime",
      "ARDEX Feather Finish is a flooring smoothing compound, not a concrete repair mortar — do not specify it for structural spall repair",
      "Observe pot life 45–90 min; protect fresh mortar from rapid drying for at least 24 hours",
    ],
  },

  // ── 3. Fosroc Renderoc HB / FC ─────────────────────────────────────────────────
  "Fosroc Renderoc Series — Renderoc HB / Renderoc FC": {
    brand: "Fosroc / Parchem",
    brandUrl: "https://www.parchem.com.au",
    name: "Fosroc Renderoc Series — HB / HB40 / FC",
    productType: "Polymer-modified cementitious repair mortar range",
    gradeBadge: "Renderoc HB40 · EN 1504-3 R3",
    accentColor: "#7c2d12",
    tdsReference: FOSROC_REPAIR_TDS,
    specs: [
      { label: "EN 1504-3 class", value: "R3 (HB40) · none (HB, FC)", status: "sourced", note: "HB40 tested to R3 (EN 12190 / EN 1542). Plain HB and FC report to Australian Standards only — no EN class.", source: FOSROC_REPAIR_TDS },
      { label: "Compressive 28d", value: "28 (HB) · 38 (HB40)", unit: "MPa", status: "sourced", note: "HB tested AS 1478.2; HB40 tested EN 12190. FC not published.", source: FOSROC_REPAIR_TDS },
      { label: "Flexural 28d", value: "3.9 (HB) · 5.8 (HB40)", unit: "MPa", status: "sourced", note: "AS 1012.11.", source: FOSROC_REPAIR_TDS },
      { label: "Bond adhesion", value: "1.8 (no primer) / 2.5 (HB40 + HAR)", unit: "MPa", status: "sourced", note: "HB40 pull-off EN 1542. Plain HB does not publish a bond value.", source: FOSROC_REPAIR_TDS },
      { label: "Max layer", value: "80 (HB) · 40 (HB40) · 3 (FC)", unit: "mm", status: "sourced", note: "Vertical hand/trowel per layer; FC is a fairing coat.", source: FOSROC_REPAIR_TDS },
      { label: "Min layer", value: "10 (HB, HB40) · feather (FC)", unit: "mm", status: "sourced", source: FOSROC_REPAIR_TDS },
      { label: "Pack size", value: "20", unit: "kg", status: "sourced", source: FOSROC_REPAIR_TDS },
      { label: "Working life", value: "~20 (FC)", unit: "min", status: "sourced", note: "HB/HB40 report set times (initial 2–3 h), not a pot life in minutes.", source: FOSROC_REPAIR_TDS },
      { label: "Application temp", value: "5–35", unit: "°C", status: "sourced", note: "Not at 5°C and falling.", source: FOSROC_REPAIR_TDS },
      { label: "Primer", value: "Nitobond HAR + Nitoprime Zincrich (rebar)", status: "sourced", note: "Nitobond EP for immersed/permanently wet conditions. Nitobond SBR is not specified.", source: FOSROC_REPAIR_TDS },
      { label: "Corrosion inhibitor", value: "No integral — rebar via Nitoprime Zincrich", status: "sourced", note: "HB40 is compatible with Galvashield galvanic anodes.", source: FOSROC_REPAIR_TDS },
    ],
    strengths: [
      "Renderoc HB — general-purpose hand-applied structural mortar; tested 28 MPa @28d (AS 1478.2); up to 80 mm vertical / 50 mm overhead per layer",
      "Renderoc HB40 — EN 1504-3 R3; tested 38 MPa @28d (EN 12190), bond 1.8 MPa (no primer) / 2.5 MPa (with Nitobond HAR); compatible with Galvashield galvanic anodes",
      "Renderoc FC — fine 0–3 mm cosmetic fairing coat for blowholes and profiling; ~20 min working life",
      "Distributed nationally by Parchem (DuluxGroup) with strong on-site technical support",
      "Substrate primer is Nitobond HAR; reinforcement primed with Nitoprime Zincrich",
    ],
    limitations: [
      "Plain Renderoc HB carries no EN 1504-3 class — it is reported to Australian Standards only; specify Renderoc HB40 where an R3 classification is required",
      "Renderoc FC is a cosmetic fairing coat (≤3 mm) — not a structural repair mortar; use only over a sound structural repair",
      "Use Nitobond HAR (not Nitobond SBR) as the substrate primer; Nitobond EP only for immersed/permanently wet/barrier conditions",
      "No integral corrosion inhibitor in the mortar — protect exposed rebar with Nitoprime Zincrich",
      "Apply between 5°C and 35°C; do not apply at 5°C and falling",
      "The AU high-build range is named by strength (HB25 / HB40 / HB70) — 'Renderoc LA' is not an AU product name",
    ],
  },

  // ── 4. Mapei Mapegrout ─────────────────────────────────────────────────────────
  "Mapei Mapegrout Series — Mapegrout Thixotropic / Mapegrout SFR / Mapegrout Fine Fibre": {
    brand: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    name: "Mapei Mapegrout Series — T40 / T60",
    productType: "Fibre-reinforced cementitious repair mortar range",
    gradeBadge: "EN 1504-3 · R3 / R4",
    accentColor: "#1d4ed8",
    tdsReference: MAPEI_TDS,
    specs: [
      { label: "EN 1504-3 class", value: "R3 (T40) · R4 (T60)", status: "sourced", note: "Declared class per Mapei AU TDS.", source: MAPEI_TDS },
      { label: "Compressive 28d", value: ">40 (T40) · 60 (T60)", unit: "MPa", status: "sourced", note: "Tested EN 12190.", source: MAPEI_TDS },
      { label: "Flexural 28d", value: ">7 (T40) · 8 (T60)", unit: "MPa", status: "sourced", note: "Tested EN 196-1.", source: MAPEI_TDS },
      { label: "Bond adhesion", value: ">2.0", unit: "MPa", status: "sourced", note: "Direct tensile adhesion to concrete, EN 1542.", source: MAPEI_TDS },
      { label: "Max layer", value: "30–35 (T40) · 100 vert / 20 ceiling (T60)", unit: "mm", status: "sourced", note: "T60 to 100 mm vertical in multiple coats.", source: MAPEI_TDS },
      { label: "Min layer", value: "10 (T60)", unit: "mm", status: "not-reported", note: "T40 does not state a minimum thickness.", source: MAPEI_TDS },
      { label: "Pack size", value: "25", unit: "kg", status: "sourced", note: "Vacuum-packed bags.", source: MAPEI_TDS },
      { label: "Pot life", value: "~60", unit: "min", status: "sourced", note: "At +20°C.", source: MAPEI_TDS },
      { label: "Application temp", value: "+5 to +35", unit: "°C", status: "sourced", source: MAPEI_TDS },
      { label: "Primer", value: "None (SSD roughened substrate); Mapefer on rebar", status: "sourced", note: "No epoxy/slurry bond coat required. Rebar treated with Mapefer / Mapefer 1K.", source: MAPEI_TDS },
      { label: "Corrosion inhibitor", value: "Yes (T60 integral) · No (T40)", status: "sourced", note: "T60 contains organic corrosion inhibitors; T40 relies on Mapefer rebar treatment.", source: MAPEI_TDS },
    ],
    strengths: [
      "Mapegrout T40 — EN 1504-3 R3 thixotropic structural mortar; tested >40 MPa @28d; AS/NZS 4020 potable-water compliant; ~30–35 mm/layer",
      "Mapegrout T60 — EN 1504-3 R4, sulphate-resistant, fibre-reinforced; tested 60 MPa @28d; up to 100 mm vertical (multi-coat); contains integral organic corrosion inhibitors",
      "Bond strength >2 MPa to concrete (EN 1542); both 25 kg vacuum-packed, mixed with clean water",
      "Adhesion achieved on a roughened, water-saturated (SSD) substrate — no epoxy or slurry bond coat required",
      "Available through Mapei Australia trade and Bayset nationally",
    ],
    limitations: [
      "Reinforcement must be treated with Mapefer / Mapefer 1K before mortar application",
      "T40 has no integral corrosion inhibitor — rely on Mapefer rebar treatment; T60 carries the integral inhibitor",
      "Apply between +5°C and +35°C on a saturated-surface-dry, roughened substrate",
      "Pot life ~60 min @20°C — mix only what can be placed in time",
      "The current AU range is Mapegrout T40 / T60 (plus the steel-fibre SV Fiber) — there is no AU 'Mapegrout Thixotropic / SFR / Fine Fibre'; the fine cosmetic finish is Planitop Fine Finish",
      "Mapegrout SV Fiber (steel-fibre R4) is not published in an accessible AU TDS, so it is not represented in the specs above",
    ],
  },

  // ── 5. Fosroc Renderoc G ───────────────────────────────────────────────────────
  "Fosroc Renderoc G": {
    brand: "Fosroc / Parchem",
    brandUrl: "https://www.parchem.com.au",
    name: "Fosroc Renderoc G",
    productType: "Geopolymer acid/chemical-resistant repair & lining mortar",
    gradeBadge: "AS-tested · geopolymer (no EN class)",
    accentColor: "#0369a1",
    tdsReference: FOSROC_REPAIR_TDS,
    specs: [
      { label: "EN 1504-3 class", value: "Not classified (AS standards only)", status: "sourced", note: "AU TDS certifies to AS 1478.2 / AS 1012 and AS 4020; no EN 1504-3 R-class is declared.", source: FOSROC_REPAIR_TDS },
      { label: "Compressive 28d", value: "35", unit: "MPa", status: "sourced", note: "Tested AS 1478.2; retains 26 MPa after 8 weeks in 20% sulphuric acid.", source: FOSROC_REPAIR_TDS },
      { label: "Flexural 28d", value: "5.2", unit: "MPa", status: "sourced", note: "Tested AS 1012.11.", source: FOSROC_REPAIR_TDS },
      { label: "Bond adhesion", value: "Indirect tensile 4.0 @28d (AS 1012.10)", unit: "MPa", status: "not-reported", note: "No substrate pull-off/bond value published; indirect tensile reported instead.", source: FOSROC_REPAIR_TDS },
      { label: "Max layer", value: "80 vert / 50 overhead", unit: "mm", status: "sourced", note: "Single application without formwork.", source: FOSROC_REPAIR_TDS },
      { label: "Min layer", value: "10", unit: "mm", status: "sourced", source: FOSROC_REPAIR_TDS },
      { label: "Pack size", value: "20", unit: "kg", status: "sourced", note: "Yield ~10.2 L/bag.", source: FOSROC_REPAIR_TDS },
      { label: "Pot life", value: "3 min mix; do not use >35°C", status: "not-reported", note: "No pot life in minutes published; rapid set.", source: FOSROC_REPAIR_TDS },
      { label: "Application temp", value: "5–35", unit: "°C", status: "sourced", note: "Not below 5°C and falling; not above 35°C (premature set).", source: FOSROC_REPAIR_TDS },
      { label: "Primer", value: "Nitoprime Zincrich (rebar); SSD substrate", status: "sourced", note: "No bonding slurry; substrate saturated to SSD.", source: FOSROC_REPAIR_TDS },
      { label: "Corrosion inhibitor", value: "No integral — rebar via Nitoprime Zincrich", status: "sourced", source: FOSROC_REPAIR_TDS },
    ],
    strengths: [
      "New-generation geopolymer repair & lining mortar (fumed silica + slag + fly ash) for highly corrosive / chemical exposure — sewers, acid bunds, processing plants",
      "Tested 35 MPa @28d (AS 1478.2); retains 26 MPa after 8 weeks immersed in 20% sulphuric acid",
      "Acid / chemical resistant; AS 4020 potable-water compliant; up to 80 mm vertical / 50 mm overhead per layer",
      "Pre-bagged 20 kg (~10.2 L/bag); reinforcement protected with Nitoprime Zincrich where required",
    ],
    limitations: [
      "Renderoc G is a geopolymer acid-resistant mortar, not a general-purpose polymer-modified cementitious mortar — specify it for aggressive / chemical exposure, not as a default spall-repair mortar",
      "No EN 1504-3 R-class is declared — it is certified to Australian Standards only",
      "Rapid 3-minute mix; do not use above 35°C (premature setting) or below 5°C and falling",
      "No integral corrosion inhibitor — apply Nitoprime Zincrich to exposed reinforcement where a corrosion barrier is required",
      "Substrate must be saturated to a surface-saturated-dry (SSD) condition for 2–3 hours before application",
    ],
  },
};
