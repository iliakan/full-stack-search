import { ISearchResult } from "@/types/search-result";
import config from "@/config";

export interface SearchResultCache {
  [key: string]: ISearchResult;
}

const cache: SearchResultCache = {};

export function cacheSet(key: string, value: ISearchResult) {
  cache[key] = value;
}

export function cacheGet(value: string) {
  value = value.toLowerCase(); // our search is case-insensitive

  if (cache[value]) {
    return cache[value];
  }

  // Check if we can evaluate the value directly from cache
  // e.g.
  //   we have all matches for value=Uni 
  //   we look for value=Unit
  //   results for Unit are a subset of results for Uni
  // so we can return them
  // this logic only can be used if we truly have all the results (below the limit)
  for(const key in cache) {
    if (value.includes(key)) {
      const cachedResult = cache[key];
      const canUseCacheResult = cachedResult.cities.length < config.search.limit &&
        cachedResult.countries.length < config.search.limit &&
        cachedResult.hotels.length < config.search.limit;

      if (canUseCacheResult) {
        return {
          hotels: cachedResult.hotels.filter((hotel) => hotel.name.toLowerCase().includes(value)),
          cities: cachedResult.cities.filter((city) => city.name.toLowerCase().includes(value)),
          countries: cachedResult.countries.filter((country) => country.name.toLowerCase().includes(value))
        };
      }

    }
  }

  return null;
}
