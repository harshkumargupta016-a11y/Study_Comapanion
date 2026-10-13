import { create } from 'zustand';
import { MasteryPoint } from '@/lib/schemas';
import { updateBKT } from '@/lib/bkt';

interface MasteryState {
  masteryPoints: MasteryPoint[];
  setMasteryPoints: (points: MasteryPoint[]) => void;
  recordObservation: (conceptId: string, correct: boolean) => void;
}

export const useMasteryStore = create<MasteryState>((set) => ({
  masteryPoints: [],
  setMasteryPoints: (points) => set({ masteryPoints: points }),
  recordObservation: (conceptId, correct) =>
    set((state) => ({
      masteryPoints: state.masteryPoints.map((m) => {
        if (m.conceptId === conceptId) {
          const updatedPKnown = updateBKT(m.pKnown, correct);
          return {
            ...m,
            pKnown: updatedPKnown,
            nObs: m.nObs + 1,
          };
        }
        return m;
      }),
    })),
}));
