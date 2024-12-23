import mongoose, { Schema } from 'mongoose';
import debug from 'debug';

const log = debug('api:models:hotel-search');

const hotelSearchSchema = new Schema({
  _id: { 
    type: String, 
    required: true 
  },
  hotels: {
    type: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'Hotel', 
      required: true 
    }],
    required: true
  }
}, {
  statics: {
    search
  }
});

export const HotelSearch = mongoose.model('HotelSearch', hotelSearchSchema);

async function search(term: string, limit: number = 1e9) {
  const results = new Set<mongoose.Types.ObjectId>();
  
  const query = {
    _id: {
      $gte: term.toLowerCase(),
      $lte: term.toLowerCase() + '\uFFFF'
    }
  };

  log(query);

  let matches = await HotelSearch.find(query).limit(limit);

  outer:
  for(let match of matches) {
    for(const hotel of match.hotels) {
      if (results.size < limit) {
        results.add(hotel);
      } else {
        break outer;
      }
    }
  }

  return Array.from(results);
}
