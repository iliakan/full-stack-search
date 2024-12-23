import { City } from "./city";
import { Country } from "./country";
import { Hotel } from "./hotel";

export type Location = Hotel | City | Country;

export type LocationCollection = "hotels" | "cities" | "countries";

