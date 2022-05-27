import { Router } from 'express';

import { AuthController } from '@controllers/auth';

const authController = new AuthController();

const router = Router();
router.post('/', authController.authenticate.bind(authController));

export default router;
