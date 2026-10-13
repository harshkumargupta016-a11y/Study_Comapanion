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
  Zap,
  Activity,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  FileCode,
  LineChart,
  HelpCircle,
  MessageSquare
} from 'lucide-react';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<'video' | 'pdf' | 'slide'>('pdf');
  const [showSourceModal, setShowSourceModal] = useState(false);
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      id: 'unify',
      title: '1. Unify',
      icon: Layers,
      color: 'from-blue-500 to-cyan-500',
      description: 'Ingests lecture recordings, PDF textbooks, and PPT slides into a unified multimodal graph index.',
      action: 'Indexed 30 Course Units across Video, PDF, and Slides'
    },
    {
      id: 'cite',
      title: '2. Cite',
      icon: ShieldCheck,
      color: 'from-emerald-500 to-teal-500',
      description: 'Generates citations linked to exact video timestamps, PDF page numbers, or slide numbers.',
      action: 'Clicking citation opens exact page highlight in Source Inspector'
    },
    {
      id: 'assess',
      title: '3. Assess',
      icon: Target,
      color: 'from-amber-500 to-orange-500',
      description: 'Calculates Bayesian Knowledge Tracing (BKT) probability P(L) after every response.',
      action: 'Updated concept mastery P(L) = 0.84 on Deadlock concept'
    },
    {
      id: 'tutor',
      title: '4. Tutor',
      icon: Brain,
      color: 'from-violet-500 to-purple-500',
      description: 'Generates targeted socratic prompts to guide learners through misconceptions.',
      action: 'Socratic mode suggested: "What happens if resource preemption is enabled?"'
    }
  ];

  return (
    <div className="space-y-28 py-6 max-w-7xl mx-auto">
      
      {/* HERO SECTION */}
      <section className="relative grid lg:grid-cols-12 gap-12 items-center">
        {/* Ambient Glow background */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 space-y-6 relative z-10"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-violet-500/10 via-indigo-500/10 to-cyan-500/10 border border-violet-500/20 text-xs font-semibold text-violet-300 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>IIT Mandi Multimodal Hackathon · Track D</span>
          </div>

          {/* Headline */}
          <h1 className="font-head text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Study from your own material, with{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent underline decoration-cyan-500/30 underline-offset-8">
              verifiable proof
            </span>.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-xl">
            One source-grounded knowledge engine for lecture videos, textbook PDFs, and slides — featuring real-time Bayesian Knowledge Tracing and Socratic AI tutoring.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:opacity-95 transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-0.5"
            >
              <span>Start Diagnostic Onboarding</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/chat"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm text-slate-300 bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:text-white backdrop-blur-md transition-all hover:-translate-y-0.5"
            >
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span>Try Tutor Chat</span>
            </Link>
          </div>

          {/* Quick Metrics row */}
          <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-xs">
            <div>
              <div className="font-bold text-base text-white">100%</div>
              <div className="text-slate-400">Source Grounded</div>
            </div>
            <div>
              <div className="font-bold text-base text-cyan-400">P(L) BKT</div>
              <div className="text-slate-400">Mastery Trace</div>
            </div>
            <div>
              <div className="font-bold text-base text-violet-400">0%</div>
              <div className="text-slate-400">Hallucination</div>
            </div>
          </div>
        </motion.div>

        {/* HERO VISUAL: Interactive Terminal Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-6 relative z-10"
        >
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl p-6 space-y-5 relative overflow-hidden group">
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-slate-400">Source Grounding Inspector</span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Verified
              </span>
            </div>

            {/* Tab Switcher */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('video')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'video'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'bg-slate-950/50 text-slate-400 border border-slate-800/60 hover:text-slate-200'
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
                    : 'bg-slate-950/50 text-slate-400 border border-slate-800/60 hover:text-slate-200'
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
                    : 'bg-slate-950/50 text-slate-400 border border-slate-800/60 hover:text-slate-200'
                }`}
              >
                <Presentation className="w-3.5 h-3.5 text-amber-400" />
                <span>Slide · 12</span>
              </button>
            </div>

            {/* Content Display based on active tab */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-200">Query: "What are Deadlock conditions?"</span>
                <span className="text-[10px] font-mono text-cyan-400">RAG Confidence: 0.98</span>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                Deadlock requires four necessary conditions simultaneously: mutual exclusion, hold and wait, no preemption, and circular wait.
              </p>

              {/* Interactive Source Inspector Popup Toggle */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-violet-300 font-semibold flex items-center gap-1">
                      <Search className="w-3 h-3 text-cyan-400" /> Matched Chunk Snippet
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

            {/* Interactive Source Popup Preview */}
            {showSourceModal && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-x-4 bottom-4 bg-slate-900/95 border border-cyan-500/30 rounded-xl p-4 shadow-2xl backdrop-blur-md space-y-2 z-20"
              >
                <div className="flex items-center justify-between text-xs font-bold text-cyan-400 border-b border-slate-800 pb-2">
                  <span>Source Document Highlighting (PDF p.231)</span>
                  <button onClick={() => setShowSourceModal(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>
                <div className="p-2 bg-amber-500/20 border border-amber-500/30 rounded text-[11px] text-amber-200">
                  Highlighted Match: "Deadlock can arise only if mutual exclusion, hold and wait, no preemption and circular wait all hold..."
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </section>

      {/* THE FRAGMENTATION PROBLEM - Bento Grid */}
      <section className="space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="font-head text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Study Material Fragmentation Problem
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Exam preparation involves scattered resources. Finding specific explanations across hours of recordings and dense textbooks wastes study time.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Unindexed Video */}
          <div className="group rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 space-y-4 hover:border-rose-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/5">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <Video className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Unindexed Video</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Searching for a 30-second explanation in a 90-minute recording takes hours without automatic timestamp indexing.
            </p>
          </div>

          {/* Card 2: Dense Textbooks */}
          <div className="group rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 space-y-4 hover:border-teal-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/5">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Dense Textbooks</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Navigating hundreds of textbook pages without direct concept mapping leads to cognitive fatigue and missed context.
            </p>
          </div>

          {/* Card 3: AI Hallucinations */}
          <div className="group rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 space-y-4 hover:border-amber-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">AI Hallucinations</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generic LLMs state unverified claims without pointing to the exact textbook page or lecture timestamp.
            </p>
          </div>

          {/* Card 4: Static Practice */}
          <div className="group rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 space-y-4 hover:border-violet-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/5">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Static Practice</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Fixed question sets fail to adapt to individual concept mastery gaps, causing inefficient revision loops.
            </p>
          </div>
        </div>
      </section>

      {/* FOUR PILLARS */}
      <section className="space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="font-head text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Four Pillars of AI Study Companion
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            A cohesive system unifying multimodal materials with adaptive knowledge tracing.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Pillar Selector list */}
          <div className="lg:col-span-5 space-y-3">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const active = activePillar === idx;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillar(idx)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 border flex items-start gap-4 ${
                    active
                      ? 'bg-slate-900 border-violet-500/50 shadow-lg shadow-violet-500/10'
                      : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  <div className={`p-2.5 rounded-lg bg-gradient-to-r ${pillar.color} text-white shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">{pillar.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{pillar.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Card Display */}
          <div className="lg:col-span-7 rounded-2xl bg-slate-900 border border-slate-800 p-8 space-y-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-violet-400 uppercase tracking-wider">
                Pillar {activePillar + 1} Spotlight
              </span>
            </div>

            <h3 className="font-head text-2xl font-bold text-white">
              {pillars[activePillar].title} Architecture
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              {pillars[activePillar].description}
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-400 space-y-1">
              <span className="text-slate-500 uppercase block text-[10px]">Real-time Pipeline Status</span>
              <div>➜ {pillars[activePillar].action}</div>
            </div>
          </div>
        </div>
      </section>

      {/* PIPELINE ARCHITECTURE - Connected Stepper */}
      <section className="space-y-8 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 sm:p-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="font-head text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How the Pipeline Operates
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            From raw video &amp; PDF ingestion to real-time Bayesian Knowledge Tracing updates.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Step 1 */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-3 relative">
            <span className="text-xs font-mono font-bold text-violet-400">STEP 01</span>
            <h3 className="font-bold text-base text-white">Ingestion &amp; Chunking</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Whisper transcribes lecture recordings; OCR extracts text from PDFs &amp; PPT slides before embedding into a vector store.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-3 relative">
            <span className="text-xs font-mono font-bold text-teal-400">STEP 02</span>
            <h3 className="font-bold text-base text-white">Grounded Retrieval</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Hybrid vector search retrieves relevant chunks. If confidence is low, the engine abstains to prevent false answers.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-3 relative">
            <span className="text-xs font-mono font-bold text-amber-400">STEP 03</span>
            <h3 className="font-bold text-base text-white">Adaptive BKT Loop</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Responses update concept probability <span className="font-mono text-cyan-300">P(L)</span> using slip and guess parameters, adjusting question difficulty.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative rounded-3xl bg-gradient-to-br from-violet-900/40 via-slate-900 to-cyan-900/30 border border-violet-500/20 p-10 sm:p-12 text-center space-y-6 overflow-hidden">
        <h2 className="font-head text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Ready to experience source-grounded learning?
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
          Start your diagnostic assessment to calibrate your personalized Bayesian knowledge trace.
        </p>
        <Link
          href="/onboarding"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:opacity-95 transition-all shadow-xl shadow-violet-500/25 hover:shadow-violet-500/40"
        >
          <span>Begin Onboarding Assessment</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

    </div>
  );
}
