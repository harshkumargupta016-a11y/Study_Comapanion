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
  ChevronRight,
  MessageSquare,
  Activity,
  CheckCircle2,
  Lock,
  Cpu,
  Zap,
  Check
} from 'lucide-react';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<'video' | 'pdf' | 'slide'>('pdf');
  const [showSourceModal, setShowSourceModal] = useState(false);

  return (
    <div className="space-y-28 py-6 max-w-7xl mx-auto">
      
      {/* HERO SECTION */}
      <section className="relative grid lg:grid-cols-12 gap-12 items-center">
        {/* Ambient Subtle Radial Glow */}
        <div className="absolute -top-24 -left-20 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 space-y-6 relative z-10"
        >
          {/* Eyecatching Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-white/10 ring-1 ring-white/5 text-xs font-semibold text-indigo-300 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>IIT Mandi Multimodal Hackathon · Track D</span>
          </div>

          {/* Headline */}
          <h1 className="font-head text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            Study smarter.{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-cyan-400 bg-clip-text text-transparent underline decoration-indigo-500/30 underline-offset-8">
              Understand deeper.
            </span>{' '}
            Achieve more.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-xl">
            Learn from your own materials with AI assistance and verifiable source citations.
          </p>

          {/* Two-Button CTA Row */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:opacity-95 transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Get Started</span>
              <ChevronRight className="w-4 h-4" />
            </Link>

            <Link
              href="/chat"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-300 bg-slate-900/80 border border-white/10 hover:border-slate-700 hover:text-white backdrop-blur-md transition-all hover:-translate-y-0.5"
            >
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span>Explore Features</span>
            </Link>
          </div>

          {/* Metric Strip / Feature Badges */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="flex items-center gap-2 bg-slate-900/40 p-2.5 rounded-xl border border-white/5">
              <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
              <div>
                <div className="font-bold text-white">Grounded Answers</div>
                <div className="text-[10px] text-slate-400">Evidence-linked responses</div>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-900/40 p-2.5 rounded-xl border border-white/5">
              <Activity className="w-4 h-4 text-indigo-400 shrink-0" />
              <div>
                <div className="font-bold text-white">BKT Engine</div>
                <div className="text-[10px] text-slate-400">Adaptive review</div>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-900/40 p-2.5 rounded-xl border border-white/5">
              <Lock className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <div className="font-bold text-white">Honest Abstention</div>
                <div className="text-[10px] text-slate-400">When evidence is missing</div>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-900/40 p-2.5 rounded-xl border border-white/5">
              <Layers className="w-4 h-4 text-violet-400 shrink-0" />
              <div>
                <div className="font-bold text-white">Multimodal</div>
                <div className="text-[10px] text-slate-400">Video, PDF, slides</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* HERO INTERACTIVE SHOWCASE CARD - Source Grounding Inspector */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-6 relative z-10"
        >
          <div className="rounded-2xl bg-slate-900/90 border border-white/10 ring-1 ring-white/5 shadow-2xl backdrop-blur-xl p-6 space-y-5 relative overflow-hidden">
            
            {/* Terminal Mockup Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-slate-400">Source Grounding Inspector</span>
              </div>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold flex items-center gap-1">
                <Check className="w-3 h-3" /> Source-backed answer
              </span>
            </div>

            {/* Grounding Chips Row */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('video')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'video'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'bg-slate-950/60 text-slate-400 border border-white/5 hover:text-slate-200'
                }`}
              >
                <Video className="w-3.5 h-3.5 text-rose-400" />
                <span>Video · 14:32</span>
              </button>

              <button
                onClick={() => setActiveTab('pdf')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'pdf'
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                    : 'bg-slate-950/60 text-slate-400 border border-white/5 hover:text-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-teal-400" />
                <span>Textbook · p.231</span>
              </button>

              <button
                onClick={() => setActiveTab('slide')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'slide'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-slate-950/60 text-slate-400 border border-white/5 hover:text-slate-200'
                }`}
              >
                <Presentation className="w-3.5 h-3.5 text-amber-400" />
                <span>Slide · 12</span>
              </button>
            </div>

            {/* Prompt & Answer Panel */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-200">Query: "What are Deadlock conditions?"</span>
                <span className="text-[10px] font-mono text-cyan-400">Course evidence: 3 matched sources</span>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                Deadlock requires four necessary conditions simultaneously: mutual exclusion, hold and wait, no preemption, and circular wait.
              </p>

              {/* Source Highlight Box */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 rounded-lg bg-slate-900 border border-amber-500/20 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-amber-300 font-semibold flex items-center gap-1">
                      <Search className="w-3 h-3 text-cyan-400" /> Extracted Source Quote
                    </span>
                    <button
                      onClick={() => setShowSourceModal(!showSourceModal)}
                      className="text-cyan-400 hover:underline flex items-center gap-0.5 text-[10px]"
                    >
                      <span>Inspect Source</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>

                  <p className="text-slate-300 italic font-mono text-[11px] leading-normal">
                    {activeTab === 'video' && '"...remove any one of these four conditions and the system can never deadlock..."'}
                    {activeTab === 'pdf' && '"...Deadlock can arise only if mutual exclusion, hold and wait, no preemption and circular wait all hold at the same time..."'}
                    {activeTab === 'slide' && '"Slide 12: Deadlock necessary conditions — Mutual exclusion, Hold and wait, No preemption, Circular wait"'}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Popup Inspector Window */}
            {showSourceModal && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-x-4 bottom-4 bg-slate-900 border border-cyan-500/40 rounded-xl p-4 shadow-2xl backdrop-blur-md space-y-2 z-20"
              >
                <div className="flex items-center justify-between text-xs font-bold text-cyan-400 border-b border-slate-800 pb-2">
                  <span>Source Document Highlighting (PDF p.231)</span>
                  <button onClick={() => setShowSourceModal(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>
                <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-lg text-[11px] text-amber-200">
                  Highlighted Match: "Deadlock can arise only if mutual exclusion, hold and wait, no preemption and circular wait all hold..."
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </section>

      {/* FEATURE BENTO GRID SECTION */}
      <section className="space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="font-head text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Designed for Source-Grounded Learning
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Every feature is engineered to eliminate fragmentation and ground your learning in verified course material.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Multimodal Ingestion */}
          <div className="group rounded-2xl bg-slate-900/60 border border-white/10 ring-1 ring-white/5 p-6 space-y-4 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Multimodal Ingestion</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Faster-Whisper transcribes video recordings and PyMuPDF parses textbook pages into a unified vector database.
            </p>
          </div>

          {/* Card 2: Verifiable Citations */}
          <div className="group rounded-2xl bg-slate-900/60 border border-white/10 ring-1 ring-white/5 p-6 space-y-4 hover:border-teal-500/50 hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Verifiable Citations</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every factual sentence carries an inline citation opening the exact timestamp seek, textbook page, or slide.
            </p>
          </div>

          {/* Card 3: Bayesian Mastery (BKT) */}
          <div className="group rounded-2xl bg-slate-900/60 border border-white/10 ring-1 ring-white/5 p-6 space-y-4 hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Bayesian Mastery (BKT)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Calculates real-time probability P(L) of concept mastery, selecting questions matching learner target difficulty.
            </p>
          </div>

          {/* Card 4: Socratic Tutoring */}
          <div className="group rounded-2xl bg-slate-900/60 border border-white/10 ring-1 ring-white/5 p-6 space-y-4 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Socratic Tutoring</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Diagnostic follow-up engine erases misconceptions through guided inquiry grounded in course material.
            </p>
          </div>
        </div>
      </section>

      {/* PROCESS FLOW (3-STEP ROADMAP) */}
      <section className="space-y-8 bg-slate-900/40 border border-white/10 rounded-3xl p-8 sm:p-10 relative overflow-hidden">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="font-head text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How the Platform Works
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            A three-step learning journey designed around your actual course syllabus.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Step 01 */}
          <div className="bg-slate-950 border border-white/10 rounded-2xl p-6 space-y-3 relative group hover:border-indigo-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-indigo-400">STEP 01</span>
            </div>
            <h3 className="font-bold text-base text-white">Upload Course Material</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Upload MP4 videos, PDF textbooks, or PPT slides. The pipeline transcribes audio, parses pages, and builds concept graphs.
            </p>
          </div>

          {/* Step 02 */}
          <div className="bg-slate-950 border border-white/10 rounded-2xl p-6 space-y-3 relative group hover:border-teal-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-teal-400">STEP 02</span>
            </div>
            <h3 className="font-bold text-base text-white">Ask &amp; Verify Proof</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ask questions in Tutor Chat. Answers link to exact timestamps and pages, or abstain if out of course context.
            </p>
          </div>

          {/* Step 03 */}
          <div className="bg-slate-950 border border-white/10 rounded-2xl p-6 space-y-3 relative group hover:border-amber-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400">STEP 03</span>
            </div>
            <h3 className="font-bold text-base text-white">Master Concepts</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Take adaptive quizzes. BKT updates your concept heatmap and schedules flashcards based on forgetting curves.
            </p>
          </div>
        </div>
      </section>

      {/* CONVERSION CARD */}
      <section className="relative rounded-3xl bg-gradient-to-br from-indigo-900/40 via-slate-900 to-violet-900/40 border border-indigo-500/30 p-10 sm:p-12 text-center space-y-6 shadow-2xl overflow-hidden">
        <h2 className="font-head text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Ready to experience source-grounded learning?
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
          Start your diagnostic onboarding assessment to calibrate your personalized Bayesian knowledge trace.
        </p>
        <Link
          href="/onboarding"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:opacity-95 transition-all shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40"
        >
          <span>Begin Onboarding Assessment</span>
          <ChevronRight className="w-5 h-5" />
        </Link>
      </section>

    </div>
  );
}
