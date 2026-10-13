'use client';

import React, { useState, useEffect } from 'react';
import { getKnowledgeGraph, getLearnerMastery } from '@/lib/api';
import { ConceptNode, MasteryPoint } from '@/lib/schemas';
import { ExternalLink, X, BookOpen } from 'lucide-react';

export default function KnowledgeMapPage() {
  const [concepts, setConcepts] = useState<ConceptNode[]>([]);
  const [mastery, setMastery] = useState<MasteryPoint[]>([]);
  const [selectedNode, setSelectedNode] = useState<ConceptNode | null>(null);

  useEffect(() => {
    Promise.all([getKnowledgeGraph(), getLearnerMastery()]).then(([c, m]) => {
      setConcepts(c);
      setMastery(m);
    });
  }, []);

  const getMasteryColor = (conceptId: string) => {
    const m = mastery.find((item) => item.conceptId === conceptId);
    if (!m || m.nObs === 0) return 'bg-bg2 text-mut border-line';
    if (m.pKnown >= 0.75) return 'bg-teal/10 text-teal border-teal/30';
    if (m.pKnown >= 0.4) return 'bg-amber/10 text-amber border-amber/30';
    return 'bg-coral/10 text-coral border-coral/30';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 py-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
          Prerequisite Knowledge Map
        </h1>
        <p className="text-xs sm:text-sm text-mut mt-1">
          Interactive concept graph colored by Bayesian Knowledge Tracing (BKT) probability matrix P(L).
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 p-3.5 rounded-xl bg-card border border-line text-xs font-medium text-mut">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-teal" /> High Mastery (&ge;75%)</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber" /> Moderate Mastery (40-74%)</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-coral" /> Needs Practice (&lt;40%)</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-400" /> Untested</span>
      </div>

      {/* Concept Grid Map */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {concepts.map((node) => {
          const m = mastery.find((item) => item.conceptId === node.id);
          const pKnownPct = m ? Math.round(m.pKnown * 100) : 0;

          return (
            <div
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 card-subtle ${getMasteryColor(
                node.id
              )} hover:scale-[1.01]`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono font-semibold opacity-80">Concept</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-card/80 border border-line">
                  {m && m.nObs > 0 ? `${pKnownPct}%` : 'Untested'}
                </span>
              </div>
              <h3 className="font-bold text-sm text-ink">{node.name}</h3>
              <p className="text-xs line-clamp-2 text-mut">{node.description}</p>
              {node.prerequisites.length > 0 && (
                <div className="text-[10px] font-semibold text-mut pt-1">
                  Requires: {node.prerequisites.join(', ')}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Side Drawer */}
      {selectedNode && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end backdrop-blur-xs">
          <div className="w-full max-w-md bg-card h-full p-6 space-y-6 overflow-y-auto shadow-2xl border-l border-line">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <h2 className="font-bold text-base text-ink">{selectedNode.name}</h2>
              <button
                onClick={() => setSelectedNode(null)}
                className="p-1 rounded-md hover:bg-bg2 text-mut"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h4 className="text-[10px] font-bold text-mut uppercase tracking-wider mb-1">Description</h4>
                <p className="text-ink leading-relaxed">{selectedNode.description}</p>
              </div>

              <div>
                <h4 className="text-[10px] font-bold text-mut uppercase tracking-wider mb-2">Grounding Source Units</h4>
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-bg2 border border-line space-y-1">
                    <div className="font-semibold flex items-center justify-between text-ink">
                      <span>Lecture 7 · Timestamp 14:32</span>
                      <ExternalLink className="w-3.5 h-3.5 text-coral" />
                    </div>
                    <p className="text-mut italic">"Deadlock requires four necessary conditions..."</p>
                  </div>
                  <div className="p-3 rounded-lg bg-bg2 border border-line space-y-1">
                    <div className="font-semibold flex items-center justify-between text-ink">
                      <span>Textbook Page 231</span>
                      <ExternalLink className="w-3.5 h-3.5 text-teal" />
                    </div>
                    <p className="text-mut italic">"Deadlock can arise only if mutual exclusion..."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
