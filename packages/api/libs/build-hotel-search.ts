/**
 * Generate helper data for hotels search
 */

import "@/config";
import mongoose from '@/db/mongoose';
import { ObjectId } from "mongodb";
import { generateSuffixes } from '@/libs/string-utils';
import { dropCollectionIfExists } from '@/libs/db-utils';
import { HotelSearch } from "@/models/hotel-search";
import { Hotel } from "@/models/hotel";
import debug from 'debug';
import config from "@/config";

const log = debug('libs:build-hotel-search');

export async function buildHotelSearch() {
  // We'll work with mongo client directly for speed
  const db = mongoose.connection.db!;

  await dropCollectionIfExists(db, HotelSearch.collection.name);

  const hotels = await db.collection(Hotel.collection.name)
    .find({}, { projection: { _id: 1, name: 1 } })
    .sort({name: 1})
    .toArray();
    
  log(`Found ${hotels.length} hotels in database`);

  // Object storage is a bit better than Map for performance
  const suffixToHotels: Record<string, ObjectId[]> = Object.create(null);

  // Generate and store search entries
  let hotelNumber = 0;

  for (const hotel of hotels) {
    hotelNumber++;

    if (hotelNumber % 1000 === 0) {
      log(`Processed ${hotelNumber} hotels`);
    }

    const suffixes = generateSuffixes(hotel.name.toLowerCase());
    for (let suffix of suffixes) {
    if (!suffixToHotels[suffix]) {
        suffixToHotels[suffix] = [hotel._id];
      } else {
        const hotelList = suffixToHotels[suffix];
        // if the suffix has more document than the limit, we won't read them anyway
        // so let's not add more
        if (hotelList.length < config.search.limit) {
          hotelList.push(hotel._id);
        }
      }
    }
  }

  // Convert the map to array of documents to insertMany into MongoDB
  const hotelSearchEntries = [];
  for(let suffix in suffixToHotels) {
    hotelSearchEntries.push({
      _id: suffix, 
      hotels: suffixToHotels[suffix]
    })
  };

  log(`Created ${hotelSearchEntries.length} suffix entries`);

  // Mongo types require _id be either 'ObjectId' or 'any'
  // 'string' is not assignable to type 'ObjectId'
  await db.collection(HotelSearch.collection.name).insertMany(
    hotelSearchEntries as {_id: any, hotels: ObjectId[]}[]
  ); 

  log('Inserted all entries into MongoDB');

  return hotelSearchEntries;
}