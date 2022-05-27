import mongoose, { Schema, Document } from 'mongoose';

import { UserModel } from './user';

export interface MessageModel {
  id?: string;
  author: UserModel;
  content: string;
  nonce?: string;
  createdAt: Date;
}

type Message = Omit<MessageModel, 'id'> & { _id: string };

export const MessageSchema = new Schema<Message>(
  {
    _id: {
      type: String,
      default: (): string => new mongoose.Types.ObjectId().toString(),
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Object,
      required: true,
    },
    nonce: String,
  },
  {
    timestamps: {
      updatedAt: false,
    },
    toObject: {
      /* eslint-disable no-param-reassign, no-underscore-dangle */
      transform(_, ret): void {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
      /* eslint-enable no-param-reassign, no-underscore-dangle */
    },
  }
);

export const MessageModel = mongoose.model<Message & Document>('Message', MessageSchema);
