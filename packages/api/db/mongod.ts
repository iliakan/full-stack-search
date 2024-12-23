/**
 * Start or stop a single project-wide memory mongod instance
 */

import { MongoMemoryServer } from "mongodb-memory-server";

let mongoMemoryServer: MongoMemoryServer;

export async function getMongod() {
  if (!mongoMemoryServer) {
    mongoMemoryServer = await MongoMemoryServer.create();
  }
  return mongoMemoryServer;
};

export async function stopMongod() {
  if (mongoMemoryServer) {
    await mongoMemoryServer.stop();
  }
};
