'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMasteryStore } from '@/store/masteryStore';
import { useSessionStore } from '@/store/sessionStore';
import { MOCK_QUESTIONS, MOCK_CONCEPTS } from '@/lib/mock/data';
import { updateBKT, selectNextQuestion } from '@/lib/bkt';
import { ArrowRight, Brain, Sparkles } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const { masteryPoints, setMasteryPoints } = useMasteryStore();

  const [step, setStep] = useState<'intake' | 'quiz' | 'complete'>('intake');
  const [goal, setGoal] = useState('Pass final exam with top grade');
  const [examDate, setExamDate] = useState('2026-11-15');
  const [level, setLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');

  const [answeredIds, setAnsweredIds] = useState<Set<string>>(new Set());
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [scoreCount, setScoreCount] = useState(0);

  const startQuiz = () => {
    const initialPoints = MOCK_CONCEPTS.map((c) => ({
      conceptId: c.id,
      conceptName: c.name,
      pKnown: level === 'beginner' ? 0.2 : level === 'intermediate' ? 0.4 : 0.6,
      nObs: 0,
      dueAt: new Date().toISOString(),
      prerequisites: c.prerequisites,
    }));
    setMasteryPoints(initialPoints);
    setStep('quiz');
  };

  const currentQuestion = selectNextQuestion(MOCK_QUESTIONS, masteryPoints, answeredIds) || MOCK_QUESTIONS[0];

  const handleAnswerSubmit = () => {
    if (!selectedOption || !currentQuestion) return;

    const isCorrect =
      currentQuestion.type === 'mcq'
        ? Number(selectedOption) === currentQuestion.correctOptionIndex
        : selectedOption.trim().toLowerCase() === currentQuestion.correctAnswer?.toLowerCase();

    if (isCorrect) setScoreCount((prev) => prev + 1);

    setMasteryPoints(
      masteryPoints.map((m) => {
        if (m.conceptId === currentQuestion.conceptId) {
          return {
            ...m,
            pKnown: updateBKT(m.pKnown, isCorrect),
            nObs: m.nObs + 1,
          };
        }
        return m;
      })
    );

    const newAnswered = new Set(answeredIds).add(currentQuestion.id);
    setAnsweredIds(newAnswered);
    setSelectedOption(null);

    if (newAnswered.size >= 6) {
      setStep('complete');
    } else {
      setCurrentQIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-4">
      <div className="text-center space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo/10 border border-indigo/20 text-xs font-semibold text-indigo">
          <Brain className="w-3.5 h-3.5" /> Diagnostic Assessment Onboarding
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
          Personalized Knowledge Trace Calibration
        </h1>
        <p className="text-xs sm:text-sm text-mut">
          Calibrating Bayesian Knowledge Tracing (BKT) probability matrix P(L) for Operating Systems.
        </p>
      </div>

      {step === 'intake' && (
        <div className="card-subtle rounded-2xl p-6 sm:p-8 space-y-5 bg-card">
          <h2 className="text-base font-bold text-ink border-b border-line pb-3">
            1. Student Intake Preferences
          </h2>

          <div className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block font-medium text-mut mb-1">Primary Goal</label>
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-line bg-bg2 text-ink focus:outline-none focus:ring-2 focus:ring-indigo/20"
              />
            </div>

            <div>
              <label className="block font-medium text-mut mb-1">Target Exam Date</label>
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-line bg-bg2 text-ink focus:outline-none focus:ring-2 focus:ring-indigo/20"
              />
            </div>

            <div>
              <label className="block font-medium text-mut mb-2">Self-Rated Prior Familiarity</label>
              <div className="grid grid-cols-3 gap-2">
                {(['beginner', 'intermediate', 'advanced'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setLevel(lvl)}
                    className={`p-2.5 rounded-lg border text-xs font-semibold capitalize transition-all ${
                      level === lvl
                        ? 'btn-indigo shadow-sm'
                        : 'bg-bg2 border-line text-mut hover:text-ink'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={startQuiz}
            className="w-full py-3 rounded-lg btn-indigo font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm"
          >
            Start Diagnostic Assessment <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {step === 'quiz' && currentQuestion && (
        <div className="card-subtle rounded-2xl p-6 space-y-6 bg-card">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <span className="text-xs font-mono font-bold text-amber">
              Question {answeredIds.size + 1} of 6
            </span>
            <span className="text-[11px] font-bold text-indigo bg-indigo/10 px-2.5 py-0.5 rounded-full border border-indigo/20">
              Target Difficulty: {currentQuestion.difficulty}
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <h2 className="font-bold text-ink text-base">{currentQuestion.stem}</h2>

            {currentQuestion.type === 'mcq' && currentQuestion.options ? (
              <div className="space-y-2">
                {currentQuestion.options.map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedOption(String(idx))}
                    className={`w-full p-3.5 text-left rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                      selectedOption === String(idx)
                        ? 'bg-indigo/10 border-indigo text-indigo font-semibold'
                        : 'bg-bg2 border-line text-ink hover:bg-card'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ) : (
              <input
                type="text"
                placeholder="Type your exact answer..."
                value={selectedOption || ''}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="w-full p-3 rounded-xl border border-line bg-bg2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo/20 text-ink"
              />
            )}
          </div>

          <button
            onClick={handleAnswerSubmit}
            disabled={!selectedOption}
            className="w-full py-2.5 rounded-lg btn-indigo font-semibold text-xs flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
          >
            Submit Answer <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {step === 'complete' && (
        <div className="card-subtle rounded-2xl p-8 text-center space-y-6 bg-card">
          <div className="w-12 h-12 rounded-xl bg-indigo/10 flex items-center justify-center text-indigo mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-ink tracking-tight">
            Diagnostic Calibration Complete!
          </h2>
          <p className="text-xs text-mut max-w-md mx-auto">
            You scored {scoreCount} / 6. Your initial concept probability matrix P(L) has been stored in Zustand.
          </p>

          <button
            onClick={() => router.push('/kb')}
            className="w-full py-3 rounded-lg btn-indigo font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm"
          >
            Explore Knowledge Map <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
