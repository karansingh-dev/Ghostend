import { NextRequest, NextResponse } from "next/server";
import { Response } from "@/helpers/response";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    console.log(request.headers.get("X-Forwarded-For"));

    return Response.success(null, 200);
  } catch (error) {
    console.error("Failed to generate schema by ai", error);
    return Response.error(["Internal Server Error"], 500);
  }
}
