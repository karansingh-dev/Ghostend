"use server"
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";


export async function getActiveEndpoint() {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorised access");


  const activeEndpoint = await prisma.ghostApi.count({
    where: {
     isActive:true
    },
  });

  return activeEndpoint
}
