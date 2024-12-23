import { City } from "@/types/city";

export function CityView({ city }: { city: City }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 flex items-center">{city.name}</h1>
    </div>
  );
}
