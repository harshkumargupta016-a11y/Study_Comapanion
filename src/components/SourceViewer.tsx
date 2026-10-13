'use client';

import React from 'react';
import { Citation } from '@/lib/schemas';
import { Video, FileText, Presentation, X, ExternalLink } from 'lucide-react';

interface SourceViewerProps {
  citation: Citation | null;
  onClose?: () => void;
}

export function SourceViewer({ citation, onClose }: SourceViewerProps) {
  if (!citation) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center bg-bg2 rounded-2xl border border-line">
        <FileText className="w-10 h-10 text-mut mb-2 opacity-40" />
        <h3 className="font-bold text-sm text-ink">Source Document Inspector</h3>
        <p className="text-xs text-mut max-w-xs mt-1">
          Click any inline citation chip in the chat response to open the exact textbook page, video timestamp, or lecture slide.
        </p>
      </div>
    );
  }

  const isVideo = citation.sourceType === 'video';
  const isPdf = citation.sourceType === 'pdf';
  const isSlide = citation.sourceType === 'slide';

  return (
    <div className="h-full flex flex-col bg-card rounded-2xl border border-line shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-3.5 bg-bg2 border-b border-line flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`p-1.5 rounded-md text-xs font-bold ${
              isVideo ? 'bg-coral/10 text-coral' : isPdf ? 'bg-teal/10 text-teal' : 'bg-amber/10 text-amber'
            }`}
          >
            {isVideo ? <Video className="w-4 h-4" /> : isPdf ? <FileText className="w-4 h-4" /> : <Presentation className="w-4 h-4" />}
          </span>
          <div>
            <h4 className="font-bold text-xs text-ink">{citation.label}</h4>
            <span className="text-[10px] text-mut uppercase font-semibold">Verified Grounded Source</span>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1 rounded-md hover:bg-line text-mut">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Content Viewer */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
        {isVideo && (
          <div className="space-y-3">
            <div className="aspect-video bg-black rounded-xl overflow-hidden flex items-center justify-center text-white relative">
              <video
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono">
                Seek: {citation.tsStart ?? 0}s
              </span>
            </div>
            <div className="p-3 bg-coral/10 border border-coral/20 rounded-xl text-ink">
              <span className="text-[10px] font-bold text-coral uppercase block">Transcript Quote</span>
              <p className="italic mt-1">"{citation.quote}"</p>
            </div>
          </div>
        )}

        {isPdf && (
          <div className="space-y-3">
            <div className="h-64 bg-bg2 border border-line rounded-xl p-4 overflow-y-auto space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-teal border-b border-line pb-2">
                <span>Textbook Page {citation.page ?? 1}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
              <div className="p-3 bg-amber/20 rounded-lg border border-amber/30 text-ink">
                <span className="text-[10px] font-bold text-amber uppercase block mb-1">
                  Matched Passage
                </span>
                "{citation.quote}"
              </div>
              <p className="text-mut leading-relaxed">
                ...Operating system resource allocation protocols require strict guarantees to eliminate deadlock states. When processes request resources, system state transitions are calculated...
              </p>
            </div>
          </div>
        )}

        {isSlide && (
          <div className="space-y-3">
            <div className="bg-bg2 p-5 rounded-xl border border-line space-y-2">
              <span className="text-[10px] font-bold text-amber uppercase">Slide {citation.slideNo ?? 1} Deck</span>
              <h3 className="font-bold text-sm text-ink">Deadlock &amp; Resource Constraints</h3>
              <ul className="list-disc pl-4 text-xs space-y-1 text-mut">
                <li className="font-semibold text-ink">"{citation.quote}"</li>
                <li>Mutual Exclusion</li>
                <li>Hold &amp; Wait</li>
                <li>No Preemption</li>
                <li>Circular Wait</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
