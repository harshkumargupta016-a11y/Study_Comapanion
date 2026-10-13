'use client';

import React, { useState, useEffect } from 'react';
import { getFlashcards } from '@/lib/api';
import { Flashcard } from '@/lib/schemas';
import { Volume2, Sparkles } from 'lucide-react';

export default function RevisionHubPage() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    getFlashcards().then(setCards);
  }, []);

  const currentCard = cards[currentIndex];

  const handleRating = () => {
    setIsFlipped(false);
    if (currentIndex + 1 < cards.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
          Active Revision Hub
        </h1>
        <p className="text-xs sm:text-sm text-mut mt-1">
          Spaced-repetition flashcards and synthesized audio briefs grounded in source material citations.
        </p>
      </div>

      {/* Audio Brief Player */}
      <div className="card-subtle rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 bg-card">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-coral/10 flex items-center justify-center text-coral">
            <Volume2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-xs sm:text-sm text-ink">3-Minute Audio Brief: Deadlock &amp; Synchronization</h3>
            <p className="text-[11px] text-mut">Synthesized audio explanation grounded in Lecture 7 &amp; Textbook p.231</p>
          </div>
        </div>
        <button
          onClick={() => setIsPlayingAudio(!isPlayingAudio)}
          className="px-4 py-2 rounded-lg bg-coral text-white font-semibold text-xs hover:bg-coral/90 transition-colors shadow-sm"
        >
          {isPlayingAudio ? 'Pause Audio Brief' : 'Play Audio Brief'}
        </button>
      </div>

      {/* Flashcard Component */}
      {currentCard && (
        <div className="space-y-4">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full h-64 card-subtle rounded-2xl p-6 flex flex-col justify-between cursor-pointer hover:border-indigo transition-all shadow-sm text-center bg-card relative select-none"
          >
            <div className="text-[10px] font-bold text-indigo uppercase tracking-wider flex items-center justify-center gap-1 font-mono">
              <Sparkles className="w-3 h-3 text-indigo" /> Flashcard {currentIndex + 1} of {cards.length} (Click to Flip)
            </div>

            <div className="my-auto text-base sm:text-lg font-bold text-ink leading-relaxed px-4">
              {isFlipped ? currentCard.back : currentCard.front}
            </div>

            <div className="text-[11px] text-mut font-medium">
              Grounding Source: {currentCard.source.label}
            </div>
          </div>

          {/* Rating Buttons */}
          {isFlipped && (
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={handleRating}
                className="py-2.5 rounded-lg bg-coral/10 text-coral font-bold text-xs border border-coral/20 hover:bg-coral/20 transition-colors"
              >
                Again
              </button>
              <button
                onClick={handleRating}
                className="py-2.5 rounded-lg bg-amber/10 text-amber font-bold text-xs border border-amber/20 hover:bg-amber/20 transition-colors"
              >
                Hard
              </button>
              <button
                onClick={handleRating}
                className="py-2.5 rounded-lg bg-teal/10 text-teal font-bold text-xs border border-teal/20 hover:bg-teal/20 transition-colors"
              >
                Good
              </button>
              <button
                onClick={handleRating}
                className="py-2.5 rounded-lg btn-indigo font-bold text-xs shadow-sm"
              >
                Easy
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
