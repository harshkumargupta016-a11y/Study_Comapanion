'use client';

import React, { useState } from 'react';
import { useChatStore } from '@/store/chatStore';
import { useMasteryStore } from '@/store/masteryStore';
import { sendChatMessage } from '@/lib/api';
import { SourceViewer } from '@/components/SourceViewer';
import { Citation, Message } from '@/lib/schemas';
import {
  Send,
  Mic,
  Languages,
  Brain,
  HelpCircle,
  Sparkles,
  AlertTriangle,
  Info,
  CheckCircle2,
} from 'lucide-react';

export default function ChatPage() {
  const { messages, addMessage, activeCitation, setActiveCitation } = useChatStore();
  const { recordObservation } = useMasteryStore();

  const [input, setInput] = useState('');
  const [socraticMode, setSocraticMode] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [showOutsideKnowledge, setShowOutsideKnowledge] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSend = async (overrideText?: string) => {
    const query = overrideText || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      citations: [],
      grounded: true,
      timestamp: new Date().toISOString(),
    };
    addMessage(userMsg);
    if (!overrideText) setInput('');

    // Fetch response
    const assistantMsg = await sendChatMessage(query);

    // Simulated token-by-token streaming effect
    let currentContent = '';
    const fullText = assistantMsg.content;
    const tokens = fullText.split(' ');

    const streamingMsg: Message = {
      ...assistantMsg,
      content: '',
    };
    addMessage(streamingMsg);

    for (let i = 0; i < tokens.length; i++) {
      await new Promise((res) => setTimeout(res, 30));
      currentContent += (i === 0 ? '' : ' ') + tokens[i];
      useChatStore.setState((state) => ({
        messages: state.messages.map((m) =>
          m.id === assistantMsg.id ? { ...m, content: currentContent } : m
        ),
      }));
    }

    // Nudge BKT mastery on successful chat interaction
    if (assistantMsg.grounded) {
      recordObservation('c-deadlock', true);
      showToast('Mastery updated for Deadlock concept (+5%)');
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-teal text-white font-bold px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-2 text-xs">
          <CheckCircle2 className="w-4 h-4" /> {toastMessage}
        </div>
      )}

      {/* LEFT PANE: Chat */}
      <div className="flex-1 flex flex-col bg-bg rounded-3xl border border-line overflow-hidden shadow-sm">
        {/* Chat Control Bar */}
        <div className="p-4 bg-bg2 border-b border-line flex flex-wrap items-center justify-between gap-3 text-xs font-bold">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSocraticMode(!socraticMode)}
              className={`px-3 py-1.5 rounded-full border transition flex items-center gap-1.5 ${
                socraticMode
                  ? 'bg-amber text-ink border-amber'
                  : 'bg-bg border-line text-mut hover:bg-line'
              }`}
            >
              <Brain className="w-3.5 h-3.5" /> Socratic Mode: {socraticMode ? 'ON' : 'OFF'}
            </button>

            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="px-3 py-1.5 rounded-full bg-bg border border-line text-mut hover:bg-line transition flex items-center gap-1.5"
            >
              <Languages className="w-3.5 h-3.5" /> {language === 'en' ? 'English' : 'Hindi (हिंदी)'}
            </button>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-mut">
            <input
              type="checkbox"
              checked={showOutsideKnowledge}
              onChange={(e) => setShowOutsideKnowledge(e.target.checked)}
              className="rounded accent-teal"
            />
            Show Outside Knowledge
          </label>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12 space-y-4 max-w-sm mx-auto">
              <Sparkles className="w-10 h-10 text-teal mx-auto" />
              <h3 className="font-head text-lg font-bold">Source-Grounded AI Tutor</h3>
              <p className="text-xs text-mut">
                Ask any question about your course materials. Try these quick prompts:
              </p>
              <div className="space-y-2 text-left">
                <button
                  onClick={() => handleSend("What are the four conditions for deadlock?")}
                  className="w-full p-3 rounded-2xl bg-bg2 border border-line text-xs font-semibold hover:border-teal transition text-left"
                >
                  "What are the four conditions for deadlock?"
                </button>
                <button
                  onClick={() => handleSend("How does Round Robin differ from FCFS?")}
                  className="w-full p-3 rounded-2xl bg-bg2 border border-line text-xs font-semibold hover:border-teal transition text-left"
                >
                  "How does Round Robin differ from FCFS?"
                </button>
                <button
                  onClick={() => handleSend("Who won the 2022 football World Cup?")}
                  className="w-full p-3 rounded-2xl bg-bg2 border border-line text-xs font-semibold hover:border-amber transition text-left text-coral"
                >
                  "Who won the 2022 football World Cup?" (Off-material refusal demo)
                </button>
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-xl rounded-2xl p-4 text-sm space-y-3 ${
                  msg.role === 'user'
                    ? 'bg-teal text-white rounded-br-none'
                    : 'bg-bg2 border border-line rounded-bl-none text-ink'
                }`}
              >
                {!msg.grounded && msg.role === 'assistant' && (
                  <div className="p-3 bg-amber/20 border border-amber/40 rounded-xl text-xs text-amber-900 dark:text-amber space-y-1">
                    <div className="font-bold flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4 text-amber" /> Out-of-Domain Refusal
                    </div>
                    <p>{msg.content}</p>
                  </div>
                )}

                {msg.grounded && <p className="leading-relaxed">{msg.content}</p>}

                {/* Citation Chips */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-line/50">
                    {msg.citations.map((c, i) => {
                      const isVideo = c.sourceType === 'video';
                      const isPdf = c.sourceType === 'pdf';
                      const chipColor = isVideo
                        ? 'bg-coral text-white'
                        : isPdf
                        ? 'bg-teal text-white'
                        : 'bg-amber text-ink';

                      return (
                        <button
                          key={i}
                          onClick={() => setActiveCitation(c)}
                          className={`text-xs font-bold px-2.5 py-1 rounded-full transition shadow-sm hover:opacity-90 ${chipColor}`}
                        >
                          {c.label}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Outside Knowledge Block */}
                {showOutsideKnowledge && msg.outsideKnowledge && (
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-xs space-y-1">
                    <span className="font-bold text-mut flex items-center gap-1">
                      <Info className="w-3.5 h-3.5" /> Separated Outside Knowledge
                    </span>
                    <p className="text-mut">{msg.outsideKnowledge}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-bg2 border-t border-line flex items-center gap-2">
          <button className="p-3 rounded-full bg-bg border border-line text-mut hover:text-ink transition">
            <Mic className="w-4 h-4" />
          </button>
          <input
            type="text"
            placeholder={
              language === 'hi' ? 'पाठ्यक्रम सामग्री से प्रश्न पूछें...' : 'Ask a question from course material...'
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 p-3 rounded-full border border-line bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-teal"
          />
          <button
            onClick={() => handleSend()}
            className="p-3 rounded-full bg-teal text-white font-bold hover:bg-teal/90 transition shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* RIGHT PANE: Desktop Source Viewer */}
      <div className="hidden md:block w-96">
        <SourceViewer citation={activeCitation} onClose={() => setActiveCitation(null)} />
      </div>

      {/* Mobile Bottom Sheet Source Viewer */}
      {activeCitation && (
        <div className="fixed inset-x-0 bottom-0 z-50 md:hidden bg-bg rounded-t-3xl border-t border-line p-4 h-96 shadow-2xl">
          <SourceViewer citation={activeCitation} onClose={() => setActiveCitation(null)} />
        </div>
      )}
    </div>
  );
}
