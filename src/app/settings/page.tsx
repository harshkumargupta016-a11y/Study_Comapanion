'use client';

import React, { useState } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useMasteryStore } from '@/store/masteryStore';
import { useChatStore } from '@/store/chatStore';
import { Settings as SettingsIcon, Trash2, CheckCircle2 } from 'lucide-react';

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
    <div className="max-w-3xl mx-auto space-y-8 py-6">
      <div>
        <h1 className="font-head text-3xl font-bold text-deep dark:text-teal">
          Settings &amp; Preferences
        </h1>
        <p className="text-sm text-mut mt-1">
          Configure application theme, API modes, and local state reset options.
        </p>
      </div>

      <div className="bg-bg border border-line rounded-3xl p-6 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div>
            <h3 className="font-bold text-base">Interface Appearance Theme</h3>
            <p className="text-xs text-mut">Toggle between light and dark contrast modes</p>
          </div>
          <ThemeToggle />
        </div>

        <div className="flex items-center justify-between border-b border-line pb-4">
          <div>
            <h3 className="font-bold text-base">Mock API Backend Switch</h3>
            <p className="text-xs text-mut">NEXT_PUBLIC_USE_MOCK environment variable status</p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal/10 text-teal">
            Mock Mode Active
          </span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div>
            <h3 className="font-bold text-base text-coral">Reset Local Session &amp; Mastery</h3>
            <p className="text-xs text-mut">Clears Zustand state stores and local storage cache</p>
          </div>
          <button
            onClick={handleResetData}
            className="px-4 py-2 rounded-xl bg-coral text-white font-bold text-xs hover:bg-coral/90 transition shadow-sm flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" /> Reset All Data
          </button>
        </div>

        {cleared && (
          <div className="p-3 bg-teal/10 border border-teal/30 rounded-xl text-teal text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> All local session and mastery data cleared successfully.
          </div>
        )}
      </div>
    </div>
  );
}
