"use server";

import { generateApiKey } from "@/helpers/apiKeys";
import { prisma } from "@/lib/prisma";
import { ApiFormDataType } from "@/schemas/createApiSchema";
import { auth } from "@clerk/nextjs/server";

export async function createGhostApi(formData: ApiFormDataType) {
  try {
    const { userId } = await auth();

    if (!userId) throw new Error("Unauthorized access");

    const ghostApiExists = await prisma.ghostApi.findUnique({
      where: {
        clerkUserId_endPointName: {
          clerkUserId: userId,
          endPointName: formData.endPointName,
        },
      },
    });

    if (ghostApiExists) throw new Error("Api already exists");

    const { endPointName, defaultCount, jsonTemplate, apiMethod } = formData;

    const apiKey = generateApiKey("test");

    await prisma.$transaction(async (tx) => {
      await tx.apiKey.create({
        data: { clerkUserId: userId, keyName: endPointName, apiKey },
      });
      await tx.ghostApi.create({
        data: {
          clerkUserId: userId,
          endPointName,
          defaultCount,
          jsonTemplate,
          apiMethod,
        },
      });
    });
  } catch (error) {
    console.log("failed to add ghost api");
    throw error;
  }
}
