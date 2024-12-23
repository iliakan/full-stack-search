import { Country } from "@/types/country";

export function CountryView({ country }: { country: Country }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 flex items-center">{country.name}</h1>
    </div>
  );
}
