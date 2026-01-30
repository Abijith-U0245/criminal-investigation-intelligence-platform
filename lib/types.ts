export interface Document {
  id: string;
  type: 'FIR' | 'CCTV Log' | 'CDR' | 'Witness Statement' | 'Forensic Report';
  title: string;
  content: string;
  relevanceScore: number;
  matchedEntities: {
    persons?: string[];
    locations?: string[];
    phones?: string[];
    times?: string[];
  };
  timestamp: string;
  metadata: Record<string, string>;
}

export interface ExplanationData {
  semanticSimilarity: number;
  matchedEntities: {
    persons: string[];
    locations: string[];
    phones: string[];
    times: string[];
  };
  timeRelevance: number;
  explanation: string;
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'Person' | 'Location' | 'Phone' | 'Document' | 'Event';
  color?: string;
}

export interface GraphLink {
  source: string;
  target: string;
  label: string;
}

export interface TimelineEvent {
  id: string;
  time: string;
  description: string;
  linkedDocuments: string[];
  location?: string;
  participants?: string[];
}

export interface RAGResponse {
  answer: string;
  sources: Array<{
    documentId: string;
    documentType: string;
    excerpt: string;
  }>;
  confidence: number;
}
