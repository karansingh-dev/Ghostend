"use server"
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";


export async function getTodayTotalApiCalls() {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorised access");

  const today = new Date();
  const endOfToday = new Date(today);
  endOfToday.setHours(23, 59, 59, 999);

  const apiCallToday = await prisma.apiCall.count({
    where: {
      calledAt: {
        lte: endOfToday,
      },
    },
  });

  return apiCallToday;
}
