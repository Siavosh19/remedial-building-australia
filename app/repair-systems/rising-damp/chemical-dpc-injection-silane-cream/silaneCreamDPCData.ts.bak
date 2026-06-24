// ──────────────────────────────────────────────────────────────────────────────
// Chemical DPC injection — silane cream (rising damp). Hand-authored selection
// cards. Values from the page's product data / AU manufacturer source; "CONFIRM
// (… AU TDS)" = not stated on the AU source — never guessed. Selection
// discriminators for rising-damp DPC: chemistry & active, no-pressure cream form,
// BS 6576 / WTA drilling spec, masonry porosity, and the mandatory follow-on
// (strip + salt-resistant renovation plaster).
//
// appInfo carries the comparison columns: Chemistry · Active silane · Application
// · Hole pattern · Substrate porosity · Standard · Replaster · Coverage.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Chemistry", "Active silane", "Application", "Hole pattern", "Substrate porosity", "Standard", "Replaster", "Coverage"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "CONFIRM (AU TDS)" }));

export const SILANE_CREAM_DPC_CARDS: RefCard[] = [
  {
    brand: "Safeguard Europe / Wykamol",
    rangeName: "Dryzone Damp-Proofing Cream",
    shortType: "Silane cream chemical DPC injection — porous masonry",
    badges: [{ label: "Silane cream", tone: "navy" }, { label: "No-pressure", tone: "blue" }, { label: "BS 6576", tone: "amber" }],
    appInfo: kp([
      "Silane (n-butyltriethoxysilane) cream",
      "CONFIRM % (Wykamol AU TDS)",
      "Cartridge gun — no pressure equipment",
      "12 mm holes @ ~100–120 mm centres, ~75% wall depth, bed joint 75–150 mm AFL",
      "Porous masonry — brick, sandstock, calcium silicate, soft sandstone",
      "BS 6576",
      "Mandatory — salt-resistant renovation plaster",
      "600 / 800 ml cartridge — CONFIRM m per cartridge (AU TDS)",
    ]),
    bestFor: [
      "Most widely specified silane cream — porous brick / blockwork / sandstone — single-person cartridge application, no pressure rig",
      "Cream stays in the hole during cure — suits irregular pores, raked / open joints, and holes that cannot be pressure-sealed",
    ],
    avoidWhere: [
      "Dense engineering brick, dense concrete or non-porous masonry — silane needs an open pore structure to penetrate",
      "Use as a standalone fix — injection without stripping and salt-resistant replastering will fail",
    ],
    warnings: [
      "Strip old plaster to ≥300 mm above the salt tide mark before replastering — salt damage extends beyond the visible staining",
      "Drill level / spacing / depth per the Dryzone guide; allow 6–12 months drying before non-breathable redecoration",
    ],
    advanced: {
      description:
        "Dryzone Damp-Proofing Cream (Safeguard Europe, distributed via Wykamol Australia) is the most widely specified silane cream chemical DPC. It is injected into 12 mm holes at ~100–120 mm centres in a mortar bed joint 75–150 mm above floor level; the n-butyltriethoxysilane reacts with masonry alkalinity to line the pores with a hydrophobic barrier across the full wall depth. The cream stays in the hole during cure — no pressure equipment, standard 600 / 800 ml cartridge gun. Injection is one step only: strip salt-contaminated plaster to ≥300 mm above the tide mark and replaster with salt-resistant renovation plaster. CONFIRM active %, coverage and current AU availability with Wykamol Australia.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "Silane (n-butyltriethoxysilane) cream", source: "wykamol.com.au Dryzone" },
        { label: "Application", value: "Cartridge gun — no pressure equipment", source: "wykamol.com.au Dryzone" },
        { label: "Hole pattern", value: "12 mm holes @ ~100–120 mm centres, ~75% wall depth", source: "page / BS 6576" },
        { label: "Injection level", value: "Mortar bed joint 75–150 mm above floor", source: "page" },
        { label: "Standard", value: "BS 6576", source: "wykamol.com.au Dryzone" },
        { label: "Pack", value: "600 / 800 ml cartridge", source: "wykamol.com.au Dryzone" },
        { label: "Active silane %", value: "CONFIRM (Wykamol AU TDS)" },
        { label: "Coverage", value: "CONFIRM (Wykamol AU TDS)" },
        { label: "Replaster", value: "Mandatory — salt-resistant renovation plaster", source: "page" },
      ],
    },
  },
  {
    brand: "Sika Australia",
    rangeName: "Sika SikaMur InjectoCream-100",
    shortType: "1-component silane cream DPC injection",
    badges: [{ label: "Silane cream", tone: "navy" }, { label: "No-pressure", tone: "blue" }, { label: "Sika system", tone: "amber" }],
    appInfo: kp([
      "1-component silane cream",
      "CONFIRM % (Sika AU TDS)",
      "Cartridge gun — no pressure equipment",
      "Drilled bed-joint holes — CONFIRM diameter / spacing (Sika guide)",
      "Porous masonry — brick, blockwork, masonry",
      "CONFIRM — BS 6576 (confirm with Sika)",
      "Mandatory — salt-resistant renovation plaster",
      "600 ml cartridge — CONFIRM rate (Sika AU TDS)",
    ]),
    bestFor: [
      "Sika-backed DPC for larger strata remediation — national technical support, accredited applicators, system documentation for warranty / compliance",
      "No-pressure cartridge application into the bed joint — practical without specialist contractors",
    ],
    avoidWhere: [
      "Non-porous masonry or dense concrete — silane penetration requires an open pore structure",
      "Standalone use — combine with plaster removal and salt-resistant renovation plaster",
    ],
    warnings: [
      "Confirm BS 6576 (or equivalent) classification and the drilling spec from Sika before specifying",
      "Post-treatment drying required before non-breathable redecoration — confirm with Sika",
    ],
    advanced: {
      description:
        "Sika SikaMur InjectoCream-100 is Sika Australia's one-component silane cream chemical DPC for rising damp in masonry walls. Supplied in cartridges for a standard sealant gun (no pressure equipment), the silane penetrates the pore structure and forms a hydrophobic barrier across the wall when injected into pre-drilled bed-joint holes. Sika's national technical support, accredited applicators and system documentation suit larger strata remediation with warranty / compliance needs. As with all chemical DPC, injection is one part of the system — strip salt-contaminated plaster and replaster with salt-resistant renovation plaster. CONFIRM classification, drilling spec and coverage with Sika Australia.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "1-component silane cream", source: "aus.sika.com SikaMur InjectoCream-100" },
        { label: "Application", value: "Cartridge gun — no pressure equipment", source: "aus.sika.com SikaMur InjectoCream-100" },
        { label: "Standard", value: "CONFIRM — BS 6576 (confirm with Sika)" },
        { label: "Active silane %", value: "CONFIRM (Sika AU TDS)" },
        { label: "Hole pattern", value: "CONFIRM diameter / spacing (Sika installation guide)" },
        { label: "Coverage", value: "CONFIRM (Sika AU TDS)" },
        { label: "Replaster", value: "Mandatory — salt-resistant renovation plaster", source: "page" },
      ],
    },
  },
  {
    brand: "Remmers Australia",
    rangeName: "Remmers Kiesol C",
    shortType: "Silane/siloxane cream DPC — WTA system; dense masonry",
    badges: [{ label: "Silane/siloxane cream", tone: "navy" }, { label: "WTA system", tone: "amber" }, { label: "Dense masonry", tone: "blue" }],
    appInfo: kp([
      "Silane/siloxane cream (potassium methyl siliconate base)",
      "CONFIRM % (Remmers AU TDS)",
      "Cartridge gun — no pressure equipment",
      "Drilled bed-joint holes — CONFIRM (Remmers WTA guide)",
      "Porous AND lower-porosity / dense masonry",
      "WTA 2-6-99",
      "Mandatory — Remmers SP renovation plasters (coordinated system)",
      "CONFIRM rate (Remmers AU TDS)",
    ]),
    bestFor: [
      "Lower-porosity / denser masonry — cream retention in the hole where a silane-only cream may not hold",
      "Single-manufacturer WTA system — Kiesol C injection + Remmers SP renovation plasters with consistent documentation",
    ],
    avoidWhere: [
      "Non-porous or dense concrete substrates",
      "Standalone injection — follow with Remmers SP renovation plasters",
    ],
    warnings: [
      "Confirm the correct Kiesol product (C cream vs liquid) for the substrate with Remmers",
      "Confirm the drying period before redecoration with Remmers technical",
    ],
    advanced: {
      description:
        "Remmers Kiesol C is a concentrated silane/siloxane cream DPC in Remmers' WTA-referenced rising-damp system, based on potassium methyl siliconate / siloxane chemistry that penetrates masonry and forms a hydrophobic barrier. It is particularly suited to lower-porosity and denser masonry where cream retention in the hole is an advantage over silane-only creams. Remmers recommends using it within the complete WTA system with Remmers SP renovation plasters — one manufacturer for both injection and replastering gives coordinated documentation. CONFIRM active %, drilling spec and current AU availability with Remmers Australia.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "Silane/siloxane cream (potassium methyl siliconate)", source: "remmers.com.au Kiesol C" },
        { label: "Standard", value: "WTA 2-6-99", source: "remmers.com.au / page" },
        { label: "Application", value: "Cartridge gun — no pressure equipment", source: "remmers.com.au Kiesol C" },
        { label: "Substrate", value: "Porous and lower-porosity / dense masonry", source: "page" },
        { label: "Coordinated replaster", value: "Remmers SP renovation plasters (WTA system)", source: "page" },
        { label: "Active silane %", value: "CONFIRM (Remmers AU TDS)" },
        { label: "Coverage", value: "CONFIRM (Remmers AU TDS)" },
      ],
    },
  },
  {
    brand: "Westox",
    rangeName: "Westox 50 Low Odour",
    shortType: "Low-odour silane cream DPC — occupied buildings",
    badges: [{ label: "Silane cream", tone: "navy" }, { label: "Low odour", tone: "blue" }, { label: "CONFIRM specs", tone: "rose" }],
    appInfo: kp([
      "Low-odour silane cream",
      "CONFIRM % (Westox AU TDS)",
      "Cartridge gun — no pressure equipment (CONFIRM)",
      "CONFIRM hole diameter / spacing (Westox TDS)",
      "Porous masonry — brick, blockwork",
      "CONFIRM (not stated)",
      "Mandatory — salt-resistant renovation plaster",
      "CONFIRM rate (Westox TDS)",
    ]),
    bestFor: [
      "Occupied buildings where silane odour is a concern — low-odour formulation",
      "Australian supplier (Westox) for brick / blockwork DPC injection",
    ],
    avoidWhere: [
      "Dense / low-porosity substrates — confirm suitability with Westox",
      "Standalone injection — combine with plaster removal and salt-resistant replaster",
    ],
    warnings: [
      "Confirm current formulation, injection method, hole diameter / spacing and coverage from the Westox TDS",
      "Confirm current Australian availability with Westox",
    ],
    advanced: {
      description:
        "Westox 50 Low Odour is a low-odour silane DPC injection cream for chemical damp-proof course installation in brick, blockwork and porous masonry subject to rising damp — the low-odour formulation suits occupied buildings where conventional silane creams may cause odour complaints. It is part of the Westox rising-damp range. CONFIRM the current TDS, injection method, hole diameter / spacing, coverage and full system design (injection + plaster + coating) with Westox before specifying; do not rely on injection alone — salt-contaminated plaster must be stripped and replaced.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "Low-odour silane cream", source: "westox.com.au Westox 50 Low Odour" },
        { label: "Key feature", value: "Low odour — for occupied buildings", source: "page" },
        { label: "Application", value: "CONFIRM (Westox TDS)" },
        { label: "Hole pattern", value: "CONFIRM diameter / spacing (Westox TDS)" },
        { label: "Standard", value: "CONFIRM (not stated)" },
        { label: "Coverage", value: "CONFIRM (Westox TDS)" },
        { label: "Replaster", value: "Mandatory — salt-resistant renovation plaster", source: "page" },
      ],
    },
  },
];
