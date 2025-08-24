import { ApiFormDataType, apiFormSchema } from "@/schemas/createApiSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateApiStorevalue } from "./useCreateApiStore";
import toast from "react-hot-toast";

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
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ApiFormDataType>({
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

    // handlers
    handleArrayCountValue,
    loadExampleData,
    clearJsonTemplate,
    formatJson,
    handleJsonChange,
  };
};
