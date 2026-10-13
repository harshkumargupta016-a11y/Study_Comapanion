'use client';

import React, { useState, useEffect } from 'react';
import { uploadSource, getSources } from '@/lib/api';
import { SourceMaterial, SourceStatus } from '@/lib/schemas';
import { Video, FileText, Presentation, Upload, CheckCircle2, Layers } from 'lucide-react';

const STAGES: { stage: SourceStatus; label: string }[] = [
  { stage: 'uploaded', label: 'Uploaded' },
  { stage: 'extracting', label: 'Extracting' },
  { stage: 'indexing', label: 'Indexing' },
  { stage: 'concepts', label: 'Mapping' },
  { stage: 'ready', label: 'Ready' },
];

export default function SourcesPage() {
  const [sources, setSources] = useState<SourceMaterial[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    getSources().then(setSources);
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const newSource = await uploadSource(file);
    setSources((prev) => [...prev, newSource]);

    let currentStageIndex = 0;
    const interval = setInterval(() => {
      currentStageIndex++;
      if (currentStageIndex < STAGES.length) {
        const nextStatus = STAGES[currentStageIndex].stage;
        setSources((prev) =>
          prev.map((s) => (s.id === newSource.id ? { ...s, status: nextStatus, unitsCount: nextStatus === 'ready' ? 10 : s.unitsCount } : s))
        );
      } else {
        clearInterval(interval);
        setIsUploading(false);
      }
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 py-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
          Source Material Library
        </h1>
        <p className="text-xs sm:text-sm text-mut mt-1">
          Upload multimodal lecture recordings (MP4), textbook PDFs, and slide decks (PPTX) to build your course knowledge base.
        </p>
      </div>

      {/* Drag & Drop Area */}
      <div className="border-2 border-dashed border-line rounded-2xl bg-card p-8 text-center hover:border-indigo/50 transition-colors cursor-pointer relative card-subtle">
        <input
          type="file"
          accept=".mp4,.pdf,.pptx"
          onChange={handleFileUpload}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-indigo/10 flex items-center justify-center text-indigo">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-sm text-ink">Drag &amp; drop files here, or click to browse</p>
            <p className="text-xs text-mut mt-0.5">Supports Video (.mp4), Textbooks (.pdf), Slide Decks (.pptx)</p>
          </div>
        </div>
      </div>

      {/* Source Cards */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-ink uppercase tracking-wider">Ingested Course Sources</h2>
        <div className="grid gap-3">
          {sources.map((src) => {
            const Icon = src.type === 'video' ? Video : src.type === 'pdf' ? FileText : Presentation;
            const badgeColor =
              src.type === 'video' ? 'text-coral bg-coral/10' : src.type === 'pdf' ? 'text-teal bg-teal/10' : 'text-amber bg-amber/10';

            return (
              <div key={src.id} className="card-subtle rounded-xl p-4 space-y-3 bg-card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-lg ${badgeColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xs sm:text-sm text-ink">{src.title}</h3>
                      <p className="text-[11px] text-mut">Uploaded on {src.uploadDate}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-md bg-bg2 border border-line capitalize text-mut">
                    {src.type}
                  </span>
                </div>

                {/* Progress Stepper */}
                <div className="grid grid-cols-5 gap-2 pt-2 border-t border-line">
                  {STAGES.map((s, idx) => {
                    const currentIdx = STAGES.findIndex((st) => st.stage === src.status);
                    const isDone = idx <= currentIdx;

                    return (
                      <div key={s.stage} className="text-center space-y-1">
                        <div
                          className={`h-1.5 rounded-full transition-all ${
                            isDone ? 'bg-indigo' : 'bg-line'
                          }`}
                        />
                        <span className="text-[10px] font-medium text-mut block truncate">
                          {s.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {src.status === 'ready' && (
                  <div className="flex items-center justify-between pt-1 text-[11px] text-teal font-semibold">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Ready for grounding
                    </span>
                    <span className="flex items-center gap-1 text-mut">
                      <Layers className="w-3.5 h-3.5" /> {src.unitsCount} Extracted Units
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
