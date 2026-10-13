'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getLearnerMastery, getLearnerMasteryHistory } from '@/lib/api';
import { MasteryPoint } from '@/lib/schemas';
import { useMasteryStore } from '@/store/masteryStore';
import { Award, Flame, Calendar, TrendingUp, ArrowRight, Brain, CheckCircle2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function MasteryDashboardPage() {
  const { masteryPoints: storePoints, currentStreak, recordActivity } = useMasteryStore();
  const [mastery, setMastery] = useState<MasteryPoint[]>([]);
  const [history, setHistory] = useState<Array<{ date: string; mastery: number }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    recordActivity();
    Promise.all([getLearnerMastery(), getLearnerMasteryHistory()])
      .then(([m, h]) => {
        // Prefer local stored points if initialized (via onboarding/quizzes)
        if (storePoints && storePoints.length > 0) {
          setMastery(storePoints);
        } else {
          setMastery(m);
        }
        setHistory(h);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, [storePoints, recordActivity]);

  const testedTopics = mastery.filter((m) => m.nObs > 0);
  const overallAvg = testedTopics.length
    ? Math.round((testedTopics.reduce((acc, curr) => acc + curr.pKnown, 0) / testedTopics.length) * 100)
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
            <div className="text-xl font-extrabold text-ink">
              {testedTopics.length > 0 ? `${overallAvg}%` : 'Not Evaluated'}
            </div>
            <div className="text-[10px] text-mut">
              {testedTopics.length} of {mastery.length} concepts tested
            </div>
          </div>
        </div>

        <div className="card-subtle rounded-2xl p-5 flex items-center gap-4 bg-card">
          <div className="w-10 h-10 rounded-xl bg-coral/10 flex items-center justify-center text-coral">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-mut uppercase tracking-wider">Study Streak</div>
            <div className="text-xl font-extrabold text-ink">{currentStreak} {currentStreak === 1 ? 'Day' : 'Days'}</div>
            <div className="text-[10px] text-mut">Consecutive daily activity</div>
          </div>
        </div>

        <div className="card-subtle rounded-2xl p-5 flex items-center gap-4 bg-card">
          <div className="w-10 h-10 rounded-xl bg-amber/10 flex items-center justify-center text-amber">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-mut uppercase tracking-wider">Due for Revision</div>
            <div className="text-xl font-extrabold text-ink">{weakTopics.length} Topics</div>
            <div className="text-[10px] text-mut">Concepts with P(L) &lt; 50%</div>
          </div>
        </div>
      </div>

      {/* Empty State Banner if no observations yet */}
      {testedTopics.length === 0 && (
        <div className="card-subtle rounded-2xl p-6 bg-gradient-to-r from-indigo-900/30 via-slate-900 to-violet-900/30 border border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
              <Brain className="w-4 h-4 text-indigo-400" /> Complete your initial Diagnostic Assessment
            </h3>
            <p className="text-xs text-slate-300">
              Your Bayesian Knowledge Trace (BKT) matrix requires initial observations to build your accurate mastery profile.
            </p>
          </div>
          <Link
            href="/onboarding"
            className="px-4 py-2.5 rounded-xl btn-indigo text-xs font-semibold shrink-0 flex items-center gap-1.5 shadow-md"
          >
            Start Onboarding <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Mastery Heatmap */}
      <div className="card-subtle rounded-2xl p-6 space-y-4 bg-card">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-ink">Concept Mastery Heatmap</h2>
          <span className="text-xs font-mono text-mut">BKT Model P(L)</span>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
          {mastery.map((mp) => {
            const pKnownPct = Math.round(mp.pKnown * 100);
            const isUntested = mp.nObs === 0;

            const colorClass = isUntested
              ? 'bg-slate-800/40 text-slate-300 border-slate-700/50'
              : pKnownPct >= 75
              ? 'bg-teal/10 text-teal border-teal/20'
              : pKnownPct >= 40
              ? 'bg-amber/10 text-amber border-amber/20'
              : 'bg-coral/10 text-coral border-coral/20';

            return (
              <div key={mp.conceptId} className={`p-3.5 rounded-xl border space-y-1 ${colorClass}`}>
                <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">{mp.conceptName}</div>
                <div className="text-lg font-bold">{isUntested ? 'Untested' : `${pKnownPct}%`}</div>
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
