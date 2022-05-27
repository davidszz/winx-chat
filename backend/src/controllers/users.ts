import { Request, Response } from 'express';
import validator from 'validator';

import { UserModel } from '@database/models/user';
import AuthService from '@services/auth-service';
import APIError from '@utils/errors/api-error';

import { BaseController } from './base';

export class UsersController extends BaseController {
  async createUser(req: Request, res: Response): Promise<void> {
    const { username, email, password, avatar } = req.body as UserModel;

    if (typeof username !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
      this.sendResponseError(
        res,
        APIError.format({
          code: 400,
          message: 'Required Fields Not Provided',
          description: 'Some of the required fields were not provided',
        })
      );
      return;
    }

    if (!validator.isEmail(email)) {
      this.sendResponseError(
        res,
        APIError.format({
          code: 400,
          message: 'Invalid Email',
          description: 'The email provided is invalid',
        })
      );
      return;
    }

    if (username.length < 3 || username.length > 32) {
      this.sendResponseError(
        res,
        APIError.format({
          code: 400,
          message: 'Invalid Username',
          description: 'Provide a valid username using between 3 and 32 characters',
        })
      );
      return;
    }

    if (password.length < 8 || !/\d+/g.test(password)) {
      this.sendResponseError(
        res,
        APIError.format({
          code: 400,
          message: 'Password Too Weak',
          description: 'A password of at least 8 characters and at least 1 number is required',
        })
      );
      return;
    }

    const duplicated = await UserModel.findOne(
      {
        $or: [{ email }, { username }],
      },
      { email: true, username: true }
    );

    if (duplicated) {
      if (duplicated.email === email) {
        this.sendResponseError(
          res,
          APIError.format({
            code: 409,
            message: 'Duplicated Email',
            description: 'An account with this email already exists',
          })
        );
      } else {
        this.sendResponseError(
          res,
          APIError.format({
            code: 409,
            message: 'Duplicated Username',
            description: 'An account with the same username has already been created',
          })
        );
      }
      return;
    }

    const user = await UserModel.create({
      username,
      email,
      password,
      avatar,
    });

    const token = AuthService.jwtSign(user.id);
    res.status(201).json({
      user: user.toObject(),
      token,
    });
  }

  async getCurrentUser(req: Request, res: Response): Promise<void> {
    const user = await UserModel.findById(req.context?.userId);
    if (!user) {
      this.sendResponseError(
        res,
        APIError.format({
          code: 404,
          message: 'User Not Found',
        })
      );
      return;
    }

    res.status(200).json(user.toObject());
  }
}
