// ──────────────────────────────────────────────────────────────────────────────
// Renovating salt-resistant plaster (WTA renovation plaster) — rising damp.
// Hand-authored selection cards. Values from each product's manufacturer / AU
// source (cited per field). Values not stated on the cited source are written
// "CONFIRM — <field> not stated on <url>" — never guessed.
//
// appInfo comparison columns: Type · Binder · System / coats · Min. thickness ·
// Salt resistance · Vapour permeability · Standard · Coverage.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Binder", "System / coats", "Min. thickness", "Salt resistance", "Vapour permeability", "Standard", "Coverage"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));

export const SALT_PLASTER_CARDS: RefCard[] = [
  {
    brand: "Remmers Australia",
    rangeName: "Remmers SP Top White (WTA renovation plaster)",
    shortType: "WTA renovation plaster — fibre-reinforced, salt-storing",
    badges: [{ label: "WTA 2-9-04", tone: "amber" }, { label: "Active pore >50%", tone: "navy" }, { label: "SR / NA", tone: "blue" }],
    appInfo: kp([
      "WTA renovation plaster (white, fibre-reinforced)",
      "Mineral; pore-hydrophobic; SR / NA (sulphate-resistant, low active alkali)",
      "Renovation plaster — 10–30 mm per layer, up to 40 mm in two layers (pre-spray if required)",
      "≥20 mm total (WTA); ≈17 kg/m² at 20 mm",
      "High — active pore-space volume >50% stores salt crystallisation",
      "Diffusion-open (vapour-permeable), drying-promoting",
      "WTA 2-9-04",
      "≈8.8 kg/m² per cm thickness; 20 kg bags",
    ]),
    bestFor: [
      "Active pore-space volume >50% — high salt-storage capacity stores crystallisation in the plaster body, not at the surface",
      "Sulphate-resistant, low-alkali (SR/NA), fibre-reinforced, diffusion-open — the established WTA renovation plaster in AU, following Remmers Kiesol / Kiesol C injection",
    ],
    avoidWhere: [
      "Before chemical DPC injection is completed and cured — replastering is the follow-on step, not the treatment itself",
      "Over gypsum backgrounds or with gypsum undercoats — incompatible; strip all gypsum first",
    ],
    warnings: [
      "Strip old plaster to ≥300 mm above the salt tide mark before applying — salt damage extends beyond the visible stain",
      "Renovation plaster manages salt during drying only — the wall must dry fully (6–24 months) before non-breathable finishes",
    ],
    advanced: {
      description:
        "Remmers SP Top White is a white, fibre-reinforced WTA renovation plaster (Sanierputz) for damp, salt-laden masonry. It carries an active pore-space volume >50% (high salt-storage capacity), is sulphate-resistant with low active alkali (SR/NA), pore-hydrophobic, fibre-reinforced and diffusion-open (drying-promoting). Applied 10–30 mm per layer (up to 40 mm in two layers; ≥20 mm total per WTA), ≈17 kg/m² at 20 mm. It is the follow-on plaster after Remmers Kiesol / Kiesol C DPC injection. Confirm compressive-strength class and current AU availability with Remmers Australia.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "WTA renovation plaster (white, fibre-reinforced)", source: "Remmers SP Top White (en.remmers.com / remmers.com)" },
        { label: "Standard", value: "WTA 2-9-04", source: "Remmers SP Top White" },
        { label: "Active pore volume", value: ">50% (high salt-storage capacity)", source: "Remmers SP Top White" },
        { label: "Salt / alkali", value: "Sulphate-resistant, low active alkali (SR/NA)", source: "Remmers SP Top White" },
        { label: "Thickness", value: "10–30 mm/layer; up to 40 mm in two layers; ≥20 mm total (WTA)", source: "Remmers SP Top White" },
        { label: "Coverage", value: "≈8.8 kg/m² per cm; ≈17 kg/m² at 20 mm; 20 kg bags", source: "Remmers SP Top White" },
        { label: "Vapour permeability", value: "Diffusion-open (drying-promoting)", source: "Remmers SP Top White" },
        { label: "Compressive strength class", value: "CONFIRM — value not stated on the cited Remmers source" },
      ],
    },
  },
  {
    brand: "Mapei Australia",
    rangeName: "Mapei Mape-Antique (Rinzaffo + MC)",
    shortType: "Macroporous dehumidifying render system — lime + Eco-Pozzolan",
    badges: [{ label: "EN 998-1 type R", tone: "navy" }, { label: "Macroporous", tone: "blue" }, { label: "Cement-free (lime)", tone: "amber" }],
    appInfo: kp([
      "Macroporous dehumidifying render system (Rinzaffo keying coat + MC render)",
      "Lime + Eco-Pozzolan (cement-free)",
      "Mape-Antique Rinzaffo (≤5 mm keying coat) + Mape-Antique MC (20–30 mm/layer render) + finish",
      "MC min 20 mm (max 30 mm/layer)",
      "High — fresh porosity >20% (MC), macroporous salt-tolerant matrix",
      "MC ≤10 µ; Rinzaffo ≤30 µ (very vapour-permeable)",
      "EN 998-1 — MC type R CS II; Rinzaffo type GP CS IV",
      "MC 15 kg/m² per cm (25 kg bags); Rinzaffo 7.5 kg/m² @ 5 mm (20 kg bags)",
    ]),
    bestFor: [
      "Mape-Antique MC is an EN 998-1 type R renovation render (CS II) with fresh porosity >20% and µ ≤10 — high salt tolerance and breathability for damp / salt-laden masonry",
      "Cement-free lime + Eco-Pozzolan system — compatible with historic masonry; coordinated keying coat (Rinzaffo) + render (MC) + finish",
    ],
    avoidWhere: [
      "Where the keying coat (Rinzaffo) is omitted on smooth / low-suction substrates — adhesion of the render depends on it",
      "Over existing salt-contaminated plaster — strip to masonry first",
    ],
    warnings: [
      "Apply MC ≥20 mm (max 30 mm/layer); Rinzaffo ≤5 mm — observe ~60 min workability time and 14–16% mix water (MC)",
      "Confirm WTA 2-9-04 status (EN 998-1 type R is confirmed) and current AU pack with Mapei Australia",
    ],
    advanced: {
      description:
        "Mapei Mape-Antique is a cement-free (lime + Eco-Pozzolan) macroporous dehumidifying render system for damp, salt-laden masonry: Mape-Antique Rinzaffo (EN 998-1 type GP, CS IV; ≤5 mm keying coat; 7.5 kg/m² @ 5 mm; µ ≤30; 20 kg bags) plus Mape-Antique MC (EN 998-1 type R, CS II; 20–30 mm/layer render; 15 kg/m² per cm; fresh porosity >20%; µ ≤10; ~60 min workability; 14–16% water; 25 kg bags), finished with a Mape-Antique fine coat. Confirm WTA 2-9-04 status and current AU products with Mapei Australia.",
      designCriteria: "",
      techData: [
        { label: "System", value: "Rinzaffo keying coat + MC dehumidifying render + finish", source: "Mapei Mape-Antique MC / Rinzaffo TDS" },
        { label: "Binder", value: "Lime + Eco-Pozzolan (cement-free)", source: "Mapei Mape-Antique MC TDS" },
        { label: "Standard — MC", value: "EN 998-1 type R, CS II", source: "Mapei Mape-Antique MC TDS" },
        { label: "Standard — Rinzaffo", value: "EN 998-1 type GP, CS IV", source: "Mapei Mape-Antique Rinzaffo TDS" },
        { label: "MC thickness / coverage", value: "20–30 mm/layer; 15 kg/m² per cm; 25 kg bags", source: "Mapei Mape-Antique MC TDS" },
        { label: "MC porosity / vapour", value: "Fresh porosity >20%; µ ≤10", source: "Mapei Mape-Antique MC TDS" },
        { label: "Rinzaffo coverage / vapour", value: "7.5 kg/m² @ 5 mm; µ ≤30; 20 kg bags", source: "Mapei Mape-Antique Rinzaffo TDS" },
        { label: "WTA 2-9-04", value: "CONFIRM — EN 998-1 type R confirmed; WTA classification not stated on the cited Mapei source" },
      ],
    },
  },
  {
    brand: "Sika Australia",
    rangeName: "Sika SikaMur Dry / SikaMur-1000 SP",
    shortType: "Ready-mixed breathable macroporous renovation (dehumidifying) mortar",
    badges: [{ label: "EN 998-1 Class R", tone: "navy" }, { label: "Macroporous / breathable", tone: "blue" }, { label: "CONFIRM AU supply", tone: "rose" }],
    appInfo: kp([
      "Ready-mixed breathable macroporous renovation (dehumidifying) mortar",
      "CONFIRM binder (Sika AU TDS) — cement-based macroporous",
      "Renovation render (SikaMur Dry / -1000 SP) + SikaMur Finish — CONFIRM coats/thickness (Sika AU)",
      "CONFIRM min thickness (Sika AU TDS)",
      "High-porosity for salt- and damp-damaged masonry",
      "Breathable (macroporous, vapour-permeable)",
      "EN 998-1 Class R (renovation mortar)",
      "CONFIRM coverage / pack (Sika AU TDS)",
    ]),
    bestFor: [
      "EN 998-1 Class R renovation mortar — high-porosity, breathable, dehumidifying render for damp- and salt-damaged masonry",
      "Machine- or hand-applied ready-mixed system (SikaMur Dry / SikaMur-1000 SP) with SikaMur Finish topcoat",
    ],
    avoidWhere: [
      "Treating Vandex crystalline tanking (waterproofing against pressure) as a renovation plaster — different product class; SikaMur is Sika's renovation render",
      "Over existing salt-contaminated plaster — strip to masonry first",
    ],
    warnings: [
      "CONFIRM current Australian availability of the SikaMur renovation range (Dry / -1000 SP / Finish) with Sika Australia — the cited TDS are EU/global versions",
      "Confirm coat thickness, coverage and compressive class from the Sika AU TDS before specifying",
    ],
    advanced: {
      description:
        "Sika's renovation render for rising-damp / salt-damaged masonry is the SikaMur range — SikaMur Dry and SikaMur-1000 SP are ready-mixed, breathable, high-porosity macroporous dehumidifying renovation mortars to EN 998-1 Class R, applied by machine or hand and finished with SikaMur Finish. (Note: the Sika Vandex range is crystalline tanking / waterproofing, not a renovation plaster.) The cited SikaMur TDS are EU/global — CONFIRM current Australian availability, thickness, coverage and compressive class with Sika Australia.",
      designCriteria: "",
      techData: [
        { label: "Product", value: "SikaMur Dry / SikaMur-1000 SP (renovation render) + SikaMur Finish", source: "Sika SikaMur Dry / -1000 SP PDS" },
        { label: "Type", value: "Ready-mixed breathable macroporous dehumidifying renovation mortar", source: "Sika SikaMur Dry / -1000 SP PDS" },
        { label: "Standard", value: "EN 998-1 Class R (renovation mortar)", source: "Sika SikaMur Dry / -1000 SP PDS" },
        { label: "Note", value: "Sika Vandex = crystalline tanking, not a renovation plaster", source: "page" },
        { label: "AU availability", value: "CONFIRM — cited SikaMur TDS are EU/global; confirm AU supply with Sika Australia" },
        { label: "Thickness / coverage / class", value: "CONFIRM — confirm from the Sika AU TDS" },
      ],
    },
  },
];
