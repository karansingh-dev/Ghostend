import { z } from "zod";
import { DataMapper, DataMapperType } from "@/lib/faker";

const dataMapperKeys = Object.keys(DataMapper) as DataMapperType[];
const DataMapperTypeSchema = z.enum(
  dataMapperKeys as [DataMapperType, ...DataMapperType[]]
);

// Recursive schema for nested objects
const JsonTemplateSchema: z.ZodType<any> = z.lazy(() =>
  z.union([DataMapperTypeSchema, z.record(z.string(), JsonTemplateSchema)])
);

export const apiFormSchema = z.object({
  defaultCount: z.number(),
  apiMethod: z.enum(["GET", "POST", "PATCH", "DELETE", "PUT"]),
  endPointName: z.string().min(1).max(50),
  jsonTemplate: z.record(z.string(), JsonTemplateSchema),
});

export const aiGenerationSchema = z.object({
  userMessage: z.string().nonempty().max(200),
});

export type AiGenerationDataType = z.infer<typeof aiGenerationSchema>;

export type ApiFormDataType = z.infer<typeof apiFormSchema>;
