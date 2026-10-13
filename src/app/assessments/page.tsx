'use client';

import React, { useState, useEffect } from 'react';
import { useMasteryStore } from '@/store/masteryStore';
import { getAssessments, submitAssessment } from '@/lib/api';
import { Question, Citation } from '@/lib/schemas';
import { updateBKT, selectNextQuestion } from '@/lib/bkt';
import { SourceViewer } from '@/components/SourceViewer';
import {
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Brain,
  RotateCcw,
  Award,
  AlertTriangle
} from 'lucide-react';

export default function AssessmentsPage() {
  const { masteryPoints, setMasteryPoints } = useMasteryStore();

  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [mode, setMode] = useState<'builder' | 'runner' | 'report'>('builder');

  const [questionCount, setQuestionCount] = useState(5);
  const [examType, setExamType] = useState<'quiz' | 'exam'>('quiz');

  const [answeredIds, setAnsweredIds] = useState<Set<string>>(new Set());
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    explanation: string;
    misconception?: string;
  } | null>(null);

  const [activeCitation, setActiveCitation] = useState<Citation | null>(null);

  const [results, setResults] = useState<
    Array<{
      question: Question;
      userAnswer: string;
      correct: boolean;
      misconception?: string;
    }>
  >([]);

  useEffect(() => {
    getAssessments().then(setAllQuestions);
  }, []);

  const handleStartQuiz = () => {
    setAnsweredIds(new Set());
    setResults([]);
    setFeedback(null);
    setSelectedAnswer(null);

    const nextQ = selectNextQuestion(
      allQuestions,
      masteryPoints,
      new Set()
    );
    setCurrentQuestion(nextQ);
    setMode('runner');
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitAnswer = async () => {
    if (!currentQuestion || selectedAnswer === null || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await submitAssessment(currentQuestion.id, selectedAnswer);

      setMasteryPoints(
        masteryPoints.map((m) => {
          if (m.conceptId === currentQuestion.conceptId) {
            return {
              ...m,
              pKnown: updateBKT(m.pKnown, res.correct),
              nObs: m.nObs + 1,
            };
          }
          return m;
        })
      );

      setResults((prev) => [
        ...prev,
        {
          question: currentQuestion,
          userAnswer: selectedAnswer,
          correct: res.correct,
          misconception: res.misconception,
        },
      ]);

      if (examType === 'quiz') {
        setFeedback(res);
      } else {
        handleNextQuestion();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextQuestion = () => {
    if (!currentQuestion) return;

    const nextAnswered = new Set(answeredIds).add(currentQuestion.id);
    setAnsweredIds(nextAnswered);
    setFeedback(null);
    setSelectedAnswer(null);

    if (nextAnswered.size >= questionCount) {
      setMode('report');
    } else {
      const nextQ = selectNextQuestion(
        allQuestions,
        masteryPoints,
        nextAnswered
      );
      if (nextQ) {
        setCurrentQuestion(nextQ);
      } else {
        setMode('report');
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 py-4">
      {/* 1. BUILDER MODE */}
      {mode === 'builder' && (
        <div className="card-subtle rounded-2xl p-6 sm:p-8 space-y-6 bg-card">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo/10 text-indigo text-xs font-semibold mb-2">
              <Brain className="w-3.5 h-3.5" /> Adaptive Assessment Engine
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
              Configure Adaptive Quiz
            </h1>
            <p className="text-xs sm:text-sm text-mut mt-1">
              Select assessment mode and question count. Question target difficulty auto-adjusts based on Bayesian Knowledge Tracing.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-line">
            <div>
              <label className="block text-xs font-bold text-mut uppercase tracking-wider mb-2">Assessment Mode</label>
              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setExamType('quiz')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    examType === 'quiz'
                      ? 'bg-indigo/10 border-indigo text-indigo font-bold'
                      : 'bg-bg2 border-line text-mut hover:text-ink'
                  }`}
                >
                  <div className="text-sm">Interactive Adaptive Quiz</div>
                  <div className="text-xs font-normal opacity-80 mt-0.5">
                    Immediate cited feedback &amp; source inspector after every response.
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setExamType('exam')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    examType === 'exam'
                      ? 'bg-indigo/10 border-indigo text-indigo font-bold'
                      : 'bg-bg2 border-line text-mut hover:text-ink'
                  }`}
                >
                  <div className="text-sm flex items-center gap-1.5">
                    Timed Mock Exam <Clock className="w-3.5 h-3.5 text-coral" />
                  </div>
                  <div className="text-xs font-normal opacity-80 mt-0.5">
                    Simulates exam conditions. Feedback revealed in final diagnostic report.
                  </div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-mut uppercase tracking-wider mb-2">Target Question Count</label>
              <div className="flex gap-2">
                {[5, 10, 15].map((cnt) => (
                  <button
                    key={cnt}
                    onClick={() => setQuestionCount(cnt)}
                    className={`px-5 py-2 rounded-lg border text-xs font-semibold transition-all ${
                      questionCount === cnt
                        ? 'bg-indigo text-white border-indigo'
                        : 'bg-bg2 border-line text-mut hover:text-ink'
                    }`}
                  >
                    {cnt} Questions
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleStartQuiz}
            className="w-full py-3 rounded-lg btn-indigo font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm"
          >
            Start Adaptive Quiz <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 2. RUNNER MODE */}
      {mode === 'runner' && currentQuestion && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 card-subtle rounded-2xl p-6 space-y-6 bg-card">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <span className="text-xs font-bold text-amber uppercase font-mono">
                Question {answeredIds.size + 1} of {questionCount}
              </span>
              <span className="text-[11px] font-bold text-indigo bg-indigo/10 px-2.5 py-0.5 rounded-full border border-indigo/20">
                Difficulty Level: {currentQuestion.difficulty}
              </span>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <h2 className="font-bold text-ink text-base">{currentQuestion.stem}</h2>

              {currentQuestion.type === 'mcq' && currentQuestion.options ? (
                <div className="space-y-2">
                  {currentQuestion.options.map((opt, idx) => (
                    <button
                      key={idx}
                      disabled={feedback !== null}
                      onClick={() => setSelectedAnswer(String(idx))}
                      className={`w-full p-3.5 text-left rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                        selectedAnswer === String(idx)
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
                  placeholder="Enter exact answer..."
                  disabled={feedback !== null}
                  value={selectedAnswer || ''}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  className="w-full p-3 rounded-xl border border-line bg-bg2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo/20 text-ink"
                />
              )}
            </div>

            {!feedback ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null || isSubmitting}
                className="w-full py-2.5 rounded-lg btn-indigo font-semibold text-xs flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
              >
                {isSubmitting ? 'Evaluating...' : 'Submit Answer'} <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="space-y-4 pt-4 border-t border-line">
                <div
                  className={`p-4 rounded-xl border text-xs space-y-1.5 ${
                    feedback.correct
                      ? 'bg-teal/10 border-teal/30 text-teal'
                      : 'bg-coral/10 border-coral/30 text-coral'
                  }`}
                >
                  <div className="font-bold flex items-center gap-1.5 text-sm">
                    {feedback.correct ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-teal" /> Correct Answer!
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-coral" /> Incorrect
                      </>
                    )}
                  </div>
                  <p className="text-ink">{feedback.explanation}</p>
                  {feedback.misconception && (
                    <div className="p-2 rounded-lg bg-card border border-line text-amber font-medium mt-1">
                      <strong>Diagnosed Misconception:</strong> {feedback.misconception}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={() => setActiveCitation(currentQuestion.source)}
                    className="text-xs font-semibold text-indigo underline flex items-center gap-1"
                  >
                    View Grounding Source ({currentQuestion.source.label})
                  </button>

                  <button
                    onClick={handleNextQuestion}
                    className="py-2 px-5 rounded-lg btn-indigo font-semibold text-xs flex items-center gap-1.5 shadow-sm"
                  >
                    Next Question <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="hidden md:block">
            <SourceViewer citation={activeCitation} onClose={() => setActiveCitation(null)} />
          </div>
        </div>
      )}

      {/* 3. REPORT MODE */}
      {mode === 'report' && (
        <div className="card-subtle rounded-2xl p-6 sm:p-8 space-y-6 bg-card text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-xl bg-indigo/10 flex items-center justify-center text-indigo mx-auto">
              <Award className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-ink tracking-tight">
              Assessment Diagnostic Report
            </h1>
            <p className="text-xs sm:text-sm text-mut">
              Accuracy: {Math.round((results.filter((r) => r.correct).length / results.length) * 100)}% ({results.filter((r) => r.correct).length} / {results.length})
            </p>
          </div>

          {results.some((r) => r.misconception) && (
            <div className="p-4 bg-amber/10 border border-amber/20 rounded-xl space-y-2 text-left text-xs">
              <h3 className="font-bold text-amber flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber" /> Diagnosed Misconceptions
              </h3>
              <ul className="list-disc pl-4 space-y-1 text-ink">
                {results
                  .filter((r) => r.misconception)
                  .map((r, i) => (
                    <li key={i}>
                      <strong>{r.question.conceptId}:</strong> {r.misconception}
                    </li>
                  ))}
              </ul>
            </div>
          )}

              <div className="flex justify-center gap-3 pt-4 border-t border-line">
                <button
                  onClick={() => setMode('builder')}
                  className="py-2.5 px-5 rounded-lg border border-line font-semibold text-xs text-ink hover:bg-bg2 transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Configure New Assessment
                </button>
                <Link
                  href="/mastery"
                  className="py-2.5 px-5 rounded-lg btn-indigo font-semibold text-xs text-white flex items-center gap-1.5 shadow-sm"
                >
                  View Updated Mastery <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
        </div>
      )}
    </div>
  );
}
