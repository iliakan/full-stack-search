import { Hotel } from "@/types/hotel";
import { StarRating } from "./StarRating";

/**
 * StarRating is in a separate file, because it'll probably be used elsewhere
 * on other pages which might output hotels
 */
export function HotelView({ hotel }: { hotel: Hotel }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        {hotel.name}
      </h1>

      {hotel.star_rating && (
        <div className="text-xl mb-4 fa-2x">
          <StarRating rating={hotel.star_rating} />
        </div>
      )}
          
      <div className="space-y-4">  
        <p className="flex items-center">
          <strong className="mr-2">Country:</strong> {hotel.country}
          {hotel.state && (
            <span className="ml-2">
              ({hotel.state})
            </span>
          )}
        </p>

        {hotel.zipcode && (
          <p>
            <strong className="mr-2">Zip code:</strong> {hotel.zipcode}
          </p>
        )}

        {hotel.city && (
          <p>
            <strong className="mr-2">City:</strong> {hotel.city}
          </p>
        )}

        {hotel.addressline1 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Address</h2>
            <p>{hotel.addressline1}</p>
            {hotel.addressline2 && (
              <p className="mt-1">{hotel.addressline2}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}