import { Request, Response } from 'express';
import { UserModel } from '@database/models/user';
import APIError from '@utils/errors/api-error';
import { OpCode, WSEvent } from '@utils/constants';
import { BaseController } from './base';

export interface CreateMessageData {
  content: string;
}

export class MessagesController extends BaseController {
  async createMessage(req: Request, res: Response): Promise<void> {
    const { content } = req.body as CreateMessageData;
    if (!content.trim()) {
      this.sendResponseError(
        res,
        APIError.format({
          code: 400,
          message: 'Message Content Not Provided',
          description: 'Messages must have the "content" field.',
        })
      );
      return;
    }

    const user = await UserModel.findById(req.context?.userId);
    if (!user) {
      this.sendResponseError(
        res,
        APIError.format({
          code: 401,
          message: 'Not Authorized',
        })
      );
      return;
    }

    req.wss.users.broadcast(
      JSON.stringify({
        op: OpCode.Event,
        t: WSEvent.MESSAGE_CREATE,
        d: {
          _id: Math.random().toString(16),
          content,
          user,
          createdAt: new Date(),
        },
      })
    );

    res.status(201).send();
  }
}
