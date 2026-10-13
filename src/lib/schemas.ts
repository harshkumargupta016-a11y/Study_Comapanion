import { z } from 'zod';

export const CitationSchema = z.object({
  unitId: z.string(),
  sourceId: z.string(),
  sourceType: z.enum(['video', 'pdf', 'slide']),
  label: z.string(),
  page: z.number().nullable().optional(),
  slideNo: z.number().nullable().optional(),
  tsStart: z.number().nullable().optional(),
  tsEnd: z.number().nullable().optional(),
  quote: z.string(),
});
export type Citation = z.infer<typeof CitationSchema>;

export const MessageSchema = z.object({
  id: z.string(),
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string(),
  citations: z.array(CitationSchema).default([]),
  grounded: z.boolean(),
  outsideKnowledge: z.string().optional(),
  timestamp: z.string().optional(),
});
export type Message = z.infer<typeof MessageSchema>;

export const QuestionSchema = z.object({
  id: z.string(),
  type: z.enum(['mcq', 'short', 'numerical']),
  stem: z.string(),
  options: z.array(z.string()).optional(),
  correctOptionIndex: z.number().optional(),
  correctAnswer: z.string().optional(),
  conceptId: z.string(),
  difficulty: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  source: CitationSchema,
  misconceptions: z.record(z.string(), z.string()).optional(),
});
export type Question = z.infer<typeof QuestionSchema>;

export const MasteryPointSchema = z.object({
  conceptId: z.string(),
  conceptName: z.string(),
  pKnown: z.number().min(0).max(1),
  nObs: z.number(),
  dueAt: z.string(),
  prerequisites: z.array(z.string()).default([]),
});
export type MasteryPoint = z.infer<typeof MasteryPointSchema>;

export const SourceStatusSchema = z.enum([
  'uploaded',
  'extracting',
  'indexing',
  'concepts',
  'ready',
]);
export type SourceStatus = z.infer<typeof SourceStatusSchema>;

export const SourceMaterialSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.enum(['video', 'pdf', 'slide']),
  status: SourceStatusSchema,
  fileUrl: z.string(),
  uploadDate: z.string(),
  unitsCount: z.number(),
});
export type SourceMaterial = z.infer<typeof SourceMaterialSchema>;

export const ConceptNodeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  prerequisites: z.array(z.string()),
});
export type ConceptNode = z.infer<typeof ConceptNodeSchema>;

export const FlashcardSchema = z.object({
  id: z.string(),
  conceptId: z.string(),
  front: z.string(),
  back: z.string(),
  source: CitationSchema,
});
export type Flashcard = z.infer<typeof FlashcardSchema>;
