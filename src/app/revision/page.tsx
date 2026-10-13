'use client';

import React, { useState, useEffect } from 'react';
import { getFlashcards } from '@/lib/api';
import { Flashcard } from '@/lib/schemas';
import { RotateCw, Volume2, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

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
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      <div>
        <h1 className="font-head text-3xl font-bold text-deep dark:text-teal">
          Active Revision Hub
        </h1>
        <p className="text-sm text-mut mt-1">
          Spaced-repetition flashcards and audio briefs synthesized from source material citations.
        </p>
      </div>

      {/* Audio Brief Player */}
      <div className="bg-bg border border-line rounded-3xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-coral/10 flex items-center justify-center text-coral">
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm">3-Minute Audio Brief: Deadlock &amp; Synchronization</h3>
            <p className="text-xs text-mut">Synthesized audio explanation grounded in Lecture 7 &amp; Textbook p.231</p>
          </div>
        </div>
        <button
          onClick={() => setIsPlayingAudio(!isPlayingAudio)}
          className="px-5 py-2.5 rounded-full bg-coral text-white font-bold text-xs hover:bg-coral/90 transition shadow-md"
        >
          {isPlayingAudio ? 'Pause Audio Brief' : 'Play Audio Brief'}
        </button>
      </div>

      {/* Flashcard Component */}
      {currentCard && (
        <div className="space-y-6">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full h-72 bg-bg border-2 border-line rounded-3xl p-8 flex flex-col justify-between cursor-pointer hover:border-teal transition shadow-sm text-center relative"
          >
            <div className="text-xs font-bold text-teal uppercase tracking-wider flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Flashcard {currentIndex + 1} of {cards.length} (Click to Flip)
            </div>

            <div className="my-auto font-head text-xl md:text-2xl font-bold leading-relaxed">
              {isFlipped ? currentCard.back : currentCard.front}
            </div>

            <div className="text-xs text-mut font-semibold">
              Grounding Source: {currentCard.source.label}
            </div>
          </div>

          {/* Rating Buttons */}
          {isFlipped && (
            <div className="grid grid-cols-4 gap-3">
              <button
                onClick={handleRating}
                className="py-3 rounded-2xl bg-coral/20 text-coral font-bold text-xs border border-coral/30 hover:bg-coral/30 transition"
              >
                Again
              </button>
              <button
                onClick={handleRating}
                className="py-3 rounded-2xl bg-amber/20 text-amber-900 dark:text-amber font-bold text-xs border border-amber/30 hover:bg-amber/30 transition"
              >
                Hard
              </button>
              <button
                onClick={handleRating}
                className="py-3 rounded-2xl bg-teal/20 text-teal font-bold text-xs border border-teal/30 hover:bg-teal/30 transition"
              >
                Good
              </button>
              <button
                onClick={handleRating}
                className="py-3 rounded-2xl bg-teal text-white font-bold text-xs hover:bg-teal/90 transition shadow-md"
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
