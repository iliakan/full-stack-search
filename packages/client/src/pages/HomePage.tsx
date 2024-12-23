import { SearchInput } from "@/components/search/SearchInput";
import { SearchResult } from "@/components/search/SearchResult";
import { useCallback, useEffect, useRef, useState } from "react";
import { getSearch } from "@/services/get-search";
import type { ISearchResult } from "@/types/search-result";
import { cacheGet, cacheSet } from "@/utils/search-cache";
import config from "@/config";

const EMPTY_SEARCH_RESULT: ISearchResult = {
  hotels: [],
  countries: [],
  cities: [],
};

export function HomePage() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [searchResult, setSearchResult] = useState(EMPTY_SEARCH_RESULT);

  // setTimeout is number in browser, Timeout in node
  // make sure TypeScript is happy for both environments
  const requestTimeoutRef = useRef<number | NodeJS.Timeout | undefined>();

  const handleSearch = useCallback(async (value: string) => {
    clearTimeout(requestTimeoutRef.current);

    if (!value) {
      setSearchResult(EMPTY_SEARCH_RESULT);
      setIsLoading(false);
      return;
    }

    const cacheResult = cacheGet(value);

    if (cacheResult) {
      setSearchResult(cacheResult);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    requestTimeoutRef.current = setTimeout(async () => {
      const result = await getSearch(value);

      cacheSet(value, result);

      setSearchResult(result);
      setIsLoading(false);
    }, config.search.debounce);
  }, []);

  useEffect(() => {
    handleSearch(inputValue);
  }, [inputValue, handleSearch]);

  // when unmounting, cancel any pending search
  useEffect(() => {
    return () => {
      clearTimeout(requestTimeoutRef.current);
    };
  }, []);

  const clearSearch = () => {
    setInputValue("");
  };

  return (
    <div className='col-md-6'>
      <div className='dropdown'>
        <SearchInput
          value={inputValue}
          showClearButton={Boolean(inputValue)}
          onSearch={setInputValue}
          onClear={clearSearch}
        />

        {inputValue && (
          <SearchResult searchResult={searchResult} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
}

export default HomePage;
