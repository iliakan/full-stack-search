import { MongoServerError } from "mongodb";
import type { Db } from "mongodb";

/**
 * Drops a MongoDB collection if it exists
 * @param db MongoDB database instance
 * @param name Name of the collection to drop
 */
export async function dropCollectionIfExists(db: Db, name: string) {
  try {
    await db.dropCollection(name);
  } catch(error) {
    if (error instanceof MongoServerError) {
      if (error.errorResponse?.code === 26) return; // collection not exists
    }
    throw error;
  }
}
