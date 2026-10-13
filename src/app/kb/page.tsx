'use client';

import React, { useState, useEffect } from 'react';
import { getKnowledgeGraph, getLearnerMastery } from '@/lib/api';
import { ConceptNode, MasteryPoint } from '@/lib/schemas';
import { BookOpen, CheckCircle2, ChevronRight, X, ExternalLink } from 'lucide-react';

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
    if (!m || m.nObs === 0) return 'bg-gray-200 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-200';
    if (m.pKnown >= 0.75) return 'bg-teal/20 text-teal border-teal dark:bg-teal/30';
    if (m.pKnown >= 0.4) return 'bg-amber/20 text-amber-900 border-amber dark:text-amber dark:bg-amber/30';
    return 'bg-coral/20 text-coral border-coral dark:bg-coral/30';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 py-6">
      <div>
        <h1 className="font-head text-3xl font-bold text-deep dark:text-teal">
          Prerequisite Knowledge Map
        </h1>
        <p className="text-sm text-mut mt-1">
          Interactive concept graph colored by Bayesian Knowledge Tracing (BKT) mastery probabilities.
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 p-4 rounded-2xl bg-bg2 border border-line text-xs font-bold">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-teal" /> High Mastery (&ge;75%)</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber" /> Moderate Mastery (40-74%)</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-coral" /> Needs Practice (&lt;40%)</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-gray-400" /> Untested</span>
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
              className={`p-5 rounded-2xl border-2 transition cursor-pointer space-y-3 ${getMasteryColor(
                node.id
              )} hover:scale-[1.02]`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-wider">Concept</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-bg/80">
                  {m && m.nObs > 0 ? `${pKnownPct}%` : 'Untested'}
                </span>
              </div>
              <h3 className="font-head text-lg font-bold">{node.name}</h3>
              <p className="text-xs line-clamp-2 opacity-90">{node.description}</p>
              {node.prerequisites.length > 0 && (
                <div className="text-[10px] font-semibold opacity-75">
                  Requires: {node.prerequisites.join(', ')}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Side Drawer */}
      {selectedNode && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="w-full max-w-md bg-bg h-full p-6 space-y-6 overflow-y-auto shadow-2xl border-l border-line">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <h2 className="font-head text-xl font-bold">{selectedNode.name}</h2>
              <button
                onClick={() => setSelectedNode(null)}
                className="p-1 rounded-lg hover:bg-bg2 text-mut"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-mut uppercase">Description</h4>
                <p className="text-sm mt-1">{selectedNode.description}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-mut uppercase mb-2">Grounding Source Units</h4>
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-bg2 border border-line text-xs space-y-1">
                    <div className="font-bold flex items-center justify-between">
                      <span>Lecture 7 · Timestamp 14:32</span>
                      <ExternalLink className="w-3.5 h-3.5 text-coral" />
                    </div>
                    <p className="text-mut italic">"Deadlock requires four necessary conditions..."</p>
                  </div>
                  <div className="p-3 rounded-xl bg-bg2 border border-line text-xs space-y-1">
                    <div className="font-bold flex items-center justify-between">
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
