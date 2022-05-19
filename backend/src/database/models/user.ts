import mongoose, { Schema, Document } from 'mongoose';
import AuthService from '@services/auth-service';
import logger from '@logger';

export interface UserModel {
  _id?: string;
  username: string;
  email: string;
  password?: string;
  avatar?: string;
}

export const UserSchema = new Schema<UserModel>(
  {
    _id: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toString(),
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
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

UserSchema.pre<UserModel & Document>('save', async function onSave() {
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

export const UserModel = mongoose.model<UserModel & Document>('User', UserSchema);
