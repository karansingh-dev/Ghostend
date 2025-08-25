"use server"
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getTotalApis() {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorised access");

  const apiCallToday = await prisma.ghostApi.count({
    where: {
      clerkUserId: userId,
    },
  });

  return apiCallToday;
}
