import { ISearchResult } from "@/types/search-result";
import { apiRequest } from "@/utils/api-request";

export async function getSearch(query: string) {
  const result = await apiRequest.get<ISearchResult>(`search/${query}`);

  return result;
}


