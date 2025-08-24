import { NextRequest } from "next/server";
import { Response } from "@/helpers/response";
import { auth } from "@clerk/nextjs/server";
import { validateFormData } from "@/helpers/validateForm";
import {
  AiGenerationDataType,
  aiGenerationSchema,
} from "@/schemas/createApiSchema";
import { generateWithAi } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId)
      return Response.error(["unauthorized access", "invalid userId"]);

    const body = await request.json();

    const validatedData = validateFormData<AiGenerationDataType>(
      aiGenerationSchema,
      body
    );

    const { userMessage } = validatedData;

    const aiGeneratedSchema = await generateWithAi(userMessage);

    return Response.success(aiGeneratedSchema);
  } catch (error) {
    console.error("Failed to generate schema by ai", error);
    return Response.error(["Internal Server Error"], 500);
  }
}
