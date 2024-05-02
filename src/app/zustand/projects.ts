import { create } from "zustand";

export const useProjectStore = create((set) => ({
  projects: [],
  setProjects: (newProjects: any) =>
    set((state: any) => ({ projects: newProjects })),
  increasePopulation: () => set((state: any) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears: any) => set({ bears: newBears }),
  fetch: async (url: any) => {
    const response = await fetch(url);
    set({ projects: await response.json() });
  },
}));
