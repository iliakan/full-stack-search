import { Request, Response } from "express";
import { Hotel } from "@/models/hotel";
import { HotelSearch } from "@/models/hotel-search";
import { City } from "@/models/city";
import { Country } from "@/models/country";
import pick from "lodash/pick";
import config from "@/config";

export async function search(req: Request, res: Response) {
  const query = req.params.query;

  // This can be further optimized
  // - We can use a single "aggregate" query to MongoDB instead of multiple queries
  // - We can consider caching cities and countries in the process memory,
  //   because these collections are small (25k of cities in the sample DB) and very stable
  const countries = await Country.find({
    name: {
      $regex: new RegExp(query, 'i')
    }
  }).sort({name: 1}).limit(config.search.limit).select('name code');

  // We can also rewrite multiple queries into a single aggregation pipeline with $facets
  // it'll be more complex and less maintainable
  const [hotels, cities] = await Promise.all([
    (async () => {
      const hotelIds = await HotelSearch.search(query, config.search.limit);

      const hotels = await Hotel.find({
        $or: [
          {
            _id: {
              $in: hotelIds
            }
          },
          {
            countryisocode: {
              $in: countries.map(country => country.code)
            }
          }
        ]
      }).sort({name: 1}).select('name country');

      return hotels;
    })(),

    City.find({
      name: {
        $regex: new RegExp(query, 'i')
      }
    }).sort({name: 1}).limit(config.search.limit).select('name'),

  ]);

  res.json({
    hotels: hotels.map(hotel => pick(hotel, ['id', 'name', 'country'])),
    cities: cities.map(city => pick(city, ['id', 'name'])),
    countries: countries.map(country => pick(country, ['id', 'name'])),
  });
}
