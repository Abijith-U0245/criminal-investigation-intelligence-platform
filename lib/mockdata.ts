import { Document, ExplanationData, GraphNode, GraphLink, TimelineEvent, RAGResponse } from './types';

export const mockDocuments: Document[] = [
  {
    id: 'FIR-2024-001',
    type: 'FIR',
    title: 'FIR - Robbery Case MG Road',
    content: 'First Information Report filed on 15-Jan-2024 regarding armed robbery near MG Road metro station. Suspect identified as Rahul Kumar, approximately 25 years old, medium build. Incident occurred at 22:30 hours. Witness reports suspect fled towards Park Street.',
    relevanceScore: 0.94,
    matchedEntities: {
      persons: ['Rahul Kumar'],
      locations: ['MG Road', 'Park Street'],
      times: ['22:30 hours', '15-Jan-2024'],
    },
    timestamp: '2024-01-15T22:45:00Z',
    metadata: {
      'Filing Officer': 'Inspector Sharma',
      'Station': 'MG Road Police Station',
      'Case Number': 'CR-2024-001',
    },
  },
  {
    id: 'CCTV-2024-002',
    type: 'CCTV Log',
    title: 'CCTV Footage - MG Road Junction',
    content: 'CCTV footage from MG Road junction camera showing individual matching suspect description at 22:28 hours. Subject wearing dark hoodie, carrying backpack. Vehicle registration partially visible: DL-8C-XX45. Subject entered Park Street at 22:32 hours.',
    relevanceScore: 0.89,
    matchedEntities: {
      persons: ['Rahul Kumar'],
      locations: ['MG Road', 'Park Street'],
      times: ['22:28 hours', '22:32 hours'],
    },
    timestamp: '2024-01-15T22:28:00Z',
    metadata: {
      'Camera ID': 'CAM-MGR-003',
      'Location': 'MG Road Junction',
      'Quality': 'High',
    },
  },
  {
    id: 'CDR-2024-003',
    type: 'CDR',
    title: 'Call Detail Record - +91-9876543210',
    content: 'Call Detail Record for phone number +91-9876543210 registered to Rahul Kumar. Active calls made from MG Road tower at 22:15 hours and Park Street tower at 22:35 hours. Three calls made to number +91-9123456789 between 22:00 and 23:00 hours.',
    relevanceScore: 0.92,
    matchedEntities: {
      persons: ['Rahul Kumar'],
      locations: ['MG Road', 'Park Street'],
      phones: ['+91-9876543210', '+91-9123456789'],
      times: ['22:15 hours', '22:35 hours'],
    },
    timestamp: '2024-01-15T22:15:00Z',
    metadata: {
      'Service Provider': 'Airtel',
      'Tower Coverage': 'MG Road Sector',
      'Request ID': 'CDR-2024-003',
    },
  },
  {
    id: 'WIT-2024-004',
    type: 'Witness Statement',
    title: 'Witness Statement - Store Owner',
    content: 'Witness statement from Mr. Anil Verma, store owner at MG Road. States he saw a young man matching suspect description loitering near the area around 22:00 hours. Suspect appeared nervous and was frequently checking his phone. Left the area quickly after the incident.',
    relevanceScore: 0.78,
    matchedEntities: {
      persons: ['Rahul Kumar', 'Anil Verma'],
      locations: ['MG Road'],
      times: ['22:00 hours'],
    },
    timestamp: '2024-01-16T10:30:00Z',
    metadata: {
      'Witness Name': 'Anil Verma',
      'Statement Recorded By': 'Constable Patel',
      'Reliability': 'High',
    },
  },
  {
    id: 'FOR-2024-005',
    type: 'Forensic Report',
    title: 'Forensic Analysis - Crime Scene',
    content: 'Forensic analysis of crime scene at MG Road. Fingerprints recovered match database entry for Rahul Kumar (previous record: petty theft, 2022). DNA samples collected from discarded cigarette butt. Footprint analysis indicates size 9 shoes, consistent with suspect profile.',
    relevanceScore: 0.91,
    matchedEntities: {
      persons: ['Rahul Kumar'],
      locations: ['MG Road'],
    },
    timestamp: '2024-01-17T14:00:00Z',
    metadata: {
      'Lab': 'State Forensic Laboratory',
      'Analyst': 'Dr. Reddy',
      'Report ID': 'FOR-2024-005',
    },
  },
];

export const mockExplanations: Record<string, ExplanationData> = {
  'FIR-2024-001': {
    semanticSimilarity: 0.94,
    matchedEntities: {
      persons: ['Rahul Kumar'],
      locations: ['MG Road', 'Park Street'],
      phones: [],
      times: ['22:30 hours', '15-Jan-2024'],
    },
    timeRelevance: 0.98,
    explanation: 'This FIR is highly relevant due to exact match of suspect name "Rahul Kumar" and location "MG Road". The incident time aligns with the query timeframe (night). Document contains primary evidence linking the suspect to the crime scene with high temporal correlation.',
  },
  'CCTV-2024-002': {
    semanticSimilarity: 0.89,
    matchedEntities: {
      persons: ['Rahul Kumar'],
      locations: ['MG Road', 'Park Street'],
      phones: [],
      times: ['22:28 hours', '22:32 hours'],
    },
    timeRelevance: 0.95,
    explanation: 'CCTV footage retrieved due to location match (MG Road) and time correlation within minutes of the reported incident. Visual evidence supports suspect movement pattern from MG Road to Park Street, corroborating witness statements and FIR details.',
  },
  'CDR-2024-003': {
    semanticSimilarity: 0.92,
    matchedEntities: {
      persons: ['Rahul Kumar'],
      locations: ['MG Road', 'Park Street'],
      phones: ['+91-9876543210', '+91-9123456789'],
      times: ['22:15 hours', '22:35 hours'],
    },
    timeRelevance: 0.97,
    explanation: 'Call Detail Record shows strong correlation with suspect identity (Rahul Kumar) and locations (MG Road and Park Street towers). Phone activity timeline matches incident progression. Multiple entity matches and high semantic similarity to query parameters.',
  },
  'WIT-2024-004': {
    semanticSimilarity: 0.78,
    matchedEntities: {
      persons: ['Rahul Kumar', 'Anil Verma'],
      locations: ['MG Road'],
      phones: [],
      times: ['22:00 hours'],
    },
    timeRelevance: 0.85,
    explanation: 'Witness statement provides corroborating evidence with location and suspect description match. Retrieved due to shared location entity (MG Road) and temporal proximity to incident. Moderate semantic similarity due to behavioral observations rather than direct physical evidence.',
  },
  'FOR-2024-005': {
    semanticSimilarity: 0.91,
    matchedEntities: {
      persons: ['Rahul Kumar'],
      locations: ['MG Road'],
      phones: [],
      times: [],
    },
    timeRelevance: 0.70,
    explanation: 'Forensic report retrieved due to strong suspect identity match (Rahul Kumar) and crime scene location (MG Road). Contains physical evidence with biometric confirmation. High semantic similarity through direct entity matches, though processed after initial incident time.',
  },
};

export const mockGraphData = {
  nodes: [
    { id: 'rahul-kumar', label: 'Rahul Kumar', type: 'Person' as const, color: '#ef4444' },
    { id: 'anil-verma', label: 'Anil Verma', type: 'Person' as const, color: '#3b82f6' },
    { id: 'mg-road', label: 'MG Road', type: 'Location' as const, color: '#10b981' },
    { id: 'park-street', label: 'Park Street', type: 'Location' as const, color: '#10b981' },
    { id: 'phone-1', label: '+91-9876543210', type: 'Phone' as const, color: '#f59e0b' },
    { id: 'phone-2', label: '+91-9123456789', type: 'Phone' as const, color: '#f59e0b' },
    { id: 'fir-001', label: 'FIR-2024-001', type: 'Document' as const, color: '#8b5cf6' },
    { id: 'cctv-002', label: 'CCTV-2024-002', type: 'Document' as const, color: '#8b5cf6' },
    { id: 'cdr-003', label: 'CDR-2024-003', type: 'Document' as const, color: '#8b5cf6' },
    { id: 'wit-004', label: 'WIT-2024-004', type: 'Document' as const, color: '#8b5cf6' },
    { id: 'event-1', label: 'Robbery Incident', type: 'Event' as const, color: '#ec4899' },
  ] as GraphNode[],
  links: [
    { source: 'rahul-kumar', target: 'mg-road', label: 'SEEN_AT' },
    { source: 'rahul-kumar', target: 'park-street', label: 'SEEN_AT' },
    { source: 'rahul-kumar', target: 'phone-1', label: 'USES' },
    { source: 'phone-1', target: 'phone-2', label: 'CALLED' },
    { source: 'phone-1', target: 'mg-road', label: 'TOWER_LOCATION' },
    { source: 'phone-1', target: 'park-street', label: 'TOWER_LOCATION' },
    { source: 'rahul-kumar', target: 'fir-001', label: 'APPEARS_IN' },
    { source: 'rahul-kumar', target: 'cctv-002', label: 'APPEARS_IN' },
    { source: 'rahul-kumar', target: 'cdr-003', label: 'APPEARS_IN' },
    { source: 'rahul-kumar', target: 'wit-004', label: 'APPEARS_IN' },
    { source: 'anil-verma', target: 'wit-004', label: 'APPEARS_IN' },
    { source: 'mg-road', target: 'fir-001', label: 'MENTIONED_IN' },
    { source: 'mg-road', target: 'cctv-002', label: 'MENTIONED_IN' },
    { source: 'mg-road', target: 'event-1', label: 'LOCATION_OF' },
    { source: 'event-1', target: 'rahul-kumar', label: 'INVOLVES' },
  ] as GraphLink[],
};

export const mockTimeline: TimelineEvent[] = [
  {
    id: 'evt-1',
    time: '2024-01-15T22:00:00Z',
    description: 'Suspect Rahul Kumar observed loitering near MG Road by witness Anil Verma',
    linkedDocuments: ['WIT-2024-004'],
    location: 'MG Road',
    participants: ['Rahul Kumar', 'Anil Verma'],
  },
  {
    id: 'evt-2',
    time: '2024-01-15T22:15:00Z',
    description: 'Phone activity detected from MG Road tower - multiple calls made',
    linkedDocuments: ['CDR-2024-003'],
    location: 'MG Road',
    participants: ['Rahul Kumar'],
  },
  {
    id: 'evt-3',
    time: '2024-01-15T22:28:00Z',
    description: 'CCTV captures suspect at MG Road junction wearing dark hoodie',
    linkedDocuments: ['CCTV-2024-002'],
    location: 'MG Road Junction',
    participants: ['Rahul Kumar'],
  },
  {
    id: 'evt-4',
    time: '2024-01-15T22:30:00Z',
    description: 'Armed robbery incident reported at MG Road metro station',
    linkedDocuments: ['FIR-2024-001'],
    location: 'MG Road Metro Station',
    participants: ['Rahul Kumar'],
  },
  {
    id: 'evt-5',
    time: '2024-01-15T22:32:00Z',
    description: 'Suspect captured on CCTV entering Park Street area',
    linkedDocuments: ['CCTV-2024-002'],
    location: 'Park Street',
    participants: ['Rahul Kumar'],
  },
  {
    id: 'evt-6',
    time: '2024-01-15T22:35:00Z',
    description: 'Phone activity detected from Park Street tower',
    linkedDocuments: ['CDR-2024-003'],
    location: 'Park Street',
    participants: ['Rahul Kumar'],
  },
  {
    id: 'evt-7',
    time: '2024-01-15T22:45:00Z',
    description: 'FIR officially filed at MG Road Police Station',
    linkedDocuments: ['FIR-2024-001'],
    location: 'MG Road Police Station',
    participants: ['Inspector Sharma'],
  },
];

export const mockRAGResponses: Record<string, RAGResponse> = {
  'where was suspect last seen': {
    answer: 'According to the available evidence, the suspect Rahul Kumar was last captured on CCTV entering the Park Street area at 22:32 hours on January 15, 2024. This is corroborated by Call Detail Records showing phone activity from the Park Street cell tower at 22:35 hours, indicating the suspect remained in that vicinity after the incident.',
    sources: [
      {
        documentId: 'CCTV-2024-002',
        documentType: 'CCTV Log',
        excerpt: 'Subject entered Park Street at 22:32 hours.',
      },
      {
        documentId: 'CDR-2024-003',
        documentType: 'CDR',
        excerpt: 'Active calls made from Park Street tower at 22:35 hours.',
      },
    ],
    confidence: 0.95,
  },
  'what evidence links rahul kumar': {
    answer: 'Multiple pieces of evidence link Rahul Kumar to the MG Road incident: (1) CCTV footage showing him at MG Road junction at 22:28 hours, (2) Call Detail Records placing his phone at MG Road tower during the incident timeframe, (3) Forensic evidence including fingerprints matching his database records, and (4) Witness testimony describing an individual matching his description at the scene. The convergence of digital, physical, and testimonial evidence creates a strong evidentiary chain.',
    sources: [
      {
        documentId: 'CCTV-2024-002',
        documentType: 'CCTV Log',
        excerpt: 'CCTV footage from MG Road junction camera showing individual matching suspect description...',
      },
      {
        documentId: 'CDR-2024-003',
        documentType: 'CDR',
        excerpt: 'Call Detail Record for phone number registered to Rahul Kumar. Active calls made from MG Road tower...',
      },
      {
        documentId: 'FOR-2024-005',
        documentType: 'Forensic Report',
        excerpt: 'Fingerprints recovered match database entry for Rahul Kumar...',
      },
    ],
    confidence: 0.93,
  },
  'timeline of events': {
    answer: 'The incident timeline begins at 22:00 hours with the suspect being observed loitering near MG Road. At 22:15 hours, phone activity was detected from the MG Road cell tower. CCTV captured the suspect at 22:28 hours at MG Road junction. The robbery occurred at 22:30 hours at the metro station. By 22:32 hours, the suspect was seen entering Park Street, with subsequent phone activity detected from that area at 22:35 hours. The FIR was filed at 22:45 hours.',
    sources: [
      {
        documentId: 'WIT-2024-004',
        documentType: 'Witness Statement',
        excerpt: 'States he saw a young man matching suspect description loitering near the area around 22:00 hours.',
      },
      {
        documentId: 'FIR-2024-001',
        documentType: 'FIR',
        excerpt: 'Incident occurred at 22:30 hours.',
      },
      {
        documentId: 'CCTV-2024-002',
        documentType: 'CCTV Log',
        excerpt: 'CCTV footage showing individual at 22:28 hours... Subject entered Park Street at 22:32 hours.',
      },
    ],
    confidence: 0.96,
  },
};
