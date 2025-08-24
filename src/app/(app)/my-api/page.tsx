import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export default async function Page() {
  const { userId } = await auth();

  if (!userId) return null;

  const userdata = await prisma.ghostApi.findMany({
    where: {
      clerkUserId: userId,
    },
  });
  if (userdata) {
  }

  const apikeys = await prisma.apiKey.findMany({
    where: {
      clerkUserId: userId,
    },
  });

  return (
    <div className="min-h-screen p-8">
      <div id="heading">
        {JSON.stringify(userdata)}

        <h1 className="text-4xl font-bold">Api key</h1>
        {JSON.stringify(apikeys)}
      </div>
    </div>
  );
}
