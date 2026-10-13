'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Info, Award, ShieldCheck, Sparkles } from 'lucide-react';

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
    <div className="max-w-5xl mx-auto space-y-8 py-6">
      {/* Illustrative Banner */}
      <div className="bg-amber/20 border border-amber/40 rounded-2xl p-4 text-xs font-bold text-amber-900 dark:text-amber flex items-center gap-2">
        <Info className="w-4 h-4 text-amber shrink-0" />
        <span>Illustrative Evaluation Benchmark Data for IIT Mandi Multimodal Hackathon 2026 Submission</span>
      </div>

      <div>
        <h1 className="font-head text-3xl font-bold text-deep dark:text-teal">
          System Evaluation &amp; Benchmarks
        </h1>
        <p className="text-sm text-mut mt-1">
          RAGAS evaluation metrics, source retrieval accuracy, and simulated student mastery gain comparisons.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-line pb-2">
        {(['ragas', 'retrieval', 'simulation'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition ${
              tab === t ? 'bg-teal text-white' : 'bg-bg2 text-mut hover:bg-line'
            }`}
          >
            {t === 'ragas' ? 'RAGAS Metrics' : t === 'retrieval' ? 'Retrieval & Refusal' : 'Simulated Students'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === 'ragas' && (
        <div className="bg-bg border border-line rounded-3xl p-6 space-y-4 shadow-sm">
          <h2 className="font-head text-xl font-bold">RAGAS Hallucination &amp; Grounding Scores</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={RAGAS_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" />
                <XAxis dataKey="metric" stroke="var(--mut)" fontSize={12} />
                <YAxis domain={[0, 1]} stroke="var(--mut)" fontSize={12} />
                <Tooltip />
                <Bar dataKey="score" fill="var(--teal)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {tab === 'retrieval' && (
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-bg border border-line rounded-2xl p-5 space-y-1">
            <div className="text-xs font-bold text-mut uppercase">Recall@k Retrieval</div>
            <div className="text-3xl font-head font-bold text-teal">94.2%</div>
            <p className="text-[10px] text-mut">Top-5 relevant chunk retrieval accuracy</p>
          </div>

          <div className="bg-bg border border-line rounded-2xl p-5 space-y-1">
            <div className="text-xs font-bold text-mut uppercase">Citation Accuracy</div>
            <div className="text-3xl font-head font-bold text-teal">98.5%</div>
            <p className="text-[10px] text-mut">Verified timestamp and page match rate</p>
          </div>

          <div className="bg-bg border border-line rounded-2xl p-5 space-y-1">
            <div className="text-xs font-bold text-mut uppercase">Refusal Precision</div>
            <div className="text-3xl font-head font-bold text-coral">100.0%</div>
            <p className="text-[10px] text-mut">Zero false answers on out-of-domain queries</p>
          </div>
        </div>
      )}

      {tab === 'simulation' && (
        <div className="bg-bg border border-line rounded-3xl p-6 space-y-4 shadow-sm">
          <h2 className="font-head text-xl font-bold">Mastery Gain: BKT Adaptive Engine vs Baseline Static</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SIMULATED_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" />
                <XAxis dataKey="session" stroke="var(--mut)" fontSize={12} />
                <YAxis domain={[0, 1]} stroke="var(--mut)" fontSize={12} />
                <Tooltip />
                <Bar dataKey="adaptiveGain" name="Adaptive (BKT)" fill="var(--teal)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="baselineGain" name="Baseline Static" fill="var(--coral)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
