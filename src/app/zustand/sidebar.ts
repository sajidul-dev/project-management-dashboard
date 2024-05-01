import { create } from "zustand";

export const useIsExpandSidebar = create((set) => ({
  isExpandSidebar: false,
  setIsExpandSidebar: () =>
    set((state: any) => ({ isExpandSidebar: !state.isExpandSidebar })),
  //   increasePopulation: () => set((state: any) => ({ bears: state.bears + 1 })),
  //   removeAllBears: () => set({ bears: 0 }),
  //   updateBears: (newBears: any) => set({ bears: newBears }),
}));
