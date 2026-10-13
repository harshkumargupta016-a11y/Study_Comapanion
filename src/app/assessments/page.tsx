'use client';

import React, { useState, useEffect } from 'react';
import { useMasteryStore } from '@/store/masteryStore';
import { useSessionStore } from '@/store/sessionStore';
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
  Sparkles,
  Award,
  AlertTriangle,
} from 'lucide-react';

export default function AssessmentsPage() {
  const { masteryPoints, setMasteryPoints } = useMasteryStore();
  const { learnerAbility, setLearnerAbility } = useSessionStore();

  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [mode, setMode] = useState<'builder' | 'runner' | 'report'>('builder');

  // Builder Config
  const [questionCount, setQuestionCount] = useState(5);
  const [examType, setExamType] = useState<'quiz' | 'exam'>('quiz');
  const [selectedConcepts, setSelectedConcepts] = useState<string[]>([]);

  // Runner State
  const [answeredIds, setAnsweredIds] = useState<Set<string>>(new Set());
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    explanation: string;
    misconception?: string;
  } | null>(null);

  // Active Source Viewer
  const [activeCitation, setActiveCitation] = useState<Citation | null>(null);

  // Results tracking
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

  const handleSubmitAnswer = async () => {
    if (!currentQuestion || selectedAnswer === null) return;

    const res = await submitAssessment(currentQuestion.id, selectedAnswer);

    // Update BKT Mastery Store
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
    <div className="max-w-5xl mx-auto space-y-8 py-6">
      {/* 1. BUILDER MODE */}
      {mode === 'builder' && (
        <div className="bg-bg border border-line rounded-3xl p-8 space-y-6 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-3 py-1 text-xs font-bold text-teal mb-2">
              <Brain className="w-4 h-4" /> Adaptive Assessment Engine
            </div>
            <h1 className="font-head text-3xl font-bold text-deep dark:text-teal">
              Configure Adaptive Quiz
            </h1>
            <p className="text-sm text-mut mt-1">
              Select assessment mode and question count. Target question difficulty auto-adjusts based on Bayesian Knowledge Tracing.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-line">
            <div>
              <label className="block text-sm font-semibold mb-2">Assessment Mode</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setExamType('quiz')}
                  className={`p-4 rounded-2xl border text-left transition ${
                    examType === 'quiz'
                      ? 'bg-teal/10 border-teal text-teal font-bold'
                      : 'bg-bg2 border-line text-mut hover:bg-line'
                  }`}
                >
                  <div className="text-base">Interactive Adaptive Quiz</div>
                  <div className="text-xs font-normal opacity-80 mt-1">
                    Immediate cited feedback &amp; source viewer after every response.
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setExamType('exam')}
                  className={`p-4 rounded-2xl border text-left transition ${
                    examType === 'exam'
                      ? 'bg-teal/10 border-teal text-teal font-bold'
                      : 'bg-bg2 border-line text-mut hover:bg-line'
                  }`}
                >
                  <div className="text-base flex items-center gap-2">
                    Timed Mock Exam <Clock className="w-4 h-4 text-coral" />
                  </div>
                  <div className="text-xs font-normal opacity-80 mt-1">
                    Simulates exam conditions. Feedback revealed in final diagnostic report.
                  </div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Target Question Count</label>
              <div className="flex gap-3">
                {[5, 10, 15].map((cnt) => (
                  <button
                    key={cnt}
                    onClick={() => setQuestionCount(cnt)}
                    className={`px-6 py-2.5 rounded-xl border text-sm font-bold transition ${
                      questionCount === cnt
                        ? 'bg-teal text-white border-teal'
                        : 'bg-bg2 border-line text-mut hover:bg-line'
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
            className="w-full py-4 rounded-full bg-teal text-white font-bold flex items-center justify-center gap-2 hover:bg-teal/90 transition shadow-md text-base"
          >
            Start Adaptive Quiz <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* 2. RUNNER MODE */}
      {mode === 'runner' && currentQuestion && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-bg border border-line rounded-3xl p-6 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <span className="text-xs font-bold text-amber uppercase tracking-wider">
                Question {answeredIds.size + 1} of {questionCount}
              </span>
              <span className="text-xs font-bold text-teal bg-teal/10 px-3 py-1 rounded-full">
                Difficulty Level: {currentQuestion.difficulty}
              </span>
            </div>

            <div className="space-y-4">
              <h2 className="font-head text-lg font-bold">{currentQuestion.stem}</h2>

              {currentQuestion.type === 'mcq' && currentQuestion.options ? (
                <div className="space-y-2">
                  {currentQuestion.options.map((opt, idx) => (
                    <button
                      key={idx}
                      disabled={feedback !== null}
                      onClick={() => setSelectedAnswer(String(idx))}
                      className={`w-full p-4 text-left rounded-2xl border text-sm font-semibold transition ${
                        selectedAnswer === String(idx)
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
                  placeholder="Enter exact answer..."
                  disabled={feedback !== null}
                  value={selectedAnswer || ''}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  className="w-full p-4 rounded-2xl border border-line bg-bg2 text-sm focus:outline-none focus:ring-2 focus:ring-teal"
                />
              )}
            </div>

            {!feedback ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className="w-full py-3.5 rounded-full bg-teal text-white font-bold flex items-center justify-center gap-2 hover:bg-teal/90 transition disabled:opacity-50 shadow-md"
              >
                Submit Answer <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="space-y-4 pt-4 border-t border-line">
                <div
                  className={`p-4 rounded-2xl border text-xs space-y-2 ${
                    feedback.correct
                      ? 'bg-teal/10 border-teal/30 text-teal'
                      : 'bg-coral/10 border-coral/30 text-coral'
                  }`}
                >
                  <div className="font-bold flex items-center gap-2 text-sm">
                    {feedback.correct ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-teal" /> Correct Answer!
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-coral" /> Incorrect
                      </>
                    )}
                  </div>
                  <p className="text-ink">{feedback.explanation}</p>
                  {feedback.misconception && (
                    <div className="p-2.5 rounded-xl bg-bg border border-line text-amber-900 dark:text-amber font-medium">
                      <strong>Diagnosed Misconception:</strong> {feedback.misconception}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={() => setActiveCitation(currentQuestion.source)}
                    className="text-xs font-bold text-teal underline flex items-center gap-1"
                  >
                    View Grounding Source ({currentQuestion.source.label})
                  </button>

                  <button
                    onClick={handleNextQuestion}
                    className="py-3 px-6 rounded-full bg-teal text-white font-bold flex items-center gap-2 hover:bg-teal/90 transition shadow-md text-sm"
                  >
                    Next Question <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Source Previewer */}
          <div className="hidden md:block">
            <SourceViewer citation={activeCitation} onClose={() => setActiveCitation(null)} />
          </div>
        </div>
      )}

      {/* 3. REPORT MODE */}
      {mode === 'report' && (
        <div className="bg-bg border border-line rounded-3xl p-8 space-y-8 shadow-sm">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center text-teal mx-auto">
              <Award className="w-8 h-8" />
            </div>
            <h1 className="font-head text-3xl font-bold text-deep dark:text-teal">
              Assessment Report
            </h1>
            <p className="text-sm text-mut">
              Overall Accuracy: {Math.round((results.filter((r) => r.correct).length / results.length) * 100)}% ({results.filter((r) => r.correct).length} / {results.length})
            </p>
          </div>

          {/* Misconceptions Diagnosis */}
          {results.some((r) => r.misconception) && (
            <div className="p-6 bg-amber/10 border border-amber/30 rounded-2xl space-y-3">
              <h3 className="font-head text-lg font-bold text-amber-900 dark:text-amber flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber" /> Diagnosed Misconceptions
              </h3>
              <ul className="list-disc pl-5 text-xs space-y-2 text-ink">
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

          <div className="flex justify-center gap-4 pt-4 border-t border-line">
            <button
              onClick={() => setMode('builder')}
              className="py-3 px-6 rounded-full border border-line font-bold text-sm hover:bg-line transition flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Configure New Assessment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
