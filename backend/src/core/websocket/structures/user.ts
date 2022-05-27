import { UserModel } from '@database/models/user';
import { AuthLevel } from '@utils/constants';

export class User {
  public readonly id: string;
  public username: string;
  public email: string;
  public avatar?: string;
  public authLevel?: AuthLevel;
  public readonly createdAt: Date;

  constructor(data: UserModel) {
    this.id = data.id;
    this.username = data.username;
    this.email = data.email;
    this.avatar = data.avatar;
    this.createdAt = data.createdAt;
    this.authLevel = data.authLevel;
  }

  public toJSON(): Omit<UserModel, 'updatedAt'> {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      avatar: this.avatar,
      createdAt: this.createdAt,
      authLevel: this.authLevel,
    };
  }
}
