"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getPaginatedApi(
  pageNumber: number,
  pageSize: number = 10
) {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorised access");

  const skip = (pageNumber - 1) * pageSize;

  const ghostApis = await prisma.ghostApi.findMany({
    where: {
      clerkUserId: userId,
    },
    skip,
    take: pageSize,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      createdAt: true,
      endPointName: true,
      isActive: true,
      apiMethod:true
    },
  });

  return ghostApis;
}
