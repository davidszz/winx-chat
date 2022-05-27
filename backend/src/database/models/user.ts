import mongoose, { Schema, Document } from 'mongoose';

import logger from '@logger';
import AuthService from '@services/auth-service';
import { AuthLevel } from '@utils/constants';

export interface UserModel {
  id: string;
  username: string;
  email: string;
  password?: string;
  avatar?: string;
  authLevel?: AuthLevel;
  createdAt: Date;
  updatedAt: Date;
}

type User = Omit<UserModel, 'id'> & { _id: string };

export const UserSchema = new Schema<User>(
  {
    _id: {
      type: String,
      default: (): string => new mongoose.Types.ObjectId().toString(),
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    avatar: String,
    authLevel: {
      type: Number,
      default: AuthLevel.Common,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
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

UserSchema.pre<User & Document>('save', async function onSave() {
  if (!this.password && !this.isModified('password')) {
    return;
  }

  try {
    const encryptedPassword = await AuthService.encryptPassword(this.password);
    this.password = encryptedPassword;
  } catch (err) {
    logger.error(`Failed to encrypt "${this.username ?? this.password}"'s password`);
  }
});

export const UserModel = mongoose.model<User & Document>('User', UserSchema);
