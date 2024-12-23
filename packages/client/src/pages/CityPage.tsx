import { CityView } from "@/components/location/CityView";
import { useGetLocationRequest } from "@/hooks/use-get-location-request";
import { City } from "@/types/city";
import { useParams } from "react-router";

export function CityPage() {
  const { id } = useParams();

  const { data, loading, error } = useGetLocationRequest<City>({
    locationCollection: "cities",
    id,
  });

  if (loading) {
    return <p className='text-info'>Loading...</p>;
  }

  if (error) {
    return <p className='text-danger'>Error: {error}</p>;
  }

  if (!data) {
    return <div>Not found</div>;
  }

  return <CityView city={data} />;
}
