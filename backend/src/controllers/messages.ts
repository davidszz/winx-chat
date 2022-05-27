import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';

import { MessageModel } from '@database/models/message';
import { UserModel } from '@database/models/user';
import { OpCode, WSEvent } from '@utils/constants';
import APIError from '@utils/errors/api-error';

import { BaseController } from './base';

export interface CreateMessageJsonParams {
  content: string;
  nonce?: any;
}

export interface GetMessagesQueryParams {
  after?: string;
  limit?: number;
}

export class MessagesController extends BaseController {
  async createMessage(req: Request, res: Response): Promise<void> {
    const { content, nonce } = req.body as CreateMessageJsonParams;
    if (!content?.trim()) {
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

    const message = await MessageModel.create({
      content,
      author: user.toObject(),
      nonce: nonce?.toString(),
    });

    const response = message.toObject();

    req.wss.users.broadcast(
      JSON.stringify({
        op: OpCode.Event,
        t: WSEvent.MESSAGE_CREATE,
        d: response,
      })
    );

    res.status(201).json(response);
  }

  async getMessages(req: Request, res: Response): Promise<void> {
    const query = req.query as GetMessagesQueryParams;

    const limit =
      query.limit && /^\d+$/.test(query.limit.toString()) && Number(query.limit) > 0 ? Number(query.limit) : 50;

    if (limit > 100) {
      this.sendResponseError(
        res,
        APIError.format({
          code: 400,
          message: 'Wrong Limit',
          description: 'The maximum message limit that can be obtained is 100 messages.',
        })
      );
      return;
    }

    if (query.after && !isValidObjectId(query.after)) {
      this.sendResponseError(
        res,
        APIError.format({
          code: 400,
          message: 'Invalid After Field',
          description: 'The "after" field must be a valid message ID.',
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

    const messages = await MessageModel.find({
      ...(query.after && { _id: { $gt: query.after } }),
    })
      .sort({ _id: 1 })
      .limit(limit);

    res.json({
      total: messages.length,
      results: messages.map((x) => {
        const msg = x.toObject();
        delete msg.author.updatedAt;
        return msg;
      }),
    });
  }
}
