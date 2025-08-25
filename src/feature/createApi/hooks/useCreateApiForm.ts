import { ApiFormDataType, apiFormSchema } from "@/schemas/createApiSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateApiStorevalue } from "./useCreateApiStore";
import toast from "react-hot-toast";
import { createGhostApi } from "../mutations/createApi";
import { ResolveValueInput } from "@/lib/faker";
import { useRouter } from "next/navigation";

// example data
export const exampleData = {
  id: "uuid" as const,
  firstName: "firstname" as const,
  lastName: "lastname" as const,
  email: "email" as const,
  age: "age" as const,
  phone: "phone" as const,
  address: "address" as const,
  city: "city" as const,
  company: "company" as const,
  jobTitle: "job" as const,
};

export const useCreateApiForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(apiFormSchema),
    defaultValues: {
      defaultCount: 1,
      apiMethod: "GET",
      endPointName: "",
      jsonTemplate: {},
    },
  });

  const { setJsonString, jsonString } = useCreateApiStorevalue();
  const handleArrayCountValue = (value: string) => {
    setValue("defaultCount", Number(value));
  };

  const loadExampleData = () => {
    setValue("jsonTemplate", exampleData);
    setJsonString(JSON.stringify(exampleData, null, 2));
    toast.success("Example data loaded!");
  };

  const clearJsonTemplate = () => {
    setValue("jsonTemplate", {});
    setJsonString("");
    toast.success("Template cleared!");
  };

  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonString);
      const formatted = JSON.stringify(parsed, null, 2);
      setJsonString(formatted);
      setValue("jsonTemplate", parsed);
      toast.success("JSON formatted!");
    } catch (error) {
      toast.error("Invalid JSON format");
    }
  };

  const handleJsonChange = (value: string) => {
    setJsonString(value);
    try {
      const parsed = JSON.parse(value);
      setValue("jsonTemplate", parsed);
    } catch {
      // Ignore invalid JSON while typing
    }
  };

  const defaultCount = watch("defaultCount");
  const apiMethod = watch("apiMethod");
  const jsonTemplate = watch("jsonTemplate");

  const {
    setIsAiGenerating,
    aiPrompt,
    setAiPrompt,

    setTab,
    setIsLoading,
  } = useCreateApiStorevalue();

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

      const aiGeneratedData = jsonData.schema as [
        key: string,
        ResolveValueInput
      ];

      setValue("jsonTemplate", aiGeneratedData);
      console.log(getValues("jsonTemplate"));

      setJsonString(JSON.stringify(aiGeneratedData, null, 2));
      toast.success("AI generated JSON template!");
      setTab("json");

      setAiPrompt("");
    } catch (error) {
      toast.error("Failed to generate JSON");
    } finally {
      setIsAiGenerating(false);
    }
  };

  const onSubmit: SubmitHandler<ApiFormDataType> = async (data) => {
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
      router.push("/my-api");
    } catch (error) {
      toast.error("Failed to create API endpoint");
      console.error(error);
    } finally {
      reset();
      setIsLoading(false);
    }
  };

  return {
    // react-hook-form
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    errors,
    defaultCount,
    apiMethod,
    jsonTemplate,
    getValues,

    // handlers
    handleArrayCountValue,
    loadExampleData,
    clearJsonTemplate,
    formatJson,
    handleJsonChange,
    onSubmit,
    generateAiJson,
  };
};
