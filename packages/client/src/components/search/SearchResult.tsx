import { Hotel } from "@/types/hotel";
import { SearchResultItem } from "./SearchResultItem";
import { Country } from "@/types/country";
import { City } from "@/types/city";

export interface SearchResult {
  hotels: Hotel[] | [];
  countries: Country[] | [];
  cities: City[] | [];
}

function SearchResultWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className='search-dropdown-menu dropdown-menu w-100 show p-2'>
      {children}
    </div>
  );
}

export function SearchResult({
  searchResult,
  isLoading,
}: {
  searchResult: SearchResult;
  isLoading: boolean;
}) {
  const { hotels, countries, cities } = searchResult;

  if (isLoading) {
    return <SearchResultWrapper>Loading...</SearchResultWrapper>;
  }

  return (
    <SearchResultWrapper>
      <h2>Hotels</h2>
      {!hotels.length ? (
        <p>No hotels matched</p>
      ) : (
        <div data-testid='search-result-hotels'>
          {hotels.map((hotel, index) => (
            <SearchResultItem
              key={index}
              label={hotel.name}
              link={`/hotels/${hotel.id}`}
            />
          ))}
        </div>
      )}

      <h2>Countries</h2>
      {!countries.length ? (
        <p>No countries matched</p>
      ) : (
        <div data-testid='search-result-countries'>
          {countries.map((country, index) => (
            <SearchResultItem
              key={index}
              label={`${country.name}`}
              link={`/countries/${country.id}`}
            />
          ))}
        </div>
      )}

      <h2>Cities</h2>
      {!cities.length ? (
        <p>No cities matched</p>
      ) : (
        <div data-testid='search-result-cities'>
         {cities.map((city, index) => (
            <SearchResultItem
              key={index}
              label={city.name}
              link={`/cities/${city.id}`}
            />
          ))}
        </div>
      )}
    </SearchResultWrapper>
  );
}
