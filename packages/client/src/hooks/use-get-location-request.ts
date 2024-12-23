import { useEffect, useState } from "react";
import type { LocationCollection, Location } from "@/types/location";
import { getLocation } from "@/services/get-location";

interface Params {
  locationCollection: LocationCollection;
  id?: string;
}

export function useGetLocationRequest<T extends Location>({ locationCollection, id }: Params) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    async function fetchLocation() {
      if (!id) {
        throw new Error("id param is required");
      }
      
      try {
        setLoading(true);
        const location = await getLocation<T>(locationCollection, id);
        setData(location);
        setError(null);
      } catch (e) {
        setError((e as Error).message);
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchLocation();
  }, [locationCollection, id]);

  return { data, loading, error };
}
