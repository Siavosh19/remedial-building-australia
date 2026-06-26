// ──────────────────────────────────────────────────────────────────────────────
// Hot-melt rubberised-asphalt / mastic-asphalt systems — hand-authored cards.
// Monolithic, hot-applied, fully-bonded systems for plaza/podium decks, inverted
// roofs, planters and below-grade. Values from the manufacturer source; empty/
// unconfirmed facts pruned at render. Several are imported/specialist — Australian
// availability flagged where uncertain (kept, not removed). "Class 2 / NCC tested"
// = documented AU test evidence only.
// appInfo columns: Type · Application · Reinforcement · Role/exposure · Class 2 / NCC tested · Warranty.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Application", "Reinforcement", "Role / exposure", "Class 2 / NCC tested", "Warranty"];
const DEFAULTS: Record<number, string> = { 4: "N/A", 5: "—" };
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? DEFAULTS[i] ?? "" }));

export const HOT_MELT_CARDS: RefCard[] = [
  {
    brand: "Henry Company",
    rangeName: "Henry 790-11 Hot Rubberised Asphalt",
    shortType: "Hot-applied rubberised-asphalt monolithic membrane",
    badges: [{ label: "Hot-applied", tone: "navy" }, { label: "Confirm AU availability", tone: "blue" }],
    appInfo: kp([
      "Hot-applied rubberised asphalt (refined asphalt + synthetic rubber + mineral stabilisers)",
      "Hot-applied — fully bonded, joint-free, with reinforcing fabric",
      "Reinforcing fabric (within the system)",
      "Plaza / podium / parking decks, planters, protected-membrane roofs, below-grade",
    ]),
    bestFor: [
      "Monolithic, fully-bonded, joint-free hot-applied membrane — strong for plaza/podium decks, planters and protected-membrane roofs",
      "Solvent-free; bonds fully to the substrate to limit lateral water tracking",
    ],
    avoidWhere: [
      "Light/domestic balcony work — this is a heavy plaza/podium-deck system",
      "Where a cold-applied membrane is required (it is hot-applied at high temperature)",
    ],
    warnings: [
      "Confirm current Australian availability and distributor — a North-American product; AU supply not confirmed at time of writing",
      "Hot-applied — kettle, temperature control and a specialist applicator required",
    ],
    advanced: {
      description:
        "Henry 790-11 is a hot-applied rubberised-asphalt waterproofing membrane (refined asphalts, synthetic rubber and mineral stabilisers) that applies as a monolithic, joint-free, fully-bonded membrane with reinforcing fabric, for plaza/podium/parking decks, planters, tunnels, reflective pools and protected-membrane roofs. Widely used in North America; confirm current Australian availability and distributor before specifying.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Hot-applied rubberised asphalt", source: "henry.com 790-11" },
        { label: "Application", value: "Hot-applied — monolithic, fully bonded, with fabric", source: "henry.com 790-11" },
        { label: "Use", value: "Plaza/podium/parking decks, planters, PMR, below-grade", source: "henry.com 790-11" },
        { label: "AU availability", value: "Confirm distributor — North-American product", source: "henry.com 790-11" },
      ],
    },
  },
  {
    brand: "Soprema",
    rangeName: "Soprema Colphene H",
    shortType: "Hot-applied rubberised-asphalt membrane (+ reinforcing fabric)",
    badges: [{ label: "Hot-applied", tone: "navy" }],
    appInfo: kp([
      "Hot-applied rubberised asphalt (mineral-filled)",
      "Hot-applied with reinforcing fabric",
      "Reinforcing fabric (within the system)",
      "Inverted / protected-membrane roofs, green roofs, plaza decks, below-grade",
    ]),
    bestFor: [
      "Hot-applied rubberised asphalt for protected-membrane (inverted) roofs, green roofs, plaza decks and below-grade walls",
      "Used with a reinforcing fabric for a monolithic fully-bonded build",
    ],
    avoidWhere: [
      "Exposed (non-protected) finishes — it is for protected/inverted assemblies",
      "Light/domestic balcony work",
    ],
    warnings: [
      "Confirm the current Australian product (Soprema Colphene BSW-H is distributed via Bayset) and its TDS before specifying",
      "Hot-applied — specialist applicator and temperature control required",
    ],
    advanced: {
      description:
        "Soprema Colphene H is a hot-applied rubberised-asphalt waterproofing membrane reinforced with mineral fillers, used with a reinforcing fabric on horizontal and vertical surfaces of protected-membrane (inverted) roofs, green roofs, plaza decks, foundation walls and other below-grade applications. Available in Australia through Soprema distributors (e.g. Bayset — Colphene BSW-H); confirm the exact current product and TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Hot-applied rubberised asphalt (mineral-filled)", source: "soprema Colphene H" },
        { label: "Application", value: "Hot-applied with reinforcing fabric", source: "soprema Colphene H" },
        { label: "Use", value: "Inverted/green roofs, plaza decks, below-grade", source: "soprema Colphene H" },
        { label: "AU supply", value: "Soprema via Bayset (Colphene BSW-H) — confirm product", source: "bayset.com.au" },
      ],
    },
  },
  {
    brand: "Sika Australia",
    rangeName: "SikaShield Hot Melt 50/70",
    shortType: "Hot-applied polymer-modified bitumen structural waterproofing",
    badges: [{ label: "Hot-applied", tone: "navy" }, { label: "Confirm AU availability", tone: "blue" }],
    appInfo: kp([
      "Hot-applied polymer-modified bitumen + synthetic rubber",
      "Hot-applied at 165–185 °C, with reinforcement & protection layers",
      "Reinforcement & protection layers (within the system)",
      "Ballasted roofs, podium decks, balconies & terraces (protected)",
    ]),
    bestFor: [
      "Hot-applied structural waterproofing for ballasted roofs, podium decks, balconies and terraces (protected build-ups)",
      "Monolithic fully-bonded membrane within the SikaShield Hot Melt structural system",
    ],
    avoidWhere: [
      "Exposed (non-protected) finishes — it requires reinforcement/protection layers and overburden",
      "Where a cold-applied membrane is required",
    ],
    warnings: [
      "Confirm current Australian availability with Sika Australia technical (the cited certification — BBA — is UK)",
      "Hot-applied at 165–185 °C — kettle, temperature control and specialist applicator required",
    ],
    advanced: {
      description:
        "SikaShield Hot Melt 50/70 is a hot-applied (165–185 °C) polymer-modified bitumen / synthetic-rubber waterproofing compound applied with reinforcement and protection layers as part of the SikaShield Hot Melt structural waterproofing system, for ballasted roofs, podium decks, balconies and terraces. UK BBA-certified; confirm current Australian availability and certification with Sika Australia.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Hot-applied polymer-modified bitumen + synthetic rubber", source: "sika SikaShield Hot Melt 50/70" },
        { label: "Application temp", value: "165–185 °C, with reinforcement/protection layers", source: "sika SikaShield Hot Melt 50/70" },
        { label: "Use", value: "Ballasted roofs, podium decks, balconies & terraces", source: "sika SikaShield Hot Melt 50/70" },
        { label: "AU availability", value: "Confirm with Sika Australia (BBA cert is UK)", source: "sika SikaShield Hot Melt 50/70" },
      ],
    },
  },
  {
    brand: "Mastic asphalt (traditional)",
    rangeName: "Mastic Asphalt — Hot-Applied Bituminous System",
    shortType: "Traditional hot-applied mastic-asphalt waterproofing",
    badges: [{ label: "Hot-applied", tone: "navy" }, { label: "Specialist contractor", tone: "blue" }],
    appInfo: kp([
      "Traditional hot-applied mastic asphalt (bitumen + graded aggregate)",
      "Hot-applied in layers by specialist contractors",
      "Inherent (graded aggregate matrix)",
      "Podium / plaza decks, tanking, heavy-duty trafficable build-ups",
    ]),
    bestFor: [
      "A robust, long-established hot-applied monolithic system for podium/plaza decks and heavy-duty trafficable build-ups",
      "Installed by specialist mastic-asphalt contractors (Mastic Asphalt Council of Australia)",
    ],
    avoidWhere: [
      "Light/domestic balcony work and thin-section tiled balconies",
      "Where a thin liquid or sheet membrane is specified",
    ],
    warnings: [
      "Confirm the specialist contractor, current specification and applicable standard with a waterproofing consultant",
      "Hot-applied at high temperature — specialist trade only",
    ],
    advanced: {
      description:
        "Mastic asphalt is a traditional hot-applied bituminous waterproofing and surfacing system (bitumen with graded mineral aggregate) laid in layers by specialist contractors, used on podium/plaza decks, tanking and heavy-duty trafficable build-ups. Confirm the specialist contractor and current specification (Mastic Asphalt Council of Australia) for the project.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Traditional hot-applied mastic asphalt", source: "Mastic Asphalt Council of Australia" },
        { label: "Application", value: "Hot-applied in layers by specialist contractors", source: "Mastic Asphalt Council of Australia" },
        { label: "Use", value: "Podium/plaza decks, tanking, heavy-duty trafficable", source: "Mastic Asphalt Council of Australia" },
      ],
    },
  },
];
