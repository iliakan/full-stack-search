import "@/config";
import mongoose from 'mongoose';
import { seed } from '@/db/seed';
import { stopMongod } from '@/db/mongod';

beforeAll(async () => {
  // in a real project we use multiple fixtures for tests
  // here we use one fixture for all tests for simplicity (easy to change)
  await seed();
});

afterAll(async () => {
  await mongoose.disconnect();
  await stopMongod();
});
