'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, MessageSquare, Award, FileText, CheckCircle, Upload } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const NAV_ITEMS = [
  { href: '/chat', label: 'Tutor Chat', icon: MessageSquare },
  { href: '/sources', label: 'Sources', icon: Upload },
  { href: '/kb', label: 'Knowledge Base', icon: BookOpen },
  { href: '/assessments', label: 'Adaptive Quiz', icon: CheckCircle },
  { href: '/mastery', label: 'Mastery', icon: Award },
  { href: '/revision', label: 'Revision', icon: FileText },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-bg text-ink">
      {/* Desktop Sidebar Nav */}
      <aside className="hidden w-64 flex-col border-r border-line bg-bg2 p-4 md:flex justify-between">
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-line">
            <Link href="/" className="font-head text-xl font-bold text-deep dark:text-teal">
              📚 AI Study Companion
            </Link>
            <ThemeToggle />
          </div>
          <nav className="mt-6 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm transition ${
                    active
                      ? 'bg-teal text-white'
                      : 'text-mut hover:bg-bg hover:text-ink'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="text-xs text-mut border-t border-line pt-4">
          IIT Mandi Track D · Personalized Tutoring
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="flex items-center justify-between border-b border-line bg-bg2 p-4 md:hidden">
        <Link href="/" className="font-head text-lg font-bold text-deep dark:text-teal">
          📚 AI Study Companion
        </Link>
        <ThemeToggle />
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto pb-20 md:pb-8">
        {children}
      </main>

      {/* Mobile Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 flex border-t border-line bg-bg2 p-2 md:hidden justify-around z-50">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 p-1 text-xs font-semibold ${
                active ? 'text-teal' : 'text-mut'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label.split(' ')[0]}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
