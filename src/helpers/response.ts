import { NextResponse } from "next/server";
import type { ApiResponse } from "@/types";

export class Response {
  static success<T>(data: T, statusCode: number = 200) {
    return NextResponse.json<ApiResponse<T>>(
      {
        success: true,
        data,
        errors: null,
      },
      {
        status: statusCode,
      }
    );
  }

  static error(errors: string[], statusCode: number = 400) {
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        data: null,
        errors: errors,
      },
      { status: statusCode }
    );
  }
}
