import { City } from "@/models/city";
import { Request, Response } from "express";

export async function cities(req: Request, res: Response) {
  const cityId = req.params.id;
  
  if (!cityId) {
    res.status(404).json({ error: 'City ID is required' });
    return;
  }

  const city = await City.findById(cityId);
  
  if (!city) {
    res.status(404).json({ error: 'City not found' });
    return;
  }

  res.json(city);
}
