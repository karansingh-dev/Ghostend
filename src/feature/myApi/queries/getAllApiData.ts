import { getPaginatedApi } from "./getPaginatedApi";
import { getApiCalls } from "./getPaginatedApiCalls";
import { getPaginatedApiKeys } from "./getPaginatedApikeys";

interface ApiData {
  id: string;
  endPointName: string;
  apiKey: string;
  apiMethod: "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
  isActive: boolean;
  apiCalls: number;
  createdAt: Date;
}

export async function getAllApiData(page: number): Promise<ApiData[]> {
  const ghostApis = await getPaginatedApi(page);
  const ghostApiKeys = await getPaginatedApiKeys(page);

  const results = await Promise.all(
    ghostApis.map(async (api, index) => {
      const apiKey = ghostApiKeys[index].apiKey;
      const apiCalls = await getApiCalls(api.id);

      return {
        id: api.id,
        endPointName: api.endPointName,
        apiKey,
        isActive: api.isActive,
        apiCalls,
        createdAt: api.createdAt,
        apiMethod: api.apiMethod,
      };
    })
  );

  return results;
}
