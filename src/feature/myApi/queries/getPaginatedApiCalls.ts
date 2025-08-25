"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getApiCalls(ghostApiId: string) {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorised access");

  const ghostApis = await prisma.apiCall.count({
    where: {
      ghostApiId,
    },
  });

  return ghostApis;
}
