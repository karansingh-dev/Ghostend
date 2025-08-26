import { SchemaPresetType } from "@/feature/templates/constants/presets";
import { generateData } from "@/helpers/dataGenerator";
import { Response } from "@/helpers/response";
import { ResolveValueInput } from "@/lib/faker";
import { NextRequest } from "next/server";
import { schemaPresets } from "@/feature/templates/constants/presets";

type params = {
  endPointName: SchemaPresetType;
};

export async function GET(
  req: NextRequest,
  context: { params: Promise<params> }
) {
  try {
    const count = 50;
    const { endPointName } = await context.params;

    let resData;

    switch (endPointName) {
      case "user":
        resData = generateData(
          schemaPresets.user as { [key: string]: ResolveValueInput },
          count
        );
        break;

      case "blogPost":
        resData = generateData(
          schemaPresets.blogPost as { [key: string]: ResolveValueInput },
          count
        );
        break;

      case "ecommerce":
        resData = generateData(
          schemaPresets.ecommerce as { [key: string]: ResolveValueInput },
          count
        );
        break;

      case "socialPost":
        resData = generateData(
          schemaPresets.socialPost as { [key: string]: ResolveValueInput },
          count
        );
        break;

      case "analytics":
        resData = generateData(
          schemaPresets.analytics as { [key: string]: ResolveValueInput },
          count
        );
        break;

      default:
        throw new Error(`Unknown endpoint: ${endPointName}`);
    }

    return Response.success(resData);
  } catch (error) {
    console.log("failed to serve api request", error);
    return Response.error(["Invalid api endpoint"]);
  }
}
