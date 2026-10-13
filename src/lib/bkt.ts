import { Question, MasteryPoint } from './schemas';

export interface BKTParams {
  pInit: number;
  pTransit: number;
  pSlip: number;
  pGuess: number;
}

export const DEFAULT_BKT_PARAMS: BKTParams = {
  pInit: 0.25,
  pTransit: 0.1,
  pSlip: 0.1,
  pGuess: 0.2,
};

/**
 * Standard Bayesian Knowledge Tracing (BKT) Update Step.
 * @param pKnown Current estimated probability that the learner knows the concept.
 * @param correct Observed outcome (true for correct, false for incorrect).
 * @param params BKT parameters (pSlip, pGuess, pTransit).
 */
export function updateBKT(
  pKnown: number,
  correct: boolean,
  params: BKTParams = DEFAULT_BKT_PARAMS
): number {
  const { pSlip, pGuess, pTransit } = params;

  let pPosterior: number;
  if (correct) {
    pPosterior = (pKnown * (1 - pSlip)) / (pKnown * (1 - pSlip) + (1 - pKnown) * pGuess);
  } else {
    pPosterior = (pKnown * pSlip) / (pKnown * pSlip + (1 - pKnown) * (1 - pGuess));
  }

  // Learning transition step
  const pUpdated = pPosterior + (1 - pPosterior) * pTransit;
  return Math.min(Math.max(pUpdated, 0.01), 0.99);
}

/**
 * Updates item difficulty / learner ability using Elo-like rating formula.
 */
export function updateEloDifficulty(
  learnerAbility: number,
  questionDifficulty: number,
  correct: boolean,
  kFactor: number = 0.1
): { newAbility: number; newDifficulty: number } {
  const expectedOutcome = 1 / (1 + Math.pow(10, (questionDifficulty - learnerAbility) / 2));
  const actualOutcome = correct ? 1 : 0;

  const newAbility = learnerAbility + kFactor * (actualOutcome - expectedOutcome);
  const newDifficulty = questionDifficulty - kFactor * (actualOutcome - expectedOutcome);

  return { newAbility, newDifficulty };
}

/**
 * Selects the next question targeting ~70% expected success.
 * Prefers concepts with lower mastery and avoids questions already asked in the session.
 */
export function selectNextQuestion(
  questions: Question[],
  masteryPoints: MasteryPoint[],
  answeredQuestionIds: Set<string>,
  targetSuccessRate: number = 0.7
): Question | null {
  const availableQuestions = questions.filter((q) => !answeredQuestionIds.has(q.id));
  if (availableQuestions.length === 0) return null;

  // Map concepts to mastery
  const masteryMap = new Map<string, number>();
  masteryPoints.forEach((m) => masteryMap.set(m.conceptId, m.pKnown));

  // Score available questions based on mastery (lower mastery preferred) and target difficulty match
  let bestQuestion: Question | null = null;
  let minScore = Infinity;

  for (const q of availableQuestions) {
    const conceptMastery = masteryMap.get(q.conceptId) ?? 0.5;
    // Map difficulty 1..3 to estimated success probability for current learner level
    const estimatedSuccess = Math.max(0.2, 1.0 - (q.difficulty * 0.25 - conceptMastery * 0.2));

    const successDiff = Math.abs(estimatedSuccess - targetSuccessRate);
    const score = successDiff + conceptMastery * 0.5; // Weight low-mastery concepts

    if (score < minScore) {
      minScore = score;
      bestQuestion = q;
    }
  }

  return bestQuestion || availableQuestions[0];
}
