import { create } from "zustand";

const useHistoryStore = create((set) => ({
  history: [],

  setHistory: (items) => set({ history: items }),

  addHistory: (item) =>
    set((state) => ({
      history: [item, ...state.history.slice(0, 49)],
    })),

  deleteHistory: (id) =>
    set((state) => ({
      history: state.history.filter((item) => item.id !== id),
    })),

  clearHistory: () => set({ history: [] }),
}));

export default useHistoryStore;
