import { Router } from 'express';

import authRoute from './routes/auth';
import messagesRoute from './routes/messages';
import usersRoute from './routes/users';

const router = Router();
router.use('/users', usersRoute);
router.use('/auth', authRoute);
router.use('/messages', messagesRoute);

export default router;
