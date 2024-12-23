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
  // - We can even consider caching cities and countries in the process memory,
  //   because these collections are small (25k of cities in the sample DB) and very stable
  const [hotels, cities, countries] = await Promise.all([
    (async () => {
      const hotelIds = await HotelSearch.search(query, config.search.limit);

      const hotels = await Hotel.find({
        _id: { $in: hotelIds }
      }).sort({name: 1}).select('name');

      return hotels;
    })(),

    City.find({
      name: {
        $regex: new RegExp(query, 'i')
      }
    }).sort({name: 1}).limit(config.search.limit).select('name'),

    Country.find({
      name: {
        $regex: new RegExp(query, 'i')
      }
    }).sort({name: 1}).limit(config.search.limit).select('name')
  ]);

  res.json({
    hotels: hotels.map(hotel => pick(hotel, ['id','name'])),
    cities: cities.map(city => pick(city, ['id','name'])),
    countries: countries.map(country => pick(country, ['id','name'])),
  });
}
