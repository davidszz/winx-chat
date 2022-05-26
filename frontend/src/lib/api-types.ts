import { AuthLevel } from '@utils/constants';

export interface APIUser {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
  authLevel?: AuthLevel;
  createdAt: Date;
  updatedAt: Date;
}

export interface APIMessage {
  _id: string;
  content: string;
  user: APIUser;
  createdAt: Date;
}
