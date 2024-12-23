import { Country } from "@/models/country";
import { Request, Response } from "express";

export async function countries(req: Request, res: Response) {
  const countryId = req.params.id;
  
  if (!countryId) {
    res.status(404).json({ error: 'Country ID is required' });
    return;
  }

  const country = await Country.findById(countryId);
  
  if (!country) {
    res.status(404).json({ error: 'Country not found' });
    return;
  }

  res.json(country);
}
