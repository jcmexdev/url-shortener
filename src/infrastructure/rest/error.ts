import { Request, Response, NextFunction } from 'express';

const logError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  next(err);
};

const responseError = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(500).json({ error: err.message });
};

const response404 = (req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ error: 'Not Found' });
};

export { logError, responseError, response404 };
