'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { GraphNode, GraphLink } from '@/lib/types';

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

interface KnowledgeGraphProps {
  nodes: GraphNode[];
  links: GraphLink[];
}

export default function KnowledgeGraph({ nodes, links }: KnowledgeGraphProps) {
  const graphRef = useRef<any>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateDimensions = () => {
      const container = document.getElementById('graph-container');
      if (container) {
        setDimensions({
          width: container.clientWidth,
          height: Math.max(600, window.innerHeight - 300),
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleNodeClick = (node: any) => {
    setSelectedNode(node as GraphNode);
    if (graphRef.current) {
      graphRef.current.centerAt(node.x, node.y, 1000);
      graphRef.current.zoom(2, 1000);
    }
  };

  const graphData = {
    nodes: nodes.map(node => ({
      ...node,
      color: node.color || '#60a5fa',
    })),
    links: links.map(link => ({
      ...link,
      color: '#52525b',
    })),
  };

  const legend = [
    { type: 'Person', color: '#ef4444' },
    { type: 'Location', color: '#10b981' },
    { type: 'Phone', color: '#f59e0b' },
    { type: 'Document', color: '#8b5cf6' },
    { type: 'Event', color: '#ec4899' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-100">Knowledge Graph</h2>
        <div className="flex items-center space-x-4">
          {legend.map((item) => (
            <div key={item.type} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-zinc-400">{item.type}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
        <div id="graph-container" className="relative">
          <ForceGraph2D
            ref={graphRef}
            graphData={graphData}
            width={dimensions.width}
            height={dimensions.height}
            backgroundColor="#18181b"
            nodeLabel="label"
            nodeColor="color"
            nodeRelSize={8}
            nodeCanvasObject={(node: any, ctx, globalScale) => {
              const label = node.label;
              const fontSize = 12 / globalScale;
              ctx.font = `${fontSize}px Sans-Serif`;
              const textWidth = ctx.measureText(label).width;
              const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.4);

              ctx.fillStyle = node.color;
              ctx.beginPath();
              ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI, false);
              ctx.fill();

              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillStyle = '#e4e4e7';
              ctx.fillText(label, node.x, node.y + 12);
            }}
            linkLabel="label"
            linkColor={() => '#52525b'}
            linkWidth={2}
            linkDirectionalParticles={2}
            linkDirectionalParticleWidth={2}
            onNodeClick={handleNodeClick}
            cooldownTicks={100}
            d3VelocityDecay={0.3}
          />
        </div>
      </div>

      {selectedNode && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-zinc-300 mb-2">Selected Node</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-zinc-500">Type:</span>
              <span className="px-2 py-0.5 bg-zinc-800 text-zinc-300 rounded text-xs">
                {selectedNode.type}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-zinc-500">Label:</span>
              <span className="text-sm text-zinc-100">{selectedNode.label}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-zinc-500">Connections:</span>
              <span className="text-sm text-zinc-100">
                {links.filter(l => l.source === selectedNode.id || l.target === selectedNode.id).length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
