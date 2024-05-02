import { create } from "zustand";

export const useTaskStore = create((set) => ({
  toDo: [],
  inProgress: [],
  done: [],
  setToDo: (newToDo: any) => set((state: any) => ({ toDo: newToDo })),
  setInProgress: (newInProgress: any) =>
    set((state: any) => ({ inProgress: newInProgress })),
  setDone: (newDone: any) => set((state: any) => ({ done: newDone })),
}));
