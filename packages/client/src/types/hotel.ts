export interface Hotel {
  id: string;
  name: string;
  country: string;
  chain_name?: string;
  addressline1?: string;
  addressline2?: string;
  zipcode?: string;
  city?: string;
  state?: string;
  countryisocode?: string;
  star_rating?: number;
}