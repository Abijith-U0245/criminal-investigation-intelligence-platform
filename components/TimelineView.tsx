'use client';

import { TimelineEvent } from '@/lib/types';
import { Clock, MapPin, Users, FileText } from 'lucide-react';

interface TimelineViewProps {
  events: TimelineEvent[];
}

export default function TimelineView({ events }: TimelineViewProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-100">Timeline Reconstruction</h2>
        <span className="text-sm text-zinc-500">{events.length} events</span>
      </div>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-zinc-800" />

        <div className="space-y-6">
          {events.map((event, idx) => (
            <div key={event.id} className="relative flex items-start space-x-6">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full border-4 border-zinc-950 z-10">
                  <Clock className="text-white" size={24} />
                </div>
                <div className="mt-2 text-xs text-zinc-500 text-center whitespace-nowrap">
                  {new Date(event.time).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>

              <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg p-4 mt-2">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-medium text-zinc-100 flex-1">{event.description}</h3>
                  <span className="text-xs text-zinc-500 ml-4">
                    {new Date(event.time).toLocaleDateString()}
                  </span>
                </div>

                <div className="space-y-2">
                  {event.location && (
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="text-green-500" size={16} />
                      <span className="text-zinc-400">{event.location}</span>
                    </div>
                  )}

                  {event.participants && event.participants.length > 0 && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Users className="text-blue-500" size={16} />
                      <div className="flex flex-wrap gap-1">
                        {event.participants.map((participant, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-zinc-800 text-zinc-300 rounded text-xs"
                          >
                            {participant}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {event.linkedDocuments.length > 0 && (
                    <div className="flex items-center space-x-2 text-sm">
                      <FileText className="text-purple-500" size={16} />
                      <div className="flex flex-wrap gap-1">
                        {event.linkedDocuments.map((docId, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-purple-900/30 text-purple-400 rounded text-xs border border-purple-800"
                          >
                            {docId}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
