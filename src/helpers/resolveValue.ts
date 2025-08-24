import { DataMapper, ResolveValueInput, ResolveValueOutput } from "@/lib/faker";

export function resolveValue(value: ResolveValueInput): ResolveValueOutput {
  if (typeof value === "string") {
    if (value in DataMapper) {
      return DataMapper[value]();
    }
    throw new Error(`Unknown DataMapper type: ${value}`);
  }

  // Handle object case
  if (typeof value === "object" && value !== null) {
    const obj: { [key: string]: ResolveValueOutput } = {};
    for (const [k, v] of Object.entries(value)) {
      obj[k] = resolveValue(v);
    }
    return obj;
  }

  throw new Error(`Invalid value type: ${typeof value}`);
}
