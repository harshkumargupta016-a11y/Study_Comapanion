import { Citation, Question, MasteryPoint, SourceMaterial, ConceptNode, Flashcard, Message } from '../schemas';

export const MOCK_SOURCES: SourceMaterial[] = [
  {
    id: 'src-1',
    title: 'Operating Systems Lecture 7 & 9',
    type: 'video',
    status: 'ready',
    fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    uploadDate: '2026-10-01',
    unitsCount: 10,
  },
  {
    id: 'src-2',
    title: 'Operating Systems Concepts Textbook',
    type: 'pdf',
    status: 'ready',
    fileUrl: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf',
    uploadDate: '2026-10-01',
    unitsCount: 10,
  },
  {
    id: 'src-3',
    title: 'OS Lecture Slides Deck',
    type: 'slide',
    status: 'ready',
    fileUrl: '/slides/os_deck.pdf',
    uploadDate: '2026-10-01',
    unitsCount: 10,
  },
];

export const MOCK_CONCEPTS: ConceptNode[] = [
  { id: 'c-processes', name: 'Processes', description: 'Process control blocks, states, and transitions', prerequisites: [] },
  { id: 'c-scheduling', name: 'Scheduling', description: 'CPU scheduling algorithms like FCFS, SJF, and Round Robin', prerequisites: ['c-processes'] },
  { id: 'c-sync', name: 'Synchronization', description: 'Mutex locks, semaphores, and critical section problems', prerequisites: ['c-processes'] },
  { id: 'c-deadlock', name: 'Deadlock', description: 'Deadlock conditions, prevention, avoidance, and Banker algorithm', prerequisites: ['c-sync'] },
  { id: 'c-memory', name: 'Memory', description: 'Main memory allocation, contiguous allocation, and segmentation', prerequisites: [] },
  { id: 'c-paging', name: 'Paging', description: 'Paging tables, TLBs, and address translation', prerequisites: ['c-memory'] },
  { id: 'c-vmemory', name: 'Virtual Memory', description: 'Demand paging, page fault handling, and page replacement policies', prerequisites: ['c-paging'] },
  { id: 'c-files', name: 'File Systems', description: 'Directory structures, file allocation methods, and inode design', prerequisites: ['c-processes', 'c-memory'] },
];

export const MOCK_UNITS = Array.from({ length: 30 }).map((_, i) => {
  const type = i < 10 ? 'video' : i < 20 ? 'pdf' : 'slide';
  const conceptId = MOCK_CONCEPTS[i % 8].id;
  return {
    id: `unit-${i + 1}`,
    sourceId: type === 'video' ? 'src-1' : type === 'pdf' ? 'src-2' : 'src-3',
    sourceType: type as 'video' | 'pdf' | 'slide',
    title: `Unit ${i + 1}: ${MOCK_CONCEPTS[i % 8].name} Section ${Math.floor(i / 8) + 1}`,
    conceptId,
    citation: {
      unitId: `unit-${i + 1}`,
      sourceId: type === 'video' ? 'src-1' : type === 'pdf' ? 'src-2' : 'src-3',
      sourceType: type as 'video' | 'pdf' | 'slide',
      label: type === 'video' ? `Lecture ${i + 1} · ${i * 2}:30` : type === 'pdf' ? `Textbook p.${i * 15 + 10}` : `Slide ${i + 1}`,
      page: type === 'pdf' ? i * 15 + 10 : null,
      slideNo: type === 'slide' ? i + 1 : null,
      tsStart: type === 'video' ? i * 150 : null,
      tsEnd: type === 'video' ? i * 150 + 120 : null,
      quote: `Core verified source statement regarding ${MOCK_CONCEPTS[i % 8].name} in operating systems.`,
    } as Citation,
  };
});

export const MOCK_QUESTIONS: Question[] = Array.from({ length: 30 }).map((_, i) => {
  const concept = MOCK_CONCEPTS[i % 8];
  const unit = MOCK_UNITS[i];
  const type = i % 3 === 0 ? 'mcq' : i % 3 === 1 ? 'short' : 'numerical';
  const difficulty = ((i % 3) + 1) as 1 | 2 | 3;

  return {
    id: `q-${i + 1}`,
    type,
    stem: `Question ${i + 1} regarding ${concept.name}: What is the primary characteristic of this ${concept.name} mechanism?`,
    options: type === 'mcq' ? [
      `Correct primary mechanism for ${concept.name}`,
      `Confused with standard I/O polling`,
      `Incorrect assumption of static priority assignment`,
      `Ignores context switching overhead`
    ] : undefined,
    correctOptionIndex: type === 'mcq' ? 0 : undefined,
    correctAnswer: type !== 'mcq' ? (type === 'numerical' ? '42' : 'Mutual exclusion') : undefined,
    conceptId: concept.id,
    difficulty,
    source: unit.citation,
    misconceptions: type === 'mcq' ? {
      "1": "Confuses asynchronous polling with interrupt driven I/O handling.",
      "2": "Assumes static process priority rather than dynamic aging.",
      "3": "Neglects save/restore CPU state context switch penalty."
    } : undefined,
  };
});

export const MOCK_FLASHCARDS: Flashcard[] = Array.from({ length: 12 }).map((_, i) => {
  const concept = MOCK_CONCEPTS[i % 8];
  const unit = MOCK_UNITS[i];
  return {
    id: `fc-${i + 1}`,
    conceptId: concept.id,
    front: `What are the necessary principles behind ${concept.name}?`,
    back: `The fundamental principles of ${concept.name} include strictly guaranteed system invariants and resource constraints.`,
    source: unit.citation,
  };
});

export const MOCK_CHAT_PAIRS = [
  {
    userQuestion: "What are the four conditions for deadlock?",
    assistantMessage: {
      id: "msg-1",
      role: "assistant" as const,
      content: "Deadlock can arise only if four necessary conditions hold simultaneously: mutual exclusion, hold and wait, no preemption, and circular wait [cite:b_p231] [cite:s_slide12]. Removing any single condition ensures that the system can never enter a deadlock state [cite:v_lec7_1432].",
      citations: [
        {
          unitId: "unit-1",
          sourceId: "src-1",
          sourceType: "video" as const,
          label: "Lecture 7 · 14:32",
          tsStart: 872,
          quote: "remove any one of these four conditions and the system can never deadlock"
        },
        {
          unitId: "unit-2",
          sourceId: "src-2",
          sourceType: "pdf" as const,
          label: "Textbook p.231",
          page: 231,
          quote: "Deadlock can arise only if mutual exclusion, hold and wait, no preemption and circular wait all hold at the same time."
        },
        {
          unitId: "unit-3",
          sourceId: "src-3",
          sourceType: "slide" as const,
          label: "Slide 12",
          slideNo: 12,
          quote: "Deadlock: necessary conditions - Mutual exclusion, Hold and wait, No preemption, Circular wait"
        }
      ],
      grounded: true,
      timestamp: new Date().toISOString()
    }
  },
  {
    userQuestion: "How does Round Robin differ from FCFS?",
    assistantMessage: {
      id: "msg-2",
      role: "assistant" as const,
      content: "Round Robin scheduling assigns a fixed time quantum with preemptive rotation to processes. When the configured time quantum becomes exceptionally large, Round Robin degenerates and behaves identically to First-Come, First-Served (FCFS).",
      citations: [
        {
          unitId: "unit-4",
          sourceId: "src-1",
          sourceType: "video" as const,
          label: "Lecture 4 · 08:10",
          tsStart: 490,
          quote: "with a huge quantum, round robin just behaves like first come, first served"
        }
      ],
      grounded: true,
      timestamp: new Date().toISOString()
    }
  }
];

export const MOCK_OFF_MATERIAL_QUESTIONS = [
  "Who won the 2022 football World Cup?",
  "What is the population of Paris in 2026?"
];
