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
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-bg2 rounded-3xl border border-line">
        <FileText className="w-12 h-12 text-mut mb-3 opacity-50" />
        <h3 className="font-head text-lg font-bold text-deep dark:text-teal">Source Document Viewer</h3>
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
    <div className="h-full flex flex-col bg-bg rounded-3xl border border-line shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-bg2 border-b border-line flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`p-2 rounded-xl text-xs font-bold text-white ${
              isVideo ? 'bg-coral' : isPdf ? 'bg-teal' : 'bg-amber text-ink'
            }`}
          >
            {isVideo ? <Video className="w-4 h-4" /> : isPdf ? <FileText className="w-4 h-4" /> : <Presentation className="w-4 h-4" />}
          </span>
          <div>
            <h4 className="font-bold text-sm">{citation.label}</h4>
            <span className="text-[10px] text-mut uppercase font-semibold">Verified Grounded Source</span>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-line text-mut">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Content Viewer */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {isVideo && (
          <div className="space-y-3">
            <div className="aspect-video bg-black rounded-2xl overflow-hidden flex items-center justify-center text-white text-xs relative">
              <video
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 left-2 bg-black/70 px-2 py-0.5 rounded text-[10px] font-mono">
                Seek: {citation.tsStart ?? 0}s
              </span>
            </div>
            <div className="p-3 bg-coral/10 border border-coral/30 rounded-xl">
              <span className="text-[10px] font-bold text-coral uppercase block">Transcript Quote</span>
              <p className="text-xs text-ink italic mt-1">"{citation.quote}"</p>
            </div>
          </div>
        )}

        {isPdf && (
          <div className="space-y-3">
            <div className="h-64 bg-bg2 border border-line rounded-2xl p-4 overflow-y-auto space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-teal border-b border-line pb-2">
                <span>Textbook Page {citation.page ?? 1}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
              <div className="p-3 bg-amber/30 rounded-xl border border-amber/40 text-xs font-medium">
                <span className="text-[10px] font-bold text-amber-900 dark:text-amber uppercase block mb-1">
                  Matched Passage
                </span>
                "{citation.quote}"
              </div>
              <p className="text-xs text-mut leading-relaxed">
                ...Operating system resource allocation protocols require strict guarantees to eliminate deadlock states. When processes request resources, system state transitions are calculated...
              </p>
            </div>
          </div>
        )}

        {isSlide && (
          <div className="space-y-3">
            <div className="bg-deep text-white p-6 rounded-2xl border border-line space-y-3">
              <span className="text-xs font-bold text-amber uppercase">Slide {citation.slideNo ?? 1} Deck</span>
              <h3 className="font-head text-lg font-bold">Deadlock & Resource Constraints</h3>
              <ul className="list-disc pl-5 text-xs space-y-1 text-slate-200">
                <li className="font-bold text-amber">"{citation.quote}"</li>
                <li>Mutual Exclusion</li>
                <li>Hold & Wait</li>
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
