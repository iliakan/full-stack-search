import { HotelView } from "@/components/location/HotelView";
import { useGetLocationRequest } from "@/hooks/use-get-location-request";
import { Hotel } from "@/types/hotel";
import { useParams } from "react-router";

export function HotelPage() {
  const { id } = useParams();

  const { data, loading, error } = useGetLocationRequest<Hotel>({
    locationCollection: "hotels",
    id
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

  return <HotelView hotel={data} />;
}
