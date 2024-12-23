import { hotels } from './seeds/hotels';
import { cities } from './seeds/cities';
import { countries } from './seeds/countries';
import { Hotel } from '../models/hotel';
import { City } from '../models/city';
import { Country } from '../models/country';
import { buildHotelSearch } from '@/libs/build-hotel-search';

export async function seed() {
  await Promise.all([
    Hotel.deleteMany({}),
    City.deleteMany({}),
    Country.deleteMany({})
  ]);

  await Promise.all([
    Hotel.insertMany(hotels),
    City.insertMany(cities),
    Country.insertMany(countries)
  ]);

  await buildHotelSearch();
};