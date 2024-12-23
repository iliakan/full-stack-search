import dotenv from "dotenv";

dotenv.config();

// Maximum number of search results to return
export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3001,
  database: {
    url: process.env.DATABASE_URL,
    debug: process.env.DATABASE_DEBUG
  },
  search: {
    limit: 100
  },
} as const;
