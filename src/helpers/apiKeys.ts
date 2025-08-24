import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  32
);

export function generateApiKey(env: "live" | "test" = "live"): string {
  return `ak_${env}_${nanoid()}`;
}
