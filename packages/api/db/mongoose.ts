import config from "@/config";
import mongoose from "mongoose";
import { getMongod } from "./mongod";

let mongoUri = config.database.url;

if (!mongoUri) {
  const mongod = await getMongod();
  mongoUri = mongod.getUri();
}

if (config.database.debug) {
  mongoose.set('debug', true);
}

await mongoose.connect(mongoUri);

export default mongoose;