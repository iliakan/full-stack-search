import { Hotel } from '@/models/hotel';
import { HotelSearch } from '@/models/hotel-search';

const SEARCH_LIMIT = 1000;

describe('HotelSearch', () => {

  describe('search', () => {

    // these terms return different number of results
    const searchTerms = [
      'otel', 
      'tional', 
      'iquique', 
      'grand',
      'notexists!'
    ];
    
    for(let term of searchTerms) {
      it(`should match regexp search hotels for: ${term}`, async () => {

        const hotelSearchResults = await HotelSearch.search(term, SEARCH_LIMIT);
        const hotelSearchIds = hotelSearchResults.map(id => id.toString());
        
        const regexSearchResults = await Hotel.find({
          name: {
              $regex: new RegExp(term, 'i')
          }
        }, {
          _id: 1
        }).sort({name: 1}).limit(SEARCH_LIMIT);
      
        const regexSearchIds = regexSearchResults.map(hotel => hotel.id);
        
        expect(hotelSearchIds.sort()).toEqual(regexSearchIds.sort());
      
      });
    }
  });
});
