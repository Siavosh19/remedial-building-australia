// Auto-generated from Concrete_Structural_Defects_v2.xlsx — do not edit manually.

export interface MaterialRow {
  materialName: string;
  productType: string | null;
  brandArdex: string | null;
  brandSika: string | null;
  brandFosroc: string | null;
  brandTremco: string | null;
  brandParchem: string | null;
  unitOfMeasure: string | null;
  packSize: string | null;
  notes: string | null;
}
export interface ProductCategoryData {
  slug: string;
  label: string;
  materials: MaterialRow[];
}
export interface SubcategoryData {
  slug: string;
  label: string;
  productCategories: ProductCategoryData[];
}
export const CONCRETE_DEFECTS_DATA: SubcategoryData[] = [
  {
    "slug": "concrete-spalling",
    "label": "Concrete spalling",
    "productCategories": [
      {
        "slug": "repair-mortars-polymer-modified",
        "label": "Repair mortars (polymer-modified)",
        "materials": [
          {
            "materialName": "Concrete repair mortar (polymer-modified)",
            "productType": "Polymer-modified structural repair mortar",
            "brandArdex": "Ardex TRM – polymer-modified structural repair mortar, 20 kg bag",
            "brandSika": "Sika MonoTop-612 / MonoTop-620 – polymer-modified repair mortar, 25 kg bag",
            "brandFosroc": "Fosroc Renderoc HB / Renderoc LA – structural repair mortar, 25 kg bag",
            "brandTremco": "Tremco TREMproof 900 – polymer-modified repair mortar, 25 kg bag",
            "brandParchem": "Parchem Nitomortar FC – polymer-modified repair mortar, 25 kg bag",
            "unitOfMeasure": "bag",
            "packSize": "20 kg",
            "notes": "Polymer-modified; complies with AS 1012. Apply in layers max 30 mm. Bond coat essential before application."
          }
        ]
      },
      {
        "slug": "cementitious-repair-mortars",
        "label": "Cementitious repair mortars",
        "materials": [
          {
            "materialName": "Cementitious repair mortar",
            "productType": "Cementitious polymer repair mortar",
            "brandArdex": "Ardex TRM – cementitious polymer repair mortar, 20 kg bag",
            "brandSika": "Sika MonoTop-412N – cementitious repair mortar, 25 kg bag",
            "brandFosroc": "Fosroc Renderoc GP – general purpose cementitious repair mortar, 25 kg bag",
            "brandTremco": "Tremco TREMproof Mortar – cementitious repair mortar, 25 kg bag",
            "brandParchem": "Mapei Mapegrout Fast-Set – cementitious repair mortar, 25 kg bag",
            "unitOfMeasure": "bag",
            "packSize": "20-25 kg",
            "notes": "General spall repairs where epoxy not required. Apply in layers max 50 mm. Use SBR bonding agent."
          }
        ]
      },
      {
        "slug": "epoxy-repair-mortars",
        "label": "Epoxy repair mortars",
        "materials": [
          {
            "materialName": "Epoxy repair mortar",
            "productType": "2-part / 3-part epoxy repair mortar",
            "brandArdex": "Ardex WA / Ardex FE – 3-part epoxy repair mortar, 5 kg kit",
            "brandSika": "Sika Sikadur-42 / Sika MonoTop Epoxy – 2-part epoxy repair mortar, 5 kg kit",
            "brandFosroc": "Fosroc Nitomortar 50 – 3-part epoxy repair mortar, 5 kg kit",
            "brandTremco": "Tremco Spectru-Bond 600 – 2-part epoxy repair mortar, 5 kg kit",
            "brandParchem": "Parchem Nitomortar EF – 3-part epoxy repair mortar, 5 kg kit",
            "unitOfMeasure": "bag/kit",
            "packSize": "5-25 kg",
            "notes": "Use where high early strength or chemical resistance required. Max layer 10 mm. Priming essential."
          }
        ]
      },
      {
        "slug": "bonding-agents-sbr-latex",
        "label": "Bonding agents & SBR latex",
        "materials": [
          {
            "materialName": "Bonding agent / SBR latex",
            "productType": "SBR polymer bonding agent and primer",
            "brandArdex": "Ardex P 51 – acrylic/SBR bonding agent and primer, 5 L",
            "brandSika": "Sika Latex SBR – SBR latex bonding admixture, 5 L; Sika Icosit EP Primer – epoxy bond coat, 5 L kit",
            "brandFosroc": "Fosroc Nitobond SBR – SBR latex bonding agent, 5 L; Fosroc Nitobond EP – epoxy bond coat, 5 L",
            "brandTremco": "Tremco THC Bonding Agent – acrylic bonding primer, 5 L",
            "brandParchem": "Parchem Concure SBR – SBR admixture and bonding agent, 5 L",
            "unitOfMeasure": "litre",
            "packSize": "5-20 L",
            "notes": "Brush onto prepared substrate before mortar. Also added to mortar mix at 10% by weight of water."
          }
        ]
      },
      {
        "slug": "rebar-primers-inhibitors",
        "label": "Rebar primers & inhibitors",
        "materials": [
          {
            "materialName": "Reinforcement primer (epoxy/zinc-rich)",
            "productType": "2-part epoxy zinc-rich rebar primer",
            "brandArdex": "Ardex – specify Fosroc Nitoprime Zincrich (complementary system)",
            "brandSika": "Sika Ferrogard-903+ – migrating corrosion inhibitor applied to concrete surface, 5-20 L",
            "brandFosroc": "Fosroc Nitoprime Zincrich – 2-part epoxy zinc-rich rebar primer, 1 L kit",
            "brandTremco": "Dulux Zincanode 402 – 2-part epoxy zinc-rich primer, 4 L kit",
            "brandParchem": "Parchem Zinc Primer – 2-part epoxy zinc-rich rebar primer, 1 L kit",
            "unitOfMeasure": "litre",
            "packSize": "1-5 L",
            "notes": "Apply to cleaned, rust-free rebar before repair mortar. Critical in chloride-affected structures."
          }
        ]
      },
      {
        "slug": "curing-compounds",
        "label": "Curing compounds",
        "materials": [
          {
            "materialName": "Curing compound (acrylic)",
            "productType": "Water-based acrylic concrete curing compound",
            "brandArdex": "Ardex WB2 – water-based acrylic curing compound, 5 L",
            "brandSika": "Sika Antisol E – acrylic resin curing compound, 5 L",
            "brandFosroc": "Fosroc Concure WB – water-based curing membrane, 5 L",
            "brandTremco": "Parchem Concure WB – water-based acrylic curing compound, 5 L",
            "brandParchem": "Mapei Mapecure S – acrylic curing compound, 5 L",
            "unitOfMeasure": "litre",
            "packSize": "5-20 L",
            "notes": "Apply immediately after finishing. Forms moisture-retaining film. Min 7 days curing per AS 3600."
          }
        ]
      },
      {
        "slug": "curing-sheeting",
        "label": "Curing sheeting",
        "materials": [
          {
            "materialName": "Polythene sheeting (curing)",
            "productType": "200 micron LDPE polyethylene curing sheet",
            "brandArdex": "Tuff Wrap – 200 micron polyethylene curing sheet, roll",
            "brandSika": "Visqueen – 250 micron heavy-duty poly sheeting, roll",
            "brandFosroc": "Bunnings Builders Plastic – 200 micron LDPE sheeting, roll",
            "brandTremco": "Packline Australia – 200 micron curing plastic, roll",
            "brandParchem": "Generic – 200 micron polyethylene curing sheeting, roll",
            "unitOfMeasure": "roll",
            "packSize": "various",
            "notes": "Lap joints 300 mm min. Tape all edges. Keep moist underneath for wet curing. Min 7 days."
          }
        ]
      },
      {
        "slug": "formwork-timber",
        "label": "Formwork timber",
        "materials": [
          {
            "materialName": "Formwork timber (DAR pine)",
            "productType": "H3 treated DAR structural pine framing",
            "brandArdex": "Hyne Timber – MGP10 DAR pine 90x35 mm, m length",
            "brandSika": "Timberlink – structural pine 90x35 mm DAR, m length",
            "brandFosroc": "Carter Holt Harvey – DAR pine framing 90x35 mm, m",
            "brandTremco": "Bowens Timber – 90x35 mm DAR pine dressed timber, m",
            "brandParchem": "Local timber merchant – DAR pine 90x35 or 140x35 mm, m",
            "unitOfMeasure": "m",
            "packSize": "various",
            "notes": "H3 CCA treated per AS 1604. DAR for smooth form faces. Typical 90x35 or 140x35 mm."
          }
        ]
      },
      {
        "slug": "formwork-plywood",
        "label": "Formwork plywood",
        "materials": [
          {
            "materialName": "Formwork plywood (17 mm)",
            "productType": "Phenolic-faced structural form ply",
            "brandArdex": "Austral Ply – 17 mm phenolic-faced form ply, 2400x1200 mm sheet",
            "brandSika": "Carter Holt Harvey Structaply – 17 mm structural form ply, 2400x1200 mm",
            "brandFosroc": "Big River Plywood – 17 mm form ply, 2400x1200 mm sheet",
            "brandTremco": "Weyerhaeuser Structaply – 17 mm form ply, 2400x1200 mm",
            "brandParchem": "Local merchant – 17 mm AS/NZS 6669 structural form ply, 2400x1200 mm",
            "unitOfMeasure": "sheet",
            "packSize": "2400x1200 mm",
            "notes": "Phenolic-faced to AS/NZS 6669. Apply release agent before each pour. Limit reuse per face condition."
          }
        ]
      },
      {
        "slug": "form-release-agents",
        "label": "Form release agents",
        "materials": [
          {
            "materialName": "Form release oil",
            "productType": "Petroleum or water-based form release agent",
            "brandArdex": "Sika Rugasol-F – chemical form release agent, 20 L drum",
            "brandSika": "Sika Rugasol-S – surface retarder and release agent, 20 L drum",
            "brandFosroc": "Fosroc Mould Oil – petroleum-based form release, 20 L drum",
            "brandTremco": "Condor Release Agent – petroleum-based form oil, 20 L drum",
            "brandParchem": "Parchem Release Agent – biodegradable form release, 20 L drum",
            "unitOfMeasure": "litre",
            "packSize": "5-20 L",
            "notes": "Apply thin even coat to form face before each pour. Prevents concrete bond. Clean residue after stripping."
          }
        ]
      },
      {
        "slug": "tie-wire-fixings",
        "label": "Tie wire & fixings",
        "materials": [
          {
            "materialName": "Tie wire (1.6 mm)",
            "productType": "Annealed mild steel tie wire",
            "brandArdex": "Hy-Ten – 1.6 mm annealed mild steel tie wire, 1 kg coil",
            "brandSika": "Midalia Steel – 1.6 mm tie wire, 1 kg roll",
            "brandFosroc": "OneSteel – mild steel tie wire 1.6 mm, 1 kg coil",
            "brandTremco": "Lysaght – 1.6 mm tie wire, 1 kg reel",
            "brandParchem": "Generic – 1.6 mm annealed mild steel tie wire, 1 kg coil",
            "unitOfMeasure": "roll",
            "packSize": "1 kg",
            "notes": "Standard 1.6 mm annealed wire for tying rebar. Use 316 stainless in marine/chloride environments."
          }
        ]
      },
      {
        "slug": "cement-aggregates",
        "label": "Cement & aggregates",
        "materials": [
          {
            "materialName": "Portland cement",
            "productType": "General Purpose (GP) Portland cement",
            "brandArdex": "Boral GP Cement – General Purpose Portland cement, 20 kg bag",
            "brandSika": "Hanson OPC – Ordinary Portland cement GP grade, 20 kg bag",
            "brandFosroc": "Cockburn Cement – GP Portland cement, 20 kg bag",
            "brandTremco": "Cement Australia GP – General Purpose cement, 20 kg bag",
            "brandParchem": "Independent Cement & Lime – GP Portland cement, 20 kg bag",
            "unitOfMeasure": "bag",
            "packSize": "20 kg",
            "notes": "Used in site-batched mortar mixes. Do not use alone for structural repairs. Add polymer admix."
          },
          {
            "materialName": "Sand (washed river sand)",
            "productType": "Concrete/mortar grade washed sand",
            "brandArdex": "Boral Washed River Sand – screened, 20 kg bag or bulk tonne",
            "brandSika": "Hanson Washed River Sand – concrete/mortar grade, bulk tonne",
            "brandFosroc": "Independent Quarry – washed river sand to AS 2758.1, bulk tonne",
            "brandTremco": "Quarry Direct – washed river sand, 20 kg bag or bulk tonne",
            "brandParchem": "Local quarry – washed river sand to AS 2758.1, bulk tonne",
            "unitOfMeasure": "bag/bulk",
            "packSize": "20 kg / tonne",
            "notes": "To AS 2758.1. Max 4.75 mm particle size. Must be clean, salt-free, no organic matter."
          },
          {
            "materialName": "Coarse aggregate (10 mm)",
            "productType": "10 mm crushed rock concrete aggregate",
            "brandArdex": "Boral 10 mm Crushed Rock – washed concrete aggregate, bulk tonne",
            "brandSika": "Hanson 10 mm Aggregate – crushed basalt / granite, bulk tonne",
            "brandFosroc": "Independent Quarry – 10 mm washed aggregate to AS 2758.1, bulk tonne",
            "brandTremco": "Quarry Direct – 10 mm aggregate to AS 2758.1, bulk tonne",
            "brandParchem": "Local quarry – 10 mm nominal size aggregate, bulk tonne",
            "unitOfMeasure": "bag/bulk",
            "packSize": "20 kg / tonne",
            "notes": "To AS 2758.1. Washed, graded 10 mm nominal. For site-mixed encasement or patch concrete."
          }
        ]
      },
      {
        "slug": "abrasives-blades-tools",
        "label": "Abrasives, blades & tools",
        "materials": [
          {
            "materialName": "Saw-cut crack chaser blade (diamond)",
            "productType": "Diamond crack chaser and grooving blade",
            "brandArdex": "Husqvarna Vari-Cut – diamond crack chaser blade, 125 mm dia",
            "brandSika": "Norton Clipper – diamond crack chaser disc, 115/125 mm dia",
            "brandFosroc": "Makita Diamond – segmented crack chaser blade, 125 mm dia",
            "brandTremco": "Bosch Expert – diamond crack chasing blade, 125 mm dia",
            "brandParchem": "Lackmond Rock Master – crack chaser grooving blade, 125 mm",
            "unitOfMeasure": "each",
            "packSize": "various",
            "notes": "Creates consistent V-joint or square groove for repair or sealant. Min 10 mm wide x 10 mm deep."
          },
          {
            "materialName": "Angle grinder disc (grinding)",
            "productType": "Diamond and abrasive concrete grinding disc",
            "brandArdex": "Husqvarna Vari-Cut – diamond grinding disc, 100/125 mm",
            "brandSika": "Norton Bear-Tex – abrasive concrete grinding disc, 100/125 mm",
            "brandFosroc": "Metabo – abrasive grinding wheel, 125 mm",
            "brandTremco": "Makita – abrasive/diamond grinding disc, 125 mm",
            "brandParchem": "Bosch Expert – concrete surface grinding disc, 125 mm",
            "unitOfMeasure": "each",
            "packSize": "100/125 mm",
            "notes": "For scarifying concrete surfaces pre-repair. Achieve min CSP 3 profile per ICRI 310.2. Use with vacuum."
          },
          {
            "materialName": "Masking tape",
            "productType": "General purpose painters masking tape",
            "brandArdex": "3M 2090 – painters masking tape, 48 mm roll",
            "brandSika": "Tesa 4323 – general purpose masking tape, 48 mm roll",
            "brandFosroc": "Intertape PG21 – professional masking tape, 48 mm roll",
            "brandTremco": "Shurtape CP 66 – painter grade masking tape, 48 mm roll",
            "brandParchem": "Selleys – masking tape, 48 mm roll",
            "unitOfMeasure": "roll",
            "packSize": "48 mm",
            "notes": "Mask adjacent surfaces before sealant or coating. Remove while product still wet or uncured."
          }
        ]
      }
    ]
  },
  {
    "slug": "reinforcement-corrosion",
    "label": "Reinforcement corrosion",
    "productCategories": [
      {
        "slug": "corrosion-inhibitors-mci",
        "label": "Corrosion inhibitors (MCI)",
        "materials": [
          {
            "materialName": "Rust inhibitor / corrosion inhibitor (migrating)",
            "productType": "Migrating corrosion inhibitor (MCI)",
            "brandArdex": "Ardex – specify Sika Ferrogard-903+ (complementary system)",
            "brandSika": "Sika Ferrogard-903+ – migrating corrosion inhibitor, surface-applied, 5-20 L",
            "brandFosroc": "Fosroc Renderoc IC – integral corrosion inhibitor added to repair mortar, 1 L",
            "brandTremco": "Tremco Ferroguard – migrating amino alcohol corrosion inhibitor, 5 L",
            "brandParchem": "Parchem Nitocor – corrosion inhibitor admixture for repair mortar, 5 L",
            "unitOfMeasure": "litre",
            "packSize": "5-20 L",
            "notes": "Applied to concrete surface; migrates to rebar. Use as part of full repair system per engineer spec."
          }
        ]
      },
      {
        "slug": "epoxy-zinc-rich-primers",
        "label": "Epoxy zinc-rich primers",
        "materials": [
          {
            "materialName": "Epoxy zinc-rich primer",
            "productType": "2-part epoxy zinc-rich rebar primer",
            "brandArdex": "Ardex – specify Dulux Zincanode 402 or Fosroc Nitoprime Zincrich (complementary)",
            "brandSika": "Sika Ferrogard-903+ – corrosion inhibitor and primer coat for cleaned rebar, 5 L",
            "brandFosroc": "Fosroc Nitoprime Zincrich – 2-part epoxy zinc-rich rebar primer, 1 L kit",
            "brandTremco": "Dulux Zincanode 402 – 2-part epoxy zinc-rich primer, 4 L kit",
            "brandParchem": "Jotun Barrier – 2-part zinc-rich epoxy primer, 5 L kit",
            "unitOfMeasure": "litre",
            "packSize": "1-5 L",
            "notes": "Apply to blast-cleaned rebar (Sa 2.5) before repair mortar. Zinc content min 85% dry film. Two coats."
          }
        ]
      },
      {
        "slug": "rebar-primers-inhibitors",
        "label": "Rebar primers & inhibitors",
        "materials": [
          {
            "materialName": "Reinforcement primer (2-part epoxy)",
            "productType": "2-part epoxy rebar primer and bond coat",
            "brandArdex": "Ardex – specify Fosroc Nitoprime Zincrich (complementary)",
            "brandSika": "Sika Ferrogard-903+ – 2-part epoxy primer system for rebar, 5 L",
            "brandFosroc": "Fosroc Nitoprime Zincrich – 2-part epoxy zinc-rich rebar primer, 1 L kit",
            "brandTremco": "Dulux Zincanode 402 – 2-pack epoxy zinc primer, 4 L kit",
            "brandParchem": "Parchem Zinc Primer – 2-part epoxy rebar primer, 1 L kit",
            "unitOfMeasure": "kit",
            "packSize": "2 L",
            "notes": "2-part system; mix A+B per ratio. Apply to clean metal within 30 min of mixing. Overcoat within pot life."
          }
        ]
      },
      {
        "slug": "cathodic-protection",
        "label": "Cathodic protection",
        "materials": [
          {
            "materialName": "Cathodic protection anodes (zinc/titanium)",
            "productType": "Embedded sacrificial zinc and impressed current anodes",
            "brandArdex": "Fosroc Cathanode – embedded zinc sacrificial anode system for concrete repair",
            "brandSika": "Galvashield XP – discrete embedded zinc sacrificial anode for concrete CP",
            "brandFosroc": "Vector Corrosion Technologies – Galvashield embedded zinc anodes",
            "brandTremco": "Corrpro Australia – impressed current titanium mesh anode system",
            "brandParchem": "CPT (Cathodic Protection Technologies) – zinc / MMO titanium anodes",
            "unitOfMeasure": "each",
            "packSize": "various",
            "notes": "Sacrificial zinc or impressed-current titanium. Design by corrosion engineer per AS 2832. Ongoing monitoring required."
          }
        ]
      },
      {
        "slug": "repair-mortars-polymer-modified",
        "label": "Repair mortars (polymer-modified)",
        "materials": [
          {
            "materialName": "Concrete repair mortar (polymer-modified)",
            "productType": "Polymer-modified structural repair mortar",
            "brandArdex": "Ardex TRM – polymer-modified structural repair mortar, 20 kg bag",
            "brandSika": "Sika MonoTop-612 / MonoTop-620 – polymer repair mortar, 25 kg bag",
            "brandFosroc": "Fosroc Renderoc HB / Renderoc LA – structural repair mortar, 25 kg bag",
            "brandTremco": "Tremco TREMproof 900 – polymer-modified repair mortar, 25 kg bag",
            "brandParchem": "Parchem Nitomortar FC – polymer-modified repair mortar, 25 kg bag",
            "unitOfMeasure": "bag",
            "packSize": "20 kg",
            "notes": "Encapsulate rebar after priming. Build out in layers max 30 mm. Cure minimum 7 days. Low permeability critical."
          }
        ]
      },
      {
        "slug": "reinforcement-mesh",
        "label": "Reinforcement mesh",
        "materials": [
          {
            "materialName": "Stainless steel rebar (316 grade)",
            "productType": "316 grade stainless steel reinforcement bar",
            "brandArdex": "InfraBuild (OneSteel) – 316 stainless steel rebar, 6 m lengths, various diameters",
            "brandSika": "Midalia Steel – duplex stainless rebar 316 / 2205, 6 m length",
            "brandFosroc": "Liberty Steel – stainless rebar 316 grade, 6 m length",
            "brandTremco": "Stainless Steel Specialists Australia – 316 SS rebar, 6 m",
            "brandParchem": "Mtalex – 316 grade stainless reinforcing bar, 6 m length",
            "unitOfMeasure": "length",
            "packSize": "6 m",
            "notes": "For replacement rebar in chloride-affected zones. Lap splice or mechanical coupler to existing black steel."
          }
        ]
      },
      {
        "slug": "epoxy-anchoring-adhesives",
        "label": "Epoxy anchoring adhesives",
        "materials": [
          {
            "materialName": "Epoxy adhesive (rebar anchoring)",
            "productType": "Structural 2-part epoxy anchor and injection resin",
            "brandArdex": "Ardex AF 200 – 2-part epoxy anchoring adhesive, 380 mL cartridge",
            "brandSika": "Sika AnchorFix-3+ – high-strength 2-part epoxy anchor adhesive, 345 mL cartridge",
            "brandFosroc": "Fosroc Nitobond EP – 2-part structural epoxy adhesive, 380 mL cartridge",
            "brandTremco": "Hilti HIT-RE 500 V4 – 2-part epoxy rebar injection system, 500 mL cartridge",
            "brandParchem": "Simpson Strong-Tie SET-XP – high-strength 2-part epoxy anchor resin, 380 mL",
            "unitOfMeasure": "cartridge",
            "packSize": "380 mL",
            "notes": "Drill hole 1.5x bar dia. Clean: blow, brush, blow x3. Inject resin, insert bar with rotation. Min embedment per ETA."
          }
        ]
      },
      {
        "slug": "cfrp-strips-laminates",
        "label": "CFRP strips & laminates",
        "materials": [
          {
            "materialName": "Carbon-fibre reinforcement strip (CFRP)",
            "productType": "Pultruded CFRP laminate strip",
            "brandArdex": "Sika CarboDur S512 / S612 – pultruded CFRP laminate strip, 50-120 mm wide x 1.2 mm thick, roll",
            "brandSika": "Sika CarboDur M614 – higher modulus CFRP laminate strip, roll",
            "brandFosroc": "Fosroc Nitowrap CFRP – pultruded carbon fibre laminate strip, roll",
            "brandTremco": "Mapei Mapewrap C Uni-Axial – CFRP unidirectional strip, roll",
            "brandParchem": "Parchem Nitowrap Carbon – CFRP laminate reinforcement strip, roll",
            "unitOfMeasure": "roll/length",
            "packSize": "various",
            "notes": "For flexural and shear strengthening. Apply with compatible epoxy laminating resin. Structural engineer to design."
          }
        ]
      },
      {
        "slug": "epoxy-laminating-resins",
        "label": "Epoxy laminating resins",
        "materials": [
          {
            "materialName": "Epoxy laminating resin (CFRP bonding)",
            "productType": "2-part epoxy laminating and impregnation resin for CFRP",
            "brandArdex": "Ardex – specify Sika Sikadur-300 epoxy laminating system (complementary)",
            "brandSika": "Sika Sikadur-300 – 2-part epoxy impregnation and laminating resin for CFRP, kit",
            "brandFosroc": "Fosroc Nitowrap EP – 2-part epoxy primer and laminating resin for CFRP, kit",
            "brandTremco": "Mapei Mapewrap 31 – 2-part epoxy laminating resin for CFRP bonding, kit",
            "brandParchem": "Parchem Nitowrap EP – 2-part epoxy laminating resin for CFRP, kit",
            "unitOfMeasure": "kit",
            "packSize": "various",
            "notes": "Prime concrete first. Apply resin, embed CFRP strip, apply second resin coat. Control temperature 10-35 deg C."
          }
        ]
      },
      {
        "slug": "abrasives-blades-tools",
        "label": "Abrasives, blades & tools",
        "materials": [
          {
            "materialName": "Wire brush (steel)",
            "productType": "Steel wire brush for surface preparation",
            "brandArdex": "Osborn – steel wire cup brush and hand brush, each",
            "brandSika": "Garant – steel wire hand brush for masonry and concrete, each",
            "brandFosroc": "Stanley – 5-row steel wire brush, each",
            "brandTremco": "Makita GA-WC – angle grinder wire cup brush, 100/125 mm",
            "brandParchem": "Generic – steel wire brush, each",
            "unitOfMeasure": "each",
            "packSize": "various",
            "notes": "For removing loose rust and contamination from rebar. Follow with blast cleaning or grinder for Sa 2.5."
          },
          {
            "materialName": "Grit blast media (steel grit)",
            "productType": "Steel grit and garnet abrasive blast media",
            "brandArdex": "Abrasive Blasting Supplies – steel grit G18 / G25 angular, 25 kg bag",
            "brandSika": "Blastmaster – steel grit G18 angular, 25 kg bag",
            "brandFosroc": "Newson Gale – garnet blasting media G25, 25 kg bag",
            "brandTremco": "Eltech – steel grit G25, 25 kg bag",
            "brandParchem": "Clemco – steel shot S230 and grit G18, 25 kg bag",
            "unitOfMeasure": "bag",
            "packSize": "25 kg",
            "notes": "For blast-cleaning rebar to Sa 2.5 per ISO 8501-1. Collect and contain all blast media on site."
          }
        ]
      }
    ]
  },
  {
    "slug": "concrete-cracking",
    "label": "Concrete cracking",
    "productCategories": [
      {
        "slug": "injection-resins-pu-flexible",
        "label": "Injection resins (PU flexible)",
        "materials": [
          {
            "materialName": "Polyurethane injection resin (flexible)",
            "productType": "Flexible and hydrophilic PU injection resin",
            "brandArdex": "Ardex WPM-PI – flexible polyurethane injection resin, 600 mL cartridge / 20 L drum",
            "brandSika": "Sika Injection-107 (hydrophilic) / Sika Injection-306 (hydrophobic) – PU resin, 600 mL",
            "brandFosroc": "Fosroc Nitofill PU Flex – flexible polyurethane injection resin, 600 mL cartridge",
            "brandTremco": "Tremco THC Injection Resin – expanding polyurethane injection resin, 600 mL",
            "brandParchem": "Parchem Nitofill PU Hydrophilic – flexible and expanding PU injection resin, 600 mL",
            "unitOfMeasure": "cartridge/drum",
            "packSize": "600 mL / 20 L",
            "notes": "For active or dormant cracks. Hydrophilic type expands on contact with water. Min crack width 0.1 mm."
          }
        ]
      },
      {
        "slug": "injection-resins-epoxy-rigid",
        "label": "Injection resins (epoxy rigid)",
        "materials": [
          {
            "materialName": "Epoxy injection resin (rigid, structural)",
            "productType": "2-part rigid epoxy structural injection resin",
            "brandArdex": "Ardex WPM-EI – 2-part rigid epoxy injection resin, 380 mL cartridge",
            "brandSika": "Sika Injection-451 N / Sikadur-52 – low-viscosity 2-part epoxy injection resin, 380 mL",
            "brandFosroc": "Fosroc Nitofill Epoxy – 2-part rigid epoxy injection resin, 380 mL cartridge",
            "brandTremco": "Tremco Spectru-Bond 600 – 2-part epoxy injection resin, 380 mL cartridge",
            "brandParchem": "Parchem Nitofill Epoxy – 2-part rigid epoxy injection resin, 380 mL kit",
            "unitOfMeasure": "cartridge/kit",
            "packSize": "380 mL / 5 L",
            "notes": "For structural crack reinstatement. Crack must be dry or use suitable primer. Inject from low to high port."
          }
        ]
      },
      {
        "slug": "crack-injection-ports",
        "label": "Crack injection ports",
        "materials": [
          {
            "materialName": "Crack injection ports (surface-mounted)",
            "productType": "Surface-mounted plastic injection ports and packers",
            "brandArdex": "Ardex – specify Desoi plastic surface injection ports (complementary)",
            "brandSika": "Sika Crack Port – plastic surface-mounted crack injection port, each",
            "brandFosroc": "Fosroc Injection Packer – surface-mounted injection port, each",
            "brandTremco": "Tremco Injection Port – surface-mounted crack injection port, each",
            "brandParchem": "Desoi Flat Port – plastic surface-mounted injection port, each",
            "unitOfMeasure": "each",
            "packSize": "various",
            "notes": "Bond to crack surface with epoxy paste. Space at 1x crack depth intervals. Remove after injection and cure."
          }
        ]
      },
      {
        "slug": "epoxy-anchoring-adhesives",
        "label": "Epoxy anchoring adhesives",
        "materials": [
          {
            "materialName": "Epoxy paste (port adhesive)",
            "productType": "High-modulus 2-part epoxy paste for port bonding",
            "brandArdex": "Ardex – specify Sika Sikadur-31 (complementary system)",
            "brandSika": "Sika Sikadur-31 – high-modulus 2-part epoxy paste adhesive, 380 mL cartridge",
            "brandFosroc": "Fosroc Nitobond EP Paste – 2-part structural epoxy paste adhesive, 380 mL cartridge",
            "brandTremco": "Tremco Spectru-Bond Paste – 2-part epoxy port adhesive, 380 mL cartridge",
            "brandParchem": "Parchem Epoxy Port Adhesive – 2-part epoxy paste, 380 mL cartridge",
            "unitOfMeasure": "cartridge",
            "packSize": "380 mL",
            "notes": "Bond injection ports to crack surface. Also seals crack face between ports. Allow full cure before injecting."
          }
        ]
      },
      {
        "slug": "sealants-polyurethane",
        "label": "Sealants (polyurethane)",
        "materials": [
          {
            "materialName": "Polyurethane sealant (flexible joint)",
            "productType": "1-part polyurethane flexible joint sealant",
            "brandArdex": "Ardex ST – 1-part polyurethane joint sealant, 600 mL cartridge",
            "brandSika": "Sika Sikaflex-11FC / Sikaflex Pro-3 WF – 1-part PU sealant, 600 mL cartridge",
            "brandFosroc": "Fosroc Thioflex 600 / Nitoseal MS600 – PU joint sealant, 600 mL cartridge",
            "brandTremco": "Tremco Dymonic 100 – high-movement PU sealant, 600 mL cartridge",
            "brandParchem": "Parchem Pro-Sealant PU600 – 1-part PU sealant, 600 mL cartridge",
            "unitOfMeasure": "cartridge",
            "packSize": "600 mL",
            "notes": "For dormant or movement cracks routed and sealed. Joint width to depth ratio 2:1. Bond breaker tape at base."
          }
        ]
      },
      {
        "slug": "backer-rods",
        "label": "Backer rods",
        "materials": [
          {
            "materialName": "Backer rod (closed-cell foam)",
            "productType": "Closed-cell polyethylene foam backer rod",
            "brandArdex": "Norseal V740 – closed-cell polyethylene backer rod, 6-50 mm dia",
            "brandSika": "Sika – specify Norseal V740 or Rexnord backer rod (complementary)",
            "brandFosroc": "Fosroc – specify Norseal V740 closed-cell backer rod (complementary)",
            "brandTremco": "Norseal V740 – closed-cell polyethylene backer rod, 6-50 mm dia",
            "brandParchem": "Rexnord Villex – closed-cell polyethylene backer rod, 6-50 mm dia",
            "unitOfMeasure": "roll",
            "packSize": "6-20 mm dia",
            "notes": "Insert to control sealant depth at 1:1 width to depth. Prevents 3-point adhesion. Slightly oversized for compression."
          }
        ]
      },
      {
        "slug": "abrasives-blades-tools",
        "label": "Abrasives, blades & tools",
        "materials": [
          {
            "materialName": "Saw-cut crack chaser blade",
            "productType": "Diamond crack chaser and grooving blade",
            "brandArdex": "Husqvarna Vari-Cut – diamond crack chaser blade, 125 mm dia",
            "brandSika": "Norton Clipper – diamond crack chaser disc, 115/125 mm dia",
            "brandFosroc": "Makita Diamond – segmented crack chaser blade, 125 mm",
            "brandTremco": "Bosch Expert – diamond crack chasing blade, 125 mm dia",
            "brandParchem": "Lackmond Rock Master – crack chaser grooving blade, 125 mm",
            "unitOfMeasure": "each",
            "packSize": "various",
            "notes": "Route cracks to min 10 mm wide x 10 mm deep before sealant application. Use with vacuum extraction."
          },
          {
            "materialName": "Masking tape",
            "productType": "General purpose painters masking tape",
            "brandArdex": "3M 2090 – painters masking tape, 48 mm roll",
            "brandSika": "Tesa 4323 – general purpose masking tape, 48 mm roll",
            "brandFosroc": "Intertape PG21 – professional masking tape, 48 mm roll",
            "brandTremco": "Shurtape CP 66 – painter grade masking tape, 48 mm roll",
            "brandParchem": "Selleys – masking tape, 48 mm roll",
            "unitOfMeasure": "roll",
            "packSize": "48 mm",
            "notes": "Mask edges before sealant. Remove immediately after tooling before product skins over."
          }
        ]
      }
    ]
  },
  {
    "slug": "structural-concrete-deterioration",
    "label": "Structural concrete deterioration",
    "productCategories": [
      {
        "slug": "repair-mortars-polymer-modified",
        "label": "Repair mortars (polymer-modified)",
        "materials": [
          {
            "materialName": "Concrete repair mortar (polymer-modified)",
            "productType": "Polymer-modified structural repair mortar",
            "brandArdex": "Ardex TRM – polymer-modified structural repair mortar, 20 kg bag",
            "brandSika": "Sika MonoTop-612 / MonoTop-620 – polymer repair mortar, 25 kg bag",
            "brandFosroc": "Fosroc Renderoc HB / Renderoc LA – structural repair mortar, 25 kg bag",
            "brandTremco": "Tremco TREMproof 900 – polymer-modified repair mortar, 25 kg bag",
            "brandParchem": "Parchem Nitomortar FC – polymer-modified repair mortar, 25 kg bag",
            "unitOfMeasure": "bag",
            "packSize": "20 kg",
            "notes": "Structural repair per engineer spec. Min concrete cover per AS 3600 must be reinstated in repair."
          }
        ]
      },
      {
        "slug": "epoxy-repair-mortars",
        "label": "Epoxy repair mortars",
        "materials": [
          {
            "materialName": "Epoxy repair mortar (structural)",
            "productType": "2-part / 3-part structural epoxy repair mortar",
            "brandArdex": "Ardex WA – 3-part structural epoxy repair mortar, 5 kg kit",
            "brandSika": "Sika Sikadur-42 – 3-part structural epoxy mortar system, 5 kg kit",
            "brandFosroc": "Fosroc Nitomortar 50 – 3-part structural epoxy repair mortar, 5 kg kit",
            "brandTremco": "Tremco Spectru-Bond 600 – 2-part structural epoxy mortar, 5 kg kit",
            "brandParchem": "Parchem Nitomortar EF – 3-part structural epoxy mortar, 5 kg kit",
            "unitOfMeasure": "kit",
            "packSize": "5-25 kg",
            "notes": "Engineer-specified for structural reinstatement. High strength and chemical resistance. Temp 10-35 deg C."
          }
        ]
      },
      {
        "slug": "cfrp-strips-laminates",
        "label": "CFRP strips & laminates",
        "materials": [
          {
            "materialName": "Carbon-fibre reinforcement strip (CFRP)",
            "productType": "Pultruded CFRP laminate and unidirectional fibre sheet",
            "brandArdex": "Sika CarboDur S512 / S612 – pultruded CFRP laminate strip, various widths, roll",
            "brandSika": "Sika CarboDur Wrap – unidirectional CFRP fabric sheet, roll",
            "brandFosroc": "Fosroc Nitowrap CFRP – pultruded carbon fibre laminate strip, roll",
            "brandTremco": "Mapei Mapewrap C Uni-Axial – CFRP unidirectional reinforcement fabric, roll",
            "brandParchem": "Parchem Nitowrap Carbon Fibre – CFRP laminate strip and fabric, roll",
            "unitOfMeasure": "roll/length",
            "packSize": "various",
            "notes": "Structural engineer to design system. Bond with compatible epoxy resin. Min concrete tensile strength 1.5 MPa."
          }
        ]
      },
      {
        "slug": "epoxy-laminating-resins",
        "label": "Epoxy laminating resins",
        "materials": [
          {
            "materialName": "CFRP epoxy primer & laminating resin",
            "productType": "2-part epoxy primer and laminating resin system for CFRP",
            "brandArdex": "Ardex – specify Sika Sikadur-300 epoxy system (complementary)",
            "brandSika": "Sika Sikadur-300 – 2-part low-viscosity epoxy primer and laminating resin, kit",
            "brandFosroc": "Fosroc Nitowrap EP – 2-part epoxy primer and laminating resin for CFRP, kit",
            "brandTremco": "Mapei Mapewrap 31 – 2-part epoxy laminating resin for CFRP bonding, kit",
            "brandParchem": "Parchem Nitowrap EP – 2-part epoxy primer and laminating resin for CFRP, kit",
            "unitOfMeasure": "kit",
            "packSize": "various",
            "notes": "Part of CFRP strengthening system. Prime concrete, apply resin, lay CFRP, apply second resin layer."
          }
        ]
      },
      {
        "slug": "structural-anchors-dowels",
        "label": "Structural anchors & dowels",
        "materials": [
          {
            "materialName": "Stainless steel dowels / anchors",
            "productType": "316 SS mechanical and chemical anchor system",
            "brandArdex": "Hilti HSA-R2 – 316 SS torque-controlled expansion anchor bolt, M10-M20",
            "brandSika": "Sika AnchorFix-3+ – 316 SS chemical anchor resin with threaded rod, M10-M20",
            "brandFosroc": "Fosroc Nitobond EP + 316 SS threaded rod – 2-part epoxy dowel anchor system",
            "brandTremco": "Simpson Strong-Tie SS Wedge Anchor – 316 SS expansion anchor, M10-M20",
            "brandParchem": "Fischer FH II-SS – stainless steel wedge anchor bolt, M10-M20",
            "unitOfMeasure": "each",
            "packSize": "various",
            "notes": "316 SS min in aggressive environments. Load design per ETA or engineer spec. Pull-test if critical."
          },
          {
            "materialName": "Post-installed anchor bolts (stainless)",
            "productType": "316 SS post-installed expansion and chemical anchor bolts",
            "brandArdex": "Hilti HSA-R2 – 316 SS torque-controlled expansion anchor bolt, M10-M20",
            "brandSika": "Sika AnchorFix-3+ with SS threaded rod – post-installed chemical anchor, M10-M20",
            "brandFosroc": "Fosroc Nitobond EP with 316 SS rod – post-installed epoxy anchor system",
            "brandTremco": "Simpson Strong-Tie SS Wedge Anchor – 316 SS wedge anchor bolt, M10-M20",
            "brandParchem": "Fischer FH II-SS – 316 SS wedge anchor bolt, M10-M20",
            "unitOfMeasure": "each",
            "packSize": "M10-M20",
            "notes": "316 SS for corrosive environments. Min edge distance and embedment per ETA. Torque to spec. Test if critical."
          }
        ]
      },
      {
        "slug": "epoxy-anchoring-adhesives",
        "label": "Epoxy anchoring adhesives",
        "materials": [
          {
            "materialName": "Epoxy adhesive (anchoring)",
            "productType": "2-part structural epoxy anchoring adhesive",
            "brandArdex": "Ardex AF 200 – 2-part epoxy anchoring adhesive, 380 mL cartridge",
            "brandSika": "Sika AnchorFix-3+ – 2-part epoxy anchor adhesive, 345 mL cartridge",
            "brandFosroc": "Fosroc Nitobond EP – 2-part structural epoxy anchoring resin, 380 mL cartridge",
            "brandTremco": "Hilti HIT-RE 500 V4 – 2-part epoxy rebar and anchor injection system, 500 mL",
            "brandParchem": "Simpson Strong-Tie SET-XP – 2-part epoxy anchor resin, 380 mL cartridge",
            "unitOfMeasure": "cartridge",
            "packSize": "380 mL",
            "notes": "Drill, clean (blow x3, brush x3, blow x3), inject resin, insert anchor with rotation. Cure fully before loading."
          }
        ]
      },
      {
        "slug": "formwork-timber",
        "label": "Formwork timber",
        "materials": [
          {
            "materialName": "Formwork (full encasement)",
            "productType": "Full-perimeter formwork for structural concrete encasement",
            "brandArdex": "Rapid Formwork – full encasement formwork system, sheet/m",
            "brandSika": "Peri Formwork – full encasement system VARIO GT 24, sheet/m",
            "brandFosroc": "Doka – full encasement formwork system, sheet/m",
            "brandTremco": "Dincel – PVC permanent structural encasement form (no-strip), m",
            "brandParchem": "Generic – 17 mm plywood and steel angle full encasement formwork, sheet/m",
            "unitOfMeasure": "sheet/m",
            "packSize": "various",
            "notes": "For full column or beam encasement repairs. Engineer to design concrete mix and reinforcement. Grade N32 min."
          }
        ]
      },
      {
        "slug": "non-shrink-grouts",
        "label": "Non-shrink grouts",
        "materials": [
          {
            "materialName": "Non-shrink grout",
            "productType": "Non-shrink precision cementitious grout",
            "brandArdex": "Ardex A 36 / Ardex Grout 12 – non-shrink precision cementitious grout, 25 kg bag",
            "brandSika": "Sika SikaGrout-314 – non-shrink cementitious construction grout, 25 kg bag",
            "brandFosroc": "Fosroc Conbextra GP2 – non-shrink precision cementitious grout, 25 kg bag",
            "brandTremco": "Tremco TREMgrout NS – non-shrink cementitious grout, 25 kg bag",
            "brandParchem": "Parchem Conbextra GP – non-shrink cementitious grout, 25 kg bag",
            "unitOfMeasure": "bag",
            "packSize": "20-25 kg",
            "notes": "Flowable grade for base plates and void filling. Trowel grade for vertical faces. Max ambient 35 deg C."
          }
        ]
      },
      {
        "slug": "bonding-agents-sbr-latex",
        "label": "Bonding agents & SBR latex",
        "materials": [
          {
            "materialName": "Bonding agent / SBR latex",
            "productType": "SBR polymer bonding agent and primer",
            "brandArdex": "Ardex P 51 – acrylic/SBR bonding agent and primer, 5 L",
            "brandSika": "Sika Latex SBR – SBR latex bonding admixture, 5 L",
            "brandFosroc": "Fosroc Nitobond SBR – SBR latex bonding agent, 5 L",
            "brandTremco": "Tremco THC Bonding Agent – acrylic bonding primer, 5 L",
            "brandParchem": "Parchem Concure SBR – SBR admixture and bonding agent, 5 L",
            "unitOfMeasure": "litre",
            "packSize": "5-20 L",
            "notes": "Brush onto prepared substrate before mortar. Apply mortar while bond coat is still tacky."
          }
        ]
      }
    ]
  },
  {
    "slug": "structural-movement-cracks",
    "label": "Structural movement cracks",
    "productCategories": [
      {
        "slug": "sealants-polyurethane",
        "label": "Sealants (polyurethane)",
        "materials": [
          {
            "materialName": "Polyurethane sealant (movement joint)",
            "productType": "1-part polyurethane movement joint sealant",
            "brandArdex": "Ardex ST – 1-part polyurethane movement joint sealant, 600 mL cartridge",
            "brandSika": "Sika Sikaflex-11FC / Sikaflex Pro-3 WF – 1-part PU sealant, 600 mL cartridge",
            "brandFosroc": "Fosroc Nitoseal MS600 – 1-part MS polymer movement joint sealant, 600 mL cartridge",
            "brandTremco": "Tremco Dymonic 100 – high-movement polyurethane sealant, 600 mL cartridge",
            "brandParchem": "Parchem Pro-Sealant PU600 – 1-part polyurethane movement sealant, 600 mL cartridge",
            "unitOfMeasure": "cartridge",
            "packSize": "600 mL",
            "notes": "Route and seal or chase and seal. Joint width to depth ratio 2:1. Movement capacity +/-25%. Primer on porous substrates."
          }
        ]
      },
      {
        "slug": "sealants-silicone",
        "label": "Sealants (silicone)",
        "materials": [
          {
            "materialName": "Silicone sealant (movement joint)",
            "productType": "Neutral-cure silicone movement joint sealant",
            "brandArdex": "Ardex ST Silicone – neutral cure silicone movement joint sealant, 310 mL cartridge",
            "brandSika": "Sika Sikasil WS-305 CN / Sikasil-C – neutral cure silicone sealant, 310 mL cartridge",
            "brandFosroc": "Fosroc Nitoseal S30 – neutral cure silicone sealant, 310 mL cartridge",
            "brandTremco": "Tremco Spectrem 1 – neutral cure structural silicone sealant, 310 mL cartridge",
            "brandParchem": "GE Momentive SilPruf NB – neutral cure silicone sealant, 310 mL cartridge",
            "unitOfMeasure": "cartridge",
            "packSize": "310 mL",
            "notes": "Not paintable. Movement capacity +/-50%. Use where PU durability insufficient. Primer required."
          }
        ]
      },
      {
        "slug": "backer-rods",
        "label": "Backer rods",
        "materials": [
          {
            "materialName": "Backer rod (closed-cell foam)",
            "productType": "Closed-cell polyethylene foam backer rod",
            "brandArdex": "Norseal V740 – closed-cell polyethylene backer rod, 10-50 mm dia",
            "brandSika": "Sika – specify Norseal V740 or Rexnord backer rod (complementary)",
            "brandFosroc": "Fosroc – specify Norseal V740 closed-cell backer rod (complementary)",
            "brandTremco": "Norseal V740 – closed-cell polyethylene backer rod, 10-50 mm dia",
            "brandParchem": "Rexnord Villex – closed-cell polyethylene backer rod, 10-50 mm dia",
            "unitOfMeasure": "roll",
            "packSize": "10-40 mm dia",
            "notes": "Size 20-25% larger than joint width. Compress into joint. Controls sealant depth 1:1. Prevents 3-point adhesion."
          }
        ]
      },
      {
        "slug": "injection-resins-pu-flexible",
        "label": "Injection resins (PU flexible)",
        "materials": [
          {
            "materialName": "Polyurethane injection resin (expanding)",
            "productType": "Expanding and hydrophilic polyurethane injection resin",
            "brandArdex": "Ardex WPM-PI Expanding – expanding PU injection resin, 600 mL cartridge / 20 L drum",
            "brandSika": "Sika Injection-107 – expanding hydrophilic PU injection resin, 600 mL / 20 L drum",
            "brandFosroc": "Fosroc Nitofill PU Hydrophilic – expanding hydrophilic PU injection, 600 mL / 20 L drum",
            "brandTremco": "Tremco THC Injection Resin – expanding polyurethane injection, 600 mL / 20 L drum",
            "brandParchem": "Parchem Nitofill PU Hydrophilic – expanding hydrophilic PU injection, 600 mL / 20 L",
            "unitOfMeasure": "drum",
            "packSize": "20 L",
            "notes": "Use for active leaks or voids. Reacts with water to expand. Multiple injection stages may be needed."
          }
        ]
      },
      {
        "slug": "injection-resins-epoxy-rigid",
        "label": "Injection resins (epoxy rigid)",
        "materials": [
          {
            "materialName": "Flexible epoxy injection resin",
            "productType": "Flexible 2-part epoxy injection resin",
            "brandArdex": "Ardex WPM-EI Flex – flexible 2-part epoxy injection resin, 600 mL cartridge",
            "brandSika": "Sika Injection-306 – hydrophobic flexible 2-part epoxy injection resin, 600 mL",
            "brandFosroc": "Fosroc Nitofill Epoxy Flex – flexible 2-part epoxy injection resin, 600 mL",
            "brandTremco": "Tremco Spectru-Bond Flex – flexible 2-part epoxy injection resin, 600 mL",
            "brandParchem": "Parchem Nitofill Epoxy Flex – flexible 2-part epoxy injection resin, 600 mL",
            "unitOfMeasure": "cartridge",
            "packSize": "600 mL",
            "notes": "For movement cracks requiring some flexibility post-injection. Not for wide or active cracks."
          }
        ]
      },
      {
        "slug": "crack-injection-ports",
        "label": "Crack injection ports",
        "materials": [
          {
            "materialName": "Crack injection ports",
            "productType": "Surface-mounted plastic crack injection ports",
            "brandArdex": "Ardex – specify Desoi plastic surface injection port (complementary)",
            "brandSika": "Sika Crack Port – plastic surface-mounted crack injection port, each",
            "brandFosroc": "Fosroc Injection Packer – surface-mounted crack injection port, each",
            "brandTremco": "Tremco – surface-mounted crack injection port, each",
            "brandParchem": "Desoi Flat Port – plastic surface-mounted injection port, each",
            "unitOfMeasure": "each",
            "packSize": "various",
            "notes": "Bond to crack with epoxy paste. Space at approx 100 mm centres or 1x crack depth. Remove after resin cures."
          }
        ]
      },
      {
        "slug": "sealant-primers",
        "label": "Sealant primers",
        "materials": [
          {
            "materialName": "Primer for sealant (silicone/polyurethane)",
            "productType": "Universal sealant primer for concrete and masonry",
            "brandArdex": "Ardex – specify Sika Primer-3 N (complementary system)",
            "brandSika": "Sika Primer-3 N – universal sealant primer for silicone and PU sealants, 250 mL bottle",
            "brandFosroc": "Fosroc Nitoseal Primer – sealant primer for PU and silicone, 250 mL bottle",
            "brandTremco": "Tremco Cleaner/Primer 1 – IPA-based sealant substrate primer, 250 mL bottle",
            "brandParchem": "Parchem Pro-Primer – sealant primer for PU and silicone, 250 mL bottle",
            "unitOfMeasure": "bottle",
            "packSize": "250 mL",
            "notes": "Apply thin film to joint faces. Allow to tack off 5-15 min before sealant. Required on porous or glazed substrates."
          }
        ]
      }
    ]
  },
  {
    "slug": "settlement-cracks",
    "label": "Settlement cracks",
    "productCategories": [
      {
        "slug": "injection-resins-pu-flexible",
        "label": "Injection resins (PU flexible)",
        "materials": [
          {
            "materialName": "Polyurethane injection resin (expanding)",
            "productType": "Expanding and hydrophilic polyurethane injection resin",
            "brandArdex": "Ardex WPM-PI Expanding – expanding PU injection resin, 600 mL cartridge / 20 L drum",
            "brandSika": "Sika Injection-107 – expanding hydrophilic PU injection resin, 600 mL / 20 L drum",
            "brandFosroc": "Fosroc Nitofill PU Hydrophilic – expanding hydrophilic PU, 600 mL / 20 L drum",
            "brandTremco": "Tremco THC Injection Resin – expanding PU foam injection, 600 mL / 20 L drum",
            "brandParchem": "Parchem Nitofill PU Hydrophilic – expanding PU injection, 600 mL / 20 L drum",
            "unitOfMeasure": "drum",
            "packSize": "20 L",
            "notes": "Reacts with water to expand and fill void. Use for active leaks or voids under slabs. Multiple stages."
          }
        ]
      },
      {
        "slug": "injection-resins-epoxy-rigid",
        "label": "Injection resins (epoxy rigid)",
        "materials": [
          {
            "materialName": "Epoxy injection resin (rigid)",
            "productType": "Rigid 2-part epoxy structural injection resin",
            "brandArdex": "Ardex WPM-EI – rigid 2-part epoxy injection resin, 380 mL cartridge",
            "brandSika": "Sika Injection-451 N / Sikadur-52 – low-viscosity rigid 2-part epoxy injection, 380 mL",
            "brandFosroc": "Fosroc Nitofill Epoxy – rigid 2-part epoxy injection resin, 380 mL cartridge",
            "brandTremco": "Tremco Spectru-Bond 600 – rigid 2-part epoxy injection resin, 380 mL cartridge",
            "brandParchem": "Parchem Nitofill Epoxy – rigid 2-part epoxy injection resin, 380 mL kit",
            "unitOfMeasure": "cartridge/kit",
            "packSize": "380 mL / 5 L",
            "notes": "Structural reinstatement of dormant settlement cracks. Crack must be dry or pre-treat with PU first."
          }
        ]
      },
      {
        "slug": "crack-injection-ports",
        "label": "Crack injection ports",
        "materials": [
          {
            "materialName": "Crack injection ports",
            "productType": "Surface-mounted plastic crack injection ports",
            "brandArdex": "Ardex – specify Desoi plastic surface injection port (complementary)",
            "brandSika": "Sika Crack Port – plastic surface-mounted crack injection port, each",
            "brandFosroc": "Fosroc Injection Packer – surface-mounted crack injection port, each",
            "brandTremco": "Tremco – surface-mounted crack injection port, each",
            "brandParchem": "Desoi Flat Port – plastic surface-mounted injection port, each",
            "unitOfMeasure": "each",
            "packSize": "various",
            "notes": "Space at 1x crack depth or 100-150 mm. Bond with epoxy paste and allow to cure before injecting."
          }
        ]
      },
      {
        "slug": "structural-anchors-dowels",
        "label": "Structural anchors & dowels",
        "materials": [
          {
            "materialName": "Helical stainless-steel tie bars (Helifix)",
            "productType": "316 SS helical tie and stitching bar",
            "brandArdex": "Helifix HeliBond / Helibond Plus – 316 SS helical tie bar, 6 mm dia, 225-1000 mm lengths",
            "brandSika": "Ancon Teplo – 316 SS helical bar for masonry and concrete stitching, 6 mm dia",
            "brandFosroc": "Thor Helical – 316 SS helical tie and stitching bar, 6 mm dia",
            "brandTremco": "Simpson Strong-Tie Helix – 316 SS helical tie bar, 6 mm dia",
            "brandParchem": "Tfix – 316 SS helical tie bar for masonry and concrete stitching, 6 mm dia",
            "unitOfMeasure": "each/m",
            "packSize": "various",
            "notes": "Drill hole, inject resin, insert bar, allow to cure. Provides tensile stitching action across cracks."
          }
        ]
      },
      {
        "slug": "repair-mortars-polymer-modified",
        "label": "Repair mortars (polymer-modified)",
        "materials": [
          {
            "materialName": "Masonry repair mortar",
            "productType": "Polymer-modified masonry and crack repair mortar",
            "brandArdex": "Ardex TRM – polymer-modified masonry repair mortar, 20 kg bag",
            "brandSika": "Sika MonoTop-412N – polymer-modified masonry repair mortar, 25 kg bag",
            "brandFosroc": "Fosroc Renderoc GP – general purpose masonry repair mortar, 25 kg bag",
            "brandTremco": "Tremco TREMproof Mortar – masonry repair mortar, 25 kg bag",
            "brandParchem": "Mapei Mapegrout SHB – structural masonry repair mortar, 25 kg bag",
            "unitOfMeasure": "bag",
            "packSize": "20 kg",
            "notes": "Make-good to cracks and voids in masonry after structural repair and stitching. Match colour of existing."
          }
        ]
      },
      {
        "slug": "lime-repointing-mortars",
        "label": "Lime & repointing mortars",
        "materials": [
          {
            "materialName": "Lime mortar (repointing)",
            "productType": "Natural hydraulic lime (NHL) repointing mortar",
            "brandArdex": "Ardex – specify Surebuild 450 NHL natural hydraulic lime (complementary)",
            "brandSika": "Sika – specify Surebuild 450 NHL or Unitex UniPoint (complementary)",
            "brandFosroc": "Fosroc – specify Surebuild 450 NHL natural hydraulic lime (complementary)",
            "brandTremco": "Surebuild 450 NHL – natural hydraulic lime mortar, 25 kg bag",
            "brandParchem": "Unitex UniPoint – pre-blended NHL lime repointing mortar, 20 kg bag",
            "unitOfMeasure": "bag",
            "packSize": "20 kg",
            "notes": "For heritage and soft brick only; must be weaker than substrate. Never use OPC as it traps moisture."
          }
        ]
      },
      {
        "slug": "sealants-polyurethane",
        "label": "Sealants (polyurethane)",
        "materials": [
          {
            "materialName": "Polyurethane sealant",
            "productType": "1-part polyurethane crack and joint sealant",
            "brandArdex": "Ardex ST – 1-part polyurethane sealant, 600 mL cartridge",
            "brandSika": "Sika Sikaflex-11FC – 1-part polyurethane sealant, 600 mL cartridge",
            "brandFosroc": "Fosroc Nitoseal MS600 – 1-part MS polymer sealant, 600 mL cartridge",
            "brandTremco": "Tremco Dymonic 100 – 1-part polyurethane sealant, 600 mL cartridge",
            "brandParchem": "Parchem Pro-Sealant PU600 – 1-part polyurethane sealant, 600 mL cartridge",
            "unitOfMeasure": "cartridge",
            "packSize": "600 mL",
            "notes": "Surface-seal settlement cracks after injection or stitching. Apply with backer rod. Movement capacity +/-25%."
          }
        ]
      },
      {
        "slug": "backer-rods",
        "label": "Backer rods",
        "materials": [
          {
            "materialName": "Backer rod",
            "productType": "Closed-cell polyethylene foam backer rod",
            "brandArdex": "Norseal V740 – closed-cell polyethylene backer rod, various dia",
            "brandSika": "Sika – specify Norseal V740 backer rod (complementary)",
            "brandFosroc": "Fosroc – specify Norseal V740 closed-cell backer rod (complementary)",
            "brandTremco": "Norseal V740 – closed-cell polyethylene backer rod, various dia",
            "brandParchem": "Rexnord Villex – closed-cell polyethylene backer rod, various dia",
            "unitOfMeasure": "roll",
            "packSize": "various",
            "notes": "Insert before sealant to control depth. Prevents 3-point adhesion failure. Size slightly over joint width."
          }
        ]
      }
    ]
  },
  {
    "slug": "slab-edge-deterioration",
    "label": "Slab edge deterioration",
    "productCategories": [
      {
        "slug": "repair-mortars-polymer-modified",
        "label": "Repair mortars (polymer-modified)",
        "materials": [
          {
            "materialName": "Concrete repair mortar",
            "productType": "Polymer-modified slab edge repair mortar",
            "brandArdex": "Ardex TRM – polymer-modified slab edge repair mortar, 20 kg bag",
            "brandSika": "Sika MonoTop-612 / MonoTop-620 – polymer repair mortar for slab edge, 25 kg bag",
            "brandFosroc": "Fosroc Renderoc HB / Renderoc LA – structural slab edge repair mortar, 25 kg bag",
            "brandTremco": "Tremco TREMproof 900 – polymer-modified repair mortar, 25 kg bag",
            "brandParchem": "Parchem Nitomortar FC – polymer-modified repair mortar, 25 kg bag",
            "unitOfMeasure": "bag",
            "packSize": "20 kg",
            "notes": "Form edge with steel or PVC angle. Apply in lifts max 30 mm. Cure min 7 days. Protect from traffic."
          }
        ]
      },
      {
        "slug": "epoxy-repair-mortars",
        "label": "Epoxy repair mortars",
        "materials": [
          {
            "materialName": "Epoxy repair mortar",
            "productType": "2-part / 3-part epoxy slab edge repair mortar",
            "brandArdex": "Ardex WA – 3-part epoxy slab edge repair mortar, 5 kg kit",
            "brandSika": "Sika Sikadur-42 – 3-part epoxy mortar for slab edge, 5 kg kit",
            "brandFosroc": "Fosroc Nitomortar 50 – 3-part epoxy slab edge repair mortar, 5 kg kit",
            "brandTremco": "Tremco Spectru-Bond 600 – 2-part epoxy repair mortar, 5 kg kit",
            "brandParchem": "Parchem Nitomortar EF – 3-part epoxy repair mortar, 5 kg kit",
            "unitOfMeasure": "kit",
            "packSize": "5 kg",
            "notes": "High-strength early return to service. Good abrasion and impact resistance for slab edges. Temp 10-35 deg C."
          }
        ]
      },
      {
        "slug": "bonding-agents-sbr-latex",
        "label": "Bonding agents & SBR latex",
        "materials": [
          {
            "materialName": "Bonding agent / SBR latex",
            "productType": "SBR polymer bonding agent and primer",
            "brandArdex": "Ardex P 51 – acrylic/SBR bonding agent and primer, 5 L",
            "brandSika": "Sika Latex SBR – SBR latex bonding agent, 5 L",
            "brandFosroc": "Fosroc Nitobond SBR – SBR latex bonding agent, 5 L",
            "brandTremco": "Tremco THC Bonding Agent – acrylic bonding primer, 5 L",
            "brandParchem": "Parchem Concure SBR – SBR admixture and bonding agent, 5 L",
            "unitOfMeasure": "litre",
            "packSize": "5 L",
            "notes": "Essential for adhesion of repair mortar to existing slab edge. Apply, allow to become tacky, then apply mortar."
          }
        ]
      },
      {
        "slug": "edge-forms-accessories",
        "label": "Edge forms & accessories",
        "materials": [
          {
            "materialName": "Edge form (steel/plastic angle)",
            "productType": "Galvanised steel or PVC edge form angle",
            "brandArdex": "Hy-Ten – galvanised steel edge form angle, m length",
            "brandSika": "Rapid Formwork – PVC plastic edge form angle, m length",
            "brandFosroc": "Dincel – PVC permanent structural edge and kicker form, m",
            "brandTremco": "Fletcher Concrete – galvanised steel edge form angle, m",
            "brandParchem": "Generic – 50x50x3 mm galvanised steel angle edge form, m",
            "unitOfMeasure": "m",
            "packSize": "various",
            "notes": "Fix with concrete nails or screws. Leave in place or strip after cure. Ensures clean arris on repaired edge."
          }
        ]
      },
      {
        "slug": "reinforcement-mesh",
        "label": "Reinforcement mesh",
        "materials": [
          {
            "materialName": "Stainless steel reinforcement mesh",
            "productType": "316 SS welded wire reinforcement mesh",
            "brandArdex": "InfraBuild (OneSteel) – 316 SS welded wire mesh, 2400x1200 mm sheet",
            "brandSika": "Midalia Steel – SS welded reinforcement mesh 316 grade, various sheet sizes",
            "brandFosroc": "Liberty OneSteel – 316 SS reinforcing mesh, sheet",
            "brandTremco": "Stainless Steel Specialists Australia – 316 SS welded mesh, sheet",
            "brandParchem": "Mtalex – stainless steel welded mesh 316, various sizes",
            "unitOfMeasure": "sheet",
            "packSize": "various",
            "notes": "For supplementary reinforcement in edge repairs. 316 SS in chloride environments. Maintain min 30 mm cover."
          }
        ]
      },
      {
        "slug": "curing-compounds",
        "label": "Curing compounds",
        "materials": [
          {
            "materialName": "Curing compound",
            "productType": "Water-based acrylic concrete curing compound",
            "brandArdex": "Ardex WB2 – water-based acrylic curing compound, 5 L",
            "brandSika": "Sika Antisol E – acrylic resin curing compound, 5 L",
            "brandFosroc": "Fosroc Concure WB – water-based curing membrane, 5 L",
            "brandTremco": "Parchem Concure WB – water-based acrylic curing compound, 5 L",
            "brandParchem": "Mapei Mapecure S – acrylic curing compound, 5 L",
            "unitOfMeasure": "litre",
            "packSize": "5 L",
            "notes": "Apply immediately after repair mortar finishing. Cure minimum 7 days before any trafficking."
          }
        ]
      },
      {
        "slug": "abrasives-blades-tools",
        "label": "Abrasives, blades & tools",
        "materials": [
          {
            "materialName": "Angle grinder disc (grinding)",
            "productType": "Diamond and abrasive concrete grinding disc",
            "brandArdex": "Husqvarna Vari-Cut – diamond grinding disc, 100/125 mm dia",
            "brandSika": "Norton Bear-Tex – abrasive concrete grinding disc, 100/125 mm dia",
            "brandFosroc": "Metabo – abrasive grinding wheel, 125 mm dia",
            "brandTremco": "Makita – abrasive and diamond grinding disc, 125 mm dia",
            "brandParchem": "Bosch Expert – concrete surface grinding disc, 125 mm dia",
            "unitOfMeasure": "each",
            "packSize": "100/125 mm",
            "notes": "Prepare slab edge surface prior to repair. Achieve min CSP 3 profile per ICRI 310.2. Use with vacuum extraction."
          }
        ]
      }
    ]
  }
];
