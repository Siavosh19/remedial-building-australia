import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ArrowRight, Clock, AlertTriangle } from "lucide-react";

const SIBLING_TABS = [
  { label: "Liquid applied — PU & hybrid", slug: "liquid-applied-membranes-polyurethane" },
  { label: "Liquid applied — acrylic", slug: "liquid-applied-membranes-acrylic" },
  { label: "Torch-on sheet", slug: "sheet-membranes-torch-on" },
  { label: "Cold-applied sheet", slug: "sheet-membranes-cold-applied" },
  { label: "Cementitious flexible", slug: "cementitious-flexible-membranes" },
  { label: "Primers", slug: "primers-bonding-agents" },
  { label: "Screed polymer", slug: "screed-systems-polymer-modified" },
  { label: "Screed SL", slug: "screed-systems-self-levelling" },
  { label: "Hobs & upstands", slug: "hobs-upstands" },
  { label: "Drainage puddle flanges", slug: "drainage-puddle-flanges-floor-wastes" },
  { label: "Drainage linear", slug: "drainage-linear-grates-channel-drains" },
  { label: "Penetration collars", slug: "penetration-collars" },
  { label: "Protection boards", slug: "protection-boards" },
  { label: "Reinforcing fabric", slug: "reinforcing-fabric-mesh" },
  { label: "Flood test", slug: "flood-test-equipment" },
  { label: "Tile adhesive", slug: "tile-adhesive-systems" },
  { label: "Tools", slug: "abrasives-blades-tools" },
  { label: "HDPE sheet membranes (roofs/podiums)", slug: "hdpe-sheet-membrane-systems" },
  { label: "Single-ply membranes (ballasted)", slug: "single-ply-membrane-systems-ballasted" },
  { label: "Hot melt asphalt (roofs/podiums)", slug: "hot-melt-rubberised-asphalt-systems" },
  { label: "Root resistant membranes (planters/podiums)", slug: "root-resistant-membrane-systems" },
  { label: "Tapered insulation (roofs/podiums)", slug: "tapered-insulation-board-systems" },
  { label: "Pedestal systems (podiums)", slug: "pedestal-systems-adjustable-height" },
  { label: "Drainage cells (planter boxes)", slug: "drainage-cell-systems" },
  { label: "Filter fabric (planter boxes)", slug: "filter-fabric-systems" },
  { label: "Ballast systems (roofs)", slug: "ballast-systems" },
  { label: "Podium outlets & scuppers", slug: "drainage-podium-outlets-scuppers" },
  { label: "Gutter lining (roofs)", slug: "gutter-lining-systems" },
  { label: "Flashing compounds (roofs)", slug: "flashing-compound-systems" },
];

type CategoryMeta = {
  fullTitle: string;
  intro: string;
  stats: { label: string; value: string }[];
};

const CATEGORY_META: Record<string, CategoryMeta> = {
  "liquid-applied-membranes-acrylic": {
    fullTitle: "Liquid-applied acrylic waterproofing membranes",
    intro: "Liquid-applied acrylic waterproofing membranes are water-based polymer membrane systems commonly used in protected balcony and wet area applications. These systems are typically one-component, applied by roller or brush, and are generally suitable for undertile or under-screed applications. Product selection must consider DFT requirements, primer compatibility, exposure class, UV stability (if applicable), and tile adhesive compatibility. Refer to AS 4858 for wet area waterproofing requirements.",
    stats: [
      { label: "System type", value: "Liquid applied" },
      { label: "Binder type", value: "Acrylic" },
      { label: "Standard", value: "AS 4858" },
      { label: "Finish", value: "Under tile / screed" },
    ],
  },
  "sheet-membranes-torch-on": {
    fullTitle: "Torch-on bitumen modified sheet membranes",
    intro: "Torch-on bitumen modified sheet membranes (SBS and APP modified) are used in balcony and terrace waterproofing applications where a factory-manufactured sheet system is preferred over liquid-applied membranes. These systems are applied using a gas torch to fuse the membrane to the primed substrate and at laps. Product selection must consider substrate type, priming requirements, lap dimensions, penetration detailing, and compatibility with the proposed finish system.",
    stats: [
      { label: "System type", value: "Sheet membrane" },
      { label: "Application", value: "Torch-on" },
      { label: "Standard", value: "AS 4858" },
      { label: "Finish", value: "Protected / trafficable" },
    ],
  },
  "sheet-membranes-cold-applied": {
    fullTitle: "Cold-applied self-adhered sheet membranes",
    intro: "Cold-applied self-adhered sheet membranes provide an alternative to torch-on systems where heat-based application is not appropriate. These systems use a pressure-sensitive or peel-and-stick adhesive bond to the substrate and are applied without heat. Product selection must consider primer requirements, temperature at application, lap sealing, penetration detailing, and compatibility with the finish system. Cold-applied sheet membranes are commonly used in balcony, terrace, and planter box applications.",
    stats: [
      { label: "System type", value: "Sheet membrane" },
      { label: "Application", value: "Cold-applied" },
      { label: "Standard", value: "AS 4858" },
      { label: "Finish", value: "Protected / trafficable" },
    ],
  },
  "cementitious-flexible-membranes": {
    fullTitle: "Cementitious flexible waterproofing membranes",
    intro: "Cementitious flexible membranes (two-part polymer-modified systems such as ARDEX 8+9, Mapei Mapelastic Foundation and similar) are brush or trowel-applied systems used in balcony and wet area waterproofing. These are cement-based, not polyurethane — do not substitute for a polyurethane or AS 4858 classified system unless confirmed by the product technical data sheet. Product selection must consider DFT, reinforcement at junctions, primer compatibility, and tile adhesive compatibility.",
    stats: [
      { label: "System type", value: "Cementitious" },
      { label: "Application", value: "Brush / trowel" },
      { label: "Standard", value: "AS 4858" },
      { label: "Finish", value: "Under tile / screed" },
    ],
  },
  "primers-bonding-agents": {
    fullTitle: "Primers and bonding agents — balcony waterproofing",
    intro: "Primers and bonding agents are mandatory components of all liquid-applied and sheet membrane waterproofing systems. The correct primer ensures adhesion of the membrane to the prepared substrate and is a critical hold point in the waterproofing installation sequence. Missing or incorrect primer is the single most common cause of premature membrane delamination. Product selection must confirm primer type, substrate compatibility, open time, and overcoat window for the specific membrane system specified.",
    stats: [
      { label: "Function", value: "Substrate prep" },
      { label: "Stage", value: "Pre-membrane" },
      { label: "Hold point", value: "Critical" },
      { label: "Standard", value: "Mfr spec" },
    ],
  },
  "screed-systems-polymer-modified": {
    fullTitle: "Polymer-modified screed systems — balcony",
    intro: "Polymer-modified screed systems are used in balcony and terrace applications to establish the correct falls to drainage, provide a suitable substrate for tiles or pavers, and in some systems act as the protection layer over the waterproofing membrane. Product selection must consider minimum and maximum thickness, compressive strength, bond strength, compatibility with the membrane below and the tile adhesive above, and the required fall gradient.",
    stats: [
      { label: "System type", value: "Polymer screed" },
      { label: "Function", value: "Falls / substrate" },
      { label: "Stage", value: "Over membrane" },
      { label: "Standard", value: "Mfr spec" },
    ],
  },
  "screed-systems-self-levelling": {
    fullTitle: "Self-levelling screed systems — balcony",
    intro: "Self-levelling screeds are used in balcony and internal applications where a level, smooth substrate is required. These are typically cementitious or calcium sulphate based and are applied by pump or pour to achieve a flat, level surface. In balcony applications, self-levelling screeds are used over structured subfloor systems or as part of a repair to an existing substrate. Product selection must confirm compatibility with the substrate, tile adhesive, and membrane system.",
    stats: [
      { label: "System type", value: "Self-levelling" },
      { label: "Application", value: "Pour / pump" },
      { label: "Function", value: "Level substrate" },
      { label: "Standard", value: "Mfr spec" },
    ],
  },
  "drainage-puddle-flanges-floor-wastes": {
    fullTitle: "Drainage — puddle flanges and floor wastes",
    intro: "Puddle flanges and floor wastes are critical components of the balcony waterproofing system. Puddle flanges are designed to integrate directly with the membrane, providing a watertight seal at the drainage point. Incorrect puddle flange selection or installation is a common cause of balcony drainage failure and water ingress. Product selection must consider the flange diameter, membrane compatibility, fixing method, and whether the system is suitable for tiled, paved, or exposed finishes.",
    stats: [
      { label: "Function", value: "Primary drainage" },
      { label: "Integration", value: "Membrane critical" },
      { label: "Material", value: "PVC / SS / brass" },
      { label: "Standard", value: "AS/NZS 3500" },
    ],
  },
  "drainage-linear-grates-channel-drains": {
    fullTitle: "Drainage — linear grates and channel drains",
    intro: "Linear grates and channel drain systems are specified in balcony, terrace and podium applications where linear drainage is preferred over point drainage. These systems collect surface water along their length and convey it to the stormwater system. Product selection must consider the load rating, grate material, drainage capacity, compatibility with the tile or finish system, and integration with the waterproofing membrane at the channel interface.",
    stats: [
      { label: "Function", value: "Linear drainage" },
      { label: "Material", value: "SS / PVC / HDPE" },
      { label: "Load class", value: "Per project req." },
      { label: "Standard", value: "AS/NZS 3500" },
    ],
  },
  "penetration-collars": {
    fullTitle: "Penetration collars — pre-formed and site-formed",
    intro: "Penetration collars provide a watertight seal at pipe penetrations through the waterproofing membrane. Pre-formed collars are factory manufactured to suit standard pipe diameters and are compatible with specific membrane systems. Site-formed collars use cementitious or polymer-based materials to form the seal around non-standard penetrations. Product selection must confirm pipe diameter, membrane compatibility, and whether the collar is rated for the waterproofing system specified.",
    stats: [
      { label: "Function", value: "Penetration seal" },
      { label: "Types", value: "Pre-formed / site" },
      { label: "Critical", value: "Hold point" },
      { label: "Standard", value: "Mfr spec" },
    ],
  },
  "protection-boards": {
    fullTitle: "Protection boards — membrane over-protection",
    intro: "Protection boards are placed over the cured waterproofing membrane to protect it from damage during subsequent construction activities including screed placement, tile bedding, and paver installation. Selection must consider board material, thickness, compressive strength, and compatibility with the membrane below. Inadequate membrane protection is a common cause of premature membrane damage in the completed building.",
    stats: [
      { label: "Function", value: "Membrane protection" },
      { label: "Stage", value: "Post-membrane" },
      { label: "Material", value: "Foam / rigid board" },
      { label: "Standard", value: "Mfr spec" },
    ],
  },
  "reinforcing-fabric-mesh": {
    fullTitle: "Reinforcing fabric and mesh — waterproofing",
    intro: "Reinforcing fabric and mesh are embedded in the wet membrane at all junctions, corners, coves, and changes in plane during balcony waterproofing installation. Reinforcement is mandatory at all internal and external corners, wall-to-floor junctions, construction joints, and around all penetrations. Failure to install reinforcement at these locations is one of the most common causes of membrane failure. Product selection must confirm compatibility with the membrane system and the manufacturer's specified installation sequence.",
    stats: [
      { label: "Function", value: "Junction reinf." },
      { label: "Locations", value: "All junctions" },
      { label: "Critical", value: "Mandatory" },
      { label: "Standard", value: "Mfr spec" },
    ],
  },
  "flood-test-equipment": {
    fullTitle: "Flood test equipment and plugs",
    intro: "Flood testing is required to verify the integrity of completed waterproofing membranes prior to covering with screed, tiles, or other finishes. The test involves plugging all drainage points and flooding the area with a minimum depth of water for a specified period (typically 24 hours minimum). Flood test plugs must be compatible with the drainage fitting, must not damage the membrane, and must be capable of holding the test head of water without leakage. Test results must be documented as a hold point in the QA records.",
    stats: [
      { label: "Function", value: "Membrane QA" },
      { label: "Test period", value: "Min. 24 hours" },
      { label: "Stage", value: "Pre-cover" },
      { label: "Standard", value: "AS 3740" },
    ],
  },
  "tile-adhesive-systems": {
    fullTitle: "Tile adhesive systems — balcony over-membrane",
    intro: "Tile adhesive selection for balcony applications is critical to the long-term performance of the finished system. The tile adhesive must be compatible with the waterproofing membrane below, the tile or stone above, and the grout and movement joint system specified. For external balcony and terrace applications, a flexible, polymer-modified tile adhesive complying with the relevant AS/NZS standard is required. Adhesive selection must also account for thermal movement, the tile format, and the substrate condition.",
    stats: [
      { label: "Function", value: "Tile to membrane" },
      { label: "Type", value: "Flexible / modified" },
      { label: "Standard", value: "AS/NZS 4992" },
      { label: "Critical", value: "Membrane compat." },
    ],
  },
  "abrasives-blades-tools": {
    fullTitle: "Abrasives, blades and tools — balcony waterproofing",
    intro: "Surface preparation is the most critical step in any waterproofing remediation. The correct abrasives, grinding discs, scarifying blades, and preparation tools are required to achieve the specified surface profile (CSP) prior to primer and membrane application. Inadequate surface preparation is the leading cause of membrane adhesion failure. Product selection must confirm the appropriate abrasive type for the substrate, the required surface profile, and compliance with the waterproofing system manufacturer's substrate preparation requirements.",
    stats: [
      { label: "Function", value: "Surface prep" },
      { label: "Stage", value: "Pre-primer" },
      { label: "Req. profile", value: "CSP 1–3" },
      { label: "Standard", value: "ICRI CSP scale" },
    ],
  },
};

type TorchOnProductCard = {
  brand: string;
  productName: string;
  productType: string;
  modifier: string;
  systemPosition: string;
  description: string;
  applications: string[];
  exposure: string;
  properties: string[];
  substrate: string;
  primer: string;
  lap: string;
  uv: string;
  exclusions: string[];
  specifierNote: string;
  tdsUrl: string;
  productUrl: string;
};

const TORCH_ON_PRODUCTS: TorchOnProductCard[] = [
  {
    brand: "ARDEX Australia",
    productName: "ARDEX WPM 150",
    productType: "APP modified bitumen torch-applied sheet membrane",
    modifier: "APP modified",
    systemPosition: "Base sheet / protected finish system",
    description: "Torch-applied APP membrane for balcony and terrace waterproofing under tiles, pavers or screed. Requires an approved protection layer and must not be left exposed.",
    applications: [
      "Under ceramic or porcelain tiles on balconies and terraces",
      "Under screed toppings and paver pedestal systems",
      "Protected balcony and terrace waterproofing systems",
    ],
    exposure: "Must be covered or protected; not a finished exposed surface.",
    properties: [
      "APP modified bitumen sheet membrane — torch welded to primed substrate and laps",
      "Designed for balcony and terrace systems where a factory sheet membrane is preferred",
      "Suitable for primed concrete, screed and compatible cementitious substrates",
      "Requires fully welded laps, corners, upturns and drainage detailing",
    ],
    substrate: "Primed concrete, cement screed, masonry and compatible cement-render substrates.",
    primer: "Primer required for all substrate types in accordance with ARDEX technical guidance.",
    lap: "Torch welding of overlaps, upturns and terminations is mandatory. Follow manufacturer overlap requirements.",
    uv: "Not UV stable as a finished surface; must be protected from direct sun exposure.",
    exclusions: [
      "Not for exposed pedestrian traffic without an approved overlay or protection system.",
      "Not a substitute for liquid polyurethane, acrylic, cold-applied self-adhered or heat-welded undertile sheet systems.",
      "Not suitable for planter/root-barrier systems or basement-only waterproofing.",
    ],
    specifierNote: "Confirm compatible top-sheet, screed or tile finish system with ARDEX technical and hot-work permit requirements before specifying.",
    tdsUrl: "https://www.ardexaustralia.com/products/ardex-wpm-150",
    productUrl: "https://www.ardexaustralia.com/",
  },
  {
    brand: "Tremco Australia",
    productName: "TREMproof Torch 3000",
    productType: "APP modified bitumen torch-applied sheet membrane",
    modifier: "APP modified",
    systemPosition: "Torch-applied deck membrane in a compatible protected balcony system",
    description: "Torch-applied APP bitumen membrane for balcony and terrace waterproofing systems requiring an approved cover or overlay. Not intended as a finished exposed surface without a nominated protection layer.",
    applications: [
      "Protected balcony and terrace waterproofing under tiles, screed or pavers",
      "Deck waterproofing where a factory sheet membrane is required",
      "Balcony systems with compatible penetration, outlet and termination detailing",
    ],
    exposure: "Requires a covering finish or protection layer; not for direct exposure as a finished pedestrian surface.",
    properties: [
      "Torch-applied APP-modified bitumen membrane with torch-weldable laps",
      "Used in balcony systems requiring a factory-manufactured sheet membrane",
      "Compatible with primed concrete, screed and cementitious substrates",
      "Requires careful detailing at corners, outlets, upturns and penetrations",
    ],
    substrate: "Primed concrete, cement screed, masonry and similar substrates approved by the manufacturer.",
    primer: "Primer required on all substrates in accordance with TREMproof technical instructions.",
    lap: "Torch-welded laps, terminations and flashings are mandatory to achieve a watertight seal.",
    uv: "Not intended to remain exposed; must be protected from prolonged UV and weather exposure.",
    exclusions: [
      "Not a direct exposed trafficable finish — requires a protective overlay such as tiles, screed or pavers.",
      "Not a substitute for roof-only coatings, liquid polyurethane or acrylic membranes.",
      "Not suitable for planter/root-barrier systems or basement-only waterproofing.",
    ],
    specifierNote: "Confirm exact product use, finish system and hot-work controls with Tremco technical before specification.",
    tdsUrl: "https://www.tremcosealants.com.au/products/tremproof-torch-3000",
    productUrl: "https://www.tremcosealants.com.au/",
  },
  {
    brand: "Sika Australia",
    productName: "SikaShield P24 PE Argo 3 mm",
    productType: "APP modified bitumen torch-applied sheet membrane",
    modifier: "APP modified",
    systemPosition: "Base sheet for protected balcony and terrace systems",
    description: "Torch-applied PE-faced APP membrane used as a base layer in balcony and terrace waterproofing systems. Must be covered by tile, screed or approved protective finishes.",
    applications: [
      "Under tiles and pavers on balconies and terraces",
      "Protected finish systems with screed toppings or pedestal pavers",
      "Balcony waterproofing systems requiring a factory-manufactured base sheet",
    ],
    exposure: "Must not be left exposed; used as a covered base sheet only.",
    properties: [
      "Torch-applied APP modified bitumen sheet with polyethylene facer",
      "Designed for application over primed balcony substrates and under protection layers",
      "Fully welded overlaps and details are mandatory",
      "Suitable for use with tile beds, screed covers and paver protection systems",
    ],
    substrate: "Primed concrete, cementitious screed and compatible masonry substrates.",
    primer: "Primer required on all substrate types per Sika technical data.",
    lap: "All laps, junctions and penetrations must be torch-welded with manufacturer minimum overlap.",
    uv: "Not UV stable when exposed — must be covered by an approved finish.",
    exclusions: [
      "Not for exposed trafficable use or as a finished walking surface.",
      "Not a heat-welded undertile membrane, cold-applied self-adhered membrane or polyurethane membrane.",
      "Not suitable for planter/root-barrier or basement-only applications.",
    ],
    specifierNote: "Specify with SikaShield compatible top sheets and confirm the required protection layer with Sika technical.",
    tdsUrl: "https://aus.sika.com/en/construction/products/sikashield-p24-pe-argo.html",
    productUrl: "https://aus.sika.com/",
  },
  {
    brand: "Sika Australia",
    productName: "SikaShield P44 MG Fidia 4.5 kg/m²",
    productType: "APP modified bitumen mineral cap sheet",
    modifier: "APP modified",
    systemPosition: "Mineral cap sheet for compatible balcony and terrace systems",
    description: "Mineral granule cap sheet designed as the top layer in torch-on balcony systems. Suitable as a UV-resistant cap sheet within a compatible protected finish assembly.",
    applications: [
      "Top-sheet layer in balcony and terrace waterproofing systems",
      "Protected deck assemblies with screed, tiles or pedestal pavers",
      "Balcony systems requiring a mineral finish cap sheet with compatible base sheet",
    ],
    exposure: "Mineral finish provides UV resistance, but it is not a standalone trafficable finished surface without an approved overlay.",
    properties: [
      "APP modified bitumen with mineral granule surface — torch-applied cap sheet",
      "Designed for use as part of a compatible balcony waterproofing system",
      "Requires fully welded laps, upturns and terminations",
      "Suitable over primed base sheets and compatible concrete substrates",
    ],
    substrate: "Primed base sheet membranes, primed concrete and compatible cementitious substrates.",
    primer: "Primer required on the base sheet and substrate as per Sika installation instructions.",
    lap: "Torch-welded laps and flashings are mandatory for watertight performance.",
    uv: "Mineral surfacing enhances UV resistance, but the system still requires a nominated finish or protection layer for trafficable use.",
    exclusions: [
      "Not a direct exposed walking surface unless specifically approved by Sika for the intended finish.",
      "Not suitable as a sole waterproofing solution for planter or basement applications.",
      "Not a substitute for liquid polyurethane, acrylic, or cold-applied sheet membranes.",
    ],
    specifierNote: "Confirm the compatible SikaShield base sheet, protective finish and tile/paver system with Sika technical before specifying.",
    tdsUrl: "https://aus.sika.com/en/construction/products/sikashield-p44-mg-fidia.html",
    productUrl: "https://aus.sika.com/",
  },
];

function TorchOnProductSection() {
  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
            <BookOpen size={15} />
          </div>
          <h3 className="text-base font-extrabold text-sky-950">Common uses — torch-on modified bitumen sheet membranes</h3>
        </div>
        <ul className="space-y-2.5 text-sm leading-7 text-slate-700">
          {[
            "Factory-manufactured torch-on sheet membranes for balconies and terraces where a sheet system is preferred over liquid-applied membranes.",
            "Base sheet and cap sheet systems under tiles, pavers, screeds and protected finishes.",
            "Balcony and terrace waterproofing assemblies requiring careful heat-welded detailing at laps, corners, outlets and penetrations.",
            "Protected balcony finishes where direct UV exposure is avoided or where a mineral cap sheet provides UV resistance.",
            "Balcony remediation systems with compatible top finishes and an approved protection or wearing course.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-700" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-amber-900">Torch-on bitumen membranes must not be confused with:</h3>
        </div>
        <ul className="space-y-2 text-sm leading-6 text-amber-900">
          {[
            "Heat-welded undertile membranes such as WPM 1000-type systems",
            "Cold-applied self-adhered sheet membranes",
            "Liquid-applied polyurethane or acrylic membranes",
            "Cementitious flexible membranes",
            "Trafficable exposed coating systems",
            "Roof-only membranes unless manufacturer data confirms balcony/terrace suitability",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
            <BookOpen size={15} />
          </div>
          <h3 className="text-base font-extrabold text-sky-950">Practical limitation — hot works and installation risk</h3>
        </div>
        <p className="mb-4 text-sm leading-7 text-slate-600">
          Torch-on membrane installation requires skilled licensed or experienced applicators because laps, corners, upturns, outlets and penetrations are critical. Open flame work creates fire risk and may not be suitable near combustible substrates, confined balcony details, timber elements, facade cladding, service penetrations, or occupied strata buildings without strict hot-work controls.
        </p>
        <ul className="space-y-2 text-sm leading-6 text-slate-700">
          {[
            "Confirm fire risk management, hot-work permits and temporary protection for adjacent materials.",
            "Skilled torch-applied installers are required for waterproofing laps, corners, outlets and upturns.",
            "Verify compatibility with the proposed tile, paver, screed or protected finish system before specifying.",
            "Do not use torch-on membranes where the installation detail cannot safely keep the flame away from combustible material.",
            "Confirm the membrane and finish system are suitable for the intended exposure and expected pedestrian traffic.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-700" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">4 products — APP torch-on sheet membranes for balcony and terrace waterproofing</p>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {TORCH_ON_PRODUCTS.map((product) => (
            <div key={product.productName} className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="px-5 py-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">{product.brand}</p>
                    <h3 className="mt-3 text-lg font-extrabold leading-tight text-sky-950">{product.productName}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{product.description}</p>
                  </div>
                </div>

                <div className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
                  <div><span className="font-semibold text-slate-900">Product type:</span> {product.productType}</div>
                  <div><span className="font-semibold text-slate-900">System position:</span> {product.systemPosition}</div>
                  <div><span className="font-semibold text-slate-900">Suitable applications:</span> {product.applications.join("; ")}</div>
                  <div><span className="font-semibold text-slate-900">UV / exposure:</span> {product.exposure}</div>
                  <div><span className="font-semibold text-slate-900">Primer:</span> {product.primer}</div>
                  <div><span className="font-semibold text-slate-900">Lap / joint:</span> {product.lap}</div>
                  <div><span className="font-semibold text-slate-900">Substrate:</span> {product.substrate}</div>
                </div>

                <div className="mt-5 space-y-2 text-sm leading-6 text-slate-700">
                  <p className="font-semibold text-slate-900">Key technical notes</p>
                  <ul className="list-disc pl-5 text-slate-700">
                    {product.properties.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
                  <p className="font-semibold text-slate-900">Where not to use</p>
                  <ul className="list-disc pl-5 text-slate-700">
                    {product.exclusions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                  <p className="font-semibold text-slate-900">Specifier note</p>
                  <p>{product.specifierNote}</p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <a
                    href={product.tdsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:border-slate-300"
                  >
                    TDS link
                  </a>
                  <a
                    href={product.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-slate-300"
                  >
                    Brand / product link
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export function generateStaticParams() {
  return Object.keys(CATEGORY_META).map((slug) => ({ productCategory: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productCategory: string }>;
}): Promise<Metadata> {
  const { productCategory } = await params;
  const cat = CATEGORY_META[productCategory];
  if (!cat) return {};
  const tab = SIBLING_TABS.find((t) => t.slug === productCategory);
  return {
    title: `${cat.fullTitle} — Balcony Waterproofing Repair — Remedial Building Australia`,
    description: `Technical product reference for ${tab?.label.toLowerCase() ?? productCategory} in balcony waterproofing remediation for Australian Class 2 strata apartment buildings.`,
  };
}

export default async function BalconyProductCategoryPage({
  params,
}: {
  params: Promise<{ productCategory: string }>;
}) {
  const { productCategory } = await params;
  const cat = CATEGORY_META[productCategory];
  const activeTab = SIBLING_TABS.find((t) => t.slug === productCategory);

  if (!cat || !activeTab) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-sky-950">Page not found</h1>
          <Link href="/repair-systems/balcony-waterproofing-failure" className="mt-4 inline-flex text-lg font-bold text-slate-900 hover:text-black">
            ← Back to Balcony Waterproofing Failure
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header ── */}
      <SiteHeader />

      <main>

        {/* ── Hero ── */}
        <section className="border-b border-slate-200 bg-white px-4 sm:px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <Link href="/" className="hover:text-sky-700 transition">Home</Link>
              <span>/</span>
              <Link href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</Link>
              <span>/</span>
              <Link href="/repair-systems/waterproofing-water-ingress" className="hover:text-sky-700 transition">Waterproofing Systems</Link>
              <span>/</span>
              <Link href="/repair-systems/balcony-waterproofing-failure" className="hover:text-sky-700 transition">Balcony, roof, planter box and podium waterproofing failure</Link>
              <span>/</span>
              <span className="text-sky-950">{activeTab.label}</span>
            </nav>
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 01</p>
                <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  {cat.fullTitle}
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Technical product reference for {activeTab.label.toLowerCase()} in balcony and terrace waterproofing remediation on Australian Class 2 strata apartment buildings.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {cat.stats.map((s) => (
                  <div key={s.label} className="rounded-xl border border-slate-100 bg-white p-3 text-center">
                    <div className="text-lg font-extrabold leading-tight text-sky-950">{s.value}</div>
                    <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Sibling tabs ── */}
        <div className="border-b border-slate-200 bg-white px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end gap-0 overflow-x-auto">
              {SIBLING_TABS.map((tab) => {
                const active = tab.slug === productCategory;
                return (
                  <Link
                    key={tab.slug}
                    href={`/repair-systems/balcony-waterproofing-failure/${tab.slug}`}
                    className={`relative shrink-0 border-b-2 px-5 py-4 text-sm font-bold whitespace-nowrap transition ${
                      active
                        ? "border-red-700 text-sky-950"
                        : "border-transparent text-slate-500 hover:text-sky-900"
                    }`}
                  >
                    {tab.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <section className="px-4 sm:px-8 py-14">
          <div className="mx-auto max-w-7xl space-y-10">

            {/* What is it */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
                  <BookOpen size={15} />
                </div>
                <h3 className="text-base font-extrabold text-sky-950">What is {activeTab.label.toLowerCase()}?</h3>
              </div>
              <p className="text-sm leading-7 text-slate-600">{cat.intro}</p>
            </div>

            {productCategory === "sheet-membranes-torch-on" ? (
              <TorchOnProductSection />
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
                <div className="mx-auto max-w-xl text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                    <Clock size={24} className="text-slate-400" />
                  </div>
                  <h2 className="text-xl font-extrabold text-sky-950">Product reference in development</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Detailed product comparisons, brand equivalents, technical specifications and procurement sources for {activeTab.label.toLowerCase()} are being compiled. Check back soon, or use the AI Scope Builder to get system recommendations.
                  </p>
                  <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <Link
                      href="/ai-scope-builder"
                      className="inline-flex items-center gap-2 rounded-xl bg-sky-950 px-5 py-2.5 text-sm font-bold text-white hover:bg-sky-800 transition"
                    >
                      AI Scope Builder <ArrowRight size={14} />
                    </Link>
                    <Link
                      href="/repair-systems/balcony-waterproofing-failure/liquid-applied-membranes-polyurethane"
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-bold text-sky-950 hover:bg-white hover:border-sky-200 transition"
                    >
                      See PU membrane products <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>

        {/* ── Disclaimer + related links ── */}
        <section className="border-t border-slate-200 bg-slate-50 px-4 sm:px-8 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Disclaimer</p>
              <p className="text-xs leading-6 text-amber-900">
                This page provides general technical information only. Final product selection must be confirmed against the current manufacturer technical data sheet, project specification, substrate condition, system configuration, exposure level, drainage design, required finish, NCC requirements, AS 4654 requirements where applicable, hot-work permit requirements, and applicator warranty conditions.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  href: "/repair-systems/waterproofing-water-ingress",
                  label: "Back to Waterproofing Systems",
                  title: "Browse all waterproofing defect subcategories",
                },
                {
                  href: "/repair-systems/balcony-waterproofing-failure",
                  label: "Back to Balcony Waterproofing Failure",
                  title: "Browse all product categories for this defect",
                },
                {
                  href: "/defect-library/waterproofing-water-ingress/balcony-waterproofing-failure",
                  label: "Defect Library",
                  title: "Balcony Waterproofing Failure — causes, inspection, methodology",
                },
                {
                  href: "/ai-scope-builder",
                  label: "AI Scope Builder",
                  title: "Generate a scope of works for balcony waterproofing remediation",
                },
              ].map((card) => (
                <a
                  key={card.href}
                  href={card.href}
                  className="group block rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-sky-200 hover:shadow-md"
                >
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">{card.label}</div>
                  <h4 className="text-sm font-extrabold leading-snug text-sky-950">{card.title}</h4>
                  <div className="mt-4 flex items-center gap-1 text-xs font-bold text-sky-700 transition group-hover:text-red-700">
                    Open <ArrowRight size={11} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <SeoCrossPromo />

      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <Link href="/repair-systems/balcony-waterproofing-failure" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">
            ← Balcony Waterproofing Failure
          </Link>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">
              A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
            <div className="flex flex-col gap-2">
              <Link href="/directory" className="hover:text-sky-700">Business Directory</Link>
              <Link href="/repair-systems" className="hover:text-sky-700">Repair Systems</Link>
              <Link href="/defect-library" className="hover:text-sky-700">Defect Library</Link>
              <Link href="/industry-news" className="hover:text-sky-700">News &amp; Insights</Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/advertise" className="hover:text-sky-700">Advertise With Us</Link>
              <Link href="/contact" className="hover:text-sky-700">Contact</Link>
              <Link href="/faq" className="hover:text-sky-700">FAQ</Link>
              <Link href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-sky-700">Terms</Link>
              <a href="#" className="termly-display-preferences hover:text-sky-700">Consent Preferences</a>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl border-t border-slate-200 px-5 py-5 text-xs text-slate-400">
          © 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved. Unauthorised reproduction prohibited.
        </div>
      </footer>
    </div>
  );
}
