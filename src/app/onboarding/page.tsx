'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMasteryStore } from '@/store/masteryStore';
import { useSessionStore } from '@/store/sessionStore';
import { MOCK_QUESTIONS, MOCK_CONCEPTS } from '@/lib/mock/data';
import { updateBKT, selectNextQuestion } from '@/lib/bkt';
import { CheckCircle2, AlertCircle, ArrowRight, Brain, User, Sparkles } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const { masteryPoints, setMasteryPoints } = useMasteryStore();
  const { learnerAbility, setLearnerAbility } = useSessionStore();

  const [step, setStep] = useState<'intake' | 'quiz' | 'complete'>('intake');
  const [goal, setGoal] = useState('Pass final exam with top grade');
  const [examDate, setExamDate] = useState('2026-11-15');
  const [level, setLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');

  const [answeredIds, setAnsweredIds] = useState<Set<string>>(new Set());
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [scoreCount, setScoreCount] = useState(0);

  const startQuiz = () => {
    // Initialize initial mastery points
    const initialPoints = MOCK_CONCEPTS.map((c, i) => ({
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

    // Update BKT in store
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
    <div className="max-w-3xl mx-auto space-y-8 py-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-3 py-1 text-xs font-bold text-teal">
          <Brain className="w-4 h-4" /> Diagnostic Onboarding
        </div>
        <h1 className="font-head text-3xl font-bold text-deep dark:text-teal">
          Personalized Learner Assessment
        </h1>
        <p className="text-sm text-mut">
          Calibrating the Bayesian Knowledge Tracing (BKT) engine for Operating Systems.
        </p>
      </div>

      {step === 'intake' && (
        <div className="bg-bg rounded-2xl border border-line p-6 space-y-6 shadow-sm">
          <h2 className="font-head text-xl font-bold border-b border-line pb-3">
            1. Student Intake Preferences
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Primary Academic Goal</label>
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full p-3 rounded-xl border border-line bg-bg2 text-sm focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Target Exam Date</label>
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="w-full p-3 rounded-xl border border-line bg-bg2 text-sm focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Self-Rated Prior Familiarity</label>
              <div className="grid grid-cols-3 gap-3">
                {(['beginner', 'intermediate', 'advanced'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setLevel(lvl)}
                    className={`p-3 rounded-xl border font-bold capitalize text-sm transition ${
                      level === lvl
                        ? 'bg-teal text-white border-teal'
                        : 'bg-bg2 border-line text-mut hover:bg-line'
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
            className="w-full py-3.5 rounded-full bg-teal text-white font-bold flex items-center justify-center gap-2 hover:bg-teal/90 transition shadow-md"
          >
            Start Diagnostic Assessment <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {step === 'quiz' && currentQuestion && (
        <div className="bg-bg rounded-2xl border border-line p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <span className="text-xs font-bold text-amber uppercase tracking-wider">
              Diagnostic Question {answeredIds.size + 1} of 6
            </span>
            <span className="text-xs font-bold text-teal bg-teal/10 px-2.5 py-1 rounded-full">
              Target Difficulty: {currentQuestion.difficulty}
            </span>
          </div>

          <div className="space-y-4">
            <h2 className="font-head text-lg font-bold">{currentQuestion.stem}</h2>

            {currentQuestion.type === 'mcq' && currentQuestion.options ? (
              <div className="space-y-2">
                {currentQuestion.options.map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedOption(String(idx))}
                    className={`w-full p-3.5 text-left rounded-xl border text-sm font-semibold transition ${
                      selectedOption === String(idx)
                        ? 'bg-teal/10 border-teal text-teal'
                        : 'bg-bg2 border-line text-ink hover:bg-line'
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
                className="w-full p-3.5 rounded-xl border border-line bg-bg2 text-sm focus:outline-none focus:ring-2 focus:ring-teal"
              />
            )}
          </div>

          <button
            onClick={handleAnswerSubmit}
            disabled={!selectedOption}
            className="w-full py-3.5 rounded-full bg-teal text-white font-bold flex items-center justify-center gap-2 hover:bg-teal/90 transition disabled:opacity-50"
          >
            Submit Answer <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {step === 'complete' && (
        <div className="bg-bg rounded-2xl border border-line p-8 text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center text-teal mx-auto">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="font-head text-2xl font-bold text-deep dark:text-teal">
            Diagnostic Complete!
          </h2>
          <p className="text-sm text-mut max-w-md mx-auto">
            You scored {scoreCount} / 6. Your initial concept probability matrix $P(L)$ has been stored in Zustand.
          </p>

          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto text-left">
            {masteryPoints.slice(0, 4).map((mp) => (
              <div key={mp.conceptId} className="p-3 bg-bg2 rounded-xl border border-line">
                <div className="text-xs font-bold text-mut">{mp.conceptName}</div>
                <div className="text-lg font-bold text-teal">{Math.round(mp.pKnown * 100)}%</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => router.push('/kb')}
            className="w-full py-3.5 rounded-full bg-teal text-white font-bold flex items-center justify-center gap-2 hover:bg-teal/90 transition shadow-md"
          >
            Explore Knowledge Map <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
