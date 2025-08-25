"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getPaginatedApiKeys(
  pageNumber: number,
  pageSize: number = 10
) {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorised access");

  const skip = (pageNumber - 1) * pageSize;

  const apiKeys = await prisma.apiKey.findMany({
    where: {
      clerkUserId: userId,
    },
    skip,
    take: pageSize,
    select: {
      apiKey: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return apiKeys;
}
