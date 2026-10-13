'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Video,
  FileText,
  Presentation,
  ShieldCheck,
  Brain,
  Target,
  Layers,
  Search,
  ExternalLink,
  CheckCircle2,
  BookOpen,
  MessageSquare,
  Award
} from 'lucide-react';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<'video' | 'pdf' | 'slide'>('pdf');
  const [showSourceModal, setShowSourceModal] = useState(false);

  return (
    <div className="space-y-24 py-4 max-w-7xl mx-auto">
      
      {/* HERO SECTION */}
      <section className="grid lg:grid-cols-12 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-6 space-y-6"
        >
          {/* Tag Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo/10 border border-indigo/20 text-xs font-semibold text-indigo">
            <Sparkles className="w-3.5 h-3.5" />
            <span>IIT Mandi Multimodal Hackathon · Track D</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-ink leading-[1.15]">
            Study smarter.{' '}
            <span className="text-indigo">Understand deeper.</span>{' '}
            Achieve more.
          </h1>

          <p className="text-base text-mut leading-relaxed max-w-xl font-normal">
            Your personal learning companion unifies lecture recordings, textbook PDFs, and slide decks into a source-grounded knowledge base with adaptive Bayesian knowledge tracing.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-xs btn-indigo shadow-sm"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/chat"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-xs bg-card border border-line hover:bg-bg2 text-ink transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-indigo" />
              <span>Explore Features</span>
            </Link>
          </div>

          {/* Value Props */}
          <div className="pt-6 border-t border-line grid grid-cols-3 gap-4 text-xs">
            <div>
              <div className="font-bold text-sm text-ink">100% Grounded</div>
              <div className="text-mut">Verified Citations</div>
            </div>
            <div>
              <div className="font-bold text-sm text-indigo">BKT Engine</div>
              <div className="text-mut">Adaptive Mastery</div>
            </div>
            <div>
              <div className="font-bold text-sm text-teal">0% Hallucination</div>
              <div className="text-mut">Honest Abstention</div>
            </div>
          </div>
        </motion.div>

        {/* HERO VISUAL: Product Preview Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="lg:col-span-6"
        >
          <div className="card-subtle rounded-2xl p-6 space-y-4 relative overflow-hidden bg-card">
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-coral/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-teal/80" />
                <span className="ml-2 text-xs font-mono font-medium text-mut">Source Grounding Inspector</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal/10 text-teal border border-teal/20 font-semibold">
                Verified Grounded
              </span>
            </div>

            {/* Tab Switcher */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('video')}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'video'
                    ? 'bg-coral/10 text-coral border border-coral/20 font-semibold'
                    : 'bg-bg2 text-mut border border-line hover:text-ink'
                }`}
              >
                <Video className="w-3 h-3 text-coral" />
                <span>Video · 14:32</span>
              </button>

              <button
                onClick={() => setActiveTab('pdf')}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'pdf'
                    ? 'bg-teal/10 text-teal border border-teal/20 font-semibold'
                    : 'bg-bg2 text-mut border border-line hover:text-ink'
                }`}
              >
                <FileText className="w-3 h-3 text-teal" />
                <span>Textbook · p.231</span>
              </button>

              <button
                onClick={() => setActiveTab('slide')}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'slide'
                    ? 'bg-amber/10 text-amber border border-amber/20 font-semibold'
                    : 'bg-bg2 text-mut border border-line hover:text-ink'
                }`}
              >
                <Presentation className="w-3 h-3 text-amber" />
                <span>Slide · 12</span>
              </button>
            </div>

            {/* Content Display */}
            <div className="p-4 rounded-xl bg-bg2 border border-line space-y-3">
              <div className="flex items-center justify-between text-xs text-mut">
                <span className="font-semibold text-ink">Query: "What are Deadlock conditions?"</span>
                <span className="text-[10px] font-mono text-indigo">Confidence: 0.98</span>
              </div>

              <p className="text-xs text-ink leading-relaxed">
                Deadlock requires four necessary conditions simultaneously: mutual exclusion, hold and wait, no preemption, and circular wait.
              </p>

              {/* Source Snippet */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="p-3 rounded-lg bg-card border border-line text-xs space-y-1"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-indigo font-semibold flex items-center gap-1">
                      <Search className="w-3 h-3 text-indigo" /> Verified Source Quote
                    </span>
                    <button
                      onClick={() => setShowSourceModal(!showSourceModal)}
                      className="text-indigo hover:underline flex items-center gap-0.5 text-[10px] font-semibold"
                    >
                      <span>Inspect Source</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>

                  <p className="text-mut italic font-mono text-[11px]">
                    {activeTab === 'video' && '"...remove any one of these four conditions and the system can never deadlock..."'}
                    {activeTab === 'pdf' && '"...Deadlock can arise only if mutual exclusion, hold and wait, no preemption and circular wait all hold at the same time..."'}
                    {activeTab === 'slide' && '"Slide 12: Deadlock necessary conditions — Mutual exclusion, Hold and wait, No preemption, Circular wait"'}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Source Popup Preview */}
            {showSourceModal && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-x-4 bottom-4 bg-card border border-indigo/30 rounded-xl p-4 shadow-xl space-y-2 z-20"
              >
                <div className="flex items-center justify-between text-xs font-bold text-indigo border-b border-line pb-2">
                  <span>Source Document Highlighting (PDF p.231)</span>
                  <button onClick={() => setShowSourceModal(false)} className="text-mut hover:text-ink">✕</button>
                </div>
                <div className="p-2 bg-amber/20 border border-amber/30 rounded text-[11px] text-ink font-medium">
                  Highlighted Match: "Deadlock can arise only if mutual exclusion, hold and wait, no preemption and circular wait all hold..."
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </section>

      {/* FEATURE SHOWCASE - Bento Grid */}
      <section className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
            Designed for Deep Understanding
          </h2>
          <p className="text-sm text-mut">
            Every feature is engineered to eliminate fragmentation and ground your learning in verified course material.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card-subtle rounded-2xl p-5 space-y-3 bg-card">
            <div className="w-9 h-9 rounded-lg bg-coral/10 flex items-center justify-center text-coral">
              <Video className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-ink">Multimodal Ingestion</h3>
            <p className="text-xs text-mut leading-relaxed">
              Whisper transcribes lecture recordings and PyMuPDF parses textbook pages into a unified index.
            </p>
          </div>

          <div className="card-subtle rounded-2xl p-5 space-y-3 bg-card">
            <div className="w-9 h-9 rounded-lg bg-teal/10 flex items-center justify-center text-teal">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-ink">Verifiable Citations</h3>
            <p className="text-xs text-mut leading-relaxed">
              Clicking an inline citation chip opens the exact timestamp seek, textbook page, or slide number.
            </p>
          </div>

          <div className="card-subtle rounded-2xl p-5 space-y-3 bg-card">
            <div className="w-9 h-9 rounded-lg bg-indigo/10 flex items-center justify-center text-indigo">
              <Target className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-ink">Bayesian Mastery (BKT)</h3>
            <p className="text-xs text-mut leading-relaxed">
              Updates concept probability P(L) after every answer, selecting questions matching target difficulty.
            </p>
          </div>

          <div className="card-subtle rounded-2xl p-5 space-y-3 bg-card">
            <div className="w-9 h-9 rounded-lg bg-amber/10 flex items-center justify-center text-amber">
              <Brain className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-ink">Socratic Tutoring</h3>
            <p className="text-xs text-mut leading-relaxed">
              Generates targeted follow-up prompts to diagnose why you erred and guide you to clarity.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="card-subtle rounded-3xl p-8 sm:p-10 space-y-8 bg-card">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
            How It Works in 3 Steps
          </h2>
          <p className="text-sm text-mut">
            From file upload to real-time concept mastery.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-bg2 border border-line space-y-2">
            <span className="text-xs font-mono font-bold text-indigo">STEP 01</span>
            <h3 className="font-bold text-sm text-ink">Upload Course Material</h3>
            <p className="text-xs text-mut leading-relaxed">
              Upload MP4 videos, PDF textbooks, or PPT slides. The pipeline transcribes, parses, and chunks content.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-bg2 border border-line space-y-2">
            <span className="text-xs font-mono font-bold text-teal">STEP 02</span>
            <h3 className="font-bold text-sm text-ink">Ask &amp; Verify Proof</h3>
            <p className="text-xs text-mut leading-relaxed">
              Ask questions in the Tutor Chat. Answers cite exact source locations or abstain if out of material.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-bg2 border border-line space-y-2">
            <span className="text-xs font-mono font-bold text-amber">STEP 03</span>
            <h3 className="font-bold text-sm text-ink">Master Concepts</h3>
            <p className="text-xs text-mut leading-relaxed">
              Take adaptive quizzes. BKT updates your concept heatmap and schedules targeted revision flashcards.
            </p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="rounded-3xl bg-indigo p-8 sm:p-12 text-white text-center space-y-6 shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Ready to transform your study routine?
        </h2>
        <p className="text-sm text-white/90 max-w-lg mx-auto">
          Start your diagnostic onboarding assessment to calibrate your concept knowledge trace.
        </p>
        <Link
          href="/onboarding"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-xs bg-white text-indigo hover:bg-white/90 transition-colors shadow-md"
        >
          <span>Get Started Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </section>

    </div>
  );
}
