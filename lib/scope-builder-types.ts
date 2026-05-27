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
  constructionType: string;
  roofType: string;
  externalWallType: string;
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
  diagnosticNotes: string;
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

// ── V2 types (checklist-driven workflow) ─────────────────────────────────────

export interface ProjectDataV2 {
  buildingName: string;
  address: string;
  suburb: string;
  state: string;
  buildingClass: string;
  storeys: string;
  yearOfConstruction: string;
  coastal: boolean;
  occupied: boolean;
  hazmat: boolean;
  hazmatNotes: string;
  consultantName: string;
  reportDate: string;
  aiNotes: string;
}

export interface WorkItemState {
  checked: string[];                  // checklist sub-item IDs
  quantities: Record<string, string>; // sub-item ID → quantity
  notes: string;
}

export interface SavedProjectV2 {
  id: string;
  version: 2;
  projectData: ProjectDataV2;
  constructionTypes: string[];
  selectedWorkItems: string[];
  customWorkItems: string[];
  workItemStates: Record<string, WorkItemState>;
  outputFormat: "consultant" | "tender" | "strata" | "methodology" | "all";
  consultantNotes: string;
  prelimClauses: string[];
  generatedScope: string;
  createdAt: string;
  updatedAt: string;
}

// ── V3 types (area-first workflow) ────────────────────────────────────────────

export interface DefectEntryV3 {
  defectId: string;
  severity: "Minor" | "Moderate" | "Widespread" | "Severe" | "Safety Critical";
  extent: "Localised" | "Moderate" | "Widespread";
  probableCause: string;
  notes: string;
}

export interface AreaStateV3 {
  constructionTypes: string[]; // selected construction type IDs
  defects: DefectEntryV3[];
}

export interface SavedProjectV3 {
  id: string;
  version: 3;
  projectData: ProjectDataV2;
  areas: Record<string, AreaStateV3>; // areaId → AreaStateV3
  selectedWorkItems: string[];
  customWorkItems: string[];
  workItemStates: Record<string, WorkItemState>;
  accessConstraints: string[];
  complianceTriggers: string[];
  investigations: string[];
  outputFormat: string;
  consultantNotes: string;
  prelimClauses: string[];
  generatedScope: string;
  createdAt: string;
  updatedAt: string;
}
