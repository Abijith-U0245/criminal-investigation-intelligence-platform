'use client';

import { useState } from 'react';
import { Document, ExplanationData } from '@/lib/types';
import { FileText, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

interface DocumentsPanelProps {
  documents: Document[];
  explanations: Record<string, ExplanationData>;
}

export default function DocumentsPanel({ documents, explanations }: DocumentsPanelProps) {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'FIR': 'bg-red-900/30 text-red-400 border-red-800',
      'CCTV Log': 'bg-blue-900/30 text-blue-400 border-blue-800',
      'CDR': 'bg-purple-900/30 text-purple-400 border-purple-800',
      'Witness Statement': 'bg-green-900/30 text-green-400 border-green-800',
      'Forensic Report': 'bg-orange-900/30 text-orange-400 border-orange-800',
    };
    return colors[type] || 'bg-zinc-900/30 text-zinc-400 border-zinc-800';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-100">Retrieved Documents</h2>
        <span className="text-sm text-zinc-500">{documents.length} results</span>
      </div>

      <div className="space-y-3">
        {documents.map((doc) => {
          const isExpanded = selectedDoc === doc.id;
          const explanation = explanations[doc.id];

          return (
            <div
              key={doc.id}
              className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3 flex-1">
                    <FileText className="text-zinc-500 mt-1" size={20} />
                    <div className="flex-1">
                      <h3 className="font-medium text-zinc-100 mb-1">{doc.title}</h3>
                      <p className="text-sm text-zinc-400 line-clamp-2">{doc.content}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-400">
                        {Math.round(doc.relevanceScore * 100)}
                      </div>
                      <div className="text-xs text-zinc-500">Relevance</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded border ${getTypeColor(doc.type)}`}>
                    {doc.type}
                  </span>
                  <span className="px-2 py-1 text-xs text-zinc-400 bg-zinc-800 rounded">
                    {new Date(doc.timestamp).toLocaleString()}
                  </span>
                </div>

                <div className="space-y-2">
                  {doc.matchedEntities.persons && doc.matchedEntities.persons.length > 0 && (
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-zinc-500">Persons:</span>
                      <div className="flex flex-wrap gap-1">
                        {doc.matchedEntities.persons.map((person, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-red-900/30 text-red-400 rounded text-xs">
                            {person}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {doc.matchedEntities.locations && doc.matchedEntities.locations.length > 0 && (
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-zinc-500">Locations:</span>
                      <div className="flex flex-wrap gap-1">
                        {doc.matchedEntities.locations.map((location, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-green-900/30 text-green-400 rounded text-xs">
                            {location}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {doc.matchedEntities.phones && doc.matchedEntities.phones.length > 0 && (
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-zinc-500">Phones:</span>
                      <div className="flex flex-wrap gap-1">
                        {doc.matchedEntities.phones.map((phone, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-purple-900/30 text-purple-400 rounded text-xs">
                            {phone}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setSelectedDoc(isExpanded ? null : doc.id)}
                  className="mt-3 flex items-center space-x-1 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <AlertCircle size={16} />
                  <span>Why this document?</span>
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>

              {isExpanded && explanation && (
                <div className="border-t border-zinc-800 bg-zinc-950/50 p-4">
                  <h4 className="text-sm font-semibold text-zinc-300 mb-3">Explainability Analysis</h4>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-zinc-900 p-3 rounded border border-zinc-800">
                      <div className="text-xs text-zinc-500 mb-1">Semantic Similarity</div>
                      <div className="text-xl font-bold text-blue-400">
                        {Math.round(explanation.semanticSimilarity * 100)}%
                      </div>
                    </div>
                    <div className="bg-zinc-900 p-3 rounded border border-zinc-800">
                      <div className="text-xs text-zinc-500 mb-1">Time Relevance</div>
                      <div className="text-xl font-bold text-green-400">
                        {Math.round(explanation.timeRelevance * 100)}%
                      </div>
                    </div>
                    <div className="bg-zinc-900 p-3 rounded border border-zinc-800">
                      <div className="text-xs text-zinc-500 mb-1">Entity Matches</div>
                      <div className="text-xl font-bold text-purple-400">
                        {Object.values(explanation.matchedEntities).flat().length}
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-900 p-3 rounded border border-zinc-800">
                    <div className="text-xs text-zinc-500 mb-2">Natural Language Explanation</div>
                    <p className="text-sm text-zinc-300 leading-relaxed">{explanation.explanation}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
