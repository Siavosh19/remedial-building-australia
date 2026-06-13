/**
 * Controlled list of approved directory labels.
 * New suggestions from the classifier go to SUGGESTED_LABELS — not auto-added.
 */

const APPROVED_LABELS = [
  // Remedial & Waterproofing
  'Remedial Building Contractor',
  'Waterproofing Contractor',
  'Torch-On Waterproofing Contractor',
  'Below-Ground Waterproofing Contractor',
  'Damp Proofing Contractor',
  'Leak Detection Specialist',

  // Concrete
  'Concrete Contractor',
  'Concrete Supplier',
  'Concrete Repair Contractor',
  'Concrete Pump Operator',
  'Shotcrete Contractor',

  // Façade & Cladding
  'Façade Contractor',
  'Façade Consultant',
  'Cladding Contractor',
  'Cladding Supplier',

  // Windows, Doors & Glass
  'Window & Door Manufacturer',
  'Window & Door Supplier',
  'Glazing Contractor',
  'Glass & Glazing Supplier',
  'Fire Door Contractor',
  'Garage Door Contractor',

  // Roofing
  'Roofing Contractor',
  'Metal Roofing Contractor',
  'Roof Restoration Contractor',
  'Skylight Supplier',
  'Guttering Contractor',

  // Structure & Engineering
  'Structural Engineering Consultant',
  'Geotechnical Engineering Consultant',
  'Engineering Consultant',
  'Underpinning Contractor',
  'Reblocking & Restumping Contractor',
  'Piling Contractor',

  // Painting & Coatings
  'Painting Contractor',
  'Industrial Painting Contractor',
  'Protective Coatings Contractor',
  'Epoxy Flooring Contractor',

  // Flooring
  'Flooring Contractor',
  'Flooring Supplier',
  'Tiling Contractor',
  'Tile & Grout Restoration Contractor',

  // Wall & Ceiling Finishes
  'Rendering Contractor',
  'Plastering Contractor',
  'Ceilings & Partitions Contractor',

  // Carpentry & Joinery
  'Carpentry Contractor',
  'Cabinet Maker',
  'Joinery Supplier',
  'Decking Contractor',

  // Steel & Metal
  'Steel Fabricator',
  'Steel Supplier',
  'Balustrade Contractor',
  'Balustrade Supplier',
  'Caulking & Sealant Contractor',

  // Masonry
  'Bricklaying Contractor',
  'Masonry Contractor',
  'Stone Restoration Contractor',

  // Mechanical & Electrical
  'Plumbing Contractor',
  'Pipe Relining Contractor',
  'Gas Fitting Contractor',
  'Electrical Contractor',
  'Solar Installer',
  'HVAC Contractor',
  'Mechanical Services Contractor',
  'Fire Services Contractor',
  'Security Systems Contractor',
  'Lifts & Escalators Contractor',

  // Access & Height Safety
  'Scaffolding Contractor',
  'Scaffolding Supplier',
  'Rope Access Contractor',
  'Access Equipment Supplier',

  // Site Works
  'Demolition Contractor',
  'Earthmoving Contractor',
  'Excavation Contractor',
  'Drainage Contractor',
  'Paving Contractor',
  'Crane & Rigging Contractor',
  'Asbestos Removal Contractor',
  'Corrosion Protection Specialist',

  // Landscaping & Outdoors
  'Landscaping Contractor',
  'Fencing Contractor',
  'Pool Builder',
  'Tree Services Contractor',

  // Cleaning
  'Cleaning Contractor',
  'Window Cleaning Contractor',
  'Pressure Cleaning Contractor',
  'Water Damage Restoration Contractor',

  // Inspections & Compliance
  'Building Inspector',
  'Building & Pest Inspector',
  'Building Certifier',
  'Quantity Surveyor',
  'Bushfire Consultant',

  // Design & Advisory
  'Architect',
  'Building Designer',
  'Interior Designer',
  'Town Planner',
  'Environmental Consultant',
  'Access Consultant',
  'Heritage Consultant',

  // Construction
  'Home Builder',
  'Commercial Builder',
  'Renovation Contractor',
  'Fitout Contractor',
  'Building Maintenance Contractor',

  // Management
  'Project Manager',
  'Property Manager',
  'Strata Management',
  'Facility Manager',

  // Supply & Materials
  'Building Material Supplier',
  'Hardware Supplier',
  'Insulation Supplier',
  'Insulation Contractor',
  'Pest Control Contractor',

  // Catch-all
  'Trade Contractor',
  'General Building Services',
];

// Labels suggested by the classifier but not yet approved — for admin review
const SUGGESTED_LABELS = [];

function isApproved(label) {
  return APPROVED_LABELS.some(l => l.toLowerCase() === label.toLowerCase());
}

function suggestNew(label, reason) {
  if (!isApproved(label) && !SUGGESTED_LABELS.find(s => s.label === label)) {
    SUGGESTED_LABELS.push({ label, reason, timestamp: new Date().toISOString() });
  }
}

module.exports = { APPROVED_LABELS, SUGGESTED_LABELS, isApproved, suggestNew };
