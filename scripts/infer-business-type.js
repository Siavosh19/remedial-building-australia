/**
 * 5-pass trade inference from business name.
 * Each pass uses a different strategy. ALL matches collected (not just first).
 * No generic words (Services, Solutions, Group etc.) allowed as output.
 */

const XLSX = require('xlsx');
const path = require('path');
const os = require('os');

const FILE = path.join(os.homedir(), 'Desktop', 'RBA_Directory_2026-06-12.xlsx');

// ─────────────────────────────────────────────────────────────────────────────
// PASS 1 — Exact single-word matches (every variant spelled out explicitly)
// ─────────────────────────────────────────────────────────────────────────────
const EXACT = {
  // WATERPROOFING
  waterproof:'Waterproofing', waterproofing:'Waterproofing', waterproofer:'Waterproofing',
  waterproofers:'Waterproofing', waterproofed:'Waterproofing', waterproofs:'Waterproofing',
  damp:'Dampproofing', dampproof:'Dampproofing', dampproofing:'Dampproofing',
  tanking:'Waterproofing', tank:'Waterproofing', membranes:'Membrane',
  membrane:'Membrane', torch:'Torch-on Membrane', torchon:'Torch-on Membrane',
  bitumen:'Bitumen Membrane', bituminous:'Bitumen Membrane',
  aquaproof:'Waterproofing', hydroproof:'Waterproofing',

  // ROOFING
  roofing:'Roofing', roofer:'Roofing', roofers:'Roofing', roof:'Roofing',
  roofs:'Roofing', reroofing:'Roofing', reroof:'Roofing', reroofed:'Roofing',
  guttering:'Guttering', gutter:'Guttering', gutters:'Guttering',
  fascia:'Fascia & Guttering', downpipe:'Downpipes', downpipes:'Downpipes',
  skylight:'Skylights', skylights:'Skylights', soffit:'Soffit',
  flashing:'Flashing', flashings:'Flashing', capping:'Capping',
  metalroof:'Metal Roofing', colorbond:'Colorbond Roofing',
  tileroof:'Roof Tiling',

  // PAINTING / COATINGS
  painting:'Painting', painter:'Painting', painters:'Painting', paint:'Painting',
  repaint:'Painting', repainting:'Painting', painted:'Painting', paints:'Painting',
  coatings:'Coatings', coating:'Coatings', coated:'Coatings', coater:'Coatings',
  anticorrosion:'Coatings', lacquer:'Coatings', varnish:'Coatings',
  polyurethanecoat:'Coatings', epoxypaint:'Epoxy Coatings',
  protective:'Protective Coatings', antigraffiti:'Graffiti Protection',

  // RENDERING / PLASTERING
  rendering:'Rendering', renderer:'Rendering', renderers:'Rendering',
  render:'Rendering', renders:'Rendering', rendered:'Rendering',
  acrylic:'Rendering', stucco:'Plastering', texture:'Rendering',
  textured:'Rendering', texturecoat:'Rendering',
  plastering:'Plastering', plasterer:'Plastering', plasterers:'Plastering',
  plaster:'Plastering', plastered:'Plastering', plasters:'Plastering',
  gyprocking:'Plasterboard', gyprock:'Plasterboard', gyproc:'Plasterboard',
  plasterboard:'Plasterboard', drywall:'Plasterboard', drylining:'Plasterboard',
  cornice:'Plastering',

  // CONCRETE / STRUCTURAL
  concrete:'Concrete', concreting:'Concrete', concreter:'Concrete',
  concreters:'Concrete', concreted:'Concrete', concretes:'Concrete',
  shotcrete:'Shotcrete', gunite:'Shotcrete',
  grouting:'Grouting', grout:'Grouting', grouted:'Grouting', grouts:'Grouting',
  underpinning:'Underpinning', underpin:'Underpinning', underpins:'Underpinning',
  underpinned:'Underpinning', underpinner:'Underpinning',
  piling:'Piling', pile:'Piling', piles:'Piling', piled:'Piling', piler:'Piling',
  micropiling:'Micro Piling', micropile:'Micro Piling',
  formwork:'Formwork', formworker:'Formwork', formworks:'Formwork',
  screeding:'Screeding', screed:'Screeding', screeded:'Screeding', screeds:'Screeding',
  slab:'Concrete Slab', slabs:'Concrete Slab', corbel:'Structural Concrete',
  lintel:'Structural', lintels:'Structural',
  spalling:'Spalling Repair', spallings:'Spalling Repair',
  corrosion:'Corrosion Treatment', corroded:'Corrosion Treatment',
  carbonation:'Carbonation Treatment',
  coring:'Concrete Coring', sawing:'Concrete Sawing', cutting:'Concrete Cutting',
  grinding:'Concrete Grinding', drilling:'Concrete Drilling',
  epoxyflooring:'Epoxy Flooring', epoxyfloor:'Epoxy Flooring',
  injection:'Crack Injection',

  // TILING
  tiling:'Tiling', tiler:'Tiling', tilers:'Tiling', tile:'Tiling', tiles:'Tiling',
  tiled:'Tiling', retiling:'Tiling', porcelain:'Tiling', ceramic:'Tiling',
  mosaic:'Tiling', terrazzo:'Terrazzo', tessellated:'Tiling',

  // FLOORING
  flooring:'Flooring', floor:'Flooring', floors:'Flooring',
  floorcraft:'Flooring', floorworks:'Flooring',
  carpet:'Carpet / Flooring', carpeting:'Carpet / Flooring',
  vinyl:'Vinyl Flooring', laminate:'Laminate Flooring',
  hardwood:'Timber Flooring', bamboo:'Bamboo Flooring',
  parquetry:'Timber Flooring', parquet:'Timber Flooring',
  polished:'Polished Floors', polishing:'Polished Floors',
  sanding:'Floor Sanding', sandfloor:'Floor Sanding',
  epoxy:'Epoxy Flooring',

  // FACADE / CLADDING
  cladding:'Cladding', clad:'Cladding', cladder:'Cladding', cladders:'Cladding',
  claddings:'Cladding', reclad:'Cladding', recladding:'Cladding',
  facade:'Facade', facades:'Facade', external:'External Cladding',
  curtainwall:'Curtain Wall', spandrel:'Facade Panel',

  // WINDOWS / GLAZING / DOORS
  glazing:'Glazing', glazier:'Glazing', glaziers:'Glazing', glass:'Glazing',
  glasswork:'Glazing', glassworks:'Glazing', glazed:'Glazing',
  doubleglazing:'Double Glazing', doubleglass:'Double Glazing',
  windows:'Windows', window:'Windows', windowreplacement:'Window Replacement',
  fenestration:'Windows',
  aluminium:'Aluminium Fabrication', aluminum:'Aluminium Fabrication',
  aluminiumfab:'Aluminium Fabrication', alufab:'Aluminium Fabrication',
  frameless:'Frameless Glazing',
  doors:'Doors', door:'Doors', doorset:'Doors',
  shopfront:'Shopfronts', shopfronts:'Shopfronts', shopfitting:'Shopfitting',

  // BALUSTRADES / HANDRAILS / METALWORK
  balustrades:'Balustrades', balustrade:'Balustrades',
  balustrading:'Balustrades', balustrades:'Balustrades',
  handrails:'Handrails', handrail:'Handrails',
  metalwork:'Metal Fabrication', metalworks:'Metal Fabrication',
  metalworking:'Metal Fabrication', metalfab:'Metal Fabrication',
  steelwork:'Steel Fabrication', steelworks:'Steel Fabrication',
  steelfab:'Steel Fabrication', steelfabrication:'Steel Fabrication',
  sheetmetal:'Sheet Metal', metalsheet:'Sheet Metal',
  ironwork:'Ironwork', ironworks:'Ironwork',
  fabrication:'Fabrication', fabricating:'Fabrication', fabricator:'Fabrication',
  fabricators:'Fabrication', fabricated:'Fabrication',
  welding:'Welding', welder:'Welding', welders:'Welding', weld:'Welding',
  structural:'Structural Steel', stainless:'Stainless Steel',
  alumfab:'Aluminium Fabrication',
  railing:'Railings', railings:'Railings', rail:'Railings',
  bollard:'Bollards', bollards:'Bollards',
  gate:'Gates', gates:'Gates', gating:'Gates',

  // MASONRY / BRICKWORK
  bricklaying:'Bricklaying', bricklayer:'Bricklaying', bricklayers:'Bricklaying',
  brick:'Bricklaying', bricks:'Bricklaying', brickwork:'Bricklaying',
  brickworks:'Bricklaying', brickie:'Bricklaying',
  masonry:'Masonry', mason:'Masonry', masons:'Masonry',
  repointing:'Repointing', pointing:'Repointing', tuckpointing:'Repointing',
  stonework:'Stonework', stone:'Stonework', stones:'Stonework',
  rockwork:'Stonework', stonemasonry:'Stonework',
  heritage:'Heritage Restoration', conservation:'Heritage Conservation',

  // SCAFFOLDING / HOISTING / ACCESS
  scaffolding:'Scaffolding', scaffold:'Scaffolding', scaffolds:'Scaffolding',
  scaffolder:'Scaffolding', scaffolders:'Scaffolding',
  propping:'Propping', prop:'Propping', props:'Propping',
  shoring:'Shoring', shore:'Shoring', shores:'Shoring',
  hoisting:'Hoisting', hoist:'Hoisting', hoists:'Hoisting',
  crane:'Crane', cranes:'Crane',
  rigging:'Rigging', rigger:'Rigging', riggers:'Rigging',
  ewp:'Elevated Work Platform',

  // PIPE / DRAINAGE / PLUMBING
  plumbing:'Plumbing', plumber:'Plumbing', plumbers:'Plumbing',
  drainage:'Drainage', drains:'Drainage', drain:'Drainage', draining:'Drainage',
  stormwater:'Stormwater', sewer:'Sewer', sewerage:'Sewer', sewers:'Sewer',
  relining:'Pipe Relining', reline:'Pipe Relining', liner:'Pipe Relining',
  pipelining:'Pipe Relining', pipeliner:'Pipe Relining',
  pump:'Pumping', pumping:'Pumping', pumps:'Pumping',
  hydraulic:'Hydraulic', hydrostatic:'Hydrostatic',
  pipe:'Pipe', pipes:'Pipe', piping:'Pipe', pipework:'Pipe',
  tapware:'Plumbing', tapfitting:'Plumbing',

  // ELECTRICAL
  electrical:'Electrical', electrician:'Electrical', electricians:'Electrical',
  electric:'Electrical', electrics:'Electrical', wiring:'Electrical',
  switchboard:'Electrical', powerpoint:'Electrical',
  solar:'Solar', photovoltaic:'Solar', pv:'Solar', solarpanel:'Solar',
  lighting:'Lighting', led:'Lighting', lights:'Lighting',
  datacom:'Data / Communications', data:'Data Cabling', communications:'Communications',

  // HVAC / MECHANICAL
  airconditioning:'Air Conditioning', airconditioner:'Air Conditioning',
  airconditioners:'Air Conditioning', aircon:'Air Conditioning',
  refrigeration:'Refrigeration', refrigerant:'Refrigeration',
  hvac:'HVAC', ventilation:'Ventilation',
  ductwork:'Ductwork', ducting:'Ductwork', duct:'Ductwork', ducts:'Ductwork',
  ducted:'Air Conditioning', split:'Air Conditioning', splits:'Air Conditioning',
  mechanical:'Mechanical', cooling:'Air Conditioning',
  heating:'Heating', heatpump:'Heat Pump', heatpumps:'Heat Pump',
  freeze:'Refrigeration', freezing:'Refrigeration', chiller:'Refrigeration',
  chillers:'Refrigeration', thermal:'Thermal', climate:'Air Conditioning',
  comfort:'Air Conditioning', temper:'Air Conditioning',
  cool:'Air Conditioning', cools:'Air Conditioning', cooled:'Air Conditioning',
  cooler:'Air Conditioning', coolers:'Air Conditioning',
  warm:'Heating', warmth:'Heating', warmer:'Heating',
  heat:'Heating', heated:'Heating', heater:'Heating', heaters:'Heating',
  air:'Air Conditioning',
  insulation:'Insulation', insulating:'Insulation', insulated:'Insulation',

  // FIRE SERVICES
  sprinkler:'Fire Sprinkler', sprinklers:'Fire Sprinkler',
  extinguisher:'Fire Equipment', extinguishers:'Fire Equipment',
  suppression:'Fire Suppression',

  // SECURITY / LIFTS / EWP
  security:'Security', securitysystem:'Security', cctv:'CCTV',
  intercom:'Intercom', intercoms:'Intercom',
  lifts:'Lifts / Elevators', elevator:'Lifts / Elevators',
  elevators:'Lifts / Elevators', lift:'Lifts / Elevators',
  escalator:'Escalators', escalators:'Escalators',
  dumbwaiter:'Dumbwaiter',

  // HAZARDOUS / ENVIRONMENTAL
  asbestos:'Asbestos Removal', abestos:'Asbestos Removal',
  mould:'Mould Remediation', mold:'Mould Remediation', moulding:'Mould Remediation',
  mouldy:'Mould Remediation',
  lead:'Lead Paint Removal', leadpaint:'Lead Paint Removal',
  hazardous:'Hazardous Materials', contamination:'Contamination',
  environmental:'Environmental',

  // CLEANING
  cleaning:'Cleaning', cleaner:'Cleaning', cleaners:'Cleaning', clean:'Cleaning',
  graffiti:'Graffiti Removal', antigraffiti:'Graffiti Removal',
  pressure:'Pressure Washing', pressurewash:'Pressure Washing',
  highpressure:'Pressure Washing', jetblast:'Pressure Washing',
  blasting:'Abrasive Blasting', sandblasting:'Sandblasting',
  hydroblast:'Hydro Blasting', hydroblasting:'Hydro Blasting',
  waterblasting:'Pressure Washing',

  // DEMOLITION / EXCAVATION
  demolition:'Demolition', demolitions:'Demolition', demolish:'Demolition',
  demolishing:'Demolition', demolisher:'Demolition',
  deconstruction:'Demolition', selective:'Selective Demolition',
  excavation:'Excavation', excavating:'Excavation', excavate:'Excavation',
  excavator:'Excavation', earthworks:'Earthworks', earthmoving:'Earthmoving',
  bobcat:'Earthmoving', grading:'Grading',

  // ENGINEERING / CONSULTING
  engineering:'Engineering', engineer:'Engineering', engineers:'Engineering',
  geotechnical:'Geotechnical Engineering', geotechnics:'Geotechnical Engineering',
  civil:'Civil Engineering',
  consulting:'Consulting', consultants:'Consulting', consultant:'Consulting',
  advisory:'Advisory', advisors:'Advisory', advisor:'Advisory',
  management:'Project Management',

  // ARCHITECTURE / SURVEYING / CERTIFICATION
  architects:'Architecture', architect:'Architecture', architecture:'Architecture',
  certifier:'Certification', certifiers:'Certification', certification:'Certification',
  inspection:'Inspections', inspections:'Inspections', inspector:'Inspections',
  inspectors:'Inspections', inspecting:'Inspections',
  surveyors:'Surveying', surveying:'Surveying', surveyor:'Surveying',
  quantity:'Quantity Surveying',
  auditing:'Auditing', auditors:'Auditing',
  diagnostics:'Diagnostics', testing:'Testing', monitoring:'Monitoring',

  // CARPENTRY / JOINERY / TIMBER
  carpentry:'Carpentry', carpenter:'Carpentry', carpenters:'Carpentry',
  joinery:'Joinery', joiner:'Joinery', joiners:'Joinery',
  cabinetmaking:'Cabinet Making', cabinetmaker:'Cabinet Making',
  cabinet:'Cabinet Making', cabinets:'Cabinet Making', cabinetry:'Cabinet Making',
  decking:'Decking', deck:'Decking', decks:'Decking',
  timber:'Timber', timbers:'Timber',
  pergola:'Pergola', pergolas:'Pergola', verandah:'Verandah', verandahs:'Verandah',
  carport:'Carport', carports:'Carport',

  // FENCING / RETAINING / PAVING / LANDSCAPING
  fencing:'Fencing', fencer:'Fencing', fences:'Fencing', fence:'Fencing',
  landscaping:'Landscaping', landscape:'Landscaping', landscapes:'Landscaping',
  arborist:'Arborist', arborists:'Arborist',
  trees:'Tree Services', treelopping:'Tree Lopping', lopping:'Tree Lopping',
  paving:'Paving', paver:'Paving', pavers:'Paving', pavement:'Paving',
  driveways:'Driveways', driveway:'Driveways',
  pathways:'Pathways', pathway:'Pathways',
  irrigation:'Irrigation', retaining:'Retaining Walls',
  retainingwall:'Retaining Walls', retainingwalls:'Retaining Walls',
  turf:'Turf', turfing:'Turf',

  // BUILDERS / CONSTRUCTION / RENOVATION / RESTORATION
  remedial:'Remedial', remediation:'Remediation',
  restoration:'Restoration', restorations:'Restoration', restoring:'Restoration',
  construction:'Construction', constructions:'Construction',
  construct:'Construction', constructing:'Construction',
  builder:'Builder', builders:'Builder', build:'Builder',
  building:'Building', buildings:'Building', rebuild:'Builder',
  renovation:'Renovation', renovations:'Renovation', renovating:'Renovation',
  renovator:'Renovation', renovators:'Renovation',
  refurbishment:'Refurbishment', refurbishing:'Refurbishment', refurbish:'Refurbishment',
  extensions:'Extensions', extension:'Extensions',
  additions:'Extensions', fitout:'Fitout', fitouts:'Fitout',
  interiors:'Interiors', interior:'Interiors',

  // POOL / SPA
  pool:'Pool', pools:'Pool', spa:'Spa', spas:'Spa', poolbuilding:'Pool Building',

  // PEST CONTROL
  pest:'Pest Control', termite:'Pest Control', termites:'Pest Control',
  pestcontrol:'Pest Control',

  // SEALANTS / JOINTS
  sealants:'Sealants', sealant:'Sealants', caulking:'Sealants',
  caulk:'Sealants', sealingjoints:'Sealants',

  // STRATA
  strata:'Strata',

  // ROPE ACCESS / HEIGHT SAFETY
  rope:'Rope Access', abseil:'Rope Access', abseiling:'Rope Access',
  height:'Height Safety', heights:'Height Safety',

  // CRACK REPAIR
  crack:'Crack Repair', cracks:'Crack Repair', cracking:'Crack Repair',
  crackrepair:'Crack Repair',

  // SIGNAGE
  signage:'Signage', signs:'Signage', sign:'Signage',

  // PAINTING-ADJACENT
  airless:'Painting', spray:'Spray Painting', spraypainting:'Spray Painting',
};

// ─────────────────────────────────────────────────────────────────────────────
// PASS 2 — Bigrams (two consecutive words → one trade label)
// ─────────────────────────────────────────────────────────────────────────────
const BIGRAMS = {
  'crack injection':'Crack Injection',
  'crack repair':'Crack Repair',
  'injection contractor':'Crack Injection',
  'pipe relining':'Pipe Relining',
  'pipe reline':'Pipe Relining',
  'pipe lining':'Pipe Relining',
  'sewer relining':'Pipe Relining',
  'carbon fibre':'Carbon Fibre / FRP',
  'carbon fiber':'Carbon Fibre / FRP',
  'frp contractor':'Carbon Fibre / FRP',
  'fire protection':'Fire Protection',
  'fire door':'Fire Doors',
  'fire doors':'Fire Doors',
  'fire sprinkler':'Fire Sprinkler',
  'fire sprinklers':'Fire Sprinkler',
  'fire stopping':'Fire Stopping',
  'fire stoppers':'Fire Stopping',
  'fire services':'Fire Services',
  'fire safety':'Fire Safety',
  'fire equipment':'Fire Equipment',
  'fire suppression':'Fire Suppression',
  'fire hydrant':'Fire Hydrant',
  'fire hydrants':'Fire Hydrant',
  'fire extinguisher':'Fire Equipment',
  'rope access':'Rope Access',
  'height safety':'Height Safety',
  'fall protection':'Height Safety',
  'air conditioning':'Air Conditioning',
  'air conditioner':'Air Conditioning',
  'air conditioners':'Air Conditioning',
  'graffiti removal':'Graffiti Removal',
  'graffiti protection':'Graffiti Protection',
  'pressure washing':'Pressure Washing',
  'pressure wash':'Pressure Washing',
  'high pressure':'Pressure Washing',
  'water jetting':'Pressure Washing',
  'hydro jetting':'Pressure Washing',
  'hydro blasting':'Pressure Washing',
  'sand blasting':'Sandblasting',
  'heritage restoration':'Heritage Restoration',
  'heritage building':'Heritage Restoration',
  'heritage conservation':'Heritage Conservation',
  'heritage masonry':'Heritage Masonry',
  'heritage brickwork':'Heritage Bricklaying',
  'epoxy flooring':'Epoxy Flooring',
  'epoxy floor':'Epoxy Flooring',
  'epoxy coating':'Epoxy Coatings',
  'epoxy coatings':'Epoxy Coatings',
  'selective demolition':'Selective Demolition',
  'stone restoration':'Stone Restoration',
  'window cleaning':'Window Cleaning',
  'roof plumbing':'Roof Plumbing',
  'roof plumber':'Roof Plumbing',
  'roof plumbers':'Roof Plumbing',
  'roof tiling':'Roof Tiling',
  'roof tiler':'Roof Tiling',
  'roof repairs':'Roof Repairs',
  'project management':'Project Management',
  'project manager':'Project Management',
  'quantity surveying':'Quantity Surveying',
  'quantity surveyor':'Quantity Surveyor',
  'building surveyor':'Building Surveyor',
  'building surveying':'Building Surveying',
  'building inspector':'Building Inspector',
  'building inspection':'Building Inspection',
  'building consultant':'Building Consulting',
  'building consulting':'Building Consulting',
  'strata management':'Strata Management',
  'strata manager':'Strata Management',
  'strata consultant':'Strata Consulting',
  'strata consulting':'Strata Consulting',
  'strata building':'Strata Building',
  'remedial building':'Remedial Building',
  'remedial builder':'Remedial Building',
  'remedial builders':'Remedial Building',
  'timber flooring':'Timber Flooring',
  'timber floor':'Timber Flooring',
  'timber floors':'Timber Flooring',
  'double glazing':'Double Glazing',
  'pool builder':'Pool Building',
  'pool building':'Pool Building',
  'pool construction':'Pool Building',
  'pool maintenance':'Pool Maintenance',
  'mould remediation':'Mould Remediation',
  'mold remediation':'Mould Remediation',
  'mould removal':'Mould Remediation',
  'asbestos removal':'Asbestos Removal',
  'asbestos management':'Asbestos Management',
  'asbestos testing':'Asbestos Testing',
  'lead paint':'Lead Paint Removal',
  'damp proofing':'Dampproofing',
  'damp proof':'Dampproofing',
  'render repair':'Render Repair',
  'render repairs':'Render Repair',
  'concrete repair':'Concrete Repair',
  'concrete repairs':'Concrete Repair',
  'structural repair':'Structural Repair',
  'structural repairs':'Structural Repair',
  'structural steel':'Structural Steel',
  'balcony repair':'Balcony Repair',
  'balcony repairs':'Balcony Repair',
  'balcony waterproofing':'Balcony Waterproofing',
  'metal fabrication':'Metal Fabrication',
  'metal fabricator':'Metal Fabrication',
  'metal work':'Metal Fabrication',
  'metal works':'Metal Fabrication',
  'metal working':'Metal Fabrication',
  'sheet metal':'Sheet Metal',
  'sheet metalwork':'Sheet Metal',
  'stainless steel':'Stainless Steel',
  'aluminium fabrication':'Aluminium Fabrication',
  'aluminium work':'Aluminium Fabrication',
  'aluminium works':'Aluminium Fabrication',
  'aluminium windows':'Aluminium Windows',
  'steel fabrication':'Steel Fabrication',
  'steel fabricator':'Steel Fabrication',
  'steel work':'Steel Fabrication',
  'steel works':'Steel Fabrication',
  'steel structure':'Steel Fabrication',
  'suspended ceiling':'Suspended Ceilings',
  'suspended ceilings':'Suspended Ceilings',
  'ceiling contractor':'Ceilings',
  'ceiling installation':'Ceilings',
  'access control':'Access Control',
  'pest control':'Pest Control',
  'tree lopping':'Tree Lopping',
  'tree services':'Tree Services',
  'tree service':'Tree Services',
  'retaining wall':'Retaining Walls',
  'retaining walls':'Retaining Walls',
  'floor polishing':'Floor Polishing',
  'floor sanding':'Floor Sanding',
  'floor coating':'Floor Coatings',
  'concrete cutting':'Concrete Cutting',
  'concrete coring':'Concrete Coring',
  'concrete grinding':'Concrete Grinding',
  'concrete sawing':'Concrete Sawing',
  'concrete polishing':'Concrete Polishing',
  'floor grinding':'Floor Grinding',
  'spray painting':'Spray Painting',
  'line marking':'Line Marking',
  'traffic line':'Line Marking',
  'safety coating':'Safety Coatings',
  'protective coating':'Protective Coatings',
  'thermal insulation':'Thermal Insulation',
  'acoustic insulation':'Acoustic Insulation',
  'window replacement':'Window Replacement',
  'window repair':'Window Repair',
  'window repairs':'Window Repair',
  'curtain wall':'Curtain Wall',
  'curtain walls':'Curtain Wall',
  'shopfront installation':'Shopfront Installation',
  'glass repair':'Glass Repair',
  'glass repairs':'Glass Repair',
  'glass replacement':'Glass Replacement',
  'glass cleaning':'Glass Cleaning',
  'high rise':'High Rise Access',
  'rope access':'Rope Access',
  'water damage':'Water Damage Restoration',
  'water ingress':'Water Ingress',
  'waterproof membrane':'Waterproofing Membrane',
  'liquid membrane':'Waterproofing Membrane',
};

// ─────────────────────────────────────────────────────────────────────────────
// PASS 3 — Suffix-stripped variants (handles "waterproofed", "scaffolding" etc.)
// ─────────────────────────────────────────────────────────────────────────────
function stripSuffixes(w) {
  const variants = new Set([w]);
  const rules = [
    [/ings?$/,''],  [/ers?$/,''],  [/ors?$/,''],   [/tions?$/,''],
    [/ments?$/,''], [/ical$/,''],  [/ed$/,''],      [/s$/,''],
    [/al$/,''],     [/ing$/,''],   [/tion$/,'e'],   [/ation$/,'e'],
    [/ing$/,'e'],   [/ers?$/,'e'], [/ors?$/,'e'],
  ];
  for (const [rx, rep] of rules) {
    const stripped = w.replace(rx, rep);
    if (stripped !== w && stripped.length > 3) variants.add(stripped);
  }
  return Array.from(variants);
}

// ─────────────────────────────────────────────────────────────────────────────
// PASS 4 — Synonym / near-match lookup
// Maps words that MEAN a trade but aren't spelled exactly as the trade word
// ─────────────────────────────────────────────────────────────────────────────
const SYNONYMS = {
  // Waterproofing synonyms
  aqua:'Waterproofing', hydro:'Waterproofing', wet:'Waterproofing',
  seepage:'Waterproofing', leaking:'Waterproofing', leaks:'Waterproofing',
  ingress:'Waterproofing',

  // Builder synonyms
  project:'Builder', development:'Construction', developments:'Construction',
  developer:'Construction',

  // Painter synonyms
  brushwork:'Painting', finish:'Painting', finishes:'Painting',
  colour:'Painting', color:'Painting',

  // Concrete synonyms
  reinforced:'Concrete', reinforcing:'Concrete', rebar:'Concrete',
  precast:'Precast Concrete', prestressed:'Prestressed Concrete',
  posttension:'Post-tension Concrete', slag:'Concrete',

  // Structural synonyms
  structural:'Structural Engineering', strengthening:'Structural Repair',
  retrofitting:'Structural Repair', retrofit:'Structural Repair',

  // Tiling synonyms
  grouting:'Grouting', grout:'Grouting', adhesive:'Tiling',

  // Scaffold synonyms
  access:'Access', elevated:'Elevated Access',

  // Inspection synonyms
  assessment:'Building Assessment', dilapidation:'Dilapidation Report',
  defect:'Defect Inspection', defects:'Defect Inspection',
  report:'Inspection Reports', reports:'Inspection Reports',
  condition:'Condition Report',

  // Heritage synonyms
  restoration:'Restoration', restore:'Restoration', restoring:'Restoration',
  preserved:'Heritage Conservation', preservation:'Heritage Conservation',
  historic:'Heritage Restoration', historical:'Heritage Restoration',

  // Cleaning synonyms
  washing:'Pressure Washing', jetting:'Water Jetting',
  sanitising:'Cleaning', sanitizing:'Cleaning',
  disinfect:'Cleaning', disinfecting:'Cleaning',

  // Fencing / access synonyms
  boundary:'Fencing', perimeter:'Fencing', enclosure:'Fencing',

  // Flooring synonyms
  surface:'Surface Preparation', substrate:'Surface Preparation',

  // Metal synonyms
  customized:'Custom Fabrication', custom:'Custom Fabrication',
  bespoke:'Custom Fabrication', wrought:'Ironwork',
  cast:'Cast Metal',

  // Demolition synonyms
  strip:'Strip Out', stripout:'Strip Out', stripping:'Strip Out',

  // Drainage synonyms
  pump:'Pumping', overflow:'Drainage', overflow:'Drainage',
  runoff:'Stormwater',

  // HVAC synonyms
  climate:'Air Conditioning', thermal:'Thermal', temperature:'HVAC',
  extraction:'Ventilation', exhaust:'Ventilation',
  ice:'Refrigeration', icy:'Refrigeration', frost:'Refrigeration',
  breeze:'Air Conditioning', airflow:'Air Conditioning', airflows:'Air Conditioning',
  temperate:'Air Conditioning', arctic:'Refrigeration', polar:'Refrigeration',
  energy:'Solar / Electrical', energies:'Solar / Electrical',
  ecoenergy:'Solar / Electrical', renewable:'Solar / Electrical',
  power:'Electrical', powered:'Electrical', powering:'Electrical',
  watt:'Electrical', watts:'Electrical', kilowatt:'Electrical',
  installations:'Installation', installer:'Installation', installers:'Installation',

  // Fire synonyms
  detection:'Fire Detection', alarm:'Fire Alarm', alarms:'Fire Alarm',
  evacuation:'Fire Safety',

  // Electrical synonyms
  power:'Electrical', automation:'Electrical Automation',
  generator:'Generator', generators:'Generator',

  // Cladding synonyms
  panelling:'Cladding', panel:'Cladding', panels:'Cladding',
  recladding:'Cladding', overcladding:'Cladding',

  // Render synonyms
  spray:'Spray Render', acrylic:'Rendering',

  // Insulation synonyms
  batts:'Insulation', batt:'Insulation', blanket:'Insulation',
  rockwool:'Insulation', glasswool:'Insulation', foil:'Insulation',

  // Pest synonyms
  rodent:'Pest Control', rodents:'Pest Control', vermin:'Pest Control',
  cockroach:'Pest Control', cockroaches:'Pest Control',

  // Strata synonyms
  levies:'Strata', levy:'Strata', owners:'Strata Management',
  body:'Strata Management', corporate:'Strata Management',
};

// ─────────────────────────────────────────────────────────────────────────────
// PASS 5 — Substring / partial match (for compound words like "aquawaterproofing")
// Min 6 chars to avoid false positives
// ─────────────────────────────────────────────────────────────────────────────
const SUBSTRINGS = [
  ['waterproof','Waterproofing'], ['scaffold','Scaffolding'], ['construct','Construction'],
  ['renovati','Renovation'], ['refurb','Refurbishment'], ['plumb','Plumbing'],
  ['electr','Electrical'], ['concret','Concrete'], ['demolit','Demolition'],
  ['excavat','Excavation'], ['glazier','Glazing'], ['glazing','Glazing'],
  ['cladding','Cladding'], ['render','Rendering'], ['plaster','Plastering'],
  ['painter','Painting'], ['painting','Painting'], ['roofing','Roofing'],
  ['tiling','Tiling'], ['flooring','Flooring'], ['masonry','Masonry'],
  ['bricklaying','Bricklaying'], ['bricklay','Bricklaying'],
  ['underpin','Underpinning'], ['piling','Piling'],
  ['grouting','Grouting'], ['screeding','Screeding'],
  ['inspect','Inspections'], ['certif','Certification'],
  ['survey','Surveying'], ['consult','Consulting'],
  ['engineer','Engineering'], ['architect','Architecture'],
  ['heritage','Heritage Restoration'], ['restorat','Restoration'],
  ['remedial','Remedial'], ['remediat','Remediation'],
  ['stormwater','Stormwater'], ['drainage','Drainage'],
  ['asbestos','Asbestos Removal'], ['insulation','Insulation'],
  ['landscap','Landscaping'], ['fencing','Fencing'],
  ['paving','Paving'], ['arborist','Arborist'],
  ['sprinkler','Fire Sprinkler'], ['fireprotect','Fire Protection'],
  ['ropeaccess','Rope Access'],
  ['metalwork','Metal Fabrication'], ['steelwork','Steel Fabrication'],
  ['fabricat','Fabrication'], ['welding','Welding'], ['welder','Welding'],
  ['balustrad','Balustrades'], ['handrail','Handrails'],
  ['shotcrete','Shotcrete'], ['formwork','Formwork'],
  ['relining','Pipe Relining'],
  ['tuckpoint','Repointing'], ['repoint','Repointing'],
  ['graffiti','Graffiti Removal'], ['sandblast','Sandblasting'],
  ['hydroblast','Hydro Blasting'], ['hydrokleen','Cleaning'],
  ['decking','Decking'], ['pergola','Pergola'],
  ['joinery','Joinery'], ['carpentry','Carpentry'],
  // HVAC compound words
  ['aircon','Air Conditioning'], ['aircondition','Air Conditioning'],
  ['heating','Heating'], ['cooling','Air Conditioning'],
  ['refriger','Refrigeration'], ['ventilat','Ventilation'],
  ['heat','Heating'], ['freeze','Refrigeration'], ['chiller','Refrigeration'],
  ['cool','Air Conditioning'], ['ice','Refrigeration'],
  ['energy','Solar / Electrical'], ['energ','Solar / Electrical'],
  // Painting compound
  ['painting','Painting'], ['coating','Coatings'],
  // Cleaning compound
  ['kleen','Cleaning'], ['clean','Cleaning'], ['wash','Cleaning'],
  // Electrical compound
  ['electric','Electrical'], ['solar','Solar'],
  // Plumbing compound
  ['plumbing','Plumbing'], ['drainage','Drainage'],
  // Building compound
  ['building','Building'], ['builder','Builder'],
  // Roofing compound
  ['roofing','Roofing'], ['gutter','Guttering'],
  // Asbestos compound
  ['asbest','Asbestos Removal'],
  // Pest compound
  ['termite','Pest Control'], ['pestcontrol','Pest Control'],
  // Installation
  ['install','Installation'],
  // Maintenance
  ['mainten','Maintenance'],
];

// Words whose presence as a standalone word should NEVER be output
const NEVER_OUTPUT = new Set([
  'services','service','solutions','solution','systems','system',
  'technologies','technology','industries','industry','group','groups',
  'company','companies','enterprise','enterprises','business','businesses',
  'associates','associate','professionals','professional',
  'national','international','global','local','regional',
  'new','old','first','best','top','pro','premium','quality','master','elite',
  'total','complete','all','full','smart','fast','quick','rapid',
  'advance','advanced','premier','leading','trusted','reliable',
  'integrated','expert','experts','excellence','plus','more','direct',
  'one','two','three','management',
]);

function cleanName(name) {
  return name
    .replace(/\b(pty\s+ltd?|p\/l|ltd?|inc\.?|co\.?|corp\.?|llc)\b/gi, ' ')
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function infer(name) {
  if (!name) return '';
  const clean = cleanName(name);
  const words = clean.split(' ').filter(Boolean);
  const found = [];
  const seen = new Set();

  function add(label) {
    if (label && !seen.has(label)) {
      seen.add(label);
      found.push(label);
    }
  }

  // ── Pass 1: exact word match ───────────────────────────────────────────────
  for (const w of words) {
    if (EXACT[w]) add(EXACT[w]);
  }

  // ── Pass 2: bigrams ────────────────────────────────────────────────────────
  for (let i = 0; i < words.length - 1; i++) {
    const bg = words[i] + ' ' + words[i + 1];
    if (BIGRAMS[bg]) add(BIGRAMS[bg]);
  }

  // ── Pass 3: suffix-stripped word match ────────────────────────────────────
  for (const w of words) {
    if (EXACT[w]) continue;
    for (const variant of stripSuffixes(w)) {
      if (variant !== w && EXACT[variant]) { add(EXACT[variant]); break; }
    }
  }

  // ── Pass 4: synonym lookup ─────────────────────────────────────────────────
  for (const w of words) {
    if (SYNONYMS[w]) add(SYNONYMS[w]);
  }

  // ── Pass 5: substring scan (compound words) ───────────────────────────────
  for (const w of words) {
    for (const [sub, label] of SUBSTRINGS) {
      if (w.includes(sub) && w.length > sub.length) {
        add(label);
      }
    }
  }

  return found.join(' / ');
}

// ─── Read, update, save ───────────────────────────────────────────────────────
const wb = XLSX.readFile(FILE);
const ws = wb.Sheets[wb.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });

console.log('Rows loaded:', rows.length);

rows.forEach(row => {
  delete row['Inferred Type (Name)'];
  delete row['Trade (from Name)'];
  row['Trade (from Name)'] = infer(row['name'] || row['Name'] || '');
});

const filled = rows.filter(r => r['Trade (from Name)']).length;
console.log(`Filled: ${filled} / ${rows.length}  —  blank: ${rows.length - filled}`);

// Column order: id, name, category, Trade (from Name), rest
const allKeys = Object.keys(rows[0]);
const priority = ['id', 'name', 'category', 'Trade (from Name)'];
const rest = allKeys.filter(k => !priority.includes(k));
const ordered = [...priority, ...rest];

const reordered = rows.map(row => {
  const obj = {};
  ordered.forEach(k => { obj[k] = row[k] ?? ''; });
  return obj;
});

const wsNew = XLSX.utils.json_to_sheet(reordered);
const colWidths = {};
reordered.forEach(row => {
  Object.keys(row).forEach(k => {
    colWidths[k] = Math.max(colWidths[k] || k.length, String(row[k]||'').length);
  });
});
wsNew['!cols'] = ordered.map(k => ({ wch: Math.min(colWidths[k] || 10, 55) }));

const wbNew = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wbNew, wsNew, 'Directory');
XLSX.writeFile(wbNew, FILE);
console.log('Saved:', FILE);

// Quick sample of newly filled rows (spot check)
const samples = rows.filter(r => r['Trade (from Name)']).slice(0, 20);
console.log('\nSample matches:');
samples.forEach(r => console.log(`  "${r['name']}" → ${r['Trade (from Name)']}`));
