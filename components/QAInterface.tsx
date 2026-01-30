'use client';

import { useState } from 'react';
import { RAGResponse } from '@/lib/types';
import { MessageSquare, FileText, CheckCircle } from 'lucide-react';

interface QAInterfaceProps {
  onAskQuestion: (question: string) => RAGResponse | null;
}

export default function QAInterface({ onAskQuestion }: QAInterfaceProps) {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState<RAGResponse | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      const result = onAskQuestion(question);
      setResponse(result);
    }
  };

  const exampleQuestions = [
    'Where was the suspect last seen?',
    'What evidence links Rahul Kumar to the incident?',
    'Provide timeline of events',
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-100">Investigator Q&A</h2>
        <span className="text-xs text-zinc-500">RAG-Powered Intelligence</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about the case..."
            rows={3}
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <MessageSquare size={18} />
          <span>Ask Question</span>
        </button>
      </form>

      <div className="space-y-2">
        <p className="text-xs text-zinc-500 uppercase tracking-wider">Example Questions</p>
        <div className="flex flex-wrap gap-2">
          {exampleQuestions.map((example, idx) => (
            <button
              key={idx}
              onClick={() => setQuestion(example)}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm rounded-md transition-colors border border-zinc-700"
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      {response && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="text-white" size={18} />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-zinc-300 mb-2">Answer</h3>
              <p className="text-sm text-zinc-100 leading-relaxed">{response.answer}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 pt-3 border-t border-zinc-800">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-zinc-500">Confidence:</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${response.confidence * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-green-400">
                  {Math.round(response.confidence * 100)}%
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-800">
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
              Source Citations
            </h4>
            <div className="space-y-2">
              {response.sources.map((source, idx) => (
                <div
                  key={idx}
                  className="bg-zinc-950/50 border border-zinc-800 rounded p-3"
                >
                  <div className="flex items-start space-x-2 mb-2">
                    <FileText className="text-zinc-500 mt-0.5" size={16} />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs font-medium text-zinc-300">
                          {source.documentId}
                        </span>
                        <span className="px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded text-xs">
                          {source.documentType}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 italic">{source.excerpt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
