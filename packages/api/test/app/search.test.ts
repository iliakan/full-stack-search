import request from 'supertest';
import app from '../../app';
import { Hotel } from '@/models/hotel';
import pick from 'lodash/pick';
import { City } from '@/models/city';
import { Country } from '@/models/country';

describe('Search REST API', () => {

  describe('GET /search', () => {

    for (let term of ['uni', 'otel', 'chupakabra-not-exists', 'new']) {
      it(`should return correct hotels for term ${term}`, async () => {
        const response = await request(app).get(`/search/${term}`);

        expect(response.status).toBe(200);

        // compare returned hotels with manually found ones
        const hotels = await Hotel.find({
          $or: [
            {
              name: {
                $regex: new RegExp(term, 'i'),
              },
            },
            {
              country: {
                $regex: new RegExp(term, 'i'),
              },
            },
          ]
        })
          .sort({ name: 1 })
          .select('name country');

        const hotelObjects = hotels.map((hotel) => pick(hotel, ['id', 'name', 'country']));

        expect(response.body.hotels).toEqual(hotelObjects);
      });

      it(`should return correct cities for term ${term}`, async () => {
        const response = await request(app).get(`/search/${term}`);

        expect(response.status).toBe(200);

        // compare returned hotels with manually found ones
        const cities = await City.find({
          name: {
            $regex: new RegExp(term, 'i'),
          },
        })
          .sort({ name: 1 })
          .select('name');

        const cityObjects = cities.map((city) => pick(city, ['id', 'name']));

        expect(response.body.cities).toEqual(cityObjects);
      });

      it(`should return correct countries for term ${term}`, async () => {
        const response = await request(app).get(`/search/${term}`);

        expect(response.status).toBe(200);

        // compare returned hotels with manually found ones
        const countries = await Country.find({
          name: {
            $regex: new RegExp(term, 'i'),
          },
        })
          .sort({ name: 1 })
          .select('name');

        const countryObjects = countries.map((country) => pick(country, ['id', 'name']));

        expect(response.body.countries).toEqual(countryObjects);
      });
    }
  });
});
