import { generateData } from "@/helpers/dataGenerator";
import { Response } from "@/helpers/response";
import { validateApiKey } from "@/helpers/validateApiKey";
import { ResolveValueInput } from "@/lib/faker";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

type RouteParams = {
  params: {
    apiKey: string;
    endPointName: string;
  };
};

export async function handler(req: NextRequest, { params }: RouteParams) {
  try {
    const { apiKey, endPointName } = params;

    if (!validateApiKey(apiKey)) {
      return Response.error(["Invalid API key"], 401);
    }

    const apiKeyExist = await prisma.apiKey.findUnique({
      where: {
        apiKey,
      },
    });

    if (!apiKeyExist)
      return Response.error(["Invalid api key", "api key does not exist"], 404);

    const { userId } = await auth();
    if (!userId)
      return Response.error(["unauthorized access", "invalid userId"], 401);

    const apiData = await prisma.ghostApi.findUnique({
      where: {
        clerkUserId_endPointName: {
          clerkUserId: userId,
          endPointName,
        },
      },
    });
    if (!apiData)
      return Response.error(
        ["Invalid api url", "endpoint does not exist"],
        404
      );

    console.log(apiData.jsonTemplate);

    const resData = generateData(
      apiData.jsonTemplate as { [key: string]: ResolveValueInput },
      apiData.defaultCount
    );

    return Response.success(resData);
  } catch (error) {
    console.log("failed to server api request", error);
    throw error;
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
