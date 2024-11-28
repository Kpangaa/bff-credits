import { Injectable, NestMiddleware } from '@nestjs/common';
import { PepaExecutionContext } from '@pepa/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  constructor(private context: PepaExecutionContext) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token =
      typeof req.headers.authorization === 'string'
        ? req.headers.authorization
        : undefined;
    if (token) {
      this.context.set('token', token);
      req['token'] = token;
    }
    next();
  }
}
