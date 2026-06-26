// ──────────────────────────────────────────────────────────────────────────────
// High-Build Repair Mortars — hand-authored selection cards (concrete spalling).
// Values from the CURRENT AUSTRALIAN manufacturer TDS; "CONFIRM …" = not stated
// on the cited AU source. Strength/layer values cross-checked with the same
// TDS-cited dataset used by the polymer-modified page.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["EN 1504-3 class", "Compressive @28d", "Max single-pass build", "Min layer", "Thixotropic V/OH", "Pack size"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] }));

export const HIGH_BUILD_CARDS: RefCard[] = [
  {
    brand: "Sika Australia",
    rangeName: "Sika MonoTop-612 N",
    shortType: "Polymer-modified high-build structural repair mortar (to 100 mm)",
    badges: [],
    appInfo: kp(["R4", "≈70 MPa", "100 mm single layer", "5 mm", "Yes (thixotropic)", "20 kg"]),
    bestFor: [
      "Deepest single-pass build here — EN 1504-3 R4 placed to 100 mm in one layer",
      "High strength — ~70 MPa @28d, silica-fume + polymer, low-permeability",
      "Vertical and overhead deep-spall reinstatement",
    ],
    avoidWhere: [
      "No integral corrosion inhibitor — provide separate rebar protection (Sika FerroGard / anode) where steel is exposed",
      "Do not exceed 100 mm per layer; substrate / ambient +5 to +30 °C",
      "Not over active or moving cracks",
    ],
    warnings: [
      "Pot life ~35 min @23 °C — mix only what can be placed in that time",
      "No integral inhibitor — confirm a separate rebar-protection step",
    ],
    advanced: {
      description:
        "Sika MonoTop-612 N is a one-component, silica-fume and polymer-modified high-build cementitious repair mortar (EN 1504-3 R4, ~70 MPa @28d) for deep-spall reinstatement up to 100 mm in a single layer on horizontal, vertical and overhead surfaces. It has no integral corrosion inhibitor — use with Sika FerroGard / anodes where rebar protection is required.",
      designCriteria: "",
      techData: [
        { label: "EN 1504-3 class", value: "R4", source: "aus.sika.com TDS" },
        { label: "Compressive @28d", value: "≈70 MPa (1d ~25 / 7d ~55)", source: "aus.sika.com TDS" },
        { label: "Max single-pass build", value: "100 mm", source: "aus.sika.com TDS" },
        { label: "Min layer", value: "5 mm", source: "aus.sika.com TDS" },
        { label: "Pot life", value: "~35 min @23 °C", source: "aus.sika.com TDS" },
        { label: "Corrosion inhibitor", value: "None integral", source: "aus.sika.com TDS" },
        { label: "Pack size", value: "20 kg", source: "aus.sika.com TDS" },
      ],
    },
  },
  {
    brand: "Fosroc / Parchem",
    rangeName: "Fosroc Renderoc HB",
    shortType: "Lightweight, polymer-modified high-build repair mortar (to 80 mm)",
    badges: [],
    appInfo: kp(["AS-tested (no EN class)", "28 MPa (AS 1478.2)", "80 mm V / 50 mm OH", "10 mm", "Yes (thixotropic)", "20 kg"]),
    bestFor: [
      "Lightweight high-build — placed to 80 mm vertical / 50 mm overhead per layer",
      "Fibre-reinforced; strong national Parchem technical support",
    ],
    avoidWhere: [
      "No EN 1504-3 class (reported to Australian Standards only) — specify Renderoc HB40 where an R3 class is required",
      "Do not apply without Nitobond HAR primer and Nitoprime Zincrich on exposed rebar",
      "Not over active or moving cracks",
    ],
    warnings: [
      "Primer mandatory — Nitobond HAR (substrate) + Nitoprime Zincrich (rebar)",
      "No integral corrosion inhibitor",
    ],
    advanced: {
      description:
        "Fosroc Renderoc HB is a lightweight, polymer-modified, fibre-reinforced high-build cementitious repair mortar (tested 28 MPa @28d, AS 1478.2) for hand application up to 80 mm vertical / 50 mm overhead per layer. It is reported to Australian Standards only (no EN class) — specify Renderoc HB40 where an R3 classification is required. Prime the substrate with Nitobond HAR and rebar with Nitoprime Zincrich.",
      designCriteria: "",
      techData: [
        { label: "EN 1504-3 class", value: "None (AS-tested only)", source: "fosroc.com.au TDS" },
        { label: "Compressive @28d", value: "28 MPa (AS 1478.2)", source: "fosroc.com.au TDS" },
        { label: "Max single-pass build", value: "80 mm vertical / 50 mm overhead", source: "fosroc.com.au TDS" },
        { label: "Min layer", value: "10 mm", source: "fosroc.com.au TDS" },
        { label: "Primer", value: "Nitobond HAR + Nitoprime Zincrich (rebar)", source: "fosroc.com.au TDS" },
        { label: "Pack size", value: "20 kg", source: "fosroc.com.au TDS" },
      ],
    },
  },
  {
    brand: "Fosroc / Parchem",
    rangeName: "Fosroc Renderoc HB40",
    shortType: "EN 1504-3 R3 high-build repair mortar (~45 MPa, to 40 mm)",
    badges: [],
    appInfo: kp(["R3", "~45 MPa", "40 mm", "10 mm — confirm", "Yes (thixotropic)", "20 kg"]),
    bestFor: [
      "The EN-classified Renderoc high-build — EN 1504-3 R3 at ~45 MPa for localised reinforced-concrete repair",
      "Vertical and overhead patching with Parchem system support",
    ],
    avoidWhere: [
      "Single-pass to 40 mm — for deeper sections use Renderoc HB (to 80 mm) or build up in coats",
      "Do not apply without Nitobond primer and Nitoprime Zincrich on exposed rebar",
      "Not over active or moving cracks",
    ],
    warnings: [
      "Primer mandatory — Nitobond (substrate) + Nitoprime Zincrich (rebar)",
      "Cure the patch per the TDS — curing is required to develop strength",
    ],
    advanced: {
      description:
        "Fosroc Renderoc HB40 is a polymer-modified, fibre-reinforced high-build cementitious repair mortar meeting EN 1504-3 Class R3 (~45 MPa), for localised repair of reinforced concrete on vertical and overhead surfaces up to 40 mm per pass. It is the EN-classified high-build option in the Renderoc range; prime the substrate with Nitobond and rebar with Nitoprime Zincrich.",
      designCriteria: "",
      techData: [
        { label: "EN 1504-3 class", value: "R3", source: "fosroc.com.au TDS" },
        { label: "Compressive @28d", value: "~45 MPa", source: "fosroc.com.au TDS" },
        { label: "Max single-pass build", value: "40 mm", source: "fosroc.com.au TDS" },
        { label: "Min layer", value: "CONFIRM (Parchem AU TDS)", source: "fosroc.com.au TDS" },
        { label: "Primer", value: "Nitobond + Nitoprime Zincrich (rebar)", source: "fosroc.com.au TDS" },
        { label: "Pack size", value: "20 kg", source: "fosroc.com.au TDS" },
      ],
    },
  },
  {
    brand: "Ardex Australia",
    rangeName: "Ardex BR 340",
    shortType: "MICROTEC fibre-reinforced high-build structural mortar with corrosion inhibitor",
    badges: [],
    appInfo: kp(["R3", "30–40 MPa @28d", "80 mm (V/H/OH)", "10 mm (square edges)", "Yes (thixotropic)", "20 kg"]),
    bestFor: [
      "Built-in rebar protection — MICROTEC fibre-reinforced with an active corrosion inhibitor",
      "High build to 80 mm on vertical, horizontal AND overhead surfaces",
      "Low-resistivity — compatible with discrete galvanic anodes (e.g. Ardex BRX 60 LO)",
    ],
    avoidWhere: [
      "Low-resistivity — not where high electrical resistivity is required (use the high-resistivity BR 345)",
      "Minimum 10 mm with square edges — not for feather-edging",
      "Not over active or moving cracks",
    ],
    warnings: [
      "Min 10 mm, square edges — no feather edge",
      "Compatible with Ardex BRX 60 LO anodes — confirm CP design",
    ],
    advanced: {
      description:
        "Ardex BR 340 is a MICROTEC fibre-reinforced, polymer-modified high-build structural repair mortar (EN 1504-3 R3, 30–40 MPa @28d) for hand application up to 80 mm on vertical, horizontal and overhead surfaces, with an active corrosion inhibitor. It is a low-resistivity mortar, compatible with discrete galvanic anodes; minimum 10 mm with square edges.",
      designCriteria: "",
      techData: [
        { label: "EN 1504-3 class", value: "R3", source: "ardexaustralia.com TDS (Jan 2025)" },
        { label: "Compressive @28d", value: "30–40 MPa", source: "ardexaustralia.com TDS (Jan 2025)" },
        { label: "Max single-pass build", value: "80 mm (vertical / horizontal / overhead)", source: "ardexaustralia.com TDS (Jan 2025)" },
        { label: "Min layer", value: "10 mm (square edges)", source: "ardexaustralia.com TDS (Jan 2025)" },
        { label: "Corrosion inhibitor", value: "Yes (active); low-resistivity (anode-compatible)", source: "ardexaustralia.com TDS (Jan 2025)" },
        { label: "Pack size", value: "20 kg", source: "ardexaustralia.com TDS (Jan 2025)" },
      ],
    },
  },
  {
    brand: "Westox",
    rangeName: "Westox Plastalite High Build Repair Mortar A 15kg",
    shortType: "Two-part (powder + modifier) high-build repair mortar (to 100 mm)",
    badges: [],
    appInfo: kp(["CONFIRM (Westox TDS)", "CONFIRM (Westox TDS)", "To 100 mm", "CONFIRM (Westox TDS)", "Yes", "15 kg (Part A) + 5 kg modifier"]),
    bestFor: [
      "High build to 100 mm — for deep concrete and masonry spall repair on horizontal, vertical and overhead surfaces",
      "Australian-made (Westox) — heritage / masonry repair pedigree",
    ],
    avoidWhere: [
      "Requires the Part B Mortar Modifier (acrylic) — it is not a standalone powder",
      "Confirm the EN 1504-3 class and strengths with Westox before specifying to a structural requirement",
      "Not over active or moving cracks",
    ],
    warnings: [
      "Two-part — Part A powder + Mortar Modifier (Part B); confirm the mix ratio per the TDS",
      "EN class and @28d strength: CONFIRM with Westox before structural specification",
    ],
    advanced: {
      description:
        "Westox Plastalite High Build Repair Mortar is an Australian-made high-build repair mortar for horizontal, vertical and overhead concrete and masonry, with a maximum build of 100 mm. Part A (15 kg powder) is used with the Westox Mortar Modifier (Part B, 5 kg acrylic). CONFIRM the EN 1504-3 class, compressive strength and minimum layer against the current Westox TDS before structural specification.",
      designCriteria: "",
      techData: [
        { label: "EN 1504-3 class", value: "CONFIRM (Westox TDS)", source: "westox.com TDS" },
        { label: "Compressive @28d", value: "CONFIRM (Westox TDS)", source: "westox.com TDS" },
        { label: "Max single-pass build", value: "To 100 mm", source: "westox.com TDS" },
        { label: "Min layer", value: "CONFIRM (Westox TDS)", source: "westox.com TDS" },
        { label: "Components", value: "Part A powder (15 kg) + Mortar Modifier (5 kg acrylic)", source: "westox.com TDS" },
        { label: "Pack size", value: "15 kg (Part A) + 5 kg modifier", source: "westox.com TDS" },
      ],
    },
  },
];
