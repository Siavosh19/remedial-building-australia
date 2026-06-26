// ──────────────────────────────────────────────────────────────────────────────
// Rebar Primers & Inhibitors — hand-authored selection cards (concrete spalling).
// Schema-first per the agreed category field set. All values from the CURRENT
// AUSTRALIAN manufacturer TDS; "CONFIRM …" = not stated on the cited AU source
// (never guessed). Pot life and shelf life dropped — not available for any of the
// four reference products. Sika MonoTop-1010 removed — no AU TDS / not on
// aus.sika.com (910 N is the confirmed AU dual primer).
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Mechanism", "Binder / chemistry", "EN 1504-7", "Coats / build", "Overcoat window", "Resistivity (anode)", "Substrate prep", "Pack size"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] }));

export const REBAR_PRIMER_CARDS: RefCard[] = [
  {
    brand: "Ardex Australia",
    rangeName: "Ardex BR 10 ZP",
    shortType: "Single-part zinc-rich rebar primer — galvanic protection",
    badges: [],
    appInfo: kp([
      "Galvanic — sacrificial zinc",
      "Single-pack zinc-rich",
      "CONFIRM (Ardex AU TDS)",
      "1 coat (2nd if needed)",
      "2nd coat ~1 h @20 °C; mortar when dry to touch",
      "CONFIRM (Ardex AU TDS)",
      "Clean steel (St3)",
      "CONFIRM (Ardex AU TDS)",
    ]),
    bestFor: [
      "Single-pack — no mixing, fast site application",
      "Galvanic sacrificial-zinc — actively protects the bar, not only a barrier",
    ],
    avoidWhere: [
      "Not over rusted or scaled steel — needs cleaned, bright steel first",
      "Do not pour the repair mortar before the primer is dry to touch",
    ],
    warnings: [
      "Mandatory rebar coat before the repair mortar",
      "Confirm DFT, coats, EN 1504-7 status and pack size against the current Ardex Australia TDS",
    ],
    advanced: {
      description:
        "Ardex BR 10 ZP is a single-part, zinc-rich primer for reinforcing steel that protects galvanically (sacrificial zinc). Apply a continuous film; a second coat may follow once the first is dry (~1 h @20 °C), and the repair mortar / micro-concrete is placed once the primer is dry to touch. CONFIRM dry film thickness, EN 1504-7 status and pack size against the current Ardex Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Mechanism", value: "Galvanic — sacrificial zinc", source: "ardexaustralia.com TDS" },
        { label: "Binder", value: "Single-pack zinc-rich", source: "ardexaustralia.com TDS" },
        { label: "EN 1504-7", value: "CONFIRM — not stated on landing page (Ardex AU TDS)", source: "ardexaustralia.com TDS" },
        { label: "Coats", value: "1 (2nd if needed); 2nd after ~1 h @20 °C", source: "ardexaustralia.com TDS" },
        { label: "DFT", value: "CONFIRM (Ardex AU TDS)", source: "ardexaustralia.com TDS" },
        { label: "Overcoat before mortar", value: "Dry to touch", source: "ardexaustralia.com TDS" },
        { label: "Substrate prep", value: "Clean bright steel", source: "ardexaustralia.com TDS" },
        { label: "Application", value: "Brush", source: "ardexaustralia.com TDS" },
        { label: "Pack size", value: "CONFIRM (Ardex AU TDS)", source: "ardexaustralia.com TDS" },
      ],
    },
  },
  {
    brand: "Fosroc / Parchem",
    rangeName: "Fosroc Nitoprime Zincrich",
    shortType: "Zinc-rich epoxy rebar primer — 50 µm dry film",
    badges: [],
    appInfo: kp([
      "Galvanic (zinc-rich) + epoxy barrier",
      "Zinc-rich epoxy",
      "CONFIRM (Parchem AU TDS)",
      "1 coat — 50 µm dry / 120 µm wet",
      "Apply mortar after full dry",
      "High — not anode-compatible",
      "Bright steel (Sa2½ / St3)",
      "CONFIRM (Parchem AU TDS)",
    ]),
    bestFor: [
      "Zinc-rich epoxy — combined galvanic protection and a robust barrier; the high-durability primer in this group",
      "Defined 50 µm dry film for a consistent barrier thickness",
    ],
    avoidWhere: [
      "High-resistivity barrier — do not use where discrete galvanic anodes are the corrosion-control strategy",
      "Not over rust — needs bright, blast-cleaned steel",
    ],
    warnings: [
      "Two-part epoxy — observe the overcoat window before the mortar",
      "Solvent / VOC — confirm suitability in occupied or enclosed spaces",
      "Mandatory rebar coat before the Renderoc repair mortar",
    ],
    advanced: {
      description:
        "Fosroc Nitoprime Zincrich is a zinc-rich epoxy-resin primer that protects steel galvanically and as a barrier, applied in one coat at 50 µm dry (120 µm wet) and allowed to dry fully before the repair mortar. CONFIRM EN 1504-7 status, pack size and occupied-space VOC suitability against the current Fosroc / Parchem TDS.",
      designCriteria: "",
      techData: [
        { label: "Mechanism", value: "Galvanic (zinc-rich) + epoxy barrier", source: "fosroc.com.au TDS (Feb 2025)" },
        { label: "Binder", value: "Zinc-rich epoxy", source: "fosroc.com.au TDS (Feb 2025)" },
        { label: "EN 1504-7", value: "CONFIRM (Parchem AU TDS)", source: "fosroc.com.au TDS (Feb 2025)" },
        { label: "DFT", value: "50 µm dry / 120 µm wet per coat", source: "fosroc.com.au TDS (Feb 2025)" },
        { label: "Coats", value: "1 full, unbroken coat", source: "fosroc.com.au TDS (Feb 2025)" },
        { label: "Overcoat before mortar", value: "After full dry", source: "fosroc.com.au TDS (Feb 2025)" },
        { label: "Resistivity", value: "High — not galvanic-anode compatible", source: "fosroc.com.au TDS (Feb 2025)" },
        { label: "Substrate prep", value: "Bright steel (Sa2½ / St3)", source: "fosroc.com.au TDS (Feb 2025)" },
        { label: "Application", value: "Brush", source: "fosroc.com.au TDS (Feb 2025)" },
        { label: "Pack size", value: "CONFIRM (Parchem AU TDS)", source: "fosroc.com.au TDS (Feb 2025)" },
      ],
    },
  },
  {
    brand: "Sika Australia",
    rangeName: "Sika MonoTop-910 N",
    shortType: "Cementitious bonding primer + rebar corrosion protection (EN 1504-7)",
    badges: [],
    appInfo: kp([
      "Passivating / barrier (cementitious)",
      "Polymer-modified cementitious (silica fume)",
      "Yes",
      "≥2 layers — ~2.0 kg/m² per mm (~2 mm)",
      "Wet-on-wet — mortar while primer is wet",
      "Low — galvanic-anode compatible",
      "Clean steel + SSD concrete",
      "CONFIRM (Sika AU TDS) — ≈10 kg",
    ]),
    bestFor: [
      "Dual-function — rebar corrosion protection and bonding primer in one product",
      "Low-resistivity cementitious — compatible with discrete galvanic anodes",
      "Solvent-free and low-odour — suited to occupied buildings",
    ],
    avoidWhere: [
      "Not a thick barrier coat — it is a thin bond / protection layer",
      "Do not let it dry before placing the mortar (wet-on-wet)",
    ],
    warnings: [
      "Place the repair mortar while the primer is still wet, or the bond is compromised",
      "Best specified within the Sika MonoTop repair system",
    ],
    advanced: {
      description:
        "Sika MonoTop-910 N is a one-component, polymer-modified cementitious coating with silica fume, used as both a bonding primer and reinforcement corrosion protection, conforming to EN 1504-7. Apply ~2.0 kg of powder per m² per 1 mm layer over at least two layers; the repair mortar is placed while the primer is still wet (wet-on-wet). CONFIRM pack size against the current Sika Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Mechanism", value: "Passivating / barrier (cementitious)", source: "aus.sika.com TDS (May 2025)" },
        { label: "Binder", value: "Polymer-modified cementitious (silica fume)", source: "aus.sika.com TDS (May 2025)" },
        { label: "EN 1504-7", value: "Yes (conforms)", source: "aus.sika.com TDS (May 2025)" },
        { label: "Coats / build", value: "≥2 layers; ~2.0 kg/m² per 1 mm (~2 mm total)", source: "aus.sika.com TDS (May 2025)" },
        { label: "Overcoat before mortar", value: "Wet-on-wet — apply mortar while primer wet", source: "aus.sika.com TDS (May 2025)" },
        { label: "Resistivity", value: "Low — galvanic-anode compatible", source: "aus.sika.com TDS (May 2025)" },
        { label: "Substrate prep", value: "Clean steel + SSD concrete", source: "aus.sika.com TDS (May 2025)" },
        { label: "Application", value: "Brush", source: "aus.sika.com TDS (May 2025)" },
        { label: "Pack size", value: "CONFIRM (Sika AU TDS) — ≈10 kg at distributors", source: "aus.sika.com TDS (May 2025)" },
      ],
    },
  },
  {
    brand: "Mapei Australia",
    rangeName: "Mapei Mapefer 1K",
    shortType: "Anti-corrosion cementitious rebar primer with corrosion inhibitor",
    badges: [],
    appInfo: kp([
      "Passivating + corrosion inhibitor (cementitious)",
      "Polymer-modified cementitious + inhibitor",
      "Yes — confirm AU TDS",
      "2 coats — ~2 mm total (~100 g/m on 8 mm bar)",
      "2nd coat 90–120 min (≤24 h); then mortar",
      "Low — galvanic-anode compatible",
      "Rebar free of rust (St3)",
      "5 kg",
    ]),
    bestFor: [
      "Active corrosion-inhibiting chemistry — not only a barrier coat",
      "Low-resistivity cementitious — galvanic-anode compatible",
      "Convenient 5 kg single-pack; ~100 g/m on an 8 mm bar",
    ],
    avoidWhere: [
      "Apply the second coat within 24 h of the first",
      "Not over rust — descale the bar first",
    ],
    warnings: [
      "Both coats (~2 mm total) are mandatory before the mortar",
      "Best specified within the Mapei Mapegrout repair system",
    ],
    advanced: {
      description:
        "Mapei Mapefer 1K is a one-component cementitious coating based on polymers in water dispersion, cement and corrosion inhibitors, brushed onto rust-free reinforcement to prevent corrosion. Apply two coats (~2 mm total; ~100 g/m on an 8 mm bar); the second coat 90–120 minutes after the first (preferably within 24 h). CONFIRM EN 1504-7 wording against the current Mapei Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Mechanism", value: "Passivating + corrosion inhibitor (cementitious)", source: "mapei.com/au TDS" },
        { label: "Binder", value: "Polymer-modified cementitious + corrosion inhibitor", source: "mapei.com/au TDS" },
        { label: "EN 1504-7", value: "Yes — confirm wording on AU TDS", source: "mapei.com/au TDS" },
        { label: "Coats / build", value: "2 coats; ~2 mm total; ~100 g/m on 8 mm bar", source: "mapei.com/au TDS" },
        { label: "Overcoat between coats", value: "2nd coat 90–120 min after 1st (≤24 h)", source: "mapei.com/au TDS" },
        { label: "Resistivity", value: "Low — galvanic-anode compatible", source: "mapei.com/au TDS" },
        { label: "Substrate prep", value: "Rebar free of rust", source: "mapei.com/au TDS" },
        { label: "Application", value: "Brush", source: "mapei.com/au TDS" },
        { label: "Pack size", value: "5 kg", source: "mapei.com/au TDS" },
      ],
    },
  },
];
