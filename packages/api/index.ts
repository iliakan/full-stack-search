import { seed } from "./db/seed";
import config from '@/config';
import app from './app';

if (!config.database.url) {
  await seed(); // pupulate in-memory database
}

app.listen(config.port, () => {
  console.log(`API Server Started at ${config.port}`);
});
