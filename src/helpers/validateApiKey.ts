export function validateApiKey(apiKey: string) {
  return apiKey.startsWith("ak_");
}