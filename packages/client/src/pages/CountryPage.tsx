import { CountryView } from "@/components/location/CountryView";
import { useGetLocationRequest } from "@/hooks/use-get-location-request";
import { Country } from "@/types/country";
import { useParams } from "react-router";

export function CountryPage() {
  const { id } = useParams();

  const { data, loading, error } = useGetLocationRequest<Country>({
    locationCollection: "countries",
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

  return <CountryView country={data} />;
}
