/**
 * The script to benchmark (run on a big DB, otherwise no point)
 * Measure searches with various number of results
 */

import "@/config";
import mongoose from '@/db/mongoose';
import { HotelSearch } from "@/models/hotel-search";
import { Hotel } from "@/models/hotel";
import { stopMongod } from "@/db/mongod";
import chalk from "chalk";  

// search up to that many results
const SEARCH_LIMIT = 100;

const RUNS = 10;

const searchTerms = [
  /* Worst case for suffixes: many hotels ends with ...otel
    (we must know about worst cases)
    we may want to take care of a few worst cases separately
    ~130.000 matches
  */
  'otel', 

  /* ~29.000 matches */
  'villa', 

  /* ~13.000 matches */
  'resort', 

  /* 53 matches */
  'super hotel',

  /* 1 match */
  'uberi',

  /* 0 matches */
  'notexists!'
];

async function measureHotelSearch(term: string) {
  const startTime = performance.now();

  await HotelSearch.search(term, SEARCH_LIMIT);

  return performance.now() - startTime;
}

async function measureRegexSearch(term: string) {
  const startTime = performance.now();

  await Hotel.find({
    name: {
        $regex: new RegExp(term, 'i')
    }
  }, {
    _id: 1
  }).sort({name: 1}).limit(SEARCH_LIMIT);

  return performance.now() - startTime;
}


for (const term of searchTerms) {
  // warm-up runs to load up DB-cache, prod-like
  await measureHotelSearch(term);
  await measureRegexSearch(term);

  // now measure
  console.log(`\nSearch ${term}`);

  let hotelSearchTime = 0, regexSearchTime = 0;

  for(let i = 0; i < RUNS; i++) {
    hotelSearchTime += await measureHotelSearch(term);
    regexSearchTime += await measureRegexSearch(term);
  }
  console.log(`HotelSearch:`, chalk.green((hotelSearchTime / RUNS).toFixed(2) + 'ms'));
  
  console.log(`Regex:`, chalk.red((regexSearchTime / RUNS).toFixed(2) + 'ms'));  

  let totalMatches = await Hotel.countDocuments({
    name: {
        $regex: new RegExp(term, 'i')
    }
  });
  console.log(`Total matches`, chalk.yellow(totalMatches));

}

await mongoose.disconnect();
await stopMongod();