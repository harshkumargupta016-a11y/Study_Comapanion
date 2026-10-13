'use client';

import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Sparkles } from 'lucide-react';

export default function SchedulePage() {
  const [examDate, setExamDate] = useState('2026-11-15');
  const [hoursPerDay, setHoursPerDay] = useState(2);

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      <div>
        <h1 className="font-head text-3xl font-bold text-deep dark:text-teal">
          Adaptive Study Schedule
        </h1>
        <p className="text-sm text-mut mt-1">
          Dynamic study calendar balancing exam deadlines with Ebbinghaus forgetting curve intervals.
        </p>
      </div>

      <div className="bg-bg border border-line rounded-3xl p-6 grid sm:grid-cols-2 gap-6 shadow-sm">
        <div>
          <label className="block text-xs font-bold text-mut uppercase mb-1">Target Exam Date</label>
          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            className="w-full p-3 rounded-xl border border-line bg-bg2 text-sm focus:outline-none focus:ring-2 focus:ring-teal"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-mut uppercase mb-1">Daily Dedicated Hours</label>
          <input
            type="number"
            min={1}
            max={8}
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(Number(e.target.value))}
            className="w-full p-3 rounded-xl border border-line bg-bg2 text-sm focus:outline-none focus:ring-2 focus:ring-teal"
          />
        </div>
      </div>

      {/* Weekly Review Plan */}
      <div className="bg-bg border border-line rounded-3xl p-6 space-y-4 shadow-sm">
        <h2 className="font-head text-xl font-bold flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-teal" /> Generated Weekly Review Calendar
        </h2>

        <div className="grid gap-3">
          {[
            { day: 'Monday', task: 'Deadlock Necessary Conditions & Banker Algorithm', duration: '1.5 hrs', priority: 'High (Weak Concept)' },
            { day: 'Tuesday', task: 'CPU Scheduling: Round Robin vs FCFS', duration: '1.0 hr', priority: 'Moderate' },
            { day: 'Wednesday', task: 'Virtual Memory & Page Fault Handling', duration: '2.0 hrs', priority: 'High (Forgetting Curve Due)' },
            { day: 'Thursday', task: 'Process Control Blocks & Context Switching', duration: '1.0 hr', priority: 'Low' },
            { day: 'Friday', task: 'Comprehensive Diagnostic Assessment', duration: '1.5 hrs', priority: 'High' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-bg2 border border-line flex items-center justify-between gap-4 text-xs font-semibold">
              <div>
                <span className="font-bold text-teal block text-sm">{item.day}</span>
                <span className="text-ink">{item.task}</span>
              </div>
              <div className="text-right">
                <span className="block font-bold text-deep dark:text-teal">{item.duration}</span>
                <span className="text-[10px] text-coral font-bold uppercase">{item.priority}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
