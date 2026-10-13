import {
  MOCK_SOURCES,
  MOCK_CONCEPTS,
  MOCK_UNITS,
  MOCK_QUESTIONS,
  MOCK_FLASHCARDS,
  MOCK_CHAT_PAIRS,
  MOCK_OFF_MATERIAL_QUESTIONS,
} from '../mock/data';
import {
  SourceMaterial,
  ConceptNode,
  Question,
  MasteryPoint,
  Flashcard,
  Message,
  MessageSchema,
} from '../schemas';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== 'false';

export async function uploadSource(file: File): Promise<SourceMaterial> {
  if (USE_MOCK) {
    const newSource: SourceMaterial = {
      id: `src-${Date.now()}`,
      title: file.name,
      type: file.name.endsWith('.mp4') ? 'video' : file.name.endsWith('.pptx') ? 'slide' : 'pdf',
      status: 'uploaded',
      fileUrl: URL.createObjectURL(file),
      uploadDate: new Date().toISOString().split('T')[0],
      unitsCount: 0,
    };
    MOCK_SOURCES.push(newSource);
    return newSource;
  }
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch('/api/sources', { method: 'POST', body: formData });
  return res.json();
}

export async function getSources(): Promise<SourceMaterial[]> {
  if (USE_MOCK) return [...MOCK_SOURCES];
  const res = await fetch('/api/sources');
  return res.json();
}

export async function getSourceStatus(id: string): Promise<SourceMaterial> {
  if (USE_MOCK) {
    const source = MOCK_SOURCES.find((s) => s.id === id);
    if (!source) throw new Error('Source not found');
    return source;
  }
  const res = await fetch(`/api/sources/${id}/status`);
  return res.json();
}

export async function getKnowledgeGraph(): Promise<ConceptNode[]> {
  if (USE_MOCK) return [...MOCK_CONCEPTS];
  const res = await fetch('/api/kb/graph');
  return res.json();
}

export async function getKnowledgeUnit(id: string) {
  if (USE_MOCK) {
    const unit = MOCK_UNITS.find((u) => u.id === id);
    if (!unit) throw new Error('Unit not found');
    return unit;
  }
  const res = await fetch(`/api/kb/units/${id}`);
  return res.json();
}

export async function sendChatMessage(content: string): Promise<Message> {
  if (USE_MOCK) {
    const isOffMaterial = MOCK_OFF_MATERIAL_QUESTIONS.some((q) =>
      content.toLowerCase().includes(q.toLowerCase())
    );

    if (isOffMaterial) {
      return MessageSchema.parse({
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content:
          'I am instructed to rely exclusively on the provided course material. I cannot answer this query as it falls outside the retrieved knowledge base context.',
        citations: [],
        grounded: false,
        outsideKnowledge: 'Sports / General Knowledge domain',
        timestamp: new Date().toISOString(),
      });
    }

    const matched = MOCK_CHAT_PAIRS.find((p) =>
      p.userQuestion.toLowerCase().includes(content.toLowerCase())
    );

    if (matched) {
      return MessageSchema.parse(matched.assistantMessage);
    }

    return MessageSchema.parse({
      id: `msg-${Date.now()}`,
      role: 'assistant',
      content: `Regarding your query on "${content}": The operating systems course materials state that process states and synchronization primitives strictly ensure system consistency [cite:b_p231].`,
      citations: [MOCK_UNITS[0].citation],
      grounded: true,
      timestamp: new Date().toISOString(),
    });
  }

  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
  return res.json();
}

export async function getAssessments(): Promise<Question[]> {
  if (USE_MOCK) return [...MOCK_QUESTIONS];
  const res = await fetch('/api/assessments');
  return res.json();
}

export async function submitAssessment(
  id: string,
  answer: string
): Promise<{ correct: boolean; explanation: string; misconception?: string }> {
  if (USE_MOCK) {
    const q = MOCK_QUESTIONS.find((item) => item.id === id);
    if (!q) throw new Error('Question not found');

    const isCorrect =
      q.type === 'mcq'
        ? Number(answer) === q.correctOptionIndex
        : answer.trim().toLowerCase() === q.correctAnswer?.toLowerCase();

    const misconception =
      !isCorrect && q.misconceptions ? q.misconceptions[answer] || 'General concept error' : undefined;

    return {
      correct: isCorrect,
      explanation: isCorrect
        ? `Correct! Grounded in ${q.source.label}: "${q.source.quote}"`
        : `Incorrect. Refer to ${q.source.label}: "${q.source.quote}"`,
      misconception,
    };
  }

  const res = await fetch(`/api/assessments/${id}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answer }),
  });
  return res.json();
}

export async function getLearnerMastery(): Promise<MasteryPoint[]> {
  if (USE_MOCK) {
    return MOCK_CONCEPTS.map((c, i) => ({
      conceptId: c.id,
      conceptName: c.name,
      pKnown: Math.min(0.3 + i * 0.08, 0.95),
      nObs: 5 + i,
      dueAt: new Date(Date.now() + i * 86400000).toISOString(),
      prerequisites: c.prerequisites,
    }));
  }
  const res = await fetch('/api/learner/mastery');
  return res.json();
}

export async function getLearnerMasteryHistory(): Promise<Array<{ date: string; mastery: number }>> {
  if (USE_MOCK) {
    return [
      { date: '2026-10-01', mastery: 0.25 },
      { date: '2026-10-05', mastery: 0.42 },
      { date: '2026-10-10', mastery: 0.58 },
      { date: '2026-10-14', mastery: 0.71 },
    ];
  }
  const res = await fetch('/api/learner/mastery/history');
  return res.json();
}

export async function postDiagnostic(): Promise<{ initialMastery: MasteryPoint[] }> {
  if (USE_MOCK) {
    return { initialMastery: await getLearnerMastery() };
  }
  const res = await fetch('/api/learner/diagnostic', { method: 'POST' });
  return res.json();
}

export async function getFlashcards(): Promise<Flashcard[]> {
  if (USE_MOCK) return [...MOCK_FLASHCARDS];
  const res = await fetch('/api/revision/flashcards');
  return res.json();
}

export async function scheduleRevision(conceptIds: string[]): Promise<{ scheduled: boolean; date: string }> {
  if (USE_MOCK) {
    return { scheduled: true, date: new Date(Date.now() + 86400000).toISOString() };
  }
  const res = await fetch('/api/schedule', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ conceptIds }),
  });
  return res.json();
}

export async function getEvalResults(): Promise<{ recallAtK: number; citationAccuracy: number; ragasScore: number }> {
  if (USE_MOCK) {
    return {
      recallAtK: 0.92,
      citationAccuracy: 0.98,
      ragasScore: 0.89,
    };
  }
  const res = await fetch('/api/eval/results');
  return res.json();
}
