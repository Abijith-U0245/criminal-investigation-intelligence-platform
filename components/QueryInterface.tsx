'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

interface QueryInterfaceProps {
  onSearch: (query: string) => void;
}

export default function QueryInterface({ onSearch }: QueryInterfaceProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const exampleQueries = [
    'Find documents related to Rahul Kumar near MG Road at night',
    'Where was the suspect last seen?',
    'What evidence links Rahul Kumar to the incident?',
    'Show timeline of events on January 15',
  ];

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter crime description or investigative question..."
          className="w-full px-4 py-3 pl-12 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
        >
          Search
        </button>
      </form>

      <div className="space-y-2">
        <p className="text-xs text-zinc-500 uppercase tracking-wider">Example Queries</p>
        <div className="flex flex-wrap gap-2">
          {exampleQueries.map((example, idx) => (
            <button
              key={idx}
              onClick={() => setQuery(example)}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm rounded-md transition-colors border border-zinc-700"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
