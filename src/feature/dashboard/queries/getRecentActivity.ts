import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export default async function getRecentActivity() {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorised access");

  const recentApiHits = await prisma.apiCall.findMany({
    where: {
      clerkUserId: userId,
    },
    select: {
      calledAt: true,
      ghostApi: {
        select: {
          endPointName: true,
          apiMethod: true,
          isActive: true,
        },
      },
    },
    take: 3,
    orderBy: {
      calledAt: "desc",
    },
  });

  return recentApiHits;
}
