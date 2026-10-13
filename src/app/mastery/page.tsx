'use client';

import React, { useState, useEffect } from 'react';
import { getLearnerMastery, getLearnerMasteryHistory } from '@/lib/api';
import { MasteryPoint } from '@/lib/schemas';
import { Award, Flame, Calendar, ArrowRight, TrendingUp, AlertCircle, Sparkles } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function MasteryDashboardPage() {
  const [mastery, setMastery] = useState<MasteryPoint[]>([]);
  const [history, setHistory] = useState<Array<{ date: string; mastery: number }>>([]);

  useEffect(() => {
    Promise.all([getLearnerMastery(), getLearnerMasteryHistory()]).then(([m, h]) => {
      setMastery(m);
      setHistory(h);
    });
  }, []);

  const overallAvg = mastery.length
    ? Math.round((mastery.reduce((acc, curr) => acc + curr.pKnown, 0) / mastery.length) * 100)
    : 0;

  const weakTopics = mastery.filter((m) => m.pKnown < 0.5);

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-6">
      {/* Header Stat Banner */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-bg border border-line rounded-3xl p-6 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-teal/10 flex items-center justify-center text-teal">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-mut uppercase">Average Mastery</div>
            <div className="text-2xl font-head font-bold text-teal">{overallAvg}%</div>
          </div>
        </div>

        <div className="bg-bg border border-line rounded-3xl p-6 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-coral/10 flex items-center justify-center text-coral">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-mut uppercase">Study Streak</div>
            <div className="text-2xl font-head font-bold text-coral">7 Days</div>
          </div>
        </div>

        <div className="bg-bg border border-line rounded-3xl p-6 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-amber/10 flex items-center justify-center text-amber">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-mut uppercase">Due for Revision</div>
            <div className="text-2xl font-head font-bold text-amber">{weakTopics.length} Topics</div>
          </div>
        </div>
      </div>

      {/* Mastery Heatmap */}
      <div className="bg-bg border border-line rounded-3xl p-6 space-y-4 shadow-sm">
        <h2 className="font-head text-xl font-bold">Concept Mastery Heatmap</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {mastery.map((mp) => {
            const pKnownPct = Math.round(mp.pKnown * 100);
            const colorClass =
              pKnownPct >= 75
                ? 'bg-teal/20 text-teal border-teal'
                : pKnownPct >= 40
                ? 'bg-amber/20 text-amber-900 border-amber dark:text-amber'
                : 'bg-coral/20 text-coral border-coral';

            return (
              <div key={mp.conceptId} className={`p-4 rounded-2xl border-2 space-y-2 ${colorClass}`}>
                <div className="text-xs font-bold uppercase">{mp.conceptName}</div>
                <div className="text-2xl font-head font-bold">{pKnownPct}%</div>
                <div className="text-[10px] opacity-80">Observations: {mp.nObs}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mastery Over Time Chart */}
      <div className="bg-bg border border-line rounded-3xl p-6 space-y-4 shadow-sm">
        <h2 className="font-head text-xl font-bold flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-teal" /> Mastery Progress History
        </h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" />
              <XAxis dataKey="date" stroke="var(--mut)" fontSize={12} />
              <YAxis stroke="var(--mut)" fontSize={12} domain={[0, 1]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--bg2)',
                  borderColor: 'var(--line)',
                  borderRadius: '1rem',
                  fontSize: '12px',
                }}
              />
              <Line type="monotone" dataKey="mastery" stroke="var(--teal)" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
