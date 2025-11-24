export enum AppMode {
  STRATEGY = 'STRATEGY',
  PROTOTYPE_SCANNER = 'PROTOTYPE_SCANNER',
  PROTOTYPE_DASHBOARD = 'PROTOTYPE_DASHBOARD'
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  nextDose?: string;
}

export interface StrategyResponse {
  strategies: Strategy[];
}

export interface Strategy {
  title: string;
  description: string;
  features: string[];
  technicalImplementation: string;
}

export interface AnalysisResult {
  medications: Medication[];
  confidence: number;
}
