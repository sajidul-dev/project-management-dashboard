import { create } from "zustand";

export const useIsExpandSidebar = create((set) => ({
  isExpandSidebar: false,
  setIsExpandSidebar: () =>
    set((state: any) => ({ isExpandSidebar: !state.isExpandSidebar })),
}));
