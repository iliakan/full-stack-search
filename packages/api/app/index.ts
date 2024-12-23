import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/error-handler";
import { cities } from "./routes/cities";
import { countries } from "./routes/countries";
import { hotels } from "./routes/hotels";
import { search } from "./routes/search";
import { validateObjectId } from "./middleware/validate-object-id";

const app = express();

// Keep it "as is" for now, in a real app we usually limit CORS
app.use(cors());

app.use(express.json());

app.get('/search/:query', search);
app.get('/hotels/:id', validateObjectId("Hotel ID"), hotels);
app.get('/cities/:id', validateObjectId("City ID"), cities);
app.get('/countries/:id', validateObjectId("Country ID"), countries);

app.all('*', (req, res) => {
  res.status(404).send('<h1>404! Page not found</h1>');
});

app.use(errorHandler);

export default app;
