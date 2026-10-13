'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  MessageSquare,
  Award,
  FileText,
  CheckCircle2,
  Upload,
  Compass,
  ArrowRight,
  Menu,
  X,
  Sparkles,
  Search,
  User,
  Settings
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const NAV_ITEMS = [
  { href: '/chat', label: 'Tutor Chat', icon: MessageSquare },
  { href: '/sources', label: 'Sources', icon: Upload },
  { href: '/kb', label: 'Knowledge Base', icon: BookOpen },
  { href: '/assessments', label: 'Adaptive Quiz', icon: CheckCircle2 },
  { href: '/mastery', label: 'Mastery', icon: Award },
  { href: '/revision', label: 'Revision', icon: FileText },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col font-sans antialiased selection:bg-indigo/20 selection:text-indigo">
      {/* Top Glassmorphism Navigation Bar */}
      <header className="sticky top-0 z-50 glass-panel border-b border-line transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Brand Identity */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-indigo flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform duration-200">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-bold text-base tracking-tight text-ink">
                Study Companion
              </span>
            </Link>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-indigo/10 text-indigo border border-indigo/20">
              <Sparkles className="w-3 h-3" />
              IIT Mandi · Track D
            </span>
          </div>

          {/* Central Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-bg2/80 p-1 rounded-full border border-line">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    active
                      ? 'text-white'
                      : 'text-mut hover:text-ink hover:bg-card/60'
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-indigo shadow-sm"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5" />
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            <Link
              href="/onboarding"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold btn-indigo shadow-sm"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-bg2 border border-line text-mut hover:text-ink"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden sticky top-16 z-40 bg-card border-b border-line shadow-lg overflow-hidden"
          >
            <div className="p-4 space-y-1">
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? 'bg-indigo/10 text-indigo font-semibold'
                        : 'text-mut hover:bg-bg2 hover:text-ink'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-3 border-t border-line mt-2">
                <Link
                  href="/onboarding"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-semibold btn-indigo shadow-sm"
                >
                  Get Started <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-line bg-card py-8 px-4 text-xs text-mut">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-ink">Study Companion</span>
            <span>·</span>
            <span>IIT Mandi Multimodal Hackathon Track D</span>
          </div>
          <div className="text-mut">
            Source-Grounded Personalized Tutoring &amp; Adaptive Learning
          </div>
        </div>
      </footer>
    </div>
  );
}
