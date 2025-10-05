import { create } from "zustand";
import { persist } from "zustand/middleware";

const useHistoryStore = create(
  persist(
    (set) => ({
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
    }),
    {
      name: "history-storage", 
      getStorage: () => localStorage, 
    }
  )
);

export default useHistoryStore;
