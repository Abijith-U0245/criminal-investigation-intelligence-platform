'use client';

import { useState } from 'react';
import { Shield, Database, Network, Clock, MessageCircle } from 'lucide-react';
import QueryInterface from '@/components/QueryInterface';
import DocumentsPanel from '@/components/DocumentsPanel';
import KnowledgeGraph from '@/components/KnowledgeGraph';
import TimelineView from '@/components/TimelineView';
import QAInterface from '@/components/QAInterface';
import { mockDocuments, mockExplanations, mockGraphData, mockTimeline, mockRAGResponses } from '@/lib/mockdata';
import { RAGResponse } from '@/lib/types';

type TabType = 'documents' | 'graph' | 'timeline' | 'qa';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('documents');
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = (query: string) => {
    setSearchPerformed(true);
    setActiveTab('documents');
  };

  const handleAskQuestion = (question: string): RAGResponse | null => {
    const normalizedQuestion = question.toLowerCase();

    for (const [key, value] of Object.entries(mockRAGResponses)) {
      if (normalizedQuestion.includes(key)) {
        return value;
      }
    }

    return {
      answer: 'Based on the available evidence, I cannot provide a specific answer to this question. Please try rephrasing or asking about specific aspects of the case such as locations, suspects, or timeline.',
      sources: [],
      confidence: 0.3,
    };
  };

  const tabs = [
    { id: 'documents' as TabType, label: 'Retrieved Documents', icon: Database },
    { id: 'graph' as TabType, label: 'Knowledge Graph', icon: Network },
    { id: 'timeline' as TabType, label: 'Timeline', icon: Clock },
    { id: 'qa' as TabType, label: 'Q&A', icon: MessageCircle },
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-zinc-100">
                  Criminal Investigation Intelligence Platform
                </h1>
                <p className="text-xs text-zinc-500">Explainable AI for Law Enforcement</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="px-3 py-1.5 bg-green-900/30 text-green-400 rounded text-sm border border-green-800">
                System Active
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <QueryInterface onSearch={handleSearch} />
          </div>

          {searchPerformed && (
            <>
              <div className="border-b border-zinc-800">
                <nav className="flex space-x-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                          activeTab === tab.id
                            ? 'border-blue-600 text-blue-400'
                            : 'border-transparent text-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        <Icon size={18} />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                {activeTab === 'documents' && (
                  <DocumentsPanel documents={mockDocuments} explanations={mockExplanations} />
                )}
                {activeTab === 'graph' && (
                  <KnowledgeGraph nodes={mockGraphData.nodes} links={mockGraphData.links} />
                )}
                {activeTab === 'timeline' && <TimelineView events={mockTimeline} />}
                {activeTab === 'qa' && <QAInterface onAskQuestion={handleAskQuestion} />}
              </div>
            </>
          )}

          {!searchPerformed && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-12 text-center">
              <Shield className="mx-auto text-zinc-700 mb-4" size={64} />
              <h2 className="text-2xl font-semibold text-zinc-300 mb-2">
                Ready to Investigate
              </h2>
              <p className="text-zinc-500 max-w-md mx-auto">
                Enter a case description or query above to retrieve relevant documents,
                visualize connections, and get AI-powered insights.
              </p>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-12 border-t border-zinc-800 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm text-zinc-500">
            <p>Law Enforcement Intelligence System v1.0</p>
            <p>Secure • Explainable • Evidence-Based</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
