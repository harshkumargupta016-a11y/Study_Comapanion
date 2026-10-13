'use client';

import React, { useState } from 'react';
import { uploadSource, getSources } from '@/lib/api';
import { SourceMaterial, SourceStatus } from '@/lib/schemas';
import { Video, FileText, Presentation, Upload, CheckCircle2, Loader2, Layers } from 'lucide-react';

const STAGES: { stage: SourceStatus; label: string }[] = [
  { stage: 'uploaded', label: 'Uploaded' },
  { stage: 'extracting', label: 'Extracting Content' },
  { stage: 'indexing', label: 'Indexing Vectors' },
  { stage: 'concepts', label: 'Mapping Concepts' },
  { stage: 'ready', label: 'Ready' },
];

export default function SourcesPage() {
  const [sources, setSources] = useState<SourceMaterial[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  React.useEffect(() => {
    getSources().then(setSources);
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const newSource = await uploadSource(file);
    setSources((prev) => [...prev, newSource]);

    // Simulate progress stages
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
    <div className="max-w-5xl mx-auto space-y-8 py-6">
      <div>
        <h1 className="font-head text-3xl font-bold text-deep dark:text-teal">
          Source Material Library
        </h1>
        <p className="text-sm text-mut mt-1">
          Upload multimodal lecture videos, textbooks (PDF), and slide decks (PPTX) to expand the knowledge base.
        </p>
      </div>

      {/* Drag and Drop Zone */}
      <div className="border-2 border-dashed border-line rounded-3xl bg-bg2 p-8 text-center hover:border-teal transition cursor-pointer relative">
        <input
          type="file"
          accept=".mp4,.pdf,.pptx"
          onChange={handleFileUpload}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center text-teal">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <p className="font-bold text-base">Drag & drop files here, or click to browse</p>
            <p className="text-xs text-mut mt-1">Supports Video (.mp4), Textbooks (.pdf), Slide Decks (.pptx)</p>
          </div>
        </div>
      </div>

      {/* Source Cards */}
      <div className="space-y-4">
        <h2 className="font-head text-xl font-bold">Ingested Course Sources</h2>
        <div className="grid gap-4">
          {sources.map((src) => {
            const Icon = src.type === 'video' ? Video : src.type === 'pdf' ? FileText : Presentation;
            const badgeColor =
              src.type === 'video' ? 'text-coral bg-coral/10' : src.type === 'pdf' ? 'text-teal bg-teal/10' : 'text-amber-900 bg-amber/20 dark:text-amber';

            return (
              <div key={src.id} className="bg-bg border border-line rounded-2xl p-5 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${badgeColor}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base">{src.title}</h3>
                      <p className="text-xs text-mut">Uploaded on {src.uploadDate}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-bg2 border border-line capitalize">
                    {src.type}
                  </span>
                </div>

                {/* Stepper */}
                <div className="grid grid-cols-5 gap-2 pt-2 border-t border-line">
                  {STAGES.map((s, idx) => {
                    const currentIdx = STAGES.findIndex((st) => st.stage === src.status);
                    const isDone = idx <= currentIdx;
                    const isCurrent = idx === currentIdx && src.status !== 'ready';

                    return (
                      <div key={s.stage} className="text-center space-y-1">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            isDone ? 'bg-teal' : 'bg-line'
                          }`}
                        />
                        <span className="text-[10px] font-bold text-mut block truncate">
                          {s.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {src.status === 'ready' && (
                  <div className="flex items-center justify-between pt-2 text-xs text-teal font-semibold">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Ready for grounding
                    </span>
                    <span className="flex items-center gap-1 text-mut">
                      <Layers className="w-4 h-4" /> {src.unitsCount} Extracted Units
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
