import { create } from 'zustand';
import { Message } from '@/lib/schemas';

interface ChatState {
  messages: Message[];
  isStreaming: boolean;
  activeCitation: Message['citations'][0] | null;
  addMessage: (msg: Message) => void;
  setIsStreaming: (streaming: boolean) => void;
  setActiveCitation: (citation: Message['citations'][0] | null) => void;
  clearChat: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isStreaming: false,
  activeCitation: null,
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  setIsStreaming: (streaming) => set({ isStreaming: streaming }),
  setActiveCitation: (citation) => set({ activeCitation: citation }),
  clearChat: () => set({ messages: [], activeCitation: null }),
}));
