/**
 * DRY RUN — no DB changes.
 * Analyses all published companies, applies comprehensive name-based rules,
 * and outputs:
 *   - business-leads-output/recategorise-changes.csv  (would-be reassignments)
 *   - business-leads-output/recategorise-unknowns.csv (can't determine from name)
 */

require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');
const fs = require('fs');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// ─── Rules: MOST SPECIFIC FIRST ──────────────────────────────────────────────
// Only first matching rule is used per company.
const RULES = [

  // ── Consultants / Engineers / Surveyors ───────────────────────────────────
  { p: /remedial\s*consult|building\s*consult|defect\s*consult|dilapidation\s*consult/i,   id: 274, name: 'Remedial Consultants' },
  { p: /strata\s*remedial\s*consult/i,                                                      id: 276, name: 'Strata Remedial Consultants' },
  { p: /forensic\s*(build|engineer|invest)/i,                                               id: 278, name: 'Forensic Building Consultants' },
  { p: /structural\s*engineer|engineer.*structural/i,                                       id: 303, name: 'Structural Engineers' },
  { p: /civil\s*engineer|engineer.*civil/i,                                                 id: 304, name: 'Civil Engineers' },
  { p: /facade\s*engineer|engineer.*facade/i,                                               id: 305, name: 'Facade Engineers' },
  { p: /geotech|geotechnical/i,                                                             id: 306, name: 'Geotechnical Engineers' },
  { p: /hydraulic\s*engineer|engineer.*hydraulic/i,                                         id: 308, name: 'Hydraulic Engineers' },
  { p: /acoustic\s*engineer|engineer.*acoustic/i,                                           id: 312, name: 'Acoustic Engineers' },
  { p: /corrosion\s*engineer|engineer.*corrosion/i,                                         id: 315, name: 'Corrosion Engineers' },
  { p: /quantity\s*survey|QS\s+consult/i,                                                   id: 297, name: 'Quantity Surveyors' },
  { p: /project\s*manag|construction\s*manag/i,                                             id: 298, name: 'Project Managers' },
  { p: /building\s*surveyor|building\s*certif|principal\s*certif/i,                        id: 335, name: 'Building Surveyors & Certifiers' },
  { p: /building\s*inspector/i,                                                             id: 341, name: 'Building Inspectors' },
  { p: /strata\s*manager|owners\s*corp.*manager|OC\s*manager/i,                            id: 676, name: 'Strata Managers' },
  { p: /building\s*manager|facilities\s*manager/i,                                         id: 679, name: 'Building Managers' },
  { p: /DBP\s*(practitioner|design|build)/i,                                                id: 322, name: 'DBP Practitioners' },
  { p: /expert\s*witness/i,                                                                 id: 716, name: 'Expert Witnesses (Building)' },
  { p: /strata\s*insur/i,                                                                   id: 687, name: 'Strata Insurance Brokers' },
  { p: /strata\s*law|owners\s*corp.*law/i,                                                  id: 709, name: 'Strata Lawyers' },
  { p: /building\s*defect.*law|construction.*law/i,                                         id: 707, name: 'Building Defect Lawyers' },

  // ── Waterproofing ─────────────────────────────────────────────────────────
  { p: /tanking/i,                                                                           id: 387, name: 'Tanking Contractors' },
  { p: /dampproof/i,                                                                         id: 386, name: 'Dampproofing Contractors' },
  { p: /crystalline\s*waterproof/i,                                                          id: 388, name: 'Crystalline Waterproofing Contractors' },
  { p: /injection\s*waterproof|waterproof.*inject/i,                                        id: 381, name: 'Injection Waterproofing Contractors' },
  { p: /liquid\s*membrane|sheet\s*membrane/i,                                               id: 382, name: 'Liquid Membrane Contractors' },
  { p: /basement\s*waterproof/i,                                                             id: 378, name: 'Basement Waterproofing Contractors' },
  { p: /balcony\s*waterproof/i,                                                              id: 375, name: 'Balcony Waterproofing Contractors' },
  { p: /roof\s*waterproof/i,                                                                 id: 376, name: 'Roof Waterproofing Contractors' },
  { p: /podium\s*waterproof/i,                                                               id: 377, name: 'Podium Waterproofing Contractors' },
  { p: /waterproof.*inspect|waterproof.*test/i,                                             id: 384, name: 'Waterproofing Inspectors' },
  { p: /waterproof|membrane.*install|licensed.*membrane/i,                                  id: 373, name: 'Licensed Waterproofers' },

  // ── Roofing ───────────────────────────────────────────────────────────────
  { p: /box\s*gutter|box\s*guttering/i,                                                     id: 399, name: 'Box Gutter Contractors' },
  { p: /roof.*leak|leaking.*roof|roof.*repair|roof.*restor|re-?roof/i,                     id: 403, name: 'Roof Leak Repair Contractors' },
  { p: /colorbond|metal.*roof|steel.*roof/i,                                                id: 392, name: 'Metal Roofing Contractors' },
  { p: /tile.*roof|roof.*tile|terracotta.*roof/i,                                           id: 393, name: 'Tile Roofers' },
  { p: /torch.on|membrane.*roof/i,                                                          id: 395, name: 'Torch-On Membrane Contractors' },
  { p: /skylight/i,                                                                          id: 401, name: 'Skylight Installers' },
  { p: /gutter.*guard|roof.*ventil|whirlybird/i,                                            id: 402, name: 'Roof Ventilation Installers' },
  { p: /roof\s*plumb/i,                                                                      id: 391, name: 'Roof Plumbers' },
  { p: /roofer|roofing|roof.*contractor|roof.*specialist/i,                                 id: 390, name: 'Roofing Contractors' },

  // ── Painting ──────────────────────────────────────────────────────────────
  { p: /industrial\s*paint|sandblast|abrasive\s*blast/i,                                   id: 604, name: 'Industrial Painters' },
  { p: /protective\s*coat|anti.?corros.*coat/i,                                             id: 369, name: 'Protective Coating Contractors' },
  { p: /intumescent\s*coat/i,                                                               id: 580, name: 'Intumescent Coating Contractors' },
  { p: /facade.*coat|external.*coat/i,                                                      id: 409, name: 'Facade Coating Contractors' },
  { p: /painter|painting|paint.*contractor|paint.*specialist/i,                            id: 602, name: 'Painters' },

  // ── Rendering / Plastering ────────────────────────────────────────────────
  { p: /render.*repair|repair.*render/i,                                                    id: 408, name: 'Render Repair Contractors' },
  { p: /fibrous\s*plaster/i,                                                                id: 447, name: 'Fibrous Plasterers' },
  { p: /plasterer|plastering/i,                                                             id: 446, name: 'Plasterers' },
  { p: /gyprocking|plasterboard|gyprock/i,                                                  id: 766, name: 'Plasterboard / Gyprocking Contractors' },
  { p: /cornice/i,                                                                           id: 767, name: 'Cornice Contractors' },
  { p: /renderer|rendering|cement.*render|acrylic.*render|texture.*coat/i,                 id: 407, name: 'Renderers' },

  // ── Concrete & Structural ─────────────────────────────────────────────────
  { p: /concrete.*cancer/i,                                                                  id: 358, name: 'Concrete Cancer Repair Contractors' },
  { p: /concrete.*spal|spalling.*concrete/i,                                                id: 359, name: 'Concrete Spalling Contractors' },
  { p: /crack.*inject|inject.*crack/i,                                                      id: 360, name: 'Crack Injection Contractors' },
  { p: /carbon\s*fibre|carbon\s*fiber|CFRP|FRP.*struct/i,                                  id: 361, name: 'Carbon Fibre / FRP Contractors' },
  { p: /shotcrete/i,                                                                         id: 362, name: 'Shotcrete Contractors' },
  { p: /concrete\s*scan/i,                                                                  id: 469, name: 'Concrete Scanning' },
  { p: /concrete.*saw|concrete.*cut|diamond.*cut|diamond.*drill/i,                         id: 505, name: 'Concrete Saw Cutting' },
  { p: /core.*drill|drill.*concrete/i,                                                      id: 506, name: 'Core Drilling' },
  { p: /hydro.?demolit|hydro.?blast/i,                                                      id: 504, name: 'Hydro-Demolition Contractors' },
  { p: /concrete.*break/i,                                                                  id: 503, name: 'Concrete Breaking Contractors' },
  { p: /shotcrete|micro.*concrete|grout.*inject/i,                                          id: 362, name: 'Shotcrete Contractors' },
  { p: /polished\s*concrete/i,                                                              id: 620, name: 'Polished Concrete Contractors' },
  { p: /concreter|concreting|concrete.*pour|concrete.*pump/i,                              id: 623, name: 'Concreters' },

  // ── Demolition ────────────────────────────────────────────────────────────
  { p: /demolit|strip.out|selective.*demo/i,                                                id: 501, name: 'Selective Demolition Contractors' },
  { p: /tile.*strip|screed.*strip/i,                                                        id: 502, name: 'Tile & Screed Strip-Out Contractors' },
  { p: /earthmov|excavat|bobcat/i,                                                          id: 507, name: 'Earthmoving Contractors' },

  // ── Facade / External Envelope ────────────────────────────────────────────
  { p: /ACP.*replac|aluminium.*composite.*panel/i,                                         id: 406, name: 'ACP Replacement Contractors' },
  { p: /cladding.*replac|cladding.*remediat|cladding.*repair/i,                            id: 405, name: 'Cladding Contractors' },
  { p: /EIFS|external.*insulat.*finish|exoskin/i,                                          id: 411, name: 'External Insulation Contractors (EIFS)' },
  { p: /stone.*clad|natural.*stone.*facade/i,                                              id: 412, name: 'Stone Cladding Contractors' },
  { p: /terracotta.*clad/i,                                                                 id: 413, name: 'Terracotta Cladding Contractors' },
  { p: /precast.*panel|tilt.*panel/i,                                                       id: 414, name: 'Precast Concrete Panel Contractors' },
  { p: /curtain\s*wall/i,                                                                   id: 423, name: 'Curtain Wall Contractors' },
  { p: /facade.*access/i,                                                                   id: 410, name: 'Facade Access Contractors' },
  { p: /facade.*remediat|facade.*repair|facade.*restor/i,                                  id: 356, name: 'Facade Remediation Contractors' },
  { p: /cladding/i,                                                                          id: 405, name: 'Cladding Contractors' },

  // ── Windows ───────────────────────────────────────────────────────────────
  { p: /window.*leak|leaking.*window/i,                                                     id: 421, name: 'Window Leak Repair Contractors' },
  { p: /heritage.*window/i,                                                                 id: 419, name: 'Heritage Window Contractors' },
  { p: /timber.*window/i,                                                                   id: 417, name: 'Timber Window Contractors' },
  { p: /aluminium.*window|window.*aluminium/i,                                              id: 415, name: 'Aluminium Window Contractors' },
  { p: /window.*replac|replac.*window|double.*glaz/i,                                      id: 416, name: 'Window Replacement Contractors' },
  { p: /glazier|glazing|glass.*repair|glass.*replac/i,                                     id: 422, name: 'Glaziers' },
  { p: /louvre|screen.*install|shading/i,                                                   id: 426, name: 'Louvres / Screens Contractors' },
  { p: /awning/i,                                                                            id: 427, name: 'Awning Installers' },
  { p: /blind|window.*cover/i,                                                              id: 636, name: 'Blinds & Window Covering Installers' },

  // ── Balustrades / Rails ───────────────────────────────────────────────────
  { p: /balustrade/i,                                                                        id: 424, name: 'Balustrade Contractors' },
  { p: /handrail/i,                                                                          id: 425, name: 'Handrail Contractors' },

  // ── Masonry ───────────────────────────────────────────────────────────────
  { p: /tuckpoint/i,                                                                         id: 435, name: 'Tuckpointing Specialists' },
  { p: /brick.*repoint|repoint.*brick|repointing/i,                                        id: 432, name: 'Brick Repointing Contractors' },
  { p: /brick.*replac|replac.*brick/i,                                                      id: 433, name: 'Brick Replacement Contractors' },
  { p: /brick.*crack/i,                                                                     id: 434, name: 'Brick Crack Repair Specialists' },
  { p: /cavity.*flash/i,                                                                    id: 438, name: 'Cavity Flashing Repair Contractors' },
  { p: /lintel.*repair|corroded.*lintel/i,                                                  id: 439, name: 'Corroded Lintel Repair Contractors' },
  { p: /parapet.*repair/i,                                                                  id: 440, name: 'Parapet Repair Contractors' },
  { p: /stonemason|stone.*mason/i,                                                          id: 442, name: 'Stonemasons' },
  { p: /stone.*restor|heritage.*stone/i,                                                    id: 441, name: 'Stone Restoration Contractors' },
  { p: /masonry.*clean|brick.*clean/i,                                                      id: 443, name: 'Masonry Cleaning Contractors' },
  { p: /effloresc/i,                                                                         id: 444, name: 'Efflorescence Treatment Contractors' },
  { p: /heritage.*mason/i,                                                                  id: 437, name: 'Heritage Masonry Contractors' },
  { p: /blocklayer|block.*lay/i,                                                            id: 431, name: 'Blocklayers' },
  { p: /bricklayer|bricklaying|brick.*work/i,                                               id: 430, name: 'Bricklayers' },

  // ── Sealants / Joints ─────────────────────────────────────────────────────
  { p: /expansion\s*joint|movement\s*joint/i,                                               id: 449, name: 'Expansion Joint Contractors' },
  { p: /control\s*joint/i,                                                                  id: 450, name: 'Control Joint Contractors' },
  { p: /sealant|caulking|caulk/i,                                                           id: 370, name: 'Sealant Contractors' },

  // ── Scaffold / Access ─────────────────────────────────────────────────────
  { p: /scaffold/i,                                                                          id: 454, name: 'Scaffold Companies' },
  { p: /swing\s*stage/i,                                                                    id: 455, name: 'Swing Stage Providers' },
  { p: /mast\s*climber/i,                                                                   id: 456, name: 'Mast Climber Providers' },
  { p: /rope\s*access/i,                                                                    id: 458, name: 'Rope Access Contractors' },
  { p: /height\s*safety|anchor\s*point|static\s*line/i,                                    id: 460, name: 'Height Safety Contractors' },
  { p: /BMU|building\s*maint.*unit/i,                                                       id: 459, name: 'BMU Providers' },
  { p: /hoarding/i,                                                                          id: 465, name: 'Hoarding Companies' },
  { p: /gantry/i,                                                                            id: 466, name: 'Gantry Contractors' },
  { p: /traffic\s*control/i,                                                                id: 464, name: 'Traffic Control' },

  // ── Investigation / Testing ───────────────────────────────────────────────
  { p: /leak\s*detect/i,                                                                    id: 468, name: 'Leak Detection Specialists' },
  { p: /drone.*inspect|drone.*survey/i,                                                     id: 473, name: 'Drone Inspection' },
  { p: /thermograph|infrared.*inspect/i,                                                    id: 474, name: 'Thermographic / Infrared Inspection' },
  { p: /NDT|non.?destructive.*test/i,                                                       id: 470, name: 'NDT Testing' },
  { p: /corrosion.*test/i,                                                                  id: 471, name: 'Corrosion Testing' },
  { p: /concrete.*test.*lab/i,                                                              id: 472, name: 'Concrete Testing Labs' },

  // ── Hazardous Materials ───────────────────────────────────────────────────
  { p: /asbestos.*consult|asbestos.*assess/i,                                               id: 488, name: 'Asbestos Consultants' },
  { p: /asbestos.*remov|asbestos.*abat/i,                                                   id: 489, name: 'Asbestos Removal Contractors' },
  { p: /asbestos/i,                                                                          id: 489, name: 'Asbestos Removal Contractors' },
  { p: /mould.*remov|mould.*remediat|mold.*remov/i,                                        id: 490, name: 'Mould Remediation Contractors' },
  { p: /lead.*paint/i,                                                                      id: 491, name: 'Lead Paint Contractors' },
  { p: /hazardous.*material/i,                                                              id: 492, name: 'Hazardous Materials Consultants' },
  { p: /pest\s*control|termite|white.?ant/i,                                               id: 499, name: 'Pest Control Contractors' },
  { p: /bird.*control|pigeon/i,                                                             id: 496, name: 'Bird Control Contractors' },
  { p: /rodent|vermin/i,                                                                    id: 497, name: 'Rodent Control Contractors' },

  // ── Plumbing / Drainage ───────────────────────────────────────────────────
  { p: /roof\s*plumb/i,                                                                     id: 391, name: 'Roof Plumbers' },
  { p: /gas\s*fitter|gas\s*plumb/i,                                                        id: 517, name: 'Gas Fitters' },
  { p: /hot\s*water\s*(system|service|repair)/i,                                           id: 519, name: 'Hot Water System Contractors' },
  { p: /pipe\s*relin/i,                                                                     id: 521, name: 'Pipe Relining Contractors' },
  { p: /stormwater/i,                                                                        id: 523, name: 'Stormwater Contractors' },
  { p: /downpipe/i,                                                                          id: 529, name: 'Downpipe Contractors' },
  { p: /sewer\s*repair|sewer\s*contractor/i,                                               id: 531, name: 'Sewer Contractors' },
  { p: /grease\s*trap/i,                                                                    id: 532, name: 'Grease Trap Contractors' },
  { p: /drainage|drain\s*contractor|blocked\s*drain/i,                                     id: 522, name: 'Drainage Contractors' },
  { p: /plumber|plumbing/i,                                                                 id: 513, name: 'Commercial Plumbers' },

  // ── Electrical ────────────────────────────────────────────────────────────
  { p: /solar.*panel|photovoltaic|PV\s*install/i,                                          id: 668, name: 'Solar Panel Installers' },
  { p: /solar.*batter|batter.*storage/i,                                                   id: 669, name: 'Battery Storage Installers' },
  { p: /EV\s*charg|electric.*vehicle.*charg/i,                                             id: 548, name: 'EV Charging Installers' },
  { p: /solar/i,                                                                             id: 667, name: 'Solar & Renewables' },
  { p: /lighting.*contractor|LED.*retrofit|light.*install/i,                               id: 543, name: 'Lighting Contractors' },
  { p: /switchboard|main\s*switch/i,                                                        id: 542, name: 'Switchboard Upgrades' },
  { p: /data.*cabling|comms.*cabling|fibre.*optic/i,                                       id: 546, name: 'Data & Communications Electricians' },
  { p: /antenna.*install|TV.*antenna/i,                                                     id: 556, name: 'Antenna Installers' },
  { p: /electrician|electrical.*contractor|strata.*electrical/i,                           id: 537, name: 'Commercial Electricians' },

  // ── HVAC ──────────────────────────────────────────────────────────────────
  { p: /split\s*system\s*install/i,                                                         id: 567, name: 'Split System Installers' },
  { p: /ventilat|ductwork|duct\s*clean/i,                                                  id: 562, name: 'Ventilation Contractors' },
  { p: /refrigerat/i,                                                                        id: 569, name: 'Refrigeration Contractors' },
  { p: /boiler/i,                                                                            id: 565, name: 'Boiler Contractors' },
  { p: /hydronic\s*heat/i,                                                                  id: 566, name: 'Hydronic Heating Contractors' },
  { p: /BMS|building\s*management\s*system/i,                                              id: 568, name: 'BMS Contractors' },
  { p: /chiller/i,                                                                           id: 564, name: 'Chiller Contractors' },
  { p: /air\s*con|aircon|HVAC|heating.*cool|cool.*heat/i,                                  id: 560, name: 'Air Conditioning Contractors' },

  // ── Fire Services ─────────────────────────────────────────────────────────
  { p: /fire\s*door/i,                                                                      id: 573, name: 'Fire Door Contractors' },
  { p: /fire\s*sprinkler/i,                                                                 id: 574, name: 'Fire Sprinkler Contractors' },
  { p: /fire\s*alarm|smoke\s*alarm/i,                                                      id: 576, name: 'Fire Alarm Contractors' },
  { p: /fire\s*hydrant/i,                                                                   id: 575, name: 'Fire Hydrant Contractors' },
  { p: /fire\s*suppression/i,                                                               id: 577, name: 'Fire Suppression Contractors' },
  { p: /smoke\s*control/i,                                                                  id: 578, name: 'Smoke Control System Contractors' },
  { p: /passive\s*fire/i,                                                                   id: 571, name: 'Passive Fire Contractors' },
  { p: /fire\s*stop/i,                                                                      id: 572, name: 'Fire Stopping Contractors' },

  // ── Security ─────────────────────────────────────────────────────────────
  { p: /locksmith/i,                                                                         id: 591, name: 'Locksmiths' },
  { p: /intercom.*install|CCTV.*install/i,                                                  id: 587, name: 'Intercom Installers' },
  { p: /CCTV/i,                                                                              id: 585, name: 'CCTV Installers' },
  { p: /access\s*control.*install|boom\s*gate/i,                                            id: 586, name: 'Access Control System Installers' },
  { p: /security\s*alarm|alarm\s*system|alarm.*monitor/i,                                  id: 584, name: 'Security System Installers' },
  { p: /security\s*system|security\s*contractor|security\s*service/i,                     id: 584, name: 'Security System Installers' },
  { p: /master\s*key/i,                                                                     id: 592, name: 'Master Key System Installers' },
  { p: /garage\s*door|roller\s*door|automatic\s*door|auto.*door\s*repair/i,               id: 779, name: 'Garage Door Installers' },

  // ── Lifts / Vertical Transport ────────────────────────────────────────────
  { p: /lift\s*install|elevator.*install/i,                                                 id: 595, name: 'Lift Installers' },
  { p: /lift\s*mainten|elevator.*mainten|escalator/i,                                      id: 596, name: 'Lift Maintenance Contractors' },
  { p: /dumbwaiter/i,                                                                        id: 598, name: 'Dumbwaiter Installers' },

  // ── Specialist Trades ─────────────────────────────────────────────────────
  { p: /tiler|tiling|tile.*install|tile.*replac/i,                                          id: 614, name: 'Tilers' },
  { p: /epoxy\s*floor|floor.*epoxy/i,                                                       id: 619, name: 'Epoxy Flooring Contractors' },
  { p: /floor\s*grind|floor\s*sand/i,                                                       id: 622, name: 'Floor Grinding Contractors' },
  { p: /vinyl\s*floor/i,                                                                    id: 616, name: 'Vinyl Floor Layers' },
  { p: /carpet\s*lay/i,                                                                     id: 617, name: 'Carpet Layers' },
  { p: /timber\s*floor/i,                                                                   id: 618, name: 'Timber Floor Layers' },
  { p: /screeder|screed\s*floor/i,                                                          id: 615, name: 'Screeders' },
  { p: /carpenter|carpentry|joinery\s*contractor/i,                                         id: 607, name: 'Carpenters' },
  { p: /joiner\b|joinery/i,                                                                 id: 608, name: 'Joiners' },
  { p: /cabinet\s*maker|cabinetmaker/i,                                                     id: 609, name: 'Cabinet Makers' },
  { p: /door\s*install|door\s*repair|automatic.*door|door.*contractor/i,                   id: 610, name: 'Door Installers' },
  { p: /staircase|stair.*build|stair.*contractor/i,                                        id: 611, name: 'Staircase Contractors' },
  { p: /decking\s*contractor|timber.*deck/i,                                               id: 612, name: 'Decking Contractors' },
  { p: /pergola/i,                                                                           id: 613, name: 'Pergola Builders' },
  { p: /anti.?slip.*coat/i,                                                                 id: 621, name: 'Anti Slip Coating Contractors' },
  { p: /caulking/i,                                                                          id: 625, name: 'Caulking Contractors' },
  { p: /line\s*marking/i,                                                                   id: 606, name: 'Line Marking Contractors' },
  { p: /steel\s*fabricat/i,                                                                 id: 626, name: 'Steel Fabricators' },
  { p: /aluminium\s*fabricat/i,                                                             id: 628, name: 'Aluminium Fabricators' },
  { p: /stainless\s*steel/i,                                                                id: 629, name: 'Stainless Steel Contractors' },
  { p: /welder|welding/i,                                                                   id: 631, name: 'Welders' },
  { p: /fence.*install|fencing\s*contractor/i,                                             id: 632, name: 'Fence Installers' },
  { p: /gate.*install|automatic.*gate/i,                                                    id: 633, name: 'Gate Installers' },
  { p: /pool\s*build/i,                                                                     id: 634, name: 'Pool Builders' },
  { p: /pool.*mainten|pool.*service/i,                                                      id: 650, name: 'Pool Maintenance Contractors' },
  { p: /signage/i,                                                                           id: 635, name: 'Signage Contractors' },
  { p: /shopfit/i,                                                                           id: 771, name: 'Shopfitters' },
  { p: /insulation\s*install/i,                                                             id: 768, name: 'Insulation Installers' },

  // ── Landscaping ───────────────────────────────────────────────────────────
  { p: /retaining\s*wall/i,                                                                 id: 645, name: 'Retaining Wall Contractors' },
  { p: /paving|paver\s*install|driveway.*paving/i,                                         id: 646, name: 'Paving Contractors' },
  { p: /outdoor.*drain|garden.*drain/i,                                                     id: 647, name: 'Outdoor Drainage Contractors' },
  { p: /outdoor.*light/i,                                                                   id: 648, name: 'Outdoor Lighting Contractors' },
  { p: /tree.*lopp|tree.*remov|tree.*trim|arborist|tree.*surg/i,                          id: 642, name: 'Tree Services / Arborists' },
  { p: /irrigation\s*system|irrigation\s*install/i,                                        id: 640, name: 'Irrigation Contractors' },
  { p: /lawn\s*mainten|garden\s*mainten|grounds\s*mainten/i,                              id: 641, name: 'Garden Maintenance Contractors' },
  { p: /landscape|landscaping/i,                                                            id: 638, name: 'Landscape Contractors' },
  { p: /turf\s*install|turf\s*supplier/i,                                                  id: 644, name: 'Turf Suppliers & Installers' },

  // ── Cleaning ──────────────────────────────────────────────────────────────
  { p: /high.?rise.*window.*clean|rope.*access.*window.*clean|window.*clean.*rope/i,      id: 657, name: 'High-Rise Window Cleaning (Rope Access)' },
  { p: /window.*clean|glass.*clean/i,                                                      id: 656, name: 'Window Cleaners' },
  { p: /pressure.*wash|high.*pressure.*clean|jet.*wash/i,                                  id: 658, name: 'Pressure Washing Contractors' },
  { p: /graffiti/i,                                                                          id: 662, name: 'Graffiti Removal Contractors' },
  { p: /carpet.*clean/i,                                                                    id: 663, name: 'Carpet Cleaners' },
  { p: /car\s*park.*clean/i,                                                                id: 659, name: 'Car Park Cleaners' },
  { p: /strata.*clean|building.*clean|commercial.*clean/i,                                 id: 655, name: 'Commercial Cleaners' },
  { p: /rubbish.*remov|junk.*remov|waste.*remov/i,                                        id: 664, name: 'Rubbish Removal Contractors' },
  { p: /skip.*bin|bin.*hire/i,                                                              id: 665, name: 'Skip Bin Hire' },

  // ── Builders ─────────────────────────────────────────────────────────────
  { p: /class\s*1.*remedial.*build|remedial.*class\s*1/i,                                  id: 352, name: 'Class 1 Remedial Builders' },
  { p: /class\s*2.*remedial.*build|remedial.*class\s*2/i,                                  id: 353, name: 'Class 2 Remedial Builders' },
  { p: /class\s*[12].*build/i,                                                              id: 353, name: 'Class 2 Remedial Builders' },
  { p: /remedial.*build|build.*remedial/i,                                                  id: 354, name: 'Remedial Builders' },
  { p: /deck\s*build/i,                                                                     id: 652, name: 'Deck Builders' },
  { p: /patio\s*build/i,                                                                    id: 780, name: 'Patio Builders' },
  { p: /pergola\s*build/i,                                                                  id: 613, name: 'Pergola Builders' },
  { p: /shed\s*build/i,                                                                     id: 765, name: 'Shed Builders' },
  { p: /granny\s*flat|home.*extension|extension.*build/i,                                  id: 758, name: 'Renovation Builders' },
  { p: /renovation.*build|build.*renovat/i,                                                id: 758, name: 'Renovation Builders' },
  { p: /residential.*build/i,                                                               id: 756, name: 'Residential Builders' },
  { p: /commercial.*build/i,                                                                id: 757, name: 'Commercial Builders' },
  { p: /\bbuilder(s)?\b/i,                                                                  id: 755, name: 'Builders (General / Licensed)' },

  // ── Suppliers ─────────────────────────────────────────────────────────────
  { p: /waterproof.*supplier|waterproof.*distribut/i,                                       id: 730, name: 'Waterproofing Suppliers' },
  { p: /concrete.*repair.*supplier|concrete.*product/i,                                    id: 731, name: 'Concrete Repair Suppliers' },
  { p: /paint.*supplier/i,                                                                  id: 742, name: 'Paint Suppliers' },
  { p: /roofing.*material|roofing.*supplier/i,                                             id: 734, name: 'Roofing Material Suppliers' },
  { p: /tool.*hire/i,                                                                        id: 754, name: 'Tool Hire Companies' },
];

// ─── Categories that need re-examination (currently used as catch-alls) ──────
const CATCHALL_IDS = new Set([351, 372, 389, 404, 273, 302, 322, 335, 601, 637, 653]);

async function main() {
  const client = await pool.connect();

  const { rows: companies } = await client.query(`
    SELECT c.id, c.name, c.main_category_id, cat.name AS current_cat
    FROM companies c
    LEFT JOIN categories cat ON cat.id = c.main_category_id
    WHERE c.status = 'published'
    ORDER BY c.id
  `);
  console.log(`Loaded ${companies.length} companies`);

  const changes = [];   // will be reassigned
  const confirmed = []; // already correctly assigned (rule matches existing)
  const unknowns = [];  // no rule matched

  for (const co of companies) {
    const name = co.name || '';
    let matched = null;

    for (const rule of RULES) {
      if (rule.p.test(name)) {
        matched = rule;
        break;
      }
    }

    if (!matched) {
      unknowns.push(co);
    } else if (matched.id === co.main_category_id) {
      confirmed.push(co);
    } else {
      changes.push({ ...co, new_cat_id: matched.id, new_cat: matched.name });
    }
  }

  console.log(`\nResults:`);
  console.log(`  Would reassign : ${changes.length}`);
  console.log(`  Already correct: ${confirmed.length}`);
  console.log(`  No rule match  : ${unknowns.length}`);

  // Summary of reassignments by new category
  const byNewCat = {};
  for (const c of changes) {
    byNewCat[c.new_cat] = (byNewCat[c.new_cat] || 0) + 1;
  }
  console.log('\nTop reassignments:');
  Object.entries(byNewCat).sort((a,b)=>b[1]-a[1]).slice(0,30).forEach(([k,v]) =>
    console.log(`  ${String(v).padStart(5)}  ${k}`)
  );

  // Summary of where unknowns currently sit
  const unknownByCat = {};
  for (const c of unknowns) {
    unknownByCat[c.current_cat || 'NO CATEGORY'] = (unknownByCat[c.current_cat || 'NO CATEGORY'] || 0) + 1;
  }
  console.log('\nUnknowns currently in:');
  Object.entries(unknownByCat).sort((a,b)=>b[1]-a[1]).slice(0,20).forEach(([k,v]) =>
    console.log(`  ${String(v).padStart(5)}  ${k}`)
  );

  // Write CSV files
  const dir = 'business-leads-output';
  if (!require('fs').existsSync(dir)) require('fs').mkdirSync(dir);

  const changesLines = ['id,name,current_category,new_category'];
  for (const c of changes) {
    changesLines.push(`${c.id},"${(c.name||'').replace(/"/g,'""')}","${(c.current_cat||'').replace(/"/g,'""')}","${c.new_cat}"`);
  }
  fs.writeFileSync(`${dir}/recategorise-changes.csv`, changesLines.join('\n'));
  console.log(`\nWrote ${changes.length} rows → ${dir}/recategorise-changes.csv`);

  const unknownLines = ['id,name,current_category'];
  for (const c of unknowns) {
    unknownLines.push(`${c.id},"${(c.name||'').replace(/"/g,'""')}","${(c.current_cat||'').replace(/"/g,'""')}"`);
  }
  fs.writeFileSync(`${dir}/recategorise-unknowns.csv`, unknownLines.join('\n'));
  console.log(`Wrote ${unknowns.length} rows → ${dir}/recategorise-unknowns.csv`);

  client.release();
  await pool.end();
}

main().catch(e => { console.error(e); process.exit(1); });
