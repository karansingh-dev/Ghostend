import { ResolveValueInput, ResolveValueOutput } from "@/lib/faker";
import { resolveValue } from "./resolveValue";

export function generateData(
  jsonTemplate: { [key: string]: ResolveValueInput },
  count = 1
): { [key: string]: ResolveValueOutput }[] {
  const resData: { [key: string]: ResolveValueOutput }[] = [];

  for (let i = 0; i < count; i++) {
    const data: { [key: string]: ResolveValueOutput } = {};
    for (const [key, value] of Object.entries(jsonTemplate)) {
      data[key] = resolveValue(value);
    }
    resData.push(data);
  }

  return resData;
}
