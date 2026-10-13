'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Info } from 'lucide-react';

const RAGAS_DATA = [
  { metric: 'Faithfulness', score: 0.96 },
  { metric: 'Answer Relevancy', score: 0.92 },
  { metric: 'Context Precision', score: 0.94 },
  { metric: 'Context Recall', score: 0.89 },
];

const SIMULATED_DATA = [
  { session: 'Session 1', adaptiveGain: 0.35, baselineGain: 0.20 },
  { session: 'Session 2', adaptiveGain: 0.58, baselineGain: 0.32 },
  { session: 'Session 3', adaptiveGain: 0.76, baselineGain: 0.45 },
  { session: 'Session 4', adaptiveGain: 0.89, baselineGain: 0.54 },
];

export default function EvalPage() {
  const [tab, setTab] = useState<'ragas' | 'retrieval' | 'simulation'>('ragas');

  return (
    <div className="max-w-5xl mx-auto space-y-6 py-4">
      {/* Illustrative Banner */}
      <div className="bg-amber/10 border border-amber/20 rounded-xl p-3.5 text-xs font-semibold text-amber flex items-center gap-2">
        <Info className="w-4 h-4 text-amber shrink-0" />
        <span>Illustrative Benchmark Evaluation Data for IIT Mandi Multimodal Hackathon Track D Submission</span>
      </div>

      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
          System Evaluation &amp; Benchmarks
        </h1>
        <p className="text-xs sm:text-sm text-mut mt-1">
          RAGAS evaluation metrics, source retrieval accuracy, and simulated student mastery gain comparisons.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-line pb-2">
        {(['ragas', 'retrieval', 'simulation'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
              tab === t ? 'btn-indigo shadow-sm' : 'bg-bg2 text-mut hover:text-ink'
            }`}
          >
            {t === 'ragas' ? 'RAGAS Metrics' : t === 'retrieval' ? 'Retrieval & Refusal' : 'Simulated Students'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === 'ragas' && (
        <div className="card-subtle rounded-2xl p-6 space-y-4 bg-card">
          <h2 className="text-base font-bold text-ink">RAGAS Hallucination &amp; Grounding Scores</h2>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={RAGAS_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" />
                <XAxis dataKey="metric" stroke="var(--mut)" fontSize={11} />
                <YAxis domain={[0, 1]} stroke="var(--mut)" fontSize={11} />
                <Tooltip />
                <Bar dataKey="score" fill="var(--indigo)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {tab === 'retrieval' && (
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="card-subtle rounded-xl p-4 space-y-1 bg-card">
            <div className="text-[10px] font-bold text-mut uppercase tracking-wider">Recall@k Retrieval</div>
            <div className="text-2xl font-extrabold text-indigo">94.2%</div>
            <p className="text-[10px] text-mut">Top-5 relevant chunk retrieval accuracy</p>
          </div>

          <div className="card-subtle rounded-xl p-4 space-y-1 bg-card">
            <div className="text-[10px] font-bold text-mut uppercase tracking-wider">Citation Accuracy</div>
            <div className="text-2xl font-extrabold text-teal">98.5%</div>
            <p className="text-[10px] text-mut">Verified timestamp and page match rate</p>
          </div>

          <div className="card-subtle rounded-xl p-4 space-y-1 bg-card">
            <div className="text-[10px] font-bold text-mut uppercase tracking-wider">Refusal Precision</div>
            <div className="text-2xl font-extrabold text-coral">100.0%</div>
            <p className="text-[10px] text-mut">Zero false answers on out-of-domain queries</p>
          </div>
        </div>
      )}

      {tab === 'simulation' && (
        <div className="card-subtle rounded-2xl p-6 space-y-4 bg-card">
          <h2 className="text-base font-bold text-ink">Mastery Gain: BKT Adaptive Engine vs Baseline Static</h2>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SIMULATED_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" />
                <XAxis dataKey="session" stroke="var(--mut)" fontSize={11} />
                <YAxis domain={[0, 1]} stroke="var(--mut)" fontSize={11} />
                <Tooltip />
                <Bar dataKey="adaptiveGain" name="Adaptive (BKT)" fill="var(--indigo)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="baselineGain" name="Baseline Static" fill="var(--coral)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
