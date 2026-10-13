import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MasteryPoint } from '@/lib/schemas';
import { updateBKT } from '@/lib/bkt';

interface MasteryState {
  masteryPoints: MasteryPoint[];
  studyActivity: string[]; // ISO date strings (YYYY-MM-DD) when activity occurred
  lastActiveDate: string | null;
  currentStreak: number;
  setMasteryPoints: (points: MasteryPoint[]) => void;
  recordObservation: (conceptId: string, correct: boolean) => void;
  recordActivity: () => void;
  resetMastery: () => void;
}

function calculateStreak(dates: string[]): number {
  if (!dates || dates.length === 0) return 0;
  const uniqueDates = Array.from(new Set(dates)).sort((a, b) => b.localeCompare(a));
  const today = new Date().toISOString().split('T')[0];
  const yesterdayDate = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  
  if (uniqueDates[0] !== today && uniqueDates[0] !== yesterdayDate) {
    return 0;
  }
  
  let streak = 0;
  let checkDate = new Date(uniqueDates[0]);
  
  for (const dateStr of uniqueDates) {
    const cur = new Date(dateStr);
    const diffTime = checkDate.getTime() - cur.getTime();
    const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
    
    if (diffDays === 0 || diffDays === 1) {
      if (diffDays === 1) {
        checkDate = cur;
      }
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

export const useMasteryStore = create<MasteryState>()(
  persist(
    (set, get) => ({
      masteryPoints: [],
      studyActivity: [],
      lastActiveDate: null,
      currentStreak: 0,
      
      setMasteryPoints: (points) => set({ masteryPoints: points }),
      
      recordActivity: () => {
        const today = new Date().toISOString().split('T')[0];
        const currentActivity = get().studyActivity || [];
        const updatedActivity = currentActivity.includes(today)
          ? currentActivity
          : [...currentActivity, today];
        const newStreak = calculateStreak(updatedActivity);
        
        set({
          studyActivity: updatedActivity,
          lastActiveDate: today,
          currentStreak: newStreak,
        });
      },
      
      recordObservation: (conceptId, correct) => {
        const today = new Date().toISOString().split('T')[0];
        const currentActivity = get().studyActivity || [];
        const updatedActivity = currentActivity.includes(today)
          ? currentActivity
          : [...currentActivity, today];
        const newStreak = calculateStreak(updatedActivity);

        set((state) => {
          const updatedPoints = state.masteryPoints.map((m) => {
            if (m.conceptId === conceptId) {
              const updatedPKnown = updateBKT(m.pKnown, correct);
              const dueAt = correct
                ? new Date(Date.now() + 3 * 86400000).toISOString()
                : new Date(Date.now() + 86400000).toISOString();
              return {
                ...m,
                pKnown: updatedPKnown,
                nObs: m.nObs + 1,
                dueAt,
              };
            }
            return m;
          });
          return {
            masteryPoints: updatedPoints,
            studyActivity: updatedActivity,
            lastActiveDate: today,
            currentStreak: newStreak,
          };
        });
      },
      
      resetMastery: () => set({ masteryPoints: [], studyActivity: [], lastActiveDate: null, currentStreak: 0 }),
    }),
    {
      name: 'study-companion-mastery-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
