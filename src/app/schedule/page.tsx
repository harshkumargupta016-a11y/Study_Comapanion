'use client';

import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';

export default function SchedulePage() {
  const [examDate, setExamDate] = useState('2026-11-15');
  const [hoursPerDay, setHoursPerDay] = useState(2);

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
          Adaptive Study Schedule
        </h1>
        <p className="text-xs sm:text-sm text-mut mt-1">
          Dynamic study calendar balancing target exam dates with Ebbinghaus forgetting curve intervals.
        </p>
      </div>

      <div className="card-subtle rounded-2xl p-5 grid sm:grid-cols-2 gap-4 bg-card">
        <div>
          <label className="block text-[10px] font-bold text-mut uppercase tracking-wider mb-1">Target Exam Date</label>
          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            className="w-full p-2.5 rounded-lg border border-line bg-bg2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo/20 text-ink"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-mut uppercase tracking-wider mb-1">Daily Dedicated Hours</label>
          <input
            type="number"
            min={1}
            max={8}
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(Number(e.target.value))}
            className="w-full p-2.5 rounded-lg border border-line bg-bg2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo/20 text-ink"
          />
        </div>
      </div>

      {/* Weekly Review Plan */}
      <div className="card-subtle rounded-2xl p-6 space-y-4 bg-card">
        <h2 className="text-base font-bold text-ink flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-indigo" /> Generated Weekly Review Calendar
        </h2>

        <div className="grid gap-2.5">
          {[
            { day: 'Monday', task: 'Deadlock Necessary Conditions & Banker Algorithm', duration: '1.5 hrs', priority: 'High (Weak Concept)' },
            { day: 'Tuesday', task: 'CPU Scheduling: Round Robin vs FCFS', duration: '1.0 hr', priority: 'Moderate' },
            { day: 'Wednesday', task: 'Virtual Memory & Page Fault Handling', duration: '2.0 hrs', priority: 'High (Forgetting Curve Due)' },
            { day: 'Thursday', task: 'Process Control Blocks & Context Switching', duration: '1.0 hr', priority: 'Low' },
            { day: 'Friday', task: 'Comprehensive Diagnostic Assessment', duration: '1.5 hrs', priority: 'High' },
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-bg2 border border-line flex items-center justify-between gap-4 text-xs font-medium">
              <div>
                <span className="font-bold text-indigo block text-xs">{item.day}</span>
                <span className="text-ink">{item.task}</span>
              </div>
              <div className="text-right shrink-0">
                <span className="block font-bold text-ink">{item.duration}</span>
                <span className="text-[10px] text-coral font-bold uppercase">{item.priority}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
