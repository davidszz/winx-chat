import { Router } from 'express';

import { UsersController } from '@controllers/users';
import { authMiddleware } from '@middlewares/auth';

const usersController = new UsersController();

const router = Router();
router.get('/@me', authMiddleware, usersController.getCurrentUser.bind(usersController));
router.post('/', usersController.createUser.bind(usersController));

export default router;
