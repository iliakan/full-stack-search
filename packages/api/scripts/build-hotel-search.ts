/**
 * The script to generate hotel search data structure
 */

import "@/config";
import mongoose from '@/db/mongoose';
import { buildHotelSearch } from "@/libs/build-hotel-search";
import { HotelSearch } from "@/models/hotel-search";
import { stopMongod } from "@/db/mongod";

console.log(`Creating hotel search index... (may take a while)`);

await buildHotelSearch();

// Output some stats from database just FYI
// (we could use in-memory structure for that, but going to DB is more reliable)

let totalCount = await HotelSearch.countDocuments();

console.log(`Created ${totalCount} suffix entries`);

let averageHotelsPerSuffix = (await HotelSearch.aggregate([
  {
    $group: {
      _id: null,
      avgHotelsPerSuffix: { 
        $avg: { $size: "$hotels" } 
      }
    }
  }
]))[0].avgHotelsPerSuffix;

console.log(`Average hotels per suffix: ${averageHotelsPerSuffix.toFixed(2)}`);

console.log(`Shutting down, waiting for async DB operations to finish...`);

await mongoose.disconnect();
await stopMongod();