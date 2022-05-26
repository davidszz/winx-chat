import { Request, Response } from 'express';
import { UserModel } from '@database/models/user';
import AuthService from '@services/auth-service';
import APIError from '@utils/errors/api-error';
import { BaseController } from './base';

export class AuthController extends BaseController {
  async authenticate(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }, '+password');
    if (!user) {
      this.sendResponseError(
        res,
        APIError.format({
          code: 404,
          message: 'User Not Found',
          description: 'No users found with the provided email',
        })
      );
      return;
    }

    if (!(await AuthService.comparePasswords(password, user.password))) {
      this.sendResponseError(
        res,
        APIError.format({
          code: 401,
          message: 'Invalid Password',
          description: 'The password does not match',
        })
      );
      return;
    }

    const token = AuthService.jwtSign(user._id);
    res.status(200).json({
      user: {
        ...user.toJSON({ versionKey: false }),
        password: undefined,
      },
      token,
    });
  }
}
