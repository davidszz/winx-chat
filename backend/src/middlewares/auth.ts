import AuthService from '@services/auth-service';
import { NextFunction, Request, Response } from 'express';

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers?.['x-access-token'] as string;
  try {
    const claim = AuthService.jwtVerify(token);
    req.context = { userId: claim.sub };
    next();
  } catch (err) {
    if (err instanceof Error) {
      res.status?.(401).send({ code: 401, error: err.message });
    } else {
      res.status?.(401).send({ code: 401, error: 'Unknown Auth Error' });
    }
  }
}
