import { Location, LocationCollection } from "@/types/location";
import { apiRequest } from "@/utils/api-request";

export async function getLocation<T extends Location>(
  locationCollection: LocationCollection, id: string
) {
  const location = await apiRequest.get<T>(`${locationCollection}/${id}`);

  return location;
}
