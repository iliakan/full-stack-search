import { NextFunction, Request, Response } from "express";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err);

  const accepts = req.accepts(['json', 'text']);
  const message = 'Internal Server Error';

  if (accepts === 'json') {
    res.status(500).json({
      error: message
    });
  } else {
    res.status(500)
      .type('text/plain')
      .send(message);
  }
};
