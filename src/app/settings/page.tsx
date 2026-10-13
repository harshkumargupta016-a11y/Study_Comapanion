'use client';

import React, { useState } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useMasteryStore } from '@/store/masteryStore';
import { useChatStore } from '@/store/chatStore';
import { Trash2, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const { setMasteryPoints } = useMasteryStore();
  const { clearChat } = useChatStore();
  const [cleared, setCleared] = useState(false);

  const handleResetData = () => {
    setMasteryPoints([]);
    clearChat();
    setCleared(true);
    setTimeout(() => setCleared(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
          Settings &amp; Preferences
        </h1>
        <p className="text-xs sm:text-sm text-mut mt-1">
          Configure interface themes, API modes, and local state persistence options.
        </p>
      </div>

      <div className="card-subtle rounded-2xl p-6 space-y-6 bg-card">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div>
            <h3 className="font-bold text-xs sm:text-sm text-ink">Interface Theme</h3>
            <p className="text-[11px] text-mut">Toggle between light slate and dark obsidian contrast modes</p>
          </div>
          <ThemeToggle />
        </div>

        <div className="flex items-center justify-between border-b border-line pb-4">
          <div>
            <h3 className="font-bold text-xs sm:text-sm text-ink">API Backend Connection Mode</h3>
            <p className="text-[11px] text-mut">NEXT_PUBLIC_USE_MOCK environment variable status</p>
          </div>
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-indigo/10 text-indigo border border-indigo/20">
            Mock Mode Active
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div>
            <h3 className="font-bold text-xs sm:text-sm text-coral">Reset Session &amp; Mastery State</h3>
            <p className="text-[11px] text-mut">Clears Zustand state stores and local storage cache</p>
          </div>
          <button
            onClick={handleResetData}
            className="px-3.5 py-2 rounded-lg bg-coral text-white font-semibold text-xs hover:bg-coral/90 transition-colors shadow-sm flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" /> Reset All Data
          </button>
        </div>

        {cleared && (
          <div className="p-3 bg-teal/10 border border-teal/20 rounded-xl text-teal text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> All local session and mastery data cleared successfully.
          </div>
        )}
      </div>
    </div>
  );
}
