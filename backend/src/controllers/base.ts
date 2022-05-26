import { Response } from 'express';
import { APIErrorResponse } from '@utils/errors/api-error';

export abstract class BaseController {
  protected sendResponseError(res: Response, error: APIErrorResponse): void {
    res.status(error.code).send(error);
  }
}
