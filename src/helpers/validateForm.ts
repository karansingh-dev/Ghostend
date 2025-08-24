import { ZodObject } from "zod";

export function validateFormData<T>(schema: ZodObject, data: unknown): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errorMessages = result.error.issues.map((issue) => issue.message);
    console.warn("Zod Validation Error:", errorMessages);

    throw new Error("Validation failed");
  }

  return result.data as T;
}
