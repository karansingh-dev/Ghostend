import { faker } from "@faker-js/faker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import toast from "react-hot-toast";

import { ApiFormDataType, apiFormSchema } from "@/schemas/createApiSchema";
import { useCreateApiStore } from "@/store/create-api-store";
import { createGhostApi } from "@/feature/createApi/mutations/createApi";
import { useCreateApiStorevalue } from "./useCreateApiStore";
import { useCreateApiForm } from "./useCreateApiForm";

export const useCreateApi = () => {
  const {
    setIsAiGenerating,
    aiPrompt,
    setAiPrompt,
    setJsonString,
    setTab,
    setIsLoading,
  } = useCreateApiStorevalue();

  const { reset, setValue } = useCreateApiForm();

  const generateAiJson = async () => {
    if (!aiPrompt.trim()) {
      toast.error("Please describe what data you need");
      return;
    }

    setIsAiGenerating(true);
    try {
      const data = {
        userMessage: aiPrompt,
      };
      const response = await fetch("/api/v1/ai-generated", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      const jsonData = JSON.parse(result.data);

      const aiGeneratedData = jsonData.schema;

      setValue("jsonTemplate", aiGeneratedData);

      setJsonString(JSON.stringify(aiGeneratedData, null, 2));
      toast.success("AI generated JSON template!");
      setTab("ai");

      setAiPrompt("");
    } catch (error) {
      toast.error("Failed to generate JSON");
    } finally {
      setIsAiGenerating(false);
    }
  };

  const onSubmit = async (data: ApiFormDataType) => {
    if (!data.jsonTemplate || Object.keys(data.jsonTemplate).length === 0) {
      toast.error("Please provide a JSON template");
      return;
    }

    setIsLoading(true);
    try {
      await createGhostApi(data);
      toast.success("API endpoint created successfully!");
      reset();
      setJsonString("");
    } catch (error) {
      toast.error("Failed to create API endpoint");
      console.error(error);
    } finally {
      reset();
      setIsLoading(false);
    }
  };

  return {
    onSubmit,
    generateAiJson,
  };
};
