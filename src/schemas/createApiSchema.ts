import { z } from "zod";
import { DataMapper, DataMapperType } from "@/lib/faker";

// enum from DataMapper keys
const dataMapperKeys = Object.keys(DataMapper) as DataMapperType[];
const DataMapperTypeSchema = z.enum(
  dataMapperKeys as [DataMapperType, ...DataMapperType[]]
);

// recursive TS type
type JsonTemplate =
  | z.infer<typeof DataMapperTypeSchema>
  | { [key: string]: JsonTemplate };

// recursive Zod schema with explicit type
const JsonTemplateSchema: z.ZodType<JsonTemplate> = z.lazy(() =>
  z.union([DataMapperTypeSchema, z.record(z.string(), JsonTemplateSchema)])
);

export const apiFormSchema = z.object({
  defaultCount: z.number(),
  apiMethod: z.enum(["GET", "POST", "PATCH", "DELETE", "PUT"]),
  endPointName: z
    .string()
    .nonempty()
    .max(50)
    .regex(/^[A-Za-z0-9]+$/, "Only letters and numbers are allowed"),

  jsonTemplate: JsonTemplateSchema,
});

// AI generation schema
export const aiGenerationSchema = z.object({
  userMessage: z.string().nonempty().max(200),
});

export type AiGenerationDataType = z.infer<typeof aiGenerationSchema>;
export type ApiFormDataType = z.infer<typeof apiFormSchema>;
