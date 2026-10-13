'use client';

import React, { useState, useEffect } from 'react';
import { getLearnerMastery, getLearnerMasteryHistory } from '@/lib/api';
import { MasteryPoint } from '@/lib/schemas';
import { Award, Flame, Calendar, TrendingUp } from 'lucide-react';
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
    <div className="max-w-6xl mx-auto space-y-6 py-4">
      {/* Header Stat Banner */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="card-subtle rounded-2xl p-5 flex items-center gap-4 bg-card">
          <div className="w-10 h-10 rounded-xl bg-indigo/10 flex items-center justify-center text-indigo">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-mut uppercase tracking-wider">Average Mastery</div>
            <div className="text-xl font-extrabold text-ink">{overallAvg}%</div>
          </div>
        </div>

        <div className="card-subtle rounded-2xl p-5 flex items-center gap-4 bg-card">
          <div className="w-10 h-10 rounded-xl bg-coral/10 flex items-center justify-center text-coral">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-mut uppercase tracking-wider">Study Streak</div>
            <div className="text-xl font-extrabold text-ink">7 Days</div>
          </div>
        </div>

        <div className="card-subtle rounded-2xl p-5 flex items-center gap-4 bg-card">
          <div className="w-10 h-10 rounded-xl bg-amber/10 flex items-center justify-center text-amber">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-mut uppercase tracking-wider">Due for Revision</div>
            <div className="text-xl font-extrabold text-ink">{weakTopics.length} Topics</div>
          </div>
        </div>
      </div>

      {/* Mastery Heatmap */}
      <div className="card-subtle rounded-2xl p-6 space-y-4 bg-card">
        <h2 className="text-base font-bold text-ink">Concept Mastery Heatmap</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
          {mastery.map((mp) => {
            const pKnownPct = Math.round(mp.pKnown * 100);
            const colorClass =
              pKnownPct >= 75
                ? 'bg-teal/10 text-teal border-teal/20'
                : pKnownPct >= 40
                ? 'bg-amber/10 text-amber border-amber/20'
                : 'bg-coral/10 text-coral border-coral/20';

            return (
              <div key={mp.conceptId} className={`p-3.5 rounded-xl border space-y-1 ${colorClass}`}>
                <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">{mp.conceptName}</div>
                <div className="text-lg font-bold">{pKnownPct}%</div>
                <div className="text-[10px] opacity-75">Observations: {mp.nObs}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mastery Over Time Chart */}
      <div className="card-subtle rounded-2xl p-6 space-y-4 bg-card">
        <h2 className="text-base font-bold text-ink flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-indigo" /> Mastery Progress History
        </h2>
        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" />
              <XAxis dataKey="date" stroke="var(--mut)" fontSize={11} />
              <YAxis stroke="var(--mut)" fontSize={11} domain={[0, 1]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  borderColor: 'var(--line)',
                  borderRadius: '0.75rem',
                  fontSize: '12px',
                }}
              />
              <Line type="monotone" dataKey="mastery" stroke="var(--indigo)" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
