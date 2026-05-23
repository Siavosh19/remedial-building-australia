export type DefectCategory =
  | "Waterproofing & Water Ingress"
  | "Concrete & Structural Defects"
  | "Façade & External Envelope"
  | "Roofing Defects"
  | "Balconies & Podiums"
  | "Windows & Flashings"
  | "Services & Drainage";

export type Severity = "Minor" | "Moderate" | "Severe" | "Critical";

export type OutputType =
  | "consultant"
  | "builder"
  | "strata"
  | "methodology"
  | "tender";

export interface ProjectData {
  name: string;
  address: string;
  buildingType: string;
  isClass2: boolean;
  occupied: boolean;
  levels: string;
  lots: string;
  clientName: string;
  preparedBy: string;
  reportDate: string;
  accessConstraints: string;
  coastalExposure: boolean;
  notes: string;
}

export interface Defect {
  id: string;
  category: DefectCategory;
  defectType: string;
  location: string;
  severity: Severity;
  quantity: string;
  suspectedCause: string;
  notes: string;
}

export interface RepairSystem {
  id: string;
  name: string;
  description: string;
  suitableFor: DefectCategory[];
  process: string[];
  considerations: string;
}

export interface Material {
  id: string;
  brand: string;
  productName: string;
  category: string;
  suitableSystem: string;
  compatibleSubstrate: string;
  location: "Internal" | "External" | "Both";
  uvExposed: boolean;
  applicationNotes: string;
  tdsLink: string;
  limitations: string;
}

export interface ScopeClause {
  id: string;
  category: string;
  title: string;
  content: string;
}

export interface SavedProject {
  id: string;
  project: ProjectData;
  defects: Defect[];
  selectedRepairSystems: string[];
  selectedMaterials: string[];
  selectedClauses: string[];
  outputType: OutputType;
  generatedScope: string;
  createdAt: string;
  updatedAt: string;
}
