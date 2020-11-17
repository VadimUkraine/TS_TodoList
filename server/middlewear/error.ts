import { Request, Response, NextFunction } from 'express';

export default function (req: Request, res: Response, next: NextFunction) {
  res.status(404).json({
    message: 'Error in server',
  });
  next();
}
