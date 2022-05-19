import { Router } from 'express';

import usersRoute from './routes/users';
import authRoute from './routes/auth';

const router = Router();
router.use('/users', usersRoute);
router.use('/auth', authRoute);

export default router;
