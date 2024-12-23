import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

export function validateObjectId(field: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({error: `${field} must be a valid object id`});
      return;
    }

    return next();
  }
};
