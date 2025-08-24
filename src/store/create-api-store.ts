import { create } from "zustand";

type CreateApi = {
  tab: "json" | "ai";
  setTab: (tab: "json" | "ai") => void;

  isLoading: boolean;
  setIsLoading: (v: boolean) => void;

  isAiGenerating: boolean;
  setIsAiGenerating: (v: boolean) => void;

  aiPrompt: string;
  setAiPrompt: (v: string) => void;

  jsonString: string;
  setJsonString: (v: string) => void;
};

export const useCreateApiStore = create<CreateApi>((set) => ({
  tab: "json",
  setTab: (tab) => set({ tab }),

  isLoading: false,
  setIsLoading: (v) => set({ isLoading: v }),

  isAiGenerating: false,
  setIsAiGenerating: (v) => set({ isAiGenerating: v }),

  aiPrompt: "",
  setAiPrompt: (v) => set({ aiPrompt: v }),

  jsonString: "",
  setJsonString: (v) => set({ jsonString: v }),
}));
