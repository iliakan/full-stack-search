import { Hotel } from "@/models/hotel";
import { Request, Response } from "express";

export async function hotels(req: Request, res: Response) {

  const hotelId = req.params.id;

  if (!hotelId) {
    res.status(404).json({ error: 'Hotel ID is required' });
    return;
  }

  const hotel = await Hotel.findById(hotelId);

  if (!hotel) {
    res.status(404).json({ error: 'Hotel not found' });
    return;
  }

  res.json(hotel);
}
