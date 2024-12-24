import mongoose from '@/db/mongoose';
import { Schema } from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // We need this index for fast {$regex: "substring"} search
    // even though regex search "doesn't use indexes", Mongo will still use the index for lookup.
    // if you remove this index,  {$regex: "substring"} will be much slower
    // our app uses a suffix index for fast searches, but we need a fair comparison, so we keep the index
    // (also useful for sorted output, etc)
    index: true
  },
  country: {
    type: String,
    required: true
  },
  chain_name: String,
  addressline1: String,
  addressline2: String,
  zipcode: String,
  city: String,
  state: String,
  countryisocode: {
    type: String,
    required: true,
    index: true
  },
  star_rating: {
    type: Number,
    min: 0,
    max: 5,
    validate: {
      validator(value: number) {
        return Number.isInteger(value) || (value % 1) == 0.5;
      },
      message: '{VALUE} is not a valid star rating'
    }
  }
});

export const Hotel = mongoose.model('Hotel', hotelSchema);
