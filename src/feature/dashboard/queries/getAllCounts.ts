"use server"
import { auth } from "@clerk/nextjs/server";
import { getTodayTotalApiCalls } from "./getTodayTotalApiCalls";
import { getTotalApis } from "./getTotalApi";
import { getActiveEndpoint } from "./getActiveEndpoints";

export default async function getAllCounts() {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorised access");

  const totalApiCallsToday = await getTodayTotalApiCalls();
  const totalApiCount = await getTotalApis();
  const activeEndpoint = await getActiveEndpoint();

  return {
    totalApiCallsToday,
    totalApiCount,
    activeEndpoint,
  };
}
