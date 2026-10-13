'use client';

import React, { useState } from 'react';
import { useChatStore } from '@/store/chatStore';
import { useMasteryStore } from '@/store/masteryStore';
import { sendChatMessage } from '@/lib/api';
import { SourceViewer } from '@/components/SourceViewer';
import { Message } from '@/lib/schemas';
import {
  Send,
  Mic,
  Languages,
  Brain,
  Sparkles,
  AlertTriangle,
  Info,
  CheckCircle2,
  InfoIcon
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

    const assistantMsg = await sendChatMessage(query);

    let currentContent = '';
    const fullText = assistantMsg.content;
    const tokens = fullText.split(' ');

    const streamingMsg: Message = {
      ...assistantMsg,
      content: '',
    };
    addMessage(streamingMsg);

    for (let i = 0; i < tokens.length; i++) {
      await new Promise((res) => setTimeout(res, 25));
      currentContent += (i === 0 ? '' : ' ') + tokens[i];
      useChatStore.setState((state) => ({
        messages: state.messages.map((m) =>
          m.id === assistantMsg.id ? { ...m, content: currentContent } : m
        ),
      }));
    }

    if (assistantMsg.grounded) {
      recordObservation('c-deadlock', true);
      showToast('Mastery updated for Deadlock concept (+5%)');
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-teal text-white font-semibold px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 text-xs">
          <CheckCircle2 className="w-4 h-4" /> {toastMessage}
        </div>
      )}

      {/* LEFT PANE: Chat Container */}
      <div className="flex-1 flex flex-col card-subtle rounded-2xl bg-card overflow-hidden">
        {/* Chat Control Header */}
        <div className="p-3.5 bg-bg2 border-b border-line flex flex-wrap items-center justify-between gap-3 text-xs font-medium">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSocraticMode(!socraticMode)}
              className={`px-3 py-1 rounded-full border transition-all flex items-center gap-1.5 ${
                socraticMode
                  ? 'bg-amber/10 border-amber/30 text-amber font-semibold'
                  : 'bg-card border-line text-mut hover:text-ink'
              }`}
            >
              <Brain className="w-3.5 h-3.5" /> Socratic Mode: {socraticMode ? 'ON' : 'OFF'}
            </button>

            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="px-3 py-1 rounded-full bg-card border border-line text-mut hover:text-ink transition-colors flex items-center gap-1.5"
            >
              <Languages className="w-3.5 h-3.5" /> {language === 'en' ? 'English' : 'Hindi (हिंदी)'}
            </button>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-mut text-xs select-none">
            <input
              type="checkbox"
              checked={showOutsideKnowledge}
              onChange={(e) => setShowOutsideKnowledge(e.target.checked)}
              className="rounded accent-indigo"
            />
            Show Outside Knowledge
          </label>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12 space-y-4 max-w-sm mx-auto">
              <Sparkles className="w-8 h-8 text-indigo mx-auto" />
              <h3 className="font-bold text-base text-ink">Source-Grounded AI Tutor</h3>
              <p className="text-xs text-mut">
                Ask any question about your course materials. Try these prompts:
              </p>
              <div className="space-y-2 text-left">
                <button
                  onClick={() => handleSend("What are the four conditions for deadlock?")}
                  className="w-full p-3 rounded-xl bg-bg2 border border-line text-xs font-medium hover:border-indigo transition-colors text-left"
                >
                  "What are the four conditions for deadlock?"
                </button>
                <button
                  onClick={() => handleSend("How does Round Robin differ from FCFS?")}
                  className="w-full p-3 rounded-xl bg-bg2 border border-line text-xs font-medium hover:border-indigo transition-colors text-left"
                >
                  "How does Round Robin differ from FCFS?"
                </button>
                <button
                  onClick={() => handleSend("Who won the 2022 football World Cup?")}
                  className="w-full p-3 rounded-xl bg-bg2 border border-line text-xs font-medium hover:border-coral transition-colors text-left text-coral"
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
                className={`max-w-xl rounded-2xl p-4 text-xs sm:text-sm space-y-3 ${
                  msg.role === 'user'
                    ? 'bg-indigo text-white rounded-br-none font-medium'
                    : 'bg-bg2 border border-line rounded-bl-none text-ink'
                }`}
              >
                {!msg.grounded && msg.role === 'assistant' && (
                  <div className="p-3 bg-amber/10 border border-amber/20 rounded-xl text-xs text-amber space-y-1">
                    <div className="font-semibold flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber" /> Out-of-Domain Refusal
                    </div>
                    <p>{msg.content}</p>
                  </div>
                )}

                {msg.grounded && <p className="leading-relaxed">{msg.content}</p>}

                {/* Citation Chips */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-line/60">
                    {msg.citations.map((c, i) => {
                      const isVideo = c.sourceType === 'video';
                      const isPdf = c.sourceType === 'pdf';
                      const chipColor = isVideo
                        ? 'bg-coral/10 text-coral border-coral/20'
                        : isPdf
                        ? 'bg-teal/10 text-teal border-teal/20'
                        : 'bg-amber/10 text-amber border-amber/20';

                      return (
                        <button
                          key={i}
                          onClick={() => setActiveCitation(c)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition-all hover:opacity-90 ${chipColor}`}
                        >
                          {c.label}
                        </button>
                      );
                    })}
                  </div>
                )}

                {showOutsideKnowledge && msg.outsideKnowledge && (
                  <div className="p-3 bg-card border border-line rounded-xl text-xs space-y-1">
                    <span className="font-semibold text-mut flex items-center gap-1">
                      <InfoIcon className="w-3.5 h-3.5 text-indigo" /> Separated Outside Knowledge
                    </span>
                    <p className="text-mut">{msg.outsideKnowledge}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3.5 bg-bg2 border-t border-line flex items-center gap-2">
          <button className="p-2.5 rounded-lg bg-card border border-line text-mut hover:text-ink transition-colors">
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
            className="flex-1 p-2.5 rounded-lg border border-line bg-card text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo/20 text-ink"
          />
          <button
            onClick={() => handleSend()}
            className="p-2.5 rounded-lg btn-indigo font-semibold shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* RIGHT PANE: Desktop Source Viewer */}
      <div className="hidden md:block w-80 lg:w-96">
        <SourceViewer citation={activeCitation} onClose={() => setActiveCitation(null)} />
      </div>

      {/* Mobile Bottom Sheet Source Viewer */}
      {activeCitation && (
        <div className="fixed inset-x-0 bottom-0 z-50 md:hidden bg-card rounded-t-2xl border-t border-line p-4 h-96 shadow-2xl">
          <SourceViewer citation={activeCitation} onClose={() => setActiveCitation(null)} />
        </div>
      )}
    </div>
  );
}
