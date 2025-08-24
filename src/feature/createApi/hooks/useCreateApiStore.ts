import { useCreateApiStore } from "@/store/create-api-store";

export const useCreateApiStorevalue= () => {
  const {
    tab,
    setTab,
    isLoading,
    setIsLoading,
    isAiGenerating,
    setIsAiGenerating,
    aiPrompt,
    setAiPrompt,
    jsonString,
    setJsonString,
  } = useCreateApiStore();

  return {
    // store state
    tab,
    setTab,
    isLoading,
    setIsLoading,
    isAiGenerating,
    setIsAiGenerating,
    aiPrompt,
    setAiPrompt,
    jsonString,
    setJsonString,
  };
};
