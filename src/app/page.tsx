'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  Video,
  FileText,
  Presentation,
  Brain,
  ShieldCheck,
  Target,
  Sparkles,
  Layers,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-16 py-6">
      {/* HERO SECTION */}
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber/20 px-3 py-1 text-xs font-bold text-amber-900 dark:text-amber">
            <Sparkles className="w-4 h-4" /> IIT Mandi Multimodal Hackathon · Track D
          </div>
          <h1 className="font-head text-4xl md:text-5xl font-bold text-deep dark:text-teal leading-tight">
            Study from your own material, with verifiable proof.
          </h1>
          <p className="text-lg text-mut">
            One source-grounded knowledge base for lecture videos, textbooks, and slide decks.
            Featuring adaptive Bayesian assessment and personalized socratic tutoring.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 bg-teal text-white font-bold px-6 py-3 rounded-full hover:bg-teal/90 transition shadow-md"
            >
              Start Diagnostic Onboarding <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 border border-line bg-bg2 text-ink font-bold px-6 py-3 rounded-full hover:bg-line transition"
            >
              Try Tutor Chat
            </Link>
          </div>
        </div>

        <div className="rounded-3xl bg-deep p-6 text-white shadow-xl space-y-4">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-coral px-3 py-1 text-xs font-bold text-white">
              <Video className="w-3.5 h-3.5" /> Lecture Video
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal px-3 py-1 text-xs font-bold text-white">
              <FileText className="w-3.5 h-3.5" /> Textbook PDF
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber px-3 py-1 text-xs font-bold text-ink">
              <Presentation className="w-3.5 h-3.5" /> Slide Deck
            </span>
          </div>

          <div className="border-t border-white/10 pt-4">
            <div className="text-xs font-bold text-amber uppercase tracking-wider mb-2">
              Verified Grounded Answer
            </div>
            <p className="text-sm text-slate-100 leading-relaxed">
              Deadlock requires four necessary conditions simultaneously: mutual exclusion, hold and
              wait, no preemption, and circular wait.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-coral/20 text-coral text-xs font-semibold px-3 py-1 border border-coral/30">
                Lecture 7 · 14:32
              </span>
              <span className="rounded-full bg-teal/20 text-teal-300 text-xs font-semibold px-3 py-1 border border-teal/30">
                Textbook p.231
              </span>
              <span className="rounded-full bg-amber/20 text-amber text-xs font-semibold px-3 py-1 border border-amber/30">
                Slide 12
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="bg-bg2 rounded-3xl p-8 space-y-6">
        <div>
          <h2 className="font-head text-2xl md:text-3xl font-bold text-deep dark:text-teal">
            The Study Material Fragmentation Problem
          </h2>
          <p className="text-mut mt-1">
            Students struggle with scattered resources across hours of video recordings, dense 600-page textbooks, and fragmented slide decks.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-bg rounded-2xl p-5 border border-line space-y-2">
            <Video className="w-8 h-8 text-coral" />
            <h3 className="font-bold text-lg">Unindexed Video</h3>
            <p className="text-sm text-mut">Finding a 30-second explanation in a 90-minute recording takes hours.</p>
          </div>
          <div className="bg-bg rounded-2xl p-5 border border-line space-y-2">
            <FileText className="w-8 h-8 text-teal" />
            <h3 className="font-bold text-lg">Dense Textbooks</h3>
            <p className="text-sm text-mut">Searching through hundreds of pages without explicit mapping causes cognitive fatigue.</p>
          </div>
          <div className="bg-bg rounded-2xl p-5 border border-line space-y-2">
            <Brain className="w-8 h-8 text-amber" />
            <h3 className="font-bold text-lg">AI Hallucinations</h3>
            <p className="text-sm text-mut">Generic chatbots state false facts with no page or timestamp proof.</p>
          </div>
          <div className="bg-bg rounded-2xl p-5 border border-line space-y-2">
            <Target className="w-8 h-8 text-deep dark:text-teal" />
            <h3 className="font-bold text-lg">Static Quizzes</h3>
            <p className="text-sm text-mut">Practice questions don't adapt to individual concept mastery gaps.</p>
          </div>
        </div>
      </section>

      {/* FOUR PILLARS */}
      <section className="space-y-6">
        <h2 className="font-head text-2xl md:text-3xl font-bold text-deep dark:text-teal text-center">
          Four Pillars of AI Study Companion
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-bg rounded-2xl p-6 border border-line space-y-3">
            <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center text-teal font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-head text-xl font-bold">1. Unify</h3>
            <p className="text-sm text-mut">
              Unifies video transcripts, PDF textbooks, and PPTX slide decks into a single graph database.
            </p>
          </div>

          <div className="bg-bg rounded-2xl p-6 border border-line space-y-3">
            <div className="w-10 h-10 rounded-full bg-coral/10 flex items-center justify-center text-coral font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-head text-xl font-bold">2. Cite</h3>
            <p className="text-sm text-mut">
              Every factual assertion includes an inline clickable citation opening the exact timestamp or page.
            </p>
          </div>

          <div className="bg-bg rounded-2xl p-6 border border-line space-y-3">
            <div className="w-10 h-10 rounded-full bg-amber/10 flex items-center justify-center text-amber font-bold">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-head text-xl font-bold">3. Assess</h3>
            <p className="text-sm text-mut">
              Bayesian Knowledge Tracing (BKT) dynamically selects questions matching learner target difficulty.
            </p>
          </div>

          <div className="bg-bg rounded-2xl p-6 border border-line space-y-3">
            <div className="w-10 h-10 rounded-full bg-deep/10 flex items-center justify-center text-deep dark:text-teal font-bold">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="font-head text-xl font-bold">4. Tutor</h3>
            <p className="text-sm text-mut">
              Socratic follow-up prompts diagnose why you erred and guide you to source-grounded clarity.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-bg2 rounded-3xl p-8 space-y-6">
        <h2 className="font-head text-2xl md:text-3xl font-bold text-deep dark:text-teal">
          How the Pipeline Operates
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-bg rounded-2xl p-5 border border-line space-y-2">
            <span className="text-xs font-bold text-teal uppercase tracking-wider">Step 01</span>
            <h3 className="font-bold text-lg">Ingestion & Extraction</h3>
            <p className="text-sm text-mut">
              Files undergo OCR, Whisper transcription, and concept chunking before building prerequisite edges.
            </p>
          </div>
          <div className="bg-bg rounded-2xl p-5 border border-line space-y-2">
            <span className="text-xs font-bold text-coral uppercase tracking-wider">Step 02</span>
            <h3 className="font-bold text-lg">Source-Grounded Retrieval</h3>
            <p className="text-sm text-mut">
              Queries retrieve vector chunks. Out-of-domain queries strictly abstain to avoid hallucinations.
            </p>
          </div>
          <div className="bg-bg rounded-2xl p-5 border border-line space-y-2">
            <span className="text-xs font-bold text-amber uppercase tracking-wider">Step 03</span>
            <h3 className="font-bold text-lg">Adaptive Learning Loop</h3>
            <p className="text-sm text-mut">
              Quiz responses update concept probability $P(L)$, updating your real-time mastery heatmap.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-deep rounded-3xl p-10 text-white text-center space-y-6">
        <h2 className="font-head text-3xl font-bold">Ready to master your course materials?</h2>
        <p className="text-slate-200 max-w-2xl mx-auto">
          Start your personalized diagnostic assessment to initialize your knowledge trace.
        </p>
        <Link
          href="/onboarding"
          className="inline-flex items-center gap-2 bg-teal text-white font-bold px-8 py-3.5 rounded-full hover:bg-teal/90 transition shadow-lg text-lg"
        >
          Begin Onboarding <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}
