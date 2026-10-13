import { create } from 'zustand';

interface SessionState {
  currentCourseId: string;
  learnerId: string;
  learnerAbility: number;
  setLearnerAbility: (ability: number) => void;
  resetSession: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  currentCourseId: 'os-101',
  learnerId: 'student-demo',
  learnerAbility: 2.0,
  setLearnerAbility: (ability: number) => set({ learnerAbility: ability }),
  resetSession: () => set({ learnerAbility: 2.0 }),
}));
